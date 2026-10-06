import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_03_THEORY: Record<string, TheoryLesson> = {
  'sql-u03-l01': {
    id: 'sql-th-u03-l01',
    lessonId: 'sql-u03-l01',
    pathId: 'sql',
    unitId: 3,
    levelId: 1,
    title: '1. La Clausula WHERE y Condicion de Filtrado Booleano',
    subtitle: 'La cláusula WHERE evalúa una condición booleana para cada fila de la tabla; solo las filas donde la expresión sea TRUE se incluyen en el resultado.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'La Clausula WHERE y Condicion de Filtrado Booleano',
        explanation: 'La cláusula WHERE evalúa una condición booleana para cada fila de la tabla; solo las filas donde la expresión sea TRUE se incluyen en el resultado.',
        codeSnippet: `SELECT nombre, email
FROM usuarios
WHERE activo = true;`,
        codeLanguage: 'sql',
        byteTip: 'WHERE se evalúa inmediatamente después del FROM y antes del SELECT en el ciclo de vida de la consulta.',
        keyPoints: [
          'WHERE filtra registros antes de proyectarlos en el SELECT',
          'Opera bajo lógica trivaluada: TRUE, FALSE o UNKNOWN (NULL)',
          'Solo las filas evaluadas como TRUE pasan el filtro'
        ]
      }
    ]
  },
  'sql-u03-l02': {
    id: 'sql-th-u03-l02',
    lessonId: 'sql-u03-l02',
    pathId: 'sql',
    unitId: 3,
    levelId: 2,
    title: '2. Comparaciones Numericas Simples (=, !=, <>, >, <, >=, <=)',
    subtitle: 'Los operadores relacionales permiten comparar valores numéricos con exactitud en la cláusula WHERE.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Comparaciones Numericas Simples (=, !=, <>, >, <, >=, <=)',
        explanation: 'Los operadores relacionales permiten comparar valores numéricos con exactitud en la cláusula WHERE.',
        codeSnippet: `SELECT id, nombre, precio
FROM productos
WHERE precio >= 50.0;

SELECT * FROM cuentas WHERE saldo < 0.0;`,
        codeLanguage: 'sql',
        byteTip: '<> es el estándar ANSI SQL tradicional para desigualdad, mientras que != es una alternativa moderna también universal.',
        keyPoints: [
          '= comprueba igualdad exacta (un solo signo igual, no ==)',
          '!= y <> denotan desigualdad (ambos son ampliamente soportados)',
          '>, <, >= y <= para comparaciones de orden numérico'
        ]
      }
    ]
  },
  'sql-u03-l03': {
    id: 'sql-th-u03-l03',
    lessonId: 'sql-u03-l03',
    pathId: 'sql',
    unitId: 3,
    levelId: 3,
    title: '3. Filtrado de Cadenas de Texto Exactas y Sensibilidad a Mayusculas',
    subtitle: 'Aprende a comparar cadenas de texto literales entre comillas simples y cómo influye la colación (Collation) en la sensibilidad a mayúsculas.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Filtrado de Cadenas de Texto Exactas y Sensibilidad a Mayusculas',
        explanation: 'Aprende a comparar cadenas de texto literales entre comillas simples y cómo influye la colación (Collation) en la sensibilidad a mayúsculas.',
        codeSnippet: `SELECT id, nombre, pais
FROM clientes
WHERE pais = 'España';

-- Comparación exacta insensible usando LOWER:
SELECT * FROM usuarios WHERE LOWER(email) = 'admin@correo.com';`,
        codeLanguage: 'sql',
        byteTip: 'Si quieres garantizar insensibilidad a mayúsculas portátil entre motores, aplica LOWER(columna) = LOWER(\'valor\').',
        keyPoints: [
          'Los textos siempre se encierran en comillas simples (\'texto\')',
          'En PostgreSQL las comparaciones de texto son Case-Sensitive por defecto',
          'En MySQL y SQL Server muchas colaciones por defecto son Case-Insensitive (ej: utf8mb4_general_ci)'
        ]
      }
    ]
  },
  'sql-u03-l04': {
    id: 'sql-th-u03-l04',
    lessonId: 'sql-u03-l04',
    pathId: 'sql',
    unitId: 3,
    levelId: 4,
    title: '4. Conjuncion de Filtros con AND',
    subtitle: 'El operador AND permite exigir el cumplimiento simultáneo de dos o más condiciones; la fila solo se selecciona si TODAS son verdaderas.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Conjuncion de Filtros con AND',
        explanation: 'El operador AND permite exigir el cumplimiento simultáneo de dos o más condiciones; la fila solo se selecciona si TODAS son verdaderas.',
        codeSnippet: `SELECT nombre, stock, precio
FROM productos
WHERE categoria = 'Tecnología'
  AND precio < 500.0
  AND stock > 0;`,
        codeLanguage: 'sql',
        byteTip: 'Coloca condiciones indexadas o altamente selectivas en tu WHERE para que el optimizador filtre rápido.',
        keyPoints: [
          'Condición1 AND Condición2 = TRUE solo si ambas son TRUE',
          'Se pueden encadenar tantos ANDs como sean necesarios',
          'Muy eficiente cuando una de las condiciones reduce drásticamente el conjunto de búsqueda'
        ]
      }
    ]
  },
  'sql-u03-l05': {
    id: 'sql-th-u03-l05',
    lessonId: 'sql-u03-l05',
    pathId: 'sql',
    unitId: 3,
    levelId: 5,
    title: '5. Disyuncion de Filtros con OR',
    subtitle: 'El operador OR selecciona una fila si AL MENOS UNA de las condiciones especificadas es verdadera.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Disyuncion de Filtros con OR',
        explanation: 'El operador OR selecciona una fila si AL MENOS UNA de las condiciones especificadas es verdadera.',
        codeSnippet: `SELECT id, nombre, rol
FROM usuarios
WHERE rol = 'ADMIN'
   OR rol = 'SUPERVISOR';`,
        codeLanguage: 'sql',
        byteTip: 'Cuando tengas múltiples OR sobre la misma columna (rol = \'A\' OR rol = \'B\'), usa la cláusula IN para mayor limpieza.',
        keyPoints: [
          'TRUE OR FALSE = TRUE',
          'Permite capturar múltiples alternativas de negocio',
          'Puede encadenarse para evaluar varias opciones'
        ]
      }
    ]
  },
  'sql-u03-l06': {
    id: 'sql-th-u03-l06',
    lessonId: 'sql-u03-l06',
    pathId: 'sql',
    unitId: 3,
    levelId: 6,
    title: '6. Precedencia de Operadores Logicos (AND sobre OR) y Parentesis',
    subtitle: 'En SQL, AND tiene mayor precedencia que OR. Sin paréntesis, el motor evaluará los AND primero, provocando errores silenciosos de lógica de negocio.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Precedencia de Operadores Logicos (AND sobre OR) y Parentesis',
        explanation: 'En SQL, AND tiene mayor precedencia que OR. Sin paréntesis, el motor evaluará los AND primero, provocando errores silenciosos de lógica de negocio.',
        codeSnippet: `-- Peligroso y ambiguo (AND se evalúa antes que OR):
SELECT * FROM productos
WHERE categoria = 'Tecnología' OR categoria = 'Hogar' AND precio < 50;

-- Claro, correcto y determinista gracias a los paréntesis:
SELECT * FROM productos
WHERE (categoria = 'Tecnología' OR categoria = 'Hogar')
  AND precio < 50;`,
        codeLanguage: 'sql',
        byteTip: 'Siempre agrupa con paréntesis cualquier expresión que combine AND y OR en el mismo WHERE.',
        keyPoints: [
          'Jerarquía de precedencia: NOT > AND > OR',
          'Usa paréntesis para forzar el orden deseado',
          'Los errores de precedencia no lanzan excepciones de sintaxis: entregan datos erróneos'
        ]
      }
    ]
  },
  'sql-u03-l07': {
    id: 'sql-th-u03-l07',
    lessonId: 'sql-u03-l07',
    pathId: 'sql',
    unitId: 3,
    levelId: 7,
    title: '7. Inversion de Condiciones con NOT',
    subtitle: 'El operador unario NOT invierte el valor de verdad de cualquier expresión lógica en la cláusula WHERE.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Inversion de Condiciones con NOT',
        explanation: 'El operador unario NOT invierte el valor de verdad de cualquier expresión lógica en la cláusula WHERE.',
        codeSnippet: `SELECT id, nombre
FROM clientes
WHERE NOT (pais = 'España');

SELECT * FROM productos WHERE NOT descontinuado;`,
        codeLanguage: 'sql',
        byteTip: 'En lugar de WHERE NOT (edad > 18) suele ser más legible escribir WHERE edad <= 18.',
        keyPoints: [
          'NOT TRUE = FALSE',
          'NOT FALSE = TRUE',
          'NOT UNKNOWN = UNKNOWN (la negación de un nulo sigue siendo nula y descartada)'
        ]
      }
    ]
  },
  'sql-u03-l08': {
    id: 'sql-th-u03-l08',
    lessonId: 'sql-u03-l08',
    pathId: 'sql',
    unitId: 3,
    levelId: 8,
    title: '8. Comprobacion de Rangos Inclusivos con BETWEEN y AND',
    subtitle: 'La cláusula BETWEEN permite comprobar si un valor se encuentra dentro de un rango cerrado e inclusivo (incluye ambos extremos).',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Comprobacion de Rangos Inclusivos con BETWEEN y AND',
        explanation: 'La cláusula BETWEEN permite comprobar si un valor se encuentra dentro de un rango cerrado e inclusivo (incluye ambos extremos).',
        codeSnippet: `SELECT nombre, precio
FROM productos
WHERE precio BETWEEN 10.0 AND 50.0;

SELECT * FROM pedidos WHERE fecha BETWEEN '2026-01-01' AND '2026-01-31';`,
        codeLanguage: 'sql',
        byteTip: 'Si escribes BETWEEN 50 AND 10, la consulta no devolverá ninguna fila porque ningún número es >= 50 y <= 10 a la vez.',
        keyPoints: [
          'WHERE x BETWEEN a AND b equivale a (x >= a AND x <= b)',
          'Es completamente inclusivo: incluye a y b',
          'El valor inicial siempre debe ser menor o igual que el final (a <= b)'
        ]
      }
    ]
  },
  'sql-u03-l09': {
    id: 'sql-th-u03-l09',
    lessonId: 'sql-u03-l09',
    pathId: 'sql',
    unitId: 3,
    levelId: 9,
    title: '9. Negacion de Rangos con NOT BETWEEN',
    subtitle: 'La cláusula NOT BETWEEN selecciona aquellas filas que caen estrictamente fuera del intervalo especificado.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Negacion de Rangos con NOT BETWEEN',
        explanation: 'La cláusula NOT BETWEEN selecciona aquellas filas que caen estrictamente fuera del intervalo especificado.',
        codeSnippet: `SELECT id, nombre, edad
FROM postulantes
WHERE edad NOT BETWEEN 18 AND 65;

SELECT * FROM productos WHERE precio NOT BETWEEN 100 AND 500;`,
        codeLanguage: 'sql',
        byteTip: 'NOT BETWEEN es perfecto para detectar anomalías o valores atípicos fuera de los márgenes normales de operación.',
        keyPoints: [
          'Equivale a (x < a OR x > b)',
          'Excluye ambos límites y todo lo que esté entre ellos',
          'Cuidado con valores NULL: siguen produciendo UNKNOWN'
        ]
      }
    ]
  },
  'sql-u03-l10': {
    id: 'sql-th-u03-l10',
    lessonId: 'sql-u03-l10',
    pathId: 'sql',
    unitId: 3,
    levelId: 10,
    title: '10. Desafio de Punto Medio: Filtros Financieros y de Inventario',
    subtitle: 'Consolida el uso armónico de operadores relacionales, AND, OR con paréntesis obligatorios, NOT y BETWEEN en escenarios reales de negocio.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Desafio de Punto Medio: Filtros Financieros y de Inventario',
        explanation: 'Consolida el uso armónico de operadores relacionales, AND, OR con paréntesis obligatorios, NOT y BETWEEN en escenarios reales de negocio.',
        codeSnippet: `SELECT p.codigo, p.nombre, p.precio, p.stock
FROM inventario.productos AS p
WHERE (p.categoria = 'Hardware' OR p.categoria = 'Redes')
  AND p.precio BETWEEN 50.0 AND 500.0
  AND p.stock > 0
  AND NOT p.descontinuado;`,
        codeLanguage: 'sql',
        byteTip: 'Escribe las condiciones del WHERE en líneas separadas para facilitar la lectura y el control de cambios en Git.',
        keyPoints: [
          'Resolución de reglas de negocio complejas en una sola consulta estructurada',
          'Prevención de trampas de precedencia lógica',
          'Filtrado de alta precisión en grandes volúmenes de datos'
        ]
      }
    ]
  },
  'sql-u03-l11': {
    id: 'sql-th-u03-l11',
    lessonId: 'sql-u03-l11',
    pathId: 'sql',
    unitId: 3,
    levelId: 11,
    title: '11. Pertenencia a Conjuntos con IN',
    subtitle: 'El operador IN comprueba si un valor coincide con cualquiera de los elementos de una lista explícita o de una subconsulta.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Pertenencia a Conjuntos con IN',
        explanation: 'El operador IN comprueba si un valor coincide con cualquiera de los elementos de una lista explícita o de una subconsulta.',
        codeSnippet: `SELECT id, nombre, pais
FROM clientes
WHERE pais IN ('España', 'México', 'Colombia', 'Argentina');

SELECT * FROM pedidos WHERE estado_id IN (1, 3, 5, 8);`,
        codeLanguage: 'sql',
        byteTip: 'Usa IN en lugar de largas cadenas de ORs (ej: pais = \'A\' OR pais = \'B\') para que el código sea mucho más compacto.',
        keyPoints: [
          'Sustituye múltiples condiciones OR encadenadas de forma limpia y legible',
          'Sintaxis: columna IN (v1, v2, v3, ...)',
          'Se puede combinar eficientemente con índices B-Tree'
        ]
      }
    ]
  },
  'sql-u03-l12': {
    id: 'sql-th-u03-l12',
    lessonId: 'sql-u03-l12',
    pathId: 'sql',
    unitId: 3,
    levelId: 12,
    title: '12. Exclusion de Listas con NOT IN',
    subtitle: 'La cláusula NOT IN selecciona todas las filas cuyo valor NO figure en la lista especificada.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Exclusion de Listas con NOT IN',
        explanation: 'La cláusula NOT IN selecciona todas las filas cuyo valor NO figure en la lista especificada.',
        codeSnippet: `SELECT id, nombre, rol
FROM usuarios
WHERE rol NOT IN ('INVITADO', 'BLOQUEADO', 'PENDIENTE');

SELECT * FROM productos WHERE categoria_id NOT IN (99, 100);`,
        codeLanguage: 'sql',
        byteTip: 'Usa NOT IN para excluir categorías obsoletas o estados transitorios de tus reportes.',
        keyPoints: [
          'Equivale a (x <> v1 AND x <> v2 AND ...)',
          'Descarta cualquier coincidencia con los elementos del conjunto',
          'Extremadamente sensible a valores NULL (veremos la trampa en la siguiente lección)'
        ]
      }
    ]
  },
  'sql-u03-l13': {
    id: 'sql-th-u03-l13',
    lessonId: 'sql-u03-l13',
    pathId: 'sql',
    unitId: 3,
    levelId: 13,
    title: '13. La Trampa de los Nulos en NOT IN (Three-Valued Logic)',
    subtitle: 'Uno de los bugs más famosos y devastadores en SQL: si la lista de NOT IN contiene siquiera un solo NULL (directo o por subconsulta), la consulta devolverá 0 filas.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'La Trampa de los Nulos en NOT IN (Three-Valued Logic)',
        explanation: 'Uno de los bugs más famosos y devastadores en SQL: si la lista de NOT IN contiene siquiera un solo NULL (directo o por subconsulta), la consulta devolverá 0 filas.',
        codeSnippet: `-- ¡PELIGRO! Esta consulta NUNCA devolverá ninguna fila si la lista contiene un NULL:
SELECT * FROM usuarios WHERE rol NOT IN ('ADMIN', 'EDITOR', NULL);

-- Explicación: rol <> 'ADMIN' AND rol <> 'EDITOR' AND rol <> NULL
-- Como rol <> NULL es SIEMPRE UNKNOWN, el AND completo se vuelve UNKNOWN y se descarta todo.`,
        codeLanguage: 'sql',
        byteTip: 'Si usas NOT IN con subconsultas, añade siempre WHERE columna IS NOT NULL en la subconsulta, o usa NOT EXISTS.',
        keyPoints: [
          'NOT IN se expande a una serie de comparaciones con AND (<> v1 AND <> v2 ...)',
          'col <> NULL siempre evalúa a UNKNOWN',
          'Cualquier expresión AND con UNKNOWN nunca puede ser TRUE, descartando toda la tabla'
        ]
      }
    ]
  },
  'sql-u03-l14': {
    id: 'sql-th-u03-l14',
    lessonId: 'sql-u03-l14',
    pathId: 'sql',
    unitId: 3,
    levelId: 14,
    title: '14. Deteccion Correcta de Nulos con IS NULL e IS NOT NULL',
    subtitle: 'En SQL los valores NULL no se pueden comparar con el operador de igualdad (=). Se deben utilizar obligatoriamente los operadores IS NULL e IS NOT NULL.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Deteccion Correcta de Nulos con IS NULL e IS NOT NULL',
        explanation: 'En SQL los valores NULL no se pueden comparar con el operador de igualdad (=). Se deben utilizar obligatoriamente los operadores IS NULL e IS NOT NULL.',
        codeSnippet: `-- FORMA CORRECTA Y ESTÁNDAR:
SELECT nombre, telefono FROM clientes WHERE telefono IS NULL;
SELECT nombre, telefono FROM clientes WHERE telefono IS NOT NULL;

-- ERROR COMÚN (NUNCA DEVOLVERÁ FILAS):
SELECT * FROM clientes WHERE telefono = NULL; -- INCORRECTO`,
        codeLanguage: 'sql',
        byteTip: 'Recuerda: NULL no es un valor, es el estado de ausencia de valor; por eso se pregunta si "ES nulo", no si "es IGUAL a nulo".',
        keyPoints: [
          'campo = NULL siempre devuelve UNKNOWN (falla silenciosa)',
          'IS NULL evalúa a TRUE si el campo carece de valor',
          'IS NOT NULL evalúa a TRUE si el campo contiene algún valor válido'
        ]
      }
    ]
  },
  'sql-u03-l15': {
    id: 'sql-th-u03-l15',
    lessonId: 'sql-u03-l15',
    pathId: 'sql',
    unitId: 3,
    levelId: 15,
    title: '15. Busqueda por Patrones de Texto con LIKE y el Comodin Porcentaje (%)',
    subtitle: 'El operador LIKE permite realizar búsquedas difusas utilizando comodines; el signo de porcentaje (%) representa cero, uno o múltiples caracteres arbitrarios.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Busqueda por Patrones de Texto con LIKE y el Comodin Porcentaje (%)',
        explanation: 'El operador LIKE permite realizar búsquedas difusas utilizando comodines; el signo de porcentaje (%) representa cero, uno o múltiples caracteres arbitrarios.',
        codeSnippet: `-- Comienza con "Juan":
SELECT * FROM usuarios WHERE nombre LIKE 'Juan%';

-- Termina en "@gmail.com":
SELECT * FROM clientes WHERE email LIKE '%@gmail.com';

-- Contiene la palabra "Kotlin" en cualquier posición:
SELECT * FROM cursos WHERE descripcion LIKE '%Kotlin%';`,
        codeLanguage: 'sql',
        byteTip: 'Un LIKE con comodín al principio (\'%termina\') no puede usar índices B-Tree estándar y forzará un escaneo completo de la tabla.',
        keyPoints: [
          'LIKE \'A%\' busca textos que comienzan con la letra A',
          'LIKE \'%Z\' busca textos que terminan con la letra Z',
          'LIKE \'%texto%\' busca coincidencias en cualquier posición de la cadena'
        ]
      }
    ]
  },
  'sql-u03-l16': {
    id: 'sql-th-u03-l16',
    lessonId: 'sql-u03-l16',
    pathId: 'sql',
    unitId: 3,
    levelId: 16,
    title: '16. Coincidencia de Caracter Unico con el Comodin Guion Bajo (_)',
    subtitle: 'El comodín guion bajo (_) en LIKE representa exactamente UN solo carácter arbitrario obligatorio en esa posición.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Coincidencia de Caracter Unico con el Comodin Guion Bajo (_)',
        explanation: 'El comodín guion bajo (_) en LIKE representa exactamente UN solo carácter arbitrario obligatorio en esa posición.',
        codeSnippet: `-- Códigos de 3 caracteres que inicien con "A" y terminen con "Z":
SELECT * FROM productos WHERE codigo LIKE 'A_Z';

-- Teléfonos con código de área de exactamente 3 dígitos:
SELECT * FROM clientes WHERE prefijo LIKE '___';`,
        codeLanguage: 'sql',
        byteTip: 'Usa _ cuando el formato de tus códigos, matrículas o identificadores tenga una longitud fija estricta.',
        keyPoints: [
          'Cada guion bajo (_) exige la presencia de exactamente 1 carácter',
          'Se pueden combinar múltiples guiones bajos (ej: \'__\' para 2 caracteres)',
          'Se puede combinar libremente con el comodín de porcentaje (%)'
        ]
      }
    ]
  },
  'sql-u03-l17': {
    id: 'sql-th-u03-l17',
    lessonId: 'sql-u03-l17',
    pathId: 'sql',
    unitId: 3,
    levelId: 17,
    title: '17. Busqueda Insensible a Mayusculas con ILIKE (PostgreSQL) y LOWER',
    subtitle: 'Conoce el operador ILIKE específico de PostgreSQL para búsquedas insensibles a mayúsculas y la técnica universal estándar con LOWER().',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Busqueda Insensible a Mayusculas con ILIKE (PostgreSQL) y LOWER',
        explanation: 'Conoce el operador ILIKE específico de PostgreSQL para búsquedas insensibles a mayúsculas y la técnica universal estándar con LOWER().',
        codeSnippet: `-- En PostgreSQL (operador nativo insensible):
SELECT * FROM usuarios WHERE nombre ILIKE '%maría%';

-- En SQL estándar universal y SQLite/Oracle:
SELECT * FROM usuarios WHERE LOWER(nombre) LIKE LOWER('%María%');`,
        codeLanguage: 'sql',
        byteTip: 'Si usas PostgreSQL, ILIKE es muy cómodo, pero ten en cuenta que tus consultas no correrán en MySQL o SQL Server sin adaptarlas.',
        keyPoints: [
          'ILIKE es un operador exclusivo de PostgreSQL y Redshift',
          'Para portabilidad estándar se usa LOWER(columna) LIKE LOWER(patrón)',
          'Permite encontrar nombres independientemente de si el usuario escribió en mayúsculas o minúsculas'
        ]
      }
    ]
  },
  'sql-u03-l18': {
    id: 'sql-th-u03-l18',
    lessonId: 'sql-u03-l18',
    pathId: 'sql',
    unitId: 3,
    levelId: 18,
    title: '18. Escape de Caracteres Especiales en LIKE con ESCAPE',
    subtitle: 'Aprende a buscar símbolos literales de porcentaje (%) o guion bajo (_) desactivando su función de comodín mediante la cláusula ESCAPE.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Escape de Caracteres Especiales en LIKE con ESCAPE',
        explanation: 'Aprende a buscar símbolos literales de porcentaje (%) o guion bajo (_) desactivando su función de comodín mediante la cláusula ESCAPE.',
        codeSnippet: `-- Buscar textos que contengan literalmente un 10%:
SELECT * FROM ofertas WHERE descripcion LIKE '%10!%%' ESCAPE '!';

-- Buscar nombres que contengan literalmente un guion bajo:
SELECT * FROM variables WHERE nombre LIKE '%!_%' ESCAPE '!';`,
        codeLanguage: 'sql',
        byteTip: 'Elige un carácter poco habitual como ! o # para que tus expresiones de escape sean claras y fáciles de leer.',
        keyPoints: [
          'La cláusula ESCAPE define un carácter de escape arbitrario (ej: ESCAPE \'!\')',
          'El carácter que sigue inmediatamente al de escape se trata como texto literal',
          'Esencial para buscar descuentos (ej: 50%), nombres de variables (ej: usr_id), etc.'
        ]
      }
    ]
  },
  'sql-u03-l19': {
    id: 'sql-th-u03-l19',
    lessonId: 'sql-u03-l19',
    pathId: 'sql',
    unitId: 3,
    levelId: 19,
    title: '19. Filtrado por Fechas y Tiempos Basicos',
    subtitle: 'Aprende a consultar columnas temporales (DATE, TIMESTAMP) utilizando el formato universal ISO-8601 y evitando las trampas del componente horario.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Filtrado por Fechas y Tiempos Basicos',
        explanation: 'Aprende a consultar columnas temporales (DATE, TIMESTAMP) utilizando el formato universal ISO-8601 y evitando las trampas del componente horario.',
        codeSnippet: `-- Formato estándar ISO-8601 (YYYY-MM-DD):
SELECT * FROM pedidos WHERE fecha_pedido >= '2026-01-01';

-- Rango completo de un solo día (cubriendo horas, minutos y segundos):
SELECT * FROM logs
WHERE timestamp >= '2026-03-24 00:00:00'
  AND timestamp < '2026-03-25 00:00:00';`,
        codeLanguage: 'sql',
        byteTip: 'Evita aplicar funciones sobre la fecha en el WHERE como DATE(timestamp) = \'2026-01-01\'; anula el uso de índices sobre la columna.',
        keyPoints: [
          'Usa siempre el formato estándar ISO-8601: \'AAAA-MM-DD\' (YYYY-MM-DD)',
          'Cuidado con columnas TIMESTAMP: comparar fecha = \'2026-01-01\' evalúa a las 00:00:00 omitiendo el resto del día',
          'El patrón semi-abierto (>= hoy AND < mañana) es el más seguro y eficiente para rangos'
        ]
      }
    ]
  },
  'sql-u03-l20': {
    id: 'sql-th-u03-l20',
    lessonId: 'sql-u03-l20',
    pathId: 'sql',
    unitId: 3,
    levelId: 20,
    title: '20. Desafio Maestro de Unidad: Motor de Busqueda y Auditoria Forense',
    subtitle: 'Integra con maestría todos los operadores de filtrado de la Unidad 3: comparaciones numéricas y de texto, AND, OR, NOT, BETWEEN, IN, NOT IN seguro, IS NULL, LIKE, comodines, escape y fechas.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Desafio Maestro de Unidad: Motor de Busqueda y Auditoria Forense',
        explanation: 'Integra con maestría todos los operadores de filtrado de la Unidad 3: comparaciones numéricas y de texto, AND, OR, NOT, BETWEEN, IN, NOT IN seguro, IS NULL, LIKE, comodines, escape y fechas.',
        codeSnippet: `-- Motor de Búsqueda Forense de Incidentes de Seguridad
SELECT l.id, l.usuario_id, l.ip_origen, l.tipo_evento, l.creado_en
FROM auditoria.accesos_log AS l
WHERE (l.tipo_evento IN ('AUTH_FAILED', 'SUSPICIOUS_TOKEN', 'PRIVILEGE_ESCALATION'))
  AND (l.ip_origen LIKE '192.168.!_%' ESCAPE '!' OR l.ip_origen LIKE '10.0.%')
  AND l.creado_en >= '2026-01-01 00:00:00'
  AND l.creado_en < '2026-04-01 00:00:00'
  AND l.detalles IS NOT NULL
  AND NOT l.ignorado_por_seguridad;`,
        codeLanguage: 'sql',
        byteTip: 'El dominio de la cláusula WHERE es lo que diferencia a un programador promedio de un auténtico arquitecto de datos.',
        keyPoints: [
          'Construcción de filtros defensivos e hiperprecisos para ciberseguridad y finanzas',
          'Blindaje total contra trampas de nulos y ambigüedades lógicas',
          'Máximo aprovechamiento de índices y buenas prácticas relacionales'
        ]
      }
    ]
  },
};
