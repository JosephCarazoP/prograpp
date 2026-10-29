export type QuestionReportReason =
  | 'wrong_answer'       // La respuesta correcta marcada en la app es errónea
  | 'confusing_prompt'   // El enunciado es confuso, ambiguo o incompleto
  | 'typo_or_spelling'   // Falta de ortografía, redacción o error tipográfico
  | 'code_bug'           // El código de muestra tiene un bug de sintaxis o lógica
  | 'my_answer_valid'    // Mi respuesta debería haber sido calificada como válida
  | 'ui_issue'           // Falla visual, interfaz congelada o botón no responde
  | 'other';             // Otro problema o sugerencia

export interface QuestionReport {
  reportId: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
  studentCode?: string;

  // Identificación del contexto pedagógico
  pathId: 'kotlin' | 'sql';
  unitId?: number;
  lessonId: string;
  lessonTitle: string;
  exerciseId: string;
  exerciseType: string;

  // Contenido de la pregunta
  prompt: string;
  codeSnippet?: string;
  availableOptions?: string[];
  expectedSolution: string;
  userAnswer?: string;

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
