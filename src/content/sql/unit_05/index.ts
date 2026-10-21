import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_05_LESSONS: Lesson[] = [
  {
    "id": "sql-u05-l01",
    "path": "sql",
    "unit": 5,
    "level": 1,
    "title": "1. INSERT INTO con columnas explícitas",
    "description": "Aprende a insertar nuevos registros especificando con precisión los nombres de las columnas de destino.",
    "exercises": [
      {
        "id": "sql-u05-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"INSERT INTO con columnas explícitas\"?",
        "code": "SELECT COUNT(*) FROM estudiantes;",
        "options": [
          "5",
          "6",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Sintaxis: INSERT INTO nombreTabla (col1, col2) VALUES (val1, val2);",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l01-e02",
        "type": "code_cloze",
        "prompt": "La sentencia oficial para agregar nuevos registros a una tabla en SQL es ___:",
        "codeWithBlank": "La sentencia oficial para agregar nuevos registros a una tabla en SQL es ___:",
        "options": [
          "INSERT INTO",
          "ADD ROW",
          "PUT INTO",
          "CREATE RECORD"
        ],
        "correctOption": "INSERT INTO",
        "explanation": "Las columnas no mencionadas tomarán su valor DEFAULT o NULL.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"INSERT INTO con columnas explícitas\":",
        "tokens": [
          "INSERT",
          "INTO",
          "estudiantes",
          "(",
          "nombre",
          ")",
          "VALUES",
          "(",
          "'Ana'",
          ")"
        ],
        "solution": [
          "INSERT",
          "INTO",
          "estudiantes",
          "(",
          "nombre",
          ")",
          "VALUES",
          "(",
          "'Ana'",
          ")"
        ],
        "explanation": "Listar las columnas explícitamente protege tus consultas de romperse si alguien añade nuevas columnas a la tabla en el futuro.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"INSERT INTO con columnas explícitas\":",
        "codeSnippet": [
          "INSERT estudiantes VALUES (\"Ana\") // Falta la palabra INTO y la lista de columnas explícitas"
        ],
        "bugLineIndex": 0,
        "explanation": "Escribir `INSERT INTO tabla VALUES (...)` sin lista de columnas es peligroso ante cambios de esquema.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"INSERT INTO con columnas explícitas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Sintaxis",
            "right": "INSERT INTO nombreTabla (col1, col2) VALUES (val1, val2);"
          },
          {
            "left": "Principio 2",
            "right": "Las columnas no mencionadas tomarán su valor DEFAULT o NULL."
          },
          {
            "left": "Principio 3",
            "right": "La cantidad de valores debe coincidir exactamente con la cantidad de columnas listadas."
          },
          {
            "left": "Buena práctica",
            "right": "Listar las columnas explícitamente protege tus consu..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"INSERT INTO con columnas explícitas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"INSERT INTO con columnas explícitas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Listar las columnas explícitamente protege tus consultas de romperse si alguien añade nuevas columnas a la tabla en el futuro.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"INSERT INTO con columnas explícitas\"?",
        "code": "INSERT INTO estudiantes (id, nombre, carrera, semestre, promedio) \nVALUES (6, 'Andrés Solano', 'Ingeniería de Software', 1, 9.0);",
        "options": [
          "Query OK, 1 row affected (0.00",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 1 row affected (0.00",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"INSERT INTO con columnas explícitas\":",
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
        "id": "sql-u05-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"INSERT INTO con columnas explícitas\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Escribir `INSERT INTO tabla VALUES (...)` sin lista de columnas es peligroso ante cambios de esquema.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"INSERT INTO con columnas explícitas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a insertar nuevos registros especificando co..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Escribir `INSERT INTO tabla VALUES (...)` sin lista ..."
          },
          {
            "left": "Recomendación",
            "right": "Listar las columnas explícitamente protege tus consu..."
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
    "id": "sql-u05-l02",
    "path": "sql",
    "unit": 5,
    "level": 2,
    "title": "2. Correspondencia entre columnas y valores",
    "description": "Comprende el estricto emparejamiento posicional: el primer valor se guarda en la primera columna, el segundo en la segunda.",
    "exercises": [
      {
        "id": "sql-u05-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Correspondencia entre columnas y valores\"?",
        "code": "SELECT nombre FROM asignaturas WHERE id = 101;",
        "options": [
          "Bases de Datos I",
          "Estructuras de Datos",
          "Inteligencia Artificial",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "El mapeo entre columnas y valores es estrictamente posicional (1 a 1).",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l02-e02",
        "type": "code_cloze",
        "prompt": "La relación entre las columnas declaradas y los valores en el INSERT es estrictamente ___:",
        "codeWithBlank": "La relación entre las columnas declaradas y los valores en el INSERT es estrictamente ___:",
        "options": [
          "posicional (uno a uno)",
          "alfabética",
          "aleatoria",
          "inversa"
        ],
        "correctOption": "posicional (uno a uno)",
        "explanation": "Los tipos de los valores deben ser compatibles con las columnas asociadas.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Correspondencia entre columnas y valores\":",
        "tokens": [
          "INSERT",
          "INTO",
          "tabla",
          "(",
          "a, b",
          ")",
          "VALUES",
          "(",
          "1, 2",
          ")"
        ],
        "solution": [
          "INSERT",
          "INTO",
          "tabla",
          "(",
          "a, b",
          ")",
          "VALUES",
          "(",
          "1, 2",
          ")"
        ],
        "explanation": "No importa el orden en que se crearon las columnas en la tabla; lo que manda es el orden que pongas en tu INSERT.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Correspondencia entre columnas y valores\":",
        "codeSnippet": [
          "INSERT INTO t (col1, col2) VALUES (1) // Error: 2 columnas pero solo 1 valor"
        ],
        "bugLineIndex": 0,
        "explanation": "Poner el texto en la posición de un entero causará fallo de afinidad o datos corruptos.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Correspondencia entre columnas y valores\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Correspondencia entre columnas y valores",
            "right": "El mapeo entre columnas y valores es estrictamente posicional (1 a 1)."
          },
          {
            "left": "Principio 2",
            "right": "Los tipos de los valores deben ser compatibles con las columnas asociadas."
          },
          {
            "left": "Principio 3",
            "right": "Si listas 3 columnas, debes proporcionar exactamente 3 valores en VALUES."
          },
          {
            "left": "Buena práctica",
            "right": "No importa el orden en que se crearon las columnas e..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Correspondencia entre columnas y valores\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Correspondencia entre columnas y valores\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "No importa el orden en que se crearon las columnas en la tabla; lo que manda es el orden que pongas en tu INSERT.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Correspondencia entre columnas y valores\"?",
        "code": "INSERT INTO asignaturas (id, nombre, creditos, departamento) \nVALUES (106, 'Inteligencia Artificial', 4, 'Informática');",
        "options": [
          "Query OK, 1 row affected (0.00",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 1 row affected (0.00",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Correspondencia entre columnas y valores\":",
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
        "id": "sql-u05-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Correspondencia entre columnas y valores\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Poner el texto en la posición de un entero causará fallo de afinidad o datos corruptos.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Correspondencia entre columnas y valores\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende el estricto emparejamiento posicional: el ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Poner el texto en la posición de un entero causará f..."
          },
          {
            "left": "Recomendación",
            "right": "No importa el orden en que se crearon las columnas e..."
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
    "id": "sql-u05-l03",
    "path": "sql",
    "unit": 5,
    "level": 3,
    "title": "3. Insertar varios registros",
    "description": "Optimiza el rendimiento de inserción agregando múltiples filas en una sola sentencia SQL separando grupos con comas.",
    "exercises": [
      {
        "id": "sql-u05-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Insertar varios registros\"?",
        "code": "SELECT COUNT(*) FROM matriculas;",
        "options": [
          "7",
          "10",
          "5",
          "3"
        ],
        "correctOptionIndex": 0,
        "explanation": "Sintaxis: VALUES (fila1), (fila2), (fila3);",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l03-e02",
        "type": "code_cloze",
        "prompt": "Para insertar varias filas en una sola sentencia, separamos cada grupo de paréntesis con una ___:",
        "codeWithBlank": "Para insertar varias filas en una sola sentencia, separamos cada grupo de paréntesis con una ___:",
        "options": [
          "coma (,)",
          "punto y coma (;)",
          "barra (/ )",
          "palabra AND"
        ],
        "correctOption": "coma (,)",
        "explanation": "Reduce el tráfico de red y la sobrecarga de transacciones en el motor de base de datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Insertar varios registros\":",
        "tokens": [
          "VALUES",
          "(",
          "1",
          ",",
          "'A'",
          ")",
          ",",
          "(",
          "2",
          ",",
          "'B'",
          ")"
        ],
        "solution": [
          "VALUES",
          "(",
          "1",
          ",",
          "'A'",
          ")",
          ",",
          "(",
          "2",
          ",",
          "'B'",
          ")"
        ],
        "explanation": "Insertar 1,000 registros en un solo INSERT multi-fila es hasta 50 veces más rápido que hacer 1,000 sentencias INSERT individuales.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Insertar varios registros\":",
        "codeSnippet": [
          "VALUES (1, \"A\") (2, \"B\") // Falta la coma separadora entre tuplas"
        ],
        "bugLineIndex": 0,
        "explanation": "Olvidar la coma entre cada grupo de paréntesis en la lista de tuplas de VALUES.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Insertar varios registros\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Sintaxis",
            "right": "VALUES (fila1), (fila2), (fila3);"
          },
          {
            "left": "Principio 2",
            "right": "Reduce el tráfico de red y la sobrecarga de transacciones en el motor de base de datos."
          },
          {
            "left": "Principio 3",
            "right": "Si una sola fila falla por restricción, se cancela todo el bloque en SQLite."
          },
          {
            "left": "Buena práctica",
            "right": "Insertar 1,000 registros en un solo INSERT multi-fil..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Insertar varios registros\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Insertar varios registros\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Insertar 1,000 registros en un solo INSERT multi-fila es hasta 50 veces más rápido que hacer 1,000 sentencias INSERT individuales.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Insertar varios registros\"?",
        "code": "INSERT INTO matriculas (id, estudiante_id, asignatura_id, periodo, nota_final) VALUES \n    (8, 1, 102, '2024-2', 9.0),\n    (9, 3, 103, '2024-2', 8.5),\n    (10, 4, 101, '2024-2', 9.2);",
        "options": [
          "Query OK, 1 row affected (0.00",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 1 row affected (0.00",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Insertar varios registros\":",
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
        "id": "sql-u05-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Insertar varios registros\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Olvidar la coma entre cada grupo de paréntesis en la lista de tuplas de VALUES.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Insertar varios registros\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Optimiza el rendimiento de inserción agregando múlti..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Olvidar la coma entre cada grupo de paréntesis en la..."
          },
          {
            "left": "Recomendación",
            "right": "Insertar 1,000 registros en un solo INSERT multi-fil..."
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
    "id": "sql-u05-l04",
    "path": "sql",
    "unit": 5,
    "level": 4,
    "title": "4. Textos, números y comillas",
    "description": "Aprende las reglas de entrecomillado en SQL: comillas simples estrictas para textos y fechas frente a literales numéricos sin comillas.",
    "exercises": [
      {
        "id": "sql-u05-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Textos, números y comillas\"?",
        "code": "SELECT nombre FROM estudiantes WHERE id = 2;",
        "options": [
          "Diego Fernández",
          "Valeria",
          "Camila",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Los valores de tipo TEXT y fechas requieren comillas simples obligatorias ('...').",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l04-e02",
        "type": "code_cloze",
        "prompt": "En las consultas SQL estándar, los valores de texto y fechas se delimitan con comillas ___:",
        "codeWithBlank": "En las consultas SQL estándar, los valores de texto y fechas se delimitan con comillas ___:",
        "options": [
          "simples (' ')",
          "dobles (\" \")",
          "invertidas (` `)",
          "angulares (< >)"
        ],
        "correctOption": "simples (' ')",
        "explanation": "Los números enteros y decimales se escriben sin comillas (ej. 42, 99.5).",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Textos, números y comillas\":",
        "tokens": [
          "VALUES",
          "(",
          "10",
          ",",
          "'Activo'",
          ")"
        ],
        "solution": [
          "VALUES",
          "(",
          "10",
          ",",
          "'Activo'",
          ")"
        ],
        "explanation": "En SQL estándar, los valores de texto se encierran SIEMPRE entre comillas simples ('texto'). Las comillas dobles se reservan para nombres de tablas o columnas con espacios.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Textos, números y comillas\":",
        "codeSnippet": [
          "INSERT INTO t (precio) VALUES (19,99) // Error: usar coma en vez de punto para decimales"
        ],
        "bugLineIndex": 0,
        "explanation": "Si un texto contiene una comilla simple interna (como O'Connor), debes duplicarla para escaparla: 'O''Connor'.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Textos, números y comillas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Textos, números y comillas",
            "right": "Los valores de tipo TEXT y fechas requieren comillas simples obligatorias ('...')."
          },
          {
            "left": "Principio 2",
            "right": "Los números enteros y decimales se escriben sin comillas (ej. 42, 99.5)."
          },
          {
            "left": "Principio 3",
            "right": "El punto (.) es el separador decimal estándar en SQL (nunca la coma)."
          },
          {
            "left": "Buena práctica",
            "right": "En SQL estándar, los valores de texto se encierran S..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Textos, números y comillas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Textos, números y comillas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "En SQL estándar, los valores de texto se encierran SIEMPRE entre comillas simples ('texto'). Las comillas dobles se reservan para nombres de tablas o columnas con espacios.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Textos, números y comillas\"?",
        "code": "INSERT INTO estudiantes (id, nombre, carrera, semestre, promedio) \nVALUES (7, 'Gabriel Mora', 'Ciberseguridad', 2, 8.7);",
        "options": [
          "Query OK, 1 row affected (0.00",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 1 row affected (0.00",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Textos, números y comillas\":",
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
        "id": "sql-u05-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Textos, números y comillas\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Si un texto contiene una comilla simple interna (como O'Connor), debes duplicarla para escaparla: 'O''Connor'.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Textos, números y comillas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende las reglas de entrecomillado en SQL: comilla..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si un texto contiene una comilla simple interna (com..."
          },
          {
            "left": "Recomendación",
            "right": "En SQL estándar, los valores de texto se encierran S..."
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
    "id": "sql-u05-l05",
    "path": "sql",
    "unit": 5,
    "level": 5,
    "title": "5. Valores nulos y predeterminados",
    "description": "Aprende a insertar registros omitiendo columnas para que tomen su valor DEFAULT o insertando NULL de manera explícita.",
    "exercises": [
      {
        "id": "sql-u05-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Valores nulos y predeterminados\"?",
        "code": "SELECT promedio FROM estudiantes WHERE id = 1;",
        "options": [
          "9.4",
          "0.0",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "La palabra clave NULL en la lista VALUES almacena un valor nulo.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l05-e02",
        "type": "code_cloze",
        "prompt": "Si en un INSERT omitimos una columna que tiene definida la cláusula DEFAULT, la columna tomará su valor ___:",
        "codeWithBlank": "Si en un INSERT omitimos una columna que tiene definida la cláusula DEFAULT, la columna tomará su valor ___:",
        "options": [
          "predeterminado",
          "cero",
          "nulo",
          "aleatorio"
        ],
        "correctOption": "predeterminado",
        "explanation": "Si omites una columna en la lista de campos, SQLite aplicará su DEFAULT.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Valores nulos y predeterminados\":",
        "tokens": [
          "VALUES",
          "(",
          "1",
          ",",
          "NULL",
          ",",
          "'Pendiente'",
          ")"
        ],
        "solution": [
          "VALUES",
          "(",
          "1",
          ",",
          "NULL",
          ",",
          "'Pendiente'",
          ")"
        ],
        "explanation": "Si quieres forzar explícitamente que una columna admita la ausencia de valor, escribe la palabra clave NULL en VALUES.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Valores nulos y predeterminados\":",
        "codeSnippet": [
          "INSERT INTO t (col_not_null) VALUES (NULL) // Error: viola restricción NOT NULL"
        ],
        "bugLineIndex": 0,
        "explanation": "Intentar insertar NULL en una columna con restricción NOT NULL provocará un error inmediato.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Valores nulos y predeterminados\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Valores nulos y predeterminados",
            "right": "La palabra clave NULL en la lista VALUES almacena un valor nulo."
          },
          {
            "left": "Principio 2",
            "right": "Si omites una columna en la lista de campos, SQLite aplicará su DEFAULT."
          },
          {
            "left": "Principio 3",
            "right": "Si no tiene DEFAULT ni NOT NULL, la columna omitida quedará en NULL."
          },
          {
            "left": "Buena práctica",
            "right": "Si quieres forzar explícitamente que una columna adm..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Valores nulos y predeterminados\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Valores nulos y predeterminados\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Si quieres forzar explícitamente que una columna admita la ausencia de valor, escribe la palabra clave NULL en VALUES.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Valores nulos y predeterminados\"?",
        "code": "INSERT INTO estudiantes (id, nombre, carrera, promedio) \nVALUES (8, 'Mariana Rojas', 'Sistemas de Información', 9.1);",
        "options": [
          "Query OK, 1 row affected (0.00",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 1 row affected (0.00",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Valores nulos y predeterminados\":",
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
        "id": "sql-u05-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Valores nulos y predeterminados\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Intentar insertar NULL en una columna con restricción NOT NULL provocará un error inmediato.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Valores nulos y predeterminados\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a insertar registros omitiendo columnas para..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar insertar NULL en una columna con restricció..."
          },
          {
            "left": "Recomendación",
            "right": "Si quieres forzar explícitamente que una columna adm..."
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
    "id": "sql-u05-l06",
    "path": "sql",
    "unit": 5,
    "level": 6,
    "title": "6. Orden de inserción cuando hay relaciones",
    "description": "Comprende la jerarquía referencial: siempre debes insertar primero los registros padres antes que los registros hijos que los referencian.",
    "exercises": [
      {
        "id": "sql-u05-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Orden de inserción cuando hay relaciones\"?",
        "code": "SELECT COUNT(*) FROM estudiantes;",
        "options": [
          "5",
          "7",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "La integridad referencial exige que el registro referenciado ya exista en la tabla padre.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l06-e02",
        "type": "code_cloze",
        "prompt": "Al poblar tablas con relaciones, siempre se debe insertar primero en las tablas ___:",
        "codeWithBlank": "Al poblar tablas con relaciones, siempre se debe insertar primero en las tablas ___:",
        "options": [
          "padre (principales)",
          "hijas (secundarias)",
          "intermedias",
          "temporales"
        ],
        "correctOption": "padre (principales)",
        "explanation": "Orden de inserción: Estudiantes -> Asignaturas -> Matrículas.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Orden de inserción cuando hay relaciones\":",
        "tokens": [
          "//",
          "Insertar",
          "padre",
          "antes",
          "que",
          "hijo"
        ],
        "solution": [
          "//",
          "Insertar",
          "padre",
          "antes",
          "que",
          "hijo"
        ],
        "explanation": "Regla de oro: Tablas maestras/fuertes primero, tablas intermedias o hijas dependientes después.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Orden de inserción cuando hay relaciones\":",
        "codeSnippet": [
          "// Intentar insertar en matriculas con estudiante_id inexistente en tabla estudiantes"
        ],
        "bugLineIndex": 0,
        "explanation": "Insertar en matriculas con estudiante_id = 999 provocará `FOREIGN KEY constraint failed` si 999 no existe.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Orden de inserción cuando hay relaciones\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Orden de inserción cuando hay relaciones",
            "right": "La integridad referencial exige que el registro referenciado ya exista en la tabla padre."
          },
          {
            "left": "Orden de inserción",
            "right": "Estudiantes -> Asignaturas -> Matrículas."
          },
          {
            "left": "Al borrar registros, el orden es el inverso",
            "right": "primero los hijos, luego los padres."
          },
          {
            "left": "Buena práctica",
            "right": "Regla de oro: Tablas maestras/fuertes primero, tabla..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Orden de inserción cuando hay relaciones\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Orden de inserción cuando hay relaciones\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Regla de oro: Tablas maestras/fuertes primero, tablas intermedias o hijas dependientes después.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Orden de inserción cuando hay relaciones\"?",
        "code": "INSERT INTO matriculas (id, estudiante_id, asignatura_id, periodo, nota_final) \nVALUES (11, 1, 101, '2024-2', 9.5);",
        "options": [
          "Query OK, 1 row affected (0.00",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 1 row affected (0.00",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Orden de inserción cuando hay relaciones\":",
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
        "id": "sql-u05-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Orden de inserción cuando hay relaciones\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Insertar en matriculas con estudiante_id = 999 provocará `FOREIGN KEY constraint failed` si 999 no existe.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Orden de inserción cuando hay relaciones\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende la jerarquía referencial: siempre debes in..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Insertar en matriculas con estudiante_id = 999 provo..."
          },
          {
            "left": "Recomendación",
            "right": "Regla de oro: Tablas maestras/fuertes primero, tabla..."
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
    "id": "sql-u05-l07",
    "path": "sql",
    "unit": 5,
    "level": 7,
    "title": "7. Errores por restricciones",
    "description": "Aprende a interpretar y resolver los errores clásicos de restricción: UNIQUE failed, NOT NULL failed, CHECK failed y FOREIGN KEY failed.",
    "exercises": [
      {
        "id": "sql-u05-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Errores por restricciones\"?",
        "code": "SELECT nombre FROM estudiantes WHERE id = 1;",
        "options": [
          "Valeria Morales",
          "Diego",
          "Error",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "UNIQUE constraint failed: intentaste duplicar una clave primaria o campo único.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l07-e02",
        "type": "code_cloze",
        "prompt": "El error que indica que intentamos duplicar una clave primaria se llama ___ constraint failed:",
        "codeWithBlank": "El error que indica que intentamos duplicar una clave primaria se llama ___ constraint failed:",
        "options": [
          "UNIQUE",
          "NOT NULL",
          "CHECK",
          "FOREIGN"
        ],
        "correctOption": "UNIQUE",
        "explanation": "NOT NULL constraint failed: olvidaste un campo que no admite valores vacíos.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Errores por restricciones\":",
        "tokens": [
          "SELECT",
          "id",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "id",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Lee siempre el mensaje de error de SQLite: te dice con exactitud qué tabla y qué columna violó la restricción.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Errores por restricciones\":",
        "codeSnippet": [
          "INSERT INTO estudiantes (id) VALUES (1) // Fallará por clave primaria id duplicada"
        ],
        "bugLineIndex": 0,
        "explanation": "Desactivar restricciones de integridad para que \"no dé error\": destruye la fiabilidad de tu base de datos.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Errores por restricciones\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "UNIQUE constraint failed",
            "right": "intentaste duplicar una clave primaria o campo único."
          },
          {
            "left": "NOT NULL constraint failed",
            "right": "olvidaste un campo que no admite valores vacíos."
          },
          {
            "left": "CHECK constraint failed",
            "right": "el dato enviado violó la regla de validación de negocio."
          },
          {
            "left": "FOREIGN KEY constraint failed",
            "right": "el ID padre no existe en la tabla referenciada."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l07-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Errores por restricciones\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Errores por restricciones\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Lee siempre el mensaje de error de SQLite: te dice con exactitud qué tabla y qué columna violó la restricción.",
        "xpReward": 10
      },
      {
        "id": "sql-u05-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Errores por restricciones\"?",
        "code": "\nSELECT id, nombre FROM estudiantes WHERE id = 1;",
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
        "id": "sql-u05-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Errores por restricciones\":",
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
        "id": "sql-u05-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Errores por restricciones\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Desactivar restricciones de integridad para que \"no dé error\": destruye la fiabilidad de tu base de datos.",
        "xpReward": 15
      },
      {
        "id": "sql-u05-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Errores por restricciones\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a interpretar y resolver los errores clásico..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Desactivar restricciones de integridad para que \"no ..."
          },
          {
            "left": "Recomendación",
            "right": "Lee siempre el mensaje de error de SQLite: te dice c..."
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
