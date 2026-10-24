import { Lesson } from '../../../types/lesson';

export const LESSON_FLOWCHART: Lesson = {
  id: 'kotlin-u01-l08',
  path: 'kotlin',
  unit: 1,
  level: 4,
  title: '4. Diagramas de flujo: simbología gráfica y diseño de algoritmos',
  description: 'Representa visualmente la secuencia de un algoritmo con símbolos universales (terminal, proceso, entrada/salida y decisión) arrastrando y acomodando bloques de flujo.',
  exercises: [
    {
      id: 'kt-u01-l08-e01',
      type: 'flowchart_builder',
      prompt: 'Acomoda los bloques en el orden correcto para crear el diagrama de flujo que determina si una persona es mayor de edad:',
      flowTitle: 'Verificar Mayoría de Edad (edad >= 18)',
      blocks: [
        {
          id: 'fb-01-start',
          text: 'Inicio',
          shape: 'terminal',
          detail: 'Punto de partida del algoritmo'
        },
        {
          id: 'fb-01-read',
          text: 'Leer edad',
          shape: 'io',
          detail: 'Entrada de datos desde el usuario'
        },
        {
          id: 'fb-01-decision',
          text: '¿edad >= 18?',
          shape: 'decision',
          detail: 'Evaluación de condición lógica (Bifurcación Sí / No)'
        },
        {
          id: 'fb-01-output',
          text: 'Mostrar "Acceso permitido"',
          shape: 'io',
          detail: 'Salida en pantalla al cumplirse la condición'
        },
        {
          id: 'fb-01-end',
          text: 'Fin',
          shape: 'terminal',
          detail: 'Conclusión obligatoria del algoritmo'
        }
      ],
      correctOrder: [0, 1, 2, 3, 4],
      explanation: 'Todo diagrama comienza en Inicio, lee los datos de entrada, evalúa la condición en el rombo, muestra el resultado correspondiente y concluye en Fin.',
      xpReward: 20
    },
    {
      id: 'kt-u01-l08-e02',
      type: 'predict_output',
      prompt: '¿Qué figura geométrica estándar se utiliza en un diagrama de flujo para representar la asignación o cálculo "val total = precio * 1.16"?',
      code: '',
      options: [
        'Rectángulo (Proceso u operación matemática)',
        'Rombo (Decisión o bifurcación condicional)',
        'Óvalo / Cápsula (Terminal de Inicio o Fin)',
        'Círculo (Conector de página)'
      ],
      correctOptionIndex: 0,
      explanation: 'El rectángulo representa procesos de cómputo, fórmulas aritméticas y asignaciones en memoria.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l08-e03',
      type: 'matching_pairs',
      prompt: 'Empareja cada símbolo universal de diagrama de flujo con su rol lógico:',
      pairs: [
        {
          left: 'Óvalo / Cápsula',
          right: 'Terminal de Inicio o Fin del algoritmo'
        },
        {
          left: 'Paralelogramo',
          right: 'Entrada o Salida de datos (Leer / Imprimir)'
        },
        {
          left: 'Rectángulo',
          right: 'Proceso o cálculo matemático interno'
        },
        {
          left: 'Rombo / Diamante',
          right: 'Decisión con ramas alternativas (Sí / No)'
        }
      ],
      explanation: 'Esta simbología estandarizada por ISO permite que cualquier desarrollador entienda un algoritmo sin importar el idioma.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l08-e04',
      type: 'flowchart_builder',
      prompt: 'Ordena el diagrama de flujo que calcula el promedio de dos calificaciones escolares:',
      flowTitle: 'Calcular Promedio de dos notas',
      blocks: [
        {
          id: 'fb-02-start',
          text: 'Inicio',
          shape: 'terminal',
          detail: 'Inicio del cálculo escolar'
        },
        {
          id: 'fb-02-input',
          text: 'Leer nota1, nota2',
          shape: 'io',
          detail: 'Entrada de las dos notas'
        },
        {
          id: 'fb-02-calc',
          text: 'promedio = (nota1 + nota2) / 2',
          shape: 'process',
          detail: 'Cálculo de la media aritmética'
        },
        {
          id: 'fb-02-output',
          text: 'Mostrar promedio',
          shape: 'io',
          detail: 'Presentación del resultado final'
        },
        {
          id: 'fb-02-end',
          text: 'Fin',
          shape: 'terminal',
          detail: 'Cierre del procedimiento'
        }
      ],
      correctOrder: [0, 1, 2, 3, 4],
      explanation: 'Primero se obtienen los datos de entrada, luego se realiza el proceso matemático y finalmente se emite la salida antes de terminar.',
      xpReward: 20
    },
    {
      id: 'kt-u01-l08-e05',
      type: 'spot_the_bug',
      prompt: 'Identifica la línea con la afirmación ERRÓNEA sobre la construcción de diagramas de flujo:',
      codeSnippet: [
        '1. Las flechas deben fluir preferentemente de arriba hacia abajo.',
        '2. Un rombo de decisión debe tener siempre una única flecha de salida.',
        '3. Todo camino del diagrama debe terminar obligatoriamente en un símbolo de Fin.'
      ],
      bugLineIndex: 1,
      explanation: 'Un rombo de decisión siempre tiene al menos dos flechas de salida: una para la condición Verdadera (Sí) y otra para la Falsa (No).',
      xpReward: 15
    },
    {
      id: 'kt-u01-l08-e06',
      type: 'code_cloze',
      prompt: 'En un diagrama de flujo, las bifurcaciones condicionales que evalúan si algo es Verdadero o Falso se representan con un ___:',
      codeWithBlank: 'La decisión lógica condicional se dibuja dentro de un ___ con ramas Sí y No.',
      options: ['rombo', 'rectángulo', 'óvalo', 'círculo'],
      correctOption: 'rombo',
      explanation: 'El rombo es la figura estándar universal para decisiones lógicas con múltiples ramas.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l08-e07',
      type: 'flowchart_builder',
      prompt: 'Acomoda el diagrama de flujo para recargar saldo telefónico con éxito:',
      flowTitle: 'Recarga Móvil Automática',
      blocks: [
        {
          id: 'fb-03-start',
          text: 'Inicio',
          shape: 'terminal',
          detail: 'Apertura de la transacción'
        },
        {
          id: 'fb-03-read',
          text: 'Leer montoRecarga',
          shape: 'io',
          detail: 'Monto solicitado por el cliente'
        },
        {
          id: 'fb-03-process',
          text: 'saldoActual = saldoActual + montoRecarga',
          shape: 'process',
          detail: 'Actualización del saldo en cuenta'
        },
        {
          id: 'fb-03-show',
          text: 'Mostrar "Recarga exitosa"',
          shape: 'io',
          detail: 'Confirmación visual al usuario'
        },
        {
          id: 'fb-03-end',
          text: 'Fin',
          shape: 'terminal',
          detail: 'Transacción completada'
        }
      ],
      correctOrder: [0, 1, 2, 3, 4],
      explanation: 'La recarga no puede sumarse al saldo antes de haber leído el monto que el usuario desea acreditar.',
      xpReward: 20
    },
    {
      id: 'kt-u01-l08-e08',
      type: 'predict_output',
      prompt: 'Si un diagrama de flujo evalúa el rombo "¿saldo >= 50?" y el usuario tiene un saldo de 30, ¿hacia dónde continúa el flujo?',
      code: '',
      options: [
        'Hacia la rama del "No" (Condición falsa)',
        'Hacia la rama del "Sí" (Condición verdadera)',
        'Se reinicia el diagrama automáticamente al Inicio',
        'El diagrama genera un error de desbordamiento'
      ],
      correctOptionIndex: 0,
      explanation: 'Dado que 30 no es mayor o igual a 50, la condición no se cumple y el flujo desciende por la rama del No.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l08-e09',
      type: 'code_cloze',
      prompt: 'Para indicar en un diagrama que la computadora debe mostrar un mensaje con println(), se usa el símbolo de ___:',
      codeWithBlank: 'La salida de datos en pantalla se representa gráficamente con un ___.',
      options: ['paralelogramo', 'rectángulo', 'rombo', 'estrella'],
      correctOption: 'paralelogramo',
      explanation: 'Tanto la entrada de datos como la salida informativa se dibujan en paralelogramos.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l08-e10',
      type: 'predict_output',
      prompt: '¿Cuál es la principal ventaja de crear un diagrama de flujo antes de ponerse a programar?',
      code: '',
      options: [
        'Permite detectar errores de lógica y visualizar todas las rutas antes de escribir código',
        'Hace que el código final se ejecute 10 veces más rápido en la CPU',
        'Reemplaza para siempre la necesidad de compilar o probar la app',
        'Evita que el programa necesite memoria RAM'
      ],
      correctOptionIndex: 0,
      explanation: 'Diseñar el diagrama de flujo primero permite verificar que la solución es sólida y completa antes de invertir tiempo en sintaxis.',
      xpReward: 10
    }
  ]
};

export const LESSON_PSEUDOCODE: Lesson = {
  id: 'kotlin-u01-l09',
  path: 'kotlin',
  unit: 1,
  level: 5,
  title: '5. Pseudocódigo: diseño lógico estructurado previo al código',
  description: 'Planifica la lógica de tus soluciones usando palabras clave claras como LEER, ESCRIBIR y SI-ENTONCES antes de traducirlas a código Kotlin.',
  exercises: [
    {
      id: 'kt-u01-l09-e01',
      type: 'parsons_puzzle',
      prompt: 'Ordena las líneas de este algoritmo en pseudocódigo para calcular el área de un triángulo:',
      lines: [
        'ALGORITMO CalcularAreaTriangulo',
        '  LEER base, altura',
        '  area = (base * altura) / 2',
        '  ESCRIBIR area',
        'FIN ALGORITMO'
      ],
      correctOrder: [0, 1, 2, 3, 4],
      explanation: 'Un algoritmo en pseudocódigo se abre con ALGORITMO, lee las entradas, calcula la fórmula, muestra el resultado y concluye con FIN ALGORITMO.',
      xpReward: 20
    },
    {
      id: 'kt-u01-l09-e02',
      type: 'code_cloze',
      prompt: 'En pseudocódigo estándar, para solicitar información al usuario se utiliza la instrucción ___:',
      codeWithBlank: '___ nombreUsuario // Espera a que la persona digite su nombre',
      options: ['LEER', 'ESCRIBIR', 'CALCULAR', 'BORRAR'],
      correctOption: 'LEER',
      explanation: 'LEER es la directiva universal de entrada en pseudocódigo para capturar datos.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l09-e03',
      type: 'matching_pairs',
      prompt: 'Empareja cada instrucción de pseudocódigo con su código Kotlin equivalente:',
      pairs: [
        {
          left: 'ESCRIBIR "Hola"',
          right: 'println("Hola")'
        },
        {
          left: 'LEER edad',
          right: 'val edad = readln()'
        },
        {
          left: 'SI nota >= 70 ENTONCES',
          right: 'if (nota >= 70) {'
        },
        {
          left: 'total = precio * cantidad',
          right: 'val total = precio * cantidad'
        }
      ],
      explanation: 'El pseudocódigo mapea de manera directa y transparente a las instrucciones de Kotlin.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l09-e04',
      type: 'spot_the_bug',
      prompt: 'Identifica la línea con la afirmación INCORRECTA respecto al pseudocódigo:',
      codeSnippet: [
        '1. El pseudocódigo está pensado para comprensión humana, no para el compilador.',
        '2. El compilador de Kotlin puede ejecutar directamente archivos de pseudocódigo.',
        '3. Permite comunicar ideas y algoritmos fácilmente entre programadores de distintos lenguajes.'
      ],
      bugLineIndex: 1,
      explanation: 'Ninguna computadora ejecuta pseudocódigo directamente; primero debe ser traducido a un lenguaje como Kotlin o SQL.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l09-e05',
      type: 'predict_output',
      prompt: 'Analiza el siguiente pseudocódigo:\n\na = 7\nb = 3\nresultado = a * b\nESCRIBIR resultado\n\n¿Qué valor se muestra en pantalla?',
      code: '',
      options: ['21', '10', '73', 'Error de sintaxis'],
      correctOptionIndex: 0,
      explanation: '7 multiplicado por 3 da 21, y la instrucción ESCRIBIR presenta este valor.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l09-e06',
      type: 'code_cloze',
      prompt: 'Para emitir un mensaje de texto o resultado en pantalla en pseudocódigo se emplea ___:',
      codeWithBlank: '___ "Bienvenido al sistema bancario"',
      options: ['ESCRIBIR', 'LEER', 'ASIGNAR', 'PAUSAR'],
      correctOption: 'ESCRIBIR',
      explanation: 'ESCRIBIR representa la operación de salida o impresión en pantalla.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l09-e07',
      type: 'parsons_puzzle',
      prompt: 'Ordena el pseudocódigo que evalúa si un pago con tarjeta puede ser aprobado:',
      lines: [
        'INICIO',
        'LEER saldoDisponible, montoCompra',
        'SI saldoDisponible >= montoCompra ENTONCES',
        '  ESCRIBIR "Transacción aprobada"',
        'FIN'
      ],
      correctOrder: [0, 1, 2, 3, 4],
      explanation: 'Primero se leen los montos necesarios, se evalúa si hay fondos suficientes y se emite la confirmación.',
      xpReward: 20
    },
    {
      id: 'kt-u01-l09-e08',
      type: 'predict_output',
      prompt: '¿Por qué las empresas y universidades enseñan pseudocódigo antes de enseñar un lenguaje estricto?',
      code: '',
      options: [
        'Porque permite afianzar la lógica de resolución de problemas sin frustrarse por errores de sintaxis',
        'Porque el pseudocódigo consume menos batería en los servidores',
        'Porque no requiere utilizar computadoras con teclado',
        'Porque es el único lenguaje que admite números negativos'
      ],
      correctOptionIndex: 0,
      explanation: 'Aislar la lógica de la sintaxis estricta acelera el aprendizaje y construye un pensamiento algorítmico sólido.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l09-e09',
      type: 'code_cloze',
      prompt: 'En pseudocódigo estructurado, un bloque condicional que empieza con SI debe cerrarse con ___:',
      codeWithBlank: 'SI condicion ENTONCES\n  // instrucciones\n___',
      options: ['FIN_SI', 'FIN_BUCLE', 'RETORNAR', 'BREAK'],
      correctOption: 'FIN_SI',
      explanation: 'FIN_SI delimita con claridad dónde termina el alcance de la bifurcación.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l09-e10',
      type: 'predict_output',
      prompt: '¿A qué lenguajes se puede traducir un algoritmo correctamente modelado en pseudocódigo?',
      code: '',
      options: [
        'A cualquier lenguaje moderno: Kotlin, Java, Python, C++, JavaScript o Swift',
        'Únicamente al lenguaje C',
        'Solo a sentencias de bases de datos relacionales',
        'Exclusivamente a archivos de texto plano sin ejecutar'
      ],
      correctOptionIndex: 0,
      explanation: 'La lógica algorítmica es universal; una vez resuelta en pseudocódigo, puede implementarse en cualquier plataforma.',
      xpReward: 10
    }
  ]
};

export const LESSON_SEQUENCES: Lesson = {
  id: 'kotlin-u01-l10',
  path: 'kotlin',
  unit: 1,
  level: 6,
  title: '6. Secuencias: orden de ejecución y flujo lineal de instrucciones',
  description: 'Comprende la estructura de control fundamental: la ejecución paso a paso de arriba hacia abajo, la dependencia de datos y cómo el orden altera el resultado.',
  exercises: [
    {
      id: 'kt-u01-l10-e01',
      type: 'predict_output',
      prompt: 'Analiza la ejecución secuencial de estas cuatro instrucciones en Kotlin:',
      code: 'var puntos = 10\npuntos = puntos + 5\npuntos = puntos * 2\nprintln(puntos)',
      options: ['30', '25', '20', '15'],
      correctOptionIndex: 0,
      explanation: 'El procesador ejecuta paso a paso: 10 + 5 = 15; luego 15 * 2 = 30. El orden secuencial produce exactamente 30.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l10-e02',
      type: 'parsons_puzzle',
      prompt: 'Ordena la secuencia lógica correcta para preparar y servir una taza de té:',
      lines: [
        '1. Poner a hervir agua fresca',
        '2. Colocar la bolsa de té dentro de la taza',
        '3. Verter el agua hirviendo en la taza',
        '4. Dejar reposar y servir caliente'
      ],
      correctOrder: [0, 1, 2, 3],
      explanation: 'Una secuencia tiene dependencias temporales estrictas: no puedes verter agua antes de hervirla.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l10-e03',
      type: 'code_cloze',
      prompt: 'En la estructura de control secuencial, las instrucciones se evalúan estrictamente de ___ hacia abajo:',
      codeWithBlank: 'El flujo secuencial avanza renglón a renglón desde ___ hacia abajo sin saltarse pasos.',
      options: ['arriba', 'abajo', 'la derecha', 'el centro'],
      correctOption: 'arriba',
      explanation: 'El flujo lineal estándar de los programas se lee y ejecuta de arriba hacia abajo.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l10-e04',
      type: 'spot_the_bug',
      prompt: 'Identifica la línea que provocará un error fatal por violar el orden secuencial de dependencia:',
      codeSnippet: [
        '1. println("El total a cobrar es: " + total)',
        '2. val precio = 50',
        '3. val total = precio * 2'
      ],
      bugLineIndex: 0,
      explanation: 'La línea 1 intenta imprimir "total" antes de que la variable haya sido declarada e inicializada en la línea 3.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l10-e05',
      type: 'code_builder',
      prompt: 'Construye la secuencia ordenada para inicializar dos medidas y mostrar su perímetro:',
      tokens: [
        'val ancho = 10',
        'val alto = 5',
        'val perimetro = (ancho + alto) * 2',
        'println(perimetro)'
      ],
      solution: [
        'val ancho = 10',
        'val alto = 5',
        'val perimetro = (ancho + alto) * 2',
        'println(perimetro)'
      ],
      explanation: 'Primero se definen las dimensiones ancho y alto, luego se calcula el perímetro y al final se imprime.',
      xpReward: 20
    },
    {
      id: 'kt-u01-l10-e06',
      type: 'predict_output',
      prompt: 'Analiza el estado acumulativo de la variable en este bloque secuencial:',
      code: 'var nivel = 1\nnivel = nivel + 1\nnivel = nivel + 1\nnivel = nivel + 2\nprintln(nivel)',
      options: ['5', '4', '3', '2'],
      correctOptionIndex: 0,
      explanation: '1 + 1 = 2; 2 + 1 = 3; 3 + 2 = 5. Cada instrucción acumula su efecto sobre el estado anterior.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l10-e07',
      type: 'matching_pairs',
      prompt: 'Empareja cada concepto clave de la estructura secuencial con su definición:',
      pairs: [
        {
          left: 'Flujo lineal',
          right: 'Ejecución continua de arriba hacia abajo sin bifurcaciones'
        },
        {
          left: 'Dependencia de datos',
          right: 'Un paso necesita el cálculo producido por la línea previa'
        },
        {
          left: 'Estado del programa',
          right: 'Los valores almacenados en memoria en un instante específico'
        },
        {
          left: 'Efecto acumulativo',
          right: 'Cada asignación sobrescribe o actualiza el valor anterior'
        }
      ],
      explanation: 'Comprender el estado secuencial y las dependencias temporales es la base de la depuración.',
      xpReward: 15
    },
    {
      id: 'kt-u01-l10-e08',
      type: 'predict_output',
      prompt: '¿Qué ocurre si intercambiamos el orden de estas dos líneas de código?\n\nval precio = 100\nval precioConIva = precio * 1.16',
      code: '',
      options: [
        'El compilador fallará porque no puede calcular precioConIva sin conocer el valor de precio',
        'El programa calculará el impuesto asumiendo que el precio era cero',
        'El compilador reordenará las líneas automáticamente sin avisar',
        'El resultado final cambiará a un número negativo'
      ],
      correctOptionIndex: 0,
      explanation: 'En una secuencia con dependencia de datos, la variable origen debe existir antes de ser consumida.',
      xpReward: 10
    },
    {
      id: 'kt-u01-l10-e09',
      type: 'code_cloze',
      prompt: 'Las tres estructuras de control básicas de la computación clásica son: Secuencia, Selección y ___:',
      codeWithBlank: 'La programación estructurada descansa en Secuencia, Selección y ___.',
      options: ['Repetición', 'Compilación', 'Impresión', 'Navegación'],
      correctOption: 'Repetición',
      explanation: 'El teorema de Böhm-Jacopini demostró que cualquier algoritmo puede escribirse combinando Secuencia, Selección (condicionales) y Repetición (bucles).',
      xpReward: 10
    },
    {
      id: 'kt-u01-l10-e08',
      type: 'predict_output',
      prompt: '¿Cuál es la regla fundamental que nunca debes olvidar sobre el orden secuencial en programación?',
      code: '',
      options: [
        'La computadora ejecuta estrictamente lo que escribiste en el orden en que lo escribiste, sin saltarse pasos',
        'La computadora ejecuta todas las líneas del archivo al mismo tiempo en paralelo',
        'El orden solo importa si el código contiene más de 100 líneas',
        'Las instrucciones de abajo siempre se ejecutan antes que las de arriba'
      ],
      correctOptionIndex: 0,
      explanation: 'La previsibilidad de la ejecución secuencial es lo que permite a los programadores razonar sobre el comportamiento del software.',
      xpReward: 10
    }
  ]
};
