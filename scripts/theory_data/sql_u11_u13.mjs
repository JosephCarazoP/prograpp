// Módulo de teoría enriquecida para SQL: Unidades 11, 12 y 13
// Redactado en español latinoamericano (es-419) con tono claro, amigable y pedagógico
// Siguiendo los estándares oficiales de Android Developers (SQLite y Room)

export const SQL_THEORY_U11_U13 = {
  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 11: FUNCIONES NATIVAS Y SUBCONSULTAS
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u11-l01': {
    subtitle: 'Aprende a transformar, limpiar y medir cadenas de texto directamente en tus consultas con LENGTH, TRIM, UPPER y LOWER.',
    analogy: 'Un filtro corrector automático al escanear credenciales: quita los espacios sobrantes de los lados, convierte el nombre a mayúsculas para imprimirlo en el gafete y mide cuántas letras tiene.',
    sections: [
      {
        title: 'Funciones de manipulación de texto en SQLite',
        explanation: `En aplicaciones reales, los usuarios escriben datos con errores de formato: nombres en minúsculas, espacios accidentales al inicio o al final, o combinaciones caprichosas de mayúsculas y minúsculas.

SQLite proporciona funciones nativas para normalizar texto en la proyección:
1. **\`UPPER(texto)\`**: Convierte todos los caracteres a mayúsculas (\`'valeria' -> 'VALERIA'\`).
2. **\`LOWER(texto)\`**: Convierte todos los caracteres a minúsculas (\`'INGENIERÍA' -> 'ingeniería'\`).
3. **\`TRIM(texto)\`**: Elimina los espacios en blanco sobrantes antes y después del texto (\`'  hola  ' -> 'hola'\`).
4. **\`LENGTH(texto)\`**: Devuelve la cantidad de caracteres que componen la cadena.

Estas funciones se ejecutan fila por fila sin modificar el dato almacenado en el disco; solo transforman la forma en que se presenta en el resultado.`,
        codeSnippet: `-- Formateamos y medimos los nombres y carreras de los estudiantes\nSELECT \n  id,\n  UPPER(nombre) AS nombre_mayus,\n  LOWER(carrera) AS carrera_minus,\n  LENGTH(nombre) AS longitud_nombre\nFROM estudiantes\nLIMIT 3;`,
        outputSnippet: `+----+-----------------+------------------------+-----------------+\n| id | nombre_mayus    | carrera_minus          | longitud_nombre |\n+----+-----------------+------------------------+-----------------+\n| 1  | VALERIA MORALES | ingeniería de software | 15              |\n| 2  | DIEGO FERNÁNDEZ | ciencias computación   | 15              |\n| 3  | CAMILA GÓMEZ    | sistemas información   | 12              |\n+----+-----------------+------------------------+-----------------+\n3 rows in set (0.002 sec)`,
        byteTip: 'Para realizar búsquedas insensibles a mayúsculas y acentos en SQLite, compara con LOWER(columna) = LOWER("texto").',
        pitfallTip: 'Recuerda que en SQLite la función se llama LENGTH(); si vienes de SQL Server no escribas LEN() porque causará un error sintáctico.',
        keyPoints: [
          'UPPER y LOWER cambian el caso del texto.',
          'TRIM limpia espacios accidentales en bordes.',
          'LENGTH devuelve la cantidad de caracteres de la cadena.'
        ]
      },
      {
        title: 'Limpieza de entradas de usuario en aplicaciones móviles',
        explanation: `Cuando un usuario escribe su correo electrónico en un formulario de registro en Android, suele presionar la tecla de espacio por error al final del texto (\`"juan@mail.com "\`).
Usar \`TRIM\` y \`LOWER\` al consultar o guardar evita cuentas duplicadas y fallos de autenticación:`,
        codeSnippet: `-- Demostración de búsqueda normalizada sin importar espacios ni mayúsculas\nSELECT id, nombre, email\nFROM usuarios\nWHERE LOWER(TRIM(email)) = 'ada@pioneers.org';`,
        outputSnippet: `+----+--------------+------------------+\n| id | nombre       | email            |\n+----+--------------+------------------+\n| 1  | Ada Lovelace | ada@pioneers.org |\n+----+--------------+------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'En Room para Android, puedes combinar TRIM(nombre) dentro de tus @Query para búsquedas ultra-robustas.',
        pitfallTip: 'LENGTH(NULL) devuelve NULL en SQL, no cero. Tenlo en cuenta al filtrar longitudes mínimas.',
        keyPoints: [
          'Combinar LOWER(TRIM(...)) es la regla de oro para validar correos y usuarios.',
          'Protege la base de datos contra inconsistencias tipográficas.',
          'Ahorra procesamiento en la capa de Kotlin al resolver la limpieza en el motor SQLite.'
        ]
      }
    ]
  },

  'sql-u11-l02': {
    subtitle: 'Aprende a controlar los decimales de montos financieros y promedios con la función ROUND.',
    analogy: 'El recibo de un supermercado: la máquina calcula un impuesto que da $12.34567, pero el ticket impreso te muestra $12.35 redondeado a dos centavos para que coincida con monedas reales.',
    sections: [
      {
        title: 'Control de decimales con la función ROUND',
        explanation: `Cuando realizas divisiones, multiplicas porcentajes o calculas promedios con \`AVG\`, los números con punto flotante suelen arrojar muchos dígitos decimales (por ejemplo, \`9.040000000000001\`).

La función **\`ROUND(numero, decimales)\`** redondea el valor numérico al número de decimales que especifiques:
• \`ROUND(promedio, 2)\`: conserva 2 decimales (ideal para dinero o calificaciones).
• \`ROUND(promedio, 0)\`: redondea al entero más cercano.
• Si omites el segundo parámetro, SQLite redondeará por defecto a cero decimales (\`ROUND(valor)\`).

SQLite aplica el método de redondeo estándar: si el siguiente dígito es 5 o mayor, redondea hacia arriba; si es menor a 5, redondea hacia abajo.`,
        codeSnippet: `-- Redondeo de promedios estudiantiles y cálculos de bonificación\nSELECT \n  nombre,\n  promedio,\n  ROUND(promedio, 0) AS entero_cercano,\n  ROUND(promedio * 1.05, 2) AS con_bono_5_porciento\nFROM estudiantes\nLIMIT 3;`,
        outputSnippet: `+-----------------+----------+----------------+----------------------+\n| nombre          | promedio | entero_cercano | con_bono_5_porciento |\n+-----------------+----------+----------------+----------------------+\n| Valeria Morales | 9.4      | 9.0            | 9.87                 |\n| Diego Fernández | 8.8      | 9.0            | 9.24                 |\n| Camila Gómez    | 9.7      | 10.0           | 10.19                |\n+-----------------+----------+----------------+----------------------+\n3 rows in set (0.002 sec)`,
        byteTip: 'En SQLite, ROUND(3.14159, 2) devuelve el número 3.14.',
        pitfallTip: 'No uses ROUND para alterar datos contables confidenciales en la tabla; úsalo en la consulta SELECT para proyectar el resultado en pantalla.',
        keyPoints: [
          'ROUND(x, d) redondea un número x a d cifras decimales.',
          'Evita textos feos con 15 decimales flotantes en la interfaz de la aplicación.',
          'Es indispensable al mostrar precios, monedas y porcentajes.'
        ]
      },
      {
        title: 'Reportes ejecutivos con formato limpio',
        explanation: `Al generar reportes gerenciales de salarios y presupuesto, presentar cifras limpias y consistentes genera profesionalismo y evita dudas en la dirección:`,
        codeSnippet: `-- Resumen salarial con redondeo impecable a dos decimales\nSELECT \n  departamento,\n  ROUND(AVG(salario), 2) AS salario_promedio,\n  ROUND(SUM(salario), 2) AS gasto_total\nFROM empleados\nGROUP BY departamento;`,
        outputSnippet: `+--------------+------------------+-------------+\n| departamento | salario_promedio | gasto_total |\n+--------------+------------------+-------------+\n| Dirección    | 4500.00          | 4500.00     |\n| Diseño UX    | 2850.50          | 2850.50     |\n| Ingeniería   | 3200.00          | 3200.00     |\n| Sistemas     | 3100.00          | 3100.00     |\n| Soporte      | 1900.00          | 1900.00     |\n+--------------+------------------+-------------+\n5 rows in set (0.002 sec)`,
        byteTip: 'En Android, recibir un número ya redondeado desde SQLite ahorra formateos costosos en las clases ViewModel de Kotlin.',
        pitfallTip: 'Recuerda que ROUND sobre NULL devuelve NULL.',
        keyPoints: [
          'Asegura la legibilidad de métricas financieras.',
          'Reduce el trabajo de formateo en el cliente móvil.',
          'Mantiene la consistencia numérica a lo largo de toda la app.'
        ]
      }
    ]
  },

  'sql-u11-l03': {
    subtitle: 'Domina COALESCE: el equivalente en SQL del operador Elvis (?:) de Kotlin para sustituir valores NULL.',
    analogy: 'Un protocolo de contacto telefónico de emergencia: intentas llamar al teléfono móvil; si no está disponible (NULL), llamas al teléfono fijo; si tampoco está, marcas el número de la oficina.',
    sections: [
      {
        title: 'El sustituto perfecto contra los valores nulos',
        explanation: `En bases de datos relacionales, muchas columnas son opcionales y pueden contener \`NULL\`. Cuando proyectas esos datos hacia la aplicación, un \`NULL\` puede provocar pantallas incompletas o errores de puntero nulo en Kotlin.

La función **\`COALESCE(valor1, valor2, ...)\`** evalúa su lista de argumentos de izquierda a derecha y **devuelve el primer valor que NO sea \`NULL\`**.

Sintaxis:
\`COALESCE(columna, valor_por_defecto)\`

Ejemplos:
• \`COALESCE(telefono, 'Sin teléfono')\`: si el cliente no tiene teléfono, muestra el texto \`'Sin teléfono'\`.
• \`COALESCE(descuento, 0.0)\`: si no hay descuento registrado, asume cero para que los cálculos matemáticos no se arruinen.`,
        codeSnippet: `-- Demostración de COALESCE asegurando valores por defecto inmediatos\nSELECT \n  nombre,\n  pais,\n  COALESCE(pais, 'País no especificado') AS pais_seguro\nFROM usuarios;`,
        outputSnippet: `+-------------------+----------------+----------------+\n| nombre            | pais           | pais_seguro    |\n+-------------------+----------------+----------------+\n| Ada Lovelace      | Reino Unido    | Reino Unido    |\n| Alan Turing       | Reino Unido    | Reino Unido    |\n| Grace Hopper      | Estados Unidos | Estados Unidos |\n| Linus Torvalds    | Finlandia      | Finlandia      |\n| Margaret Hamilton | Estados Unidos | Estados Unidos |\n+-------------------+----------------+----------------+\n5 rows in set (0.001 sec)`,
        byteTip: 'COALESCE es el hermano gemelo del operador Elvis de Kotlin (val pais = usuario.pais ?: "País no especificado").',
        pitfallTip: 'Si todos los parámetros pasados a COALESCE son NULL, la función devolverá NULL.',
        keyPoints: [
          'COALESCE retorna el primer argumento no nulo de su lista.',
          'Reemplaza valores ausentes por valores por defecto legibles o seguros.',
          'Esencial para evitar que fórmulas matemáticas se anulen al toparse con un NULL.'
        ]
      },
      {
        title: 'Cálculos matemáticos inmunes a nulos',
        explanation: `En SQL, cualquier operación matemática contra un \`NULL\` produce \`NULL\` (\`100 + NULL = NULL\`). Si calculas el total de una factura sumando \`subtotal + impuesto - descuento\`, y \`descuento\` es \`NULL\`, ¡la factura entera se convierte en \`NULL\`!
Para blindar tus cálculos, envuelve cada término en \`COALESCE\`:`,
        codeSnippet: `-- Calculamos salarios con bonificaciones opcionales seguras\nSELECT \n  nombre,\n  salario,\n  COALESCE(salario, 0.0) * 1.10 AS salario_con_aumento\nFROM empleados\nLIMIT 3;`,
        outputSnippet: `+---------------+---------+----------------------+\n| nombre        | salario | salario_con_aumento  |\n+---------------+---------+----------------------+\n| Carlos Mendoza| 3200.0  | 3520.0               |\n| Elena Rostova | 2850.5  | 3135.55              |\n| Mateo Díaz    | 3100.0  | 3410.0               |\n+---------------+---------+----------------------+\n3 rows in set (0.002 sec)`,
        byteTip: 'En SQLite también existe IFNULL(a, b), pero COALESCE es el estándar ANSI SQL preferido por ser portable a PostgreSQL y MySQL.',
        pitfallTip: 'Asegúrate de que los tipos de datos en COALESCE coincidan: no mezcles números con cadenas si vas a operar matemáticamente.',
        keyPoints: [
          'Previene la propagación de nulos en operaciones aritméticas.',
          'Mapea datos directamente a tipos no-nulos en Room y Kotlin.',
          'Es un estándar internacional adoptado por todos los motores de base de datos.'
        ]
      }
    ]
  },

  'sql-u11-l04': {
    subtitle: 'Implementa lógica condicional if-else directamente dentro de tus consultas SQL usando la estructura CASE WHEN.',
    analogy: 'Un semáforo que clasifica a los estudiantes por promedio: si la nota es >= 9.5 enciende luz verde ("Sobresaliente"), si es >= 8.5 luz amarilla ("Destacado"), y para el resto luz blanca ("Regular").',
    sections: [
      {
        title: 'Lógica condicional declarativa con CASE WHEN',
        explanation: `A menudo necesitas categorizar o transformar datos sobre la marcha sin alterar la base de datos: convertir números de estatus en palabras amigables, o asignar etiquetas comerciales a los precios.

La estructura **\`CASE\`** es el equivalente en SQL del \`when\` de Kotlin o \`switch-case\`:

Sintaxis:
\`CASE\`
\`  WHEN condicion1 THEN resultado1\`
\`  WHEN condicion2 THEN resultado2\`
\`  ELSE resultado_por_defecto\`
\`END\`

Las condiciones se evalúan en orden de arriba a abajo. La primera condición que resulte verdadera determina el valor de salida. Si ninguna se cumple, se devuelve lo que indique el \`ELSE\` (o \`NULL\` si se omitió el \`ELSE\`). Toda la estructura debe cerrarse obligatoriamente con la palabra **\`END\`**.`,
        codeSnippet: `-- Clasificamos a los estudiantes según su promedio general\nSELECT \n  nombre,\n  promedio,\n  CASE \n    WHEN promedio >= 9.5 THEN 'Cuadro de Honor'\n    WHEN promedio >= 8.5 THEN 'Destacado'\n    ELSE 'Regular'\n  END AS nivel_academico\nFROM estudiantes;`,
        outputSnippet: `+-----------------+----------+-----------------+\n| nombre          | promedio | nivel_academico |\n+-----------------+----------+-----------------+\n| Valeria Morales | 9.4      | Destacado       |\n| Diego Fernández | 8.8      | Destacado       |\n| Camila Gómez    | 9.7      | Cuadro de Honor |\n| Javier Ramos    | 8.2      | Regular         |\n| Lucía Navarro   | 9.1      | Destacado       |\n+-----------------+----------+-----------------+\n5 rows in set (0.002 sec)`,
        byteTip: 'Puedes usar CASE tanto en la lista de proyección del SELECT como dentro de WHERE o en la cláusula ORDER BY para órdenes personalizados.',
        pitfallTip: 'Olvidar la palabra END al final de la estructura CASE es uno de los errores sintácticos más comunes en SQL.',
        keyPoints: [
          'CASE WHEN evalúa condiciones lógicas y devuelve un valor asignado.',
          'La cláusula ELSE atrapa todos los casos no contemplados.',
          'Siempre debe cerrarse con la palabra clave END.'
        ]
      },
      {
        title: 'Traducción de estados y códigos en interfaces de Android',
        explanation: `En bases de datos móviles es muy común guardar estados como códigos numéricos o booleanos (\`activo = true\`, \`estado = 1\`). Con \`CASE\` puedes traducirlos de inmediato a textos amigables para la interfaz gráfica:`,
        codeSnippet: `-- Traducimos el estado de pedidos a etiquetas claras con emojis\nSELECT \n  id,\n  total,\n  CASE estado\n    WHEN 'entregado' THEN '✅ Recibido'\n    WHEN 'enviado' THEN '🚚 En camino'\n    WHEN 'procesando' THEN '⏳ En preparación'\n    ELSE '⚠️ Pendiente'\n  END AS estado_visual\nFROM pedidos;`,
        outputSnippet: `+------+--------+-------------------+\n| id   | total  | estado_visual     |\n+------+--------+-------------------+\n| 1001 | 139.89 | ✅ Recibido       |\n| 1002 | 429.50 | ⏳ En preparación |\n| 1003 | 89.99  | ✅ Recibido       |\n| 1004 | 14.99  | 🚚 En camino      |\n| 1005 | 178.90 | ⚠️ Pendiente      |\n+------+--------+-------------------+\n5 rows in set (0.002 sec)`,
        byteTip: 'Esta forma compacta CASE columna WHEN valor THEN ... se llama "CASE simple" y es ideal para comparar contra valores fijos.',
        pitfallTip: 'Asegúrate de que todos los THEN devuelvan datos del mismo tipo (por ejemplo, todas cadenas o todos números) para evitar incoherencias.',
        keyPoints: [
          'Traduce códigos internos en textos legibles para los usuarios finales.',
          'Mantiene la lógica de presentación desacoplada del almacenamiento.',
          'Funciona de manera fluida y nativa en cualquier versión de SQLite.'
        ]
      }
    ]
  },

  'sql-u11-l05': {
    subtitle: 'Aprende a consultar el tiempo, calcular fechas y manejar zonas horarias con las funciones de fecha nativas de SQLite.',
    analogy: 'Un reloj con calendario perpetuo: le preguntas qué fecha es hoy, qué día de la semana cae, o qué fecha exacta será dentro de 30 días con solo pedirlo.',
    sections: [
      {
        title: 'Funciones de fecha y hora en SQLite',
        explanation: `SQLite no tiene un tipo de dato dedicado llamado \`DATETIME\`; en su lugar almacena fechas como cadenas de texto en formato ISO-8601 (\`'AAAA-MM-DD HH:MM:SS'\`).

Para operar con ellas, SQLite ofrece funciones especializadas:
1. **\`DATE('now')\`**: Devuelve la fecha actual del sistema en formato \`'AAAA-MM-DD'\`.
2. **\`DATETIME('now')\`**: Devuelve la fecha y hora actual en tiempo universal coordinado (\`UTC\`).
3. **Modificadores de intervalo**: Puedes sumar o restar tiempo fácilmente añadiendo argumentos en cadena:
   • \`DATE('now', '+7 days')\`: la fecha de hoy más 7 días.
   • \`DATE('now', '-1 month')\`: la fecha de hace un mes.
   • \`DATE('now', 'start of month')\`: el primer día del mes actual.`,
        codeSnippet: `-- Consultamos la fecha actual y proyecciones de tiempo en SQLite\nSELECT \n  DATE('now') AS hoy,\n  DATETIME('now') AS hora_utc,\n  DATE('now', '+30 days') AS vencimiento_mensual;`,
        outputSnippet: `+------------+---------------------+---------------------+\n| hoy        | hora_utc            | vencimiento_mensual |\n+------------+---------------------+---------------------+\n| 2026-10-21 | 2026-10-21 19:15:00 | 2026-11-20          |\n+------------+---------------------+---------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'Almacena siempre fechas en formato ISO-8601 (TEXT) o como timestamps Unix en milisegundos (INTEGER); esto permite ordenarlas cronológicamente de forma perfecta.',
        pitfallTip: 'No uses operadores matemáticos como fecha - 7 para restar días; debes usar la función DATE(fecha, "-7 days").',
        keyPoints: [
          'DATE("now") produce la fecha del sistema en formato ISO-8601.',
          'Los modificadores de intervalo permiten sumar o restar días, meses y años.',
          'SQLite almacena fechas como cadenas de texto legibles o números de época.'
        ]
      },
      {
        title: 'Cálculo de antigüedad y filtrado cronológico',
        explanation: `En aplicaciones empresariales es indispensable calcular cuántos años o días lleva registrado un empleado o cliente para aplicar beneficios de lealtad:`,
        codeSnippet: `-- Consultamos empleados registrados ordenados cronológicamente\nSELECT \n  nombre,\n  departamento,\n  fecha_ingreso\nFROM empleados\nORDER BY fecha_ingreso ASC;`,
        outputSnippet: `+---------------+--------------+---------------+\n| nombre        | departamento | fecha_ingreso |\n+---------------+--------------+---------------+\n| Sofía Valerio | Dirección    | 2019-11-20    |\n| Elena Rostova | Diseño UX    | 2021-08-01    |\n| Carlos Mendoza| Ingeniería   | 2022-03-15    |\n| Mateo Díaz    | Sistemas     | 2023-01-10    |\n| Andrés Solano | Soporte      | 2024-02-01    |\n+---------------+--------------+---------------+\n5 rows in set (0.002 sec)`,
        byteTip: 'En Room con Android, puedes usar un TypeConverter para convertir automáticamente un Instant de Kotlin a la cadena ISO que SQLite almacena.',
        pitfallTip: 'Cuidado con las zonas horarias: si el servidor graba en UTC y el teléfono lee en local, asegúrate de aplicar "localtime" en la consulta si es necesario.',
        keyPoints: [
          'El formato AAAA-MM-DD se ordena de forma natural tanto alfabética como cronológicamente.',
          'Facilita la creación de filtros temporales (ej. ventas del último mes).',
          'Los TypeConverters de Room integran estas fechas de forma transparente con Kotlin.'
        ]
      }
    ]
  },

  'sql-u11-l06': {
    subtitle: 'Aprende a anidar consultas usando subconsultas con la cláusula IN para resolver preguntas de dos niveles.',
    analogy: 'Un jefe que le pide a su secretaria: "Primero búscame la lista de IDs de clientes que deben dinero. Cuando tengas esa lista en la mano, pásasela a cobranzas para que les envíen un correo". Una consulta alimenta a la otra.',
    sections: [
      {
        title: 'Consultas anidadas: Subconsultas con la cláusula IN',
        explanation: `Una **subconsulta** (*subquery*) es una sentencia \`SELECT\` encerrada entre paréntesis que se coloca dentro de otra consulta principal.

En una subconsulta con **\`IN\`**:
1. La consulta interna (dentro del paréntesis) se ejecuta primero.
2. Genera una lista temporal de valores (por ejemplo, una lista de IDs de estudiantes).
3. La consulta externa toma esa lista y filtra sus propias filas diciendo:
   \`WHERE id IN (lista generada por la subconsulta)\`

Regla crucial: la subconsulta interna debe proyectar **exactamente una sola columna**. Si intentas poner \`SELECT *\` dentro del paréntesis, SQLite arrojará un error porque la cláusula \`IN\` no puede comparar un número contra una fila entera de 5 columnas.`,
        codeSnippet: `-- Consultamos qué estudiantes están cursando la asignatura con id = 101\nSELECT id, nombre, carrera\nFROM estudiantes\nWHERE id IN (\n  SELECT estudiante_id\n  FROM matriculas\n  WHERE asignatura_id = 101\n);`,
        outputSnippet: `+----+-----------------+-------------------------+\n| id | nombre          | carrera                 |\n+----+-----------------+-------------------------+\n| 1  | Valeria Morales | Ingeniería de Software  |\n| 2  | Diego Fernández | Ciencias Computación    |\n| 3  | Camila Gómez    | Sistemas Información    |\n+----+-----------------+-------------------------+\n3 rows in set (0.002 sec)`,
        byteTip: 'Usa subconsultas con IN cuando quieras filtrar una tabla maestra sin necesidad de duplicar filas por culpa de un JOIN.',
        pitfallTip: 'Si la subconsulta interna devuelve un valor NULL en una cláusula NOT IN, la consulta entera puede devolver 0 resultados de forma inesperada.',
        keyPoints: [
          'Una subconsulta es un SELECT anidado entre paréntesis.',
          'La consulta interna se ejecuta en primer lugar y entrega sus datos a la externa.',
          'La subconsulta dentro de un IN debe proyectar una única columna.'
        ]
      },
      {
        title: 'Casos reales: Clientes que han comprado en categorías específicas',
        explanation: `Veamos cómo encontrar qué usuarios de nuestra base de datos han realizado pedidos registrados en el sistema:`,
        codeSnippet: `-- Usuarios que tienen al menos un pedido registrado en el historial\nSELECT nombre, email, pais\nFROM usuarios\nWHERE id IN (\n  SELECT cliente_id\n  FROM pedidos\n);`,
        outputSnippet: `+-------------------+--------------------+----------------+\n| nombre            | email              | pais           |\n+-------------------+--------------------+----------------+\n| Ada Lovelace      | ada@pioneers.org   | Reino Unido    |\n| Alan Turing       | alan@bletchley.org | Reino Unido    |\n| Grace Hopper      | grace@navy.mil     | Estados Unidos |\n| Linus Torvalds    | linus@linux.org    | Finlandia      |\n| Margaret Hamilton | margaret@nasa.gov  | Estados Unidos |\n+-------------------+--------------------+----------------+\n5 rows in set (0.002 sec)`,
        byteTip: 'En Room puedes combinar DAO methods o ejecutar subconsultas complejas de manera declarativa con @Query.',
        pitfallTip: 'Evita subconsultas correlacionadas muy pesadas dentro de bucles si puedes resolverlo con un INNER JOIN indexado.',
        keyPoints: [
          'Permite desacoplar consultas en pasos lógicos independientes.',
          'Mantiene las filas maestras sin multiplicaciones indeseadas.',
          'Es una técnica de enorme potencia expresiva en bases de datos relacionales.'
        ]
      }
    ]
  },

  'sql-u11-l07': {
    subtitle: 'Aprende a usar subconsultas escalares para comparar registros individuales contra métricas y promedios globales.',
    analogy: 'Buscar a los estudiantes que sacaron mejor nota que el promedio de toda la escuela: primero calculas la nota promedio global de la escuela (ej. 8.5) y luego buscas a quienes superan ese número exacto.',
    sections: [
      {
        title: 'Subconsultas escalares: Comparaciones globales',
        explanation: `Una **subconsulta escalar** es aquella que devuelve **exactamente una fila y una columna**: es decir, un solo valor atómico (como el resultado de \`AVG()\`, \`MAX()\` o \`MIN()\`).

Dado que produce un solo número, puedes colocarla directamente a la derecha de cualquier operador de comparación estándar (\`>\`, \`<\`, \`>=\`, \`<=\`, \`=\`):

\`SELECT nombre, salario\`
\`FROM empleados\`
\`WHERE salario > (SELECT AVG(salario) FROM empleados);\`

El motor primero calcula el promedio de todos los empleados y luego evalúa fila por fila quiénes ganan más que esa cifra.`,
        codeSnippet: `-- Buscamos a los estudiantes cuyo promedio personal supera el promedio institucional\nSELECT \n  nombre,\n  carrera,\n  promedio\nFROM estudiantes\nWHERE promedio > (\n  SELECT AVG(promedio)\n  FROM estudiantes\n);`,
        outputSnippet: `+-----------------+------------------------+----------+\n| nombre          | carrera                | promedio |\n+-----------------+------------------------+----------+\n| Valeria Morales | Ingeniería de Software | 9.4      |\n| Camila Gómez    | Sistemas Información   | 9.7      |\n| Lucía Navarro   | Ingeniería de Software | 9.1      |\n+-----------------+------------------------+----------+\n3 rows in set (0.002 sec)`,
        byteTip: 'Las subconsultas escalares son muy rápidas porque el cálculo agregado global solo se ejecuta una sola vez.',
        pitfallTip: 'Si tu subconsulta devuelve más de 1 fila, SQLite arrojará el error: "sub-select returns 5 columns or rows - only 1 expected".',
        keyPoints: [
          'Una subconsulta escalar produce un solo valor atómico de salida.',
          'Puede usarse con operadores matemáticos y de comparación estándar.',
          'Permite responder preguntas analíticas relativas al total del sistema.'
        ]
      },
      {
        title: 'Identificación de productos y registros sobresalientes',
        explanation: `¿Qué productos tienen un precio superior al precio medio del catálogo? Con esta técnica obtienes la respuesta en una sola consulta sin tener que hacer dos llamadas separadas desde la app:`,
        codeSnippet: `-- Productos de gama alta cuyo precio supera el promedio del inventario\nSELECT \n  nombre,\n  categoria,\n  precio\nFROM productos\nWHERE precio > (\n  SELECT AVG(precio)\n  FROM productos\n);`,
        outputSnippet: `+-------------------------------+-----------+--------+\n| nombre                        | categoria | precio |\n+-------------------------------+-----------+--------+\n| Monitor Ultrawide 34"         | Pantallas | 429.50 |\n+-------------------------------+-----------+--------+\n1 row in set (0.001 sec)`,
        byteTip: 'En Android, resolver este cálculo en una sola consulta SQLite ahorra batería y reduce la latencia de red.',
        pitfallTip: 'Asegúrate de envolver la subconsulta siempre entre paréntesis; de lo contrario el compilador no sabrá dónde empieza.',
        keyPoints: [
          'Calcula umbrales dinámicos que se adaptan automáticamente al crecimiento de los datos.',
          'Elimina la necesidad de calcular promedios manualmente en el código de Kotlin.',
          'Cierra con broche de oro tu dominio sobre las consultas analíticas de SQL.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 12: INTEGRIDAD REFERENCIAL Y TRANSACCIONES
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u12-l01': {
    subtitle: 'Comprende la particularidad histórica de SQLite: por qué las llaves foráneas vienen desactivadas y cómo activarlas con PRAGMA.',
    analogy: 'El freno de mano de un vehículo: el auto ya tiene los frenos instalados de fábrica, pero si no quitas el seguro o no los activas conscientemente, el mecanismo no detendrá el vehículo.',
    sections: [
      {
        title: 'La directiva PRAGMA foreign_keys = ON',
        explanation: `Por razones de compatibilidad histórica hacia atrás (con versiones muy antiguas de SQLite del año 2000), **SQLite tiene la verificación de llaves foráneas DESACTIVADA por defecto**.

Esto significa que si creas una tabla con \`FOREIGN KEY\` pero no activas la verificación:
• Podrías insertar una matrícula con \`estudiante_id = 9999\` (un estudiante que no existe).
• SQLite lo aceptará sin marcar ningún error, corrompiendo la integridad de tus datos.

Para activar la verificación estricta de llaves foráneas, debes ejecutar esta instrucción especial al abrir tu conexión:
\`PRAGMA foreign_keys = ON;\``,
        codeSnippet: `-- Activamos la verificación obligatoria de llaves foráneas en SQLite\nPRAGMA foreign_keys = ON;\n\nSELECT 1 AS llaves_foraneas_activadas;`,
        outputSnippet: `PRAGMA foreign_keys = ON configurado con éxito.\n+--------------------------+\n| llaves_foraneas_activadas|\n+--------------------------+\n| 1                        |\n+--------------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'Afortunadamente, la biblioteca Room de Android ejecuta PRAGMA foreign_keys = ON automáticamente por ti bajo el capó.',
        pitfallTip: 'Si trabajas con SQLite directamente en scripts, terminales o drivers nativos de C/Python, ¡debes ejecutar este PRAGMA siempre al iniciar!',
        keyPoints: [
          'SQLite desactiva la comprobación de llaves foráneas por compatibilidad heredada.',
          'PRAGMA foreign_keys = ON activa la comprobación en la conexión actual.',
          'Garantiza que la base de datos rechace datos huérfanos o inválidos.'
        ]
      },
      {
        title: 'Verificación del estado de configuración',
        explanation: `Puedes comprobar en cualquier momento si la conexión actual tiene las restricciones activas ejecutando la directiva como una consulta de lectura:`,
        codeSnippet: `-- Consultamos el estado actual del pragma de llaves foráneas\nPRAGMA foreign_keys;`,
        outputSnippet: `+--------------+\n| foreign_keys |\n+--------------+\n| 1            |\n+--------------+\n1 row in set (0.001 sec)`,
        byteTip: 'El valor 1 indica ON (activo); el valor 0 indica OFF (inactivo).',
        pitfallTip: 'El comando PRAGMA solo afecta a la conexión abierta actual; no persiste globalmente si cierras y vuelves a abrir la base de datos.',
        keyPoints: [
          'PRAGMA es la palabra clave de SQLite para consultar y ajustar parámetros del motor.',
          'La verificación debe activarse en cada sesión de conexión.',
          'Es el primer paso fundamental para garantizar la integridad referencial.'
        ]
      }
    ]
  },

  'sql-u12-l02': {
    subtitle: 'Comprueba cómo el motor relacional bloquea de inmediato inserciones corruptas cuando una llave foránea apunta a la nada.',
    analogy: 'Intentar registrar una receta médica a nombre de un paciente que no existe en el hospital: el sistema del hospital rechaza el registro inmediatamente diciendo "Paciente no encontrado".',
    sections: [
      {
        title: 'Bloqueo de referencias inexistentes: FOREIGN KEY constraint failed',
        explanation: `Una vez que \`PRAGMA foreign_keys = ON\` está activo, la base de datos actúa como un guardián incorruptible:
• Antes de permitir que una fila se inserte en la tabla hija (\`matriculas\`), el motor toma el valor de la llave foránea (\`estudiante_id\`).
• Va a la tabla padre (\`estudiantes\`) y busca si existe una fila con esa llave primaria.
• **Si no existe**, la operación se aborta de inmediato con el error oficial:
  \`FOREIGN KEY constraint failed\`

Este mecanismo previene la existencia de **registros huérfanos** (datos hijos que apuntan a entidades que jamás existieron o que fueron borradas).`,
        codeSnippet: `-- Verificamos los estudiantes reales existentes en la base de datos\nSELECT id, nombre, carrera FROM estudiantes;`,
        outputSnippet: `+----+-----------------+------------------------+\n| id | nombre          | carrera                |\n+----+-----------------+------------------------+\n| 1  | Valeria Morales | Ingeniería de Software |\n| 2  | Diego Fernández | Ciencias Computación   |\n| 3  | Camila Gómez    | Sistemas Información   |\n| 4  | Javier Ramos    | Ciberseguridad         |\n| 5  | Lucía Navarro   | Ingeniería de Software |\n+----+-----------------+------------------------+\n5 rows in set (0.001 sec)`,
        byteTip: 'Los registros huérfanos son la principal causa de excepciones NullPointerException en aplicaciones móviles.',
        pitfallTip: 'Nunca intentes burlar este error desactivando las llaves foráneas; la solución correcta es insertar primero al padre legítimo.',
        keyPoints: [
          'FOREIGN KEY constraint failed protege contra la corrupción lógica de datos.',
          'Garantiza que cada registro hijo esté respaldado por un registro padre válido.',
          'Es la mayor ventaja de usar una base de datos relacional frente a simples archivos de texto.'
        ]
      },
      {
        title: 'El orden obligatorio en las inserciones y borrados',
        explanation: `La integridad referencial impone una disciplina estricta en el flujo de tus datos:
1. **Para insertar:** primero debes insertar al **padre** (\`estudiantes\`), y solo después al **hijo** (\`matriculas\`).
2. **Para borrar:** primero debes borrar al **hijo** (\`matriculas\`), y solo después al **padre** (\`estudiantes\`).

Si intentas borrar a un padre que todavía tiene hijos asociados, SQLite bloqueará la eliminación para proteger a los hijos:`,
        codeSnippet: `-- Confirmamos que las matrículas actuales tienen padres válidos\nSELECT m.id AS matricula_id, e.id AS estudiante_id, e.nombre\nFROM matriculas AS m\nJOIN estudiantes AS e ON m.estudiante_id = e.id\nLIMIT 3;`,
        outputSnippet: `+--------------+---------------+-----------------+\n| matricula_id | estudiante_id | nombre          |\n+--------------+---------------+-----------------+\n| 1            | 1             | Valeria Morales |\n| 2            | 1             | Valeria Morales |\n| 3            | 2             | Diego Fernández |\n+--------------+---------------+-----------------+\n3 rows in set (0.001 sec)`,
        byteTip: 'En Android con Room, define tus entidades padre primero y luego las entidades dependientes con ForeignKey annotations.',
        pitfallTip: 'Si borras una tabla padre antes de borrar la tabla hija en un script de pruebas, obtendrás un error de bloqueo referencial.',
        keyPoints: [
          'El padre debe existir antes de que el hijo pueda crearse.',
          'El hijo debe removerse antes de que el padre pueda ser eliminado.',
          'Esta jerarquía mantiene la estabilidad de la información en el tiempo.'
        ]
      }
    ]
  },

  'sql-u12-l03': {
    subtitle: 'Aprende a configurar acciones automáticas ante eliminaciones y cambios con ON DELETE CASCADE, SET NULL y RESTRICT.',
    analogy: 'Un folder con contratos de un cliente: si la empresa cliente se disuelve, ¿destruyes automáticamente todos sus contratos en la trituradora (CASCADE), o borras el nombre del cliente dejando los contratos archivados como anónimos (SET NULL)?',
    sections: [
      {
        title: 'Acciones referenciales automáticas (ON DELETE / ON UPDATE)',
        explanation: `¿Qué debe pasar con los registros hijos cuando alguien elimina un registro padre?
SQL te permite configurar el comportamiento exacto en la declaración de la llave foránea:

1. **\`ON DELETE RESTRICT\` (o \`NO ACTION\`)**:
Es el valor por defecto. Si intentas borrar al padre mientras tenga hijos, SQLite **prohíbe y bloquea la operación**. Debes borrar a los hijos manualmente primero.

2. **\`ON DELETE CASCADE\`**:
¡Eliminación en cadena! Al borrar al padre, SQLite **borra automáticamente a todos sus hijos**. Por ejemplo, al borrar un usuario, se borran automáticamente todos sus mensajes y notificaciones.

3. **\`ON DELETE SET NULL\`**:
Al borrar al padre, los registros hijos se conservan pero su columna de llave foránea cambia su valor a **\`NULL\`**. Útil cuando el historial del registro hijo sigue teniendo valor estadístico.`,
        codeSnippet: `-- Demostración de sintaxis de tabla con eliminación en cascada\nCREATE TABLE IF NOT EXISTS matriculas_ejemplo (\n  id INTEGER PRIMARY KEY,\n  estudiante_id INTEGER,\n  asignatura_id INTEGER,\n  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE\n);`,
        outputSnippet: `Query OK, 0 rows affected (Engine: InMemory Relational DB)\nTabla 'matriculas_ejemplo' registrada en memoria.`,
        byteTip: 'En Room para Android, puedes configurar la cascada directamente en la anotación @ForeignKey(onDelete = ForeignKey.CASCADE).',
        pitfallTip: 'Usa CASCADE con extrema prudencia: un solo DELETE sobre una cuenta de usuario podría borrar cientos de miles de registros en cadena sin pedir confirmación.',
        keyPoints: [
          'RESTRICT bloquea el borrado si existen hijos dependientes.',
          'CASCADE propaga la eliminación automáticamente a todas las tablas hijas.',
          'SET NULL conserva los hijos desvinculándolos del padre eliminado.'
        ]
      },
      {
        title: 'Buenas prácticas de arquitectura de datos',
        explanation: `¿Cómo elegir entre CASCADE, RESTRICT o SET NULL en tu aplicación?
• Usa **\`CASCADE\`** cuando el registro hijo no tenga ningún sentido sin el padre (por ejemplo, los \`items_carrito\` de un \`carrito_compras\`).
• Usa **\`RESTRICT\`** cuando represente dinero o transacciones legales (no permitas borrar un cliente si tiene facturas pendientes de cobro).
• Usa **\`SET NULL\`** cuando el registro secundario deba conservarse con fines históricos (por ejemplo, un informe técnico cuyo autor renunció a la empresa):`,
        codeSnippet: `-- Verificamos la tabla matriculas actual para asegurar su configuración\nSELECT COUNT(*) AS total_matriculas_vigentes FROM matriculas;`,
        outputSnippet: `+----------------------------+\n| total_matriculas_vigentes |\n+----------------------------+\n| 7                          |\n+----------------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'Configurar ON UPDATE CASCADE asegura que si el ID padre cambia, los IDs foráneos en los hijos se actualicen automáticamente.',
        pitfallTip: 'Si usas ON DELETE SET NULL, asegúrate de que la columna foránea no tenga la restricción NOT NULL, o causará un error de conflicto.',
        keyPoints: [
          'CASCADE es ideal para relaciones de pertenencia total (composición).',
          'RESTRICT protege la seguridad financiera y legal de la empresa.',
          'Una buena arquitectura referencial previene limpiezas manuales costosas.'
        ]
      }
    ]
  },

  'sql-u12-l04': {
    subtitle: 'Comprende las propiedades ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad) que blindan las operaciones críticas.',
    analogy: 'Una transferencia bancaria entre dos cuentas: debitar $100 de tu cuenta y abonar $100 a la cuenta de tu amigo. O se cumplen los dos pasos con éxito, o no se hace ninguno. ¡Jamás debe perderse el dinero a mitad de camino!',
    sections: [
      {
        title: 'El principio "Todo o Nada": ¿Qué es una transacción?',
        explanation: `En cualquier aplicación seria ocurren operaciones que requieren **múltiples cambios en la base de datos** para considerarse completas:
1. Descontar stock de un producto.
2. Crear la factura de cobro.
3. Actualizar el saldo del cliente.

Si el teléfono del usuario se apaga por batería baja en el paso 2, la base de datos quedaría en un estado corrupto (producto descontado, dinero sin cobrar).

Para solucionar esto existen las **transacciones**, agrupadas bajo el estándar **ACID**:
• **A - Atomicidad (*Atomicity*):** La operación es indivisible. O se completan **todos** los pasos o se cancelan **todos**.
• **C - Consistencia (*Consistency*):** La base de datos pasa de un estado válido a otro estado válido, respetando todas las llaves y restricciones.
• **I - Aislamiento (*Isolation*):** Si dos transacciones ocurren al mismo tiempo, no se interfieren entre sí.
• **D - Durabilidad (*Durability*):** Una vez confirmada la transacción, los datos quedan grabados en disco de forma permanente.`,
        codeSnippet: `-- Demostración conceptual de transacción segura\nBEGIN TRANSACTION;\nUPDATE usuarios SET activo = true WHERE id = 1;\nCOMMIT;`,
        outputSnippet: `Operación de transacción BEGIN TRANSACTION ejecutada correctamente.\nFilas actualizadas correctamente en 'usuarios'\nOperación de transacción COMMIT ejecutada correctamente.`,
        byteTip: 'SQLite es una de las bases de datos transaccionales ACID más rápidas y probadas del planeta.',
        pitfallTip: 'No realices transferencias de dinero ni modificaciones enlazadas de varias tablas sin agruparlas en una transacción ACID.',
        keyPoints: [
          'Una transacción agrupa múltiples operaciones en una sola unidad lógica de trabajo.',
          'Atomicidad garantiza que no existan estados a medias.',
          'ACID es el estándar supremo de confiabilidad en la industria de bases de datos.'
        ]
      },
      {
        title: 'Transacciones automáticas en Android con Room',
        explanation: `En Android con Kotlin y Room, puedes envolver cualquier método de tu DAO con la anotación **\`@Transaction\`**:
Room iniciará la transacción con SQLite, ejecutará todos los métodos y, si ocurre cualquier excepción, revertirá todo automáticamente:`,
        codeSnippet: `-- Verificamos el estado del usuario tras la confirmación de la transacción\nSELECT id, nombre, email, activo FROM usuarios WHERE id = 1;`,
        outputSnippet: `+----+--------------+------------------+--------+\n| id | nombre       | email            | activo |\n+----+--------------+------------------+--------+\n| 1  | Ada Lovelace | ada@pioneers.org | true   |\n+----+--------------+------------------+--------+\n1 row in set (0.001 sec)`,
        byteTip: 'En Room, anotar una función con @Transaction garantiza seguridad total en inserciones de entidades padre e hijas al mismo tiempo.',
        pitfallTip: 'Evita transacciones gigantes que duren minutos: en SQLite una transacción abierta bloquea la escritura para otros hilos.',
        keyPoints: [
          'Room facilita el manejo de transacciones con la anotación @Transaction.',
          'Protege la base de datos del teléfono ante reinicios o cierres inesperados.',
          'Garantiza que la información del usuario permanezca siempre íntegra.'
        ]
      }
    ]
  },

  'sql-u12-l05': {
    subtitle: 'Aprende a controlar transacciones manualmente en SQL usando BEGIN, COMMIT y ROLLBACK.',
    analogy: 'El botón de "Deshacer" (Ctrl+Z) de tu editor: inicias un borrador importante (BEGIN); si todo sale bien, lo imprimes en papel oficial (COMMIT); pero si cometiste un error catastrófico, presionas Deshacer (ROLLBACK) y vuelves al estado original intacto.',
    sections: [
      {
        title: 'Control manual con BEGIN, COMMIT y ROLLBACK',
        explanation: `En SQL estándar y SQLite, tienes tres comandos clave para controlar transacciones:

1. **\`BEGIN\`** (o \`BEGIN TRANSACTION\`):
Marca el punto de partida. A partir de este momento, cualquier cambio (\`INSERT\`, \`UPDATE\`, \`DELETE\`) se almacena en un búfer temporal y nadie más fuera de tu conexión los ve como definitivos.

2. **\`COMMIT\`**:
Confirma y graba de manera permanente todos los cambios en el disco de almacenamiento duradero. La transacción termina con éxito.

3. **\`ROLLBACK\`**:
Cancela de inmediato la transacción y **deshace todos los cambios** realizados desde el \`BEGIN\`. La base de datos queda exactamente en el mismo estado en que estaba antes de empezar.`,
        codeSnippet: `-- Caso 1: Transacción exitosa que se consolida con COMMIT\nBEGIN;\nUPDATE estudiantes SET promedio = 9.5 WHERE id = 1;\nCOMMIT;\n\n-- Caso 2: Transacción abortada que se deshace con ROLLBACK\nBEGIN;\nDELETE FROM estudiantes WHERE id = 1;\nROLLBACK;`,
        outputSnippet: `Operación de transacción BEGIN ejecutada correctamente.\nFilas actualizadas correctamente en 'estudiantes'\nOperación de transacción COMMIT ejecutada correctamente.\nOperación de transacción BEGIN ejecutada correctamente.\nRegistros eliminados en tabla 'estudiantes'\nOperación de transacción ROLLBACK ejecutada correctamente.`,
        byteTip: 'Cualquier sentencia individual (como un solo UPDATE) se ejecuta en su propia mini-transacción implícita automática (autocommit) si no abres un BEGIN.',
        pitfallTip: 'Dejar una transacción abierta con BEGIN y olvidar ejecutar COMMIT o ROLLBACK mantendrá la base de datos bloqueada para otros procesos.',
        keyPoints: [
          'BEGIN inicia la zona protegida de trabajo.',
          'COMMIT guarda permanentemente todos los cambios en disco.',
          'ROLLBACK cancela y devuelve los datos a su estado original sin dejar rastros.'
        ]
      },
      {
        title: 'Manejo de errores con bloques try-catch en Kotlin',
        explanation: `En código real de backend o Android, el patrón universal consiste en envolver las operaciones en un bloque \`try-catch\`:
\`database.beginTransaction()\`
\`try {\`
\`  // Pasos críticos de la operación\`
\`  database.setTransactionSuccessful() // Marca para COMMIT\`
\`} finally {\`
\`  database.endTransaction() // Hace ROLLBACK si no fue exitosa\`
\`}\``,
        codeSnippet: `-- Verificamos que el estudiante sigue a salvo gracias al ROLLBACK del borrado\nSELECT id, nombre, promedio FROM estudiantes WHERE id = 1;`,
        outputSnippet: `+----+-----------------+----------+\n| id | nombre          | promedio |\n+----+-----------------+----------+\n| 1  | Valeria Morales | 9.5      |\n+----+-----------------+----------+\n1 row in set (0.001 sec)`,
        byteTip: 'En Kotlin con Room puedes usar database.withTransaction { ... } que maneja automáticamente el BEGIN, COMMIT y ROLLBACK.',
        pitfallTip: 'No uses transacciones para operaciones de solo lectura (SELECTs simples); solo consumen memoria innecesariamente.',
        keyPoints: [
          'El bloque try-catch con ROLLBACK en finally es el estándar de la industria.',
          'Evita la corrupción de datos ante errores imprevistos de red o batería.',
          'Convierte tus aplicaciones en sistemas de grado bancario y empresarial.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 13: BUEN DISEÑO Y SEGURIDAD BÁSICA
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u13-l01': {
    subtitle: 'Comprende los peligros del mal diseño relacional y cómo evitar las anomalías de inserción, actualización y borrado.',
    analogy: 'Escribir el precio de una hamburguesa en 20 páginas de un menú de papel en vez de tener una sola lista de precios: el día que cambies el precio, olvidarás cambiarlo en 3 páginas y los clientes reclamarán precios diferentes.',
    sections: [
      {
        title: 'Los tres peligros del mal diseño: Las anomalías relacionales',
        explanation: `Cuando un principiante diseña una base de datos, suele cometer el error de meter toda la información en una sola tabla gigante y desordenada. Esto genera tres graves problemas conocidos como **anomalías**:

1. **Anomalía de modificación (*Update Anomaly*):**
Si el nombre de una carrera universitaria está repetido en 5,000 filas de estudiantes, cuando la carrera cambie de nombre tendrás que modificar 5,000 filas. Si una sola falla, la base de datos quedará con nombres contradictorios.

2. **Anomalía de inserción (*Insertion Anomaly*):**
Si para registrar una nueva carrera universitaria necesitas obligatoriamente los datos de un estudiante, ¡no podrás crear la carrera hasta que alguien se inscriba en ella!

3. **Anomalía de eliminación (*Deletion Anomaly*):**
Si el único estudiante inscrito en una carrera se da de baja y borras su fila, ¡borrarás accidentalmente toda la existencia de esa carrera en la universidad!`,
        codeSnippet: `-- Buen diseño: carreras identificadas de forma limpia y sin inconsistencias\nSELECT DISTINCT carrera FROM estudiantes;`,
        outputSnippet: `+------------------------+\n| carrera                |\n+------------------------+\n| Ingeniería de Software |\n| Ciencias Computación   |\n| Sistemas Información   |\n| Ciberseguridad         |\n+------------------------+\n4 rows in set (0.002 sec)`,
        byteTip: 'Principio de la Fuente Única de Verdad (Single Source of Truth): cada dato del negocio debe vivir en un único lugar legítimo en toda la base de datos.',
        pitfallTip: 'Evita crear columnas como telefono_1, telefono_2, telefono_3 en una tabla; es un síntoma claro de mal diseño relacional.',
        keyPoints: [
          'Las anomalías de diseño corrompen la fidelidad de los datos.',
          'La duplicación excesiva incrementa el tamaño del archivo de la base de datos.',
          'Separar entidades en tablas dedicadas erradica las tres anomalías.'
        ]
      },
      {
        title: 'El principio de responsabilidad única en tablas',
        explanation: `Cada tabla de tu base de datos debe representar **una sola cosa**:
• Una tabla para \`usuarios\`.
• Una tabla para \`productos\`.
• Una tabla para \`pedidos\`.

Cuando las entidades están bien separadas, actualizar los datos de un cliente se hace en **una sola fila** y de forma instantánea:`,
        codeSnippet: `-- Verificamos la independencia y salud de nuestras entidades maestras\nSELECT COUNT(*) AS total_usuarios FROM usuarios;`,
        outputSnippet: `+----------------+\n| total_usuarios |\n+----------------+\n| 5              |\n+----------------+\n1 row in set (0.001 sec)`,
        byteTip: 'Diseñar entidades limpias en SQLite se traduce en clases Data Class de Kotlin hermosas y fáciles de mantener.',
        pitfallTip: 'No desnormalices tus tablas a menos que tengas un problema de rendimiento comprobado con millones de registros.',
        keyPoints: [
          'Cada tabla debe tener una única responsabilidad bien definida.',
          'Facilita el mantenimiento y la evolución del esquema en el tiempo.',
          'Es el fundamento sobre el que se construye la normalización formal.'
        ]
      }
    ]
  },

  'sql-u13-l02': {
    subtitle: 'Aprende las tres primeras formas normales (1FN, 2FN y 3FN) para estructurar tus tablas como un profesional.',
    analogy: 'Ordenar tu armario de ropa: primero sacas los calcetines sucios del bolsillo de los pantalones (1FN); luego separas la ropa de invierno de la de verano (2FN); y finalmente pones cada prenda en su cajón etiquetado según su tipo (3FN).',
    sections: [
      {
        title: 'Las Tres Formas Normales de las bases de datos relacionales',
        explanation: `La **normalización** es una técnica formal de diseño que organiza las columnas y tablas para eliminar la redundancia:

1. **Primera Forma Normal (1FN) - Valores atómicos:**
• Cada celda debe contener **un solo valor indivisible**.
• Nada de guardar listas de teléfonos separadas por comas (\`'8888-1111, 2222-3333'\`) en una sola celda.
• Nada de columnas repetitivas como \`hijo1\`, \`hijo2\`, \`hijo3\`.

2. **Segunda Forma Normal (2FN) - Dependencia completa de la llave:**
• Cumple con la 1FN.
• Cada columna que no sea llave primaria debe depender de **toda** la llave primaria (aplica especialmente en llaves compuestas).

3. **Tercera Forma Normal (3FN) - Sin dependencias transitivas:**
• Cumple con la 2FN.
• Ninguna columna debe depender de otra columna que no sea la llave primaria.
• *Ejemplo:* Si en una tabla de empleados guardas el \`departamento_id\` y además el \`nombre_departamento\`, el nombre del departamento depende del departamento, no del empleado. Debe mudarse a su propia tabla \`departamentos\`.`,
        codeSnippet: `-- Estructura en 3FN: consultamos los datos relacionados sin redundancia interna\nSELECT e.nombre, a.nombre AS materia, m.nota_final\nFROM estudiantes AS e\nJOIN matriculas AS m ON e.id = m.estudiante_id\nJOIN asignaturas AS a ON m.asignatura_id = a.id\nLIMIT 2;`,
        outputSnippet: `+-----------------+---------------------+------------+\n| nombre          | materia             | nota_final |\n+-----------------+---------------------+------------+\n| Valeria Morales | Bases de Datos I    | 9.5        |\n| Valeria Morales | Programación Kotlin | 9.2        |\n+-----------------+---------------------+------------+\n2 rows in set (0.002 sec)`,
        byteTip: 'La regla de oro de la normalización dice: "Cada columna debe depender de la clave, de toda la clave, y de nada más que de la clave".',
        pitfallTip: 'No te obsesiones con formas normales superiores (4FN o 5FN) en proyectos cotidianos; la 3FN es el estándar de oro en la industria.',
        keyPoints: [
          '1FN exige que cada celda contenga un valor atómico único.',
          '2FN elimina dependencias parciales de claves compuestas.',
          '3FN erradica dependencias transitivas entre columnas no clave.'
        ]
      },
      {
        title: 'Beneficios en el desarrollo de software móvil',
        explanation: `Tener una base de datos en 3FN en Android ofrece ventajas inmediatas:
• El archivo de base de datos de SQLite en el teléfono pesa mucho menos.
• Las actualizaciones son seguras y no dejan registros contradictorios.
• La sincronización con un servidor en la nube (*Cloud Sync*) es limpia y directa.`,
        codeSnippet: `-- Verificamos que las materias están perfectamente normalizadas e independientes\nSELECT id, nombre, creditos, departamento FROM asignaturas LIMIT 3;`,
        outputSnippet: `+-----+----------------------+----------+--------------+\n| id  | nombre               | creditos | departamento |\n+-----+----------------------+----------+--------------+\n| 101 | Bases de Datos I     | 4        | Informática  |\n| 102 | Estructuras de Datos | 5        | Informática  |\n| 103 | Programación Kotlin  | 4        | Informática  |\n+-----+----------------------+----------+--------------+\n3 rows in set (0.002 sec)`,
        byteTip: 'En Room, normalizar tus tablas en 3FN te permite crear entidades @Entity limpias y reutilizables en múltiples pantallas.',
        pitfallTip: 'Guardar JSONs gigantes dentro de columnas TEXT de SQLite a veces es tentador, pero te impide consultar o indexar campos individuales de forma eficiente.',
        keyPoints: [
          'Reduce el consumo de almacenamiento en el dispositivo.',
          'Permite un modelo de objetos limpio en la capa de Kotlin.',
          'Es el estándar universal de calidad en ingeniería de bases de datos.'
        ]
      }
    ]
  },

  'sql-u13-l03': {
    subtitle: 'Aprende a modificar esquemas existentes sin perder los datos de tus usuarios utilizando la sentencia ALTER TABLE.',
    analogy: 'Remodelar una casa: construyes una nueva habitación o pintas la fachada exterior sin tener que demoler los cimientos ni sacar a los habitantes que ya viven adentro.',
    sections: [
      {
        title: 'Evolucionar esquemas sin destruir datos con ALTER TABLE',
        explanation: `Cuando tu aplicación móvil se actualiza y añades una nueva función (por ejemplo, guardar la fecha de nacimiento de los usuarios o un estado booleano de suscripción), **no puedes borrar la tabla** porque los usuarios perderían todos sus datos existentes.

Para modificar la estructura de una tabla que ya existe, usamos la sentencia **\`ALTER TABLE\`**.

En SQLite, \`ALTER TABLE\` permite dos operaciones principales:
1. **\`ADD COLUMN\`**: Agrega una nueva columna a la tabla.
   \`ALTER TABLE usuarios ADD COLUMN telefono TEXT DEFAULT 'Sin teléfono';\`
   Todas las filas existentes recibirán automáticamente el valor por defecto configurado.

2. **\`RENAME TO\`**: Cambia el nombre formal de una tabla.
   \`ALTER TABLE clientes RENAME TO clientes_antiguos;\``,
        codeSnippet: `-- Demostración de agregado de columna sin afectar los registros existentes\nALTER TABLE estudiantes ADD COLUMN observaciones TEXT DEFAULT 'Sin observaciones';\n\nSELECT id, nombre, observaciones FROM estudiantes LIMIT 2;`,
        outputSnippet: `Query OK, 0 rows affected (ALTER TABLE aplicado).\n+----+-----------------+-------------------+\n| id | nombre          | observaciones     |\n+----+-----------------+-------------------+\n| 1  | Valeria Morales | Sin observaciones |\n| 2  | Diego Fernández | Sin observaciones |\n+----+-----------------+-------------------+\n2 rows in set (0.002 sec)`,
        byteTip: 'En SQLite moderno (a partir de la versión 3.35.0), también se soporta ALTER TABLE ... DROP COLUMN para eliminar columnas obsoletas.',
        pitfallTip: 'Al usar ADD COLUMN en SQLite con una restricción NOT NULL, debes proporcionar obligatoriamente un valor DEFAULT; de lo contrario fallará.',
        keyPoints: [
          'ALTER TABLE modifica esquemas vivos sin destruir la información almacenada.',
          'ADD COLUMN añade nuevas propiedades a todas las filas existentes.',
          'RENAME TO permite cambiar el nombre de la tabla de forma instantánea.'
        ]
      },
      {
        title: 'Migraciones de base de datos en Android con Room',
        explanation: `En Android, cuando incrementas la versión de la base de datos (\`version = 2\`), creas un objeto \`Migration\` donde escribes sentencias \`ALTER TABLE\` para actualizar el archivo SQLite en los teléfonos de millones de usuarios sin que pierdan sus preferencias:`,
        codeSnippet: `-- Verificamos el esquema actualizado de la tabla estudiantes\nSELECT id, nombre, carrera, semestre FROM estudiantes LIMIT 1;`,
        outputSnippet: `+----+-----------------+------------------------+----------+\n| id | nombre          | carrera                | semestre |\n+----+-----------------+------------------------+----------+\n| 1  | Valeria Morales | Ingeniería de Software | 4        |\n+----+-----------------+------------------------+----------+\n1 row in set (0.001 sec)`,
        byteTip: 'Room ofrece pruebas automáticas de migración (MigrationTestHelper) para validar que tus ALTER TABLE no rompan la app de tus usuarios.',
        pitfallTip: 'Nunca cambies la versión de Room sin proporcionar una estrategia de migración; de lo contrario Room borrará y recreará las tablas por defecto perdiendo los datos.',
        keyPoints: [
          'ALTER TABLE es la columna vertebral de las migraciones de software.',
          'Garantiza que la evolución de tu app sea suave y transparente.',
          'Preserva los datos históricos del usuario entre versiones.'
        ]
      }
    ]
  },

  'sql-u13-l04': {
    subtitle: 'Aprende a eliminar tablas de forma definitiva con DROP TABLE y cómo usar IF EXISTS para evitar caídas en scripts.',
    analogy: 'Demoler un edificio viejo y limpiar el terreno con una topadora: el terreno queda completamente limpio y vacío, listo para una nueva construcción.',
    sections: [
      {
        title: 'Eliminación irreversible con DROP TABLE',
        explanation: `Cuando una tabla temporal o de pruebas ya no se necesita, la instrucción **\`DROP TABLE\`** la elimina por completo de la base de datos:
• Elimina todos los datos contenidos.
• Elimina la estructura de columnas y tipos.
• Elimina los índices y restricciones asociados a esa tabla.
• Borra su definición del catálogo maestro de SQLite (\`sqlite_master\`).

Uso defensivo con **\`IF EXISTS\`**:
Si intentas hacer \`DROP TABLE\` de una tabla que no existe, SQLite arrojará un error que detendrá la ejecución de tu script.
Para evitarlo, añade siempre la cláusula preventiva:
\`DROP TABLE IF EXISTS nombre_tabla;\``,
        codeSnippet: `-- Eliminación segura y condicional de una tabla temporal\nDROP TABLE IF EXISTS tabla_temporal_logs;\n\nSELECT 'Tabla temporal descartada de forma segura' AS estado;`,
        outputSnippet: `Query OK, 0 rows affected (DROP TABLE ejecutado).\n+------------------------------------------------+\n| estado                                         |\n+------------------------------------------------+\n| Tabla temporal descartada de forma segura      |\n+------------------------------------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'DROP TABLE IF EXISTS es la primera línea que se coloca al inicio de scripts de pruebas automatizadas para garantizar un entorno limpio.',
        pitfallTip: 'DROP TABLE no tiene papelera de reciclaje: una vez ejecutado, no hay comando "undo"; si no tienes una copia de seguridad (backup), la pérdida es definitiva.',
        keyPoints: [
          'DROP TABLE destruye la tabla, sus datos y sus índices asociados.',
          'IF EXISTS previene excepciones si la tabla ya había sido borrada antes.',
          'Es una sentencia DDL (Data Definition Language) de alto impacto.'
        ]
      },
      {
        title: 'Recreación de esquemas en pruebas unitarias',
        explanation: `En entornos de prueba (Unit Tests en Android con Robolectric o bases de datos SQLite en memoria), es común ejecutar \`DROP TABLE IF EXISTS\` y luego un \`CREATE TABLE\` para asegurarse de que cada prueba corra sobre un lienzo completamente limpio:`,
        codeSnippet: `-- Verificamos que nuestras tablas principales siguen intactas y saludables\nSELECT name FROM sqlite_master WHERE type='table' AND name IN ('usuarios', 'estudiantes');`,
        outputSnippet: `+-------------+\n| name        |\n+-------------+\n| usuarios    |\n| estudiantes |\n+-------------+\n2 rows in set (0.001 sec)`,
        byteTip: 'En pruebas unitarias en Android, crear una base de datos en memoria (Room.inMemoryDatabaseBuilder) garantiza que se destruya sola al terminar el test.',
        pitfallTip: 'Si tienes llaves foráneas activas, SQLite impedirá hacer DROP TABLE de una tabla padre si todavía existen tablas hijas que dependan de ella.',
        keyPoints: [
          'Permite limpiar tablas de prueba y migración.',
          'Respeta las restricciones de llaves foráneas si están activas.',
          'Es un comando fundamental en el ciclo de vida del desarrollo.'
        ]
      }
    ]
  },

  'sql-u13-l05': {
    subtitle: 'Aprende a acelerar tus búsquedas al máximo con índices (CREATE INDEX) y a simplificar consultas complejas con vistas (CREATE VIEW).',
    analogy: 'Un índice es el índice analítico al final de un libro de mil páginas: vas directo a la página exacta sin tener que leer el libro entero. Una vista es una ventana con marco en la pared que enfoca solo un paisaje hermoso, ocultando el cableado de la casa.',
    sections: [
      {
        title: 'Acelerar lecturas al instante con índices (CREATE INDEX)',
        explanation: `Por defecto, si buscas un usuario por su correo electrónico en una tabla de un millón de filas sin índice:
\`SELECT * FROM usuarios WHERE email = 'ada@pioneers.org';\`
SQLite tiene que hacer un **recorrido completo de la tabla (*Full Table Scan*)**, leyendo un millón de registros uno por uno. Esto consume batería y hace lenta la aplicación móvil.

Un **índice** crea una estructura de datos ordenada en disco (generalmente un Árbol-B) que permite al motor encontrar la fila exacta en tiempo logarítmico **O(log N)** en cuestión de microsegundos:

\`CREATE INDEX idx_usuarios_email ON usuarios(email);\`

¿Cuándo crear índices?
• En columnas que uses frecuentemente en cláusulas \`WHERE\`.
• En columnas de llaves foráneas que uses en \`JOIN\`.
• En columnas que uses en \`ORDER BY\`.`,
        codeSnippet: `-- Búsqueda ultrarrápida indexada por carrera o categoría\nSELECT id, nombre, carrera\nFROM estudiantes\nWHERE carrera = 'Ingeniería de Software';`,
        outputSnippet: `+----+-----------------+------------------------+\n| id | nombre          | carrera                |\n+----+-----------------+------------------------+\n| 1  | Valeria Morales | Ingeniería de Software |\n| 5  | Lucía Navarro   | Ingeniería de Software |\n+----+-----------------+------------------------+\n2 rows in set (0.001 sec)`,
        byteTip: 'Las llaves primarias (PRIMARY KEY) y las restricciones UNIQUE ya crean un índice interno automáticamente.',
        pitfallTip: 'No crees índices en todas las columnas sin motivo: cada índice hace que los INSERT y UPDATE sean un poco más lentos porque deben actualizar el árbol en disco.',
        keyPoints: [
          'CREATE INDEX acelera las consultas WHERE y JOIN drásticamente.',
          'Transforma búsquedas secuenciales lentas en búsquedas logarítmicas inmediatas.',
          'Debe usarse de forma estratégica en columnas de alta consulta.'
        ]
      },
      {
        title: 'Encapsular complejidad con vistas (CREATE VIEW)',
        explanation: `Una **vista** es una tabla virtual basada en el resultado de una consulta \`SELECT\`. No almacena datos duplicados físicamente; cada vez que consultas la vista, SQLite ejecuta la consulta subyacente.

Permite guardar una consulta compleja con múltiples \`JOINs\` y alias bajo un nombre sencillo:
\`CREATE VIEW vista_reporte_alumnos AS\`
\`SELECT e.nombre, a.nombre AS materia, m.nota_final\`
\`FROM estudiantes e JOIN matriculas m ...;\`

A partir de ese momento, tus desarrolladores pueden consultar la vista como si fuera una tabla normal:
\`SELECT * FROM vista_reporte_alumnos WHERE nota_final >= 9.0;\``,
        codeSnippet: `-- Consulta limpia simulando la lectura simplificada de una vista\nSELECT e.nombre AS estudiante, m.nota_final\nFROM estudiantes AS e\nJOIN matriculas AS m ON e.id = m.estudiante_id\nWHERE m.nota_final >= 9.5;`,
        outputSnippet: `+-----------------+------------+\n| estudiante      | nota_final |\n+-----------------+------------+\n| Valeria Morales | 9.5        |\n| Camila Gómez    | 9.8        |\n+-----------------+------------+\n2 rows in set (0.001 sec)`,
        byteTip: 'En Room con Android, puedes usar la anotación @DatabaseView para mapear consultas complejas directamente a data classes de Kotlin.',
        pitfallTip: 'Una vista básica no acelera las consultas por sí misma; solo simplifica la escritura del código.',
        keyPoints: [
          'Las vistas encapsulan consultas complejas con múltiples uniones.',
          'Proporcionan una capa de abstracción y seguridad sobre las tablas maestras.',
          'Son soportadas de forma nativa en Room mediante @DatabaseView.'
        ]
      }
    ]
  },

  'sql-u13-l06': {
    subtitle: 'Comprende la vulnerabilidad más peligrosa en bases de datos (SQL Injection) y cómo las consultas parametrizadas la neutralizan al 100%.',
    analogy: 'Un pasajero de avión intentando abordar con un boleto falso donde escribió: "Permítanme entrar a la cabina del piloto": el guardia de seguridad no ejecuta el texto del boleto como una orden; lo trata como simple texto impreso.',
    sections: [
      {
        title: 'La pesadilla de la inyección SQL: ¿Cómo ocurre?',
        explanation: `La **inyección SQL (*SQL Injection*)** es la vulnerabilidad de ciberseguridad más célebre y destructiva en la historia del software.

Ocurre cuando un programador novato **concatena cadenas de texto del usuario** directamente dentro de una sentencia SQL:
\`// CÓDIGO VULNERABLE (¡NUNCA HAGAS ESTO!)\`
\`val sql = "SELECT * FROM usuarios WHERE email = '" + emailIngresado + "'"\`

Si un atacante malicioso escribe en el campo de texto:
\`nada' OR '1'='1\`
La sentencia resultante que recibe SQLite será:
\`SELECT * FROM usuarios WHERE email = 'nada' OR '1'='1'\`
Como \`'1'='1'\` siempre es verdadero (\`true\`), ¡la base de datos devolverá todos los usuarios y contraseñas del sistema sin pedir credenciales!`,
        codeSnippet: `-- Consulta segura: buscando un usuario específico por su ID\nSELECT id, nombre, email, activo\nFROM usuarios\nWHERE id = 1;`,
        outputSnippet: `+----+--------------+------------------+--------+\n| id | nombre       | email            | activo |\n+----+--------------+------------------+--------+\n| 1  | Ada Lovelace | ada@pioneers.org | true   |\n+----+--------------+------------------+--------+\n1 row in set (0.001 sec)`,
        byteTip: 'Regla de oro de la ciberseguridad: NUNCA confíes en los datos del usuario; nunca concatenes texto para armar SQL.',
        pitfallTip: 'Intentar limpiar las comillas manualmente con replace("\'", "") no es suficiente: los atacantes conocen decenas de formas de evadir filtros manuales.',
        keyPoints: [
          'SQL Injection ocurre por concatenar texto del usuario en sentencias SQL.',
          'Permite a un atacante saltarse contraseñas, robar o destruir la base de datos.',
          'Es una vulnerabilidad crítica clasificada en el top del OWASP.'
        ]
      },
      {
        title: 'La cura definitiva: Consultas parametrizadas (Prepared Statements)',
        explanation: `La solución definitiva, estándar y universalmente segura es usar **consultas preparadas con parámetros** (representados por el signo de interrogación **\`?\`** o parámetros con dos puntos **\`:param\`**):

\`// EN ANDROID CON SQLITE NATIVO (100% SEGURO):\`
\`db.rawQuery("SELECT * FROM usuarios WHERE email = ? AND password = ?", arrayOf(email, pass))\`

\`// EN ANDROID CON ROOM (100% SEGURO Y COMPILADO):\`
\`@Query("SELECT * FROM usuarios WHERE email = :email AND password = :pass")\`
\`fun login(email: String, pass: String): Usuario?\`

¿Por qué es invulnerable?
Porque el motor de base de datos compila la estructura de la consulta **antes** de recibir los valores. El texto ingresado por el usuario se trata estrictamente como un dato plano literal, jamás como código ejecutable. Si el atacante escribe \`' OR '1'='1\`, SQLite buscará literalmente a un usuario cuyo correo sea exactamente esa frase sin causarle ningún daño al sistema.`,
        codeSnippet: `-- Consulta parametrizada conceptual: los datos se aíslan completamente de la lógica\nSELECT id, nombre, email\nFROM usuarios\nWHERE email = 'ada@pioneers.org' AND activo = true;`,
        outputSnippet: `+----+--------------+------------------+\n| id | nombre       | email            |\n+----+--------------+------------------+\n| 1  | Ada Lovelace | ada@pioneers.org |\n+----+--------------+------------------+\n1 row in set (0.001 sec)`,
        byteTip: 'Room en Android usa consultas parametrizadas por defecto en todas sus anotaciones @Query; te protege automáticamente.',
        pitfallTip: 'Cuidado con crear consultas dinámicas uniendo Strings incluso dentro de librerías modernas; usa siempre bind variables (?, :variable).',
        keyPoints: [
          'Las consultas preparadas separan la sintaxis SQL de los datos del usuario.',
          'El motor trata la entrada del atacante como un simple valor de texto inocuo.',
          'Room y SQLite proporcionan inmunidad total contra SQL Injection cuando se usan parámetros.'
        ]
      }
    ]
  }
};
