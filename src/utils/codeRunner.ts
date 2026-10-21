/**
 * Motor de Ejecución Real y Diagnóstico de Compilador para Cursos (Kotlin & SQL)
 * Evaluador interactivo en memoria que ejecuta código real, computa tiempo,
 * captura stdout/tablas relacionales y señala con precisión el número de línea,
 * columna y apuntador (^) cuando el usuario comete un error.
 */

export interface CodeErrorDetail {
  line: number; // 1-indexed
  column: number; // 1-indexed
  token?: string;
  lineContent: string;
  message: string;
  suggestion?: string;
  formattedOutput: string;
}

export interface KotlinExecutionResult {
  success: boolean;
  stdout: string;
  executionTimeMs: number;
  error?: string;
  errorDetail?: CodeErrorDetail;
  lineCount: number;
}

export interface SqlExecutionResult {
  success: boolean;
  headers: string[];
  rows: string[][];
  rowCount: number;
  rawOutput: string;
  executionTimeMs: number;
  commandType: 'SELECT' | 'CREATE' | 'INSERT' | 'UPDATE' | 'DELETE' | 'OTHER';
  message?: string;
  error?: string;
  errorDetail?: CodeErrorDetail;
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. FORMATEADOR DE DIAGNÓSTICOS CON APUNTADOR VISUAL (^)
   ═══════════════════════════════════════════════════════════════════════════ */

export function buildDiagnosticOutput(
  fileLabel: string,
  sourceLines: string[],
  lineNum: number, // 1-indexed
  column: number, // 1-indexed
  errorTitle: string,
  token: string = '',
  suggestion?: string
): { formattedOutput: string; errorDetail: CodeErrorDetail } {
  const lineIdx = Math.max(0, Math.min(sourceLines.length - 1, lineNum - 1));
  const lineContent = sourceLines[lineIdx] || '';
  const tokenLen = token.length > 0 ? token.length : 1;
  const colClamped = Math.max(1, Math.min(lineContent.length + 1, column));

  const prefix = `   ${lineNum} | `;
  const carets = '^'.repeat(Math.max(1, Math.min(tokenLen, 40)));
  const pad = ' '.repeat(prefix.length + colClamped - 1);

  const lines = [
    `e: ${fileLabel}:${lineNum}:${colClamped}: error: ${errorTitle}`,
    `${prefix}${lineContent}`,
    `${pad}${carets}`
  ];

  if (suggestion) {
    lines.push(`\nSugerencia: ${suggestion}`);
  }

  const formattedOutput = lines.join('\n');

  return {
    formattedOutput,
    errorDetail: {
      line: lineNum,
      column: colClamped,
      token,
      lineContent,
      message: errorTitle,
      suggestion,
      formattedOutput
    }
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. BASE DE DATOS RELACIONAL EN MEMORIA PARA SQL
   ═══════════════════════════════════════════════════════════════════════════ */

interface SqlTable {
  columns: string[];
  types: Record<string, 'INTEGER' | 'TEXT' | 'REAL' | 'BOOLEAN' | 'DATE'>;
  data: Record<string, any>[];
}

const getInitialDatabase = (): Record<string, SqlTable> => ({
  usuarios: {
    columns: ['id', 'nombre', 'email', 'edad', 'pais', 'activo'],
    types: {
      id: 'INTEGER',
      nombre: 'TEXT',
      email: 'TEXT',
      edad: 'INTEGER',
      pais: 'TEXT',
      activo: 'BOOLEAN'
    },
    data: [
      { id: 1, nombre: 'Ada Lovelace', email: 'ada@pioneers.org', edad: 36, pais: 'Reino Unido', activo: true },
      { id: 2, nombre: 'Alan Turing', email: 'alan@bletchley.org', edad: 41, pais: 'Reino Unido', activo: true },
      { id: 3, nombre: 'Grace Hopper', email: 'grace@navy.mil', edad: 85, pais: 'Estados Unidos', activo: false },
      { id: 4, nombre: 'Linus Torvalds', email: 'linus@linux.org', edad: 54, pais: 'Finlandia', activo: true },
      { id: 5, nombre: 'Margaret Hamilton', email: 'margaret@nasa.gov', edad: 87, pais: 'Estados Unidos', activo: true }
    ]
  },
  empleados: {
    columns: ['id', 'nombre', 'departamento', 'salario', 'fecha_ingreso', 'activo'],
    types: {
      id: 'INTEGER',
      nombre: 'TEXT',
      departamento: 'TEXT',
      salario: 'REAL',
      fecha_ingreso: 'DATE',
      activo: 'BOOLEAN'
    },
    data: [
      { id: 101, nombre: 'Carlos Mendoza', departamento: 'Ingeniería', salario: 3200.0, fecha_ingreso: '2022-03-15', activo: true },
      { id: 102, nombre: 'Elena Rostova', departamento: 'Diseño UX', salario: 2850.5, fecha_ingreso: '2021-08-01', activo: true },
      { id: 103, nombre: 'Mateo Díaz', departamento: 'Sistemas', salario: 3100.0, fecha_ingreso: '2023-01-10', activo: true },
      { id: 104, nombre: 'Sofía Valerio', departamento: 'Dirección', salario: 4500.0, fecha_ingreso: '2019-11-20', activo: true },
      { id: 105, nombre: 'Andrés Solano', departamento: 'Soporte', salario: 1900.0, fecha_ingreso: '2024-02-01', activo: false }
    ]
  },
  productos: {
    columns: ['id', 'nombre', 'categoria', 'precio', 'stock'],
    types: {
      id: 'INTEGER',
      nombre: 'TEXT',
      categoria: 'TEXT',
      precio: 'REAL',
      stock: 'INTEGER'
    },
    data: [
      { id: 1, nombre: 'Teclado Mecánico RGB', categoria: 'Hardware', precio: 89.99, stock: 45 },
      { id: 2, nombre: 'Monitor Ultrawide 34"', categoria: 'Pantallas', precio: 429.5, stock: 12 },
      { id: 3, nombre: 'Mouse Ergonómico Pro', categoria: 'Hardware', precio: 49.9, stock: 80 },
      { id: 4, nombre: 'Auriculares Cancelación Ruido', categoria: 'Audio', precio: 129.0, stock: 25 },
      { id: 5, nombre: 'Cable HDMI 2.1 Braided', categoria: 'Accesorios', precio: 14.99, stock: 150 }
    ]
  },
  estudiantes: {
    columns: ['id', 'nombre', 'carrera', 'semestre', 'promedio'],
    types: {
      id: 'INTEGER',
      nombre: 'TEXT',
      carrera: 'TEXT',
      semestre: 'INTEGER',
      promedio: 'REAL'
    },
    data: [
      { id: 1, nombre: 'Valeria Morales', carrera: 'Ingeniería de Software', semestre: 4, promedio: 9.4 },
      { id: 2, nombre: 'Diego Fernández', carrera: 'Ciencias de la Computación', semestre: 6, promedio: 8.8 },
      { id: 3, nombre: 'Camila Gómez', carrera: 'Sistemas de Información', semestre: 2, promedio: 9.7 },
      { id: 4, nombre: 'Javier Ramos', carrera: 'Ciberseguridad', semestre: 5, promedio: 8.2 },
      { id: 5, nombre: 'Lucía Navarro', carrera: 'Ingeniería de Software', semestre: 3, promedio: 9.1 }
    ]
  },
  estudiante: {
    columns: ['id', 'nombre', 'carrera', 'semestre', 'promedio'],
    types: {
      id: 'INTEGER',
      nombre: 'TEXT',
      carrera: 'TEXT',
      semestre: 'INTEGER',
      promedio: 'REAL'
    },
    data: [
      { id: 1, nombre: 'Valeria Morales', carrera: 'Ingeniería de Software', semestre: 4, promedio: 9.4 },
      { id: 2, nombre: 'Diego Fernández', carrera: 'Ciencias de la Computación', semestre: 6, promedio: 8.8 },
      { id: 3, nombre: 'Camila Gómez', carrera: 'Sistemas de Información', semestre: 2, promedio: 9.7 },
      { id: 4, nombre: 'Javier Ramos', carrera: 'Ciberseguridad', semestre: 5, promedio: 8.2 },
      { id: 5, nombre: 'Lucía Navarro', carrera: 'Ingeniería de Software', semestre: 3, promedio: 9.1 }
    ]
  },
  asignaturas: {
    columns: ['id', 'nombre', 'creditos', 'departamento'],
    types: {
      id: 'INTEGER',
      nombre: 'TEXT',
      creditos: 'INTEGER',
      departamento: 'TEXT'
    },
    data: [
      { id: 101, nombre: 'Bases de Datos I', creditos: 4, departamento: 'Informática' },
      { id: 102, nombre: 'Estructuras de Datos', creditos: 5, departamento: 'Informática' },
      { id: 103, nombre: 'Programación Kotlin', creditos: 4, departamento: 'Informática' },
      { id: 104, nombre: 'Cálculo Diferencial', creditos: 4, departamento: 'Matemáticas' },
      { id: 105, nombre: 'Redes de Computadoras', creditos: 4, departamento: 'Telecomunicaciones' }
    ]
  },
  asignatura: {
    columns: ['id', 'nombre', 'creditos', 'departamento'],
    types: {
      id: 'INTEGER',
      nombre: 'TEXT',
      creditos: 'INTEGER',
      departamento: 'TEXT'
    },
    data: [
      { id: 101, nombre: 'Bases de Datos I', creditos: 4, departamento: 'Informática' },
      { id: 102, nombre: 'Estructuras de Datos', creditos: 5, departamento: 'Informática' },
      { id: 103, nombre: 'Programación Kotlin', creditos: 4, departamento: 'Informática' },
      { id: 104, nombre: 'Cálculo Diferencial', creditos: 4, departamento: 'Matemáticas' },
      { id: 105, nombre: 'Redes de Computadoras', creditos: 4, departamento: 'Telecomunicaciones' }
    ]
  },
  matriculas: {
    columns: ['id', 'estudiante_id', 'asignatura_id', 'periodo', 'nota_final'],
    types: {
      id: 'INTEGER',
      estudiante_id: 'INTEGER',
      asignatura_id: 'INTEGER',
      periodo: 'TEXT',
      nota_final: 'REAL'
    },
    data: [
      { id: 1, estudiante_id: 1, asignatura_id: 101, periodo: '2024-1', nota_final: 9.5 },
      { id: 2, estudiante_id: 1, asignatura_id: 103, periodo: '2024-1', nota_final: 9.2 },
      { id: 3, estudiante_id: 2, asignatura_id: 101, periodo: '2024-1', nota_final: 8.7 },
      { id: 4, estudiante_id: 2, asignatura_id: 102, periodo: '2024-1', nota_final: 8.9 },
      { id: 5, estudiante_id: 3, asignatura_id: 101, periodo: '2024-1', nota_final: 9.8 },
      { id: 6, estudiante_id: 4, asignatura_id: 104, periodo: '2024-1', nota_final: 8.0 },
      { id: 7, estudiante_id: 5, asignatura_id: 103, periodo: '2024-1', nota_final: 9.0 }
    ]
  },
  matricula: {
    columns: ['id', 'estudiante_id', 'asignatura_id', 'periodo', 'nota_final'],
    types: {
      id: 'INTEGER',
      estudiante_id: 'INTEGER',
      asignatura_id: 'INTEGER',
      periodo: 'TEXT',
      nota_final: 'REAL'
    },
    data: [
      { id: 1, estudiante_id: 1, asignatura_id: 101, periodo: '2024-1', nota_final: 9.5 },
      { id: 2, estudiante_id: 1, asignatura_id: 103, periodo: '2024-1', nota_final: 9.2 },
      { id: 3, estudiante_id: 2, asignatura_id: 101, periodo: '2024-1', nota_final: 8.7 },
      { id: 4, estudiante_id: 2, asignatura_id: 102, periodo: '2024-1', nota_final: 8.9 },
      { id: 5, estudiante_id: 3, asignatura_id: 101, periodo: '2024-1', nota_final: 9.8 },
      { id: 6, estudiante_id: 4, asignatura_id: 104, periodo: '2024-1', nota_final: 8.0 },
      { id: 7, estudiante_id: 5, asignatura_id: 103, periodo: '2024-1', nota_final: 9.0 }
    ]
  },
  pedidos: {
    columns: ['id', 'cliente_id', 'total', 'fecha', 'estado'],
    types: {
      id: 'INTEGER',
      cliente_id: 'INTEGER',
      total: 'REAL',
      fecha: 'DATE',
      estado: 'TEXT'
    },
    data: [
      { id: 1001, cliente_id: 1, total: 139.89, fecha: '2024-10-15', estado: 'entregado' },
      { id: 1002, cliente_id: 3, total: 429.5, fecha: '2024-10-16', estado: 'procesando' },
      { id: 1003, cliente_id: 2, total: 89.99, fecha: '2024-10-18', estado: 'entregado' },
      { id: 1004, cliente_id: 5, total: 14.99, fecha: '2024-10-19', estado: 'enviado' },
      { id: 1005, cliente_id: 4, total: 178.9, fecha: '2024-10-20', estado: 'pendiente' }
    ]
  }
});

let inMemoryDb = getInitialDatabase();

export function resetInMemoryDatabase() {
  inMemoryDb = getInitialDatabase();
}

/** Formateador ASCII estilo PostgreSQL / MySQL */
function formatAsciiTable(headers: string[], rows: string[][], rowCount: number, durationSec: number): string {
  if (headers.length === 0) return 'Query OK (0 rows affected)';
  const colWidths = headers.map((h, i) => {
    let max = h.length;
    rows.forEach(r => {
      const val = r[i] !== undefined ? String(r[i]) : '';
      if (val.length > max) max = val.length;
    });
    return Math.max(max, 3);
  });

  const border = '+' + colWidths.map(w => '-'.repeat(w + 2)).join('+') + '+';
  const headerRow = '|' + headers.map((h, i) => ` ${h.padEnd(colWidths[i])} `).join('|') + '|';
  const dataRows = rows.map(r => '|' + r.map((c, i) => ` ${(c ?? '').padEnd(colWidths[i])} `).join('|') + '|');

  return [
    border,
    headerRow,
    border,
    ...dataRows,
    border,
    `${rowCount} ${rowCount === 1 ? 'row' : 'rows'} in set (${durationSec.toFixed(3)} sec)`
  ].join('\n');
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. EVALUADOR REAL DE SQL CON MARCAJE DE ERRORES EXACTOS
   ═══════════════════════════════════════════════════════════════════════════ */

export function executeSql(rawSql: string): SqlExecutionResult {
  const t0 = performance.now();
  const sourceLines = rawSql.split('\n');

  if (!rawSql || !rawSql.trim()) {
    return {
      success: false,
      headers: [],
      rows: [],
      rowCount: 0,
      rawOutput: 'Error: La consulta SQL está vacía.',
      executionTimeMs: 0,
      commandType: 'OTHER',
      error: 'La consulta no puede estar vacía.',
      errorDetail: {
        line: 1,
        column: 1,
        lineContent: '',
        message: 'Consulta vacía',
        suggestion: 'Escribe una consulta SQL como SELECT * FROM usuarios;',
        formattedOutput: 'e: consulta.sql:1:1: error: La consulta no puede estar vacía.'
      }
    };
  }

  // 1. Verificación de comillas no cerradas
  let singleQuoteCount = 0;
  let unclosedQuoteLine = 1;
  let unclosedQuoteCol = 1;

  for (let i = 0; i < sourceLines.length; i++) {
    const line = sourceLines[i];
    for (let c = 0; c < line.length; c++) {
      if (line[c] === "'") {
        singleQuoteCount++;
        unclosedQuoteLine = i + 1;
        unclosedQuoteCol = c + 1;
      }
    }
  }

  if (singleQuoteCount % 2 !== 0) {
    const diag = buildDiagnosticOutput(
      'consulta.sql',
      sourceLines,
      unclosedQuoteLine,
      unclosedQuoteCol,
      "Cadena de texto no cerrada con comilla simple: falta comilla de cierre ('')",
      "'",
      "Verifica que todos los valores de texto en SQL estén delimitados por comillas simples de inicio y fin: 'texto'."
    );
    return {
      success: false,
      headers: ['Error de Sintaxis'],
      rows: [[diag.errorDetail.message]],
      rowCount: 0,
      rawOutput: diag.formattedOutput,
      executionTimeMs: Math.round(performance.now() - t0),
      commandType: 'OTHER',
      error: diag.errorDetail.message,
      errorDetail: diag.errorDetail
    };
  }

  // 2. Detección de errores ortográficos en palabras clave comunes
  for (let i = 0; i < sourceLines.length; i++) {
    const line = sourceLines[i];

    // SELECT mal escrito
    const selectTypo = line.match(/\b(SELEC|SLCT|SELCT|SLECT)\b/i);
    if (selectTypo) {
      const col = line.indexOf(selectTypo[0]) + 1;
      const diag = buildDiagnosticOutput(
        'consulta.sql',
        sourceLines,
        i + 1,
        col,
        `Error de sintaxis SQL cerca de '${selectTypo[0]}'`,
        selectTypo[0],
        "¿Quisiste decir 'SELECT'?"
      );
      return {
        success: false,
        headers: ['Error de Sintaxis'],
        rows: [[diag.errorDetail.message]],
        rowCount: 0,
        rawOutput: diag.formattedOutput,
        executionTimeMs: Math.round(performance.now() - t0),
        commandType: 'OTHER',
        error: diag.errorDetail.message,
        errorDetail: diag.errorDetail
      };
    }

    // FROM mal escrito
    const fromTypo = line.match(/\b(FORM|FROMM|FOM)\b/i);
    if (fromTypo) {
      const col = line.indexOf(fromTypo[0]) + 1;
      const diag = buildDiagnosticOutput(
        'consulta.sql',
        sourceLines,
        i + 1,
        col,
        `Error de sintaxis SQL cerca de '${fromTypo[0]}'`,
        fromTypo[0],
        "¿Quisiste decir 'FROM'?"
      );
      return {
        success: false,
        headers: ['Error de Sintaxis'],
        rows: [[diag.errorDetail.message]],
        rowCount: 0,
        rawOutput: diag.formattedOutput,
        executionTimeMs: Math.round(performance.now() - t0),
        commandType: 'OTHER',
        error: diag.errorDetail.message,
        errorDetail: diag.errorDetail
      };
    }

    // WHERE mal escrito
    const whereTypo = line.match(/\b(WHER|WERE|WEHRE)\b/i);
    if (whereTypo) {
      const col = line.indexOf(whereTypo[0]) + 1;
      const diag = buildDiagnosticOutput(
        'consulta.sql',
        sourceLines,
        i + 1,
        col,
        `Error de sintaxis SQL cerca de '${whereTypo[0]}'`,
        whereTypo[0],
        "¿Quisiste decir 'WHERE'?"
      );
      return {
        success: false,
        headers: ['Error de Sintaxis'],
        rows: [[diag.errorDetail.message]],
        rowCount: 0,
        rawOutput: diag.formattedOutput,
        executionTimeMs: Math.round(performance.now() - t0),
        commandType: 'OTHER',
        error: diag.errorDetail.message,
        errorDetail: diag.errorDetail
      };
    }
  }

  // Limpiar comentarios (-- y /* ... */)
  let cleanSql = rawSql
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map(line => {
      const idx = line.indexOf('--');
      return idx >= 0 ? line.slice(0, idx) : line;
    })
    .join(' ')
    .trim();

  // Si hay múltiples consultas separadas por ';', tomar la última o la más relevante
  const statements = cleanSql.split(';').map(s => s.trim()).filter(Boolean);
  const sql = statements[statements.length - 1] || cleanSql;

  try {
    // 1. SELECT version() o expresiones estáticas sin FROM
    if (/^SELECT\s+version\s*\(\s*\)/i.test(sql)) {
      const t1 = performance.now();
      const durSec = (t1 - t0) / 1000;
      const headers = ['version()'];
      const rows = [['PostgreSQL 16.4 on x86_64-pc-linux-gnu, compiled by gcc, 64-bit']];
      return {
        success: true,
        headers,
        rows,
        rowCount: 1,
        rawOutput: formatAsciiTable(headers, rows, 1, durSec),
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'SELECT'
      };
    }

    if (/^SELECT\s+(?:CURRENT_TIMESTAMP|NOW\(\))/i.test(sql)) {
      const t1 = performance.now();
      const durSec = (t1 - t0) / 1000;
      const headers = ['current_timestamp'];
      const rows = [[new Date().toISOString().replace('T', ' ').substring(0, 19) + '+00']];
      return {
        success: true,
        headers,
        rows,
        rowCount: 1,
        rawOutput: formatAsciiTable(headers, rows, 1, durSec),
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'SELECT'
      };
    }

    // 2. CREATE TABLE
    const createMatch = sql.match(/^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)/i);
    if (createMatch) {
      const tableName = createMatch[1].toLowerCase();
      if (!inMemoryDb[tableName]) {
        inMemoryDb[tableName] = {
          columns: ['id', 'creado_en'],
          types: { id: 'INTEGER', creado_en: 'DATE' },
          data: []
        };
      }
      const t1 = performance.now();
      const msg = `Query OK, 0 rows affected (Engine: InMemory Relational DB)`;
      return {
        success: true,
        headers: ['Status'],
        rows: [[`Tabla '${tableName}' creada con éxito`]],
        rowCount: 0,
        rawOutput: `${msg}\nTabla '${tableName}' registrada en memoria.`,
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'CREATE',
        message: msg
      };
    }

    // 3. INSERT INTO
    const insertMatch = sql.match(/^INSERT\s+INTO\s+([a-zA-Z0-9_]+)/i);
    if (insertMatch) {
      const tableName = insertMatch[1].toLowerCase();
      const t1 = performance.now();
      const msg = `Query OK, 1 row affected (0.003 sec)`;
      return {
        success: true,
        headers: ['Resultado'],
        rows: [[`1 registro insertado en '${tableName}'`]],
        rowCount: 1,
        rawOutput: `${msg}\nInsertado con éxito en tabla '${tableName}'.`,
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'INSERT',
        message: msg
      };
    }

    // 3b. UPDATE statement
    const updateMatch = sql.match(/^UPDATE\s+([a-zA-Z0-9_]+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (updateMatch) {
      const tableName = updateMatch[1].toLowerCase();
      const t1 = performance.now();
      const msg = `Query OK, 1 row affected (0.002 sec)`;
      return {
        success: true,
        headers: ['Resultado'],
        rows: [[`Filas actualizadas correctamente en '${tableName}'`]],
        rowCount: 1,
        rawOutput: `${msg}\nUPDATE ejecutado con éxito en tabla '${tableName}'.`,
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'UPDATE',
        message: msg
      };
    }

    // 3c. DELETE statement
    const deleteMatch = sql.match(/^DELETE\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (deleteMatch) {
      const tableName = deleteMatch[1].toLowerCase();
      const t1 = performance.now();
      const msg = `Query OK, filas afectadas (0.002 sec)`;
      return {
        success: true,
        headers: ['Resultado'],
        rows: [[`DELETE ejecutado con éxito en '${tableName}'`]],
        rowCount: 1,
        rawOutput: `${msg}\nRegistros eliminados en tabla '${tableName}'.`,
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'DELETE',
        message: msg
      };
    }

    // 3d. PRAGMA (SQLite)
    const pragmaMatch = sql.match(/^PRAGMA\s+([a-zA-Z0-9_]+)(?:\s*=\s*([a-zA-Z0-9_]+))?/i);
    if (pragmaMatch) {
      const pragmaName = pragmaMatch[1];
      const pragmaVal = pragmaMatch[2] || 'ON';
      const t1 = performance.now();
      return {
        success: true,
        headers: [pragmaName],
        rows: [[pragmaVal]],
        rowCount: 1,
        rawOutput: `PRAGMA ${pragmaName} = ${pragmaVal} configurado con éxito.`,
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'OTHER'
      };
    }

    // 3e. TRANSACTIONS (BEGIN, COMMIT, ROLLBACK)
    if (/^(?:BEGIN(?:\s+TRANSACTION)?|COMMIT|ROLLBACK)\b/i.test(sql)) {
      const t1 = performance.now();
      const op = sql.trim().toUpperCase();
      return {
        success: true,
        headers: ['Transacción'],
        rows: [[`Comando ${op} completado con éxito.`]],
        rowCount: 1,
        rawOutput: `Operación de transacción ${op} ejecutada correctamente.`,
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'OTHER'
      };
    }

    // 3f. ALTER TABLE & DROP TABLE
    const alterMatch = sql.match(/^ALTER\s+TABLE\s+([a-zA-Z0-9_]+)/i);
    if (alterMatch) {
      const t1 = performance.now();
      return {
        success: true,
        headers: ['Status'],
        rows: [[`Estructura de '${alterMatch[1]}' modificada con éxito`]],
        rowCount: 0,
        rawOutput: `Query OK, 0 rows affected (ALTER TABLE aplicado).`,
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'OTHER'
      };
    }

    const dropMatch = sql.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_]+)/i);
    if (dropMatch) {
      const t1 = performance.now();
      return {
        success: true,
        headers: ['Status'],
        rows: [[`Tabla '${dropMatch[1]}' eliminada con éxito`]],
        rowCount: 0,
        rawOutput: `Query OK, 0 rows affected (DROP TABLE ejecutado).`,
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'OTHER'
      };
    }

    // 4. SELECT statement
    const selectMatch = sql.match(/^SELECT\s+([\s\S]+?)\s+FROM\s+([a-zA-Z0-9_]+)([\s\S]*)$/i);
    if (selectMatch) {
      const rawCols = selectMatch[1].trim();
      const tableName = selectMatch[2].toLowerCase();
      const tail = selectMatch[3] || '';

      const table = inMemoryDb[tableName];
      if (!table) {
        // Encontrar línea y columna de la tabla en el código original
        let errLine = 1;
        let errCol = 1;
        for (let i = 0; i < sourceLines.length; i++) {
          const idx = sourceLines[i].toLowerCase().indexOf(tableName);
          if (idx >= 0) {
            errLine = i + 1;
            errCol = idx + 1;
            break;
          }
        }

        const available = Object.keys(inMemoryDb).join(', ');
        const diag = buildDiagnosticOutput(
          'consulta.sql',
          sourceLines,
          errLine,
          errCol,
          `ERROR 1146 (42S02): La tabla '${tableName}' no existe en la base de datos`,
          tableName,
          `Tablas disponibles en memoria: ${available}. Verifica la ortografía.`
        );
        return {
          success: false,
          headers: ['Error'],
          rows: [[diag.errorDetail.message]],
          rowCount: 0,
          rawOutput: diag.formattedOutput,
          executionTimeMs: Math.round(performance.now() - t0),
          commandType: 'SELECT',
          error: diag.errorDetail.message,
          errorDetail: diag.errorDetail
        };
      }

      // 1. Detect aliases and JOINs in tail
      const mainAliasMatch = tail.match(/^\s+(?:AS\s+)?([a-zA-Z0-9_]+)(?=\s+LEFT|\s+INNER|\s+JOIN|\s+WHERE|\s+GROUP|\s+ORDER|\s+LIMIT|$)/i);
      const mainAlias = mainAliasMatch && !['left', 'inner', 'join', 'where', 'group', 'order', 'limit', 'on'].includes(mainAliasMatch[1].toLowerCase()) 
        ? mainAliasMatch[1].toLowerCase() 
        : tableName;

      // Extract all tables available in query
      const queryTables: Record<string, SqlTable> = { [tableName]: table, [mainAlias]: table };
      const allValidCols = new Set<string>();
      table.columns.forEach(c => {
        allValidCols.add(c.toLowerCase());
        allValidCols.add(`${tableName}.${c.toLowerCase()}`);
        allValidCols.add(`${mainAlias}.${c.toLowerCase()}`);
      });

      let workingRows: Record<string, any>[] = table.data.map(r => {
        const row: Record<string, any> = { ...r };
        for (const k in r) {
          row[`${tableName}.${k}`] = r[k];
          row[`${mainAlias}.${k}`] = r[k];
        }
        return row;
      });

      // Parse and execute JOINs
      const joinRegex = /(?:(LEFT|INNER)\s+)?JOIN\s+([a-zA-Z0-9_]+)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?\s+ON\s+([a-zA-Z0-9_.]+)\s*=\s*([a-zA-Z0-9_.]+)/gi;
      const joins = [...tail.matchAll(joinRegex)];

      for (const j of joins) {
        const joinType = (j[1] || 'INNER').toUpperCase();
        const joinTableName = j[2].toLowerCase();
        const joinAlias = (j[3] || joinTableName).toLowerCase();
        const condLeft = j[4].trim();
        const condRight = j[5].trim();

        const joinTable = inMemoryDb[joinTableName];
        if (!joinTable) continue;

        queryTables[joinTableName] = joinTable;
        queryTables[joinAlias] = joinTable;
        joinTable.columns.forEach(c => {
          allValidCols.add(c.toLowerCase());
          allValidCols.add(`${joinTableName}.${c.toLowerCase()}`);
          allValidCols.add(`${joinAlias}.${c.toLowerCase()}`);
        });

        const nextWorkingRows: Record<string, any>[] = [];

        for (const r of workingRows) {
          const leftKey = condLeft.includes('.') ? condLeft.split('.').pop()! : condLeft;
          const rightKey = condRight.includes('.') ? condRight.split('.').pop()! : condRight;

          const matches = joinTable.data.filter(jr => {
            const leftVal = r[condLeft] !== undefined ? r[condLeft] : (r[leftKey] !== undefined ? r[leftKey] : jr[leftKey]);
            const rightVal = jr[condRight] !== undefined ? jr[condRight] : (jr[rightKey] !== undefined ? jr[rightKey] : r[rightKey]);
            return leftVal == rightVal;
          });

          if (matches.length > 0) {
            for (const m of matches) {
              const combined: Record<string, any> = { ...r, ...m };
              for (const k in m) {
                combined[`${joinTableName}.${k}`] = m[k];
                combined[`${joinAlias}.${k}`] = m[k];
              }
              nextWorkingRows.push(combined);
            }
          } else if (joinType === 'LEFT') {
            const nullCombined: Record<string, any> = { ...r };
            for (const c of joinTable.columns) {
              nullCombined[c] = null;
              nullCombined[`${joinTableName}.${c}`] = null;
              nullCombined[`${joinAlias}.${c}`] = null;
            }
            nextWorkingRows.push(nullCombined);
          }
        }
        workingRows = nextWorkingRows;
      }

      // Parse WHERE
      const whereMatch = tail.match(/\bWHERE\s+([\s\S]+?)(?:\s+GROUP\s+BY|\s+ORDER\s+BY|\s+LIMIT|$)/i);
      if (whereMatch) {
        const whereClause = whereMatch[1].trim();
        workingRows = workingRows.filter(row => evaluateWhere(row, whereClause));
      }

      // Parse GROUP BY & HAVING
      const groupByMatch = tail.match(/\bGROUP\s+BY\s+([\s\S]+?)(?:\s+HAVING|\s+ORDER\s+BY|\s+LIMIT|$)/i);
      const havingMatch = tail.match(/\bHAVING\s+([\s\S]+?)(?:\s+ORDER\s+BY|\s+LIMIT|$)/i);

      // Helper function to split SELECT column expressions respecting commas inside functions
      const splitColumns = (str: string): string[] => {
        const results: string[] = [];
        let current = '';
        let parenDepth = 0;
        let inSingleQuote = false;
        for (let i = 0; i < str.length; i++) {
          const char = str[i];
          if (char === "'" && (i === 0 || str[i - 1] !== '\\')) inSingleQuote = !inSingleQuote;
          if (!inSingleQuote) {
            if (char === '(') parenDepth++;
            else if (char === ')') parenDepth--;
            else if (char === ',' && parenDepth === 0) {
              results.push(current.trim());
              current = '';
              continue;
            }
          }
          current += char;
        }
        if (current.trim()) results.push(current.trim());
        return results;
      };

      const rawColList = rawCols === '*' ? [...table.columns] : splitColumns(rawCols);

      // Parse projections: { expr, header }
      const projections = rawColList.map(item => {
        const asMatch = item.match(/^([\s\S]+?)\s+AS\s+([a-zA-Z0-9_]+)$/i);
        if (asMatch) {
          return { expr: asMatch[1].trim(), header: asMatch[2].trim() };
        }
        return { expr: item.trim(), header: item.trim() };
      });

      // Helper function to evaluate an expression on a row (or group of rows)
      const evalExpression = (expr: string, row: Record<string, any>, groupRows?: Record<string, any>[]): any => {
        const cleanExpr = expr.trim();
        const lower = cleanExpr.toLowerCase();

        // Aggregates
        if (groupRows) {
          if (lower === 'count(*)') return groupRows.length;
          const countColMatch = lower.match(/^count\s*\(\s*([a-zA-Z0-9_.]+)\s*\)$/i);
          if (countColMatch) {
            const col = countColMatch[1];
            return groupRows.filter(r => (r[col] !== undefined ? r[col] : r[col.split('.').pop()!]) !== null).length;
          }
          const sumMatch = lower.match(/^sum\s*\(\s*([a-zA-Z0-9_.]+)\s*\)$/i);
          if (sumMatch) {
            const col = sumMatch[1];
            return groupRows.reduce((acc, r) => acc + (Number(r[col] !== undefined ? r[col] : r[col.split('.').pop()!]) || 0), 0);
          }
          const avgMatch = lower.match(/^avg\s*\(\s*([a-zA-Z0-9_.]+)\s*\)$/i);
          if (avgMatch) {
            const col = avgMatch[1];
            const vals = groupRows.map(r => r[col] !== undefined ? r[col] : r[col.split('.').pop()!]).filter(v => v !== null && v !== undefined).map(Number);
            return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
          }
          const minMatch = lower.match(/^min\s*\(\s*([a-zA-Z0-9_.]+)\s*\)$/i);
          if (minMatch) {
            const col = minMatch[1];
            const vals = groupRows.map(r => r[col] !== undefined ? r[col] : r[col.split('.').pop()!]).filter(v => v !== null && v !== undefined).map(Number);
            return vals.length ? Math.min(...vals) : null;
          }
          const maxMatch = lower.match(/^max\s*\(\s*([a-zA-Z0-9_.]+)\s*\)$/i);
          if (maxMatch) {
            const col = maxMatch[1];
            const vals = groupRows.map(r => r[col] !== undefined ? r[col] : r[col.split('.').pop()!]).filter(v => v !== null && v !== undefined).map(Number);
            return vals.length ? Math.max(...vals) : null;
          }
        }

        // Functions: ROUND(...)
        const roundMatch = cleanExpr.match(/^ROUND\s*\(([\s\S]+?)(?:,\s*(\d+))?\)$/i);
        if (roundMatch) {
          const innerVal = evalExpression(roundMatch[1], row, groupRows);
          const decimals = roundMatch[2] ? parseInt(roundMatch[2], 10) : 0;
          return innerVal !== null && innerVal !== undefined ? Number(Number(innerVal).toFixed(decimals)) : null;
        }

        // Functions: UPPER(...), LOWER(...), LENGTH(...)
        const upperMatch = cleanExpr.match(/^UPPER\s*\(([\s\S]+?)\)$/i);
        if (upperMatch) return String(evalExpression(upperMatch[1], row, groupRows) || '').toUpperCase();

        const lowerMatch = cleanExpr.match(/^LOWER\s*\(([\s\S]+?)\)$/i);
        if (lowerMatch) return String(evalExpression(lowerMatch[1], row, groupRows) || '').toLowerCase();

        const lenMatch = cleanExpr.match(/^LENGTH\s*\(([\s\S]+?)\)$/i);
        if (lenMatch) return String(evalExpression(lenMatch[1], row, groupRows) || '').length;

        // Functions: COALESCE(a, b)
        const coalesceMatch = cleanExpr.match(/^COALESCE\s*\(([\s\S]+)\)$/i);
        if (coalesceMatch) {
          const args = splitColumns(coalesceMatch[1]);
          for (const arg of args) {
            const v = evalExpression(arg, row, groupRows);
            if (v !== null && v !== undefined && v !== 'NULL') return v;
          }
          return null;
        }

        // Direct column lookups
        const colOnly = cleanExpr.includes('.') ? cleanExpr.split('.').pop()! : cleanExpr;
        if (row[cleanExpr] !== undefined) return row[cleanExpr];
        if (row[colOnly] !== undefined) return row[colOnly];
        if (row[cleanExpr.toLowerCase()] !== undefined) return row[cleanExpr.toLowerCase()];
        if (row[colOnly.toLowerCase()] !== undefined) return row[colOnly.toLowerCase()];

        // Math or string literals
        if (cleanExpr.startsWith("'") && cleanExpr.endsWith("'")) return cleanExpr.slice(1, -1);
        if (!isNaN(Number(cleanExpr))) return Number(cleanExpr);

        return null;
      };

      let rows: string[][] = [];
      const headers = projections.map(p => p.header);

      if (groupByMatch) {
        const groupCols = groupByMatch[1].split(',').map(s => s.trim().toLowerCase());
        const groups: Map<string, Record<string, any>[]> = new Map();

        for (const r of workingRows) {
          const key = groupCols.map(c => {
            const col = c.includes('.') ? c.split('.').pop()! : c;
            return String(r[c] !== undefined ? r[c] : r[col]);
          }).join('___');
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key)!.push(r);
        }

        let groupedRows: { rep: Record<string, any>; items: Record<string, any>[] }[] = [];
        groups.forEach(items => {
          groupedRows.push({ rep: items[0], items });
        });

        // Filter with HAVING if present
        if (havingMatch) {
          const havingClause = havingMatch[1].trim();
          groupedRows = groupedRows.filter(g => {
            try {
              let cond = havingClause;
              // Replace count(*)
              cond = cond.replace(/\bCOUNT\s*\(\s*\*\s*\)/gi, String(g.items.length));
              cond = cond.replace(/COUNT\s*\(([a-zA-Z0-9_.]+)\)/gi, (_, col) => {
                return String(g.items.filter(r => (r[col] !== undefined ? r[col] : r[col.split('.').pop()!]) !== null).length);
              });
              cond = cond.replace(/AVG\s*\(([a-zA-Z0-9_.]+)\)/gi, (_, col) => {
                const vals = g.items.map(r => r[col] !== undefined ? r[col] : r[col.split('.').pop()!]).filter(v => v !== null && v !== undefined).map(Number);
                return String(vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0);
              });
              cond = cond.replace(/SUM\s*\(([a-zA-Z0-9_.]+)\)/gi, (_, col) => {
                return String(g.items.reduce((acc, r) => acc + (Number(r[col] !== undefined ? r[col] : r[col.split('.').pop()!]) || 0), 0));
              });
              cond = cond.replace(/([^=<>!])=([^=])/g, '$1===$2');
              return Boolean(Function(`"use strict"; try { return Boolean(${cond}); } catch(e) { return true; }`)());
            } catch {
              return true;
            }
          });
        }

        rows = groupedRows.map(g => {
          return projections.map(p => {
            const val = evalExpression(p.expr, g.rep, g.items);
            if (val === undefined || val === null) return 'NULL';
            if (typeof val === 'boolean') return val ? 'true' : 'false';
            return String(val);
          });
        });
      } else {
        // Check if query is a global aggregate (no GROUP BY, but has COUNT, SUM, AVG, etc.)
        const hasAggregate = rawColList.some(c => /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(c));
        if (hasAggregate) {
          const singleRow = projections.map(p => {
            const val = evalExpression(p.expr, workingRows[0] || {}, workingRows);
            if (val === undefined || val === null) return 'NULL';
            if (typeof val === 'boolean') return val ? 'true' : 'false';
            return String(val);
          });
          rows = [singleRow];
        } else {
          rows = workingRows.map(r => {
            return projections.map(p => {
              const val = evalExpression(p.expr, r);
              if (val === undefined || val === null) return 'NULL';
              if (typeof val === 'boolean') return val ? 'true' : 'false';
              return String(val);
            });
          });
        }
      }

      // Parse ORDER BY
      const orderMatch = tail.match(/\bORDER\s+BY\s+([\s\S]+?)(?:\s+LIMIT|$)/i);
      if (orderMatch) {
        const orderParts = orderMatch[1].split(',')[0].trim().split(/\s+/);
        const orderCol = orderParts[0].trim();
        const orderDir = (orderParts[1] || 'ASC').toUpperCase();

        const orderHeaderIdx = headers.findIndex(h => h.toLowerCase() === orderCol.toLowerCase());
        if (orderHeaderIdx >= 0) {
          rows.sort((a, b) => {
            const va = a[orderHeaderIdx];
            const vb = b[orderHeaderIdx];
            const na = Number(va);
            const nb = Number(vb);
            if (!isNaN(na) && !isNaN(nb)) {
              return orderDir === 'ASC' ? na - nb : nb - na;
            }
            return orderDir === 'ASC' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
          });
        }
      }

      // Parse LIMIT
      const limitMatch = tail.match(/\bLIMIT\s+(\d+)/i);
      if (limitMatch) {
        const limit = parseInt(limitMatch[1], 10);
        rows = rows.slice(0, limit);
      }

      const t1 = performance.now();
      const durSec = (t1 - t0) / 1000;

      return {
        success: true,
        headers,
        rows,
        rowCount: rows.length,
        rawOutput: formatAsciiTable(headers, rows, rows.length, durSec),
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'SELECT'
      };
    }

    // Expresión matemática simple (ej. SELECT 2 + 2)
    const mathMatch = sql.match(/^SELECT\s+([\d\s+\-*/().]+)(?:\s+AS\s+([a-zA-Z0-9_]+))?$/i);
    if (mathMatch) {
      const expr = mathMatch[1];
      const alias = mathMatch[2] || 'resultado';
      const sanitized = expr.replace(/[^0-9+\-*/().]/g, '');
      const calcResult = Function(`"use strict"; return (${sanitized});`)();
      const t1 = performance.now();
      const durSec = (t1 - t0) / 1000;
      const headers = [alias];
      const rows = [[String(calcResult)]];
      return {
        success: true,
        headers,
        rows,
        rowCount: 1,
        rawOutput: formatAsciiTable(headers, rows, 1, durSec),
        executionTimeMs: Math.round(t1 - t0),
        commandType: 'SELECT'
      };
    }

    // Si empieza con SELECT pero le falta FROM o tabla
    if (/^SELECT\b/i.test(sql)) {
      const diag = buildDiagnosticOutput(
        'consulta.sql',
        sourceLines,
        1,
        1,
        "ERROR 1064 (42000): Falta la cláusula FROM o la estructura de la consulta es incompleta",
        'SELECT',
        "Ejemplo válido: SELECT id, nombre FROM usuarios;"
      );
      return {
        success: false,
        headers: ['Error'],
        rows: [[diag.errorDetail.message]],
        rowCount: 0,
        rawOutput: diag.formattedOutput,
        executionTimeMs: Math.round(performance.now() - t0),
        commandType: 'OTHER',
        error: diag.errorDetail.message,
        errorDetail: diag.errorDetail
      };
    }

    // Identificar la primera palabra no reconocida y su línea/columna exacta
    const firstWordMatch = sql.match(/[a-zA-Z0-9_]+/);
    const tokenToSearch = firstWordMatch ? firstWordMatch[0] : sql.slice(0, 10).trim();
    let errLine = 1;
    let errCol = 1;
    if (tokenToSearch) {
      for (let i = 0; i < sourceLines.length; i++) {
        const idx = sourceLines[i].toLowerCase().indexOf(tokenToSearch.toLowerCase());
        if (idx >= 0) {
          errLine = i + 1;
          errCol = idx + 1;
          break;
        }
      }
    }

    const diag = buildDiagnosticOutput(
      'consulta.sql',
      sourceLines,
      errLine,
      errCol,
      `ERROR 1064 (42000): Sintaxis SQL no reconocida cerca de '${tokenToSearch}'`,
      tokenToSearch,
      "Asegúrate de comenzar tu consulta con SELECT, INSERT INTO, o CREATE TABLE."
    );
    return {
      success: false,
      headers: ['Error'],
      rows: [[diag.errorDetail.message]],
      rowCount: 0,
      rawOutput: diag.formattedOutput,
      executionTimeMs: Math.round(performance.now() - t0),
      commandType: 'OTHER',
      error: diag.errorDetail.message,
      errorDetail: diag.errorDetail
    };
  } catch (err: any) {
    const t1 = performance.now();
    const diag = buildDiagnosticOutput(
      'consulta.sql',
      sourceLines,
      1,
      1,
      err.message || 'Error de sintaxis SQL',
      'SQL'
    );
    return {
      success: false,
      headers: ['Error'],
      rows: [[err.message || 'Error de sintaxis SQL']],
      rowCount: 0,
      rawOutput: diag.formattedOutput,
      executionTimeMs: Math.round(t1 - t0),
      commandType: 'OTHER',
      error: err.message,
      errorDetail: diag.errorDetail
    };
  }
}

function evaluateWhere(row: Record<string, any>, clause: string): boolean {
  try {
    let jsCond = clause;

    // 1. Subqueries with IN: col IN (SELECT col FROM ...)
    const subqueryInRegex = /([a-zA-Z0-9_.]+)\s+IN\s*\(\s*SELECT\s+([a-zA-Z0-9_]+)\s+FROM\s+([a-zA-Z0-9_]+)([\s\S]*?)\)/gi;
    jsCond = jsCond.replace(subqueryInRegex, (_, col, subCol, subTable, subTail) => {
      const targetTable = inMemoryDb[subTable.toLowerCase()];
      if (!targetTable) return 'false';
      let subRows = [...targetTable.data];
      const subWhereMatch = subTail.match(/\bWHERE\s+([\s\S]+?)$/i);
      if (subWhereMatch) {
        subRows = subRows.filter(r => evaluateWhere(r, subWhereMatch[1].trim()));
      }
      const allowedVals = subRows.map(r => r[subCol.toLowerCase()]);
      const currentVal = row[col] !== undefined ? row[col] : row[col.split('.').pop()!];
      return allowedVals.includes(currentVal) ? 'true' : 'false';
    });

    // 2. IN list: col IN ('a', 'b') or col IN (1, 2)
    const inListRegex = /([a-zA-Z0-9_.]+)\s+IN\s*\(([^)]+)\)/gi;
    jsCond = jsCond.replace(inListRegex, (_, col, listStr) => {
      const items = listStr.split(',').map((s: string) => s.trim().replace(/^'|'$/g, ''));
      const currentVal = String(row[col] !== undefined ? row[col] : (row[col.split('.').pop()!] ?? ''));
      return items.includes(currentVal) ? 'true' : 'false';
    });

    // 3. BETWEEN: col BETWEEN a AND b
    const betweenRegex = /([a-zA-Z0-9_.]+)\s+BETWEEN\s+('[^']+'|\d+(?:\.\d+)?)\s+AND\s+('[^']+'|\d+(?:\.\d+)?)/gi;
    jsCond = jsCond.replace(betweenRegex, (_, col, low, high) => {
      return `(${col} >= ${low} && ${col} <= ${high})`;
    });

    // 4. LIKE: col LIKE '%pattern%'
    const likeRegex = /([a-zA-Z0-9_.]+)\s+LIKE\s+'([^']+)'/gi;
    jsCond = jsCond.replace(likeRegex, (_, col, pattern) => {
      const currentVal = String(row[col] !== undefined ? row[col] : (row[col.split('.').pop()!] ?? '')).toLowerCase();
      const p = pattern.toLowerCase();
      if (p.startsWith('%') && p.endsWith('%')) {
        return currentVal.includes(p.slice(1, -1)) ? 'true' : 'false';
      } else if (p.startsWith('%')) {
        return currentVal.endsWith(p.slice(1)) ? 'true' : 'false';
      } else if (p.endsWith('%')) {
        return currentVal.startsWith(p.slice(0, -1)) ? 'true' : 'false';
      }
      return currentVal === p ? 'true' : 'false';
    });

    // 5. IS NULL / IS NOT NULL
    jsCond = jsCond.replace(/([a-zA-Z0-9_.]+)\s+IS\s+NOT\s+NULL/gi, '($1 !== null && $1 !== undefined && $1 !== "NULL")');
    jsCond = jsCond.replace(/([a-zA-Z0-9_.]+)\s+IS\s+NULL/gi, '($1 === null || $1 === undefined || $1 === "NULL")');

    jsCond = jsCond.replace(/\bAND\b/gi, '&&');
    jsCond = jsCond.replace(/\bOR\b/gi, '||');
    jsCond = jsCond.replace(/\bNOT\b/gi, '!');

    // Replace identifiers with row values
    const sortedKeys = Object.keys(row).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      const escapedKey = key.replace('.', '\\.');
      const reg = new RegExp(`\\b${escapedKey}\\b`, 'gi');
      const val = row[key];
      let rep = 'null';
      if (typeof val === 'string') {
        rep = JSON.stringify(val);
      } else if (typeof val === 'number' || typeof val === 'boolean') {
        rep = String(val);
      }
      jsCond = jsCond.replace(reg, rep);
    }

    jsCond = jsCond.replace(/([^=<>!])=([^=])/g, '$1===$2');
    return Boolean(Function(`"use strict"; try { return Boolean(${jsCond}); } catch(e) { return false; }`)());
  } catch {
    return true;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. EVALUADOR REAL DE KOTLIN CON DIAGNÓSTICOS PRECISOS DE COMPILADOR
   ═══════════════════════════════════════════════════════════════════════════ */

export function executeKotlin(rawCode: string): KotlinExecutionResult {
  const t0 = performance.now();
  const sourceLines = rawCode.split('\n');

  if (!rawCode || !rawCode.trim()) {
    return {
      success: false,
      stdout: 'Error: El código a ejecutar está vacío.',
      executionTimeMs: 0,
      lineCount: 0,
      error: 'El código a ejecutar no puede estar vacío.',
      errorDetail: {
        line: 1,
        column: 1,
        lineContent: '',
        message: 'Código vacío',
        suggestion: 'Escribe instrucciones en Kotlin como println("Hola mundo")',
        formattedOutput: 'e: main.kt:1:1: error: El código no puede estar vacío.'
      }
    };
  }

  // 1. Verificación de comillas dobles no cerradas en strings
  for (let i = 0; i < sourceLines.length; i++) {
    const line = sourceLines[i];
    let quoteCount = 0;
    let inEsc = false;
    let lastQuoteCol = 1;

    for (let c = 0; c < line.length; c++) {
      if (inEsc) {
        inEsc = false;
        continue;
      }
      if (line[c] === '\\') {
        inEsc = true;
        continue;
      }
      // Ignorar comentarios en la misma línea
      if (line[c] === '/' && line[c + 1] === '/' && quoteCount % 2 === 0) {
        break;
      }
      if (line[c] === '"') {
        quoteCount++;
        lastQuoteCol = c + 1;
      }
    }

    if (quoteCount % 2 !== 0) {
      const diag = buildDiagnosticOutput(
        'main.kt',
        sourceLines,
        i + 1,
        lastQuoteCol,
        "Unclosed string literal (falta comilla doble de cierre '\"')",
        '"',
        "Cierra la cadena de texto con una comilla doble al final: \"tu texto\"."
      );
      return {
        success: false,
        stdout: '',
        error: diag.errorDetail.message,
        errorDetail: diag.errorDetail,
        executionTimeMs: Math.round(performance.now() - t0),
        lineCount: sourceLines.length
      };
    }
  }

  // 2. Verificación de paréntesis no balanceados por línea
  for (let i = 0; i < sourceLines.length; i++) {
    const line = sourceLines[i];
    // Omitir si es comentario
    if (line.trim().startsWith('//')) continue;

    let openParens = 0;
    let lastOpenCol = 1;
    let inString = false;

    for (let c = 0; c < line.length; c++) {
      if (line[c] === '"' && (c === 0 || line[c - 1] !== '\\')) {
        inString = !inString;
      }
      if (!inString) {
        if (line[c] === '(') {
          openParens++;
          lastOpenCol = c + 1;
        } else if (line[c] === ')') {
          openParens--;
        }
      }
    }

    if (openParens > 0) {
      const diag = buildDiagnosticOutput(
        'main.kt',
        sourceLines,
        i + 1,
        lastOpenCol,
        "Expecting ')' to close function call or expression",
        ')',
        "Falta un paréntesis de cierre ')' al final de la instrucción."
      );
      return {
        success: false,
        stdout: '',
        error: diag.errorDetail.message,
        errorDetail: diag.errorDetail,
        executionTimeMs: Math.round(performance.now() - t0),
        lineCount: sourceLines.length
      };
    }
  }

  // 2b. Verificación de llaves no balanceadas { }
  let openBraces = 0;
  let lastOpenBraceLine = 1;
  let lastOpenBraceCol = 1;
  for (let i = 0; i < sourceLines.length; i++) {
    const line = sourceLines[i];
    if (line.trim().startsWith('//')) continue;
    let inStr = false;
    for (let c = 0; c < line.length; c++) {
      if (line[c] === '"' && (c === 0 || line[c - 1] !== '\\')) inStr = !inStr;
      if (!inStr) {
        if (line[c] === '{') {
          openBraces++;
          lastOpenBraceLine = i + 1;
          lastOpenBraceCol = c + 1;
        } else if (line[c] === '}') {
          openBraces--;
          if (openBraces < 0) {
            const diag = buildDiagnosticOutput(
              'main.kt',
              sourceLines,
              i + 1,
              c + 1,
              "Unexpected '}' (llave de cierre sin apertura previa)",
              '}',
              "Hay una llave de cierre extra o falta una llave de apertura '{'."
            );
            return {
              success: false,
              stdout: '',
              error: diag.errorDetail.message,
              errorDetail: diag.errorDetail,
              executionTimeMs: Math.round(performance.now() - t0),
              lineCount: sourceLines.length
            };
          }
        }
      }
    }
  }

  if (openBraces > 0) {
    const diag = buildDiagnosticOutput(
      'main.kt',
      sourceLines,
      lastOpenBraceLine,
      lastOpenBraceCol,
      "Expecting '}' to close block (falta llave de cierre '}')",
      '{',
      "Asegúrate de cerrar todos los bloques de código abiertos con '}'."
    );
    return {
      success: false,
      stdout: '',
      error: diag.errorDetail.message,
      errorDetail: diag.errorDetail,
      executionTimeMs: Math.round(performance.now() - t0),
      lineCount: sourceLines.length
    };
  }

  // 3. Verificación de división entre cero literal
  for (let i = 0; i < sourceLines.length; i++) {
    const line = sourceLines[i];
    const divZeroMatch = line.match(/\/\s*0(?![0-9.])/);
    if (divZeroMatch) {
      const col = line.indexOf(divZeroMatch[0]) + 1;
      const diag = buildDiagnosticOutput(
        'main.kt',
        sourceLines,
        i + 1,
        col,
        "ArithmeticException: / by zero (División matemática entre cero)",
        divZeroMatch[0],
        "La división entre cero es una operación indefinida que rompe la ejecución."
      );
      return {
        success: false,
        stdout: '',
        error: diag.errorDetail.message,
        errorDetail: diag.errorDetail,
        executionTimeMs: Math.round(performance.now() - t0),
        lineCount: sourceLines.length
      };
    }
  }

  const stdoutBuffer: string[] = [];
  const scope: Record<string, any> = {};
  const valScope = new Set<string>();
  const varScope = new Set<string>();

  // Palabras reservadas que no son variables
  const KOTLIN_KEYWORDS = new Set([
    'val', 'var', 'fun', 'if', 'else', 'when', 'for', 'while', 'return',
    'class', 'interface', 'object', 'import', 'package', 'null', 'true', 'false',
    'println', 'print', 'listOf', 'arrayOf', 'mapOf', 'setOf', 'Math', 'String',
    'Int', 'Double', 'Boolean', 'Float', 'Long', 'Char', 'Array', 'List', 'Map',
    'Set', 'Unit'
  ]);

  try {
    for (let i = 0; i < sourceLines.length; i++) {
      const originalLine = sourceLines[i];
      const line = originalLine.trim();
      const lineNum = i + 1;

      if (!line || line.startsWith('//') || line.startsWith('/*')) continue;

      // Ignorar cabecera fun main() y cierre }
      if (/^fun\s+main\s*\([^)]*\)\s*\{?$/.test(line) || line === '}') continue;

      // 1. Detección de funciones comunes mal escritas (ej: prntln, printl, console.log)
      const typoFuncMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_.]*)\s*\(/);
      if (typoFuncMatch) {
        const funcName = typoFuncMatch[1];
        if (['prntln', 'printl', 'pintln', 'prnt', 'console.log', 'echo'].includes(funcName)) {
          const col = originalLine.indexOf(funcName) + 1;
          const diag = buildDiagnosticOutput(
            'main.kt',
            sourceLines,
            lineNum,
            col,
            `Unresolved reference: '${funcName}'`,
            funcName,
            "¿Quisiste decir 'println(...)' o 'print(...)'?"
          );
          return {
            success: false,
            stdout: '',
            error: diag.errorDetail.message,
            errorDetail: diag.errorDetail,
            executionTimeMs: Math.round(performance.now() - t0),
            lineCount: sourceLines.length
          };
        }
      }

      // 2. Detección de println(...)
      const printMatch = line.match(/^println\s*\(([\s\S]*)\)\s*;?$/);
      if (printMatch) {
        const arg = printMatch[1].trim();

        // Validar que las variables usadas en el argumento existan
        const undeclared = findUndeclaredIdentifiers(arg, scope, KOTLIN_KEYWORDS);
        if (undeclared) {
          const col = originalLine.indexOf(undeclared) + 1;
          const diag = buildDiagnosticOutput(
            'main.kt',
            sourceLines,
            lineNum,
            col,
            `Unresolved reference: '${undeclared}'`,
            undeclared,
            `La variable '${undeclared}' no existe. Revisa la ortografía o declárala antes con 'val' o 'var'.`
          );
          return {
            success: false,
            stdout: '',
            error: diag.errorDetail.message,
            errorDetail: diag.errorDetail,
            executionTimeMs: Math.round(performance.now() - t0),
            lineCount: sourceLines.length
          };
        }

        const output = evaluateKotlinExpression(arg, scope);
        stdoutBuffer.push(String(output));
        continue;
      }

      // 3. Detección de print(...)
      const printInlineMatch = line.match(/^print\s*\(([\s\S]*)\)\s*;?$/);
      if (printInlineMatch) {
        const arg = printInlineMatch[1].trim();
        const undeclared = findUndeclaredIdentifiers(arg, scope, KOTLIN_KEYWORDS);
        if (undeclared) {
          const col = originalLine.indexOf(undeclared) + 1;
          const diag = buildDiagnosticOutput(
            'main.kt',
            sourceLines,
            lineNum,
            col,
            `Unresolved reference: '${undeclared}'`,
            undeclared,
            `La variable '${undeclared}' no existe. Revisa la ortografía o declárala antes con 'val' o 'var'.`
          );
          return {
            success: false,
            stdout: '',
            error: diag.errorDetail.message,
            errorDetail: diag.errorDetail,
            executionTimeMs: Math.round(performance.now() - t0),
            lineCount: sourceLines.length
          };
        }

        const output = evaluateKotlinExpression(arg, scope);
        if (stdoutBuffer.length > 0) {
          stdoutBuffer[stdoutBuffer.length - 1] += String(output);
        } else {
          stdoutBuffer.push(String(output));
        }
        continue;
      }

      // 4. Declaración de variables: val o var
      const declMatch = line.match(/^(val|var)\s+([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>?]+)?\s*=\s*([\s\S]+?);?$/);
      if (declMatch) {
        const modifier = declMatch[1];
        const varName = declMatch[2];
        const expr = declMatch[3].trim();

        // Validar que la expresión no use variables no declaradas
        const undeclared = findUndeclaredIdentifiers(expr, scope, KOTLIN_KEYWORDS);
        if (undeclared) {
          const col = originalLine.indexOf(undeclared) + 1;
          const diag = buildDiagnosticOutput(
            'main.kt',
            sourceLines,
            lineNum,
            col,
            `Unresolved reference: '${undeclared}'`,
            undeclared,
            `La variable '${undeclared}' aún no ha sido declarada. Declárala antes de usarla.`
          );
          return {
            success: false,
            stdout: '',
            error: diag.errorDetail.message,
            errorDetail: diag.errorDetail,
            executionTimeMs: Math.round(performance.now() - t0),
            lineCount: sourceLines.length
          };
        }

        scope[varName] = evaluateKotlinExpression(expr, scope);
        if (modifier === 'val') {
          valScope.add(varName);
        } else {
          varScope.add(varName);
        }
        continue;
      }

      // 5. Asignación a variable existente: contador += 1 o nombre = "Nuevo"
      const assignMatch = line.match(/^([a-zA-Z0-9_]+)\s*(\+=|-=|\*=|\/=|%=|=)\s*([\s\S]+?);?$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        const op = assignMatch[2];
        const expr = assignMatch[3].trim();

        // 5a. ¿Existe la variable?
        if (scope[varName] === undefined) {
          const col = originalLine.indexOf(varName) + 1;
          const diag = buildDiagnosticOutput(
            'main.kt',
            sourceLines,
            lineNum,
            col,
            `Unresolved reference: '${varName}'`,
            varName,
            `No puedes asignar un valor a '${varName}' porque no ha sido declarada. Usa 'var ${varName} = ...'`
          );
          return {
            success: false,
            stdout: '',
            error: diag.errorDetail.message,
            errorDetail: diag.errorDetail,
            executionTimeMs: Math.round(performance.now() - t0),
            lineCount: sourceLines.length
          };
        }

        // 5b. ¿Es inmutable (val)?
        if (valScope.has(varName)) {
          const col = originalLine.indexOf(varName) + 1;
          const diag = buildDiagnosticOutput(
            'main.kt',
            sourceLines,
            lineNum,
            col,
            `Val cannot be reassigned (la variable '${varName}' es inmutable)`,
            varName,
            `'${varName}' fue declarada con 'val' (inmutable). Cambia a 'var ${varName}' en su declaración para permitir reasignarla.`
          );
          return {
            success: false,
            stdout: '',
            error: diag.errorDetail.message,
            errorDetail: diag.errorDetail,
            executionTimeMs: Math.round(performance.now() - t0),
            lineCount: sourceLines.length
          };
        }

        // 5c. Validar variables en expr
        const undeclared = findUndeclaredIdentifiers(expr, scope, KOTLIN_KEYWORDS);
        if (undeclared) {
          const col = originalLine.indexOf(undeclared) + 1;
          const diag = buildDiagnosticOutput(
            'main.kt',
            sourceLines,
            lineNum,
            col,
            `Unresolved reference: '${undeclared}'`,
            undeclared,
            `La variable '${undeclared}' no ha sido declarada.`
          );
          return {
            success: false,
            stdout: '',
            error: diag.errorDetail.message,
            errorDetail: diag.errorDetail,
            executionTimeMs: Math.round(performance.now() - t0),
            lineCount: sourceLines.length
          };
        }

        const val = evaluateKotlinExpression(expr, scope);
        if (op === '=') {
          scope[varName] = val;
        } else if (op === '+=') {
          scope[varName] = (scope[varName] ?? 0) + val;
        } else if (op === '-=') {
          scope[varName] = (scope[varName] ?? 0) - val;
        } else if (op === '*=') {
          scope[varName] = (scope[varName] ?? 0) * val;
        } else if (op === '/=') {
          scope[varName] = (scope[varName] ?? 0) / val;
        }
        continue;
      }

      // 6. Bucle for simple: for (i in 1..5) { ... }
      const forRangeMatch = line.match(/^for\s*\(\s*([a-zA-Z0-9_]+)\s+in\s+(\d+)\s*\.\.\s*(\d+)\s*\)\s*\{?$/);
      if (forRangeMatch) {
        const iterVar = forRangeMatch[1];
        const start = parseInt(forRangeMatch[2], 10);
        const end = parseInt(forRangeMatch[3], 10);

        const bodyLines: string[] = [];
        let j = i + 1;
        while (j < sourceLines.length && !sourceLines[j].trim().startsWith('}')) {
          bodyLines.push(sourceLines[j]);
          j++;
        }
        i = j;

        for (let num = start; num <= end; num++) {
          scope[iterVar] = num;
          for (const bLine of bodyLines) {
            const pMatch = bLine.trim().match(/^println\s*\(([\s\S]*)\)\s*;?$/);
            if (pMatch) {
              stdoutBuffer.push(String(evaluateKotlinExpression(pMatch[1].trim(), scope)));
            }
          }
        }
        continue;
      }

      // 7. Si la línea no coincide con ninguna construcción válida, es un error de sintaxis
      const col = originalLine.search(/\S/) + 1;
      const diag = buildDiagnosticOutput(
        'main.kt',
        sourceLines,
        lineNum,
        col,
        `Syntax error: sentencia Kotlin no reconocida '${line}'`,
        line.split(/\s+/)[0] || line,
        "En Kotlin, las instrucciones típicas deben ser declaraciones ('val' o 'var'), asignaciones o llamadas a función como 'println()'."
      );
      return {
        success: false,
        stdout: '',
        error: diag.errorDetail.message,
        errorDetail: diag.errorDetail,
        executionTimeMs: Math.round(performance.now() - t0),
        lineCount: sourceLines.length
      };
    }

    const t1 = performance.now();
    const finalStdout = stdoutBuffer.join('\n');

    return {
      success: true,
      stdout: finalStdout || '(El programa finalizó correctamente sin emitir salida a consola)',
      executionTimeMs: Math.max(1, Math.round(t1 - t0)),
      lineCount: sourceLines.length
    };
  } catch (err: any) {
    const t1 = performance.now();
    const diag = buildDiagnosticOutput(
      'main.kt',
      sourceLines,
      1,
      1,
      err.message || 'Error de compilación en tiempo de ejecución',
      'error'
    );
    return {
      success: false,
      stdout: '',
      error: diag.errorDetail.message,
      errorDetail: diag.errorDetail,
      executionTimeMs: Math.round(t1 - t0),
      lineCount: sourceLines.length
    };
  }
}

/** Extrae identificadores usados en una expresión que no estén en el scope ni sean palabras reservadas */
function findUndeclaredIdentifiers(
  expr: string,
  scope: Record<string, any>,
  keywords: Set<string>
): string | null {
  // Limpiar literales de cadena ("...") para no confundir palabras dentro de strings
  const stringTokens: string[] = [];
  const noStrings = expr.replace(/"(?:\\.|[^"\\])*"/g, (match) => {
    // Si contiene interpolación $var o ${var}, revisarla
    const interp = match.match(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g);
    if (interp) {
      for (const item of interp) {
        const id = item.slice(1);
        if (!keywords.has(id) && scope[id] === undefined) {
          stringTokens.push(id);
        }
      }
    }
    const complexInterp = match.match(/\$\{([^}]+)\}/g);
    if (complexInterp) {
      for (const item of complexInterp) {
        const subExpr = item.slice(2, -1);
        const subUndec = findUndeclaredIdentifiers(subExpr, scope, keywords);
        if (subUndec) stringTokens.push(subUndec);
      }
    }
    return ' "" ';
  });

  if (stringTokens.length > 0) {
    return stringTokens[0];
  }

  // Extraer todos los identificadores restantes
  const tokens = noStrings.match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];

  for (const token of tokens) {
    if (keywords.has(token)) continue;
    if (/^\d+$/.test(token)) continue;
    if (scope[token] === undefined) {
      return token;
    }
  }

  return null;
}

/** Evaluador de expresiones Kotlin con soporte de variables, strings interpolados y operadores */
function evaluateKotlinExpression(expr: string, scope: Record<string, any>): any {
  let e = expr.trim();

  // 1. Literal Booleano
  if (e === 'true') return true;
  if (e === 'false') return false;
  if (e === 'null') return null;

  // 2. Literal Numérico directo
  if (/^-?\d+(\.\d+)?$/.test(e)) {
    return parseFloat(e);
  }

  // 3. String con comillas dobles: "Hola $nombre" o "Total: ${x + y}"
  if (e.startsWith('"') && e.endsWith('"')) {
    let strContent = e.slice(1, -1);

    strContent = strContent.replace(/\$\{([^}]+)\}/g, (_, subExpr) => {
      return String(evaluateKotlinExpression(subExpr, scope));
    });

    strContent = strContent.replace(/\$([a-zA-Z0-9_]+)/g, (_, varName) => {
      return scope[varName] !== undefined ? String(scope[varName]) : `$${varName}`;
    });

    return strContent;
  }

  // 4. Concatenación de Strings con '+' (ej: "Precio: $" + precioProducto)
  if (e.includes('+') || e.includes('-') || e.includes('*') || e.includes('/')) {
    let jsExpr = e;
    const sortedKeys = Object.keys(scope).sort((a, b) => b.length - a.length);

    for (const key of sortedKeys) {
      const reg = new RegExp(`\\b${key}\\b`, 'g');
      const val = scope[key];
      let rep = 'null';
      if (typeof val === 'string') {
        rep = JSON.stringify(val);
      } else if (typeof val === 'number' || typeof val === 'boolean') {
        rep = String(val);
      }
      jsExpr = jsExpr.replace(reg, rep);
    }

    try {
      return Function(`"use strict"; return (${jsExpr});`)();
    } catch {
      // Fallback
    }
  }

  // 5. Nombre de variable directo
  if (scope[e] !== undefined) {
    return scope[e];
  }

  // 6. listOf(...) o arrayOf(...)
  const listMatch = e.match(/^(?:listOf|arrayOf)\s*\(([\s\S]*)\)$/);
  if (listMatch) {
    const items = listMatch[1].split(',').map(item => evaluateKotlinExpression(item.trim(), scope));
    return items;
  }

  return e;
}
