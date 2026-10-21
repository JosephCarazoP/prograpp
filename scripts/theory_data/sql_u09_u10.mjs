// Módulo de teoría enriquecida para SQL: Unidades 9 y 10
// Redactado en español latinoamericano (es-419) con tono claro, amigable y pedagógico
// Siguiendo los estándares oficiales de Android Developers (SQLite y Room)

export const SQL_THEORY_U09_U10 = {
  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 9: CONSULTAS ENTRE TABLAS (JOINS)
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u09-l01': {
    subtitle: 'Descubre por qué dividimos los datos en varias tablas y cómo los JOINs nos permiten reconstruir la información completa.',
    analogy: 'Un rompecabezas donde cada tabla es una pieza: en una tienes los datos del estudiante y en otra sus notas. Con un JOIN unes las piezas exactas usando la llave que encaja.',
    sections: [
      {
        title: '¿Por qué unir tablas? La magia del modelo relacional',
        explanation: `Imagina que tienes una aplicación escolar. Si guardaras en una sola tabla el nombre del estudiante, su carrera, el nombre de la materia que cursa, el profesor y su nota, ocurriría un desastre:
• Si un estudiante lleva 5 materias, tendrías que repetir su nombre y correo 5 veces.
• Si el estudiante cambia su número de teléfono, tendrías que actualizar 5 filas. Si olvidas una, la base de datos quedará con datos contradictorios.

Para evitar esto, el **modelo relacional** divide la información en tablas especializadas:
1. \`estudiantes\`: guarda únicamente datos personales (id, nombre, carrera).
2. \`asignaturas\`: guarda información de las materias (id, nombre, créditos).
3. \`matriculas\`: actúa como puente, vinculando qué estudiante está inscrito en qué asignatura mediante llaves foráneas (\`estudiante_id\`, \`asignatura_id\`).

La instrucción **\`JOIN\`** es la herramienta que te permite **reconstruir la información** al momento de consultarla, combinando filas de dos o más tablas según una columna común.`,
        codeSnippet: `-- Visualizamos las tres tablas separadas que luego uniremos\nSELECT id, nombre, carrera FROM estudiantes LIMIT 2;\nSELECT id, nombre, creditos FROM asignaturas LIMIT 2;\nSELECT id, estudiante_id, asignatura_id, nota_final FROM matriculas LIMIT 2;`,
        outputSnippet: `+----+-----------------+-----------------------+\n| id | nombre          | carrera               |\n+----+-----------------+-----------------------+\n| 1  | Valeria Morales | Ingeniería de Software|\n| 2  | Diego Fernández | Ciencias Computación  |\n+----+-----------------+-----------------------+\n2 rows in set (0.001 sec)`,
        byteTip: 'En SQLite y Android con Room, separar entidades y unirlas con relaciones mantiene la base de datos pequeña, rápida y libre de datos duplicados.',
        pitfallTip: 'No intentes guardar listas de IDs separadas por comas dentro de una sola celda de texto; eso rompe las reglas del diseño relacional.',
        keyPoints: [
          'Dividir datos en tablas normalizadas evita duplicaciones y errores de consistencia.',
          'Las llaves foráneas conectan los registros entre tablas.',
          'JOIN es la operación encargada de fusionar los datos relacionados en un solo reporte visual.'
        ]
      },
      {
        title: 'De la llave foránea al reporte unificado',
        explanation: `Cuando consultas una base de datos relacional, el usuario final no quiere ver números crudos de identificación como \`estudiante_id = 1\` y \`asignatura_id = 101\`. Quiere ver:
*"Valeria Morales está cursando Bases de Datos I con una nota de 9.5"*.

El proceso de unión funciona así:
1. El motor de base de datos lee la fila de la tabla izquierda.
2. Busca en la tabla derecha los registros que tengan el mismo valor en la columna de enlace (la llave foránea).
3. Junta las columnas de ambas tablas en una fila combinada dentro del resultado.`,
        codeSnippet: `-- Consulta conceptual: vemos cómo se asocian estudiantes con sus notas\nSELECT matriculas.id, estudiantes.nombre, matriculas.nota_final\nFROM matriculas\nJOIN estudiantes ON matriculas.estudiante_id = estudiantes.id;`,
        outputSnippet: `+----+-----------------+------------+\n| id | nombre          | nota_final |\n+----+-----------------+------------+\n| 1  | Valeria Morales | 9.5        |\n| 2  | Valeria Morales | 9.2        |\n| 3  | Diego Fernández | 8.7        |\n| 4  | Diego Fernández | 8.9        |\n+----+-----------------+------------+\n4 rows in set (0.002 sec)`,
        byteTip: 'En Room para Android, puedes representar un JOIN fácilmente creando una data class con la anotación @Relation o @Embedded.',
        pitfallTip: 'Un JOIN no altera físicamente las tablas en el disco; solo produce una vista combinada en memoria para tu consulta.',
        keyPoints: [
          'JOIN convierte códigos y números de referencia en información legible para personas.',
          'Permite responder preguntas de negocio complejas sin redundancia de almacenamiento.',
          'Es el pilar fundamental que da nombre a las bases de datos "relacionales".'
        ]
      }
    ]
  },

  'sql-u09-l02': {
    subtitle: 'Domina la unión más común en SQL: combina únicamente las filas que tienen coincidencia en ambas tablas.',
    analogy: 'Un apretón de manos: para que ocurra, se necesitan dos personas. Si un estudiante no tiene matrícula registrada, o una matrícula no tiene estudiante válido, no hay coincidencia y no aparece en la foto.',
    sections: [
      {
        title: 'La intersección exacta: Sintaxis de INNER JOIN',
        explanation: `El **\`INNER JOIN\`** (o simplemente \`JOIN\`) es el tipo de unión predeterminado y más utilizado en SQL. Devuelve **únicamente las filas que tienen coincidencia** en ambas tablas.

Estructura básica:
\`SELECT tabla1.columna, tabla2.columna\`
\`FROM tabla1\`
\`INNER JOIN tabla2 ON tabla1.columna_llave = tabla2.columna_foranea;\`

¿Qué ocurre con los registros sin pareja?
• Si hay un estudiante que aún no se ha matriculado en ninguna materia, **no aparecerá** en el resultado.
• Si hay una materia nueva en la que nadie se ha inscrito todavía, tampoco aparecerá.
• Solo se muestran los registros donde la condición del \`ON\` se cumple con éxito.`,
        codeSnippet: `-- Unimos estudiantes y matriculas para ver las notas de quienes sí están cursando\nSELECT estudiantes.nombre, matriculas.periodo, matriculas.nota_final\nFROM estudiantes\nINNER JOIN matriculas ON estudiantes.id = matriculas.estudiante_id;`,
        outputSnippet: `+-----------------+---------+------------+\n| nombre          | periodo | nota_final |\n+-----------------+---------+------------+\n| Valeria Morales | 2024-1  | 9.5        |\n| Valeria Morales | 2024-1  | 9.2        |\n| Diego Fernández | 2024-1  | 8.7        |\n| Diego Fernández | 2024-1  | 8.9        |\n| Camila Gómez    | 2024-1  | 9.8        |\n| Javier Ramos    | 2024-1  | 8.0        |\n| Lucía Navarro   | 2024-1  | 9.0        |\n+-----------------+---------+------------+\n7 rows in set (0.002 sec)`,
        byteTip: 'En SQL estándar, escribir JOIN a secas equivale exactamente a escribir INNER JOIN.',
        pitfallTip: 'Si olvidas la cláusula ON, SQLite generará un producto cartesiano (todas las combinaciones posibles), multiplicando las filas sin sentido.',
        keyPoints: [
          'INNER JOIN solo devuelve filas con correspondencia exacta en ambos lados.',
          'Los registros huérfanos o sin coincidencia quedan automáticamente excluidos.',
          'La cláusula ON define el criterio de correspondencia entre la llave primaria y la foránea.'
        ]
      },
      {
        title: 'Casos reales en aplicaciones móviles',
        explanation: `En una aplicación Android de comercio electrónico, tienes una tabla \`pedidos\` y una tabla \`usuarios\`. Cuando la pantalla de la app necesita mostrar la lista de envíos pendientes, utilizas un \`INNER JOIN\`:
• Te interesa ver el número de pedido, la fecha, y el nombre del cliente que pagó.
• Los usuarios que solo visitaron la tienda pero nunca compraron nada no deben figurar en la lista de pedidos.`,
        codeSnippet: `-- Consultamos pedidos uniendo con el usuario que realizó la compra\nSELECT pedidos.id, usuarios.nombre, pedidos.total, pedidos.estado\nFROM pedidos\nINNER JOIN usuarios ON pedidos.cliente_id = usuarios.id;`,
        outputSnippet: `+------+---------------+--------+------------+\n| id   | nombre        | total  | estado     |\n+------+---------------+--------+------------+\n| 1001 | Ada Lovelace  | 139.89 | entregado  |\n| 1002 | Grace Hopper  | 429.50 | procesando |\n| 1003 | Alan Turing   | 89.99  | entregado  |\n| 1004 | Margaret H.   | 14.99  | enviado    |\n| 1005 | Linus Torvalds| 178.90 | pendiente  |\n+------+---------------+--------+------------+\n5 rows in set (0.002 sec)`,
        byteTip: 'Asegúrate de tener un índice en la columna de la llave foránea (cliente_id); acelerará los INNER JOINs hasta 100 veces.',
        pitfallTip: 'No pongas filtros de contenido en el ON; usa ON para conectar las tablas y WHERE para filtrar filas.',
        keyPoints: [
          'INNER JOIN es la base de los reportes transaccionales.',
          'Garantiza que ningún dato incompleto o sin cliente aparezca en pantalla.',
          'Se integra de forma nativa con los DAO (@Dao) de Room en Android.'
        ]
      }
    ]
  },

  'sql-u09-l03': {
    subtitle: 'Comprende el rol vital de la cláusula ON y aprende a diferenciarla correctamente del filtro WHERE.',
    analogy: 'Un contrato de emparejamiento: ON estipula la condición para que dos personas bailen juntas ("mismo número de gafete"). WHERE decide si la pareja califica para entrar a la pista de baile.',
    sections: [
      {
        title: 'La regla de emparejamiento: La cláusula ON',
        explanation: `La cláusula **\`ON\`** le explica al motor de base de datos **cómo están vinculadas las dos tablas**. Casi siempre compara una llave primaria con una llave foránea:
\`ON tabla_origen.llave_primaria = tabla_destino.llave_foranea\`

Ejemplo:
\`ON estudiantes.id = matriculas.estudiante_id\`

El motor revisa cada fila de la tabla izquierda y busca en la derecha aquellas donde ambos números sean exactamente iguales. Si coinciden, fusiona los datos de ambas en una sola fila para el resultado.`,
        codeSnippet: `-- Emparejamiento explícito con ON entre estudiantes y matriculas\nSELECT estudiantes.nombre, matriculas.nota_final\nFROM estudiantes\nJOIN matriculas ON estudiantes.id = matriculas.estudiante_id\nWHERE matriculas.nota_final >= 9.0;`,
        outputSnippet: `+-----------------+------------+\n| nombre          | nota_final |\n+-----------------+------------+\n| Valeria Morales | 9.5        |\n| Valeria Morales | 9.2        |\n| Camila Gómez    | 9.8        |\n| Lucía Navarro   | 9.0        |\n+-----------------+------------+\n4 rows in set (0.002 sec)`,
        byteTip: 'El motor evalúa ON durante el proceso de unión de tablas, y WHERE después de que las filas ya han sido unidas.',
        pitfallTip: 'No uses comas en lugar de ON (estilo SQL antiguo de 1989); la sintaxis explícita JOIN ... ON es mucho más segura y legible.',
        keyPoints: [
          'ON define la condición de correspondencia entre tablas.',
          'Habitualmente compara la llave primaria de una entidad con la foránea de otra.',
          'Garantiza que los datos se asocien con estricta precisión matemática.'
        ]
      },
      {
        title: 'Diferencia crucial: ¿Cuándo usar ON y cuándo WHERE?',
        explanation: `Una de las dudas más frecuentes entre desarrolladores que inician en SQL es qué poner en el \`ON\` y qué poner en el \`WHERE\`:

• **Usa \`ON\` para unir:** Aquí solo deben ir las condiciones que dictan **cómo se conectan las tablas** (\`tablaA.id = tablaB.id_foraneo\`).
• **Usa \`WHERE\` para filtrar:** Aquí van las condiciones de negocio que deciden **qué registros resultantes te interesan** (\`precio > 50\`, \`activo = true\`, \`nota_final >= 9.0\`).

Mantener esta separación hace que tu código sea limpio, fácil de leer y muy fácil de mantener para cualquier miembro de tu equipo.`,
        codeSnippet: `-- Demostración clara: ON conecta las tablas, WHERE filtra los aprobados\nSELECT estudiantes.nombre, matriculas.asignatura_id, matriculas.nota_final\nFROM estudiantes\nJOIN matriculas ON estudiantes.id = matriculas.estudiante_id\nWHERE matriculas.nota_final >= 9.5;`,
        outputSnippet: `+-----------------+---------------+------------+\n| nombre          | asignatura_id | nota_final |\n+-----------------+---------------+------------+\n| Valeria Morales | 101           | 9.5        |\n| Camila Gómez    | 101           | 9.8        |\n+-----------------+---------------+------------+\n2 rows in set (0.001 sec)`,
        byteTip: 'En consultas complejas con más de 100 líneas, separar nítidamente ON de WHERE previene bugs de lógica muy difíciles de rastrear.',
        pitfallTip: 'Poner condiciones de filtrado en el ON de un LEFT JOIN puede dar resultados inesperados al mantener filas con NULL.',
        keyPoints: [
          'ON establece la relación entre tablas.',
          'WHERE restringe el resultado final según las reglas de negocio.',
          'Separar ambas cláusulas mejora la claridad y el rendimiento de las consultas.'
        ]
      }
    ]
  },

  'sql-u09-l04': {
    subtitle: 'Aprende a calificar columnas y usar alias de tabla para escribir consultas elegantes, concisas y sin ambigüedades.',
    analogy: 'Llamar a dos personas que se llaman "Carlos" en una reunión familiar: si solo dices "¡Carlos!", nadie sabe a quién te refieres. Dices "Carlos Mendoza" o "Carlos Gómez" (nombre calificado) o les pones apodos cortos como "C1" y "C2" (alias).',
    sections: [
      {
        title: 'Columnas calificadas: Evitando el error de ambigüedad',
        explanation: `Cuando dos tablas tienen una columna con el mismo nombre (por ejemplo, ambas tienen una columna llamada \`id\` o una columna llamada \`nombre\`), el motor de base de datos no sabe a cuál te refieres si solo escribes:
\`SELECT nombre FROM estudiantes JOIN asignaturas ...\`

El motor arrojará un error inmediato:
\`ERROR 1052: Column 'nombre' in field list is ambiguous\`

Para resolverlo, debes **calificar la columna**, escribiendo el nombre de la tabla seguido de un punto y el nombre de la columna:
\`estudiantes.nombre\` frente a \`asignaturas.nombre\`.`,
        codeSnippet: `-- Calificamos cada columna con el nombre de su respectiva tabla\nSELECT estudiantes.id, estudiantes.nombre, asignaturas.nombre AS materia\nFROM estudiantes\nJOIN matriculas ON estudiantes.id = matriculas.estudiante_id\nJOIN asignaturas ON matriculas.asignatura_id = asignaturas.id\nLIMIT 3;`,
        outputSnippet: `+----+-----------------+---------------------+\n| id | nombre          | materia             |\n+----+-----------------+---------------------+\n| 1  | Valeria Morales | Bases de Datos I    |\n| 1  | Valeria Morales | Programación Kotlin |\n| 2  | Diego Fernández | Bases de Datos I    |\n+----+-----------------+---------------------+\n3 rows in set (0.002 sec)`,
        byteTip: 'Siempre califica las columnas en cualquier consulta que involucre más de una tabla; previene errores si en el futuro se agregan columnas con nombres iguales.',
        pitfallTip: 'Escribir SELECT id sin calificar en un JOIN es la causa número 1 de errores de ambigüedad en SQL.',
        keyPoints: [
          'El error de ambigüedad ocurre cuando dos tablas comparten el mismo nombre de columna.',
          'Calificar consiste en usar el formato nombre_tabla.nombre_columna.',
          'Los alias con AS permiten además renombrar el encabezado final para mayor claridad.'
        ]
      },
      {
        title: 'Alias de tabla: Código compacto y profesional',
        explanation: `Escribir el nombre completo de las tablas una y otra vez (\`estudiantes.nombre\`, \`asignaturas.departamento\`) vuelve las consultas largas y pesadas.

SQL te permite definir **alias de tabla** en la cláusula \`FROM\` y \`JOIN\`:
\`FROM estudiantes AS e\`
\`JOIN matriculas AS m ON e.id = m.estudiante_id\`
\`JOIN asignaturas AS a ON m.asignatura_id = a.id\`

A partir de ese momento, puedes usar las letras cortas \`e\`, \`m\` y \`a\` en cualquier lugar de la consulta (\`SELECT\`, \`WHERE\`, \`ORDER BY\`).`,
        codeSnippet: `-- Usamos alias cortos e, m y a para escribir una consulta limpia\nSELECT e.nombre AS estudiante, a.nombre AS asignatura, m.nota_final\nFROM estudiantes AS e\nJOIN matriculas AS m ON e.id = m.estudiante_id\nJOIN asignaturas AS a ON m.asignatura_id = a.id\nWHERE m.nota_final >= 9.0;`,
        outputSnippet: `+-----------------+---------------------+------------+\n| estudiante      | asignatura          | nota_final |\n+-----------------+---------------------+------------+\n| Valeria Morales | Bases de Datos I    | 9.5        |\n| Valeria Morales | Programación Kotlin | 9.2        |\n| Camila Gómez    | Bases de Datos I    | 9.8        |\n| Lucía Navarro   | Programación Kotlin | 9.0        |\n+-----------------+---------------------+------------+\n4 rows in set (0.002 sec)`,
        byteTip: 'Elige alias intuitivos: la inicial de la tabla (u para usuarios, p para productos) hace que tu consulta se lea como prosa natural.',
        pitfallTip: 'Una vez que declaras un alias para una tabla, ya no puedes usar su nombre original en esa consulta; debes usar el alias.',
        keyPoints: [
          'Los alias de tabla hacen las consultas mucho más cortas y legibles.',
          'Se declaran con o sin la palabra clave AS en la cláusula FROM / JOIN.',
          'Son una práctica estándar en el desarrollo profesional con Room y SQLite.'
        ]
      }
    ]
  },

  'sql-u09-l05': {
    subtitle: 'Aprende a encadenar múltiples JOINs para conectar tres o más tablas y resolver relaciones complejas de muchos a muchos.',
    analogy: 'Un vuelo con escala: para viajar de Ciudad A a Ciudad C, primero tomas un vuelo de A a B (la escala intermedia), y luego de B a C. La tabla intermedia conecta los dos extremos.',
    sections: [
      {
        title: 'Encadenando uniones: El puente de muchos a muchos',
        explanation: `Un estudiante puede cursar muchas asignaturas, y una asignatura tiene muchos estudiantes inscritos. Esta es una clásica relación **muchos a muchos (N:M)**.

Para resolverla en SQL:
1. Empezamos en la tabla \`estudiantes\`.
2. Hacemos el primer \`JOIN\` hacia la tabla intermedia \`matriculas\`.
3. Desde \`matriculas\`, hacemos un segundo \`JOIN\` hacia la tabla \`asignaturas\`.

Sintaxis en cadena:
\`SELECT ...\`
\`FROM estudiantes AS e\`
\`JOIN matriculas AS m ON e.id = m.estudiante_id\`
\`JOIN asignaturas AS a ON m.asignatura_id = a.id;\``,
        codeSnippet: `-- Unimos tres tablas para obtener el expediente escolar completo\nSELECT e.nombre, a.nombre AS materia, a.creditos, m.nota_final\nFROM estudiantes AS e\nJOIN matriculas AS m ON e.id = m.estudiante_id\nJOIN asignaturas AS a ON m.asignatura_id = a.id\nORDER BY e.nombre, a.nombre;`,
        outputSnippet: `+-----------------+-----------------------+----------+------------+\n| nombre          | materia               | creditos | nota_final |\n+-----------------+-----------------------+----------+------------+\n| Camila Gómez    | Bases de Datos I      | 4        | 9.8        |\n| Diego Fernández | Bases de Datos I      | 4        | 8.7        |\n| Diego Fernández | Estructuras de Datos  | 5        | 8.9        |\n| Javier Ramos    | Cálculo Diferencial   | 4        | 8.0        |\n| Lucía Navarro   | Programación Kotlin   | 4        | 9.0        |\n| Valeria Morales | Bases de Datos I      | 4        | 9.5        |\n| Valeria Morales | Programación Kotlin   | 4        | 9.2        |\n+-----------------+-----------------------+----------+------------+\n7 rows in set (0.002 sec)`,
        byteTip: 'No hay límite práctico para la cantidad de tablas que puedes unir en SQLite, pero unir más de 5 tablas suele requerir índices bien diseñados.',
        pitfallTip: 'Verifica siempre que cada JOIN tenga su propia cláusula ON correspondiente; si encadenas dos JOINs con un solo ON se producirá un error sintáctico.',
        keyPoints: [
          'Las relaciones muchos a muchos se consultan uniendo 3 tablas.',
          'La tabla intermedia actúa como puente entre las dos entidades maestras.',
          'Cada sentencia JOIN requiere su propia cláusula ON.'
        ]
      },
      {
        title: 'Filtrado y ordenamiento en consultas de tres tablas',
        explanation: `Una vez que las tres tablas están unidas, tienes acceso a **todas sus columnas**. Puedes usar \`WHERE\` para filtrar por datos de cualquiera de las tres entidades y \`ORDER BY\` para organizar la salida:`,
        codeSnippet: `-- Filtramos por materias de Informática con nota excelente\nSELECT e.nombre AS alumno, a.nombre AS curso, m.nota_final\nFROM estudiantes AS e\nJOIN matriculas AS m ON e.id = m.estudiante_id\nJOIN asignaturas AS a ON m.asignatura_id = a.id\nWHERE a.departamento = 'Informática' AND m.nota_final >= 9.0\nORDER BY m.nota_final DESC;`,
        outputSnippet: `+-----------------+---------------------+------------+\n| alumno          | curso               | nota_final |\n+-----------------+---------------------+------------+\n| Camila Gómez    | Bases de Datos I    | 9.8        |\n| Valeria Morales | Bases de Datos I    | 9.5        |\n| Valeria Morales | Programación Kotlin | 9.2        |\n| Lucía Navarro   | Programación Kotlin | 9.0        |\n+-----------------+---------------------+------------+\n4 rows in set (0.002 sec)`,
        byteTip: 'En Room para Android, esta consulta se ejecuta en un hilo de fondo (coroutine con Dispatchers.IO) para no congelar la interfaz gráfica de usuario.',
        pitfallTip: 'No abuses del ordenamiento ORDER BY sobre muchas tablas si la cantidad de filas es enorme y no tienes índices adecuados.',
        keyPoints: [
          'Puedes filtrar en el WHERE usando columnas de cualquiera de las tablas unidas.',
          'El ORDER BY puede combinar campos de tablas distintas.',
          'Es el patrón estándar para generar historiales de usuario y reportes de compra.'
        ]
      }
    ]
  },

  'sql-u09-l06': {
    subtitle: 'Aprende a usar LEFT JOIN para conservar todos los registros de la tabla principal, incluso cuando no tengan coincidencias asociadas.',
    analogy: 'La lista de asistencia del salón: pasas lista a todos los alumnos registrados. Los que entregaron tarea tienen su nota; los que no la entregaron aparecen en la lista con la casilla en blanco (NULL), ¡pero no desaparecen del salón!',
    sections: [
      {
        title: 'No perder datos: Sintaxis y comportamiento de LEFT JOIN',
        explanation: `A veces el \`INNER JOIN\` es demasiado estricto. Si quieres una lista de **todos los clientes**, incluyendo aquellos que acaban de crear su cuenta y todavía no han hecho ninguna compra, un \`INNER JOIN\` los ocultaría por completo.

Para solucionar esto existe el **\`LEFT JOIN\`** (o \`LEFT OUTER JOIN\`):
• Devuelve **todas las filas de la tabla izquierda** (la tabla del \`FROM\`).
• Si una fila tiene coincidencia en la tabla derecha, muestra los datos correspondientes.
• Si **no tiene coincidencia**, no la descarta: rellena las columnas de la tabla derecha con el valor **\`NULL\`**.`,
        codeSnippet: `-- Consultamos todos los usuarios y sus pedidos; los que no tienen compras mostrarán NULL\nSELECT u.nombre, p.id AS pedido_id, p.total\nFROM usuarios AS u\nLEFT JOIN pedidos AS p ON u.id = p.cliente_id;`,
        outputSnippet: `+-------------------+-----------+--------+\n| nombre            | pedido_id | total  |\n+-------------------+-----------+--------+\n| Ada Lovelace      | 1001      | 139.89 |\n| Alan Turing       | 1003      | 89.99  |\n| Grace Hopper      | 1002      | 429.50 |\n| Linus Torvalds    | 1005      | 178.90 |\n| Margaret Hamilton | 1004      | 14.99  |\n+-------------------+-----------+--------+\n5 rows in set (0.002 sec)`,
        byteTip: 'En SQLite, LEFT JOIN es la única unión externa disponible (no existe RIGHT JOIN ni FULL OUTER JOIN, pero cualquier RIGHT JOIN se puede escribir como un LEFT JOIN invirtiendo las tablas).',
        pitfallTip: 'Si después de un LEFT JOIN pones en el WHERE una condición como WHERE p.total > 100, convertirás accidentalmente tu consulta en un INNER JOIN porque descartarás los valores NULL.',
        keyPoints: [
          'LEFT JOIN garantiza que ninguna fila de la tabla izquierda se pierda.',
          'Las filas sin correspondencia se rellenan con NULL en las columnas de la derecha.',
          'Es ideal para reportes de actividad, auditorías y catálogos completos.'
        ]
      },
      {
        title: 'Detección de elementos sin actividad (WHERE derecha.id IS NULL)',
        explanation: `Uno de los trucos más elegantes y utilizados en la industria es usar \`LEFT JOIN\` combinado con \`WHERE derecha.id IS NULL\` para encontrar elementos huérfanos o inactivos:
• ¿Qué clientes nunca han comprado nada?
• ¿Qué asignaturas no tienen ningún estudiante matriculado?
• ¿Qué productos nunca se han vendido?`,
        codeSnippet: `-- Buscamos qué asignaturas no tienen ningún estudiante matriculado actualmente\nSELECT a.id, a.nombre, a.departamento\nFROM asignaturas AS a\nLEFT JOIN matriculas AS m ON a.id = m.asignatura_id\nWHERE m.id IS NULL;`,
        outputSnippet: `+-----+-----------------------+--------------------+\n| id  | nombre                | departamento       |\n+-----+-----------------------+--------------------+\n| 105 | Redes de Computadoras | Telecomunicaciones |\n+-----+-----------------------+--------------------+\n1 row in set (0.002 sec)`,
        byteTip: 'Esta técnica de LEFT JOIN + IS NULL es extremadamente eficiente y reemplaza de forma elegante a las subconsultas NOT IN.',
        pitfallTip: 'Verifica siempre que la columna que comparas con IS NULL sea la llave primaria de la tabla derecha.',
        keyPoints: [
          'LEFT JOIN + WHERE IS NULL detecta registros sin registros hijos.',
          'Permite limpiar catálogos, enviar correos a usuarios inactivos y detectar anomalías.',
          'Es una técnica obligatoria en el repertorio de cualquier desarrollador de software.'
        ]
      }
    ]
  },

  'sql-u09-l07': {
    subtitle: 'Conoce y evita los tropiezos más comunes al unir tablas en bases de datos relacionales.',
    analogy: 'Unir cables por color: si conectas el cable azul con el verde, habrá un cortocircuito. En SQL, si unes tablas por la columna equivocada o sin condición, la base de datos produce resultados absurdos o catastróficos.',
    sections: [
      {
        title: 'El peligro del producto cartesiano y tipos incompatibles',
        explanation: `Los tres errores más frecuentes al escribir JOINs son:

1. **Olvidar la cláusula ON (Producto cartesiano):**
Si unes dos tablas de 1,000 filas sin \`ON\`, la base de datos multiplicará cada fila de la primera por todas las filas de la segunda: ¡1,000 x 1,000 = 1,000,000 de filas! Esto puede saturar la memoria de tu dispositivo móvil y hacer que la aplicación se cierre por *Out Of Memory*.

2. **Unir por las columnas equivocadas:**
Por ejemplo, escribir \`ON estudiantes.id = matriculas.asignatura_id\` en lugar de \`matriculas.estudiante_id\`. El motor no sabe que te equivocaste; simplemente comparará números y devolverá datos disparatados.

3. **Columna ambigua sin calificar:**
Intentar seleccionar un campo que existe en ambas tablas sin poner el prefijo de la tabla (\`SELECT id\`).`,
        codeSnippet: `-- Ejemplo de unión correcta, tipada y con columnas calificadas\nSELECT m.id AS matricula_id, e.nombre AS estudiante, m.nota_final\nFROM matriculas AS m\nINNER JOIN estudiantes AS e ON m.estudiante_id = e.id\nLIMIT 3;`,
        outputSnippet: `+--------------+-----------------+------------+\n| matricula_id | estudiante      | nota_final |\n+--------------+-----------------+------------+\n| 1            | Valeria Morales | 9.5        |\n| 2            | Valeria Morales | 9.2        |\n| 3            | Diego Fernández | 8.7        |\n+--------------+-----------------+------------+\n3 rows in set (0.001 sec)`,
        byteTip: 'Usa siempre nombres de columnas foráneas descriptivos como estudiante_id o cliente_id; reduce drásticamente el riesgo de unirlas mal.',
        pitfallTip: 'Nunca escribas FROM tablaA, tablaB sin WHERE; es la forma arcaica que causa productos cartesianos accidentales.',
        keyPoints: [
          'Unir tablas sin ON produce un producto cartesiano que satura la memoria.',
          'Verifica siempre que la llave foránea coincida semánticamente con la primaria correspondiente.',
          'La calificación de columnas previene errores de ambigüedad en tiempo de compilación.'
        ]
      },
      {
        title: 'Verificación de relaciones y buenas prácticas en Room',
        explanation: `En Android con Room, el compilador verifica tus consultas SQL en **tiempo de compilación**. Si escribes mal el nombre de una columna calificada o de una tabla en un \`@Query\`, el proyecto no compilará, avisándote del error de inmediato:`,
        codeSnippet: `-- Consulta definitiva de verificación para inspeccionar integridad de relaciones\nSELECT COUNT(*) AS total_matriculas_validas\nFROM matriculas AS m\nJOIN estudiantes AS e ON m.estudiante_id = e.id\nJOIN asignaturas AS a ON m.asignatura_id = a.id;`,
        outputSnippet: `+--------------------------+\n| total_matriculas_validas |\n+--------------------------+\n| 7                        |\n+--------------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'Room en Android compila tus consultas SQL a bytecode de SQLite, garantizando cero sorpresas en producción.',
        pitfallTip: 'No confíes ciegamente en datos cargados externamente; audita siempre las relaciones con consultas de verificación.',
        keyPoints: [
          'Las consultas con múltiples JOINs deben verificarse con conteos de integridad.',
          'Room detecta errores de sintaxis en tus JOINs antes de que la app se ejecute en el teléfono.',
          'Dominar los JOINs te da control total sobre la arquitectura relacional de cualquier sistema.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 10: AGREGACIONES Y AGRUPACIONES
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u10-l01': {
    subtitle: 'Aprende a resumir miles de filas en una sola métrica utilizando las cinco funciones agregadas esenciales de SQL.',
    analogy: 'La calculadora de una caja registradora al final del día: en lugar de revisar los 500 recibos en papel uno por uno, la máquina te dice la suma total recaudada, el promedio por cliente, el boleto más caro y el más barato.',
    sections: [
      {
        title: 'Las 5 funciones agregadas esenciales',
        explanation: `Las funciones agregadas toman múltiples valores de una columna y calculan **un único valor representativo de resumen**:

1. **\`COUNT(columna)\`**: Cuenta cuántos registros o valores existen.
2. **\`SUM(columna)\`**: Suma todos los valores numéricos de la columna.
3. **\`AVG(columna)\`**: Calcula la media aritmética o promedio (\`SUM / COUNT\`).
4. **\`MIN(columna)\`**: Encuentra el valor mínimo o más bajo.
5. **\`MAX(columna)\`**: Encuentra el valor máximo o más alto.

Todas se colocan dentro de la lista de proyección del \`SELECT\` y es buena práctica asignarles un alias con \`AS\` para que el resultado sea fácil de interpretar.`,
        codeSnippet: `-- Resumen estadístico de los salarios de la empresa en una sola consulta\nSELECT \n  COUNT(*) AS total_empleados,\n  MIN(salario) AS salario_minimo,\n  MAX(salario) AS salario_maximo,\n  ROUND(AVG(salario), 2) AS salario_promedio,\n  SUM(salario) AS presupuesto_total_nominas\nFROM empleados;`,
        outputSnippet: `+-----------------+----------------+----------------+------------------+---------------------------+\n| total_empleados | salario_minimo | salario_maximo | salario_promedio | presupuesto_total_nominas |\n+-----------------+----------------+----------------+------------------+---------------------------+\n| 5               | 1900.0         | 4500.0         | 3110.1           | 15550.5                   |\n+-----------------+----------------+----------------+------------------+---------------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'Usa ROUND(AVG(columna), 2) para limitar los decimales a dos dígitos en montos de dinero o calificaciones.',
        pitfallTip: 'No mezcles funciones agregadas con columnas normales sin usar GROUP BY; arrojará un error o devolverá un valor arbitrario.',
        keyPoints: [
          'COUNT, SUM, AVG, MIN y MAX procesan múltiples filas y devuelven un solo resultado.',
          'Permiten calcular métricas clave de negocio al instante.',
          'Siempre asigna un alias con AS para que el encabezado del resultado sea claro.'
        ]
      },
      {
        title: 'Tableros de control (Dashboards) en aplicaciones móviles',
        explanation: `En cualquier app de finanzas, ventas o productividad, la pantalla principal muestra tarjetas de resumen (*KPIs*): "Gasto mensual", "Promedio de calorías", "Ventas del día".
Todas esas tarjetas se alimentan directamente de consultas SQL que ejecutan funciones agregadas en la base de datos SQLite local:`,
        codeSnippet: `-- Métricas del inventario de productos en venta\nSELECT \n  COUNT(*) AS variedad_productos,\n  SUM(stock) AS unidades_totales,\n  MIN(precio) AS producto_mas_barato,\n  MAX(precio) AS producto_mas_caro\nFROM productos;`,
        outputSnippet: `+--------------------+------------------+---------------------+-------------------+\n| variedad_productos | unidades_totales | producto_mas_barato | producto_mas_caro |\n+--------------------+------------------+---------------------+-------------------+\n| 5                  | 312              | 14.99               | 429.50            |\n+--------------------+------------------+---------------------+-------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'Calcular agregaciones en SQLite es cientos de veces más rápido y consume mucha menos batería que cargar miles de objetos en Kotlin y calcular el promedio con un bucle for.',
        pitfallTip: 'SUM y AVG solo funcionan sobre columnas numéricas (INTEGER o REAL); usarlas sobre TEXT puede dar 0 o error.',
        keyPoints: [
          'Las agregaciones potencian los tableros de mando e interfaces de usuario.',
          'Delegar el cálculo al motor de base de datos ahorra memoria RAM y batería.',
          'Forman parte fundamental de cualquier aplicación orientada a datos.'
        ]
      }
    ]
  },

  'sql-u10-l02': {
    subtitle: 'Comprende la diferencia fundamental entre contar todas las filas físicas y contar únicamente valores no nulos.',
    analogy: 'Pasar lista en un salón: COUNT(*) cuenta cuántas sillas ocupadas hay en el aula. COUNT(telefono) cuenta cuántos de esos alumnos tienen un teléfono registrado en su ficha escolar.',
    sections: [
      {
        title: 'Filas totales frente a valores presentes',
        explanation: `Aunque a primera vista parecen iguales, **\`COUNT(*)\`** y **\`COUNT(columna)\`** tienen comportamientos muy distintos cuando existen valores nulos (\`NULL\`):

1. **\`COUNT(*)\`**:
• Cuenta el **número total de filas** que cumplen la condición, sin importar qué valores contengan sus columnas.
• Aunque todas las columnas de una fila sean \`NULL\`, esa fila se cuenta.
• Es la forma estándar y más rápida de conocer el tamaño de una tabla.

2. **\`COUNT(nombre_columna)\`**:
• Cuenta únicamente las filas donde esa columna específica **no es \`NULL\`**.
• Si una fila tiene \`NULL\` en esa columna, es ignorada por el conteo.`,
        codeSnippet: `-- Comparamos el conteo total frente al conteo de una columna específica\nSELECT \n  COUNT(*) AS total_usuarios,\n  COUNT(email) AS usuarios_con_email\nFROM usuarios;`,
        outputSnippet: `+----------------+--------------------+\n| total_usuarios | usuarios_con_email |\n+----------------+--------------------+\n| 5              | 5                  |\n+----------------+--------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'Si solo quieres saber cuántas filas hay en una tabla o resultado, escribe siempre COUNT(*); SQLite lo optimiza leyendo los metadatos de almacenamiento.',
        pitfallTip: 'No uses COUNT(id) creyendo que es más rápido que COUNT(*); en los motores modernos COUNT(*) es igual de rápido o superior.',
        keyPoints: [
          'COUNT(*) cuenta filas totales sin importar valores nulos.',
          'COUNT(columna) cuenta únicamente celdas con valores no nulos.',
          'La diferencia entre ambos números revela cuántos registros tienen campos vacíos.'
        ]
      },
      {
        title: 'Auditoría de consistencia de datos',
        explanation: `Restar \`COUNT(*)\` y \`COUNT(columna)\` te da exactamente cuántos registros tienen información incompleta o pendiente de completar:`,
        codeSnippet: `-- Verificamos cuántos estudiantes tienen calificaciones registradas en el periodo\nSELECT \n  COUNT(*) AS total_matriculas,\n  COUNT(nota_final) AS matriculas_evaluadas,\n  COUNT(*) - COUNT(nota_final) AS evaluaciones_pendientes\nFROM matriculas;`,
        outputSnippet: `+------------------+----------------------+-------------------------+\n| total_matriculas | matriculas_evaluadas | evaluaciones_pendientes |\n+------------------+----------------------+-------------------------+\n| 7                | 7                    | 0                       |\n+------------------+----------------------+-------------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'En Room, puedes verificar la integridad de una migración de esquema ejecutando este tipo de conteos automáticos.',
        pitfallTip: 'Cuidado al contar cadenas vacías: una cadena vacía "" NO es NULL y sí se contará con COUNT(columna).',
        keyPoints: [
          'Comparar conteos permite auditar la calidad de la información.',
          'Detecta valores incompletos sin necesidad de escribir cláusulas complejas.',
          'Es un patrón estándar en auditorías de bases de datos.'
        ]
      }
    ]
  },

  'sql-u10-l03': {
    subtitle: 'Aprende cómo las funciones agregadas tratan los valores nulos y cómo evitar errores en promedios y sumas.',
    analogy: 'Calcular el promedio de una prueba entre 4 estudiantes, pero 1 faltó por enfermedad: ¿divides la suma de notas entre 4 o entre 3? SQL ignora automáticamente al que faltó y divide solo entre los 3 presentes.',
    sections: [
      {
        title: 'El comportamiento silencioso de NULL en las funciones agregadas',
        explanation: `En SQL, todas las funciones agregadas numéricas (**\`SUM\`**, **\`AVG\`**, **\`MIN\`**, **\`MAX\`**) **ignoran por completo los valores \`NULL\`**.

¿Qué impacto tiene esto en el promedio (\`AVG\`)?
Imagina 4 ventas: \`[100, 200, NULL, 300]\`:
• La suma es: \`100 + 200 + 300 = 600\`.
• \`AVG\` divide \`600\` entre **3** (los valores no nulos), dando un promedio de **\`200.0\`**.
• No divide entre 4. Si quisieras que el \`NULL\` cuente como cero, el promedio sería \`600 / 4 = 150.0\`.

Para controlar si un nulo debe contar como cero, usamos la función **\`COALESCE(columna, 0)\`**.`,
        codeSnippet: `-- Demostramos el cálculo de promedio en calificaciones\nSELECT \n  AVG(promedio) AS promedio_estudiantes,\n  ROUND(AVG(promedio), 2) AS promedio_redondeado\nFROM estudiantes;`,
        outputSnippet: `+----------------------+---------------------+\n| promedio_estudiantes | promedio_redondeado |\n+----------------------+---------------------+\n| 9.040000000000001    | 9.04                |\n+----------------------+---------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'COALESCE(salario, 0) reemplaza cualquier NULL por cero antes de que la función matemática procese el número.',
        pitfallTip: 'Si todas las filas evaluadas tienen NULL, SUM y AVG devolverán NULL, no cero.',
        keyPoints: [
          'SUM, AVG, MIN y MAX ignoran los valores NULL automáticamente.',
          'AVG solo divide entre la cantidad de filas que realmente tenían un número.',
          'COALESCE permite forzar que los nulos se traten como cero si el caso de negocio lo exige.'
        ]
      },
      {
        title: 'Manejo defensivo de agregaciones vacías en Kotlin',
        explanation: `En Kotlin y Android, cuando consultas una suma o promedio sobre una tabla vacía, SQLite devuelve \`NULL\`. Si tu función de Room espera un \`Double\` primitivo no nulo, la app lanzará una excepción:
\`NullPointerException: Attempt to invoke virtual method on a null object\`

Para solucionarlo, manejamos el tipo como nullable (\`Double?\`) o usamos \`COALESCE(SUM(precio), 0)\` en el SQL:`,
        codeSnippet: `-- Agregación defensiva que garantiza devolver siempre un número, nunca NULL\nSELECT COALESCE(SUM(precio), 0.0) AS total_inventario\nFROM productos\nWHERE categoria = 'Inexistente';`,
        outputSnippet: `+------------------+\n| total_inventario |\n+------------------+\n| 0.0              |\n+------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'En Room con Kotlin, escribir @Query("SELECT COALESCE(SUM(monto), 0.0) FROM transacciones") permite que tu función devuelva un Double seguro sin signo de interrogación.',
        pitfallTip: 'No asumas que SUM devuelve 0 cuando la tabla está vacía; por estándar SQL devuelve NULL.',
        keyPoints: [
          'Las agregaciones sobre cero filas coincidentes devuelven NULL.',
          'COALESCE convierte ese NULL en un valor predeterminado seguro como 0 o 0.0.',
          'Previene excepciones NullPointerException en el código de tu aplicación Kotlin.'
        ]
      }
    ]
  },

  'sql-u10-l04': {
    subtitle: 'Aprende a dividir tus datos en grupos para calcular métricas independientes por cada categoría con GROUP BY.',
    analogy: 'Un banco que separa las monedas en bolsas distintas: una bolsa para monedas de $1, otra para las de $5 y otra para las de $10. Luego cuenta cuánto dinero hay dentro de cada bolsa por separado.',
    sections: [
      {
        title: 'Clasificar y resumir por categorías con GROUP BY',
        explanation: `Hasta ahora, \`AVG\` o \`COUNT\` calculaban una sola cifra para toda la tabla. Pero en el mundo real casi siempre necesitas métricas desglosadas:
• El salario promedio **por departamento**.
• El total de ventas **por país**.
• La cantidad de productos **por categoría**.

La cláusula **\`GROUP BY\`** toma las filas de la tabla y las separa en pequeños grupos según los valores de una columna. Luego, las funciones agregadas se ejecutan de forma independiente para cada uno de esos grupos.

Sintaxis:
\`SELECT categoria, COUNT(*), AVG(precio)\`
\`FROM productos\`
\`GROUP BY categoria;\``,
        codeSnippet: `-- Calculamos estadísticas de inventario agrupadas por categoría\nSELECT \n  categoria,\n  COUNT(*) AS total_modelos,\n  SUM(stock) AS unidades_en_bodega,\n  ROUND(AVG(precio), 2) AS precio_promedio\nFROM productos\nGROUP BY categoria\nORDER BY unidades_en_bodega DESC;`,
        outputSnippet: `+------------+---------------+--------------------+-----------------+\n| categoria  | total_modelos | unidades_en_bodega | precio_promedio |\n+------------+---------------+--------------------+-----------------+\n| Accesorios | 1             | 150                | 14.99           |\n| Hardware   | 2             | 125                | 69.95           |\n| Audio      | 1             | 25                 | 129.00          |\n| Pantallas  | 1             | 12                 | 429.50          |\n+------------+---------------+--------------------+-----------------+\n4 rows in set (0.002 sec)`,
        byteTip: 'En SQLite, puedes agrupar por más de una columna: GROUP BY pais, ciudad agrupa primero por país y luego por ciudad dentro de cada país.',
        pitfallTip: 'Regla de oro: cualquier columna en el SELECT que no esté dentro de una función agregada DEBE estar listada en el GROUP BY.',
        keyPoints: [
          'GROUP BY divide la tabla en subgrupos basados en valores comunes.',
          'Las funciones agregadas se calculan por separado para cada subgrupo.',
          'Permite generar tablas dinámicas y gráficos de barras en aplicaciones móviles.'
        ]
      },
      {
        title: 'Casos prácticos: Estadísticas de personal y educación',
        explanation: `Veamos cómo una empresa analiza su nómina por departamento. Con una sola instrucción \`GROUP BY\`, la dirección sabe exactamente cuánto invierte en cada área:`,
        codeSnippet: `-- Resumen salarial agrupado por departamento\nSELECT \n  departamento,\n  COUNT(*) AS cantidad_empleados,\n  ROUND(AVG(salario), 2) AS salario_medio,\n  MAX(salario) AS salario_tope\nFROM empleados\nGROUP BY departamento\nORDER BY salario_medio DESC;`,
        outputSnippet: `+--------------+--------------------+---------------+--------------+\n| departamento | cantidad_empleados | salario_medio | salario_tope |\n+--------------+--------------------+---------------+--------------+\n| Dirección    | 1                  | 4500.00       | 4500.00      |\n| Ingeniería   | 1                  | 3200.00       | 3200.00      |\n| Sistemas     | 1                  | 3100.00       | 3100.00      |\n| Diseño UX    | 1                  | 2850.50       | 2850.50      |\n| Soporte      | 1                  | 1900.00       | 1900.00      |\n+--------------+--------------------+---------------+--------------+\n5 rows in set (0.002 sec)`,
        byteTip: 'Combina siempre GROUP BY con ORDER BY para que el reporte salga ordenado de mayor a menor valor de interés.',
        pitfallTip: 'No uses GROUP BY si no vas a usar ninguna función agregada; para eliminar duplicados simples usa DISTINCT.',
        keyPoints: [
          'Permite comparar el rendimiento relativo entre distintos departamentos.',
          'El resultado contiene exactamente una fila por cada grupo encontrado.',
          'Es la base del análisis de datos empresarial (Business Intelligence).'
        ]
      }
    ]
  },

  'sql-u10-l05': {
    subtitle: 'Aprende a filtrar grupos enteros utilizando la cláusula HAVING cuando necesitas condiciones sobre valores agregados.',
    analogy: 'Un filtro en aduana para contenedores: WHERE revisa los paquetes individuales antes de armar el contenedor. HAVING pesa el contenedor completo ya sellado y solo deja pasar a los que pesen más de 5 toneladas.',
    sections: [
      {
        title: 'Filtrar grupos calculados con HAVING',
        explanation: `¿Qué pasa si solo quieres ver los departamentos donde el salario promedio sea **mayor a $3,000**?
Si intentas escribir esto en el \`WHERE\`:
\`WHERE AVG(salario) > 3000\`
La base de datos arrojará un error:
\`ERROR: Misuse of aggregate function AVG() in WHERE clause\`

¿Por qué ocurre este error?
Porque el \`WHERE\` se ejecuta **antes** de que los grupos se formen; en ese momento el promedio aún no existe.

Para filtrar **después** de que los grupos han sido calculados, SQL inventó la cláusula **\`HAVING\`**:
\`SELECT departamento, AVG(salario)\`
\`FROM empleados\`
\`GROUP BY departamento\`
\`HAVING AVG(salario) > 3000;\``,
        codeSnippet: `-- Filtramos departamentos cuyo salario promedio supera los 3000\nSELECT \n  departamento,\n  COUNT(*) AS empleados,\n  ROUND(AVG(salario), 2) AS salario_promedio\nFROM empleados\nGROUP BY departamento\nHAVING AVG(salario) > 3000\nORDER BY salario_promedio DESC;`,
        outputSnippet: `+--------------+-----------+------------------+\n| departamento | empleados | salario_promedio |\n+--------------+-----------+------------------+\n| Dirección    | 1         | 4500.0           |\n| Ingeniería   | 1         | 3200.0           |\n| Sistemas     | 1         | 3100.0           |\n+--------------+-----------+------------------+\n3 rows in set (0.002 sec)`,
        byteTip: 'Puedes usar el alias de columna asignado con AS directamente dentro del HAVING en SQLite (ej. HAVING salario_promedio > 3000).',
        pitfallTip: 'Nunca intentes usar funciones agregadas en el WHERE; el compilador de SQL siempre las rechazará.',
        keyPoints: [
          'HAVING filtra grupos calculados después del GROUP BY.',
          'Acepta funciones agregadas como COUNT, SUM o AVG en sus condiciones.',
          'Permite descartar grupos pequeños o irrelevantes del resultado.'
        ]
      },
      {
        title: 'Identificar grupos con múltiples elementos (HAVING COUNT > 1)',
        explanation: `Uno de los usos más habituales de \`HAVING\` es detectar duplicados o grupos que superan cierto umbral de frecuencia. Por ejemplo, encontrar qué carreras tienen más de un estudiante o qué clientes tienen más de 3 compras:`,
        codeSnippet: `-- Buscamos carreras universitarias que tengan más de 1 estudiante matriculado\nSELECT \n  carrera,\n  COUNT(*) AS total_inscritos,\n  ROUND(AVG(promedio), 2) AS promedio_carrera\nFROM estudiantes\nGROUP BY carrera\nHAVING COUNT(*) > 1;`,
        outputSnippet: `+------------------------+-----------------+------------------+\n| carrera                | total_inscritos | promedio_carrera |\n+------------------------+-----------------+------------------+\n| Ingeniería de Software | 2               | 9.25             |\n+------------------------+-----------------+------------------+\n1 row in set (0.002 sec)`,
        byteTip: 'En Room, esta consulta permite crear alertas como: "Clientes frecuentes (más de 5 pedidos este mes)".',
        pitfallTip: 'No uses HAVING para condiciones sobre columnas simples que no sean agregadas; esas deben ir en el WHERE para ahorrar memoria.',
        keyPoints: [
          'HAVING COUNT(*) > 1 es el método clásico para encontrar valores repetidos.',
          'Filtra en base al volumen total del grupo.',
          'Es indispensable para control de calidad y reportes de alta frecuencia.'
        ]
      }
    ]
  },

  'sql-u10-l06': {
    subtitle: 'Comprende el ciclo de ejecución de una consulta SQL para dominar la diferencia exacta entre WHERE y HAVING.',
    analogy: 'Un embudo con dos filtros: el primer filtro (WHERE) saca las piedras grandes antes de licuar la fruta. El segundo filtro (HAVING) cuela la mezcla final después de licuar para eliminar grumos de pulpa.',
    sections: [
      {
        title: 'El orden de ejecución de una consulta SQL',
        explanation: `Aunque en el código escribes \`SELECT\` al principio, el motor de base de datos ejecuta las cláusulas en un orden completamente diferente:

1. **\`FROM\` & \`JOIN\`**: Identifica las tablas y las une.
2. **\`WHERE\`**: Filtra **filas individuales** antes de agrupar.
3. **\`GROUP BY\`**: Agrupa las filas restantes en categorías.
4. **\`HAVING\`**: Filtra **grupos completos** basándose en cálculos agregados.
5. **\`SELECT\`**: Proyecta las columnas finales y resuelve los alias.
6. **\`ORDER BY\`**: Ordena las filas del resultado.
7. **\`LIMIT\`**: Corta la cantidad de filas que se enviarán a la app.

Esta secuencia explica por qué \`WHERE\` no puede ver las funciones de grupo (aún no se han agrupado), mientras que \`HAVING\` sí puede.`,
        codeSnippet: `-- Demostración combinada: WHERE filtra activos, HAVING filtra por volumen\nSELECT \n  departamento,\n  COUNT(*) AS empleados_activos,\n  ROUND(AVG(salario), 2) AS salario_medio\nFROM empleados\nWHERE activo = true\nGROUP BY departamento\nHAVING AVG(salario) >= 3000\nORDER BY salario_medio DESC;`,
        outputSnippet: `+--------------+-------------------+---------------+\n| departamento | empleados_activos | salario_medio |\n+--------------+-------------------+---------------+\n| Dirección    | 1                 | 4500.0        |\n| Ingeniería   | 1                 | 3200.0        |\n| Sistemas     | 1                 | 3100.0        |\n+--------------+-------------------+---------------+\n3 rows in set (0.002 sec)`,
        byteTip: 'Aprenderte de memoria el orden de ejecución (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT) te convertirá en un desarrollador senior en bases de datos.',
        pitfallTip: 'Filtrar en HAVING lo que podrías filtrar en WHERE es un grave error de rendimiento: haces que el motor trabaje de más agrupando filas innecesarias.',
        keyPoints: [
          'WHERE descarta filas antes de que ocurra la agrupación.',
          'HAVING descarta grupos después de que se han calculado las métricas.',
          'Combinar ambos correctamente optimiza la velocidad de la consulta.'
        ]
      },
      {
        title: 'Regla de optimización: Filtra siempre lo más temprano posible',
        explanation: `Si una condición no depende de una función agregada (por ejemplo, \`activo = true\` o \`fecha >= '2024-01-01'\`), **debe ir siempre en el \`WHERE\`**.

¿Por qué?
Porque si filtras primero en el \`WHERE\`, el motor agrupa sobre 50 filas en lugar de 10,000. Eso reduce el uso de memoria RAM y CPU en el teléfono móvil:`,
        codeSnippet: `-- Eficiencia pura: filtramos primero los semestres avanzados en WHERE\nSELECT \n  carrera,\n  COUNT(*) AS estudiantes_avanzados,\n  ROUND(AVG(promedio), 2) AS promedio_grupo\nFROM estudiantes\nWHERE semestre >= 4\nGROUP BY carrera\nHAVING AVG(promedio) >= 8.5;`,
        outputSnippet: `+------------------------+-----------------------+----------------+\n| carrera                | estudiantes_avanzados | promedio_grupo |\n+------------------------+-----------------------+----------------+\n| Ingeniería de Software | 1                     | 9.4            |\n| Ciencias Computación   | 1                     | 8.8            |\n+------------------------+-----------------------+----------------+\n2 rows in set (0.001 sec)`,
        byteTip: 'En SQLite para Android, un WHERE que usa índices evita por completo lecturas de disco innecesarias.',
        pitfallTip: 'No uses HAVING pais = "México"; usa WHERE pais = "México" para no desperdiciar recursos del sistema.',
        keyPoints: [
          'Filtrar en WHERE reduce drásticamente el conjunto de datos a procesar.',
          'HAVING debe reservarse exclusivamente para condiciones sobre funciones agregadas.',
          'Esta distinción es una pregunta clásica en entrevistas técnicas de desarrollo.'
        ]
      }
    ]
  },

  'sql-u10-l07': {
    subtitle: 'Combina el poder de los JOINs con GROUP BY para generar reportes analíticos multidimensionales de alto nivel.',
    analogy: 'Un informe contable escolar: unes la lista de materias con la lista de matrículas para saber cuántos alumnos tiene cada profesor y cuál es el promedio general de cada materia.',
    sections: [
      {
        title: 'La cúspide de las consultas analíticas: Relacionar y resumir',
        explanation: `La combinación de **\`JOIN\`** y **\`GROUP BY\`** es una de las habilidades más valiosas en el desarrollo de software. Te permite tomar datos dispersos en varias tablas, vincularlos mediante llaves foráneas y resumirlos en estadísticas claras.

Pasos de la operación:
1. Con \`FROM\` y \`JOIN\`, creas la tabla combinada con todos los datos.
2. Con \`GROUP BY\`, agrupas por la entidad principal (por ejemplo, el nombre de la asignatura).
3. Con las funciones agregadas, calculas el total de inscritos, la nota más alta y el promedio de cada grupo.`,
        codeSnippet: `-- Reporte de rendimiento por asignatura uniendo asignaturas y matriculas\nSELECT \n  a.nombre AS asignatura,\n  a.departamento,\n  COUNT(m.id) AS total_alumnos,\n  ROUND(AVG(m.nota_final), 2) AS promedio_materia,\n  MAX(m.nota_final) AS calificacion_maxima\nFROM asignaturas AS a\nJOIN matriculas AS m ON a.id = m.asignatura_id\nGROUP BY a.id, a.nombre, a.departamento\nORDER BY promedio_materia DESC;`,
        outputSnippet: `+---------------------+----------------+---------------+------------------+---------------------+\n| asignatura          | departamento   | total_alumnos | promedio_materia | calificacion_maxima |\n+---------------------+----------------+---------------+------------------+---------------------+\n| Bases de Datos I    | Informática    | 3             | 9.33             | 9.8                 |\n| Programación Kotlin | Informática    | 2             | 9.10             | 9.2                 |\n| Estructuras Datos   | Informática    | 1             | 8.90             | 8.9                 |\n| Cálculo Diferencial | Matemáticas    | 1             | 8.00             | 8.0                 |\n+---------------------+----------------+---------------+------------------+---------------------+\n4 rows in set (0.002 sec)`,
        byteTip: 'Agrupar por la llave primaria a.id asegura que dos materias con el mismo nombre en departamentos distintos no se mezclen por accidente.',
        pitfallTip: 'Si usas LEFT JOIN para incluir materias sin alumnos, usa COUNT(m.id) en vez de COUNT(*); de lo contrario las materias vacías mostrarán 1 alumno en vez de 0.',
        keyPoints: [
          'JOIN + GROUP BY conecta entidades y calcula métricas consolidadas.',
          'Permite responder preguntas complejas de negocio en una sola consulta.',
          'Es el estándar de la industria para generar reportes analíticos.'
        ]
      },
      {
        title: 'Reporte de clientes y volumen de compras',
        explanation: `Veamos el mismo patrón aplicado a compras y usuarios: conectamos los clientes con sus pedidos para saber quién es nuestro mejor comprador:`,
        codeSnippet: `-- Reporte de clientes ordenado por volumen de dinero gastado\nSELECT \n  u.nombre AS cliente,\n  u.pais,\n  COUNT(p.id) AS total_pedidos,\n  ROUND(SUM(p.total), 2) AS total_gastado\nFROM usuarios AS u\nJOIN pedidos AS p ON u.id = p.cliente_id\nGROUP BY u.id, u.nombre, u.pais\nORDER BY total_gastado DESC;`,
        outputSnippet: `+-------------------+----------------+---------------+---------------+\n| cliente           | pais           | total_pedidos | total_gastado |\n+-------------------+----------------+---------------+---------------+\n| Grace Hopper      | Estados Unidos | 1             | 429.50        |\n| Linus Torvalds    | Finlandia      | 1             | 178.90        |\n| Ada Lovelace      | Reino Unido    | 1             | 139.89        |\n| Alan Turing       | Reino Unido    | 1             | 89.99         |\n| Margaret Hamilton | Estados Unidos | 1             | 14.99         |\n+-------------------+----------------+---------------+---------------+\n5 rows in set (0.002 sec)`,
        byteTip: 'En Room con Kotlin Coroutines, este reporte analítico se ejecuta en background y se expone a la UI mediante un Flow<List<ClienteResumen>>.',
        pitfallTip: 'Evita calcular sumas o promedios en bucles de código de la app cuando SQL puede entregarte el resultado ya consolidado en microsegundos.',
        keyPoints: [
          'El motor de base de datos está optimizado para consolidar datos masivos.',
          'Unir y agrupar en una sola sentencia reduce el tráfico entre SQLite y la aplicación.',
          'Con esto dominas las consultas de agregación más potentes del lenguaje SQL.'
        ]
      }
    ]
  }
};
