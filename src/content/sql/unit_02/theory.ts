import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_02_THEORY: Record<string, TheoryLesson> = {
  'sql-u02-l01': {
    id: 'sql-th-u02-l01',
    lessonId: 'sql-u02-l01',
    pathId: 'sql',
    unitId: 2,
    levelId: 1,
    title: '1. La Declaración SELECT y Recuperación de Columnas',
    subtitle: 'SELECT es la instrucción más utilizada en SQL; proyecta las columnas deseadas a partir del conjunto de datos de una tabla.',
    estimatedMinutes: 5,
    analogy: 'El comando `SELECT` es como pedirle al bibliotecario de la ciudad que te traiga solo el título y el autor de los libros de historia, en lugar de cargar las 1,000 páginas de cada tomo hasta tu mesa.',
    video: {
      title: 'SELECT y Proyección de Datos en SQL para Principiantes',
      channel: 'Programming with Mosh',
      duration: '8:30',
      url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
      summary: 'Aprende la sintaxis fundamental de SELECT, cómo pedir columnas y cómo el motor SQL proyecta los resultados en tablas limpias.'
    },
    sections: [
      {
        title: 'La Anatomía de una Consulta SELECT',
        explanation: 'En el lenguaje SQL, la sentencia `SELECT` es la herramienta universal para recuperar y proyectar datos almacenados en un RDBMS.\n\nEstructura básica:\n`SELECT columna1, columna2 FROM nombre_tabla;`\n\nEl orden en que listas las columnas en el `SELECT` determina estrictamente el orden de izquierda a derecha en el reporte resultante.',
        codeSnippet: `-- Consultando nombre y correo de todos los usuarios
SELECT nombre, email 
FROM usuarios;`,
        codeLanguage: 'sql',
        outputSnippet: `+---------------+--------------------+
| nombre        | email              |
+---------------+--------------------+
| Ada Lovelace  | ada@pioneers.org   |
| Alan Turing   | alan@bletchley.org |
| Grace Hopper  | grace@navy.mil     |
+---------------+--------------------+`,
        byteTip: 'Escribe las palabras clave de SQL en MAYÚSCULAS (SELECT, FROM) y los nombres de tablas y columnas en minúsculas snake_case para máxima legibilidad.',
        pitfallTip: 'No olvides terminar tus instrucciones SQL con punto y coma (;). En interfaces de línea de comandos, la consulta no se enviará al motor sin él.',
        keyPoints: [
          'SELECT define qué columnas proyectará la consulta.',
          'Las columnas se separan por comas.',
          'El orden en el SELECT define el orden en la cuadrícula de salida.'
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
    title: '2. Selección de Columnas Específicas vs SELECT *',
    subtitle: 'El asterisco (*) proyecta todas las columnas; descubre por qué en producción siempre debes listar columnas concretas.',
    estimatedMinutes: 5,
    analogy: '`SELECT *` es como ordenar todas las opciones del menú completo de un restaurante cuando solo querías una taza de café: saturas tu mesa, pagas por cosas que no te vas a comer y retrasas el servicio para todos los demás.',
    video: {
      title: 'Por qué NUNCA deberías usar SELECT * en Producción',
      channel: 'Alex The Analyst / SQL Best Practices',
      duration: '7:45',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre los problemas de rendimiento, el sobreconsumo de ancho de banda y las rupturas de contratos de API causadas por el uso de SELECT *.'
    },
    sections: [
      {
        title: 'Rendimiento y Contratos de Datos Seguros',
        explanation: 'El asterisco `*` es un comodín muy cómodo en desarrollo local para explorar qué columnas tiene una tabla recién creada.\n\nSin embargo, en código de producción profesional usar `SELECT *` es una pésima práctica por 3 razones críticas:\n1. Sobredescarga de red (Overfetching): Si una tabla tiene columnas con fotos o textos gigantescos de 2 MB, `SELECT *` descargará gigabytes innecesarios.\n2. Desactiva índices de cobertura (Covering Indexes): El motor no puede responder la consulta directamente desde la memoria RAM si pides columnas que no están indexadas.\n3. Ruptura de APIs: Si un administrador añade una columna nueva a la tabla, `SELECT *` cambiará la forma del JSON devuelto, rompiendo aplicaciones móviles antiguas.',
        codeSnippet: `-- ❌ Mala práctica en producción (lento y riesgoso):
-- SELECT * FROM clientes;

-- ✅ Buena práctica profesional (explícita, ligera y predecible):
SELECT id, nombre, telefono 
FROM clientes;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+--------------+-------------+
| id | nombre       | telefono    |
+----+--------------+-------------+
|  1 | Ada Lovelace | +1 555-0199 |
|  2 | Alan Turing  | +1 555-0142 |
+----+--------------+-------------+`,
        byteTip: 'Configura linters automáticos de SQL en tu pipeline de GitHub o GitLab que adviertan o impidan el merge de consultas con SELECT *.',
        pitfallTip: 'Usar SELECT * en consultas con INNER JOIN puede provocar que dos columnas con el mismo nombre (ej: id en clientes y pedidos) colisionen y sobreescriban datos en el cliente.',
        keyPoints: [
          'SELECT * proyecta todas las columnas en el orden del esquema.',
          'Listar columnas específicas reduce consumo de red y memoria.',
          'Protege tus aplicaciones contra cambios inesperados en la base de datos.'
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
    title: '3. La Cláusula FROM y Especificación de Tablas',
    subtitle: 'La cláusula FROM indica la tabla, vista o esquema desde donde el motor extrae los registros físicos.',
    estimatedMinutes: 5,
    analogy: '`FROM` es como la dirección postal en un mapa: antes de pedir qué paquetes quieres recibir (SELECT), debes especificar a qué bodega exacta del país debe ir el camión repartidor.',
    video: {
      title: 'Orden lógico de ejecución en SQL: Por qué FROM va primero',
      channel: 'Deukion / SQL desde Cero',
      duration: '9:10',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende el ciclo de vida de una consulta: cómo el motor procesa FROM antes que SELECT y cómo referenciar tablas de otros esquemas.'
    },
    sections: [
      {
        title: 'El Origen Lógico de los Datos',
        explanation: 'Aunque humanamente escribimos `SELECT` al inicio de la consulta, conceptualmente el motor SQL ejecuta `FROM` en PRIMER LUGAR.\n\nEn `FROM` defines la fuente de datos:\n- Una tabla simple: `FROM productos`\n- Una tabla calificada con esquema: `FROM inventario.productos`\n- Una vista virtual o subconsulta.\n\nSin una cláusula `FROM` válida, el motor no puede verificar si las columnas solicitadas en el `SELECT` existen.',
        codeSnippet: `-- Tabla dentro del esquema por defecto
SELECT nombre, precio 
FROM productos;

-- Tabla calificada formalmente con su esquema de negocio
SELECT codigo, descripcion 
FROM inventario.articulos;`,
        codeLanguage: 'sql',
        outputSnippet: `+-------------------+--------+
| nombre            | precio |
+-------------------+--------+
| Monitor 27 Pulg   | 280.00 |
| Teclado Mecánico  |  75.50 |
+-------------------+--------+`,
        byteTip: 'En bases de datos empresariales multi-inquilino (PostgreSQL/SQL Server), organizar tablas en esquemas como ventas.pedidos o rrhh.empleados evita conflictos de nombres.',
        pitfallTip: 'Si escribes mal el nombre de la tabla en el FROM, recibirás el error inmediato: "Relation / Table does not exist".',
        keyPoints: [
          'FROM es la primera cláusula que procesa el motor internamente.',
          'Identifica la tabla física o vista de donde provienen los registros.',
          'Puede incluir el nombre del esquema (esquema.tabla).'
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
    title: '4. Calificación de Columnas con el Nombre de la Tabla (tabla.columna)',
    subtitle: 'Anteponer el nombre de la tabla elimina ambigüedades y prepara tus consultas para combinaciones (JOINs).',
    estimatedMinutes: 5,
    analogy: 'Es como referirte a una persona por su nombre y apellido completo en una reunión concurrida: en vez de decir "Carlos", dices "Carlos Soto", para que nadie lo confunda con "Carlos Gómez".',
    video: {
      title: 'Calificación de columnas tabla.columna en SQL',
      channel: 'freeCodeCamp.org',
      duration: '7:20',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre cómo calificar columnas explícitamente y cómo previene el famoso error "Column is ambiguous" al hacer cruces de tablas.'
    },
    sections: [
      {
        title: 'Cero Ambigüedad en Consultas Relacionales',
        explanation: 'En SQL puedes calificar cualquier columna anteponiendo el nombre de la tabla seguido de un punto: `nombre_tabla.nombre_columna`.\n\n¿Por qué es indispensable dominar esto?\nEn consultas que involucran dos o más tablas combinadas, ambas tablas suelen tener columnas llamadas `id`, `nombre` o `fecha`. Si solo escribes `SELECT id`, el motor se detendrá con el error `Column \'id\' in field list is ambiguous`. Al escribir `SELECT usuarios.id, pedidos.id`, la duda desaparece por completo.',
        codeSnippet: `-- Consulta calificada explícitamente
SELECT usuarios.id, usuarios.nombre, usuarios.email 
FROM usuarios;

-- Preparando la sintaxis para consultas relacionales avanzadas
SELECT clientes.nombre, facturas.monto 
FROM clientes, facturas;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+---------------+--------------------+
| id | nombre        | email              |
+----+---------------+--------------------+
|  1 | Ada Lovelace  | ada@pioneers.org   |
|  2 | Alan Turing   | alan@bletchley.org |
+----+---------------+--------------------+`,
        byteTip: 'Calificar columnas siempre que consultes más de una tabla es una señal inconfundible de profesionalismo en revisiones de código.',
        pitfallTip: 'Si calificas con un nombre de tabla que no está listado en la cláusula FROM, recibirás un error de referencia inválida.',
        keyPoints: [
          'tabla.columna indica con exactitud a qué tabla pertenece el campo.',
          'Es obligatoria para resolver ambigüedades en consultas con JOINs.',
          'Mejora la claridad en sistemas con cientos de tablas.'
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
    title: '5. Creación de Alias con AS para Columnas',
    subtitle: 'La palabra clave AS permite asignar nombres temporales y significativos a las columnas en el conjunto de resultados.',
    estimatedMinutes: 5,
    analogy: 'Un alias de columna es como la traducción oficial de un pasaporte: en el chip electrónico dice "DOB", pero en la hoja de lectura humana le ponen la etiqueta comprensible "Fecha de Nacimiento".',
    video: {
      title: 'Uso de Alias de Columna con AS en SQL',
      channel: 'Alex The Analyst',
      duration: '8:10',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende a renombrar columnas, cómo usar comillas en alias con espacios y por qué es vital para alimentar APIs REST con nombres limpios.'
    },
    sections: [
      {
        title: 'Renombrando Atributos en la Respuesta',
        explanation: 'En las bases de datos de producción es muy común que las columnas tengan nombres técnicos antiguos (como `cli_nom_razon_soc` o `fec_reg`).\n\nCon la palabra reservada `AS` puedes crear un Alias: un nombre alternativo temporal que aparecerá en el encabezado de la tabla de resultados devuelta al frontend o cliente.',
        codeSnippet: `-- Renombrando columnas para hacer el resultado inmediatamente legible
SELECT 
    nombre AS nombre_cliente,
    email AS correo_electronico,
    telefono AS linea_contacto
FROM clientes;`,
        codeLanguage: 'sql',
        outputSnippet: `+----------------+--------------------+----------------+
| nombre_cliente | correo_electronico | linea_contacto |
+----------------+--------------------+----------------+
| Ada Lovelace   | ada@pioneers.org   | +1 555-0199    |
+----------------+--------------------+----------------+`,
        byteTip: 'El alias no modifica en absoluto el nombre físico de la columna en la tabla del disco; solo altera la cabecera en la respuesta devuelta.',
        pitfallTip: 'Como WHERE se procesa antes que SELECT, no puedes usar alias de columnas en la cláusula WHERE. Escribir WHERE correo_electronico = \'...\' fallará en la mayoría de motores.',
        keyPoints: [
          'AS renombra la columna solo para el cliente que recibe los datos.',
          'Es indispensable para bautizar cálculos matemáticos derivados.',
          'Hace que el JSON devuelto a tu aplicación frontend sea limpio y descriptivo.'
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
    title: '6. Creación de Alias para Tablas (FROM tabla AS t)',
    subtitle: 'Asigna identificadores cortos y cómodos a las tablas para simplificar consultas extensas.',
    estimatedMinutes: 5,
    analogy: 'Un alias de tabla es como usar las iniciales o el sobrenombre de una institución larga: en lugar de escribir "Organización de las Naciones Unidas" en cada línea de un informe, defines "ONU" al inicio y usas esa sigla corta en todo el documento.',
    video: {
      title: 'Table Aliases en SQL: Abreviando nombres de tablas',
      channel: 'Programming with Mosh',
      duration: '7:55',
      url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
      summary: 'Descubre cómo los alias de tabla (FROM usuarios AS u) hacen tus consultas mucho más compactas y cómo usarlos en calificaciones u.nombre.'
    },
    sections: [
      {
        title: 'Abreviación Inteligente en la Cláusula FROM',
        explanation: 'Escribir `nombre_super_largo_de_la_tabla.columna` una y otra vez agota la vista y llena la pantalla de texto redundante.\n\nSQL permite asignar un Alias a la tabla directamente en la cláusula `FROM`:\n`FROM clientes_corporativos_latam AS c`\n\nA partir de ese momento, puedes referirte a todas las columnas de esa tabla anteponiendo el alias corto: `c.id`, `c.nombre`, `c.saldo`.',
        codeSnippet: `-- Asignando alias 'u' a la tabla usuarios
SELECT u.id, u.nombre, u.email 
FROM usuarios AS u;

-- La palabra AS en el FROM es opcional en la mayoría de motores:
SELECT p.id, p.nombre, p.precio 
FROM productos p;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+-------------------+--------+
| id | nombre            | precio |
+----+-------------------+--------+
|  1 | Monitor 27 Pulg   | 280.00 |
|  2 | Teclado Mecánico  |  75.50 |
+----+-------------------+--------+`,
        byteTip: 'Usa alias mnemónicos de 1 a 3 letras que representen las iniciales de la tabla (ejemplo: det para detalle_ventas, emp para empleados).',
        pitfallTip: '¡Atención!: Una vez que defines un alias de tabla en el FROM, el motor PROHÍBE usar el nombre original de la tabla en el SELECT. Escribir SELECT usuarios.id FROM usuarios AS u provocará error.',
        keyPoints: [
          'Sintaxis: FROM nombre_tabla AS alias.',
          'Una vez asignado el alias, debes usarlo en el SELECT y WHERE.',
          'Hace las consultas complejas y JOINs mucho más compactas y fáciles de leer.'
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
    title: '7. Eliminación de Duplicados con SELECT DISTINCT',
    subtitle: 'La cláusula DISTINCT filtra filas redundantes en la salida asegurando valores únicos.',
    estimatedMinutes: 5,
    analogy: 'Es como limpiar tu agenda de contactos telefónicos para eliminar las 5 entradas duplicadas que tienes para la misma persona y quedarte con un solo registro limpio.',
    video: {
      title: 'SELECT DISTINCT en SQL: Cómo funciona internamente',
      channel: 'Alex The Analyst',
      duration: '8:40',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende cómo el optimizador de SQL agrupa duplicados en memoria y cuándo es conveniente usarlo para reportes.'
    },
    sections: [
      {
        title: 'Filtrando Filas Duplicadas en el Resultado',
        explanation: 'En las tablas del mundo real, los datos se repiten constantemente. Si tienes una tabla con 10,000 pedidos y consultas `SELECT ciudad_entrega FROM pedidos;`, verás "Madrid" repetido 2,000 veces.\n\nColocando `DISTINCT` justo después de `SELECT`, el motor descarta las filas duplicadas y entrega un conjunto donde cada valor aparece una sola vez.',
        codeSnippet: `-- Extrayendo los departamentos únicos donde existen empleados
SELECT DISTINCT departamento 
FROM empleados;`,
        codeLanguage: 'sql',
        outputSnippet: `+----------------+
| departamento   |
+----------------+
| Ingeniería     |
| Finanzas       |
| Marketing      |
| Recursos Hum   |
+----------------+`,
        byteTip: 'No uses DISTINCT por defecto "por si acaso". Si tus datos ya son únicos (como una clave primaria), DISTINCT solo añade un costo de ordenamiento innecesario en la CPU.',
        pitfallTip: 'DISTINCT se aplica a TODA la fila proyectada, no solo a la primera columna que escribas. Si proyectas id (que es único) y ciudad, DISTINCT no colapsará nada porque el id hace que cada fila sea única.',
        keyPoints: [
          'DISTINCT se escribe inmediatamente después de SELECT.',
          'Colapsa filas con valores idénticos en una sola ocurrencia.',
          'Ideal para alimentar listas de selección y filtros en interfaces de usuario.'
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
    title: '8. SELECT DISTINCT en Múltiples Columnas',
    subtitle: 'Evaluación de combinaciones completas de atributos (tuplas compuestas) para hallar pares únicos.',
    estimatedMinutes: 5,
    analogy: 'Es como consultar las combinaciones únicas de marca y modelo en un lote de autos usados: puedes tener 5 autos Toyota Corolla y 3 autos Toyota Camry. Con DISTINCT marca, modelo, el resultado tendrá solo 2 filas: una para Toyota Corolla y otra para Toyota Camry.',
    video: {
      title: 'SELECT DISTINCT con múltiples columnas en SQL',
      channel: 'Deukion / SQL desde Cero',
      duration: '7:35',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre cómo DISTINCT evalúa la combinación de todas las columnas proyectadas como una tupla única.'
    },
    sections: [
      {
        title: 'Tuplas Compuestas Únicas',
        explanation: 'Cuando especificas varias columnas en un `SELECT DISTINCT`, el motor no filtra cada columna por separado. Evalúa la COMBINACIÓN COMPLETA de valores de la fila.\n\nUna fila solo se descartará si TODOS los atributos proyectados coinciden exactamente con otra fila ya procesada.',
        codeSnippet: `-- Consultando combinaciones únicas de país y ciudad en sucursales
SELECT DISTINCT pais, ciudad 
FROM sucursales;`,
        codeLanguage: 'sql',
        outputSnippet: `+-------------+------------+
| pais        | ciudad     |
+-------------+------------+
| Costa Rica  | San José   |
| Costa Rica  | Alajuela   |
| México      | CDMX       |
| México      | Monterrey  |
+-------------+------------+`,
        byteTip: 'A mayor cantidad de columnas agregues a la lista de DISTINCT, mayor será el número de filas devueltas, porque es más difícil que múltiples campos coincidan al mismo tiempo.',
        pitfallTip: 'No pongas paréntesis en DISTINCT como si fuera una función (DISTINCT(pais), ciudad). En SQL, DISTINCT es un modificador de la cláusula SELECT completa.',
        keyPoints: [
          'DISTINCT evalúa la combinación conjunta de todas las columnas proyectadas.',
          'Permite encontrar relaciones y combinaciones únicas en tus tablas.',
          'Si una sola columna difiere, la fila completa se conserva.'
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
    title: '9. Columnas Calculadas y Aritmética en SELECT',
    subtitle: 'Realiza cálculos matemáticos directos entre columnas en tiempo de ejecución sin alterar el disco.',
    estimatedMinutes: 5,
    analogy: 'Es como una calculadora que hace cuentas en el momento que te entregan el recibo de compra: la base de datos almacena el precio neto y las unidades, y en la pantalla te calcula de inmediato el subtotal multiplicado con impuestos.',
    video: {
      title: 'Operaciones aritméticas y columnas calculadas en SQL',
      channel: 'freeCodeCamp.org',
      duration: '9:15',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende a sumar, restar, multiplicar y dividir directamente en el SELECT para generar métricas financieras al vuelo.'
    },
    sections: [
      {
        title: 'Aritmética al Vuelo en la Proyección',
        explanation: 'En las bases de datos existe un principio de normalización clave: no debes almacenar datos que se puedan calcular a partir de otros (por ejemplo, no almacenes el valor del IVA si ya tienes el precio y la tasa).\n\nEn la lista `SELECT` puedes realizar operaciones aritméticas directas (`+`, `-`, `*`, `/`, `%`) combinando columnas con números constantes.',
        codeSnippet: `-- Calculando métricas de inventario y descuentos al vuelo
SELECT 
    nombre,
    precio,
    stock,
    precio * 0.90 AS precio_con_descuento_10,
    precio * stock AS valor_total_inventario
FROM productos;`,
        codeLanguage: 'sql',
        outputSnippet: `+-------------------+--------+-------+--------------------------+------------------------+
| nombre            | precio | stock | precio_con_descuento_10  | valor_total_inventario |
+-------------------+--------+-------+--------------------------+------------------------+
| Monitor 27 Pulg   | 280.00 |    14 |                   252.00 |                3920.00 |
| Teclado Mecánico  |  75.50 |    32 |                    67.95 |                2416.00 |
+-------------------+--------+-------+--------------------------+------------------------+`,
        byteTip: 'Asigna siempre un alias con AS a cualquier columna calculada; de lo contrario el encabezado de la columna será la fórmula cruda (precio * stock).',
        pitfallTip: 'Si alguna de las columnas involucradas en una operación aritmética contiene un valor NULL, el resultado final del cálculo será automáticamente NULL.',
        keyPoints: [
          'Las columnas calculadas se resuelven en memoria durante la ejecución.',
          'No modifican los datos guardados físicamente en las tablas.',
          'Ahorran espacio en disco al evitar almacenar campos redundantes.'
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
    title: '10. Desafío de Punto Medio: Proyecciones Limpias y Reportes',
    subtitle: 'Consolidación de SELECT, FROM, alias con AS, calificación de campos y cálculos derivados.',
    estimatedMinutes: 6,
    analogy: 'Es como el primer informe oficial de ventas que le presentas al gerente de operaciones: no le das una sábana cruda de datos confusos, sino un reporte pulido, con encabezados claros y cifras calculadas listas para tomar decisiones.',
    video: {
      title: 'Creación de Reportes Ejecutivos con SQL Básico',
      channel: 'Alex The Analyst',
      duration: '12:00',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Proyecto práctico que integra alias de tablas y columnas, cálculos de margen de ganancia y formateo profesional.'
    },
    sections: [
      {
        title: 'Integración de Técnicas de Proyección',
        explanation: 'En este nivel consolidamos las técnicas de proyección para crear un reporte de auditoría de almacén:\n1. Calificación de tablas con alias cortos.\n2. Selección selectiva de atributos.\n3. Cálculo de márgenes de ganancia y stock proyectado.\n4. Renombrado con alias amigables.',
        codeSnippet: `-- Reporte de Auditoría de Inventario
SELECT 
    p.id AS codigo_articulo,
    p.nombre AS descripcion,
    p.precio AS precio_venta,
    p.costo AS costo_adquisicion,
    p.precio - p.costo AS ganancia_unitaria,
    (p.precio - p.costo) * p.stock AS beneficio_potencial_total
FROM inventario_productos AS p;`,
        codeLanguage: 'sql',
        outputSnippet: `+-----------------+------------------+--------------+-------------------+-------------------+--------------------------+
| codigo_articulo | descripcion      | precio_venta | costo_adquisicion | ganancia_unitaria | beneficio_potencial_total|
+-----------------+------------------+--------------+-------------------+-------------------+--------------------------+
|            1001 | Monitor 27 Pulg  |       280.00 |            190.00 |             90.00 |                  1260.00 |
|            1002 | Teclado Mecánico |        75.50 |             45.00 |             30.50 |                   976.00 |
+-----------------+------------------+--------------+-------------------+-------------------+--------------------------+`,
        byteTip: 'Un reporte SQL bien estructurado ahorra cientos de líneas de código en el backend y permite que la base de datos haga el trabajo pesado donde es más veloz.',
        pitfallTip: 'Revisa siempre que los tipos de datos de las columnas a restar o multiplicar sean compatibles para evitar errores de conversión.',
        keyPoints: [
          'La proyección limpia desacopla el esquema interno de la vista de negocio.',
          'Los alias proporcionan significado humano inmediato.',
          'Estás preparado para dominar funciones de texto y manipulación de nulos.'
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
    title: '11. Concatenación de Cadenas en SQL (|| y CONCAT)',
    subtitle: 'La concatenación permite unir cadenas de texto, columnas o literales en un solo campo resultante.',
    estimatedMinutes: 5,
    analogy: 'Concatenar en SQL es como unir el nombre y los dos apellidos de una persona para imprimir su gafete corporativo en un solo renglón continuo.',
    video: {
      title: 'Concatenar texto en SQL: Operador || vs función CONCAT()',
      channel: 'Programming with Mosh',
      duration: '8:20',
      url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
      summary: 'Aprende las diferencias de sintaxis entre motores: el operador estándar ANSI || en PostgreSQL/SQLite vs la función CONCAT() en MySQL.'
    },
    sections: [
      {
        title: 'Uniendo Textos en un Solo Atributo',
        explanation: 'En las bases de datos relacionales, los nombres y apellidos se guardan en columnas separadas (`nombre`, `apellido_paterno`). Sin embargo, en tus pantallas necesitas mostrar el nombre completo.\n\nPara unir cadenas, SQL ofrece dos vías según el motor:\n1. Operador Estándar ANSI `||` (Doble barra vertical): Soportado por PostgreSQL, SQLite y Oracle.\n2. Función `CONCAT(c1, c2, ...)`: Soportada universalmente por MySQL, SQL Server y PostgreSQL.',
        codeSnippet: `-- 1. Estándar ANSI (PostgreSQL, SQLite, Oracle):
SELECT nombre || ' ' || apellido AS nombre_completo 
FROM clientes;

-- 2. Función CONCAT (MySQL, Postgres):
SELECT CONCAT(nombre, ' (', pais, ')') AS cliente_con_pais 
FROM clientes;`,
        codeLanguage: 'sql',
        outputSnippet: `+-----------------------+
| nombre_completo       |
+-----------------------+
| Ada Lovelace          |
| Alan Turing           |
+-----------------------+`,
        byteTip: 'En MySQL, la función CONCAT_WS(separador, c1, c2, ...) agrega automáticamente el separador entre cada elemento e ignora los nulos.',
        pitfallTip: 'En el estándar ANSI con ||, si cualquiera de las columnas contiene NULL, el resultado completo se convierte en NULL (\'Hola \' || NULL da NULL). Usa COALESCE para evitarlo.',
        keyPoints: [
          '|| es el operador estándar ANSI para unir cadenas.',
          'CONCAT(a, b, c) es la función equivalente de amplia compatibilidad.',
          'Permite formatear nombres completos, direcciones y códigos compuestos.'
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
    subtitle: 'Transforma y analiza cadenas al vuelo durante la proyección para normalizar o validar su contenido.',
    estimatedMinutes: 5,
    analogy: 'Son como las funciones automáticas de una imprenta: recibir los textos en cualquier formato y pasar los títulos a mayúsculas solemnes, los correos a minúsculas limpias y medir la cantidad de letras para calcular el costo de la placa.',
    video: {
      title: 'Funciones de Cadena en SQL: UPPER, LOWER, LENGTH',
      channel: 'Deukion / SQL desde Cero',
      duration: '8:45',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre cómo normalizar datos desordenados con funciones de texto y cómo medir la longitud de cadenas.'
    },
    sections: [
      {
        title: 'Manipulación Escalar de Cadenas',
        explanation: 'Las funciones escalares operan sobre el valor de cada fila individual y devuelven un nuevo valor transformado:\n- `UPPER(texto)`: Convierte todos los caracteres a MAYÚSCULAS.\n- `LOWER(texto)`: Convierte todos los caracteres a minúsculas (ideal para normalizar correos).\n- `LENGTH(texto)` (o `LEN()` en SQL Server): Retorna el conteo exacto de caracteres de la cadena.',
        codeSnippet: `-- Normalizando datos de usuarios en la salida
SELECT 
    UPPER(nombre) AS nombre_mayusculas,
    LOWER(email) AS email_normalizado,
    LENGTH(password_hash) AS longitud_clave
FROM usuarios;`,
        codeLanguage: 'sql',
        outputSnippet: `+-------------------+--------------------+----------------+
| nombre_mayusculas | email_normalizado  | longitud_clave |
+-------------------+--------------------+----------------+
| ADA LOVELACE      | ada@pioneers.org   |             64 |
| ALAN TURING       | alan@bletchley.org |             64 |
+-------------------+--------------------+----------------+`,
        byteTip: 'Usa LOWER(email) tanto en el SELECT como en el WHERE para realizar búsquedas insensibles a mayúsculas en motores como PostgreSQL.',
        pitfallTip: 'LENGTH(NULL) devuelve NULL, no 0. Si una columna está vacía con valor nulo, LENGTH no reportará cero caracteres.',
        keyPoints: [
          'UPPER() y LOWER() normalizan la capitalización del texto.',
          'LENGTH() cuenta el número de caracteres.',
          'Las funciones escalares no alteran los datos almacenados en disco.'
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
    title: '13. Manejo de Nulos en Proyección con COALESCE',
    subtitle: 'COALESCE evalúa una lista de argumentos y devuelve el primer valor no nulo de izquierda a derecha.',
    estimatedMinutes: 5,
    analogy: '`COALESCE` es como un protocolo de comunicación de emergencia: "Intenta llamar a mi celular; si no contesto (NULL), llama a mi teléfono fijo; si tampoco contesto (NULL), llama al teléfono de mi oficina; y si nada funciona, deja el mensaje en recepción".',
    video: {
      title: 'La Función COALESCE en SQL: Reemplazo Seguro de Nulos',
      channel: 'Alex The Analyst',
      duration: '9:50',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende la función más importante para el manejo de valores nulos en SQL y cómo evitar que cálculos matemáticos arrojen NULL.'
    },
    sections: [
      {
        title: 'El Salvavidas Universal contra Nulos',
        explanation: 'En las tablas reales, muchos campos opcionales contienen `NULL` (teléfonos secundarios, descuentos, direcciones de entrega alternas).\n\nSi muestras `NULL` en una interfaz de usuario o reporte, se ve poco profesional o causa caídas en el código. La función estándar ANSI `COALESCE(arg1, arg2, ..., argN)` recorre los argumentos de izquierda a derecha y devuelve el PRIMER valor que no sea nulo.',
        codeSnippet: `-- Proporcionando un valor de reemplazo por defecto si el teléfono es nulo
SELECT 
    nombre,
    COALESCE(telefono, 'Sin registrar') AS telefono_contacto
FROM clientes;

-- Cascada de opciones de contacto:
SELECT 
    nombre,
    COALESCE(celular, tel_fijo, tel_oficina, 'No disponible') AS mejor_contacto
FROM proveedores;`,
        codeLanguage: 'sql',
        outputSnippet: `+---------------+--------------------+
| nombre        | telefono_contacto  |
+---------------+--------------------+
| Ada Lovelace  | +1 555-0199        |
| Alan Turing   | Sin registrar      |
+---------------+--------------------+`,
        byteTip: 'Usa COALESCE en cálculos matemáticos con campos opcionales: salario_base + COALESCE(comision, 0.0) evita que todo el salario se vuelva NULL si la comisión es nula.',
        pitfallTip: 'Todos los argumentos dentro de COALESCE deben ser de tipos de datos compatibles. Mezclar fechas con números puede causar errores de conversión de tipo.',
        keyPoints: [
          'COALESCE es un estándar ANSI universal soportado por todos los RDBMS.',
          'Devuelve el primer argumento no nulo de la lista.',
          'Si todos los argumentos son nulos, devuelve NULL.'
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
    title: '14. Reemplazo Condicional Básico con IFNULL / NVL',
    subtitle: 'Conoce las funciones propietarias de cada motor y por qué el estándar COALESCE es la opción superior.',
    estimatedMinutes: 5,
    analogy: '`IFNULL` o `NVL` son como los enchufes eléctricos propietarios de un país específico: funcionan de maravilla si vives allí, pero si viajas a otro país necesitas un adaptador universal (COALESCE).',
    video: {
      title: 'COALESCE vs IFNULL vs NVL en SQL: ¿Cuál usar?',
      channel: 'freeCodeCamp.org',
      duration: '7:40',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Comparativa de funciones de nulos entre PostgreSQL, MySQL, Oracle y SQL Server, y por qué aprender el estándar te hace un ingeniero más versátil.'
    },
    sections: [
      {
        title: 'Dialectos Propietarios de los Motores',
        explanation: 'Antes de que el estándar ANSI consolidara `COALESCE`, cada motor de base de datos inventó su propia función para sustituir nulos:\n- MySQL / SQLite: `IFNULL(campo, reemplazo)`\n- Oracle: `NVL(campo, reemplazo)`\n- SQL Server: `ISNULL(campo, reemplazo)`\n\nTodas aceptan exactamente 2 argumentos: si el primero es nulo, devuelven el segundo.',
        codeSnippet: `-- En MySQL / SQLite:
SELECT nombre, IFNULL(apodo, 'Sin apodo') AS nombre_social 
FROM usuarios;

-- La versión estándar y universal que funciona en TODOS los motores:
SELECT nombre, COALESCE(apodo, 'Sin apodo') AS nombre_social 
FROM usuarios;`,
        codeLanguage: 'sql',
        outputSnippet: `+---------------+---------------+
| nombre        | nombre_social |
+---------------+---------------+
| Ada Lovelace  | Condesa       |
| Alan Turing   | Sin apodo     |
+---------------+---------------+`,
        byteTip: 'Prefiere siempre COALESCE sobre IFNULL o NVL. Tu código será 100% portable si tu empresa decide migrar de MySQL a PostgreSQL.',
        pitfallTip: 'IFNULL solo acepta dos argumentos; COALESCE acepta una cantidad ilimitada de opciones en cascada.',
        keyPoints: [
          'IFNULL es específico de MySQL y SQLite.',
          'NVL es propio de Oracle; ISNULL es propio de SQL Server.',
          'COALESCE es la recomendación estándar de la industria.'
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
    subtitle: 'Proyecta valores fijos, banderas y etiquetas constantes para enriquecer los registros devueltos.',
    estimatedMinutes: 5,
    analogy: 'Es como estampar un sello oficial de "APROBADO 2026" en cada una de las páginas de un legajo de documentos: cada página tiene datos distintos, pero todas llevan el mismo sello constante idéntico.',
    video: {
      title: 'Valores literales y constantes en consultas SQL',
      channel: 'Programming with Mosh',
      duration: '6:30',
      url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
      summary: 'Descubre cómo inyectar columnas fijas en reportes y cómo usar constantes para probar consultas rápidas sin tablas (SELECT 1).'
    },
    sections: [
      {
        title: 'Inyectando Columnas Literales Fijas',
        explanation: 'En la lista `SELECT` no solo puedes pedir columnas que ya existan en la tabla física. Puedes escribir valores literales fijos (números, cadenas, booleanos) y el motor los repetirá idénticos para cada una de las filas devueltas.\n\nEsto es muy útil para añadir etiquetas de procedencia, años fiscales o banderas de estado en reportes.',
        codeSnippet: `-- Agregando columnas fijas constantes en la salida
SELECT 
    id,
    nombre,
    'CLIENTE_ACTIVO' AS estado_auditoria,
    2026 AS anio_fiscal,
    true AS sincronizado
FROM clientes;

-- Consulta de prueba rápida sin tabla (válido en Postgres, SQLite, MySQL):
SELECT 'El servidor SQL está operando al 100%' AS estado_servicio;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+--------------+------------------+-------------+--------------+
| id | nombre       | estado_auditoria | anio_fiscal | sincronizado |
+----+--------------+------------------+-------------+--------------+
|  1 | Ada Lovelace | CLIENTE_ACTIVO   |        2026 | true         |
|  2 | Alan Turing  | CLIENTE_ACTIVO   |        2026 | true         |
+----+--------------+------------------+-------------+--------------+`,
        byteTip: 'En Oracle para consultar literales sin tabla debes usar la tabla dummy dual: SELECT 1 FROM dual;. En Postgres, SQLite y MySQL basta con SELECT 1;.',
        pitfallTip: 'Recuerda que si el literal es texto, debe ir entre comillas simples (\'TEXTO\'). Si olvidas las comillas, el motor pensará que es el nombre de una columna que no existe.',
        keyPoints: [
          'Los valores literales se proyectan idénticos en cada fila de la respuesta.',
          'Permiten enriquecer datos para integraciones de sistemas.',
          'Facilitan pruebas de conectividad de bases de datos.'
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
    title: '16. Restricción de Resultados con LIMIT / TOP / FETCH FIRST',
    subtitle: 'Limita la cantidad máxima de filas devueltas para mejorar el tiempo de respuesta y proteger el servidor.',
    estimatedMinutes: 5,
    analogy: '`LIMIT` es como la bandeja de entrada de tu correo electrónico: no te descarga los 50,000 correos que has recibido en tu vida de golpe en una sola pantalla gigante; te muestra únicamente los primeros 10 o 20 más recientes para que la app cargue al instante.',
    video: {
      title: 'LIMIT en SQL: Cómo restringir filas en MySQL, Postgres y SQL Server',
      channel: 'Alex The Analyst',
      duration: '8:50',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende la sintaxis de LIMIT en PostgreSQL/MySQL/SQLite, SELECT TOP en SQL Server y FETCH FIRST en ANSI SQL.'
    },
    sections: [
      {
        title: 'Controlando el Volumen de Filas Devueltas',
        explanation: 'Si una tabla contiene 5 millones de registros, ejecutar una consulta sin límite saturará la memoria del servidor y congelará tu aplicación web.\n\nPara limitar la cantidad de filas en la respuesta:\n- MySQL, PostgreSQL, SQLite: Cláusula `LIMIT n` al final de la consulta.\n- SQL Server: Palabra reservada `SELECT TOP n ...` al inicio.\n- ANSI SQL / Oracle 12c+: `FETCH FIRST n ROWS ONLY`.',
        codeSnippet: `-- En PostgreSQL, SQLite y MySQL: Obtener los primeros 3 productos
SELECT id, nombre, precio 
FROM productos 
LIMIT 3;

-- En SQL Server (sintaxis al inicio):
-- SELECT TOP 3 id, nombre, precio FROM productos;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+-------------------+--------+
| id | nombre            | precio |
+----+-------------------+--------+
|  1 | Monitor 27 Pulg   | 280.00 |
|  2 | Teclado Mecánico  |  75.50 |
|  3 | Mouse Óptico Pro  |  42.00 |
+----+-------------------+--------+`,
        byteTip: 'Un LIMIT sin un ORDER BY devuelve filas no deterministas: el motor entrega las primeras que encuentre físicamente en disco en ese instante.',
        pitfallTip: 'No uses LIMIT para intentar omitir filas intermedias; LIMIT solo define el techo máximo de registros devueltos. Para saltar filas debes combinarlo con OFFSET.',
        keyPoints: [
          'LIMIT n restringe la salida a un máximo de n filas.',
          'Previene caídas por sobrecarga de memoria en el servidor.',
          'Es el primer pilar para la paginación de datos en aplicaciones web.'
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
    title: '17. Paginación Básica con OFFSET y LIMIT',
    subtitle: 'Navega por lotes de datos dividiendo millones de registros en páginas manejables.',
    estimatedMinutes: 5,
    analogy: 'Es como pasar las páginas de un libro: cada página tiene exactamente 10 párrafos (LIMIT 10). Para leer la página 1 no te saltas nada (OFFSET 0); para leer la página 2 te saltas los primeros 10 párrafos (OFFSET 10); para la página 3 te saltas 20 (OFFSET 20).',
    video: {
      title: 'Paginación con LIMIT y OFFSET en SQL: Guía Completa',
      channel: 'freeCodeCamp.org',
      duration: '10:20',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre la fórmula matemática para calcular el OFFSET según el número de página y cómo paginar datos en APIs REST.'
    },
    sections: [
      {
        title: 'Navegación por Páginas en Bases de Datos',
        explanation: 'La cláusula `OFFSET n` le indica al motor de base de datos cuántas filas debe saltarse (omitir) antes de empezar a recopilar los resultados delimitados por `LIMIT`.\n\nFórmula matemática universal de paginación:\n`OFFSET = (numero_pagina - 1) * tamano_pagina`\n\nEjemplo con páginas de 5 elementos:\n- Página 1: `LIMIT 5 OFFSET 0` (filas 1 a 5)\n- Página 2: `LIMIT 5 OFFSET 5` (filas 6 a 10)\n- Página 3: `LIMIT 5 OFFSET 10` (filas 11 a 15)',
        codeSnippet: `-- Página 1 del catálogo (1 a 2 productos):
SELECT id, nombre, precio 
FROM productos 
LIMIT 2 OFFSET 0;

-- Página 2 del catálogo (siguientes 2 productos):
SELECT id, nombre, precio 
FROM productos 
LIMIT 2 OFFSET 2;`,
        codeLanguage: 'sql',
        outputSnippet: `-- Resultado de la Página 2:
+----+-------------------+--------+
| id | nombre            | precio |
+----+-------------------+--------+
|  3 | Mouse Óptico Pro  |  42.00 |
|  4 | Auriculares USB   |  65.00 |
+----+-------------------+--------+`,
        byteTip: 'Para tablas masivas con millones de registros, un OFFSET gigante (ej: OFFSET 5000000) puede volverse lento. En apps de alta escala se utiliza Keyset Pagination (WHERE id > ultimo_id LIMIT 10).',
        pitfallTip: 'La paginación con LIMIT y OFFSET exige siempre un orden determinista con ORDER BY id; de lo contrario las filas cambiarán de posición entre páginas.',
        keyPoints: [
          'OFFSET salta las primeras n filas antes de empezar a leer.',
          'LIMIT define el tamaño de la página.',
          'Es el estándar universal para paginar resultados en sitios de comercio electrónico.'
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
    title: '18. Buenas Prácticas de Rendimiento: Evitar SELECT * en Producción',
    subtitle: 'Comprende el impacto sistémico del sobreconsumo de columnas (Overfetching) y la arquitectura de índices.',
    estimatedMinutes: 5,
    analogy: 'Es como pedirle a una mudanza que traslade una caja fuerte cerrada de 500 kg solo para sacar un lápiz que estaba adentro: mueves una tonelada de peso innecesario cuando podías llevar el lápiz en la bolsa de tu camisa.',
    video: {
      title: 'Optimización de Consultas SQL: El costo oculto de SELECT *',
      channel: 'Alex The Analyst / Advanced SQL',
      duration: '9:30',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Análisis con EXPLAIN ANALYZE que demuestra la diferencia de tiempo de ejecución entre proyectar columnas indexadas vs SELECT *.'
    },
    sections: [
      {
        title: 'El Costo Oculto del Asterisco en Sistemas Empresariales',
        explanation: 'En las aplicaciones de escala empresarial con millones de transacciones por segundo, cada byte transferido por la red cuesta dinero y latencia.\n\nConsecuencias negativas de `SELECT *`:\n1. Sobrecarga en la memoria del servidor de base de datos para construir la tupla completa.\n2. Saturación del ancho de banda de red entre la base de datos y los servidores de API backend.\n3. Desperdicio de memoria en el servidor Node.js/Kotlin para parsear campos que jamás se enviarán al cliente.',
        codeSnippet: `-- ❌ Ineficiente: lee todas las columnas y descarta el uso del índice
SELECT * FROM transacciones WHERE usuario_id = 942;

-- ✅ Altamente optimizado: el motor resuelve la consulta en memoria RAM
SELECT id, monto, fecha, estado 
FROM transacciones 
WHERE usuario_id = 942;`,
        codeLanguage: 'sql',
        outputSnippet: `+---------+--------+------------+-----------+
| id      | monto  | fecha      | estado    |
+---------+--------+------------+-----------+
| 8594201 | 120.50 | 2026-10-14 | APROBADO  |
+---------+--------+------------+-----------+`,
        byteTip: 'Usa el comando EXPLAIN o EXPLAIN ANALYZE antes de tu consulta para ver si el motor está usando un Index Scan rápido o un costoso Table Scan secuencial.',
        pitfallTip: 'Muchas bibliotecas ORM generan SELECT * por defecto. Asegúrate de configurar proyecciones selectivas (.select("id", "nombre")) en tus repositorios de código.',
        keyPoints: [
          'Proyectar solo las columnas necesarias ahorra ancho de banda y memoria RAM.',
          'Permite al motor aprovechar índices de cobertura (Covering Indexes).',
          'Es una regla obligatoria en cualquier auditoría de rendimiento SQL.'
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
    subtitle: 'Documentar la intención, reglas fiscales y autoría de consultas complejas sin afectar su ejecución.',
    estimatedMinutes: 5,
    analogy: 'Los comentarios en SQL son como las notas al pie de página en un balance contable: le explican al auditor por qué se aplicó cierta tasa de amortización sin alterar los números del balance.',
    video: {
      title: 'Comentarios y Buenas Prácticas de Documentación en SQL',
      channel: 'Deukion / SQL desde Cero',
      duration: '6:15',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende a usar comentarios de una sola línea (--) y multilínea (/* */) para explicar lógica compleja de reportería.'
    },
    sections: [
      {
        title: 'Documentación en el Archivo SQL',
        explanation: 'Las consultas SQL complejas de reportería o migración pueden tener cientos de líneas. Para explicar el motivo de ciertas reglas de negocio a tus compañeros de equipo, SQL soporta comentarios que el motor ignora por completo durante el análisis léxico:\n- Comentario de una línea (`--`): Inicia con dos guiones consecutivos y abarca hasta el final del renglón.\n- Comentario multilínea (`/* ... */`): Envuelve bloques enteros de texto entre `/*` y `*/`.',
        codeSnippet: `-- Consulta oficial para el informe de cierre fiscal mensual
-- Autor: Ada Lovelace
-- Revisión: Octubre 2026

SELECT 
    id,
    nombre,
    /* Aplicando exención de impuesto del 5% según artículo 42 */
    precio * 0.95 AS precio_exento
FROM productos; -- Fin de consulta`,
        codeLanguage: 'sql',
        outputSnippet: `+----+-------------------+---------------+
| id | nombre            | precio_exento |
+----+-------------------+---------------+
|  1 | Monitor 27 Pulg   |        266.00 |
+----+-------------------+---------------+`,
        byteTip: 'Usa comentarios para desactivar temporalmente filtros en el WHERE durante sesiones de depuración: -- WHERE estado = \'activo\'.',
        pitfallTip: 'Asegúrate de dejar un espacio después de los dos guiones (-- comentario) en SQLite y MySQL; algunos motores no reconocen el comentario si el texto está pegado sin espacio.',
        keyPoints: [
          '-- se usa para aclaraciones de una sola línea.',
          '/* ... */ delimita comentarios de múltiples líneas.',
          'El motor descarta los comentarios antes de compilar y optimizar la consulta.'
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
    title: '20. Desafío Maestro de Unidad: Generador de Vistas y Catálogos',
    subtitle: 'Integración total de SELECT, FROM, alias con AS, funciones de texto, reemplazo de nulos con COALESCE y paginación.',
    estimatedMinutes: 6,
    analogy: 'Este desafío final es como construir la vitrina digital de una tienda de comercio electrónico de clase mundial: une la calificación de tablas, cálculos de impuestos, formateo de nombres y paginación rápida en una sola consulta maestra.',
    video: {
      title: 'Proyecto SQL: Catálogo Oficial de Productos Paginado',
      channel: 'freeCodeCamp.org / SQL Masterclass',
      duration: '14:30',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Construcción paso a paso de una consulta maestra que integra todas las técnicas de proyección aprendidas en la Unidad 2.'
    },
    sections: [
      {
        title: 'Arquitectura de la Consulta Maestra de Catálogo',
        explanation: 'En este nivel cumbre de la Unidad 2 construimos la consulta del catálogo oficial de productos de una tienda en línea que integra:\n1. Calificación de tablas con alias cortos (`p.columna`).\n2. Normalización de descripciones en mayúsculas (`UPPER`).\n3. Cálculo dinámico de precio con IVA (`precio * 1.16`).\n4. Sustitución de valores nulos con `COALESCE` para la garantía.\n5. Columnas constantes de estado.\n6. Paginación profesional con `LIMIT` y `OFFSET`.',
        codeSnippet: `-- Consulta Maestra de Catálogo de Productos
SELECT 
    p.id AS codigo_articulo,
    UPPER(p.nombre) AS descripcion_producto,
    p.precio AS precio_base,
    p.precio * 1.16 AS precio_final_con_iva,
    COALESCE(p.garantia_meses, 12) AS meses_garantia,
    'EN_CATALOGO' AS estado_disponibilidad
FROM inventario_productos AS p
LIMIT 3 OFFSET 0;`,
        codeLanguage: 'sql',
        outputSnippet: `+-----------------+-----------------------+-------------+----------------------+----------------+-----------------------+
| codigo_articulo | descripcion_producto  | precio_base | precio_final_con_iva | meses_garantia | estado_disponibilidad |
+-----------------+-----------------------+-------------+----------------------+----------------+-----------------------+
|               1 | MONITOR 27 PULG       |      280.00 |               324.80 |             24 | EN_CATALOGO           |
|               2 | TECLADO MECÁNICO      |       75.50 |                87.58 |             12 | EN_CATALOGO           |
|               3 | MOUSE ÓPTICO PRO      |       42.00 |                48.72 |             12 | EN_CATALOGO           |
+-----------------+-----------------------+-------------+----------------------+----------------+-----------------------+`,
        byteTip: '¡Felicitaciones extraordinarias! Ya dominas la proyección en SQL a nivel profesional: sabes cómo solicitar exactamente los datos que necesitas con máximo rendimiento.',
        pitfallTip: 'Al generar catálogos paginados, asegúrate de acordar con tu equipo frontend los nombres exactos de los alias (AS) para que coincidan con los modelos TypeScript.',
        keyPoints: [
          'Dominas la anatomía completa de las sentencias SELECT y FROM.',
          'Sabes manipular nulos con COALESCE y formatear texto con UPPER/LOWER.',
          'Estás 100% listo para conquistar la Unidad 3: Filtrado Avanzado con WHERE.'
        ]
      }
    ]
  }
};
