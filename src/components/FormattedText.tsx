import React from 'react';

export interface FormattedTextProps {
  text?: string | null;
  inline?: boolean;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Expresión regular para capturar elementos inline de formato
const INLINE_REGEX = /(\*\*\*[\s\S]+?\*\*\*|\*\*[\s\S]+?\*\*|__[\s\S]+?__|`[\s\S]+?`|~~[\s\S]+?~~|\[[\s\S]+?\]\([\s\S]+?\)|\*[^\s*][\s\S]*?[^\s*]\*|_[^\s_][\s\S]*?[^\s_]_)/g;

/**
 * Parsea formato inline en nodos de React:
 * - **negrita** o __negrita__ -> <strong>
 * - *cursiva* o _cursiva_ -> <em>
 * - ***negrita y cursiva*** -> <strong><em>
 * - `código` -> <code>
 * - ~~tachado~~ -> <del>
 * - [enlace](url) -> <a>
 */
export function parseInlineMarkdown(text: string, dark = false): React.ReactNode[] {
  if (!text) return [];

  const parts = text.split(INLINE_REGEX);

  return parts.map((part, index) => {
    if (!part) return null;

    // Negrita + Cursiva (***texto***)
    if (part.startsWith('***') && part.endsWith('***') && part.length >= 6) {
      const inner = part.slice(3, -3);
      return (
        <strong key={index} style={{ fontWeight: 900, color: dark ? '#FFFFFF' : '#000000' }}>
          <em style={{ fontStyle: 'italic' }}>{parseInlineMarkdown(inner, dark)}</em>
        </strong>
      );
    }

    // Negrita (**texto** o __texto__)
    if (
      (part.startsWith('**') && part.endsWith('**') && part.length >= 4) ||
      (part.startsWith('__') && part.endsWith('__') && part.length >= 4)
    ) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} style={{ fontWeight: 900, color: dark ? '#FFFFFF' : '#000000' }}>
          {parseInlineMarkdown(inner, dark)}
        </strong>
      );
    }

    // Código inline (`código`)
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const codeContent = part.slice(1, -1);
      return (
        <code
          key={index}
          style={{
            background: dark ? '#1E293B' : '#F1F5F9',
            color: dark ? '#38BDF8' : '#0F172A',
            border: dark ? '1px solid #334155' : '1.5px solid #CBD5E1',
            borderRadius: '5px',
            padding: '1.5px 6px',
            fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
            fontSize: '0.88em',
            fontWeight: 800,
            display: 'inline-block',
            lineHeight: 1.25,
            verticalAlign: 'baseline'
          }}
        >
          {codeContent}
        </code>
      );
    }

    // Tachado (~~texto~~)
    if (part.startsWith('~~') && part.endsWith('~~') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <del key={index} style={{ textDecoration: 'line-through', opacity: 0.7 }}>
          {parseInlineMarkdown(inner, dark)}
        </del>
      );
    }

    // Enlace ([texto](url))
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        return (
          <a
            key={index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: dark ? '#60A5FA' : '#2563EB',
              textDecoration: 'underline',
              fontWeight: 800
            }}
          >
            {match[1]}
          </a>
        );
      }
    }

    // Cursiva (*texto* o _texto_)
    if (
      (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.startsWith('**')) ||
      (part.startsWith('_') && part.endsWith('_') && part.length >= 2 && !part.startsWith('__'))
    ) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} style={{ fontStyle: 'italic' }}>
          {parseInlineMarkdown(inner, dark)}
        </em>
      );
    }

    // Texto normal
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

interface BlockItem {
  type: 'p' | 'ul' | 'ol' | 'blockquote';
  text?: string;
  items?: string[];
}

function parseBlocks(rawText: string): BlockItem[] {
  const rawBlocks = rawText.split(/\n\s*\n/);
  const blocks: BlockItem[] = [];

  for (const block of rawBlocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);

    // Cita / Blockquote (> texto)
    if (lines.every((l) => l.startsWith('>'))) {
      blocks.push({
        type: 'blockquote',
        items: lines.map((l) => l.replace(/^>\s*/, ''))
      });
      continue;
    }

    // Lista no ordenada completa (• o - o *)
    if (lines.every((l) => /^[•\-\*]\s+/.test(l))) {
      blocks.push({
        type: 'ul',
        items: lines.map((l) => l.replace(/^[•\-\*]\s+/, ''))
      });
      continue;
    }

    // Lista numerada completa (1. o 2.)
    if (lines.every((l) => /^\d+\.\s+/.test(l))) {
      blocks.push({
        type: 'ol',
        items: lines.map((l) => l.replace(/^\d+\.\s+/, ''))
      });
      continue;
    }

    // Bloque mixto (texto introductorio seguido de viñetas o números)
    const hasBullets = lines.some((l) => /^[•\-\*]\s+/.test(l));
    const hasNumbers = lines.some((l) => /^\d+\.\s+/.test(l));

    if (hasBullets || hasNumbers) {
      let currentParagraph: string[] = [];
      let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

      for (const line of lines) {
        if (/^[•\-\*]\s+/.test(line)) {
          if (currentParagraph.length > 0) {
            blocks.push({ type: 'p', text: currentParagraph.join('\n') });
            currentParagraph = [];
          }
          if (!currentList || currentList.type !== 'ul') {
            if (currentList) blocks.push(currentList);
            currentList = { type: 'ul', items: [] };
          }
          currentList.items.push(line.replace(/^[•\-\*]\s+/, ''));
        } else if (/^\d+\.\s+/.test(line)) {
          if (currentParagraph.length > 0) {
            blocks.push({ type: 'p', text: currentParagraph.join('\n') });
            currentParagraph = [];
          }
          if (!currentList || currentList.type !== 'ol') {
            if (currentList) blocks.push(currentList);
            currentList = { type: 'ol', items: [] };
          }
          currentList.items.push(line.replace(/^\d+\.\s+/, ''));
        } else {
          if (currentList) {
            blocks.push(currentList);
            currentList = null;
          }
          currentParagraph.push(line);
        }
      }

      if (currentParagraph.length > 0) {
        blocks.push({ type: 'p', text: currentParagraph.join('\n') });
      }
      if (currentList) {
        blocks.push(currentList);
      }
      continue;
    }

    // Párrafo estándar
    blocks.push({ type: 'p', text: lines.join('\n') });
  }

  return blocks;
}

/**
 * Componente principal para formatear textos con soporte completo de markdown
 */
export const FormattedText: React.FC<FormattedTextProps> = ({
  text,
  inline = false,
  dark = false,
  className,
  style
}) => {
  if (!text) return null;

  // Modo inline: renderiza directamente los elementos sin etiquetas de bloque
  if (inline || (!text.includes('\n') && !text.includes('• ') && !text.startsWith('- '))) {
    return (
      <span className={className} style={{ display: 'inline', ...style }}>
        {parseInlineMarkdown(text, dark)}
      </span>
    );
  }

  // Modo bloque: estructura párrafos, listas y citas
  const blocks = parseBlocks(text);

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'ul' && block.items) {
          return (
            <ul
              key={bIdx}
              style={{
                margin: '6px 0 14px 0',
                paddingLeft: '22px',
                listStyleType: 'disc',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              {block.items.map((item, iIdx) => (
                <li
                  key={iIdx}
                  style={{
                    lineHeight: 1.6,
                    color: dark ? '#F1F5F9' : 'inherit'
                  }}
                >
                  {parseInlineMarkdown(item, dark)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol' && block.items) {
          return (
            <ol
              key={bIdx}
              style={{
                margin: '6px 0 14px 0',
                paddingLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              {block.items.map((item, iIdx) => (
                <li
                  key={iIdx}
                  style={{
                    lineHeight: 1.6,
                    color: dark ? '#F1F5F9' : 'inherit'
                  }}
                >
                  {parseInlineMarkdown(item, dark)}
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === 'blockquote' && block.items) {
          return (
            <blockquote
              key={bIdx}
              style={{
                margin: '8px 0 14px 0',
                padding: '8px 14px',
                borderLeft: '4px solid #3B82F6',
                background: dark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)',
                borderRadius: '0 8px 8px 0',
                fontStyle: 'italic',
                color: dark ? '#93C5FD' : '#1E40AF'
              }}
            >
              {block.items.map((line, lIdx) => (
                <React.Fragment key={lIdx}>
                  {lIdx > 0 && <br />}
                  {parseInlineMarkdown(line, dark)}
                </React.Fragment>
              ))}
            </blockquote>
          );
        }

        const lines = (block.text || '').split('\n');
        return (
          <p
            key={bIdx}
            style={{
              margin: bIdx === blocks.length - 1 ? 0 : '0 0 12px 0',
              lineHeight: 1.65,
              color: dark ? '#F1F5F9' : 'inherit'
            }}
          >
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {parseInlineMarkdown(line, dark)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default FormattedText;
