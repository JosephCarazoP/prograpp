/**
 * Servicio de almacenamiento persistente aislado para bases de datos SQLite en el navegador.
 * Utiliza IndexedDB para permitir almacenar bases de datos reales sin el límite de 5MB de localStorage.
 */

const DB_NAME = 'prograpp_sqlite_storage';
const DB_VERSION = 1;
const STORE_NAME = 'databases';

class SqliteStorageService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        return reject(new Error('IndexedDB no está disponible en este entorno.'));
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result as IDBDatabase;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = (event: any) => {
        resolve(event.target.result as IDBDatabase);
      };

      request.onerror = (event: any) => {
        console.error('Error abriendo IndexedDB de SQLite:', event);
        reject(event.target.error);
      };
    });

    return this.dbPromise;
  }

  /**
   * Guarda los bytes de la base de datos de manera aislada por clave
   */
  public async saveDatabase(storageKey: string, data: Uint8Array): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        // Guardamos ArrayBuffer para máxima fidelidad y eficiencia en IndexedDB
        const request = store.put(data.buffer, storageKey);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      console.warn('Fallback guardando SQLite en localStorage debido a error en IndexedDB:', err);
      // Fallback en caso excepcional
      try {
        let binaryString = '';
        for (let i = 0; i < data.length; i++) {
          binaryString += String.fromCharCode(data[i]);
        }
        localStorage.setItem(`prograpp_sqlite_bin_${storageKey}`, btoa(binaryString));
      } catch (e) {
        console.error('No se pudo guardar la base en localStorage:', e);
      }
    }
  }

  /**
   * Carga los bytes de la base de datos para una clave
   */
  public async loadDatabase(storageKey: string): Promise<Uint8Array | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(storageKey);

        request.onsuccess = () => {
          const res = request.result;
          if (res instanceof ArrayBuffer) {
            resolve(new Uint8Array(res));
          } else if (res instanceof Uint8Array) {
            resolve(res);
          } else {
            resolve(null);
          }
        };

        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      console.warn('Error leyendo SQLite de IndexedDB, probando fallback:', err);
      try {
        const b64 = localStorage.getItem(`prograpp_sqlite_bin_${storageKey}`);
        if (b64) {
          const binStr = atob(b64);
          const bytes = new Uint8Array(binStr.length);
          for (let i = 0; i < binStr.length; i++) {
            bytes[i] = binStr.charCodeAt(i);
          }
          return bytes;
        }
      } catch (e) {
        console.error('Fallback falló:', e);
      }
      return null;
    }
  }

  /**
   * Elimina la base de datos guardada para restablecerla
   */
  public async deleteDatabase(storageKey: string): Promise<void> {
    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.delete(storageKey);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      console.warn('Error eliminando de IndexedDB:', err);
    }
    localStorage.removeItem(`prograpp_sqlite_bin_${storageKey}`);
    localStorage.removeItem(`prograpp_sqlite_sql_${storageKey}`);
    localStorage.removeItem(`prograpp_sqlite_btn_${storageKey}`);
  }

  /**
   * Guarda el texto SQL escrito por el alumno
   */
  public saveStudentSql(storageKey: string, sql: string): void {
    try {
      localStorage.setItem(`prograpp_sqlite_sql_${storageKey}`, sql);
    } catch (e) {
      console.error('Error guardando SQL en localStorage:', e);
    }
  }

  /**
   * Recupera el texto SQL del alumno o valor por defecto
   */
  public loadStudentSql(storageKey: string, defaultSql: string = ''): string {
    try {
      const val = localStorage.getItem(`prograpp_sqlite_sql_${storageKey}`);
      return val !== null ? val : defaultSql;
    } catch (e) {
      return defaultSql;
    }
  }

  /**
   * Guarda el mapa de SQL de botones en modo 'programar botones'
   */
  public saveButtonSqlMap(storageKey: string, map: Record<string, string>): void {
    try {
      localStorage.setItem(`prograpp_sqlite_btn_${storageKey}`, JSON.stringify(map));
    } catch (e) {
      console.error('Error guardando mapa de botones:', e);
    }
  }

  /**
   * Carga el mapa de SQL de botones
   */
  public loadButtonSqlMap(storageKey: string): Record<string, string> {
    try {
      const raw = localStorage.getItem(`prograpp_sqlite_btn_${storageKey}`);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
}

export const sqliteStorageService = new SqliteStorageService();
