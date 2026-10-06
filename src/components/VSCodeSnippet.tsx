import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import { soundService } from '../services/soundService';

interface VSCodeSnippetProps {
  code: string;
  language?: 'kotlin' | 'sql' | 'text';
  filename?: string;
  highlightLine?: number; // 0-indexed para resaltar
  showLineNumbers?: boolean;
}

export const VSCodeSnippet: React.FC<VSCodeSnippetProps> = ({
  code,
  language = 'kotlin',
  filename,
  highlightLine,
  showLineNumbers = true
}) => {
  const [copied, setCopied] = useState(false);

  const defaultFilename =
    filename || (language === 'sql' ? 'query.sql' : language === 'kotlin' ? 'main.kt' : 'code.txt');

  const handleCopy = () => {
    soundService.playToken();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const lines = code.split('\n');

  // Tokenizador de sintaxis de alto contraste para interfaz clara
  const renderHighlightedLine = (lineText: string) => {
    if (!lineText) return <span>&nbsp;</span>;

    // 1. Detección de comentarios completos
    if (lineText.trim().startsWith('//') || lineText.trim().startsWith('--')) {
      return <span style={{ color: '#4ADE80', fontStyle: 'italic', fontWeight: 500 }}>{lineText}</span>;
    }

    // Expresión regular que separa strings, palabras clave, números, huecos cloze y comentarios
    const regex =
      /(\/\/[^\n]*|--[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|---|___+|\[___\]|\.{3,}|\b(?:val|var|fun|if|else|when|while|for|return|class|interface|object|import|package|null|true|false|SELECT|FROM|WHERE|AND|OR|NOT|JOIN|LEFT|RIGHT|INNER|GROUP\s+BY|ORDER\s+BY|LIMIT|AS|IN|BETWEEN|LIKE|IS|NULL|COUNT|SUM|AVG|MAX|MIN)\b|\b(?:Int|String|Boolean|Double|Float|Long|Char|Array|List|VARCHAR|INTEGER|BOOLEAN|TEXT|DATE)\b|\b(?:\d+\.?\d*)\b|\b(?:println|print|main|readln|readLine)\b)/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(lineText)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`} style={{ color: '#F8FAFC' }}>
            {lineText.substring(lastIndex, match.index)}
          </span>
        );
      }

      const token = match[0];

      if (token.startsWith('//') || token.startsWith('--')) {
        parts.push(
          <span key={`c-${match.index}`} style={{ color: '#4ADE80', fontStyle: 'italic', fontWeight: 500 }}>
            {token}
          </span>
        );
      } else if (token === '---' || token.startsWith('__') || token === '[___]' || token === '...') {
        // Hueco interactivo para ejercicios de cloze / completar
        parts.push(
          <span
            key={`blank-${match.index}`}
            style={{
              display: 'inline-block',
              padding: '0 8px',
              margin: '0 3px',
              background: 'rgba(245, 158, 11, 0.25)',
              border: '1.5px dashed #F59E0B',
              borderRadius: '6px',
              color: '#FDE047',
              fontWeight: 900,
              letterSpacing: '1px',
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.35)'
            }}
          >
            {token}
          </span>
        );
      } else if (token.startsWith('"') || token.startsWith("'")) {
        parts.push(
          <span key={`s-${match.index}`} style={{ color: '#FCD34D' }}>
            {token}
          </span>
        );
      } else if (/^\d+\.?\d*$/.test(token)) {
        parts.push(
          <span key={`n-${match.index}`} style={{ color: '#6EE7B7', fontWeight: 700 }}>
            {token}
          </span>
        );
      } else if (
        /^(Int|String|Boolean|Double|Float|Long|Char|Array|List|VARCHAR|INTEGER|BOOLEAN|TEXT|DATE)$/.test(token)
      ) {
        parts.push(
          <span key={`t-${match.index}`} style={{ color: '#38BDF8', fontWeight: 700 }}>
            {token}
          </span>
        );
      } else if (/^(println|print|main|readln|readLine|COUNT|SUM|AVG|MAX|MIN)$/i.test(token)) {
        parts.push(
          <span key={`f-${match.index}`} style={{ color: '#818CF8', fontWeight: 700 }}>
            {token}
          </span>
        );
      } else {
        // Palabras reservadas (Keywords)
        parts.push(
          <span key={`k-${match.index}`} style={{ color: '#C084FC', fontWeight: 800 }}>
            {token}
          </span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < lineText.length) {
      parts.push(
        <span key={`text-end`} style={{ color: '#F8FAFC' }}>
          {lineText.substring(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  return (
    <div
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#0F172A',
        border: '2px solid #E2E8F0',
        boxShadow: '0 5px 0 #CBD5E1',
        margin: '14px 0',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Barra de Título / Pestaña VS Code */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#1E293B',
          padding: '8px 14px',
          borderBottom: '2px solid #0F172A',
          userSelect: 'none'
        }}
      >
        {/* Controles y pestaña */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Tres botones decorativos estilo Mac con color vivo */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
          </div>

          {/* Tab activo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#0F172A',
              padding: '4px 12px',
              borderRadius: '8px 8px 0 0',
              borderTop: '2px solid #38BDF8',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#F8FAFC'
            }}
          >
            <FileCode size={14} color="#38BDF8" />
            <span>{defaultFilename}</span>
          </div>
        </div>

        {/* Botón copiar código */}
        <button
          onClick={handleCopy}
          style={{
            background: copied ? 'rgba(16, 185, 129, 0.2)' : '#334155',
            border: '1px solid',
            borderColor: copied ? '#10B981' : '#475569',
            borderRadius: '8px',
            padding: '4px 10px',
            color: copied ? '#34D399' : '#CBD5E1',
            fontSize: '0.74rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.15s ease'
          }}
          title="Copiar código al portapapeles"
        >
          {copied ? (
            <>
              <Check size={12} strokeWidth={3} />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Cuerpo del Editor con Números de Línea y Código */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          padding: '14px 0',
          fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
          fontSize: '0.92rem',
          lineHeight: 1.6,
          color: '#F8FAFC',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Columna de números de línea */}
        {showLineNumbers && (
          <div
            style={{
              padding: '0 14px',
              textAlign: 'right',
              userSelect: 'none',
              color: '#64748B',
              borderRight: '1px solid #1E293B',
              flexShrink: 0
            }}
          >
            {lines.map((_, i) => (
              <div
                key={i}
                style={{
                  height: '24px',
                  color: highlightLine === i ? '#F59E0B' : '#64748B',
                  fontWeight: highlightLine === i ? 900 : 500
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Contenido de código con resaltado */}
        <div style={{ padding: '0 16px', flex: 1, minWidth: 'min-content' }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                height: '24px',
                whiteSpace: 'pre',
                background: highlightLine === i ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                borderRadius: '6px',
                padding: highlightLine === i ? '0 6px' : '0'
              }}
            >
              {renderHighlightedLine(line)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
