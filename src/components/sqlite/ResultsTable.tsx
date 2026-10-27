import React from 'react';
import { SqliteQueryResult } from '../../types/sqliteLab';
import { AlertTriangle, CheckCircle2, Clock, Hash, TableProperties } from 'lucide-react';

interface ResultsTableProps {
  result: SqliteQueryResult | null;
  isRunning?: boolean;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ result, isRunning = false }) => {
  return (
    <div className="sqlite-results-card">
      {/* Header bar: RESULTADOS */}
      <div className="sqlite-results-header">
        <div className="sqlite-results-title">
          <TableProperties size={15} />
          <span>RESULTADOS</span>
        </div>

        <div className="sqlite-results-meta">
          {isRunning && (
            <span className="text-sky-600 font-bold text-xs flex items-center gap-1.5">
              <span className="sqlite-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
              Ejecutando...
            </span>
          )}
          {result && !result.error && (
            <>
              {result.rowsAffected > 0 && (
                <span className="sqlite-meta-badge flex items-center gap-1">
                  <Hash size={12} />
                  <strong>{result.rowsAffected}</strong> filas afectadas
                </span>
              )}
              {result.columns && result.columns.length > 0 && (
                <span className="sqlite-meta-badge">
                  <strong>{result.values.length}</strong> fila(s)
                </span>
              )}
              <span className="sqlite-meta-badge flex items-center gap-1">
                <Clock size={12} />
                {result.executionTimeMs} ms
              </span>
            </>
          )}
        </div>
      </div>

      {/* Cuerpo de resultados */}
      {isRunning ? (
        <div className="sqlite-empty-results">
          <div className="sqlite-spinner mb-2" />
          <p className="text-xs text-slate-500">Ejecutando consulta en el motor SQLite...</p>
        </div>
      ) : !result ? (
        <div className="sqlite-empty-results">
          <p className="text-slate-500 font-medium text-sm">Ejecuta una consulta para ver resultados</p>
        </div>
      ) : result.error ? (
        <div className="sqlite-error-box">
          <div className="sqlite-error-title">
            <AlertTriangle size={16} />
            <span>Error de SQLite</span>
            <span className="text-xs font-normal text-red-500 ml-auto">({result.executionTimeMs} ms)</span>
          </div>
          <div className="sqlite-error-msg">{result.error}</div>
        </div>
      ) : result.columns && result.columns.length > 0 ? (
        <div className="sqlite-table-container">
          <table className="sqlite-grid-table">
            <thead>
              <tr>
                <th style={{ width: 40, textAlign: 'center' }}>#</th>
                {result.columns.map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.values.length === 0 ? (
                <tr>
                  <td colSpan={result.columns.length + 1} style={{ textAlign: 'center', padding: '24px 12px', color: '#64748B' }}>
                    La consulta no devolvió filas.
                  </td>
                </tr>
              ) : (
                result.values.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    <td className="sqlite-row-index-td">{rowIdx + 1}</td>
                    {row.map((val, colIdx) => (
                      <td key={colIdx}>
                        {val === null || val === undefined ? (
                          <span className="sqlite-null-tag">NULL</span>
                        ) : typeof val === 'number' ? (
                          <span style={{ fontWeight: 700, color: '#0369A1' }}>{val}</span>
                        ) : (
                          String(val)
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="sqlite-empty-results" style={{ padding: '35px 20px' }}>
          <CheckCircle2 size={26} className="text-emerald-500 mb-2" />
          <p className="text-slate-800 font-bold text-sm">Instrucción ejecutada con éxito</p>
          {result.rowsAffected > 0 && (
            <p className="text-xs text-slate-500 mt-1">{result.rowsAffected} fila(s) afectada(s) en la base de datos.</p>
          )}
        </div>
      )}
    </div>
  );
};
