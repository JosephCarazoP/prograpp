import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_12_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u12-l01": {
    "id": "kt-th-u12-l01",
    "lessonId": "kotlin-u12-l01",
    "pathId": "kotlin",
    "unitId": 12,
    "levelId": 1,
    "title": "1. Errores de sintaxis, ejecución y lógica",
    "subtitle": "Distingue los tres grandes tipos de fallas en programación: sintaxis, ejecución y lógica.",
    "estimatedMinutes": 8,
    "analogy": "Un error de sintaxis es escribir una palabra con mala ortografía en una carta. Un error de ejecución es enviar la carta a una dirección que no existe (el cartero se estrella). Un error de lógica es enviar la carta de felicitación a tu enemigo en lugar de a tu amigo: la carta llegó perfecto, pero el resultado fue un desastre.",
    "video": {
      "title": "Manejo de Errores, Excepciones y Debugging en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "36:40",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Bloques try-catch, depuración con puntos de interrupción y validación de datos límite."
    },
    "sections": [
      {
        "title": "Los tres tipos de errores en software",
        "explanation": "Todos los programadores del mundo, desde principiantes hasta creadores de sistemas operativos, cometen errores a diario. La clave es saber clasificarlos para resolverlos rápido:\n\n1. **Errores de Sintaxis (Tiempo de compilación):**\nRompen las reglas gramaticales de Kotlin (olvidar una comilla, escribir `fnu` en vez de `fun`). El compilador los subraya en rojo de inmediato y **no te permite ejecutar el programa** hasta corregirlos.\n\n2. **Errores de Ejecución (Runtime / Crashes):**\nEl código compila bien, pero al ejecutarse ocurre algo imposible: dividir entre cero, consultar un archivo que fue borrado o recibir un `NullPointerException`. Provocan que la app se cierre de golpe.\n\n3. **Errores de Lógica (Bugs semánticos):**\nEl programa compila y corre sin cerrarse, pero **produce un resultado equivocado** porque la fórmula o la condición están mal pensadas (por ejemplo: sumar el descuento en lugar de restarlo). Son los más peligrosos porque la máquina no te avisa.",
        "codeSnippet": "fun main() {\n    // Error de lógica silencioso: pusimos + en lugar de -\n    val precioOriginal = 100.0\n    val descuento = 20.0\n    \n    // El cálculo corre sin fallar, pero el cliente paga $120 en vez de $80\n    val totalErroneo = precioOriginal + descuento\n    println(\"Total con error lógico: $$totalErroneo (¡Cobro de más!)\")\n\n    val totalCorrecto = precioOriginal - descuento\n    println(\"Total corregido      : $$totalCorrecto (¡Correcto!)\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Total con error lógico: $120.0 (¡Cobro de más!)\nTotal corregido      : $80.0 (¡Correcto!)",
        "byteTip": "Los errores de sintaxis son tus amigos: te avisan antes de que el usuario vea la app. Los errores de lógica se descubren con buenas pruebas unitarias.",
        "pitfallTip": "No asumas que porque tu código compila ya está bien. Revisa siempre los resultados con datos de prueba reales.",
        "keyPoints": [
          "Sintaxis: violación de reglas gramaticales detectada por el compilador.",
          "Ejecución: fallas en tiempo de ejecución que detienen la app si no se capturan.",
          "Lógica: cálculos o condiciones mal formuladas que dan resultados incorrectos."
        ]
      },
      {
        "title": "El ciclo de depuración (Debugging)",
        "explanation": "Depurar (*debug*) no es dar golpes a ciegas modificando código al azar. Es un proceso científico:\n1. **Reproducir el error:** Asegúrate de saber exactamente qué pasos provocan la falla.\n2. **Aislar la causa:** Revisa las variables intermedias con `println` o el depurador.\n3. **Aplicar la corrección mínima:** Cambia solo lo necesario.\n4. **Verificar:** Comprueba que la corrección no rompió otra parte del sistema.",
        "codeSnippet": "fun main() {\n    val paso1 = 10\n    val paso2 = paso1 * 2\n    println(\"Diagnóstico en vivo -> paso1: $paso1, paso2: $paso2\")\n    \n    val resultado = paso2 + 5\n    println(\"Resultado final verificado: $resultado\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Diagnóstico en vivo -> paso1: 10, paso2: 20\nResultado final verificado: 25",
        "byteTip": "Aprender a leer los errores con calma te ahorra horas de frustración.",
        "pitfallTip": "Nunca cambies 5 cosas a la vez mientras buscas un bug; si se arregla no sabrás qué lo resolvió, y si empeora será más confuso.",
        "keyPoints": [
          "La depuración es una habilidad metódica y analítica.",
          "Inspeccionar estados intermedios revela el punto exacto de la falla.",
          "Las pruebas constantes garantizan que las soluciones sean definitivas."
        ]
      }
    ]
  },
  "kotlin-u12-l02": {
    "id": "kt-th-u12-l02",
    "lessonId": "kotlin-u12-l02",
    "pathId": "kotlin",
    "unitId": 12,
    "levelId": 2,
    "title": "2. Lectura de mensajes de error",
    "subtitle": "Aprende a leer y descifrar los mensajes de error del compilador de Kotlin sin asustarte.",
    "estimatedMinutes": 8,
    "analogy": "La luz de \"Check Engine\" del tablero de un automóvil: si conectas el escáner del mecánico, te dice con precisión exacta \"falla en sensor de oxígeno, cilindro 2\". Los errores del compilador hacen exactamente lo mismo: te dan el archivo, la línea y la causa.",
    "video": {
      "title": "Manejo de Errores, Excepciones y Debugging en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "36:40",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Bloques try-catch, depuración con puntos de interrupción y validación de datos límite."
    },
    "sections": [
      {
        "title": "Cómo leer un mensaje de error del compilador",
        "explanation": "Cuando el compilador de Kotlin encuentra un error, no lo hace para castigarte: te está entregando un reporte técnico diseñado para que lo soluciones en segundos.\n\nLa estructura estándar de un error de Kotlin es:\n`Archivo.kt:Línea:Columna: error: Mensaje explicativo`\n\nEjemplos comunes que verás:\n• **`Unresolved reference: nombre`**: Intentaste usar una variable o función que no existe o cuyo nombre escribiste con una falta de ortografía.\n• **`Type mismatch: inferred type is String but Int was expected`**: Intentaste meter un texto donde se esperaba un número.\n• **`Val cannot be reassigned`**: Intentaste modificar una variable inmutable declarada con `val`.",
        "codeSnippet": "fun main() {\n    // Demostración de código correcto que soluciona los errores clásicos:\n    val edad: Int = 25 // Tipos coincidentes (Int con Int)\n    var puntaje = 100  // Usamos var porque necesitamos reasignarlo\n    puntaje = 150      // Reasignación permitida\n\n    println(\"Edad: $edad | Puntaje actualizado: $puntaje\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Edad: 25 | Puntaje actualizado: 150",
        "byteTip": "Lee siempre el primer error que aparezca en la lista superior. Muchas veces los errores de abajo son solo consecuencias del primero.",
        "pitfallTip": "No ignores el número de línea. Si el compilador dice Línea 14, ve directamente a la línea 14 de ese archivo.",
        "keyPoints": [
          "Los mensajes del compilador indican archivo, número de línea y causa exacta.",
          "Type mismatch señala incompatibilidad de tipos de datos.",
          "Unresolved reference suele ser un error tipográfico en el nombre del elemento."
        ]
      },
      {
        "title": "El error de referencia no resuelta (Unresolved reference)",
        "explanation": "Es con diferencia el error más frecuente. Ocurre por:\n• Una letra mayúscula equivocada (`nombreusuario` vs `nombreUsuario`).\n• Olvidar importar un paquete (`import ...`).\n• Usar una variable fuera del bloque `{ }` donde fue declarada.",
        "codeSnippet": "fun main() {\n    val claveApi = \"API_PROD_9988\"\n    // Si escribes claveapi con minúscula, Kotlin dirá Unresolved reference\n    println(\"Conectando con credencial: $claveApi\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Conectando con credencial: API_PROD_9988",
        "byteTip": "Usa el autocompletado del IDE (Tab o Enter) para escribir nombres de variables sin riesgo de errores tipográficos.",
        "pitfallTip": "Kotlin es estrictamente sensible a mayúsculas y minúsculas (case-sensitive).",
        "keyPoints": [
          "La sensibilidad a mayúsculas exige precisión en los nombres.",
          "El autocompletado previene fallas de referencia no resuelta.",
          "Revisar el alcance de llaves resuelve la mayoría de estos incidentes."
        ]
      }
    ]
  },
  "kotlin-u12-l03": {
    "id": "kt-th-u12-l03",
    "lessonId": "kotlin-u12-l03",
    "pathId": "kotlin",
    "unitId": 12,
    "levelId": 3,
    "title": "3. Seguimiento de variables paso a paso",
    "subtitle": "Rastrea el valor de tus variables en vivo paso a paso para cazar errores lógicos complejos.",
    "estimatedMinutes": 8,
    "analogy": "Ver la repetición en cámara lenta del VAR en un partido de fútbol: congelas la jugada cuadro por cuadro para ver con tus propios ojos si el balón cruzó o no la línea.",
    "video": {
      "title": "Manejo de Errores, Excepciones y Debugging en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "36:40",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Bloques try-catch, depuración con puntos de interrupción y validación de datos límite."
    },
    "sections": [
      {
        "title": "Seguimiento de variables e inspección en vivo",
        "explanation": "Cuando tu programa da un resultado incorrecto y no entiendes por qué, la peor estrategia es quedarte mirando el código esperando que se ilumine solo.\n\nLa mejor estrategia es **hacer visible lo invisible**:\n1. Imprime los valores antes y después de cada cálculo clave.\n2. Comprueba que las condiciones de los `if` reciban los valores que tú crees que reciben.\n3. En Android Studio, coloca un **punto de interrupción (Breakpoint)** y ejecuta en modo Debug para detener el tiempo y examinar la memoria viva.",
        "codeSnippet": "fun main() {\n    val precioUnitario = 12.50\n    val unidades = 4\n    println(\"[DEBUG 1] precioUnitario: $precioUnitario, unidades: $unidades\")\n\n    val subtotal = precioUnitario * unidades\n    println(\"[DEBUG 2] subtotal calculado: $subtotal\")\n\n    val impuesto = subtotal * 0.10\n    println(\"[DEBUG 3] impuesto calculado: $impuesto\")\n\n    val total = subtotal + impuesto\n    println(\"TOTAL FINAL: $$total\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "[DEBUG 1] precioUnitario: 12.5, unidades: 4\n[DEBUG 2] subtotal calculado: 50.0\n[DEBUG 3] impuesto calculado: 5.0\nTOTAL FINAL: $55.0",
        "byteTip": "Usar prefijos como [DEBUG] en tus impresiones temporales te permite encontrarlas y borrarlas fácilmente antes de entregar tu código.",
        "pitfallTip": "Recuerda limpiar tus impresiones temporales antes de publicar tu aplicación en la tienda de apps de Google Play.",
        "keyPoints": [
          "Rastrear estados intermedios localiza el error lógico exacto.",
          "Hacer visible la información elimina las conjeturas en el desarrollo.",
          "Los puntos de interrupción en Android Studio son la herramienta profesional definitiva."
        ]
      },
      {
        "title": "Depuración de condiciones lógicas",
        "explanation": "Mira cómo imprimir una condición booleana para entender por qué un bloque `if` no se está ejecutando:",
        "codeSnippet": "fun main() {\n    val edad = 17\n    val tienePermiso = false\n\n    val cumpleRequisitos = edad >= 18 || tienePermiso\n    println(\"Diagnóstico: ¿Cumple requisitos?: $cumpleRequisitos\")\n\n    if (cumpleRequisitos) {\n        println(\"Acceso concedido.\")\n    } else {\n        println(\"Acceso denegado: debe tener 18 años o permiso firmado.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Diagnóstico: ¿Cumple requisitos?: false\nAcceso denegado: debe tener 18 años o permiso firmado.",
        "byteTip": "Extraer condiciones complejas a variables booleanas intermedias permite imprimirlas y entenderlas fácilmente.",
        "pitfallTip": "No confíes en tu memoria al evaluar tablas de verdad complejas; imprímelas y sal de dudas.",
        "keyPoints": [
          "La inspección de expresiones booleanas aclara el flujo de bifurcación.",
          "Facilita la explicación de reglas de negocio a clientes y diseñadores.",
          "Previene fallos de seguridad en accesos y permisos."
        ]
      }
    ]
  },
  "kotlin-u12-l04": {
    "id": "kt-th-u12-l04",
    "lessonId": "kotlin-u12-l04",
    "pathId": "kotlin",
    "unitId": 12,
    "levelId": 4,
    "title": "4. Excepciones con try y catch",
    "subtitle": "Captura fallas de ejecución imprevistas y mantén tu aplicación viva con bloques try y catch.",
    "estimatedMinutes": 8,
    "analogy": "Un trapecista de circo que realiza acrobacias en el aire: si todo sale bien, vuela con gracia; pero si resbala, hay una red de seguridad debajo (catch) que lo atrapa sin que se lastime.",
    "video": {
      "title": "Manejo de Errores, Excepciones y Debugging en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "36:40",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Bloques try-catch, depuración con puntos de interrupción y validación de datos límite."
    },
    "sections": [
      {
        "title": "Manejo de excepciones con try y catch",
        "explanation": "Una **excepción** es un evento extraordinario que ocurre durante la ejecución del programa y que amenaza con detenerlo de golpe (por ejemplo, intentar leer un archivo que el usuario acaba de borrar o perder la conexión a internet a medio envío).\n\nPara evitar que tu app se cierre bruscamente, usamos el bloque **`try - catch`**:\n• **`try` (Intentar):** Envuelve el código peligroso que podría fallar.\n• **`catch` (Capturar):** Si ocurre una excepción dentro del `try`, Kotlin salta de inmediato al bloque `catch` para manejar el error amablemente y continuar con la app viva.",
        "codeSnippet": "fun main() {\n    val textoUsuario = \"diez\" // No es un número\n\n    try {\n        // Código peligroso: puede lanzar NumberFormatException\n        val numero = textoUsuario.toInt()\n        println(\"Número procesado: $numero\")\n    } catch (e: Exception) {\n        // Red de seguridad: atrapamos el error\n        println(\"Aviso controlado: No pudimos convertir '$textoUsuario'. Mensaje técnico: ${e.message}\")\n    }\n\n    println(\"El programa continúa funcionando con normalidad sin caerse.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Aviso controlado: No pudimos convertir 'diez'. Mensaje técnico: For input string: \"diez\"\nEl programa continúa funcionando con normalidad sin caerse.",
        "byteTip": "En la variable e tienes acceso al mensaje de error técnico (e.message) para registrarlo en tus bitácoras de diagnóstico.",
        "pitfallTip": "No dejes bloques catch vacíos ({ }). Ocultar un error sin registrarlo hace que los bugs sean invisibles e imposibles de resolver.",
        "keyPoints": [
          "try envuelve operaciones propensas a fallos.",
          "catch captura la excepción y ejecuta un plan de contingencia.",
          "Evita que la aplicación se cierre abruptamente en las manos del usuario."
        ]
      },
      {
        "title": "El bloque finally para limpieza de recursos",
        "explanation": "Opcionalmente puedes agregar un bloque **`finally`** al final. El código dentro de `finally` **se ejecuta siempre**, tanto si la operación tuvo éxito como si ocurrió un error (ideal para cerrar archivos o conexiones):",
        "codeSnippet": "fun main() {\n    try {\n        println(\"Abriendo conexión con la base de datos...\")\n    } catch (e: Exception) {\n        println(\"Error en la conexión.\")\n    } finally {\n        println(\"Limpieza: Conexión cerrada de forma garantizada.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Abriendo conexión con la base de datos...\nLimpieza: Conexión cerrada de forma garantizada.",
        "byteTip": "finally se ejecuta incluso si dentro del try colocas un return.",
        "pitfallTip": "No uses try-catch para control de flujo cotidiano; úsalo solo para situaciones excepcionales de I/O, red o hardware.",
        "keyPoints": [
          "finally garantiza la liberación de recursos críticos.",
          "Se ejecuta siempre, sin importar si hubo excepción o éxito.",
          "Es vital para evitar fugas de memoria y bloqueos de archivos."
        ]
      }
    ]
  },
  "kotlin-u12-l05": {
    "id": "kt-th-u12-l05",
    "lessonId": "kotlin-u12-l05",
    "pathId": "kotlin",
    "unitId": 12,
    "levelId": 5,
    "title": "5. Validar una entrada frente a capturar una excepción",
    "subtitle": "Aprende cuándo validar preventivamente con if frente a cuándo capturar con try-catch.",
    "estimatedMinutes": 8,
    "analogy": "Mirar el pronóstico del clima antes de salir y llevar paraguas (validación preventiva con if) frente a salir a la intemperie sin mirar y tener que comprar un abrigo de emergencia si empieza a granizar (captura de excepción con catch).",
    "video": {
      "title": "Manejo de Errores, Excepciones y Debugging en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "36:40",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Bloques try-catch, depuración con puntos de interrupción y validación de datos límite."
    },
    "sections": [
      {
        "title": "Validación preventiva vs Manejo de excepciones",
        "explanation": "Uno de los dilemas clásicos en ingeniería de software es: ¿debo usar `if` para validar o debo usar `try-catch`?\n\nLa regla de oro de la industria:\n1. **Usa `if` para condiciones normales y previsibles:**\nSi puedes verificar de antemano si un dato es válido (por ejemplo, comprobar si un texto está vacío o si un divisor es cero), hazlo siempre con un simple `if`. Es mucho más rápido, no consume recursos extra y hace el código limpio.\n2. **Usa `try-catch` para fallas fuera de tu control directo:**\nArchivos del sistema que pueden estar bloqueados, fallas de antena de red móvil, respuestas corruptas del servidor o problemas de hardware.",
        "codeSnippet": "fun dividirSeguroConIf(dividendo: Int, divisor: Int): Int? {\n    // Validación preventiva limpia: prevenimos el error antes de que ocurra\n    if (divisor == 0) {\n        println(\"Aviso preventivo: El divisor no puede ser cero.\")\n        return null\n    }\n    return dividendo / divisor\n}\n\nfun main() {\n    val res1 = dividirSeguroConIf(20, 4)\n    println(\"Resultado 1: $res1\")\n\n    val res2 = dividirSeguroConIf(20, 0)\n    println(\"Resultado 2: $res2\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Resultado 1: 5\nAviso preventivo: El divisor no puede ser cero.\nResultado 2: null",
        "byteTip": "Lanzar y capturar excepciones consume cientos de ciclos de procesador. La validación con if es prácticamente instantánea.",
        "pitfallTip": "No uses try-catch como un sustituto perezoso para no validar tus entradas con if.",
        "keyPoints": [
          "Prevenir con if es más rápido y eficiente que capturar excepciones.",
          "Reserva try-catch para eventos externos impredecibles (red, disco, sensores).",
          "La combinación adecuada produce software robusto y veloz."
        ]
      },
      {
        "title": "try como expresión con valor de retorno",
        "explanation": "Al igual que `if` y `when`, en Kotlin **`try` es una expresión** y puede devolver un valor para asignarlo directamente a una variable:",
        "codeSnippet": "fun main() {\n    val entrada = \"85\"\n    \n    // try devuelve el resultado de la última línea del bloque correspondiente\n    val valorParseado: Int = try {\n        entrada.toInt()\n    } catch (e: NumberFormatException) {\n        0 // Valor por defecto si falla\n    }\n\n    println(\"Valor final seguro: $valorParseado\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Valor final seguro: 85",
        "byteTip": "try como expresión te permite inicializar constantes val de forma protegida en una sola sentencia.",
        "pitfallTip": "Asegúrate de que tanto el bloque try como el catch devuelvan el mismo tipo de dato.",
        "keyPoints": [
          "try como expresión devuelve un valor asignable.",
          "El bloque catch define el valor de contingencia por defecto.",
          "Elimina la necesidad de declarar variables mutables antes del bloque."
        ]
      }
    ]
  },
  "kotlin-u12-l06": {
    "id": "kt-th-u12-l06",
    "lessonId": "kotlin-u12-l06",
    "pathId": "kotlin",
    "unitId": 12,
    "levelId": 6,
    "title": "6. Casos normales, límite e incorrectos",
    "subtitle": "Pon a prueba tus algoritmos con los tres tipos de escenarios: normales, límite e incorrectos.",
    "estimatedMinutes": 8,
    "analogy": "Probar un ascensor antes de abrir el edificio al público: lo pruebas con 2 personas (caso normal), lo pruebas con exactamente 10 personas que es el límite de peso (caso límite) y pruebas qué pasa si alguien intenta meter un camión (caso incorrecto).",
    "video": {
      "title": "Manejo de Errores, Excepciones y Debugging en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "36:40",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Bloques try-catch, depuración con puntos de interrupción y validación de datos límite."
    },
    "sections": [
      {
        "title": "Casos normales, límite e incorrectos (Edge Cases)",
        "explanation": "Un programador novato prueba su código solo con el caso ideal (el *\"camino feliz\"*): si le piden calcular el total de 3 productos a $10, prueba 3 x 10 = 30 y cree que su programa es perfecto.\n\nUn desarrollador profesional prueba sistemáticamente tres tipos de escenarios:\n1. **Casos normales:** Entradas típicas del uso diario (ejemplo: comprar 2 boletos a $15).\n2. **Casos límite (*Edge Cases*):** Valores en las fronteras de los rangos (ejemplo: comprar 0 boletos, comprar exactamente el stock máximo de 100, o ingresar saldo exactamente igual al precio).\n3. **Casos incorrectos o maliciosos:** Entradas absurdas o no válidas (ejemplo: comprar -5 boletos, enviar texto en blanco o números gigantescos).",
        "codeSnippet": "fun calcularCostoEnvio(pesoKg: Double): Double {\n    // Validamos caso incorrecto\n    if (pesoKg <= 0.0) {\n        println(\"Error: El peso debe ser mayor a cero.\")\n        return 0.0\n    }\n    // Caso normal y límite\n    return if (pesoKg <= 5.0) 10.0 else 20.0\n}\n\nfun main() {\n    println(\"Caso normal (3.5 kg)  : $$${calcularCostoEnvio(3.5)}\")\n    println(\"Caso límite (5.0 kg)   : $$${calcularCostoEnvio(5.0)}\")\n    println(\"Caso incorrecto (-2 kg): $$${calcularCostoEnvio(-2.0)}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Caso normal (3.5 kg)  : $10.0\nCaso límite (5.0 kg)   : $10.0\nError: El peso debe ser mayor a cero.\nCaso incorrecto (-2 kg): $0.0",
        "byteTip": "La mayoría de los bugs en producción ocurren justamente en los casos límite (valores 0, 1, nulos o listas vacías).",
        "pitfallTip": "No des por sentado que el usuario siempre ingresará datos sensatos. Los usuarios presionan botones al azar.",
        "keyPoints": [
          "Probar solo el camino feliz deja vulnerabilidades ocultas.",
          "Los casos límite (fronteras de rangos) son donde más fallan los operadores relacionales.",
          "Manejar entradas incorrectas evita estados corruptos en la aplicación."
        ]
      },
      {
        "title": "Pruebas de listas vacías y datos nulos",
        "explanation": "Uno de los casos límite más famosos en Android es qué pasa cuando la lista de la base de datos viene con 0 elementos:",
        "codeSnippet": "fun obtenerResumenNotificaciones(mensajes: List<String>): String {\n    return when {\n        mensajes.isEmpty() -> \"No tienes notificaciones nuevas.\"\n        mensajes.size == 1 -> \"Tienes 1 notificación: ${mensajes[0]}\"\n        else -> \"Tienes ${mensajes.size} notificaciones pendientes.\"\n    }\n}\n\nfun main() {\n    println(obtenerResumenNotificaciones(emptyList()))\n    println(obtenerResumenNotificaciones(listOf(\"Bienvenido a Kotlin\")))\n    println(obtenerResumenNotificaciones(listOf(\"Aviso 1\", \"Aviso 2\")))\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "No tienes notificaciones nuevas.\nTienes 1 notificación: Bienvenido a Kotlin\nTienes 2 notificaciones pendientes.",
        "byteTip": "emptyList() crea una lista vacía inmutable eficiente.",
        "pitfallTip": "Intentar acceder a lista[0] sin comprobar antes si lista.isNotEmpty() es el error de principiante por excelencia.",
        "keyPoints": [
          "Siempre diseña un estado amigable para cuando una lista esté vacía.",
          "Verificar el tamaño de las colecciones antes de operar es una norma de calidad.",
          "La interfaz de usuario en Android debe mostrar vistas vacías (Empty States) elegantes."
        ]
      }
    ]
  },
  "kotlin-u12-l07": {
    "id": "kt-th-u12-l07",
    "lessonId": "kotlin-u12-l07",
    "pathId": "kotlin",
    "unitId": 12,
    "levelId": 7,
    "title": "7. Resultado esperado frente a resultado obtenido",
    "subtitle": "Compara el resultado esperado frente al obtenido para diseñar pruebas automáticas y confiables.",
    "estimatedMinutes": 8,
    "analogy": "Un control de calidad en una fábrica de balones: el balón esperado debe medir entre 68 y 70 cm de circunferencia. El inspector mide el balón real producido; si coincide, pasa al empaque; si difiere, se rechaza de inmediato.",
    "video": {
      "title": "Manejo de Errores, Excepciones y Debugging en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "36:40",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Bloques try-catch, depuración con puntos de interrupción y validación de datos límite."
    },
    "sections": [
      {
        "title": "Resultado esperado vs Resultado obtenido",
        "explanation": "El corazón de todas las pruebas en ingeniería de software es muy simple y se basa en contrastar dos magnitudes:\n\n1. **Resultado esperado (*Expected*):** Lo que tú sabes matemáticamente y lógicamente que el programa DEBE dar para una entrada específica.\n2. **Resultado obtenido (*Actual*):** Lo que el código real de tu función devolvió en ejecución.\n\nSi **`Resultado Esperado == Resultado Obtenido`**, la prueba es exitosa (verde).\nSi difieren en lo más mínimo, has cazado un bug y debes investigar la discrepancia.",
        "codeSnippet": "fun calcularDescuentoFidelidad(monto: Double, esVip: Boolean): Double {\n    return if (esVip) monto * 0.20 else 0.0\n}\n\nfun main() {\n    // Escenario de prueba:\n    val entradaMonto = 100.0\n    val entradaEsVip = true\n    val resultadoEsperado = 20.0 // Esperamos $20 de descuento\n\n    val resultadoObtenido = calcularDescuentoFidelidad(entradaMonto, entradaEsVip)\n    \n    println(\"Esperado: $$resultadoEsperado | Obtenido: $$resultadoObtenido\")\n    val pruebaExitosa = (resultadoEsperado == resultadoObtenido)\n    println(\"¿Prueba de validación aprobada?: $pruebaExitosa\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Esperado: $20.0 | Obtenido: $20.0\n¿Prueba de validación aprobada?: true",
        "byteTip": "En Android profesional se utilizan bibliotecas de pruebas automáticas como JUnit y Truth para automatizar miles de estas comparaciones en segundos.",
        "pitfallTip": "No calcules el resultado esperado usando la misma fórmula de la función; calcúlalo a mano para tener un punto de referencia independiente y objetivo.",
        "keyPoints": [
          "La prueba compara el valor esperado contra el valor obtenido.",
          "Una coincidencia exacta confirma el correcto funcionamiento del algoritmo.",
          "Es el fundamento del desarrollo guiado por pruebas (Test-Driven Development / TDD)."
        ]
      },
      {
        "title": "La función assert y require en Kotlin",
        "explanation": "Kotlin incluye funciones estándar para validar precondiciones y alertar si un supuesto falla:",
        "codeSnippet": "fun registrarTemperatura(celsius: Double) {\n    // require valida que el argumento cumpla una condición básica\n    require(celsius >= -273.15) { \"La temperatura no puede estar por debajo del cero absoluto.\" }\n    println(\"Temperatura registrada correctamente: $celsius°C\")\n}\n\nfun main() {\n    registrarTemperatura(24.5)\n    // Si llamaras con -300.0, require lanzaría un IllegalArgumentException con el mensaje claro\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Temperatura registrada correctamente: 24.5°C",
        "byteTip": "require() es la forma oficial y más expresiva de Kotlin para validar argumentos de entrada al inicio de una función.",
        "pitfallTip": "No dejes que tu código continúe con datos imposibles; detenlo de inmediato con require() antes de que corrompa la memoria.",
        "keyPoints": [
          "require() valida precondiciones con mensajes descriptivos automáticos.",
          "Protege las funciones contra llamadas con datos absurdos.",
          "Cierra el ciclo de aprendizaje de Kotlin con prácticas de nivel profesional."
        ]
      }
    ]
  }
};
