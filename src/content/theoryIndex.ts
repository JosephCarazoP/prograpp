import { TheoryLesson } from '../types/theory';

import { KOTLIN_UNIT_01_THEORY } from './kotlin/unit_01/theory';
import { KOTLIN_UNIT_02_THEORY } from './kotlin/unit_02/theory';
import { KOTLIN_UNIT_03_THEORY } from './kotlin/unit_03/theory';
import { KOTLIN_UNIT_04_THEORY } from './kotlin/unit_04/theory';
import { KOTLIN_UNIT_05_THEORY } from './kotlin/unit_05/theory';
import { KOTLIN_UNIT_06_THEORY } from './kotlin/unit_06/theory';
import { KOTLIN_UNIT_07_THEORY } from './kotlin/unit_07/theory';
import { KOTLIN_UNIT_08_THEORY } from './kotlin/unit_08/theory';
import { KOTLIN_UNIT_09_THEORY } from './kotlin/unit_09/theory';
import { KOTLIN_UNIT_10_THEORY } from './kotlin/unit_10/theory';
import { KOTLIN_UNIT_11_THEORY } from './kotlin/unit_11/theory';
import { KOTLIN_UNIT_12_THEORY } from './kotlin/unit_12/theory';

import { SQL_UNIT_01_THEORY } from './sql/unit_01/theory';
import { SQL_UNIT_02_THEORY } from './sql/unit_02/theory';
import { SQL_UNIT_03_THEORY } from './sql/unit_03/theory';
import { SQL_UNIT_04_THEORY } from './sql/unit_04/theory';
import { SQL_UNIT_05_THEORY } from './sql/unit_05/theory';
import { SQL_UNIT_06_THEORY } from './sql/unit_06/theory';
import { SQL_UNIT_07_THEORY } from './sql/unit_07/theory';
import { SQL_UNIT_08_THEORY } from './sql/unit_08/theory';
import { SQL_UNIT_09_THEORY } from './sql/unit_09/theory';
import { SQL_UNIT_10_THEORY } from './sql/unit_10/theory';
import { SQL_UNIT_11_THEORY } from './sql/unit_11/theory';
import { SQL_UNIT_12_THEORY } from './sql/unit_12/theory';
import { SQL_UNIT_13_THEORY } from './sql/unit_13/theory';

export const ALL_THEORY: Record<string, TheoryLesson> = {
  ...KOTLIN_UNIT_01_THEORY,
  ...KOTLIN_UNIT_02_THEORY,
  ...KOTLIN_UNIT_03_THEORY,
  ...KOTLIN_UNIT_04_THEORY,
  ...KOTLIN_UNIT_05_THEORY,
  ...KOTLIN_UNIT_06_THEORY,
  ...KOTLIN_UNIT_07_THEORY,
  ...KOTLIN_UNIT_08_THEORY,
  ...KOTLIN_UNIT_09_THEORY,
  ...KOTLIN_UNIT_10_THEORY,
  ...KOTLIN_UNIT_11_THEORY,
  ...KOTLIN_UNIT_12_THEORY,
  ...SQL_UNIT_01_THEORY,
  ...SQL_UNIT_02_THEORY,
  ...SQL_UNIT_03_THEORY,
  ...SQL_UNIT_04_THEORY,
  ...SQL_UNIT_05_THEORY,
  ...SQL_UNIT_06_THEORY,
  ...SQL_UNIT_07_THEORY,
  ...SQL_UNIT_08_THEORY,
  ...SQL_UNIT_09_THEORY,
  ...SQL_UNIT_10_THEORY,
  ...SQL_UNIT_11_THEORY,
  ...SQL_UNIT_12_THEORY,
  ...SQL_UNIT_13_THEORY,
};

export const getTheoryByLessonId = (lessonId: string): TheoryLesson | undefined => {
  return ALL_THEORY[lessonId];
};

export const getTheoriesByPath = (pathId: 'kotlin' | 'sql'): Record<string, TheoryLesson> => {
  const result: Record<string, TheoryLesson> = {};
  for (const [key, value] of Object.entries(ALL_THEORY)) {
    if (value.pathId === pathId) {
      result[key] = value;
    }
  }
  return result;
};
