import React, { useState } from 'react';
import { Database, X, FolderPlus } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface NewDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (dbName: string, templateType: 'empty' | 'sample') => Promise<void>;
}

export const NewDatabaseModal: React.FC<NewDatabaseModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [dbName, setDbName] = useState('');
  const [templateType, setTemplateType] = useState<'empty' | 'sample'>('empty');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = dbName.trim().replace(/[^a-zA-Z0-9_\-\s]/g, '');
    if (!cleanName) {
      setError('Por favor escribe un nombre para la base de datos.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onCreate(cleanName, templateType);
      soundService.playToken();
      setDbName('');
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Error al crear la base de datos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
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
          border: '2px solid #000',
          boxShadow: '5px 5px 0 #000',
          borderRadius: 14,
          width: '100%',
          maxWidth: 440,
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div
          style={{
            background: '#F8FAFC',
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
                background: '#0284C7',
                border: '2px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}
            >
              <Database size={16} />
            </div>
            <div>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                Nueva Base de Datos SQLite
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                Crea un nuevo archivo .db en tu navegador
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

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
          {error && (
            <div
              style={{
                background: '#FEF2F2',
                border: '2px solid #EF4444',
                color: '#991B1B',
                padding: '8px 12px',
                borderRadius: 8,
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: 14
              }}
            >
              {error}
            </div>
          )}

          {/* Nombre de la BD */}
          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#1E293B',
                marginBottom: 6
              }}
            >
              Nombre de la Base de Datos
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                autoFocus
                placeholder="ej. tienda, escuela, mi_proyecto"
                value={dbName}
                onChange={(e) => setDbName(e.target.value)}
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  border: '2px solid #000',
                  borderRadius: 8,
                  padding: '9px 40px 9px 12px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#94A3B8'
                }}
              >
                .db
              </span>
            </div>
          </div>

          {/* Tipo de inicio */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#1E293B',
                marginBottom: 6
              }}
            >
              Contenido inicial
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                type="button"
                onClick={() => setTemplateType('empty')}
                style={{
                  background: templateType === 'empty' ? '#EFF6FF' : '#FFFFFF',
                  border: templateType === 'empty' ? '2px solid #0284C7' : '2px solid #CBD5E1',
                  boxShadow: templateType === 'empty' ? '2px 2px 0 #0284C7' : 'none',
                  borderRadius: 8,
                  padding: '10px 8px',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0F172A', marginBottom: 2 }}>
                  Base Vacía
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                  Comenzar desde cero sin tablas
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('sample')}
                style={{
                  background: templateType === 'sample' ? '#EFF6FF' : '#FFFFFF',
                  border: templateType === 'sample' ? '2px solid #0284C7' : '2px solid #CBD5E1',
                  boxShadow: templateType === 'sample' ? '2px 2px 0 #0284C7' : 'none',
                  borderRadius: 8,
                  padding: '10px 8px',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0F172A', marginBottom: 2 }}>
                  Con Ejemplo
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                  Tabla productos precargada
                </div>
              </button>
            </div>
          </div>

          {/* Acciones */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                background: '#F1F5F9',
                border: '2px solid #000',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: '#0284C7',
                color: '#FFF',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                borderRadius: 8,
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer'
              }}
            >
              <FolderPlus size={15} />
              <span>{isSubmitting ? 'Creando...' : 'Crear Base de Datos'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
