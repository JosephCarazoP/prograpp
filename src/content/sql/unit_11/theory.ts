import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_11_THEORY: Record<string, TheoryLesson> = {
  "sql-u11-l01": {
    "id": "sql-th-u11-l01",
    "lessonId": "sql-u11-l01",
    "pathId": "sql",
    "unitId": 11,
    "levelId": 1,
    "title": "1. Funciones de texto: LENGTH, TRIM, UPPER, LOWER",
    "subtitle": "Aprende a transformar, limpiar y medir cadenas de texto directamente en tus consultas con LENGTH, TRIM, UPPER y LOWER.",
    "estimatedMinutes": 8,
    "analogy": "Un filtro corrector automático al escanear credenciales: quita los espacios sobrantes de los lados, convierte el nombre a mayúsculas para imprimirlo en el gafete y mide cuántas letras tiene.",
    "video": {
      "title": "Funciones Nativas y Subconsultas en SQLite",
      "channel": "Fazt Code",
      "duration": "47:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Manipulación con UPPER, LENGTH, COALESCE, CASE condicional y subconsultas con IN."
    },
    "sections": [
      {
        "title": "Funciones de manipulación de texto en SQLite",
        "explanation": "En aplicaciones reales, los usuarios escriben datos con errores de formato: nombres en minúsculas, espacios accidentales al inicio o al final, o combinaciones caprichosas de mayúsculas y minúsculas.\n\nSQLite proporciona funciones nativas para normalizar texto en la proyección:\n1. **`UPPER(texto)`**: Convierte todos los caracteres a mayúsculas (`'valeria' -> 'VALERIA'`).\n2. **`LOWER(texto)`**: Convierte todos los caracteres a minúsculas (`'INGENIERÍA' -> 'ingeniería'`).\n3. **`TRIM(texto)`**: Elimina los espacios en blanco sobrantes antes y después del texto (`'  hola  ' -> 'hola'`).\n4. **`LENGTH(texto)`**: Devuelve la cantidad de caracteres que componen la cadena.\n\nEstas funciones se ejecutan fila por fila sin modificar el dato almacenado en el disco; solo transforman la forma en que se presenta en el resultado.",
        "codeSnippet": "-- Formateamos y medimos los nombres y carreras de los estudiantes\nSELECT \n  id,\n  UPPER(nombre) AS nombre_mayus,\n  LOWER(carrera) AS carrera_minus,\n  LENGTH(nombre) AS longitud_nombre\nFROM estudiantes\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+------------------------+-----------------+\n| id | nombre_mayus    | carrera_minus          | longitud_nombre |\n+----+-----------------+------------------------+-----------------+\n| 1  | VALERIA MORALES | ingeniería de software | 15              |\n| 2  | DIEGO FERNÁNDEZ | ciencias computación   | 15              |\n| 3  | CAMILA GÓMEZ    | sistemas información   | 12              |\n+----+-----------------+------------------------+-----------------+\n3 rows in set (0.002 sec)",
        "byteTip": "Para realizar búsquedas insensibles a mayúsculas y acentos en SQLite, compara con LOWER(columna) = LOWER(\"texto\").",
        "pitfallTip": "Recuerda que en SQLite la función se llama LENGTH(); si vienes de SQL Server no escribas LEN() porque causará un error sintáctico.",
        "keyPoints": [
          "UPPER y LOWER cambian el caso del texto.",
          "TRIM limpia espacios accidentales en bordes.",
          "LENGTH devuelve la cantidad de caracteres de la cadena."
        ]
      },
      {
        "title": "Limpieza de entradas de usuario en aplicaciones móviles",
        "explanation": "Cuando un usuario escribe su correo electrónico en un formulario de registro en Android, suele presionar la tecla de espacio por error al final del texto (`\"juan@mail.com \"`).\nUsar `TRIM` y `LOWER` al consultar o guardar evita cuentas duplicadas y fallos de autenticación:",
        "codeSnippet": "-- Demostración de búsqueda normalizada sin importar espacios ni mayúsculas\nSELECT id, nombre, email\nFROM usuarios\nWHERE LOWER(TRIM(email)) = 'ada@pioneers.org';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+--------------+------------------+\n| id | nombre       | email            |\n+----+--------------+------------------+\n| 1  | Ada Lovelace | ada@pioneers.org |\n+----+--------------+------------------+\n1 row in set (0.001 sec)",
        "byteTip": "En Room para Android, puedes combinar TRIM(nombre) dentro de tus @Query para búsquedas ultra-robustas.",
        "pitfallTip": "LENGTH(NULL) devuelve NULL en SQL, no cero. Tenlo en cuenta al filtrar longitudes mínimas.",
        "keyPoints": [
          "Combinar LOWER(TRIM(...)) es la regla de oro para validar correos y usuarios.",
          "Protege la base de datos contra inconsistencias tipográficas.",
          "Ahorra procesamiento en la capa de Kotlin al resolver la limpieza en el motor SQLite."
        ]
      }
    ]
  },
  "sql-u11-l02": {
    "id": "sql-th-u11-l02",
    "lessonId": "sql-u11-l02",
    "pathId": "sql",
    "unitId": 11,
    "levelId": 2,
    "title": "2. Funciones numéricas: ROUND",
    "subtitle": "Aprende a controlar los decimales de montos financieros y promedios con la función ROUND.",
    "estimatedMinutes": 8,
    "analogy": "El recibo de un supermercado: la máquina calcula un impuesto que da $12.34567, pero el ticket impreso te muestra $12.35 redondeado a dos centavos para que coincida con monedas reales.",
    "video": {
      "title": "Funciones Nativas y Subconsultas en SQLite",
      "channel": "Fazt Code",
      "duration": "47:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Manipulación con UPPER, LENGTH, COALESCE, CASE condicional y subconsultas con IN."
    },
    "sections": [
      {
        "title": "Control de decimales con la función ROUND",
        "explanation": "Cuando realizas divisiones, multiplicas porcentajes o calculas promedios con `AVG`, los números con punto flotante suelen arrojar muchos dígitos decimales (por ejemplo, `9.040000000000001`).\n\nLa función **`ROUND(numero, decimales)`** redondea el valor numérico al número de decimales que especifiques:\n• `ROUND(promedio, 2)`: conserva 2 decimales (ideal para dinero o calificaciones).\n• `ROUND(promedio, 0)`: redondea al entero más cercano.\n• Si omites el segundo parámetro, SQLite redondeará por defecto a cero decimales (`ROUND(valor)`).\n\nSQLite aplica el método de redondeo estándar: si el siguiente dígito es 5 o mayor, redondea hacia arriba; si es menor a 5, redondea hacia abajo.",
        "codeSnippet": "-- Redondeo de promedios estudiantiles y cálculos de bonificación\nSELECT \n  nombre,\n  promedio,\n  ROUND(promedio, 0) AS entero_cercano,\n  ROUND(promedio * 1.05, 2) AS con_bono_5_porciento\nFROM estudiantes\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+----------+----------------+----------------------+\n| nombre          | promedio | entero_cercano | con_bono_5_porciento |\n+-----------------+----------+----------------+----------------------+\n| Valeria Morales | 9.4      | 9.0            | 9.87                 |\n| Diego Fernández | 8.8      | 9.0            | 9.24                 |\n| Camila Gómez    | 9.7      | 10.0           | 10.19                |\n+-----------------+----------+----------------+----------------------+\n3 rows in set (0.002 sec)",
        "byteTip": "En SQLite, ROUND(3.14159, 2) devuelve el número 3.14.",
        "pitfallTip": "No uses ROUND para alterar datos contables confidenciales en la tabla; úsalo en la consulta SELECT para proyectar el resultado en pantalla.",
        "keyPoints": [
          "ROUND(x, d) redondea un número x a d cifras decimales.",
          "Evita textos feos con 15 decimales flotantes en la interfaz de la aplicación.",
          "Es indispensable al mostrar precios, monedas y porcentajes."
        ]
      },
      {
        "title": "Reportes ejecutivos con formato limpio",
        "explanation": "Al generar reportes gerenciales de salarios y presupuesto, presentar cifras limpias y consistentes genera profesionalismo y evita dudas en la dirección:",
        "codeSnippet": "-- Resumen salarial con redondeo impecable a dos decimales\nSELECT \n  departamento,\n  ROUND(AVG(salario), 2) AS salario_promedio,\n  ROUND(SUM(salario), 2) AS gasto_total\nFROM empleados\nGROUP BY departamento;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------+------------------+-------------+\n| departamento | salario_promedio | gasto_total |\n+--------------+------------------+-------------+\n| Dirección    | 4500.00          | 4500.00     |\n| Diseño UX    | 2850.50          | 2850.50     |\n| Ingeniería   | 3200.00          | 3200.00     |\n| Sistemas     | 3100.00          | 3100.00     |\n| Soporte      | 1900.00          | 1900.00     |\n+--------------+------------------+-------------+\n5 rows in set (0.002 sec)",
        "byteTip": "En Android, recibir un número ya redondeado desde SQLite ahorra formateos costosos en las clases ViewModel de Kotlin.",
        "pitfallTip": "Recuerda que ROUND sobre NULL devuelve NULL.",
        "keyPoints": [
          "Asegura la legibilidad de métricas financieras.",
          "Reduce el trabajo de formateo en el cliente móvil.",
          "Mantiene la consistencia numérica a lo largo de toda la app."
        ]
      }
    ]
  },
  "sql-u11-l03": {
    "id": "sql-th-u11-l03",
    "lessonId": "sql-u11-l03",
    "pathId": "sql",
    "unitId": 11,
    "levelId": 3,
    "title": "3. COALESCE",
    "subtitle": "Domina COALESCE: el equivalente en SQL del operador Elvis (?:) de Kotlin para sustituir valores NULL.",
    "estimatedMinutes": 8,
    "analogy": "Un protocolo de contacto telefónico de emergencia: intentas llamar al teléfono móvil; si no está disponible (NULL), llamas al teléfono fijo; si tampoco está, marcas el número de la oficina.",
    "video": {
      "title": "Funciones Nativas y Subconsultas en SQLite",
      "channel": "Fazt Code",
      "duration": "47:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Manipulación con UPPER, LENGTH, COALESCE, CASE condicional y subconsultas con IN."
    },
    "sections": [
      {
        "title": "El sustituto perfecto contra los valores nulos",
        "explanation": "En bases de datos relacionales, muchas columnas son opcionales y pueden contener `NULL`. Cuando proyectas esos datos hacia la aplicación, un `NULL` puede provocar pantallas incompletas o errores de puntero nulo en Kotlin.\n\nLa función **`COALESCE(valor1, valor2, ...)`** evalúa su lista de argumentos de izquierda a derecha y **devuelve el primer valor que NO sea `NULL`**.\n\nSintaxis:\n`COALESCE(columna, valor_por_defecto)`\n\nEjemplos:\n• `COALESCE(telefono, 'Sin teléfono')`: si el cliente no tiene teléfono, muestra el texto `'Sin teléfono'`.\n• `COALESCE(descuento, 0.0)`: si no hay descuento registrado, asume cero para que los cálculos matemáticos no se arruinen.",
        "codeSnippet": "-- Demostración de COALESCE asegurando valores por defecto inmediatos\nSELECT \n  nombre,\n  pais,\n  COALESCE(pais, 'País no especificado') AS pais_seguro\nFROM usuarios;",
        "codeLanguage": "sql",
        "outputSnippet": "+-------------------+----------------+----------------+\n| nombre            | pais           | pais_seguro    |\n+-------------------+----------------+----------------+\n| Ada Lovelace      | Reino Unido    | Reino Unido    |\n| Alan Turing       | Reino Unido    | Reino Unido    |\n| Grace Hopper      | Estados Unidos | Estados Unidos |\n| Linus Torvalds    | Finlandia      | Finlandia      |\n| Margaret Hamilton | Estados Unidos | Estados Unidos |\n+-------------------+----------------+----------------+\n5 rows in set (0.001 sec)",
        "byteTip": "COALESCE es el hermano gemelo del operador Elvis de Kotlin (val pais = usuario.pais ?: \"País no especificado\").",
        "pitfallTip": "Si todos los parámetros pasados a COALESCE son NULL, la función devolverá NULL.",
        "keyPoints": [
          "COALESCE retorna el primer argumento no nulo de su lista.",
          "Reemplaza valores ausentes por valores por defecto legibles o seguros.",
          "Esencial para evitar que fórmulas matemáticas se anulen al toparse con un NULL."
        ]
      },
      {
        "title": "Cálculos matemáticos inmunes a nulos",
        "explanation": "En SQL, cualquier operación matemática contra un `NULL` produce `NULL` (`100 + NULL = NULL`). Si calculas el total de una factura sumando `subtotal + impuesto - descuento`, y `descuento` es `NULL`, ¡la factura entera se convierte en `NULL`!\nPara blindar tus cálculos, envuelve cada término en `COALESCE`:",
        "codeSnippet": "-- Calculamos salarios con bonificaciones opcionales seguras\nSELECT \n  nombre,\n  salario,\n  COALESCE(salario, 0.0) * 1.10 AS salario_con_aumento\nFROM empleados\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+---------------+---------+----------------------+\n| nombre        | salario | salario_con_aumento  |\n+---------------+---------+----------------------+\n| Carlos Mendoza| 3200.0  | 3520.0               |\n| Elena Rostova | 2850.5  | 3135.55              |\n| Mateo Díaz    | 3100.0  | 3410.0               |\n+---------------+---------+----------------------+\n3 rows in set (0.002 sec)",
        "byteTip": "En SQLite también existe IFNULL(a, b), pero COALESCE es el estándar ANSI SQL preferido por ser portable a PostgreSQL y MySQL.",
        "pitfallTip": "Asegúrate de que los tipos de datos en COALESCE coincidan: no mezcles números con cadenas si vas a operar matemáticamente.",
        "keyPoints": [
          "Previene la propagación de nulos en operaciones aritméticas.",
          "Mapea datos directamente a tipos no-nulos en Room y Kotlin.",
          "Es un estándar internacional adoptado por todos los motores de base de datos."
        ]
      }
    ]
  },
  "sql-u11-l04": {
    "id": "sql-th-u11-l04",
    "lessonId": "sql-u11-l04",
    "pathId": "sql",
    "unitId": 11,
    "levelId": 4,
    "title": "4. CASE",
    "subtitle": "Implementa lógica condicional if-else directamente dentro de tus consultas SQL usando la estructura CASE WHEN.",
    "estimatedMinutes": 8,
    "analogy": "Un semáforo que clasifica a los estudiantes por promedio: si la nota es >= 9.5 enciende luz verde (\"Sobresaliente\"), si es >= 8.5 luz amarilla (\"Destacado\"), y para el resto luz blanca (\"Regular\").",
    "video": {
      "title": "Funciones Nativas y Subconsultas en SQLite",
      "channel": "Fazt Code",
      "duration": "47:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Manipulación con UPPER, LENGTH, COALESCE, CASE condicional y subconsultas con IN."
    },
    "sections": [
      {
        "title": "Lógica condicional declarativa con CASE WHEN",
        "explanation": "A menudo necesitas categorizar o transformar datos sobre la marcha sin alterar la base de datos: convertir números de estatus en palabras amigables, o asignar etiquetas comerciales a los precios.\n\nLa estructura **`CASE`** es el equivalente en SQL del `when` de Kotlin o `switch-case`:\n\nSintaxis:\n`CASE`\n`  WHEN condicion1 THEN resultado1`\n`  WHEN condicion2 THEN resultado2`\n`  ELSE resultado_por_defecto`\n`END`\n\nLas condiciones se evalúan en orden de arriba a abajo. La primera condición que resulte verdadera determina el valor de salida. Si ninguna se cumple, se devuelve lo que indique el `ELSE` (o `NULL` si se omitió el `ELSE`). Toda la estructura debe cerrarse obligatoriamente con la palabra **`END`**.",
        "codeSnippet": "-- Clasificamos a los estudiantes según su promedio general\nSELECT \n  nombre,\n  promedio,\n  CASE \n    WHEN promedio >= 9.5 THEN 'Cuadro de Honor'\n    WHEN promedio >= 8.5 THEN 'Destacado'\n    ELSE 'Regular'\n  END AS nivel_academico\nFROM estudiantes;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+----------+-----------------+\n| nombre          | promedio | nivel_academico |\n+-----------------+----------+-----------------+\n| Valeria Morales | 9.4      | Destacado       |\n| Diego Fernández | 8.8      | Destacado       |\n| Camila Gómez    | 9.7      | Cuadro de Honor |\n| Javier Ramos    | 8.2      | Regular         |\n| Lucía Navarro   | 9.1      | Destacado       |\n+-----------------+----------+-----------------+\n5 rows in set (0.002 sec)",
        "byteTip": "Puedes usar CASE tanto en la lista de proyección del SELECT como dentro de WHERE o en la cláusula ORDER BY para órdenes personalizados.",
        "pitfallTip": "Olvidar la palabra END al final de la estructura CASE es uno de los errores sintácticos más comunes en SQL.",
        "keyPoints": [
          "CASE WHEN evalúa condiciones lógicas y devuelve un valor asignado.",
          "La cláusula ELSE atrapa todos los casos no contemplados.",
          "Siempre debe cerrarse con la palabra clave END."
        ]
      },
      {
        "title": "Traducción de estados y códigos en interfaces de Android",
        "explanation": "En bases de datos móviles es muy común guardar estados como códigos numéricos o booleanos (`activo = true`, `estado = 1`). Con `CASE` puedes traducirlos de inmediato a textos amigables para la interfaz gráfica:",
        "codeSnippet": "-- Traducimos el estado de pedidos a etiquetas claras con emojis\nSELECT \n  id,\n  total,\n  CASE estado\n    WHEN 'entregado' THEN '✅ Recibido'\n    WHEN 'enviado' THEN '🚚 En camino'\n    WHEN 'procesando' THEN '⏳ En preparación'\n    ELSE '⚠️ Pendiente'\n  END AS estado_visual\nFROM pedidos;",
        "codeLanguage": "sql",
        "outputSnippet": "+------+--------+-------------------+\n| id   | total  | estado_visual     |\n+------+--------+-------------------+\n| 1001 | 139.89 | ✅ Recibido       |\n| 1002 | 429.50 | ⏳ En preparación |\n| 1003 | 89.99  | ✅ Recibido       |\n| 1004 | 14.99  | 🚚 En camino      |\n| 1005 | 178.90 | ⚠️ Pendiente      |\n+------+--------+-------------------+\n5 rows in set (0.002 sec)",
        "byteTip": "Esta forma compacta CASE columna WHEN valor THEN ... se llama \"CASE simple\" y es ideal para comparar contra valores fijos.",
        "pitfallTip": "Asegúrate de que todos los THEN devuelvan datos del mismo tipo (por ejemplo, todas cadenas o todos números) para evitar incoherencias.",
        "keyPoints": [
          "Traduce códigos internos en textos legibles para los usuarios finales.",
          "Mantiene la lógica de presentación desacoplada del almacenamiento.",
          "Funciona de manera fluida y nativa en cualquier versión de SQLite."
        ]
      }
    ]
  },
  "sql-u11-l05": {
    "id": "sql-th-u11-l05",
    "lessonId": "sql-u11-l05",
    "pathId": "sql",
    "unitId": 11,
    "levelId": 5,
    "title": "5. Funciones básicas de fecha",
    "subtitle": "Aprende a consultar el tiempo, calcular fechas y manejar zonas horarias con las funciones de fecha nativas de SQLite.",
    "estimatedMinutes": 8,
    "analogy": "Un reloj con calendario perpetuo: le preguntas qué fecha es hoy, qué día de la semana cae, o qué fecha exacta será dentro de 30 días con solo pedirlo.",
    "video": {
      "title": "Funciones Nativas y Subconsultas en SQLite",
      "channel": "Fazt Code",
      "duration": "47:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Manipulación con UPPER, LENGTH, COALESCE, CASE condicional y subconsultas con IN."
    },
    "sections": [
      {
        "title": "Funciones de fecha y hora en SQLite",
        "explanation": "SQLite no tiene un tipo de dato dedicado llamado `DATETIME`; en su lugar almacena fechas como cadenas de texto en formato ISO-8601 (`'AAAA-MM-DD HH:MM:SS'`).\n\nPara operar con ellas, SQLite ofrece funciones especializadas:\n1. **`DATE('now')`**: Devuelve la fecha actual del sistema en formato `'AAAA-MM-DD'`.\n2. **`DATETIME('now')`**: Devuelve la fecha y hora actual en tiempo universal coordinado (`UTC`).\n3. **Modificadores de intervalo**: Puedes sumar o restar tiempo fácilmente añadiendo argumentos en cadena:\n   • `DATE('now', '+7 days')`: la fecha de hoy más 7 días.\n   • `DATE('now', '-1 month')`: la fecha de hace un mes.\n   • `DATE('now', 'start of month')`: el primer día del mes actual.",
        "codeSnippet": "-- Consultamos la fecha actual y proyecciones de tiempo en SQLite\nSELECT \n  DATE('now') AS hoy,\n  DATETIME('now') AS hora_utc,\n  DATE('now', '+30 days') AS vencimiento_mensual;",
        "codeLanguage": "sql",
        "outputSnippet": "+------------+---------------------+---------------------+\n| hoy        | hora_utc            | vencimiento_mensual |\n+------------+---------------------+---------------------+\n| 2026-10-21 | 2026-10-21 19:15:00 | 2026-11-20          |\n+------------+---------------------+---------------------+\n1 row in set (0.001 sec)",
        "byteTip": "Almacena siempre fechas en formato ISO-8601 (TEXT) o como timestamps Unix en milisegundos (INTEGER); esto permite ordenarlas cronológicamente de forma perfecta.",
        "pitfallTip": "No uses operadores matemáticos como fecha - 7 para restar días; debes usar la función DATE(fecha, \"-7 days\").",
        "keyPoints": [
          "DATE(\"now\") produce la fecha del sistema en formato ISO-8601.",
          "Los modificadores de intervalo permiten sumar o restar días, meses y años.",
          "SQLite almacena fechas como cadenas de texto legibles o números de época."
        ]
      },
      {
        "title": "Cálculo de antigüedad y filtrado cronológico",
        "explanation": "En aplicaciones empresariales es indispensable calcular cuántos años o días lleva registrado un empleado o cliente para aplicar beneficios de lealtad:",
        "codeSnippet": "-- Consultamos empleados registrados ordenados cronológicamente\nSELECT \n  nombre,\n  departamento,\n  fecha_ingreso\nFROM empleados\nORDER BY fecha_ingreso ASC;",
        "codeLanguage": "sql",
        "outputSnippet": "+---------------+--------------+---------------+\n| nombre        | departamento | fecha_ingreso |\n+---------------+--------------+---------------+\n| Sofía Valerio | Dirección    | 2019-11-20    |\n| Elena Rostova | Diseño UX    | 2021-08-01    |\n| Carlos Mendoza| Ingeniería   | 2022-03-15    |\n| Mateo Díaz    | Sistemas     | 2023-01-10    |\n| Andrés Solano | Soporte      | 2024-02-01    |\n+---------------+--------------+---------------+\n5 rows in set (0.002 sec)",
        "byteTip": "En Room con Android, puedes usar un TypeConverter para convertir automáticamente un Instant de Kotlin a la cadena ISO que SQLite almacena.",
        "pitfallTip": "Cuidado con las zonas horarias: si el servidor graba en UTC y el teléfono lee en local, asegúrate de aplicar \"localtime\" en la consulta si es necesario.",
        "keyPoints": [
          "El formato AAAA-MM-DD se ordena de forma natural tanto alfabética como cronológicamente.",
          "Facilita la creación de filtros temporales (ej. ventas del último mes).",
          "Los TypeConverters de Room integran estas fechas de forma transparente con Kotlin."
        ]
      }
    ]
  },
  "sql-u11-l06": {
    "id": "sql-th-u11-l06",
    "lessonId": "sql-u11-l06",
    "pathId": "sql",
    "unitId": 11,
    "levelId": 6,
    "title": "6. Subconsultas con IN",
    "subtitle": "Aprende a anidar consultas usando subconsultas con la cláusula IN para resolver preguntas de dos niveles.",
    "estimatedMinutes": 8,
    "analogy": "Un jefe que le pide a su secretaria: \"Primero búscame la lista de IDs de clientes que deben dinero. Cuando tengas esa lista en la mano, pásasela a cobranzas para que les envíen un correo\". Una consulta alimenta a la otra.",
    "video": {
      "title": "Funciones Nativas y Subconsultas en SQLite",
      "channel": "Fazt Code",
      "duration": "47:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Manipulación con UPPER, LENGTH, COALESCE, CASE condicional y subconsultas con IN."
    },
    "sections": [
      {
        "title": "Consultas anidadas: Subconsultas con la cláusula IN",
        "explanation": "Una **subconsulta** (*subquery*) es una sentencia `SELECT` encerrada entre paréntesis que se coloca dentro de otra consulta principal.\n\nEn una subconsulta con **`IN`**:\n1. La consulta interna (dentro del paréntesis) se ejecuta primero.\n2. Genera una lista temporal de valores (por ejemplo, una lista de IDs de estudiantes).\n3. La consulta externa toma esa lista y filtra sus propias filas diciendo:\n   `WHERE id IN (lista generada por la subconsulta)`\n\nRegla crucial: la subconsulta interna debe proyectar **exactamente una sola columna**. Si intentas poner `SELECT *` dentro del paréntesis, SQLite arrojará un error porque la cláusula `IN` no puede comparar un número contra una fila entera de 5 columnas.",
        "codeSnippet": "-- Consultamos qué estudiantes están cursando la asignatura con id = 101\nSELECT id, nombre, carrera\nFROM estudiantes\nWHERE id IN (\n  SELECT estudiante_id\n  FROM matriculas\n  WHERE asignatura_id = 101\n);",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+-------------------------+\n| id | nombre          | carrera                 |\n+----+-----------------+-------------------------+\n| 1  | Valeria Morales | Ingeniería de Software  |\n| 2  | Diego Fernández | Ciencias Computación    |\n| 3  | Camila Gómez    | Sistemas Información    |\n+----+-----------------+-------------------------+\n3 rows in set (0.002 sec)",
        "byteTip": "Usa subconsultas con IN cuando quieras filtrar una tabla maestra sin necesidad de duplicar filas por culpa de un JOIN.",
        "pitfallTip": "Si la subconsulta interna devuelve un valor NULL en una cláusula NOT IN, la consulta entera puede devolver 0 resultados de forma inesperada.",
        "keyPoints": [
          "Una subconsulta es un SELECT anidado entre paréntesis.",
          "La consulta interna se ejecuta en primer lugar y entrega sus datos a la externa.",
          "La subconsulta dentro de un IN debe proyectar una única columna."
        ]
      },
      {
        "title": "Casos reales: Clientes que han comprado en categorías específicas",
        "explanation": "Veamos cómo encontrar qué usuarios de nuestra base de datos han realizado pedidos registrados en el sistema:",
        "codeSnippet": "-- Usuarios que tienen al menos un pedido registrado en el historial\nSELECT nombre, email, pais\nFROM usuarios\nWHERE id IN (\n  SELECT cliente_id\n  FROM pedidos\n);",
        "codeLanguage": "sql",
        "outputSnippet": "+-------------------+--------------------+----------------+\n| nombre            | email              | pais           |\n+-------------------+--------------------+----------------+\n| Ada Lovelace      | ada@pioneers.org   | Reino Unido    |\n| Alan Turing       | alan@bletchley.org | Reino Unido    |\n| Grace Hopper      | grace@navy.mil     | Estados Unidos |\n| Linus Torvalds    | linus@linux.org    | Finlandia      |\n| Margaret Hamilton | margaret@nasa.gov  | Estados Unidos |\n+-------------------+--------------------+----------------+\n5 rows in set (0.002 sec)",
        "byteTip": "En Room puedes combinar DAO methods o ejecutar subconsultas complejas de manera declarativa con @Query.",
        "pitfallTip": "Evita subconsultas correlacionadas muy pesadas dentro de bucles si puedes resolverlo con un INNER JOIN indexado.",
        "keyPoints": [
          "Permite desacoplar consultas en pasos lógicos independientes.",
          "Mantiene las filas maestras sin multiplicaciones indeseadas.",
          "Es una técnica de enorme potencia expresiva en bases de datos relacionales."
        ]
      }
    ]
  },
  "sql-u11-l07": {
    "id": "sql-th-u11-l07",
    "lessonId": "sql-u11-l07",
    "pathId": "sql",
    "unitId": 11,
    "levelId": 7,
    "title": "7. Comparar contra un resultado agregado",
    "subtitle": "Aprende a usar subconsultas escalares para comparar registros individuales contra métricas y promedios globales.",
    "estimatedMinutes": 8,
    "analogy": "Buscar a los estudiantes que sacaron mejor nota que el promedio de toda la escuela: primero calculas la nota promedio global de la escuela (ej. 8.5) y luego buscas a quienes superan ese número exacto.",
    "video": {
      "title": "Funciones Nativas y Subconsultas en SQLite",
      "channel": "Fazt Code",
      "duration": "47:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Manipulación con UPPER, LENGTH, COALESCE, CASE condicional y subconsultas con IN."
    },
    "sections": [
      {
        "title": "Subconsultas escalares: Comparaciones globales",
        "explanation": "Una **subconsulta escalar** es aquella que devuelve **exactamente una fila y una columna**: es decir, un solo valor atómico (como el resultado de `AVG()`, `MAX()` o `MIN()`).\n\nDado que produce un solo número, puedes colocarla directamente a la derecha de cualquier operador de comparación estándar (`>`, `<`, `>=`, `<=`, `=`):\n\n`SELECT nombre, salario`\n`FROM empleados`\n`WHERE salario > (SELECT AVG(salario) FROM empleados);`\n\nEl motor primero calcula el promedio de todos los empleados y luego evalúa fila por fila quiénes ganan más que esa cifra.",
        "codeSnippet": "-- Buscamos a los estudiantes cuyo promedio personal supera el promedio institucional\nSELECT \n  nombre,\n  carrera,\n  promedio\nFROM estudiantes\nWHERE promedio > (\n  SELECT AVG(promedio)\n  FROM estudiantes\n);",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+------------------------+----------+\n| nombre          | carrera                | promedio |\n+-----------------+------------------------+----------+\n| Valeria Morales | Ingeniería de Software | 9.4      |\n| Camila Gómez    | Sistemas Información   | 9.7      |\n| Lucía Navarro   | Ingeniería de Software | 9.1      |\n+-----------------+------------------------+----------+\n3 rows in set (0.002 sec)",
        "byteTip": "Las subconsultas escalares son muy rápidas porque el cálculo agregado global solo se ejecuta una sola vez.",
        "pitfallTip": "Si tu subconsulta devuelve más de 1 fila, SQLite arrojará el error: \"sub-select returns 5 columns or rows - only 1 expected\".",
        "keyPoints": [
          "Una subconsulta escalar produce un solo valor atómico de salida.",
          "Puede usarse con operadores matemáticos y de comparación estándar.",
          "Permite responder preguntas analíticas relativas al total del sistema."
        ]
      },
      {
        "title": "Identificación de productos y registros sobresalientes",
        "explanation": "¿Qué productos tienen un precio superior al precio medio del catálogo? Con esta técnica obtienes la respuesta en una sola consulta sin tener que hacer dos llamadas separadas desde la app:",
        "codeSnippet": "-- Productos de gama alta cuyo precio supera el promedio del inventario\nSELECT \n  nombre,\n  categoria,\n  precio\nFROM productos\nWHERE precio > (\n  SELECT AVG(precio)\n  FROM productos\n);",
        "codeLanguage": "sql",
        "outputSnippet": "+-------------------------------+-----------+--------+\n| nombre                        | categoria | precio |\n+-------------------------------+-----------+--------+\n| Monitor Ultrawide 34\"         | Pantallas | 429.50 |\n+-------------------------------+-----------+--------+\n1 row in set (0.001 sec)",
        "byteTip": "En Android, resolver este cálculo en una sola consulta SQLite ahorra batería y reduce la latencia de red.",
        "pitfallTip": "Asegúrate de envolver la subconsulta siempre entre paréntesis; de lo contrario el compilador no sabrá dónde empieza.",
        "keyPoints": [
          "Calcula umbrales dinámicos que se adaptan automáticamente al crecimiento de los datos.",
          "Elimina la necesidad de calcular promedios manualmente en el código de Kotlin.",
          "Cierra con broche de oro tu dominio sobre las consultas analíticas de SQL."
        ]
      }
    ]
  }
};
