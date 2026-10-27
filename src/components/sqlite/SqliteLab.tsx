import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../../types/user';
import {
  SqliteExercise,
  TableSchemaInfo,
  SqliteQueryResult,
  SqliteSubmission
} from '../../types/sqliteLab';
import { sqliteService } from '../../services/sqliteService';
import { sqliteStorageService } from '../../services/sqliteStorageService';
import { sqliteExerciseService } from '../../services/sqliteExerciseService';
import { sqliteCloudSyncService } from '../../services/sqliteCloudSyncService';
import { soundService } from '../../services/soundService';

// Componentes del Laboratorio
import { SqlEditor, QueryTab } from './SqlEditor';
import { ResultsTable } from './ResultsTable';
import { SchemaViewer } from './SchemaViewer';
import { ButtonProgrammingLab } from './ButtonProgrammingLab';
import { SqliteLimitationsModal } from './SqliteLimitationsModal';
import { CreateTableModal } from './CreateTableModal';
import { NewDatabaseModal } from './NewDatabaseModal';
import { RelationWarningModal } from './RelationWarningModal';

// Iconos
import {
  Play,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  Send,
  Info,
  Trash2,
  Undo2,
  Plus,
  Database,
  FileCode2,
  Cloud,
  Loader2
} from 'lucide-react';

export interface UserDatabase {
  id: string;
  name: string;
  createdAt: number;
}

interface SqliteLabProps {
  user: UserProfile;
  initialExerciseId?: string | null;
  onBack: () => void;
}

export const SqliteLab: React.FC<SqliteLabProps> = ({
  user,
  initialExerciseId = null,
  onBack
}) => {
  // Lista de ejercicios disponibles
  const [exercises, setExercises] = useState<SqliteExercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(
    initialExerciseId || 'sandbox'
  );

  // Estado del motor y base de datos
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [schemaTables, setSchemaTables] = useState<TableSchemaInfo[]>([]);

  // Pestañas de Consultas (Query 1, Query 2...)
  const [tabs, setTabs] = useState<QueryTab[]>([
    { id: 'q1', title: 'Query 1', sql: '-- Escribe tu consulta SQL aquí\n' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('q1');
  const [undoHistory, setUndoHistory] = useState<Record<string, string[]>>({});

  // Ejecución y Resultados
  const [lastResult, setLastResult] = useState<SqliteQueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const [showHints, setShowHints] = useState(false);

  // Modales
  const [isLimitationsOpen, setIsLimitationsOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);
  const [autoCheckModal, setAutoCheckModal] = useState<{
    isOpen: boolean;
    passed: boolean;
    checks: { description: string; passed: boolean; details?: string }[];
  } | null>(null);

  // Referencia para carga universal de archivos (.db o .sql)
  const universalFileInputRef = useRef<HTMLInputElement>(null);

  // Cargar lista de ejercicios
  useEffect(() => {
    async function loadExercises() {
      try {
        const list = await sqliteExerciseService.getAllExercises();
        setExercises(list);
      } catch (e) {
        console.warn('Error cargando ejercicios de SQLite:', e);
      }
    }
    loadExercises();
  }, []);

  // Gestión de bases de datos del usuario
  const userDbsKey = `prograpp_sqlite_user_dbs_${user.uid || 'guest'}`;
  const [userDatabases, setUserDatabases] = useState<UserDatabase[]>(() => {
    try {
      const raw = localStorage.getItem(`prograpp_sqlite_user_dbs_${user.uid || 'guest'}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [{ id: 'default', name: 'Base Principal (main.db)', createdAt: Date.now() }];
  });

  const [activeDbId, setActiveDbId] = useState<string>('default');
  const [isNewDbModalOpen, setIsNewDbModalOpen] = useState(false);
  const [isCreateTableOpen, setIsCreateTableOpen] = useState(false);
  const [editTable, setEditTable] = useState<TableSchemaInfo | null>(null);
  const [tableToDelete, setTableToDelete] = useState<TableSchemaInfo | null>(null);

  // Estados de Sincronización en la Nube y Recuperación
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'dirty'>('synced');
  const [cloudNotice, setCloudNotice] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [pendingCloudRestore, setPendingCloudRestore] = useState<{ record: any; message: string } | null>(null);

  const activeExercise = exercises.find(e => e.id === selectedExerciseId) || null;
  const isSandbox = selectedExerciseId === 'sandbox' || !activeExercise;
  const isButtonMode = activeExercise?.type === 'button_programming';

  // Clave de almacenamiento aislada por estudiante, base de datos y ejercicio
  const storageKey = isSandbox
    ? `db_${activeDbId}_${user.uid || 'guest'}`
    : `exercise_${activeExercise.id}_${user.uid || 'guest'}`;

  // Sincronizar catálogo de bases personalizadas creadas por el usuario desde la nube
  useEffect(() => {
    if (!user.uid || user.uid === 'guest') return;
    async function syncDbsList() {
      try {
        const cloudList = await sqliteCloudSyncService.loadUserDatabasesList(user.uid);
        if (cloudList && cloudList.length > 0) {
          setUserDatabases(prev => {
            const map = new Map<string, UserDatabase>();
            prev.forEach(d => map.set(d.id, d));
            cloudList.forEach(d => map.set(d.id, d));
            const merged = Array.from(map.values());
            try {
              localStorage.setItem(userDbsKey, JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
      } catch (e) {
        console.warn('Error sincronizando lista de bases desde la nube:', e);
      }
    }
    syncDbsList();
  }, [user.uid]);

  // Inicializar base de datos con Recuperación Automática desde la Nube
  useEffect(() => {
    let isCancelled = false;

    async function setupDatabase() {
      setIsInitializing(true);
      setInitError(null);
      setLastResult(null);
      setPendingCloudRestore(null);

      try {
        const defaultSql = activeExercise?.initialSql || '-- Escribe tu consulta SQL aquí\n';
        let savedSql = sqliteStorageService.loadStudentSql(storageKey, defaultSql);
        
        setTabs([
          { id: 'q1', title: 'Query 1', sql: savedSql }
        ]);
        setActiveTabId('q1');

        let savedBinary = await sqliteStorageService.loadDatabase(storageKey);

        // ════ RECUPERACIÓN AUTOMÁTICA DESDE LA NUBE ════
        let restoredFromCloud = false;
        if (user.uid && user.uid !== 'guest') {
          try {
            const cloudRecord = await sqliteCloudSyncService.loadFromCloud(user.uid, storageKey);
            if (cloudRecord) {
              const localTs = sqliteCloudSyncService.getLocalSyncedTimestamp(storageKey);

              // Caso 1: En esta máquina no existe la base local (ej. otra computadora o borraron historial)
              if (!savedBinary || savedBinary.length === 0) {
                const bytes = await sqliteCloudSyncService.restoreToLocal(cloudRecord);
                if (bytes) {
                  savedBinary = bytes;
                  savedSql = cloudRecord.sql || savedSql;
                  setTabs([{ id: 'q1', title: 'Query 1', sql: savedSql }]);
                  setSyncStatus('synced');
                  restoredFromCloud = true;
                  const timeStr = new Date(cloudRecord.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  setCloudNotice({
                    type: 'success',
                    message: `☁️ ¡Base de datos y consultas recuperadas desde tu cuenta en la nube! (Última actualización: ${timeStr})`
                  });
                  setTimeout(() => setCloudNotice(null), 7000);
                }
              }
              // Caso 2: La nube tiene una versión significativamente más reciente (ej. trabajó en otra PC)
              else if (cloudRecord.updatedAt > (localTs + 15000) && cloudRecord.binaryBase64) {
                const timeStr = new Date(cloudRecord.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setPendingCloudRestore({
                  record: cloudRecord,
                  message: `Se encontró una versión más reciente guardada en la nube (${timeStr}). ¿Deseas cargarla?`
                });
              }
            }
          } catch (cloudErr) {
            console.warn('[SqliteLab] Error verificando respaldo en la nube:', cloudErr);
          }
        }

        if (savedBinary && savedBinary.length > 0) {
          await sqliteService.openDatabase(savedBinary);
        } else {
          await sqliteService.openDatabase();
          if (activeExercise?.initialSql) {
            sqliteService.execute(activeExercise.initialSql);
            const bin = sqliteService.exportBinary();
            if (bin) {
              await sqliteStorageService.saveDatabase(storageKey, bin);
            }
          }
        }

        if (!isCancelled) {
          const tables = await sqliteService.introspectSchema();
          setSchemaTables(tables);
          if (!restoredFromCloud) {
            setSyncStatus(sqliteCloudSyncService.isDirty(storageKey) ? 'dirty' : 'synced');
          }
        }
      } catch (err: any) {
        console.error('Error inicializando SQLite Lab:', err);
        if (!isCancelled) {
          setInitError(err?.message || 'No se pudo inicializar el motor SQLite WebAssembly.');
        }
      } finally {
        if (!isCancelled) {
          setIsInitializing(false);
        }
      }
    }

    setupDatabase();

    return () => {
      isCancelled = true;
    };
  }, [selectedExerciseId, activeDbId, user.uid, retryCount]);

  // Tab activo actual
  const currentTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const currentSql = currentTab ? currentTab.sql : '';

  // ════ FUNCIONES DE SINCRONIZACIÓN EN LA NUBE ════
  const doSyncToCloud = async (isManual: boolean = false) => {
    if (!user.uid || user.uid === 'guest' || syncStatus === 'syncing') return;

    setSyncStatus('syncing');
    try {
      const bin = sqliteService.exportBinary();
      const currentDbName = isSandbox
        ? userDatabases.find(d => d.id === activeDbId)?.name || 'Base Principal'
        : activeExercise?.title || 'Ejercicio SQLite';

      const res = await sqliteCloudSyncService.syncToCloud(user.uid, storageKey, {
        dbName: currentDbName,
        sql: currentSql,
        binary: bin,
        buttonSqlMap: isButtonMode ? sqliteStorageService.loadButtonSqlMap(storageKey) : undefined
      });

      if (res.success) {
        setSyncStatus('synced');
        if (isManual) {
          soundService.playToken();
          setSubmitSuccessMsg('☁️ ¡Base de datos y consultas guardadas en tu cuenta en la nube!');
          setTimeout(() => setSubmitSuccessMsg(null), 4000);
        }
      } else {
        setSyncStatus('dirty');
        if (isManual) {
          alert(`No se pudo sincronizar en la nube: ${res.error || 'Error desconocido'}`);
        }
      }
    } catch (e: any) {
      console.warn('Error sincronizando con la nube:', e);
      setSyncStatus('dirty');
    }
  };

  const handleManualSync = () => {
    doSyncToCloud(true);
  };

  const handleApplyCloudRestore = async () => {
    if (!pendingCloudRestore?.record) return;
    try {
      setIsInitializing(true);
      const record = pendingCloudRestore.record;
      const bytes = await sqliteCloudSyncService.restoreToLocal(record);
      if (bytes) {
        await sqliteService.openDatabase(bytes);
        if (record.sql) {
          handleSqlChange(record.sql);
        }
        await refreshSchema();
        setSyncStatus('synced');
        setPendingCloudRestore(null);
        soundService.playToken();
        setSubmitSuccessMsg('☁️ ¡Versión de la nube aplicada correctamente!');
        setTimeout(() => setSubmitSuccessMsg(null), 4000);
      }
    } catch (err: any) {
      alert(`Error al aplicar versión de la nube: ${err?.message || err}`);
    } finally {
      setIsInitializing(false);
    }
  };

  // Autoguardado silencioso en la nube cada 2 minutos si hay cambios pendientes
  useEffect(() => {
    if (!user.uid || user.uid === 'guest') return;

    const interval = setInterval(() => {
      if (sqliteCloudSyncService.isDirty(storageKey)) {
        doSyncToCloud(false);
      }
    }, 120000); // 2 minutos

    return () => clearInterval(interval);
  }, [storageKey, user.uid, currentSql, isSandbox, activeDbId, activeExercise, isButtonMode]);

  // Advertencia al cerrar la ventana si hay cambios pendientes de sincronizar
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (sqliteCloudSyncService.isDirty(storageKey)) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [storageKey]);

  // Actualizar SQL del tab activo
  const handleSqlChange = (newSql: string) => {
    setTabs(prev =>
      prev.map(t => (t.id === activeTabId ? { ...t, sql: newSql } : t))
    );
    // Guardar en historial de deshacer
    setUndoHistory(prev => {
      const history = prev[activeTabId] || [];
      return {
        ...prev,
        [activeTabId]: [...history.slice(-20), currentSql]
      };
    });
    sqliteStorageService.saveStudentSql(storageKey, newSql);
    sqliteCloudSyncService.markDirty(storageKey);
    setSyncStatus('dirty');
  };

  // Deshacer cambio
  const handleUndo = () => {
    const history = undoHistory[activeTabId];
    if (history && history.length > 0) {
      const prevSql = history[history.length - 1];
      setTabs(prev =>
        prev.map(t => (t.id === activeTabId ? { ...t, sql: prevSql } : t))
      );
      setUndoHistory(prev => ({
        ...prev,
        [activeTabId]: (prev[activeTabId] || []).slice(0, -1)
      }));
      sqliteStorageService.saveStudentSql(storageKey, prevSql);
      sqliteCloudSyncService.markDirty(storageKey);
      setSyncStatus('dirty');
    }
  };

  // Agregar nueva pestaña
  const handleAddTab = () => {
    const nextNum = tabs.length + 1;
    const newTab: QueryTab = {
      id: `q_${Date.now()}`,
      title: `Query ${nextNum}`,
      sql: '-- Nueva consulta SQL\n'
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  // Cerrar pestaña
  const handleCloseTab = (idToClose: string) => {
    if (tabs.length <= 1) return;
    const newTabs = tabs.filter(t => t.id !== idToClose);
    setTabs(newTabs);
    if (activeTabId === idToClose) {
      setActiveTabId(newTabs[0].id);
    }
  };

  // Refrescar el esquema
  const refreshSchema = async () => {
    const tables = await sqliteService.introspectSchema();
    setSchemaTables(tables);
  };

  // Ejecutar sentencia
  const handleExecute = async () => {
    if (!currentSql.trim() || isRunning) return;

    setIsRunning(true);
    soundService.playToken();

    try {
      const result = sqliteService.execute(currentSql);
      setLastResult(result);

      if (!result.error) {
        const bin = sqliteService.exportBinary();
        if (bin) {
          await sqliteStorageService.saveDatabase(storageKey, bin);
          sqliteCloudSyncService.markDirty(storageKey);
          setSyncStatus('dirty');
        }
        await refreshSchema();
      }
    } catch (e: any) {
      setLastResult({
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs: 0,
        error: e?.message || String(e)
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Insertar consulta sugerida desde el panel de tablas
  const handleInsertQuery = (sql: string) => {
    const nextVal = currentSql.trim() ? `${currentSql}\n\n${sql}` : sql;
    handleSqlChange(nextVal);
  };

  // Ver datos de una tabla (SELECT * ... LIMIT 100) directamente en la tabla de resultados
  const handleViewTableData = (table: TableSchemaInfo) => {
    const sql = `SELECT * FROM "${table.name}" LIMIT 100;`;
    const result = sqliteService.execute(sql);
    setLastResult(result);
    soundService.playToken();
  };

  // Modificar estructura de una tabla
  const handleEditTable = (table: TableSchemaInfo) => {
    setEditTable(table);
    setIsCreateTableOpen(true);
  };

  // Abrir comprobación de relaciones para borrar tabla
  const handleDeleteTable = (table: TableSchemaInfo) => {
    setTableToDelete(table);
  };

  // Confirmar eliminación de tabla (DROP TABLE)
  const handleConfirmDropTable = async (tableName: string) => {
    try {
      const result = sqliteService.execute(`DROP TABLE IF EXISTS "${tableName}";`);
      if (result.error) {
        alert(`Error al eliminar tabla: ${result.error}`);
        return;
      }
      const bin = sqliteService.exportBinary();
      if (bin) {
        await sqliteStorageService.saveDatabase(storageKey, bin);
        sqliteCloudSyncService.markDirty(storageKey);
        setSyncStatus('dirty');
      }
      await refreshSchema();
      soundService.playToken();
      setSubmitSuccessMsg(`¡Tabla "${tableName}" eliminada con éxito!`);
      setTimeout(() => setSubmitSuccessMsg(null), 3500);
    } catch (err: any) {
      alert(`Error: ${err?.message || String(err)}`);
    }
  };

  // Crear una nueva base de datos SQLite personalizada
  const handleCreateNewDatabase = async (name: string, templateType: 'empty' | 'sample') => {
    const newId = `db_${Date.now()}`;
    const formattedName = name.endsWith('.db') ? name : `${name}.db`;
    const newDb: UserDatabase = {
      id: newId,
      name: formattedName,
      createdAt: Date.now()
    };
    const updatedList = [...userDatabases, newDb];
    setUserDatabases(updatedList);
    try {
      localStorage.setItem(userDbsKey, JSON.stringify(updatedList));
    } catch (e) {}

    // Sincronizar catálogo en la nube
    sqliteCloudSyncService.syncUserDatabasesList(user.uid, updatedList);

    const newStorageKey = `db_${newId}_${user.uid || 'guest'}`;

    // Inicializar nueva base en SQLite
    await sqliteService.openDatabase();
    let initialSql = `-- Base de Datos SQLite: ${formattedName}\n-- Escribe tus consultas SQL aquí\n`;

    if (templateType === 'sample') {
      const sampleSql = `CREATE TABLE IF NOT EXISTS articulos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  precio REAL CHECK(precio >= 0),
  stock INTEGER DEFAULT 0
);

INSERT INTO articulos (nombre, precio, stock) VALUES
  ('Laptop Gamer', 1250.00, 5),
  ('Mouse Inalámbrico', 25.50, 20),
  ('Monitor 27"', 280.00, 8);`;

      sqliteService.execute(sampleSql);
      initialSql += `\n-- Tabla 'articulos' de ejemplo creada:\nSELECT * FROM articulos;\n`;
    }

    const bin = sqliteService.exportBinary();
    if (bin) {
      await sqliteStorageService.saveDatabase(newStorageKey, bin);
    }
    sqliteStorageService.saveStudentSql(newStorageKey, initialSql);

    // Respaldar inmediatamente la nueva base en la nube
    sqliteCloudSyncService.syncToCloud(user.uid, newStorageKey, {
      dbName: formattedName,
      sql: initialSql,
      binary: bin
    });

    setSelectedExerciseId('sandbox');
    setActiveDbId(newId);
    setTabs([{ id: 'q1', title: 'Query 1', sql: initialSql }]);
    setActiveTabId('q1');
    await refreshSchema();
    soundService.playToken();
    setSubmitSuccessMsg(`¡Base de datos "${formattedName}" creada y respaldada en la nube!`);
    setTimeout(() => setSubmitSuccessMsg(null), 4000);
  };

  // Eliminar base de datos personalizada
  const handleDeleteDatabase = async (idToDelete: string) => {
    if (idToDelete === 'default' || userDatabases.length <= 1) return;
    const dbObj = userDatabases.find(d => d.id === idToDelete);
    if (!window.confirm(`¿Deseas eliminar la base "${dbObj?.name || idToDelete}"? Esta acción no se puede deshacer.`)) return;

    const keyToDelete = `db_${idToDelete}_${user.uid || 'guest'}`;
    await sqliteStorageService.deleteDatabase(keyToDelete);
    await sqliteCloudSyncService.deleteFromCloud(user.uid, keyToDelete);

    const updatedList = userDatabases.filter(d => d.id !== idToDelete);
    setUserDatabases(updatedList);
    try {
      localStorage.setItem(userDbsKey, JSON.stringify(updatedList));
    } catch (e) {}

    // Sincronizar catálogo actualizado en la nube
    sqliteCloudSyncService.syncUserDatabasesList(user.uid, updatedList);

    if (activeDbId === idToDelete) {
      setActiveDbId(updatedList[0].id);
    }
    soundService.playToken();
  };

  // Restablecer la base de datos
  const handleResetDatabase = async () => {
    setIsInitializing(true);
    setIsResetConfirmOpen(false);

    try {
      await sqliteStorageService.deleteDatabase(storageKey);
      await sqliteCloudSyncService.deleteFromCloud(user.uid, storageKey);
      setSyncStatus('synced');
      await sqliteService.openDatabase();

      if (activeExercise?.initialSql) {
        sqliteService.execute(activeExercise.initialSql);
        const bin = sqliteService.exportBinary();
        if (bin) {
          await sqliteStorageService.saveDatabase(storageKey, bin);
        }
        handleSqlChange(activeExercise.initialSql);
      } else {
        handleSqlChange('-- Base de datos restablecida vacía\n');
      }

      await refreshSchema();
      setLastResult(null);
      soundService.playToken();
    } catch (e) {
      console.error('Error al restablecer la base de datos:', e);
    } finally {
      setIsInitializing(false);
    }
  };

  // Exportar archivo .db
  const handleExportDb = () => {
    const bin = sqliteService.exportBinary();
    if (!bin) {
      alert('La base de datos aún no está lista para exportar.');
      return;
    }
    const blob = new Blob([new Uint8Array(bin)], { type: 'application/x-sqlite3' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeTitle = (activeExercise?.title || 'mi_base_sqlite')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    a.href = url;
    a.download = `${safeTitle}_${new Date().toISOString().split('T')[0]}.db`;
    a.click();
    URL.revokeObjectURL(url);
    soundService.playToken();
    setSubmitSuccessMsg(`¡Archivo "${a.download}" descargado con éxito!`);
    setTimeout(() => setSubmitSuccessMsg(null), 3500);
  };

  // Exportar script .sql
  const handleExportSql = () => {
    const dump = sqliteService.exportSqlDump();
    const blob = new Blob([dump], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeTitle = (activeExercise?.title || 'mi_base_sqlite')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    a.href = url;
    a.download = `${safeTitle}_dump_${new Date().toISOString().split('T')[0]}.sql`;
    a.click();
    URL.revokeObjectURL(url);
    soundService.playToken();
    setSubmitSuccessMsg(`¡Script SQL "${a.download}" descargado con éxito!`);
    setTimeout(() => setSubmitSuccessMsg(null), 3500);
  };

  // Importar archivo universal (.db o .sql)
  const handleUniversalImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.sql') || fileName.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          handleSqlChange(text);
          soundService.playToken();
          setSubmitSuccessMsg(`¡Script "${file.name}" cargado en el editor SQL!`);
          setTimeout(() => setSubmitSuccessMsg(null), 3500);
        }
      };
      reader.readAsText(file);
    } else {
      // Archivo binario .db o .sqlite
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const buffer = e.target?.result as ArrayBuffer;
          if (buffer) {
            const bytes = new Uint8Array(buffer);
            await sqliteService.openDatabase(bytes);
            await sqliteStorageService.saveDatabase(storageKey, bytes);
            await refreshSchema();
            setLastResult(null);
            soundService.playToken();
            setSubmitSuccessMsg(`¡Base de datos "${file.name}" importada exitosamente!`);
            setTimeout(() => setSubmitSuccessMsg(null), 3500);
          }
        } catch (err: any) {
          alert(`Error al abrir archivo SQLite: ${err?.message || err}`);
        }
      };
      reader.readAsArrayBuffer(file);
    }

    event.target.value = '';
  };

  // Entregar solución del ejercicio al docente
  const handleSubmitExercise = async () => {
    if (!activeExercise) return;

    try {
      const dbInstance = sqliteService.getDatabase();
      let autoCheck = undefined;
      if (dbInstance) {
        autoCheck = sqliteExerciseService.evaluateDatabase(activeExercise, dbInstance);
      }

      const bin = sqliteService.exportBinary();
      let dbBase64 = undefined;
      if (bin) {
        let binaryString = '';
        for (let i = 0; i < bin.length; i++) {
          binaryString += String.fromCharCode(bin[i]);
        }
        dbBase64 = btoa(binaryString);
      }

      const submission: SqliteSubmission = {
        id: `sub_${activeExercise.id}_${user.uid}_${Date.now()}`,
        exerciseId: activeExercise.id,
        studentId: user.uid,
        studentName: user.displayName || 'Estudiante',
        studentEmail: user.email,
        studentGroup: user.group || 'Grupo General',
        sqlCode: currentSql,
        buttonSqlMap: isButtonMode ? sqliteStorageService.loadButtonSqlMap(storageKey) : undefined,
        dbBase64,
        submittedAt: Date.now(),
        status: 'submitted',
        maxScore: 100,
        autoCheckResults: autoCheck
      };

      await sqliteExerciseService.saveSubmission(submission);
      // Respaldar también el estado de la base de datos en la nube
      doSyncToCloud(false);
      soundService.playToken();
      setSubmitSuccessMsg('¡Tu práctica y base de datos SQLite han sido entregadas y respaldadas en la nube con éxito!');
      setTimeout(() => setSubmitSuccessMsg(null), 5000);
    } catch (e: any) {
      alert(`Error al entregar la práctica: ${e?.message || e}`);
    }
  };

  return (
    <div className="sqlite-lab-container">
      {/* ═══ BARRA SUPERIOR (TOOLBAR EXACTA COMO EN LA CAPTURA) ═══ */}
      <header className="sqlite-topbar">
        {/* Izquierda: Volver + Brand + Selector de Espacio */}
        <div className="sqlite-topbar-left">
          <button
            type="button"
            className="sqlite-back-btn"
            onClick={onBack}
            title="Volver"
          >
            <ArrowLeft size={16} />
            <span>Volver</span>
          </button>

          <div className="sqlite-brand">
            <div className="sqlite-brand-icon">
              <Database size={18} />
            </div>
            <h1 className="sqlite-brand-title">SQLite Lab</h1>
          </div>

          {/* Selector de Base de Datos y Ejercicios */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <select
              className="sqlite-exercise-select"
              value={isSandbox ? `db_${activeDbId}` : selectedExerciseId}
              onChange={(e) => {
                const val = e.target.value;
                if (val.startsWith('db_')) {
                  setSelectedExerciseId('sandbox');
                  setActiveDbId(val.replace('db_', ''));
                } else {
                  setSelectedExerciseId(val);
                }
              }}
            >
              <optgroup label="Bases de Datos">
                {userDatabases.map(db => (
                  <option key={db.id} value={`db_${db.id}`}>
                    💾 {db.name}
                  </option>
                ))}
              </optgroup>
              {exercises.length > 0 && (
                <optgroup label="Ejercicios Asignados">
                  {exercises.map(ex => (
                    <option key={ex.id} value={ex.id}>
                      {ex.type === 'button_programming' ? '🖱️' : '📝'} {ex.title}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>

            {/* Botón Nueva BD */}
            <button
              type="button"
              className="sqlite-btn-util"
              onClick={() => setIsNewDbModalOpen(true)}
              style={{ background: '#0284C7', color: '#FFF', borderColor: '#000', fontWeight: 800 }}
              title="Crear una nueva base de datos SQLite"
            >
              <Plus size={14} />
              <span>Nueva BD</span>
            </button>

            {/* Si es una base personalizada creada por el usuario (no default), botón para eliminarla */}
            {isSandbox && activeDbId !== 'default' && (
              <button
                type="button"
                className="sqlite-sidebar-icon-btn"
                onClick={() => handleDeleteDatabase(activeDbId)}
                title="Eliminar esta base de datos"
                style={{ color: '#EF4444' }}
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Derecha: Ejecutar sentencia, Ejecutar todo, Deshacer, Importar, Exportar, Reset */}
        <div className="sqlite-topbar-actions">
          {/* Botón Ejecutar sentencia */}
          <button
            type="button"
            className="sqlite-btn-run-stmt"
            onClick={handleExecute}
            disabled={isRunning || isInitializing || !currentSql.trim()}
            title="Ejecutar instrucción actual (Ctrl + Enter)"
          >
            <Play size={14} fill="currentColor" />
            <span>Ejecutar sentencia</span>
            <span className="sqlite-key-badge">Ctrl ↵</span>
          </button>

          {/* Botón Ejecutar todo */}
          <button
            type="button"
            className="sqlite-btn-run-all hidden sm:inline-flex"
            onClick={handleExecute}
            disabled={isRunning || isInitializing || !currentSql.trim()}
            title="Ejecutar todo el script (Shift + Ctrl + Enter)"
          >
            <Play size={13} fill="currentColor" />
            <span>Ejecutar todo</span>
            <span className="sqlite-key-badge" style={{ background: '#E2E8F0', color: '#0F172A' }}>Shift ↵</span>
          </button>

          {/* Botón Deshacer */}
          <button
            type="button"
            className="sqlite-btn-util"
            onClick={handleUndo}
            title="Deshacer último cambio"
          >
            <Undo2 size={14} />
            <span className="hidden md:inline">Deshacer</span>
          </button>

          {/* Botón Sincronizar en la Nube */}
          <button
            type="button"
            className={`sqlite-btn-util ${syncStatus === 'dirty' ? 'sqlite-btn-cloud-dirty' : syncStatus === 'synced' ? 'sqlite-btn-cloud-synced' : ''}`}
            onClick={handleManualSync}
            disabled={syncStatus === 'syncing' || !user.uid || user.uid === 'guest'}
            title={
              syncStatus === 'syncing'
                ? 'Sincronizando con tu cuenta en la nube...'
                : syncStatus === 'dirty'
                ? 'Tienes cambios pendientes de sincronizar en tu cuenta. Haz clic para guardar ahora.'
                : 'Base de datos y consultas sincronizadas en la nube'
            }
          >
            {syncStatus === 'syncing' ? (
              <Loader2 size={14} className="animate-spin text-sky-600" />
            ) : (
              <Cloud size={14} className={syncStatus === 'dirty' ? 'text-amber-600' : 'text-emerald-600'} />
            )}
            <span>
              {syncStatus === 'syncing'
                ? 'Guardando...'
                : syncStatus === 'dirty'
                ? 'Guardar en la nube'
                : 'Nube al día'}
            </span>
          </button>

          {/* Input de archivo universal oculto */}
          <input
            ref={universalFileInputRef}
            type="file"
            accept=".db,.sqlite,.sqlite3,.sql,.txt"
            style={{ display: 'none' }}
            onChange={handleUniversalImport}
          />

          {/* Botón Importar */}
          <button
            type="button"
            className="sqlite-btn-util"
            onClick={() => universalFileInputRef.current?.click()}
            title="Importar archivo .db (base de datos) o archivo .sql (script)"
          >
            <Upload size={14} />
            <span>Importar</span>
          </button>

          {/* Botón Exportar .db */}
          <button
            type="button"
            className="sqlite-btn-util"
            onClick={handleExportDb}
            title="Descargar base de datos SQLite (.db)"
          >
            <Download size={14} />
            <span>Exportar .db</span>
          </button>

          {/* Botón Exportar .sql */}
          <button
            type="button"
            className="sqlite-btn-util"
            onClick={handleExportSql}
            title="Descargar script SQL (Dump DDL y datos)"
          >
            <FileCode2 size={14} />
            <span>Exportar .sql</span>
          </button>

          {/* Botón Reset */}
          <button
            type="button"
            className="sqlite-btn-reset"
            onClick={() => setIsResetConfirmOpen(true)}
            title="Restablecer base de datos"
          >
            <Trash2 size={14} />
            <span>Reset</span>
          </button>

          {/* Botón Info / Motor */}
          <button
            type="button"
            className="sqlite-btn-util"
            onClick={() => setIsLimitationsOpen(true)}
            title="Información del motor SQLite WASM"
          >
            <Info size={14} />
            <span className="hidden lg:inline">IA / Motor</span>
          </button>
        </div>
      </header>

      {/* ═══ BANNER DE RECUPERACIÓN AUTOMÁTICA DESDE LA NUBE ═══ */}
      {cloudNotice && (
        <div style={{ background: '#EFF6FF', border: '2px solid #000000', boxShadow: '3px 3px 0 #000', borderRadius: 10, padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, color: '#1E3A8A', fontWeight: 800 }}>
          <Cloud size={18} className="text-blue-600 flex-shrink-0" />
          <span>{cloudNotice.message}</span>
        </div>
      )}

      {/* ═══ BANNER DE VERSIÓN MÁS RECIENTE ENCONTRADA EN LA NUBE ═══ */}
      {pendingCloudRestore && (
        <div className="sqlite-cloud-restore-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cloud size={20} className="text-blue-600 flex-shrink-0" />
            <span>{pendingCloudRestore.message}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={handleApplyCloudRestore}
              style={{ background: '#2563EB', color: '#FFF', border: '2px solid #000', borderRadius: 6, padding: '5px 12px', fontWeight: 800, cursor: 'pointer', boxShadow: '2px 2px 0 #000' }}
            >
              Cargar versión de la nube
            </button>
            <button
              type="button"
              onClick={() => setPendingCloudRestore(null)}
              style={{ background: '#FFFFFF', color: '#000', border: '2px solid #000', borderRadius: 6, padding: '5px 10px', fontWeight: 700, cursor: 'pointer', boxShadow: '2px 2px 0 #000' }}
            >
              Mantener local
            </button>
          </div>
        </div>
      )}

      {/* ═══ MENSAJE DE ÉXITO DE ENTREGA ═══ */}
      {submitSuccessMsg && (
        <div style={{ background: '#ECFDF5', border: '2px solid #10B981', boxShadow: '3px 3px 0 #000', borderRadius: 10, padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, color: '#065F46', fontWeight: 700 }}>
          <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
          <span>{submitSuccessMsg}</span>
        </div>
      )}

      {/* ═══ BANNER DE EJERCICIO DOCENTE (SI NO ES SANDBOX) ═══ */}
      {activeExercise && (
        <div className="sqlite-exercise-strip">
          <div>
            <div className="sqlite-exercise-strip-title">
              <span>{activeExercise.type === 'button_programming' ? '🖱️' : '📝'} {activeExercise.title}</span>
              <span style={{ fontSize: '0.65rem', background: '#000', color: '#FFF', padding: '1px 5px', borderRadius: 4, textTransform: 'uppercase' }}>
                {activeExercise.difficulty}
              </span>
            </div>
            <p className="sqlite-exercise-strip-desc">{activeExercise.description}</p>
          </div>

          <div className="flex items-center gap-2">
            {activeExercise.hints && activeExercise.hints.length > 0 && (
              <button
                type="button"
                className="sqlite-btn-util"
                onClick={() => setShowHints(!showHints)}
              >
                <Sparkles size={13} className="text-amber-500" />
                <span>Pistas</span>
              </button>
            )}

            <button
              type="button"
              className="sqlite-btn-submit-ex"
              onClick={handleSubmitExercise}
            >
              <Send size={14} />
              <span>Entregar Solución</span>
            </button>
          </div>
        </div>
      )}

      {/* Pistas si están activas */}
      {showHints && activeExercise?.hints && (
        <div style={{ background: '#FFFBEB', border: '2px solid #F59E0B', borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#B45309', display: 'block', marginBottom: 4 }}>
            💡 Pistas del profesor:
          </span>
          <ul style={{ paddingLeft: 18, margin: 0, fontSize: '0.78rem', color: '#92400E' }}>
            {activeExercise.hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ═══ WORKSPACE: LAYOUT DE 2 COLUMNAS (TABLAS A LA IZQUIERDA, EDITOR Y RESULTADOS A LA DERECHA) ═══ */}
      {isInitializing ? (
        <div className="sqlite-loading-state">
          <div className="sqlite-spinner mb-3" />
          <span className="font-bold text-slate-800 text-sm">
            Cargando motor SQLite WebAssembly...
          </span>
        </div>
      ) : initError ? (
        <div className="sqlite-error-state">
          <AlertTriangle size={36} className="text-red-500 mb-2" />
          <h3 className="font-bold text-slate-900">Error al iniciar el motor SQLite</h3>
          <p className="text-xs text-slate-600 max-w-md text-center mt-1">{initError}</p>
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              className="sqlite-btn-run-stmt"
              onClick={() => setRetryCount(prev => prev + 1)}
            >
              <RotateCcw size={14} />
              <span>Reintentar</span>
            </button>
            <button
              type="button"
              className="sqlite-btn-util"
              onClick={handleResetDatabase}
            >
              <span>Reiniciar base</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="sqlite-layout-grid">
          {/* Panel Izquierdo: TABLES (Con Action Bar y Right Click) */}
          <aside>
            <SchemaViewer
              tables={schemaTables}
              onRefresh={refreshSchema}
              onInsertQuery={handleInsertQuery}
              onCreateTableGui={() => {
                setEditTable(null);
                setIsCreateTableOpen(true);
              }}
              onEditTable={handleEditTable}
              onDeleteTable={handleDeleteTable}
              onViewData={handleViewTableData}
            />
          </aside>

          {/* Área Principal Derecha */}
          <main className="sqlite-main-workspace">
            {isButtonMode && activeExercise ? (
              /* MODO PROGRAMAR BOTONES */
              <ButtonProgrammingLab
                exercise={activeExercise}
                storageKey={storageKey}
                onDatabaseModified={refreshSchema}
              />
            ) : (
              /* MODO PLAYGROUND SQLITE */
              <>
                {/* Editor SQL con Tabs */}
                <SqlEditor
                  tabs={tabs}
                  activeTabId={activeTabId}
                  onSelectTab={setActiveTabId}
                  onAddTab={handleAddTab}
                  onCloseTab={handleCloseTab}
                  value={currentSql}
                  onChange={handleSqlChange}
                  onExecuteStatement={handleExecute}
                  onExecuteAll={handleExecute}
                  isRunning={isRunning}
                />

                {/* Tabla de Resultados */}
                <ResultsTable
                  result={lastResult}
                  isRunning={isRunning}
                />
              </>
            )}
          </main>
        </div>
      )}

      {/* ═══ MODAL DE DOCUMENTACIÓN Y LÍMITES DEL MOTOR ═══ */}
      <SqliteLimitationsModal
        isOpen={isLimitationsOpen}
        onClose={() => setIsLimitationsOpen(false)}
      />

      {/* ═══ MODAL DE CONFIRMACIÓN DE RESTABLECIMIENTO ═══ */}
      {isResetConfirmOpen && (
        <div className="sqlite-modal-overlay">
          <div className="sqlite-modal-dialog" style={{ maxWidth: 440 }}>
            <div className="sqlite-modal-header">
              <h3 className="font-bold text-slate-900">¿Restablecer Base de Datos?</h3>
            </div>
            <div className="sqlite-modal-body">
              <p className="text-slate-700 text-sm">
                Esta acción eliminará las tablas creadas y restablecerá los datos al estado inicial de la práctica.
              </p>
            </div>
            <div className="sqlite-modal-footer">
              <button
                type="button"
                className="sqlite-btn-util"
                onClick={() => setIsResetConfirmOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="sqlite-btn-reset"
                onClick={handleResetDatabase}
              >
                Confirmar y Restablecer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ MODAL DE AUTO-EVALUACIÓN ═══ */}
      {autoCheckModal?.isOpen && (
        <div className="sqlite-modal-overlay">
          <div className="sqlite-modal-dialog">
            <div className="sqlite-modal-header">
              <h3 className="font-bold text-slate-900">Evaluación del Ejercicio</h3>
            </div>
            <div className="sqlite-modal-body">
              {autoCheckModal.passed ? (
                <div style={{ color: '#065F46', fontWeight: 800, marginBottom: 12 }}>
                  ¡Todos los criterios requeridos se cumplieron correctamente!
                </div>
              ) : (
                <div style={{ color: '#991B1B', fontWeight: 800, marginBottom: 12 }}>
                  Faltan algunos requisitos por completar en la base de datos.
                </div>
              )}
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {autoCheckModal.checks.map((c, i) => (
                  <li key={i} style={{ marginBottom: 6, fontSize: '0.8rem' }}>
                    <span style={{ fontWeight: 800, color: c.passed ? '#059669' : '#DC2626' }}>
                      {c.passed ? '✓ ' : '✗ '}
                    </span>
                    {c.description}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sqlite-modal-footer">
              <button
                type="button"
                className="sqlite-btn-run-stmt"
                onClick={() => setAutoCheckModal(null)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ MODAL CREAR / MODIFICAR TABLA POR INTERFAZ (GUI) ═══ */}
      <CreateTableModal
        isOpen={isCreateTableOpen}
        onClose={() => {
          setIsCreateTableOpen(false);
          setEditTable(null);
        }}
        onTableCreated={async () => {
          await refreshSchema();
          const bin = sqliteService.exportBinary();
          if (bin) {
            await sqliteStorageService.saveDatabase(storageKey, bin);
          }
        }}
        onInsertToEditor={(sql) => {
          handleInsertQuery(sql);
        }}
        existingTables={schemaTables}
        editTable={editTable}
      />

      {/* ═══ MODAL CREAR NUEVA BASE DE DATOS ═══ */}
      <NewDatabaseModal
        isOpen={isNewDbModalOpen}
        onClose={() => setIsNewDbModalOpen(false)}
        onCreate={handleCreateNewDatabase}
      />

      {/* ═══ MODAL DE COMPROBACIÓN DE RELACIONES PK / FK AL BORRAR ═══ */}
      <RelationWarningModal
        isOpen={Boolean(tableToDelete)}
        onClose={() => setTableToDelete(null)}
        targetTable={tableToDelete}
        allTables={schemaTables}
        onConfirmDrop={handleConfirmDropTable}
      />
    </div>
  );
};
