import { Unit, Lesson } from '../types/lesson';
import { LearningPath } from '../types/user';

import { KOTLIN_UNIT_01_LESSONS } from './kotlin/unit_01';
import { KOTLIN_UNIT_02_LESSONS } from './kotlin/unit_02';
import { KOTLIN_UNIT_03_LESSONS } from './kotlin/unit_03';
import { KOTLIN_UNIT_04_LESSONS } from './kotlin/unit_04';
import { KOTLIN_UNIT_05_LESSONS } from './kotlin/unit_05';
import { KOTLIN_UNIT_06_LESSONS } from './kotlin/unit_06';
import { KOTLIN_UNIT_07_LESSONS } from './kotlin/unit_07';
import { KOTLIN_UNIT_08_LESSONS } from './kotlin/unit_08';
import { KOTLIN_UNIT_09_LESSONS } from './kotlin/unit_09';
import { KOTLIN_UNIT_10_LESSONS } from './kotlin/unit_10';
import { KOTLIN_UNIT_11_LESSONS } from './kotlin/unit_11';
import { KOTLIN_UNIT_12_LESSONS } from './kotlin/unit_12';

import { SQL_UNIT_01_LESSONS } from './sql/unit_01';
import { SQL_UNIT_02_LESSONS } from './sql/unit_02';
import { SQL_UNIT_03_LESSONS } from './sql/unit_03';
import { SQL_UNIT_04_LESSONS } from './sql/unit_04';
import { SQL_UNIT_05_LESSONS } from './sql/unit_05';
import { SQL_UNIT_06_LESSONS } from './sql/unit_06';
import { SQL_UNIT_07_LESSONS } from './sql/unit_07';
import { SQL_UNIT_08_LESSONS } from './sql/unit_08';
import { SQL_UNIT_09_LESSONS } from './sql/unit_09';
import { SQL_UNIT_10_LESSONS } from './sql/unit_10';
import { SQL_UNIT_11_LESSONS } from './sql/unit_11';
import { SQL_UNIT_12_LESSONS } from './sql/unit_12';
import { SQL_UNIT_13_LESSONS } from './sql/unit_13';

// Mapeo global de todas las lecciones por ID
export const ALL_LESSONS: Record<string, Lesson> = {};

KOTLIN_UNIT_01_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_02_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_03_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_04_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_05_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_06_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_07_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_08_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_09_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_10_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_11_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
KOTLIN_UNIT_12_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });

SQL_UNIT_01_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_02_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_03_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_04_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_05_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_06_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_07_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_08_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_09_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_10_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_11_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_12_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });
SQL_UNIT_13_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });

export const UNITS_KOTLIN: Unit[] = [
  {
    id: 1,
    title: "Pensamiento lógico y primeros programas",
    description: "Comprende el propósito del software, el modelo Entrada-Proceso-Salida, algoritmos ordenados, diagramas de flujo interactivos, pseudocódigo estructurado, secuencias lineales, traza manual de instrucciones, la función fun main(), print/println y comentarios en el código.",
    icon: "Brain",
    color: "#06B6D4",
    stage: "ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA",
    lessons: KOTLIN_UNIT_01_LESSONS
  },
  {
    id: 2,
    title: "Variables y tipos de datos",
    description: "Aprende a declarar variables con val y var, inmutabilidad, tipos primitivos (Int, Double, Boolean, Char, String), inferencia de tipos, nombres descriptivos en camelCase e interpolación de variables.",
    icon: "Layers",
    color: "#3B82F6",
    stage: "ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA",
    lessons: KOTLIN_UNIT_02_LESSONS
  },
  {
    id: 3,
    title: "Operadores y expresiones",
    description: "Domina los operadores aritméticos (+, -, *, /, %), división entera frente a decimal, comparaciones relacionales (==, !=, <, >, <=, >=), operadores lógicos (&&, ||, !), precedencia con paréntesis, asignaciones compuestas (+=, -=) y conversiones numéricas explícitas.",
    icon: "Cpu",
    color: "#8B5CF6",
    stage: "ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA",
    lessons: KOTLIN_UNIT_03_LESSONS
  },
  {
    id: 4,
    title: "Estructuras de decisión",
    description: "Aprende a controlar el flujo de tu programa mediante decisiones simples con if, alternativas binarias con else, encadenamiento múltiple con else if, selección exhaustiva con when, intervalos in y el uso de if y when como expresiones que devuelven valor.",
    icon: "GitFork",
    color: "#F59E0B",
    stage: "ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA",
    lessons: KOTLIN_UNIT_04_LESSONS
  },
  {
    id: 5,
    title: "Estructuras de repetición",
    description: "Aprende a automatizar tareas repetitivas mediante ciclos for, rangos con step y downTo, bucles while y do-while, manejo de contadores y acumuladores, control con break y continue, y prevención de bucles infinitos.",
    icon: "Repeat",
    color: "#10B981",
    stage: "ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA",
    lessons: KOTLIN_UNIT_05_LESSONS
  },
  {
    id: 6,
    title: "Funciones",
    description: "Aprende a estructurar código modular mediante la declaración e invocación de funciones (fun), paso de parámetros y argumentos, valores de retorno con return, funciones Unit, parámetros predeterminados, argumentos con nombre, alcance de variables locales y división de problemas complejos.",
    icon: "Terminal",
    color: "#0284C7",
    stage: "ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA",
    lessons: KOTLIN_UNIT_06_LESSONS
  },
  {
    id: 7,
    title: "Conversiones y valores nulos",
    description: "Diferencia entre texto y valor numérico, conversiones seguras con toIntOrNull/toDoubleOrNull, significado de null, tipos anulables (String?, Int?), comprobación de nulos, acceso seguro ?., operador Elvis ?: y riesgos de !!.",
    icon: "ShieldAlert",
    color: "#6366F1",
    stage: "ETAPA II. TRABAJAR CON INFORMACIÓN Y ESTRUCTURAS",
    lessons: KOTLIN_UNIT_07_LESSONS
  },
  {
    id: 8,
    title: "Procesamiento de texto",
    description: "Longitud y acceso a caracteres, texto vacío vs con espacios, trim(), mayúsculas y minúsculas, contains/startsWith/endsWith, split/join y validación de cadenas.",
    icon: "AlignLeft",
    color: "#14B8A6",
    stage: "ETAPA II. TRABAJAR CON INFORMACIÓN Y ESTRUCTURAS",
    lessons: KOTLIN_UNIT_08_LESSONS
  },
  {
    id: 9,
    title: "Arreglos y Colecciones",
    description: "Arreglos (Arrays) de tamaño fijo, vectores y matrices, listas y acceso por índice, List vs MutableList, agregar/modificar/eliminar, conjuntos Set sin duplicados, diccionarios Map y selección de colecciones.",
    icon: "ListFilter",
    color: "#E11D48",
    stage: "ETAPA II. TRABAJAR CON INFORMACIÓN Y ESTRUCTURAS",
    lessons: KOTLIN_UNIT_09_LESSONS
  },
  {
    id: 10,
    title: "Clases y objetos",
    description: "Diferencia entre clase y objeto, propiedades y estado, constructores e inicialización, métodos, múltiples instancias, encapsulación con private, data class y colecciones de objetos.",
    icon: "Package",
    color: "#84CC16",
    stage: "ETAPA II. TRABAJAR CON INFORMACIÓN Y ESTRUCTURAS",
    lessons: KOTLIN_UNIT_10_LESSONS
  },
  {
    id: 11,
    title: "Operaciones sobre colecciones y lambdas",
    description: "Qué es una lambda y cómo leerla, filtrado con filter, transformación con map, búsqueda con find, comprobación con any/all, ordenamiento con sortedBy y resúmenes con count y sumOf.",
    icon: "Sparkles",
    color: "#F97316",
    stage: "ETAPA III. RESOLVER PROBLEMAS CON AUTONOMÍA",
    lessons: KOTLIN_UNIT_11_LESSONS
  },
  {
    id: 12,
    title: "Errores y depuración",
    description: "Errores de sintaxis, ejecución y lógica, lectura de mensajes de error, seguimiento de variables paso a paso, excepciones con try y catch, validación vs excepción y casos límite.",
    icon: "Bug",
    color: "#0EA5E9",
    stage: "ETAPA III. RESOLVER PROBLEMAS CON AUTONOMÍA",
    lessons: KOTLIN_UNIT_12_LESSONS
  }
];

export const UNITS_SQL: Unit[] = [
  {
    id: 1,
    title: "Fundamentos de bases de datos",
    description: "Datos e información, qué es una base de datos y para qué sirve, bases de datos relacionales, tablas, columnas y filas, estructura frente a registros y diferencia entre SQL y SQLite.",
    icon: "Database",
    color: "#3B82F6",
    stage: "ETAPA I. COMPRENDER Y ESTRUCTURAR UNA BASE DE DATOS",
    lessons: SQL_UNIT_01_LESSONS
  },
  {
    id: 2,
    title: "Modelado de información y relaciones",
    description: "Entidades y atributos, selección de datos necesarios, llave primaria (PK), llave foránea (FK), relaciones 1:1, 1:N, N:M con tablas intermedias y diagramas con Estudiante, Asignatura y Matrícula.",
    icon: "Network",
    color: "#06B6D4",
    stage: "ETAPA I. COMPRENDER Y ESTRUCTURAR UNA BASE DE DATOS",
    lessons: SQL_UNIT_02_LESSONS
  },
  {
    id: 3,
    title: "Tipos de datos y CREATE TABLE",
    description: "Estructura de CREATE TABLE, nombres de tablas y columnas, INTEGER, REAL, TEXT, reconocimiento de BLOB, booleanos y fechas en SQLite y flexibilidad de tipos.",
    icon: "Table",
    color: "#10B981",
    stage: "ETAPA I. COMPRENDER Y ESTRUCTURAR UNA BASE DE DATOS",
    lessons: SQL_UNIT_03_LESSONS
  },
  {
    id: 4,
    title: "Llaves y restricciones",
    description: "PRIMARY KEY, INTEGER PRIMARY KEY autoincremental, FOREIGN KEY y REFERENCES, NOT NULL, UNIQUE, CHECK, DEFAULT y diferencias entre NULL, cero, texto vacío y valor predeterminado.",
    icon: "Key",
    color: "#F59E0B",
    stage: "ETAPA I. COMPRENDER Y ESTRUCTURAR UNA BASE DE DATOS",
    lessons: SQL_UNIT_04_LESSONS
  },
  {
    id: 5,
    title: "Inserción de registros",
    description: "INSERT INTO con columnas explícitas, correspondencia entre columnas y valores, inserción múltiple, entrecomillado, valores nulos y predeterminados, orden de inserción y errores por restricciones.",
    icon: "ArrowDownToLine",
    color: "#8B5CF6",
    stage: "ETAPA I. COMPRENDER Y ESTRUCTURAR UNA BASE DE DATOS",
    lessons: SQL_UNIT_05_LESSONS
  },
  {
    id: 6,
    title: "Consultas básicas",
    description: "SELECT ... FROM, comodín *, selección puntual de columnas, alias con AS, columnas calculadas, DISTINCT y cómo interpretar el conjunto de resultados.",
    icon: "Search",
    color: "#EC4899",
    stage: "ETAPA II. CONSULTAR Y MANTENER INFORMACIÓN",
    lessons: SQL_UNIT_06_LESSONS
  },
  {
    id: 7,
    title: "Filtros, búsquedas y ordenamiento",
    description: "WHERE y comparaciones relacionales, lógica AND/OR/NOT, paréntesis, BETWEEN, IN, LIKE con % y _, IS NULL / IS NOT NULL, ORDER BY y LIMIT.",
    icon: "Filter",
    color: "#14B8A6",
    stage: "ETAPA II. CONSULTAR Y MANTENER INFORMACIÓN",
    lessons: SQL_UNIT_07_LESSONS
  },
  {
    id: 8,
    title: "Actualización y eliminación",
    description: "UPDATE y SET, actualizar múltiples columnas, DELETE, uso crítico de WHERE para delimitar cambios, consecuencias de omitir WHERE y diferencia entre DELETE y DROP TABLE.",
    icon: "Edit",
    color: "#EF4444",
    stage: "ETAPA II. CONSULTAR Y MANTENER INFORMACIÓN",
    lessons: SQL_UNIT_08_LESSONS
  },
  {
    id: 9,
    title: "Consultas entre tablas",
    description: "Propósito de los JOIN, INNER JOIN, condiciones de unión con ON, alias de tablas y columnas calificadas, consultas sobre 3 tablas y LEFT JOIN.",
    icon: "Layers",
    color: "#6366F1",
    stage: "ETAPA II. CONSULTAR Y MANTENER INFORMACIÓN",
    lessons: SQL_UNIT_09_LESSONS
  },
  {
    id: 10,
    title: "Agregaciones y agrupaciones",
    description: "Funciones COUNT, SUM, AVG, MIN, MAX, COUNT(*) frente a COUNT(columna), tratamiento de NULL, GROUP BY, filtrado de grupos con HAVING y agrupaciones con JOIN.",
    icon: "BarChart3",
    color: "#F97316",
    stage: "ETAPA II. CONSULTAR Y MANTENER INFORMACIÓN",
    lessons: SQL_UNIT_10_LESSONS
  },
  {
    id: 11,
    title: "Funciones y subconsultas",
    description: "Funciones de texto (LENGTH, TRIM, UPPER, LOWER), numéricas (ROUND), COALESCE, CASE, funciones de fecha y subconsultas con IN o escalares.",
    icon: "Code",
    color: "#A855F7",
    stage: "ETAPA III. PROFUNDIZAR Y PROTEGER LA INFORMACIÓN",
    lessons: SQL_UNIT_11_LESSONS
  },
  {
    id: 12,
    title: "Integridad referencial y transacciones",
    description: "Activación de llaves foráneas con PRAGMA foreign_keys, prevención de referencias inexistentes, acciones ON DELETE/ON UPDATE (CASCADE, SET NULL), transacciones ACID y BEGIN, COMMIT, ROLLBACK.",
    icon: "Shield",
    color: "#0284C7",
    stage: "ETAPA III. PROFUNDIZAR Y PROTEGER LA INFORMACIÓN",
    lessons: SQL_UNIT_12_LESSONS
  },
  {
    id: 13,
    title: "Buen diseño y seguridad básica",
    description: "Duplicación de datos y anomalías de actualización/borrado, normalización 1FN, 2FN y 3FN, ALTER TABLE, DROP TABLE, introducción a vistas e índices e inyección SQL.",
    icon: "ShieldCheck",
    color: "#059669",
    stage: "ETAPA III. PROFUNDIZAR Y PROTEGER LA INFORMACIÓN",
    lessons: SQL_UNIT_13_LESSONS
  }
];

export const getUnitsByPath = (path: LearningPath): Unit[] => {
  return path === 'kotlin' ? UNITS_KOTLIN : UNITS_SQL;
};

export const getLessonById = (id: string): Lesson | undefined => {
  return ALL_LESSONS[id];
};
