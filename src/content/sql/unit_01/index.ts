import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_01_LESSONS: Lesson[] = [
  {
    "id": "sql-u01-l01",
    "path": "sql",
    "unit": 1,
    "level": 1,
    "title": "1. Datos e información",
    "description": "Comprende la diferencia fundamental entre datos brutos sin procesar e información estructurada con significado para la toma de decisiones.",
    "exercises": [
      {
        "id": "sql-u01-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Datos e información\"?",
        "code": "SELECT COUNT(*) FROM estudiantes;",
        "options": [
          "5",
          "0",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Dato: elemento primario y descontextualizado (un número, una fecha).",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l01-e02",
        "type": "code_cloze",
        "prompt": "Un conjunto de datos procesados y con significado útil para el usuario se denomina ___:",
        "codeWithBlank": "Un conjunto de datos procesados y con significado útil para el usuario se denomina ___:",
        "options": [
          "información",
          "hardware",
          "transistor",
          "variable"
        ],
        "correctOption": "información",
        "explanation": "Información: conjunto de datos organizados que reducen la incertidumbre.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Datos e información\":",
        "tokens": [
          "SELECT",
          "nombre, promedio",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "nombre, promedio",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Un dato aislado como \"39\" no dice nada; saber que es \"temperatura corporal = 39°C\" lo convierte en información crítica.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Datos e información\":",
        "codeSnippet": [
          "SELECT nombre",
          "IN estudiantes // Error: en SQL la cláusula es FROM",
          "WHERE id = 1"
        ],
        "bugLineIndex": 1,
        "explanation": "Almacenar datos desordenados en hojas de cálculo sin validaciones provoca duplicados e inconsistencias.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Datos e información\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Dato",
            "right": "elemento primario y descontextualizado (un número, una fecha)."
          },
          {
            "left": "Información",
            "right": "conjunto de datos organizados que reducen la incertidumbre."
          },
          {
            "left": "Principio 3",
            "right": "Las bases de datos garantizan la persistencia y la integridad de los datos."
          },
          {
            "left": "Buena práctica",
            "right": "Un dato aislado como \"39\" no dice nada; saber que es..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Datos e información\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Datos e información\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Un dato aislado como \"39\" no dice nada; saber que es \"temperatura corporal = 39°C\" lo convierte en información crítica.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Datos e información\"?",
        "code": "SELECT nombre, carrera, promedio \nFROM estudiantes \nWHERE promedio >= 9.0;",
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
        "id": "sql-u01-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Datos e información\":",
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
        "id": "sql-u01-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Datos e información\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Almacenar datos desordenados en hojas de cálculo sin validaciones provoca duplicados e inconsistencias.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Datos e información\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende la diferencia fundamental entre datos brut..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Almacenar datos desordenados en hojas de cálculo sin..."
          },
          {
            "left": "Recomendación",
            "right": "Un dato aislado como \"39\" no dice nada; saber que es..."
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
    "id": "sql-u01-l02",
    "path": "sql",
    "unit": 1,
    "level": 2,
    "title": "2. Qué es una base de datos y para qué sirve",
    "description": "Conoce los Sistemas Gestores de Bases de Datos (SGBD/DBMS): plataformas dedicadas a almacenar, consultar y proteger grandes volúmenes de datos concurrentes.",
    "exercises": [
      {
        "id": "sql-u01-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Qué es una base de datos y para qué sirve\"?",
        "code": "SELECT creditos FROM asignaturas WHERE id = 101;",
        "options": [
          "4",
          "5",
          "Bases de Datos I",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "Un SGBD garantiza persistencia, velocidad, seguridad y concurrencia.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l02-e02",
        "type": "code_cloze",
        "prompt": "El software especializado encargado de gestionar, proteger y consultar bases de datos se abrevia ___:",
        "codeWithBlank": "El software especializado encargado de gestionar, proteger y consultar bases de datos se abrevia ___:",
        "options": [
          "SGBD / DBMS",
          "IDE",
          "SO",
          "CPU"
        ],
        "correctOption": "SGBD / DBMS",
        "explanation": "Separa el almacenamiento físico de la consulta lógica de datos.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Qué es una base de datos y para qué sirve\":",
        "tokens": [
          "SELECT",
          "*",
          "FROM",
          "asignaturas",
          ";"
        ],
        "solution": [
          "SELECT",
          "*",
          "FROM",
          "asignaturas",
          ";"
        ],
        "explanation": "Una base de datos permite que miles de usuarios lean y escriban datos al mismo tiempo sin corromper los archivos.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Qué es una base de datos y para qué sirve\":",
        "codeSnippet": [
          "GET * FROM asignaturas // Error: en SQL la instrucción de consulta es SELECT"
        ],
        "bugLineIndex": 0,
        "explanation": "Usar archivos de texto plano (.txt) para sistemas multiusuario: provocarán bloqueos y pérdida de datos ante caídas.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Qué es una base de datos y para qué sirve\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Qué es una base de datos y para qué sirve",
            "right": "Un SGBD garantiza persistencia, velocidad, seguridad y concurrencia."
          },
          {
            "left": "Principio 2",
            "right": "Separa el almacenamiento físico de la consulta lógica de datos."
          },
          {
            "left": "Principio 3",
            "right": "Soporta millones de transacciones con integridad garantizada."
          },
          {
            "left": "Buena práctica",
            "right": "Una base de datos permite que miles de usuarios lean..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Qué es una base de datos y para qué sirve\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Qué es una base de datos y para qué sirve\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Una base de datos permite que miles de usuarios lean y escriban datos al mismo tiempo sin corromper los archivos.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Qué es una base de datos y para qué sirve\"?",
        "code": "SELECT id, nombre, creditos, departamento \nFROM asignaturas;",
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
        "id": "sql-u01-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Qué es una base de datos y para qué sirve\":",
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
        "id": "sql-u01-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Qué es una base de datos y para qué sirve\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Usar archivos de texto plano (.txt) para sistemas multiusuario: provocarán bloqueos y pérdida de datos ante caídas.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Qué es una base de datos y para qué sirve\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Conoce los Sistemas Gestores de Bases de Datos (SGBD..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar archivos de texto plano (.txt) para sistemas mu..."
          },
          {
            "left": "Recomendación",
            "right": "Una base de datos permite que miles de usuarios lean..."
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
    "id": "sql-u01-l03",
    "path": "sql",
    "unit": 1,
    "level": 3,
    "title": "3. Bases de datos relacionales",
    "description": "Descubre el modelo relacional propuesto por E.F. Codd: organización de datos en tablas matemáticas vinculadas mediante relaciones lógicas.",
    "exercises": [
      {
        "id": "sql-u01-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Bases de datos relacionales\"?",
        "code": "SELECT nombre FROM estudiantes WHERE id = 2;",
        "options": [
          "Diego Fernández",
          "Valeria Morales",
          "Camila Gómez",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Propuesto por Edgar F. Codd en 1970 basado en la teoría de conjuntos.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l03-e02",
        "type": "code_cloze",
        "prompt": "El modelo de base de datos más utilizado del mundo fundamentado en tablas vinculadas se llama ___:",
        "codeWithBlank": "El modelo de base de datos más utilizado del mundo fundamentado en tablas vinculadas se llama ___:",
        "options": [
          "relacional",
          "jerárquico",
          "gráfico",
          "documental"
        ],
        "correctOption": "relacional",
        "explanation": "Los datos se modelan como relaciones (tablas compuestas de filas y columnas).",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Bases de datos relacionales\":",
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
        "explanation": "El modelo relacional evita la duplicación: el nombre del estudiante se escribe una sola vez en la tabla estudiantes.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Bases de datos relacionales\":",
        "codeSnippet": [
          "SELECT * TABLE estudiantes // Error: la cláusula FROM se omitió"
        ],
        "bugLineIndex": 0,
        "explanation": "Repetir la carrera o el email en todas las tablas: si cambia la carrera, tendrías que actualizar cientos de filas.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Bases de datos relacionales\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Bases de datos relacionales",
            "right": "Propuesto por Edgar F. Codd en 1970 basado en la teoría de conjuntos."
          },
          {
            "left": "Principio 2",
            "right": "Los datos se modelan como relaciones (tablas compuestas de filas y columnas)."
          },
          {
            "left": "Principio 3",
            "right": "Las relaciones entre entidades se establecen mediante claves primarias y foráneas."
          },
          {
            "left": "Buena práctica",
            "right": "El modelo relacional evita la duplicación: el nombre..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Bases de datos relacionales\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Bases de datos relacionales\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "El modelo relacional evita la duplicación: el nombre del estudiante se escribe una sola vez en la tabla estudiantes.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Bases de datos relacionales\"?",
        "code": "SELECT estudiantes.nombre, matriculas.nota_final \nFROM estudiantes \nWHERE estudiantes.id = 1;",
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
        "id": "sql-u01-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Bases de datos relacionales\":",
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
        "id": "sql-u01-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Bases de datos relacionales\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Repetir la carrera o el email en todas las tablas: si cambia la carrera, tendrías que actualizar cientos de filas.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Bases de datos relacionales\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Descubre el modelo relacional propuesto por E.F. Cod..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Repetir la carrera o el email en todas las tablas: s..."
          },
          {
            "left": "Recomendación",
            "right": "El modelo relacional evita la duplicación: el nombre..."
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
    "id": "sql-u01-l04",
    "path": "sql",
    "unit": 1,
    "level": 4,
    "title": "4. Tablas, columnas y filas",
    "description": "Conoce la anatomía de una tabla relacional: columnas (atributos tipificados) y filas o tuplas (cada registro individual).",
    "exercises": [
      {
        "id": "sql-u01-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Tablas, columnas y filas\"?",
        "code": "SELECT id FROM estudiantes WHERE nombre = 'Camila Gómez';",
        "options": [
          "3",
          "1",
          "2",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "Columna (Campo/Atributo): define el nombre y tipo de dato (ej. nombre: TEXT).",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l04-e02",
        "type": "code_cloze",
        "prompt": "En una tabla relacional, cada renglón horizontal que representa un registro individual es una ___:",
        "codeWithBlank": "En una tabla relacional, cada renglón horizontal que representa un registro individual es una ___:",
        "options": [
          "fila (tupla)",
          "columna",
          "clave",
          "vista"
        ],
        "correctOption": "fila (tupla)",
        "explanation": "Fila (Registro/Tupla): instancia concreta que contiene los valores de un elemento.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Tablas, columnas y filas\":",
        "tokens": [
          "SELECT",
          "id, carrera",
          "FROM",
          "estudiantes"
        ],
        "solution": [
          "SELECT",
          "id, carrera",
          "FROM",
          "estudiantes"
        ],
        "explanation": "Cada fila representa una entidad del mundo real; cada columna describe un atributo particular de esa entidad.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Tablas, columnas y filas\":",
        "codeSnippet": [
          "SELECT FROM estudiantes // Error: falta especificar columnas o *"
        ],
        "bugLineIndex": 0,
        "explanation": "Guardar múltiples valores dentro de una sola celda (ej. \"Juan, Pedro, Ana\") viola la primera forma normal.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Tablas, columnas y filas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Columna (Campo/Atributo)",
            "right": "define el nombre y tipo de dato (ej. nombre: TEXT)."
          },
          {
            "left": "Fila (Registro/Tupla)",
            "right": "instancia concreta que contiene los valores de un elemento."
          },
          {
            "left": "Tabla",
            "right": "conjunto bidimensional no ordenado de registros homogéneos."
          },
          {
            "left": "Buena práctica",
            "right": "Cada fila representa una entidad del mundo real; cad..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Tablas, columnas y filas\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Tablas, columnas y filas\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Cada fila representa una entidad del mundo real; cada columna describe un atributo particular de esa entidad.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Tablas, columnas y filas\"?",
        "code": "SELECT id, nombre, carrera \nFROM estudiantes;",
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
        "id": "sql-u01-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Tablas, columnas y filas\":",
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
        "id": "sql-u01-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Tablas, columnas y filas\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Guardar múltiples valores dentro de una sola celda (ej. \"Juan, Pedro, Ana\") viola la primera forma normal.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Tablas, columnas y filas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Conoce la anatomía de una tabla relacional: columnas..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Guardar múltiples valores dentro de una sola celda (..."
          },
          {
            "left": "Recomendación",
            "right": "Cada fila representa una entidad del mundo real; cad..."
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
    "id": "sql-u01-l05",
    "path": "sql",
    "unit": 1,
    "level": 5,
    "title": "5. Estructura de una tabla frente a sus registros",
    "description": "Distingue entre el esquema DDL (la estructura de columnas y tipos creada una vez) y los datos DML (las filas que entran y salen diariamente).",
    "exercises": [
      {
        "id": "sql-u01-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Estructura de una tabla frente a sus registros\"?",
        "code": "SELECT count(*) FROM asignaturas;",
        "options": [
          "5",
          "0",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Esquema (DDL): esqueleto lógico que define nombres, tipos y restricciones.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l05-e02",
        "type": "code_cloze",
        "prompt": "La definición formal de las columnas, tipos y restricciones de una tabla se denomina ___:",
        "codeWithBlank": "La definición formal de las columnas, tipos y restricciones de una tabla se denomina ___:",
        "options": [
          "esquema (estructura)",
          "registro",
          "transacción",
          "índice"
        ],
        "correctOption": "esquema (estructura)",
        "explanation": "Datos (DML): las instancias físicas almacenadas en cada fila.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Estructura de una tabla frente a sus registros\":",
        "tokens": [
          "CREATE",
          "TABLE",
          "cursos",
          "(",
          "id",
          "INTEGER",
          ")"
        ],
        "solution": [
          "CREATE",
          "TABLE",
          "cursos",
          "(",
          "id",
          "INTEGER",
          ")"
        ],
        "explanation": "El comando CREATE TABLE define la estructura; los comandos INSERT, UPDATE y DELETE gestionan los registros.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Estructura de una tabla frente a sus registros\":",
        "codeSnippet": [
          "CREATE RECORD estudiantes // Error: en SQL la sentencia DDL es CREATE TABLE"
        ],
        "bugLineIndex": 0,
        "explanation": "Confundir DROP TABLE (destruye la estructura completa) con DELETE FROM (borra los registros manteniendo la tabla).",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Estructura de una tabla frente a sus registros\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Esquema (DDL)",
            "right": "esqueleto lógico que define nombres, tipos y restricciones."
          },
          {
            "left": "Datos (DML)",
            "right": "las instancias físicas almacenadas en cada fila."
          },
          {
            "left": "Principio 3",
            "right": "Modificar la estructura requiere comandos ALTER TABLE."
          },
          {
            "left": "Buena práctica",
            "right": "El comando CREATE TABLE define la estructura; los co..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Estructura de una tabla frente a sus registros\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Estructura de una tabla frente a sus registros\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "El comando CREATE TABLE define la estructura; los comandos INSERT, UPDATE y DELETE gestionan los registros.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Estructura de una tabla frente a sus registros\"?",
        "code": "CREATE TABLE IF NOT EXISTS aulas (\n    id INTEGER PRIMARY KEY,\n    codigo TEXT NOT NULL,\n    capacidad INTEGER\n);",
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
        "id": "sql-u01-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Estructura de una tabla frente a sus registros\":",
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
        "id": "sql-u01-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Estructura de una tabla frente a sus registros\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Confundir DROP TABLE (destruye la estructura completa) con DELETE FROM (borra los registros manteniendo la tabla).",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Estructura de una tabla frente a sus registros\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Distingue entre el esquema DDL (la estructura de col..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Confundir DROP TABLE (destruye la estructura complet..."
          },
          {
            "left": "Recomendación",
            "right": "El comando CREATE TABLE define la estructura; los co..."
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
    "id": "sql-u01-l06",
    "path": "sql",
    "unit": 1,
    "level": 6,
    "title": "6. Diferencia entre SQL y SQLite",
    "description": "Distingue entre el lenguaje estándar SQL (lenguaje declarativo universal) y SQLite (motor embebido, ligero y sin servidor).",
    "exercises": [
      {
        "id": "sql-u01-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Diferencia entre SQL y SQLite\"?",
        "code": "SELECT departamento FROM asignaturas WHERE id = 104;",
        "options": [
          "Matemáticas",
          "Informática",
          "Telecomunicaciones",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "SQL (Structured Query Language): lenguaje declarativo estándar ISO/ANSI.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l06-e02",
        "type": "code_cloze",
        "prompt": "El motor de base de datos embebido en Android y navegadores que no requiere servidor es ___:",
        "codeWithBlank": "El motor de base de datos embebido en Android y navegadores que no requiere servidor es ___:",
        "options": [
          "SQLite",
          "Oracle",
          "PostgreSQL",
          "SQL Server"
        ],
        "correctOption": "SQLite",
        "explanation": "SQLite: biblioteca en lenguaje C que implementa un motor SQL embebido y autónomo.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Diferencia entre SQL y SQLite\":",
        "tokens": [
          "SELECT",
          "nombre",
          "FROM",
          "asignaturas"
        ],
        "solution": [
          "SELECT",
          "nombre",
          "FROM",
          "asignaturas"
        ],
        "explanation": "SQLite se utiliza en todos los teléfonos Android e iOS del mundo, en navegadores web y en aviones de combate.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Diferencia entre SQL y SQLite\":",
        "codeSnippet": [
          "CONNECT SERVER sqlite.server.net // SQLite es serverless, no usa servidores de red"
        ],
        "bugLineIndex": 0,
        "explanation": "Creer que necesitas instalar un servidor pesado como MySQL para aprender: SQLite corre directamente en memoria o en un archivo local.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Diferencia entre SQL y SQLite\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "SQL (Structured Query Language)",
            "right": "lenguaje declarativo estándar ISO/ANSI."
          },
          {
            "left": "SQLite",
            "right": "biblioteca en lenguaje C que implementa un motor SQL embebido y autónomo."
          },
          {
            "left": "Principio 3",
            "right": "SQLite almacena la base de datos completa en un único archivo de disco ordinario."
          },
          {
            "left": "Buena práctica",
            "right": "SQLite se utiliza en todos los teléfonos Android e i..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Diferencia entre SQL y SQLite\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Diferencia entre SQL y SQLite\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "SQLite se utiliza en todos los teléfonos Android e iOS del mundo, en navegadores web y en aviones de combate.",
        "xpReward": 10
      },
      {
        "id": "sql-u01-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Diferencia entre SQL y SQLite\"?",
        "code": "SELECT nombre, creditos \nFROM asignaturas \nWHERE departamento = 'Informática';",
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
        "id": "sql-u01-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Diferencia entre SQL y SQLite\":",
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
        "id": "sql-u01-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Diferencia entre SQL y SQLite\":",
        "codeSnippet": [
          "-- Consulta sobre el esquema educativo",
          "SELECT id, nombre FROM estudiantes",
          "WHERE id == 10; // Error: en SQL la igualdad se escribe con un solo = (WHERE id = 10)"
        ],
        "bugLineIndex": 2,
        "explanation": "Creer que necesitas instalar un servidor pesado como MySQL para aprender: SQLite corre directamente en memoria o en un archivo local.",
        "xpReward": 15
      },
      {
        "id": "sql-u01-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Diferencia entre SQL y SQLite\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Distingue entre el lenguaje estándar SQL (lenguaje d..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Creer que necesitas instalar un servidor pesado como..."
          },
          {
            "left": "Recomendación",
            "right": "SQLite se utiliza en todos los teléfonos Android e i..."
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
