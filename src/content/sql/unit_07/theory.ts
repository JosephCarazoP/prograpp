import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_07_THEORY: Record<string, TheoryLesson> = {
  "sql-u07-l01": {
    "id": "sql-th-u07-l01",
    "lessonId": "sql-u07-l01",
    "pathId": "sql",
    "unitId": 7,
    "levelId": 1,
    "title": "1. WHERE y comparaciones",
    "subtitle": "Filtra filas con precisión quirúrgica usando la cláusula WHERE y operadores de comparación.",
    "estimatedMinutes": 8,
    "analogy": "Un guardia en la entrada de un club exclusivo: solo deja pasar a las personas que cumplen una condición estricta (\"edad >= 18 años\"). Quienes no cumplen la condición se quedan afuera de la lista.",
    "video": {
      "title": "Filtros con WHERE, Operadores Lógicos, LIKE y ORDER BY",
      "channel": "Fazt Code",
      "duration": "50:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Filtrado exacto con BETWEEN, IN, LIKE con comodines, ordenamiento y límites."
    },
    "sections": [
      {
        "title": "Filtrado de datos con la cláusula WHERE",
        "explanation": "Por defecto, un `SELECT` te devuelve todas las filas que existen en la tabla. Pero en aplicaciones reales casi siempre necesitas ver solo una parte:\n• Los productos de una categoría específica.\n• Los usuarios activos de un país.\n• Las ventas de hoy.\n\nPara filtrar qué filas se incluyen en el resultado, usamos la cláusula **`WHERE`**:\n`SELECT columnas FROM tabla WHERE condicion;`\n\nLa condición se evalúa fila por fila: si es **`true`**, la fila se incluye en el resultado; si es `false`, se descarta.\n\nOperadores de comparación estándar en SQL:\n• `=` (Igual a)\n• `!=` o `<>` (Diferente de)\n• `<`, `<=` (Menor que, menor o igual)\n• `>`, `>=` (Mayor que, mayor o igual)",
        "codeSnippet": "-- Filtramos productos cuyo precio sea menor a $50 dólares\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE precio < 50.0;",
        "codeLanguage": "sql",
        "outputSnippet": "+-----------------+----------+\n| nombre          | promedio |\n+-----------------+----------+\n| Valeria Morales | 9.4      |\n| Camila Gómez    | 9.7      |\n| Lucía Navarro   | 9.1      |\n+-----------------+----------+\n3 rows in set (0.002 sec)",
        "byteTip": "En SQL, la comparación de igualdad usa UN SOLO signo igual (=), a diferencia de Kotlin que usa dos (==).",
        "pitfallTip": "Cuidado con olvidar las comillas simples al comparar textos: WHERE pais = 'Finlandia', no WHERE pais = Finlandia.",
        "keyPoints": [
          "WHERE filtra filas antes de proyectar el resultado en pantalla.",
          "Usa operadores relacionales (=, !=, <, >, <=, >=).",
          "Solo se entregan al usuario las filas donde la condición resulta true."
        ]
      },
      {
        "title": "Búsquedas de texto exacto",
        "explanation": "Para comparar cadenas de texto exactas, escribe el valor entre comillas simples:",
        "codeSnippet": "-- Consultamos los empleados que pertenecen a la división de Dirección\nSELECT id, nombre, salario\nFROM empleados\nWHERE departamento = 'Dirección';",
        "codeLanguage": "sql",
        "outputSnippet": "+-----+---------------+---------+\n| id  | nombre        | salario |\n+-----+---------------+---------+\n| 104 | Sofía Valerio | 4500.0  |\n+-----+---------------+---------+\n1 fila devuelta",
        "byteTip": "En SQLite las comparaciones de texto en columnas estándar con WHERE = son insensibles a mayúsculas para caracteres ASCII comunes.",
        "pitfallTip": "No uses = para comparar nulos; para nulos se usa IS NULL.",
        "keyPoints": [
          "WHERE columna = 'texto' busca coincidencias directas.",
          "Acelera las respuestas al no traer información irrelevante a la app.",
          "Es el filtro más utilizado en pantallas de detalle de registros."
        ]
      }
    ]
  },
  "sql-u07-l02": {
    "id": "sql-th-u07-l02",
    "lessonId": "sql-u07-l02",
    "pathId": "sql",
    "unitId": 7,
    "levelId": 2,
    "title": "2. AND, OR y NOT",
    "subtitle": "Combina múltiples condiciones con los operadores lógicos AND, OR y NOT.",
    "estimatedMinutes": 8,
    "analogy": "Comprar un boleto de cine con descuento: calificas si eres estudiante Y es día miércoles (AND). O calificas si es tu cumpleaños O tienes membresía dorada (OR).",
    "video": {
      "title": "Filtros con WHERE, Operadores Lógicos, LIKE y ORDER BY",
      "channel": "Fazt Code",
      "duration": "50:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Filtrado exacto con BETWEEN, IN, LIKE con comodines, ordenamiento y límites."
    },
    "sections": [
      {
        "title": "Operadores lógicos: AND, OR y NOT en SQL",
        "explanation": "Al igual que en Kotlin, en SQL puedes construir filtros avanzados combinando condiciones con operadores lógicos:\n\n• **`AND`**: Exige que **todas** las condiciones se cumplan simultáneamente.\n• **`OR`**: Exige que **al menos una** de las condiciones se cumpla.\n• **`NOT`**: Invierte la condición (trae las filas que **no** cumplen la regla).",
        "codeSnippet": "-- Filtramos productos que sean de 'Hardware' Y que cuesten menos de $60\nSELECT id, nombre, categoria, precio\nFROM productos\nWHERE categoria = 'Hardware' AND precio < 60.0;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------------+-----------+--------+\n| id | nombre               | categoria | precio |\n+----+----------------------+-----------+--------+\n| 3  | Mouse Ergonómico Pro | Hardware  | 49.9   |\n+----+----------------------+-----------+--------+\n1 fila devuelta",
        "byteTip": "En SQL se escriben las palabras completas AND, OR, NOT en lugar de los símbolos &&, ||, ! de Kotlin.",
        "pitfallTip": "Confundir AND con OR puede hacer que tu consulta devuelva cero filas o que devuelva casi toda la tabla por error.",
        "keyPoints": [
          "AND une condiciones donde ambas deben ser verdaderas.",
          "OR une condiciones alternativas donde basta una verdadera.",
          "NOT excluye los registros que cumplan la condición indicada."
        ]
      },
      {
        "title": "Múltiples categorías con OR",
        "explanation": "Si un usuario selecciona en tu app ver productos de Audio o de Pantallas, usamos `OR`:",
        "codeSnippet": "-- Productos de Audio o Pantallas\nSELECT id, nombre, categoria, precio\nFROM productos\nWHERE categoria = 'Audio' OR categoria = 'Pantallas';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+------------------------------+-----------+--------+\n| id | nombre                       | categoria | precio |\n+----+------------------------------+-----------+--------+\n| 2  | Monitor Ultrawide 34\"        | Pantallas | 429.5  |\n| 4  | Auriculares Cancelación Ruido| Audio     | 129.0  |\n+----+------------------------------+-----------+--------+\n2 filas devueltas",
        "byteTip": "En la lección 5 verás que WHERE categoria IN ('Audio', 'Pantallas') es una forma más corta de escribir múltiples OR.",
        "pitfallTip": "No escribas WHERE categoria = 'Audio' OR 'Pantallas'; debes repetir el nombre de la columna en cada lado del OR.",
        "keyPoints": [
          "OR permite ampliar el rango de resultados coincidentes.",
          "Cada rama del OR debe ser una expresión condicional completa.",
          "Fundamental para filtros de selección múltiple en tiendas móviles."
        ]
      }
    ]
  },
  "sql-u07-l03": {
    "id": "sql-th-u07-l03",
    "lessonId": "sql-u07-l03",
    "pathId": "sql",
    "unitId": 7,
    "levelId": 3,
    "title": "3. Paréntesis en condiciones",
    "subtitle": "Evita ambigüedades lógicas agrupando condiciones complejas con paréntesis obligatorios.",
    "estimatedMinutes": 8,
    "analogy": "En una rifa escolar: \"Ganan premio los alumnos de Quinto grado Y que tengan promedio mayor a 9, O los que sean presidentes de clase\". Sin paréntesis, no sabes si los presidentes deben ser de Quinto grado o pueden ser de cualquier grado.",
    "video": {
      "title": "Filtros con WHERE, Operadores Lógicos, LIKE y ORDER BY",
      "channel": "Fazt Code",
      "duration": "50:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Filtrado exacto con BETWEEN, IN, LIKE con comodines, ordenamiento y límites."
    },
    "sections": [
      {
        "title": "Precedencia lógica y uso de paréntesis en WHERE",
        "explanation": "En SQL, el operador **`AND` tiene mayor precedencia que `OR`** (se evalúa primero, similar a la multiplicación frente a la suma).\n\nSi mezclas `AND` y `OR` en la misma consulta sin paréntesis, el motor podría interpretar algo completamente diferente a lo que tú tenías en mente.\n\n**Regla de oro indiscutible:**\nCuando mezcles `AND` y `OR`, **agrupa siempre con paréntesis `()`** para dejar tu intención clara y explícita tanto para la máquina como para tus compañeros de equipo.",
        "codeSnippet": "-- Agrupamos con paréntesis: (Audio O Hardware) Y con stock disponible mayor a 30\nSELECT id, nombre, categoria, stock\nFROM productos\nWHERE (categoria = 'Audio' OR categoria = 'Hardware') AND stock > 30;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------------+-----------+-------+\n| id | nombre               | categoria | stock |\n+----+----------------------+-----------+-------+\n| 1  | Teclado Mecánico RGB | Hardware  | 45    |\n| 3  | Mouse Ergonómico Pro | Hardware  | 80    |\n+----+----------------------+-----------+-------+\n2 filas devueltas",
        "byteTip": "Los paréntesis fuerzan a que la opción de categorías se resuelva primero, y luego se aplique el filtro de stock.",
        "pitfallTip": "Sin los paréntesis, la consulta buscaría todos los de Audio sin importar su stock, más los de Hardware con stock > 30.",
        "keyPoints": [
          "AND se evalúa antes que OR por orden de precedencia estándar.",
          "Los paréntesis garantizan el orden lógico deseado.",
          "Eliminan ambigüedades en filtros de seguridad y búsqueda avanzada."
        ]
      },
      {
        "title": "Filtros de acceso por país y estado",
        "explanation": "Mira cómo garantizar que solo usuarios activos de ciertos países específicos puedan participar en un concurso:",
        "codeSnippet": "-- Usuarios activos que residen en Reino Unido o Finlandia\nSELECT id, nombre, pais, activo\nFROM usuarios\nWHERE activo = true AND (pais = 'Reino Unido' OR pais = 'Finlandia');",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------+-------------+--------+\n| id | nombre         | pais        | activo |\n+----+----------------+-------------+--------+\n| 1  | Ada Lovelace   | Reino Unido | true   |\n| 2  | Alan Turing    | Reino Unido | true   |\n| 4  | Linus Torvalds | Finlandia   | true   |\n+----+----------------+-------------+--------+\n3 filas devueltas",
        "byteTip": "Colocar activo = true al inicio aclara de inmediato que los inactivos quedan fuera.",
        "pitfallTip": "Verifica siempre que la cantidad de paréntesis de apertura coincida con la de cierre.",
        "keyPoints": [
          "Los paréntesis aíslan subgrupos lógicos de condiciones.",
          "Hacen que las consultas complejas sean fáciles de auditar.",
          "Son una práctica recomendada en cualquier proyecto Android."
        ]
      }
    ]
  },
  "sql-u07-l04": {
    "id": "sql-th-u07-l04",
    "lessonId": "sql-u07-l04",
    "pathId": "sql",
    "unitId": 7,
    "levelId": 4,
    "title": "4. BETWEEN",
    "subtitle": "Filtra intervalos continuos de números y fechas de forma limpia con el operador BETWEEN.",
    "estimatedMinutes": 8,
    "analogy": "Un control de estatura para una atracción de feria: \"Aceptamos personas con estatura ENTRE 1.20 y 1.90 metros\". No tienes que decir \"mayor que 1.20 Y menor que 1.90\"; dices \"entre 1.20 y 1.90\".",
    "video": {
      "title": "Filtros con WHERE, Operadores Lógicos, LIKE y ORDER BY",
      "channel": "Fazt Code",
      "duration": "50:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Filtrado exacto con BETWEEN, IN, LIKE con comodines, ordenamiento y límites."
    },
    "sections": [
      {
        "title": "El operador BETWEEN para rangos continuos",
        "explanation": "Para verificar si un valor se encuentra dentro de un rango cerrado, la forma tradicional requería dos comparaciones unidas por AND:\n`WHERE precio >= 50.0 AND precio <= 150.0`\n\nSQL ofrece el operador **`BETWEEN`** (que en inglés significa \"entre\"):\n`WHERE columna BETWEEN valor_minimo AND valor_maximo;`\n\n• **Es inclusivo:** Incluye tanto el valor mínimo como el máximo en el resultado.\n• Funciona con números enteros, decimales y fechas.\n• También puedes usar **`NOT BETWEEN`** para buscar valores que queden por fuera de ese intervalo.",
        "codeSnippet": "-- Consultamos productos con precios entre $40 y $130 inclusive\nSELECT id, nombre, precio\nFROM productos\nWHERE precio BETWEEN 40.0 AND 130.0\nORDER BY precio ASC;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+------------------------------+--------+\n| id | nombre                       | precio |\n+----+------------------------------+--------+\n| 3  | Mouse Ergonómico Pro         | 49.9   |\n| 1  | Teclado Mecánico RGB         | 89.99  |\n| 4  | Auriculares Cancelación Ruido| 129.0  |\n+----+------------------------------+--------+\n3 filas devueltas",
        "byteTip": "En BETWEEN primero debes escribir el valor menor y luego el mayor (BETWEEN 40 AND 130). Si los inviertes, dará 0 filas.",
        "pitfallTip": "Recuerda que BETWEEN incluye los extremos. Si quieres excluir los límites exactos, usa los operadores estrictos > y <.",
        "keyPoints": [
          "BETWEEN min AND max comprueba rangos inclusivos.",
          "Hace el código mucho más legible y elegante que dos comparaciones con AND.",
          "NOT BETWEEN selecciona lo que esté fuera del intervalo."
        ]
      },
      {
        "title": "Rangos de fechas históricas con BETWEEN",
        "explanation": "El operador `BETWEEN` es la forma estándar de consultar ventas o contrataciones dentro de un año o mes específico:",
        "codeSnippet": "-- Consultamos empleados contratados durante los años 2021 y 2022\nSELECT nombre, fecha_ingreso, departamento\nFROM empleados\nWHERE fecha_ingreso BETWEEN '2021-01-01' AND '2022-12-31';",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------+---------------+--------------+\n| nombre         | fecha_ingreso | departamento |\n+----------------+---------------+--------------+\n| Carlos Mendoza | 2022-03-15    | Ingeniería   |\n| Elena Rostova  | 2021-08-01    | Diseño UX    |\n+----------------+---------------+--------------+\n2 filas devueltas",
        "byteTip": "Al usar fechas en formato ISO \"AAAA-MM-DD\", BETWEEN opera con total precisión cronológica.",
        "pitfallTip": "Si la columna tiene hora (TIMESTAMP), usar \"2022-12-31\" se interpretará como las 00:00:00 de ese día.",
        "keyPoints": [
          "BETWEEN es ideal para reportes contables mensuales y anuales.",
          "Aprovecha los índices de rango del motor SQLite.",
          "Facilita la creación de filtros de fechas en calendarios móviles."
        ]
      }
    ]
  },
  "sql-u07-l05": {
    "id": "sql-th-u07-l05",
    "lessonId": "sql-u07-l05",
    "pathId": "sql",
    "unitId": 7,
    "levelId": 5,
    "title": "5. IN",
    "subtitle": "Comprueba si un valor coincide con cualquiera de una lista de opciones con el operador IN.",
    "estimatedMinutes": 8,
    "analogy": "Una lista de invitados VIP en la puerta de un evento: el portero revisa si tu nombre está DENTRO (IN) de la lista de invitados autorizados. No tiene que hacer una llamada telefónica por cada persona, solo revisa la lista.",
    "video": {
      "title": "Filtros con WHERE, Operadores Lógicos, LIKE y ORDER BY",
      "channel": "Fazt Code",
      "duration": "50:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Filtrado exacto con BETWEEN, IN, LIKE con comodines, ordenamiento y límites."
    },
    "sections": [
      {
        "title": "El operador IN para listas de valores",
        "explanation": "Si necesitas comprobar si una columna coincide con cualquiera de varias opciones válidas, escribir múltiples `OR` se vuelve repetitivo y engorroso:\n`WHERE pais = 'Costa Rica' OR pais = 'México' OR pais = 'España' OR pais = 'Colombia'`\n\nEl operador **`IN`** simplifica esto radicalmente:\n`WHERE columna IN (valor1, valor2, valor3...)`\n\n• Es limpio, compacto y fácil de leer.\n• También puedes usar **`NOT IN`** para excluir una lista entera de opciones.\n• En la Unidad 11 aprenderás que adentro del `IN(...)` puedes meter otra consulta entera (subconsulta).",
        "codeSnippet": "-- Consultamos estudiantes que pertenecen a dos carreras específicas con IN\nSELECT id, nombre, carrera, promedio\nFROM estudiantes\nWHERE carrera IN ('Ingeniería de Software', 'Ciberseguridad');",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+------------------------+----------+\n| id | nombre          | carrera                | promedio |\n+----+-----------------+------------------------+----------+\n| 1  | Valeria Morales | Ingeniería de Software | 9.4      |\n| 4  | Javier Ramos    | Ciberseguridad         | 8.2      |\n| 5  | Lucía Navarro   | Ingeniería de Software | 9.1      |\n+----+-----------------+------------------------+----------+\n3 filas devueltas",
        "byteTip": "En Android con Room, puedes pasar directamente una lista de Kotlin a un IN: WHERE id IN (:listaIds). ¡Room lo hace automático!",
        "pitfallTip": "Cuidado con NOT IN si la lista contiene valores NULL; la lógica de SQL puede hacer que la consulta devuelva cero filas inesperadamente.",
        "keyPoints": [
          "IN (v1, v2, v3) sustituye largas cadenas de condiciones OR.",
          "Acepta números, textos y listas dinámicas.",
          "NOT IN descarta los registros que coincidan con la lista."
        ]
      },
      {
        "title": "Búsqueda de múltiples IDs de productos",
        "explanation": "Cuando el usuario carga su pantalla de favoritos a partir de una lista de identificadores guardados:",
        "codeSnippet": "-- Consultamos productos específicos por sus llaves primarias en una sola consulta\nSELECT id, nombre, precio\nFROM productos\nWHERE id IN (1, 3, 5);",
        "codeLanguage": "sql",
        "outputSnippet": "+----+------------------------+--------+\n| id | nombre                 | precio |\n+----+------------------------+--------+\n| 1  | Teclado Mecánico RGB   | 89.99  |\n| 3  | Mouse Ergonómico Pro   | 49.9   |\n| 5  | Cable HDMI 2.1 Braided | 14.99  |\n+----+------------------------+--------+\n3 filas devueltas",
        "byteTip": "Hacer una sola consulta WHERE id IN (1, 3, 5) es infinitamente más rápido que hacer tres consultas individuales separadas.",
        "pitfallTip": "No uses listas de más de 1000 elementos dentro de un IN en SQLite; divídelas en lotes si son masivas.",
        "keyPoints": [
          "IN recupera múltiples registros clave en una sola ida y vuelta a la base de datos.",
          "Reduce drásticamente la latencia en pantallas móviles.",
          "Se integra de forma nativa con colecciones de Kotlin en Room."
        ]
      }
    ]
  },
  "sql-u07-l06": {
    "id": "sql-th-u07-l06",
    "lessonId": "sql-u07-l06",
    "pathId": "sql",
    "unitId": 7,
    "levelId": 6,
    "title": "6. LIKE con % y _",
    "subtitle": "Busca patrones y coincidencias parciales de texto con LIKE y los comodines % y _.",
    "estimatedMinutes": 8,
    "analogy": "El buscador de tu teléfono: escribes \"mar\" y el sistema te sugiere \"Marcos\", \"María\", \"Maratón\" y \"Gramática\". El comodín % representa \"cualquier texto que siga después\".",
    "video": {
      "title": "Filtros con WHERE, Operadores Lógicos, LIKE y ORDER BY",
      "channel": "Fazt Code",
      "duration": "50:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Filtrado exacto con BETWEEN, IN, LIKE con comodines, ordenamiento y límites."
    },
    "sections": [
      {
        "title": "Búsquedas por patrón con LIKE y comodines",
        "explanation": "El operador `=` solo encuentra textos que sean 100% idénticos. Pero en un buscador de tienda o agenda, el usuario rara vez escribe el nombre completo exacto; escribe un fragmento.\n\nPara búsquedas parciales usamos el operador **`LIKE`** junto con dos **comodines**:\n\n1. **`%` (Porcentaje):** Representa **cero, uno o infinitos caracteres** cualesquiera.\n   • `'And%'`: Empieza con \"And\" (ej: Android, Andrés, Andromeda).\n   • `'%com'`: Termina con \"com\" (ej: dotcom, correo.com).\n   • **`'%palabra%'`**: Contiene \"palabra\" en cualquier parte del texto.\n\n2. **`_` (Guión bajo):** Representa **exactamente un solo carácter** cualquiera.\n   • `'C_sa'`: Coincide con Casa, Cosa, Cisa (4 letras exactas).",
        "codeSnippet": "-- Buscamos productos que contengan la palabra 'Pro' en cualquier parte de su nombre\nSELECT id, nombre, precio\nFROM productos\nWHERE nombre LIKE '%Pro%';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------------+--------+\n| id | nombre               | precio |\n+----+----------------------+--------+\n| 3  | Mouse Ergonómico Pro | 49.9   |\n+----+----------------------+--------+\n1 fila devuelta",
        "byteTip": "En SQLite, LIKE no distingue entre mayúsculas y minúsculas para caracteres comunes en inglés (\"%pro%\" encuentra \"Pro\").",
        "pitfallTip": "Una búsqueda LIKE \"%texto%\" con comodín al principio no puede usar índices tradicionales en tablas con millones de filas.",
        "keyPoints": [
          "LIKE permite realizar búsquedas de texto aproximadas.",
          "% sustituye cualquier cantidad de caracteres.",
          "_ sustituye exactamente un solo carácter."
        ]
      },
      {
        "title": "Filtros de correos y dominios institucionales",
        "explanation": "Mira cómo encontrar a todos los empleados o usuarios que pertenecen a un dominio institucional de gobierno o universidad:",
        "codeSnippet": "-- Buscamos usuarios cuyo correo termine en '.org'\nSELECT id, nombre, email\nFROM usuarios\nWHERE email LIKE '%.org';",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------+--------------------+\n| id | nombre         | email              |\n+----+----------------+--------------------+\n| 1  | Ada Lovelace   | ada@pioneers.org   |\n| 2  | Alan Turing    | alan@bletchley.org |\n| 4  | Linus Torvalds | linus@linux.org    |\n+----+----------------+--------------------+\n3 filas devueltas",
        "byteTip": "LIKE \"%.org\" filtra rápidamente extensiones de correo y protocolos web.",
        "pitfallTip": "Si quieres buscar el símbolo % literal como texto, debes definir un carácter de escape con ESCAPE.",
        "keyPoints": [
          "LIKE es la base de las barras de búsqueda en aplicaciones móviles.",
          "Permite validar extensiones de archivos y formatos de correo.",
          "Se combina fluidamente con AND y OR para filtros avanzados."
        ]
      }
    ]
  },
  "sql-u07-l07": {
    "id": "sql-th-u07-l07",
    "lessonId": "sql-u07-l07",
    "pathId": "sql",
    "unitId": 7,
    "levelId": 7,
    "title": "7. IS NULL e IS NOT NULL",
    "subtitle": "Aprende a consultar y filtrar valores nulos de forma correcta con IS NULL e IS NOT NULL.",
    "estimatedMinutes": 8,
    "analogy": "Un inspector de aduanas que revisa pasaportes: separa los pasaportes que TIENEN sello de visa (IS NOT NULL) de los que NO TIENEN ningún sello estampado en sus hojas (IS NULL).",
    "video": {
      "title": "Filtros con WHERE, Operadores Lógicos, LIKE y ORDER BY",
      "channel": "Fazt Code",
      "duration": "50:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Filtrado exacto con BETWEEN, IN, LIKE con comodines, ordenamiento y límites."
    },
    "sections": [
      {
        "title": "Consultar nulos con IS NULL e IS NOT NULL",
        "explanation": "Como aprendiste en la Unidad 4, el valor `NULL` representa ausencia de dato. En la lógica de SQL, `NULL` no es igual a nada, ni siquiera a otro `NULL`.\n\nPor esta razón matemática:\n✖ `WHERE columna = NULL` **NUNCA funciona** (devuelve cero filas siempre).\n\nLa única forma oficial y correcta de consultar nulos es:\n• **`IS NULL`**: Trae las filas donde esa columna está vacía o sin asignar.\n• **`IS NOT NULL`**: Trae las filas donde la columna tiene algún dato real registrado.",
        "codeSnippet": "-- Consultamos usuarios que SÍ tienen correo electrónico registrado válido\nSELECT id, nombre, email\nFROM usuarios\nWHERE email IS NOT NULL;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-------------------+--------------------+\n| id | nombre            | email              |\n+----+-------------------+--------------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   |\n| 2  | Alan Turing       | alan@bletchley.org |\n| 3  | Grace Hopper      | grace@navy.mil     |\n| 4  | Linus Torvalds    | linus@linux.org    |\n| 5  | Margaret Hamilton | margaret@nasa.gov  |\n+----+-------------------+--------------------+\n5 filas devueltas",
        "byteTip": "IS NULL e IS NOT NULL son palabras clave estándar en todos los motores SQL del mundo.",
        "pitfallTip": "El error más común de principiantes en exámenes de SQL es escribir = NULL en lugar de IS NULL.",
        "keyPoints": [
          "IS NULL comprueba la ausencia de dato de forma segura.",
          "IS NOT NULL comprueba la presencia de un valor real.",
          "Jamás utilices los operadores = o != para comparar contra NULL."
        ]
      },
      {
        "title": "Detectar registros pendientes de asignación",
        "explanation": "En sistemas de entrega o préstamos, los registros con `fecha_entrega IS NULL` representan las órdenes que todavía están en camino:",
        "codeSnippet": "-- Encontrar usuarios activos con datos completos de país\nSELECT id, nombre, pais\nFROM usuarios\nWHERE pais IS NOT NULL AND activo = true;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-------------------+----------------+\n| id | nombre            | pais           |\n+----+-------------------+----------------+\n| 1  | Ada Lovelace      | Reino Unido    |\n| 2  | Alan Turing       | Reino Unido    |\n| 4  | Linus Torvalds    | Finlandia      |\n| 5  | Margaret Hamilton | Estados Unidos |\n+----+-------------------+----------------+\n4 filas devueltas",
        "byteTip": "Filtrar por IS NOT NULL asegura que la pantalla nunca intente renderizar campos vacíos.",
        "pitfallTip": "Recuerda que un texto con espacios \"   \" es NOT NULL; para limpiar espacios usa trim().",
        "keyPoints": [
          "IS NULL modela tareas pendientes y flujos incompletos.",
          "Garantiza que la aplicación reciba datos listos para pintar.",
          "Esencial para auditorías de calidad en bases de datos."
        ]
      }
    ]
  },
  "sql-u07-l08": {
    "id": "sql-th-u07-l08",
    "lessonId": "sql-u07-l08",
    "pathId": "sql",
    "unitId": 7,
    "levelId": 8,
    "title": "8. ORDER BY",
    "subtitle": "Ordena tus resultados de forma ascendente (ASC) o descendente (DESC) con ORDER BY.",
    "estimatedMinutes": 8,
    "analogy": "Ordenar los contactos en tu teléfono: de la A a la Z para buscar un amigo por nombre, o por fecha de la última llamada para ver a quién llamaste recientemente.",
    "video": {
      "title": "Filtros con WHERE, Operadores Lógicos, LIKE y ORDER BY",
      "channel": "Fazt Code",
      "duration": "50:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Filtrado exacto con BETWEEN, IN, LIKE con comodines, ordenamiento y límites."
    },
    "sections": [
      {
        "title": "La cláusula ORDER BY",
        "explanation": "En una base de datos relacional, **el orden de las filas no está garantizado**: SQLite te las entrega en el orden físico en que las encuentra en el disco, a menos que le pidas explícitamente ordenarlas.\n\nPara ordenar los resultados usamos la cláusula **`ORDER BY`** al final de la consulta:\n`SELECT columnas FROM tabla ORDER BY columna_criterio [ASC | DESC];`\n\n• **`ASC` (Ascendente / Predeterminado):**\n  - Números: de menor a mayor (`1, 2, 3...`).\n  - Textos: en orden alfabético (`A -> Z`).\n  - Fechas: de la más antigua a la más reciente.\n• **`DESC` (Descendente):**\n  - Números: de mayor a menor (`10, 9, 8...`).\n  - Textos: en orden alfabético inverso (`Z -> A`).\n  - Fechas: de la más reciente a la más antigua.",
        "codeSnippet": "-- Ordenamos productos del más caro al más barato (DESC)\nSELECT id, nombre, precio\nFROM productos\nORDER BY precio DESC;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+------------------------------+--------+\n| id | nombre                       | precio |\n+----+------------------------------+--------+\n| 2  | Monitor Ultrawide 34\"        | 429.5  |\n| 4  | Auriculares Cancelación Ruido| 129.0  |\n| 1  | Teclado Mecánico RGB         | 89.99  |\n| 3  | Mouse Ergonómico Pro         | 49.9   |\n| 5  | Cable HDMI 2.1 Braided       | 14.99  |\n+----+------------------------------+--------+\n5 filas devueltas",
        "byteTip": "Si no pones nada, SQL asume ASC por defecto. Escribir ORDER BY precio equivale a ORDER BY precio ASC.",
        "pitfallTip": "La cláusula ORDER BY se coloca siempre después del WHERE, nunca antes.",
        "keyPoints": [
          "ORDER BY define el ordenamiento formal de los resultados.",
          "ASC ordena de menor a mayor; DESC ordena de mayor a menor.",
          "Se coloca después del WHERE y antes del LIMIT."
        ]
      },
      {
        "title": "Ordenamiento por múltiples columnas",
        "explanation": "¿Qué pasa si dos empleados pertenecen al mismo departamento? Puedes desempatar ordenando por una segunda columna:",
        "codeSnippet": "-- Ordenamos primero por departamento (A-Z) y luego por salario de mayor a menor\nSELECT nombre, departamento, salario\nFROM empleados\nORDER BY departamento ASC, salario DESC;",
        "codeLanguage": "sql",
        "outputSnippet": "+----------------+--------------+---------+\n| nombre         | departamento | salario |\n+----------------+--------------+---------+\n| Sofía Valerio  | Dirección    | 4500.0  |\n| Elena Rostova  | Diseño UX    | 2850.5  |\n| Carlos Mendoza | Ingeniería   | 3200.0  |\n| Mateo Díaz     | Sistemas     | 3100.0  |\n| Andrés Solano  | Soporte      | 1900.0  |\n+----------------+--------------+---------+\n5 filas devueltas",
        "byteTip": "Puedes ordenar por tantas columnas como quieras separándolas por comas: ORDER BY col1 ASC, col2 DESC.",
        "pitfallTip": "Ordenar por columnas que no tienen índices en tablas de 100,000 filas puede ralentizar la consulta.",
        "keyPoints": [
          "El ordenamiento múltiple desempata coincidencias en la primera columna.",
          "Permite agrupar visualmente datos por categoría y orden secundario.",
          "Es el estándar de oro en listados de tiendas y directorios."
        ]
      }
    ]
  },
  "sql-u07-l09": {
    "id": "sql-th-u07-l09",
    "lessonId": "sql-u07-l09",
    "pathId": "sql",
    "unitId": 7,
    "levelId": 9,
    "title": "9. LIMIT",
    "subtitle": "Pagina tus resultados y limita la cantidad de filas devueltas con LIMIT y OFFSET.",
    "estimatedMinutes": 8,
    "analogy": "La paginación de los resultados de búsqueda de Google: te muestra exactamente los primeros 10 resultados (LIMIT 10). Al hacer clic en \"Página 2\", se salta los 10 primeros (OFFSET 10) y te muestra los siguientes 10.",
    "video": {
      "title": "Filtros con WHERE, Operadores Lógicos, LIKE y ORDER BY",
      "channel": "Fazt Code",
      "duration": "50:30",
      "url": "https://www.youtube.com/watch?v=DFg1V-rO6Pg",
      "summary": "Filtrado exacto con BETWEEN, IN, LIKE con comodines, ordenamiento y límites."
    },
    "sections": [
      {
        "title": "Paginación de resultados con LIMIT y OFFSET",
        "explanation": "Si tu base de datos tiene 50,000 productos, intentar cargarlos todos juntos en una app móvil congelaría la pantalla y consumiría toda la memoria del teléfono.\n\nPara paginar y traer solo una porción controlada, usamos **`LIMIT`** y **`OFFSET`**:\n• **`LIMIT cantidad`**: Número máximo de filas que deseas recibir.\n• **`OFFSET cantidad`**: Cuántas filas iniciales debe **saltarse** la consulta antes de empezar a entregar resultados.\n\nFórmula universal de paginación para páginas de tamaño N:\n• Página 1: `LIMIT N OFFSET 0`\n• Página 2: `LIMIT N OFFSET N`\n• Página 3: `LIMIT N OFFSET (2 * N)`",
        "codeSnippet": "-- Obtenemos los 2 estudiantes con mejor promedio del ranking (Top 2)\nSELECT id, nombre, carrera, promedio\nFROM estudiantes\nORDER BY promedio DESC\nLIMIT 2;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+-----------------+-------------------------+----------+\n| id | nombre          | carrera                 | promedio |\n+----+-----------------+-------------------------+----------+\n| 3  | Camila Gómez    | Sistemas de Información | 9.7      |\n| 1  | Valeria Morales | Ingeniería de Software  | 9.4      |\n+----+-----------------+-------------------------+----------+\n2 filas devueltas",
        "byteTip": "En SQLite también puedes escribir LIMIT 2 OFFSET 4 para saltarte 4 filas y traer las siguientes 2.",
        "pitfallTip": "Usa siempre LIMIT acompañado de un ORDER BY claro; sin ORDER BY, los resultados paginados podrían salir en orden aleatorio en cada llamada.",
        "keyPoints": [
          "LIMIT restringe el número máximo de filas devueltas.",
          "OFFSET define el desplazamiento de inicio para paginación.",
          "Es la técnica obligatoria para implementar scroll infinito en Android."
        ]
      },
      {
        "title": "Segunda página de resultados con OFFSET",
        "explanation": "Mira cómo solicitar la \"segunda página\" de dos productos saltándonos los dos primeros del ranking:",
        "codeSnippet": "-- Página 2: nos saltamos 2 y mostramos los siguientes 2 productos más caros\nSELECT id, nombre, precio\nFROM productos\nORDER BY precio DESC\nLIMIT 2 OFFSET 2;",
        "codeLanguage": "sql",
        "outputSnippet": "+----+----------------------+--------+\n| id | nombre               | precio |\n+----+----------------------+--------+\n| 1  | Teclado Mecánico RGB | 89.99  |\n| 3  | Mouse Ergonómico Pro | 49.9   |\n+----+----------------------+--------+\n2 filas devueltas",
        "byteTip": "La biblioteca oficial Paging 3 de Android Jetpack utiliza exactamente LIMIT y OFFSET por debajo.",
        "pitfallTip": "Valores gigantescos de OFFSET (como OFFSET 1000000) pueden ser lentos porque el motor debe leer y descartar ese millón de filas.",
        "keyPoints": [
          "LIMIT y OFFSET resuelven la paginación fluida en interfaces móviles.",
          "Mantienen el consumo de memoria ligero y constante.",
          "Garantizan tiempos de respuesta instantáneos en la app."
        ]
      }
    ]
  }
};
