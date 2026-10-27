import React from 'react';
import { ShieldAlert, AlertTriangle, Trash2, X } from 'lucide-react';
import { TableSchemaInfo } from '../../types/sqliteLab';

interface RelationWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTable: TableSchemaInfo | null;
  allTables: TableSchemaInfo[];
  onConfirmDrop: (tableName: string) => void;
}

export const RelationWarningModal: React.FC<RelationWarningModalProps> = ({
  isOpen,
  onClose,
  targetTable,
  allTables,
  onConfirmDrop
}) => {
  if (!isOpen || !targetTable) return null;

  // 1. Tablas que dependen de esta tabla (tienen una FK apuntando a targetTable)
  const dependentRelations: {
    sourceTable: string;
    fromColumn: string;
    targetColumn: string;
    onDelete?: string;
  }[] = [];

  allTables.forEach((t) => {
    if (t.name.toLowerCase() !== targetTable.name.toLowerCase()) {
      t.foreignKeys.forEach((fk) => {
        if (fk.table.toLowerCase() === targetTable.name.toLowerCase()) {
          dependentRelations.push({
            sourceTable: t.name,
            fromColumn: fk.from,
            targetColumn: fk.to,
            onDelete: fk.on_delete
          });
        }
      });
    }
  });

  // 2. Tablas a las que esta tabla apunta (FKs salientes de targetTable)
  const outgoingRelations = targetTable.foreignKeys.map((fk) => ({
    targetTable: fk.table,
    fromColumn: fk.from,
    targetColumn: fk.to,
    onDelete: fk.on_delete
  }));

  const hasDependencies = dependentRelations.length > 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(3px)',
        zIndex: 10001,
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
          maxWidth: 500,
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ENCABEZADO */}
        <div
          style={{
            background: hasDependencies ? '#FEF2F2' : '#F8FAFC',
            borderBottom: '2px solid #000',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: hasDependencies ? '#EF4444' : '#E2E8F0',
                border: '2px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: hasDependencies ? '#FFF' : '#0F172A'
              }}
            >
              {hasDependencies ? <ShieldAlert size={18} /> : <Trash2 size={16} />}
            </div>
            <div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                {hasDependencies ? 'Comprobación de Relaciones (PK / FK)' : 'Eliminar Tabla'}
              </h3>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                Tabla: <strong>{targetTable.name}</strong>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#FFF',
              border: '2px solid #000',
              borderRadius: 6,
              padding: 4,
              cursor: 'pointer',
              display: 'flex'
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* CONTENIDO */}
        <div style={{ padding: '16px' }}>
          {hasDependencies ? (
            <div>
              <div
                style={{
                  background: '#FFF1F2',
                  border: '2px solid #F43F5E',
                  borderRadius: 8,
                  padding: '10px 12px',
                  marginBottom: 14,
                  fontSize: '0.78rem',
                  color: '#9F1239'
                }}
              >
                <div style={{ fontWeight: 900, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertTriangle size={15} />
                  <span>¡Atención! Integridad Referencial Comprometida</span>
                </div>
                Existen otras tablas que dependen directamente de <strong>"{targetTable.name}"</strong> mediante
                llaves foráneas (FK). Si eliminas esta tabla, romperás las relaciones de la base de datos.
              </div>

              {/* LISTA DE DEPENDENCIAS DETECTADAS */}
              <div style={{ marginBottom: 14 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#334155', display: 'block', marginBottom: 6 }}>
                  🔗 Tablas que dependen de "{targetTable.name}":
                </span>
                <div style={{ border: '2px solid #000', borderRadius: 8, overflow: 'hidden' }}>
                  {dependentRelations.map((rel, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '8px 10px',
                        background: '#FFF',
                        borderBottom: idx === dependentRelations.length - 1 ? 'none' : '1px solid #E2E8F0',
                        fontSize: '0.76rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 800, color: '#0F172A' }}>{rel.sourceTable}</span>
                        <span style={{ color: '#64748B' }}>
                          {' '}
                          (FK: <code>{rel.fromColumn}</code> → <code>{targetTable.name}.{rel.targetColumn}</code>)
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.66rem',
                          background: '#EFF6FF',
                          color: '#1D4ED8',
                          padding: '1px 5px',
                          borderRadius: 4,
                          fontWeight: 700
                        }}
                      >
                        ON DELETE {rel.onDelete || 'NO ACTION'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.84rem', color: '#1E293B', fontWeight: 600 }}>
                ¿Estás seguro de que deseas eliminar permanentemente la tabla <strong>"{targetTable.name}"</strong>?
              </p>
              <div style={{ fontSize: '0.76rem', color: '#64748B', background: '#F8FAFC', padding: '10px', borderRadius: 8, border: '1.5px solid #E2E8F0', marginBottom: 14 }}>
                • Columnas que se eliminarán: <strong>{targetTable.columns.length}</strong>
                <br />
                • Registros que se perderán: <strong>{targetTable.rowCount}</strong>
              </div>
            </div>
          )}

          {/* Si la tabla tiene FKs salientes */}
          {outgoingRelations.length > 0 && (
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: 14 }}>
              Nota: Esta tabla también contiene {outgoingRelations.length} clave(s) foránea(s) hacia{' '}
              {outgoingRelations.map((o) => `"${o.targetTable}"`).join(', ')}.
            </div>
          )}

          {/* BOTONES */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#F1F5F9',
                border: '2px solid #000',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirmDrop(targetTable.name);
                onClose();
              }}
              style={{
                background: '#EF4444',
                color: '#FFF',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                borderRadius: 8,
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Trash2 size={14} />
              <span>{hasDependencies ? 'Eliminar de todas formas (DROP)' : 'Eliminar Tabla'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
