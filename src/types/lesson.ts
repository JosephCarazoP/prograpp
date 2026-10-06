import { LearningPath } from './user';

export type ExerciseType =
  | 'code_builder'      // Banco de tokens para armar sentencias
  | 'spot_the_bug'      // Tocar la línea con el error de sintaxis/lógica
  | 'predict_output'    // Consola de salida esperada tras evaluar código
  | 'matching_pairs'    // Parejas en cascada (concepto <-> código)
  | 'code_cloze'        // Completar huecos con opciones o teclado de símbolos
  | 'trace_step'        // Trazabilidad de variables en bucles
  | 'parsons_puzzle'    // Reordenar bloques de código desordenados
  | 'boss_fight';       // Jefe de unidad (depuración integral)

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  hint?: string;
  explanation: string;
  xpReward: number;
}

// 1. Banco de tokens
export interface CodeBuilderExercise extends BaseExercise {
  type: 'code_builder';
  tokens: string[];
  solution: string[];
  acceptableAlternatives?: string[][];
}

// 2. Caza de errores
export interface SpotTheBugExercise extends BaseExercise {
  type: 'spot_the_bug';
  codeSnippet: string[];
  bugLineIndex: number; // 0-indexed
  options?: string[]; // Explicación de la solución
  correctOptionIndex?: number;
}

// 3. Predicción de consola
export interface PredictOutputExercise extends BaseExercise {
  type: 'predict_output';
  code: string;
  options: string[];
  correctOptionIndex: number;
}

// 4. Parejas en cascada
export interface MatchingPairsExercise extends BaseExercise {
  type: 'matching_pairs';
  pairs: {
    left: string;
    right: string;
  }[];
}

// 5. Completar huecos
export interface CodeClozeExercise extends BaseExercise {
  type: 'code_cloze';
  codeWithBlank: string; // ej: "if (edad ___ 18) {"
  options: string[];
  correctOption: string;
}

// 6. Trazabilidad
export interface TraceStepExercise extends BaseExercise {
  type: 'trace_step';
  code: string;
  iterations: {
    iteration: number;
    expectedVariables: Record<string, string>;
  }[];
}

// 7. Parson's puzzle (reordenamiento)
export interface ParsonsPuzzleExercise extends BaseExercise {
  type: 'parsons_puzzle';
  lines: string[];
  correctOrder: number[]; // Índices en orden correcto
}

// 8. Jefe de unidad
export interface BossFightExercise extends BaseExercise {
  type: 'boss_fight';
  bossName: string;
  bossHp: number;
  stages: BaseExercise[];
}

export type Exercise =
  | CodeBuilderExercise
  | SpotTheBugExercise
  | PredictOutputExercise
  | MatchingPairsExercise
  | CodeClozeExercise
  | TraceStepExercise
  | ParsonsPuzzleExercise
  | BossFightExercise;

export interface Lesson {
  id: string;
  path: LearningPath;
  unit: number;
  level: number;
  title: string;
  description: string;
  exercises: Exercise[];
  requiredStarsForUnlock?: number;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  bossLesson?: Lesson;
}
