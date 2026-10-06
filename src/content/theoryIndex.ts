import { TheoryLesson } from '../types/theory';
import { KOTLIN_UNIT_01_THEORY } from './kotlin/unit_01/theory';
import { KOTLIN_UNIT_02_THEORY } from './kotlin/unit_02/theory';
import { KOTLIN_UNIT_03_THEORY } from './kotlin/unit_03/theory';
import { SQL_UNIT_01_THEORY } from './sql/unit_01/theory';
import { SQL_UNIT_02_THEORY } from './sql/unit_02/theory';
import { SQL_UNIT_03_THEORY } from './sql/unit_03/theory';

export const ALL_THEORY: Record<string, TheoryLesson> = {
  ...KOTLIN_UNIT_01_THEORY,
  ...KOTLIN_UNIT_02_THEORY,
  ...KOTLIN_UNIT_03_THEORY,
  ...SQL_UNIT_01_THEORY,
  ...SQL_UNIT_02_THEORY,
  ...SQL_UNIT_03_THEORY
};

export const getTheoryByLessonId = (lessonId: string): TheoryLesson | undefined => {
  return ALL_THEORY[lessonId];
};

export const getTheoriesByPath = (path: 'kotlin' | 'sql'): Record<string, TheoryLesson> => {
  const result: Record<string, TheoryLesson> = {};
  Object.values(ALL_THEORY).forEach(th => {
    if (th.pathId === path) {
      result[th.lessonId] = th;
    }
  });
  return result;
};
