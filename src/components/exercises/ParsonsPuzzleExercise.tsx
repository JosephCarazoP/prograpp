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
      <div style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 700, marginBottom: '12px' }}>
        Usa las flechas para ordenar las líneas hasta que el algoritmo sea correcto:
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {currentOrder.map((lineIdx, position) => (
          <div
            key={lineIdx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              border: '2px solid var(--border-color)',
              borderRadius: '14px',
              padding: '12px 14px',
              fontFamily: 'JetBrains Mono',
              fontSize: '0.92rem',
              color: '#1E293B',
              boxShadow: '0 3px 0 var(--border-shadow)'
            }}
          >
            <code style={{ color: '#1E293B', fontWeight: 600 }}>{exercise.lines[lineIdx]}</code>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                disabled={position === 0}
                onClick={() => moveLine(position, 'up')}
                style={{
                  background: position === 0 ? '#F1F5F9' : '#FFFFFF',
                  border: '1.5px solid var(--border-color)',
                  color: position === 0 ? '#CBD5E1' : '#475569',
                  borderRadius: '8px',
                  padding: '6px 8px',
                  cursor: position === 0 ? 'default' : 'pointer',
                  boxShadow: position === 0 ? 'none' : '0 2px 0 var(--border-shadow)'
                }}
              >
                <ArrowUp size={16} />
              </button>
              <button
                disabled={position === currentOrder.length - 1}
                onClick={() => moveLine(position, 'down')}
                style={{
                  background: position === currentOrder.length - 1 ? '#F1F5F9' : '#FFFFFF',
                  border: '1.5px solid var(--border-color)',
                  color: position === currentOrder.length - 1 ? '#CBD5E1' : '#475569',
                  borderRadius: '8px',
                  padding: '6px 8px',
                  cursor: position === currentOrder.length - 1 ? 'default' : 'pointer',
                  boxShadow: position === currentOrder.length - 1 ? 'none' : '0 2px 0 var(--border-shadow)'
                }}
              >
                <ArrowDown size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
