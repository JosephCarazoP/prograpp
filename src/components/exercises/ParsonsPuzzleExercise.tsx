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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentOrder.map((lineIdx, position) => (
          <div
            key={lineIdx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              border: '2.5px solid #000000',
              borderRadius: '14px',
              padding: '12px 14px',
              gap: '12px',
              boxShadow: '3.5px 3.5px 0px #000000',
              boxSizing: 'border-box',
              transition: 'all 0.12s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: '#E0F2FE',
                  border: '2px solid #000000',
                  boxShadow: '1.5px 1.5px 0px #000000',
                  color: '#0284C7',
                  fontSize: '0.85rem',
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
                  color: '#000000',
                  fontWeight: 800,
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
                  borderColor: position === 0 ? '#CBD5E1' : '#000000',
                  color: position === 0 ? '#94A3B8' : '#000000',
                  borderRadius: '8px',
                  padding: '7px 9px',
                  cursor: position === 0 ? 'default' : 'pointer',
                  boxShadow: position === 0 ? 'none' : '2px 2px 0px #000000',
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
                  borderColor: position === currentOrder.length - 1 ? '#CBD5E1' : '#000000',
                  color: position === currentOrder.length - 1 ? '#94A3B8' : '#000000',
                  borderRadius: '8px',
                  padding: '7px 9px',
                  cursor: position === currentOrder.length - 1 ? 'default' : 'pointer',
                  boxShadow: position === currentOrder.length - 1 ? 'none' : '2px 2px 0px #000000',
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
  );
};
