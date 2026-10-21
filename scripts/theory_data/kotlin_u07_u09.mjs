// Módulo de teoría enriquecida para Kotlin: Unidades 7, 8 y 9
// Redactado en español latinoamericano (es-419) con tono claro, amigable y pedagógico
// Siguiendo los estándares oficiales de Android Developers (https://developer.android.com/kotlin/learn)

export const KOTLIN_THEORY_U07_U09 = {
  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 7: CONVERSIONES Y VALORES NULOS (NULL SAFETY)
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u07-l01': {
    subtitle: 'Comprende la diferencia fundamental entre el texto que representa un número y el valor numérico en memoria.',
    analogy: 'Una foto de una manzana impresa en un papel frente a una manzana real en tu mano. Puedes mirar la foto, pero solo puedes comerte la manzana real. De igual forma, no puedes hacer cálculos matemáticos con un texto sin antes convertirlo a un número.',
    sections: [
      {
        title: 'Texto numérico frente a valor numérico',
        explanation: `Uno de los conceptos que más confunde al iniciar es que para la computadora, el texto \`"25"\` (un \`String\`) y el número \`25\` (un \`Int\`) son animales completamente diferentes:

• **\`String\` (\`"25"\`):** Es una secuencia de dos símbolos gráficos (el carácter '2' y el carácter '5'). Si sumas dos textos con \`+\`, se pegan (*concatenación*): \`"25" + "10"\` produce \`"2510"\`.
• **\`Int\` (\`25\`):** Es una magnitud binaria matemática guardada en la memoria. Si sumas dos números: \`25 + 10\` produce \`35\`.

En Android, casi todas las entradas que el usuario digita en un formulario llegan como texto. Para operar con ellas, debemos convertirlas a valores numéricos reales.`,
        codeSnippet: `fun main() {\n    val textoA = "50"\n    val textoB = "20"\n    \n    // Suma de Strings: se concatenan los textos\n    println("Concatenación de texto : \${textoA + textoB}")\n\n    // Convertimos explícitamente a números antes de sumar\n    val numA = textoA.toInt()\n    val numB = textoB.toInt()\n    println("Suma matemática real : \${numA + numB}")\n}`,
        outputSnippet: `Concatenación de texto : 5020\nSuma matemática real : 70`,
        byteTip: 'Usa .toInt() o .toDouble() cuando necesites realizar cálculos matemáticos con datos recibidos de la interfaz de usuario.',
        pitfallTip: 'Si intentas hacer .toInt() sobre un texto que contiene letras (como "50a"), tu programa se detendrá con un error. Por eso existen métodos seguros como toIntOrNull().',
        keyPoints: [
          '"10" es un texto; 10 es un valor numérico operable.',
          '+ entre textos concatena; + entre números suma matemáticamente.',
          'La conversión explícita es el puente entre lo que el usuario escribe y los cálculos del sistema.'
        ]
      },
      {
        title: 'Entradas de usuario en interfaces móviles',
        explanation: `Mira lo que ocurre al calcular el precio total cuando un usuario escribe cantidades en una app de compras:`,
        codeSnippet: `fun main() {\n    val textoPrecio = "129.99"\n    val textoCantidad = "3"\n\n    val precio = textoPrecio.toDouble()\n    val cantidad = textoCantidad.toInt()\n    val subtotal = precio * cantidad\n\n    println("Calculado: $cantidad unidades a $$precio = $$subtotal")\n}`,
        outputSnippet: `Calculado: 3 unidades a $129.99 = $389.97`,
        byteTip: 'El método .toDouble() maneja decimales y respeta el punto como separador numérico estándar.',
        pitfallTip: 'Cuidado con las comas en lugar de puntos (como "129,99"). En Kotlin estándar, los decimales usan punto.',
        keyPoints: [
          'toDouble() convierte cadenas a punto flotante.',
          'toInt() convierte cadenas a números enteros.',
          'Ambos son vitales para procesar compras y formularios en apps Android.'
        ]
      }
    ]
  },

  'kotlin-u07-l02': {
    subtitle: 'Convierte textos a números sin miedo a que tu app se caiga gracias a toIntOrNull() y toDoubleOrNull().',
    analogy: 'Un inspector de boletos: si le entregas un boleto válido, te deja pasar con tu número de asiento; si le entregas un envoltorio de dulce arrugado, no se desmaya ni rompe el teatro, simplemente te dice con calma "esto no es un boleto" (null).',
    sections: [
      {
        title: 'Conversión segura con toIntOrNull()',
        explanation: `Si usas \`.toInt()\` sobre un texto inválido (como \`"veinte"\` o \`""\` vacío), Kotlin lanzará una excepción que cerrará la aplicación de golpe.

Para evitar esto, Kotlin incluye métodos seguros como **\`toIntOrNull()\`** y **\`toDoubleOrNull()\`**:
• Si el texto es un número válido (ej: \`"42"\`), devuelve el número: \`42\`.
• Si el texto contiene letras, símbolos o está vacío (ej: \`"abc"\`), **no provoca ningún error**, sino que devuelve pacíficamente un valor especial: **\`null\`** (ausencia de valor).`,
        codeSnippet: `fun main() {\n    val entradaValida = "150"\n    val entradaInvalida = "cien_pesos"\n\n    val numero1 = entradaValida.toIntOrNull()\n    val numero2 = entradaInvalida.toIntOrNull()\n\n    println("Resultado 1: $numero1 (conversión exitosa)")\n    println("Resultado 2: $numero2 (evitó el cierre de la app)")\n}`,
        outputSnippet: `Resultado 1: 150 (conversión exitosa)\nResultado 2: null (evitó el cierre de la app)`,
        byteTip: 'toIntOrNull() devuelve un tipo Int? (un entero anulable). Requiere que manejes el caso en que sea null.',
        pitfallTip: 'No uses .toInt() a secas cuando leas datos introducidos por usuarios reales. Los usuarios cometen errores tipográficos todo el tiempo.',
        keyPoints: [
          'toIntOrNull() y toDoubleOrNull() convierten cadenas sin riesgo de crash.',
          'Devuelven null cuando la entrada no puede interpretarse como número.',
          'Es la práctica recomendada oficial en Android para validar formularios.'
        ]
      },
      {
        title: 'Manejo defensivo de entradas con if',
        explanation: `Al verificar si el resultado de la conversión es \`null\`, puedes avisarle amablemente al usuario qué corregir:`,
        codeSnippet: `fun main() {\n    val entradaUsuario = "35"\n    val edad = entradaUsuario.toIntOrNull()\n\n    if (edad != null) {\n        println("Edad validada correctamente: $edad años.")\n    } else {\n        println("Error: Por favor escribe un número válido.")\n    }\n}`,
        outputSnippet: `Edad validada correctamente: 35 años.`,
        byteTip: 'Cuando Kotlin ve que comprobaste edad != null dentro de un if, automáticamente te permite usar edad como un Int normal (Smart Cast).',
        pitfallTip: 'Omitir la comprobación de null antes de intentar operar con un tipo Int? provocará un error de compilación.',
        keyPoints: [
          'Comprobar if (variable != null) protege la ejecución de tu lógica.',
          'El compilador de Kotlin recuerda que ya verificaste que no es nulo.',
          'La programación defensiva previene el 99% de los bugs en producción.'
        ]
      }
    ]
  },

  'kotlin-u07-l03': {
    subtitle: 'Comprende qué significa null y por qué es el famoso "error del millón de dólares" en informática.',
    analogy: 'Imagina una caja de regalo: una caja con un reloj adentro contiene un objeto. Una caja vacía no contiene nada (está vacía). Pero null es ni siquiera tener la caja en tus manos: intentas abrir algo que no existe y te caes al vacío.',
    sections: [
      {
        title: '¿Qué es null y por qué es tan peligroso?',
        explanation: `En programación, **\`null\`** representa la **ausencia total de valor**. Significa que una variable no apunta a ningún objeto en la memoria.

En la década de 1960, el científico de la computación Sir Tony Hoare inventó el concepto de referencia nula y más tarde lo bautizó como su *"error del billón de dólares"*:
En casi todos los lenguajes tradicionales (como Java, C o JavaScript), si intentas llamar a un método sobre una variable que vale \`null\` (por ejemplo: \`usuario.nombre\`), el programa se detiene violentamente con el temido error **\`NullPointerException\` (NPE)**.

Kotlin fue diseñado específicamente con **Null Safety** (seguridad contra nulos) integrado en el corazón del lenguaje para erradicar este problema para siempre.`,
        codeSnippet: `fun main() {\n    // En Kotlin, las variables comunes NO pueden ser nulas por defecto\n    val nombre: String = "Sofía"\n    println("Longitud del nombre: \${nombre.length} caracteres.")\n\n    // nombre = null -> ¡ERROR de compilación inmediato!\n    // Kotlin no te deja compilar código que pueda causar un NullPointerException accidental.\n}`,
        outputSnippet: `Longitud del nombre: 5 caracteres.`,
        byteTip: 'En Kotlin, una variable no anulable te da la garantía matemática absoluta de que jamás será null en ningún momento.',
        pitfallTip: 'En lenguajes como Java, cualquier variable puede ser null sin avisarte. En Kotlin debes pedir permiso explícito.',
        keyPoints: [
          'null representa la ausencia de un objeto en memoria.',
          'El NullPointerException es la causa número uno de caídas en apps tradicionales.',
          'Kotlin fue diseñado desde cero para prevenir errores por nulos en tiempo de compilación.'
        ]
      },
      {
        title: 'El sistema de tipos no anulables por defecto',
        explanation: `La genialidad de Kotlin radica en una regla simple: **por defecto, ningún tipo de dato acepta null**.

Si declaras:
\`val ciudad: String = "Lima"\`
El compilador te garantiza al 100% que la variable \`ciudad\` siempre tendrá un texto válido. Puedes llamar a todos sus métodos (\`.length\`, \`.uppercase()\`) con total tranquilidad y cero riesgo de caídas.`,
        codeSnippet: `fun main() {\n    val correo: String = "contacto@empresa.com"\n    println("Dominio del correo: \${correo.substringAfter('@')}")\n}`,
        outputSnippet: `Dominio del correo: empresa.com`,
        byteTip: "substringAfter('@') extrae todo el texto ubicado después del carácter @ de forma limpia.",
        pitfallTip: 'No intentes forzar null en tipos regulares; el compilador no te dejará pasar.',
        keyPoints: [
          'Por defecto, los tipos en Kotlin son no anulables (Non-nullable types).',
          'Puedes llamar a métodos con total seguridad sin envolver todo en comprobaciones manuales.',
          'Esta característica hace que las apps escritas en Kotlin sean infinitamente más estables.'
        ]
      }
    ]
  },

  'kotlin-u07-l04': {
    subtitle: 'Declara variables que pueden contener null de forma controlada usando el operador de interrogación (?).',
    analogy: 'Un formulario donde el teléfono fijo es opcional: quien lo tiene lo anota (valor String), y quien no lo tiene deja la casilla en blanco (null). El signo ? le advierte al sistema que ese campo puede venir vacío.',
    sections: [
      {
        title: 'Tipos anulables con el operador de interrogación (?)',
        explanation: `En situaciones reales de software, la ausencia de valor es a veces legítima:
• Un usuario puede no tener una foto de perfil asignada aún.
• El segundo apellido puede ser opcional en un registro.
• Una consulta a internet puede no encontrar resultados.

Para permitir que una variable acepte \`null\` de forma explícita y segura, agregamos un **signo de interrogación (\`?\`)** al final de su tipo:
• \`String\` -> Nunca puede ser \`null\`.
• **\`String?\`** -> Puede contener un texto válido **O** puede ser \`null\`.`,
        codeSnippet: `fun main() {\n    // Tipo no anulable (no acepta null)\n    val nombreObligatorio: String = "Alejandro"\n\n    // Tipo anulable con ? (acepta null de forma legal)\n    var apodoOpcional: String? = null\n    println("Nombre: $nombreObligatorio | Apodo inicial: $apodoOpcional")\n\n    apodoOpcional = "Alex"\n    println("Nombre: $nombreObligatorio | Apodo asignado: $apodoOpcional")\n}`,
        outputSnippet: `Nombre: Alejandro | Apodo inicial: null\nNombre: Alejandro | Apodo asignado: Alex`,
        byteTip: 'Kotlin trata a String y a String? como dos tipos de datos completamente distintos. No te dejará mezclarlos sin validación previa.',
        pitfallTip: 'Si tienes una variable String?, Kotlin no te dejará llamar directamente a .length porque podría ser null y causar un crash.',
        keyPoints: [
          'El signo ? después del tipo habilita la capacidad de almacenar null.',
          'Permite modelar datos opcionales de la vida real con total transparencia.',
          'El compilador te obliga a verificar la variable antes de acceder a sus propiedades.'
        ]
      },
      {
        title: 'Protección en tiempo de compilación',
        explanation: `Mira lo que hace el compilador si intentas acceder a una propiedad de un tipo anulable sin protección:
\`val telefono: String? = null\`
\`println(telefono.length) // ¡ERROR de compilación!\`

Kotlin te detiene y te dice: *"Oye, teléfono podría ser null, debes verificarlo primero antes de pedir su longitud"*. En la siguiente lección aprenderás las dos formas más elegantes de hacerlo.`,
        codeSnippet: `fun main() {\n    val direccionSecundaria: String? = null\n    println("¿Tiene dirección secundaria registrada?: \${direccionSecundaria != null}")\n}`,
        outputSnippet: `¿Tiene dirección secundaria registrada?: false`,
        byteTip: 'Comparar con != null es la forma más directa de saber si un dato opcional está presente.',
        pitfallTip: 'No uses tipos anulables (?) por capricho. Si un dato es obligatorio en tu sistema, usa un tipo no anulable estricto.',
        keyPoints: [
          'El compilador bloquea accesos directos inseguros sobre tipos con ?.',
          'Te obliga a decidir conscientemente qué hacer si el dato es nulo.',
          'Garantiza que ningún NullPointerException llegue a los usuarios en producción.'
        ]
      }
    ]
  },

  'kotlin-u07-l05': {
    subtitle: 'Aprende cómo el compilador de Kotlin convierte tipos anulables en seguros automáticamente con Smart Cast.',
    analogy: 'Un guardia de seguridad que revisa tu boleto en la entrada: una vez que comprueba que tu boleto es auténtico (if boleto != null), te deja pasar al área VIP sin volverte a pedir el boleto a cada paso.',
    sections: [
      {
        title: 'Comprobación de nulos y Smart Cast',
        explanation: `La forma más intuitiva de manejar una variable anulable (\`String?\`) es revisarla con un simple \`if (variable != null)\`.

Lo maravilloso de Kotlin es lo que ocurre adentro de ese \`if\`: **Smart Cast (Conversión Inteligente)**.
El compilador recuerda que ya verificaste que no es nula, y dentro de las llaves del \`if\` transforma automáticamente la variable de \`String?\` a \`String\` normal. ¡Ya no tienes que hacer ninguna conversión manual!`,
        codeSnippet: `fun main() {\n    val biografiaUsuario: String? = "Desarrollador apasionado por Kotlin y Android."\n\n    // Fuera del if, biografiaUsuario es String? (anulable)\n    if (biografiaUsuario != null) {\n        // Adentro del if, ¡Kotlin aplica Smart Cast a String no anulable!\n        println("Biografía encontrada: $biografiaUsuario")\n        println("Tiene \${biografiaUsuario.length} caracteres.")\n    } else {\n        println("El usuario no ha escrito su biografía aún.")\n    }\n}`,
        outputSnippet: `Biografía encontrada: Desarrollador apasionado por Kotlin y Android.\nTiene 44 caracteres.`,
        byteTip: 'El Smart Cast solo funciona con variables val inmutables o variables locales donde Kotlin puede garantizar que nadie cambió el valor entre la comprobación y el uso.',
        pitfallTip: 'Si intentas hacer Smart Cast sobre una propiedad var mutable de una clase, Kotlin no lo permitirá porque otro hilo podría volverla null en cualquier instante.',
        keyPoints: [
          'Smart Cast convierte automáticamente tipos T? a T dentro de bloques if (x != null).',
          'Elimina la necesidad de conversiones forzadas en tu código.',
          'Hace que el manejo de nulos se sienta completamente natural y fluido.'
        ]
      },
      {
        title: 'Retornos tempranos con guardias (Guard clauses)',
        explanation: `Una técnica profesional muy utilizada en Android es verificar nulos al inicio de una función y salir de inmediato si el dato falta:`,
        codeSnippet: `fun procesarFoto(urlFoto: String?) {\n    if (urlFoto == null) {\n        println("Aviso: No se proporcionó foto. Mostrando avatar predeterminado.")\n        return\n    }\n    \n    // A partir de aquí, urlFoto es automáticamente String no anulable\n    println("Descargando imagen en alta resolución desde: $urlFoto")\n}\n\nfun main() {\n    procesarFoto(null)\n    procesarFoto("https://servidor.com/avatar.jpg")\n}`,
        outputSnippet: `Aviso: No se proporcionó foto. Mostrando avatar predeterminado.\nDescargando imagen en alta resolución desde: https://servidor.com/avatar.jpg`,
        byteTip: 'Los retornos tempranos (return rápido al validar nulo) evitan anidar el código principal dentro de bloques if profundos.',
        pitfallTip: 'No dejes ramas sin retorno si el resto del código asume que el dato siempre está presente.',
        keyPoints: [
          'Las guardias con if (x == null) return limpian el flujo de las funciones.',
          'El código principal queda plano y cómodo de leer.',
          'Smart Cast se aplica a todo el resto de la función tras el return.'
        ]
      }
    ]
  },

  'kotlin-u07-l06': {
    subtitle: 'Escribe código ultra-limpio con la llamada segura (?.) y el operador Elvis (?:) para valores por defecto.',
    analogy: 'El operador Elvis ?: es como llevar una llanta de repuesto en la cajuela: si tu llanta principal funciona, la usas; pero si se desinfla por completo (null), usas la de repuesto para seguir tu camino sin detenerte.',
    sections: [
      {
        title: 'La llamada segura (?.) y el operador Elvis (?:)',
        explanation: `Escribir bloques \`if (variable != null)\` por todas partes puede volverse tedioso. Por eso, Kotlin ofrece dos operadores súper elegantes que todo desarrollador de Android adora:

1. **Llamada segura (\`?.\`):**
Ejecuta el método o propiedad **solo si la variable no es nula**. Si es \`null\`, no causa ningún error, simplemente devuelve \`null\` de forma segura.
\`val longitud = nombre?.length\`

2. **Operador Elvis (\`?:\`):**
(Se llama así porque si lo giras de lado, \`?:\` parece el peinado con tupé de Elvis Presley).
Te permite definir un **valor de respaldo por defecto** en caso de que la expresión izquierda sea \`null\`:
\`val nombreFinal = nombreUsuario ?: "Invitado"\``,
        codeSnippet: `fun main() {\n    val apodo: String? = null\n\n    // 1. Llamada segura (?.)\n    println("Longitud del apodo: \${apodo?.length}") // Imprime null sin crash\n\n    // 2. Operador Elvis (?:) para valor por defecto\n    val nombreAMostrar = apodo ?: "Anónimo"\n    println("Bienvenido, $nombreAMostrar!")\n\n    // Combinando ambos operadores juntos:\n    val cantidadLetras = apodo?.length ?: 0\n    println("Letras contadas: $cantidadLetras")\n}`,
        outputSnippet: `Longitud del apodo: null\nBienvenido, Anónimo!\nLetras contadas: 0`,
        byteTip: 'apodo?.length ?: 0 es una de las frases más comunes en Kotlin: intenta leer la longitud, y si es null, usa 0.',
        pitfallTip: 'No uses Elvis si el valor null representa un estado crítico que requiere detener el proceso y alertar al usuario.',
        keyPoints: [
          '?. ejecuta la llamada solo si el objeto no es nulo; de lo contrario devuelve null.',
          '?: entrega un valor de respaldo si el resultado izquierdo es null.',
          'Juntos permiten escribir código conciso, seguro y libre de excepciones.'
        ]
      },
      {
        title: 'Cadenas de llamadas seguras',
        explanation: `Imagina consultar la ciudad de un usuario donde el usuario puede ser nulo, o su dirección puede ser nula. En otros lenguajes tendrías 3 \`if\` anidados; en Kotlin se resuelve en una sola línea fluida:`,
        codeSnippet: `fun main() {\n    val codigoPostal: String? = null\n    val zona = codigoPostal?.substring(0, 2) ?: "Zona General"\n\n    println("Asignación de logística: $zona")\n}`,
        outputSnippet: `Asignación de logística: Zona General`,
        byteTip: 'Puedes encadenar múltiples llamadas seguras: usuario?.direccion?.ciudad?.nombre ?: "Sin ciudad".',
        pitfallTip: 'Asegúrate de que el valor a la derecha del operador Elvis sea del mismo tipo esperado por la variable.',
        keyPoints: [
          'Las llamadas seguras encadenadas evitan verificaciones piramidales.',
          'El operador Elvis actúa al final de toda la cadena si cualquiera fue null.',
          'Es el estándar indiscutible en desarrollo con Kotlin y Android Jetpack.'
        ]
      }
    ]
  },

  'kotlin-u07-l07': {
    subtitle: 'Comprende el operador de aserción no nula (!!) y por qué debes evitarlo a toda costa.',
    analogy: 'El operador !! es como conducir a 180 km/h con los ojos vendados diciendo "estoy 100% seguro de que no hay ningún obstáculo en la carretera". Si llega a haber una piedra (null), el choque es inevitable y destructivo.',
    sections: [
      {
        title: 'El operador de aserción no nula (!!)',
        explanation: `Kotlin incluye un operador de dos signos de exclamación: **\`!!\`**.

¿Qué hace?
Convierte a la fuerza cualquier tipo anulable (\`String?\`) en un tipo no anulable (\`String\`).
Básicamente le estás diciendo al compilador: *"Confía ciegamente en mí, juro solemnemente que esta variable jamás será null; si me equivoco, deja que la app se caiga"*.

Si la variable llega a valer \`null\` en el momento de ejecutar esa línea, el programa lanzará de inmediato un **\`NullPointerException\` catastrófico**.`,
        codeSnippet: `fun main() {\n    val textoSeguro: String? = "Kotlin Oficial"\n    \n    // Usamos !! porque estamos seguros en este momento\n    val longitud = textoSeguro!!.length\n    println("Longitud forzada: $longitud")\n\n    // Si hicieras esto con un valor null:\n    // val textoNulo: String? = null\n    // println(textoNulo!!.length) -> ¡CRASH! NullPointerException garantizado\n}`,
        outputSnippet: `Longitud forzada: 14`,
        byteTip: 'En la comunidad de Android se le conoce coloquialmente a !! como "el operador bomba". Trata su uso como un pecado capital.',
        pitfallTip: 'Casi el 100% de las veces que sientes tentación de usar !!, puedes reemplazarlo por ?. con ?: o por un if (x != null).',
        keyPoints: [
          '!! desactiva las protecciones del compilador y asume que el valor no es nulo.',
          'Si el valor es null en ejecución, la app se caerá con un NullPointerException.',
          'La regla de oro oficial de Android: evita el uso de !! en código de producción.'
        ]
      },
      {
        title: 'Alternativas seguras a la aserción forzada',
        explanation: `Siempre existe una alternativa segura, profesional y elegante antes de recurrir a \`!!\`:`,
        codeSnippet: `fun main() {\n    val entradaOpcional: String? = null\n\n    // FORMA INSEGURA (EVITAR):\n    // val resultado = entradaOpcional!!.uppercase()\n\n    // FORMA SEGURA RECOMENDADA:\n    val resultadoSeguro = entradaOpcional?.uppercase() ?: "VALOR PREDETERMINADO"\n    println("Resultado profesional: $resultadoSeguro")\n}`,
        outputSnippet: `Resultado profesional: VALOR PREDETERMINADO`,
        byteTip: 'Solo se acepta usar !! en pruebas unitarias automáticas donde justamente deseas que el test falle si un dato esperado vino nulo.',
        pitfallTip: 'Muchas empresas tienen reglas en sus linters que prohíben subir código al repositorio si contiene el operador !!.',
        keyPoints: [
          'Reemplaza siempre !! por llamadas seguras (?.) y operador Elvis (?:).',
          'Los linters y analizadores de código señalan !! como mala práctica.',
          'La seguridad contra nulos de Kotlin solo funciona si respetas sus herramientas.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 8: PROCESAMIENTO DE TEXTO (STRINGS)
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u08-l01': {
    subtitle: 'Aprende a medir textos con .length y acceder a caracteres individuales por su índice numérico.',
    analogy: 'Un tren con vagones numerados: el primer vagón es el 0, el segundo es el 1, el tercero es el 2. Cada vagón lleva una letra de la palabra.',
    sections: [
      {
        title: 'Longitud y acceso por índice en Strings',
        explanation: `En Kotlin, una cadena de texto (**\`String\`**) es una secuencia inmutable de caracteres (\`Char\`) ordenados.

Dos operaciones fundamentales sobre cualquier texto son:
1. **Conocer su longitud (\`.length\`):** Te dice cuántos caracteres tiene en total (incluyendo letras, números, símbolos y espacios).
2. **Acceder a una letra por su índice (\`[índice]\`):**
En informática, los índices siempre empiezan a contar en **cero (\`0\`)**:
• El primer carácter está en la posición \`0\`.
• El segundo en la posición \`1\`.
• El último carácter está en la posición \`length - 1\`.`,
        codeSnippet: `fun main() {\n    val lenguaje = "Kotlin"\n    \n    println("Palabra: $lenguaje")\n    println("Longitud total: \${lenguaje.length} caracteres")\n    println("Primer carácter (índice 0): \${lenguaje[0]}")\n    println("Tercer carácter (índice 2): \${lenguaje[2]}")\n    println("Último carácter con .last(): \${lenguaje.last()}")\n}`,
        outputSnippet: `Palabra: Kotlin\nLongitud total: 6 caracteres\nPrimer carácter (índice 0): K\nTercer carácter (índice 2): t\nÚltimo carácter con .last(): n`,
        byteTip: 'Kotlin incluye funciones expresivas como .first() y .last() para obtener la primera y última letra sin lidiar con números de índice.',
        pitfallTip: 'Intentar acceder a un índice igual o mayor a .length (como lenguaje[6] en "Kotlin") lanzará un IndexOutOfBoundsException.',
        keyPoints: [
          '.length entrega la cantidad total de caracteres.',
          'Los índices van desde 0 hasta length - 1.',
          '.first() y .last() simplifican el acceso a los extremos del texto.'
        ]
      },
      {
        title: 'Validación de longitud de contraseñas',
        explanation: `En cualquier app de registro, validar que la contraseña cumpla un mínimo de seguridad es una tarea elemental con \`.length\`:`,
        codeSnippet: `fun main() {\n    val contrasena = "secretoSeguro2024"\n    val longitudMinima = 8\n\n    if (contrasena.length >= longitudMinima) {\n        println("Contraseña válida: Cumple con el mínimo de $longitudMinima caracteres.")\n    } else {\n        println("Error: La contraseña es demasiado corta.")\n    }\n}`,
        outputSnippet: `Contraseña válida: Cumple con el mínimo de 8 caracteres.`,
        byteTip: 'Los espacios en blanco también cuentan para la longitud total de un String.',
        pitfallTip: 'No confíes solo en la longitud; en lecciones posteriores verás cómo buscar mayúsculas y números.',
        keyPoints: [
          '.length es una propiedad de solo lectura y acceso inmediato.',
          'Permite validar límites de texto en campos de entrada.',
          'Forma parte del núcleo estándar de la clase String de Kotlin.'
        ]
      }
    ]
  },

  'kotlin-u08-l02': {
    subtitle: 'Aprende la diferencia crucial entre un texto completamente vacío (.isEmpty()) y uno lleno de espacios (.isBlank()).',
    analogy: 'isEmpty() es como un plato sin comida (0 gramos). isBlank() es como un plato que solo tiene migajas invisibles o aire: parece que tiene algo porque alguien presionó la barra espaciadora, pero no alimenta a nadie.',
    sections: [
      {
        title: 'Texto vacío (.isEmpty) vs Texto en blanco (.isBlank)',
        explanation: `Uno de los errores más comunes al validar formularios es no distinguir entre dos estados sutiles pero muy diferentes:

• **\`.isEmpty()\` (Vacío exacto):** Devuelve \`true\` únicamente si la longitud del texto es estrictamente cero (\`""\`). Si el usuario escribe tres espacios (\`"   "\`), \`isEmpty()\` devolverá \`false\` porque su longitud es 3.
• **\`.isBlank()\` (En blanco / Sin contenido real):** Devuelve \`true\` si el texto está vacío **O** si solo contiene espacios en blanco, tabulaciones o saltos de línea (\`"   "\`).

En aplicaciones reales, **\`.isBlank()\` es casi siempre lo que realmente quieres usar** para evitar que los usuarios envíen nombres o mensajes compuestos solo por espacios.`,
        codeSnippet: `fun main() {\n    val textoConEspacios = "   "\n\n    println("¿Está vacío con .isEmpty()?: \${textoConEspacios.isEmpty()}")\n    println("¿Está en blanco con .isBlank()?: \${textoConEspacios.isBlank()}")\n\n    // También existen sus contrapartes positivas:\n    println("¿Tiene contenido real con .isNotBlank()?: \${textoConEspacios.isNotBlank()}")\n}`,
        outputSnippet: `¿Está vacío con .isEmpty()?: false\n¿Está en blanco con .isBlank()?: true\n¿Tiene contenido real con .isNotBlank()?: false`,
        byteTip: '.isNotBlank() es la forma más limpia y directa en Kotlin para verificar que un campo de texto contiene información auténtica.',
        pitfallTip: 'Usar isEmpty() para validar un campo obligatorio permitirá que un usuario tramposo presione la barra espaciadora y pase la validación.',
        keyPoints: [
          'isEmpty() verifica que length sea estrictamente 0.',
          'isBlank() verifica que no contenga ningún carácter visible.',
          'isNotBlank() es el método predilecto para validar formularios en Android.'
        ]
      },
      {
        title: 'Validación robusta de nombres en formularios',
        explanation: `Mira cómo garantizar que el usuario ingrese un nombre genuino antes de guardarlo en la base de datos:`,
        codeSnippet: `fun validarNombreUsuario(nombre: String): Boolean {\n    return nombre.isNotBlank() && nombre.length >= 3\n}\n\nfun main() {\n    println("Prueba 1 ('   '): \${validarNombreUsuario("   ")}")\n    println("Prueba 2 ('Jo'): \${validarNombreUsuario("Jo")}")\n    println("Prueba 3 ('Camila'): \${validarNombreUsuario("Camila")}")\n}`,
        outputSnippet: `Prueba 1 ('   '): false\nPrueba 2 ('Jo'): false\nPrueba 3 ('Camila'): true`,
        byteTip: 'Combinar isNotBlank() con una longitud mínima asegura datos de alta calidad desde el primer momento.',
        pitfallTip: 'No uses nombre == "" para validar; no detecta espacios en blanco.',
        keyPoints: [
          'La limpieza de datos al ingreso previene registros corruptos en bases de datos.',
          'isNotBlank() se encarga de espacios, tabulaciones y saltos de línea.',
          'El código de validación queda limpio, conciso y autoexplicativo.'
        ]
      }
    ]
  },

  'kotlin-u08-l03': {
    subtitle: 'Elimina espacios accidentales al inicio y al final de los textos con el método .trim().',
    analogy: 'Pasarle una podadora a un césped para cortar solo los bordes que sobresalen a los lados, dejando intacto el césped del medio.',
    sections: [
      {
        title: 'Limpieza de texto con .trim()',
        explanation: `Al escribir en el teclado de un teléfono, es sumamente común presionar accidentalmente la barra espaciadora antes o después de escribir un correo o nombre de usuario (\`"  carlos@gmail.com "\`).

Si guardas ese correo tal cual, fallará al intentar iniciar sesión porque el correo oficial no tiene esos espacios.

El método **\`.trim()\`**:
• Elimina todos los espacios en blanco sobrantes al inicio y al final de la cadena.
• **No toca los espacios intermedios** (por ejemplo, el espacio entre tu nombre y apellido se conserva intacto).
• Devuelve una nueva cadena limpia y sanitizada.`,
        codeSnippet: `fun main() {\n    val correoConEspacios = "   carlos.mendoza@empresa.com   "\n    \n    println("Texto original : '$correoConEspacios'")\n    \n    // Limpiamos los extremos con .trim()\n    val correoLimpio = correoConEspacios.trim()\n    println("Texto con trim() : '$correoLimpio'")\n    println("Longitud antes: \${correoConEspacios.length} -> después: \${correoLimpio.length}")\n}`,
        outputSnippet: `Texto original : '   carlos.mendoza@empresa.com   '\nTexto con trim() : 'carlos.mendoza@empresa.com'\nLongitud antes: 32 -> después: 26`,
        byteTip: 'También existen trimStart() y trimEnd() si solo deseas recortar un extremo específico del texto.',
        pitfallTip: 'Recuerda que los Strings en Kotlin son inmutables: correoConEspacios.trim() no modifica la variable original, devuelve una nueva limpia.',
        keyPoints: [
          '.trim() recorta espacios en blanco al inicio y al final.',
          'Conserva los espacios válidos entre palabras internas.',
          'Es una regla de higiene obligatoria en cualquier app antes de guardar o comparar datos.'
        ]
      },
      {
        title: 'Sanitización en flujos de autenticación',
        explanation: `Aplica siempre \`.trim()\` al recibir credenciales de login antes de compararlas con tu base de datos:`,
        codeSnippet: `fun main() {\n    val entradaTeclado = "  admin  "\n    val usuarioAlmacenado = "admin"\n\n    // Sin trim daría false por los espacios\n    val esValido = entradaTeclado.trim() == usuarioAlmacenado\n    println("¿Credencial correcta tras sanitizar?: $esValido")\n}`,
        outputSnippet: `¿Credencial correcta tras sanitizar?: true`,
        byteTip: 'Puedes encadenar métodos: entradaTeclado.trim().lowercase() para limpiar espacios y mayúsculas en un solo paso.',
        pitfallTip: 'No uses trim() sobre contraseñas si el usuario conscientemente decidió incluir espacios válidos dentro de su frase de contraseña.',
        keyPoints: [
          'La sanitización previene rechazos falsos en formularios de acceso.',
          'Encadenar métodos de texto es una práctica muy idiomática en Kotlin.',
          'Aumenta la satisfacción del usuario al tolerar toques accidentales de la barra espaciadora.'
        ]
      }
    ]
  },

  'kotlin-u08-l04': {
    subtitle: 'Normaliza textos transformándolos a mayúsculas con .uppercase() y minúsculas con .lowercase().',
    analogy: 'Un traductor universal que convierte todo a letra molde mayúscula para que no importe si alguien escribió "si", "Si" o "SI"; todos se leen idénticos como "SI".',
    sections: [
      {
        title: 'Transformación de mayúsculas y minúsculas',
        explanation: `En versiones modernas de Kotlin, los métodos oficiales para transformar texto son:

• **\`.uppercase()\`**: Convierte todos los caracteres de la cadena a mayúsculas.
• **\`.lowercase()\`**: Convierte todos los caracteres de la cadena a minúsculas.

¿Por qué es crucial?
Las comparaciones de texto en informática son estrictas. Para la máquina, \`"Android" == "android"\` es **\`false\`** porque la 'A' mayúscula tiene un código binario distinto a la 'a' minúscula.
Para comparar sin importar cómo lo escribió el usuario, normalizamos ambos textos al mismo caso antes de contrastar.`,
        codeSnippet: `fun main() {\n    val entrada1 = "KOTLIN"\n    val entrada2 = "kotlin"\n\n    println("Originales: $entrada1 frente a $entrada2")\n    println("¿Son iguales directamente?: \${entrada1 == entrada2}")\n\n    // Normalizamos ambas a minúsculas\n    val coinciden = entrada1.lowercase() == entrada2.lowercase()\n    println("¿Coinciden tras normalizar con .lowercase()?: $coinciden")\n}`,
        outputSnippet: `Originales: KOTLIN frente a kotlin\n¿Son iguales directamente?: false\n¿Coinciden tras normalizar con .lowercase()?: true`,
        byteTip: 'Usa uppercase() y lowercase() en lugar de los antiguos toUpperCase() y toLowerCase(), que ya están obsoletos en Kotlin moderno.',
        pitfallTip: 'Recuerda que estas funciones respetan caracteres especiales de otros idiomas si no se especifica el Locale.',
        keyPoints: [
          '.uppercase() y .lowercase() son los métodos modernos estándar.',
          'Permiten realizar comparaciones insensibles a mayúsculas de forma predecible.',
          'Normalizar correos y códigos de producto evita duplicados en bases de datos.'
        ]
      },
      {
        title: 'Comparación con ignoreCase',
        explanation: `Si solo quieres verificar si dos textos son iguales sin importar mayúsculas ni generar un nuevo String en memoria, usa \`.equals(otro, ignoreCase = true)\`:`,
        codeSnippet: `fun main() {\n    val comando = "SALIR"\n    \n    if (comando.equals("salir", ignoreCase = true)) {\n        println("Cerrando sesión de usuario de forma segura...")\n    }\n}`,
        outputSnippet: `Cerrando sesión de usuario de forma segura...`,
        byteTip: 'ignoreCase = true es más eficiente en memoria porque no crea un nuevo String intermedio.',
        pitfallTip: 'No uses ignoreCase para contraseñas; las contraseñas siempre deben distinguir mayúsculas de minúsculas por seguridad.',
        keyPoints: [
          '.equals(..., ignoreCase = true) compara sin distinguir mayúsculas.',
          'Ahorra asignaciones de memoria temporales.',
          'Ideal para comandos de texto, filtros de búsqueda y respuestas de confirmación.'
        ]
      }
    ]
  },

  'kotlin-u08-l05': {
    subtitle: 'Busca palabras y patrones con .contains(), .startsWith() y .endsWith().',
    analogy: 'Un perro rastreador de biblioteca: le pides que busque si un libro contiene cierta palabra en cualquier página (contains), si empieza con cierto título (startsWith) o si termina con cierta extensión de archivo como .pdf (endsWith).',
    sections: [
      {
        title: 'Búsquedas de subcadenas en texto',
        explanation: `Kotlin incluye tres métodos sumamente intuitivos para comprobar la presencia de texto:

• **\`.contains("subtexto")\`**: Devuelve \`true\` si el fragmento de texto aparece en cualquier posición de la cadena.
• **\`.startsWith("prefijo")\`**: Devuelve \`true\` si la cadena comienza exactamente con esas letras.
• **\`.endsWith("sufijo")\`**: Devuelve \`true\` si la cadena termina exactamente con esas letras.`,
        codeSnippet: `fun main() {\n    val urlWeb = "https://developer.android.com/kotlin"\n    val nombreArchivo = "reporte_financiero_2024.pdf"\n\n    println("¿Es un enlace seguro (https)?: \${urlWeb.startsWith("https://")}")\n    println("¿Contiene la palabra 'android'?: \${urlWeb.contains("android")}")\n    println("¿Es un documento en formato PDF?: \${nombreArchivo.endsWith(".pdf")}")\n}`,
        outputSnippet: `¿Es un enlace seguro (https)?: true\n¿Contiene la palabra 'android'?: true\n¿Es un documento en formato PDF?: true`,
        byteTip: 'contains() también admite ignoreCase = true: texto.contains("kotlin", ignoreCase = true).',
        pitfallTip: 'startsWith() y endsWith() respetan mayúsculas por defecto. Asegúrate de verificar "https://" y no "HTTPS://".',
        keyPoints: [
          'contains() inspecciona si un término existe en cualquier parte de la cadena.',
          'startsWith() valida protocolos, prefijos y códigos de país.',
          'endsWith() es ideal para validar extensiones de archivo (.png, .json, .pdf).'
        ]
      },
      {
        title: 'Filtro de búsqueda de productos en una app',
        explanation: `Mira cómo implementar el motor de búsqueda de un catálogo cuando un cliente escribe una palabra clave:`,
        codeSnippet: `fun main() {\n    val tituloProducto = "Auriculares Inalámbricos Bluetooth Pro"\n    val busquedaCliente = "bluetooth"\n\n    val coincide = tituloProducto.contains(busquedaCliente, ignoreCase = true)\n    println("¿El producto coincide con la búsqueda?: $coincide")\n}`,
        outputSnippet: `¿El producto coincide con la búsqueda?: true`,
        byteTip: 'El parámetro ignoreCase = true garantiza que los clientes encuentren productos sin importar cómo escriban en su teclado.',
        pitfallTip: 'Si busquedaCliente está vacía (""), contains() devolverá true para cualquier texto.',
        keyPoints: [
          'Las búsquedas con ignoreCase = true ofrecen una experiencia de usuario natural.',
          'Es el mecanismo básico detrás de barras de búsqueda y autocompletado.',
          'Permite filtrar listas completas con pocas líneas de código.'
        ]
      }
    ]
  },

  'kotlin-u08-l06': {
    subtitle: 'Divide oraciones en partes con .split() y reúne elementos en un solo texto con .joinToString().',
    analogy: '.split() es como cortar una barra de pan en rebanadas con un cuchillo en cada marca. .joinToString() es tomar esas rebanadas y unirlas de nuevo con mermelada entre ellas.',
    sections: [
      {
        title: 'Partición y unión de cadenas',
        explanation: `Frecuentemente recibimos datos empaquetados en un solo texto separados por comas, guiones o espacios (como un archivo CSV o una lista de etiquetas).

Kotlin nos da dos herramientas simétricas perfectas:
1. **\`.split(separador)\`**: Corta el texto en pedazos cada vez que encuentra el separador indicado y devuelve una lista (\`List<String>\`) con los fragmentos.
2. **\`.joinToString(separador)\`**: Toma una lista de elementos y los une en una sola cadena de texto continua, intercalando el separador que elijas.`,
        codeSnippet: `fun main() {\n    val etiquetasTexto = "kotlin,android,programacion,movil"\n    \n    // 1. Dividimos el texto en una lista usando la coma como separador\n    val listaEtiquetas = etiquetasTexto.split(",")\n    println("Lista de etiquetas: $listaEtiquetas")\n    println("Primera etiqueta: \${listaEtiquetas[0]}")\n\n    // 2. Unimos la lista con un separador visual agradable\n    val textoFormateado = listaEtiquetas.joinToString(separator = " • ") { "#\${it.uppercase()}" }\n    println("Formato para redes sociales: $textoFormateado")\n}`,
        outputSnippet: `Lista de etiquetas: [kotlin, android, programacion, movil]\nPrimera etiqueta: kotlin\nFormato para redes sociales: #KOTLIN • #ANDROID • #PROGRAMACION • #MOVIL`,
        byteTip: 'joinToString admite parámetros útiles como prefix, postfix y separator para armar reportes de un tirón.',
        pitfallTip: 'Si usas split("") con separador vacío, obtendrás una lista de caracteres individuales con elementos vacíos a los extremos.',
        keyPoints: [
          'split(separador) divide una cadena en una lista de fragmentos.',
          'joinToString() ensambla una colección en un solo texto legible.',
          'Son las herramientas estándar para procesar archivos CSV y formatos delimitados.'
        ]
      },
      {
        title: 'Procesar nombres completos',
        explanation: `Un caso práctico es separar el nombre y el apellido de una persona a partir de una sola casilla:`,
        codeSnippet: `fun main() {\n    val nombreCompleto = "Valeria Morales Gómez"\n    val partes = nombreCompleto.split(" ")\n\n    val primerNombre = partes[0]\n    val apellidoPaterno = partes[1]\n    \n    println("Nombre: $primerNombre | Apellido: $apellidoPaterno")\n}`,
        outputSnippet: `Nombre: Valeria | Apellido: Morales`,
        byteTip: 'Verifica siempre partes.size antes de acceder a índices para asegurarte de que el usuario escribió al menos dos palabras.',
        pitfallTip: 'Si el usuario escribe dos espacios seguidos entre nombres, split(" ") creará un elemento vacío intermedio.',
        keyPoints: [
          'split con espacio divide palabras individuales de un párrafo.',
          'Comprobar el tamaño de la lista resultante previene IndexOutOfBoundsException.',
          'Permite adaptar datos en bloque a estructuras de objetos.'
        ]
      }
    ]
  },

  'kotlin-u08-l07': {
    subtitle: 'Aprende a validar cadenas y proteger tu aplicación contra textos maliciosos o vacíos.',
    analogy: 'Un control de aduana en un aeropuerto: revisan que tu documento no esté en blanco, que no tenga caracteres prohibidos y que cumpla con el formato oficial antes de sellar tu entrada.',
    sections: [
      {
        title: 'Estrategias de validación y comparación de texto',
        explanation: `Validar cadenas de texto es el primer escudo de defensa de cualquier aplicación para evitar guardar basura en bases de datos o sufrir errores inesperados.

Una validación completa de texto suele comprobar tres aspectos en orden:
1. **Que no sea nulo ni esté en blanco:** Usando \`texto?.isNotBlank() == true\`.
2. **Que cumpla con límites de tamaño:** Para no saturar la base de datos (\`texto.length in 3..50\`).
3. **Que contenga o excluya ciertos patrones:** Por ejemplo, verificar que un correo incluya un arroba \`@\` y un punto \`.\`.`,
        codeSnippet: `fun validarCorreo(correo: String?): Boolean {\n    if (correo == null || correo.isBlank()) {\n        return false // Rechazado por nulo o vacío\n    }\n    val limpio = correo.trim()\n    return limpio.contains("@") && limpio.contains(".") && limpio.length >= 6\n}\n\nfun main() {\n    println("Valida 'ana@gmail.com' : \${validarCorreo("ana@gmail.com")}")\n    println("Valida 'correo_invalido' : \${validarCorreo("correo_invalido")}")\n    println("Valida null            : \${validarCorreo(null)}")\n}`,
        outputSnippet: `Valida 'ana@gmail.com' : true\nValida 'correo_invalido' : false\nValida null            : false`,
        byteTip: 'En producción puedes usar expresiones regulares (Regex) para validaciones de correos y teléfonos aún más rigurosas.',
        pitfallTip: 'No confíes nunca en las validaciones del lado del cliente como única defensa si tienes una API web en el servidor.',
        keyPoints: [
          'La validación escalonada verifica presencia, longitud y formato en orden.',
          'Retornar false temprano simplifica la lógica de verificación.',
          'Sanitizar con trim() antes de validar evita falsos rechazos.'
        ]
      },
      {
        title: 'Cadenas multilínea con triples comillas (""")',
        explanation: `Si necesitas redactar un correo largo, una consulta SQL o un documento JSON sin tener que llenar tu código de signos \`\\n\` o concatenaciones feas, usa **triples comillas (\`"""\`)**:`,
        codeSnippet: `fun main() {\n    val mensajeBienvenida = """\n        Estimado usuario,\n        Gracias por registrarte en nuestra plataforma.\n        Tu cuenta ha sido activada con éxito.\n    """.trimIndent()\n\n    println(mensajeBienvenida)\n}`,
        outputSnippet: `Estimado usuario,\nGracias por registrarte en nuestra plataforma.\nTu cuenta ha sido activada con éxito.`,
        byteTip: '.trimIndent() retira automáticamente el margen izquierdo sobrante para que el texto quede alineado.',
        pitfallTip: 'Dentro de triples comillas no puedes escapar caracteres con barra invertida (\\); para insertar un signo de dólar literal usa `${"$"}`.',
        keyPoints: [
          '""" permite redactar textos largos multilínea con formato visual directo.',
          '.trimIndent() normaliza el margen izquierdo del texto.',
          'Ideal para plantillas de correos, JSON y consultas SQL embebidas.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 9: COLECCIONES
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u09-l01': {
    subtitle: 'Almacena múltiples elementos ordenados en una lista y accede a ellos por su número de índice.',
    analogy: 'Un estuche de lápices de colores con ranuras numeradas: en la ranura 0 está el rojo, en la ranura 1 el azul y en la ranura 2 el verde.',
    sections: [
      {
        title: 'Introducción a las listas con listOf()',
        explanation: `Hasta ahora guardábamos un solo valor por variable (un nombre, una edad). Pero en cualquier aplicación real necesitas manejar grupos de elementos: la lista de contactos en WhatsApp, las canciones de una playlist o los productos en un carrito.

La colección más utilizada en Kotlin es la **Lista (\`List\`)**:
• Es una secuencia **ordenada** de elementos.
• Cada elemento ocupa una posición numérica llamada **índice**, empezando siempre en cero (\`0\`).
• Puede contener elementos repetidos.

Para crear una lista de solo lectura (inmutable), usamos la función **\`listOf()\`**:`,
        codeSnippet: `fun main() {\n    // Creamos una lista inmutable de nombres\n    val amigos = listOf("Sofía", "Mateo", "Valentina")\n\n    println("Lista completa: $amigos")\n    println("Cantidad de elementos (.size): \${amigos.size}")\n    println("Primer amigo (índice 0): \${amigos[0]}")\n    println("Segundo amigo (índice 1): \${amigos[1]}")\n    println("Último amigo con .last(): \${amigos.last()}")\n}`,
        outputSnippet: `Lista completa: [Sofía, Mateo, Valentina]\nCantidad de elementos (.size): 3\nPrimer amigo (índice 0): Sofía\nSegundo amigo (índice 1): Mateo\nÚltimo amigo con .last(): Valentina`,
        byteTip: 'El tamaño de una lista se consulta con la propiedad .size (a diferencia de los Strings que usan .length).',
        pitfallTip: 'Si intentas acceder a un índice que no existe (como amigos[5]), Kotlin lanzará un IndexOutOfBoundsException.',
        keyPoints: [
          'listOf() crea una lista ordenada e inmutable de elementos.',
          'El acceso por corchetes [índice] empieza en 0.',
          '.size devuelve la cantidad de elementos contenidos.'
        ]
      },
      {
        title: 'Seguridad con getOrNull()',
        explanation: `Para evitar caídas de la app al consultar un índice que tal vez no exista en la lista, Kotlin te ofrece el método seguro **\`.getOrNull(índice)\`**:`,
        codeSnippet: `fun main() {\n    val podio = listOf("Oro", "Plata", "Bronce")\n\n    // Índice seguro que existe\n    println("Primer puesto: \${podio.getOrNull(0)}")\n\n    // Índice fuera de rango: devuelve null en lugar de caerse\n    val cuartoPuesto = podio.getOrNull(3) ?: "Sin medalla de cuarto lugar"\n    println("Cuarto puesto: $cuartoPuesto")\n}`,
        outputSnippet: `Primer puesto: Oro\nCuarto puesto: Sin medalla de cuarto lugar`,
        byteTip: 'Combinar .getOrNull(índice) con el operador Elvis ?: es la forma más segura de consultar listas en Android.',
        pitfallTip: 'No uses [índice] directo si el número viene de una entrada externa no validada.',
        keyPoints: [
          '.getOrNull() previene excepciones por índice fuera de límites.',
          'Devuelve null pacíficamente si la posición no existe.',
          'Garantiza la estabilidad en listas de tamaño variable.'
        ]
      }
    ]
  },

  'kotlin-u09-l02': {
    subtitle: 'Comprende la diferencia clave entre una List inmutable de solo lectura y una MutableList modificable.',
    analogy: 'List es un libro impreso de una biblioteca: puedes leer todas sus páginas las veces que quieras, pero no puedes arrancar hojas ni escribir renglones nuevos. MutableList es una libreta de notas de espiral: puedes agregar hojas, tachar notas y cambiar páginas.',
    sections: [
      {
        title: 'List vs MutableList',
        explanation: `Al igual que con \`val\` y \`var\`, Kotlin divide sus colecciones en dos categorías estrictas por diseño:

1. **\`List\` (de solo lectura / inmutable):** Creada con \`listOf()\`. Una vez creada, **no puedes agregarle, quitarle ni modificarle elementos**. Solo permite lectura.
2. **\`MutableList\` (modificable):** Creada con **\`mutableListOf()\`**. Te permite agregar nuevos elementos con \`.add()\`, eliminarlos con \`.remove()\` y reordenarlos.

¿Por qué existe esta separación?
Para proteger tus datos: en una app Android, la interfaz visual debería solo leer listas para mostrarlas en pantalla, evitando que se alteren accidentalmente mientras se dibujan.`,
        codeSnippet: `fun main() {\n    // 1. Lista de solo lectura\n    val diasLaborales = listOf("Lunes", "Martes", "Miércoles")\n    // diasLaborales.add("Jueves") -> ¡ERROR de compilación! No existe .add() en List\n\n    // 2. Lista mutable modificable\n    val carritoCompras = mutableListOf("Leche", "Huevos")\n    println("Carrito inicial: $carritoCompras")\n\n    carritoCompras.add("Pan integral") // Agregamos un elemento\n    println("Carrito actualizado: $carritoCompras")\n}`,
        outputSnippet: `Carrito inicial: [Leche, Huevos]\nCarrito actualizado: [Leche, Huevos, Pan integral]`,
        byteTip: 'Puedes declarar una variable val con una lista mutableListOf(): val lista = mutableListOf(). La referencia de la caja es fija, pero el contenido interno sí puede cambiar.',
        pitfallTip: 'No uses MutableList por defecto para todo. Si la lista no va a cambiar tras su carga inicial, usa listOf().',
        keyPoints: [
          'List es de solo lectura; MutableList permite agregar y quitar elementos.',
          'listOf() crea listas inmutables seguras.',
          'mutableListOf() crea listas dinámicas para carritos, feeds y listas interactivas.'
        ]
      },
      {
        title: 'Conversión entre listas mutables e inmutables',
        explanation: `Puedes convertir fácilmente una lista de un tipo a otro según la etapa de tu aplicación:`,
        codeSnippet: `fun main() {\n    val editable = mutableListOf(1, 2, 3)\n    editable.add(4)\n\n    // La convertimos a una lista de solo lectura segura para compartir\n    val protegida = editable.toList()\n    println("Lista protegida final: $protegida")\n}`,
        outputSnippet: `Lista protegida final: [1, 2, 3, 4]`,
        byteTip: '.toList() crea una copia independiente de solo lectura. Modificar editable después no afectará a protegida.',
        pitfallTip: 'Cuidado con compartir MutableList entre diferentes pantallas; una pantalla podría borrar datos que otra pantalla todavía necesita.',
        keyPoints: [
          '.toList() convierte una lista mutable en una copia de solo lectura.',
          '.toMutableList() convierte una lista fija en una editable.',
          'Proteger las colecciones evita efectos secundarios entre pantallas.'
        ]
      }
    ]
  },

  'kotlin-u09-l03': {
    subtitle: 'Aprende a agregar, modificar y eliminar elementos de una MutableList con total control.',
    analogy: 'Gestionar una lista de compras en tu teléfono: agregas manzanas al final, cambias el tipo de leche por leche deslactosada y tachas los productos que ya metiste al carrito.',
    sections: [
      {
        title: 'Operaciones sobre MutableList',
        explanation: `Una vez creada una lista con \`mutableListOf()\`, tienes a tu disposición un conjunto de métodos para modificar su contenido:

• **\`.add(elemento)\`**: Agrega el nuevo elemento al final de la lista.
• **\`.add(índice, elemento)\`**: Inserta el elemento en una posición específica, empujando a los demás hacia la derecha.
• **\`.remove(elemento)\`**: Busca el elemento por su valor y lo elimina.
• **\`.removeAt(índice)\`**: Elimina el elemento ubicado en esa posición numérica exacta.
• **\`[índice] = nuevoValor\`**: Sobreescribe el valor existente en esa posición.`,
        codeSnippet: `fun main() {\n    val tareas = mutableListOf("Revisar correo", "Llamar al cliente")\n    println("Tareas iniciales: $tareas")\n\n    // 1. Agregar al final\n    tareas.add("Subir informe a la nube")\n    \n    // 2. Modificar una tarea existente\n    tareas[0] = "Revisar correos urgentes"\n\n    // 3. Eliminar por valor\n    tareas.remove("Llamar al cliente")\n\n    println("Tareas pendientes finales: $tareas")\n    println("Total de tareas por hacer: \${tareas.size}")\n}`,
        outputSnippet: `Tareas iniciales: [Revisar correo, Llamar al cliente]\nTareas pendientes finales: [Revisar correos urgentes, Subir informe a la nube]\nTotal de tareas por hacer: 2`,
        byteTip: 'tareas.clear() borra todos los elementos de la lista de un solo golpe, dejándola vacía (size = 0).',
        pitfallTip: 'removeAt(índice) lanzará un error si el índice no existe. Comprueba siempre que el índice esté dentro del rango 0 until size.',
        keyPoints: [
          '.add() agrega elementos al final o en posiciones intermedias.',
          '.remove() y .removeAt() eliminan por valor o por índice.',
          'lista[i] = valor reemplaza el elemento en la posición i.'
        ]
      },
      {
        title: 'Manejo de elementos duplicados',
        explanation: `Las listas permiten elementos repetidos con total libertad. Si llamas a \`.remove("repetido")\`, Kotlin solo eliminará la **primera aparición** que encuentre:`,
        codeSnippet: `fun main() {\n    val votos = mutableListOf("Sí", "No", "Sí", "Sí")\n    println("Votos registrados: $votos")\n\n    votos.remove("Sí") // Elimina solo el primer "Sí"\n    println("Tras eliminar una opción 'Sí': $votos")\n}`,
        outputSnippet: `Votos registrados: [Sí, No, Sí, Sí]\nTras eliminar una opción 'Sí': [No, Sí, Sí]`,
        byteTip: 'Si necesitas que sea imposible tener elementos duplicados por diseño, la colección adecuada no es una List, sino un Set.',
        pitfallTip: 'No uses remove() dentro de un for tradicional mientras iteras la lista; puede alterar los índices sobre la marcha.',
        keyPoints: [
          'Las listas permiten y preservan elementos duplicados.',
          'remove() elimina la primera ocurrencia de izquierda a derecha.',
          'Para conjuntos sin duplicados, Kotlin ofrece la estructura Set.'
        ]
      }
    ]
  },

  'kotlin-u09-l04': {
    subtitle: 'Recorre colecciones completas elemento por elemento con bucles for y verifica pertenencia con in.',
    analogy: 'Un inspector de calidad que revisa cada caja que pasa por una cinta transportadora: toma una caja, la examina, la devuelve a la cinta y pasa a la siguiente hasta que la cinta termina.',
    sections: [
      {
        title: 'Recorrer colecciones y comprobar pertenencia con in',
        explanation: `Recorrer una lista completa para procesar cada uno de sus elementos es una de las tareas más comunes en programación.

La forma más elegante y directa en Kotlin es el bucle **\`for-in\`**:
\`for (elemento in lista) {\`
\`    println(elemento)\`
\`}\`

Además, puedes usar el operador **\`in\`** dentro de una condición para saber si un elemento está dentro de la lista en una sola línea, sin tener que hacer ningún bucle manual:
\`if ("Admin" in listaRoles) ...\``,
        codeSnippet: `fun main() {\n    val lenguajes = listOf("Kotlin", "Java", "Python", "Swift")\n\n    // 1. Recorrer la lista con for\n    println("Lenguajes admitidos en el curso:")\n    for (lenguaje in lenguajes) {\n        println(" • $lenguaje")\n    }\n\n    // 2. Comprobar pertenencia instantánea con in\n    val lenguajeBuscado = "Kotlin"\n    if (lenguajeBuscado in lenguajes) {\n        println("\\n¡Excelente! $lenguajeBuscado está disponible en el catálogo.")\n    }\n}`,
        outputSnippet: `Lenguajes admitidos en el curso:\n • Kotlin\n • Java\n • Python\n • Swift\n\n¡Excelente! Kotlin está disponible en el catálogo.`,
        byteTip: 'También puedes usar !in para comprobar ausencia: if (codigo !in codigosValidos) { error() }.',
        pitfallTip: 'La búsqueda con in en listas grandes revisa elemento por elemento. Si tienes 100,000 elementos, un Set es miles de veces más rápido.',
        keyPoints: [
          'for (item in lista) recorre todos los elementos en orden secuencial.',
          'in comprueba si un elemento existe dentro de la colección.',
          'Elimina la necesidad de manejar índices numéricos manuales.'
        ]
      },
      {
        title: 'Recorrer con índice usando withIndex()',
        explanation: `Si necesitas conocer tanto el elemento como su número de posición en la lista (por ejemplo, para numerar una lista del 1 al 3), usa \`.withIndex()\`:`,
        codeSnippet: `fun main() {\n    val canciones = listOf("Bohemian Rhapsody", "Hotel California", "Imagine")\n\n    println("=== TOP CANCIONES ===")\n    for ((indice, cancion) in canciones.withIndex()) {\n        println("\${indice + 1}. $cancion")\n    }\n}`,
        outputSnippet: `=== TOP CANCIONES ===\n1. Bohemian Rhapsody\n2. Hotel California\n3. Imagine`,
        byteTip: '(indice, cancion) desestructura la tupla entregada por withIndex() de forma automática.',
        pitfallTip: 'Recuerda que indice empieza en 0, por eso sumamos + 1 al mostrarlo a personas normales.',
        keyPoints: [
          '.withIndex() entrega el índice y el valor en cada ciclo.',
          'Permite numerar interfaces visuales con facilidad.',
          'Evita tener que crear contadores manuales externos.'
        ]
      }
    ]
  },

  'kotlin-u09-l05': {
    subtitle: 'Garantiza elementos únicos sin duplicados utilizando la colección Set.',
    analogy: 'Una bolsa de canicas de colores únicos: puedes meter una canica roja. Si intentas meter otra canica roja idéntica, la bolsa la rechaza y se queda solo con una.',
    sections: [
      {
        title: 'La colección Set: valores únicos garantizados',
        explanation: `A veces necesitas almacenar una colección donde **no puede haber duplicados bajo ninguna circunstancia**:
• La lista de números de identificación (cédula o DNI) de los clientes.
• Los hashtags de una publicación.
• Los correos registrados en un boletín.

Para esto existe la colección **\`Set\`** (Conjunto):
• **No admite duplicados:** Si intentas agregar un valor que ya existe, el Set lo ignora en silencio sin causar error.
• Creada con **\`setOf()\`** para solo lectura o **\`mutableSetOf()\`** para modificable.
• Las búsquedas con \`in\` en un Set son prácticamente **instantáneas**, sin importar si tiene 10 o 1,000,000 de elementos.`,
        codeSnippet: `fun main() {\n    // Creamos un Set con elementos repetidos a propósito\n    val colores = setOf("Rojo", "Azul", "Verde", "Rojo", "Azul")\n\n    println("Contenido del Set (los duplicados se eliminaron automáticamente):")\n    println(colores)\n    println("Cantidad de colores únicos: \${colores.size}")\n\n    // Búsqueda ultra-rápida\n    println("¿Contiene 'Verde'?: \${"Verde" in colores}")\n}`,
        outputSnippet: `Contenido del Set (los duplicados se eliminaron automáticamente):\n[Rojo, Azul, Verde]\nCantidad de colores únicos: 3\n¿Contiene 'Verde'?: true`,
        byteTip: 'Puedes eliminar duplicados de cualquier lista existente simplemente llamando a .toSet() o .distinct().',
        pitfallTip: 'Los elementos en un Set general no garantizan acceso por índice numérico tradicional [0] porque representan un conjunto matemático, no una fila.',
        keyPoints: [
          'Set garantiza que cada elemento aparezca exactamente una sola vez.',
          'Ignora inserciones duplicadas de forma automática.',
          'Las operaciones de pertenencia (in) son de alta eficiencia computacional.'
        ]
      },
      {
        title: 'Eliminación instantánea de duplicados',
        explanation: `Mira cómo limpiar una lista de correos con duplicados en una sola instrucción:`,
        codeSnippet: `fun main() {\n    val correosConDuplicados = listOf("ana@mail.com", "pedro@mail.com", "ana@mail.com")\n    \n    val correosUnicos = correosConDuplicados.toSet()\n    println("Total recibidos: \${correosConDuplicados.size}")\n    println("Total únicos reales: \${correosUnicos.size}")\n}`,
        outputSnippet: `Total recibidos: 3\nTotal únicos reales: 2`,
        byteTip: 'toSet() es la herramienta número uno para deduplicar datos importados.',
        pitfallTip: 'Si el orden de inserción es estrictamente vital, mutableSetOf() en Kotlin conserva el orden de inserción gracias a LinkedHashSet.',
        keyPoints: [
          'toSet() convierte cualquier lista a conjunto único.',
          'Ideal para depuración de datos masivos.',
          'Ahorra espacio en memoria al descartar redundancias.'
        ]
      }
    ]
  },

  'kotlin-u09-l06': {
    subtitle: 'Asocia datos en parejas de clave y valor con la poderosa colección Map.',
    analogy: 'Un diccionario de idiomas o la libreta de contactos de tu teléfono: buscas por el nombre de la persona (clave única) y obtienes de inmediato su número de teléfono (valor asociado).',
    sections: [
      {
        title: 'La colección Map: Clave - Valor',
        explanation: `Un **\`Map\`** (o diccionario) es una colección que almacena datos en parejas compuestas por una **Clave (\`Key\`)** y un **Valor (\`Value\`)**:
• **Clave (Key):** Debe ser **única**. Actúa como el identificador para buscar el dato (ej: el correo del usuario o el código de país).
• **Valor (Value):** El dato asociado a esa clave (ej: los datos del perfil o el nombre del país). Los valores sí pueden repetirse.

En Kotlin creamos un mapa con la función **\`mapOf()\`** usando la palabra clave **\`to\`** para unir cada pareja:
\`val paises = mapOf("CR" to "Costa Rica", "MX" to "México")\``,
        codeSnippet: `fun main() {\n    // Mapa de códigos de país a nombres completos\n    val capitales = mapOf(\n        "ES" to "Madrid",\n        "AR" to "Buenos Aires",\n        "CO" to "Bogotá"\n    )\n\n    println("Capital de España (clave 'ES'): \${capitales["ES"]}")\n    println("Capital de Colombia (clave 'CO'): \${capitales["CO"]}")\n\n    // Si la clave no existe, devuelve null de forma segura\n    println("Capital de Japón (clave 'JP'): \${capitales["JP"]}")\n}`,
        outputSnippet: `Capital de España (clave 'ES'): Madrid\nCapital de Colombia (clave 'CO'): Bogotá\nCapital de Japón (clave 'JP'): null`,
        byteTip: 'Puedes definir un valor por defecto con .getOrDefault("JP", "No registrada").',
        pitfallTip: 'Si en un mapa mutable asignas un valor a una clave que ya existía, el valor anterior se sobreescribe sin previo aviso.',
        keyPoints: [
          'Map organiza la información en parejas clave-valor asociadas.',
          'Cada clave es única dentro del mapa.',
          'Consultar por clave mapa[clave] es una de las operaciones más rápidas en computación.'
        ]
      },
      {
        title: 'Mapas mutables para perfiles y configuraciones',
        explanation: `Con \`mutableMapOf()\` puedes agregar o actualizar configuraciones dinámicamente:`,
        codeSnippet: `fun main() {\n    val configuracionApp = mutableMapOf(\n        "tema" to "oscuro",\n        "idioma" to "es"\n    )\n\n    // Actualizamos el idioma y agregamos una nueva preferencia\n    configuracionApp["idioma"] = "en"\n    configuracionApp["notificaciones"] = "activas"\n\n    println("Configuraciones activas:")\n    for ((clave, valor) in configuracionApp) {\n        println(" • $clave: $valor")\n    }\n}`,
        outputSnippet: `Configuraciones activas:\n • tema: oscuro\n • idioma: en\n • notificaciones: activas`,
        byteTip: 'for ((clave, valor) in mapa) permite recorrer las dos partes de cada pareja de forma directa.',
        pitfallTip: 'No uses tipos mutables como claves en un Map; si la clave cambia su estado interno, el mapa no podrá encontrarla.',
        keyPoints: [
          'mutableMapOf() permite modificar parejas clave-valor en vivo.',
          'Ideal para almacenar respuestas JSON de servicios web y perfiles.',
          'La desestructuración (clave, valor) simplifica los recorridos con for.'
        ]
      }
    ]
  },

  'kotlin-u09-l07': {
    subtitle: 'Aprende a elegir la colección ideal para cada caso: List, Set o Map.',
    analogy: 'Elegir el vehículo adecuado: si llevas una fila de personas usas un autobús (List); si quieres un club exclusivo sin invitados repetidos usas un carnet de membresía (Set); si organizas casilleros con llaves numeradas usas un panel de casilleros (Map).',
    sections: [
      {
        title: '¿Cuándo usar List, Set o Map?',
        explanation: `Elegir la colección adecuada para cada problema hace que tu código sea infinitamente más limpio y eficiente.

Aquí tienes la guía de decisión oficial:

1. **Usa \`List\` cuando:**
• El orden de los elementos importa (como un historial de acciones o un ranking).
• Se permiten elementos duplicados (como una lista de compras o notas de alumnos).
• Quieres acceder a elementos por su número de posición (índice \`0, 1, 2...\`).

2. **Usa \`Set\` cuando:**
• La unicidad es prioritaria (no debe haber duplicados jamás).
• El orden no es tan relevante.
• Necesitas verificar con altísima velocidad si algo ya existe (\`in\`).

3. **Usa \`Map\` cuando:**
• Cada dato tiene una clave o identificador natural (cédula, ID, código de producto).
• Necesitas buscar datos por nombre o código en lugar de por número de índice.`,
        codeSnippet: `fun main() {\n    // 1. List: orden y duplicados permitidos\n    val playlist = listOf("Canción A", "Canción B", "Canción A")\n    println("Playlist (List): $playlist")\n\n    // 2. Set: elementos únicos sin duplicados\n    val etiquetasUnicas = setOf("android", "kotlin", "android")\n    println("Etiquetas (Set): $etiquetasUnicas")\n\n    // 3. Map: búsqueda por clave identificadora\n    val precios = mapOf("manzana" to 1.50, "platano" to 0.80)\n    println("Precio de la manzana (Map): $$ \${precios["manzana"]}")\n}`,
        outputSnippet: `Playlist (List): [Canción A, Canción B, Canción A]\nEtiquetas (Set): [android, kotlin]\nPrecio de la manzana (Map): $ 1.5`,
        byteTip: 'Empieza siempre con la versión inmutable (listOf, setOf, mapOf) por defecto. Pasa a mutable solo cuando necesites modificarla.',
        pitfallTip: 'Usar List para búsquedas intensivas de millones de elementos es muy lento; en ese caso usa Set o Map.',
        keyPoints: [
          'List para orden y duplicados.',
          'Set para unicidad estricta y velocidad de búsqueda.',
          'Map para asociaciones por clave e identificadores.'
        ]
      },
      {
        title: 'Resumen arquitectónico en Android',
        explanation: `En una aplicación real de Android:
• Los productos en pantalla se envían al RecyclerView como una \`List<Producto>\`.
• Los IDs de productos marcados como favoritos se guardan en un \`Set<String>\` para saber al instante si un corazón debe pintarse rojo.
• El carrito de compras se almacena en un \`Map<ProductoId, Cantidad>\` para asociar cada artículo con sus unidades.`,
        codeSnippet: `fun main() {\n    val favoritos = setOf(101, 104) // Set de IDs favoritos\n    val carrito = mapOf(101 to 2, 102 to 1) // Map de ID a cantidad\n\n    println("¿El producto 101 es favorito?: \${101 in favoritos}")\n    println("Cantidad de producto 101 en carrito: \${carrito[101]} unidades")\n}`,
        outputSnippet: `¿El producto 101 es favorito?: true\nCantidad de producto 101 en carrito: 2 unidades`,
        byteTip: 'Combinar las tres estructuras crea arquitecturas de datos sólidas y profesionales.',
        pitfallTip: 'No uses tipos complejos como claves en Map sin asegurarte de que implementen correctamente equals y hashCode.',
        keyPoints: [
          'Cada colección resuelve una necesidad arquitectónica concreta.',
          'Dominar las colecciones es el salto de principiante a programador profesional.',
          'Kotlin ofrece la biblioteca de colecciones más rica y expresiva del ecosistema móvil.'
        ]
      }
    ]
  }
};
