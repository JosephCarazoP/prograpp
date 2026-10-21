import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_06_LESSONS: Lesson[] = [
  {
    "id": "sql-u06-l01",
    "path": "sql",
    "unit": 6,
    "level": 1,
    "title": "1. SELECT ... FROM",
    "description": "Domina la instrucción más utilizada de SQL: proyectar y consultar datos almacenados en una tabla relacional.",
    "exercises": [
      {
        "id": "sql-u06-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"SELECT ... FROM\"?",
        "code": "SELECT COUNT(*) FROM estudiantes;",
        "options": [
          "5",
          "0",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "SELECT especifica las columnas deseadas en el reporte de salida.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l01-e02",
        "type": "code_cloze",
        "prompt": "La cláusula que indica de qué tabla se extraerán los datos en una consulta es ___:",
        "codeWithBlank": "La cláusula que indica de qué tabla se extraerán los datos en una consulta es ___:",
        "options": [
          "FROM",
          "INTO",
          "TABLE",
          "SOURCE"
        ],
        "correctOption": "FROM",
        "explanation": "FROM indica la tabla de donde se extraerán los datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"SELECT ... FROM\":",
        "tokens": [
          "SELECT",
          "nombre",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "nombre",
          "FROM",
          "estudiantes"
        ],
        "explanation": "SELECT es declarativo: le dices al motor \"qué datos quieres\", no \"cómo iterar en memoria para buscarlos\".",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"SELECT ... FROM\":",
        "codeSnippet": [
          "SELECT FROM estudiantes // Falta indicar las columnas a proyectar"
        ],
        "bugLineIndex": 0,
        "explanation": "Escribir la cláusula FROM antes de SELECT o inventar nombres de columnas inexistentes.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"SELECT ... FROM\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "SELECT ... FROM",
            "right": "SELECT especifica las columnas deseadas en el reporte de salida."
          },
          {
            "left": "Principio 2",
            "right": "FROM indica la tabla de donde se extraerán los datos."
          },
          {
            "left": "Principio 3",
            "right": "La consulta no modifica los datos almacenados; solo genera una vista temporal."
          },
          {
            "left": "Buena práctica",
            "right": "SELECT es declarativo: le dices al motor \"qué datos ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"SELECT ... FROM\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"SELECT ... FROM\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "SELECT es declarativo: le dices al motor \"qué datos quieres\", no \"cómo iterar en memoria para buscarlos\".",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"SELECT ... FROM\"?",
        "code": "SELECT nombre, promedio \nFROM estudiantes;",
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
        "id": "sql-u06-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"SELECT ... FROM\":",
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
        "id": "sql-u06-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"SELECT ... FROM\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Escribir la cláusula FROM antes de SELECT o inventar nombres de columnas inexistentes.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"SELECT ... FROM\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Domina la instrucción más utilizada de SQL: proyecta..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Escribir la cláusula FROM antes de SELECT o inventar..."
          },
          {
            "left": "Recomendación",
            "right": "SELECT es declarativo: le dices al motor \"qué datos ..."
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
    "id": "sql-u06-l02",
    "path": "sql",
    "unit": 6,
    "level": 2,
    "title": "2. Seleccionar todas las columnas con *",
    "description": "Utiliza el asterisco comodín (*) para inspeccionar la totalidad de columnas y registros de una tabla en una sola consulta.",
    "exercises": [
      {
        "id": "sql-u06-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Seleccionar todas las columnas con *\"?",
        "code": "SELECT * FROM asignaturas WHERE id = 101;",
        "options": [
          "1 row with 4 columns",
          "4 rows",
          "0 rows",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "* es el comodín universal que representa \"todas las columnas de la tabla\".",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l02-e02",
        "type": "code_cloze",
        "prompt": "El símbolo comodín que selecciona todas las columnas de una tabla en SQL es el ___:",
        "codeWithBlank": "El símbolo comodín que selecciona todas las columnas de una tabla en SQL es el ___:",
        "options": [
          "asterisco (*)",
          "signo de porcentaje (%)",
          "signo de interrogación (?)",
          "punto (.)"
        ],
        "correctOption": "asterisco (*)",
        "explanation": "Las columnas se devuelven en el mismo orden en que fueron declaradas en el CREATE TABLE.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Seleccionar todas las columnas con *\":",
        "tokens": [
          "SELECT",
          "*",
          "FROM",
          "matriculas"
        ],
        "solution": [
          "SELECT",
          "*",
          "FROM",
          "matriculas"
        ],
        "explanation": "SELECT * es ideal para explorar tablas nuevas en la terminal durante el desarrollo inicial.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Seleccionar todas las columnas con *\":",
        "codeSnippet": [
          "SELECT ALL FROM estudiantes // En SQL el comodín universal es *"
        ],
        "bugLineIndex": 0,
        "explanation": "Evita SELECT * en aplicaciones de producción con millones de filas: transferir columnas que no necesitas satura la red.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Seleccionar todas las columnas con *\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Seleccionar todas las columnas con *",
            "right": "* es el comodín universal que representa \"todas las columnas de la tabla\"."
          },
          {
            "left": "Principio 2",
            "right": "Las columnas se devuelven en el mismo orden en que fueron declaradas en el CREATE TABLE."
          },
          {
            "left": "Principio 3",
            "right": "En entornos de producción es mejor práctica nombrar las columnas explícitamente."
          },
          {
            "left": "Buena práctica",
            "right": "SELECT * es ideal para explorar tablas nuevas en la ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Seleccionar todas las columnas con *\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Seleccionar todas las columnas con *\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "SELECT * es ideal para explorar tablas nuevas en la terminal durante el desarrollo inicial.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Seleccionar todas las columnas con *\"?",
        "code": "SELECT * \nFROM asignaturas;",
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
        "id": "sql-u06-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Seleccionar todas las columnas con *\":",
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
        "id": "sql-u06-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Seleccionar todas las columnas con *\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Evita SELECT * en aplicaciones de producción con millones de filas: transferir columnas que no necesitas satura la red.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Seleccionar todas las columnas con *\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Utiliza el asterisco comodín (*) para inspeccionar l..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Evita SELECT * en aplicaciones de producción con mil..."
          },
          {
            "left": "Recomendación",
            "right": "SELECT * es ideal para explorar tablas nuevas en la ..."
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
    "id": "sql-u06-l03",
    "path": "sql",
    "unit": 6,
    "level": 3,
    "title": "3. Seleccionar columnas específicas",
    "description": "Proyecta exclusivamente los atributos necesarios separándolos por comas para optimizar memoria y legibilidad.",
    "exercises": [
      {
        "id": "sql-u06-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Seleccionar columnas específicas\"?",
        "code": "SELECT carrera FROM estudiantes WHERE id = 1;",
        "options": [
          "Ingeniería de Software",
          "Valeria",
          "1",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "Proyección: operación relacional que filtra columnas verticalmente.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l03-e02",
        "type": "code_cloze",
        "prompt": "En la cláusula SELECT, los nombres de múltiples columnas se separan mediante una ___:",
        "codeWithBlank": "En la cláusula SELECT, los nombres de múltiples columnas se separan mediante una ___:",
        "options": [
          "coma (,)",
          "barra (/ )",
          "palabra AND",
          "punto y coma (;)"
        ],
        "correctOption": "coma (,)",
        "explanation": "Reduce el consumo de memoria y ancho de banda en la aplicación cliente.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Seleccionar columnas específicas\":",
        "tokens": [
          "SELECT",
          "id, nombre",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "id, nombre",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Separar columnas con comas permite alterar el orden de presentación sin afectar la base de datos.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Seleccionar columnas específicas\":",
        "codeSnippet": [
          "SELECT nombre, carrera, FROM estudiantes // Coma huérfana antes de FROM"
        ],
        "bugLineIndex": 0,
        "explanation": "Poner una coma después de la última columna antes de la cláusula FROM (ej. `SELECT a, b, FROM t`).",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Seleccionar columnas específicas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Proyección",
            "right": "operación relacional que filtra columnas verticalmente."
          },
          {
            "left": "Principio 2",
            "right": "Reduce el consumo de memoria y ancho de banda en la aplicación cliente."
          },
          {
            "left": "Principio 3",
            "right": "Puedes solicitar columnas en cualquier orden deseado."
          },
          {
            "left": "Buena práctica",
            "right": "Separar columnas con comas permite alterar el orden ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Seleccionar columnas específicas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Seleccionar columnas específicas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Separar columnas con comas permite alterar el orden de presentación sin afectar la base de datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Seleccionar columnas específicas\"?",
        "code": "SELECT nombre, carrera \nFROM estudiantes;",
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
        "id": "sql-u06-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Seleccionar columnas específicas\":",
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
        "id": "sql-u06-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Seleccionar columnas específicas\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Poner una coma después de la última columna antes de la cláusula FROM (ej. `SELECT a, b, FROM t`).",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Seleccionar columnas específicas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Proyecta exclusivamente los atributos necesarios sep..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Poner una coma después de la última columna antes de..."
          },
          {
            "left": "Recomendación",
            "right": "Separar columnas con comas permite alterar el orden ..."
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
    "id": "sql-u06-l04",
    "path": "sql",
    "unit": 6,
    "level": 4,
    "title": "4. Alias con AS",
    "description": "Renombra columnas y expresiones en el resultado final mediante la palabra clave AS para generar encabezados legibles y profesionales.",
    "exercises": [
      {
        "id": "sql-u06-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Alias con AS\"?",
        "code": "SELECT nombre AS alumno FROM estudiantes WHERE id = 1;",
        "options": [
          "Valeria Morales (columna alumno)",
          "Valeria Morales (columna nombre)",
          "alumno",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "AS define un nombre alternativo temporal para la columna en el result set.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l04-e02",
        "type": "code_cloze",
        "prompt": "La palabra clave para asignar un nombre alternativo a una columna proyectada es ___:",
        "codeWithBlank": "La palabra clave para asignar un nombre alternativo a una columna proyectada es ___:",
        "options": [
          "AS",
          "LIKE",
          "NAME",
          "ALIAS"
        ],
        "correctOption": "AS",
        "explanation": "No altera ni renombra la columna en la tabla física de la base de datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Alias con AS\":",
        "tokens": [
          "SELECT",
          "nombre",
          "AS",
          "estudiante",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "nombre",
          "AS",
          "estudiante",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Los alias son especialmente útiles cuando calculas promedios o sumas para que no salga \"AVG(promedio)\" como título.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Alias con AS\":",
        "codeSnippet": [
          "SELECT nombre TO estudiante FROM estudiantes // La palabra clave correcta es AS"
        ],
        "bugLineIndex": 0,
        "explanation": "El alias solo existe en el reporte final: en la cláusula WHERE no puedes filtrar usando el alias recién creado.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Alias con AS\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Alias con AS",
            "right": "AS define un nombre alternativo temporal para la columna en el result set."
          },
          {
            "left": "Principio 2",
            "right": "No altera ni renombra la columna en la tabla física de la base de datos."
          },
          {
            "left": "Principio 3",
            "right": "Permite dar nombres claros y en español a cálculos matemáticos."
          },
          {
            "left": "Buena práctica",
            "right": "Los alias son especialmente útiles cuando calculas p..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Alias con AS\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Alias con AS\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Los alias son especialmente útiles cuando calculas promedios o sumas para que no salga \"AVG(promedio)\" como título.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Alias con AS\"?",
        "code": "SELECT \n    nombre AS estudiante,\n    carrera AS facultad,\n    promedio AS calificacion_general\nFROM estudiantes;",
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
        "id": "sql-u06-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Alias con AS\":",
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
        "id": "sql-u06-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Alias con AS\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "El alias solo existe en el reporte final: en la cláusula WHERE no puedes filtrar usando el alias recién creado.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Alias con AS\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Renombra columnas y expresiones en el resultado fina..."
          },
          {
            "left": "Riesgo crítico",
            "right": "El alias solo existe en el reporte final: en la cláu..."
          },
          {
            "left": "Recomendación",
            "right": "Los alias son especialmente útiles cuando calculas p..."
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
    "id": "sql-u06-l05",
    "path": "sql",
    "unit": 6,
    "level": 5,
    "title": "5. Columnas calculadas",
    "description": "Calcula nuevas métricas al vuelo en tu consulta aplicando operadores matemáticos directamente en la lista de proyección.",
    "exercises": [
      {
        "id": "sql-u06-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Columnas calculadas\"?",
        "code": "SELECT 10 * 5 AS resultado;",
        "options": [
          "50",
          "10 * 5",
          "resultado",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Puedes usar +, -, *, / y paréntesis en la cláusula SELECT.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l05-e02",
        "type": "code_cloze",
        "prompt": "Una columna generada al vuelo mediante una operación matemática en el SELECT es una columna ___:",
        "codeWithBlank": "Una columna generada al vuelo mediante una operación matemática en el SELECT es una columna ___:",
        "options": [
          "calculada / derivada",
          "primaria",
          "foránea",
          "persistente"
        ],
        "correctOption": "calculada / derivada",
        "explanation": "Permite calcular subtotales, impuestos, diferencias o porcentajes al vuelo.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Columnas calculadas\":",
        "tokens": [
          "SELECT",
          "precio * 1.13",
          "AS",
          "precio_con_iva"
        ],
        "solution": [
          "SELECT",
          "precio * 1.13",
          "AS",
          "precio_con_iva"
        ],
        "explanation": "Las columnas calculadas no consumen espacio en disco: el motor de base de datos las procesa en memoria al instante.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Columnas calculadas\":",
        "codeSnippet": [
          "SELECT nombre, creditos * FROM asignaturas // Falta el segundo operando"
        ],
        "bugLineIndex": 0,
        "explanation": "Olvidar ponerle un alias con AS: si no pones alias, el encabezado de la columna será la fórmula cruda `creditos * 16`.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Columnas calculadas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Columnas calculadas",
            "right": "Puedes usar +, -, *, / y paréntesis en la cláusula SELECT."
          },
          {
            "left": "Principio 2",
            "right": "Permite calcular subtotales, impuestos, diferencias o porcentajes al vuelo."
          },
          {
            "left": "Principio 3",
            "right": "Aplica el principio de diseño de evitar almacenar datos derivados en las tablas."
          },
          {
            "left": "Buena práctica",
            "right": "Las columnas calculadas no consumen espacio en disco..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Columnas calculadas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Columnas calculadas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Las columnas calculadas no consumen espacio en disco: el motor de base de datos las procesa en memoria al instante.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Columnas calculadas\"?",
        "code": "SELECT \n    nombre,\n    creditos,\n    creditos * 16 AS horas_semestrales\nFROM asignaturas;",
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
        "id": "sql-u06-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Columnas calculadas\":",
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
        "id": "sql-u06-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Columnas calculadas\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Olvidar ponerle un alias con AS: si no pones alias, el encabezado de la columna será la fórmula cruda `creditos * 16`.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Columnas calculadas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Calcula nuevas métricas al vuelo en tu consulta apli..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Olvidar ponerle un alias con AS: si no pones alias, ..."
          },
          {
            "left": "Recomendación",
            "right": "Las columnas calculadas no consumen espacio en disco..."
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
    "id": "sql-u06-l06",
    "path": "sql",
    "unit": 6,
    "level": 6,
    "title": "6. DISTINCT",
    "description": "Elimina filas duplicadas del resultado final asegurando que cada valor o combinación se muestre una sola vez.",
    "exercises": [
      {
        "id": "sql-u06-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"DISTINCT\"?",
        "code": "SELECT COUNT(DISTINCT carrera) FROM estudiantes;",
        "options": [
          "4",
          "5",
          "1",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "DISTINCT filtra y descarta filas duplicadas en el conjunto de resultados.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l06-e02",
        "type": "code_cloze",
        "prompt": "La palabra clave para descartar registros repetidos en la salida de una consulta es ___:",
        "codeWithBlank": "La palabra clave para descartar registros repetidos en la salida de una consulta es ___:",
        "options": [
          "DISTINCT",
          "UNIQUE",
          "DIFFERENT",
          "SINGLE"
        ],
        "correctOption": "DISTINCT",
        "explanation": "Se coloca inmediatamente después de la palabra clave SELECT.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"DISTINCT\":",
        "tokens": [
          "SELECT",
          "DISTINCT",
          "departamento",
          "FROM",
          "asignaturas"
        ],
        "solution": [
          "SELECT",
          "DISTINCT",
          "departamento",
          "FROM",
          "asignaturas"
        ],
        "explanation": "DISTINCT se aplica a TODA la fila resultante: si pones `SELECT DISTINCT carrera, semestre`, filtrará combinaciones únicas de ambas.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"DISTINCT\":",
        "codeSnippet": [
          "SELECT departamento DISTINCT FROM asignaturas // DISTINCT va justo después de SELECT"
        ],
        "bugLineIndex": 0,
        "explanation": "Usar DISTINCT por pereza para tapar consultas con JOINs mal diseñados que generan duplicados indeseados.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"DISTINCT\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "DISTINCT",
            "right": "DISTINCT filtra y descarta filas duplicadas en el conjunto de resultados."
          },
          {
            "left": "Principio 2",
            "right": "Se coloca inmediatamente después de la palabra clave SELECT."
          },
          {
            "left": "Principio 3",
            "right": "Es ideal para listar categorías, departamentos o estados únicos."
          },
          {
            "left": "Buena práctica",
            "right": "DISTINCT se aplica a TODA la fila resultante: si pon..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"DISTINCT\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"DISTINCT\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "DISTINCT se aplica a TODA la fila resultante: si pones `SELECT DISTINCT carrera, semestre`, filtrará combinaciones únicas de ambas.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"DISTINCT\"?",
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
        "id": "sql-u06-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"DISTINCT\":",
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
        "id": "sql-u06-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"DISTINCT\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Usar DISTINCT por pereza para tapar consultas con JOINs mal diseñados que generan duplicados indeseados.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"DISTINCT\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Elimina filas duplicadas del resultado final asegura..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar DISTINCT por pereza para tapar consultas con JO..."
          },
          {
            "left": "Recomendación",
            "right": "DISTINCT se aplica a TODA la fila resultante: si pon..."
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
    "id": "sql-u06-l07",
    "path": "sql",
    "unit": 6,
    "level": 7,
    "title": "7. Interpretar el resultado de una consulta",
    "description": "Aprende a leer el conjunto de resultados (Result Set): encabezados de columnas, tipos, conteo de filas y conjuntos vacíos.",
    "exercises": [
      {
        "id": "sql-u06-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Interpretar el resultado de una consulta\"?",
        "code": "SELECT nombre FROM estudiantes WHERE promedio > 10.0;",
        "options": [
          "0 rows in set (vacío)",
          "Error de consulta",
          "Valeria",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "El Result Set es una tabla virtual bidimensional generada en memoria.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l07-e02",
        "type": "code_cloze",
        "prompt": "La tabla virtual generada en memoria como respuesta a una consulta SELECT se denomina Result ___:",
        "codeWithBlank": "La tabla virtual generada en memoria como respuesta a una consulta SELECT se denomina Result ___:",
        "options": [
          "Set",
          "Table",
          "View",
          "Matrix"
        ],
        "correctOption": "Set",
        "explanation": "Consiste en metadatos (nombres y tipos de columnas) y datos (filas recuperadas).",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Interpretar el resultado de una consulta\":",
        "tokens": [
          "SELECT",
          "nombre",
          "FROM",
          "estudiantes",
          "WHERE",
          "id",
          "=",
          "1"
        ],
        "solution": [
          "SELECT",
          "nombre",
          "FROM",
          "estudiantes",
          "WHERE",
          "id",
          "=",
          "1"
        ],
        "explanation": "Un resultado de 0 filas (Empty set) NO es un error: significa simplemente que ningún registro cumplió con la condición.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Interpretar el resultado de una consulta\":",
        "codeSnippet": [
          "SELECT * FROM estudiantes WHERE id = 999 // Devuelve 0 rows (no es error de sintaxis)"
        ],
        "bugLineIndex": 0,
        "explanation": "Confundir un conjunto vacío (0 filas) con un valor NULL dentro de una fila.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Interpretar el resultado de una consulta\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Interpretar el resultado de una consulta",
            "right": "El Result Set es una tabla virtual bidimensional generada en memoria."
          },
          {
            "left": "Principio 2",
            "right": "Consiste en metadatos (nombres y tipos de columnas) y datos (filas recuperadas)."
          },
          {
            "left": "Principio 3",
            "right": "Si la condición no encuentra coincidencias, el motor devuelve 0 filas sin lanzar error."
          },
          {
            "left": "Buena práctica",
            "right": "Un resultado de 0 filas (Empty set) NO es un error: ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l07-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Interpretar el resultado de una consulta\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Interpretar el resultado de una consulta\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Un resultado de 0 filas (Empty set) NO es un error: significa simplemente que ningún registro cumplió con la condición.",
        "xpReward": 10
      },
      {
        "id": "sql-u06-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Interpretar el resultado de una consulta\"?",
        "code": "SELECT nombre, promedio \nFROM estudiantes \nWHERE promedio > 9.5;",
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
        "id": "sql-u06-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Interpretar el resultado de una consulta\":",
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
        "id": "sql-u06-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Interpretar el resultado de una consulta\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Confundir un conjunto vacío (0 filas) con un valor NULL dentro de una fila.",
        "xpReward": 15
      },
      {
        "id": "sql-u06-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Interpretar el resultado de una consulta\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a leer el conjunto de resultados (Result Set..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Confundir un conjunto vacío (0 filas) con un valor N..."
          },
          {
            "left": "Recomendación",
            "right": "Un resultado de 0 filas (Empty set) NO es un error: ..."
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
