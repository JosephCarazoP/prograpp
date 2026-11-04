export type QuestionReportReason =
  | 'wrong_answer'       // La respuesta correcta marcada en la app es errónea
  | 'confusing_prompt'   // El enunciado es confuso, ambiguo o incompleto
  | 'typo_or_spelling'   // Falta de ortografía, redacción o error tipográfico
  | 'code_bug'           // El código de muestra tiene un bug de sintaxis o lógica
  | 'my_answer_valid'    // Mi respuesta debería haber sido calificada como válida
  | 'ui_issue'           // Falla visual, interfaz congelada o botón no responde
  | 'other';             // Otro problema o sugerencia

export interface QuestionReporter {
  studentId: string;
  studentName: string;
  studentEmail?: string;
  studentCode?: string;
  reason: QuestionReportReason;
  reasonLabel: string;
  comment?: string;
  userAnswer?: string;
  availableOptions?: string[];
  codeSnippet?: string;
  feedbackState?: 'idle' | 'success' | 'error';
  feedbackExplanation?: string;
  screenshotDataUrl?: string;
  timestamp: number;
}

export interface MatchingPairsReportData {
  leftColumn: string[];
  rightColumn: string[];
  expectedPairs: { left: string; right: string }[];
  userMatched?: string[];
  lastAttempts?: string[];
  activeLeft?: string | null;
  activeRight?: string | null;
}

export interface CodeBuilderReportData {
  displayedTokens: string[];
  selectedTokens: string[];
  expectedSolution: string[];
  acceptableAlternatives?: string[][];
  eliminatedTokens?: string[];
}

export interface SpotTheBugReportData {
  displayedLines: string[];
  bugLineIndex: number;
  selectedLineIndex?: number | null;
  eliminatedLines?: number[];
}

export interface ParsonsReportData {
  displayedLines: string[];
  userOrderLines: string[];
  expectedOrderLines: string[];
}

export interface FlowchartReportData {
  displayedBlocks: string[];
  userOrderBlocks: string[];
  expectedOrderBlocks: string[];
  targetProblem?: string;
  flowTitle?: string;
}

export interface TraceStepReportData {
  expectedSummary: string[];
  userSummary?: string[];
}

export interface QuestionReport {
  reportId: string;
  // Alumno del primer o más reciente reporte (compatibilidad directa)
  studentId: string;
  studentName: string;
  studentEmail?: string;
  studentCode?: string;

  // Lista agregada de todos los estudiantes que han reportado esta misma pregunta
  reporters?: QuestionReporter[];
  reportCount?: number;
  lastReportedAt?: number;

  // Identificación del contexto pedagógico
  pathId: 'kotlin' | 'sql';
  unitId?: number;
  lessonId: string;
  lessonTitle: string;
  exerciseId: string;
  exerciseType: string;
  sourceFileHint?: string;

  // Contenido exacto de la pregunta tal cual le sale al alumno
  prompt: string;
  instructionText?: string;
  codeSnippet?: string;
  availableOptions?: string[];
  expectedSolution: string;
  userAnswer?: string;

  // Datos originales del banco de preguntas (para comparar contra lo barajado en pantalla)
  originalOptions?: string[];
  originalExplanation?: string;

  // Estructuras detalladas según el tipo de ejercicio (4 opciones, relación, completar, etc.)
  matchingPairsData?: MatchingPairsReportData;
  codeBuilderData?: CodeBuilderReportData;
  spotTheBugData?: SpotTheBugReportData;
  parsonsData?: ParsonsReportData;
  flowchartData?: FlowchartReportData;
  traceStepData?: TraceStepReportData;

  // Captura de pantalla silenciosa y optimizada del jugador al momento de reportar
  screenshotDataUrl?: string;

  // Estado del feedback pedagógico en el momento de reportar
  feedbackState?: 'idle' | 'success' | 'error';
  feedbackExplanation?: string;

  // Reporte formulado por el alumno
  reason: QuestionReportReason;
  reasonLabel: string;
  comment?: string;

  // Metadatos para trazabilidad técnica
  timestamp: number;
  deviceInfo?: string;
  status: 'pending' | 'reviewed' | 'resolved';
  adminNotes?: string;
  resolvedAt?: number;
}
