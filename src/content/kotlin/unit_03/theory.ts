import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_03_THEORY: Record<string, TheoryLesson> = {
  'kotlin-u03-l01': {
    id: 'kt-th-u03-l01',
    lessonId: 'kotlin-u03-l01',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 1,
    title: '1. Operador de Suma y Concatenación (+)',
    subtitle: 'El operador + realiza suma aritmética entre números y concatenación cuando interviene una cadena de texto.',
    estimatedMinutes: 5,
    analogy: 'El operador `+` es como una cinta adhesiva mágica: si le pegas dos monedas, suma sus valores monetarios en una sola cuenta; pero si le pegas una etiqueta de papel con texto a una moneda, pega el texto al número y crea un letrero.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'La Doble Función del Operador Más (+)',
        explanation: 'En Kotlin, el operador `+` está sobrecargado para realizar dos tareas completamente distintas según el tipo de datos de sus operandos:\n\n1. Suma Aritmética: Si ambos lados son numéricos (`Int`, `Double`, `Float`, `Long`), calcula el resultado matemático directo.\n2. Concatenación de Texto: Si al menos uno de los lados es un `String`, el otro lado se convierte automáticamente a texto y ambos se unen en una nueva cadena.',
        codeSnippet: `fun main() {
    // 1. Suma matemática (ambos numéricos)
    val totalArticulos = 15 + 25
    println("Suma aritmética: $totalArticulos")

    // 2. Concatenación (interviene un String)
    val mensaje = "Nivel alcanzado: " + 10
    println(mensaje)

    // 3. Concatenación encadenada
    val puntuacion = "Puntaje: " + (50 + 50) // Paréntesis obligatorios para sumar primero
    println(puntuacion)
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Suma aritmética: 40
Nivel alcanzado: 10
Puntaje: 100`,
        byteTip: 'En Kotlin moderno siempre se prefieren las plantillas con $ ("Nivel alcanzado: $nivel") sobre la concatenación con +, ya que genera código más legible y optimizado.',
        pitfallTip: 'Cuidado con el orden de izquierda a derecha: "Puntos: " + 10 + 20 produce "Puntos: 1020", porque primero une "Puntos: 10" (String) y luego concatena "20". Para sumar primero, usa paréntesis: "Puntos: " + (10 + 20).',
        keyPoints: [
          'Suma aritmética estricta si ambos operandos son números.',
          'Sobrecarga a concatenación de texto si cualquiera de los lados es String.',
          'Usa paréntesis para forzar sumas matemáticas antes de concatenar.'
        ]
      }
    ]
  },
  'kotlin-u03-l02': {
    id: 'kt-th-u03-l02',
    lessonId: 'kotlin-u03-l02',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 2,
    title: '2. Operadores Aritméticos Básicos (-, *, /)',
    subtitle: 'Resta (-), multiplicación (*) y división (/) directa entre tipos numéricos en la JVM.',
    estimatedMinutes: 5,
    analogy: 'Son las cuatro operaciones de la calculadora básica que usas en el supermercado: restar cupones, multiplicar cantidades de productos idénticos y dividir la cuenta entre comensales.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - FUNCIONES - Lección 9',
      channel: 'MoureDev by Brais Moure',
      duration: '22:40',
      url: 'https://www.youtube.com/watch?v=FmRdWLab5nY',
      summary: 'Crea funciones modulares con parámetros, tipos de retorno y reutilización de lógica algorítmica en Kotlin.'
    },
    sections: [
      {
        title: 'Operaciones Fundamentales y Promoción Numérica',
        explanation: 'Los operadores `-`, `*` y `/` permiten realizar operaciones aritméticas directas entre tipos numéricos.\n\nRegla de Promoción de Tipos:\nSi operas dos datos del mismo tipo (`Int * Int`), el resultado conserva ese tipo (`Int`). Pero si operas un entero con un decimal (`Int * Double`), Kotlin promueve automáticamente el entero a `Double` para que el cálculo conserve su precisión decimal.',
        codeSnippet: `fun main() {
    val precioOriginal = 150.0
    val descuento = 35.0
    val precioFinal = precioOriginal - descuento
    println("Precio con descuento: $\${precioFinal}")

    val cantidad = 4
    val costoUnitario = 12.50
    val costoTotal = cantidad * costoUnitario // Int * Double -> Double
    println("Costo total: $\${costoTotal}")

    val presupuestoTotal = 600.0
    val personas = 3
    val cuotaPorPersona = presupuestoTotal / personas
    println("Cuota por persona: $\${cuotaPorPersona}")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Precio con descuento: $115.0
Costo total: $50.0
Cuota por persona: $200.0`,
        byteTip: 'En Kotlin los operadores están respaldados por métodos de convención: a + b invoca a.plus(b), a - b invoca a.minus(b), y a * b invoca a.times(b).',
        pitfallTip: 'La división entre cero con enteros (5 / 0) arroja una excepción ArithmeticException que detiene el programa. Sin embargo, en decimales (5.0 / 0.0) devuelve "Infinity" sin caerse.',
        keyPoints: [
          'El operador - calcula la diferencia.',
          'El operador * calcula el producto escalar.',
          'Operaciones mixtas entre Int y Double promueven el resultado final a Double.'
        ]
      }
    ]
  },
  'kotlin-u03-l03': {
    id: 'kt-th-u03-l03',
    lessonId: 'kotlin-u03-l03',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 3,
    title: '3. División Entera vs División Decimal y Truncamiento',
    subtitle: 'Cuando ambos operandos son enteros, Kotlin descarta los decimales; aprende a controlarlo conscientemente.',
    estimatedMinutes: 5,
    analogy: 'Imagina que divides 9 manzanas entre 2 niños en una escuela donde está prohibido cortar fruta con cuchillos: cada niño recibe 4 manzanas enteras y sobra 1 manzana en la mesa. La división entera es 4, no 4.5.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Truncamiento Estricto hacia Cero',
        explanation: 'En Kotlin, la división entre dos enteros (`Int / Int`) SIEMPRE produce otro entero (`Int`). Cualquier parte decimal se trunca inmediatamente hacia cero; no se redondea ni hacia arriba ni al más cercano.\n\nPara que la división conserve su precisión fraccional, al menos uno de los dos lados debe ser un número decimal (`Double` o `Float`).',
        codeSnippet: `fun main() {
    val a = 9
    val b = 2

    // 1. División entera (pierde el .5)
    val resultadoEntero = a / b
    println("9 / 2 (entero truncado): $resultadoEntero")

    // 2. División decimal con .toDouble()
    val resultadoDecimal = a.toDouble() / b
    println("9.toDouble() / 2 (decimal exacto): $resultadoDecimal")

    // 3. Cálculo de promedio escolar correcto
    val nota1 = 8
    val nota2 = 9
    val nota3 = 10
    val promedio = (nota1 + nota2 + nota3) / 3.0 // Dividir entre 3.0 promueve a Double
    println("Promedio con 3.0: $promedio")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `9 / 2 (entero truncado): 4
9.toDouble() / 2 (decimal exacto): 4.5
Promedio con 3.0: 9.0`,
        byteTip: 'Al calcular promedios o porcentajes, divide siempre entre un literal decimal como 2.0 o 100.0 para asegurar precisión sin llamar a .toDouble().',
        pitfallTip: 'Escribir (a / b).toDouble() convierte a Double DESPUÉS de que los decimales ya se perdieron. (9 / 2).toDouble() dará 4.0, no 4.5.',
        keyPoints: [
          'Int / Int siempre trunca hacia cero el residuo.',
          'Basta con que un operando sea Double para que la división sea decimal.',
          'Convierte antes de operar, no después del truncamiento.'
        ]
      }
    ]
  },
  'kotlin-u03-l04': {
    id: 'kt-th-u03-l04',
    lessonId: 'kotlin-u03-l04',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 4,
    title: '4. Operador Módulo (%) y Cálculo de Residuos',
    subtitle: 'El operador % devuelve el residuo exacto que sobra de la división entera.',
    estimatedMinutes: 5,
    analogy: 'El operador `%` es como comprar paquetes de 6 refrescos para una fiesta de 14 invitados: compras 2 paquetes de 6 (12 refrescos) y te sobran 2 personas por atender. El residuo es 2.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Extracción de Residuos y Patrones Circulares',
        explanation: 'El operador Módulo `%` calcula el residuo matemático tras efectuar la división entera entre dos números.\n\nAplicaciones esenciales en desarrollo:\n1. Paridad: Un número es par si `n % 2 == 0`.\n2. Extracción de dígitos: `numero % 10` siempre entrega el último dígito a la derecha de cualquier número entero (ejemplo: `158 % 10` es `8`).\n3. Conversión de tiempo: Pasar segundos a minutos y segundos sobrantes: `segundosTotales % 60`.',
        codeSnippet: `fun main() {
    // 1. Detección de paridad
    val numero = 24
    val esPar = (numero % 2 == 0)
    println("¿El número $numero es par? $esPar")

    // 2. Descomposición de tiempo (segundos a minutos + segundos)
    val tiempoTotalSegundos = 135
    val minutos = tiempoTotalSegundos / 60     // 2 minutos enteros
    val segundosResto = tiempoTotalSegundos % 60 // 15 segundos sobrantes
    println("Tiempo transcurrido: \${minutos}m \${segundosResto}s")

    // 3. Extracción de último dígito
    val codigoPin = 4928
    val ultimoDigito = codigoPin % 10
    println("El último dígito del PIN es: $ultimoDigito")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿El número 24 es par? true
Tiempo transcurrido: 2m 15s
El último dígito del PIN es: 8`,
        byteTip: 'En Kotlin el signo del resultado de % coincide siempre con el signo del dividendo (el número a la izquierda).',
        pitfallTip: 'Nunca uses módulo con divisor 0 (ej. x % 0), provocará una excepción crítica de división por cero.',
        keyPoints: [
          'numero % 2 == 0 comprueba paridad en números enteros.',
          'numero % 10 extrae el último dígito de cualquier cifra.',
          'segundos % 60 extrae los segundos restantes tras formar minutos completos.'
        ]
      }
    ]
  },
  'kotlin-u03-l05': {
    id: 'kt-th-u03-l05',
    lessonId: 'kotlin-u03-l05',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 5,
    title: '5. Precedencia y Jerarquía de Operaciones Matemáticas',
    subtitle: 'El orden PEMDAS estricto: paréntesis, multiplicación/división/módulo, y finalmente suma y resta.',
    estimatedMinutes: 5,
    analogy: 'La precedencia de operadores es como el protocolo de emergencia de un hospital: los pacientes en código rojo (paréntesis) van primero a quirófano sin hacer fila; luego van las urgencias medias (multiplicación y división); y las consultas rutinarias (sumas y restas) se atienden al final.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Jerarquía Universal PEMDAS en Kotlin',
        explanation: 'En Kotlin, los cálculos matemáticos se resuelven bajo un orden estricto:\n1. Paréntesis `()` (máxima jerarquía).\n2. Multiplicación `*`, División `/` y Módulo `%` (se evalúan de izquierda a derecha a igual nivel).\n3. Suma `+` y Resta `-` (menor nivel de jerarquía).',
        codeSnippet: `fun main() {
    // Caso 1: La multiplicación y división ganan prioridad
    val r1 = 100 - 20 / 2 * 3
    // Paso a paso: 20 / 2 = 10 -> 10 * 3 = 30 -> 100 - 30 = 70
    println("Resultado por jerarquía: $r1")

    // Caso 2: Forzando la resta primero con paréntesis
    val r2 = (100 - 20) / (2 * 3)
    // Paso a paso: (80) / (6) = 13 (entero truncado)
    println("Resultado con paréntesis: $r2")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Resultado por jerarquía: 70
Resultado con paréntesis: 13`,
        byteTip: 'No dependas de la memoria de tus compañeros de equipo sobre la tabla de precedencias; si una fórmula tiene más de dos operadores, envuelve en paréntesis cada subcálculo.',
        pitfallTip: 'Omitir paréntesis en el denominador de una fórmula científica como x / (y * z) provocará que se evalúe (x / y) * z, multiplicando en lugar de dividir.',
        keyPoints: [
          'Paréntesis tienen prioridad máxima absoluta.',
          '*, / y % tienen la misma jerarquía y se resuelven de izquierda a derecha.',
          'Los paréntesis documentan la intención matemática del desarrollador.'
        ]
      }
    ]
  },
  'kotlin-u03-l06': {
    id: 'kt-th-u03-l06',
    lessonId: 'kotlin-u03-l06',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 6,
    title: '6. Operadores de Asignación Compuesta (+=, -=, *=, /=, %=)',
    subtitle: 'Combinación concisa de una operación aritmética con la reasignación de la variable en un solo paso.',
    estimatedMinutes: 5,
    analogy: 'En lugar de decir en una tienda: "Toma mi saldo actual, réstale diez dólares y anota el nuevo resultado en mi libreta", dices de forma directa y compacta: "Descuéntame diez dólares" (-= 10).',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Aritmética y Reasignación Abreviada',
        explanation: 'En los programas es extremadamente habitual actualizar una variable sumándole o restándole un valor a sí misma:\n`puntos = puntos + 10`\n\nKotlin ofrece los operadores de asignación compuesta, que comprimen esta instrucción en un formato más elegante y conciso:\n- `x += y` equivale a `x = x + y`\n- `x -= y` equivale a `x = x - y`\n- `x *= y` equivale a `x = x * y`\n- `x /= y` equivale a `x = x / y`\n- `x %= y` equivale a `x = x % y`',
        codeSnippet: `fun main() {
    var saldoCuenta = 500.0

    saldoCuenta += 200.0 // Depósito de $200 (ahora 700.0)
    println("Tras depósito: $\${saldoCuenta}")

    saldoCuenta -= 50.0  // Retiro de $50 (ahora 650.0)
    println("Tras retiro: $\${saldoCuenta}")

    saldoCuenta *= 1.05  // Interés del 5%
    println("Con rendimiento: $\${saldoCuenta}")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Tras depósito: $700.0
Tras retiro: $650.0
Con rendimiento: $682.5`,
        byteTip: 'Los operadores de asignación compuesta exigen estrictamente que la variable haya sido declarada con var; sobre un val arrojarán error de compilación.',
        pitfallTip: 'Cuidado con escribir =+ en lugar de +=. x =+ 5 no suma 5; asigna el número positivo +5 a la variable, sobreescribiendo el valor previo.',
        keyPoints: [
          '+=, -=, *=, /= y %= aplican la operación y guardan el resultado de inmediato.',
          'Evitan tener que repetir el nombre largo de la variable dos veces.',
          'Requieren que la variable sea mutable (var).'
        ]
      }
    ]
  },
  'kotlin-u03-l07': {
    id: 'kt-th-u03-l07',
    lessonId: 'kotlin-u03-l07',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 7,
    title: '7. Operadores de Incremento y Decremento (++ y --)',
    subtitle: 'Aumento o reducción instantánea en 1 de variables numéricas mutables.',
    estimatedMinutes: 5,
    analogy: 'El operador `++` es como el botón de un contador de mano de los guardias de seguridad en un concierto: cada vez que entra una persona, presionas el botón una vez y el marcador salta exactamente en +1.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Atajos para Contar de Uno en Uno',
        explanation: 'En programación, contar de uno en uno es la operación más repetida en bucles y estadísticas. En lugar de escribir `contador = contador + 1` o `contador += 1`, Kotlin proporciona los operadores unarios:\n- `++` (Incremento): Suma 1 a la variable.\n- `--` (Decremento): Resta 1 a la variable.',
        codeSnippet: `fun main() {
    var turnoActual = 1
    println("Inicia el turno: $turnoActual")

    turnoActual++ // Pasa al turno 2
    println("Siguiente turno: $turnoActual")

    var vidas = 3
    vidas-- // Pierde una vida (2)
    println("Vidas restantes: $vidas")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Inicia el turno: 1
Siguiente turno: 2
Vidas restantes: 2`,
        byteTip: 'Usa ++ y -- en sentencias aisladas en su propia línea para que el código sea 100% legible y predecible.',
        pitfallTip: 'No intentes aplicar ++ a una variable val inmutable; causará el error Val cannot be reassigned.',
        keyPoints: [
          '++ suma exactamente 1 a la variable.',
          '-- resta exactamente 1 a la variable.',
          'Requiere que la variable sea de tipo numérico mutable (var).'
        ]
      }
    ]
  },
  'kotlin-u03-l08': {
    id: 'kt-th-u03-l08',
    lessonId: 'kotlin-u03-l08',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 8,
    title: '8. Diferencia entre Prefijo y Postfijo (++x vs x++)',
    subtitle: 'El orden de evaluación: incrementar antes de entregar el valor vs entregar el valor y luego incrementar.',
    estimatedMinutes: 5,
    analogy: 'Imagina que pagas un boleto de autobús: en modalidad prefija (++x), pagas primero el boleto en la ventanilla y luego subes al bus con el nuevo número de asiento; en modalidad postfija (x++), te sientas en el asiento asignado original y al salir te cobran el incremento.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Mecánica de Evaluación en la Expresión',
        explanation: 'La posición de los operadores `++` o `--` con respecto a la variable altera de forma crítica el valor devuelto durante la evaluación de la línea:\n\n1. Prefijo (`++x`):\n- Primero se incrementa la variable en memoria.\n- Luego se evalúa y entrega el NUEVO valor incrementado a la expresión.\n\n2. Postfijo (`x++`):\n- Primero se entrega el valor ACTUAL (original) a la expresión.\n- Luego de evaluada la expresión, la variable se incrementa en memoria.',
        codeSnippet: `fun main() {
    // 1. Prefijo (++a): Incrementa PRIMERO, entrega DESPUÉS
    var a = 5
    val resultadoPrefijo = ++a // a pasa a 6, y resultadoPrefijo recibe 6
    println("Prefijo -> a: $a, asignado: $resultadoPrefijo")

    // 2. Postfijo (b++): Entrega PRIMERO, incrementa DESPUÉS
    var b = 5
    val resultadoPostfijo = b++ // resultadoPostfijo recibe 5, luego b pasa a 6
    println("Postfijo -> b: $b, asignado: $resultadoPostfijo")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Prefijo -> a: 6, asignado: 6
Postfijo -> b: 6, asignado: 5`,
        byteTip: 'Regla de estilo en Kotlin moderno: nunca uses ++x o x++ dentro de fórmulas complejas como print(x++ + ++y). Separa el incremento en su propio renglón para que nadie tenga que adivinar.',
        pitfallTip: 'Confundir prefijo y postfijo al acceder a índices de listas (lista[i++]) es una fuente común de desfase por uno (Off-by-one error).',
        keyPoints: [
          '++x (prefijo) incrementa antes de leer el valor.',
          'x++ (postfijo) lee el valor actual y luego lo incrementa.',
          'Al finalizar la instrucción, en ambos casos la variable termina con el mismo valor.'
        ]
      }
    ]
  },
  'kotlin-u03-l09': {
    id: 'kt-th-u03-l09',
    lessonId: 'kotlin-u03-l09',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 9,
    title: '9. Operadores de Comparación Relacional (>, <, >=, <=)',
    subtitle: 'Comparaciones de orden numérico que siempre producen un resultado booleano (true o false).',
    estimatedMinutes: 5,
    analogy: 'Los operadores relacionales son como la regla con marca de altura en la entrada de una montaña rusa: "Para subir debes medir al menos 140 cm (altura >= 140)". Si cumples la condición entras (true); si no, te quedas fuera (false).',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - VARIABLES - Lección',
      channel: 'MoureDev by Brais Moure',
      duration: '14:35',
      url: 'https://www.youtube.com/watch?v=hug4TNmhw78',
      summary: 'Aprende en español la diferencia entre val (inmutable) y var (mutable) en Kotlin, gestión de memoria e inferencia de tipos.'
    },
    sections: [
      {
        title: 'Evaluación de Magnitud y Límites',
        explanation: 'Los operadores relacionales comparan dos valores numéricos o cualquier tipo que implemente la interfaz `Comparable` (como fechas o caracteres):\n- `>`: Mayor que\n- `<`: Menor que\n- `>=`: Mayor o igual que (incluye el límite)\n- `<=`: Menor o igual que (incluye el límite)\n\nEl resultado de evaluar un operador relacional siempre es un valor de tipo `Boolean` (`true` o `false`).',
        codeSnippet: `fun main() {
    val edadUsuario = 18
    val precioBoleto = 50.0
    val saldoBilletera = 50.0

    // Comparaciones
    val esMayorDeEdad = (edadUsuario >= 18)    // true (incluye el 18)
    val puedeComprar = (saldoBilletera >= precioBoleto) // true (alcanza exacto)
    val esMenorDeEdad = (edadUsuario < 18)     // false

    println("¿Es mayor de edad? $esMayorDeEdad")
    println("¿Tiene fondos suficientes? $puedeComprar")
    println("¿Es menor de edad? $esMenorDeEdad")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿Es mayor de edad? true
¿Tiene fondos suficientes? true
¿Es menor de edad? false`,
        byteTip: 'Los operadores relacionales tienen menor prioridad que los operadores aritméticos: a + 5 > b resolverá primero la suma a + 5 y luego la comparación.',
        pitfallTip: 'Cuidado con escribir => o =< en lugar de >= o <=. El signo igual siempre va a la derecha.',
        keyPoints: [
          '>= y <= incluyen el valor límite exacto en la evaluación.',
          'Siempre producen un tipo Boolean como resultado.',
          'Son la base de las validaciones en if, when y filtros de colecciones.'
        ]
      }
    ]
  },
  'kotlin-u03-l10': {
    id: 'kt-th-u03-l10',
    lessonId: 'kotlin-u03-l10',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 10,
    title: '10. Desafío de Punto Medio: Álgebra y Lógica Operacional',
    subtitle: 'Consolidación de aritmética, módulos, precedencia PEMDAS y comparaciones en un caso práctico.',
    estimatedMinutes: 6,
    analogy: 'Es como el examen de mitad de período: une todo lo aprendido sobre cálculos de tiendas, descuentos y comparaciones de límites en un solo ejercicio.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - VARIABLES - Lección',
      channel: 'MoureDev by Brais Moure',
      duration: '14:35',
      url: 'https://www.youtube.com/watch?v=hug4TNmhw78',
      summary: 'Aprende en español la diferencia entre val (inmutable) y var (mutable) en Kotlin, gestión de memoria e inferencia de tipos.'
    },
    sections: [
      {
        title: 'Integración Operacional',
        explanation: 'En este nivel consolidamos las operaciones matemáticas y relacionales en un algoritmo de liquidación de compras:\n1. Cálculo de subtotal con multiplicación.\n2. Aplicación de porcentaje de descuento.\n3. Cálculo de impuestos.\n4. Comparación relacional de fondos.',
        codeSnippet: `fun main() {
    val cantidadPrendas = 3
    val precioUnitario = 40.0
    val tasaDescuento = 0.10 // 10% de descuento
    val tasaIva = 0.16       // 16% de IVA

    val subtotal = cantidadPrendas * precioUnitario
    val montoDescuento = subtotal * tasaDescuento
    val baseImponible = subtotal - montoDescuento
    val totalPagar = baseImponible * (1 + tasaIva)

    val dineroCliente = 150.0
    val compraAprobada = dineroCliente >= totalPagar

    println("Subtotal: $\${subtotal}")
    println("Descuento (10%): $\${montoDescuento}")
    println("Total con IVA: $\${totalPagar}")
    println("¿Compra aprobada con $\${dineroCliente}? $compraAprobada")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Subtotal: $120.0
Descuento (10%): $12.0
Total con IVA: $125.28
¿Compra aprobada con $150.0? true`,
        byteTip: 'Divide fórmulas financieras complejas en variables intermedias con nombres claros (subtotal, descuento, baseImponible) en lugar de hacer todo en una sola línea incomprensible.',
        pitfallTip: 'Verifica siempre que los porcentajes estén expresados en fracción decimal (0.10 en lugar de 10) al multiplicar directamente.',
        keyPoints: [
          'La descomposición de fórmulas complejas en pasos modulares previene errores de precedencia.',
          'Las comparaciones relacionales finales resumen la toma de decisiones en un booleano.',
          'Estás listo para dominar los operadores lógicos AND, OR y NOT.'
        ]
      }
    ]
  },
  'kotlin-u03-l11': {
    id: 'kt-th-u03-l11',
    lessonId: 'kotlin-u03-l11',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 11,
    title: '11. Igualdad Estructural (==) vs Desigualdad (!=)',
    subtitle: 'Comprobación segura del contenido de variables con traducción automática a .equals() a prueba de nulos.',
    estimatedMinutes: 5,
    analogy: 'La igualdad estructural `==` es como comparar dos copias impresas del mismo libro: no importa si fueron impresas en imprentas distintas; si contienen exactamente las mismas palabras, página por página, son iguales en contenido.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - TIPOS DE DATOS - Lección 2',
      channel: 'MoureDev by Brais Moure',
      duration: '16:10',
      url: 'https://www.youtube.com/watch?v=uWwVyww30SI',
      summary: 'Domina los tipos numéricos (Int, Double, Float), texto (String, Char) y Booleanos en Kotlin con ejemplos prácticos y concisos.'
    },
    sections: [
      {
        title: 'Comparación Segura de Contenido',
        explanation: 'En Kotlin, el operador `==` comprueba igualdad estructural: analiza si dos variables contienen el mismo valor o significado.\n\nInternamente, cuando escribes `a == b`, Kotlin lo traduce de forma segura a:\n`a?.equals(b) ?: (b === null)`\n\nEsto significa que puedes comparar cadenas de texto, números y objetos sin temor a que el programa se caiga con una excepción `NullPointerException`. Para verificar si son diferentes, se utiliza `!=`.',
        codeSnippet: `fun main() {
    val texto1 = "Kotlin"
    val texto2 = "Kot" + "lin"

    // Comprobando contenido con ==
    println("¿Mismo contenido? " + (texto1 == texto2)) // true

    val n1 = 42
    val n2 = 42
    println("¿Números iguales? " + (n1 == n2)) // true

    // Desigualdad
    val estadoActual = "PENDIENTE"
    val esDiferente = (estadoActual != "COMPLETADO")
    println("¿Aún no está completado? $esDiferente") // true
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿Mismo contenido? true
¿Números iguales? true
¿Aún no está completado? true`,
        byteTip: 'En Kotlin casi nunca necesitarás escribir texto.equals(otro); el operador == es el estándar oficial recomendado por JetBrains.',
        pitfallTip: 'La igualdad de texto es sensible a mayúsculas. "Kotlin" == "kotlin" es false. Si quieres comparar ignorando mayúsculas, usa texto1.equals(texto2, ignoreCase = true).',
        keyPoints: [
          '== compara el contenido estructural de objetos y strings.',
          '!= verifica si los contenidos son distintos.',
          'Es 100% seguro contra valores null.'
        ]
      }
    ]
  },
  'kotlin-u03-l12': {
    id: 'kt-th-u03-l12',
    lessonId: 'kotlin-u03-l12',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 12,
    title: '12. Igualdad Referencial (===) vs Identidad de Memoria (!==)',
    subtitle: 'Verificación de si dos referencias apuntan exactamente al mismo espacio físico en la memoria RAM.',
    estimatedMinutes: 5,
    analogy: 'La igualdad referencial `===` es como verificar si dos llaves abren exactamente la misma casa física, o si son dos casas idénticas construidas en calles distintas con los mismos planos.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Identidad de Instancias en Memoria',
        explanation: 'En Kotlin coexisten dos niveles de igualdad:\n\n1. Igualdad Estructural (`==`): ¿Tienen el mismo contenido?\n2. Igualdad Referencial (`===`): ¿Son literalmente el mismo objeto ocupando la misma dirección en la memoria RAM?\n\nSi dos variables apuntan a la misma dirección física en el montículo (heap), `a === b` evalúa a `true`. Si son dos objetos distintos creados por separado con idénticos datos, `a == b` será `true`, pero `a === b` será `false`.',
        codeSnippet: `fun main() {
    // Para primitivos en la JVM optimizados, == y === coinciden:
    val x = 100
    val y = 100
    println("Primitivos x == y: \${x == y}")   // true
    println("Primitivos x === y: \${x === y}") // true

    // Objetos con memorias separadas:
    val lista1 = listOf(1, 2, 3)
    val lista2 = listOf(1, 2, 3)
    val referenciaMismaLista = lista1

    println("Contenido lista1 == lista2: \${lista1 == lista2}")       // true (mismo contenido)
    println("Referencia lista1 === lista2: \${lista1 === lista2}")   // false (instancias distintas)
    println("Misma referencia: \${lista1 === referenciaMismaLista}") // true (misma celda)
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Primitivos x == y: true
Primitivos x === y: true
Contenido lista1 == lista2: true
Referencia lista1 === lista2: false
Misma referencia: true`,
        byteTip: 'En el 99% de tu código cotidiano en Kotlin usarás ==. El triple igual === se reserva para algoritmos de optimización de rendimiento o comparación de singletons.',
        pitfallTip: 'Usar === cuando solo querías comparar datos provocará que objetos con contenido idéntico sean considerados diferentes.',
        keyPoints: [
          '== compara contenido (valor).',
          '=== compara referencia física en memoria RAM.',
          '!== verifica que dos variables apunten a instancias distintas.'
        ]
      }
    ]
  },
  'kotlin-u03-l13': {
    id: 'kt-th-u03-l13',
    lessonId: 'kotlin-u03-l13',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 13,
    title: '13. Conjunción Lógica AND (&&) y Tablas de Verdad',
    subtitle: 'El operador && evalúa a true si y solo si AMBOS operandos son verdaderos de forma simultánea.',
    estimatedMinutes: 5,
    analogy: 'El operador `&&` es como la bóveda de seguridad de un banco que requiere dos llaves físicas simultáneas: la llave del gerente Y la llave del auditor. Si falta cualquiera de las dos, la bóveda no se abre.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'La Regla de Exigencia Total',
        explanation: 'El operador lógico `&&` (AND / Conjunción) combina dos expresiones booleanas. La regla es absoluta:\n`true && true = true`\nSi cualquiera de los dos lados es `false`, el resultado completo es automáticamente `false`.\n\nTabla de Verdad del AND:\n- `true && true` -> `true`\n- `true && false` -> `false`\n- `false && true` -> `false`\n- `false && false` -> `false`',
        codeSnippet: `fun main() {
    val edad = 20
    val tieneLicenciaConducir = true
    val estaSobrio = true

    // Para poder conducir se deben cumplir TODAS las condiciones
    val puedeConducir = (edad >= 18) && tieneLicenciaConducir && estaSobrio
    println("¿Autorizado para conducir? $puedeConducir")

    val tieneAuto = false
    println("¿Puede salir de viaje? " + (puedeConducir && tieneAuto))
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿Autorizado para conducir? true
¿Puede salir de viaje? false`,
        byteTip: '&& tiene menor jerarquía que los operadores relacionales; por ello puedes escribir edad >= 18 && saldo > 0 sin necesidad de envolver cada lado en paréntesis.',
        pitfallTip: 'No confíes en que el segundo lado se evalúe si el primero fue false: Kotlin utiliza evaluación de cortocircuito (short-circuit).',
        keyPoints: [
          '&& requiere que todos sus operandos sean true para devolver true.',
          'Basta con un solo false para que toda la expresión resulte false.',
          'Ideal para validaciones de seguridad con múltiples requisitos obligatorios.'
        ]
      }
    ]
  },
  'kotlin-u03-l14': {
    id: 'kt-th-u03-l14',
    lessonId: 'kotlin-u03-l14',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 14,
    title: '14. Disyunción Lógica OR (||) y Tablas de Verdad',
    subtitle: 'El operador || produce true si AL MENOS UNO de sus operandos es verdadero.',
    estimatedMinutes: 5,
    analogy: 'El operador `||` es como pagar en una tienda que acepta efectivo O tarjeta de crédito: con cualquiera de las dos formas de pago que tengas puedes comprar; solo te rechazan si no tienes ni efectivo ni tarjeta.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'La Regla de Flexibilidad',
        explanation: 'El operador lógico `||` (OR / Disyunción) evalúa a `true` siempre que al menos uno de sus lados sea verdadero. Solo devuelve `false` cuando ambos lados son falsos de forma estricta.\n\nTabla de Verdad del OR:\n- `true || true` -> `true`\n- `true || false` -> `true`\n- `false || true` -> `true`\n- `false || false` -> `false`',
        codeSnippet: `fun main() {
    val esFinDeSemana = true
    val esDiaFeriado = false
    val tieneVacacionesAprobadas = false

    // Se descansa si es fin de semana O feriado O vacaciones
    val puedeDescansar = esFinDeSemana || esDiaFeriado || tieneVacacionesAprobadas
    println("¿El empleado descansa hoy? $puedeDescansar")

    val esDiaLaborable = false
    val tieneGuardiaEmergencia = false
    println("¿Debe asistir a la oficina? " + (esDiaLaborable || tieneGuardiaEmergencia))
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿El empleado descansa hoy? true
¿Debe asistir a la oficina? false`,
        byteTip: 'Coloca la condición que sea más probable que resulte true a la izquierda de ||; gracias al cortocircuito, ahorrarás tiempo de CPU.',
        pitfallTip: 'Cuidado al combinar && y || en la misma línea: && tiene mayor prioridad que || y se resolverá antes, lo que puede alterar tu lógica si no usas paréntesis.',
        keyPoints: [
          '|| devuelve true si al menos uno de los lados es true.',
          'Solo devuelve false si absolutamente todos los lados son false.',
          'Perfecto para caminos alternativos y permisos flexibles.'
        ]
      }
    ]
  },
  'kotlin-u03-l15': {
    id: 'kt-th-u03-l15',
    lessonId: 'kotlin-u03-l15',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 15,
    title: '15. Evaluación de Cortocircuito (Short-circuit Evaluation)',
    subtitle: 'Optimización vital donde el segundo operando no se evalúa si el primero ya definió el resultado.',
    estimatedMinutes: 5,
    analogy: 'Es como un árbitro en un partido con regla de "gol de oro": en cuanto entra el primer gol, el partido termina de inmediato; nadie sigue jugando los minutos restantes porque el resultado ya está sellado.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Optimización y Protección de Ejecución',
        explanation: 'Kotlin utiliza Evaluación de Cortocircuito (*Short-circuit Evaluation*) en operadores lógicos:\n\n1. En `a && b`:\nSi `a` es `false`, el resultado final será obligatoriamente `false`. Por lo tanto, la computadora NO SE MOLESTA en evaluar `b`.\n\n2. En `a || b`:\nSi `a` es `true`, el resultado final será obligatoriamente `true`. Por ende, `b` JAMÁS se ejecuta.\n\nEsta característica es un salvavidas colosal para escribir condiciones de guarda seguras sin anidar múltiples `if`.',
        codeSnippet: `fun main() {
    val divisor = 0
    val dividendo = 100

    // Protección con cortocircuito:
    // Si divisor != 0 es false, NUNCA se ejecuta (dividendo / divisor > 2)
    // evitando una caída por división entre cero:
    val divisionSegura = (divisor != 0) && (dividendo / divisor > 2)
    println("¿División válida y mayor a 2? $divisionSegura")

    // Protección con Strings nulos
    val texto: String? = null
    val esTextoLargo = (texto != null) && (texto.length > 5)
    println("¿Texto válido y largo? $esTextoLargo")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿División válida y mayor a 2? false
¿Texto válido y largo? false`,
        byteTip: 'Coloca siempre la condición de seguridad a la izquierda (ej. lista.isNotEmpty() && lista[0] == 10) para aprovechar el cortocircuito.',
        pitfallTip: 'Si colocas una llamada con efectos secundarios a la derecha de && o || (como enviar un correo o actualizar un contador), ten en cuenta que podría no ejecutarse si el lado izquierdo hizo cortocircuito.',
        keyPoints: [
          'false && expresion nunca evalúa la expresión de la derecha.',
          'true || expresion nunca evalúa la expresión de la derecha.',
          'Permite escribir guardias seguras contra nulos y divisiones por cero.'
        ]
      }
    ]
  },
  'kotlin-u03-l16': {
    id: 'kt-th-u03-l16',
    lessonId: 'kotlin-u03-l16',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 16,
    title: '16. Operador de Negación Lógica NOT (!)',
    subtitle: 'El operador unario que invierte el valor de cualquier expresión booleana: true se vuelve false y viceversa.',
    estimatedMinutes: 5,
    analogy: 'El operador `!` es como un interruptor inversor o un espejo retrovisor: si la luz está verde, la cambia a roja; si una puerta dice "OCUPADO", al negarlo sabes que "NO ESTÁ OCUPADO" (está libre).',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Inversión de Valor Booleano',
        explanation: 'El operador de negación lógica `!` es un operador unario (actúa sobre un solo elemento). Invierte el valor de verdad:\n- `!true` resulta en `false`\n- `!false` resulta en `true`\n\nTiene una prioridad alta y se coloca pegado al identificador o expresión booleana.',
        codeSnippet: `fun main() {
    val servidorCaido = false
    val servidorDisponible = !servidorCaido
    println("¿Servidor listo para recibir tráfico? $servidorDisponible")

    val listaVacia = true
    if (!listaVacia) {
        println("Hay elementos para procesar")
    } else {
        println("La lista no contiene datos para mostrar.")
    }
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿Servidor listo para recibir tráfico? true
La lista no contiene datos para mostrar.`,
        byteTip: 'En Kotlin existen métodos con nombres afirmativos como .isNotEmpty() que son mucho más claros que escribir !lista.isEmpty().',
        pitfallTip: 'Evita a toda costa la doble negación como !(!usuarioInactivo). Hace que quien lea el código deba detenerse a descifrar qué quisiste decir.',
        keyPoints: [
          '!true es false, y !false es true.',
          'Invierte el resultado de cualquier expresión booleana.',
          'Úsalo con moderación para preservar la claridad del código.'
        ]
      }
    ]
  },
  'kotlin-u03-l17': {
    id: 'kt-th-u03-l17',
    lessonId: 'kotlin-u03-l17',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 17,
    title: '17. Operadores Bit a Bit en Kotlin (shl, shr, and, or, xor, inv)',
    subtitle: 'A diferencia de otros lenguajes con símbolos crípticos como << o &, Kotlin usa funciones infijas legibles.',
    estimatedMinutes: 5,
    analogy: 'Las operaciones a nivel de bit son como una fila de 8 interruptores miniatura donde cada uno enciende un foco independiente: puedes encender o apagar un foco específico sin tocar los demás usando una máscara de bits.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - TIPOS DE DATOS - Lección 2',
      channel: 'MoureDev by Brais Moure',
      duration: '16:10',
      url: 'https://www.youtube.com/watch?v=uWwVyww30SI',
      summary: 'Domina los tipos numéricos (Int, Double, Float), texto (String, Char) y Booleanos en Kotlin con ejemplos prácticos y concisos.'
    },
    sections: [
      {
        title: 'Manipulación de Bits con Funciones Infijas',
        explanation: 'En muchos lenguajes se utilizan símbolos como `<<`, `>>`, `&`, `|` y `^` para operar bits, lo que genera confusión con operadores lógicos. Kotlin decidió reemplazarlos por funciones infijas en palabras claras:\n- `shl`: Shift Left (desplazamiento a la izquierda, multiplica por potencias de 2)\n- `shr`: Shift Right (desplazamiento a la derecha, divide entre 2)\n- `and`: Bitwise AND (ambos bits en 1)\n- `or`: Bitwise OR (al menos un bit en 1)\n- `xor`: Bitwise XOR (bits diferentes)\n- `.inv()`: Invierte todos los bits (complemento a 1)',
        codeSnippet: `fun main() {
    // Desplazamiento de bits: 1 shl 2 desplaza 0001 dos posiciones a 0100 (4)
    val bitShift = 1 shl 2
    println("1 shl 2 = $bitShift")

    // Banderas de permisos con OR y AND
    val PERMISO_LEER = 1   // 0001
    val PERMISO_ESCRIBIR = 2 // 0010

    // Asignar ambos permisos combinando con or
    val misPermisos = PERMISO_LEER or PERMISO_ESCRIBIR // 0011 (3)
    println("Permisos combinados: $misPermisos")

    // Verificar si tiene permiso de lectura con and
    val puedeLeer = (misPermisos and PERMISO_LEER) != 0
    println("¿Tiene permiso de leer? $puedeLeer")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `1 shl 2 = 4
Permisos combinados: 3
¿Tiene permiso de leer? true`,
        byteTip: 'Las operaciones bitwise son extremadamente comunes en desarrollo de videojuegos, emuladores, criptografía y compresión de archivos.',
        pitfallTip: 'No confundas el operador lógico booleano && con la función bitwise and. && opera sobre Booleans; and opera sobre números enteros bit a bit.',
        keyPoints: [
          'Kotlin usa funciones infijas legibles (shl, shr, and, or, xor).',
          '.inv() es un método regular para invertir bits.',
          'Permite un control de bajo nivel ultraeficiente.'
        ]
      }
    ]
  },
  'kotlin-u03-l18': {
    id: 'kt-th-u03-l18',
    lessonId: 'kotlin-u03-l18',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 18,
    title: '18. Expresiones Combinadas: Lógica y Aritmética Compleja',
    subtitle: 'Cómo se resuelven fórmulas del mundo real que mezclan matemáticas, relaciones y lógica booleana simultánea.',
    estimatedMinutes: 5,
    analogy: 'Es como el algoritmo de aprobación de un crédito bancario: primero calcula tu ingreso mensual neto menos deudas (aritmética), luego compara si supera el mínimo (relacional), y finalmente verifica que tu historial esté limpio Y tengas aval (lógica booleana).',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - FUNCIONES - Lección 9',
      channel: 'MoureDev by Brais Moure',
      duration: '22:40',
      url: 'https://www.youtube.com/watch?v=FmRdWLab5nY',
      summary: 'Crea funciones modulares con parámetros, tipos de retorno y reutilización de lógica algorítmica en Kotlin.'
    },
    sections: [
      {
        title: 'El Embudo de los Tres Niveles de Evaluación',
        explanation: 'Cuando una sola expresión mezcla números, comparaciones y operadores lógicos, la computadora la resuelve en un estricto orden de 3 fases:\n\n1. Fase 1 (Aritmética): Se resuelven sumas, restas, productos y divisiones.\n2. Fase 2 (Relacional): Se evalúan las comparaciones (`>`, `<`, `==`, `>=`) transformando números en `true` o `false`.\n3. Fase 3 (Lógica): Se resuelven las conjunciones (`&&`) y disyunciones (`||`).',
        codeSnippet: `fun main() {
    val edad = 22
    val saldoCuenta = 85.0
    val precioBoleto = 40.0
    val tieneInvitacionVip = false

    // Expresión combinada de 3 fases:
    // Fase 1: (saldoCuenta >= precioBoleto * 2) -> (85.0 >= 80.0) -> true
    // Fase 2: (edad >= 18) -> true
    // Fase 3: (true && true) || false -> true
    val puedeEntrarConAcompanante = (edad >= 18 && saldoCuenta >= precioBoleto * 2) || tieneInvitacionVip

    println("¿Aprobado con acompañante? $puedeEntrarConAcompanante")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿Aprobado con acompañante? true`,
        byteTip: 'Si una expresión combinada supera los 3 operadores, extráela en variables booleanas con nombres semánticos como tieneEdadValida, tieneFondosSuficientes.',
        pitfallTip: 'El operador && tiene mayor precedencia que ||. En a || b && c, se evaluará primero b && c. Si querías que el OR se evaluara primero, debes poner paréntesis: (a || b) && c.',
        keyPoints: [
          'Aritmética primero, comparaciones después, operadores lógicos al final.',
          '&& tiene mayor jerarquía que ||.',
          'La modularidad en variables descriptivas salva vidas en revisiones de código.'
        ]
      }
    ]
  },
  'kotlin-u03-l19': {
    id: 'kt-th-u03-l19',
    lessonId: 'kotlin-u03-l19',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 19,
    title: '19. Buenas Prácticas de Legibilidad con Paréntesis',
    subtitle: 'Cómo escribir condiciones diáfanas y autodocumentadas que cualquier desarrollador entienda en un segundo.',
    estimatedMinutes: 5,
    analogy: 'Los paréntesis en código son como los signos de puntuación en un texto legal: colocarlos en el lugar correcto evita que una cláusula se interprete de forma contraria a lo que el autor pretendía.',
    video: {
      title: 'KOTLIN: Curso ANDROID desde CERO - VARIABLES - Lección',
      channel: 'MoureDev by Brais Moure',
      duration: '14:35',
      url: 'https://www.youtube.com/watch?v=hug4TNmhw78',
      summary: 'Aprende en español la diferencia entre val (inmutable) y var (mutable) en Kotlin, gestión de memoria e inferencia de tipos.'
    },
    sections: [
      {
        title: 'Paréntesis Defensivos y Claridad Visual',
        explanation: 'En programación profesional, el código se lee 10 veces más de lo que se escribe. Aunque el compilador conozca a la perfección la tabla de precedencias, obligar a otro programador a memorizar si `&&` gana sobre `||` o `^` es una pésima práctica.\n\nLos paréntesis estratégicos eliminan cualquier duda, no consumen ciclos de CPU en la JVM y protegen el código contra refactorizaciones erróneas.',
        codeSnippet: `fun main() {
    val esAdmin = false
    val esEditor = true
    val documentoPublicado = true
    val tieneClaveEspecial = false

    // DIFÍCIL DE LEER Y PROPENSO A DUDAS:
    val accesoConfuso = esAdmin || esEditor && documentoPublicado || tieneClaveEspecial

    // LIMPIO, AUTODOCUMENTADO Y ROBUSTO:
    val accesoClaro = esAdmin || (esEditor && documentoPublicado) || tieneClaveEspecial

    println("Acceso confuso: $accesoConfuso")
    println("Acceso claro  : $accesoClaro")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Acceso confuso: true
Acceso claro  : true`,
        byteTip: 'Si una condición no cabe cómodamente en 80 caracteres de ancho de pantalla, divide cada cláusula entre paréntesis en un nuevo renglón con sangría.',
        pitfallTip: 'No confíes en que tus compañeros de equipo recuerden la precedencia de operadores raros. Si tienes que pensar más de 2 segundos, pon paréntesis.',
        keyPoints: [
          'Los paréntesis no tienen penalización de rendimiento en compilación ni ejecución.',
          'Hacen la intención del autor inmediatamente evidente para todo el equipo.',
          'Son obligatorios para alterar el orden natural de && y ||.'
        ]
      }
    ]
  },
  'kotlin-u03-l20': {
    id: 'kt-th-u03-l20',
    lessonId: 'kotlin-u03-l20',
    pathId: 'kotlin',
    unitId: 3,
    levelId: 20,
    title: '20. Desafío Maestro de Unidad: Motor de Reglas y Condiciones',
    subtitle: 'Construcción integral de un motor de validación de reglas de negocio para un sistema de despacho logístico internacional.',
    estimatedMinutes: 6,
    analogy: 'Este proyecto final es como la torre de control de un aeropuerto internacional: recibe datos meteorológicos, estado de la pista y combustible de la aeronave, y con una serie de compuertas lógicas decide en milisegundos si autoriza el despegue de forma segura.',
    video: {
      title: 'Curso de KOTLIN Desde Cero: Primeros Pasos en una hora',
      channel: 'MoureDev by Brais Moure',
      duration: '58:20',
      url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
      summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
    },
    sections: [
      {
        title: 'Arquitectura del Motor Logístico',
        explanation: 'En este nivel cumbre de la Unidad 3 creamos un motor de validación de envíos de comercio electrónico que integra:\n1. Validación física de paquetes (peso y dimensiones).\n2. Evaluación de categoría de cliente (VIP o estándar).\n3. Verificación de cobertura geográfica y saldo de cuenta.',
        codeSnippet: `fun main() {
    println("==============================================")
    println("      MOTOR LOGÍSTICO DE DESPACHO KOTLIN      ")
    println("==============================================")

    val pesoPaqueteKg = 18.5
    val largoCm = 40.0
    val anchoCm = 30.0
    val altoCm = 20.0

    val esClienteVip = true
    val distanciaKm = 120.0
    val saldoCuenta = 350.0
    val costoEnvioBase = 45.0

    // Regla 1: Dimensiones físicas permitidas
    val pesoValido = pesoPaqueteKg <= 30.0
    val sumaDimensiones = largoCm + anchoCm + altoCm
    val dimensionesValidas = sumaDimensiones <= 150.0

    // Regla 2: Cobertura de entrega
    val coberturaExpress = esClienteVip || (distanciaKm < 100.0)

    // Regla 3: Solvencia económica
    val fondosSuficientes = saldoCuenta >= costoEnvioBase

    // Regla Maestra: Despacho autorizado
    val despachoAutorizado = (pesoValido && dimensionesValidas) && coberturaExpress && fondosSuficientes

    println("Peso válido (<= 30kg)       : $pesoValido")
    println("Dimensiones válidas (<=150cm): $dimensionesValidas ($sumaDimensiones cm)")
    println("Cobertura express aprobada  : $coberturaExpress")
    println("Fondos suficientes          : $fondosSuficientes")
    println("----------------------------------------------")
    println("¿DESPACHO GLOBAL AUTORIZADO?: $despachoAutorizado")
    println("==============================================")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `==============================================
      MOTOR LOGÍSTICO DE DESPACHO KOTLIN      
==============================================
Peso válido (<= 30kg)       : true
Dimensiones válidas (<=150cm): true (90.0 cm)
Cobertura express aprobada  : true
Fondos suficientes          : true
----------------------------------------------
¿DESPACHO GLOBAL AUTORIZADO?: true
==============================================`,
        byteTip: '¡Felicitaciones monumentales! Has completado el curso completo de Kotlin Fundamentos. Dominas la computación, el tipado estático, la inmutabilidad y los operadores lógicos profesionales.',
        pitfallTip: 'Al programar motores de reglas, asegúrate de registrar en consola o en un log qué subcondición falló para que el cliente reciba un mensaje de error específico.',
        keyPoints: [
          'Un motor de reglas orquesta operadores aritméticos, relacionales y lógicos.',
          'Las variables intermedias autodocumentan cada regla de negocio.',
          'Estás 100% listo para conquistar las evaluaciones prácticas del track de Kotlin.'
        ]
      }
    ]
  }
};
