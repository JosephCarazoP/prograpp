import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_03_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u03-l01": {
    "id": "kt-th-u03-l01",
    "lessonId": "kotlin-u03-l01",
    "pathId": "kotlin",
    "unitId": 3,
    "levelId": 1,
    "title": "1. Operadores aritméticos: +, -, *, / y %",
    "subtitle": "Realiza cálculos matemáticos esenciales con suma, resta, multiplicación, división y módulo.",
    "estimatedMinutes": 8,
    "analogy": "Son las operaciones de una calculadora de bolsillo de toda la vida: sumas la cuenta del restaurante, restas el descuento, multiplicas por comensales y calculas el cambio que sobra.",
    "video": {
      "title": "Operadores Matemáticos y Lógicos en Kotlin",
      "channel": "AristiDevs",
      "duration": "28:45",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aritmética, comparaciones y tablas de verdad con operadores lógicos and y or."
    },
    "sections": [
      {
        "title": "Los operadores aritméticos fundamentales",
        "explanation": "Kotlin incluye todos los operadores matemáticos estándar para manipular números:\n• **`+` (Suma):** Agrega dos valores numéricos.\n• **`-` (Resta):** Resta el valor derecho del izquierdo.\n• **`*` (Multiplicación):** Multiplica dos factores.\n• **`/` (División):** Divide el primer número entre el segundo.\n• **`%` (Módulo o Residuo):** Devuelve el sobrante exacto de una división entera.\n\nEl operador módulo (`%`) es súper útil: te permite saber si un número es par (si `n % 2 == 0`), limitar valores dentro de un rango o calcular minutos sobrantes.",
        "codeSnippet": "fun main() {\n    val a = 20\n    val b = 6\n\n    println(\"Suma           : ${a + b}\")\n    println(\"Resta          : ${a - b}\")\n    println(\"Multiplicación : ${a * b}\")\n    println(\"División entera: ${a / b}\")\n    println(\"Residuo (módulo): ${a % b}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Suma           : 26\nResta          : 14\nMultiplicación : 120\nDivisión entera: 3\nResiduo (módulo): 2",
        "byteTip": "En la división 20 / 6, el resultado es 3 porque ambos son enteros (Int) y el residuo 2 se descarta.",
        "pitfallTip": "Dividir entre cero con números enteros (x / 0) provocará un error de ejecución que detendrá tu app (ArithmeticException).",
        "keyPoints": [
          "+, -, *, / realizan la aritmética básica.",
          "% entrega el resto de una división entera.",
          "Si ambos operandos son Int, el resultado de la división siempre será un Int truncado."
        ]
      },
      {
        "title": "Casos prácticos del operador módulo (%)",
        "explanation": "¿Cuándo se usa el residuo en la vida real?\n• Para saber si un turno o número de lista es par o impar.\n• Para convertir segundos totales a minutos y segundos restantes.\n• Para repartir elementos en columnas de forma cíclica.",
        "codeSnippet": "fun main() {\n    val segundosTotales = 135\n    val minutos = segundosTotales / 60\n    val segundosRestantes = segundosTotales % 60\n\n    println(\"Tiempo transcurrido: $minutos min y $segundosRestantes seg.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Tiempo transcurrido: 2 min y 15 seg.",
        "byteTip": "135 / 60 da 2 minutos enteros, y 135 % 60 da los 15 segundos sobrantes. ¡Elegante y directo!",
        "pitfallTip": "No uses módulo con números negativos sin antes revisar cómo maneja el signo Kotlin.",
        "keyPoints": [
          "El módulo resuelve conversiones de tiempo y medidas cíclicas.",
          "numero % 2 == 0 es la fórmula universal para comprobar paridad.",
          "Es una operación nativa del procesador ultra-rápida."
        ]
      }
    ]
  },
  "kotlin-u03-l02": {
    "id": "kt-th-u03-l02",
    "lessonId": "kotlin-u03-l02",
    "pathId": "kotlin",
    "unitId": 3,
    "levelId": 2,
    "title": "2. División entera frente a división decimal",
    "subtitle": "Comprende la diferencia crucial entre dividir enteros y dividir números con decimales.",
    "estimatedMinutes": 8,
    "analogy": "Si tienes 7 chocolates y los repartes entre 2 personas sin partirlos, a cada uno le tocan 3 chocolates enteros (división entera). Si partes el chocolate sobrante, a cada uno le tocan 3.5 chocolates (división decimal).",
    "video": {
      "title": "Operadores Matemáticos y Lógicos en Kotlin",
      "channel": "AristiDevs",
      "duration": "28:45",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aritmética, comparaciones y tablas de verdad con operadores lógicos and y or."
    },
    "sections": [
      {
        "title": "División entera vs División decimal",
        "explanation": "Uno de los errores más comunes de quienes inician en Kotlin ocurre al calcular promedios o porcentajes:\n\nSi divides dos números enteros:\n`val resultado = 7 / 2 // Da 3, NO 3.5`\nKotlin trunca los decimales (los borra) porque tanto el 7 como el 2 son de tipo `Int`. El resultado se mantiene como `Int`.\n\nPara obtener el resultado con decimales exactos, al menos uno de los dos números debe ser de tipo `Double`:\n`val resultado = 7.0 / 2 // Da 3.5`",
        "codeSnippet": "fun main() {\n    val sumaPuntos = 25\n    val totalExamenes = 4\n\n    // División entre enteros (pierde decimales)\n    val promedioEntero = sumaPuntos / totalExamenes\n    println(\"Promedio con enteros: $promedioEntero\")\n\n    // División con Double (conserva decimales)\n    val promedioExacto = sumaPuntos.toDouble() / totalExamenes\n    println(\"Promedio con decimales: $promedioExacto\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Promedio con enteros: 6\nPromedio con decimales: 6.25",
        "byteTip": "Usa .toDouble() en cualquier variable entera antes de dividir para asegurar precisión decimal.",
        "pitfallTip": "Escribir val x: Double = 7 / 2 guardará 3.0, no 3.5. La división entera se ejecuta antes de guardar el valor.",
        "keyPoints": [
          "Int / Int siempre produce un Int descartando la parte decimal.",
          "Double / Int o Int / Double produce un Double con precisión completa.",
          "Convierte al menos un término con .toDouble() cuando calcules porcentajes o promedios."
        ]
      },
      {
        "title": "Cálculo de porcentajes y descuentos",
        "explanation": "Al calcular descuentos en una tienda o el porcentaje de batería restante, la precisión decimal es indispensable:",
        "codeSnippet": "fun main() {\n    val bateriaActual = 43\n    val bateriaCapacidadMaxima = 50\n    \n    // Si hacemos 43 / 50 daría 0\n    val porcentaje = (bateriaActual.toDouble() / bateriaCapacidadMaxima) * 100\n    \n    println(\"Nivel de batería: $porcentaje%\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Nivel de batería: 86.0%",
        "byteTip": "Al multiplicar por 100 después de la división obtienes el valor en porcentaje legible.",
        "pitfallTip": "Ten cuidado con redondear antes de tiempo: haz las conversiones al inicio de la fórmula.",
        "keyPoints": [
          "Los cálculos de porcentajes siempre requieren aritmética de punto flotante (Double).",
          "La conversión explícita evita que tus resultados queden inesperadamente en cero.",
          "En Android, la representación de progreso en barras visuales usa valores entre 0.0 y 1.0."
        ]
      }
    ]
  },
  "kotlin-u03-l03": {
    "id": "kt-th-u03-l03",
    "lessonId": "kotlin-u03-l03",
    "pathId": "kotlin",
    "unitId": 3,
    "levelId": 3,
    "title": "3. Comparaciones: ==, !=, <, >, <=, >=",
    "subtitle": "Compara valores para tomar decisiones lógicas con ==, !=, <, >, <= y >=.",
    "estimatedMinutes": 8,
    "analogy": "Es como la regla de altura en la entrada de una montaña rusa: el operador revisa si \"tu altura >= 1.40 metros\". Si la respuesta es verdadera, subes; si es falsa, esperas.",
    "video": {
      "title": "Operadores Matemáticos y Lógicos en Kotlin",
      "channel": "AristiDevs",
      "duration": "28:45",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aritmética, comparaciones y tablas de verdad con operadores lógicos and y or."
    },
    "sections": [
      {
        "title": "Operadores de comparación (Relacionales)",
        "explanation": "Los operadores de comparación confrontan dos valores y devuelven siempre un resultado de tipo **`Boolean`** (`true` o `false`):\n\n• **`==` (Igual a):** `true` si ambos valores son exactamente idénticos.\n• **`!=` (Diferente de):** `true` si los valores son distintos.\n• **`<` (Menor que):** `true` si el valor izquierdo es menor.\n• **`>` (Mayor que):** `true` si el valor izquierdo es mayor.\n• **`<=` (Menor o igual que):** `true` si es menor o idéntico.\n• **`>=` (Mayor o igual que):** `true` si es mayor o idéntico.",
        "codeSnippet": "fun main() {\n    val edadUsuario = 18\n    val edadMinimaPermitida = 18\n\n    println(\"¿Es exactamente igual?: ${edadUsuario == edadMinimaPermitida}\")\n    println(\"¿Es mayor o igual?     : ${edadUsuario >= edadMinimaPermitida}\")\n    println(\"¿Es menor de edad?     : ${edadUsuario < edadMinimaPermitida}\")\n    println(\"¿Es diferente?         : ${edadUsuario != edadMinimaPermitida}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Es exactamente igual?: true\n¿Es mayor o igual?     : true\n¿Es menor de edad?     : false\n¿Es diferente?         : false",
        "byteTip": "En Kotlin, == compara el contenido real de los objetos (incluyendo Strings), a diferencia de Java donde comparaba punteros de memoria.",
        "pitfallTip": "No confundas el operador de comparación == (dos signos iguales) con el de asignación = (un solo signo).",
        "keyPoints": [
          "Las comparaciones siempre devuelven un valor booleano: true o false.",
          "== y != verifican igualdad y diferencia.",
          "<, <=, >, >= evalúan orden numérico y jerárquico."
        ]
      },
      {
        "title": "Comparar cadenas de texto en Kotlin",
        "explanation": "En Kotlin puedes comparar textos directamente con `==`. El compilador revisa si las dos cadenas contienen exactamente las mismas letras:",
        "codeSnippet": "fun main() {\n    val rolUsuario = \"ADMIN\"\n    val rolRequerido = \"ADMIN\"\n    val tienePermiso = (rolUsuario == rolRequerido)\n    \n    println(\"¿Tiene permisos de administrador?: $tienePermiso\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Tiene permisos de administrador?: true",
        "byteTip": "Si quieres comparar textos sin importar mayúsculas o minúsculas, usa texto1.equals(texto2, ignoreCase = true).",
        "pitfallTip": "\"Admin\" == \"ADMIN\" dará false porque las mayúsculas cuentan como caracteres distintos.",
        "keyPoints": [
          "Kotlin maneja la comparación de texto de forma segura con ==.",
          "Las comparaciones de texto son sensibles a mayúsculas por defecto.",
          "Estas comparaciones alimentan las sentencias condicionales if y when."
        ]
      }
    ]
  },
  "kotlin-u03-l04": {
    "id": "kt-th-u03-l04",
    "lessonId": "kotlin-u03-l04",
    "pathId": "kotlin",
    "unitId": 3,
    "levelId": 4,
    "title": "4. Operadores lógicos: &&, || y !",
    "subtitle": "Combina múltiples condiciones con los operadores lógicos AND (&&), OR (||) y NOT (!).",
    "estimatedMinutes": 8,
    "analogy": "Para abordar un avión necesitas pasaporte Y boleto (&&, ambos obligatorios). Para pagar en la cafetería puedes usar efectivo O tarjeta (||, basta con uno de los dos).",
    "video": {
      "title": "Operadores Matemáticos y Lógicos en Kotlin",
      "channel": "AristiDevs",
      "duration": "28:45",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aritmética, comparaciones y tablas de verdad con operadores lógicos and y or."
    },
    "sections": [
      {
        "title": "Los operadores lógicos: &&, || y !",
        "explanation": "Muchas decisiones en una aplicación dependen de más de una condición al mismo tiempo. Los operadores lógicos te permiten combinar expresiones booleanas:\n\n• **`&&` (AND lógico):** Devuelve `true` **únicamente si ambas condiciones son verdaderas**. Si alguna es falsa, el resultado total es falso.\n• **`||` (OR lógico):** Devuelve `true` si **al menos una de las condiciones es verdadera**. Solo da falso si todas fallan.\n• **`!` (NOT / Negación):** Invierte el valor booleano. Transforma `true` en `false` y viceversa.",
        "codeSnippet": "fun main() {\n    val tieneBoleto = true\n    val tienePasaporte = true\n    val equipajeSobrepeso = false\n\n    // AND: Ambos deben cumplirse\n    val puedeAbordar = tieneBoleto && tienePasaporte\n    println(\"¿Puede abordar el vuelo?: $puedeAbordar\")\n\n    // NOT: Invertir estado\n    val equipajeAprobado = !equipajeSobrepeso\n    println(\"¿Equipaje dentro del límite?: $equipajeAprobado\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Puede abordar el vuelo?: true\n¿Equipaje dentro del límite?: true",
        "byteTip": "Kotlin utiliza cortocircuito lógico (short-circuit): en a && b, si a es falso, ni siquiera evalúa b porque ya sabe que el resultado será falso.",
        "pitfallTip": "Confundir && con || es uno de los orígenes más frecuentes de fallas de seguridad en inicios de sesión.",
        "keyPoints": [
          "&& exige que todas las condiciones se cumplan.",
          "|| permite que se cumpla cualquiera de las condiciones.",
          "! invierte el valor de una condición."
        ]
      },
      {
        "title": "Condiciones compuestas en sistemas reales",
        "explanation": "Imagina el sistema de acceso a una plataforma de streaming: un usuario puede ver una película si tiene cuenta premium O si está disfrutando de su período de prueba, SIEMPRE Y CUANDO no tenga la cuenta suspendida:",
        "codeSnippet": "fun main() {\n    val esPremium = false\n    val periodoPruebaActivo = true\n    val cuentaSuspendida = false\n\n    val tieneSuscripcionValida = esPremium || periodoPruebaActivo\n    val puedeReproducir = tieneSuscripcionValida && !cuentaSuspendida\n\n    println(\"¿Permitir reproducción de video?: $puedeReproducir\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Permitir reproducción de video?: true",
        "byteTip": "Agrupa condiciones intermedias en variables booleanas con nombres descriptivos como tieneSuscripcionValida. Tu código se leerá como prosa en español.",
        "pitfallTip": "Evita armar una sola línea con 6 operadores lógicos seguidos sin paréntesis; es casi imposible de depurar.",
        "keyPoints": [
          "La modularización de condiciones compuestas previene errores lógicos.",
          "El cortocircuito ahorra procesamiento de operaciones costosas.",
          "Las expresiones lógicas modelan fielmente las reglas del negocio."
        ]
      }
    ]
  },
  "kotlin-u03-l05": {
    "id": "kt-th-u03-l05",
    "lessonId": "kotlin-u03-l05",
    "pathId": "kotlin",
    "unitId": 3,
    "levelId": 5,
    "title": "5. Prioridad de operaciones y paréntesis",
    "subtitle": "Aprende el orden matemático en que se evalúan las operaciones y cómo usar paréntesis para tener control total.",
    "estimatedMinutes": 8,
    "analogy": "En una receta, primero mezclas la harina con el agua y después horneas. Si horneas la harina sola antes de mezclar, el pastel se arruina. El orden de los pasos cambia todo el resultado.",
    "video": {
      "title": "Operadores Matemáticos y Lógicos en Kotlin",
      "channel": "AristiDevs",
      "duration": "28:45",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aritmética, comparaciones y tablas de verdad con operadores lógicos and y or."
    },
    "sections": [
      {
        "title": "Jerarquía de operadores y uso de paréntesis",
        "explanation": "Al igual que en el álgebra que aprendiste en la escuela, en Kotlin las operaciones no se evalúan simplemente de izquierda a derecha. Tienen una **prioridad** estricta:\n\n1. **Paréntesis `()`:** Se resuelven siempre primero, desde el más interno al más externo.\n2. **Multiplicación, División y Módulo (`*`, `/`, `%`):** Tienen prioridad sobre la suma y resta.\n3. **Suma y Resta (`+`, `-`):** Se evalúan a continuación.\n4. **Comparaciones (`<`, `>`, `==`, etc.):** Se evalúan después de los cálculos matemáticos.\n5. **Operadores lógicos (`&&`, `||`):** Se resuelven al final.",
        "codeSnippet": "fun main() {\n    // Sin paréntesis: 2 * 5 se ejecuta primero (da 10), luego 10 + 10 = 20\n    val sinParentesis = 10 + 2 * 5\n    println(\"10 + 2 * 5 = $sinParentesis\")\n\n    // Con paréntesis: (10 + 2) da 12, luego 12 * 5 = 60\n    val conParentesis = (10 + 2) * 5\n    println(\"(10 + 2) * 5 = $conParentesis\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "10 + 2 * 5 = 20\n(10 + 2) * 5 = 60",
        "byteTip": "Ante la menor duda, agrega paréntesis. No solo garantizan el resultado matemático correcto, sino que le dejan clarísimo tu propósito a cualquiera que lea tu código.",
        "pitfallTip": "No confíes en que tú o tus colegas recuerden la tabla completa de prioridades de operadores lógicos. Los paréntesis son gratis y salvan vidas.",
        "keyPoints": [
          "Los paréntesis tienen la máxima prioridad de evaluación.",
          "Multiplicación y división se ejecutan antes que sumas y restas.",
          "Usar paréntesis explícitos mejora la legibilidad y evita cálculos erróneos."
        ]
      },
      {
        "title": "Fórmulas compuestas claras y seguras",
        "explanation": "Mira el cálculo del área de un trapecio: `((baseMayor + baseMenor) * altura) / 2`.\nSin paréntesis, el compilador multiplicaría la base menor por la altura y dividiría entre 2, arruinando la fórmula:",
        "codeSnippet": "fun main() {\n    val baseMayor = 12.0\n    val baseMenor = 8.0\n    val altura = 5.0\n\n    val areaTrapecio = ((baseMayor + baseMenor) * altura) / 2.0\n    println(\"Área exacta del trapecio: $areaTrapecio cm²\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Área exacta del trapecio: 50.0 cm²",
        "byteTip": "Estructurar fórmulas complejas con variables intermedias es aún más limpio que una sola línea kilométrica.",
        "pitfallTip": "Abrir un paréntesis y olvidar cerrarlo es un error clásico que el IDE señalará como un cierre pendiente.",
        "keyPoints": [
          "Las fórmulas matemáticas deben proteger sus sumas previas con paréntesis.",
          "La claridad matemática se traduce en código robusto.",
          "El uso adecuado de paréntesis previene bugs matemáticos silenciosos."
        ]
      }
    ]
  },
  "kotlin-u03-l06": {
    "id": "kt-th-u03-l06",
    "lessonId": "kotlin-u03-l06",
    "pathId": "kotlin",
    "unitId": 3,
    "levelId": 6,
    "title": "6. Asignaciones abreviadas: +=, -=, *=, /=",
    "subtitle": "Escribe código más corto y limpio utilizando asignaciones compuestas como +=, -=, *= y /=.",
    "estimatedMinutes": 8,
    "analogy": "En lugar de decir \"toma mi saldo actual, súmale diez monedas y guárdalo de nuevo en mi saldo\", simplemente dices: \"añade diez monedas a mi saldo\" (+= 10).",
    "video": {
      "title": "Operadores Matemáticos y Lógicos en Kotlin",
      "channel": "AristiDevs",
      "duration": "28:45",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aritmética, comparaciones y tablas de verdad con operadores lógicos and y or."
    },
    "sections": [
      {
        "title": "Operadores de asignación compuesta",
        "explanation": "En programación es extraordinariamente común querer modificar el valor actual de una variable aplicando una operación sobre sí misma:\n\nForma tradicional y repetitiva:\n`puntos = puntos + 10`\n`salario = salario * 1.05`\n\nForma concisa y profesional con asignación compuesta:\n`puntos += 10`\n`salario *= 1.05`\n\nKotlin soporta todas las variantes principales:\n• **`+=`**: Suma y asigna.\n• **`-=`**: Resta y asigna.\n• **`*=`**: Multiplica y asigna.\n• **`/=`**: Divide y asigna.\n• **`%=`**: Calcula residuo y asigna.",
        "codeSnippet": "fun main() {\n    var monedas = 100\n    println(\"Monedas iniciales: $monedas\")\n\n    monedas += 50 // Suma 50\n    println(\"Tras recompensa (+50): $monedas\")\n\n    monedas -= 20 // Resta 20\n    println(\"Tras compra (-20): $monedas\")\n\n    monedas *= 2 // Duplica\n    println(\"Tras bonus doble (*2): $monedas\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Monedas iniciales: 100\nTras recompensa (+50): 150\nTras compra (-20): 130\nTras bonus doble (*2): 260",
        "byteTip": "También existen los operadores de incremento y decremento unitario: monedas++ suma 1, y monedas-- resta 1.",
        "pitfallTip": "Solo puedes usar estos operadores con variables var. Si intentas usarlos con val, el compilador marcará error.",
        "keyPoints": [
          "+=, -=, *=, /= combinan una operación matemática con la reasignación en un solo paso.",
          "Hacen el código más conciso sin sacrificar claridad.",
          "Exigen que la variable de destino haya sido declarada con var."
        ]
      },
      {
        "title": "Aplicación en carritos y contadores de juegos",
        "explanation": "Este patrón es el pan de cada día en aplicaciones interactivas. Mira cómo acumular puntos en una partida:",
        "codeSnippet": "fun main() {\n    var score = 0\n    var combo = 1\n\n    // El jugador derrota enemigos\n    score += 100 * combo\n    combo++ // Aumentamos el multiplicador\n\n    score += 100 * combo\n    println(\"Score final: $score puntos con combo $combo\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Score final: 300 puntos con combo 2",
        "byteTip": "combo++ aumenta la variable en 1 de forma limpia y directa.",
        "pitfallTip": "Ten cuidado entre ++variable (preincremento) y variable++ (posincremento) cuando lo uses dentro de una expresión.",
        "keyPoints": [
          "Los contadores y combos se gestionan fluidamente con += y ++.",
          "Mejoran la velocidad de escritura y lectura del código.",
          "Son ampliamente utilizados en bucles y controladores de eventos en Android."
        ]
      }
    ]
  },
  "kotlin-u03-l07": {
    "id": "kt-th-u03-l07",
    "lessonId": "kotlin-u03-l07",
    "pathId": "kotlin",
    "unitId": 3,
    "levelId": 7,
    "title": "7. Conversiones numéricas básicas",
    "subtitle": "Aprende a transformar valores entre números enteros, decimales y cadenas de forma explícita.",
    "estimatedMinutes": 8,
    "analogy": "Si tienes monedas en una alcancía y quieres anotarlas en un cheque, no puedes meter las monedas en el papel: debes convertir el valor de las monedas a números escritos en tinta.",
    "video": {
      "title": "Operadores Matemáticos y Lógicos en Kotlin",
      "channel": "AristiDevs",
      "duration": "28:45",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aritmética, comparaciones y tablas de verdad con operadores lógicos and y or."
    },
    "sections": [
      {
        "title": "Conversiones numéricas en Kotlin",
        "explanation": "A diferencia de otros lenguajes como C++ o JavaScript que convierten tipos de datos \"a escondidas\" (lo que a veces provoca bugs insólitos), **Kotlin no realiza conversiones numéricas implícitas**.\n\nSi tienes un `Int`, no puedes asignarlo directamente a una variable `Double`, ni viceversa:\n`val entero: Int = 42`\n`val decimal: Double = entero // ¡ERROR de compilación!`\n\nPara transformar un tipo en otro, Kotlin te ofrece métodos de conversión explícitos y seguros:\n• **`.toDouble()`**: Convierte a número con decimales.\n• **`.toInt()`**: Convierte a entero (descarta los decimales, no redondea).\n• **`.toString()`**: Convierte cualquier valor a texto.",
        "codeSnippet": "fun main() {\n    val pesoEntero = 75\n    // Conversión explícita requerida por Kotlin\n    val pesoDecimal = pesoEntero.toDouble()\n    \n    val temperatura = 36.85\n    val temperaturaTruncada = temperatura.toInt() // Descarta los decimales: queda 36\n\n    println(\"Entero a Double: $pesoDecimal\")\n    println(\"Double a Int (truncado): $temperaturaTruncada\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Entero a Double: 75.0\nDouble a Int (truncado): 36",
        "byteTip": ".toInt() simplemente corta los decimales. Si quieres redondear al más cercano, usa la función roundToInt() de la biblioteca matemática de Kotlin.",
        "pitfallTip": "Convertir un número muy grande a un tipo más pequeño (como Long a Int) puede causar desbordamiento si no cabe en el espacio asignado.",
        "keyPoints": [
          "Kotlin exige conversiones de tipo explícitas para evitar pérdidas accidentales de datos.",
          ".toDouble(), .toInt() y .toString() son los métodos de conversión estándar.",
          ".toInt() trunca la parte decimal sin redondear."
        ]
      },
      {
        "title": "Convertir textos a números de forma segura",
        "explanation": "En las apps de Android, todo lo que un usuario escribe en un campo de texto (EditText) llega como `String`. Si quieres sumarlo o calcular precios, debes convertir ese texto a número:",
        "codeSnippet": "fun main() {\n    val entradaUsuario = \"45\"\n    val cantidadComprada = entradaUsuario.toInt()\n    val total = cantidadComprada * 10\n\n    println(\"Texto '$entradaUsuario' convertido a número. Total calculado: $total\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Texto '45' convertido a número. Total calculado: 450",
        "byteTip": "En unidades posteriores aprenderás toIntOrNull(), que previene que la app se caiga si el usuario escribe letras en vez de números.",
        "pitfallTip": "Si intentas hacer \"hola\".toInt(), el programa lanzará una excepción NumberFormatException. Siempre valida las entradas del usuario.",
        "keyPoints": [
          "Las entradas de interfaz de usuario siempre ingresan como cadenas de texto.",
          "La conversión explícita a Int o Double permite procesar cálculos con lo escrito por el usuario.",
          "Validar que el texto sea numérico antes de convertir previene cierres inesperados de la app."
        ]
      }
    ]
  }
};
