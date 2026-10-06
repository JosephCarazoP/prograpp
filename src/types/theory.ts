export interface TheorySection {
  title: string;
  explanation: string;
  codeSnippet?: string;
  codeLanguage?: 'kotlin' | 'sql';
  byteTip?: string;
  keyPoints: string[];
}

export interface TheoryLesson {
  id: string; // ej: 'kt-th-u01-l01'
  lessonId: string; // Enlace a la lección de juego: 'kotlin-u01-l01'
  pathId: 'kotlin' | 'sql';
  unitId: number;
  levelId: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  sections: TheorySection[];
}
