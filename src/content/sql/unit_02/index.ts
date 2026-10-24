import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_02_LESSONS: Lesson[] = [
  {
    "id": "sql-u02-l01",
    "path": "sql",
    "unit": 2,
    "level": 1,
    "title": "1. Entidades y atributos",
    "description": "Modela el dominio universitario: la entidad Estudiante y la entidad Asignatura con sus respectivos atributos descriptivos.",
    "exercises": [
      {
        "id": "sql-u02-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Entidades y atributos\"?",
        "code": "SELECT carrera FROM estudiantes WHERE id = 4;",
        "options": [
          "Ciberseguridad",
          "Software",
          "Computación",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "Entidad: objeto del mundo real distinguible de otros (ej. Estudiante, Asignatura).",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l01-e02",
        "type": "code_cloze",
        "prompt": "En el modelado relacional, una persona u objeto del mundo real que deseamos registrar es una ___:",
        "codeWithBlank": "En el modelado relacional, una persona u objeto del mundo real que deseamos registrar es una ___:",
        "options": [
          "entidad",
          "clave foránea",
          "relación",
          "consulta"
        ],
        "correctOption": "entidad",
        "explanation": "Atributo: característica o propiedad de la entidad (ej. nombre, creditos).",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Entidades y atributos\":",
        "tokens": [
          "SELECT",
          "id, nombre, promedio",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "id, nombre, promedio",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Una entidad debe tener un propósito claro en el negocio; los atributos deben ser propiedades atómicas.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Entidades y atributos\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT id, nombre FROM", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Crear entidades con atributos irrelevantes que el sistema nunca utilizará (ej. color favorito de zapatos del alumno).",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Entidades y atributos\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Entidad",
            "right": "objeto del mundo real distinguible de otros (ej. Estudiante, Asignatura)."
          },
          {
            "left": "Atributo",
            "right": "característica o propiedad de la entidad (ej. nombre, creditos)."
          },
          {
            "left": "Principio 3",
            "right": "En el diseño físico, cada entidad se convierte en una tabla."
          },
          {
            "left": "Buena práctica",
            "right": "Una entidad debe tener un propósito claro en el nego..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Entidades y atributos\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Entidades y atributos\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Una entidad debe tener un propósito claro en el negocio; los atributos deben ser propiedades atómicas.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Entidades y atributos\"?",
        "code": "SELECT id, nombre, carrera, promedio \nFROM estudiantes \nWHERE id = 1;",
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
        "id": "sql-u02-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Entidades y atributos\":",
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
        "id": "sql-u02-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Entidades y atributos\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Crear entidades con atributos irrelevantes que el sistema nunca utilizará (ej. color favorito de zapatos del alumno).",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Entidades y atributos\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Modela el dominio universitario: la entidad Estudian..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Crear entidades con atributos irrelevantes que el si..."
          },
          {
            "left": "Recomendación",
            "right": "Una entidad debe tener un propósito claro en el nego..."
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
    "id": "sql-u02-l02",
    "path": "sql",
    "unit": 2,
    "level": 2,
    "title": "2. Selección de los datos necesarios",
    "description": "Aprende a depurar tu modelo de datos: recopila solo los atributos necesarios evitando redundancia y campos calculables.",
    "exercises": [
      {
        "id": "sql-u02-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Selección de los datos necesarios\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE semestre >= 4;",
        "options": [
          "3",
          "5",
          "2",
          "4"
        ],
        "correctOptionIndex": 0,
        "explanation": "Minimización de datos: almacenar solo lo estrictamente necesario.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l02-e02",
        "type": "code_cloze",
        "prompt": "Un atributo cuyo valor puede calcularse a partir de otros se denomina atributo ___:",
        "codeWithBlank": "Un atributo cuyo valor puede calcularse a partir de otros se denomina atributo ___:",
        "options": [
          "derivado / calculado",
          "primario",
          "foráneo",
          "nulo"
        ],
        "correctOption": "derivado / calculado",
        "explanation": "Evita almacenar atributos derivados que pueden calcularse con una consulta SELECT.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Selección de los datos necesarios\":",
        "tokens": [
          "SELECT",
          "nombre, semestre",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "nombre, semestre",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Si un dato puede calcularse a partir de otros (como el total de una factura o la edad), no lo guardes como columna.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Selección de los datos necesarios\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT * FROM estudiantes WHERE semestre == 4", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Guardar datos que cambian con el tiempo sin auditoría (como precios volátiles sin historial).",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Selección de los datos necesarios\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Minimización de datos",
            "right": "almacenar solo lo estrictamente necesario."
          },
          {
            "left": "Principio 2",
            "right": "Evita almacenar atributos derivados que pueden calcularse con una consulta SELECT."
          },
          {
            "left": "Principio 3",
            "right": "Garantiza la consistencia y reduce drásticamente el espacio de almacenamiento."
          },
          {
            "left": "Buena práctica",
            "right": "Si un dato puede calcularse a partir de otros (como ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Selección de los datos necesarios\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Selección de los datos necesarios\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Si un dato puede calcularse a partir de otros (como el total de una factura o la edad), no lo guardes como columna.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Selección de los datos necesarios\"?",
        "code": "SELECT id, nombre, semestre \nFROM estudiantes \nWHERE semestre > 3;",
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
        "id": "sql-u02-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Selección de los datos necesarios\":",
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
        "id": "sql-u02-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Selección de los datos necesarios\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Guardar datos que cambian con el tiempo sin auditoría (como precios volátiles sin historial).",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Selección de los datos necesarios\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a depurar tu modelo de datos: recopila solo ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Guardar datos que cambian con el tiempo sin auditorí..."
          },
          {
            "left": "Recomendación",
            "right": "Si un dato puede calcularse a partir de otros (como ..."
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
    "id": "sql-u02-l03",
    "path": "sql",
    "unit": 2,
    "level": 3,
    "title": "3. Llave primaria (PK)",
    "description": "Garantiza que cada registro sea único e irrepetible en el universo de la tabla usando una Llave Primaria (PRIMARY KEY).",
    "exercises": [
      {
        "id": "sql-u02-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Llave primaria (PK)\"?",
        "code": "SELECT nombre FROM estudiantes WHERE id = 1;",
        "options": [
          "Valeria Morales",
          "Diego Fernández",
          "Camila Gómez",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "PRIMARY KEY: restricción que asegura unicidad absoluta y prohíbe valores nulos.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l03-e02",
        "type": "code_cloze",
        "prompt": "La columna que identifica de manera única e irrepetible a cada fila en una tabla se llama Llave ___:",
        "codeWithBlank": "La columna que identifica de manera única e irrepetible a cada fila en una tabla se llama Llave ___:",
        "options": [
          "Primaria (PK)",
          "Foránea (FK)",
          "Candidata",
          "Compuesta"
        ],
        "correctOption": "Primaria (PK)",
        "explanation": "Cada tabla relacional bien diseñada debe tener una y solo una llave primaria.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Llave primaria (PK)\":",
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
        "explanation": "En SQLite, INTEGER PRIMARY KEY es automáticamente autoincremental y súper eficiente para búsquedas.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Llave primaria (PK)\":",
        "codeSnippet": [
          "CREATE TABLE test (",
          "    id INTEGER, // Olvidó designar la PRIMARY KEY",
          "    nombre TEXT",
          ")"
        ],
        "bugLineIndex": 1,
        "explanation": "Nunca uses datos mutables como Llave Primaria (como el correo o el teléfono que el usuario puede cambiar).",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Llave primaria (PK)\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "PRIMARY KEY",
            "right": "restricción que asegura unicidad absoluta y prohíbe valores nulos."
          },
          {
            "left": "Principio 2",
            "right": "Cada tabla relacional bien diseñada debe tener una y solo una llave primaria."
          },
          {
            "left": "Principio 3",
            "right": "Permite recuperar una fila específica en tiempo récord."
          },
          {
            "left": "Buena práctica",
            "right": "En SQLite, INTEGER PRIMARY KEY es automáticamente au..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Llave primaria (PK)\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Llave primaria (PK)\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "En SQLite, INTEGER PRIMARY KEY es automáticamente autoincremental y súper eficiente para búsquedas.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Llave primaria (PK)\"?",
        "code": "SELECT id, nombre \nFROM estudiantes \nWHERE id = 3;",
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
        "id": "sql-u02-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Llave primaria (PK)\":",
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
        "id": "sql-u02-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Llave primaria (PK)\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Nunca uses datos mutables como Llave Primaria (como el correo o el teléfono que el usuario puede cambiar).",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Llave primaria (PK)\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Garantiza que cada registro sea único e irrepetible ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Nunca uses datos mutables como Llave Primaria (como ..."
          },
          {
            "left": "Recomendación",
            "right": "En SQLite, INTEGER PRIMARY KEY es automáticamente au..."
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
    "id": "sql-u02-l04",
    "path": "sql",
    "unit": 2,
    "level": 4,
    "title": "4. Llave foránea (FK)",
    "description": "Conecta tablas de forma segura mediante Llaves Foráneas (FOREIGN KEY): referencias que apuntan a la llave primaria de otra tabla.",
    "exercises": [
      {
        "id": "sql-u02-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Llave foránea (FK)\"?",
        "code": "SELECT COUNT(*) FROM matriculas WHERE estudiante_id = 2;",
        "options": [
          "2",
          "1",
          "0",
          "4"
        ],
        "correctOptionIndex": 0,
        "explanation": "FOREIGN KEY: campo en una tabla hija que hace referencia a la PRIMARY KEY de una tabla padre.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l04-e02",
        "type": "code_cloze",
        "prompt": "La columna que hace referencia a la llave primaria de otra tabla se denomina Llave ___:",
        "codeWithBlank": "La columna que hace referencia a la llave primaria de otra tabla se denomina Llave ___:",
        "options": [
          "Foránea (FK)",
          "Primaria (PK)",
          "Única (UK)",
          "Check"
        ],
        "correctOption": "Foránea (FK)",
        "explanation": "Impide registrar hijos sin padre válido en la base de datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Llave foránea (FK)\":",
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
        "explanation": "La llave foránea garantiza la integridad referencial: no puedes matricular a un estudiante con id = 999 si no existe en la tabla estudiantes.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Llave foránea (FK)\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "FOREIGN KEY estudiante_id", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Crear relaciones lógicas sin declarar formalmente la FOREIGN KEY permite que queden registros huérfanos.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Llave foránea (FK)\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "FOREIGN KEY",
            "right": "campo en una tabla hija que hace referencia a la PRIMARY KEY de una tabla padre."
          },
          {
            "left": "Principio 2",
            "right": "Impide registrar hijos sin padre válido en la base de datos."
          },
          {
            "left": "Principio 3",
            "right": "Es el puente esencial que permite realizar consultas JOIN posteriores."
          },
          {
            "left": "Buena práctica",
            "right": "La llave foránea garantiza la integridad referencial..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Llave foránea (FK)\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Llave foránea (FK)\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "La llave foránea garantiza la integridad referencial: no puedes matricular a un estudiante con id = 999 si no existe en la tabla estudiantes.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Llave foránea (FK)\"?",
        "code": "SELECT id, estudiante_id, asignatura_id, periodo, nota_final \nFROM matriculas \nWHERE estudiante_id = 1;",
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
        "id": "sql-u02-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Llave foránea (FK)\":",
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
        "id": "sql-u02-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Llave foránea (FK)\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Crear relaciones lógicas sin declarar formalmente la FOREIGN KEY permite que queden registros huérfanos.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Llave foránea (FK)\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Conecta tablas de forma segura mediante Llaves Forán..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Crear relaciones lógicas sin declarar formalmente la..."
          },
          {
            "left": "Recomendación",
            "right": "La llave foránea garantiza la integridad referencial..."
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
    "id": "sql-u02-l05",
    "path": "sql",
    "unit": 2,
    "level": 5,
    "title": "5. Relaciones uno a uno y uno a muchos",
    "description": "Comprende las cardinalidades 1:1 (un estudiante tiene un solo expediente médico) y 1:N (un departamento ofrece muchas asignaturas).",
    "exercises": [
      {
        "id": "sql-u02-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Relaciones uno a uno y uno a muchos\"?",
        "code": "SELECT COUNT(*) FROM asignaturas WHERE departamento = 'Matemáticas';",
        "options": [
          "1",
          "3",
          "0",
          "5"
        ],
        "correctOptionIndex": 0,
        "explanation": "1:1 (Uno a Uno): cada registro de A se asocia con máximo un registro de B.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l05-e02",
        "type": "code_cloze",
        "prompt": "En una relación de uno a muchos (1:N), la llave foránea debe situarse en la tabla del lado ___:",
        "codeWithBlank": "En una relación de uno a muchos (1:N), la llave foránea debe situarse en la tabla del lado ___:",
        "options": [
          "muchos (N)",
          "uno (1)",
          "intermedia",
          "indiferente"
        ],
        "correctOption": "muchos (N)",
        "explanation": "1:N (Uno a Muchos): un registro de A se relaciona con múltiples registros de B.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Relaciones uno a uno y uno a muchos\":",
        "tokens": [
          "val",
          "relacion",
          "=",
          "\"1:N\""
        ],
        "solution": [
          "val",
          "relacion",
          "=",
          "\"1:N\""
        ],
        "explanation": "En una relación 1:N, la llave foránea SIEMPRE se coloca en la tabla del lado \"Muchos\" (N).",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Relaciones uno a uno y uno a muchos\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Poner la llave foránea en la tabla del lado 1 limitaría a ese departamento a tener una sola asignatura.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Relaciones uno a uno y uno a muchos\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "1",
            "right": "1 (Uno a Uno): cada registro de A se asocia con máximo un registro de B."
          },
          {
            "left": "1",
            "right": "N (Uno a Muchos): un registro de A se relaciona con múltiples registros de B."
          },
          {
            "left": "Principio 3",
            "right": "La FK viaja a la tabla que representa la parte múltiple de la relación."
          },
          {
            "left": "Buena práctica",
            "right": "En una relación 1:N, la llave foránea SIEMPRE se col..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Relaciones uno a uno y uno a muchos\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Relaciones uno a uno y uno a muchos\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "En una relación 1:N, la llave foránea SIEMPRE se coloca en la tabla del lado \"Muchos\" (N).",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Relaciones uno a uno y uno a muchos\"?",
        "code": "SELECT id, nombre, creditos \nFROM asignaturas \nWHERE departamento = 'Informática';",
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
        "id": "sql-u02-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Relaciones uno a uno y uno a muchos\":",
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
        "id": "sql-u02-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Relaciones uno a uno y uno a muchos\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Poner la llave foránea en la tabla del lado 1 limitaría a ese departamento a tener una sola asignatura.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Relaciones uno a uno y uno a muchos\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende las cardinalidades 1:1 (un estudiante tien..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Poner la llave foránea en la tabla del lado 1 limita..."
          },
          {
            "left": "Recomendación",
            "right": "En una relación 1:N, la llave foránea SIEMPRE se col..."
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
    "id": "sql-u02-l06",
    "path": "sql",
    "unit": 2,
    "level": 6,
    "title": "6. Relaciones muchos a muchos y tablas intermedias",
    "description": "Modela la relación N:M entre Estudiante y Asignatura descomponiéndola en dos relaciones 1:N mediante la tabla intermedia Matrícula.",
    "exercises": [
      {
        "id": "sql-u02-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Relaciones muchos a muchos y tablas intermedias\"?",
        "code": "SELECT COUNT(*) FROM matriculas WHERE asignatura_id = 101;",
        "options": [
          "3",
          "1",
          "7",
          "2"
        ],
        "correctOptionIndex": 0,
        "explanation": "Una relación Muchos a Muchos (N:M) se descompone en dos relaciones 1:N.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l06-e02",
        "type": "code_cloze",
        "prompt": "Para resolver una relación Muchos a Muchos (N:M) se requiere crear una tabla ___:",
        "codeWithBlank": "Para resolver una relación Muchos a Muchos (N:M) se requiere crear una tabla ___:",
        "options": [
          "intermedia (pivote)",
          "temporal",
          "virtual",
          "foránea"
        ],
        "correctOption": "intermedia (pivote)",
        "explanation": "La tabla intermedia posee al menos dos llaves foráneas (hacia cada tabla padre).",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Relaciones muchos a muchos y tablas intermedias\":",
        "tokens": [
          "CREATE",
          "TABLE",
          "matriculas",
          "(",
          "estudiante_id",
          "INTEGER",
          ",",
          "asignatura_id",
          "INTEGER",
          ")"
        ],
        "solution": [
          "CREATE",
          "TABLE",
          "matriculas",
          "(",
          "estudiante_id",
          "INTEGER",
          ",",
          "asignatura_id",
          "INTEGER",
          ")"
        ],
        "explanation": "Las bases de datos relacionales no pueden conectar N:M directamente; SIEMPRE requieren una tabla intermedia (tabla pivote).",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Relaciones muchos a muchos y tablas intermedias\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "// Intentar vincular directamente Estudiante <-> Asignatura sin tabla intermedia", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Intentar guardar múltiples IDs en una sola columna: \"asignaturas: 101,102,103\". Esto imposibilita hacer búsquedas y sumas.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Relaciones muchos a muchos y tablas intermedias\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Una relación Muchos a Muchos (N",
            "right": "M) se descompone en dos relaciones 1:N."
          },
          {
            "left": "Principio 2",
            "right": "La tabla intermedia posee al menos dos llaves foráneas (hacia cada tabla padre)."
          },
          {
            "left": "Principio 3",
            "right": "La tabla intermedia puede contener atributos propios de la relación (como fecha y nota_final)."
          },
          {
            "left": "Buena práctica",
            "right": "Las bases de datos relacionales no pueden conectar N..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Relaciones muchos a muchos y tablas intermedias\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Relaciones muchos a muchos y tablas intermedias\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Las bases de datos relacionales no pueden conectar N:M directamente; SIEMPRE requieren una tabla intermedia (tabla pivote).",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Relaciones muchos a muchos y tablas intermedias\"?",
        "code": "SELECT matriculas.id, matriculas.estudiante_id, matriculas.asignatura_id, matriculas.nota_final \nFROM matriculas;",
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
        "id": "sql-u02-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Relaciones muchos a muchos y tablas intermedias\":",
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
        "id": "sql-u02-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Relaciones muchos a muchos y tablas intermedias\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Intentar guardar múltiples IDs en una sola columna: \"asignaturas: 101,102,103\". Esto imposibilita hacer búsquedas y sumas.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Relaciones muchos a muchos y tablas intermedias\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Modela la relación N:M entre Estudiante y Asignatura..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar guardar múltiples IDs en una sola columna: ..."
          },
          {
            "left": "Recomendación",
            "right": "Las bases de datos relacionales no pueden conectar N..."
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
    "id": "sql-u02-l07",
    "path": "sql",
    "unit": 2,
    "level": 7,
    "title": "7. Lectura de diagramas sencillos",
    "description": "Interpreta diagramas Entidad-Relación (DER) visualizando las conexiones entre Estudiante, Matrícula y Asignatura.",
    "exercises": [
      {
        "id": "sql-u02-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Lectura de diagramas sencillos\"?",
        "code": "SELECT COUNT(DISTINCT estudiante_id) FROM matriculas;",
        "options": [
          "5",
          "7",
          "3",
          "1"
        ],
        "correctOptionIndex": 0,
        "explanation": "Los diagramas ER documentan visualmente las entidades y sus relaciones.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l07-e02",
        "type": "code_cloze",
        "prompt": "En la simbología clásica de diagramas relacionales, las entidades se representan con figuras de ___:",
        "codeWithBlank": "En la simbología clásica de diagramas relacionales, las entidades se representan con figuras de ___:",
        "options": [
          "rectángulo",
          "círculo",
          "rombo",
          "triángulo"
        ],
        "correctOption": "rectángulo",
        "explanation": "Los rectángulos representan entidades (tablas) y las líneas las relaciones.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Lectura de diagramas sencillos\":",
        "tokens": [
          "SELECT",
          "estudiantes.nombre",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "estudiantes.nombre",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Las patas de gallo (crow's foot) en un diagrama DER representan el lado \"Muchos\" de la relación.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Lectura de diagramas sencillos\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT * FROM estudiantes, // Coma huérfana en la cláusula FROM", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Interpretar al revés el sentido de una flecha o relación confundiendo quién es el padre y quién el hijo.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Lectura de diagramas sencillos\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Lectura de diagramas sencillos",
            "right": "Los diagramas ER documentan visualmente las entidades y sus relaciones."
          },
          {
            "left": "Principio 2",
            "right": "Los rectángulos representan entidades (tablas) y las líneas las relaciones."
          },
          {
            "left": "La notación indica la cardinalidad",
            "right": "1 a 1, 1 a Muchos, Muchos a Muchos."
          },
          {
            "left": "Buena práctica",
            "right": "Las patas de gallo (crow's foot) en un diagrama DER ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l07-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Lectura de diagramas sencillos\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Lectura de diagramas sencillos\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Las patas de gallo (crow's foot) en un diagrama DER representan el lado \"Muchos\" de la relación.",
        "xpReward": 10
      },
      {
        "id": "sql-u02-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Lectura de diagramas sencillos\"?",
        "code": "SELECT \n    estudiantes.nombre AS estudiante,\n    matriculas.nota_final AS nota\nFROM estudiantes, matriculas \nWHERE estudiantes.id = matriculas.estudiante_id AND matriculas.asignatura_id = 101;",
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
        "id": "sql-u02-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Lectura de diagramas sencillos\":",
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
        "id": "sql-u02-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Lectura de diagramas sencillos\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Interpretar al revés el sentido de una flecha o relación confundiendo quién es el padre y quién el hijo.",
        "xpReward": 15
      },
      {
        "id": "sql-u02-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Lectura de diagramas sencillos\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Interpreta diagramas Entidad-Relación (DER) visualiz..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Interpretar al revés el sentido de una flecha o rela..."
          },
          {
            "left": "Recomendación",
            "right": "Las patas de gallo (crow's foot) en un diagrama DER ..."
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
