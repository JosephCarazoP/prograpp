import { useState, useCallback, useEffect, useRef } from 'react';
import { CodeCompletionItem, CaretCoordinates } from '../types/autocomplete';
import { getCaretCoordinates, getCurrentWordPrefix } from '../utils/caretCoordinates';

interface UseCodeAutocompleteProps {
  dictionary: CodeCompletionItem[];
  value: string;
  onChange: (newValue: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  theme?: 'kotlin' | 'sql';
}

export function useCodeAutocomplete({
  dictionary,
  value,
  onChange,
  textareaRef
}: UseCodeAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<CodeCompletionItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentPrefix, setCurrentPrefix] = useState('');
  const [coords, setCoords] = useState<CaretCoordinates>({ top: 0, left: 0, lineHeight: 22 });

  // Referencias para evitar stale closures en event listeners
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const filteredItemsRef = useRef(filteredItems);
  filteredItemsRef.current = filteredItems;

  const selectedIndexRef = useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  const valueRef = useRef(value);
  valueRef.current = value;

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(0);
  }, []);

  // Función para reevaluar sugerencias basadas en la posición actual del cursor
  const checkAutocomplete = useCallback((overrideText?: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const currentText = overrideText !== undefined ? overrideText : textarea.value;
    const cursorPos = textarea.selectionStart;

    const { word, start } = getCurrentWordPrefix(currentText, cursorPos);

    // Activamos recomendaciones si hay al menos 1 caracter de palabra (ej: 'p', 'pr', 'UP')
    if (word && word.length >= 1) {
      const lowerWord = word.toLowerCase();

      // Priorizar primero los que comienzan con el prefijo, luego los que lo contienen
      const startsWithMatches: CodeCompletionItem[] = [];
      const containsMatches: CodeCompletionItem[] = [];

      for (const item of dictionary) {
        const lowerLabel = item.label.toLowerCase();
        if (lowerLabel.startsWith(lowerWord)) {
          startsWithMatches.push(item);
        } else if (lowerLabel.includes(lowerWord)) {
          containsMatches.push(item);
        }
      }

      const allMatches = [...startsWithMatches, ...containsMatches].slice(0, 16);

      if (allMatches.length > 0) {
        const caretPos = getCaretCoordinates(textarea, start);
        setCoords(caretPos);
        setFilteredItems(allMatches);
        setCurrentPrefix(word);
        setSelectedIndex(0);
        setIsOpen(true);
        return;
      }
    }

    close();
  }, [dictionary, textareaRef, close]);

  // Manejar inserción de la sugerencia seleccionada
  const handleSelect = useCallback((item: CodeCompletionItem) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const currentText = valueRef.current;
    const cursorPos = textarea.selectionStart;
    const { start, end } = getCurrentWordPrefix(currentText, cursorPos);

    const before = currentText.substring(0, start);
    const after = currentText.substring(end);
    const newText = before + item.insertText + after;

    onChange(newText);

    // Calcular posición óptima del cursor tras autocompletar
    const targetCursor = start + item.insertText.length + (item.cursorOffset ?? 0);

    close();

    // Reenfocar textarea y ubicar el cursor
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = Math.max(0, targetCursor);
      }
    }, 0);
  }, [onChange, textareaRef, close]);

  // Manejar teclado para autocompletado (Tab, Enter, Escape, Arriba, Abajo)
  // Retorna true si el evento fue capturado por el autocompletado y no debe propagarse
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>): boolean => {
    if (!isOpenRef.current || filteredItemsRef.current.length === 0) {
      return false;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItemsRef.current.length);
      return true;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItemsRef.current.length) % filteredItemsRef.current.length);
      return true;
    }

    if (e.key === 'Tab' || (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey)) {
      e.preventDefault();
      e.stopPropagation();
      const currentSelection = filteredItemsRef.current[selectedIndexRef.current] || filteredItemsRef.current[0];
      if (currentSelection) {
        handleSelect(currentSelection);
      }
      return true;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return true;
    }

    return false;
  }, [handleSelect, close]);

  // Actualizar coordenadas al hacer scroll
  const handleScroll = useCallback(() => {
    if (!isOpenRef.current || !textareaRef.current) return;
    const cursorPos = textareaRef.current.selectionStart;
    const { start } = getCurrentWordPrefix(valueRef.current, cursorPos);
    const caretPos = getCaretCoordinates(textareaRef.current, start);
    setCoords(caretPos);
  }, [textareaRef]);

  // Cerrar al hacer clic fuera del editor
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (!isOpenRef.current) return;
      const target = e.target as HTMLElement;
      if (
        textareaRef.current &&
        !textareaRef.current.contains(target) &&
        !target.closest('.neo-autocomplete-popup')
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [close, textareaRef]);

  return {
    isOpen,
    filteredItems,
    selectedIndex,
    setSelectedIndex,
    currentPrefix,
    coords,
    checkAutocomplete,
    handleSelect,
    handleKeyDown,
    handleScroll,
    close
  };
}
