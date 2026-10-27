import { LearningPath } from './user';

export type SqliteExerciseType = 'free_sql' | 'button_programming';

export interface SqliteFieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date';
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
}

export interface SqliteButtonConfig {
  id: string;
  label: string;
  actionType: 'insert' | 'select' | 'update' | 'delete' | 'custom';
  description: string;
  hint?: string;
  defaultSqlTemplate?: string;
}

export interface SqliteEvaluationCriteria {
  requiredTables?: string[];
  requiredColumns?: { table: string; column: string; type?: string }[];
  verificationQueries?: {
    description: string;
    sql: string;
    expectedMinRows?: number;
    expectedExactRows?: number;
    expectedColumns?: string[];
  }[];
}

export interface SqliteExercise {
  id: string;
  title: string;
  description: string;
  type: SqliteExerciseType;
  difficulty: 'easy' | 'medium' | 'hard';
  pathId: LearningPath;
  unitId?: number;
  initialSql?: string; // Script inicial DDL/DML
  objectives: string[];
  hints: string[];
  evaluationCriteria?: SqliteEvaluationCriteria;
  // Específico para modo 'button_programming'
  buttonConfig?: {
    entityName: string;
    fields: SqliteFieldDefinition[];
    buttons: SqliteButtonConfig[];
  };
  assignedToUids: string[]; // 'all' o lista de UIDs
  assignedGroup?: string;
  createdBy: string;
  createdAt: number;
}

export interface SqliteSubmission {
  id: string;
  exerciseId: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
  studentGroup?: string;
  sqlCode: string; // Código SQL final del estudiante (o mapa de botones)
  buttonSqlMap?: Record<string, string>; // En caso de programar botones
  dbBase64?: string; // Snapshot de la base de datos resultante
  submittedAt: number;
  status: 'submitted' | 'graded';
  score?: number;
  maxScore: number;
  feedback?: string;
  autoCheckResults?: {
    passed: boolean;
    checks: { description: string; passed: boolean; details?: string }[];
  };
}

export interface SqliteQueryResult {
  columns: string[];
  values: any[][];
  rowsAffected: number;
  executionTimeMs: number;
  error?: string;
}

export interface TableColumnInfo {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: any;
  pk: number;
}

export interface TableForeignKeyInfo {
  id: number;
  seq: number;
  table: string;
  from: string;
  to: string;
  on_update: string;
  on_delete: string;
  match: string;
}

export interface TableSchemaInfo {
  name: string;
  type: 'table' | 'view';
  columns: TableColumnInfo[];
  foreignKeys: TableForeignKeyInfo[];
  rowCount: number;
  sql?: string;
}
