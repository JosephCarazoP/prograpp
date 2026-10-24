import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_12_LESSONS: Lesson[] = [
  {
    "id": "sql-u12-l01",
    "path": "sql",
    "unit": 12,
    "level": 1,
    "title": "1. Activación de llaves foráneas (PRAGMA foreign_keys)",
    "description": "Aprende la particularidad histórica de SQLite: por compatibilidad hacia atrás, las llaves foráneas vienen desactivadas por defecto y debes activarlas.",
    "exercises": [
      {
        "id": "sql-u12-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Activación de llaves foráneas (PRAGMA foreign_keys)\"?",
        "code": "PRAGMA foreign_keys = ON;",
        "options": [
          "PRAGMA foreign_keys = ON ejecutado",
          "Error",
          "null",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "SQLite deshabilita la comprobación de llaves foráneas por compatibilidad heredada.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l01-e02",
        "type": "code_cloze",
        "prompt": "El comando de configuración para activar la verificación de llaves foráneas en SQLite es ___ foreign_keys = ON:",
        "codeWithBlank": "El comando de configuración para activar la verificación de llaves foráneas en SQLite es ___ foreign_keys = ON:",
        "options": [
          "PRAGMA",
          "SET",
          "CONFIG",
          "ALTER"
        ],
        "correctOption": "PRAGMA",
        "explanation": "PRAGMA foreign_keys = ON; activa la verificación inmediata en la conexión actual.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Activación de llaves foráneas (PRAGMA foreign_keys)\":",
        "tokens": [
          "PRAGMA",
          "foreign_keys",
          "=",
          "ON",
          ";"
        ],
        "solution": [
          "PRAGMA",
          "foreign_keys",
          "=",
          "ON",
          ";"
        ],
        "explanation": "Debes ejecutar `PRAGMA foreign_keys = ON;` al abrir cada conexión a la base de datos SQLite en tu código de Kotlin o backend.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Activación de llaves foráneas (PRAGMA foreign_keys)\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SET foreign_keys = ON", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Creer que tus llaves foráneas te protegen si no ejecutaste el comando PRAGMA: ¡SQLite permitirá meter IDs inexistentes!",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Activación de llaves foráneas (PRAGMA foreign_keys)\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Activación de llaves foráneas (PRAGMA foreign_keys)",
            "right": "SQLite deshabilita la comprobación de llaves foráneas por compatibilidad heredada."
          },
          {
            "left": "Principio 2",
            "right": "PRAGMA foreign_keys = ON; activa la verificación inmediata en la conexión actual."
          },
          {
            "left": "Principio 3",
            "right": "Garantiza que ningún INSERT viole la integridad de tus tablas padre."
          },
          {
            "left": "Buena práctica",
            "right": "Debes ejecutar `PRAGMA foreign_keys = ON;` al abrir ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Activación de llaves foráneas (PRAGMA foreign_keys)\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Activación de llaves foráneas (PRAGMA foreign_keys)\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Debes ejecutar `PRAGMA foreign_keys = ON;` al abrir cada conexión a la base de datos SQLite en tu código de Kotlin o backend.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Activación de llaves foráneas (PRAGMA foreign_keys)\"?",
        "code": "PRAGMA foreign_keys = ON;\n\nSELECT 1 AS llaves_foraneas_activas;",
        "options": [
          "PRAGMA foreign_keys = ON confi",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: PRAGMA foreign_keys = ON confi",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Activación de llaves foráneas (PRAGMA foreign_keys)\":",
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
        "id": "sql-u12-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Activación de llaves foráneas (PRAGMA foreign_keys)\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Creer que tus llaves foráneas te protegen si no ejecutaste el comando PRAGMA: ¡SQLite permitirá meter IDs inexistentes!",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Activación de llaves foráneas (PRAGMA foreign_keys)\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende la particularidad histórica de SQLite: por c..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Creer que tus llaves foráneas te protegen si no ejec..."
          },
          {
            "left": "Recomendación",
            "right": "Debes ejecutar `PRAGMA foreign_keys = ON;` al abrir ..."
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
    "id": "sql-u12-l02",
    "path": "sql",
    "unit": 12,
    "level": 2,
    "title": "2. Referencias inexistentes",
    "description": "Comprueba cómo el motor relacional bloquea inserciones corruptas cuando una llave foránea apunta a un registro padre inexistente.",
    "exercises": [
      {
        "id": "sql-u12-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Referencias inexistentes\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE id = 999;",
        "options": [
          "0",
          "1",
          "999",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "FOREIGN KEY constraint failed: el valor de la clave foránea no existe en la tabla padre.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l02-e02",
        "type": "code_cloze",
        "prompt": "Cuando intentamos insertar una llave foránea que no existe en la tabla padre se produce el error ___ constraint failed:",
        "codeWithBlank": "Cuando intentamos insertar una llave foránea que no existe en la tabla padre se produce el error ___ constraint failed:",
        "options": [
          "FOREIGN KEY",
          "UNIQUE",
          "NOT NULL",
          "CHECK"
        ],
        "correctOption": "FOREIGN KEY",
        "explanation": "Protege la base de datos contra inconsistencias lógicas graves.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Referencias inexistentes\":",
        "tokens": [
          "//",
          "Garantizar",
          "que",
          "el",
          "padre",
          "exista"
        ],
        "solution": [
          "//",
          "Garantizar",
          "que",
          "el",
          "padre",
          "exista"
        ],
        "explanation": "Este bloqueo previene datos \"huérfanos\" que luego generarían pantallas vacías o caídas en la aplicación móvil.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Referencias inexistentes\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "// Insertar hijo con FK huérfana cuando foreign_keys está activo", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Desactivar la verificación para salir del paso: es una deuda técnica que corrompe la consistencia del negocio.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Referencias inexistentes\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "FOREIGN KEY constraint failed",
            "right": "el valor de la clave foránea no existe en la tabla padre."
          },
          {
            "left": "Principio 2",
            "right": "Protege la base de datos contra inconsistencias lógicas graves."
          },
          {
            "left": "Principio 3",
            "right": "Asegura que cada registro hijo pertenezca a un padre válido y verificable."
          },
          {
            "left": "Buena práctica",
            "right": "Este bloqueo previene datos \"huérfanos\" que luego ge..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Referencias inexistentes\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Referencias inexistentes\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Este bloqueo previene datos \"huérfanos\" que luego generarían pantallas vacías o caídas en la aplicación móvil.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Referencias inexistentes\"?",
        "code": "PRAGMA foreign_keys = ON;\n\nSELECT COUNT(*) AS total_estudiantes_reales FROM estudiantes;",
        "options": [
          "PRAGMA foreign_keys = ON confi",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: PRAGMA foreign_keys = ON confi",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Referencias inexistentes\":",
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
        "id": "sql-u12-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Referencias inexistentes\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Desactivar la verificación para salir del paso: es una deuda técnica que corrompe la consistencia del negocio.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Referencias inexistentes\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprueba cómo el motor relacional bloquea insercion..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Desactivar la verificación para salir del paso: es u..."
          },
          {
            "left": "Recomendación",
            "right": "Este bloqueo previene datos \"huérfanos\" que luego ge..."
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
    "id": "sql-u12-l03",
    "path": "sql",
    "unit": 12,
    "level": 3,
    "title": "3. ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL",
    "description": "Configura el comportamiento automático cuando se borra o actualiza un registro padre: CASCADE, SET NULL o RESTRICT.",
    "exercises": [
      {
        "id": "sql-u12-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL\"?",
        "code": "SELECT 1;",
        "options": [
          "1",
          "0",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "CASCADE: propaga la eliminación o cambio del padre a todos los registros hijos.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l03-e02",
        "type": "code_cloze",
        "prompt": "La acción referencial que borra automáticamente a los hijos cuando se elimina el registro padre es ON DELETE ___:",
        "codeWithBlank": "La acción referencial que borra automáticamente a los hijos cuando se elimina el registro padre es ON DELETE ___:",
        "options": [
          "CASCADE",
          "SET NULL",
          "RESTRICT",
          "NO ACTION"
        ],
        "correctOption": "CASCADE",
        "explanation": "SET NULL: pone la columna foránea del hijo en NULL si se borra el padre.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL\":",
        "tokens": [
          "ON",
          "DELETE",
          "CASCADE"
        ],
        "solution": [
          "ON",
          "DELETE",
          "CASCADE"
        ],
        "explanation": "CASCADE es ideal para dependencias absolutas (al borrar una Factura se borran automáticamente sus FacturaDetalles).",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "ON DELETE REMOVE", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Cuidado con ON DELETE CASCADE en cascadas multinivel: podrías borrar media base de datos sin darte cuenta al eliminar un solo registro.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "CASCADE",
            "right": "propaga la eliminación o cambio del padre a todos los registros hijos."
          },
          {
            "left": "SET NULL",
            "right": "pone la columna foránea del hijo en NULL si se borra el padre."
          },
          {
            "left": "RESTRICT / NO ACTION",
            "right": "bloquea y prohíbe borrar el padre mientras tenga hijos asociados."
          },
          {
            "left": "Buena práctica",
            "right": "CASCADE es ideal para dependencias absolutas (al bor..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "CASCADE es ideal para dependencias absolutas (al borrar una Factura se borran automáticamente sus FacturaDetalles).",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL\"?",
        "code": "CREATE TABLE IF NOT EXISTS matriculas_cascada (\n    id INTEGER PRIMARY KEY,\n    estudiante_id INTEGER,\n    asignatura_id INTEGER,\n    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ",
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
        "id": "sql-u12-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL\":",
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
        "id": "sql-u12-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Cuidado con ON DELETE CASCADE en cascadas multinivel: podrías borrar media base de datos sin darte cuenta al eliminar un solo registro.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Configura el comportamiento automático cuando se bor..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Cuidado con ON DELETE CASCADE en cascadas multinivel..."
          },
          {
            "left": "Recomendación",
            "right": "CASCADE es ideal para dependencias absolutas (al bor..."
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
    "id": "sql-u12-l04",
    "path": "sql",
    "unit": 12,
    "level": 4,
    "title": "4. Qué es una transacción",
    "description": "Comprende las propiedades ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad) que blindan las operaciones financieras y críticas.",
    "exercises": [
      {
        "id": "sql-u12-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Qué es una transacción\"?",
        "code": "SELECT activo FROM usuarios WHERE id = 1;",
        "options": [
          "true",
          "false",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "A - Atomicidad: la transacción es indivisible; se completa entera o se aborta.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l04-e02",
        "type": "code_cloze",
        "prompt": "El acrónimo que resume las 4 propiedades indispensables de una transacción segura en bases de datos es ___:",
        "codeWithBlank": "El acrónimo que resume las 4 propiedades indispensables de una transacción segura en bases de datos es ___:",
        "options": [
          "ACID",
          "CRUD",
          "REST",
          "SOLID"
        ],
        "correctOption": "ACID",
        "explanation": "C - Consistencia: respeta todas las restricciones y reglas de negocio del esquema.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Qué es una transacción\":",
        "tokens": [
          "BEGIN",
          "TRANSACTION",
          ";",
          "COMMIT",
          ";"
        ],
        "solution": [
          "BEGIN",
          "TRANSACTION",
          ";",
          "COMMIT",
          ";"
        ],
        "explanation": "Atomicidad: \"Todo o nada\". Si una transacción de 10 pasos falla en el paso 9, los 8 pasos anteriores se revierten por completo.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Qué es una transacción\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "// Realizar transferencias de dinero sin envolverlas en transacciones ACID", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Hacer múltiples operaciones críticas sueltas sin englobarlas en una transacción: si se va la luz en medio, la base de datos queda corrupta.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Qué es una transacción\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "A - Atomicidad",
            "right": "la transacción es indivisible; se completa entera o se aborta."
          },
          {
            "left": "C - Consistencia",
            "right": "respeta todas las restricciones y reglas de negocio del esquema."
          },
          {
            "left": "I - Aislamiento",
            "right": "las operaciones concurrentes no interfieren entre sí."
          },
          {
            "left": "D - Durabilidad",
            "right": "una vez confirmada, los cambios sobreviven a caídas y reinicios."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Qué es una transacción\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Qué es una transacción\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Atomicidad: \"Todo o nada\". Si una transacción de 10 pasos falla en el paso 9, los 8 pasos anteriores se revierten por completo.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Qué es una transacción\"?",
        "code": "BEGIN TRANSACTION;\nUPDATE usuarios SET activo = false WHERE id = 5;\nCOMMIT;",
        "options": [
          "Operación de transacción BEGIN",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Operación de transacción BEGIN",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Qué es una transacción\":",
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
        "id": "sql-u12-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Qué es una transacción\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Hacer múltiples operaciones críticas sueltas sin englobarlas en una transacción: si se va la luz en medio, la base de datos queda corrupta.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Qué es una transacción\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende las propiedades ACID (Atomicidad, Consiste..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Hacer múltiples operaciones críticas sueltas sin eng..."
          },
          {
            "left": "Recomendación",
            "right": "Atomicidad: \"Todo o nada\". Si una transacción de 10 ..."
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
    "id": "sql-u12-l05",
    "path": "sql",
    "unit": 12,
    "level": 5,
    "title": "5. BEGIN, COMMIT y ROLLBACK",
    "description": "Controla transacciones manualmente en SQL: inicia con BEGIN, consolida con COMMIT y revierte ante cualquier fallo con ROLLBACK.",
    "exercises": [
      {
        "id": "sql-u12-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"BEGIN, COMMIT y ROLLBACK\"?",
        "code": "BEGIN; ROLLBACK; SELECT 1;",
        "options": [
          "1",
          "0",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "BEGIN: marca el punto de inicio de la unidad lógica de trabajo.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l05-e02",
        "type": "code_cloze",
        "prompt": "El comando SQL para cancelar una transacción y revertir todos los cambios efectuados es ___:",
        "codeWithBlank": "El comando SQL para cancelar una transacción y revertir todos los cambios efectuados es ___:",
        "options": [
          "ROLLBACK",
          "COMMIT",
          "REVERT",
          "UNDO"
        ],
        "correctOption": "ROLLBACK",
        "explanation": "COMMIT: persiste definitivamente todos los cambios en el almacenamiento duradero.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"BEGIN, COMMIT y ROLLBACK\":",
        "tokens": [
          "BEGIN",
          ";",
          "operaciones()",
          ";",
          "ROLLBACK",
          ";"
        ],
        "solution": [
          "BEGIN",
          ";",
          "operaciones()",
          ";",
          "ROLLBACK",
          ";"
        ],
        "explanation": "En aplicaciones reales, envuelves la transacción en un bloque try-catch: si hay excepción, ejecutas ROLLBACK en el catch.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"BEGIN, COMMIT y ROLLBACK\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "START;", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Dejar una transacción abierta con BEGIN sin ejecutar COMMIT ni ROLLBACK bloqueará las tablas impidiendo el acceso a otros usuarios.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"BEGIN, COMMIT y ROLLBACK\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "BEGIN",
            "right": "marca el punto de inicio de la unidad lógica de trabajo."
          },
          {
            "left": "COMMIT",
            "right": "persiste definitivamente todos los cambios en el almacenamiento duradero."
          },
          {
            "left": "ROLLBACK",
            "right": "cancela la transacción y devuelve la base de datos a su estado exacto antes del BEGIN."
          },
          {
            "left": "Buena práctica",
            "right": "En aplicaciones reales, envuelves la transacción en ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"BEGIN, COMMIT y ROLLBACK\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"BEGIN, COMMIT y ROLLBACK\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "En aplicaciones reales, envuelves la transacción en un bloque try-catch: si hay excepción, ejecutas ROLLBACK en el catch.",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"BEGIN, COMMIT y ROLLBACK\"?",
        "code": "BEGIN;\nUPDATE estudiantes SET promedio = 9.9 WHERE id = 3;\nCOMMIT; -- Cambios grabados permanentemente\n\nBEGIN;",
        "options": [
          "Operación de transacción BEGIN",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Operación de transacción BEGIN",
        "xpReward": 10
      },
      {
        "id": "sql-u12-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"BEGIN, COMMIT y ROLLBACK\":",
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
        "id": "sql-u12-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"BEGIN, COMMIT y ROLLBACK\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Dejar una transacción abierta con BEGIN sin ejecutar COMMIT ni ROLLBACK bloqueará las tablas impidiendo el acceso a otros usuarios.",
        "xpReward": 15
      },
      {
        "id": "sql-u12-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"BEGIN, COMMIT y ROLLBACK\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Controla transacciones manualmente en SQL: inicia co..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Dejar una transacción abierta con BEGIN sin ejecutar..."
          },
          {
            "left": "Recomendación",
            "right": "En aplicaciones reales, envuelves la transacción en ..."
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
