// Módulo de teoría enriquecida para SQL: Unidades 5, 6, 7 y 8
// Redactado en español latinoamericano (es-419) con tono claro, amigable y pedagógico
// Siguiendo los estándares oficiales de Android Developers (SQLite y Room)

export const SQL_THEORY_U05_U08 = {
  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 5: INSERCIÓN DE REGISTROS (INSERT INTO)
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u05-l01': {
    subtitle: 'Aprende a guardar nuevos registros en tus tablas utilizando la sentencia INSERT INTO.',
    analogy: 'Rellenar una nueva ficha de cliente en recepción y archivarla en la gaveta correspondiente: anotas los datos en sus casillas y metes la hoja en la carpeta de clientes.',
    sections: [
      {
        title: 'La sentencia INSERT INTO con columnas explícitas',
        explanation: `Una vez que la tabla fue creada con \`CREATE TABLE\`, está vacía y lista para recibir datos. La instrucción oficial de SQL para agregar nuevas filas es **\`INSERT INTO\`**.

La forma más segura, clara y recomendada es **especificar explícitamente las columnas**:
\`INSERT INTO nombre_tabla (columna1, columna2, columna3)\`
\`VALUES (valor1, valor2, valor3);\`

Ventajas de listar las columnas:
• Si en el futuro agregas nuevas columnas a la tabla con \`ALTER TABLE\`, tus sentencias \`INSERT\` antiguas seguirán funcionando sin romperse.
• No dependes del orden físico interno en que fueron creadas las columnas.
• Puedes omitir columnas que tengan autoincremento o valores \`DEFAULT\`.`,
        codeSnippet: `-- Insertamos un nuevo producto especificando exactamente qué columnas llenamos\nINSERT INTO productos (nombre, categoria, precio, stock)\nVALUES ('Audífonos Gamer 7.1', 'Audio', 79.99, 30);`,
        outputSnippet: `1 fila insertada con éxito.`,
        byteTip: 'Si tu tabla tiene id autoincremental, omite la columna id en la lista de columnas para que SQLite la asigne solo.',
        pitfallTip: 'La cantidad de nombres en la lista de columnas debe coincidir exactamente con la cantidad de valores dentro de VALUES(...).',
        keyPoints: [
          'INSERT INTO agrega nuevos registros a una tabla existente.',
          'Listar las columnas explícitamente es la mejor práctica de compatibilidad.',
          'Omitir columnas autoincrementales permite que el motor asigne el ID automáticamente.'
        ]
      },
      {
        title: 'Verificar la inserción con SELECT',
        explanation: `La forma estándar de comprobar que un registro se insertó con éxito es consultarlo inmediatamente con un \`SELECT\` filtrado:`,
        codeSnippet: `-- Consultamos los productos de la categoría Audio para verificar la inserción\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE categoria = 'Audio';`,
        outputSnippet: `+----+------------------------------+--------+-------+\n| id | nombre                       | precio | stock |\n+----+------------------------------+--------+-------+\n| 4  | Auriculares Cancelación Ruido| 129.0  | 25    |\n| 6  | Audífonos Gamer 7.1          | 79.99  | 30    |\n+----+------------------------------+--------+-------+\n2 filas devueltas`,
        byteTip: 'En Android con Room, los métodos anotados con @Insert devuelven el ID numérico recién generado (Long).',
        pitfallTip: 'No asumas que un INSERT tuvo éxito sin revisar el código de respuesta del motor.',
        keyPoints: [
          'SELECT permite auditar el resultado de un INSERT.',
          'Los datos recién guardados están inmediatamente disponibles para consulta.',
          'Es el paso inicial en el ciclo CRUD (Create, Read, Update, Delete).'
        ]
      }
    ]
  },

  'sql-u05-l02': {
    subtitle: 'Asegura la correspondencia uno a uno entre la lista de columnas y la lista de valores.',
    analogy: 'Poner los botones de una camisa en sus ojales: el primer botón debe entrar en el primer ojal, el segundo en el segundo. Si te saltas uno, la camisa queda chueca.',
    sections: [
      {
        title: 'Correspondencia posicional entre columnas y valores',
        explanation: `En la sentencia \`INSERT INTO\`, el orden de los elementos dentro de \`VALUES(...)\` debe coincidir **estrictamente de izquierda a derecha** con la lista de columnas que escribiste:

Si escribes:
\`INSERT INTO usuarios (nombre, edad, email)\`
\`VALUES ('Lucas', 28, 'lucas@correo.com');\`

• \`'Lucas'\` (primer valor) se asigna a \`nombre\` (primera columna).
• \`28\` (segundo valor) se asigna a \`edad\` (segunda columna).
• \`'lucas@correo.com'\` (tercer valor) se asigna a \`email\` (tercera columna).

Si inviertes el orden por error y pones \`VALUES (28, 'Lucas', ...)\`, SQLite intentará guardar \`28\` como nombre y \`'Lucas'\` como edad, provocando inconsistencias o errores de tipo.`,
        codeSnippet: `-- Inserción con correspondencia exacta de tipos y posiciones\nINSERT INTO usuarios (nombre, email, edad, pais, activo)\nVALUES ('Ada Lovelace Jr', 'ada.jr@pioneers.org', 24, 'Reino Unido', true);`,
        outputSnippet: `1 fila insertada con éxito.`,
        byteTip: 'Puedes cambiar el orden de las columnas en el INSERT siempre y cuando cambies el orden de los valores de la misma forma.',
        pitfallTip: 'Un desajuste en el orden de columnas numéricas y de texto es uno de los bugs silenciosos más molestos de detectar.',
        keyPoints: [
          'La asignación de valores a columnas se rige por su posición exacta.',
          'El tipo de cada valor debe ser compatible con la afinidad de la columna de destino.',
          'Revisar la correspondencia previene almacenar datos en casillas equivocadas.'
        ]
      },
      {
        title: 'Verificación de tipos en inserciones',
        explanation: `Verificamos que el registro nuevo conserve los tipos de datos coherentes con el resto de la tabla:`,
        codeSnippet: `-- Consultamos el usuario recién ingresado\nSELECT id, nombre, email, edad, pais\nFROM usuarios\nWHERE email = 'ada.jr@pioneers.org';`,
        outputSnippet: `+----+-----------------+---------------------+------+-------------+\n| id | nombre          | email               | edad | pais        |\n+----+-----------------+---------------------+------+-------------+\n| 6  | Ada Lovelace Jr | ada.jr@pioneers.org | 24   | Reino Unido |\n+----+-----------------+---------------------+------+-------------+\n1 fila devuelta`,
        byteTip: 'Consultar por email único es rápido y preciso.',
        pitfallTip: 'No envíes números entre comillas si la columna es INTEGER; aunque SQLite sea flexible, puede provocar comparaciones de texto inesperadas.',
        keyPoints: [
          'Cada valor debe insertarse con su representación nativa (números sin comillas, textos con comillas).',
          'La base de datos valida las restricciones de cada casilla.',
          'Mantiene la consistencia con las entidades de Kotlin.'
        ]
      }
    ]
  },

  'sql-u05-l03': {
    subtitle: 'Acelera la carga masiva de datos insertando múltiples filas en una sola sentencia SQL.',
    analogy: 'Subir al autobús con un boleto familiar para 4 personas de un solo golpe, en lugar de que cada uno haga fila, pague y suba por separado 4 veces seguidas.',
    sections: [
      {
        title: 'Inserción de múltiples filas (Bulk Insert)',
        explanation: `Si necesitas insertar 10, 50 o 1,000 registros, ejecutar sentencias \`INSERT INTO\` individuales una por una es lentísimo porque el motor abre y cierra una transacción de disco para cada una.

SQL estándar y SQLite permiten insertar **múltiples filas en una sola instrucción**, separando cada grupo de valores con una coma (\`,\`):

\`INSERT INTO productos (nombre, precio, stock) VALUES\`
\`    ('Producto A', 10.0, 50),\`
\`    ('Producto B', 20.0, 30),\`
\`    ('Producto C', 15.5, 100);\`

Esta técnica es entre 10 y 100 veces más rápida que hacer inserciones individuales sueltas.`,
        codeSnippet: `-- Inserción múltiple de tres asignaturas en una sola sentencia atómica\nINSERT INTO asignaturas (id, nombre, creditos, departamento) VALUES\n    (106, 'Arquitectura de Software', 4, 'Informática'),\n    (107, 'Inteligencia Artificial', 5, 'Informática'),\n    (108, 'Estadística Aplicada', 4, 'Matemáticas');`,
        outputSnippet: `3 filas insertadas en una sola operación.`,
        byteTip: 'En SQLite puedes insertar hasta 500 filas de un solo tirón con esta técnica sin ningún problema.',
        pitfallTip: 'Si una sola de las filas tiene un error (por ejemplo, un ID duplicado), toda la sentencia se cancela y ninguna de las filas se guardará.',
        keyPoints: [
          'Insertar múltiples filas en un solo INSERT multiplica la velocidad de escritura.',
          'Se separan las tuplas de VALUES con comas.',
          'Es la técnica estándar para precargar datos iniciales (seeds) en apps móviles.'
        ]
      },
      {
        title: 'Comprobar la carga masiva',
        explanation: `Verificamos que las tres asignaturas aparezcan disponibles en el catálogo académico:`,
        codeSnippet: `-- Consultamos las asignaturas con ID superior a 105 para ver el lote cargado\nSELECT id, nombre, creditos, departamento\nFROM asignaturas\nWHERE id > 105;`,
        outputSnippet: `+-----+--------------------------+----------+--------------+\n| id  | nombre                   | creditos | departamento |\n+-----+--------------------------+----------+--------------+\n| 106 | Arquitectura de Software | 4        | Informática  |\n| 107 | Inteligencia Artificial  | 5        | Informática  |\n| 108 | Estadística Aplicada     | 4        | Matemáticas  |\n+-----+--------------------------+----------+--------------+\n3 filas devueltas`,
        byteTip: 'WHERE id > 105 filtra de forma eficiente los registros más recientes.',
        pitfallTip: 'No uses inserciones masivas de más de 1000 filas de golpe en teléfonos antiguos; divídelas en lotes de 100 en 100.',
        keyPoints: [
          'La inserción en lote ahorra desgaste de memoria flash en el teléfono.',
          'Es atómica: o se insertan todas o no se inserta ninguna.',
          'Esencial para sincronizaciones offline-first en Android.'
        ]
      }
    ]
  },

  'sql-u05-l04': {
    subtitle: 'Aprende las reglas estrictas de comillas para textos y formato limpio para números.',
    analogy: "Envolver un paquete frágil en plástico de burbujas: los textos son palabras libres y necesitan comillas protectoras ('texto'). Los números son piezas sólidas de metal y viajan libres sin comillas (100).",
    sections: [
      {
        title: 'Comillas simples para textos y números limpios',
        explanation: `En SQL existen reglas sintácticas sagradas para escribir los valores en un \`INSERT\` o \`WHERE\`:

1. **Cadenas de texto (\`TEXT\`):** Deben encerrarse **siempre entre comillas simples** (\`'Hola'\`). Si olvidas las comillas, SQLite creerá que estás escribiendo el nombre de una columna y dará error.
2. **Números enteros y decimales (\`INTEGER\`, \`REAL\`):** Se escriben **sin comillas** (\`42\`, \`19.99\`). El separador decimal es siempre el punto (\`.\`), nunca la coma.
3. **Valores booleanos:** Se escriben como \`true\`, \`false\`, \`1\` o \`0\` sin comillas.
4. **Valores nulos:** La palabra clave \`NULL\` va en mayúsculas y sin comillas.`,
        codeSnippet: `-- Inserción con respeto estricto de comillas en textos y números limpios\nINSERT INTO estudiantes (nombre, carrera, semestre, promedio)\nVALUES ('Gabriel Soto', 'Ingeniería de Software', 1, 9.6);`,
        byteTip: "¿Qué pasa si el texto contiene una comilla simple adentro (como en inglés \"O'Reilly\")? Escápala duplicándola: 'O''Reilly'.",
        pitfallTip: 'Escribir precios como "19.99" entre comillas puede forzar comparaciones de texto en lugar de numéricas.',
        keyPoints: [
          "Los textos en SQL van obligatoriamente entre comillas simples ('...').",
          'Los números se escriben limpios sin comillas y con punto decimal.',
          "Las comillas simples internas se escapan escribiendo dos seguidas (\\'\\')."
        ]
      },
      {
        title: 'Verificación del registro insertado con promedio',
        explanation: `Comprobamos que el nuevo estudiante aparezca con su promedio numérico en la carrera:`,
        codeSnippet: `-- Consultamos al estudiante recién insertado para verificar su promedio numérico\nSELECT id, nombre, carrera, promedio\nFROM estudiantes\nWHERE nombre = 'Gabriel Soto';`,
        outputSnippet: `+----+--------------+------------------------+----------+\n| id | nombre       | carrera                | promedio |\n+----+--------------+------------------------+----------+\n| 6  | Gabriel Soto | Ingeniería de Software | 9.6      |\n+----+--------------+------------------------+----------+\n1 fila devuelta`,
        pitfallTip: "No uses comillas tipográficas curvadas (“ ”) que a veces pegan los procesadores de texto; SQL solo acepta la comilla recta vertical (').",
        keyPoints: [
          "La comilla simple recta (') es el único delimitador de texto estándar en SQL.",
          'Los números reales operan matemáticamente de forma inmediata.',
          'Mantiene la consistencia del catálogo de datos.'
        ]
      }
    ]
  },

  'sql-u05-l05': {
    subtitle: 'Aprende a insertar datos aprovechando valores predeterminados y permitiendo nulos cuando sea legítimo.',
    analogy: 'Un formulario donde dejas casillas en blanco: el sistema rellena la fecha de hoy automáticamente (DEFAULT) y deja tu segundo teléfono como "no registrado" (NULL).',
    sections: [
      {
        title: 'Valores nulos y predeterminados en la inserción',
        explanation: `Al insertar una fila, no estás obligado a especificar todas las columnas de la tabla.

Si una columna:
• Tiene un valor **\`DEFAULT\`**: Si la omites en la lista de columnas, SQLite le asignará automáticamente su valor predeterminado.
• Es anulable (no tiene restricción \`NOT NULL\`): Si la omites, SQLite le asignará automáticamente **\`NULL\`**.
• También puedes pasar la palabra clave **\`NULL\`** de forma explícita en \`VALUES(..., NULL, ...)\`.`,
        codeSnippet: `-- Omitimos la columna 'activo' para que reciba su valor DEFAULT true\nINSERT INTO usuarios (nombre, email, edad, pais)\nVALUES ('Grace Brewster', 'grace.b@navy.mil', 30, 'Estados Unidos');`,
        outputSnippet: `1 fila insertada con éxito (recibió activo = true por defecto).`,
        byteTip: 'Omitir columnas opcionales hace que tus sentencias INSERT sean más cortas y fáciles de leer.',
        pitfallTip: 'Si una columna fue declarada NOT NULL y no tiene DEFAULT, omitirla provocará un error de NOT NULL constraint failed.',
        keyPoints: [
          'Omitir columnas con DEFAULT activa su valor automático.',
          'Omitir columnas sin NOT NULL asigna NULL pacíficamente.',
          'Permite escribir sentencias compactas con solo los datos indispensables.'
        ]
      },
      {
        title: 'Verificación de columnas con DEFAULT',
        explanation: `Comprobamos que el usuario recién insertado haya recibido el estado activo de forma automática:`,
        codeSnippet: `-- Verificamos el valor que SQLite asignó por defecto en la columna activo\nSELECT id, nombre, email, activo\nFROM usuarios\nWHERE email = 'grace.b@navy.mil';`,
        outputSnippet: `+----+----------------+------------------+--------+\n| id | nombre         | email            | activo |\n+----+----------------+------------------+--------+\n| 7  | Grace Brewster | grace.b@navy.mil | true   |\n+----+----------------+------------------+--------+\n1 fila devuelta`,
        byteTip: 'El valor true fue asignado por la regla DEFAULT sin que tuviéramos que escribirlo.',
        pitfallTip: 'Si envías VALUES (..., NULL) a una columna con DEFAULT, se guardará NULL y no el default (a menos que tenga NOT NULL).',
        keyPoints: [
          'DEFAULT simplifica la inserción de registros en la app móvil.',
          'Garantiza estados iniciales consistentes.',
          'Reduce la cantidad de parámetros que debes enviar desde Kotlin.'
        ]
      }
    ]
  },

  'sql-u05-l06': {
    subtitle: 'Respeta el orden cronológico estricto de inserción: crea los registros padres antes que los hijos.',
    analogy: 'Para matricular a un estudiante en una materia, primero debe existir el estudiante y debe existir la materia en la universidad. No puedes crear una matrícula para un alumno fantasma en una materia que nadie ha fundado.',
    sections: [
      {
        title: 'Orden de inserción con relaciones (Padres antes que hijos)',
        explanation: `Cuando las tablas están conectadas mediante Llaves Foráneas (\`FOREIGN KEY\`), el orden en que insertas los datos es de vital importancia:

**Regla de oro de la integridad referencial:**
1. Primero debes insertar los registros en las **tablas padres** (las que tienen las llaves primarias independientes, como \`estudiantes\` y \`asignaturas\`).
2. Recién después puedes insertar los registros en las **tablas hijas** (las que contienen las llaves foráneas, como \`matriculas\`), haciendo referencia a los IDs que ya existen.

Si intentas insertar en \`matriculas\` usando un \`estudiante_id = 999\` antes de haber creado ese estudiante, la base de datos bloqueará la inserción con un error de \`FOREIGN KEY constraint failed\`.`,
        codeSnippet: `-- Inserción válida: tanto el estudiante #1 como la asignatura #102 ya existen\nINSERT INTO matriculas (estudiante_id, asignatura_id, periodo, nota_final)\nVALUES (1, 102, '2024-2', 9.0);`,
        outputSnippet: `1 fila insertada en la tabla dependiente con llaves foráneas válidas.`,
        byteTip: 'En scripts de migración o precarga de datos, agrupa siempre los INSERT de tablas principales al principio del archivo.',
        pitfallTip: 'Intentar insertar hijos huérfanos es el error número uno en scripts de inicialización de bases de datos.',
        keyPoints: [
          'Las tablas padres deben poblarse antes que las tablas hijas dependientes.',
          'Las llaves foráneas validan la existencia previa del ID en la tabla principal.',
          'El orden cronológico garantiza la coherencia de todo el sistema relacional.'
        ]
      },
      {
        title: 'Consulta de la nueva matrícula relacionada',
        explanation: `Comprobamos que la nueva matrícula del estudiante 1 en la materia 102 haya quedado vinculada con éxito:`,
        codeSnippet: `-- Consultamos las matrículas del periodo 2024-2\nSELECT id, estudiante_id, asignatura_id, periodo, nota_final\nFROM matriculas\nWHERE periodo = '2024-2';`,
        outputSnippet: `+----+---------------+---------------+---------+------------+\n| id | estudiante_id | asignatura_id | periodo | nota_final |\n+----+---------------+---------------+---------+------------+\n| 8  | 1             | 102           | 2024-2  | 9.0        |\n+----+---------------+---------------+---------+------------+\n1 fila devuelta`,
        byteTip: 'En la Unidad 9 aprenderás a reemplazar el 1 y el 102 por los nombres reales con INNER JOIN.',
        pitfallTip: 'No uses valores provisionales como id = 0 para tablas hijas si el padre no existe.',
        keyPoints: [
          'La integridad referencial mantiene limpias las relaciones entre tablas.',
          'Asegura que cada matrícula tenga un estudiante y una materia reales detrás.',
          'Es el pilar de la consistencia de datos en aplicaciones Android.'
        ]
      }
    ]
  },

  'sql-u05-l07': {
    subtitle: 'Aprende a diagnosticar y corregir los errores de inserción por violación de restricciones.',
    analogy: 'Un inspector de control de calidad en una fábrica que detiene la cinta y te muestra una tarjeta roja explicando la razón exacta: "correo duplicado", "precio negativo" o "campo obligatorio vacío".',
    sections: [
      {
        title: 'Diagnóstico de errores en INSERT',
        explanation: `Cuando un \`INSERT\` falla, SQLite te entrega un mensaje de diagnóstico que explica cuál regla fue violada:

1. **\`UNIQUE constraint failed: tabla.columna\`**:
Intentaste insertar un valor que ya existe en una columna marcada con \`UNIQUE\` o \`PRIMARY KEY\` (ej: registrar un correo que ya tiene otro usuario).
*Solución:* Verifica si el usuario ya existe o permite recuperar la contraseña.

2. **\`NOT NULL constraint failed: tabla.columna\`**:
Olvidaste enviar un dato en una columna que fue declarada como obligatoria.
*Solución:* Agrega el dato a la sentencia o define un valor \`DEFAULT\`.

3. **\`CHECK constraint failed: tabla\`**:
El valor enviado violó una regla de negocio (ej: precio menor a cero o edad absurda).
*Solución:* Corrige el valor para que cumpla la regla del \`CHECK\`.

4. **\`FOREIGN KEY constraint failed\`**:
Intentaste apuntar a un ID que no existe en la tabla principal.
*Solución:* Crea primero el registro padre antes de vincular el hijo.`,
        codeSnippet: `-- Consulta que valida los registros limpios que cumplen todas las restricciones\nSELECT id, nombre, email, edad, activo\nFROM usuarios\nWHERE id = 1;`,
        outputSnippet: `+----+--------------+------------------+------+--------+\n| id | nombre       | email            | edad | activo |\n+----+--------------+------------------+------+--------+\n| 1  | Ada Lovelace | ada@pioneers.org | 36   | true   |\n+----+--------------+------------------+------+--------+\n1 fila devuelta`,
        byteTip: 'En Room para Android, puedes usar @Insert(onConflict = OnConflictStrategy.REPLACE) para actualizar el registro si ya existía en vez de arrojar error.',
        pitfallTip: 'No desactives las restricciones para "hacer que funcione"; las restricciones están ahí para proteger tu negocio contra datos corruptos.',
        keyPoints: [
          'Los errores de restricción protegen la integridad de la base de datos.',
          'Cada mensaje de error señala con precisión la columna o regla infractora.',
          'Room en Android ofrece estrategias automáticas de resolución de conflictos.'
        ]
      },
      {
        title: 'Manejo de conflictos con INSERT OR IGNORE',
        explanation: `En SQLite existe una instrucción muy útil llamada **\`INSERT OR IGNORE INTO\`**:
Si la fila viola una restricción \`UNIQUE\` (por ejemplo, el correo ya estaba registrado), en lugar de arrojar una excepción y detener el programa, **ignora la inserción pacíficamente** y continúa adelante:`,
        codeSnippet: `-- INSERT OR IGNORE previene caídas si el ID o correo ya existían\nINSERT OR IGNORE INTO usuarios (id, nombre, email, edad, pais, activo)\nVALUES (1, 'Ada Repetida', 'ada@pioneers.org', 36, 'Reino Unido', true);`,
        outputSnippet: `0 filas insertadas (el conflicto fue ignorado pacíficamente sin error).`,
        byteTip: 'INSERT OR IGNORE es ideal para sincronizaciones locales donde muchos datos ya fueron descargados previamente.',
        pitfallTip: 'Usa INSERT OR IGNORE solo cuando sea normal que el dato ya exista; no lo uses si necesitas avisar al usuario del error.',
        keyPoints: [
          'INSERT OR IGNORE tolera duplicados sin lanzar excepciones.',
          'Mantiene la aplicación fluida en sincronizaciones repetitivas.',
          'Es una de las cláusulas más apreciadas de SQLite para desarrollo móvil.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 6: CONSULTAS BÁSICAS (SELECT)
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u06-l01': {
    subtitle: 'Aprende a consultar y extraer información de tus tablas con la sentencia rey: SELECT ... FROM.',
    analogy: 'Hacer una solicitud en una ventanilla de biblioteca: dices "Quiero ver los libros (SELECT) que están en la estantería de ciencias (FROM)". La bibliotecaria te trae exactamente esa colección para que la leas.',
    sections: [
      {
        title: 'La sentencia SELECT ... FROM',
        explanation: `El 80% del tiempo que trabajes con bases de datos lo pasarás consultando información para mostrársela a tus usuarios en pantalla.

La instrucción fundamental para consultar datos en SQL es **\`SELECT\`**:
\`SELECT qué_columnas_quiero_ver\`
\`FROM de_qué_tabla_quiero_sacarlas;\`

• **\`SELECT\`**: Define la **proyección** (qué atributos deseas que aparezcan en el reporte).
• **\`FROM\`**: Define el **origen** (de qué tabla se extraerán los datos).

Las consultas \`SELECT\` **son de solo lectura**: puedes ejecutarlas un millón de veces sin alterar ni un solo dato de la base de datos.`,
        codeSnippet: `-- Consulta básica de todas las filas y columnas de la tabla productos\nSELECT id, nombre, categoria, precio, stock\nFROM productos;`,
        outputSnippet: `+----+------------------------------+-----------+--------+-------+\n| id | nombre                       | categoria | precio | stock |\n+----+------------------------------+-----------+--------+-------+\n| 1  | Teclado Mecánico RGB         | Hardware  | 89.99  | 45    |\n| 2  | Monitor Ultrawide 34"        | Pantallas | 429.5  | 12    |\n| 3  | Mouse Ergonómico Pro         | Hardware  | 49.9   | 80    |\n| 4  | Auriculares Cancelación Ruido| Audio     | 129.0  | 25    |\n| 5  | Cable HDMI 2.1 Braided       | Accesorios| 14.99  | 150   |\n+----+------------------------------+-----------+--------+-------+\n5 filas devueltas`,
        byteTip: 'En SQL es buena práctica cerrar cada sentencia completa con un punto y coma (;).',
        pitfallTip: 'Escribir el orden al revés (FROM productos SELECT id) provocará un error de sintaxis inmediato.',
        keyPoints: [
          'SELECT indica las columnas deseadas; FROM indica la tabla de origen.',
          'Es una operación pura de lectura que no modifica los datos almacenados.',
          'Es la sentencia más utilizada y optimizada del mundo de las bases de datos.'
        ]
      },
      {
        title: 'Consultas simples para alimentar interfaces en Android',
        explanation: `En una aplicación de Android con Room y Jetpack Compose, una función como \`@Query("SELECT id, nombre FROM estudiantes")\` alimenta directamente una lista de tarjetas en pantalla:`,
        codeSnippet: `-- Consulta de nombres y carreras para poblar un listado en la app móvil\nSELECT id, nombre, carrera\nFROM estudiantes;`,
        outputSnippet: `+----+-----------------+--------------------------+\n| id | nombre          | carrera                  |\n+----+-----------------+--------------------------+\n| 1  | Valeria Morales | Ingeniería de Software   |\n| 2  | Diego Fernández | Ciencias Computacionales |\n| 3  | Camila Gómez    | Sistemas de Información  |\n| 4  | Javier Ramos    | Ciberseguridad           |\n| 5  | Lucía Navarro   | Ingeniería de Software   |\n+----+-----------------+--------------------------+\n5 filas devueltas`,
        byteTip: 'Al pedir solo id, nombre y carrera, SQLite transfiere menos datos a la memoria de la app.',
        pitfallTip: 'No uses SELECT para modificar datos; para modificar se usa UPDATE.',
        keyPoints: [
          'Las consultas SELECT alimentan directamente los modelos de vista (ViewModels).',
          'La selección precisa de columnas agiliza la renderización de la pantalla.',
          'Es la base de la lectura de datos en arquitecturas modernas.'
        ]
      }
    ]
  },

  'sql-u06-l02': {
    subtitle: 'Comprende el comodín de asterisco (*) para pedir todas las columnas y cuándo conviene evitarlo.',
    analogy: 'Pedir "todo el menú" en un restaurante: es fantástico cuando estás probando y quieres conocer todas las opciones de una mesa, pero si tienes prisa y solo quieres un café, pedir todo el menú es un desperdicio enorme de recursos.',
    sections: [
      {
        title: 'El asterisco (*) en SELECT: traer todo',
        explanation: `En SQL, el asterisco (**\`*\`**) actúa como un comodín universal que significa **"todas las columnas de la tabla"**:

\`SELECT * FROM usuarios;\`

Es extraordinariamente útil cuando:
• Estás aprendiendo o explorando una base de datos nueva para ver qué columnas contiene.
• Estás en la consola de depuración revisando el estado completo de un registro.

Sin embargo, en **código de producción para aplicaciones Android o servidores**, usar \`SELECT *\` se considera una **mala práctica** si la tabla tiene muchas columnas pesadas o textos largos que no vas a mostrar en pantalla.`,
        codeSnippet: `-- Usamos el comodín * para inspeccionar rápidamente la tabla completa de empleados\nSELECT *\nFROM empleados;`,
        outputSnippet: `+-----+----------------+--------------+---------+---------------+--------+\n| id  | nombre         | departamento | salario | fecha_ingreso | activo |\n+-----+----------------+--------------+---------+---------------+--------+\n| 101 | Carlos Mendoza | Ingeniería   | 3200.0  | 2022-03-15    | true   |\n| 102 | Elena Rostova  | Diseño UX    | 2850.5  | 2021-08-01    | true   |\n| 103 | Mateo Díaz     | Sistemas     | 3100.0  | 2023-01-10    | true   |\n| 104 | Sofía Valerio  | Dirección    | 4500.0  | 2019-11-20    | true   |\n| 105 | Andrés Solano  | Soporte      | 1900.0  | 2024-02-01    | false  |\n+-----+----------------+--------------+---------+---------------+--------+\n5 filas devueltas`,
        byteTip: 'Usa SELECT * para explorar en la consola; usa columnas explícitas en el código final de tu aplicación.',
        pitfallTip: 'Si alguien agrega una columna pesada (como fotos en BLOB) a la tabla en el futuro, tus consultas SELECT * se volverán lentísimas sin que te des cuenta.',
        keyPoints: [
          'SELECT * proyecta todas las columnas disponibles de la tabla.',
          'Es ideal para fases de exploración, pruebas y depuración rápida.',
          'En producción se recomienda listar las columnas deseadas explícitamente.'
        ]
      },
      {
        title: 'Rendimiento y consumo de batería en móviles',
        explanation: `En teléfonos móviles, cada byte que se lee del disco y se convierte en objetos consume ciclos de procesador y batería. Proyectar solo las columnas visibles en pantalla (ejemplo: solo \`nombre\` y \`salario\`) mantiene la app rápida y fluida:`,
        codeSnippet: `-- Proyección limpia de solo dos columnas para una vista de resumen\nSELECT nombre, salario\nFROM empleados\nLIMIT 3;`,
        outputSnippet: `+----------------+---------+\n| nombre         | salario |\n+----------------+---------+\n| Carlos Mendoza | 3200.0  |\n| Elena Rostova  | 2850.5  |\n| Mateo Díaz     | 3100.0  |\n+----------------+---------+\n3 filas devueltas`,
        byteTip: 'Room en Android premia pedir solo las columnas que tu data class de Kotlin necesita.',
        pitfallTip: 'Evita transferir contraseñas o datos confidenciales al usar SELECT * por descuido.',
        keyPoints: [
          'Pedir columnas específicas optimiza el consumo de batería y memoria RAM.',
          'Previene filtraciones accidentales de campos sensibles en la interfaz.',
          'Mejora la velocidad de respuesta en listas grandes de miles de registros.'
        ]
      }
    ]
  },

  'sql-u06-l03': {
    subtitle: 'Aprende a proyectar columnas específicas y elegir el orden en que se muestran los resultados.',
    analogy: 'Un escaparate de joyería: de todos los objetos guardados en la bodega blindada, el joyero solo coloca en la vitrina los tres anillos más hermosos ordenados para que los clientes los admiren.',
    sections: [
      {
        title: 'Proyección de columnas específicas',
        explanation: `Para seleccionar columnas específicas, simplemente escribes sus nombres separados por comas después de la palabra clave \`SELECT\`:
\`SELECT columna1, columna2, columna3 FROM tabla;\`

Ventajas:
1. **Control total del orden:** Las columnas aparecerán en el resultado exactamente en el orden en que las escribiste en el \`SELECT\`, sin importar en qué orden físico están guardadas en la tabla.
2. **Claridad documental:** Cualquier persona que lea tu consulta sabrá de inmediato qué datos espera recibir tu interfaz.
3. **Eficiencia:** El motor de SQLite solo lee del disco los bloques de datos correspondientes a esas columnas.`,
        codeSnippet: `-- Seleccionamos solo 3 columnas en un orden personalizado\nSELECT nombre, stock, precio\nFROM productos\nORDER BY stock DESC;`,
        outputSnippet: `+------------------------------+-------+--------+\n| nombre                       | stock | precio |\n+------------------------------+-------+--------+\n| Cable HDMI 2.1 Braided       | 150   | 14.99  |\n| Mouse Ergonómico Pro         | 80    | 49.9   |\n| Teclado Mecánico RGB         | 45    | 89.99  |\n| Auriculares Cancelación Ruido| 25    | 129.0  |\n| Monitor Ultrawide 34"        | 12    | 429.5  |\n+------------------------------+-------+--------+\n5 filas devueltas`,
        byteTip: 'Observa cómo pusimos stock antes que precio en el SELECT, y así mismo se proyecta en la tabla resultante.',
        pitfallTip: 'No pongas coma después de la última columna antes del FROM (escribir SELECT col1, col2, FROM dará error de sintaxis).',
        keyPoints: [
          'Listar columnas separadas por comas define la proyección exacta.',
          'El orden de los resultados sigue el orden especificado en el SELECT.',
          'Reduce el tráfico de datos y maximiza la velocidad de respuesta.'
        ]
      },
      {
        title: 'Consultas sobre usuarios para pantallas de perfil',
        explanation: `Mira cómo extraer la información de contacto pública de los usuarios sin arrastrar campos privados:`,
        codeSnippet: `-- Proyección de datos públicos para una pantalla de contactos\nSELECT id, nombre, email, pais\nFROM usuarios\nWHERE activo = true;`,
        outputSnippet: `+----+-------------------+--------------------+---------------+\n| id | nombre            | email              | pais          |\n+----+-------------------+--------------------+---------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   | Reino Unido   |\n| 2  | Alan Turing       | alan@bletchley.org | Reino Unido   |\n| 4  | Linus Torvalds    | linus@linux.org    | Finlandia     |\n| 5  | Margaret Hamilton | margaret@nasa.gov  | Estados Unidos|\n+----+-------------------+--------------------+---------------+\n4 filas devueltas`,
        byteTip: 'WHERE activo = true filtra automáticamente a los usuarios inactivos o dados de baja.',
        pitfallTip: 'Verifica que los nombres de columnas estén bien escritos; si escribes nombres inexistentes, SQLite devolverá un error de no such column.',
        keyPoints: [
          'La proyección selectiva protege la privacidad de los usuarios.',
          'Permite adaptar la consulta a diferentes pantallas de la misma app.',
          'Es el patrón básico de desarrollo en frontend y móvil.'
        ]
      }
    ]
  },

  'sql-u06-l04': {
    subtitle: 'Renombra encabezados de columna en tus consultas usando alias con la palabra clave AS.',
    analogy: 'Ponerle un apodo amigable a un contacto: en su pasaporte se llama "Alejandro Francisco", pero en tu teléfono le pones "Alex" para reconocerlo al instante.',
    sections: [
      {
        title: 'Alias de columnas con AS',
        explanation: `A veces los nombres técnicos de las columnas en la base de datos son feos, crípticos o poco amigables para el usuario final (como \`prec_unit_usd\` o \`cant_disp\`). Además, cuando realizamos cálculos o fórmulas matemáticas, la columna resultante no tiene un nombre propio.

Para darles un nombre limpio, legible y elegante en el resultado, usamos **alias con la palabra clave \`AS\`**:
\`SELECT nombre_columna AS apodo_legible FROM tabla;\`

El alias solo cambia el encabezado en el resultado de la consulta; **no modifica el nombre real de la columna en la tabla**.`,
        codeSnippet: `-- Usamos alias (AS) para dar formato profesional a los encabezados del reporte\nSELECT \n    nombre AS producto_oficial,\n    precio AS costo_unitario_dolares,\n    stock AS unidades_disponibles\nFROM productos\nLIMIT 3;`,
        outputSnippet: `+----------------------+-----------------------+----------------------+\n| producto_oficial     | costo_unitario_dolares| unidades_disponibles |\n+----------------------+-----------------------+----------------------+\n| Teclado Mecánico RGB | 89.99                 | 45                   |\n| Monitor Ultrawide 34"| 429.5                 | 12                   |\n| Mouse Ergonómico Pro | 49.9                  | 80                   |\n+----------------------+-----------------------+----------------------+\n3 filas devueltas`,
        byteTip: 'Si tu alias tiene espacios (lo cual no se recomienda en código pero sí en reportes impresos), enciérralo entre comillas dobles: AS "Costo Unitario".',
        pitfallTip: 'No puedes usar el alias creado en el SELECT dentro de la misma cláusula WHERE de esa consulta, porque WHERE se evalúa antes que el SELECT.',
        keyPoints: [
          'AS renombra temporalmente una columna en el resultado de la consulta.',
          'Es indispensable para nombrar columnas calculadas y operaciones matemáticas.',
          'No altera la estructura real de la tabla en el disco.'
        ]
      },
      {
        title: 'Mapeo de nombres hacia Kotlin y Room',
        explanation: `En Android, si tu clase \`data class\` en Kotlin tiene una propiedad con nombre diferente a la columna de SQLite, puedes usar \`AS\` en la consulta para que coincidan perfectamente:`,
        codeSnippet: `-- Mapeamos nombres de SQLite a variables descriptivas en Kotlin\nSELECT id AS codigoIdentificador, nombre AS nombreCompleto\nFROM usuarios\nLIMIT 2;`,
        outputSnippet: `+---------------------+----------------+\n| codigoIdentificador | nombreCompleto |\n+---------------------+----------------+\n| 1                   | Ada Lovelace   |\n| 2                   | Alan Turing    |\n+---------------------+----------------+\n2 filas devueltas`,
        byteTip: 'En SQL estándar, la palabra AS es opcional (SELECT nombre apodo), pero escribir AS explícito hace el código mucho más fácil de leer.',
        pitfallTip: 'Evita crear alias con nombres idénticos para columnas diferentes en la misma consulta.',
        keyPoints: [
          'AS alinea consultas SQL con las propiedades de clases en Kotlin.',
          'Mejora la estética de los reportes tabulares generados.',
          'Es una técnica común en vistas e informes ejecutivos.'
        ]
      }
    ]
  },

  'sql-u06-l05': {
    subtitle: 'Aprende a realizar operaciones matemáticas y crear columnas calculadas en vivo dentro de tu SELECT.',
    analogy: 'La calculadora de una caja registradora: el precio del artículo es $100 y compras 3 unidades. La pantalla de la caja calcula y te muestra directamente "$300" en el ticket sin alterar el precio de $100 de la etiqueta.',
    sections: [
      {
        title: 'Columnas calculadas y expresiones en SELECT',
        explanation: `El \`SELECT\` no se limita a mostrar datos tal como están guardados en la tabla: ¡es un motor de cálculo en tiempo real!

Puedes realizar sumas, restas, multiplicaciones, divisiones o combinar textos directamente en la consulta:
• Multiplicar precio por unidades: \`precio * cantidad AS subtotal\`
• Sumar impuestos: \`precio * 1.16 AS precio_con_iva\`
• Calcular descuentos: \`precio * 0.90 AS precio_promocional\`

Estas columnas calculadas se generan al vuelo en la memoria y desaparecen al terminar la consulta, sin ocupar espacio innecesario en el disco.`,
        codeSnippet: `-- Calculamos el valor monetario del inventario y aplicamos un descuento simulado\nSELECT \n    nombre,\n    precio,\n    (precio * 0.85) AS precio_con_15_descuento,\n    (precio * stock) AS capital_invertido\nFROM productos\nLIMIT 3;`,
        outputSnippet: `+----------------------+-------------------------+-------------------+\n| nombre               | precio_con_15_descuento | capital_invertido |\n+----------------------+-------------------------+-------------------+\n| Teclado Mecánico RGB | 76.4915                 | 4049.55           |\n| Monitor Ultrawide 34"| 365.075                 | 5154.0            |\n| Mouse Ergonómico Pro | 42.415                  | 3992.0            |\n+----------------------+-------------------------+-------------------+\n3 filas devueltas`,
        byteTip: 'Usa la función ROUND(expresion, decimales) para redondear resultados decimales a 2 dígitos en reportes de dinero.',
        pitfallTip: 'Recuerda darles siempre un alias con AS; de lo contrario, el encabezado de la columna será la fórmula cruda como (precio * 0.85).',
        keyPoints: [
          'SELECT evalúa expresiones matemáticas y lógicas en tiempo real.',
          'Genera columnas virtuales calculadas sin ocupar espacio en disco.',
          'Garantiza que los cálculos siempre se hagan sobre los datos más recientes.'
        ]
      },
      {
        title: 'Cálculo de incrementos salariales y proyecciones',
        explanation: `Mira cómo proyectar un aumento salarial del 10% para los empleados sin alterar sus sueldos reales en la base de datos:`,
        codeSnippet: `-- Proyectamos un aumento del 10% con AS salario_proyectado\nSELECT \n    nombre,\n    departamento,\n    salario AS salario_actual,\n    (salario * 1.10) AS salario_proyectado_10_porciento\nFROM empleados\nWHERE departamento = 'Ingeniería';`,
        outputSnippet: `+----------------+--------------+----------------+--------------------------------+\n| nombre         | departamento | salario_actual | salario_proyectado_10_porciento |\n+----------------+--------------+----------------+--------------------------------+\n| Carlos Mendoza | Ingeniería   | 3200.0         | 3520.0                         |\n+----------------+--------------+----------------+--------------------------------+\n1 fila devuelta`,
        byteTip: 'Multiplicar por 1.10 equivale a sumarle el 10% al monto original de forma directa.',
        pitfallTip: 'No confundas calcular un aumento en SELECT (simulación) con aplicar un aumento real en la tabla (que requeriría UPDATE).',
        keyPoints: [
          'Las columnas calculadas permiten hacer simulaciones y análisis sin riesgos.',
          'No modifican los datos maestros almacenados en las tablas.',
          'Permiten entregar información formateada lista para pintar en la interfaz.'
        ]
      }
    ]
  },

  'sql-u06-l06': {
    subtitle: 'Elimina filas repetidas de los resultados de tus consultas con la palabra clave DISTINCT.',
    analogy: 'Un pase de lista de las ciudades de donde vienen los asistentes a un evento: si 20 personas vienen de "San José", la lista no repite "San José" veinte veces; simplemente anota "San José" una sola vez para saber qué ciudades están representadas.',
    sections: [
      {
        title: 'Eliminación de duplicados con DISTINCT',
        explanation: `Frecuentemente, al consultar una columna específica de una tabla, te encuentras con muchos valores repetidos:
Por ejemplo, si consultas los departamentos de una empresa con 1,000 empleados, verás la palabra \`"Informática"\` repetida 300 veces.

Para obtener únicamente los **valores únicos y sin duplicados**, usamos la palabra clave **\`DISTINCT\`** inmediatamente después de \`SELECT\`:
\`SELECT DISTINCT departamento FROM empleados;\`

SQLite examinará todas las filas devueltas y descartará las copias repetidas, entregándote un catálogo limpio de opciones únicas.`,
        codeSnippet: `-- Sin DISTINCT: vemos departamentos repetidos\nSELECT departamento FROM asignaturas;\n\n-- Con DISTINCT: vemos únicamente los departamentos únicos sin repetir\nSELECT DISTINCT departamento FROM asignaturas;`,
        outputSnippet: `+--------------------+\n| departamento       |\n+--------------------+\n| Informática        |\n| Matemáticas        |\n| Telecomunicaciones |\n+--------------------+\n3 filas devueltas (duplicados eliminados)`,
        byteTip: 'DISTINCT opera sobre todas las columnas que pongas en el SELECT: si pones SELECT DISTINCT pais, ciudad evaluará combinaciones únicas de país y ciudad.',
        pitfallTip: 'No abuses de DISTINCT si no lo necesitas; ordenar y filtrar duplicados consume tiempo de procesamiento en tablas masivas.',
        keyPoints: [
          'DISTINCT descarta filas duplicadas en el resultado de la consulta.',
          'Se coloca inmediatamente después de la palabra SELECT.',
          'Ideal para poblar menús desplegables (Spinners / Dropdowns) en interfaces móviles.'
        ]
      },
      {
        title: 'Catálogo de categorías para filtros de tienda',
        explanation: `En cualquier app de comercio electrónico, para pintar los botones de filtro de categorías (Hardware, Pantallas, Audio) consultamos las categorías únicas con \`DISTINCT\`:`,
        codeSnippet: `-- Catálogo único de categorías para poblar los filtros de la app\nSELECT DISTINCT categoria\nFROM productos\nORDER BY categoria ASC;`,
        outputSnippet: `+------------+\n| categoria  |\n+------------+\n| Accesorios |\n| Audio      |\n| Hardware   |\n| Pantallas  |\n+------------+\n4 filas devueltas`,
        byteTip: 'Combinar DISTINCT con ORDER BY entrega una lista alfabética lista para el usuario.',
        pitfallTip: 'Si una fila tiene NULL en esa columna, DISTINCT lo considerará como un valor único y lo mostrará una vez.',
        keyPoints: [
          'DISTINCT genera catálogos dinámicos a partir de datos reales.',
          'Se actualiza solo: si mañana insertas un producto de categoría "Gaming", aparecerá automáticamente.',
          'Ahorra tener que mantener listas estáticas quemadas en el código de la app.'
        ]
      }
    ]
  },

  'sql-u06-l07': {
    subtitle: 'Aprende a interpretar los resultados tabulares, contar filas y leer metadatos de tus consultas.',
    analogy: 'Leer el estado de cuenta que te entrega el cajero automático: revisas el encabezado, verificas la cantidad de movimientos registrados y examinas el saldo final impreso al pie de página.',
    sections: [
      {
        title: 'Interpretación de resultados tabulares',
        explanation: `Cuando ejecutas una consulta en SQL, el motor de SQLite te responde con un **conjunto de resultados (*ResultSet*)**:

¿Cómo se compone este resultado?
1. **Encabezados de columna (*Headers*):** La primera fila con los nombres o alias proyectados en el \`SELECT\`.
2. **Filas de datos (*Rows*):** Cada uno de los registros devueltos que coincidieron con los criterios.
3. **Metadatos de ejecución:**
   • Cantidad de filas devueltas (*Row count*).
   • Tiempo de ejecución en milisegundos (*Execution time*).

Si la consulta devuelve **0 filas**, no significa que haya ocurrido un error técnico; simplemente significa que en este momento ningún registro cumple las condiciones que pediste.`,
        codeSnippet: `-- Consultamos empleados con salario superior a $4000 para analizar el resultado\nSELECT id, nombre, departamento, salario\nFROM empleados\nWHERE salario > 4000.0;`,
        outputSnippet: `+-----+---------------+--------------+---------+\n| id  | nombre        | departamento | salario |\n+-----+---------------+--------------+---------+\n| 104 | Sofía Valerio | Dirección    | 4500.0  |\n+-----+---------------+--------------+---------+\n1 fila devuelta (0.001 seg)`,
        byteTip: 'En Android con Room, un ResultSet de 1 fila se puede mapear directamente a un objeto nullable (Empleado?), y uno de muchas filas a List<Empleado>.',
        pitfallTip: 'No confundas "0 filas devueltas" (consulta exitosa sin coincidencias) con un error de sintaxis que arroja una excepción.',
        keyPoints: [
          'El ResultSet organiza la respuesta en encabezados y filas.',
          'El número de filas devueltas confirma el alcance del filtro.',
          'El tiempo de ejecución permite auditar la velocidad de la base de datos.'
        ]
      },
      {
        title: 'Verificación del número total de registros',
        explanation: `Para conocer de inmediato el volumen total de una tabla sin tener que traer todos los registros a la memoria, usamos la función agregada \`COUNT(*)\`:`,
        codeSnippet: `-- Contamos cuántos estudiantes están registrados en total en la universidad\nSELECT COUNT(*) AS total_estudiantes_registrados\nFROM estudiantes;`,
        outputSnippet: `+--------------------------------+\n| total_estudiantes_registrados |\n+--------------------------------+\n| 5                              |\n+--------------------------------+\n1 fila devuelta`,
        byteTip: 'COUNT(*) es ultra-rápido en SQLite porque lee directamente el contador de páginas del archivo.',
        pitfallTip: 'No uses SELECT * y luego calcules el tamaño en Kotlin con .size si solo querías saber la cantidad; usa COUNT(*) en SQL.',
        keyPoints: [
          'COUNT(*) devuelve un solo número con la cantidad de filas.',
          'Ahorra memoria y tiempo de transferencia.',
          'Cierra el módulo de consultas básicas dándote control completo sobre la lectura de datos.'
        ]
      }
    ]
  }
};
