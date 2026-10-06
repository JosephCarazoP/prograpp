import { EvaluationQuestion } from '../types/academic';
import { LearningPath } from '../types/user';

export interface EvaluationInstrument {
  instrumentId: string;
  version: string;
  pathId: LearningPath;
  type: 'diagnostic' | 'final';
  title: string;
  description: string;
  maxTotalScore: number;
  questions: EvaluationQuestion[];
}

// ─── 1. INSTRUMENTOS ESTANDARIZADOS Y EQUIVALENTES DE KOTLIN ───

export const KOTLIN_DIAGNOSTIC_INSTRUMENT: EvaluationInstrument = {
  instrumentId: 'inst_kotlin_diag_v1',
  version: '1.0.0',
  pathId: 'kotlin',
  type: 'diagnostic',
  title: 'Evaluación Diagnóstica: Fundamentos de Kotlin y Lógica',
  description: 'Instrumento inicial para determinar el nivel previo en variables, condicionales, bucles y funciones.',
  maxTotalScore: 25,
  questions: [
    {
      questionId: 'k_diag_q1',
      topic: 'Variables y Mutabilidad',
      prompt: '¿Cuál es la diferencia fundamental entre una variable declarada con `val` y una con `var` en Kotlin?',
      type: 'multiple_choice',
      options: [
        'val es de solo lectura (inmutable) y var es mutable.',
        'val solo admite números enteros y var admite cualquier tipo.',
        'val es una variable global y var solo existe dentro de funciones.',
        'No hay ninguna diferencia, son alias equivalentes.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Identifica correctamente la inmutabilidad de val frente a var.',
      maxScore: 5
    },
    {
      questionId: 'k_diag_q2',
      topic: 'Estructuras Condicionales',
      prompt: 'Dado el siguiente código:\n```kotlin\nval nota = 85\nval resultado = if (nota >= 90) "A" else if (nota >= 80) "B" else "C"\n```\n¿Qué valor se asigna a `resultado`?',
      type: 'multiple_choice',
      options: ['"A"', '"B"', '"C"', 'Error de compilación'],
      correctOptionIndex: 1,
      rubricCriteria: 'Evalúa correctamente la rama condicional encadenada.',
      maxScore: 5
    },
    {
      questionId: 'k_diag_q3',
      topic: 'Bucles y Trazabilidad',
      prompt: 'Analiza el bucle:\n```kotlin\nvar suma = 0\nfor (i in 1..4) {\n  suma += i\n}\n```\n¿Cuál es el valor final de la variable `suma` al terminar el ciclo?',
      type: 'open_answer',
      rubricCriteria: 'El valor correcto es 10 (1 + 2 + 3 + 4). Asignar 5 pts si es 10; 0 si es erróneo.',
      maxScore: 5
    },
    {
      questionId: 'k_diag_q4',
      topic: 'Funciones y Retorno',
      prompt: 'Escribe una función en Kotlin llamada `esPar` que reciba un número entero `n: Int` y retorne `true` si es par, o `false` si es impar.',
      type: 'code',
      rubricCriteria: 'Sintaxis de función válida: `fun esPar(n: Int): Boolean = n % 2 == 0` o equivalente con if. Calificar lógica de residuo módulo y tipado.',
      maxScore: 5
    },
    {
      questionId: 'k_diag_q5',
      topic: 'Algoritmos y Pseudocódigo',
      prompt: 'Describe en pseudocódigo o pasos lógicos cómo encontrarías el valor mayor en una lista de 5 números desordenados.',
      type: 'pseudocode',
      rubricCriteria: 'Declara variable pivote (ej: mayor = lista[0]), itera sobre los elementos restantes, compara y actualiza si el elemento actual es mayor. Retorna el mayor.',
      maxScore: 5
    }
  ]
};

export const KOTLIN_FINAL_INSTRUMENT: EvaluationInstrument = {
  instrumentId: 'inst_kotlin_final_v1',
  version: '1.0.0',
  pathId: 'kotlin',
  type: 'final',
  title: 'Prueba Final: Dominio de Kotlin y Lógica de Programación',
  description: 'Instrumento equivalente al diagnóstico para medir la ganancia de aprendizaje.',
  maxTotalScore: 25,
  questions: [
    {
      questionId: 'k_fin_q1',
      topic: 'Variables y Mutabilidad',
      prompt: 'Si intentamos compilar:\n```kotlin\nval puntuacion = 100\npuntuacion = 150\n```\n¿Qué ocurrirá en Kotlin y por qué?',
      type: 'multiple_choice',
      options: [
        'Error de compilación: val no puede ser reasignado.',
        'La variable puntuacion cambiará su valor a 150 con advertencia.',
        'Se creará una nueva variable oculta con el mismo nombre.',
        'El compilador convertirá automáticamente la variable a var.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Demuestra comprensión estricta de la inmutabilidad de val.',
      maxScore: 5
    },
    {
      questionId: 'k_fin_q2',
      topic: 'Estructuras Condicionales',
      prompt: 'Dado el siguiente bloque `when`:\n```kotlin\nval categoria = 2\nval descuento = when (categoria) {\n  1 -> 10\n  2, 3 -> 20\n  else -> 0\n}\n```\n¿Cuál es el valor numérico de `descuento`?',
      type: 'multiple_choice',
      options: ['10', '20', '0', '30'],
      correctOptionIndex: 1,
      rubricCriteria: 'Evalúa adecuadamente la selección múltiple en Kotlin.',
      maxScore: 5
    },
    {
      questionId: 'k_fin_q3',
      topic: 'Bucles y Trazabilidad',
      prompt: 'Analiza el siguiente bucle decreciente con `step`:\n```kotlin\nvar total = 0\nfor (i in 6 downTo 2 step 2) {\n  total += i\n}\n```\n¿Cuál es el valor final de `total`?',
      type: 'open_answer',
      rubricCriteria: 'El valor es 12 (6 + 4 + 2). Asignar 5 pts si es 12.',
      maxScore: 5
    },
    {
      questionId: 'k_fin_q4',
      topic: 'Funciones y Retorno',
      prompt: 'Escribe una función en Kotlin llamada `calcularPromedio` que reciba dos parámetros flotantes `nota1: Double` y `nota2: Double` y retorne el promedio de ambos.',
      type: 'code',
      rubricCriteria: 'Definición de función correcta: `fun calcularPromedio(nota1: Double, nota2: Double): Double = (nota1 + nota2) / 2.0`. Evalúa tipos y operador.',
      maxScore: 5
    },
    {
      questionId: 'k_fin_q5',
      topic: 'Algoritmos y Pseudocódigo',
      prompt: 'Explica en pseudocódigo o pasos claros cómo contar cuántos números positivos existen dentro de un arreglo o lista de números enteros.',
      type: 'pseudocode',
      rubricCriteria: 'Inicializa contador en 0, recorre la colección, evalúa condición (`num > 0`), incrementa contador y retorna el resultado.',
      maxScore: 5
    }
  ]
};

// ─── 2. INSTRUMENTOS ESTANDARIZADOS Y EQUIVALENTES DE SQL ───

export const SQL_DIAGNOSTIC_INSTRUMENT: EvaluationInstrument = {
  instrumentId: 'inst_sql_diag_v1',
  version: '1.0.0',
  pathId: 'sql',
  type: 'diagnostic',
  title: 'Evaluación Diagnóstica: Bases de Datos Relacionales y SQL',
  description: 'Instrumento inicial para determinar el nivel de partida en consultas SELECT, filtros WHERE y agrupaciones.',
  maxTotalScore: 25,
  questions: [
    {
      questionId: 'sql_diag_q1',
      topic: 'Consultas Básicas (SELECT)',
      prompt: '¿Cuál es la cláusula fundamental en SQL para especificar las columnas que se desean extraer de una tabla?',
      type: 'multiple_choice',
      options: ['SELECT', 'FROM', 'WHERE', 'EXTRACT'],
      correctOptionIndex: 0,
      rubricCriteria: 'Identifica la palabra clave de proyección de columnas.',
      maxScore: 5
    },
    {
      questionId: 'sql_diag_q2',
      topic: 'Filtros y Restricciones (WHERE)',
      prompt: 'Dada la tabla `estudiantes` (id, nombre, nota), ¿qué consulta selecciona a los estudiantes con nota mayor o igual a 70?',
      type: 'multiple_choice',
      options: [
        'SELECT * FROM estudiantes WHERE nota >= 70;',
        'FILTER estudiantes IF nota >= 70;',
        'SELECT nota >= 70 FROM estudiantes;',
        'WHERE nota >= 70 SHOW estudiantes;'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Aplica sintaxis correcta de restricción WHERE con operadores relacionales.',
      maxScore: 5
    },
    {
      questionId: 'sql_diag_q3',
      topic: 'Ordenamiento (ORDER BY)',
      prompt: '¿Cómo ordenarías los resultados de una tabla `productos` por su `precio` de menor a mayor (ascendente)? Escribe la cláusula o sentencia.',
      type: 'open_answer',
      rubricCriteria: 'Respuesta que contenga `ORDER BY precio ASC` u `ORDER BY precio`. Asignar 5 pts.',
      maxScore: 5
    },
    {
      questionId: 'sql_diag_q4',
      topic: 'Funciones de Agregación (COUNT/AVG)',
      prompt: 'Escribe una consulta SQL para contar el número total de registros existentes en la tabla `clientes`.',
      type: 'code',
      rubricCriteria: '`SELECT COUNT(*) FROM clientes;` o `SELECT COUNT(id) FROM clientes;`.',
      maxScore: 5
    },
    {
      questionId: 'sql_diag_q5',
      topic: 'Diseño Relacional y Claves Primarias',
      prompt: 'Explica con tus propias palabras qué es una Clave Primaria (Primary Key) y por qué cada tabla relacional debe tener una.',
      type: 'open_answer',
      rubricCriteria: 'Menciona unicidad, no nulidad y propósito de identificar de forma inequívoca cada registro de la tabla.',
      maxScore: 5
    }
  ]
};

export const SQL_FINAL_INSTRUMENT: EvaluationInstrument = {
  instrumentId: 'inst_sql_final_v1',
  version: '1.0.0',
  pathId: 'sql',
  type: 'final',
  title: 'Prueba Final: Dominio de Bases de Datos y SQL',
  description: 'Instrumento equivalente al diagnóstico para cuantificar la ganancia en habilidades de consulta relacional.',
  maxTotalScore: 25,
  questions: [
    {
      questionId: 'sql_fin_q1',
      topic: 'Consultas Básicas (SELECT)',
      prompt: '¿Qué palabra clave se usa junto a `SELECT` para evitar filas con valores repetidos en el resultado?',
      type: 'multiple_choice',
      options: ['DISTINCT', 'UNIQUE', 'DIFFERENT', 'NO_REPEAT'],
      correctOptionIndex: 0,
      rubricCriteria: 'Reconoce la cláusula DISTINCT para eliminación de duplicados.',
      maxScore: 5
    },
    {
      questionId: 'sql_fin_q2',
      topic: 'Filtros y Restricciones (WHERE)',
      prompt: 'Para buscar empleados con sueldo entre 1000 y 2500 inclusive en la tabla `empleados`, ¿cuál es la sintaxis óptima?',
      type: 'multiple_choice',
      options: [
        'SELECT * FROM empleados WHERE sueldo BETWEEN 1000 AND 2500;',
        'SELECT * FROM empleados WHERE sueldo IN (1000, 2500);',
        'SELECT * FROM empleados WHERE sueldo FROM 1000 TO 2500;',
        'FILTER empleados WHERE 1000 <= sueldo <= 2500;'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Aplica el operador de rango BETWEEN de forma apropiada.',
      maxScore: 5
    },
    {
      questionId: 'sql_fin_q3',
      topic: 'Ordenamiento (ORDER BY)',
      prompt: '¿Qué cláusula debes añadir a una consulta para ordenar los resultados de mayor a menor (descendente) según la columna `fecha`?',
      type: 'open_answer',
      rubricCriteria: '`ORDER BY fecha DESC`. Asignar 5 pts.',
      maxScore: 5
    },
    {
      questionId: 'sql_fin_q4',
      topic: 'Funciones de Agregación (COUNT/AVG)',
      prompt: 'Escribe una consulta SQL que obtenga el salario promedio (`AVG`) de la tabla `empleados`.',
      type: 'code',
      rubricCriteria: '`SELECT AVG(salario) FROM empleados;` o alias equivalente.',
      maxScore: 5
    },
    {
      questionId: 'sql_fin_q5',
      topic: 'Diseño Relacional y Claves Primarias',
      prompt: 'Explica qué es una Clave Foránea (Foreign Key) y cómo se relaciona con la Clave Primaria de otra tabla.',
      type: 'open_answer',
      rubricCriteria: 'Explica que es un campo que apunta a la Primary Key de otra tabla para garantizar integridad referencial y vincular entidades.',
      maxScore: 5
    }
  ]
};

// ─── 3. EVALUACIÓN DIAGNÓSTICA INICIAL INTEGRADA (KOTLIN + SQL) ───
// Instrumento estandarizado que se aplica obligatoriamente la primera vez que un estudiante ingresa a la app
export const INITIAL_COMPREHENSIVE_DIAGNOSTIC_INSTRUMENT: EvaluationInstrument = {
  instrumentId: 'inst_initial_comprehensive_diag_v1',
  version: '1.0.0',
  pathId: 'kotlin', // Asociado como base para trazabilidad
  type: 'diagnostic',
  title: 'Evaluación Diagnóstica Inicial: Lógica, Kotlin y Bases de Datos (SQL)',
  description: 'Instrumento inicial obligatorio para evaluar tus conocimientos previos en algoritmos y bases de datos antes de iniciar el aprendizaje.',
  maxTotalScore: 40,
  questions: [
    // ── PARTE A: ALGORITMOS Y KOTLIN ──
    {
      questionId: 'init_k_q1',
      topic: 'Kotlin: Variables e Inmutabilidad',
      prompt: 'En Kotlin, ¿cuál es la diferencia principal entre declarar una variable con `val` y una con `var`?',
      type: 'multiple_choice',
      options: [
        'val define una referencia de solo lectura (inmutable), mientras que var es reasignable (mutable).',
        'val solo se utiliza para números y var únicamente para cadenas de texto.',
        'val es una variable pública y var es estrictamente privada.',
        'Son sinónimos idénticos y el compilador los procesa de igual forma.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Identifica con exactitud la inmutabilidad de val frente a la mutabilidad de var.',
      maxScore: 5
    },
    {
      questionId: 'init_k_q2',
      topic: 'Kotlin: Estructuras Condicionales',
      prompt: 'Observa el siguiente código en Kotlin:\n```kotlin\nval puntos = 75\nval mensaje = if (puntos >= 90) "Excelente" else if (puntos >= 70) "Aprobado" else "Reprobado"\n```\n¿Cuál es el valor que contendrá `mensaje`?',
      type: 'multiple_choice',
      options: ['"Excelente"', '"Aprobado"', '"Reprobado"', 'Error de sintaxis'],
      correctOptionIndex: 1,
      rubricCriteria: 'Rastrea correctamente la condición encadenada.',
      maxScore: 5
    },
    {
      questionId: 'init_k_q3',
      topic: 'Lógica: Bucles y Trazabilidad',
      prompt: 'Analiza el siguiente ciclo iterativo:\n```kotlin\nvar acumulador = 0\nfor (i in 1..4) {\n  acumulador = acumulador + i\n}\n```\n¿Cuál es el valor numérico final de la variable `acumulador` al terminar el ciclo?',
      type: 'open_answer',
      rubricCriteria: 'El valor correcto es 10 (1+2+3+4). Calificar 5 pts si indica 10; 0 pts en caso contrario.',
      maxScore: 5
    },
    {
      questionId: 'init_k_q4',
      topic: 'Kotlin: Funciones y Retorno',
      prompt: 'Escribe una función en Kotlin llamada `esMayorDeEdad` que reciba `edad: Int` y devuelva `true` si la edad es mayor o igual a 18, o `false` de lo contrario.',
      type: 'code',
      rubricCriteria: 'Estructura `fun esMayorDeEdad(edad: Int): Boolean = edad >= 18` o equivalente con bloque `{ return edad >= 18 }`.',
      maxScore: 5
    },

    // ── PARTE B: BASES DE DATOS RELACIONALES Y SQL ──
    {
      questionId: 'init_sql_q5',
      topic: 'SQL: Consultas de Selección (SELECT)',
      prompt: 'En el lenguaje SQL, ¿cuál es la palabra clave que se utiliza para especificar las columnas que se desean consultar de una tabla?',
      type: 'multiple_choice',
      options: ['SELECT', 'EXTRACT', 'GET', 'DISPLAY'],
      correctOptionIndex: 0,
      rubricCriteria: 'Reconoce el comando SELECT de proyección.',
      maxScore: 5
    },
    {
      questionId: 'init_sql_q6',
      topic: 'SQL: Filtrado de Datos (WHERE)',
      prompt: 'Dada la tabla `estudiantes` (id, nombre, calificacion), ¿cuál consulta filtra a quienes tienen calificación mayor o igual a 70?',
      type: 'multiple_choice',
      options: [
        'SELECT * FROM estudiantes WHERE calificacion >= 70;',
        'FILTER FROM estudiantes WHERE calificacion >= 70;',
        'SELECT calificacion >= 70 FROM estudiantes;',
        'SEARCH estudiantes IF calificacion >= 70;'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Aplica sintaxis correcta de la cláusula WHERE.',
      maxScore: 5
    },
    {
      questionId: 'init_sql_q7',
      topic: 'SQL: Funciones de Agregación',
      prompt: 'Escribe la consulta SQL para obtener el número total de registros existentes en una tabla llamada `usuarios`.',
      type: 'code',
      rubricCriteria: '`SELECT COUNT(*) FROM usuarios;` o `SELECT COUNT(id) FROM usuarios;`.',
      maxScore: 5
    },
    {
      questionId: 'init_sql_q8',
      topic: 'Bases de Datos: Clave Primaria (Primary Key)',
      prompt: 'Explica en tus propias palabras qué es una Clave Primaria (Primary Key) en una base de datos relacional y cuál es su función principal.',
      type: 'open_answer',
      rubricCriteria: 'Menciona que es un identificador único para cada registro en una tabla y que no puede ser nulo, permitiendo distinguir inequívocamente cada fila.',
      maxScore: 5
    }
  ]
};

export function getInstrument(pathId: LearningPath, type: 'diagnostic' | 'final'): EvaluationInstrument {
  if (pathId === 'sql') {
    return type === 'diagnostic' ? SQL_DIAGNOSTIC_INSTRUMENT : SQL_FINAL_INSTRUMENT;
  }
  return type === 'diagnostic' ? KOTLIN_DIAGNOSTIC_INSTRUMENT : KOTLIN_FINAL_INSTRUMENT;
}

