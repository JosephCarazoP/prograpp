import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_02_THEORY: Record<string, TheoryLesson> = {
  'sql-u02-l01': {
    id: 'sql-th-u02-l01',
    lessonId: 'sql-u02-l01',
    pathId: 'sql',
    unitId: 2,
    levelId: 1,
    title: '1. La Declaracion SELECT y Recuperacion de Columnas',
    subtitle: 'SELECT es la instrucción más utilizada en SQL; proyecta las columnas deseadas a partir del conjunto de datos de una tabla.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'La Declaracion SELECT y Recuperacion de Columnas',
        explanation: 'SELECT es la instrucción más utilizada en SQL; proyecta las columnas deseadas a partir del conjunto de datos de una tabla.',
        codeSnippet: `SELECT nombre, email
FROM usuarios;`,
        codeLanguage: 'sql',
        byteTip: 'Escribe las palabras clave de SQL en MAYÚSCULAS para distinguir rápidamente comandos de nombres de tablas y columnas.',
        keyPoints: [
          'SELECT define qué campos o columnas devuelve la consulta',
          'Las columnas se separan por comas',
          'El orden de las columnas en el SELECT determina el orden del resultado'
        ]
      }
    ]
  },
  'sql-u02-l02': {
    id: 'sql-th-u02-l02',
    lessonId: 'sql-u02-l02',
    pathId: 'sql',
    unitId: 2,
    levelId: 2,
    title: '2. Seleccion de Columnas Especificas vs SELECT *',
    subtitle: 'El asterisco (*) proyecta todas las columnas de la tabla. En desarrollo es útil, pero en producción se deben nombrar columnas específicas.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Seleccion de Columnas Especificas vs SELECT *',
        explanation: 'El asterisco (*) proyecta todas las columnas de la tabla. En desarrollo es útil, pero en producción se deben nombrar columnas específicas.',
        codeSnippet: `-- Mala práctica en producción:
SELECT * FROM clientes;

-- Buena práctica (explícita y eficiente):
SELECT id, nombre, telefono FROM clientes;`,
        codeLanguage: 'sql',
        byteTip: 'El uso de SELECT * desactiva optimizaciones de índices de tipo "Covering Index" en los motores de bases de datos.',
        keyPoints: [
          'SELECT * devuelve todas las columnas en el orden del esquema',
          'Reduce ancho de banda y uso de memoria listando solo columnas requeridas',
          'Previene fallos en el código si se añaden o eliminan columnas en la tabla'
        ]
      }
    ]
  },
  'sql-u02-l03': {
    id: 'sql-th-u02-l03',
    lessonId: 'sql-u02-l03',
    pathId: 'sql',
    unitId: 2,
    levelId: 3,
    title: '3. La Clausula FROM y Especificacion de Tablas',
    subtitle: 'La cláusula FROM indica la tabla, vista o fuente de datos desde la cual el motor extraerá los registros a procesar.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'La Clausula FROM y Especificacion de Tablas',
        explanation: 'La cláusula FROM indica la tabla, vista o fuente de datos desde la cual el motor extraerá los registros a procesar.',
        codeSnippet: `SELECT nombre, precio
FROM tienda.productos_activos;`,
        codeLanguage: 'sql',
        byteTip: 'Aunque escribimos SELECT antes de FROM, el motor de base de datos ejecuta conceptualmente FROM en primer lugar.',
        keyPoints: [
          'FROM es la primera cláusula lógica procesada por el motor',
          'Puede incluir el esquema (esquema.tabla)',
          'Una consulta no puede recuperar columnas sin un origen en FROM'
        ]
      }
    ]
  },
  'sql-u02-l04': {
    id: 'sql-th-u02-l04',
    lessonId: 'sql-u02-l04',
    pathId: 'sql',
    unitId: 2,
    levelId: 4,
    title: '4. Calificacion de Columnas con el Nombre de la Tabla (tabla.columna)',
    subtitle: 'Calificar columnas anteponiendo el nombre de la tabla (tabla.columna) elimina ambigüedades y prepara la consulta para combinaciones (JOINs).',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Calificacion de Columnas con el Nombre de la Tabla (tabla.columna)',
        explanation: 'Calificar columnas anteponiendo el nombre de la tabla (tabla.columna) elimina ambigüedades y prepara la consulta para combinaciones (JOINs).',
        codeSnippet: `SELECT usuarios.nombre, usuarios.email
FROM usuarios;`,
        codeLanguage: 'sql',
        byteTip: 'Siempre califica las columnas cuando tu consulta involucre más de una tabla.',
        keyPoints: [
          'tabla.columna identifica de forma única la procedencia del campo',
          'Es indispensable cuando dos tablas comparten columnas con idéntico nombre (ej. id)',
          'Mejora la claridad en consultas complejas'
        ]
      }
    ]
  },
  'sql-u02-l05': {
    id: 'sql-th-u02-l05',
    lessonId: 'sql-u02-l05',
    pathId: 'sql',
    unitId: 2,
    levelId: 5,
    title: '5. Creacion de Alias con AS para Columnas',
    subtitle: 'La palabra clave AS permite asignar nombres temporales y significativos a las columnas en el conjunto de resultados.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Creacion de Alias con AS para Columnas',
        explanation: 'La palabra clave AS permite asignar nombres temporales y significativos a las columnas en el conjunto de resultados.',
        codeSnippet: `SELECT nombre AS nombre_completo, precio AS precio_unitario
FROM productos;`,
        codeLanguage: 'sql',
        byteTip: 'Si el alias contiene espacios o caracteres especiales, enciérralo entre comillas dobles: AS "Precio Final".',
        keyPoints: [
          'AS renombra la columna solo para el resultado devuelto al cliente',
          'No modifica el nombre físico de la columna en la tabla',
          'Permite dar nombres legibles a columnas calculadas'
        ]
      }
    ]
  },
  'sql-u02-l06': {
    id: 'sql-th-u02-l06',
    lessonId: 'sql-u02-l06',
    pathId: 'sql',
    unitId: 2,
    levelId: 6,
    title: '6. Creacion de Alias para Tablas (FROM tabla AS t)',
    subtitle: 'Los alias de tabla permiten asignar un identificador corto y cómodo a una tabla para abreviar las referencias en toda la consulta.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Creacion de Alias para Tablas (FROM tabla AS t)',
        explanation: 'Los alias de tabla permiten asignar un identificador corto y cómodo a una tabla para abreviar las referencias en toda la consulta.',
        codeSnippet: `SELECT u.id, u.nombre
FROM usuarios AS u;`,
        codeLanguage: 'sql',
        byteTip: 'Si declaras un alias de tabla, usar el nombre original de la tabla en el SELECT provocará un error de referencia.',
        keyPoints: [
          'Sintaxis: FROM nombre_largo_tabla AS t',
          'Una vez definido un alias de tabla, debe usarse el alias en el SELECT y WHERE',
          'Hace las consultas complejas y JOINs mucho más compactas y legibles'
        ]
      }
    ]
  },
  'sql-u02-l07': {
    id: 'sql-th-u02-l07',
    lessonId: 'sql-u02-l07',
    pathId: 'sql',
    unitId: 2,
    levelId: 7,
    title: '7. Eliminacion de Duplicados con SELECT DISTINCT',
    subtitle: 'La cláusula DISTINCT filtra las filas duplicadas en el conjunto de resultados, asegurando que cada valor proyectado sea único.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Eliminacion de Duplicados con SELECT DISTINCT',
        explanation: 'La cláusula DISTINCT filtra las filas duplicadas en el conjunto de resultados, asegurando que cada valor proyectado sea único.',
        codeSnippet: `SELECT DISTINCT ciudad
FROM clientes;`,
        codeLanguage: 'sql',
        byteTip: 'No uses DISTINCT por defecto si tus datos ya son únicos por diseño; agrega costo computacional innecesario.',
        keyPoints: [
          'Se coloca inmediatamente después de SELECT',
          'Evalúa la combinación completa de las columnas especificadas',
          'Implica una operación de ordenamiento o hashing interno en el motor'
        ]
      }
    ]
  },
  'sql-u02-l08': {
    id: 'sql-th-u02-l08',
    lessonId: 'sql-u02-l08',
    pathId: 'sql',
    unitId: 2,
    levelId: 8,
    title: '8. SELECT DISTINCT en Multiples Columnas',
    subtitle: 'Cuando se especifican varias columnas, DISTINCT evalúa la combinación completa de valores (tupla única), no cada columna de forma aislada.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'SELECT DISTINCT en Multiples Columnas',
        explanation: 'Cuando se especifican varias columnas, DISTINCT evalúa la combinación completa de valores (tupla única), no cada columna de forma aislada.',
        codeSnippet: `SELECT DISTINCT pais, ciudad
FROM sucursales;`,
        codeLanguage: 'sql',
        byteTip: 'Si añades una clave primaria (ej: id) a un SELECT DISTINCT, todas las filas serán únicas y el DISTINCT será inútil.',
        keyPoints: [
          'La fila se descarta solo si TODOS los valores de las columnas del SELECT son idénticos a otra fila',
          'Permite encontrar combinaciones únicas de atributos',
          'A más columnas en el DISTINCT, más filas suele retornar la consulta'
        ]
      }
    ]
  },
  'sql-u02-l09': {
    id: 'sql-th-u02-l09',
    lessonId: 'sql-u02-l09',
    pathId: 'sql',
    unitId: 2,
    levelId: 9,
    title: '9. Columnas Calculadas y Aritmetica en SELECT',
    subtitle: 'Puedes realizar operaciones matemáticas directas entre columnas o constantes dentro de la lista SELECT para generar datos derivados.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Columnas Calculadas y Aritmetica en SELECT',
        explanation: 'Puedes realizar operaciones matemáticas directas entre columnas o constantes dentro de la lista SELECT para generar datos derivados.',
        codeSnippet: `SELECT nombre,
       precio,
       precio * 0.90 AS precio_con_descuento,
       stock * precio AS valor_inventario
FROM productos;`,
        codeLanguage: 'sql',
        byteTip: 'Siempre asigna un alias (AS) a las columnas calculadas; de lo contrario el encabezado será la fórmula (ej: precio * 1.15).',
        keyPoints: [
          'Soporta +, -, *, / y %',
          'No altera los datos almacenados en el disco',
          'Se calculan sobre la marcha durante la ejecución de la consulta'
        ]
      }
    ]
  },
  'sql-u02-l10': {
    id: 'sql-th-u02-l10',
    lessonId: 'sql-u02-l10',
    pathId: 'sql',
    unitId: 2,
    levelId: 10,
    title: '10. Desafio de Punto Medio: Proyecciones Limpias y Reportes',
    subtitle: 'Consolida el uso conjunto de SELECT, FROM, calificación de tablas, alias con AS y expresiones calculadas.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Desafio de Punto Medio: Proyecciones Limpias y Reportes',
        explanation: 'Consolida el uso conjunto de SELECT, FROM, calificación de tablas, alias con AS y expresiones calculadas.',
        codeSnippet: `SELECT p.codigo AS sku,
       p.nombre AS descripcion_articulo,
       p.stock AS inventario_actual,
       p.precio * p.stock AS capital_inmovilizado
FROM inventario.productos AS p;`,
        codeLanguage: 'sql',
        byteTip: 'Un reporte bien estructurado en SQL ahorra cientos de líneas de código en el backend.',
        keyPoints: [
          'Construcción de consultas legibles y profesionales para reportería',
          'Uso disciplinado de alias de tablas y columnas',
          'Generación de métricas de negocio directamente en SQL'
        ]
      }
    ]
  },
  'sql-u02-l11': {
    id: 'sql-th-u02-l11',
    lessonId: 'sql-u02-l11',
    pathId: 'sql',
    unitId: 2,
    levelId: 11,
    title: '11. Concatenacion de Cadenas en SQL (|| y CONCAT)',
    subtitle: 'La concatenación permite unir cadenas de texto, columnas o literales en un solo campo resultante.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Concatenacion de Cadenas en SQL (|| y CONCAT)',
        explanation: 'La concatenación permite unir cadenas de texto, columnas o literales en un solo campo resultante.',
        codeSnippet: `-- Estándar ANSI y SQLite/PostgreSQL/Oracle:
SELECT nombre || ' ' || apellido AS nombre_completo
FROM usuarios;

-- MySQL y SQL Server (función CONCAT):
SELECT CONCAT(nombre, ' ', apellido) AS nombre_completo
FROM usuarios;`,
        codeLanguage: 'sql',
        byteTip: 'CONCAT_WS(separador, c1, c2, ...) une valores agregando un separador automáticamente e ignora los nulos.',
        keyPoints: [
          'El operador estándar ANSI es || (doble barra vertical)',
          'La función CONCAT(c1, c2, ...) está ampliamente soportada',
          'Manejar nulos con cuidado: en muchos motores \'Texto\' || NULL devuelve NULL'
        ]
      }
    ]
  },
  'sql-u02-l12': {
    id: 'sql-th-u02-l12',
    lessonId: 'sql-u02-l12',
    pathId: 'sql',
    unitId: 2,
    levelId: 12,
    title: '12. Funciones Escalares de Texto (UPPER, LOWER, LENGTH)',
    subtitle: 'Las funciones de texto permiten transformar cadenas al vuelo durante la proyección SELECT para normalizar o analizar su contenido.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Funciones Escalares de Texto (UPPER, LOWER, LENGTH)',
        explanation: 'Las funciones de texto permiten transformar cadenas al vuelo durante la proyección SELECT para normalizar o analizar su contenido.',
        codeSnippet: `SELECT UPPER(nombre) AS nombre_mayus,
       LOWER(email) AS email_minus,
       LENGTH(clave) AS longitud_clave
FROM usuarios;`,
        codeLanguage: 'sql',
        byteTip: 'Usa LOWER(email) para normalizar correos electrónicos y evitar duplicados por mayúsculas/minúsculas.',
        keyPoints: [
          'UPPER() convierte caracteres a mayúsculas',
          'LOWER() convierte a minúsculas',
          'LENGTH() o LEN() calcula la cantidad de caracteres de la cadena'
        ]
      }
    ]
  },
  'sql-u02-l13': {
    id: 'sql-th-u02-l13',
    lessonId: 'sql-u02-l13',
    pathId: 'sql',
    unitId: 2,
    levelId: 13,
    title: '13. Manejo de Nulos en Proyeccion con COALESCE',
    subtitle: 'COALESCE evalúa una lista de argumentos y devuelve el primer valor no nulo encontrado de izquierda a derecha.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Manejo de Nulos en Proyeccion con COALESCE',
        explanation: 'COALESCE evalúa una lista de argumentos y devuelve el primer valor no nulo encontrado de izquierda a derecha.',
        codeSnippet: `SELECT nombre,
       COALESCE(telefono, 'Sin teléfono') AS contacto
FROM clientes;

SELECT COALESCE(tel_movil, tel_fijo, tel_oficina, 'No disponible') AS tel
FROM contactos;`,
        codeLanguage: 'sql',
        byteTip: 'Es ideal para proporcionar valores predeterminados o de fallback en reportes y vistas.',
        keyPoints: [
          'Estándar ANSI SQL soportado universalmente',
          'Acepta 2 o más argumentos',
          'Si todos los argumentos son nulos, devuelve NULL'
        ]
      }
    ]
  },
  'sql-u02-l14': {
    id: 'sql-th-u02-l14',
    lessonId: 'sql-u02-l14',
    pathId: 'sql',
    unitId: 2,
    levelId: 14,
    title: '14. Reemplazo Condicional Basico con IFNULL / NVL',
    subtitle: 'Conoce las funciones de reemplazo de nulos propietarias de cada motor y cómo se relacionan con el estándar COALESCE.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Reemplazo Condicional Basico con IFNULL / NVL',
        explanation: 'Conoce las funciones de reemplazo de nulos propietarias de cada motor y cómo se relacionan con el estándar COALESCE.',
        codeSnippet: `-- En MySQL / SQLite:
SELECT nombre, IFNULL(apodo, 'Sin apodo') FROM usuarios;

-- En Oracle:
SELECT nombre, NVL(apodo, 'Sin apodo') FROM usuarios;

-- En SQL Server:
SELECT nombre, ISNULL(apodo, 'Sin apodo') FROM usuarios;`,
        codeLanguage: 'sql',
        byteTip: 'Prefiere siempre COALESCE sobre las funciones propietarias para que tus consultas sean portables a cualquier motor.',
        keyPoints: [
          'IFNULL(expr, fallback) en MySQL y SQLite',
          'ISNULL(expr, fallback) en SQL Server',
          'NVL(expr, fallback) en Oracle'
        ]
      }
    ]
  },
  'sql-u02-l15': {
    id: 'sql-th-u02-l15',
    lessonId: 'sql-u02-l15',
    pathId: 'sql',
    unitId: 2,
    levelId: 15,
    title: '15. Constantes y Literales Directos en la Lista SELECT',
    subtitle: 'Puedes proyectar valores literales fijos (números, textos, booleanos) directamente en el SELECT para complementar los registros devueltos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Constantes y Literales Directos en la Lista SELECT',
        explanation: 'Puedes proyectar valores literales fijos (números, textos, booleanos) directamente en el SELECT para complementar los registros devueltos.',
        codeSnippet: `SELECT id,
       nombre,
       'ACTIVO' AS estado_por_defecto,
       2026 AS anio_fiscal,
       true AS sincronizado
FROM clientes;`,
        codeLanguage: 'sql',
        byteTip: 'Las constantes son muy útiles cuando combinas consultas con UNION y necesitas distinguir el origen de cada fila.',
        keyPoints: [
          'El valor literal se repite idéntico para cada fila devuelta',
          'Útil para agregar etiquetas fijas o banderas en reportes',
          'Permite generar consultas de prueba rápidas (ej: SELECT 1)'
        ]
      }
    ]
  },
  'sql-u02-l16': {
    id: 'sql-th-u02-l16',
    lessonId: 'sql-u02-l16',
    pathId: 'sql',
    unitId: 2,
    levelId: 16,
    title: '16. Restriccion de Resultados con LIMIT / TOP / FETCH FIRST',
    subtitle: 'Aprende a restringir la cantidad máxima de filas devueltas por una consulta para mejorar la velocidad y paginar datos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Restriccion de Resultados con LIMIT / TOP / FETCH FIRST',
        explanation: 'Aprende a restringir la cantidad máxima de filas devueltas por una consulta para mejorar la velocidad y paginar datos.',
        codeSnippet: `-- En MySQL, PostgreSQL, SQLite:
SELECT nombre, precio
FROM productos
LIMIT 5;

-- En SQL Server:
SELECT TOP 5 nombre, precio
FROM productos;

-- En ANSI SQL moderno y Oracle 12c+:
SELECT nombre, precio
FROM productos
FETCH FIRST 5 ROWS ONLY;`,
        codeLanguage: 'sql',
        byteTip: 'Un LIMIT sin ORDER BY devuelve n filas aleatorias o no deterministas según el motor.',
        keyPoints: [
          'LIMIT n limita la salida a n filas',
          'TOP n en SQL Server se ubica después de SELECT',
          'FETCH FIRST n ROWS ONLY es la sintaxis ANSI oficial'
        ]
      }
    ]
  },
  'sql-u02-l17': {
    id: 'sql-th-u02-l17',
    lessonId: 'sql-u02-l17',
    pathId: 'sql',
    unitId: 2,
    levelId: 17,
    title: '17. Paginacion Basica con OFFSET y LIMIT',
    subtitle: 'OFFSET indica cuántas filas omitir antes de empezar a recopilar los resultados delimitados por LIMIT, permitiendo paginación en interfaces web.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Paginacion Basica con OFFSET y LIMIT',
        explanation: 'OFFSET indica cuántas filas omitir antes de empezar a recopilar los resultados delimitados por LIMIT, permitiendo paginación en interfaces web.',
        codeSnippet: `-- Página 1 (filas 1 a 10):
SELECT id, nombre FROM productos LIMIT 10 OFFSET 0;

-- Página 2 (filas 11 a 20):
SELECT id, nombre FROM productos LIMIT 10 OFFSET 10;

-- Página 3 (filas 21 a 30):
SELECT id, nombre FROM productos LIMIT 10 OFFSET 20;`,
        codeLanguage: 'sql',
        byteTip: 'Para offsets muy grandes (ej: OFFSET 1000000) considera paginación basada en cursor (Keyset pagination) para evitar lentitud.',
        keyPoints: [
          'OFFSET omite las primeras n filas',
          'Fórmula general: OFFSET (página - 1) * tamaño_pagina',
          'Debe combinarse con ORDER BY para paginación consistente'
        ]
      }
    ]
  },
  'sql-u02-l18': {
    id: 'sql-th-u02-l18',
    lessonId: 'sql-u02-l18',
    pathId: 'sql',
    unitId: 2,
    levelId: 18,
    title: '18. Buenas Practicas de Rendimiento: Evitar SELECT * en Produccion',
    subtitle: 'Comprende el impacto sistémico del sobredescargado de columnas (overfetching) y cómo la proyección estricta protege tus aplicaciones.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Buenas Practicas de Rendimiento: Evitar SELECT * en Produccion',
        explanation: 'Comprende el impacto sistémico del sobredescargado de columnas (overfetching) y cómo la proyección estricta protege tus aplicaciones.',
        codeSnippet: `-- Peligroso para la red y memoria:
SELECT * FROM transacciones;

-- Seguro, eficiente y predecible:
SELECT id, usuario_id, monto, estado FROM transacciones;`,
        codeLanguage: 'sql',
        byteTip: 'Establece linters de SQL en tu pipeline CI/CD que alerten ante la presencia de SELECT * en código de producción.',
        keyPoints: [
          'Evita transferir columnas innecesarias por la red',
          'Permite que el optimizador utilice Covering Indexes sin tocar la tabla base',
          'Protege contratos de API y mapeadores ORM'
        ]
      }
    ]
  },
  'sql-u02-l19': {
    id: 'sql-th-u02-l19',
    lessonId: 'sql-u02-l19',
    pathId: 'sql',
    unitId: 2,
    levelId: 19,
    title: '19. Comentarios en Consultas SQL (-- y /* */)',
    subtitle: 'Los comentarios permiten documentar la intención, lógica de negocio y autoría de consultas complejas sin afectar su ejecución.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Comentarios en Consultas SQL (-- y /* */)',
        explanation: 'Los comentarios permiten documentar la intención, lógica de negocio y autoría de consultas complejas sin afectar su ejecución.',
        codeSnippet: `-- Comentario de una sola línea: Consulta para el panel de ventas
SELECT id, nombre,
       /* Comentario multilínea o bloque incrustado */
       precio * 1.21 AS precio_con_iva
FROM productos; -- Fin de consulta`,
        codeLanguage: 'sql',
        byteTip: 'Documenta en comentarios el motivo de cálculos poco comunes (ej: -- Exoneración según ley 1234).',
        keyPoints: [
          '-- inicia un comentario de una sola línea hasta el salto de línea',
          '/* ... */ delimita un bloque de comentario multilínea',
          'El motor descarta los comentarios durante la fase de análisis léxico'
        ]
      }
    ]
  },
  'sql-u02-l20': {
    id: 'sql-th-u02-l20',
    lessonId: 'sql-u02-l20',
    pathId: 'sql',
    unitId: 2,
    levelId: 20,
    title: '20. Desafio Maestro de Unidad: Generador de Vistas y Catalogos',
    subtitle: 'Integra todas las habilidades de proyección: SELECT, FROM con esquemas y alias, DISTINCT, aritmética, funciones de texto, manejo de nulos y paginación.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Desafio Maestro de Unidad: Generador de Vistas y Catalogos',
        explanation: 'Integra todas las habilidades de proyección: SELECT, FROM con esquemas y alias, DISTINCT, aritmética, funciones de texto, manejo de nulos y paginación.',
        codeSnippet: `-- Generador del Catálogo Oficial de Productos
SELECT p.sku AS codigo_articulo,
       UPPER(p.nombre) AS descripcion,
       c.nombre AS categoria,
       p.precio * 1.16 AS precio_con_impuesto,
       COALESCE(p.garantia_meses, 12) AS meses_garantia,
       'VIGENTE' AS estado_catalogo
FROM inventario.productos AS p, inventario.categorias AS c
LIMIT 100 OFFSET 0;`,
        codeLanguage: 'sql',
        byteTip: 'Una consulta SELECT magistral es la base indiscutible sobre la que se construye cualquier sistema de información moderno.',
        keyPoints: [
          'Dominio completo de la anatomía del SELECT',
          'Creación de vistas relacionales profesionales y robustas',
          'Código SQL estándar, limpio y libre de malas prácticas'
        ]
      }
    ]
  },
};
