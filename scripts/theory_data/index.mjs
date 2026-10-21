// Índice maestro de teoría enriquecida para Kotlin y SQL
// Redactado en español latinoamericano (es-419) pedagógico, claro y nutritivo
// Modelado según las guías oficiales de Android Developers (https://developer.android.com/kotlin/learn?hl=es-419)

import { KOTLIN_THEORY_U01_U03 } from './kotlin_u01_u03.mjs';
import { KOTLIN_THEORY_U04_U06 } from './kotlin_u04_u06.mjs';
import { KOTLIN_THEORY_U07_U09 } from './kotlin_u07_u09.mjs';
import { KOTLIN_THEORY_U10_U12 } from './kotlin_u10_u12.mjs';

import { SQL_THEORY_U01_U04 } from './sql_u01_u04.mjs';
import { SQL_THEORY_U05_U08 } from './sql_u05_u08.mjs';
import { SQL_THEORY_U07_U08 } from './sql_u07_u08.mjs';
import { SQL_THEORY_U09_U10 } from './sql_u09_u10.mjs';
import { SQL_THEORY_U11_U13 } from './sql_u11_u13.mjs';

export const ALL_ENRICHED_THEORY = {
  ...KOTLIN_THEORY_U01_U03,
  ...KOTLIN_THEORY_U04_U06,
  ...KOTLIN_THEORY_U07_U09,
  ...KOTLIN_THEORY_U10_U12,

  ...SQL_THEORY_U01_U04,
  ...SQL_THEORY_U05_U08,
  ...SQL_THEORY_U07_U08,
  ...SQL_THEORY_U09_U10,
  ...SQL_THEORY_U11_U13
};

export const KOTLIN_THEORY = {
  ...KOTLIN_THEORY_U01_U03,
  ...KOTLIN_THEORY_U04_U06,
  ...KOTLIN_THEORY_U07_U09,
  ...KOTLIN_THEORY_U10_U12
};

export const SQL_THEORY = {
  ...SQL_THEORY_U01_U04,
  ...SQL_THEORY_U05_U08,
  ...SQL_THEORY_U07_U08,
  ...SQL_THEORY_U09_U10,
  ...SQL_THEORY_U11_U13
};
