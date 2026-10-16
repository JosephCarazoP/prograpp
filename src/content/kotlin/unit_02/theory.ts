import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_02_THEORY: Record<string, TheoryLesson> = {
  'kotlin-u02-l01': {
    id: 'kt-th-u02-l01',
    lessonId: 'kotlin-u02-l01',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 1,
    title: '1. Inmutabilidad con val',
    subtitle: 'Variables de solo lectura que garantizan la integridad, predictibilidad y seguridad de los datos.',
    estimatedMinutes: 5,
    analogy: 'Declarar una variable con `val` es como redactar un contrato notariado y firmarlo en tinta indeleble: una vez firmado y archivado, nadie puede cambiar las cláusulas ni tachar las cifras.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - VARIABLES - Lección',
      channel: 'MoureDev by Brais Moure',
      duration: '14:35',
      url: 'https://www.youtube.com/watch?v=hug4TNmhw78',
      summary: 'Aprende en español la diferencia entre val (inmutable) y var (mutable) en Kotlin, gestión de memoria e inferencia de tipos.'
    },
    sections: [
      {
        title: 'La Garantía de Inmutabilidad',
        explanation: 'En Kotlin, la palabra reservada `val` (del inglés *value*) declara una referencia inmutable. Esto significa que una vez asignado su valor en tiempo de ejecución, la variable se comporta como de solo lectura: el compilador rechaza cualquier intento posterior de reasignación.\n\nBeneficios técnicos fundamentales:\n1. Seguridad de hilos (Thread-Safety): Varios hilos concurrentes pueden leer el dato simultáneamente sin riesgo de corrupción.\n2. Código libre de efectos secundarios: Saber que una variable no cambiará de forma silenciosa reduce drásticamente el tiempo de depuración.\n3. Optimización en la JVM: El compilador puede realizar optimizaciones de memoria avanzadas al saber que la referencia es constante.',
        codeSnippet: `fun main() {
    val idUsuario = "USR-9942"
    val fechaCreacion = "2026-10-14"

    println("ID de sesión inmutable: $idUsuario")
    println("Fecha de registro: $fechaCreacion")

    // Intentar modificarlo generará error en compilación:
    // idUsuario = "USR-0001" // Error: Val cannot be reassigned
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `ID de sesión inmutable: USR-9942
Fecha de registro: 2026-10-14`,
        byteTip: 'En Kotlin, más del 85% de las variables en una aplicación profesional se declaran con val. Si no tienes una razón explícita para mutar, tu elección debe ser siempre val.',
        pitfallTip: 'No confundas inmutable con constante fija universal. Una variable val puede calcular su valor en tiempo de ejecución (por ejemplo leyendo la hora actual o la respuesta de un servidor); lo inmutable es que una vez calculado, ya no puede cambiar.',
        keyPoints: [
          'val crea referencias de solo lectura no reasignables.',
          'Garantiza integridad de datos y previene mutaciones accidentales.',
          'Es el modificador de variable predeterminado en el desarrollo moderno de Kotlin.'
        ]
      }
    ]
  },
  'kotlin-u02-l02': {
    id: 'kt-th-u02-l02',
    lessonId: 'kotlin-u02-l02',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 2,
    title: '2. Mutabilidad con var',
    subtitle: 'Variables reasignables para contadores, acumuladores y estados dinámicos controlados.',
    estimatedMinutes: 5,
    analogy: 'Una variable `var` es como el odómetro digital de un automóvil: empieza en cero y sus dígitos avanzan constantemente a medida que el vehículo rueda por la carretera.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Manejo Controlado del Estado Dinámico',
        explanation: 'Existen escenarios algorítmicos donde el cambio es indispensable: contar iteraciones en un ciclo, acumular el puntaje de un juego, o almacenar la velocidad actual de un sensor.\n\nPara estos casos usamos `var` (de *variable*). Permite que la misma caja de memoria sea sobreescrita tantas veces como sea necesario con el operador de asignación `=`.',
        codeSnippet: `fun main() {
    var puntuacion = 0
    println("Puntaje inicial: $puntuacion")

    // El jugador derrota a un enemigo (+100)
    puntuacion += 100
    println("Enemigo derrotado: $puntuacion pts")

    // Bono de combo x2
    puntuacion *= 2
    println("¡Combo activo! Total: $puntuacion pts")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Puntaje inicial: 0
Enemigo derrotado: 100 pts
¡Combo activo! Total: 200 pts`,
        byteTip: 'Mantén el ámbito (scope) de las variables var lo más reducido posible (dentro de una función pequeña o bucle) para evitar que otros módulos modifiquen el estado sin control.',
        pitfallTip: 'Aunque var permite cambiar el valor, jamás permite cambiar el tipo de dato. Si var puntos = 10 (Int), no puedes asignarle después "diez" (String).',
        keyPoints: [
          'var permite reasignar nuevos valores a la variable a lo largo del tiempo.',
          'El tipo de dato queda sellado desde la declaración original.',
          'Úsalo exclusivamente cuando exista una justificación clara de estado cambiante.'
        ]
      }
    ]
  },
  'kotlin-u02-l03': {
    id: 'kt-th-u02-l03',
    lessonId: 'kotlin-u02-l03',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 3,
    title: '3. El Tipo Entero: Int',
    subtitle: 'Números enteros de 32 bits, límites numéricos y operaciones exactas sin pérdida decimal.',
    estimatedMinutes: 5,
    analogy: 'Un `Int` es como el aforo oficial de un estadio: cuenta personas una a una de forma indivisible. No hay medias personas ni fracciones; son enteros exactos.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Almacenamiento de Enteros de 32 Bits',
        explanation: 'En Kotlin, `Int` representa un entero de 32 bits en complemento a dos:\n- Mínimo: `-2,147,483,648` (`Int.MIN_VALUE`)\n- Máximo: `2,147,483,647` (`Int.MAX_VALUE`)\n\nCualquier número entero sin sufijo ni punto decimal escrito en Kotlin es tratado automáticamente como `Int`. Permite aritmética de altísima velocidad directamente ejecutada por la ALU del procesador.',
        codeSnippet: `fun main() {
    val vidas: Int = 5
    val enemigosRestantes = 12
    val limiteMaximo = Int.MAX_VALUE
    val limiteMinimo = Int.MIN_VALUE

    println("Vidas: $vidas")
    println("Límite superior de un Int: $limiteMaximo")
    println("Límite inferior de un Int: $limiteMinimo")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Vidas: 5
Límite superior de un Int: 2147483647
Límite inferior de un Int: -2147483648`,
        byteTip: 'Usa Int.MAX_VALUE e Int.MIN_VALUE para inicializar algoritmos de búsqueda de mínimos y máximos en listas numéricas.',
        pitfallTip: 'Si sumas 1 a Int.MAX_VALUE, el valor se desborda silenciosamente y pasa a ser negativo (Int.MIN_VALUE). Si necesitas contar más de 2 mil millones, debes usar Long.',
        keyPoints: [
          'Int ocupa 4 bytes (32 bits) de memoria.',
          'Su rango abarca desde -2.14 mil millones hasta +2.14 mil millones.',
          'Es el tipo por defecto para enteros en Kotlin.'
        ]
      }
    ]
  },
  'kotlin-u02-l04': {
    id: 'kt-th-u02-l04',
    lessonId: 'kotlin-u02-l04',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 4,
    title: '4. Decimales: Double y Float',
    subtitle: 'Precisión de punto flotante de 64 bits (Double) y el sufijo f obligatorio en Float (32 bits).',
    estimatedMinutes: 5,
    analogy: 'Imagina una balanza analógica de cocina frente a una balanza digital de joyería: la de cocina (Float) te da gramos aproximados; la de joyería (Double) mide miligramos con extrema precisión.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Precisión Simple frente a Precisión Doble',
        explanation: 'Para modelar valores fraccionales y continuos, Kotlin dispone de dos tipos fundamentales:\n\n1. `Double` (64 bits - 8 bytes):\n- Proporciona entre 15 y 17 dígitos decimales significativos.\n- Es el tipo DECIMAL POR DEFECTO. Cualquier literal con punto decimal como `19.99` es inferido como Double.\n\n2. `Float` (32 bits - 4 bytes):\n- Proporciona entre 6 y 7 dígitos decimales.\n- EXIGE obligatoriamente el sufijo `f` o `F` al final (`19.99f`). Se utiliza para optimizar memoria en gráficos 3D.',
        codeSnippet: `fun main() {
    val precioDouble: Double = 99.99 // Inferencia estándar
    val tasaFloat: Float = 0.0825f   // Sufijo f indispensable

    println("Precio en Double: $precioDouble")
    println("Tasa en Float: $tasaFloat")

    // División con decimales reales
    val resultado = 10.0 / 3.0
    println("10 / 3 con Double: $resultado")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Precio en Double: 99.99
Tasa en Float: 0.0825
10 / 3 con Double: 3.3333333333333335`,
        byteTip: 'En Kotlin siempre se usa punto (.) para decimales, nunca coma (,). La coma se reserva para separar argumentos de funciones.',
        pitfallTip: 'Olvidar la f al declarar un Float (ej. val x: Float = 5.5) causará un error de compilación inmediato: "The floating-point literal does not conform to the expected type Float".',
        keyPoints: [
          'Double ofrece 64 bits de precisión decimal y es el predeterminado.',
          'Float ocupa 32 bits y requiere el sufijo literal f o F.',
          'Evita comparar directamente decimales con == por imprecisiones inherentes al punto flotante.'
        ]
      }
    ]
  },
  'kotlin-u02-l05': {
    id: 'kt-th-u02-l05',
    lessonId: 'kotlin-u02-l05',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 5,
    title: '5. El Tipo Booleano: Boolean',
    subtitle: 'Banderas de estado binario con valores verdaderos (true) o falsos (false).',
    estimatedMinutes: 5,
    analogy: 'Un `Boolean` es como un interruptor de luz en la pared: solo tiene dos posiciones posibles en el universo: encendido (true) o apagado (false). No hay puntos intermedios.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Los Dos Estados de la Lógica Booleana',
        explanation: 'El tipo `Boolean` (en honor al matemático George Boole) solo puede almacenar dos valores literales:\n- `true` (Verdadero)\n- `false` (Falso)\n\nEs la base de toda la toma de decisiones algorítmica. Cualquier comparación relacional (`x > 10`, `a == b`) produce como resultado directo un valor `Boolean`.',
        codeSnippet: `fun main() {
    val usuarioAutenticado = true
    val tieneSuscripcionPremium = false
    val bateriaBaja = (15 < 20) // Comparación evaluada a true

    println("¿Sesión iniciada? $usuarioAutenticado")
    println("¿Es VIP? $tieneSuscripcionPremium")
    println("¿Alerta de batería? $bateriaBaja")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿Sesión iniciada? true
¿Es VIP? false
¿Alerta de batería? true`,
        byteTip: 'Nombra tus variables booleanas con prefijos interrogativos como esActivo, tienePermiso, estaConectado (o isOnline, hasAccess). Hace que los condicionales se lean como inglés o español fluido.',
        pitfallTip: 'true y false son palabras reservadas y deben escribirse estrictamente en minúsculas. True o FALSE provocarán error de compilación.',
        keyPoints: [
          'Boolean solo admite true o false.',
          'Las comparaciones lógicas siempre producen un Boolean.',
          'Es el combustible de las estructuras if, while y when.'
        ]
      }
    ]
  },
  'kotlin-u02-l06': {
    id: 'kt-th-u02-l06',
    lessonId: 'kotlin-u02-l06',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 6,
    title: '6. Caracteres Únicos: Char',
    subtitle: 'Caracteres Unicode individuales de 16 bits encerrados estrictamente en comillas simples.',
    estimatedMinutes: 5,
    analogy: 'Un `Char` es como una tecla física de tu teclado: al presionarla produce exactamente un único símbolo: una letra, un número o un signo de puntuación.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - TIPOS DE DATOS - Lección 2',
      channel: 'MoureDev by Brais Moure',
      duration: '16:10',
      url: 'https://www.youtube.com/watch?v=uWwVyww30SI',
      summary: 'Domina los tipos numéricos (Int, Double, Float), texto (String, Char) y Booleanos en Kotlin con ejemplos prácticos y concisos.'
    },
    sections: [
      {
        title: 'Caracteres Individuales en Comillas Simples',
        explanation: 'El tipo `Char` almacena un único carácter Unicode de 16 bits (UTF-16).\n\nRegla de sintaxis inquebrantable:\n- Los literales `Char` se encierran SIEMPRE en comillas simples (`\' \'`).\n- Solo pueden contener exactamente un símbolo (`\'A\'`, `\'7\'`, `\'$\'`) o una secuencia de escape (`\'\\n\'`, `\'\\t\'`).',
        codeSnippet: `fun main() {
    val calificacion: Char = 'A'
    val simboloMoneda: Char = '$'
    val digitoChar: Char = '9'

    println("Calificación obtenida: $calificacion")
    println("Moneda: $simboloMoneda")

    // Métodos integrados de Char
    println("¿Es un dígito numérico? " + digitoChar.isDigit())
    println("¿Es una letra? " + calificacion.isLetter())
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Calificación obtenida: A
Moneda: $
¿Es un dígito numérico? true
¿Es una letra? true`,
        byteTip: 'Char ofrece métodos utilitarios como .isDigit(), .isLetter(), .isWhitespace() y .uppercaseChar() muy útiles para validadores de formularios.',
        pitfallTip: 'Escribir \'AB\' con más de un carácter en comillas simples causará error inmediato: "Too many characters in a character literal". Si necesitas dos o más caracteres, debes usar comillas dobles ("AB") para crear un String.',
        keyPoints: [
          'Char representa un único carácter encerrado en comillas simples (\' \').',
          'Ocupa 16 bits y soporta caracteres de la tabla Unicode.',
          'No se puede mezclar directamente con números sin conversión explícita.'
        ]
      }
    ]
  },
  'kotlin-u02-l07': {
    id: 'kt-th-u02-l07',
    lessonId: 'kotlin-u02-l07',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 7,
    title: '7. Cadenas de Texto: String',
    subtitle: 'Secuencias inmutables de caracteres delimitadas por comillas dobles y métodos de inspección.',
    estimatedMinutes: 5,
    analogy: 'Si un Char es un eslabón suelto, un `String` es la cadena completa forjada. No puedes partirla fácilmente sin fundir una cadena nueva.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'El Tipo String en Detalle',
        explanation: 'En Kotlin, `String` es una secuencia inmutable de caracteres delimitada por comillas dobles (`" "`). Permite acceder a cualquier carácter por su índice basado en cero usando corchetes `[índice]` y cuenta con funciones de búsqueda integradas.',
        codeSnippet: `fun main() {
    val lenguaje = "Kotlin"

    // Acceso por índice (inicia en 0)
    val primeraLetra = lenguaje[0] // 'K'
    val ultimaLetra = lenguaje[lenguaje.length - 1] // 'n'

    println("Palabra: $lenguaje")
    println("Primera letra: $primeraLetra")
    println("Última letra: $ultimaLetra")
    println("¿Contiene 'lin'? " + lenguaje.contains("lin"))
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Palabra: Kotlin
Primera letra: K
Última letra: n
¿Contiene 'lin'? true`,
        byteTip: 'Puedes verificar si una cadena está vacía o solo contiene espacios usando .isBlank() en lugar de verificar su longitud manualmente.',
        pitfallTip: 'Los índices de un String van desde 0 hasta length - 1. Intentar acceder a lenguaje[lenguaje.length] lanzará una excepción StringIndexOutOfBoundsException.',
        keyPoints: [
          'String se delimita con comillas dobles (" ").',
          'Permite indexación con corchetes [i] de solo lectura.',
          'Provee métodos como .contains(), .startsWith() y .endsWith().'
        ]
      }
    ]
  },
  'kotlin-u02-l08': {
    id: 'kt-th-u02-l08',
    lessonId: 'kotlin-u02-l08',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 8,
    title: '8. Inferencia de Tipos',
    subtitle: 'Cómo el compilador de Kotlin deduce automáticamente el tipo exacto sin sacrificar el tipado estricto.',
    estimatedMinutes: 5,
    analogy: 'La inferencia de tipos es como un cajero experimentado en el banco: si le entregas un billete verde con el número 100 y la efigie de Franklin, no necesitas gritarle "¡ESTO ES UN BILLETE DE CIEN DÓLARES!"; él lo examina y lo sabe al instante.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - TIPOS DE DATOS - Lección 2',
      channel: 'MoureDev by Brais Moure',
      duration: '16:10',
      url: 'https://www.youtube.com/watch?v=uWwVyww30SI',
      summary: 'Domina los tipos numéricos (Int, Double, Float), texto (String, Char) y Booleanos en Kotlin con ejemplos prácticos y concisos.'
    },
    sections: [
      {
        title: 'Tipado Fuerte sin Redundancia Sintáctica',
        explanation: 'En lenguajes como Java clásico o C++, debías escribir el tipo dos veces:\n`Usuario usuario = new Usuario();`\n\nKotlin posee un potente motor de Inferencia de Tipos (*Type Inference*). Analiza la expresión a la derecha del signo `=` en tiempo de compilación y deduce el tipo exacto de la variable. Esto otorga la concisión de lenguajes dinámicos pero con la velocidad y seguridad total de un lenguaje de tipado estático.',
        codeSnippet: `fun main() {
    val edad = 25          // Inferido como Int
    val precio = 18.50     // Inferido como Double
    val nombre = "Linus"   // Inferido como String
    val esActivo = true    // Inferido como Boolean

    // El tipo queda fijado permanentemente en la compilación.
    // Intentar cambiar el tipo provocará error:
    // var puntos = 100
    // puntos = "cien" // Error: Type mismatch
    println("Tipos deducidos con total éxito en compilación.")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Tipos deducidos con total éxito en compilación.`,
        byteTip: 'Aprovecha la inferencia de tipos para variables locales donde el valor a la derecha sea evidente. Ahorra código repetitivo.',
        pitfallTip: 'La inferencia requiere obligatoriamente un valor inicial. Si declaras "val x" sin asignarle nada de inmediato, el compilador no podrá adivinar el tipo y fallará.',
        keyPoints: [
          'El compilador deduce el tipo analizando el valor asignado a la derecha.',
          'Kotlin sigue siendo 100% estático: la variable nunca cambia de tipo.',
          'Hace el código mucho más limpio y placentero de leer.'
        ]
      }
    ]
  },
  'kotlin-u02-l09': {
    id: 'kt-th-u02-l09',
    lessonId: 'kotlin-u02-l09',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 9,
    title: '9. Declaración Explícita de Tipos',
    subtitle: 'Sintaxis con dos puntos (: Int, : String) para contratos de código formales y variables diferidas.',
    estimatedMinutes: 5,
    analogy: 'La declaración explícita es como colocar un letrero de "SOLO CRISTALERÍA DELICADA" en una caja de mudanza antes de guardar nada: define formalmente qué puede entrar ahí sin lugar a ambigüedades.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - TIPOS DE DATOS - Lección 2',
      channel: 'MoureDev by Brais Moure',
      duration: '16:10',
      url: 'https://www.youtube.com/watch?v=uWwVyww30SI',
      summary: 'Domina los tipos numéricos (Int, Double, Float), texto (String, Char) y Booleanos en Kotlin con ejemplos prácticos y concisos.'
    },
    sections: [
      {
        title: 'Sintaxis Formal con Dos Puntos',
        explanation: 'Puedes especificar explícitamente el tipo de dato colocando dos puntos `:` después del nombre de la variable:\n`val identificador: TipoDato = valorInicial`\n\n¿Cuándo es necesario o recomendado?\n1. Cuando la variable se declara y su valor se asignará más adelante dentro de un condicional `if/else`.\n2. Cuando quieres forzar un tipo distinto al deducido (por ejemplo, quieres que un `10` sea almacenado como `Long` o `Short`).\n3. En firmas de funciones públicas y contratos de interfaces para documentación.',
        codeSnippet: `fun main() {
    // Declaración explícita obligatoria para inicialización posterior
    val calificacionExamen: String
    val puntaje = 85

    if (puntaje >= 80) {
        calificacionExamen = "Aprobado con honores"
    } else {
        calificacionExamen = "Necesita refuerzo"
    }

    println("Resultado: $calificacionExamen")

    // Forzando tipo explícito Long en lugar de Int
    val identificadorGlobal: Long = 42L
    println("ID: $identificadorGlobal")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Resultado: Aprobado con honores
ID: 42`,
        byteTip: 'En Kotlin, la convención de espacios es estricta: nombreVariable: Tipo (sin espacio antes de los dos puntos y un espacio después).',
        pitfallTip: 'Si declaras una variable con tipo explícito (ej. : Int) y le asignas un valor incompatible (ej. 3.14), el compilador te marcará un error Type mismatch.',
        keyPoints: [
          'La sintaxis variable: Tipo explicita el tipo de dato requerido.',
          'Es obligatoria cuando no se asigna un valor inmediatamente en la declaración.',
          'Garantiza contratos de tipos claros para otros desarrolladores.'
        ]
      }
    ]
  },
  'kotlin-u02-l10': {
    id: 'kt-th-u02-l10',
    lessonId: 'kotlin-u02-l10',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 10,
    title: '10. Conversión Numérica Explícita',
    subtitle: 'Por qué Kotlin prohíbe la conversión automática silenciosa y exige métodos como .toDouble() o .toInt().',
    estimatedMinutes: 5,
    analogy: 'Es como cambiar divisas en una casa de cambio: no puedes pagar con euros en un supermercado que opera en yenes esperando que la cajera haga la conversión mágica; debes cambiar tus billetes conscientemente con una operación explícita.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - TIPOS DE DATOS - Lección 2',
      channel: 'MoureDev by Brais Moure',
      duration: '16:10',
      url: 'https://www.youtube.com/watch?v=uWwVyww30SI',
      summary: 'Domina los tipos numéricos (Int, Double, Float), texto (String, Char) y Booleanos en Kotlin con ejemplos prácticos y concisos.'
    },
    sections: [
      {
        title: 'Cero Conversiones Implícitas (Type Safety Radical)',
        explanation: 'En muchos lenguajes (como C o Java), si asignas un número entero pequeño a una variable decimal o a un entero más grande, el lenguaje lo convierte de forma invisible (*widening conversion*). Esto con frecuencia provoca bugs silenciosos.\n\nEn Kotlin, los tipos más pequeños NO son subtipos de los más grandes. Un `Int` NO cabe automáticamente en un `Long` ni en un `Double`.\n\nPara convertir entre tipos numéricos, Kotlin te exige usar métodos explícitos:\n- `.toInt()`: Convierte a entero (trunca decimales si viene de Double).\n- `.toDouble()`: Convierte a decimal de 64 bits.\n- `.toLong()`: Convierte a entero de 64 bits.\n- `.toFloat()`: Convierte a decimal de 32 bits.',
        codeSnippet: `fun main() {
    val entero = 100

    // En Java esto compilaría solo; en Kotlin es ILEGAL sin conversión:
    // val decimal: Double = entero // Error: Type mismatch

    // Forma correcta y explícita de Kotlin:
    val decimal: Double = entero.toDouble()
    val textoNumero = "250".toInt()

    val precioConCentavos = 49.99
    val soloEntero = precioConCentavos.toInt() // Trunca a 49

    println("Entero promovido a Double: $decimal")
    println("Texto convertido a Int: $textoNumero")
    println("Decimal truncado a Int: $soloEntero")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Entero promovido a Double: 100.0
Texto convertido a Int: 250
Decimal truncado a Int: 49`,
        byteTip: 'Usar "texto".toIntOrNull() en lugar de .toInt() previene caídas si el usuario ingresó letras en lugar de números en un formulario.',
        pitfallTip: 'Al convertir un Double a Int con .toInt(), no se redondea: se cortan los decimales. 49.99.toInt() dará 49, no 50. Si quieres redondear, usa math.round().',
        keyPoints: [
          'Kotlin no realiza conversiones numéricas automáticas o implícitas.',
          'Cada tipo primitivo ofrece métodos de conversión dedicados (.toInt(), .toDouble(), etc.).',
          'Esta rigidez elimina por completo errores matemáticos ocultos.'
        ]
      }
    ]
  },
  'kotlin-u02-l11': {
    id: 'kt-th-u02-l11',
    lessonId: 'kotlin-u02-l11',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 11,
    title: '11. String Templates con $variable',
    subtitle: 'La técnica definitiva para ensamblar mensajes sin concatenaciones fragmentadas con +.',
    estimatedMinutes: 5,
    analogy: 'Es como un sello tipográfico donde cambias las letras del día: el mensaje base está listo y solo estampas el valor dinámico donde va la variable.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Interpolación de Identificadores',
        explanation: 'Las plantillas de texto permiten sustituir identificadores dentro de un String anteponiendo el signo `$`. Kotlin se encarga de llamar al método `.toString()` del dato de forma transparente.',
        codeSnippet: `fun main() {
    val pais = "Costa Rica"
    val temperatura = 28.5
    val esSoleado = true

    val informeClima = "Hoy en $pais tenemos $temperatura°C. ¿Día soleado? $esSoleado"
    println(informeClima)
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Hoy en Costa Rica tenemos 28.5°C. ¿Día soleado? true`,
        byteTip: 'Los String Templates funcionan con cualquier tipo de dato: Int, Double, Boolean, Char o incluso objetos personalizados.',
        pitfallTip: 'Si una variable está pegada a una letra sin espacio (ejemplo: "$dolarpesos"), Kotlin creerá que la variable se llama dolarpesos. En ese caso usa llaves: "${dolar}pesos".',
        keyPoints: [
          '$variable interpola de inmediato cualquier valor dentro de comillas dobles.',
          'Mejora la legibilidad del código al evitar fragmentaciones con +.',
          'Convierte automáticamente tipos numéricos a texto.'
        ]
      }
    ]
  },
  'kotlin-u02-l12': {
    id: 'kt-th-u02-l12',
    lessonId: 'kotlin-u02-l12',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 12,
    title: '12. Expresiones en Plantillas con ${...}',
    subtitle: 'Evaluación de cálculos, métodos y llamadas condicionales dentro de un String.',
    estimatedMinutes: 5,
    analogy: 'Las llaves `${}` son como un asistente personal al que le pides un cálculo rápido antes de redactar la carta: "Dime el total con IVA y ponlo aquí en este renglón".',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - SENTENCIA IF - Lección 3',
      channel: 'MoureDev by Brais Moure',
      duration: '18:25',
      url: 'https://www.youtube.com/watch?v=QUGFBYIVs4g',
      summary: 'Aprende a controlar el flujo de tu programa con condicionales if y else evaluando expresiones lógicas y booleanas en español.'
    },
    sections: [
      {
        title: 'Poder Expresivo dentro del String',
        explanation: 'Cuando la interpolación involucra cualquier operación más allá de un identificador solitario, se encierra entre llaves `${}`.',
        codeSnippet: `fun main() {
    val articulos = 4
    val precioUnitario = 15.0

    // Cálculo aritmético
    println("Total: $\${articulos * precioUnitario}")

    // Evaluación condicional en una línea dentro de la plantilla
    val saldo = 50
    println("Estado de cuenta: \${if (saldo >= 0) "Al día" else "En mora"}")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Total: $60.0
Estado de cuenta: Al día`,
        byteTip: 'Puedes meter estructuras if/else completas de una línea dentro de ${} para personalizar mensajes según el estado del usuario.',
        pitfallTip: 'Evita saturar ${} con lógica de negocio pesada de 5 líneas; si la expresión es muy compleja, extráela a una variable previa para mantener el texto legible.',
        keyPoints: [
          '${} permite resolver expresiones compuestas, métodos y lógica condicional.',
          'Conserva el formato limpio y reduce variables temporales.',
          'Es el estándar de la industria en Kotlin.'
        ]
      }
    ]
  },
  'kotlin-u02-l13': {
    id: 'kt-th-u02-l13',
    lessonId: 'kotlin-u02-l13',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 13,
    title: '13. Métodos Esenciales de String',
    subtitle: 'Transformaciones de texto con .uppercase(), .lowercase(), .trim() y .replace().',
    estimatedMinutes: 5,
    analogy: 'Los métodos de String son como herramientas de edición de texto en un procesador de palabras: resaltar en mayúsculas, borrar espacios en blanco o reemplazar una palabra errónea por la correcta.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - TIPOS DE DATOS - Lección 2',
      channel: 'MoureDev by Brais Moure',
      duration: '16:10',
      url: 'https://www.youtube.com/watch?v=uWwVyww30SI',
      summary: 'Domina los tipos numéricos (Int, Double, Float), texto (String, Char) y Booleanos en Kotlin con ejemplos prácticos y concisos.'
    },
    sections: [
      {
        title: 'Caja de Herramientas de Cadenas',
        explanation: 'Kotlin enriquece el tipo String con métodos sumamente expresivos:\n- `.trim()`: Remueve espacios invisibles al principio y al final.\n- `.replace("viejo", "nuevo")`: Sustituye ocurrencias de texto.\n- `.uppercase()` y `.lowercase()`: Ajuste seguro de mayúsculas/minúsculas.\n- `.startsWith("prefijo")` y `.endsWith("sufijo")`: Verificaciones booleanas rápidas.',
        codeSnippet: `fun main() {
    val emailSucio = "   USUARIO@EMPRESA.COM   "
    val emailLimpio = emailSucio.trim().lowercase()

    println("Email normalizado: '$emailLimpio'")

    val plantilla = "Hola [NOMBRE], tu pedido está listo."
    val mensajePersonalizado = plantilla.replace("[NOMBRE]", "Ada")

    println(mensajePersonalizado)
    println("¿Es un correo de empresa? " + emailLimpio.endsWith("@empresa.com"))
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Email normalizado: 'usuario@empresa.com'
Hola Ada, tu pedido está listo.
¿Es un correo de empresa? true`,
        byteTip: 'Normalizar correos con .trim().lowercase() antes de guardarlos en una base de datos evita cuentas duplicadas por errores de tipeo.',
        pitfallTip: 'Recuerda que .replace() no modifica la cadena original en su lugar; retorna un String completamente nuevo con los cambios aplicados.',
        keyPoints: [
          '.trim() limpia caracteres espaciadores en los extremos.',
          '.replace() sustituye textos específicos.',
          'Todos los métodos preservan la inmutabilidad de la cadena original.'
        ]
      }
    ]
  },
  'kotlin-u02-l14': {
    id: 'kt-th-u02-l14',
    lessonId: 'kotlin-u02-l14',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 14,
    title: '14. Strings Multilínea con """',
    subtitle: 'Bloques de texto con saltos de línea preservados, formato WYSIWYG y .trimIndent().',
    estimatedMinutes: 5,
    analogy: 'Un String de triple comilla es como un lienzo en blanco donde escribes un poema con párrafos y sangrías tal cual quieres que se imprima, sin tener que poner \\n al final de cada renglón.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Cadenas Crudas (Raw Strings)',
        explanation: 'Cuando necesitas escribir textos largos con múltiples líneas (como consultas SQL, plantillas JSON, o menús de terminal), poner continuos `\\n` hace que el código sea difícil de leer.\n\nKotlin ofrece los Raw Strings con triple comilla doble (`""" ... """`). Estos strings respetan los saltos de línea literales y no requieren escapar caracteres especiales como comillas o barras invertidas.\n\nLa función `.trimIndent()` elimina la sangría común de la izquierda para que el texto quede alineado al margen.',
        codeSnippet: `fun main() {
    val nombre = "Carlos"
    val balance = 1500

    // String multilínea limpio y legible
    val factura = """
        ================================
               ESTADO DE CUENTA
        ================================
        Cliente : $nombre
        Balance : $$balance USD
        Estado  : Activo
        ================================
    """.trimIndent()

    println(factura)
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `================================
       ESTADO DE CUENTA
================================
Cliente : Carlos
Balance : $1500 USD
Estado  : Activo
================================`,
        byteTip: 'Usa siempre .trimIndent() al final de tus triple comillas para que el texto no herede la sangría del bloque de código donde fue escrito.',
        pitfallTip: 'Dentro de un Raw String las secuencias de escape normales como \\n o \\t no funcionan como escapes; se imprimen literalmente.',
        keyPoints: [
          '""" encierra cadenas multilínea con formato y saltos reales.',
          '.trimIndent() normaliza el margen izquierdo del texto.',
          'Ideal para consultas SQL, payloads JSON y menús de consola.'
        ]
      }
    ]
  },
  'kotlin-u02-l15': {
    id: 'kt-th-u02-l15',
    lessonId: 'kotlin-u02-l15',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 15,
    title: '15. Variables no Inicializadas',
    subtitle: 'Protección férrea del compilador de Kotlin contra la lectura de memoria basura.',
    estimatedMinutes: 5,
    analogy: 'Kotlin es como un inspector de aduanas que jamás te permite subir a un avión si no presentas un boleto válido en mano. No te deja pasar con una "promesa" de comprar el boleto en el aire.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - TIPOS DE DATOS - Lección 2',
      channel: 'MoureDev by Brais Moure',
      duration: '16:10',
      url: 'https://www.youtube.com/watch?v=uWwVyww30SI',
      summary: 'Domina los tipos numéricos (Int, Double, Float), texto (String, Char) y Booleanos en Kotlin con ejemplos prácticos y concisos.'
    },
    sections: [
      {
        title: 'Asignación Definitiva en Tiempo de Compilación',
        explanation: 'En lenguajes como C, si declaras una variable y la lees antes de asignarle un valor, el programa lee cualquier residuo aleatorio ("basura") que haya quedado en esa celda de memoria RAM, provocando comportamientos impredecibles.\n\nKotlin implementa el principio de *Definite Assignment*: el compilador analiza todos los posibles caminos lógicos de tu código y PROHÍBE leer una variable si existe la más mínima posibilidad de que no haya sido inicializada antes.',
        codeSnippet: `fun main() {
    val resultado: Int
    val condicion = true

    if (condicion) {
        resultado = 100
    } else {
        resultado = 0
    }

    // Kotlin sabe que ambos caminos (if y else) le dieron un valor a resultado:
    println("Resultado garantizado: $resultado")

    // Si omites el else, el compilador rechazará la compilación:
    // var noAsignada: String
    // println(noAsignada) // Error: Variable 'noAsignada' must be initialized
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Resultado garantizado: 100`,
        byteTip: 'Si declaras una variable val sin inicializar de inmediato, asegúrate de que todos los caminos de tus ramas if/else le asignen un valor exactamente una vez.',
        pitfallTip: 'Olvidar la rama else al inicializar variables causará: Variable must be initialized, porque el compilador no puede asegurar que la condición siempre se cumpla.',
        keyPoints: [
          'Toda variable debe tener un valor asignado antes de poder ser leída.',
          'El análisis de flujo del compilador previene lecturas de datos basura.',
          'Garantiza estabilidad absoluta en tiempo de ejecución.'
        ]
      }
    ]
  },
  'kotlin-u02-l16': {
    id: 'kt-th-u02-l16',
    lessonId: 'kotlin-u02-l16',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 16,
    title: '16. Constantes de Compilación (const val)',
    subtitle: 'Valores inmutables evaluados antes del tiempo de ejecución que el compilador incrusta directamente en el bytecode.',
    estimatedMinutes: 5,
    analogy: 'Un `const val` es como la velocidad de la luz o el valor de Pi en física: son constantes cósmicas universales que se conocen antes de que el universo empiece a moverse. No dependen de nada.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Constantes de Tiempo de Compilación',
        explanation: '¿Cuál es la diferencia entre `val` y `const val`?\n\n- `val`: Se evalúa en TIEMPO DE EJECUCIÓN (Runtime). Puede calcularse llamando a una función o recibiendo una respuesta del usuario.\n- `const val`: Se evalúa en TIEMPO DE COMPILACIÓN (Compile-time). El compilador reemplaza directamente el valor en el bytecode donde sea usado, logrando rendimiento máximo.\n\nReglas estrictas de `const val`:\n1. Debe declararse a nivel superior (fuera de cualquier función) o dentro de un `object`.\n2. Solo puede inicializarse con tipos primitivos (`Int`, `Double`, `Boolean`, `Char`) o `String`.\n3. Su valor no puede depender de ninguna llamada a función.',
        codeSnippet: `// Declaración de constantes de compilación a nivel superior
const val VERSION_APP = "2.4.0"
const val MAXIMO_INTENTOS_LOGIN = 3
const val PI_EXACTO = 3.1415926535

fun main() {
    println("Versión del sistema: $VERSION_APP")
    println("Intentos permitidos: $MAXIMO_INTENTOS_LOGIN")

    // val normal en tiempo de ejecución:
    val horaActual = System.currentTimeMillis() // Válido en val, ILEGAL en const val
    println("Timestamp actual: $horaActual")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Versión del sistema: 2.4.0
Intentos permitidos: 3
Timestamp actual: 1792021500000`,
        byteTip: 'Por convención oficial de código, los identificadores const val se escriben en MAYÚSCULAS_CON_GUIONES_BAJOS (SCREAMING_SNAKE_CASE).',
        pitfallTip: 'Intentar declarar un "const val" dentro del cuerpo de la función main() dará error: "Modifier \'const\' is not applicable to local variables".',
        keyPoints: [
          'const val se resuelve en tiempo de compilación e incrusta el valor en el bytecode.',
          'Solo se permite a nivel superior o en objetos singleton.',
          'Sigue la convención de estilo SCREAMING_SNAKE_CASE.'
        ]
      }
    ]
  },
  'kotlin-u02-l17': {
    id: 'kt-th-u02-l17',
    lessonId: 'kotlin-u02-l17',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 17,
    title: '17. Desbordamiento de Enteros (Overflow)',
    subtitle: 'Qué ocurre cuando un número supera el límite máximo de Int y cómo evitar pérdidas de datos con Long.',
    estimatedMinutes: 5,
    analogy: 'El desbordamiento es como el odómetro de un automóvil viejo que llega a 999,999 km: al rodar un kilómetro más, no marca un millón, sino que vuelve a 000,000. En enteros con signo, salta directo a los números negativos.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - VARIABLES - Lección',
      channel: 'MoureDev by Brais Moure',
      duration: '14:35',
      url: 'https://www.youtube.com/watch?v=hug4TNmhw78',
      summary: 'Aprende en español la diferencia entre val (inmutable) y var (mutable) en Kotlin, gestión de memoria e inferencia de tipos.'
    },
    sections: [
      {
        title: 'El Ciclo Aritmético en Binario',
        explanation: 'En las computadoras, los tipos numéricos tienen un tamaño fijo en bits. Un `Int` utiliza 32 bits, donde el bit más a la izquierda representa el signo.\n\nCuando sumas 1 a `Int.MAX_VALUE` (`2,147,483,647`), el bit de acarreo altera el bit de signo, provocando que el valor "gire" y se convierta en `Int.MIN_VALUE` (`-2,147,483,648`).\n\nEste fenómeno se denomina *Integer Overflow* (desbordamiento). Para cantidades masivas (visitas de videos globales, transacciones financieras, milisegundos), debes utilizar `Long` (64 bits).',
        codeSnippet: `fun main() {
    val limiteInt = Int.MAX_VALUE
    println("Límite máximo Int: $limiteInt")

    // Desbordamiento silencioso:
    val desbordado = limiteInt + 1
    println("Límite + 1 (desbordado a negativo): $desbordado")

    // Solución correcta: Usar Long (64 bits)
    val numeroSeguro: Long = limiteInt.toLong() + 1L
    println("Resultado seguro con Long: $numeroSeguro")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Límite máximo Int: 2147483647
Límite + 1 (desbordado a negativo): -2147483648
Resultado seguro con Long: 2147483648`,
        byteTip: 'En la historia del software, el video "Gangnam Style" en YouTube rompió el contador de visitas porque usaba un Int de 32 bits. Google tuvo que actualizar su base de datos a enteros de 64 bits (Long).',
        pitfallTip: 'El desbordamiento de enteros no lanza ninguna excepción por defecto en Kotlin; continúa calculando silenciosamente con números negativos erróneos.',
        keyPoints: [
          'Superar Int.MAX_VALUE cicla el valor hacia números negativos.',
          'Para números que superen los 2 mil millones, usa siempre el tipo Long.',
          'Verifica los rangos numéricos al diseñar sistemas financieros o contadores globales.'
        ]
      }
    ]
  },
  'kotlin-u02-l18': {
    id: 'kt-th-u02-l18',
    lessonId: 'kotlin-u02-l18',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 18,
    title: '18. Tipos Numéricos Especiales: Long y Byte',
    subtitle: 'El sufijo L para enteros de 64 bits y la optimización de memoria en bajo nivel con Byte (8 bits).',
    estimatedMinutes: 5,
    analogy: 'Un `Byte` es como una taza pequeña de espresso: ocupa poco espacio y solo le cabe un trago rápido (hasta 127). Un `Long` es como un tanque cisterna que puede contener billones de litros de información.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - BUCLE FOR/WHILE - Lección 7',
      channel: 'MoureDev by Brais Moure',
      duration: '19:15',
      url: 'https://www.youtube.com/watch?v=ln0sub514YQ',
      summary: 'Domina las estructuras repetitivas for y while en Kotlin, iteraciones con rangos .. y control de ciclos paso a paso.'
    },
    sections: [
      {
        title: 'El Espectro de Enteros en Kotlin',
        explanation: 'Kotlin ofrece 4 tipos de enteros según el requerimiento de memoria y magnitud:\n\n1. `Byte` (8 bits): Rango de -128 a 127. Usado en lectura de archivos binarios, sockets de red y criptografía.\n2. `Short` (16 bits): Rango de -32,768 a 32,767.\n3. `Int` (32 bits): El estándar cotidiano.\n4. `Long` (64 bits): Rango descomunal de aproximadamente -9 trillones a +9 trillones. Exige el sufijo `L` al final.',
        codeSnippet: `fun main() {
    // Byte: ahorro extremo de memoria
    val nivelBrillo: Byte = 100

    // Long: valores gigantescos con sufijo L obligatorio
    val poblacionMundial: Long = 8_000_000_000L
    val distanciaEstrellaKm = 9_460_730_472_580L

    println("Nivel de brillo (Byte): $nivelBrillo")
    println("Población del planeta (Long): $poblacionMundial personas")
    println("Distancia interestelar: $distanciaEstrellaKm km")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Nivel de brillo (Byte): 100
Población del planeta (Long): 8000000000 personas
Distancia interestelar: 9460730472580 km`,
        byteTip: 'El sufijo de Long siempre se escribe con L mayúscula (8000L), nunca con l minúscula, para evitar confusiones visuales con el número 1.',
        pitfallTip: 'Si escribes un número que supera los 2 mil millones sin la L al final (ej. val x = 5000000000), el compilador marcará error: "The value is out of range of type Int".',
        keyPoints: [
          'Long ocupa 64 bits (8 bytes) y requiere el sufijo L.',
          'Byte ocupa 8 bits (1 byte) para flujos de red o binarios.',
          'Elegir el tipo numérico adecuado equilibra precisión y uso de memoria.'
        ]
      }
    ]
  },
  'kotlin-u02-l19': {
    id: 'kt-th-u02-l19',
    lessonId: 'kotlin-u02-l19',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 19,
    title: '19. Proyecto: Estado de un Personaje RPG',
    subtitle: 'Diseño integral del modelo de datos de un videojuego: salud, maná, nivel, clase y equipamiento.',
    estimatedMinutes: 6,
    analogy: 'Este proyecto es como diseñar la tarjeta de personaje en un juego de rol de mesa: anotas con pluma inalterable tu nombre y raza (val), y dejas con lápiz borrable tus puntos de vida y experiencia (var) que subirán y bajarán en la aventura.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Arquitectura del Estado del Jugador',
        explanation: 'En este proyecto consolidamos la combinación profesional de:\n- Atributos inmutables (`val`): Nombre, clase del personaje, ID único.\n- Atributos dinámicos (`var`): Puntos de vida (HP), energía (MP), nivel, experiencia.\n- Tipos de datos apropiados: `String`, `Int`, `Double`, `Boolean` y `Char`.',
        codeSnippet: `fun main() {
    // Atributos Inmutables (val)
    val nombreHeroe = "Valquiria"
    val clase = "Guerrera"
    val rangoInicial: Char = 'S'

    // Atributos Dinámicos (var)
    var nivel = 1
    var puntosVida = 100
    var experienciaActual = 0
    var estaVivo = true

    println("=== PERFIL DEL HÉROE ===")
    println("Nombre : $nombreHeroe ($clase)")
    println("Rango  : $rangoInicial")
    println("Nivel  : $nivel")
    println("Salud  : $puntosVida/100")
    println("¿Vivo? : $estaVivo")
    println("========================")

    // Simulación de combate
    println("\\n⚔️ ¡Un dragón ataca e inflige 40 pts de daño!")
    puntosVida -= 40
    experienciaActual += 150

    println("Salud tras el combate: $puntosVida HP")
    println("Experiencia acumulada: $experienciaActual EXP")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `=== PERFIL DEL HÉROE ===
Nombre : Valquiria (Guerrera)
Rango  : S
Nivel  : 1
Salud  : 100/100
¿Vivo? : true
========================

⚔️ ¡Un dragón ataca e inflige 40 pts de daño!
Salud tras el combate: 60 HP
Experiencia acumulada: 150 EXP`,
        byteTip: 'Diseñar modelos con val por defecto y solo var donde sea estrictamente mutable es la base de la arquitectura limpia en Kotlin y Android.',
        pitfallTip: 'Asegúrate de que los atributos críticos que definen la identidad de un objeto (como un ID o nombre primario) nunca se declaren con var.',
        keyPoints: [
          'La identidad inmutable se resguarda con val.',
          'El estado evolutivo se gestiona con var.',
          'La cohesión de tipos garantiza un modelo de datos robusto y sin errores.'
        ]
      }
    ]
  },
  'kotlin-u02-l20': {
    id: 'kt-th-u02-l20',
    lessonId: 'kotlin-u02-l20',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 20,
    title: '20. Desafío de Maestría: Variables y Tipos',
    subtitle: 'Evaluación exhaustiva de dominio técnico: tipado estático, conversiones numéricas y plantillas avanzadas.',
    estimatedMinutes: 6,
    analogy: 'Este desafío final es como la prueba técnica en una entrevista laboral de Google o JetBrains: pondrás a prueba tu capacidad de elegir los tipos exactos, evitar bugs de desbordamiento y escribir código impecable.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Consolidación Teórica y Práctica',
        explanation: '¡Felicitaciones por llegar a la cumbre de la Unidad 2!\n\nHas dominado:\n1. La dualidad inmutable/mutable entre `val` y `var`.\n2. Los tipos enteros (`Byte`, `Short`, `Int`, `Long`) y decimales (`Float`, `Double`).\n3. La verdad binaria de `Boolean` y los caracteres únicos `Char`.\n4. La manipulación moderna de `String` con plantillas `${}` y Raw Strings `"""`.\n5. El rigor del tipado estático y la inferencia inteligente del compilador.',
        codeSnippet: `fun main() {
    val tituloModulo = "Maestría en Variables y Tipos de Datos"
    val leccionesCompletadas = 20
    val puntajeAprobatorio = 100.0

    val mensajeFinal = """
        =============================================
        🏆 CERTIFICADO DE UNIDAD 2 COMPLETADA 🏆
        =============================================
        Módulo      : $tituloModulo
        Lecciones   : $leccionesCompletadas / 20
        Nota Final  : \${puntajeAprobatorio}%
        Estado      : ¡MAESTRÍA OBTENIDA!
        =============================================
    """.trimIndent()

    println(mensajeFinal)
    println("¡Estás listo para conquistar la Unidad 3: Operadores Lógicos!")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `=============================================
🏆 CERTIFICADO DE UNIDAD 2 COMPLETADA 🏆
=============================================
Módulo      : Maestría en Variables y Tipos de Datos
Lecciones   : 20 / 20
Nota Final  : 100.0%
Estado      : ¡MAESTRÍA OBTENIDA!
=============================================
¡Estás listo para conquistar la Unidad 3: Operadores Lógicos!`,
        byteTip: '¡Excelente progreso! Pasa a la sección práctica para desbloquear tus estrellas y reclamar el cofre del bioma.',
        pitfallTip: 'Nunca asumas que conoces un lenguaje hasta que dominas su sistema de tipos. El tipado de Kotlin es tu mayor aliado contra caídas en producción.',
        keyPoints: [
          'Dominas las diferencias y reglas de val vs var.',
          'Comprendes los tamaños en bits y conversiones explícitas.',
          'Estás 100% capacitado para resolver los ejercicios interactivos de la Unidad 2.'
        ]
      }
    ]
  }
};
