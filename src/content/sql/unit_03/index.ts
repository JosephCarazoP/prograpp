import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_03_LESSONS: Lesson[] = [
  {
    "id": "sql-u03-l01",
    "path": "sql",
    "unit": 3,
    "level": 1,
    "title": "1. Estructura de CREATE TABLE",
    "description": "Aprende la sintaxis oficial de DDL para crear tablas en SQLite especificando columnas, tipos y restricciones.",
    "exercises": [
      {
        "id": "sql-u03-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Estructura de CREATE TABLE\"?",
        "code": "CREATE TABLE test (id INTEGER);",
        "options": [
          "Query OK (tabla creada)",
          "Error",
          "null",
          "0 rows"
        ],
        "correctOptionIndex": 0,
        "explanation": "CREATE TABLE nombreTabla (definicionesColumnas) es la sentencia DDL oficial.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l01-e02",
        "type": "code_cloze",
        "prompt": "La sentencia de lenguaje DDL para crear una nueva tabla en SQL es ___:",
        "codeWithBlank": "La sentencia de lenguaje DDL para crear una nueva tabla en SQL es ___:",
        "options": [
          "CREATE TABLE",
          "NEW TABLE",
          "MAKE TABLE",
          "ADD TABLE"
        ],
        "correctOption": "CREATE TABLE",
        "explanation": "Cada columna define nombre, tipo de dato y restricciones opcionales.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Estructura de CREATE TABLE\":",
        "tokens": [
          "CREATE",
          "TABLE",
          "aulas",
          "(",
          "id",
          "INTEGER",
          ")"
        ],
        "solution": [
          "CREATE",
          "TABLE",
          "aulas",
          "(",
          "id",
          "INTEGER",
          ")"
        ],
        "explanation": "Usa siempre `IF NOT EXISTS` para que tu script de base de datos no falle si la tabla ya había sido creada.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Estructura de CREATE TABLE\":",
        "codeSnippet": [
          "CREATE TABLE alumnos (",
          "    id INTEGER,",
          "    nombre TEXT, // Coma extra al final",
          ")"
        ],
        "bugLineIndex": 2,
        "explanation": "Olvidar la coma entre columnas o poner una coma de más después de la última columna antes del paréntesis de cierre.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Estructura de CREATE TABLE\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Estructura de CREATE TABLE",
            "right": "CREATE TABLE nombreTabla (definicionesColumnas) es la sentencia DDL oficial."
          },
          {
            "left": "Principio 2",
            "right": "Cada columna define nombre, tipo de dato y restricciones opcionales."
          },
          {
            "left": "Principio 3",
            "right": "IF NOT EXISTS garantiza idempotencia en despliegues automatizados."
          },
          {
            "left": "Buena práctica",
            "right": "Usa siempre `IF NOT EXISTS` para que tu script de ba..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Estructura de CREATE TABLE\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Estructura de CREATE TABLE\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Usa siempre `IF NOT EXISTS` para que tu script de base de datos no falle si la tabla ya había sido creada.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Estructura de CREATE TABLE\"?",
        "code": "CREATE TABLE IF NOT EXISTS profesores (\n    id INTEGER PRIMARY KEY,\n    nombre TEXT NOT NULL,\n    email TEXT UNIQUE,\n    salario REAL",
        "options": [
          "Query OK, 0 rows affected (Eng",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 0 rows affected (Eng",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Estructura de CREATE TABLE\":",
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
        "id": "sql-u03-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Estructura de CREATE TABLE\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Olvidar la coma entre columnas o poner una coma de más después de la última columna antes del paréntesis de cierre.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Estructura de CREATE TABLE\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende la sintaxis oficial de DDL para crear tablas..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Olvidar la coma entre columnas o poner una coma de m..."
          },
          {
            "left": "Recomendación",
            "right": "Usa siempre `IF NOT EXISTS` para que tu script de ba..."
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
    "id": "sql-u03-l02",
    "path": "sql",
    "unit": 3,
    "level": 2,
    "title": "2. Nombres de tablas y columnas",
    "description": "Aplica convenciones de nomenclatura profesionales: snake_case, sustantivos en minúscula y nombres descriptivos sin caracteres raros.",
    "exercises": [
      {
        "id": "sql-u03-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Nombres de tablas y columnas\"?",
        "code": "SELECT id, nombre, carrera FROM estudiantes LIMIT 1;",
        "options": [
          "1 row returned",
          "Error",
          "0 rows",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "Utiliza lower_snake_case para nombres en SQL (ej. fecha_nacimiento).",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l02-e02",
        "type": "code_cloze",
        "prompt": "La convención recomendada para nombres de columnas en bases de datos SQL es ___:",
        "codeWithBlank": "La convención recomendada para nombres de columnas en bases de datos SQL es ___:",
        "options": [
          "snake_case",
          "camelCase",
          "kebab-case",
          "UPPERCASE"
        ],
        "correctOption": "snake_case",
        "explanation": "Elige plural o singular consistentemente en tu proyecto (estudiantes o estudiante).",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Nombres de tablas y columnas\":",
        "tokens": [
          "fecha_registro",
          "TEXT",
          "NOT",
          "NULL"
        ],
        "solution": [
          "fecha_registro",
          "TEXT",
          "NOT",
          "NULL"
        ],
        "explanation": "Evita espacios y caracteres especiales como tildes o eñes en los nombres de tablas y columnas.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Nombres de tablas y columnas\":",
        "codeSnippet": [
          "CREATE TABLE usuarios (",
          "    primer nombre TEXT // Error: no se permiten espacios en el nombre",
          ")"
        ],
        "bugLineIndex": 1,
        "explanation": "Usar palabras reservadas de SQL como nombres de columnas (ej. llamar a una columna \"select\", \"where\" o \"table\").",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Nombres de tablas y columnas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Nombres de tablas y columnas",
            "right": "Utiliza lower_snake_case para nombres en SQL (ej. fecha_nacimiento)."
          },
          {
            "left": "Principio 2",
            "right": "Elige plural o singular consistentemente en tu proyecto (estudiantes o estudiante)."
          },
          {
            "left": "Principio 3",
            "right": "Nunca uses espacios ni guiones medios (-) en los identificadores."
          },
          {
            "left": "Buena práctica",
            "right": "Evita espacios y caracteres especiales como tildes o..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Nombres de tablas y columnas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Nombres de tablas y columnas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Evita espacios y caracteres especiales como tildes o eñes en los nombres de tablas y columnas.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Nombres de tablas y columnas\"?",
        "code": "CREATE TABLE IF NOT EXISTS historial_academico (\n    id INTEGER PRIMARY KEY,\n    estudiante_id INTEGER,\n    promedio_ponderado REAL,\n    fecha_cierre TEXT",
        "options": [
          "Query OK, 0 rows affected (Eng",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 0 rows affected (Eng",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Nombres de tablas y columnas\":",
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
        "id": "sql-u03-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Nombres de tablas y columnas\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Usar palabras reservadas de SQL como nombres de columnas (ej. llamar a una columna \"select\", \"where\" o \"table\").",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Nombres de tablas y columnas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aplica convenciones de nomenclatura profesionales: s..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar palabras reservadas de SQL como nombres de colu..."
          },
          {
            "left": "Recomendación",
            "right": "Evita espacios y caracteres especiales como tildes o..."
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
    "id": "sql-u03-l03",
    "path": "sql",
    "unit": 3,
    "level": 3,
    "title": "3. INTEGER, REAL y TEXT",
    "description": "Domina los tres tipos de almacenamiento fundamentales de SQLite para números enteros, números decimales y cadenas alfanuméricas.",
    "exercises": [
      {
        "id": "sql-u03-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"INTEGER, REAL y TEXT\"?",
        "code": "SELECT typeof(100), typeof(99.9), typeof('SQL');",
        "options": [
          "integer | real | text",
          "number | float | string",
          "int | decimal | char",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "INTEGER: números enteros positivos y negativos con signo.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l03-e02",
        "type": "code_cloze",
        "prompt": "En SQLite, el tipo de dato utilizado para almacenar números enteros se llama ___:",
        "codeWithBlank": "En SQLite, el tipo de dato utilizado para almacenar números enteros se llama ___:",
        "options": [
          "INTEGER",
          "NUMBER",
          "VARCHAR",
          "FLOAT"
        ],
        "correctOption": "INTEGER",
        "explanation": "REAL: números de coma flotante de 8 bytes (IEEE 754).",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"INTEGER, REAL y TEXT\":",
        "tokens": [
          "precio",
          "REAL",
          ",",
          "stock",
          "INTEGER"
        ],
        "solution": [
          "precio",
          "REAL",
          ",",
          "stock",
          "INTEGER"
        ],
        "explanation": "INTEGER almacena números enteros con tamaño dinámico (1, 2, 3, 4, 6 u 8 bytes) según la magnitud del valor.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"INTEGER, REAL y TEXT\":",
        "codeSnippet": [
          "CREATE TABLE t (",
          "    edad INT_VALOR_ERRONEO // Tipo de dato no estándar",
          ")"
        ],
        "bugLineIndex": 1,
        "explanation": "Usar TEXT para números que vas a sumar o promediar: la comparación alfabética hará que \"10\" sea menor que \"2\".",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"INTEGER, REAL y TEXT\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "INTEGER",
            "right": "números enteros positivos y negativos con signo."
          },
          {
            "left": "REAL",
            "right": "números de coma flotante de 8 bytes (IEEE 754)."
          },
          {
            "left": "TEXT",
            "right": "cadenas de caracteres codificadas en UTF-8 o UTF-16."
          },
          {
            "left": "Buena práctica",
            "right": "INTEGER almacena números enteros con tamaño dinámico..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"INTEGER, REAL y TEXT\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"INTEGER, REAL y TEXT\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "INTEGER almacena números enteros con tamaño dinámico (1, 2, 3, 4, 6 u 8 bytes) según la magnitud del valor.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"INTEGER, REAL y TEXT\"?",
        "code": "CREATE TABLE IF NOT EXISTS productos (\n    id INTEGER PRIMARY KEY,\n    descripcion TEXT,\n    precio REAL,\n    stock INTEGER",
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
        "id": "sql-u03-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"INTEGER, REAL y TEXT\":",
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
        "id": "sql-u03-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"INTEGER, REAL y TEXT\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Usar TEXT para números que vas a sumar o promediar: la comparación alfabética hará que \"10\" sea menor que \"2\".",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"INTEGER, REAL y TEXT\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Domina los tres tipos de almacenamiento fundamentale..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar TEXT para números que vas a sumar o promediar: ..."
          },
          {
            "left": "Recomendación",
            "right": "INTEGER almacena números enteros con tamaño dinámico..."
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
    "id": "sql-u03-l04",
    "path": "sql",
    "unit": 3,
    "level": 4,
    "title": "4. Reconocimiento de BLOB",
    "description": "Conoce el tipo BLOB (Binary Large Object) para almacenar datos binarios puros como imágenes, archivos o firmas criptográficas.",
    "exercises": [
      {
        "id": "sql-u03-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Reconocimiento de BLOB\"?",
        "code": "SELECT typeof(X'53514C'); -- Literal hexadecimal BLOB",
        "options": [
          "blob",
          "text",
          "integer",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "BLOB significa Binary Large Object.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l04-e02",
        "type": "code_cloze",
        "prompt": "El tipo de dato utilizado para guardar archivos binarios crudos como imágenes o hashes se abrevia ___:",
        "codeWithBlank": "El tipo de dato utilizado para guardar archivos binarios crudos como imágenes o hashes se abrevia ___:",
        "options": [
          "BLOB",
          "RAW",
          "BYTE",
          "BINARY"
        ],
        "correctOption": "BLOB",
        "explanation": "Almacena datos exactamente tal cual se ingresan, sin codificación de caracteres.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Reconocimiento de BLOB\":",
        "tokens": [
          "foto",
          "BLOB",
          ",",
          "firma",
          "BLOB"
        ],
        "solution": [
          "foto",
          "BLOB",
          ",",
          "firma",
          "BLOB"
        ],
        "explanation": "En la práctica moderna suele guardarse la URL o ruta del archivo como TEXT, y solo el archivo en sí en almacenamiento en la nube.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Reconocimiento de BLOB\":",
        "codeSnippet": [
          "CREATE TABLE img (",
          "    foto IMAGE // En SQLite estándar el tipo binario se llama BLOB",
          ")"
        ],
        "bugLineIndex": 1,
        "explanation": "Guardar archivos de video de 500 MB en columnas BLOB ralentizará enormemente las copias de seguridad de la base de datos.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Reconocimiento de BLOB\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Reconocimiento de BLOB",
            "right": "BLOB significa Binary Large Object."
          },
          {
            "left": "Principio 2",
            "right": "Almacena datos exactamente tal cual se ingresan, sin codificación de caracteres."
          },
          {
            "left": "Principio 3",
            "right": "Ideal para hashes de seguridad, claves públicas o miniaturas muy pequeñas."
          },
          {
            "left": "Buena práctica",
            "right": "En la práctica moderna suele guardarse la URL o ruta..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Reconocimiento de BLOB\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Reconocimiento de BLOB\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "En la práctica moderna suele guardarse la URL o ruta del archivo como TEXT, y solo el archivo en sí en almacenamiento en la nube.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Reconocimiento de BLOB\"?",
        "code": "CREATE TABLE IF NOT EXISTS credenciales (\n    id INTEGER PRIMARY KEY,\n    estudiante_id INTEGER,\n    foto_perfil BLOB, -- Datos binarios brutos de la imagen\n    huella_hash BLOB",
        "options": [
          "Query OK, 0 rows affected (Eng",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 0 rows affected (Eng",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Reconocimiento de BLOB\":",
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
        "id": "sql-u03-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Reconocimiento de BLOB\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Guardar archivos de video de 500 MB en columnas BLOB ralentizará enormemente las copias de seguridad de la base de datos.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Reconocimiento de BLOB\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Conoce el tipo BLOB (Binary Large Object) para almac..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Guardar archivos de video de 500 MB en columnas BLOB..."
          },
          {
            "left": "Recomendación",
            "right": "En la práctica moderna suele guardarse la URL o ruta..."
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
    "id": "sql-u03-l05",
    "path": "sql",
    "unit": 3,
    "level": 5,
    "title": "5. Representación de valores lógicos y fechas",
    "description": "Aprende cómo maneja SQLite valores booleanos (0 y 1 en INTEGER) y marcas temporales (cadenas ISO-8601 en TEXT).",
    "exercises": [
      {
        "id": "sql-u03-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Representación de valores lógicos y fechas\"?",
        "code": "SELECT 1 = true, 0 = false;",
        "options": [
          "1 | 1 (true | true)",
          "0 | 0",
          "false | false",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "SQLite no tiene un tipo BOOLEAN separado: utiliza INTEGER con valores 0 (false) y 1 (true).",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l05-e02",
        "type": "code_cloze",
        "prompt": "En SQLite, los valores booleanos true y false se representan numéricamente con los enteros ___ y ___:",
        "codeWithBlank": "En SQLite, los valores booleanos true y false se representan numéricamente con los enteros ___ y ___:",
        "options": [
          "1 y 0",
          "true y false",
          "V y F",
          "-1 y 0"
        ],
        "correctOption": "1 y 0",
        "explanation": "Las fechas se gestionan mediante funciones integradas como DATE(), TIME() y DATETIME().",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Representación de valores lógicos y fechas\":",
        "tokens": [
          "activo",
          "INTEGER",
          "DEFAULT",
          "1"
        ],
        "solution": [
          "activo",
          "INTEGER",
          "DEFAULT",
          "1"
        ],
        "explanation": "Almacena siempre fechas en formato ISO-8601 (\"AAAA-MM-DD HH:MM:SS\") para que el orden alfabético coincida con el orden cronológico.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Representación de valores lógicos y fechas\":",
        "codeSnippet": [
          "// Guardar fecha como \"15 de marzo de 2024\": imposible de ordenar con ORDER BY"
        ],
        "bugLineIndex": 0,
        "explanation": "Guardar fechas en formato \"DD/MM/AAAA\": si ordenas alfabéticamente, \"01/12/2024\" saldrá antes que \"02/01/2020\", ¡lo cual es un desastre!",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Representación de valores lógicos y fechas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "SQLite no tiene un tipo BOOLEAN separado",
            "right": "utiliza INTEGER con valores 0 (false) y 1 (true)."
          },
          {
            "left": "Principio 2",
            "right": "Las fechas se gestionan mediante funciones integradas como DATE(), TIME() y DATETIME()."
          },
          {
            "left": "Principio 3",
            "right": "El formato TEXT estándar ISO-8601 permite comparaciones cronológicas con < y >."
          },
          {
            "left": "Buena práctica",
            "right": "Almacena siempre fechas en formato ISO-8601 (\"AAAA-M..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Representación de valores lógicos y fechas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Representación de valores lógicos y fechas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Almacena siempre fechas en formato ISO-8601 (\"AAAA-MM-DD HH:MM:SS\") para que el orden alfabético coincida con el orden cronológico.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Representación de valores lógicos y fechas\"?",
        "code": "CREATE TABLE IF NOT EXISTS prestamos_libros (\n    id INTEGER PRIMARY KEY,\n    libro_id INTEGER,\n    devuelto INTEGER DEFAULT 0, -- 0 = false, 1 = true\n    fecha_prestamo TEXT DEFAULT (DATE('now')) -- Formato 'AAAA-MM-DD'",
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
        "id": "sql-u03-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Representación de valores lógicos y fechas\":",
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
        "id": "sql-u03-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Representación de valores lógicos y fechas\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Guardar fechas en formato \"DD/MM/AAAA\": si ordenas alfabéticamente, \"01/12/2024\" saldrá antes que \"02/01/2020\", ¡lo cual es un desastre!",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Representación de valores lógicos y fechas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende cómo maneja SQLite valores booleanos (0 y 1 ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Guardar fechas en formato \"DD/MM/AAAA\": si ordenas a..."
          },
          {
            "left": "Recomendación",
            "right": "Almacena siempre fechas en formato ISO-8601 (\"AAAA-M..."
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
    "id": "sql-u03-l06",
    "path": "sql",
    "unit": 3,
    "level": 6,
    "title": "6. Flexibilidad de tipos en SQLite",
    "description": "Comprende el tipado dinámico y la afinidad de tipos (type affinity) de SQLite frente a la rigidez estricta de otros motores.",
    "exercises": [
      {
        "id": "sql-u03-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Flexibilidad de tipos en SQLite\"?",
        "code": "SELECT typeof('123');",
        "options": [
          "text",
          "integer",
          "number",
          "real"
        ],
        "correctOptionIndex": 0,
        "explanation": "Afinidad de tipos: SQLite intenta convertir el valor al tipo preferido de la columna.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l06-e02",
        "type": "code_cloze",
        "prompt": "La función nativa de SQLite para inspeccionar el tipo de almacenamiento de un valor es ___():",
        "codeWithBlank": "La función nativa de SQLite para inspeccionar el tipo de almacenamiento de un valor es ___():",
        "options": [
          "typeof()",
          "type()",
          "getType()",
          "class()"
        ],
        "correctOption": "typeof()",
        "explanation": "Las 5 clases de almacenamiento fundamentales: NULL, INTEGER, REAL, TEXT, BLOB.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Flexibilidad de tipos en SQLite\":",
        "tokens": [
          "SELECT",
          "typeof",
          "(",
          "promedio",
          ")",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "typeof",
          "(",
          "promedio",
          ")",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Aunque SQLite sea flexible, escribe siempre tus sentencias como si fuera estricto para garantizar portabilidad con PostgreSQL.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Flexibilidad de tipos en SQLite\":",
        "codeSnippet": [
          "SELECT type(columna) // Error: en SQLite la función es typeof()"
        ],
        "bugLineIndex": 0,
        "explanation": "Aprovecharse del tipado flexible para meter texto en una columna INTEGER: arruinará tus funciones AVG() o SUM().",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Flexibilidad de tipos en SQLite\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Afinidad de tipos",
            "right": "SQLite intenta convertir el valor al tipo preferido de la columna."
          },
          {
            "left": "Las 5 clases de almacenamiento fundamentales",
            "right": "NULL, INTEGER, REAL, TEXT, BLOB."
          },
          {
            "left": "Principio 3",
            "right": "La función typeof() devuelve la clase de almacenamiento real de cualquier expresión."
          },
          {
            "left": "Buena práctica",
            "right": "Aunque SQLite sea flexible, escribe siempre tus sent..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Flexibilidad de tipos en SQLite\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Flexibilidad de tipos en SQLite\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Aunque SQLite sea flexible, escribe siempre tus sentencias como si fuera estricto para garantizar portabilidad con PostgreSQL.",
        "xpReward": 10
      },
      {
        "id": "sql-u03-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Flexibilidad de tipos en SQLite\"?",
        "code": "CREATE TABLE IF NOT EXISTS demo_afinidad (\n    col_int INTEGER,\n    col_txt TEXT,\n    col_num NUMERIC\n);",
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
        "id": "sql-u03-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Flexibilidad de tipos en SQLite\":",
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
        "id": "sql-u03-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Flexibilidad de tipos en SQLite\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Aprovecharse del tipado flexible para meter texto en una columna INTEGER: arruinará tus funciones AVG() o SUM().",
        "xpReward": 15
      },
      {
        "id": "sql-u03-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Flexibilidad de tipos en SQLite\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende el tipado dinámico y la afinidad de tipos ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Aprovecharse del tipado flexible para meter texto en..."
          },
          {
            "left": "Recomendación",
            "right": "Aunque SQLite sea flexible, escribe siempre tus sent..."
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
