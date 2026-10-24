export type ShieldElementType = 'syntax' | 'logic' | 'memory';

export interface BossPatchOption {
  code: string;
  description: string;
}

export interface BossStageChallenge {
  id: string;
  attackName: string;
  shieldElement: ShieldElementType;
  shieldElementName: string;
  prompt: string;
  codeSnippet: string;
  targetLine: number; // Línea que se corrige
  options: BossPatchOption[];
  correctOptionIndex: number;
  explanation: string;
  damageToBoss: number;
  counterDamageToPlayer: number;
  teacherHint: string;
}

export interface BossData {
  id: string;
  unitId: number;
  pathId: 'kotlin' | 'sql';
  name: string;
  title: string;
  avatarType: 'glitch_bug' | 'iron_titan' | 'cyber_specter' | 'hydra_beast' | 'vortex_core' | 'emperor_mech' | 'sentinel_shield';
  element: ShieldElementType;
  primaryColor: string;
  accentColor: string;
  description: string;
  stages: BossStageChallenge[];
}

export const KOTLIN_BOSSES_DATA: Record<number, BossData> = {
  1: {
    id: 'kotlin-u01-boss',
    unitId: 1,
    pathId: 'kotlin',
    name: 'Bugzilla el Desbordador',
    title: 'Monstruo de las Variables y Tipos Primitivos',
    avatarType: 'glitch_bug',
    element: 'syntax',
    primaryColor: '#FF2A6D',
    accentColor: '#FFE600',
    description: 'Una entidad rebelde nacida de variables reasignadas ilegalmente y tipos incompatibles.',
    stages: [
      {
        id: 'k01-s1',
        attackName: 'Corrupción de Inmutabilidad VAL',
        shieldElement: 'syntax',
        shieldElementName: 'Sintaxis de Variables',
        prompt: 'El servidor rechaza la ejecución al intentar modificar NUCLEO_ID. ¿Cómo debe declararse para permitir el cambio?',
        codeSnippet: 'val NUCLEO_ID = 404\nval estado = "En línea"\nNUCLEO_ID = 200\nprintln("Núcleo: $NUCLEO_ID ($estado)")',
        targetLine: 1,
        options: [
          { code: 'var NUCLEO_ID = 404', description: 'Declarar con var en la línea 1 para permitir reasignar el valor' },
          { code: 'val NUCLEO_ID = 200', description: 'Redeclarar val con el nuevo valor en la línea 3' },
          { code: 'NUCLEO_ID.set(200)', description: 'Invocar método .set(200) sobre la variable' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin, las variables declaradas con "val" son de solo lectura. Para reasignar su valor más adelante, deben declararse con "var".',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'En Kotlin, "val" es inmutable (constante) y "var" es mutable (variable).'
      },
      {
        id: 'k01-s2',
        attackName: 'Disparo de Incompatibilidad de Tipos',
        shieldElement: 'memory',
        shieldElementName: 'Tipado Estático',
        prompt: 'El compilador arroja Type Mismatch en nivelSeguridad. ¿Cuál es el tipo de dato correcto para almacenar texto?',
        codeSnippet: 'val servidor = "Producción"\nval nivelSeguridad: Int = "ALTO"\nval puerto = 8080\nprintln("$servidor seguro en puerto $puerto")',
        targetLine: 2,
        options: [
          { code: 'val nivelSeguridad: String = "ALTO"', description: 'Cambiar el tipo a String para aceptar cadenas de texto' },
          { code: 'val nivelSeguridad: Int = ALTO', description: 'Remover las comillas dejando una variable no declarada' },
          { code: 'val nivelSeguridad: Char = "ALTO"', description: 'Cambiar a tipo Char de un solo carácter' }
        ],
        correctOptionIndex: 0,
        explanation: 'Kotlin tiene tipado estático estricto. Un texto delimitado por comillas dobles ("ALTO") siempre es de tipo String, no Int.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Para valores de texto entre comillas dobles, el tipo de dato siempre es String.'
      },
      {
        id: 'k01-s3',
        attackName: 'Interpolación de Cadenas Ineficiente',
        shieldElement: 'logic',
        shieldElementName: 'String Templates',
        prompt: '¿Cuál es la forma moderna e idiomática de inyectar variables en una cadena en Kotlin?',
        codeSnippet: 'val heroe = "Coder"\nval nivel = 10\nval mensaje = "Héroe: " + heroe + " (Nivel: " + nivel + ")"\nprintln(mensaje)',
        targetLine: 3,
        options: [
          { code: 'val mensaje = "Héroe: $heroe (Nivel: $nivel)"', description: 'Usar String Templates con prefijo $ para incrustar variables limpiamente' },
          { code: 'val mensaje = "Héroe: {heroe} (Nivel: {nivel})"', description: 'Usar llaves sin el prefijo $' },
          { code: 'val mensaje = "Héroe: %heroe (Nivel: %nivel)"', description: 'Usar signo de porcentaje %' }
        ],
        correctOptionIndex: 0,
        explanation: 'Los String Templates de Kotlin permiten interpolar variables dentro de comillas simplemente usando el símbolo $nombreVariable.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'En Kotlin se incrustan variables en cadenas usando el símbolo de dólar ($).'
      }
    ]
  },
  2: {
    id: 'kotlin-u02-boss',
    unitId: 2,
    pathId: 'kotlin',
    name: 'Inmutable Titán',
    title: 'Coloso de las Conversiones y Tipos Numéricos',
    avatarType: 'iron_titan',
    element: 'memory',
    primaryColor: '#00E5FF',
    accentColor: '#38BDF8',
    description: 'Una mole blindada que rechaza conversiones implícitas entre tipos numéricos.',
    stages: [
      {
        id: 'k02-s1',
        attackName: 'Bloqueo de Conversión Numérica',
        shieldElement: 'syntax',
        shieldElementName: 'Conversión Numérica',
        prompt: 'Kotlin no convierte automáticamente enteros a decimales. ¿Cómo se asigna el valor entero a la variable Double?',
        codeSnippet: 'val entero: Int = 10\nval factor = 2.5\nval decimal: Double = entero\nval total = decimal * factor',
        targetLine: 3,
        options: [
          { code: 'val decimal: Double = entero.toDouble()', description: 'Convertir explícitamente usando la función .toDouble()' },
          { code: 'val decimal: Double = (Double) entero', description: 'Casteo estilo Java con paréntesis (no soportado en Kotlin)' },
          { code: 'val decimal: Double = entero as Double', description: 'Cast inseguro que genera excepción de ejecución' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin no existen conversiones implícitas entre números; debes llamar explícitamente a métodos como .toDouble(), .toInt(), etc.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Usa la función de conversión explícita .toDouble() sobre el número entero.'
      },
      {
        id: 'k02-s2',
        attackName: 'Truncamiento por División Entera',
        shieldElement: 'logic',
        shieldElementName: 'División de Decimales',
        prompt: 'La división 5 / 2 da 2.0 en lugar de 2.5 porque ambos operandos son enteros. ¿Cómo se obtiene el decimal exacto?',
        codeSnippet: 'val a = 5\nval b = 2\nval division: Double = (a / b).toDouble()\nprintln("Promedio: $division")',
        targetLine: 3,
        options: [
          { code: 'val division: Double = a.toDouble() / b', description: 'Convertir al menos un operando a Double antes de operar' },
          { code: 'val division: Double = (a / b) + 0.5', description: 'Sumar 0.5 manualmente al resultado' },
          { code: 'val division: Double = (a // b).toDouble()', description: 'Usar operador de doble barra // inexistente en Kotlin' }
        ],
        correctOptionIndex: 0,
        explanation: 'Si divides dos enteros (5 / 2), el resultado es un entero (2). Si conviertes uno a Double (5.0 / 2), el resultado es 2.5.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Para que una división produzca decimales, al menos uno de los números debe ser Double antes de la división.'
      },
      {
        id: 'k02-s3',
        attackName: 'Incompatibilidad de Carácter Literal',
        shieldElement: 'syntax',
        shieldElementName: 'Tipos Char y String',
        prompt: 'La variable está tipada como Char, pero el valor fue escrito con comillas dobles. ¿Cómo se corrige?',
        codeSnippet: 'val codigo = 101\nval inicial: Char = "A"\nval activo = true\nprintln("Código: $inicial-$codigo")',
        targetLine: 2,
        options: [
          { code: "val inicial: Char = 'A'", description: 'Usar comillas simples para literales de tipo Char' },
          { code: 'val inicial: Char = "A".toString()', description: 'Convertir a String con método .toString()' },
          { code: 'val inicial: Char = 65', description: 'Asignar el número ASCII directo sin conversión' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin, los caracteres (Char) siempre se encierran entre comillas simples (\'A\'). Las comillas dobles ("A") son para String.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Los caracteres individuales de tipo Char van entre comillas simples (\'A\').'
      }
    ]
  },
  3: {
    id: 'kotlin-u03-boss',
    unitId: 3,
    pathId: 'kotlin',
    name: 'Espectro Aritmético',
    title: 'Fantasma de los Operadores y Tablas de Verdad',
    avatarType: 'cyber_specter',
    element: 'logic',
    primaryColor: '#A855F7',
    accentColor: '#38BDF8',
    description: 'Una entidad que altera el orden de evaluación de expresiones y condiciones lógicas.',
    stages: [
      {
        id: 'k03-s1',
        attackName: 'Distorsión de Precedencia Aritmética',
        shieldElement: 'logic',
        shieldElementName: 'Precedencia de Operadores',
        prompt: 'El cálculo debe sumar 2 + 3 primero y luego multiplicar por 4 para dar 20. ¿Cómo forzar ese orden?',
        codeSnippet: 'val base = 2\nval incremento = 3\nval factor = 4\nval total = base + incremento * factor',
        targetLine: 4,
        options: [
          { code: 'val total = (base + incremento) * factor', description: 'Agrupar con paréntesis (base + incremento) para sumar primero' },
          { code: 'val total = base + (incremento * factor)', description: 'Mantener la multiplicación primero con paréntesis' },
          { code: 'val total = base * factor + incremento', description: 'Multiplicar la base por el factor primero' }
        ],
        correctOptionIndex: 0,
        explanation: 'La multiplicación (*) tiene mayor precedencia que la suma (+). Para forzar la suma primero, se debe agrupar entre paréntesis.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Usa paréntesis ( ) para controlar qué operaciones se ejecutan primero.'
      },
      {
        id: 'k03-s2',
        attackName: 'Falso Operador Lógico de Acceso',
        shieldElement: 'logic',
        shieldElementName: 'Operadores Booleanos',
        prompt: 'El sistema debe permitir acceso solo si el usuario está autenticado Y además tiene pase activo. ¿Qué operador se debe usar?',
        codeSnippet: 'val autenticado = true\nval tienePase = false\nval puedeIngresar = autenticado || tienePase\nprintln("Acceso concedido: $puedeIngresar")',
        targetLine: 3,
        options: [
          { code: 'val puedeIngresar = autenticado && tienePase', description: 'Usar AND (&&) para exigir que ambas condiciones sean verdaderas' },
          { code: 'val puedeIngresar = !autenticado', description: 'Negar el estado de autenticación' },
          { code: 'val puedeIngresar = autenticado == tienePase', description: 'Verificar si ambos booleanos son iguales' }
        ],
        correctOptionIndex: 0,
        explanation: 'El operador && (AND) requiere que ambas condiciones se cumplan. El operador || (OR) permite acceso con que una sola sea cierta.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Para requerir dos condiciones obligatorias al mismo tiempo, usa el operador && (AND).'
      },
      {
        id: 'k03-s3',
        attackName: 'Asignación en Comparación',
        shieldElement: 'syntax',
        shieldElementName: 'Operador de Comparación',
        prompt: 'La variable de verificación intenta comparar con un solo signo igual (=). ¿Cuál es el operador de igualdad?',
        codeSnippet: 'val claveCorrecta = "secret"\nval claveIngresada = "secret"\nval coincide = claveIngresada = claveCorrecta\nprintln("Resultado: $coincide")',
        targetLine: 3,
        options: [
          { code: 'val coincide = claveIngresada == claveCorrecta', description: 'Usar el doble igual (==) para comparar igualdad de valor' },
          { code: 'val coincide = claveIngresada.equals_strict(claveCorrecta)', description: 'Método inexistente' },
          { code: 'val coincide = claveIngresada != claveCorrecta', description: 'Operador de desigualdad' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin, = se usa para asignar valores a variables, mientras que == se utiliza para comparar si dos valores son iguales.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Para comparar igualdad en Kotlin, siempre se usa el doble igual (==).'
      }
    ]
  },
  4: {
    id: 'kotlin-u04-boss',
    unitId: 4,
    pathId: 'kotlin',
    name: 'La Hidra de Bifurcaciones',
    title: 'Monstruo de los Condicionales If y When',
    avatarType: 'hydra_beast',
    element: 'logic',
    primaryColor: '#EF4444',
    accentColor: '#F59E0B',
    description: 'Una bestia de múltiples cabezas que exige que todas las ramas de control estén cubiertas.',
    stages: [
      {
        id: 'k04-s1',
        attackName: 'Ruptura de Exhaustividad en WHEN',
        shieldElement: 'syntax',
        shieldElementName: 'Expresiones When',
        prompt: 'Al usar when como expresión asignada a una variable, el compilador exige cubrir todos los casos. ¿Qué rama falta?',
        codeSnippet: 'val nota = 16\nval evaluacion = when (nota) {\n    in 18..20 -> "Excelente"\n    in 14..17 -> "Aprobado"\n}',
        targetLine: 5,
        options: [
          { code: '    else -> "Reprobado"', description: 'Agregar la rama "else ->" para cubrir cualquier otro valor' },
          { code: '    default -> "Reprobado"', description: 'default pertenece a Java/C#, no a Kotlin' },
          { code: '    case _ -> "Reprobado"', description: 'Sintaxis ajena a Kotlin' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin, cuando when retorna un valor que se asigna a una variable, debe ser exhaustivo y tener una cláusula "else ->".',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'En las expresiones when de Kotlin, el caso por defecto se escribe con "else ->".'
      },
      {
        id: 'k04-s2',
        attackName: 'Rango Numérico Invertido',
        shieldElement: 'logic',
        shieldElementName: 'Operador de Rango in',
        prompt: 'La condición "in 10..1" evalúa siempre como falsa porque el operador .. solo avanza hacia arriba. ¿Cómo corregirlo?',
        codeSnippet: 'val puntos = 7\nval enRango = puntos in 10..1\nif (enRango) {\n    println("Puntaje válido")\n}',
        targetLine: 2,
        options: [
          { code: 'val enRango = puntos in 1..10', description: 'Escribir el rango de menor a mayor (1..10)' },
          { code: 'val enRango = puntos in 10 downTo 1', description: 'Usar downTo para crear una progresión descendente' },
          { code: 'val enRango = puntos in [1, 10]', description: 'Sintaxis de corchetes no válida para rangos' }
        ],
        correctOptionIndex: 0,
        explanation: 'El operador .. en Kotlin solo crea rangos ascendentes (menor .. mayor). 10..1 crea un rango vacío.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Los rangos creados con .. deben escribirse en orden ascendente: menor..mayor.'
      },
      {
        id: 'k04-s3',
        attackName: 'If sin Rama Else Asignado',
        shieldElement: 'syntax',
        shieldElementName: 'If como Expresión',
        prompt: 'En Kotlin, si asignas un if a una variable, debe tener obligatoriamente su contraparte else. ¿Cómo completarlo?',
        codeSnippet: 'val edad = 20\nval categoria = if (edad >= 18) "Adulto"\nprintln("Categoría: $categoria")',
        targetLine: 2,
        options: [
          { code: 'val categoria = if (edad >= 18) "Adulto" else "Menor"', description: 'Agregar la cláusula else obligatoria' },
          { code: 'val categoria = if (edad >= 18) "Adulto" elif "Menor"', description: 'elif no existe en Kotlin' },
          { code: 'val categoria = (edad >= 18) ? "Adulto" : "Menor"', description: 'El operador ternario ? : no existe en Kotlin' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin no existe el operador ternario (? :). El if actúa como expresión y debe incluir tanto la rama if como la rama else.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Siempre que uses if como expresión para asignar un valor, debes incluir la rama else.'
      }
    ]
  },
  5: {
    id: 'kotlin-u05-boss',
    unitId: 5,
    pathId: 'kotlin',
    name: 'Bucle Infinito del Caos',
    title: 'Guardián de los Ciclos y Condiciones de Parada',
    avatarType: 'vortex_core',
    element: 'logic',
    primaryColor: '#F59E0B',
    accentColor: '#10B981',
    description: 'Un vórtice que atrapa la memoria en ciclos infinitos al olvidar modificar la variable de control.',
    stages: [
      {
        id: 'k05-s1',
        attackName: 'Ciclo While sin Incremento',
        shieldElement: 'logic',
        shieldElementName: 'Bucles While',
        prompt: 'Este bucle while nunca termina porque "contador" siempre vale 1. ¿Qué instrucción debe agregarse dentro del bucle?',
        codeSnippet: 'var contador = 1\nwhile (contador <= 5) {\n    println("Paso $contador")\n}',
        targetLine: 4,
        options: [
          { code: '    contador++', description: 'Incrementar la variable en 1 en cada iteración (contador++)' },
          { code: '    contador = 1', description: 'Reasignar el valor a 1' },
          { code: '    break while', description: 'Sintaxis errónea de escape' }
        ],
        correctOptionIndex: 0,
        explanation: 'En un bucle while, la variable evaluada en la condición debe actualizarse en el cuerpo para alcanzar eventualmente la salida.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Dentro del cuerpo del while, incrementa la variable con contador++.'
      },
      {
        id: 'k05-s2',
        attackName: 'Paso en Bucle For Inválido',
        shieldElement: 'syntax',
        shieldElementName: 'Iteración con Step',
        prompt: 'Se requiere recorrer los números del 1 al 10 avanzando de 2 en 2. ¿Cuál es la palabra clave correcta en Kotlin?',
        codeSnippet: 'val limite = 10\nfor (i in 1..limite + 2) {\n    println("Número: $i")\n}',
        targetLine: 2,
        options: [
          { code: 'for (i in 1..limite step 2) {', description: 'Usar la palabra clave step para definir el incremento de dos en dos' },
          { code: 'for (i in 1..limite by 2) {', description: 'Usar la palabra clave by' },
          { code: 'for (i in 1..limite; i += 2) {', description: 'Sintaxis de for clásico estilo C' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin, para especificar el paso o salto entre iteraciones de un rango se utiliza la palabra clave "step": 1..10 step 2.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Usa la palabra clave "step" para indicar el tamaño de paso de un bucle for.'
      },
      {
        id: 'k05-s3',
        attackName: 'Break Incondicional Prematuro',
        shieldElement: 'logic',
        shieldElementName: 'Control de Salida con Break',
        prompt: 'El bucle se detiene en la primera vuelta porque el break no está condicionado. ¿Cómo detenerse solo cuando num sea 5?',
        codeSnippet: 'for (num in 1..10) {\n    break\n    println("Procesando $num")\n}',
        targetLine: 2,
        options: [
          { code: '    if (num == 5) break', description: 'Condicionar el break con un if para detenerse al llegar a 5' },
          { code: '    continue', description: 'Saltar a la siguiente vuelta de forma incondicional' },
          { code: '    return for', description: 'Sintaxis no válida' }
        ],
        correctOptionIndex: 0,
        explanation: 'Un break sin condición dentro de un ciclo termina la ejecución inmediatamente en la primera vuelta. Debe condicionarse con if.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Usa "if (condición) break" para detener el ciclo solo en el momento adecuado.'
      }
    ]
  },
  6: {
    id: 'kotlin-u06-boss',
    unitId: 6,
    pathId: 'kotlin',
    name: 'Guardián del Alcance Modular',
    title: 'Señor de las Funciones, Parámetros y Ámbitos',
    avatarType: 'sentinel_shield',
    element: 'syntax',
    primaryColor: '#10B981',
    accentColor: '#38BDF8',
    description: 'Un centinela blindado que custodia el paso de argumentos y el tipo de retorno de las funciones.',
    stages: [
      {
        id: 'k06-s1',
        attackName: 'Omisión de Retorno Obligatorio',
        shieldElement: 'syntax',
        shieldElementName: 'Retorno de Funciones',
        prompt: 'La función indica que devuelve un Int, pero no tiene la instrucción para retornar el valor. ¿Cómo se devuelve "res"?',
        codeSnippet: 'fun duplicar(n: Int): Int {\n    val res = n * 2\n    println("Calculado: $res")\n}',
        targetLine: 4,
        options: [
          { code: '    return res', description: 'Usar la palabra reservada return seguida de la variable res' },
          { code: '    output res', description: 'output no es palabra reservada en Kotlin' },
          { code: '    send res', description: 'send no es sintaxis válida de retorno' }
        ],
        correctOptionIndex: 0,
        explanation: 'Si una función define un tipo de retorno (como : Int), debe devolver un valor compatible mediante la sentencia "return".',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Para devolver un resultado desde una función, usa la palabra "return".'
      },
      {
        id: 'k06-s2',
        attackName: 'Reasignación de Parámetro',
        shieldElement: 'memory',
        shieldElementName: 'Parámetros Inmutables',
        prompt: 'El compilador da error al intentar reasignar "salario". ¿Por qué ocurre y cómo se resuelve?',
        codeSnippet: 'fun calcularBono(salario: Int): Int {\n    salario = salario + 500\n    return salario\n}',
        targetLine: 2,
        options: [
          { code: '    val total = salario + 500\n    return total', description: 'Crear una nueva variable local porque los parámetros de función son inmutables (val)' },
          { code: '    var salario = salario + 500\n    return salario', description: 'Redeclarar el parámetro con var' },
          { code: '    salario.set(salario + 500)\n    return salario', description: 'Invocar método .set()' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin, todos los parámetros de las funciones son automáticamente inmutables (val) y no pueden reasignarse. Debes crear una variable local.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Los parámetros de las funciones en Kotlin son val inmutables; crea una nueva variable con val total = ...'
      },
      {
        id: 'k06-s3',
        attackName: 'Parámetro por Defecto en Posición Incorrecta',
        shieldElement: 'syntax',
        shieldElementName: 'Valores por Defecto',
        prompt: '¿Cuál es la forma recomendada e idiomática de definir parámetros con valores por defecto?',
        codeSnippet: 'fun registrar(rol: String = "Alumno", nombre: String) {\n    println("Registrado: $nombre con rol $rol")\n}',
        targetLine: 1,
        options: [
          { code: 'fun registrar(nombre: String, rol: String = "Alumno") {', description: 'Ubicar los parámetros obligatorios primero y los que tienen valor por defecto al final' },
          { code: 'fun registrar(rol: String := "Alumno", nombre: String) {', description: 'Usar sintaxis :=' },
          { code: 'fun registrar(rol: default "Alumno", nombre: String) {', description: 'Usar la palabra clave default' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin se recomienda colocar los parámetros con valores por defecto al final para poder omitirlos fácilmente al invocar la función.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Coloca los parámetros con valor por defecto al final de la lista de parámetros.'
      }
    ]
  },
  7: {
    id: 'kotlin-u07-boss',
    unitId: 7,
    pathId: 'kotlin',
    name: 'NullPointer Emperador',
    title: 'Monarca de los Punteros Nulos y el Operador Elvis',
    avatarType: 'emperor_mech',
    element: 'syntax',
    primaryColor: '#EC4899',
    accentColor: '#8B5CF6',
    description: 'El gobernante del abismo de los bloqueos por referencia nula. Solo el operador Elvis puede destronarlo.',
    stages: [
      {
        id: 'k07-s1',
        attackName: 'Llamada Insegura sobre Tipo Nulable',
        shieldElement: 'syntax',
        shieldElementName: 'Safe Call Operator',
        prompt: 'La variable usuario puede ser nula (String?). El compilador no permite acceder con punto simple. ¿Cómo acceder de forma segura?',
        codeSnippet: 'val usuario: String? = null\nval longitud = usuario.length\nprintln("Longitud: $longitud")',
        targetLine: 2,
        options: [
          { code: 'val longitud = usuario?.length', description: 'Usar el operador de llamada segura (?.)' },
          { code: 'val longitud = usuario!.length', description: 'Usar signo de admiración simple' },
          { code: 'val longitud = usuario->length', description: 'Usar operador flecha de C++' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin, para acceder a miembros de un tipo que puede ser null, se debe usar el operador de llamada segura (?.).',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Usa el operador de llamada segura (?.) para acceder a propiedades de variables nulables.'
      },
      {
        id: 'k07-s2',
        attackName: 'Aserción Forzada Catastrófica (!!)',
        shieldElement: 'memory',
        shieldElementName: 'Operador Elvis (?:)',
        prompt: 'El operador !! causa un crash inmediato cuando token es nulo. ¿Cómo proveer un valor por defecto seguro (0) usando el operador Elvis?',
        codeSnippet: 'val token: String? = null\nval longitudSegura = token!!.length\nprintln("Largo: $longitudSegura")',
        targetLine: 2,
        options: [
          { code: 'val longitudSegura = token?.length ?: 0', description: 'Usar llamada segura con operador Elvis (?: 0) para devolver 0 si es nulo' },
          { code: 'val longitudSegura = token.length ?: 0', description: 'Omitir la llamada segura con el punto' },
          { code: 'val longitudSegura = token ?: 0', description: 'Aplicar Elvis directo sobre String? devolviendo tipos incompatibles' }
        ],
        correctOptionIndex: 0,
        explanation: 'El operador Elvis (?:) evalúa el lado izquierdo; si no es nulo lo usa, y si es nulo usa el valor de la derecha (salvaguarda segura).',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Usa el operador Elvis (?:) para definir un valor por defecto en caso de que sea null.'
      },
      {
        id: 'k07-s3',
        attackName: 'Asignación Nula a Tipo no Nulable',
        shieldElement: 'syntax',
        shieldElementName: 'Tipos Nulables (?)',
        prompt: 'La variable no acepta null porque fue declarada como String en vez de String?. ¿Cómo permitir que acepte null?',
        codeSnippet: 'var codigoAcceso: String = "VIP"\ncodigoAcceso = null\nprintln("Código: $codigoAcceso")',
        targetLine: 1,
        options: [
          { code: 'var codigoAcceso: String? = "VIP"', description: 'Agregar el sufijo ? al tipo (String?) para declarar explícitamente que acepta null' },
          { code: 'var codigoAcceso: Nullable<String> = "VIP"', description: 'Usar genérico inexistente Nullable<String>' },
          { code: 'var codigoAcceso: String = null', description: 'Asignar null sin modificar el tipo estático' }
        ],
        correctOptionIndex: 0,
        explanation: 'En Kotlin, ningún tipo acepta null por defecto. Para que una variable pueda almacenar null, se debe agregar el signo de interrogación al tipo (ej: String?).',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Para que una variable permita valores nulos, agrega ? al tipo (ej: String?).'
      }
    ]
  }
};

export const SQL_BOSSES_DATA: Record<number, BossData> = {
  1: {
    id: 'sql-u01-boss',
    unitId: 1,
    pathId: 'sql',
    name: 'Inyector de Sintaxis Corrupta',
    title: 'Señor del SELECT y la Estructura Relacional',
    avatarType: 'glitch_bug',
    element: 'syntax',
    primaryColor: '#00E5FF',
    accentColor: '#FFE600',
    description: 'Un gusano cibernético que desordena las cláusulas SELECT y FROM en el motor de base de datos.',
    stages: [
      {
        id: 'sql01-s1',
        attackName: 'Inversión de Cláusula SELECT y FROM',
        shieldElement: 'syntax',
        shieldElementName: 'Sintaxis Básica de Consulta',
        prompt: 'El motor SQL arroja error de sintaxis porque las cláusulas están en orden inverso. ¿Cuál es el orden estándar?',
        codeSnippet: '-- Consulta de usuarios registrados\nFROM usuarios SELECT nombre, email;\n-- Fin del script',
        targetLine: 2,
        options: [
          { code: 'SELECT nombre, email FROM usuarios;', description: 'Escribir primero SELECT seguido de columnas y luego FROM seguido de la tabla' },
          { code: 'GET nombre, email IN usuarios;', description: 'Usar la palabra GET' },
          { code: 'FETCH ALL FROM usuarios;', description: 'Sintaxis incompleta' }
        ],
        correctOptionIndex: 0,
        explanation: 'Toda consulta de selección en SQL estándar comienza obligatoriamente con la cláusula SELECT, seguida de las columnas, y luego FROM con el nombre de la tabla.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Recuerda el orden fundamental: primero SELECT columnas, luego FROM tabla.'
      },
      {
        id: 'sql01-s2',
        attackName: 'Coma Residual en SELECT',
        shieldElement: 'syntax',
        shieldElementName: 'Lista de Columnas',
        prompt: 'Hay un error de sintaxis cerca de la palabra FROM debido a una coma extra. ¿Cómo debe quedar la consulta?',
        codeSnippet: '-- Reporte de clientes\nSELECT id, nombre, email,\nFROM clientes;\n-- Fin del reporte',
        targetLine: 2,
        options: [
          { code: 'SELECT id, nombre, email', description: 'Eliminar la coma sobrante tras la última columna antes del FROM' },
          { code: 'SELECT (id, nombre, email)', description: 'Envolver la lista de columnas entre paréntesis' },
          { code: 'SELECT id; nombre; email;', description: 'Separar las columnas con punto y coma' }
        ],
        correctOptionIndex: 0,
        explanation: 'En SQL, las comas solo se utilizan como separadores entre columnas. Nunca debe colocarse una coma después de la última columna antes del FROM.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Nunca pongas una coma después de la última columna antes del FROM.'
      },
      {
        id: 'sql01-s3',
        attackName: 'Alias Inválido en Columna Calculada',
        shieldElement: 'syntax',
        shieldElementName: 'Alias de Columnas (AS)',
        prompt: 'Para renombrar una columna calculada se debe usar la palabra clave estándar. ¿Cuál es la sintaxis correcta?',
        codeSnippet: '-- Cálculo con impuesto\nSELECT precio * 1.13 TO precio_final\nFROM productos;',
        targetLine: 2,
        options: [
          { code: 'SELECT precio * 1.13 AS precio_final', description: 'Usar la palabra reservada AS para definir el alias' },
          { code: 'SELECT precio * 1.13 = precio_final', description: 'Usar el signo igual' },
          { code: 'SELECT precio * 1.13 -> precio_final', description: 'Usar operador flecha' }
        ],
        correctOptionIndex: 0,
        explanation: 'La palabra clave estándar en SQL para asignar un nombre alternativo o alias a una columna calculada es "AS".',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Usa la palabra clave "AS" para asignar un alias a una columna.'
      }
    ]
  },
  8: {
    id: 'sql-u08-boss',
    unitId: 8,
    pathId: 'sql',
    name: 'La Furia del DELETE sin WHERE',
    title: 'Devorador de Tablas y Destructor de Registros',
    avatarType: 'hydra_beast',
    element: 'logic',
    primaryColor: '#DC2626',
    accentColor: '#F59E0B',
    description: 'La pesadilla de cualquier DBA: comandos de borrado masivo sin filtro WHERE.',
    stages: [
      {
        id: 'sql08-s1',
        attackName: 'Purga Masiva sin Cláusula WHERE',
        shieldElement: 'logic',
        shieldElementName: 'Filtro en DELETE',
        prompt: '¡Peligro! Este comando borraría absolutamente todas las cuentas del sistema. ¿Cómo borrar únicamente la cuenta inactiva #1045?',
        codeSnippet: '-- Operación de depuración de cuenta\nDELETE FROM cuentas;\nSELECT COUNT(*) FROM cuentas;',
        targetLine: 2,
        options: [
          { code: 'DELETE FROM cuentas WHERE id = 1045;', description: 'Agregar la cláusula WHERE id = 1045 para delimitar el borrado al registro específico' },
          { code: 'DROP TABLE cuentas;', description: 'Eliminar la tabla por completo' },
          { code: 'TRUNCATE TABLE cuentas;', description: 'Vaciar la tabla sin filtros' }
        ],
        correctOptionIndex: 0,
        explanation: 'Un comando DELETE sin WHERE borra todas las filas de la tabla de forma permanente. Siempre debe incluirse la condición de filtrado.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: '¡Siempre acompaña una sentencia DELETE con una cláusula WHERE para filtrar los registros!'
      },
      {
        id: 'sql08-s2',
        attackName: 'Actualización Universal sin Filtro',
        shieldElement: 'logic',
        shieldElementName: 'Filtro en UPDATE',
        prompt: 'Este comando alteraría el salario de todos los empleados de la empresa a cero. ¿Cómo aplicarlo solo al empleado #99?',
        codeSnippet: '-- Ajuste de nómina\nUPDATE empleados SET salario = 0;\nSELECT * FROM empleados;',
        targetLine: 2,
        options: [
          { code: 'UPDATE empleados SET salario = 0 WHERE id = 99;', description: 'Delimitar el cambio al registro correspondiente mediante WHERE id = 99' },
          { code: 'UPDATE empleados SET salario = 0 ALL;', description: 'Usar la palabra ALL' },
          { code: 'ALTER TABLE empleados SET salario = 0;', description: 'Usar ALTER TABLE (para estructura, no registros)' }
        ],
        correctOptionIndex: 0,
        explanation: 'Al igual que DELETE, un UPDATE sin WHERE modificará cada uno de los registros existentes en la tabla.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Toda instrucción UPDATE debe llevar una cláusula WHERE para especificar qué fila actualizar.'
      },
      {
        id: 'sql08-s3',
        attackName: 'Sintaxis Rota en Sentencia UPDATE',
        shieldElement: 'syntax',
        shieldElementName: 'Estructura de UPDATE',
        prompt: 'La palabra FROM no se usa en una sentencia UPDATE estándar de una sola tabla. ¿Cuál es la sintaxis correcta?',
        codeSnippet: '-- Actualización de inventario\nUPDATE FROM productos SET stock = 10 WHERE id = 1;\nSELECT stock FROM productos WHERE id = 1;',
        targetLine: 2,
        options: [
          { code: 'UPDATE productos SET stock = 10 WHERE id = 1;', description: 'Colocar el nombre de la tabla directamente tras la palabra UPDATE' },
          { code: 'MODIFY productos SET stock = 10 WHERE id = 1;', description: 'Usar la palabra MODIFY' },
          { code: 'UPDATE INTO productos SET stock = 10 WHERE id = 1;', description: 'Usar INTO' }
        ],
        correctOptionIndex: 0,
        explanation: 'La sintaxis estándar es UPDATE nombre_tabla SET columna = valor WHERE condicion;. No se utiliza FROM en un UPDATE directo.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'La sintaxis de actualización es: UPDATE nombre_tabla SET campo = valor WHERE ... (sin la palabra FROM).'
      }
    ]
  }
};

/**
 * Función que obtiene o genera dinámicamente un Jefe para cualquier Unidad de Kotlin o SQL.
 */
export function getBossChallengeForUnit(pathId: 'kotlin' | 'sql', unitId: number): BossData {
  if (pathId === 'kotlin' && KOTLIN_BOSSES_DATA[unitId]) {
    return KOTLIN_BOSSES_DATA[unitId];
  }

  if (pathId === 'sql' && SQL_BOSSES_DATA[unitId]) {
    return SQL_BOSSES_DATA[unitId];
  }

  const KOTLIN_NAMES: Record<number, string> = {
    1: 'Bugzilla el Desbordador',
    2: 'Inmutable Titán',
    3: 'Espectro Aritmético',
    4: 'La Hidra de Bifurcaciones',
    5: 'Bucle Infinito del Caos',
    6: 'Guardián del Alcance Modular',
    7: 'NullPointer Emperador',
    8: 'Devorador de Cadenas',
    9: 'Coloso de Tablas Hash',
    10: 'Señor de las Instancias',
    11: 'Centinela de las Lambdas',
    12: 'Oráculo de las Excepciones'
  };

  const SQL_NAMES: Record<number, string> = {
    1: 'Inyector de Sintaxis Corrupta',
    2: 'Destructor de Integridad Referencial',
    3: 'Forjador de Esquemas Caóticos',
    4: 'Quebrantador de Restricciones',
    5: 'Demonio de Registros Huérfanos',
    6: 'Monstruo del Full Table Scan',
    7: 'Emboscador de Comodines LIKE',
    8: 'La Furia del DELETE sin WHERE',
    9: 'El Laberinto del Cross Join',
    10: 'El Agregador Sin Sentido',
    11: 'El Abismo de las Subconsultas',
    12: 'Bloqueador de Transacciones ACID',
    13: 'Inyector Clandestino de SQL'
  };

  const bossName = pathId === 'kotlin'
    ? (KOTLIN_NAMES[unitId] || `Jefe Maestro Kotlin U${unitId}`)
    : (SQL_NAMES[unitId] || `Jefe Maestro SQL U${unitId}`);

  const defaultElement: ShieldElementType = unitId % 3 === 0 ? 'logic' : unitId % 2 === 0 ? 'memory' : 'syntax';
  const defaultElementName = defaultElement === 'syntax' ? 'Sintaxis de Código' : defaultElement === 'logic' ? 'Lógica Algorítmica' : 'Memoria y Estado';

  return {
    id: `${pathId}-u${String(unitId).padStart(2, '0')}-boss`,
    unitId,
    pathId,
    name: bossName,
    title: `Prueba Suprema de la Unidad ${unitId}`,
    avatarType: unitId % 2 === 0 ? 'iron_titan' : 'glitch_bug',
    element: defaultElement,
    primaryColor: pathId === 'kotlin' ? '#A855F7' : '#00E5FF',
    accentColor: '#FFE600',
    description: `El titán supremo de la Unidad ${unitId}. Supera sus 3 asaltos para desbloquear la siguiente unidad.`,
    stages: [
      {
        id: `${pathId}-u${unitId}-s1`,
        attackName: `Sobrecarga de ${defaultElementName}`,
        shieldElement: defaultElement,
        shieldElementName: defaultElementName,
        prompt: pathId === 'kotlin'
          ? 'El servidor rechaza el código al intentar reasignar la variable inmutable. ¿Cómo debe declararse?'
          : 'La consulta falla por un error en el nombre de la cláusula FROM. ¿Cuál es la corrección?',
        codeSnippet: pathId === 'kotlin'
          ? 'val estado = "Activo"\nval version = 1\nestado = "Reiniciando"\nprintln("Estado: $estado v$version")'
          : '-- Consulta de usuarios\nSELECT id, nombre, email\nFORM usuarios;\n-- Fin del script',
        targetLine: pathId === 'kotlin' ? 1 : 3,
        options: pathId === 'kotlin'
          ? [
              { code: 'var estado = "Activo"', description: 'Declarar con var en la línea 1 para permitir la mutabilidad' },
              { code: 'val estado = "Reiniciando"', description: 'Redeclarar val duplicado' },
              { code: 'estado.set("Reiniciando")', description: 'Invocar método set inexistente' }
            ]
          : [
              { code: 'FROM usuarios;', description: 'Corregir la palabra clave a FROM' },
              { code: 'IN usuarios;', description: 'Usar la palabra IN' },
              { code: 'GET usuarios;', description: 'Usar la palabra GET' }
            ],
        correctOptionIndex: 0,
        explanation: 'Al corregir la sentencia, el servidor compila exitosamente y neutraliza el ataque.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Verifica la sintaxis de las palabras clave y la mutabilidad de las variables.'
      },
      {
        id: `${pathId}-u${unitId}-s2`,
        attackName: `Inyección de Incoherencia Lógica`,
        shieldElement: 'logic',
        shieldElementName: 'Lógica del Sistema',
        prompt: pathId === 'kotlin'
          ? 'El bucle while se ejecuta infinitamente porque el iterador no avanza. ¿Qué instrucción debe agregarse?'
          : 'Hay una coma residual no permitida antes de la cláusula FROM. ¿Cómo debe quedar la línea?',
        codeSnippet: pathId === 'kotlin'
          ? 'var iterador = 1\nwhile (iterador <= 3) {\n    println("Procesando paso $iterador")\n}'
          : '-- Reporte de cuentas\nSELECT id, nombre,\nFROM cuentas;\n-- Fin del reporte',
        targetLine: pathId === 'kotlin' ? 4 : 2,
        options: pathId === 'kotlin'
          ? [
              { code: '    iterador++', description: 'Incrementar la variable iterador en cada vuelta' },
              { code: '    iterador = 1', description: 'Reasignar el valor a 1' },
              { code: '    break while', description: 'Sintaxis errónea' }
            ]
          : [
              { code: 'SELECT id, nombre', description: 'Remover la coma innecesaria tras nombre' },
              { code: 'SELECT (id, nombre)', description: 'Envolver entre paréntesis' },
              { code: 'SELECT id; nombre', description: 'Separar con punto y coma' }
            ],
        correctOptionIndex: 0,
        explanation: 'El parche restaura el ciclo de ejecución normal del programa.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Verifica la puntuación y las condiciones de parada de las instrucciones.'
      },
      {
        id: `${pathId}-u${unitId}-s3`,
        attackName: `Desestabilización Crítica de Memoria`,
        shieldElement: 'memory',
        shieldElementName: 'Integridad de Memoria',
        prompt: pathId === 'kotlin'
          ? 'La variable puede ser nula. ¿Cómo proteger la lectura con un valor por defecto usando el operador Elvis?'
          : 'El comando de borrado no tiene filtro WHERE y vaciaría toda la tabla. ¿Cómo delimitarlo al registro #1?',
        codeSnippet: pathId === 'kotlin'
          ? 'val respuesta: String? = null\nval longitud = respuesta!!.length\nprintln("Longitud: $longitud")'
          : '-- Depuración de datos\nDELETE FROM registros;\nSELECT COUNT(*) FROM registros;',
        targetLine: 2,
        options: pathId === 'kotlin'
          ? [
              { code: 'val longitud = respuesta?.length ?: 0', description: 'Usar llamada segura con operador Elvis (?: 0) para proveer un 0 de salvaguarda' },
              { code: 'val longitud = respuesta.length ?: 0', description: 'Omitir la llamada segura con el punto' },
              { code: 'val longitud = respuesta ?: 0', description: 'Tipos incompatibles sin acceder a .length' }
            ]
          : [
              { code: 'DELETE FROM registros WHERE id = 1;', description: 'Agregar la cláusula WHERE id = 1 para filtrar el borrado' },
              { code: 'DROP TABLE registros;', description: 'Destruir la tabla completa' },
              { code: 'TRUNCATE TABLE registros;', description: 'Vaciar la tabla sin filtros' }
            ],
        correctOptionIndex: 0,
        explanation: '¡Impacto definitivo! La integridad del sistema ha sido restablecida por completo.',
        damageToBoss: 35,
        counterDamageToPlayer: 25,
        teacherHint: 'Asegúrate de proteger las operaciones con valores por defecto o filtros selectivos.'
      }
    ]
  };
}
