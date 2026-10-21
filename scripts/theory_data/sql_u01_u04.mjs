// Módulo de teoría enriquecida para SQL: Unidades 1, 2, 3 y 4
// Redactado en español latinoamericano (es-419) con tono claro, amigable y pedagógico
// Siguiendo los estándares oficiales de Android Developers (SQLite y Room)

export const SQL_THEORY_U01_U04 = {
  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 1: FUNDAMENTOS DE BASES DE DATOS
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u01-l01': {
    subtitle: 'Comprende cómo los datos crudos se transforman en información valiosa para tomar decisiones.',
    analogy: 'Los datos son granos de café crudos recién cosechados. La información es una taza de café expreso caliente, aromática y lista para degustar en la mesa.',
    sections: [
      {
        title: 'Datos e información: la diferencia fundamental',
        explanation: `A diario escuchamos las palabras "datos" e "información" como si fueran sinónimos, pero en informática tienen una distinción crucial:

• **Dato:** Es un valor primario, crudo y sin procesar (ejemplo: el número \`38\`, la palabra \`"Rojo"\` o la fecha \`15/03\`). Por sí solo, no tiene contexto ni nos dice mucho. ¿El 38 es una talla de zapato? ¿La temperatura en grados Celsius? ¿O el precio de un menú?
• **Información:** Es el conjunto de **datos organizados, contextualizados y procesados** con un significado claro que reduce la incertidumbre y permite tomar decisiones inteligentes en una aplicación.

En una base de datos relacional, almacenamos datos ordenados en columnas con significado para consultar información relevante al instante.`,
        codeSnippet: `-- Consultamos estudiantes destacados para transformar datos en información útil\nSELECT nombre, carrera, promedio\nFROM estudiantes\nWHERE promedio >= 9.0;`,
        outputSnippet: `+-----------------+------------------------+----------+\n| nombre          | carrera                | promedio |\n+-----------------+------------------------+----------+\n| Valeria Morales | Ingeniería de Software | 9.4      |\n| Camila Gómez    | Sistemas de Información| 9.7      |\n| Lucía Navarro   | Ingeniería de Software | 9.1      |\n+-----------------+------------------------+----------+\n3 filas devueltas`,
        byteTip: 'En SQL, las palabras clave (como SELECT, FROM, WHERE) se escriben tradicionalmente en MAYÚSCULAS para distinguirlas fácilmente de los nombres de tus tablas y columnas.',
        pitfallTip: 'Guardar datos desordenados en hojas de cálculo sin validaciones provoca duplicados, errores de tipeo y datos inconsistentes.',
        keyPoints: [
          'Un dato es una unidad aislada sin contexto; la información es el dato contextualizado.',
          'Las bases de datos estructuran los datos para extraer información al instante.',
          'Escribir palabras clave SQL en mayúsculas mejora notablemente la legibilidad.'
        ]
      },
      {
        title: 'Por qué las apps móviles necesitan bases de datos',
        explanation: `En Android, los datos no pueden vivir solo en la memoria RAM porque cuando el usuario apaga el teléfono o cierra la app, la RAM se borra por completo.

Para que los datos sobrevivan y estén disponibles la próxima vez que abras la app, se almacenan de forma **persistente** en un motor de base de datos embebido: **SQLite**.`,
        codeSnippet: `-- Obtenemos el total de estudiantes inscritos y el promedio general del grupo\nSELECT COUNT(*) AS total_estudiantes, AVG(promedio) AS promedio_general\nFROM estudiantes;`,
        outputSnippet: `+-------------------+------------------+\n| total_estudiantes | promedio_general |\n+-------------------+------------------+\n| 5                 | 9.04             |\n+-------------------+------------------+\n1 fila devuelta`,
        byteTip: 'AS permite renombrar temporalmente una columna en el resultado de la consulta para que el reporte sea fácil de leer (Alias).',
        pitfallTip: 'No uses archivos de texto plano (.txt) para guardar información estructurada; son lentos de buscar y se corrompen si se va la energía.',
        keyPoints: [
          'La persistencia garantiza que los datos no se pierdan al cerrar la app.',
          'SQLite es el motor nativo de bases de datos integrado en todos los dispositivos Android.',
          'Las consultas SQL permiten calcular estadísticas de miles de registros en milisegundos.'
        ]
      }
    ]
  },

  'sql-u01-l02': {
    subtitle: 'Descubre qué es un Sistema Gestor de Bases de Datos (SGBD) y por qué supera a los archivos tradicionales.',
    analogy: 'Un archivo bibliotecario inteligente: no solo guarda millones de libros en estanterías blindadas contra incendios, sino que te entrega el libro exacto en un milisegundo en cuanto le dices el título.',
    sections: [
      {
        title: '¿Qué es una base de datos y un SGBD?',
        explanation: `Una **base de datos** es un contenedor digital organizado que almacena grandes volúmenes de datos relacionados de forma estructurada, segura y duradera.

El software que se encarga de administrar, proteger, consultar y modificar esa base de datos se llama **SGBD** (Sistema Gestor de Bases de Datos) o **DBMS** (*Database Management System*).

Ventajas clave de un SGBD frente a guardar datos en archivos comunes:
• **Velocidad de búsqueda:** Encuentra un registro entre millones en milésimas de segundo gracias a índices optimizados.
• **Concurrencia:** Cientos o miles de usuarios pueden leer y escribir datos al mismo tiempo sin trabar el sistema.
• **Seguridad e integridad:** Evita que se guarden datos corruptos o incompletos.
• **Persistencia blindada:** Los datos sobreviven a fallas de energía o caídas del sistema.`,
        codeSnippet: `-- Verificamos las asignaturas universitarias registradas en la base de datos\nSELECT id, nombre, creditos, departamento\nFROM asignaturas;`,
        outputSnippet: `+-----+-----------------------+----------+--------------------+\n| id  | nombre                | creditos | departamento       |\n+-----+-----------------------+----------+--------------------+\n| 101 | Bases de Datos I      | 4        | Informática        |\n| 102 | Estructuras de Datos  | 5        | Informática        |\n| 103 | Programación Kotlin   | 4        | Informática        |\n| 104 | Cálculo Diferencial   | 4        | Matemáticas        |\n| 105 | Redes de Computadoras | 4        | Telecomunicaciones |\n+-----+-----------------------+----------+--------------------+\n5 filas devueltas`,
        byteTip: 'Cada fila en el resultado representa un registro independiente con todas sus características ordenadas en columnas.',
        pitfallTip: 'Intentar manejar sistemas multiusuario con archivos de Excel compartidos provoca bloqueos de archivo y pérdida de información.',
        keyPoints: [
          'Un SGBD administra el almacenamiento y las consultas con alta velocidad.',
          'Separa el almacenamiento físico de la consulta lógica de datos.',
          'Soporta accesos concurrentes de múltiples usuarios e hilos sin conflictos.'
        ]
      },
      {
        title: 'El lenguaje universal: SQL',
        explanation: `Para comunicarte con casi cualquier SGBD del planeta (como SQLite, PostgreSQL, MySQL o SQL Server), se utiliza un lenguaje estándar: **SQL** (*Structured Query Language* / Lenguaje de Consulta Estructurado).

A diferencia de Kotlin, que es un lenguaje imperativo (le dices a la máquina paso a paso *cómo* hacer algo), SQL es un lenguaje **declarativo**: le describes a la base de datos *qué* información deseas obtener, y el motor optimizador decide el camino interno más rápido para entregártela.`,
        codeSnippet: `-- Pedimos asignaturas del departamento de Informática\nSELECT nombre, creditos\nFROM asignaturas\nWHERE departamento = 'Informática';`,
        outputSnippet: `+---------------------+----------+\n| nombre              | creditos |\n+---------------------+----------+\n| Bases de Datos I    | 4        |\n| Estructuras de Datos| 5        |\n| Programación Kotlin | 4        |\n+---------------------+----------+\n3 filas devueltas`,
        byteTip: 'En SQL, los textos literales se encierran siempre entre comillas simples (\'Informática\'), no dobles.',
        pitfallTip: 'Usar comillas dobles en SQL para textos puede confundirse en algunos motores con nombres de columnas.',
        keyPoints: [
          'SQL es el estándar mundial para consultar bases de datos relacionales.',
          'Es declarativo: pides qué datos quieres y el motor optimiza la búsqueda.',
          'Aprender SQL te sirve tanto para apps móviles como para servidores gigantes en la nube.'
        ]
      }
    ]
  },

  'sql-u01-l03': {
    subtitle: 'Descubre el modelo relacional: cómo conectar diferentes tablas mediante identificadores comunes.',
    analogy: 'Un álbum de estampillas numeradas: en la página de jugadores tienes la foto con su número (ID). En la página de estadísticas no vuelves a pegar la foto; solo escribes el número de jugador y sus goles anotados. Ambos datos se relacionan por el número.',
    sections: [
      {
        title: 'El modelo relacional',
        explanation: `Propuesto por el matemático Edgar F. Codd en 1970, el **modelo relacional** es el estándar más exitoso de la historia de la informática para organizar datos.

Su principio central es muy intuitivo:
1. La información se divide en **tablas independientes**, donde cada tabla representa una sola entidad de la vida real (por ejemplo: una tabla para \`estudiantes\` y otra para \`asignaturas\`).
2. Las tablas se conectan entre sí mediante **relaciones lógicas** usando identificadores comunes (claves o llaves).
3. Esto evita duplicar información y garantiza que si un dato cambia, se actualice en un único lugar.`,
        codeSnippet: `-- Consultamos las matrículas que vinculan estudiantes con asignaturas\nSELECT id, estudiante_id, asignatura_id, periodo, nota_final\nFROM matriculas;`,
        outputSnippet: `+----+---------------+---------------+---------+------------+\n| id | estudiante_id | asignatura_id | periodo | nota_final |\n+----+---------------+---------------+---------+------------+\n| 1  | 1             | 101           | 2024-1  | 9.5        |\n| 2  | 1             | 103           | 2024-1  | 9.2        |\n| 3  | 2             | 101           | 2024-1  | 8.7        |\n| 4  | 2             | 102           | 2024-1  | 8.9        |\n+----+---------------+---------------+---------+------------+\n4 filas devueltas`,
        byteTip: 'Observa cómo estudiante_id = 1 hace referencia al estudiante #1 (Valeria Morales) sin tener que repetir su nombre y correo en cada matrícula.',
        pitfallTip: 'Meter todos los datos en una sola tabla gigante ("tabla sábana") genera redundancia y pesadillas de actualización.',
        keyPoints: [
          'El modelo relacional organiza datos en tablas especializadas conectadas.',
          'Evita la duplicación innecesaria de información.',
          'Es la base de la integridad y escalabilidad en sistemas de software.'
        ]
      },
      {
        title: 'Integridad de datos en el modelo relacional',
        explanation: `Si un estudiante cambia de carrera o de correo, solo modificamos su fila en la tabla \`estudiantes\`. Todas las matrículas, pagos y notas asociadas se mantienen automáticamente actualizadas y coherentes:`,
        codeSnippet: `-- Consultamos los datos personales del estudiante #1\nSELECT id, nombre, carrera\nFROM estudiantes\nWHERE id = 1;`,
        outputSnippet: `+----+-----------------+------------------------+\n| id | nombre          | carrera                |\n+----+-----------------+------------------------+\n| 1  | Valeria Morales | Ingeniería de Software |\n+----+-----------------+------------------------+\n1 fila devuelta`,
        byteTip: 'Consultar por id es la operación más rápida posible en una base de datos relacional.',
        pitfallTip: 'No relaciones tablas mediante textos largos o nombres que puedan cambiar con el tiempo; usa siempre identificadores numéricos fijos.',
        keyPoints: [
          'La separación relacional centraliza las actualizaciones en un solo registro.',
          'Previene inconsistencias donde un dato aparece actualizado en un lado y desactualizado en otro.',
          'Facilita el mantenimiento a largo plazo.'
        ]
      }
    ]
  },

  'sql-u01-l04': {
    subtitle: 'Aprende la anatomía exacta de una tabla relacional: tablas, columnas (atributos) y filas (registros).',
    analogy: 'Una cuadrícula de hoja de cálculo: el nombre de la pestaña es la Tabla, los encabezados verticales son las Columnas (qué tipo de dato se guarda) y cada renglón horizontal es una Fila (un registro individual).',
    sections: [
      {
        title: 'Tablas, columnas y filas',
        explanation: `Toda base de datos relacional se compone de tres elementos arquitectónicos básicos:

1. **Tabla (Entidad):** La estructura que agrupa datos sobre un mismo tema (ej: \`usuarios\`, \`productos\`, \`pedidos\`).
2. **Columna (Atributo o Campo):** La dimensión vertical. Define una característica específica del elemento (ej: \`email\`, \`precio\`, \`fecha_ingreso\`). Cada columna tiene un nombre y un tipo de dato fijo.
3. **Fila (Registro o Tupla):** La dimensión horizontal. Representa un elemento real y completo guardado en la tabla (ej: la fila del usuario Juan con todos sus datos).`,
        codeSnippet: `-- Inspeccionamos todas las columnas y filas de la tabla de usuarios\nSELECT id, nombre, email, edad, pais, activo\nFROM usuarios;`,
        outputSnippet: `+----+-------------------+--------------------+------+---------------+--------+\n| id | nombre            | email              | edad | pais          | activo |\n+----+-------------------+--------------------+------+---------------+--------+\n| 1  | Ada Lovelace      | ada@pioneers.org   | 36   | Reino Unido   | true   |\n| 2  | Alan Turing       | alan@bletchley.org | 41   | Reino Unido   | true   |\n| 3  | Grace Hopper      | grace@navy.mil     | 85   | Estados Unidos| false  |\n| 4  | Linus Torvalds    | linus@linux.org    | 54   | Finlandia     | true   |\n| 5  | Margaret Hamilton | margaret@nasa.gov  | 87   | Estados Unidos| true   |\n+----+-------------------+--------------------+------+---------------+--------+\n5 filas devueltas`,
        byteTip: 'Cada celda en la intersección de una fila y una columna contiene un único valor atómico.',
        pitfallTip: 'Nunca guardes listas de valores separadas por comas dentro de una sola celda (como guardar tres teléfonos en un solo campo). Viola la primera forma normal.',
        keyPoints: [
          'La tabla es el contenedor de la entidad.',
          'Las columnas definen la estructura y tipos de datos.',
          'Las filas contienen los registros individuales de información.'
        ]
      },
      {
        title: 'Columnas calculadas y proyección de campos',
        explanation: `No tienes por qué pedir siempre todas las columnas. Puedes proyectar solo las que necesitas y calcular nuevos datos al vuelo:`,
        codeSnippet: `-- Consultamos nombre y calculamos el año aproximado de nacimiento\nSELECT nombre, (2024 - edad) AS anio_nacimiento_aprox\nFROM usuarios\nWHERE activo = true;`,
        outputSnippet: `+-------------------+-----------------------+\n| nombre            | anio_nacimiento_aprox |\n+-------------------+-----------------------+\n| Ada Lovelace      | 1988                  |\n| Alan Turing       | 1983                  |\n| Linus Torvalds    | 1970                  |\n| Margaret Hamilton | 1937                  |\n+-------------------+-----------------------+\n4 filas devueltas`,
        byteTip: 'Al pedir solo las columnas necesarias, la base de datos transfiere menos bytes por la red y responde mucho más rápido.',
        pitfallTip: 'Abusar de SELECT * en apps de producción desperdicia memoria RAM en el dispositivo móvil.',
        keyPoints: [
          'Proyectar columnas específicas ahorra memoria y ancho de banda.',
          'Las expresiones aritméticas en el SELECT crean columnas virtuales calculadas.',
          'Los alias (AS) dan nombres descriptivos a los resultados calculados.'
        ]
      }
    ]
  },

  'sql-u01-l05': {
    subtitle: 'Distingue claramente entre el esquema estructural de una tabla y los registros almacenados en ella.',
    analogy: 'El plano de una casa (esquema) frente a los muebles y habitantes que viven adentro (datos). Puedes pintar o cambiar los muebles todos los días sin modificar los planos de concreto de la casa.',
    sections: [
      {
        title: 'Estructura (Esquema) vs Registros (Datos)',
        explanation: `En bases de datos se divide el mundo en dos niveles:

1. **El Esquema (Estructura / DDL):**
Es la definición formal de cómo está construida la tabla: cómo se llama, qué columnas tiene, qué tipos de datos acepta y qué restricciones aplican. Rara vez cambia una vez creada la aplicación.
• Se gestiona con sentencias **DDL** (*Data Definition Language*), como \`CREATE TABLE\`, \`ALTER TABLE\` y \`DROP TABLE\`.

2. **Los Registros (Datos / DML):**
Son los valores reales guardados adentro. Cambian constantemente a medida que los usuarios usan la app: se agregan nuevos usuarios, se editan contraseñas o se borran pedidos.
• Se gestionan con sentencias **DML** (*Data Manipulation Language*), como \`SELECT\`, \`INSERT\`, \`UPDATE\` y \`DELETE\`.`,
        codeSnippet: `-- Consultamos los registros que residen actualmente dentro de la estructura de empleados\nSELECT id, nombre, departamento, salario\nFROM empleados;`,
        outputSnippet: `+-----+----------------+--------------+---------+\n| id  | nombre         | departamento | salario |\n+-----+----------------+--------------+---------+\n| 101 | Carlos Mendoza | Ingeniería   | 3200.0  |\n| 102 | Elena Rostova  | Diseño UX    | 2850.5  |\n| 103 | Mateo Díaz     | Sistemas     | 3100.0  |\n| 104 | Sofía Valerio  | Dirección    | 4500.0  |\n| 105 | Andrés Solano  | Soporte      | 1900.0  |\n+-----+----------------+--------------+---------+\n5 filas devueltas`,
        byteTip: 'Si borras todos los registros con DELETE, la estructura de la tabla (columnas y tipos) sigue existiendo lista para recibir nuevos datos.',
        pitfallTip: 'Confundir DROP TABLE (que destruye la estructura y los datos por completo) con DELETE FROM (que solo borra los registros).',
        keyPoints: [
          'DDL define y modifica la estructura (tablas, columnas, tipos).',
          'DML manipula los registros de datos (consultar, insertar, modificar, borrar).',
          'La estructura es estable; los datos son dinámicos.'
        ]
      },
      {
        title: 'Inspeccionar el esquema de una tabla en SQLite',
        explanation: `En SQLite puedes consultar la tabla del sistema \`sqlite_master\` para ver el código SQL exacto con el que fue creada cualquier tabla:`,
        codeSnippet: `-- Consultamos la estructura DDL de la tabla empleados en el catálogo del sistema\nSELECT sql \nFROM sqlite_master \nWHERE type = 'table' AND name = 'empleados';`,
        outputSnippet: `+-----------------------------------------------------------------------------------------------------------------------------+\n| sql                                                                                                                         |\n+-----------------------------------------------------------------------------------------------------------------------------+\n| CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, salario REAL, fecha_ingreso DATE, activo BOOLEAN) |\n+-----------------------------------------------------------------------------------------------------------------------------+\n1 fila devuelta`,
        byteTip: 'sqlite_master es la bitácora interna donde SQLite recuerda todos tus esquemas, índices y vistas.',
        pitfallTip: 'No intentes modificar directamente sqlite_master con UPDATE; usa siempre las sentencias oficiales ALTER o DROP.',
        keyPoints: [
          'El esquema almacena la metadata que valida cada inserción.',
          'SQLite mantiene el registro de todas las tablas en sqlite_master.',
          'Comprender la diferencia entre DDL y DML previene errores graves de borrado de esquemas.'
        ]
      }
    ]
  },

  'sql-u01-l06': {
    subtitle: 'Comprende la diferencia entre el estándar universal SQL y el motor ligero embebido SQLite.',
    analogy: 'El español es el idioma universal (SQL). El acento local de una ciudad específica con sus modismos optimizados para el día a día es SQLite. Si sabes hablar español, te entienden en todo el mundo.',
    sections: [
      {
        title: 'SQL frente a SQLite',
        explanation: `Es muy común escuchar ambos términos juntos, pero representan dos cosas distintas:

• **SQL:** Es el **lenguaje estándar internacional** (definido por ANSI e ISO). Es el conjunto de reglas y sintaxis que todos los motores de bases de datos entienden (\`SELECT\`, \`WHERE\`, \`JOIN\`).
• **SQLite:** Es un **motor de base de datos específico**, ultra-ligero y embebido, escrito en lenguaje C por D. Richard Hipp en el año 2000.

¿Por qué SQLite es el rey de los dispositivos móviles?
1. **Sin servidor (Serverless):** No necesita instalar un programa de servidor corriendo en segundo plano ni configurar usuarios o puertos de red.
2. **Un solo archivo:** Toda la base de datos se guarda en un único archivo físico dentro del teléfono (\`.db\` o \`.sqlite\`).
3. **Embebido en Android e iOS:** Cada teléfono Android del mundo viene con SQLite preinstalado de fábrica.`,
        codeSnippet: `-- Consultamos la versión del motor SQLite que está ejecutando nuestras sentencias\nSELECT sqlite_version() AS version_motor_sqlite;`,
        outputSnippet: `+-----------------------+\n| version_motor_sqlite  |\n+-----------------------+\n| 3.42.0                |\n+-----------------------+\n1 fila devuelta`,
        byteTip: 'SQLite es la base de datos más utilizada del mundo: está en miles de millones de teléfonos, televisores, navegadores web y automóviles.',
        pitfallTip: 'SQLite está optimizado para apps móviles y sistemas locales; no está pensado para sitios web con miles de escrituras por segundo simultáneas (para eso se usa PostgreSQL).',
        keyPoints: [
          'SQL es el lenguaje universal; SQLite es la biblioteca de software que lo implementa.',
          'SQLite no requiere servidor y guarda todo en un solo archivo local.',
          'Android utiliza SQLite como motor de almacenamiento predeterminado para Room.'
        ]
      },
      {
        title: 'SQLite en Android con Room Database',
        explanation: `En el desarrollo oficial para Android con Kotlin, Google creó la biblioteca **Room**:
Room es una capa moderna construida sobre SQLite que valida tus consultas SQL en tiempo de compilación y traduce las filas de SQLite directamente a objetos \`data class\` de Kotlin. ¡Todo lo que aprendes de SQL aquí se aplica directamente en Room!`,
        codeSnippet: `-- En una app Android, una consulta simple como esta alimenta la pantalla principal\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE stock > 0\nORDER BY precio ASC;`,
        outputSnippet: `+----+------------------------------+--------+-------+\n| id | nombre                       | precio | stock |\n+----+------------------------------+--------+-------+\n| 5  | Cable HDMI 2.1 Braided       | 14.99  | 150   |\n| 3  | Mouse Ergonómico Pro         | 49.9   | 80    |\n| 1  | Teclado Mecánico RGB         | 89.99  | 45    |\n| 4  | Auriculares Cancelación Ruido| 129.0  | 25    |\n| 2  | Monitor Ultrawide 34"        | 429.5  | 12    |\n+----+------------------------------+--------+-------+\n5 filas devueltas`,
        byteTip: 'ORDER BY precio ASC ordena los productos del más económico al más costoso de forma automática.',
        pitfallTip: 'No crees conexiones manuales crudas si usas Room; Room administra las conexiones a SQLite por ti de forma segura.',
        keyPoints: [
          'Room traduce consultas SQLite a objetos de Kotlin.',
          'Aprender SQL puro te da el control total para optimizar Room en Android.',
          'Las consultas declarativas son rápidas, limpias y altamente eficientes.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 2: MODELADO DE INFORMACIÓN Y RELACIONES
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u02-l01': {
    subtitle: 'Aprende a identificar qué objetos del mundo real deben convertirse en tablas y atributos.',
    analogy: 'Un formulario médico: la ficha del "Paciente" es la entidad. Sus atributos son nombre, tipo de sangre y alergias. Cada persona que llega al hospital es una instancia con sus propios datos en esa ficha.',
    sections: [
      {
        title: 'Entidades y atributos en el diseño de datos',
        explanation: `Antes de escribir una sola línea de código SQL, debemos diseñar cómo organizaremos la información. Este proceso se llama **modelado de datos**:

• **Entidad:** Cualquier objeto o concepto del mundo real sobre el cual necesitamos almacenar datos (ejemplo: \`Cliente\`, \`Producto\`, \`Factura\`, \`Curso\`). Cada entidad se convertirá en una **tabla**.
• **Atributo:** Una propiedad o característica que describe a esa entidad (ejemplo: para la entidad \`Producto\`, sus atributos son \`nombre\`, \`precio\` y \`stock\`). Cada atributo se convertirá en una **columna**.`,
        codeSnippet: `-- Tabla diseñada a partir de la entidad 'Producto' con sus atributos esenciales\nSELECT id, nombre, categoria, precio, stock\nFROM productos;`,
        outputSnippet: `+----+------------------------------+-----------+--------+-------+\n| id | nombre                       | categoria | precio | stock |\n+----+------------------------------+-----------+--------+-------+\n| 1  | Teclado Mecánico RGB         | Hardware  | 89.99  | 45    |\n| 2  | Monitor Ultrawide 34"        | Pantallas | 429.5  | 12    |\n| 3  | Mouse Ergonómico Pro         | Hardware  | 49.9   | 80    |\n| 4  | Auriculares Cancelación Ruido| Audio     | 129.0  | 25    |\n| 5  | Cable HDMI 2.1 Braided       | Accesorios| 14.99  | 150   |\n+----+------------------------------+-----------+--------+-------+\n5 filas devueltas`,
        byteTip: 'Usa nombres en singular o plural de forma consistente: si eliges productos para tus tablas, nombra todas en plural (clientes, facturas, cursos).',
        pitfallTip: 'No crees tablas para conceptos que solo son atributos de otra tabla (ejemplo: no crees una tabla entera para "Color" si con una columna basta).',
        keyPoints: [
          'Las entidades del negocio se convierten en tablas de la base de datos.',
          'Los atributos de las entidades se convierten en columnas tipadas.',
          'Un buen modelado previo ahorra semanas de reescritura de código en el futuro.'
        ]
      },
      {
        title: 'Regla de granularidad atómica',
        explanation: `Cada atributo debe contener el dato más indivisible posible. Si guardas el nombre completo en una sola columna \`"Carlos Alberto Mendoza"\`, luego será muy difícil ordenar a los clientes alfabéticamente por su apellido.

Es mejor diseñar dos columnas: \`nombre\` y \`apellido\`:`,
        codeSnippet: `-- Consultamos empleados con atributos separados para poder filtrar por departamento\nSELECT nombre, departamento\nFROM empleados\nWHERE departamento = 'Ingeniería';`,
        outputSnippet: `+----------------+--------------+\n| nombre         | departamento |\n+----------------+--------------+\n| Carlos Mendoza | Ingeniería   |\n+----------------+--------------+\n1 fila devuelta`,
        byteTip: 'Separar campos te da la flexibilidad de unirlos cuando quieras con concatenación en SQL.',
        pitfallTip: 'Evita crear columnas genéricas como dato1, campo2; cada columna debe revelar claramente su propósito.',
        keyPoints: [
          'La atomicidad exige que cada celda guarde un solo dato elemental.',
          'Separar datos facilita búsquedas, ordenamientos y filtros precisos.',
          'La claridad en los nombres de columna es la base de un buen esquema.'
        ]
      }
    ]
  },

  'sql-u02-l02': {
    subtitle: 'Aprende a seleccionar únicamente los datos estrictamente necesarios para tu sistema.',
    analogy: 'Hacer la maleta para un viaje de fin de semana: si empacas ropa innecesaria "por si acaso", la maleta pesa demasiado y te cobran sobrepeso. Guarda en tu base de datos solo lo que tu app realmente va a usar.',
    sections: [
      {
        title: 'Selección austera de datos necesarios',
        explanation: `Uno de los errores más comunes de diseñadores novatos es intentar almacenar absolutamente todo lo imaginable: guardar el signo zodiacal de los clientes o el color favorito de sus mascotas "por si en el futuro se necesita".

Guardar datos innecesarios:
• Consume memoria física y espacio en el almacenamiento del teléfono.
• Hace las consultas más lentas.
• Aumenta la complejidad del código.
• Genera riesgos legales de privacidad (como el reglamento GDPR).

La regla de diseño profesional es la **austeridad**: almacena solo los atributos que aporten valor directo a las funciones actuales de la aplicación.`,
        codeSnippet: `-- Tabla con los atributos justos y necesarios para un sistema académico\nSELECT id, nombre, carrera, semestre, promedio\nFROM estudiantes;`,
        outputSnippet: `+----+-----------------+--------------------------+----------+----------+\n| id | nombre          | carrera                  | semestre | promedio |\n+----+-----------------+--------------------------+----------+----------+\n| 1  | Valeria Morales | Ingeniería de Software   | 4        | 9.4      |\n| 2  | Diego Fernández | Ciencias Computacionales | 6        | 8.8      |\n| 3  | Camila Gómez    | Sistemas de Información  | 2        | 9.7      |\n| 4  | Javier Ramos    | Ciberseguridad           | 5        | 8.2      |\n| 5  | Lucía Navarro   | Ingeniería de Software   | 3        | 9.1      |\n+----+-----------------+--------------------------+----------+----------+\n5 filas devueltas`,
        byteTip: 'Siempre es muy fácil agregar una columna nueva con ALTER TABLE más adelante cuando el requerimiento realmente exista.',
        pitfallTip: 'No guardes datos calculables. Por ejemplo, guarda fecha_nacimiento, NO guardes edad; la edad cambia cada año y se desactualiza.',
        keyPoints: [
          'Almacena solo los atributos requeridos por la lógica real del negocio.',
          'Evita almacenar datos redundantes que pueden calcularse a partir de otros.',
          'Un esquema conciso mejora el rendimiento y respeta la privacidad del usuario.'
        ]
      },
      {
        title: 'Datos calculados vs Datos almacenados',
        explanation: `Si guardas la fecha de nacimiento, puedes calcular la edad exacta en cualquier instante sin riesgo de que quede desactualizada con el paso del tiempo:`,
        codeSnippet: `-- En vez de guardar una columna mutable con la edad, calculamos datos derivados\nSELECT nombre, (promedio * 10) AS calificacion_sobre_100\nFROM estudiantes;`,
        outputSnippet: `+-----------------+------------------------+\n| nombre          | calificacion_sobre_100 |\n+-----------------+------------------------+\n| Valeria Morales | 94.0                   |\n| Diego Fernández | 88.0                   |\n| Camila Gómez    | 97.0                   |\n| Javier Ramos    | 82.0                   |\n| Lucía Navarro   | 91.0                   |\n+-----------------+------------------------+\n5 filas devueltas`,
        byteTip: 'Calcular valores al vuelo en SQL garantiza que el resultado sea siempre fresco y exacto.',
        pitfallTip: 'Guardar subtotales, totales e impuestos fijos en tablas puede causar que si alguien edita un precio, el total guardado quede descuadrado.',
        keyPoints: [
          'Calcula valores derivados en la consulta en lugar de almacenarlos estáticamente.',
          'Previene inconsistencias cuando cambian los datos de origen.',
          'Ahorra espacio en disco y mantiene la base de datos limpia.'
        ]
      }
    ]
  },

  'sql-u02-l03': {
    subtitle: 'Domina la Llave Primaria (Primary Key): el identificador único e irremplazable de cada registro.',
    analogy: 'Tu número de cédula de identidad, DNI o pasaporte: en tu país pueden existir dos personas con el mismo nombre y apellido (como dos "Juan Pérez"), pero sus números de documento son únicos e irrepetibles.',
    sections: [
      {
        title: 'La Llave Primaria (PRIMARY KEY / PK)',
        explanation: `En una base de datos relacional, cada fila de una tabla debe ser distinguible de todas las demás sin la menor duda.

La **Llave Primaria** (*Primary Key* o **PK**) es una columna (o conjunto de columnas) cuyo valor es:
1. **Único:** No pueden existir dos filas con la misma llave primaria en la misma tabla jamás.
2. **No nulo (\`NOT NULL\`):** Todo registro debe tener obligatoriamente un valor de llave primaria asignado.
3. **Inmutable:** Su valor no debe cambiar a lo largo del tiempo.

Típicamente se utiliza una columna llamada **\`id\`** con números enteros secuenciales (\`1, 2, 3...\`).`,
        codeSnippet: `-- Consultamos la tabla donde 'id' actúa como llave primaria única\nSELECT id, nombre, email\nFROM usuarios\nWHERE id = 3;`,
        outputSnippet: `+----+--------------+----------------+\n| id | nombre       | email          |\n+----+--------------+----------------+\n| 3  | Grace Hopper | grace@navy.mil |\n+----+--------------+----------------+\n1 fila devuelta`,
        byteTip: 'Consultar por llave primaria (WHERE id = 3) es la búsqueda más rápida posible porque SQLite crea un índice B-Tree automático para ella.',
        pitfallTip: 'No uses el nombre de una persona como llave primaria; los nombres se repiten y las personas pueden cambiar legalmente de nombre.',
        keyPoints: [
          'La PRIMARY KEY identifica de forma unívoca a cada registro en la tabla.',
          'Garantiza que no existan filas duplicadas e indistinguibles.',
          'Generalmente es un número entero autoincremental llamado id.'
        ]
      },
      {
        title: 'Llaves artificiales (Surrogate Keys) vs Naturales',
        explanation: `• **Llave natural:** Un dato del mundo real que ya es único (como el número de seguro social o el código ISBN de un libro).
• **Llave artificial (*Surrogate*):** Un simple número secuencial inventado por el sistema (\`id = 1, 2, 3\`).

En la industria de software y en Android, **casi siempre se prefieren llaves artificiales \`id INTEGER\`**: ocupan muy poco espacio, son ultra-rápidas para hacer JOINs y no dependen de cambios en leyes o normas externas.`,
        codeSnippet: `-- Búsqueda precisa por llave primaria única\nSELECT id, nombre, precio\nFROM productos\nWHERE id = 1;`,
        outputSnippet: `+----+----------------------+--------+\n| id | nombre               | precio |\n+----+----------------------+--------+\n| 1  | Teclado Mecánico RGB | 89.99  |\n+----+----------------------+--------+\n1 fila devuelta`,
        byteTip: 'En SQLite, declarar id INTEGER PRIMARY KEY hace que la base de datos asigne el siguiente número disponible automáticamente.',
        pitfallTip: 'Evita usar cadenas de texto muy largas como llave primaria si vas a relacionarla con muchas otras tablas.',
        keyPoints: [
          'Las llaves artificiales numéricas (id) son el estándar en apps modernas.',
          'Ocupan solo 4 u 8 bytes en memoria y aceleran las búsquedas.',
          'Aíslan la estructura interna de los cambios en los datos del negocio.'
        ]
      }
    ]
  },

  'sql-u02-l04': {
    subtitle: 'Conecta diferentes tablas mediante Llaves Foráneas (Foreign Key) para crear relaciones seguras.',
    analogy: 'La etiqueta del equipaje en un aeropuerto: la maleta lleva una etiqueta que dice "Pasajero #101". La maleta está en una bodega distinta, pero sabemos con certeza a quién pertenece gracias al número que apunta a la lista de pasajeros.',
    sections: [
      {
        title: 'La Llave Foránea (FOREIGN KEY / FK)',
        explanation: `Una vez que tienes dos tablas independientes, ¿cómo las conectas para que sepan qué fila pertenece a cuál?

Usamos una **Llave Foránea** (*Foreign Key* o **FK**):
• Es una columna en una tabla secundaria que **apunta directamente a la llave primaria de otra tabla principal**.
• Establece un vínculo estricto entre ambas.
• Por ejemplo, en la tabla \`matriculas\`, la columna \`estudiante_id\` es una llave foránea que apunta a la columna \`id\` de la tabla \`estudiantes\`.`,
        codeSnippet: `-- La columna estudiante_id apunta a estudiantes(id)\n-- La columna asignatura_id apunta a asignaturas(id)\nSELECT id, estudiante_id, asignatura_id, periodo, nota_final\nFROM matriculas\nWHERE estudiante_id = 1;`,
        outputSnippet: `+----+---------------+---------------+---------+------------+\n| id | estudiante_id | asignatura_id | periodo | nota_final |\n+----+---------------+---------------+---------+------------+\n| 1  | 1             | 101           | 2024-1  | 9.5        |\n| 2  | 1             | 103           | 2024-1  | 9.2        |\n+----+---------------+---------------+---------+------------+\n2 filas devueltas`,
        byteTip: 'Por convención, una llave foránea se nombra con el nombre de la tabla relacionada en singular seguido de _id: estudiante_id, usuario_id.',
        pitfallTip: 'Guardar un id que no existe en la tabla principal (por ejemplo matricular al estudiante_id = 999 cuando solo existen 5 alumnos) viola la integridad referencial.',
        keyPoints: [
          'La FOREIGN KEY conecta una fila de una tabla con la PRIMARY KEY de otra.',
          'Crea el enlace lógico del modelo relacional.',
          'Garantiza que no existan registros huérfanos sin dueño.'
        ]
      },
      {
        title: 'Integridad referencial en acción',
        explanation: `Cuando las llaves foráneas están activadas en SQLite, el motor se convierte en un guardián incorruptible:
Si intentas insertar una matrícula para un alumno que no existe, o si intentas borrar a un alumno que todavía tiene materias matriculadas, SQLite bloqueará la operación para evitar que queden datos rotos en tu sistema.`,
        codeSnippet: `-- Verificamos las materias cursadas por el estudiante #2 (Diego Fernández)\nSELECT estudiante_id, asignatura_id, nota_final\nFROM matriculas\nWHERE estudiante_id = 2;`,
        outputSnippet: `+---------------+---------------+------------+\n| estudiante_id | asignatura_id | nota_final |\n+---------------+---------------+------------+\n| 2             | 101           | 8.7        |\n| 2             | 102           | 8.9        |\n+---------------+---------------+------------+\n2 filas devueltas`,
        byteTip: 'En SQLite debes ejecutar PRAGMA foreign_keys = ON; para que las llaves foráneas se validen activamente.',
        pitfallTip: 'No borres tablas principales sin antes revisar qué tablas secundarias dependen de sus llaves foráneas.',
        keyPoints: [
          'Las llaves foráneas previenen registros huérfanos en la base de datos.',
          'Garantizan que las relaciones entre tablas sean siempre verídicas.',
          'Son la base sobre la que funcionan las uniones con JOIN.'
        ]
      }
    ]
  },

  'sql-u02-l05': {
    subtitle: 'Comprende las relaciones uno a uno (1:1) y uno a muchos (1:N) en el diseño de software.',
    analogy: 'Relación 1 a 1: un ciudadano y su único pasaporte oficial. Relación 1 a Muchos: un autor y todos los libros que ha escrito en su vida (un autor escribe muchos libros, pero cada libro tiene ese autor).',
    sections: [
      {
        title: 'Relaciones 1:1 y 1:N',
        explanation: `Entre dos entidades pueden existir diferentes tipos de cardinalidad:

1. **Relación Uno a Uno (1:1):**
Cada registro de la Tabla A se relaciona con exactamente un único registro de la Tabla B.
• Ejemplo: \`Usuario\` <-> \`ExpedienteConfidencial\`.
• Se suele usar para separar datos muy privados o columnas pesadas que solo se consultan ocasionalmente.

2. **Relación Uno a Muchos (1:N):**
Es con diferencia **la relación más común de toda la informática**.
Un registro de la Tabla A puede estar vinculado con múltiples registros de la Tabla B, pero cada registro de la Tabla B pertenece a un solo padre en la Tabla A.
• Ejemplo: Un \`Cliente\` puede hacer **muchos** \`Pedidos\`, pero cada pedido pertenece a **un solo** cliente.
• Ejemplo: Un \`Departamento\` tiene **muchos** \`Empleados\`, pero cada empleado trabaja en **un solo** departamento.`,
        codeSnippet: `-- Relación 1:N -> El departamento 'Informática' tiene múltiples asignaturas asociadas\nSELECT id, nombre, creditos\nFROM asignaturas\nWHERE departamento = 'Informática';`,
        outputSnippet: `+-----+---------------------+----------+\n| id  | nombre              | creditos |\n+-----+---------------------+----------+\n| 101 | Bases de Datos I    | 4        |\n| 102 | Estructuras de Datos| 5        |\n| 103 | Programación Kotlin | 4        |\n+-----+---------------------+----------+\n3 filas devueltas`,
        byteTip: 'En una relación 1 a Muchos, la llave foránea SIEMPRE se coloca en el lado del "Muchos" (en la tabla hija).',
        pitfallTip: 'Colocar la llave foránea en la tabla equivocada rompería el diseño impidiendo que un padre tenga múltiples hijos.',
        keyPoints: [
          '1:1 conecta un registro con exactamente otro registro único.',
          '1:N conecta un registro principal con múltiples registros secundarios.',
          'La llave foránea se ubica siempre en la tabla secundaria (el lado "Muchos").'
        ]
      },
      {
        title: 'Cómo se implementa la relación 1:N',
        explanation: `Para implementar que un cliente tenga muchos pedidos:
1. Creas la tabla \`clientes\` con su \`id PRIMARY KEY\`.
2. Creas la tabla \`pedidos\` con su propio \`id PRIMARY KEY\`, y le agregas la columna **\`cliente_id REFERENCES clientes(id)\`**.
¡Listo! Ese cliente puede generar 1, 10 o 1,000 pedidos sin modificar la tabla de clientes.`,
        codeSnippet: `-- Filtramos los empleados asociados al departamento de Sistemas\nSELECT id, nombre, salario\nFROM empleados\nWHERE departamento = 'Sistemas';`,
        outputSnippet: `+-----+------------+---------+\n| id  | nombre     | salario |\n+-----+------------+---------+\n| 103 | Mateo Díaz | 3100.0  |\n+-----+------------+---------+\n1 fila devuelta`,
        byteTip: 'Esta estructura permite agregar millones de registros hijos sin afectar el rendimiento de la tabla padre.',
        pitfallTip: 'No crees columnas como pedido1, pedido2, pedido3 en la tabla de clientes; limita la cantidad y desperdicia espacio.',
        keyPoints: [
          'La tabla hija aloja la llave foránea apuntando a la tabla padre.',
          'Permite un crecimiento ilimitado de registros hijos.',
          'Es el patrón universal para carritos, facturas, comentarios y publicaciones.'
        ]
      }
    ]
  },

  'sql-u02-l06': {
    subtitle: 'Modela relaciones Muchos a Muchos (N:M) de forma limpia usando tablas intermedias.',
    analogy: 'Estudiantes y Asignaturas: un estudiante cursa muchas materias a la vez, y una materia tiene muchos estudiantes inscritos. Para conectarlos sin confusiones se crea una lista de Matrícula (la tabla intermedia).',
    sections: [
      {
        title: 'Relaciones Muchos a Muchos (N:M) y tablas intermedias',
        explanation: `¿Qué ocurre cuando la relación fluye en ambas direcciones?
• Un \`Estudiante\` se inscribe en **muchas** \`Asignaturas\`.
• Una \`Asignatura\` tiene inscritos a **muchos** \`Estudiantes\`.

En las bases de datos relacionales **no es posible conectar dos tablas directamente en una relación N:M** sin generar caos.

Para resolverlo, la regla de oro de la ingeniería de datos es:
**Descomponer la relación N:M en dos relaciones 1:N creando una tabla intermedia** (también llamada tabla pivote o de unión):
• La tabla intermedia (ejemplo: \`matriculas\`) contiene **dos llaves foráneas**: una que apunta a \`estudiantes(id)\` y otra que apunta a \`asignaturas(id)\`.
• Además, puede tener sus propios atributos (como la \`fecha_matricula\` o la \`nota_final\`).`,
        codeSnippet: `-- Consultamos la tabla intermedia 'matriculas' que resuelve la relación N:M\nSELECT id, estudiante_id, asignatura_id, periodo, nota_final\nFROM matriculas;`,
        outputSnippet: `+----+---------------+---------------+---------+------------+\n| id | estudiante_id | asignatura_id | periodo | nota_final |\n+----+---------------+---------------+---------+------------+\n| 1  | 1             | 101           | 2024-1  | 9.5        |\n| 2  | 1             | 103           | 2024-1  | 9.2        |\n| 3  | 2             | 101           | 2024-1  | 8.7        |\n| 4  | 2             | 102           | 2024-1  | 8.9        |\n| 5  | 3             | 101           | 2024-1  | 9.8        |\n| 6  | 4             | 104           | 2024-1  | 8.0        |\n| 7  | 5             | 103           | 2024-1  | 9.0        |\n+----+---------------+---------------+---------+------------+\n7 filas devueltas`,
        byteTip: 'Observa la fila 1 y 3: la asignatura 101 tiene tanto al estudiante 1 como al 2. ¡Muchos a muchos resuelto de forma perfecta!',
        pitfallTip: 'Nunca intentes guardar una lista de IDs separados por comas como "101,102,103" en una sola celda. Hace que las búsquedas sean lentas e imposibles de validar.',
        keyPoints: [
          'Una relación N:M se resuelve obligatoriamente con una tabla intermedia.',
          'La tabla intermedia tiene dos llaves foráneas hacia las tablas principales.',
          'Permite registrar datos propios del encuentro (como fecha, cantidad o nota).'
        ]
      },
      {
        title: 'Otros ejemplos de relaciones N:M',
        explanation: `Este patrón se repite en infinidad de aplicaciones:
• \`Facturas\` <-> \`Productos\`: resuelto con la tabla intermedia \`detalle_factura\` (con cantidad y precio cobrado).
• \`Usuarios\` <-> \`Roles\`: resuelto con \`usuario_roles\`.
• \`Canciones\` <-> \`Playlists\`: resuelto con \`playlist_canciones\`.`,
        codeSnippet: `-- Consultamos quiénes están matriculados en la asignatura 103 (Kotlin)\nSELECT estudiante_id, nota_final\nFROM matriculas\nWHERE asignatura_id = 103;`,
        outputSnippet: `+---------------+------------+\n| estudiante_id | nota_final |\n+---------------+------------+\n| 1             | 9.2        |\n| 5             | 9.0        |\n+---------------+------------+\n2 filas devueltas`,
        byteTip: 'En lecciones posteriores aprenderás a sustituir esos números de ID por los nombres reales usando INNER JOIN.',
        pitfallTip: 'Asegúrate de agregar una restricción UNIQUE(estudiante_id, asignatura_id) para que un alumno no se matricule dos veces en la misma materia.',
        keyPoints: [
          'La tabla intermedia modela interacciones del mundo real.',
          'Soporta millones de combinaciones sin redundancia.',
          'Es el pilar de carritos de compras, pedidos y matrículas.'
        ]
      }
    ]
  },

  'sql-u02-l07': {
    subtitle: 'Aprende a interpretar diagramas Entidad-Relación (DER) para comprender cualquier base de datos a primera vista.',
    analogy: 'El plano de las líneas del metro de una gran ciudad: cada estación es una tabla y las líneas de colores que las unen son las relaciones que te muestran cómo viajar de una a otra.',
    sections: [
      {
        title: 'Lectura de Diagramas Entidad-Relación (DER)',
        explanation: `Un **Diagrama Entidad-Relación (DER)** es un mapa visual que representa toda la arquitectura de la base de datos:

¿Cómo leerlo en 3 sencillos pasos?
1. **Los rectángulos o cajas:** Son las **Tablas**. Arriba llevan el nombre de la tabla y adentro listan sus columnas.
2. **Las llaves (\`PK\` y \`FK\`):**
   • \`PK\` señala la Llave Primaria que identifica cada fila.
   • \`FK\` señala una Llave Foránea que proviene de otra tabla.
3. **Las líneas de conexión:** Conectan la llave foránea de una tabla con la llave primaria correspondiente, mostrando la cardinalidad (1 a 1, 1 a N).`,
        codeSnippet: `-- Consultamos la lista de asignaturas y sus departamentos\nSELECT id, nombre, departamento\nFROM asignaturas\nORDER BY departamento ASC;`,
        outputSnippet: `+-----+-----------------------+--------------------+\n| id  | nombre                | departamento       |\n+-----+-----------------------+--------------------+\n| 101 | Bases de Datos I      | Informática        |\n| 102 | Estructuras de Datos  | Informática        |\n| 103 | Programación Kotlin   | Informática        |\n| 104 | Cálculo Diferencial   | Matemáticas        |\n| 105 | Redes de Computadoras | Telecomunicaciones |\n+-----+-----------------------+--------------------+\n5 filas devueltas`,
        byteTip: 'En herramientas de modelado modernas, la "pata de gallo" (crow\'s foot) en el extremo de una línea indica el lado "Muchos" de la relación.',
        pitfallTip: 'No empieces a programar en Android sin tener un DER claro en papel; cambiar una base de datos con la app ya en producción es mucho más difícil.',
        keyPoints: [
          'El DER muestra visualmente todas las tablas y sus conexiones.',
          'Permite entender la estructura del proyecto en segundos.',
          'Facilita la comunicación entre programadores, analistas y clientes.'
        ]
      },
      {
        title: 'Del diagrama visual al código real',
        explanation: `Cada caja de un diagrama se traduce directamente en una sentencia \`CREATE TABLE\` en SQLite, y cada línea de conexión se traduce en una cláusula \`FOREIGN KEY ... REFERENCES\`:`,
        codeSnippet: `-- Vista rápida de estudiantes para contrastar contra el DER académico\nSELECT id, nombre, carrera\nFROM estudiantes;`,
        outputSnippet: `+----+-----------------+--------------------------+\n| id | nombre          | carrera                  |\n+----+-----------------+--------------------------+\n| 1  | Valeria Morales | Ingeniería de Software   |\n| 2  | Diego Fernández | Ciencias Computacionales |\n| 3  | Camila Gómez    | Sistemas de Información  |\n| 4  | Javier Ramos    | Ciberseguridad           |\n| 5  | Lucía Navarro   | Ingeniería de Software   |\n+----+-----------------+--------------------------+\n5 filas devueltas`,
        byteTip: 'Herramientas como SQLiteStudio o DBeaver generan estos diagramas automáticamente leyendo tu archivo .db.',
        pitfallTip: 'Mantén siempre actualizado el DER si agregas nuevas columnas en las migraciones de tu app.',
        keyPoints: [
          'El DER es el puente directo entre el diseño conceptual y el código DDL.',
          'Herramientas modernas permiten exportar el diagrama directamente a sentencias SQL.',
          'Es el documento arquitectónico más importante de un backend de datos.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 3: TIPOS DE DATOS Y CREATE TABLE
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u03-l01': {
    subtitle: 'Aprende a construir nuevas tablas desde cero utilizando la sentencia fundamental CREATE TABLE.',
    analogy: 'Comprar una cajonera nueva y etiquetar cada cajón con un marcador indeleble antes de meterle ropa: cajón superior "Camisetas", segundo cajón "Pantalones", cajón inferior "Zapatos".',
    sections: [
      {
        title: 'La sentencia DDL: CREATE TABLE',
        explanation: `Para crear una tabla nueva en una base de datos relacional usamos la sentencia **\`CREATE TABLE\`**.

Su estructura básica en SQL estándar y SQLite es:
\`CREATE TABLE nombre_tabla (\`
\`    columna1 TIPO_DATO RESTRICCIONES,\`
\`    columna2 TIPO_DATO,\`
\`    columna3 TIPO_DATO\`
\`);\`

Cada columna se define con su nombre, su tipo de dato (como \`INTEGER\` o \`TEXT\`) y opcionalmente reglas de integridad (como \`PRIMARY KEY\` o \`NOT NULL\`).`,
        codeSnippet: `-- Creamos una tabla nueva de prueba para registrar notas rápidas\nCREATE TABLE notas_recordatorio (\n    id INTEGER PRIMARY KEY,\n    titulo TEXT NOT NULL,\n    contenido TEXT,\n    importante BOOLEAN DEFAULT false\n);`,
        outputSnippet: `Tabla 'notas_recordatorio' creada con éxito (0 filas devueltas).`,
        byteTip: 'En SQLite se recomienda usar CREATE TABLE IF NOT EXISTS nombre_tabla (...) para evitar errores si la tabla ya había sido creada antes.',
        pitfallTip: 'No olvides separar las definiciones de columna con comas ,, excepto la última columna antes del paréntesis de cierre ).',
        keyPoints: [
          'CREATE TABLE es la instrucción DDL para dar vida a nuevas tablas.',
          'Define el nombre, tipo de dato y restricciones de cada columna.',
          'IF NOT EXISTS evita fallas si la tabla ya existe en el archivo local.'
        ]
      },
      {
        title: 'Verificación de la tabla recién creada',
        explanation: `Una vez creada una tabla, ya está lista para recibir registros con \`INSERT\` o ser consultada con \`SELECT\`:`,
        codeSnippet: `-- Verificamos que la tabla recién creada responda consultas (está vacía por ahora)\nSELECT * FROM notas_recordatorio;`,
        outputSnippet: `0 filas devueltas (tabla vacía pero lista para operar).`,
        byteTip: 'Una tabla recién creada no consume prácticamente espacio hasta que comienzas a insertarle filas.',
        pitfallTip: 'Cuidado con crear tablas temporales con el mismo nombre de una tabla crítica del sistema.',
        keyPoints: [
          'Una tabla vacía tiene estructura pero cero registros.',
          'Responde de inmediato a consultas SELECT sin errores.',
          'Es el lienzo sobre el cual se inserta la información de la app.'
        ]
      }
    ]
  },

  'sql-u03-l02': {
    subtitle: 'Aprende las mejores prácticas de nomenclatura con la convención estándar snake_case en SQL.',
    analogy: 'Escribir las señales de tráfico en una carretera con la misma tipografía y colores oficiales: todo conductor las reconoce al instante sin confundirse.',
    sections: [
      {
        title: 'Nomenclatura oficial: snake_case en SQL',
        explanation: `A diferencia de Kotlin, donde las variables se escriben en \`camelCase\`, en el mundo de las bases de datos y SQL el estándar indiscutible de la industria es **\`snake_case\`**:

¿Cómo funciona \`snake_case\`?
• Todo se escribe en **letras minúsculas**.
• Las palabras se separan con un **guión bajo (\`_\`)**.
• No se usan espacios, tildes, caracteres especiales ni signos como \`-\`.

Ejemplos correctos:
✔ \`fecha_nacimiento\`
✔ \`precio_unitario\`
✔ \`codigo_postal\`
✔ \`estudiante_id\`

Ejemplos desaconsejados:
✖ \`fechaNacimiento\` (estilo camelCase, algunos motores SQL lo convierten a minúsculas y se pierde la mayúscula)
✖ \`fecha nacimiento\` (con espacios, requiere corchetes molestos \`[fecha nacimiento]\`)
✖ \`dirección\` (con tildes o eñes, puede romperse en servidores con diferente codificación)`,
        codeSnippet: `-- Consultamos columnas bien nombradas en snake_case\nSELECT id, fecha_ingreso, salario\nFROM empleados;`,
        outputSnippet: `+-----+---------------+---------+\n| id  | fecha_ingreso | salario |\n+-----+---------------+---------+\n| 101 | 2022-03-15    | 3200.0  |\n| 102 | 2021-08-01    | 2850.5  |\n| 103 | 2023-01-10    | 3100.0  |\n| 104 | 2019-11-20    | 4500.0  |\n| 105 | 2024-02-01    | 1900.0  |\n+-----+---------------+---------+\n5 filas devueltas`,
        byteTip: 'Los motores SQL no suelen distinguir mayúsculas de minúsculas en nombres de columnas, por lo que fecha_nacimiento es la única forma segura y universal de separar palabras.',
        pitfallTip: 'Nunca uses palabras reservadas de SQL como nombres de columna (por ejemplo, llamar a una columna select, from, table o order causará errores de sintaxis).',
        keyPoints: [
          'snake_case es el estándar oficial para tablas y columnas en SQL.',
          'Usa solo letras minúsculas, números y guiones bajos.',
          'Evita tildes, espacios y palabras reservadas del lenguaje.'
        ]
      },
      {
        title: 'Mapeo automático entre Room y Kotlin',
        explanation: `En Android, la biblioteca Room traduce automáticamente las columnas de SQLite a variables de Kotlin:
• En SQLite: \`fecha_nacimiento TEXT\`
• En Kotlin: \`val fechaNacimiento: String\`
Room se encarga de conectar ambos mundos con total transparencia.`,
        codeSnippet: `-- Nombres limpios facilitan el mapeo con Kotlin y Jetpack Compose\nSELECT id, nombre, email\nFROM usuarios\nLIMIT 2;`,
        outputSnippet: `+----+--------------+--------------------+\n| id | nombre       | email              |\n+----+--------------+--------------------+\n| 1  | Ada Lovelace | ada@pioneers.org   |\n| 2  | Alan Turing  | alan@bletchley.org |\n+----+--------------+--------------------+\n2 filas devueltas`,
        byteTip: 'LIMIT 2 restringe el resultado para devolver solo las dos primeras filas.',
        pitfallTip: 'Sé consistente: no mezcles snake_case en unas tablas y camelCase en otras dentro de la misma base de datos.',
        keyPoints: [
          'La consistencia de nombres previene errores de mapeo en Room.',
          'Facilita la lectura de consultas complejas de muchas líneas.',
          'Es el estándar que encontrarás en tutoriales oficiales y documentación de Android.'
        ]
      }
    ]
  },

  'sql-u03-l03': {
    subtitle: 'Conoce las afinidades de tipos fundamentales de SQLite: INTEGER, REAL y TEXT.',
    analogy: 'Un clasificador de monedas: los números redondos entran en la ranura de enteros (INTEGER), las monedas con decimales en la balanza de precisión (REAL) y los billetes con palabras escritas en la ranura de texto (TEXT).',
    sections: [
      {
        title: 'Los tipos principales de SQLite: INTEGER, REAL y TEXT',
        explanation: `A diferencia de motores gigantes como Oracle o SQL Server que tienen más de 50 tipos de datos distintos, SQLite simplifica todo en un conjunto pequeño pero poderoso de **afinidades de tipos**:

• **\`INTEGER\`:** Números enteros sin decimales, positivos o negativos (ejemplo: \`id\`, \`edad\`, \`cantidad\`, \`semestre\`). SQLite ajusta el tamaño dinámicamente de 1 a 8 bytes según la magnitud del número.
• **\`REAL\`:** Números con punto decimal de precisión flotante (ejemplo: \`precio\`, \`promedio\`, \`salario\`, \`latitud\`).
• **\`TEXT\`:** Cadenas de caracteres y texto de cualquier longitud, codificadas en UTF-8 (ejemplo: \`nombre\`, \`email\`, \`descripcion\`).`,
        codeSnippet: `-- En la tabla de productos conviven los tres tipos principales:\n-- id: INTEGER | nombre: TEXT | precio: REAL | stock: INTEGER\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE precio < 100.0;`,
        outputSnippet: `+----+----------------------+--------+-------+\n| id | nombre               | precio | stock |\n+----+----------------------+--------+-------+\n| 1  | Teclado Mecánico RGB | 89.99  | 45    |\n| 3  | Mouse Ergonómico Pro | 49.9   | 80    |\n| 5  | Cable HDMI 2.1 Braided| 14.99  | 150   |\n+----+----------------------+--------+-------+\n3 filas devueltas`,
        byteTip: 'TEXT en SQLite no tiene límite artificial de tamaño; puede guardar desde una sola letra hasta un libro entero sin truncarlo.',
        pitfallTip: 'Guardar números como TEXT (por ejemplo guardar "89.99" como texto) impedirá que puedas hacer operaciones matemáticas y ordenamientos numéricos correctos (en texto "10" es menor que "2").',
        keyPoints: [
          'INTEGER para cantidades contables y llaves primarias.',
          'REAL para dinero, medidas y porcentajes con decimales.',
          'TEXT para cadenas de caracteres codificadas en UTF-8.',
          'Elegir el tipo numérico adecuado garantiza comparaciones matemáticas exactas.'
        ]
      },
      {
        title: 'Operaciones numéricas entre INTEGER y REAL',
        explanation: `SQLite maneja de forma impecable las operaciones entre enteros y decimales, promocionando el resultado a decimal cuando es necesario:`,
        codeSnippet: `-- Multiplicamos REAL (precio) por INTEGER (stock) para obtener el valor del inventario\nSELECT nombre, (precio * stock) AS valor_total_inventario\nFROM productos\nLIMIT 3;`,
        outputSnippet: `+----------------------+------------------------+\n| nombre               | valor_total_inventario |\n+----------------------+------------------------+\n| Teclado Mecánico RGB | 4049.55                |\n| Monitor Ultrawide 34"| 5154.0                 |\n| Mouse Ergonómico Pro | 3992.0                 |\n+----------------------+------------------------+\n3 filas devueltas`,
        byteTip: 'El resultado de REAL * INTEGER es automáticamente de afinidad REAL para preservar los centavos.',
        pitfallTip: 'En SQLite la división entre dos enteros 5 / 2 da 2 en versiones antiguas, pero si uno es REAL 5.0 / 2 dará 2.5.',
        keyPoints: [
          'SQLite optimiza el almacenamiento de números enteros automáticamente.',
          'Las operaciones mixtas conservan la precisión decimal requerida en finanzas.',
          'El tipado adecuado permite que el motor ejecute consultas a máxima velocidad.'
        ]
      }
    ]
  },

  'sql-u03-l04': {
    subtitle: 'Comprende el tipo BLOB para almacenar datos binarios crudos como imágenes o archivos cifrados.',
    analogy: 'Una caja fuerte sellada que guarda un objeto físico en su empaque original sin abrirlo: no intentas leerlo como texto; lo guardas tal cual en formato binario puro (ceros y unos).',
    sections: [
      {
        title: 'El tipo BLOB (Binary Large Object)',
        explanation: `¿Qué ocurre cuando necesitas almacenar datos que no son números ni texto, como la foto de perfil en miniatura de un usuario, un archivo de audio comprimido o una clave criptográfica?

Para eso existe el tipo **\`BLOB\`** (*Binary Large Object* / Objeto Binario Grande):
• Almacena una secuencia exacta de **bytes crudos** sin ninguna interpretación de texto ni codificación.
• Guarda la información exactamente como se leyó del archivo de disco.`,
        codeSnippet: `-- Ejemplo conceptual de tabla que almacena avatares en formato binario BLOB\nCREATE TABLE avatares_usuario (\n    usuario_id INTEGER PRIMARY KEY,\n    formato TEXT,\n    foto_binaria BLOB\n);`,
        outputSnippet: `Tabla 'avatares_usuario' creada con éxito.`,
        byteTip: 'La regla de oro en Android: Guarda en la base de datos la RUTA del archivo en el disco (TEXT), NO la imagen pesada completa como BLOB. Guarda solo imágenes diminutas en BLOB si es estrictamente necesario.',
        pitfallTip: 'Meter imágenes de 5 MB como BLOB dentro de SQLite inflará el archivo de la base de datos y hará que las consultas sean lentísimas.',
        keyPoints: [
          'BLOB almacena datos binarios puros (bytes sin interpretar).',
          'Ideal para firmas criptográficas, certificados o miniaturas muy pequeñas.',
          'La mejor práctica en Android es guardar la URL o ruta local en un campo TEXT.'
        ]
      },
      {
        title: 'Rendimiento y buenas prácticas con archivos multimedia',
        explanation: `En apps profesionales de Android:
• Las fotos y videos se descargan a la carpeta de caché del almacenamiento interno del teléfono.
• En SQLite se guarda solo el texto de la ruta local: \`"/data/user/0/app/cache/foto1.jpg"\`.
Esto mantiene la base de datos veloz, liviana y eficiente.`,
        codeSnippet: `-- Consulta típica de rutas locales de archivos en formato TEXT\nSELECT id, nombre, ('/imagenes/' || id || '.png') AS ruta_icono\nFROM productos\nLIMIT 2;`,
        outputSnippet: `+----+----------------------+-------------------+\n| id | nombre               | ruta_icono        |\n+----+----------------------+-------------------+\n| 1  | Teclado Mecánico RGB | /imagenes/1.png   |\n| 2  | Monitor Ultrawide 34"| /imagenes/2.png   |\n+----+----------------------+-------------------+\n2 filas devueltas`,
        byteTip: 'El operador || en SQL concatena cadenas de texto de forma estándar.',
        pitfallTip: 'No uses BLOB como sustituto de un sistema de archivos para almacenar galerías enteras de fotos.',
        keyPoints: [
          'Guardar rutas en TEXT es infinitamente más eficiente que almacenar imágenes completas en BLOB.',
          'El operador || permite construir URLs y rutas dinámicas en SQL.',
          'Asegura un rendimiento óptimo en dispositivos de gama media y baja.'
        ]
      }
    ]
  },

  'sql-u03-l05': {
    subtitle: 'Aprende cómo SQLite almacena valores lógicos (Booleanos) y fechas mediante enteros y textos ISO.',
    analogy: 'Un interruptor de luz con dos posiciones: 1 significa "encendido" (true) y 0 significa "apagado" (false). Y un calendario estándar donde todos escriben AÑO-MES-DÍA para que no haya confusiones entre países.',
    sections: [
      {
        title: 'Booleanos y Fechas en SQLite',
        explanation: `Curiosamente, SQLite no tiene tipos de datos separados llamados específicamente \`BOOLEAN\` o \`DATE\`. En su lugar, utiliza dos convenciones universales muy inteligentes:

1. **Valores Booleanos (Verdadero / Falso):**
Se almacenan como enteros:
• **\`1\`**: Representa \`true\` (verdadero / activo).
• **\`0\`**: Representa \`false\` (falso / inactivo).
(Aunque escribas \`BOOLEAN\` en tu \`CREATE TABLE\`, SQLite lo mapea internamente a un \`INTEGER\` de 0 o 1).

2. **Fechas y Horas:**
Se almacenan típicamente como **\`TEXT\` en formato estándar ISO-8601**:
\`'AAAA-MM-DD'\` (ejemplo: \`'2024-03-15'\`) o \`'AAAA-MM-DD HH:MM:SS'\`.
¿Por qué este formato? Porque al ordenar alfabéticamente \`'2024-03-15'\` frente a \`'2024-01-10'\`, ¡el orden alfabético coincide exactamente con el orden cronológico del tiempo!`,
        codeSnippet: `-- Consultamos empleados activos filtrando por el campo booleano (true / 1)\nSELECT id, nombre, fecha_ingreso, activo\nFROM empleados\nWHERE activo = true;`,
        outputSnippet: `+-----+----------------+---------------+--------+\n| id  | nombre         | fecha_ingreso | activo |\n+-----+----------------+---------------+--------+\n| 101 | Carlos Mendoza | 2022-03-15    | true   |\n| 102 | Elena Rostova  | 2021-08-01    | true   |\n| 103 | Mateo Díaz     | 2023-01-10    | true   |\n| 104 | Sofía Valerio  | 2019-11-20    | true   |\n+-----+----------------+---------------+--------+\n4 filas devueltas`,
        byteTip: 'En SQLite puedes escribir WHERE activo = true o WHERE activo = 1; ambos funcionan idénticos.',
        pitfallTip: 'Nunca guardes fechas en formatos locales como "15/03/2024" o "03/15/2024". Rompen las comparaciones cronológicas y causan desastres al ordenar.',
        keyPoints: [
          'Los booleanos se representan como 1 (true) y 0 (false).',
          'Las fechas se guardan en texto en formato internacional ISO AAAA-MM-DD.',
          'El formato ISO garantiza que los ordenamientos cronológicos sean naturales.'
        ]
      },
      {
        title: 'Filtros y comparaciones de fechas en formato ISO',
        explanation: `Gracias al formato ISO \`AAAA-MM-DD\`, puedes comparar fechas con operadores normales como \`>\`, \`<\` o \`BETWEEN\` con total precisión:`,
        codeSnippet: `-- Consultamos empleados contratados a partir del año 2022 en adelante\nSELECT nombre, fecha_ingreso\nFROM empleados\nWHERE fecha_ingreso >= '2022-01-01'\nORDER BY fecha_ingreso ASC;`,
        outputSnippet: `+----------------+---------------+\n| nombre         | fecha_ingreso |\n+----------------+---------------+\n| Carlos Mendoza | 2022-03-15    |\n| Mateo Díaz     | 2023-01-10    |\n| Andrés Solano  | 2024-02-01    |\n+----------------+---------------+\n3 filas devueltas`,
        byteTip: 'En SQLite también existe la función date(\'now\') para obtener la fecha actual del sistema.',
        pitfallTip: 'Asegúrate de incluir los ceros a la izquierda en meses y días de un dígito (usa "2024-03-05", nunca "2024-3-5").',
        keyPoints: [
          'Las fechas ISO admiten comparaciones directas con >= y <=.',
          'Permite ordenar cronológicamente de forma nativa sin funciones costosas.',
          'Es el formato que utiliza Room y Kotlin por defecto para persistir fechas.'
        ]
      }
    ]
  },

  'sql-u03-l06': {
    subtitle: 'Comprende la afinidad de tipos y la famosa flexibilidad interna de SQLite.',
    analogy: 'Un estacionamiento con letreros recomendados: hay plazas marcadas "autos pequeños", pero si llega una camioneta, el estacionamiento es flexible y la deja parquear. SQLite recomienda tipos (afinidad), pero prioriza guardar tus datos antes que detener el programa.',
    sections: [
      {
        title: 'La afinidad de tipos en SQLite (Type Affinity)',
        explanation: `En la mayoría de las bases de datos tradicionales (como PostgreSQL o SQL Server), los tipos son rígidos y estrictos: si defines una columna como \`INTEGER\` e intentas meter el texto \`"hola"\`, la base de datos rechaza la operación inmediatamente.

SQLite funciona bajo un concepto diferente llamado **Afinidad de Tipos** (*Type Affinity*):
• La columna tiene una afinidad preferida (por ejemplo \`INTEGER\`).
• Si insertas un dato que se puede convertir a ese tipo (por ejemplo, el texto \`"42"\`), SQLite lo convierte automáticamente a número entero \`42\`.
• Si insertas un dato incompatible, SQLite es flexible y lo almacena con su tipo real en lugar de romperse.

Las 5 afinidades oficiales de SQLite son: **TEXT**, **NUMERIC**, **INTEGER**, **REAL** y **BLOB**.`,
        codeSnippet: `-- SQLite intenta convertir textos numéricos a su afinidad nativa\nSELECT id, nombre, precio, (precio + 10) AS precio_con_recargo\nFROM productos\nWHERE id = 1;`,
        outputSnippet: `+----+----------------------+--------+---------------------++\n| id | nombre               | precio | precio_con_recargo  |\n+----+----------------------+--------+---------------------+\n| 1  | Teclado Mecánico RGB | 89.99  | 99.99               |\n+----+----------------------+--------+---------------------+\n1 fila devuelta`,
        byteTip: 'Aunque SQLite sea flexible, en Android con Room se imponen restricciones estrictas para garantizar calidad de datos profesional.',
        pitfallTip: 'No te confíes de la flexibilidad de SQLite guardando datos caóticos. Declara siempre tus columnas con tipos rigurosos y coherentes.',
        keyPoints: [
          'SQLite utiliza afinidades de tipos en lugar de tipado estático rígido.',
          'Convierte automáticamente datos compatibles a la afinidad de la columna.',
          'Room en Android añade una capa de validación estricta sobre esta flexibilidad.'
        ]
      },
      {
        title: 'Modo STRICT de SQLite en versiones modernas',
        explanation: `Para los programadores que prefieren que la base de datos rechace cualquier dato incompatible de inmediato, SQLite 3.37+ introdujo las **tablas STRICT**:
\`CREATE TABLE usuarios (...) STRICT;\`
En una tabla marcada con \`STRICT\`, SQLite desactiva su flexibilidad y se comporta con la misma rigidez estricta que PostgreSQL.`,
        codeSnippet: `-- Consulta estándar en SQLite sobre tipos numéricos y de texto bien estructurados\nSELECT id, nombre, stock\nFROM productos\nWHERE stock > 50;`,
        outputSnippet: `+----+------------------------+-------+\n| id | nombre                 | stock |\n+----+------------------------+-------+\n| 3  | Mouse Ergonómico Pro   | 80    |\n| 5  | Cable HDMI 2.1 Braided | 150   |\n+----+------------------------+-------+\n2 filas devueltas`,
        byteTip: 'Definir siempre tipos claros como INTEGER, REAL y TEXT hace que tu código sea compatible con cualquier motor de bases de datos.',
        pitfallTip: 'Evita crear tablas sin declarar los tipos de columna.',
        keyPoints: [
          'Las tablas STRICT imponen tipado rígido si así lo requieres.',
          'Escribir esquemas con tipos limpios es la mejor práctica de ingeniería.',
          'Facilita la migración futura de SQLite a otros motores si tu app crece a la nube.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 4: LLAVES Y RESTRICCIONES DE INTEGRIDAD
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u04-l01': {
    subtitle: 'Garantiza la identidad única de cada registro aplicando la restricción PRIMARY KEY.',
    analogy: 'El código de barras único impreso en cada producto de una tienda: el lector láser lo escanea y sabe exactamente de qué artículo se trata sin posibilidad de equivocarse con otro.',
    sections: [
      {
        title: 'La restricción PRIMARY KEY en CREATE TABLE',
        explanation: `Al crear una tabla, debemos definir cuál de sus columnas actuará como su Llave Primaria oficial.

Para hacerlo, agregamos las palabras clave **\`PRIMARY KEY\`** justo después del tipo de dato de esa columna:
\`CREATE TABLE usuarios (\`
\`    id INTEGER PRIMARY KEY,\`
\`    nombre TEXT\`
\`);\`

Efectos inmediatos:
1. SQLite crea automáticamente un **índice B-Tree único** sobre esa columna.
2. Si intentas insertar dos filas con el mismo \`id\`, SQLite rechazará la segunda inserción con un error de \`UNIQUE constraint failed\`.
3. Ningún registro podrá tener \`id\` nulo.`,
        codeSnippet: `-- Verificamos la unicidad de las llaves primarias en la tabla usuarios\nSELECT id, nombre, email\nFROM usuarios\nORDER BY id ASC;`,
        outputSnippet: `+----+-------------------+--------------------+\n| id | nombre            | email              |\n+----+-------------------+--------------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   |\n| 2  | Alan Turing       | alan@bletchley.org |\n| 3  | Grace Hopper      | grace@navy.mil     |\n| 4  | Linus Torvalds    | linus@linux.org    |\n| 5  | Margaret Hamilton | margaret@nasa.gov  |\n+----+-------------------+--------------------+\n5 filas devueltas`,
        byteTip: 'Toda tabla en una base de datos relacional profesional debe tener obligatoriamente una PRIMARY KEY.',
        pitfallTip: 'Olvidar la PRIMARY KEY en una tabla te impedirá relacionarla limpiamente con otras tablas mediante FOREIGN KEY.',
        keyPoints: [
          'PRIMARY KEY garantiza que no existan filas duplicadas en la tabla.',
          'Crea un índice de búsqueda ultra-rápido de forma automática.',
          'Es una regla obligatoria en el diseño de bases de datos relacionales.'
        ]
      },
      {
        title: 'Llaves primarias compuestas',
        explanation: `En algunas tablas intermedias, la llave primaria se compone de dos columnas juntas (por ejemplo, \`estudiante_id\` y \`asignatura_id\` combinadas):
\`PRIMARY KEY (estudiante_id, asignatura_id)\`
Esto garantiza que la combinación de ambos números sea única en todo el sistema.`,
        codeSnippet: `-- En matriculas, la combinación de estudiante y asignatura debe ser única por ciclo\nSELECT id, estudiante_id, asignatura_id, periodo\nFROM matriculas\nLIMIT 3;`,
        outputSnippet: `+----+---------------+---------------+---------+\n| id | estudiante_id | asignatura_id | periodo |\n+----+---------------+---------------+---------+\n| 1  | 1             | 101           | 2024-1  |\n| 2  | 1             | 103           | 2024-1  |\n| 3  | 2             | 101           | 2024-1  |\n+----+---------------+---------------+---------+\n3 filas devueltas`,
        byteTip: 'En la mayoría de los casos de Android, tener un simple id INTEGER PRIMARY KEY es más limpio y fácil de mapear con Room.',
        pitfallTip: 'No uses llaves compuestas de 4 o 5 columnas; hacen que las consultas sean complicadas y lentas.',
        keyPoints: [
          'Las llaves compuestas unen dos o más columnas para garantizar unicidad.',
          'Son comunes en tablas intermedias de relaciones N:M.',
          'Room en Android soporta tanto llaves simples como compuestas.'
        ]
      }
    ]
  },

  'sql-u04-l02': {
    subtitle: 'Deja que la base de datos numere tus registros automáticamente con INTEGER PRIMARY KEY y AUTOINCREMENT.',
    analogy: 'El dispensador de números de atención de un banco: cada cliente que llega presiona un botón y recibe el siguiente número correlativo (1, 2, 3...) sin tener que inventárselo.',
    sections: [
      {
        title: 'INTEGER PRIMARY KEY y autoincremento en SQLite',
        explanation: `Al insertar un nuevo registro (como un nuevo usuario que se acaba de registrar en tu app), no quieres tener que calcular tú mismo manualmente cuál fue el último ID para sumarle 1.

En SQLite existe una regla mágica:
Si declaras una columna exactamente como **\`INTEGER PRIMARY KEY\`**:
• SQLite la vincula directamente con la fila interna de la tabla (**\`rowid\`**).
• Cuando insertes un registro y omitas el \`id\` (o le pases \`NULL\`), **SQLite le asignará automáticamente el siguiente número entero secuencial disponible**.`,
        codeSnippet: `-- Tabla diseñada con llave primaria autoincremental en SQLite\nCREATE TABLE clientes_nuevos (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nombre TEXT NOT NULL,\n    fecha_registro DATE DEFAULT CURRENT_DATE\n);`,
        outputSnippet: `Tabla 'clientes_nuevos' creada con autoincremento habilitado.`,
        byteTip: 'En SQLite, INTEGER PRIMARY KEY a secas ya autoincrementa. Agregar AUTOINCREMENT previene estrictamente la reutilización de IDs borrados en el pasado.',
        pitfallTip: 'Solo funciona con INTEGER. Si escribes INT PRIMARY KEY, SQLite no activará el comportamiento de autoincremento nativo.',
        keyPoints: [
          'INTEGER PRIMARY KEY genera identificadores correlativos automáticos.',
          'Evita que tengas que consultar el último ID antes de insertar.',
          'AUTOINCREMENT garantiza que ningún ID del pasado vuelva a usarse jamás.'
        ]
      },
      {
        title: 'Inserción automática sin especificar ID',
        explanation: `Al insertar en una tabla con \`INTEGER PRIMARY KEY\`, simplemente omites la columna \`id\` y te concentras en los datos reales:`,
        codeSnippet: `-- Consulta que demuestra IDs generados de forma correlativa limpia\nSELECT id, nombre\nFROM usuarios\nORDER BY id DESC\nLIMIT 3;`,
        outputSnippet: `+----+-------------------+\n| id | nombre            |\n+----+-------------------+\n| 5  | Margaret Hamilton |\n| 4  | Linus Torvalds    |\n| 3  | Grace Hopper      |\n+----+-------------------+\n3 filas devueltas`,
        byteTip: 'ORDER BY id DESC ordena del ID más reciente al más antiguo (orden cronológico inverso).',
        pitfallTip: 'No dependas de que los IDs sean exactamente consecutivos sin saltos; si un INSERT falla o se borra un registro, habrá huecos numéricos normales.',
        keyPoints: [
          'Omitir el id en el INSERT delega la numeración a la base de datos.',
          'Garantiza que no ocurran colisiones entre diferentes usuarios simultáneos.',
          'Es el estándar indiscutible en bases de datos móviles y servidores.'
        ]
      }
    ]
  },

  'sql-u04-l03': {
    subtitle: 'Declara llaves foráneas explícitas con FOREIGN KEY y REFERENCES para blindar tus relaciones.',
    analogy: 'Un enchufe y un tomacorriente con forma especial: el enchufe (FOREIGN KEY) solo entra en un tomacorriente que coincida exactamente con su forma (REFERENCES tabla_principal(id)). No puedes enchufarlo en el aire.',
    sections: [
      {
        title: 'Sintaxis de FOREIGN KEY en CREATE TABLE',
        explanation: `Para que SQLite sepa formalmente que una columna es una Llave Foránea vinculada a otra tabla, usamos la cláusula **\`FOREIGN KEY ... REFERENCES\`** en el momento de crear la tabla:

\`CREATE TABLE matriculas (\`
\`    id INTEGER PRIMARY KEY AUTOINCREMENT,\`
\`    estudiante_id INTEGER NOT NULL,\`
\`    asignatura_id INTEGER NOT NULL,\`
\`    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),\`
\`    FOREIGN KEY (asignatura_id) REFERENCES asignaturas(id)\`
\`);\``,
        codeSnippet: `-- Verificamos los registros de la tabla matriculas protegida por llaves foráneas\nSELECT id, estudiante_id, asignatura_id, periodo, nota_final\nFROM matriculas\nWHERE periodo = '2024-1';`,
        outputSnippet: `+----+---------------+---------------+---------+------------+\n| id | estudiante_id | asignatura_id | periodo | nota_final |\n+----+---------------+---------------+---------+------------+\n| 1  | 1             | 101           | 2024-1  | 9.5        |\n| 2  | 1             | 103           | 2024-1  | 9.2        |\n| 3  | 2             | 101           | 2024-1  | 8.7        |\n| 4  | 2             | 102           | 2024-1  | 8.9        |\n| 5  | 3             | 101           | 2024-1  | 9.8        |\n| 6  | 4             | 104           | 2024-1  | 8.0        |\n| 7  | 5             | 103           | 2024-1  | 9.0        |\n+----+---------------+---------------+---------+------------+\n7 filas devueltas`,
        byteTip: 'En SQLite, las llaves foráneas se pueden declarar al final de la tabla o en la misma línea: estudiante_id INTEGER REFERENCES estudiantes(id).',
        pitfallTip: 'Por defecto, SQLite viene con la verificación de llaves foráneas desactivada por compatibilidad histórica. Debes activarla siempre con PRAGMA foreign_keys = ON;.',
        keyPoints: [
          'FOREIGN KEY declara formalmente la relación entre dos tablas.',
          'REFERENCES especifica la tabla y columna destino exactas.',
          'Protege la base de datos contra registros huérfanos o referencias rotas.'
        ]
      },
      {
        title: 'Acciones automáticas con ON DELETE',
        explanation: `¿Qué debe pasar con las matrículas de un alumno si el alumno es borrado de la universidad?
Puedes configurar el comportamiento automático en la propia llave foránea:
• **\`ON DELETE CASCADE\`**: Si se borra el alumno, SQLite borra automáticamente todas sus matrículas asociadas en cascada.
• **\`ON DELETE RESTRICT\`** (Predeterminado): SQLite bloquea el borrado del alumno mientras tenga materias matriculadas.
• **\`ON DELETE SET NULL\`**: Pone en \`null\` la columna del hijo.`,
        codeSnippet: `-- Ejemplo conceptual de tabla con borrado en cascada configurado\nCREATE TABLE comentarios (\n    id INTEGER PRIMARY KEY,\n    usuario_id INTEGER,\n    contenido TEXT,\n    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE\n);`,
        outputSnippet: `Tabla 'comentarios' creada con ON DELETE CASCADE.`,
        byteTip: 'ON DELETE CASCADE es ideal para relaciones donde los hijos no tienen ningún sentido de existir sin el padre (como los renglones de una factura).',
        pitfallTip: 'Usa CASCADE con precaución: borrar un registro principal por accidente podría eliminar miles de registros dependientes.',
        keyPoints: [
          'ON DELETE CASCADE limpia registros secundarios automáticamente.',
          'ON DELETE RESTRICT protege registros principales contra eliminaciones accidentales.',
          'Centraliza la política de eliminación en el motor de la base de datos.'
        ]
      }
    ]
  },

  'sql-u04-l04': {
    subtitle: 'Exige datos obligatorios y prohíbe casillas vacías con la restricción NOT NULL.',
    analogy: 'Un formulario donde los campos marcados con un asterisco rojo (*) son obligatorios: si intentas presionar el botón "Registrarse" sin haber escrito tu nombre o contraseña, el sistema no te deja continuar.',
    sections: [
      {
        title: 'La restricción NOT NULL',
        explanation: `Por defecto, cualquier columna de una tabla en SQL acepta valores \`NULL\` (ausencia de dato).

Sin embargo, en cualquier sistema real hay datos que son **estrictamente indispensables**:
• Un usuario no puede existir sin \`nombre\` ni sin \`contrasena\`.
• Un producto no puede existir sin \`precio\`.
• Una factura no puede existir sin \`fecha\`.

Para prohibir que una columna quede vacía, agregamos la restricción **\`NOT NULL\`**:
\`CREATE TABLE usuarios (\`
\`    id INTEGER PRIMARY KEY,\`
\`    nombre TEXT NOT NULL,\`
\`    email TEXT NOT NULL\`
\`);\`

Si alguien intenta insertar una fila sin proporcionar un valor para esa columna, SQLite rechazará la operación con un error de \`NOT NULL constraint failed\`.`,
        codeSnippet: `-- Consultamos columnas que tienen restricción NOT NULL garantizada\nSELECT id, nombre, email\nFROM usuarios\nWHERE nombre IS NOT NULL;`,
        outputSnippet: `+----+-------------------+--------------------+\n| id | nombre            | email              |\n+----+-------------------+--------------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   |\n| 2  | Alan Turing       | alan@bletchley.org |\n| 3  | Grace Hopper      | grace@navy.mil     |\n| 4  | Linus Torvalds    | linus@linux.org    |\n| 5  | Margaret Hamilton | margaret@nasa.gov  |\n+----+-------------------+--------------------+\n5 filas devueltas`,
        byteTip: 'En Kotlin y Room, una propiedad no anulable (val nombre: String) se traduce automáticamente a una columna con NOT NULL en SQLite.',
        pitfallTip: 'Un texto vacío "" NO es null para SQLite. Si insertas "", pasará la restricción NOT NULL. Para evitar textos vacíos se usa CHECK.',
        keyPoints: [
          'NOT NULL exige que la columna tenga siempre un valor válido asignado.',
          'Evita que se guarden registros incompletos o defectuosos.',
          'Se alinea directamente con los tipos no anulables de Kotlin.'
        ]
      },
      {
        title: 'Combinar NOT NULL con valores DEFAULT',
        explanation: `Puedes combinar \`NOT NULL\` con un valor por defecto \`DEFAULT\` para que si el usuario no envía el dato, la base de datos lo rellene sola:`,
        codeSnippet: `-- Tabla con campos obligatorios respaldados por valores por defecto\nCREATE TABLE inventario_rapido (\n    codigo TEXT PRIMARY KEY,\n    stock INTEGER NOT NULL DEFAULT 0\n);`,
        outputSnippet: `Tabla 'inventario_rapido' creada con éxito.`,
        byteTip: 'stock INTEGER NOT NULL DEFAULT 0 asegura que el stock jamás sea null; si no se especifica, arranca en 0.',
        pitfallTip: 'No uses NOT NULL en campos que legítimamente pueden ser opcionales para el usuario (como segundo_telefono).',
        keyPoints: [
          'NOT NULL + DEFAULT garantiza un valor concreto sin intervención manual.',
          'Protege la base de datos contra inconsistencias de lógica en la app.',
          'Es la combinación más habitual en contadores y acumuladores de estado.'
        ]
      }
    ]
  },

  'sql-u04-l05': {
    subtitle: 'Evita correos o identificaciones duplicadas en tu base de datos usando la restricción UNIQUE.',
    analogy: 'La matrícula o placa de un automóvil: en una ciudad no pueden circular dos vehículos con exactamente la misma placa de circulación. La placa es única para ese vehículo.',
    sections: [
      {
        title: 'La restricción UNIQUE',
        explanation: `Ya vimos que la Llave Primaria (\`id\`) es única por definición. Pero frecuentemente necesitamos que **otras columnas secundarias tampoco se repitan jamás**:
• El correo electrónico (\`email\`) de los usuarios en un inicio de sesión.
• El nombre de usuario (\`username\` o apodo).
• El código de barras (\`codigo_barras\`) de un producto en el supermercado.

Para garantizar esto, usamos la restricción **\`UNIQUE\`**:
\`CREATE TABLE usuarios (\`
\`    id INTEGER PRIMARY KEY,\`
\`    email TEXT UNIQUE NOT NULL\`
\`);\`

Si intentas registrar un segundo usuario con un correo que ya existe, SQLite detendrá la operación de inmediato con \`UNIQUE constraint failed: usuarios.email\`.`,
        codeSnippet: `-- Consultamos correos únicos que están protegidos por restricción UNIQUE\nSELECT id, nombre, email\nFROM usuarios\nORDER BY email ASC;`,
        outputSnippet: `+----+-------------------+--------------------+\n| id | nombre            | email              |\n+----+-------------------+--------------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   |\n| 2  | Alan Turing       | alan@bletchley.org |\n| 3  | Grace Hopper      | grace@navy.mil     |\n| 4  | Linus Torvalds    | linus@linux.org    |\n| 5  | Margaret Hamilton | margaret@nasa.gov  |\n+----+-------------------+--------------------+\n5 filas devueltas`,
        byteTip: 'Al igual que con la PRIMARY KEY, SQLite crea automáticamente un índice de búsqueda ultra-rápido para toda columna marcada con UNIQUE.',
        pitfallTip: 'En SQL estándar, varias filas pueden tener NULL en una columna UNIQUE (porque null no es igual a nada). Si no quieres nulos, usa UNIQUE NOT NULL.',
        keyPoints: [
          'UNIQUE garantiza que no existan valores duplicados en esa columna.',
          'Crea un índice de búsqueda eficiente de forma transparente.',
          'Esencial para correos, nombres de usuario y códigos de identificación.'
        ]
      },
      {
        title: 'Restricción UNIQUE compuesta sobre múltiples columnas',
        explanation: `Puedes aplicar la restricción sobre la combinación de dos columnas: por ejemplo, que un usuario pueda tener varios favoritos, pero no pueda marcar dos veces el mismo producto como favorito:`,
        codeSnippet: `-- Ejemplo conceptual de tabla de favoritos con unicidad de par\nCREATE TABLE favoritos_usuario (\n    id INTEGER PRIMARY KEY,\n    usuario_id INTEGER NOT NULL,\n    producto_id INTEGER NOT NULL,\n    UNIQUE(usuario_id, producto_id)\n);`,
        outputSnippet: `Tabla 'favoritos_usuario' creada con restricción UNIQUE combinada.`,
        byteTip: 'UNIQUE(colA, colB) permite que colA se repita y colB se repita, pero la combinación de ambas juntas debe ser única.',
        pitfallTip: 'No confíes solo en validar duplicados en Kotlin; la restricción UNIQUE en SQLite es tu garantía final a prueba de fallos concurrentes.',
        keyPoints: [
          'UNIQUE sobre múltiples columnas previene duplicaciones compuestas.',
          'Evita que un usuario vote o califique dos veces el mismo contenido.',
          'Protege la base de datos contra peticiones dobles por fallas de conexión móvil.'
        ]
      }
    ]
  },

  'sql-u04-l06': {
    subtitle: 'Valida rangos numéricos y reglas de negocio complejas directamente en la base de datos con CHECK.',
    analogy: 'Un torniquete con medidor de edad y boleto: revisa automáticamente que tu edad sea mayor a 0 y que el precio pagado no sea negativo antes de dejarte pasar.',
    sections: [
      {
        title: 'La restricción CHECK: validación de reglas de negocio',
        explanation: `¿Qué pasa si un programador despistado o un error en la app intenta guardar un producto con precio \`-50.0\` o una edad de \`-12\` años?

La restricción **\`CHECK\`** te permite escribir una condición booleana que SQLite validará obligatoriamente antes de aceptar cualquier \`INSERT\` o \`UPDATE\`:
\`CREATE TABLE productos (\`
\`    id INTEGER PRIMARY KEY,\`
\`    precio REAL CHECK (precio >= 0.0),\`
\`    stock INTEGER CHECK (stock >= 0)\`
\`);\`

Si la condición del \`CHECK\` resulta ser \`false\`, SQLite bloquea el cambio y devuelve un error de \`CHECK constraint failed\`. ¡Es el guardián de tus reglas de negocio!`,
        codeSnippet: `-- Consultamos productos cuyos precios y existencias cumplen las reglas de negocio\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE precio > 0 AND stock >= 0;`,
        outputSnippet: `+----+------------------------------+--------+-------+\n| id | nombre                       | precio | stock |\n+----+------------------------------+--------+-------+\n| 1  | Teclado Mecánico RGB         | 89.99  | 45    |\n| 2  | Monitor Ultrawide 34"        | 429.5  | 12    |\n| 3  | Mouse Ergonómico Pro         | 49.9   | 80    |\n| 4  | Auriculares Cancelación Ruido| 129.0  | 25    |\n| 5  | Cable HDMI 2.1 Braided       | 14.99  | 150   |\n+----+------------------------------+--------+-------+\n5 filas devueltas`,
        byteTip: "Puedes validar listas de opciones con IN: CHECK (genero IN ('M', 'F', 'O')).",
        pitfallTip: 'No escribas condiciones CHECK con fórmulas imposibles que hagan que nunca se pueda insertar un dato válido.',
        keyPoints: [
          'CHECK evalúa una expresión booleana en cada inserción o modificación.',
          'Impide datos ilógicos (precios negativos, edades absurdas, estados inválidos).',
          'Blindar la base de datos con CHECK asegura la calidad de los datos sin importar de dónde vengan.'
        ]
      },
      {
        title: 'Validación de textos no vacíos con CHECK',
        explanation: `Como vimos en la lección de \`NOT NULL\`, un texto vacío \`""\` no es nulo. Puedes combinar \`NOT NULL\` con \`CHECK(length(titulo) > 0)\` para garantizar que el título no sea un texto vacío:`,
        codeSnippet: `-- Tabla blindada contra textos vacíos con CHECK\nCREATE TABLE tareas_estrictas (\n    id INTEGER PRIMARY KEY,\n    titulo TEXT NOT NULL CHECK (length(trim(titulo)) >= 3)\n);`,
        outputSnippet: `Tabla 'tareas_estrictas' creada con validación de longitud mínima en CHECK.`,
        byteTip: 'CHECK(length(trim(titulo)) >= 3) impide que alguien guarde tareas con solo espacios en blanco.',
        pitfallTip: 'Mantén las reglas CHECK simples y comprensibles para no ralentizar inserciones masivas.',
        keyPoints: [
          'CHECK permite invocar funciones estándar como length() y trim().',
          'Es el complemento perfecto de NOT NULL para texto.',
          'Evita almacenar registros con campos en blanco o espacios basura.'
        ]
      }
    ]
  },

  'sql-u04-l07': {
    subtitle: 'Asigna valores automáticos a columnas no especificadas usando la cláusula DEFAULT.',
    analogy: 'El valor por defecto de un teléfono nuevo al sacarlo de su caja: viene con el volumen al 50%, el idioma en español y la pantalla en brillo automático, a menos que tú decidas cambiarlo expresamente.',
    sections: [
      {
        title: 'Valores predeterminados con DEFAULT',
        explanation: `A menudo queremos que una columna tenga un valor estándar automático si el código que inserta el registro no especifica ninguno:
• Que la fecha de creación sea la fecha de hoy (\`CURRENT_DATE\`).
• Que una cuenta nazca activa (\`true\`).
• Que el saldo inicial sea \`0.0\`.
• Que el país predeterminado sea \`"Costa Rica"\`.

Para esto usamos la cláusula **\`DEFAULT\`**:
\`CREATE TABLE usuarios (\`
\`    id INTEGER PRIMARY KEY,\`
\`    nombre TEXT NOT NULL,\`
\`    activo BOOLEAN DEFAULT true,\`
\`    rol TEXT DEFAULT 'CLIENTE'\`
\`);\``,
        codeSnippet: `-- Consultamos empleados donde la columna 'activo' tiene valores booleanos predeterminados\nSELECT id, nombre, activo\nFROM empleados;`,
        outputSnippet: `+-----+----------------+--------+\n| id  | nombre         | activo |\n+-----+----------------+--------+\n| 101 | Carlos Mendoza | true   |\n| 102 | Elena Rostova  | true   |\n| 103 | Mateo Díaz     | true   |\n| 104 | Sofía Valerio  | true   |\n| 105 | Andrés Solano  | false  |\n+-----+----------------+--------+\n5 filas devueltas`,
        byteTip: 'SQLite incluye constantes automáticas para fechas: CURRENT_DATE (fecha actual), CURRENT_TIME (hora actual) y CURRENT_TIMESTAMP (fecha y hora exacta).',
        pitfallTip: 'Si en el INSERT envías explícitamente el valor NULL, SQLite colocará NULL y no aplicará el DEFAULT (a menos que la columna sea NOT NULL).',
        keyPoints: [
          'DEFAULT asigna un valor automático si la columna se omite en el INSERT.',
          'Permite escribir sentencias INSERT más cortas y limpias.',
          'Soporta números, textos, booleanos y marcas de tiempo del sistema (CURRENT_DATE).'
        ]
      },
      {
        title: 'Auditoría automática de registros con marcas de tiempo',
        explanation: `Uno de los usos más profesionales de \`DEFAULT\` es registrar cuándo se creó cada fila sin tener que calcular la hora desde Kotlin:`,
        codeSnippet: `-- Tabla con registro automático de fecha de creación del sistema\nCREATE TABLE bitacora_sistema (\n    id INTEGER PRIMARY KEY,\n    evento TEXT NOT NULL,\n    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP\n);`,
        outputSnippet: `Tabla 'bitacora_sistema' creada con CURRENT_TIMESTAMP automático.`,
        byteTip: 'CURRENT_TIMESTAMP genera la fecha en formato ISO estándar "AAAA-MM-DD HH:MM:SS".',
        pitfallTip: 'El reloj del sistema local del teléfono puede ser alterado por el usuario; en servidores se usa la hora UTC.',
        keyPoints: [
          'CURRENT_TIMESTAMP es el estándar para sellos de tiempo automáticos.',
          'Ahorra pasar fechas manualmente desde la app móvil.',
          'Facilita la auditoría y depuración cronológica de eventos.'
        ]
      }
    ]
  },

  'sql-u04-l08': {
    subtitle: 'Distingue con total precisión entre NULL, cero (0), texto vacío ("") y valor predeterminado.',
    analogy: 'NULL es no tener cuenta bancaria. 0 pesos es tener una cuenta bancaria abierta pero sin dinero. Texto vacío "" es tener una libreta con las páginas en blanco. Valor DEFAULT es el saldo inicial de bienvenida que te regala el banco al abrir la cuenta.',
    sections: [
      {
        title: 'NULL vs Cero vs Texto Vacío vs DEFAULT',
        explanation: `Uno de los errores conceptuales más peligrosos en bases de datos es confundir estos cuatro estados:

1. **\`NULL\`:** Representa **desconocimiento o ausencia total de dato**. No es cero ni es texto vacío. Es un signo de interrogación: no sabemos el dato.
2. **\`0\` (Cero):** Es un valor numérico concreto y medible. Si tu saldo es \`0\`, sabemos con certeza matemática cuánto tienes: ¡cero pesos!
3. **\`""\` (Texto vacío):** Es una cadena de texto válida cuya longitud es estrictamente cero caracteres.
4. **\`DEFAULT\`:** Es la regla que decide qué valor asignar si nadie proporciona un dato al insertar.

En SQL, **\`NULL\` jamás se compara con el signo \`=\`**. Para verificar nulos se usa obligatoriamente **\`IS NULL\`** o **\`IS NOT NULL\`**:
\`WHERE telefono IS NULL\``,
        codeSnippet: `-- Demostración de cómo se filtran los nulos de forma correcta con IS NULL\nSELECT id, nombre, email\nFROM usuarios\nWHERE email IS NOT NULL;`,
        outputSnippet: `+----+-------------------+--------------------+\n| id | nombre            | email              |\n+----+-------------------+--------------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   |\n| 2  | Alan Turing       | alan@bletchley.org |\n| 3  | Grace Hopper      | grace@navy.mil     |\n| 4  | Linus Torvalds    | linus@linux.org    |\n| 5  | Margaret Hamilton | margaret@nasa.gov  |\n+----+-------------------+--------------------+\n5 filas devueltas`,
        byteTip: 'Escribir WHERE email = NULL dará 0 filas siempre en SQL. En la lógica tripartita de SQL, NULL = NULL se evalúa como Desconocido (UNKNOWN), no como true.',
        pitfallTip: 'Nunca uses el operador = para comparar contra NULL; usa siempre IS NULL o IS NOT NULL.',
        keyPoints: [
          'NULL es ausencia de dato; 0 y "" son datos existentes con valor cero o vacío.',
          'Las comparaciones con NULL exigen las cláusulas IS NULL e IS NOT NULL.',
          'Confundir NULL con cero produce reportes contables y promedios erróneos.'
        ]
      },
      {
        title: 'El impacto de NULL en los promedios',
        explanation: `Mira por qué distinguir entre \`NULL\` y \`0\` es de vida o muerte:
• Si un alumno no hizo el examen (\`nota = NULL\`), la función \`AVG()\` de SQL **ignora los nulos** y calcula el promedio con los exámenes que sí hizo.
• Si le pones \`nota = 0\`, la función \`AVG()\` sumará el cero y destruirá su promedio dividiendo entre un examen más.`,
        codeSnippet: `-- Consultamos notas de matrículas donde los cálculos respetan los valores numéricos\nSELECT AVG(nota_final) AS promedio_general_alumnos\nFROM matriculas;`,
        outputSnippet: `+--------------------------+\n| promedio_general_alumnos |\n+--------------------------+\n| 8.9                      |\n+--------------------------+\n1 fila devuelta`,
        byteTip: 'Usa NULL cuando el evento no ha ocurrido aún (ej: fecha_devolucion en un préstamo de libro mientras el libro sigue prestado).',
        pitfallTip: 'No uses valores centinela extraños como -1 o 9999 para representar nulos; usa NULL de forma nativa.',
        keyPoints: [
          'Las funciones de agregación (AVG, SUM, MIN, MAX) ignoran automáticamente los valores NULL.',
          'Usar 0 en lugar de NULL altera los cálculos estadísticos del sistema.',
          'NULL representa fielmente estados pendientes o información no disponible.'
        ]
      }
    ]
  }
};
