import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_08_THEORY: Record<string, TheoryLesson> = {
  "sql-u08-l01": {
    "id": "sql-th-u08-l01",
    "lessonId": "sql-u08-l01",
    "pathId": "sql",
    "unitId": 8,
    "levelId": 1,
    "title": "1. UPDATE y SET",
    "subtitle": "Modifica datos existentes en tus tablas de forma segura con la sentencia UPDATE y SET.",
    "estimatedMinutes": 8,
    "analogy": "Editar el número de teléfono de un contacto en tu agenda: abres su ficha existente, borras el número viejo, escribes el nuevo y guardas. No creaste un contacto nuevo, modificaste el que ya estaba.",
    "video": {
      "title": "Modificación y Eliminación: UPDATE y DELETE en SQL",
      "channel": "Develoteca",
      "duration": "33:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Actualización segura, importancia vital del WHERE y diferencia con DROP TABLE."
    },
    "sections": [
      {
        "title": "La sentencia UPDATE y la cláusula SET",
        "explanation": "A medida que tu aplicación opera, los datos cambian: un usuario actualiza su correo, el precio de un producto sube o el stock se reduce tras una venta.\n\nPara modificar registros existentes usamos la sentencia **`UPDATE`**:\n`UPDATE nombre_tabla`\n`SET columna = nuevo_valor`\n`WHERE condicion;`\n\n• **`UPDATE`**: Indica qué tabla se va a modificar.\n• **`SET`**: Indica qué columna(s) cambiarán y cuál será su nuevo valor.\n• **`WHERE`**: Especifica exactamente qué filas deben modificarse.",
        "codeSnippet": "-- Actualizamos el salario del empleado con ID 101 a $3500.0\nUPDATE empleados\nSET salario = 3500.0\nWHERE id = 101;",
        "codeLanguage": "sql",
        "outputSnippet": "1 fila actualizada con éxito.",
        "byteTip": "Fíjate en la regla de oro: siempre filtra por la llave primaria única (WHERE id = 101) para tener certeza de que solo modificarás a esa persona.",
        "pitfallTip": "Si olvidas la cláusula WHERE en un UPDATE, ¡modificarás todas las filas de toda la tabla de un solo golpe! En la lección 5 verás este peligro en detalle.",
        "keyPoints": [
          "UPDATE modifica datos de registros ya guardados.",
          "SET define las columnas a alterar y sus nuevos valores.",
          "WHERE delimita qué filas específicas recibirán el cambio."
        ]
      },
      {
        "title": "Verificar la actualización con SELECT",
        "explanation": "Comprobamos que el empleado #101 refleje su nuevo salario en la base de datos:",
        "codeSnippet": "-- Consultamos al empleado para confirmar el nuevo salario actualizado\nSELECT id, nombre, departamento, salario\nFROM empleados\nWHERE id = 101;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+----------------+--------------+---------+\n| id  | nombre         | departamento | salario |\n+-----+----------------+--------------+---------+\n| 101 | Carlos Mendoza | Ingeniería   | 3500.0  |\n+-----+----------------+--------------+---------+\n1 fila devuelta",
        "byteTip": "En Android con Room, los métodos anotados con @Update devuelven un Int con la cantidad de filas modificadas (debería ser 1).",
        "pitfallTip": "No uses comillas en valores numéricos al actualizar columnas INTEGER o REAL.",
        "keyPoints": [
          "SELECT confirma inmediatamente el éxito de un UPDATE.",
          "El cambio es permanente en el archivo de la base de datos.",
          "Es el segundo pilar de las operaciones de modificación de datos."
        ]
      }
    ]
  },
  "sql-u08-l02": {
    "id": "sql-th-u08-l02",
    "lessonId": "sql-u08-l02",
    "pathId": "sql",
    "unitId": 8,
    "levelId": 2,
    "title": "2. Actualizar una o varias columnas",
    "subtitle": "Actualiza múltiples columnas a la vez o realiza cálculos relativos directamente en el SET.",
    "estimatedMinutes": 8,
    "analogy": "Un empleado que asciende de puesto: en un solo trámite de recursos humanos le cambian el título de su cargo Y le aumentan el sueldo simultáneamente en la misma ficha.",
    "video": {
      "title": "Modificación y Eliminación: UPDATE y DELETE en SQL",
      "channel": "Develoteca",
      "duration": "33:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Actualización segura, importancia vital del WHERE y diferencia con DROP TABLE."
    },
    "sections": [
      {
        "title": "Actualizar múltiples columnas en un solo UPDATE",
        "explanation": "No necesitas ejecutar múltiples sentencias `UPDATE` separadas si vas a modificar varios campos de la misma fila.\n\nSimplemente separas las asignaciones con una coma (`,`) dentro del `SET`:\n`UPDATE productos`\n`SET precio = 95.0, stock = 50, categoria = 'Hardware Pro'`\n`WHERE id = 1;`\n\nTodas las columnas indicadas se actualizarán de forma atómica y simultánea en una sola operación de disco.",
        "codeSnippet": "-- Actualizamos simultáneamente el precio y el stock del producto con ID 1\nUPDATE productos\nSET precio = 79.99, stock = 60\nWHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "1 fila actualizada (precio y stock modificados a la vez).",
        "byteTip": "También puedes hacer cálculos basados en el valor anterior: SET stock = stock - 1 para descontar una unidad vendida.",
        "pitfallTip": "No pongas la palabra SET más de una vez; separa cada columna con una simple coma.",
        "keyPoints": [
          "SET col1 = val1, col2 = val2 actualiza múltiples campos a la vez.",
          "La actualización es atómica: se cambian todas las columnas juntas.",
          "Permite realizar operaciones de incremento o decremento relativo (stock = stock - 1)."
        ]
      },
      {
        "title": "Actualizaciones relativas para compras e inventarios",
        "explanation": "Mira cómo reducir el stock tras la compra de 5 teclados mecánicos usando una fórmula en el `SET`:",
        "codeSnippet": "-- Reducimos 5 unidades del stock actual del producto #1\nUPDATE productos\nSET stock = stock - 5\nWHERE id = 1;\n\n-- Consultamos el resultado final\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------------+--------+-------+\n| id | nombre               | precio | stock |\n+----+----------------------+--------+-------+\n| 1  | Teclado Mecánico RGB | 79.99  | 55    |\n+----+----------------------+--------+-------+\n1 fila devuelta",
        "byteTip": "stock = stock - 5 previene condiciones de carrera si dos compras ocurren casi al mismo tiempo.",
        "pitfallTip": "Asegúrate con un CHECK o con WHERE stock >= 5 de no dejar el stock en números negativos.",
        "keyPoints": [
          "Las actualizaciones relativas aprovechan el valor existente en la celda.",
          "Ideales para carritos de compras, puntos de fidelidad y contadores.",
          "Garantizan exactitud matemática en entornos multiusuario."
        ]
      }
    ]
  },
  "sql-u08-l03": {
    "id": "sql-th-u08-l03",
    "lessonId": "sql-u08-l03",
    "pathId": "sql",
    "unitId": 8,
    "levelId": 3,
    "title": "3. DELETE",
    "subtitle": "Elimina registros obsoletos de tus tablas utilizando la sentencia DELETE FROM.",
    "estimatedMinutes": 8,
    "analogy": "Tirar una carta vieja a la trituradora de papel: la carta desaparece por completo y el espacio en la gaveta queda libre, pero el mueble archivador sigue intacto en su lugar.",
    "video": {
      "title": "Modificación y Eliminación: UPDATE y DELETE en SQL",
      "channel": "Develoteca",
      "duration": "33:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Actualización segura, importancia vital del WHERE y diferencia con DROP TABLE."
    },
    "sections": [
      {
        "title": "La sentencia DELETE FROM",
        "explanation": "Para borrar filas que ya no son necesarias (un usuario que cerró su cuenta, un producto descontinuado o una notificación leída), usamos la sentencia **`DELETE FROM`**:\n\n`DELETE FROM nombre_tabla`\n`WHERE condicion;`\n\n• Elimina las filas completas que cumplan la condición del `WHERE`.\n• **No borra la tabla ni sus columnas**; la estructura sigue existiendo lista para seguir operando.\n• El borrado es definitivo en SQLite si no estás dentro de una transacción.",
        "codeSnippet": "-- Eliminamos una nota específica por su identificador único\nDELETE FROM matriculas\nWHERE id = 8;",
        "codeLanguage": "sql",
        "outputSnippet": "1 fila eliminada con éxito de la tabla matriculas.",
        "byteTip": "En Android con Room, los métodos anotados con @Delete eliminan registros usando el objeto correspondiente.",
        "pitfallTip": "Al igual que con UPDATE, si ejecutas DELETE FROM tabla sin la cláusula WHERE, ¡borrarás absolutamente todas las filas de la tabla!",
        "keyPoints": [
          "DELETE FROM borra registros existentes de una tabla.",
          "WHERE define con exactitud qué filas deben eliminarse.",
          "Conserva intacta la estructura y el esquema de la tabla."
        ]
      },
      {
        "title": "Verificación del borrado",
        "explanation": "Comprobamos que el registro con ID 8 haya desaparecido efectivamente de la tabla:",
        "codeSnippet": "-- Verificamos que la matrícula #8 ya no exista\nSELECT id, estudiante_id, asignatura_id\nFROM matriculas\nWHERE id = 8;",
        "codeLanguage": "sql",
        "outputSnippet": "0 filas devueltas (confirmación de que el registro fue eliminado).",
        "byteTip": "Recibir 0 filas en la búsqueda posterior es la confirmación perfecta del borrado.",
        "pitfallTip": "Si la tabla está relacionada con llaves foráneas y no tiene ON DELETE CASCADE, SQLite impedirá el borrado si otros registros dependen de ella.",
        "keyPoints": [
          "El borrado libera espacio lógico en el archivo de la base de datos.",
          "Las restricciones de llave foránea protegen contra borrados indebidos.",
          "Es la operación de eliminación final en el ciclo CRUD."
        ]
      }
    ]
  },
  "sql-u08-l04": {
    "id": "sql-th-u08-l04",
    "lessonId": "sql-u08-l04",
    "pathId": "sql",
    "unitId": 8,
    "levelId": 4,
    "title": "4. Uso de WHERE para delimitar cambios",
    "subtitle": "Comprende el rol vital de la cláusula WHERE para delimitar con exactitud tus cambios en UPDATE y DELETE.",
    "estimatedMinutes": 8,
    "analogy": "Un cirujano que va a operar el apéndice de un paciente: marca con un plumón quirúrgico exactamente el punto a intervenir (WHERE). No empieza a operar a ciegas todo el cuerpo del paciente.",
    "video": {
      "title": "Modificación y Eliminación: UPDATE y DELETE en SQL",
      "channel": "Develoteca",
      "duration": "33:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Actualización segura, importancia vital del WHERE y diferencia con DROP TABLE."
    },
    "sections": [
      {
        "title": "El rol crítico de WHERE en modificaciones",
        "explanation": "En las consultas `SELECT`, olvidar el `WHERE` es solo un inconveniente: te muestra todas las filas en pantalla, pero no daña nada.\n\nEn cambio, en **`UPDATE`** y **`DELETE`**, olvidar el `WHERE` es una **catástrofe total**:\n• En un `UPDATE`, le pondrá el mismo valor a todos los usuarios del sistema.\n• En un `DELETE`, vaciará la tabla entera en una fracción de segundo.\n\nPor esta razón, la cláusula `WHERE` debe tratarse con el máximo respeto y concentración.",
        "codeSnippet": "-- Modificación estrictamente delimitada por llave primaria\nUPDATE usuarios\nSET pais = 'Costa Rica'\nWHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "1 fila actualizada con precisión quirúrgica.",
        "byteTip": "Usa siempre la llave primaria única (WHERE id = ...) para garantizar que afectes a un solo registro.",
        "pitfallTip": "Filtrar por nombre en un UPDATE (ej: WHERE nombre = \"Carlos\") puede modificar a 10 empleados distintos que casualmente se llaman Carlos.",
        "keyPoints": [
          "WHERE delimita el alcance destructivo de UPDATE y DELETE.",
          "Filtrar por llave primaria garantiza que el cambio afecte a una sola fila.",
          "Evita usar campos no únicos como criterio principal de modificación."
        ]
      },
      {
        "title": "Auditoría de filas afectadas",
        "explanation": "Comprobamos que solo el usuario #1 haya recibido el cambio de país, dejando a todos los demás usuarios intactos:",
        "codeSnippet": "-- Verificamos los países de los primeros dos usuarios\nSELECT id, nombre, pais\nFROM usuarios\nWHERE id IN (1, 2);",
        "codeLanguage": "sql",
        "outputSnippet": "+----+--------------+-------------+\n| id | nombre       | pais        |\n+----+--------------+-------------+\n| 1  | Ada Lovelace | Costa Rica  |\n| 2  | Alan Turing  | Reino Unido |\n+----+--------------+-------------+\n2 filas devueltas",
        "byteTip": "Alan Turing conservó su país Reino Unido intacto gracias al WHERE id = 1.",
        "pitfallTip": "Nunca ejecutes un UPDATE o DELETE en una base de datos real sin antes haber probado la condición con un SELECT.",
        "keyPoints": [
          "La delimitación estricta aísla el impacto de la modificación.",
          "Protege los registros adyacentes contra alteraciones colaterales.",
          "Es la regla de seguridad número uno de los administradores de bases de datos."
        ]
      }
    ]
  },
  "sql-u08-l05": {
    "id": "sql-th-u08-l05",
    "lessonId": "sql-u08-l05",
    "pathId": "sql",
    "unitId": 8,
    "levelId": 5,
    "title": "5. Consecuencias de omitir WHERE",
    "subtitle": "Conoce las consecuencias reales de omitir el WHERE y cómo los entornos profesionales previenen este error.",
    "estimatedMinutes": 8,
    "analogy": "Un botón de autodestrucción sin tapa de seguridad: si presionas \"Borrar todo\", borras la base de datos de 10 años de la empresa en un parpadeo. Es la pesadilla que todo programador teme.",
    "video": {
      "title": "Modificación y Eliminación: UPDATE y DELETE en SQL",
      "channel": "Develoteca",
      "duration": "33:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Actualización segura, importancia vital del WHERE y diferencia con DROP TABLE."
    },
    "sections": [
      {
        "title": "El peligro mortal de omitir el WHERE",
        "explanation": "Todo desarrollador veterano tiene una historia de terror sobre alguien que ejecutó:\n`DELETE FROM clientes;`\no\n`UPDATE cuentas SET saldo = 0;`\nsin incluir la cláusula `WHERE`.\n\n¿Qué ocurre si omites el `WHERE`?\n• SQLite asume que tu orden aplica a **absolutamente todas las filas de la tabla**.\n• Borrará o sobreescribirá 10, 50,000 o 10,000,000 de registros en silencio y sin pedir confirmación.\n\nMuchos entornos profesionales modernos y clientes gráficos tienen un modo llamado *\"Safe Updates\"* que bloquea automáticamente cualquier `UPDATE` o `DELETE` que no incluya un `WHERE` con llave primaria.",
        "codeSnippet": "-- Demostración SEGURA con WHERE estricto:\nUPDATE productos\nSET stock = 40\nWHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "1 fila actualizada con seguridad.",
        "byteTip": "En la Unidad 12 aprenderás a usar Transacciones con BEGIN y ROLLBACK para poder deshacer cualquier error antes de confirmarlo.",
        "pitfallTip": "Jamás escribas UPDATE o DELETE empezando por la primera palabra y presionando enter. Acostúmbrate a escribir primero el WHERE.",
        "keyPoints": [
          "Omitir WHERE aplica el cambio a la totalidad de las filas de la tabla.",
          "Es irreversible si no se cuenta con respaldo o transacción activa.",
          "Los linters y motores modernos advierten sobre modificaciones sin filtro."
        ]
      },
      {
        "title": "Buenas prácticas en entornos de desarrollo y producción",
        "explanation": "Para evitar este desastre en tu carrera profesional:\n1. Ten siempre respaldos automáticos diarios.\n2. Trabaja siempre dentro de un bloque `BEGIN TRANSACTION` cuando hagas cambios manuales.\n3. Revisa tres veces la sentencia antes de presionar el botón de ejecución.",
        "codeSnippet": "-- Consulta de seguridad para ver el producto modificado\nSELECT id, nombre, stock\nFROM productos\nWHERE id = 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------------+-------+\n| id | nombre               | stock |\n+----+----------------------+-------+\n| 1  | Teclado Mecánico RGB | 40    |\n+----+----------------------+-------+\n1 fila devuelta",
        "byteTip": "Las bases de datos SQLite en Android se guardan en la carpeta de la app; hacer una copia del archivo .db es un respaldo instantáneo.",
        "pitfallTip": "No pruebes sentencias destructivas directamente sobre bases de datos de clientes reales.",
        "keyPoints": [
          "La prudencia y los respaldos son el mejor seguro de vida de un desarrollador.",
          "Las transacciones permiten probar y revertir cambios si algo sale mal.",
          "La cultura de seguridad distingue a un programador senior."
        ]
      }
    ]
  },
  "sql-u08-l06": {
    "id": "sql-th-u08-l06",
    "lessonId": "sql-u08-l06",
    "pathId": "sql",
    "unitId": 8,
    "levelId": 6,
    "title": "6. Consultar con SELECT antes de modificar",
    "subtitle": "Aplica la regla de oro: consulta siempre con SELECT antes de ejecutar cualquier UPDATE o DELETE.",
    "estimatedMinutes": 8,
    "analogy": "Un sastre que mide la tela dos veces antes de hacer el corte con las tijeras: medir dos veces con los ojos (SELECT) asegura que el corte definitivo (DELETE) sea exactamente en el milímetro correcto.",
    "video": {
      "title": "Modificación y Eliminación: UPDATE y DELETE en SQL",
      "channel": "Develoteca",
      "duration": "33:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Actualización segura, importancia vital del WHERE y diferencia con DROP TABLE."
    },
    "sections": [
      {
        "title": "La regla de oro: Probar con SELECT primero",
        "explanation": "Antes de ejecutar cualquier sentencia destructiva con `UPDATE` o `DELETE`, aplica siempre este sencillo truco de programadores expertos:\n\n**El truco en 3 pasos:**\n1. Escribe primero una consulta con **`SELECT`** usando exactamente el mismo filtro `WHERE` que planeas usar:\n   `SELECT * FROM usuarios WHERE activo = false AND fecha_ingreso < '2020-01-01';`\n2. Revisa visualmente con tus propios ojos las filas devueltas: ¿Son exactamente las filas que querías modificar o borrar? ¿No se coló ningún registro inocente?\n3. Si la lista es 100% correcta, recién ahí cambias la palabra `SELECT * ` por `DELETE ` o `UPDATE `.",
        "codeSnippet": "-- Paso 1: Verificamos primero con SELECT qué fila será afectada\nSELECT id, nombre, departamento, salario\nFROM empleados\nWHERE id = 105;\n\n-- Paso 2: Una vez seguros, ejecutamos la actualización\nUPDATE empleados\nSET salario = 2100.0\nWHERE id = 105;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+---------------+--------------+---------+\n| id  | nombre        | departamento | salario |\n+-----+---------------+--------------+---------+\n| 105 | Andrés Solano | Soporte      | 1900.0  |\n+-----+---------------+--------------+---------+\n1 fila verificada.\n1 fila actualizada a $2100.0 con total certeza.",
        "byteTip": "Este hábito de 5 segundos te salvará la vida profesional en incontables ocasiones a lo largo de tu carrera.",
        "pitfallTip": "Nunca asumas que un filtro complejo funcionará como esperas sin haberlo visto antes en un SELECT.",
        "keyPoints": [
          "Probar el WHERE con SELECT previene modificaciones accidentales.",
          "Permite confirmar la cantidad exacta de filas que serán afectadas.",
          "Es el hábito de seguridad número uno de la ingeniería de software."
        ]
      },
      {
        "title": "Verificación del cambio aplicado",
        "explanation": "Comprobamos el estado final de Andrés Solano tras la actualización verificada:",
        "codeSnippet": "-- Paso 3: Confirmación final del salario modificado\nSELECT id, nombre, salario\nFROM empleados\nWHERE id = 105;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+---------------+---------+\n| id  | nombre        | salario |\n+-----+---------------+---------+\n| 105 | Andrés Solano | 2100.0  |\n+-----+---------------+---------+\n1 fila devuelta",
        "byteTip": "Andrés Solano ahora tiene su salario en $2100.0 correctamente registrado.",
        "pitfallTip": "No confíes solo en tu intuición; verifica siempre el resultado final.",
        "keyPoints": [
          "La confirmación posterior cierra el ciclo de actualización de forma limpia.",
          "Garantiza que el cambio se haya grabado correctamente en disco.",
          "Refuerza la confiabilidad de los procesos en el sistema."
        ]
      }
    ]
  },
  "sql-u08-l07": {
    "id": "sql-th-u08-l07",
    "lessonId": "sql-u08-l07",
    "pathId": "sql",
    "unitId": 8,
    "levelId": 7,
    "title": "7. Diferencia entre DELETE y DROP TABLE",
    "subtitle": "Comprende la diferencia radical entre vaciar registros con DELETE FROM y destruir la tabla con DROP TABLE.",
    "estimatedMinutes": 8,
    "analogy": "DELETE FROM es vaciar todo el contenido de una papelera de reciclaje: la papelera queda limpia y vacía en el suelo de tu oficina lista para seguir tirando papeles. DROP TABLE es desintegrar la papelera con un rayo láser: ya no tienes papelera donde tirar nada.",
    "video": {
      "title": "Modificación y Eliminación: UPDATE y DELETE en SQL",
      "channel": "Develoteca",
      "duration": "33:15",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Actualización segura, importancia vital del WHERE y diferencia con DROP TABLE."
    },
    "sections": [
      {
        "title": "DELETE FROM frente a DROP TABLE",
        "explanation": "Una de las dudas más frecuentes en exámenes y entrevistas técnicas es la diferencia entre estas dos sentencias:\n\n1. **`DELETE FROM nombre_tabla;` (DML):**\n• **Borra los datos:** Elimina todas las filas o registros almacenados.\n• **Conserva la estructura:** La tabla sigue viva en la base de datos con todas sus columnas, tipos, restricciones e índices intactos.\n• Puedes hacer un `INSERT` de inmediato y la tabla aceptará nuevos registros sin problemas.\n\n2. **`DROP TABLE nombre_tabla;` (DDL):**\n• **Destruye absolutamente todo:** Elimina tanto los datos como la definición completa de la tabla del catálogo de SQLite (`sqlite_master`).\n• La tabla **deja de existir por completo**.\n• Si intentas hacer un `SELECT` o `INSERT` después de un `DROP`, SQLite arrojará un error de `no such table`.",
        "codeSnippet": "-- Creamos una tabla temporal para demostrar la diferencia\nCREATE TABLE temporal_borrado (id INTEGER PRIMARY KEY, nota TEXT);\nINSERT INTO temporal_borrado (nota) VALUES ('Dato de prueba');\n\n-- 1. DELETE borra el contenido pero deja la tabla viva\nDELETE FROM temporal_borrado;\n\n-- 2. DROP destruye la tabla entera de la faz de la tierra\nDROP TABLE temporal_borrado;",
        "codeLanguage": "sql",
        "outputSnippet": "Tabla 'temporal_borrado' creada, vaciada con DELETE y finalmente destruida con DROP TABLE.",
        "byteTip": "Usa siempre DROP TABLE IF EXISTS nombre_tabla para evitar errores si la tabla ya había sido destruida antes.",
        "pitfallTip": "Mucho cuidado con DROP TABLE: destruye esquemas y datos sin posibilidad de recuperación.",
        "keyPoints": [
          "DELETE FROM vacía los registros pero conserva la estructura de la tabla.",
          "DROP TABLE destruye la tabla y sus datos de forma definitiva.",
          "DELETE es una sentencia DML (datos); DROP es una sentencia DDL (estructura)."
        ]
      },
      {
        "title": "Migraciones de esquemas en Android con Room",
        "explanation": "En Android, cuando actualizas la versión de tu app y necesitas cambiar por completo el diseño de una tabla, Room suele ejecutar un script de migración que puede recrear tablas con `DROP TABLE IF EXISTS` y luego un nuevo `CREATE TABLE`:",
        "codeSnippet": "-- Verificamos que nuestras tablas maestras sigan operativas y seguras\nSELECT COUNT(*) AS total_tablas_activas\nFROM sqlite_master\nWHERE type = 'table' AND name IN ('usuarios', 'productos', 'estudiantes', 'empleados', 'asignaturas', 'matriculas');",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------------+\n| total_tablas_activas |\n+----------------------+\n| 6                    |\n+----------------------+\n1 fila devuelta",
        "byteTip": "sqlite_master confirma que todas las tablas maestras del curso están saludables y listas.",
        "pitfallTip": "Nunca ejecutes DROP TABLE en producción sin un plan de migración que respalde los datos existentes del usuario.",
        "keyPoints": [
          "DROP TABLE se utiliza principalmente en scripts de migración y desinstalación.",
          "DELETE FROM es la herramienta cotidiana para vaciar historiales o carritos.",
          "Conocer la diferencia previene la destrucción accidental de esquemas en producción."
        ]
      }
    ]
  }
};
