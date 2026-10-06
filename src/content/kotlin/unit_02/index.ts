import { Lesson, Exercise } from '../../../types/lesson';

const KOTLIN_U02_BANKS: Record<number, { title: string; desc: string; exercises: Exercise[] }> = {
  1: {
    title: '1. Inmutabilidad con val',
    desc: 'Variables de solo lectura que garantizan la integridad de los datos.',
    exercises: [
      {
        id: 'kt-u02-l01-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l01-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l01-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l01-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l01-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l01-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l01-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l01-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l01-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l01-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  2: {
    title: '2. Mutabilidad con var',
    desc: 'Variables reasignables para contadores, acumuladores y estados dinámicos.',
    exercises: [
      {
        id: 'kt-u02-l02-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l02-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l02-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l02-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l02-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l02-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l02-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l02-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l02-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l02-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  3: {
    title: '3. El Tipo Entero: Int',
    desc: 'Números enteros de 32 bits, límites numéricos y operaciones exactas.',
    exercises: [
      {
        id: 'kt-u02-l03-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l03-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l03-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l03-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l03-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l03-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l03-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l03-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l03-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l03-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  4: {
    title: '4. Decimales: Double y Float',
    desc: 'Precisión de punto flotante de 64 bits y el sufijo f obligatorio en Float.',
    exercises: [
      {
        id: 'kt-u02-l04-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l04-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l04-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l04-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l04-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l04-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l04-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l04-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l04-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l04-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  5: {
    title: '5. El Tipo Booleano: Boolean',
    desc: 'Banderas lógicas con valores verdaderos (true) o falsos (false).',
    exercises: [
      {
        id: 'kt-u02-l05-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l05-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l05-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l05-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l05-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l05-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l05-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l05-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l05-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l05-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  6: {
    title: '6. Caracteres Únicos: Char',
    desc: 'Caracteres Unicode individuales encerrados estrictamente en comillas simples.',
    exercises: [
      {
        id: 'kt-u02-l06-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l06-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l06-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l06-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l06-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l06-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l06-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l06-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l06-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l06-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  7: {
    title: '7. Cadenas de Texto: String',
    desc: 'Secuencias inmutables de texto, comillas dobles y la propiedad .length.',
    exercises: [
      {
        id: 'kt-u02-l07-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l07-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l07-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l07-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l07-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l07-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l07-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l07-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l07-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l07-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  8: {
    title: '8. Inferencia de Tipos',
    desc: 'Cómo el compilador de Kotlin deduce el tipo exacto sin necesidad de anotarlo.',
    exercises: [
      {
        id: 'kt-u02-l08-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l08-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l08-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l08-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l08-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l08-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l08-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l08-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l08-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l08-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  9: {
    title: '9. Declaración Explícita de Tipos',
    desc: 'Sintaxis estricta con dos puntos (: Int, : String) para contratos de código claros.',
    exercises: [
      {
        id: 'kt-u02-l09-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l09-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l09-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l09-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l09-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l09-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l09-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l09-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l09-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l09-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  10: {
    title: '10. Conversión Numérica Explícita',
    desc: 'Uso de .toInt(), .toDouble() y .toLong() para conversiones seguras sin casts implícitos.',
    exercises: [
      {
        id: 'kt-u02-l10-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l10-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l10-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l10-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l10-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l10-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l10-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l10-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l10-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l10-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  11: {
    title: '11. String Templates con $variable',
    desc: 'Interpolación directa de identificadores en cadenas de texto.',
    exercises: [
      {
        id: 'kt-u02-l11-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l11-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l11-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l11-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l11-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l11-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l11-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l11-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l11-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l11-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  12: {
    title: '12. Expresiones en Plantillas con ${...}',
    desc: 'Evaluación de cálculos, métodos y transformaciones dentro de un String.',
    exercises: [
      {
        id: 'kt-u02-l12-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l12-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l12-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l12-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l12-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l12-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l12-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l12-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l12-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l12-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  13: {
    title: '13. Métodos Esenciales de String',
    desc: 'Transformaciones de texto con .uppercase(), .lowercase(), .trim() y .replace().',
    exercises: [
      {
        id: 'kt-u02-l13-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l13-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l13-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l13-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l13-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l13-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l13-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l13-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l13-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l13-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  14: {
    title: '14. Strings Multilínea con """',
    desc: 'Bloques de texto con saltos de línea preservados y .trimIndent().',
    exercises: [
      {
        id: 'kt-u02-l14-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l14-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l14-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l14-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l14-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l14-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l14-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l14-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l14-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l14-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  15: {
    title: '15. Variables no Inicializadas',
    desc: 'Protección del compilador contra la lectura de memoria basura.',
    exercises: [
      {
        id: 'kt-u02-l15-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l15-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l15-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l15-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l15-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l15-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l15-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l15-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l15-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l15-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  16: {
    title: '16. Constantes de Compilación (const val)',
    desc: 'Valores inmutables evaluados antes del tiempo de ejecución a nivel superior.',
    exercises: [
      {
        id: 'kt-u02-l16-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l16-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l16-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l16-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l16-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l16-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l16-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l16-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l16-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l16-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  17: {
    title: '17. Desbordamiento de Enteros (Overflow)',
    desc: 'Qué ocurre al superar Int.MAX_VALUE y cómo detectarlo.',
    exercises: [
      {
        id: 'kt-u02-l17-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l17-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l17-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l17-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l17-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l17-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l17-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l17-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l17-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l17-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  18: {
    title: '18. Tipos Numéricos Especiales: Long y Byte',
    desc: 'El sufijo L para enteros de 64 bits y ahorro de memoria con Byte (8 bits).',
    exercises: [
      {
        id: 'kt-u02-l18-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l18-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l18-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l18-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l18-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l18-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l18-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l18-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l18-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l18-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  19: {
    title: '19. Proyecto: Estado de un Personaje',
    desc: 'Diseño del modelo de datos para un jugador: vida, nivel, nombre y estado activo.',
    exercises: [
      {
        id: 'kt-u02-l19-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l19-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l19-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l19-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l19-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l19-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l19-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l19-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l19-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l19-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
  20: {
    title: '20. Desafío de Maestría: Variables y Tipos',
    desc: 'Evaluación integral sin pistas de todos los conceptos de tipos de datos.',
    exercises: [
      {
        id: 'kt-u02-l20-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos clave de este nivel:',
        pairs: [
          { left: 'val', right: 'Variable inmutable (solo lectura)' },
          { left: 'var', right: 'Variable mutable (reasignable)' },
          { left: 'Int', right: 'Número entero de 32 bits' },
          { left: 'Double', right: 'Número decimal de 64 bits' }
        ],
        explanation: 'En Kotlin, la distinción entre tipos y mutabilidad es el pilar de la seguridad.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l20-e02',
        type: 'code_builder',
        prompt: 'Construye la declaración de variable inmutable para este nivel:',
        tokens: ['val', 'dato', '=', '10', 'var', 'let'],
        solution: ['val', 'dato', '=', '10'],
        hint: 'Usa val para declarar el identificador inmutable.',
        explanation: 'val crea una variable de solo lectura que conserva su valor en memoria.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l20-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar este código?',
        code: 'val base = 20\nval total = base + 5\nprintln(total)',
        options: ['20', '25', '205', 'Error'],
        correctOptionIndex: 1,
        explanation: '20 + 5 evalúa a 25 y se imprime en consola.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l20-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de compilación:',
        codeSnippet: [
          'val clave = 1234',
          'println(clave)',
          'clave = 5678 // Reasignación inválida'
        ],
        bugLineIndex: 2,
        explanation: 'Una variable val no puede reasignarse tras su inicialización.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l20-e05',
        type: 'code_cloze',
        prompt: 'Completa la palabra clave correspondiente:',
        codeWithBlank: '___ nivel = 1',
        options: ['val', 'fun', 'class', 'set'],
        correctOption: 'val',
        explanation: 'val declara la variable inmutable correctamente.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l20-e06',
        type: 'predict_output',
        prompt: '¿Qué valor tiene la variable al final?',
        code: 'var puntos = 100\npuntos += 50\nprintln(puntos)',
        options: ['100', '50', '150', '0'],
        correctOptionIndex: 2,
        explanation: '100 + 50 resulta en 150 tras la suma compuesta.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l20-e07',
        type: 'code_builder',
        prompt: 'Declara la variable mutable vidas inicializada en 3:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'const'],
        solution: ['var', 'vidas', '=', '3'],
        hint: 'Usa var para que el contador de vidas pueda variar.',
        explanation: 'var permite reasignaciones posteriores durante el juego.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l20-e08',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de datos con sus ejemplos:',
        pairs: [
          { left: '42', right: 'Tipo Int' },
          { left: '3.14', right: 'Tipo Double' },
          { left: '"Kotlin"', right: 'Tipo String' },
          { left: 'true', right: 'Tipo Boolean' }
        ],
        explanation: 'Kotlin infiere el tipo de dato exacto a partir del literal asignado.',
        xpReward: 15
      },
      {
        id: 'kt-u02-l20-e09',
        type: 'code_cloze',
        prompt: 'Para cadenas de texto utilizamos el tipo:',
        codeWithBlank: 'val mensaje: ___ = "Hola"',
        options: ['String', 'Int', 'Char', 'Boolean'],
        correctOption: 'String',
        explanation: 'String es el tipo de datos para cadenas de caracteres en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u02-l20-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica de declaración y uso:',
        lines: [
          'val nombre = "Dev"',
          'val saludo = "Bienvenido, $nombre"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero declaramos la variable base, luego construimos la plantilla y finalmente imprimimos.',
        xpReward: 20
      }
    ]
  },
};

export const KOTLIN_UNIT_02_LESSONS: Lesson[] = Object.keys(KOTLIN_U02_BANKS).map(lvlStr => {
  const lvl = Number(lvlStr);
  const data = KOTLIN_U02_BANKS[lvl];
  return {
    id: `kotlin-u02-l${String(lvl).padStart(2, '0')}`,
    path: 'kotlin',
    unit: 2,
    level: lvl,
    title: data.title,
    description: data.desc,
    exercises: data.exercises
  };
});
