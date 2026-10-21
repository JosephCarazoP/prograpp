// Módulo de teoría enriquecida para SQL: Unidades 7 y 8
// Redactado en español latinoamericano (es-419) con tono claro, amigable y pedagógico
// Siguiendo los estándares oficiales de Android Developers (SQLite y Room)

export const SQL_THEORY_U07_U08 = {
  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 7: FILTROS, BÚSQUEDAS Y ORDENAMIENTO
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u07-l01': {
    subtitle: 'Filtra filas con precisión quirúrgica usando la cláusula WHERE y operadores de comparación.',
    analogy: 'Un guardia en la entrada de un club exclusivo: solo deja pasar a las personas que cumplen una condición estricta ("edad >= 18 años"). Quienes no cumplen la condición se quedan afuera de la lista.',
    sections: [
      {
        title: 'Filtrado de datos con la cláusula WHERE',
        explanation: `Por defecto, un \`SELECT\` te devuelve todas las filas que existen en la tabla. Pero en aplicaciones reales casi siempre necesitas ver solo una parte:
• Los productos de una categoría específica.
• Los usuarios activos de un país.
• Las ventas de hoy.

Para filtrar qué filas se incluyen en el resultado, usamos la cláusula **\`WHERE\`**:
\`SELECT columnas FROM tabla WHERE condicion;\`

La condición se evalúa fila por fila: si es **\`true\`**, la fila se incluye en el resultado; si es \`false\`, se descarta.

Operadores de comparación estándar en SQL:
• \`=\` (Igual a)
• \`!=\` o \`<>\` (Diferente de)
• \`<\`, \`<=\` (Menor que, menor o igual)
• \`>\`, \`>=\` (Mayor que, mayor o igual)`,
        codeSnippet: `-- Filtramos productos cuyo precio sea menor a $50 dólares\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE precio < 50.0;`,
        byteTip: 'En SQL, la comparación de igualdad usa UN SOLO signo igual (=), a diferencia de Kotlin que usa dos (==).',
        pitfallTip: 'Cuidado con olvidar las comillas simples al comparar textos: WHERE pais = \'Finlandia\', no WHERE pais = Finlandia.',
        keyPoints: [
          'WHERE filtra filas antes de proyectar el resultado en pantalla.',
          'Usa operadores relacionales (=, !=, <, >, <=, >=).',
          'Solo se entregan al usuario las filas donde la condición resulta true.'
        ]
      },
      {
        title: 'Búsquedas de texto exacto',
        explanation: `Para comparar cadenas de texto exactas, escribe el valor entre comillas simples:`,
        codeSnippet: `-- Consultamos los empleados que pertenecen a la división de Dirección\nSELECT id, nombre, salario\nFROM empleados\nWHERE departamento = 'Dirección';`,
        outputSnippet: `+-----+---------------+---------+\n| id  | nombre        | salario |\n+-----+---------------+---------+\n| 104 | Sofía Valerio | 4500.0  |\n+-----+---------------+---------+\n1 fila devuelta`,
        byteTip: 'En SQLite las comparaciones de texto en columnas estándar con WHERE = son insensibles a mayúsculas para caracteres ASCII comunes.',
        pitfallTip: 'No uses = para comparar nulos; para nulos se usa IS NULL.',
        keyPoints: [
          "WHERE columna = 'texto' busca coincidencias directas.",
          'Acelera las respuestas al no traer información irrelevante a la app.',
          'Es el filtro más utilizado en pantallas de detalle de registros.'
        ]
      }
    ]
  },

  'sql-u07-l02': {
    subtitle: 'Combina múltiples condiciones con los operadores lógicos AND, OR y NOT.',
    analogy: 'Comprar un boleto de cine con descuento: calificas si eres estudiante Y es día miércoles (AND). O calificas si es tu cumpleaños O tienes membresía dorada (OR).',
    sections: [
      {
        title: 'Operadores lógicos: AND, OR y NOT en SQL',
        explanation: `Al igual que en Kotlin, en SQL puedes construir filtros avanzados combinando condiciones con operadores lógicos:

• **\`AND\`**: Exige que **todas** las condiciones se cumplan simultáneamente.
• **\`OR\`**: Exige que **al menos una** de las condiciones se cumpla.
• **\`NOT\`**: Invierte la condición (trae las filas que **no** cumplen la regla).`,
        codeSnippet: `-- Filtramos productos que sean de 'Hardware' Y que cuesten menos de $60\nSELECT id, nombre, categoria, precio\nFROM productos\nWHERE categoria = 'Hardware' AND precio < 60.0;`,
        outputSnippet: `+----+----------------------+-----------+--------+\n| id | nombre               | categoria | precio |\n+----+----------------------+-----------+--------+\n| 3  | Mouse Ergonómico Pro | Hardware  | 49.9   |\n+----+----------------------+-----------+--------+\n1 fila devuelta`,
        byteTip: 'En SQL se escriben las palabras completas AND, OR, NOT en lugar de los símbolos &&, ||, ! de Kotlin.',
        pitfallTip: 'Confundir AND con OR puede hacer que tu consulta devuelva cero filas o que devuelva casi toda la tabla por error.',
        keyPoints: [
          'AND une condiciones donde ambas deben ser verdaderas.',
          'OR une condiciones alternativas donde basta una verdadera.',
          'NOT excluye los registros que cumplan la condición indicada.'
        ]
      },
      {
        title: 'Múltiples categorías con OR',
        explanation: `Si un usuario selecciona en tu app ver productos de Audio o de Pantallas, usamos \`OR\`:`,
        codeSnippet: `-- Productos de Audio o Pantallas\nSELECT id, nombre, categoria, precio\nFROM productos\nWHERE categoria = 'Audio' OR categoria = 'Pantallas';`,
        outputSnippet: `+----+------------------------------+-----------+--------+\n| id | nombre                       | categoria | precio |\n+----+------------------------------+-----------+--------+\n| 2  | Monitor Ultrawide 34"        | Pantallas | 429.5  |\n| 4  | Auriculares Cancelación Ruido| Audio     | 129.0  |\n+----+------------------------------+-----------+--------+\n2 filas devueltas`,
        byteTip: "En la lección 5 verás que WHERE categoria IN ('Audio', 'Pantallas') es una forma más corta de escribir múltiples OR.",
        pitfallTip: "No escribas WHERE categoria = 'Audio' OR 'Pantallas'; debes repetir el nombre de la columna en cada lado del OR.",
        keyPoints: [
          'OR permite ampliar el rango de resultados coincidentes.',
          'Cada rama del OR debe ser una expresión condicional completa.',
          'Fundamental para filtros de selección múltiple en tiendas móviles.'
        ]
      }
    ]
  },

  'sql-u07-l03': {
    subtitle: 'Evita ambigüedades lógicas agrupando condiciones complejas con paréntesis obligatorios.',
    analogy: 'En una rifa escolar: "Ganan premio los alumnos de Quinto grado Y que tengan promedio mayor a 9, O los que sean presidentes de clase". Sin paréntesis, no sabes si los presidentes deben ser de Quinto grado o pueden ser de cualquier grado.',
    sections: [
      {
        title: 'Precedencia lógica y uso de paréntesis en WHERE',
        explanation: `En SQL, el operador **\`AND\` tiene mayor precedencia que \`OR\`** (se evalúa primero, similar a la multiplicación frente a la suma).

Si mezclas \`AND\` y \`OR\` en la misma consulta sin paréntesis, el motor podría interpretar algo completamente diferente a lo que tú tenías en mente.

**Regla de oro indiscutible:**
Cuando mezcles \`AND\` y \`OR\`, **agrupa siempre con paréntesis \`()\`** para dejar tu intención clara y explícita tanto para la máquina como para tus compañeros de equipo.`,
        codeSnippet: `-- Agrupamos con paréntesis: (Audio O Hardware) Y con stock disponible mayor a 30\nSELECT id, nombre, categoria, stock\nFROM productos\nWHERE (categoria = 'Audio' OR categoria = 'Hardware') AND stock > 30;`,
        outputSnippet: `+----+----------------------+-----------+-------+\n| id | nombre               | categoria | stock |\n+----+----------------------+-----------+-------+\n| 1  | Teclado Mecánico RGB | Hardware  | 45    |\n| 3  | Mouse Ergonómico Pro | Hardware  | 80    |\n+----+----------------------+-----------+-------+\n2 filas devueltas`,
        byteTip: 'Los paréntesis fuerzan a que la opción de categorías se resuelva primero, y luego se aplique el filtro de stock.',
        pitfallTip: 'Sin los paréntesis, la consulta buscaría todos los de Audio sin importar su stock, más los de Hardware con stock > 30.',
        keyPoints: [
          'AND se evalúa antes que OR por orden de precedencia estándar.',
          'Los paréntesis garantizan el orden lógico deseado.',
          'Eliminan ambigüedades en filtros de seguridad y búsqueda avanzada.'
        ]
      },
      {
        title: 'Filtros de acceso por país y estado',
        explanation: `Mira cómo garantizar que solo usuarios activos de ciertos países específicos puedan participar en un concurso:`,
        codeSnippet: `-- Usuarios activos que residen en Reino Unido o Finlandia\nSELECT id, nombre, pais, activo\nFROM usuarios\nWHERE activo = true AND (pais = 'Reino Unido' OR pais = 'Finlandia');`,
        outputSnippet: `+----+----------------+-------------+--------+\n| id | nombre         | pais        | activo |\n+----+----------------+-------------+--------+\n| 1  | Ada Lovelace   | Reino Unido | true   |\n| 2  | Alan Turing    | Reino Unido | true   |\n| 4  | Linus Torvalds | Finlandia   | true   |\n+----+----------------+-------------+--------+\n3 filas devueltas`,
        byteTip: 'Colocar activo = true al inicio aclara de inmediato que los inactivos quedan fuera.',
        pitfallTip: 'Verifica siempre que la cantidad de paréntesis de apertura coincida con la de cierre.',
        keyPoints: [
          'Los paréntesis aíslan subgrupos lógicos de condiciones.',
          'Hacen que las consultas complejas sean fáciles de auditar.',
          'Son una práctica recomendada en cualquier proyecto Android.'
        ]
      }
    ]
  },

  'sql-u07-l04': {
    subtitle: 'Filtra intervalos continuos de números y fechas de forma limpia con el operador BETWEEN.',
    analogy: 'Un control de estatura para una atracción de feria: "Aceptamos personas con estatura ENTRE 1.20 y 1.90 metros". No tienes que decir "mayor que 1.20 Y menor que 1.90"; dices "entre 1.20 y 1.90".',
    sections: [
      {
        title: 'El operador BETWEEN para rangos continuos',
        explanation: `Para verificar si un valor se encuentra dentro de un rango cerrado, la forma tradicional requería dos comparaciones unidas por AND:
\`WHERE precio >= 50.0 AND precio <= 150.0\`

SQL ofrece el operador **\`BETWEEN\`** (que en inglés significa "entre"):
\`WHERE columna BETWEEN valor_minimo AND valor_maximo;\`

• **Es inclusivo:** Incluye tanto el valor mínimo como el máximo en el resultado.
• Funciona con números enteros, decimales y fechas.
• También puedes usar **\`NOT BETWEEN\`** para buscar valores que queden por fuera de ese intervalo.`,
        codeSnippet: `-- Consultamos productos con precios entre $40 y $130 inclusive\nSELECT id, nombre, precio\nFROM productos\nWHERE precio BETWEEN 40.0 AND 130.0\nORDER BY precio ASC;`,
        outputSnippet: `+----+------------------------------+--------+\n| id | nombre                       | precio |\n+----+------------------------------+--------+\n| 3  | Mouse Ergonómico Pro         | 49.9   |\n| 1  | Teclado Mecánico RGB         | 89.99  |\n| 4  | Auriculares Cancelación Ruido| 129.0  |\n+----+------------------------------+--------+\n3 filas devueltas`,
        byteTip: 'En BETWEEN primero debes escribir el valor menor y luego el mayor (BETWEEN 40 AND 130). Si los inviertes, dará 0 filas.',
        pitfallTip: 'Recuerda que BETWEEN incluye los extremos. Si quieres excluir los límites exactos, usa los operadores estrictos > y <.',
        keyPoints: [
          'BETWEEN min AND max comprueba rangos inclusivos.',
          'Hace el código mucho más legible y elegante que dos comparaciones con AND.',
          'NOT BETWEEN selecciona lo que esté fuera del intervalo.'
        ]
      },
      {
        title: 'Rangos de fechas históricas con BETWEEN',
        explanation: `El operador \`BETWEEN\` es la forma estándar de consultar ventas o contrataciones dentro de un año o mes específico:`,
        codeSnippet: `-- Consultamos empleados contratados durante los años 2021 y 2022\nSELECT nombre, fecha_ingreso, departamento\nFROM empleados\nWHERE fecha_ingreso BETWEEN '2021-01-01' AND '2022-12-31';`,
        outputSnippet: `+----------------+---------------+--------------+\n| nombre         | fecha_ingreso | departamento |\n+----------------+---------------+--------------+\n| Carlos Mendoza | 2022-03-15    | Ingeniería   |\n| Elena Rostova  | 2021-08-01    | Diseño UX    |\n+----------------+---------------+--------------+\n2 filas devueltas`,
        byteTip: 'Al usar fechas en formato ISO "AAAA-MM-DD", BETWEEN opera con total precisión cronológica.',
        pitfallTip: 'Si la columna tiene hora (TIMESTAMP), usar "2022-12-31" se interpretará como las 00:00:00 de ese día.',
        keyPoints: [
          'BETWEEN es ideal para reportes contables mensuales y anuales.',
          'Aprovecha los índices de rango del motor SQLite.',
          'Facilita la creación de filtros de fechas en calendarios móviles.'
        ]
      }
    ]
  },

  'sql-u07-l05': {
    subtitle: 'Comprueba si un valor coincide con cualquiera de una lista de opciones con el operador IN.',
    analogy: 'Una lista de invitados VIP en la puerta de un evento: el portero revisa si tu nombre está DENTRO (IN) de la lista de invitados autorizados. No tiene que hacer una llamada telefónica por cada persona, solo revisa la lista.',
    sections: [
      {
        title: 'El operador IN para listas de valores',
        explanation: `Si necesitas comprobar si una columna coincide con cualquiera de varias opciones válidas, escribir múltiples \`OR\` se vuelve repetitivo y engorroso:
\`WHERE pais = 'Costa Rica' OR pais = 'México' OR pais = 'España' OR pais = 'Colombia'\`

El operador **\`IN\`** simplifica esto radicalmente:
\`WHERE columna IN (valor1, valor2, valor3...)\`

• Es limpio, compacto y fácil de leer.
• También puedes usar **\`NOT IN\`** para excluir una lista entera de opciones.
• En la Unidad 11 aprenderás que adentro del \`IN(...)\` puedes meter otra consulta entera (subconsulta).`,
        codeSnippet: `-- Consultamos estudiantes que pertenecen a dos carreras específicas con IN\nSELECT id, nombre, carrera, promedio\nFROM estudiantes\nWHERE carrera IN ('Ingeniería de Software', 'Ciberseguridad');`,
        outputSnippet: `+----+-----------------+------------------------+----------+\n| id | nombre          | carrera                | promedio |\n+----+-----------------+------------------------+----------+\n| 1  | Valeria Morales | Ingeniería de Software | 9.4      |\n| 4  | Javier Ramos    | Ciberseguridad         | 8.2      |\n| 5  | Lucía Navarro   | Ingeniería de Software | 9.1      |\n+----+-----------------+------------------------+----------+\n3 filas devueltas`,
        byteTip: 'En Android con Room, puedes pasar directamente una lista de Kotlin a un IN: WHERE id IN (:listaIds). ¡Room lo hace automático!',
        pitfallTip: 'Cuidado con NOT IN si la lista contiene valores NULL; la lógica de SQL puede hacer que la consulta devuelva cero filas inesperadamente.',
        keyPoints: [
          'IN (v1, v2, v3) sustituye largas cadenas de condiciones OR.',
          'Acepta números, textos y listas dinámicas.',
          'NOT IN descarta los registros que coincidan con la lista.'
        ]
      },
      {
        title: 'Búsqueda de múltiples IDs de productos',
        explanation: `Cuando el usuario carga su pantalla de favoritos a partir de una lista de identificadores guardados:`,
        codeSnippet: `-- Consultamos productos específicos por sus llaves primarias en una sola consulta\nSELECT id, nombre, precio\nFROM productos\nWHERE id IN (1, 3, 5);`,
        outputSnippet: `+----+------------------------+--------+\n| id | nombre                 | precio |\n+----+------------------------+--------+\n| 1  | Teclado Mecánico RGB   | 89.99  |\n| 3  | Mouse Ergonómico Pro   | 49.9   |\n| 5  | Cable HDMI 2.1 Braided | 14.99  |\n+----+------------------------+--------+\n3 filas devueltas`,
        byteTip: 'Hacer una sola consulta WHERE id IN (1, 3, 5) es infinitamente más rápido que hacer tres consultas individuales separadas.',
        pitfallTip: 'No uses listas de más de 1000 elementos dentro de un IN en SQLite; divídelas en lotes si son masivas.',
        keyPoints: [
          'IN recupera múltiples registros clave en una sola ida y vuelta a la base de datos.',
          'Reduce drásticamente la latencia en pantallas móviles.',
          'Se integra de forma nativa con colecciones de Kotlin en Room.'
        ]
      }
    ]
  },

  'sql-u07-l06': {
    subtitle: 'Busca patrones y coincidencias parciales de texto con LIKE y los comodines % y _.',
    analogy: 'El buscador de tu teléfono: escribes "mar" y el sistema te sugiere "Marcos", "María", "Maratón" y "Gramática". El comodín % representa "cualquier texto que siga después".',
    sections: [
      {
        title: 'Búsquedas por patrón con LIKE y comodines',
        explanation: `El operador \`=\` solo encuentra textos que sean 100% idénticos. Pero en un buscador de tienda o agenda, el usuario rara vez escribe el nombre completo exacto; escribe un fragmento.

Para búsquedas parciales usamos el operador **\`LIKE\`** junto con dos **comodines**:

1. **\`%\` (Porcentaje):** Representa **cero, uno o infinitos caracteres** cualesquiera.
   • \`'And%'\`: Empieza con "And" (ej: Android, Andrés, Andromeda).
   • \`'%com'\`: Termina con "com" (ej: dotcom, correo.com).
   • **\`'%palabra%'\`**: Contiene "palabra" en cualquier parte del texto.

2. **\`_\` (Guión bajo):** Representa **exactamente un solo carácter** cualquiera.
   • \`'C_sa'\`: Coincide con Casa, Cosa, Cisa (4 letras exactas).`,
        codeSnippet: `-- Buscamos productos que contengan la palabra 'Pro' en cualquier parte de su nombre\nSELECT id, nombre, precio\nFROM productos\nWHERE nombre LIKE '%Pro%';`,
        outputSnippet: `+----+----------------------+--------+\n| id | nombre               | precio |\n+----+----------------------+--------+\n| 3  | Mouse Ergonómico Pro | 49.9   |\n+----+----------------------+--------+\n1 fila devuelta`,
        byteTip: 'En SQLite, LIKE no distingue entre mayúsculas y minúsculas para caracteres comunes en inglés ("%pro%" encuentra "Pro").',
        pitfallTip: 'Una búsqueda LIKE "%texto%" con comodín al principio no puede usar índices tradicionales en tablas con millones de filas.',
        keyPoints: [
          'LIKE permite realizar búsquedas de texto aproximadas.',
          '% sustituye cualquier cantidad de caracteres.',
          '_ sustituye exactamente un solo carácter.'
        ]
      },
      {
        title: 'Filtros de correos y dominios institucionales',
        explanation: `Mira cómo encontrar a todos los empleados o usuarios que pertenecen a un dominio institucional de gobierno o universidad:`,
        codeSnippet: `-- Buscamos usuarios cuyo correo termine en '.org'\nSELECT id, nombre, email\nFROM usuarios\nWHERE email LIKE '%.org';`,
        outputSnippet: `+----+----------------+--------------------+\n| id | nombre         | email              |\n+----+----------------+--------------------+\n| 1  | Ada Lovelace   | ada@pioneers.org   |\n| 2  | Alan Turing    | alan@bletchley.org |\n| 4  | Linus Torvalds | linus@linux.org    |\n+----+----------------+--------------------+\n3 filas devueltas`,
        byteTip: 'LIKE "%.org" filtra rápidamente extensiones de correo y protocolos web.',
        pitfallTip: 'Si quieres buscar el símbolo % literal como texto, debes definir un carácter de escape con ESCAPE.',
        keyPoints: [
          'LIKE es la base de las barras de búsqueda en aplicaciones móviles.',
          'Permite validar extensiones de archivos y formatos de correo.',
          'Se combina fluidamente con AND y OR para filtros avanzados.'
        ]
      }
    ]
  },

  'sql-u07-l07': {
    subtitle: 'Aprende a consultar y filtrar valores nulos de forma correcta con IS NULL e IS NOT NULL.',
    analogy: 'Un inspector de aduanas que revisa pasaportes: separa los pasaportes que TIENEN sello de visa (IS NOT NULL) de los que NO TIENEN ningún sello estampado en sus hojas (IS NULL).',
    sections: [
      {
        title: 'Consultar nulos con IS NULL e IS NOT NULL',
        explanation: `Como aprendiste en la Unidad 4, el valor \`NULL\` representa ausencia de dato. En la lógica de SQL, \`NULL\` no es igual a nada, ni siquiera a otro \`NULL\`.

Por esta razón matemática:
✖ \`WHERE columna = NULL\` **NUNCA funciona** (devuelve cero filas siempre).

La única forma oficial y correcta de consultar nulos es:
• **\`IS NULL\`**: Trae las filas donde esa columna está vacía o sin asignar.
• **\`IS NOT NULL\`**: Trae las filas donde la columna tiene algún dato real registrado.`,
        codeSnippet: `-- Consultamos usuarios que SÍ tienen correo electrónico registrado válido\nSELECT id, nombre, email\nFROM usuarios\nWHERE email IS NOT NULL;`,
        outputSnippet: `+----+-------------------+--------------------+\n| id | nombre            | email              |\n+----+-------------------+--------------------+\n| 1  | Ada Lovelace      | ada@pioneers.org   |\n| 2  | Alan Turing       | alan@bletchley.org |\n| 3  | Grace Hopper      | grace@navy.mil     |\n| 4  | Linus Torvalds    | linus@linux.org    |\n| 5  | Margaret Hamilton | margaret@nasa.gov  |\n+----+-------------------+--------------------+\n5 filas devueltas`,
        byteTip: 'IS NULL e IS NOT NULL son palabras clave estándar en todos los motores SQL del mundo.',
        pitfallTip: 'El error más común de principiantes en exámenes de SQL es escribir = NULL en lugar de IS NULL.',
        keyPoints: [
          'IS NULL comprueba la ausencia de dato de forma segura.',
          'IS NOT NULL comprueba la presencia de un valor real.',
          'Jamás utilices los operadores = o != para comparar contra NULL.'
        ]
      },
      {
        title: 'Detectar registros pendientes de asignación',
        explanation: `En sistemas de entrega o préstamos, los registros con \`fecha_entrega IS NULL\` representan las órdenes que todavía están en camino:`,
        codeSnippet: `-- Encontrar usuarios activos con datos completos de país\nSELECT id, nombre, pais\nFROM usuarios\nWHERE pais IS NOT NULL AND activo = true;`,
        outputSnippet: `+----+-------------------+----------------+\n| id | nombre            | pais           |\n+----+-------------------+----------------+\n| 1  | Ada Lovelace      | Reino Unido    |\n| 2  | Alan Turing       | Reino Unido    |\n| 4  | Linus Torvalds    | Finlandia      |\n| 5  | Margaret Hamilton | Estados Unidos |\n+----+-------------------+----------------+\n4 filas devueltas`,
        byteTip: 'Filtrar por IS NOT NULL asegura que la pantalla nunca intente renderizar campos vacíos.',
        pitfallTip: 'Recuerda que un texto con espacios "   " es NOT NULL; para limpiar espacios usa trim().',
        keyPoints: [
          'IS NULL modela tareas pendientes y flujos incompletos.',
          'Garantiza que la aplicación reciba datos listos para pintar.',
          'Esencial para auditorías de calidad en bases de datos.'
        ]
      }
    ]
  },

  'sql-u07-l08': {
    subtitle: 'Ordena tus resultados de forma ascendente (ASC) o descendente (DESC) con ORDER BY.',
    analogy: 'Ordenar los contactos en tu teléfono: de la A a la Z para buscar un amigo por nombre, o por fecha de la última llamada para ver a quién llamaste recientemente.',
    sections: [
      {
        title: 'La cláusula ORDER BY',
        explanation: `En una base de datos relacional, **el orden de las filas no está garantizado**: SQLite te las entrega en el orden físico en que las encuentra en el disco, a menos que le pidas explícitamente ordenarlas.

Para ordenar los resultados usamos la cláusula **\`ORDER BY\`** al final de la consulta:
\`SELECT columnas FROM tabla ORDER BY columna_criterio [ASC | DESC];\`

• **\`ASC\` (Ascendente / Predeterminado):**
  - Números: de menor a mayor (\`1, 2, 3...\`).
  - Textos: en orden alfabético (\`A -> Z\`).
  - Fechas: de la más antigua a la más reciente.
• **\`DESC\` (Descendente):**
  - Números: de mayor a menor (\`10, 9, 8...\`).
  - Textos: en orden alfabético inverso (\`Z -> A\`).
  - Fechas: de la más reciente a la más antigua.`,
        codeSnippet: `-- Ordenamos productos del más caro al más barato (DESC)\nSELECT id, nombre, precio\nFROM productos\nORDER BY precio DESC;`,
        outputSnippet: `+----+------------------------------+--------+\n| id | nombre                       | precio |\n+----+------------------------------+--------+\n| 2  | Monitor Ultrawide 34"        | 429.5  |\n| 4  | Auriculares Cancelación Ruido| 129.0  |\n| 1  | Teclado Mecánico RGB         | 89.99  |\n| 3  | Mouse Ergonómico Pro         | 49.9   |\n| 5  | Cable HDMI 2.1 Braided       | 14.99  |\n+----+------------------------------+--------+\n5 filas devueltas`,
        byteTip: 'Si no pones nada, SQL asume ASC por defecto. Escribir ORDER BY precio equivale a ORDER BY precio ASC.',
        pitfallTip: 'La cláusula ORDER BY se coloca siempre después del WHERE, nunca antes.',
        keyPoints: [
          'ORDER BY define el ordenamiento formal de los resultados.',
          'ASC ordena de menor a mayor; DESC ordena de mayor a menor.',
          'Se coloca después del WHERE y antes del LIMIT.'
        ]
      },
      {
        title: 'Ordenamiento por múltiples columnas',
        explanation: `¿Qué pasa si dos empleados pertenecen al mismo departamento? Puedes desempatar ordenando por una segunda columna:`,
        codeSnippet: `-- Ordenamos primero por departamento (A-Z) y luego por salario de mayor a menor\nSELECT nombre, departamento, salario\nFROM empleados\nORDER BY departamento ASC, salario DESC;`,
        outputSnippet: `+----------------+--------------+---------+\n| nombre         | departamento | salario |\n+----------------+--------------+---------+\n| Sofía Valerio  | Dirección    | 4500.0  |\n| Elena Rostova  | Diseño UX    | 2850.5  |\n| Carlos Mendoza | Ingeniería   | 3200.0  |\n| Mateo Díaz     | Sistemas     | 3100.0  |\n| Andrés Solano  | Soporte      | 1900.0  |\n+----------------+--------------+---------+\n5 filas devueltas`,
        byteTip: 'Puedes ordenar por tantas columnas como quieras separándolas por comas: ORDER BY col1 ASC, col2 DESC.',
        pitfallTip: 'Ordenar por columnas que no tienen índices en tablas de 100,000 filas puede ralentizar la consulta.',
        keyPoints: [
          'El ordenamiento múltiple desempata coincidencias en la primera columna.',
          'Permite agrupar visualmente datos por categoría y orden secundario.',
          'Es el estándar de oro en listados de tiendas y directorios.'
        ]
      }
    ]
  },

  'sql-u07-l09': {
    subtitle: 'Pagina tus resultados y limita la cantidad de filas devueltas con LIMIT y OFFSET.',
    analogy: 'La paginación de los resultados de búsqueda de Google: te muestra exactamente los primeros 10 resultados (LIMIT 10). Al hacer clic en "Página 2", se salta los 10 primeros (OFFSET 10) y te muestra los siguientes 10.',
    sections: [
      {
        title: 'Paginación de resultados con LIMIT y OFFSET',
        explanation: `Si tu base de datos tiene 50,000 productos, intentar cargarlos todos juntos en una app móvil congelaría la pantalla y consumiría toda la memoria del teléfono.

Para paginar y traer solo una porción controlada, usamos **\`LIMIT\`** y **\`OFFSET\`**:
• **\`LIMIT cantidad\`**: Número máximo de filas que deseas recibir.
• **\`OFFSET cantidad\`**: Cuántas filas iniciales debe **saltarse** la consulta antes de empezar a entregar resultados.

Fórmula universal de paginación para páginas de tamaño N:
• Página 1: \`LIMIT N OFFSET 0\`
• Página 2: \`LIMIT N OFFSET N\`
• Página 3: \`LIMIT N OFFSET (2 * N)\``,
        codeSnippet: `-- Obtenemos los 2 estudiantes con mejor promedio del ranking (Top 2)\nSELECT id, nombre, carrera, promedio\nFROM estudiantes\nORDER BY promedio DESC\nLIMIT 2;`,
        outputSnippet: `+----+-----------------+-------------------------+----------+\n| id | nombre          | carrera                 | promedio |\n+----+-----------------+-------------------------+----------+\n| 3  | Camila Gómez    | Sistemas de Información | 9.7      |\n| 1  | Valeria Morales | Ingeniería de Software  | 9.4      |\n+----+-----------------+-------------------------+----------+\n2 filas devueltas`,
        byteTip: 'En SQLite también puedes escribir LIMIT 2 OFFSET 4 para saltarte 4 filas y traer las siguientes 2.',
        pitfallTip: 'Usa siempre LIMIT acompañado de un ORDER BY claro; sin ORDER BY, los resultados paginados podrían salir en orden aleatorio en cada llamada.',
        keyPoints: [
          'LIMIT restringe el número máximo de filas devueltas.',
          'OFFSET define el desplazamiento de inicio para paginación.',
          'Es la técnica obligatoria para implementar scroll infinito en Android.'
        ]
      },
      {
        title: 'Segunda página de resultados con OFFSET',
        explanation: `Mira cómo solicitar la "segunda página" de dos productos saltándonos los dos primeros del ranking:`,
        codeSnippet: `-- Página 2: nos saltamos 2 y mostramos los siguientes 2 productos más caros\nSELECT id, nombre, precio\nFROM productos\nORDER BY precio DESC\nLIMIT 2 OFFSET 2;`,
        outputSnippet: `+----+----------------------+--------+\n| id | nombre               | precio |\n+----+----------------------+--------+\n| 1  | Teclado Mecánico RGB | 89.99  |\n| 3  | Mouse Ergonómico Pro | 49.9   |\n+----+----------------------+--------+\n2 filas devueltas`,
        byteTip: 'La biblioteca oficial Paging 3 de Android Jetpack utiliza exactamente LIMIT y OFFSET por debajo.',
        pitfallTip: 'Valores gigantescos de OFFSET (como OFFSET 1000000) pueden ser lentos porque el motor debe leer y descartar ese millón de filas.',
        keyPoints: [
          'LIMIT y OFFSET resuelven la paginación fluida en interfaces móviles.',
          'Mantienen el consumo de memoria ligero y constante.',
          'Garantizan tiempos de respuesta instantáneos en la app.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 8: ACTUALIZACIÓN Y ELIMINACIÓN DE DATOS (UPDATE Y DELETE)
  // ═════════════════════════════════════════════════════════════════════════
  'sql-u08-l01': {
    subtitle: 'Modifica datos existentes en tus tablas de forma segura con la sentencia UPDATE y SET.',
    analogy: 'Editar el número de teléfono de un contacto en tu agenda: abres su ficha existente, borras el número viejo, escribes el nuevo y guardas. No creaste un contacto nuevo, modificaste el que ya estaba.',
    sections: [
      {
        title: 'La sentencia UPDATE y la cláusula SET',
        explanation: `A medida que tu aplicación opera, los datos cambian: un usuario actualiza su correo, el precio de un producto sube o el stock se reduce tras una venta.

Para modificar registros existentes usamos la sentencia **\`UPDATE\`**:
\`UPDATE nombre_tabla\`
\`SET columna = nuevo_valor\`
\`WHERE condicion;\`

• **\`UPDATE\`**: Indica qué tabla se va a modificar.
• **\`SET\`**: Indica qué columna(s) cambiarán y cuál será su nuevo valor.
• **\`WHERE\`**: Especifica exactamente qué filas deben modificarse.`,
        codeSnippet: `-- Actualizamos el salario del empleado con ID 101 a $3500.0\nUPDATE empleados\nSET salario = 3500.0\nWHERE id = 101;`,
        outputSnippet: `1 fila actualizada con éxito.`,
        byteTip: 'Fíjate en la regla de oro: siempre filtra por la llave primaria única (WHERE id = 101) para tener certeza de que solo modificarás a esa persona.',
        pitfallTip: 'Si olvidas la cláusula WHERE en un UPDATE, ¡modificarás todas las filas de toda la tabla de un solo golpe! En la lección 5 verás este peligro en detalle.',
        keyPoints: [
          'UPDATE modifica datos de registros ya guardados.',
          'SET define las columnas a alterar y sus nuevos valores.',
          'WHERE delimita qué filas específicas recibirán el cambio.'
        ]
      },
      {
        title: 'Verificar la actualización con SELECT',
        explanation: `Comprobamos que el empleado #101 refleje su nuevo salario en la base de datos:`,
        codeSnippet: `-- Consultamos al empleado para confirmar el nuevo salario actualizado\nSELECT id, nombre, departamento, salario\nFROM empleados\nWHERE id = 101;`,
        outputSnippet: `+-----+----------------+--------------+---------+\n| id  | nombre         | departamento | salario |\n+-----+----------------+--------------+---------+\n| 101 | Carlos Mendoza | Ingeniería   | 3500.0  |\n+-----+----------------+--------------+---------+\n1 fila devuelta`,
        byteTip: 'En Android con Room, los métodos anotados con @Update devuelven un Int con la cantidad de filas modificadas (debería ser 1).',
        pitfallTip: 'No uses comillas en valores numéricos al actualizar columnas INTEGER o REAL.',
        keyPoints: [
          'SELECT confirma inmediatamente el éxito de un UPDATE.',
          'El cambio es permanente en el archivo de la base de datos.',
          'Es el segundo pilar de las operaciones de modificación de datos.'
        ]
      }
    ]
  },

  'sql-u08-l02': {
    subtitle: 'Actualiza múltiples columnas a la vez o realiza cálculos relativos directamente en el SET.',
    analogy: 'Un empleado que asciende de puesto: en un solo trámite de recursos humanos le cambian el título de su cargo Y le aumentan el sueldo simultáneamente en la misma ficha.',
    sections: [
      {
        title: 'Actualizar múltiples columnas en un solo UPDATE',
        explanation: `No necesitas ejecutar múltiples sentencias \`UPDATE\` separadas si vas a modificar varios campos de la misma fila.

Simplemente separas las asignaciones con una coma (\`,\`) dentro del \`SET\`:
\`UPDATE productos\`
\`SET precio = 95.0, stock = 50, categoria = 'Hardware Pro'\`
\`WHERE id = 1;\`

Todas las columnas indicadas se actualizarán de forma atómica y simultánea en una sola operación de disco.`,
        codeSnippet: `-- Actualizamos simultáneamente el precio y el stock del producto con ID 1\nUPDATE productos\nSET precio = 79.99, stock = 60\nWHERE id = 1;`,
        outputSnippet: `1 fila actualizada (precio y stock modificados a la vez).`,
        byteTip: 'También puedes hacer cálculos basados en el valor anterior: SET stock = stock - 1 para descontar una unidad vendida.',
        pitfallTip: 'No pongas la palabra SET más de una vez; separa cada columna con una simple coma.',
        keyPoints: [
          'SET col1 = val1, col2 = val2 actualiza múltiples campos a la vez.',
          'La actualización es atómica: se cambian todas las columnas juntas.',
          'Permite realizar operaciones de incremento o decremento relativo (stock = stock - 1).'
        ]
      },
      {
        title: 'Actualizaciones relativas para compras e inventarios',
        explanation: `Mira cómo reducir el stock tras la compra de 5 teclados mecánicos usando una fórmula en el \`SET\`:`,
        codeSnippet: `-- Reducimos 5 unidades del stock actual del producto #1\nUPDATE productos\nSET stock = stock - 5\nWHERE id = 1;\n\n-- Consultamos el resultado final\nSELECT id, nombre, precio, stock\nFROM productos\nWHERE id = 1;`,
        outputSnippet: `+----+----------------------+--------+-------+\n| id | nombre               | precio | stock |\n+----+----------------------+--------+-------+\n| 1  | Teclado Mecánico RGB | 79.99  | 55    |\n+----+----------------------+--------+-------+\n1 fila devuelta`,
        byteTip: 'stock = stock - 5 previene condiciones de carrera si dos compras ocurren casi al mismo tiempo.',
        pitfallTip: 'Asegúrate con un CHECK o con WHERE stock >= 5 de no dejar el stock en números negativos.',
        keyPoints: [
          'Las actualizaciones relativas aprovechan el valor existente en la celda.',
          'Ideales para carritos de compras, puntos de fidelidad y contadores.',
          'Garantizan exactitud matemática en entornos multiusuario.'
        ]
      }
    ]
  },

  'sql-u08-l03': {
    subtitle: 'Elimina registros obsoletos de tus tablas utilizando la sentencia DELETE FROM.',
    analogy: 'Tirar una carta vieja a la trituradora de papel: la carta desaparece por completo y el espacio en la gaveta queda libre, pero el mueble archivador sigue intacto en su lugar.',
    sections: [
      {
        title: 'La sentencia DELETE FROM',
        explanation: `Para borrar filas que ya no son necesarias (un usuario que cerró su cuenta, un producto descontinuado o una notificación leída), usamos la sentencia **\`DELETE FROM\`**:

\`DELETE FROM nombre_tabla\`
\`WHERE condicion;\`

• Elimina las filas completas que cumplan la condición del \`WHERE\`.
• **No borra la tabla ni sus columnas**; la estructura sigue existiendo lista para seguir operando.
• El borrado es definitivo en SQLite si no estás dentro de una transacción.`,
        codeSnippet: `-- Eliminamos una nota específica por su identificador único\nDELETE FROM matriculas\nWHERE id = 8;`,
        outputSnippet: `1 fila eliminada con éxito de la tabla matriculas.`,
        byteTip: 'En Android con Room, los métodos anotados con @Delete eliminan registros usando el objeto correspondiente.',
        pitfallTip: 'Al igual que con UPDATE, si ejecutas DELETE FROM tabla sin la cláusula WHERE, ¡borrarás absolutamente todas las filas de la tabla!',
        keyPoints: [
          'DELETE FROM borra registros existentes de una tabla.',
          'WHERE define con exactitud qué filas deben eliminarse.',
          'Conserva intacta la estructura y el esquema de la tabla.'
        ]
      },
      {
        title: 'Verificación del borrado',
        explanation: `Comprobamos que el registro con ID 8 haya desaparecido efectivamente de la tabla:`,
        codeSnippet: `-- Verificamos que la matrícula #8 ya no exista\nSELECT id, estudiante_id, asignatura_id\nFROM matriculas\nWHERE id = 8;`,
        outputSnippet: `0 filas devueltas (confirmación de que el registro fue eliminado).`,
        byteTip: 'Recibir 0 filas en la búsqueda posterior es la confirmación perfecta del borrado.',
        pitfallTip: 'Si la tabla está relacionada con llaves foráneas y no tiene ON DELETE CASCADE, SQLite impedirá el borrado si otros registros dependen de ella.',
        keyPoints: [
          'El borrado libera espacio lógico en el archivo de la base de datos.',
          'Las restricciones de llave foránea protegen contra borrados indebidos.',
          'Es la operación de eliminación final en el ciclo CRUD.'
        ]
      }
    ]
  },

  'sql-u08-l04': {
    subtitle: 'Comprende el rol vital de la cláusula WHERE para delimitar con exactitud tus cambios en UPDATE y DELETE.',
    analogy: 'Un cirujano que va a operar el apéndice de un paciente: marca con un plumón quirúrgico exactamente el punto a intervenir (WHERE). No empieza a operar a ciegas todo el cuerpo del paciente.',
    sections: [
      {
        title: 'El rol crítico de WHERE en modificaciones',
        explanation: `En las consultas \`SELECT\`, olvidar el \`WHERE\` es solo un inconveniente: te muestra todas las filas en pantalla, pero no daña nada.

En cambio, en **\`UPDATE\`** y **\`DELETE\`**, olvidar el \`WHERE\` es una **catástrofe total**:
• En un \`UPDATE\`, le pondrá el mismo valor a todos los usuarios del sistema.
• En un \`DELETE\`, vaciará la tabla entera en una fracción de segundo.

Por esta razón, la cláusula \`WHERE\` debe tratarse con el máximo respeto y concentración.`,
        codeSnippet: `-- Modificación estrictamente delimitada por llave primaria\nUPDATE usuarios\nSET pais = 'Costa Rica'\nWHERE id = 1;`,
        outputSnippet: `1 fila actualizada con precisión quirúrgica.`,
        byteTip: 'Usa siempre la llave primaria única (WHERE id = ...) para garantizar que afectes a un solo registro.',
        pitfallTip: 'Filtrar por nombre en un UPDATE (ej: WHERE nombre = "Carlos") puede modificar a 10 empleados distintos que casualmente se llaman Carlos.',
        keyPoints: [
          'WHERE delimita el alcance destructivo de UPDATE y DELETE.',
          'Filtrar por llave primaria garantiza que el cambio afecte a una sola fila.',
          'Evita usar campos no únicos como criterio principal de modificación.'
        ]
      },
      {
        title: 'Auditoría de filas afectadas',
        explanation: `Comprobamos que solo el usuario #1 haya recibido el cambio de país, dejando a todos los demás usuarios intactos:`,
        codeSnippet: `-- Verificamos los países de los primeros dos usuarios\nSELECT id, nombre, pais\nFROM usuarios\nWHERE id IN (1, 2);`,
        outputSnippet: `+----+--------------+-------------+\n| id | nombre       | pais        |\n+----+--------------+-------------+\n| 1  | Ada Lovelace | Costa Rica  |\n| 2  | Alan Turing  | Reino Unido |\n+----+--------------+-------------+\n2 filas devueltas`,
        byteTip: 'Alan Turing conservó su país Reino Unido intacto gracias al WHERE id = 1.',
        pitfallTip: 'Nunca ejecutes un UPDATE o DELETE en una base de datos real sin antes haber probado la condición con un SELECT.',
        keyPoints: [
          'La delimitación estricta aísla el impacto de la modificación.',
          'Protege los registros adyacentes contra alteraciones colaterales.',
          'Es la regla de seguridad número uno de los administradores de bases de datos.'
        ]
      }
    ]
  },

  'sql-u08-l05': {
    subtitle: 'Conoce las consecuencias reales de omitir el WHERE y cómo los entornos profesionales previenen este error.',
    analogy: 'Un botón de autodestrucción sin tapa de seguridad: si presionas "Borrar todo", borras la base de datos de 10 años de la empresa en un parpadeo. Es la pesadilla que todo programador teme.',
    sections: [
      {
        title: 'El peligro mortal de omitir el WHERE',
        explanation: `Todo desarrollador veterano tiene una historia de terror sobre alguien que ejecutó:
\`DELETE FROM clientes;\`
o
\`UPDATE cuentas SET saldo = 0;\`
sin incluir la cláusula \`WHERE\`.

¿Qué ocurre si omites el \`WHERE\`?
• SQLite asume que tu orden aplica a **absolutamente todas las filas de la tabla**.
• Borrará o sobreescribirá 10, 50,000 o 10,000,000 de registros en silencio y sin pedir confirmación.

Muchos entornos profesionales modernos y clientes gráficos tienen un modo llamado *"Safe Updates"* que bloquea automáticamente cualquier \`UPDATE\` o \`DELETE\` que no incluya un \`WHERE\` con llave primaria.`,
        codeSnippet: `-- Demostración SEGURA con WHERE estricto:\nUPDATE productos\nSET stock = 40\nWHERE id = 1;`,
        outputSnippet: `1 fila actualizada con seguridad.`,
        byteTip: 'En la Unidad 12 aprenderás a usar Transacciones con BEGIN y ROLLBACK para poder deshacer cualquier error antes de confirmarlo.',
        pitfallTip: 'Jamás escribas UPDATE o DELETE empezando por la primera palabra y presionando enter. Acostúmbrate a escribir primero el WHERE.',
        keyPoints: [
          'Omitir WHERE aplica el cambio a la totalidad de las filas de la tabla.',
          'Es irreversible si no se cuenta con respaldo o transacción activa.',
          'Los linters y motores modernos advierten sobre modificaciones sin filtro.'
        ]
      },
      {
        title: 'Buenas prácticas en entornos de desarrollo y producción',
        explanation: `Para evitar este desastre en tu carrera profesional:
1. Ten siempre respaldos automáticos diarios.
2. Trabaja siempre dentro de un bloque \`BEGIN TRANSACTION\` cuando hagas cambios manuales.
3. Revisa tres veces la sentencia antes de presionar el botón de ejecución.`,
        codeSnippet: `-- Consulta de seguridad para ver el producto modificado\nSELECT id, nombre, stock\nFROM productos\nWHERE id = 1;`,
        outputSnippet: `+----+----------------------+-------+\n| id | nombre               | stock |\n+----+----------------------+-------+\n| 1  | Teclado Mecánico RGB | 40    |\n+----+----------------------+-------+\n1 fila devuelta`,
        byteTip: 'Las bases de datos SQLite en Android se guardan en la carpeta de la app; hacer una copia del archivo .db es un respaldo instantáneo.',
        pitfallTip: 'No pruebes sentencias destructivas directamente sobre bases de datos de clientes reales.',
        keyPoints: [
          'La prudencia y los respaldos son el mejor seguro de vida de un desarrollador.',
          'Las transacciones permiten probar y revertir cambios si algo sale mal.',
          'La cultura de seguridad distingue a un programador senior.'
        ]
      }
    ]
  },

  'sql-u08-l06': {
    subtitle: 'Aplica la regla de oro: consulta siempre con SELECT antes de ejecutar cualquier UPDATE o DELETE.',
    analogy: 'Un sastre que mide la tela dos veces antes de hacer el corte con las tijeras: medir dos veces con los ojos (SELECT) asegura que el corte definitivo (DELETE) sea exactamente en el milímetro correcto.',
    sections: [
      {
        title: 'La regla de oro: Probar con SELECT primero',
        explanation: `Antes de ejecutar cualquier sentencia destructiva con \`UPDATE\` o \`DELETE\`, aplica siempre este sencillo truco de programadores expertos:

**El truco en 3 pasos:**
1. Escribe primero una consulta con **\`SELECT\`** usando exactamente el mismo filtro \`WHERE\` que planeas usar:
   \`SELECT * FROM usuarios WHERE activo = false AND fecha_ingreso < '2020-01-01';\`
2. Revisa visualmente con tus propios ojos las filas devueltas: ¿Son exactamente las filas que querías modificar o borrar? ¿No se coló ningún registro inocente?
3. Si la lista es 100% correcta, recién ahí cambias la palabra \`SELECT * \` por \`DELETE \` o \`UPDATE \`.`,
        codeSnippet: `-- Paso 1: Verificamos primero con SELECT qué fila será afectada\nSELECT id, nombre, departamento, salario\nFROM empleados\nWHERE id = 105;\n\n-- Paso 2: Una vez seguros, ejecutamos la actualización\nUPDATE empleados\nSET salario = 2100.0\nWHERE id = 105;`,
        outputSnippet: `+-----+---------------+--------------+---------+\n| id  | nombre        | departamento | salario |\n+-----+---------------+--------------+---------+\n| 105 | Andrés Solano | Soporte      | 1900.0  |\n+-----+---------------+--------------+---------+\n1 fila verificada.\n1 fila actualizada a $2100.0 con total certeza.`,
        byteTip: 'Este hábito de 5 segundos te salvará la vida profesional en incontables ocasiones a lo largo de tu carrera.',
        pitfallTip: 'Nunca asumas que un filtro complejo funcionará como esperas sin haberlo visto antes en un SELECT.',
        keyPoints: [
          'Probar el WHERE con SELECT previene modificaciones accidentales.',
          'Permite confirmar la cantidad exacta de filas que serán afectadas.',
          'Es el hábito de seguridad número uno de la ingeniería de software.'
        ]
      },
      {
        title: 'Verificación del cambio aplicado',
        explanation: `Comprobamos el estado final de Andrés Solano tras la actualización verificada:`,
        codeSnippet: `-- Paso 3: Confirmación final del salario modificado\nSELECT id, nombre, salario\nFROM empleados\nWHERE id = 105;`,
        outputSnippet: `+-----+---------------+---------+\n| id  | nombre        | salario |\n+-----+---------------+---------+\n| 105 | Andrés Solano | 2100.0  |\n+-----+---------------+---------+\n1 fila devuelta`,
        byteTip: 'Andrés Solano ahora tiene su salario en $2100.0 correctamente registrado.',
        pitfallTip: 'No confíes solo en tu intuición; verifica siempre el resultado final.',
        keyPoints: [
          'La confirmación posterior cierra el ciclo de actualización de forma limpia.',
          'Garantiza que el cambio se haya grabado correctamente en disco.',
          'Refuerza la confiabilidad de los procesos en el sistema.'
        ]
      }
    ]
  },

  'sql-u08-l07': {
    subtitle: 'Comprende la diferencia radical entre vaciar registros con DELETE FROM y destruir la tabla con DROP TABLE.',
    analogy: 'DELETE FROM es vaciar todo el contenido de una papelera de reciclaje: la papelera queda limpia y vacía en el suelo de tu oficina lista para seguir tirando papeles. DROP TABLE es desintegrar la papelera con un rayo láser: ya no tienes papelera donde tirar nada.',
    sections: [
      {
        title: 'DELETE FROM frente a DROP TABLE',
        explanation: `Una de las dudas más frecuentes en exámenes y entrevistas técnicas es la diferencia entre estas dos sentencias:

1. **\`DELETE FROM nombre_tabla;\` (DML):**
• **Borra los datos:** Elimina todas las filas o registros almacenados.
• **Conserva la estructura:** La tabla sigue viva en la base de datos con todas sus columnas, tipos, restricciones e índices intactos.
• Puedes hacer un \`INSERT\` de inmediato y la tabla aceptará nuevos registros sin problemas.

2. **\`DROP TABLE nombre_tabla;\` (DDL):**
• **Destruye absolutamente todo:** Elimina tanto los datos como la definición completa de la tabla del catálogo de SQLite (\`sqlite_master\`).
• La tabla **deja de existir por completo**.
• Si intentas hacer un \`SELECT\` o \`INSERT\` después de un \`DROP\`, SQLite arrojará un error de \`no such table\`.`,
        codeSnippet: `-- Creamos una tabla temporal para demostrar la diferencia\nCREATE TABLE temporal_borrado (id INTEGER PRIMARY KEY, nota TEXT);\nINSERT INTO temporal_borrado (nota) VALUES ('Dato de prueba');\n\n-- 1. DELETE borra el contenido pero deja la tabla viva\nDELETE FROM temporal_borrado;\n\n-- 2. DROP destruye la tabla entera de la faz de la tierra\nDROP TABLE temporal_borrado;`,
        outputSnippet: `Tabla 'temporal_borrado' creada, vaciada con DELETE y finalmente destruida con DROP TABLE.`,
        byteTip: 'Usa siempre DROP TABLE IF EXISTS nombre_tabla para evitar errores si la tabla ya había sido destruida antes.',
        pitfallTip: 'Mucho cuidado con DROP TABLE: destruye esquemas y datos sin posibilidad de recuperación.',
        keyPoints: [
          'DELETE FROM vacía los registros pero conserva la estructura de la tabla.',
          'DROP TABLE destruye la tabla y sus datos de forma definitiva.',
          'DELETE es una sentencia DML (datos); DROP es una sentencia DDL (estructura).'
        ]
      },
      {
        title: 'Migraciones de esquemas en Android con Room',
        explanation: `En Android, cuando actualizas la versión de tu app y necesitas cambiar por completo el diseño de una tabla, Room suele ejecutar un script de migración que puede recrear tablas con \`DROP TABLE IF EXISTS\` y luego un nuevo \`CREATE TABLE\`:`,
        codeSnippet: `-- Verificamos que nuestras tablas maestras sigan operativas y seguras\nSELECT COUNT(*) AS total_tablas_activas\nFROM sqlite_master\nWHERE type = 'table' AND name IN ('usuarios', 'productos', 'estudiantes', 'empleados', 'asignaturas', 'matriculas');`,
        outputSnippet: `+----------------------+\n| total_tablas_activas |\n+----------------------+\n| 6                    |\n+----------------------+\n1 fila devuelta`,
        byteTip: 'sqlite_master confirma que todas las tablas maestras del curso están saludables y listas.',
        pitfallTip: 'Nunca ejecutes DROP TABLE en producción sin un plan de migración que respalde los datos existentes del usuario.',
        keyPoints: [
          'DROP TABLE se utiliza principalmente en scripts de migración y desinstalación.',
          'DELETE FROM es la herramienta cotidiana para vaciar historiales o carritos.',
          'Conocer la diferencia previene la destrucción accidental de esquemas en producción.'
        ]
      }
    ]
  }
};
