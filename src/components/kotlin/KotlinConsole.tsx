import React, { useState } from 'react';
import {
  Terminal,
  Loader2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Flame,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';
import { KotlinRunResult } from '../../types/kotlinLab';

interface KotlinConsoleProps {
  result: KotlinRunResult | null;
  isRunning: boolean;
  args: string;
  onArgsChange: (args: string) => void;
  onClear: () => void;
}

export const KotlinConsole: React.FC<KotlinConsoleProps> = ({
  result,
  isRunning,
  args,
  onArgsChange,
  onClear
}) => {
  const [showArgsInput, setShowArgsInput] = useState(false);

  return (
    <div className="kt-console-card">
      {/* ═══ BARRA SUPERIOR DE LA CONSOLA ═══ */}
      <div className="kt-console-topbar">
        <div className="kt-console-topbar-left">
          <div className="kt-console-icon-badge">
            <Terminal size={15} />
          </div>
          <span className="kt-console-title">Consola de Salida</span>

          {/* Estado de ejecución */}
          {isRunning ? (
            <div className="kt-console-badge running">
              <Loader2 size={13} className="animate-spin" />
              <span>Compilando...</span>
            </div>
          ) : result ? (
            result.success ? (
              <div className="kt-console-badge success">
                <CheckCircle2 size={13} />
                <span>Ejecutado en {result.executionTimeMs} ms</span>
              </div>
            ) : (
              <div className="kt-console-badge error">
                <AlertTriangle size={13} />
                <span>Error detectado</span>
              </div>
            )
          ) : (
            <div className="kt-console-badge ready">
              <Cpu size={13} />
              <span>Listo para ejecutar</span>
            </div>
          )}
        </div>

        <div className="kt-console-topbar-right">
          {/* Botón para alternar argumentos CLI */}
          <button
            type="button"
            onClick={() => setShowArgsInput(prev => !prev)}
            className={`kt-console-btn-tool ${showArgsInput || args ? 'active' : ''}`}
            title="Configurar argumentos de línea de comandos (args)"
          >
            <span>Args ({args ? '1+' : '0'})</span>
            {showArgsInput ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {/* Botón limpiar */}
          <button
            type="button"
            onClick={onClear}
            className="kt-console-btn-tool"
            title="Limpiar pantalla de la consola"
          >
            <Trash2 size={13} />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* ═══ CAMPO DESPLEGABLE DE ARGUMENTOS CLI (args) ═══ */}
      {showArgsInput && (
        <div className="kt-console-args-bar">
          <label htmlFor="kt-cli-args" className="kt-console-args-label">
            Argumentos de programa (args separados por espacio):
          </label>
          <input
            id="kt-cli-args"
            type="text"
            className="kt-console-args-input"
            value={args}
            onChange={e => onArgsChange(e.target.value)}
            placeholder='Ej: "Byte" 42 --debug'
          />
        </div>
      )}

      {/* ═══ CUERPO DEL TERMINAL ═══ */}
      <div className="kt-console-screen">
        {isRunning ? (
          <div className="kt-console-loading">
            <Loader2 size={28} className="animate-spin text-purple-400" />
            <p className="kt-console-loading-text">
              Enviando código al compilador de Kotlin en la nube...
            </p>
            <span className="kt-console-loading-sub">
              Compilando bytecode para JVM y ejecutando fun main()
            </span>
          </div>
        ) : !result ? (
          <div className="kt-console-empty">
            <div className="kt-console-empty-prompt">
              <span className="text-purple-400 font-bold">$ kotlinc</span> Main.kt -include-runtime -d Main.jar
            </div>
            <div className="kt-console-empty-prompt">
              <span className="text-emerald-400 font-bold">$ java</span> -jar Main.jar
            </div>
            <p className="kt-console-empty-note">
              Presiona el botón <strong className="text-purple-300">"Ejecutar"</strong> o utiliza el atajo{' '}
              <kbd className="kt-kbd-inline">Ctrl + Enter</kbd> para compilar y visualizar la salida de tu programa.
            </p>
          </div>
        ) : (
          <div className="kt-console-output-container">
            {/* 1. ERRORES DE COMPILACIÓN */}
            {result.errors.length > 0 && (
              <div className="kt-console-error-box">
                <div className="kt-console-error-header">
                  <AlertTriangle size={15} />
                  <span>Errores del compilador ({result.errors.length}):</span>
                </div>
                <div className="kt-console-error-list">
                  {result.errors.map((err, idx) => (
                    <div key={idx} className="kt-console-error-item">
                      <span className="kt-console-error-loc">
                        {err.fileName}:{err.line}:{err.column}
                      </span>
                      <span className="kt-console-error-msg">{err.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. EXCEPCIÓN EN TIEMPO DE EJECUCIÓN */}
            {result.exception && (
              <div className="kt-console-exception-box">
                <div className="kt-console-exception-header">
                  <Flame size={15} />
                  <span>Excepción no controlada: {result.exception.fullName}</span>
                </div>
                <div className="kt-console-exception-msg">
                  {result.exception.message || 'Sin mensaje de detalle'}
                </div>
                {result.exception.stackTrace && result.exception.stackTrace.length > 0 && (
                  <div className="kt-console-stacktrace">
                    {result.exception.stackTrace.slice(0, 6).map((st, i) => (
                      <div key={i} className="kt-console-stacktrace-line">
                        at {st.className}.{st.methodName}({st.fileName}:{st.lineNumber})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. SALIDA ESTÁNDAR (STDOUT) */}
            {result.output ? (
              <pre className="kt-console-stdout">{result.output}</pre>
            ) : (
              !result.errors.length &&
              !result.exception && (
                <div className="kt-console-no-output">
                  El programa se ejecutó correctamente sin producir texto en consola (stdout vacío).
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
