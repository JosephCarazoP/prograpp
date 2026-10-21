import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_05_THEORY: Record<string, TheoryLesson> = {
  "sql-u05-l01": {
    "id": "sql-th-u05-l01",
    "lessonId": "sql-u05-l01",
    "pathId": "sql",
    "unitId": 5,
    "levelId": 1,
    "title": "1. INSERT INTO con columnas explícitas",
    "subtitle": "Aprende a guardar nuevos registros en tus tablas utilizando la sentencia INSERT INTO.",
    "estimatedMinutes": 8,
    "analogy": "Rellenar una nueva ficha de cliente en recepción y archivarla en la gaveta correspondiente: anotas los datos en sus casillas y metes la hoja en la carpeta de clientes.",
    "video": {
      "title": "INSERT INTO: Inserción de Registros y Valores Predeterminados",
      "channel": "Fazt Code",
      "duration": "29:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Inserción explícita, inserciones múltiples y orden correcto respetando relaciones."
    },
    "sections": [
      {
        "title": "La sentencia INSERT INTO con columnas explícitas",
        "explanation": "Una vez que la tabla fue creada con `CREATE TABLE`, está vacía y lista para recibir datos. La instrucción oficial de SQL para agregar nuevas filas es **`INSERT INTO`**.\n\nLa forma más segura, clara y recomendada es **especificar explícitamente las columnas**:\n`INSERT INTO nombre_tabla (columna1, columna2, columna3)`\n`VALUES (valor1, valor2, valor3);`\n\nVentajas de listar las columnas:\n• Si en el futuro agregas nuevas columnas a la tabla con `ALTER TABLE`, tus sentencias `INSERT` antiguas seguirán funcionando sin romperse.\n• No dependes del orden físico interno en que fueron creadas las columnas.\n• Puedes omitir columnas que tengan autoincremento o valores `DEFAULT`.",
        "codeSnippet": "-- Insertamos un nuevo producto especificando exactamente qué columnas llenamos\nINSERT INTO productos (nombre, categoria, precio, stock)\nVALUES ('Audífonos Gamer 7.1', 'Audio', 79.99, 30);",
        "codeLanguage": "sql",
        "outputSnippet": "1 fila insertada con éxito.",
        "byteTip": "Si tu tabla tiene id autoincremental, omite la columna id en la lista de columnas para que SQLite la asigne solo.",
        "pitfallTip": "La cantidad de nombres en la lista de columnas debe coincidir exactamente con la cantidad de valores dentro de VALUES(...).",
        "keyPoints": [
          "INSERT INTO agrega nuevos registros a una tabla existente.",
          "Listar las columnas explícitamente es la mejor práctica de compatibilidad.",
          "Omitir columnas autoincrementales permite que el motor asigne el ID automáticamente."
        ]
      },
      {
        "title": "Verificar la inserción con SELECT",
        "explanation": "La forma estándar de comprobar que un registro se insertó con éxito es consultarlo inmediatamente con un `SELECT` filtrado:",
        "codeSnippet": "-- Consultamos los productos de la categoría Audio para verificar la inserción\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE categoria = 'Audio';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+------------------------------+--------+-------+\n| id | nombre                       | precio | stock |\n+----+------------------------------+--------+-------+\n| 4  | Auriculares Cancelación Ruido| 129.0  | 25    |\n| 6  | Audífonos Gamer 7.1          | 79.99  | 30    |\n+----+------------------------------+--------+-------+\n2 filas devueltas",
        "byteTip": "En Android con Room, los métodos anotados con @Insert devuelven el ID numérico recién generado (Long).",
        "pitfallTip": "No asumas que un INSERT tuvo éxito sin revisar el código de respuesta del motor.",
        "keyPoints": [
          "SELECT permite auditar el resultado de un INSERT.",
          "Los datos recién guardados están inmediatamente disponibles para consulta.",
          "Es el paso inicial en el ciclo CRUD (Create, Read, Update, Delete)."
        ]
      }
    ]
  },
  "sql-u05-l02": {
    "id": "sql-th-u05-l02",
    "lessonId": "sql-u05-l02",
    "pathId": "sql",
    "unitId": 5,
    "levelId": 2,
    "title": "2. Correspondencia entre columnas y valores",
    "subtitle": "Asegura la correspondencia uno a uno entre la lista de columnas y la lista de valores.",
    "estimatedMinutes": 8,
    "analogy": "Poner los botones de una camisa en sus ojales: el primer botón debe entrar en el primer ojal, el segundo en el segundo. Si te saltas uno, la camisa queda chueca.",
    "video": {
      "title": "INSERT INTO: Inserción de Registros y Valores Predeterminados",
      "channel": "Fazt Code",
      "duration": "29:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Inserción explícita, inserciones múltiples y orden correcto respetando relaciones."
    },
    "sections": [
      {
        "title": "Correspondencia posicional entre columnas y valores",
        "explanation": "En la sentencia `INSERT INTO`, el orden de los elementos dentro de `VALUES(...)` debe coincidir **estrictamente de izquierda a derecha** con la lista de columnas que escribiste:\n\nSi escribes:\n`INSERT INTO usuarios (nombre, edad, email)`\n`VALUES ('Lucas', 28, 'lucas@correo.com');`\n\n• `'Lucas'` (primer valor) se asigna a `nombre` (primera columna).\n• `28` (segundo valor) se asigna a `edad` (segunda columna).\n• `'lucas@correo.com'` (tercer valor) se asigna a `email` (tercera columna).\n\nSi inviertes el orden por error y pones `VALUES (28, 'Lucas', ...)`, SQLite intentará guardar `28` como nombre y `'Lucas'` como edad, provocando inconsistencias o errores de tipo.",
        "codeSnippet": "-- Inserción con correspondencia exacta de tipos y posiciones\nINSERT INTO usuarios (nombre, email, edad, pais, activo)\nVALUES ('Ada Lovelace Jr', 'ada.jr@pioneers.org', 24, 'Reino Unido', true);",
        "codeLanguage": "sql",
        "outputSnippet": "1 fila insertada con éxito.",
        "byteTip": "Puedes cambiar el orden de las columnas en el INSERT siempre y cuando cambies el orden de los valores de la misma forma.",
        "pitfallTip": "Un desajuste en el orden de columnas numéricas y de texto es uno de los bugs silenciosos más molestos de detectar.",
        "keyPoints": [
          "La asignación de valores a columnas se rige por su posición exacta.",
          "El tipo de cada valor debe ser compatible con la afinidad de la columna de destino.",
          "Revisar la correspondencia previene almacenar datos en casillas equivocadas."
        ]
      },
      {
        "title": "Verificación de tipos en inserciones",
        "explanation": "Verificamos que el registro nuevo conserve los tipos de datos coherentes con el resto de la tabla:",
        "codeSnippet": "-- Consultamos el usuario recién ingresado\nSELECT id, nombre, email, edad, pais\nFROM usuarios\nWHERE email = 'ada.jr@pioneers.org';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+---------------------+------+-------------+\n| id | nombre          | email               | edad | pais        |\n+----+-----------------+---------------------+------+-------------+\n| 6  | Ada Lovelace Jr | ada.jr@pioneers.org | 24   | Reino Unido |\n+----+-----------------+---------------------+------+-------------+\n1 fila devuelta",
        "byteTip": "Consultar por email único es rápido y preciso.",
        "pitfallTip": "No envíes números entre comillas si la columna es INTEGER; aunque SQLite sea flexible, puede provocar comparaciones de texto inesperadas.",
        "keyPoints": [
          "Cada valor debe insertarse con su representación nativa (números sin comillas, textos con comillas).",
          "La base de datos valida las restricciones de cada casilla.",
          "Mantiene la consistencia con las entidades de Kotlin."
        ]
      }
    ]
  },
  "sql-u05-l03": {
    "id": "sql-th-u05-l03",
    "lessonId": "sql-u05-l03",
    "pathId": "sql",
    "unitId": 5,
    "levelId": 3,
    "title": "3. Insertar varios registros",
    "subtitle": "Acelera la carga masiva de datos insertando múltiples filas en una sola sentencia SQL.",
    "estimatedMinutes": 8,
    "analogy": "Subir al autobús con un boleto familiar para 4 personas de un solo golpe, en lugar de que cada uno haga fila, pague y suba por separado 4 veces seguidas.",
    "video": {
      "title": "INSERT INTO: Inserción de Registros y Valores Predeterminados",
      "channel": "Fazt Code",
      "duration": "29:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Inserción explícita, inserciones múltiples y orden correcto respetando relaciones."
    },
    "sections": [
      {
        "title": "Inserción de múltiples filas (Bulk Insert)",
        "explanation": "Si necesitas insertar 10, 50 o 1,000 registros, ejecutar sentencias `INSERT INTO` individuales una por una es lentísimo porque el motor abre y cierra una transacción de disco para cada una.\n\nSQL estándar y SQLite permiten insertar **múltiples filas en una sola instrucción**, separando cada grupo de valores con una coma (`,`):\n\n`INSERT INTO productos (nombre, precio, stock) VALUES`\n`    ('Producto A', 10.0, 50),`\n`    ('Producto B', 20.0, 30),`\n`    ('Producto C', 15.5, 100);`\n\nEsta técnica es entre 10 y 100 veces más rápida que hacer inserciones individuales sueltas.",
        "codeSnippet": "-- Inserción múltiple de tres asignaturas en una sola sentencia atómica\nINSERT INTO asignaturas (id, nombre, creditos, departamento) VALUES\n    (106, 'Arquitectura de Software', 4, 'Informática'),\n    (107, 'Inteligencia Artificial', 5, 'Informática'),\n    (108, 'Estadística Aplicada', 4, 'Matemáticas');",
        "codeLanguage": "sql",
        "outputSnippet": "3 filas insertadas en una sola operación.",
        "byteTip": "En SQLite puedes insertar hasta 500 filas de un solo tirón con esta técnica sin ningún problema.",
        "pitfallTip": "Si una sola de las filas tiene un error (por ejemplo, un ID duplicado), toda la sentencia se cancela y ninguna de las filas se guardará.",
        "keyPoints": [
          "Insertar múltiples filas en un solo INSERT multiplica la velocidad de escritura.",
          "Se separan las tuplas de VALUES con comas.",
          "Es la técnica estándar para precargar datos iniciales (seeds) en apps móviles."
        ]
      },
      {
        "title": "Comprobar la carga masiva",
        "explanation": "Verificamos que las tres asignaturas aparezcan disponibles en el catálogo académico:",
        "codeSnippet": "-- Consultamos las asignaturas con ID superior a 105 para ver el lote cargado\nSELECT id, nombre, creditos, departamento\nFROM asignaturas\nWHERE id > 105;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+--------------------------+----------+--------------+\n| id  | nombre                   | creditos | departamento |\n+-----+--------------------------+----------+--------------+\n| 106 | Arquitectura de Software | 4        | Informática  |\n| 107 | Inteligencia Artificial  | 5        | Informática  |\n| 108 | Estadística Aplicada     | 4        | Matemáticas  |\n+-----+--------------------------+----------+--------------+\n3 filas devueltas",
        "byteTip": "WHERE id > 105 filtra de forma eficiente los registros más recientes.",
        "pitfallTip": "No uses inserciones masivas de más de 1000 filas de golpe en teléfonos antiguos; divídelas en lotes de 100 en 100.",
        "keyPoints": [
          "La inserción en lote ahorra desgaste de memoria flash en el teléfono.",
          "Es atómica: o se insertan todas o no se inserta ninguna.",
          "Esencial para sincronizaciones offline-first en Android."
        ]
      }
    ]
  },
  "sql-u05-l04": {
    "id": "sql-th-u05-l04",
    "lessonId": "sql-u05-l04",
    "pathId": "sql",
    "unitId": 5,
    "levelId": 4,
    "title": "4. Textos, números y comillas",
    "subtitle": "Aprende las reglas estrictas de comillas para textos y formato limpio para números.",
    "estimatedMinutes": 8,
    "analogy": "Envolver un paquete frágil en plástico de burbujas: los textos son palabras libres y necesitan comillas protectoras ('texto'). Los números son piezas sólidas de metal y viajan libres sin comillas (100).",
    "video": {
      "title": "INSERT INTO: Inserción de Registros y Valores Predeterminados",
      "channel": "Fazt Code",
      "duration": "29:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Inserción explícita, inserciones múltiples y orden correcto respetando relaciones."
    },
    "sections": [
      {
        "title": "Comillas simples para textos y números limpios",
        "explanation": "En SQL existen reglas sintácticas sagradas para escribir los valores en un `INSERT` o `WHERE`:\n\n1. **Cadenas de texto (`TEXT`):** Deben encerrarse **siempre entre comillas simples** (`'Hola'`). Si olvidas las comillas, SQLite creerá que estás escribiendo el nombre de una columna y dará error.\n2. **Números enteros y decimales (`INTEGER`, `REAL`):** Se escriben **sin comillas** (`42`, `19.99`). El separador decimal es siempre el punto (`.`), nunca la coma.\n3. **Valores booleanos:** Se escriben como `true`, `false`, `1` o `0` sin comillas.\n4. **Valores nulos:** La palabra clave `NULL` va en mayúsculas y sin comillas.",
        "codeSnippet": "-- Inserción con respeto estricto de comillas en textos y números limpios\nINSERT INTO estudiantes (nombre, carrera, semestre, promedio)\nVALUES ('Gabriel Soto', 'Ingeniería de Software', 1, 9.6);",
        "codeLanguage": "sql",
        "outputSnippet": "Query OK, 1 row affected (0.003 sec)\nInsertado con éxito en tabla 'estudiantes'.",
        "byteTip": "¿Qué pasa si el texto contiene una comilla simple adentro (como en inglés \"O'Reilly\")? Escápala duplicándola: 'O''Reilly'.",
        "pitfallTip": "Escribir precios como \"19.99\" entre comillas puede forzar comparaciones de texto en lugar de numéricas.",
        "keyPoints": [
          "Los textos en SQL van obligatoriamente entre comillas simples ('...').",
          "Los números se escriben limpios sin comillas y con punto decimal.",
          "Las comillas simples internas se escapan escribiendo dos seguidas (\\'\\')."
        ]
      },
      {
        "title": "Verificación del registro insertado con promedio",
        "explanation": "Comprobamos que el nuevo estudiante aparezca con su promedio numérico en la carrera:",
        "codeSnippet": "-- Consultamos al estudiante recién insertado para verificar su promedio numérico\nSELECT id, nombre, carrera, promedio\nFROM estudiantes\nWHERE nombre = 'Gabriel Soto';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+--------------+------------------------+----------+\n| id | nombre       | carrera                | promedio |\n+----+--------------+------------------------+----------+\n| 6  | Gabriel Soto | Ingeniería de Software | 9.6      |\n+----+--------------+------------------------+----------+\n1 fila devuelta",
        "byteTip": "En SQL estándar, los valores de texto se encierran SIEMPRE entre comillas simples ('texto'). Las comillas dobles se reservan para nombres de tablas o columnas con espacios.",
        "pitfallTip": "No uses comillas tipográficas curvadas (“ ”) que a veces pegan los procesadores de texto; SQL solo acepta la comilla recta vertical (').",
        "keyPoints": [
          "La comilla simple recta (') es el único delimitador de texto estándar en SQL.",
          "Los números reales operan matemáticamente de forma inmediata.",
          "Mantiene la consistencia del catálogo de datos."
        ]
      }
    ]
  },
  "sql-u05-l05": {
    "id": "sql-th-u05-l05",
    "lessonId": "sql-u05-l05",
    "pathId": "sql",
    "unitId": 5,
    "levelId": 5,
    "title": "5. Valores nulos y predeterminados",
    "subtitle": "Aprende a insertar datos aprovechando valores predeterminados y permitiendo nulos cuando sea legítimo.",
    "estimatedMinutes": 8,
    "analogy": "Un formulario donde dejas casillas en blanco: el sistema rellena la fecha de hoy automáticamente (DEFAULT) y deja tu segundo teléfono como \"no registrado\" (NULL).",
    "video": {
      "title": "INSERT INTO: Inserción de Registros y Valores Predeterminados",
      "channel": "Fazt Code",
      "duration": "29:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Inserción explícita, inserciones múltiples y orden correcto respetando relaciones."
    },
    "sections": [
      {
        "title": "Valores nulos y predeterminados en la inserción",
        "explanation": "Al insertar una fila, no estás obligado a especificar todas las columnas de la tabla.\n\nSi una columna:\n• Tiene un valor **`DEFAULT`**: Si la omites en la lista de columnas, SQLite le asignará automáticamente su valor predeterminado.\n• Es anulable (no tiene restricción `NOT NULL`): Si la omites, SQLite le asignará automáticamente **`NULL`**.\n• También puedes pasar la palabra clave **`NULL`** de forma explícita en `VALUES(..., NULL, ...)`.",
        "codeSnippet": "-- Omitimos la columna 'activo' para que reciba su valor DEFAULT true\nINSERT INTO usuarios (nombre, email, edad, pais)\nVALUES ('Grace Brewster', 'grace.b@navy.mil', 30, 'Estados Unidos');",
        "codeLanguage": "sql",
        "outputSnippet": "1 fila insertada con éxito (recibió activo = true por defecto).",
        "byteTip": "Omitir columnas opcionales hace que tus sentencias INSERT sean más cortas y fáciles de leer.",
        "pitfallTip": "Si una columna fue declarada NOT NULL y no tiene DEFAULT, omitirla provocará un error de NOT NULL constraint failed.",
        "keyPoints": [
          "Omitir columnas con DEFAULT activa su valor automático.",
          "Omitir columnas sin NOT NULL asigna NULL pacíficamente.",
          "Permite escribir sentencias compactas con solo los datos indispensables."
        ]
      },
      {
        "title": "Verificación de columnas con DEFAULT",
        "explanation": "Comprobamos que el usuario recién insertado haya recibido el estado activo de forma automática:",
        "codeSnippet": "-- Verificamos el valor que SQLite asignó por defecto en la columna activo\nSELECT id, nombre, email, activo\nFROM usuarios\nWHERE email = 'grace.b@navy.mil';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------+------------------+--------+\n| id | nombre         | email            | activo |\n+----+----------------+------------------+--------+\n| 7  | Grace Brewster | grace.b@navy.mil | true   |\n+----+----------------+------------------+--------+\n1 fila devuelta",
        "byteTip": "El valor true fue asignado por la regla DEFAULT sin que tuviéramos que escribirlo.",
        "pitfallTip": "Si envías VALUES (..., NULL) a una columna con DEFAULT, se guardará NULL y no el default (a menos que tenga NOT NULL).",
        "keyPoints": [
          "DEFAULT simplifica la inserción de registros en la app móvil.",
          "Garantiza estados iniciales consistentes.",
          "Reduce la cantidad de parámetros que debes enviar desde Kotlin."
        ]
      }
    ]
  },
  "sql-u05-l06": {
    "id": "sql-th-u05-l06",
    "lessonId": "sql-u05-l06",
    "pathId": "sql",
    "unitId": 5,
    "levelId": 6,
    "title": "6. Orden de inserción cuando hay relaciones",
    "subtitle": "Respeta el orden cronológico estricto de inserción: crea los registros padres antes que los hijos.",
    "estimatedMinutes": 8,
    "analogy": "Para matricular a un estudiante en una materia, primero debe existir el estudiante y debe existir la materia en la universidad. No puedes crear una matrícula para un alumno fantasma en una materia que nadie ha fundado.",
    "video": {
      "title": "INSERT INTO: Inserción de Registros y Valores Predeterminados",
      "channel": "Fazt Code",
      "duration": "29:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Inserción explícita, inserciones múltiples y orden correcto respetando relaciones."
    },
    "sections": [
      {
        "title": "Orden de inserción con relaciones (Padres antes que hijos)",
        "explanation": "Cuando las tablas están conectadas mediante Llaves Foráneas (`FOREIGN KEY`), el orden en que insertas los datos es de vital importancia:\n\n**Regla de oro de la integridad referencial:**\n1. Primero debes insertar los registros en las **tablas padres** (las que tienen las llaves primarias independientes, como `estudiantes` y `asignaturas`).\n2. Recién después puedes insertar los registros en las **tablas hijas** (las que contienen las llaves foráneas, como `matriculas`), haciendo referencia a los IDs que ya existen.\n\nSi intentas insertar en `matriculas` usando un `estudiante_id = 999` antes de haber creado ese estudiante, la base de datos bloqueará la inserción con un error de `FOREIGN KEY constraint failed`.",
        "codeSnippet": "-- Inserción válida: tanto el estudiante #1 como la asignatura #102 ya existen\nINSERT INTO matriculas (estudiante_id, asignatura_id, periodo, nota_final)\nVALUES (1, 102, '2024-2', 9.0);",
        "codeLanguage": "sql",
        "outputSnippet": "1 fila insertada en la tabla dependiente con llaves foráneas válidas.",
        "byteTip": "En scripts de migración o precarga de datos, agrupa siempre los INSERT de tablas principales al principio del archivo.",
        "pitfallTip": "Intentar insertar hijos huérfanos es el error número uno en scripts de inicialización de bases de datos.",
        "keyPoints": [
          "Las tablas padres deben poblarse antes que las tablas hijas dependientes.",
          "Las llaves foráneas validan la existencia previa del ID en la tabla principal.",
          "El orden cronológico garantiza la coherencia de todo el sistema relacional."
        ]
      },
      {
        "title": "Consulta de la nueva matrícula relacionada",
        "explanation": "Comprobamos que la nueva matrícula del estudiante 1 en la materia 102 haya quedado vinculada con éxito:",
        "codeSnippet": "-- Consultamos las matrículas del periodo 2024-2\nSELECT id, estudiante_id, asignatura_id, periodo, nota_final\nFROM matriculas\nWHERE periodo = '2024-2';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+---------------+---------------+---------+------------+\n| id | estudiante_id | asignatura_id | periodo | nota_final |\n+----+---------------+---------------+---------+------------+\n| 8  | 1             | 102           | 2024-2  | 9.0        |\n+----+---------------+---------------+---------+------------+\n1 fila devuelta",
        "byteTip": "En la Unidad 9 aprenderás a reemplazar el 1 y el 102 por los nombres reales con INNER JOIN.",
        "pitfallTip": "No uses valores provisionales como id = 0 para tablas hijas si el padre no existe.",
        "keyPoints": [
          "La integridad referencial mantiene limpias las relaciones entre tablas.",
          "Asegura que cada matrícula tenga un estudiante y una materia reales detrás.",
          "Es el pilar de la consistencia de datos en aplicaciones Android."
        ]
      }
    ]
  },
  "sql-u05-l07": {
    "id": "sql-th-u05-l07",
    "lessonId": "sql-u05-l07",
    "pathId": "sql",
    "unitId": 5,
    "levelId": 7,
    "title": "7. Errores por restricciones",
    "subtitle": "Aprende a diagnosticar y corregir los errores de inserción por violación de restricciones.",
    "estimatedMinutes": 8,
    "analogy": "Un inspector de control de calidad en una fábrica que detiene la cinta y te muestra una tarjeta roja explicando la razón exacta: \"correo duplicado\", \"precio negativo\" o \"campo obligatorio vacío\".",
    "video": {
      "title": "INSERT INTO: Inserción de Registros y Valores Predeterminados",
      "channel": "Fazt Code",
      "duration": "29:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Inserción explícita, inserciones múltiples y orden correcto respetando relaciones."
    },
    "sections": [
      {
        "title": "Diagnóstico de errores en INSERT",
        "explanation": "Cuando un `INSERT` falla, SQLite te entrega un mensaje de diagnóstico que explica cuál regla fue violada:\n\n1. **`UNIQUE constraint failed: tabla.columna`**:\nIntentaste insertar un valor que ya existe en una columna marcada con `UNIQUE` o `PRIMARY KEY` (ej: registrar un correo que ya tiene otro usuario).\n*Solución:* Verifica si el usuario ya existe o permite recuperar la contraseña.\n\n2. **`NOT NULL constraint failed: tabla.columna`**:\nOlvidaste enviar un dato en una columna que fue declarada como obligatoria.\n*Solución:* Agrega el dato a la sentencia o define un valor `DEFAULT`.\n\n3. **`CHECK constraint failed: tabla`**:\nEl valor enviado violó una regla de negocio (ej: precio menor a cero o edad absurda).\n*Solución:* Corrige el valor para que cumpla la regla del `CHECK`.\n\n4. **`FOREIGN KEY constraint failed`**:\nIntentaste apuntar a un ID que no existe en la tabla principal.\n*Solución:* Crea primero el registro padre antes de vincular el hijo.",
        "codeSnippet": "-- Consulta que valida los registros limpios que cumplen todas las restricciones\nSELECT id, nombre, email, edad, activo\nFROM usuarios\nWHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+--------------+------------------+------+--------+\n| id | nombre       | email            | edad | activo |\n+----+--------------+------------------+------+--------+\n| 1  | Ada Lovelace | ada@pioneers.org | 36   | true   |\n+----+--------------+------------------+------+--------+\n1 fila devuelta",
        "byteTip": "En Room para Android, puedes usar @Insert(onConflict = OnConflictStrategy.REPLACE) para actualizar el registro si ya existía en vez de arrojar error.",
        "pitfallTip": "No desactives las restricciones para \"hacer que funcione\"; las restricciones están ahí para proteger tu negocio contra datos corruptos.",
        "keyPoints": [
          "Los errores de restricción protegen la integridad de la base de datos.",
          "Cada mensaje de error señala con precisión la columna o regla infractora.",
          "Room en Android ofrece estrategias automáticas de resolución de conflictos."
        ]
      },
      {
        "title": "Manejo de conflictos con INSERT OR IGNORE",
        "explanation": "En SQLite existe una instrucción muy útil llamada **`INSERT OR IGNORE INTO`**:\nSi la fila viola una restricción `UNIQUE` (por ejemplo, el correo ya estaba registrado), en lugar de arrojar una excepción y detener el programa, **ignora la inserción pacíficamente** y continúa adelante:",
        "codeSnippet": "-- INSERT OR IGNORE previene caídas si el ID o correo ya existían\nINSERT OR IGNORE INTO usuarios (id, nombre, email, edad, pais, activo)\nVALUES (1, 'Ada Repetida', 'ada@pioneers.org', 36, 'Reino Unido', true);",
        "codeLanguage": "sql",
        "outputSnippet": "0 filas insertadas (el conflicto fue ignorado pacíficamente sin error).",
        "byteTip": "INSERT OR IGNORE es ideal para sincronizaciones locales donde muchos datos ya fueron descargados previamente.",
        "pitfallTip": "Usa INSERT OR IGNORE solo cuando sea normal que el dato ya exista; no lo uses si necesitas avisar al usuario del error.",
        "keyPoints": [
          "INSERT OR IGNORE tolera duplicados sin lanzar excepciones.",
          "Mantiene la aplicación fluida en sincronizaciones repetitivas.",
          "Es una de las cláusulas más apreciadas de SQLite para desarrollo móvil."
        ]
      }
    ]
  }
};
