import { buildLessonExercises } from './exercise_builder.mjs';

export const KOTLIN_UNITS_P1 = [
  // ══════════════════════════════════════════════════════════
  // UNIDAD 1: Pensamiento lógico y primeros programas (7 lecciones)
  // ══════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Pensamiento lógico y primeros programas',
    description: 'Comprende el propósito del software, el modelo Entrada-Proceso-Salida, algoritmos ordenados, traza manual de instrucciones, la función fun main(), print/println y comentarios en el código.',
    icon: 'Brain',
    color: '#06B6D4',
    stage: 'ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA',
    lessons: [
      {
        level: 1,
        title: '1. Qué es un programa y para qué sirve',
        desc: 'Un programa es un conjunto ordenado de instrucciones que una computadora ejecuta para automatizar tareas y resolver problemas reales.',
        analogy: 'Un programa es como una receta de cocina paso a paso: el cocinero (computadora) sigue cada instrucción al pie de la letra sin improvisar para lograr el platillo deseado.',
        code: `// Un programa simple en Kotlin que muestra un saludo inicial\nfun main() {\n    println("Bienvenido al curso de programación")\n}`,
        output: `Bienvenido al curso de programación`,
        tip: 'Las computadoras ejecutan exactamente lo que les ordenas, a velocidades enormes pero sin discernimiento propio.',
        pitfall: 'Asumir que la máquina adivinará pasos que olvidaste escribir en el código.',
        keyPoints: [
          'Un programa traduce soluciones humanas a instrucciones que la CPU puede procesar.',
          'El software automatiza tareas repetitivas y procesa cálculos con total exactitud.',
          'Las instrucciones se ejecutan de manera secuencial y determinista.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué es fundamentalmente un programa informático?',
            options: [
              'Una secuencia ordenada de instrucciones lógicas para resolver un problema',
              'Un componente físico como la memoria RAM o el disco duro',
              'Un archivo de texto que el ordenador ejecuta de forma aleatoria',
              'Una aplicación que solo funciona si hay conexión a internet'
            ],
            correctIndex: 0,
            explanation: 'Un programa es una secuencia estructurada de pasos lógicos ejecutables por la máquina.'
          },
          {
            type: 'code_cloze',
            prompt: 'El objetivo principal de un programa de computadora es automatizar ___:',
            blank: 'Un programa ejecuta instrucciones para automatizar ___.',
            options: ['tareas', 'cables', 'pantallas', 'temperaturas'],
            correctOption: 'tareas',
            explanation: 'La automatización de procesos repetitivos y complejos es la razón de ser del software.'
          },
          {
            type: 'code_builder',
            prompt: 'Ordena los bloques para formar la instrucción que muestra el inicio del programa:',
            tokens: ['println', '(', '"Iniciando programa"', ')', 'run', 'start'],
            solution: ['println', '(', '"Iniciando programa"', ')'],
            explanation: 'println imprime el mensaje en la consola estándar.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con la afirmación errónea sobre los programas:',
            lines: [
              '1. Las instrucciones se ejecutan secuencialmente de arriba hacia abajo.',
              '2. La computadora adivina automáticamente las instrucciones que faltan.',
              '3. El procesador ejecuta las directivas especificadas por el programador.'
            ],
            bugIndex: 1,
            explanation: 'La computadora nunca adivina; si falta un paso, el programa falla o produce un resultado erróneo.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja cada concepto básico con su definición:',
            pairs: [
              { left: 'Software', right: 'Conjunto de instrucciones y programas lógicos' },
              { left: 'Hardware', right: 'Componentes físicos y circuitos electrónicos' },
              { left: 'CPU', right: 'Unidad de procesamiento que ejecuta las instrucciones' },
              { left: 'Automatización', right: 'Ejecución de tareas sin intervención manual repetida' }
            ],
            explanation: 'Diferenciar software, hardware y procesamiento es el cimiento de la informática.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para que la computadora resuelva un problema, debemos descomponerlo en pasos ___ y claros:',
            blank: 'Un programa debe tener instrucciones claras y ___.',
            options: ['precisos', 'ocultos', 'infinitos', 'ambiguos'],
            correctOption: 'precisos',
            explanation: 'La precisión evita comportamientos inesperados durante la ejecución.'
          },
          {
            type: 'predict_output',
            prompt: 'Si un programa tiene 3 instrucciones en orden: A, B y C, ¿en qué orden se ejecutarán normalmente?',
            options: [
              'Primero A, después B y por último C',
              'En orden aleatorio según la velocidad',
              'Al mismo tiempo sin ningún orden',
              'Primero C y al final A'
            ],
            correctIndex: 0,
            explanation: 'El flujo de ejecución estándar es estrictamente secuencial, de arriba a abajo.'
          },
          {
            type: 'code_builder',
            prompt: 'Ordena los bloques para construir un mensaje de bienvenida en consola:',
            tokens: ['println', '(', '"Hola Mundo"', ')'],
            solution: ['println', '(', '"Hola Mundo"', ')'],
            explanation: 'El clásico Hola Mundo es el primer programa para verificar que el entorno funciona.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con la lógica rota:',
            lines: [
              'Línea 1: Abrir la aplicación bancaria.',
              'Línea 2: Transferir el dinero antes de verificar si hay saldo suficiente.',
              'Línea 3: Confirmar la transacción al usuario.'
            ],
            bugIndex: 1,
            explanation: 'Se debe validar el saldo disponible antes de proceder a debitar y transferir.'
          },
          {
            type: 'predict_output',
            prompt: '¿Por qué decimos que las computadoras no son inteligentes por sí mismas?',
            options: [
              'Porque solo ejecutan ciegamente las instrucciones que el programador codificó',
              'Porque cometen errores matemáticos en operaciones simples',
              'Porque no pueden almacenar datos en memoria',
              'Porque necesitan reiniciarse tras cada instrucción'
            ],
            correctIndex: 0,
            explanation: 'La inteligencia del software proviene de la lógica estructurada diseñada por el programador.'
          }
        ]
      },
      {
        level: 2,
        title: '2. Entrada, procesamiento y salida',
        desc: 'El modelo fundamental IPO (Input, Process, Output): recibir datos, transformarlos mediante cálculos o reglas y comunicar el resultado.',
        analogy: 'Una licuadora: introduces frutas y leche (Entrada), las cuchillas giran y mezclan a alta velocidad (Proceso), y viertes el batido en un vaso (Salida).',
        code: `fun main() {\n    val base = 10      // Entrada\n    val altura = 5     // Entrada\n    val area = (base * altura) / 2 // Proceso\n    println(area)      // Salida\n}`,
        output: `25`,
        tip: 'Si un programa procesa datos pero nunca emite una salida, para el usuario es indistinguible de un programa congelado.',
        pitfall: 'Intentar procesar variables antes de haber recibido o inicializado sus valores de entrada.',
        keyPoints: [
          'Entrada (Input): datos recibidos del usuario, teclado, sensores o archivos.',
          'Proceso: transformaciones lógicas, cálculos y toma de decisiones.',
          'Salida (Output): presentación del resultado en consola, pantalla o base de datos.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: 'En el siguiente código, ¿qué valor corresponde a la Salida (Output)?',
            code: 'val costo = 40\nval impuesto = 5\nval total = costo + impuesto\nprintln(total)',
            options: ['45', '40', '5', 'total'],
            correctIndex: 0,
            explanation: '40 + 5 = 45 es el valor que se procesa y se emite como salida en consola.'
          },
          {
            type: 'code_cloze',
            prompt: 'En el modelo IPO, la etapa donde se realizan los cálculos matemáticos y comparaciones es el ___:',
            blank: 'La transformación de datos se realiza en la etapa de ___.',
            options: ['procesamiento', 'entrada', 'salida', 'apagado'],
            correctOption: 'procesamiento',
            explanation: 'El procesamiento transforma los datos brutos de entrada en información útil de salida.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la instrucción de Salida para mostrar el cálculo final:',
            tokens: ['println', '(', 'total', ')', 'val', 'input'],
            solution: ['println', '(', 'total', ')'],
            explanation: 'println(total) emite el valor procesado hacia la salida estándar.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea donde se invierte incorrectamente el flujo Entrada-Proceso-Salida:',
            lines: [
              '1. val nota1 = 9',
              '2. println(promedio) // Error: promedio aún no ha sido calculado',
              '3. val promedio = (nota1 + 7) / 2'
            ],
            bugIndex: 1,
            explanation: 'No se puede emitir la salida antes de procesar y calcular la variable.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja cada etapa del modelo IPO con su ejemplo concreto:',
            pairs: [
              { left: 'Entrada', right: 'El usuario digita su año de nacimiento' },
              { left: 'Proceso', right: 'El programa resta el año actual menos el año de nacimiento' },
              { left: 'Salida', right: 'Se muestra en pantalla: Tienes 20 años' },
              { left: 'Almacenamiento', right: 'Guardar el resultado en memoria' }
            ],
            explanation: 'Comprender Entrada, Proceso y Salida es el pilar de cualquier flujo de datos.'
          },
          {
            type: 'code_cloze',
            prompt: 'La lectura de la temperatura de un sensor hacia el programa constituye una ___:',
            blank: 'Los datos que ingresan al sistema desde el exterior son de ___.',
            options: ['entrada', 'salida', 'depuración', 'fuga'],
            correctOption: 'entrada',
            explanation: 'Todo dato externo que ingresa para ser analizado es una Entrada (Input).'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de este código si la entrada inicial es 8?',
            code: 'val entrada = 8\nval resultado = entrada * 3\nprintln(resultado)',
            options: ['24', '11', '83', '8'],
            correctIndex: 0,
            explanation: 'El proceso multiplica 8 * 3 = 24 y lo imprime como salida.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la etapa de procesamiento para calcular el doble de una entrada:',
            tokens: ['val', 'doble', '=', 'entrada', '*', '2'],
            solution: ['val', 'doble', '=', 'entrada', '*', '2'],
            explanation: 'Asigna a la variable doble el resultado de multiplicar la entrada por 2.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error en la secuencia lógica:',
            lines: [
              'Paso 1: Encender la impresora.',
              'Paso 2: Retirar la hoja impresa.',
              'Paso 3: Enviar el documento a imprimir.'
            ],
            bugIndex: 1,
            explanation: 'No se puede retirar la hoja impresa antes de que el documento haya sido enviado e impreso.'
          },
          {
            type: 'predict_output',
            prompt: 'Si un programa recibe como entrada "Juan" y procesa "Hola " + "Juan", ¿cuál es la salida?',
            options: ['Hola Juan', 'Juan', 'Hola', 'Error de proceso'],
            correctIndex: 0,
            explanation: 'La concatenación une ambos textos y produce "Hola Juan".'
          }
        ]
      },
      {
        level: 3,
        title: '3. Algoritmos: pasos ordenados, claros y finitos',
        desc: 'Un algoritmo es una secuencia de instrucciones paso a paso, precisas, sin ambigüedades y que garantizan un fin para resolver un problema.',
        analogy: 'Las instrucciones para armar un mueble: cada paso debe ser claro (qué tornillo usar), en orden estricto (no poner las patas antes del armazón) y terminar cuando el mueble queda ensamblado.',
        code: `fun main() {\n    // Algoritmo: Servir agua\n    // 1. Tomar vaso\n    // 2. Abrir grifo\n    // 3. Llenar hasta el borde\n    // 4. Cerrar grifo\n    println("Vaso listo")\n}`,
        output: `Vaso listo`,
        tip: 'Un algoritmo nunca puede ser infinito; debe existir una condición de término garantizada.',
        pitfall: 'Escribir pasos ambiguos como "hervir un rato" en lugar de "hervir por 5 minutos".',
        keyPoints: [
          'Orden: la secuencia de pasos altera directamente el resultado.',
          'Claridad: cada instrucción debe tener una única interpretación posible.',
          'Finitud: el algoritmo debe comenzar, ejecutar un número finito de pasos y terminar.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuáles son las 3 características obligatorias de un algoritmo?',
            options: [
              'Ordenado, claro (no ambiguo) y finito',
              'Rápido, infinito y aleatorio',
              'Complejo, misterioso e interactivo',
              'Visual, gráfico y compilado'
            ],
            correctIndex: 0,
            explanation: 'Todo algoritmo debe tener un orden secuencial, no dejar dudas en sus pasos y terminar en un tiempo finito.'
          },
          {
            type: 'code_cloze',
            prompt: 'La propiedad de que un algoritmo debe terminar obligatoriamente se denomina ___:',
            blank: 'Un algoritmo debe tener un fin determinado, propiedad llamada ___.',
            options: ['finitud', 'amplitud', 'aleatoriedad', 'recursión'],
            correctOption: 'finitud',
            explanation: 'Finitud significa que el algoritmo no puede quedarse en un ciclo eterno sin fin.'
          },
          {
            type: 'code_builder',
            prompt: 'Ordena los pasos del algoritmo para encender una lámpara:',
            tokens: ['Conectar', 'cable', 'y', 'presionar', 'interruptor', 'quemar'],
            solution: ['Conectar', 'cable', 'y', 'presionar', 'interruptor'],
            explanation: 'Primero se energiza el dispositivo y luego se acciona el interruptor.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la instrucción ambigua que rompe la claridad del algoritmo:',
            lines: [
              'Paso 1: Medir exactamente 250 ml de agua.',
              'Paso 2: Calentar el agua durante un tiempo cualquiera.',
              'Paso 3: Servir en una taza limpia.'
            ],
            bugIndex: 1,
            explanation: '"Un tiempo cualquiera" es una ambigüedad. Las computadoras necesitan métricas exactas (ej. 3 minutos a 90°C).'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja las propiedades algorítmicas con su descripción:',
            pairs: [
              { left: 'Finito', right: 'Tiene un número determinado de pasos y termina' },
              { left: 'Preciso', right: 'Cada paso está claramente especificado sin dudas' },
              { left: 'Ordenado', right: 'Sigue una secuencia lógica estructurada' },
              { left: 'Eficaz', right: 'Resuelve el problema para el cual fue diseñado' }
            ],
            explanation: 'Estas 4 cualidades definen formalmente la validez de cualquier algoritmo computacional.'
          },
          {
            type: 'code_cloze',
            prompt: 'Si un paso de un algoritmo puede interpretarse de dos formas distintas, carece de ___:',
            blank: 'La falta de precisión genera ___.',
            options: ['ambigüedad', 'claridad', 'finitud', 'velocidad'],
            correctOption: 'claridad',
            explanation: 'La ambigüedad es el enemigo del software: el procesador no puede tomar decisiones a ciegas.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué ocurre si un algoritmo carece de finitud?',
            options: [
              'El programa se queda en un bucle infinito y nunca termina su labor',
              'El computador se apaga instantáneamente',
              'La memoria se borra por completo',
              'El algoritmo produce respuestas correctas de inmediato'
            ],
            correctIndex: 0,
            explanation: 'Un algoritmo no finito produce congelamientos o desbordes de recursos por ciclo infinito.'
          },
          {
            type: 'code_builder',
            prompt: 'Ordena los pasos lógicos del cálculo de un promedio de dos notas:',
            tokens: ['Sumar', 'notas', 'y', 'dividir', 'entre', 'dos'],
            solution: ['Sumar', 'notas', 'y', 'dividir', 'entre', 'dos'],
            explanation: 'La media aritmética suma los valores y divide entre el conteo de elementos.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el paso con orden erróneo en el algoritmo:',
            lines: [
              '1. Mojar las manos con agua limpia.',
              '2. Secarse las manos con la toalla.',
              '3. Aplicar jabón y frotar durante 20 segundos.'
            ],
            bugIndex: 1,
            explanation: 'El secado con toalla debe ocurrir al final, después del lavado y enjuague.'
          },
          {
            type: 'predict_output',
            prompt: '¿Puede un mismo problema resolverse mediante dos algoritmos diferentes?',
            options: [
              'Sí, pueden existir distintos caminos lógicos para llegar a la misma solución',
              'No, solo existe un único algoritmo posible para cada problema en el mundo',
              'Solo si se utilizan dos computadoras conectadas en red',
              'No, porque los lenguajes de programación lo prohíben'
            ],
            correctIndex: 0,
            explanation: 'Existen múltiples algoritmos para un mismo problema, que pueden diferir en velocidad, pasos y memoria.'
          }
        ]
      },
      {
        level: 4,
        title: '4. Seguimiento manual de instrucciones',
        desc: 'Aprende a realizar la prueba de escritorio: rastrear paso a paso en una tabla de variables el valor exacto de la memoria a medida que avanza cada instrucción.',
        analogy: 'Un inspector de control aéreo que anota en una libreta la posición y altitud de cada avión minuto a minuto para certificar que ninguno choque.',
        code: `fun main() {\n    var x = 5   // Paso 1: x vale 5\n    x = x + 3   // Paso 2: x vale 8\n    x = x * 2   // Paso 3: x vale 16\n    println(x)\n}`,
        output: `16`,
        tip: 'La prueba de escritorio sobre papel es la herramienta de depuración mental más potente antes de culpar al compilador.',
        pitfall: 'Olvidar que las variables sobreescriben su valor anterior cuando se les asigna uno nuevo.',
        keyPoints: [
          'Prueba de escritorio: simulación manual de la ejecución en papel.',
          'Tabla de traza: columnas con los nombres de variables y filas con su evolución temporal.',
          'Permite encontrar errores de lógica sin necesidad de correr el código.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: 'Realiza el seguimiento manual de variables. ¿Cuál es el valor final de b?',
            code: 'var a = 4\nvar b = a + 2\na = 10\nprintln(b)',
            options: ['6', '12', '10', '4'],
            correctIndex: 0,
            explanation: 'Cuando b se calculó, a valía 4 (4 + 2 = 6). Cambiar a después a 10 no modifica el valor ya guardado en b.'
          },
          {
            type: 'code_cloze',
            prompt: 'La técnica de simular la ejecución de un programa paso a paso en papel se llama prueba de ___:',
            blank: 'El seguimiento manual de variables se conoce como prueba de ___.',
            options: ['escritorio', 'estrés', 'humo', 'red'],
            correctOption: 'escritorio',
            explanation: 'La prueba de escritorio (desk check) verifica manualmente cada cambio en las variables.'
          },
          {
            type: 'code_builder',
            prompt: 'Ordena la asignación secuencial para que x termine valiendo 20:',
            tokens: ['x', '=', 'x', '+', '10'],
            solution: ['x', '=', 'x', '+', '10'],
            explanation: 'Si x valía 10, sumarle 10 la actualiza a 20.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'En este seguimiento manual, ¿dónde se cometió el error de cálculo?',
            lines: [
              'Paso 1: var n = 10 (n = 10)',
              'Paso 2: n = n - 4 (n queda en 8 en lugar de 6)',
              'Paso 3: n = n * 2 (n queda en 16)'
            ],
            bugIndex: 1,
            explanation: '10 - 4 es 6, no 8. Un error manual en un paso contamina toda la traza posterior.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja cada línea de código con el valor de la variable x tras ejecutarse:',
            pairs: [
              { left: 'var x = 2', right: 'x vale 2' },
              { left: 'x = x + 5', right: 'x pasa a valer 7' },
              { left: 'x = x * 3', right: 'x pasa a valer 21' },
              { left: 'x = 0', right: 'x se reinicia a 0' }
            ],
            explanation: 'El seguimiento manual anota el estado de cada variable instrucción por instrucción.'
          },
          {
            type: 'code_cloze',
            prompt: 'En una tabla de traza, cada fila representa un paso de ___ del programa:',
            blank: 'Cada fila de la prueba de escritorio corresponde a un paso de ___.',
            options: ['ejecución', 'compilación', 'diseño', 'conexión'],
            correctOption: 'ejecución',
            explanation: 'Cada paso de ejecución muestra el estado instantáneo de la memoria del sistema.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es el valor impreso tras rastrear este código?',
            code: 'var puntos = 100\npuntos = puntos - 25\npuntos = puntos + 10\nprintln(puntos)',
            options: ['85', '75', '110', '100'],
            correctIndex: 0,
            explanation: '100 - 25 = 75; 75 + 10 = 85.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la instrucción para actualizar la variable contador incrementándola en 1:',
            tokens: ['contador', '=', 'contador', '+', '1'],
            solution: ['contador', '=', 'contador', '+', '1'],
            explanation: 'La asignación toma el valor actual de contador, le suma 1 y reescribe la variable.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la deducción incorrecta en este seguimiento manual:',
            lines: [
              'val a = 5',
              'val b = 2',
              '// Si a > b entonces b es mayor que a'
            ],
            bugIndex: 2,
            explanation: 'Si a = 5 y b = 2, a > b significa que a es mayor que b, no al revés.'
          },
          {
            type: 'predict_output',
            prompt: 'Si rastreamos: val x = 3; val y = x * x; val z = y - x; ¿cuánto vale z?',
            options: ['6', '9', '3', '0'],
            correctIndex: 0,
            explanation: 'x = 3; y = 3 * 3 = 9; z = 9 - 3 = 6.'
          }
        ]
      },
      {
        level: 5,
        title: '5. Estructura básica: fun main()',
        desc: 'La función main() es el punto de entrada oficial y obligatorio donde el sistema operativo inicia la ejecución de cualquier aplicación Kotlin.',
        analogy: 'La puerta principal de entrada a un estadio: no importa cuán grande sea el complejo, todos los espectadores deben ingresar por la puerta de acceso oficial para iniciar el evento.',
        code: `// Toda aplicación ejecutable de Kotlin requiere fun main()\nfun main() {\n    println("El programa ha iniciado con éxito")\n}`,
        output: `El programa ha iniciado con éxito`,
        tip: 'El nombre "main" es un estándar universal; si lo llamas "inicio()" o "principal()", el compilador no sabrá por dónde arrancar.',
        pitfall: 'Olvidar cerrar la llave } de la función main o escribir Main() con mayúscula.',
        keyPoints: [
          'fun es la palabra clave para declarar funciones en Kotlin.',
          'main() es el identificador especial reconocido por la JVM.',
          'Las instrucciones del programa se encierran dentro del bloque de llaves { }.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Por qué la función main() es indispensable en un programa ejecutable de Kotlin?',
            options: [
              'Porque es el punto de partida exacto donde comienza la ejecución del código',
              'Porque se encarga únicamente de cambiar el color de la consola',
              'Porque solo sirve para apagar la computadora al terminar',
              'Porque es opcional y puede omitirse siempre'
            ],
            correctIndex: 0,
            explanation: 'La JVM y el runtime de Kotlin buscan fun main() para saber qué instrucción ejecutar primero.'
          },
          {
            type: 'code_cloze',
            prompt: 'La palabra clave reservada en Kotlin para declarar una función es ___:',
            blank: 'Para definir la función principal escribimos ___ main() { }.',
            options: ['fun', 'function', 'def', 'void'],
            correctOption: 'fun',
            explanation: 'Kotlin utiliza la palabra clave concisa "fun" para declarar funciones.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la cabecera completa de la función principal de Kotlin:',
            tokens: ['fun', 'main', '(', ')', '{', '}'],
            solution: ['fun', 'main', '(', ')', '{', '}'],
            explanation: 'fun main() { } es la estructura canónica del punto de entrada en Kotlin.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error de sintaxis en la declaración de la función:',
            lines: [
              '1. // Declaración principal',
              '2. function main() { // Error: en Kotlin no se usa "function"',
              '3.     println("Hola")'
            ],
            bugIndex: 1,
            explanation: 'En Kotlin se usa "fun", no "function" (que pertenece a lenguajes como JavaScript).'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja cada elemento de fun main() con su rol:',
            pairs: [
              { left: 'fun', right: 'Palabra clave que indica la creación de una función' },
              { left: 'main', right: 'Nombre reservado del punto de entrada oficial' },
              { left: '()', right: 'Paréntesis para la lista de parámetros' },
              { left: '{ }', right: 'Llaves que delimitan el cuerpo de instrucciones' }
            ],
            explanation: 'Cada símbolo en la cabecera de fun main() cumple una función sintáctica precisa.'
          },
          {
            type: 'code_cloze',
            prompt: 'El bloque de código con las instrucciones de la función main se delimita con ___:',
            blank: 'El cuerpo de la función se encierra entre ___.',
            options: ['llaves { }', 'corchetes [ ]', 'comillas " "', 'guiones - -'],
            correctOption: 'llaves { }',
            explanation: 'En Kotlin y la familia de lenguajes C, los bloques de código se delimitan con llaves { }.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué mostrará en consola este programa?',
            code: 'fun main() {\n    println("Kotlin 2.0")\n}',
            options: ['Kotlin 2.0', 'main()', 'println', 'Error'],
            correctIndex: 0,
            explanation: 'Al arrancar en main(), se ejecuta la instrucción interna e imprime "Kotlin 2.0".'
          },
          {
            type: 'code_builder',
            prompt: 'Construye el bloque de inicio con fun main y una instrucción println:',
            tokens: ['fun', 'main()', '{', 'println("Listo")', '}'],
            solution: ['fun', 'main()', '{', 'println("Listo")', '}'],
            explanation: 'Estructura mínima válida de un programa ejecutable en Kotlin.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con el error de sintaxis en el nombre:',
            lines: [
              'fun Main() { // Error: en Kotlin se escribe con minúscula',
              '    println("Prueba")',
              '}'
            ],
            bugIndex: 0,
            explanation: 'Kotlin es sensible a mayúsculas y minúsculas (case-sensitive); debe ser main(), no Main().'
          },
          {
            type: 'predict_output',
            prompt: '¿Puede un programa de Kotlin tener dos funciones llamadas main() con la misma firma?',
            options: [
              'No, provocaría un error de compilación por colisión de nombres duplicados',
              'Sí, el programa ejecuta ambas al azar',
              'Sí, pero solo en los fines de semana',
              'Sí, la segunda reemplaza a la primera sin avisar'
            ],
            correctIndex: 0,
            explanation: 'No pueden coexistir dos puntos de entrada con el mismo nombre y firma en el mismo paquete.'
          }
        ]
      },
      {
        level: 6,
        title: '6. Mostrar información con print() y println()',
        desc: 'Comprende la diferencia entre print() (muestra texto en el mismo renglón) y println() (muestra texto y añade un salto de línea al final).',
        analogy: 'Escribir a máquina: print() escribe una letra y deja el carro en la misma línea; println() escribe y presiona la palanca de "Enter" para bajar al siguiente renglón.',
        code: `fun main() {\n    print("Hola ")       // Sin salto\n    println("Mundo")     // Con salto al final\n    println("Siguiente línea")\n}`,
        output: `Hola Mundo\nSiguiente línea`,
        tip: 'Usa print() para construir mensajes continuos por partes y println() para mensajes finales o separados.',
        pitfall: 'Asumir que print() salta de línea automáticamente; sin println(), todo el texto aparecerá amontonado en una sola fila.',
        keyPoints: [
          'print() imprime el contenido y mantiene el cursor en la misma línea.',
          'println() imprime el contenido y salta automáticamente a la línea siguiente (añade \\n).',
          'println() sin argumentos simplemente imprime una línea vacía.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida exacta de este código?',
            code: 'print("A")\nprint("B")\nprintln("C")',
            options: ['ABC en una sola línea', 'A, B y C cada una en una línea', 'AB en una línea y C en otra', 'CBA'],
            correctIndex: 0,
            explanation: 'print("A") no salta, print("B") sigue al lado, y println("C") se une en la misma línea y salta después.'
          },
          {
            type: 'code_cloze',
            prompt: 'La función que imprime en consola y agrega un salto de línea automático al terminar es ___:',
            blank: 'Para imprimir con salto de línea usamos la función ___.',
            options: ['println', 'print', 'write', 'echo'],
            correctOption: 'println',
            explanation: 'println (print line) imprime el contenido y posiciona el cursor en el renglón de abajo.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la instrucción para imprimir un salto de línea vacío:',
            tokens: ['println', '(', ')'],
            solution: ['println', '(', ')'],
            explanation: 'println() sin argumentos inserta un salto de línea en blanco en la consola.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error tipográfico en la función de impresión:',
            lines: [
              '1. print("Cargando: ")',
              '2. printline("100%") // Error: no existe printline',
              '3. println("Completado")'
            ],
            bugIndex: 1,
            explanation: 'El nombre correcto es println(), no printline().'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la función con su comportamiento exacto de cursor:',
            pairs: [
              { left: 'print("Hola")', right: 'Muestra "Hola" y deja el cursor al final de esa misma línea' },
              { left: 'println("Hola")', right: 'Muestra "Hola" y salta el cursor al inicio del siguiente renglón' },
              { left: 'println()', right: 'No muestra texto, solo salta al siguiente renglón' },
              { left: 'print(" ")', right: 'Imprime un único espacio en blanco en la línea actual' }
            ],
            explanation: 'Comprender el manejo del salto de línea evita salidas caóticas en consola.'
          },
          {
            type: 'code_cloze',
            prompt: 'Si ejecutas print("Uno "); print("Dos"), ambas palabras aparecerán en la ___ línea:',
            blank: 'print sin ln mantiene la salida en la ___ línea.',
            options: ['misma', 'siguiente', 'tercera', 'última'],
            correctOption: 'misma',
            explanation: 'print() no añade salto de línea, por lo que las emisiones consecutivas se concatenan visualmente.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuántas líneas de texto se mostrarán en la consola tras ejecutar este código?',
            code: 'println("Línea 1")\nprintln("Línea 2")\nprintln("Línea 3")',
            options: ['3 líneas', '1 sola línea', '2 líneas', '6 líneas'],
            correctIndex: 0,
            explanation: 'Cada llamada a println() genera su propio renglón independiente.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la instrucción para imprimir el texto "Total:" en la misma línea:',
            tokens: ['print', '(', '"Total: "', ')'],
            solution: ['print', '(', '"Total: "', ')'],
            explanation: 'print("Total: ") deja el cursor listo para que el valor numérico se imprima al lado.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea que provocará un error de sintaxis:',
            lines: [
              'println("Mensaje 1")',
              'println("Mensaje 2" // Falta cerrar el paréntesis )',
              'println("Mensaje 3")'
            ],
            bugIndex: 1,
            explanation: 'Toda llamada a función debe cerrar sus paréntesis () correctamente.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: print("5"); print(" + "); println("5"); ?',
            options: ['5 + 5', '10', '5 en cada línea', 'Error'],
            correctIndex: 0,
            explanation: 'Las tres impresiones se colocan en el mismo renglón formando la cadena "5 + 5".'
          }
        ]
      },
      {
        level: 7,
        title: '7. Comentarios en el código',
        desc: 'Los comentarios son anotaciones para humanos que el compilador ignora por completo. Se usan para documentar la intención, explicar lógica difícil o desactivar código temporalmente.',
        analogy: 'Los post-it o notas adhesivas que colocas en un libro de texto: te ayudan a ti a recordar por qué marcaste esa página, pero el texto original del libro sigue siendo el mismo.',
        code: `fun main() {\n    // Este es un comentario de una sola línea\n    println("Hola") // También puede ir al final\n    /* Comentario de\n       múltiples líneas */\n}`,
        output: `Hola`,
        tip: 'Comenta el "por qué" tomaste una decisión técnica, no el "qué", que ya es evidente en el código limpio.',
        pitfall: 'Olvidar cerrar un comentario multilínea con */, lo que comentará accidentalmente el resto del archivo.',
        keyPoints: [
          '// inicia un comentario de una línea hasta el final del renglón.',
          '/* ... */ encierra un comentario de bloque o múltiples líneas.',
          'Los comentarios no aumentan el peso ni reducen la velocidad del programa compilado.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué mostrará en consola este código con comentarios?',
            code: 'fun main() {\n    // println("Uno")\n    println("Dos")\n    /* println("Tres") */\n}',
            options: ['Dos', 'Uno, Dos, Tres', 'Uno y Dos', 'Tres'],
            correctIndex: 0,
            explanation: 'Las instrucciones comentadas con // y /* */ son completamente ignoradas por el compilador.'
          },
          {
            type: 'code_cloze',
            prompt: 'El símbolo para escribir un comentario de una sola línea en Kotlin es ___:',
            blank: 'Para comentar una sola línea usamos el símbolo ___.',
            options: ['//', '/*', '##', '--'],
            correctOption: '//',
            explanation: 'Dos barras diagonales // comentan todo lo que se encuentre a su derecha en esa misma línea.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye un comentario de una línea válido en Kotlin:',
            tokens: ['//', 'Calculo', 'del', 'impuesto', 'val'],
            solution: ['//', 'Calculo', 'del', 'impuesto'],
            explanation: '// al inicio de la frase convierte todo el texto siguiente en un comentario.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con el error al intentar comentar:',
            lines: [
              '1. // Inicializar sistema',
              '2. /* Este comentario no tiene cierre // Falta */',
              '3. println("Fin")'
            ],
            bugIndex: 1,
            explanation: 'Los comentarios de bloque abiertos con /* deben cerrarse obligatoriamente con */.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el tipo de comentario con su delimitador:',
            pairs: [
              { left: 'Comentario de una línea', right: '// hasta el fin del renglón' },
              { left: 'Comentario multilínea', right: '/* contenido en varias líneas */' },
              { left: 'Código desactivado', right: '// val temp = 10' },
              { left: 'Documentación técnica', right: '/** KDoc para funciones */' }
            ],
            explanation: 'Distinguir comentarios de una línea de comentarios de bloque es fundamental.'
          },
          {
            type: 'code_cloze',
            prompt: 'Los comentarios multilínea en Kotlin inician con /* y se cierran con ___:',
            blank: 'El cierre de un bloque multilínea es ___.',
            options: ['*/', '/*', '//', '##'],
            correctOption: '*/',
            explanation: '*/ cierra el bloque de comentario multilínea.'
          },
          {
            type: 'predict_output',
            prompt: '¿Los comentarios en el código ralentizan la velocidad de ejecución de un programa compilado?',
            options: [
              'No, el compilador los descarta totalmente y no generan código binario',
              'Sí, hacen que la CPU tarde el doble en procesar',
              'Solo si tienen más de diez renglones',
              'Sí, porque consumen memoria RAM permanentemente'
            ],
            correctIndex: 0,
            explanation: 'El compilador elimina los comentarios durante la fase de análisis léxico; no afectan la ejecución.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye un bloque multilínea que encierre una explicación:',
            tokens: ['/*', 'Explicacion', 'compleja', '*/'],
            solution: ['/*', 'Explicacion', 'compleja', '*/'],
            explanation: '/* abre y */ cierra el comentario de múltiples líneas.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea que NO será comentada correctamente:',
            lines: [
              '// Comentario de una línea',
              '-- Esto es SQL, en Kotlin causará error de sintaxis',
              '/* Comentario válido */'
            ],
            bugIndex: 1,
            explanation: '-- es la sintaxis de comentarios de SQL, no de Kotlin.'
          },
          {
            type: 'predict_output',
            prompt: '¿Para qué resulta más útil incluir comentarios en el código?',
            options: [
              'Para explicar el porqué de una decisión compleja y facilitar el mantenimiento futuro',
              'Para que el compilador sepa qué lenguaje estamos usando',
              'Para obligar al programa a imprimir en mayúsculas',
              'Para evitar tener que escribir nombres de variables claros'
            ],
            correctIndex: 0,
            explanation: 'Los comentarios añaden contexto humano a decisiones de diseño que no son evidentes a simple vista.'
          }
        ]
      }
    ]
  }
];
