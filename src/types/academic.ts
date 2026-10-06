import { LearningPath } from './user';

// Tipos de estado de evaluación
export type EvaluationType = 'diagnostic' | 'final';
export type EvaluationStatus = 'pending_review' | 'graded';

// Modelo de Identificación del Estudiante para la Investigación
export interface StudentIdentification {
  studentId: string;              // UID estable de autenticación
  studentCode: string;            // Código anonimizado de investigación (ej: "E01", "E02")
  displayName: string;            // Nombre público visible
  email?: string;                 // Correo registrado
  firstName?: string;             // Nombre(s)
  firstLastName?: string;         // Primer apellido
  secondLastName?: string;        // Segundo apellido
  idNumber?: string;              // Número de cédula / identificación
  group: string;                  // Grupo de clase (ej: "Grupo A", "Informatica-2026")
  isResearchParticipant: boolean; // Si participa en el grupo de estudio (asignado por docente)
  createdAt: number;              // Timestamp de registro
  lastActiveAt: number;           // Última interacción registrada
  totalActiveTimeSeconds: number; // Tiempo activo estimado en lecciones
}

// Historial Inmutable de Intentos
export interface ExerciseAttempt {
  attemptId: string;              // ID único por intento (UUID)
  studentId: string;              // UID del alumno
  studentCode: string;            // Código del estudiante
  sessionId: string;              // Sesión de aprendizaje activa
  pathId: LearningPath;           // 'kotlin' | 'sql'
  unitId: number;
  lessonId: string;
  activityId: string;             // ID del ejercicio
  contentVersion: string;         // Versión del contenido (ej: '1.0.0')
  theme: string;                  // Tema / concepto (ej: 'Variables', 'Condicionales')
  difficulty: 'easy' | 'medium' | 'hard';
  attemptNumber: number;          // 1 para primer intento, 2 para segundo, etc.
  userAnswer: string;             // Respuesta del usuario serializada como texto limpio
  status: 'correct' | 'incorrect' | 'pending_review';
  score: number;                  // Puntaje obtenido
  maxScore: number;               // Puntaje máximo posible
  hintUsed: boolean;              // Si utilizó comodín o pista
  timestamp: number;              // Fecha y hora del intento en ms
  isOfflineSync?: boolean;        // Si se resolvió offline y se sincronizó luego
  syncTimestamp?: number;         // Fecha de sincronización
  isTestOrEvaluation?: boolean;   // Si pertenece a diagnóstico o prueba final
}

// Registro Académico de Lección Completada (Práctica Obligatoria)
export interface AcademicLessonState {
  lessonId: string;
  pathId: LearningPath;
  unitId: number;
  levelId: number;
  version: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt: number;
  completedAt?: number;
  isPracticeCompleted: boolean;   // Finalización: terminó toda la práctica obligatoria
  masteryAchieved: boolean;       // Logro: alcanzó el criterio de estrellas/puntaje
  starsEarned: 1 | 2 | 3;
  attemptsCount: number;
  mistakesCount: number;
  scorePercentage: number;
}

// Pregunta en Diagnóstico o Prueba Final
export interface EvaluationQuestion {
  questionId: string;
  topic: string;                  // Tema evaluado
  prompt: string;                 // Enunciado
  type: 'code' | 'pseudocode' | 'open_answer' | 'multiple_choice';
  options?: string[];             // Para multiple choice
  correctOptionIndex?: number;
  rubricCriteria?: string;        // Criterio de corrección para el docente
  maxScore: number;
}

// Evaluación completa (Diagnóstico o Final)
export interface AcademicEvaluation {
  evalId: string;
  studentId: string;
  studentCode: string;
  pathId: LearningPath;
  type: EvaluationType;
  instrumentId: string;           // Identificador del instrumento estandarizado
  instrumentVersion: string;
  isOfficial: boolean;            // Identifica la aplicación oficial
  startedAt: number;
  submittedAt?: number;
  status: EvaluationStatus;
  questions: EvaluationQuestion[];
  answers: Record<string, string>;
  scores: Record<string, number>;
  totalScore: number;
  maxScore: number;
  percentage: number | null;      // null = "Sin datos" (no completada)
  gradedBy?: string;
  gradedAt?: number;
  manualCriteriaFeedback?: Record<string, { score: number; comment: string }>;
  isExternal?: boolean;           // Si fue realizada fuera de la app y registrada por el docente
  externalDate?: string;          // Fecha real si fue externa
}

// Sesiones de Tiempo Activo
export interface ActiveSessionRecord {
  sessionId: string;
  studentId: string;
  pathId: LearningPath;
  date: string;                   // YYYY-MM-DD
  startedAt: number;
  endedAt: number;
  activeSeconds: number;
}

// Observación y Apoyo Docente
export interface TeacherObservation {
  obsId: string;
  studentId: string;
  studentCode: string;
  date: string;                   // YYYY-MM-DD
  observedDifficulty: string;
  supportGiven: string;
  teacherComment: string;
  createdAt: number;
}

// Opinión Breve sobre la Actividad (Instrumento de opinión pedagógica)
export interface ActivityOpinion {
  opinionId: string;
  studentId: string;
  studentCode: string;
  activityId: string;
  instrumentVersion: string;
  instructionClarity: number;     // 1 a 5
  perceivedUtility: number;       // 1 a 5
  usageDifficulties: string;
  optionalComment?: string;
  createdAt: number;
}

// Configuración de Seguridad Administrativa
export interface AdminSecurityConfig {
  adminEmail: string;
  authorizedUid: string;
  passwordHash: string;
  salt: string;
  failedAttempts: number;
  lockoutUntil: number;
  lastChangedAt: number;
}

// Indicadores Calculados para Investigación Educativa
export interface EducationalIndicators {
  studentCode: string;
  displayName: string;
  group: string;
  pathId: LearningPath;
  isResearchParticipant: boolean;
  activeDaysCount: number;
  practiceSessionsCount: number;
  estimatedActiveTimeMinutes: number;
  distinctActivitiesAttempted: number;
  distinctActivitiesCompleted: number;
  lessonsCompleted: number;
  modulesCompleted: number;
  totalAttempts: number;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  pendingReviewCount: number;
  firstAttemptAccuracyPercent: number | null; // % aciertos al primer intento
  qualifiedAccuracyPercent: number | null;    // % aciertos sobre calificadas
  attemptsPerActivityAverage: number | null;
  currentLevel: number;
  pathProgressPercent: number;
  diagnosticPercentage: number | null;       // null si no hay datos
  finalTestPercentage: number | null;        // null si no hay datos
  percentagePointGain: number | null;        // ganancia (final - diagnóstico)
  topicBreakdown: Record<string, {
    attempts: number;
    correct: number;
    scorePercent: number | null;
  }>;
}
