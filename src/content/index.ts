import { Unit, Lesson } from '../types/lesson';
import { LearningPath } from '../types/user';

import { KOTLIN_UNIT_01_LESSONS } from './kotlin/unit_01';
import { KOTLIN_UNIT_02_LESSONS } from './kotlin/unit_02';
import { KOTLIN_UNIT_03_LESSONS } from './kotlin/unit_03';
import { SQL_UNIT_01_LESSONS } from './sql/unit_01';
import { SQL_UNIT_02_LESSONS } from './sql/unit_02';
import { SQL_UNIT_03_LESSONS } from './sql/unit_03';

// Mapeo global de todas las lecciones por ID
export const ALL_LESSONS: Record<string, Lesson> = {};

KOTLIN_UNIT_01_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_02_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_03_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_01_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_02_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_03_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });

export const UNITS_KOTLIN: Unit[] = [
  {
    id: 1,
    title: 'Pensamiento Computacional & Algoritmos',
    description: 'Secuencias lógicas, salida en terminal, variables y operadores (20 niveles).',
    icon: 'Brain',
    color: '#06B6D4',
    lessons: KOTLIN_UNIT_01_LESSONS
  },
  {
    id: 2,
    title: 'Variables, Constantes y Tipos de Datos',
    description: 'Inmutabilidad con val, tipos numéricos, String templates y nulabilidad segura (20 niveles).',
    icon: 'Layers',
    color: '#3B82F6',
    lessons: KOTLIN_UNIT_02_LESSONS
  },
  {
    id: 3,
    title: 'Operadores y Expresiones Lógicas',
    description: 'Aritmética, asignación compuesta, tablas de verdad y cortocircuito (20 niveles).',
    icon: 'Cpu',
    color: '#8B5CF6',
    lessons: KOTLIN_UNIT_03_LESSONS
  }
];

export const UNITS_SQL: Unit[] = [
  {
    id: 1,
    title: 'Fundamentos de Bases de Datos Relacionales',
    description: 'Tablas, filas, columnas, SELECT, filtros WHERE y operadores (20 niveles).',
    icon: 'Database',
    color: '#3B82F6',
    lessons: SQL_UNIT_01_LESSONS
  },
  {
    id: 2,
    title: 'Consultas Esenciales (SELECT y FROM)',
    description: 'Proyección de datos, columnas calculadas, alias con AS, DISTINCT y LIMIT (20 niveles).',
    icon: 'Search',
    color: '#10B981',
    lessons: SQL_UNIT_02_LESSONS
  },
  {
    id: 3,
    title: 'Filtrado Preciso de Datos (WHERE)',
    description: 'Operadores relacionales, lógica AND/OR, BETWEEN, IN, trampa de nulos y LIKE (20 niveles).',
    icon: 'Filter',
    color: '#F59E0B',
    lessons: SQL_UNIT_03_LESSONS
  }
];

export const getUnitsByPath = (path: LearningPath): Unit[] => {
  return path === 'kotlin' ? UNITS_KOTLIN : UNITS_SQL;
};

export const getLessonById = (id: string): Lesson | undefined => {
  return ALL_LESSONS[id];
};
