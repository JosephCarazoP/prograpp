import React, { useRef, useMemo, useState } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Plus,
  X,
  FileCode2,
  Download,
  AlertCircle
} from 'lucide-react';
import { KotlinFile, KotlinCompilerError } from '../../types/kotlinLab';

interface KotlinEditorProps {
  files: KotlinFile[];
  activeFileId: string;
  onSelectFile: (id: string) => void;
  onAddFile: () => void;
  onCloseFile: (id: string) => void;
  onContentChange: (content: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning?: boolean;
  errors?: KotlinCompilerError[];
  allowMultipleFiles?: boolean;
}

const KOTLIN_KEYWORDS = new Set([
  'package', 'import', 'fun', 'val', 'var', 'class', 'data', 'object', 'interface',
  'abstract', 'open', 'override', 'sealed', 'enum', 'when', 'is', 'in', 'if', 'else',
  'while', 'for', 'do', 'break', 'continue', 'return', 'try', 'catch', 'finally',
  'throw', 'this', 'super', 'null', 'true', 'false', 'typealias', 'suspend', 'inline',
  'companion', 'const', 'lateinit', 'by', 'as', 'private', 'protected', 'public', 'internal'
]);

const KOTLIN_TYPES = new Set([
  'Int', 'String', 'Boolean', 'Double', 'Float', 'Long', 'Short', 'Byte', 'Char',
  'Unit', 'Any', 'Nothing', 'Array', 'List', 'MutableList', 'Map', 'MutableMap',
  'Set', 'MutableSet'
]);

const KOTLIN_BUILTINS = new Set([
  'println', 'print', 'listOf', 'mutableListOf', 'mapOf', 'mutableMapOf',
  'setOf', 'mutableSetOf', 'arrayOf', 'filter', 'map', 'forEach', 'sortedBy',
  'sumOf', 'count', 'run', 'let', 'also', 'apply', 'with', 'copy', 'trim',
  'split', 'uppercase', 'lowercase', 'toInt', 'toDouble', 'toIntOrNull',
  'toDoubleOrNull', 'downTo', 'step'
]);

function highlightKotlin(code: string): string {
  if (!code) return '&nbsp;';

  const escapeHtml = (str: string) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Regex para tokens: comentarios, strings simples y multilínea, palabras, números, anotaciones y símbolos
  const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"""[\s\S]*?"""|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])'|@[a-zA-Z_][a-zA-Z0-9_]*|\b[a-zA-Z_][a-zA-Z0-9_]*\b|\b\d+(?:\.\d+)?[fFL]?\b|[^\s\w]+|\s+)/g;

  let html = '';
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(code)) !== null) {
    const token = match[0];

    if (token.startsWith('//') || token.startsWith('/*')) {
      // Comentarios en gris itálica
      html += `<span style="color: #64748B; font-style: italic;">${escapeHtml(token)}</span>`;
    } else if (token.startsWith('"') || token.startsWith("'")) {
      // Cadenas en verde esmeralda
      html += `<span style="color: #10B981;">${escapeHtml(token)}</span>`;
    } else if (token.startsWith('@')) {
      // Anotaciones en naranja
      html += `<span style="color: #F97316; font-weight: 600;">${escapeHtml(token)}</span>`;
    } else if (/^\d/.test(token)) {
      // Números en ámbar
      html += `<span style="color: #F59E0B;">${token}</span>`;
    } else if (KOTLIN_KEYWORDS.has(token)) {
      // Palabras reservadas en Violeta Kotlin (#A855F7 / #9333EA)
      html += `<span style="color: #9333EA; font-weight: 700;">${escapeHtml(token)}</span>`;
    } else if (KOTLIN_TYPES.has(token)) {
      // Tipos en azul cielo
      html += `<span style="color: #0284C7; font-weight: 600;">${escapeHtml(token)}</span>`;
    } else if (KOTLIN_BUILTINS.has(token)) {
      // Funciones comunes en magenta / rosa
      html += `<span style="color: #E11D48; font-weight: 600;">${escapeHtml(token)}</span>`;
    } else {
      // Identificadores y símbolos en color texto oscuro
      html += `<span style="color: #0F172A;">${escapeHtml(token)}</span>`;
    }
  }

  if (code.endsWith('\n')) {
    html += '<br />';
  }

  return html;
}

export const KotlinEditor: React.FC<KotlinEditorProps> = ({
  files,
  activeFileId,
  onSelectFile,
  onAddFile,
  onCloseFile,
  onContentChange,
  onRun,
  onReset,
  isRunning = false,
  errors = [],
  allowMultipleFiles = true
}) => {
  const activeFile = files.find(f => f.id === activeFileId) || files[0];
  const code = activeFile ? activeFile.content : '';

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);

  // Mapear líneas con errores de compilación
  const errorLines = useMemo(() => {
    const lines = new Set<number>();
    errors.forEach(err => {
      if (err.severity === 'ERROR' && err.fileName === activeFile?.name) {
        lines.add(err.line);
      }
    });
    return lines;
  }, [errors, activeFile?.name]);

  // Sincronizar scroll entre textarea, resaltador y barra de líneas
  const handleScroll = () => {
    if (!textareaRef.current) return;
    const { scrollTop, scrollLeft } = textareaRef.current;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  // Manejar atajos de teclado (Ctrl+Enter para correr, Tab para indentar)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isRunning) {
        onRun();
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = '    '; // 4 espacios estándar en Kotlin

      const newCode = code.substring(0, start) + spaces + code.substring(end);
      onContentChange(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
      }, 0);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback
    }
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile?.name || 'Main.kt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const lineCount = useMemo(() => {
    return Math.max(code.split('\n').length, 1);
  }, [code]);

  const highlightedHtml = useMemo(() => {
    return highlightKotlin(code);
  }, [code]);

  return (
    <div className="kt-editor-card">
      {/* ═══ BARRA DE PESTAÑAS (TABS) DE ARCHIVOS ═══ */}
      <div className="kt-editor-tabs-bar">
        <div className="kt-editor-tabs-list">
          {files.map(file => {
            const isActive = file.id === activeFileId;
            return (
              <button
                key={file.id}
                type="button"
                onClick={() => onSelectFile(file.id)}
                className={`kt-editor-tab ${isActive ? 'active' : ''}`}
              >
                <FileCode2 size={15} className={isActive ? 'text-purple-600' : 'text-slate-400'} />
                <span className="kt-editor-tab-title">{file.name}</span>
                {allowMultipleFiles && files.length > 1 && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={e => {
                      e.stopPropagation();
                      onCloseFile(file.id);
                    }}
                    className="kt-editor-tab-close"
                    title="Cerrar archivo"
                  >
                    <X size={13} />
                  </span>
                )}
              </button>
            );
          })}

          {allowMultipleFiles && (
            <button
              type="button"
              onClick={onAddFile}
              className="kt-editor-tab-add"
              title="Crear nuevo archivo .kt"
            >
              <Plus size={14} />
            </button>
          )}
        </div>

        {/* Acciones del editor */}
        <div className="kt-editor-actions">
          <button
            type="button"
            onClick={handleCopyCode}
            className="kt-editor-action-btn"
            title="Copiar código al portapapeles"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCode}
            className="kt-editor-action-btn"
            title="Descargar archivo .kt"
          >
            <Download size={14} />
            <span>Descargar</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="kt-editor-action-btn reset"
            title="Restablecer código al estado inicial"
          >
            <RotateCcw size={14} />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* ═══ ÁREA DE CÓDIGO CON LÍNEAS Y RESALTADO ═══ */}
      <div className="kt-editor-body">
        {/* Columna de números de línea */}
        <div ref={lineNumbersRef} className="kt-editor-linenumbers" aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => {
            const lineNum = i + 1;
            const hasError = errorLines.has(lineNum);
            return (
              <div
                key={lineNum}
                className={`kt-editor-line-row ${hasError ? 'has-error' : ''}`}
                title={hasError ? `Error en la línea ${lineNum}` : undefined}
              >
                {hasError && <AlertCircle size={10} className="kt-line-error-icon" />}
                <span className="kt-line-num">{lineNum}</span>
              </div>
            );
          })}
        </div>

        {/* Contenedor del código */}
        <div className="kt-editor-code-surface">
          {/* Capa de resaltado (debajo) */}
          <pre
            ref={preRef}
            className="kt-editor-highlight"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />

          {/* Textarea transparente interactivo (arriba) */}
          <textarea
            ref={textareaRef}
            className="kt-editor-textarea"
            value={code}
            onChange={e => onContentChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            placeholder="// Escribe tu código Kotlin aquí..."
          />
        </div>
      </div>

      {/* Barra de estado inferior */}
      <div className="kt-editor-footer">
        <div className="kt-editor-footer-left">
          <span className="kt-footer-pill">Kotlin</span>
          <span className="kt-footer-lines">{lineCount} líneas</span>
          {errors.length > 0 && (
            <span className="kt-footer-errors">
              {errors.length} {errors.length === 1 ? 'advertencia / error' : 'advertencias / errores'}
            </span>
          )}
        </div>
        <div className="kt-editor-footer-right">
          <kbd className="kt-kbd-shortcut">Ctrl + Enter</kbd> para Ejecutar
        </div>
      </div>
    </div>
  );
};
