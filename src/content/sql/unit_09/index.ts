import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_09_LESSONS: Lesson[] = [
  {
    "id": "sql-u09-l01",
    "path": "sql",
    "unit": 9,
    "level": 1,
    "title": "1. Para qué sirve un JOIN",
    "description": "Comprende el superpoder del modelo relacional: combinar columnas de múltiples tablas en una sola vista coherente.",
    "exercises": [
      {
        "id": "sql-u09-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Para qué sirve un JOIN\"?",
        "code": "SELECT COUNT(*) FROM estudiantes JOIN matriculas ON estudiantes.id = matriculas.estudiante_id;",
        "options": [
          "7",
          "5",
          "12",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "JOIN vincula registros de dos tablas basándose en una condición común.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l01-e02",
        "type": "code_cloze",
        "prompt": "La cláusula para combinar datos provenientes de dos o más tablas en una consulta es ___:",
        "codeWithBlank": "La cláusula para combinar datos provenientes de dos o más tablas en una consulta es ___:",
        "options": [
          "JOIN",
          "MERGE",
          "UNION",
          "CONNECT"
        ],
        "correctOption": "JOIN",
        "explanation": "Permite reconstruir información compleja a partir de tablas relacionales normalizadas.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Para qué sirve un JOIN\":",
        "tokens": [
          "SELECT",
          "*",
          "FROM",
          "a",
          "JOIN",
          "b",
          "ON",
          "a.id",
          "=",
          "b.a_id"
        ],
        "solution": [
          "SELECT",
          "*",
          "FROM",
          "a",
          "JOIN",
          "b",
          "ON",
          "a.id",
          "=",
          "b.a_id"
        ],
        "explanation": "JOIN te permite mantener datos normalizados en tablas pequeñas sin duplicación y cruzarlos solo cuando los necesitas.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Para qué sirve un JOIN\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT * FROM a JOIN b", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Si omites la cláusula ON, ocurrirá un Producto Cartesiano (todas las filas de A multiplicadas por todas las de B).",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Para qué sirve un JOIN\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Para qué sirve un JOIN",
            "right": "JOIN vincula registros de dos tablas basándose en una condición común."
          },
          {
            "left": "Principio 2",
            "right": "Permite reconstruir información compleja a partir de tablas relacionales normalizadas."
          },
          {
            "left": "Principio 3",
            "right": "Es la operación nuclear de todo motor relacional SQL."
          },
          {
            "left": "Buena práctica",
            "right": "JOIN te permite mantener datos normalizados en tabla..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Para qué sirve un JOIN\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Para qué sirve un JOIN\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "JOIN te permite mantener datos normalizados en tablas pequeñas sin duplicación y cruzarlos solo cuando los necesitas.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Para qué sirve un JOIN\"?",
        "code": "SELECT \n    estudiantes.nombre,\n    matriculas.nota_final\nFROM estudiantes \nJOIN matriculas ON estudiantes.id = matriculas.estudiante_id",
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
        "id": "sql-u09-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Para qué sirve un JOIN\":",
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
        "id": "sql-u09-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Para qué sirve un JOIN\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Si omites la cláusula ON, ocurrirá un Producto Cartesiano (todas las filas de A multiplicadas por todas las de B).",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Para qué sirve un JOIN\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende el superpoder del modelo relacional: combi..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si omites la cláusula ON, ocurrirá un Producto Carte..."
          },
          {
            "left": "Recomendación",
            "right": "JOIN te permite mantener datos normalizados en tabla..."
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
    "id": "sql-u09-l02",
    "path": "sql",
    "unit": 9,
    "level": 2,
    "title": "2. INNER JOIN",
    "description": "Aprende el tipo de unión más común: INNER JOIN devuelve únicamente las filas que tienen coincidencia exacta en ambas tablas.",
    "exercises": [
      {
        "id": "sql-u09-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"INNER JOIN\"?",
        "code": "SELECT COUNT(*) FROM estudiantes INNER JOIN matriculas ON estudiantes.id = matriculas.estudiante_id;",
        "options": [
          "7",
          "5",
          "0",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "INNER JOIN descarta cualquier fila que no tenga coincidencia en la otra tabla.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l02-e02",
        "type": "code_cloze",
        "prompt": "La unión que devuelve únicamente las filas que coinciden en ambas tablas es ___ JOIN:",
        "codeWithBlank": "La unión que devuelve únicamente las filas que coinciden en ambas tablas es ___ JOIN:",
        "options": [
          "INNER",
          "LEFT",
          "RIGHT",
          "FULL"
        ],
        "correctOption": "INNER",
        "explanation": "Garantiza que el reporte final no contenga registros nulos en la relación.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"INNER JOIN\":",
        "tokens": [
          "FROM",
          "estudiantes",
          "INNER",
          "JOIN",
          "matriculas",
          "ON",
          "estudiantes.id = matriculas.estudiante_id"
        ],
        "solution": [
          "FROM",
          "estudiantes",
          "INNER",
          "JOIN",
          "matriculas",
          "ON",
          "estudiantes.id = matriculas.estudiante_id"
        ],
        "explanation": "En SQL escribir `JOIN` a secas equivale exactamente a escribir `INNER JOIN`.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"INNER JOIN\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "FROM a INNER b", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Si un estudiante no tiene ninguna materia matriculada, un INNER JOIN lo excluirá por completo de la salida.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"INNER JOIN\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "INNER JOIN",
            "right": "INNER JOIN descarta cualquier fila que no tenga coincidencia en la otra tabla."
          },
          {
            "left": "Principio 2",
            "right": "Garantiza que el reporte final no contenga registros nulos en la relación."
          },
          {
            "left": "Principio 3",
            "right": "Es el tipo de unión más rápido y eficiente en bases de datos."
          },
          {
            "left": "Buena práctica",
            "right": "En SQL escribir `JOIN` a secas equivale exactamente ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"INNER JOIN\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"INNER JOIN\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "En SQL escribir `JOIN` a secas equivale exactamente a escribir `INNER JOIN`.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"INNER JOIN\"?",
        "code": "SELECT \n    estudiantes.nombre,\n    matriculas.periodo,\n    matriculas.nota_final\nFROM estudiantes ",
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
        "id": "sql-u09-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"INNER JOIN\":",
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
        "id": "sql-u09-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"INNER JOIN\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Si un estudiante no tiene ninguna materia matriculada, un INNER JOIN lo excluirá por completo de la salida.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"INNER JOIN\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende el tipo de unión más común: INNER JOIN devue..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si un estudiante no tiene ninguna materia matriculad..."
          },
          {
            "left": "Recomendación",
            "right": "En SQL escribir `JOIN` a secas equivale exactamente ..."
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
    "id": "sql-u09-l03",
    "path": "sql",
    "unit": 9,
    "level": 3,
    "title": "3. Condiciones de unión con ON",
    "description": "Define el criterio de emparejamiento exacto mediante la cláusula ON conectando la llave primaria con la llave foránea.",
    "exercises": [
      {
        "id": "sql-u09-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Condiciones de unión con ON\"?",
        "code": "SELECT COUNT(*) FROM estudiantes JOIN matriculas ON estudiantes.id = matriculas.estudiante_id WHERE estudiantes.id = 1;",
        "options": [
          "2",
          "1",
          "7",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "ON establece la igualdad entre la llave primaria y la llave foránea.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l03-e02",
        "type": "code_cloze",
        "prompt": "La cláusula donde se especifica la condición de igualdad para vincular dos tablas en un JOIN es ___:",
        "codeWithBlank": "La cláusula donde se especifica la condición de igualdad para vincular dos tablas en un JOIN es ___:",
        "options": [
          "ON",
          "WHERE",
          "HAVING",
          "USING"
        ],
        "correctOption": "ON",
        "explanation": "El motor de base de datos utiliza la condición ON para buscar coincidencias indexadas.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Condiciones de unión con ON\":",
        "tokens": [
          "ON",
          "estudiantes.id",
          "=",
          "matriculas.estudiante_id"
        ],
        "solution": [
          "ON",
          "estudiantes.id",
          "=",
          "matriculas.estudiante_id"
        ],
        "explanation": "La condición estándar es casi siempre `ON tablaPadre.id = tablaHija.padre_id`.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Condiciones de unión con ON\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "JOIN matriculas WHERE estudiantes.id = matriculas.estudiante_id // Para JOIN se usa ON, no WHERE", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "No confundir ON con WHERE: ON define cómo se unen las tablas; WHERE filtra el resultado tras la unión.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Condiciones de unión con ON\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Condiciones de unión con ON",
            "right": "ON establece la igualdad entre la llave primaria y la llave foránea."
          },
          {
            "left": "Principio 2",
            "right": "El motor de base de datos utiliza la condición ON para buscar coincidencias indexadas."
          },
          {
            "left": "Principio 3",
            "right": "Una vez unidas las tablas, puedes agregar filtros adicionales con WHERE."
          },
          {
            "left": "Buena práctica",
            "right": "La condición estándar es casi siempre `ON tablaPadre..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Condiciones de unión con ON\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Condiciones de unión con ON\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "La condición estándar es casi siempre `ON tablaPadre.id = tablaHija.padre_id`.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Condiciones de unión con ON\"?",
        "code": "SELECT \n    estudiantes.nombre,\n    matriculas.nota_final\nFROM estudiantes \nJOIN matriculas ON estudiantes.id = matriculas.estudiante_id;",
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
        "id": "sql-u09-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Condiciones de unión con ON\":",
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
        "id": "sql-u09-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Condiciones de unión con ON\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "No confundir ON con WHERE: ON define cómo se unen las tablas; WHERE filtra el resultado tras la unión.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Condiciones de unión con ON\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Define el criterio de emparejamiento exacto mediante..."
          },
          {
            "left": "Riesgo crítico",
            "right": "No confundir ON con WHERE: ON define cómo se unen la..."
          },
          {
            "left": "Recomendación",
            "right": "La condición estándar es casi siempre `ON tablaPadre..."
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
    "id": "sql-u09-l04",
    "path": "sql",
    "unit": 9,
    "level": 4,
    "title": "4. Alias de tablas y columnas calificadas",
    "description": "Simplifica consultas largas asignando alias cortos a las tablas (AS e, AS m) y califica columnas ambiguas con punto (e.nombre).",
    "exercises": [
      {
        "id": "sql-u09-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Alias de tablas y columnas calificadas\"?",
        "code": "SELECT e.id FROM estudiantes AS e WHERE e.id = 1;",
        "options": [
          "1",
          "Valeria",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Columna calificada: antepone el nombre de la tabla o su alias: tabla.columna.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l04-e02",
        "type": "code_cloze",
        "prompt": "Cuando dos tablas tienen una columna con el mismo nombre debemos escribir tabla.columna para evitar un error de ___:",
        "codeWithBlank": "Cuando dos tablas tienen una columna con el mismo nombre debemos escribir tabla.columna para evitar un error de ___:",
        "options": [
          "ambigüedad",
          "sintaxis",
          "tipo",
          "desbordamiento"
        ],
        "correctOption": "ambigüedad",
        "explanation": "Evita el error crítico de columna ambigua cuando dos tablas comparten campos con igual nombre.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Alias de tablas y columnas calificadas\":",
        "tokens": [
          "FROM",
          "estudiantes",
          "AS",
          "e",
          "JOIN",
          "matriculas",
          "AS",
          "m"
        ],
        "solution": [
          "FROM",
          "estudiantes",
          "AS",
          "e",
          "JOIN",
          "matriculas",
          "AS",
          "m"
        ],
        "explanation": "Si ambas tablas tienen una columna llamada `id`, escribir solo `SELECT id` arrojará error de ambigüedad (`ambiguous column name`). ¡Debes escribir `e.id` o `m.id`!",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Alias de tablas y columnas calificadas\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT id FROM estudiantes JOIN matriculas", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Definir un alias en el FROM y luego intentar usar el nombre largo de la tabla en el SELECT.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Alias de tablas y columnas calificadas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Columna calificada",
            "right": "antepone el nombre de la tabla o su alias: tabla.columna."
          },
          {
            "left": "Principio 2",
            "right": "Evita el error crítico de columna ambigua cuando dos tablas comparten campos con igual nombre."
          },
          {
            "left": "Principio 3",
            "right": "Hace las consultas complejas mucho más compactas y legibles."
          },
          {
            "left": "Buena práctica",
            "right": "Si ambas tablas tienen una columna llamada `id`, esc..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Alias de tablas y columnas calificadas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Alias de tablas y columnas calificadas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Si ambas tablas tienen una columna llamada `id`, escribir solo `SELECT id` arrojará error de ambigüedad (`ambiguous column name`). ¡Debes escribir `e.id` o `m.id`!",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Alias de tablas y columnas calificadas\"?",
        "code": "SELECT \n    e.nombre AS estudiante,\n    m.periodo,\n    m.nota_final AS nota\nFROM estudiantes AS e ",
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
        "id": "sql-u09-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Alias de tablas y columnas calificadas\":",
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
        "id": "sql-u09-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Alias de tablas y columnas calificadas\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Definir un alias en el FROM y luego intentar usar el nombre largo de la tabla en el SELECT.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Alias de tablas y columnas calificadas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Simplifica consultas largas asignando alias cortos a..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Definir un alias en el FROM y luego intentar usar el..."
          },
          {
            "left": "Recomendación",
            "right": "Si ambas tablas tienen una columna llamada `id`, esc..."
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
    "id": "sql-u09-l05",
    "path": "sql",
    "unit": 9,
    "level": 5,
    "title": "5. Consultas sobre tres tablas",
    "description": "Encadena múltiples JOINs para conectar Estudiantes, Matrículas y Asignaturas en un reporte curricular integral.",
    "exercises": [
      {
        "id": "sql-u09-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Consultas sobre tres tablas\"?",
        "code": "SELECT COUNT(*) FROM estudiantes AS e JOIN matriculas AS m ON e.id = m.estudiante_id JOIN asignaturas AS a ON m.asignatura_id = a.id;",
        "options": [
          "7",
          "5",
          "3",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "Las consultas sobre tres tablas resuelven las relaciones Muchos a Muchos (N:M).",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l05-e02",
        "type": "code_cloze",
        "prompt": "Para unir tres tablas en una consulta relacional encadenamos dos cláusulas ___ consecutivas:",
        "codeWithBlank": "Para unir tres tablas en una consulta relacional encadenamos dos cláusulas ___ consecutivas:",
        "options": [
          "JOIN",
          "WHERE",
          "SELECT",
          "MERGE"
        ],
        "correctOption": "JOIN",
        "explanation": "Cada sentencia JOIN requiere su propia cláusula ON específica.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Consultas sobre tres tablas\":",
        "tokens": [
          "JOIN",
          "asignaturas",
          "AS",
          "a",
          "ON",
          "m.asignatura_id",
          "=",
          "a.id"
        ],
        "solution": [
          "JOIN",
          "asignaturas",
          "AS",
          "a",
          "ON",
          "m.asignatura_id",
          "=",
          "a.id"
        ],
        "explanation": "Puedes encadenar 3, 4 o más tablas añadiendo sentencias `JOIN ... ON ...` una tras otra.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Consultas sobre tres tablas\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "JOIN matriculas ON ... JOIN asignaturas // Olvidó la cláusula ON en la segunda unión", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Intentar unir Estudiantes directamente con Asignaturas: no existe relación directa entre ambas sin pasar por Matrículas.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Consultas sobre tres tablas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Las consultas sobre tres tablas resuelven las relaciones Muchos a Muchos (N",
            "right": "M)."
          },
          {
            "left": "Principio 2",
            "right": "Cada sentencia JOIN requiere su propia cláusula ON específica."
          },
          {
            "left": "Principio 3",
            "right": "Produce reportes de negocio completos integrando entidades de todo el sistema."
          },
          {
            "left": "Buena práctica",
            "right": "Puedes encadenar 3, 4 o más tablas añadiendo sentenc..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Consultas sobre tres tablas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Consultas sobre tres tablas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Puedes encadenar 3, 4 o más tablas añadiendo sentencias `JOIN ... ON ...` una tras otra.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Consultas sobre tres tablas\"?",
        "code": "SELECT \n    e.nombre AS estudiante,\n    a.nombre AS asignatura,\n    m.nota_final AS nota\nFROM estudiantes AS e ",
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
        "id": "sql-u09-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Consultas sobre tres tablas\":",
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
        "id": "sql-u09-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Consultas sobre tres tablas\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Intentar unir Estudiantes directamente con Asignaturas: no existe relación directa entre ambas sin pasar por Matrículas.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Consultas sobre tres tablas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Encadena múltiples JOINs para conectar Estudiantes, ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar unir Estudiantes directamente con Asignatur..."
          },
          {
            "left": "Recomendación",
            "right": "Puedes encadenar 3, 4 o más tablas añadiendo sentenc..."
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
    "id": "sql-u09-l06",
    "path": "sql",
    "unit": 9,
    "level": 6,
    "title": "6. LEFT JOIN y registros sin coincidencia",
    "description": "Aprende a usar LEFT JOIN para conservar todos los registros de la tabla izquierda, incluso si no tienen coincidencias en la tabla derecha.",
    "exercises": [
      {
        "id": "sql-u09-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"LEFT JOIN y registros sin coincidencia\"?",
        "code": "SELECT COUNT(*) FROM estudiantes AS e LEFT JOIN matriculas AS m ON e.id = m.estudiante_id;",
        "options": [
          "7",
          "5",
          "0",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "LEFT JOIN (o LEFT OUTER JOIN) preserva todas las filas de la tabla izquierda (la del FROM).",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l06-e02",
        "type": "code_cloze",
        "prompt": "La unión que preserva todas las filas de la tabla izquierda rellenando con NULL si no hay coincidencia es ___ JOIN:",
        "codeWithBlank": "La unión que preserva todas las filas de la tabla izquierda rellenando con NULL si no hay coincidencia es ___ JOIN:",
        "options": [
          "LEFT",
          "INNER",
          "CROSS",
          "NATURAL"
        ],
        "correctOption": "LEFT",
        "explanation": "Si no hay coincidencia en la tabla derecha, rellena sus campos con NULL.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"LEFT JOIN y registros sin coincidencia\":",
        "tokens": [
          "FROM",
          "estudiantes",
          "LEFT",
          "JOIN",
          "matriculas",
          "ON",
          "estudiantes.id = matriculas.estudiante_id"
        ],
        "solution": [
          "FROM",
          "estudiantes",
          "LEFT",
          "JOIN",
          "matriculas",
          "ON",
          "estudiantes.id = matriculas.estudiante_id"
        ],
        "explanation": "Si un estudiante no tiene matrículas, las columnas provenientes de la tabla derecha vendrán rellenas con NULL.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"LEFT JOIN y registros sin coincidencia\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "LEFT INNER JOIN // Incompatible: es LEFT JOIN o INNER JOIN", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Poner un filtro en el WHERE sobre la tabla derecha como `WHERE m.nota > 7` transformará accidentalmente tu LEFT JOIN en un INNER JOIN.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"LEFT JOIN y registros sin coincidencia\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "LEFT JOIN y registros sin coincidencia",
            "right": "LEFT JOIN (o LEFT OUTER JOIN) preserva todas las filas de la tabla izquierda (la del FROM)."
          },
          {
            "left": "Principio 2",
            "right": "Si no hay coincidencia en la tabla derecha, rellena sus campos con NULL."
          },
          {
            "left": "Principio 3",
            "right": "Es la técnica definitiva para encontrar registros sin actividad (ej. estudiantes sin materias)."
          },
          {
            "left": "Buena práctica",
            "right": "Si un estudiante no tiene matrículas, las columnas p..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"LEFT JOIN y registros sin coincidencia\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"LEFT JOIN y registros sin coincidencia\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Si un estudiante no tiene matrículas, las columnas provenientes de la tabla derecha vendrán rellenas con NULL.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"LEFT JOIN y registros sin coincidencia\"?",
        "code": "SELECT \n    e.nombre AS estudiante,\n    m.nota_final AS nota\nFROM estudiantes AS e \nLEFT JOIN matriculas AS m ON e.id = m.estudiante_id;",
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
        "id": "sql-u09-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"LEFT JOIN y registros sin coincidencia\":",
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
        "id": "sql-u09-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"LEFT JOIN y registros sin coincidencia\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Poner un filtro en el WHERE sobre la tabla derecha como `WHERE m.nota > 7` transformará accidentalmente tu LEFT JOIN en un INNER JOIN.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"LEFT JOIN y registros sin coincidencia\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a usar LEFT JOIN para conservar todos los re..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Poner un filtro en el WHERE sobre la tabla derecha c..."
          },
          {
            "left": "Recomendación",
            "right": "Si un estudiante no tiene matrículas, las columnas p..."
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
    "id": "sql-u09-l07",
    "path": "sql",
    "unit": 9,
    "level": 7,
    "title": "7. Errores frecuentes al unir tablas",
    "description": "Identifica y corrige los errores clásicos en JOINs: producto cartesiano por omitir ON, columnas ambiguas y pérdida involuntaria de registros.",
    "exercises": [
      {
        "id": "sql-u09-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Errores frecuentes al unir tablas\"?",
        "code": "SELECT e.nombre FROM estudiantes AS e JOIN matriculas AS m ON e.id = m.estudiante_id WHERE e.id = 1 LIMIT 1;",
        "options": [
          "Valeria Morales",
          "Diego",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Omitir ON multiplica las filas (si A tiene 1,000 y B tiene 1,000, genera 1,000,000 de filas).",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l07-e02",
        "type": "code_cloze",
        "prompt": "Si omitimos la cláusula ON en una unión de tablas se genera un producto ___:",
        "codeWithBlank": "Si omitimos la cláusula ON en una unión de tablas se genera un producto ___:",
        "options": [
          "cartesiano",
          "escalar",
          "vectorial",
          "nulo"
        ],
        "correctOption": "cartesiano",
        "explanation": "El error \"ambiguous column name\" se soluciona calificando con alias: e.id.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Errores frecuentes al unir tablas\":",
        "tokens": [
          "SELECT",
          "e.id, m.nota_final",
          "FROM",
          "estudiantes",
          "AS",
          "e"
        ],
        "solution": [
          "SELECT",
          "e.id, m.nota_final",
          "FROM",
          "estudiantes",
          "AS",
          "e"
        ],
        "explanation": "Siempre califica las columnas con `tabla.columna` cuando haya más de una tabla en tu consulta.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Errores frecuentes al unir tablas\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT id FROM estudiantes JOIN matriculas ON estudiantes.id = matriculas.estudiante_id", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Hacer JOIN sobre columnas de tipos incompatibles (ej. TEXT con INTEGER) causará fallos de coincidencia.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Errores frecuentes al unir tablas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Errores frecuentes al unir tablas",
            "right": "Omitir ON multiplica las filas (si A tiene 1,000 y B tiene 1,000, genera 1,000,000 de filas)."
          },
          {
            "left": "El error \"ambiguous column name\" se soluciona calificando con alias",
            "right": "e.id."
          },
          {
            "left": "Principio 3",
            "right": "Verifica siempre que las claves foráneas apunten a las columnas primarias correctas."
          },
          {
            "left": "Buena práctica",
            "right": "Siempre califica las columnas con `tabla.columna` cu..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l07-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Errores frecuentes al unir tablas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Errores frecuentes al unir tablas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Siempre califica las columnas con `tabla.columna` cuando haya más de una tabla en tu consulta.",
        "xpReward": 10
      },
      {
        "id": "sql-u09-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Errores frecuentes al unir tablas\"?",
        "code": "SELECT \n    estudiantes.id AS id_alumno,\n    estudiantes.nombre\nFROM estudiantes \nJOIN matriculas ON estudiantes.id = matriculas.estudiante_id",
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
        "id": "sql-u09-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Errores frecuentes al unir tablas\":",
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
        "id": "sql-u09-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Errores frecuentes al unir tablas\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Hacer JOIN sobre columnas de tipos incompatibles (ej. TEXT con INTEGER) causará fallos de coincidencia.",
        "xpReward": 15
      },
      {
        "id": "sql-u09-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Errores frecuentes al unir tablas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Identifica y corrige los errores clásicos en JOINs: ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Hacer JOIN sobre columnas de tipos incompatibles (ej..."
          },
          {
            "left": "Recomendación",
            "right": "Siempre califica las columnas con `tabla.columna` cu..."
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
