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
          borderRadius: '16px',
          fontFamily: 'JetBrains Mono, monospace',
          color: '#F8FAFC',
          fontSize: '0.94rem',
          lineHeight: 1.6,
          marginBottom: '18px',
          border: '2.5px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          overflowX: 'auto'
        }}
      >
        {exercise.code}
      </pre>

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '16px 18px',
          border: '2.5px solid #000000',
          boxShadow: '4px 4px 0px #000000'
        }}
      >
        <div
          style={{
            fontSize: '0.82rem',
            fontWeight: 900,
            color: '#0284C7',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>Tabla de valores por paso</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '280px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #000000', color: '#000000', fontSize: '0.88rem' }}>
                <th style={{ padding: '10px 12px', fontWeight: 900, textAlign: 'left' }}>Paso</th>
                {Object.keys(exercise.iterations[0].expectedVariables).map(v => (
                  <th key={v} style={{ padding: '10px 12px', fontWeight: 900, fontFamily: 'JetBrains Mono, monospace' }}>
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exercise.iterations.map(iter => (
                <tr key={iter.iteration} style={{ borderBottom: '1.5px solid #000000' }}>
                  <td style={{ padding: '12px 10px', textAlign: 'left' }}>
                    <span
                      style={{
                        background: '#FFF7ED',
                        border: '1.5px solid #000000',
                        boxShadow: '1.5px 1.5px 0px #000000',
                        color: '#EA580C',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 900,
                        display: 'inline-block'
                      }}
                    >
                      Paso {iter.iteration}
                    </span>
                  </td>
                  {Object.keys(iter.expectedVariables).map(varName => (
                    <td key={varName} style={{ padding: '10px 8px' }}>
                      <input
                        type="text"
                        placeholder="ej: 2"
                        value={userInputs[iter.iteration]?.[varName] || ''}
                        onChange={(e) => handleInputChange(iter.iteration, varName, e.target.value)}
                        style={{
                          width: '90px',
                          textAlign: 'center',
                          background: '#FFFFFF',
                          border: '2px solid #000000',
                          boxShadow: '2px 2px 0px #000000',
                          borderRadius: '10px',
                          padding: '8px 10px',
                          color: '#000000',
                          fontWeight: 900,
                          fontSize: '1rem',
                          fontFamily: 'JetBrains Mono, monospace',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'all 0.15s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#38BDF8';
                          e.target.style.borderBottomColor = '#0284C7';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#CBD5E1';
                          e.target.style.borderBottomColor = '#94A3B8';
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
