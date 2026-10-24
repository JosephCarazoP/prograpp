import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_08_LESSONS: Lesson[] = [
  {
    "id": "sql-u08-l01",
    "path": "sql",
    "unit": 8,
    "level": 1,
    "title": "1. UPDATE y SET",
    "description": "Modifica datos existentes en una tabla mediante la sentencia UPDATE y la cláusula SET.",
    "exercises": [
      {
        "id": "sql-u08-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"UPDATE y SET\"?",
        "code": "SELECT id FROM estudiantes WHERE id = 1;",
        "options": [
          "1",
          "Valeria",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Sintaxis: UPDATE nombreTabla SET columna = nuevoValor WHERE condicion;",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l01-e02",
        "type": "code_cloze",
        "prompt": "La cláusula de la sentencia UPDATE donde indicamos qué columnas cambiarán es ___:",
        "codeWithBlank": "La cláusula de la sentencia UPDATE donde indicamos qué columnas cambiarán es ___:",
        "options": [
          "SET",
          "TO",
          "VALUES",
          "ASSIGN"
        ],
        "correctOption": "SET",
        "explanation": "SET indica qué columnas cambiarán y qué nuevos valores tomarán.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"UPDATE y SET\":",
        "tokens": [
          "UPDATE",
          "estudiantes",
          "SET",
          "semestre",
          "=",
          "5",
          "WHERE",
          "id",
          "=",
          "1"
        ],
        "solution": [
          "UPDATE",
          "estudiantes",
          "SET",
          "semestre",
          "=",
          "5",
          "WHERE",
          "id",
          "=",
          "1"
        ],
        "explanation": "La sentencia UPDATE modifica filas ya existentes; no agrega filas nuevas (eso es labor de INSERT).",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"UPDATE y SET\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "UPDATE estudiantes VALUES (promedio = 10)", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Ejecutar un UPDATE sin WHERE modificará TODAS las filas de la tabla de forma irreversible.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"UPDATE y SET\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Sintaxis",
            "right": "UPDATE nombreTabla SET columna = nuevoValor WHERE condicion;"
          },
          {
            "left": "Principio 2",
            "right": "SET indica qué columnas cambiarán y qué nuevos valores tomarán."
          },
          {
            "left": "Principio 3",
            "right": "Siempre verifica con un SELECT previo qué filas coinciden con tu filtro WHERE."
          },
          {
            "left": "Buena práctica",
            "right": "La sentencia UPDATE modifica filas ya existentes; no..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"UPDATE y SET\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"UPDATE y SET\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "La sentencia UPDATE modifica filas ya existentes; no agrega filas nuevas (eso es labor de INSERT).",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"UPDATE y SET\"?",
        "code": "UPDATE estudiantes \nSET promedio = 9.8 \nWHERE id = 1;",
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
        "id": "sql-u08-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"UPDATE y SET\":",
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
        "id": "sql-u08-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"UPDATE y SET\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Ejecutar un UPDATE sin WHERE modificará TODAS las filas de la tabla de forma irreversible.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"UPDATE y SET\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Modifica datos existentes en una tabla mediante la s..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Ejecutar un UPDATE sin WHERE modificará TODAS las fi..."
          },
          {
            "left": "Recomendación",
            "right": "La sentencia UPDATE modifica filas ya existentes; no..."
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
    "id": "sql-u08-l02",
    "path": "sql",
    "unit": 8,
    "level": 2,
    "title": "2. Actualizar una o varias columnas",
    "description": "Aprende a actualizar múltiples atributos simultáneamente en una sola sentencia separando las asignaciones con comas.",
    "exercises": [
      {
        "id": "sql-u08-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Actualizar una o varias columnas\"?",
        "code": "SELECT id FROM estudiantes WHERE id = 1;",
        "options": [
          "1",
          "5",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "En el SET, las diferentes columnas a modificar se separan con comas (,).",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l02-e02",
        "type": "code_cloze",
        "prompt": "En la cláusula SET de un UPDATE, cuando actualizamos varias columnas las separamos con ___:",
        "codeWithBlank": "En la cláusula SET de un UPDATE, cuando actualizamos varias columnas las separamos con ___:",
        "options": [
          "comas (,)",
          "palabras AND",
          "puntos y coma (;)",
          "barras (|)"
        ],
        "correctOption": "comas (,)",
        "explanation": "Las expresiones pueden basarse en valores anteriores de la misma fila.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Actualizar una o varias columnas\":",
        "tokens": [
          "SET",
          "semestre",
          "=",
          "semestre + 1",
          ",",
          "promedio",
          "=",
          "9.5"
        ],
        "solution": [
          "SET",
          "semestre",
          "=",
          "semestre + 1",
          ",",
          "promedio",
          "=",
          "9.5"
        ],
        "explanation": "Puedes usar expresiones basadas en el valor actual: `SET salario = salario * 1.10` para aplicar un aumento del 10%.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Actualizar una o varias columnas\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "UPDATE t SET col1 = 1 AND col2 = 2", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Poner AND en vez de coma en el SET: `SET a = 1 AND b = 2` es un error de sintaxis frecuente.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Actualizar una o varias columnas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Actualizar una o varias columnas",
            "right": "En el SET, las diferentes columnas a modificar se separan con comas (,)."
          },
          {
            "left": "Principio 2",
            "right": "Las expresiones pueden basarse en valores anteriores de la misma fila."
          },
          {
            "left": "Principio 3",
            "right": "Se pueden actualizar columnas de texto, numéricas y fechas al mismo tiempo."
          },
          {
            "left": "Buena práctica",
            "right": "Puedes usar expresiones basadas en el valor actual: ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Actualizar una o varias columnas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Actualizar una o varias columnas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Puedes usar expresiones basadas en el valor actual: `SET salario = salario * 1.10` para aplicar un aumento del 10%.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Actualizar una o varias columnas\"?",
        "code": "UPDATE estudiantes \nSET carrera = 'Ingeniería de Software Avanzada', semestre = 5 \nWHERE id = 1;",
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
        "id": "sql-u08-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Actualizar una o varias columnas\":",
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
        "id": "sql-u08-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Actualizar una o varias columnas\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Poner AND en vez de coma en el SET: `SET a = 1 AND b = 2` es un error de sintaxis frecuente.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Actualizar una o varias columnas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a actualizar múltiples atributos simultáneam..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Poner AND en vez de coma en el SET: `SET a = 1 AND b..."
          },
          {
            "left": "Recomendación",
            "right": "Puedes usar expresiones basadas en el valor actual: ..."
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
    "id": "sql-u08-l03",
    "path": "sql",
    "unit": 8,
    "level": 3,
    "title": "3. DELETE",
    "description": "Elimina registros específicos de una tabla relacional que ya no sean requeridos.",
    "exercises": [
      {
        "id": "sql-u08-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"DELETE\"?",
        "code": "SELECT COUNT(*) FROM matriculas;",
        "options": [
          "7",
          "6",
          "0",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Sintaxis: DELETE FROM nombreTabla WHERE condicion;",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l03-e02",
        "type": "code_cloze",
        "prompt": "La sentencia para eliminar registros de una tabla en SQL es ___:",
        "codeWithBlank": "La sentencia para eliminar registros de una tabla en SQL es ___:",
        "options": [
          "DELETE FROM",
          "REMOVE FROM",
          "DROP ROW",
          "CLEAR TABLE"
        ],
        "correctOption": "DELETE FROM",
        "explanation": "Elimina físicamente los registros que cumplan con la condición del WHERE.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"DELETE\":",
        "tokens": [
          "DELETE",
          "FROM",
          "estudiantes",
          "WHERE",
          "id",
          "=",
          "99"
        ],
        "solution": [
          "DELETE",
          "FROM",
          "estudiantes",
          "WHERE",
          "id",
          "=",
          "99"
        ],
        "explanation": "DELETE borra las filas completas, no campos individuales (para poner un campo en blanco se usa UPDATE con NULL).",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"DELETE\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "DELETE * FROM estudiantes // En DELETE no se pone asterisco (*)", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Si omites la cláusula WHERE en un DELETE, ¡vaciarás la tabla completa borrando todos los registros!",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"DELETE\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Sintaxis",
            "right": "DELETE FROM nombreTabla WHERE condicion;"
          },
          {
            "left": "Principio 2",
            "right": "Elimina físicamente los registros que cumplan con la condición del WHERE."
          },
          {
            "left": "Principio 3",
            "right": "Conserva intacta la estructura de la tabla y sus índices."
          },
          {
            "left": "Buena práctica",
            "right": "DELETE borra las filas completas, no campos individu..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"DELETE\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"DELETE\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "DELETE borra las filas completas, no campos individuales (para poner un campo en blanco se usa UPDATE con NULL).",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"DELETE\"?",
        "code": "DELETE FROM matriculas \nWHERE id = 7;",
        "options": [
          "Query OK, filas afectadas (0.0",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, filas afectadas (0.0",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"DELETE\":",
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
        "id": "sql-u08-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"DELETE\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Si omites la cláusula WHERE en un DELETE, ¡vaciarás la tabla completa borrando todos los registros!",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"DELETE\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Elimina registros específicos de una tabla relaciona..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si omites la cláusula WHERE en un DELETE, ¡vaciarás ..."
          },
          {
            "left": "Recomendación",
            "right": "DELETE borra las filas completas, no campos individu..."
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
    "id": "sql-u08-l04",
    "path": "sql",
    "unit": 8,
    "level": 4,
    "title": "4. Uso de WHERE para delimitar cambios",
    "description": "Comprende la importancia vital de la condición WHERE como escudo protector para acotar actualizaciones y eliminaciones.",
    "exercises": [
      {
        "id": "sql-u08-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Uso de WHERE para delimitar cambios\"?",
        "code": "SELECT COUNT(*) FROM matriculas WHERE estudiante_id = 1;",
        "options": [
          "2",
          "1",
          "7",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "WHERE delimita el alcance exacto de filas afectadas por UPDATE y DELETE.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l04-e02",
        "type": "code_cloze",
        "prompt": "Para garantizar que un UPDATE afecte a un único registro específico debemos filtrar por su Llave ___:",
        "codeWithBlank": "Para garantizar que un UPDATE afecte a un único registro específico debemos filtrar por su Llave ___:",
        "options": [
          "Primaria (PK)",
          "Foránea (FK)",
          "Alternativa",
          "Candidata"
        ],
        "correctOption": "Primaria (PK)",
        "explanation": "Filtrar por PRIMARY KEY garantiza que afectes a un solo registro específico.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Uso de WHERE para delimitar cambios\":",
        "tokens": [
          "WHERE",
          "id",
          "=",
          "42"
        ],
        "solution": [
          "WHERE",
          "id",
          "=",
          "42"
        ],
        "explanation": "Siempre que vayas a modificar un único registro, filtra por su Llave Primaria (id = X).",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Uso de WHERE para delimitar cambios\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "UPDATE estudiantes SET carrera = \"Sistemas\"", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Filtrar por nombre sin considerar homónimos: `WHERE nombre = 'Carlos'` actualizará a todos los Carlos del país.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Uso de WHERE para delimitar cambios\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Uso de WHERE para delimitar cambios",
            "right": "WHERE delimita el alcance exacto de filas afectadas por UPDATE y DELETE."
          },
          {
            "left": "Principio 2",
            "right": "Filtrar por PRIMARY KEY garantiza que afectes a un solo registro específico."
          },
          {
            "left": "Principio 3",
            "right": "Garantiza precisión y evita catástrofes operativas en producción."
          },
          {
            "left": "Buena práctica",
            "right": "Siempre que vayas a modificar un único registro, fil..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Uso de WHERE para delimitar cambios\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Uso de WHERE para delimitar cambios\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Siempre que vayas a modificar un único registro, filtra por su Llave Primaria (id = X).",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Uso de WHERE para delimitar cambios\"?",
        "code": "UPDATE matriculas \nSET nota_final = 10.0 \nWHERE estudiante_id = 1 AND asignatura_id = 101;",
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
        "id": "sql-u08-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Uso de WHERE para delimitar cambios\":",
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
        "id": "sql-u08-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Uso de WHERE para delimitar cambios\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Filtrar por nombre sin considerar homónimos: `WHERE nombre = 'Carlos'` actualizará a todos los Carlos del país.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Uso de WHERE para delimitar cambios\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende la importancia vital de la condición WHERE..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Filtrar por nombre sin considerar homónimos: `WHERE ..."
          },
          {
            "left": "Recomendación",
            "right": "Siempre que vayas a modificar un único registro, fil..."
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
    "id": "sql-u08-l05",
    "path": "sql",
    "unit": 8,
    "level": 5,
    "title": "5. Consecuencias de omitir WHERE",
    "description": "Conoce la peor pesadilla del administrador de bases de datos: qué ocurre cuando ejecutas un UPDATE o DELETE accidental sin WHERE.",
    "exercises": [
      {
        "id": "sql-u08-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Consecuencias de omitir WHERE\"?",
        "code": "SELECT COUNT(*) FROM estudiantes;",
        "options": [
          "5",
          "0",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Omitir WHERE en UPDATE altera todas las filas de la tabla sin excepción.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l05-e02",
        "type": "code_cloze",
        "prompt": "Si ejecutamos un comando DELETE FROM sin la cláusula WHERE ocurrirá que ___:",
        "codeWithBlank": "Si ejecutamos un comando DELETE FROM sin la cláusula WHERE ocurrirá que ___:",
        "options": [
          "se borrarán todas las filas de la tabla",
          "dará error de sintaxis",
          "solo se borrará la primera fila",
          "se borrará la estructura"
        ],
        "correctOption": "se borrarán todas las filas de la tabla",
        "explanation": "Omitir WHERE en DELETE vacía la tabla completa.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Consecuencias de omitir WHERE\":",
        "tokens": [
          "//",
          "Nunca",
          "olvidar",
          "el",
          "WHERE",
          "en",
          "DELETE"
        ],
        "solution": [
          "//",
          "Nunca",
          "olvidar",
          "el",
          "WHERE",
          "en",
          "DELETE"
        ],
        "explanation": "Muchos clientes SQL profesionales tienen activado el \"Safe Update Mode\" que rechaza UPDATEs sin WHERE.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Consecuencias de omitir WHERE\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "DELETE FROM estudiantes", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Escribir la consulta en el cliente y presionar Ctrl+Enter antes de haber escrito la línea del WHERE.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Consecuencias de omitir WHERE\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Consecuencias de omitir WHERE",
            "right": "Omitir WHERE en UPDATE altera todas las filas de la tabla sin excepción."
          },
          {
            "left": "Principio 2",
            "right": "Omitir WHERE en DELETE vacía la tabla completa."
          },
          {
            "left": "Principio 3",
            "right": "En bases de datos sin copias de seguridad recientes, la pérdida de datos es permanente."
          },
          {
            "left": "Buena práctica",
            "right": "Muchos clientes SQL profesionales tienen activado el..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Consecuencias de omitir WHERE\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Consecuencias de omitir WHERE\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Muchos clientes SQL profesionales tienen activado el \"Safe Update Mode\" que rechaza UPDATEs sin WHERE.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Consecuencias de omitir WHERE\"?",
        "code": "\nSELECT COUNT(*) AS total_estudiantes FROM estudiantes;",
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
        "id": "sql-u08-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Consecuencias de omitir WHERE\":",
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
        "id": "sql-u08-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Consecuencias de omitir WHERE\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Escribir la consulta en el cliente y presionar Ctrl+Enter antes de haber escrito la línea del WHERE.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Consecuencias de omitir WHERE\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Conoce la peor pesadilla del administrador de bases ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Escribir la consulta en el cliente y presionar Ctrl+..."
          },
          {
            "left": "Recomendación",
            "right": "Muchos clientes SQL profesionales tienen activado el..."
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
    "id": "sql-u08-l06",
    "path": "sql",
    "unit": 8,
    "level": 6,
    "title": "6. Consultar con SELECT antes de modificar",
    "description": "Aprende la regla de oro del desarrollador senior: redacta y prueba tu filtro con SELECT antes de convertirlo en UPDATE o DELETE.",
    "exercises": [
      {
        "id": "sql-u08-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Consultar con SELECT antes de modificar\"?",
        "code": "SELECT COUNT(*) FROM matriculas WHERE nota_final >= 9.0;",
        "options": [
          "5",
          "7",
          "2",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "La cláusula WHERE de un SELECT y de un DELETE funcionan con idéntica lógica.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l06-e02",
        "type": "code_cloze",
        "prompt": "La mejor práctica antes de ejecutar un UPDATE o DELETE es verificar el filtro usando ___:",
        "codeWithBlank": "La mejor práctica antes de ejecutar un UPDATE o DELETE es verificar el filtro usando ___:",
        "options": [
          "SELECT",
          "CREATE",
          "INSERT",
          "PRAGMA"
        ],
        "correctOption": "SELECT",
        "explanation": "Ejecutar SELECT primero te da visibilidad completa del impacto del cambio.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Consultar con SELECT antes de modificar\":",
        "tokens": [
          "SELECT",
          "*",
          "FROM",
          "t",
          "WHERE",
          "condicion"
        ],
        "solution": [
          "SELECT",
          "*",
          "FROM",
          "t",
          "WHERE",
          "condicion"
        ],
        "explanation": "Escribe tu consulta empezando con `SELECT * FROM tabla WHERE ...`; cuando veas las filas exactas, cambia `SELECT *` por `DELETE`.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Consultar con SELECT antes de modificar\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "// Modificar directamente en producción sin verificar con SELECT", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Escribir el DELETE directamente confiando en tu memoria.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Consultar con SELECT antes de modificar\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Consultar con SELECT antes de modificar",
            "right": "La cláusula WHERE de un SELECT y de un DELETE funcionan con idéntica lógica."
          },
          {
            "left": "Principio 2",
            "right": "Ejecutar SELECT primero te da visibilidad completa del impacto del cambio."
          },
          {
            "left": "Principio 3",
            "right": "Reduce a cero el riesgo de borrar o alterar registros equivocados en producción."
          },
          {
            "left": "Buena práctica",
            "right": "Escribe tu consulta empezando con `SELECT * FROM tab..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Consultar con SELECT antes de modificar\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Consultar con SELECT antes de modificar\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Escribe tu consulta empezando con `SELECT * FROM tabla WHERE ...`; cuando veas las filas exactas, cambia `SELECT *` por `DELETE`.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Consultar con SELECT antes de modificar\"?",
        "code": "SELECT id, estudiante_id, nota_final \nFROM matriculas \nWHERE nota_final < 7.0;\n",
        "options": [
          "0 rows in set (0.001 sec) (Nin",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: 0 rows in set (0.001 sec) (Nin",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Consultar con SELECT antes de modificar\":",
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
        "id": "sql-u08-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Consultar con SELECT antes de modificar\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Escribir el DELETE directamente confiando en tu memoria.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Consultar con SELECT antes de modificar\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende la regla de oro del desarrollador senior: re..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Escribir el DELETE directamente confiando en tu memo..."
          },
          {
            "left": "Recomendación",
            "right": "Escribe tu consulta empezando con `SELECT * FROM tab..."
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
    "id": "sql-u08-l07",
    "path": "sql",
    "unit": 8,
    "level": 7,
    "title": "7. Diferencia entre DELETE y DROP TABLE",
    "description": "Comprende la diferencia radical entre limpiar registros (DELETE) y demoler la tabla completa del diccionario de datos (DROP TABLE).",
    "exercises": [
      {
        "id": "sql-u08-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Diferencia entre DELETE y DROP TABLE\"?",
        "code": "DROP TABLE IF EXISTS demo;",
        "options": [
          "Query OK (tabla eliminada)",
          "Error",
          "null",
          "0 rows"
        ],
        "correctOptionIndex": 0,
        "explanation": "DELETE FROM tabla elimina registros; el esquema de columnas y tipos permanece.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l07-e02",
        "type": "code_cloze",
        "prompt": "El comando de lenguaje DDL que destruye completamente una tabla y su estructura es ___:",
        "codeWithBlank": "El comando de lenguaje DDL que destruye completamente una tabla y su estructura es ___:",
        "options": [
          "DROP TABLE",
          "DELETE TABLE",
          "REMOVE TABLE",
          "CLEAR TABLE"
        ],
        "correctOption": "DROP TABLE",
        "explanation": "DROP TABLE destruye los registros, los índices, las restricciones y la tabla misma.",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Diferencia entre DELETE y DROP TABLE\":",
        "tokens": [
          "DROP",
          "TABLE",
          "IF",
          "EXISTS",
          "temp"
        ],
        "solution": [
          "DROP",
          "TABLE",
          "IF",
          "EXISTS",
          "temp"
        ],
        "explanation": "Si solo quieres reiniciar una tabla vaciando sus filas, usa DELETE (o TRUNCATE en otros motores).",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Diferencia entre DELETE y DROP TABLE\":",
        "codeSnippet": [ "-- Definición de tabla", "DELETE TABLE estudiantes", "-- Fin de sentencia" ],
        "bugLineIndex": 1,
        "explanation": "Usar DROP TABLE por error cuando solo querías reiniciar los datos: tendrás que volver a ejecutar el CREATE TABLE con todas sus llaves.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Diferencia entre DELETE y DROP TABLE\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Diferencia entre DELETE y DROP TABLE",
            "right": "DELETE FROM tabla elimina registros; el esquema de columnas y tipos permanece."
          },
          {
            "left": "Principio 2",
            "right": "DROP TABLE destruye los registros, los índices, las restricciones y la tabla misma."
          },
          {
            "left": "Principio 3",
            "right": "Tras un DROP TABLE, cualquier consulta SELECT sobre la tabla arrojará \"Table not found\"."
          },
          {
            "left": "Buena práctica",
            "right": "Si solo quieres reiniciar una tabla vaciando sus fil..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l07-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Diferencia entre DELETE y DROP TABLE\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Diferencia entre DELETE y DROP TABLE\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Si solo quieres reiniciar una tabla vaciando sus filas, usa DELETE (o TRUNCATE en otros motores).",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Diferencia entre DELETE y DROP TABLE\"?",
        "code": "DELETE FROM matriculas WHERE id = 999;\n\nDROP TABLE IF EXISTS tabla_temporal;",
        "options": [
          "Query OK, filas afectadas (0.0",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, filas afectadas (0.0",
        "xpReward": 10
      },
      {
        "id": "sql-u08-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Diferencia entre DELETE y DROP TABLE\":",
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
        "id": "sql-u08-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Diferencia entre DELETE y DROP TABLE\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Usar DROP TABLE por error cuando solo querías reiniciar los datos: tendrás que volver a ejecutar el CREATE TABLE con todas sus llaves.",
        "xpReward": 15
      },
      {
        "id": "sql-u08-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Diferencia entre DELETE y DROP TABLE\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende la diferencia radical entre limpiar regist..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar DROP TABLE por error cuando solo querías reinic..."
          },
          {
            "left": "Recomendación",
            "right": "Si solo quieres reiniciar una tabla vaciando sus fil..."
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
