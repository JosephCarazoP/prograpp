import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_13_LESSONS: Lesson[] = [
  {
    "id": "sql-u13-l01",
    "path": "sql",
    "unit": 13,
    "level": 1,
    "title": "1. Duplicación de datos y anomalías",
    "description": "Comprende los tres peligros del mal diseño relacional: anomalía de inserción, anomalía de actualización y anomalía de borrado.",
    "exercises": [
      {
        "id": "sql-u13-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Duplicación de datos y anomalías\"?",
        "code": "SELECT COUNT(DISTINCT carrera) FROM estudiantes;",
        "options": [
          "4",
          "5",
          "0",
          "1"
        ],
        "correctOptionIndex": 0,
        "explanation": "Anomalía de actualización: modificar un dato en un sitio y dejarlo desactualizado en otros.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l01-e02",
        "type": "code_cloze",
        "prompt": "El principio arquitectónico donde cada dato reside en un solo lugar legítimo se llama Fuente ___ de Verdad:",
        "codeWithBlank": "El principio arquitectónico donde cada dato reside en un solo lugar legítimo se llama Fuente ___ de Verdad:",
        "options": [
          "Única (Single Source of Truth)",
          "Doble",
          "Compartida",
          "Central"
        ],
        "correctOption": "Única (Single Source of Truth)",
        "explanation": "Anomalía de borrado: eliminar un registro y perder involuntariamente información secundaria importante.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Duplicación de datos y anomalías\":",
        "tokens": [
          "//",
          "Normalizar",
          "para",
          "evitar",
          "redundancia"
        ],
        "solution": [
          "//",
          "Normalizar",
          "para",
          "evitar",
          "redundancia"
        ],
        "explanation": "Single Source of Truth (Fuente Única de Verdad): cada dato debe residir en un único lugar en toda la base de datos.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Duplicación de datos y anomalías\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "// Diseñar una tabla con columnas: telefono1, telefono2, telefono3 (mala práctica)", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Tener tablas desnormalizadas donde el nombre de un profesor se repite en 200 filas de materias.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Duplicación de datos y anomalías\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Anomalía de actualización",
            "right": "modificar un dato en un sitio y dejarlo desactualizado en otros."
          },
          {
            "left": "Anomalía de borrado",
            "right": "eliminar un registro y perder involuntariamente información secundaria importante."
          },
          {
            "left": "Anomalía de inserción",
            "right": "no poder registrar un dato porque falta otra entidad obligatoria."
          },
          {
            "left": "Buena práctica",
            "right": "Single Source of Truth (Fuente Única de Verdad): cad..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Duplicación de datos y anomalías\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Duplicación de datos y anomalías\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Single Source of Truth (Fuente Única de Verdad): cada dato debe residir en un único lugar en toda la base de datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Duplicación de datos y anomalías\"?",
        "code": "SELECT DISTINCT carrera \nFROM estudiantes;",
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
        "id": "sql-u13-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Duplicación de datos y anomalías\":",
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
        "id": "sql-u13-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Duplicación de datos y anomalías\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Tener tablas desnormalizadas donde el nombre de un profesor se repite en 200 filas de materias.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Duplicación de datos y anomalías\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende los tres peligros del mal diseño relaciona..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Tener tablas desnormalizadas donde el nombre de un p..."
          },
          {
            "left": "Recomendación",
            "right": "Single Source of Truth (Fuente Única de Verdad): cad..."
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
    "id": "sql-u13-l02",
    "path": "sql",
    "unit": 13,
    "level": 2,
    "title": "2. Normalización básica: 1FN, 2FN y 3FN",
    "description": "Aprende las tres primeras formas normales: valores atómicos (1FN), dependencia funcional completa (2FN) y eliminación de dependencias transitivas (3FN).",
    "exercises": [
      {
        "id": "sql-u13-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Normalización básica: 1FN, 2FN y 3FN\"?",
        "code": "SELECT COUNT(*) FROM asignaturas;",
        "options": [
          "5",
          "0",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "1FN (Primera Forma Normal): elimina atributos multivaluados y celdas compuestas.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l02-e02",
        "type": "code_cloze",
        "prompt": "La forma normal que exige que todos los valores de las celdas sean atómicos e indivisibles es la ___:",
        "codeWithBlank": "La forma normal que exige que todos los valores de las celdas sean atómicos e indivisibles es la ___:",
        "options": [
          "1FN (Primera Forma Normal)",
          "2FN",
          "3FN",
          "Boyce-Codd"
        ],
        "correctOption": "1FN (Primera Forma Normal)",
        "explanation": "2FN (Segunda Forma Normal): elimina dependencias parciales de claves compuestas.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Normalización básica: 1FN, 2FN y 3FN\":",
        "tokens": [
          "//",
          "Aplicar",
          "1FN,",
          "2FN",
          "y",
          "3FN"
        ],
        "solution": [
          "//",
          "Aplicar",
          "1FN,",
          "2FN",
          "y",
          "3FN"
        ],
        "explanation": "La regla nemotécnica de la normalización: \"Cada atributo debe depender de la clave, de toda la clave y de nada más que de la clave\".",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Normalización básica: 1FN, 2FN y 3FN\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "// Guardar \"8888-1111 / 2222-3333\" en una sola celda viola la 1FN", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Sobre-normalizar a niveles extremos innecesarios para aplicaciones pequeñas: la 3FN es el equilibrio profesional perfecto.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Normalización básica: 1FN, 2FN y 3FN\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "1FN (Primera Forma Normal)",
            "right": "elimina atributos multivaluados y celdas compuestas."
          },
          {
            "left": "2FN (Segunda Forma Normal)",
            "right": "elimina dependencias parciales de claves compuestas."
          },
          {
            "left": "3FN (Tercera Forma Normal)",
            "right": "elimina dependencias transitivas (A -> B -> C)."
          },
          {
            "left": "Buena práctica",
            "right": "La regla nemotécnica de la normalización: \"Cada atri..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Normalización básica: 1FN, 2FN y 3FN\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Normalización básica: 1FN, 2FN y 3FN\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "La regla nemotécnica de la normalización: \"Cada atributo debe depender de la clave, de toda la clave y de nada más que de la clave\".",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Normalización básica: 1FN, 2FN y 3FN\"?",
        "code": "SELECT e.nombre, a.nombre AS materia, m.nota_final \nFROM estudiantes e \nJOIN matriculas m ON e.id = m.estudiante_id\nJOIN asignaturas a ON m.asignatura_id = a.id\nLIMIT 2;",
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
        "id": "sql-u13-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Normalización básica: 1FN, 2FN y 3FN\":",
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
        "id": "sql-u13-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Normalización básica: 1FN, 2FN y 3FN\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Sobre-normalizar a niveles extremos innecesarios para aplicaciones pequeñas: la 3FN es el equilibrio profesional perfecto.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Normalización básica: 1FN, 2FN y 3FN\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende las tres primeras formas normales: valores a..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Sobre-normalizar a niveles extremos innecesarios par..."
          },
          {
            "left": "Recomendación",
            "right": "La regla nemotécnica de la normalización: \"Cada atri..."
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
    "id": "sql-u13-l03",
    "path": "sql",
    "unit": 13,
    "level": 3,
    "title": "3. ALTER TABLE",
    "description": "Evoluciona tus esquemas de base de datos sin perder datos: añade nuevas columnas o renombra tablas con ALTER TABLE.",
    "exercises": [
      {
        "id": "sql-u13-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"ALTER TABLE\"?",
        "code": "ALTER TABLE demo RENAME TO demo_antigua;",
        "options": [
          "Query OK (esquema modificado)",
          "Error",
          "null",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "ALTER TABLE modifica la estructura de una tabla existente sin destruir sus datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l03-e02",
        "type": "code_cloze",
        "prompt": "La sentencia de lenguaje DDL para modificar la estructura de una tabla existente es ___:",
        "codeWithBlank": "La sentencia de lenguaje DDL para modificar la estructura de una tabla existente es ___:",
        "options": [
          "ALTER TABLE",
          "MODIFY TABLE",
          "UPDATE TABLE",
          "CHANGE TABLE"
        ],
        "correctOption": "ALTER TABLE",
        "explanation": "ADD COLUMN añade una nueva propiedad a todas las filas con su valor por defecto.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"ALTER TABLE\":",
        "tokens": [
          "ALTER",
          "TABLE",
          "estudiantes",
          "ADD",
          "COLUMN",
          "activo",
          "INTEGER",
          "DEFAULT",
          "1"
        ],
        "solution": [
          "ALTER",
          "TABLE",
          "estudiantes",
          "ADD",
          "COLUMN",
          "activo",
          "INTEGER",
          "DEFAULT",
          "1"
        ],
        "explanation": "En SQLite, ALTER TABLE te permite hacer `ADD COLUMN` y `RENAME TO` de forma nativa instantánea.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"ALTER TABLE\":",
        "codeSnippet": [ "-- Definición de tabla", "MODIFY TABLE estudiantes ADD COLUMN edad INT", "-- Fin de sentencia" ],
        "bugLineIndex": 1,
        "explanation": "En versiones antiguas de SQLite no se permitía borrar columnas (DROP COLUMN); siempre planifica bien tus adiciones.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"ALTER TABLE\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "ALTER TABLE",
            "right": "ALTER TABLE modifica la estructura de una tabla existente sin destruir sus datos."
          },
          {
            "left": "Principio 2",
            "right": "ADD COLUMN añade una nueva propiedad a todas las filas con su valor por defecto."
          },
          {
            "left": "Principio 3",
            "right": "RENAME TO permite cambiar el nombre formal de la tabla en el diccionario de datos."
          },
          {
            "left": "Buena práctica",
            "right": "En SQLite, ALTER TABLE te permite hacer `ADD COLUMN`..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"ALTER TABLE\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"ALTER TABLE\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "En SQLite, ALTER TABLE te permite hacer `ADD COLUMN` y `RENAME TO` de forma nativa instantánea.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"ALTER TABLE\"?",
        "code": "ALTER TABLE estudiantes ADD COLUMN observaciones TEXT DEFAULT 'Sin observaciones';\n\nSELECT id, nombre, observaciones FROM estudiantes LIMIT 1;",
        "options": [
          "Query OK, 0 rows affected (ALT",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 0 rows affected (ALT",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"ALTER TABLE\":",
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
        "id": "sql-u13-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"ALTER TABLE\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "En versiones antiguas de SQLite no se permitía borrar columnas (DROP COLUMN); siempre planifica bien tus adiciones.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"ALTER TABLE\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Evoluciona tus esquemas de base de datos sin perder ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "En versiones antiguas de SQLite no se permitía borra..."
          },
          {
            "left": "Recomendación",
            "right": "En SQLite, ALTER TABLE te permite hacer `ADD COLUMN`..."
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
    "id": "sql-u13-l04",
    "path": "sql",
    "unit": 13,
    "level": 4,
    "title": "4. DROP TABLE",
    "description": "Elimina de forma irreversible tablas obsoletas o temporales liberando espacio en el motor de base de datos.",
    "exercises": [
      {
        "id": "sql-u13-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"DROP TABLE\"?",
        "code": "DROP TABLE IF EXISTS no_existe;",
        "options": [
          "Query OK (operación completada)",
          "Error",
          "null",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "DROP TABLE destruye la tabla, todos sus registros, índices y disparadores.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l04-e02",
        "type": "code_cloze",
        "prompt": "Para evitar que DROP TABLE lance error si la tabla no existe agregamos la cláusula IF ___:",
        "codeWithBlank": "Para evitar que DROP TABLE lance error si la tabla no existe agregamos la cláusula IF ___:",
        "options": [
          "EXISTS",
          "NOT NULL",
          "VALID",
          "READY"
        ],
        "correctOption": "EXISTS",
        "explanation": "La cláusula IF EXISTS evita errores si la tabla no existe.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"DROP TABLE\":",
        "tokens": [
          "DROP",
          "TABLE",
          "IF",
          "EXISTS",
          "logs_antiguos"
        ],
        "solution": [
          "DROP",
          "TABLE",
          "IF",
          "EXISTS",
          "logs_antiguos"
        ],
        "explanation": "Usa siempre `IF EXISTS` para evitar que tu script de migración se detenga si la tabla ya había sido eliminada.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"DROP TABLE\":",
        "codeSnippet": [ "-- Definición de tabla", "DELETE TABLE demo", "-- Fin de sentencia" ],
        "bugLineIndex": 1,
        "explanation": "DROP TABLE es irreversible: no hay \"papelera de reciclaje\" en SQL; si no tienes backup, los datos se pierden para siempre.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"DROP TABLE\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "DROP TABLE",
            "right": "DROP TABLE destruye la tabla, todos sus registros, índices y disparadores."
          },
          {
            "left": "Principio 2",
            "right": "La cláusula IF EXISTS evita errores si la tabla no existe."
          },
          {
            "left": "Principio 3",
            "right": "Si la tabla está referenciada por claves foráneas activas, SQLite impedirá su eliminación."
          },
          {
            "left": "Buena práctica",
            "right": "Usa siempre `IF EXISTS` para evitar que tu script de..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"DROP TABLE\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"DROP TABLE\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Usa siempre `IF EXISTS` para evitar que tu script de migración se detenga si la tabla ya había sido eliminada.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"DROP TABLE\"?",
        "code": "DROP TABLE IF EXISTS tabla_pruebas;\n\nSELECT 'Tabla eliminada con éxito' AS estado;",
        "options": [
          "Query OK, 0 rows affected (DRO",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Query OK, 0 rows affected (DRO",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"DROP TABLE\":",
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
        "id": "sql-u13-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"DROP TABLE\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "DROP TABLE es irreversible: no hay \"papelera de reciclaje\" en SQL; si no tienes backup, los datos se pierden para siempre.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"DROP TABLE\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Elimina de forma irreversible tablas obsoletas o tem..."
          },
          {
            "left": "Riesgo crítico",
            "right": "DROP TABLE es irreversible: no hay \"papelera de reci..."
          },
          {
            "left": "Recomendación",
            "right": "Usa siempre `IF EXISTS` para evitar que tu script de..."
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
    "id": "sql-u13-l05",
    "path": "sql",
    "unit": 13,
    "level": 5,
    "title": "5. Introducción a vistas e índices",
    "description": "Optimiza la arquitectura de tu base de datos: acelera búsquedas con índices (CREATE INDEX) y encapsula consultas complejas con vistas (CREATE VIEW).",
    "exercises": [
      {
        "id": "sql-u13-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Introducción a vistas e índices\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE carrera = 'Ingeniería de Software';",
        "options": [
          "2",
          "5",
          "1",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "CREATE INDEX crea una estructura de árbol B para búsquedas O(log N).",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l05-e02",
        "type": "code_cloze",
        "prompt": "La estructura de datos que acelera dramáticamente las búsquedas en una tabla se llama ___:",
        "codeWithBlank": "La estructura de datos que acelera dramáticamente las búsquedas en una tabla se llama ___:",
        "options": [
          "índice (INDEX)",
          "vista (VIEW)",
          "trigger",
          "procedimiento"
        ],
        "correctOption": "índice (INDEX)",
        "explanation": "CREATE VIEW guarda una consulta SELECT como una tabla virtual reutilizable.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Introducción a vistas e índices\":",
        "tokens": [
          "CREATE",
          "INDEX",
          "idx_email",
          "ON",
          "usuarios",
          "(",
          "email",
          ")"
        ],
        "solution": [
          "CREATE",
          "INDEX",
          "idx_email",
          "ON",
          "usuarios",
          "(",
          "email",
          ")"
        ],
        "explanation": "Crea índices en las columnas que uses frecuentemente en cláusulas WHERE o en uniones JOIN.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Introducción a vistas e índices\":",
        "codeSnippet": [ "-- Definición de tabla", "CREATE POINTER idx_carrera ON estudiantes // La sentencia oficial es CREATE INDEX", "-- Fin de sentencia" ],
        "bugLineIndex": 1,
        "explanation": "No crees índices en todas las columnas por capricho: cada índice hace los INSERT y UPDATE un poco más lentos porque debe reindexarse.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Introducción a vistas e índices\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Introducción a vistas e índices",
            "right": "CREATE INDEX crea una estructura de árbol B para búsquedas O(log N)."
          },
          {
            "left": "Principio 2",
            "right": "CREATE VIEW guarda una consulta SELECT como una tabla virtual reutilizable."
          },
          {
            "left": "Principio 3",
            "right": "Las vistas simplifican consultas complejas para los desarrolladores frontend."
          },
          {
            "left": "Buena práctica",
            "right": "Crea índices en las columnas que uses frecuentemente..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Introducción a vistas e índices\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Introducción a vistas e índices\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Crea índices en las columnas que uses frecuentemente en cláusulas WHERE o en uniones JOIN.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Introducción a vistas e índices\"?",
        "code": "\nSELECT id, nombre, carrera \nFROM estudiantes \nWHERE carrera = 'Ingeniería de Software';",
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
        "id": "sql-u13-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Introducción a vistas e índices\":",
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
        "id": "sql-u13-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Introducción a vistas e índices\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "No crees índices en todas las columnas por capricho: cada índice hace los INSERT y UPDATE un poco más lentos porque debe reindexarse.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Introducción a vistas e índices\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Optimiza la arquitectura de tu base de datos: aceler..."
          },
          {
            "left": "Riesgo crítico",
            "right": "No crees índices en todas las columnas por capricho:..."
          },
          {
            "left": "Recomendación",
            "right": "Crea índices en las columnas que uses frecuentemente..."
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
    "id": "sql-u13-l06",
    "path": "sql",
    "unit": 13,
    "level": 6,
    "title": "6. Inyección SQL y consultas parametrizadas (concepto)",
    "description": "Comprende la vulnerabilidad de ciberseguridad número uno en bases de datos (SQL Injection) y cómo las consultas preparadas con parámetros (?) la neutralizan al 100%.",
    "exercises": [
      {
        "id": "sql-u13-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Inyección SQL y consultas parametrizadas (concepto)\"?",
        "code": "SELECT id FROM usuarios WHERE id = 1;",
        "options": [
          "1",
          "Ada",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Inyección SQL: ataque donde un usuario inyecta código SQL malicioso a través de un formulario.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l06-e02",
        "type": "code_cloze",
        "prompt": "La técnica definitiva para erradicar la Inyección SQL al 100% es el uso de consultas ___:",
        "codeWithBlank": "La técnica definitiva para erradicar la Inyección SQL al 100% es el uso de consultas ___:",
        "options": [
          "parametrizadas (preparadas)",
          "concatenadas",
          "encriptadas",
          "abiertas"
        ],
        "correctOption": "parametrizadas (preparadas)",
        "explanation": "Ocurre cuando se concatena texto de usuario directamente en la sentencia SQL.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Inyección SQL y consultas parametrizadas (concepto)\":",
        "tokens": [
          "SELECT",
          "*",
          "FROM",
          "usuarios",
          "WHERE",
          "usuario",
          "=",
          "?",
          "AND",
          "password",
          "=",
          "?"
        ],
        "solution": [
          "SELECT",
          "*",
          "FROM",
          "usuarios",
          "WHERE",
          "usuario",
          "=",
          "?",
          "AND",
          "password",
          "=",
          "?"
        ],
        "explanation": "Regla de oro de seguridad: NUNCA concatenes cadenas de texto para armar sentencias SQL. Usa siempre signos de interrogación `?`.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Inyección SQL y consultas parametrizadas (concepto)\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "val sql = \"SELECT * FROM u WHERE id = \" + id", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Creer que un filtro manual reemplazando comillas te protegerá: los atacantes conocen decenas de formas de evadir filtros manuales.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Inyección SQL y consultas parametrizadas (concepto)\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Inyección SQL",
            "right": "ataque donde un usuario inyecta código SQL malicioso a través de un formulario."
          },
          {
            "left": "Principio 2",
            "right": "Ocurre cuando se concatena texto de usuario directamente en la sentencia SQL."
          },
          {
            "left": "Consultas parametrizadas (Prepared Statements)",
            "right": "separan el código de los datos garantizando inmunidad."
          },
          {
            "left": "Buena práctica",
            "right": "Regla de oro de seguridad: NUNCA concatenes cadenas ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Inyección SQL y consultas parametrizadas (concepto)\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Inyección SQL y consultas parametrizadas (concepto)\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Regla de oro de seguridad: NUNCA concatenes cadenas de texto para armar sentencias SQL. Usa siempre signos de interrogación `?`.",
        "xpReward": 10
      },
      {
        "id": "sql-u13-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Inyección SQL y consultas parametrizadas (concepto)\"?",
        "code": "\n\nSELECT id, nombre, email FROM usuarios WHERE id = 1;",
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
        "id": "sql-u13-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Inyección SQL y consultas parametrizadas (concepto)\":",
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
        "id": "sql-u13-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Inyección SQL y consultas parametrizadas (concepto)\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Creer que un filtro manual reemplazando comillas te protegerá: los atacantes conocen decenas de formas de evadir filtros manuales.",
        "xpReward": 15
      },
      {
        "id": "sql-u13-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Inyección SQL y consultas parametrizadas (concepto)\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende la vulnerabilidad de ciberseguridad número..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Creer que un filtro manual reemplazando comillas te ..."
          },
          {
            "left": "Recomendación",
            "right": "Regla de oro de seguridad: NUNCA concatenes cadenas ..."
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
