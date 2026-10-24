import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_04_LESSONS: Lesson[] = [
  {
    "id": "sql-u04-l01",
    "path": "sql",
    "unit": 4,
    "level": 1,
    "title": "1. PRIMARY KEY",
    "description": "Aplica la restricción PRIMARY KEY para garantizar unicidad e indexación automática en cada fila de la tabla.",
    "exercises": [
      {
        "id": "sql-u04-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"PRIMARY KEY\"?",
        "code": "SELECT id FROM estudiantes WHERE id = 1;",
        "options": [
          "1",
          "Valeria",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "PRIMARY KEY combina implícitamente las restricciones UNIQUE y NOT NULL.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l01-e02",
        "type": "code_cloze",
        "prompt": "La restricción que combina unicidad estricta y prohibición de nulos para identificar filas es ___:",
        "codeWithBlank": "La restricción que combina unicidad estricta y prohibición de nulos para identificar filas es ___:",
        "options": [
          "PRIMARY KEY",
          "FOREIGN KEY",
          "CHECK",
          "DEFAULT"
        ],
        "correctOption": "PRIMARY KEY",
        "explanation": "Crea un índice de búsqueda en árbol B de alto rendimiento en el motor de base de datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"PRIMARY KEY\":",
        "tokens": [
          "id",
          "INTEGER",
          "PRIMARY",
          "KEY"
        ],
        "solution": [
          "id",
          "INTEGER",
          "PRIMARY",
          "KEY"
        ],
        "explanation": "Toda tabla relacional debe poseer una Llave Primaria bien definida para posibilitar actualizaciones y eliminaciones seguras.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"PRIMARY KEY\":",
        "codeSnippet": [ "-- Definición de tabla", "CREATE TABLE x (id INT PRIMARY KEY, cod INT PRIMARY KEY)", "-- Fin de sentencia" ],
        "bugLineIndex": 1,
        "explanation": "Intentar insertar dos filas con la misma PRIMARY KEY provocará el error: `UNIQUE constraint failed`.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"PRIMARY KEY\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "PRIMARY KEY",
            "right": "PRIMARY KEY combina implícitamente las restricciones UNIQUE y NOT NULL."
          },
          {
            "left": "Principio 2",
            "right": "Crea un índice de búsqueda en árbol B de alto rendimiento en el motor de base de datos."
          },
          {
            "left": "Principio 3",
            "right": "Solo puede existir una cláusula PRIMARY KEY por tabla."
          },
          {
            "left": "Buena práctica",
            "right": "Toda tabla relacional debe poseer una Llave Primaria..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"PRIMARY KEY\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"PRIMARY KEY\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Toda tabla relacional debe poseer una Llave Primaria bien definida para posibilitar actualizaciones y eliminaciones seguras.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"PRIMARY KEY\"?",
        "code": "CREATE TABLE IF NOT EXISTS sedes (\n    codigo TEXT PRIMARY KEY,\n    nombre TEXT NOT NULL,\n    ciudad TEXT\n);",
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
        "id": "sql-u04-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"PRIMARY KEY\":",
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
        "id": "sql-u04-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"PRIMARY KEY\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Intentar insertar dos filas con la misma PRIMARY KEY provocará el error: `UNIQUE constraint failed`.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"PRIMARY KEY\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aplica la restricción PRIMARY KEY para garantizar un..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar insertar dos filas con la misma PRIMARY KEY..."
          },
          {
            "left": "Recomendación",
            "right": "Toda tabla relacional debe poseer una Llave Primaria..."
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
    "id": "sql-u04-l02",
    "path": "sql",
    "unit": 4,
    "level": 2,
    "title": "2. INTEGER PRIMARY KEY",
    "description": "Aprende la magia de SQLite: declarar una columna como `INTEGER PRIMARY KEY` la convierte en alias de ROWID y genera autoincremento automático.",
    "exercises": [
      {
        "id": "sql-u04-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"INTEGER PRIMARY KEY\"?",
        "code": "SELECT id FROM estudiantes WHERE id = 5;",
        "options": [
          "5",
          "Lucía",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "INTEGER PRIMARY KEY es el sustituto directo de ROWID en SQLite.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l02-e02",
        "type": "code_cloze",
        "prompt": "En SQLite, declarar una columna como ___ PRIMARY KEY activa el autoincremento automático:",
        "codeWithBlank": "En SQLite, declarar una columna como ___ PRIMARY KEY activa el autoincremento automático:",
        "options": [
          "INTEGER",
          "TEXT",
          "REAL",
          "AUTO"
        ],
        "correctOption": "INTEGER",
        "explanation": "Asigna identificadores numéricos secuenciales únicos de 64 bits.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"INTEGER PRIMARY KEY\":",
        "tokens": [
          "id",
          "INTEGER",
          "PRIMARY",
          "KEY"
        ],
        "solution": [
          "id",
          "INTEGER",
          "PRIMARY",
          "KEY"
        ],
        "explanation": "Si omites el id en un INSERT o le pasas NULL, SQLite le asigna automáticamente el número consecutivo más alto + 1.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"INTEGER PRIMARY KEY\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "id INT AUTO_INCREMENT // Sintaxis de MySQL no nativa en SQLite", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Usar la palabra AUTOINCREMENT innecesariamente: en SQLite, INTEGER PRIMARY KEY ya es autoincremental sin recargar el algoritmo.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"INTEGER PRIMARY KEY\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "INTEGER PRIMARY KEY",
            "right": "INTEGER PRIMARY KEY es el sustituto directo de ROWID en SQLite."
          },
          {
            "left": "Principio 2",
            "right": "Asigna identificadores numéricos secuenciales únicos de 64 bits."
          },
          {
            "left": "Principio 3",
            "right": "Es el tipo de clave primaria más eficiente y recomendado en SQLite."
          },
          {
            "left": "Buena práctica",
            "right": "Si omites el id en un INSERT o le pasas NULL, SQLite..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"INTEGER PRIMARY KEY\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"INTEGER PRIMARY KEY\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Si omites el id en un INSERT o le pasas NULL, SQLite le asigna automáticamente el número consecutivo más alto + 1.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"INTEGER PRIMARY KEY\"?",
        "code": "CREATE TABLE IF NOT EXISTS turnos (\n    id INTEGER PRIMARY KEY, -- Autoincremento automático nativo en SQLite\n    cliente TEXT NOT NULL,\n    atendido INTEGER DEFAULT 0\n);",
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
        "id": "sql-u04-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"INTEGER PRIMARY KEY\":",
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
        "id": "sql-u04-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"INTEGER PRIMARY KEY\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Usar la palabra AUTOINCREMENT innecesariamente: en SQLite, INTEGER PRIMARY KEY ya es autoincremental sin recargar el algoritmo.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"INTEGER PRIMARY KEY\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende la magia de SQLite: declarar una columna com..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar la palabra AUTOINCREMENT innecesariamente: en S..."
          },
          {
            "left": "Recomendación",
            "right": "Si omites el id en un INSERT o le pasas NULL, SQLite..."
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
    "id": "sql-u04-l03",
    "path": "sql",
    "unit": 4,
    "level": 3,
    "title": "3. FOREIGN KEY y REFERENCES",
    "description": "Establece la integridad referencial formal vinculando columnas hijas a tablas padre con REFERENCES.",
    "exercises": [
      {
        "id": "sql-u04-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"FOREIGN KEY y REFERENCES\"?",
        "code": "SELECT estudiante_id FROM matriculas WHERE id = 1;",
        "options": [
          "1",
          "101",
          "Valeria",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "FOREIGN KEY (columna_hija) REFERENCES tabla_padre(columna_padre).",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l03-e02",
        "type": "code_cloze",
        "prompt": "La cláusula que define a qué tabla y columna apunta una llave foránea es ___:",
        "codeWithBlank": "La cláusula que define a qué tabla y columna apunta una llave foránea es ___:",
        "options": [
          "REFERENCES",
          "POINTS TO",
          "TARGET",
          "LINKS"
        ],
        "correctOption": "REFERENCES",
        "explanation": "Impide la existencia de referencias huérfanas en el sistema.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"FOREIGN KEY y REFERENCES\":",
        "tokens": [
          "FOREIGN",
          "KEY",
          "(",
          "estudiante_id",
          ")",
          "REFERENCES",
          "estudiantes",
          "(",
          "id",
          ")"
        ],
        "solution": [
          "FOREIGN",
          "KEY",
          "(",
          "estudiante_id",
          ")",
          "REFERENCES",
          "estudiantes",
          "(",
          "id",
          ")"
        ],
        "explanation": "En SQLite debes activar la verificación de llaves foráneas con el comando `PRAGMA foreign_keys = ON;`.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"FOREIGN KEY y REFERENCES\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "FOREIGN KEY (user_id)", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Olvidar el nombre de la tabla padre o la columna referenciada dentro de REFERENCES.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"FOREIGN KEY y REFERENCES\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "FOREIGN KEY y REFERENCES",
            "right": "FOREIGN KEY (columna_hija) REFERENCES tabla_padre(columna_padre)."
          },
          {
            "left": "Principio 2",
            "right": "Impide la existencia de referencias huérfanas en el sistema."
          },
          {
            "left": "Principio 3",
            "right": "Permite configurar acciones en cascada como ON DELETE CASCADE."
          },
          {
            "left": "Buena práctica",
            "right": "En SQLite debes activar la verificación de llaves fo..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"FOREIGN KEY y REFERENCES\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"FOREIGN KEY y REFERENCES\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "En SQLite debes activar la verificación de llaves foráneas con el comando `PRAGMA foreign_keys = ON;`.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"FOREIGN KEY y REFERENCES\"?",
        "code": "CREATE TABLE IF NOT EXISTS matriculas_demo (\n    id INTEGER PRIMARY KEY,\n    estudiante_id INTEGER,\n    asignatura_id INTEGER,\n    nota REAL,",
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
        "id": "sql-u04-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"FOREIGN KEY y REFERENCES\":",
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
        "id": "sql-u04-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"FOREIGN KEY y REFERENCES\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Olvidar el nombre de la tabla padre o la columna referenciada dentro de REFERENCES.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"FOREIGN KEY y REFERENCES\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Establece la integridad referencial formal vinculand..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Olvidar el nombre de la tabla padre o la columna ref..."
          },
          {
            "left": "Recomendación",
            "right": "En SQLite debes activar la verificación de llaves fo..."
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
    "id": "sql-u04-l04",
    "path": "sql",
    "unit": 4,
    "level": 4,
    "title": "4. NOT NULL",
    "description": "Exige la obligatoriedad de campos críticos prohibiendo que se guarden valores vacíos o nulos.",
    "exercises": [
      {
        "id": "sql-u04-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"NOT NULL\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE nombre IS NOT NULL;",
        "options": [
          "5",
          "0",
          "4",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "NOT NULL obliga a que la columna tenga un valor explícito en cada inserción.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l04-e02",
        "type": "code_cloze",
        "prompt": "La restricción que prohíbe que una columna contenga valores nulos se llama ___:",
        "codeWithBlank": "La restricción que prohíbe que una columna contenga valores nulos se llama ___:",
        "options": [
          "NOT NULL",
          "REQUIRED",
          "MANDATORY",
          "NO NULL"
        ],
        "correctOption": "NOT NULL",
        "explanation": "Garantiza consistencia y evita lidiar con valores nulos inesperados en consultas.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"NOT NULL\":",
        "tokens": [
          "nombre",
          "TEXT",
          "NOT",
          "NULL"
        ],
        "solution": [
          "nombre",
          "TEXT",
          "NOT",
          "NULL"
        ],
        "explanation": "Aplica NOT NULL a nombres, códigos, precios y cualquier atributo sin el cual el registro carezca de sentido de negocio.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"NOT NULL\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "INSERT INTO contactos (id) VALUES (1) // Fallará si nombre tiene restricción NOT NULL", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Intentar insertar una fila omitiendo un campo NOT NULL causará el error: `NOT NULL constraint failed`.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"NOT NULL\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "NOT NULL",
            "right": "NOT NULL obliga a que la columna tenga un valor explícito en cada inserción."
          },
          {
            "left": "Principio 2",
            "right": "Garantiza consistencia y evita lidiar con valores nulos inesperados en consultas."
          },
          {
            "left": "Principio 3",
            "right": "Puede combinarse con la restricción DEFAULT."
          },
          {
            "left": "Buena práctica",
            "right": "Aplica NOT NULL a nombres, códigos, precios y cualqu..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"NOT NULL\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"NOT NULL\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Aplica NOT NULL a nombres, códigos, precios y cualquier atributo sin el cual el registro carezca de sentido de negocio.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"NOT NULL\"?",
        "code": "CREATE TABLE IF NOT EXISTS contactos (\n    id INTEGER PRIMARY KEY,\n    nombre TEXT NOT NULL, -- Campo estrictamente obligatorio\n    telefono TEXT NOT NULL,\n    notas TEXT -- Opcional: admite null",
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
        "id": "sql-u04-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"NOT NULL\":",
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
        "id": "sql-u04-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"NOT NULL\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Intentar insertar una fila omitiendo un campo NOT NULL causará el error: `NOT NULL constraint failed`.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"NOT NULL\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Exige la obligatoriedad de campos críticos prohibien..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar insertar una fila omitiendo un campo NOT NU..."
          },
          {
            "left": "Recomendación",
            "right": "Aplica NOT NULL a nombres, códigos, precios y cualqu..."
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
    "id": "sql-u04-l05",
    "path": "sql",
    "unit": 4,
    "level": 5,
    "title": "5. UNIQUE",
    "description": "Evita duplicados en columnas no primarias asegurando que no existan dos filas con el mismo valor (ej. correos, teléfonos o códigos).",
    "exercises": [
      {
        "id": "sql-u04-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"UNIQUE\"?",
        "code": "SELECT email FROM usuarios WHERE nombre = 'Alan Turing';",
        "options": [
          "alan@bletchley.org",
          "ada@pioneers.org",
          "linus@linux.org",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "UNIQUE asegura que todos los valores no nulos de una columna sean distintos.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l05-e02",
        "type": "code_cloze",
        "prompt": "Para evitar que se repitan correos electrónicos en una tabla utilizamos la restricción ___:",
        "codeWithBlank": "Para evitar que se repitan correos electrónicos en una tabla utilizamos la restricción ___:",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "DIFFERENT",
          "PRIMARY"
        ],
        "correctOption": "UNIQUE",
        "explanation": "Genera automáticamente un índice de búsqueda único en la base de datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"UNIQUE\":",
        "tokens": [
          "email",
          "TEXT",
          "UNIQUE",
          "NOT",
          "NULL"
        ],
        "solution": [
          "email",
          "TEXT",
          "UNIQUE",
          "NOT",
          "NULL"
        ],
        "explanation": "Puedes tener tantas columnas UNIQUE como requiera tu tabla, a diferencia de la PRIMARY KEY que es única.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"UNIQUE\":",
        "codeSnippet": [ "-- Definición de tabla", "CREATE TABLE u (email TEXT ONLY_ONE)", "-- Fin de sentencia" ],
        "bugLineIndex": 1,
        "explanation": "En SQL estándar, las columnas UNIQUE sí permiten múltiples valores NULL (a menos que añadas también NOT NULL).",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"UNIQUE\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "UNIQUE",
            "right": "UNIQUE asegura que todos los valores no nulos de una columna sean distintos."
          },
          {
            "left": "Principio 2",
            "right": "Genera automáticamente un índice de búsqueda único en la base de datos."
          },
          {
            "left": "Principio 3",
            "right": "Protege contra registros duplicados de usuarios o expedientes."
          },
          {
            "left": "Buena práctica",
            "right": "Puedes tener tantas columnas UNIQUE como requiera tu..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"UNIQUE\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"UNIQUE\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Puedes tener tantas columnas UNIQUE como requiera tu tabla, a diferencia de la PRIMARY KEY que es única.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"UNIQUE\"?",
        "code": "CREATE TABLE IF NOT EXISTS cuentas_usuario (\n    id INTEGER PRIMARY KEY,\n    usuario TEXT UNIQUE NOT NULL,\n    email TEXT UNIQUE NOT NULL,\n    creado_en TEXT DEFAULT (DATE('now'))",
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
        "id": "sql-u04-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"UNIQUE\":",
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
        "id": "sql-u04-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"UNIQUE\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "En SQL estándar, las columnas UNIQUE sí permiten múltiples valores NULL (a menos que añadas también NOT NULL).",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"UNIQUE\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Evita duplicados en columnas no primarias asegurando..."
          },
          {
            "left": "Riesgo crítico",
            "right": "En SQL estándar, las columnas UNIQUE sí permiten múl..."
          },
          {
            "left": "Recomendación",
            "right": "Puedes tener tantas columnas UNIQUE como requiera tu..."
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
    "id": "sql-u04-l06",
    "path": "sql",
    "unit": 4,
    "level": 6,
    "title": "6. CHECK",
    "description": "Establece reglas de validación de negocio directamente en el motor de base de datos con la cláusula CHECK.",
    "exercises": [
      {
        "id": "sql-u04-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"CHECK\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE promedio >= 0.0 AND promedio <= 10.0;",
        "options": [
          "5",
          "0",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "CHECK evalúa una expresión booleana en cada INSERT y UPDATE.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l06-e02",
        "type": "code_cloze",
        "prompt": "La restricción que valida condiciones lógicas de negocio sobre los valores de una columna es ___:",
        "codeWithBlank": "La restricción que valida condiciones lógicas de negocio sobre los valores de una columna es ___:",
        "options": [
          "CHECK",
          "VALIDATE",
          "ASSERT",
          "RULE"
        ],
        "correctOption": "CHECK",
        "explanation": "Si la expresión devuelve false, la operación se cancela y se revierte.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"CHECK\":",
        "tokens": [
          "edad",
          "INTEGER",
          "CHECK",
          "(",
          "edad",
          ">=",
          "18",
          ")"
        ],
        "solution": [
          "edad",
          "INTEGER",
          "CHECK",
          "(",
          "edad",
          ">=",
          "18",
          ")"
        ],
        "explanation": "Las restricciones CHECK protegen la base de datos contra errores de programación en las aplicaciones que escriben datos.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"CHECK\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "INSERT INTO evaluaciones (nota) VALUES (15.0) // Fallará si hay CHECK (nota <= 10.0)", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Intentar insertar una nota de 11.5 causará el error: `CHECK constraint failed: nota >= 0.0 AND nota <= 10.0`.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"CHECK\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "CHECK",
            "right": "CHECK evalúa una expresión booleana en cada INSERT y UPDATE."
          },
          {
            "left": "Principio 2",
            "right": "Si la expresión devuelve false, la operación se cancela y se revierte."
          },
          {
            "left": "Principio 3",
            "right": "Ideal para validar rangos numéricos, listas de estados o longitudes de texto."
          },
          {
            "left": "Buena práctica",
            "right": "Las restricciones CHECK protegen la base de datos co..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"CHECK\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"CHECK\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Las restricciones CHECK protegen la base de datos contra errores de programación en las aplicaciones que escriben datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"CHECK\"?",
        "code": "CREATE TABLE IF NOT EXISTS evaluaciones (\n    id INTEGER PRIMARY KEY,\n    estudiante_id INTEGER,\n    nota REAL CHECK (nota >= 0.0 AND nota <= 10.0), -- Validación estricta de rango\n    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id)",
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
        "id": "sql-u04-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"CHECK\":",
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
        "id": "sql-u04-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"CHECK\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Intentar insertar una nota de 11.5 causará el error: `CHECK constraint failed: nota >= 0.0 AND nota <= 10.0`.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"CHECK\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Establece reglas de validación de negocio directamen..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar insertar una nota de 11.5 causará el error:..."
          },
          {
            "left": "Recomendación",
            "right": "Las restricciones CHECK protegen la base de datos co..."
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
    "id": "sql-u04-l07",
    "path": "sql",
    "unit": 4,
    "level": 7,
    "title": "7. DEFAULT",
    "description": "Asigna valores predeterminados automáticos cuando el usuario u origen omite el dato en la inserción.",
    "exercises": [
      {
        "id": "sql-u04-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"DEFAULT\"?",
        "code": "SELECT activo FROM usuarios WHERE id = 1;",
        "options": [
          "true",
          "false",
          "null",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "DEFAULT rellena la columna si esta no se menciona en la lista de campos del INSERT.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l07-e02",
        "type": "code_cloze",
        "prompt": "La cláusula para especificar un valor automático si no se proporciona ninguno es ___:",
        "codeWithBlank": "La cláusula para especificar un valor automático si no se proporciona ninguno es ___:",
        "options": [
          "DEFAULT",
          "AUTO",
          "STANDARD",
          "FALLBACK"
        ],
        "correctOption": "DEFAULT",
        "explanation": "Evita llenar el código de la aplicación cliente con valores repetitivos.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"DEFAULT\":",
        "tokens": [
          "estado",
          "TEXT",
          "DEFAULT",
          "'activo'"
        ],
        "solution": [
          "estado",
          "TEXT",
          "DEFAULT",
          "'activo'"
        ],
        "explanation": "Puedes usar valores constantes (`DEFAULT 0`, `DEFAULT \"activo\"`) o funciones de fecha (`DEFAULT (DATE(\"now\"))`).",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"DEFAULT\":",
        "codeSnippet": [ "-- Definición de tabla", "CREATE TABLE t (estado TEXT PRESET \"ok\")", "-- Fin de sentencia" ],
        "bugLineIndex": 1,
        "explanation": "Si pasas explícitamente `NULL` en el INSERT, el valor predeterminado DEFAULT no se aplicará.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"DEFAULT\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "DEFAULT",
            "right": "DEFAULT rellena la columna si esta no se menciona en la lista de campos del INSERT."
          },
          {
            "left": "Principio 2",
            "right": "Evita llenar el código de la aplicación cliente con valores repetitivos."
          },
          {
            "left": "Principio 3",
            "right": "Permite evolucionar esquemas añadiendo nuevas columnas sin romper código antiguo."
          },
          {
            "left": "Buena práctica",
            "right": "Puedes usar valores constantes (`DEFAULT 0`, `DEFAUL..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l07-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"DEFAULT\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"DEFAULT\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Puedes usar valores constantes (`DEFAULT 0`, `DEFAULT \"activo\"`) o funciones de fecha (`DEFAULT (DATE(\"now\"))`).",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"DEFAULT\"?",
        "code": "CREATE TABLE IF NOT EXISTS inscripciones (\n    id INTEGER PRIMARY KEY,\n    estudiante_id INTEGER,\n    estado TEXT DEFAULT 'pendiente', -- Valor predeterminado\n    creditos INTEGER DEFAULT 4,",
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
        "id": "sql-u04-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"DEFAULT\":",
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
        "id": "sql-u04-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"DEFAULT\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Si pasas explícitamente `NULL` en el INSERT, el valor predeterminado DEFAULT no se aplicará.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"DEFAULT\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Asigna valores predeterminados automáticos cuando el..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si pasas explícitamente `NULL` en el INSERT, el valo..."
          },
          {
            "left": "Recomendación",
            "right": "Puedes usar valores constantes (`DEFAULT 0`, `DEFAUL..."
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
    "id": "sql-u04-l08",
    "path": "sql",
    "unit": 4,
    "level": 8,
    "title": "8. Diferencia entre NULL, cero, texto vacío y valor predeterminado",
    "description": "Comprende la sutil pero vital diferencia entre el concepto de ausencia de dato (NULL), valor numérico neutro (0) y cadena vacía (\"\").",
    "exercises": [
      {
        "id": "sql-u04-l08-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Diferencia entre NULL, cero, texto vacío y valor predeterminado\"?",
        "code": "SELECT NULL = NULL, NULL IS NULL;",
        "options": [
          "NULL (falso) | 1 (true)",
          "1 | 1",
          "true | false",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "NULL significa desconocido o no aplicable.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l08-e02",
        "type": "code_cloze",
        "prompt": "Para comprobar si una columna no tiene ningún dato almacenado en SQL usamos el operador ___:",
        "codeWithBlank": "Para comprobar si una columna no tiene ningún dato almacenado en SQL usamos el operador ___:",
        "options": [
          "IS NULL",
          "= NULL",
          "== NULL",
          "IS EMPTY"
        ],
        "correctOption": "IS NULL",
        "explanation": "0 es un número entero válido y real en la escala matemática.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l08-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Diferencia entre NULL, cero, texto vacío y valor predeterminado\":",
        "tokens": [
          "WHERE",
          "telefono",
          "IS",
          "NULL"
        ],
        "solution": [
          "WHERE",
          "telefono",
          "IS",
          "NULL"
        ],
        "explanation": "Recuerda: NULL nunca es igual a nada, ¡ni siquiera a otro NULL! Para evaluarlo debes usar `IS NULL`.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l08-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Diferencia entre NULL, cero, texto vacío y valor predeterminado\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT * FROM estudiantes WHERE telefono = NULL", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Calcular el promedio de salarios con ceros en vez de nulos: los ceros bajan el promedio; los nulos son ignorados.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l08-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Diferencia entre NULL, cero, texto vacío y valor predeterminado\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Diferencia entre NULL, cero, texto vacío y valor predeterminado",
            "right": "NULL significa desconocido o no aplicable."
          },
          {
            "left": "Principio 2",
            "right": "0 es un número entero válido y real en la escala matemática."
          },
          {
            "left": "Principio 3",
            "right": "\"\" es una cadena de texto de longitud cero válida."
          },
          {
            "left": "Principio 4",
            "right": "El valor predeterminado se aplica únicamente cuando la columna se omite."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l08-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Diferencia entre NULL, cero, texto vacío y valor predeterminado\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Diferencia entre NULL, cero, texto vacío y valor predeterminado\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Recuerda: NULL nunca es igual a nada, ¡ni siquiera a otro NULL! Para evaluarlo debes usar `IS NULL`.",
        "xpReward": 10
      },
      {
        "id": "sql-u04-l08-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Diferencia entre NULL, cero, texto vacío y valor predeterminado\"?",
        "code": "SELECT \n    NULL AS valor_nulo,\n    0 AS valor_cero,\n    '' AS texto_vacio,\n    'activo' AS valor_default;",
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
        "id": "sql-u04-l08-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Diferencia entre NULL, cero, texto vacío y valor predeterminado\":",
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
        "id": "sql-u04-l08-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Diferencia entre NULL, cero, texto vacío y valor predeterminado\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Calcular el promedio de salarios con ceros en vez de nulos: los ceros bajan el promedio; los nulos son ignorados.",
        "xpReward": 15
      },
      {
        "id": "sql-u04-l08-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Diferencia entre NULL, cero, texto vacío y valor predeterminado\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende la sutil pero vital diferencia entre el co..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Calcular el promedio de salarios con ceros en vez de..."
          },
          {
            "left": "Recomendación",
            "right": "Recuerda: NULL nunca es igual a nada, ¡ni siquiera a..."
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
