export interface KotlinFile {
  id: string;
  name: string;
  content: string;
}

export interface KotlinCompilerError {
  fileName: string;
  line: number;
  column: number;
  message: string;
  severity: 'ERROR' | 'WARNING';
}

export interface KotlinStackTraceElement {
  className: string;
  methodName: string;
  fileName: string;
  lineNumber: number;
}

export interface KotlinRuntimeException {
  message: string;
  fullName: string;
  stackTrace: KotlinStackTraceElement[];
}

export interface KotlinRunResult {
  output: string;
  rawText: string;
  errors: KotlinCompilerError[];
  exception: KotlinRuntimeException | null;
  executionTimeMs: number;
  success: boolean;
  compilerVersion: string;
}

export interface KotlinTestCase {
  description: string;
  expectedOutputSubstring?: string;
  forbiddenOutputSubstring?: string;
  regexMatch?: string;
  codePattern?: string; // Regex string to test against the source code
  codeRequiredPatternDescription?: string;
}

export interface KotlinExercise {
  id: string;
  title: string;
  unitId: number;
  unitTitle: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  objectives: string[];
  hints: string[];
  initialCode: string;
  solutionCode?: string;
  testCases: KotlinTestCase[];
  defaultArgs?: string;
}

export interface KotlinAutoCheckItem {
  description: string;
  passed: boolean;
  details?: string;
}

export interface KotlinAutoCheckResult {
  passed: boolean;
  score: number;
  maxScore: number;
  checks: KotlinAutoCheckItem[];
}
