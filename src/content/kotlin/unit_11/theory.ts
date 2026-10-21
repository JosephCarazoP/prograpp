import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_11_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u11-l01": {
    "id": "kt-th-u11-l01",
    "lessonId": "kotlin-u11-l01",
    "pathId": "kotlin",
    "unitId": 11,
    "levelId": 1,
    "title": "1. Qué es una lambda y cómo leerla",
    "subtitle": "Aprende qué es una expresión lambda y cómo pasar código como parámetro usando llaves { } y la variable it.",
    "estimatedMinutes": 8,
    "analogy": "Un cupón con instrucciones que le entregas a un asistente: \"cuando llegues a la tienda, compra lo que esté marcado con el 50% de descuento\". No vas tú mismo a la tienda; le pasas la instrucción empaquetada para que él la ejecute allá.",
    "video": {
      "title": "Lambdas y Operaciones Funcionales sobre Colecciones",
      "channel": "AristiDevs",
      "duration": "48:30",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Uso de filter, map, find, any, all, sortedBy y sumOf en Kotlin."
    },
    "sections": [
      {
        "title": "¿Qué es una expresión lambda?",
        "explanation": "En Kotlin, las funciones son ciudadanos de primera clase: eso significa que puedes tratar a un bloque de código como si fuera un dato más (guardarlo en variables o pasarlo como argumento a otra función).\n\nUna **expresión lambda** es una función anónima (sin nombre) escrita de forma ultracorta entre llaves:\n`{ parametro -> codigoAEjecutar }`\n\nSi la lambda recibe un solo parámetro, Kotlin te ahorra escribirlo y te ofrece la variable mágica implícita **`it`** (que en inglés significa \"eso\" o \"este elemento\").",
        "codeSnippet": "fun main() {\n    val numeros = listOf(1, 2, 3, 4)\n\n    // Usamos forEach con una lambda para imprimir cada elemento\n    print(\"Recorrido funcional: \")\n    numeros.forEach { numero ->\n        print(\"$numero \")\n    }\n    println()\n\n    // Usando el parámetro implícito 'it' (más corto y limpio):\n    print(\"Recorrido con it     : \")\n    numeros.forEach { print(\"$it \") }\n    println()\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Recorrido funcional: 1 2 3 4 \nRecorrido con it     : 1 2 3 4 ",
        "byteTip": "Si el último parámetro de una función es una lambda, Kotlin te permite colocar las llaves { } FUERA de los paréntesis de la función. Es la sintaxis más famosa de Kotlin.",
        "pitfallTip": "Si anidas varias lambdas una dentro de otra, no uses it en todas; nombra los parámetros explícitamente para no confundirte sobre qué representa cada it.",
        "keyPoints": [
          "Una lambda es una función anónima delimitada por llaves { }.",
          "it representa el parámetro único implícito en lambdas cortas.",
          "Es el cimiento de la programación reactiva y de Jetpack Compose en Android."
        ]
      },
      {
        "title": "Lambdas en eventos de interfaz Android",
        "explanation": "En el desarrollo para Android, cada vez que configuras qué ocurre al hacer clic en un botón, estás usando una lambda:\n`boton.setOnClickListener { mostrarMensaje() }`",
        "codeSnippet": "fun ejecutarAccion(nombreTarea: String, accion: () -> Unit) {\n    println(\"Iniciando tarea: $nombreTarea...\")\n    accion() // Ejecutamos la lambda recibida\n    println(\"Tarea finalizada con éxito.\\n\")\n}\n\nfun main() {\n    ejecutarAccion(\"Sincronización\") {\n        println(\" -> Subiendo datos a la nube...\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Iniciando tarea: Sincronización...\n -> Subiendo datos a la nube...\nTarea finalizada con éxito.\n",
        "byteTip": "() -> Unit indica que la función espera una lambda que no recibe argumentos y no retorna nada.",
        "pitfallTip": "No pongas lógica gigante dentro de una lambda anónima si puedes delegarla a una función con nombre.",
        "keyPoints": [
          "Las lambdas permiten programar respuestas a eventos y toques en pantalla.",
          "Hacen que el código asíncrono sea directo y fácil de leer.",
          "Transforman la manipulación de colecciones en código declarativo."
        ]
      }
    ]
  },
  "kotlin-u11-l02": {
    "id": "kt-th-u11-l02",
    "lessonId": "kotlin-u11-l02",
    "pathId": "kotlin",
    "unitId": 11,
    "levelId": 2,
    "title": "2. Filtrar con filter",
    "subtitle": "Filtra elementos de una colección en una sola línea declarativa con .filter().",
    "estimatedMinutes": 8,
    "analogy": "Un colador de cocina: viertes toda la mezcla (la lista original) y el colador solo deja pasar los trozos que cumplen la condición que quieres conservar.",
    "video": {
      "title": "Lambdas y Operaciones Funcionales sobre Colecciones",
      "channel": "AristiDevs",
      "duration": "48:30",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Uso de filter, map, find, any, all, sortedBy y sumOf en Kotlin."
    },
    "sections": [
      {
        "title": "Filtrar colecciones con .filter()",
        "explanation": "En lugar de escribir un bucle `for`, un `if` adentro y una nueva lista mutable con `.add()`, Kotlin te permite filtrar cualquier colección en una sola línea con **`.filter()`**:\n\n• Le pasas una lambda con una condición booleana.\n• `.filter()` revisa cada elemento y conserva solo los que dan **`true`**.\n• Devuelve una **nueva lista** con los elementos seleccionados, dejando la lista original intacta.",
        "codeSnippet": "fun main() {\n    val numeros = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)\n\n    // Filtramos solo los números pares\n    val pares = numeros.filter { it % 2 == 0 }\n    println(\"Números pares: $pares\")\n\n    // Filtramos números mayores a 5\n    val mayoresACinco = numeros.filter { it > 5 }\n    println(\"Mayores a cinco: $mayoresACinco\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Números pares: [2, 4, 6, 8, 10]\nMayores a cinco: [6, 7, 8, 9, 10]",
        "byteTip": "filter no modifica la lista original; crea una nueva lista inmutable y segura.",
        "pitfallTip": "Si ningún elemento cumple la condición, filter devuelve una lista vacía [], jamás devuelve null.",
        "keyPoints": [
          ".filter { condicion } conserva los elementos que evalúan a true.",
          "Elimina la necesidad de escribir bucles for manuales para filtrar.",
          "Es una operación pura sin efectos secundarios."
        ]
      },
      {
        "title": "Filtrar listas de objetos complejos",
        "explanation": "Mira cómo filtrar un catálogo de productos para mostrar únicamente los que están disponibles en stock:",
        "codeSnippet": "data class Articulo(val nombre: String, val precio: Double, val disponible: Boolean)\n\nfun main() {\n    val catalogo = listOf(\n        Articulo(\"Laptop Pro\", 1200.0, disponible = true),\n        Articulo(\"Monitor 4K\", 450.0, disponible = false),\n        Articulo(\"Teclado Mecánico\", 85.0, disponible = true)\n    )\n\n    val disponibles = catalogo.filter { it.disponible }\n    println(\"Artículos listos para despacho:\")\n    disponibles.forEach { println(\" • ${it.nombre} ($$${it.precio})\") }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Artículos listos para despacho:\n • Laptop Pro ($1200.0)\n • Teclado Mecánico ($85.0)",
        "byteTip": "También existe filterNot { condicion } para conservar los elementos que den false.",
        "pitfallTip": "No uses filter si solo estás buscando un único elemento; para eso existe find o firstOrNull.",
        "keyPoints": [
          "filter sobre listas de objetos permite consultar propiedades con it.propiedad.",
          "Se integra fluidamente con la lógica de presentación en Android.",
          "Es el estándar de oro de la programación funcional en Kotlin."
        ]
      }
    ]
  },
  "kotlin-u11-l03": {
    "id": "kt-th-u11-l03",
    "lessonId": "kotlin-u11-l03",
    "pathId": "kotlin",
    "unitId": 11,
    "levelId": 3,
    "title": "3. Transformar con map",
    "subtitle": "Transforma y proyecta los elementos de una colección en un nuevo formato con .map().",
    "estimatedMinutes": 8,
    "analogy": "Una fábrica que procesa naranjas y las convierte en botellas de jugo: entra una lista de naranjas y sale una lista de botellas de jugo del mismo tamaño exacto.",
    "video": {
      "title": "Lambdas y Operaciones Funcionales sobre Colecciones",
      "channel": "AristiDevs",
      "duration": "48:30",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Uso de filter, map, find, any, all, sortedBy y sumOf en Kotlin."
    },
    "sections": [
      {
        "title": "Transformar datos con .map()",
        "explanation": "La operación **`.map()`** toma cada elemento de una lista, le aplica una transformación y devuelve una **nueva lista** con los resultados:\n• Si la lista original tenía 5 elementos, la lista resultante tendrá exactamente 5 elementos transformados.\n• Puede cambiar el valor (multiplicar números) o incluso el tipo de dato (convertir una lista de objetos `Usuario` en una simple lista de `String` con solo sus nombres).",
        "codeSnippet": "fun main() {\n    val numeros = listOf(1, 2, 3, 4)\n    \n    // Multiplicamos cada número por 10\n    val multiplicados = numeros.map { it * 10 }\n    println(\"Originales    : $numeros\")\n    println(\"Multiplicados : $multiplicados\")\n\n    // Convertimos números a textos formateados\n    val textos = numeros.map { \"Número #$it\" }\n    println(\"Textos creados: $textos\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Originales    : [1, 2, 3, 4]\nMultiplicados : [10, 20, 30, 40]\nTextos creados: [Número #1, Número #2, Número #3, Número #4]",
        "byteTip": "Puedes encadenar filter y map juntos: lista.filter { ... }.map { ... } para filtrar y transformar en un solo pipeline.",
        "pitfallTip": "No confundas la función .map() de colecciones con la estructura de datos Map (clave-valor). Hacen cosas distintas.",
        "keyPoints": [
          ".map { transformacion } genera una nueva lista con los resultados transformados.",
          "La lista resultante siempre tiene el mismo tamaño que la original.",
          "Permite extraer columnas específicas de listas de objetos."
        ]
      },
      {
        "title": "Extracción de propiedades en modelos de datos",
        "explanation": "En Android es muy común recibir una lista completa de usuarios y querer extraer únicamente sus correos electrónicos para enviar un aviso masivo:",
        "codeSnippet": "data class Cliente(val id: Int, val nombre: String, val email: String)\n\nfun main() {\n    val clientes = listOf(\n        Cliente(1, \"Valeria\", \"valeria@correo.com\"),\n        Cliente(2, \"Mateo\", \"mateo@correo.com\")\n    )\n\n    // Extraemos solo los correos\n    val correos = clientes.map { it.email }\n    println(\"Lista de correos para campaña: $correos\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Lista de correos para campaña: [valeria@correo.com, mateo@correo.com]",
        "byteTip": "clientes.map { it.email } transforma una List<Cliente> en una List<String> limpia.",
        "pitfallTip": "Si tu transformación puede devolver null, considera usar mapNotNull { } para descartar los nulos automáticamente.",
        "keyPoints": [
          "map proyecta objetos complejos hacia tipos primitivos simples.",
          "Desacopla la lógica de transporte de datos de la interfaz visual.",
          "Es una de las operaciones más utilizadas en programación moderna."
        ]
      }
    ]
  },
  "kotlin-u11-l04": {
    "id": "kt-th-u11-l04",
    "lessonId": "kotlin-u11-l04",
    "pathId": "kotlin",
    "unitId": 11,
    "levelId": 4,
    "title": "4. Buscar con find",
    "subtitle": "Encuentra el primer elemento que cumpla una condición con .find() y firstOrNull().",
    "estimatedMinutes": 8,
    "analogy": "Buscar las llaves de tu casa en tu mochila: metes la mano y en cuanto tus dedos tocan la primera llave, la sacas de inmediato y dejas de buscar en el resto de los bolsillos.",
    "video": {
      "title": "Lambdas y Operaciones Funcionales sobre Colecciones",
      "channel": "AristiDevs",
      "duration": "48:30",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Uso de filter, map, find, any, all, sortedBy y sumOf en Kotlin."
    },
    "sections": [
      {
        "title": "Búsqueda de elementos con .find()",
        "explanation": "Si solo necesitas **un único elemento** que cumpla una regla (por ejemplo, buscar un usuario por su ID único), usar `.filter()` sería ineficiente porque recorrería toda la lista para traerte una lista de un solo elemento.\n\nPara esto existe **`.find()`** (o su sinónimo idéntico **`.firstOrNull()`**):\n• Recorre la lista de izquierda a derecha.\n• En cuanto encuentra el primer elemento que cumple la condición, **se detiene de inmediato** y lo devuelve.\n• Si ningún elemento cumple la condición, devuelve **`null`** pacíficamente sin romperse.",
        "codeSnippet": "data class Usuario(val id: Int, val nombre: String)\n\nfun main() {\n    val usuarios = listOf(\n        Usuario(101, \"Carlos\"),\n        Usuario(102, \"Elena\"),\n        Usuario(103, \"Andrés\")\n    )\n\n    // Buscamos el usuario con ID 102\n    val encontrado = usuarios.find { it.id == 102 }\n    println(\"Usuario encontrado: ${encontrado?.nombre ?: \"No existe\"}\")\n\n    // Buscamos un ID inexistente\n    val noExiste = usuarios.find { it.id == 999 }\n    println(\"Búsqueda fallida: ${noExiste?.nombre ?: \"Usuario no registrado\"}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Usuario encontrado: Elena\nBúsqueda fallida: Usuario no registrado",
        "byteTip": "find devuelve un tipo anulable (T?), por lo que combina de maravilla con el operador Elvis ?: para manejar el caso en que no se encuentre.",
        "pitfallTip": "Si esperas encontrar múltiples coincidencias, usa filter. find solo te entregará la primera que halle.",
        "keyPoints": [
          ".find { condicion } devuelve el primer elemento coincidente.",
          "Devuelve null si ningún elemento coincide.",
          "Se detiene inmediatamente tras encontrar el objetivo, ahorrando tiempo de CPU."
        ]
      },
      {
        "title": "Búsqueda inversa con findLast()",
        "explanation": "Si quieres buscar el **último** elemento que cumplió la condición (de derecha a izquierda), Kotlin te ofrece `.findLast()`:",
        "codeSnippet": "fun main() {\n    val temperaturas = listOf(22, 28, 31, 29, 24)\n    \n    val ultimaAlta = temperaturas.findLast { it > 25 }\n    println(\"Última temperatura calurosa registrada: $ultimaAlta°C\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Última temperatura calurosa registrada: 29°C",
        "byteTip": "findLast recorre en reversa, ideal para buscar el evento o mensaje más reciente en un historial.",
        "pitfallTip": "Asegúrate de que la lista no sea nula antes de llamar a find o usa lista?.find { }.",
        "keyPoints": [
          "findLast() busca de derecha a izquierda.",
          "Ideal para consultar el último estado o transacción reciente.",
          "Ambos métodos son seguros frente a resultados vacíos."
        ]
      }
    ]
  },
  "kotlin-u11-l05": {
    "id": "kt-th-u11-l05",
    "lessonId": "kotlin-u11-l05",
    "pathId": "kotlin",
    "unitId": 11,
    "levelId": 5,
    "title": "5. Comprobar con any y all",
    "subtitle": "Comprueba condiciones globales sobre colecciones con .any(), .all() y .none().",
    "estimatedMinutes": 8,
    "analogy": "Un control de seguridad en un laboratorio: ¿Hay al menos una persona con fiebre? (any). ¿Están todas las personas usando mascarilla? (all). ¿Ninguna persona lleva objetos prohibidos? (none).",
    "video": {
      "title": "Lambdas y Operaciones Funcionales sobre Colecciones",
      "channel": "AristiDevs",
      "duration": "48:30",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Uso de filter, map, find, any, all, sortedBy y sumOf en Kotlin."
    },
    "sections": [
      {
        "title": "Comprobaciones booleanas con any, all y none",
        "explanation": "A veces no necesitas obtener los elementos, sino saber si la colección en su conjunto cumple cierta condición de negocio:\n\n• **`.any { condición }`**: Devuelve `true` si **al menos un elemento** cumple la regla.\n• **`.all { condición }`**: Devuelve `true` si **absolutamente todos los elementos** cumplen la regla.\n• **`.none { condición }`**: Devuelve `true` si **ningún elemento** cumple la regla.\n\nDevuelven un simple y limpio `Boolean` (`true` o `false`).",
        "codeSnippet": "fun main() {\n    val calificaciones = listOf(85, 92, 78, 65, 88)\n\n    // ¿Alguien obtuvo calificación perfecta (100)?\n    val hayPerfectos = calificaciones.any { it == 100 }\n    println(\"¿Hay alguna nota perfecta de 100?: $hayPerfectos\")\n\n    // ¿Todos los alumnos aprobaron (nota >= 70)?\n    val todosAprobados = calificaciones.all { it >= 70 }\n    println(\"¿Aprobaron absolutamente todos?: $todosAprobados\")\n\n    // ¿Nadie reprobó con menos de 50?\n    val ningunoGrave = calificaciones.none { it < 50 }\n    println(\"¿Ninguno sacó nota inferior a 50?: $ningunoGrave\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Hay alguna nota perfecta de 100?: false\n¿Aprobaron absolutamente todos?: false\n¿Ninguno sacó nota inferior a 50?: true",
        "byteTip": "any() sin parámetros comprueba si la lista tiene al menos un elemento: if (carrito.any()) equivale a if (carrito.isNotEmpty()).",
        "pitfallTip": "Ten en cuenta que all { } sobre una lista vacía siempre devuelve true en lógica matemática (verdad vacua).",
        "keyPoints": [
          ".any() verifica si al menos uno cumple la condición.",
          ".all() exige que todos sin excepción la cumplan.",
          ".none() confirma que ninguno la cumpla.",
          "Aplican cortocircuito: se detienen en cuanto se define el resultado."
        ]
      },
      {
        "title": "Validación de carritos de compra",
        "explanation": "Mira cómo verificar que todos los productos de una orden tengan precio válido antes de autorizar el cobro:",
        "codeSnippet": "data class LineaPedido(val producto: String, val precio: Double)\n\nfun main() {\n    val pedido = listOf(\n        LineaPedido(\"Libro\", 25.0),\n        LineaPedido(\"Cuaderno\", 5.0)\n    )\n\n    val preciosValidos = pedido.all { it.precio > 0.0 }\n    println(\"¿Todos los artículos tienen precio positivo válido?: $preciosValidos\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Todos los artículos tienen precio positivo válido?: true",
        "byteTip": "Usar any, all y none hace que las reglas de negocio en tu código se lean con total claridad.",
        "pitfallTip": "No uses filter { ... }.isNotEmpty() cuando un simple any { ... } hace lo mismo sin crear listas temporales en memoria.",
        "keyPoints": [
          "any/all/none son más eficientes en memoria que filtrar.",
          "Hacen que las validaciones de negocio sean intuitivas.",
          "Son herramientas indispensables en la lógica de dominio en Android."
        ]
      }
    ]
  },
  "kotlin-u11-l06": {
    "id": "kt-th-u11-l06",
    "lessonId": "kotlin-u11-l06",
    "pathId": "kotlin",
    "unitId": 11,
    "levelId": 6,
    "title": "6. Ordenar con sortedBy",
    "subtitle": "Ordena colecciones por cualquier criterio con .sorted() y .sortedBy().",
    "estimatedMinutes": 8,
    "analogy": "Ordenar una fila de personas: por orden alfabético de sus apellidos, por orden de estatura de menor a mayor, o por orden de fecha de llegada.",
    "video": {
      "title": "Lambdas y Operaciones Funcionales sobre Colecciones",
      "channel": "AristiDevs",
      "duration": "48:30",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Uso de filter, map, find, any, all, sortedBy y sumOf en Kotlin."
    },
    "sections": [
      {
        "title": "Ordenamiento con sorted y sortedBy",
        "explanation": "Presentar datos ordenados en pantalla mejora drásticamente la experiencia del usuario (ver productos del más barato al más caro, o contactos de la A a la Z).\n\nKotlin incluye funciones de ordenamiento ultra-rápidas:\n• **`.sorted()`**: Para colecciones de tipos básicos (números o texto); los ordena en orden natural ascendente (de menor a mayor, o alfabéticamente).\n• **`.sortedDescending()`**: Ordena en sentido inverso (de mayor a menor).\n• **`.sortedBy { it.propiedad }`**: Para listas de objetos complejos; le indicas por cuál propiedad deseas ordenar.\n• **`.sortedByDescending { it.propiedad }`**: Ordena objetos de mayor a menor según esa propiedad.",
        "codeSnippet": "data class Corredor(val nombre: String, val tiempoSegundos: Int)\n\nfun main() {\n    val numeros = listOf(42, 10, 88, 3, 25)\n    println(\"Números ordenados ascendente: ${numeros.sorted()}\")\n    println(\"Números ordenados descendente: ${numeros.sortedDescending()}\")\n\n    val corredores = listOf(\n        Corredor(\"Ana\", 145),\n        Corredor(\"Carlos\", 130),\n        Corredor(\"Beatriz\", 138)\n    )\n\n    // Ordenamos por menor tiempo (el más rápido primero)\n    val podio = corredores.sortedBy { it.tiempoSegundos }\n    println(\"\\nClasificación oficial de la carrera:\")\n    podio.forEachIndexed { pos, c ->\n        println(\"${pos + 1}° Puesto: ${c.nombre} (${c.tiempoSegundos}s)\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Números ordenados ascendente: [3, 10, 25, 42, 88]\nNúmeros ordenados descendente: [88, 42, 25, 10, 3]\n\nClasificación oficial de la carrera:\n1° Puesto: Carlos (130s)\n2° Puesto: Beatriz (138s)\n3° Puesto: Ana (145s)",
        "byteTip": "sortedBy crea una nueva lista ordenada y deja la original intacta (inmutabilidad).",
        "pitfallTip": "Si trabajas con listas mutables y quieres ordenar la lista en su mismo lugar sin crear una nueva, usa .sortBy { } en lugar de .sortedBy { }.",
        "keyPoints": [
          ".sorted() ordena listas primitivas en orden ascendente.",
          ".sortedBy { it.campo } permite ordenar objetos por cualquier atributo.",
          ".sortedByDescending ordena de mayor a menor."
        ]
      },
      {
        "title": "Ordenamiento alfabético insensible a mayúsculas",
        "explanation": "Al ordenar nombres, conviene normalizar la comparación para que las mayúsculas no alteren el orden del diccionario:",
        "codeSnippet": "fun main() {\n    val nombres = listOf(\"sofía\", \"Andrés\", \"beatriz\", \"Carlos\")\n    \n    val ordenAlfabetico = nombres.sortedBy { it.lowercase() }\n    println(\"Directorio telefónico ordenado: $ordenAlfabetico\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Directorio telefónico ordenado: [Andrés, beatriz, Carlos, sofía]",
        "byteTip": "sortedBy { it.lowercase() } garantiza que \"A\" y \"a\" queden juntas alfabéticamente.",
        "pitfallTip": "Ordenar una lista con millones de elementos repetidas veces en el hilo principal de Android puede congelar la pantalla. En esos casos, hazlo en segundo plano.",
        "keyPoints": [
          "sortedBy con transformación asegura orden alfabético humano.",
          "Las operaciones de ordenamiento en Kotlin están altamente optimizadas con TimSort.",
          "Esenciales para tablas, filtros y listas en la interfaz de usuario."
        ]
      }
    ]
  },
  "kotlin-u11-l07": {
    "id": "kt-th-u11-l07",
    "lessonId": "kotlin-u11-l07",
    "pathId": "kotlin",
    "unitId": 11,
    "levelId": 7,
    "title": "7. Resumir con count y sumOf",
    "subtitle": "Calcula sumas, conteos y estadísticas sobre colecciones con .sumOf() y .count().",
    "estimatedMinutes": 8,
    "analogy": "Un escáner contable en una caja de supermercado: va pasando artículo por artículo y suma de inmediato los precios acumulados para darte el total a pagar al final de la cinta.",
    "video": {
      "title": "Lambdas y Operaciones Funcionales sobre Colecciones",
      "channel": "AristiDevs",
      "duration": "48:30",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Uso de filter, map, find, any, all, sortedBy y sumOf en Kotlin."
    },
    "sections": [
      {
        "title": "Totales y estadísticas con sumOf y count",
        "explanation": "Calcular totales numéricos a partir de colecciones de objetos es una tarea diaria:\n• El total en dinero de un carrito de compras.\n• El recuento de mensajes no leídos.\n• La cantidad de empleados con sueldo superior a cierto monto.\n\nKotlin ofrece funciones de agregación optimizadas que eliminan por completo la necesidad de bucles y acumuladores manuales:\n• **`.count { condición }`**: Cuenta cuántos elementos cumplen la condición.\n• **`.sumOf { it.propiedadNumerica }`**: Suma la propiedad numérica indicada de cada elemento.",
        "codeSnippet": "data class Venta(val producto: String, val unidades: Int, val total: Double)\n\nfun main() {\n    val ventasDelDia = listOf(\n        Venta(\"Café\", 3, 15.0),\n        Venta(\"Sándwich\", 2, 14.0),\n        Venta(\"Jugo Natural\", 1, 4.5)\n    )\n\n    // 1. Contamos cuántas ventas superaron los $10\n    val ventasGrandes = ventasDelDia.count { it.total >= 10.0 }\n    println(\"Ventas mayores a $10: $ventasGrandes\")\n\n    // 2. Sumamos el dinero total recaudado con sumOf\n    val dineroTotal = ventasDelDia.sumOf { it.total }\n    println(\"Recaudación total: $$dineroTotal\")\n\n    // 3. Sumamos unidades físicas vendidas\n    val unidadesTotales = ventasDelDia.sumOf { it.unidades }\n    println(\"Unidades totales vendidas: $unidadesTotales\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Ventas mayores a $10: 3\nRecaudación total: $33.5\nUnidades totales vendidas: 6",
        "byteTip": "sumOf maneja tanto números enteros como Double de forma automática y precisa.",
        "pitfallTip": "No uses filter { ... }.size para contar; .count { ... } es más rápido y no gasta memoria creando listas temporales.",
        "keyPoints": [
          ".count { condicion } cuenta elementos de forma eficiente sin listas intermedias.",
          ".sumOf { it.campo } totaliza valores numéricos en una sola línea.",
          "Reemplaza por completo el patrón manual de bucles y acumuladores."
        ]
      },
      {
        "title": "Métricas promedio combinando operaciones",
        "explanation": "Mira qué sencillo es calcular el ticket promedio de compra combinando `sumOf` y `size`:",
        "codeSnippet": "fun main() {\n    val cobros = listOf(150.0, 80.0, 220.0, 50.0)\n    \n    val totalRecaudado = cobros.sumOf { it }\n    val ticketPromedio = totalRecaudado / cobros.size\n    \n    println(\"Total: $$totalRecaudado | Promedio por cliente: $$ticketPromedio\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Total: $500.0 | Promedio por cliente: $125.0",
        "byteTip": "Kotlin también incluye las funciones .maxOrNull() y .minOrNull() para obtener los valores extremos de una lista.",
        "pitfallTip": "Comprueba que la lista no esté vacía antes de dividir entre .size para prevenir divisiones entre cero.",
        "keyPoints": [
          "Las funciones de agregación se combinan limpiamente para generar estadísticas.",
          "El código resulta conciso, legible y matemáticamente exacto.",
          "Son las herramientas estándar en dashboards y reportes de Android."
        ]
      }
    ]
  }
};
