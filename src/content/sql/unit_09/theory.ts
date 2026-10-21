import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_09_THEORY: Record<string, TheoryLesson> = {
  "sql-u09-l01": {
    "id": "sql-th-u09-l01",
    "lessonId": "sql-u09-l01",
    "pathId": "sql",
    "unitId": 9,
    "levelId": 1,
    "title": "1. Para qué sirve un JOIN",
    "subtitle": "Descubre por qué dividimos los datos en varias tablas y cómo los JOINs nos permiten reconstruir la información completa.",
    "estimatedMinutes": 8,
    "analogy": "Un rompecabezas donde cada tabla es una pieza: en una tienes los datos del estudiante y en otra sus notas. Con un JOIN unes las piezas exactas usando la llave que encaja.",
    "video": {
      "title": "JOINs en SQL: INNER JOIN, LEFT JOIN y Múltiples Tablas",
      "channel": "Fazt Code",
      "duration": "58:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Unión de tablas relacionadas, condiciones ON, alias de tablas y lectura de matrículas."
    },
    "sections": [
      {
        "title": "¿Por qué unir tablas? La magia del modelo relacional",
        "explanation": "Imagina que tienes una aplicación escolar. Si guardaras en una sola tabla el nombre del estudiante, su carrera, el nombre de la materia que cursa, el profesor y su nota, ocurriría un desastre:\n• Si un estudiante lleva 5 materias, tendrías que repetir su nombre y correo 5 veces.\n• Si el estudiante cambia su número de teléfono, tendrías que actualizar 5 filas. Si olvidas una, la base de datos quedará con datos contradictorios.\n\nPara evitar esto, el **modelo relacional** divide la información en tablas especializadas:\n1. `estudiantes`: guarda únicamente datos personales (id, nombre, carrera).\n2. `asignaturas`: guarda información de las materias (id, nombre, créditos).\n3. `matriculas`: actúa como puente, vinculando qué estudiante está inscrito en qué asignatura mediante llaves foráneas (`estudiante_id`, `asignatura_id`).\n\nLa instrucción **`JOIN`** es la herramienta que te permite **reconstruir la información** al momento de consultarla, combinando filas de dos o más tablas según una columna común.",
        "codeSnippet": "-- Visualizamos las tres tablas separadas que luego uniremos\nSELECT id, nombre, carrera FROM estudiantes LIMIT 2;\nSELECT id, nombre, creditos FROM asignaturas LIMIT 2;\nSELECT id, estudiante_id, asignatura_id, nota_final FROM matriculas LIMIT 2;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+-----------------------+\n| id | nombre          | carrera               |\n+----+-----------------+-----------------------+\n| 1  | Valeria Morales | Ingeniería de Software|\n| 2  | Diego Fernández | Ciencias Computación  |\n+----+-----------------+-----------------------+\n2 rows in set (0.001 sec)",
        "byteTip": "En SQLite y Android con Room, separar entidades y unirlas con relaciones mantiene la base de datos pequeña, rápida y libre de datos duplicados.",
        "pitfallTip": "No intentes guardar listas de IDs separadas por comas dentro de una sola celda de texto; eso rompe las reglas del diseño relacional.",
        "keyPoints": [
          "Dividir datos en tablas normalizadas evita duplicaciones y errores de consistencia.",
          "Las llaves foráneas conectan los registros entre tablas.",
          "JOIN es la operación encargada de fusionar los datos relacionados en un solo reporte visual."
        ]
      },
      {
        "title": "De la llave foránea al reporte unificado",
        "explanation": "Cuando consultas una base de datos relacional, el usuario final no quiere ver números crudos de identificación como `estudiante_id = 1` y `asignatura_id = 101`. Quiere ver:\n*\"Valeria Morales está cursando Bases de Datos I con una nota de 9.5\"*.\n\nEl proceso de unión funciona así:\n1. El motor de base de datos lee la fila de la tabla izquierda.\n2. Busca en la tabla derecha los registros que tengan el mismo valor en la columna de enlace (la llave foránea).\n3. Junta las columnas de ambas tablas en una fila combinada dentro del resultado.",
        "codeSnippet": "-- Consulta conceptual: vemos cómo se asocian estudiantes con sus notas\nSELECT matriculas.id, estudiantes.nombre, matriculas.nota_final\nFROM matriculas\nJOIN estudiantes ON matriculas.estudiante_id = estudiantes.id;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+------------+\n| id | nombre          | nota_final |\n+----+-----------------+------------+\n| 1  | Valeria Morales | 9.5        |\n| 2  | Valeria Morales | 9.2        |\n| 3  | Diego Fernández | 8.7        |\n| 4  | Diego Fernández | 8.9        |\n+----+-----------------+------------+\n4 rows in set (0.002 sec)",
        "byteTip": "En Room para Android, puedes representar un JOIN fácilmente creando una data class con la anotación @Relation o @Embedded.",
        "pitfallTip": "Un JOIN no altera físicamente las tablas en el disco; solo produce una vista combinada en memoria para tu consulta.",
        "keyPoints": [
          "JOIN convierte códigos y números de referencia en información legible para personas.",
          "Permite responder preguntas de negocio complejas sin redundancia de almacenamiento.",
          "Es el pilar fundamental que da nombre a las bases de datos \"relacionales\"."
        ]
      }
    ]
  },
  "sql-u09-l02": {
    "id": "sql-th-u09-l02",
    "lessonId": "sql-u09-l02",
    "pathId": "sql",
    "unitId": 9,
    "levelId": 2,
    "title": "2. INNER JOIN",
    "subtitle": "Domina la unión más común en SQL: combina únicamente las filas que tienen coincidencia en ambas tablas.",
    "estimatedMinutes": 8,
    "analogy": "Un apretón de manos: para que ocurra, se necesitan dos personas. Si un estudiante no tiene matrícula registrada, o una matrícula no tiene estudiante válido, no hay coincidencia y no aparece en la foto.",
    "video": {
      "title": "JOINs en SQL: INNER JOIN, LEFT JOIN y Múltiples Tablas",
      "channel": "Fazt Code",
      "duration": "58:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Unión de tablas relacionadas, condiciones ON, alias de tablas y lectura de matrículas."
    },
    "sections": [
      {
        "title": "La intersección exacta: Sintaxis de INNER JOIN",
        "explanation": "El **`INNER JOIN`** (o simplemente `JOIN`) es el tipo de unión predeterminado y más utilizado en SQL. Devuelve **únicamente las filas que tienen coincidencia** en ambas tablas.\n\nEstructura básica:\n`SELECT tabla1.columna, tabla2.columna`\n`FROM tabla1`\n`INNER JOIN tabla2 ON tabla1.columna_llave = tabla2.columna_foranea;`\n\n¿Qué ocurre con los registros sin pareja?\n• Si hay un estudiante que aún no se ha matriculado en ninguna materia, **no aparecerá** en el resultado.\n• Si hay una materia nueva en la que nadie se ha inscrito todavía, tampoco aparecerá.\n• Solo se muestran los registros donde la condición del `ON` se cumple con éxito.",
        "codeSnippet": "-- Unimos estudiantes y matriculas para ver las notas de quienes sí están cursando\nSELECT estudiantes.nombre, matriculas.periodo, matriculas.nota_final\nFROM estudiantes\nINNER JOIN matriculas ON estudiantes.id = matriculas.estudiante_id;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+---------+------------+\n| nombre          | periodo | nota_final |\n+-----------------+---------+------------+\n| Valeria Morales | 2024-1  | 9.5        |\n| Valeria Morales | 2024-1  | 9.2        |\n| Diego Fernández | 2024-1  | 8.7        |\n| Diego Fernández | 2024-1  | 8.9        |\n| Camila Gómez    | 2024-1  | 9.8        |\n| Javier Ramos    | 2024-1  | 8.0        |\n| Lucía Navarro   | 2024-1  | 9.0        |\n+-----------------+---------+------------+\n7 rows in set (0.002 sec)",
        "byteTip": "En SQL estándar, escribir JOIN a secas equivale exactamente a escribir INNER JOIN.",
        "pitfallTip": "Si olvidas la cláusula ON, SQLite generará un producto cartesiano (todas las combinaciones posibles), multiplicando las filas sin sentido.",
        "keyPoints": [
          "INNER JOIN solo devuelve filas con correspondencia exacta en ambos lados.",
          "Los registros huérfanos o sin coincidencia quedan automáticamente excluidos.",
          "La cláusula ON define el criterio de correspondencia entre la llave primaria y la foránea."
        ]
      },
      {
        "title": "Casos reales en aplicaciones móviles",
        "explanation": "En una aplicación Android de comercio electrónico, tienes una tabla `pedidos` y una tabla `usuarios`. Cuando la pantalla de la app necesita mostrar la lista de envíos pendientes, utilizas un `INNER JOIN`:\n• Te interesa ver el número de pedido, la fecha, y el nombre del cliente que pagó.\n• Los usuarios que solo visitaron la tienda pero nunca compraron nada no deben figurar en la lista de pedidos.",
        "codeSnippet": "-- Consultamos pedidos uniendo con el usuario que realizó la compra\nSELECT pedidos.id, usuarios.nombre, pedidos.total, pedidos.estado\nFROM pedidos\nINNER JOIN usuarios ON pedidos.cliente_id = usuarios.id;",
        "codeLanguage": "sql",
        "outputSnippet": "+------+---------------+--------+------------+\n| id   | nombre        | total  | estado     |\n+------+---------------+--------+------------+\n| 1001 | Ada Lovelace  | 139.89 | entregado  |\n| 1002 | Grace Hopper  | 429.50 | procesando |\n| 1003 | Alan Turing   | 89.99  | entregado  |\n| 1004 | Margaret H.   | 14.99  | enviado    |\n| 1005 | Linus Torvalds| 178.90 | pendiente  |\n+------+---------------+--------+------------+\n5 rows in set (0.002 sec)",
        "byteTip": "Asegúrate de tener un índice en la columna de la llave foránea (cliente_id); acelerará los INNER JOINs hasta 100 veces.",
        "pitfallTip": "No pongas filtros de contenido en el ON; usa ON para conectar las tablas y WHERE para filtrar filas.",
        "keyPoints": [
          "INNER JOIN es la base de los reportes transaccionales.",
          "Garantiza que ningún dato incompleto o sin cliente aparezca en pantalla.",
          "Se integra de forma nativa con los DAO (@Dao) de Room en Android."
        ]
      }
    ]
  },
  "sql-u09-l03": {
    "id": "sql-th-u09-l03",
    "lessonId": "sql-u09-l03",
    "pathId": "sql",
    "unitId": 9,
    "levelId": 3,
    "title": "3. Condiciones de unión con ON",
    "subtitle": "Comprende el rol vital de la cláusula ON y aprende a diferenciarla correctamente del filtro WHERE.",
    "estimatedMinutes": 8,
    "analogy": "Un contrato de emparejamiento: ON estipula la condición para que dos personas bailen juntas (\"mismo número de gafete\"). WHERE decide si la pareja califica para entrar a la pista de baile.",
    "video": {
      "title": "JOINs en SQL: INNER JOIN, LEFT JOIN y Múltiples Tablas",
      "channel": "Fazt Code",
      "duration": "58:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Unión de tablas relacionadas, condiciones ON, alias de tablas y lectura de matrículas."
    },
    "sections": [
      {
        "title": "La regla de emparejamiento: La cláusula ON",
        "explanation": "La cláusula **`ON`** le explica al motor de base de datos **cómo están vinculadas las dos tablas**. Casi siempre compara una llave primaria con una llave foránea:\n`ON tabla_origen.llave_primaria = tabla_destino.llave_foranea`\n\nEjemplo:\n`ON estudiantes.id = matriculas.estudiante_id`\n\nEl motor revisa cada fila de la tabla izquierda y busca en la derecha aquellas donde ambos números sean exactamente iguales. Si coinciden, fusiona los datos de ambas en una sola fila para el resultado.",
        "codeSnippet": "-- Emparejamiento explícito con ON entre estudiantes y matriculas\nSELECT estudiantes.nombre, matriculas.nota_final\nFROM estudiantes\nJOIN matriculas ON estudiantes.id = matriculas.estudiante_id\nWHERE matriculas.nota_final >= 9.0;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+------------+\n| nombre          | nota_final |\n+-----------------+------------+\n| Valeria Morales | 9.5        |\n| Valeria Morales | 9.2        |\n| Camila Gómez    | 9.8        |\n| Lucía Navarro   | 9.0        |\n+-----------------+------------+\n4 rows in set (0.002 sec)",
        "byteTip": "El motor evalúa ON durante el proceso de unión de tablas, y WHERE después de que las filas ya han sido unidas.",
        "pitfallTip": "No uses comas en lugar de ON (estilo SQL antiguo de 1989); la sintaxis explícita JOIN ... ON es mucho más segura y legible.",
        "keyPoints": [
          "ON define la condición de correspondencia entre tablas.",
          "Habitualmente compara la llave primaria de una entidad con la foránea de otra.",
          "Garantiza que los datos se asocien con estricta precisión matemática."
        ]
      },
      {
        "title": "Diferencia crucial: ¿Cuándo usar ON y cuándo WHERE?",
        "explanation": "Una de las dudas más frecuentes entre desarrolladores que inician en SQL es qué poner en el `ON` y qué poner en el `WHERE`:\n\n• **Usa `ON` para unir:** Aquí solo deben ir las condiciones que dictan **cómo se conectan las tablas** (`tablaA.id = tablaB.id_foraneo`).\n• **Usa `WHERE` para filtrar:** Aquí van las condiciones de negocio que deciden **qué registros resultantes te interesan** (`precio > 50`, `activo = true`, `nota_final >= 9.0`).\n\nMantener esta separación hace que tu código sea limpio, fácil de leer y muy fácil de mantener para cualquier miembro de tu equipo.",
        "codeSnippet": "-- Demostración clara: ON conecta las tablas, WHERE filtra los aprobados\nSELECT estudiantes.nombre, matriculas.asignatura_id, matriculas.nota_final\nFROM estudiantes\nJOIN matriculas ON estudiantes.id = matriculas.estudiante_id\nWHERE matriculas.nota_final >= 9.5;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+---------------+------------+\n| nombre          | asignatura_id | nota_final |\n+-----------------+---------------+------------+\n| Valeria Morales | 101           | 9.5        |\n| Camila Gómez    | 101           | 9.8        |\n+-----------------+---------------+------------+\n2 rows in set (0.001 sec)",
        "byteTip": "En consultas complejas con más de 100 líneas, separar nítidamente ON de WHERE previene bugs de lógica muy difíciles de rastrear.",
        "pitfallTip": "Poner condiciones de filtrado en el ON de un LEFT JOIN puede dar resultados inesperados al mantener filas con NULL.",
        "keyPoints": [
          "ON establece la relación entre tablas.",
          "WHERE restringe el resultado final según las reglas de negocio.",
          "Separar ambas cláusulas mejora la claridad y el rendimiento de las consultas."
        ]
      }
    ]
  },
  "sql-u09-l04": {
    "id": "sql-th-u09-l04",
    "lessonId": "sql-u09-l04",
    "pathId": "sql",
    "unitId": 9,
    "levelId": 4,
    "title": "4. Alias de tablas y columnas calificadas",
    "subtitle": "Aprende a calificar columnas y usar alias de tabla para escribir consultas elegantes, concisas y sin ambigüedades.",
    "estimatedMinutes": 8,
    "analogy": "Llamar a dos personas que se llaman \"Carlos\" en una reunión familiar: si solo dices \"¡Carlos!\", nadie sabe a quién te refieres. Dices \"Carlos Mendoza\" o \"Carlos Gómez\" (nombre calificado) o les pones apodos cortos como \"C1\" y \"C2\" (alias).",
    "video": {
      "title": "JOINs en SQL: INNER JOIN, LEFT JOIN y Múltiples Tablas",
      "channel": "Fazt Code",
      "duration": "58:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Unión de tablas relacionadas, condiciones ON, alias de tablas y lectura de matrículas."
    },
    "sections": [
      {
        "title": "Columnas calificadas: Evitando el error de ambigüedad",
        "explanation": "Cuando dos tablas tienen una columna con el mismo nombre (por ejemplo, ambas tienen una columna llamada `id` o una columna llamada `nombre`), el motor de base de datos no sabe a cuál te refieres si solo escribes:\n`SELECT nombre FROM estudiantes JOIN asignaturas ...`\n\nEl motor arrojará un error inmediato:\n`ERROR 1052: Column 'nombre' in field list is ambiguous`\n\nPara resolverlo, debes **calificar la columna**, escribiendo el nombre de la tabla seguido de un punto y el nombre de la columna:\n`estudiantes.nombre` frente a `asignaturas.nombre`.",
        "codeSnippet": "-- Calificamos cada columna con el nombre de su respectiva tabla\nSELECT estudiantes.id, estudiantes.nombre, asignaturas.nombre AS materia\nFROM estudiantes\nJOIN matriculas ON estudiantes.id = matriculas.estudiante_id\nJOIN asignaturas ON matriculas.asignatura_id = asignaturas.id\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+---------------------+\n| id | nombre          | materia             |\n+----+-----------------+---------------------+\n| 1  | Valeria Morales | Bases de Datos I    |\n| 1  | Valeria Morales | Programación Kotlin |\n| 2  | Diego Fernández | Bases de Datos I    |\n+----+-----------------+---------------------+\n3 rows in set (0.002 sec)",
        "byteTip": "Siempre califica las columnas en cualquier consulta que involucre más de una tabla; previene errores si en el futuro se agregan columnas con nombres iguales.",
        "pitfallTip": "Escribir SELECT id sin calificar en un JOIN es la causa número 1 de errores de ambigüedad en SQL.",
        "keyPoints": [
          "El error de ambigüedad ocurre cuando dos tablas comparten el mismo nombre de columna.",
          "Calificar consiste en usar el formato nombre_tabla.nombre_columna.",
          "Los alias con AS permiten además renombrar el encabezado final para mayor claridad."
        ]
      },
      {
        "title": "Alias de tabla: Código compacto y profesional",
        "explanation": "Escribir el nombre completo de las tablas una y otra vez (`estudiantes.nombre`, `asignaturas.departamento`) vuelve las consultas largas y pesadas.\n\nSQL te permite definir **alias de tabla** en la cláusula `FROM` y `JOIN`:\n`FROM estudiantes AS e`\n`JOIN matriculas AS m ON e.id = m.estudiante_id`\n`JOIN asignaturas AS a ON m.asignatura_id = a.id`\n\nA partir de ese momento, puedes usar las letras cortas `e`, `m` y `a` en cualquier lugar de la consulta (`SELECT`, `WHERE`, `ORDER BY`).",
        "codeSnippet": "-- Usamos alias cortos e, m y a para escribir una consulta limpia\nSELECT e.nombre AS estudiante, a.nombre AS asignatura, m.nota_final\nFROM estudiantes AS e\nJOIN matriculas AS m ON e.id = m.estudiante_id\nJOIN asignaturas AS a ON m.asignatura_id = a.id\nWHERE m.nota_final >= 9.0;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+---------------------+------------+\n| estudiante      | asignatura          | nota_final |\n+-----------------+---------------------+------------+\n| Valeria Morales | Bases de Datos I    | 9.5        |\n| Valeria Morales | Programación Kotlin | 9.2        |\n| Camila Gómez    | Bases de Datos I    | 9.8        |\n| Lucía Navarro   | Programación Kotlin | 9.0        |\n+-----------------+---------------------+------------+\n4 rows in set (0.002 sec)",
        "byteTip": "Elige alias intuitivos: la inicial de la tabla (u para usuarios, p para productos) hace que tu consulta se lea como prosa natural.",
        "pitfallTip": "Una vez que declaras un alias para una tabla, ya no puedes usar su nombre original en esa consulta; debes usar el alias.",
        "keyPoints": [
          "Los alias de tabla hacen las consultas mucho más cortas y legibles.",
          "Se declaran con o sin la palabra clave AS en la cláusula FROM / JOIN.",
          "Son una práctica estándar en el desarrollo profesional con Room y SQLite."
        ]
      }
    ]
  },
  "sql-u09-l05": {
    "id": "sql-th-u09-l05",
    "lessonId": "sql-u09-l05",
    "pathId": "sql",
    "unitId": 9,
    "levelId": 5,
    "title": "5. Consultas sobre tres tablas",
    "subtitle": "Aprende a encadenar múltiples JOINs para conectar tres o más tablas y resolver relaciones complejas de muchos a muchos.",
    "estimatedMinutes": 8,
    "analogy": "Un vuelo con escala: para viajar de Ciudad A a Ciudad C, primero tomas un vuelo de A a B (la escala intermedia), y luego de B a C. La tabla intermedia conecta los dos extremos.",
    "video": {
      "title": "JOINs en SQL: INNER JOIN, LEFT JOIN y Múltiples Tablas",
      "channel": "Fazt Code",
      "duration": "58:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Unión de tablas relacionadas, condiciones ON, alias de tablas y lectura de matrículas."
    },
    "sections": [
      {
        "title": "Encadenando uniones: El puente de muchos a muchos",
        "explanation": "Un estudiante puede cursar muchas asignaturas, y una asignatura tiene muchos estudiantes inscritos. Esta es una clásica relación **muchos a muchos (N:M)**.\n\nPara resolverla en SQL:\n1. Empezamos en la tabla `estudiantes`.\n2. Hacemos el primer `JOIN` hacia la tabla intermedia `matriculas`.\n3. Desde `matriculas`, hacemos un segundo `JOIN` hacia la tabla `asignaturas`.\n\nSintaxis en cadena:\n`SELECT ...`\n`FROM estudiantes AS e`\n`JOIN matriculas AS m ON e.id = m.estudiante_id`\n`JOIN asignaturas AS a ON m.asignatura_id = a.id;`",
        "codeSnippet": "-- Unimos tres tablas para obtener el expediente escolar completo\nSELECT e.nombre, a.nombre AS materia, a.creditos, m.nota_final\nFROM estudiantes AS e\nJOIN matriculas AS m ON e.id = m.estudiante_id\nJOIN asignaturas AS a ON m.asignatura_id = a.id\nORDER BY e.nombre, a.nombre;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+-----------------------+----------+------------+\n| nombre          | materia               | creditos | nota_final |\n+-----------------+-----------------------+----------+------------+\n| Camila Gómez    | Bases de Datos I      | 4        | 9.8        |\n| Diego Fernández | Bases de Datos I      | 4        | 8.7        |\n| Diego Fernández | Estructuras de Datos  | 5        | 8.9        |\n| Javier Ramos    | Cálculo Diferencial   | 4        | 8.0        |\n| Lucía Navarro   | Programación Kotlin   | 4        | 9.0        |\n| Valeria Morales | Bases de Datos I      | 4        | 9.5        |\n| Valeria Morales | Programación Kotlin   | 4        | 9.2        |\n+-----------------+-----------------------+----------+------------+\n7 rows in set (0.002 sec)",
        "byteTip": "No hay límite práctico para la cantidad de tablas que puedes unir en SQLite, pero unir más de 5 tablas suele requerir índices bien diseñados.",
        "pitfallTip": "Verifica siempre que cada JOIN tenga su propia cláusula ON correspondiente; si encadenas dos JOINs con un solo ON se producirá un error sintáctico.",
        "keyPoints": [
          "Las relaciones muchos a muchos se consultan uniendo 3 tablas.",
          "La tabla intermedia actúa como puente entre las dos entidades maestras.",
          "Cada sentencia JOIN requiere su propia cláusula ON."
        ]
      },
      {
        "title": "Filtrado y ordenamiento en consultas de tres tablas",
        "explanation": "Una vez que las tres tablas están unidas, tienes acceso a **todas sus columnas**. Puedes usar `WHERE` para filtrar por datos de cualquiera de las tres entidades y `ORDER BY` para organizar la salida:",
        "codeSnippet": "-- Filtramos por materias de Informática con nota excelente\nSELECT e.nombre AS alumno, a.nombre AS curso, m.nota_final\nFROM estudiantes AS e\nJOIN matriculas AS m ON e.id = m.estudiante_id\nJOIN asignaturas AS a ON m.asignatura_id = a.id\nWHERE a.departamento = 'Informática' AND m.nota_final >= 9.0\nORDER BY m.nota_final DESC;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+---------------------+------------+\n| alumno          | curso               | nota_final |\n+-----------------+---------------------+------------+\n| Camila Gómez    | Bases de Datos I    | 9.8        |\n| Valeria Morales | Bases de Datos I    | 9.5        |\n| Valeria Morales | Programación Kotlin | 9.2        |\n| Lucía Navarro   | Programación Kotlin | 9.0        |\n+-----------------+---------------------+------------+\n4 rows in set (0.002 sec)",
        "byteTip": "En Room para Android, esta consulta se ejecuta en un hilo de fondo (coroutine con Dispatchers.IO) para no congelar la interfaz gráfica de usuario.",
        "pitfallTip": "No abuses del ordenamiento ORDER BY sobre muchas tablas si la cantidad de filas es enorme y no tienes índices adecuados.",
        "keyPoints": [
          "Puedes filtrar en el WHERE usando columnas de cualquiera de las tablas unidas.",
          "El ORDER BY puede combinar campos de tablas distintas.",
          "Es el patrón estándar para generar historiales de usuario y reportes de compra."
        ]
      }
    ]
  },
  "sql-u09-l06": {
    "id": "sql-th-u09-l06",
    "lessonId": "sql-u09-l06",
    "pathId": "sql",
    "unitId": 9,
    "levelId": 6,
    "title": "6. LEFT JOIN y registros sin coincidencia",
    "subtitle": "Aprende a usar LEFT JOIN para conservar todos los registros de la tabla principal, incluso cuando no tengan coincidencias asociadas.",
    "estimatedMinutes": 8,
    "analogy": "La lista de asistencia del salón: pasas lista a todos los alumnos registrados. Los que entregaron tarea tienen su nota; los que no la entregaron aparecen en la lista con la casilla en blanco (NULL), ¡pero no desaparecen del salón!",
    "video": {
      "title": "JOINs en SQL: INNER JOIN, LEFT JOIN y Múltiples Tablas",
      "channel": "Fazt Code",
      "duration": "58:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Unión de tablas relacionadas, condiciones ON, alias de tablas y lectura de matrículas."
    },
    "sections": [
      {
        "title": "No perder datos: Sintaxis y comportamiento de LEFT JOIN",
        "explanation": "A veces el `INNER JOIN` es demasiado estricto. Si quieres una lista de **todos los clientes**, incluyendo aquellos que acaban de crear su cuenta y todavía no han hecho ninguna compra, un `INNER JOIN` los ocultaría por completo.\n\nPara solucionar esto existe el **`LEFT JOIN`** (o `LEFT OUTER JOIN`):\n• Devuelve **todas las filas de la tabla izquierda** (la tabla del `FROM`).\n• Si una fila tiene coincidencia en la tabla derecha, muestra los datos correspondientes.\n• Si **no tiene coincidencia**, no la descarta: rellena las columnas de la tabla derecha con el valor **`NULL`**.",
        "codeSnippet": "-- Consultamos todos los usuarios y sus pedidos; los que no tienen compras mostrarán NULL\nSELECT u.nombre, p.id AS pedido_id, p.total\nFROM usuarios AS u\nLEFT JOIN pedidos AS p ON u.id = p.cliente_id;",
        "codeLanguage": "sql",
        "outputSnippet": "+-------------------+-----------+--------+\n| nombre            | pedido_id | total  |\n+-------------------+-----------+--------+\n| Ada Lovelace      | 1001      | 139.89 |\n| Alan Turing       | 1003      | 89.99  |\n| Grace Hopper      | 1002      | 429.50 |\n| Linus Torvalds    | 1005      | 178.90 |\n| Margaret Hamilton | 1004      | 14.99  |\n+-------------------+-----------+--------+\n5 rows in set (0.002 sec)",
        "byteTip": "En SQLite, LEFT JOIN es la única unión externa disponible (no existe RIGHT JOIN ni FULL OUTER JOIN, pero cualquier RIGHT JOIN se puede escribir como un LEFT JOIN invirtiendo las tablas).",
        "pitfallTip": "Si después de un LEFT JOIN pones en el WHERE una condición como WHERE p.total > 100, convertirás accidentalmente tu consulta en un INNER JOIN porque descartarás los valores NULL.",
        "keyPoints": [
          "LEFT JOIN garantiza que ninguna fila de la tabla izquierda se pierda.",
          "Las filas sin correspondencia se rellenan con NULL en las columnas de la derecha.",
          "Es ideal para reportes de actividad, auditorías y catálogos completos."
        ]
      },
      {
        "title": "Detección de elementos sin actividad (WHERE derecha.id IS NULL)",
        "explanation": "Uno de los trucos más elegantes y utilizados en la industria es usar `LEFT JOIN` combinado con `WHERE derecha.id IS NULL` para encontrar elementos huérfanos o inactivos:\n• ¿Qué clientes nunca han comprado nada?\n• ¿Qué asignaturas no tienen ningún estudiante matriculado?\n• ¿Qué productos nunca se han vendido?",
        "codeSnippet": "-- Buscamos qué asignaturas no tienen ningún estudiante matriculado actualmente\nSELECT a.id, a.nombre, a.departamento\nFROM asignaturas AS a\nLEFT JOIN matriculas AS m ON a.id = m.asignatura_id\nWHERE m.id IS NULL;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+-----------------------+--------------------+\n| id  | nombre                | departamento       |\n+-----+-----------------------+--------------------+\n| 105 | Redes de Computadoras | Telecomunicaciones |\n+-----+-----------------------+--------------------+\n1 row in set (0.002 sec)",
        "byteTip": "Esta técnica de LEFT JOIN + IS NULL es extremadamente eficiente y reemplaza de forma elegante a las subconsultas NOT IN.",
        "pitfallTip": "Verifica siempre que la columna que comparas con IS NULL sea la llave primaria de la tabla derecha.",
        "keyPoints": [
          "LEFT JOIN + WHERE IS NULL detecta registros sin registros hijos.",
          "Permite limpiar catálogos, enviar correos a usuarios inactivos y detectar anomalías.",
          "Es una técnica obligatoria en el repertorio de cualquier desarrollador de software."
        ]
      }
    ]
  },
  "sql-u09-l07": {
    "id": "sql-th-u09-l07",
    "lessonId": "sql-u09-l07",
    "pathId": "sql",
    "unitId": 9,
    "levelId": 7,
    "title": "7. Errores frecuentes al unir tablas",
    "subtitle": "Conoce y evita los tropiezos más comunes al unir tablas en bases de datos relacionales.",
    "estimatedMinutes": 8,
    "analogy": "Unir cables por color: si conectas el cable azul con el verde, habrá un cortocircuito. En SQL, si unes tablas por la columna equivocada o sin condición, la base de datos produce resultados absurdos o catastróficos.",
    "video": {
      "title": "JOINs en SQL: INNER JOIN, LEFT JOIN y Múltiples Tablas",
      "channel": "Fazt Code",
      "duration": "58:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Unión de tablas relacionadas, condiciones ON, alias de tablas y lectura de matrículas."
    },
    "sections": [
      {
        "title": "El peligro del producto cartesiano y tipos incompatibles",
        "explanation": "Los tres errores más frecuentes al escribir JOINs son:\n\n1. **Olvidar la cláusula ON (Producto cartesiano):**\nSi unes dos tablas de 1,000 filas sin `ON`, la base de datos multiplicará cada fila de la primera por todas las filas de la segunda: ¡1,000 x 1,000 = 1,000,000 de filas! Esto puede saturar la memoria de tu dispositivo móvil y hacer que la aplicación se cierre por *Out Of Memory*.\n\n2. **Unir por las columnas equivocadas:**\nPor ejemplo, escribir `ON estudiantes.id = matriculas.asignatura_id` en lugar de `matriculas.estudiante_id`. El motor no sabe que te equivocaste; simplemente comparará números y devolverá datos disparatados.\n\n3. **Columna ambigua sin calificar:**\nIntentar seleccionar un campo que existe en ambas tablas sin poner el prefijo de la tabla (`SELECT id`).",
        "codeSnippet": "-- Ejemplo de unión correcta, tipada y con columnas calificadas\nSELECT m.id AS matricula_id, e.nombre AS estudiante, m.nota_final\nFROM matriculas AS m\nINNER JOIN estudiantes AS e ON m.estudiante_id = e.id\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------+-----------------+------------+\n| matricula_id | estudiante      | nota_final |\n+--------------+-----------------+------------+\n| 1            | Valeria Morales | 9.5        |\n| 2            | Valeria Morales | 9.2        |\n| 3            | Diego Fernández | 8.7        |\n+--------------+-----------------+------------+\n3 rows in set (0.001 sec)",
        "byteTip": "Usa siempre nombres de columnas foráneas descriptivos como estudiante_id o cliente_id; reduce drásticamente el riesgo de unirlas mal.",
        "pitfallTip": "Nunca escribas FROM tablaA, tablaB sin WHERE; es la forma arcaica que causa productos cartesianos accidentales.",
        "keyPoints": [
          "Unir tablas sin ON produce un producto cartesiano que satura la memoria.",
          "Verifica siempre que la llave foránea coincida semánticamente con la primaria correspondiente.",
          "La calificación de columnas previene errores de ambigüedad en tiempo de compilación."
        ]
      },
      {
        "title": "Verificación de relaciones y buenas prácticas en Room",
        "explanation": "En Android con Room, el compilador verifica tus consultas SQL en **tiempo de compilación**. Si escribes mal el nombre de una columna calificada o de una tabla en un `@Query`, el proyecto no compilará, avisándote del error de inmediato:",
        "codeSnippet": "-- Consulta definitiva de verificación para inspeccionar integridad de relaciones\nSELECT COUNT(*) AS total_matriculas_validas\nFROM matriculas AS m\nJOIN estudiantes AS e ON m.estudiante_id = e.id\nJOIN asignaturas AS a ON m.asignatura_id = a.id;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------------------+\n| total_matriculas_validas |\n+--------------------------+\n| 7                        |\n+--------------------------+\n1 row in set (0.001 sec)",
        "byteTip": "Room en Android compila tus consultas SQL a bytecode de SQLite, garantizando cero sorpresas en producción.",
        "pitfallTip": "No confíes ciegamente en datos cargados externamente; audita siempre las relaciones con consultas de verificación.",
        "keyPoints": [
          "Las consultas con múltiples JOINs deben verificarse con conteos de integridad.",
          "Room detecta errores de sintaxis en tus JOINs antes de que la app se ejecute en el teléfono.",
          "Dominar los JOINs te da control total sobre la arquitectura relacional de cualquier sistema."
        ]
      }
    ]
  }
};
