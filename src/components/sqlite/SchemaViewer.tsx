import React, { useState } from 'react';
import { TableSchemaInfo } from '../../types/sqliteLab';
import {
  Table2,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Layers,
  Plus,
  Edit2,
  Trash2,
  Eye
} from 'lucide-react';
import { TableContextMenu } from './TableContextMenu';

interface SchemaViewerProps {
  tables: TableSchemaInfo[];
  onRefresh: () => void;
  onInsertQuery?: (sql: string) => void;
  onCreateTableGui?: () => void;
  onEditTable?: (table: TableSchemaInfo) => void;
  onDeleteTable?: (table: TableSchemaInfo) => void;
  onViewData?: (table: TableSchemaInfo) => void;
}

export const SchemaViewer: React.FC<SchemaViewerProps> = ({
  tables,
  onRefresh,
  onInsertQuery,
  onCreateTableGui,
  onEditTable,
  onDeleteTable,
  onViewData
}) => {
  const [selectedTableName, setSelectedTableName] = useState<string | null>(
    tables.length > 0 ? tables[0].name : null
  );
  const [expandedTable, setExpandedTable] = useState<string | null>(
    tables.length > 0 ? tables[0].name : null
  );
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    table: TableSchemaInfo;
  } | null>(null);

  const selectedTable = tables.find((t) => t.name === selectedTableName) || null;

  // Manejar click derecho en una tabla
  const handleContextMenu = (e: React.MouseEvent, table: TableSchemaInfo) => {
    e.preventDefault();
    setSelectedTableName(table.name);
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      table
    });
  };

  // Copiar DDL al portapapeles
  const handleCopyDdl = (table: TableSchemaInfo) => {
    const ddl = table.sql || `CREATE TABLE "${table.name}" (...);`;
    navigator.clipboard?.writeText(ddl);
  };

  // Vaciar registros
  const handleClearTable = (table: TableSchemaInfo) => {
    if (onInsertQuery) {
      onInsertQuery(`DELETE FROM "${table.name}";`);
    }
  };

  return (
    <div className="sqlite-sidebar-box">
      {/* ═══ 1. ENCABEZADO SUPERIOR LIMPIO: TABLAS (N) + BOTÓN RECARGAR ═══ */}
      <div className="sqlite-sidebar-header">
        <div className="sqlite-sidebar-title">
          <Layers size={15} className="text-sky-600 flex-shrink-0" />
          <span>TABLAS</span>
          <span className="sqlite-table-count-badge">{tables.length}</span>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="sqlite-sidebar-icon-btn"
          title="Recargar estructura de la base de datos"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* ═══ 2. BARRA DE HERRAMIENTAS ESTILO DB BROWSER FOR SQLITE ═══ */}
      <div className="sqlite-table-actions-bar">
        {onCreateTableGui && (
          <button
            type="button"
            onClick={onCreateTableGui}
            className="sqlite-action-bar-btn"
            style={{ background: '#0284C7', color: '#FFF', borderColor: '#000' }}
            title="Crear nueva tabla mediante interfaz gráfica"
          >
            <Plus size={12} />
            <span>Crear tabla</span>
          </button>
        )}

        {onViewData && (
          <button
            type="button"
            onClick={() => selectedTable && onViewData(selectedTable)}
            disabled={!selectedTable}
            className="sqlite-action-bar-btn"
            title={selectedTable ? `Examinar registros de "${selectedTable.name}" en la tabla de resultados` : 'Selecciona una tabla'}
          >
            <Eye size={11} className="text-sky-600" />
            <span>Ver Datos</span>
          </button>
        )}

        {onEditTable && (
          <button
            type="button"
            onClick={() => selectedTable && onEditTable(selectedTable)}
            disabled={!selectedTable}
            className="sqlite-action-bar-btn"
            title={selectedTable ? `Modificar estructura de "${selectedTable.name}"` : 'Selecciona una tabla'}
          >
            <Edit2 size={11} className="text-amber-600" />
            <span>Modificar</span>
          </button>
        )}

        {onDeleteTable && (
          <button
            type="button"
            onClick={() => selectedTable && onDeleteTable(selectedTable)}
            disabled={!selectedTable}
            className="sqlite-action-bar-btn text-red-600"
            title={selectedTable ? `Borrar tabla "${selectedTable.name}" (con comprobación de PK/FK)` : 'Selecciona una tabla'}
          >
            <Trash2 size={11} className="text-red-500" />
            <span>Borrar</span>
          </button>
        )}
      </div>

      {/* ═══ 3. ÁRBOL / LISTA DE TABLAS ═══ */}
      <div className="sqlite-sidebar-content">
        {tables.length === 0 ? (
          <div className="sqlite-no-tables-msg">
            <p style={{ margin: '0 0 6px 0', fontWeight: 800 }}>No hay tablas creadas</p>
            <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
              Usa el botón "Crear tabla" o escribe una consulta CREATE TABLE en el editor.
            </span>
          </div>
        ) : (
          tables.map((t) => {
            const isExpanded = expandedTable === t.name;
            const isSelected = selectedTableName === t.name;

            return (
              <div
                key={t.name}
                className={`sqlite-table-nav-item ${isSelected ? 'active' : ''}`}
                style={{
                  border: isSelected ? '2px solid #000' : '1.5px solid #E2E8F0',
                  boxShadow: isSelected ? '2px 2px 0 #000' : 'none'
                }}
                onContextMenu={(e) => handleContextMenu(e, t)}
              >
                {/* Cabecera de la tabla */}
                <div
                  className="sqlite-table-nav-header"
                  onClick={() => {
                    setSelectedTableName(t.name);
                    setExpandedTable(isExpanded ? null : t.name);
                  }}
                  title={`Clic derecho para más opciones sobre "${t.name}"`}
                >
                  <div className="sqlite-table-nav-name" title={t.name}>
                    {isExpanded ? (
                      <ChevronDown size={14} className="text-slate-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
                    )}
                    <Table2 size={14} className="text-sky-600 flex-shrink-0" />
                    <span style={{ fontWeight: 800 }}>{t.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    {t.rowCount}
                  </span>
                </div>

                {/* Lista de Columnas y Relaciones */}
                {isExpanded && (
                  <div className="sqlite-table-cols-list">
                    {t.columns.map((c) => {
                      // Buscar si esta columna es una llave foránea (FK)
                      const fkInfo = t.foreignKeys.find((fk) => fk.from === c.name);

                      return (
                        <div
                          key={c.cid}
                          className="sqlite-col-row"
                          style={{
                            padding: '3px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 4
                          }}
                        >
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            {c.pk > 0 && (
                              <span
                                className="sqlite-badge-pk-mini"
                                style={{
                                  background: '#0284C7',
                                  color: '#FFF',
                                  fontSize: '0.62rem',
                                  fontWeight: 900,
                                  padding: '1px 4px',
                                  borderRadius: 4
                                }}
                                title="Primary Key (Clave Primaria)"
                              >
                                PK
                              </span>
                            )}
                            {fkInfo && (
                              <span
                                className="sqlite-badge-fk-mini"
                                style={{
                                  background: '#F59E0B',
                                  color: '#000',
                                  fontSize: '0.62rem',
                                  fontWeight: 900,
                                  padding: '1px 4px',
                                  borderRadius: 4
                                }}
                                title={`Foreign Key: referencia a ${fkInfo.table}(${fkInfo.to})`}
                              >
                                FK → {fkInfo.table}
                              </span>
                            )}
                            <span className="truncate font-semibold text-slate-800 text-[11px]">{c.name}</span>
                          </div>

                          <span className="text-[10px] text-slate-500 font-bold uppercase flex-shrink-0">
                            {c.type || 'ANY'}
                          </span>
                        </div>
                      );
                    })}

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ═══ 4. MENÚ CONTEXTUAL (RIGHT CLICK) ═══ */}
      {contextMenu && (
        <TableContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          table={contextMenu.table}
          isOpen={Boolean(contextMenu)}
          onClose={() => setContextMenu(null)}
          onViewData={(table) => onViewData?.(table)}
          onEditTable={(table) => onEditTable?.(table)}
          onDeleteTable={(table) => onDeleteTable?.(table)}
          onClearTable={handleClearTable}
          onCopyDdl={handleCopyDdl}
          onInsertQuery={(sql) => onInsertQuery?.(sql)}
        />
      )}
    </div>
  );
};
