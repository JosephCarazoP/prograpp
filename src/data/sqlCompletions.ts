import { CodeCompletionItem } from '../types/autocomplete';

export const SQL_COMPLETIONS: CodeCompletionItem[] = [
  // ─── CLÁUSULAS Y SENTENCIAS PRINCIPALES ───
  {
    label: 'UPDATE',
    insertText: 'UPDATE ',
    kind: 'statement',
    detail: 'Sentencia DML',
    signature: 'UPDATE tabla SET columna1 = valor1, columna2 = valor2 WHERE condicion;',
    description: 'Modifica o actualiza registros existentes en una tabla especificando las columnas a cambiar y sus nuevos valores.',
    example: 'UPDATE usuarios SET activo = 1, rol = "admin" WHERE id = 10;'
  },
  {
    label: 'SELECT',
    insertText: 'SELECT ',
    kind: 'statement',
    detail: 'Consulta DQL',
    signature: 'SELECT col1, col2 FROM tabla WHERE condicion;',
    description: 'Recupera y consulta columnas o expresiones de datos a partir de una o más tablas de la base de datos.',
    example: 'SELECT id, nombre, email FROM estudiantes WHERE promedio >= 85;'
  },
  {
    label: 'FROM',
    insertText: 'FROM ',
    kind: 'keyword',
    detail: 'Cláusula Origen',
    signature: 'FROM nombre_tabla',
    description: 'Indica la tabla, vista o subconsulta de la cual se van a extraer los datos en la consulta SELECT o DELETE.',
    example: 'SELECT * FROM productos WHERE precio < 100;'
  },
  {
    label: 'WHERE',
    insertText: 'WHERE ',
    kind: 'keyword',
    detail: 'Filtro',
    signature: 'WHERE condicion_logica',
    description: 'Filtra las filas devueltas o modificadas evaluando una o varias condiciones lógicas booleanas.',
    example: 'WHERE categoria = "Electrónica" AND stock > 0'
  },
  {
    label: 'INSERT INTO',
    insertText: 'INSERT INTO ',
    kind: 'statement',
    detail: 'Inserción DML',
    signature: 'INSERT INTO tabla (col1, col2) VALUES (val1, val2);',
    description: 'Inserta una o más filas nuevas con sus respectivos valores en la tabla especificada.',
    example: 'INSERT INTO clientes (nombre, email) VALUES ("María", "maria@mail.com");'
  },
  {
    label: 'DELETE FROM',
    insertText: 'DELETE FROM ',
    kind: 'statement',
    detail: 'Eliminación DML',
    signature: 'DELETE FROM tabla WHERE condicion;',
    description: 'Elimina filas de una tabla según el criterio WHERE. Precaución: si se omite WHERE, se borrarán todos los registros.',
    example: 'DELETE FROM sesiones WHERE expirada = 1;'
  },
  {
    label: 'CREATE TABLE',
    insertText: 'CREATE TABLE ',
    kind: 'statement',
    detail: 'Definición DDL',
    signature: 'CREATE TABLE IF NOT EXISTS tabla (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nombre TEXT NOT NULL\n);',
    description: 'Crea una nueva tabla en la base de datos definiendo sus columnas, tipos de datos y restricciones.',
    example: 'CREATE TABLE empleados (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nombre TEXT NOT NULL,\n    salario REAL\n);'
  },
  {
    label: 'DROP TABLE',
    insertText: 'DROP TABLE ',
    kind: 'statement',
    detail: 'Eliminación DDL',
    signature: 'DROP TABLE IF EXISTS nombre_tabla;',
    description: 'Elimina permanentemente una tabla y todos los datos que contiene de la base de datos.',
    example: 'DROP TABLE IF EXISTS temporal;'
  },
  {
    label: 'ALTER TABLE',
    insertText: 'ALTER TABLE ',
    kind: 'statement',
    detail: 'Modificación DDL',
    signature: 'ALTER TABLE tabla ADD COLUMN columna TIPO;',
    description: 'Modifica la estructura de una tabla existente (por ejemplo, para agregar nuevas columnas o renombrarla).',
    example: 'ALTER TABLE usuarios ADD COLUMN telefono TEXT;'
  },

  // ─── UNIONES (JOINS) ───
  {
    label: 'JOIN',
    insertText: 'JOIN ',
    kind: 'keyword',
    detail: 'Unión',
    signature: 'JOIN tabla2 ON tabla1.id = tabla2.foranea_id',
    description: 'Combina filas de dos o más tablas en base a una columna relacionada entre ellas (equivalente a INNER JOIN).',
    example: 'SELECT p.nombre, c.categoria FROM productos p JOIN categorias c ON p.cat_id = c.id;'
  },
  {
    label: 'INNER JOIN',
    insertText: 'INNER JOIN ',
    kind: 'keyword',
    detail: 'Unión interna',
    signature: 'INNER JOIN tabla2 ON tabla1.id = tabla2.tabla1_id',
    description: 'Une dos tablas y devuelve únicamente las filas que tengan valores coincidentes en ambas tablas.',
    example: 'SELECT u.nombre, o.total FROM usuarios u INNER JOIN ordenes o ON u.id = o.usuario_id;'
  },
  {
    label: 'LEFT JOIN',
    insertText: 'LEFT JOIN ',
    kind: 'keyword',
    detail: 'Unión izquierda',
    signature: 'LEFT JOIN tabla2 ON tabla1.id = tabla2.tabla1_id',
    description: 'Retorna todas las filas de la tabla de la izquierda y las filas coincidentes de la tabla de la derecha (o NULL si no coinciden).',
    example: 'SELECT c.nombre, p.numero FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id;'
  },
  {
    label: 'ON',
    insertText: 'ON ',
    kind: 'keyword',
    detail: 'Condición de JOIN',
    signature: 'ON tabla1.clave = tabla2.foranea',
    description: 'Establece la condición de igualdad o correspondencia sobre la cual se enlazan dos tablas en un JOIN.',
    example: 'ON estudiantes.id = matriculas.estudiante_id'
  },

  // ─── AGRUPACIÓN, ORDEN Y LÍMITES ───
  {
    label: 'GROUP BY',
    insertText: 'GROUP BY ',
    kind: 'keyword',
    detail: 'Agrupamiento',
    signature: 'GROUP BY columna1, columna2',
    description: 'Agrupa filas que tienen los mismos valores en columnas de resumen para utilizarlas con funciones agregadas (COUNT, SUM, AVG).',
    example: 'SELECT departamento, COUNT(*) FROM empleados GROUP BY departamento;'
  },
  {
    label: 'HAVING',
    insertText: 'HAVING ',
    kind: 'keyword',
    detail: 'Filtro de grupo',
    signature: 'HAVING condicion_agregada',
    description: 'Filtra los grupos resultantes generados por una cláusula GROUP BY mediante una condición sobre funciones agregadas.',
    example: 'SELECT depto, AVG(salario) FROM personal GROUP BY depto HAVING AVG(salario) > 2500;'
  },
  {
    label: 'ORDER BY',
    insertText: 'ORDER BY ',
    kind: 'keyword',
    detail: 'Ordenamiento',
    signature: 'ORDER BY columna1 [ASC | DESC]',
    description: 'Ordena el conjunto de resultados obtenido de forma ascendente (ASC, por defecto) o descendente (DESC).',
    example: 'SELECT * FROM ranking ORDER BY puntos DESC, nombre ASC;'
  },
  {
    label: 'LIMIT',
    insertText: 'LIMIT ',
    kind: 'keyword',
    detail: 'Paginación',
    signature: 'LIMIT cantidad [OFFSET inicio]',
    description: 'Limita el número máximo de filas devueltas por la consulta SQL.',
    example: 'SELECT * FROM articulos ORDER BY fecha DESC LIMIT 5;'
  },
  {
    label: 'OFFSET',
    insertText: 'OFFSET ',
    kind: 'keyword',
    detail: 'Desplazamiento',
    signature: 'OFFSET numero_filas',
    description: 'Omite el número especificado de filas iniciales antes de comenzar a retornar registros (útil para paginación).',
    example: 'SELECT * FROM productos LIMIT 10 OFFSET 20;'
  },
  {
    label: 'DISTINCT',
    insertText: 'DISTINCT ',
    kind: 'keyword',
    detail: 'Sin duplicados',
    signature: 'SELECT DISTINCT columna FROM tabla',
    description: 'Elimina las filas duplicadas y devuelve únicamente valores únicos en el resultado.',
    example: 'SELECT DISTINCT pais FROM proveedores;'
  },
  {
    label: 'VALUES',
    insertText: 'VALUES ()',
    cursorOffset: -1,
    kind: 'keyword',
    detail: 'Valores',
    signature: 'VALUES (valor1, valor2, ...)',
    description: 'Define los valores literales que serán insertados en las columnas correspondientes en un INSERT INTO.',
    example: 'INSERT INTO notas (materia, calificacion) VALUES ("Bases de Datos", 100);'
  },
  {
    label: 'SET',
    insertText: 'SET ',
    kind: 'keyword',
    detail: 'Asignación',
    signature: 'SET columna1 = valor1, columna2 = valor2',
    description: 'Especifica las columnas y sus nuevos valores a actualizar dentro de una sentencia UPDATE.',
    example: 'UPDATE cursos SET cupos = cupos - 1 WHERE id = 3;'
  },

  // ─── OPERADORES LÓGICOS Y DE COMPARACIÓN ───
  {
    label: 'LIKE',
    insertText: 'LIKE ',
    kind: 'keyword',
    detail: 'Patrones',
    signature: 'columna LIKE "%patron%"',
    description: 'Compara un valor de texto contra un patrón utilizando comodines: % (cualquier cantidad de caracteres) o _ (un solo carácter).',
    example: 'SELECT * FROM personas WHERE correo LIKE "%@gmail.com";'
  },
  {
    label: 'BETWEEN',
    insertText: 'BETWEEN ',
    kind: 'keyword',
    detail: 'Rango inclusivo',
    signature: 'columna BETWEEN min AND max',
    description: 'Comprueba si un valor se encuentra dentro de un rango numérico, de texto o fecha inclusivo.',
    example: 'SELECT * FROM ventas WHERE fecha BETWEEN "2026-01-01" AND "2026-12-31";'
  },
  {
    label: 'IN',
    insertText: 'IN ()',
    cursorOffset: -1,
    kind: 'keyword',
    detail: 'Pertenencia',
    signature: 'columna IN (valor1, valor2, ...)',
    description: 'Determina si el valor de una columna coincide con cualquiera de los valores indicados en una lista o subconsulta.',
    example: 'SELECT * FROM pedidos WHERE estado IN ("pendiente", "enviado");'
  },
  {
    label: 'IS NULL',
    insertText: 'IS NULL',
    kind: 'keyword',
    detail: 'Nulo',
    signature: 'columna IS NULL',
    description: 'Verifica si el valor de una columna no contiene datos (es nulo). En SQL no se debe comparar con = NULL.',
    example: 'SELECT * FROM clientes WHERE telefono IS NULL;'
  },
  {
    label: 'IS NOT NULL',
    insertText: 'IS NOT NULL',
    kind: 'keyword',
    detail: 'No nulo',
    signature: 'columna IS NOT NULL',
    description: 'Verifica si el valor de una columna contiene un dato válido (no es nulo).',
    example: 'SELECT * FROM clientes WHERE telefono IS NOT NULL;'
  },
  {
    label: 'AND',
    insertText: 'AND ',
    kind: 'keyword',
    detail: 'Y Lógico',
    signature: 'condicion1 AND condicion2',
    description: 'Operador lógico que devuelve verdadero únicamente cuando ambas condiciones son verdaderas.',
    example: 'WHERE edad >= 18 AND activo = 1'
  },
  {
    label: 'OR',
    insertText: 'OR ',
    kind: 'keyword',
    detail: 'O Lógico',
    signature: 'condicion1 OR condicion2',
    description: 'Operador lógico que devuelve verdadero si al menos una de las dos condiciones es verdadera.',
    example: 'WHERE ciudad = "Alajuela" OR ciudad = "Heredia"'
  },
  {
    label: 'NOT',
    insertText: 'NOT ',
    kind: 'keyword',
    detail: 'Negación',
    signature: 'NOT (condicion)',
    description: 'Invierte el valor de verdad de una condición lógica.',
    example: 'WHERE NOT (precio > 500)'
  },

  // ─── RESTRICCIONES DE INTEGRIDAD ───
  {
    label: 'PRIMARY KEY',
    insertText: 'PRIMARY KEY',
    kind: 'keyword',
    detail: 'Clave Primaria',
    signature: 'columna INTEGER PRIMARY KEY AUTOINCREMENT',
    description: 'Restricción que identifica unívocamente cada fila de la tabla; rechaza duplicados y valores nulos.',
    example: 'id INTEGER PRIMARY KEY AUTOINCREMENT'
  },
  {
    label: 'FOREIGN KEY',
    insertText: 'FOREIGN KEY () REFERENCES ()',
    cursorOffset: -16,
    kind: 'keyword',
    detail: 'Clave Foránea',
    signature: 'FOREIGN KEY (columna) REFERENCES tabla_padre(columna_padre)',
    description: 'Establece una relación de integridad referencial vinculando una columna con la clave primaria de otra tabla.',
    example: 'FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE'
  },
  {
    label: 'AUTOINCREMENT',
    insertText: 'AUTOINCREMENT',
    kind: 'keyword',
    detail: 'Autoincremental',
    signature: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    description: 'Instruye a SQLite para que genere números correlativos y nunca reutilice IDs de filas eliminadas.',
    example: 'id INTEGER PRIMARY KEY AUTOINCREMENT'
  },
  {
    label: 'NOT NULL',
    insertText: 'NOT NULL',
    kind: 'keyword',
    detail: 'Obligatorio',
    signature: 'columna TIPO NOT NULL',
    description: 'Restricción que prohíbe que el campo quede vacío o almacene valores nulos.',
    example: 'titulo TEXT NOT NULL'
  },
  {
    label: 'UNIQUE',
    insertText: 'UNIQUE',
    kind: 'keyword',
    detail: 'Único',
    signature: 'columna TIPO UNIQUE',
    description: 'Garantiza que todos los registros tengan valores distintos en esta columna.',
    example: 'cedula TEXT UNIQUE NOT NULL'
  },
  {
    label: 'DEFAULT',
    insertText: 'DEFAULT ',
    kind: 'keyword',
    detail: 'Por defecto',
    signature: 'columna TIPO DEFAULT valor_predeterminado',
    description: 'Asigna un valor predeterminado si no se suministra ninguno durante la operación de inserción.',
    example: 'fecha TEXT DEFAULT CURRENT_TIMESTAMP'
  },
  {
    label: 'CHECK',
    insertText: 'CHECK ()',
    cursorOffset: -1,
    kind: 'keyword',
    detail: 'Validación',
    signature: 'CHECK (condicion_validacion)',
    description: 'Valida que los datos insertados o actualizados cumplan una regla booleana.',
    example: 'CHECK (precio >= 0 AND stock >= 0)'
  },

  // ─── FUNCIONES AGREGADAS Y ESCALARES ───
  {
    label: 'COUNT',
    insertText: 'COUNT(*)',
    kind: 'function',
    detail: 'Agregación',
    signature: 'COUNT(*) o COUNT(columna)',
    description: 'Calcula y devuelve el número total de filas o valores no nulos que coinciden con los filtros de la consulta.',
    example: 'SELECT COUNT(*) AS total_usuarios FROM usuarios;'
  },
  {
    label: 'SUM',
    insertText: 'SUM()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Agregación',
    signature: 'SUM(columna_numerica)',
    description: 'Calcula la suma total acumulada de los valores numéricos contenidos en la columna indicada.',
    example: 'SELECT SUM(monto) AS total_ventas FROM facturas;'
  },
  {
    label: 'AVG',
    insertText: 'AVG()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Agregación',
    signature: 'AVG(columna_numerica)',
    description: 'Calcula la media aritmética o promedio de los valores numéricos de una columna.',
    example: 'SELECT AVG(calificacion) AS promedio_clase FROM notas;'
  },
  {
    label: 'MIN',
    insertText: 'MIN()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Agregación',
    signature: 'MIN(columna)',
    description: 'Devuelve el valor más pequeño o mínimo presente en la columna evaluada.',
    example: 'SELECT MIN(precio) AS mas_barato FROM productos;'
  },
  {
    label: 'MAX',
    insertText: 'MAX()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Agregación',
    signature: 'MAX(columna)',
    description: 'Devuelve el valor más grande o máximo presente en la columna evaluada.',
    example: 'SELECT MAX(salario) AS salario_maximo FROM empleados;'
  },
  {
    label: 'ROUND',
    insertText: 'ROUND(, 2)',
    cursorOffset: -4,
    kind: 'function',
    detail: 'Matemática',
    signature: 'ROUND(numero, cantidad_decimales)',
    description: 'Redondea un número decimal al número de decimales especificado.',
    example: 'SELECT ROUND(AVG(precio), 2) FROM productos;'
  },
  {
    label: 'UPPER',
    insertText: 'UPPER()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Cadena',
    signature: 'UPPER(cadena_texto)',
    description: 'Convierte todos los caracteres del texto a letras mayúsculas.',
    example: 'SELECT UPPER(nombre) FROM clientes;'
  },
  {
    label: 'LOWER',
    insertText: 'LOWER()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Cadena',
    signature: 'LOWER(cadena_texto)',
    description: 'Convierte todos los caracteres del texto a letras minúsculas.',
    example: 'SELECT LOWER(email) FROM usuarios;'
  },
  {
    label: 'LENGTH',
    insertText: 'LENGTH()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Cadena',
    signature: 'LENGTH(cadena)',
    description: 'Devuelve el número de caracteres contenidos en una cadena de texto.',
    example: 'SELECT * FROM usuarios WHERE LENGTH(password) < 8;'
  },
  {
    label: 'COALESCE',
    insertText: 'COALESCE()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Control nulo',
    signature: 'COALESCE(val1, val2, ...)',
    description: 'Evalúa la lista de argumentos en orden y devuelve el primer valor que no sea NULL.',
    example: 'SELECT COALESCE(telefono, "Sin teléfono") FROM contactos;'
  },

  // ─── TIPOS DE DATOS SQLITE ───
  {
    label: 'INTEGER',
    insertText: 'INTEGER',
    kind: 'type',
    detail: 'Tipo Entero',
    signature: 'INTEGER',
    description: 'Tipo de dato para valores numéricos enteros con signo (1, 2, 3, 4, 6 u 8 bytes en SQLite).',
    example: 'edad INTEGER'
  },
  {
    label: 'TEXT',
    insertText: 'TEXT',
    kind: 'type',
    detail: 'Tipo Texto',
    signature: 'TEXT',
    description: 'Cadena de texto de longitud variable almacenada en codificación UTF-8 o UTF-16.',
    example: 'descripcion TEXT'
  },
  {
    label: 'REAL',
    insertText: 'REAL',
    kind: 'type',
    detail: 'Tipo Decimal',
    signature: 'REAL',
    description: 'Valor numérico de coma flotante de precisión doble IEEE de 8 bytes para decimales.',
    example: 'precio REAL'
  },
  {
    label: 'BLOB',
    insertText: 'BLOB',
    kind: 'type',
    detail: 'Binario',
    signature: 'BLOB',
    description: 'Bloque de datos binarios almacenado exactamente como se ingresó (imágenes, audios o firmas).',
    example: 'archivo BLOB'
  },
  {
    label: 'BOOLEAN',
    insertText: 'BOOLEAN',
    kind: 'type',
    detail: 'Lógico',
    signature: 'BOOLEAN (0 o 1)',
    description: 'Tipo de dato booleano (en SQLite se almacena internamente como entero: 0 para false y 1 para true).',
    example: 'activo BOOLEAN DEFAULT 1'
  }
];
