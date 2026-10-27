import React, { useState, useRef, useMemo } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Layers,
  Plus,
  X,
  FileCode2
} from 'lucide-react';

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
  onExecuteStatement: () => void;
  onExecuteAll: () => void;
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

const SQL_TEMPLATES = [
  {
    label: 'CREATE TABLE con PK y FK',
    code: `CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS articulos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  precio REAL CHECK(precio >= 0),
  categoria_id INTEGER,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
);`
  },
  {
    label: 'INSERT múltiple',
    code: `INSERT INTO articulos (nombre, precio, categoria_id) VALUES
  ('Teclado Pro', 49.99, 1),
  ('Mouse Ergonómico', 29.50, 1),
  ('Pad XXL', 15.00, 1);`
  },
  {
    label: 'SELECT con INNER JOIN',
    code: `SELECT 
  a.id,
  a.nombre AS articulo,
  a.precio,
  c.nombre AS categoria
FROM articulos a
INNER JOIN categorias c ON a.categoria_id = c.id
ORDER BY a.precio DESC;`
  },
  {
    label: 'GROUP BY y Agregaciones (SUM, AVG)',
    code: `SELECT 
  c.nombre AS categoria,
  COUNT(a.id) AS total_articulos,
  ROUND(AVG(a.precio), 2) AS precio_promedio,
  MAX(a.precio) AS precio_maximo
FROM categorias c
LEFT JOIN articulos a ON c.id = a.categoria_id
GROUP BY c.id
HAVING total_articulos > 0;`
  },
  {
    label: 'Transacción ACID (BEGIN / COMMIT)',
    code: `BEGIN TRANSACTION;

UPDATE articulos SET precio = precio * 1.10 WHERE categoria_id = 1;
-- Confirmar los cambios:
COMMIT;
-- Si algo falla usar: ROLLBACK;`
  },
  {
    label: 'Crear VISTA (CREATE VIEW)',
    code: `CREATE VIEW IF NOT EXISTS vista_catalogo AS
SELECT 
  a.id,
  a.nombre,
  a.precio,
  c.nombre AS categoria
FROM articulos a
JOIN categorias c ON a.categoria_id = c.id;`
  }
];

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
  isRunning = false
}) => {
  const [copied, setCopied] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
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

  // Atajos de teclado:
  // Ctrl + Enter: Ejecutar sentencia actual o texto seleccionado
  // Shift + Ctrl + Enter: Ejecutar todo el script
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        onExecuteAll();
      } else {
        onExecuteStatement();
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

  const insertTemplate = (templateCode: string) => {
    const nextVal = value.trim() ? `${value}\n\n${templateCode}` : templateCode;
    onChange(nextVal);
    setShowTemplates(false);
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
          <div className="relative">
            <button
              type="button"
              className="sqlite-editor-mini-btn"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              <Sparkles size={12} className="text-amber-500" />
              <span>Plantillas</span>
              <ChevronDown size={11} />
            </button>

            {showTemplates && (
              <div className="sqlite-dropdown-menu" style={{ width: 250 }}>
                <div style={{ padding: '6px 12px', fontSize: '0.7rem', fontWeight: 900, background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
                  PLANTILLAS SQLITE
                </div>
                {SQL_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="sqlite-dropdown-item"
                    onClick={() => insertTemplate(tmpl.code)}
                  >
                    <Layers size={13} className="text-sky-600" />
                    <span>{tmpl.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

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
            onClick={() => onChange('')}
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
