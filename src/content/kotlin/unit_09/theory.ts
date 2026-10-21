import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_09_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u09-l01": {
    "id": "kt-th-u09-l01",
    "lessonId": "kotlin-u09-l01",
    "pathId": "kotlin",
    "unitId": 9,
    "levelId": 1,
    "title": "1. Listas y acceso por índice",
    "subtitle": "Almacena múltiples elementos ordenados en una lista y accede a ellos por su número de índice.",
    "estimatedMinutes": 8,
    "analogy": "Un estuche de lápices de colores con ranuras numeradas: en la ranura 0 está el rojo, en la ranura 1 el azul y en la ranura 2 el verde.",
    "video": {
      "title": "Colecciones en Kotlin: List, Set y Map",
      "channel": "AristiDevs",
      "duration": "52:10",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Listas mutables e inmutables, conjuntos únicos con Set y diccionarios clave-valor con Map."
    },
    "sections": [
      {
        "title": "Introducción a las listas con listOf()",
        "explanation": "Hasta ahora guardábamos un solo valor por variable (un nombre, una edad). Pero en cualquier aplicación real necesitas manejar grupos de elementos: la lista de contactos en WhatsApp, las canciones de una playlist o los productos en un carrito.\n\nLa colección más utilizada en Kotlin es la **Lista (`List`)**:\n• Es una secuencia **ordenada** de elementos.\n• Cada elemento ocupa una posición numérica llamada **índice**, empezando siempre en cero (`0`).\n• Puede contener elementos repetidos.\n\nPara crear una lista de solo lectura (inmutable), usamos la función **`listOf()`**:",
        "codeSnippet": "fun main() {\n    // Creamos una lista inmutable de nombres\n    val amigos = listOf(\"Sofía\", \"Mateo\", \"Valentina\")\n\n    println(\"Lista completa: $amigos\")\n    println(\"Cantidad de elementos (.size): ${amigos.size}\")\n    println(\"Primer amigo (índice 0): ${amigos[0]}\")\n    println(\"Segundo amigo (índice 1): ${amigos[1]}\")\n    println(\"Último amigo con .last(): ${amigos.last()}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Lista completa: [Sofía, Mateo, Valentina]\nCantidad de elementos (.size): 3\nPrimer amigo (índice 0): Sofía\nSegundo amigo (índice 1): Mateo\nÚltimo amigo con .last(): Valentina",
        "byteTip": "El tamaño de una lista se consulta con la propiedad .size (a diferencia de los Strings que usan .length).",
        "pitfallTip": "Si intentas acceder a un índice que no existe (como amigos[5]), Kotlin lanzará un IndexOutOfBoundsException.",
        "keyPoints": [
          "listOf() crea una lista ordenada e inmutable de elementos.",
          "El acceso por corchetes [índice] empieza en 0.",
          ".size devuelve la cantidad de elementos contenidos."
        ]
      },
      {
        "title": "Seguridad con getOrNull()",
        "explanation": "Para evitar caídas de la app al consultar un índice que tal vez no exista en la lista, Kotlin te ofrece el método seguro **`.getOrNull(índice)`**:",
        "codeSnippet": "fun main() {\n    val podio = listOf(\"Oro\", \"Plata\", \"Bronce\")\n\n    // Índice seguro que existe\n    println(\"Primer puesto: ${podio.getOrNull(0)}\")\n\n    // Índice fuera de rango: devuelve null en lugar de caerse\n    val cuartoPuesto = podio.getOrNull(3) ?: \"Sin medalla de cuarto lugar\"\n    println(\"Cuarto puesto: $cuartoPuesto\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Primer puesto: Oro\nCuarto puesto: Sin medalla de cuarto lugar",
        "byteTip": "Combinar .getOrNull(índice) con el operador Elvis ?: es la forma más segura de consultar listas en Android.",
        "pitfallTip": "No uses [índice] directo si el número viene de una entrada externa no validada.",
        "keyPoints": [
          ".getOrNull() previene excepciones por índice fuera de límites.",
          "Devuelve null pacíficamente si la posición no existe.",
          "Garantiza la estabilidad en listas de tamaño variable."
        ]
      }
    ]
  },
  "kotlin-u09-l02": {
    "id": "kt-th-u09-l02",
    "lessonId": "kotlin-u09-l02",
    "pathId": "kotlin",
    "unitId": 9,
    "levelId": 2,
    "title": "2. List y MutableList",
    "subtitle": "Comprende la diferencia clave entre una List inmutable de solo lectura y una MutableList modificable.",
    "estimatedMinutes": 8,
    "analogy": "List es un libro impreso de una biblioteca: puedes leer todas sus páginas las veces que quieras, pero no puedes arrancar hojas ni escribir renglones nuevos. MutableList es una libreta de notas de espiral: puedes agregar hojas, tachar notas y cambiar páginas.",
    "video": {
      "title": "Colecciones en Kotlin: List, Set y Map",
      "channel": "AristiDevs",
      "duration": "52:10",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Listas mutables e inmutables, conjuntos únicos con Set y diccionarios clave-valor con Map."
    },
    "sections": [
      {
        "title": "List vs MutableList",
        "explanation": "Al igual que con `val` y `var`, Kotlin divide sus colecciones en dos categorías estrictas por diseño:\n\n1. **`List` (de solo lectura / inmutable):** Creada con `listOf()`. Una vez creada, **no puedes agregarle, quitarle ni modificarle elementos**. Solo permite lectura.\n2. **`MutableList` (modificable):** Creada con **`mutableListOf()`**. Te permite agregar nuevos elementos con `.add()`, eliminarlos con `.remove()` y reordenarlos.\n\n¿Por qué existe esta separación?\nPara proteger tus datos: en una app Android, la interfaz visual debería solo leer listas para mostrarlas en pantalla, evitando que se alteren accidentalmente mientras se dibujan.",
        "codeSnippet": "fun main() {\n    // 1. Lista de solo lectura\n    val diasLaborales = listOf(\"Lunes\", \"Martes\", \"Miércoles\")\n    // diasLaborales.add(\"Jueves\") -> ¡ERROR de compilación! No existe .add() en List\n\n    // 2. Lista mutable modificable\n    val carritoCompras = mutableListOf(\"Leche\", \"Huevos\")\n    println(\"Carrito inicial: $carritoCompras\")\n\n    carritoCompras.add(\"Pan integral\") // Agregamos un elemento\n    println(\"Carrito actualizado: $carritoCompras\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Carrito inicial: [Leche, Huevos]\nCarrito actualizado: [Leche, Huevos, Pan integral]",
        "byteTip": "Puedes declarar una variable val con una lista mutableListOf(): val lista = mutableListOf(). La referencia de la caja es fija, pero el contenido interno sí puede cambiar.",
        "pitfallTip": "No uses MutableList por defecto para todo. Si la lista no va a cambiar tras su carga inicial, usa listOf().",
        "keyPoints": [
          "List es de solo lectura; MutableList permite agregar y quitar elementos.",
          "listOf() crea listas inmutables seguras.",
          "mutableListOf() crea listas dinámicas para carritos, feeds y listas interactivas."
        ]
      },
      {
        "title": "Conversión entre listas mutables e inmutables",
        "explanation": "Puedes convertir fácilmente una lista de un tipo a otro según la etapa de tu aplicación:",
        "codeSnippet": "fun main() {\n    val editable = mutableListOf(1, 2, 3)\n    editable.add(4)\n\n    // La convertimos a una lista de solo lectura segura para compartir\n    val protegida = editable.toList()\n    println(\"Lista protegida final: $protegida\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Lista protegida final: [1, 2, 3, 4]",
        "byteTip": ".toList() crea una copia independiente de solo lectura. Modificar editable después no afectará a protegida.",
        "pitfallTip": "Cuidado con compartir MutableList entre diferentes pantallas; una pantalla podría borrar datos que otra pantalla todavía necesita.",
        "keyPoints": [
          ".toList() convierte una lista mutable en una copia de solo lectura.",
          ".toMutableList() convierte una lista fija en una editable.",
          "Proteger las colecciones evita efectos secundarios entre pantallas."
        ]
      }
    ]
  },
  "kotlin-u09-l03": {
    "id": "kt-th-u09-l03",
    "lessonId": "kotlin-u09-l03",
    "pathId": "kotlin",
    "unitId": 9,
    "levelId": 3,
    "title": "3. Agregar, modificar y eliminar elementos",
    "subtitle": "Aprende a agregar, modificar y eliminar elementos de una MutableList con total control.",
    "estimatedMinutes": 8,
    "analogy": "Gestionar una lista de compras en tu teléfono: agregas manzanas al final, cambias el tipo de leche por leche deslactosada y tachas los productos que ya metiste al carrito.",
    "video": {
      "title": "Colecciones en Kotlin: List, Set y Map",
      "channel": "AristiDevs",
      "duration": "52:10",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Listas mutables e inmutables, conjuntos únicos con Set y diccionarios clave-valor con Map."
    },
    "sections": [
      {
        "title": "Operaciones sobre MutableList",
        "explanation": "Una vez creada una lista con `mutableListOf()`, tienes a tu disposición un conjunto de métodos para modificar su contenido:\n\n• **`.add(elemento)`**: Agrega el nuevo elemento al final de la lista.\n• **`.add(índice, elemento)`**: Inserta el elemento en una posición específica, empujando a los demás hacia la derecha.\n• **`.remove(elemento)`**: Busca el elemento por su valor y lo elimina.\n• **`.removeAt(índice)`**: Elimina el elemento ubicado en esa posición numérica exacta.\n• **`[índice] = nuevoValor`**: Sobreescribe el valor existente en esa posición.",
        "codeSnippet": "fun main() {\n    val tareas = mutableListOf(\"Revisar correo\", \"Llamar al cliente\")\n    println(\"Tareas iniciales: $tareas\")\n\n    // 1. Agregar al final\n    tareas.add(\"Subir informe a la nube\")\n    \n    // 2. Modificar una tarea existente\n    tareas[0] = \"Revisar correos urgentes\"\n\n    // 3. Eliminar por valor\n    tareas.remove(\"Llamar al cliente\")\n\n    println(\"Tareas pendientes finales: $tareas\")\n    println(\"Total de tareas por hacer: ${tareas.size}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Tareas iniciales: [Revisar correo, Llamar al cliente]\nTareas pendientes finales: [Revisar correos urgentes, Subir informe a la nube]\nTotal de tareas por hacer: 2",
        "byteTip": "tareas.clear() borra todos los elementos de la lista de un solo golpe, dejándola vacía (size = 0).",
        "pitfallTip": "removeAt(índice) lanzará un error si el índice no existe. Comprueba siempre que el índice esté dentro del rango 0 until size.",
        "keyPoints": [
          ".add() agrega elementos al final o en posiciones intermedias.",
          ".remove() y .removeAt() eliminan por valor o por índice.",
          "lista[i] = valor reemplaza el elemento en la posición i."
        ]
      },
      {
        "title": "Manejo de elementos duplicados",
        "explanation": "Las listas permiten elementos repetidos con total libertad. Si llamas a `.remove(\"repetido\")`, Kotlin solo eliminará la **primera aparición** que encuentre:",
        "codeSnippet": "fun main() {\n    val votos = mutableListOf(\"Sí\", \"No\", \"Sí\", \"Sí\")\n    println(\"Votos registrados: $votos\")\n\n    votos.remove(\"Sí\") // Elimina solo el primer \"Sí\"\n    println(\"Tras eliminar una opción 'Sí': $votos\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Votos registrados: [Sí, No, Sí, Sí]\nTras eliminar una opción 'Sí': [No, Sí, Sí]",
        "byteTip": "Si necesitas que sea imposible tener elementos duplicados por diseño, la colección adecuada no es una List, sino un Set.",
        "pitfallTip": "No uses remove() dentro de un for tradicional mientras iteras la lista; puede alterar los índices sobre la marcha.",
        "keyPoints": [
          "Las listas permiten y preservan elementos duplicados.",
          "remove() elimina la primera ocurrencia de izquierda a derecha.",
          "Para conjuntos sin duplicados, Kotlin ofrece la estructura Set."
        ]
      }
    ]
  },
  "kotlin-u09-l04": {
    "id": "kt-th-u09-l04",
    "lessonId": "kotlin-u09-l04",
    "pathId": "kotlin",
    "unitId": 9,
    "levelId": 4,
    "title": "4. Recorrer colecciones y comprobar pertenencia",
    "subtitle": "Recorre colecciones completas elemento por elemento con bucles for y verifica pertenencia con in.",
    "estimatedMinutes": 8,
    "analogy": "Un inspector de calidad que revisa cada caja que pasa por una cinta transportadora: toma una caja, la examina, la devuelve a la cinta y pasa a la siguiente hasta que la cinta termina.",
    "video": {
      "title": "Colecciones en Kotlin: List, Set y Map",
      "channel": "AristiDevs",
      "duration": "52:10",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Listas mutables e inmutables, conjuntos únicos con Set y diccionarios clave-valor con Map."
    },
    "sections": [
      {
        "title": "Recorrer colecciones y comprobar pertenencia con in",
        "explanation": "Recorrer una lista completa para procesar cada uno de sus elementos es una de las tareas más comunes en programación.\n\nLa forma más elegante y directa en Kotlin es el bucle **`for-in`**:\n`for (elemento in lista) {`\n`    println(elemento)`\n`}`\n\nAdemás, puedes usar el operador **`in`** dentro de una condición para saber si un elemento está dentro de la lista en una sola línea, sin tener que hacer ningún bucle manual:\n`if (\"Admin\" in listaRoles) ...`",
        "codeSnippet": "fun main() {\n    val lenguajes = listOf(\"Kotlin\", \"Java\", \"Python\", \"Swift\")\n\n    // 1. Recorrer la lista con for\n    println(\"Lenguajes admitidos en el curso:\")\n    for (lenguaje in lenguajes) {\n        println(\" • $lenguaje\")\n    }\n\n    // 2. Comprobar pertenencia instantánea con in\n    val lenguajeBuscado = \"Kotlin\"\n    if (lenguajeBuscado in lenguajes) {\n        println(\"\\n¡Excelente! $lenguajeBuscado está disponible en el catálogo.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Lenguajes admitidos en el curso:\n • Kotlin\n • Java\n • Python\n • Swift\n\n¡Excelente! Kotlin está disponible en el catálogo.",
        "byteTip": "También puedes usar !in para comprobar ausencia: if (codigo !in codigosValidos) { error() }.",
        "pitfallTip": "La búsqueda con in en listas grandes revisa elemento por elemento. Si tienes 100,000 elementos, un Set es miles de veces más rápido.",
        "keyPoints": [
          "for (item in lista) recorre todos los elementos en orden secuencial.",
          "in comprueba si un elemento existe dentro de la colección.",
          "Elimina la necesidad de manejar índices numéricos manuales."
        ]
      },
      {
        "title": "Recorrer con índice usando withIndex()",
        "explanation": "Si necesitas conocer tanto el elemento como su número de posición en la lista (por ejemplo, para numerar una lista del 1 al 3), usa `.withIndex()`:",
        "codeSnippet": "fun main() {\n    val canciones = listOf(\"Bohemian Rhapsody\", \"Hotel California\", \"Imagine\")\n\n    println(\"=== TOP CANCIONES ===\")\n    for ((indice, cancion) in canciones.withIndex()) {\n        println(\"${indice + 1}. $cancion\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "=== TOP CANCIONES ===\n1. Bohemian Rhapsody\n2. Hotel California\n3. Imagine",
        "byteTip": "(indice, cancion) desestructura la tupla entregada por withIndex() de forma automática.",
        "pitfallTip": "Recuerda que indice empieza en 0, por eso sumamos + 1 al mostrarlo a personas normales.",
        "keyPoints": [
          ".withIndex() entrega el índice y el valor en cada ciclo.",
          "Permite numerar interfaces visuales con facilidad.",
          "Evita tener que crear contadores manuales externos."
        ]
      }
    ]
  },
  "kotlin-u09-l05": {
    "id": "kt-th-u09-l05",
    "lessonId": "kotlin-u09-l05",
    "pathId": "kotlin",
    "unitId": 9,
    "levelId": 5,
    "title": "5. Set: elementos sin duplicados",
    "subtitle": "Garantiza elementos únicos sin duplicados utilizando la colección Set.",
    "estimatedMinutes": 8,
    "analogy": "Una bolsa de canicas de colores únicos: puedes meter una canica roja. Si intentas meter otra canica roja idéntica, la bolsa la rechaza y se queda solo con una.",
    "video": {
      "title": "Colecciones en Kotlin: List, Set y Map",
      "channel": "AristiDevs",
      "duration": "52:10",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Listas mutables e inmutables, conjuntos únicos con Set y diccionarios clave-valor con Map."
    },
    "sections": [
      {
        "title": "La colección Set: valores únicos garantizados",
        "explanation": "A veces necesitas almacenar una colección donde **no puede haber duplicados bajo ninguna circunstancia**:\n• La lista de números de identificación (cédula o DNI) de los clientes.\n• Los hashtags de una publicación.\n• Los correos registrados en un boletín.\n\nPara esto existe la colección **`Set`** (Conjunto):\n• **No admite duplicados:** Si intentas agregar un valor que ya existe, el Set lo ignora en silencio sin causar error.\n• Creada con **`setOf()`** para solo lectura o **`mutableSetOf()`** para modificable.\n• Las búsquedas con `in` en un Set son prácticamente **instantáneas**, sin importar si tiene 10 o 1,000,000 de elementos.",
        "codeSnippet": "fun main() {\n    // Creamos un Set con elementos repetidos a propósito\n    val colores = setOf(\"Rojo\", \"Azul\", \"Verde\", \"Rojo\", \"Azul\")\n\n    println(\"Contenido del Set (los duplicados se eliminaron automáticamente):\")\n    println(colores)\n    println(\"Cantidad de colores únicos: ${colores.size}\")\n\n    // Búsqueda ultra-rápida\n    println(\"¿Contiene 'Verde'?: ${\"Verde\" in colores}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Contenido del Set (los duplicados se eliminaron automáticamente):\n[Rojo, Azul, Verde]\nCantidad de colores únicos: 3\n¿Contiene 'Verde'?: true",
        "byteTip": "Puedes eliminar duplicados de cualquier lista existente simplemente llamando a .toSet() o .distinct().",
        "pitfallTip": "Los elementos en un Set general no garantizan acceso por índice numérico tradicional [0] porque representan un conjunto matemático, no una fila.",
        "keyPoints": [
          "Set garantiza que cada elemento aparezca exactamente una sola vez.",
          "Ignora inserciones duplicadas de forma automática.",
          "Las operaciones de pertenencia (in) son de alta eficiencia computacional."
        ]
      },
      {
        "title": "Eliminación instantánea de duplicados",
        "explanation": "Mira cómo limpiar una lista de correos con duplicados en una sola instrucción:",
        "codeSnippet": "fun main() {\n    val correosConDuplicados = listOf(\"ana@mail.com\", \"pedro@mail.com\", \"ana@mail.com\")\n    \n    val correosUnicos = correosConDuplicados.toSet()\n    println(\"Total recibidos: ${correosConDuplicados.size}\")\n    println(\"Total únicos reales: ${correosUnicos.size}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Total recibidos: 3\nTotal únicos reales: 2",
        "byteTip": "toSet() es la herramienta número uno para deduplicar datos importados.",
        "pitfallTip": "Si el orden de inserción es estrictamente vital, mutableSetOf() en Kotlin conserva el orden de inserción gracias a LinkedHashSet.",
        "keyPoints": [
          "toSet() convierte cualquier lista a conjunto único.",
          "Ideal para depuración de datos masivos.",
          "Ahorra espacio en memoria al descartar redundancias."
        ]
      }
    ]
  },
  "kotlin-u09-l06": {
    "id": "kt-th-u09-l06",
    "lessonId": "kotlin-u09-l06",
    "pathId": "kotlin",
    "unitId": 9,
    "levelId": 6,
    "title": "6. Map: pares clave-valor",
    "subtitle": "Asocia datos en parejas de clave y valor con la poderosa colección Map.",
    "estimatedMinutes": 8,
    "analogy": "Un diccionario de idiomas o la libreta de contactos de tu teléfono: buscas por el nombre de la persona (clave única) y obtienes de inmediato su número de teléfono (valor asociado).",
    "video": {
      "title": "Colecciones en Kotlin: List, Set y Map",
      "channel": "AristiDevs",
      "duration": "52:10",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Listas mutables e inmutables, conjuntos únicos con Set y diccionarios clave-valor con Map."
    },
    "sections": [
      {
        "title": "La colección Map: Clave - Valor",
        "explanation": "Un **`Map`** (o diccionario) es una colección que almacena datos en parejas compuestas por una **Clave (`Key`)** y un **Valor (`Value`)**:\n• **Clave (Key):** Debe ser **única**. Actúa como el identificador para buscar el dato (ej: el correo del usuario o el código de país).\n• **Valor (Value):** El dato asociado a esa clave (ej: los datos del perfil o el nombre del país). Los valores sí pueden repetirse.\n\nEn Kotlin creamos un mapa con la función **`mapOf()`** usando la palabra clave **`to`** para unir cada pareja:\n`val paises = mapOf(\"CR\" to \"Costa Rica\", \"MX\" to \"México\")`",
        "codeSnippet": "fun main() {\n    // Mapa de códigos de país a nombres completos\n    val capitales = mapOf(\n        \"ES\" to \"Madrid\",\n        \"AR\" to \"Buenos Aires\",\n        \"CO\" to \"Bogotá\"\n    )\n\n    println(\"Capital de España (clave 'ES'): ${capitales[\"ES\"]}\")\n    println(\"Capital de Colombia (clave 'CO'): ${capitales[\"CO\"]}\")\n\n    // Si la clave no existe, devuelve null de forma segura\n    println(\"Capital de Japón (clave 'JP'): ${capitales[\"JP\"]}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Capital de España (clave 'ES'): Madrid\nCapital de Colombia (clave 'CO'): Bogotá\nCapital de Japón (clave 'JP'): null",
        "byteTip": "Puedes definir un valor por defecto con .getOrDefault(\"JP\", \"No registrada\").",
        "pitfallTip": "Si en un mapa mutable asignas un valor a una clave que ya existía, el valor anterior se sobreescribe sin previo aviso.",
        "keyPoints": [
          "Map organiza la información en parejas clave-valor asociadas.",
          "Cada clave es única dentro del mapa.",
          "Consultar por clave mapa[clave] es una de las operaciones más rápidas en computación."
        ]
      },
      {
        "title": "Mapas mutables para perfiles y configuraciones",
        "explanation": "Con `mutableMapOf()` puedes agregar o actualizar configuraciones dinámicamente:",
        "codeSnippet": "fun main() {\n    val configuracionApp = mutableMapOf(\n        \"tema\" to \"oscuro\",\n        \"idioma\" to \"es\"\n    )\n\n    // Actualizamos el idioma y agregamos una nueva preferencia\n    configuracionApp[\"idioma\"] = \"en\"\n    configuracionApp[\"notificaciones\"] = \"activas\"\n\n    println(\"Configuraciones activas:\")\n    for ((clave, valor) in configuracionApp) {\n        println(\" • $clave: $valor\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Configuraciones activas:\n • tema: oscuro\n • idioma: en\n • notificaciones: activas",
        "byteTip": "for ((clave, valor) in mapa) permite recorrer las dos partes de cada pareja de forma directa.",
        "pitfallTip": "No uses tipos mutables como claves en un Map; si la clave cambia su estado interno, el mapa no podrá encontrarla.",
        "keyPoints": [
          "mutableMapOf() permite modificar parejas clave-valor en vivo.",
          "Ideal para almacenar respuestas JSON de servicios web y perfiles.",
          "La desestructuración (clave, valor) simplifica los recorridos con for."
        ]
      }
    ]
  },
  "kotlin-u09-l07": {
    "id": "kt-th-u09-l07",
    "lessonId": "kotlin-u09-l07",
    "pathId": "kotlin",
    "unitId": 9,
    "levelId": 7,
    "title": "7. Elegir la colección adecuada",
    "subtitle": "Aprende a elegir la colección ideal para cada caso: List, Set o Map.",
    "estimatedMinutes": 8,
    "analogy": "Elegir el vehículo adecuado: si llevas una fila de personas usas un autobús (List); si quieres un club exclusivo sin invitados repetidos usas un carnet de membresía (Set); si organizas casilleros con llaves numeradas usas un panel de casilleros (Map).",
    "video": {
      "title": "Colecciones en Kotlin: List, Set y Map",
      "channel": "AristiDevs",
      "duration": "52:10",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Listas mutables e inmutables, conjuntos únicos con Set y diccionarios clave-valor con Map."
    },
    "sections": [
      {
        "title": "¿Cuándo usar List, Set o Map?",
        "explanation": "Elegir la colección adecuada para cada problema hace que tu código sea infinitamente más limpio y eficiente.\n\nAquí tienes la guía de decisión oficial:\n\n1. **Usa `List` cuando:**\n• El orden de los elementos importa (como un historial de acciones o un ranking).\n• Se permiten elementos duplicados (como una lista de compras o notas de alumnos).\n• Quieres acceder a elementos por su número de posición (índice `0, 1, 2...`).\n\n2. **Usa `Set` cuando:**\n• La unicidad es prioritaria (no debe haber duplicados jamás).\n• El orden no es tan relevante.\n• Necesitas verificar con altísima velocidad si algo ya existe (`in`).\n\n3. **Usa `Map` cuando:**\n• Cada dato tiene una clave o identificador natural (cédula, ID, código de producto).\n• Necesitas buscar datos por nombre o código en lugar de por número de índice.",
        "codeSnippet": "fun main() {\n    // 1. List: orden y duplicados permitidos\n    val playlist = listOf(\"Canción A\", \"Canción B\", \"Canción A\")\n    println(\"Playlist (List): $playlist\")\n\n    // 2. Set: elementos únicos sin duplicados\n    val etiquetasUnicas = setOf(\"android\", \"kotlin\", \"android\")\n    println(\"Etiquetas (Set): $etiquetasUnicas\")\n\n    // 3. Map: búsqueda por clave identificadora\n    val precios = mapOf(\"manzana\" to 1.50, \"platano\" to 0.80)\n    println(\"Precio de la manzana (Map): $$ ${precios[\"manzana\"]}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Playlist (List): [Canción A, Canción B, Canción A]\nEtiquetas (Set): [android, kotlin]\nPrecio de la manzana (Map): $ 1.5",
        "byteTip": "Empieza siempre con la versión inmutable (listOf, setOf, mapOf) por defecto. Pasa a mutable solo cuando necesites modificarla.",
        "pitfallTip": "Usar List para búsquedas intensivas de millones de elementos es muy lento; en ese caso usa Set o Map.",
        "keyPoints": [
          "List para orden y duplicados.",
          "Set para unicidad estricta y velocidad de búsqueda.",
          "Map para asociaciones por clave e identificadores."
        ]
      },
      {
        "title": "Resumen arquitectónico en Android",
        "explanation": "En una aplicación real de Android:\n• Los productos en pantalla se envían al RecyclerView como una `List<Producto>`.\n• Los IDs de productos marcados como favoritos se guardan en un `Set<String>` para saber al instante si un corazón debe pintarse rojo.\n• El carrito de compras se almacena en un `Map<ProductoId, Cantidad>` para asociar cada artículo con sus unidades.",
        "codeSnippet": "fun main() {\n    val favoritos = setOf(101, 104) // Set de IDs favoritos\n    val carrito = mapOf(101 to 2, 102 to 1) // Map de ID a cantidad\n\n    println(\"¿El producto 101 es favorito?: ${101 in favoritos}\")\n    println(\"Cantidad de producto 101 en carrito: ${carrito[101]} unidades\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿El producto 101 es favorito?: true\nCantidad de producto 101 en carrito: 2 unidades",
        "byteTip": "Combinar las tres estructuras crea arquitecturas de datos sólidas y profesionales.",
        "pitfallTip": "No uses tipos complejos como claves en Map sin asegurarte de que implementen correctamente equals y hashCode.",
        "keyPoints": [
          "Cada colección resuelve una necesidad arquitectónica concreta.",
          "Dominar las colecciones es el salto de principiante a programador profesional.",
          "Kotlin ofrece la biblioteca de colecciones más rica y expresiva del ecosistema móvil."
        ]
      }
    ]
  }
};
