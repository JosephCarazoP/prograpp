import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_04_THEORY: Record<string, TheoryLesson> = {
  "sql-u04-l01": {
    "id": "sql-th-u04-l01",
    "lessonId": "sql-u04-l01",
    "pathId": "sql",
    "unitId": 4,
    "levelId": 1,
    "title": "1. PRIMARY KEY",
    "subtitle": "Garantiza la identidad única de cada registro aplicando la restricción PRIMARY KEY.",
    "estimatedMinutes": 8,
    "analogy": "El código de barras único impreso en cada producto de una tienda: el lector láser lo escanea y sabe exactamente de qué artículo se trata sin posibilidad de equivocarse con otro.",
    "video": {
      "title": "Restricciones de Integridad: PRIMARY KEY, NOT NULL, CHECK",
      "channel": "Midudev",
      "duration": "34:50",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Garantizar calidad de datos con UNIQUE, CHECK, DEFAULT y manejo de nulos."
    },
    "sections": [
      {
        "title": "La restricción PRIMARY KEY en CREATE TABLE",
        "explanation": "Al crear una tabla, debemos definir cuál de sus columnas actuará como su Llave Primaria oficial.\n\nPara hacerlo, agregamos las palabras clave **`PRIMARY KEY`** justo después del tipo de dato de esa columna:\n`CREATE TABLE usuarios (`\n`    id INTEGER PRIMARY KEY,`\n`    nombre TEXT`\n`);`\n\nEfectos inmediatos:\n1. SQLite crea automáticamente un **índice B-Tree único** sobre esa columna.\n2. Si intentas insertar dos filas con el mismo `id`, SQLite rechazará la segunda inserción con un error de `UNIQUE constraint failed`.\n3. Ningún registro podrá tener `id` nulo.",
        "codeSnippet": "-- Verificamos la unicidad de las llaves primarias en la tabla usuarios\nSELECT id, nombre, email\nFROM usuarios\nORDER BY id ASC;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-------------------+--------------------+\n| id | nombre            | email              |\n+----+-------------------+--------------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   |\n| 2  | Alan Turing       | alan@bletchley.org |\n| 3  | Grace Hopper      | grace@navy.mil     |\n| 4  | Linus Torvalds    | linus@linux.org    |\n| 5  | Margaret Hamilton | margaret@nasa.gov  |\n+----+-------------------+--------------------+\n5 filas devueltas",
        "byteTip": "Toda tabla en una base de datos relacional profesional debe tener obligatoriamente una PRIMARY KEY.",
        "pitfallTip": "Olvidar la PRIMARY KEY en una tabla te impedirá relacionarla limpiamente con otras tablas mediante FOREIGN KEY.",
        "keyPoints": [
          "PRIMARY KEY garantiza que no existan filas duplicadas en la tabla.",
          "Crea un índice de búsqueda ultra-rápido de forma automática.",
          "Es una regla obligatoria en el diseño de bases de datos relacionales."
        ]
      },
      {
        "title": "Llaves primarias compuestas",
        "explanation": "En algunas tablas intermedias, la llave primaria se compone de dos columnas juntas (por ejemplo, `estudiante_id` y `asignatura_id` combinadas):\n`PRIMARY KEY (estudiante_id, asignatura_id)`\nEsto garantiza que la combinación de ambos números sea única en todo el sistema.",
        "codeSnippet": "-- En matriculas, la combinación de estudiante y asignatura debe ser única por ciclo\nSELECT id, estudiante_id, asignatura_id, periodo\nFROM matriculas\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+---------------+---------------+---------+\n| id | estudiante_id | asignatura_id | periodo |\n+----+---------------+---------------+---------+\n| 1  | 1             | 101           | 2024-1  |\n| 2  | 1             | 103           | 2024-1  |\n| 3  | 2             | 101           | 2024-1  |\n+----+---------------+---------------+---------+\n3 filas devueltas",
        "byteTip": "En la mayoría de los casos de Android, tener un simple id INTEGER PRIMARY KEY es más limpio y fácil de mapear con Room.",
        "pitfallTip": "No uses llaves compuestas de 4 o 5 columnas; hacen que las consultas sean complicadas y lentas.",
        "keyPoints": [
          "Las llaves compuestas unen dos o más columnas para garantizar unicidad.",
          "Son comunes en tablas intermedias de relaciones N:M.",
          "Room en Android soporta tanto llaves simples como compuestas."
        ]
      }
    ]
  },
  "sql-u04-l02": {
    "id": "sql-th-u04-l02",
    "lessonId": "sql-u04-l02",
    "pathId": "sql",
    "unitId": 4,
    "levelId": 2,
    "title": "2. INTEGER PRIMARY KEY",
    "subtitle": "Deja que la base de datos numere tus registros automáticamente con INTEGER PRIMARY KEY y AUTOINCREMENT.",
    "estimatedMinutes": 8,
    "analogy": "El dispensador de números de atención de un banco: cada cliente que llega presiona un botón y recibe el siguiente número correlativo (1, 2, 3...) sin tener que inventárselo.",
    "video": {
      "title": "Restricciones de Integridad: PRIMARY KEY, NOT NULL, CHECK",
      "channel": "Midudev",
      "duration": "34:50",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Garantizar calidad de datos con UNIQUE, CHECK, DEFAULT y manejo de nulos."
    },
    "sections": [
      {
        "title": "INTEGER PRIMARY KEY y autoincremento en SQLite",
        "explanation": "Al insertar un nuevo registro (como un nuevo usuario que se acaba de registrar en tu app), no quieres tener que calcular tú mismo manualmente cuál fue el último ID para sumarle 1.\n\nEn SQLite existe una regla mágica:\nSi declaras una columna exactamente como **`INTEGER PRIMARY KEY`**:\n• SQLite la vincula directamente con la fila interna de la tabla (**`rowid`**).\n• Cuando insertes un registro y omitas el `id` (o le pases `NULL`), **SQLite le asignará automáticamente el siguiente número entero secuencial disponible**.",
        "codeSnippet": "-- Tabla diseñada con llave primaria autoincremental en SQLite\nCREATE TABLE clientes_nuevos (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nombre TEXT NOT NULL,\n    fecha_registro DATE DEFAULT CURRENT_DATE\n);",
        "codeLanguage": "sql",
        "outputSnippet": "Tabla 'clientes_nuevos' creada con autoincremento habilitado.",
        "byteTip": "En SQLite, INTEGER PRIMARY KEY a secas ya autoincrementa. Agregar AUTOINCREMENT previene estrictamente la reutilización de IDs borrados en el pasado.",
        "pitfallTip": "Solo funciona con INTEGER. Si escribes INT PRIMARY KEY, SQLite no activará el comportamiento de autoincremento nativo.",
        "keyPoints": [
          "INTEGER PRIMARY KEY genera identificadores correlativos automáticos.",
          "Evita que tengas que consultar el último ID antes de insertar.",
          "AUTOINCREMENT garantiza que ningún ID del pasado vuelva a usarse jamás."
        ]
      },
      {
        "title": "Inserción automática sin especificar ID",
        "explanation": "Al insertar en una tabla con `INTEGER PRIMARY KEY`, simplemente omites la columna `id` y te concentras en los datos reales:",
        "codeSnippet": "-- Consulta que demuestra IDs generados de forma correlativa limpia\nSELECT id, nombre\nFROM usuarios\nORDER BY id DESC\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-------------------+\n| id | nombre            |\n+----+-------------------+\n| 5  | Margaret Hamilton |\n| 4  | Linus Torvalds    |\n| 3  | Grace Hopper      |\n+----+-------------------+\n3 filas devueltas",
        "byteTip": "ORDER BY id DESC ordena del ID más reciente al más antiguo (orden cronológico inverso).",
        "pitfallTip": "No dependas de que los IDs sean exactamente consecutivos sin saltos; si un INSERT falla o se borra un registro, habrá huecos numéricos normales.",
        "keyPoints": [
          "Omitir el id en el INSERT delega la numeración a la base de datos.",
          "Garantiza que no ocurran colisiones entre diferentes usuarios simultáneos.",
          "Es el estándar indiscutible en bases de datos móviles y servidores."
        ]
      }
    ]
  },
  "sql-u04-l03": {
    "id": "sql-th-u04-l03",
    "lessonId": "sql-u04-l03",
    "pathId": "sql",
    "unitId": 4,
    "levelId": 3,
    "title": "3. FOREIGN KEY y REFERENCES",
    "subtitle": "Declara llaves foráneas explícitas con FOREIGN KEY y REFERENCES para blindar tus relaciones.",
    "estimatedMinutes": 8,
    "analogy": "Un enchufe y un tomacorriente con forma especial: el enchufe (FOREIGN KEY) solo entra en un tomacorriente que coincida exactamente con su forma (REFERENCES tabla_principal(id)). No puedes enchufarlo en el aire.",
    "video": {
      "title": "Restricciones de Integridad: PRIMARY KEY, NOT NULL, CHECK",
      "channel": "Midudev",
      "duration": "34:50",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Garantizar calidad de datos con UNIQUE, CHECK, DEFAULT y manejo de nulos."
    },
    "sections": [
      {
        "title": "Sintaxis de FOREIGN KEY en CREATE TABLE",
        "explanation": "Para que SQLite sepa formalmente que una columna es una Llave Foránea vinculada a otra tabla, usamos la cláusula **`FOREIGN KEY ... REFERENCES`** en el momento de crear la tabla:\n\n`CREATE TABLE matriculas (`\n`    id INTEGER PRIMARY KEY AUTOINCREMENT,`\n`    estudiante_id INTEGER NOT NULL,`\n`    asignatura_id INTEGER NOT NULL,`\n`    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),`\n`    FOREIGN KEY (asignatura_id) REFERENCES asignaturas(id)`\n`);`",
        "codeSnippet": "-- Verificamos los registros de la tabla matriculas protegida por llaves foráneas\nSELECT id, estudiante_id, asignatura_id, periodo, nota_final\nFROM matriculas\nWHERE periodo = '2024-1';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+---------------+---------------+---------+------------+\n| id | estudiante_id | asignatura_id | periodo | nota_final |\n+----+---------------+---------------+---------+------------+\n| 1  | 1             | 101           | 2024-1  | 9.5        |\n| 2  | 1             | 103           | 2024-1  | 9.2        |\n| 3  | 2             | 101           | 2024-1  | 8.7        |\n| 4  | 2             | 102           | 2024-1  | 8.9        |\n| 5  | 3             | 101           | 2024-1  | 9.8        |\n| 6  | 4             | 104           | 2024-1  | 8.0        |\n| 7  | 5             | 103           | 2024-1  | 9.0        |\n+----+---------------+---------------+---------+------------+\n7 filas devueltas",
        "byteTip": "En SQLite, las llaves foráneas se pueden declarar al final de la tabla o en la misma línea: estudiante_id INTEGER REFERENCES estudiantes(id).",
        "pitfallTip": "Por defecto, SQLite viene con la verificación de llaves foráneas desactivada por compatibilidad histórica. Debes activarla siempre con PRAGMA foreign_keys = ON;.",
        "keyPoints": [
          "FOREIGN KEY declara formalmente la relación entre dos tablas.",
          "REFERENCES especifica la tabla y columna destino exactas.",
          "Protege la base de datos contra registros huérfanos o referencias rotas."
        ]
      },
      {
        "title": "Acciones automáticas con ON DELETE",
        "explanation": "¿Qué debe pasar con las matrículas de un alumno si el alumno es borrado de la universidad?\nPuedes configurar el comportamiento automático en la propia llave foránea:\n• **`ON DELETE CASCADE`**: Si se borra el alumno, SQLite borra automáticamente todas sus matrículas asociadas en cascada.\n• **`ON DELETE RESTRICT`** (Predeterminado): SQLite bloquea el borrado del alumno mientras tenga materias matriculadas.\n• **`ON DELETE SET NULL`**: Pone en `null` la columna del hijo.",
        "codeSnippet": "-- Ejemplo conceptual de tabla con borrado en cascada configurado\nCREATE TABLE comentarios (\n    id INTEGER PRIMARY KEY,\n    usuario_id INTEGER,\n    contenido TEXT,\n    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE\n);",
        "codeLanguage": "sql",
        "outputSnippet": "Tabla 'comentarios' creada con ON DELETE CASCADE.",
        "byteTip": "ON DELETE CASCADE es ideal para relaciones donde los hijos no tienen ningún sentido de existir sin el padre (como los renglones de una factura).",
        "pitfallTip": "Usa CASCADE con precaución: borrar un registro principal por accidente podría eliminar miles de registros dependientes.",
        "keyPoints": [
          "ON DELETE CASCADE limpia registros secundarios automáticamente.",
          "ON DELETE RESTRICT protege registros principales contra eliminaciones accidentales.",
          "Centraliza la política de eliminación en el motor de la base de datos."
        ]
      }
    ]
  },
  "sql-u04-l04": {
    "id": "sql-th-u04-l04",
    "lessonId": "sql-u04-l04",
    "pathId": "sql",
    "unitId": 4,
    "levelId": 4,
    "title": "4. NOT NULL",
    "subtitle": "Exige datos obligatorios y prohíbe casillas vacías con la restricción NOT NULL.",
    "estimatedMinutes": 8,
    "analogy": "Un formulario donde los campos marcados con un asterisco rojo (*) son obligatorios: si intentas presionar el botón \"Registrarse\" sin haber escrito tu nombre o contraseña, el sistema no te deja continuar.",
    "video": {
      "title": "Restricciones de Integridad: PRIMARY KEY, NOT NULL, CHECK",
      "channel": "Midudev",
      "duration": "34:50",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Garantizar calidad de datos con UNIQUE, CHECK, DEFAULT y manejo de nulos."
    },
    "sections": [
      {
        "title": "La restricción NOT NULL",
        "explanation": "Por defecto, cualquier columna de una tabla en SQL acepta valores `NULL` (ausencia de dato).\n\nSin embargo, en cualquier sistema real hay datos que son **estrictamente indispensables**:\n• Un usuario no puede existir sin `nombre` ni sin `contrasena`.\n• Un producto no puede existir sin `precio`.\n• Una factura no puede existir sin `fecha`.\n\nPara prohibir que una columna quede vacía, agregamos la restricción **`NOT NULL`**:\n`CREATE TABLE usuarios (`\n`    id INTEGER PRIMARY KEY,`\n`    nombre TEXT NOT NULL,`\n`    email TEXT NOT NULL`\n`);`\n\nSi alguien intenta insertar una fila sin proporcionar un valor para esa columna, SQLite rechazará la operación con un error de `NOT NULL constraint failed`.",
        "codeSnippet": "-- Consultamos columnas que tienen restricción NOT NULL garantizada\nSELECT id, nombre, email\nFROM usuarios\nWHERE nombre IS NOT NULL;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-------------------+--------------------+\n| id | nombre            | email              |\n+----+-------------------+--------------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   |\n| 2  | Alan Turing       | alan@bletchley.org |\n| 3  | Grace Hopper      | grace@navy.mil     |\n| 4  | Linus Torvalds    | linus@linux.org    |\n| 5  | Margaret Hamilton | margaret@nasa.gov  |\n+----+-------------------+--------------------+\n5 filas devueltas",
        "byteTip": "En Kotlin y Room, una propiedad no anulable (val nombre: String) se traduce automáticamente a una columna con NOT NULL en SQLite.",
        "pitfallTip": "Un texto vacío \"\" NO es null para SQLite. Si insertas \"\", pasará la restricción NOT NULL. Para evitar textos vacíos se usa CHECK.",
        "keyPoints": [
          "NOT NULL exige que la columna tenga siempre un valor válido asignado.",
          "Evita que se guarden registros incompletos o defectuosos.",
          "Se alinea directamente con los tipos no anulables de Kotlin."
        ]
      },
      {
        "title": "Combinar NOT NULL con valores DEFAULT",
        "explanation": "Puedes combinar `NOT NULL` con un valor por defecto `DEFAULT` para que si el usuario no envía el dato, la base de datos lo rellene sola:",
        "codeSnippet": "-- Tabla con campos obligatorios respaldados por valores por defecto\nCREATE TABLE inventario_rapido (\n    codigo TEXT PRIMARY KEY,\n    stock INTEGER NOT NULL DEFAULT 0\n);",
        "codeLanguage": "sql",
        "outputSnippet": "Tabla 'inventario_rapido' creada con éxito.",
        "byteTip": "stock INTEGER NOT NULL DEFAULT 0 asegura que el stock jamás sea null; si no se especifica, arranca en 0.",
        "pitfallTip": "No uses NOT NULL en campos que legítimamente pueden ser opcionales para el usuario (como segundo_telefono).",
        "keyPoints": [
          "NOT NULL + DEFAULT garantiza un valor concreto sin intervención manual.",
          "Protege la base de datos contra inconsistencias de lógica en la app.",
          "Es la combinación más habitual en contadores y acumuladores de estado."
        ]
      }
    ]
  },
  "sql-u04-l05": {
    "id": "sql-th-u04-l05",
    "lessonId": "sql-u04-l05",
    "pathId": "sql",
    "unitId": 4,
    "levelId": 5,
    "title": "5. UNIQUE",
    "subtitle": "Evita correos o identificaciones duplicadas en tu base de datos usando la restricción UNIQUE.",
    "estimatedMinutes": 8,
    "analogy": "La matrícula o placa de un automóvil: en una ciudad no pueden circular dos vehículos con exactamente la misma placa de circulación. La placa es única para ese vehículo.",
    "video": {
      "title": "Restricciones de Integridad: PRIMARY KEY, NOT NULL, CHECK",
      "channel": "Midudev",
      "duration": "34:50",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Garantizar calidad de datos con UNIQUE, CHECK, DEFAULT y manejo de nulos."
    },
    "sections": [
      {
        "title": "La restricción UNIQUE",
        "explanation": "Ya vimos que la Llave Primaria (`id`) es única por definición. Pero frecuentemente necesitamos que **otras columnas secundarias tampoco se repitan jamás**:\n• El correo electrónico (`email`) de los usuarios en un inicio de sesión.\n• El nombre de usuario (`username` o apodo).\n• El código de barras (`codigo_barras`) de un producto en el supermercado.\n\nPara garantizar esto, usamos la restricción **`UNIQUE`**:\n`CREATE TABLE usuarios (`\n`    id INTEGER PRIMARY KEY,`\n`    email TEXT UNIQUE NOT NULL`\n`);`\n\nSi intentas registrar un segundo usuario con un correo que ya existe, SQLite detendrá la operación de inmediato con `UNIQUE constraint failed: usuarios.email`.",
        "codeSnippet": "-- Consultamos correos únicos que están protegidos por restricción UNIQUE\nSELECT id, nombre, email\nFROM usuarios\nORDER BY email ASC;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-------------------+--------------------+\n| id | nombre            | email              |\n+----+-------------------+--------------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   |\n| 2  | Alan Turing       | alan@bletchley.org |\n| 3  | Grace Hopper      | grace@navy.mil     |\n| 4  | Linus Torvalds    | linus@linux.org    |\n| 5  | Margaret Hamilton | margaret@nasa.gov  |\n+----+-------------------+--------------------+\n5 filas devueltas",
        "byteTip": "Al igual que con la PRIMARY KEY, SQLite crea automáticamente un índice de búsqueda ultra-rápido para toda columna marcada con UNIQUE.",
        "pitfallTip": "En SQL estándar, varias filas pueden tener NULL en una columna UNIQUE (porque null no es igual a nada). Si no quieres nulos, usa UNIQUE NOT NULL.",
        "keyPoints": [
          "UNIQUE garantiza que no existan valores duplicados en esa columna.",
          "Crea un índice de búsqueda eficiente de forma transparente.",
          "Esencial para correos, nombres de usuario y códigos de identificación."
        ]
      },
      {
        "title": "Restricción UNIQUE compuesta sobre múltiples columnas",
        "explanation": "Puedes aplicar la restricción sobre la combinación de dos columnas: por ejemplo, que un usuario pueda tener varios favoritos, pero no pueda marcar dos veces el mismo producto como favorito:",
        "codeSnippet": "-- Ejemplo conceptual de tabla de favoritos con unicidad de par\nCREATE TABLE favoritos_usuario (\n    id INTEGER PRIMARY KEY,\n    usuario_id INTEGER NOT NULL,\n    producto_id INTEGER NOT NULL,\n    UNIQUE(usuario_id, producto_id)\n);",
        "codeLanguage": "sql",
        "outputSnippet": "Tabla 'favoritos_usuario' creada con restricción UNIQUE combinada.",
        "byteTip": "UNIQUE(colA, colB) permite que colA se repita y colB se repita, pero la combinación de ambas juntas debe ser única.",
        "pitfallTip": "No confíes solo en validar duplicados en Kotlin; la restricción UNIQUE en SQLite es tu garantía final a prueba de fallos concurrentes.",
        "keyPoints": [
          "UNIQUE sobre múltiples columnas previene duplicaciones compuestas.",
          "Evita que un usuario vote o califique dos veces el mismo contenido.",
          "Protege la base de datos contra peticiones dobles por fallas de conexión móvil."
        ]
      }
    ]
  },
  "sql-u04-l06": {
    "id": "sql-th-u04-l06",
    "lessonId": "sql-u04-l06",
    "pathId": "sql",
    "unitId": 4,
    "levelId": 6,
    "title": "6. CHECK",
    "subtitle": "Valida rangos numéricos y reglas de negocio complejas directamente en la base de datos con CHECK.",
    "estimatedMinutes": 8,
    "analogy": "Un torniquete con medidor de edad y boleto: revisa automáticamente que tu edad sea mayor a 0 y que el precio pagado no sea negativo antes de dejarte pasar.",
    "video": {
      "title": "Restricciones de Integridad: PRIMARY KEY, NOT NULL, CHECK",
      "channel": "Midudev",
      "duration": "34:50",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Garantizar calidad de datos con UNIQUE, CHECK, DEFAULT y manejo de nulos."
    },
    "sections": [
      {
        "title": "La restricción CHECK: validación de reglas de negocio",
        "explanation": "¿Qué pasa si un programador despistado o un error en la app intenta guardar un producto con precio `-50.0` o una edad de `-12` años?\n\nLa restricción **`CHECK`** te permite escribir una condición booleana que SQLite validará obligatoriamente antes de aceptar cualquier `INSERT` o `UPDATE`:\n`CREATE TABLE productos (`\n`    id INTEGER PRIMARY KEY,`\n`    precio REAL CHECK (precio >= 0.0),`\n`    stock INTEGER CHECK (stock >= 0)`\n`);`\n\nSi la condición del `CHECK` resulta ser `false`, SQLite bloquea el cambio y devuelve un error de `CHECK constraint failed`. ¡Es el guardián de tus reglas de negocio!",
        "codeSnippet": "-- Consultamos productos cuyos precios y existencias cumplen las reglas de negocio\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE precio > 0 AND stock >= 0;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+------------------------------+--------+-------+\n| id | nombre                       | precio | stock |\n+----+------------------------------+--------+-------+\n| 1  | Teclado Mecánico RGB         | 89.99  | 45    |\n| 2  | Monitor Ultrawide 34\"        | 429.5  | 12    |\n| 3  | Mouse Ergonómico Pro         | 49.9   | 80    |\n| 4  | Auriculares Cancelación Ruido| 129.0  | 25    |\n| 5  | Cable HDMI 2.1 Braided       | 14.99  | 150   |\n+----+------------------------------+--------+-------+\n5 filas devueltas",
        "byteTip": "Puedes validar listas de opciones con IN: CHECK (genero IN ('M', 'F', 'O')).",
        "pitfallTip": "No escribas condiciones CHECK con fórmulas imposibles que hagan que nunca se pueda insertar un dato válido.",
        "keyPoints": [
          "CHECK evalúa una expresión booleana en cada inserción o modificación.",
          "Impide datos ilógicos (precios negativos, edades absurdas, estados inválidos).",
          "Blindar la base de datos con CHECK asegura la calidad de los datos sin importar de dónde vengan."
        ]
      },
      {
        "title": "Validación de textos no vacíos con CHECK",
        "explanation": "Como vimos en la lección de `NOT NULL`, un texto vacío `\"\"` no es nulo. Puedes combinar `NOT NULL` con `CHECK(length(titulo) > 0)` para garantizar que el título no sea un texto vacío:",
        "codeSnippet": "-- Tabla blindada contra textos vacíos con CHECK\nCREATE TABLE tareas_estrictas (\n    id INTEGER PRIMARY KEY,\n    titulo TEXT NOT NULL CHECK (length(trim(titulo)) >= 3)\n);",
        "codeLanguage": "sql",
        "outputSnippet": "Tabla 'tareas_estrictas' creada con validación de longitud mínima en CHECK.",
        "byteTip": "CHECK(length(trim(titulo)) >= 3) impide que alguien guarde tareas con solo espacios en blanco.",
        "pitfallTip": "Mantén las reglas CHECK simples y comprensibles para no ralentizar inserciones masivas.",
        "keyPoints": [
          "CHECK permite invocar funciones estándar como length() y trim().",
          "Es el complemento perfecto de NOT NULL para texto.",
          "Evita almacenar registros con campos en blanco o espacios basura."
        ]
      }
    ]
  },
  "sql-u04-l07": {
    "id": "sql-th-u04-l07",
    "lessonId": "sql-u04-l07",
    "pathId": "sql",
    "unitId": 4,
    "levelId": 7,
    "title": "7. DEFAULT",
    "subtitle": "Asigna valores automáticos a columnas no especificadas usando la cláusula DEFAULT.",
    "estimatedMinutes": 8,
    "analogy": "El valor por defecto de un teléfono nuevo al sacarlo de su caja: viene con el volumen al 50%, el idioma en español y la pantalla en brillo automático, a menos que tú decidas cambiarlo expresamente.",
    "video": {
      "title": "Restricciones de Integridad: PRIMARY KEY, NOT NULL, CHECK",
      "channel": "Midudev",
      "duration": "34:50",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Garantizar calidad de datos con UNIQUE, CHECK, DEFAULT y manejo de nulos."
    },
    "sections": [
      {
        "title": "Valores predeterminados con DEFAULT",
        "explanation": "A menudo queremos que una columna tenga un valor estándar automático si el código que inserta el registro no especifica ninguno:\n• Que la fecha de creación sea la fecha de hoy (`CURRENT_DATE`).\n• Que una cuenta nazca activa (`true`).\n• Que el saldo inicial sea `0.0`.\n• Que el país predeterminado sea `\"Costa Rica\"`.\n\nPara esto usamos la cláusula **`DEFAULT`**:\n`CREATE TABLE usuarios (`\n`    id INTEGER PRIMARY KEY,`\n`    nombre TEXT NOT NULL,`\n`    activo BOOLEAN DEFAULT true,`\n`    rol TEXT DEFAULT 'CLIENTE'`\n`);`",
        "codeSnippet": "-- Consultamos empleados donde la columna 'activo' tiene valores booleanos predeterminados\nSELECT id, nombre, activo\nFROM empleados;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+----------------+--------+\n| id  | nombre         | activo |\n+-----+----------------+--------+\n| 101 | Carlos Mendoza | true   |\n| 102 | Elena Rostova  | true   |\n| 103 | Mateo Díaz     | true   |\n| 104 | Sofía Valerio  | true   |\n| 105 | Andrés Solano  | false  |\n+-----+----------------+--------+\n5 filas devueltas",
        "byteTip": "SQLite incluye constantes automáticas para fechas: CURRENT_DATE (fecha actual), CURRENT_TIME (hora actual) y CURRENT_TIMESTAMP (fecha y hora exacta).",
        "pitfallTip": "Si en el INSERT envías explícitamente el valor NULL, SQLite colocará NULL y no aplicará el DEFAULT (a menos que la columna sea NOT NULL).",
        "keyPoints": [
          "DEFAULT asigna un valor automático si la columna se omite en el INSERT.",
          "Permite escribir sentencias INSERT más cortas y limpias.",
          "Soporta números, textos, booleanos y marcas de tiempo del sistema (CURRENT_DATE)."
        ]
      },
      {
        "title": "Auditoría automática de registros con marcas de tiempo",
        "explanation": "Uno de los usos más profesionales de `DEFAULT` es registrar cuándo se creó cada fila sin tener que calcular la hora desde Kotlin:",
        "codeSnippet": "-- Tabla con registro automático de fecha de creación del sistema\nCREATE TABLE bitacora_sistema (\n    id INTEGER PRIMARY KEY,\n    evento TEXT NOT NULL,\n    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP\n);",
        "codeLanguage": "sql",
        "outputSnippet": "Tabla 'bitacora_sistema' creada con CURRENT_TIMESTAMP automático.",
        "byteTip": "CURRENT_TIMESTAMP genera la fecha en formato ISO estándar \"AAAA-MM-DD HH:MM:SS\".",
        "pitfallTip": "El reloj del sistema local del teléfono puede ser alterado por el usuario; en servidores se usa la hora UTC.",
        "keyPoints": [
          "CURRENT_TIMESTAMP es el estándar para sellos de tiempo automáticos.",
          "Ahorra pasar fechas manualmente desde la app móvil.",
          "Facilita la auditoría y depuración cronológica de eventos."
        ]
      }
    ]
  },
  "sql-u04-l08": {
    "id": "sql-th-u04-l08",
    "lessonId": "sql-u04-l08",
    "pathId": "sql",
    "unitId": 4,
    "levelId": 8,
    "title": "8. Diferencia entre NULL, cero, texto vacío y valor predeterminado",
    "subtitle": "Distingue con total precisión entre NULL, cero (0), texto vacío (\"\") y valor predeterminado.",
    "estimatedMinutes": 8,
    "analogy": "NULL es no tener cuenta bancaria. 0 pesos es tener una cuenta bancaria abierta pero sin dinero. Texto vacío \"\" es tener una libreta con las páginas en blanco. Valor DEFAULT es el saldo inicial de bienvenida que te regala el banco al abrir la cuenta.",
    "video": {
      "title": "Restricciones de Integridad: PRIMARY KEY, NOT NULL, CHECK",
      "channel": "Midudev",
      "duration": "34:50",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Garantizar calidad de datos con UNIQUE, CHECK, DEFAULT y manejo de nulos."
    },
    "sections": [
      {
        "title": "NULL vs Cero vs Texto Vacío vs DEFAULT",
        "explanation": "Uno de los errores conceptuales más peligrosos en bases de datos es confundir estos cuatro estados:\n\n1. **`NULL`:** Representa **desconocimiento o ausencia total de dato**. No es cero ni es texto vacío. Es un signo de interrogación: no sabemos el dato.\n2. **`0` (Cero):** Es un valor numérico concreto y medible. Si tu saldo es `0`, sabemos con certeza matemática cuánto tienes: ¡cero pesos!\n3. **`\"\"` (Texto vacío):** Es una cadena de texto válida cuya longitud es estrictamente cero caracteres.\n4. **`DEFAULT`:** Es la regla que decide qué valor asignar si nadie proporciona un dato al insertar.\n\nEn SQL, **`NULL` jamás se compara con el signo `=`**. Para verificar nulos se usa obligatoriamente **`IS NULL`** o **`IS NOT NULL`**:\n`WHERE telefono IS NULL`",
        "codeSnippet": "-- Demostración de cómo se filtran los nulos de forma correcta con IS NULL\nSELECT id, nombre, email\nFROM usuarios\nWHERE email IS NOT NULL;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-------------------+--------------------+\n| id | nombre            | email              |\n+----+-------------------+--------------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   |\n| 2  | Alan Turing       | alan@bletchley.org |\n| 3  | Grace Hopper      | grace@navy.mil     |\n| 4  | Linus Torvalds    | linus@linux.org    |\n| 5  | Margaret Hamilton | margaret@nasa.gov  |\n+----+-------------------+--------------------+\n5 filas devueltas",
        "byteTip": "Escribir WHERE email = NULL dará 0 filas siempre en SQL. En la lógica tripartita de SQL, NULL = NULL se evalúa como Desconocido (UNKNOWN), no como true.",
        "pitfallTip": "Nunca uses el operador = para comparar contra NULL; usa siempre IS NULL o IS NOT NULL.",
        "keyPoints": [
          "NULL es ausencia de dato; 0 y \"\" son datos existentes con valor cero o vacío.",
          "Las comparaciones con NULL exigen las cláusulas IS NULL e IS NOT NULL.",
          "Confundir NULL con cero produce reportes contables y promedios erróneos."
        ]
      },
      {
        "title": "El impacto de NULL en los promedios",
        "explanation": "Mira por qué distinguir entre `NULL` y `0` es de vida o muerte:\n• Si un alumno no hizo el examen (`nota = NULL`), la función `AVG()` de SQL **ignora los nulos** y calcula el promedio con los exámenes que sí hizo.\n• Si le pones `nota = 0`, la función `AVG()` sumará el cero y destruirá su promedio dividiendo entre un examen más.",
        "codeSnippet": "-- Consultamos notas de matrículas donde los cálculos respetan los valores numéricos\nSELECT AVG(nota_final) AS promedio_general_alumnos\nFROM matriculas;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------------------+\n| promedio_general_alumnos |\n+--------------------------+\n| 8.9                      |\n+--------------------------+\n1 fila devuelta",
        "byteTip": "Usa NULL cuando el evento no ha ocurrido aún (ej: fecha_devolucion en un préstamo de libro mientras el libro sigue prestado).",
        "pitfallTip": "No uses valores centinela extraños como -1 o 9999 para representar nulos; usa NULL de forma nativa.",
        "keyPoints": [
          "Las funciones de agregación (AVG, SUM, MIN, MAX) ignoran automáticamente los valores NULL.",
          "Usar 0 en lugar de NULL altera los cálculos estadísticos del sistema.",
          "NULL representa fielmente estados pendientes o información no disponible."
        ]
      }
    ]
  }
};
