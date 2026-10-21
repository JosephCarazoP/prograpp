import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_02_THEORY: Record<string, TheoryLesson> = {
  "sql-u02-l01": {
    "id": "sql-th-u02-l01",
    "lessonId": "sql-u02-l01",
    "pathId": "sql",
    "unitId": 2,
    "levelId": 1,
    "title": "1. Entidades y atributos",
    "subtitle": "Aprende a identificar qué objetos del mundo real deben convertirse en tablas y atributos.",
    "estimatedMinutes": 8,
    "analogy": "Un formulario médico: la ficha del \"Paciente\" es la entidad. Sus atributos son nombre, tipo de sangre y alergias. Cada persona que llega al hospital es una instancia con sus propios datos en esa ficha.",
    "video": {
      "title": "Modelado Entidad-Relación: PK, FK y Relaciones",
      "channel": "Develoteca",
      "duration": "45:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Diseño de esquemas, 1 a 1, 1 a N, N a N con tablas intermedias con Estudiantes y Asignaturas."
    },
    "sections": [
      {
        "title": "Entidades y atributos en el diseño de datos",
        "explanation": "Antes de escribir una sola línea de código SQL, debemos diseñar cómo organizaremos la información. Este proceso se llama **modelado de datos**:\n\n• **Entidad:** Cualquier objeto o concepto del mundo real sobre el cual necesitamos almacenar datos (ejemplo: `Cliente`, `Producto`, `Factura`, `Curso`). Cada entidad se convertirá en una **tabla**.\n• **Atributo:** Una propiedad o característica que describe a esa entidad (ejemplo: para la entidad `Producto`, sus atributos son `nombre`, `precio` y `stock`). Cada atributo se convertirá en una **columna**.",
        "codeSnippet": "-- Tabla diseñada a partir de la entidad 'Producto' con sus atributos esenciales\nSELECT id, nombre, categoria, precio, stock\nFROM productos;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+------------------------------+-----------+--------+-------+\n| id | nombre                       | categoria | precio | stock |\n+----+------------------------------+-----------+--------+-------+\n| 1  | Teclado Mecánico RGB         | Hardware  | 89.99  | 45    |\n| 2  | Monitor Ultrawide 34\"        | Pantallas | 429.5  | 12    |\n| 3  | Mouse Ergonómico Pro         | Hardware  | 49.9   | 80    |\n| 4  | Auriculares Cancelación Ruido| Audio     | 129.0  | 25    |\n| 5  | Cable HDMI 2.1 Braided       | Accesorios| 14.99  | 150   |\n+----+------------------------------+-----------+--------+-------+\n5 filas devueltas",
        "byteTip": "Usa nombres en singular o plural de forma consistente: si eliges productos para tus tablas, nombra todas en plural (clientes, facturas, cursos).",
        "pitfallTip": "No crees tablas para conceptos que solo son atributos de otra tabla (ejemplo: no crees una tabla entera para \"Color\" si con una columna basta).",
        "keyPoints": [
          "Las entidades del negocio se convierten en tablas de la base de datos.",
          "Los atributos de las entidades se convierten en columnas tipadas.",
          "Un buen modelado previo ahorra semanas de reescritura de código en el futuro."
        ]
      },
      {
        "title": "Regla de granularidad atómica",
        "explanation": "Cada atributo debe contener el dato más indivisible posible. Si guardas el nombre completo en una sola columna `\"Carlos Alberto Mendoza\"`, luego será muy difícil ordenar a los clientes alfabéticamente por su apellido.\n\nEs mejor diseñar dos columnas: `nombre` y `apellido`:",
        "codeSnippet": "-- Consultamos empleados con atributos separados para poder filtrar por departamento\nSELECT nombre, departamento\nFROM empleados\nWHERE departamento = 'Ingeniería';",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------+--------------+\n| nombre         | departamento |\n+----------------+--------------+\n| Carlos Mendoza | Ingeniería   |\n+----------------+--------------+\n1 fila devuelta",
        "byteTip": "Separar campos te da la flexibilidad de unirlos cuando quieras con concatenación en SQL.",
        "pitfallTip": "Evita crear columnas genéricas como dato1, campo2; cada columna debe revelar claramente su propósito.",
        "keyPoints": [
          "La atomicidad exige que cada celda guarde un solo dato elemental.",
          "Separar datos facilita búsquedas, ordenamientos y filtros precisos.",
          "La claridad en los nombres de columna es la base de un buen esquema."
        ]
      }
    ]
  },
  "sql-u02-l02": {
    "id": "sql-th-u02-l02",
    "lessonId": "sql-u02-l02",
    "pathId": "sql",
    "unitId": 2,
    "levelId": 2,
    "title": "2. Selección de los datos necesarios",
    "subtitle": "Aprende a seleccionar únicamente los datos estrictamente necesarios para tu sistema.",
    "estimatedMinutes": 8,
    "analogy": "Hacer la maleta para un viaje de fin de semana: si empacas ropa innecesaria \"por si acaso\", la maleta pesa demasiado y te cobran sobrepeso. Guarda en tu base de datos solo lo que tu app realmente va a usar.",
    "video": {
      "title": "Modelado Entidad-Relación: PK, FK y Relaciones",
      "channel": "Develoteca",
      "duration": "45:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Diseño de esquemas, 1 a 1, 1 a N, N a N con tablas intermedias con Estudiantes y Asignaturas."
    },
    "sections": [
      {
        "title": "Selección austera de datos necesarios",
        "explanation": "Uno de los errores más comunes de diseñadores novatos es intentar almacenar absolutamente todo lo imaginable: guardar el signo zodiacal de los clientes o el color favorito de sus mascotas \"por si en el futuro se necesita\".\n\nGuardar datos innecesarios:\n• Consume memoria física y espacio en el almacenamiento del teléfono.\n• Hace las consultas más lentas.\n• Aumenta la complejidad del código.\n• Genera riesgos legales de privacidad (como el reglamento GDPR).\n\nLa regla de diseño profesional es la **austeridad**: almacena solo los atributos que aporten valor directo a las funciones actuales de la aplicación.",
        "codeSnippet": "-- Tabla con los atributos justos y necesarios para un sistema académico\nSELECT id, nombre, carrera, semestre, promedio\nFROM estudiantes;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+--------------------------+----------+----------+\n| id | nombre          | carrera                  | semestre | promedio |\n+----+-----------------+--------------------------+----------+----------+\n| 1  | Valeria Morales | Ingeniería de Software   | 4        | 9.4      |\n| 2  | Diego Fernández | Ciencias Computacionales | 6        | 8.8      |\n| 3  | Camila Gómez    | Sistemas de Información  | 2        | 9.7      |\n| 4  | Javier Ramos    | Ciberseguridad           | 5        | 8.2      |\n| 5  | Lucía Navarro   | Ingeniería de Software   | 3        | 9.1      |\n+----+-----------------+--------------------------+----------+----------+\n5 filas devueltas",
        "byteTip": "Siempre es muy fácil agregar una columna nueva con ALTER TABLE más adelante cuando el requerimiento realmente exista.",
        "pitfallTip": "No guardes datos calculables. Por ejemplo, guarda fecha_nacimiento, NO guardes edad; la edad cambia cada año y se desactualiza.",
        "keyPoints": [
          "Almacena solo los atributos requeridos por la lógica real del negocio.",
          "Evita almacenar datos redundantes que pueden calcularse a partir de otros.",
          "Un esquema conciso mejora el rendimiento y respeta la privacidad del usuario."
        ]
      },
      {
        "title": "Datos calculados vs Datos almacenados",
        "explanation": "Si guardas la fecha de nacimiento, puedes calcular la edad exacta en cualquier instante sin riesgo de que quede desactualizada con el paso del tiempo:",
        "codeSnippet": "-- En vez de guardar una columna mutable con la edad, calculamos datos derivados\nSELECT nombre, (promedio * 10) AS calificacion_sobre_100\nFROM estudiantes;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+------------------------+\n| nombre          | calificacion_sobre_100 |\n+-----------------+------------------------+\n| Valeria Morales | 94.0                   |\n| Diego Fernández | 88.0                   |\n| Camila Gómez    | 97.0                   |\n| Javier Ramos    | 82.0                   |\n| Lucía Navarro   | 91.0                   |\n+-----------------+------------------------+\n5 filas devueltas",
        "byteTip": "Calcular valores al vuelo en SQL garantiza que el resultado sea siempre fresco y exacto.",
        "pitfallTip": "Guardar subtotales, totales e impuestos fijos en tablas puede causar que si alguien edita un precio, el total guardado quede descuadrado.",
        "keyPoints": [
          "Calcula valores derivados en la consulta en lugar de almacenarlos estáticamente.",
          "Previene inconsistencias cuando cambian los datos de origen.",
          "Ahorra espacio en disco y mantiene la base de datos limpia."
        ]
      }
    ]
  },
  "sql-u02-l03": {
    "id": "sql-th-u02-l03",
    "lessonId": "sql-u02-l03",
    "pathId": "sql",
    "unitId": 2,
    "levelId": 3,
    "title": "3. Llave primaria (PK)",
    "subtitle": "Domina la Llave Primaria (Primary Key): el identificador único e irremplazable de cada registro.",
    "estimatedMinutes": 8,
    "analogy": "Tu número de cédula de identidad, DNI o pasaporte: en tu país pueden existir dos personas con el mismo nombre y apellido (como dos \"Juan Pérez\"), pero sus números de documento son únicos e irrepetibles.",
    "video": {
      "title": "Modelado Entidad-Relación: PK, FK y Relaciones",
      "channel": "Develoteca",
      "duration": "45:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Diseño de esquemas, 1 a 1, 1 a N, N a N con tablas intermedias con Estudiantes y Asignaturas."
    },
    "sections": [
      {
        "title": "La Llave Primaria (PRIMARY KEY / PK)",
        "explanation": "En una base de datos relacional, cada fila de una tabla debe ser distinguible de todas las demás sin la menor duda.\n\nLa **Llave Primaria** (*Primary Key* o **PK**) es una columna (o conjunto de columnas) cuyo valor es:\n1. **Único:** No pueden existir dos filas con la misma llave primaria en la misma tabla jamás.\n2. **No nulo (`NOT NULL`):** Todo registro debe tener obligatoriamente un valor de llave primaria asignado.\n3. **Inmutable:** Su valor no debe cambiar a lo largo del tiempo.\n\nTípicamente se utiliza una columna llamada **`id`** con números enteros secuenciales (`1, 2, 3...`).",
        "codeSnippet": "-- Consultamos la tabla donde 'id' actúa como llave primaria única\nSELECT id, nombre, email\nFROM usuarios\nWHERE id = 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+--------------+----------------+\n| id | nombre       | email          |\n+----+--------------+----------------+\n| 3  | Grace Hopper | grace@navy.mil |\n+----+--------------+----------------+\n1 fila devuelta",
        "byteTip": "Consultar por llave primaria (WHERE id = 3) es la búsqueda más rápida posible porque SQLite crea un índice B-Tree automático para ella.",
        "pitfallTip": "No uses el nombre de una persona como llave primaria; los nombres se repiten y las personas pueden cambiar legalmente de nombre.",
        "keyPoints": [
          "La PRIMARY KEY identifica de forma unívoca a cada registro en la tabla.",
          "Garantiza que no existan filas duplicadas e indistinguibles.",
          "Generalmente es un número entero autoincremental llamado id."
        ]
      },
      {
        "title": "Llaves artificiales (Surrogate Keys) vs Naturales",
        "explanation": "• **Llave natural:** Un dato del mundo real que ya es único (como el número de seguro social o el código ISBN de un libro).\n• **Llave artificial (*Surrogate*):** Un simple número secuencial inventado por el sistema (`id = 1, 2, 3`).\n\nEn la industria de software y en Android, **casi siempre se prefieren llaves artificiales `id INTEGER`**: ocupan muy poco espacio, son ultra-rápidas para hacer JOINs y no dependen de cambios en leyes o normas externas.",
        "codeSnippet": "-- Búsqueda precisa por llave primaria única\nSELECT id, nombre, precio\nFROM productos\nWHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------------+--------+\n| id | nombre               | precio |\n+----+----------------------+--------+\n| 1  | Teclado Mecánico RGB | 89.99  |\n+----+----------------------+--------+\n1 fila devuelta",
        "byteTip": "En SQLite, declarar id INTEGER PRIMARY KEY hace que la base de datos asigne el siguiente número disponible automáticamente.",
        "pitfallTip": "Evita usar cadenas de texto muy largas como llave primaria si vas a relacionarla con muchas otras tablas.",
        "keyPoints": [
          "Las llaves artificiales numéricas (id) son el estándar en apps modernas.",
          "Ocupan solo 4 u 8 bytes en memoria y aceleran las búsquedas.",
          "Aíslan la estructura interna de los cambios en los datos del negocio."
        ]
      }
    ]
  },
  "sql-u02-l04": {
    "id": "sql-th-u02-l04",
    "lessonId": "sql-u02-l04",
    "pathId": "sql",
    "unitId": 2,
    "levelId": 4,
    "title": "4. Llave foránea (FK)",
    "subtitle": "Conecta diferentes tablas mediante Llaves Foráneas (Foreign Key) para crear relaciones seguras.",
    "estimatedMinutes": 8,
    "analogy": "La etiqueta del equipaje en un aeropuerto: la maleta lleva una etiqueta que dice \"Pasajero #101\". La maleta está en una bodega distinta, pero sabemos con certeza a quién pertenece gracias al número que apunta a la lista de pasajeros.",
    "video": {
      "title": "Modelado Entidad-Relación: PK, FK y Relaciones",
      "channel": "Develoteca",
      "duration": "45:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Diseño de esquemas, 1 a 1, 1 a N, N a N con tablas intermedias con Estudiantes y Asignaturas."
    },
    "sections": [
      {
        "title": "La Llave Foránea (FOREIGN KEY / FK)",
        "explanation": "Una vez que tienes dos tablas independientes, ¿cómo las conectas para que sepan qué fila pertenece a cuál?\n\nUsamos una **Llave Foránea** (*Foreign Key* o **FK**):\n• Es una columna en una tabla secundaria que **apunta directamente a la llave primaria de otra tabla principal**.\n• Establece un vínculo estricto entre ambas.\n• Por ejemplo, en la tabla `matriculas`, la columna `estudiante_id` es una llave foránea que apunta a la columna `id` de la tabla `estudiantes`.",
        "codeSnippet": "-- La columna estudiante_id apunta a estudiantes(id)\n-- La columna asignatura_id apunta a asignaturas(id)\nSELECT id, estudiante_id, asignatura_id, periodo, nota_final\nFROM matriculas\nWHERE estudiante_id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+---------------+---------------+---------+------------+\n| id | estudiante_id | asignatura_id | periodo | nota_final |\n+----+---------------+---------------+---------+------------+\n| 1  | 1             | 101           | 2024-1  | 9.5        |\n| 2  | 1             | 103           | 2024-1  | 9.2        |\n+----+---------------+---------------+---------+------------+\n2 filas devueltas",
        "byteTip": "Por convención, una llave foránea se nombra con el nombre de la tabla relacionada en singular seguido de _id: estudiante_id, usuario_id.",
        "pitfallTip": "Guardar un id que no existe en la tabla principal (por ejemplo matricular al estudiante_id = 999 cuando solo existen 5 alumnos) viola la integridad referencial.",
        "keyPoints": [
          "La FOREIGN KEY conecta una fila de una tabla con la PRIMARY KEY de otra.",
          "Crea el enlace lógico del modelo relacional.",
          "Garantiza que no existan registros huérfanos sin dueño."
        ]
      },
      {
        "title": "Integridad referencial en acción",
        "explanation": "Cuando las llaves foráneas están activadas en SQLite, el motor se convierte en un guardián incorruptible:\nSi intentas insertar una matrícula para un alumno que no existe, o si intentas borrar a un alumno que todavía tiene materias matriculadas, SQLite bloqueará la operación para evitar que queden datos rotos en tu sistema.",
        "codeSnippet": "-- Verificamos las materias cursadas por el estudiante #2 (Diego Fernández)\nSELECT estudiante_id, asignatura_id, nota_final\nFROM matriculas\nWHERE estudiante_id = 2;",
        "codeLanguage": "sql",
        "outputSnippet": "+---------------+---------------+------------+\n| estudiante_id | asignatura_id | nota_final |\n+---------------+---------------+------------+\n| 2             | 101           | 8.7        |\n| 2             | 102           | 8.9        |\n+---------------+---------------+------------+\n2 filas devueltas",
        "byteTip": "En SQLite debes ejecutar PRAGMA foreign_keys = ON; para que las llaves foráneas se validen activamente.",
        "pitfallTip": "No borres tablas principales sin antes revisar qué tablas secundarias dependen de sus llaves foráneas.",
        "keyPoints": [
          "Las llaves foráneas previenen registros huérfanos en la base de datos.",
          "Garantizan que las relaciones entre tablas sean siempre verídicas.",
          "Son la base sobre la que funcionan las uniones con JOIN."
        ]
      }
    ]
  },
  "sql-u02-l05": {
    "id": "sql-th-u02-l05",
    "lessonId": "sql-u02-l05",
    "pathId": "sql",
    "unitId": 2,
    "levelId": 5,
    "title": "5. Relaciones uno a uno y uno a muchos",
    "subtitle": "Comprende las relaciones uno a uno (1:1) y uno a muchos (1:N) en el diseño de software.",
    "estimatedMinutes": 8,
    "analogy": "Relación 1 a 1: un ciudadano y su único pasaporte oficial. Relación 1 a Muchos: un autor y todos los libros que ha escrito en su vida (un autor escribe muchos libros, pero cada libro tiene ese autor).",
    "video": {
      "title": "Modelado Entidad-Relación: PK, FK y Relaciones",
      "channel": "Develoteca",
      "duration": "45:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Diseño de esquemas, 1 a 1, 1 a N, N a N con tablas intermedias con Estudiantes y Asignaturas."
    },
    "sections": [
      {
        "title": "Relaciones 1:1 y 1:N",
        "explanation": "Entre dos entidades pueden existir diferentes tipos de cardinalidad:\n\n1. **Relación Uno a Uno (1:1):**\nCada registro de la Tabla A se relaciona con exactamente un único registro de la Tabla B.\n• Ejemplo: `Usuario` <-> `ExpedienteConfidencial`.\n• Se suele usar para separar datos muy privados o columnas pesadas que solo se consultan ocasionalmente.\n\n2. **Relación Uno a Muchos (1:N):**\nEs con diferencia **la relación más común de toda la informática**.\nUn registro de la Tabla A puede estar vinculado con múltiples registros de la Tabla B, pero cada registro de la Tabla B pertenece a un solo padre en la Tabla A.\n• Ejemplo: Un `Cliente` puede hacer **muchos** `Pedidos`, pero cada pedido pertenece a **un solo** cliente.\n• Ejemplo: Un `Departamento` tiene **muchos** `Empleados`, pero cada empleado trabaja en **un solo** departamento.",
        "codeSnippet": "-- Relación 1:N -> El departamento 'Informática' tiene múltiples asignaturas asociadas\nSELECT id, nombre, creditos\nFROM asignaturas\nWHERE departamento = 'Informática';",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+---------------------+----------+\n| id  | nombre              | creditos |\n+-----+---------------------+----------+\n| 101 | Bases de Datos I    | 4        |\n| 102 | Estructuras de Datos| 5        |\n| 103 | Programación Kotlin | 4        |\n+-----+---------------------+----------+\n3 filas devueltas",
        "byteTip": "En una relación 1 a Muchos, la llave foránea SIEMPRE se coloca en el lado del \"Muchos\" (en la tabla hija).",
        "pitfallTip": "Colocar la llave foránea en la tabla equivocada rompería el diseño impidiendo que un padre tenga múltiples hijos.",
        "keyPoints": [
          "1:1 conecta un registro con exactamente otro registro único.",
          "1:N conecta un registro principal con múltiples registros secundarios.",
          "La llave foránea se ubica siempre en la tabla secundaria (el lado \"Muchos\")."
        ]
      },
      {
        "title": "Cómo se implementa la relación 1:N",
        "explanation": "Para implementar que un cliente tenga muchos pedidos:\n1. Creas la tabla `clientes` con su `id PRIMARY KEY`.\n2. Creas la tabla `pedidos` con su propio `id PRIMARY KEY`, y le agregas la columna **`cliente_id REFERENCES clientes(id)`**.\n¡Listo! Ese cliente puede generar 1, 10 o 1,000 pedidos sin modificar la tabla de clientes.",
        "codeSnippet": "-- Filtramos los empleados asociados al departamento de Sistemas\nSELECT id, nombre, salario\nFROM empleados\nWHERE departamento = 'Sistemas';",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+------------+---------+\n| id  | nombre     | salario |\n+-----+------------+---------+\n| 103 | Mateo Díaz | 3100.0  |\n+-----+------------+---------+\n1 fila devuelta",
        "byteTip": "Esta estructura permite agregar millones de registros hijos sin afectar el rendimiento de la tabla padre.",
        "pitfallTip": "No crees columnas como pedido1, pedido2, pedido3 en la tabla de clientes; limita la cantidad y desperdicia espacio.",
        "keyPoints": [
          "La tabla hija aloja la llave foránea apuntando a la tabla padre.",
          "Permite un crecimiento ilimitado de registros hijos.",
          "Es el patrón universal para carritos, facturas, comentarios y publicaciones."
        ]
      }
    ]
  },
  "sql-u02-l06": {
    "id": "sql-th-u02-l06",
    "lessonId": "sql-u02-l06",
    "pathId": "sql",
    "unitId": 2,
    "levelId": 6,
    "title": "6. Relaciones muchos a muchos y tablas intermedias",
    "subtitle": "Modela relaciones Muchos a Muchos (N:M) de forma limpia usando tablas intermedias.",
    "estimatedMinutes": 8,
    "analogy": "Estudiantes y Asignaturas: un estudiante cursa muchas materias a la vez, y una materia tiene muchos estudiantes inscritos. Para conectarlos sin confusiones se crea una lista de Matrícula (la tabla intermedia).",
    "video": {
      "title": "Modelado Entidad-Relación: PK, FK y Relaciones",
      "channel": "Develoteca",
      "duration": "45:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Diseño de esquemas, 1 a 1, 1 a N, N a N con tablas intermedias con Estudiantes y Asignaturas."
    },
    "sections": [
      {
        "title": "Relaciones Muchos a Muchos (N:M) y tablas intermedias",
        "explanation": "¿Qué ocurre cuando la relación fluye en ambas direcciones?\n• Un `Estudiante` se inscribe en **muchas** `Asignaturas`.\n• Una `Asignatura` tiene inscritos a **muchos** `Estudiantes`.\n\nEn las bases de datos relacionales **no es posible conectar dos tablas directamente en una relación N:M** sin generar caos.\n\nPara resolverlo, la regla de oro de la ingeniería de datos es:\n**Descomponer la relación N:M en dos relaciones 1:N creando una tabla intermedia** (también llamada tabla pivote o de unión):\n• La tabla intermedia (ejemplo: `matriculas`) contiene **dos llaves foráneas**: una que apunta a `estudiantes(id)` y otra que apunta a `asignaturas(id)`.\n• Además, puede tener sus propios atributos (como la `fecha_matricula` o la `nota_final`).",
        "codeSnippet": "-- Consultamos la tabla intermedia 'matriculas' que resuelve la relación N:M\nSELECT id, estudiante_id, asignatura_id, periodo, nota_final\nFROM matriculas;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+---------------+---------------+---------+------------+\n| id | estudiante_id | asignatura_id | periodo | nota_final |\n+----+---------------+---------------+---------+------------+\n| 1  | 1             | 101           | 2024-1  | 9.5        |\n| 2  | 1             | 103           | 2024-1  | 9.2        |\n| 3  | 2             | 101           | 2024-1  | 8.7        |\n| 4  | 2             | 102           | 2024-1  | 8.9        |\n| 5  | 3             | 101           | 2024-1  | 9.8        |\n| 6  | 4             | 104           | 2024-1  | 8.0        |\n| 7  | 5             | 103           | 2024-1  | 9.0        |\n+----+---------------+---------------+---------+------------+\n7 filas devueltas",
        "byteTip": "Observa la fila 1 y 3: la asignatura 101 tiene tanto al estudiante 1 como al 2. ¡Muchos a muchos resuelto de forma perfecta!",
        "pitfallTip": "Nunca intentes guardar una lista de IDs separados por comas como \"101,102,103\" en una sola celda. Hace que las búsquedas sean lentas e imposibles de validar.",
        "keyPoints": [
          "Una relación N:M se resuelve obligatoriamente con una tabla intermedia.",
          "La tabla intermedia tiene dos llaves foráneas hacia las tablas principales.",
          "Permite registrar datos propios del encuentro (como fecha, cantidad o nota)."
        ]
      },
      {
        "title": "Otros ejemplos de relaciones N:M",
        "explanation": "Este patrón se repite en infinidad de aplicaciones:\n• `Facturas` <-> `Productos`: resuelto con la tabla intermedia `detalle_factura` (con cantidad y precio cobrado).\n• `Usuarios` <-> `Roles`: resuelto con `usuario_roles`.\n• `Canciones` <-> `Playlists`: resuelto con `playlist_canciones`.",
        "codeSnippet": "-- Consultamos quiénes están matriculados en la asignatura 103 (Kotlin)\nSELECT estudiante_id, nota_final\nFROM matriculas\nWHERE asignatura_id = 103;",
        "codeLanguage": "sql",
        "outputSnippet": "+---------------+------------+\n| estudiante_id | nota_final |\n+---------------+------------+\n| 1             | 9.2        |\n| 5             | 9.0        |\n+---------------+------------+\n2 filas devueltas",
        "byteTip": "En lecciones posteriores aprenderás a sustituir esos números de ID por los nombres reales usando INNER JOIN.",
        "pitfallTip": "Asegúrate de agregar una restricción UNIQUE(estudiante_id, asignatura_id) para que un alumno no se matricule dos veces en la misma materia.",
        "keyPoints": [
          "La tabla intermedia modela interacciones del mundo real.",
          "Soporta millones de combinaciones sin redundancia.",
          "Es el pilar de carritos de compras, pedidos y matrículas."
        ]
      }
    ]
  },
  "sql-u02-l07": {
    "id": "sql-th-u02-l07",
    "lessonId": "sql-u02-l07",
    "pathId": "sql",
    "unitId": 2,
    "levelId": 7,
    "title": "7. Lectura de diagramas sencillos",
    "subtitle": "Aprende a interpretar diagramas Entidad-Relación (DER) para comprender cualquier base de datos a primera vista.",
    "estimatedMinutes": 8,
    "analogy": "El plano de las líneas del metro de una gran ciudad: cada estación es una tabla y las líneas de colores que las unen son las relaciones que te muestran cómo viajar de una a otra.",
    "video": {
      "title": "Modelado Entidad-Relación: PK, FK y Relaciones",
      "channel": "Develoteca",
      "duration": "45:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Diseño de esquemas, 1 a 1, 1 a N, N a N con tablas intermedias con Estudiantes y Asignaturas."
    },
    "sections": [
      {
        "title": "Lectura de Diagramas Entidad-Relación (DER)",
        "explanation": "Un **Diagrama Entidad-Relación (DER)** es un mapa visual que representa toda la arquitectura de la base de datos:\n\n¿Cómo leerlo en 3 sencillos pasos?\n1. **Los rectángulos o cajas:** Son las **Tablas**. Arriba llevan el nombre de la tabla y adentro listan sus columnas.\n2. **Las llaves (`PK` y `FK`):**\n   • `PK` señala la Llave Primaria que identifica cada fila.\n   • `FK` señala una Llave Foránea que proviene de otra tabla.\n3. **Las líneas de conexión:** Conectan la llave foránea de una tabla con la llave primaria correspondiente, mostrando la cardinalidad (1 a 1, 1 a N).",
        "codeSnippet": "-- Consultamos la lista de asignaturas y sus departamentos\nSELECT id, nombre, departamento\nFROM asignaturas\nORDER BY departamento ASC;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+-----------------------+--------------------+\n| id  | nombre                | departamento       |\n+-----+-----------------------+--------------------+\n| 101 | Bases de Datos I      | Informática        |\n| 102 | Estructuras de Datos  | Informática        |\n| 103 | Programación Kotlin   | Informática        |\n| 104 | Cálculo Diferencial   | Matemáticas        |\n| 105 | Redes de Computadoras | Telecomunicaciones |\n+-----+-----------------------+--------------------+\n5 filas devueltas",
        "byteTip": "En herramientas de modelado modernas, la \"pata de gallo\" (crow's foot) en el extremo de una línea indica el lado \"Muchos\" de la relación.",
        "pitfallTip": "No empieces a programar en Android sin tener un DER claro en papel; cambiar una base de datos con la app ya en producción es mucho más difícil.",
        "keyPoints": [
          "El DER muestra visualmente todas las tablas y sus conexiones.",
          "Permite entender la estructura del proyecto en segundos.",
          "Facilita la comunicación entre programadores, analistas y clientes."
        ]
      },
      {
        "title": "Del diagrama visual al código real",
        "explanation": "Cada caja de un diagrama se traduce directamente en una sentencia `CREATE TABLE` en SQLite, y cada línea de conexión se traduce en una cláusula `FOREIGN KEY ... REFERENCES`:",
        "codeSnippet": "-- Vista rápida de estudiantes para contrastar contra el DER académico\nSELECT id, nombre, carrera\nFROM estudiantes;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+--------------------------+\n| id | nombre          | carrera                  |\n+----+-----------------+--------------------------+\n| 1  | Valeria Morales | Ingeniería de Software   |\n| 2  | Diego Fernández | Ciencias Computacionales |\n| 3  | Camila Gómez    | Sistemas de Información  |\n| 4  | Javier Ramos    | Ciberseguridad           |\n| 5  | Lucía Navarro   | Ingeniería de Software   |\n+----+-----------------+--------------------------+\n5 filas devueltas",
        "byteTip": "Herramientas como SQLiteStudio o DBeaver generan estos diagramas automáticamente leyendo tu archivo .db.",
        "pitfallTip": "Mantén siempre actualizado el DER si agregas nuevas columnas en las migraciones de tu app.",
        "keyPoints": [
          "El DER es el puente directo entre el diseño conceptual y el código DDL.",
          "Herramientas modernas permiten exportar el diagrama directamente a sentencias SQL.",
          "Es el documento arquitectónico más importante de un backend de datos."
        ]
      }
    ]
  }
};
