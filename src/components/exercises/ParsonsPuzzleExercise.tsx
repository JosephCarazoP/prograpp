import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { ParsonsPuzzleExercise as ParsonsPuzzleType } from '../../types/lesson';
import { soundService } from '../../services/soundService';

interface ParsonsProps {
  exercise: ParsonsPuzzleType;
  onOrderChange: (order: number[]) => void;
}

export const ParsonsPuzzleComponent: React.FC<ParsonsProps> = ({
  exercise,
  onOrderChange
}) => {
  // Genera un orden mezclado determinístico para que sea un verdadero reto a ordenar
  const getScrambledOrder = (len: number) => {
    return Array.from({ length: len }, (_, i) => len - 1 - i);
  };

  const [currentOrder, setCurrentOrder] = useState<number[]>(() =>
    getScrambledOrder(exercise.lines.length)
  );

  // Al montar o cambiar de ejercicio, mezclamos e informamos inmediatamente el orden activo
  useEffect(() => {
    const scrambled = getScrambledOrder(exercise.lines.length);
    setCurrentOrder(scrambled);
    onOrderChange(scrambled);
  }, [exercise.id, exercise.lines.length]);

  const moveLine = (index: number, direction: 'up' | 'down') => {
    soundService.playToken();
    const newOrder = [...currentOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setCurrentOrder(newOrder);
    onOrderChange(newOrder);
  };

  return (
    <div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#F1F5F9',
          border: '1.5px solid #CBD5E1',
          padding: '4px 12px',
          borderRadius: '10px',
          color: '#0F172A',
          fontSize: '0.82rem',
          fontWeight: 800,
          marginBottom: '14px'
        }}
      >
        <span>🧩 Ordena las líneas de código de arriba a abajo</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentOrder.map((lineIdx, position) => (
          <div
            key={lineIdx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              border: '2px solid #CBD5E1',
              borderRadius: '16px',
              padding: '12px 14px',
              gap: '12px',
              boxShadow: '0 4px 0 #94A3B8',
              boxSizing: 'border-box',
              transition: 'all 0.12s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '8px',
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  color: '#64748B',
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {position + 1}
              </div>
              <code
                style={{
                  color: '#0F172A',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.92rem',
                  lineHeight: 1.4,
                  wordBreak: 'break-word',
                  flex: 1
                }}
              >
                {exercise.lines[lineIdx]}
              </code>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              <button
                disabled={position === 0}
                onClick={() => moveLine(position, 'up')}
                style={{
                  background: position === 0 ? '#F1F5F9' : '#FFFFFF',
                  border: '2px solid',
                  borderColor: position === 0 ? '#E2E8F0' : '#CBD5E1',
                  color: position === 0 ? '#CBD5E1' : '#0F172A',
                  borderRadius: '10px',
                  padding: '7px 9px',
                  cursor: position === 0 ? 'default' : 'pointer',
                  boxShadow: position === 0 ? 'none' : '0 3px 0 #94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.1s ease'
                }}
                title="Subir línea"
              >
                <ArrowUp size={16} strokeWidth={2.8} />
              </button>
              <button
                disabled={position === currentOrder.length - 1}
                onClick={() => moveLine(position, 'down')}
                style={{
                  background: position === currentOrder.length - 1 ? '#F1F5F9' : '#FFFFFF',
                  border: '2px solid',
                  borderColor: position === currentOrder.length - 1 ? '#E2E8F0' : '#CBD5E1',
                  color: position === currentOrder.length - 1 ? '#CBD5E1' : '#0F172A',
                  borderRadius: '10px',
                  padding: '7px 9px',
                  cursor: position === currentOrder.length - 1 ? 'default' : 'pointer',
                  boxShadow: position === currentOrder.length - 1 ? 'none' : '0 3px 0 #94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.1s ease'
                }}
                title="Bajar línea"
              >
                <ArrowDown size={16} strokeWidth={2.8} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
