import { CodeCompletionItem } from '../types/autocomplete';

export const KOTLIN_COMPLETIONS: CodeCompletionItem[] = [
  // ─── FUNCIONES DE SALIDA Y ENTRADA (I/O) ───
  {
    label: 'println',
    insertText: 'println("")',
    cursorOffset: -2,
    kind: 'function',
    detail: 'Unit',
    signature: 'fun println(message: Any?)',
    description: 'Imprime el mensaje de texto en la consola de salida estándar seguido de un salto de línea. Incluye las comillas listas para escribir tu mensaje.',
    example: 'println("¡Hola Mundo!")'
  },
  {
    label: 'println(var)',
    insertText: 'println()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Unit',
    signature: 'fun println(variable: Any?)',
    description: 'Imprime una variable o expresión numérica directamente en la consola sin comillas.',
    example: 'val edad = 20\nprintln(edad)'
  },
  {
    label: 'print',
    insertText: 'print("")',
    cursorOffset: -2,
    kind: 'function',
    detail: 'Unit',
    signature: 'fun print(message: Any?)',
    description: 'Imprime el mensaje en la consola de salida estándar sin agregar un salto de línea al final.',
    example: 'print("Cargando datos... ")'
  },
  {
    label: 'print(var)',
    insertText: 'print()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Unit',
    signature: 'fun print(variable: Any?)',
    description: 'Imprime una variable o expresión numérica en la consola sin salto de línea.',
    example: 'print(contador)'
  },
  {
    label: 'readln',
    insertText: 'readln()',
    kind: 'function',
    detail: 'String',
    signature: 'fun readln(): String',
    description: 'Lee una línea completa de texto ingresada por el usuario en la consola y la retorna como un String no nulo.',
    example: 'print("Introduce tu nombre: ")\nval nombre = readln()'
  },
  {
    label: 'readLine',
    insertText: 'readLine()',
    kind: 'function',
    detail: 'String?',
    signature: 'fun readLine(): String?',
    description: 'Lee una línea de texto de la entrada estándar y retorna un String opcional (puede ser null si se alcanza el fin del flujo).',
    example: 'val linea = readLine() ?: "Sin datos"'
  },

  // ─── DECLARACIÓN DE VARIABLES Y ESTRUCTURAS ───
  {
    label: 'val',
    insertText: 'val ',
    kind: 'keyword',
    detail: 'Inmutable',
    signature: 'val nombre: Tipo = valor',
    description: 'Declara una variable inmutable (de solo lectura). Una vez que se le asigna un valor inicial, este no puede ser reasignado ni modificado.',
    example: 'val PI = 3.14159\nval lenguaje = "Kotlin"'
  },
  {
    label: 'var',
    insertText: 'var ',
    kind: 'keyword',
    detail: 'Mutable',
    signature: 'var nombre: Tipo = valor',
    description: 'Declara una variable mutable cuyo valor puede ser reasignado tantas veces como sea necesario a lo largo del programa.',
    example: 'var contador = 0\ncontador += 1'
  },
  {
    label: 'fun',
    insertText: 'fun () {\n    \n}',
    cursorOffset: -9,
    kind: 'keyword',
    detail: 'Definición',
    signature: 'fun nombre(parametro: Tipo): TipoRetorno { ... }',
    description: 'Declara una función en Kotlin con parámetros y un tipo de retorno opcional.',
    example: 'fun sumar(a: Int, b: Int): Int {\n    return a + b\n}'
  },
  {
    label: 'class',
    insertText: 'class () {\n    \n}',
    cursorOffset: -9,
    kind: 'keyword',
    detail: 'Estructura',
    signature: 'class NombreClase(val propiedad: Tipo) { ... }',
    description: 'Declara una clase que sirve como molde para instanciar objetos con atributos y comportamientos.',
    example: 'class Estudiante(val nombre: String, var promedio: Double)'
  },
  {
    label: 'data class',
    insertText: 'data class ()',
    cursorOffset: -1,
    kind: 'snippet',
    detail: 'Modelo de Datos',
    signature: 'data class Nombre(val campo1: Tipo, val campo2: Tipo)',
    description: 'Clase especializada diseñada exclusivamente para modelar datos. Genera automáticamente los métodos equals(), hashCode(), toString(), componentN() y copy().',
    example: 'data class Producto(val id: Int, val nombre: String, val precio: Double)'
  },
  {
    label: 'object',
    insertText: 'object  {\n    \n}',
    cursorOffset: -8,
    kind: 'keyword',
    detail: 'Singleton',
    signature: 'object NombreSingleton { ... }',
    description: 'Declara una instancia única (patrón Singleton) accesible globalmente en toda la aplicación.',
    example: 'object Configuracion {\n    val version = "1.0.0"\n    val api = "https://api.app.com"\n}'
  },
  {
    label: 'interface',
    insertText: 'interface  {\n    \n}',
    cursorOffset: -8,
    kind: 'keyword',
    detail: 'Contrato',
    signature: 'interface NombreInterfaz { fun metodo() }',
    description: 'Define un contrato que especifica métodos y propiedades abstractas que las clases pueden implementar.',
    example: 'interface Operable {\n    fun calcular(): Double\n}'
  },

  // ─── CONTROL DE FLUJO Y CONDICIONALES ───
  {
    label: 'if',
    insertText: 'if () {\n    \n}',
    cursorOffset: -8,
    kind: 'keyword',
    detail: 'Condicional',
    signature: 'if (condicion) { ... } else { ... }',
    description: 'Estructura condicional que evalúa una expresión lógica booleana y ejecuta el bloque de código correspondiente si resulta verdadera.',
    example: 'if (edad >= 18) {\n    println("Acceso concedido")\n} else {\n    println("Acceso denegado")\n}'
  },
  {
    label: 'else',
    insertText: 'else {\n    \n}',
    cursorOffset: -3,
    kind: 'keyword',
    detail: 'Alternativa',
    signature: 'else { ... }',
    description: 'Rama alternativa que se ejecuta cuando la condición de un if o when previo no se cumplió.',
    example: 'if (calificacion >= 60) "Aprobado" else "Reprobado"'
  },
  {
    label: 'when',
    insertText: 'when () {\n    \n}',
    cursorOffset: -8,
    kind: 'keyword',
    detail: 'Selector',
    signature: 'when (variable) { valor1 -> ... else -> ... }',
    description: 'Estructura de control avanzada multidireccional (sustituto moderno de switch). Evalúa expresiones o rangos con coincidencia de patrones.',
    example: 'when (dia) {\n    1 -> "Lunes"\n    in 2..5 -> "Entre semana"\n    6, 7 -> "Fin de semana"\n    else -> "Desconocido"\n}'
  },
  {
    label: 'for',
    insertText: 'for ( in ) {\n    \n}',
    cursorOffset: -12,
    kind: 'keyword',
    detail: 'Bucle iterativo',
    signature: 'for (item in coleccion) { ... }',
    description: 'Bucle que itera secuencialmente a través de cualquier rango, lista, arreglo o colección iterable.',
    example: 'for (i in 1..5) {\n    println("Paso #$i")\n}'
  },
  {
    label: 'while',
    insertText: 'while () {\n    \n}',
    cursorOffset: -8,
    kind: 'keyword',
    detail: 'Bucle condicional',
    signature: 'while (condicion) { ... }',
    description: 'Ejecuta repetidamente un bloque de código mientras la condición lógica especificada continúe evaluándose como verdadera.',
    example: 'var vidas = 3\nwhile (vidas > 0) {\n    println("Vidas restantes: $vidas")\n    vidas--\n}'
  },
  {
    label: 'repeat',
    insertText: 'repeat() {\n    \n}',
    cursorOffset: -7,
    kind: 'function',
    detail: 'Repetición',
    signature: 'repeat(veces: Int) { accion }',
    description: 'Función utilitaria que ejecuta el bloque de código dado exactamente el número de veces indicado.',
    example: 'repeat(5) {\n    println("¡Kotlin es genial!")\n}'
  },
  {
    label: 'return',
    insertText: 'return ',
    kind: 'keyword',
    detail: 'Retorno',
    signature: 'return valor',
    description: 'Termina inmediatamente la ejecución de la función actual y devuelve el valor especificado a quien la invocó.',
    example: 'return total * 1.13'
  },
  {
    label: 'break',
    insertText: 'break',
    kind: 'keyword',
    detail: 'Interrupción',
    signature: 'break',
    description: 'Interrumpe y sale de inmediato del bucle for, while o do-while que lo contiene.',
    example: 'if (encontrado) break'
  },
  {
    label: 'continue',
    insertText: 'continue',
    kind: 'keyword',
    detail: 'Salto',
    signature: 'continue',
    description: 'Omite el resto del cuerpo del bucle para la iteración actual y avanza directamente a la siguiente.',
    example: 'if (numero % 2 != 0) continue'
  },

  // ─── COLECCIONES Y CONSTRUCTORES ───
  {
    label: 'listOf',
    insertText: 'listOf()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'List<T>',
    signature: 'fun <T> listOf(vararg elements: T): List<T>',
    description: 'Crea una nueva lista inmutable (solo lectura) con los elementos proporcionados.',
    example: 'val frutas = listOf("Manzana", "Banana", "Naranja")'
  },
  {
    label: 'mutableListOf',
    insertText: 'mutableListOf()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'MutableList<T>',
    signature: 'fun <T> mutableListOf(vararg elements: T): MutableList<T>',
    description: 'Crea una lista dinámica modificable a la que se le pueden añadir, insertar, actualizar o eliminar elementos.',
    example: 'val compras = mutableListOf("Pan")\ncompras.add("Leche")'
  },
  {
    label: 'mapOf',
    insertText: 'mapOf()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Map<K, V>',
    signature: 'fun <K, V> mapOf(vararg pairs: Pair<K, V>): Map<K, V>',
    description: 'Crea un diccionario inmutable de pares clave-valor (K to V).',
    example: 'val capitales = mapOf("Costa Rica" to "San José", "España" to "Madrid")'
  },
  {
    label: 'mutableMapOf',
    insertText: 'mutableMapOf()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'MutableMap<K, V>',
    signature: 'fun <K, V> mutableMapOf(vararg pairs: Pair<K, V>): MutableMap<K, V>',
    description: 'Crea un diccionario o mapa modificable donde se pueden insertar y actualizar parejas de clave-valor.',
    example: 'val puntuaciones = mutableMapOf("Jugador1" to 100)\npuntuaciones["Jugador2"] = 150'
  },
  {
    label: 'setOf',
    insertText: 'setOf()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Set<T>',
    signature: 'fun <T> setOf(vararg elements: T): Set<T>',
    description: 'Crea un conjunto inmutable de elementos únicos donde no se permiten elementos repetidos o duplicados.',
    example: 'val numeros = setOf(1, 2, 2, 3, 3) // Contiene: [1, 2, 3]'
  },
  {
    label: 'mutableSetOf',
    insertText: 'mutableSetOf()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'MutableSet<T>',
    signature: 'fun <T> mutableSetOf(vararg elements: T): MutableSet<T>',
    description: 'Crea un conjunto modificable de elementos únicos.',
    example: 'val tags = mutableSetOf("kotlin", "programacion")\ntags.add("android")'
  },
  {
    label: 'arrayOf',
    insertText: 'arrayOf()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Array<T>',
    signature: 'fun <T> arrayOf(vararg elements: T): Array<T>',
    description: 'Crea un arreglo nativo (Array) de tamaño fijo con los elementos pasados por argumento.',
    example: 'val arreglo = arrayOf(10, 20, 30, 40)'
  },

  // ─── OPERACIONES DE COLECCIÓN (LAMBDAS) ───
  {
    label: 'filter',
    insertText: 'filter {  }',
    cursorOffset: -2,
    kind: 'function',
    detail: 'Transformación',
    signature: 'inline fun <T> Iterable<T>.filter(predicate: (T) -> Boolean): List<T>',
    description: 'Filtra la colección reteniendo únicamente aquellos elementos que satisfagan la condición booleana.',
    example: 'val pares = numeros.filter { it % 2 == 0 }'
  },
  {
    label: 'map',
    insertText: 'map {  }',
    cursorOffset: -2,
    kind: 'function',
    detail: 'Transformación',
    signature: 'inline fun <T, R> Iterable<T>.map(transform: (T) -> R): List<R>',
    description: 'Aplica una transformación a cada elemento de la colección devolviendo una nueva lista con los resultados generados.',
    example: 'val dobles = numeros.map { it * 2 }'
  },
  {
    label: 'forEach',
    insertText: 'forEach {  }',
    cursorOffset: -2,
    kind: 'function',
    detail: 'Iteración',
    signature: 'inline fun <T> Iterable<T>.forEach(action: (T) -> Unit)',
    description: 'Ejecuta una acción o bloque de código para cada uno de los elementos de la colección.',
    example: 'frutas.forEach { println("Me gusta la $it") }'
  },
  {
    label: 'sortedBy',
    insertText: 'sortedBy {  }',
    cursorOffset: -2,
    kind: 'function',
    detail: 'Ordenamiento',
    signature: 'inline fun <T, R : Comparable<R>> Iterable<T>.sortedBy(crossinline selector: (T) -> R?): List<T>',
    description: 'Devuelve una nueva lista ordenada de forma ascendente según el criterio o atributo evaluado.',
    example: 'val ordenados = personas.sortedBy { it.edad }'
  },
  {
    label: 'sumOf',
    insertText: 'sumOf {  }',
    cursorOffset: -2,
    kind: 'function',
    detail: 'Agregación',
    signature: 'inline fun <T> Iterable<T>.sumOf(selector: (T) -> Int): Int',
    description: 'Calcula la suma acumulada de los valores numéricos producidos por el selector para cada elemento.',
    example: 'val total = items.sumOf { it.precio }'
  },
  {
    label: 'count',
    insertText: 'count()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Int',
    signature: 'fun <T> Iterable<T>.count(): Int',
    description: 'Retorna el total de elementos en la colección, o la cantidad de elementos que cumplen un predicado.',
    example: 'val aprobados = notas.count { it >= 70 }'
  },
  {
    label: 'contains',
    insertText: 'contains()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'Boolean',
    signature: 'operator fun <T> Iterable<T>.contains(element: T): Boolean',
    description: 'Comprueba si la colección o cadena de texto contiene el elemento o substring especificado.',
    example: 'if (lista.contains("admin")) { println("Acceso total") }'
  },
  {
    label: 'firstOrNull',
    insertText: 'firstOrNull()',
    kind: 'function',
    detail: 'T?',
    signature: 'fun <T> Iterable<T>.firstOrNull(): T?',
    description: 'Retorna el primer elemento de la colección o null de manera segura si la colección está vacía.',
    example: 'val usuario = lista.firstOrNull { it.id == 5 }'
  },
  {
    label: 'maxOrNull',
    insertText: 'maxOrNull()',
    kind: 'function',
    detail: 'T?',
    signature: 'fun <T : Comparable<T>> Iterable<T>.maxOrNull(): T?',
    description: 'Retorna el elemento con el valor más alto o null si la colección está vacía.',
    example: 'val mayor = puntuaciones.maxOrNull()'
  },
  {
    label: 'minOrNull',
    insertText: 'minOrNull()',
    kind: 'function',
    detail: 'T?',
    signature: 'fun <T : Comparable<T>> Iterable<T>.minOrNull(): T?',
    description: 'Retorna el elemento con el valor más bajo o null si la colección está vacía.',
    example: 'val menor = puntuaciones.minOrNull()'
  },
  {
    label: 'joinToString',
    insertText: 'joinToString()',
    kind: 'function',
    detail: 'String',
    signature: 'fun <T> Iterable<T>.joinToString(separator: CharSequence = ", "): String',
    description: 'Concatena todos los elementos de una colección en un único String separados por el delimitador elegido.',
    example: 'val texto = lista.joinToString(separator = " - ")'
  },

  // ─── CONVERSIONES Y STRINGS ───
  {
    label: 'toInt',
    insertText: 'toInt()',
    kind: 'function',
    detail: 'Int',
    signature: 'fun String.toInt(): Int',
    description: 'Parsea y convierte una cadena de texto a un número entero de 32 bits (Int). Lanza NumberFormatException si el texto no es numérico.',
    example: 'val edad = "25".toInt()'
  },
  {
    label: 'toIntOrNull',
    insertText: 'toIntOrNull()',
    kind: 'function',
    detail: 'Int?',
    signature: 'fun String.toIntOrNull(): Int?',
    description: 'Convierte de forma segura una cadena a Int, devolviendo null si el texto contiene caracteres no válidos.',
    example: 'val numero = "abc".toIntOrNull() // null'
  },
  {
    label: 'toDouble',
    insertText: 'toDouble()',
    kind: 'function',
    detail: 'Double',
    signature: 'fun String.toDouble(): Double',
    description: 'Parsea y convierte una cadena de texto a un número decimal de punto flotante de doble precisión (Double).',
    example: 'val precio = "19.99".toDouble()'
  },
  {
    label: 'toDoubleOrNull',
    insertText: 'toDoubleOrNull()',
    kind: 'function',
    detail: 'Double?',
    signature: 'fun String.toDoubleOrNull(): Double?',
    description: 'Convierte de forma segura una cadena a Double, devolviendo null si no es un número válido.',
    example: 'val valor = entrada.toDoubleOrNull() ?: 0.0'
  },
  {
    label: 'toString',
    insertText: 'toString()',
    kind: 'function',
    detail: 'String',
    signature: 'open fun toString(): String',
    description: 'Retorna la representación en cadena de texto del objeto actual.',
    example: 'val texto = 100.toString()'
  },
  {
    label: 'uppercase',
    insertText: 'uppercase()',
    kind: 'function',
    detail: 'String',
    signature: 'fun String.uppercase(): String',
    description: 'Convierte todos los caracteres de la cadena a mayúsculas.',
    example: 'val mayus = "hola".uppercase() // "HOLA"'
  },
  {
    label: 'lowercase',
    insertText: 'lowercase()',
    kind: 'function',
    detail: 'String',
    signature: 'fun String.lowercase(): String',
    description: 'Convierte todos los caracteres de la cadena a minúsculas.',
    example: 'val minus = "KOTLIN".lowercase() // "kotlin"'
  },
  {
    label: 'split',
    insertText: 'split()',
    cursorOffset: -1,
    kind: 'function',
    detail: 'List<String>',
    signature: 'fun CharSequence.split(vararg delimiters: String): List<String>',
    description: 'Divide una cadena de caracteres en una lista de subcadenas según el delimitador especificado.',
    example: 'val partes = "rojo,verde,azul".split(",")'
  },
  {
    label: 'trim',
    insertText: 'trim()',
    kind: 'function',
    detail: 'String',
    signature: 'fun CharSequence.trim(): String',
    description: 'Elimina los espacios en blanco sobrantes al inicio y al final de una cadena de texto.',
    example: 'val limpia = "  hola  ".trim() // "hola"'
  },

  // ─── TIPOS BÁSICOS ───
  {
    label: 'Int',
    insertText: 'Int',
    kind: 'type',
    detail: 'Tipo numérico',
    signature: 'class Int : Number, Comparable<Int>',
    description: 'Tipo de dato entero con signo de 32 bits (rango: -2,147,483,648 a 2,147,483,647).',
    example: 'val edad: Int = 20'
  },
  {
    label: 'String',
    insertText: 'String',
    kind: 'type',
    detail: 'Tipo texto',
    signature: 'class String : Comparable<String>, CharSequence',
    description: 'Secuencia inmutable de caracteres de texto delimitada por comillas dobles.',
    example: 'val saludo: String = "Hola"'
  },
  {
    label: 'Boolean',
    insertText: 'Boolean',
    kind: 'type',
    detail: 'Tipo lógico',
    signature: 'class Boolean : Comparable<Boolean>',
    description: 'Tipo de dato lógico booleano con dos únicos valores posibles: true o false.',
    example: 'val esActivo: Boolean = true'
  },
  {
    label: 'Double',
    insertText: 'Double',
    kind: 'type',
    detail: 'Tipo decimal',
    signature: 'class Double : Number, Comparable<Double>',
    description: 'Número decimal de coma flotante de precisión doble según IEEE 754 (64 bits).',
    example: 'val pi: Double = 3.14159'
  },
  {
    label: 'Float',
    insertText: 'Float',
    kind: 'type',
    detail: 'Tipo decimal',
    signature: 'class Float : Number, Comparable<Float>',
    description: 'Número de coma flotante de precisión simple de 32 bits (sufijo f o F).',
    example: 'val temperatura: Float = 36.5f'
  },
  {
    label: 'Long',
    insertText: 'Long',
    kind: 'type',
    detail: 'Tipo numérico',
    signature: 'class Long : Number, Comparable<Long>',
    description: 'Número entero grande con signo de 64 bits (sufijo L).',
    example: 'val distancia: Long = 150000000000L'
  },
  {
    label: 'Unit',
    insertText: 'Unit',
    kind: 'type',
    detail: 'Tipo retorno',
    signature: 'object Unit',
    description: 'Tipo de retorno para funciones que no devuelven ningún valor significativo (equivalente a void en Java).',
    example: 'fun saludar(): Unit { println("Hola") }'
  },
  {
    label: 'Any',
    insertText: 'Any',
    kind: 'type',
    detail: 'Raíz',
    signature: 'open class Any',
    description: 'La raíz de la jerarquía de clases de Kotlin. Toda clase en Kotlin hereda de Any.',
    example: 'val objeto: Any = "Cualquier tipo"'
  },

  // ─── PLANTILLAS / SNIPPETS RÁPIDOS ───
  {
    label: 'main',
    insertText: 'fun main() {\n    \n}',
    cursorOffset: -3,
    kind: 'snippet',
    detail: 'Función Principal',
    signature: 'fun main()',
    description: 'Punto de entrada estándar y obligatorio para ejecutar un programa en Kotlin.',
    example: 'fun main() {\n    println("¡Bienvenido al Lab de Kotlin!")\n}'
  }
];
