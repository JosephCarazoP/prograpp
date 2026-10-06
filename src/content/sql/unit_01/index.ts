import { Lesson, Exercise } from '../../../types/lesson';

// Base de preguntas pedagógicas por nivel de SQL (Unidad 1)
// Cada nivel tiene 10 preguntas específicas y variadas con rotación de opciones correctas
const SQL_TOPIC_BANKS: Record<number, { title: string; desc: string; exercises: Exercise[] }> = {
  1: {
    title: '1. El Mundo de los Datos y RDBMS',
    desc: 'Bases de datos relacionales, persistencia y el lenguaje declarativo SQL.',
    exercises: [
      {
        id: 'sql-u01-l01-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los términos fundamentales de bases de datos:',
        pairs: [
          { left: 'Base de Datos', right: 'Almacén persistente de información estructurada' },
          { left: 'RDBMS', right: 'Software gestor (PostgreSQL, MySQL, SQLite)' },
          { left: 'SQL', right: 'Lenguaje declarativo para consultar datos' },
          { left: 'Persistencia', right: 'Los datos no se pierden al apagar el equipo' }
        ],
        explanation: 'SQL (Structured Query Language) es el estándar internacional para comunicarse con motores RDBMS.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l01-e02',
        type: 'predict_output',
        prompt: '¿Por qué las empresas usan un RDBMS en lugar de guardar datos en un archivo de texto .txt?',
        code: '-- Archivo vs RDBMS\n-- ¿Qué ventaja ofrece un RDBMS?',
        options: [
          'Es más lento pero usa menos disco',
          'Garantiza integridad, concurrencia de miles de usuarios y búsquedas instantáneas',
          'Solo funciona en computadoras sin internet',
          'No permite guardar números'
        ],
        correctOptionIndex: 1,
        explanation: 'Los RDBMS manejan transacciones ACID, evitando pérdidas de datos y bloqueos cuando muchos usuarios acceden a la vez.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l01-e03',
        type: 'code_cloze',
        prompt: 'Completa el significado de las siglas SQL:',
        codeWithBlank: 'SQL = Structured ___ Language',
        options: ['Query', 'Quick', 'Quantity', 'Quality'],
        correctOption: 'Query',
        explanation: 'Query significa consulta; SQL es el lenguaje estructurado de consultas.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l01-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la afirmación errónea sobre los motores relacionales:',
        codeSnippet: [
          'PostgreSQL es un RDBMS relacional',
          'SQLite guarda la base de datos en un solo archivo local',
          'SQL solo puede ejecutarse en hojas de cálculo de Excel'
        ],
        bugLineIndex: 2,
        explanation: 'SQL es un estándar universal de motores de bases de datos, no es exclusivo ni depende de hojas de cálculo como Excel.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l01-e05',
        type: 'code_builder',
        prompt: 'Arma la instrucción más básica para consultar la versión del motor SQL:',
        tokens: ['SELECT', 'version', '(', ')', ';', 'FROM', 'WHERE'],
        solution: ['SELECT', 'version', '(', ')', ';'],
        explanation: 'SELECT permite evaluar funciones del sistema como version() en la mayoría de motores SQL.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l01-e06',
        type: 'predict_output',
        prompt: '¿Qué significa que SQL sea un lenguaje "declarativo"?',
        code: 'SELECT * FROM clientes WHERE pais = \'Chile\';',
        options: [
          'Debes programar el algoritmo de búsqueda con bucles for',
          'Solo funciona si declaras variables globales',
          'Indicas qué datos quieres obtener, y el motor decide cómo buscarlos eficientemente',
          'Requiere compilar un archivo binario .exe'
        ],
        correctOptionIndex: 2,
        explanation: 'En lenguajes declarativos especificas el resultado deseado; el optimizador de consultas del motor planea el algoritmo interno.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l01-e07',
        type: 'code_cloze',
        prompt: '¿Qué motor RDBMS es famoso por venir integrado en celulares Android e iOS?',
        codeWithBlank: 'El motor embebido sin servidor más usado del mundo es ___:',
        options: ['SQLite', 'Oracle', 'Cassandra', 'Redis'],
        correctOption: 'SQLite',
        explanation: 'SQLite es un motor ligero que no requiere proceso servidor y almacena todo en un único fichero.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l01-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los motores con su característica principal:',
        pairs: [
          { left: 'PostgreSQL', right: 'Motor de código abierto muy avanzado' },
          { left: 'SQLite', right: 'Embebido en apps móviles y navegadores' },
          { left: 'MySQL', right: 'Muy popular en la web tradicional LAMP' },
          { left: 'SQL Server', right: 'Desarrollado por Microsoft' }
        ],
        explanation: 'Cada motor implementa el estándar SQL con optimizaciones particulares para distintos escenarios.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l01-e09',
        type: 'predict_output',
        prompt: '¿Qué signo ortográfico se utiliza convencionalmente para terminar una sentencia SQL?',
        code: 'SELECT 1 + 1___',
        options: [':', '.', ';', '//'],
        correctOptionIndex: 2,
        explanation: 'El punto y coma (;) es el delimitador oficial de sentencias en el estándar SQL.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l01-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena el flujo de interacción de una aplicación con la base de datos:',
        lines: [
          'La app envía una consulta SQL al motor RDBMS',
          'El motor procesa y busca los registros en disco',
          'El motor devuelve la tabla de resultados a la app'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La aplicación cliente solicita, el servidor de base de datos procesa y finalmente envía los registros devueltos.',
        xpReward: 20
      }
    ]
  },
  2: {
    title: '2. Tablas, Filas y Columnas',
    desc: 'La estructura cartesiana donde reside la información.',
    exercises: [
      {
        id: 'sql-u01-l02-e01',
        type: 'matching_pairs',
        prompt: 'Empareja cada elemento visual con su concepto técnico formal:',
        pairs: [
          { left: 'Tabla (Relación)', right: 'Conjunto de registros del mismo tipo' },
          { left: 'Fila (Tupla / Registro)', right: 'Una entidad concreta con todos sus datos' },
          { left: 'Columna (Campo / Atributo)', right: 'Una propiedad homogénea común' },
          { left: 'Celda', right: 'Intersección de una fila y una columna' }
        ],
        explanation: 'Una tabla es una matriz bidimensional donde las columnas definen atributos y las filas instancias reales.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l02-e02',
        type: 'predict_output',
        prompt: 'Si una tabla de \'usuarios\' tiene 50 personas registradas, ¿cuántas filas (tuplas) contiene?',
        code: '-- Tabla: usuarios\n-- 50 personas registradas',
        options: ['1 fila', '50 filas', '500 filas', 'Depende de las columnas'],
        correctOptionIndex: 1,
        explanation: 'Cada persona individual registrada ocupa exactamente una fila o tupla en la tabla.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l02-e03',
        type: 'code_cloze',
        prompt: 'El esquema que define el nombre de las columnas y sus tipos en una tabla se llama:',
        codeWithBlank: 'La estructura de columnas de una tabla se denomina ___:',
        options: ['Esquema', 'Tupla', 'Índice', 'Memoria'],
        correctOption: 'Esquema',
        explanation: 'El esquema (schema) es el diseño formal que describe columnas, tipos de datos y restricciones.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l02-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que confunde filas con columnas:',
        codeSnippet: [
          'Una columna define el tipo de dato (por ej. email VARCHAR)',
          'Una fila contiene los datos de un usuario en particular',
          'Cada fila tiene un nombre diferente como \'edad\' o \'precio\''
        ],
        bugLineIndex: 2,
        explanation: 'Quienes tienen nombres como "edad" o "precio" son las columnas, no las filas.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l02-e05',
        type: 'code_builder',
        prompt: 'Arma la instrucción para consultar los nombres de todas las tablas en SQLite:',
        tokens: ['SELECT', 'name', 'FROM', 'sqlite_master', ';', 'WHERE'],
        solution: ['SELECT', 'name', 'FROM', 'sqlite_master', ';'],
        explanation: 'En SQLite, sqlite_master es la tabla del sistema que lista todas las tablas del esquema.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l02-e06',
        type: 'predict_output',
        prompt: 'Si agregamos una columna nueva llamada "telefono" a una tabla con 100 filas existentes, ¿qué pasa?',
        code: '-- ALTER TABLE clientes ADD COLUMN telefono TEXT;\n-- ¿Qué ocurre con las 100 filas?',
        options: [
          'Se borran las 100 filas',
          'Las 100 filas ahora tienen el campo telefono (inicialmente NULL o por defecto)',
          'Produce error irrecuperable',
          'Se crean 100 tablas nuevas'
        ],
        correctOptionIndex: 1,
        explanation: 'La columna se añade a todas las filas de la tabla, con valor nulo si no se definió otro por defecto.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l02-e07',
        type: 'matching_pairs',
        prompt: 'Empareja el término relacional académico con el término coloquial:',
        pairs: [
          { left: 'Relación', right: 'Tabla' },
          { left: 'Tupla', right: 'Fila' },
          { left: 'Atributo', right: 'Columna' },
          { left: 'Cardinalidad', right: 'Número de filas' }
        ],
        explanation: 'El modelo relacional inventado por Edgar F. Codd usa términos formales como relación, tupla y atributo.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l02-e08',
        type: 'code_cloze',
        prompt: '¿Cómo se le llama a un valor que está ausente o no definido en una celda?',
        codeWithBlank: 'Un dato desconocido o no cargado en una celda tiene valor ___:',
        options: ['NULL', 'ZERO', 'VOID', 'UNDEFINED'],
        correctOption: 'NULL',
        explanation: 'En SQL, NULL representa la ausencia de valor o valor desconocido.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l02-e09',
        type: 'predict_output',
        prompt: '¿Pueden dos columnas de la misma tabla tener el mismo nombre exacto?',
        code: '-- Tabla empleados:\n-- ¿Puede haber dos columnas llamadas "salario"?',
        options: [
          'Sí, SQL las diferencia con índices',
          'No, los nombres de columna deben ser únicos dentro de cada tabla',
          'Solo si una es texto y la otra número',
          'Depende del sistema operativo'
        ],
        correctOptionIndex: 1,
        explanation: 'Dentro de una misma tabla, cada columna debe tener un identificador unívoco.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l02-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la jerarquía de una base de datos relacional de mayor a menor contenedor:',
        lines: [
          'Base de Datos (Conjunto de esquemas)',
          'Tabla (Conjunto de filas estructuradas)',
          'Fila (Registro con valores en sus celdas)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La base de datos contiene tablas, y las tablas contienen filas compuestas por celdas.',
        xpReward: 20
      }
    ]
  },
  3: {
    title: '3. Tipos de Datos en Tablas',
    desc: 'Enteros, texto, números con decimales y booleanos.',
    exercises: [
      {
        id: 'sql-u01-l03-e01',
        type: 'matching_pairs',
        prompt: 'Empareja el tipo de columna SQL con el valor correspondiente:',
        pairs: [
          { left: 'INTEGER', right: '42 (edad o cantidad)' },
          { left: 'VARCHAR / TEXT', right: '\'juan@email.com\' (texto)' },
          { left: 'DECIMAL / REAL', right: '19.99 (precio monetario)' },
          { left: 'BOOLEAN', right: 'TRUE / FALSE (activo)' }
        ],
        explanation: 'Tipar correctamente las columnas previene anomalías de cálculo y ahorra almacenamiento.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l03-e02',
        type: 'predict_output',
        prompt: 'Si guardas el número de teléfono con ceros iniciales como "+01800", ¿qué tipo de dato conviene?',
        code: '-- Telefono: "+01-800-123"\n-- ¿Qué tipo usar?',
        options: ['INTEGER', 'TEXT / VARCHAR', 'BOOLEAN', 'REAL'],
        correctOptionIndex: 1,
        explanation: 'Los números de teléfono tienen símbolos (+, -) y ceros a la izquierda que se perderían si fueran números matemáticos.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l03-e03',
        type: 'code_cloze',
        prompt: 'Completa la definición de columna para una fecha de nacimiento:',
        codeWithBlank: 'fecha_nacimiento ___ NOT NULL',
        options: ['DATE', 'NUMBER', 'STRING', 'INT'],
        correctOption: 'DATE',
        explanation: 'DATE almacena fechas (año-mes-día) con validación de calendario integrada.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l03-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde el tipo de dato asignado no tiene sentido:',
        codeSnippet: [
          'id INTEGER PRIMARY KEY,',
          'precio DECIMAL(10, 2),',
          'nombre_completo BOOLEAN -- ¡Un nombre no puede ser booleano!'
        ],
        bugLineIndex: 2,
        explanation: 'El nombre de una persona debe ser TEXT o VARCHAR, jamás BOOLEAN.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l03-e05',
        type: 'code_builder',
        prompt: 'Construye la declaración de una columna de precio con 2 decimales:',
        tokens: ['precio', 'DECIMAL', '(', '10', ',', '2', ')', 'TEXT'],
        solution: ['precio', 'DECIMAL', '(', '10', ',', '2', ')'],
        explanation: 'DECIMAL(10, 2) indica 10 dígitos en total con 2 cifras decimales exactas para dinero.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l03-e06',
        type: 'predict_output',
        prompt: '¿Qué sucede si intentas insertar la palabra \'cien\' en una columna de tipo INTEGER en un RDBMS estricto?',
        code: '-- Columna: edad INTEGER\nINSERT INTO usuarios (edad) VALUES (\'cien\');',
        options: [
          'La convierte automáticamente a 100',
          'Lanza un error de incompatibilidad de tipos (Type Mismatch)',
          'Guarda 0 sin avisar',
          'Se apaga el servidor'
        ],
        correctOptionIndex: 1,
        explanation: 'Los RDBMS estrictos como PostgreSQL rechazan la inserción si el valor no coincide con el tipo de la columna.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l03-e07',
        type: 'code_cloze',
        prompt: '¿Qué tipo de texto limita la longitud máxima a 50 caracteres?',
        codeWithBlank: 'nombre ___(50)',
        options: ['VARCHAR', 'TEXT', 'STRING', 'CHARSET'],
        correctOption: 'VARCHAR',
        explanation: 'VARCHAR(N) es una cadena de longitud variable con límite máximo de N caracteres.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l03-e08',
        type: 'matching_pairs',
        prompt: 'Empareja cada campo de un e-commerce con su tipo ideal:',
        pairs: [
          { left: 'stock_disponible', right: 'INTEGER (unidades enteras)' },
          { left: 'precio_unitario', right: 'DECIMAL (moneda exacta)' },
          { left: 'en_oferta', right: 'BOOLEAN (verdadero o falso)' },
          { left: 'descripcion_larga', right: 'TEXT (texto ilimitado)' }
        ],
        explanation: 'Elegir el tipo óptimo para cada campo optimiza espacio y asegura la exactitud de los cálculos.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l03-e09',
        type: 'predict_output',
        prompt: '¿Cómo se representan los valores booleanos en la salida estándar de SQLite?',
        code: 'SELECT 1 = 1, 1 = 2;',
        options: ['1 y 0', 'TRUE y FALSE siempre', 'YES y NO', 'null y undefined'],
        correctOptionIndex: 0,
        explanation: 'SQLite internamente almacena booleanos como enteros: 1 para verdadero y 0 para falso.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l03-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la declaración de columnas para una tabla de productos:',
        lines: [
          'id INTEGER,',
          'nombre VARCHAR(100),',
          'precio DECIMAL(8, 2)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Por convención, el identificador encabeza la definición, seguido por atributos descriptivos y métricas.',
        xpReward: 20
      }
    ]
  },
  4: {
    title: '4. La Clave Primaria (PRIMARY KEY)',
    desc: 'El identificador irrepetible de cada registro.',
    exercises: [
      {
        id: 'sql-u01-l04-e01',
        type: 'code_cloze',
        prompt: 'Completa la cláusula para designar una columna como clave primaria:',
        codeWithBlank: 'id INTEGER ___ KEY',
        options: ['PRIMARY', 'UNIQUE', 'MAIN', 'FIRST'],
        correctOption: 'PRIMARY',
        explanation: 'PRIMARY KEY garantiza que cada fila tenga un identificador único que nunca se repita ni sea NULL.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l04-e02',
        type: 'predict_output',
        prompt: 'Si intentas insertar dos usuarios distintos con id = 1 en una tabla con PRIMARY KEY, ¿qué ocurre?',
        code: 'INSERT INTO usuarios (id, nombre) VALUES (1, \'Ana\');\nINSERT INTO usuarios (id, nombre) VALUES (1, \'Luis\');',
        options: [
          'Luis sobrescribe a Ana',
          'Se guardan los dos con id 1',
          'Error: infracción de restricción de clave primaria duplicada',
          'Luis recibe id = 2 automáticamente'
        ],
        correctOptionIndex: 2,
        explanation: 'El motor rechaza el segundo registro arrojando un error de Primary Key Violation.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l04-e03',
        type: 'matching_pairs',
        prompt: 'Empareja los atributos de una clave primaria:',
        pairs: [
          { left: 'Unicidad', right: 'No pueden existir dos filas con el mismo valor' },
          { left: 'No Nulo (NOT NULL)', right: 'Toda fila debe tener un ID asignado obligatoriamente' },
          { left: 'Inmutabilidad', right: 'El ID nunca debería cambiarse en el tiempo' },
          { left: 'Auto-incremento', right: 'El motor genera números 1, 2, 3... secuenciales' }
        ],
        explanation: 'Una buena clave primaria identifica unívocamente la tupla a lo largo de toda su vida útil.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l04-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error al definir la clave primaria:',
        codeSnippet: [
          'CREATE TABLE clientes (',
          '    id INTEGER PRIMARY KEY,',
          '    dni VARCHAR(20) PRIMARY KEY -- ¡Una tabla solo puede tener una PRIMARY KEY!'
        ],
        bugLineIndex: 2,
        explanation: 'Una tabla solo puede tener UNA clave primaria. Si dni debe ser único, se usa la restricción UNIQUE.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l04-e05',
        type: 'code_builder',
        prompt: 'Construye la definición completa de un campo ID auto-incremental en SQLite:',
        tokens: ['id', 'INTEGER', 'PRIMARY', 'KEY', 'AUTOINCREMENT', 'TEXT'],
        solution: ['id', 'INTEGER', 'PRIMARY', 'KEY', 'AUTOINCREMENT'],
        explanation: 'INTEGER PRIMARY KEY AUTOINCREMENT delega al motor la asignación del siguiente número correlativo.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l04-e06',
        type: 'predict_output',
        prompt: '¿Por qué no es recomendable usar el nombre de una persona como clave primaria?',
        code: '-- PRIMARY KEY (nombre_completo)\n-- ¿Por qué es una mala práctica?',
        options: [
          'Porque SQL no soporta letras en claves primarias',
          'Porque puede haber personas con el mismo nombre (homónimos) o cambiar su apellido',
          'Porque consume más memoria RAM que un número',
          'Porque solo se admiten números romanos'
        ],
        correctOptionIndex: 1,
        explanation: 'Los nombres cambian y se repiten; por ello se prefieren claves subrogadas artificiales (como IDs numéricos o UUIDs).',
        xpReward: 10
      },
      {
        id: 'sql-u01-l04-e07',
        type: 'code_cloze',
        prompt: '¿Qué palabra clave asegura que un campo jamás acepte valores vacíos?',
        codeWithBlank: 'email VARCHAR(100) NOT ___',
        options: ['NULL', 'EMPTY', 'ZERO', 'VOID'],
        correctOption: 'NULL',
        explanation: 'NOT NULL obliga a que la columna siempre tenga un valor definido al insertar o actualizar.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l04-e08',
        type: 'predict_output',
        prompt: 'En PostgreSQL, ¿qué tipo especial crea automáticamente una secuencia numérica auto-incremental?',
        code: 'id SERIAL PRIMARY KEY;',
        options: [
          'Genera automáticamente 1, 2, 3...',
          'Genera texto aleatorio',
          'Genera solo números pares',
          'Requiere escribir el ID a mano siempre'
        ],
        correctOptionIndex: 0,
        explanation: 'SERIAL en PostgreSQL crea un entero respaldado por una secuencia auto-incremental.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l04-e09',
        type: 'code_builder',
        prompt: 'Arma la clave primaria compuesta por dos columnas (pedido_id y producto_id):',
        tokens: ['PRIMARY', 'KEY', '(', 'pedido_id', ',', 'producto_id', ')'],
        solution: ['PRIMARY', 'KEY', '(', 'pedido_id', ',', 'producto_id', ')'],
        explanation: 'Una clave primaria compuesta combina dos o más columnas para garantizar unicidad conjunta.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l04-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la creación de una tabla sencilla con su clave primaria al inicio:',
        lines: [
          'CREATE TABLE usuarios (',
          '    id INTEGER PRIMARY KEY,',
          '    email TEXT NOT NULL',
          ');'
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: 'Se abre la definición de tabla con CREATE TABLE, se declaran los campos y se cierra con paréntesis y punto y coma.',
        xpReward: 20
      }
    ]
  },
  5: {
    title: '5. La Consulta Universal: SELECT *',
    desc: 'Cómo proyectar todas las columnas y filas de una tabla.',
    exercises: [
      {
        id: 'sql-u01-l05-e01',
        type: 'code_builder',
        prompt: 'Arma la consulta para extraer absolutamente todos los datos de la tabla \'usuarios\':',
        tokens: ['SELECT', '*', 'FROM', 'usuarios', ';', 'WHERE', 'ORDER'],
        solution: ['SELECT', '*', 'FROM', 'usuarios', ';'],
        explanation: 'El asterisco (*) es el comodín de SQL que proyecta todas las columnas de la tabla origen.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l05-e02',
        type: 'predict_output',
        prompt: '¿Qué devuelve la consulta "SELECT * FROM productos;" si la tabla está completamente vacía?',
        code: 'SELECT * FROM productos;',
        options: [
          '0 filas (conjunto vacío de datos con los encabezados)',
          'Un error de sintaxis',
          'El valor NULL en la consola',
          'Borra la tabla'
        ],
        correctOptionIndex: 0,
        explanation: 'Una consulta sobre una tabla vacía devuelve con éxito 0 registros, manteniendo la estructura de columnas.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l05-e03',
        type: 'code_cloze',
        prompt: 'Completa la cláusula que especifica la tabla origen:',
        codeWithBlank: 'SELECT * ___ pedidos;',
        options: ['FROM', 'IN', 'INTO', 'TABLE'],
        correctOption: 'FROM',
        explanation: 'FROM indica de qué tabla provienen las filas que serán leídas.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l05-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que altera el orden obligatorio de las cláusulas SQL:',
        codeSnippet: [
          '-- Consulta con cláusulas invertidas',
          'FROM clientes',
          'SELECT *;'
        ],
        bugLineIndex: 1,
        explanation: 'En la sintaxis de SQL la cláusula SELECT debe ir antes de FROM (SELECT * FROM tabla;).',
        xpReward: 15
      },
      {
        id: 'sql-u01-l05-e05',
        type: 'predict_output',
        prompt: '¿Es obligatorio escribir las palabras clave SELECT y FROM en mayúsculas?',
        code: 'select * from clientes;',
        options: [
          'No, SQL no distingue mayúsculas en palabras clave (es case-insensitive)',
          'Sí, si se escriben en minúsculas falla la consulta',
          'Solo SELECT debe ir en mayúsculas',
          'Depende del navegador web'
        ],
        correctOptionIndex: 0,
        explanation: 'SQL no distingue entre mayúsculas y minúsculas para sus palabras clave, aunque escribirlas en MAYÚSCULAS es una buena práctica comunitaria.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l05-e06',
        type: 'matching_pairs',
        prompt: 'Empareja los elementos de la consulta fundamental:',
        pairs: [
          { left: 'SELECT', right: 'Cláusula de proyección (qué campos mostrar)' },
          { left: '*', right: 'Comodín que selecciona todas las columnas' },
          { left: 'FROM', right: 'Cláusula de origen (de qué tabla leer)' },
          { left: ';', right: 'Punto y coma delimitador de fin de sentencia' }
        ],
        explanation: 'Esta es la estructura anatómica de toda consulta básica de lectura en SQL.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l05-e07',
        type: 'code_builder',
        prompt: 'Consulta todos los registros de la tabla \'empleados\':',
        tokens: ['SELECT', '*', 'FROM', 'empleados', ';', 'clientes'],
        solution: ['SELECT', '*', 'FROM', 'empleados', ';'],
        explanation: 'SELECT * FROM empleados; devuelve todas las filas y columnas registradas.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l05-e08',
        type: 'code_cloze',
        prompt: '¿Qué carácter se usa como comodín para indicar "todas las columnas"?',
        codeWithBlank: 'SELECT ___ FROM inventario;',
        options: ['*', '%', '#', 'ALL'],
        correctOption: '*',
        explanation: 'El asterisco (*) significa "todas las columnas de la tabla".',
        xpReward: 10
      },
      {
        id: 'sql-u01-l05-e09',
        type: 'predict_output',
        prompt: '¿Por qué en aplicaciones en producción se desaconseja usar SELECT * indiscriminadamente?',
        code: '-- SELECT * FROM tabla_con_50_columnas_y_millones_de_filas;',
        options: [
          'Porque trae columnas innecesarias saturando ancho de banda y memoria',
          'Porque SQL borra los datos si usas asterisco',
          'Porque no funciona si hay más de 5 registros',
          'Porque el asterisco solo funciona en bases de datos de prueba'
        ],
        correctOptionIndex: 0,
        explanation: 'Traer datos innecesarios degrada el rendimiento de la red y del servidor; es mejor proyectar solo lo que se necesita.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l05-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena las líneas de una consulta de lectura completa:',
        lines: [
          'SELECT *',
          'FROM facturas',
          ';'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'SELECT abre la proyección, FROM nombra la fuente de datos y el punto y coma cierra.',
        xpReward: 20
      }
    ]
  },
  6: {
    title: '6. Proyección Específica de Columnas',
    desc: 'Buenas prácticas: solicita solo los datos que necesitas.',
    exercises: [
      {
        id: 'sql-u01-l06-e01',
        type: 'code_builder',
        prompt: 'Selecciona únicamente el campo \'email\' de la tabla \'clientes\':',
        tokens: ['SELECT', 'email', 'FROM', 'clientes', ';', '*'],
        solution: ['SELECT', 'email', 'FROM', 'clientes', ';'],
        explanation: 'Especificar las columnas exactas reduce el tráfico de red y optimiza la velocidad.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l06-e02',
        type: 'predict_output',
        prompt: 'Si una tabla tiene 8 columnas pero ejecutamos "SELECT nombre FROM usuarios;", ¿cuántas columnas muestra el resultado?',
        code: 'SELECT nombre FROM usuarios;',
        options: ['8 columnas', '1 columna (solo nombre)', '0 columnas', 'Depende de las filas'],
        correctOptionIndex: 1,
        explanation: 'La proyección filtra en sentido vertical: solo se entrega la columna solicitada.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l06-e03',
        type: 'code_cloze',
        prompt: 'Completa la consulta para obtener únicamente los precios de \'productos\':',
        codeWithBlank: 'SELECT ___ FROM productos;',
        options: ['precio', '*', 'TABLE', 'COLUMN'],
        correctOption: 'precio',
        explanation: 'Escribir el nombre exacto de la columna en lugar del asterisco proyecta solo ese atributo.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l06-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con un error de tipeo en el nombre de la columna:',
        codeSnippet: [
          '-- Tabla con columnas: id, correo, fecha',
          'SELECT correoo -- Columna inexistente en la tabla',
          'FROM suscriptores;'
        ],
        bugLineIndex: 1,
        explanation: 'Si escribes mal el nombre de la columna ("correoo"), el motor responderá con error "column does not exist".',
        xpReward: 15
      },
      {
        id: 'sql-u01-l06-e05',
        type: 'matching_pairs',
        prompt: 'Empareja el tipo de filtrado con su orientación geométrica:',
        pairs: [
          { left: 'Proyección (SELECT col)', right: 'Filtrado vertical de columnas' },
          { left: 'Selección (WHERE cond)', right: 'Filtrado horizontal de filas' },
          { left: 'Asterisco (*)', right: 'Todas las columnas sin filtro vertical' },
          { left: 'Tabla', right: 'Plano cartesiano completo' }
        ],
        explanation: 'SELECT filtra qué columnas ver (vertical); WHERE filtra qué filas incluir (horizontal).',
        xpReward: 15
      },
      {
        id: 'sql-u01-l06-e06',
        type: 'predict_output',
        prompt: '¿Altera la consulta "SELECT email FROM clientes;" los datos guardados en el disco?',
        code: 'SELECT email FROM clientes;',
        options: [
          'Sí, borra las demás columnas de la tabla física',
          'No, SELECT es una operación de solo lectura y nunca modifica los datos físicos',
          'Copia la tabla en un archivo nuevo',
          'Bloquea la tabla permanentemente'
        ],
        correctOptionIndex: 1,
        explanation: 'SELECT es puramente de lectura (DQL/Data Query Language); no altera ni borra nada en disco.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l06-e07',
        type: 'code_builder',
        prompt: 'Proyecta el salario de la tabla \'trabajadores\':',
        tokens: ['SELECT', 'salario', 'FROM', 'trabajadores', ';', 'WHERE'],
        solution: ['SELECT', 'salario', 'FROM', 'trabajadores', ';'],
        explanation: 'SELECT salario FROM trabajadores; proyecta solo los sueldos.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l06-e08',
        type: 'code_cloze',
        prompt: '¿Qué cláusula sigue inmediatamente después de la lista de columnas?',
        codeWithBlank: 'SELECT nombre, edad ___ personas;',
        options: ['FROM', 'WHERE', 'IN', 'OF'],
        correctOption: 'FROM',
        explanation: 'FROM conecta las columnas proyectadas con la tabla donde residen.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l06-e09',
        type: 'predict_output',
        prompt: '¿Qué ventaja tiene proyectar columnas concretas frente a SELECT *?',
        code: '-- SELECT id, nombre FROM usuarios;',
        options: [
          'Aumenta el uso de red',
          'Permite al motor aprovechar índices de solo índice y enviar menos bytes por la red',
          'Desactiva los filtros WHERE',
          'Obliga a reiniciar el servidor'
        ],
        correctOptionIndex: 1,
        explanation: 'El rendimiento mejora drásticamente al transferir solo los bytes requeridos.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l06-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta de proyección:',
        lines: [
          'SELECT titulo',
          'FROM libros',
          ';'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Sintaxis canónica de proyección específica.',
        xpReward: 20
      }
    ]
  },
  7: {
    title: '7. Múltiples Columnas',
    desc: 'Separa columnas usando comas en tu cláusula SELECT.',
    exercises: [
      {
        id: 'sql-u01-l07-e01',
        type: 'code_builder',
        prompt: 'Selecciona el nombre y el precio de la tabla \'productos\':',
        tokens: ['SELECT', 'nombre', ',', 'precio', 'FROM', 'productos', ';'],
        solution: ['SELECT', 'nombre', ',', 'precio', 'FROM', 'productos', ';'],
        explanation: 'Las columnas se separan mediante comas, sin colocar coma antes de la palabra FROM.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l07-e02',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error clásico de la "coma sobrante" (trailing comma):',
        codeSnippet: [
          'SELECT',
          '    id,',
          '    nombre, -- ¡Coma sobrante antes de FROM!',
          'FROM usuarios;'
        ],
        bugLineIndex: 2,
        explanation: 'En el estándar SQL no debe haber una coma tras la última columna antes de la cláusula FROM.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l07-e03',
        type: 'predict_output',
        prompt: '¿En qué orden aparecen las columnas en la tabla de resultados?',
        code: 'SELECT edad, nombre FROM clientes;',
        options: [
          'En el orden del esquema original de la tabla',
          'En el orden exacto en que las especificaste en el SELECT (primero edad, luego nombre)',
          'Alfabéticamente siempre',
          'Aleatoriamente'
        ],
        correctOptionIndex: 1,
        explanation: 'El resultado devuelve las columnas exactamente en el orden indicado en la sentencia SELECT.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l07-e04',
        type: 'code_cloze',
        prompt: '¿Qué carácter se utiliza para separar las columnas en el SELECT?',
        codeWithBlank: 'SELECT id___ nombre___ correo FROM usuarios;',
        options: [',', ';', '.', '-'],
        correctOption: ',',
        explanation: 'La coma (,) es el separador de elementos en listas de proyección en SQL.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l07-e05',
        type: 'code_builder',
        prompt: 'Proyecta tres campos: id, titulo y autor de la tabla \'libros\':',
        tokens: ['SELECT', 'id', ',', 'titulo', ',', 'autor', 'FROM', 'libros', ';'],
        solution: ['SELECT', 'id', ',', 'titulo', ',', 'autor', 'FROM', 'libros', ';'],
        explanation: 'Dos comas para separar tres columnas.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l07-e06',
        type: 'predict_output',
        prompt: '¿Se puede repetir la misma columna dos veces en un SELECT?',
        code: 'SELECT precio, precio FROM articulos;',
        options: [
          'No, produce error fatal',
          'Sí, SQL devolverá dos columnas idénticas con los mismos valores',
          'Solo si se renombran con AS',
          'Borra la columna precio'
        ],
        correctOptionIndex: 1,
        explanation: 'SQL permite proyectar la misma columna más de una vez sin arrojar error.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l07-e07',
        type: 'matching_pairs',
        prompt: 'Empareja los errores de coma con su diagnóstico:',
        pairs: [
          { left: 'Coma antes de FROM', right: 'Error de sintaxis: se esperaba nombre de columna' },
          { left: 'Falta de coma entre columnas', right: 'El motor cree que la segunda es un alias' },
          { left: 'Coma después de SELECT', right: 'Error de sintaxis inmediata' },
          { left: 'Punto en lugar de coma', right: 'Intenta acceder a tabla.columna' }
        ],
        explanation: 'Un error común es olvidar la coma, lo que hace que SQL interprete la segunda palabra como un alias de la primera.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l07-e08',
        type: 'code_cloze',
        prompt: 'Completa la consulta de dos columnas:',
        codeWithBlank: 'SELECT ciudad, pais FROM ___ ;',
        options: ['destinos', 'WHERE', 'AND', 'TABLES'],
        correctOption: 'destinos',
        explanation: 'Tras FROM va el nombre de la tabla de donde se obtendrán los datos.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l07-e09',
        type: 'predict_output',
        prompt: '¿Qué ocurre en "SELECT nombre apellido FROM usuarios;" sin coma?',
        code: 'SELECT nombre apellido FROM usuarios;',
        options: [
          'Concatena el nombre con el apellido',
          'Renombra la columna nombre bajo el encabezado \'apellido\'',
          'Muestra dos columnas normales',
          'Produce error siempre'
        ],
        correctOptionIndex: 1,
        explanation: 'Al omitir la coma, SQL asume que "apellido" es un alias para la columna "nombre".',
        xpReward: 10
      },
      {
        id: 'sql-u01-l07-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta multicolumna:',
        lines: [
          'SELECT codigo,',
          '       descripcion',
          'FROM catalogo;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Escribir cada columna en su propia línea mejora la legibilidad en consultas largas.',
        xpReward: 20
      }
    ]
  },
  8: {
    title: '8. Alias de Columnas: AS',
    desc: 'Renombra los encabezados devueltos en el resultado.',
    exercises: [
      {
        id: 'sql-u01-l08-e01',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para renombrar una columna en el reporte:',
        codeWithBlank: 'SELECT nombre ___ alias_usuario FROM usuarios;',
        options: ['AS', 'NAME', 'LIKE', 'TO'],
        correctOption: 'AS',
        explanation: 'AS crea un alias temporal para la columna en el resultado, sin alterar el nombre de la columna física.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l08-e02',
        type: 'predict_output',
        prompt: '¿Altera "SELECT precio AS costo_usd FROM articulos;" el nombre original de la columna en la tabla física?',
        code: 'SELECT precio AS costo_usd FROM articulos;',
        options: [
          'Sí, renombra permanentemente la columna en el disco',
          'No, solo renombra el encabezado de salida en esta consulta específica',
          'Borra la columna precio',
          'Crea una segunda columna física'
        ],
        correctOptionIndex: 1,
        explanation: 'Los alias son etiquetas temporales que solo existen durante el conjunto de resultados entregado.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l08-e03',
        type: 'code_builder',
        prompt: 'Renombra la columna \'total\' como \'monto_final\':',
        tokens: ['SELECT', 'total', 'AS', 'monto_final', 'FROM', 'ventas', ';'],
        solution: ['SELECT', 'total', 'AS', 'monto_final', 'FROM', 'ventas', ';'],
        explanation: 'La sintaxis estándar es: columna AS nuevo_nombre.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l08-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde se intentó usar un alias con espacios sin comillas:',
        codeSnippet: [
          'SELECT',
          '    precio AS Precio Final, -- ¡Los alias con espacios requieren comillas!',
          'FROM productos;'
        ],
        bugLineIndex: 1,
        explanation: 'Si un alias contiene espacios o caracteres especiales, debe encerrarse entre comillas dobles como "Precio Final".',
        xpReward: 15
      },
      {
        id: 'sql-u01-l08-e05',
        type: 'predict_output',
        prompt: '¿Es obligatoria la palabra clave AS para definir un alias?',
        code: 'SELECT nombre cliente FROM personas;',
        options: [
          'Sí, sin AS produce error',
          'No, AS es opcional pero muy recomendable para evitar confusiones',
          'Solo es opcional para números',
          'Solo funciona en MySQL'
        ],
        correctOptionIndex: 1,
        explanation: 'En el estándar SQL, la palabra AS es opcional, pero escribirla explícitamente evita errores de lectura.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l08-e06',
        type: 'matching_pairs',
        prompt: 'Empareja los casos de uso comunes de los alias:',
        pairs: [
          { left: 'Columnas calculadas', right: 'SELECT precio * 1.16 AS precio_con_iva' },
          { left: 'Nombres amigables', right: 'SELECT p_nom AS primer_nombre' },
          { left: 'Funciones de agregación', right: 'SELECT COUNT(*) AS total_filas' },
          { left: 'Ambigüedad en JOINs', right: 'SELECT u.id AS usuario_id' }
        ],
        explanation: 'Los alias son indispensables para bautizar expresiones calculadas y desambiguar tablas relacionadas.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l08-e07',
        type: 'code_builder',
        prompt: 'Calcula el doble del precio y nómbralo \'doble_precio\':',
        tokens: ['SELECT', 'precio', '*', '2', 'AS', 'doble_precio', 'FROM', 'items', ';'],
        solution: ['SELECT', 'precio', '*', '2', 'AS', 'doble_precio', 'FROM', 'items', ';'],
        explanation: 'Las expresiones matemáticas reciben un alias descriptivo para que el reporte sea legible.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l08-e08',
        type: 'code_cloze',
        prompt: '¿Cómo encierras un alias que contiene espacios en blanco?',
        codeWithBlank: 'SELECT nombre AS ___Nombre Completo___ FROM clientes;',
        options: ['" "', "' '", '( )', '[ ]'],
        correctOption: '" "',
        explanation: 'En SQL estándar, los identificadores con espacios se delimitan con comillas dobles "".',
        xpReward: 10
      },
      {
        id: 'sql-u01-l08-e09',
        type: 'predict_output',
        prompt: '¿Se puede usar el alias definido en el SELECT dentro de la misma cláusula WHERE en SQL estándar?',
        code: 'SELECT salario * 12 AS sueldo_anual\nFROM empleados\nWHERE sueldo_anual > 50000; -- ¿Válido?',
        options: [
          'Sí, funciona sin problemas',
          'No, porque WHERE se evalúa antes de SELECT en el orden lógico del motor',
          'Solo si la tabla tiene menos de 100 filas',
          'Solo en SQLite'
        ],
        correctOptionIndex: 1,
        explanation: 'El motor SQL evalúa FROM y WHERE antes de SELECT; por tanto, el alias aún no existe durante el filtrado WHERE.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l08-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta con alias claros:',
        lines: [
          'SELECT correo AS email_contacto,',
          '       telefono AS movil',
          'FROM proveedores;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Alias limpios y explícitos para cada columna proyectada.',
        xpReward: 20
      }
    ]
  },
  9: {
    title: '9. Valores Únicos: DISTINCT',
    desc: 'Elimina registros duplicados en los resultados.',
    exercises: [
      {
        id: 'sql-u01-l09-e01',
        type: 'code_builder',
        prompt: 'Obtén los países de tus clientes sin que aparezcan repetidos:',
        tokens: ['SELECT', 'DISTINCT', 'pais', 'FROM', 'clientes', ';', 'WHERE'],
        solution: ['SELECT', 'DISTINCT', 'pais', 'FROM', 'clientes', ';'],
        explanation: 'DISTINCT evalúa las filas devueltas y descarta automáticamente las ocurrencias duplicadas.',
        xpReward: 20
      },
      {
        id: 'sql-u01-l09-e02',
        type: 'predict_output',
        prompt: 'Si tienes 100 clientes y todos viven en "España", ¿cuántas filas devuelve "SELECT DISTINCT pais FROM clientes;"?',
        code: 'SELECT DISTINCT pais FROM clientes;',
        options: ['100 filas con "España"', 'Exactamente 1 fila con "España"', '0 filas', 'Error'],
        correctOptionIndex: 1,
        explanation: 'Al ser todos los registros idénticos en la columna pais, DISTINCT consolida las 100 repeticiones en 1 única fila.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l09-e03',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para suprimir duplicados en la consulta:',
        codeWithBlank: 'SELECT ___ categoria FROM productos;',
        options: ['DISTINCT', 'UNIQUE', 'DIFFERENT', 'SINGLE'],
        correctOption: 'DISTINCT',
        explanation: 'DISTINCT es la palabra reservada oficial en SQL para eliminar duplicados del conjunto de resultados.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l09-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde la posición de DISTINCT es incorrecta:',
        codeSnippet: [
          'SELECT',
          '    pais DISTINCT -- ¡DISTINCT debe ir inmediatamente tras SELECT!',
          'FROM clientes;'
        ],
        bugLineIndex: 1,
        explanation: 'DISTINCT califica toda la cláusula SELECT y debe ubicarse justo después de la palabra SELECT (SELECT DISTINCT ...).',
        xpReward: 15
      },
      {
        id: 'sql-u01-l09-e05',
        type: 'predict_output',
        prompt: '¿Cómo evalúa DISTINCT cuando proyectas dos columnas: "SELECT DISTINCT ciudad, pais FROM sedes;"?',
        code: 'SELECT DISTINCT ciudad, pais FROM sedes;',
        options: [
          'Elimina duplicados de ciudad y de pais por separado',
          'Elimina duplicados de la combinación conjunta (ciudad + pais)',
          'Solo aplica a la primera columna (ciudad)',
          'Solo aplica a la última columna (pais)'
        ],
        correctOptionIndex: 1,
        explanation: 'DISTINCT opera sobre la tupla completa proyectada; dos filas solo se consideran duplicadas si coinciden en ambas columnas.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l09-e06',
        type: 'matching_pairs',
        prompt: 'Empareja el comportamiento con su instrucción:',
        pairs: [
          { left: 'SELECT col', right: 'Devuelve todas las filas, incluyendo repeticiones' },
          { left: 'SELECT DISTINCT col', right: 'Descarta valores repetidos' },
          { left: 'SELECT ALL col', right: 'Comportamiento por defecto idéntico a SELECT normal' },
          { left: 'COUNT(DISTINCT col)', right: 'Cuenta cuántos valores únicos existen' }
        ],
        explanation: 'DISTINCT es una de las herramientas más rápidas para explorar la diversidad de valores en una columna.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l09-e07',
        type: 'code_builder',
        prompt: 'Obtén los roles únicos sin repeticiones de la tabla \'usuarios\':',
        tokens: ['SELECT', 'DISTINCT', 'rol', 'FROM', 'usuarios', ';'],
        solution: ['SELECT', 'DISTINCT', 'rol', 'FROM', 'usuarios', ';'],
        explanation: 'Lista cada rol existente en el sistema exactamente una vez.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l09-e08',
        type: 'predict_output',
        prompt: 'Si en la columna "departamento" hay varios valores NULL y usas DISTINCT, ¿cuántos NULL se muestran?',
        code: 'SELECT DISTINCT departamento FROM empleados;',
        options: [
          'Todos los NULL repetidos',
          'Exactamente un solo NULL (se agrupan como un único valor indistinto)',
          'Los valores NULL se borran y no se muestran',
          'Lanza excepción'
        ],
        correctOptionIndex: 1,
        explanation: 'A efectos de DISTINCT, los valores NULL se consideran equivalentes entre sí, entregando un único NULL.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l09-e09',
        type: 'code_cloze',
        prompt: 'Para saber cuántas ciudades diferentes tenemos registradas usamos:',
        codeWithBlank: 'SELECT COUNT(___ ciudad) FROM proveedores;',
        options: ['DISTINCT', 'UNIQUE', 'ALL', 'EACH'],
        correctOption: 'DISTINCT',
        explanation: 'COUNT(DISTINCT columna) cuenta cuántos valores no nulos distintos existen.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l09-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta para conocer las categorías únicas en catálogo:',
        lines: [
          'SELECT DISTINCT',
          '    categoria',
          'FROM catalogo;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Estructura canónica de DISTINCT en consultas de exploración.',
        xpReward: 20
      }
    ]
  },
  10: {
    title: '10. Filtrado con WHERE',
    desc: 'Restringe las filas devueltas a las que cumplan una condición.',
    exercises: [
      {
        id: 'sql-u01-l10-e01',
        type: 'code_builder',
        prompt: 'Consulta los usuarios cuyo rol sea \'admin\':',
        tokens: ['SELECT', '*', 'FROM', 'usuarios', 'WHERE', 'rol', '=', "'admin'", ';'],
        solution: ['SELECT', '*', 'FROM', 'usuarios', 'WHERE', 'rol', '=', "'admin'", ';'],
        explanation: 'La cláusula WHERE evalúa cada fila individualmente; solo pasan las que cumplen la condición.',
        xpReward: 20
      },
      {
        id: 'sql-u01-l10-e02',
        type: 'predict_output',
        prompt: '¿En qué etapa de la ejecución actúa la cláusula WHERE?',
        code: 'SELECT nombre FROM clientes WHERE saldo > 0;',
        options: [
          'Después de imprimir los resultados en pantalla',
          'Filtra las filas antes de que se proyecten las columnas finales',
          'Solo cuando la base de datos se reinicia',
          'Nunca, es solo decorativa'
        ],
        correctOptionIndex: 1,
        explanation: 'WHERE evalúa y descarta las filas que no cumplen el predicado antes de construir el resultado de columnas.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l10-e03',
        type: 'code_cloze',
        prompt: 'Completa la cláusula de filtrado condicional:',
        codeWithBlank: 'SELECT * FROM productos ___ precio > 100;',
        options: ['WHERE', 'HAVING', 'FILTER', 'WHEN'],
        correctOption: 'WHERE',
        explanation: 'WHERE es la cláusula fundamental de filtrado a nivel de fila en SQL.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l10-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde la cláusula WHERE está mal posicionada:',
        codeSnippet: [
          'WHERE activo = TRUE -- ¡WHERE no puede ir antes de FROM!',
          'SELECT *',
          'FROM cuentas;'
        ],
        bugLineIndex: 0,
        explanation: 'El orden canónico es SELECT ... FROM ... WHERE ...;',
        xpReward: 15
      },
      {
        id: 'sql-u01-l10-e05',
        type: 'predict_output',
        prompt: 'Si ninguna fila de la tabla cumple la condición del WHERE, ¿qué devuelve la consulta?',
        code: 'SELECT * FROM usuarios WHERE id = -999;',
        options: [
          '0 filas (resultado vacío exitoso)',
          'Error 404',
          'Todas las filas de la tabla',
          'NULL'
        ],
        correctOptionIndex: 0,
        explanation: 'Cuando ningún registro satisface la condición, la consulta retorna 0 filas sin generar ningún error.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l10-e06',
        type: 'matching_pairs',
        prompt: 'Empareja cada consulta con su objetivo de negocio:',
        pairs: [
          { left: 'WHERE activo = TRUE', right: 'Solo usuarios con cuentas habilitadas' },
          { left: 'WHERE stock = 0', right: 'Productos agotados que requieren reposición' },
          { left: 'WHERE total > 1000', right: 'Ventas de alto valor' },
          { left: 'WHERE pais = \'MX\'', right: 'Clientes ubicados en México' }
        ],
        explanation: 'WHERE traduce las reglas de negocio a condiciones lógicas evaluables por el motor.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l10-e07',
        type: 'code_builder',
        prompt: 'Filtra pedidos cuyo estado sea \'enviado\':',
        tokens: ['WHERE', 'estado', '=', "'enviado'", 'SELECT', 'FROM'],
        solution: ['WHERE', 'estado', '=', "'enviado'"],
        explanation: 'WHERE campo = valor filtra con igualdad exacta.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l10-e08',
        type: 'code_cloze',
        prompt: '¿Qué resultado booleano debe tener una fila en el WHERE para ser incluida en la salida?',
        codeWithBlank: 'La fila solo se incluye si la condición WHERE evalúa a ___:',
        options: ['TRUE', 'FALSE', 'NULL', 'UNKNOWN'],
        correctOption: 'TRUE',
        explanation: 'Solo aquellas filas para las cuales el predicado resulta ser TRUE se incluyen en el conjunto resultado.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l10-e09',
        type: 'predict_output',
        prompt: 'Si una fila tiene NULL en la columna edad, ¿pasa el filtro WHERE edad > 18?',
        code: 'SELECT * FROM clientes WHERE edad > 18; -- ¿Qué pasa si edad es NULL?',
        options: [
          'Sí, NULL se considera mayor a 18',
          'No, cualquier comparación con NULL produce UNKNOWN y la fila se descarta',
          'Produce un error que detiene el motor',
          'Se convierte a 0 y pasa'
        ],
        correctOptionIndex: 1,
        explanation: 'En lógica trivalente de SQL (TRUE, FALSE, UNKNOWN), las comparaciones con NULL dan UNKNOWN y WHERE las excluye.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l10-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta completa con proyección y filtro:',
        lines: [
          'SELECT nombre, email',
          'FROM suscriptores',
          'WHERE confirmado = 1;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Secuencia canónica: SELECT -> FROM -> WHERE.',
        xpReward: 20
      }
    ]
  },
  11: {
    title: '11. Igualdad en WHERE con =',
    desc: 'Compara números y cadenas de texto con precisión.',
    exercises: [
      {
        id: 'sql-u01-l11-e01',
        type: 'predict_output',
        prompt: '¿Cuántas filas devolverá la consulta si \'id\' es la clave primaria única de la tabla?',
        code: 'SELECT nombre FROM usuarios WHERE id = 3;',
        options: [
          'A lo sumo 1 fila (o 0 si no existe el ID 3)',
          'Siempre 3 filas',
          'Todas las filas',
          'Depende del orden alfabético'
        ],
        correctOptionIndex: 0,
        explanation: 'Al ser la clave primaria irrepetible, la búsqueda por id = 3 solo puede arrojar 0 o 1 coincidencia.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l11-e02',
        type: 'code_builder',
        prompt: 'Construye el filtro para buscar al usuario con correo \'dev@test.com\':',
        tokens: ['WHERE', 'email', '=', "'dev@test.com'", ';', '=='],
        solution: ['WHERE', 'email', '=', "'dev@test.com'"],
        explanation: 'En SQL el operador de igualdad es un solo signo igual (=), y los textos van entre comillas simples.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l11-e03',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error de sintaxis al usar doble igual estilo JavaScript/Java:',
        codeSnippet: [
          'SELECT * FROM productos',
          'WHERE categoria == \'Ropa\'; -- ¡En SQL estándar es = y no ==!'
        ],
        bugLineIndex: 1,
        explanation: 'El estándar de SQL utiliza un solo signo igual (=) para comparación de igualdad.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l11-e04',
        type: 'code_cloze',
        prompt: 'En el estándar SQL, ¿qué delimitador se usa para literales de texto?',
        codeWithBlank: 'WHERE ciudad = ___Madrid___',
        options: ["' '", '" "', '` `', '/ /'],
        correctOption: "' '",
        explanation: 'Las cadenas de texto en SQL se delimitan obligatoriamente con comillas simples (\'texto\').',
        xpReward: 10
      },
      {
        id: 'sql-u01-l11-e05',
        type: 'predict_output',
        prompt: '¿Es necesario poner comillas a los números en una condición de igualdad?',
        code: 'SELECT * FROM facturas WHERE total = 500;',
        options: [
          'No, los números literales nunca llevan comillas',
          'Sí, todo en SQL debe ir entre comillas',
          'Solo si son mayores a 100',
          'Solo los decimales'
        ],
        correctOptionIndex: 0,
        explanation: 'Los números literales se escriben directamente sin comillas para mantener su tipo numérico.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l11-e06',
        type: 'matching_pairs',
        prompt: 'Empareja el tipo de dato con su formato literal en el WHERE:',
        pairs: [
          { left: 'Texto (VARCHAR)', right: 'WHERE nombre = \'Carlos\'' },
          { left: 'Entero (INT)', right: 'WHERE edad = 25' },
          { left: 'Booleano (BOOL)', right: 'WHERE activo = TRUE' },
          { left: 'Fecha (DATE)', right: 'WHERE creacion = \'2024-01-15\'' }
        ],
        explanation: 'Textos y fechas van entre comillas simples; números y booleanos se escriben de forma literal.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l11-e07',
        type: 'code_builder',
        prompt: 'Filtra registros donde la cantidad en stock sea exactamente cero:',
        tokens: ['WHERE', 'stock', '=', '0', ';', 'NULL'],
        solution: ['WHERE', 'stock', '=', '0'],
        explanation: 'WHERE stock = 0 busca artículos completamente agotados.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l11-e08',
        type: 'predict_output',
        prompt: '¿Por qué "WHERE columna = NULL" nunca devuelve resultados?',
        code: 'SELECT * FROM usuarios WHERE telefono = NULL;',
        options: [
          'Porque la sintaxis correcta para valores nulos es "IS NULL"',
          'Porque NULL no existe en bases de datos',
          'Porque se debe usar "== NULL"',
          'Porque borra los registros'
        ],
        correctOptionIndex: 0,
        explanation: 'NULL representa un valor desconocido y no se puede comparar con =. Se debe usar siempre "IS NULL".',
        xpReward: 10
      },
      {
        id: 'sql-u01-l11-e09',
        type: 'code_cloze',
        prompt: 'Completa la igualdad numérica:',
        codeWithBlank: 'SELECT * FROM pedidos WHERE cliente_id ___ 42;',
        options: ['=', '==', 'IS', 'EQUAL'],
        correctOption: '=',
        explanation: 'El signo = evalúa la igualdad exacta entre la columna numérica y el valor 42.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l11-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la búsqueda por código de producto:',
        lines: [
          'SELECT nombre, precio',
          'FROM inventario',
          'WHERE sku = \'SKU-990\';'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Búsqueda por clave de producto utilizando igualdad exacta de texto.',
        xpReward: 20
      }
    ]
  },
  12: {
    title: '12. Desigualdad: <> y !=',
    desc: 'Excluye valores específicos en tu filtro condicional.',
    exercises: [
      {
        id: 'sql-u01-l12-e01',
        type: 'code_cloze',
        prompt: 'Completa con el operador estándar SQL tradicional de desigualdad:',
        codeWithBlank: 'SELECT * FROM pedidos WHERE estado ___ \'cancelado\';',
        options: ['<>', '==', '!==', 'NOT'],
        correctOption: '<>',
        explanation: '<> es el operador universal de desigualdad definido en el estándar ANSI SQL (aunque != también es ampliamente aceptado).',
        xpReward: 15
      },
      {
        id: 'sql-u01-l12-e02',
        type: 'predict_output',
        prompt: '¿Qué registros devolverá "WHERE rol != \'invitado\'"?',
        code: 'SELECT nombre FROM usuarios WHERE rol != \'invitado\';',
        options: [
          'Solo los que tengan rol \'invitado\'',
          'Todos los usuarios cuyo rol sea diferente de \'invitado\' (admins, editores, etc.)',
          'Ningún usuario',
          'Todos incluyendo los que tienen NULL en rol'
        ],
        correctOptionIndex: 1,
        explanation: '!= y <> excluyen exactamente el valor indicado en la condición.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l12-e03',
        type: 'code_builder',
        prompt: 'Filtra productos cuyo precio sea diferente de cero:',
        tokens: ['WHERE', 'precio', '<>', '0', '!=', '=='],
        solution: ['WHERE', 'precio', '<>', '0'],
        explanation: 'WHERE precio <> 0 excluye productos gratuitos.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l12-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde se intentó usar un operador de JavaScript inválido en SQL:',
        codeSnippet: [
          'SELECT * FROM cuentas',
          'WHERE tipo !== \'demo\'; -- ¡!== no existe en SQL estándar!'
        ],
        bugLineIndex: 1,
        explanation: '!== es un operador de identidad de JavaScript. En SQL se usa <> o !=.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l12-e05',
        type: 'matching_pairs',
        prompt: 'Empareja los operadores con su significado:',
        pairs: [
          { left: '=', right: 'Igual a' },
          { left: '<>', right: 'Diferente de (estándar ANSI)' },
          { left: '!=', right: 'Diferente de (sinónimo moderno)' },
          { left: 'IS NOT NULL', right: 'Tiene algún valor asignado' }
        ],
        explanation: '<> y != realizan la misma comprobación de desigualdad en la gran mayoría de motores modernos.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l12-e06',
        type: 'predict_output',
        prompt: 'Si un usuario tiene rol = NULL, ¿aparecerá en "WHERE rol <> \'admin\'"?',
        code: 'SELECT * FROM usuarios WHERE rol <> \'admin\'; -- rol es NULL',
        options: [
          'Sí, porque NULL no es \'admin\'',
          'No, porque NULL <> \'admin\' evalúa a UNKNOWN y WHERE lo descarta',
          'Produce error de ejecución',
          'Se convierte a \'usuario\' y aparece'
        ],
        correctOptionIndex: 1,
        explanation: '¡Trampa común de SQL! NULL no es igual ni diferente a nada. Para incluir los NULL hay que usar "OR rol IS NULL".',
        xpReward: 10
      },
      {
        id: 'sql-u01-l12-e07',
        type: 'code_builder',
        prompt: 'Excluye a los clientes del país \'España\':',
        tokens: ['WHERE', 'pais', '!=', "'España'", ';', '=='],
        solution: ['WHERE', 'pais', '!=', "'España'"],
        explanation: 'Filtra todos los clientes internacionales fuera de España.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l12-e08',
        type: 'code_cloze',
        prompt: 'Completa la alternativa moderna a <>:',
        codeWithBlank: 'WHERE descuento ___ 0',
        options: ['!=', '!==', '<=', '>='],
        correctOption: '!=',
        explanation: '!= es el operador de desigualdad alternativo adoptado de lenguajes como C y Java.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l12-e09',
        type: 'predict_output',
        prompt: '¿Qué devuelve "SELECT 5 <> 5;"?',
        code: 'SELECT 5 <> 5;',
        options: ['TRUE (1)', 'FALSE (0)', 'NULL', 'Error'],
        correctOptionIndex: 1,
        explanation: '5 no es diferente de 5, por lo que la afirmación es falsa (FALSE).',
        xpReward: 10
      },
      {
        id: 'sql-u01-l12-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta para listar productos no archivados:',
        lines: [
          'SELECT id, nombre',
          'FROM catalogo',
          'WHERE archivado <> 1;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Excluye los productos que tengan bandera de archivado.',
        xpReward: 20
      }
    ]
  },
  13: {
    title: '13. Comparadores: > y <',
    desc: 'Filtra números y fechas por mayor o menor estricto.',
    exercises: [
      {
        id: 'sql-u01-l13-e01',
        type: 'predict_output',
        prompt: 'Si un producto cuesta exactamente 100, ¿entra en la condición WHERE precio > 100?',
        code: 'SELECT * FROM productos WHERE precio > 100;',
        options: [
          'No, porque > es mayor estricto (100 no es mayor que 100)',
          'Sí, 100 califica como mayor',
          'Produce error de redondeo',
          'Solo si tiene centavos'
        ],
        correctOptionIndex: 0,
        explanation: '> exige que el valor sea estrictamente superior. Para incluir el 100 se debe usar >=.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l13-e02',
        type: 'code_builder',
        prompt: 'Filtra registros donde la edad sea menor a 18 años:',
        tokens: ['WHERE', 'edad', '<', '18', '>', ';'],
        solution: ['WHERE', 'edad', '<', '18'],
        explanation: '< compara por menor estricto.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l13-e03',
        type: 'code_cloze',
        prompt: 'Completa la consulta para buscar productos con precio superior a 50 dólares:',
        codeWithBlank: 'SELECT * FROM articulos WHERE precio ___ 50;',
        options: ['>', '<', '=', '<>'],
        correctOption: '>',
        explanation: '> filtra los valores estrictamente mayores a 50.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l13-e04',
        type: 'predict_output',
        prompt: '¿Cómo evalúa el operador < sobre fechas en formato estándar ISO "YYYY-MM-DD"?',
        code: 'SELECT * FROM reservas WHERE fecha < \'2024-06-01\';',
        options: [
          'Busca reservas anteriores al 1 de junio de 2024',
          'Busca reservas posteriores al 1 de junio de 2024',
          'Solo reservas del mismo día',
          'Produce error porque las fechas no son números'
        ],
        correctOptionIndex: 0,
        explanation: 'En fechas, "menor que" significa cronológicamente anterior.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l13-e05',
        type: 'matching_pairs',
        prompt: 'Empareja cada comparación con su interpretación matemática:',
        pairs: [
          { left: 'x > 10', right: 'x es estrictamente mayor que 10 (11, 12...)' },
          { left: 'x < 10', right: 'x es estrictamente menor que 10 (...8, 9)' },
          { left: 'stock < 5', right: 'Alerta de bajo inventario (menos de 5)' },
          { left: 'puntuacion > 90', right: 'Calificación sobresaliente (superior a 90)' }
        ],
        explanation: 'Los comparadores estrictos excluyen siempre el valor límite de referencia.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l13-e06',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde la condición no tiene sentido para buscar mayores de edad:',
        codeSnippet: [
          'SELECT nombre, edad FROM club_adultos',
          'WHERE edad < 18; -- ¡Esto busca menores de edad, no adultos!'
        ],
        bugLineIndex: 1,
        explanation: 'Para filtrar adultos se debe usar edad >= 18, no menor a 18.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l13-e07',
        type: 'code_builder',
        prompt: 'Filtra empleados con salario superior a 3000:',
        tokens: ['WHERE', 'salario', '>', '3000', '<', ';'],
        solution: ['WHERE', 'salario', '>', '3000'],
        explanation: 'WHERE salario > 3000 devuelve sueldos por encima de dicha cifra.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l13-e08',
        type: 'predict_output',
        prompt: '¿Cómo compara SQL las cadenas alfabéticas con los operadores > y <?',
        code: 'SELECT \'B\' > \'A\';',
        options: [
          'Error: las letras no se pueden comparar con >',
          'TRUE (1), porque se ordenan según el código ASCII/Unicode alfabético',
          'FALSE (0)',
          'NULL'
        ],
        correctOptionIndex: 1,
        explanation: 'Las cadenas se comparan lexicográficamente; \'B\' tiene un código superior a \'A\'.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l13-e09',
        type: 'code_cloze',
        prompt: 'Para buscar calificaciones inferiores a 60 puntos usamos:',
        codeWithBlank: 'WHERE calificacion ___ 60',
        options: ['<', '>', '=', '<>'],
        correctOption: '<',
        explanation: '< selecciona los valores numéricos estrictamente por debajo de 60.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l13-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta para alertar de productos con stock crítico:',
        lines: [
          'SELECT sku, stock',
          'FROM almacenes',
          'WHERE stock < 10;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Consulta de control de inventario con comparador estricto.',
        xpReward: 20
      }
    ]
  },
  14: {
    title: '14. Inclusivos: >= y <=',
    desc: 'Incluye los límites exactos de comparación.',
    exercises: [
      {
        id: 'sql-u01-l14-e01',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error de sintaxis en el operador de comparación:',
        codeSnippet: [
          'SELECT nombre, edad',
          'FROM votantes',
          'WHERE edad => 18; -- ¡En SQL es >= y nunca =>!'
        ],
        bugLineIndex: 2,
        explanation: 'En SQL el símbolo mayor va primero: >=. Escribir => produce un error de sintaxis.',
        xpReward: 20
      },
      {
        id: 'sql-u01-l14-e02',
        type: 'predict_output',
        prompt: 'Si un estudiante sacó exactamente 60 puntos, ¿califica con "WHERE nota >= 60"?',
        code: 'SELECT * FROM alumnos WHERE nota >= 60;',
        options: [
          'No, solo si sacó 61 o más',
          'Sí, porque >= incluye el valor límite 60',
          'Solo si la nota es decimal',
          'Produce error'
        ],
        correctOptionIndex: 1,
        explanation: '>= significa mayor O igual, por lo que 60 cumple perfectamente la condición.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l14-e03',
        type: 'code_builder',
        prompt: 'Filtra productos cuyo precio sea menor o igual a 25 dólares:',
        tokens: ['WHERE', 'precio', '<=', '25', '=<', ';'],
        solution: ['WHERE', 'precio', '<=', '25'],
        explanation: '<= es el operador de menor o igual que en SQL.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l14-e04',
        type: 'code_cloze',
        prompt: 'Completa la condición para incluir a mayores o iguales a 21 años:',
        codeWithBlank: 'WHERE edad ___ 21',
        options: ['>=', '=>', '>', '=='],
        correctOption: '>=',
        explanation: '>= es el operador estándar para mayor o igual.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l14-e05',
        type: 'matching_pairs',
        prompt: 'Empareja los operadores con su regla sintáctica:',
        pairs: [
          { left: '>=', right: 'Mayor o igual (correcto)' },
          { left: '<=', right: 'Menor o igual (correcto)' },
          { left: '=>', right: 'Error de sintaxis (símbolo invertido)' },
          { left: '=<', right: 'Error de sintaxis (símbolo invertido)' }
        ],
        explanation: 'Los signos < y > siempre preceden al signo igual =.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l14-e06',
        type: 'predict_output',
        prompt: '¿Qué valores devuelve "WHERE stock <= 0"?',
        code: 'SELECT * FROM inventario WHERE stock <= 0;',
        options: [
          'Valores de stock iguales a 0 y también negativos (pedidos en exceso)',
          'Solo valores positivos',
          'Exactamente 0 únicamente',
          'Ninguno'
        ],
        correctOptionIndex: 0,
        explanation: '<= 0 cubre tanto el cero exacto como números negativos si existen anomalías de inventario.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l14-e07',
        type: 'code_builder',
        prompt: 'Filtra personas de 18 años o más:',
        tokens: ['WHERE', 'edad', '>=', '18', ';', '=>'],
        solution: ['WHERE', 'edad', '>=', '18'],
        explanation: 'WHERE edad >= 18 incluye legalmente a todos los adultos.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l14-e08',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el operador menor o igual escrito al revés:',
        codeSnippet: [
          'SELECT codigo FROM envios',
          'WHERE peso =< 5.0; -- ¡Debe ser <= y no =<!'
        ],
        bugLineIndex: 1,
        explanation: 'El operador correcto es <=. =< no es válido en el lenguaje SQL.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l14-e09',
        type: 'predict_output',
        prompt: '¿Es "WHERE precio >= 10 AND precio <= 20" inclusivo para los extremos 10 y 20?',
        code: 'SELECT * FROM items WHERE precio >= 10 AND precio <= 20;',
        options: [
          'No, excluye 10 y 20',
          'Sí, incluye tanto 10 como 20 y todos los valores intermedios',
          'Solo incluye los impares',
          'Produce error lógico'
        ],
        correctOptionIndex: 1,
        explanation: 'Ambos extremos son inclusivos gracias al uso de >= y <=.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l14-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta de control de calidad:',
        lines: [
          'SELECT lote, pureza',
          'FROM produccion',
          'WHERE pureza >= 99.5;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Filtro de umbral mínimo de pureza usando >=.',
        xpReward: 20
      }
    ]
  },
  15: {
    title: '15. Filtro Doble: AND',
    desc: 'Ambas condiciones deben cumplirse simultáneamente.',
    exercises: [
      {
        id: 'sql-u01-l15-e01',
        type: 'code_builder',
        prompt: 'Filtra productos con precio mayor a 50 Y categoría \'Tech\':',
        tokens: ['WHERE', 'precio', '>', '50', 'AND', 'categoria', '=', "'Tech'"],
        solution: ['WHERE', 'precio', '>', '50', 'AND', 'categoria', '=', "'Tech'"],
        explanation: 'AND exige que cada registro cumpla ambas expresiones lógicas obligatoriamente.',
        xpReward: 20
      },
      {
        id: 'sql-u01-l15-e02',
        type: 'predict_output',
        prompt: 'Si un usuario tiene edad = 20 pero activo = FALSE, ¿aparece con "WHERE edad >= 18 AND activo = TRUE"?',
        code: 'SELECT * FROM usuarios WHERE edad >= 18 AND activo = TRUE;',
        options: [
          'Sí, porque cumple la edad',
          'No, porque AND exige que ambas condiciones sean verdaderas a la vez',
          'Solo si es administrador',
          'Aparece con los campos vacíos'
        ],
        correctOptionIndex: 1,
        explanation: 'En lógica AND: TRUE AND FALSE da FALSE; la fila es descartada.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l15-e03',
        type: 'code_cloze',
        prompt: 'Completa la conjunción lógica que une dos condiciones obligatorias:',
        codeWithBlank: 'SELECT * FROM envios WHERE destino = \'CO\' ___ peso < 2.0;',
        options: ['AND', '&&', 'WITH', 'BOTH'],
        correctOption: 'AND',
        explanation: 'AND es la palabra reservada del estándar SQL para la conjunción lógica.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l15-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde se usó el operador && de otros lenguajes en lugar de AND:',
        codeSnippet: [
          'SELECT * FROM empleados',
          'WHERE departamento = \'Ventas\' && salario > 2000; -- ¡En SQL estándar se usa AND!'
        ],
        bugLineIndex: 1,
        explanation: 'En SQL estándar la conjunción se escribe literalmente con la palabra AND, no con &&.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l15-e05',
        type: 'matching_pairs',
        prompt: 'Empareja la tabla de verdad de AND en SQL:',
        pairs: [
          { left: 'TRUE AND TRUE', right: 'TRUE (la fila califica)' },
          { left: 'TRUE AND FALSE', right: 'FALSE (la fila es excluida)' },
          { left: 'FALSE AND FALSE', right: 'FALSE (la fila es excluida)' },
          { left: 'TRUE AND NULL', right: 'UNKNOWN (la fila es excluida)' }
        ],
        explanation: 'La única forma de que una fila pase un filtro AND es que todas las condiciones sean estrictamente verdaderas.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l15-e06',
        type: 'predict_output',
        prompt: '¿Cuántas condiciones se pueden encadenar usando múltiples AND?',
        code: 'SELECT * FROM items WHERE a = 1 AND b = 2 AND c = 3 AND d = 4;',
        options: [
          'Solo un máximo de dos',
          'Tantas como requiera la lógica del negocio sin límite práctico',
          'Solo si se usan paréntesis obligatorios en cada una',
          'Exactamente 3'
        ],
        correctOptionIndex: 1,
        explanation: 'Puedes encadenar múltiples cláusulas AND sucesivamente.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l15-e07',
        type: 'code_builder',
        prompt: 'Filtra clientes de \'España\' con saldo mayor a 100:',
        tokens: ['WHERE', 'pais', '=', "'España'", 'AND', 'saldo', '>', '100'],
        solution: ['WHERE', 'pais', '=', "'España'", 'AND', 'saldo', '>', '100'],
        explanation: 'WHERE país = \'España\' AND saldo > 100 asegura ambos criterios.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l15-e08',
        type: 'predict_output',
        prompt: '¿Qué ocurre con la condición "WHERE id = 5 AND id = 10" para una misma fila?',
        code: 'SELECT * FROM usuarios WHERE id = 5 AND id = 10;',
        options: [
          'Devuelve los usuarios 5 y 10',
          'Devuelve 0 filas (un registro nunca puede tener dos IDs diferentes al mismo tiempo)',
          'Produce un error de base de datos',
          'Devuelve todos los usuarios del 5 al 10'
        ],
        correctOptionIndex: 1,
        explanation: 'Una columna en una misma fila solo tiene un valor a la vez. No puede ser simultáneamente 5 y 10. Para eso se usa OR.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l15-e09',
        type: 'code_cloze',
        prompt: 'Para filtrar productos disponibles que cuesten menos de 10 dólares:',
        codeWithBlank: 'WHERE disponible = 1 ___ precio < 10',
        options: ['AND', 'OR', 'NOR', 'PLUS'],
        correctOption: 'AND',
        explanation: 'AND exige disponibilidad y bajo precio.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l15-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta con filtro doble:',
        lines: [
          'SELECT email, saldo',
          'FROM clientes',
          'WHERE saldo > 0',
          '  AND activo = TRUE;'
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: 'Consulta con múltiples filtros encadenados con AND.',
        xpReward: 20
      }
    ]
  },
  16: {
    title: '16. Opciones: OR',
    desc: 'Basta con que una de las condiciones sea verdadera.',
    exercises: [
      {
        id: 'sql-u01-l16-e01',
        type: 'predict_output',
        prompt: '¿Qué registros seleccionará WHERE ciudad = \'Madrid\' OR ciudad = \'Sevilla\'?',
        code: 'SELECT nombre FROM usuarios WHERE ciudad = \'Madrid\' OR ciudad = \'Sevilla\';',
        options: [
          'Solo usuarios que vivan en ambas ciudades al mismo tiempo',
          'Usuarios que vivan en Madrid y también los que vivan en Sevilla',
          'Ningún usuario',
          'Solo usuarios de Madrid'
        ],
        correctOptionIndex: 1,
        explanation: 'OR incluye la fila si coincide con cualquiera de las dos ciudades especificadas.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l16-e02',
        type: 'code_builder',
        prompt: 'Filtra pedidos cuyo estado sea \'pendiente\' O \'en_revision\':',
        tokens: ['WHERE', 'estado', '=', "'pendiente'", 'OR', 'estado', '=', "'en_revision'"],
        solution: ['WHERE', 'estado', '=', "'pendiente'", 'OR', 'estado', '=', "'en_revision'"],
        explanation: 'OR permite capturar múltiples estados válidos.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l16-e03',
        type: 'code_cloze',
        prompt: 'Completa el operador de disyunción lógica en SQL:',
        codeWithBlank: 'SELECT * FROM tickets WHERE prioridad = \'alta\' ___ urgencia = \'critica\';',
        options: ['OR', '||', 'ANY', 'EITHER'],
        correctOption: 'OR',
        explanation: 'OR es el operador para evaluar si al menos una de las expresiones es verdadera.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l16-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error de sintaxis que usa el operador de tuberías || de JavaScript para un OR:',
        codeSnippet: [
          'SELECT * FROM vuelos',
          'WHERE origen = \'BOG\' || origen = \'MDE\'; -- ¡En SQL estándar || es concatenación de texto, no OR!'
        ],
        bugLineIndex: 1,
        explanation: 'En el estándar SQL || es el operador para concatenar cadenas de texto; para la disyunción lógica se usa la palabra OR.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l16-e05',
        type: 'matching_pairs',
        prompt: 'Empareja la tabla de verdad de OR en SQL:',
        pairs: [
          { left: 'TRUE OR FALSE', right: 'TRUE (la fila califica)' },
          { left: 'FALSE OR TRUE', right: 'TRUE (la fila califica)' },
          { left: 'TRUE OR TRUE', right: 'TRUE (la fila califica)' },
          { left: 'FALSE OR FALSE', right: 'FALSE (la fila es excluida)' }
        ],
        explanation: 'Con OR basta que una sola de las dos condiciones sea verdadera para que la fila pase el filtro.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l16-e06',
        type: 'predict_output',
        prompt: '¿Por qué la precedencia de operadores hace peligroso mezclar AND y OR sin paréntesis?',
        code: 'SELECT * FROM productos WHERE categoria = \'Ropa\' OR categoria = \'Zapatos\' AND precio < 20;',
        options: [
          'AND tiene mayor prioridad que OR, por lo que se evalúa primero cambiando el sentido esperado',
          'OR siempre se evalúa primero',
          'SQL arroja un error si no hay paréntesis',
          'Los dos operadores tienen la misma prioridad de izquierda a derecha'
        ],
        correctOptionIndex: 0,
        explanation: 'AND tiene mayor precedencia que OR (como la multiplicación frente a la suma). Se deben usar paréntesis: (A OR B) AND C.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l16-e07',
        type: 'code_builder',
        prompt: 'Construye la condición segura usando paréntesis con OR y AND:',
        tokens: ['WHERE', '(', 'pais', '=', "'MX'", 'OR', 'pais', '=', "'CO'", ')', 'AND', 'activo', '=', '1'],
        solution: ['WHERE', '(', 'pais', '=', "'MX'", 'OR', 'pais', '=', "'CO'", ')', 'AND', 'activo', '=', '1'],
        explanation: 'Los paréntesis fuerzan que el OR se evalúe antes que el AND.',
        xpReward: 20
      },
      {
        id: 'sql-u01-l16-e08',
        type: 'code_cloze',
        prompt: 'Para buscar a los clientes con id = 1 o con id = 2:',
        codeWithBlank: 'WHERE id = 1 ___ id = 2',
        options: ['OR', 'AND', 'WITH', 'EITHER'],
        correctOption: 'OR',
        explanation: 'OR permite recuperar ambos registros.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l16-e09',
        type: 'predict_output',
        prompt: '¿Qué devuelve "WHERE 1 = 1 OR 1 = 2"?',
        code: 'SELECT * FROM tabla WHERE 1 = 1 OR 1 = 2;',
        options: [
          'Todas las filas de la tabla (1 = 1 es siempre TRUE)',
          '0 filas',
          'Error de comparación',
          'Solo la primera fila'
        ],
        correctOptionIndex: 0,
        explanation: 'Al ser 1 = 1 siempre verdadero, la condición completa evalúa a TRUE para todas las filas.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l16-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta con disyunción de ciudades:',
        lines: [
          'SELECT nombre, ciudad',
          'FROM sucursales',
          'WHERE ciudad = \'Lima\'',
          '   OR ciudad = \'Cusco\';'
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: 'Consulta de sucursales en dos ciudades peruanas con OR.',
        xpReward: 20
      }
    ]
  },
  17: {
    title: '17. Rangos con BETWEEN',
    desc: 'Filtra datos dentro de un rango cerrado e inclusivo.',
    exercises: [
      {
        id: 'sql-u01-l17-e01',
        type: 'code_builder',
        prompt: 'Filtra productos cuyo precio esté entre 10 y 50 inclusive:',
        tokens: ['WHERE', 'precio', 'BETWEEN', '10', 'AND', '50', ';'],
        solution: ['WHERE', 'precio', 'BETWEEN', '10', 'AND', '50'],
        explanation: 'BETWEEN 10 AND 50 es idéntico a (precio >= 10 AND precio <= 50).',
        xpReward: 20
      },
      {
        id: 'sql-u01-l17-e02',
        type: 'predict_output',
        prompt: '¿Incluye la cláusula "BETWEEN 10 AND 20" los números 10 y 20 exactamente?',
        code: 'SELECT * FROM numeros WHERE n BETWEEN 10 AND 20;',
        options: [
          'No, solo los números del 11 al 19',
          'Sí, BETWEEN en SQL es siempre inclusivo en ambos extremos',
          'Solo incluye el 10 pero no el 20',
          'Solo incluye el 20 pero no el 10'
        ],
        correctOptionIndex: 1,
        explanation: 'En el estándar SQL, BETWEEN siempre incluye ambos límites inferior y superior.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l17-e03',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para filtrar dentro de un rango:',
        codeWithBlank: 'SELECT * FROM ventas WHERE fecha ___ \'2024-01-01\' AND \'2024-01-31\';',
        options: ['BETWEEN', 'RANGE', 'IN', 'WITHIN'],
        correctOption: 'BETWEEN',
        explanation: 'BETWEEN conecta el valor mínimo y máximo con la conjunción AND.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l17-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error donde los límites están invertidos (el mayor antes que el menor):',
        codeSnippet: [
          'SELECT * FROM productos',
          'WHERE precio BETWEEN 100 AND 20; -- ¡En BETWEEN el menor va primero!'
        ],
        bugLineIndex: 1,
        explanation: 'BETWEEN x AND y requiere que x <= y. Si escribes BETWEEN 100 AND 20 no coincidirá ninguna fila.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l17-e05',
        type: 'matching_pairs',
        prompt: 'Empareja la sintaxis de BETWEEN con su expresión equivalente:',
        pairs: [
          { left: 'edad BETWEEN 18 AND 30', right: 'edad >= 18 AND edad <= 30' },
          { left: 'precio NOT BETWEEN 10 AND 50', right: 'precio < 10 OR precio > 50' },
          { left: 'fecha BETWEEN d1 AND d2', right: 'fecha >= d1 AND fecha <= d2' },
          { left: 'BETWEEN', right: 'Rango inclusivo de dos extremos' }
        ],
        explanation: 'BETWEEN es azúcar sintáctico para simplificar comparaciones de rango con >= y <=.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l17-e06',
        type: 'predict_output',
        prompt: '¿Qué registros devolverá "WHERE calificacion NOT BETWEEN 60 AND 100"?',
        code: 'SELECT * FROM alumnos WHERE calificacion NOT BETWEEN 60 AND 100;',
        options: [
          'Todos los alumnos con calificaciones fuera del rango (menos de 60)',
          'Alumnos con calificación entre 60 y 100',
          'Solo los de 60 exacto',
          'Ninguno'
        ],
        correctOptionIndex: 0,
        explanation: 'NOT BETWEEN invierte la condición, seleccionando los valores estrictamente fuera del intervalo.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l17-e07',
        type: 'code_builder',
        prompt: 'Filtra pedidos con fecha en el mes de enero 2024:',
        tokens: ['WHERE', 'fecha', 'BETWEEN', "'2024-01-01'", 'AND', "'2024-01-31'"],
        solution: ['WHERE', 'fecha', 'BETWEEN', "'2024-01-01'", 'AND', "'2024-01-31'"],
        explanation: 'BETWEEN con fechas ISO permite filtrar meses completos con elegancia.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l17-e08',
        type: 'code_cloze',
        prompt: '¿Qué palabra une los dos extremos de un BETWEEN?',
        codeWithBlank: 'WHERE puntaje BETWEEN 100 ___ 200',
        options: ['AND', 'TO', '-', 'OR'],
        correctOption: 'AND',
        explanation: 'La sintaxis obligatoria es siempre BETWEEN valor1 AND valor2.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l17-e09',
        type: 'predict_output',
        prompt: '¿Se puede usar BETWEEN con letras del abecedario?',
        code: 'SELECT * FROM nombres WHERE inicial BETWEEN \'A\' AND \'C\';',
        options: [
          'No, solo funciona con números',
          'Sí, evalúa el orden lexicográfico del texto',
          'Produce un error de tipo',
          'Solo funciona con vocales'
        ],
        correctOptionIndex: 1,
        explanation: 'BETWEEN opera con cualquier tipo de dato ordinal, incluyendo cadenas y fechas.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l17-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta de rango salarial:',
        lines: [
          'SELECT puesto, salario',
          'FROM puestos_laborales',
          'WHERE salario BETWEEN 2000 AND 4000;'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Consulta de empleados dentro de la banda salarial media.',
        xpReward: 20
      }
    ]
  },
  18: {
    title: '18. Listas de Pertenencia con IN',
    desc: 'Reemplaza múltiples condiciones OR consecutivas de forma limpia.',
    exercises: [
      {
        id: 'sql-u01-l18-e01',
        type: 'code_cloze',
        prompt: 'Completa la cláusula para buscar coincidencias dentro de una lista:',
        codeWithBlank: 'SELECT * FROM clientes WHERE pais ___ (\'MX\', \'CO\', \'ES\');',
        options: ['IN', 'WITHIN', 'FROM', 'LIKE'],
        correctOption: 'IN',
        explanation: 'IN evalúa si el valor de la columna coincide con cualquiera de los elementos listados entre paréntesis.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l18-e02',
        type: 'predict_output',
        prompt: '¿A cuál de estas consultas equivale exactamente "WHERE id IN (1, 5, 9)"?',
        code: 'SELECT * FROM articulos WHERE id IN (1, 5, 9);',
        options: [
          'WHERE id = 1 AND id = 5 AND id = 9',
          'WHERE id = 1 OR id = 5 OR id = 9',
          'WHERE id BETWEEN 1 AND 9',
          'WHERE id >= 1'
        ],
        correctOptionIndex: 1,
        explanation: 'IN es una forma limpia y compacta de escribir múltiples comparaciones OR sobre la misma columna.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l18-e03',
        type: 'code_builder',
        prompt: 'Filtra usuarios cuyo rol sea \'admin\' o \'editor\':',
        tokens: ['WHERE', 'rol', 'IN', '(', "'admin'", ',', "'editor'", ')'],
        solution: ['WHERE', 'rol', 'IN', '(', "'admin'", ',', "'editor'", ')'],
        explanation: 'WHERE columna IN (val1, val2) agrupa múltiples valores posibles.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l18-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error de corchetes en lugar de paréntesis para la lista IN:',
        codeSnippet: [
          'SELECT * FROM pedidos',
          'WHERE estado IN [\'enviado\', \'entregado\']; -- ¡En SQL las listas IN usan () no []!'
        ],
        bugLineIndex: 1,
        explanation: 'En SQL las listas literales de la cláusula IN siempre se encierran entre paréntesis (), nunca corchetes.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l18-e05',
        type: 'matching_pairs',
        prompt: 'Empareja el operador con su contraparte negativa:',
        pairs: [
          { left: 'IN', right: 'NOT IN (excluye todos los elementos de la lista)' },
          { left: 'BETWEEN', right: 'NOT BETWEEN (excluye el intervalo)' },
          { left: 'LIKE', right: 'NOT LIKE (excluye el patrón)' },
          { left: '=', right: '<> o != (desigualdad directa)' }
        ],
        explanation: 'La negación NOT se combina con los operadores para invertir completamente su selección.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l18-e06',
        type: 'predict_output',
        prompt: '¿Qué registros devolverá "WHERE categoria NOT IN (\'Hogar\', \'Juguetes\')"?',
        code: 'SELECT * FROM productos WHERE categoria NOT IN (\'Hogar\', \'Juguetes\');',
        options: [
          'Todos los productos excepto los de \'Hogar\' y \'Juguetes\'',
          'Solo productos de Hogar',
          'Solo productos de Juguetes',
          'Ninguno'
        ],
        correctOptionIndex: 0,
        explanation: 'NOT IN excluye todas las filas cuyos valores pertenezcan al conjunto entre paréntesis.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l18-e07',
        type: 'code_builder',
        prompt: 'Filtra empleados en los departamentos 10, 20 o 30:',
        tokens: ['WHERE', 'depto_id', 'IN', '(', '10', ',', '20', ',', '30', ')'],
        solution: ['WHERE', 'depto_id', 'IN', '(', '10', ',', '20', ',', '30', ')'],
        explanation: 'Sintaxis limpia de pertenencia numérica con IN.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l18-e08',
        type: 'code_cloze',
        prompt: '¿Qué operador precede a IN para excluir la lista?',
        codeWithBlank: 'WHERE status ___ IN (\'cancelado\', \'reembolsado\')',
        options: ['NOT', 'NO', 'WITHOUT', 'EXCEPT'],
        correctOption: 'NOT',
        explanation: 'NOT IN filtra las filas que no estén en la lista.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l18-e09',
        type: 'predict_output',
        prompt: '¿Se puede usar una subconsulta dentro de la cláusula IN?',
        code: 'SELECT * FROM clientes WHERE id IN (SELECT cliente_id FROM compras);',
        options: [
          'No, IN solo acepta números fijos escritos a mano',
          'Sí, IN soporta subconsultas que devuelvan una sola columna de valores',
          'Solo en Oracle',
          'Solo si la subconsulta devuelve 1 sola fila'
        ],
        correctOptionIndex: 1,
        explanation: 'IN con subconsultas es una de las construcciones más poderosas de SQL para relacionar datos.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l18-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la consulta con filtro IN:',
        lines: [
          'SELECT codigo, pais',
          'FROM sedes',
          'WHERE pais IN (\'CL\', \'PE\', \'EC\');'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Filtro por países andinos utilizando IN.',
        xpReward: 20
      }
    ]
  },
  19: {
    title: '19. Patrones de Texto con LIKE',
    desc: 'Búsquedas difusas con comodines de porcentaje y guión bajo.',
    exercises: [
      {
        id: 'sql-u01-l19-e01',
        type: 'predict_output',
        prompt: '¿Qué nombres coincidirán con el patrón WHERE nombre LIKE \'A%\'?',
        code: 'SELECT nombre FROM usuarios WHERE nombre LIKE \'A%\';',
        options: [
          'Nombres que terminan con la letra A',
          'Nombres que empiezan con la letra A (Ana, Andrés, Alberto...)',
          'Solo nombres de exactamente 2 letras',
          'Nombres que contienen A en el medio'
        ],
        correctOptionIndex: 1,
        explanation: 'El comodín % representa cero, uno o muchos caracteres cualesquiera tras la letra A.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l19-e02',
        type: 'code_builder',
        prompt: 'Busca correos electrónicos que terminen en \'@gmail.com\':',
        tokens: ['WHERE', 'email', 'LIKE', "'%@gmail.com'", ';', '=='],
        solution: ['WHERE', 'email', 'LIKE', "'%@gmail.com'"],
        explanation: '\'%@gmail.com\' busca cualquier texto inicial seguido por el dominio exacto al final.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l19-e03',
        type: 'matching_pairs',
        prompt: 'Empareja los comodines de LIKE con su comportamiento:',
        pairs: [
          { left: '% (Porcentaje)', right: 'Cero, uno o múltiples caracteres' },
          { left: '_ (Guión bajo)', right: 'Exactamente UN único carácter' },
          { left: '\'%dev%\'', right: 'Contiene la palabra dev en cualquier posición' },
          { left: '\'____\'', right: 'Cualquier texto de exactamente 4 caracteres' }
        ],
        explanation: '% y _ son los dos comodines canónicos de búsqueda por patrones en SQL.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l19-e04',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave para realizar búsquedas por patrón:',
        codeWithBlank: 'SELECT * FROM libros WHERE titulo ___ \'%SQL%\';',
        options: ['LIKE', 'SIMILAR', 'MATCH', 'CONTAINS'],
        correctOption: 'LIKE',
        explanation: 'LIKE es el operador universal para comparación difusa de cadenas.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l19-e05',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error donde se usó el asterisco * en lugar de % para LIKE:',
        codeSnippet: [
          'SELECT * FROM contactos',
          'WHERE apellido LIKE \'*Gomez\'; -- ¡El comodín de SQL es % y no *!'
        ],
        bugLineIndex: 1,
        explanation: 'En SQL el comodín de cadena es %, no el asterisco * (que solo es comodín en expresiones regulares o en SELECT *).',
        xpReward: 15
      },
      {
        id: 'sql-u01-l19-e06',
        type: 'predict_output',
        prompt: '¿Qué cadenas coincidirán con el patrón \'T_st\' usando el guión bajo?',
        code: 'SELECT * FROM logs WHERE tag LIKE \'T_st\';',
        options: [
          'Solo cadenas de 4 letras con cualquier caracter en medio (Test, Tost, T1st)',
          'Cualquier texto que empiece con T y termine con st de cualquier longitud',
          'Solo \'T_st\' literal',
          'Ninguna'
        ],
        correctOptionIndex: 0,
        explanation: 'El guión bajo (_) representa exactamente un solo carácter en esa posición.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l19-e07',
        type: 'code_builder',
        prompt: 'Busca productos que contengan la palabra \'Pro\' en cualquier parte del nombre:',
        tokens: ['WHERE', 'nombre', 'LIKE', "'%Pro%'", ';', 'IN'],
        solution: ['WHERE', 'nombre', 'LIKE', "'%Pro%'"],
        explanation: '\'%Pro%\' busca coincidencias al inicio, en medio o al final.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l19-e08',
        type: 'predict_output',
        prompt: 'En PostgreSQL, ¿qué operador se utiliza para una búsqueda LIKE que ignore mayúsculas y minúsculas?',
        code: 'WHERE nombre ILIKE \'%ana%\';',
        options: [
          'ILIKE (Insensitive LIKE)',
          'TOLIKELOWER',
          'LIKE_NOCASE',
          'EQUAL'
        ],
        correctOptionIndex: 0,
        explanation: 'ILIKE es una extensión muy popular en PostgreSQL que compara sin importar mayúsculas ni minúsculas.',
        xpReward: 10
      },
      {
        id: 'sql-u01-l19-e09',
        type: 'code_cloze',
        prompt: 'Para buscar nombres de exactamente 3 letras que terminen en "on":',
        codeWithBlank: 'WHERE nombre LIKE \'___on\'',
        options: ['_', '%', '*', '?'],
        correctOption: '_',
        explanation: '_on exige exactamente un carácter antes de "on" (por ejemplo: Don, Jon, Ron).',
        xpReward: 10
      },
      {
        id: 'sql-u01-l19-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la búsqueda de correos de empresa corporativos:',
        lines: [
          'SELECT usuario, email',
          'FROM empleados',
          'WHERE email LIKE \'%@empresa.com\';'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Filtrado de correos con terminación específica usando LIKE.',
        xpReward: 20
      }
    ]
  },
  20: {
    title: '20. Desafío de Síntesis: Gran Query',
    desc: 'Construye consultas completas con proyección, alias y filtros avanzados.',
    exercises: [
      {
        id: 'sql-u01-l20-e01',
        type: 'code_builder',
        prompt: 'Arma la consulta completa: nombre, precio de \'productos\' donde precio > 100:',
        tokens: ['SELECT', 'nombre', ',', 'precio', 'FROM', 'productos', 'WHERE', 'precio', '>', '100', ';'],
        solution: ['SELECT', 'nombre', ',', 'precio', 'FROM', 'productos', 'WHERE', 'precio', '>', '100', ';'],
        explanation: 'Estructura canónica completa de SQL: proyección, fuente y filtro condicional.',
        xpReward: 30
      },
      {
        id: 'sql-u01-l20-e02',
        type: 'predict_output',
        prompt: '¿En qué orden lógico procesa el motor RDBMS las cláusulas de esta consulta?',
        code: 'SELECT nombre AS cliente\nFROM usuarios\nWHERE activo = TRUE;',
        options: [
          '1° SELECT, 2° FROM, 3° WHERE',
          '1° FROM (localiza tabla), 2° WHERE (filtra filas), 3° SELECT (proyecta y asigna alias)',
          '1° WHERE, 2° SELECT, 3° FROM',
          'Todas a la vez aleatoriamente'
        ],
        correctOptionIndex: 1,
        explanation: 'El orden lógico de ejecución en SQL es FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.',
        xpReward: 20
      },
      {
        id: 'sql-u01-l20-e03',
        type: 'matching_pairs',
        prompt: 'Empareja cada cláusula SQL con su rol en la Gran Query:',
        pairs: [
          { left: 'SELECT', right: 'Especifica las columnas proyectadas y sus alias' },
          { left: 'FROM', right: 'Declara la tabla origen de los datos' },
          { left: 'WHERE', right: 'Filtra las filas mediante predicados booleanos' },
          { left: 'DISTINCT', right: 'Elimina filas idénticas duplicadas del resultado' }
        ],
        explanation: 'Dominar la interacción entre estas cláusulas constituye el núcleo fundamental de SQL.',
        xpReward: 25
      },
      {
        id: 'sql-u01-l20-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error de orden estructural en la consulta combinada:',
        codeSnippet: [
          'SELECT id, nombre',
          'WHERE edad >= 18 -- ¡WHERE no puede ir antes de FROM!',
          'FROM clientes;'
        ],
        bugLineIndex: 1,
        explanation: 'La cláusula FROM debe preceder siempre a la cláusula WHERE.',
        xpReward: 20
      },
      {
        id: 'sql-u01-l20-e05',
        type: 'code_cloze',
        prompt: 'Completa la consulta de síntesis con el alias adecuado:',
        codeWithBlank: 'SELECT nombre, precio * 0.9 ___ precio_rebajado FROM productos WHERE stock > 0;',
        options: ['AS', 'LIKE', 'IN', 'IS'],
        correctOption: 'AS',
        explanation: 'AS asigna el alias a la columna calculada con el descuento.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l20-e06',
        type: 'predict_output',
        prompt: '¿Cuántos registros devolverá esta consulta si hay 3 productos de Tech con precio > 50?',
        code: 'SELECT DISTINCT id FROM productos WHERE categoria = \'Tech\' AND precio > 50;',
        options: [
          'Exactamente 3 filas',
          '0 filas',
          '50 filas',
          'Depende del servidor'
        ],
        correctOptionIndex: 0,
        explanation: 'Al ser id clave primaria, los 3 registros son únicos y se devuelven intactos.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l20-e07',
        type: 'code_builder',
        prompt: 'Construye la consulta con filtro compuesto por país y estado:',
        tokens: ['SELECT', '*', 'FROM', 'clientes', 'WHERE', 'pais', '=', "'MX'", 'AND', 'activo', '=', '1', ';'],
        solution: ['SELECT', '*', 'FROM', 'clientes', 'WHERE', 'pais', '=', "'MX'", 'AND', 'activo', '=', '1', ';'],
        explanation: 'Consulta de negocio completa con filtro AND.',
        xpReward: 20
      },
      {
        id: 'sql-u01-l20-e08',
        type: 'predict_output',
        prompt: '¿Cuál es el valor devuelto por la consulta: SELECT 10 + 5 * 2 AS resultado;?',
        code: 'SELECT 10 + 5 * 2 AS resultado;',
        options: [
          '30',
          '20 (la multiplicación 5 * 2 = 10 tiene precedencia sobre la suma + 10)',
          '15',
          'Error aritmético'
        ],
        correctOptionIndex: 1,
        explanation: 'SQL respeta la jerarquía matemática estándar: 5 * 2 = 10; luego 10 + 10 = 20.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l20-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para buscar usuarios sin teléfono registrado:',
        codeWithBlank: 'SELECT * FROM clientes WHERE telefono IS ___',
        options: ['NULL', 'EMPTY', 'ZERO', 'VOID'],
        correctOption: 'NULL',
        explanation: 'IS NULL es la sintaxis correcta y exclusiva para detectar valores nulos.',
        xpReward: 15
      },
      {
        id: 'sql-u01-l20-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la Gran Query de síntesis de la Unidad 1 de SQL:',
        lines: [
          'SELECT nombre, precio AS costo_usd',
          'FROM catalogo',
          'WHERE categoria IN (\'Tech\', \'Gaming\')',
          '  AND precio BETWEEN 50 AND 500;'
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: '¡Felicitaciones! Has dominado proyección, alias, listas IN y rangos BETWEEN en SQL.',
        xpReward: 30
      }
    ]
  }
};

// Generador que devuelve los 10 ejercicios del banco pedagógico por nivel
export function getSQLLevelExercises(level: number, id: string): Exercise[] {
  const bank = SQL_TOPIC_BANKS[level];
  if (bank && bank.exercises.length >= 10) {
    return bank.exercises;
  }

  // Respaldo de seguridad si algún nivel no estuviera registrado
  return [
    {
      id: `${id}-e01`,
      type: 'matching_pairs',
      prompt: 'Empareja los términos de la consulta:',
      pairs: [
        { left: 'SELECT', right: 'Proyección' },
        { left: 'FROM', right: 'Tabla origen' },
        { left: 'WHERE', right: 'Filtro de filas' },
        { left: ';', right: 'Delimitador final' }
      ],
      explanation: 'Estructura canónica de SQL.',
      xpReward: 15
    }
  ];
}

// 20 Niveles oficiales de la Unidad 1 de SQL
export const SQL_UNIT_01_LESSONS: Lesson[] = [
  {
    id: 'sql-u01-l01',
    path: 'sql',
    unit: 1,
    level: 1,
    title: SQL_TOPIC_BANKS[1].title,
    description: SQL_TOPIC_BANKS[1].desc,
    exercises: getSQLLevelExercises(1, 'sql-u01-l01')
  },
  {
    id: 'sql-u01-l02',
    path: 'sql',
    unit: 1,
    level: 2,
    title: SQL_TOPIC_BANKS[2].title,
    description: SQL_TOPIC_BANKS[2].desc,
    exercises: getSQLLevelExercises(2, 'sql-u01-l02')
  },
  {
    id: 'sql-u01-l03',
    path: 'sql',
    unit: 1,
    level: 3,
    title: SQL_TOPIC_BANKS[3].title,
    description: SQL_TOPIC_BANKS[3].desc,
    exercises: getSQLLevelExercises(3, 'sql-u01-l03')
  },
  {
    id: 'sql-u01-l04',
    path: 'sql',
    unit: 1,
    level: 4,
    title: SQL_TOPIC_BANKS[4].title,
    description: SQL_TOPIC_BANKS[4].desc,
    exercises: getSQLLevelExercises(4, 'sql-u01-l04')
  },
  {
    id: 'sql-u01-l05',
    path: 'sql',
    unit: 1,
    level: 5,
    title: SQL_TOPIC_BANKS[5].title,
    description: SQL_TOPIC_BANKS[5].desc,
    exercises: getSQLLevelExercises(5, 'sql-u01-l05')
  },
  {
    id: 'sql-u01-l06',
    path: 'sql',
    unit: 1,
    level: 6,
    title: SQL_TOPIC_BANKS[6].title,
    description: SQL_TOPIC_BANKS[6].desc,
    exercises: getSQLLevelExercises(6, 'sql-u01-l06')
  },
  {
    id: 'sql-u01-l07',
    path: 'sql',
    unit: 1,
    level: 7,
    title: SQL_TOPIC_BANKS[7].title,
    description: SQL_TOPIC_BANKS[7].desc,
    exercises: getSQLLevelExercises(7, 'sql-u01-l07')
  },
  {
    id: 'sql-u01-l08',
    path: 'sql',
    unit: 1,
    level: 8,
    title: SQL_TOPIC_BANKS[8].title,
    description: SQL_TOPIC_BANKS[8].desc,
    exercises: getSQLLevelExercises(8, 'sql-u01-l08')
  },
  {
    id: 'sql-u01-l09',
    path: 'sql',
    unit: 1,
    level: 9,
    title: SQL_TOPIC_BANKS[9].title,
    description: SQL_TOPIC_BANKS[9].desc,
    exercises: getSQLLevelExercises(9, 'sql-u01-l09')
  },
  {
    id: 'sql-u01-l10',
    path: 'sql',
    unit: 1,
    level: 10,
    title: SQL_TOPIC_BANKS[10].title,
    description: SQL_TOPIC_BANKS[10].desc,
    exercises: getSQLLevelExercises(10, 'sql-u01-l10')
  },
  {
    id: 'sql-u01-l11',
    path: 'sql',
    unit: 1,
    level: 11,
    title: SQL_TOPIC_BANKS[11].title,
    description: SQL_TOPIC_BANKS[11].desc,
    exercises: getSQLLevelExercises(11, 'sql-u01-l11')
  },
  {
    id: 'sql-u01-l12',
    path: 'sql',
    unit: 1,
    level: 12,
    title: SQL_TOPIC_BANKS[12].title,
    description: SQL_TOPIC_BANKS[12].desc,
    exercises: getSQLLevelExercises(12, 'sql-u01-l12')
  },
  {
    id: 'sql-u01-l13',
    path: 'sql',
    unit: 1,
    level: 13,
    title: SQL_TOPIC_BANKS[13].title,
    description: SQL_TOPIC_BANKS[13].desc,
    exercises: getSQLLevelExercises(13, 'sql-u01-l13')
  },
  {
    id: 'sql-u01-l14',
    path: 'sql',
    unit: 1,
    level: 14,
    title: SQL_TOPIC_BANKS[14].title,
    description: SQL_TOPIC_BANKS[14].desc,
    exercises: getSQLLevelExercises(14, 'sql-u01-l14')
  },
  {
    id: 'sql-u01-l15',
    path: 'sql',
    unit: 1,
    level: 15,
    title: SQL_TOPIC_BANKS[15].title,
    description: SQL_TOPIC_BANKS[15].desc,
    exercises: getSQLLevelExercises(15, 'sql-u01-l15')
  },
  {
    id: 'sql-u01-l16',
    path: 'sql',
    unit: 1,
    level: 16,
    title: SQL_TOPIC_BANKS[16].title,
    description: SQL_TOPIC_BANKS[16].desc,
    exercises: getSQLLevelExercises(16, 'sql-u01-l16')
  },
  {
    id: 'sql-u01-l17',
    path: 'sql',
    unit: 1,
    level: 17,
    title: SQL_TOPIC_BANKS[17].title,
    description: SQL_TOPIC_BANKS[17].desc,
    exercises: getSQLLevelExercises(17, 'sql-u01-l17')
  },
  {
    id: 'sql-u01-l18',
    path: 'sql',
    unit: 1,
    level: 18,
    title: SQL_TOPIC_BANKS[18].title,
    description: SQL_TOPIC_BANKS[18].desc,
    exercises: getSQLLevelExercises(18, 'sql-u01-l18')
  },
  {
    id: 'sql-u01-l19',
    path: 'sql',
    unit: 1,
    level: 19,
    title: SQL_TOPIC_BANKS[19].title,
    description: SQL_TOPIC_BANKS[19].desc,
    exercises: getSQLLevelExercises(19, 'sql-u01-l19')
  },
  {
    id: 'sql-u01-l20',
    path: 'sql',
    unit: 1,
    level: 20,
    title: SQL_TOPIC_BANKS[20].title,
    description: SQL_TOPIC_BANKS[20].desc,
    exercises: getSQLLevelExercises(20, 'sql-u01-l20')
  }
];
