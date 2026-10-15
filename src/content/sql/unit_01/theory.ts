import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_01_THEORY: Record<string, TheoryLesson> = {
  'sql-u01-l01': {
    id: 'sql-th-u01-l01',
    lessonId: 'sql-u01-l01',
    pathId: 'sql',
    unitId: 1,
    levelId: 1,
    title: '1. ¿Qué es una Base de Datos y un RDBMS?',
    subtitle: 'El motor detrás del almacenamiento masivo, persistente, estructurado y transaccional del mundo.',
    estimatedMinutes: 5,
    analogy: 'Una base de datos relacional es como el archivo central de un banco con cajas de seguridad interconectadas: a diferencia de un montón de papeles desordenados en un cajón (archivos de texto), aquí cada expediente tiene un casillero numerado, reglas de acceso blindadas y guardias que garantizan que el dinero jamás desaparezca ni se duplique por error.',
    video: {
      title: 'Bases de Datos Relacionales y SQL Explicados desde Cero',
      channel: 'freeCodeCamp.org / Alex The Analyst',
      duration: '12:40',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre qué es un RDBMS, la diferencia entre guardar datos en Excel vs PostgreSQL/MySQL y por qué SQL es el lenguaje más demandado en datos.'
    },
    sections: [
      {
        title: 'De Archivos Sueltos a Sistemas Relacionales',
        explanation: 'En los albores de la computación, las aplicaciones guardaban su información en archivos de texto plano o binarios (`.txt`, `.csv`). Si dos usuarios intentaban guardar datos a la vez, el archivo se corrompía y la información se perdía.\n\nPara solucionar esto nació el Modelo Relacional (creado por Edgar F. Codd en IBM) y los RDBMS (Relational Database Management Systems):\n- PostgreSQL, MySQL, SQLite, Oracle y SQL Server.\n\nSQL (Structured Query Language) es el lenguaje estándar internacional (ANSI/ISO) para comunicarnos con estos motores. A diferencia de lenguajes imperativos como Kotlin o Python donde le dices a la computadora el "CÓMO" paso por paso, SQL es DECLARATIVO: tú defines QUÉ datos necesitas, y el optimizador interno del motor calcula la ruta matemática más rápida para entregártelos.',
        codeSnippet: `-- En SQL defines qué quieres obtener, no cómo recorrer el disco
SELECT version();

-- Consultando la fecha y hora del servidor
SELECT CURRENT_TIMESTAMP;`,
        codeLanguage: 'sql',
        outputSnippet: `+------------------------------------------------------------+
| version()                                                  |
+------------------------------------------------------------+
| PostgreSQL 16.2 on x86_64-pc-linux-gnu, 64-bit             |
+------------------------------------------------------------+`,
        byteTip: 'SQLite es el motor RDBMS más desplegado del planeta: reside de forma embebida dentro de cada teléfono Android, iPhone, navegador Google Chrome y consola de videojuegos.',
        pitfallTip: 'No confundas SQL con una base de datos específica. SQL es el lenguaje universal; PostgreSQL, MySQL o SQLite son los programas servidores que lo interpretan.',
        keyPoints: [
          'Un RDBMS administra datos garantizando integridad, concurrencia y seguridad.',
          'SQL es un lenguaje declarativo estándar: tú pides el resultado, el motor optimiza la búsqueda.',
          'Garantiza propiedades ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad).'
        ]
      }
    ]
  },
  'sql-u01-l02': {
    id: 'sql-th-u01-l02',
    lessonId: 'sql-u01-l02',
    pathId: 'sql',
    unitId: 1,
    levelId: 2,
    title: '2. Tablas, Filas (Registros) y Columnas (Atributos)',
    subtitle: 'La cuadrícula bidimensional que estructura la información de entidades del mundo real.',
    estimatedMinutes: 5,
    analogy: 'Una tabla es como una hoja de cálculo perfectamente diseñada: las columnas verticales son las preguntas fijas del formulario ("Nombre", "Email", "Edad") y las filas horizontales son las respuestas de cada persona individual que completó el formulario.',
    video: {
      title: 'Estructura de una Tabla en SQL: Filas vs Columnas',
      channel: 'Programming with Mosh',
      duration: '8:25',
      url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
      summary: 'Aprende los conceptos fundamentales de tablas, registros (tuplas), atributos (campos) y cómo mapear objetos de la vida real a esquemas SQL.'
    },
    sections: [
      {
        title: 'Anatomía de una Tabla Relacional',
        explanation: 'En las bases de datos relacionales, la información se organiza en Tablas (formalmente llamadas *Relaciones* o *Entidades*).\n\nComponentes estructurales:\n1. Columnas (Campos / Atributos): Son verticales y representan las características que describe la entidad (ejemplo: `id`, `nombre`, `precio`, `creado_en`). La lista de columnas se diseña al crear la tabla y es fija.\n2. Filas (Registros / Tuplas): Son horizontales y representan cada elemento concreto del mundo real almacenado en el sistema. Las filas crecen dinámicamente con cada nuevo usuario o pedido.\n3. Celda (Campo de dato): El cruce exacto entre una fila y una columna.',
        codeSnippet: `-- Esquema visual conceptual de la tabla "usuarios"
-- [id]  | [nombre]        | [email]              | [activo]
-- ------+-----------------+----------------------+----------
--  1    | "Ada Lovelace"  | "ada@pioneers.org"   | true
--  2    | "Alan Turing"   | "alan@bletchley.org" | true
--  3    | "Grace Hopper"  | "grace@navy.mil"     | false

SELECT id, nombre, email FROM usuarios;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+---------------+----------------------+
| id | nombre        | email                |
+----+---------------+----------------------+
|  1 | Ada Lovelace  | ada@pioneers.org     |
|  2 | Alan Turing   | alan@bletchley.org   |
|  3 | Grace Hopper  | grace@navy.mil       |
+----+---------------+----------------------+`,
        byteTip: 'En el diseño profesional de software, los nombres de tablas se escriben en minúsculas y en plural (usuarios, productos, facturas), y los nombres de columnas en singular snake_case (fecha_registro, precio_total).',
        pitfallTip: 'No intentes guardar múltiples valores en una sola celda separados por comas (ejemplo: telefono = "555-1234, 555-5678"). Esto viola la Primera Forma Normal (1NF) y hace imposible hacer búsquedas indexadas.',
        keyPoints: [
          'Las columnas definen el esquema fijo (nombre y tipo de dato).',
          'Las filas son los registros individuales concretos que se insertan y borran.',
          'Cada intersección fila/columna debe contener un valor atómico (indivisible).'
        ]
      }
    ]
  },
  'sql-u01-l03': {
    id: 'kt-th-u01-l03',
    lessonId: 'sql-u01-l03',
    pathId: 'sql',
    unitId: 1,
    levelId: 3,
    title: '3. Tipos de Datos en Bases de Datos SQL',
    subtitle: 'INTEGER, TEXT/VARCHAR, REAL/DECIMAL, DATE y BOOLEAN: orden y tipado estricto en cada columna.',
    estimatedMinutes: 5,
    analogy: 'Los tipos de datos son como los moldes de una fábrica de juguetes: si una ranura tiene forma de moneda circular (INTEGER), no puedes meter un lápiz cuadrado (TEXT) a la fuerza; el sistema lo rechaza antes de romper el molde.',
    video: {
      title: 'Tipos de Datos en SQL: INTEGER, VARCHAR, DECIMAL y Fechas',
      channel: 'Deukion / SQL desde Cero',
      duration: '10:15',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre los tipos de datos principales en SQL, por qué VARCHAR(100) ahorra espacio y cuándo usar DECIMAL para evitar errores de redondeo en dinero.'
    },
    sections: [
      {
        title: 'Rigidez de Formato para Garantizar la Integridad',
        explanation: 'En una hoja de Excel puedes escribir un número en la celda A1 y un poema en la A2. En SQL esto es IMPOSIBLE por diseño. Cada columna tiene un tipo de dato inamovible:\n\n1. `INTEGER` / `INT`: Números enteros sin decimales (`1`, `42`, `-500`).\n2. `TEXT` / `VARCHAR(n)`: Cadenas alfanuméricas de texto delimitadas estrictamente por comillas simples (`\'Ada\'`).\n3. `REAL` / `DECIMAL(p, s)`: Números fraccionales para precios, porcentajes y coordenadas geográficas.\n4. `DATE` / `TIMESTAMP`: Fechas en formato estándar internacional ISO 8601 (`\'YYYY-MM-DD\'`).\n5. `BOOLEAN`: Banderas lógicas de `TRUE` o `FALSE`.',
        codeSnippet: `-- Creación de una tabla tipada profesionalmente
CREATE TABLE empleados (
    id INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    salario DECIMAL(10, 2) NOT NULL,
    fecha_ingreso DATE NOT NULL,
    activo BOOLEAN DEFAULT true
);`,
        codeLanguage: 'sql',
        outputSnippet: `Query OK, 0 rows affected (0.02 sec)
Tabla 'empleados' creada con tipos estrictos.`,
        byteTip: 'En SQL estándar, las cadenas de texto y las fechas se escriben SIEMPRE entre comillas simples (\'texto\', \'2026-10-14\'). Las comillas dobles están reservadas en motores como Postgres para nombres de columnas especiales.',
        pitfallTip: 'Guardar números como texto (por ejemplo teléfono o precio como VARCHAR) impedirá usar funciones matemáticas como SUM() y causará que "100" se ordene antes que "20" en orden alfabético.',
        keyPoints: [
          'El tipo de dato de una columna es inviolable y previene datos corruptos.',
          'DECIMAL(10, 2) es el estándar indiscutible para dinero y transacciones bancarias.',
          'Las fechas siempre se escriben en formato estándar ISO \'YYYY-MM-DD\'.'
        ]
      }
    ]
  },
  'sql-u01-l04': {
    id: 'sql-th-u01-l04',
    lessonId: 'sql-u01-l04',
    pathId: 'sql',
    unitId: 1,
    levelId: 4,
    title: '4. Claves Primarias (PRIMARY KEY) y Unicidad',
    subtitle: 'El identificador único e irrepetible que distingue cada registro del universo relacional.',
    estimatedMinutes: 5,
    analogy: 'La Clave Primaria es como el número de pasaporte o tu documento de identidad nacional: pueden existir diez personas en tu ciudad con el mismo nombre y apellido exactos, pero tu número de identificación es único en el planeta y te identifica sin confusión.',
    video: {
      title: 'Primary Keys en SQL: Claves Primarias y AUTOINCREMENT',
      channel: 'Alex The Analyst / SQL Series',
      duration: '9:00',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Comprende qué es una PRIMARY KEY, cómo el motor crea un índice B-Tree automático para búsquedas instantáneas y cómo funciona AUTOINCREMENT.'
    },
    sections: [
      {
        title: 'El Cimiento de la Identidad en Bases de Datos',
        explanation: 'En el mundo real los datos son ambiguos: dos clientes pueden llamarse "Carlos Soto" y haber nacido el mismo día. Si no existiera una clave primaria, sería imposible saber a cuál de los dos cobrarle una factura o cancelarle una cuenta.\n\nUna Clave Primaria (`PRIMARY KEY`) impone dos restricciones absolutas:\n1. Unicidad (`UNIQUE`): No pueden existir dos filas con el mismo valor en esa columna.\n2. No nulidad (`NOT NULL`): Ninguna fila puede tener esa columna vacía o nula.\n\nHabitualmente se utiliza un identificador numérico secuencial automático (`AUTOINCREMENT` o `SERIAL`).',
        codeSnippet: `-- Tabla con clave primaria autoincremental
CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

-- Al insertar, el motor asigna automáticamente id = 1, id = 2...
INSERT INTO clientes (nombre, email) VALUES ('Carlos Soto', 'carlos@empresa.com');
INSERT INTO clientes (nombre, email) VALUES ('Carlos Soto', 'carlos.soto@gmail.com');

SELECT * FROM clientes;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+-------------+-----------------------+
| id | nombre      | email                 |
+----+-------------+-----------------------+
|  1 | Carlos Soto | carlos@empresa.com    |
|  2 | Carlos Soto | carlos.soto@gmail.com |
+----+-------------+-----------------------+`,
        byteTip: 'El motor RDBMS genera automáticamente un índice de tipo B-Tree sobre la columna PRIMARY KEY. Gracias a esto, buscar SELECT * FROM clientes WHERE id = 58249 toma menos de 1 milisegundo en millones de filas.',
        pitfallTip: 'Nunca uses datos cambiantes como clave primaria (por ejemplo el número de teléfono o la placa de un auto). Si el usuario cambia de número, romperías todas las relaciones de compras asociadas a él.',
        keyPoints: [
          'La PRIMARY KEY identifica de forma única e indiscutible cada fila.',
          'Nunca puede contener valores repetidos ni valores NULL.',
          'Es el puente para conectar tablas mediante Claves Foráneas (FOREIGN KEY).'
        ]
      }
    ]
  },
  'sql-u01-l05': {
    id: 'sql-th-u01-l05',
    lessonId: 'sql-u01-l05',
    pathId: 'sql',
    unitId: 1,
    levelId: 5,
    title: '5. La Instrucción Fundamental: SELECT * FROM',
    subtitle: 'Cómo solicitar a la base de datos que proyecte todas las columnas de una tabla.',
    estimatedMinutes: 5,
    analogy: '`SELECT * FROM` es como pedirle al mesero del restaurante: "Tráigame la carta completa con todos los platillos, descripciones y precios". Te entrega toda la información disponible sin filtrar.',
    video: {
      title: 'SELECT * FROM en SQL: Tu primera consulta a una base de datos',
      channel: 'Programming with Mosh',
      duration: '7:40',
      url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
      summary: 'Aprende a ejecutar tu primer SELECT, qué significa el asterisco comodín y cómo interpretar la cuadrícula de resultados devuelta por el motor.'
    },
    sections: [
      {
        title: 'Consultando la Totalidad de una Tabla',
        explanation: 'La instrucción más elemental para leer información en SQL combina dos cláusulas obligatorias:\n- `SELECT`: Especifica qué columnas quieres ver en el reporte de salida.\n- `*` (asterisco): Comodín que significa "todas las columnas del esquema en su orden original".\n- `FROM`: Especifica el nombre de la tabla de donde se extraerán los datos.\n\nPor convención, las palabras reservadas de SQL se escriben en MAYÚSCULAS y los nombres de tablas y columnas en minúsculas.',
        codeSnippet: `-- Consultando todos los datos de la tabla de productos
SELECT * FROM productos;

-- Consultando todos los países de la tabla de destinos
SELECT * FROM destinos;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+-------------------+--------+------------+
| id | nombre            | precio | stock      |
+----+-------------------+--------+------------+
|  1 | Monitor 27 Pulg   | 280.00 |         14 |
|  2 | Teclado Mecánico  |  75.50 |         32 |
|  3 | Mouse Óptico Pro  |  42.00 |         60 |
+----+-------------------+--------+------------+`,
        byteTip: 'SELECT * es excelente para explorar datos en tu entorno local. Sin embargo, en aplicaciones de producción con tablas de 50 columnas y millones de usuarios, transferirá gigabytes innecesarios de red.',
        pitfallTip: 'No olvides terminar tus instrucciones SQL con punto y coma (;). En muchos clientes de consola y scripts por lotes, la consulta no se ejecuta hasta que ingresas el punto y coma.',
        keyPoints: [
          'Toda consulta de lectura inicia con la cláusula SELECT.',
          'El asterisco * selecciona todas las columnas del esquema.',
          'FROM indica la tabla de origen de los datos.'
        ]
      }
    ]
  },
  'sql-u01-l06': {
    id: 'sql-th-u01-l06',
    lessonId: 'sql-u01-l06',
    pathId: 'sql',
    unitId: 1,
    levelId: 6,
    title: '6. Proyección Específica: SELECT columna FROM',
    subtitle: 'Optimización de red y memoria extrayendo solo el atributo que tu aplicación necesita.',
    estimatedMinutes: 5,
    analogy: 'Si vas al médico solo a revisar tu presión arterial, el doctor no te hace radiografías completas, resonancias y análisis genéticos; te toma únicamente la presión. Proyectar una sola columna ahorra tiempo y recursos a todos.',
    video: {
      title: 'Proyección de Columnas Específicas en SQL vs SELECT *',
      channel: 'freeCodeCamp.org',
      duration: '8:50',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre el concepto formal de proyección en el álgebra relacional y por qué pedir columnas específicas acelera las APIs hasta 10 veces.'
    },
    sections: [
      {
        title: 'Proyectando un Solo Atributo Requerido',
        explanation: 'En lugar de pedir `SELECT *` y descargar columnas pesadas (como descripciones largas, imágenes blob o contraseñas encriptadas) que tu pantalla no va a mostrar, debes nombrar expresamente la columna que te interesa.\n\nEn álgebra relacional, esta operación se llama Proyección: tomar una tabla bidimensional y recortar una franja vertical específica.',
        codeSnippet: `-- En lugar de SELECT * FROM usuarios, pide solo la columna requerida:
SELECT email FROM usuarios;

-- Obteniendo solo el nombre de los productos
SELECT nombre FROM productos;`,
        codeLanguage: 'sql',
        outputSnippet: `+----------------------+
| email                |
+----------------------+
| ada@pioneers.org     |
| alan@bletchley.org   |
| grace@navy.mil       |
+----------------------+`,
        byteTip: 'Al pedir solo las columnas indexadas, el motor SQL puede resolver la consulta directamente desde el índice en memoria RAM sin necesidad de leer el disco duro (Covering Index).',
        pitfallTip: 'Los nombres de columna no llevan comillas. Si escribes SELECT \'email\' FROM usuarios (con comillas simples), el motor imprimirá la palabra literal "email" en cada fila en lugar del dato guardado.',
        keyPoints: [
          'Proyectar solo las columnas necesarias reduce consumo de RAM y ancho de banda.',
          'El resultado conserva el número total de filas de la tabla original.',
          'Los identificadores de columna se escriben sin comillas.'
        ]
      }
    ]
  },
  'sql-u01-l07': {
    id: 'sql-th-u01-l07',
    lessonId: 'sql-u01-l07',
    pathId: 'sql',
    unitId: 1,
    levelId: 7,
    title: '7. Proyección de Múltiples Columnas',
    subtitle: 'Separación por comas, selección selectiva y reordenamiento de campos a tu gusto.',
    estimatedMinutes: 5,
    analogy: 'Es como armar un paquete personalizado en un restaurante de autoservicio: señalas con el dedo exactamente los tres platillos que quieres en tu charola y el mesero los coloca en el orden en que tú los pediste.',
    video: {
      title: 'Selección de múltiples columnas en SQL y sintaxis de comas',
      channel: 'Deukion / SQL desde Cero',
      duration: '7:15',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende a solicitar múltiples atributos ordenados por comas y cómo el motor respeta el orden de proyección solicitado.'
    },
    sections: [
      {
        title: 'Separación Estricta por Comas',
        explanation: 'Para consultar dos o más columnas específicas, simplemente sepáralas con una coma `,` en el orden exacto en que deseas que aparezcan en el reporte.\n\nRegla de sintaxis crítica:\nLa última columna antes de la palabra `FROM` NUNCA debe llevar coma. Si dejas una coma colgando al final, el analizador sintáctico de SQL arrojará un error de sintaxis.',
        codeSnippet: `-- Solicitando 3 columnas en un orden personalizado:
SELECT id, nombre, precio 
FROM productos;

-- Puedes pedir las columnas en un orden distinto al de la tabla original:
SELECT precio, nombre, id 
FROM productos;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+-------------------+--------+
| id | nombre            | precio |
+----+-------------------+--------+
|  1 | Monitor 27 Pulg   | 280.00 |
|  2 | Teclado Mecánico  |  75.50 |
|  3 | Mouse Óptico Pro  |  42.00 |
+----+-------------------+--------+`,
        byteTip: 'Acostumbra formatear tus consultas largas colocando cada columna en su propia línea con sangría para facilitar la lectura en Git y revisiones de código.',
        pitfallTip: 'El error de novato más común es poner una coma después de la última columna: "SELECT id, nombre, FROM productos;". Causará: Syntax error near FROM.',
        keyPoints: [
          'Las comas separan las columnas a proyectar.',
          'El orden en el SELECT define el orden de izquierda a derecha en el resultado.',
          'La última columna antes del FROM jamás lleva coma.'
        ]
      }
    ]
  },
  'sql-u01-l08': {
    id: 'sql-th-u01-l08',
    lessonId: 'sql-u01-l08',
    pathId: 'sql',
    unitId: 1,
    levelId: 8,
    title: '8. Alias de Columnas con AS',
    subtitle: 'Renombrar columnas de salida para que tu frontend y reportes sean inmediatamente comprensibles.',
    estimatedMinutes: 5,
    analogy: 'Un alias es como un apodo o una etiqueta adhesiva nueva sobre un frasco viejo: el frasco en el almacén sigue teniendo su etiqueta de fábrica, pero en tu mesa lo rotulas como "Azúcar" para que toda tu familia sepa qué es.',
    video: {
      title: 'Uso de la palabra clave AS y Alias en SQL',
      channel: 'Alex The Analyst',
      duration: '6:50',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende a renombrar columnas calculadas y atributos con AS para entregar JSONs impecables a tus aplicaciones frontend.'
    },
    sections: [
      {
        title: 'Nombres Amigables en la Cabecera del Resultado',
        explanation: 'En muchas bases de datos reales, las columnas tienen nombres abreviados o técnicos difíciles de leer (como `usr_fnm_txt`, `prd_prc_usd`). Con la palabra reservada `AS`, puedes bautizar temporalmente a la columna con un Alias para el reporte de salida.\n\nEl alias es puramente cosmético para el resultado devuelto; NO altera el nombre de la columna física en el disco duro.',
        codeSnippet: `-- Renombrando columnas con alias legibles
SELECT 
    nombre AS nombre_producto,
    precio AS precio_dolares,
    precio * 1.16 AS precio_con_iva
FROM productos;`,
        codeLanguage: 'sql',
        outputSnippet: `+-------------------+----------------+----------------+
| nombre_producto   | precio_dolares | precio_con_iva |
+-------------------+----------------+----------------+
| Monitor 27 Pulg   |         280.00 |         324.80 |
| Teclado Mecánico  |          75.50 |          87.58 |
| Mouse Óptico Pro  |          42.00 |          48.72 |
+-------------------+----------------+----------------+`,
        byteTip: 'En SQL la palabra AS es opcional (SELECT precio precio_dolares), pero escribir AS de forma explícita es la mejor práctica internacional para evitar confusiones.',
        pitfallTip: 'Si tu alias contiene espacios en blanco (ejemplo: AS "Precio Final"), debes envolverlo obligatoriamente en comillas dobles (" "). Pero en desarrollo se prefiere snake_case sin espacios: precio_final.',
        keyPoints: [
          'AS renombra una columna en la tabla de salida de la consulta.',
          'Es indispensable para nombrar resultados de cálculos aritméticos.',
          'No afecta los nombres reales del esquema en la base de datos.'
        ]
      }
    ]
  },
  'sql-u01-l09': {
    id: 'sql-th-u01-l09',
    lessonId: 'sql-u01-l09',
    pathId: 'sql',
    unitId: 1,
    levelId: 9,
    title: '9. Eliminación de Duplicados con DISTINCT',
    subtitle: 'Obtén conjuntos matemáticos de valores únicos colapsando filas idénticas.',
    estimatedMinutes: 5,
    analogy: 'Si le pides a una clase escolar de 30 niños que levanten la mano y digan en qué país nacieron, escucharás "Costa Rica" 25 veces. Con `DISTINCT`, es como pedir: "Que levante la mano un solo representante por cada país distinto".',
    video: {
      title: 'SELECT DISTINCT en SQL: Eliminando duplicados como un profesional',
      channel: 'Programming with Mosh',
      duration: '8:10',
      url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
      summary: 'Descubre cómo funciona DISTINCT en memoria, cuándo aplicarlo sobre una o varias columnas y su impacto en el rendimiento.'
    },
    sections: [
      {
        title: 'Filtrado de Valores Únicos en la Salida',
        explanation: 'En las tablas del mundo real, los datos se repiten constantemente: miles de usuarios pueden compartir la misma ciudad, categoría o estado civil. Si ejecutas `SELECT ciudad FROM clientes`, verás "Madrid" repetido 500 veces.\n\nAnteponiendo la palabra `DISTINCT` inmediatamente después de `SELECT`, el motor SQL ordena y colapsa los valores idénticos, entregando una lista depurada donde cada valor aparece una sola vez.',
        codeSnippet: `-- 1. Sin DISTINCT: devuelve 100 filas con ciudades repetidas
-- SELECT ciudad FROM clientes;

-- 2. Con DISTINCT: devuelve solo las ciudades únicas existentes
SELECT DISTINCT ciudad FROM clientes;

-- 3. DISTINCT sobre combinación de dos columnas
SELECT DISTINCT categoria, marca FROM productos;`,
        codeLanguage: 'sql',
        outputSnippet: `+---------------+
| ciudad        |
+---------------+
| San José      |
| Cartago       |
| Alajuela      |
| Heredia       |
+---------------+`,
        byteTip: 'DISTINCT opera sobre la COMBINACIÓN de todas las columnas proyectadas en el SELECT. Si pides SELECT DISTINCT ciudad, pais, colapsará solo las filas donde ambos atributos sean idénticos.',
        pitfallTip: 'DISTINCT exige que el motor ordene e inspeccione los datos en memoria para descartar duplicados. Usarlo sin necesidad sobre millones de filas puede ralentizar consultas innecesariamente.',
        keyPoints: [
          'DISTINCT se escribe inmediatamente después de la palabra SELECT.',
          'Elimina duplicados y devuelve solo valores únicos.',
          'Ideal para poblar listas desplegables (dropdowns) en interfaces web y móviles.'
        ]
      }
    ]
  },
  'sql-u01-l10': {
    id: 'sql-th-u01-l10',
    lessonId: 'sql-u01-l10',
    pathId: 'sql',
    unitId: 1,
    levelId: 10,
    title: '10. Filtrado Condicional con WHERE',
    subtitle: 'El filtro booleano que decide qué filas tienen derecho a pasar al reporte final.',
    estimatedMinutes: 5,
    analogy: 'La cláusula `WHERE` es como el guardia de seguridad en la puerta de un club VIP: examina a cada persona que llega en la fila y solo permite el paso a quienes cumplen con el código de vestimenta o tienen reservación confirmada.',
    video: {
      title: 'La Cláusula WHERE en SQL: Filtrado de Datos Explicado',
      channel: 'Alex The Analyst',
      duration: '11:05',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende la cláusula más importante de SQL: orden de ejecución (FROM -> WHERE -> SELECT), condiciones booleanas y filtrado numérico y textual.'
    },
    sections: [
      {
        title: 'La Cláusula de Filtrado por Excelencia',
        explanation: 'Sin la cláusula `WHERE`, una consulta devuelve todas las filas de la tabla sin discriminar. Con `WHERE`, el motor SQL evalúa una expresión lógica para cada fila:\n- Si la condición evalúa a `TRUE`, la fila se conserva.\n- Si la condición evalúa a `FALSE` o `NULL`, la fila se descarta.\n\nOrden de ejecución del motor:\n1. `FROM` (localiza la tabla en disco)\n2. `WHERE` (filtra y descarta filas no deseadas)\n3. `SELECT` (proyecta y formatea las columnas solicitadas)',
        codeSnippet: `-- Filtrando solo usuarios que tienen rol de administrador
SELECT nombre, email 
FROM usuarios 
WHERE rol = 'admin';

-- Filtrando solo productos con precio mayor a $100
SELECT id, nombre, precio 
FROM productos 
WHERE precio > 100.0;`,
        codeLanguage: 'sql',
        outputSnippet: `+--------------+------------------+--------+
| id           | nombre           | precio |
+--------------+------------------+--------+
| 1            | Monitor 27 Pulg  | 280.00 |
+--------------+------------------+--------+`,
        byteTip: 'Como WHERE se ejecuta antes que SELECT, no puedes usar alias creados en el SELECT dentro del WHERE. (WHERE precio_con_iva > 100 fallará en la mayoría de motores).',
        pitfallTip: 'Si ninguna fila cumple la condición del WHERE, la consulta no arroja ningún error: simplemente devuelve una tabla con cero filas (Empty set).',
        keyPoints: [
          'WHERE filtra filas bajo condiciones lógicas precisas.',
          'Se ubica inmediatamente después de la cláusula FROM.',
          'Solo las filas evaluadas como TRUE pasan al resultado final.'
        ]
      }
    ]
  },
  'sql-u01-l11': {
    id: 'sql-th-u01-l11',
    lessonId: 'sql-u01-l11',
    pathId: 'sql',
    unitId: 1,
    levelId: 11,
    title: '11. Comparación con Igualdad (=)',
    subtitle: 'Búsqueda de coincidencia exacta en números y cadenas de texto bajo el estándar SQL.',
    estimatedMinutes: 5,
    analogy: 'El operador `=` en SQL es como buscar un libro en una biblioteca por su código ISBN exacto: no buscas un libro "parecido", buscas el que coincida letra por letra y número por número.',
    video: {
      title: 'El operador de igualdad en SQL y comillas simples',
      channel: 'Deukion / SQL desde Cero',
      duration: '6:40',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre por qué en SQL se usa un solo igual (=) y no doble igual (==), y cómo comparar textos y números sin errores.'
    },
    sections: [
      {
        title: 'Un Solo Signo Igual para Comparación Estricta',
        explanation: 'En lenguajes de programación imperativos (Kotlin, Java, JavaScript) se usa `==` para comparar y `=` para asignar. En SQL NO EXISTE LA ASIGNACIÓN en consultas SELECT, por lo que el operador de igualdad es un solo signo igual `=`: `WHERE columna = valor`.\n\nReglas:\n- Números: Se escriben directamente sin comillas: `WHERE id = 5`, `WHERE precio = 19.99`.\n- Texto: Se escribe OBLIGATORIAMENTE entre comillas simples: `WHERE estado = \'activo\'`.',
        codeSnippet: `-- Comparando números enteros:
SELECT * FROM pedidos WHERE cliente_id = 42;

-- Comparando cadenas de texto (comillas simples indispensables):
SELECT nombre, email FROM clientes WHERE pais = 'Costa Rica';`,
        codeLanguage: 'sql',
        outputSnippet: `+--------------+-------------------+
| nombre       | email             |
+--------------+-------------------+
| Ada Lovelace | ada@pioneers.org  |
+--------------+-------------------+`,
        byteTip: 'En SQLite y MySQL las comparaciones de texto con = no distinguen mayúsculas por defecto (case-insensitive); en PostgreSQL son estrictamente sensibles a mayúsculas.',
        pitfallTip: 'Escribir "==" en SQL (ej. WHERE id == 5) causará un error de sintaxis en casi todos los motores relacionales estándar.',
        keyPoints: [
          'Un solo signo = verifica igualdad estricta en SQL.',
          'Las cadenas de texto deben ir entre comillas simples \' \'.',
          'Los números se comparan de forma directa sin comillas.'
        ]
      }
    ]
  },
  'sql-u01-l12': {
    id: 'sql-th-u01-l12',
    lessonId: 'sql-u01-l12',
    pathId: 'sql',
    unitId: 1,
    levelId: 12,
    title: '12. Operadores de Desigualdad: != y <>',
    subtitle: 'Excluyendo valores no deseados: la sintaxis clásica ANSI <> y la moderna !=.',
    estimatedMinutes: 5,
    analogy: 'Es como pedir un helado con la instrucción: "Quiero cualquier sabor excepto chocolate (!= \'chocolate\')". Te pueden servir fresa, vainilla o pistacho, pero el chocolate queda rotundamente fuera de la copa.',
    video: {
      title: 'Operadores != y <> en SQL: Diferencias y Estándar ANSI',
      channel: 'Alex The Analyst',
      duration: '7:15',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Conoce los dos operadores de desigualdad de SQL, por qué ambos son válidos y la gran trampa de los valores NULL al usar desigualdad.'
    },
    sections: [
      {
        title: 'Descartando Registros con <> y !=',
        explanation: 'Para excluir filas que coincidan con un valor indeseado (por ejemplo, pedidos cancelados o usuarios dados de baja), SQL ofrece dos operadores equivalentes:\n- `<>`: La sintaxis histórica del estándar internacional ANSI SQL (menor o mayor que, es decir, distinto).\n- `!=`: La sintaxis moderna popularizada por programadores de C y Java.\n\nAmbos operadores funcionan de forma idéntica en motores como PostgreSQL, MySQL y SQLite.',
        codeSnippet: `-- Usando el operador estándar ANSI <>
SELECT id, nombre, estado 
FROM pedidos 
WHERE estado <> 'cancelado';

-- Usando el operador moderno !=
SELECT id, nombre, precio 
FROM productos 
WHERE categoria != 'Obsoletos';`,
        codeLanguage: 'sql',
        outputSnippet: `+----+-------------------+-----------+
| id | nombre            | estado    |
+----+-------------------+-----------+
| 10 | Monitor 27 Pulg   | entregado |
| 12 | Mouse Óptico Pro  | en_camino |
+----+-------------------+-----------+`,
        byteTip: 'Usar <> demuestra conocimiento profundo del estándar ANSI SQL original y garantiza portabilidad en sistemas bancarios antiguos.',
        pitfallTip: '¡Atención a la trampa de los nulos!: Si una fila tiene estado = NULL, ni = ni != la devolverán. Los nulos requieren IS NULL o IS NOT NULL.',
        keyPoints: [
          '<> y != son 100% sinónimos en casi todos los motores modernos.',
          'Permiten descartar registros inactivos, cancelados o con saldo cero.',
          'No incluyen filas con valores NULL.'
        ]
      }
    ]
  },
  'sql-u01-l13': {
    id: 'sql-th-u01-l13',
    lessonId: 'sql-u01-l13',
    pathId: 'sql',
    unitId: 1,
    levelId: 13,
    title: '13. Operadores de Magnitud: > y <',
    subtitle: 'Filtros estrictos de mayor que y menor que para precios, cantidades y fechas.',
    estimatedMinutes: 5,
    analogy: 'Es como fijar el precio máximo en una aplicación de reservas de hotel: "Muéstrame habitaciones con precio menor a $100 (< 100)". Una habitación de $100.00 exactos no se mostrará porque el límite es estricto.',
    video: {
      title: 'Filtrado con operadores > y < en SQL',
      channel: 'freeCodeCamp.org',
      duration: '8:30',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende a comparar números y fechas cronológicas con mayor que (>) y menor que (<).'
    },
    sections: [
      {
        title: 'Comparaciones Estrictas sin Incluir el Borde',
        explanation: 'Los operadores `>` (mayor que) y `<` (menor que) son estrictos: no incluyen el valor con el que se compara.\n- `precio > 50` solo traerá valores desde `50.01` en adelante. Si un producto vale exactamente `50.00`, será descartado.\n- También operan sobre fechas cronológicas: `fecha > \'2026-01-01\'` devolverá eventos ocurridos a partir del 2 de enero de 2026.',
        codeSnippet: `-- Productos con precio estrictamente superior a $50
SELECT nombre, precio 
FROM productos 
WHERE precio > 50.0;

-- Clientes menores de 18 años
SELECT nombre, edad 
FROM clientes 
WHERE edad < 18;`,
        codeLanguage: 'sql',
        outputSnippet: `+-------------------+--------+
| nombre            | precio |
+-------------------+--------+
| Monitor 27 Pulg   | 280.00 |
| Teclado Mecánico  |  75.50 |
+-------------------+--------+`,
        byteTip: 'Las fechas en formato ISO \'YYYY-MM-DD\' se pueden comparar directamente con > y < porque su orden alfabético coincide exactamente con su orden cronológico.',
        pitfallTip: 'Asegúrate de que la columna sea numérica (INT, DECIMAL). Si la columna fue creada por error como TEXT, "5" se considerará mayor que "100" por orden alfabético de cadenas.',
        keyPoints: [
          '> y < son operadores estrictos (no incluyen el límite).',
          'Funcionan sobre números y fechas cronológicas.',
          'Exigen que la columna tenga un tipo de dato adecuado.'
        ]
      }
    ]
  },
  'sql-u01-l14': {
    id: 'sql-th-u01-l14',
    lessonId: 'sql-u01-l14',
    pathId: 'sql',
    unitId: 1,
    levelId: 14,
    title: '14. Operadores Inclusivos: >= y <=',
    subtitle: 'Filtros que incorporan explícitamente el valor límite en la selección.',
    estimatedMinutes: 5,
    analogy: 'Es como la promoción de una aerolínea: "Equipaje permitido de hasta 23 kg (peso <= 23)". Si tu maleta pesa exactamente 23.0 kg, puedes subirla al avión sin pagar sobrecargo.',
    video: {
      title: 'Operadores inclusivos >= y <= en SQL',
      channel: 'Programming with Mosh',
      duration: '7:05',
      url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
      summary: 'Comprende la diferencia entre operadores estrictos e inclusivos y cómo modelar reglas legales de negocio en SQL.'
    },
    sections: [
      {
        title: 'Modelando Reglas Inclusivas de Negocio',
        explanation: 'En las aplicaciones comerciales, la inmensa mayoría de las reglas exigen incluir el valor límite: "mayores de edad (>= 18)", "artículos con stock mínimo (>= 1)", o "descuentos en compras desde $100".\n\nPara esto usamos:\n- `>=`: Mayor o igual que\n- `<=`: Menor o igual que',
        codeSnippet: `-- Una persona con 18 años exactos SÍ pasa este filtro:
SELECT nombre, edad 
FROM usuarios 
WHERE edad >= 18;

-- Productos con precio menor o igual a $100:
SELECT nombre, precio 
FROM productos 
WHERE precio <= 100.0;`,
        codeLanguage: 'sql',
        outputSnippet: `+---------------+------+
| nombre        | edad |
+---------------+------+
| Ada Lovelace  |   36 |
| Alan Turing   |   18 |
+---------------+------+`,
        byteTip: 'El símbolo angular siempre va primero, seguido inmediatamente del igual: >= o <=. Escribir => o =< provocará un error de sintaxis.',
        pitfallTip: 'Confundir > con >= puede hacer que un cliente con exactamente la cantidad requerida quede excluido de una promoción comercial.',
        keyPoints: [
          '>= y <= incluyen el valor de referencia en el resultado.',
          'El orden de los caracteres es estricto: primero el ángulo, luego el igual.',
          'Modelan con exactitud requerimientos legales y financieros.'
        ]
      }
    ]
  },
  'sql-u01-l15': {
    id: 'sql-th-u01-l15',
    lessonId: 'sql-u01-l15',
    pathId: 'sql',
    unitId: 1,
    levelId: 15,
    title: '15. Combinación Lógica con AND',
    subtitle: 'Intersección de criterios: cuando múltiples condiciones deben cumplirse obligatoriamente a la vez.',
    estimatedMinutes: 5,
    analogy: 'El operador `AND` es como los filtros de búsqueda de un sitio de venta de departamentos: marcas "2 habitaciones" Y "con estacionamiento" Y "precio menor a $150,000". Si a un departamento le falta estacionamiento, no aparece en tu búsqueda.',
    video: {
      title: 'Cláusula WHERE con múltiples condiciones usando AND',
      channel: 'Alex The Analyst',
      duration: '9:30',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende a encadenar múltiples condiciones AND para filtrar datos con máxima precisión en bases de datos relacionales.'
    },
    sections: [
      {
        title: 'Intersección Estricta de Condiciones',
        explanation: 'El operador lógico `AND` une dos o más filtros en la cláusula `WHERE`. Para que una fila sea seleccionada, TODAS las condiciones conectadas por `AND` deben ser simultáneamente verdaderas.\n\nCada `AND` adicional reduce el universo de resultados entregados, volviendo la consulta más selectiva.',
        codeSnippet: `-- Ambas condiciones deben cumplirse: precio alto Y categoría tecnología
SELECT nombre, precio, categoria 
FROM productos 
WHERE precio >= 100.0 AND categoria = 'Tecnología';

-- Encadenando tres condiciones con AND:
SELECT * FROM clientes 
WHERE pais = 'México' AND edad >= 18 AND activo = true;`,
        codeLanguage: 'sql',
        outputSnippet: `+-------------------+--------+-------------+
| nombre            | precio | categoria   |
+-------------------+--------+-------------+
| Monitor 27 Pulg   | 280.00 | Tecnología  |
+-------------------+--------+-------------+`,
        byteTip: 'Colocar primero la condición que descarte la mayor cantidad de filas permite al motor optimizar el escaneo de índices.',
        pitfallTip: 'Escribir WHERE categoria = \'Ropa\' AND categoria = \'Zapatos\' siempre devolverá cero filas, porque una misma columna no puede tener dos valores distintos al mismo tiempo. Para eso se usa OR.',
        keyPoints: [
          'True AND True = True; cualquier otra combinación es False.',
          'Permite cruzar filtros de múltiples columnas independientes.',
          'Cada AND estrecha el conjunto de resultados entregados.'
        ]
      }
    ]
  },
  'sql-u01-l16': {
    id: 'sql-th-u01-l16',
    lessonId: 'sql-u01-l16',
    pathId: 'sql',
    unitId: 1,
    levelId: 16,
    title: '16. Combinación Lógica con OR y Precedencia',
    subtitle: 'Por qué mezclar AND y OR sin paréntesis es una bomba de tiempo en la seguridad de tu base de datos.',
    estimatedMinutes: 5,
    analogy: 'Imagina una orden judicial que dice: "Detengan a los sospechosos que sean cómplices O líderes Y lleven armas". Sin comas o paréntesis, no sabes si debes detener a todos los cómplices desarmados o solo a los armados. Los paréntesis en SQL eliminan esa ambigüedad mortal.',
    video: {
      title: 'Peligros al mezclar AND y OR en SQL: La importancia de los paréntesis',
      channel: 'Deukion / SQL desde Cero',
      duration: '10:00',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre por qué AND tiene mayor precedencia que OR en SQL y cómo un error en el WHERE puede filtrar datos de clientes a usuarios no autorizados.'
    },
    sections: [
      {
        title: 'Precedencia de Operadores en Cláusula WHERE',
        explanation: 'En SQL, el operador `AND` tiene una prioridad de evaluación estrictamente MAYOR que el operador `OR`.\n\nSi escribes una consulta sin paréntesis:\n`WHERE rol = \'admin\' OR rol = \'editor\' AND activo = 1`\n\nEl motor la interpreta como:\n`WHERE rol = \'admin\' OR (rol = \'editor\' AND activo = 1)`\n\n¿El desastre? Todos los administradores inactivos o dados de baja pasarán el filtro y accederán al sistema porque el `OR` los rescata sin validar si estaban activos.\n\nPara solucionarlo, debes usar paréntesis explícitos: `(rol = \'admin\' OR rol = \'editor\') AND activo = 1`.',
        codeSnippet: `-- 1. CONSULTA PELIGROSA Y ERRÓNEA (Fuga de seguridad):
SELECT nombre, rol, activo 
FROM usuarios 
WHERE rol = 'admin' OR rol = 'editor' AND activo = true;

-- 2. CONSULTA SEGURA Y CORRECTA CON PARÉNTESIS:
SELECT nombre, rol, activo 
FROM usuarios 
WHERE (rol = 'admin' OR rol = 'editor') AND activo = true;`,
        codeLanguage: 'sql',
        outputSnippet: `+---------------+--------+--------+
| nombre        | rol    | activo |
+---------------+--------+--------+
| Ada Lovelace  | admin  | true   |
| Alan Turing   | editor | true   |
+---------------+--------+--------+`,
        byteTip: 'Regla de Oro en SQL: SIEMPRE que mezcles AND y OR en una misma consulta, encierra las condiciones del OR entre paréntesis obligatoriamente.',
        pitfallTip: 'Nunca asumas que el motor leerá de izquierda a derecha cuando hay operadores AND y OR combinados.',
        keyPoints: [
          'AND se evalúa antes que OR por jerarquía del lenguaje.',
          'Los paréntesis fuerzan la prioridad deseada y protegen la lógica de negocio.',
          'La ausencia de paréntesis en WHERE es una causa frecuente de incidentes de seguridad.'
        ]
      }
    ]
  },
  'sql-u01-l17': {
    id: 'sql-th-u01-l17',
    lessonId: 'sql-u01-l17',
    pathId: 'sql',
    unitId: 1,
    levelId: 17,
    title: '17. Rangos Limpios con BETWEEN ... AND ...',
    subtitle: 'Filtra intervalos cerrados de números y fechas de forma concisa y elegante.',
    estimatedMinutes: 5,
    analogy: '`BETWEEN` es como fijar el dial de un termostato de calefacción: "Mantén la temperatura entre 18 y 22 grados (BETWEEN 18 AND 22)". Tanto 18 como 22 son temperaturas válidas que forman parte del rango permitido.',
    video: {
      title: 'El operador BETWEEN en SQL: Filtrado de Números y Fechas',
      channel: 'Programming with Mosh',
      duration: '7:50',
      url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
      summary: 'Aprende a usar BETWEEN ... AND ... para simplificar condiciones complejas de rangos y cómo negar el intervalo con NOT BETWEEN.'
    },
    sections: [
      {
        title: 'Filtrado Inclusivo de Intervalos',
        explanation: 'En lugar de escribir la clásica fórmula repetitiva:\n`WHERE precio >= 20.0 AND precio <= 80.0`\n\nSQL ofrece el operador `BETWEEN ... AND ...` que hace exactamente lo mismo de forma limpia:\n`WHERE precio BETWEEN 20.0 AND 80.0`\n\nEs 100% inclusivo: los dos valores límite forman parte del resultado.',
        codeSnippet: `-- Filtrando productos de precio medio
SELECT nombre, precio 
FROM productos 
WHERE precio BETWEEN 50.0 AND 100.0;

-- Filtrando ventas de un mes específico:
SELECT id, total, fecha 
FROM facturas 
WHERE fecha BETWEEN '2026-01-01' AND '2026-01-31';

-- Negando el rango con NOT BETWEEN (excluye el intervalo)
SELECT nombre, precio 
FROM productos 
WHERE precio NOT BETWEEN 10.0 AND 50.0;`,
        codeLanguage: 'sql',
        outputSnippet: `+-------------------+--------+
| nombre            | precio |
+-------------------+--------+
| Teclado Mecánico  |  75.50 |
+-------------------+--------+`,
        byteTip: 'En BETWEEN el valor menor SIEMPRE debe ir a la izquierda y el mayor a la derecha. Escribir BETWEEN 100 AND 50 devolverá cero filas.',
        pitfallTip: 'Al usar BETWEEN con campos de tipo TIMESTAMP que contienen horas (ejemplo: 2026-01-31 15:30:00), el límite \'2026-01-31\' se interpreta como medianoche (00:00:00), descartando los registros de la tarde.',
        keyPoints: [
          'BETWEEN es inclusivo con ambos bordes del intervalo.',
          'Equivale exactamente a: (columna >= min AND columna <= max).',
          'NOT BETWEEN selecciona todo lo que esté fuera del intervalo.'
        ]
      }
    ]
  },
  'sql-u01-l18': {
    id: 'sql-th-u01-l18',
    lessonId: 'sql-u01-l18',
    pathId: 'sql',
    unitId: 1,
    levelId: 18,
    title: '18. Pertenencia a Conjuntos con IN (...)',
    subtitle: 'Reemplaza cadenas infinitas de ORs por una lista compacta, elegante y optimizada.',
    estimatedMinutes: 5,
    analogy: '`IN` es como la lista de países miembros de la Unión Europea: en lugar de preguntar "¿Es de Francia? ¿O es de España? ¿O es de Italia? ¿O es de Alemania?", preguntas de un solo golpe: "¿Tu país está en esta lista oficial?".',
    video: {
      title: 'El operador IN y NOT IN en SQL explicado con ejemplos',
      channel: 'Alex The Analyst',
      duration: '8:15',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Descubre por qué IN es más rápido que múltiples OR gracias a las tablas hash internas y cómo usar NOT IN para exclusiones masivas.'
    },
    sections: [
      {
        title: 'Verificación de Pertenencia en Listas',
        explanation: 'Si necesitas validar si un cliente pertenece a cualquiera de 5 países distintos, encadenar `WHERE pais = \'CR\' OR pais = \'MX\' OR pais = \'ES\'...` es largo y difícil de mantener.\n\nEl operador `IN (...)` permite definir una tupla de valores permitidos entre paréntesis. Si el dato de la columna coincide con cualquiera de los elementos de la lista, la fila pasa el filtro.\n\nTambién puedes negarlo con `NOT IN (...)` para excluir a todos los miembros de la lista.',
        codeSnippet: `-- Verificando si el país está dentro de la lista:
SELECT nombre, pais 
FROM clientes 
WHERE pais IN ('Costa Rica', 'México', 'Colombia');

-- Excluyendo estados de pedido no deseados:
SELECT id, total, estado 
FROM pedidos 
WHERE estado NOT IN ('cancelado', 'reembolsado');`,
        codeLanguage: 'sql',
        outputSnippet: `+---------------+-------------+
| nombre        | pais        |
+---------------+-------------+
| Ada Lovelace  | Costa Rica  |
| Alan Turing   | México      |
+---------------+-------------+`,
        byteTip: 'Los motores SQL optimizan internamente las cláusulas IN convirtiéndolas en tablas hash en memoria RAM, siendo notablemente más rápidas que múltiples ORs.',
        pitfallTip: 'Peligro extremo con NOT IN y valores NULL: Si la lista de NOT IN contiene un valor NULL (ejemplo: NOT IN (1, 2, NULL)), la consulta completa devolverá CERO FILAS debido a la lógica trivalente de SQL.',
        keyPoints: [
          'IN (...) comprueba si el valor coincide con cualquier elemento de la lista.',
          'NOT IN (...) excluye a todos los valores de la lista.',
          'Hace las consultas mucho más legibles y rápidas.'
        ]
      }
    ]
  },
  'sql-u01-l19': {
    id: 'sql-th-u01-l19',
    lessonId: 'sql-u01-l19',
    pathId: 'sql',
    unitId: 1,
    levelId: 19,
    title: '19. Búsqueda por Patrones con LIKE y Comodines',
    subtitle: 'Búsquedas parciales de texto con los comodines % (múltiples caracteres) y _ (un solo carácter).',
    estimatedMinutes: 5,
    analogy: 'El operador `LIKE` es como la barra de búsqueda de tu teléfono con autocompletado: escribes "Car" y te muestra tanto a "Carlos" como a "Carmen" o "Carolina", porque coincide con el patrón inicial.',
    video: {
      title: 'Búsqueda con LIKE y comodines % y _ en SQL',
      channel: 'freeCodeCamp.org',
      duration: '9:45',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Aprende a buscar por prefijo (LIKE \'Car%\'), por sufijo (LIKE \'%@gmail.com\') y en cualquier posición (LIKE \'%pro%\').'
    },
    sections: [
      {
        title: 'Búsquedas Difusas en Cadenas de Texto',
        explanation: `El operador de igualdad \`=\` solo encuentra cadenas que sean 100% idénticas. Para construir búsquedas parciales de texto, SQL provee el operador \`LIKE\` acompañado de dos comodines universales:

1. \`%\` (Porcentaje): Representa CERO, UNO o CUALQUIER NÚMERO de caracteres arbitrarios.
- 'A%': Inicia con la letra A.
- '%@gmail.com': Termina en @gmail.com.
- '%dev%': Contiene la palabra "dev" en cualquier posición intermedia.

2. \`_\` (Guión bajo): Representa EXACTAMENTE UN ÚNICO carácter cualquiera.
- 'C_sa': Coincide con "Casa", "Cosa", pero no con "Causa".`,
        codeSnippet: `-- 1. Todos los correos que terminan en @empresa.com (Sufijo)
SELECT nombre, email 
FROM usuarios 
WHERE email LIKE '%@empresa.com';

-- 2. Nombres que empiezan con "Al" (Prefijo)
SELECT nombre 
FROM clientes 
WHERE nombre LIKE 'Al%';

-- 3. Productos que contengan la palabra "Pro" en cualquier parte
SELECT nombre, precio 
FROM productos 
WHERE nombre LIKE '%Pro%';`,
        codeLanguage: 'sql',
        outputSnippet: `+-------------------+--------+
| nombre            | precio |
+-------------------+--------+
| Mouse Óptico Pro  |  42.00 |
+-------------------+--------+`,
        byteTip: 'En PostgreSQL, LIKE es sensible a mayúsculas; si quieres búsqueda insensible a mayúsculas en Postgres, usa el operador ILIKE.',
        pitfallTip: 'Las búsquedas con comodín al principio (ejemplo: LIKE \'%termino\') obligan al motor a realizar un Full Table Scan (recorrer toda la tabla fila por fila) porque no pueden aprovechar los índices B-Tree estándar.',
        keyPoints: [
          '% reemplaza cualquier cantidad de caracteres (cero o más).',
          '_ reemplaza exactamente un único carácter en esa posición.',
          'LIKE es la base de los motores de búsqueda de texto básicos en bases de datos.'
        ]
      }
    ]
  },
  'sql-u01-l20': {
    id: 'sql-th-u01-l20',
    lessonId: 'sql-u01-l20',
    pathId: 'sql',
    unitId: 1,
    levelId: 20,
    title: '20. El Enigma de NULL: Por Qué = NULL Siempre Falla',
    subtitle: 'La lógica trivalente de SQL, valores desconocidos y los operadores obligatorios IS NULL y IS NOT NULL.',
    estimatedMinutes: 6,
    analogy: '`NULL` es como dos cajas negras cerradas cuyo contenido nadie conoce. Si alguien te pregunta: "¿Lo que hay dentro de la caja A es idéntico a lo que hay dentro de la caja B?", la única respuesta honesta es: "No lo sé (Desconocido / UNKNOWN)". Dos incógnitas nunca pueden considerarse iguales.',
    video: {
      title: 'El gran error con NULL en SQL: Por qué = NULL nunca funciona',
      channel: 'Alex The Analyst / SQL Masterclass',
      duration: '11:20',
      url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
      summary: 'Explicación definitiva de la lógica trivalente (TRUE, FALSE, UNKNOWN), por qué NULL = NULL es falso y cómo usar correctamente IS NULL.'
    },
    sections: [
      {
        title: 'NULL no es Cero ni Cadena Vacía: Es Ausencia de Valor',
        explanation: 'En las bases de datos relacionales, `NULL` no representa el número cero `0` ni un texto vacío `""`. Representa la ausencia total de dato o un valor desconocido.\n\nPor definición filosófica de SQL:\nDos incógnitas no pueden ser iguales entre sí. Por lo tanto, la expresión `NULL = NULL` evalúa a `UNKNOWN` (que en un WHERE equivale a Falso).\n\nPara comprobar si un campo está vacío o contiene un valor real, la sintaxis OBLIGATORIA impuesta por el estándar SQL es:\n- `IS NULL`: Para buscar valores ausentes.\n- `IS NOT NULL`: Para buscar valores con dato confirmado.',
        codeSnippet: `-- ❌ INCORRECTO: Jamás devolverá ninguna fila (Error de novato):
-- SELECT * FROM clientes WHERE telefono = NULL;

-- ✅ CORRECTO: Encuentra clientes que no tienen teléfono registrado:
SELECT id, nombre, email, telefono 
FROM clientes 
WHERE telefono IS NULL;

-- ✅ Clientes que SÍ tienen teléfono confirmado en el sistema:
SELECT id, nombre, telefono 
FROM clientes 
WHERE telefono IS NOT NULL;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+---------------+--------------------+----------+
| id | nombre        | email              | telefono |
+----+---------------+--------------------+----------+
|  2 | Alan Turing   | alan@bletchley.org | NULL     |
+----+---------------+--------------------+----------+`,
        byteTip: '¡Esta es la pregunta trampa #1 en entrevistas técnicas de SQL en Google, Amazon y bancos! Recuerda siempre: el nulo se interroga con IS, jamás con =.',
        pitfallTip: 'Cualquier cálculo matemático con un valor NULL produce NULL como resultado. 100 + NULL dará NULL. Para evitarlo, usa la función COALESCE(columna, 0).',
        keyPoints: [
          'NULL representa un dato ausente o desconocido.',
          '= NULL y != NULL siempre fallan y no devuelven registros.',
          'IS NULL y IS NOT NULL son las únicas instrucciones válidas para evaluar nulidad.'
        ]
      }
    ]
  }
};
