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
          padding: '16px 18px',
          borderRadius: '18px',
          fontFamily: 'JetBrains Mono, monospace',
          color: '#F8FAFC',
          fontSize: '0.94rem',
          lineHeight: 1.6,
          marginBottom: '18px',
          border: '2px solid #E2E8F0',
          boxShadow: '0 5px 0 #CBD5E1',
          overflowX: 'auto'
        }}
      >
        {exercise.code}
      </pre>

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '18px 20px',
          border: '2px solid #CBD5E1',
          boxShadow: '0 4px 0 #94A3B8'
        }}
      >
        <div
          style={{
            fontSize: '0.82rem',
            fontWeight: 900,
            color: '#0284C7',
            marginBottom: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>Tabla de Seguimiento • Valor por Cada Iteración</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '280px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#0F172A', fontSize: '0.88rem' }}>
                <th style={{ padding: '10px 12px', fontWeight: 900, textAlign: 'left' }}>Iteración</th>
                {Object.keys(exercise.iterations[0].expectedVariables).map(v => (
                  <th key={v} style={{ padding: '10px 12px', fontWeight: 900, fontFamily: 'JetBrains Mono, monospace' }}>
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exercise.iterations.map(iter => (
                <tr key={iter.iteration} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 900, color: '#EA580C', textAlign: 'left' }}>
                    <span
                      style={{
                        background: '#FFF7ED',
                        border: '1.5px solid #FFEDD5',
                        color: '#EA580C',
                        padding: '3px 10px',
                        borderRadius: '8px',
                        fontSize: '0.82rem'
                      }}
                    >
                      Paso {iter.iteration}
                    </span>
                  </td>
                  {Object.keys(iter.expectedVariables).map(varName => (
                    <td key={varName} style={{ padding: '10px 8px' }}>
                      <input
                        type="text"
                        placeholder="valor"
                        value={userInputs[iter.iteration]?.[varName] || ''}
                        onChange={(e) => handleInputChange(iter.iteration, varName, e.target.value)}
                        style={{
                          width: '84px',
                          textAlign: 'center',
                          background: '#FFFFFF',
                          border: '2px solid #CBD5E1',
                          borderRadius: '12px',
                          padding: '8px 10px',
                          color: '#0F172A',
                          fontWeight: 800,
                          fontSize: '0.94rem',
                          fontFamily: 'JetBrains Mono, monospace',
                          boxShadow: '0 2px 0 #E2E8F0',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.15s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#0284C7';
                          e.target.style.boxShadow = '0 2px 0 #0284C7';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#CBD5E1';
                          e.target.style.boxShadow = '0 2px 0 #E2E8F0';
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
    </div>
  );
};
