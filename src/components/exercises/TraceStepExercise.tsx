import React, { useState, useEffect } from 'react';
import { TraceStepExercise as TraceStepType } from '../../types/lesson';
import { soundService } from '../../services/soundService';

interface TraceStepProps {
  exercise: TraceStepType;
  onAnswerChange: (isReady: boolean, userValues: Record<number, Record<string, string>>) => void;
}

export const TraceStepComponent: React.FC<TraceStepProps> = ({
  exercise,
  onAnswerChange
}) => {
  const [userInputs, setUserInputs] = useState<Record<number, Record<string, string>>>({});

  // Resetear entradas cuando cambia el ejercicio
  useEffect(() => {
    setUserInputs({});
    onAnswerChange(false, {});
  }, [exercise.id]);

  const handleInputChange = (iteration: number, varName: string, value: string) => {
    soundService.playToken();
    const updated = {
      ...userInputs,
      [iteration]: {
        ...(userInputs[iteration] || {}),
        [varName]: value
      }
    };
    setUserInputs(updated);

    // Comprobar si todas las celdas tienen datos
    const allFilled = exercise.iterations.every(iter =>
      Object.keys(iter.expectedVariables).every(k => (updated[iter.iteration]?.[k] || '').trim().length > 0)
    );
    onAnswerChange(allFilled, updated);
  };

  return (
    <div>
      <pre
        style={{
          background: '#0F172A',
          padding: '16px',
          borderRadius: '16px',
          fontFamily: 'JetBrains Mono',
          color: '#F8FAFC',
          fontSize: '0.95rem',
          lineHeight: 1.55,
          marginBottom: '18px',
          border: '2px solid #E2E8F0',
          boxShadow: '0 5px 0 #CBD5E1',
          overflowX: 'auto'
        }}
      >
        {exercise.code}
      </pre>

      <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '16px', border: '2px solid var(--border-color)', boxShadow: '0 4px 0 var(--border-shadow)' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--orange-main)', marginBottom: '12px' }}>
          TABLA DE SEGUIMIENTO (VALOR POR CADA ITERACIÓN)
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)', color: '#1E293B', fontSize: '0.88rem' }}>
              <th style={{ padding: '8px' }}>Iteración</th>
              {Object.keys(exercise.iterations[0].expectedVariables).map(v => (
                <th key={v} style={{ padding: '8px' }}>{v}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exercise.iterations.map(iter => (
              <tr key={iter.iteration} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px', fontWeight: 800, color: 'var(--orange-main)' }}>
                  Paso {iter.iteration}
                </td>
                {Object.keys(iter.expectedVariables).map(varName => (
                  <td key={varName} style={{ padding: '8px' }}>
                    <input
                      type="text"
                      placeholder="valor"
                      value={userInputs[iter.iteration]?.[varName] || ''}
                      onChange={(e) => handleInputChange(iter.iteration, varName, e.target.value)}
                      style={{
                        width: '74px',
                        textAlign: 'center',
                        background: '#F8FAFC',
                        border: '2px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '6px',
                        color: '#1E293B',
                        fontWeight: 700,
                        fontFamily: 'JetBrains Mono'
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
