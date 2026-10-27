import React, { useEffect, useRef } from 'react';
import {
  Eye,
  Edit,
  Trash2,
  Copy,
  Table2,
  Code,
  Eraser,
  PlusCircle
} from 'lucide-react';
import { TableSchemaInfo } from '../../types/sqliteLab';

interface TableContextMenuProps {
  x: number;
  y: number;
  table: TableSchemaInfo;
  isOpen: boolean;
  onClose: () => void;
  onViewData: (table: TableSchemaInfo) => void;
  onEditTable: (table: TableSchemaInfo) => void;
  onDeleteTable: (table: TableSchemaInfo) => void;
  onClearTable: (table: TableSchemaInfo) => void;
  onCopyDdl: (table: TableSchemaInfo) => void;
  onInsertQuery: (sql: string) => void;
}

export const TableContextMenu: React.FC<TableContextMenuProps> = ({
  x,
  y,
  table,
  isOpen,
  onClose,
  onViewData,
  onEditTable,
  onDeleteTable,
  onClearTable,
  onCopyDdl,
  onInsertQuery
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Ajustar posición para evitar salirse de pantalla
  const menuWidth = 230;
  const menuHeight = 290;
  const posX = Math.min(x, window.innerWidth - menuWidth - 16);
  const posY = Math.min(y, window.innerHeight - menuHeight - 16);

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        left: posX,
        top: posY,
        zIndex: 10000,
        background: '#FFFFFF',
        border: '2px solid #000',
        boxShadow: '4px 4px 0 #000',
        borderRadius: 10,
        width: menuWidth,
        padding: '6px',
        userSelect: 'none'
      }}
    >
      {/* Título de la tabla seleccionada */}
      <div
        style={{
          padding: '6px 10px',
          borderBottom: '1.5px solid #E2E8F0',
          marginBottom: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}
      >
        <Table2 size={14} className="text-sky-600" />
        <span style={{ fontWeight: 900, fontSize: '0.78rem', color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {table.name}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.68rem', fontWeight: 800, color: '#64748B' }}>
          {table.rowCount} filas
        </span>
      </div>

      {/* Opciones */}
      <button
        type="button"
        className="sqlite-ctx-item"
        onClick={() => {
          onViewData(table);
          onClose();
        }}
      >
        <Eye size={14} className="text-sky-600" />
        <span>Examinar tabla (Ver datos)</span>
      </button>

      <button
        type="button"
        className="sqlite-ctx-item"
        onClick={() => {
          onEditTable(table);
          onClose();
        }}
      >
        <Edit size={14} className="text-amber-600" />
        <span>Modificar estructura</span>
      </button>

      <button
        type="button"
        className="sqlite-ctx-item"
        onClick={() => {
          onCopyDdl(table);
          onClose();
        }}
      >
        <Copy size={14} className="text-slate-600" />
        <span>Copiar sentencia CREATE</span>
      </button>

      <div style={{ height: 1, background: '#E2E8F0', margin: '4px 0' }} />

      {/* Generadores de consultas rápidas */}
      <button
        type="button"
        className="sqlite-ctx-item"
        onClick={() => {
          onInsertQuery(`SELECT * FROM "${table.name}" LIMIT 50;`);
          onClose();
        }}
      >
        <Code size={13} className="text-emerald-600" />
        <span>Generar SELECT *</span>
      </button>

      <button
        type="button"
        className="sqlite-ctx-item"
        onClick={() => {
          const colNames = table.columns.map(c => `"${c.name}"`).join(', ');
          const valPlaceholders = table.columns.map(() => '?').join(', ');
          onInsertQuery(`INSERT INTO "${table.name}" (${colNames})\nVALUES (${valPlaceholders});`);
          onClose();
        }}
      >
        <PlusCircle size={13} className="text-blue-600" />
        <span>Generar INSERT</span>
      </button>

      <div style={{ height: 1, background: '#E2E8F0', margin: '4px 0' }} />

      {/* Acciones destructivas con comprobación de integridad */}
      <button
        type="button"
        className="sqlite-ctx-item text-amber-700 hover:bg-amber-50"
        onClick={() => {
          onClearTable(table);
          onClose();
        }}
      >
        <Eraser size={14} className="text-amber-600" />
        <span>Vaciar registros (DELETE)</span>
      </button>

      <button
        type="button"
        className="sqlite-ctx-item text-red-600 hover:bg-red-50"
        onClick={() => {
          onDeleteTable(table);
          onClose();
        }}
      >
        <Trash2 size={14} className="text-red-600" />
        <span style={{ fontWeight: 800 }}>Borrar tabla (DROP TABLE)</span>
      </button>
    </div>
  );
};
