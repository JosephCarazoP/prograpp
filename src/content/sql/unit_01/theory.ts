import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_01_THEORY: Record<string, TheoryLesson> = {
  "sql-u01-l01": {
    "id": "sql-th-u01-l01",
    "lessonId": "sql-u01-l01",
    "pathId": "sql",
    "unitId": 1,
    "levelId": 1,
    "title": "1. Datos e información",
    "subtitle": "Comprende cómo los datos crudos se transforman en información valiosa para tomar decisiones.",
    "estimatedMinutes": 8,
    "analogy": "Los datos son granos de café crudos recién cosechados. La información es una taza de café expreso caliente, aromática y lista para degustar en la mesa.",
    "video": {
      "title": "Fundamentos de Bases de Datos Relacionales",
      "channel": "Fazt Code",
      "duration": "1:12:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Qué es una base de datos, arquitectura relacional, tablas, columnas, registros y SQLite."
    },
    "sections": [
      {
        "title": "Datos e información: la diferencia fundamental",
        "explanation": "A diario escuchamos las palabras \"datos\" e \"información\" como si fueran sinónimos, pero en informática tienen una distinción crucial:\n\n• **Dato:** Es un valor primario, crudo y sin procesar (ejemplo: el número `38`, la palabra `\"Rojo\"` o la fecha `15/03`). Por sí solo, no tiene contexto ni nos dice mucho. ¿El 38 es una talla de zapato? ¿La temperatura en grados Celsius? ¿O el precio de un menú?\n• **Información:** Es el conjunto de **datos organizados, contextualizados y procesados** con un significado claro que reduce la incertidumbre y permite tomar decisiones inteligentes en una aplicación.\n\nEn una base de datos relacional, almacenamos datos ordenados en columnas con significado para consultar información relevante al instante.",
        "codeSnippet": "-- Consultamos estudiantes destacados para transformar datos en información útil\nSELECT nombre, carrera, promedio\nFROM estudiantes\nWHERE promedio >= 9.0;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+------------------------+----------+\n| nombre          | carrera                | promedio |\n+-----------------+------------------------+----------+\n| Valeria Morales | Ingeniería de Software | 9.4      |\n| Camila Gómez    | Sistemas de Información| 9.7      |\n| Lucía Navarro   | Ingeniería de Software | 9.1      |\n+-----------------+------------------------+----------+\n3 filas devueltas",
        "byteTip": "En SQL, las palabras clave (como SELECT, FROM, WHERE) se escriben tradicionalmente en MAYÚSCULAS para distinguirlas fácilmente de los nombres de tus tablas y columnas.",
        "pitfallTip": "Guardar datos desordenados en hojas de cálculo sin validaciones provoca duplicados, errores de tipeo y datos inconsistentes.",
        "keyPoints": [
          "Un dato es una unidad aislada sin contexto; la información es el dato contextualizado.",
          "Las bases de datos estructuran los datos para extraer información al instante.",
          "Escribir palabras clave SQL en mayúsculas mejora notablemente la legibilidad."
        ]
      },
      {
        "title": "Por qué las apps móviles necesitan bases de datos",
        "explanation": "En Android, los datos no pueden vivir solo en la memoria RAM porque cuando el usuario apaga el teléfono o cierra la app, la RAM se borra por completo.\n\nPara que los datos sobrevivan y estén disponibles la próxima vez que abras la app, se almacenan de forma **persistente** en un motor de base de datos embebido: **SQLite**.",
        "codeSnippet": "-- Obtenemos el total de estudiantes inscritos y el promedio general del grupo\nSELECT COUNT(*) AS total_estudiantes, AVG(promedio) AS promedio_general\nFROM estudiantes;",
        "codeLanguage": "sql",
        "outputSnippet": "+-------------------+------------------+\n| total_estudiantes | promedio_general |\n+-------------------+------------------+\n| 5                 | 9.04             |\n+-------------------+------------------+\n1 fila devuelta",
        "byteTip": "AS permite renombrar temporalmente una columna en el resultado de la consulta para que el reporte sea fácil de leer (Alias).",
        "pitfallTip": "No uses archivos de texto plano (.txt) para guardar información estructurada; son lentos de buscar y se corrompen si se va la energía.",
        "keyPoints": [
          "La persistencia garantiza que los datos no se pierdan al cerrar la app.",
          "SQLite es el motor nativo de bases de datos integrado en todos los dispositivos Android.",
          "Las consultas SQL permiten calcular estadísticas de miles de registros en milisegundos."
        ]
      }
    ]
  },
  "sql-u01-l02": {
    "id": "sql-th-u01-l02",
    "lessonId": "sql-u01-l02",
    "pathId": "sql",
    "unitId": 1,
    "levelId": 2,
    "title": "2. Qué es una base de datos y para qué sirve",
    "subtitle": "Descubre qué es un Sistema Gestor de Bases de Datos (SGBD) y por qué supera a los archivos tradicionales.",
    "estimatedMinutes": 8,
    "analogy": "Un archivo bibliotecario inteligente: no solo guarda millones de libros en estanterías blindadas contra incendios, sino que te entrega el libro exacto en un milisegundo en cuanto le dices el título.",
    "video": {
      "title": "Fundamentos de Bases de Datos Relacionales",
      "channel": "Fazt Code",
      "duration": "1:12:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Qué es una base de datos, arquitectura relacional, tablas, columnas, registros y SQLite."
    },
    "sections": [
      {
        "title": "¿Qué es una base de datos y un SGBD?",
        "explanation": "Una **base de datos** es un contenedor digital organizado que almacena grandes volúmenes de datos relacionados de forma estructurada, segura y duradera.\n\nEl software que se encarga de administrar, proteger, consultar y modificar esa base de datos se llama **SGBD** (Sistema Gestor de Bases de Datos) o **DBMS** (*Database Management System*).\n\nVentajas clave de un SGBD frente a guardar datos en archivos comunes:\n• **Velocidad de búsqueda:** Encuentra un registro entre millones en milésimas de segundo gracias a índices optimizados.\n• **Concurrencia:** Cientos o miles de usuarios pueden leer y escribir datos al mismo tiempo sin trabar el sistema.\n• **Seguridad e integridad:** Evita que se guarden datos corruptos o incompletos.\n• **Persistencia blindada:** Los datos sobreviven a fallas de energía o caídas del sistema.",
        "codeSnippet": "-- Verificamos las asignaturas universitarias registradas en la base de datos\nSELECT id, nombre, creditos, departamento\nFROM asignaturas;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+-----------------------+----------+--------------------+\n| id  | nombre                | creditos | departamento       |\n+-----+-----------------------+----------+--------------------+\n| 101 | Bases de Datos I      | 4        | Informática        |\n| 102 | Estructuras de Datos  | 5        | Informática        |\n| 103 | Programación Kotlin   | 4        | Informática        |\n| 104 | Cálculo Diferencial   | 4        | Matemáticas        |\n| 105 | Redes de Computadoras | 4        | Telecomunicaciones |\n+-----+-----------------------+----------+--------------------+\n5 filas devueltas",
        "byteTip": "Cada fila en el resultado representa un registro independiente con todas sus características ordenadas en columnas.",
        "pitfallTip": "Intentar manejar sistemas multiusuario con archivos de Excel compartidos provoca bloqueos de archivo y pérdida de información.",
        "keyPoints": [
          "Un SGBD administra el almacenamiento y las consultas con alta velocidad.",
          "Separa el almacenamiento físico de la consulta lógica de datos.",
          "Soporta accesos concurrentes de múltiples usuarios e hilos sin conflictos."
        ]
      },
      {
        "title": "El lenguaje universal: SQL",
        "explanation": "Para comunicarte con casi cualquier SGBD del planeta (como SQLite, PostgreSQL, MySQL o SQL Server), se utiliza un lenguaje estándar: **SQL** (*Structured Query Language* / Lenguaje de Consulta Estructurado).\n\nA diferencia de Kotlin, que es un lenguaje imperativo (le dices a la máquina paso a paso *cómo* hacer algo), SQL es un lenguaje **declarativo**: le describes a la base de datos *qué* información deseas obtener, y el motor optimizador decide el camino interno más rápido para entregártela.",
        "codeSnippet": "-- Pedimos asignaturas del departamento de Informática\nSELECT nombre, creditos\nFROM asignaturas\nWHERE departamento = 'Informática';",
        "codeLanguage": "sql",
        "outputSnippet": "+---------------------+----------+\n| nombre              | creditos |\n+---------------------+----------+\n| Bases de Datos I    | 4        |\n| Estructuras de Datos| 5        |\n| Programación Kotlin | 4        |\n+---------------------+----------+\n3 filas devueltas",
        "byteTip": "En SQL, los textos literales se encierran siempre entre comillas simples ('Informática'), no dobles.",
        "pitfallTip": "Usar comillas dobles en SQL para textos puede confundirse en algunos motores con nombres de columnas.",
        "keyPoints": [
          "SQL es el estándar mundial para consultar bases de datos relacionales.",
          "Es declarativo: pides qué datos quieres y el motor optimiza la búsqueda.",
          "Aprender SQL te sirve tanto para apps móviles como para servidores gigantes en la nube."
        ]
      }
    ]
  },
  "sql-u01-l03": {
    "id": "sql-th-u01-l03",
    "lessonId": "sql-u01-l03",
    "pathId": "sql",
    "unitId": 1,
    "levelId": 3,
    "title": "3. Bases de datos relacionales",
    "subtitle": "Descubre el modelo relacional: cómo conectar diferentes tablas mediante identificadores comunes.",
    "estimatedMinutes": 8,
    "analogy": "Un álbum de estampillas numeradas: en la página de jugadores tienes la foto con su número (ID). En la página de estadísticas no vuelves a pegar la foto; solo escribes el número de jugador y sus goles anotados. Ambos datos se relacionan por el número.",
    "video": {
      "title": "Fundamentos de Bases de Datos Relacionales",
      "channel": "Fazt Code",
      "duration": "1:12:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Qué es una base de datos, arquitectura relacional, tablas, columnas, registros y SQLite."
    },
    "sections": [
      {
        "title": "El modelo relacional",
        "explanation": "Propuesto por el matemático Edgar F. Codd en 1970, el **modelo relacional** es el estándar más exitoso de la historia de la informática para organizar datos.\n\nSu principio central es muy intuitivo:\n1. La información se divide en **tablas independientes**, donde cada tabla representa una sola entidad de la vida real (por ejemplo: una tabla para `estudiantes` y otra para `asignaturas`).\n2. Las tablas se conectan entre sí mediante **relaciones lógicas** usando identificadores comunes (claves o llaves).\n3. Esto evita duplicar información y garantiza que si un dato cambia, se actualice en un único lugar.",
        "codeSnippet": "-- Consultamos las matrículas que vinculan estudiantes con asignaturas\nSELECT id, estudiante_id, asignatura_id, periodo, nota_final\nFROM matriculas;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+---------------+---------------+---------+------------+\n| id | estudiante_id | asignatura_id | periodo | nota_final |\n+----+---------------+---------------+---------+------------+\n| 1  | 1             | 101           | 2024-1  | 9.5        |\n| 2  | 1             | 103           | 2024-1  | 9.2        |\n| 3  | 2             | 101           | 2024-1  | 8.7        |\n| 4  | 2             | 102           | 2024-1  | 8.9        |\n+----+---------------+---------------+---------+------------+\n4 filas devueltas",
        "byteTip": "Observa cómo estudiante_id = 1 hace referencia al estudiante #1 (Valeria Morales) sin tener que repetir su nombre y correo en cada matrícula.",
        "pitfallTip": "Meter todos los datos en una sola tabla gigante (\"tabla sábana\") genera redundancia y pesadillas de actualización.",
        "keyPoints": [
          "El modelo relacional organiza datos en tablas especializadas conectadas.",
          "Evita la duplicación innecesaria de información.",
          "Es la base de la integridad y escalabilidad en sistemas de software."
        ]
      },
      {
        "title": "Integridad de datos en el modelo relacional",
        "explanation": "Si un estudiante cambia de carrera o de correo, solo modificamos su fila en la tabla `estudiantes`. Todas las matrículas, pagos y notas asociadas se mantienen automáticamente actualizadas y coherentes:",
        "codeSnippet": "-- Consultamos los datos personales del estudiante #1\nSELECT id, nombre, carrera\nFROM estudiantes\nWHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+------------------------+\n| id | nombre          | carrera                |\n+----+-----------------+------------------------+\n| 1  | Valeria Morales | Ingeniería de Software |\n+----+-----------------+------------------------+\n1 fila devuelta",
        "byteTip": "Consultar por id es la operación más rápida posible en una base de datos relacional.",
        "pitfallTip": "No relaciones tablas mediante textos largos o nombres que puedan cambiar con el tiempo; usa siempre identificadores numéricos fijos.",
        "keyPoints": [
          "La separación relacional centraliza las actualizaciones en un solo registro.",
          "Previene inconsistencias donde un dato aparece actualizado en un lado y desactualizado en otro.",
          "Facilita el mantenimiento a largo plazo."
        ]
      }
    ]
  },
  "sql-u01-l04": {
    "id": "sql-th-u01-l04",
    "lessonId": "sql-u01-l04",
    "pathId": "sql",
    "unitId": 1,
    "levelId": 4,
    "title": "4. Tablas, columnas y filas",
    "subtitle": "Aprende la anatomía exacta de una tabla relacional: tablas, columnas (atributos) y filas (registros).",
    "estimatedMinutes": 8,
    "analogy": "Una cuadrícula de hoja de cálculo: el nombre de la pestaña es la Tabla, los encabezados verticales son las Columnas (qué tipo de dato se guarda) y cada renglón horizontal es una Fila (un registro individual).",
    "video": {
      "title": "Fundamentos de Bases de Datos Relacionales",
      "channel": "Fazt Code",
      "duration": "1:12:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Qué es una base de datos, arquitectura relacional, tablas, columnas, registros y SQLite."
    },
    "sections": [
      {
        "title": "Tablas, columnas y filas",
        "explanation": "Toda base de datos relacional se compone de tres elementos arquitectónicos básicos:\n\n1. **Tabla (Entidad):** La estructura que agrupa datos sobre un mismo tema (ej: `usuarios`, `productos`, `pedidos`).\n2. **Columna (Atributo o Campo):** La dimensión vertical. Define una característica específica del elemento (ej: `email`, `precio`, `fecha_ingreso`). Cada columna tiene un nombre y un tipo de dato fijo.\n3. **Fila (Registro o Tupla):** La dimensión horizontal. Representa un elemento real y completo guardado en la tabla (ej: la fila del usuario Juan con todos sus datos).",
        "codeSnippet": "-- Inspeccionamos todas las columnas y filas de la tabla de usuarios\nSELECT id, nombre, email, edad, pais, activo\nFROM usuarios;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-------------------+--------------------+------+---------------+--------+\n| id | nombre            | email              | edad | pais          | activo |\n+----+-------------------+--------------------+------+---------------+--------+\n| 1  | Ada Lovelace      | ada@pioneers.org   | 36   | Reino Unido   | true   |\n| 2  | Alan Turing       | alan@bletchley.org | 41   | Reino Unido   | true   |\n| 3  | Grace Hopper      | grace@navy.mil     | 85   | Estados Unidos| false  |\n| 4  | Linus Torvalds    | linus@linux.org    | 54   | Finlandia     | true   |\n| 5  | Margaret Hamilton | margaret@nasa.gov  | 87   | Estados Unidos| true   |\n+----+-------------------+--------------------+------+---------------+--------+\n5 filas devueltas",
        "byteTip": "Cada celda en la intersección de una fila y una columna contiene un único valor atómico.",
        "pitfallTip": "Nunca guardes listas de valores separadas por comas dentro de una sola celda (como guardar tres teléfonos en un solo campo). Viola la primera forma normal.",
        "keyPoints": [
          "La tabla es el contenedor de la entidad.",
          "Las columnas definen la estructura y tipos de datos.",
          "Las filas contienen los registros individuales de información."
        ]
      },
      {
        "title": "Columnas calculadas y proyección de campos",
        "explanation": "No tienes por qué pedir siempre todas las columnas. Puedes proyectar solo las que necesitas y calcular nuevos datos al vuelo:",
        "codeSnippet": "-- Consultamos nombre y calculamos el año aproximado de nacimiento\nSELECT nombre, (2024 - edad) AS anio_nacimiento_aprox\nFROM usuarios\nWHERE activo = true;",
        "codeLanguage": "sql",
        "outputSnippet": "+-------------------+-----------------------+\n| nombre            | anio_nacimiento_aprox |\n+-------------------+-----------------------+\n| Ada Lovelace      | 1988                  |\n| Alan Turing       | 1983                  |\n| Linus Torvalds    | 1970                  |\n| Margaret Hamilton | 1937                  |\n+-------------------+-----------------------+\n4 filas devueltas",
        "byteTip": "Al pedir solo las columnas necesarias, la base de datos transfiere menos bytes por la red y responde mucho más rápido.",
        "pitfallTip": "Abusar de SELECT * en apps de producción desperdicia memoria RAM en el dispositivo móvil.",
        "keyPoints": [
          "Proyectar columnas específicas ahorra memoria y ancho de banda.",
          "Las expresiones aritméticas en el SELECT crean columnas virtuales calculadas.",
          "Los alias (AS) dan nombres descriptivos a los resultados calculados."
        ]
      }
    ]
  },
  "sql-u01-l05": {
    "id": "sql-th-u01-l05",
    "lessonId": "sql-u01-l05",
    "pathId": "sql",
    "unitId": 1,
    "levelId": 5,
    "title": "5. Estructura de una tabla frente a sus registros",
    "subtitle": "Distingue claramente entre el esquema estructural de una tabla y los registros almacenados en ella.",
    "estimatedMinutes": 8,
    "analogy": "El plano de una casa (esquema) frente a los muebles y habitantes que viven adentro (datos). Puedes pintar o cambiar los muebles todos los días sin modificar los planos de concreto de la casa.",
    "video": {
      "title": "Fundamentos de Bases de Datos Relacionales",
      "channel": "Fazt Code",
      "duration": "1:12:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Qué es una base de datos, arquitectura relacional, tablas, columnas, registros y SQLite."
    },
    "sections": [
      {
        "title": "Estructura (Esquema) vs Registros (Datos)",
        "explanation": "En bases de datos se divide el mundo en dos niveles:\n\n1. **El Esquema (Estructura / DDL):**\nEs la definición formal de cómo está construida la tabla: cómo se llama, qué columnas tiene, qué tipos de datos acepta y qué restricciones aplican. Rara vez cambia una vez creada la aplicación.\n• Se gestiona con sentencias **DDL** (*Data Definition Language*), como `CREATE TABLE`, `ALTER TABLE` y `DROP TABLE`.\n\n2. **Los Registros (Datos / DML):**\nSon los valores reales guardados adentro. Cambian constantemente a medida que los usuarios usan la app: se agregan nuevos usuarios, se editan contraseñas o se borran pedidos.\n• Se gestionan con sentencias **DML** (*Data Manipulation Language*), como `SELECT`, `INSERT`, `UPDATE` y `DELETE`.",
        "codeSnippet": "-- Consultamos los registros que residen actualmente dentro de la estructura de empleados\nSELECT id, nombre, departamento, salario\nFROM empleados;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+----------------+--------------+---------+\n| id  | nombre         | departamento | salario |\n+-----+----------------+--------------+---------+\n| 101 | Carlos Mendoza | Ingeniería   | 3200.0  |\n| 102 | Elena Rostova  | Diseño UX    | 2850.5  |\n| 103 | Mateo Díaz     | Sistemas     | 3100.0  |\n| 104 | Sofía Valerio  | Dirección    | 4500.0  |\n| 105 | Andrés Solano  | Soporte      | 1900.0  |\n+-----+----------------+--------------+---------+\n5 filas devueltas",
        "byteTip": "Si borras todos los registros con DELETE, la estructura de la tabla (columnas y tipos) sigue existiendo lista para recibir nuevos datos.",
        "pitfallTip": "Confundir DROP TABLE (que destruye la estructura y los datos por completo) con DELETE FROM (que solo borra los registros).",
        "keyPoints": [
          "DDL define y modifica la estructura (tablas, columnas, tipos).",
          "DML manipula los registros de datos (consultar, insertar, modificar, borrar).",
          "La estructura es estable; los datos son dinámicos."
        ]
      },
      {
        "title": "Inspeccionar el esquema de una tabla en SQLite",
        "explanation": "En SQLite puedes consultar la tabla del sistema `sqlite_master` para ver el código SQL exacto con el que fue creada cualquier tabla:",
        "codeSnippet": "-- Consultamos la estructura DDL de la tabla empleados en el catálogo del sistema\nSELECT sql \nFROM sqlite_master \nWHERE type = 'table' AND name = 'empleados';",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------------------------------------------------------------------------------------------------------------------+\n| sql                                                                                                                         |\n+-----------------------------------------------------------------------------------------------------------------------------+\n| CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, salario REAL, fecha_ingreso DATE, activo BOOLEAN) |\n+-----------------------------------------------------------------------------------------------------------------------------+\n1 fila devuelta",
        "byteTip": "sqlite_master es la bitácora interna donde SQLite recuerda todos tus esquemas, índices y vistas.",
        "pitfallTip": "No intentes modificar directamente sqlite_master con UPDATE; usa siempre las sentencias oficiales ALTER o DROP.",
        "keyPoints": [
          "El esquema almacena la metadata que valida cada inserción.",
          "SQLite mantiene el registro de todas las tablas en sqlite_master.",
          "Comprender la diferencia entre DDL y DML previene errores graves de borrado de esquemas."
        ]
      }
    ]
  },
  "sql-u01-l06": {
    "id": "sql-th-u01-l06",
    "lessonId": "sql-u01-l06",
    "pathId": "sql",
    "unitId": 1,
    "levelId": 6,
    "title": "6. Diferencia entre SQL y SQLite",
    "subtitle": "Comprende la diferencia entre el estándar universal SQL y el motor ligero embebido SQLite.",
    "estimatedMinutes": 8,
    "analogy": "El español es el idioma universal (SQL). El acento local de una ciudad específica con sus modismos optimizados para el día a día es SQLite. Si sabes hablar español, te entienden en todo el mundo.",
    "video": {
      "title": "Fundamentos de Bases de Datos Relacionales",
      "channel": "Fazt Code",
      "duration": "1:12:00",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Qué es una base de datos, arquitectura relacional, tablas, columnas, registros y SQLite."
    },
    "sections": [
      {
        "title": "SQL frente a SQLite",
        "explanation": "Es muy común escuchar ambos términos juntos, pero representan dos cosas distintas:\n\n• **SQL:** Es el **lenguaje estándar internacional** (definido por ANSI e ISO). Es el conjunto de reglas y sintaxis que todos los motores de bases de datos entienden (`SELECT`, `WHERE`, `JOIN`).\n• **SQLite:** Es un **motor de base de datos específico**, ultra-ligero y embebido, escrito en lenguaje C por D. Richard Hipp en el año 2000.\n\n¿Por qué SQLite es el rey de los dispositivos móviles?\n1. **Sin servidor (Serverless):** No necesita instalar un programa de servidor corriendo en segundo plano ni configurar usuarios o puertos de red.\n2. **Un solo archivo:** Toda la base de datos se guarda en un único archivo físico dentro del teléfono (`.db` o `.sqlite`).\n3. **Embebido en Android e iOS:** Cada teléfono Android del mundo viene con SQLite preinstalado de fábrica.",
        "codeSnippet": "-- Consultamos la versión del motor SQLite que está ejecutando nuestras sentencias\nSELECT sqlite_version() AS version_motor_sqlite;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------------+\n| version_motor_sqlite  |\n+-----------------------+\n| 3.42.0                |\n+-----------------------+\n1 fila devuelta",
        "byteTip": "SQLite es la base de datos más utilizada del mundo: está en miles de millones de teléfonos, televisores, navegadores web y automóviles.",
        "pitfallTip": "SQLite está optimizado para apps móviles y sistemas locales; no está pensado para sitios web con miles de escrituras por segundo simultáneas (para eso se usa PostgreSQL).",
        "keyPoints": [
          "SQL es el lenguaje universal; SQLite es la biblioteca de software que lo implementa.",
          "SQLite no requiere servidor y guarda todo en un solo archivo local.",
          "Android utiliza SQLite como motor de almacenamiento predeterminado para Room."
        ]
      },
      {
        "title": "SQLite en Android con Room Database",
        "explanation": "En el desarrollo oficial para Android con Kotlin, Google creó la biblioteca **Room**:\nRoom es una capa moderna construida sobre SQLite que valida tus consultas SQL en tiempo de compilación y traduce las filas de SQLite directamente a objetos `data class` de Kotlin. ¡Todo lo que aprendes de SQL aquí se aplica directamente en Room!",
        "codeSnippet": "-- En una app Android, una consulta simple como esta alimenta la pantalla principal\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE stock > 0\nORDER BY precio ASC;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+------------------------------+--------+-------+\n| id | nombre                       | precio | stock |\n+----+------------------------------+--------+-------+\n| 5  | Cable HDMI 2.1 Braided       | 14.99  | 150   |\n| 3  | Mouse Ergonómico Pro         | 49.9   | 80    |\n| 1  | Teclado Mecánico RGB         | 89.99  | 45    |\n| 4  | Auriculares Cancelación Ruido| 129.0  | 25    |\n| 2  | Monitor Ultrawide 34\"        | 429.5  | 12    |\n+----+------------------------------+--------+-------+\n5 filas devueltas",
        "byteTip": "ORDER BY precio ASC ordena los productos del más económico al más costoso de forma automática.",
        "pitfallTip": "No crees conexiones manuales crudas si usas Room; Room administra las conexiones a SQLite por ti de forma segura.",
        "keyPoints": [
          "Room traduce consultas SQLite a objetos de Kotlin.",
          "Aprender SQL puro te da el control total para optimizar Room en Android.",
          "Las consultas declarativas son rápidas, limpias y altamente eficientes."
        ]
      }
    ]
  }
};
