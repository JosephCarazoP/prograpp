import React, { useState, useEffect, useRef } from 'react';
import { SqliteQueryResult } from '../../types/sqliteLab';
import { AlertTriangle, Check, CheckCircle2, Clock, Copy, Hash, TableProperties } from 'lucide-react';

export type TableSelection =
  | { type: 'cell'; row: number; col: number }
  | { type: 'row'; row: number }
  | { type: 'col'; col: number }
  | null;

interface ResultsTableProps {
  result: SqliteQueryResult | null;
  isRunning?: boolean;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ result, isRunning = false }) => {
  const [selection, setSelection] = useState<TableSelection>(null);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reiniciar selección al ejecutar una nueva consulta
  useEffect(() => {
    setSelection(null);
  }, [result]);

  const copyToClipboard = (text: string, label: string) => {
    if (!text && text !== '0') return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedToast(`¡${label} copiado!`);
      setTimeout(() => setCopiedToast(null), 2000);
    }).catch(() => {
      // Fallback si la API de clipboard falla
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedToast(`¡${label} copiado!`);
        setTimeout(() => setCopiedToast(null), 2000);
      } catch (e) {}
    });
  };

  const handleCopySelection = () => {
    if (!result || !selection) return;

    if (selection.type === 'cell') {
      const val = result.values[selection.row]?.[selection.col];
      const strVal = val === null || val === undefined ? 'NULL' : String(val);
      copyToClipboard(strVal, 'Valor');
    } else if (selection.type === 'row') {
      const rowVals = result.values[selection.row];
      if (rowVals) {
        const text = rowVals.map(v => (v === null || v === undefined ? 'NULL' : String(v))).join('\t');
        copyToClipboard(text, 'Fila');
      }
    } else if (selection.type === 'col') {
      const colVals = result.values.map(r => {
        const v = r[selection.col];
        return v === null || v === undefined ? 'NULL' : String(v);
      });
      copyToClipboard(colVals.join('\n'), 'Columna');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!result || !result.values || result.values.length === 0) return;

    // Atajo Ctrl+C / Cmd+C para copiar la celda o fila seleccionada
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
      if (selection) {
        e.preventDefault();
        handleCopySelection();
      }
      return;
    }

    if (e.key === 'Escape') {
      setSelection(null);
      return;
    }

    // Navegación con flechas en la cuadrícula estilo SQL Browser
    if (selection?.type === 'cell') {
      const maxRows = result.values.length;
      const maxCols = result.columns.length;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelection({ type: 'cell', row: Math.max(0, selection.row - 1), col: selection.col });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelection({ type: 'cell', row: Math.min(maxRows - 1, selection.row + 1), col: selection.col });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelection({ type: 'cell', row: selection.row, col: Math.max(0, selection.col - 1) });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelection({ type: 'cell', row: selection.row, col: Math.min(maxCols - 1, selection.col + 1) });
      }
    } else if (selection?.type === 'row') {
      const maxRows = result.values.length;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelection({ type: 'row', row: Math.max(0, selection.row - 1) });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelection({ type: 'row', row: Math.min(maxRows - 1, selection.row + 1) });
      }
    } else if (selection?.type === 'col') {
      const maxCols = result.columns.length;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelection({ type: 'col', col: Math.max(0, selection.col - 1) });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelection({ type: 'col', col: Math.min(maxCols - 1, selection.col + 1) });
      }
    }
  };

  return (
    <div className="sqlite-results-card">
      {/* Header bar: RESULTADOS */}
      <div className="sqlite-results-header">
        <div className="sqlite-results-title">
          <TableProperties size={15} />
          <span>RESULTADOS</span>
        </div>

        <div className="sqlite-results-meta">
          {copiedToast && (
            <span className="sqlite-meta-badge" style={{ background: '#DCFCE7', color: '#166534', fontWeight: 800 }}>
              <Check size={12} style={{ display: 'inline', marginRight: 4 }} />
              {copiedToast}
            </span>
          )}

          {selection && (
            <button
              type="button"
              className="sqlite-table-copy-btn"
              onClick={handleCopySelection}
              title="Copiar contenido seleccionado al portapapeles (Ctrl+C)"
            >
              <Copy size={12} />
              <span>
                {selection.type === 'cell'
                  ? 'Copiar celda'
                  : selection.type === 'row'
                  ? `Copiar fila #${selection.row + 1}`
                  : `Copiar columna`}
              </span>
            </button>
          )}

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
        <div
          ref={containerRef}
          className="sqlite-table-container"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          title="Usa las flechas del teclado para navegar y Ctrl+C para copiar"
        >
          <table className="sqlite-grid-table">
            <thead>
              <tr>
                {/* Esquina superior izquierda: # */}
                <th
                  className="sqlite-th-corner"
                  title="Haga clic para deseleccionar"
                  onClick={() => setSelection(null)}
                >
                  #
                </th>
                {result.columns.map((col, colIdx) => {
                  const isColSelected = selection?.type === 'col' && selection.col === colIdx;
                  const isColActive = selection?.type === 'cell' && selection.col === colIdx;
                  return (
                    <th
                      key={colIdx}
                      className={`${isColSelected ? 'sqlite-th-selected' : ''} ${isColActive ? 'sqlite-th-active' : ''}`}
                      title={`Columna "${col}" (clic para seleccionar toda la columna)`}
                      onClick={() => setSelection({ type: 'col', col: colIdx })}
                    >
                      {col}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {result.values.length === 0 ? (
                <tr>
                  <td
                    colSpan={result.columns.length + 1}
                    style={{ textAlign: 'center', padding: '28px 12px', color: '#64748B', fontWeight: 600 }}
                  >
                    La consulta no devolvió filas.
                  </td>
                </tr>
              ) : (
                result.values.map((row, rowIdx) => {
                  const isRowSelected = selection?.type === 'row' && selection.row === rowIdx;
                  const isRowActive = selection?.type === 'cell' && selection.row === rowIdx;
                  return (
                    <tr
                      key={rowIdx}
                      className={`${isRowSelected ? 'sqlite-row-selected' : ''} ${isRowActive ? 'sqlite-row-active' : ''}`}
                    >
                      {/* Índice de fila pegajoso a la izquierda */}
                      <td
                        className={`sqlite-row-index-td ${isRowSelected ? 'sqlite-row-index-selected' : ''} ${isRowActive ? 'sqlite-row-index-active' : ''}`}
                        title={`Fila ${rowIdx + 1} (clic para seleccionar toda la fila)`}
                        onClick={() => setSelection({ type: 'row', row: rowIdx })}
                      >
                        {rowIdx + 1}
                      </td>

                      {/* Celdas de datos con soporte de selección estilo SQL Browser */}
                      {row.map((val, colIdx) => {
                        const isCellActive =
                          selection?.type === 'cell' && selection.row === rowIdx && selection.col === colIdx;
                        const isColSelected = selection?.type === 'col' && selection.col === colIdx;
                        const isColActive = selection?.type === 'cell' && selection.col === colIdx;

                        return (
                          <td
                            key={colIdx}
                            className={`sqlite-data-cell ${isCellActive ? 'sqlite-cell-active' : ''} ${isColSelected ? 'sqlite-col-selected' : ''} ${isColActive ? 'sqlite-col-active' : ''}`}
                            onClick={() => setSelection({ type: 'cell', row: rowIdx, col: colIdx })}
                            onDoubleClick={() => {
                              const strVal = val === null || val === undefined ? 'NULL' : String(val);
                              copyToClipboard(strVal, 'Valor');
                            }}
                            title={
                              val === null || val === undefined
                                ? 'NULL (Doble clic para copiar)'
                                : `${String(val)} (Doble clic para copiar)`
                            }
                          >
                            {val === null || val === undefined ? (
                              <span className="sqlite-null-tag">NULL</span>
                            ) : typeof val === 'number' ? (
                              <span style={{ fontWeight: 700, color: '#0369A1' }}>{val}</span>
                            ) : (
                              String(val)
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
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
