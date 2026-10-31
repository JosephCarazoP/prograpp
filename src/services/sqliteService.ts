import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { SqliteQueryResult, TableSchemaInfo, TableColumnInfo, TableForeignKeyInfo } from '../types/sqliteLab';

/**
 * Divide un script SQL en sentencias individuales respetando cadenas de texto,
 * comentarios de línea (-- ...) y comentarios de bloque (/* ... * /).
 */
export function splitSqlStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    const nextChar = sql[i + 1];

    // Comentarios de una línea (-- ...)
    if (!inSingleQuote && !inDoubleQuote && !inBlockComment && char === '-' && nextChar === '-') {
      inLineComment = true;
    }
    if (inLineComment) {
      if (char === '\n' || char === '\r') {
        inLineComment = false;
      }
      current += char;
      continue;
    }

    // Comentarios de bloque (/* ... */)
    if (!inSingleQuote && !inDoubleQuote && !inLineComment && char === '/' && nextChar === '*') {
      inBlockComment = true;
    }
    if (inBlockComment) {
      current += char;
      if (char === '*' && nextChar === '/') {
        current += '/';
        i++;
        inBlockComment = false;
      }
      continue;
    }

    // Comillas simples (cadenas literales)
    if (!inDoubleQuote && char === "'") {
      if (inSingleQuote && nextChar === "'") {
        current += "''";
        i++;
        continue;
      }
      inSingleQuote = !inSingleQuote;
    }

    // Comillas dobles (identificadores)
    if (!inSingleQuote && char === '"') {
      inDoubleQuote = !inDoubleQuote;
    }

    // Separador de sentencias ';'
    if (char === ';' && !inSingleQuote && !inDoubleQuote) {
      if (current.trim()) {
        statements.push(current.trim());
      }
      current = '';
      continue;
    }

    current += char;
  }

  if (current.trim()) {
    statements.push(current.trim());
  }

  return statements;
}

class SqliteService {
  private SQL: SqlJsStatic | null = null;
  private db: Database | null = null;
  private initPromise: Promise<SqlJsStatic> | null = null;

  /**
   * Descarga el binario WASM verificando el encabezado mágico WebAssembly (\0asm = 0x00, 0x61, 0x73, 0x6d)
   */
  private async fetchWasmBinary(): Promise<ArrayBuffer> {
    const candidateUrls = [
      sqlWasmUrl,
      '/sql-wasm.wasm',
      './sql-wasm.wasm',
      'https://sql.js.org/dist/sql-wasm.wasm',
      'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-wasm.wasm'
    ];

    for (const url of candidateUrls) {
      if (!url) continue;
      try {
        const response = await fetch(url);
        if (!response.ok) continue;

        const buffer = await response.arrayBuffer();
        if (buffer.byteLength < 4) continue;

        const header = new Uint8Array(buffer, 0, 4);
        // Valid WebAssembly binary header: 0x00, 0x61, 0x73, 0x6d (\0asm)
        if (
          header[0] === 0x00 &&
          header[1] === 0x61 &&
          header[2] === 0x73 &&
          header[3] === 0x6d
        ) {
          return buffer;
        }
        console.warn(`URL ${url} devolvió contenido que no es WebAssembly binario válido (recibido ${header[0].toString(16)} ${header[1].toString(16)}):`);
      } catch (err) {
        console.warn(`Error al obtener WASM desde ${url}:`, err);
      }
    }

    throw new Error('No se pudo cargar el archivo binario sql-wasm.wasm desde el servidor local ni desde los orígenes de respaldo.');
  }

  /**
   * Inicializa el módulo WebAssembly de sql.js
   */
  public async init(): Promise<SqlJsStatic> {
    if (this.SQL) return this.SQL;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        const wasmBinary = await this.fetchWasmBinary();
        const sqlModule = await initSqlJs({
          wasmBinary
        });
        this.SQL = sqlModule;
        return sqlModule;
      } catch (binaryErr) {
        console.warn('Carga directa de wasmBinary falló, intentando con locateFile...', binaryErr);
        try {
          const sqlModule = await initSqlJs({
            locateFile: (file: string) => {
              if (file.endsWith('.wasm')) {
                return sqlWasmUrl || `/${file}`;
              }
              return `/${file}`;
            }
          });
          this.SQL = sqlModule;
          return sqlModule;
        } catch (finalErr) {
          this.initPromise = null;
          throw finalErr;
        }
      }
    })();

    return this.initPromise;
  }

  /**
   * Crea o reemplaza la base de datos actual con una base nueva vacía o a partir de un buffer binario
   */
  public async openDatabase(binaryData?: Uint8Array): Promise<Database> {
    const SQL = await this.init();
    if (this.db) {
      try {
        this.db.close();
      } catch (e) {
        console.warn('Error al cerrar base de datos anterior:', e);
      }
      this.db = null;
    }

    if (binaryData && binaryData.length > 0) {
      this.db = new SQL.Database(binaryData);
    } else {
      this.db = new SQL.Database();
    }

    // Habilitar soporte de llaves foráneas en SQLite (por defecto está desactivado en SQLite3)
    try {
      this.db.run('PRAGMA foreign_keys = ON;');
    } catch (e) {
      console.warn('No se pudo habilitar PRAGMA foreign_keys:', e);
    }

    return this.db;
  }

  /**
   * Obtiene la instancia activa de la base de datos
   */
  public getDatabase(): Database | null {
    return this.db;
  }

  /**
   * Obtiene el total acumulado de cambios en la base de datos (SELECT total_changes())
   */
  private getTotalChanges(): number {
    if (!this.db) return 0;
    try {
      const res = this.db.exec('SELECT total_changes();');
      return Number(res[0]?.values?.[0]?.[0]) || 0;
    } catch {
      return 0;
    }
  }

  /**
   * Ejecuta una consulta o script SQL en la base de datos actual.
   * Divide el script en sentencias individuales para garantizar reporte exacto de filas
   * afectadas, aislamiento de errores por sentencia y persistencia correcta.
   */
  public execute(sql: string): SqliteQueryResult {
    if (!this.db) {
      return {
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs: 0,
        error: 'La base de datos SQLite no está inicializada.'
      };
    }

    const trimmed = sql.trim();
    if (!trimmed) {
      return {
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs: 0
      };
    }

    const statements = splitSqlStatements(trimmed);
    if (statements.length === 0) {
      return {
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs: 0
      };
    }

    const startTime = performance.now();
    try {
      // Garantizar que la verificación estricta de llaves foráneas esté activa
      try {
        this.db.run('PRAGMA foreign_keys = ON;');
      } catch (_) {}

      let lastSelectResult: { columns: string[]; values: any[][] } | null = null;
      let totalRowsAffected = 0;

      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        if (!stmt.trim()) continue;

        const beforeChanges = this.getTotalChanges();
        let execResults;

        try {
          execResults = this.db.exec(stmt);
        } catch (err: any) {
          const afterChanges = this.getTotalChanges();
          const rowsFromFailedStmt = Math.max(0, afterChanges - beforeChanges);
          totalRowsAffected += rowsFromFailedStmt;
          const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
          const msg = err?.message || String(err);
          const shortStmt = stmt.length > 60 ? `${stmt.substring(0, 57).replace(/\s+/g, ' ')}...` : stmt.replace(/\s+/g, ' ');
          const formattedError = statements.length > 1
            ? `Error en la sentencia ${i + 1} ("${shortStmt}"): ${msg}${totalRowsAffected > 0 ? ` (${totalRowsAffected} fila(s) afectada(s) en total)` : ''}`
            : msg;

          return {
            columns: lastSelectResult?.columns || [],
            values: lastSelectResult?.values || [],
            rowsAffected: totalRowsAffected,
            executionTimeMs,
            error: formattedError
          };
        }

        const afterChanges = this.getTotalChanges();
        totalRowsAffected += Math.max(0, afterChanges - beforeChanges);

        if (execResults && execResults.length > 0) {
          lastSelectResult = execResults[execResults.length - 1];
        }
      }

      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

      if (lastSelectResult) {
        return {
          columns: lastSelectResult.columns,
          values: lastSelectResult.values,
          rowsAffected: totalRowsAffected,
          executionTimeMs
        };
      }

      return {
        columns: [],
        values: [],
        rowsAffected: totalRowsAffected,
        executionTimeMs
      };
    } catch (err: any) {
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
      const errorMessage = err?.message || String(err);
      return {
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs,
        error: errorMessage
      };
    }
  }

  /**
   * Ejecuta una consulta parametrizada de forma segura (para modo 'programar botones')
   * Parámetros pueden ser :nombre, :edad, o ?1, ?2
   */
  public executeParameterized(sql: string, params: Record<string, any>): SqliteQueryResult {
    if (!this.db) {
      return {
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs: 0,
        error: 'La base de datos SQLite no está inicializada.'
      };
    }

    const startTime = performance.now();
    try {
      const beforeChanges = this.getTotalChanges();

      // Mapear parámetros con prefijo : si el usuario no lo puso
      const normalizedParams: Record<string, any> = {};
      Object.entries(params).forEach(([key, val]) => {
        const cleanKey = key.startsWith(':') || key.startsWith('$') || key.startsWith('@') ? key : `:${key}`;
        normalizedParams[cleanKey] = val;
      });

      const stmt = this.db.prepare(sql);
      
      // Si la sentencia retorna filas (e.g. SELECT)
      const columns = stmt.getColumnNames();
      const values: any[][] = [];

      stmt.bind(normalizedParams);

      while (stmt.step()) {
        values.push(stmt.get());
      }
      stmt.free();

      const afterChanges = this.getTotalChanges();
      const rowsAffected = Math.max(0, afterChanges - beforeChanges);
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

      return {
        columns,
        values,
        rowsAffected,
        executionTimeMs
      };
    } catch (err: any) {
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
      return {
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs,
        error: err?.message || String(err)
      };
    }
  }

  /**
   * Inspecciona el esquema completo de la base de datos (tablas, columnas, llaves primarias, foráneas, vistas)
   */
  public async introspectSchema(): Promise<TableSchemaInfo[]> {
    if (!this.db) return [];

    try {
      const masterQuery = `
        SELECT name, type, sql 
        FROM sqlite_master 
        WHERE type IN ('table', 'view') AND name NOT LIKE 'sqlite_%'
        ORDER BY name;
      `;
      const masterRes = this.db.exec(masterQuery);
      if (masterRes.length === 0 || !masterRes[0].values) return [];

      const tables: TableSchemaInfo[] = [];

      for (const row of masterRes[0].values) {
        const tableName = String(row[0]);
        const tableType = (row[1] === 'view' ? 'view' : 'table') as 'table' | 'view';
        const tableSql = String(row[2] || '');

        // Obtener columnas y PKs
        const columns: TableColumnInfo[] = [];
        try {
          const colRes = this.db.exec(`PRAGMA table_info("${tableName.replace(/"/g, '""')}");`);
          if (colRes.length > 0 && colRes[0].values) {
            colRes[0].values.forEach(c => {
              columns.push({
                cid: Number(c[0]),
                name: String(c[1]),
                type: String(c[2]),
                notnull: Number(c[3]),
                dflt_value: c[4],
                pk: Number(c[5])
              });
            });
          }
        } catch (e) {
          console.warn(`Error al obtener columnas de ${tableName}:`, e);
        }

        // Obtener llaves foráneas (FK)
        const foreignKeys: TableForeignKeyInfo[] = [];
        try {
          const fkRes = this.db.exec(`PRAGMA foreign_key_list("${tableName.replace(/"/g, '""')}");`);
          if (fkRes.length > 0 && fkRes[0].values) {
            fkRes[0].values.forEach(fk => {
              foreignKeys.push({
                id: Number(fk[0]),
                seq: Number(fk[1]),
                table: String(fk[2]),
                from: String(fk[3]),
                to: String(fk[4]),
                on_update: String(fk[5]),
                on_delete: String(fk[6]),
                match: String(fk[7])
              });
            });
          }
        } catch (e) {
          console.warn(`Error al obtener foreign keys de ${tableName}:`, e);
        }

        // Obtener conteo de registros
        let rowCount = 0;
        try {
          const countRes = this.db.exec(`SELECT COUNT(*) FROM "${tableName.replace(/"/g, '""')}";`);
          if (countRes.length > 0 && countRes[0].values && countRes[0].values[0]) {
            rowCount = Number(countRes[0].values[0][0]) || 0;
          }
        } catch (e) {
          console.warn(`Error al contar registros de ${tableName}:`, e);
        }

        tables.push({
          name: tableName,
          type: tableType,
          columns,
          foreignKeys,
          rowCount,
          sql: tableSql
        });
      }

      return tables;
    } catch (err) {
      console.error('Error al introspeccionar esquema SQLite:', err);
      return [];
    }
  }

  /**
   * Exporta la base de datos activa como un arreglo binario (Uint8Array de archivo .db)
   */
  public exportBinary(): Uint8Array | null {
    if (!this.db) return null;
    return this.db.export();
  }

  /**
   * Genera un script SQL completo (Dump DDL + DML)
   */
  public exportSqlDump(): string {
    if (!this.db) return '-- Base de datos no inicializada';

    const lines: string[] = [
      '--',
      '-- Volcado de Base de Datos SQLite generado en Prograpp',
      `-- Fecha: ${new Date().toLocaleString()}`,
      '--',
      'PRAGMA foreign_keys = OFF;',
      ''
    ];

    try {
      // 1. DDL de tablas y vistas desde sqlite_master
      const masterRes = this.db.exec(`
        SELECT name, type, sql 
        FROM sqlite_master 
        WHERE type IN ('table', 'view', 'index', 'trigger') AND name NOT LIKE 'sqlite_%'
        ORDER BY CASE type WHEN 'table' THEN 1 WHEN 'view' THEN 2 WHEN 'index' THEN 3 ELSE 4 END;
      `);

      if (masterRes.length > 0 && masterRes[0].values) {
        for (const row of masterRes[0].values) {
          const name = String(row[0]);
          const type = String(row[1]);
          const sql = row[2] ? String(row[2]) : null;

          if (sql) {
            lines.push(`-- Estructura para ${type}: ${name}`);
            lines.push(`${sql};`);
            lines.push('');
          }

          // Si es tabla, extraer registros como INSERT INTO
          if (type === 'table') {
            try {
              const safeTableName = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name) ? name : `"${name.replace(/"/g, '""')}"`;
              const dataRes = this.db.exec(`SELECT * FROM ${safeTableName};`);
              if (dataRes.length > 0 && dataRes[0].values && dataRes[0].values.length > 0) {
                const cols = dataRes[0].columns.map(c => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(c) ? c : `"${c.replace(/"/g, '""')}"`).join(', ');
                lines.push(`-- Datos para la tabla: ${name}`);
                for (const valRow of dataRes[0].values) {
                  const formattedValues = valRow.map(v => {
                    if (v === null || v === undefined) return 'NULL';
                    if (typeof v === 'number') return String(v);
                    if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
                    return `'${String(v)}'`;
                  }).join(', ');
                  lines.push(`INSERT INTO ${safeTableName} (${cols}) VALUES (${formattedValues});`);
                }
                lines.push('');
              }
            } catch (e) {
              console.warn(`No se pudieron exportar registros de ${name}:`, e);
            }
          }
        }
      }

      lines.push('PRAGMA foreign_keys = ON;');
      lines.push('');
      return lines.join('\n');
    } catch (err: any) {
      return `-- Error al generar volcado SQL: ${err?.message || err}`;
    }
  }

  /**
   * Cierra y libera la memoria de la base de datos
   */
  public close(): void {
    if (this.db) {
      try {
        this.db.close();
      } catch (e) {
        console.warn('Error cerrando SQLite DB:', e);
      }
      this.db = null;
    }
  }
}

export const sqliteService = new SqliteService();
