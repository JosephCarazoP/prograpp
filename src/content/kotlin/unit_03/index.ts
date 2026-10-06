import { Lesson, Exercise } from '../../../types/lesson';

const KOTLIN_U03_BANKS: Record<number, { title: string; desc: string; exercises: Exercise[] }> = {
  1: {
    title: '1. Operador de Suma y Concatenación (+)',
    desc: 'Suma matemática de operandos numéricos y concatenación de Strings.',
    exercises: [
      {
        id: 'kt-u03-l01-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l01-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l01-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l01-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l01-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l01-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l01-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l01-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l01-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l01-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  2: {
    title: '2. Operadores Aritméticos Básicos (-, *, /)',
    desc: 'Resta, multiplicación y división estándar entre tipos numéricos.',
    exercises: [
      {
        id: 'kt-u03-l02-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l02-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l02-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l02-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l02-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l02-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l02-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l02-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l02-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l02-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  3: {
    title: '3. División Entera vs División Decimal',
    desc: 'Truncamiento a cero en enteros y preservación decimal con Double.',
    exercises: [
      {
        id: 'kt-u03-l03-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l03-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l03-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l03-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l03-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l03-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l03-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l03-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l03-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l03-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  4: {
    title: '4. Operador Módulo (%) y Residuos',
    desc: 'Cálculo del resto de la división para paridad y ciclos.',
    exercises: [
      {
        id: 'kt-u03-l04-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l04-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l04-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l04-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l04-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l04-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l04-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l04-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l04-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l04-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  5: {
    title: '5. Precedencia y Jerarquía Matemática',
    desc: 'Prioridad de paréntesis, operadores multiplicativos y aditivos.',
    exercises: [
      {
        id: 'kt-u03-l05-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l05-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l05-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l05-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l05-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l05-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l05-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l05-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l05-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l05-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  6: {
    title: '6. Asignación Compuesta (+=, -=, *=, /=)',
    desc: 'Combinación concisa de cálculo y reasignación en variables mutables.',
    exercises: [
      {
        id: 'kt-u03-l06-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l06-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l06-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l06-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l06-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l06-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l06-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l06-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l06-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l06-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  7: {
    title: '7. Incremento y Decremento (++ y --)',
    desc: 'Aumento y reducción unitaria en variables mutables (var).',
    exercises: [
      {
        id: 'kt-u03-l07-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l07-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l07-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l07-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l07-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l07-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l07-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l07-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l07-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l07-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  8: {
    title: '8. Prefijo vs Postfijo (++x vs x++)',
    desc: 'Diferencia en el orden de evaluación del valor previo o actualizado.',
    exercises: [
      {
        id: 'kt-u03-l08-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l08-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l08-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l08-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l08-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l08-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l08-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l08-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l08-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l08-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  9: {
    title: '9. Comparaciones Relacionales (>, <, >=, <=)',
    desc: 'Evaluación de magnitudes relacionales produciendo tipo Boolean.',
    exercises: [
      {
        id: 'kt-u03-l09-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l09-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l09-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l09-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l09-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l09-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l09-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l09-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l09-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l09-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  10: {
    title: '10. Desafío de Punto Medio: Álgebra y Lógica',
    desc: 'Consolidación de operaciones aritméticas mixtas y fórmulas numéricas.',
    exercises: [
      {
        id: 'kt-u03-l10-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l10-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l10-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l10-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l10-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l10-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l10-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l10-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l10-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l10-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  11: {
    title: '11. Igualdad Estructural (==) vs Desigualdad (!=)',
    desc: 'Comparación de contenido de objetos mediante equals() null-safe.',
    exercises: [
      {
        id: 'kt-u03-l11-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l11-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l11-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l11-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l11-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l11-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l11-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l11-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l11-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l11-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  12: {
    title: '12. Igualdad Referencial (===) vs Memoria (!==)',
    desc: 'Verificación de identidad física en memoria entre referencias.',
    exercises: [
      {
        id: 'kt-u03-l12-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l12-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l12-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l12-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l12-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l12-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l12-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l12-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l12-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l12-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  13: {
    title: '13. Conjunción Lógica AND (&&)',
    desc: 'Comprobación de que ambas condiciones sean simultáneamente verdaderas.',
    exercises: [
      {
        id: 'kt-u03-l13-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l13-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l13-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l13-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l13-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l13-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l13-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l13-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l13-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l13-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  14: {
    title: '14. Disyunción Lógica OR (||)',
    desc: 'Cumplimiento de al menos una de las alternativas propuestas.',
    exercises: [
      {
        id: 'kt-u03-l14-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l14-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l14-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l14-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l14-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l14-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l14-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l14-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l14-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l14-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  15: {
    title: '15. Evaluación de Cortocircuito',
    desc: 'Detención de la evaluación si el primer operando determina el resultado.',
    exercises: [
      {
        id: 'kt-u03-l15-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l15-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l15-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l15-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l15-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l15-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l15-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l15-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l15-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l15-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  16: {
    title: '16. Negación Lógica NOT (!)',
    desc: 'Inversión unaria del valor booleano (true pasa a false y viceversa).',
    exercises: [
      {
        id: 'kt-u03-l16-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l16-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l16-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l16-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l16-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l16-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l16-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l16-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l16-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l16-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  17: {
    title: '17. Operadores Bit a Bit en Kotlin',
    desc: 'Funciones infijas shl, shr, and, or, xor e inv para manipulación binaria.',
    exercises: [
      {
        id: 'kt-u03-l17-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l17-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l17-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l17-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l17-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l17-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l17-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l17-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l17-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l17-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  18: {
    title: '18. Expresiones Combinadas: Lógica y Aritmética',
    desc: 'Composición de fórmulas multinivel con comparadores y operadores booleanos.',
    exercises: [
      {
        id: 'kt-u03-l18-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l18-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l18-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l18-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l18-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l18-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l18-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l18-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l18-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l18-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  19: {
    title: '19. Legibilidad y Paréntesis Estratégicos',
    desc: 'Buenas prácticas para evitar ambigüedades en revisiones de código.',
    exercises: [
      {
        id: 'kt-u03-l19-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l19-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l19-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l19-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l19-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l19-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l19-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l19-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l19-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l19-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
  20: {
    title: '20. Desafío Maestro: Motor de Reglas',
    desc: 'Construcción integral de un validador de condiciones empresariales.',
    exercises: [
      {
        id: 'kt-u03-l20-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos y operadores de este nivel:',
        pairs: [
          { left: 'Operador +', right: 'Suma o concatenación de textos' },
          { left: 'Operador %', right: 'Cálculo del residuo entero' },
          { left: 'Operador &&', right: 'Conjunción lógica AND' },
          { left: 'Operador ||', right: 'Disyunción lógica OR' }
        ],
        explanation: 'Dominar la tabla de operadores es indispensable para construir lógica condicional sólida.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l20-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para sumar dos valores numéricos:',
        tokens: ['val', 'total', '=', 'base', '+', 'bono', 'var', '-'],
        solution: ['val', 'total', '=', 'base', '+', 'bono'],
        hint: 'Usa el operador + para sumar ambos operandos.',
        explanation: 'El operador + realiza la adición entre base y bono.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l20-e03',
        type: 'predict_output',
        prompt: '¿Qué valor exacto imprimirá la consola tras evaluar esta operación?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20', '25', '10'],
        correctOptionIndex: 1,
        explanation: 'La multiplicación tiene mayor precedencia: 5 * 2 = 10, y luego 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l20-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que genera un error de asignación sobre constante:',
        codeSnippet: [
          'val saldo = 100',
          'println(saldo)',
          'saldo += 50 // Error de reasignación'
        ],
        bugLineIndex: 2,
        explanation: 'Los operadores compuestos de asignación como += exigen que la variable sea mutable (var).',
        xpReward: 15
      },
      {
        id: 'kt-u03-l20-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición lógica para exigir que ambas variables sean verdaderas:',
        codeWithBlank: 'val valido = permisoOk ___ claveOk',
        options: ['&&', '||', '==', '!'],
        correctOption: '&&',
        explanation: 'El operador && exige que ambas condiciones se cumplan simultáneamente.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l20-e06',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de la división entera en Kotlin?',
        code: 'val division = 9 / 2\nprintln(division)',
        options: ['4.5', '4', '5', '0'],
        correctOptionIndex: 1,
        explanation: 'La división entre dos enteros (Int / Int) descarta los decimales mediante truncamiento dando 4.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l20-e07',
        type: 'code_builder',
        prompt: 'Construye la sentencia para comprobar si un número es par usando módulo:',
        tokens: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        solution: ['val', 'esPar', '=', 'num', '%', '2', '==', '0'],
        hint: 'Usa el operador % con 2 para verificar residuo cero.',
        explanation: 'Si el residuo de dividir entre 2 es exactamente 0, el número es par.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l20-e08',
        type: 'matching_pairs',
        prompt: 'Empareja las expresiones lógicas con su valor de verdad:',
        pairs: [
          { left: 'true && false', right: 'false' },
          { left: 'true || false', right: 'true' },
          { left: '!false', right: 'true' },
          { left: '5 > 10', right: 'false' }
        ],
        explanation: 'Las tablas de verdad rigen la toma de decisiones en todas las bifurcaciones del código.',
        xpReward: 15
      },
      {
        id: 'kt-u03-l20-e09',
        type: 'code_cloze',
        prompt: 'Completa el operador para verificar igualdad de contenido estructural:',
        codeWithBlank: 'val mismoNombre = nombre1 ___ nombre2',
        options: ['==', '===', '!=', '='],
        correctOption: '==',
        explanation: 'En Kotlin, == comprueba igualdad estructural llamando a equals() de forma null-safe.',
        xpReward: 10
      },
      {
        id: 'kt-u03-l20-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de cálculo y comprobación de rango:',
        lines: [
          'val total = precio * cantidad',
          'val aplicaDescuento = total >= 100',
          'println(aplicaDescuento)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero computamos el total, luego evaluamos la condición relacional y finalmente la comunicamos.',
        xpReward: 20
      }
    ]
  },
};

export const KOTLIN_UNIT_03_LESSONS: Lesson[] = Object.keys(KOTLIN_U03_BANKS).map(lvlStr => {
  const lvl = Number(lvlStr);
  const data = KOTLIN_U03_BANKS[lvl];
  return {
    id: `kotlin-u03-l${String(lvl).padStart(2, '0')}`,
    path: 'kotlin',
    unit: 3,
    level: lvl,
    title: data.title,
    description: data.desc,
    exercises: data.exercises
  };
});
