import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_03_THEORY: Record<string, TheoryLesson> = {
  "sql-u03-l01": {
    "id": "sql-th-u03-l01",
    "lessonId": "sql-u03-l01",
    "pathId": "sql",
    "unitId": 3,
    "levelId": 1,
    "title": "1. Estructura de CREATE TABLE",
    "subtitle": "Aprende a construir nuevas tablas desde cero utilizando la sentencia fundamental CREATE TABLE.",
    "estimatedMinutes": 8,
    "analogy": "Comprar una cajonera nueva y etiquetar cada cajón con un marcador indeleble antes de meterle ropa: cajón superior \"Camisetas\", segundo cajón \"Pantalones\", cajón inferior \"Zapatos\".",
    "video": {
      "title": "CREATE TABLE y Tipos de Datos en SQLite",
      "channel": "Fazt Code",
      "duration": "38:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Creación de esquemas DDL, afinidades INTEGER, REAL, TEXT, BLOB y flexibilidad de tipos."
    },
    "sections": [
      {
        "title": "La sentencia DDL: CREATE TABLE",
        "explanation": "Para crear una tabla nueva en una base de datos relacional usamos la sentencia **`CREATE TABLE`**.\n\nSu estructura básica en SQL estándar y SQLite es:\n`CREATE TABLE nombre_tabla (`\n`    columna1 TIPO_DATO RESTRICCIONES,`\n`    columna2 TIPO_DATO,`\n`    columna3 TIPO_DATO`\n`);`\n\nCada columna se define con su nombre, su tipo de dato (como `INTEGER` o `TEXT`) y opcionalmente reglas de integridad (como `PRIMARY KEY` o `NOT NULL`).",
        "codeSnippet": "-- Creamos una tabla nueva de prueba para registrar notas rápidas\nCREATE TABLE notas_recordatorio (\n    id INTEGER PRIMARY KEY,\n    titulo TEXT NOT NULL,\n    contenido TEXT,\n    importante BOOLEAN DEFAULT false\n);",
        "codeLanguage": "sql",
        "outputSnippet": "Tabla 'notas_recordatorio' creada con éxito (0 filas devueltas).",
        "byteTip": "En SQLite se recomienda usar CREATE TABLE IF NOT EXISTS nombre_tabla (...) para evitar errores si la tabla ya había sido creada antes.",
        "pitfallTip": "No olvides separar las definiciones de columna con comas ,, excepto la última columna antes del paréntesis de cierre ).",
        "keyPoints": [
          "CREATE TABLE es la instrucción DDL para dar vida a nuevas tablas.",
          "Define el nombre, tipo de dato y restricciones de cada columna.",
          "IF NOT EXISTS evita fallas si la tabla ya existe en el archivo local."
        ]
      },
      {
        "title": "Verificación de la tabla recién creada",
        "explanation": "Una vez creada una tabla, ya está lista para recibir registros con `INSERT` o ser consultada con `SELECT`:",
        "codeSnippet": "-- Verificamos que la tabla recién creada responda consultas (está vacía por ahora)\nSELECT * FROM notas_recordatorio;",
        "codeLanguage": "sql",
        "outputSnippet": "0 filas devueltas (tabla vacía pero lista para operar).",
        "byteTip": "Una tabla recién creada no consume prácticamente espacio hasta que comienzas a insertarle filas.",
        "pitfallTip": "Cuidado con crear tablas temporales con el mismo nombre de una tabla crítica del sistema.",
        "keyPoints": [
          "Una tabla vacía tiene estructura pero cero registros.",
          "Responde de inmediato a consultas SELECT sin errores.",
          "Es el lienzo sobre el cual se inserta la información de la app."
        ]
      }
    ]
  },
  "sql-u03-l02": {
    "id": "sql-th-u03-l02",
    "lessonId": "sql-u03-l02",
    "pathId": "sql",
    "unitId": 3,
    "levelId": 2,
    "title": "2. Nombres de tablas y columnas",
    "subtitle": "Aprende las mejores prácticas de nomenclatura con la convención estándar snake_case en SQL.",
    "estimatedMinutes": 8,
    "analogy": "Escribir las señales de tráfico en una carretera con la misma tipografía y colores oficiales: todo conductor las reconoce al instante sin confundirse.",
    "video": {
      "title": "CREATE TABLE y Tipos de Datos en SQLite",
      "channel": "Fazt Code",
      "duration": "38:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Creación de esquemas DDL, afinidades INTEGER, REAL, TEXT, BLOB y flexibilidad de tipos."
    },
    "sections": [
      {
        "title": "Nomenclatura oficial: snake_case en SQL",
        "explanation": "A diferencia de Kotlin, donde las variables se escriben en `camelCase`, en el mundo de las bases de datos y SQL el estándar indiscutible de la industria es **`snake_case`**:\n\n¿Cómo funciona `snake_case`?\n• Todo se escribe en **letras minúsculas**.\n• Las palabras se separan con un **guión bajo (`_`)**.\n• No se usan espacios, tildes, caracteres especiales ni signos como `-`.\n\nEjemplos correctos:\n✔ `fecha_nacimiento`\n✔ `precio_unitario`\n✔ `codigo_postal`\n✔ `estudiante_id`\n\nEjemplos desaconsejados:\n✖ `fechaNacimiento` (estilo camelCase, algunos motores SQL lo convierten a minúsculas y se pierde la mayúscula)\n✖ `fecha nacimiento` (con espacios, requiere corchetes molestos `[fecha nacimiento]`)\n✖ `dirección` (con tildes o eñes, puede romperse en servidores con diferente codificación)",
        "codeSnippet": "-- Consultamos columnas bien nombradas en snake_case\nSELECT id, fecha_ingreso, salario\nFROM empleados;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+---------------+---------+\n| id  | fecha_ingreso | salario |\n+-----+---------------+---------+\n| 101 | 2022-03-15    | 3200.0  |\n| 102 | 2021-08-01    | 2850.5  |\n| 103 | 2023-01-10    | 3100.0  |\n| 104 | 2019-11-20    | 4500.0  |\n| 105 | 2024-02-01    | 1900.0  |\n+-----+---------------+---------+\n5 filas devueltas",
        "byteTip": "Los motores SQL no suelen distinguir mayúsculas de minúsculas en nombres de columnas, por lo que fecha_nacimiento es la única forma segura y universal de separar palabras.",
        "pitfallTip": "Nunca uses palabras reservadas de SQL como nombres de columna (por ejemplo, llamar a una columna select, from, table o order causará errores de sintaxis).",
        "keyPoints": [
          "snake_case es el estándar oficial para tablas y columnas en SQL.",
          "Usa solo letras minúsculas, números y guiones bajos.",
          "Evita tildes, espacios y palabras reservadas del lenguaje."
        ]
      },
      {
        "title": "Mapeo automático entre Room y Kotlin",
        "explanation": "En Android, la biblioteca Room traduce automáticamente las columnas de SQLite a variables de Kotlin:\n• En SQLite: `fecha_nacimiento TEXT`\n• En Kotlin: `val fechaNacimiento: String`\nRoom se encarga de conectar ambos mundos con total transparencia.",
        "codeSnippet": "-- Nombres limpios facilitan el mapeo con Kotlin y Jetpack Compose\nSELECT id, nombre, email\nFROM usuarios\nLIMIT 2;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+--------------+--------------------+\n| id | nombre       | email              |\n+----+--------------+--------------------+\n| 1  | Ada Lovelace | ada@pioneers.org   |\n| 2  | Alan Turing  | alan@bletchley.org |\n+----+--------------+--------------------+\n2 filas devueltas",
        "byteTip": "LIMIT 2 restringe el resultado para devolver solo las dos primeras filas.",
        "pitfallTip": "Sé consistente: no mezcles snake_case en unas tablas y camelCase en otras dentro de la misma base de datos.",
        "keyPoints": [
          "La consistencia de nombres previene errores de mapeo en Room.",
          "Facilita la lectura de consultas complejas de muchas líneas.",
          "Es el estándar que encontrarás en tutoriales oficiales y documentación de Android."
        ]
      }
    ]
  },
  "sql-u03-l03": {
    "id": "sql-th-u03-l03",
    "lessonId": "sql-u03-l03",
    "pathId": "sql",
    "unitId": 3,
    "levelId": 3,
    "title": "3. INTEGER, REAL y TEXT",
    "subtitle": "Conoce las afinidades de tipos fundamentales de SQLite: INTEGER, REAL y TEXT.",
    "estimatedMinutes": 8,
    "analogy": "Un clasificador de monedas: los números redondos entran en la ranura de enteros (INTEGER), las monedas con decimales en la balanza de precisión (REAL) y los billetes con palabras escritas en la ranura de texto (TEXT).",
    "video": {
      "title": "CREATE TABLE y Tipos de Datos en SQLite",
      "channel": "Fazt Code",
      "duration": "38:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Creación de esquemas DDL, afinidades INTEGER, REAL, TEXT, BLOB y flexibilidad de tipos."
    },
    "sections": [
      {
        "title": "Los tipos principales de SQLite: INTEGER, REAL y TEXT",
        "explanation": "A diferencia de motores gigantes como Oracle o SQL Server que tienen más de 50 tipos de datos distintos, SQLite simplifica todo en un conjunto pequeño pero poderoso de **afinidades de tipos**:\n\n• **`INTEGER`:** Números enteros sin decimales, positivos o negativos (ejemplo: `id`, `edad`, `cantidad`, `semestre`). SQLite ajusta el tamaño dinámicamente de 1 a 8 bytes según la magnitud del número.\n• **`REAL`:** Números con punto decimal de precisión flotante (ejemplo: `precio`, `promedio`, `salario`, `latitud`).\n• **`TEXT`:** Cadenas de caracteres y texto de cualquier longitud, codificadas en UTF-8 (ejemplo: `nombre`, `email`, `descripcion`).",
        "codeSnippet": "-- En la tabla de productos conviven los tres tipos principales:\n-- id: INTEGER | nombre: TEXT | precio: REAL | stock: INTEGER\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE precio < 100.0;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------------+--------+-------+\n| id | nombre               | precio | stock |\n+----+----------------------+--------+-------+\n| 1  | Teclado Mecánico RGB | 89.99  | 45    |\n| 3  | Mouse Ergonómico Pro | 49.9   | 80    |\n| 5  | Cable HDMI 2.1 Braided| 14.99  | 150   |\n+----+----------------------+--------+-------+\n3 filas devueltas",
        "byteTip": "TEXT en SQLite no tiene límite artificial de tamaño; puede guardar desde una sola letra hasta un libro entero sin truncarlo.",
        "pitfallTip": "Guardar números como TEXT (por ejemplo guardar \"89.99\" como texto) impedirá que puedas hacer operaciones matemáticas y ordenamientos numéricos correctos (en texto \"10\" es menor que \"2\").",
        "keyPoints": [
          "INTEGER para cantidades contables y llaves primarias.",
          "REAL para dinero, medidas y porcentajes con decimales.",
          "TEXT para cadenas de caracteres codificadas en UTF-8.",
          "Elegir el tipo numérico adecuado garantiza comparaciones matemáticas exactas."
        ]
      },
      {
        "title": "Operaciones numéricas entre INTEGER y REAL",
        "explanation": "SQLite maneja de forma impecable las operaciones entre enteros y decimales, promocionando el resultado a decimal cuando es necesario:",
        "codeSnippet": "-- Multiplicamos REAL (precio) por INTEGER (stock) para obtener el valor del inventario\nSELECT nombre, (precio * stock) AS valor_total_inventario\nFROM productos\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------------+------------------------+\n| nombre               | valor_total_inventario |\n+----------------------+------------------------+\n| Teclado Mecánico RGB | 4049.55                |\n| Monitor Ultrawide 34\"| 5154.0                 |\n| Mouse Ergonómico Pro | 3992.0                 |\n+----------------------+------------------------+\n3 filas devueltas",
        "byteTip": "El resultado de REAL * INTEGER es automáticamente de afinidad REAL para preservar los centavos.",
        "pitfallTip": "En SQLite la división entre dos enteros 5 / 2 da 2 en versiones antiguas, pero si uno es REAL 5.0 / 2 dará 2.5.",
        "keyPoints": [
          "SQLite optimiza el almacenamiento de números enteros automáticamente.",
          "Las operaciones mixtas conservan la precisión decimal requerida en finanzas.",
          "El tipado adecuado permite que el motor ejecute consultas a máxima velocidad."
        ]
      }
    ]
  },
  "sql-u03-l04": {
    "id": "sql-th-u03-l04",
    "lessonId": "sql-u03-l04",
    "pathId": "sql",
    "unitId": 3,
    "levelId": 4,
    "title": "4. Reconocimiento de BLOB",
    "subtitle": "Comprende el tipo BLOB para almacenar datos binarios crudos como imágenes o archivos cifrados.",
    "estimatedMinutes": 8,
    "analogy": "Una caja fuerte sellada que guarda un objeto físico en su empaque original sin abrirlo: no intentas leerlo como texto; lo guardas tal cual en formato binario puro (ceros y unos).",
    "video": {
      "title": "CREATE TABLE y Tipos de Datos en SQLite",
      "channel": "Fazt Code",
      "duration": "38:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Creación de esquemas DDL, afinidades INTEGER, REAL, TEXT, BLOB y flexibilidad de tipos."
    },
    "sections": [
      {
        "title": "El tipo BLOB (Binary Large Object)",
        "explanation": "¿Qué ocurre cuando necesitas almacenar datos que no son números ni texto, como la foto de perfil en miniatura de un usuario, un archivo de audio comprimido o una clave criptográfica?\n\nPara eso existe el tipo **`BLOB`** (*Binary Large Object* / Objeto Binario Grande):\n• Almacena una secuencia exacta de **bytes crudos** sin ninguna interpretación de texto ni codificación.\n• Guarda la información exactamente como se leyó del archivo de disco.",
        "codeSnippet": "-- Ejemplo conceptual de tabla que almacena avatares en formato binario BLOB\nCREATE TABLE avatares_usuario (\n    usuario_id INTEGER PRIMARY KEY,\n    formato TEXT,\n    foto_binaria BLOB\n);",
        "codeLanguage": "sql",
        "outputSnippet": "Tabla 'avatares_usuario' creada con éxito.",
        "byteTip": "La regla de oro en Android: Guarda en la base de datos la RUTA del archivo en el disco (TEXT), NO la imagen pesada completa como BLOB. Guarda solo imágenes diminutas en BLOB si es estrictamente necesario.",
        "pitfallTip": "Meter imágenes de 5 MB como BLOB dentro de SQLite inflará el archivo de la base de datos y hará que las consultas sean lentísimas.",
        "keyPoints": [
          "BLOB almacena datos binarios puros (bytes sin interpretar).",
          "Ideal para firmas criptográficas, certificados o miniaturas muy pequeñas.",
          "La mejor práctica en Android es guardar la URL o ruta local en un campo TEXT."
        ]
      },
      {
        "title": "Rendimiento y buenas prácticas con archivos multimedia",
        "explanation": "En apps profesionales de Android:\n• Las fotos y videos se descargan a la carpeta de caché del almacenamiento interno del teléfono.\n• En SQLite se guarda solo el texto de la ruta local: `\"/data/user/0/app/cache/foto1.jpg\"`.\nEsto mantiene la base de datos veloz, liviana y eficiente.",
        "codeSnippet": "-- Consulta típica de rutas locales de archivos en formato TEXT\nSELECT id, nombre, ('/imagenes/' || id || '.png') AS ruta_icono\nFROM productos\nLIMIT 2;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------------+-------------------+\n| id | nombre               | ruta_icono        |\n+----+----------------------+-------------------+\n| 1  | Teclado Mecánico RGB | /imagenes/1.png   |\n| 2  | Monitor Ultrawide 34\"| /imagenes/2.png   |\n+----+----------------------+-------------------+\n2 filas devueltas",
        "byteTip": "El operador || en SQL concatena cadenas de texto de forma estándar.",
        "pitfallTip": "No uses BLOB como sustituto de un sistema de archivos para almacenar galerías enteras de fotos.",
        "keyPoints": [
          "Guardar rutas en TEXT es infinitamente más eficiente que almacenar imágenes completas en BLOB.",
          "El operador || permite construir URLs y rutas dinámicas en SQL.",
          "Asegura un rendimiento óptimo en dispositivos de gama media y baja."
        ]
      }
    ]
  },
  "sql-u03-l05": {
    "id": "sql-th-u03-l05",
    "lessonId": "sql-u03-l05",
    "pathId": "sql",
    "unitId": 3,
    "levelId": 5,
    "title": "5. Representación de valores lógicos y fechas",
    "subtitle": "Aprende cómo SQLite almacena valores lógicos (Booleanos) y fechas mediante enteros y textos ISO.",
    "estimatedMinutes": 8,
    "analogy": "Un interruptor de luz con dos posiciones: 1 significa \"encendido\" (true) y 0 significa \"apagado\" (false). Y un calendario estándar donde todos escriben AÑO-MES-DÍA para que no haya confusiones entre países.",
    "video": {
      "title": "CREATE TABLE y Tipos de Datos en SQLite",
      "channel": "Fazt Code",
      "duration": "38:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Creación de esquemas DDL, afinidades INTEGER, REAL, TEXT, BLOB y flexibilidad de tipos."
    },
    "sections": [
      {
        "title": "Booleanos y Fechas en SQLite",
        "explanation": "Curiosamente, SQLite no tiene tipos de datos separados llamados específicamente `BOOLEAN` o `DATE`. En su lugar, utiliza dos convenciones universales muy inteligentes:\n\n1. **Valores Booleanos (Verdadero / Falso):**\nSe almacenan como enteros:\n• **`1`**: Representa `true` (verdadero / activo).\n• **`0`**: Representa `false` (falso / inactivo).\n(Aunque escribas `BOOLEAN` en tu `CREATE TABLE`, SQLite lo mapea internamente a un `INTEGER` de 0 o 1).\n\n2. **Fechas y Horas:**\nSe almacenan típicamente como **`TEXT` en formato estándar ISO-8601**:\n`'AAAA-MM-DD'` (ejemplo: `'2024-03-15'`) o `'AAAA-MM-DD HH:MM:SS'`.\n¿Por qué este formato? Porque al ordenar alfabéticamente `'2024-03-15'` frente a `'2024-01-10'`, ¡el orden alfabético coincide exactamente con el orden cronológico del tiempo!",
        "codeSnippet": "-- Consultamos empleados activos filtrando por el campo booleano (true / 1)\nSELECT id, nombre, fecha_ingreso, activo\nFROM empleados\nWHERE activo = true;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+----------------+---------------+--------+\n| id  | nombre         | fecha_ingreso | activo |\n+-----+----------------+---------------+--------+\n| 101 | Carlos Mendoza | 2022-03-15    | true   |\n| 102 | Elena Rostova  | 2021-08-01    | true   |\n| 103 | Mateo Díaz     | 2023-01-10    | true   |\n| 104 | Sofía Valerio  | 2019-11-20    | true   |\n+-----+----------------+---------------+--------+\n4 filas devueltas",
        "byteTip": "En SQLite puedes escribir WHERE activo = true o WHERE activo = 1; ambos funcionan idénticos.",
        "pitfallTip": "Nunca guardes fechas en formatos locales como \"15/03/2024\" o \"03/15/2024\". Rompen las comparaciones cronológicas y causan desastres al ordenar.",
        "keyPoints": [
          "Los booleanos se representan como 1 (true) y 0 (false).",
          "Las fechas se guardan en texto en formato internacional ISO AAAA-MM-DD.",
          "El formato ISO garantiza que los ordenamientos cronológicos sean naturales."
        ]
      },
      {
        "title": "Filtros y comparaciones de fechas en formato ISO",
        "explanation": "Gracias al formato ISO `AAAA-MM-DD`, puedes comparar fechas con operadores normales como `>`, `<` o `BETWEEN` con total precisión:",
        "codeSnippet": "-- Consultamos empleados contratados a partir del año 2022 en adelante\nSELECT nombre, fecha_ingreso\nFROM empleados\nWHERE fecha_ingreso >= '2022-01-01'\nORDER BY fecha_ingreso ASC;",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------+---------------+\n| nombre         | fecha_ingreso |\n+----------------+---------------+\n| Carlos Mendoza | 2022-03-15    |\n| Mateo Díaz     | 2023-01-10    |\n| Andrés Solano  | 2024-02-01    |\n+----------------+---------------+\n3 filas devueltas",
        "byteTip": "En SQLite también existe la función date('now') para obtener la fecha actual del sistema.",
        "pitfallTip": "Asegúrate de incluir los ceros a la izquierda en meses y días de un dígito (usa \"2024-03-05\", nunca \"2024-3-5\").",
        "keyPoints": [
          "Las fechas ISO admiten comparaciones directas con >= y <=.",
          "Permite ordenar cronológicamente de forma nativa sin funciones costosas.",
          "Es el formato que utiliza Room y Kotlin por defecto para persistir fechas."
        ]
      }
    ]
  },
  "sql-u03-l06": {
    "id": "sql-th-u03-l06",
    "lessonId": "sql-u03-l06",
    "pathId": "sql",
    "unitId": 3,
    "levelId": 6,
    "title": "6. Flexibilidad de tipos en SQLite",
    "subtitle": "Comprende la afinidad de tipos y la famosa flexibilidad interna de SQLite.",
    "estimatedMinutes": 8,
    "analogy": "Un estacionamiento con letreros recomendados: hay plazas marcadas \"autos pequeños\", pero si llega una camioneta, el estacionamiento es flexible y la deja parquear. SQLite recomienda tipos (afinidad), pero prioriza guardar tus datos antes que detener el programa.",
    "video": {
      "title": "CREATE TABLE y Tipos de Datos en SQLite",
      "channel": "Fazt Code",
      "duration": "38:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Creación de esquemas DDL, afinidades INTEGER, REAL, TEXT, BLOB y flexibilidad de tipos."
    },
    "sections": [
      {
        "title": "La afinidad de tipos en SQLite (Type Affinity)",
        "explanation": "En la mayoría de las bases de datos tradicionales (como PostgreSQL o SQL Server), los tipos son rígidos y estrictos: si defines una columna como `INTEGER` e intentas meter el texto `\"hola\"`, la base de datos rechaza la operación inmediatamente.\n\nSQLite funciona bajo un concepto diferente llamado **Afinidad de Tipos** (*Type Affinity*):\n• La columna tiene una afinidad preferida (por ejemplo `INTEGER`).\n• Si insertas un dato que se puede convertir a ese tipo (por ejemplo, el texto `\"42\"`), SQLite lo convierte automáticamente a número entero `42`.\n• Si insertas un dato incompatible, SQLite es flexible y lo almacena con su tipo real en lugar de romperse.\n\nLas 5 afinidades oficiales de SQLite son: **TEXT**, **NUMERIC**, **INTEGER**, **REAL** y **BLOB**.",
        "codeSnippet": "-- SQLite intenta convertir textos numéricos a su afinidad nativa\nSELECT id, nombre, precio, (precio + 10) AS precio_con_recargo\nFROM productos\nWHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------------+--------+---------------------++\n| id | nombre               | precio | precio_con_recargo  |\n+----+----------------------+--------+---------------------+\n| 1  | Teclado Mecánico RGB | 89.99  | 99.99               |\n+----+----------------------+--------+---------------------+\n1 fila devuelta",
        "byteTip": "Aunque SQLite sea flexible, en Android con Room se imponen restricciones estrictas para garantizar calidad de datos profesional.",
        "pitfallTip": "No te confíes de la flexibilidad de SQLite guardando datos caóticos. Declara siempre tus columnas con tipos rigurosos y coherentes.",
        "keyPoints": [
          "SQLite utiliza afinidades de tipos en lugar de tipado estático rígido.",
          "Convierte automáticamente datos compatibles a la afinidad de la columna.",
          "Room en Android añade una capa de validación estricta sobre esta flexibilidad."
        ]
      },
      {
        "title": "Modo STRICT de SQLite en versiones modernas",
        "explanation": "Para los programadores que prefieren que la base de datos rechace cualquier dato incompatible de inmediato, SQLite 3.37+ introdujo las **tablas STRICT**:\n`CREATE TABLE usuarios (...) STRICT;`\nEn una tabla marcada con `STRICT`, SQLite desactiva su flexibilidad y se comporta con la misma rigidez estricta que PostgreSQL.",
        "codeSnippet": "-- Consulta estándar en SQLite sobre tipos numéricos y de texto bien estructurados\nSELECT id, nombre, stock\nFROM productos\nWHERE stock > 50;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+------------------------+-------+\n| id | nombre                 | stock |\n+----+------------------------+-------+\n| 3  | Mouse Ergonómico Pro   | 80    |\n| 5  | Cable HDMI 2.1 Braided | 150   |\n+----+------------------------+-------+\n2 filas devueltas",
        "byteTip": "Definir siempre tipos claros como INTEGER, REAL y TEXT hace que tu código sea compatible con cualquier motor de bases de datos.",
        "pitfallTip": "Evita crear tablas sin declarar los tipos de columna.",
        "keyPoints": [
          "Las tablas STRICT imponen tipado rígido si así lo requieres.",
          "Escribir esquemas con tipos limpios es la mejor práctica de ingeniería.",
          "Facilita la migración futura de SQLite a otros motores si tu app crece a la nube."
        ]
      }
    ]
  }
};
