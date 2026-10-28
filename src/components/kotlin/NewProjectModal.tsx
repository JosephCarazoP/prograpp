import React, { useState } from 'react';
import { Code2, X, Plus, Layers, Box } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, template: 'empty' | 'oop' | 'collections') => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [name, setName] = useState('');
  const [template, setTemplate] = useState<'empty' | 'oop' | 'collections'>('empty');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    if (!cleanName) {
      setError('Por favor escribe un nombre para el proyecto.');
      return;
    }

    soundService.playToken();
    onCreate(cleanName, template);
    setName('');
    setTemplate('empty');
    onClose();
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
          border: '2px solid #000000',
          boxShadow: '5px 5px 0px #000000',
          borderRadius: 14,
          width: '100%',
          maxWidth: 460,
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div
          style={{
            background: '#F8FAFC',
            borderBottom: '2px solid #000000',
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
                background: '#F3E8FF',
                border: '2px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7E22CE'
              }}
            >
              <Code2 size={16} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#0F172A' }}>
                Nuevo Proyecto Kotlin
              </h3>
              <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                Crea un espacio de código independiente
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: 4,
              borderRadius: 6
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ padding: '16px 18px' }}>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 900,
                color: '#0F172A',
                marginBottom: 6
              }}
            >
              Nombre del Proyecto
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ej: MiAlgoritmo, TiendaVirtual, Utilidades..."
              autoFocus
              maxLength={40}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '2px solid #000000',
                boxShadow: '2px 2px 0px #000000',
                fontSize: '0.85rem',
                fontWeight: 700,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {error && (
              <p style={{ margin: '6px 0 0', fontSize: '0.75rem', color: '#DC2626', fontWeight: 800 }}>
                {error}
              </p>
            )}
          </div>

          {/* Selector de Plantilla */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 900,
                color: '#0F172A',
                marginBottom: 8
              }}
            >
              Plantilla de Inicio
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Opción 1: Empty */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setTemplate('empty')}
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '2px solid #000000',
                  boxShadow: template === 'empty' ? '2.5px 2.5px 0px #000000' : '1px 1px 0px #000000',
                  background: template === 'empty' ? '#FEF9C3' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'all 0.08s ease'
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: '#FFFFFF',
                    border: '1.5px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Code2 size={15} className="text-purple-600" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#0F172A' }}>
                    Plantilla Básica (fun main)
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
                    Función main limpia lista para escribir cualquier código
                  </div>
                </div>
              </div>

              {/* Opción 2: OOP */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setTemplate('oop')}
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '2px solid #000000',
                  boxShadow: template === 'oop' ? '2.5px 2.5px 0px #000000' : '1px 1px 0px #000000',
                  background: template === 'oop' ? '#FEF9C3' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'all 0.08s ease'
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: '#FFFFFF',
                    border: '1.5px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Box size={15} className="text-sky-600" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#0F172A' }}>
                    Orientado a Objetos (POO)
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
                    Data classes, interfaces y herencia estructurada
                  </div>
                </div>
              </div>

              {/* Opción 3: Collections */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setTemplate('collections')}
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '2px solid #000000',
                  boxShadow: template === 'collections' ? '2.5px 2.5px 0px #000000' : '1px 1px 0px #000000',
                  background: template === 'collections' ? '#FEF9C3' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'all 0.08s ease'
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: '#FFFFFF',
                    border: '1.5px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Layers size={15} className="text-amber-600" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#0F172A' }}>
                    Colecciones y Programación Funcional
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
                    Listas, mapas, filtros, transformaciones y lambdas
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: '2px solid #000000',
                background: '#FFFFFF',
                color: '#334155',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: '2px solid #000000',
                background: '#7E22CE',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #000000',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Plus size={15} />
              <span>Crear Proyecto</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
