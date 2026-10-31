import React, { useState, useEffect, useRef } from 'react';
import { SqliteExercise, SqliteQueryResult } from '../../types/sqliteLab';
import { sqliteService } from '../../services/sqliteService';
import { sqliteStorageService } from '../../services/sqliteStorageService';
import { CodeAutocomplete } from '../common/CodeAutocomplete';
import { SQL_COMPLETIONS } from '../../data/sqlCompletions';
import { useCodeAutocomplete } from '../../hooks/useCodeAutocomplete';
import {
  MousePointerClick,
  Code2,
  CheckCircle2,
  AlertCircle,
  Play,
  HelpCircle,
  Database,
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';

interface ButtonProgrammingLabProps {
  exercise: SqliteExercise;
  storageKey: string;
  onDatabaseModified: () => void;
}

export const ButtonProgrammingLab: React.FC<ButtonProgrammingLabProps> = ({
  exercise,
  storageKey,
  onDatabaseModified
}) => {
  const buttonConfig = exercise.buttonConfig;
  const buttons = buttonConfig?.buttons || [];
  const fields = buttonConfig?.fields || [];

  // Estado del formulario visual
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    fields.forEach(f => {
      init[f.name] = f.defaultValue !== undefined ? f.defaultValue : '';
    });
    return init;
  });

  // Botón actualmente seleccionado para edición de código
  const [selectedButtonId, setSelectedButtonId] = useState<string>(
    buttons.length > 0 ? buttons[0].id : ''
  );

  // Mapa de código SQL por botón escrito por el alumno
  const [buttonSqlMap, setButtonSqlMap] = useState<Record<string, string>>(() => {
    const saved = sqliteStorageService.loadButtonSqlMap(storageKey);
    const initialMap: Record<string, string> = { ...saved };
    buttons.forEach(btn => {
      if (!initialMap[btn.id] && btn.defaultSqlTemplate) {
        initialMap[btn.id] = btn.defaultSqlTemplate;
      }
    });
    return initialMap;
  });

  // Resultado de la última acción ejecutada al pulsar un botón
  const [lastActionResult, setLastActionResult] = useState<{
    buttonLabel: string;
    result: SqliteQueryResult;
  } | null>(null);

  // Registros en vivo de la tabla para visualización inmediata
  const [liveRows, setLiveRows] = useState<{ columns: string[]; values: any[][] } | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Guardar en storage cada vez que cambia el código de los botones
  useEffect(() => {
    sqliteStorageService.saveButtonSqlMap(storageKey, buttonSqlMap);
  }, [buttonSqlMap, storageKey]);

  // Cargar datos actuales de la tabla asociada
  const refreshLiveRows = () => {
    try {
      const entity = buttonConfig?.entityName.toLowerCase() || 'productos';
      const res = sqliteService.execute(`SELECT * FROM ${entity} ORDER BY id DESC LIMIT 50;`);
      if (!res.error) {
        setLiveRows({ columns: res.columns, values: res.values });
      }
    } catch (e) {
      console.warn('Error actualizando filas de la tabla:', e);
    }
  };

  useEffect(() => {
    refreshLiveRows();
  }, [exercise.id]);

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSqlChange = (buttonId: string, sql: string) => {
    setButtonSqlMap(prev => ({ ...prev, [buttonId]: sql }));
  };

  // Ejecución real del botón al ser presionado en el formulario de la aplicación
  const handleButtonClick = (buttonId: string) => {
    const btn = buttons.find(b => b.id === buttonId);
    if (!btn) return;

    const sqlCode = (buttonSqlMap[buttonId] || '').trim();
    if (!sqlCode) {
      setLastActionResult({
        buttonLabel: btn.label,
        result: {
          columns: [],
          values: [],
          rowsAffected: 0,
          executionTimeMs: 0,
          error: `El botón "${btn.label}" aún no tiene código SQL programado. Escribe la consulta en el editor derecho.`
        }
      });
      return;
    }

    // Ejecutar con enlace de parámetros
    const result = sqliteService.executeParameterized(sqlCode, formData);
    setLastActionResult({
      buttonLabel: btn.label,
      result
    });

    // Si fue un SELECT que devolvió una fila específica, podemos autocompletar el formulario
    if (result.columns.length > 0 && result.values.length === 1) {
      const row = result.values[0];
      const updated: Record<string, any> = { ...formData };
      result.columns.forEach((colName, idx) => {
        if (updated[colName] !== undefined) {
          updated[colName] = row[idx];
        }
      });
      setFormData(updated);
    }

    refreshLiveRows();
    onDatabaseModified();
  };

  const currentButton = buttons.find(b => b.id === selectedButtonId) || buttons[0];
  const currentSql = currentButton ? buttonSqlMap[currentButton.id] || '' : '';

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autocomplete = useCodeAutocomplete({
    dictionary: SQL_COMPLETIONS,
    value: currentSql,
    onChange: (newVal) => {
      if (currentButton) {
        handleSqlChange(currentButton.id, newVal);
      }
    },
    textareaRef,
    theme: 'sql'
  });

  return (
    <div className="sqlite-btn-lab-root">
      {/* Banner explicativo del modo */}
      <div className="sqlite-btn-lab-banner">
        <div className="flex items-center gap-2">
          <MousePointerClick size={20} className="text-sky-400" />
          <div>
            <h3 className="font-bold text-sm text-slate-100">Modo: Programar Botones de Interfaz CRUD</h3>
            <p className="text-xs text-slate-400">
              Cada botón del formulario ejecutará el código SQL que escribas en el panel derecho. Usa parámetros como{' '}
              {fields.map((f, i) => (
                <span key={f.name}>
                  <code>:{f.name}</code>{i < fields.length - 1 ? ', ' : ''}
                </span>
              ))}{' '}
              para enlazar los valores del formulario de forma segura.
            </p>
          </div>
        </div>
      </div>

      {/* Panel interactivo: Formulario (Izquierda) + Editor del Botón (Derecha) */}
      <div className="sqlite-btn-lab-grid">
        {/* LADO IZQUIERDO: Interfaz de la Aplicación del Estudiante */}
        <div className="sqlite-btn-form-panel">
          <div className="sqlite-btn-panel-header">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-300">
              Formulario de la Aplicación ({buttonConfig?.entityName || 'Registro'})
            </span>
          </div>

          <div className="sqlite-btn-form-body">
            {/* Campos de entrada */}
            <div className="sqlite-form-fields-grid">
              {fields.map(field => (
                <div key={field.name} className="sqlite-form-group">
                  <label className="sqlite-form-label">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                    <code className="sqlite-param-tag">:{field.name}</code>
                  </label>
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    className="sqlite-form-input"
                    placeholder={field.placeholder || ''}
                    value={formData[field.name] !== undefined ? formData[field.name] : ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Botones de acción del formulario */}
            <div className="sqlite-form-buttons-section">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                Botones de Acción (Haz clic para ejecutar tu SQL):
              </span>
              <div className="sqlite-form-buttons-grid">
                {buttons.map(btn => {
                  const hasCode = Boolean((buttonSqlMap[btn.id] || '').trim());
                  const isCurrentlyEditing = btn.id === selectedButtonId;
                  return (
                    <div key={btn.id} className="relative group">
                      <button
                        type="button"
                        className={`sqlite-crud-action-btn ${btn.actionType} ${isCurrentlyEditing ? 'active-edit' : ''}`}
                        onClick={() => handleButtonClick(btn.id)}
                      >
                        <Play size={13} fill="currentColor" />
                        <span>{btn.label}</span>
                        {!hasCode && (
                          <span className="sqlite-unprogrammed-dot" title="Sin código programado" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resultado de la acción */}
            {lastActionResult && (
              <div className={`sqlite-action-feedback ${lastActionResult.result.error ? 'error' : 'success'}`}>
                <div className="flex items-center gap-2">
                  {lastActionResult.result.error ? (
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                  ) : (
                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                  )}
                  <div>
                    <strong className="text-xs font-bold block">
                      Acción: {lastActionResult.buttonLabel}
                    </strong>
                    <span className="text-xs">
                      {lastActionResult.result.error ? (
                        lastActionResult.result.error
                      ) : lastActionResult.result.columns.length > 0 ? (
                        `Consulta completada. Se devolvieron ${lastActionResult.result.values.length} registro(s).`
                      ) : (
                        `Instrucción ejecutada con éxito. Filas afectadas: ${lastActionResult.result.rowsAffected}`
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LADO DERECHO: Editor de Código del Botón */}
        <div className="sqlite-btn-editor-panel">
          <div className="sqlite-btn-panel-header">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-sky-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-slate-300">
                Programar SQL del Botón
              </span>
            </div>

            {/* Selector de botón a programar */}
            <select
              className="sqlite-btn-select-dropdown"
              value={selectedButtonId}
              onChange={(e) => setSelectedButtonId(e.target.value)}
            >
              {buttons.map(b => (
                <option key={b.id} value={b.id}>
                  {b.label} ({b.actionType.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {currentButton && (
            <div className="sqlite-btn-editor-body">
              {/* Información y descripción del botón activo */}
              <div className="sqlite-btn-meta-box">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">{currentButton.label}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{currentButton.description}</p>
                  </div>
                  {currentButton.hint && (
                    <button
                      type="button"
                      className="sqlite-hint-toggle-btn"
                      onClick={() => setShowHint(!showHint)}
                    >
                      <HelpCircle size={13} />
                      <span>{showHint ? 'Ocultar Pista' : 'Ver Pista'}</span>
                    </button>
                  )}
                </div>

                {showHint && currentButton.hint && (
                  <div className="sqlite-btn-hint-card mt-2">
                    <Sparkles size={14} className="text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-amber-300 block">Sugerencia SQL:</span>
                      <code className="text-xs text-amber-100">{currentButton.hint}</code>
                    </div>
                  </div>
                )}

                <div className="sqlite-btn-params-list mt-2">
                  <span className="text-[11px] text-slate-400 font-semibold mr-1">Parámetros disponibles:</span>
                  {fields.map(f => (
                    <button
                      key={f.name}
                      type="button"
                      className="sqlite-param-chip"
                      onClick={() => {
                        const insertion = `:${f.name}`;
                        handleSqlChange(currentButton.id, currentSql ? `${currentSql} ${insertion}` : insertion);
                      }}
                      title={`Haz clic para insertar :${f.name}`}
                    >
                      :{f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor de texto SQL para el botón */}
              <div className="sqlite-btn-code-area relative">
                <textarea
                  ref={textareaRef}
                  className="sqlite-btn-textarea"
                  value={currentSql}
                  onChange={(e) => {
                    handleSqlChange(currentButton.id, e.target.value);
                    autocomplete.checkAutocomplete(e.target.value);
                  }}
                  onClick={() => autocomplete.checkAutocomplete()}
                  onKeyDown={(e) => {
                    if (autocomplete.handleKeyDown(e)) {
                      return;
                    }

                    const PAIRS: Record<string, string> = {
                      "'": "'",
                      '"': '"',
                      '(': ')',
                      '[': ']'
                    };

                    const textarea = textareaRef.current;
                    if (!textarea) return;

                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;

                    if (["'", '"', ')', ']'].includes(e.key) && start === end && currentSql[start] === e.key) {
                      e.preventDefault();
                      textarea.selectionStart = textarea.selectionEnd = start + 1;
                      return;
                    }

                    if (PAIRS[e.key] && !e.ctrlKey && !e.metaKey && !e.altKey) {
                      e.preventDefault();
                      const closeChar = PAIRS[e.key];
                      const selectedText = currentSql.substring(start, end);
                      const newSql = currentSql.substring(0, start) + e.key + selectedText + closeChar + currentSql.substring(end);
                      handleSqlChange(currentButton.id, newSql);

                      setTimeout(() => {
                        if (textareaRef.current) {
                          textareaRef.current.selectionStart = start + 1;
                          textareaRef.current.selectionEnd = start + 1 + selectedText.length;
                        }
                      }, 0);
                      return;
                    }

                    if (e.key === 'Backspace' && start === end && start > 0) {
                      const prevChar = currentSql[start - 1];
                      const nextChar = currentSql[start];
                      if (PAIRS[prevChar] && PAIRS[prevChar] === nextChar) {
                        e.preventDefault();
                        const newSql = currentSql.substring(0, start - 1) + currentSql.substring(start + 1);
                        handleSqlChange(currentButton.id, newSql);
                        setTimeout(() => {
                          if (textareaRef.current) {
                            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start - 1;
                          }
                        }, 0);
                        return;
                      }
                    }
                  }}
                  onKeyUp={(e) => {
                    if (!['ArrowDown', 'ArrowUp', 'Tab', 'Enter', 'Escape'].includes(e.key)) {
                      autocomplete.checkAutocomplete();
                    }
                  }}
                  placeholder={`-- Escribe aquí la sentencia SQL para "${currentButton.label}"\n-- Ejemplo: ${currentButton.hint || 'INSERT / UPDATE / SELECT / DELETE'}`}
                  spellCheck={false}
                />

                {/* Menú flotante de autocompletado y recomendaciones SQL estilo NetBeans */}
                <CodeAutocomplete
                  items={autocomplete.filteredItems}
                  selectedIndex={autocomplete.selectedIndex}
                  onSelect={autocomplete.handleSelect}
                  onHoverItem={autocomplete.setSelectedIndex}
                  position={autocomplete.coords}
                  visible={autocomplete.isOpen}
                  onClose={autocomplete.close}
                  filterPrefix={autocomplete.currentPrefix}
                  theme="sql"
                />
              </div>

              {/* Barra de prueba rápida */}
              <div className="sqlite-btn-editor-footer">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Info size={13} />
                  Guarda automáticamente al escribir.
                </span>
                <button
                  type="button"
                  className="sqlite-test-button-btn"
                  onClick={() => handleButtonClick(currentButton.id)}
                  disabled={!currentSql.trim()}
                >
                  <Play size={13} fill="currentColor" />
                  <span>Probar Este Botón</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECCIÓN INFERIOR: Visualizador de la Tabla en Vivo */}
      <div className="sqlite-btn-live-table-section">
        <div className="sqlite-btn-live-header">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-emerald-400" />
            <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
              Registros en la Base de Datos ({buttonConfig?.entityName || 'Entidad'})
            </span>
          </div>
          <button
            type="button"
            className="sqlite-icon-btn"
            onClick={refreshLiveRows}
            title="Refrescar datos de la tabla"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {liveRows && liveRows.values.length > 0 ? (
          <div className="sqlite-table-wrapper max-h-56">
            <table className="sqlite-data-table">
              <thead>
                <tr>
                  <th className="sqlite-th-index">#</th>
                  {liveRows.columns.map((col, idx) => (
                    <th key={idx} className="sqlite-th-col">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {liveRows.values.map((row, rowIdx) => (
                  <tr key={rowIdx} className="sqlite-tr-row">
                    <td className="sqlite-td-index">{rowIdx + 1}</td>
                    {row.map((val, colIdx) => (
                      <td key={colIdx} className="sqlite-td-val">
                        {val === null || val === undefined ? (
                          <span className="sqlite-null-tag">NULL</span>
                        ) : typeof val === 'number' ? (
                          <span className="sqlite-number-val">{val}</span>
                        ) : (
                          String(val)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-400">
            No hay registros almacenados aún. Completa el formulario y pulsa el botón correspondiente para insertar datos.
          </div>
        )}
      </div>
    </div>
  );
};
