import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Key,
  Check,
  X,
  Code2,
  Database,
  ShieldAlert,
  Layers
} from 'lucide-react';
import { sqliteService } from '../../services/sqliteService';
import { soundService } from '../../services/soundService';
import { TableSchemaInfo } from '../../types/sqliteLab';

export interface ColumnDef {
  name: string;
  type: 'INTEGER' | 'TEXT' | 'REAL' | 'BLOB' | 'NUMERIC';
  isPk: boolean;
  isAutoincrement: boolean;
  isNotNull: boolean;
  isUnique: boolean;
  defaultValue: string;
  checkExpr: string;
}

export interface ForeignKeyDef {
  id: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  onDelete: 'NO ACTION' | 'RESTRICT' | 'CASCADE' | 'SET NULL' | 'SET DEFAULT';
  onUpdate: 'NO ACTION' | 'RESTRICT' | 'CASCADE' | 'SET NULL' | 'SET DEFAULT';
}

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTableCreated: () => void;
  onInsertToEditor?: (sql: string) => void;
  existingTables?: TableSchemaInfo[];
  editTable?: TableSchemaInfo | null;
}

export const CreateTableModal: React.FC<CreateTableModalProps> = ({
  isOpen,
  onClose,
  onTableCreated,
  onInsertToEditor,
  existingTables = [],
  editTable = null
}) => {
  const isEditMode = Boolean(editTable);
  const [activeTab, setActiveTab] = useState<'columns' | 'foreign_keys'>('columns');
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState<ColumnDef[]>([]);
  const [foreignKeys, setForeignKeys] = useState<ForeignKeyDef[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar o rellenar si es modo edición
  useEffect(() => {
    if (editTable) {
      setTableName(editTable.name);
      setColumns(
        editTable.columns.map((c) => ({
          name: c.name,
          type: (c.type.toUpperCase() as any) || 'TEXT',
          isPk: Boolean(c.pk),
          isAutoincrement: Boolean(c.pk && c.type.toUpperCase() === 'INTEGER'),
          isNotNull: Boolean(c.notnull),
          isUnique: false,
          defaultValue: c.dflt_value ? String(c.dflt_value) : '',
          checkExpr: ''
        }))
      );
      setForeignKeys(
        editTable.foreignKeys.map((fk, idx) => ({
          id: `fk_${idx}_${Date.now()}`,
          fromColumn: fk.from,
          toTable: fk.table,
          toColumn: fk.to,
          onDelete: (fk.on_delete?.toUpperCase() as any) || 'NO ACTION',
          onUpdate: (fk.on_update?.toUpperCase() as any) || 'NO ACTION'
        }))
      );
    } else {
      setTableName('');
      setColumns([
        {
          name: 'id',
          type: 'INTEGER',
          isPk: true,
          isAutoincrement: true,
          isNotNull: true,
          isUnique: false,
          defaultValue: '',
          checkExpr: ''
        },
        {
          name: 'nombre',
          type: 'TEXT',
          isPk: false,
          isAutoincrement: false,
          isNotNull: true,
          isUnique: false,
          defaultValue: '',
          checkExpr: ''
        }
      ]);
      setForeignKeys([]);
    }
    setError(null);
    setActiveTab('columns');
  }, [editTable, isOpen]);

  if (!isOpen) return null;

  // Agregar una columna
  const handleAddColumn = () => {
    setColumns((prev) => [
      ...prev,
      {
        name: `col_${prev.length + 1}`,
        type: 'TEXT',
        isPk: false,
        isAutoincrement: false,
        isNotNull: false,
        isUnique: false,
        defaultValue: '',
        checkExpr: ''
      }
    ]);
  };

  // Modificar columna
  const handleUpdateColumn = (index: number, updates: Partial<ColumnDef>) => {
    setColumns((prev) =>
      prev.map((col, i) => {
        if (i !== index) return col;
        const updated = { ...col, ...updates };
        // Si se activa AI, asegurar que sea INTEGER y PK
        if (updates.isAutoincrement && updates.isAutoincrement === true) {
          updated.isPk = true;
          updated.type = 'INTEGER';
        }
        return updated;
      })
    );
  };

  // Eliminar columna
  const handleDeleteColumn = (index: number) => {
    if (columns.length <= 1) return;
    const colNameToRemove = columns[index].name;
    setColumns((prev) => prev.filter((_, i) => i !== index));
    // Limpiar claves foráneas que usaban esta columna
    setForeignKeys((prev) => prev.filter((fk) => fk.fromColumn !== colNameToRemove));
  };

  // Agregar una Clave Foránea (FK)
  const handleAddForeignKey = () => {
    const candidateCol = columns[0]?.name || '';
    const otherTables = existingTables.filter((t) => t.name.toLowerCase() !== tableName.toLowerCase());
    const candidateTable = otherTables[0]?.name || '';
    const candidateTargetCol = otherTables[0]?.columns[0]?.name || '';

    setForeignKeys((prev) => [
      ...prev,
      {
        id: `fk_${Date.now()}_${Math.random()}`,
        fromColumn: candidateCol,
        toTable: candidateTable,
        toColumn: candidateTargetCol,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      }
    ]);
  };

  // Modificar Clave Foránea
  const handleUpdateForeignKey = (index: number, updates: Partial<ForeignKeyDef>) => {
    setForeignKeys((prev) =>
      prev.map((fk, i) => {
        if (i !== index) return fk;
        const next = { ...fk, ...updates };
        // Si cambió la tabla destino, actualizar toColumn a la primera columna válida de esa tabla
        if (updates.toTable && updates.toTable !== fk.toTable) {
          const targetTableObj = existingTables.find((t) => t.name === updates.toTable);
          next.toColumn = targetTableObj?.columns[0]?.name || '';
        }
        return next;
      })
    );
  };

  // Eliminar Clave Foránea
  const handleDeleteForeignKey = (index: number) => {
    setForeignKeys((prev) => prev.filter((_, i) => i !== index));
  };

  // Generar la sentencia SQL CREATE TABLE completa
  const generateSql = (): string => {
    const cleanTableName = tableName.trim().replace(/[^a-zA-Z0-9_]/g, '') || 'mi_tabla';
    const lines: string[] = [];
    const pkCols = columns.filter((c) => c.isPk);

    columns.forEach((col) => {
      const colName = col.name.trim().replace(/[^a-zA-Z0-9_]/g, '') || 'columna';
      let def = `  ${colName} ${col.type}`;

      if (col.isPk && pkCols.length === 1) {
        def += ' PRIMARY KEY';
        if (col.isAutoincrement && col.type === 'INTEGER') {
          def += ' AUTOINCREMENT';
        }
      }
      if (col.isNotNull && (!col.isPk || pkCols.length > 1)) {
        def += ' NOT NULL';
      }
      if (col.isUnique && (!col.isPk || pkCols.length > 1)) {
        def += ' UNIQUE';
      }
      if (col.defaultValue.trim() !== '') {
        const val = col.defaultValue.trim();
        def += ` DEFAULT ${isNaN(Number(val)) ? `'${val}'` : val}`;
      }
      if (col.checkExpr.trim() !== '') {
        def += ` CHECK (${col.checkExpr.trim()})`;
      }

      lines.push(def);
    });

    // Si hay llave primaria compuesta
    if (pkCols.length > 1) {
      const pkList = pkCols.map((c) => c.name.trim()).join(', ');
      lines.push(`  PRIMARY KEY (${pkList})`);
    }

    // Claves foráneas (FK)
    foreignKeys.forEach((fk) => {
      if (fk.fromColumn && fk.toTable && fk.toColumn) {
        let fkDef = `  FOREIGN KEY (${fk.fromColumn}) REFERENCES ${fk.toTable}(${fk.toColumn})`;
        if (fk.onDelete && fk.onDelete !== 'NO ACTION') {
          fkDef += ` ON DELETE ${fk.onDelete}`;
        }
        if (fk.onUpdate && fk.onUpdate !== 'NO ACTION') {
          fkDef += ` ON UPDATE ${fk.onUpdate}`;
        }
        lines.push(fkDef);
      }
    });

    return `CREATE TABLE ${cleanTableName} (\n${lines.join(',\n')}\n);`;
  };

  const generatedSql = generateSql();

  // Ejecutar creación o modificación en SQLite WASM
  const handleExecute = async () => {
    setError(null);
    const cleanTableName = tableName.trim().replace(/[^a-zA-Z0-9_]/g, '');
    if (!cleanTableName) {
      setError('Escribe un nombre válido para la tabla.');
      return;
    }

    if (columns.length === 0) {
      setError('La tabla debe contener al menos un campo o columna.');
      return;
    }

    // Validar nombres duplicados
    const names = columns.map((c) => c.name.trim().toLowerCase());
    if (new Set(names).size !== names.length) {
      setError('No pueden existir dos columnas con el mismo nombre en la tabla.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEditMode && editTable) {
        // En SQLite, para modificar estructura de tabla existente:
        // Si el nombre no cambió y la tabla está vacía, o mediante procedimiento transaccional seguro
        const tempName = `temp_${cleanTableName}_${Date.now()}`;
        const createTempSql = generatedSql.replace(new RegExp(`\\b${cleanTableName}\\b`), tempName);
        
        // Procedimiento seguro estándar de SQLite:
        const migrationScript = `
          BEGIN TRANSACTION;
          ${createTempSql}
          -- Copiar datos de columnas coincidentes:
          INSERT INTO ${tempName} SELECT * FROM ${editTable.name};
          DROP TABLE ${editTable.name};
          ALTER TABLE ${tempName} RENAME TO ${cleanTableName};
          COMMIT;
        `;
        
        const result = sqliteService.execute(migrationScript);
        if (result.error) {
          // Si falló la migración transaccional (por ejemplo columnas incompatibles), intentar recreación directa
          throw new Error(result.error);
        }
      } else {
        // Crear tabla nueva
        const result = sqliteService.execute(generatedSql);
        if (result.error) {
          throw new Error(result.error);
        }
      }

      soundService.playToken();
      onTableCreated();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Error al ejecutar la sentencia en SQLite.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(3px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '2.5px solid #000',
          boxShadow: '6px 6px 0 #000',
          borderRadius: 14,
          width: '100%',
          maxWidth: 780,
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ENCABEZADO */}
        <div
          style={{
            background: '#F8FAFC',
            borderBottom: '2px solid #000',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: isEditMode ? '#D97706' : '#0284C7',
                border: '2px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}
            >
              <Database size={17} />
            </div>
            <div>
              <h2 style={{ fontSize: '0.98rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                {isEditMode ? `Modificar Definición de Tabla: ${editTable?.name}` : 'Definición de Tabla (Diseñador GUI)'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                Configura columnas, llaves primarias (PK), foráneas (FK) y restricciones
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: '2px solid #000',
              borderRadius: 8,
              padding: 4,
              cursor: 'pointer',
              display: 'flex'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* CUERPO CON SCROLL */}
        <div style={{ padding: '16px 18px', overflowY: 'auto', flex: 1 }}>
          {error && (
            <div
              style={{
                background: '#FEF2F2',
                border: '2px solid #EF4444',
                color: '#991B1B',
                padding: '10px 14px',
                borderRadius: 8,
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <ShieldAlert size={18} className="text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Campo: Nombre de la tabla */}
          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 900,
                color: '#1E293B',
                marginBottom: 4
              }}
            >
              Nombre de la Tabla:
            </label>
            <input
              type="text"
              placeholder="ej. Categoria, Producto, Alumnos"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              style={{
                width: '100%',
                background: '#FFFFFF',
                border: '2px solid #000',
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: '0.9rem',
                fontWeight: 700,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* PESTAÑAS: CAMPOS vs CLAVES FORÁNEAS (Estilo DB Browser) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '2px solid #000',
              marginBottom: 12,
              gap: 6
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('columns')}
              style={{
                background: activeTab === 'columns' ? '#0284C7' : '#F1F5F9',
                color: activeTab === 'columns' ? '#FFF' : '#334155',
                border: '2px solid #000',
                borderBottom: 'none',
                borderRadius: '8px 8px 0 0',
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transform: activeTab === 'columns' ? 'translateY(2px)' : 'none'
              }}
            >
              <Layers size={13} />
              <span>Campos ({columns.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('foreign_keys')}
              style={{
                background: activeTab === 'foreign_keys' ? '#0284C7' : '#F1F5F9',
                color: activeTab === 'foreign_keys' ? '#FFF' : '#334155',
                border: '2px solid #000',
                borderBottom: 'none',
                borderRadius: '8px 8px 0 0',
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transform: activeTab === 'foreign_keys' ? 'translateY(2px)' : 'none'
              }}
            >
              <Key size={13} />
              <span>Claves Foráneas (FK) ({foreignKeys.length})</span>
            </button>
          </div>

          {/* PESTAÑA 1: CAMPOS */}
          {activeTab === 'columns' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8
                }}
              >
                <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 700 }}>
                  Define las columnas de la tabla: tipos, llaves primarias e incrementales
                </span>
                <button
                  type="button"
                  onClick={handleAddColumn}
                  style={{
                    background: '#22C55E',
                    color: '#000',
                    border: '2px solid #000',
                    boxShadow: '2px 2px 0 #000',
                    borderRadius: 6,
                    padding: '4px 10px',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <Plus size={13} />
                  <span>Añadir Campo</span>
                </button>
              </div>

              {/* TABLA DE CAMPOS */}
              <div
                style={{
                  border: '2px solid #000',
                  borderRadius: 8,
                  overflowX: 'auto',
                  background: '#FFF'
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #000', textAlign: 'left' }}>
                      <th style={{ padding: '6px 8px', fontWeight: 900 }}>Nombre</th>
                      <th style={{ padding: '6px 8px', fontWeight: 900 }}>Tipo</th>
                      <th style={{ padding: '6px 6px', fontWeight: 900, textAlign: 'center' }} title="Primary Key">PK</th>
                      <th style={{ padding: '6px 6px', fontWeight: 900, textAlign: 'center' }} title="Auto Increment">AI</th>
                      <th style={{ padding: '6px 6px', fontWeight: 900, textAlign: 'center' }} title="Not Null">NN</th>
                      <th style={{ padding: '6px 6px', fontWeight: 900, textAlign: 'center' }} title="Unique">U</th>
                      <th style={{ padding: '6px 8px', fontWeight: 900 }}>Por Defecto</th>
                      <th style={{ padding: '6px 8px', fontWeight: 900 }}>CHECK</th>
                      <th style={{ padding: '6px 6px', textAlign: 'center', width: 32 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {columns.map((col, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: idx === columns.length - 1 ? 'none' : '1px solid #E2E8F0',
                          background: col.isPk ? '#EFF6FF' : '#FFF'
                        }}
                      >
                        {/* Nombre */}
                        <td style={{ padding: '4px 6px' }}>
                          <input
                            type="text"
                            value={col.name}
                            onChange={(e) => handleUpdateColumn(idx, { name: e.target.value })}
                            style={{
                              width: '100%',
                              border: '1.5px solid #CBD5E1',
                              borderRadius: 4,
                              padding: '4px 6px',
                              fontSize: '0.78rem',
                              fontWeight: 700
                            }}
                          />
                        </td>

                        {/* Tipo */}
                        <td style={{ padding: '4px 6px' }}>
                          <select
                            value={col.type}
                            onChange={(e) => handleUpdateColumn(idx, { type: e.target.value as any })}
                            className="sqlite-modal-select"
                            style={{
                              width: '100%',
                              padding: '5px 26px 5px 8px',
                              fontSize: '0.76rem',
                              fontWeight: 900
                            }}
                          >
                            <option value="INTEGER">INTEGER</option>
                            <option value="TEXT">TEXT</option>
                            <option value="REAL">REAL</option>
                            <option value="NUMERIC">NUMERIC</option>
                            <option value="BLOB">BLOB</option>
                          </select>
                        </td>

                        {/* PK */}
                        <td style={{ padding: '4px 4px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={col.isPk}
                            onChange={(e) =>
                              handleUpdateColumn(idx, {
                                isPk: e.target.checked,
                                isAutoincrement: e.target.checked ? col.isAutoincrement : false
                              })
                            }
                          />
                        </td>

                        {/* AI (Auto Increment) */}
                        <td style={{ padding: '4px 4px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            disabled={!col.isPk || col.type !== 'INTEGER'}
                            checked={col.isAutoincrement}
                            onChange={(e) => handleUpdateColumn(idx, { isAutoincrement: e.target.checked })}
                          />
                        </td>

                        {/* NN (Not Null) */}
                        <td style={{ padding: '4px 4px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={col.isNotNull}
                            onChange={(e) => handleUpdateColumn(idx, { isNotNull: e.target.checked })}
                          />
                        </td>

                        {/* U (Unique) */}
                        <td style={{ padding: '4px 4px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={col.isUnique}
                            onChange={(e) => handleUpdateColumn(idx, { isUnique: e.target.checked })}
                          />
                        </td>

                        {/* Default */}
                        <td style={{ padding: '4px 6px' }}>
                          <input
                            type="text"
                            placeholder="NULL"
                            value={col.defaultValue}
                            onChange={(e) => handleUpdateColumn(idx, { defaultValue: e.target.value })}
                            style={{
                              width: '100%',
                              border: '1.5px solid #CBD5E1',
                              borderRadius: 4,
                              padding: '4px 6px',
                              fontSize: '0.74rem'
                            }}
                          />
                        </td>

                        {/* CHECK */}
                        <td style={{ padding: '4px 6px' }}>
                          <input
                            type="text"
                            placeholder="ej. precio >= 0"
                            value={col.checkExpr}
                            onChange={(e) => handleUpdateColumn(idx, { checkExpr: e.target.value })}
                            style={{
                              width: '100%',
                              border: '1.5px solid #CBD5E1',
                              borderRadius: 4,
                              padding: '4px 6px',
                              fontSize: '0.74rem'
                            }}
                          />
                        </td>

                        {/* Eliminar columna */}
                        <td style={{ padding: '4px 6px', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteColumn(idx)}
                            disabled={columns.length <= 1}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: columns.length <= 1 ? '#CBD5E1' : '#EF4444',
                              cursor: columns.length <= 1 ? 'default' : 'pointer'
                            }}
                            title="Eliminar columna"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PESTAÑA 2: CLAVES FORÁNEAS (FK) */}
          {activeTab === 'foreign_keys' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8
                }}
              >
                <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 700 }}>
                  Establece relaciones reales (FOREIGN KEY) hacia tablas externas de tu base de datos
                </span>
                <button
                  type="button"
                  onClick={handleAddForeignKey}
                  style={{
                    background: '#0284C7',
                    color: '#FFF',
                    border: '2px solid #000',
                    boxShadow: '2px 2px 0 #000',
                    borderRadius: 6,
                    padding: '4px 10px',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <Plus size={13} />
                  <span>Añadir Clave Foránea</span>
                </button>
              </div>

              {foreignKeys.length === 0 ? (
                <div
                  style={{
                    border: '2px dashed #CBD5E1',
                    borderRadius: 8,
                    padding: '24px 16px',
                    textAlign: 'center',
                    background: '#F8FAFC'
                  }}
                >
                  <Key size={24} className="text-slate-400 mx-auto mb-2" />
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '0.82rem', color: '#475569' }}>
                    Esta tabla no tiene claves foráneas definidas.
                  </p>
                  <p style={{ margin: '4px 0 10px 0', fontSize: '0.74rem', color: '#64748B' }}>
                    Haz clic en "Añadir Clave Foránea" para vincular una columna de esta tabla con otra tabla.
                  </p>
                  <button
                    type="button"
                    onClick={handleAddForeignKey}
                    style={{
                      background: '#FFF',
                      border: '2px solid #000',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    + Añadir Relación FK
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    border: '2px solid #000',
                    borderRadius: 8,
                    overflowX: 'auto',
                    background: '#FFF'
                  }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #000', textAlign: 'left' }}>
                        <th style={{ padding: '6px 8px', fontWeight: 900 }}>Campo Local (de esta tabla)</th>
                        <th style={{ padding: '6px 8px', fontWeight: 900 }}>Tabla Destino</th>
                        <th style={{ padding: '6px 8px', fontWeight: 900 }}>Campo Destino</th>
                        <th style={{ padding: '6px 8px', fontWeight: 900 }}>Al Borrar (ON DELETE)</th>
                        <th style={{ padding: '6px 8px', fontWeight: 900 }}>Al Actualizar (ON UPDATE)</th>
                        <th style={{ padding: '6px 6px', textAlign: 'center', width: 32 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {foreignKeys.map((fk, idx) => {
                        const targetTableObj = existingTables.find((t) => t.name === fk.toTable);
                        const targetColumns = targetTableObj ? targetTableObj.columns : [];

                        return (
                          <tr
                            key={fk.id}
                            style={{
                              borderBottom: idx === foreignKeys.length - 1 ? 'none' : '1px solid #E2E8F0',
                              background: '#FFF'
                            }}
                          >
                            {/* Campo Local */}
                            <td style={{ padding: '4px 6px' }}>
                              <select
                                value={fk.fromColumn}
                                onChange={(e) => handleUpdateForeignKey(idx, { fromColumn: e.target.value })}
                                className="sqlite-modal-select"
                                style={{
                                  width: '100%',
                                  padding: '5px 26px 5px 8px',
                                  fontSize: '0.76rem',
                                  fontWeight: 800
                                }}
                              >
                                {columns.map((c) => (
                                  <option key={c.name} value={c.name}>
                                    {c.name} ({c.type})
                                  </option>
                                ))}
                              </select>
                            </td>

                            {/* Tabla Destino */}
                            <td style={{ padding: '4px 6px' }}>
                              <select
                                value={fk.toTable}
                                onChange={(e) => handleUpdateForeignKey(idx, { toTable: e.target.value })}
                                className="sqlite-modal-select"
                                style={{
                                  width: '100%',
                                  padding: '5px 26px 5px 8px',
                                  fontSize: '0.76rem',
                                  fontWeight: 800
                                }}
                              >
                                {existingTables
                                  .filter((t) => t.name.toLowerCase() !== tableName.toLowerCase())
                                  .map((t) => (
                                    <option key={t.name} value={t.name}>
                                      {t.name}
                                    </option>
                                  ))}
                              </select>
                            </td>

                            {/* Campo Destino */}
                            <td style={{ padding: '4px 6px' }}>
                              <select
                                value={fk.toColumn}
                                onChange={(e) => handleUpdateForeignKey(idx, { toColumn: e.target.value })}
                                className="sqlite-modal-select"
                                style={{
                                  width: '100%',
                                  padding: '5px 26px 5px 8px',
                                  fontSize: '0.76rem',
                                  fontWeight: 800
                                }}
                              >
                                {targetColumns.map((tc) => (
                                  <option key={tc.name} value={tc.name}>
                                    {tc.name} {tc.pk ? '(PK)' : ''}
                                  </option>
                                ))}
                              </select>
                            </td>

                            {/* ON DELETE */}
                            <td style={{ padding: '4px 6px' }}>
                              <select
                                value={fk.onDelete}
                                onChange={(e) => handleUpdateForeignKey(idx, { onDelete: e.target.value as any })}
                                className="sqlite-modal-select"
                                style={{
                                  padding: '5px 24px 5px 6px',
                                  fontSize: '0.74rem',
                                  fontWeight: 800
                                }}
                              >
                                <option value="RESTRICT">RESTRICT</option>
                                <option value="CASCADE">CASCADE</option>
                                <option value="SET NULL">SET NULL</option>
                                <option value="NO ACTION">NO ACTION</option>
                                <option value="SET DEFAULT">SET DEFAULT</option>
                              </select>
                            </td>

                            {/* ON UPDATE */}
                            <td style={{ padding: '4px 6px' }}>
                              <select
                                value={fk.onUpdate}
                                onChange={(e) => handleUpdateForeignKey(idx, { onUpdate: e.target.value as any })}
                                className="sqlite-modal-select"
                                style={{
                                  padding: '5px 24px 5px 6px',
                                  fontSize: '0.74rem',
                                  fontWeight: 800
                                }}
                              >
                                <option value="CASCADE">CASCADE</option>
                                <option value="RESTRICT">RESTRICT</option>
                                <option value="SET NULL">SET NULL</option>
                                <option value="NO ACTION">NO ACTION</option>
                                <option value="SET DEFAULT">SET DEFAULT</option>
                              </select>
                            </td>

                            {/* Eliminar FK */}
                            <td style={{ padding: '4px 6px', textAlign: 'center' }}>
                              <button
                                type="button"
                                onClick={() => handleDeleteForeignKey(idx)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#EF4444',
                                  cursor: 'pointer'
                                }}
                                title="Eliminar clave foránea"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PREVISUALIZACIÓN SQL EN VIVO (Idéntico a DB Browser for SQLite) */}
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.74rem',
                fontWeight: 900,
                color: '#475569',
                marginBottom: 4
              }}
            >
              <Code2 size={14} className="text-sky-600" />
              <span>Sentencia SQL en vivo (SQLite DDL):</span>
            </div>
            <pre
              style={{
                background: '#0F172A',
                color: '#38BDF8',
                padding: '10px 14px',
                borderRadius: 8,
                fontSize: '0.76rem',
                fontFamily: 'monospace',
                margin: 0,
                maxHeight: 120,
                overflowY: 'auto',
                border: '2px solid #000'
              }}
            >
              <code>{generatedSql}</code>
            </pre>
          </div>
        </div>

        {/* ACCIONES INFERIORES */}
        <div
          style={{
            background: '#F8FAFC',
            borderTop: '2px solid #000',
            padding: '10px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              background: '#F1F5F9',
              border: '2px solid #000',
              borderRadius: 8,
              padding: '7px 14px',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {onInsertToEditor && (
              <button
                type="button"
                onClick={() => {
                  onInsertToEditor(generatedSql);
                  soundService.playToken();
                  onClose();
                }}
                disabled={isSubmitting}
                style={{
                  background: '#FFFFFF',
                  color: '#0F172A',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0 #000',
                  borderRadius: 8,
                  padding: '7px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer'
                }}
                title="Inserta esta sentencia en el editor de consultas SQL"
              >
                <Code2 size={14} />
                <span>Insertar en Editor</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleExecute}
              disabled={isSubmitting}
              style={{
                background: isEditMode ? '#D97706' : '#0284C7',
                color: '#FFFFFF',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                borderRadius: 8,
                padding: '7px 16px',
                fontSize: '0.82rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer'
              }}
            >
              <Check size={15} />
              <span>
                {isSubmitting
                  ? 'Guardando...'
                  : isEditMode
                  ? 'Aplicar Cambios a Tabla'
                  : 'Crear Tabla Ahora'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
