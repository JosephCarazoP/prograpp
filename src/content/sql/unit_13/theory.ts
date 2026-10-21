import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_13_THEORY: Record<string, TheoryLesson> = {
  "sql-u13-l01": {
    "id": "sql-th-u13-l01",
    "lessonId": "sql-u13-l01",
    "pathId": "sql",
    "unitId": 13,
    "levelId": 1,
    "title": "1. Duplicación de datos y anomalías",
    "subtitle": "Comprende los peligros del mal diseño relacional y cómo evitar las anomalías de inserción, actualización y borrado.",
    "estimatedMinutes": 8,
    "analogy": "Escribir el precio de una hamburguesa en 20 páginas de un menú de papel en vez de tener una sola lista de precios: el día que cambies el precio, olvidarás cambiarlo en 3 páginas y los clientes reclamarán precios diferentes.",
    "video": {
      "title": "Buen Diseño, Normalización (1FN, 2FN, 3FN) y Seguridad SQL",
      "channel": "Fazt Code",
      "duration": "53:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Evitar redundancias, formas normales, ALTER/DROP, vistas, índices y prevención de SQL Injection."
    },
    "sections": [
      {
        "title": "Los tres peligros del mal diseño: Las anomalías relacionales",
        "explanation": "Cuando un principiante diseña una base de datos, suele cometer el error de meter toda la información en una sola tabla gigante y desordenada. Esto genera tres graves problemas conocidos como **anomalías**:\n\n1. **Anomalía de modificación (*Update Anomaly*):**\nSi el nombre de una carrera universitaria está repetido en 5,000 filas de estudiantes, cuando la carrera cambie de nombre tendrás que modificar 5,000 filas. Si una sola falla, la base de datos quedará con nombres contradictorios.\n\n2. **Anomalía de inserción (*Insertion Anomaly*):**\nSi para registrar una nueva carrera universitaria necesitas obligatoriamente los datos de un estudiante, ¡no podrás crear la carrera hasta que alguien se inscriba en ella!\n\n3. **Anomalía de eliminación (*Deletion Anomaly*):**\nSi el único estudiante inscrito en una carrera se da de baja y borras su fila, ¡borrarás accidentalmente toda la existencia de esa carrera en la universidad!",
        "codeSnippet": "-- Buen diseño: carreras identificadas de forma limpia y sin inconsistencias\nSELECT DISTINCT carrera FROM estudiantes;",
        "codeLanguage": "sql",
        "outputSnippet": "+------------------------+\n| carrera                |\n+------------------------+\n| Ingeniería de Software |\n| Ciencias Computación   |\n| Sistemas Información   |\n| Ciberseguridad         |\n+------------------------+\n4 rows in set (0.002 sec)",
        "byteTip": "Principio de la Fuente Única de Verdad (Single Source of Truth): cada dato del negocio debe vivir en un único lugar legítimo en toda la base de datos.",
        "pitfallTip": "Evita crear columnas como telefono_1, telefono_2, telefono_3 en una tabla; es un síntoma claro de mal diseño relacional.",
        "keyPoints": [
          "Las anomalías de diseño corrompen la fidelidad de los datos.",
          "La duplicación excesiva incrementa el tamaño del archivo de la base de datos.",
          "Separar entidades en tablas dedicadas erradica las tres anomalías."
        ]
      },
      {
        "title": "El principio de responsabilidad única en tablas",
        "explanation": "Cada tabla de tu base de datos debe representar **una sola cosa**:\n• Una tabla para `usuarios`.\n• Una tabla para `productos`.\n• Una tabla para `pedidos`.\n\nCuando las entidades están bien separadas, actualizar los datos de un cliente se hace en **una sola fila** y de forma instantánea:",
        "codeSnippet": "-- Verificamos la independencia y salud de nuestras entidades maestras\nSELECT COUNT(*) AS total_usuarios FROM usuarios;",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------+\n| total_usuarios |\n+----------------+\n| 5              |\n+----------------+\n1 row in set (0.001 sec)",
        "byteTip": "Diseñar entidades limpias en SQLite se traduce en clases Data Class de Kotlin hermosas y fáciles de mantener.",
        "pitfallTip": "No desnormalices tus tablas a menos que tengas un problema de rendimiento comprobado con millones de registros.",
        "keyPoints": [
          "Cada tabla debe tener una única responsabilidad bien definida.",
          "Facilita el mantenimiento y la evolución del esquema en el tiempo.",
          "Es el fundamento sobre el que se construye la normalización formal."
        ]
      }
    ]
  },
  "sql-u13-l02": {
    "id": "sql-th-u13-l02",
    "lessonId": "sql-u13-l02",
    "pathId": "sql",
    "unitId": 13,
    "levelId": 2,
    "title": "2. Normalización básica: 1FN, 2FN y 3FN",
    "subtitle": "Aprende las tres primeras formas normales (1FN, 2FN y 3FN) para estructurar tus tablas como un profesional.",
    "estimatedMinutes": 8,
    "analogy": "Ordenar tu armario de ropa: primero sacas los calcetines sucios del bolsillo de los pantalones (1FN); luego separas la ropa de invierno de la de verano (2FN); y finalmente pones cada prenda en su cajón etiquetado según su tipo (3FN).",
    "video": {
      "title": "Buen Diseño, Normalización (1FN, 2FN, 3FN) y Seguridad SQL",
      "channel": "Fazt Code",
      "duration": "53:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Evitar redundancias, formas normales, ALTER/DROP, vistas, índices y prevención de SQL Injection."
    },
    "sections": [
      {
        "title": "Las Tres Formas Normales de las bases de datos relacionales",
        "explanation": "La **normalización** es una técnica formal de diseño que organiza las columnas y tablas para eliminar la redundancia:\n\n1. **Primera Forma Normal (1FN) - Valores atómicos:**\n• Cada celda debe contener **un solo valor indivisible**.\n• Nada de guardar listas de teléfonos separadas por comas (`'8888-1111, 2222-3333'`) en una sola celda.\n• Nada de columnas repetitivas como `hijo1`, `hijo2`, `hijo3`.\n\n2. **Segunda Forma Normal (2FN) - Dependencia completa de la llave:**\n• Cumple con la 1FN.\n• Cada columna que no sea llave primaria debe depender de **toda** la llave primaria (aplica especialmente en llaves compuestas).\n\n3. **Tercera Forma Normal (3FN) - Sin dependencias transitivas:**\n• Cumple con la 2FN.\n• Ninguna columna debe depender de otra columna que no sea la llave primaria.\n• *Ejemplo:* Si en una tabla de empleados guardas el `departamento_id` y además el `nombre_departamento`, el nombre del departamento depende del departamento, no del empleado. Debe mudarse a su propia tabla `departamentos`.",
        "codeSnippet": "-- Estructura en 3FN: consultamos los datos relacionados sin redundancia interna\nSELECT e.nombre, a.nombre AS materia, m.nota_final\nFROM estudiantes AS e\nJOIN matriculas AS m ON e.id = m.estudiante_id\nJOIN asignaturas AS a ON m.asignatura_id = a.id\nLIMIT 2;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+---------------------+------------+\n| nombre          | materia             | nota_final |\n+-----------------+---------------------+------------+\n| Valeria Morales | Bases de Datos I    | 9.5        |\n| Valeria Morales | Programación Kotlin | 9.2        |\n+-----------------+---------------------+------------+\n2 rows in set (0.002 sec)",
        "byteTip": "La regla de oro de la normalización dice: \"Cada columna debe depender de la clave, de toda la clave, y de nada más que de la clave\".",
        "pitfallTip": "No te obsesiones con formas normales superiores (4FN o 5FN) en proyectos cotidianos; la 3FN es el estándar de oro en la industria.",
        "keyPoints": [
          "1FN exige que cada celda contenga un valor atómico único.",
          "2FN elimina dependencias parciales de claves compuestas.",
          "3FN erradica dependencias transitivas entre columnas no clave."
        ]
      },
      {
        "title": "Beneficios en el desarrollo de software móvil",
        "explanation": "Tener una base de datos en 3FN en Android ofrece ventajas inmediatas:\n• El archivo de base de datos de SQLite en el teléfono pesa mucho menos.\n• Las actualizaciones son seguras y no dejan registros contradictorios.\n• La sincronización con un servidor en la nube (*Cloud Sync*) es limpia y directa.",
        "codeSnippet": "-- Verificamos que las materias están perfectamente normalizadas e independientes\nSELECT id, nombre, creditos, departamento FROM asignaturas LIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+----------------------+----------+--------------+\n| id  | nombre               | creditos | departamento |\n+-----+----------------------+----------+--------------+\n| 101 | Bases de Datos I     | 4        | Informática  |\n| 102 | Estructuras de Datos | 5        | Informática  |\n| 103 | Programación Kotlin  | 4        | Informática  |\n+-----+----------------------+----------+--------------+\n3 rows in set (0.002 sec)",
        "byteTip": "En Room, normalizar tus tablas en 3FN te permite crear entidades @Entity limpias y reutilizables en múltiples pantallas.",
        "pitfallTip": "Guardar JSONs gigantes dentro de columnas TEXT de SQLite a veces es tentador, pero te impide consultar o indexar campos individuales de forma eficiente.",
        "keyPoints": [
          "Reduce el consumo de almacenamiento en el dispositivo.",
          "Permite un modelo de objetos limpio en la capa de Kotlin.",
          "Es el estándar universal de calidad en ingeniería de bases de datos."
        ]
      }
    ]
  },
  "sql-u13-l03": {
    "id": "sql-th-u13-l03",
    "lessonId": "sql-u13-l03",
    "pathId": "sql",
    "unitId": 13,
    "levelId": 3,
    "title": "3. ALTER TABLE",
    "subtitle": "Aprende a modificar esquemas existentes sin perder los datos de tus usuarios utilizando la sentencia ALTER TABLE.",
    "estimatedMinutes": 8,
    "analogy": "Remodelar una casa: construyes una nueva habitación o pintas la fachada exterior sin tener que demoler los cimientos ni sacar a los habitantes que ya viven adentro.",
    "video": {
      "title": "Buen Diseño, Normalización (1FN, 2FN, 3FN) y Seguridad SQL",
      "channel": "Fazt Code",
      "duration": "53:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Evitar redundancias, formas normales, ALTER/DROP, vistas, índices y prevención de SQL Injection."
    },
    "sections": [
      {
        "title": "Evolucionar esquemas sin destruir datos con ALTER TABLE",
        "explanation": "Cuando tu aplicación móvil se actualiza y añades una nueva función (por ejemplo, guardar la fecha de nacimiento de los usuarios o un estado booleano de suscripción), **no puedes borrar la tabla** porque los usuarios perderían todos sus datos existentes.\n\nPara modificar la estructura de una tabla que ya existe, usamos la sentencia **`ALTER TABLE`**.\n\nEn SQLite, `ALTER TABLE` permite dos operaciones principales:\n1. **`ADD COLUMN`**: Agrega una nueva columna a la tabla.\n   `ALTER TABLE usuarios ADD COLUMN telefono TEXT DEFAULT 'Sin teléfono';`\n   Todas las filas existentes recibirán automáticamente el valor por defecto configurado.\n\n2. **`RENAME TO`**: Cambia el nombre formal de una tabla.\n   `ALTER TABLE clientes RENAME TO clientes_antiguos;`",
        "codeSnippet": "-- Demostración de agregado de columna sin afectar los registros existentes\nALTER TABLE estudiantes ADD COLUMN observaciones TEXT DEFAULT 'Sin observaciones';\n\nSELECT id, nombre, observaciones FROM estudiantes LIMIT 2;",
        "codeLanguage": "sql",
        "outputSnippet": "Query OK, 0 rows affected (ALTER TABLE aplicado).\n+----+-----------------+-------------------+\n| id | nombre          | observaciones     |\n+----+-----------------+-------------------+\n| 1  | Valeria Morales | Sin observaciones |\n| 2  | Diego Fernández | Sin observaciones |\n+----+-----------------+-------------------+\n2 rows in set (0.002 sec)",
        "byteTip": "En SQLite moderno (a partir de la versión 3.35.0), también se soporta ALTER TABLE ... DROP COLUMN para eliminar columnas obsoletas.",
        "pitfallTip": "Al usar ADD COLUMN en SQLite con una restricción NOT NULL, debes proporcionar obligatoriamente un valor DEFAULT; de lo contrario fallará.",
        "keyPoints": [
          "ALTER TABLE modifica esquemas vivos sin destruir la información almacenada.",
          "ADD COLUMN añade nuevas propiedades a todas las filas existentes.",
          "RENAME TO permite cambiar el nombre de la tabla de forma instantánea."
        ]
      },
      {
        "title": "Migraciones de base de datos en Android con Room",
        "explanation": "En Android, cuando incrementas la versión de la base de datos (`version = 2`), creas un objeto `Migration` donde escribes sentencias `ALTER TABLE` para actualizar el archivo SQLite en los teléfonos de millones de usuarios sin que pierdan sus preferencias:",
        "codeSnippet": "-- Verificamos el esquema actualizado de la tabla estudiantes\nSELECT id, nombre, carrera, semestre FROM estudiantes LIMIT 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+------------------------+----------+\n| id | nombre          | carrera                | semestre |\n+----+-----------------+------------------------+----------+\n| 1  | Valeria Morales | Ingeniería de Software | 4        |\n+----+-----------------+------------------------+----------+\n1 row in set (0.001 sec)",
        "byteTip": "Room ofrece pruebas automáticas de migración (MigrationTestHelper) para validar que tus ALTER TABLE no rompan la app de tus usuarios.",
        "pitfallTip": "Nunca cambies la versión de Room sin proporcionar una estrategia de migración; de lo contrario Room borrará y recreará las tablas por defecto perdiendo los datos.",
        "keyPoints": [
          "ALTER TABLE es la columna vertebral de las migraciones de software.",
          "Garantiza que la evolución de tu app sea suave y transparente.",
          "Preserva los datos históricos del usuario entre versiones."
        ]
      }
    ]
  },
  "sql-u13-l04": {
    "id": "sql-th-u13-l04",
    "lessonId": "sql-u13-l04",
    "pathId": "sql",
    "unitId": 13,
    "levelId": 4,
    "title": "4. DROP TABLE",
    "subtitle": "Aprende a eliminar tablas de forma definitiva con DROP TABLE y cómo usar IF EXISTS para evitar caídas en scripts.",
    "estimatedMinutes": 8,
    "analogy": "Demoler un edificio viejo y limpiar el terreno con una topadora: el terreno queda completamente limpio y vacío, listo para una nueva construcción.",
    "video": {
      "title": "Buen Diseño, Normalización (1FN, 2FN, 3FN) y Seguridad SQL",
      "channel": "Fazt Code",
      "duration": "53:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Evitar redundancias, formas normales, ALTER/DROP, vistas, índices y prevención de SQL Injection."
    },
    "sections": [
      {
        "title": "Eliminación irreversible con DROP TABLE",
        "explanation": "Cuando una tabla temporal o de pruebas ya no se necesita, la instrucción **`DROP TABLE`** la elimina por completo de la base de datos:\n• Elimina todos los datos contenidos.\n• Elimina la estructura de columnas y tipos.\n• Elimina los índices y restricciones asociados a esa tabla.\n• Borra su definición del catálogo maestro de SQLite (`sqlite_master`).\n\nUso defensivo con **`IF EXISTS`**:\nSi intentas hacer `DROP TABLE` de una tabla que no existe, SQLite arrojará un error que detendrá la ejecución de tu script.\nPara evitarlo, añade siempre la cláusula preventiva:\n`DROP TABLE IF EXISTS nombre_tabla;`",
        "codeSnippet": "-- Eliminación segura y condicional de una tabla temporal\nDROP TABLE IF EXISTS tabla_temporal_logs;\n\nSELECT 'Tabla temporal descartada de forma segura' AS estado;",
        "codeLanguage": "sql",
        "outputSnippet": "Query OK, 0 rows affected (DROP TABLE ejecutado).\n+------------------------------------------------+\n| estado                                         |\n+------------------------------------------------+\n| Tabla temporal descartada de forma segura      |\n+------------------------------------------------+\n1 row in set (0.001 sec)",
        "byteTip": "DROP TABLE IF EXISTS es la primera línea que se coloca al inicio de scripts de pruebas automatizadas para garantizar un entorno limpio.",
        "pitfallTip": "DROP TABLE no tiene papelera de reciclaje: una vez ejecutado, no hay comando \"undo\"; si no tienes una copia de seguridad (backup), la pérdida es definitiva.",
        "keyPoints": [
          "DROP TABLE destruye la tabla, sus datos y sus índices asociados.",
          "IF EXISTS previene excepciones si la tabla ya había sido borrada antes.",
          "Es una sentencia DDL (Data Definition Language) de alto impacto."
        ]
      },
      {
        "title": "Recreación de esquemas en pruebas unitarias",
        "explanation": "En entornos de prueba (Unit Tests en Android con Robolectric o bases de datos SQLite en memoria), es común ejecutar `DROP TABLE IF EXISTS` y luego un `CREATE TABLE` para asegurarse de que cada prueba corra sobre un lienzo completamente limpio:",
        "codeSnippet": "-- Verificamos que nuestras tablas principales siguen intactas y saludables\nSELECT name FROM sqlite_master WHERE type='table' AND name IN ('usuarios', 'estudiantes');",
        "codeLanguage": "sql",
        "outputSnippet": "+-------------+\n| name        |\n+-------------+\n| usuarios    |\n| estudiantes |\n+-------------+\n2 rows in set (0.001 sec)",
        "byteTip": "En pruebas unitarias en Android, crear una base de datos en memoria (Room.inMemoryDatabaseBuilder) garantiza que se destruya sola al terminar el test.",
        "pitfallTip": "Si tienes llaves foráneas activas, SQLite impedirá hacer DROP TABLE de una tabla padre si todavía existen tablas hijas que dependan de ella.",
        "keyPoints": [
          "Permite limpiar tablas de prueba y migración.",
          "Respeta las restricciones de llaves foráneas si están activas.",
          "Es un comando fundamental en el ciclo de vida del desarrollo."
        ]
      }
    ]
  },
  "sql-u13-l05": {
    "id": "sql-th-u13-l05",
    "lessonId": "sql-u13-l05",
    "pathId": "sql",
    "unitId": 13,
    "levelId": 5,
    "title": "5. Introducción a vistas e índices",
    "subtitle": "Aprende a acelerar tus búsquedas al máximo con índices (CREATE INDEX) y a simplificar consultas complejas con vistas (CREATE VIEW).",
    "estimatedMinutes": 8,
    "analogy": "Un índice es el índice analítico al final de un libro de mil páginas: vas directo a la página exacta sin tener que leer el libro entero. Una vista es una ventana con marco en la pared que enfoca solo un paisaje hermoso, ocultando el cableado de la casa.",
    "video": {
      "title": "Buen Diseño, Normalización (1FN, 2FN, 3FN) y Seguridad SQL",
      "channel": "Fazt Code",
      "duration": "53:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Evitar redundancias, formas normales, ALTER/DROP, vistas, índices y prevención de SQL Injection."
    },
    "sections": [
      {
        "title": "Acelerar lecturas al instante con índices (CREATE INDEX)",
        "explanation": "Por defecto, si buscas un usuario por su correo electrónico en una tabla de un millón de filas sin índice:\n`SELECT * FROM usuarios WHERE email = 'ada@pioneers.org';`\nSQLite tiene que hacer un **recorrido completo de la tabla (*Full Table Scan*)**, leyendo un millón de registros uno por uno. Esto consume batería y hace lenta la aplicación móvil.\n\nUn **índice** crea una estructura de datos ordenada en disco (generalmente un Árbol-B) que permite al motor encontrar la fila exacta en tiempo logarítmico **O(log N)** en cuestión de microsegundos:\n\n`CREATE INDEX idx_usuarios_email ON usuarios(email);`\n\n¿Cuándo crear índices?\n• En columnas que uses frecuentemente en cláusulas `WHERE`.\n• En columnas de llaves foráneas que uses en `JOIN`.\n• En columnas que uses en `ORDER BY`.",
        "codeSnippet": "-- Búsqueda ultrarrápida indexada por carrera o categoría\nSELECT id, nombre, carrera\nFROM estudiantes\nWHERE carrera = 'Ingeniería de Software';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+------------------------+\n| id | nombre          | carrera                |\n+----+-----------------+------------------------+\n| 1  | Valeria Morales | Ingeniería de Software |\n| 5  | Lucía Navarro   | Ingeniería de Software |\n+----+-----------------+------------------------+\n2 rows in set (0.001 sec)",
        "byteTip": "Las llaves primarias (PRIMARY KEY) y las restricciones UNIQUE ya crean un índice interno automáticamente.",
        "pitfallTip": "No crees índices en todas las columnas sin motivo: cada índice hace que los INSERT y UPDATE sean un poco más lentos porque deben actualizar el árbol en disco.",
        "keyPoints": [
          "CREATE INDEX acelera las consultas WHERE y JOIN drásticamente.",
          "Transforma búsquedas secuenciales lentas en búsquedas logarítmicas inmediatas.",
          "Debe usarse de forma estratégica en columnas de alta consulta."
        ]
      },
      {
        "title": "Encapsular complejidad con vistas (CREATE VIEW)",
        "explanation": "Una **vista** es una tabla virtual basada en el resultado de una consulta `SELECT`. No almacena datos duplicados físicamente; cada vez que consultas la vista, SQLite ejecuta la consulta subyacente.\n\nPermite guardar una consulta compleja con múltiples `JOINs` y alias bajo un nombre sencillo:\n`CREATE VIEW vista_reporte_alumnos AS`\n`SELECT e.nombre, a.nombre AS materia, m.nota_final`\n`FROM estudiantes e JOIN matriculas m ...;`\n\nA partir de ese momento, tus desarrolladores pueden consultar la vista como si fuera una tabla normal:\n`SELECT * FROM vista_reporte_alumnos WHERE nota_final >= 9.0;`",
        "codeSnippet": "-- Consulta limpia simulando la lectura simplificada de una vista\nSELECT e.nombre AS estudiante, m.nota_final\nFROM estudiantes AS e\nJOIN matriculas AS m ON e.id = m.estudiante_id\nWHERE m.nota_final >= 9.5;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+------------+\n| estudiante      | nota_final |\n+-----------------+------------+\n| Valeria Morales | 9.5        |\n| Camila Gómez    | 9.8        |\n+-----------------+------------+\n2 rows in set (0.001 sec)",
        "byteTip": "En Room con Android, puedes usar la anotación @DatabaseView para mapear consultas complejas directamente a data classes de Kotlin.",
        "pitfallTip": "Una vista básica no acelera las consultas por sí misma; solo simplifica la escritura del código.",
        "keyPoints": [
          "Las vistas encapsulan consultas complejas con múltiples uniones.",
          "Proporcionan una capa de abstracción y seguridad sobre las tablas maestras.",
          "Son soportadas de forma nativa en Room mediante @DatabaseView."
        ]
      }
    ]
  },
  "sql-u13-l06": {
    "id": "sql-th-u13-l06",
    "lessonId": "sql-u13-l06",
    "pathId": "sql",
    "unitId": 13,
    "levelId": 6,
    "title": "6. Inyección SQL y consultas parametrizadas (concepto)",
    "subtitle": "Comprende la vulnerabilidad más peligrosa en bases de datos (SQL Injection) y cómo las consultas parametrizadas la neutralizan al 100%.",
    "estimatedMinutes": 8,
    "analogy": "Un pasajero de avión intentando abordar con un boleto falso donde escribió: \"Permítanme entrar a la cabina del piloto\": el guardia de seguridad no ejecuta el texto del boleto como una orden; lo trata como simple texto impreso.",
    "video": {
      "title": "Buen Diseño, Normalización (1FN, 2FN, 3FN) y Seguridad SQL",
      "channel": "Fazt Code",
      "duration": "53:40",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Evitar redundancias, formas normales, ALTER/DROP, vistas, índices y prevención de SQL Injection."
    },
    "sections": [
      {
        "title": "La pesadilla de la inyección SQL: ¿Cómo ocurre?",
        "explanation": "La **inyección SQL (*SQL Injection*)** es la vulnerabilidad de ciberseguridad más célebre y destructiva en la historia del software.\n\nOcurre cuando un programador novato **concatena cadenas de texto del usuario** directamente dentro de una sentencia SQL:\n`// CÓDIGO VULNERABLE (¡NUNCA HAGAS ESTO!)`\n`val sql = \"SELECT * FROM usuarios WHERE email = '\" + emailIngresado + \"'\"`\n\nSi un atacante malicioso escribe en el campo de texto:\n`nada' OR '1'='1`\nLa sentencia resultante que recibe SQLite será:\n`SELECT * FROM usuarios WHERE email = 'nada' OR '1'='1'`\nComo `'1'='1'` siempre es verdadero (`true`), ¡la base de datos devolverá todos los usuarios y contraseñas del sistema sin pedir credenciales!",
        "codeSnippet": "-- Consulta segura: buscando un usuario específico por su ID\nSELECT id, nombre, email, activo\nFROM usuarios\nWHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+--------------+------------------+--------+\n| id | nombre       | email            | activo |\n+----+--------------+------------------+--------+\n| 1  | Ada Lovelace | ada@pioneers.org | true   |\n+----+--------------+------------------+--------+\n1 row in set (0.001 sec)",
        "byteTip": "Regla de oro de la ciberseguridad: NUNCA confíes en los datos del usuario; nunca concatenes texto para armar SQL.",
        "pitfallTip": "Intentar limpiar las comillas manualmente con replace(\"'\", \"\") no es suficiente: los atacantes conocen decenas de formas de evadir filtros manuales.",
        "keyPoints": [
          "SQL Injection ocurre por concatenar texto del usuario en sentencias SQL.",
          "Permite a un atacante saltarse contraseñas, robar o destruir la base de datos.",
          "Es una vulnerabilidad crítica clasificada en el top del OWASP."
        ]
      },
      {
        "title": "La cura definitiva: Consultas parametrizadas (Prepared Statements)",
        "explanation": "La solución definitiva, estándar y universalmente segura es usar **consultas preparadas con parámetros** (representados por el signo de interrogación **`?`** o parámetros con dos puntos **`:param`**):\n\n`// EN ANDROID CON SQLITE NATIVO (100% SEGURO):`\n`db.rawQuery(\"SELECT * FROM usuarios WHERE email = ? AND password = ?\", arrayOf(email, pass))`\n\n`// EN ANDROID CON ROOM (100% SEGURO Y COMPILADO):`\n`@Query(\"SELECT * FROM usuarios WHERE email = :email AND password = :pass\")`\n`fun login(email: String, pass: String): Usuario?`\n\n¿Por qué es invulnerable?\nPorque el motor de base de datos compila la estructura de la consulta **antes** de recibir los valores. El texto ingresado por el usuario se trata estrictamente como un dato plano literal, jamás como código ejecutable. Si el atacante escribe `' OR '1'='1`, SQLite buscará literalmente a un usuario cuyo correo sea exactamente esa frase sin causarle ningún daño al sistema.",
        "codeSnippet": "-- Consulta parametrizada conceptual: los datos se aíslan completamente de la lógica\nSELECT id, nombre, email\nFROM usuarios\nWHERE email = 'ada@pioneers.org' AND activo = true;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+--------------+------------------+\n| id | nombre       | email            |\n+----+--------------+------------------+\n| 1  | Ada Lovelace | ada@pioneers.org |\n+----+--------------+------------------+\n1 row in set (0.001 sec)",
        "byteTip": "Room en Android usa consultas parametrizadas por defecto en todas sus anotaciones @Query; te protege automáticamente.",
        "pitfallTip": "Cuidado con crear consultas dinámicas uniendo Strings incluso dentro de librerías modernas; usa siempre bind variables (?, :variable).",
        "keyPoints": [
          "Las consultas preparadas separan la sintaxis SQL de los datos del usuario.",
          "El motor trata la entrada del atacante como un simple valor de texto inocuo.",
          "Room y SQLite proporcionan inmunidad total contra SQL Injection cuando se usan parámetros."
        ]
      }
    ]
  }
};
