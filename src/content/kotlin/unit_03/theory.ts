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
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Operador de Suma y Concatenación (+)',
        explanation: 'El operador + realiza suma aritmética entre números y concatenación cuando interviene una cadena de texto.',
        codeSnippet: `val total = 10 + 20
val saludo = "Hola, " + "Kotlin"
val mix = "Puntaje: " + 100`,
        codeLanguage: 'kotlin',
        byteTip: 'En Kotlin, si sumas una cadena con un número, el resultado siempre se convierte automáticamente a String.',
        keyPoints: [
          'Suma matemática si ambos operandos son numéricos',
          'Sobrecarga de operador con String realiza concatenación',
          'La interpolación con $ suele preferirse a la concatenación extensa'
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
    subtitle: 'Resta (-), multiplicación (*) y división (/) permiten realizar operaciones matemáticas directas entre tipos numéricos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Operadores Aritméticos Básicos (-, *, /)',
        explanation: 'Resta (-), multiplicación (*) y división (/) permiten realizar operaciones matemáticas directas entre tipos numéricos.',
        codeSnippet: `val resta = 100 - 35
val producto = 8 * 9
val cociente = 50 / 2`,
        codeLanguage: 'kotlin',
        byteTip: 'Kotlin respeta el tipo de datos: si multiplicas dos Int obtienes un Int; si multiplicas Int por Double obtienes Double.',
        keyPoints: [
          'El operador - calcula la diferencia',
          'El operador * realiza el producto escalar',
          'El operador / calcula el cociente según los tipos de operandos'
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
    subtitle: 'Cuando ambos operandos son enteros, Kotlin ejecuta una división entera que descarta los decimales mediante truncamiento.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'División Entera vs División Decimal y Truncamiento',
        explanation: 'Cuando ambos operandos son enteros, Kotlin ejecuta una división entera que descarta los decimales mediante truncamiento.',
        codeSnippet: `val entera = 7 / 2     // Resultado: 3 (Int)
val decimal = 7.0 / 2   // Resultado: 3.5 (Double)
val convert = 7.toDouble() / 2 // 3.5`,
        codeLanguage: 'kotlin',
        byteTip: 'El truncamiento no redondea: 9 / 10 da 0, no 1.',
        keyPoints: [
          'Int / Int siempre produce Int truncado hacia cero',
          'Para obtener decimales al menos un operando debe ser Double o Float',
          'Usa .toDouble() para convertir antes de dividir'
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
    subtitle: 'El operador % devuelve el residuo o resto de la división entera entre dos números.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Operador Módulo (%) y Cálculo de Residuos',
        explanation: 'El operador % devuelve el residuo o resto de la división entera entre dos números.',
        codeSnippet: `val residuo = 10 % 3  // 1
val esPar = (numero % 2 == 0)
val ultimoDigito = 158 % 10 // 8`,
        codeLanguage: 'kotlin',
        byteTip: 'Para comprobar si un número es múltiplo de k, verifica si numero % k == 0.',
        keyPoints: [
          'Útil para comprobar paridad (n % 2 == 0)',
          'Útil para restringir números a rangos circulares (índice % longitud)',
          'Conserva el signo del dividendo en Kotlin'
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
    subtitle: 'Las operaciones matemáticas siguen reglas estrictas de precedencia: paréntesis primero, luego multiplicación/división/módulo, y finalmente suma y resta.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Precedencia y Jerarquía de Operaciones Matemáticas',
        explanation: 'Las operaciones matemáticas siguen reglas estrictas de precedencia: paréntesis primero, luego multiplicación/división/módulo, y finalmente suma y resta.',
        codeSnippet: `val resultado = 2 + 3 * 4     // 14, no 20
val explicito = (2 + 3) * 4   // 20
val complejo = 100 - 20 / 2 * 3 // 70`,
        codeLanguage: 'kotlin',
        byteTip: 'Usa paréntesis para hacer explícita la intención de tu fórmula, incluso si la precedencia por defecto funciona.',
        keyPoints: [
          'Los paréntesis tienen la más alta prioridad',
          '*, / y % tienen la misma precedencia y se evalúan de izquierda a derecha',
          '+ y - tienen menor prioridad que los operadores multiplicativos'
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
    subtitle: 'Los operadores de asignación compuesta combinan una operación aritmética con la reasignación de la variable en un solo paso conciso.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Operadores de Asignación Compuesta (+=, -=, *=, /=, %=)',
        explanation: 'Los operadores de asignación compuesta combinan una operación aritmética con la reasignación de la variable en un solo paso conciso.',
        codeSnippet: `var puntos = 10
puntos += 5   // puntos = puntos + 5 (15)
puntos *= 2   // puntos = puntos * 2 (30)
puntos -= 10  // puntos = puntos - 10 (20)`,
        codeLanguage: 'kotlin',
        byteTip: 'Si la variable fue declarada con val, los operadores compuestos producirán error de compilación (Val cannot be reassigned).',
        keyPoints: [
          'Requieren que la variable sea mutable (var)',
          '+= suma y reasigna',
          '*= multiplica y reasigna',
          'Evitan repetir el nombre de la variable'
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
    subtitle: 'Los operadores ++ y -- aumentan o reducen en 1 el valor de una variable numérica mutable.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Operadores de Incremento y Decremento (++ y --)',
        explanation: 'Los operadores ++ y -- aumentan o reducen en 1 el valor de una variable numérica mutable.',
        codeSnippet: `var contador = 0
contador++ // Incrementa en 1 (ahora 1)
contador-- // Decrementa en 1 (ahora 0)`,
        codeLanguage: 'kotlin',
        byteTip: 'Usa ++ y -- en sentencias aisladas para maximizar la legibilidad de tu código.',
        keyPoints: [
          'Requiere variable declarada con var',
          'Equivale a x = x + 1 o x = x - 1',
          'Puede colocarse como prefijo o postfijo'
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
    subtitle: 'La forma prefija (++x) incrementa antes de retornar el valor en la expresión; la forma postfija (x++) retorna el valor actual y luego incrementa.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Diferencia entre Prefijo y Postfijo (++x vs x++)',
        explanation: 'La forma prefija (++x) incrementa antes de retornar el valor en la expresión; la forma postfija (x++) retorna el valor actual y luego incrementa.',
        codeSnippet: `var a = 5
val b = ++a // a es 6, b recibe 6 (Prefijo: incrementa antes)

var x = 5
val y = x++ // a es 6, y recibe 5 (Postfijo: incrementa después)`,
        codeLanguage: 'kotlin',
        byteTip: 'Evita incrustar ++x o x++ dentro de expresiones complejas; es fuente frecuente de errores de lectura.',
        keyPoints: [
          'Prefijo (++x): incrementa primero, evalúa el nuevo valor',
          'Postfijo (x++): evalúa el valor original, incrementa después',
          'Al final de la sentencia la variable tiene el mismo valor en ambos casos'
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
    subtitle: 'Los operadores relacionales comparan dos valores y siempre producen un resultado booleano (Boolean: true o false).',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Operadores de Comparación Relacional (>, <, >=, <=)',
        explanation: 'Los operadores relacionales comparan dos valores y siempre producen un resultado booleano (Boolean: true o false).',
        codeSnippet: `val mayor = 10 > 5   // true
val menorOIgual = 20 <= 20 // true
val condicion = edad >= 18`,
        codeLanguage: 'kotlin',
        byteTip: 'Las comparaciones tienen menor precedencia que los operadores aritméticos: a + 2 > b evalúa (a + 2) > b.',
        keyPoints: [
          '> (mayor que) y < (menor que)',
          '>= (mayor o igual) y <= (menor o igual)',
          'Comparan cualquier tipo que implemente Comparable (números, caracteres, fechas)'
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
    subtitle: 'Integra y pon a prueba los conocimientos adquiridos sobre operadores aritméticos, residuos, precedencia y comparaciones.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Desafío de Punto Medio: Álgebra y Lógica Operacional',
        explanation: 'Integra y pon a prueba los conocimientos adquiridos sobre operadores aritméticos, residuos, precedencia y comparaciones.',
        codeSnippet: `val precio = 120.0
val descuento = 20.0
val tieneCupon = true
val final = if (tieneCupon) (precio - descuento) * 0.9 else precio - descuento`,
        codeLanguage: 'kotlin',
        byteTip: 'Lee siempre las fórmulas de izquierda a derecha respetando la jerarquía de operadores.',
        keyPoints: [
          'Consolidación de operaciones aritméticas mixtas',
          'Uso correcto de paréntesis para lógica matemática',
          'Evitar errores comunes de división entera'
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
    subtitle: 'En Kotlin, == comprueba igualdad estructural (invoca internamente a equals() de forma segura ante nulos) y != comprueba desigualdad.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Igualdad Estructural (==) vs Desigualdad (!=)',
        explanation: 'En Kotlin, == comprueba igualdad estructural (invoca internamente a equals() de forma segura ante nulos) y != comprueba desigualdad.',
        codeSnippet: `val nombre1 = "Kotlin"
val nombre2 = "Kotlin"
val iguales = (nombre1 == nombre2) // true
val distintos = (10 != 20)         // true`,
        codeLanguage: 'kotlin',
        byteTip: 'En Kotlin casi siempre querrás usar == para comparar valores, textos u objetos de datos.',
        keyPoints: [
          '== traduce internamente a a?.equals(b) ?: (b === null)',
          'A diferencia de Java, == en Kotlin compara el contenido de Strings y objetos',
          '!= es el operador inverso de =='
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
    subtitle: 'El operador === verifica igualdad referencial: si dos referencias apuntan exactamente al mismo objeto en memoria.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Igualdad Referencial (===) vs Identidad de Memoria (!==)',
        explanation: 'El operador === verifica igualdad referencial: si dos referencias apuntan exactamente al mismo objeto en memoria.',
        codeSnippet: `val a = Integer.valueOf(1000)
val b = Integer.valueOf(1000)
println(a == b)  // true (Mismo valor estructural)
println(a === b) // false (Diferentes referencias en memoria)`,
        codeLanguage: 'kotlin',
        byteTip: 'Para tipos primitivos optimizados en tiempo de ejecución, === equivale a ==.',
        keyPoints: [
          '=== comprueba si dos variables apuntan a la misma dirección física',
          '!== comprueba si apuntan a instancias de memoria distintas',
          '== compara valor (equals), === compara identidad de objeto'
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
    subtitle: 'El operador && evalúa a true si y solo si AMBOS operandos son verdaderos. Si cualquiera es falso, el resultado es false.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Conjunción Lógica AND (&&) y Tablas de Verdad',
        explanation: 'El operador && evalúa a true si y solo si AMBOS operandos son verdaderos. Si cualquiera es falso, el resultado es false.',
        codeSnippet: `val tienePermiso = true
val sesionActiva = true
val puedeIngresar = tienePermiso && sesionActiva // true

val falla = true && false // false`,
        codeLanguage: 'kotlin',
        byteTip: '&& tiene menor precedencia que los operadores de comparación: edad >= 18 && tieneDni no requiere paréntesis adicionales.',
        keyPoints: [
          'true && true = true',
          'true && false = false',
          'false && true = false',
          'false && false = false'
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
    subtitle: 'El operador || produce true si AL MENOS UNO de sus operandos es verdadero. Solo es false cuando ambos operandos son falsos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Disyunción Lógica OR (||) y Tablas de Verdad',
        explanation: 'El operador || produce true si AL MENOS UNO de sus operandos es verdadero. Solo es false cuando ambos operandos son falsos.',
        codeSnippet: `val esFinDeSemana = true
val esFeriado = false
val descansa = esFinDeSemana || esFeriado // true (Basta con que uno sea verdadero)`,
        codeLanguage: 'kotlin',
        byteTip: 'Coloca la condición que sea más probable que sea verdadera a la izquierda de || para acelerar la ejecución.',
        keyPoints: [
          'true || false = true',
          'false || true = true',
          'true || true = true',
          'false || false = false'
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
    subtitle: 'Los operadores && y || no evalúan el segundo operando si el resultado ya está determinado por el primero.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Evaluación de Cortocircuito (Short-circuit Evaluation)',
        explanation: 'Los operadores && y || no evalúan el segundo operando si el resultado ya está determinado por el primero.',
        codeSnippet: `val texto: String? = null
// Cortocircuito seguro: si texto != null es false, no evalúa texto.length
val valido = (texto != null) && (texto.length > 0)`,
        codeLanguage: 'kotlin',
        byteTip: 'Aprovecha el cortocircuito para evitar excepciones: (lista.isNotEmpty() && lista[0] == target).',
        keyPoints: [
          'false && expresión: expresión nunca se ejecuta',
          'true || expresión: expresión nunca se ejecuta',
          'Permite escribir guardias seguras contra llamadas sobre nulos o divisiones entre cero'
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
    subtitle: 'El operador unario de negación ! invierte el valor de cualquier expresión booleana: convierte true en false, y false en true.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Operador de Negación Lógica NOT (!)',
        explanation: 'El operador unario de negación ! invierte el valor de cualquier expresión booleana: convierte true en false, y false en true.',
        codeSnippet: `val bloqueado = false
val permitido = !bloqueado // true

val vacio = !lista.isNotEmpty()`,
        codeLanguage: 'kotlin',
        byteTip: 'Evita dobles o triples negaciones como !(!invalido) porque vuelven el código casi imposible de razonar.',
        keyPoints: [
          '!true = false',
          '!false = true',
          'Tiene alta precedencia y suele colocarse pegado al identificador booleano'
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
    subtitle: 'A diferencia de otros lenguajes que usan símbolos como << o &, Kotlin usa funciones infijas legibles para manipular bits.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Operadores Bit a Bit en Kotlin (shl, shr, and, or, xor, inv)',
        explanation: 'A diferencia de otros lenguajes que usan símbolos como << o &, Kotlin usa funciones infijas legibles para manipular bits.',
        codeSnippet: `val a = 1 shl 2     // Desplazamiento a la izquierda (1 * 4 = 4)
val b = 12 shr 1    // Desplazamiento a la derecha (12 / 2 = 6)
val mask = 5 and 3  // Operación bitwise AND
val flags = 4 or 2  // Operación bitwise OR`,
        codeLanguage: 'kotlin',
        byteTip: 'Las operaciones bit a bit son habituales en programación gráfica, protocolos binarios y criptografía.',
        keyPoints: [
          'shl (shift left) y shr (shift right con signo)',
          'and, or, xor para operaciones a nivel de bit',
          'inv() invierte todos los bits (complemento a 1)'
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
    subtitle: 'Aprende a estructurar expresiones del mundo real que involucran operaciones aritméticas, relacionales y lógicas concurrentes.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Expresiones Combinadas: Lógica y Aritmética Compleja',
        explanation: 'Aprende a estructurar expresiones del mundo real que involucran operaciones aritméticas, relacionales y lógicas concurrentes.',
        codeSnippet: `val edad = 22
val tieneEntrada = true
val saldo = 50.0
val puedeComprar = (edad >= 18 && tieneEntrada) || saldo >= 100.0`,
        codeLanguage: 'kotlin',
        byteTip: 'Usa variables intermedias con nombres descriptivos cuando una expresión empiece a superar los 3 operadores.',
        keyPoints: [
          'Primero se resuelven las operaciones aritméticas (+, -, *, /)',
          'Segundo se resuelven las comparaciones relacionales (>, <, ==)',
          'Tercero se resuelven las operaciones lógicas (&&, ||)'
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
    subtitle: 'Aprende a escribir condiciones claras usando paréntesis estratégicos para evitar confusiones de precedencia entre miembros del equipo.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Buenas Prácticas de Legibilidad con Paréntesis',
        explanation: 'Aprende a escribir condiciones claras usando paréntesis estratégicos para evitar confusiones de precedencia entre miembros del equipo.',
        codeSnippet: `// Difícil de leer y propenso a dudas:
val r1 = a && b || c && d

// Claro, autodocumentado y libre de ambigüedad:
val r2 = (a && b) || (c && d)`,
        codeLanguage: 'kotlin',
        byteTip: 'Si tienes que dudar dos segundos sobre el orden de evaluación, pon paréntesis.',
        keyPoints: [
          'Los paréntesis no tienen impacto en rendimiento en tiempo de ejecución',
          'Aclaran la precedencia sin obligar al lector a memorizar la tabla completa',
          'Ayudan a formatear expresiones largas en múltiples líneas'
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
    subtitle: 'Construye un motor completo de validación de reglas de negocio integrando todos los operadores aritméticos, relacionales y lógicos de Kotlin.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Desafío Maestro de Unidad: Motor de Reglas y Condiciones',
        explanation: 'Construye un motor completo de validación de reglas de negocio integrando todos los operadores aritméticos, relacionales y lógicos de Kotlin.',
        codeSnippet: `// Motor de Reglas de Despacho Logístico
val pesoValido = pesoKg <= 30.0
val dimensionesOk = (largo + ancho + alto) <= 150.0
val expressPermitido = esClienteVip || distanciaKm < 50.0
val puedeDespachar = (pesoValido && dimensionesOk) && expressPermitido`,
        codeLanguage: 'kotlin',
        byteTip: 'Domina los operadores lógicos y aritméticos; son los cimientos con los que se toman todas las decisiones en software.',
        keyPoints: [
          'Integración de todas las familias de operadores',
          'Manejo de reglas de decisión empresarial en código idiomático',
          'Validación exhaustiva de casos borde'
        ]
      }
    ]
  },
};
