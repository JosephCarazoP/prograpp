import { Lesson } from '../../../types/lesson';

export const SQL_UNIT_07_LESSONS: Lesson[] = [
  {
    "id": "sql-u07-l01",
    "path": "sql",
    "unit": 7,
    "level": 1,
    "title": "1. WHERE y comparaciones",
    "description": "Filtra filas horizontalmente con la cláusula WHERE usando operadores relacionales (=, !=, <, >, <=, >=).",
    "exercises": [
      {
        "id": "sql-u07-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"WHERE y comparaciones\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE promedio < 9.0;",
        "options": [
          "2",
          "3",
          "5",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "WHERE evalúa una condición booleana para cada fila de la tabla.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l01-e02",
        "type": "code_cloze",
        "prompt": "La cláusula fundamental de SQL para filtrar las filas que cumplen una condición es ___:",
        "codeWithBlank": "La cláusula fundamental de SQL para filtrar las filas que cumplen una condición es ___:",
        "options": [
          "WHERE",
          "FILTER",
          "HAVING",
          "WHEN"
        ],
        "correctOption": "WHERE",
        "explanation": "Solo las filas cuya condición resulte verdadera (true) se incluyen en la salida.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"WHERE y comparaciones\":",
        "tokens": [
          "SELECT",
          "*",
          "FROM",
          "estudiantes",
          "WHERE",
          "promedio",
          ">=",
          "9.0"
        ],
        "solution": [
          "SELECT",
          "*",
          "FROM",
          "estudiantes",
          "WHERE",
          "promedio",
          ">=",
          "9.0"
        ],
        "explanation": "En SQL estándar la igualdad es un solo signo = (a diferencia de lenguajes como Kotlin donde se usa ==).",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"WHERE y comparaciones\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT * FROM estudiantes WHERE promedio == 9.0", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Para desigualdad puedes usar != o <>, pero nunca uses !==.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"WHERE y comparaciones\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "WHERE y comparaciones",
            "right": "WHERE evalúa una condición booleana para cada fila de la tabla."
          },
          {
            "left": "Principio 2",
            "right": "Solo las filas cuya condición resulte verdadera (true) se incluyen en la salida."
          },
          {
            "left": "Operadores",
            "right": "= (igual), != o <> (distinto), <, <=, >, >=."
          },
          {
            "left": "Buena práctica",
            "right": "En SQL estándar la igualdad es un solo signo = (a di..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l01-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"WHERE y comparaciones\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"WHERE y comparaciones\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "En SQL estándar la igualdad es un solo signo = (a diferencia de lenguajes como Kotlin donde se usa ==).",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"WHERE y comparaciones\"?",
        "code": "SELECT nombre, promedio \nFROM estudiantes \nWHERE promedio >= 9.0;",
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
        "id": "sql-u07-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"WHERE y comparaciones\":",
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
        "id": "sql-u07-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"WHERE y comparaciones\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Para desigualdad puedes usar != o <>, pero nunca uses !==.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"WHERE y comparaciones\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Filtra filas horizontalmente con la cláusula WHERE u..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Para desigualdad puedes usar != o <>, pero nunca use..."
          },
          {
            "left": "Recomendación",
            "right": "En SQL estándar la igualdad es un solo signo = (a di..."
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
    "id": "sql-u07-l02",
    "path": "sql",
    "unit": 7,
    "level": 2,
    "title": "2. AND, OR y NOT",
    "description": "Construye filtros lógicos compuestos combinando predicados con el operador Y (AND), O (OR) y negación (NOT).",
    "exercises": [
      {
        "id": "sql-u07-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"AND, OR y NOT\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE carrera = 'Ingeniería de Software' OR carrera = 'Ciberseguridad';",
        "options": [
          "3",
          "2",
          "5",
          "1"
        ],
        "correctOptionIndex": 0,
        "explanation": "AND conecta condiciones que deben ser verdaderas simultáneamente.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l02-e02",
        "type": "code_cloze",
        "prompt": "Para exigir que dos condiciones se cumplan obligatoriamente al mismo tiempo usamos el operador ___:",
        "codeWithBlank": "Para exigir que dos condiciones se cumplan obligatoriamente al mismo tiempo usamos el operador ___:",
        "options": [
          "AND",
          "OR",
          "NOT",
          "BOTH"
        ],
        "correctOption": "AND",
        "explanation": "OR permite que califique cualquier fila que cumpla al menos una condición.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"AND, OR y NOT\":",
        "tokens": [
          "WHERE",
          "carrera",
          "=",
          "'Software'",
          "AND",
          "promedio",
          ">=",
          "9.0"
        ],
        "solution": [
          "WHERE",
          "carrera",
          "=",
          "'Software'",
          "AND",
          "promedio",
          ">=",
          "9.0"
        ],
        "explanation": "AND exige que todas las condiciones se cumplan; OR exige que al menos una sea verdadera.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"AND, OR y NOT\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT * FROM t WHERE col = 'A' && col = 'B'", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Escribir `carrera = \"A\" OR \"B\"` es incorrecto: debes repetir la columna `carrera = \"A\" OR carrera = \"B\"`.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"AND, OR y NOT\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "AND, OR y NOT",
            "right": "AND conecta condiciones que deben ser verdaderas simultáneamente."
          },
          {
            "left": "Principio 2",
            "right": "OR permite que califique cualquier fila que cumpla al menos una condición."
          },
          {
            "left": "Principio 3",
            "right": "NOT niega el valor de verdad del predicado subsiguiente."
          },
          {
            "left": "Buena práctica",
            "right": "AND exige que todas las condiciones se cumplan; OR e..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l02-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"AND, OR y NOT\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"AND, OR y NOT\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "AND exige que todas las condiciones se cumplan; OR exige que al menos una sea verdadera.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"AND, OR y NOT\"?",
        "code": "SELECT nombre, carrera, promedio \nFROM estudiantes \nWHERE carrera = 'Ingeniería de Software' AND promedio >= 9.2;",
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
        "id": "sql-u07-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"AND, OR y NOT\":",
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
        "id": "sql-u07-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"AND, OR y NOT\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Escribir `carrera = \"A\" OR \"B\"` es incorrecto: debes repetir la columna `carrera = \"A\" OR carrera = \"B\"`.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"AND, OR y NOT\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Construye filtros lógicos compuestos combinando pred..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Escribir `carrera = \"A\" OR \"B\"` es incorrecto: debes..."
          },
          {
            "left": "Recomendación",
            "right": "AND exige que todas las condiciones se cumplan; OR e..."
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
    "id": "sql-u07-l03",
    "path": "sql",
    "unit": 7,
    "level": 3,
    "title": "3. Paréntesis en condiciones",
    "description": "Evita ambigüedades lógicas agrupando condiciones con paréntesis para controlar la precedencia de AND sobre OR.",
    "exercises": [
      {
        "id": "sql-u07-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Paréntesis en condiciones\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE (carrera = 'Ciberseguridad') AND semestre = 5;",
        "options": [
          "1",
          "2",
          "0",
          "5"
        ],
        "correctOptionIndex": 0,
        "explanation": "AND tiene mayor prioridad de evaluación que OR en el estándar SQL.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l03-e02",
        "type": "code_cloze",
        "prompt": "Para alterar la prioridad de los operadores lógicos en el WHERE utilizamos ___:",
        "codeWithBlank": "Para alterar la prioridad de los operadores lógicos en el WHERE utilizamos ___:",
        "options": [
          "paréntesis ( )",
          "corchetes [ ]",
          "llaves { }",
          "comillas \" \""
        ],
        "correctOption": "paréntesis ( )",
        "explanation": "Los paréntesis fuerzan al motor a evaluar primero las condiciones internas agrupadas.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Paréntesis en condiciones\":",
        "tokens": [
          "WHERE",
          "(",
          "a",
          "OR",
          "b",
          ")",
          "AND",
          "c"
        ],
        "solution": [
          "WHERE",
          "(",
          "a",
          "OR",
          "b",
          ")",
          "AND",
          "c"
        ],
        "explanation": "Usa siempre paréntesis cuando mezcles AND con OR en una misma consulta para evitar sorpresas desagradables.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Paréntesis en condiciones\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "WHERE (a AND b", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Omitir los paréntesis cambiará el significado del filtro mostrando registros que no querías autorizar.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Paréntesis en condiciones\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Paréntesis en condiciones",
            "right": "AND tiene mayor prioridad de evaluación que OR en el estándar SQL."
          },
          {
            "left": "Principio 2",
            "right": "Los paréntesis fuerzan al motor a evaluar primero las condiciones internas agrupadas."
          },
          {
            "left": "Principio 3",
            "right": "Clarifican la intención del desarrollador para cualquier compañero de equipo."
          },
          {
            "left": "Buena práctica",
            "right": "Usa siempre paréntesis cuando mezcles AND con OR en ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l03-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"Paréntesis en condiciones\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"Paréntesis en condiciones\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Usa siempre paréntesis cuando mezcles AND con OR en una misma consulta para evitar sorpresas desagradables.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Paréntesis en condiciones\"?",
        "code": "SELECT nombre, carrera, semestre \nFROM estudiantes \nWHERE (carrera = 'Ingeniería de Software' OR carrera = 'Ciberseguridad') \n  AND semestre >= 4;",
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
        "id": "sql-u07-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Paréntesis en condiciones\":",
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
        "id": "sql-u07-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Paréntesis en condiciones\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Omitir los paréntesis cambiará el significado del filtro mostrando registros que no querías autorizar.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Paréntesis en condiciones\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Evita ambigüedades lógicas agrupando condiciones con..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Omitir los paréntesis cambiará el significado del fi..."
          },
          {
            "left": "Recomendación",
            "right": "Usa siempre paréntesis cuando mezcles AND con OR en ..."
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
    "id": "sql-u07-l04",
    "path": "sql",
    "unit": 7,
    "level": 4,
    "title": "4. BETWEEN",
    "description": "Filtra intervalos numéricos y de fechas inclusivos de forma compacta y elegante usando la cláusula BETWEEN.",
    "exercises": [
      {
        "id": "sql-u07-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"BETWEEN\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE semestre BETWEEN 3 AND 5;",
        "options": [
          "3",
          "5",
          "2",
          "1"
        ],
        "correctOptionIndex": 0,
        "explanation": "Sintaxis: columna BETWEEN valorMinimo AND valorMaximo.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l04-e02",
        "type": "code_cloze",
        "prompt": "La cláusula para filtrar un rango de valores inclusivo entre un mínimo y un máximo es ___:",
        "codeWithBlank": "La cláusula para filtrar un rango de valores inclusivo entre un mínimo y un máximo es ___:",
        "options": [
          "BETWEEN",
          "IN RANGE",
          "INSIDE",
          "WITHIN"
        ],
        "correctOption": "BETWEEN",
        "explanation": "Incluye ambos extremos del intervalo.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"BETWEEN\":",
        "tokens": [
          "WHERE",
          "nota",
          "BETWEEN",
          "7.0",
          "AND",
          "10.0"
        ],
        "solution": [
          "WHERE",
          "nota",
          "BETWEEN",
          "7.0",
          "AND",
          "10.0"
        ],
        "explanation": "BETWEEN es estrictamente inclusivo: equivale exactamente a `promedio >= 8.5 AND promedio <= 9.5`.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"BETWEEN\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "WHERE precio BETWEEN 100", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Escribir el valor mayor primero: `BETWEEN 9.5 AND 8.5` no devolverá ninguna fila porque el límite inferior debe ir primero.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"BETWEEN\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Sintaxis",
            "right": "columna BETWEEN valorMinimo AND valorMaximo."
          },
          {
            "left": "Principio 2",
            "right": "Incluye ambos extremos del intervalo."
          },
          {
            "left": "Principio 3",
            "right": "NOT BETWEEN selecciona todos los valores que queden fuera del rango."
          },
          {
            "left": "Buena práctica",
            "right": "BETWEEN es estrictamente inclusivo: equivale exactam..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l04-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"BETWEEN\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"BETWEEN\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "BETWEEN es estrictamente inclusivo: equivale exactamente a `promedio >= 8.5 AND promedio <= 9.5`.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"BETWEEN\"?",
        "code": "SELECT nombre, promedio \nFROM estudiantes \nWHERE promedio BETWEEN 8.5 AND 9.5;",
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
        "id": "sql-u07-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"BETWEEN\":",
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
        "id": "sql-u07-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"BETWEEN\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Escribir el valor mayor primero: `BETWEEN 9.5 AND 8.5` no devolverá ninguna fila porque el límite inferior debe ir primero.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"BETWEEN\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Filtra intervalos numéricos y de fechas inclusivos d..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Escribir el valor mayor primero: `BETWEEN 9.5 AND 8...."
          },
          {
            "left": "Recomendación",
            "right": "BETWEEN es estrictamente inclusivo: equivale exactam..."
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
    "id": "sql-u07-l05",
    "path": "sql",
    "unit": 7,
    "level": 5,
    "title": "5. IN",
    "description": "Reemplaza largas cadenas de comparaciones OR verificando si el valor de una columna pertenece a una lista de opciones discretas.",
    "exercises": [
      {
        "id": "sql-u07-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"IN\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE id IN (1, 3, 5);",
        "options": [
          "3",
          "5",
          "1",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "Sintaxis: columna IN (val1, val2, val3).",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l05-e02",
        "type": "code_cloze",
        "prompt": "El operador que comprueba si un valor coincide con cualquiera de los elementos de una lista entre paréntesis es ___:",
        "codeWithBlank": "El operador que comprueba si un valor coincide con cualquiera de los elementos de una lista entre paréntesis es ___:",
        "options": [
          "IN",
          "CONTAINS",
          "HAS",
          "EXISTS"
        ],
        "correctOption": "IN",
        "explanation": "NOT IN comprueba que el valor no pertenezca a la lista de opciones.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"IN\":",
        "tokens": [
          "WHERE",
          "id",
          "IN",
          "(",
          "1",
          ",",
          "2",
          ",",
          "3",
          ")"
        ],
        "solution": [
          "WHERE",
          "id",
          "IN",
          "(",
          "1",
          ",",
          "2",
          ",",
          "3",
          ")"
        ],
        "explanation": "IN es infinitamente más legible que escribir `WHERE carrera = 'A' OR carrera = 'B' OR carrera = 'C'`.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"IN\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "WHERE departamento IN \"Informática\", \"Matemáticas\"", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Olvidar entrecomillar los elementos de texto dentro de los paréntesis del IN.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"IN\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Sintaxis",
            "right": "columna IN (val1, val2, val3)."
          },
          {
            "left": "Principio 2",
            "right": "NOT IN comprueba que el valor no pertenezca a la lista de opciones."
          },
          {
            "left": "Principio 3",
            "right": "También puede recibir el resultado de una subconsulta SELECT."
          },
          {
            "left": "Buena práctica",
            "right": "IN es infinitamente más legible que escribir `WHERE ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l05-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"IN\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"IN\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "IN es infinitamente más legible que escribir `WHERE carrera = 'A' OR carrera = 'B' OR carrera = 'C'`.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"IN\"?",
        "code": "SELECT nombre, carrera \nFROM estudiantes \nWHERE carrera IN ('Ciencias de la Computación', 'Ciberseguridad');",
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
        "id": "sql-u07-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"IN\":",
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
        "id": "sql-u07-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"IN\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Olvidar entrecomillar los elementos de texto dentro de los paréntesis del IN.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"IN\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Reemplaza largas cadenas de comparaciones OR verific..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Olvidar entrecomillar los elementos de texto dentro ..."
          },
          {
            "left": "Recomendación",
            "right": "IN es infinitamente más legible que escribir `WHERE ..."
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
    "id": "sql-u07-l06",
    "path": "sql",
    "unit": 7,
    "level": 6,
    "title": "6. LIKE con % y _",
    "description": "Realiza búsquedas textuales por patrones con el comodín de cero o más caracteres (%) y el comodín de un solo carácter (_).",
    "exercises": [
      {
        "id": "sql-u07-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"LIKE con % y _\"?",
        "code": "SELECT COUNT(*) FROM usuarios WHERE email LIKE '%@bletchley.org';",
        "options": [
          "1",
          "5",
          "0",
          "3"
        ],
        "correctOptionIndex": 0,
        "explanation": "% representa cero, uno o múltiples caracteres arbitrarios.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l06-e02",
        "type": "code_cloze",
        "prompt": "En una búsqueda con LIKE, el comodín que coincide con cualquier número de caracteres es ___:",
        "codeWithBlank": "En una búsqueda con LIKE, el comodín que coincide con cualquier número de caracteres es ___:",
        "options": [
          "%",
          "_",
          "*",
          "?"
        ],
        "correctOption": "%",
        "explanation": "_ representa exactamente un carácter obligatorio en esa posición.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"LIKE con % y _\":",
        "tokens": [
          "WHERE",
          "nombre",
          "LIKE",
          "'Val%'"
        ],
        "solution": [
          "WHERE",
          "nombre",
          "LIKE",
          "'Val%'"
        ],
        "explanation": "El comodín % coincide con cualquier cantidad de letras; el comodín _ coincide con exactamente un solo carácter.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"LIKE con % y _\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "WHERE nombre LIKE '*Val*'", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "LIKE con % al inicio (ej. '%texto') no puede usar índices tradicionales en bases de datos enormes y será más lento.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"LIKE con % y _\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "LIKE con % y _",
            "right": "% representa cero, uno o múltiples caracteres arbitrarios."
          },
          {
            "left": "Principio 2",
            "right": "_ representa exactamente un carácter obligatorio en esa posición."
          },
          {
            "left": "Principio 3",
            "right": "En SQLite, LIKE no distingue entre mayúsculas y minúsculas por defecto para caracteres ASCII."
          },
          {
            "left": "Buena práctica",
            "right": "El comodín % coincide con cualquier cantidad de letr..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l06-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"LIKE con % y _\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"LIKE con % y _\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "El comodín % coincide con cualquier cantidad de letras; el comodín _ coincide con exactamente un solo carácter.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"LIKE con % y _\"?",
        "code": "SELECT id, nombre, email \nFROM usuarios \nWHERE email LIKE '%.org';",
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
        "id": "sql-u07-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"LIKE con % y _\":",
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
        "id": "sql-u07-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"LIKE con % y _\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "LIKE con % al inicio (ej. '%texto') no puede usar índices tradicionales en bases de datos enormes y será más lento.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"LIKE con % y _\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Realiza búsquedas textuales por patrones con el como..."
          },
          {
            "left": "Riesgo crítico",
            "right": "LIKE con % al inicio (ej. '%texto') no puede usar ín..."
          },
          {
            "left": "Recomendación",
            "right": "El comodín % coincide con cualquier cantidad de letr..."
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
    "id": "sql-u07-l07",
    "path": "sql",
    "unit": 7,
    "level": 7,
    "title": "7. IS NULL e IS NOT NULL",
    "description": "Aprende a consultar la presencia o ausencia de datos de forma rigurosa evitando la trampa mortal de usar `= NULL`.",
    "exercises": [
      {
        "id": "sql-u07-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"IS NULL e IS NOT NULL\"?",
        "code": "SELECT COUNT(*) FROM estudiantes WHERE id IS NOT NULL;",
        "options": [
          "5",
          "0",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "IS NULL filtra las filas donde el campo no contiene ningún dato.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l07-e02",
        "type": "code_cloze",
        "prompt": "Para filtrar registros que carecen de valor en una columna debemos usar la cláusula ___:",
        "codeWithBlank": "Para filtrar registros que carecen de valor en una columna debemos usar la cláusula ___:",
        "options": [
          "IS NULL",
          "= NULL",
          "IS EMPTY",
          "== NULL"
        ],
        "correctOption": "IS NULL",
        "explanation": "IS NOT NULL filtra las filas que tienen un valor concreto definido.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"IS NULL e IS NOT NULL\":",
        "tokens": [
          "WHERE",
          "telefono",
          "IS",
          "NOT",
          "NULL"
        ],
        "solution": [
          "WHERE",
          "telefono",
          "IS",
          "NOT",
          "NULL"
        ],
        "explanation": "Si escribes `WHERE columna = NULL`, la consulta siempre devolverá 0 filas porque en lógica ternaria NULL = NULL resulta en UNKNOWN.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"IS NULL e IS NOT NULL\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT * FROM t WHERE email = NULL // Trampa: en SQL siempre se usa IS NULL", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Intentar usar `!= NULL`: en SQL no existe, debes escribir obligatoriamente `IS NOT NULL`.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"IS NULL e IS NOT NULL\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "IS NULL e IS NOT NULL",
            "right": "IS NULL filtra las filas donde el campo no contiene ningún dato."
          },
          {
            "left": "Principio 2",
            "right": "IS NOT NULL filtra las filas que tienen un valor concreto definido."
          },
          {
            "left": "Principio 3",
            "right": "La lógica trivalente de SQL trata a NULL como desconocido, no como falso."
          },
          {
            "left": "Buena práctica",
            "right": "Si escribes `WHERE columna = NULL`, la consulta siem..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l07-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"IS NULL e IS NOT NULL\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"IS NULL e IS NOT NULL\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Si escribes `WHERE columna = NULL`, la consulta siempre devolverá 0 filas porque en lógica ternaria NULL = NULL resulta en UNKNOWN.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"IS NULL e IS NOT NULL\"?",
        "code": "SELECT id, nombre \nFROM estudiantes \nWHERE promedio IS NOT NULL;",
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
        "id": "sql-u07-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"IS NULL e IS NOT NULL\":",
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
        "id": "sql-u07-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"IS NULL e IS NOT NULL\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Intentar usar `!= NULL`: en SQL no existe, debes escribir obligatoriamente `IS NOT NULL`.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"IS NULL e IS NOT NULL\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a consultar la presencia o ausencia de datos..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar usar `!= NULL`: en SQL no existe, debes esc..."
          },
          {
            "left": "Recomendación",
            "right": "Si escribes `WHERE columna = NULL`, la consulta siem..."
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
    "id": "sql-u07-l08",
    "path": "sql",
    "unit": 7,
    "level": 8,
    "title": "8. ORDER BY",
    "description": "Ordena el conjunto de resultados de forma ascendente (ASC) o descendente (DESC) por una o múltiples columnas.",
    "exercises": [
      {
        "id": "sql-u07-l08-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"ORDER BY\"?",
        "code": "SELECT nombre FROM estudiantes ORDER BY promedio DESC LIMIT 1;",
        "options": [
          "Camila Gómez",
          "Valeria Morales",
          "Javier Ramos",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "ORDER BY columna ASC: ordena de menor a mayor (alfabético A-Z, numérico 0-9).",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l08-e02",
        "type": "code_cloze",
        "prompt": "Para ordenar el resultado de mayor a menor en SQL agregamos la palabra clave ___:",
        "codeWithBlank": "Para ordenar el resultado de mayor a menor en SQL agregamos la palabra clave ___:",
        "options": [
          "DESC",
          "ASC",
          "DOWN",
          "TOP"
        ],
        "correctOption": "DESC",
        "explanation": "ORDER BY columna DESC: ordena de mayor a menor (Z-A, 9-0).",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l08-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"ORDER BY\":",
        "tokens": [
          "SELECT",
          "*",
          "FROM",
          "estudiantes",
          "ORDER",
          "BY",
          "promedio",
          "DESC"
        ],
        "solution": [
          "SELECT",
          "*",
          "FROM",
          "estudiantes",
          "ORDER",
          "BY",
          "promedio",
          "DESC"
        ],
        "explanation": "Si no especificas ASC o DESC, SQL asume orden ascendente (ASC) de menor a mayor por defecto.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l08-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"ORDER BY\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "SELECT * FROM t SORT BY nombre", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Asumir que los datos en una tabla relacional ya vienen ordenados: sin ORDER BY, el orden de las filas es impredecible.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l08-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"ORDER BY\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "ORDER BY columna ASC",
            "right": "ordena de menor a mayor (alfabético A-Z, numérico 0-9)."
          },
          {
            "left": "ORDER BY columna DESC",
            "right": "ordena de mayor a menor (Z-A, 9-0)."
          },
          {
            "left": "Puedes ordenar por múltiples criterios",
            "right": "ORDER BY carrera ASC, promedio DESC."
          },
          {
            "left": "Buena práctica",
            "right": "Si no especificas ASC o DESC, SQL asume orden ascend..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l08-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"ORDER BY\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"ORDER BY\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Si no especificas ASC o DESC, SQL asume orden ascendente (ASC) de menor a mayor por defecto.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l08-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"ORDER BY\"?",
        "code": "SELECT nombre, promedio \nFROM estudiantes \nORDER BY promedio DESC;",
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
        "id": "sql-u07-l08-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"ORDER BY\":",
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
        "id": "sql-u07-l08-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"ORDER BY\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Asumir que los datos en una tabla relacional ya vienen ordenados: sin ORDER BY, el orden de las filas es impredecible.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l08-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"ORDER BY\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Ordena el conjunto de resultados de forma ascendente..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Asumir que los datos en una tabla relacional ya vien..."
          },
          {
            "left": "Recomendación",
            "right": "Si no especificas ASC o DESC, SQL asume orden ascend..."
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
    "id": "sql-u07-l09",
    "path": "sql",
    "unit": 7,
    "level": 9,
    "title": "9. LIMIT",
    "description": "Restringe la cantidad máxima de filas devueltas por la consulta para paginación y rankings rápidos.",
    "exercises": [
      {
        "id": "sql-u07-l09-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"LIMIT\"?",
        "code": "SELECT COUNT(*) FROM (SELECT * FROM estudiantes LIMIT 3);",
        "options": [
          "3",
          "5",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "LIMIT N indica el tope máximo de filas que el motor debe devolver.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l09-e02",
        "type": "code_cloze",
        "prompt": "La cláusula para limitar el número máximo de filas que retornará una consulta es ___:",
        "codeWithBlank": "La cláusula para limitar el número máximo de filas que retornará una consulta es ___:",
        "options": [
          "LIMIT",
          "TOP",
          "STOP",
          "COUNT"
        ],
        "correctOption": "LIMIT",
        "explanation": "Optimiza drásticamente el tiempo de respuesta y el tráfico de red.",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l09-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"LIMIT\":",
        "tokens": [
          "ORDER",
          "BY",
          "promedio",
          "DESC",
          "LIMIT",
          "5"
        ],
        "solution": [
          "ORDER",
          "BY",
          "promedio",
          "DESC",
          "LIMIT",
          "5"
        ],
        "explanation": "Usa LIMIT junto con OFFSET para construir paginadores web (ej. `LIMIT 10 OFFSET 20` para mostrar la página 3).",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l09-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"LIMIT\":",
        "codeSnippet": [ "-- Consulta sobre estudiantes", "LIMIT 5 SELECT * FROM t // LIMIT va al final de la consulta SQL", "ORDER BY id ASC;" ],
        "bugLineIndex": 1,
        "explanation": "Usar LIMIT sin ORDER BY te dará filas arbitrarias, porque el motor no sabrá cuáles son los \"primeros\".",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l09-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"LIMIT\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "LIMIT",
            "right": "LIMIT N indica el tope máximo de filas que el motor debe devolver."
          },
          {
            "left": "Principio 2",
            "right": "Optimiza drásticamente el tiempo de respuesta y el tráfico de red."
          },
          {
            "left": "Principio 3",
            "right": "Combinado con ORDER BY es la técnica estándar para crear ránkings (Top 5, Top 10)."
          },
          {
            "left": "Buena práctica",
            "right": "Usa LIMIT junto con OFFSET para construir paginadore..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l09-e06",
        "type": "code_cloze",
        "prompt": "En SQLite, respecto a \"LIMIT\", para asegurar la coherencia de los datos se debe ___:",
        "codeWithBlank": "Para garantizar la integridad en \"LIMIT\", la instrucción debe ___.",
        "options": [
          "cumplir las restricciones y tipos de columna",
          "omitir el tipo de dato",
          "eliminar las claves foráneas",
          "evitar el uso de SELECT"
        ],
        "correctOption": "cumplir las restricciones y tipos de columna",
        "explanation": "Usa LIMIT junto con OFFSET para construir paginadores web (ej. `LIMIT 10 OFFSET 20` para mostrar la página 3).",
        "xpReward": 10
      },
      {
        "id": "sql-u07-l09-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"LIMIT\"?",
        "code": "SELECT nombre, promedio \nFROM estudiantes \nORDER BY promedio DESC \nLIMIT 2;",
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
        "id": "sql-u07-l09-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"LIMIT\":",
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
        "id": "sql-u07-l09-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"LIMIT\":",
        "codeSnippet": [ "-- Consulta sobre el esquema educativo", "SELECT id, nombre FROM estudiantes", "WHERE id == 10;" ],
        "bugLineIndex": 2,
        "explanation": "Usar LIMIT sin ORDER BY te dará filas arbitrarias, porque el motor no sabrá cuáles son los \"primeros\".",
        "xpReward": 15
      },
      {
        "id": "sql-u07-l09-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"LIMIT\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Restringe la cantidad máxima de filas devueltas por ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar LIMIT sin ORDER BY te dará filas arbitrarias, p..."
          },
          {
            "left": "Recomendación",
            "right": "Usa LIMIT junto con OFFSET para construir paginadore..."
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
