import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { CodeCompletionItem } from '../../types/autocomplete';
import { Info, BookOpen } from 'lucide-react';

interface CodeAutocompleteProps {
  items: CodeCompletionItem[];
  selectedIndex: number;
  onSelect: (item: CodeCompletionItem) => void;
  onHoverItem: (index: number) => void;
  position: { top: number; left: number; lineHeight?: number };
  visible: boolean;
  onClose: () => void;
  filterPrefix?: string;
  theme?: 'kotlin' | 'sql';
}

const BADGE_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  function: { label: 'fn', bg: '#FFE4E6', text: '#BE123C', border: '#FDA4AF' },
  keyword: { label: 'kw', bg: '#F3E8FF', text: '#7E22CE', border: '#D8B4FE' },
  statement: { label: 'stmt', bg: '#FEF3C7', text: '#B45309', border: '#FCD34D' },
  type: { label: 'typ', bg: '#E0F2FE', text: '#0369A1', border: '#BAE6FD' },
  snippet: { label: 'snip', bg: '#D1FAE5', text: '#047857', border: '#6EE7B7' },
  variable: { label: 'var', bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' }
};

export const CodeAutocomplete: React.FC<CodeAutocompleteProps> = ({
  items,
  selectedIndex,
  onSelect,
  onHoverItem,
  position,
  visible,
  filterPrefix = '',
  theme = 'kotlin'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [adjustedPos, setAdjustedPos] = useState<{ top: number; left: number }>({
    top: position.top,
    left: position.left
  });

  // Ajuste inteligente de posición para no salirse de los bordes del editor
  useLayoutEffect(() => {
    if (!visible || !containerRef.current) return;

    const el = containerRef.current;
    const parent = el.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const popupWidth = el.offsetWidth || 520;
    const popupHeight = el.offsetHeight || 260;
    const lineHeight = position.lineHeight || 22;

    let targetTop = position.top + lineHeight + 4;
    let targetLeft = position.left;

    // Si se desborda verticalmente por abajo, colocar arriba del cursor
    if (targetTop + popupHeight > parentRect.height && position.top - popupHeight > 0) {
      targetTop = position.top - popupHeight - 4;
    } else if (targetTop + popupHeight > parentRect.height) {
      targetTop = Math.max(4, parentRect.height - popupHeight - 8);
    }

    // Si se desborda horizontalmente por la derecha
    if (targetLeft + popupWidth > parentRect.width - 8) {
      targetLeft = Math.max(8, parentRect.width - popupWidth - 12);
    }

    setAdjustedPos({
      top: Math.max(4, targetTop),
      left: Math.max(8, targetLeft)
    });
  }, [position, visible, items.length]);

  // Auto-scroll al elemento activo
  useEffect(() => {
    if (!listRef.current || selectedIndex < 0 || selectedIndex >= items.length) return;
    const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
    if (activeEl) {
      const containerTop = listRef.current.scrollTop;
      const containerBottom = containerTop + listRef.current.clientHeight;
      const elTop = activeEl.offsetTop;
      const elBottom = elTop + activeEl.clientHeight;

      if (elTop < containerTop) {
        listRef.current.scrollTop = elTop;
      } else if (elBottom > containerBottom) {
        listRef.current.scrollTop = elBottom - listRef.current.clientHeight;
      }
    }
  }, [selectedIndex, items.length]);

  useEffect(() => {
    setHoveredIndex(null);
  }, [items]);

  if (!visible || items.length === 0) {
    return null;
  }

  const activeIndex =
    hoveredIndex !== null && hoveredIndex >= 0 && hoveredIndex < items.length
      ? hoveredIndex
      : (selectedIndex >= 0 && selectedIndex < items.length ? selectedIndex : 0);

  const activeItem = items[activeIndex] || items[0];

  const renderHighlightedLabel = (label: string, prefix: string) => {
    if (!prefix) return <span>{label}</span>;
    const lowerLabel = label.toLowerCase();
    const lowerPrefix = prefix.toLowerCase();
    const matchIdx = lowerLabel.indexOf(lowerPrefix);

    if (matchIdx === -1) return <span>{label}</span>;

    const before = label.slice(0, matchIdx);
    const match = label.slice(matchIdx, matchIdx + prefix.length);
    const after = label.slice(matchIdx + prefix.length);

    return (
      <span className="neo-ac-label-text">
        {before}
        <strong className="neo-ac-highlight-match">{match}</strong>
        {after}
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`neo-autocomplete-popup theme-${theme}`}
      style={{
        top: `${adjustedPos.top}px`,
        left: `${adjustedPos.left}px`
      }}
      role="listbox"
      aria-label="Recomendaciones de código"
    >
      {/* ─── COLUMNA IZQUIERDA: LISTA DE SUGERENCIAS ESTILO NETBEANS ─── */}
      <div className="neo-ac-list-panel">
        <div className="neo-ac-panel-header">
          <div className="neo-ac-header-title">
            <span>Sugerencias ({items.length})</span>
          </div>
          <span className="neo-ac-header-badge">
            {theme === 'kotlin' ? 'Kotlin IDE' : 'SQL IDE'}
          </span>
        </div>

        <div ref={listRef} className="neo-ac-items-scroll">
          {items.map((item, index) => {
            const isSelected = index === activeIndex;
            const badge = BADGE_CONFIG[item.kind] || BADGE_CONFIG.keyword;

            return (
              <div
                key={`${item.label}-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`neo-ac-item ${isSelected ? 'is-selected' : ''}`}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  onHoverItem(index);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(item);
                }}
              >
                {/* Mini Badge tipo NetBeans: [fn], [kw], [typ], [stmt] */}
                <span
                  className="neo-ac-badge"
                  style={{
                    backgroundColor: badge.bg,
                    color: badge.text,
                    borderColor: badge.border
                  }}
                  title={item.kind}
                >
                  {badge.label}
                </span>

                {/* Nombre de la función o palabra clave */}
                <span className="neo-ac-label">
                  {renderHighlightedLabel(item.label, filterPrefix)}
                </span>

                {/* Detalle secundario */}
                {item.detail && (
                  <span className="neo-ac-detail">{item.detail}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="neo-ac-list-footer">
          <span className="neo-ac-footer-tip">
            <kbd className="neo-ac-kbd">Tab</kbd> o <kbd className="neo-ac-kbd">Enter</kbd>
          </span>
          <span className="neo-ac-footer-tip">
            <kbd className="neo-ac-kbd">↑↓</kbd> navegar
          </span>
        </div>
      </div>

      {/* ─── COLUMNA DERECHA: PANEL DE DOCUMENTACIÓN / EXPLICACIÓN EN HOVER ─── */}
      {activeItem && (
        <div className="neo-ac-doc-panel">
          <div className="neo-ac-doc-header">
            <div className="neo-ac-doc-title-row">
              <BookOpen size={13} className="text-slate-500" />
              <span className="neo-ac-doc-kind-badge">
                {activeItem.kind.toUpperCase()}
              </span>
              <span className="neo-ac-doc-name">{activeItem.label}</span>
            </div>
            {activeItem.detail && (
              <span className="neo-ac-doc-detail-tag">{activeItem.detail}</span>
            )}
          </div>

          {/* Firma técnica / Sintaxis */}
          {activeItem.signature && (
            <div className="neo-ac-signature-box">
              <code className="neo-ac-signature-code">{activeItem.signature}</code>
            </div>
          )}

          {/* Explicación en español al hacer hover */}
          <div className="neo-ac-doc-body">
            <p className="neo-ac-description">{activeItem.description}</p>

            {/* Ejemplo práctico interactivo */}
            {activeItem.example && (
              <div className="neo-ac-example-section">
                <span className="neo-ac-example-title">Ejemplo:</span>
                <pre className="neo-ac-example-code">{activeItem.example}</pre>
              </div>
            )}
          </div>

          <div className="neo-ac-doc-footer">
            <span className="neo-ac-doc-hint">
              <Info size={11} className="inline mr-1" />
              Pasa el ratón sobre cualquier opción para ver su explicación
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
