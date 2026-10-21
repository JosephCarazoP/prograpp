import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_06_THEORY: Record<string, TheoryLesson> = {
  "sql-u06-l01": {
    "id": "sql-th-u06-l01",
    "lessonId": "sql-u06-l01",
    "pathId": "sql",
    "unitId": 6,
    "levelId": 1,
    "title": "1. SELECT ... FROM",
    "subtitle": "Aprende a consultar y extraer información de tus tablas con la sentencia rey: SELECT ... FROM.",
    "estimatedMinutes": 8,
    "analogy": "Hacer una solicitud en una ventanilla de biblioteca: dices \"Quiero ver los libros (SELECT) que están en la estantería de ciencias (FROM)\". La bibliotecaria te trae exactamente esa colección para que la leas.",
    "video": {
      "title": "Consultas Esenciales: SELECT, Columnas, Alias y DISTINCT",
      "channel": "Midudev",
      "duration": "42:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Proyección de datos, expresiones calculadas con AS y eliminación de duplicados."
    },
    "sections": [
      {
        "title": "La sentencia SELECT ... FROM",
        "explanation": "El 80% del tiempo que trabajes con bases de datos lo pasarás consultando información para mostrársela a tus usuarios en pantalla.\n\nLa instrucción fundamental para consultar datos en SQL es **`SELECT`**:\n`SELECT qué_columnas_quiero_ver`\n`FROM de_qué_tabla_quiero_sacarlas;`\n\n• **`SELECT`**: Define la **proyección** (qué atributos deseas que aparezcan en el reporte).\n• **`FROM`**: Define el **origen** (de qué tabla se extraerán los datos).\n\nLas consultas `SELECT` **son de solo lectura**: puedes ejecutarlas un millón de veces sin alterar ni un solo dato de la base de datos.",
        "codeSnippet": "-- Consulta básica de todas las filas y columnas de la tabla productos\nSELECT id, nombre, categoria, precio, stock\nFROM productos;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+------------------------------+-----------+--------+-------+\n| id | nombre                       | categoria | precio | stock |\n+----+------------------------------+-----------+--------+-------+\n| 1  | Teclado Mecánico RGB         | Hardware  | 89.99  | 45    |\n| 2  | Monitor Ultrawide 34\"        | Pantallas | 429.5  | 12    |\n| 3  | Mouse Ergonómico Pro         | Hardware  | 49.9   | 80    |\n| 4  | Auriculares Cancelación Ruido| Audio     | 129.0  | 25    |\n| 5  | Cable HDMI 2.1 Braided       | Accesorios| 14.99  | 150   |\n+----+------------------------------+-----------+--------+-------+\n5 filas devueltas",
        "byteTip": "En SQL es buena práctica cerrar cada sentencia completa con un punto y coma (;).",
        "pitfallTip": "Escribir el orden al revés (FROM productos SELECT id) provocará un error de sintaxis inmediato.",
        "keyPoints": [
          "SELECT indica las columnas deseadas; FROM indica la tabla de origen.",
          "Es una operación pura de lectura que no modifica los datos almacenados.",
          "Es la sentencia más utilizada y optimizada del mundo de las bases de datos."
        ]
      },
      {
        "title": "Consultas simples para alimentar interfaces en Android",
        "explanation": "En una aplicación de Android con Room y Jetpack Compose, una función como `@Query(\"SELECT id, nombre FROM estudiantes\")` alimenta directamente una lista de tarjetas en pantalla:",
        "codeSnippet": "-- Consulta de nombres y carreras para poblar un listado en la app móvil\nSELECT id, nombre, carrera\nFROM estudiantes;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+--------------------------+\n| id | nombre          | carrera                  |\n+----+-----------------+--------------------------+\n| 1  | Valeria Morales | Ingeniería de Software   |\n| 2  | Diego Fernández | Ciencias Computacionales |\n| 3  | Camila Gómez    | Sistemas de Información  |\n| 4  | Javier Ramos    | Ciberseguridad           |\n| 5  | Lucía Navarro   | Ingeniería de Software   |\n+----+-----------------+--------------------------+\n5 filas devueltas",
        "byteTip": "Al pedir solo id, nombre y carrera, SQLite transfiere menos datos a la memoria de la app.",
        "pitfallTip": "No uses SELECT para modificar datos; para modificar se usa UPDATE.",
        "keyPoints": [
          "Las consultas SELECT alimentan directamente los modelos de vista (ViewModels).",
          "La selección precisa de columnas agiliza la renderización de la pantalla.",
          "Es la base de la lectura de datos en arquitecturas modernas."
        ]
      }
    ]
  },
  "sql-u06-l02": {
    "id": "sql-th-u06-l02",
    "lessonId": "sql-u06-l02",
    "pathId": "sql",
    "unitId": 6,
    "levelId": 2,
    "title": "2. Seleccionar todas las columnas con *",
    "subtitle": "Comprende el comodín de asterisco (*) para pedir todas las columnas y cuándo conviene evitarlo.",
    "estimatedMinutes": 8,
    "analogy": "Pedir \"todo el menú\" en un restaurante: es fantástico cuando estás probando y quieres conocer todas las opciones de una mesa, pero si tienes prisa y solo quieres un café, pedir todo el menú es un desperdicio enorme de recursos.",
    "video": {
      "title": "Consultas Esenciales: SELECT, Columnas, Alias y DISTINCT",
      "channel": "Midudev",
      "duration": "42:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Proyección de datos, expresiones calculadas con AS y eliminación de duplicados."
    },
    "sections": [
      {
        "title": "El asterisco (*) en SELECT: traer todo",
        "explanation": "En SQL, el asterisco (**`*`**) actúa como un comodín universal que significa **\"todas las columnas de la tabla\"**:\n\n`SELECT * FROM usuarios;`\n\nEs extraordinariamente útil cuando:\n• Estás aprendiendo o explorando una base de datos nueva para ver qué columnas contiene.\n• Estás en la consola de depuración revisando el estado completo de un registro.\n\nSin embargo, en **código de producción para aplicaciones Android o servidores**, usar `SELECT *` se considera una **mala práctica** si la tabla tiene muchas columnas pesadas o textos largos que no vas a mostrar en pantalla.",
        "codeSnippet": "-- Usamos el comodín * para inspeccionar rápidamente la tabla completa de empleados\nSELECT *\nFROM empleados;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+----------------+--------------+---------+---------------+--------+\n| id  | nombre         | departamento | salario | fecha_ingreso | activo |\n+-----+----------------+--------------+---------+---------------+--------+\n| 101 | Carlos Mendoza | Ingeniería   | 3200.0  | 2022-03-15    | true   |\n| 102 | Elena Rostova  | Diseño UX    | 2850.5  | 2021-08-01    | true   |\n| 103 | Mateo Díaz     | Sistemas     | 3100.0  | 2023-01-10    | true   |\n| 104 | Sofía Valerio  | Dirección    | 4500.0  | 2019-11-20    | true   |\n| 105 | Andrés Solano  | Soporte      | 1900.0  | 2024-02-01    | false  |\n+-----+----------------+--------------+---------+---------------+--------+\n5 filas devueltas",
        "byteTip": "Usa SELECT * para explorar en la consola; usa columnas explícitas en el código final de tu aplicación.",
        "pitfallTip": "Si alguien agrega una columna pesada (como fotos en BLOB) a la tabla en el futuro, tus consultas SELECT * se volverán lentísimas sin que te des cuenta.",
        "keyPoints": [
          "SELECT * proyecta todas las columnas disponibles de la tabla.",
          "Es ideal para fases de exploración, pruebas y depuración rápida.",
          "En producción se recomienda listar las columnas deseadas explícitamente."
        ]
      },
      {
        "title": "Rendimiento y consumo de batería en móviles",
        "explanation": "En teléfonos móviles, cada byte que se lee del disco y se convierte en objetos consume ciclos de procesador y batería. Proyectar solo las columnas visibles en pantalla (ejemplo: solo `nombre` y `salario`) mantiene la app rápida y fluida:",
        "codeSnippet": "-- Proyección limpia de solo dos columnas para una vista de resumen\nSELECT nombre, salario\nFROM empleados\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------+---------+\n| nombre         | salario |\n+----------------+---------+\n| Carlos Mendoza | 3200.0  |\n| Elena Rostova  | 2850.5  |\n| Mateo Díaz     | 3100.0  |\n+----------------+---------+\n3 filas devueltas",
        "byteTip": "Room en Android premia pedir solo las columnas que tu data class de Kotlin necesita.",
        "pitfallTip": "Evita transferir contraseñas o datos confidenciales al usar SELECT * por descuido.",
        "keyPoints": [
          "Pedir columnas específicas optimiza el consumo de batería y memoria RAM.",
          "Previene filtraciones accidentales de campos sensibles en la interfaz.",
          "Mejora la velocidad de respuesta en listas grandes de miles de registros."
        ]
      }
    ]
  },
  "sql-u06-l03": {
    "id": "sql-th-u06-l03",
    "lessonId": "sql-u06-l03",
    "pathId": "sql",
    "unitId": 6,
    "levelId": 3,
    "title": "3. Seleccionar columnas específicas",
    "subtitle": "Aprende a proyectar columnas específicas y elegir el orden en que se muestran los resultados.",
    "estimatedMinutes": 8,
    "analogy": "Un escaparate de joyería: de todos los objetos guardados en la bodega blindada, el joyero solo coloca en la vitrina los tres anillos más hermosos ordenados para que los clientes los admiren.",
    "video": {
      "title": "Consultas Esenciales: SELECT, Columnas, Alias y DISTINCT",
      "channel": "Midudev",
      "duration": "42:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Proyección de datos, expresiones calculadas con AS y eliminación de duplicados."
    },
    "sections": [
      {
        "title": "Proyección de columnas específicas",
        "explanation": "Para seleccionar columnas específicas, simplemente escribes sus nombres separados por comas después de la palabra clave `SELECT`:\n`SELECT columna1, columna2, columna3 FROM tabla;`\n\nVentajas:\n1. **Control total del orden:** Las columnas aparecerán en el resultado exactamente en el orden en que las escribiste en el `SELECT`, sin importar en qué orden físico están guardadas en la tabla.\n2. **Claridad documental:** Cualquier persona que lea tu consulta sabrá de inmediato qué datos espera recibir tu interfaz.\n3. **Eficiencia:** El motor de SQLite solo lee del disco los bloques de datos correspondientes a esas columnas.",
        "codeSnippet": "-- Seleccionamos solo 3 columnas en un orden personalizado\nSELECT nombre, stock, precio\nFROM productos\nORDER BY stock DESC;",
        "codeLanguage": "sql",
        "outputSnippet": "+------------------------------+-------+--------+\n| nombre                       | stock | precio |\n+------------------------------+-------+--------+\n| Cable HDMI 2.1 Braided       | 150   | 14.99  |\n| Mouse Ergonómico Pro         | 80    | 49.9   |\n| Teclado Mecánico RGB         | 45    | 89.99  |\n| Auriculares Cancelación Ruido| 25    | 129.0  |\n| Monitor Ultrawide 34\"        | 12    | 429.5  |\n+------------------------------+-------+--------+\n5 filas devueltas",
        "byteTip": "Observa cómo pusimos stock antes que precio en el SELECT, y así mismo se proyecta en la tabla resultante.",
        "pitfallTip": "No pongas coma después de la última columna antes del FROM (escribir SELECT col1, col2, FROM dará error de sintaxis).",
        "keyPoints": [
          "Listar columnas separadas por comas define la proyección exacta.",
          "El orden de los resultados sigue el orden especificado en el SELECT.",
          "Reduce el tráfico de datos y maximiza la velocidad de respuesta."
        ]
      },
      {
        "title": "Consultas sobre usuarios para pantallas de perfil",
        "explanation": "Mira cómo extraer la información de contacto pública de los usuarios sin arrastrar campos privados:",
        "codeSnippet": "-- Proyección de datos públicos para una pantalla de contactos\nSELECT id, nombre, email, pais\nFROM usuarios\nWHERE activo = true;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-------------------+--------------------+---------------+\n| id | nombre            | email              | pais          |\n+----+-------------------+--------------------+---------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   | Reino Unido   |\n| 2  | Alan Turing       | alan@bletchley.org | Reino Unido   |\n| 4  | Linus Torvalds    | linus@linux.org    | Finlandia     |\n| 5  | Margaret Hamilton | margaret@nasa.gov  | Estados Unidos|\n+----+-------------------+--------------------+---------------+\n4 filas devueltas",
        "byteTip": "WHERE activo = true filtra automáticamente a los usuarios inactivos o dados de baja.",
        "pitfallTip": "Verifica que los nombres de columnas estén bien escritos; si escribes nombres inexistentes, SQLite devolverá un error de no such column.",
        "keyPoints": [
          "La proyección selectiva protege la privacidad de los usuarios.",
          "Permite adaptar la consulta a diferentes pantallas de la misma app.",
          "Es el patrón básico de desarrollo en frontend y móvil."
        ]
      }
    ]
  },
  "sql-u06-l04": {
    "id": "sql-th-u06-l04",
    "lessonId": "sql-u06-l04",
    "pathId": "sql",
    "unitId": 6,
    "levelId": 4,
    "title": "4. Alias con AS",
    "subtitle": "Renombra encabezados de columna en tus consultas usando alias con la palabra clave AS.",
    "estimatedMinutes": 8,
    "analogy": "Ponerle un apodo amigable a un contacto: en su pasaporte se llama \"Alejandro Francisco\", pero en tu teléfono le pones \"Alex\" para reconocerlo al instante.",
    "video": {
      "title": "Consultas Esenciales: SELECT, Columnas, Alias y DISTINCT",
      "channel": "Midudev",
      "duration": "42:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Proyección de datos, expresiones calculadas con AS y eliminación de duplicados."
    },
    "sections": [
      {
        "title": "Alias de columnas con AS",
        "explanation": "A veces los nombres técnicos de las columnas en la base de datos son feos, crípticos o poco amigables para el usuario final (como `prec_unit_usd` o `cant_disp`). Además, cuando realizamos cálculos o fórmulas matemáticas, la columna resultante no tiene un nombre propio.\n\nPara darles un nombre limpio, legible y elegante en el resultado, usamos **alias con la palabra clave `AS`**:\n`SELECT nombre_columna AS apodo_legible FROM tabla;`\n\nEl alias solo cambia el encabezado en el resultado de la consulta; **no modifica el nombre real de la columna en la tabla**.",
        "codeSnippet": "-- Usamos alias (AS) para dar formato profesional a los encabezados del reporte\nSELECT \n    nombre AS producto_oficial,\n    precio AS costo_unitario_dolares,\n    stock AS unidades_disponibles\nFROM productos\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------------+-----------------------+----------------------+\n| producto_oficial     | costo_unitario_dolares| unidades_disponibles |\n+----------------------+-----------------------+----------------------+\n| Teclado Mecánico RGB | 89.99                 | 45                   |\n| Monitor Ultrawide 34\"| 429.5                 | 12                   |\n| Mouse Ergonómico Pro | 49.9                  | 80                   |\n+----------------------+-----------------------+----------------------+\n3 filas devueltas",
        "byteTip": "Si tu alias tiene espacios (lo cual no se recomienda en código pero sí en reportes impresos), enciérralo entre comillas dobles: AS \"Costo Unitario\".",
        "pitfallTip": "No puedes usar el alias creado en el SELECT dentro de la misma cláusula WHERE de esa consulta, porque WHERE se evalúa antes que el SELECT.",
        "keyPoints": [
          "AS renombra temporalmente una columna en el resultado de la consulta.",
          "Es indispensable para nombrar columnas calculadas y operaciones matemáticas.",
          "No altera la estructura real de la tabla en el disco."
        ]
      },
      {
        "title": "Mapeo de nombres hacia Kotlin y Room",
        "explanation": "En Android, si tu clase `data class` en Kotlin tiene una propiedad con nombre diferente a la columna de SQLite, puedes usar `AS` en la consulta para que coincidan perfectamente:",
        "codeSnippet": "-- Mapeamos nombres de SQLite a variables descriptivas en Kotlin\nSELECT id AS codigoIdentificador, nombre AS nombreCompleto\nFROM usuarios\nLIMIT 2;",
        "codeLanguage": "sql",
        "outputSnippet": "+---------------------+----------------+\n| codigoIdentificador | nombreCompleto |\n+---------------------+----------------+\n| 1                   | Ada Lovelace   |\n| 2                   | Alan Turing    |\n+---------------------+----------------+\n2 filas devueltas",
        "byteTip": "En SQL estándar, la palabra AS es opcional (SELECT nombre apodo), pero escribir AS explícito hace el código mucho más fácil de leer.",
        "pitfallTip": "Evita crear alias con nombres idénticos para columnas diferentes en la misma consulta.",
        "keyPoints": [
          "AS alinea consultas SQL con las propiedades de clases en Kotlin.",
          "Mejora la estética de los reportes tabulares generados.",
          "Es una técnica común en vistas e informes ejecutivos."
        ]
      }
    ]
  },
  "sql-u06-l05": {
    "id": "sql-th-u06-l05",
    "lessonId": "sql-u06-l05",
    "pathId": "sql",
    "unitId": 6,
    "levelId": 5,
    "title": "5. Columnas calculadas",
    "subtitle": "Aprende a realizar operaciones matemáticas y crear columnas calculadas en vivo dentro de tu SELECT.",
    "estimatedMinutes": 8,
    "analogy": "La calculadora de una caja registradora: el precio del artículo es $100 y compras 3 unidades. La pantalla de la caja calcula y te muestra directamente \"$300\" en el ticket sin alterar el precio de $100 de la etiqueta.",
    "video": {
      "title": "Consultas Esenciales: SELECT, Columnas, Alias y DISTINCT",
      "channel": "Midudev",
      "duration": "42:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Proyección de datos, expresiones calculadas con AS y eliminación de duplicados."
    },
    "sections": [
      {
        "title": "Columnas calculadas y expresiones en SELECT",
        "explanation": "El `SELECT` no se limita a mostrar datos tal como están guardados en la tabla: ¡es un motor de cálculo en tiempo real!\n\nPuedes realizar sumas, restas, multiplicaciones, divisiones o combinar textos directamente en la consulta:\n• Multiplicar precio por unidades: `precio * cantidad AS subtotal`\n• Sumar impuestos: `precio * 1.16 AS precio_con_iva`\n• Calcular descuentos: `precio * 0.90 AS precio_promocional`\n\nEstas columnas calculadas se generan al vuelo en la memoria y desaparecen al terminar la consulta, sin ocupar espacio innecesario en el disco.",
        "codeSnippet": "-- Calculamos el valor monetario del inventario y aplicamos un descuento simulado\nSELECT \n    nombre,\n    precio,\n    (precio * 0.85) AS precio_con_15_descuento,\n    (precio * stock) AS capital_invertido\nFROM productos\nLIMIT 3;",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------------+-------------------------+-------------------+\n| nombre               | precio_con_15_descuento | capital_invertido |\n+----------------------+-------------------------+-------------------+\n| Teclado Mecánico RGB | 76.4915                 | 4049.55           |\n| Monitor Ultrawide 34\"| 365.075                 | 5154.0            |\n| Mouse Ergonómico Pro | 42.415                  | 3992.0            |\n+----------------------+-------------------------+-------------------+\n3 filas devueltas",
        "byteTip": "Usa la función ROUND(expresion, decimales) para redondear resultados decimales a 2 dígitos en reportes de dinero.",
        "pitfallTip": "Recuerda darles siempre un alias con AS; de lo contrario, el encabezado de la columna será la fórmula cruda como (precio * 0.85).",
        "keyPoints": [
          "SELECT evalúa expresiones matemáticas y lógicas en tiempo real.",
          "Genera columnas virtuales calculadas sin ocupar espacio en disco.",
          "Garantiza que los cálculos siempre se hagan sobre los datos más recientes."
        ]
      },
      {
        "title": "Cálculo de incrementos salariales y proyecciones",
        "explanation": "Mira cómo proyectar un aumento salarial del 10% para los empleados sin alterar sus sueldos reales en la base de datos:",
        "codeSnippet": "-- Proyectamos un aumento del 10% con AS salario_proyectado\nSELECT \n    nombre,\n    departamento,\n    salario AS salario_actual,\n    (salario * 1.10) AS salario_proyectado_10_porciento\nFROM empleados\nWHERE departamento = 'Ingeniería';",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------+--------------+----------------+--------------------------------+\n| nombre         | departamento | salario_actual | salario_proyectado_10_porciento |\n+----------------+--------------+----------------+--------------------------------+\n| Carlos Mendoza | Ingeniería   | 3200.0         | 3520.0                         |\n+----------------+--------------+----------------+--------------------------------+\n1 fila devuelta",
        "byteTip": "Multiplicar por 1.10 equivale a sumarle el 10% al monto original de forma directa.",
        "pitfallTip": "No confundas calcular un aumento en SELECT (simulación) con aplicar un aumento real en la tabla (que requeriría UPDATE).",
        "keyPoints": [
          "Las columnas calculadas permiten hacer simulaciones y análisis sin riesgos.",
          "No modifican los datos maestros almacenados en las tablas.",
          "Permiten entregar información formateada lista para pintar en la interfaz."
        ]
      }
    ]
  },
  "sql-u06-l06": {
    "id": "sql-th-u06-l06",
    "lessonId": "sql-u06-l06",
    "pathId": "sql",
    "unitId": 6,
    "levelId": 6,
    "title": "6. DISTINCT",
    "subtitle": "Elimina filas repetidas de los resultados de tus consultas con la palabra clave DISTINCT.",
    "estimatedMinutes": 8,
    "analogy": "Un pase de lista de las ciudades de donde vienen los asistentes a un evento: si 20 personas vienen de \"San José\", la lista no repite \"San José\" veinte veces; simplemente anota \"San José\" una sola vez para saber qué ciudades están representadas.",
    "video": {
      "title": "Consultas Esenciales: SELECT, Columnas, Alias y DISTINCT",
      "channel": "Midudev",
      "duration": "42:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Proyección de datos, expresiones calculadas con AS y eliminación de duplicados."
    },
    "sections": [
      {
        "title": "Eliminación de duplicados con DISTINCT",
        "explanation": "Frecuentemente, al consultar una columna específica de una tabla, te encuentras con muchos valores repetidos:\nPor ejemplo, si consultas los departamentos de una empresa con 1,000 empleados, verás la palabra `\"Informática\"` repetida 300 veces.\n\nPara obtener únicamente los **valores únicos y sin duplicados**, usamos la palabra clave **`DISTINCT`** inmediatamente después de `SELECT`:\n`SELECT DISTINCT departamento FROM empleados;`\n\nSQLite examinará todas las filas devueltas y descartará las copias repetidas, entregándote un catálogo limpio de opciones únicas.",
        "codeSnippet": "-- Sin DISTINCT: vemos departamentos repetidos\nSELECT departamento FROM asignaturas;\n\n-- Con DISTINCT: vemos únicamente los departamentos únicos sin repetir\nSELECT DISTINCT departamento FROM asignaturas;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------------+\n| departamento       |\n+--------------------+\n| Informática        |\n| Matemáticas        |\n| Telecomunicaciones |\n+--------------------+\n3 filas devueltas (duplicados eliminados)",
        "byteTip": "DISTINCT opera sobre todas las columnas que pongas en el SELECT: si pones SELECT DISTINCT pais, ciudad evaluará combinaciones únicas de país y ciudad.",
        "pitfallTip": "No abuses de DISTINCT si no lo necesitas; ordenar y filtrar duplicados consume tiempo de procesamiento en tablas masivas.",
        "keyPoints": [
          "DISTINCT descarta filas duplicadas en el resultado de la consulta.",
          "Se coloca inmediatamente después de la palabra SELECT.",
          "Ideal para poblar menús desplegables (Spinners / Dropdowns) en interfaces móviles."
        ]
      },
      {
        "title": "Catálogo de categorías para filtros de tienda",
        "explanation": "En cualquier app de comercio electrónico, para pintar los botones de filtro de categorías (Hardware, Pantallas, Audio) consultamos las categorías únicas con `DISTINCT`:",
        "codeSnippet": "-- Catálogo único de categorías para poblar los filtros de la app\nSELECT DISTINCT categoria\nFROM productos\nORDER BY categoria ASC;",
        "codeLanguage": "sql",
        "outputSnippet": "+------------+\n| categoria  |\n+------------+\n| Accesorios |\n| Audio      |\n| Hardware   |\n| Pantallas  |\n+------------+\n4 filas devueltas",
        "byteTip": "Combinar DISTINCT con ORDER BY entrega una lista alfabética lista para el usuario.",
        "pitfallTip": "Si una fila tiene NULL en esa columna, DISTINCT lo considerará como un valor único y lo mostrará una vez.",
        "keyPoints": [
          "DISTINCT genera catálogos dinámicos a partir de datos reales.",
          "Se actualiza solo: si mañana insertas un producto de categoría \"Gaming\", aparecerá automáticamente.",
          "Ahorra tener que mantener listas estáticas quemadas en el código de la app."
        ]
      }
    ]
  },
  "sql-u06-l07": {
    "id": "sql-th-u06-l07",
    "lessonId": "sql-u06-l07",
    "pathId": "sql",
    "unitId": 6,
    "levelId": 7,
    "title": "7. Interpretar el resultado de una consulta",
    "subtitle": "Aprende a interpretar los resultados tabulares, contar filas y leer metadatos de tus consultas.",
    "estimatedMinutes": 8,
    "analogy": "Leer el estado de cuenta que te entrega el cajero automático: revisas el encabezado, verificas la cantidad de movimientos registrados y examinas el saldo final impreso al pie de página.",
    "video": {
      "title": "Consultas Esenciales: SELECT, Columnas, Alias y DISTINCT",
      "channel": "Midudev",
      "duration": "42:10",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Proyección de datos, expresiones calculadas con AS y eliminación de duplicados."
    },
    "sections": [
      {
        "title": "Interpretación de resultados tabulares",
        "explanation": "Cuando ejecutas una consulta en SQL, el motor de SQLite te responde con un **conjunto de resultados (*ResultSet*)**:\n\n¿Cómo se compone este resultado?\n1. **Encabezados de columna (*Headers*):** La primera fila con los nombres o alias proyectados en el `SELECT`.\n2. **Filas de datos (*Rows*):** Cada uno de los registros devueltos que coincidieron con los criterios.\n3. **Metadatos de ejecución:**\n   • Cantidad de filas devueltas (*Row count*).\n   • Tiempo de ejecución en milisegundos (*Execution time*).\n\nSi la consulta devuelve **0 filas**, no significa que haya ocurrido un error técnico; simplemente significa que en este momento ningún registro cumple las condiciones que pediste.",
        "codeSnippet": "-- Consultamos empleados con salario superior a $4000 para analizar el resultado\nSELECT id, nombre, departamento, salario\nFROM empleados\nWHERE salario > 4000.0;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+---------------+--------------+---------+\n| id  | nombre        | departamento | salario |\n+-----+---------------+--------------+---------+\n| 104 | Sofía Valerio | Dirección    | 4500.0  |\n+-----+---------------+--------------+---------+\n1 fila devuelta (0.001 seg)",
        "byteTip": "En Android con Room, un ResultSet de 1 fila se puede mapear directamente a un objeto nullable (Empleado?), y uno de muchas filas a List<Empleado>.",
        "pitfallTip": "No confundas \"0 filas devueltas\" (consulta exitosa sin coincidencias) con un error de sintaxis que arroja una excepción.",
        "keyPoints": [
          "El ResultSet organiza la respuesta en encabezados y filas.",
          "El número de filas devueltas confirma el alcance del filtro.",
          "El tiempo de ejecución permite auditar la velocidad de la base de datos."
        ]
      },
      {
        "title": "Verificación del número total de registros",
        "explanation": "Para conocer de inmediato el volumen total de una tabla sin tener que traer todos los registros a la memoria, usamos la función agregada `COUNT(*)`:",
        "codeSnippet": "-- Contamos cuántos estudiantes están registrados en total en la universidad\nSELECT COUNT(*) AS total_estudiantes_registrados\nFROM estudiantes;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------------------------+\n| total_estudiantes_registrados |\n+--------------------------------+\n| 5                              |\n+--------------------------------+\n1 fila devuelta",
        "byteTip": "COUNT(*) es ultra-rápido en SQLite porque lee directamente el contador de páginas del archivo.",
        "pitfallTip": "No uses SELECT * y luego calcules el tamaño en Kotlin con .size si solo querías saber la cantidad; usa COUNT(*) en SQL.",
        "keyPoints": [
          "COUNT(*) devuelve un solo número con la cantidad de filas.",
          "Ahorra memoria y tiempo de transferencia.",
          "Cierra el módulo de consultas básicas dándote control completo sobre la lectura de datos."
        ]
      }
    ]
  }
};
