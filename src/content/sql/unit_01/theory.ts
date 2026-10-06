import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_01_THEORY: Record<string, TheoryLesson> = {
  'sql-u01-l01': {
    id: 'sql-th-u01-l01',
    lessonId: 'sql-u01-l01',
    pathId: 'sql',
    unitId: 1,
    levelId: 1,
    title: '1. ¿Qué es una Base de Datos y un RDBMS?',
    subtitle: 'El motor detrás del almacenamiento masivo, persistente y estructurado del mundo.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'De Archivos de Texto a Sistemas Relacionales',
        explanation: 'Una base de datos es un contenedor persistente optimizado para almacenar, buscar y relacionar volúmenes masivos de información de forma segura.\n\nUn RDBMS (Relational Database Management System) es el software que administra ese almacenamiento garantizando integridad y velocidad. Los motores más utilizados del mundo son PostgreSQL, MySQL y SQLite.',
        codeSnippet: '-- SQL es un lenguaje declarativo: defines QUÉ quieres obtener,\n-- y el optimizador del motor decide CÓMO buscarlo.\nSELECT version();',
        codeLanguage: 'sql',
        byteTip: 'SQLite es el motor de base de datos más desplegado del planeta: reside dentro de cada smartphone, navegador y televisor inteligente.',
        keyPoints: [
          'RDBMS significa Sistema de Gestión de Bases de Datos Relacionales.',
          'SQL es el estándar internacional para comunicarse con cualquier motor relacional.',
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
    subtitle: 'La cuadrícula bidimensional que estructura la información.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'La Anatomía de una Tabla Relacional',
        explanation: 'En el modelo relacional, toda la información se organiza en Tablas (entidades):\n- Columnas (Atributos): Definen la estructura y el tipo de dato (ej. `nombre`, `precio`, `creado_en`). Son verticales y fijas.\n- Filas (Registros / Tuplas): Representan cada elemento individual concreto guardado en la tabla. Son horizontales y crecen dinámicamente.',
        codeSnippet: '-- Estructura conceptual de la tabla "usuarios":\n-- [id] | [nombre]  | [email]         | [activo]\n--  1   | "Ada"     | "ada@dev.org"   | 1\n--  2   | "Linus"   | "linus@os.org"  | 1',
        codeLanguage: 'sql',
        byteTip: 'Las columnas se diseñan una sola vez al crear la tabla; las filas se insertan y borran constantemente en el día a día.',
        keyPoints: [
          'Una columna define qué tipo de información puede existir.',
          'Una fila es una entidad completa individual con sus valores específicos.',
          'El cruce entre una fila y una columna es un campo o celda de dato.'
        ]
      }
    ]
  },
  'sql-u01-l03': {
    id: 'sql-th-u01-l03',
    lessonId: 'sql-u01-l03',
    pathId: 'sql',
    unitId: 1,
    levelId: 3,
    title: '3. Tipos de Datos en Bases de Datos SQL',
    subtitle: 'INTEGER, TEXT, REAL/DECIMAL y fechas.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Restricción de Formato en Cada Columna',
        explanation: 'A diferencia de una hoja de cálculo donde puedes mezclar textos y números en la misma columna, un RDBMS exige que cada columna tenga un tipo de dato estricto:\n- `INTEGER`: Números enteros sin decimales (IDs, cantidades, edades).\n- `TEXT` / `VARCHAR`: Cadenas de caracteres alfanuméricas entre comillas simples.\n- `REAL` / `DECIMAL`: Números con coma decimal para precios y coordenadas.\n- `BOOLEAN`: Banderas de verdadero (1) o falso (0).',
        codeSnippet: 'CREATE TABLE productos (\n    id INTEGER,\n    nombre TEXT,\n    precio REAL\n);',
        codeLanguage: 'sql',
        byteTip: 'En SQL estándar, los textos y fechas se encierran siempre entre comillas simples (\' \'), NO dobles.',
        keyPoints: [
          'El tipo de dato previene que se guarden valores corruptos en la base.',
          'INTEGER y REAL permiten ejecutar funciones matemáticas como SUM y AVG.',
          'TEXT almacena desde un código postal hasta un libro entero.'
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
    subtitle: 'El identificador irrepetible que distingue cada registro del universo.',
    estimatedMinutes: 4,
    sections: [
      {
        title: 'Identificación Única de Filas',
        explanation: 'En el mundo real pueden existir dos clientes llamados "Juan Pérez" nacidos el mismo día. Para evitar duplicidad y ambigüedades, toda tabla bien diseñada debe tener una Clave Primaria (`PRIMARY KEY`).\n\nUna clave primaria garantiza dos reglas inviolables:\n1. Es única: no pueden existir dos filas con el mismo valor de clave primaria.\n2. No puede ser nula (`NOT NULL` obligatorio).',
        codeSnippet: 'CREATE TABLE usuarios (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    email TEXT NOT NULL UNIQUE\n);',
        codeLanguage: 'sql',
        byteTip: 'El motor SQL crea automáticamente un índice B-Tree sobre la clave primaria para realizar búsquedas en microsegundos.',
        keyPoints: [
          'La clave primaria identifica de forma inequívoca a un registro.',
          'Habitualmente se utiliza un identificador numérico secuencial (id).',
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
    subtitle: 'Cómo pedirle a la base de datos que te muestre todos sus registros.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Consultando la Totalidad de una Tabla',
        explanation: 'La instrucción más elemental para consultar datos en SQL combina dos cláusulas obligatorias:\n- `SELECT`: Especifica qué columnas quieres ver en la respuesta.\n- `*` (asterisco): Comodín que representa "todas las columnas de la tabla".\n- `FROM`: Indica de qué tabla provienen los datos.',
        codeSnippet: 'SELECT * FROM clientes;\n-- Devuelve todas las columnas y todas las filas de la tabla clientes',
        codeLanguage: 'sql',
        byteTip: 'En producción con millones de filas, SELECT * puede saturar la red. Úsalo para explorar; en tu API pide solo lo necesario.',
        keyPoints: [
          'Toda consulta de lectura inicia con la palabra SELECT.',
          'El asterisco * selecciona todas las columnas definidas en el esquema.',
          'Las sentencias SQL se terminan convencionalmente con punto y coma (;).'
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
    subtitle: 'Optimización de red y memoria extrayendo solo lo que tu interfaz necesita.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Proyectando un Solo Atributo',
        explanation: 'En lugar de transferir columnas pesadas como contraseñas encriptadas, fotos o descripciones largas que no vas a mostrar, debes nombrar expresamente la columna requerida en la cláusula `SELECT`.',
        codeSnippet: 'SELECT email FROM usuarios;\n-- Solo devuelve la columna de correos electrónicos, ahorrando ancho de banda',
        codeLanguage: 'sql',
        byteTip: 'Esta técnica se llama "proyección" y reduce drásticamente el consumo de memoria en servidores de alto tráfico.',
        keyPoints: [
          'Proyectar solo las columnas necesarias mejora la velocidad de respuesta.',
          'El resultado conserva el orden de filas original a menos que uses ORDER BY.',
          'Los nombres de columna no llevan comillas a menos que contengan espacios.'
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
    subtitle: 'Separación por comas y selección selectiva de campos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Comas entre Atributos',
        explanation: 'Para consultar dos o más columnas específicas, simplemente sepáralas con una coma `,` en el orden exacto en que deseas que aparezcan en la tabla de salida.\n\nNota crítica: la última columna antes de `FROM` NO debe llevar coma.',
        codeSnippet: 'SELECT id, nombre, precio FROM productos;\n-- Correcto: comas separando id y nombre, pero no después de precio',
        codeLanguage: 'sql',
        byteTip: 'Un error novato muy frecuente es poner una coma al final antes de FROM (SELECT a, b, FROM t). El analizador SQL lo rechazará.',
        keyPoints: [
          'Las comas separan los campos que deseas proyectar.',
          'Puedes pedir las columnas en un orden distinto al que tienen en la tabla física.',
          'El motor respetará el orden de proyección indicado en el SELECT.'
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
    subtitle: 'Renombrar columnas de salida para que tu frontend las entienda fácilmente.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Nombres Amigables en el Resultado',
        explanation: 'En muchas bases de datos heredadas, las columnas tienen nombres crípticos como `usr_fnm_txt` o `cli_tel_num`. Con la palabra clave `AS`, puedes asignarle un alias legible a cualquier columna para la respuesta final.',
        codeSnippet: 'SELECT nombre AS nombre_completo, precio AS costo_dolares FROM productos;\n\n-- También sirve para nombrar cálculos:\nSELECT precio * 2 AS doble_precio FROM articulos;',
        codeLanguage: 'sql',
        byteTip: 'El alias no cambia el nombre en la tabla física; solo modifica la cabecera en el reporte que te entrega el motor.',
        keyPoints: [
          'AS permite renombrar cualquier columna en la respuesta.',
          'Es indispensable para bautizar cálculos matemáticos en la proyección.',
          'Ayuda a desacoplar el esquema interno de base de datos de tu API REST.'
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
    subtitle: 'Obtén conjuntos de valores únicos sin repeticiones.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Filtrando Filas Duplicadas en la Salida',
        explanation: 'Si tienes 1,000 clientes pero muchos viven en el mismo país, `SELECT pais FROM clientes` repetirá "México" o "España" cientos de veces. Anteponiendo `DISTINCT` justo después de `SELECT`, el motor descarta las repeticiones y entrega valores únicos.',
        codeSnippet: 'SELECT DISTINCT pais FROM clientes;\n-- Devuelve cada país una sola vez\n\nSELECT DISTINCT categoria FROM productos;',
        codeLanguage: 'sql',
        byteTip: 'DISTINCT opera sobre la combinación de todas las columnas proyectadas en el SELECT.',
        keyPoints: [
          'DISTINCT va inmediatamente después de la palabra SELECT.',
          'Colapsa duplicados en un único registro representativo.',
          'Es ideal para rellenar menús desplegables (dropdowns) en aplicaciones.'
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
    subtitle: 'El filtro que decide qué filas tienen derecho a pasar a la respuesta.',
    estimatedMinutes: 4,
    sections: [
      {
        title: 'La Cláusula WHERE',
        explanation: 'Sin `WHERE`, una consulta devuelve todas las filas de la tabla. Con `WHERE`, el motor examina cada fila individualmente y evalúa una condición booleana: si la condición es verdadera (`true`), la fila se incluye en el resultado; si es falsa o nula, se descarta.',
        codeSnippet: 'SELECT * FROM usuarios WHERE rol = \'admin\';\n-- Solo devuelve a los usuarios con rol de administrador',
        codeLanguage: 'sql',
        byteTip: 'WHERE se ejecuta ANTES que el SELECT. El motor primero filtra las filas y luego proyecta las columnas solicitadas.',
        keyPoints: [
          'WHERE filtra filas bajo criterios lógicos precisos.',
          'Se coloca siempre después de la cláusula FROM.',
          'Si ninguna fila cumple la condición, el resultado será una tabla vacía sin error.'
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
    subtitle: 'Búsquedas de coincidencia exacta en números y texto.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'El Operador = en SQL',
        explanation: 'En SQL, a diferencia de lenguajes como JavaScript o Kotlin donde se usa `==`, la igualdad se verifica con un solo signo `=`. Compara el valor almacenado en la columna con el valor esperado.',
        codeSnippet: '-- Comparando enteros:\nSELECT * FROM pedidos WHERE estado_id = 1;\n\n-- Comparando cadenas (con comillas simples):\nSELECT * FROM clientes WHERE email = \'dev@prograpp.org\';',
        codeLanguage: 'sql',
        byteTip: 'En SQL no existe el operador ==. Escribir == causará un error de sintaxis en el 99% de los motores relacionales.',
        keyPoints: [
          'Un solo signo = verifica igualdad estricta.',
          'Los textos deben ir obligatoriamente entre comillas simples \' \'.',
          'Los números se comparan directamente sin comillas.'
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
    subtitle: 'Excluyendo valores que no deseas ver en tu reporte.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'El Estándar ANSI <> y el Moderno !=',
        explanation: 'Para excluir filas que coincidan con un valor, SQL ofrece dos operadores equivalentes:\n- `<>`: La sintaxis oficial histórica del estándar ANSI SQL (menor o mayor que, es decir, distinto).\n- `!=`: La sintaxis moderna compatible con casi todos los motores modernos.',
        codeSnippet: 'SELECT * FROM productos WHERE precio <> 0;\nSELECT * FROM usuarios WHERE estado != \'bloqueado\';',
        codeLanguage: 'sql',
        byteTip: 'Ambos operadores funcionan de forma idéntica en SQLite y PostgreSQL. Usar <> demuestra conocimiento del estándar ANSI clásico.',
        keyPoints: [
          '<> y != son 100% sinónimos en la inmensa mayoría de motores.',
          'Ojo: si un campo contiene NULL, ni = ni != lo incluirán (los nulos requieren IS NULL).',
          'Permiten descartar rápidamente estados cancelados o inactivos.'
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
    subtitle: 'Filtros numéricos de mayor y menor que.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Comparando Rangos Estrictos',
        explanation: 'Los operadores `>` (mayor que) y `<` (menor que) son estrictos: no incluyen el valor límite de comparación. Son ideales para filtrar por stock mínimo, límites de crédito o fechas pasadas.',
        codeSnippet: 'SELECT * FROM productos WHERE precio > 50;\n-- No incluye los productos de exactamente 50.00 dólares\n\nSELECT * FROM alumnos WHERE edad < 18;',
        codeLanguage: 'sql',
        byteTip: 'También puedes usar > y < con fechas en formato ISO \'YYYY-MM-DD\': WHERE fecha > \'2024-01-01\'.',
        keyPoints: [
          '> y < no son inclusivos con el borde de comparación.',
          'Operan sobre tipos numéricos y fechas ordenadas alfabéticamente.',
          'Asegúrate de que la columna sea INTEGER, REAL o DATE para comparaciones correctas.'
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
    subtitle: 'Filtros que incluyen explícitamente el valor límite.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Mayor/Menor o Igual que',
        explanation: 'Cuando una regla de negocio dice *"usuarios mayores de edad"* o *"productos de hasta 100 dólares"*, el valor límite debe ser admitido. Para eso usamos `>=` (mayor o igual) y `<=` (menor o igual).',
        codeSnippet: 'SELECT * FROM clientes WHERE edad >= 18;\n-- Una persona de 18 años exactos SÍ es incluida en la salida\n\nSELECT * FROM articulos WHERE precio <= 100;',
        codeLanguage: 'sql',
        byteTip: 'El signo de mayor o menor siempre va primero: >= y <=. Escribir => o =< provocará un error de sintaxis.',
        keyPoints: [
          '>= y <= incluyen el valor de referencia.',
          'El orden de los caracteres es estricto: primero el símbolo angular, luego el igual.',
          'Modelan con precisión las reglas legales y comerciales de la vida real.'
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
    subtitle: 'Cuando múltiples condiciones deben ser obligatoriamente verdaderas.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Intersección de Criterios',
        explanation: 'El operador `AND` une dos o más condiciones lógicas. Para que una fila sea seleccionada, TODAS las condiciones conectadas por `AND` deben cumplirse simultáneamente.',
        codeSnippet: 'SELECT * FROM productos \nWHERE precio > 20 AND categoria = \'Electrónica\';\n-- Solo pasan los productos que son caros Y que pertenecen a electrónica',
        codeLanguage: 'sql',
        byteTip: 'Cada AND adicional restringe y reduce el número de filas devueltas (filtro más estricto).',
        keyPoints: [
          'True AND True = True; cualquier otra combinación es False.',
          'Permite cruzar criterios de distintas columnas en una sola consulta.',
          'Se pueden encadenar múltiples AND: WHERE a = 1 AND b = 2 AND c = 3.'
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
    subtitle: 'Por qué mezclar AND y OR sin paréntesis es una bomba de tiempo.',
    estimatedMinutes: 4,
    sections: [
      {
        title: 'Disyunción y Precedencia en WHERE',
        explanation: 'El operador `OR` exige que al menos UNA de las condiciones sea verdadera. Si una se cumple, la fila pasa.\n\n¡PELIGRO CRÍTICO!: En SQL, el operador `AND` tiene mayor precedencia que `OR`. Si escribes `A OR B AND C`, el motor evaluará primero `(B AND C)` y luego el `OR A`, lo que suele causar fugas de datos de seguridad.',
        codeSnippet: '-- Consulta peligrosa y errónea:\nSELECT * FROM usuarios WHERE rol = \'admin\' OR rol = \'editor\' AND activo = 1;\n\n-- Consulta segura y correcta con paréntesis:\nSELECT * FROM usuarios WHERE (rol = \'admin\' OR rol = \'editor\') AND activo = 1;',
        codeLanguage: 'sql',
        byteTip: 'Regla de seguridad: SIEMPRE que combines AND y OR en la misma consulta, encierra las cláusulas OR entre paréntesis ().',
        keyPoints: [
          'OR amplía el universo de resultados; basta con cumplir una sola condición.',
          'AND se evalúa antes que OR por regla de precedencia.',
          'Los paréntesis fuerzan el orden deseado y previenen brechas de seguridad.'
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
    subtitle: 'Sustituyendo combinaciones engorrosas de >= y <= por una sintaxis elegante.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Filtrando Intervalos Cerrados',
        explanation: 'En lugar de escribir `WHERE precio >= 10 AND precio <= 50`, SQL ofrece la palabra reservada `BETWEEN ... AND ...`. Es 100% inclusivo en ambos extremos.',
        codeSnippet: 'SELECT * FROM productos WHERE precio BETWEEN 10 AND 50;\n-- Incluye tanto el 10.00 como el 50.00\n\nSELECT * FROM pedidos WHERE fecha BETWEEN \'2024-01-01\' AND \'2024-01-31\';',
        codeLanguage: 'sql',
        byteTip: 'El valor menor SIEMPRE debe ir primero. Escribir BETWEEN 50 AND 10 devolverá cero resultados.',
        keyPoints: [
          'BETWEEN es inclusivo con el límite inferior y superior.',
          'Equivale exactamente a: (columna >= min AND columna <= max).',
          'También puedes negar el rango con: NOT BETWEEN 10 AND 50.'
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
    subtitle: 'Reemplazando cadenas interminables de ORs por una lista compacta.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '¿Está el valor dentro de esta lista?',
        explanation: 'Si necesitas verificar si un cliente pertenece a México, Colombia, España o Argentina, encadenar `OR pais = \'...\'` es largo y propenso a errores. El operador `IN` permite definir una tupla de valores válidos entre paréntesis.',
        codeSnippet: 'SELECT * FROM clientes \nWHERE pais IN (\'México\', \'Colombia\', \'España\');\n\n-- Excluyendo con NOT IN:\nSELECT * FROM pedidos WHERE estado NOT IN (\'cancelado\', \'devuelto\');',
        codeLanguage: 'sql',
        byteTip: 'El motor SQL optimiza las cláusulas IN usando tablas hash internas, siendo mucho más rápido que múltiples OR.',
        keyPoints: [
          'IN (...) verifica si el valor de la columna coincide con cualquiera de los ítems.',
          'NOT IN (...) excluye a todos los valores de la lista.',
          'Adelante en la carrera, IN permite albergar Subconsultas completas.'
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
    subtitle: 'Encontrando coincidencias parciales con los comodines % y _.',
    estimatedMinutes: 4,
    sections: [
      {
        title: 'Búsquedas de Texto Parciales',
        explanation: 'El operador `=` solo encuentra coincidencias idénticas exactas. Con `LIKE` podemos realizar búsquedas difusas usando dos comodines especiales:\n- `%` (porcentaje): Representa cero, uno o múltiples caracteres arbitrarios.\n- `_` (guión bajo): Representa exactamente UN solo carácter cualquiera.',
        codeSnippet: '-- Todos los correos de Gmail:\nSELECT * FROM usuarios WHERE email LIKE \'%@gmail.com\';\n\n-- Nombres que comienzan con "Car" (Carlos, Carmen, Carolina):\nSELECT * FROM clientes WHERE nombre LIKE \'Car%\';\n\n-- Palabras que contengan "pro" en cualquier parte:\nSELECT * FROM productos WHERE nombre LIKE \'%pro%\';',
        codeLanguage: 'sql',
        byteTip: 'En SQLite y PostgreSQL, LIKE suele ser insensible a mayúsculas para caracteres ASCII por defecto.',
        keyPoints: [
          '% sustituye cualquier secuencia de texto de cualquier longitud.',
          '_ sustituye exactamente un carácter en esa posición específica.',
          'LIKE \'%termino%\' es el fundamento detrás de barras de búsqueda básicas.'
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
    subtitle: 'La lógica trivalente de SQL y el operador IS NULL.',
    estimatedMinutes: 4,
    sections: [
      {
        title: 'NULL no es Cero ni Cadena Vacía',
        explanation: 'En bases de datos, `NULL` significa ausencia total de valor o valor desconocido. Por definición filosófica de SQL, dos incógnitas no pueden ser iguales entre sí, por lo que la expresión `NULL = NULL` evalúa a UNKNOWN (falso).\n\nPara buscar valores ausentes, NUNCA uses `= NULL`. La sintaxis obligatoria es `IS NULL` o `IS NOT NULL`.',
        codeSnippet: '-- INCORRECTO (Jamás devolverá nada):\nSELECT * FROM clientes WHERE telefono = NULL;\n\n-- CORRECTO (Encuentra clientes sin teléfono registrado):\nSELECT * FROM clientes WHERE telefono IS NULL;\n\n-- Clientes con teléfono confirmado:\nSELECT * FROM clientes WHERE telefono IS NOT NULL;',
        codeLanguage: 'sql',
        byteTip: '¡Este es el bug número 1 en entrevistas técnicas de SQL! Recuerda siempre: en SQL el nulo se pregunta con IS, nunca con =.',
        keyPoints: [
          'NULL representa un dato ausente o desconocido.',
          '= NULL siempre falla y no devuelve registros.',
          'IS NULL y IS NOT NULL son las únicas formas válidas de verificar nulidad en SQL.'
        ]
      }
    ]
  }
};
