import { Lesson, Exercise } from '../../../types/lesson';

// Base de preguntas pedagógicas por nivel de Kotlin (Unidad 1)
// Cada nivel tiene 10 preguntas específicas y variadas con rotación de opciones correctas
const KOTLIN_TOPIC_BANKS: Record<number, { title: string; desc: string; exercises: Exercise[] }> = {
  1: {
    title: '1. ¿Qué es un Algoritmo?',
    desc: 'Descompón cualquier problema en una secuencia lógica ordenada (Entrada, Proceso y Salida).',
    exercises: [
      {
        id: 'kt-u01-l01-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los componentes del modelo computacional IPO con su función:',
        pairs: [
          { left: 'Entrada (Input)', right: 'Datos que recibe el sistema desde teclado o sensores' },
          { left: 'Proceso', right: 'Instrucciones lógicas paso a paso para transformar datos' },
          { left: 'Salida (Output)', right: 'Resultado entregado en pantalla o consola' },
          { left: 'Algoritmo', right: 'Secuencia finita, ordenada y sin ambigüedades' }
        ],
        explanation: 'Todo programa informático recibe datos (Entrada), los transforma (Proceso) y produce un resultado (Salida).',
        xpReward: 15
      },
      {
        id: 'kt-u01-l01-e02',
        type: 'code_builder',
        prompt: 'Construye la instrucción para imprimir en consola el inicio del algoritmo:',
        tokens: ['println', '(', '"Inicio del programa"', ')', 'start', 'stop'],
        solution: ['println', '(', '"Inicio del programa"', ')'],
        hint: 'Usa la función println seguida de los paréntesis y el texto entre comillas.',
        explanation: 'En programación, un algoritmo comienza ejecutando la primera instrucción que encuentra de arriba hacia abajo.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l01-e03',
        type: 'predict_output',
        prompt: 'Si la entrada es 8 y el proceso suma 4, ¿cuál es la salida final?',
        code: 'val entrada = 8\nval salida = entrada + 4\nprintln(salida)',
        options: ['10', '12', '16', '84'],
        correctOptionIndex: 1,
        explanation: '8 + 4 = 12. La salida refleja la transformación del proceso sobre la entrada.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l01-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que intenta usar un dato antes de haberlo calculado:',
        codeSnippet: [
          'println(resultado) // ¿Existe ya resultado?',
          'val base = 10',
          'val resultado = base * 2'
        ],
        bugLineIndex: 0,
        explanation: 'Un algoritmo secuencial no puede imprimir una variable que aún no ha sido declarada ni calculada.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l01-e05',
        type: 'code_cloze',
        prompt: 'Completa la característica clave de todo algoritmo:',
        codeWithBlank: 'Un algoritmo debe ser ___ (debe terminar en un número finito de pasos):',
        options: ['finito', 'infinito', 'aleatorio', 'oculto'],
        correctOption: 'finito',
        explanation: 'Un algoritmo siempre debe tener un inicio y un fin bien determinados.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l01-e06',
        type: 'predict_output',
        prompt: '¿Qué valor final tiene la variable estado al terminar el proceso?',
        code: 'var estado = "inicio"\nestado = "procesando"\nestado = "listo"\nprintln(estado)',
        options: ['inicio', 'procesando', 'listo', 'null'],
        correctOptionIndex: 2,
        explanation: 'Las asignaciones se sobrescriben en orden cronológico; el último valor asignado fue "listo".',
        xpReward: 10
      },
      {
        id: 'kt-u01-l01-e07',
        type: 'code_builder',
        prompt: 'Arma la instrucción para guardar la Entrada (Input) inicial del algoritmo:',
        tokens: ['val', 'entrada', '=', '10', 'var', 'out'],
        solution: ['val', 'entrada', '=', '10'],
        hint: 'Declara la variable inmutable con val, asígnale el nombre entrada y el valor 10.',
        explanation: 'El primer paso de un algoritmo del modelo Entrada-Proceso-Salida es recibir y guardar los datos de entrada en variables.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l01-e08',
        type: 'predict_output',
        prompt: 'Si duplicamos y luego restamos 1 a la entrada 5, ¿qué imprime la terminal?',
        code: 'val n = 5\nval res = (n * 2) - 1\nprintln(res)',
        options: ['10', '8', '9', '5'],
        correctOptionIndex: 2,
        explanation: '(5 * 2) - 1 = 10 - 1 = 9.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l01-e09',
        type: 'code_cloze',
        prompt: 'Completa el tercer pilar del modelo computacional universal:',
        codeWithBlank: 'Un algoritmo informático requiere Entrada, Proceso y ___:',
        options: ['Salida', 'Internet', 'Baterías', 'Variables'],
        correctOption: 'Salida',
        explanation: 'El trinomio Entrada-Proceso-Salida es el fundamento universal de la computación.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l01-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia lógica para el modelo Entrada-Proceso-Salida:',
        lines: [
          'val entrada = 5',
          'val resultado = entrada * 2',
          'println(resultado)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Sigue el modelo IPO: primero la Entrada (val entrada = 5), luego el Proceso (duplicar el valor) y finalmente la Salida con println().',
        xpReward: 20
      }
    ]
  },
  2: {
    title: '2. La Primera Instrucción: println()',
    desc: 'Aprende a comunicarte con la terminal usando println().',
    exercises: [
      {
        id: 'kt-u01-l02-e01',
        type: 'code_builder',
        prompt: 'Ensambla la instrucción para imprimir el saludo oficial de todo programador:',
        tokens: ['println', '(', '"¡Hola, Mundo!"', ')', 'print', 'system'],
        solution: ['println', '(', '"¡Hola, Mundo!"', ')'],
        hint: 'Usa println con el texto entre comillas dobles dentro de los paréntesis.',
        explanation: 'println() envía el texto a la consola y salta a la siguiente línea.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l02-e02',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error de sintaxis por faltarle comillas:',
        codeSnippet: [
          'val mensaje = "Hola"',
          'println(Programador) // Faltan las comillas',
          'println("Fin")'
        ],
        bugLineIndex: 1,
        explanation: 'El texto literal siempre debe rodearse de comillas dobles; de lo contrario Kotlin busca una variable inexistente.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l02-e03',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola al ejecutar esta orden de impresión?',
        code: 'println("Kotlin 2.0")',
        options: ['Kotlin 2.0', '"Kotlin 2.0"', 'Error', 'println'],
        correctOptionIndex: 0,
        explanation: 'Las comillas dobles delimitan el texto pero nunca se imprimen en la salida final.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l02-e04',
        type: 'code_cloze',
        prompt: 'Selecciona la función que imprime en consola con salto de línea automático:',
        codeWithBlank: '___("Texto a mostrar")',
        options: ['println', 'echo', 'display', 'write'],
        correctOption: 'println',
        explanation: 'println viene de "print line" y añade automáticamente un salto \\n al terminar.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l02-e05',
        type: 'matching_pairs',
        prompt: 'Empareja los elementos sintácticos de println():',
        pairs: [
          { left: 'println', right: 'Nombre de la función de salida' },
          { left: '( )', right: 'Paréntesis que encierran argumentos' },
          { left: '" "', right: 'Comillas que delimitan una cadena String' },
          { left: ';', right: 'Punto y coma (opcional en Kotlin)' }
        ],
        explanation: 'En Kotlin los puntos y coma son opcionales y el texto siempre va entre comillas dobles.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l02-e06',
        type: 'predict_output',
        prompt: '¿Qué se imprime cuando la función println() no recibe argumentos?',
        code: 'println()\nprintln("A")',
        options: ['Una línea en blanco y luego A', 'Error de compilación', 'null', 'Solo A'],
        correctOptionIndex: 0,
        explanation: 'println() sin argumentos simplemente imprime un salto de línea en blanco.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l02-e07',
        type: 'code_builder',
        prompt: 'Arma la instrucción para imprimir un número entero sin comillas:',
        tokens: ['println', '(', '100', ')', '"100"'],
        solution: ['println', '(', '100', ')'],
        explanation: 'Los números literales no requieren comillas para ser impresos por println().',
        xpReward: 10
      },
      {
        id: 'kt-u01-l02-e08',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que tiene paréntesis sin cerrar:',
        codeSnippet: [
          'println("Paso 1")',
          'println("Paso 2" // Falta el paréntesis de cierre',
          'println("Paso 3")'
        ],
        bugLineIndex: 1,
        explanation: 'Cada paréntesis abierto ( debe tener su respectivo paréntesis de cierre ).',
        xpReward: 15
      },
      {
        id: 'kt-u01-l02-e09',
        type: 'code_cloze',
        prompt: '¿Qué carácter delimita una cadena de texto en Kotlin?',
        codeWithBlank: 'println(___Hola Mundo")',
        options: ['"', "'", '`', '//'],
        correctOption: '"',
        explanation: 'Las cadenas String en Kotlin se delimitan estrictamente con comillas dobles "".',
        xpReward: 10
      },
      {
        id: 'kt-u01-l02-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la bienvenida de dos líneas en la consola:',
        lines: [
          'println("Iniciando aplicación...")',
          'println("Sistema cargado al 100%")'
        ],
        correctOrder: [0, 1],
        explanation: 'Los println se ejecutan secuencialmente de arriba hacia abajo.',
        xpReward: 20
      }
    ]
  },
  3: {
    title: '3. println vs print',
    desc: 'Comprende la diferencia entre imprimir con y sin salto de línea.',
    exercises: [
      {
        id: 'kt-u01-l03-e01',
        type: 'predict_output',
        prompt: '¿Qué mostrará la consola tras ejecutar estas dos llamadas a print()?',
        code: 'print("Hola ")\nprint("Kotlin")',
        options: ['Hola\nKotlin', 'Hola Kotlin', 'Kotlin Hola', 'Error'],
        correctOptionIndex: 1,
        explanation: 'print() no agrega salto de línea, por lo que el siguiente texto continúa en el mismo renglón.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l03-e02',
        type: 'matching_pairs',
        prompt: 'Empareja cada función de impresión con su comportamiento:',
        pairs: [
          { left: 'print()', right: 'Mantiene el cursor en la misma línea' },
          { left: 'println()', right: 'Inserta un salto de línea al final' },
          { left: '\\n', right: 'Carácter especial de nueva línea' },
          { left: 'Consola', right: 'Salida estándar del sistema' }
        ],
        explanation: 'La diferencia principal entre print y println es el salto de línea automático.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l03-e03',
        type: 'code_builder',
        prompt: 'Construye la orden print para imprimir sin salto:',
        tokens: ['print', '(', '"Cargando..."', ')', 'println'],
        solution: ['print', '(', '"Cargando..."', ')'],
        explanation: 'print() es ideal cuando quieres armar un mensaje por partes antes de pasar al siguiente renglón.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l03-e04',
        type: 'predict_output',
        prompt: '¿Cuántas líneas de texto se mostrarán en la consola?',
        code: 'print("A")\nprint("B")\nprintln("C")\nprint("D")',
        options: ['1 línea', '2 líneas', '3 líneas', '4 líneas'],
        correctOptionIndex: 1,
        explanation: '"A", "B" y "C" se imprimen juntos en la primera línea. Luego println("C") salta y "D" queda en la segunda.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l03-e05',
        type: 'code_cloze',
        prompt: 'Si quieres que el siguiente texto aparezca abajo, debes usar:',
        codeWithBlank: '___("Texto final del renglón")',
        options: ['println', 'print', 'push', 'render'],
        correctOption: 'println',
        explanation: 'println coloca el cursor en la línea inferior.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l03-e06',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que contiene un error ortográfico en el nombre de la función:',
        codeSnippet: [
          'print("Conectando")',
          'printl(" a la red...") // Error de tipeo',
          'println(" [OK]")'
        ],
        bugLineIndex: 1,
        explanation: 'printl no existe en Kotlin; la función estándar se llama println.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l03-e07',
        type: 'predict_output',
        prompt: '¿Qué resultado visual produce este código?',
        code: 'print("1")\nprint("2")\nprint("3")',
        options: ['1 2 3', '1\n2\n3', '123', '6'],
        correctOptionIndex: 2,
        explanation: 'print() sin espacios produce los caracteres inmediatamente contiguos: "123".',
        xpReward: 10
      },
      {
        id: 'kt-u01-l03-e08',
        type: 'code_builder',
        prompt: 'Combina un print con un println final para completar la barra:',
        tokens: ['print', '(', '"["', ')', 'println'],
        solution: ['print', '(', '"["', ')'],
        explanation: 'Empieza la barra con print("[") para agregar el contenido después.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l03-e09',
        type: 'code_cloze',
        prompt: 'Para forzar un salto de línea dentro de un print podemos insertar:',
        codeWithBlank: 'print("Línea 1___Línea 2")',
        options: ['\\n', '\\t', '\\s', '\\b'],
        correctOption: '\\n',
        explanation: '\\n es la secuencia de escape para salto de línea en strings.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l03-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena las líneas para imprimir "Descargando: 100%" en un solo renglón:',
        lines: [
          'print("Descargando: ")',
          'println("100%")'
        ],
        correctOrder: [0, 1],
        explanation: 'print imprime el prefijo y println agrega el porcentaje cerrando el renglón.',
        xpReward: 20
      }
    ]
  },
  4: {
    title: '4. Estructura de main()',
    desc: 'Todo programa en Kotlin inicia dentro de la función main().',
    exercises: [
      {
        id: 'kt-u01-l04-e01',
        type: 'code_builder',
        prompt: 'Construye la cabecera de la función principal de Kotlin:',
        tokens: ['fun', 'main', '(', ')', '{', '}', 'val'],
        solution: ['fun', 'main', '(', ')'],
        hint: 'Usa la palabra clave fun seguida de main y paréntesis.',
        explanation: 'fun declara una función; main() es el punto de entrada oficial.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l04-e02',
        type: 'matching_pairs',
        prompt: 'Empareja los bloques de la función main():',
        pairs: [
          { left: 'fun', right: 'Palabra clave que declara una función' },
          { left: 'main()', right: 'Punto de entrada ejecutable por la JVM' },
          { left: '{ }', right: 'Llaves que delimitan el bloque de código' },
          { left: 'JVM', right: 'Máquina virtual donde corre el código Kotlin' }
        ],
        explanation: 'La JVM busca la función fun main() para saber por dónde comenzar la ejecución.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l04-e03',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con error en la declaración de la función:',
        codeSnippet: [
          'function main() { // Palabra clave incorrecta en Kotlin',
          '    println("Hola")',
          '}'
        ],
        bugLineIndex: 0,
        explanation: 'En Kotlin se usa "fun", no "function" (que es de JavaScript).',
        xpReward: 15
      },
      {
        id: 'kt-u01-l04-e04',
        type: 'code_cloze',
        prompt: 'Selecciona la palabra reservada para declarar una función en Kotlin:',
        codeWithBlank: '___ main() { println("Listo") }',
        options: ['def', 'fun', 'fn', 'function'],
        correctOption: 'fun',
        explanation: 'En Kotlin las funciones siempre inician con la palabra reservada "fun".',
        xpReward: 10
      },
      {
        id: 'kt-u01-l04-e05',
        type: 'predict_output',
        prompt: '¿Qué se ejecutará cuando la JVM inicie este archivo?',
        code: 'fun main() {\n    println("Punto de inicio")\n}',
        options: ['Punto de inicio', 'main()', 'null', 'Error de función'],
        correctOptionIndex: 0,
        explanation: 'La función main() se ejecuta automáticamente al correr el programa.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l04-e06',
        type: 'parsons_puzzle',
        prompt: 'Ordena la estructura completa de un programa mínimo funcional:',
        lines: [
          'fun main() {',
          '    println("Ejecutando")',
          '}'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'La función abre con llave {, contiene las instrucciones y cierra con }.',
        xpReward: 20
      },
      {
        id: 'kt-u01-l04-e07',
        type: 'code_cloze',
        prompt: '¿Con qué carácter se encierran las instrucciones de una función?',
        codeWithBlank: 'fun main() ___ println("Dentro del bloque") }',
        options: ['{', '(', '[', '<'],
        correctOption: '{',
        explanation: 'Los bloques de código en Kotlin se abren con { y se cierran con }.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l04-e08',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde falta cerrar la llave del bloque:',
        codeSnippet: [
          'fun main() {',
          '    println("Bienvenido")',
          ') // Paréntesis inválido en lugar de llave'
        ],
        bugLineIndex: 2,
        explanation: 'El bloque abierto con { debe cerrarse con una llave }, no con un paréntesis.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l04-e09',
        type: 'code_builder',
        prompt: 'Construye la estructura completa de una función main() vacía:',
        tokens: ['fun', 'main', '(', ')', '{', '}', 'void', 'class'],
        solution: ['fun', 'main', '(', ')', '{', '}'],
        hint: 'Palabra clave fun, nombre main, paréntesis () y llaves de bloque {}.',
        explanation: 'En Kotlin, una función se declara con fun, sus parámetros entre paréntesis () y su cuerpo delimitado por llaves {}.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l04-e10',
        type: 'predict_output',
        prompt: 'Si tenemos código fuera de main() sin función, ¿qué sucede?',
        code: '// println("Afuera")\nfun main() {\n    println("Dentro")\n}',
        options: ['Error si no está en función', 'Solo se imprime "Dentro"', 'Se imprime ambos', 'Se ignora main'],
        correctOptionIndex: 1,
        explanation: 'Las sentencias ejecutables en Kotlin deben residir dentro de funciones como main().',
        xpReward: 10
      }
    ]
  },
  5: {
    title: '5. Diagramas de Flujo',
    desc: 'Óvalos, rectángulos y rombos para mapear decisiones lógicas.',
    exercises: [
      {
        id: 'kt-u01-l05-e01',
        type: 'matching_pairs',
        prompt: 'Empareja cada símbolo del diagrama de flujo con su función:',
        pairs: [
          { left: 'Óvalo / Elipse', right: 'Inicio o Fin del algoritmo' },
          { left: 'Rectángulo', right: 'Proceso o cálculo computacional' },
          { left: 'Rombo', right: 'Decisión condicional (¿Sí o No?)' },
          { left: 'Paralelogramo', right: 'Entrada o Salida de datos' }
        ],
        explanation: 'Los diagramas de flujo representan gráficamente los algoritmos usando formas geométricas estandarizadas.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l05-e02',
        type: 'predict_output',
        prompt: 'En un rombo de decisión que evalúa "¿edad >= 18?", ¿cuántos caminos de salida surgen?',
        code: '// Rombo de decisión:\n// ¿edad >= 18?',
        options: ['Exactamente 2 caminos: Verdadero (Sí) y Falso (No)', '1 solo camino', '4 caminos', 'Ninguno'],
        correctOptionIndex: 0,
        explanation: 'Una condición booleana bifurca el flujo en dos caminos mutuamente excluyentes: Verdadero o Falso.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l05-e03',
        type: 'code_cloze',
        prompt: '¿Qué figura geométrica representa el bloque de inicio o fin de un algoritmo?',
        codeWithBlank: 'El nodo que marca el inicio se dibuja como un ___:',
        options: ['Óvalo', 'Rombo', 'Triángulo', 'Pentágono'],
        correctOption: 'Óvalo',
        explanation: 'Los óvalos o rectángulos redondeados simbolizan los terminales de inicio y fin.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l05-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con una asociación errónea en la simbología de diagramas:',
        codeSnippet: [
          'El rectángulo representa un cálculo (ej: total = precio * cantidad)',
          'El rombo evalúa una condición lógica',
          'El rombo se usa para imprimir texto en la impresora // ¡Error! Es para decisiones'
        ],
        bugLineIndex: 2,
        explanation: 'El rombo es exclusivamente para decisiones lógicas con bifurcación (Sí/No).',
        xpReward: 15
      },
      {
        id: 'kt-u01-l05-e05',
        type: 'code_builder',
        prompt: 'Construye la expresión en Kotlin que corresponde al rombo "¿saldo >= precio?":',
        tokens: ['if', '(', 'saldo', '>=', 'precio', ')', 'then', 'else'],
        solution: ['if', '(', 'saldo', '>=', 'precio', ')'],
        explanation: 'En código Kotlin, el rombo de decisión se traduce directamente en una sentencia if (condición).',
        xpReward: 15
      },
      {
        id: 'kt-u01-l05-e06',
        type: 'predict_output',
        prompt: 'Si un diagrama de flujo no tiene un óvalo de "Fin", ¿qué problema presenta?',
        code: '// Algoritmo sin nodo final\n// ¿Qué ocurre?',
        options: [
          'Es un bucle infinito que no garantiza terminar (rompe la finitud)',
          'Funciona más rápido',
          'No se puede convertir a código',
          'Se apaga la computadora'
        ],
        correctOptionIndex: 0,
        explanation: 'Un algoritmo debe ser finito. Sin un estado terminal, el flujo podría no detenerse nunca.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l05-e07',
        type: 'matching_pairs',
        prompt: 'Empareja el concepto de diagrama con su traducción a código Kotlin:',
        pairs: [
          { left: 'Inicio', right: 'fun main() {' },
          { left: 'Proceso rectangular', right: 'val x = 10 + 5' },
          { left: 'Rombo decisional', right: 'if (x > 0)' },
          { left: 'Fin', right: '}' }
        ],
        explanation: 'Todo diagrama de flujo tiene un equivalente directo en la sintaxis de un lenguaje de programación.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l05-e08',
        type: 'code_cloze',
        prompt: 'Las líneas con punta de flecha que unen los bloques se llaman:',
        codeWithBlank: 'Las flechas representan las líneas de ___ del algoritmo:',
        options: ['flujo', 'red', 'memoria', 'retorno'],
        correctOption: 'flujo',
        explanation: 'Las líneas de flujo indican el orden secuencial estricto en que se deben ejecutar los pasos.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l05-e09',
        type: 'predict_output',
        prompt: '¿Por qué los ingenieros de software diseñan diagramas de flujo antes de escribir código complejo?',
        code: '// Planificación visual previa\n// ¿Cuál es el beneficio?',
        options: [
          'Para detectar errores de lógica antes de invertir tiempo en sintaxis',
          'Porque la computadora no entiende texto',
          'Para que el código ocupe más gigabytes',
          'Es un requisito obligatorio para instalar Kotlin'
        ],
        correctOptionIndex: 0,
        explanation: 'Visualizar la lógica permite validar los caminos y casos extremos antes de codificar.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l05-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la secuencia del algoritmo para validar acceso a un juego:',
        lines: [
          'val edad = 16',
          'val esMayor = edad >= 18',
          'println("¿Tiene acceso? $esMayor")'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Entrada del dato (edad), proceso de decisión (comparación) y salida del resultado.',
        xpReward: 20
      }
    ]
  },
  6: {
    title: '6. Variables en Memoria',
    desc: 'Concepto de celda de memoria, identificadores y almacenamiento en RAM.',
    exercises: [
      {
        id: 'kt-u01-l06-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los elementos de una variable:',
        pairs: [
          { left: 'Nombre (Identificador)', right: 'Etiqueta con la que llamamos al dato' },
          { left: 'Valor', right: 'El contenido guardado en la celda de memoria' },
          { left: 'Tipo de dato', right: 'Define qué clase de valor puede almacenar' },
          { left: 'Dirección RAM', right: 'Ubicación física en el chip de memoria' }
        ],
        explanation: 'Una variable es una casilla con nombre en la memoria RAM que guarda un valor determinado.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l06-e02',
        type: 'predict_output',
        prompt: '¿Qué valor se imprimirá al final en la consola?',
        code: 'val vidas = 3\nval bonus = 2\nval total = vidas + bonus\nprintln(total)',
        options: ['3', '2', '5', 'vidas + bonus'],
        correctOptionIndex: 2,
        explanation: 'total almacena el resultado de evaluar la expresión: 3 + 2 = 5.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l06-e03',
        type: 'code_cloze',
        prompt: 'Completa la asignación del valor a la variable:',
        codeWithBlank: 'val puntos ___ 100',
        options: ['=', '==', ':', '->'],
        correctOption: '=',
        explanation: 'El signo igual (=) es el operador de asignación que coloca el valor dentro de la variable.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l06-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con un nombre de identificador no permitido en Kotlin:',
        codeSnippet: [
          'val puntuacion = 50',
          'val 1erLugar = "Oro" // ¡Los nombres no pueden comenzar con dígitos!',
          'val totalVentas = 1000'
        ],
        bugLineIndex: 1,
        explanation: 'En Kotlin los identificadores no pueden comenzar con números (1erLugar es inválido; debe ser primerLugar).',
        xpReward: 15
      },
      {
        id: 'kt-u01-l06-e05',
        type: 'code_builder',
        prompt: 'Declara una variable inmutable llamada \'nivel\' con valor 1:',
        tokens: ['val', 'nivel', '=', '1', 'var', 'int'],
        solution: ['val', 'nivel', '=', '1'],
        explanation: 'Sintaxis canónica de declaración: val nombre = valor.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l06-e06',
        type: 'predict_output',
        prompt: '¿Qué convención de nombres (casing) es el estándar recomendado para variables en Kotlin?',
        code: 'val velocidadMaxima = 120 // ¿Cómo se llama esta convención?',
        options: [
          'camelCase (primera letra minúscula, siguientes palabras con mayúscula)',
          'snake_case con guiones bajos',
          'kebab-case con guiones medios',
          'TODO_MAYUSCULAS'
        ],
        correctOptionIndex: 0,
        explanation: 'Kotlin utiliza camelCase oficial para nombrar variables y funciones.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l06-e07',
        type: 'matching_pairs',
        prompt: 'Empareja los nombres válidos e inválidos de variables:',
        pairs: [
          { left: 'totalPuntos', right: 'Válido en camelCase' },
          { left: '2puntos', right: 'Inválido: inicia con número' },
          { left: 'precio-final', right: 'Inválido: guión medio no permitido' },
          { left: '_privada', right: 'Válido: puede iniciar con guión bajo' }
        ],
        explanation: 'Reglas de nomenclatura léxica de Kotlin.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l06-e08',
        type: 'code_cloze',
        prompt: '¿Qué palabra reservada se usa para constantes inmutables en Kotlin?',
        codeWithBlank: '___ nombre = "Alex"',
        options: ['val', 'let', 'set', 'def'],
        correctOption: 'val',
        explanation: 'val (value) declara una referencia de solo lectura.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l06-e09',
        type: 'predict_output',
        prompt: 'Si declaras "val a = 5" y "val b = a", ¿qué pasa con el valor de b si a nunca cambia?',
        code: 'val a = 5\nval b = a\nprintln(b)',
        options: ['5', 'a', 'null', '0'],
        correctOptionIndex: 0,
        explanation: 'b recibe una copia del valor que tenía a en ese instante, que es 5.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l06-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la declaración e impresión de dos datos en memoria:',
        lines: [
          'val saludo = "Bienvenido"',
          'val usuario = "Carlos"',
          'println(saludo)'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Se definen las variables y luego se utilizan.',
        xpReward: 20
      }
    ]
  },
  7: {
    title: '7. Inmutabilidad con val',
    desc: 'Constantes de solo lectura para evitar errores en tu programa.',
    exercises: [
      {
        id: 'kt-u01-l07-e01',
        type: 'predict_output',
        prompt: '¿Qué sucede si intentas cambiar el valor de una constante declarada con val?',
        code: 'val pi = 3.14\npi = 3.1416 // ¿Qué pasa aquí?',
        options: [
          'Se actualiza sin problemas',
          'Error de compilación: Val cannot be reassigned',
          'Se crea una nueva variable',
          'Se redondea a 3'
        ],
        correctOptionIndex: 1,
        explanation: 'Las variables val son inmutables. Una vez asignadas, el compilador prohíbe reasignarlas.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l07-e02',
        type: 'code_builder',
        prompt: 'Declara la constante inmutable del número PI:',
        tokens: ['val', 'pi', '=', '3.1416', 'var', 'const'],
        solution: ['val', 'pi', '=', '3.1416'],
        explanation: 'val garantiza que el valor de pi no pueda ser corrompido accidentalmente.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l07-e03',
        type: 'code_cloze',
        prompt: 'Completa la regla dorada de desarrollo en Kotlin:',
        codeWithBlank: 'En Kotlin se debe usar ___ por defecto a menos que necesites reasignar:',
        options: ['val', 'var', 'global', 'dynamic'],
        correctOption: 'val',
        explanation: 'El equipo de Kotlin recomienda usar val por defecto para prevenir bugs de estado mutable.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l07-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que causa un error de compilación al intentar modificar un val:',
        codeSnippet: [
          'val codigoSeguridad = 9944',
          'println("Código: " + codigoSeguridad)',
          'codigoSeguridad = 1122 // ¡Error! val no se puede reasignar'
        ],
        bugLineIndex: 2,
        explanation: 'La línea 3 intenta reasignar codigoSeguridad que fue declarada con val.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l07-e05',
        type: 'matching_pairs',
        prompt: 'Empareja val con sus características esenciales:',
        pairs: [
          { left: 'val', right: 'De solo lectura (read-only)' },
          { left: 'Seguridad', right: 'Evita modificaciones accidentales de datos' },
          { left: 'Inferencia de tipo', right: 'El compilador deduce el tipo automáticamente' },
          { left: 'Hilos (Threads)', right: 'Es seguro compartir datos inmutables sin bloqueos' }
        ],
        explanation: 'La inmutabilidad es la piedra angular de la programación moderna y funcional.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l07-e06',
        type: 'predict_output',
        prompt: '¿Es posible declarar un val sin asignarlo inmediatamente si se inicializa antes de usarlo?',
        code: 'val mensaje: String\nmensaje = "Inicializado"\nprintln(mensaje)',
        options: [
          'No, da error si no se inicializa en la misma línea',
          'Sí, se puede inicializar una sola vez más adelante antes de ser leído',
          'Solo funciona con números',
          'Produce un valor null'
        ],
        correctOptionIndex: 1,
        explanation: 'Kotlin permite asignación diferida de un val siempre que el compilador compruebe que se asigna exactamente una vez.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l07-e07',
        type: 'code_builder',
        prompt: 'Declara la constante inmutable de gravedad terrestre:',
        tokens: ['val', 'gravedad', '=', '9.8', ';', 'var'],
        solution: ['val', 'gravedad', '=', '9.8'],
        explanation: 'Los valores de la física son ideales para ser constantes inmutables val.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l07-e08',
        type: 'code_cloze',
        prompt: 'val proviene de la palabra en inglés:',
        codeWithBlank: 'val = ___ (valor inmutable)',
        options: ['value', 'variable', 'valid', 'valuation'],
        correctOption: 'value',
        explanation: 'val significa "value" (un valor fijo), mientras que var significa "variable".',
        xpReward: 10
      },
      {
        id: 'kt-u01-l07-e09',
        type: 'predict_output',
        prompt: '¿Qué devuelve la consola tras ejecutar este código?',
        code: 'val tasa = 0.15\nprintln(tasa * 100)',
        options: ['15.0', '0.15', '15', 'Error'],
        correctOptionIndex: 0,
        explanation: '0.15 * 100 = 15.0 en aritmética de coma flotante Double.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l07-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la declaración de una constante y su uso para calcular un total:',
        lines: [
          'val precioUnitario = 25',
          'val total = precioUnitario * 4',
          'println("Total: $total")'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'El valor inmutable se define primero y se utiliza en cálculos posteriores.',
        xpReward: 20
      }
    ]
  },
  8: {
    title: '8. Mutabilidad con var',
    desc: 'Variables cuyo valor puede cambiar a lo largo del tiempo.',
    exercises: [
      {
        id: 'kt-u01-l08-e01',
        type: 'predict_output',
        prompt: '¿Qué valor se imprimirá al final en la consola?',
        code: 'var contador = 1\ncontador = 2\ncontador = 3\nprintln(contador)',
        options: ['1', '2', '3', '6'],
        correctOptionIndex: 2,
        explanation: 'var permite reasignar el valor de la celda de memoria; el valor final es 3.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l08-e02',
        type: 'code_builder',
        prompt: 'Declara una variable mutable para guardar las vidas del jugador:',
        tokens: ['var', 'vidas', '=', '3', 'val', 'let'],
        solution: ['var', 'vidas', '=', '3'],
        explanation: 'Las vidas cambian durante una partida, por lo que requieren la palabra clave var.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l08-e03',
        type: 'code_cloze',
        prompt: 'Completa la reasignación para incrementar el puntaje:',
        codeWithBlank: 'var puntos = 10\npuntos ___ puntos + 5',
        options: ['=', '==', ':', '->'],
        correctOption: '=',
        explanation: 'El operador = sobrescribe el valor previo con el nuevo cálculo.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l08-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde se intenta cambiar el TIPO de dato de una variable var:',
        codeSnippet: [
          'var edad = 20 // edad es de tipo Int',
          'edad = 21 // Válido: sigue siendo Int',
          'edad = "veintidós" // ¡Error! Kotlin no permite cambiar el tipo'
        ],
        bugLineIndex: 2,
        explanation: 'En Kotlin, var permite cambiar el valor, pero NUNCA el tipo de dato con el que nació (edad es Int, no String).',
        xpReward: 15
      },
      {
        id: 'kt-u01-l08-e05',
        type: 'matching_pairs',
        prompt: 'Empareja val y var con su caso de uso apropiado:',
        pairs: [
          { left: 'val fechaNacimiento', right: 'Inmutable: nunca cambia en la vida' },
          { left: 'var saldoBancario', right: 'Mutable: varía con depósitos y retiros' },
          { left: 'val dni', right: 'Inmutable: documento de identidad fijo' },
          { left: 'var velocidad', right: 'Mutable: sube y baja al acelerar' }
        ],
        explanation: 'Elegir correctamente entre val y var modela fielmente la realidad del dominio.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l08-e06',
        type: 'predict_output',
        prompt: '¿Qué imprime la consola tras restar una vida?',
        code: 'var vidas = 5\nvidas = vidas - 1\nprintln(vidas)',
        options: ['5', '4', '3', 'vidas - 1'],
        correctOptionIndex: 1,
        explanation: '5 - 1 = 4. La variable vidas ahora almacena el entero 4.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l08-e07',
        type: 'code_builder',
        prompt: 'Actualiza el valor de la variable saldo a 500:',
        tokens: ['saldo', '=', '500', ';', 'var', 'val'],
        solution: ['saldo', '=', '500'],
        explanation: 'Para reasignar una variable existente NO se vuelve a escribir var.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l08-e08',
        type: 'code_cloze',
        prompt: 'Para declarar una variable que cambiará a lo largo del tiempo usamos:',
        codeWithBlank: '___ nivel = 1',
        options: ['var', 'val', 'const', 'fix'],
        correctOption: 'var',
        explanation: 'var define mutabilidad.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l08-e09',
        type: 'predict_output',
        prompt: '¿Qué hace el operador abreviado += ?',
        code: 'var x = 10\nx += 5\nprintln(x)',
        options: ['10', '15', '5', '50'],
        correctOptionIndex: 1,
        explanation: 'x += 5 equivale exactamente a x = x + 5 (10 + 5 = 15).',
        xpReward: 10
      },
      {
        id: 'kt-u01-l08-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena el ciclo de vida de un contador:',
        lines: [
          'var pasos = 0',
          'pasos = pasos + 100',
          'println("Pasos hoy: $pasos")'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Inicialización mutable, actualización y reporte final.',
        xpReward: 20
      }
    ]
  },
  9: {
    title: '9. Caza de Reasignación Errónea',
    desc: 'Detecta el error común de intentar cambiar una constante val.',
    exercises: [
      {
        id: 'kt-u01-l09-e01',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce el error de compilación "Val cannot be reassigned":',
        codeSnippet: [
          'val idUsuario = 101',
          'println("ID actual: " + idUsuario)',
          'idUsuario = 102 // ¡Intento ilegal de reasignar un val!'
        ],
        bugLineIndex: 2,
        explanation: 'idUsuario fue declarado con val; reasignarlo es un error de compilación fatal.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l09-e02',
        type: 'predict_output',
        prompt: '¿Qué mensaje exacto emite el compilador de Kotlin al reasignar un val?',
        code: 'val max = 10\nmax = 20',
        options: [
          'Val cannot be reassigned',
          'NullPointerException',
          'IndexOutOfBoundsException',
          'Syntax OK'
        ],
        correctOptionIndex: 0,
        explanation: '"Val cannot be reassigned" es el mensaje canónico del compilador de Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l09-e03',
        type: 'code_cloze',
        prompt: 'Si necesitas que una variable sea reasignable, cambia "val" por:',
        codeWithBlank: '___ puntaje = 0 // Ahora sí podrá reasignarse',
        options: ['var', 'let', 'mut', 'set'],
        correctOption: 'var',
        explanation: 'Cambiar val por var habilita la reasignación libre.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l09-e04',
        type: 'matching_pairs',
        prompt: 'Empareja el error con la solución técnica correcta:',
        pairs: [
          { left: 'Val cannot be reassigned', right: 'Cambiar la declaración a var' },
          { left: 'Type mismatch: String to Int', right: 'Mantener el tipo de dato original' },
          { left: 'Unresolved reference', right: 'Declarar la variable antes de usarla' },
          { left: 'Variable must be initialized', right: 'Asignar un valor inicial a la variable' }
        ],
        explanation: 'Conocer los errores del compilador te permite resolverlos en segundos.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l09-e05',
        type: 'code_builder',
        prompt: 'Corrige la declaración para que la variable \'racha\' sí pueda cambiar:',
        tokens: ['var', 'racha', '=', '0', 'val', 'const'],
        solution: ['var', 'racha', '=', '0'],
        explanation: 'Usar var permite modificar racha cada día que el usuario practica.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l09-e06',
        type: 'predict_output',
        prompt: '¿Por qué Kotlin te advierte con un aviso amarillo si declaras una variable con "var" pero nunca la modificas?',
        code: 'var ciudad = "Bogotá" // ¡Nunca se vuelve a reasignar!',
        options: [
          'Sugiere cambiar a val porque la inmutabilidad es más segura y limpia',
          'Borra la variable automáticamente',
          'Causa que el programa se cuelgue',
          'Es un error crítico que no compila'
        ],
        correctOptionIndex: 0,
        explanation: 'Kotlin fomenta las buenas prácticas advirtiendo: "Variable is never modified and can be declared immutable using val".',
        xpReward: 10
      },
      {
        id: 'kt-u01-l09-e07',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde se intentó reasignar el precio con descuento que era inmutable:',
        codeSnippet: [
          'val precioOriginal = 100',
          'val descuento = 20',
          'descuento = 30 // ¡Error! descuento es val'
        ],
        bugLineIndex: 2,
        explanation: 'descuento es inmutable y no se le puede asignar un nuevo valor.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l09-e08',
        type: 'code_cloze',
        prompt: 'Para corregir el bug de reasignación en "val x = 1; x = 2", debemos escribir en la primera línea:',
        codeWithBlank: '___ x = 1',
        options: ['var', 'val', 'const', 'def'],
        correctOption: 'var',
        explanation: 'var autoriza mutabilidad.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l09-e09',
        type: 'predict_output',
        prompt: '¿Compilará este código? "val a = 10; val b = a + 5; println(b)"',
        code: 'val a = 10\nval b = a + 5\nprintln(b)',
        options: ['Sí, compila e imprime 15 (no hay reasignación, se crea una variable nueva b)', 'No, a no puede sumarse', 'Error de val', 'null'],
        correctOptionIndex: 0,
        explanation: 'Crear una variable nueva a partir de otra inmutable es 100% válido y recomendado.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l09-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la rutina corregida con variable mutable:',
        lines: [
          'var intentos = 3',
          'intentos = intentos - 1',
          'println("Intentos restantes: $intentos")'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'El contador mutable se reduce limpiamente.',
        xpReward: 20
      }
    ]
  },
  10: {
    title: '10. Números Enteros: Int',
    desc: 'Almacena cantidades enteras de 32 bits positivas y negativas.',
    exercises: [
      {
        id: 'kt-u01-l10-e01',
        type: 'matching_pairs',
        prompt: 'Empareja el tipo de entero con su capacidad en bits:',
        pairs: [
          { left: 'Byte', right: '8 bits (-128 a 127)' },
          { left: 'Short', right: '16 bits (-32,768 a 32,767)' },
          { left: 'Int', right: '32 bits (estándar hasta ~2 mil millones)' },
          { left: 'Long', right: '64 bits (números astronómicos con sufijo L)' }
        ],
        explanation: 'Int es el tipo entero por defecto en Kotlin cuando escribes un número sin decimales.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l10-e02',
        type: 'predict_output',
        prompt: '¿Qué tipo deduce Kotlin automáticamente para la variable "val poblacion = 500000"?',
        code: 'val poblacion = 500000\n// ¿Qué tipo de dato es?',
        options: ['String', 'Int', 'Double', 'Boolean'],
        correctOptionIndex: 1,
        explanation: 'Todo número entero literal cabe por defecto en un Int.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l10-e03',
        type: 'code_builder',
        prompt: 'Declara una variable con tipo explícito Int llamada \'edad\' con valor 25:',
        tokens: ['val', 'edad', ':', 'Int', '=', '25', ';', 'Double'],
        solution: ['val', 'edad', ':', 'Int', '=', '25'],
        explanation: 'Sintaxis de tipado explícito: val variable: Tipo = valor.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l10-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con un error de asignación de decimal a un tipo entero Int:',
        codeSnippet: [
          'val items: Int = 10',
          'val precio: Int = 19.99 // ¡19.99 no es un Int, es un Double!',
          'val stock: Int = 0'
        ],
        bugLineIndex: 1,
        explanation: 'Un tipo Int solo admite números enteros. 19.99 tiene parte decimal y causa error de tipo.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l10-e05',
        type: 'code_cloze',
        prompt: 'Para facilitar la lectura de números grandes en Kotlin, puedes usar guiones bajos:',
        codeWithBlank: 'val unMillon = 1___000___000',
        options: ['_', '-', '.', ','],
        correctOption: '_',
        explanation: 'Kotlin permite usar guiones bajos (_) como separadores visuales de miles en números literales.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l10-e06',
        type: 'predict_output',
        prompt: '¿Puede un tipo Int almacenar números negativos?',
        code: 'val temperatura: Int = -15\nprintln(temperatura)',
        options: ['Sí, imprime -15', 'No, solo números positivos', 'Error de compilación', 'Imprime 0'],
        correctOptionIndex: 0,
        explanation: 'Int tiene signo (signed) y almacena desde -2,147,483,648 hasta 2,147,483,647.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l10-e07',
        type: 'code_builder',
        prompt: 'Calcula la suma de dos enteros en una nueva variable:',
        tokens: ['val', 'suma', '=', 'a', '+', 'b', 'Int'],
        solution: ['val', 'suma', '=', 'a', '+', 'b'],
        explanation: 'La suma de dos Int produce otro Int.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l10-e08',
        type: 'code_cloze',
        prompt: '¿Cómo se llama el tipo entero de 64 bits para números que superan los 2 mil millones?',
        codeWithBlank: 'val estrellas: ___ = 3000000000L',
        options: ['Long', 'Int', 'BigInt', 'Huge'],
        correctOption: 'Long',
        explanation: 'Long se usa para números enteros masivos y lleva una L mayúscula al final.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l10-e09',
        type: 'predict_output',
        prompt: '¿Qué devuelve la propiedad Int.MAX_VALUE en Kotlin?',
        code: 'println(Int.MAX_VALUE > 2000000000)',
        options: ['true (es aproximadamente 2.14 mil millones)', 'false', 'Error', 'null'],
        correctOptionIndex: 0,
        explanation: 'Int.MAX_VALUE vale exactamente 2,147,483,647.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l10-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena el cálculo de la edad a partir del año de nacimiento:',
        lines: [
          'val anioNacimiento: Int = 2000',
          'val anioActual: Int = 2026',
          'val edad: Int = anioActual - anioNacimiento'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Cálculo aritmético entre enteros para determinar la edad.',
        xpReward: 20
      }
    ]
  },
  11: {
    title: '11. Decimales: Double',
    desc: 'Aprende a trabajar con precisión de coma flotante de 64 bits.',
    exercises: [
      {
        id: 'kt-u01-l11-e01',
        type: 'predict_output',
        prompt: '¿Qué tipo deduce Kotlin automáticamente para el número literal "3.14"?',
        code: 'val pi = 3.14\n// ¿De qué tipo es pi?',
        options: ['Int', 'Float', 'Double', 'String'],
        correctOptionIndex: 2,
        explanation: 'Todo número con punto decimal en Kotlin se infiere automáticamente como Double (64 bits).',
        xpReward: 10
      },
      {
        id: 'kt-u01-l11-e02',
        type: 'code_builder',
        prompt: 'Declara la variable de precio con tipo explícito Double:',
        tokens: ['val', 'precio', ':', 'Double', '=', '49.99', 'Float'],
        solution: ['val', 'precio', ':', 'Double', '=', '49.99'],
        explanation: 'Double es el tipo estándar para números con decimales en Kotlin.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l11-e03',
        type: 'matching_pairs',
        prompt: 'Empareja el tipo de coma flotante con su especificación:',
        pairs: [
          { left: 'Double', right: '64 bits, ~15-17 dígitos de precisión decimal (por defecto)' },
          { left: 'Float', right: '32 bits, ~6-7 dígitos de precisión (lleva sufijo f o F)' },
          { left: '3.14f', right: 'Literal de tipo Float' },
          { left: '3.14', right: 'Literal de tipo Double' }
        ],
        explanation: 'Double tiene el doble de precisión que Float.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l11-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error al usar coma en lugar de punto para el decimal:',
        codeSnippet: [
          'val alturaValida = 1.75',
          'val pesoInvalido = 72,5 // ¡En programación se usa punto . y no coma ,!',
          'val distancia = 100.0'
        ],
        bugLineIndex: 1,
        explanation: 'En los lenguajes de programación el separador decimal universal es el punto (.) y nunca la coma.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l11-e05',
        type: 'code_cloze',
        prompt: 'Para indicar explícitamente que un número decimal es Float de 32 bits, añadimos el sufijo:',
        codeWithBlank: 'val factor = 0.5___',
        options: ['f', 'd', 'L', 'm'],
        correctOption: 'f',
        explanation: 'El sufijo f (o F) convierte un literal decimal en Float.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l11-e06',
        type: 'predict_output',
        prompt: '¿Permite Kotlin asignar un Int directamente a un Double sin conversión explícita?',
        code: 'val entero: Int = 10\nval decimal: Double = entero // ¿Es válido?',
        options: [
          'Sí, se convierte automáticamente',
          'No, da error: Type mismatch (requiere entero.toDouble())',
          'Solo si es positivo',
          'Se convierte a 0.0'
        ],
        correctOptionIndex: 1,
        explanation: '¡Regla clave de Kotlin! No hay conversión implícita de tipos numéricos; debes llamar a .toDouble().',
        xpReward: 10
      },
      {
        id: 'kt-u01-l11-e07',
        type: 'code_builder',
        prompt: 'Convierte un número entero a Double explícitamente:',
        tokens: ['val', 'resultado', '=', 'entero', '.', 'toDouble', '(', ')'],
        solution: ['val', 'resultado', '=', 'entero', '.', 'toDouble', '(', ')'],
        explanation: 'toDouble() es la función de conversión explícita de Kotlin.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l11-e08',
        type: 'code_cloze',
        prompt: 'Completa la llamada para convertir un Double a Int (truncando los decimales):',
        codeWithBlank: 'val parteEntera = 9.85.___()',
        options: ['toInt', 'toInteger', 'toNum', 'round'],
        correctOption: 'toInt',
        explanation: '.toInt() trunca la parte fraccionaria dejando solo el entero 9.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l11-e09',
        type: 'predict_output',
        prompt: '¿Qué imprime la consola tras truncar 7.99 con toInt()?',
        code: 'val valor = 7.99\nprintln(valor.toInt())',
        options: ['8', '7 (se trunca, no se redondea)', '7.99', 'Error'],
        correctOptionIndex: 1,
        explanation: 'toInt() descarta por completo los decimales (trunca hacia cero), por lo que 7.99 se convierte en 7.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l11-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena el cálculo del promedio con decimales:',
        lines: [
          'val suma = 15',
          'val cantidad = 2',
          'val promedio = suma.toDouble() / cantidad'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Al convertir suma a Double, la división no se trunca y produce 7.5.',
        xpReward: 20
      }
    ]
  },
  12: {
    title: '12. Cadenas: String',
    desc: 'Manipula texto, caracteres y secuencias alfanuméricas.',
    exercises: [
      {
        id: 'kt-u01-l12-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los conceptos de cadenas en Kotlin:',
        pairs: [
          { left: 'String', right: 'Secuencia inmutable de caracteres de texto' },
          { left: 'Char', right: 'Un solo carácter entre comillas simples (\'A\')' },
          { left: '.length', right: 'Propiedad que indica el número de caracteres' },
          { left: '"" (Cadena vacía)', right: 'String con longitud igual a 0' }
        ],
        explanation: 'En Kotlin los textos son Strings inmutables y los caracteres individuales son Chars.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l12-e02',
        type: 'predict_output',
        prompt: '¿Cuál es el valor de la propiedad length para la cadena "Kotlin"?',
        code: 'val lenguaje = "Kotlin"\nprintln(lenguaje.length)',
        options: ['5', '6', '7', 'null'],
        correctOptionIndex: 1,
        explanation: 'La palabra "Kotlin" tiene exactamente 6 letras (K-o-t-l-i-n).',
        xpReward: 10
      },
      {
        id: 'kt-u01-l12-e03',
        type: 'code_builder',
        prompt: 'Declara una variable de tipo String llamada \'titulo\':',
        tokens: ['val', 'titulo', ':', 'String', '=', '"Duolingo Dev"', ';'],
        solution: ['val', 'titulo', ':', 'String', '=', '"Duolingo Dev"'],
        explanation: 'Declaración explícita de un String.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l12-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error al usar comillas simples para una cadena de varias letras:',
        codeSnippet: [
          'val inicial: Char = \'K\' // Válido para Char',
          'val palabra = \'Hola\' // ¡Error! Un String requiere comillas dobles ""',
          'val saludo = "Hola"'
        ],
        bugLineIndex: 1,
        explanation: 'Las comillas simples \' \' son exclusivas para un solo carácter de tipo Char. Las palabras llevan comillas dobles "".',
        xpReward: 15
      },
      {
        id: 'kt-u01-l12-e05',
        type: 'code_cloze',
        prompt: 'Para consultar si una cadena está vacía usamos el método:',
        codeWithBlank: 'val vacio = mensaje.___()',
        options: ['isEmpty', 'isZero', 'isVoid', 'isNull'],
        correctOption: 'isEmpty',
        explanation: 'isEmpty() devuelve true si la longitud del String es cero.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l12-e06',
        type: 'predict_output',
        prompt: '¿Qué produce la concatenación tradicional con el operador + ?',
        code: 'val a = "Hola "\nval b = "Mundo"\nprintln(a + b)',
        options: ['Hola Mundo', 'a + b', 'HolaMundo', 'Error'],
        correctOptionIndex: 0,
        explanation: '"Hola " + "Mundo" une ambos textos formando "Hola Mundo".',
        xpReward: 10
      },
      {
        id: 'kt-u01-l12-e07',
        type: 'code_builder',
        prompt: 'Convierte un texto a mayúsculas con su función integrada:',
        tokens: ['val', 'grito', '=', 'texto', '.', 'uppercase', '(', ')'],
        solution: ['val', 'grito', '=', 'texto', '.', 'uppercase', '(', ')'],
        explanation: 'uppercase() transforma el String a letras mayúsculas.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l12-e08',
        type: 'predict_output',
        prompt: '¿Son los objetos String mutables o inmutables en Kotlin?',
        code: 'val s = "abc"\n// ¿Puede modificarse una letra de \'s\' directamente?',
        options: [
          'Son inmutables: cualquier método crea un nuevo String sin alterar el original',
          'Son totalmente mutables en memoria',
          'Solo son inmutables si tienen números',
          'Depende del sistema operativo'
        ],
        correctOptionIndex: 0,
        explanation: 'Los Strings son inmutables; métodos como uppercase() retornan una copia transformada.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l12-e09',
        type: 'code_cloze',
        prompt: 'Para escribir textos de múltiples renglones sin escapar comillas, se usan comillas triples:',
        codeWithBlank: 'val bloque = ___Texto multilinea___',
        options: ['"""', "'''", '```', '///'],
        correctOption: '"""',
        explanation: 'Las triples comillas """ crean un Raw String que respeta saltos de línea y caracteres especiales.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l12-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la creación de un saludo personalizado en mayúsculas:',
        lines: [
          'val nombre = "jose"',
          'val mayus = nombre.uppercase()',
          'println("HOLA $mayus")'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Definición, transformación a mayúsculas y salida formateada.',
        xpReward: 20
      }
    ]
  },
  13: {
    title: '13. String Templates: $var',
    desc: 'Inserta variables dentro de textos sin concatenar con signos más.',
    exercises: [
      {
        id: 'kt-u01-l13-e01',
        type: 'code_builder',
        prompt: 'Arma el String template que salude al usuario insertando la variable $nombre:',
        tokens: ['println', '(', '"Hola, $nombre"', ')', '"+"', '$'],
        solution: ['println', '(', '"Hola, $nombre"', ')'],
        explanation: 'En Kotlin, escribir $variable dentro de las comillas evalúa y sustituye el valor automáticamente.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l13-e02',
        type: 'predict_output',
        prompt: '¿Qué imprimirá esta sentencia en la consola?',
        code: 'val puntos = 50\nprintln("Tienes $puntos pts")',
        options: ['Tienes $puntos pts', 'Tienes 50 pts', 'Tienes puntos pts', 'Error'],
        correctOptionIndex: 1,
        explanation: '$puntos es sustituido por su valor numérico (50).',
        xpReward: 10
      },
      {
        id: 'kt-u01-l13-e03',
        type: 'code_cloze',
        prompt: '¿Qué símbolo prefija una variable para insertarla dentro de una plantilla de texto?',
        codeWithBlank: 'println("Nivel actual: ___nivel")',
        options: ['$', '#', '@', '&'],
        correctOption: '$',
        explanation: 'El signo de dólar ($) inicia la interpolación de plantillas en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l13-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error donde se usó el símbolo incorrecto para template:',
        codeSnippet: [
          'val usuario = "Ana"',
          'println("Bienvenido, #usuario") // ¡El símbolo debe ser $ no #!',
          'println("Fin")'
        ],
        bugLineIndex: 1,
        explanation: 'En Kotlin la interpolación se hace con $, no con #.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l13-e05',
        type: 'matching_pairs',
        prompt: 'Empareja la concatenación con su equivalente moderno con plantilla:',
        pairs: [
          { left: '"Hola " + nombre', right: '"Hola $nombre"' },
          { left: '"Vidas: " + vidas', right: '"Vidas: $vidas"' },
          { left: '"Total: " + total', right: '"Total: $total"' },
          { left: 'Concatenación (+)', right: 'Crea múltiples objetos intermedios' }
        ],
        explanation: 'Los String Templates son más limpios, legibles y eficientes en memoria.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l13-e06',
        type: 'predict_output',
        prompt: '¿Cómo imprimes un signo de dólar literal $ sin que Kotlin crea que es una variable?',
        code: 'println("El precio es \\$100")',
        options: ['El precio es $100', 'El precio es \\$100', 'Error', 'El precio es 100'],
        correctOptionIndex: 0,
        explanation: 'Escapar con barra invertida (\\$) desactiva la interpolación e imprime el carácter $ literal.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l13-e07',
        type: 'code_builder',
        prompt: 'Muestra el número de vidas del jugador con plantilla:',
        tokens: ['println', '(', '"Vidas: $vidas"', ')', '"Vidas: "', 'vidas'],
        solution: ['println', '(', '"Vidas: $vidas"', ')'],
        explanation: '"Vidas: $vidas" es la forma idiomática en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l13-e08',
        type: 'code_cloze',
        prompt: 'Completa la plantilla con la variable de batería:',
        codeWithBlank: 'println("Energía: ___bateria%")',
        options: ['$', '%', '&', '?'],
        correctOption: '$',
        explanation: '$bateria sustituye el valor numérico conservando el símbolo % posterior.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l13-e09',
        type: 'predict_output',
        prompt: 'Si tenemos "val x = 10" y "val y = 20", ¿qué imprime "println(\"$x y $y\")"?',
        code: 'val x = 10\nval y = 20\nprintln("$x y $y")',
        options: ['10 y 20', '$x y $y', '30', 'Error'],
        correctOptionIndex: 0,
        explanation: 'Se interpolan ambas variables independientemente dentro de la misma cadena.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l13-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la plantilla de bienvenida para un alumno:',
        lines: [
          'val alumno = "Lucía"',
          'val curso = "Kotlin 2.0"',
          'println("Estudiante $alumno inscrita en $curso")'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Definición de variables e inserción mediante plantillas múltiples.',
        xpReward: 20
      }
    ]
  },
  14: {
    title: '14. Expresiones: ${a + b}',
    desc: 'Evalúa operaciones matemáticas y métodos directamente dentro del texto.',
    exercises: [
      {
        id: 'kt-u01-l14-e01',
        type: 'code_builder',
        prompt: 'Inserta la suma de dos variables dentro de una plantilla usando llaves:',
        tokens: ['println', '(', '"Total: ${a + b}"', ')', '"$a + b"'],
        solution: ['println', '(', '"Total: ${a + b}"', ')'],
        explanation: 'Cuando se evalúa una expresión o llamada a método dentro de un string, se debe envolver entre llaves ${...}.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l14-e02',
        type: 'predict_output',
        prompt: '¿Qué ocurre si olvidas las llaves en "println(\"Total: $a + b\")"?',
        code: 'val a = 5\nval b = 3\nprintln("Total: $a + b")',
        options: ['Total: 8', 'Total: 5 + b', 'Total: 5 + 3', 'Error'],
        correctOptionIndex: 1,
        explanation: 'Sin llaves, solo $a es interpolado (5), y el resto se toma como texto literal: "Total: 5 + b".',
        xpReward: 15
      },
      {
        id: 'kt-u01-l14-e03',
        type: 'code_cloze',
        prompt: 'Completa la sintaxis para evaluar la longitud de una cadena dentro de un template:',
        codeWithBlank: 'println("Letras: $___nombre.length___")',
        options: ['{ }', '( )', '[ ]', '< >'],
        correctOption: '{ }',
        explanation: 'Cualquier acceso a propiedades o llamadas a métodos como ${nombre.length} exige llaves.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l14-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error donde se usaron paréntesis en lugar de llaves para la expresión:',
        codeSnippet: [
          'val n = 4',
          'println("El doble es $(n * 2)") // ¡Debe ser ${...} con llaves!',
          'println("Fin")'
        ],
        bugLineIndex: 1,
        explanation: 'Las expresiones en String templates de Kotlin se delimitan con llaves ${}, nunca con paréntesis $().',
        xpReward: 15
      },
      {
        id: 'kt-u01-l14-e05',
        type: 'matching_pairs',
        prompt: 'Empareja el uso de $ con y sin llaves:',
        pairs: [
          { left: '$variable', right: 'Variable simple sin operaciones adicionales' },
          { left: '${a + b}', right: 'Expresión aritmética calculada' },
          { left: '${texto.length}', right: 'Acceso a propiedad del objeto' },
          { left: '${if (ok) "Sí" else "No"}', right: 'Expresión condicional inline' }
        ],
        explanation: 'Las llaves permiten evaluar cualquier expresión válida de Kotlin dentro de una cadena.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l14-e06',
        type: 'predict_output',
        prompt: '¿Qué imprimirá este código en la terminal?',
        code: 'val radio = 5\nprintln("El diámetro es ${radio * 2}")',
        options: ['El diámetro es 10', 'El diámetro es 5 * 2', 'El diámetro es 25', 'Error'],
        correctOptionIndex: 0,
        explanation: '5 * 2 = 10; la expresión ${radio * 2} se evalúa antes de imprimir.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l14-e07',
        type: 'code_builder',
        prompt: 'Muestra la longitud de la variable \'clave\' en la salida:',
        tokens: ['println', '(', '"Largo: ${clave.length}"', ')', 'clave.length'],
        solution: ['println', '(', '"Largo: ${clave.length}"', ')'],
        explanation: '${clave.length} obtiene e imprime la cantidad de caracteres.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l14-e08',
        type: 'predict_output',
        prompt: '¿Se pueden anidar comillas dentro de las llaves ${} de un template?',
        code: 'val activo = true\nprintln("Estado: ${if (activo) "ON" else "OFF"}")',
        options: [
          'Sí, compila e imprime "Estado: ON"',
          'No, las comillas internas rompen el string exterior',
          'Solo comillas simples',
          'Produce error de ejecución'
        ],
        correctOptionIndex: 0,
        explanation: '¡Kotlin es muy inteligente! El analizador de sintaxis maneja comillas anidadas dentro de ${}.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l14-e09',
        type: 'code_cloze',
        prompt: 'Para calcular el 16% de IVA sobre un precio dentro de un texto:',
        codeWithBlank: 'println("IVA: $___{precio * 0.16}___")',
        options: ['{ }', '( )', '[ ]', '< >'],
        correctOption: '{ }',
        explanation: '${precio * 0.16} evalúa el porcentaje en línea.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l14-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la plantilla de recibo de compra con expresión calculada:',
        lines: [
          'val cant = 3',
          'val precio = 10',
          'println("Total a pagar: ${cant * precio}")'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Los factores se definen primero y el producto se calcula dentro de la plantilla.',
        xpReward: 20
      }
    ]
  },
  15: {
    title: '15. Aritmética y Trazabilidad',
    desc: 'Rastrea cálculos aritméticos en pasos sucesivos respetando precedencias.',
    exercises: [
      {
        id: 'kt-u01-l15-e01',
        type: 'predict_output',
        prompt: '¿Cuál es el valor final de resultado respetando la precedencia de operadores?',
        code: 'val resultado = 10 + 5 * 2\nprintln(resultado)',
        options: ['30', '20 (la multiplicación se evalúa antes que la suma)', '25', '15'],
        correctOptionIndex: 1,
        explanation: 'En matemáticas y programación la multiplicación tiene mayor precedencia: 5 * 2 = 10, y 10 + 10 = 20.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l15-e02',
        type: 'code_builder',
        prompt: 'Fuerza que la suma se evalúe antes que la multiplicación usando paréntesis:',
        tokens: ['val', 'res', '=', '(', '10', '+', '5', ')', '*', '2'],
        solution: ['val', 'res', '=', '(', '10', '+', '5', ')', '*', '2'],
        explanation: 'Los paréntesis tienen la máxima prioridad: (10 + 5) * 2 = 15 * 2 = 30.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l15-e03',
        type: 'matching_pairs',
        prompt: 'Empareja los operadores de asignación compuesta con su equivalente:',
        pairs: [
          { left: 'x += 5', right: 'x = x + 5' },
          { left: 'x -= 3', right: 'x = x - 3' },
          { left: 'x *= 2', right: 'x = x * 2' },
          { left: 'x /= 4', right: 'x = x / 4' }
        ],
        explanation: 'Los operadores compuestos simplifican la actualización de variables acumuladoras.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l15-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde el cálculo produce un resultado negativo inesperado:',
        codeSnippet: [
          'val saldo = 50',
          'val costo = 80',
          'val restante = saldo - costo // 50 - 80 da -30 (saldo insuficiente)'
        ],
        bugLineIndex: 2,
        explanation: 'Si no se valida antes, restar un monto mayor que el saldo produce un valor negativo en cuenta.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l15-e05',
        type: 'code_cloze',
        prompt: 'Completa la precedencia matemática universal conocida como:',
        codeWithBlank: 'Paréntesis, Exponentes, Multiplicación, División, Adición y Sustracción: regla ___',
        options: ['PEMDAS', 'KOTLIN', 'ASCII', 'BINARY'],
        correctOption: 'PEMDAS',
        explanation: 'PEMDAS es el acrónimo mnemotécnico universal para el orden de evaluación de operaciones.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l15-e06',
        type: 'predict_output',
        prompt: 'Rastrea el valor de n paso a paso. ¿Qué imprime?',
        code: 'var n = 2\nn = n * 3\nn = n + 4\nprintln(n)',
        options: ['6', '8', '10', '14'],
        correctOptionIndex: 2,
        explanation: 'Inicio: 2 -> 2 * 3 = 6 -> 6 + 4 = 10.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l15-e07',
        type: 'code_builder',
        prompt: 'Construye la expresión para duplicar el valor de la variable saldo:',
        tokens: ['saldo', '*=', '2', ';', '+=', 'saldo'],
        solution: ['saldo', '*=', '2'],
        explanation: 'saldo *= 2 multiplica el valor actual por 2 y lo guarda.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l15-e08',
        type: 'predict_output',
        prompt: '¿Qué valor tiene x tras evaluar: val x = (2 + 3) * (4 - 1)?',
        code: 'val x = (2 + 3) * (4 - 1)\nprintln(x)',
        options: ['15', '9', '14', '11'],
        correctOptionIndex: 0,
        explanation: '(2 + 3) = 5; (4 - 1) = 3; 5 * 3 = 15.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l15-e09',
        type: 'code_cloze',
        prompt: 'Para incrementar en 1 una variable mutable podemos usar:',
        codeWithBlank: 'contador___',
        options: ['++', '**', '+=', '+1'],
        correctOption: '++',
        explanation: 'El operador unario ++ incrementa en 1 el valor de la variable.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l15-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la trazabilidad del cálculo de un precio con recargo:',
        lines: [
          'val base = 100',
          'val recargo = base * 0.10',
          'val final = base + recargo'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Primero el valor base, luego el porcentaje y finalmente la suma total.',
        xpReward: 20
      }
    ]
  },
  16: {
    title: '16. Multiplicación y División Entera',
    desc: 'Atento a la división entera entre dos números Int (truncado de decimales).',
    exercises: [
      {
        id: 'kt-u01-l16-e01',
        type: 'predict_output',
        prompt: '¿Cuál es el resultado de dividir 7 entre 2 en Kotlin siendo ambos números Int?',
        code: 'val division = 7 / 2\nprintln(division)',
        options: ['3.5', '3 (los decimales se descartan por completo)', '4', 'Error'],
        correctOptionIndex: 1,
        explanation: '¡Atención programador! La división entre dos enteros Int siempre produce un Int; la parte decimal se trunca.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l16-e02',
        type: 'code_builder',
        prompt: 'Para obtener 3.5 en lugar de 3, convierte al menos uno de los operandos a Double:',
        tokens: ['val', 'exacto', '=', '7.toDouble', '(', ')', '/', '2'],
        solution: ['val', 'exacto', '=', '7.toDouble', '(', ')', '/', '2'],
        explanation: 'Al ser 7.0 un Double, la operación se realiza en coma flotante entregando 3.5.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l16-e03',
        type: 'matching_pairs',
        prompt: 'Empareja la operación con su resultado exacto en Kotlin:',
        pairs: [
          { left: '10 / 4', right: '2 (división entera Int)' },
          { left: '10.0 / 4', right: '2.5 (división con Double)' },
          { left: '5 / 2', right: '2 (se descarta el .5)' },
          { left: '5.0 / 2.0', right: '2.5 (precisión decimal completa)' }
        ],
        explanation: 'Si ambos operandos son enteros, el resultado pierde la fracción sin redondear.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l16-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error fatal en tiempo de ejecución (división por cero):',
        codeSnippet: [
          'val total = 100',
          'val divisor = 0',
          'val cociente = total / divisor // ¡ArithmeticException: / by zero!'
        ],
        bugLineIndex: 2,
        explanation: 'Dividir un entero entre cero en la JVM lanza un fallo crítico ArithmeticException.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l16-e05',
        type: 'code_cloze',
        prompt: 'Para escribir directamente un literal Double en la división sin llamar a funciones:',
        codeWithBlank: 'val resultado = 7___ / 2',
        options: ['.0', 'd', 'L', 'f'],
        correctOption: '.0',
        explanation: 'Escribir 7.0 lo convierte inmediatamente en Double.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l16-e06',
        type: 'predict_output',
        prompt: '¿Qué resultado produce la operación 1 / 2 en Kotlin?',
        code: 'val mitad = 1 / 2\nprintln(mitad)',
        options: ['0.5', '0', '1', 'Error'],
        correctOptionIndex: 1,
        explanation: '1 / 2 = 0.5, pero al truncarse a entero el resultado es 0.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l16-e07',
        type: 'code_builder',
        prompt: 'Calcula la mitad exacta de 9 usando decimales:',
        tokens: ['val', 'mitad', '=', '9.0', '/', '2.0', '9', '2'],
        solution: ['val', 'mitad', '=', '9.0', '/', '2.0'],
        explanation: '9.0 / 2.0 = 4.5.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l16-e08',
        type: 'predict_output',
        prompt: 'En punto flotante Double, ¿qué devuelve la división de un número entre 0.0?',
        code: 'println(10.0 / 0.0)',
        options: ['Infinity (infinito matemático sin excepción)', 'ArithmeticException', 'NaN', '0.0'],
        correctOptionIndex: 0,
        explanation: 'En el estándar IEEE-754 de Double, dividir entre 0.0 produce "Infinity" en lugar de un error.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l16-e09',
        type: 'code_cloze',
        prompt: 'El operador de multiplicación en Kotlin es el asterisco:',
        codeWithBlank: 'val doble = numero ___ 2',
        options: ['*', 'x', 'X', 'dot'],
        correctOption: '*',
        explanation: 'El asterisco (*) es el operador universal de multiplicación.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l16-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la conversión para repartir una cuenta con centavos exactos:',
        lines: [
          'val cuentaTotal = 50',
          'val personas = 4',
          'val porPersona = cuentaTotal.toDouble() / personas'
        ],
        correctOrder: [0, 1, 2],
        explanation: '50.toDouble() / 4 entrega 12.5 exactos.',
        xpReward: 20
      }
    ]
  },
  17: {
    title: '17. El Operador Módulo: %',
    desc: 'Obtén el residuo exacto de una división entera.',
    exercises: [
      {
        id: 'kt-u01-l17-e01',
        type: 'predict_output',
        prompt: '¿Qué valor entrega la operación módulo "7 % 3"?',
        code: 'val residuo = 7 % 3\nprintln(residuo)',
        options: ['2', '1 (7 dividido entre 3 cabe a 2 y sobra 1)', '0', '3'],
        correctOptionIndex: 1,
        explanation: '7 / 3 = 2 con residuo 1. El operador % devuelve ese residuo sobrante.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l17-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para saber si un número es par (residuo entre 2 igual a 0):',
        tokens: ['numero', '%', '2', '==', '0', '!=', 'val'],
        solution: ['numero', '%', '2', '==', '0'],
        explanation: 'Todo número par tiene residuo cero al dividirse entre dos (n % 2 == 0).',
        xpReward: 15
      },
      {
        id: 'kt-u01-l17-e03',
        type: 'matching_pairs',
        prompt: 'Empareja las operaciones de módulo con su residuo:',
        pairs: [
          { left: '10 % 2', right: '0 (10 es divisible exactamente por 2)' },
          { left: '11 % 2', right: '1 (11 es número impar)' },
          { left: '15 % 5', right: '0 (múltiplo exacto de 5)' },
          { left: '14 % 5', right: '4 (sobran 4 unidades)' }
        ],
        explanation: 'El módulo es fundamental para ciclos, paridad y distribución cíclica de tareas.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l17-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea que produce un error por intentar calcular el módulo entre 0:',
        codeSnippet: [
          'val n = 20',
          'val d = 0',
          'val r = n % d // ¡ArithmeticException: / by zero en módulo!'
        ],
        bugLineIndex: 2,
        explanation: 'El operador módulo internamente realiza una división; el divisor no puede ser cero.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l17-e05',
        type: 'code_cloze',
        prompt: '¿Qué símbolo representa el operador módulo en Kotlin?',
        codeWithBlank: 'val residuo = 17 ___ 5',
        options: ['%', '//', 'mod', '#'],
        correctOption: '%',
        explanation: 'El signo de porcentaje (%) es el operador módulo en Kotlin, C, Java y Python.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l17-e06',
        type: 'predict_output',
        prompt: 'Si un reloj marca horas del 0 al 23, ¿qué hora marcará tras pasar 25 horas desde la hora 0?',
        code: 'val hora = 25 % 24\nprintln(hora)',
        options: ['1', '25', '0', '24'],
        correctOptionIndex: 0,
        explanation: '25 % 24 = 1. El módulo "reinicia" el conteo al completar una vuelta completa.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l17-e07',
        type: 'code_builder',
        prompt: 'Comprueba si un año es múltiplo de 4:',
        tokens: ['anio', '%', '4', '==', '0', ';', '!='],
        solution: ['anio', '%', '4', '==', '0'],
        explanation: 'Condición básica para la regla de años bisiestos.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l17-e08',
        type: 'predict_output',
        prompt: '¿Qué devuelve la expresión "4 % 10"?',
        code: 'val r = 4 % 10\nprintln(r)',
        options: ['4 (10 no cabe ni una vez en 4, por lo que sobra todo el 4)', '0', '2', 'Error'],
        correctOptionIndex: 0,
        explanation: 'Cuando el dividendo es menor que el divisor, el residuo es el propio dividendo (4).',
        xpReward: 10
      },
      {
        id: 'kt-u01-l17-e09',
        type: 'code_cloze',
        prompt: 'Para verificar si un número es impar:',
        codeWithBlank: 'val esImpar = numero % 2 ___ 0',
        options: ['!=', '==', '>', '<'],
        correctOption: '!=',
        explanation: 'Si n % 2 != 0, el número es impar.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l17-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la validación de paridad de un número:',
        lines: [
          'val n = 42',
          'val esPar = n % 2 == 0',
          'println("¿Es par? $esPar")'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Cálculo del módulo y emisión del booleano resultante.',
        xpReward: 20
      }
    ]
  },
  18: {
    title: '18. Comparadores: == y !=',
    desc: 'Evalúa si dos valores son iguales o diferentes produciendo un Boolean.',
    exercises: [
      {
        id: 'kt-u01-l18-e01',
        type: 'predict_output',
        prompt: '¿Qué imprime la consola al comparar estas dos variables?',
        code: 'val a = 10\nval b = 20\nprintln(a == b)',
        options: ['true', 'false', 'null', 'Error'],
        correctOptionIndex: 1,
        explanation: '10 no es igual a 20, por lo que la comparación devuelve false.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l18-e02',
        type: 'code_builder',
        prompt: 'Construye la expresión para verificar si la contraseña coincide exactamente:',
        tokens: ['password', '==', '"secreto123"', '!=', 'val'],
        solution: ['password', '==', '"secreto123"'],
        explanation: '== compara igualdad por valor (structural equality) de forma segura en Kotlin.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l18-e03',
        type: 'matching_pairs',
        prompt: 'Empareja los comparadores con su significado en Kotlin:',
        pairs: [
          { left: '==', right: 'Igualdad estructural (mismo contenido)' },
          { left: '!=', right: 'Desigualdad (diferente contenido)' },
          { left: '===', right: 'Igualdad referencial (misma instancia en memoria RAM)' },
          { left: '!==', right: 'Diferente instancia física en memoria' }
        ],
        explanation: 'A diferencia de Java donde == compara direcciones, en Kotlin == invoca a .equals() comparando contenido.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l18-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea donde se confunde asignación (=) con comparación (==):',
        codeSnippet: [
          'val puntos = 100',
          'if (puntos = 100) { // ¡En comparaciones se usa == y no =!',
          '    println("¡Ganaste!")',
          '}'
        ],
        bugLineIndex: 1,
        explanation: '= asigna un valor; == compara dos valores. El if requiere una expresión booleana con ==.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l18-e05',
        type: 'code_cloze',
        prompt: 'Completa el operador de diferencia:',
        codeWithBlank: 'val cambiado = estadoOriginal ___ estadoActual',
        options: ['!=', '<>', '!==', 'NOT'],
        correctOption: '!=',
        explanation: '!= devuelve true si los dos operandos tienen valores diferentes.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l18-e06',
        type: 'predict_output',
        prompt: '¿Cómo evalúa Kotlin la comparación de dos textos con == ?',
        code: 'val s1 = "hola"\nval s2 = "hola"\nprintln(s1 == s2)',
        options: ['true (compara el contenido de las letras)', 'false', 'Error', 'null'],
        correctOptionIndex: 0,
        explanation: 'En Kotlin, == sobre Strings compara letra por letra su contenido, devolviendo true sin requerir .equals().',
        xpReward: 10
      },
      {
        id: 'kt-u01-l18-e07',
        type: 'code_builder',
        prompt: 'Verifica si la cuenta de usuario NO está bloqueada:',
        tokens: ['estado', '!=', '"bloqueado"', '==', 'val'],
        solution: ['estado', '!=', '"bloqueado"'],
        explanation: '!= "bloqueado" permite el acceso a usuarios activos.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l18-e08',
        type: 'predict_output',
        prompt: '¿Qué tipo de dato produce cualquier comparación con == o != ?',
        code: 'val resultado = (5 == 5)\n// ¿Qué tipo de dato tiene resultado?',
        options: ['Int', 'String', 'Boolean (solo puede ser true o false)', 'Double'],
        correctOptionIndex: 2,
        explanation: 'Las comparaciones lógicas siempre producen un tipo Boolean.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l18-e09',
        type: 'code_cloze',
        prompt: 'Para comparar igualdad entre dos números usamos:',
        codeWithBlank: 'val iguales = a ___ b',
        options: ['==', '=', 'equals', 'is'],
        correctOption: '==',
        explanation: '== es el operador canónico de igualdad.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l18-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena la verificación de código PIN:',
        lines: [
          'val pinIngresado = 1234',
          'val pinCorrecto = 1234',
          'println("Acceso: ${pinIngresado == pinCorrecto}")'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'Comparación segura del PIN ingresado con el correcto.',
        xpReward: 20
      }
    ]
  },
  19: {
    title: '19. Comentarios en Código',
    desc: 'Documenta tus intenciones sin alterar la ejecución de tu aplicación.',
    exercises: [
      {
        id: 'kt-u01-l19-e01',
        type: 'matching_pairs',
        prompt: 'Empareja los tipos de comentarios con su sintaxis en Kotlin:',
        pairs: [
          { left: '// Comentario de línea', right: 'Ignora todo desde las barras hasta el fin de línea' },
          { left: '/* Bloque */', right: 'Comentario multilínea delimitado' },
          { left: '/** KDoc */', right: 'Comentario de documentación para generar manuales' },
          { left: 'Compilador', right: 'Descarta por completo todos los comentarios' }
        ],
        explanation: 'Los comentarios son notas para los desarrolladores humanos; la máquina los omite al compilar.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l19-e02',
        type: 'predict_output',
        prompt: '¿Qué se imprimirá en la consola tras ejecutar este código?',
        code: '// println("Mensaje 1")\nprintln("Mensaje 2")',
        options: ['Mensaje 1\nMensaje 2', 'Mensaje 2', 'Mensaje 1', 'Error de comentario'],
        correctOptionIndex: 1,
        explanation: 'La primera línea está comentada con //, por lo que el compilador no la ejecuta.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l19-e03',
        type: 'code_builder',
        prompt: 'Construye un comentario de una sola línea explicando la función:',
        tokens: ['//', 'Inicia', 'el', 'juego', '/*', '*/'],
        solution: ['//', 'Inicia', 'el', 'juego'],
        explanation: '// abre un comentario de una sola línea.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l19-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el comentario multilínea sin cerrar que causa un error de compilación:',
        codeSnippet: [
          '/* Inicio del bloque explicativo',
          'val x = 100 // ¡El comentario nunca se cerró con */!',
          'println(x)'
        ],
        bugLineIndex: 1,
        explanation: 'Un bloque abierto con /* debe cerrarse obligatoriamente con */. De lo contrario, todo el código subsiguiente queda anulado.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l19-e05',
        type: 'code_cloze',
        prompt: '¿Con qué caracteres se cierra un comentario multilínea en Kotlin?',
        codeWithBlank: '/* Nota importante ___',
        options: ['*/', '//', '**', '##'],
        correctOption: '*/',
        explanation: '*/ concluye el comentario de bloque.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l19-e06',
        type: 'predict_output',
        prompt: 'A diferencia de Java o C, ¿permite Kotlin anidar comentarios multilínea /* /* dentro */ */?',
        code: '/* Comentario exterior\n   /* Comentario interior */\n   Sigue siendo comentario */\nprintln("OK")',
        options: [
          'Sí, Kotlin soporta comentarios multilínea anidados limpiamente',
          'No, lanza error de sintaxis',
          'Solo en archivos de prueba',
          'Borra el archivo'
        ],
        correctOptionIndex: 0,
        explanation: '¡Gran ventaja de Kotlin! Soporta anidamiento de comentarios multilínea sin romperse al encontrar el primer */.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l19-e07',
        type: 'code_builder',
        prompt: 'Cierra un bloque multilínea de comentario:',
        tokens: ['*/', '/*', '//', 'end'],
        solution: ['*/'],
        explanation: '*/ es el delimitador de cierre de bloque.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l19-e08',
        type: 'code_cloze',
        prompt: 'Para documentar funciones públicas para la herramienta Dokka se utiliza:',
        codeWithBlank: '___* Documentación KDoc */',
        options: ['/', '*', '#', '$'],
        correctOption: '/',
        explanation: '/** inicia un comentario de documentación oficial KDoc.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l19-e09',
        type: 'predict_output',
        prompt: '¿Afectan los comentarios el tamaño final del archivo ejecutable o la velocidad del programa?',
        code: '// 1000 lineas de comentarios aquí\nval x = 1',
        options: [
          'No, el compilador los elimina por completo durante la fase léxica',
          'Sí, hacen que el programa corra más lento',
          'Aumentan el uso de memoria RAM',
          'Solo si tienen caracteres especiales'
        ],
        correctOptionIndex: 0,
        explanation: 'Los comentarios tienen cero impacto en el rendimiento: el bytecode final no los incluye.',
        xpReward: 10
      },
      {
        id: 'kt-u01-l19-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena el código documentado correctamente:',
        lines: [
          '// Declarar la velocidad inicial',
          'val velocidad = 0',
          'println("Listo para arrancar")'
        ],
        correctOrder: [0, 1, 2],
        explanation: 'El comentario precede y explica la instrucción subsiguiente.',
        xpReward: 20
      }
    ]
  },
  20: {
    title: '20. Desafío de Síntesis: Cajero Automático',
    desc: 'Integra variables, tipos y cálculos en un algoritmo interactivo completo.',
    exercises: [
      {
        id: 'kt-u01-l20-e01',
        type: 'code_builder',
        prompt: 'Declara la variable de saldo disponible con 500 dólares:',
        tokens: ['var', 'saldo', '=', '500', 'val', ';'],
        solution: ['var', 'saldo', '=', '500'],
        explanation: 'El saldo cambia con las operaciones, por lo que debe ser un var mutable.',
        xpReward: 20
      },
      {
        id: 'kt-u01-l20-e02',
        type: 'predict_output',
        prompt: 'Si el saldo inicial es 500 y se retiran 150, ¿qué saldo queda en cuenta?',
        code: 'var saldo = 500\nval retiro = 150\nsaldo -= retiro\nprintln("Saldo: $saldo")',
        options: ['Saldo: 500', 'Saldo: 350', 'Saldo: 650', 'Saldo: 150'],
        correctOptionIndex: 1,
        explanation: '500 - 150 = 350.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l20-e03',
        type: 'matching_pairs',
        prompt: 'Empareja los componentes del algoritmo del cajero automático:',
        pairs: [
          { left: 'val saldoInicial', right: 'Constante de punto de partida (500)' },
          { left: 'var saldoActual', right: 'Variable mutable que se descuenta con cada retiro' },
          { left: 'val retiro', right: 'Monto solicitado por el usuario' },
          { left: 'saldo >= retiro', right: 'Condición de validación para evitar sobregiro' }
        ],
        explanation: 'Modelo algorítmico completo de una transacción bancaria segura.',
        xpReward: 20
      },
      {
        id: 'kt-u01-l20-e04',
        type: 'spot_the_bug',
        prompt: 'Toca la línea con el error donde se declaró el saldo como val inmutable impidiendo el retiro:',
        codeSnippet: [
          'val saldo = 1000 // ¡Debe ser var para poder actualizarse!',
          'val retiro = 200',
          'saldo = saldo - retiro // ¡Error de compilación: val no puede reasignarse!'
        ],
        bugLineIndex: 0,
        explanation: 'Si el saldo se declara con val, es imposible restarle el monto retirado.',
        xpReward: 20
      },
      {
        id: 'kt-u01-l20-e05',
        type: 'code_cloze',
        prompt: 'Completa la condición para autorizar el retiro sin fondos insuficientes:',
        codeWithBlank: 'val puedeRetirar = saldo ___ retiro',
        options: ['>=', '<=', '==', '!='],
        correctOption: '>=',
        explanation: 'El saldo debe ser mayor o igual al monto solicitado para poder entregar el dinero.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l20-e06',
        type: 'predict_output',
        prompt: '¿Qué imprime la terminal si el cajero cobra una comisión de 2 dólares por retiro?',
        code: 'var saldo = 100\nval retiro = 40\nval comision = 2\nsaldo = saldo - retiro - comision\nprintln(saldo)',
        options: ['60', '58', '62', '100'],
        correctOptionIndex: 1,
        explanation: '100 - 40 - 2 = 58 dólares restantes.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l20-e07',
        type: 'code_builder',
        prompt: 'Arma la emisión final del ticket con String Template:',
        tokens: ['println', '(', '"Retiro exitoso. Saldo actual: $saldo"', ')', 'saldo'],
        solution: ['println', '(', '"Retiro exitoso. Saldo actual: $saldo"', ')'],
        explanation: 'Imprime el recibo final para el cliente usando interpolación de variables.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l20-e08',
        type: 'predict_output',
        prompt: '¿Qué valor entrega la verificación de billetes si el cajero solo dispensa múltiplos de 20?',
        code: 'val monto = 50\nval esValido = (monto % 20 == 0)\nprintln(esValido)',
        options: ['true', 'false (50 no es múltiplo de 20)', 'Error', 'null'],
        correctOptionIndex: 1,
        explanation: '50 % 20 = 10 (sobran 10), por lo que el cajero rechaza el retiro por no ser múltiplo de 20.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l20-e09',
        type: 'code_cloze',
        prompt: 'Completa la actualización abreviada del saldo tras el retiro:',
        codeWithBlank: 'saldo ___ retiro',
        options: ['-=', '+=', '*=', '=='],
        correctOption: '-=',
        explanation: 'saldo -= retiro descuenta el dinero de forma compacta.',
        xpReward: 15
      },
      {
        id: 'kt-u01-l20-e10',
        type: 'parsons_puzzle',
        prompt: 'Ordena el algoritmo completo del cajero automático:',
        lines: [
          'var saldo = 300',
          'val retiro = 100',
          'saldo -= retiro',
          'println("Retiro completado. Saldo restante: $saldo")'
        ],
        correctOrder: [0, 1, 2, 3],
        explanation: '¡Felicitaciones! Has completado y dominado los 20 niveles de la Unidad 1 de Kotlin.',
        xpReward: 30
      }
    ]
  }
};

import { getFullLevelQuestionBank } from './extra_questions';

// Generador de ejercicios de Kotlin que garantiza 20 preguntas pedagógicas exclusivas por nivel (Requerimiento 8 y 9)
export function getKotlinLevelExercises(level: number, _id?: string): Exercise[] {
  const bank = KOTLIN_TOPIC_BANKS[level];
  const base = bank ? bank.exercises : [];
  return getFullLevelQuestionBank(level, base);
}

// 20 Niveles oficiales de la Unidad 1 de Kotlin
export const KOTLIN_UNIT_01_LESSONS: Lesson[] = [
  {
    id: 'kotlin-u01-l01',
    path: 'kotlin',
    unit: 1,
    level: 1,
    title: KOTLIN_TOPIC_BANKS[1].title,
    description: KOTLIN_TOPIC_BANKS[1].desc,
    exercises: getKotlinLevelExercises(1, 'kotlin-u01-l01')
  },
  {
    id: 'kotlin-u01-l02',
    path: 'kotlin',
    unit: 1,
    level: 2,
    title: KOTLIN_TOPIC_BANKS[2].title,
    description: KOTLIN_TOPIC_BANKS[2].desc,
    exercises: getKotlinLevelExercises(2, 'kotlin-u01-l02')
  },
  {
    id: 'kotlin-u01-l03',
    path: 'kotlin',
    unit: 1,
    level: 3,
    title: KOTLIN_TOPIC_BANKS[3].title,
    description: KOTLIN_TOPIC_BANKS[3].desc,
    exercises: getKotlinLevelExercises(3, 'kotlin-u01-l03')
  },
  {
    id: 'kotlin-u01-l04',
    path: 'kotlin',
    unit: 1,
    level: 4,
    title: KOTLIN_TOPIC_BANKS[4].title,
    description: KOTLIN_TOPIC_BANKS[4].desc,
    exercises: getKotlinLevelExercises(4, 'kotlin-u01-l04')
  },
  {
    id: 'kotlin-u01-l05',
    path: 'kotlin',
    unit: 1,
    level: 5,
    title: KOTLIN_TOPIC_BANKS[5].title,
    description: KOTLIN_TOPIC_BANKS[5].desc,
    exercises: getKotlinLevelExercises(5, 'kotlin-u01-l05')
  },
  {
    id: 'kotlin-u01-l06',
    path: 'kotlin',
    unit: 1,
    level: 6,
    title: KOTLIN_TOPIC_BANKS[6].title,
    description: KOTLIN_TOPIC_BANKS[6].desc,
    exercises: getKotlinLevelExercises(6, 'kotlin-u01-l06')
  },
  {
    id: 'kotlin-u01-l07',
    path: 'kotlin',
    unit: 1,
    level: 7,
    title: KOTLIN_TOPIC_BANKS[7].title,
    description: KOTLIN_TOPIC_BANKS[7].desc,
    exercises: getKotlinLevelExercises(7, 'kotlin-u01-l07')
  },
  {
    id: 'kotlin-u01-l08',
    path: 'kotlin',
    unit: 1,
    level: 8,
    title: KOTLIN_TOPIC_BANKS[8].title,
    description: KOTLIN_TOPIC_BANKS[8].desc,
    exercises: getKotlinLevelExercises(8, 'kotlin-u01-l08')
  },
  {
    id: 'kotlin-u01-l09',
    path: 'kotlin',
    unit: 1,
    level: 9,
    title: KOTLIN_TOPIC_BANKS[9].title,
    description: KOTLIN_TOPIC_BANKS[9].desc,
    exercises: getKotlinLevelExercises(9, 'kotlin-u01-l09')
  },
  {
    id: 'kotlin-u01-l10',
    path: 'kotlin',
    unit: 1,
    level: 10,
    title: KOTLIN_TOPIC_BANKS[10].title,
    description: KOTLIN_TOPIC_BANKS[10].desc,
    exercises: getKotlinLevelExercises(10, 'kotlin-u01-l10')
  },
  {
    id: 'kotlin-u01-l11',
    path: 'kotlin',
    unit: 1,
    level: 11,
    title: KOTLIN_TOPIC_BANKS[11].title,
    description: KOTLIN_TOPIC_BANKS[11].desc,
    exercises: getKotlinLevelExercises(11, 'kotlin-u01-l11')
  },
  {
    id: 'kotlin-u01-l12',
    path: 'kotlin',
    unit: 1,
    level: 12,
    title: KOTLIN_TOPIC_BANKS[12].title,
    description: KOTLIN_TOPIC_BANKS[12].desc,
    exercises: getKotlinLevelExercises(12, 'kotlin-u01-l12')
  },
  {
    id: 'kotlin-u01-l13',
    path: 'kotlin',
    unit: 1,
    level: 13,
    title: KOTLIN_TOPIC_BANKS[13].title,
    description: KOTLIN_TOPIC_BANKS[13].desc,
    exercises: getKotlinLevelExercises(13, 'kotlin-u01-l13')
  },
  {
    id: 'kotlin-u01-l14',
    path: 'kotlin',
    unit: 1,
    level: 14,
    title: KOTLIN_TOPIC_BANKS[14].title,
    description: KOTLIN_TOPIC_BANKS[14].desc,
    exercises: getKotlinLevelExercises(14, 'kotlin-u01-l14')
  },
  {
    id: 'kotlin-u01-l15',
    path: 'kotlin',
    unit: 1,
    level: 15,
    title: KOTLIN_TOPIC_BANKS[15].title,
    description: KOTLIN_TOPIC_BANKS[15].desc,
    exercises: getKotlinLevelExercises(15, 'kotlin-u01-l15')
  },
  {
    id: 'kotlin-u01-l16',
    path: 'kotlin',
    unit: 1,
    level: 16,
    title: KOTLIN_TOPIC_BANKS[16].title,
    description: KOTLIN_TOPIC_BANKS[16].desc,
    exercises: getKotlinLevelExercises(16, 'kotlin-u01-l16')
  },
  {
    id: 'kotlin-u01-l17',
    path: 'kotlin',
    unit: 1,
    level: 17,
    title: KOTLIN_TOPIC_BANKS[17].title,
    description: KOTLIN_TOPIC_BANKS[17].desc,
    exercises: getKotlinLevelExercises(17, 'kotlin-u01-l17')
  },
  {
    id: 'kotlin-u01-l18',
    path: 'kotlin',
    unit: 1,
    level: 18,
    title: KOTLIN_TOPIC_BANKS[18].title,
    description: KOTLIN_TOPIC_BANKS[18].desc,
    exercises: getKotlinLevelExercises(18, 'kotlin-u01-l18')
  },
  {
    id: 'kotlin-u01-l19',
    path: 'kotlin',
    unit: 1,
    level: 19,
    title: KOTLIN_TOPIC_BANKS[19].title,
    description: KOTLIN_TOPIC_BANKS[19].desc,
    exercises: getKotlinLevelExercises(19, 'kotlin-u01-l19')
  },
  {
    id: 'kotlin-u01-l20',
    path: 'kotlin',
    unit: 1,
    level: 20,
    title: KOTLIN_TOPIC_BANKS[20].title,
    description: KOTLIN_TOPIC_BANKS[20].desc,
    exercises: getKotlinLevelExercises(20, 'kotlin-u01-l20')
  }
];
