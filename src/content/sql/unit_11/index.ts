import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_11_LESSONS: Lesson[] = [
  {
    "id": "sql-u11-l01",
    "path": "sql",
    "unit": 11,
    "level": 1,
    "title": "1. Funciones de texto: LENGTH, TRIM, UPPER, LOWER",
    "description": "Manipula y estandariza cadenas de caracteres directamente en tus consultas SQL con las funciones nativas de SQLite.",
    "exercises": [
      {
        "id": "sql-u11-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Funciones de texto: LENGTH, TRIM, UPPER, LOWER\"?",
        "code": "SELECT LENGTH('SQL');",
        "options": [
          "3",
          "2",
          "4",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "UPPER() y LOWER() convierten a mayúsculas y minúsculas.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l01-e02",
        "type": "code_cloze",
        "prompt": "La función nativa de SQLite para calcular la longitud en caracteres de un texto es ___():",
        "codeWithBlank": "La función nativa de SQLite para calcular la longitud en caracteres de un texto es ___():",
        "options": [
          "LENGTH()",
          "LEN()",
          "SIZE()",
          "COUNT()"
        ],
        "correctOption": "LENGTH()",
        "explanation": "LENGTH() calcula la cantidad de caracteres de la cadena.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Funciones de texto: LENGTH, TRIM, UPPER, LOWER\":",
        "tokens": [
          "SELECT",
          "UPPER(nombre)",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "UPPER(nombre)",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Usa `UPPER(columna) = UPPER(\"valor\")` para búsquedas seguras sin importar si el usuario escribió con mayúsculas.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Funciones de texto: LENGTH, TRIM, UPPER, LOWER\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT LEN(nombre) FROM estudiantes", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Recuerda que en SQLite LENGTH() devuelve la cantidad de caracteres para texto y bytes para BLOB.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Funciones de texto: LENGTH, TRIM, UPPER, LOWER\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Funciones de texto: LENGTH, TRIM, UPPER, LOWER",
            "right": "UPPER() y LOWER() convierten a mayúsculas y minúsculas."
          },
          {
            "left": "Principio 2",
            "right": "LENGTH() calcula la cantidad de caracteres de la cadena."
          },
          {
            "left": "Principio 3",
            "right": "TRIM() retira espacios al inicio y final."
          },
          {
            "left": "Buena práctica",
            "right": "Usa `UPPER(columna) = UPPER(\"valor\")` para búsquedas..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Funciones de texto: LENGTH, TRIM, UPPER, LOWER\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Funciones de texto: LENGTH, TRIM, UPPER, LOWER\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Usa `UPPER(columna) = UPPER(\"valor\")` para búsquedas seguras sin importar si el usuario escribió con mayúsculas.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Funciones de texto: LENGTH, TRIM, UPPER, LOWER\"?",
        "code": "SELECT \n    UPPER(nombre) AS nombre_mayus,\n    LOWER(carrera) AS carrera_minus,\n    LENGTH(nombre) AS longitud_caracteres\nFROM estudiantes ",
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
        "id": "sql-u11-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Funciones de texto: LENGTH, TRIM, UPPER, LOWER\":",
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
        "id": "sql-u11-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Funciones de texto: LENGTH, TRIM, UPPER, LOWER\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Recuerda que en SQLite LENGTH() devuelve la cantidad de caracteres para texto y bytes para BLOB.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Funciones de texto: LENGTH, TRIM, UPPER, LOWER\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Manipula y estandariza cadenas de caracteres directa..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Recuerda que en SQLite LENGTH() devuelve la cantidad..."
          },
          {
            "left": "Recomendación",
            "right": "Usa `UPPER(columna) = UPPER(\"valor\")` para búsquedas..."
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
    "id": "sql-u11-l02",
    "path": "sql",
    "unit": 11,
    "level": 2,
    "title": "2. Funciones numéricas: ROUND",
    "description": "Controla el formato decimal de tus cálculos financieros y académicos redondeando con la función ROUND.",
    "exercises": [
      {
        "id": "sql-u11-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Funciones numéricas: ROUND\"?",
        "code": "SELECT ROUND(3.14159, 2);",
        "options": [
          "3.14",
          "3.1",
          "3.142",
          "3.0"
        ],
        "correctOptionIndex": 0,
        "explanation": "ROUND(x, d) redondea el número x a d lugares decimales.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l02-e02",
        "type": "code_cloze",
        "prompt": "La función para redondear un número a una cantidad específica de decimales en SQL es ___():",
        "codeWithBlank": "La función para redondear un número a una cantidad específica de decimales en SQL es ___():",
        "options": [
          "ROUND()",
          "TRUNC()",
          "CEIL()",
          "FLOOR()"
        ],
        "correctOption": "ROUND()",
        "explanation": "Aplica el redondeo estándar de mitad hacia arriba.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Funciones numéricas: ROUND\":",
        "tokens": [
          "SELECT",
          "ROUND(AVG(promedio), 2)",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "ROUND(AVG(promedio), 2)",
          "FROM",
          "estudiantes"
        ],
        "explanation": "`ROUND(valor, N)` redondea al número de decimales N especificado en el segundo parámetro.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Funciones numéricas: ROUND\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT ROUND(promedio, -1) // Valores negativos no son estándar", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Omitir el segundo parámetro en ROUND(): en SQLite redondeará a 0 decimales por defecto.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Funciones numéricas: ROUND\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Funciones numéricas: ROUND",
            "right": "ROUND(x, d) redondea el número x a d lugares decimales."
          },
          {
            "left": "Principio 2",
            "right": "Aplica el redondeo estándar de mitad hacia arriba."
          },
          {
            "left": "Principio 3",
            "right": "Indispensable para reportes financieros y promedios limpios."
          },
          {
            "left": "Buena práctica",
            "right": "`ROUND(valor, N)` redondea al número de decimales N ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Funciones numéricas: ROUND\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Funciones numéricas: ROUND\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "`ROUND(valor, N)` redondea al número de decimales N especificado en el segundo parámetro.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Funciones numéricas: ROUND\"?",
        "code": "SELECT \n    nombre,\n    promedio,\n    ROUND(promedio, 0) AS promedio_redondeado,\n    ROUND(promedio * 1.05, 2) AS con_bonificacion",
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
        "id": "sql-u11-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Funciones numéricas: ROUND\":",
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
        "id": "sql-u11-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Funciones numéricas: ROUND\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Omitir el segundo parámetro en ROUND(): en SQLite redondeará a 0 decimales por defecto.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Funciones numéricas: ROUND\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Controla el formato decimal de tus cálculos financie..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Omitir el segundo parámetro en ROUND(): en SQLite re..."
          },
          {
            "left": "Recomendación",
            "right": "`ROUND(valor, N)` redondea al número de decimales N ..."
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
    "id": "sql-u11-l03",
    "path": "sql",
    "unit": 11,
    "level": 3,
    "title": "3. COALESCE",
    "description": "Aprende a proporcionar valores sustitutos inmediatos devolviendo el primer argumento no nulo con COALESCE.",
    "exercises": [
      {
        "id": "sql-u11-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"COALESCE\"?",
        "code": "SELECT COALESCE(NULL, NULL, 'Asignado');",
        "options": [
          "Asignado",
          "null",
          "Error",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "COALESCE(a, b, c) evalúa de izquierda a derecha y retorna el primer valor no nulo.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l03-e02",
        "type": "code_cloze",
        "prompt": "La función que devuelve el primer valor no nulo de su lista de argumentos en SQL es ___():",
        "codeWithBlank": "La función que devuelve el primer valor no nulo de su lista de argumentos en SQL es ___():",
        "options": [
          "COALESCE()",
          "IFNULL()",
          "NVL()",
          "DEFAULT()"
        ],
        "correctOption": "COALESCE()",
        "explanation": "Es el equivalente en SQL del operador Elvis (?:) de Kotlin.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"COALESCE\":",
        "tokens": [
          "SELECT",
          "COALESCE(telefono,",
          "'Sin teléfono'",
          ")",
          "FROM",
          "usuarios"
        ],
        "solution": [
          "SELECT",
          "COALESCE(telefono,",
          "'Sin teléfono'",
          ")",
          "FROM",
          "usuarios"
        ],
        "explanation": "COALESCE acepta 2, 3 o más argumentos y se detiene en el primer valor que no sea NULL.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"COALESCE\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT COALESCE() // Requiere al menos un argumento", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Si todos los argumentos pasados a COALESCE son NULL, la función devolverá NULL.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"COALESCE\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "COALESCE",
            "right": "COALESCE(a, b, c) evalúa de izquierda a derecha y retorna el primer valor no nulo."
          },
          {
            "left": "Es el equivalente en SQL del operador Elvis (?",
            "right": ") de Kotlin."
          },
          {
            "left": "Principio 3",
            "right": "Esencial para evitar que cálculos matemáticos se conviertan en NULL accidentalmente."
          },
          {
            "left": "Buena práctica",
            "right": "COALESCE acepta 2, 3 o más argumentos y se detiene e..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"COALESCE\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"COALESCE\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "COALESCE acepta 2, 3 o más argumentos y se detiene en el primer valor que no sea NULL.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"COALESCE\"?",
        "code": "SELECT \n    nombre,\n    COALESCE(promedio, 0.0) AS nota_segura\nFROM estudiantes;",
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
        "id": "sql-u11-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"COALESCE\":",
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
        "id": "sql-u11-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"COALESCE\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Si todos los argumentos pasados a COALESCE son NULL, la función devolverá NULL.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"COALESCE\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a proporcionar valores sustitutos inmediatos..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si todos los argumentos pasados a COALESCE son NULL,..."
          },
          {
            "left": "Recomendación",
            "right": "COALESCE acepta 2, 3 o más argumentos y se detiene e..."
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
    "id": "sql-u11-l04",
    "path": "sql",
    "unit": 11,
    "level": 4,
    "title": "4. CASE",
    "description": "Implementa lógica condicional if-then-else directamente en tus consultas SQL con la estructura CASE WHEN.",
    "exercises": [
      {
        "id": "sql-u11-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"CASE\"?",
        "code": "SELECT CASE WHEN 10 > 5 THEN 'Si' ELSE 'No' END;",
        "options": [
          "Si",
          "No",
          "true",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "CASE WHEN condicion THEN valor ELSE valorPorDefecto END.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l04-e02",
        "type": "code_cloze",
        "prompt": "Toda estructura condicional CASE en SQL debe cerrarse obligatoriamente con la palabra ___:",
        "codeWithBlank": "Toda estructura condicional CASE en SQL debe cerrarse obligatoriamente con la palabra ___:",
        "options": [
          "END",
          "FINISH",
          "STOP",
          "CLOSE"
        ],
        "correctOption": "END",
        "explanation": "Permite recategorizar y transformar datos de forma declarativa.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"CASE\":",
        "tokens": [
          "CASE",
          "WHEN",
          "nota >= 70",
          "THEN",
          "'Pasa'",
          "ELSE",
          "'Falla'",
          "END"
        ],
        "solution": [
          "CASE",
          "WHEN",
          "nota >= 70",
          "THEN",
          "'Pasa'",
          "ELSE",
          "'Falla'",
          "END"
        ],
        "explanation": "La cláusula ELSE es opcional, pero si no la pones y ninguna condición se cumple, CASE devolverá NULL.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"CASE\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT CASE WHEN x > 0 THEN \"Positivo\" // Olvidó la palabra END al final", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Olvidar la palabra END para cerrar la estructura del CASE provocará un error de sintaxis.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"CASE\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "CASE",
            "right": "CASE WHEN condicion THEN valor ELSE valorPorDefecto END."
          },
          {
            "left": "Principio 2",
            "right": "Permite recategorizar y transformar datos de forma declarativa."
          },
          {
            "left": "Principio 3",
            "right": "Funciona tanto en la lista SELECT como dentro de WHERE o en ORDER BY."
          },
          {
            "left": "Buena práctica",
            "right": "La cláusula ELSE es opcional, pero si no la pones y ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"CASE\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"CASE\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "La cláusula ELSE es opcional, pero si no la pones y ninguna condición se cumple, CASE devolverá NULL.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"CASE\"?",
        "code": "SELECT \n    nombre,\n    promedio,\n    CASE \n        WHEN promedio >= 9.5 THEN 'Cuadro de Honor'",
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
        "id": "sql-u11-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"CASE\":",
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
        "id": "sql-u11-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"CASE\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Olvidar la palabra END para cerrar la estructura del CASE provocará un error de sintaxis.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"CASE\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Implementa lógica condicional if-then-else directame..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Olvidar la palabra END para cerrar la estructura del..."
          },
          {
            "left": "Recomendación",
            "right": "La cláusula ELSE es opcional, pero si no la pones y ..."
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
    "id": "sql-u11-l05",
    "path": "sql",
    "unit": 11,
    "level": 5,
    "title": "5. Funciones básicas de fecha",
    "description": "Aprende a consultar y calcular tiempos con las funciones nativas de SQLite: DATE('now'), DATETIME() y cálculos de intervalos.",
    "exercises": [
      {
        "id": "sql-u11-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Funciones básicas de fecha\"?",
        "code": "SELECT typeof(DATE('now'));",
        "options": [
          "text",
          "date",
          "datetime",
          "integer"
        ],
        "correctOptionIndex": 0,
        "explanation": "DATE('now') devuelve la fecha actual en formato 'AAAA-MM-DD'.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l05-e02",
        "type": "code_cloze",
        "prompt": "La función nativa de SQLite para obtener la fecha actual en formato ISO 'AAAA-MM-DD' es ___('now'):",
        "codeWithBlank": "La función nativa de SQLite para obtener la fecha actual en formato ISO 'AAAA-MM-DD' es ___('now'):",
        "options": [
          "DATE",
          "NOW",
          "TODAY",
          "CURDATE"
        ],
        "correctOption": "DATE",
        "explanation": "DATETIME('now') incluye la hora en formato UTC.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Funciones básicas de fecha\":",
        "tokens": [
          "SELECT",
          "DATE",
          "(",
          "'now'",
          ")"
        ],
        "solution": [
          "SELECT",
          "DATE",
          "(",
          "'now'",
          ")"
        ],
        "explanation": "En SQLite los modificadores de tiempo se pasan como cadenas: '+1 day', '-1 month', '+1 year'.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Funciones básicas de fecha\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT CURDATE()", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Intentar restar fechas directamente con `-`: las fechas son cadenas ISO, debes usar julianday() o DATE().",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Funciones básicas de fecha\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Funciones básicas de fecha",
            "right": "DATE('now') devuelve la fecha actual en formato 'AAAA-MM-DD'."
          },
          {
            "left": "Principio 2",
            "right": "DATETIME('now') incluye la hora en formato UTC."
          },
          {
            "left": "Principio 3",
            "right": "Permite calcular fechas de vencimiento y antigüedades con modificadores."
          },
          {
            "left": "Buena práctica",
            "right": "En SQLite los modificadores de tiempo se pasan como ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Funciones básicas de fecha\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Funciones básicas de fecha\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "En SQLite los modificadores de tiempo se pasan como cadenas: '+1 day', '-1 month', '+1 year'.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Funciones básicas de fecha\"?",
        "code": "SELECT \n    DATE('now') AS fecha_actual,\n    DATETIME('now') AS fecha_hora_utc,\n    DATE('now', '+7 days') AS en_una_semana;",
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
        "id": "sql-u11-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Funciones básicas de fecha\":",
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
        "id": "sql-u11-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Funciones básicas de fecha\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Intentar restar fechas directamente con `-`: las fechas son cadenas ISO, debes usar julianday() o DATE().",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Funciones básicas de fecha\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a consultar y calcular tiempos con las funci..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar restar fechas directamente con `-`: las fec..."
          },
          {
            "left": "Recomendación",
            "right": "En SQLite los modificadores de tiempo se pasan como ..."
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
    "id": "sql-u11-l06",
    "path": "sql",
    "unit": 11,
    "level": 6,
    "title": "6. Subconsultas con IN",
    "description": "Anida consultas dentro de otras: usa el resultado de un SELECT interno para alimentar la condición IN del SELECT principal.",
    "exercises": [
      {
        "id": "sql-u11-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Subconsultas con IN\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE id IN (SELECT estudiante_id FROM matriculas);",
        "options": [
          "5",
          "7",
          "1",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "Una subconsulta es una sentencia SELECT encerrada entre paréntesis.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l06-e02",
        "type": "code_cloze",
        "prompt": "Una consulta SELECT anidada dentro de otra entre paréntesis se denomina ___:",
        "codeWithBlank": "Una consulta SELECT anidada dentro de otra entre paréntesis se denomina ___:",
        "options": [
          "subconsulta (subquery)",
          "vista",
          "join",
          "procedimiento"
        ],
        "correctOption": "subconsulta (subquery)",
        "explanation": "La subconsulta interna se ejecuta primero y entrega su lista al WHERE externo.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Subconsultas con IN\":",
        "tokens": [
          "WHERE",
          "id",
          "IN",
          "(",
          "SELECT",
          "estudiante_id",
          "FROM",
          "matriculas",
          ")"
        ],
        "solution": [
          "WHERE",
          "id",
          "IN",
          "(",
          "SELECT",
          "estudiante_id",
          "FROM",
          "matriculas",
          ")"
        ],
        "explanation": "La subconsulta interna dentro de IN debe proyectar una SOLA columna (en este caso estudiante_id).",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Subconsultas con IN\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "WHERE id IN (SELECT * FROM matriculas)", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Poner `SELECT *` en la subconsulta del IN causará error de operandos múltiples: `sub-select returns 5 columns - only 1 expected`.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Subconsultas con IN\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Subconsultas con IN",
            "right": "Una subconsulta es una sentencia SELECT encerrada entre paréntesis."
          },
          {
            "left": "Principio 2",
            "right": "La subconsulta interna se ejecuta primero y entrega su lista al WHERE externo."
          },
          {
            "left": "Principio 3",
            "right": "Permite resolver preguntas de dos niveles en un solo comando SQL."
          },
          {
            "left": "Buena práctica",
            "right": "La subconsulta interna dentro de IN debe proyectar u..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Subconsultas con IN\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Subconsultas con IN\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "La subconsulta interna dentro de IN debe proyectar una SOLA columna (en este caso estudiante_id).",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Subconsultas con IN\"?",
        "code": "SELECT nombre, carrera \nFROM estudiantes \nWHERE id IN (\n    SELECT estudiante_id \n    FROM matriculas ",
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
        "id": "sql-u11-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Subconsultas con IN\":",
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
        "id": "sql-u11-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Subconsultas con IN\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Poner `SELECT *` en la subconsulta del IN causará error de operandos múltiples: `sub-select returns 5 columns - only 1 expected`.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Subconsultas con IN\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Anida consultas dentro de otras: usa el resultado de..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Poner `SELECT *` en la subconsulta del IN causará er..."
          },
          {
            "left": "Recomendación",
            "right": "La subconsulta interna dentro de IN debe proyectar u..."
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
    "id": "sql-u11-l07",
    "path": "sql",
    "unit": 11,
    "level": 7,
    "title": "7. Comparar contra un resultado agregado",
    "description": "Usa subconsultas escalares (que devuelven un único número) para comparar filas individuales contra promedios o máximos globales.",
    "exercises": [
      {
        "id": "sql-u11-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Comparar contra un resultado agregado\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE promedio > (SELECT AVG(promedio) FROM estudiantes);",
        "options": [
          "3",
          "5",
          "0",
          "2"
        ],
        "correctOptionIndex": 0,
        "explanation": "Subconsulta escalar: produce un único valor atómico de salida.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l07-e02",
        "type": "code_cloze",
        "prompt": "Una subconsulta que devuelve exactamente una sola fila y una sola columna se denomina subconsulta ___:",
        "codeWithBlank": "Una subconsulta que devuelve exactamente una sola fila y una sola columna se denomina subconsulta ___:",
        "options": [
          "escalar",
          "cartesiana",
          "vectorial",
          "temporal"
        ],
        "correctOption": "escalar",
        "explanation": "Permite comparar registros locales contra agregaciones globales del sistema.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Comparar contra un resultado agregado\":",
        "tokens": [
          "WHERE",
          "salario",
          ">",
          "(",
          "SELECT",
          "AVG(salario)",
          "FROM",
          "empleados",
          ")"
        ],
        "solution": [
          "WHERE",
          "salario",
          ">",
          "(",
          "SELECT",
          "AVG(salario)",
          "FROM",
          "empleados",
          ")"
        ],
        "explanation": "Una subconsulta escalar devuelve exactamente 1 fila y 1 columna, por lo que puede usarse con operadores matemáticos como > o <.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Comparar contra un resultado agregado\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "WHERE promedio > SELECT AVG(promedio)", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Si la subconsulta escalar devolviera múltiples filas, el operador > fallará.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Comparar contra un resultado agregado\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Subconsulta escalar",
            "right": "produce un único valor atómico de salida."
          },
          {
            "left": "Principio 2",
            "right": "Permite comparar registros locales contra agregaciones globales del sistema."
          },
          {
            "left": "Principio 3",
            "right": "Es una técnica analítica de gran valor en consultas estadísticas complejas."
          },
          {
            "left": "Buena práctica",
            "right": "Una subconsulta escalar devuelve exactamente 1 fila ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l07-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Comparar contra un resultado agregado\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Comparar contra un resultado agregado\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Una subconsulta escalar devuelve exactamente 1 fila y 1 columna, por lo que puede usarse con operadores matemáticos como > o <.",
        "xpReward": 10
      },
      {
        "id": "sql-u11-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Comparar contra un resultado agregado\"?",
        "code": "SELECT nombre, promedio \nFROM estudiantes \nWHERE promedio > (\n    SELECT AVG(promedio) \n    FROM estudiantes",
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
        "id": "sql-u11-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Comparar contra un resultado agregado\":",
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
        "id": "sql-u11-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Comparar contra un resultado agregado\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Si la subconsulta escalar devolviera múltiples filas, el operador > fallará.",
        "xpReward": 15
      },
      {
        "id": "sql-u11-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Comparar contra un resultado agregado\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Usa subconsultas escalares (que devuelven un único n..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si la subconsulta escalar devolviera múltiples filas..."
          },
          {
            "left": "Recomendación",
            "right": "Una subconsulta escalar devuelve exactamente 1 fila ..."
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
