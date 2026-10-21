import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_07_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u07-l01": {
    "id": "kt-th-u07-l01",
    "lessonId": "kotlin-u07-l01",
    "pathId": "kotlin",
    "unitId": 7,
    "levelId": 1,
    "title": "1. Diferencia entre texto y valor numérico",
    "subtitle": "Comprende la diferencia fundamental entre el texto que representa un número y el valor numérico en memoria.",
    "estimatedMinutes": 8,
    "analogy": "Una foto de una manzana impresa en un papel frente a una manzana real en tu mano. Puedes mirar la foto, pero solo puedes comerte la manzana real. De igual forma, no puedes hacer cálculos matemáticos con un texto sin antes convertirlo a un número.",
    "video": {
      "title": "Null Safety y Conversiones Seguras en Kotlin",
      "channel": "AristiDevs",
      "duration": "38:20",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Tipos anulables (?), operador Elvis (?:), llamada segura (?.) y evitar NullPointerException."
    },
    "sections": [
      {
        "title": "Texto numérico frente a valor numérico",
        "explanation": "Uno de los conceptos que más confunde al iniciar es que para la computadora, el texto `\"25\"` (un `String`) y el número `25` (un `Int`) son animales completamente diferentes:\n\n• **`String` (`\"25\"`):** Es una secuencia de dos símbolos gráficos (el carácter '2' y el carácter '5'). Si sumas dos textos con `+`, se pegan (*concatenación*): `\"25\" + \"10\"` produce `\"2510\"`.\n• **`Int` (`25`):** Es una magnitud binaria matemática guardada en la memoria. Si sumas dos números: `25 + 10` produce `35`.\n\nEn Android, casi todas las entradas que el usuario digita en un formulario llegan como texto. Para operar con ellas, debemos convertirlas a valores numéricos reales.",
        "codeSnippet": "fun main() {\n    val textoA = \"50\"\n    val textoB = \"20\"\n    \n    // Suma de Strings: se concatenan los textos\n    println(\"Concatenación de texto : ${textoA + textoB}\")\n\n    // Convertimos explícitamente a números antes de sumar\n    val numA = textoA.toInt()\n    val numB = textoB.toInt()\n    println(\"Suma matemática real : ${numA + numB}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Concatenación de texto : 5020\nSuma matemática real : 70",
        "byteTip": "Usa .toInt() o .toDouble() cuando necesites realizar cálculos matemáticos con datos recibidos de la interfaz de usuario.",
        "pitfallTip": "Si intentas hacer .toInt() sobre un texto que contiene letras (como \"50a\"), tu programa se detendrá con un error. Por eso existen métodos seguros como toIntOrNull().",
        "keyPoints": [
          "\"10\" es un texto; 10 es un valor numérico operable.",
          "+ entre textos concatena; + entre números suma matemáticamente.",
          "La conversión explícita es el puente entre lo que el usuario escribe y los cálculos del sistema."
        ]
      },
      {
        "title": "Entradas de usuario en interfaces móviles",
        "explanation": "Mira lo que ocurre al calcular el precio total cuando un usuario escribe cantidades en una app de compras:",
        "codeSnippet": "fun main() {\n    val textoPrecio = \"129.99\"\n    val textoCantidad = \"3\"\n\n    val precio = textoPrecio.toDouble()\n    val cantidad = textoCantidad.toInt()\n    val subtotal = precio * cantidad\n\n    println(\"Calculado: $cantidad unidades a $$precio = $$subtotal\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Calculado: 3 unidades a $129.99 = $389.97",
        "byteTip": "El método .toDouble() maneja decimales y respeta el punto como separador numérico estándar.",
        "pitfallTip": "Cuidado con las comas en lugar de puntos (como \"129,99\"). En Kotlin estándar, los decimales usan punto.",
        "keyPoints": [
          "toDouble() convierte cadenas a punto flotante.",
          "toInt() convierte cadenas a números enteros.",
          "Ambos son vitales para procesar compras y formularios en apps Android."
        ]
      }
    ]
  },
  "kotlin-u07-l02": {
    "id": "kt-th-u07-l02",
    "lessonId": "kotlin-u07-l02",
    "pathId": "kotlin",
    "unitId": 7,
    "levelId": 2,
    "title": "2. Conversiones con toIntOrNull() y toDoubleOrNull()",
    "subtitle": "Convierte textos a números sin miedo a que tu app se caiga gracias a toIntOrNull() y toDoubleOrNull().",
    "estimatedMinutes": 8,
    "analogy": "Un inspector de boletos: si le entregas un boleto válido, te deja pasar con tu número de asiento; si le entregas un envoltorio de dulce arrugado, no se desmaya ni rompe el teatro, simplemente te dice con calma \"esto no es un boleto\" (null).",
    "video": {
      "title": "Null Safety y Conversiones Seguras en Kotlin",
      "channel": "AristiDevs",
      "duration": "38:20",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Tipos anulables (?), operador Elvis (?:), llamada segura (?.) y evitar NullPointerException."
    },
    "sections": [
      {
        "title": "Conversión segura con toIntOrNull()",
        "explanation": "Si usas `.toInt()` sobre un texto inválido (como `\"veinte\"` o `\"\"` vacío), Kotlin lanzará una excepción que cerrará la aplicación de golpe.\n\nPara evitar esto, Kotlin incluye métodos seguros como **`toIntOrNull()`** y **`toDoubleOrNull()`**:\n• Si el texto es un número válido (ej: `\"42\"`), devuelve el número: `42`.\n• Si el texto contiene letras, símbolos o está vacío (ej: `\"abc\"`), **no provoca ningún error**, sino que devuelve pacíficamente un valor especial: **`null`** (ausencia de valor).",
        "codeSnippet": "fun main() {\n    val entradaValida = \"150\"\n    val entradaInvalida = \"cien_pesos\"\n\n    val numero1 = entradaValida.toIntOrNull()\n    val numero2 = entradaInvalida.toIntOrNull()\n\n    println(\"Resultado 1: $numero1 (conversión exitosa)\")\n    println(\"Resultado 2: $numero2 (evitó el cierre de la app)\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Resultado 1: 150 (conversión exitosa)\nResultado 2: null (evitó el cierre de la app)",
        "byteTip": "toIntOrNull() devuelve un tipo Int? (un entero anulable). Requiere que manejes el caso en que sea null.",
        "pitfallTip": "No uses .toInt() a secas cuando leas datos introducidos por usuarios reales. Los usuarios cometen errores tipográficos todo el tiempo.",
        "keyPoints": [
          "toIntOrNull() y toDoubleOrNull() convierten cadenas sin riesgo de crash.",
          "Devuelven null cuando la entrada no puede interpretarse como número.",
          "Es la práctica recomendada oficial en Android para validar formularios."
        ]
      },
      {
        "title": "Manejo defensivo de entradas con if",
        "explanation": "Al verificar si el resultado de la conversión es `null`, puedes avisarle amablemente al usuario qué corregir:",
        "codeSnippet": "fun main() {\n    val entradaUsuario = \"35\"\n    val edad = entradaUsuario.toIntOrNull()\n\n    if (edad != null) {\n        println(\"Edad validada correctamente: $edad años.\")\n    } else {\n        println(\"Error: Por favor escribe un número válido.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Edad validada correctamente: 35 años.",
        "byteTip": "Cuando Kotlin ve que comprobaste edad != null dentro de un if, automáticamente te permite usar edad como un Int normal (Smart Cast).",
        "pitfallTip": "Omitir la comprobación de null antes de intentar operar con un tipo Int? provocará un error de compilación.",
        "keyPoints": [
          "Comprobar if (variable != null) protege la ejecución de tu lógica.",
          "El compilador de Kotlin recuerda que ya verificaste que no es nulo.",
          "La programación defensiva previene el 99% de los bugs en producción."
        ]
      }
    ]
  },
  "kotlin-u07-l03": {
    "id": "kt-th-u07-l03",
    "lessonId": "kotlin-u07-l03",
    "pathId": "kotlin",
    "unitId": 7,
    "levelId": 3,
    "title": "3. Significado de null",
    "subtitle": "Comprende qué significa null y por qué es el famoso \"error del millón de dólares\" en informática.",
    "estimatedMinutes": 8,
    "analogy": "Imagina una caja de regalo: una caja con un reloj adentro contiene un objeto. Una caja vacía no contiene nada (está vacía). Pero null es ni siquiera tener la caja en tus manos: intentas abrir algo que no existe y te caes al vacío.",
    "video": {
      "title": "Null Safety y Conversiones Seguras en Kotlin",
      "channel": "AristiDevs",
      "duration": "38:20",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Tipos anulables (?), operador Elvis (?:), llamada segura (?.) y evitar NullPointerException."
    },
    "sections": [
      {
        "title": "¿Qué es null y por qué es tan peligroso?",
        "explanation": "En programación, **`null`** representa la **ausencia total de valor**. Significa que una variable no apunta a ningún objeto en la memoria.\n\nEn la década de 1960, el científico de la computación Sir Tony Hoare inventó el concepto de referencia nula y más tarde lo bautizó como su *\"error del billón de dólares\"*:\nEn casi todos los lenguajes tradicionales (como Java, C o JavaScript), si intentas llamar a un método sobre una variable que vale `null` (por ejemplo: `usuario.nombre`), el programa se detiene violentamente con el temido error **`NullPointerException` (NPE)**.\n\nKotlin fue diseñado específicamente con **Null Safety** (seguridad contra nulos) integrado en el corazón del lenguaje para erradicar este problema para siempre.",
        "codeSnippet": "fun main() {\n    // En Kotlin, las variables comunes NO pueden ser nulas por defecto\n    val nombre: String = \"Sofía\"\n    println(\"Longitud del nombre: ${nombre.length} caracteres.\")\n\n    // nombre = null -> ¡ERROR de compilación inmediato!\n    // Kotlin no te deja compilar código que pueda causar un NullPointerException accidental.\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Longitud del nombre: 5 caracteres.",
        "byteTip": "En Kotlin, una variable no anulable te da la garantía matemática absoluta de que jamás será null en ningún momento.",
        "pitfallTip": "En lenguajes como Java, cualquier variable puede ser null sin avisarte. En Kotlin debes pedir permiso explícito.",
        "keyPoints": [
          "null representa la ausencia de un objeto en memoria.",
          "El NullPointerException es la causa número uno de caídas en apps tradicionales.",
          "Kotlin fue diseñado desde cero para prevenir errores por nulos en tiempo de compilación."
        ]
      },
      {
        "title": "El sistema de tipos no anulables por defecto",
        "explanation": "La genialidad de Kotlin radica en una regla simple: **por defecto, ningún tipo de dato acepta null**.\n\nSi declaras:\n`val ciudad: String = \"Lima\"`\nEl compilador te garantiza al 100% que la variable `ciudad` siempre tendrá un texto válido. Puedes llamar a todos sus métodos (`.length`, `.uppercase()`) con total tranquilidad y cero riesgo de caídas.",
        "codeSnippet": "fun main() {\n    val correo: String = \"contacto@empresa.com\"\n    println(\"Dominio del correo: ${correo.substringAfter('@')}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Dominio del correo: empresa.com",
        "byteTip": "substringAfter('@') extrae todo el texto ubicado después del carácter @ de forma limpia.",
        "pitfallTip": "No intentes forzar null en tipos regulares; el compilador no te dejará pasar.",
        "keyPoints": [
          "Por defecto, los tipos en Kotlin son no anulables (Non-nullable types).",
          "Puedes llamar a métodos con total seguridad sin envolver todo en comprobaciones manuales.",
          "Esta característica hace que las apps escritas en Kotlin sean infinitamente más estables."
        ]
      }
    ]
  },
  "kotlin-u07-l04": {
    "id": "kt-th-u07-l04",
    "lessonId": "kotlin-u07-l04",
    "pathId": "kotlin",
    "unitId": 7,
    "levelId": 4,
    "title": "4. Tipos anulables: String?, Int?",
    "subtitle": "Declara variables que pueden contener null de forma controlada usando el operador de interrogación (?).",
    "estimatedMinutes": 8,
    "analogy": "Un formulario donde el teléfono fijo es opcional: quien lo tiene lo anota (valor String), y quien no lo tiene deja la casilla en blanco (null). El signo ? le advierte al sistema que ese campo puede venir vacío.",
    "video": {
      "title": "Null Safety y Conversiones Seguras en Kotlin",
      "channel": "AristiDevs",
      "duration": "38:20",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Tipos anulables (?), operador Elvis (?:), llamada segura (?.) y evitar NullPointerException."
    },
    "sections": [
      {
        "title": "Tipos anulables con el operador de interrogación (?)",
        "explanation": "En situaciones reales de software, la ausencia de valor es a veces legítima:\n• Un usuario puede no tener una foto de perfil asignada aún.\n• El segundo apellido puede ser opcional en un registro.\n• Una consulta a internet puede no encontrar resultados.\n\nPara permitir que una variable acepte `null` de forma explícita y segura, agregamos un **signo de interrogación (`?`)** al final de su tipo:\n• `String` -> Nunca puede ser `null`.\n• **`String?`** -> Puede contener un texto válido **O** puede ser `null`.",
        "codeSnippet": "fun main() {\n    // Tipo no anulable (no acepta null)\n    val nombreObligatorio: String = \"Alejandro\"\n\n    // Tipo anulable con ? (acepta null de forma legal)\n    var apodoOpcional: String? = null\n    println(\"Nombre: $nombreObligatorio | Apodo inicial: $apodoOpcional\")\n\n    apodoOpcional = \"Alex\"\n    println(\"Nombre: $nombreObligatorio | Apodo asignado: $apodoOpcional\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Nombre: Alejandro | Apodo inicial: null\nNombre: Alejandro | Apodo asignado: Alex",
        "byteTip": "Kotlin trata a String y a String? como dos tipos de datos completamente distintos. No te dejará mezclarlos sin validación previa.",
        "pitfallTip": "Si tienes una variable String?, Kotlin no te dejará llamar directamente a .length porque podría ser null y causar un crash.",
        "keyPoints": [
          "El signo ? después del tipo habilita la capacidad de almacenar null.",
          "Permite modelar datos opcionales de la vida real con total transparencia.",
          "El compilador te obliga a verificar la variable antes de acceder a sus propiedades."
        ]
      },
      {
        "title": "Protección en tiempo de compilación",
        "explanation": "Mira lo que hace el compilador si intentas acceder a una propiedad de un tipo anulable sin protección:\n`val telefono: String? = null`\n`println(telefono.length) // ¡ERROR de compilación!`\n\nKotlin te detiene y te dice: *\"Oye, teléfono podría ser null, debes verificarlo primero antes de pedir su longitud\"*. En la siguiente lección aprenderás las dos formas más elegantes de hacerlo.",
        "codeSnippet": "fun main() {\n    val direccionSecundaria: String? = null\n    println(\"¿Tiene dirección secundaria registrada?: ${direccionSecundaria != null}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Tiene dirección secundaria registrada?: false",
        "byteTip": "Comparar con != null es la forma más directa de saber si un dato opcional está presente.",
        "pitfallTip": "No uses tipos anulables (?) por capricho. Si un dato es obligatorio en tu sistema, usa un tipo no anulable estricto.",
        "keyPoints": [
          "El compilador bloquea accesos directos inseguros sobre tipos con ?.",
          "Te obliga a decidir conscientemente qué hacer si el dato es nulo.",
          "Garantiza que ningún NullPointerException llegue a los usuarios en producción."
        ]
      }
    ]
  },
  "kotlin-u07-l05": {
    "id": "kt-th-u07-l05",
    "lessonId": "kotlin-u07-l05",
    "pathId": "kotlin",
    "unitId": 7,
    "levelId": 5,
    "title": "5. Comprobación de nulos",
    "subtitle": "Aprende cómo el compilador de Kotlin convierte tipos anulables en seguros automáticamente con Smart Cast.",
    "estimatedMinutes": 8,
    "analogy": "Un guardia de seguridad que revisa tu boleto en la entrada: una vez que comprueba que tu boleto es auténtico (if boleto != null), te deja pasar al área VIP sin volverte a pedir el boleto a cada paso.",
    "video": {
      "title": "Null Safety y Conversiones Seguras en Kotlin",
      "channel": "AristiDevs",
      "duration": "38:20",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Tipos anulables (?), operador Elvis (?:), llamada segura (?.) y evitar NullPointerException."
    },
    "sections": [
      {
        "title": "Comprobación de nulos y Smart Cast",
        "explanation": "La forma más intuitiva de manejar una variable anulable (`String?`) es revisarla con un simple `if (variable != null)`.\n\nLo maravilloso de Kotlin es lo que ocurre adentro de ese `if`: **Smart Cast (Conversión Inteligente)**.\nEl compilador recuerda que ya verificaste que no es nula, y dentro de las llaves del `if` transforma automáticamente la variable de `String?` a `String` normal. ¡Ya no tienes que hacer ninguna conversión manual!",
        "codeSnippet": "fun main() {\n    val biografiaUsuario: String? = \"Desarrollador apasionado por Kotlin y Android.\"\n\n    // Fuera del if, biografiaUsuario es String? (anulable)\n    if (biografiaUsuario != null) {\n        // Adentro del if, ¡Kotlin aplica Smart Cast a String no anulable!\n        println(\"Biografía encontrada: $biografiaUsuario\")\n        println(\"Tiene ${biografiaUsuario.length} caracteres.\")\n    } else {\n        println(\"El usuario no ha escrito su biografía aún.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Biografía encontrada: Desarrollador apasionado por Kotlin y Android.\nTiene 44 caracteres.",
        "byteTip": "El Smart Cast solo funciona con variables val inmutables o variables locales donde Kotlin puede garantizar que nadie cambió el valor entre la comprobación y el uso.",
        "pitfallTip": "Si intentas hacer Smart Cast sobre una propiedad var mutable de una clase, Kotlin no lo permitirá porque otro hilo podría volverla null en cualquier instante.",
        "keyPoints": [
          "Smart Cast convierte automáticamente tipos T? a T dentro de bloques if (x != null).",
          "Elimina la necesidad de conversiones forzadas en tu código.",
          "Hace que el manejo de nulos se sienta completamente natural y fluido."
        ]
      },
      {
        "title": "Retornos tempranos con guardias (Guard clauses)",
        "explanation": "Una técnica profesional muy utilizada en Android es verificar nulos al inicio de una función y salir de inmediato si el dato falta:",
        "codeSnippet": "fun procesarFoto(urlFoto: String?) {\n    if (urlFoto == null) {\n        println(\"Aviso: No se proporcionó foto. Mostrando avatar predeterminado.\")\n        return\n    }\n    \n    // A partir de aquí, urlFoto es automáticamente String no anulable\n    println(\"Descargando imagen en alta resolución desde: $urlFoto\")\n}\n\nfun main() {\n    procesarFoto(null)\n    procesarFoto(\"https://servidor.com/avatar.jpg\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Aviso: No se proporcionó foto. Mostrando avatar predeterminado.\nDescargando imagen en alta resolución desde: https://servidor.com/avatar.jpg",
        "byteTip": "Los retornos tempranos (return rápido al validar nulo) evitan anidar el código principal dentro de bloques if profundos.",
        "pitfallTip": "No dejes ramas sin retorno si el resto del código asume que el dato siempre está presente.",
        "keyPoints": [
          "Las guardias con if (x == null) return limpian el flujo de las funciones.",
          "El código principal queda plano y cómodo de leer.",
          "Smart Cast se aplica a todo el resto de la función tras el return."
        ]
      }
    ]
  },
  "kotlin-u07-l06": {
    "id": "kt-th-u07-l06",
    "lessonId": "kotlin-u07-l06",
    "pathId": "kotlin",
    "unitId": 7,
    "levelId": 6,
    "title": "6. Acceso seguro ?. y operador Elvis ?:",
    "subtitle": "Escribe código ultra-limpio con la llamada segura (?.) y el operador Elvis (?:) para valores por defecto.",
    "estimatedMinutes": 8,
    "analogy": "El operador Elvis ?: es como llevar una llanta de repuesto en la cajuela: si tu llanta principal funciona, la usas; pero si se desinfla por completo (null), usas la de repuesto para seguir tu camino sin detenerte.",
    "video": {
      "title": "Null Safety y Conversiones Seguras en Kotlin",
      "channel": "AristiDevs",
      "duration": "38:20",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Tipos anulables (?), operador Elvis (?:), llamada segura (?.) y evitar NullPointerException."
    },
    "sections": [
      {
        "title": "La llamada segura (?.) y el operador Elvis (?:)",
        "explanation": "Escribir bloques `if (variable != null)` por todas partes puede volverse tedioso. Por eso, Kotlin ofrece dos operadores súper elegantes que todo desarrollador de Android adora:\n\n1. **Llamada segura (`?.`):**\nEjecuta el método o propiedad **solo si la variable no es nula**. Si es `null`, no causa ningún error, simplemente devuelve `null` de forma segura.\n`val longitud = nombre?.length`\n\n2. **Operador Elvis (`?:`):**\n(Se llama así porque si lo giras de lado, `?:` parece el peinado con tupé de Elvis Presley).\nTe permite definir un **valor de respaldo por defecto** en caso de que la expresión izquierda sea `null`:\n`val nombreFinal = nombreUsuario ?: \"Invitado\"`",
        "codeSnippet": "fun main() {\n    val apodo: String? = null\n\n    // 1. Llamada segura (?.)\n    println(\"Longitud del apodo: ${apodo?.length}\") // Imprime null sin crash\n\n    // 2. Operador Elvis (?:) para valor por defecto\n    val nombreAMostrar = apodo ?: \"Anónimo\"\n    println(\"Bienvenido, $nombreAMostrar!\")\n\n    // Combinando ambos operadores juntos:\n    val cantidadLetras = apodo?.length ?: 0\n    println(\"Letras contadas: $cantidadLetras\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Longitud del apodo: null\nBienvenido, Anónimo!\nLetras contadas: 0",
        "byteTip": "apodo?.length ?: 0 es una de las frases más comunes en Kotlin: intenta leer la longitud, y si es null, usa 0.",
        "pitfallTip": "No uses Elvis si el valor null representa un estado crítico que requiere detener el proceso y alertar al usuario.",
        "keyPoints": [
          "?. ejecuta la llamada solo si el objeto no es nulo; de lo contrario devuelve null.",
          "?: entrega un valor de respaldo si el resultado izquierdo es null.",
          "Juntos permiten escribir código conciso, seguro y libre de excepciones."
        ]
      },
      {
        "title": "Cadenas de llamadas seguras",
        "explanation": "Imagina consultar la ciudad de un usuario donde el usuario puede ser nulo, o su dirección puede ser nula. En otros lenguajes tendrías 3 `if` anidados; en Kotlin se resuelve en una sola línea fluida:",
        "codeSnippet": "fun main() {\n    val codigoPostal: String? = null\n    val zona = codigoPostal?.substring(0, 2) ?: \"Zona General\"\n\n    println(\"Asignación de logística: $zona\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Asignación de logística: Zona General",
        "byteTip": "Puedes encadenar múltiples llamadas seguras: usuario?.direccion?.ciudad?.nombre ?: \"Sin ciudad\".",
        "pitfallTip": "Asegúrate de que el valor a la derecha del operador Elvis sea del mismo tipo esperado por la variable.",
        "keyPoints": [
          "Las llamadas seguras encadenadas evitan verificaciones piramidales.",
          "El operador Elvis actúa al final de toda la cadena si cualquiera fue null.",
          "Es el estándar indiscutible en desarrollo con Kotlin y Android Jetpack."
        ]
      }
    ]
  },
  "kotlin-u07-l07": {
    "id": "kt-th-u07-l07",
    "lessonId": "kotlin-u07-l07",
    "pathId": "kotlin",
    "unitId": 7,
    "levelId": 7,
    "title": "7. Riesgos de usar !!",
    "subtitle": "Comprende el operador de aserción no nula (!!) y por qué debes evitarlo a toda costa.",
    "estimatedMinutes": 8,
    "analogy": "El operador !! es como conducir a 180 km/h con los ojos vendados diciendo \"estoy 100% seguro de que no hay ningún obstáculo en la carretera\". Si llega a haber una piedra (null), el choque es inevitable y destructivo.",
    "video": {
      "title": "Null Safety y Conversiones Seguras en Kotlin",
      "channel": "AristiDevs",
      "duration": "38:20",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Tipos anulables (?), operador Elvis (?:), llamada segura (?.) y evitar NullPointerException."
    },
    "sections": [
      {
        "title": "El operador de aserción no nula (!!)",
        "explanation": "Kotlin incluye un operador de dos signos de exclamación: **`!!`**.\n\n¿Qué hace?\nConvierte a la fuerza cualquier tipo anulable (`String?`) en un tipo no anulable (`String`).\nBásicamente le estás diciendo al compilador: *\"Confía ciegamente en mí, juro solemnemente que esta variable jamás será null; si me equivoco, deja que la app se caiga\"*.\n\nSi la variable llega a valer `null` en el momento de ejecutar esa línea, el programa lanzará de inmediato un **`NullPointerException` catastrófico**.",
        "codeSnippet": "fun main() {\n    val textoSeguro: String? = \"Kotlin Oficial\"\n    \n    // Usamos !! porque estamos seguros en este momento\n    val longitud = textoSeguro!!.length\n    println(\"Longitud forzada: $longitud\")\n\n    // Si hicieras esto con un valor null:\n    // val textoNulo: String? = null\n    // println(textoNulo!!.length) -> ¡CRASH! NullPointerException garantizado\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Longitud forzada: 14",
        "byteTip": "En la comunidad de Android se le conoce coloquialmente a !! como \"el operador bomba\". Trata su uso como un pecado capital.",
        "pitfallTip": "Casi el 100% de las veces que sientes tentación de usar !!, puedes reemplazarlo por ?. con ?: o por un if (x != null).",
        "keyPoints": [
          "!! desactiva las protecciones del compilador y asume que el valor no es nulo.",
          "Si el valor es null en ejecución, la app se caerá con un NullPointerException.",
          "La regla de oro oficial de Android: evita el uso de !! en código de producción."
        ]
      },
      {
        "title": "Alternativas seguras a la aserción forzada",
        "explanation": "Siempre existe una alternativa segura, profesional y elegante antes de recurrir a `!!`:",
        "codeSnippet": "fun main() {\n    val entradaOpcional: String? = null\n\n    // FORMA INSEGURA (EVITAR):\n    // val resultado = entradaOpcional!!.uppercase()\n\n    // FORMA SEGURA RECOMENDADA:\n    val resultadoSeguro = entradaOpcional?.uppercase() ?: \"VALOR PREDETERMINADO\"\n    println(\"Resultado profesional: $resultadoSeguro\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Resultado profesional: VALOR PREDETERMINADO",
        "byteTip": "Solo se acepta usar !! en pruebas unitarias automáticas donde justamente deseas que el test falle si un dato esperado vino nulo.",
        "pitfallTip": "Muchas empresas tienen reglas en sus linters que prohíben subir código al repositorio si contiene el operador !!.",
        "keyPoints": [
          "Reemplaza siempre !! por llamadas seguras (?.) y operador Elvis (?:).",
          "Los linters y analizadores de código señalan !! como mala práctica.",
          "La seguridad contra nulos de Kotlin solo funciona si respetas sus herramientas."
        ]
      }
    ]
  }
};
