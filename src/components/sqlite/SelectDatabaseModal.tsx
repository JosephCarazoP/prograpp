import React, { useState, useEffect } from 'react';
import { Database, X, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { sqliteStorageService, UserDatabaseItem } from '../../services/sqliteStorageService';
import { soundService } from '../../services/soundService';

interface SelectDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDatabase: (dbId: string) => void;
  userId?: string;
  scriptSnippet?: string;
  scriptTitle?: string;
}

export const SelectDatabaseModal: React.FC<SelectDatabaseModalProps> = ({
  isOpen,
  onClose,
  onSelectDatabase,
  userId,
  scriptSnippet = '',
  scriptTitle = 'Script SQL'
}) => {
  const [databases, setDatabases] = useState<UserDatabaseItem[]>([]);
  const [selectedDbId, setSelectedDbId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const list = sqliteStorageService.getUserDatabases(userId);
      setDatabases(list);
      if (list.length > 0) {
        setSelectedDbId(list[0].id);
      }
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selectedDbId) return;
    soundService.playToken();
    onSelectDatabase(selectedDbId);
  };

  const previewLines = scriptSnippet ? scriptSnippet.split('\n').slice(0, 4).join('\n') : '';
  const totalLines = scriptSnippet ? scriptSnippet.split('\n').length : 0;

  return (
    <div
      className="hb-drawer-backdrop"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        zIndex: 9999
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="duo-modal-box"
        style={{
          width: '100%',
          maxWidth: 480,
          background: '#FFFFFF',
          borderRadius: 20,
          border: '3.5px solid #000000',
          boxShadow: '6px 6px 0px #000000',
          padding: 24,
          boxSizing: 'border-box',
          animation: 'cleanBossFloat 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: '#E0F2FE',
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Database size={22} color="#0284C7" strokeWidth={2.5} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>
                Abrir en SQLite Lab
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>
                Selecciona la Base de Datos de destino
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: '2px solid #000000',
              background: '#F1F5F9',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Vista previa del script con formato exacto */}
        {scriptSnippet && (
          <div
            style={{
              background: '#0B1120',
              border: '2px solid #000000',
              borderRadius: 12,
              padding: '10px 14px',
              marginBottom: 18,
              boxShadow: '2px 2px 0px #000000'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38BDF8', letterSpacing: '0.04em' }}>
                SCRIPT A CARGAR: {scriptTitle}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700 }}>
                {totalLines} {totalLines === 1 ? 'línea' : 'líneas'}
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                fontFamily: "'JetBrains Mono', Consolas, monospace",
                fontSize: '0.76rem',
                color: '#E2E8F0',
                whiteSpace: 'pre',
                tabSize: 2,
                overflowX: 'auto',
                lineHeight: 1.45,
                maxHeight: 70
              }}
            >
              {previewLines}
              {totalLines > 4 ? '\n...' : ''}
            </pre>
          </div>
        )}

        <p style={{ margin: '0 0 12px 0', fontSize: '0.86rem', color: '#334155', fontWeight: 700 }}>
          Solo puedes ejecutar este script en una base de datos ya creada. Selecciona en cuál de tus bases deseas abrirlo:
        </p>

        {/* Lista de Bases de Datos Creadas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 220, overflowY: 'auto', marginBottom: 20 }}>
          {databases.length === 0 ? (
            <div
              style={{
                padding: '16px',
                textAlign: 'center',
                background: '#FEF2F2',
                borderRadius: 12,
                border: '2px solid #EF4444',
                color: '#991B1B'
              }}
            >
              <AlertCircle size={24} style={{ margin: '0 auto 6px' }} />
              <div style={{ fontWeight: 800, fontSize: '0.86rem' }}>
                No tienes bases de datos creadas aún
              </div>
              <div style={{ fontSize: '0.76rem', marginTop: 4 }}>
                Abre SQLite Lab primero para inicializar tu Base Principal o crear una base nueva.
              </div>
            </div>
          ) : (
            databases.map((db) => {
              const isSelected = selectedDbId === db.id;
              return (
                <button
                  key={db.id}
                  type="button"
                  onClick={() => {
                    soundService.playToken();
                    setSelectedDbId(db.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: isSelected ? '3px solid #0284C7' : '2.5px solid #000000',
                    background: isSelected ? '#F0F9FF' : '#FFFFFF',
                    boxShadow: isSelected ? '4px 4px 0px #0284C7' : '2px 2px 0px #000000',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.1s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: isSelected ? '#0284C7' : '#F1F5F9',
                        color: isSelected ? '#FFFFFF' : '#475569',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1.5px solid #000000'
                      }}
                    >
                      <Database size={18} strokeWidth={2.4} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: '0.92rem', color: '#0F172A' }}>
                        {db.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <Clock size={12} />
                        <span>
                          {db.id === 'default' ? 'Base predeterminada' : new Date(db.createdAt).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      border: '2px solid #000000',
                      background: isSelected ? '#0284C7' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 900
                    }}
                  >
                    {isSelected ? '✓' : ''}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Acciones */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="duo-3d-btn gray sm"
            onClick={onClose}
            style={{ padding: '10px 16px' }}
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={!selectedDbId || databases.length === 0}
            className="duo-3d-btn blue sm"
            onClick={handleConfirm}
            style={{
              padding: '10px 20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              opacity: !selectedDbId || databases.length === 0 ? 0.6 : 1
            }}
          >
            <span>Cargar y Ejecutar en esta BD</span>
            <ArrowRight size={16} strokeWidth={2.8} />
          </button>
        </div>
      </div>
    </div>
  );
};
