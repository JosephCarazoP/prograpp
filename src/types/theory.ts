export interface VideoResource {
  title: string;
  channel: string;
  url: string;
  youtubeId?: string;
  duration?: string;
  summary: string;
}

export interface TheorySection {
  title: string;
  explanation: string;
  codeSnippet?: string;
  codeLanguage?: 'kotlin' | 'sql';
  outputSnippet?: string; // Terminal stdout or query results table
  byteTip?: string;
  pitfallTip?: string; // Error común de principiantes y cómo evitarlo
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
  analogy?: string; // Analogía intuitiva del mundo real para entender a la primera
  video?: VideoResource; // Recurso en video recomendado y curado
  sections: TheorySection[];
}
