import { LearningPath } from './user';

export interface LessonProgress {
  lessonId: string;
  pathId: LearningPath;
  unitId: number;
  levelId: number;
  starsEarned: 1 | 2 | 3;
  completedAt: number;
  attempts: number;
  mistakesCount: number;
  scorePercentage: number;
  lastReviewedAt: number;
  isCracked?: boolean; // Para el sistema de repetición espaciada
  theoryCompleted?: boolean; // Indica si aprobó el micro-quiz / leyó la materia requerida
  theoryCompletedAt?: number;
}

export interface PathProgressSummary {
  pathId: LearningPath;
  totalUnits: number;
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  totalStars: number;
}
