import { Exercise } from '../../../types/lesson';

// Banco complementario de 10 preguntas adicionales por nivel (10 existentes + 10 complementarias = 20 preguntas por nivel)
export const EXTRA_KOTLIN_QUESTIONS: Record<number, Exercise[]> = {
  1: [
    {
      id: 'kt-u01-l01-e11',
      type: 'predict_output',
      prompt: 'Un algoritmo intercambia dos vasos de agua usando un vaso auxiliar "temp". ¿Qué valor imprime temp al final?',
      code: 'var vasoA = "rojo"\nvar vasoB = "azul"\nval temp = vasoA\nvasoA = vasoB\nvasoB = temp\nprintln(temp)',
      options: ['rojo', 'azul', 'vacio', 'null'],
      correctOptionIndex: 0,
      explanation: 'temp guardó el valor inicial de vasoA ("rojo") antes de que vasoA fuera sobrescrito.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l01-e12',
      type: 'code_builder',
      prompt: 'Arma la instrucción para calcular el área de un rectángulo (base * altura):',
      tokens: ['val', 'area', '=', 'base', '*', 'altura', 'var', 'calc'],
      solution: ['val', 'area', '=', 'base', '*', 'altura'],
      hint: 'Multiplica la base por la altura usando el operador *.',
      explanation: 'El proceso matemático toma las dos entradas (base y altura) y produce el área.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l01-e13',
      type: 'spot_the_bug',
      prompt: 'Toca la línea que produce un ciclo infinito por no avanzar hacia la salida:',
      codeSnippet: [
        'var paso = 1',
        'while (paso <= 3) {',
        '    println("Paso en ejecución")',
        '    // Falta paso++ para avanzar',
        '}'
      ],
      bugLineIndex: 3,
      explanation: 'Un algoritmo debe ser finito. Sin incrementar la variable "paso", el ciclo nunca termina.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l01-e14',
      type: 'code_cloze',
      prompt: 'Completa la descripción del formato intermedio para diseñar algoritmos:',
      codeWithBlank: 'Antes de programar en Kotlin, solemos escribir el algoritmo en ___ (lenguaje humano estructurado):',
      options: ['pseudocódigo', 'binario', 'assembler', 'html'],
      correctOption: 'pseudocódigo',
      explanation: 'El pseudocódigo permite planificar la lógica algorítmica sin preocuparse por la sintaxis estricta.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l01-e15',
      type: 'matching_pairs',
      prompt: 'Relaciona cada etapa del algoritmo con su representación en la vida real:',
      pairs: [
        { left: 'Entrada', right: 'Ingredientes de una receta' },
        { left: 'Proceso', right: 'Cocinar y mezclar en el horno' },
        { left: 'Salida', right: 'Pastel listo para servir' },
        { left: 'Algoritmo', right: 'La receta paso a paso' }
      ],
      explanation: 'Cualquier proceso del mundo real puede modelarse como un algoritmo computacional.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l01-e16',
      type: 'parsons_puzzle',
      prompt: 'Ordena la secuencia lógica de un cajero automático:',
      lines: [
        'val saldoInicial = 500',
        'val retiro = 100',
        'val saldoRestante = saldoInicial - retiro',
        'println("Nuevo saldo: $saldoRestante")'
      ],
      correctOrder: [0, 1, 2, 3],
      explanation: 'Se definen las entradas, se ejecuta el débito y finalmente se notifica la salida.',
      xpReward: 20
    },
    {
      id: 'kt-u01-l01-e17',
      type: 'trace_step',
      prompt: 'Traza el valor de la variable "contador" tras cada instrucción:',
      code: 'var contador = 0\ncontador = contador + 2\ncontador = contador * 3',
      iterations: [
        { iteration: 1, expectedVariables: { contador: '2' } },
        { iteration: 2, expectedVariables: { contador: '6' } }
      ],
      explanation: 'Primero 0 + 2 = 2. Luego 2 * 3 = 6.',
      xpReward: 20
    },
    {
      id: 'kt-u01-l01-e18',
      type: 'predict_output',
      prompt: '¿Qué valor imprime la salida del siguiente algoritmo de acumulador?',
      code: 'var total = 10\ntotal += 5\ntotal -= 3\nprintln(total)',
      options: ['12', '15', '10', '8'],
      correctOptionIndex: 0,
      explanation: '10 + 5 = 15; 15 - 3 = 12.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l01-e19',
      type: 'code_cloze',
      prompt: 'Completa la propiedad de "precisión" de un algoritmo:',
      codeWithBlank: 'Cada instrucción de un algoritmo debe ser ___ (no dar lugar a interpretaciones ambiguas):',
      options: ['precisa', 'larga', 'compleja', 'secreta'],
      correctOption: 'precisa',
      explanation: 'La precisión y claridad eliminan la ambigüedad en la ejecución computacional.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l01-e20',
      type: 'code_builder',
      prompt: 'Construye la instrucción para imprimir un mensaje de finalización:',
      tokens: ['println', '(', '"Fin del algoritmo"', ')', ';', 'stop'],
      solution: ['println', '(', '"Fin del algoritmo"', ')'],
      explanation: 'El último paso comunica la finalización exitosa de la secuencia lógica.',
      xpReward: 10
    }
  ],
  2: [
    {
      id: 'kt-u01-l02-e11',
      type: 'predict_output',
      prompt: '¿Qué imprime exactamente en pantalla este bloque de dos instrucciones println?',
      code: 'println(10)\nprintln(20)',
      options: ['10 y 20 en líneas separadas', '1020 en la misma línea', '30', '10 20'],
      correctOptionIndex: 0,
      explanation: 'println() siempre añade un salto de línea al final de cada número impreso.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l02-e12',
      type: 'code_builder',
      prompt: 'Arma la instrucción para imprimir un valor booleano en la consola:',
      tokens: ['println', '(', 'true', ')', '"true"', ';'],
      solution: ['println', '(', 'true', ')'],
      hint: 'Los booleanos true y false no llevan comillas.',
      explanation: 'Los literales booleanos se pasan directamente como argumento sin comillas.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l02-e13',
      type: 'spot_the_bug',
      prompt: 'Toca la línea que olvidó cerrar el paréntesis de la función println:',
      codeSnippet: [
        'println("Servidor iniciado")',
        'println("Conexión segura"',
        'println("Puerto 8080")'
      ],
      bugLineIndex: 1,
      explanation: 'En Kotlin, toda llamada a función debe cerrar los paréntesis correspondientes: println("...").',
      xpReward: 15
    },
    {
      id: 'kt-u01-l02-e14',
      type: 'code_cloze',
      prompt: 'Completa la sentencia para imprimir una línea completamente vacía en consola:',
      codeWithBlank: 'println(___)',
      options: ['()', '("vacio")', '(null)', '(0)'],
      correctOption: '()',
      explanation: 'Invocar println() sin argumentos simplemente produce un salto de línea vacío.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l02-e15',
      type: 'matching_pairs',
      prompt: 'Empareja los argumentos de println con el tipo de dato que representan:',
      pairs: [
        { left: '"Kotlin"', right: 'Cadena de texto (String)' },
        { left: '2026', right: 'Número entero (Int)' },
        { left: '3.14', right: 'Número decimal (Double)' },
        { left: 'false', right: 'Valor booleano (Boolean)' }
      ],
      explanation: 'println() puede recibir e imprimir cualquier tipo de dato fundamental.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l02-e16',
      type: 'parsons_puzzle',
      prompt: 'Ordena la bienvenida de una aplicación de terminal:',
      lines: [
        'println("=== BANCO DEV ===")',
        'println("Por favor ingrese su PIN")',
        'println("Cargando cuenta...")'
      ],
      correctOrder: [0, 1, 2],
      explanation: 'El encabezado se imprime primero, seguido del mensaje de solicitud y la confirmación.',
      xpReward: 20
    },
    {
      id: 'kt-u01-l02-e17',
      type: 'predict_output',
      prompt: '¿Qué se muestra en consola al evaluar una suma aritmética dentro de println?',
      code: 'println(15 + 25)',
      options: ['40', '15 + 25', '1525', 'Error'],
      correctOptionIndex: 0,
      explanation: 'Kotlin evalúa la expresión aritmética (15 + 25 = 40) antes de enviar el resultado a la salida.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l02-e18',
      type: 'code_builder',
      prompt: 'Arma la instrucción para imprimir el resultado de multiplicar 7 por 8:',
      tokens: ['println', '(', '7', '*', '8', ')', '"56"'],
      solution: ['println', '(', '7', '*', '8', ')'],
      explanation: 'Kotlin calcula 7 * 8 = 56 y lo muestra directamente en la terminal.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l02-e19',
      type: 'spot_the_bug',
      prompt: 'Toca la línea que intenta imprimir usando mayúsculas incorrectas en el nombre de la función:',
      codeSnippet: [
        'println("Correcto 1")',
        'Println("Error de mayúscula")',
        'println("Correcto 2")'
      ],
      bugLineIndex: 1,
      explanation: 'Kotlin es sensible a mayúsculas y minúsculas (case-sensitive). La función oficial es println, no Println.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l02-e20',
      type: 'code_cloze',
      prompt: '¿A qué flujo del sistema operativo envía datos la función println()?',
      codeWithBlank: 'println() escribe en el flujo de ___ estándar (stdout):',
      options: ['salida', 'entrada', 'red', 'disco'],
      correctOption: 'salida',
      explanation: 'La consola representa el flujo de salida estándar (Standard Output / stdout).',
      xpReward: 10
    }
  ]
};

// Generador automático de 20 preguntas enriquecidas para los niveles 3 al 20
export function getFullLevelQuestionBank(level: number, baseExercises: Exercise[]): Exercise[] {
  const specificExtra = EXTRA_KOTLIN_QUESTIONS[level] || [];
  const combined = [...baseExercises, ...specificExtra];

  if (combined.length >= 20) {
    return combined.slice(0, 20);
  }

  // Si faltan para llegar a 20, generamos preguntas prácticas específicas de comprensión basadas en el nivel
  const needed = 20 - combined.length;
  const generated: Exercise[] = [];

  for (let i = 1; i <= needed; i++) {
    const num = combined.length + i;
    const typeMod = num % 4;

    if (typeMod === 0) {
      generated.push({
        id: `kt-u01-l${level < 10 ? '0' + level : level}-gen${num}`,
        type: 'predict_output',
        prompt: `[Reto Nivel ${level} #${num}] Evalúa el comportamiento del siguiente bloque de código:`,
        code: `val x = ${level * 2}\nval res = x + ${i}\nprintln("Valor: $res")`,
        options: [
          `Valor: ${level * 2 + i}`,
          `Valor: ${level * 2}`,
          `Valor: $res`,
          `Error de compilación`
        ],
        correctOptionIndex: 0,
        explanation: `La expresión evalúa x (${level * 2}) + ${i} = ${level * 2 + i}, interpolado limpiamente en el texto.`,
        xpReward: 12
      });
    } else if (typeMod === 1) {
      generated.push({
        id: `kt-u01-l${level < 10 ? '0' + level : level}-gen${num}`,
        type: 'spot_the_bug',
        prompt: `[Reto Nivel ${level} #${num}] Identifica la línea con error de sintaxis o tipo incompatible:`,
        codeSnippet: [
          `val id = ${level}`,
          `val estado: String = 100 // ¡Tipo incompatible!`,
          `println(id)`
        ],
        bugLineIndex: 1,
        explanation: 'No puedes asignar un número entero (100) a una variable de tipo String sin comillas ni conversión.',
        xpReward: 15
      });
    } else if (typeMod === 2) {
      generated.push({
        id: `kt-u01-l${level < 10 ? '0' + level : level}-gen${num}`,
        type: 'code_builder',
        prompt: `[Reto Nivel ${level} #${num}] Construye la instrucción correcta para la operación solicitada:`,
        tokens: ['val', 'verificado', '=', 'true', 'var', 'check'],
        solution: ['val', 'verificado', '=', 'true'],
        hint: 'Declara la variable inmutable con val asignando el booleano true.',
        explanation: 'Usa val para declarar identificadores inmutables de máxima seguridad.',
        xpReward: 10
      });
    } else {
      generated.push({
        id: `kt-u01-l${level < 10 ? '0' + level : level}-gen${num}`,
        type: 'code_cloze',
        prompt: `[Reto Nivel ${level} #${num}] Completa la palabra clave correspondiente:`,
        codeWithBlank: `___ resultado = ${level * 10} // Variable de solo lectura`,
        options: ['val', 'var', 'fun', 'const'],
        correctOption: 'val',
        explanation: 'En Kotlin, val es la palabra reservada para declarar identificadores inmutables de solo lectura.',
        xpReward: 10
      });
    }
  }

  return [...combined, ...generated];
}
