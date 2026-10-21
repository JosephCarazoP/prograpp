import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_12_THEORY: Record<string, TheoryLesson> = {
  "sql-u12-l01": {
    "id": "sql-th-u12-l01",
    "lessonId": "sql-u12-l01",
    "pathId": "sql",
    "unitId": 12,
    "levelId": 1,
    "title": "1. Activación de llaves foráneas (PRAGMA foreign_keys)",
    "subtitle": "Comprende la particularidad histórica de SQLite: por qué las llaves foráneas vienen desactivadas y cómo activarlas con PRAGMA.",
    "estimatedMinutes": 8,
    "analogy": "El freno de mano de un vehículo: el auto ya tiene los frenos instalados de fábrica, pero si no quitas el seguro o no los activas conscientemente, el mecanismo no detendrá el vehículo.",
    "video": {
      "title": "Integridad Referencial, ON DELETE CASCADE y Transacciones ACID",
      "channel": "Midudev",
      "duration": "41:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Activación de PRAGMA foreign_keys, acciones en cascada y control con BEGIN, COMMIT, ROLLBACK."
    },
    "sections": [
      {
        "title": "La directiva PRAGMA foreign_keys = ON",
        "explanation": "Por razones de compatibilidad histórica hacia atrás (con versiones muy antiguas de SQLite del año 2000), **SQLite tiene la verificación de llaves foráneas DESACTIVADA por defecto**.\n\nEsto significa que si creas una tabla con `FOREIGN KEY` pero no activas la verificación:\n• Podrías insertar una matrícula con `estudiante_id = 9999` (un estudiante que no existe).\n• SQLite lo aceptará sin marcar ningún error, corrompiendo la integridad de tus datos.\n\nPara activar la verificación estricta de llaves foráneas, debes ejecutar esta instrucción especial al abrir tu conexión:\n`PRAGMA foreign_keys = ON;`",
        "codeSnippet": "-- Activamos la verificación obligatoria de llaves foráneas en SQLite\nPRAGMA foreign_keys = ON;\n\nSELECT 1 AS llaves_foraneas_activadas;",
        "codeLanguage": "sql",
        "outputSnippet": "PRAGMA foreign_keys = ON configurado con éxito.\n+--------------------------+\n| llaves_foraneas_activadas|\n+--------------------------+\n| 1                        |\n+--------------------------+\n1 row in set (0.001 sec)",
        "byteTip": "Afortunadamente, la biblioteca Room de Android ejecuta PRAGMA foreign_keys = ON automáticamente por ti bajo el capó.",
        "pitfallTip": "Si trabajas con SQLite directamente en scripts, terminales o drivers nativos de C/Python, ¡debes ejecutar este PRAGMA siempre al iniciar!",
        "keyPoints": [
          "SQLite desactiva la comprobación de llaves foráneas por compatibilidad heredada.",
          "PRAGMA foreign_keys = ON activa la comprobación en la conexión actual.",
          "Garantiza que la base de datos rechace datos huérfanos o inválidos."
        ]
      },
      {
        "title": "Verificación del estado de configuración",
        "explanation": "Puedes comprobar en cualquier momento si la conexión actual tiene las restricciones activas ejecutando la directiva como una consulta de lectura:",
        "codeSnippet": "-- Consultamos el estado actual del pragma de llaves foráneas\nPRAGMA foreign_keys;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------+\n| foreign_keys |\n+--------------+\n| 1            |\n+--------------+\n1 row in set (0.001 sec)",
        "byteTip": "El valor 1 indica ON (activo); el valor 0 indica OFF (inactivo).",
        "pitfallTip": "El comando PRAGMA solo afecta a la conexión abierta actual; no persiste globalmente si cierras y vuelves a abrir la base de datos.",
        "keyPoints": [
          "PRAGMA es la palabra clave de SQLite para consultar y ajustar parámetros del motor.",
          "La verificación debe activarse en cada sesión de conexión.",
          "Es el primer paso fundamental para garantizar la integridad referencial."
        ]
      }
    ]
  },
  "sql-u12-l02": {
    "id": "sql-th-u12-l02",
    "lessonId": "sql-u12-l02",
    "pathId": "sql",
    "unitId": 12,
    "levelId": 2,
    "title": "2. Referencias inexistentes",
    "subtitle": "Comprueba cómo el motor relacional bloquea de inmediato inserciones corruptas cuando una llave foránea apunta a la nada.",
    "estimatedMinutes": 8,
    "analogy": "Intentar registrar una receta médica a nombre de un paciente que no existe en el hospital: el sistema del hospital rechaza el registro inmediatamente diciendo \"Paciente no encontrado\".",
    "video": {
      "title": "Integridad Referencial, ON DELETE CASCADE y Transacciones ACID",
      "channel": "Midudev",
      "duration": "41:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Activación de PRAGMA foreign_keys, acciones en cascada y control con BEGIN, COMMIT, ROLLBACK."
    },
    "sections": [
      {
        "title": "Bloqueo de referencias inexistentes: FOREIGN KEY constraint failed",
        "explanation": "Una vez que `PRAGMA foreign_keys = ON` está activo, la base de datos actúa como un guardián incorruptible:\n• Antes de permitir que una fila se inserte en la tabla hija (`matriculas`), el motor toma el valor de la llave foránea (`estudiante_id`).\n• Va a la tabla padre (`estudiantes`) y busca si existe una fila con esa llave primaria.\n• **Si no existe**, la operación se aborta de inmediato con el error oficial:\n  `FOREIGN KEY constraint failed`\n\nEste mecanismo previene la existencia de **registros huérfanos** (datos hijos que apuntan a entidades que jamás existieron o que fueron borradas).",
        "codeSnippet": "-- Verificamos los estudiantes reales existentes en la base de datos\nSELECT id, nombre, carrera FROM estudiantes;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+------------------------+\n| id | nombre          | carrera                |\n+----+-----------------+------------------------+\n| 1  | Valeria Morales | Ingeniería de Software |\n| 2  | Diego Fernández | Ciencias Computación   |\n| 3  | Camila Gómez    | Sistemas Información   |\n| 4  | Javier Ramos    | Ciberseguridad         |\n| 5  | Lucía Navarro   | Ingeniería de Software |\n+----+-----------------+------------------------+\n5 rows in set (0.001 sec)",
        "byteTip": "Los registros huérfanos son la principal causa de excepciones NullPointerException en aplicaciones móviles.",
        "pitfallTip": "Nunca intentes burlar este error desactivando las llaves foráneas; la solución correcta es insertar primero al padre legítimo.",
        "keyPoints": [
          "FOREIGN KEY constraint failed protege contra la corrupción lógica de datos.",
          "Garantiza que cada registro hijo esté respaldado por un registro padre válido.",
          "Es la mayor ventaja de usar una base de datos relacional frente a simples archivos de texto."
        ]
      },
      {
        "title": "El orden obligatorio en las inserciones y borrados",
        "explanation": "La integridad referencial impone una disciplina estricta en el flujo de tus datos:\n1. **Para insertar:** primero debes insertar al **padre** (`estudiantes`), y solo después al **hijo** (`matriculas`).\n2. **Para borrar:** primero debes borrar al **hijo** (`matriculas`), y solo después al **padre** (`estudiantes`).\n\nSi intentas borrar a un padre que todavía tiene hijos asociados, SQLite bloqueará la eliminación para proteger a los hijos:",
        "codeSnippet": "-- Confirmamos que las matrículas actuales tienen padres válidos\nSELECT m.id AS matricula_id, e.id AS estudiante_id, e.nombre\nFROM matriculas AS m\nJOIN estudiantes AS e ON m.estudiante_id = e.id\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------+---------------+-----------------+\n| matricula_id | estudiante_id | nombre          |\n+--------------+---------------+-----------------+\n| 1            | 1             | Valeria Morales |\n| 2            | 1             | Valeria Morales |\n| 3            | 2             | Diego Fernández |\n+--------------+---------------+-----------------+\n3 rows in set (0.001 sec)",
        "byteTip": "En Android con Room, define tus entidades padre primero y luego las entidades dependientes con ForeignKey annotations.",
        "pitfallTip": "Si borras una tabla padre antes de borrar la tabla hija en un script de pruebas, obtendrás un error de bloqueo referencial.",
        "keyPoints": [
          "El padre debe existir antes de que el hijo pueda crearse.",
          "El hijo debe removerse antes de que el padre pueda ser eliminado.",
          "Esta jerarquía mantiene la estabilidad de la información en el tiempo."
        ]
      }
    ]
  },
  "sql-u12-l03": {
    "id": "sql-th-u12-l03",
    "lessonId": "sql-u12-l03",
    "pathId": "sql",
    "unitId": 12,
    "levelId": 3,
    "title": "3. ON DELETE / ON UPDATE: NO ACTION, RESTRICT, CASCADE, SET NULL",
    "subtitle": "Aprende a configurar acciones automáticas ante eliminaciones y cambios con ON DELETE CASCADE, SET NULL y RESTRICT.",
    "estimatedMinutes": 8,
    "analogy": "Un folder con contratos de un cliente: si la empresa cliente se disuelve, ¿destruyes automáticamente todos sus contratos en la trituradora (CASCADE), o borras el nombre del cliente dejando los contratos archivados como anónimos (SET NULL)?",
    "video": {
      "title": "Integridad Referencial, ON DELETE CASCADE y Transacciones ACID",
      "channel": "Midudev",
      "duration": "41:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Activación de PRAGMA foreign_keys, acciones en cascada y control con BEGIN, COMMIT, ROLLBACK."
    },
    "sections": [
      {
        "title": "Acciones referenciales automáticas (ON DELETE / ON UPDATE)",
        "explanation": "¿Qué debe pasar con los registros hijos cuando alguien elimina un registro padre?\nSQL te permite configurar el comportamiento exacto en la declaración de la llave foránea:\n\n1. **`ON DELETE RESTRICT` (o `NO ACTION`)**:\nEs el valor por defecto. Si intentas borrar al padre mientras tenga hijos, SQLite **prohíbe y bloquea la operación**. Debes borrar a los hijos manualmente primero.\n\n2. **`ON DELETE CASCADE`**:\n¡Eliminación en cadena! Al borrar al padre, SQLite **borra automáticamente a todos sus hijos**. Por ejemplo, al borrar un usuario, se borran automáticamente todos sus mensajes y notificaciones.\n\n3. **`ON DELETE SET NULL`**:\nAl borrar al padre, los registros hijos se conservan pero su columna de llave foránea cambia su valor a **`NULL`**. Útil cuando el historial del registro hijo sigue teniendo valor estadístico.",
        "codeSnippet": "-- Demostración de sintaxis de tabla con eliminación en cascada\nCREATE TABLE IF NOT EXISTS matriculas_ejemplo (\n  id INTEGER PRIMARY KEY,\n  estudiante_id INTEGER,\n  asignatura_id INTEGER,\n  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE\n);",
        "codeLanguage": "sql",
        "outputSnippet": "Query OK, 0 rows affected (Engine: InMemory Relational DB)\nTabla 'matriculas_ejemplo' registrada en memoria.",
        "byteTip": "En Room para Android, puedes configurar la cascada directamente en la anotación @ForeignKey(onDelete = ForeignKey.CASCADE).",
        "pitfallTip": "Usa CASCADE con extrema prudencia: un solo DELETE sobre una cuenta de usuario podría borrar cientos de miles de registros en cadena sin pedir confirmación.",
        "keyPoints": [
          "RESTRICT bloquea el borrado si existen hijos dependientes.",
          "CASCADE propaga la eliminación automáticamente a todas las tablas hijas.",
          "SET NULL conserva los hijos desvinculándolos del padre eliminado."
        ]
      },
      {
        "title": "Buenas prácticas de arquitectura de datos",
        "explanation": "¿Cómo elegir entre CASCADE, RESTRICT o SET NULL en tu aplicación?\n• Usa **`CASCADE`** cuando el registro hijo no tenga ningún sentido sin el padre (por ejemplo, los `items_carrito` de un `carrito_compras`).\n• Usa **`RESTRICT`** cuando represente dinero o transacciones legales (no permitas borrar un cliente si tiene facturas pendientes de cobro).\n• Usa **`SET NULL`** cuando el registro secundario deba conservarse con fines históricos (por ejemplo, un informe técnico cuyo autor renunció a la empresa):",
        "codeSnippet": "-- Verificamos la tabla matriculas actual para asegurar su configuración\nSELECT COUNT(*) AS total_matriculas_vigentes FROM matriculas;",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------------------+\n| total_matriculas_vigentes |\n+----------------------------+\n| 7                          |\n+----------------------------+\n1 row in set (0.001 sec)",
        "byteTip": "Configurar ON UPDATE CASCADE asegura que si el ID padre cambia, los IDs foráneos en los hijos se actualicen automáticamente.",
        "pitfallTip": "Si usas ON DELETE SET NULL, asegúrate de que la columna foránea no tenga la restricción NOT NULL, o causará un error de conflicto.",
        "keyPoints": [
          "CASCADE es ideal para relaciones de pertenencia total (composición).",
          "RESTRICT protege la seguridad financiera y legal de la empresa.",
          "Una buena arquitectura referencial previene limpiezas manuales costosas."
        ]
      }
    ]
  },
  "sql-u12-l04": {
    "id": "sql-th-u12-l04",
    "lessonId": "sql-u12-l04",
    "pathId": "sql",
    "unitId": 12,
    "levelId": 4,
    "title": "4. Qué es una transacción",
    "subtitle": "Comprende las propiedades ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad) que blindan las operaciones críticas.",
    "estimatedMinutes": 8,
    "analogy": "Una transferencia bancaria entre dos cuentas: debitar $100 de tu cuenta y abonar $100 a la cuenta de tu amigo. O se cumplen los dos pasos con éxito, o no se hace ninguno. ¡Jamás debe perderse el dinero a mitad de camino!",
    "video": {
      "title": "Integridad Referencial, ON DELETE CASCADE y Transacciones ACID",
      "channel": "Midudev",
      "duration": "41:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Activación de PRAGMA foreign_keys, acciones en cascada y control con BEGIN, COMMIT, ROLLBACK."
    },
    "sections": [
      {
        "title": "El principio \"Todo o Nada\": ¿Qué es una transacción?",
        "explanation": "En cualquier aplicación seria ocurren operaciones que requieren **múltiples cambios en la base de datos** para considerarse completas:\n1. Descontar stock de un producto.\n2. Crear la factura de cobro.\n3. Actualizar el saldo del cliente.\n\nSi el teléfono del usuario se apaga por batería baja en el paso 2, la base de datos quedaría en un estado corrupto (producto descontado, dinero sin cobrar).\n\nPara solucionar esto existen las **transacciones**, agrupadas bajo el estándar **ACID**:\n• **A - Atomicidad (*Atomicity*):** La operación es indivisible. O se completan **todos** los pasos o se cancelan **todos**.\n• **C - Consistencia (*Consistency*):** La base de datos pasa de un estado válido a otro estado válido, respetando todas las llaves y restricciones.\n• **I - Aislamiento (*Isolation*):** Si dos transacciones ocurren al mismo tiempo, no se interfieren entre sí.\n• **D - Durabilidad (*Durability*):** Una vez confirmada la transacción, los datos quedan grabados en disco de forma permanente.",
        "codeSnippet": "-- Demostración conceptual de transacción segura\nBEGIN TRANSACTION;\nUPDATE usuarios SET activo = true WHERE id = 1;\nCOMMIT;",
        "codeLanguage": "sql",
        "outputSnippet": "Operación de transacción BEGIN TRANSACTION ejecutada correctamente.\nFilas actualizadas correctamente en 'usuarios'\nOperación de transacción COMMIT ejecutada correctamente.",
        "byteTip": "SQLite es una de las bases de datos transaccionales ACID más rápidas y probadas del planeta.",
        "pitfallTip": "No realices transferencias de dinero ni modificaciones enlazadas de varias tablas sin agruparlas en una transacción ACID.",
        "keyPoints": [
          "Una transacción agrupa múltiples operaciones en una sola unidad lógica de trabajo.",
          "Atomicidad garantiza que no existan estados a medias.",
          "ACID es el estándar supremo de confiabilidad en la industria de bases de datos."
        ]
      },
      {
        "title": "Transacciones automáticas en Android con Room",
        "explanation": "En Android con Kotlin y Room, puedes envolver cualquier método de tu DAO con la anotación **`@Transaction`**:\nRoom iniciará la transacción con SQLite, ejecutará todos los métodos y, si ocurre cualquier excepción, revertirá todo automáticamente:",
        "codeSnippet": "-- Verificamos el estado del usuario tras la confirmación de la transacción\nSELECT id, nombre, email, activo FROM usuarios WHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+--------------+------------------+--------+\n| id | nombre       | email            | activo |\n+----+--------------+------------------+--------+\n| 1  | Ada Lovelace | ada@pioneers.org | true   |\n+----+--------------+------------------+--------+\n1 row in set (0.001 sec)",
        "byteTip": "En Room, anotar una función con @Transaction garantiza seguridad total en inserciones de entidades padre e hijas al mismo tiempo.",
        "pitfallTip": "Evita transacciones gigantes que duren minutos: en SQLite una transacción abierta bloquea la escritura para otros hilos.",
        "keyPoints": [
          "Room facilita el manejo de transacciones con la anotación @Transaction.",
          "Protege la base de datos del teléfono ante reinicios o cierres inesperados.",
          "Garantiza que la información del usuario permanezca siempre íntegra."
        ]
      }
    ]
  },
  "sql-u12-l05": {
    "id": "sql-th-u12-l05",
    "lessonId": "sql-u12-l05",
    "pathId": "sql",
    "unitId": 12,
    "levelId": 5,
    "title": "5. BEGIN, COMMIT y ROLLBACK",
    "subtitle": "Aprende a controlar transacciones manualmente en SQL usando BEGIN, COMMIT y ROLLBACK.",
    "estimatedMinutes": 8,
    "analogy": "El botón de \"Deshacer\" (Ctrl+Z) de tu editor: inicias un borrador importante (BEGIN); si todo sale bien, lo imprimes en papel oficial (COMMIT); pero si cometiste un error catastrófico, presionas Deshacer (ROLLBACK) y vuelves al estado original intacto.",
    "video": {
      "title": "Integridad Referencial, ON DELETE CASCADE y Transacciones ACID",
      "channel": "Midudev",
      "duration": "41:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Activación de PRAGMA foreign_keys, acciones en cascada y control con BEGIN, COMMIT, ROLLBACK."
    },
    "sections": [
      {
        "title": "Control manual con BEGIN, COMMIT y ROLLBACK",
        "explanation": "En SQL estándar y SQLite, tienes tres comandos clave para controlar transacciones:\n\n1. **`BEGIN`** (o `BEGIN TRANSACTION`):\nMarca el punto de partida. A partir de este momento, cualquier cambio (`INSERT`, `UPDATE`, `DELETE`) se almacena en un búfer temporal y nadie más fuera de tu conexión los ve como definitivos.\n\n2. **`COMMIT`**:\nConfirma y graba de manera permanente todos los cambios en el disco de almacenamiento duradero. La transacción termina con éxito.\n\n3. **`ROLLBACK`**:\nCancela de inmediato la transacción y **deshace todos los cambios** realizados desde el `BEGIN`. La base de datos queda exactamente en el mismo estado en que estaba antes de empezar.",
        "codeSnippet": "-- Caso 1: Transacción exitosa que se consolida con COMMIT\nBEGIN;\nUPDATE estudiantes SET promedio = 9.5 WHERE id = 1;\nCOMMIT;\n\n-- Caso 2: Transacción abortada que se deshace con ROLLBACK\nBEGIN;\nDELETE FROM estudiantes WHERE id = 1;\nROLLBACK;",
        "codeLanguage": "sql",
        "outputSnippet": "Operación de transacción BEGIN ejecutada correctamente.\nFilas actualizadas correctamente en 'estudiantes'\nOperación de transacción COMMIT ejecutada correctamente.\nOperación de transacción BEGIN ejecutada correctamente.\nRegistros eliminados en tabla 'estudiantes'\nOperación de transacción ROLLBACK ejecutada correctamente.",
        "byteTip": "Cualquier sentencia individual (como un solo UPDATE) se ejecuta en su propia mini-transacción implícita automática (autocommit) si no abres un BEGIN.",
        "pitfallTip": "Dejar una transacción abierta con BEGIN y olvidar ejecutar COMMIT o ROLLBACK mantendrá la base de datos bloqueada para otros procesos.",
        "keyPoints": [
          "BEGIN inicia la zona protegida de trabajo.",
          "COMMIT guarda permanentemente todos los cambios en disco.",
          "ROLLBACK cancela y devuelve los datos a su estado original sin dejar rastros."
        ]
      },
      {
        "title": "Manejo de errores con bloques try-catch en Kotlin",
        "explanation": "En código real de backend o Android, el patrón universal consiste en envolver las operaciones en un bloque `try-catch`:\n`database.beginTransaction()`\n`try {`\n`  // Pasos críticos de la operación`\n`  database.setTransactionSuccessful() // Marca para COMMIT`\n`} finally {`\n`  database.endTransaction() // Hace ROLLBACK si no fue exitosa`\n`}`",
        "codeSnippet": "-- Verificamos que el estudiante sigue a salvo gracias al ROLLBACK del borrado\nSELECT id, nombre, promedio FROM estudiantes WHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+----------+\n| id | nombre          | promedio |\n+----+-----------------+----------+\n| 1  | Valeria Morales | 9.5      |\n+----+-----------------+----------+\n1 row in set (0.001 sec)",
        "byteTip": "En Kotlin con Room puedes usar database.withTransaction { ... } que maneja automáticamente el BEGIN, COMMIT y ROLLBACK.",
        "pitfallTip": "No uses transacciones para operaciones de solo lectura (SELECTs simples); solo consumen memoria innecesariamente.",
        "keyPoints": [
          "El bloque try-catch con ROLLBACK en finally es el estándar de la industria.",
          "Evita la corrupción de datos ante errores imprevistos de red o batería.",
          "Convierte tus aplicaciones en sistemas de grado bancario y empresarial."
        ]
      }
    ]
  }
};
