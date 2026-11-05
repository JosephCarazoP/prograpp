import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { CodeCompletionItem, CaretCoordinates } from '../../types/autocomplete';
import { Info, BookOpen, X } from 'lucide-react';

interface CodeAutocompleteProps {
  items: CodeCompletionItem[];
  selectedIndex: number;
  onSelect: (item: CodeCompletionItem) => void;
  onHoverItem: (index: number) => void;
  position: CaretCoordinates;
  visible: boolean;
  onClose: () => void;
  filterPrefix?: string;
  theme?: 'kotlin' | 'sql';
}

const BADGE_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  table: { label: 'tbl', bg: '#DCFCE7', text: '#15803D', border: '#86EFAC' },
  column: { label: 'col', bg: '#E0F2FE', text: '#0369A1', border: '#7DD3FC' },
  variable: { label: 'var', bg: '#FEF9C3', text: '#A16207', border: '#FDE047' },
  function: { label: 'fn', bg: '#FFE4E6', text: '#BE123C', border: '#FDA4AF' },
  keyword: { label: 'kw', bg: '#F3E8FF', text: '#7E22CE', border: '#D8B4FE' },
  statement: { label: 'stmt', bg: '#FEF3C7', text: '#B45309', border: '#FCD34D' },
  type: { label: 'typ', bg: '#E0F2FE', text: '#0369A1', border: '#BAE6FD' },
  snippet: { label: 'snip', bg: '#D1FAE5', text: '#047857', border: '#6EE7B7' }
};

export const CodeAutocomplete: React.FC<CodeAutocompleteProps> = ({
  items,
  selectedIndex,
  onSelect,
  onHoverItem,
  position,
  visible,
  onClose,
  filterPrefix = '',
  theme = 'kotlin'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [adjustedPos, setAdjustedPos] = useState<{ top: number; left: number; maxHeight: number }>({
    top: (position.viewportTop ?? position.top) + (position.lineHeight || 22) + 8,
    left: position.viewportLeft ?? position.left,
    maxHeight: 250
  });

  // Posicionamiento fijo inteligente (estilo NetBeans / SQL Server) que JAMÁS tapa la línea del cursor
  useLayoutEffect(() => {
    if (!visible || !containerRef.current) return;

    const el = containerRef.current;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const popupWidth = el.offsetWidth || 520;
    const naturalHeight = Math.min(el.scrollHeight || 240, 250);
    const lineHeight = position.lineHeight || 22;

    const caretTop = position.viewportTop ?? position.top;
    const caretBottom = caretTop + lineHeight;
    const caretLeft = position.viewportLeft ?? position.left;

    const spaceBelow = vh - caretBottom - 14;
    const spaceAbove = caretTop - 14;

    let targetTop: number;
    let allowedHeight = 250;

    // Prioridad 1: Debajo de la línea actual del cursor (con margen de 8px para no estorbar)
    if (spaceBelow >= Math.min(naturalHeight, 175) || spaceBelow >= spaceAbove) {
      targetTop = caretBottom + 8;
      allowedHeight = Math.max(130, Math.min(250, spaceBelow - 6));
    } else {
      // Prioridad 2: Arriba de la línea actual del cursor si el cursor está muy abajo en la pantalla
      allowedHeight = Math.max(130, Math.min(250, spaceAbove - 6));
      const actualH = Math.min(naturalHeight, allowedHeight);
      targetTop = Math.max(8, caretTop - actualH - 8);
    }

    let targetLeft = caretLeft;
    if (targetLeft + popupWidth > vw - 12) {
      targetLeft = Math.max(10, vw - popupWidth - 14);
    }

    setAdjustedPos({
      top: Math.max(8, targetTop),
      left: Math.max(10, targetLeft),
      maxHeight: allowedHeight
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

  const popupNode = (
    <div
      ref={containerRef}
      className={`neo-autocomplete-popup theme-${theme}`}
      style={{
        position: 'fixed',
        zIndex: 99999,
        top: `${adjustedPos.top}px`,
        left: `${adjustedPos.left}px`,
        maxHeight: `${adjustedPos.maxHeight}px`
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="neo-ac-header-badge">
              {theme === 'kotlin' ? 'Kotlin IDE' : 'SQL IDE'}
            </span>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onClose();
              }}
              title="Cerrar sugerencias (Esc)"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '2px',
                display: 'inline-flex',
                alignItems: 'center',
                color: '#475569'
              }}
            >
              <X size={13} strokeWidth={2.5} />
            </button>
          </div>
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

  return typeof document !== 'undefined' ? createPortal(popupNode, document.body) : popupNode;
};
