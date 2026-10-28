import React, { useState, useRef, useMemo } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Plus,
  X,
  FileCode2
} from 'lucide-react';
import { splitSqlStatements } from '../../services/sqliteService';

export interface QueryTab {
  id: string;
  title: string;
  sql: string;
}

interface SqlEditorProps {
  tabs: QueryTab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
  value: string;
  onChange: (val: string) => void;
  onExecuteStatement: (sql?: string) => void;
  onExecuteAll: (sql?: string) => void;
  onSelectionChange?: (selectedSql: string) => void;
  isRunning?: boolean;
}

const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'UPDATE', 'DELETE',
  'CREATE', 'TABLE', 'DROP', 'ALTER', 'JOIN', 'INNER', 'LEFT', 'RIGHT',
  'OUTER', 'CROSS', 'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT',
  'OFFSET', 'AND', 'OR', 'NOT', 'NULL', 'PRIMARY', 'KEY', 'FOREIGN',
  'REFERENCES', 'CHECK', 'DEFAULT', 'AUTOINCREMENT', 'INTEGER', 'TEXT',
  'REAL', 'BLOB', 'BOOLEAN', 'NUMERIC', 'VARCHAR', 'AS', 'VALUES',
  'SET', 'DISTINCT', 'IN', 'BETWEEN', 'LIKE', 'IS', 'CASE', 'WHEN',
  'THEN', 'ELSE', 'END', 'BEGIN', 'TRANSACTION', 'COMMIT', 'ROLLBACK',
  'VIEW', 'INDEX', 'UNION', 'ALL', 'EXISTS', 'COUNT', 'AVG', 'SUM',
  'MIN', 'MAX', 'ROUND', 'IF', 'REPLACE', 'CASCADE', 'RESTRICT', 'PRAGMA',
  'TRIGGER', 'BEFORE', 'AFTER', 'FOR', 'EACH', 'ROW', 'UNIQUE', 'DESC', 'ASC',
  'SHOW', 'DATABASE', 'DATABASES', 'TRUNCATE'
]);

// Resaltador de sintaxis SQL con palabras reservadas en azul
function highlightSql(code: string): string {
  if (!code) return '&nbsp;';

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const tokenRegex = /(--[^\n]*|\/\*[\s\S]*?\*\/|'(?:''|[^'])*'|"(?:""|[^"])*"|\b[a-zA-Z_][a-zA-Z0-9_]*\b|\b\d+(?:\.\d+)?\b|[^\s\w]+|\s+)/g;

  let html = '';
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(code)) !== null) {
    const token = match[0];

    if (token.startsWith('--') || token.startsWith('/*')) {
      // Comentarios en gris suave
      html += `<span style="color: #94A3B8; font-style: italic;">${escapeHtml(token)}</span>`;
    } else if (token.startsWith("'") || token.startsWith('"')) {
      // Cadenas de texto en verde
      html += `<span style="color: #16A34A;">${escapeHtml(token)}</span>`;
    } else if (/^\d+(\.\d+)?$/.test(token)) {
      // Números en ámbar
      html += `<span style="color: #D97706;">${token}</span>`;
    } else if (SQL_KEYWORDS.has(token.toUpperCase())) {
      // PALABRAS RESERVADAS SQL EN AZUL DESTACADO (#0284C7)
      // Mantiene peso normal para no desfasar el cursor respecto al textarea
      html += `<span style="color: #0284C7;">${escapeHtml(token)}</span>`;
    } else {
      // Identificadores y símbolos normales
      html += `<span style="color: #0F172A;">${escapeHtml(token)}</span>`;
    }
  }

  // Si termina con salto de línea, agregar <br /> para que la última línea vacía ocupe altura exacta en <pre>
  if (code.endsWith('\n')) {
    html += '<br />';
  }

  return html;
}

/**
 * Obtiene la sentencia SQL en la posición del cursor o retorna todo el código si es única
 */
function getStatementAtCursor(sql: string, cursorOffset: number): string {
  if (!sql.trim()) return '';
  const statements = splitSqlStatements(sql);
  if (statements.length <= 1) return sql.trim();

  let searchStart = 0;
  for (const stmt of statements) {
    const idx = sql.indexOf(stmt, searchStart);
    if (idx !== -1) {
      const stmtEnd = idx + stmt.length;
      if (cursorOffset >= idx && cursorOffset <= stmtEnd + 1) {
        return stmt.trim();
      }
      searchStart = stmtEnd;
    }
  }
  return statements[statements.length - 1]?.trim() || sql.trim();
}

export const SqlEditor: React.FC<SqlEditorProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onAddTab,
  onCloseTab,
  value,
  onChange,
  onExecuteStatement,
  onExecuteAll,
  onSelectionChange,
  isRunning = false
}) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sincronizar scroll entre el textarea transparente, la capa de resaltado y los números de línea
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.currentTarget.scrollTop;
      highlightRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Monitorear selección de texto para permitir ejecutar solo la parte resaltada
  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    if (target.selectionStart !== target.selectionEnd) {
      const selected = value.substring(target.selectionStart, target.selectionEnd).trim();
      onSelectionChange?.(selected);
    } else {
      onSelectionChange?.('');
    }
  };

  // Atajos de teclado:
  // Ctrl + Enter: Ejecutar sentencia actual o texto seleccionado
  // Shift + Ctrl + Enter: Ejecutar todo el script
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (isRunning || e.repeat) return;

      const textarea = textareaRef.current;
      const start = textarea?.selectionStart ?? 0;
      const end = textarea?.selectionEnd ?? 0;
      const hasSelection = start !== end;
      const selected = hasSelection ? value.substring(start, end).trim() : '';

      if (e.shiftKey) {
        onExecuteAll(value);
      } else {
        if (selected) {
          onExecuteStatement(selected);
        } else {
          const stmt = getStatementAtCursor(value, start);
          onExecuteStatement(stmt || value);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Código con formato coloreado (palabras clave en azul)
  const highlightedHtml = useMemo(() => highlightSql(value), [value]);

  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 6) }, (_, i) => i + 1);

  return (
    <div className="sqlite-editor-card">
      {/* Barra superior de pestañas de consulta (Query 1, Query 2, +) */}
      <div className="sqlite-tabs-bar">
        <div className="sqlite-tabs-list">
          {tabs.map((t) => {
            const isActive = t.id === activeTabId;
            return (
              <div
                key={t.id}
                className={`sqlite-tab-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectTab(t.id)}
              >
                <FileCode2 size={13} className={isActive ? 'text-sky-600' : 'text-slate-500'} />
                <span>{t.title}</span>
                {tabs.length > 1 && (
                  <button
                    type="button"
                    className="sqlite-tab-close-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(t.id);
                    }}
                    title="Cerrar pestaña"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            );
          })}

          <button
            type="button"
            className="sqlite-add-tab-btn"
            onClick={onAddTab}
            title="Nueva consulta"
          >
            <Plus size={13} />
          </button>
        </div>

        {/* Acciones auxiliares de edición */}
        <div className="sqlite-editor-actions-right">
          <button
            type="button"
            className="sqlite-editor-mini-btn"
            onClick={handleCopy}
            title="Copiar código SQL"
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          <button
            type="button"
            className="sqlite-editor-mini-btn text-red-600 hover:bg-red-50"
            onClick={() => {
              onChange('');
              onSelectionChange?.('');
            }}
            title="Limpiar texto"
          >
            <RotateCcw size={12} />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* Editor con números de línea y resaltado de palabras clave en azul */}
      <div className="sqlite-code-area">
        <div
          ref={lineNumbersRef}
          className="sqlite-line-numbers"
          aria-hidden="true"
        >
          {lineNumbers.map((n) => (
            <div key={n} style={{ height: '22px', lineHeight: '22px' }}>{n}</div>
          ))}
        </div>

        {/* Contenedor superpuesto para sintaxis coloreada en vivo */}
        <div className="sqlite-editor-text-wrapper">
          {/* Capa de fondo con sintaxis coloreada en azul */}
          <pre
            ref={highlightRef}
            aria-hidden="true"
            className="sqlite-code-shared sqlite-code-pre"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />

          {/* Textarea frontal con texto transparente y cursor alineado al píxel */}
          <textarea
            ref={textareaRef}
            className="sqlite-code-shared sqlite-code-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            onSelect={handleSelect}
            onKeyUp={handleSelect}
            onMouseUp={handleSelect}
            placeholder="-- Escribe tu consulta SQL aquí"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            disabled={isRunning}
          />
        </div>
      </div>
    </div>
  );
};
