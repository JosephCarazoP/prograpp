import { Lesson, Exercise } from '../../../types/lesson';

const SQL_U02_BANKS: Record<number, { title: string; desc: string; exercises: Exercise[] }> = {
  1: {
    title: '1. La Declaración SELECT y Recuperación de Columnas',
    desc: 'Proyección de datos a partir del conjunto relacional de una tabla.',
    exercises: [
      {
        id: 'sql-u02-l01-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l01-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l01-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l01-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l01-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l01-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l01-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l01-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l01-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l01-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  2: {
    title: '2. Selección de Columnas Específicas vs SELECT *',
    desc: 'Buenas prácticas para evitar el sobreconsumo de ancho de banda y memoria.',
    exercises: [
      {
        id: 'sql-u02-l02-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l02-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l02-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l02-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l02-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l02-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l02-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l02-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l02-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l02-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  3: {
    title: '3. La Cláusula FROM y Especificación de Tablas',
    desc: 'Indicación de la entidad o vista de origen de los datos a procesar.',
    exercises: [
      {
        id: 'sql-u02-l03-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l03-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l03-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l03-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l03-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l03-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l03-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l03-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l03-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l03-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  4: {
    title: '4. Calificación de Columnas con el Nombre de Tabla',
    desc: 'Desambiguación de columnas anteponiendo tabla.columna.',
    exercises: [
      {
        id: 'sql-u02-l04-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l04-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l04-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l04-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l04-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l04-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l04-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l04-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l04-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l04-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  5: {
    title: '5. Creación de Alias con AS para Columnas',
    desc: 'Renombramiento cosmético y descriptivo en la salida de resultados.',
    exercises: [
      {
        id: 'sql-u02-l05-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l05-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l05-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l05-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l05-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l05-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l05-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l05-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l05-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l05-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  6: {
    title: '6. Creación de Alias para Tablas (FROM tabla AS t)',
    desc: 'Identificadores breves para hacer consultas compactas y legibles.',
    exercises: [
      {
        id: 'sql-u02-l06-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l06-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l06-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l06-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l06-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l06-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l06-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l06-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l06-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l06-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  7: {
    title: '7. Eliminación de Duplicados con SELECT DISTINCT',
    desc: 'Filtrado de filas idénticas colapsando resultados en valores únicos.',
    exercises: [
      {
        id: 'sql-u02-l07-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l07-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l07-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l07-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l07-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l07-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l07-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l07-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l07-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l07-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  8: {
    title: '8. SELECT DISTINCT en Múltiples Columnas',
    desc: 'Evaluación de combinaciones únicas de tuplas en proyecciones.',
    exercises: [
      {
        id: 'sql-u02-l08-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l08-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l08-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l08-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l08-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l08-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l08-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l08-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l08-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l08-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  9: {
    title: '9. Columnas Calculadas y Aritmética en SELECT',
    desc: 'Cálculo de expresiones matemáticas al vuelo durante la proyección.',
    exercises: [
      {
        id: 'sql-u02-l09-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l09-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l09-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l09-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l09-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l09-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l09-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l09-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l09-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l09-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  10: {
    title: '10. Desafío de Punto Medio: Proyecciones y Reportes',
    desc: 'Consolidación de SELECT, FROM, alias con AS y métricas de negocio.',
    exercises: [
      {
        id: 'sql-u02-l10-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l10-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l10-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l10-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l10-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l10-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l10-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l10-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l10-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l10-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  11: {
    title: '11. Concatenación de Cadenas en SQL (|| y CONCAT)',
    desc: 'Unión de múltiples fragmentos de texto en una sola columna devuelta.',
    exercises: [
      {
        id: 'sql-u02-l11-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l11-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l11-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l11-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l11-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l11-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l11-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l11-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l11-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l11-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  12: {
    title: '12. Funciones Escalares de Texto (UPPER, LOWER, LENGTH)',
    desc: 'Transformación de caracteres para normalización y análisis.',
    exercises: [
      {
        id: 'sql-u02-l12-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l12-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l12-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l12-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l12-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l12-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l12-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l12-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l12-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l12-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  13: {
    title: '13. Manejo de Nulos en Proyección con COALESCE',
    desc: 'Primer valor no nulo de izquierda a derecha según estándar ANSI.',
    exercises: [
      {
        id: 'sql-u02-l13-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l13-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l13-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l13-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l13-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l13-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l13-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l13-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l13-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l13-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  14: {
    title: '14. Reemplazo Condicional Básico con IFNULL / NVL',
    desc: 'Funciones de sustitución de nulos propietarias en RDBMS.',
    exercises: [
      {
        id: 'sql-u02-l14-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l14-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l14-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l14-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l14-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l14-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l14-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l14-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l14-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l14-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  15: {
    title: '15. Constantes y Literales Directos en SELECT',
    desc: 'Inclusión de etiquetas y banderas fijas en cada fila del reporte.',
    exercises: [
      {
        id: 'sql-u02-l15-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l15-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l15-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l15-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l15-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l15-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l15-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l15-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l15-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l15-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  16: {
    title: '16. Restricción de Resultados con LIMIT / TOP',
    desc: 'Tope máximo de filas devueltas para mejorar el rendimiento.',
    exercises: [
      {
        id: 'sql-u02-l16-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l16-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l16-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l16-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l16-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l16-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l16-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l16-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l16-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l16-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  17: {
    title: '17. Paginación Básica con OFFSET y LIMIT',
    desc: 'Salto de registros y obtención de páginas consecutivas para interfaces.',
    exercises: [
      {
        id: 'sql-u02-l17-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l17-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l17-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l17-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l17-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l17-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l17-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l17-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l17-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l17-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  18: {
    title: '18. Buenas Prácticas: Evitar SELECT * en Producción',
    desc: 'Prevención de cuellos de botella y protección de contratos de API.',
    exercises: [
      {
        id: 'sql-u02-l18-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l18-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l18-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l18-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l18-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l18-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l18-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l18-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l18-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l18-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  19: {
    title: '19. Comentarios en Consultas SQL (-- y /* */)',
    desc: 'Documentación de reglas de negocio dentro del propio script de consulta.',
    exercises: [
      {
        id: 'sql-u02-l19-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l19-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l19-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l19-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l19-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l19-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l19-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l19-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l19-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l19-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
  20: {
    title: '20. Desafío Maestro: Generador de Vistas y Catálogos',
    desc: 'Construcción integral de un catálogo paginado, limpio y calificado.',
    exercises: [
      {
        id: 'sql-u02-l20-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos y cláusulas de este nivel de SQL:',
        pairs: [
          { left: 'SELECT', right: 'Proyecta columnas a devolver' },
          { left: 'FROM', right: 'Especifica la tabla de origen' },
          { left: 'AS', right: 'Asigna alias temporal a columna o tabla' },
          { left: 'DISTINCT', right: 'Elimina filas duplicadas' }
        ],
        explanation: 'Las cláusulas fundamentales definen la estructura básica de cualquier consulta relacional.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l20-e02',
        type: 'code_builder',
        prompt: 'Construye la consulta para obtener id y nombre de la tabla usuarios:',
        tokens: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';', 'WHERE', '*'],
        solution: ['SELECT', 'id, nombre', 'FROM', 'usuarios', ';'],
        hint: 'Inicia con SELECT, lista los campos y enlaza con FROM.',
        explanation: 'SELECT id, nombre FROM usuarios; es la forma estándar de proyección relacional.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l20-e03',
        type: 'predict_output',
        prompt: '¿Qué resultado devuelve la siguiente expresión de columnas calculadas?',
        code: 'SELECT 100 + 25 * 2 AS total;',
        options: ['250', '150', '125', '200'],
        correctOptionIndex: 1,
        explanation: 'En SQL la multiplicación tiene prioridad: 25 * 2 = 50, y 100 + 50 = 150.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l20-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error de sintaxis en la consulta:',
        codeSnippet: [
          'SELECT id, nombre',
          'FROM clientes AS c',
          'LIMIT 10 OFFSET -5; -- Offset no puede ser negativo'
        ],
        bugLineIndex: 2,
        explanation: 'El valor de OFFSET debe ser un número entero no negativo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l20-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para eliminar filas duplicadas:',
        codeWithBlank: 'SELECT ___ ciudad FROM sucursales;',
        options: ['DISTINCT', 'UNIQUE', 'SINGLE', 'FILTER'],
        correctOption: 'DISTINCT',
        explanation: 'SELECT DISTINCT suprime registros duplicados en el conjunto devuelto.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l20-e06',
        type: 'predict_output',
        prompt: '¿Qué devuelve la función estándar COALESCE con estos argumentos?',
        code: 'SELECT COALESCE(NULL, 100, 200) AS res;',
        options: ['NULL', '100', '200', 'Error'],
        correctOptionIndex: 1,
        explanation: 'COALESCE devuelve el primer argumento no nulo evaluado de izquierda a derecha (100).',
        xpReward: 10
      },
      {
        id: 'sql-u02-l20-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con alias de tabla para proyectos:',
        tokens: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        solution: ['SELECT', 'p.id, p.titulo', 'FROM', 'proyectos', 'AS', 'p', ';'],
        hint: 'Asigna el alias p con AS y califica las columnas.',
        explanation: 'Calificar con alias (p.id) hace la consulta concisa y preparada para JOINs.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l20-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de texto con su propósito:',
        pairs: [
          { left: 'UPPER(col)', right: 'Convierte texto a mayúsculas' },
          { left: 'LOWER(col)', right: 'Convierte texto a minúsculas' },
          { left: 'LENGTH(col)', right: 'Calcula la longitud de la cadena' },
          { left: 'TRIM(col)', right: 'Elimina espacios en blanco exteriores' }
        ],
        explanation: 'Las funciones de texto permiten normalizar y analizar campos al vuelo.',
        xpReward: 15
      },
      {
        id: 'sql-u02-l20-e09',
        type: 'code_cloze',
        prompt: 'Completa la consulta para limitar el resultado a las primeras 5 filas:',
        codeWithBlank: 'SELECT * FROM productos ___ 5;',
        options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
        correctOption: 'LIMIT',
        explanation: 'LIMIT n restringe la cantidad máxima de filas entregadas al cliente.',
        xpReward: 10
      },
      {
        id: 'sql-u02-l20-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura de la consulta completa con proyección, origen y paginación:',
        lines: [
          'SELECT codigo, descripcion',
          'FROM catalogo.articulos',
          'LIMIT 20 OFFSET 40;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La anatomía estándar en SQL inicia con SELECT, continúa con FROM y finaliza con LIMIT/OFFSET.',
        xpReward: 20
      }
    ]
  },
};

export const SQL_UNIT_02_LESSONS: Lesson[] = Object.keys(SQL_U02_BANKS).map(lvlStr => {
  const lvl = Number(lvlStr);
  const data = SQL_U02_BANKS[lvl];
  return {
    id: `sql-u02-l${String(lvl).padStart(2, '0')}`,
    path: 'sql',
    unit: 2,
    level: lvl,
    title: data.title,
    description: data.desc,
    exercises: data.exercises
  };
});
