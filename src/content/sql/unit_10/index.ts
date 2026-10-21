import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_10_LESSONS: Lesson[] = [
  {
    "id": "sql-u10-l01",
    "path": "sql",
    "unit": 10,
    "level": 1,
    "title": "1. COUNT, SUM, AVG, MIN y MAX",
    "description": "Calcula resúmenes estadísticos agregados: conteo de registros, sumatorias, promedios, valores mínimos y máximos.",
    "exercises": [
      {
        "id": "sql-u10-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"COUNT, SUM, AVG, MIN y MAX\"?",
        "code": "SELECT COUNT(*) FROM estudiantes;",
        "options": [
          "5",
          "1",
          "0",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "COUNT() cuenta el número de filas o valores no nulos.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l01-e02",
        "type": "code_cloze",
        "prompt": "La función de agregación utilizada para calcular la media aritmética de una columna numérica es ___:",
        "codeWithBlank": "La función de agregación utilizada para calcular la media aritmética de una columna numérica es ___:",
        "options": [
          "AVG()",
          "SUM()",
          "COUNT()",
          "MEAN()"
        ],
        "correctOption": "AVG()",
        "explanation": "SUM() y AVG() calculan sumatoria total y promedio aritmético.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"COUNT, SUM, AVG, MIN y MAX\":",
        "tokens": [
          "SELECT",
          "AVG(promedio)",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "AVG(promedio)",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Las funciones de agregación colapsan múltiples filas en un único valor de resumen (a menos que uses GROUP BY).",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"COUNT, SUM, AVG, MIN y MAX\":",
        "codeSnippet": [
          "SELECT AVERAGE(promedio) FROM estudiantes // En SQL la función es AVG(), no AVERAGE()"
        ],
        "bugLineIndex": 0,
        "explanation": "Intentar proyectar una columna individual no agrupada (como `nombre`) junto a `AVG(promedio)` sin GROUP BY.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"COUNT, SUM, AVG, MIN y MAX\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "COUNT, SUM, AVG, MIN y MAX",
            "right": "COUNT() cuenta el número de filas o valores no nulos."
          },
          {
            "left": "Principio 2",
            "right": "SUM() y AVG() calculan sumatoria total y promedio aritmético."
          },
          {
            "left": "Principio 3",
            "right": "MIN() y MAX() encuentran los valores extremos del conjunto."
          },
          {
            "left": "Buena práctica",
            "right": "Las funciones de agregación colapsan múltiples filas..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"COUNT, SUM, AVG, MIN y MAX\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"COUNT, SUM, AVG, MIN y MAX\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Las funciones de agregación colapsan múltiples filas en un único valor de resumen (a menos que uses GROUP BY).",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"COUNT, SUM, AVG, MIN y MAX\"?",
        "code": "SELECT \n    COUNT(*) AS total_estudiantes,\n    AVG(promedio) AS promedio_general,\n    MIN(promedio) AS nota_minima,\n    MAX(promedio) AS nota_maxima",
        "options": [
          "Consulta completada",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Consulta completada",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"COUNT, SUM, AVG, MIN y MAX\":",
        "tokens": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "solution": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"COUNT, SUM, AVG, MIN y MAX\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Intentar proyectar una columna individual no agrupada (como `nombre`) junto a `AVG(promedio)` sin GROUP BY.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"COUNT, SUM, AVG, MIN y MAX\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Calcula resúmenes estadísticos agregados: conteo de ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar proyectar una columna individual no agrupad..."
          },
          {
            "left": "Recomendación",
            "right": "Las funciones de agregación colapsan múltiples filas..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Motor relacional SQLite"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "sql-u10-l02",
    "path": "sql",
    "unit": 10,
    "level": 2,
    "title": "2. COUNT(*) frente a COUNT(columna)",
    "description": "Comprende la diferencia crucial: COUNT(*) cuenta todas las filas sin importar su contenido; COUNT(columna) ignora los valores NULL.",
    "exercises": [
      {
        "id": "sql-u10-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"COUNT(*) frente a COUNT(columna)\"?",
        "code": "SELECT COUNT(*) FROM asignaturas;",
        "options": [
          "5",
          "4",
          "1",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "COUNT(*) cuenta filas completas, independientemente de si tienen nulos.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l02-e02",
        "type": "code_cloze",
        "prompt": "Para contar la totalidad de filas de una tabla independientemente de nulos usamos COUNT(___):",
        "codeWithBlank": "Para contar la totalidad de filas de una tabla independientemente de nulos usamos COUNT(___):",
        "options": [
          "*",
          "1",
          "id",
          "all"
        ],
        "correctOption": "*",
        "explanation": "COUNT(nombreColumna) cuenta únicamente las filas donde esa columna sea NOT NULL.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"COUNT(*) frente a COUNT(columna)\":",
        "tokens": [
          "SELECT",
          "COUNT(*)",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "COUNT(*)",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Para saber la cantidad de registros totales de una tabla usa siempre `COUNT(*)`.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"COUNT(*) frente a COUNT(columna)\":",
        "codeSnippet": [
          "SELECT COUNT() FROM estudiantes // Faltó el asterisco o la columna dentro de COUNT"
        ],
        "bugLineIndex": 0,
        "explanation": "Usar COUNT(columna) y sorprenderte de que el número sea menor al total de registros si la columna contenía valores NULL.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"COUNT(*) frente a COUNT(columna)\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "COUNT(*) frente a COUNT(columna)",
            "right": "COUNT(*) cuenta filas completas, independientemente de si tienen nulos."
          },
          {
            "left": "Principio 2",
            "right": "COUNT(nombreColumna) cuenta únicamente las filas donde esa columna sea NOT NULL."
          },
          {
            "left": "Principio 3",
            "right": "COUNT(DISTINCT columna) cuenta valores únicos no repetidos ignorando nulos."
          },
          {
            "left": "Buena práctica",
            "right": "Para saber la cantidad de registros totales de una t..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"COUNT(*) frente a COUNT(columna)\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"COUNT(*) frente a COUNT(columna)\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Para saber la cantidad de registros totales de una tabla usa siempre `COUNT(*)`.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"COUNT(*) frente a COUNT(columna)\"?",
        "code": "SELECT \n    COUNT(*) AS total_filas,\n    COUNT(id) AS con_id\nFROM estudiantes;",
        "options": [
          "Consulta completada",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Consulta completada",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"COUNT(*) frente a COUNT(columna)\":",
        "tokens": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "solution": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"COUNT(*) frente a COUNT(columna)\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Usar COUNT(columna) y sorprenderte de que el número sea menor al total de registros si la columna contenía valores NULL.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"COUNT(*) frente a COUNT(columna)\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende la diferencia crucial: COUNT(*) cuenta tod..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar COUNT(columna) y sorprenderte de que el número ..."
          },
          {
            "left": "Recomendación",
            "right": "Para saber la cantidad de registros totales de una t..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Motor relacional SQLite"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "sql-u10-l03",
    "path": "sql",
    "unit": 10,
    "level": 3,
    "title": "3. NULL en las agregaciones",
    "description": "Aprende cómo tratan las funciones agregadas los valores nulos: SUM, AVG, MIN y MAX ignoran los nulos silenciosamente.",
    "exercises": [
      {
        "id": "sql-u10-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"NULL en las agregaciones\"?",
        "code": "SELECT COUNT(*) FROM estudiantes;",
        "options": [
          "5",
          "0",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Todas las funciones de agregación (excepto COUNT(*)) ignoran los valores NULL.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l03-e02",
        "type": "code_cloze",
        "prompt": "Las funciones de agregación como SUM y AVG ___ los valores NULL durante el cálculo:",
        "codeWithBlank": "Las funciones de agregación como SUM y AVG ___ los valores NULL durante el cálculo:",
        "options": [
          "ignoran",
          "convierten a 1",
          "suman como texto",
          "arrojan error"
        ],
        "correctOption": "ignoran",
        "explanation": "AVG no incluye los nulos en el denominador de la división.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"NULL en las agregaciones\":",
        "tokens": [
          "SELECT",
          "AVG(COALESCE(nota, 0.0))",
          "FROM",
          "matriculas"
        ],
        "solution": [
          "SELECT",
          "AVG(COALESCE(nota, 0.0))",
          "FROM",
          "matriculas"
        ],
        "explanation": "Si quieres que un valor NULL cuente como cero en un promedio, usa `AVG(COALESCE(columna, 0))`.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"NULL en las agregaciones\":",
        "codeSnippet": [
          "// Asumir que AVG(columna) divide entre el total de filas cuando hay nulos"
        ],
        "bugLineIndex": 0,
        "explanation": "Si una columna solo contiene valores NULL, SUM() y AVG() devolverán NULL, no cero.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"NULL en las agregaciones\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "NULL en las agregaciones",
            "right": "Todas las funciones de agregación (excepto COUNT(*)) ignoran los valores NULL."
          },
          {
            "left": "Principio 2",
            "right": "AVG no incluye los nulos en el denominador de la división."
          },
          {
            "left": "Principio 3",
            "right": "Usa COALESCE si necesitas imputar un valor por defecto antes de agregar."
          },
          {
            "left": "Buena práctica",
            "right": "Si quieres que un valor NULL cuente como cero en un ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"NULL en las agregaciones\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"NULL en las agregaciones\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Si quieres que un valor NULL cuente como cero en un promedio, usa `AVG(COALESCE(columna, 0))`.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"NULL en las agregaciones\"?",
        "code": "SELECT \n    COUNT(*) AS total_registros,\n    AVG(promedio) AS promedio_no_nulo\nFROM estudiantes;",
        "options": [
          "Consulta completada",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Consulta completada",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"NULL en las agregaciones\":",
        "tokens": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "solution": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"NULL en las agregaciones\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Si una columna solo contiene valores NULL, SUM() y AVG() devolverán NULL, no cero.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"NULL en las agregaciones\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende cómo tratan las funciones agregadas los valo..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si una columna solo contiene valores NULL, SUM() y A..."
          },
          {
            "left": "Recomendación",
            "right": "Si quieres que un valor NULL cuente como cero en un ..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Motor relacional SQLite"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "sql-u10-l04",
    "path": "sql",
    "unit": 10,
    "level": 4,
    "title": "4. GROUP BY",
    "description": "Agrupa filas que comparten valores idénticos en categorías para calcular métricas agregadas por grupo.",
    "exercises": [
      {
        "id": "sql-u10-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"GROUP BY\"?",
        "code": "SELECT COUNT(DISTINCT carrera) FROM estudiantes;",
        "options": [
          "4",
          "5",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "GROUP BY colapsa múltiples registros en una sola fila por cada valor único del campo.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l04-e02",
        "type": "code_cloze",
        "prompt": "La cláusula para agrupar registros que comparten valores idénticos en categorías es ___:",
        "codeWithBlank": "La cláusula para agrupar registros que comparten valores idénticos en categorías es ___:",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "CLUSTER BY"
        ],
        "correctOption": "GROUP BY",
        "explanation": "Permite calcular totales, promedios y conteos por categoría, departamento o fecha.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"GROUP BY\":",
        "tokens": [
          "SELECT",
          "departamento, COUNT(*)",
          "FROM",
          "asignaturas",
          "GROUP",
          "BY",
          "departamento"
        ],
        "solution": [
          "SELECT",
          "departamento, COUNT(*)",
          "FROM",
          "asignaturas",
          "GROUP",
          "BY",
          "departamento"
        ],
        "explanation": "Toda columna que pongas en el SELECT debe estar en la cláusula GROUP BY o dentro de una función de agregación.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"GROUP BY\":",
        "codeSnippet": [
          "SELECT carrera, COUNT(*) FROM estudiantes // Falta la cláusula GROUP BY carrera"
        ],
        "bugLineIndex": 0,
        "explanation": "Incluir columnas arbitrarias que varían dentro del grupo causará resultados inconsistentes o errores.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"GROUP BY\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "GROUP BY",
            "right": "GROUP BY colapsa múltiples registros en una sola fila por cada valor único del campo."
          },
          {
            "left": "Principio 2",
            "right": "Permite calcular totales, promedios y conteos por categoría, departamento o fecha."
          },
          {
            "left": "Principio 3",
            "right": "Se sitúa después del WHERE y antes del ORDER BY."
          },
          {
            "left": "Buena práctica",
            "right": "Toda columna que pongas en el SELECT debe estar en l..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"GROUP BY\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"GROUP BY\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Toda columna que pongas en el SELECT debe estar en la cláusula GROUP BY o dentro de una función de agregación.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"GROUP BY\"?",
        "code": "SELECT \n    carrera,\n    COUNT(*) AS cantidad_alumnos,\n    AVG(promedio) AS promedio_carrera\nFROM estudiantes ",
        "options": [
          "Consulta completada",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Consulta completada",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"GROUP BY\":",
        "tokens": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "solution": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"GROUP BY\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Incluir columnas arbitrarias que varían dentro del grupo causará resultados inconsistentes o errores.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"GROUP BY\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Agrupa filas que comparten valores idénticos en cate..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Incluir columnas arbitrarias que varían dentro del g..."
          },
          {
            "left": "Recomendación",
            "right": "Toda columna que pongas en el SELECT debe estar en l..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Motor relacional SQLite"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "sql-u10-l05",
    "path": "sql",
    "unit": 10,
    "level": 5,
    "title": "5. HAVING",
    "description": "Filtra grupos agregados después de la agrupación con la cláusula HAVING (a diferencia de WHERE que filtra filas individuales antes).",
    "exercises": [
      {
        "id": "sql-u10-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"HAVING\"?",
        "code": "SELECT COUNT(*) FROM estudiantes GROUP BY carrera HAVING COUNT(*) >= 2;",
        "options": [
          "1 (1 grupo califica)",
          "2",
          "0",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "HAVING filtra grupos calculados tras la agregación.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l05-e02",
        "type": "code_cloze",
        "prompt": "La cláusula para filtrar los resultados de grupos tras aplicar agregaciones es ___:",
        "codeWithBlank": "La cláusula para filtrar los resultados de grupos tras aplicar agregaciones es ___:",
        "options": [
          "HAVING",
          "WHERE",
          "FILTER",
          "WHEN"
        ],
        "correctOption": "HAVING",
        "explanation": "Permite condiciones con funciones como COUNT(), SUM(), AVG().",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"HAVING\":",
        "tokens": [
          "GROUP",
          "BY",
          "departamento",
          "HAVING",
          "COUNT(*)",
          ">",
          "1"
        ],
        "solution": [
          "GROUP",
          "BY",
          "departamento",
          "HAVING",
          "COUNT(*)",
          ">",
          "1"
        ],
        "explanation": "Si la condición involucra una función agregada como `COUNT(*) > 1` o `AVG(nota) >= 9`, DEBES usar HAVING.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"HAVING\":",
        "codeSnippet": [
          "WHERE COUNT(*) > 1 // Error: las funciones de agregación se filtran con HAVING"
        ],
        "bugLineIndex": 0,
        "explanation": "Intentar usar funciones agregadas dentro del WHERE: `WHERE COUNT(*) > 1` causará un error de sintaxis inmediato.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"HAVING\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "HAVING",
            "right": "HAVING filtra grupos calculados tras la agregación."
          },
          {
            "left": "Principio 2",
            "right": "Permite condiciones con funciones como COUNT(), SUM(), AVG()."
          },
          {
            "left": "Principio 3",
            "right": "Se coloca inmediatamente después de la cláusula GROUP BY."
          },
          {
            "left": "Buena práctica",
            "right": "Si la condición involucra una función agregada como ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"HAVING\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"HAVING\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Si la condición involucra una función agregada como `COUNT(*) > 1` o `AVG(nota) >= 9`, DEBES usar HAVING.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"HAVING\"?",
        "code": "SELECT \n    carrera,\n    COUNT(*) AS total\nFROM estudiantes \nGROUP BY carrera ",
        "options": [
          "Consulta completada",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Consulta completada",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"HAVING\":",
        "tokens": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "solution": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"HAVING\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Intentar usar funciones agregadas dentro del WHERE: `WHERE COUNT(*) > 1` causará un error de sintaxis inmediato.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"HAVING\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Filtra grupos agregados después de la agrupación con..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar usar funciones agregadas dentro del WHERE: ..."
          },
          {
            "left": "Recomendación",
            "right": "Si la condición involucra una función agregada como ..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Motor relacional SQLite"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "sql-u10-l06",
    "path": "sql",
    "unit": 10,
    "level": 6,
    "title": "6. Diferencia entre WHERE y HAVING",
    "description": "Domina el orden de procesamiento lógico de SQL: WHERE filtra filas individuales primero; HAVING filtra los grupos resultantes después.",
    "exercises": [
      {
        "id": "sql-u10-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Diferencia entre WHERE y HAVING\"?",
        "code": "SELECT carrera FROM estudiantes WHERE id = 1;",
        "options": [
          "Ingeniería de Software",
          "Computación",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "WHERE opera sobre filas crudas antes de cualquier agrupamiento.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l06-e02",
        "type": "code_cloze",
        "prompt": "En el ciclo de ejecución de SQL, la cláusula que se procesa antes de agrupar es ___:",
        "codeWithBlank": "En el ciclo de ejecución de SQL, la cláusula que se procesa antes de agrupar es ___:",
        "options": [
          "WHERE",
          "HAVING",
          "ORDER BY",
          "LIMIT"
        ],
        "correctOption": "WHERE",
        "explanation": "HAVING opera sobre las filas de resumen producidas por GROUP BY.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Diferencia entre WHERE y HAVING\":",
        "tokens": [
          "WHERE",
          "activo = 1",
          "GROUP",
          "BY",
          "carrera",
          "HAVING",
          "COUNT(*) > 2"
        ],
        "solution": [
          "WHERE",
          "activo = 1",
          "GROUP",
          "BY",
          "carrera",
          "HAVING",
          "COUNT(*) > 2"
        ],
        "explanation": "Usa WHERE para descartar filas no deseadas antes de gastar recursos de CPU agrupando con GROUP BY.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Diferencia entre WHERE y HAVING\":",
        "codeSnippet": [
          "HAVING semestre > 2 // Error: filtros sobre columnas individuales deben ir en WHERE"
        ],
        "bugLineIndex": 0,
        "explanation": "Poner condiciones que no son de agregación en el HAVING: ralentiza la consulta innecesariamente.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Diferencia entre WHERE y HAVING\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Diferencia entre WHERE y HAVING",
            "right": "WHERE opera sobre filas crudas antes de cualquier agrupamiento."
          },
          {
            "left": "Principio 2",
            "right": "HAVING opera sobre las filas de resumen producidas por GROUP BY."
          },
          {
            "left": "Orden canónico",
            "right": "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY."
          },
          {
            "left": "Buena práctica",
            "right": "Usa WHERE para descartar filas no deseadas antes de ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Diferencia entre WHERE y HAVING\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Diferencia entre WHERE y HAVING\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Usa WHERE para descartar filas no deseadas antes de gastar recursos de CPU agrupando con GROUP BY.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Diferencia entre WHERE y HAVING\"?",
        "code": "SELECT \n    carrera,\n    AVG(promedio) AS promedio_carrera\nFROM estudiantes \nWHERE semestre >= 3 -- 1. Filtra filas individuales primero",
        "options": [
          "Consulta completada",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Consulta completada",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Diferencia entre WHERE y HAVING\":",
        "tokens": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "solution": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Diferencia entre WHERE y HAVING\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Poner condiciones que no son de agregación en el HAVING: ralentiza la consulta innecesariamente.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Diferencia entre WHERE y HAVING\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Domina el orden de procesamiento lógico de SQL: WHER..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Poner condiciones que no son de agregación en el HAV..."
          },
          {
            "left": "Recomendación",
            "right": "Usa WHERE para descartar filas no deseadas antes de ..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Motor relacional SQLite"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "sql-u10-l07",
    "path": "sql",
    "unit": 10,
    "level": 7,
    "title": "7. Agrupaciones con JOIN",
    "description": "Combina el poder de JOIN con GROUP BY: calcula estadísticas agregadas cruzando información de múltiples tablas relacionadas.",
    "exercises": [
      {
        "id": "sql-u10-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Agrupaciones con JOIN\"?",
        "code": "SELECT COUNT(DISTINCT asignatura_id) FROM matriculas;",
        "options": [
          "4",
          "7",
          "5",
          "1"
        ],
        "correctOptionIndex": 0,
        "explanation": "JOIN + GROUP BY es la base de los reportes analíticos de Business Intelligence.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l07-e02",
        "type": "code_cloze",
        "prompt": "Para calcular estadísticas agrupadas cruzando múltiples tablas vinculamos JOIN con la cláusula ___:",
        "codeWithBlank": "Para calcular estadísticas agrupadas cruzando múltiples tablas vinculamos JOIN con la cláusula ___:",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "WHERE",
          "LIMIT"
        ],
        "correctOption": "GROUP BY",
        "explanation": "Permite cruzar entidades y totalizar métricas en una sola pasada.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Agrupaciones con JOIN\":",
        "tokens": [
          "JOIN",
          "matriculas",
          "ON",
          "a.id = m.asignatura_id",
          "GROUP",
          "BY",
          "a.id"
        ],
        "solution": [
          "JOIN",
          "matriculas",
          "ON",
          "a.id = m.asignatura_id",
          "GROUP",
          "BY",
          "a.id"
        ],
        "explanation": "Agrupa por la Llave Primaria de la tabla maestra (`GROUP BY a.id`) para evitar colisiones si dos materias tienen el mismo nombre.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Agrupaciones con JOIN\":",
        "codeSnippet": [
          "SELECT a.nombre, COUNT(*) FROM asignaturas a JOIN matriculas m // Falta ON y GROUP BY"
        ],
        "bugLineIndex": 0,
        "explanation": "Si quieres ver materias con 0 matriculados, debes usar LEFT JOIN en lugar de INNER JOIN.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Agrupaciones con JOIN\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Agrupaciones con JOIN",
            "right": "JOIN + GROUP BY es la base de los reportes analíticos de Business Intelligence."
          },
          {
            "left": "Principio 2",
            "right": "Permite cruzar entidades y totalizar métricas en una sola pasada."
          },
          {
            "left": "Principio 3",
            "right": "Agrupar por el ID primario garantiza resultados deterministas."
          },
          {
            "left": "Buena práctica",
            "right": "Agrupa por la Llave Primaria de la tabla maestra (`G..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l07-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Agrupaciones con JOIN\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Agrupaciones con JOIN\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Agrupa por la Llave Primaria de la tabla maestra (`GROUP BY a.id`) para evitar colisiones si dos materias tienen el mismo nombre.",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Agrupaciones con JOIN\"?",
        "code": "SELECT \n    a.nombre AS asignatura,\n    COUNT(m.id) AS total_matriculados,\n    AVG(m.nota_final) AS promedio_materia\nFROM asignaturas AS a ",
        "options": [
          "Consulta completada",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Consulta completada",
        "xpReward": 10
      },
      {
        "id": "sql-u10-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Agrupaciones con JOIN\":",
        "tokens": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "solution": [
          "SELECT",
          "id,",
          "nombre",
          "FROM",
          "estudiantes",
          ";"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Agrupaciones con JOIN\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Si quieres ver materias con 0 matriculados, debes usar LEFT JOIN en lugar de INNER JOIN.",
        "xpReward": 15
      },
      {
        "id": "sql-u10-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Agrupaciones con JOIN\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Combina el poder de JOIN con GROUP BY: calcula estad..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si quieres ver materias con 0 matriculados, debes us..."
          },
          {
            "left": "Recomendación",
            "right": "Agrupa por la Llave Primaria de la tabla maestra (`G..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Motor relacional SQLite"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  }
];
