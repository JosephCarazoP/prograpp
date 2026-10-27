import { storageService } from './storageService';
import { db } from '../config/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { SqliteExercise, SqliteSubmission } from '../types/sqliteLab';
import { Database } from 'sql.js';

// Lista de ejercicios de inicio precargados
export const PRELOADED_SQLITE_EXERCISES: SqliteExercise[] = [
  {
    id: 'sqlite-ex-1-relational-design',
    title: 'Diseño Relacional: PK, FK y Restricciones',
    description: 'Modela una base de datos universitaria definiendo llaves primarias, foráneas y restricciones de integridad.',
    type: 'free_sql',
    difficulty: 'medium',
    pathId: 'sql',
    unitId: 2,
    objectives: [
      'Crear la tabla "carreras" con llave primaria "id" (INTEGER) y "nombre" (TEXT UNIQUE NOT NULL).',
      'Crear la tabla "estudiantes" con "id" (INTEGER PK), "nombre" (TEXT NOT NULL), "edad" (INTEGER CHECK edad >= 16) y "carrera_id" (INTEGER FK hacia carreras(id)).',
      'Insertar al menos 2 carreras y 3 estudiantes vinculados.',
      'Consultar los estudiantes mostrando el nombre de su carrera con un INNER JOIN.'
    ],
    hints: [
      'Usa: CREATE TABLE carreras (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT UNIQUE NOT NULL);',
      'En estudiantes incluye: FOREIGN KEY (carrera_id) REFERENCES carreras(id) ON DELETE CASCADE',
      'Para verificar las llaves foráneas en SQLite ejecuta: PRAGMA foreign_keys = ON;'
    ],
    initialSql: `-- Script inicial opcional. Puedes modificarlo o borrarlo para escribir tu solución desde cero:
PRAGMA foreign_keys = ON;

-- Escribe aquí tus sentencias CREATE TABLE e INSERT:
`,
    evaluationCriteria: {
      requiredTables: ['carreras', 'estudiantes'],
      requiredColumns: [
        { table: 'carreras', column: 'id' },
        { table: 'carreras', column: 'nombre' },
        { table: 'estudiantes', column: 'id' },
        { table: 'estudiantes', column: 'nombre' },
        { table: 'estudiantes', column: 'carrera_id' }
      ],
      verificationQueries: [
        {
          description: 'Verificar que existan registros en carreras',
          sql: 'SELECT COUNT(*) FROM carreras;',
          expectedMinRows: 1
        },
        {
          description: 'Verificar que existan registros en estudiantes',
          sql: 'SELECT COUNT(*) FROM estudiantes;',
          expectedMinRows: 1
        },
        {
          description: 'Verificar consulta de estudiantes con carrera usando JOIN',
          sql: 'SELECT e.nombre, c.nombre FROM estudiantes e INNER JOIN carreras c ON e.carrera_id = c.id;',
          expectedMinRows: 1
        }
      ]
    },
    assignedToUids: ['all'],
    createdBy: 'josephcarazo56@gmail.com',
    createdAt: 1714000000000
  },
  {
    id: 'sqlite-ex-2-joins-aggregations',
    title: 'Consultas Avanzadas: JOIN, GROUP BY y Agregaciones',
    description: 'Analiza los datos de ventas de una tienda departamental utilizando combinaciones de tablas y funciones de resumen.',
    type: 'free_sql',
    difficulty: 'hard',
    pathId: 'sql',
    unitId: 3,
    objectives: [
      'Obtener el total gastado por cada cliente sumando el precio total de sus compras.',
      'Calcular el promedio de venta por categoría de producto.',
      'Crear una vista llamada "vista_resumen_clientes" que liste: cliente_nombre, cantidad_pedidos y total_gastado.'
    ],
    hints: [
      'Usa SUM(p.precio * dp.cantidad) en conjunto con GROUP BY c.id.',
      'Para la vista: CREATE VIEW vista_resumen_clientes AS SELECT ...'
    ],
    initialSql: `-- Base de datos pre-cargada con tablas de clientes, pedidos y detalles
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  ciudad TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  categoria_id INTEGER,
  precio REAL NOT NULL,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER NOT NULL,
  fecha TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE IF NOT EXISTS detalle_pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pedido_id INTEGER NOT NULL,
  producto_id INTEGER NOT NULL,
  cantidad INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Datos semilla
INSERT INTO clientes (nombre, ciudad) VALUES ('Ana Silva', 'San José'), ('Carlos Rojas', 'Alajuela'), ('Elena Gómez', 'Cartago');
INSERT INTO categorias (nombre) VALUES ('Tecnología'), ('Hogar'), ('Librería');
INSERT INTO productos (nombre, categoria_id, precio) VALUES 
  ('Teclado Mecánico', 1, 45.0),
  ('Monitor 24"', 1, 150.0),
  ('Lámpara LED', 2, 25.0),
  ('Cuaderno Profesional', 3, 5.0);

INSERT INTO pedidos (cliente_id) VALUES (1), (1), (2);
INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad) VALUES 
  (1, 1, 1),
  (1, 2, 1),
  (2, 3, 2),
  (3, 4, 3);
`,
    evaluationCriteria: {
      requiredTables: ['clientes', 'productos', 'pedidos', 'detalle_pedidos', 'vista_resumen_clientes'],
      verificationQueries: [
        {
          description: 'Verificar que la vista vista_resumen_clientes funcione correctamente',
          sql: 'SELECT * FROM vista_resumen_clientes;',
          expectedMinRows: 1
        }
      ]
    },
    assignedToUids: ['all'],
    createdBy: 'josephcarazo56@gmail.com',
    createdAt: 1714000100000
  },
  {
    id: 'sqlite-ex-3-button-crud',
    title: 'Programar Botones: Sistema de Inventario de Productos',
    description: 'Escribe el código SQL que da vida a los botones de un formulario real. Cada botón debe ejecutar la acción CRUD correspondiente usando parámetros enlazados (:codigo, :nombre, :precio, :stock).',
    type: 'button_programming',
    difficulty: 'medium',
    pathId: 'sql',
    unitId: 2,
    objectives: [
      'Programar el botón "Registrar Producto" para insertar los datos del formulario.',
      'Programar el botón "Buscar por Código" para recuperar los datos de un producto.',
      'Programar el botón "Actualizar Precio y Stock" para modificar el producto existente.',
      'Programar el botón "Eliminar Producto" para borrar el registro según su código.',
      'Programar el botón "Listar Todos" para mostrar el inventario completo.'
    ],
    hints: [
      'Para registrar: INSERT INTO productos (codigo, nombre, precio, stock) VALUES (:codigo, :nombre, :precio, :stock);',
      'Para buscar: SELECT * FROM productos WHERE codigo = :codigo;',
      'Para actualizar: UPDATE productos SET precio = :precio, stock = :stock WHERE codigo = :codigo;',
      'Para eliminar: DELETE FROM productos WHERE codigo = :codigo;'
    ],
    initialSql: `PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  precio REAL NOT NULL CHECK(precio >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0)
);

INSERT OR IGNORE INTO productos (codigo, nombre, precio, stock) VALUES
  ('PROD-001', 'Mouse Inalámbrico', 15.50, 20),
  ('PROD-002', 'Auriculares Bluetooth', 35.00, 12);
`,
    buttonConfig: {
      entityName: 'Producto',
      fields: [
        { name: 'codigo', label: 'Código de Producto', type: 'text', placeholder: 'ej. PROD-003', required: true },
        { name: 'nombre', label: 'Nombre del Producto', type: 'text', placeholder: 'ej. Cable HDMI', required: true },
        { name: 'precio', label: 'Precio ($)', type: 'number', placeholder: 'ej. 9.99', required: true },
        { name: 'stock', label: 'Cantidad en Stock', type: 'number', placeholder: 'ej. 50', required: true }
      ],
      buttons: [
        {
          id: 'btn_insert',
          label: 'Registrar Producto',
          actionType: 'insert',
          description: 'Inserta un nuevo producto usando los datos de los 4 campos del formulario.',
          hint: 'INSERT INTO productos (codigo, nombre, precio, stock) VALUES (:codigo, :nombre, :precio, :stock);'
        },
        {
          id: 'btn_select_by_code',
          label: 'Buscar por Código',
          actionType: 'select',
          description: 'Busca y muestra el producto cuyo código coincide con :codigo.',
          hint: 'SELECT * FROM productos WHERE codigo = :codigo;'
        },
        {
          id: 'btn_update',
          label: 'Actualizar Precio y Stock',
          actionType: 'update',
          description: 'Actualiza el precio y el stock del producto indicado en :codigo.',
          hint: 'UPDATE productos SET precio = :precio, stock = :stock WHERE codigo = :codigo;'
        },
        {
          id: 'btn_delete',
          label: 'Eliminar Producto',
          actionType: 'delete',
          description: 'Elimina el producto que coincida con el campo :codigo.',
          hint: 'DELETE FROM productos WHERE codigo = :codigo;'
        },
        {
          id: 'btn_list_all',
          label: 'Listar Todo el Inventario',
          actionType: 'select',
          description: 'Consulta todos los registros de la tabla productos.',
          hint: 'SELECT * FROM productos ORDER BY id ASC;'
        }
      ]
    },
    assignedToUids: ['all'],
    createdBy: 'josephcarazo56@gmail.com',
    createdAt: 1714000200000
  }
];

class SqliteExerciseService {
  /**
   * Obtiene todos los ejercicios disponibles (precargados + creados por docentes)
   */
  public async getAllExercises(): Promise<SqliteExercise[]> {
    const local = storageService.getItem<SqliteExercise[]>('sqlite_custom_exercises', []);
    
    let remote: SqliteExercise[] = [];
    if (db) {
      try {
        const snap = await getDocs(collection(db, 'sqlite_exercises'));
        snap.forEach(d => remote.push(d.data() as SqliteExercise));
      } catch (e) {
        console.warn('Uso de caché local para ejercicios SQLite:', e);
      }
    }

    const customList = remote.length > 0 ? remote : local;
    
    // Solo ejercicios creados por docentes
    const map = new Map<string, SqliteExercise>();
    customList.forEach(ex => map.set(ex.id, ex));

    return Array.from(map.values()).sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Obtiene un ejercicio específico por ID
   */
  public async getExerciseById(id: string): Promise<SqliteExercise | null> {
    const all = await this.getAllExercises();
    return all.find(e => e.id === id) || null;
  }

  /**
   * Guarda o actualiza un ejercicio creado por el docente
   */
  public async saveExercise(exercise: SqliteExercise): Promise<void> {
    const local = storageService.getItem<SqliteExercise[]>('sqlite_custom_exercises', []);
    const idx = local.findIndex(e => e.id === exercise.id);
    if (idx >= 0) {
      local[idx] = exercise;
    } else {
      local.unshift(exercise);
    }
    storageService.setItem('sqlite_custom_exercises', local);

    if (db) {
      try {
        await setDoc(doc(db, 'sqlite_exercises', exercise.id), exercise);
      } catch (e) {
        console.warn('Error sincronizando ejercicio en Firestore:', e);
      }
    }
  }

  /**
   * Elimina un ejercicio personalizado
   */
  public async deleteExercise(exerciseId: string): Promise<void> {
    const local = storageService.getItem<SqliteExercise[]>('sqlite_custom_exercises', []);
    const filtered = local.filter(e => e.id !== exerciseId);
    storageService.setItem('sqlite_custom_exercises', filtered);

    if (db) {
      try {
        await deleteDoc(doc(db, 'sqlite_exercises', exerciseId));
      } catch (e) {
        console.warn('Error eliminando ejercicio de Firestore:', e);
      }
    }
  }

  /**
   * Guarda la entrega de un estudiante
   */
  public async saveSubmission(submission: SqliteSubmission): Promise<void> {
    const local = storageService.getItem<SqliteSubmission[]>('sqlite_submissions', []);
    const idx = local.findIndex(s => s.id === submission.id);
    if (idx >= 0) {
      local[idx] = submission;
    } else {
      local.unshift(submission);
    }
    storageService.setItem('sqlite_submissions', local);

    if (db) {
      try {
        await setDoc(doc(db, 'sqlite_submissions', submission.id), submission);
      } catch (e) {
        console.warn('Error sincronizando entrega SQLite en Firestore:', e);
      }
    }
  }

  /**
   * Obtiene las entregas de un estudiante o ejercicio
   */
  public async getAllSubmissions(): Promise<SqliteSubmission[]> {
    const local = storageService.getItem<SqliteSubmission[]>('sqlite_submissions', []);
    if (db) {
      try {
        const snap = await getDocs(collection(db, 'sqlite_submissions'));
        const remote: SqliteSubmission[] = [];
        snap.forEach(d => remote.push(d.data() as SqliteSubmission));
        if (remote.length > 0) {
          storageService.setItem('sqlite_submissions', remote);
          return remote.sort((a, b) => b.submittedAt - a.submittedAt);
        }
      } catch (e) {
        console.warn('Usando entregas locales de SQLite:', e);
      }
    }
    return local.sort((a, b) => b.submittedAt - a.submittedAt);
  }

  /**
   * Califica manualmente una entrega
   */
  public async gradeSubmission(submissionId: string, score: number, feedback: string): Promise<void> {
    const all = await this.getAllSubmissions();
    const target = all.find(s => s.id === submissionId);
    if (!target) return;

    target.score = score;
    target.feedback = feedback;
    target.status = 'graded';

    await this.saveSubmission(target);
  }

  /**
   * Ejecuta la auto-evaluación estructural y funcional de una base de datos contra los criterios del ejercicio
   */
  public evaluateDatabase(exercise: SqliteExercise, database: Database): {
    passed: boolean;
    checks: { description: string; passed: boolean; details?: string }[];
  } {
    const checks: { description: string; passed: boolean; details?: string }[] = [];
    const crit = exercise.evaluationCriteria;
    if (!crit) {
      return { passed: true, checks: [{ description: 'Sin criterios automatizados configurados', passed: true }] };
    }

    let allPassed = true;

    // 1. Verificación de Tablas Requeridas
    if (crit.requiredTables && crit.requiredTables.length > 0) {
      try {
        const res = database.exec("SELECT name FROM sqlite_master WHERE type IN ('table', 'view');");
        const existingTables = new Set(
          res.length > 0 && res[0].values ? res[0].values.map(v => String(v[0]).toLowerCase()) : []
        );

        crit.requiredTables.forEach(table => {
          const exists = existingTables.has(table.toLowerCase());
          if (!exists) allPassed = false;
          checks.push({
            description: `Tabla o vista requerida: "${table}"`,
            passed: exists,
            details: exists ? 'Existe en el esquema' : 'No se encontró en sqlite_master'
          });
        });
      } catch (e: any) {
        allPassed = false;
        checks.push({
          description: 'Inspección de tablas',
          passed: false,
          details: e?.message
        });
      }
    }

    // 2. Verificación de Columnas Requeridas
    if (crit.requiredColumns && crit.requiredColumns.length > 0) {
      crit.requiredColumns.forEach(req => {
        try {
          const res = database.exec(`PRAGMA table_info("${req.table.replace(/"/g, '""')}");`);
          const columns = res.length > 0 && res[0].values ? res[0].values.map(c => String(c[1]).toLowerCase()) : [];
          const hasCol = columns.includes(req.column.toLowerCase());
          if (!hasCol) allPassed = false;
          checks.push({
            description: `Columna requerida "${req.column}" en tabla "${req.table}"`,
            passed: hasCol,
            details: hasCol ? 'Columna definida' : 'Falta la columna en la tabla'
          });
        } catch (e: any) {
          allPassed = false;
          checks.push({
            description: `Columna "${req.column}" en "${req.table}"`,
            passed: false,
            details: e?.message
          });
        }
      });
    }

    // 3. Verificación de Consultas de Comprobación Funcional
    if (crit.verificationQueries && crit.verificationQueries.length > 0) {
      crit.verificationQueries.forEach(vq => {
        try {
          const res = database.exec(vq.sql);
          if (res.length === 0) {
            allPassed = false;
            checks.push({
              description: vq.description,
              passed: false,
              details: 'La consulta no devolvió resultados.'
            });
            return;
          }

          const rowCount = res[0].values ? res[0].values.length : 0;
          let valid = true;
          let detail = `Retornó ${rowCount} fila(s).`;

          if (vq.expectedMinRows !== undefined && rowCount < vq.expectedMinRows) {
            valid = false;
            detail += ` Se esperaban al menos ${vq.expectedMinRows} filas.`;
          }

          if (vq.expectedExactRows !== undefined && rowCount !== vq.expectedExactRows) {
            valid = false;
            detail += ` Se esperaban exactamente ${vq.expectedExactRows} filas.`;
          }

          if (!valid) allPassed = false;

          checks.push({
            description: vq.description,
            passed: valid,
            details: detail
          });
        } catch (e: any) {
          allPassed = false;
          checks.push({
            description: vq.description,
            passed: false,
            details: `Error al ejecutar consulta de prueba: ${e?.message || e}`
          });
        }
      });
    }

    return {
      passed: allPassed,
      checks
    };
  }
}

export const sqliteExerciseService = new SqliteExerciseService();
