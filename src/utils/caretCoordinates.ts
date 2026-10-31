import { CaretCoordinates } from '../types/autocomplete';

const STYLES_TO_COPY = [
  'direction',
  'boxSizing',
  'width',
  'height',
  'overflowX',
  'overflowY',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',
  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',
  'letterSpacing',
  'wordSpacing',
  'tabSize',
  'MozTabSize'
] as const;

let mirrorDiv: HTMLDivElement | null = null;

/**
 * Calcula las coordenadas (top, left) en píxeles de la posición del cursor (caret)
 * dentro de un HTMLTextAreaElement relativo a su contenedor.
 */
export function getCaretCoordinates(
  element: HTMLTextAreaElement,
  position: number
): CaretCoordinates {
  if (typeof window === 'undefined') {
    return { top: 0, left: 0, lineHeight: 21 };
  }

  if (!mirrorDiv) {
    mirrorDiv = document.createElement('div');
    mirrorDiv.id = 'caret-position-mirror-div';
    document.body.appendChild(mirrorDiv);
  }

  const computed = window.getComputedStyle(element);

  mirrorDiv.style.position = 'absolute';
  mirrorDiv.style.top = '-9999px';
  mirrorDiv.style.left = '-9999px';
  mirrorDiv.style.visibility = 'hidden';
  mirrorDiv.style.whiteSpace = 'pre-wrap';
  mirrorDiv.style.wordWrap = 'break-word';

  STYLES_TO_COPY.forEach(prop => {
    if (mirrorDiv) {
      mirrorDiv.style[prop as any] = computed[prop as any];
    }
  });

  // Copiar el contenido previo al cursor
  const textContent = element.value.substring(0, position);
  mirrorDiv.textContent = textContent;

  // Insertar un marcador span para leer su posición exacta
  const span = document.createElement('span');
  span.textContent = element.value.substring(position) || '.';
  mirrorDiv.appendChild(span);

  const parsedLineHeight = parseFloat(computed.lineHeight) || 21;

  const top = span.offsetTop - element.scrollTop;
  const left = span.offsetLeft - element.scrollLeft;

  return {
    top,
    left,
    lineHeight: parsedLineHeight
  };
}

/**
 * Obtiene la palabra o prefijo que el usuario está escribiendo antes de la posición actual del cursor,
 * junto con sus índices de inicio y fin.
 */
export function getCurrentWordPrefix(
  text: string,
  cursorOffset: number
): { word: string; start: number; end: number } {
  if (cursorOffset < 0 || cursorOffset > text.length) {
    return { word: '', start: cursorOffset, end: cursorOffset };
  }

  // Retroceder hasta encontrar un caracter que no sea parte de un identificador
  let start = cursorOffset;
  while (start > 0) {
    const char = text[start - 1];
    // Aceptamos letras, números, guiones bajos
    if (/^[a-zA-Z0-9_]$/.test(char)) {
      start--;
    } else {
      break;
    }
  }

  // Avanzar hasta el final del identificador actual
  let end = cursorOffset;
  while (end < text.length) {
    const char = text[end];
    if (/^[a-zA-Z0-9_]$/.test(char)) {
      end++;
    } else {
      break;
    }
  }

  const word = text.slice(start, cursorOffset);
  return { word, start, end };
}
