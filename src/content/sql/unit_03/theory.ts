import { TheoryLesson } from '../../../types/theory';

export const SQL_UNIT_03_THEORY: Record<string, TheoryLesson> = {
  'sql-u03-l01': {
    id: 'sql-th-u03-l01',
    lessonId: 'sql-u03-l01',
    pathId: 'sql',
    unitId: 3,
    levelId: 1,
    title: '1. La Cláusula WHERE y Condición de Filtrado Booleano',
    subtitle: 'La cláusula WHERE evalúa una condición lógica para cada fila; solo aquellos registros donde la expresión sea TRUE llegan al reporte final.',
    estimatedMinutes: 5,
    analogy: `La cláusula WHERE es como el guardia de seguridad en la entrada de un club VIP: examina a cada persona que llega por la fila (tabla) y solo permite el paso al salón si su nombre está en la lista de invitados (TRUE). Si no lo está (FALSE), queda descartada de inmediato.`,
    video: {
      title: 'Curso de SQL desde CERO (Completo)',
      channel: 'Soy Dalto',
      duration: '3:20:00',
      url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
      summary: 'Aprende filtrado con WHERE, operadores lógicos AND / OR, rangos con BETWEEN, patrones LIKE y tratamiento de NULL.'
    },
    sections: [
      {
        title: 'El Ciclo de Vida del WHERE en una Consulta',
        explanation: `En SQL, aunque escribes SELECT en la primera línea de tu archivo, el motor de la base de datos ejecuta las cláusulas en un orden muy diferente:

1. FROM: Ubica la tabla de origen en el disco o memoria.
2. WHERE: Evalúa la condición booleana fila por fila y descarta las que no cumplan.
3. SELECT: Proyecta únicamente las columnas solicitadas de las filas sobrevivientes.

La condición del WHERE es un predicado que evalúa a uno de tres estados lógicos: TRUE, FALSE o UNKNOWN (lógica trivaluada). Solo las filas cuyo resultado sea estrictamente TRUE forman parte del resultado final.`,
        codeSnippet: `-- Filtrar clientes que tienen su cuenta activa
SELECT id, nombre, email, activo
FROM usuarios
WHERE activo = true;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+---------------+--------------------+--------+
| id | nombre        | email              | activo |
+----+---------------+--------------------+--------+
|  1 | Ada Lovelace  | ada@pioneers.org   | true   |
|  2 | Grace Hopper  | grace@navy.mil     | true   |
+----+---------------+--------------------+--------+
(2 filas retornadas - usuarios inactivos descartados)`,
        byteTip: 'WHERE se ejecuta ANTES de que el motor proyecte las columnas del SELECT. Por eso no puedes usar alias de columnas creados en el SELECT dentro del WHERE.',
        pitfallTip: 'Cuidado con confundir el operador de asignación con el de comparación. En SQL estándar, la comparación de igualdad se escribe con un solo signo igual (=), nunca doble (==).',
        keyPoints: [
          'WHERE filtra registros en el origen antes de proyectarlos en el SELECT.',
          'Opera bajo lógica trivaluada: TRUE, FALSE o UNKNOWN.',
          'Solo las filas evaluadas como TRUE pasan el filtro.',
          'Los alias de columnas definidos en SELECT no existen aún cuando WHERE se ejecuta.'
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
    title: '2. Comparaciones Numéricas Simples (=, !=, <>, >, <, >=, <=)',
    subtitle: 'Los operadores relacionales permiten comparar valores cuantitativos con exactitud en la cláusula WHERE.',
    estimatedMinutes: 5,
    analogy: `Los operadores numéricos son como los medidores de estatura en una montaña rusa de parque de diversiones: "Estatura >= 1.40 m" para pasar a la atracción extrema, o "Edad < 12 años" para el menú infantil del restaurante.`,
    video: {
      title: 'Curso de SQL desde CERO (Completo)',
      channel: 'Soy Dalto',
      duration: '3:20:00',
      url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
      summary: 'Aprende filtrado con WHERE, operadores lógicos AND / OR, rangos con BETWEEN, patrones LIKE y tratamiento de NULL.'
    },
    sections: [
      {
        title: 'Operadores Relacionales en SQL Estándar',
        explanation: `Las bases de datos relacionales soportan los operadores matemáticos de orden clásicos:

- = : Igual a (atención: un solo signo igual).
- <> o != : Distinto / No igual (ambos son válidos; <> es el estándar formal ANSI SQL).
- > y < : Mayor que y menor que estricto.
- >= y <= : Mayor o igual, y menor o igual.

Estos operadores comparan tipos numéricos como INT, BIGINT, DECIMAL y FLOAT con total fidelidad matemática.`,
        codeSnippet: `-- 1. Productos con precio mayor o igual a 100 USD
SELECT id, nombre, precio, stock
FROM productos
WHERE precio >= 100.00;

-- 2. Cuentas bancarias en números rojos (saldo negativo)
SELECT numero_cuenta, titular, saldo
FROM cuentas
WHERE saldo < 0.00;

-- 3. Empleados con departamento distinto al de ventas
SELECT nombre, departamento
FROM empleados
WHERE departamento <> 'Ventas';`,
        codeLanguage: 'sql',
        outputSnippet: `[Consulta 1 - Productos VIP]
+----+-------------------+--------+-------+
| id | nombre            | precio | stock |
+----+-------------------+--------+-------+
|  4 | Laptop Gamer X    | 899.99 |    12 |
|  7 | Monitor 4K 27"    | 349.50 |     8 |
+----+-------------------+--------+-------+`,
        byteTip: 'Usa el operador <> si buscas máxima portabilidad entre motores antiguos o sistemas bancarios heredados, aunque != es soportado por el 100% de los RDBMS modernos.',
        pitfallTip: 'Al comparar números decimales, usa el tipo DECIMAL o NUMERIC en lugar de FLOAT o DOUBLE para evitar errores de redondeo de coma flotante (ej: 0.1 + 0.2 = 0.30000000000000004).',
        keyPoints: [
          '= comprueba igualdad exacta (un solo signo, no ==).',
          '<> y != denotan desigualdad estricta.',
          '>, <, >= y <= permiten evaluar rangos e intervalos numéricos.'
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
    title: '3. Filtrado de Cadenas de Texto Exactas y Sensibilidad a Mayúsculas',
    subtitle: 'Compara literales entre comillas simples y descubre cómo la colación (Collation) afecta la distinción entre mayúsculas y minúsculas.',
    estimatedMinutes: 5,
    analogy: `Buscar un texto en SQL puede ser como buscar en un archivador estricto: para un archivista meticuloso "GARCÍA" y "garcía" son dos carpetas completamente distintas, mientras que para otro más relajado ambas carpetas significan exactamente lo mismo.`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: 'Comillas Simples y Colaciones de Texto',
        explanation: `En SQL estándar, los valores de texto (cadenas literales) siempre se delimitan con comillas simples ('México'). Las comillas dobles (") están reservadas en el estándar ANSI para identificadores especiales de columnas o nombres con espacios.

La sensibilidad a mayúsculas depende de la Colación (Collation) de la base de datos:
- PostgreSQL / Oracle: Son Case-Sensitive por defecto. 'Admin' no es igual a 'admin'.
- MySQL / SQL Server: Muchas instalaciones usan colaciones Case-Insensitive (como utf8mb4_general_ci) donde 'Admin' y 'admin' coinciden.

Para escribir código universal y 100% predecible en cualquier motor, normaliza con LOWER() o UPPER().`,
        codeSnippet: `-- Búsqueda exacta de país
SELECT nombre, pais, ciudad
FROM clientes
WHERE pais = 'España';

-- Búsqueda insensible universal a mayúsculas usando LOWER():
SELECT id, nombre, email
FROM usuarios
WHERE LOWER(email) = LOWER('Contacto@Empresa.com');`,
        codeLanguage: 'sql',
        outputSnippet: `+----+---------------+----------------------+
| id | nombre        | email                |
+----+---------------+----------------------+
| 14 | Carlos Vega   | contacto@empresa.com |
+----+---------------+----------------------+`,
        byteTip: 'Si consultas millones de filas usando LOWER(columna), crea un Functional Index como CREATE INDEX idx_lower_email ON usuarios(LOWER(email)) para evitar escaneos secuenciales lentos.',
        pitfallTip: 'No uses comillas tipográficas curvadas (“ ” o ‘ ’) copiadas de procesadores de texto como Word, ya que causarán un error de sintaxis inmediato en tu consola SQL.',
        keyPoints: [
          'Los textos literales siempre usan comillas simples (\'texto\').',
          'La sensibilidad a mayúsculas depende de la configuración de Collation.',
          'LOWER(columna) garantiza búsquedas insensibles en cualquier motor relacional.'
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
    title: '4. Conjunción de Filtros con AND',
    subtitle: 'El operador AND exige el cumplimiento simultáneo de múltiples condiciones; una fila solo pasa si TODAS se evalúan como verdaderas.',
    estimatedMinutes: 5,
    analogy: `El operador AND es como una bóveda bancaria de doble llave: requiere la llave del gerente Y la llave del auditor al mismo tiempo. Si cualquiera de las dos falta, la pesada puerta blindada no se moverá ni un milímetro.`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: 'La Tabla de Verdad de la Conjunción',
        explanation: `Cuando unes dos o más condiciones con el operador AND, la cláusula WHERE solo devuelve TRUE si cada una de las condiciones individuales es verdadera.

Tabla de verdad de AND:
- TRUE AND TRUE => TRUE (la fila se incluye).
- TRUE AND FALSE => FALSE (la fila se descarta).
- FALSE AND TRUE => FALSE (la fila se descarta).
- FALSE AND FALSE => FALSE (la fila se descarta).
- TRUE AND UNKNOWN (NULL) => UNKNOWN (la fila se descarta).

Puedes encadenar tantos AND como requiera tu regla de negocio para refinar la precisión del filtro.`,
        codeSnippet: `-- Encontrar productos de computación en oferta que tengan stock disponible
SELECT id, nombre, categoria, precio, stock
FROM productos
WHERE categoria = 'Computación'
  AND precio < 500.00
  AND stock > 0;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+----------------------+-------------+--------+-------+
| id | nombre               | categoria   | precio | stock |
+----+----------------------+-------------+--------+-------+
| 12 | Teclado Mecánico RGB | Computación |  65.50 |    25 |
| 19 | Mouse Ergonómico     | Computación |  32.00 |    14 |
+----+----------------------+-------------+--------+-------+
(Solo filas que cumplen simultáneamente las 3 condiciones)`,
        byteTip: 'Los motores SQL modernos usan evaluación de cortocircuito (short-circuiting): si la primera condición es FALSE, el motor omite evaluar las siguientes para ahorrar CPU.',
        pitfallTip: 'Unir condiciones contradictorias con AND como WHERE id = 1 AND id = 2 siempre devolverá 0 filas, porque una columna de una misma fila no puede tener dos valores distintos a la vez.',
        keyPoints: [
          'AND exige que todas las condiciones sean simultáneamente verdaderas.',
          'Si una sola condición es falsa, toda la fila queda descartada.',
          'Permite refinar progresivamente el conjunto de datos resultante.'
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
    title: '5. Disyunción de Filtros con OR',
    subtitle: 'El operador OR flexibiliza la búsqueda: la fila se incluye en el resultado si al menos una de las condiciones es verdadera.',
    estimatedMinutes: 5,
    analogy: `El operador OR es como la taquilla de boletos con tarifa preferencial en el transporte público: tienes descuento si eres estudiante O si eres adulto mayor. Basta con cumplir cualquiera de los dos requisitos para recibir el boleto.`,
    video: {
      title: 'Curso COMPLETO de SQL y BASES DE DATOS Desde Cero para PRINCIPIANTES',
      channel: 'MoureDev by Brais Moure',
      duration: '2:15:00',
      url: 'https://www.youtube.com/watch?v=OuJerKzV5T0',
      summary: 'Aprende qué es un motor relacional, diseño de tablas, claves primarias y conceptos fundamentales de SQL explicados en español.'
    },
    sections: [
      {
        title: 'Ampliando el Universo de Resultados con OR',
        explanation: `A diferencia de AND que restringe el resultado, OR expande el conjunto de filas devueltas. Si una fila cumple la primera condición, el motor la acepta inmediatamente sin importar si la segunda es falsa.

Tabla de verdad de OR:
- TRUE OR TRUE => TRUE.
- TRUE OR FALSE => TRUE.
- FALSE OR TRUE => TRUE.
- FALSE OR FALSE => FALSE.
- TRUE OR UNKNOWN => TRUE (si una es TRUE, el resultado es TRUE incluso ante valores nulos).`,
        codeSnippet: `-- Localizar envíos con problemas urgentes o cancelados
SELECT id_pedido, cliente, estado, fecha_entrega
FROM pedidos
WHERE estado = 'CANCELADO'
   OR estado = 'RETRASADO';`,
        codeLanguage: 'sql',
        outputSnippet: `+-----------+-----------------+-----------+---------------+
| id_pedido | cliente         | estado    | fecha_entrega |
+-----------+-----------------+-----------+---------------+
|      1042 | Sofía Morales   | RETRASADO | 2024-03-12    |
|      1089 | Roberto Gómez   | CANCELADO | NULL          |
|      1105 | Lucía Fernández | RETRASADO | 2024-03-14    |
+-----------+-----------------+-----------+---------------+`,
        byteTip: 'Si tienes muchas opciones OR sobre la misma columna (ej: pais = \'MX\' OR pais = \'AR\' OR pais = \'CL\'), es mucho más limpio y eficiente usar el operador IN (\'MX\', \'AR\', \'CL\').',
        pitfallTip: 'Las consultas con OR que involucran columnas diferentes pueden obligar al motor a realizar escaneos completos de tabla (Table Scan) si no existen índices adecuados.',
        keyPoints: [
          'OR incluye la fila si al menos una condición resulta verdadera.',
          'Expande los resultados en lugar de restringirlos.',
          'TRUE OR UNKNOWN siempre evalúa como TRUE.'
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
    title: '6. Precedencia de Operadores: AND sobre OR y Paréntesis',
    subtitle: 'AND tiene prioridad matemática natural sobre OR; descubre por qué el uso de paréntesis es obligatorio para evitar fugas catastróficas de datos.',
    estimatedMinutes: 6,
    analogy: `La precedencia de operadores lógicos es exactamente como la regla PEMDAS en matemáticas: en 2 + 3 * 4, la multiplicación se hace primero (dando 14, no 20). En SQL, AND es la multiplicación y OR es la suma. Si no pones paréntesis, el motor resolverá los AND primero y cambiará por completo el sentido de tu consulta.`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: 'El Peligro del Filtro Desprotegido',
        explanation: `Por definición del estándar ANSI SQL, el operador AND tiene mayor precedencia (fuerza de unión) que el operador OR.

Imagina que quieres consultar: "Usuarios activos que sean del departamento de TI o de Ventas".

Si escribes:
WHERE activo = true AND depto = 'TI' OR depto = 'Ventas'

El motor lo interpretará como:
WHERE (activo = true AND depto = 'TI') OR (depto = 'Ventas')

¡El desastre! Esta consulta devolverá a empleados de Ventas inactivos o despedidos hace años, porque la condición de Ventas quedó libre fuera del AND.`,
        codeSnippet: `-- ❌ Consulta INCORRECTA (AND se apodera de TI pero deja a Ventas sin filtrar por activo):
-- SELECT * FROM empleados WHERE activo = true AND depto = 'TI' OR depto = 'Ventas';

-- ✅ Consulta CORRECTA (Los paréntesis aíslan la disyunción departamental):
SELECT id, nombre, depto, activo
FROM empleados
WHERE activo = true 
  AND (depto = 'TI' OR depto = 'Ventas');`,
        codeLanguage: 'sql',
        outputSnippet: `+----+-----------------+--------+--------+
| id | nombre          | depto  | activo |
+----+-----------------+--------+--------+
|  3 | Carlos Slim     | TI     | true   |
|  8 | Mariana Valdez  | Ventas | true   |
+----+-----------------+--------+--------+
(Todos los devueltos son estrictamente activos)`,
        byteTip: 'Regla de oro de la ingeniería de software: SIEMPRE utiliza paréntesis explícitos cuando combines AND y OR en una misma consulta, incluso si crees recordar la precedencia.',
        pitfallTip: 'No confíes en que tus compañeros de equipo o futuros desarrolladores entiendan la precedencia implícita; los paréntesis hacen el código autodocumentado y seguro.',
        keyPoints: [
          'AND tiene mayor precedencia matemática que OR.',
          'Sin paréntesis, OR separa la consulta en bloques independientes no deseados.',
          'Los paréntesis obligan al motor a resolver primero la expresión interna.'
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
    title: '7. Negación Lógica con NOT',
    subtitle: 'El operador NOT invierte el valor de verdad de cualquier predicado booleano, permitiendo exclusiones directas.',
    estimatedMinutes: 5,
    analogy: `El operador NOT es como un cartel de "Cualquier vehículo EXCEPTO camiones pesados". No necesitas listar autos, motocicletas, bicicletas y patinetas individualmente; solo indicas lo que está terminantemente prohibido cruzar.`,
    video: {
      title: 'Curso de SQL desde CERO (Completo)',
      channel: 'Soy Dalto',
      duration: '3:20:00',
      url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
      summary: 'Aprende filtrado con WHERE, operadores lógicos AND / OR, rangos con BETWEEN, patrones LIKE y tratamiento de NULL.'
    },
    sections: [
      {
        title: 'Invirtiendo Predicados Lógicos',
        explanation: `El operador NOT es un operador unario que se antepone a una condición para invertir su resultado:
- NOT TRUE => FALSE.
- NOT FALSE => TRUE.
- NOT UNKNOWN => UNKNOWN (negar lo desconocido sigue siendo desconocido).

Se utiliza con frecuencia antes de operadores como BETWEEN, IN, LIKE o subconsultas EXISTS.`,
        codeSnippet: `-- Excluir clientes que tengan el estado de cuenta suspendido
SELECT id, nombre, estado_cuenta, pais
FROM clientes
WHERE NOT (estado_cuenta = 'SUSPENDIDO');

-- Equivale directamente a:
-- WHERE estado_cuenta <> 'SUSPENDIDO';`,
        codeLanguage: 'sql',
        outputSnippet: `+----+------------------+---------------+---------+
| id | nombre           | estado_cuenta | pais    |
+----+------------------+---------------+---------+
|  1 | Valentina Castro | ACTIVO        | México  |
|  2 | Andrés Bello     | PENDIENTE     | Chile   |
+----+------------------+---------------+---------+`,
        byteTip: 'En condiciones simples, es más legible usar el operador relacional inverso (ej: saldo >= 0 en lugar de NOT (saldo < 0)). Guarda NOT para operadores compuestos como NOT IN o NOT EXISTS.',
        pitfallTip: 'Recuerda que si una fila tiene NULL en la columna evaluada, NOT no la rescatará: NOT(NULL) sigue siendo UNKNOWN y la fila se descartará igualmente.',
        keyPoints: [
          'NOT convierte TRUE en FALSE y FALSE en TRUE.',
          'NOT UNKNOWN sigue resultando en UNKNOWN.',
          'Facilita la lectura en exclusiones de conjuntos (NOT IN, NOT LIKE).'
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
    title: '8. Rangos Inclusivos con BETWEEN ... AND ...',
    subtitle: 'Filtra valores contenidos dentro de un intervalo cerrado donde ambos extremos se encuentran estrictamente incluidos.',
    estimatedMinutes: 5,
    analogy: `El operador BETWEEN es como el rango de horario de entrega de un servicio postal: "El mensajero pasará entre las 9:00 AM y las 2:00 PM". Si el mensajero toca a las 9:00 AM exactas o a las 2:00 PM exactas, está dentro de la ventana acordada.`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: 'Sintaxis y Naturaleza Inclusiva de BETWEEN',
        explanation: `La instrucción campo BETWEEN minimo AND maximo es una alternativa limpia y elegante a escribir dos condiciones unidas por AND.

La equivalencia matemática exacta es:
campo >= minimo AND campo <= maximo

Por definición de la especificación SQL, ambos límites son inclusivos. Si el valor de la columna coincide exactamente con el valor mínimo o con el máximo, la condición resulta TRUE.`,
        codeSnippet: `-- Filtrar productos en la gama media de precios (entre 20 y 100 dólares inclusive)
SELECT id, nombre, precio, stock
FROM productos
WHERE precio BETWEEN 20.00 AND 100.00;

-- Empleados contratados en el año 2023 completo
SELECT nombre, fecha_ingreso
FROM empleados
WHERE fecha_ingreso BETWEEN '2023-01-01' AND '2023-12-31';`,
        codeLanguage: 'sql',
        outputSnippet: `+----+-------------------+--------+-------+
| id | nombre            | precio | stock |
+----+-------------------+--------+-------+
|  2 | Mouse Inalámbrico |  20.00 |    50 |
|  5 | Mochila Antirrobo |  45.90 |    18 |
|  9 | Auriculares Pro   | 100.00 |    30 |
+----+-------------------+--------+-------+
(Observa que los precios extremos 20.00 y 100.00 están incluidos)`,
        byteTip: 'Siempre escribe el valor menor primero y el mayor después: valor BETWEEN 10 AND 50. Si los escribes al revés (50 AND 10), la consulta retornará 0 filas porque ningún número puede ser >= 50 y <= 10 simultáneamente.',
        pitfallTip: 'Mucho cuidado al usar BETWEEN con columnas DATETIME con horas. Si filtras BETWEEN \'2023-01-01\' AND \'2023-01-02\', el límite final se interpreta como las 00:00:00 del día 2, perdiendo todas las transacciones ocurridas durante ese segundo día.',
        keyPoints: [
          'BETWEEN es un operador 100% inclusivo en ambos extremos.',
          'Equivale a columna >= min AND columna <= max.',
          'El valor inferior siempre debe especificarse antes que el superior.'
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
    title: '9. Exclusión de Rangos con NOT BETWEEN',
    subtitle: 'Descarta valores que caigan dentro de un intervalo cerrado, conservando únicamente los valores periféricos o atípicos.',
    estimatedMinutes: 5,
    analogy: `NOT BETWEEN es como el sistema de alarma de temperatura de un refrigerador de vacunas biológicas: si la temperatura está entre 2°C y 8°C todo está en calma; la alarma solo se dispara si la temperatura se sale de esa zona segura (menor a 2°C o mayor a 8°C).`,
    video: {
      title: 'Curso de SQL desde CERO (Completo)',
      channel: 'Soy Dalto',
      duration: '3:20:00',
      url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
      summary: 'Aprende filtrado con WHERE, operadores lógicos AND / OR, rangos con BETWEEN, patrones LIKE y tratamiento de NULL.'
    },
    sections: [
      {
        title: 'Mecánica de la Exclusión de Intervalos',
        explanation: `El operador NOT BETWEEN minimo AND maximo descarta todos los valores que se encuentren dentro del rango cerrado especificado.

Equivalencia lógica formal:
campo < minimo OR campo > maximo

Ten en cuenta que los valores frontera (minimo y maximo) quedan excluidos del resultado devuelto, ya que pertenecen al rango prohibido.`,
        codeSnippet: `-- Detectar productos con precios atípicos (o muy económicos < 10 o de ultra-lujo > 500)
SELECT id, nombre, precio
FROM productos
WHERE precio NOT BETWEEN 10.00 AND 500.00;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+--------------------+---------+
| id | nombre             | precio  |
+----+--------------------+---------+
|  1 | Cable USB Genérico |    4.50 |
| 45 | Servidor Rack Xeon | 2890.00 |
+----+--------------------+---------+
(Precios entre 10.00 y 500.00 fueron completamente descartados)`,
        byteTip: 'Si necesitas incluir los extremos pero excluir el interior, debes usar operadores directos: campo <= min OR campo >= max.',
        pitfallTip: 'Si el campo contiene valores NULL, NOT BETWEEN los ignorará y no los devolverá, ya que cualquier comparación con NULL resulta en UNKNOWN.',
        keyPoints: [
          'NOT BETWEEN descarta los valores dentro del intervalo [min, max].',
          'Equivale lógicamente a campo < min OR campo > max.',
          'Los valores extremos quedan descartados de la salida.'
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
    title: '10. Desafío de Punto Medio: Auditoría de Seguridad con Filtros Combinados',
    subtitle: 'Pon a prueba tus habilidades resolviendo una investigación forense real con filtros multicondicionales complejos.',
    estimatedMinutes: 6,
    analogy: `Eres el detective principal de ciberseguridad en una fintech internacional: un atacante ha intentado desviar fondos usando terminales sospechosas en horarios de madrugada, y tu misión es redactar la consulta exacta que aísle solo las transferencias fraudulentas.`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: 'El Escenario de Auditoría Financiera',
        explanation: `En este ejercicio de mitad de unidad, el equipo de cumplimiento normativo nos solicita identificar transferencias bancarias de alto riesgo bajo los siguientes criterios estrictos:

1. El estado de la transacción debe ser PROCESADA o EN_REVISION.
2. El monto debe ser sospechoso: o bien micropagos inferiores a $5.00 (técnica de carding) o bien transferencias grandes superiores a $10,000.00.
3. La transacción NO debe provenir de sucursales locales verificadas (sucursal_id no debe estar entre 100 y 199).

Observa cómo los paréntesis garantizan que las agrupaciones lógicas no se contaminen.`,
        codeSnippet: `-- Consulta Forense de Auditoría Financiera
SELECT id_transaccion, cuenta_origen, monto, estado, sucursal_id, fecha
FROM transacciones
WHERE (estado = 'PROCESADA' OR estado = 'EN_REVISION')
  AND (monto < 5.00 OR monto > 10000.00)
  AND (sucursal_id NOT BETWEEN 100 AND 199);`,
        codeLanguage: 'sql',
        outputSnippet: `+----------------+---------------+----------+-------------+-------------+---------------------+
| id_transaccion | cuenta_origen | monto    | estado      | sucursal_id | fecha               |
+----------------+---------------+----------+-------------+-------------+---------------------+
| TX-9921        | ACCT-48192    |     1.25 | EN_REVISION |          45 | 2024-03-15 03:22:10 |
| TX-9954        | ACCT-10928    | 45000.00 | PROCESADA   |         502 | 2024-03-15 04:15:00 |
+----------------+---------------+----------+-------------+-------------+---------------------+
(Solo 2 transacciones cumplen todos los vectores de riesgo simultáneamente)`,
        byteTip: 'Formatea consultas complejas con indentación clara y saltos de línea por cada condición mayor. Un WHERE legible reduce errores humanos en auditorías críticas.',
        pitfallTip: 'Olvidar el paréntesis en (estado = \'PROCESADA\' OR estado = \'EN_REVISION\') mezclaría la condición con los montos, incluyendo transferencias legítimas en el informe.',
        keyPoints: [
          'Las auditorías reales combinan igualdad, disyunciones, rangos y negaciones.',
          'Cada bloque de decisión de negocio debe aislarse con paréntesis.',
          'La correcta estructuración del WHERE previene falsos positivos en reportes de seguridad.'
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
    title: '11. Listas de Pertenencia con el Operador IN (...)',
    subtitle: 'Comprueba si el valor de una columna coincide con cualquiera de los elementos listados en un conjunto explícito.',
    estimatedMinutes: 5,
    analogy: `El operador IN es como la lista de verificación del cartero en un edificio residencial: "¿Este paquete es para los departamentos 101, 204 o 305?". En lugar de hacer tres preguntas separadas, verifica la lista completa de una sola ojeada.`,
    video: {
      title: 'CURSO COMPLETO de SQL y BASES DE DATOS Desde Cero (8 horas)',
      channel: 'TodoCode',
      duration: '8:10:00',
      url: 'https://www.youtube.com/watch?v=8N4M994IDt8',
      summary: 'Curso paso a paso con teoría y práctica de modelado de datos, consultas complejas, DISTINCT, funciones escalares y filtros.'
    },
    sections: [
      {
        title: 'Sustituyendo Cadenas Extensas de OR por IN',
        explanation: `Cuando necesitas comparar una misma columna contra múltiples valores posibles, escribir muchos OR resulta repetitivo y propenso a errores:
WHERE pais = 'México' OR pais = 'Colombia' OR pais = 'Argentina' OR pais = 'Chile'

El operador IN soluciona esto con una sintaxis limpia y compacta:
WHERE pais IN ('México', 'Colombia', 'Argentina', 'Chile')

El motor evalúa si el valor de la fila pertenece a la lista; si coincide con al menos uno, retorna TRUE.`,
        codeSnippet: `-- Filtrar clientes de países hispanohablantes específicos
SELECT id, nombre, pais, ciudad
FROM clientes
WHERE pais IN ('México', 'Colombia', 'Argentina', 'Chile', 'España');

-- Filtrar pedidos por códigos de estado específicos
SELECT id_pedido, fecha, estado
FROM pedidos
WHERE estado IN ('EN_CAMINO', 'ENTREGADO');`,
        codeLanguage: 'sql',
        outputSnippet: `+----+------------------+-----------+--------------+
| id | nombre           | pais      | ciudad       |
+----+------------------+-----------+--------------+
|  1 | Mateo Rossi      | Argentina | Buenos Aires |
|  4 | Valentina Castro | México    | Guadalajara  |
|  9 | Camila Rojas     | Chile     | Santiago     |
+----+------------------+-----------+--------------+`,
        byteTip: 'Los motores como PostgreSQL y MySQL optimizan las listas IN estáticas convirtiéndolas internamente en búsquedas hash o b-tree seeks, lo que las hace mucho más veloces que cadenas extensas de OR.',
        pitfallTip: 'Aunque puedes pasar cientos de valores en una lista IN, superar los 1,000 elementos puede causar problemas de memoria en el planificador de consultas; para listas gigantescas usa tablas temporales o JOINs.',
        keyPoints: [
          'IN comprueba pertenencia dentro de una lista finita de valores.',
          'Reemplaza cadenas extensas de comparaciones con OR.',
          'Mejora drásticamente la legibilidad y mantenimiento del código SQL.'
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
    title: '12. Exclusión con NOT IN y la Famosa Trampa de NULL',
    subtitle: 'Descubre cómo excluir listas de elementos y por qué un solo valor NULL dentro de un NOT IN destruirá por completo tu resultado.',
    estimatedMinutes: 6,
    analogy: `Imagina que un profesor dice: "Todos los alumnos excepto los de la lista negra pueden salir al recreo". Pero en la lista negra hay un nombre borroso con tinta corrida que nadie puede leer (NULL). El profesor, ante la duda de si tú podrías ser esa persona borrosa, no deja salir a absolutamente NADIE al recreo.`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: 'La Trampa Mortal de NOT IN con Valores NULL',
        explanation: `NOT IN excluye filas cuyos valores pertenezcan a la lista provista.

Sin embargo, encierra una de las trampas más notorias de SQL:
Si la lista contiene un solo valor NULL, la consulta entera devolverá CERO FILAS.

¿Por qué ocurre esto? Lógicamente, columna NOT IN ('A', NULL) se descompone en:
columna <> 'A' AND columna <> NULL

Como cualquier comparación con NULL resulta en UNKNOWN, tenemos:
TRUE AND UNKNOWN => UNKNOWN.

Al no ser TRUE, el motor descarta todas las filas de la tabla.`,
        codeSnippet: `-- ❌ PELIGRO: Si la lista o subconsulta contiene un NULL, devuelve 0 filas:
-- SELECT * FROM empleados WHERE depto NOT IN ('Ventas', 'RRHH', NULL); -- ¡0 filas!

-- ✅ FORMA SEGURA: Garantizar que no existan nulos en la lista
SELECT id, nombre, depto
FROM empleados
WHERE depto NOT IN ('Ventas', 'RRHH')
  AND depto IS NOT NULL;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+-----------------+-------------+
| id | nombre          | depto       |
+----+-----------------+-------------+
|  1 | Alan Turing     | Criptografía|
|  2 | Grace Hopper    | Sistemas    |
+----+-----------------+-------------+
(Filtrado seguro sin riesgo de colapso por nulos)`,
        byteTip: 'En consultas complejas con subconsultas, los desarrolladores senior suelen preferir NOT EXISTS en lugar de NOT IN, porque NOT EXISTS es inmune a la trampa de los valores NULL.',
        pitfallTip: 'Nunca uses NOT IN contra el resultado de una subconsulta SELECT id FROM tabla_hija sin asegurarte con un WHERE id IS NOT NULL de que la subconsulta no emita ningún nulo.',
        keyPoints: [
          'NOT IN descarta registros que coincidan con la lista.',
          'Si la lista contiene un NULL, la condición evalúa a UNKNOWN para todas las filas.',
          'Retorna 0 registros si hay un NULL presente en el conjunto de exclusión.'
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
    title: '13. El Enigma de NULL: Por Qué = NULL y != NULL Siempre Fallan',
    subtitle: 'NULL no es un valor, sino la ausencia de dato o valor desconocido; entiende por qué las comparaciones tradicionales nunca funcionan.',
    estimatedMinutes: 6,
    analogy: `Imagina dos cajas selladas de cartón en un almacén y no tienes idea de qué hay dentro de ninguna de las dos. Si alguien te pregunta: "¿El contenido de la caja A es idéntico al de la caja B?", tu única respuesta honesta no puede ser "Sí" ni "No", sino "No lo sé" (UNKNOWN).`,
    video: {
      title: 'Curso de SQL desde CERO (Completo)',
      channel: 'Soy Dalto',
      duration: '3:20:00',
      url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
      summary: 'Aprende filtrado con WHERE, operadores lógicos AND / OR, rangos con BETWEEN, patrones LIKE y tratamiento de NULL.'
    },
    sections: [
      {
        title: 'NULL: La Ausencia de Valor en la Teoría Relacional',
        explanation: `En las bases de datos relacionales formuladas por Edgar F. Codd, NULL no es el número cero (0), ni un texto vacío (''), ni un espacio en blanco. Es un marcador especial que indica:
- El dato es desconocido en este momento.
- El dato no aplica para esta fila.
- El dato no fue proporcionado.

Por este motivo, cualquier operación matemática o de igualdad con NULL da como resultado UNKNOWN:
- NULL = NULL => UNKNOWN (no TRUE).
- columna = NULL => UNKNOWN.
- columna != NULL => UNKNOWN.

Dado que la cláusula WHERE solo conserva las filas que evalúan a TRUE, una consulta con WHERE columna = NULL o WHERE columna != NULL jamás retornará resultados.`,
        codeSnippet: `-- ❌ ERROR CLÁSICO DE PRINCIPIANTE (Devuelve 0 filas siempre):
-- SELECT * FROM usuarios WHERE telefono = NULL;

-- ❌ OTRO ERROR COMÚN (Tampoco funciona):
-- SELECT * FROM usuarios WHERE telefono != NULL;

-- Demostración conceptual de evaluación:
-- Si telefono es NULL: (NULL = NULL) => UNKNOWN => DESCARTADO.
-- Si telefono es '555-0101': ('555-0101' = NULL) => UNKNOWN => DESCARTADO.`,
        codeLanguage: 'sql',
        outputSnippet: `+----+--------+----------+
| id | nombre | telefono |
+----+--------+----------+
+----+--------+----------+
(0 filas retornadas - Consulta errónea por usar = NULL)`,
        byteTip: 'Nunca uses operadores de comparación aritmética (=, !=, <>, <, >) con la palabra clave NULL. Para evaluar nulos existen operadores dedicados exclusivos en SQL.',
        pitfallTip: 'Ten cuidado en aplicaciones que generan SQL dinámico concatenando parámetros; si una variable es nula y tu backend genera "columna = " + var, tu consulta fallará silenciosamente.',
        keyPoints: [
          'NULL representa un dato ausente o desconocido.',
          'NULL = NULL no es verdadero; evalúa a UNKNOWN.',
          'Tanto = NULL como != NULL descartan todas las filas de la tabla.'
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
    title: '14. Identificación Segura de Nulos con IS NULL e IS NOT NULL',
    subtitle: 'Aprende a consultar la presencia o ausencia de datos en columnas anulables utilizando los predicados unarios correctos.',
    estimatedMinutes: 5,
    analogy: `Un inspector de trámites gubernamentales revisa una solicitud de pasaporte: no le importa qué dice la casilla del número de teléfono secundario, simplemente verifica si el recuadro fue dejado completamente en blanco (IS NULL) o si el ciudadano escribió algo en él (IS NOT NULL).`,
    video: {
      title: 'Curso de SQL desde CERO (Completo)',
      channel: 'Soy Dalto',
      duration: '3:20:00',
      url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
      summary: 'Aprende filtrado con WHERE, operadores lógicos AND / OR, rangos con BETWEEN, patrones LIKE y tratamiento de NULL.'
    },
    sections: [
      {
        title: 'Los Predicados IS NULL e IS NOT NULL',
        explanation: `Para inspeccionar si un campo carece de datos, SQL proporciona los predicados específicos IS NULL e IS NOT NULL.

Estos operadores son unarios y devuelven un valor booleano definitivo (TRUE o FALSE), resolviendo la ambigüedad de la lógica trivaluada:
- IS NULL: Devuelve TRUE si la columna carece de valor.
- IS NOT NULL: Devuelve TRUE si la columna contiene cualquier valor válido.`,
        codeSnippet: `-- 1. Localizar clientes que aún no han registrado su número de teléfono
SELECT id, nombre, email
FROM clientes
WHERE telefono IS NULL;

-- 2. Localizar pedidos que ya cuentan con fecha de entrega confirmada
SELECT id_pedido, cliente, fecha_entrega
FROM pedidos
WHERE fecha_entrega IS NOT NULL;`,
        codeLanguage: 'sql',
        outputSnippet: `[Consulta 1 - Clientes sin teléfono]
+----+------------------+---------------------+
| id | nombre           | email               |
+----+------------------+---------------------+
|  3 | Linus Torvalds   | linus@kernel.org    |
|  7 | Margaret Hamilton| margaret@apollo.nasa|
+----+------------------+---------------------+

[Consulta 2 - Pedidos entregados]
+-----------+----------------+---------------+
| id_pedido | cliente        | fecha_entrega |
+-----------+----------------+---------------+
|      5001 | Ada Lovelace   | 2024-03-01    |
|      5002 | Alan Turing    | 2024-03-04    |
+-----------+----------------+---------------+`,
        byteTip: 'En bases de datos con millones de filas donde la mayoría tiene NULL (por ejemplo, fecha_cancelacion), un índice parcial como CREATE INDEX idx_cancelados ON pedidos(fecha_cancelacion) WHERE fecha_cancelacion IS NOT NULL ahorra gigabytes de disco.',
        pitfallTip: 'No confundas una cadena de texto vacía (\'\') con un NULL. En PostgreSQL y MySQL una cadena vacía NO es NULL (IS NULL dará FALSE). En Oracle antiguo, paradójicamente, \'\' se trata como NULL.',
        keyPoints: [
          'IS NULL verifica la ausencia total de un valor.',
          'IS NOT NULL verifica que el campo contenga un valor real asignado.',
          'Son los únicos operadores válidos para consultar nulos en SQL estándar.'
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
    title: '15. Búsqueda de Patrones con LIKE y el Comodín %',
    subtitle: 'El operador LIKE permite coincidencias parciales de texto utilizando el comodín porcentaje (%) para sustituir cero o más caracteres.',
    estimatedMinutes: 5,
    analogy: `El comodín % es como la función de autocompletado en el buscador web: escribes "comp..." y el motor te sugiere "computadora", "comprar auto", "compartir pantalla" o "compilador". El % dice: "no me importa qué letras sigan después de aquí, acéptalas todas".`,
    video: {
      title: 'Curso de SQL desde CERO (Completo)',
      channel: 'Soy Dalto',
      duration: '3:20:00',
      url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
      summary: 'Aprende filtrado con WHERE, operadores lógicos AND / OR, rangos con BETWEEN, patrones LIKE y tratamiento de NULL.'
    },
    sections: [
      {
        title: 'Los Tres Patrones Fundamentales con %',
        explanation: `El operador LIKE compara una columna de texto con un patrón que puede incluir comodines.
El comodín % (porcentaje) representa cero, uno o múltiples caracteres arbitrarios:

1. Prefijo ('Juan%'): Comienza por "Juan" y continúa con cualquier cosa ("Juan", "Juana", "Juan Carlos").
2. Sufijo ('%@gmail.com'): Termina exactamente en "@gmail.com".
3. Contenido / Subcadena ('%seguridad%'): Contiene la palabra "seguridad" en cualquier parte del texto.`,
        codeSnippet: `-- 1. Usuarios con correo corporativo de Google
SELECT id, nombre, email
FROM usuarios
WHERE email LIKE '%@gmail.com';

-- 2. Productos cuyo nombre contiene la palabra 'Inalámbrico'
SELECT id, nombre, precio
FROM productos
WHERE nombre LIKE '%Inalámbrico%';

-- 3. Ciudades que inician con 'San' (San José, San Francisco, Santiago)
SELECT nombre, pais
FROM ciudades
WHERE nombre LIKE 'San%';`,
        codeLanguage: 'sql',
        outputSnippet: `+----+--------------------+--------+
| id | nombre             | precio |
+----+--------------------+--------+
|  2 | Mouse Inalámbrico  |  20.00 |
|  8 | Teclado Inalámbrico|  45.00 |
+----+--------------------+--------+`,
        byteTip: '¡Atención al rendimiento! Un patrón como \'Juan%\' puede usar un índice B-Tree tradicional. Pero un patrón con comodín al principio como \'%gmail.com\' desactiva el índice y obliga al motor a escanear toda la tabla. Para búsquedas de subcadenas masivas, usa índices GIN o Full-Text Search.',
        pitfallTip: 'Recuerda que en PostgreSQL LIKE es sensible a mayúsculas. Para búsquedas insensibles en PostgreSQL existe el operador nativo ILIKE (\'nombre ILIKE \'%pro%\'\').',
        keyPoints: [
          'LIKE permite comparar patrones de texto flexibles.',
          '% representa cero o más caracteres arbitrarios.',
          'Colocar % al inicio del patrón anula el uso de índices B-Tree estándar.'
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
    title: '16. Búsqueda de Carácter Único con el Comodín Guion Bajo (_)',
    subtitle: 'El guion bajo (_) exige la coincidencia exacta de exactamente un solo carácter en la posición especificada.',
    estimatedMinutes: 5,
    analogy: `El comodín _ es como resolver una casilla vacía en un juego de crucigrama o ahorcado: tienes la palabra "C _ S A" de exactamente 4 letras. Puede ser "CASA", "COSA" o "CESA", pero jamás podrá ser "CAUSA" porque solo hay espacio para un único carácter en el medio.`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: 'Precisión Posicional con el Guion Bajo',
        explanation: `Mientras que % coincide con cualquier cantidad de letras (incluso cero), el guion bajo _ representa estrictamente un solo carácter obligatorio en esa posición precisa.

Puedes combinar múltiples guiones bajos contiguos para fijar longitudes exactas:
- '_' : Exactamente un carácter.
- '___' : Exactamente tres caracteres.
- 'AB_D' : Cuatro letras, donde la tercera puede ser cualquiera ("ABAD", "ABCD", etc.).`,
        codeSnippet: `-- Filtrar códigos de producto con formato específico: 'PROD-' seguido de 3 dígitos y una letra
-- Ejemplo válido: 'PROD-102A', 'PROD-999Z'
SELECT codigo, descripcion, stock
FROM inventario
WHERE codigo LIKE 'PROD-____';

-- Palabras de exactamente 4 letras que inician con 'C' y terminan en 'A'
SELECT palabra
FROM diccionario
WHERE palabra LIKE 'C__A';`,
        codeLanguage: 'sql',
        outputSnippet: `+-----------+---------------------+-------+
| codigo    | descripcion         | stock |
+-----------+---------------------+-------+
| PROD-102A | Sensor de Proximidad|    40 |
| PROD-509X | Microcontrolador    |   120 |
+-----------+---------------------+-------+`,
        byteTip: 'Si necesitas buscar literalmente un carácter que coincide con un comodín (como un descuento del "20%"), debes escapar el símbolo usando cláusula ESCAPE: WHERE texto LIKE \'%20!%%\' ESCAPE \'!\'.',
        pitfallTip: 'Un espacio en blanco es un carácter válido. Si un registro tiene \'C  A\' (con dos espacios), LIKE \'C__A\' evaluará a TRUE.',
        keyPoints: [
          '_ sustituye exactamente un único carácter.',
          'Permite validar la longitud estricta de una cadena o código.',
          'Se puede combinar libremente con % en una misma expresión LIKE.'
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
    title: '17. Exclusión de Patrones con NOT LIKE',
    subtitle: 'Descarta registros que coincidan con un formato o texto específico, filtrando datos no deseados.',
    estimatedMinutes: 5,
    analogy: `El operador NOT LIKE es como el filtro antispam de tu buzón de correo electrónico: analiza el remitente y manda a la papelera cualquier mensaje que provenga de dominios no corporativos o que contenga la palabra "lotería".`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: 'Descartando Cadenas que Coinciden con Patrones',
        explanation: `La combinación de NOT y LIKE invierte la búsqueda, reteniendo únicamente las filas cuya columna de texto no encaje con el patrón provisto.

Es una herramienta fundamental para limpieza y depuración de bases de datos operativas (Data Cleansing), permitiendo aislar registros reales y descartar usuarios de pruebas (ej: %test%, %temp%).`,
        codeSnippet: `-- Filtrar usuarios legítimos excluyendo cuentas de prueba y correos temporales
SELECT id, nombre, email
FROM usuarios
WHERE email NOT LIKE '%@test.com'
  AND email NOT LIKE '%@tempmail.%'
  AND nombre NOT LIKE 'Test%';`,
        codeLanguage: 'sql',
        outputSnippet: `+----+------------------+---------------------+
| id | nombre           | email               |
+----+------------------+---------------------+
|  1 | Valentina Castro | vcastro@empresa.com |
|  2 | Mateo Rossi      | mrossi@banco.ar     |
+----+------------------+---------------------+
(Cuentas con 'Test' o correos temporales fueron excluidas)`,
        byteTip: 'Si necesitas comprobar múltiples exclusiones complejas o expresiones regulares avanzadas, evalúa los operadores REGEXP / ~ disponibles en PostgreSQL y MySQL.',
        pitfallTip: 'Al igual que con todos los operadores booleanos, si la columna evaluada es NULL, NOT LIKE no la incluirá a menos que agregues explícitamente OR columna IS NULL.',
        keyPoints: [
          'NOT LIKE descarta filas que coincidan con el patrón especificado.',
          'Es clave para tareas de limpieza de datos e informes de producción.',
          'Las filas con valor NULL quedan excluidas automáticamente.'
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
    title: '18. Filtrado Temporal: Fechas, Horas y Timestamps',
    subtitle: 'Comprende el estándar ISO-8601 para literales de fecha y el patrón seguro de intervalos semiabiertos en columnas temporales.',
    estimatedMinutes: 6,
    analogy: `El filtrado de fechas es como el arqueo de caja de un supermercado: si quieres auditar las ventas del 15 de marzo, debes considerar desde el primer segundo (00:00:00) hasta el último instante antes de que empiece el 16 de marzo. Si solo comparas contra la fecha sin horas, perderás todas las ventas de la tarde y la noche.`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: 'El Estándar ISO-8601 y la Regla del Intervalo Semiabierto',
        explanation: `En SQL estándar, los literales de fecha siempre se escriben como cadenas de texto en formato ISO-8601: 'YYYY-MM-DD' (año-mes-día) o 'YYYY-MM-DD HH:MI:SS' para timestamps con hora.

El gran error con columnas DATETIME o TIMESTAMP:
Si una columna guarda hora y filtras:
WHERE fecha = '2024-03-15'
El motor lo expande a '2024-03-15 00:00:00'. Una venta ocurrida a las 14:30 no coincidirá y se perderá.

Para filtrar un día o mes completo de forma 100% segura y precisa, utiliza el patrón de intervalo semiabierto (>= inicio AND < fin):`,
        codeSnippet: `-- ✅ EL PATRÓN PROFESIONAL DE ORO PARA FECHAS:
-- Ventas ocurridas durante todo el mes de marzo de 2024
SELECT id_venta, cliente, total, fecha_hora
FROM ventas
WHERE fecha_hora >= '2024-03-01'
  AND fecha_hora <  '2024-04-01';`,
        codeLanguage: 'sql',
        outputSnippet: `+----------+---------------+--------+---------------------+
| id_venta | cliente       | total  | fecha_hora          |
+----------+---------------+--------+---------------------+
|    90101 | Carlos Slim   | 450.00 | 2024-03-01 09:15:00 |
|    90442 | Ada Lovelace  | 120.50 | 2024-03-31 23:58:12 |
+----------+---------------+--------+---------------------+
(Captura desde el primer segundo de marzo hasta el último sin perder nada)`,
        byteTip: 'El intervalo semiabierto (>= y <) es inmune a problemas de precisión de milisegundos o microsegundos, a diferencia de BETWEEN que suele fallar en las 23:59:59.999.',
        pitfallTip: 'Evita aplicar funciones a la columna como WHERE CAST(fecha_hora AS DATE) = \'2024-03-15\', ya que esa función destruye la capacidad del motor de usar índices B-Tree en esa columna.',
        keyPoints: [
          'Usa siempre el estándar ISO-8601 (\'YYYY-MM-DD\') para evitar ambigüedades entre día y mes.',
          'Las columnas TIMESTAMP contienen horas, minutos y segundos.',
          'El intervalo semiabierto (>= inicio AND < fin_siguiente) es el estándar de oro en la industria.'
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
    title: '19. Buenas Prácticas de Rendimiento: Consultas SARGables e Índices',
    subtitle: 'Descubre el concepto de SARGability (Search Argument Able) y aprende a no destruir los índices de tu base de datos en el WHERE.',
    estimatedMinutes: 6,
    analogy: `Imagina buscar una palabra en un diccionario de 1,000 páginas ordenado alfabéticamente (índice B-Tree). Si buscas palabras que empiecen por "Z", vas directo al final en 1 segundo (Index Seek). Pero si alguien te dice: "Encuentra todas las palabras donde la última letra al revés sea una vocal", el orden alfabético no te sirve de nada y tienes que leer las 1,000 páginas una por una (Table Scan lento).`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: '¿Qué es una Consulta SARGable?',
        explanation: `Un predicado en el WHERE es SARGable (Search Argument Able) cuando el motor de base de datos puede aprovechar directamente un índice existente en la columna para saltar a las filas deseadas en milisegundos (Index Seek), en lugar de leer toda la tabla desde el disco (Full Table Scan).

El error número 1 que cometen los programadores es envolver la columna indexada dentro de una función o cálculo matemático.

Al hacer esto, el motor no sabe qué valor buscar en el índice sin antes ejecutar la función para cada uno de los millones de filas existentes.`,
        codeSnippet: `-- ❌ NO SARGABLE (Lento: obliga a leer millones de filas y calcular YEAR() en cada una):
-- SELECT * FROM facturas WHERE YEAR(fecha_emision) = 2024;

-- ✅ SARGABLE (Ultrarrápido: el motor usa el índice B-Tree para saltar directamente al rango):
SELECT id, numero_factura, total, fecha_emision
FROM facturas
WHERE fecha_emision >= '2024-01-01' 
  AND fecha_emision <  '2025-01-01';

-- ❌ NO SARGABLE: WHERE precio * 1.16 > 100.00
-- ✅ SARGABLE:    WHERE precio > (100.00 / 1.16)`,
        codeLanguage: 'sql',
        outputSnippet: `[Plan de Ejecución Comparativo]
Consulta 1 (No Sargable): Index Scan / Table Scan (Costo: 450.2 ms en 1M filas)
Consulta 2 (Sargable):    Index Seek (Costo: 1.2 ms en 1M filas - ¡375x más rápida!)`,
        byteTip: 'Pasa las operaciones matemáticas y funciones al lado del valor literal, dejando la columna del lado izquierdo limpia y solitaria.',
        pitfallTip: 'Casteos implícitos de tipo (ej: comparar una columna VARCHAR indexada con un entero numérico WHERE codigo_str = 1045) también rompen la sargabilidad en muchos motores.',
        keyPoints: [
          'SARGable significa que la condición puede usar un índice de búsqueda directa.',
          'Nunca envuelvas una columna indexada dentro de funciones (YEAR, UPPER, SUBSTRING).',
          'Mueve los cálculos y transformaciones al lado de las constantes o parámetros.'
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
    title: '20. Desafío Maestro de Unidad: Motor de Filtrado Multicriterio para E-Commerce',
    subtitle: 'Diseña la consulta completa para el motor de búsqueda y catálogo de una tienda en línea internacional.',
    estimatedMinutes: 7,
    analogy: `Estás construyendo el motor de filtros que usan millones de compradores en Amazon o Mercado Libre: cuando un usuario marca "Solo Prime", "Marcas: Sony o Apple", "Rango de precio: $50 a $300", "Calificación >= 4 estrellas" y excluye productos sin inventario, tu consulta SQL es la encargada de entregar el catálogo exacto en 50 milisegundos.`,
    video: {
      title: 'Aprende SQL - Curso desde cero con MySQL, PostgreSQL y Bases Relacionales',
      channel: 'freeCodeCamp Español',
      duration: '3:45:00',
      url: 'https://www.youtube.com/watch?v=6JBsoPOwPew',
      summary: 'Curso exhaustivo en español para comprender bases de datos relacionales, tipos de datos, restricciones y buenas prácticas.'
    },
    sections: [
      {
        title: 'El Desafío del Catálogo E-Commerce',
        explanation: `En este proyecto final de la Unidad 3, implementarás la consulta central del catálogo web de nuestra tienda de tecnología bajo los siguientes requerimientos de producto:

1. Categoría y Marcas: Productos de la categoría 'Electrónica' y de marcas oficiales ('Sony', 'Bose' o 'Apple').
2. Rango de Precios: Precio entre $50.00 y $350.00 (inclusive).
3. Disponibilidad: Debe haber inventario disponible (stock > 0) y la fecha de descontinuación debe ser nula (fecha_descontinuado IS NULL).
4. Búsqueda textual: El nombre del producto debe contener la palabra 'Auriculares' o 'Parlante'.
5. SARGability: La consulta debe estructurarse con precedencia impecable para permitir el uso de índices compuestos en la base de datos.`,
        codeSnippet: `-- Consulta Maestra del Motor de Catálogo E-Commerce
SELECT 
    id, 
    nombre, 
    marca, 
    precio, 
    stock, 
    calificacion
FROM productos
WHERE categoria = 'Electrónica'
  AND marca IN ('Sony', 'Bose', 'Apple')
  AND precio BETWEEN 50.00 AND 350.00
  AND stock > 0
  AND fecha_descontinuado IS NULL
  AND (nombre LIKE '%Auriculares%' OR nombre LIKE '%Parlante%')
ORDER BY precio ASC;`,
        codeLanguage: 'sql',
        outputSnippet: `+----+--------------------------------+-------+--------+-------+--------------+
| id | nombre                         | marca | precio | stock | calificacion |
+----+--------------------------------+-------+--------+-------+--------------+
| 14 | Parlante Bluetooth Portátil    | Sony  |  79.99 |    35 |          4.6 |
| 22 | Auriculares Inalámbricos Pro   | Apple | 199.00 |    18 |          4.8 |
| 31 | Auriculares Noise Cancelling   | Bose  | 279.50 |     9 |          4.9 |
+----+--------------------------------+-------+--------+-------+--------------+
(Resultados filtrados con precisión absoluta, ordenados y listos para mostrar al usuario)`,
        byteTip: '¡Felicitaciones por completar la Unidad 3! Dominar el WHERE con lógica trivaluada, SARGability y operadores compuestos es la habilidad que separa a un aficionado de un verdadero ingeniero de datos.',
        pitfallTip: 'Siempre valida que los filtros de texto dinámicos ingresados por usuarios web se transmitan usando Prepared Statements o consultas parametrizadas para evitar ataques catastróficos de SQL Injection.',
        keyPoints: [
          'Integra operadores relacionales (=, >), de conjunto (IN), de rango (BETWEEN) y nulos (IS NULL).',
          'Los paréntesis en la disyunción textual aíslan el OR del resto de condiciones obligatorias con AND.',
          'El orden de evaluación y la SARGability garantizan tiempos de respuesta instantáneos en producción.'
        ]
      }
    ]
  }
};
