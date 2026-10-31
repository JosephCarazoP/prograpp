export type CompletionKind =
  | 'function'
  | 'keyword'
  | 'type'
  | 'statement'
  | 'snippet'
  | 'variable';

export interface CodeCompletionItem {
  /** Texto principal que se muestra en la lista (ej: "println", "UPDATE") */
  label: string;
  /** Texto que se insertará al seleccionar la recomendación */
  insertText: string;
  /** Posición relativa del cursor tras la inserción (ej: -1 para quedar dentro de los paréntesis) */
  cursorOffset?: number;
  /** Categoría del elemento para mostrar el icono / badge estilo NetBeans */
  kind: CompletionKind;
  /** Detalle o tipo de retorno opcional (ej: "Unit", "Cláusula", "Int") */
  detail?: string;
  /** Firma técnica o sintaxis completa de la función o sentencia */
  signature?: string;
  /** Explicación concisa y clara en español al hacer hover */
  description: string;
  /** Ejemplo práctico de código */
  example?: string;
}

export interface CaretCoordinates {
  top: number;
  left: number;
  lineHeight: number;
}
