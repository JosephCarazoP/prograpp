import { Lesson } from '../../../types/lesson';

export const KOTLIN_UNIT_05_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u05-l01",
    "path": "kotlin",
    "unit": 5,
    "level": 1,
    "title": "1. Ciclo for",
    "description": "El ciclo for permite iterar y repetir un bloque de instrucciones para cada elemento de un rango o colección en Kotlin.",
    "exercises": [
      {
        "id": "kt-u05-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuántas veces se imprimirá la palabra \"Hola\" en este bucle?",
        "code": "for (i in 1..3) {\n    println(\"Hola\")\n}",
        "options": [
          "3 veces",
          "4 veces",
          "2 veces",
          "1 vez"
        ],
        "correctOptionIndex": 0,
        "explanation": "El rango 1..3 incluye 1, 2 y 3, por lo que el cuerpo se ejecuta exactamente 3 veces.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l01-e02",
        "type": "code_cloze",
        "prompt": "La palabra clave para declarar un bucle de iteración sobre un rango en Kotlin es ___:",
        "codeWithBlank": "___ (num in 1..5) { println(num) }",
        "options": [
          "for",
          "loop",
          "foreach",
          "repeat"
        ],
        "correctOption": "for",
        "explanation": "for es la estructura principal de iteración sobre rangos y colecciones.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l01-e03",
        "type": "code_builder",
        "prompt": "Construye un bucle for que recorra del 1 al 5 con la variable k:",
        "tokens": [
          "for",
          "(",
          "k",
          "in",
          "1..5",
          ")",
          "{",
          "}"
        ],
        "solution": [
          "for",
          "(",
          "k",
          "in",
          "1..5",
          ")",
          "{",
          "}"
        ],
        "explanation": "Sintaxis estándar de for con rango en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con error al intentar alterar la variable del bucle:",
        "codeSnippet": [
          "for (i in 1..5) {",
          "    println(i)",
          "    i = i + 1 // Error: la variable del for es inmutable (val implícito)"
        ],
        "bugLineIndex": 2,
        "explanation": "La variable de iteración del for en Kotlin es inmutable y no se puede reasignar manualmente.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja los componentes del ciclo for con su función:",
        "pairs": [
          {
            "left": "for (item in coleccion)",
            "right": "Encabezado que define la variable y el origen"
          },
          {
            "left": "Variable de control",
            "right": "Toma el valor actual en cada iteración"
          },
          {
            "left": "Rango 1..5",
            "right": "Secuencia de valores que se recorrerán"
          },
          {
            "left": "Cuerpo del bucle",
            "right": "Instrucciones que se ejecutan en cada vuelta"
          }
        ],
        "explanation": "Anatomía fundamental de un bucle for en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l01-e06",
        "type": "code_cloze",
        "prompt": "Para indicar la pertenencia de la variable al rango en el encabezado del for se usa ___:",
        "codeWithBlank": "for (x ___ 1..10)",
        "options": [
          "in",
          "from",
          "to",
          "into"
        ],
        "correctOption": "in",
        "explanation": "in vincula la variable de control con la secuencia a iterar.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l01-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: for (n in 1..3) print(n * 2) ?",
        "code": "",
        "options": [
          "246",
          "2 4 6",
          "123",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "En las 3 vueltas imprime 1*2=2, 2*2=4, 3*2=6 con print continuo, resultando en \"246\".",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la impresión del valor de la variable de ciclo i:",
        "tokens": [
          "for",
          "(i in 1..2)",
          "{",
          "println(i)",
          "}"
        ],
        "solution": [
          "for",
          "(i in 1..2)",
          "{",
          "println(i)",
          "}"
        ],
        "explanation": "Muestra los números 1 y 2 en líneas consecutivas.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error en la sintaxis de los paréntesis del for:",
        "codeSnippet": [
          "for i in 1..5 { // Error: faltan los paréntesis obligatorios ( )",
          "    println(i)",
          "}"
        ],
        "bugLineIndex": 0,
        "explanation": "En Kotlin, la cabecera del for debe ir obligatoriamente entre paréntesis: for (i in 1..5).",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l01-e10",
        "type": "predict_output",
        "prompt": "Si el rango es 5..5, ¿cuántas veces se ejecuta el ciclo?",
        "code": "",
        "options": [
          "1 vez",
          "0 veces",
          "5 veces",
          "Infinitas veces"
        ],
        "correctOptionIndex": 0,
        "explanation": "El rango 5..5 contiene exactamente un solo número (el 5), por lo que itera una sola vez.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u05-l02",
    "path": "kotlin",
    "unit": 5,
    "level": 2,
    "title": "2. Rangos, pasos y recorridos descendentes",
    "description": "Control avanzado de secuencias en Kotlin: intervalos semiabiertos con until, saltos de incremento con step y recorridos hacia atrás con downTo.",
    "exercises": [
      {
        "id": "kt-u05-l02-e01",
        "type": "predict_output",
        "prompt": "¿Qué números imprimirá: for (i in 1..9 step 3) print(\"$i \") ?",
        "code": "",
        "options": [
          "1 4 7 ",
          "1 3 6 9 ",
          "3 6 9 ",
          "1 2 3 "
        ],
        "correctOptionIndex": 0,
        "explanation": "Inicia en 1 y salta de 3 en 3: 1, 1+3=4, 4+3=7. 7+3=10 ya supera 9.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l02-e02",
        "type": "code_cloze",
        "prompt": "La función infija para crear un rango que recorra de mayor a menor es ___:",
        "codeWithBlank": "for (i in 10 ___ 1) { println(i) }",
        "options": [
          "downTo",
          "toDown",
          "backward",
          "reverse"
        ],
        "correctOption": "downTo",
        "explanation": "downTo crea progresiones decrecientes de forma natural.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l02-e03",
        "type": "code_builder",
        "prompt": "Construye un recorrido de 10 a 1 usando downTo:",
        "tokens": [
          "for",
          "(",
          "i",
          "in",
          "10",
          "downTo",
          "1",
          ")"
        ],
        "solution": [
          "for",
          "(",
          "i",
          "in",
          "10",
          "downTo",
          "1",
          ")"
        ],
        "explanation": "10 downTo 1 itera 10, 9, 8, ... hasta 1.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que no ejecutará ninguna vuelta por rango ascendente inválido:",
        "codeSnippet": [
          "for (i in 1..5) { println(i) }",
          "for (i in 5..1) { println(i) } // Error: 5..1 genera un rango vacío",
          "for (i in 5 downTo 1) { println(i) }"
        ],
        "bugLineIndex": 1,
        "explanation": "El operador .. solo avanza hacia arriba; para contar hacia atrás debe usarse downTo.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la sintaxis de rango con los números generados:",
        "pairs": [
          {
            "left": "1..4",
            "right": "1, 2, 3, 4 (inclusivo)"
          },
          {
            "left": "1 until 4",
            "right": "1, 2, 3 (excluye el 4)"
          },
          {
            "left": "4 downTo 1",
            "right": "4, 3, 2, 1 (decreciente)"
          },
          {
            "left": "1..5 step 2",
            "right": "1, 3, 5 (saltos de dos)"
          }
        ],
        "explanation": "Herramientas completas de rangos y progresiones en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l02-e06",
        "type": "code_cloze",
        "prompt": "Para excluir el último número de una secuencia usamos la función infija ___:",
        "codeWithBlank": "for (i in 0 ___ 5) // recorre del 0 al 4",
        "options": [
          "until",
          "to",
          "before",
          "less"
        ],
        "correctOption": "until",
        "explanation": "until crea un rango semiabierto que no incluye el límite superior.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l02-e07",
        "type": "predict_output",
        "prompt": "¿Cuántos números se imprimen con: for (i in 0 until 5) print(i) ?",
        "code": "",
        "options": [
          "5 números (01234)",
          "6 números (012345)",
          "4 números (1234)",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "0 until 5 genera 0, 1, 2, 3 y 4 (exactamente 5 números).",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l02-e08",
        "type": "code_builder",
        "prompt": "Construye un for con saltos de 2 en 2 usando step:",
        "tokens": [
          "for",
          "(",
          "i",
          "in",
          "2..8",
          "step",
          "2",
          ")"
        ],
        "solution": [
          "for",
          "(",
          "i",
          "in",
          "2..8",
          "step",
          "2",
          ")"
        ],
        "explanation": "2..8 step 2 produce 2, 4, 6 y 8.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error en el valor del salto de step:",
        "codeSnippet": [
          "for (i in 1..10 step 2) { }",
          "for (i in 10 downTo 1 step -1) { } // Error: step debe ser positivo (ej. step 1)",
          "for (i in 10 downTo 1 step 2) { }"
        ],
        "bugLineIndex": 1,
        "explanation": "El argumento de step debe ser siempre estrictamente positivo; la dirección la da downTo.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l02-e10",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: for (i in 3 downTo 1) print(\"$i \") ?",
        "code": "",
        "options": [
          "3 2 1 ",
          "1 2 3 ",
          "3 1 ",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "downTo cuenta hacia atrás paso a paso desde 3 hasta 1.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u05-l03",
    "path": "kotlin",
    "unit": 5,
    "level": 3,
    "title": "3. Ciclos while y do while",
    "description": "Estructuras de repetición basadas en una condición booleana. while comprueba la condición antes de entrar; do-while ejecuta el bloque al menos una vez antes de verificar.",
    "exercises": [
      {
        "id": "kt-u05-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuántas veces se ejecutará el cuerpo de este while si n = 10?",
        "code": "var n = 10\nwhile (n < 5) {\n    println(\"Hola\")\n    n++\n}",
        "options": [
          "0 veces",
          "1 vez",
          "5 veces",
          "10 veces"
        ],
        "correctOptionIndex": 0,
        "explanation": "10 < 5 es false desde el inicio; el ciclo while no llega a ejecutarse ni una sola vez.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l03-e02",
        "type": "code_cloze",
        "prompt": "El ciclo que garantiza la ejecución de su bloque al menos una vez sin importar la condición es ___:",
        "codeWithBlank": "El bucle ___ ejecuta el cuerpo antes de comprobar la condición.",
        "options": [
          "do-while",
          "while",
          "for",
          "repeat"
        ],
        "correctOption": "do-while",
        "explanation": "do-while es de post-condición: primero ejecuta y luego evalúa.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l03-e03",
        "type": "code_builder",
        "prompt": "Construye un bucle while que incremente contador mientras sea menor a 3:",
        "tokens": [
          "while",
          "(",
          "contador",
          "<",
          "3",
          ")",
          "{",
          "contador++",
          "}"
        ],
        "solution": [
          "while",
          "(",
          "contador",
          "<",
          "3",
          ")",
          "{",
          "contador++",
          "}"
        ],
        "explanation": "Estructura estándar de control condicional con while.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la omisión que provocará un ciclo infinito destructivo:",
        "codeSnippet": [
          "var x = 1",
          "while (x <= 5) {",
          "    println(x) // Falta x++ o actualizar la variable de control"
        ],
        "bugLineIndex": 2,
        "explanation": "Si x nunca se incrementa, x <= 5 será siempre true y el programa se colgará en un bucle infinito.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja el tipo de bucle con su momento de evaluación:",
        "pairs": [
          {
            "left": "while",
            "right": "Evalúa la condición ANTES de ejecutar el bloque"
          },
          {
            "left": "do-while",
            "right": "Evalúa la condición DESPUÉS de ejecutar el bloque"
          },
          {
            "left": "i++",
            "right": "Incrementa la variable de control para avanzar"
          },
          {
            "left": "Bucle infinito",
            "right": "Ciclo donde la condición nunca llega a ser falsa"
          }
        ],
        "explanation": "Diferencia central entre bucles de pre-comprobación y post-comprobación.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l03-e06",
        "type": "code_cloze",
        "prompt": "El operador abreviado para incrementar en 1 una variable en un bucle es ___:",
        "codeWithBlank": "var c = 0\nc___",
        "options": [
          "++",
          "+=",
          "+1",
          "up"
        ],
        "correctOption": "++",
        "explanation": "c++ incrementa en una unidad el valor de la variable c.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué imprimirá este ciclo do-while?",
        "code": "var x = 1\ndo {\n    print(\"$x \")\n    x++\n} while (x <= 2)",
        "options": [
          "1 2 ",
          "1 ",
          "1 2 3 ",
          "0 1 2 "
        ],
        "correctOptionIndex": 0,
        "explanation": "Imprime 1 (x pasa a 2, 2 <= 2 true); imprime 2 (x pasa a 3, 3 <= 2 false y termina).",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la cabecera del ciclo do:",
        "tokens": [
          "do",
          "{",
          "println(\"Intento\")",
          "}",
          "while",
          "(reintentar)"
        ],
        "solution": [
          "do",
          "{",
          "println(\"Intento\")",
          "}",
          "while",
          "(reintentar)"
        ],
        "explanation": "Sintaxis del ciclo do-while.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error en la condición del while:",
        "codeSnippet": [
          "var seguir = true",
          "while seguir { // Error: la condición debe ir obligatoriamente entre paréntesis ( )",
          "    seguir = false"
        ],
        "bugLineIndex": 1,
        "explanation": "En Kotlin, la condición de while debe encerrarse entre paréntesis: while (seguir).",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l03-e10",
        "type": "predict_output",
        "prompt": "Si tenemos: var a = 5; while (a > 3) a--; println(a); ¿cuánto vale a al final?",
        "code": "",
        "options": [
          "3",
          "2",
          "4",
          "5"
        ],
        "correctOptionIndex": 0,
        "explanation": "5 > 3 resta a 4; 4 > 3 resta a 3; 3 > 3 es false y sale del ciclo con a = 3.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u05-l04",
    "path": "kotlin",
    "unit": 5,
    "level": 4,
    "title": "4. Contadores y acumuladores",
    "description": "Patrones algorítmicos fundamentales: un contador incrementa en un valor constante (ej. de 1 en 1) para contar sucesos; un acumulador suma valores variables (ej. precios o notas).",
    "exercises": [
      {
        "id": "kt-u05-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el valor final de la suma acumulada?",
        "code": "var suma = 0\nfor (i in 1..4) {\n    suma += i\n}\nprintln(suma)",
        "options": [
          "10",
          "4",
          "15",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "1 + 2 + 3 + 4 = 10. La variable suma actúa como acumulador.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l04-e02",
        "type": "code_cloze",
        "prompt": "Una variable que registra cuántas veces ocurrió un evento sumando de 1 en 1 se llama ___:",
        "codeWithBlank": "Para contar repeticiones usamos un ___.",
        "options": [
          "contador",
          "acumulador",
          "búfer",
          "índice"
        ],
        "correctOption": "contador",
        "explanation": "El contador lleva la cuenta de repeticiones o frecuencias.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l04-e03",
        "type": "code_builder",
        "prompt": "Construye la instrucción de incremento de un contador de aprobados:",
        "tokens": [
          "aprobados",
          "=",
          "aprobados",
          "+",
          "1"
        ],
        "solution": [
          "aprobados",
          "=",
          "aprobados",
          "+",
          "1"
        ],
        "explanation": "Incrementa el contador en una unidad.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica el error fatal de alcance (scope) donde el acumulador se reinicia:",
        "codeSnippet": [
          "for (i in 1..5) {",
          "    var total = 0 // Error: debe declararse afuera antes del for, aquí se reinicia en cada vuelta",
          "    total += i"
        ],
        "bugLineIndex": 1,
        "explanation": "Declarar el acumulador dentro del bucle provoca que se reinicie a cero en cada iteración.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la operación con el patrón que representa:",
        "pairs": [
          {
            "left": "contador++",
            "right": "Contador (avanza de 1 en 1)"
          },
          {
            "left": "total += precio",
            "right": "Acumulador (agrega montos variables)"
          },
          {
            "left": "var suma = 0",
            "right": "Inicialización de acumulador"
          },
          {
            "left": "var cantidad = 0",
            "right": "Inicialización de contador"
          }
        ],
        "explanation": "Patrones fundamentales para procesar colecciones y reportes.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l04-e06",
        "type": "code_cloze",
        "prompt": "Una variable que suma cantidades variables en cada vuelta se llama ___:",
        "codeWithBlank": "Para sumar montos de ventas usamos un ___.",
        "options": [
          "acumulador",
          "contador",
          "temporizador",
          "semáforo"
        ],
        "correctOption": "acumulador",
        "explanation": "El acumulador añade importes variables a un total acumulado.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué valor mostrará el contador al final?",
        "code": "var c = 0\nfor (i in 1..10) {\n    if (i % 3 == 0) c++\n}\nprintln(c)",
        "options": [
          "3",
          "10",
          "4",
          "1"
        ],
        "correctOptionIndex": 0,
        "explanation": "Los múltiplos de 3 en 1..10 son 3, 6 y 9 (exactamente 3 números); c termina en 3.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la acumulación del salario al subtotal:",
        "tokens": [
          "totalSalarios",
          "+=",
          "salario"
        ],
        "solution": [
          "totalSalarios",
          "+=",
          "salario"
        ],
        "explanation": "Suma el salario actual al acumulador totalSalarios.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la variable que debió ser var para poder contar:",
        "codeSnippet": [
          "val conteo = 0 // Error: val es inmutable y no se puede incrementar",
          "for (i in 1..3) {",
          "    conteo++"
        ],
        "bugLineIndex": 0,
        "explanation": "Los contadores deben declararse con var para poder mutar su valor.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l04-e10",
        "type": "predict_output",
        "prompt": "Si calculamos el promedio: var suma = 12; var cantidad = 3; println(suma / cantidad); ¿qué da?",
        "code": "",
        "options": [
          "4",
          "15",
          "36",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "12 / 3 = 4. La media aritmética divide el acumulador entre el contador.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u05-l05",
    "path": "kotlin",
    "unit": 5,
    "level": 5,
    "title": "5. Condiciones de inicio y fin",
    "description": "El diseño riguroso de las fronteras de un ciclo: inicializar correctamente la variable de control, formular la condición de permanencia y garantizar el avance hacia la condición de salida.",
    "exercises": [
      {
        "id": "kt-u05-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuántas iteraciones realizará este ciclo con inicio en 0 y cota menor estricta a 5?",
        "code": "var i = 0\nwhile (i < 5) {\n    i++\n}\nprintln(i)",
        "options": [
          "5",
          "4",
          "6",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "Itera para i = 0, 1, 2, 3, 4 (5 veces). Al terminar la 5ta vuelta, i vale 5 y sale.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l05-e02",
        "type": "code_cloze",
        "prompt": "El error común de ejecutar un ciclo una vez de más o una vez de menos se conoce como ___:",
        "codeWithBlank": "El error de frontera en bucles se llama ___.",
        "options": [
          "off-by-one",
          "null-pointer",
          "overflow",
          "deadlock"
        ],
        "correctOption": "off-by-one",
        "explanation": "Off-by-one ocurre al confundir menor (<) con menor o igual (<=).",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l05-e03",
        "type": "code_builder",
        "prompt": "Construye la condición para que el bucle se detenga exactamente al alcanzar el límite 10:",
        "tokens": [
          "while",
          "(",
          "contador",
          "<=",
          "10",
          ")"
        ],
        "solution": [
          "while",
          "(",
          "contador",
          "<=",
          "10",
          ")"
        ],
        "explanation": "contador <= 10 asegura que el número 10 sea procesado antes de salir.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con la condición de inicio errónea que impide que el bucle comience:",
        "codeSnippet": [
          "var i = 100 // Inicio muy grande",
          "while (i < 10) { // La condición es false de entrada; nunca se ejecuta",
          "    println(i)"
        ],
        "bugLineIndex": 1,
        "explanation": "100 < 10 es false desde el inicio, por lo que el cuerpo del ciclo jamás arrancará.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja el elemento del ciclo con su rol en la frontera:",
        "pairs": [
          {
            "left": "var i = 1",
            "right": "Condición de inicio (estado base)"
          },
          {
            "left": "i <= N",
            "right": "Condición de permanencia"
          },
          {
            "left": "i++",
            "right": "Paso de avance hacia el fin"
          },
          {
            "left": "i > N",
            "right": "Condición de salida o parada"
          }
        ],
        "explanation": "Los 3 pilares indispensables para gobernar cualquier ciclo iterativo.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l05-e06",
        "type": "code_cloze",
        "prompt": "Si un bucle nunca modifica su variable de control, la condición de fin nunca se ___:",
        "codeWithBlank": "Sin paso de avance, la meta de salida nunca se ___.",
        "options": [
          "alcanzará",
          "cancelará",
          "duplicará",
          "ocultará"
        ],
        "correctOption": "alcanzará",
        "explanation": "El paso de avance es lo único que garantiza que el bucle eventualmente termine.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l05-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es el último valor impreso por: for (i in 1 until 5) println(i) ?",
        "code": "",
        "options": [
          "4",
          "5",
          "1",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "until excluye el 5, por lo que el último valor impreso es el 4.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la inicialización de una cuenta regresiva que arranca en 10:",
        "tokens": [
          "var",
          "cuentaRegresiva",
          "=",
          "10"
        ],
        "solution": [
          "var",
          "cuentaRegresiva",
          "=",
          "10"
        ],
        "explanation": "Estado inicial del ciclo regresivo.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error en el paso de avance que aleja de la meta en lugar de acercar:",
        "codeSnippet": [
          "var i = 1",
          "while (i <= 10) {",
          "    i-- // Error: resta en lugar de sumar; se aleja del 10 indefinidamente"
        ],
        "bugLineIndex": 2,
        "explanation": "Restar aleja a i del límite superior 10, causando un bucle infinito negativo.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l05-e10",
        "type": "predict_output",
        "prompt": "Si el bucle es: var x = 5; while (x > 0) x -= 2; println(x); ¿cuál es el valor final?",
        "code": "",
        "options": [
          "-1",
          "0",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "5 - 2 = 3; 3 - 2 = 1; 1 - 2 = -1. Al ser -1 > 0 false, sale con x = -1.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u05-l06",
    "path": "kotlin",
    "unit": 5,
    "level": 6,
    "title": "6. break y continue",
    "description": "Sentencias de control de saltos: break termina inmediatamente el ciclo completo y sale de él; continue salta el resto de la iteración actual y pasa de inmediato a la siguiente.",
    "exercises": [
      {
        "id": "kt-u05-l06-e01",
        "type": "predict_output",
        "prompt": "¿Qué imprimirá este código con break al llegar a 3?",
        "code": "for (i in 1..5) {\n    if (i == 3) break\n    print(\"$i \")\n}",
        "options": [
          "1 2 ",
          "1 2 3 ",
          "1 2 4 5 ",
          "3 4 5 "
        ],
        "correctOptionIndex": 0,
        "explanation": "Cuando i es 3, el break termina el bucle de inmediato; solo se imprimieron 1 y 2.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l06-e02",
        "type": "code_cloze",
        "prompt": "La instrucción que salta el resto de la iteración actual y avanza a la siguiente vuelta es ___:",
        "codeWithBlank": "if (omitir) ___",
        "options": [
          "continue",
          "break",
          "exit",
          "pass"
        ],
        "correctOption": "continue",
        "explanation": "continue salta únicamente la vuelta actual sin cancelar el resto del bucle.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l06-e03",
        "type": "code_builder",
        "prompt": "Construye la instrucción para salir del bucle si encontrado es true:",
        "tokens": [
          "if",
          "(encontrado)",
          "break"
        ],
        "solution": [
          "if",
          "(encontrado)",
          "break"
        ],
        "explanation": "Termina la búsqueda anticipadamente cuando se halla el elemento.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con código inalcanzable tras un break incondicional:",
        "codeSnippet": [
          "for (i in 1..5) {",
          "    break // Error: el bucle siempre se detendrá en la primera línea",
          "    println(i) // Código inalcanzable (unreachable code)"
        ],
        "bugLineIndex": 1,
        "explanation": "Un break sin condición previa condena a que el resto del bucle jamás se ejecute.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la sentencia de salto con su efecto:",
        "pairs": [
          {
            "left": "break",
            "right": "Interrumpe y sale del bucle definitivamente"
          },
          {
            "left": "continue",
            "right": "Salta a la siguiente vuelta del ciclo"
          },
          {
            "left": "Búsqueda exitosa",
            "right": "Caso típico donde break ahorra iteraciones"
          },
          {
            "left": "Filtrar elementos",
            "right": "Caso típico donde continue omite casos no deseados"
          }
        ],
        "explanation": "Diferencia esencial entre abortar el ciclo completo o solo una iteración.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l06-e06",
        "type": "code_cloze",
        "prompt": "Para cancelar un ciclo de forma prematura al detectar un error usamos ___:",
        "codeWithBlank": "if (hayFallo) ___",
        "options": [
          "break",
          "continue",
          "return",
          "stop"
        ],
        "correctOption": "break",
        "explanation": "break interrumpe la ejecución del ciclo inmediatamente.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué imprimirá: for (i in 1..4) { if (i == 2) continue; print(\"$i \") } ?",
        "code": "",
        "options": [
          "1 3 4 ",
          "1 2 3 4 ",
          "1 ",
          "2 "
        ],
        "correctOptionIndex": 0,
        "explanation": "El 2 se omite con continue; por ende imprime 1, 3 y 4.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la condición: si el número es negativo saltar a la siguiente vuelta:",
        "tokens": [
          "if",
          "(",
          "num",
          "<",
          "0",
          ")",
          "continue"
        ],
        "solution": [
          "if",
          "(",
          "num",
          "<",
          "0",
          ")",
          "continue"
        ],
        "explanation": "continue salta los números negativos.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error al colocar break fuera de un ciclo:",
        "codeSnippet": [
          "val x = 10",
          "if (x > 5) break // Error: break solo es válido dentro de bucles for, while o do-while",
          "println(x)"
        ],
        "bugLineIndex": 1,
        "explanation": "break no puede utilizarse dentro de un if simple aislado; debe estar dentro de un bucle.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l06-e10",
        "type": "predict_output",
        "prompt": "¿Cuántas veces imprime \"A\" el código: for (i in 1..5) { println(\"A\"); break; } ?",
        "code": "",
        "options": [
          "1 vez",
          "5 veces",
          "0 veces",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Imprime \"A\" en la primera vuelta y el break finaliza el bucle de inmediato.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u05-l07",
    "path": "kotlin",
    "unit": 5,
    "level": 7,
    "title": "7. Errores frecuentes: ciclos infinitos y repeticiones de más o de menos",
    "description": "Depuración y prevención de los dos grandes peligros en bucles: ciclos infinitos que congelan la aplicación y errores de límite (off-by-one) que producen cálculos inexactos.",
    "exercises": [
      {
        "id": "kt-u05-l07-e01",
        "type": "predict_output",
        "prompt": "¿Por qué este código causa un bucle infinito que bloquea el programa?",
        "code": "var x = 1\nwhile (x > 0) {\n    x++\n}",
        "options": [
          "Porque x comienza en 1 y al sumar siempre seguirá siendo mayor que 0",
          "Porque x es inmutable",
          "Porque while no acepta números positivos",
          "Porque falta la palabra clave fun"
        ],
        "correctOptionIndex": 0,
        "explanation": "Como x incrementa continuamente, x > 0 será siempre true y nunca alcanzará una salida.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l07-e02",
        "type": "code_cloze",
        "prompt": "Un ciclo que se ejecuta eternamente sin terminar se denomina bucle ___:",
        "codeWithBlank": "Un ciclo sin condición de salida es un bucle ___.",
        "options": [
          "infinito",
          "abierto",
          "estático",
          "ciego"
        ],
        "correctOption": "infinito",
        "explanation": "El bucle infinito satura la CPU y suele congelar la aplicación.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l07-e03",
        "type": "code_builder",
        "prompt": "Corrige el avance para que el bucle decremente hacia 0 y no sea infinito:",
        "tokens": [
          "contador",
          "=",
          "contador",
          "-",
          "1"
        ],
        "solution": [
          "contador",
          "=",
          "contador",
          "-",
          "1"
        ],
        "explanation": "Resta 1 para aproximar la variable a la condición de parada <= 0.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que provoca que el bucle se ejecute 11 veces en vez de 10:",
        "codeSnippet": [
          "// Se requerían exactamente 10 repeticiones (de 0 a 9)",
          "for (i in 0..10) { // Error: 0..10 genera 11 vueltas (debe ser 0 until 10 o 0..9)",
          "    println(i)"
        ],
        "bugLineIndex": 1,
        "explanation": "0..10 contiene 11 elementos (del 0 al 10 inclusive), clásico error off-by-one.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja el síntoma con su causa habitual en bucles:",
        "pairs": [
          {
            "left": "Programa congelado",
            "right": "Bucle infinito por condición siempre true"
          },
          {
            "left": "Resultado falta 1 elemento",
            "right": "Uso de < en lugar de <= en el límite"
          },
          {
            "left": "Resultado sobra 1 elemento",
            "right": "Uso de <= en lugar de < o rango inclusivo no deseado"
          },
          {
            "left": "No itera ninguna vez",
            "right": "Condición inicial ya era false antes de entrar"
          }
        ],
        "explanation": "Diagnóstico de los fallos más frecuentes en estructuras de repetición.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l07-e06",
        "type": "code_cloze",
        "prompt": "Para iterar exactamente 10 veces empezando desde 0, la condición del while debe ser i < ___:",
        "codeWithBlank": "var i = 0\nwhile (i < ___) { i++ }",
        "options": [
          "10",
          "9",
          "11",
          "0"
        ],
        "correctOption": "10",
        "explanation": "De 0 a 9 hay exactamente 10 repeticiones (0,1,2,3,4,5,6,7,8,9).",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l07-e07",
        "type": "predict_output",
        "prompt": "¿Cuántas veces se ejecuta: for (i in 1..10 step 5) ?",
        "code": "",
        "options": [
          "2 veces (para 1 y 6)",
          "3 veces",
          "1 vez",
          "10 veces"
        ],
        "correctOptionIndex": 0,
        "explanation": "Itera para i = 1 y para i = 6. El siguiente salto es 11, que supera 10.",
        "xpReward": 10
      },
      {
        "id": "kt-u05-l07-e08",
        "type": "code_builder",
        "prompt": "Añade el incremento de control al cuerpo del while para evitar ciclo infinito:",
        "tokens": [
          "pasos",
          "++"
        ],
        "solution": [
          "pasos",
          "++"
        ],
        "explanation": "pasos++ hace avanzar el contador hacia la meta.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error donde la variable de avance no coincide con la condición:",
        "codeSnippet": [
          "var i = 1",
          "var j = 1",
          "while (i <= 5) { j++ } // Error: se incrementa j, pero la condición evalúa i (bucle infinito)"
        ],
        "bugLineIndex": 2,
        "explanation": "Como i nunca cambia, la condición i <= 5 se mantiene true eternamente.",
        "xpReward": 15
      },
      {
        "id": "kt-u05-l07-e10",
        "type": "predict_output",
        "prompt": "¿Qué ocurre al ejecutar while(false) { println(\"X\") } ?",
        "code": "",
        "options": [
          "No imprime nada y continúa normalmente",
          "Produce un bucle infinito",
          "Causa un error fatal de compilación",
          "Imprime X una sola vez"
        ],
        "correctOptionIndex": 0,
        "explanation": "Al ser la condición false desde el inicio, el cuerpo simplemente se ignora.",
        "xpReward": 10
      }
    ]
  }
];
