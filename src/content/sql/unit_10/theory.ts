import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_10_THEORY: Record<string, TheoryLesson> = {
  "sql-u10-l01": {
    "id": "sql-th-u10-l01",
    "lessonId": "sql-u10-l01",
    "pathId": "sql",
    "unitId": 10,
    "levelId": 1,
    "title": "1. COUNT, SUM, AVG, MIN y MAX",
    "subtitle": "Aprende a resumir miles de filas en una sola métrica utilizando las cinco funciones agregadas esenciales de SQL.",
    "estimatedMinutes": 8,
    "analogy": "La calculadora de una caja registradora al final del día: en lugar de revisar los 500 recibos en papel uno por uno, la máquina te dice la suma total recaudada, el promedio por cliente, el boleto más caro y el más barato.",
    "video": {
      "title": "Agregaciones y Agrupamiento: COUNT, SUM, AVG y GROUP BY",
      "channel": "Midudev",
      "duration": "44:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Cálculo de estadísticas, agrupamiento con GROUP BY y filtros posagregación con HAVING."
    },
    "sections": [
      {
        "title": "Las 5 funciones agregadas esenciales",
        "explanation": "Las funciones agregadas toman múltiples valores de una columna y calculan **un único valor representativo de resumen**:\n\n1. **`COUNT(columna)`**: Cuenta cuántos registros o valores existen.\n2. **`SUM(columna)`**: Suma todos los valores numéricos de la columna.\n3. **`AVG(columna)`**: Calcula la media aritmética o promedio (`SUM / COUNT`).\n4. **`MIN(columna)`**: Encuentra el valor mínimo o más bajo.\n5. **`MAX(columna)`**: Encuentra el valor máximo o más alto.\n\nTodas se colocan dentro de la lista de proyección del `SELECT` y es buena práctica asignarles un alias con `AS` para que el resultado sea fácil de interpretar.",
        "codeSnippet": "-- Resumen estadístico de los salarios de la empresa en una sola consulta\nSELECT \n  COUNT(*) AS total_empleados,\n  MIN(salario) AS salario_minimo,\n  MAX(salario) AS salario_maximo,\n  ROUND(AVG(salario), 2) AS salario_promedio,\n  SUM(salario) AS presupuesto_total_nominas\nFROM empleados;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+----------------+----------------+------------------+---------------------------+\n| total_empleados | salario_minimo | salario_maximo | salario_promedio | presupuesto_total_nominas |\n+-----------------+----------------+----------------+------------------+---------------------------+\n| 5               | 1900.0         | 4500.0         | 3110.1           | 15550.5                   |\n+-----------------+----------------+----------------+------------------+---------------------------+\n1 row in set (0.001 sec)",
        "byteTip": "Usa ROUND(AVG(columna), 2) para limitar los decimales a dos dígitos en montos de dinero o calificaciones.",
        "pitfallTip": "No mezcles funciones agregadas con columnas normales sin usar GROUP BY; arrojará un error o devolverá un valor arbitrario.",
        "keyPoints": [
          "COUNT, SUM, AVG, MIN y MAX procesan múltiples filas y devuelven un solo resultado.",
          "Permiten calcular métricas clave de negocio al instante.",
          "Siempre asigna un alias con AS para que el encabezado del resultado sea claro."
        ]
      },
      {
        "title": "Tableros de control (Dashboards) en aplicaciones móviles",
        "explanation": "En cualquier app de finanzas, ventas o productividad, la pantalla principal muestra tarjetas de resumen (*KPIs*): \"Gasto mensual\", \"Promedio de calorías\", \"Ventas del día\".\nTodas esas tarjetas se alimentan directamente de consultas SQL que ejecutan funciones agregadas en la base de datos SQLite local:",
        "codeSnippet": "-- Métricas del inventario de productos en venta\nSELECT \n  COUNT(*) AS variedad_productos,\n  SUM(stock) AS unidades_totales,\n  MIN(precio) AS producto_mas_barato,\n  MAX(precio) AS producto_mas_caro\nFROM productos;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------------+------------------+---------------------+-------------------+\n| variedad_productos | unidades_totales | producto_mas_barato | producto_mas_caro |\n+--------------------+------------------+---------------------+-------------------+\n| 5                  | 312              | 14.99               | 429.50            |\n+--------------------+------------------+---------------------+-------------------+\n1 row in set (0.001 sec)",
        "byteTip": "Calcular agregaciones en SQLite es cientos de veces más rápido y consume mucha menos batería que cargar miles de objetos en Kotlin y calcular el promedio con un bucle for.",
        "pitfallTip": "SUM y AVG solo funcionan sobre columnas numéricas (INTEGER o REAL); usarlas sobre TEXT puede dar 0 o error.",
        "keyPoints": [
          "Las agregaciones potencian los tableros de mando e interfaces de usuario.",
          "Delegar el cálculo al motor de base de datos ahorra memoria RAM y batería.",
          "Forman parte fundamental de cualquier aplicación orientada a datos."
        ]
      }
    ]
  },
  "sql-u10-l02": {
    "id": "sql-th-u10-l02",
    "lessonId": "sql-u10-l02",
    "pathId": "sql",
    "unitId": 10,
    "levelId": 2,
    "title": "2. COUNT(*) frente a COUNT(columna)",
    "subtitle": "Comprende la diferencia fundamental entre contar todas las filas físicas y contar únicamente valores no nulos.",
    "estimatedMinutes": 8,
    "analogy": "Pasar lista en un salón: COUNT(*) cuenta cuántas sillas ocupadas hay en el aula. COUNT(telefono) cuenta cuántos de esos alumnos tienen un teléfono registrado en su ficha escolar.",
    "video": {
      "title": "Agregaciones y Agrupamiento: COUNT, SUM, AVG y GROUP BY",
      "channel": "Midudev",
      "duration": "44:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Cálculo de estadísticas, agrupamiento con GROUP BY y filtros posagregación con HAVING."
    },
    "sections": [
      {
        "title": "Filas totales frente a valores presentes",
        "explanation": "Aunque a primera vista parecen iguales, **`COUNT(*)`** y **`COUNT(columna)`** tienen comportamientos muy distintos cuando existen valores nulos (`NULL`):\n\n1. **`COUNT(*)`**:\n• Cuenta el **número total de filas** que cumplen la condición, sin importar qué valores contengan sus columnas.\n• Aunque todas las columnas de una fila sean `NULL`, esa fila se cuenta.\n• Es la forma estándar y más rápida de conocer el tamaño de una tabla.\n\n2. **`COUNT(nombre_columna)`**:\n• Cuenta únicamente las filas donde esa columna específica **no es `NULL`**.\n• Si una fila tiene `NULL` en esa columna, es ignorada por el conteo.",
        "codeSnippet": "-- Comparamos el conteo total frente al conteo de una columna específica\nSELECT \n  COUNT(*) AS total_usuarios,\n  COUNT(email) AS usuarios_con_email\nFROM usuarios;",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------+--------------------+\n| total_usuarios | usuarios_con_email |\n+----------------+--------------------+\n| 5              | 5                  |\n+----------------+--------------------+\n1 row in set (0.001 sec)",
        "byteTip": "Si solo quieres saber cuántas filas hay en una tabla o resultado, escribe siempre COUNT(*); SQLite lo optimiza leyendo los metadatos de almacenamiento.",
        "pitfallTip": "No uses COUNT(id) creyendo que es más rápido que COUNT(*); en los motores modernos COUNT(*) es igual de rápido o superior.",
        "keyPoints": [
          "COUNT(*) cuenta filas totales sin importar valores nulos.",
          "COUNT(columna) cuenta únicamente celdas con valores no nulos.",
          "La diferencia entre ambos números revela cuántos registros tienen campos vacíos."
        ]
      },
      {
        "title": "Auditoría de consistencia de datos",
        "explanation": "Restar `COUNT(*)` y `COUNT(columna)` te da exactamente cuántos registros tienen información incompleta o pendiente de completar:",
        "codeSnippet": "-- Verificamos cuántos estudiantes tienen calificaciones registradas en el periodo\nSELECT \n  COUNT(*) AS total_matriculas,\n  COUNT(nota_final) AS matriculas_evaluadas,\n  COUNT(*) - COUNT(nota_final) AS evaluaciones_pendientes\nFROM matriculas;",
        "codeLanguage": "sql",
        "outputSnippet": "+------------------+----------------------+-------------------------+\n| total_matriculas | matriculas_evaluadas | evaluaciones_pendientes |\n+------------------+----------------------+-------------------------+\n| 7                | 7                    | 0                       |\n+------------------+----------------------+-------------------------+\n1 row in set (0.001 sec)",
        "byteTip": "En Room, puedes verificar la integridad de una migración de esquema ejecutando este tipo de conteos automáticos.",
        "pitfallTip": "Cuidado al contar cadenas vacías: una cadena vacía \"\" NO es NULL y sí se contará con COUNT(columna).",
        "keyPoints": [
          "Comparar conteos permite auditar la calidad de la información.",
          "Detecta valores incompletos sin necesidad de escribir cláusulas complejas.",
          "Es un patrón estándar en auditorías de bases de datos."
        ]
      }
    ]
  },
  "sql-u10-l03": {
    "id": "sql-th-u10-l03",
    "lessonId": "sql-u10-l03",
    "pathId": "sql",
    "unitId": 10,
    "levelId": 3,
    "title": "3. NULL en las agregaciones",
    "subtitle": "Aprende cómo las funciones agregadas tratan los valores nulos y cómo evitar errores en promedios y sumas.",
    "estimatedMinutes": 8,
    "analogy": "Calcular el promedio de una prueba entre 4 estudiantes, pero 1 faltó por enfermedad: ¿divides la suma de notas entre 4 o entre 3? SQL ignora automáticamente al que faltó y divide solo entre los 3 presentes.",
    "video": {
      "title": "Agregaciones y Agrupamiento: COUNT, SUM, AVG y GROUP BY",
      "channel": "Midudev",
      "duration": "44:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Cálculo de estadísticas, agrupamiento con GROUP BY y filtros posagregación con HAVING."
    },
    "sections": [
      {
        "title": "El comportamiento silencioso de NULL en las funciones agregadas",
        "explanation": "En SQL, todas las funciones agregadas numéricas (**`SUM`**, **`AVG`**, **`MIN`**, **`MAX`**) **ignoran por completo los valores `NULL`**.\n\n¿Qué impacto tiene esto en el promedio (`AVG`)?\nImagina 4 ventas: `[100, 200, NULL, 300]`:\n• La suma es: `100 + 200 + 300 = 600`.\n• `AVG` divide `600` entre **3** (los valores no nulos), dando un promedio de **`200.0`**.\n• No divide entre 4. Si quisieras que el `NULL` cuente como cero, el promedio sería `600 / 4 = 150.0`.\n\nPara controlar si un nulo debe contar como cero, usamos la función **`COALESCE(columna, 0)`**.",
        "codeSnippet": "-- Demostramos el cálculo de promedio en calificaciones\nSELECT \n  AVG(promedio) AS promedio_estudiantes,\n  ROUND(AVG(promedio), 2) AS promedio_redondeado\nFROM estudiantes;",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------------+---------------------+\n| promedio_estudiantes | promedio_redondeado |\n+----------------------+---------------------+\n| 9.040000000000001    | 9.04                |\n+----------------------+---------------------+\n1 row in set (0.001 sec)",
        "byteTip": "COALESCE(salario, 0) reemplaza cualquier NULL por cero antes de que la función matemática procese el número.",
        "pitfallTip": "Si todas las filas evaluadas tienen NULL, SUM y AVG devolverán NULL, no cero.",
        "keyPoints": [
          "SUM, AVG, MIN y MAX ignoran los valores NULL automáticamente.",
          "AVG solo divide entre la cantidad de filas que realmente tenían un número.",
          "COALESCE permite forzar que los nulos se traten como cero si el caso de negocio lo exige."
        ]
      },
      {
        "title": "Manejo defensivo de agregaciones vacías en Kotlin",
        "explanation": "En Kotlin y Android, cuando consultas una suma o promedio sobre una tabla vacía, SQLite devuelve `NULL`. Si tu función de Room espera un `Double` primitivo no nulo, la app lanzará una excepción:\n`NullPointerException: Attempt to invoke virtual method on a null object`\n\nPara solucionarlo, manejamos el tipo como nullable (`Double?`) o usamos `COALESCE(SUM(precio), 0)` en el SQL:",
        "codeSnippet": "-- Agregación defensiva que garantiza devolver siempre un número, nunca NULL\nSELECT COALESCE(SUM(precio), 0.0) AS total_inventario\nFROM productos\nWHERE categoria = 'Inexistente';",
        "codeLanguage": "sql",
        "outputSnippet": "+------------------+\n| total_inventario |\n+------------------+\n| 0.0              |\n+------------------+\n1 row in set (0.001 sec)",
        "byteTip": "En Room con Kotlin, escribir @Query(\"SELECT COALESCE(SUM(monto), 0.0) FROM transacciones\") permite que tu función devuelva un Double seguro sin signo de interrogación.",
        "pitfallTip": "No asumas que SUM devuelve 0 cuando la tabla está vacía; por estándar SQL devuelve NULL.",
        "keyPoints": [
          "Las agregaciones sobre cero filas coincidentes devuelven NULL.",
          "COALESCE convierte ese NULL en un valor predeterminado seguro como 0 o 0.0.",
          "Previene excepciones NullPointerException en el código de tu aplicación Kotlin."
        ]
      }
    ]
  },
  "sql-u10-l04": {
    "id": "sql-th-u10-l04",
    "lessonId": "sql-u10-l04",
    "pathId": "sql",
    "unitId": 10,
    "levelId": 4,
    "title": "4. GROUP BY",
    "subtitle": "Aprende a dividir tus datos en grupos para calcular métricas independientes por cada categoría con GROUP BY.",
    "estimatedMinutes": 8,
    "analogy": "Un banco que separa las monedas en bolsas distintas: una bolsa para monedas de $1, otra para las de $5 y otra para las de $10. Luego cuenta cuánto dinero hay dentro de cada bolsa por separado.",
    "video": {
      "title": "Agregaciones y Agrupamiento: COUNT, SUM, AVG y GROUP BY",
      "channel": "Midudev",
      "duration": "44:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Cálculo de estadísticas, agrupamiento con GROUP BY y filtros posagregación con HAVING."
    },
    "sections": [
      {
        "title": "Clasificar y resumir por categorías con GROUP BY",
        "explanation": "Hasta ahora, `AVG` o `COUNT` calculaban una sola cifra para toda la tabla. Pero en el mundo real casi siempre necesitas métricas desglosadas:\n• El salario promedio **por departamento**.\n• El total de ventas **por país**.\n• La cantidad de productos **por categoría**.\n\nLa cláusula **`GROUP BY`** toma las filas de la tabla y las separa en pequeños grupos según los valores de una columna. Luego, las funciones agregadas se ejecutan de forma independiente para cada uno de esos grupos.\n\nSintaxis:\n`SELECT categoria, COUNT(*), AVG(precio)`\n`FROM productos`\n`GROUP BY categoria;`",
        "codeSnippet": "-- Calculamos estadísticas de inventario agrupadas por categoría\nSELECT \n  categoria,\n  COUNT(*) AS total_modelos,\n  SUM(stock) AS unidades_en_bodega,\n  ROUND(AVG(precio), 2) AS precio_promedio\nFROM productos\nGROUP BY categoria\nORDER BY unidades_en_bodega DESC;",
        "codeLanguage": "sql",
        "outputSnippet": "+------------+---------------+--------------------+-----------------+\n| categoria  | total_modelos | unidades_en_bodega | precio_promedio |\n+------------+---------------+--------------------+-----------------+\n| Accesorios | 1             | 150                | 14.99           |\n| Hardware   | 2             | 125                | 69.95           |\n| Audio      | 1             | 25                 | 129.00          |\n| Pantallas  | 1             | 12                 | 429.50          |\n+------------+---------------+--------------------+-----------------+\n4 rows in set (0.002 sec)",
        "byteTip": "En SQLite, puedes agrupar por más de una columna: GROUP BY pais, ciudad agrupa primero por país y luego por ciudad dentro de cada país.",
        "pitfallTip": "Regla de oro: cualquier columna en el SELECT que no esté dentro de una función agregada DEBE estar listada en el GROUP BY.",
        "keyPoints": [
          "GROUP BY divide la tabla en subgrupos basados en valores comunes.",
          "Las funciones agregadas se calculan por separado para cada subgrupo.",
          "Permite generar tablas dinámicas y gráficos de barras en aplicaciones móviles."
        ]
      },
      {
        "title": "Casos prácticos: Estadísticas de personal y educación",
        "explanation": "Veamos cómo una empresa analiza su nómina por departamento. Con una sola instrucción `GROUP BY`, la dirección sabe exactamente cuánto invierte en cada área:",
        "codeSnippet": "-- Resumen salarial agrupado por departamento\nSELECT \n  departamento,\n  COUNT(*) AS cantidad_empleados,\n  ROUND(AVG(salario), 2) AS salario_medio,\n  MAX(salario) AS salario_tope\nFROM empleados\nGROUP BY departamento\nORDER BY salario_medio DESC;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------+--------------------+---------------+--------------+\n| departamento | cantidad_empleados | salario_medio | salario_tope |\n+--------------+--------------------+---------------+--------------+\n| Dirección    | 1                  | 4500.00       | 4500.00      |\n| Ingeniería   | 1                  | 3200.00       | 3200.00      |\n| Sistemas     | 1                  | 3100.00       | 3100.00      |\n| Diseño UX    | 1                  | 2850.50       | 2850.50      |\n| Soporte      | 1                  | 1900.00       | 1900.00      |\n+--------------+--------------------+---------------+--------------+\n5 rows in set (0.002 sec)",
        "byteTip": "Combina siempre GROUP BY con ORDER BY para que el reporte salga ordenado de mayor a menor valor de interés.",
        "pitfallTip": "No uses GROUP BY si no vas a usar ninguna función agregada; para eliminar duplicados simples usa DISTINCT.",
        "keyPoints": [
          "Permite comparar el rendimiento relativo entre distintos departamentos.",
          "El resultado contiene exactamente una fila por cada grupo encontrado.",
          "Es la base del análisis de datos empresarial (Business Intelligence)."
        ]
      }
    ]
  },
  "sql-u10-l05": {
    "id": "sql-th-u10-l05",
    "lessonId": "sql-u10-l05",
    "pathId": "sql",
    "unitId": 10,
    "levelId": 5,
    "title": "5. HAVING",
    "subtitle": "Aprende a filtrar grupos enteros utilizando la cláusula HAVING cuando necesitas condiciones sobre valores agregados.",
    "estimatedMinutes": 8,
    "analogy": "Un filtro en aduana para contenedores: WHERE revisa los paquetes individuales antes de armar el contenedor. HAVING pesa el contenedor completo ya sellado y solo deja pasar a los que pesen más de 5 toneladas.",
    "video": {
      "title": "Agregaciones y Agrupamiento: COUNT, SUM, AVG y GROUP BY",
      "channel": "Midudev",
      "duration": "44:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Cálculo de estadísticas, agrupamiento con GROUP BY y filtros posagregación con HAVING."
    },
    "sections": [
      {
        "title": "Filtrar grupos calculados con HAVING",
        "explanation": "¿Qué pasa si solo quieres ver los departamentos donde el salario promedio sea **mayor a $3,000**?\nSi intentas escribir esto en el `WHERE`:\n`WHERE AVG(salario) > 3000`\nLa base de datos arrojará un error:\n`ERROR: Misuse of aggregate function AVG() in WHERE clause`\n\n¿Por qué ocurre este error?\nPorque el `WHERE` se ejecuta **antes** de que los grupos se formen; en ese momento el promedio aún no existe.\n\nPara filtrar **después** de que los grupos han sido calculados, SQL inventó la cláusula **`HAVING`**:\n`SELECT departamento, AVG(salario)`\n`FROM empleados`\n`GROUP BY departamento`\n`HAVING AVG(salario) > 3000;`",
        "codeSnippet": "-- Filtramos departamentos cuyo salario promedio supera los 3000\nSELECT \n  departamento,\n  COUNT(*) AS empleados,\n  ROUND(AVG(salario), 2) AS salario_promedio\nFROM empleados\nGROUP BY departamento\nHAVING AVG(salario) > 3000\nORDER BY salario_promedio DESC;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------+-----------+------------------+\n| departamento | empleados | salario_promedio |\n+--------------+-----------+------------------+\n| Dirección    | 1         | 4500.0           |\n| Ingeniería   | 1         | 3200.0           |\n| Sistemas     | 1         | 3100.0           |\n+--------------+-----------+------------------+\n3 rows in set (0.002 sec)",
        "byteTip": "Puedes usar el alias de columna asignado con AS directamente dentro del HAVING en SQLite (ej. HAVING salario_promedio > 3000).",
        "pitfallTip": "Nunca intentes usar funciones agregadas en el WHERE; el compilador de SQL siempre las rechazará.",
        "keyPoints": [
          "HAVING filtra grupos calculados después del GROUP BY.",
          "Acepta funciones agregadas como COUNT, SUM o AVG en sus condiciones.",
          "Permite descartar grupos pequeños o irrelevantes del resultado."
        ]
      },
      {
        "title": "Identificar grupos con múltiples elementos (HAVING COUNT > 1)",
        "explanation": "Uno de los usos más habituales de `HAVING` es detectar duplicados o grupos que superan cierto umbral de frecuencia. Por ejemplo, encontrar qué carreras tienen más de un estudiante o qué clientes tienen más de 3 compras:",
        "codeSnippet": "-- Buscamos carreras universitarias que tengan más de 1 estudiante matriculado\nSELECT \n  carrera,\n  COUNT(*) AS total_inscritos,\n  ROUND(AVG(promedio), 2) AS promedio_carrera\nFROM estudiantes\nGROUP BY carrera\nHAVING COUNT(*) > 1;",
        "codeLanguage": "sql",
        "outputSnippet": "+------------------------+-----------------+------------------+\n| carrera                | total_inscritos | promedio_carrera |\n+------------------------+-----------------+------------------+\n| Ingeniería de Software | 2               | 9.25             |\n+------------------------+-----------------+------------------+\n1 row in set (0.002 sec)",
        "byteTip": "En Room, esta consulta permite crear alertas como: \"Clientes frecuentes (más de 5 pedidos este mes)\".",
        "pitfallTip": "No uses HAVING para condiciones sobre columnas simples que no sean agregadas; esas deben ir en el WHERE para ahorrar memoria.",
        "keyPoints": [
          "HAVING COUNT(*) > 1 es el método clásico para encontrar valores repetidos.",
          "Filtra en base al volumen total del grupo.",
          "Es indispensable para control de calidad y reportes de alta frecuencia."
        ]
      }
    ]
  },
  "sql-u10-l06": {
    "id": "sql-th-u10-l06",
    "lessonId": "sql-u10-l06",
    "pathId": "sql",
    "unitId": 10,
    "levelId": 6,
    "title": "6. Diferencia entre WHERE y HAVING",
    "subtitle": "Comprende el ciclo de ejecución de una consulta SQL para dominar la diferencia exacta entre WHERE y HAVING.",
    "estimatedMinutes": 8,
    "analogy": "Un embudo con dos filtros: el primer filtro (WHERE) saca las piedras grandes antes de licuar la fruta. El segundo filtro (HAVING) cuela la mezcla final después de licuar para eliminar grumos de pulpa.",
    "video": {
      "title": "Agregaciones y Agrupamiento: COUNT, SUM, AVG y GROUP BY",
      "channel": "Midudev",
      "duration": "44:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Cálculo de estadísticas, agrupamiento con GROUP BY y filtros posagregación con HAVING."
    },
    "sections": [
      {
        "title": "El orden de ejecución de una consulta SQL",
        "explanation": "Aunque en el código escribes `SELECT` al principio, el motor de base de datos ejecuta las cláusulas en un orden completamente diferente:\n\n1. **`FROM` & `JOIN`**: Identifica las tablas y las une.\n2. **`WHERE`**: Filtra **filas individuales** antes de agrupar.\n3. **`GROUP BY`**: Agrupa las filas restantes en categorías.\n4. **`HAVING`**: Filtra **grupos completos** basándose en cálculos agregados.\n5. **`SELECT`**: Proyecta las columnas finales y resuelve los alias.\n6. **`ORDER BY`**: Ordena las filas del resultado.\n7. **`LIMIT`**: Corta la cantidad de filas que se enviarán a la app.\n\nEsta secuencia explica por qué `WHERE` no puede ver las funciones de grupo (aún no se han agrupado), mientras que `HAVING` sí puede.",
        "codeSnippet": "-- Demostración combinada: WHERE filtra activos, HAVING filtra por volumen\nSELECT \n  departamento,\n  COUNT(*) AS empleados_activos,\n  ROUND(AVG(salario), 2) AS salario_medio\nFROM empleados\nWHERE activo = true\nGROUP BY departamento\nHAVING AVG(salario) >= 3000\nORDER BY salario_medio DESC;",
        "codeLanguage": "sql",
        "outputSnippet": "+--------------+-------------------+---------------+\n| departamento | empleados_activos | salario_medio |\n+--------------+-------------------+---------------+\n| Dirección    | 1                 | 4500.0        |\n| Ingeniería   | 1                 | 3200.0        |\n| Sistemas     | 1                 | 3100.0        |\n+--------------+-------------------+---------------+\n3 rows in set (0.002 sec)",
        "byteTip": "Aprenderte de memoria el orden de ejecución (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT) te convertirá en un desarrollador senior en bases de datos.",
        "pitfallTip": "Filtrar en HAVING lo que podrías filtrar en WHERE es un grave error de rendimiento: haces que el motor trabaje de más agrupando filas innecesarias.",
        "keyPoints": [
          "WHERE descarta filas antes de que ocurra la agrupación.",
          "HAVING descarta grupos después de que se han calculado las métricas.",
          "Combinar ambos correctamente optimiza la velocidad de la consulta."
        ]
      },
      {
        "title": "Regla de optimización: Filtra siempre lo más temprano posible",
        "explanation": "Si una condición no depende de una función agregada (por ejemplo, `activo = true` o `fecha >= '2024-01-01'`), **debe ir siempre en el `WHERE`**.\n\n¿Por qué?\nPorque si filtras primero en el `WHERE`, el motor agrupa sobre 50 filas en lugar de 10,000. Eso reduce el uso de memoria RAM y CPU en el teléfono móvil:",
        "codeSnippet": "-- Eficiencia pura: filtramos primero los semestres avanzados en WHERE\nSELECT \n  carrera,\n  COUNT(*) AS estudiantes_avanzados,\n  ROUND(AVG(promedio), 2) AS promedio_grupo\nFROM estudiantes\nWHERE semestre >= 4\nGROUP BY carrera\nHAVING AVG(promedio) >= 8.5;",
        "codeLanguage": "sql",
        "outputSnippet": "+------------------------+-----------------------+----------------+\n| carrera                | estudiantes_avanzados | promedio_grupo |\n+------------------------+-----------------------+----------------+\n| Ingeniería de Software | 1                     | 9.4            |\n| Ciencias Computación   | 1                     | 8.8            |\n+------------------------+-----------------------+----------------+\n2 rows in set (0.001 sec)",
        "byteTip": "En SQLite para Android, un WHERE que usa índices evita por completo lecturas de disco innecesarias.",
        "pitfallTip": "No uses HAVING pais = \"México\"; usa WHERE pais = \"México\" para no desperdiciar recursos del sistema.",
        "keyPoints": [
          "Filtrar en WHERE reduce drásticamente el conjunto de datos a procesar.",
          "HAVING debe reservarse exclusivamente para condiciones sobre funciones agregadas.",
          "Esta distinción es una pregunta clásica en entrevistas técnicas de desarrollo."
        ]
      }
    ]
  },
  "sql-u10-l07": {
    "id": "sql-th-u10-l07",
    "lessonId": "sql-u10-l07",
    "pathId": "sql",
    "unitId": 10,
    "levelId": 7,
    "title": "7. Agrupaciones con JOIN",
    "subtitle": "Combina el poder de los JOINs con GROUP BY para generar reportes analíticos multidimensionales de alto nivel.",
    "estimatedMinutes": 8,
    "analogy": "Un informe contable escolar: unes la lista de materias con la lista de matrículas para saber cuántos alumnos tiene cada profesor y cuál es el promedio general de cada materia.",
    "video": {
      "title": "Agregaciones y Agrupamiento: COUNT, SUM, AVG y GROUP BY",
      "channel": "Midudev",
      "duration": "44:20",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Cálculo de estadísticas, agrupamiento con GROUP BY y filtros posagregación con HAVING."
    },
    "sections": [
      {
        "title": "La cúspide de las consultas analíticas: Relacionar y resumir",
        "explanation": "La combinación de **`JOIN`** y **`GROUP BY`** es una de las habilidades más valiosas en el desarrollo de software. Te permite tomar datos dispersos en varias tablas, vincularlos mediante llaves foráneas y resumirlos en estadísticas claras.\n\nPasos de la operación:\n1. Con `FROM` y `JOIN`, creas la tabla combinada con todos los datos.\n2. Con `GROUP BY`, agrupas por la entidad principal (por ejemplo, el nombre de la asignatura).\n3. Con las funciones agregadas, calculas el total de inscritos, la nota más alta y el promedio de cada grupo.",
        "codeSnippet": "-- Reporte de rendimiento por asignatura uniendo asignaturas y matriculas\nSELECT \n  a.nombre AS asignatura,\n  a.departamento,\n  COUNT(m.id) AS total_alumnos,\n  ROUND(AVG(m.nota_final), 2) AS promedio_materia,\n  MAX(m.nota_final) AS calificacion_maxima\nFROM asignaturas AS a\nJOIN matriculas AS m ON a.id = m.asignatura_id\nGROUP BY a.id, a.nombre, a.departamento\nORDER BY promedio_materia DESC;",
        "codeLanguage": "sql",
        "outputSnippet": "+---------------------+----------------+---------------+------------------+---------------------+\n| asignatura          | departamento   | total_alumnos | promedio_materia | calificacion_maxima |\n+---------------------+----------------+---------------+------------------+---------------------+\n| Bases de Datos I    | Informática    | 3             | 9.33             | 9.8                 |\n| Programación Kotlin | Informática    | 2             | 9.10             | 9.2                 |\n| Estructuras Datos   | Informática    | 1             | 8.90             | 8.9                 |\n| Cálculo Diferencial | Matemáticas    | 1             | 8.00             | 8.0                 |\n+---------------------+----------------+---------------+------------------+---------------------+\n4 rows in set (0.002 sec)",
        "byteTip": "Agrupar por la llave primaria a.id asegura que dos materias con el mismo nombre en departamentos distintos no se mezclen por accidente.",
        "pitfallTip": "Si usas LEFT JOIN para incluir materias sin alumnos, usa COUNT(m.id) en vez de COUNT(*); de lo contrario las materias vacías mostrarán 1 alumno en vez de 0.",
        "keyPoints": [
          "JOIN + GROUP BY conecta entidades y calcula métricas consolidadas.",
          "Permite responder preguntas complejas de negocio en una sola consulta.",
          "Es el estándar de la industria para generar reportes analíticos."
        ]
      },
      {
        "title": "Reporte de clientes y volumen de compras",
        "explanation": "Veamos el mismo patrón aplicado a compras y usuarios: conectamos los clientes con sus pedidos para saber quién es nuestro mejor comprador:",
        "codeSnippet": "-- Reporte de clientes ordenado por volumen de dinero gastado\nSELECT \n  u.nombre AS cliente,\n  u.pais,\n  COUNT(p.id) AS total_pedidos,\n  ROUND(SUM(p.total), 2) AS total_gastado\nFROM usuarios AS u\nJOIN pedidos AS p ON u.id = p.cliente_id\nGROUP BY u.id, u.nombre, u.pais\nORDER BY total_gastado DESC;",
        "codeLanguage": "sql",
        "outputSnippet": "+-------------------+----------------+---------------+---------------+\n| cliente           | pais           | total_pedidos | total_gastado |\n+-------------------+----------------+---------------+---------------+\n| Grace Hopper      | Estados Unidos | 1             | 429.50        |\n| Linus Torvalds    | Finlandia      | 1             | 178.90        |\n| Ada Lovelace      | Reino Unido    | 1             | 139.89        |\n| Alan Turing       | Reino Unido    | 1             | 89.99         |\n| Margaret Hamilton | Estados Unidos | 1             | 14.99         |\n+-------------------+----------------+---------------+---------------+\n5 rows in set (0.002 sec)",
        "byteTip": "En Room con Kotlin Coroutines, este reporte analítico se ejecuta en background y se expone a la UI mediante un Flow<List<ClienteResumen>>.",
        "pitfallTip": "Evita calcular sumas o promedios en bucles de código de la app cuando SQL puede entregarte el resultado ya consolidado en microsegundos.",
        "keyPoints": [
          "El motor de base de datos está optimizado para consolidar datos masivos.",
          "Unir y agrupar en una sola sentencia reduce el tráfico entre SQLite y la aplicación.",
          "Con esto dominas las consultas de agregación más potentes del lenguaje SQL."
        ]
      }
    ]
  }
};
