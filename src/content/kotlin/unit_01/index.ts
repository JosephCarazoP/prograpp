import { Lesson } from '../../../types/lesson';
import { LESSON_FLOWCHART, LESSON_PSEUDOCODE, LESSON_SEQUENCES } from './logic_flow_lessons';

export const KOTLIN_UNIT_01_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u01-l01",
    "path": "kotlin",
    "unit": 1,
    "level": 1,
    "title": "1. Qué es un programa y para qué sirve",
    "description": "Un programa es un conjunto ordenado de instrucciones que una computadora ejecuta para automatizar tareas y resolver problemas reales.",
    "exercises": [
      {
        "id": "kt-u01-l01-e01",
        "type": "predict_output",
        "prompt": "¿Qué es fundamentalmente un programa informático?",
        "code": "",
        "options": [
          "Una secuencia ordenada de instrucciones lógicas para resolver un problema",
          "Un componente físico como la memoria RAM o el disco duro",
          "Un archivo de texto que el ordenador ejecuta de forma aleatoria",
          "Una aplicación que solo funciona si hay conexión a internet"
        ],
        "correctOptionIndex": 0,
        "explanation": "Un programa es una secuencia estructurada de pasos lógicos ejecutables por la máquina.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l01-e02",
        "type": "code_cloze",
        "prompt": "El objetivo principal de un programa de computadora es automatizar ___:",
        "codeWithBlank": "Un programa ejecuta instrucciones para automatizar ___.",
        "options": [
          "tareas",
          "cables",
          "pantallas",
          "temperaturas"
        ],
        "correctOption": "tareas",
        "explanation": "La automatización de procesos repetitivos y complejos es la razón de ser del software.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para formar la instrucción que muestra el inicio del programa:",
        "tokens": [
          "println",
          "(",
          "\"Iniciando programa\"",
          ")",
          "run",
          "start"
        ],
        "solution": [
          "println",
          "(",
          "\"Iniciando programa\"",
          ")"
        ],
        "explanation": "println imprime el mensaje en la consola estándar.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con la afirmación errónea sobre los programas:",
        "codeSnippet": [ "Las instrucciones se ejecutan secuencialmente de arriba hacia abajo.", "La computadora adivina automáticamente las instrucciones que faltan.", "El procesador ejecuta las directivas especificadas por el programador." ],
        "bugLineIndex": 1,
        "explanation": "La computadora nunca adivina; si falta un paso, el programa falla o produce un resultado erróneo.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto básico con su definición:",
        "pairs": [
          {
            "left": "Software",
            "right": "Conjunto de instrucciones y programas lógicos"
          },
          {
            "left": "Hardware",
            "right": "Componentes físicos y circuitos electrónicos"
          },
          {
            "left": "CPU",
            "right": "Unidad de procesamiento que ejecuta las instrucciones"
          },
          {
            "left": "Automatización",
            "right": "Ejecución de tareas sin intervención manual repetida"
          }
        ],
        "explanation": "Diferenciar software, hardware y procesamiento es el cimiento de la informática.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l01-e06",
        "type": "code_cloze",
        "prompt": "Para que la computadora resuelva un problema, debemos descomponerlo en pasos ___ y claros:",
        "codeWithBlank": "Un programa debe tener instrucciones claras y ___.",
        "options": [
          "precisos",
          "ocultos",
          "infinitos",
          "ambiguos"
        ],
        "correctOption": "precisos",
        "explanation": "La precisión evita comportamientos inesperados durante la ejecución.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l01-e07",
        "type": "predict_output",
        "prompt": "Si un programa tiene 3 instrucciones en orden: A, B y C, ¿en qué orden se ejecutarán normalmente?",
        "code": "",
        "options": [
          "Primero A, después B y por último C",
          "En orden aleatorio según la velocidad",
          "Al mismo tiempo sin ningún orden",
          "Primero C y al final A"
        ],
        "correctOptionIndex": 0,
        "explanation": "El flujo de ejecución estándar es estrictamente secuencial, de arriba a abajo.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l01-e08",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir un mensaje de bienvenida en consola:",
        "tokens": [
          "println",
          "(",
          "\"Hola Mundo\"",
          ")"
        ],
        "solution": [
          "println",
          "(",
          "\"Hola Mundo\"",
          ")"
        ],
        "explanation": "El clásico Hola Mundo es el primer programa para verificar que el entorno funciona.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con la lógica rota:",
        "codeSnippet": [
          "Línea 1: Abrir la aplicación bancaria.",
          "Línea 2: Transferir el dinero antes de verificar si hay saldo suficiente.",
          "Línea 3: Confirmar la transacción al usuario."
        ],
        "bugLineIndex": 1,
        "explanation": "Se debe validar el saldo disponible antes de proceder a debitar y transferir.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l01-e10",
        "type": "predict_output",
        "prompt": "¿Por qué decimos que las computadoras no son inteligentes por sí mismas?",
        "code": "",
        "options": [
          "Porque solo ejecutan ciegamente las instrucciones que el programador codificó",
          "Porque cometen errores matemáticos en operaciones simples",
          "Porque no pueden almacenar datos en memoria",
          "Porque necesitan reiniciarse tras cada instrucción"
        ],
        "correctOptionIndex": 0,
        "explanation": "La inteligencia del software proviene de la lógica estructurada diseñada por el programador.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u01-l02",
    "path": "kotlin",
    "unit": 1,
    "level": 2,
    "title": "2. Entrada, procesamiento y salida",
    "description": "El modelo fundamental IPO (Input, Process, Output): recibir datos, transformarlos mediante cálculos o reglas y comunicar el resultado.",
    "exercises": [
      {
        "id": "kt-u01-l02-e01",
        "type": "predict_output",
        "prompt": "En el siguiente código, ¿qué valor corresponde a la Salida (Output)?",
        "code": "val costo = 40\nval impuesto = 5\nval total = costo + impuesto\nprintln(total)",
        "options": [
          "45",
          "40",
          "5",
          "total"
        ],
        "correctOptionIndex": 0,
        "explanation": "40 + 5 = 45 es el valor que se procesa y se emite como salida en consola.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l02-e02",
        "type": "code_cloze",
        "prompt": "En el modelo IPO, la etapa donde se realizan los cálculos matemáticos y comparaciones es el ___:",
        "codeWithBlank": "La transformación de datos se realiza en la etapa de ___.",
        "options": [
          "procesamiento",
          "entrada",
          "salida",
          "apagado"
        ],
        "correctOption": "procesamiento",
        "explanation": "El procesamiento transforma los datos brutos de entrada en información útil de salida.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l02-e03",
        "type": "code_builder",
        "prompt": "Construye la instrucción de Salida para mostrar el cálculo final:",
        "tokens": [
          "println",
          "(",
          "total",
          ")",
          "val",
          "input"
        ],
        "solution": [
          "println",
          "(",
          "total",
          ")"
        ],
        "explanation": "println(total) emite el valor procesado hacia la salida estándar.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea donde se invierte incorrectamente el flujo Entrada-Proceso-Salida:",
        "codeSnippet": [ "val nota1 = 9", "println(promedio)", "val promedio = (nota1 + 7) / 2" ],
        "bugLineIndex": 1,
        "explanation": "No se puede emitir la salida antes de procesar y calcular la variable.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada etapa del modelo IPO con su ejemplo concreto:",
        "pairs": [
          {
            "left": "Entrada",
            "right": "El usuario digita su año de nacimiento"
          },
          {
            "left": "Proceso",
            "right": "El programa resta el año actual menos el año de nacimiento"
          },
          {
            "left": "Salida",
            "right": "Se muestra en pantalla: Tienes 20 años"
          },
          {
            "left": "Almacenamiento",
            "right": "Guardar el resultado en memoria"
          }
        ],
        "explanation": "Comprender Entrada, Proceso y Salida es el pilar de cualquier flujo de datos.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l02-e06",
        "type": "code_cloze",
        "prompt": "La lectura de la temperatura de un sensor hacia el programa constituye una ___:",
        "codeWithBlank": "Los datos que ingresan al sistema desde el exterior son de ___.",
        "options": [
          "entrada",
          "salida",
          "depuración",
          "fuga"
        ],
        "correctOption": "entrada",
        "explanation": "Todo dato externo que ingresa para ser analizado es una Entrada (Input).",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l02-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de este código si la entrada inicial es 8?",
        "code": "val entrada = 8\nval resultado = entrada * 3\nprintln(resultado)",
        "options": [
          "24",
          "11",
          "83",
          "8"
        ],
        "correctOptionIndex": 0,
        "explanation": "El proceso multiplica 8 * 3 = 24 y lo imprime como salida.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la etapa de procesamiento para calcular el doble de una entrada:",
        "tokens": [
          "val",
          "doble",
          "=",
          "entrada",
          "*",
          "2"
        ],
        "solution": [
          "val",
          "doble",
          "=",
          "entrada",
          "*",
          "2"
        ],
        "explanation": "Asigna a la variable doble el resultado de multiplicar la entrada por 2.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error en la secuencia lógica:",
        "codeSnippet": [
          "Paso 1: Encender la impresora.",
          "Paso 2: Retirar la hoja impresa.",
          "Paso 3: Enviar el documento a imprimir."
        ],
        "bugLineIndex": 1,
        "explanation": "No se puede retirar la hoja impresa antes de que el documento haya sido enviado e impreso.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l02-e10",
        "type": "predict_output",
        "prompt": "Si un programa recibe como entrada \"Juan\" y procesa \"Hola \" + \"Juan\", ¿cuál es la salida?",
        "code": "",
        "options": [
          "Hola Juan",
          "Juan",
          "Hola",
          "Error de proceso"
        ],
        "correctOptionIndex": 0,
        "explanation": "La concatenación une ambos textos y produce \"Hola Juan\".",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u01-l03",
    "path": "kotlin",
    "unit": 1,
    "level": 3,
    "title": "3. Algoritmos: pasos ordenados, claros y finitos",
    "description": "Un algoritmo es una secuencia de instrucciones paso a paso, precisas, sin ambigüedades y que garantizan un fin para resolver un problema.",
    "exercises": [
      {
        "id": "kt-u01-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuáles son las 3 características obligatorias de un algoritmo?",
        "code": "",
        "options": [
          "Ordenado, claro (no ambiguo) y finito",
          "Rápido, infinito y aleatorio",
          "Complejo, misterioso e interactivo",
          "Visual, gráfico y compilado"
        ],
        "correctOptionIndex": 0,
        "explanation": "Todo algoritmo debe tener un orden secuencial, no dejar dudas en sus pasos y terminar en un tiempo finito.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l03-e02",
        "type": "code_cloze",
        "prompt": "La propiedad de que un algoritmo debe terminar obligatoriamente se denomina ___:",
        "codeWithBlank": "Un algoritmo debe tener un fin determinado, propiedad llamada ___.",
        "options": [
          "finitud",
          "amplitud",
          "aleatoriedad",
          "recursión"
        ],
        "correctOption": "finitud",
        "explanation": "Finitud significa que el algoritmo no puede quedarse en un ciclo eterno sin fin.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los pasos del algoritmo para encender una lámpara:",
        "tokens": [
          "Conectar",
          "cable",
          "y",
          "presionar",
          "interruptor",
          "quemar"
        ],
        "solution": [
          "Conectar",
          "cable",
          "y",
          "presionar",
          "interruptor"
        ],
        "explanation": "Primero se energiza el dispositivo y luego se acciona el interruptor.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la instrucción ambigua que rompe la claridad del algoritmo:",
        "codeSnippet": [
          "Paso 1: Medir exactamente 250 ml de agua.",
          "Paso 2: Calentar el agua durante un tiempo cualquiera.",
          "Paso 3: Servir en una taza limpia."
        ],
        "bugLineIndex": 1,
        "explanation": "\"Un tiempo cualquiera\" es una ambigüedad. Las computadoras necesitan métricas exactas (ej. 3 minutos a 90°C).",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja las propiedades algorítmicas con su descripción:",
        "pairs": [
          {
            "left": "Finito",
            "right": "Tiene un número determinado de pasos y termina"
          },
          {
            "left": "Preciso",
            "right": "Cada paso está claramente especificado sin dudas"
          },
          {
            "left": "Ordenado",
            "right": "Sigue una secuencia lógica estructurada"
          },
          {
            "left": "Eficaz",
            "right": "Resuelve el problema para el cual fue diseñado"
          }
        ],
        "explanation": "Estas 4 cualidades definen formalmente la validez de cualquier algoritmo computacional.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l03-e06",
        "type": "code_cloze",
        "prompt": "Si un paso de un algoritmo puede interpretarse de dos formas distintas, carece de ___:",
        "codeWithBlank": "La falta de precisión genera ___.",
        "options": [
          "ambigüedad",
          "claridad",
          "finitud",
          "velocidad"
        ],
        "correctOption": "claridad",
        "explanation": "La ambigüedad es el enemigo del software: el procesador no puede tomar decisiones a ciegas.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué ocurre si un algoritmo carece de finitud?",
        "code": "",
        "options": [
          "El programa se queda en un bucle infinito y nunca termina su labor",
          "El computador se apaga instantáneamente",
          "La memoria se borra por completo",
          "El algoritmo produce respuestas correctas de inmediato"
        ],
        "correctOptionIndex": 0,
        "explanation": "Un algoritmo no finito produce congelamientos o desbordes de recursos por ciclo infinito.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l03-e08",
        "type": "code_builder",
        "prompt": "Ordena los pasos lógicos del cálculo de un promedio de dos notas:",
        "tokens": [
          "Sumar",
          "notas",
          "y",
          "dividir",
          "entre",
          "dos"
        ],
        "solution": [
          "Sumar",
          "notas",
          "y",
          "dividir",
          "entre",
          "dos"
        ],
        "explanation": "La media aritmética suma los valores y divide entre el conteo de elementos.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el paso con orden erróneo en el algoritmo:",
        "codeSnippet": [ "Mojar las manos con agua limpia.", "Secarse las manos con la toalla.", "Aplicar jabón y frotar durante 20 segundos." ],
        "bugLineIndex": 1,
        "explanation": "El secado con toalla debe ocurrir al final, después del lavado y enjuague.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l03-e10",
        "type": "predict_output",
        "prompt": "¿Puede un mismo problema resolverse mediante dos algoritmos diferentes?",
        "code": "",
        "options": [
          "Sí, pueden existir distintos caminos lógicos para llegar a la misma solución",
          "No, solo existe un único algoritmo posible para cada problema en el mundo",
          "Solo si se utilizan dos computadoras conectadas en red",
          "No, porque los lenguajes de programación lo prohíben"
        ],
        "correctOptionIndex": 0,
        "explanation": "Existen múltiples algoritmos para un mismo problema, que pueden diferir en velocidad, pasos y memoria.",
        "xpReward": 10
      }
    ]
  },
  LESSON_FLOWCHART,
  LESSON_PSEUDOCODE,
  LESSON_SEQUENCES,
  {
    "id": "kotlin-u01-l04",
    "path": "kotlin",
    "unit": 1,
    "level": 7,
    "title": "7. Seguimiento manual de instrucciones",
    "description": "Aprende a realizar la prueba de escritorio: rastrear paso a paso en una tabla de variables el valor exacto de la memoria a medida que avanza cada instrucción.",
    "exercises": [
      {
        "id": "kt-u01-l04-e01",
        "type": "predict_output",
        "prompt": "Realiza el seguimiento manual de variables. ¿Cuál es el valor final de b?",
        "code": "var a = 4\nvar b = a + 2\na = 10\nprintln(b)",
        "options": [
          "6",
          "12",
          "10",
          "4"
        ],
        "correctOptionIndex": 0,
        "explanation": "Cuando b se calculó, a valía 4 (4 + 2 = 6). Cambiar a después a 10 no modifica el valor ya guardado en b.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l04-e02",
        "type": "code_cloze",
        "prompt": "La técnica de simular la ejecución de un programa paso a paso en papel se llama prueba de ___:",
        "codeWithBlank": "El seguimiento manual de variables se conoce como prueba de ___.",
        "options": [
          "escritorio",
          "estrés",
          "humo",
          "red"
        ],
        "correctOption": "escritorio",
        "explanation": "La prueba de escritorio (desk check) verifica manualmente cada cambio en las variables.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena la asignación secuencial para que x termine valiendo 20:",
        "tokens": [
          "x",
          "=",
          "x",
          "+",
          "10"
        ],
        "solution": [
          "x",
          "=",
          "x",
          "+",
          "10"
        ],
        "explanation": "Si x valía 10, sumarle 10 la actualiza a 20.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l04-e04",
        "type": "spot_the_bug",
        "prompt": "En este seguimiento manual, ¿dónde se cometió el error de cálculo?",
        "codeSnippet": [
          "Paso 1: var n = 10 (n = 10)",
          "Paso 2: n = n - 4 (n queda en 8 en lugar de 6)",
          "Paso 3: n = n * 2 (n queda en 16)"
        ],
        "bugLineIndex": 1,
        "explanation": "10 - 4 es 6, no 8. Un error manual en un paso contamina toda la traza posterior.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada línea de código con el valor de la variable x tras ejecutarse:",
        "pairs": [
          {
            "left": "var x = 2",
            "right": "x vale 2"
          },
          {
            "left": "x = x + 5",
            "right": "x pasa a valer 7"
          },
          {
            "left": "x = x * 3",
            "right": "x pasa a valer 21"
          },
          {
            "left": "x = 0",
            "right": "x se reinicia a 0"
          }
        ],
        "explanation": "El seguimiento manual anota el estado de cada variable instrucción por instrucción.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l04-e06",
        "type": "code_cloze",
        "prompt": "En una tabla de traza, cada fila representa un paso de ___ del programa:",
        "codeWithBlank": "Cada fila de la prueba de escritorio corresponde a un paso de ___.",
        "options": [
          "ejecución",
          "compilación",
          "diseño",
          "conexión"
        ],
        "correctOption": "ejecución",
        "explanation": "Cada paso de ejecución muestra el estado instantáneo de la memoria del sistema.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l04-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es el valor impreso tras rastrear este código?",
        "code": "var puntos = 100\npuntos = puntos - 25\npuntos = puntos + 10\nprintln(puntos)",
        "options": [
          "85",
          "75",
          "110",
          "100"
        ],
        "correctOptionIndex": 0,
        "explanation": "100 - 25 = 75; 75 + 10 = 85.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción para actualizar la variable contador incrementándola en 1:",
        "tokens": [
          "contador",
          "=",
          "contador",
          "+",
          "1"
        ],
        "solution": [
          "contador",
          "=",
          "contador",
          "+",
          "1"
        ],
        "explanation": "La asignación toma el valor actual de contador, le suma 1 y reescribe la variable.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la deducción incorrecta en este seguimiento manual:",
        "codeSnippet": [
          "val a = 5",
          "val b = 2",
          "// Si a > b entonces b es mayor que a"
        ],
        "bugLineIndex": 2,
        "explanation": "Si a = 5 y b = 2, a > b significa que a es mayor que b, no al revés.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l04-e10",
        "type": "predict_output",
        "prompt": "Si rastreamos: val x = 3; val y = x * x; val z = y - x; ¿cuánto vale z?",
        "code": "",
        "options": [
          "6",
          "9",
          "3",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "x = 3; y = 3 * 3 = 9; z = 9 - 3 = 6.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u01-l05",
    "path": "kotlin",
    "unit": 1,
    "level": 8,
    "title": "8. Estructura básica: fun main()",
    "description": "La función main() es el punto de entrada oficial y obligatorio donde el sistema operativo inicia la ejecución de cualquier aplicación Kotlin.",
    "exercises": [
      {
        "id": "kt-u01-l05-e01",
        "type": "predict_output",
        "prompt": "¿Por qué la función main() es indispensable en un programa ejecutable de Kotlin?",
        "code": "",
        "options": [
          "Porque es el punto de partida exacto donde comienza la ejecución del código",
          "Porque se encarga únicamente de cambiar el color de la consola",
          "Porque solo sirve para apagar la computadora al terminar",
          "Porque es opcional y puede omitirse siempre"
        ],
        "correctOptionIndex": 0,
        "explanation": "La JVM y el runtime de Kotlin buscan fun main() para saber qué instrucción ejecutar primero.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l05-e02",
        "type": "code_cloze",
        "prompt": "La palabra clave reservada en Kotlin para declarar una función es ___:",
        "codeWithBlank": "Para definir la función principal escribimos ___ main() { }.",
        "options": [
          "fun",
          "function",
          "def",
          "void"
        ],
        "correctOption": "fun",
        "explanation": "Kotlin utiliza la palabra clave concisa \"fun\" para declarar funciones.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l05-e03",
        "type": "code_builder",
        "prompt": "Construye la cabecera completa de la función principal de Kotlin:",
        "tokens": [
          "fun",
          "main",
          "(",
          ")",
          "{",
          "}"
        ],
        "solution": [
          "fun",
          "main",
          "(",
          ")",
          "{",
          "}"
        ],
        "explanation": "fun main() { } es la estructura canónica del punto de entrada en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica el error de sintaxis en la declaración de la función:",
        "codeSnippet": [ "// Declaración principal", "function main() {", "println(\"Hola\")" ],
        "bugLineIndex": 1,
        "explanation": "En Kotlin se usa \"fun\", no \"function\" (que pertenece a lenguajes como JavaScript).",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada elemento de fun main() con su rol:",
        "pairs": [
          {
            "left": "fun",
            "right": "Palabra clave que indica la creación de una función"
          },
          {
            "left": "main",
            "right": "Nombre reservado del punto de entrada oficial"
          },
          {
            "left": "()",
            "right": "Paréntesis para la lista de parámetros"
          },
          {
            "left": "{ }",
            "right": "Llaves que delimitan el cuerpo de instrucciones"
          }
        ],
        "explanation": "Cada símbolo en la cabecera de fun main() cumple una función sintáctica precisa.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l05-e06",
        "type": "code_cloze",
        "prompt": "El bloque de código con las instrucciones de la función main se delimita con ___:",
        "codeWithBlank": "El cuerpo de la función se encierra entre ___.",
        "options": [
          "llaves { }",
          "corchetes [ ]",
          "comillas \" \"",
          "guiones - -"
        ],
        "correctOption": "llaves { }",
        "explanation": "En Kotlin y la familia de lenguajes C, los bloques de código se delimitan con llaves { }.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué mostrará en consola este programa?",
        "code": "fun main() {\n    println(\"Kotlin 2.0\")\n}",
        "options": [
          "Kotlin 2.0",
          "main()",
          "println",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Al arrancar en main(), se ejecuta la instrucción interna e imprime \"Kotlin 2.0\".",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l05-e08",
        "type": "code_builder",
        "prompt": "Construye el bloque de inicio con fun main y una instrucción println:",
        "tokens": [
          "fun",
          "main()",
          "{",
          "println(\"Listo\")",
          "}"
        ],
        "solution": [
          "fun",
          "main()",
          "{",
          "println(\"Listo\")",
          "}"
        ],
        "explanation": "Estructura mínima válida de un programa ejecutable en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de sintaxis en el nombre:",
        "codeSnippet": [ "fun Main() {", "    println(\"Prueba\")", "}" ],
        "bugLineIndex": 0,
        "explanation": "Kotlin es sensible a mayúsculas y minúsculas (case-sensitive); debe ser main(), no Main().",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l05-e10",
        "type": "predict_output",
        "prompt": "¿Puede un programa de Kotlin tener dos funciones llamadas main() con la misma firma?",
        "code": "",
        "options": [
          "No, provocaría un error de compilación por colisión de nombres duplicados",
          "Sí, el programa ejecuta ambas al azar",
          "Sí, pero solo en los fines de semana",
          "Sí, la segunda reemplaza a la primera sin avisar"
        ],
        "correctOptionIndex": 0,
        "explanation": "No pueden coexistir dos puntos de entrada con el mismo nombre y firma en el mismo paquete.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u01-l06",
    "path": "kotlin",
    "unit": 1,
    "level": 9,
    "title": "9. Mostrar información con print() y println()",
    "description": "Comprende la diferencia entre print() (muestra texto en el mismo renglón) y println() (muestra texto y añade un salto de línea al final).",
    "exercises": [
      {
        "id": "kt-u01-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida exacta de este código?",
        "code": "print(\"A\")\nprint(\"B\")\nprintln(\"C\")",
        "options": [
          "ABC en una sola línea",
          "A, B y C cada una en una línea",
          "AB en una línea y C en otra",
          "CBA"
        ],
        "correctOptionIndex": 0,
        "explanation": "print(\"A\") no salta, print(\"B\") sigue al lado, y println(\"C\") se une en la misma línea y salta después.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l06-e02",
        "type": "code_cloze",
        "prompt": "La función que imprime en consola y agrega un salto de línea automático al terminar es ___:",
        "codeWithBlank": "Para imprimir con salto de línea usamos la función ___.",
        "options": [
          "println",
          "print",
          "write",
          "echo"
        ],
        "correctOption": "println",
        "explanation": "println (print line) imprime el contenido y posiciona el cursor en el renglón de abajo.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l06-e03",
        "type": "code_builder",
        "prompt": "Construye la instrucción para imprimir un salto de línea vacío:",
        "tokens": [
          "println",
          "(",
          ")"
        ],
        "solution": [
          "println",
          "(",
          ")"
        ],
        "explanation": "println() sin argumentos inserta un salto de línea en blanco en la consola.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con error tipográfico en la función de impresión:",
        "codeSnippet": [ "print(\"Cargando: \")", "printline(\"100%\")", "println(\"Completado\")" ],
        "bugLineIndex": 1,
        "explanation": "El nombre correcto es println(), no printline().",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la función con su comportamiento exacto de cursor:",
        "pairs": [
          {
            "left": "print(\"Hola\")",
            "right": "Muestra \"Hola\" y deja el cursor al final de esa misma línea"
          },
          {
            "left": "println(\"Hola\")",
            "right": "Muestra \"Hola\" y salta el cursor al inicio del siguiente renglón"
          },
          {
            "left": "println()",
            "right": "No muestra texto, solo salta al siguiente renglón"
          },
          {
            "left": "print(\" \")",
            "right": "Imprime un único espacio en blanco en la línea actual"
          }
        ],
        "explanation": "Comprender el manejo del salto de línea evita salidas caóticas en consola.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l06-e06",
        "type": "code_cloze",
        "prompt": "Si ejecutas print(\"Uno \"); print(\"Dos\"), ambas palabras aparecerán en la ___ línea:",
        "codeWithBlank": "print sin ln mantiene la salida en la ___ línea.",
        "options": [
          "misma",
          "siguiente",
          "tercera",
          "última"
        ],
        "correctOption": "misma",
        "explanation": "print() no añade salto de línea, por lo que las emisiones consecutivas se concatenan visualmente.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l06-e07",
        "type": "predict_output",
        "prompt": "¿Cuántas líneas de texto se mostrarán en la consola tras ejecutar este código?",
        "code": "println(\"Línea 1\")\nprintln(\"Línea 2\")\nprintln(\"Línea 3\")",
        "options": [
          "3 líneas",
          "1 sola línea",
          "2 líneas",
          "6 líneas"
        ],
        "correctOptionIndex": 0,
        "explanation": "Cada llamada a println() genera su propio renglón independiente.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción para imprimir el texto \"Total:\" en la misma línea:",
        "tokens": [
          "print",
          "(",
          "\"Total: \"",
          ")"
        ],
        "solution": [
          "print",
          "(",
          "\"Total: \"",
          ")"
        ],
        "explanation": "print(\"Total: \") deja el cursor listo para que el valor numérico se imprima al lado.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que provocará un error de sintaxis:",
        "codeSnippet": [ "println(\"Mensaje 1\")", "println(\"Mensaje 2\"", "println(\"Mensaje 3\")" ],
        "bugLineIndex": 1,
        "explanation": "Toda llamada a función debe cerrar sus paréntesis () correctamente.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l06-e10",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: print(\"5\"); print(\" + \"); println(\"5\"); ?",
        "code": "",
        "options": [
          "5 + 5",
          "10",
          "5 en cada línea",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Las tres impresiones se colocan en el mismo renglón formando la cadena \"5 + 5\".",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u01-l07",
    "path": "kotlin",
    "unit": 1,
    "level": 10,
    "title": "10. Comentarios en el código",
    "description": "Los comentarios son anotaciones para humanos que el compilador ignora por completo. Se usan para documentar la intención, explicar lógica difícil o desactivar código temporalmente.",
    "exercises": [
      {
        "id": "kt-u01-l07-e01",
        "type": "predict_output",
        "prompt": "¿Qué mostrará en consola este código con comentarios?",
        "code": "fun main() {\n    // println(\"Uno\")\n    println(\"Dos\")\n    /* println(\"Tres\") */\n}",
        "options": [
          "Dos",
          "Uno, Dos, Tres",
          "Uno y Dos",
          "Tres"
        ],
        "correctOptionIndex": 0,
        "explanation": "Las instrucciones comentadas con // y /* */ son completamente ignoradas por el compilador.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l07-e02",
        "type": "code_cloze",
        "prompt": "El símbolo para escribir un comentario de una sola línea en Kotlin es ___:",
        "codeWithBlank": "Para comentar una sola línea usamos el símbolo ___.",
        "options": [
          "//",
          "/*",
          "##",
          "--"
        ],
        "correctOption": "//",
        "explanation": "Dos barras diagonales // comentan todo lo que se encuentre a su derecha en esa misma línea.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l07-e03",
        "type": "code_builder",
        "prompt": "Construye un comentario de una línea válido en Kotlin:",
        "tokens": [
          "//",
          "Calculo",
          "del",
          "impuesto",
          "val"
        ],
        "solution": [
          "//",
          "Calculo",
          "del",
          "impuesto"
        ],
        "explanation": "// al inicio de la frase convierte todo el texto siguiente en un comentario.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error al intentar comentar:",
        "codeSnippet": [ "// Inicializar sistema", "/* Este comentario no tiene cierre", "println(\"Fin\")" ],
        "bugLineIndex": 1,
        "explanation": "Los comentarios de bloque abiertos con /* deben cerrarse obligatoriamente con */.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja el tipo de comentario con su delimitador:",
        "pairs": [
          {
            "left": "Comentario de una línea",
            "right": "// hasta el fin del renglón"
          },
          {
            "left": "Comentario multilínea",
            "right": "/* contenido en varias líneas */"
          },
          {
            "left": "Código desactivado",
            "right": "// val temp = 10"
          },
          {
            "left": "Documentación técnica",
            "right": "/** KDoc para funciones */"
          }
        ],
        "explanation": "Distinguir comentarios de una línea de comentarios de bloque es fundamental.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l07-e06",
        "type": "code_cloze",
        "prompt": "Los comentarios multilínea en Kotlin inician con /* y se cierran con ___:",
        "codeWithBlank": "El cierre de un bloque multilínea es ___.",
        "options": [
          "*/",
          "/*",
          "//",
          "##"
        ],
        "correctOption": "*/",
        "explanation": "*/ cierra el bloque de comentario multilínea.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l07-e07",
        "type": "predict_output",
        "prompt": "¿Los comentarios en el código ralentizan la velocidad de ejecución de un programa compilado?",
        "code": "",
        "options": [
          "No, el compilador los descarta totalmente y no generan código binario",
          "Sí, hacen que la CPU tarde el doble en procesar",
          "Solo si tienen más de diez renglones",
          "Sí, porque consumen memoria RAM permanentemente"
        ],
        "correctOptionIndex": 0,
        "explanation": "El compilador elimina los comentarios durante la fase de análisis léxico; no afectan la ejecución.",
        "xpReward": 10
      },
      {
        "id": "kt-u01-l07-e08",
        "type": "code_builder",
        "prompt": "Construye un bloque multilínea que encierre una explicación:",
        "tokens": [
          "/*",
          "Explicacion",
          "compleja",
          "*/"
        ],
        "solution": [
          "/*",
          "Explicacion",
          "compleja",
          "*/"
        ],
        "explanation": "/* abre y */ cierra el comentario de múltiples líneas.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que NO será comentada correctamente:",
        "codeSnippet": [
          "// Comentario de una línea",
          "-- Esto es SQL, en Kotlin causará error de sintaxis",
          "/* Comentario válido */"
        ],
        "bugLineIndex": 1,
        "explanation": "-- es la sintaxis de comentarios de SQL, no de Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u01-l07-e10",
        "type": "predict_output",
        "prompt": "¿Para qué resulta más útil incluir comentarios en el código?",
        "code": "",
        "options": [
          "Para explicar el porqué de una decisión compleja y facilitar el mantenimiento futuro",
          "Para que el compilador sepa qué lenguaje estamos usando",
          "Para obligar al programa a imprimir en mayúsculas",
          "Para evitar tener que escribir nombres de variables claros"
        ],
        "correctOptionIndex": 0,
        "explanation": "Los comentarios añaden contexto humano a decisiones de diseño que no son evidentes a simple vista.",
        "xpReward": 10
      }
    ]
  }
];
