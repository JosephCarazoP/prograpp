import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { sqliteStorageService } from './sqliteStorageService';

export interface UserDatabaseMeta {
  id: string;
  name: string;
  createdAt: number;
  updatedAt?: number;
}

export interface CloudSqliteRecord {
  id: string;
  userId: string;
  storageKey: string;
  dbName?: string;
  sql: string;
  binaryBase64?: string;
  buttonSqlMap?: Record<string, string>;
  updatedAt: number;
}

// Claves de control local para sincronización
const DIRTY_PREFIX = 'prograpp_sqlite_dirty_';
const SYNC_TS_PREFIX = 'prograpp_sqlite_synced_ts_';
const LOCAL_TS_PREFIX = 'prograpp_sqlite_local_ts_';
const MOCK_CLOUD_PREFIX = 'prograpp_mock_cloud_db_';

class SqliteCloudSyncService {
  /**
   * Convierte un Uint8Array a cadena Base64
   */
  public uint8ArrayToBase64(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Convierte una cadena Base64 a Uint8Array
   */
  public base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  /**
   * Marca que una base de datos local tiene cambios pendientes de subir a la nube
   */
  public markDirty(storageKey: string): void {
    try {
      localStorage.setItem(`${DIRTY_PREFIX}${storageKey}`, 'true');
      localStorage.setItem(`${LOCAL_TS_PREFIX}${storageKey}`, String(Date.now()));
    } catch (e) {}
  }

  /**
   * Verifica si hay cambios locales no sincronizados en la nube
   */
  public isDirty(storageKey: string): boolean {
    try {
      return localStorage.getItem(`${DIRTY_PREFIX}${storageKey}`) === 'true';
    } catch (e) {
      return false;
    }
  }

  /**
   * Limpia la marca de cambios pendientes tras sincronizar
   */
  public clearDirty(storageKey: string): void {
    try {
      localStorage.removeItem(`${DIRTY_PREFIX}${storageKey}`);
    } catch (e) {}
  }

  /**
   * Obtiene la marca de tiempo de la última sincronización en la nube para esta máquina
   */
  public getLocalSyncedTimestamp(storageKey: string): number {
    try {
      const val = localStorage.getItem(`${SYNC_TS_PREFIX}${storageKey}`);
      return val ? parseInt(val, 10) : 0;
    } catch (e) {
      return 0;
    }
  }

  /**
   * Guarda en la nube de Firebase Firestore el estado de la base de datos SQLite y su SQL
   */
  public async syncToCloud(
    userId: string,
    storageKey: string,
    options: {
      dbName?: string;
      sql?: string;
      binary?: Uint8Array | null;
      buttonSqlMap?: Record<string, string>;
    } = {}
  ): Promise<{ success: boolean; updatedAt: number; error?: string }> {
    if (!userId || userId === 'guest') {
      return { success: false, updatedAt: 0, error: 'Usuario no autenticado' };
    }

    const now = Date.now();

    try {
      // 1. Obtener SQL
      const sqlToSave = options.sql !== undefined
        ? options.sql
        : sqliteStorageService.loadStudentSql(storageKey);

      // 2. Obtener binario de la base
      let binaryToSave = options.binary;
      if (binaryToSave === undefined) {
        binaryToSave = await sqliteStorageService.loadDatabase(storageKey);
      }

      let binaryBase64: string | undefined = undefined;
      if (binaryToSave && binaryToSave.length > 0) {
        binaryBase64 = this.uint8ArrayToBase64(binaryToSave);
      }

      // 3. Obtener mapa de botones si aplica
      const buttonSqlMap = options.buttonSqlMap || sqliteStorageService.loadButtonSqlMap(storageKey);

      const record: CloudSqliteRecord = {
        id: `${userId}_${storageKey}`,
        userId,
        storageKey,
        dbName: options.dbName || 'Base SQLite',
        sql: sqlToSave || '',
        binaryBase64,
        buttonSqlMap: Object.keys(buttonSqlMap).length > 0 ? buttonSqlMap : undefined,
        updatedAt: now
      };

      // 4. Guardar en Firestore (o fallback local mock si aplica)
      if (db && !isLocalMockMode) {
        const docRef = doc(db, 'user_sqlite_dbs', record.id);
        await setDoc(docRef, record, { merge: true });
      } else {
        // En modo local mock, simulamos almacenamiento en nube
        localStorage.setItem(`${MOCK_CLOUD_PREFIX}${record.id}`, JSON.stringify(record));
      }

      // 5. Actualizar metadatos locales de sincronización
      try {
        localStorage.setItem(`${SYNC_TS_PREFIX}${storageKey}`, String(now));
        localStorage.setItem(`${LOCAL_TS_PREFIX}${storageKey}`, String(now));
        this.clearDirty(storageKey);
      } catch (e) {}

      return { success: true, updatedAt: now };
    } catch (err: any) {
      console.warn('[SqliteCloudSync] Error sincronizando con Firestore:', err);
      return { success: false, updatedAt: 0, error: err?.message || String(err) };
    }
  }

  /**
   * Carga desde la nube de Firebase Firestore el estado de la base de datos
   */
  public async loadFromCloud(userId: string, storageKey: string): Promise<CloudSqliteRecord | null> {
    if (!userId || userId === 'guest') return null;

    const docId = `${userId}_${storageKey}`;

    try {
      if (db && !isLocalMockMode) {
        const docRef = doc(db, 'user_sqlite_dbs', docId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          return snap.data() as CloudSqliteRecord;
        }
      } else {
        const raw = localStorage.getItem(`${MOCK_CLOUD_PREFIX}${docId}`);
        if (raw) {
          return JSON.parse(raw) as CloudSqliteRecord;
        }
      }
      return null;
    } catch (err) {
      console.warn('[SqliteCloudSync] Error cargando de Firestore:', err);
      return null;
    }
  }

  /**
   * Restaura la base de datos de la nube a los almacenes locales (IndexedDB + localStorage)
   */
  public async restoreToLocal(record: CloudSqliteRecord): Promise<Uint8Array | null> {
    try {
      // 1. Restaurar código SQL
      if (record.sql !== undefined) {
        sqliteStorageService.saveStudentSql(record.storageKey, record.sql);
      }

      // 2. Restaurar mapa de botones si existe
      if (record.buttonSqlMap) {
        sqliteStorageService.saveButtonSqlMap(record.storageKey, record.buttonSqlMap);
      }

      // 3. Restaurar binario en IndexedDB
      if (record.binaryBase64) {
        const bytes = this.base64ToUint8Array(record.binaryBase64);
        await sqliteStorageService.saveDatabase(record.storageKey, bytes);
        
        // Marcar sincronizado
        try {
          localStorage.setItem(`${SYNC_TS_PREFIX}${record.storageKey}`, String(record.updatedAt));
          localStorage.setItem(`${LOCAL_TS_PREFIX}${record.storageKey}`, String(record.updatedAt));
          this.clearDirty(record.storageKey);
        } catch (e) {}

        return bytes;
      }

      return null;
    } catch (e) {
      console.error('[SqliteCloudSync] Error restaurando a local:', e);
      return null;
    }
  }

  /**
   * Elimina la copia de seguridad de la base de datos en la nube
   */
  public async deleteFromCloud(userId: string, storageKey: string): Promise<void> {
    if (!userId || userId === 'guest') return;

    const docId = `${userId}_${storageKey}`;
    try {
      if (db && !isLocalMockMode) {
        await deleteDoc(doc(db, 'user_sqlite_dbs', docId));
      } else {
        localStorage.removeItem(`${MOCK_CLOUD_PREFIX}${docId}`);
      }
      this.clearDirty(storageKey);
      localStorage.removeItem(`${SYNC_TS_PREFIX}${storageKey}`);
      localStorage.removeItem(`${LOCAL_TS_PREFIX}${storageKey}`);
    } catch (err) {
      console.warn('[SqliteCloudSync] Error eliminando de Firestore:', err);
    }
  }

  /**
   * Sincroniza la lista de bases de datos personalizadas del usuario en la nube
   */
  public async syncUserDatabasesList(userId: string, list: UserDatabaseMeta[]): Promise<void> {
    if (!userId || userId === 'guest') return;
    try {
      if (db && !isLocalMockMode) {
        const docRef = doc(db, 'user_sqlite_metadata', userId);
        await setDoc(docRef, { databases: list, updatedAt: Date.now() }, { merge: true });
      } else {
        localStorage.setItem(`mock_user_sqlite_metadata_${userId}`, JSON.stringify({ databases: list, updatedAt: Date.now() }));
      }
    } catch (err) {
      console.warn('[SqliteCloudSync] Error sincronizando lista de bases:', err);
    }
  }

  /**
   * Carga la lista de bases de datos personalizadas del usuario desde la nube
   */
  public async loadUserDatabasesList(userId: string): Promise<UserDatabaseMeta[] | null> {
    if (!userId || userId === 'guest') return null;
    try {
      if (db && !isLocalMockMode) {
        const docRef = doc(db, 'user_sqlite_metadata', userId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          if (Array.isArray(data.databases)) {
            return data.databases as UserDatabaseMeta[];
          }
        }
      } else {
        const raw = localStorage.getItem(`mock_user_sqlite_metadata_${userId}`);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.databases)) {
            return parsed.databases as UserDatabaseMeta[];
          }
        }
      }
      return null;
    } catch (err) {
      console.warn('[SqliteCloudSync] Error cargando lista de bases:', err);
      return null;
    }
  }
}

export const sqliteCloudSyncService = new SqliteCloudSyncService();
