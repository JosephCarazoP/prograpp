import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_08_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u08-l01": {
    "id": "kt-th-u08-l01",
    "lessonId": "kotlin-u08-l01",
    "pathId": "kotlin",
    "unitId": 8,
    "levelId": 1,
    "title": "1. Longitud y acceso a caracteres",
    "subtitle": "Aprende a medir textos con .length y acceder a caracteres individuales por su índice numérico.",
    "estimatedMinutes": 8,
    "analogy": "Un tren con vagones numerados: el primer vagón es el 0, el segundo es el 1, el tercero es el 2. Cada vagón lleva una letra de la palabra.",
    "video": {
      "title": "Manipulación de Strings y Texto en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "30:15",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Métodos de cadenas, subcadenas, validaciones, trim, split y comparaciones."
    },
    "sections": [
      {
        "title": "Longitud y acceso por índice en Strings",
        "explanation": "En Kotlin, una cadena de texto (**`String`**) es una secuencia inmutable de caracteres (`Char`) ordenados.\n\nDos operaciones fundamentales sobre cualquier texto son:\n1. **Conocer su longitud (`.length`):** Te dice cuántos caracteres tiene en total (incluyendo letras, números, símbolos y espacios).\n2. **Acceder a una letra por su índice (`[índice]`):**\nEn informática, los índices siempre empiezan a contar en **cero (`0`)**:\n• El primer carácter está en la posición `0`.\n• El segundo en la posición `1`.\n• El último carácter está en la posición `length - 1`.",
        "codeSnippet": "fun main() {\n    val lenguaje = \"Kotlin\"\n    \n    println(\"Palabra: $lenguaje\")\n    println(\"Longitud total: ${lenguaje.length} caracteres\")\n    println(\"Primer carácter (índice 0): ${lenguaje[0]}\")\n    println(\"Tercer carácter (índice 2): ${lenguaje[2]}\")\n    println(\"Último carácter con .last(): ${lenguaje.last()}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Palabra: Kotlin\nLongitud total: 6 caracteres\nPrimer carácter (índice 0): K\nTercer carácter (índice 2): t\nÚltimo carácter con .last(): n",
        "byteTip": "Kotlin incluye funciones expresivas como .first() y .last() para obtener la primera y última letra sin lidiar con números de índice.",
        "pitfallTip": "Intentar acceder a un índice igual o mayor a .length (como lenguaje[6] en \"Kotlin\") lanzará un IndexOutOfBoundsException.",
        "keyPoints": [
          ".length entrega la cantidad total de caracteres.",
          "Los índices van desde 0 hasta length - 1.",
          ".first() y .last() simplifican el acceso a los extremos del texto."
        ]
      },
      {
        "title": "Validación de longitud de contraseñas",
        "explanation": "En cualquier app de registro, validar que la contraseña cumpla un mínimo de seguridad es una tarea elemental con `.length`:",
        "codeSnippet": "fun main() {\n    val contrasena = \"secretoSeguro2024\"\n    val longitudMinima = 8\n\n    if (contrasena.length >= longitudMinima) {\n        println(\"Contraseña válida: Cumple con el mínimo de $longitudMinima caracteres.\")\n    } else {\n        println(\"Error: La contraseña es demasiado corta.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Contraseña válida: Cumple con el mínimo de 8 caracteres.",
        "byteTip": "Los espacios en blanco también cuentan para la longitud total de un String.",
        "pitfallTip": "No confíes solo en la longitud; en lecciones posteriores verás cómo buscar mayúsculas y números.",
        "keyPoints": [
          ".length es una propiedad de solo lectura y acceso inmediato.",
          "Permite validar límites de texto en campos de entrada.",
          "Forma parte del núcleo estándar de la clase String de Kotlin."
        ]
      }
    ]
  },
  "kotlin-u08-l02": {
    "id": "kt-th-u08-l02",
    "lessonId": "kotlin-u08-l02",
    "pathId": "kotlin",
    "unitId": 8,
    "levelId": 2,
    "title": "2. Texto vacío frente a texto con espacios",
    "subtitle": "Aprende la diferencia crucial entre un texto completamente vacío (.isEmpty()) y uno lleno de espacios (.isBlank()).",
    "estimatedMinutes": 8,
    "analogy": "isEmpty() es como un plato sin comida (0 gramos). isBlank() es como un plato que solo tiene migajas invisibles o aire: parece que tiene algo porque alguien presionó la barra espaciadora, pero no alimenta a nadie.",
    "video": {
      "title": "Manipulación de Strings y Texto en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "30:15",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Métodos de cadenas, subcadenas, validaciones, trim, split y comparaciones."
    },
    "sections": [
      {
        "title": "Texto vacío (.isEmpty) vs Texto en blanco (.isBlank)",
        "explanation": "Uno de los errores más comunes al validar formularios es no distinguir entre dos estados sutiles pero muy diferentes:\n\n• **`.isEmpty()` (Vacío exacto):** Devuelve `true` únicamente si la longitud del texto es estrictamente cero (`\"\"`). Si el usuario escribe tres espacios (`\"   \"`), `isEmpty()` devolverá `false` porque su longitud es 3.\n• **`.isBlank()` (En blanco / Sin contenido real):** Devuelve `true` si el texto está vacío **O** si solo contiene espacios en blanco, tabulaciones o saltos de línea (`\"   \"`).\n\nEn aplicaciones reales, **`.isBlank()` es casi siempre lo que realmente quieres usar** para evitar que los usuarios envíen nombres o mensajes compuestos solo por espacios.",
        "codeSnippet": "fun main() {\n    val textoConEspacios = \"   \"\n\n    println(\"¿Está vacío con .isEmpty()?: ${textoConEspacios.isEmpty()}\")\n    println(\"¿Está en blanco con .isBlank()?: ${textoConEspacios.isBlank()}\")\n\n    // También existen sus contrapartes positivas:\n    println(\"¿Tiene contenido real con .isNotBlank()?: ${textoConEspacios.isNotBlank()}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Está vacío con .isEmpty()?: false\n¿Está en blanco con .isBlank()?: true\n¿Tiene contenido real con .isNotBlank()?: false",
        "byteTip": ".isNotBlank() es la forma más limpia y directa en Kotlin para verificar que un campo de texto contiene información auténtica.",
        "pitfallTip": "Usar isEmpty() para validar un campo obligatorio permitirá que un usuario tramposo presione la barra espaciadora y pase la validación.",
        "keyPoints": [
          "isEmpty() verifica que length sea estrictamente 0.",
          "isBlank() verifica que no contenga ningún carácter visible.",
          "isNotBlank() es el método predilecto para validar formularios en Android."
        ]
      },
      {
        "title": "Validación robusta de nombres en formularios",
        "explanation": "Mira cómo garantizar que el usuario ingrese un nombre genuino antes de guardarlo en la base de datos:",
        "codeSnippet": "fun validarNombreUsuario(nombre: String): Boolean {\n    return nombre.isNotBlank() && nombre.length >= 3\n}\n\nfun main() {\n    println(\"Prueba 1 ('   '): ${validarNombreUsuario(\"   \")}\")\n    println(\"Prueba 2 ('Jo'): ${validarNombreUsuario(\"Jo\")}\")\n    println(\"Prueba 3 ('Camila'): ${validarNombreUsuario(\"Camila\")}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Prueba 1 ('   '): false\nPrueba 2 ('Jo'): false\nPrueba 3 ('Camila'): true",
        "byteTip": "Combinar isNotBlank() con una longitud mínima asegura datos de alta calidad desde el primer momento.",
        "pitfallTip": "No uses nombre == \"\" para validar; no detecta espacios en blanco.",
        "keyPoints": [
          "La limpieza de datos al ingreso previene registros corruptos en bases de datos.",
          "isNotBlank() se encarga de espacios, tabulaciones y saltos de línea.",
          "El código de validación queda limpio, conciso y autoexplicativo."
        ]
      }
    ]
  },
  "kotlin-u08-l03": {
    "id": "kt-th-u08-l03",
    "lessonId": "kotlin-u08-l03",
    "pathId": "kotlin",
    "unitId": 8,
    "levelId": 3,
    "title": "3. Eliminar espacios con trim()",
    "subtitle": "Elimina espacios accidentales al inicio y al final de los textos con el método .trim().",
    "estimatedMinutes": 8,
    "analogy": "Pasarle una podadora a un césped para cortar solo los bordes que sobresalen a los lados, dejando intacto el césped del medio.",
    "video": {
      "title": "Manipulación de Strings y Texto en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "30:15",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Métodos de cadenas, subcadenas, validaciones, trim, split y comparaciones."
    },
    "sections": [
      {
        "title": "Limpieza de texto con .trim()",
        "explanation": "Al escribir en el teclado de un teléfono, es sumamente común presionar accidentalmente la barra espaciadora antes o después de escribir un correo o nombre de usuario (`\"  carlos@gmail.com \"`).\n\nSi guardas ese correo tal cual, fallará al intentar iniciar sesión porque el correo oficial no tiene esos espacios.\n\nEl método **`.trim()`**:\n• Elimina todos los espacios en blanco sobrantes al inicio y al final de la cadena.\n• **No toca los espacios intermedios** (por ejemplo, el espacio entre tu nombre y apellido se conserva intacto).\n• Devuelve una nueva cadena limpia y sanitizada.",
        "codeSnippet": "fun main() {\n    val correoConEspacios = \"   carlos.mendoza@empresa.com   \"\n    \n    println(\"Texto original : '$correoConEspacios'\")\n    \n    // Limpiamos los extremos con .trim()\n    val correoLimpio = correoConEspacios.trim()\n    println(\"Texto con trim() : '$correoLimpio'\")\n    println(\"Longitud antes: ${correoConEspacios.length} -> después: ${correoLimpio.length}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Texto original : '   carlos.mendoza@empresa.com   '\nTexto con trim() : 'carlos.mendoza@empresa.com'\nLongitud antes: 32 -> después: 26",
        "byteTip": "También existen trimStart() y trimEnd() si solo deseas recortar un extremo específico del texto.",
        "pitfallTip": "Recuerda que los Strings en Kotlin son inmutables: correoConEspacios.trim() no modifica la variable original, devuelve una nueva limpia.",
        "keyPoints": [
          ".trim() recorta espacios en blanco al inicio y al final.",
          "Conserva los espacios válidos entre palabras internas.",
          "Es una regla de higiene obligatoria en cualquier app antes de guardar o comparar datos."
        ]
      },
      {
        "title": "Sanitización en flujos de autenticación",
        "explanation": "Aplica siempre `.trim()` al recibir credenciales de login antes de compararlas con tu base de datos:",
        "codeSnippet": "fun main() {\n    val entradaTeclado = \"  admin  \"\n    val usuarioAlmacenado = \"admin\"\n\n    // Sin trim daría false por los espacios\n    val esValido = entradaTeclado.trim() == usuarioAlmacenado\n    println(\"¿Credencial correcta tras sanitizar?: $esValido\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Credencial correcta tras sanitizar?: true",
        "byteTip": "Puedes encadenar métodos: entradaTeclado.trim().lowercase() para limpiar espacios y mayúsculas en un solo paso.",
        "pitfallTip": "No uses trim() sobre contraseñas si el usuario conscientemente decidió incluir espacios válidos dentro de su frase de contraseña.",
        "keyPoints": [
          "La sanitización previene rechazos falsos en formularios de acceso.",
          "Encadenar métodos de texto es una práctica muy idiomática en Kotlin.",
          "Aumenta la satisfacción del usuario al tolerar toques accidentales de la barra espaciadora."
        ]
      }
    ]
  },
  "kotlin-u08-l04": {
    "id": "kt-th-u08-l04",
    "lessonId": "kotlin-u08-l04",
    "pathId": "kotlin",
    "unitId": 8,
    "levelId": 4,
    "title": "4. Mayúsculas y minúsculas",
    "subtitle": "Normaliza textos transformándolos a mayúsculas con .uppercase() y minúsculas con .lowercase().",
    "estimatedMinutes": 8,
    "analogy": "Un traductor universal que convierte todo a letra molde mayúscula para que no importe si alguien escribió \"si\", \"Si\" o \"SI\"; todos se leen idénticos como \"SI\".",
    "video": {
      "title": "Manipulación de Strings y Texto en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "30:15",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Métodos de cadenas, subcadenas, validaciones, trim, split y comparaciones."
    },
    "sections": [
      {
        "title": "Transformación de mayúsculas y minúsculas",
        "explanation": "En versiones modernas de Kotlin, los métodos oficiales para transformar texto son:\n\n• **`.uppercase()`**: Convierte todos los caracteres de la cadena a mayúsculas.\n• **`.lowercase()`**: Convierte todos los caracteres de la cadena a minúsculas.\n\n¿Por qué es crucial?\nLas comparaciones de texto en informática son estrictas. Para la máquina, `\"Android\" == \"android\"` es **`false`** porque la 'A' mayúscula tiene un código binario distinto a la 'a' minúscula.\nPara comparar sin importar cómo lo escribió el usuario, normalizamos ambos textos al mismo caso antes de contrastar.",
        "codeSnippet": "fun main() {\n    val entrada1 = \"KOTLIN\"\n    val entrada2 = \"kotlin\"\n\n    println(\"Originales: $entrada1 frente a $entrada2\")\n    println(\"¿Son iguales directamente?: ${entrada1 == entrada2}\")\n\n    // Normalizamos ambas a minúsculas\n    val coinciden = entrada1.lowercase() == entrada2.lowercase()\n    println(\"¿Coinciden tras normalizar con .lowercase()?: $coinciden\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Originales: KOTLIN frente a kotlin\n¿Son iguales directamente?: false\n¿Coinciden tras normalizar con .lowercase()?: true",
        "byteTip": "Usa uppercase() y lowercase() en lugar de los antiguos toUpperCase() y toLowerCase(), que ya están obsoletos en Kotlin moderno.",
        "pitfallTip": "Recuerda que estas funciones respetan caracteres especiales de otros idiomas si no se especifica el Locale.",
        "keyPoints": [
          ".uppercase() y .lowercase() son los métodos modernos estándar.",
          "Permiten realizar comparaciones insensibles a mayúsculas de forma predecible.",
          "Normalizar correos y códigos de producto evita duplicados en bases de datos."
        ]
      },
      {
        "title": "Comparación con ignoreCase",
        "explanation": "Si solo quieres verificar si dos textos son iguales sin importar mayúsculas ni generar un nuevo String en memoria, usa `.equals(otro, ignoreCase = true)`:",
        "codeSnippet": "fun main() {\n    val comando = \"SALIR\"\n    \n    if (comando.equals(\"salir\", ignoreCase = true)) {\n        println(\"Cerrando sesión de usuario de forma segura...\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Cerrando sesión de usuario de forma segura...",
        "byteTip": "ignoreCase = true es más eficiente en memoria porque no crea un nuevo String intermedio.",
        "pitfallTip": "No uses ignoreCase para contraseñas; las contraseñas siempre deben distinguir mayúsculas de minúsculas por seguridad.",
        "keyPoints": [
          ".equals(..., ignoreCase = true) compara sin distinguir mayúsculas.",
          "Ahorra asignaciones de memoria temporales.",
          "Ideal para comandos de texto, filtros de búsqueda y respuestas de confirmación."
        ]
      }
    ]
  },
  "kotlin-u08-l05": {
    "id": "kt-th-u08-l05",
    "lessonId": "kotlin-u08-l05",
    "pathId": "kotlin",
    "unitId": 8,
    "levelId": 5,
    "title": "5. contains(), startsWith() y endsWith()",
    "subtitle": "Busca palabras y patrones con .contains(), .startsWith() y .endsWith().",
    "estimatedMinutes": 8,
    "analogy": "Un perro rastreador de biblioteca: le pides que busque si un libro contiene cierta palabra en cualquier página (contains), si empieza con cierto título (startsWith) o si termina con cierta extensión de archivo como .pdf (endsWith).",
    "video": {
      "title": "Manipulación de Strings y Texto en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "30:15",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Métodos de cadenas, subcadenas, validaciones, trim, split y comparaciones."
    },
    "sections": [
      {
        "title": "Búsquedas de subcadenas en texto",
        "explanation": "Kotlin incluye tres métodos sumamente intuitivos para comprobar la presencia de texto:\n\n• **`.contains(\"subtexto\")`**: Devuelve `true` si el fragmento de texto aparece en cualquier posición de la cadena.\n• **`.startsWith(\"prefijo\")`**: Devuelve `true` si la cadena comienza exactamente con esas letras.\n• **`.endsWith(\"sufijo\")`**: Devuelve `true` si la cadena termina exactamente con esas letras.",
        "codeSnippet": "fun main() {\n    val urlWeb = \"https://developer.android.com/kotlin\"\n    val nombreArchivo = \"reporte_financiero_2024.pdf\"\n\n    println(\"¿Es un enlace seguro (https)?: ${urlWeb.startsWith(\"https://\")}\")\n    println(\"¿Contiene la palabra 'android'?: ${urlWeb.contains(\"android\")}\")\n    println(\"¿Es un documento en formato PDF?: ${nombreArchivo.endsWith(\".pdf\")}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Es un enlace seguro (https)?: true\n¿Contiene la palabra 'android'?: true\n¿Es un documento en formato PDF?: true",
        "byteTip": "contains() también admite ignoreCase = true: texto.contains(\"kotlin\", ignoreCase = true).",
        "pitfallTip": "startsWith() y endsWith() respetan mayúsculas por defecto. Asegúrate de verificar \"https://\" y no \"HTTPS://\".",
        "keyPoints": [
          "contains() inspecciona si un término existe en cualquier parte de la cadena.",
          "startsWith() valida protocolos, prefijos y códigos de país.",
          "endsWith() es ideal para validar extensiones de archivo (.png, .json, .pdf)."
        ]
      },
      {
        "title": "Filtro de búsqueda de productos en una app",
        "explanation": "Mira cómo implementar el motor de búsqueda de un catálogo cuando un cliente escribe una palabra clave:",
        "codeSnippet": "fun main() {\n    val tituloProducto = \"Auriculares Inalámbricos Bluetooth Pro\"\n    val busquedaCliente = \"bluetooth\"\n\n    val coincide = tituloProducto.contains(busquedaCliente, ignoreCase = true)\n    println(\"¿El producto coincide con la búsqueda?: $coincide\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿El producto coincide con la búsqueda?: true",
        "byteTip": "El parámetro ignoreCase = true garantiza que los clientes encuentren productos sin importar cómo escriban en su teclado.",
        "pitfallTip": "Si busquedaCliente está vacía (\"\"), contains() devolverá true para cualquier texto.",
        "keyPoints": [
          "Las búsquedas con ignoreCase = true ofrecen una experiencia de usuario natural.",
          "Es el mecanismo básico detrás de barras de búsqueda y autocompletado.",
          "Permite filtrar listas completas con pocas líneas de código."
        ]
      }
    ]
  },
  "kotlin-u08-l06": {
    "id": "kt-th-u08-l06",
    "lessonId": "kotlin-u08-l06",
    "pathId": "kotlin",
    "unitId": 8,
    "levelId": 6,
    "title": "6. Dividir y unir texto",
    "subtitle": "Divide oraciones en partes con .split() y reúne elementos en un solo texto con .joinToString().",
    "estimatedMinutes": 8,
    "analogy": ".split() es como cortar una barra de pan en rebanadas con un cuchillo en cada marca. .joinToString() es tomar esas rebanadas y unirlas de nuevo con mermelada entre ellas.",
    "video": {
      "title": "Manipulación de Strings y Texto en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "30:15",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Métodos de cadenas, subcadenas, validaciones, trim, split y comparaciones."
    },
    "sections": [
      {
        "title": "Partición y unión de cadenas",
        "explanation": "Frecuentemente recibimos datos empaquetados en un solo texto separados por comas, guiones o espacios (como un archivo CSV o una lista de etiquetas).\n\nKotlin nos da dos herramientas simétricas perfectas:\n1. **`.split(separador)`**: Corta el texto en pedazos cada vez que encuentra el separador indicado y devuelve una lista (`List<String>`) con los fragmentos.\n2. **`.joinToString(separador)`**: Toma una lista de elementos y los une en una sola cadena de texto continua, intercalando el separador que elijas.",
        "codeSnippet": "fun main() {\n    val etiquetasTexto = \"kotlin,android,programacion,movil\"\n    \n    // 1. Dividimos el texto en una lista usando la coma como separador\n    val listaEtiquetas = etiquetasTexto.split(\",\")\n    println(\"Lista de etiquetas: $listaEtiquetas\")\n    println(\"Primera etiqueta: ${listaEtiquetas[0]}\")\n\n    // 2. Unimos la lista con un separador visual agradable\n    val textoFormateado = listaEtiquetas.joinToString(separator = \" • \") { \"#${it.uppercase()}\" }\n    println(\"Formato para redes sociales: $textoFormateado\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Lista de etiquetas: [kotlin, android, programacion, movil]\nPrimera etiqueta: kotlin\nFormato para redes sociales: #KOTLIN • #ANDROID • #PROGRAMACION • #MOVIL",
        "byteTip": "joinToString admite parámetros útiles como prefix, postfix y separator para armar reportes de un tirón.",
        "pitfallTip": "Si usas split(\"\") con separador vacío, obtendrás una lista de caracteres individuales con elementos vacíos a los extremos.",
        "keyPoints": [
          "split(separador) divide una cadena en una lista de fragmentos.",
          "joinToString() ensambla una colección en un solo texto legible.",
          "Son las herramientas estándar para procesar archivos CSV y formatos delimitados."
        ]
      },
      {
        "title": "Procesar nombres completos",
        "explanation": "Un caso práctico es separar el nombre y el apellido de una persona a partir de una sola casilla:",
        "codeSnippet": "fun main() {\n    val nombreCompleto = \"Valeria Morales Gómez\"\n    val partes = nombreCompleto.split(\" \")\n\n    val primerNombre = partes[0]\n    val apellidoPaterno = partes[1]\n    \n    println(\"Nombre: $primerNombre | Apellido: $apellidoPaterno\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Nombre: Valeria | Apellido: Morales",
        "byteTip": "Verifica siempre partes.size antes de acceder a índices para asegurarte de que el usuario escribió al menos dos palabras.",
        "pitfallTip": "Si el usuario escribe dos espacios seguidos entre nombres, split(\" \") creará un elemento vacío intermedio.",
        "keyPoints": [
          "split con espacio divide palabras individuales de un párrafo.",
          "Comprobar el tamaño de la lista resultante previene IndexOutOfBoundsException.",
          "Permite adaptar datos en bloque a estructuras de objetos."
        ]
      }
    ]
  },
  "kotlin-u08-l07": {
    "id": "kt-th-u08-l07",
    "lessonId": "kotlin-u08-l07",
    "pathId": "kotlin",
    "unitId": 8,
    "levelId": 7,
    "title": "7. Comparación y validación de cadenas",
    "subtitle": "Aprende a validar cadenas y proteger tu aplicación contra textos maliciosos o vacíos.",
    "estimatedMinutes": 8,
    "analogy": "Un control de aduana en un aeropuerto: revisan que tu documento no esté en blanco, que no tenga caracteres prohibidos y que cumpla con el formato oficial antes de sellar tu entrada.",
    "video": {
      "title": "Manipulación de Strings y Texto en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "30:15",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Métodos de cadenas, subcadenas, validaciones, trim, split y comparaciones."
    },
    "sections": [
      {
        "title": "Estrategias de validación y comparación de texto",
        "explanation": "Validar cadenas de texto es el primer escudo de defensa de cualquier aplicación para evitar guardar basura en bases de datos o sufrir errores inesperados.\n\nUna validación completa de texto suele comprobar tres aspectos en orden:\n1. **Que no sea nulo ni esté en blanco:** Usando `texto?.isNotBlank() == true`.\n2. **Que cumpla con límites de tamaño:** Para no saturar la base de datos (`texto.length in 3..50`).\n3. **Que contenga o excluya ciertos patrones:** Por ejemplo, verificar que un correo incluya un arroba `@` y un punto `.`.",
        "codeSnippet": "fun validarCorreo(correo: String?): Boolean {\n    if (correo == null || correo.isBlank()) {\n        return false // Rechazado por nulo o vacío\n    }\n    val limpio = correo.trim()\n    return limpio.contains(\"@\") && limpio.contains(\".\") && limpio.length >= 6\n}\n\nfun main() {\n    println(\"Valida 'ana@gmail.com' : ${validarCorreo(\"ana@gmail.com\")}\")\n    println(\"Valida 'correo_invalido' : ${validarCorreo(\"correo_invalido\")}\")\n    println(\"Valida null            : ${validarCorreo(null)}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Valida 'ana@gmail.com' : true\nValida 'correo_invalido' : false\nValida null            : false",
        "byteTip": "En producción puedes usar expresiones regulares (Regex) para validaciones de correos y teléfonos aún más rigurosas.",
        "pitfallTip": "No confíes nunca en las validaciones del lado del cliente como única defensa si tienes una API web en el servidor.",
        "keyPoints": [
          "La validación escalonada verifica presencia, longitud y formato en orden.",
          "Retornar false temprano simplifica la lógica de verificación.",
          "Sanitizar con trim() antes de validar evita falsos rechazos."
        ]
      },
      {
        "title": "Cadenas multilínea con triples comillas (\"\"\")",
        "explanation": "Si necesitas redactar un correo largo, una consulta SQL o un documento JSON sin tener que llenar tu código de signos `\\n` o concatenaciones feas, usa **triples comillas (`\"\"\"`)**:",
        "codeSnippet": "fun main() {\n    val mensajeBienvenida = \"\"\"\n        Estimado usuario,\n        Gracias por registrarte en nuestra plataforma.\n        Tu cuenta ha sido activada con éxito.\n    \"\"\".trimIndent()\n\n    println(mensajeBienvenida)\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Estimado usuario,\nGracias por registrarte en nuestra plataforma.\nTu cuenta ha sido activada con éxito.",
        "byteTip": ".trimIndent() retira automáticamente el margen izquierdo sobrante para que el texto quede alineado.",
        "pitfallTip": "Dentro de triples comillas no puedes escapar caracteres con barra invertida (\\); para insertar un signo de dólar literal usa `${\"$\"}`.",
        "keyPoints": [
          "\"\"\" permite redactar textos largos multilínea con formato visual directo.",
          ".trimIndent() normaliza el margen izquierdo del texto.",
          "Ideal para plantillas de correos, JSON y consultas SQL embebidas."
        ]
      }
    ]
  }
};
