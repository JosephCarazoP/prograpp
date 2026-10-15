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

// ─── 4. BATERÍA OFICIAL DE 5 DIAGNÓSTICOS DE KOTLIN ───

export const KOTLIN_DIAG_1: EvaluationInstrument = {
  instrumentId: 'diag_kotlin_1',
  version: '1.0.0',
  pathId: 'kotlin',
  type: 'diagnostic',
  title: 'Diagnóstico Kotlin 1: Variables, Inmutabilidad y Tipos',
  description: 'Evalúa la comprensión de val, var, tipos primitivos (Int, Double, String) y la inferencia de tipos.',
  maxTotalScore: 20,
  questions: [
    {
      questionId: 'k1_q1',
      topic: 'Variables e Inmutabilidad',
      prompt: '¿Qué ocurre al intentar reasignar una variable declarada con `val` en Kotlin?\n```kotlin\nval puntuacion = 100\npuntuacion = 200\n```',
      type: 'multiple_choice',
      options: [
        'Error de compilación: val es inmutable y no se puede reasignar.',
        'La variable cambia de valor a 200 sin problema.',
        'Se crea una nueva variable automática en memoria.',
        'Se lanza una advertencia pero el programa continúa.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Comprensión de inmutabilidad de val.',
      maxScore: 5
    },
    {
      questionId: 'k1_q2',
      topic: 'Tipos de Datos',
      prompt: '¿Cuál es el tipo de dato inferido por Kotlin para la variable `val pi = 3.14`?',
      type: 'multiple_choice',
      options: ['Double', 'Float', 'Int', 'Number'],
      correctOptionIndex: 0,
      rubricCriteria: 'Inferencia de tipos flotantes de doble precisión.',
      maxScore: 5
    },
    {
      questionId: 'k1_q3',
      topic: 'Mutabilidad con var',
      prompt: '¿Cuándo es apropiado utilizar `var` en lugar de `val` en Kotlin?',
      type: 'multiple_choice',
      options: [
        'Cuando el valor de la variable deba cambiar durante la ejecución del programa.',
        'Siempre, ya que var es más rápido que val.',
        'Únicamente dentro de funciones de retorno booleano.',
        'Solo para cadenas de texto.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Criterio de uso de variables mutables.',
      maxScore: 5
    },
    {
      questionId: 'k1_q4',
      topic: 'Interpolación de Cadenas',
      prompt: '¿Cómo se inserta el valor de la variable `nombre` dentro de un String en Kotlin?',
      type: 'multiple_choice',
      options: [
        '"Hola $nombre"',
        '"Hola {nombre}"',
        '"Hola %nombre%"',
        '"Hola &nombre"'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Uso del operador $ para interpolación de strings.',
      maxScore: 5
    }
  ]
};

export const KOTLIN_DIAG_2: EvaluationInstrument = {
  instrumentId: 'diag_kotlin_2',
  version: '1.0.0',
  pathId: 'kotlin',
  type: 'diagnostic',
  title: 'Diagnóstico Kotlin 2: Condicionales y Lógica Booleana',
  description: 'Evalúa estructuras de decisión if/else, expresión when y operadores relacionales.',
  maxTotalScore: 20,
  questions: [
    {
      questionId: 'k2_q1',
      topic: 'Estructura if/else',
      prompt: 'En Kotlin, ¿puede `if` retornar un valor directamente para asignarlo a una variable?\n```kotlin\nval estado = if (edad >= 18) "Adulto" else "Menor"\n```',
      type: 'multiple_choice',
      options: [
        'Sí, porque en Kotlin if es una expresión que devuelve un valor.',
        'No, produce un error de sintaxis al compilar.',
        'Solo si se utiliza un operador ternario estilo Java (?:).',
        'Solo si la variable es mutable (var).'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Reconoce if como expresión.',
      maxScore: 5
    },
    {
      questionId: 'k2_q2',
      topic: 'Operador when',
      prompt: '¿Qué estructura sustituye al `switch-case` tradicional de otros lenguajes en Kotlin?',
      type: 'multiple_choice',
      options: ['when', 'match', 'choose', 'caseOf'],
      correctOptionIndex: 0,
      rubricCriteria: 'Identifica la estructura when.',
      maxScore: 5
    },
    {
      questionId: 'k2_q3',
      topic: 'Operadores Lógicos',
      prompt: '¿Qué resultado produce la expresión `(10 > 5) && (3 == 4)` en Kotlin?',
      type: 'multiple_choice',
      options: ['false', 'true', 'null', 'Error de tipo'],
      correctOptionIndex: 0,
      rubricCriteria: 'Evaluación del operador lógico AND (&&).',
      maxScore: 5
    },
    {
      questionId: 'k2_q4',
      topic: 'Condiciones encadenadas',
      prompt: 'Dado `val nota = 85`, ¿qué imprime el bloque?\n```kotlin\nwhen {\n  nota >= 90 -> println("A")\n  nota >= 80 -> println("B")\n  else -> println("C")\n}\n```',
      type: 'multiple_choice',
      options: ['B', 'A', 'C', 'A y B'],
      correctOptionIndex: 0,
      rubricCriteria: 'Trazabilidad de evaluación secuencial en when.',
      maxScore: 5
    }
  ]
};

export const KOTLIN_DIAG_3: EvaluationInstrument = {
  instrumentId: 'diag_kotlin_3',
  version: '1.0.0',
  pathId: 'kotlin',
  type: 'diagnostic',
  title: 'Diagnóstico Kotlin 3: Bucles, Iteraciones y Rangos',
  description: 'Evalúa la comprensión de ciclos for, while, rangos numéricos y acumuladores.',
  maxTotalScore: 20,
  questions: [
    {
      questionId: 'k3_q1',
      topic: 'Rangos e Iteración for',
      prompt: '¿Cuántas veces se ejecuta el cuerpo del siguiente bucle?\n```kotlin\nfor (i in 1..5) {\n  println(i)\n}\n```',
      type: 'multiple_choice',
      options: [
        '5 veces (del 1 al 5 inclusive).',
        '4 veces (del 1 al 4).',
        '6 veces.',
        '1 sola vez.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Comprende la inclusión de ambos extremos en rangos 1..5.',
      maxScore: 5
    },
    {
      questionId: 'k3_q2',
      topic: 'Rangos con until',
      prompt: '¿Cuál es la diferencia entre `1..5` y `1 until 5` en Kotlin?',
      type: 'multiple_choice',
      options: [
        '1 until 5 no incluye el 5 (llega hasta 4), mientras que 1..5 sí lo incluye.',
        '1 until 5 cuenta en reversa de 5 a 1.',
        '1 until 5 solo itera números impares.',
        'Son exactamente idénticos.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Diferencia de exclusión del extremo superior con until.',
      maxScore: 5
    },
    {
      questionId: 'k3_q3',
      topic: 'Bucle while y acumulador',
      prompt: '¿Cuál es el valor final de `contador` al salir del bucle?\n```kotlin\nvar contador = 1\nwhile (contador < 4) {\n  contador++\n}\n```',
      type: 'multiple_choice',
      options: ['4', '3', '5', '1'],
      correctOptionIndex: 0,
      rubricCriteria: 'Trazabilidad de la condición de parada en while.',
      maxScore: 5
    },
    {
      questionId: 'k3_q4',
      topic: 'Paso en Rangos (step)',
      prompt: '¿Qué números genera el rango `for (i in 2..8 step 2)`?',
      type: 'multiple_choice',
      options: ['2, 4, 6, 8', '2, 3, 4, 5, 6, 7, 8', '2, 5, 8', '4, 6, 8'],
      correctOptionIndex: 0,
      rubricCriteria: 'Uso del modificador de incremento step.',
      maxScore: 5
    }
  ]
};

export const KOTLIN_DIAG_4: EvaluationInstrument = {
  instrumentId: 'diag_kotlin_4',
  version: '1.0.0',
  pathId: 'kotlin',
  type: 'diagnostic',
  title: 'Diagnóstico Kotlin 4: Funciones y Modularización',
  description: 'Evalúa definición de funciones, parámetros tipados, valor de retorno y single-expression functions.',
  maxTotalScore: 20,
  questions: [
    {
      questionId: 'k4_q1',
      topic: 'Definición de Funciones',
      prompt: '¿Cuál es la palabra clave para declarar una función en Kotlin?',
      type: 'multiple_choice',
      options: ['fun', 'function', 'def', 'void'],
      correctOptionIndex: 0,
      rubricCriteria: 'Palabra clave fun.',
      maxScore: 5
    },
    {
      questionId: 'k4_q2',
      topic: 'Funciones de Expresión Única',
      prompt: '¿Cuál de las siguientes es una sintaxis válida de función de una sola expresión en Kotlin?',
      type: 'multiple_choice',
      options: [
        'fun sumar(a: Int, b: Int): Int = a + b',
        'fun sumar(a: Int, b: Int) => a + b',
        'function sumar(a, b) -> a + b',
        'def sumar(a: Int, b: Int) = return a + b'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Sintaxis de expresión única con símbolo =.',
      maxScore: 5
    },
    {
      questionId: 'k4_q3',
      topic: 'Tipo de Retorno Unit',
      prompt: 'En Kotlin, ¿qué representa el tipo de retorno `Unit` en una función?',
      type: 'multiple_choice',
      options: [
        'Que la función no retorna ningún valor útil (equivalente a void en otros lenguajes).',
        'Que la función retorna exactamente el número 1.',
        'Que la función solo puede ejecutarse una única vez.',
        'Que es un puntero a memoria física.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Comprensión del tipo Unit.',
      maxScore: 5
    },
    {
      questionId: 'k4_q4',
      topic: 'Parámetros con Valor por Defecto',
      prompt: 'Dada `fun saludar(nombre: String = "Mundo")`, ¿qué ocurre al invocar `saludar()` sin argumentos?',
      type: 'multiple_choice',
      options: [
        'Se ejecuta utilizando "Mundo" como valor del parámetro.',
        'Lanza un error de compilación por falta de argumentos.',
        'La función no se ejecuta y devuelve null.',
        'El compilador pide el dato por consola interactiva.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Comportamiento de parámetros por defecto en Kotlin.',
      maxScore: 5
    }
  ]
};

export const KOTLIN_DIAG_5: EvaluationInstrument = {
  instrumentId: 'diag_kotlin_5',
  version: '1.0.0',
  pathId: 'kotlin',
  type: 'diagnostic',
  title: 'Diagnóstico Kotlin 5: Listas y Algoritmos Integrados',
  description: 'Evalúa listas inmutables vs mutables, acceso por índice y operaciones funcionales comunes.',
  maxTotalScore: 20,
  questions: [
    {
      questionId: 'k5_q1',
      topic: 'Listas Inmutables',
      prompt: 'Si declaras `val lista = listOf(1, 2, 3)`, ¿puedes agregar un elemento mediante `lista.add(4)`?',
      type: 'multiple_choice',
      options: [
        'No, porque listOf() crea una lista de solo lectura (inmutable).',
        'Sí, porque fue declarada con val.',
        'Sí, siempre que el número 4 sea del mismo tipo.',
        'Solo si se reinicia la aplicación.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Inmutabilidad de colecciones listOf vs mutableListOf.',
      maxScore: 5
    },
    {
      questionId: 'k5_q2',
      topic: 'Indexación de Listas',
      prompt: 'Dada `val nombres = listOf("Ana", "Carlos", "Beatriz")`, ¿qué valor devuelve `nombres[1]`?',
      type: 'multiple_choice',
      options: ['"Carlos"', '"Ana"', '"Beatriz"', 'Error de desbordamiento de índice'],
      correctOptionIndex: 0,
      rubricCriteria: 'Indexación basada en 0.',
      maxScore: 5
    },
    {
      questionId: 'k5_q3',
      topic: 'Tamaño de Colecciones',
      prompt: '¿Qué propiedad permite conocer cuántos elementos contiene una lista en Kotlin?',
      type: 'multiple_choice',
      options: ['size', 'length', 'count()', 'total'],
      correctOptionIndex: 0,
      rubricCriteria: 'Uso de la propiedad .size en listas.',
      maxScore: 5
    },
    {
      questionId: 'k5_q4',
      topic: 'Búsqueda y Algoritmos',
      prompt: '¿Qué operador o función verifica si un elemento está presente en una lista en Kotlin?\nEjemplo: `if (5 __ lista)`',
      type: 'multiple_choice',
      options: ['in', 'contains', 'has', 'inside'],
      correctOptionIndex: 0,
      rubricCriteria: 'Uso del operador in para pertenencia en colecciones.',
      maxScore: 5
    }
  ]
};

// ─── 5. BATERÍA OFICIAL DE 5 DIAGNÓSTICOS DE SQL ───

export const SQL_DIAG_1: EvaluationInstrument = {
  instrumentId: 'diag_sql_1',
  version: '1.0.0',
  pathId: 'sql',
  type: 'diagnostic',
  title: 'Diagnóstico SQL 1: Consultas SELECT y Proyección',
  description: 'Evalúa el comando SELECT, selección de campos, comodín asterisco (*) y renombramiento con AS.',
  maxTotalScore: 20,
  questions: [
    {
      questionId: 's1_q1',
      topic: 'Proyección SELECT',
      prompt: '¿Cuál es la función del asterisco (*) en una consulta como `SELECT * FROM productos;`?',
      type: 'multiple_choice',
      options: [
        'Selecciona y devuelve todas las columnas de la tabla.',
        'Multiplica los valores de las columnas numéricas.',
        'Selecciona solo los registros que no tengan valores nulos.',
        'Cuenta el número de filas de la tabla.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Significado del comodín asterisco en proyección SQL.',
      maxScore: 5
    },
    {
      questionId: 's1_q2',
      topic: 'Selección de Columnas',
      prompt: '¿Cómo consultas únicamente las columnas `nombre` y `precio` de la tabla `articulos`?',
      type: 'multiple_choice',
      options: [
        'SELECT nombre, precio FROM articulos;',
        'GET nombre, precio IN articulos;',
        'EXTRACT (nombre, precio) FROM articulos;',
        'SHOW nombre, precio TABLE articulos;'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Sintaxis de proyección de columnas específicas.',
      maxScore: 5
    },
    {
      questionId: 's1_q3',
      topic: 'Alias de Columnas (AS)',
      prompt: '¿Para qué sirve la palabra clave `AS` en una consulta SELECT?\nEjemplo: `SELECT nombre AS cliente FROM personas;`',
      type: 'multiple_choice',
      options: [
        'Para asignarle un nombre temporal o alias a la columna en el resultado.',
        'Para ordenar los resultados de forma ascendente.',
        'Para enlazar dos tablas relacionadas.',
        'Para filtrar registros duplicados.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Comprensión de alias con AS.',
      maxScore: 5
    },
    {
      questionId: 's1_q4',
      topic: 'Origen de Datos (FROM)',
      prompt: '¿Qué cláusula obligatoria indica la tabla de la cual se van a extraer los datos en SQL?',
      type: 'multiple_choice',
      options: ['FROM', 'IN', 'TABLE', 'SOURCE'],
      correctOptionIndex: 0,
      rubricCriteria: 'Palabra clave FROM en SQL.',
      maxScore: 5
    }
  ]
};

export const SQL_DIAG_2: EvaluationInstrument = {
  instrumentId: 'diag_sql_2',
  version: '1.0.0',
  pathId: 'sql',
  type: 'diagnostic',
  title: 'Diagnóstico SQL 2: Filtrado con WHERE y Operadores',
  description: 'Evalúa la cláusula WHERE, operadores de comparación, AND, OR, BETWEEN y LIKE.',
  maxTotalScore: 20,
  questions: [
    {
      questionId: 's2_q1',
      topic: 'Filtrado con WHERE',
      prompt: '¿Cuál es el propósito fundamental de la cláusula `WHERE` en una sentencia SELECT?',
      type: 'multiple_choice',
      options: [
        'Filtrar las filas del resultado según una o más condiciones lógicas.',
        'Definir qué columnas se muestran en pantalla.',
        'Ordenar las filas en forma ascendente o descendente.',
        'Eliminar la tabla de la base de datos.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Propósito de filtrado de WHERE.',
      maxScore: 5
    },
    {
      questionId: 's2_q2',
      topic: 'Operador AND vs OR',
      prompt: 'Si ejecutas `SELECT * FROM clientes WHERE edad > 18 AND activo = 1;`, ¿qué registros devuelve?',
      type: 'multiple_choice',
      options: [
        'Solo los clientes que cumplen AMBAS condiciones simultáneamente.',
        'Cualquier cliente que cumpla al menos una de las dos condiciones.',
        'Todos los clientes de la base de datos.',
        'Únicamente los clientes inactivos.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Lógica booleana del operador AND.',
      maxScore: 5
    },
    {
      questionId: 's2_q3',
      topic: 'Operador BETWEEN',
      prompt: '¿Cuál consulta selecciona productos cuyo precio esté entre 50 y 100 inclusive?',
      type: 'multiple_choice',
      options: [
        'SELECT * FROM productos WHERE precio BETWEEN 50 AND 100;',
        'SELECT * FROM productos WHERE precio IN (50, 100);',
        'SELECT * FROM productos WHERE precio RANGE 50 TO 100;',
        'SELECT * FROM productos WHERE precio >= 50 OR precio <= 100;'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Uso del operador de rango BETWEEN.',
      maxScore: 5
    },
    {
      questionId: 's2_q4',
      topic: 'Operador LIKE y patrones',
      prompt: '¿Cuál consulta busca clientes cuyo nombre comience con la letra "J"?',
      type: 'multiple_choice',
      options: [
        "SELECT * FROM clientes WHERE nombre LIKE 'J%';",
        "SELECT * FROM clientes WHERE nombre = 'J*';",
        "SELECT * FROM clientes WHERE nombre STARTSWITH 'J';",
        "SELECT * FROM clientes WHERE nombre IN ('J');"
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Uso del operador LIKE y comodín %.',
      maxScore: 5
    }
  ]
};

export const SQL_DIAG_3: EvaluationInstrument = {
  instrumentId: 'diag_sql_3',
  version: '1.0.0',
  pathId: 'sql',
  type: 'diagnostic',
  title: 'Diagnóstico SQL 3: Ordenamiento ORDER BY y Restricción LIMIT',
  description: 'Evalúa la organización de filas con ORDER BY (ASC / DESC) y paginación con LIMIT.',
  maxTotalScore: 20,
  questions: [
    {
      questionId: 's3_q1',
      topic: 'Ordenamiento por Defecto',
      prompt: 'Si ejecutas `SELECT * FROM usuarios ORDER BY edad;` sin especificar ASC o DESC, ¿cómo se ordenan?',
      type: 'multiple_choice',
      options: [
        'En orden ascendente (de menor a mayor) por defecto.',
        'En orden descendente (de mayor a menor).',
        'En orden aleatorio.',
        'Produce un error de sintaxis al faltar la dirección.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Comportamiento por defecto de ORDER BY como ASC.',
      maxScore: 5
    },
    {
      questionId: 's3_q2',
      topic: 'Orden Descendente (DESC)',
      prompt: '¿Qué palabra clave se añade para ordenar los precios de mayor a menor?',
      type: 'multiple_choice',
      options: ['DESC', 'DOWN', 'REVERSE', 'BOTTOM'],
      correctOptionIndex: 0,
      rubricCriteria: 'Palabra clave DESC.',
      maxScore: 5
    },
    {
      questionId: 's3_q3',
      topic: 'Restricción LIMIT',
      prompt: '¿Qué resultado produce agregar `LIMIT 5` al final de una consulta SQL?',
      type: 'multiple_choice',
      options: [
        'Devuelve como máximo las primeras 5 filas del resultado.',
        'Elimina 5 registros de la tabla física.',
        'Multiplica las primeras 5 columnas.',
        'Filtra los registros cuyo id sea igual a 5.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Comprensión de la cláusula LIMIT.',
      maxScore: 5
    },
    {
      questionId: 's3_q4',
      topic: 'Combinación ORDER BY + LIMIT',
      prompt: '¿Cómo obtendrías el producto más caro de una tabla `productos`?',
      type: 'multiple_choice',
      options: [
        'SELECT * FROM productos ORDER BY precio DESC LIMIT 1;',
        'SELECT * FROM productos ORDER BY precio ASC LIMIT 1;',
        'SELECT MAX(precio) FROM productos ORDER BY precio;',
        'SELECT TOP precio FROM productos WHERE precio = HIGHEST;'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Patrón clásico para obtener el valor máximo con ordenamiento y límite.',
      maxScore: 5
    }
  ]
};

export const SQL_DIAG_4: EvaluationInstrument = {
  instrumentId: 'diag_sql_4',
  version: '1.0.0',
  pathId: 'sql',
  type: 'diagnostic',
  title: 'Diagnóstico SQL 4: Funciones de Agregación y DISTINCT',
  description: 'Evalúa COUNT, SUM, AVG, MIN, MAX y eliminación de valores duplicados con DISTINCT.',
  maxTotalScore: 20,
  questions: [
    {
      questionId: 's4_q1',
      topic: 'Conteo con COUNT',
      prompt: '¿Qué función de agregación calcula la cantidad total de registros en una tabla?',
      type: 'multiple_choice',
      options: ['COUNT()', 'TOTAL()', 'SUM()', 'LENGTH()'],
      correctOptionIndex: 0,
      rubricCriteria: 'Función COUNT().',
      maxScore: 5
    },
    {
      questionId: 's4_q2',
      topic: 'Promedio con AVG',
      prompt: 'Para calcular el promedio de calificaciones de la tabla `evaluaciones`, ¿cuál es la función correcta?',
      type: 'multiple_choice',
      options: ['AVG(calificacion)', 'PROMEDIO(calificacion)', 'MEAN(calificacion)', 'DIVIDE(calificacion)'],
      correctOptionIndex: 0,
      rubricCriteria: 'Función AVG().',
      maxScore: 5
    },
    {
      questionId: 's4_q3',
      topic: 'Eliminar Duplicados (DISTINCT)',
      prompt: 'Si ejecutas `SELECT DISTINCT ciudad FROM clientes;`, ¿qué obtendrás?',
      type: 'multiple_choice',
      options: [
        'La lista de ciudades únicas, sin nombres de ciudad repetidos.',
        'La lista de clientes que viven en dos ciudades diferentes.',
        'El conteo numérico de ciudades.',
        'Todas las ciudades repetidas tantas veces como clientes haya.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Uso de la cláusula DISTINCT.',
      maxScore: 5
    },
    {
      questionId: 's4_q4',
      topic: 'Suma Acumulada con SUM',
      prompt: '¿Cuál es la diferencia entre `COUNT(ventas)` y `SUM(ventas)`?',
      type: 'multiple_choice',
      options: [
        'COUNT cuenta cuántos registros hay, mientras que SUM suma los valores numéricos contenidos en la columna.',
        'Son sinónimos intercambiables en SQL.',
        'SUM solo cuenta valores impares y COUNT valores pares.',
        'COUNT calcula el promedio y SUM el total de filas.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Diferencia esencial entre COUNT y SUM.',
      maxScore: 5
    }
  ]
};

export const SQL_DIAG_5: EvaluationInstrument = {
  instrumentId: 'diag_sql_5',
  version: '1.0.0',
  pathId: 'sql',
  type: 'diagnostic',
  title: 'Diagnóstico SQL 5: Agrupamiento GROUP BY y Modelado',
  description: 'Evalúa agrupamiento por categorías con GROUP BY, filtro HAVING y conceptos de Claves Primarias.',
  maxTotalScore: 20,
  questions: [
    {
      questionId: 's5_q1',
      topic: 'Agrupamiento con GROUP BY',
      prompt: '¿Para qué se utiliza la cláusula `GROUP BY` en SQL?',
      type: 'multiple_choice',
      options: [
        'Para agrupar filas que tienen los mismos valores en columnas especificadas y calcular agregados sobre ellas.',
        'Para ordenar los resultados alfabéticamente en orden inverso.',
        'Para unir dos bases de datos físicas en un solo servidor.',
        'Para crear una nueva tabla con clave primaria.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Propósito y funcionamiento de GROUP BY.',
      maxScore: 5
    },
    {
      questionId: 's5_q2',
      topic: 'Filtro de Agregados con HAVING',
      prompt: '¿Por qué no se puede usar `WHERE` para filtrar por el resultado de una función de agregación (ej: `WHERE COUNT(*) > 5`)?',
      type: 'multiple_choice',
      options: [
        'Porque WHERE filtra filas individuales antes de agrupar; para filtrar grupos tras el agregado se debe usar HAVING.',
        'Porque WHERE solo admite números enteros.',
        'Porque COUNT es una palabra reservada que no se puede usar en consultas compuestas.',
        'En realidad sí se puede usar sin ninguna diferencia.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Diferencia estricta entre WHERE y HAVING.',
      maxScore: 5
    },
    {
      questionId: 's5_q3',
      topic: 'Clave Primaria (Primary Key)',
      prompt: '¿Cuáles son las dos características inmutables que debe cumplir una Clave Primaria en SQL?',
      type: 'multiple_choice',
      options: [
        'Debe ser de valor único para cada registro y no puede contener valores nulos (NOT NULL).',
        'Debe ser un texto alfanumérico y comenzar obligatoriamente con la letra ID.',
        'Debe existir en dos tablas al mismo tiempo.',
        'Puede duplicarse siempre que la fecha sea distinta.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Unicidad y no nulidad de Primary Key.',
      maxScore: 5
    },
    {
      questionId: 's5_q4',
      topic: 'Clave Foránea (Foreign Key)',
      prompt: '¿Cuál es el rol de una Clave Foránea (Foreign Key) en un modelo de base de datos relacional?',
      type: 'multiple_choice',
      options: [
        'Establecer una relación de integridad referencial vinculando una columna con la Clave Primaria de otra tabla.',
        'Garantizar que la tabla se guarde en un disco externo.',
        'Encriptar las contraseñas de los usuarios en la base de datos.',
        'Aumentar la velocidad de los respaldos semanales.'
      ],
      correctOptionIndex: 0,
      rubricCriteria: 'Integridad referencial y claves foráneas.',
      maxScore: 5
    }
  ]
};

// ─── LISTADOS DE INSTRUMENTOS PARA ASIGNACIÓN DOCENTE ───

export const KOTLIN_DIAGNOSTICS_LIST: EvaluationInstrument[] = [
  KOTLIN_DIAG_1,
  KOTLIN_DIAG_2,
  KOTLIN_DIAG_3,
  KOTLIN_DIAG_4,
  KOTLIN_DIAG_5
];

export const SQL_DIAGNOSTICS_LIST: EvaluationInstrument[] = [
  SQL_DIAG_1,
  SQL_DIAG_2,
  SQL_DIAG_3,
  SQL_DIAG_4,
  SQL_DIAG_5
];

export const ALL_DIAGNOSTIC_INSTRUMENTS: EvaluationInstrument[] = [
  INITIAL_COMPREHENSIVE_DIAGNOSTIC_INSTRUMENT,
  ...KOTLIN_DIAGNOSTICS_LIST,
  ...SQL_DIAGNOSTICS_LIST
];

export function getDiagnosticInstrumentById(instrumentId: string): EvaluationInstrument | undefined {
  return ALL_DIAGNOSTIC_INSTRUMENTS.find(inst => inst.instrumentId === instrumentId);
}

export function getInstrument(pathId: LearningPath, type: 'diagnostic' | 'final'): EvaluationInstrument {
  if (pathId === 'sql') {
    return type === 'diagnostic' ? SQL_DIAGNOSTIC_INSTRUMENT : SQL_FINAL_INSTRUMENT;
  }
  return type === 'diagnostic' ? KOTLIN_DIAGNOSTIC_INSTRUMENT : KOTLIN_FINAL_INSTRUMENT;
}


