import { Lesson } from '../../../types/lesson';

export const KOTLIN_UNIT_03_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u03-l01",
    "path": "kotlin",
    "unit": 3,
    "level": 1,
    "title": "1. Operadores aritméticos: +, -, *, / y %",
    "description": "Los operadores matemáticos fundamentales en programación para realizar sumas, restas, multiplicaciones, divisiones y cálculo del residuo (módulo %).",
    "exercises": [
      {
        "id": "kt-u03-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado de la operación módulo 17 % 5 en Kotlin?",
        "code": "val residuo = 17 % 5\nprintln(residuo)",
        "options": [
          "2",
          "3",
          "3.4",
          "1"
        ],
        "correctOptionIndex": 0,
        "explanation": "17 dividido entre 5 es 3 con un residuo de 2 (5 * 3 + 2 = 17).",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l01-e02",
        "type": "code_cloze",
        "prompt": "El operador para obtener el residuo o resto de una división es ___:",
        "codeWithBlank": "val resto = 10 ___ 3",
        "options": [
          "%",
          "/",
          "//",
          "mod"
        ],
        "correctOption": "%",
        "explanation": "% es el operador de módulo en Kotlin y la mayoría de lenguajes.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l01-e03",
        "type": "code_builder",
        "prompt": "Construye la expresión para multiplicar base por altura:",
        "tokens": [
          "val",
          "area",
          "=",
          "base",
          "*",
          "altura"
        ],
        "solution": [
          "val",
          "area",
          "=",
          "base",
          "*",
          "altura"
        ],
        "explanation": "Multiplica ambas dimensiones y almacena en area.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la operación que provocará un error crítico de ejecución (crash):",
        "codeSnippet": [ "val x = 10", "val y = 0", "val z = x / y" ],
        "bugLineIndex": 2,
        "explanation": "Dividir un entero entre cero causa una ArithmeticException: / by zero.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja el operador aritmético con su función:",
        "pairs": [
          {
            "left": "+",
            "right": "Suma de dos valores"
          },
          {
            "left": "-",
            "right": "Resta de dos valores"
          },
          {
            "left": "*",
            "right": "Multiplicación de factores"
          },
          {
            "left": "%",
            "right": "Residuo de una división entera"
          }
        ],
        "explanation": "Operadores aritméticos binarios básicos.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l01-e06",
        "type": "code_cloze",
        "prompt": "Para comprobar si un número n es par, verificamos si n % 2 es igual a ___:",
        "codeWithBlank": "val esPar = (n % 2 == ___)",
        "options": [
          "0",
          "1",
          "2",
          "null"
        ],
        "correctOption": "0",
        "explanation": "Un número es par si al dividirlo entre 2 el residuo es exactamente 0.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l01-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: println(10 - 3 * 2); ?",
        "code": "",
        "options": [
          "4",
          "14",
          "7",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "La multiplicación tiene prioridad: 3 * 2 = 6; luego 10 - 6 = 4.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l01-e08",
        "type": "code_builder",
        "prompt": "Construye el cálculo de la mitad de una cantidad:",
        "tokens": [
          "val",
          "mitad",
          "=",
          "cantidad",
          "/",
          "2"
        ],
        "solution": [
          "val",
          "mitad",
          "=",
          "cantidad",
          "/",
          "2"
        ],
        "explanation": "Divide la cantidad entre 2.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el operador matemático no soportado en Kotlin para potencias:",
        "codeSnippet": [ "val suma = 2 + 2", "val potencia = 2 ^ 3", "val mult = 2 * 3" ],
        "bugLineIndex": 1,
        "explanation": "En Kotlin ^ es una operación binaria XOR; para potencias se usa Math.pow() o multiplicación.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l01-e10",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado de evaluar: println(20 % 4); ?",
        "code": "",
        "options": [
          "0",
          "5",
          "4",
          "1"
        ],
        "correctOptionIndex": 0,
        "explanation": "20 es divisible exactamente entre 4, por lo que el residuo es 0.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u03-l02",
    "path": "kotlin",
    "unit": 3,
    "level": 2,
    "title": "2. División entera frente a división decimal",
    "description": "En Kotlin, dividir dos números enteros (Int / Int) produce un resultado estrictamente entero, truncando los decimales. Para obtener decimales, al menos uno de los operandos debe ser Double.",
    "exercises": [
      {
        "id": "kt-u03-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto de la operación 9 / 2 en Kotlin?",
        "code": "val r = 9 / 2\nprintln(r)",
        "options": [
          "4",
          "4.5",
          "5",
          "4.0"
        ],
        "correctOptionIndex": 0,
        "explanation": "Al ser ambos operandos Int, Kotlin trunca los decimales y devuelve el entero 4.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l02-e02",
        "type": "code_cloze",
        "prompt": "Para que la división de 9 entre 2 dé 4.5, debemos escribir al menos un operando con punto ___:",
        "codeWithBlank": "val r = 9.___ / 2",
        "options": [
          "0",
          "f",
          "d",
          "int"
        ],
        "correctOption": "0",
        "explanation": "Escribir 9.0 convierte el literal en Double, habilitando la división decimal.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l02-e03",
        "type": "code_builder",
        "prompt": "Construye la división decimal de 5 entre 2 usando un literal Double:",
        "tokens": [
          "val",
          "res",
          "=",
          "5.0",
          "/",
          "2"
        ],
        "solution": [
          "val",
          "res",
          "=",
          "5.0",
          "/",
          "2"
        ],
        "explanation": "5.0 / 2 produce 2.5 de tipo Double.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea donde se pierden accidentalmente los decimales en el cálculo del promedio:",
        "codeSnippet": [
          "val n1 = 4",
          "val n2 = 5",
          "val promedio = (n1 + n2) / 2 // Da 4 en lugar de 4.5"
        ],
        "bugLineIndex": 2,
        "explanation": "(4 + 5) / 2 es 9 / 2 = 4 (división entera). Debe ser / 2.0 para dar 4.5.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la expresión con su resultado exacto en Kotlin:",
        "pairs": [
          {
            "left": "7 / 2",
            "right": "3 (Int truncado)"
          },
          {
            "left": "7.0 / 2",
            "right": "3.5 (Double)"
          },
          {
            "left": "1 / 2",
            "right": "0 (Int truncado)"
          },
          {
            "left": "1.0 / 2",
            "right": "0.5 (Double)"
          }
        ],
        "explanation": "Diferencia crítica entre división entera y división en punto flotante.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l02-e06",
        "type": "code_cloze",
        "prompt": "En la división entera, los decimales no se redondean, sino que se ___ hacia cero:",
        "codeWithBlank": "La parte fraccionaria se ___.",
        "options": [
          "trunca",
          "redondea",
          "duplica",
          "invierte"
        ],
        "correctOption": "trunca",
        "explanation": "Truncar significa descartar directamente los decimales sin importar si es .9.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l02-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: println(10 / 4.0); ?",
        "code": "",
        "options": [
          "2.5",
          "2",
          "2.0",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Como 4.0 es Double, la operación se eleva a Double y da 2.5.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l02-e08",
        "type": "code_builder",
        "prompt": "Convierte la variable entera x a Double antes de dividir entre 2:",
        "tokens": [
          "val",
          "res",
          "=",
          "x.toDouble()",
          "/",
          "2"
        ],
        "solution": [
          "val",
          "res",
          "=",
          "x.toDouble()",
          "/",
          "2"
        ],
        "explanation": "x.toDouble() transforma el entero en Double asegurando decimales.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el resultado engañoso por división entera:",
        "codeSnippet": [
          "val porcentaje = 1 / 4 * 100 // 1/4 da 0, por lo que 0 * 100 da 0%",
          "val correcto = 1.0 / 4 * 100 // 0.25 * 100 = 25%",
          "println(correcto)"
        ],
        "bugLineIndex": 0,
        "explanation": "1 / 4 da 0 en división entera, arruinando el cálculo del porcentaje.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l02-e10",
        "type": "predict_output",
        "prompt": "¿Qué valor da 3 / 2 + 3.0 / 2 en Kotlin?",
        "code": "",
        "options": [
          "4.5",
          "4",
          "5.0",
          "3.5"
        ],
        "correctOptionIndex": 0,
        "explanation": "3 / 2 da 1; 3.0 / 2 da 1.5; luego 1 + 1.5 = 4.5.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u03-l03",
    "path": "kotlin",
    "unit": 3,
    "level": 3,
    "title": "3. Comparaciones: ==, !=, <, >, <=, >=",
    "description": "Los operadores relacionales comparan dos valores y siempre devuelven un resultado booleano (true o false).",
    "exercises": [
      {
        "id": "kt-u03-l03-e01",
        "type": "predict_output",
        "prompt": "¿Qué devolverá la comparación: println(15 != 20); ?",
        "code": "",
        "options": [
          "true",
          "false",
          "15",
          "20"
        ],
        "correctOptionIndex": 0,
        "explanation": "15 es diferente de 20, por lo que la condición != es verdadera (true).",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l03-e02",
        "type": "code_cloze",
        "prompt": "El operador para comprobar si dos valores son exactamente iguales en Kotlin es ___:",
        "codeWithBlank": "val esIgual = (a ___ b)",
        "options": [
          "==",
          "=",
          "===",
          "eq"
        ],
        "correctOption": "==",
        "explanation": "== compara el contenido o valor de ambos operandos.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l03-e03",
        "type": "code_builder",
        "prompt": "Construye la condición para verificar si edad es mayor o igual a 18:",
        "tokens": [
          "val",
          "mayorDeEdad",
          "=",
          "edad",
          ">=",
          "18"
        ],
        "solution": [
          "val",
          "mayorDeEdad",
          "=",
          "edad",
          ">=",
          "18"
        ],
        "explanation": "edad >= 18 devuelve true si edad es 18 o mayor.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea donde se confunde asignación con comparación:",
        "codeSnippet": [ "val clave = 1234", "if (clave = 1234) {", "    println(\"Acceso correcto\")" ],
        "bugLineIndex": 1,
        "explanation": "En las condiciones se debe usar == para comparar igualdad, nunca el operador =.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja el operador relacional con su significado:",
        "pairs": [
          {
            "left": "==",
            "right": "Igual a"
          },
          {
            "left": "!=",
            "right": "Diferente de (no igual)"
          },
          {
            "left": "<=",
            "right": "Menor o igual que"
          },
          {
            "left": ">=",
            "right": "Mayor o igual que"
          }
        ],
        "explanation": "Operadores de comparación estándar en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l03-e06",
        "type": "code_cloze",
        "prompt": "El resultado de evaluar cualquier comparación relacional es de tipo ___:",
        "codeWithBlank": "Toda comparación relacional produce un valor ___.",
        "options": [
          "Boolean",
          "Int",
          "String",
          "Double"
        ],
        "correctOption": "Boolean",
        "explanation": "Las comparaciones siempre producen un booleano (true o false).",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l03-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: println(10 <= 10); ?",
        "code": "",
        "options": [
          "true",
          "false",
          "10",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "10 es menor o igual a 10 (se cumple la igualdad), devolviendo true.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la verificación de si stock es menor estricto que 5:",
        "tokens": [
          "val",
          "bajoStock",
          "=",
          "stock",
          "<",
          "5"
        ],
        "solution": [
          "val",
          "bajoStock",
          "=",
          "stock",
          "<",
          "5"
        ],
        "explanation": "Compara si stock es menor que 5.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la comparación relacional mal escrita:",
        "codeSnippet": [ "val a = 5", "val b = 10", "println(a => b)" ],
        "bugLineIndex": 2,
        "explanation": "El operador mayor o igual se escribe >=; => no existe en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l03-e10",
        "type": "predict_output",
        "prompt": "¿Qué imprime: val a = \"Hola\"; val b = \"Hola\"; println(a == b); ?",
        "code": "",
        "options": [
          "true",
          "false",
          "Hola",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "En Kotlin, == compara el contenido estructural de las cadenas String.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u03-l04",
    "path": "kotlin",
    "unit": 3,
    "level": 4,
    "title": "4. Operadores lógicos: &&, || y !",
    "description": "Permiten combinar múltiples condiciones booleanas: && (Y lógico: todas deben cumplirse), || (O lógico: al menos una debe cumplirse) y ! (NO lógico: invierte el valor).",
    "exercises": [
      {
        "id": "kt-u03-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado de evaluar: true && false || true ?",
        "code": "",
        "options": [
          "true",
          "false",
          "Error",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "true && false da false; luego false || true da true.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l04-e02",
        "type": "code_cloze",
        "prompt": "El operador lógico que exige que ambas condiciones sean verdaderas es ___:",
        "codeWithBlank": "val acceso = (tieneUsuario ___ tieneClave)",
        "options": [
          "&&",
          "||",
          "!",
          "=="
        ],
        "correctOption": "&&",
        "explanation": "&& (AND lógico) requiere que ambos lados sean verdaderos.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l04-e03",
        "type": "code_builder",
        "prompt": "Construye la condición lógica para verificar si edad está entre 18 y 65:",
        "tokens": [
          "edad",
          ">=",
          "18",
          "&&",
          "edad",
          "<=",
          "65"
        ],
        "solution": [
          "edad",
          ">=",
          "18",
          "&&",
          "edad",
          "<=",
          "65"
        ],
        "explanation": "Combina ambas cotas con el operador &&.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con error en el operador lógico:",
        "codeSnippet": [ "val a = true", "val b = false", "val c = a AND b" ],
        "bugLineIndex": 2,
        "explanation": "El operador lógico Y se escribe && en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la tabla de verdad lógica básica:",
        "pairs": [
          {
            "left": "true && true",
            "right": "true"
          },
          {
            "left": "true && false",
            "right": "false"
          },
          {
            "left": "false || true",
            "right": "true"
          },
          {
            "left": "!true",
            "right": "false"
          }
        ],
        "explanation": "Tablas de verdad fundamentales para la toma de decisiones lógicas.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l04-e06",
        "type": "code_cloze",
        "prompt": "El operador que invierte el valor de una variable booleana se escribe con el símbolo ___:",
        "codeWithBlank": "val bloqueado = ___activo",
        "options": [
          "!",
          "~",
          "-",
          "not"
        ],
        "correctOption": "!",
        "explanation": "! es el operador de negación lógica unaria.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué valor produce: !(5 > 2) ?",
        "code": "",
        "options": [
          "false",
          "true",
          "5",
          "2"
        ],
        "correctOptionIndex": 0,
        "explanation": "5 > 2 es true; al negarlo con ! se convierte en false.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la condición: si tiene saldo O tiene crédito:",
        "tokens": [
          "tieneSaldo",
          "||",
          "tieneCredito"
        ],
        "solution": [
          "tieneSaldo",
          "||",
          "tieneCredito"
        ],
        "explanation": "|| valida que al menos una de las alternativas sea verdadera.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con la condición lógica imposible de cumplirse:",
        "codeSnippet": [ "val x = 10", "val imposible = (x > 20 && x < 5)", "println(imposible)" ],
        "bugLineIndex": 1,
        "explanation": "Es una contradicción lógica; x no puede ser simultáneamente mayor que 20 y menor que 5.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l04-e10",
        "type": "predict_output",
        "prompt": "En la expresión (false && f()), ¿se ejecutará la función f()?",
        "code": "",
        "options": [
          "No, por cortocircuito: al ser el primer operando false en &&, Kotlin ya sabe que el resultado es false",
          "Sí, Kotlin siempre ejecuta ambos lados obligatoriamente",
          "Solo si f() devuelve un entero",
          "Provoca un error de compilación"
        ],
        "correctOptionIndex": 0,
        "explanation": "La evaluación de cortocircuito ahorra procesamiento y evita evaluar condiciones innecesarias.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u03-l05",
    "path": "kotlin",
    "unit": 3,
    "level": 5,
    "title": "5. Prioridad de operaciones y paréntesis",
    "description": "El orden matemático y lógico en que el compilador evalúa las expresiones: primero paréntesis (), luego *, /, %, luego +, -, luego comparaciones y finalmente && y ||.",
    "exercises": [
      {
        "id": "kt-u03-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el valor evaluado de la expresión: 10 + 2 * 5 ?",
        "code": "",
        "options": [
          "20",
          "60",
          "17",
          "100"
        ],
        "correctOptionIndex": 0,
        "explanation": "Multiplicación primero: 2 * 5 = 10; luego suma: 10 + 10 = 20.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l05-e02",
        "type": "code_cloze",
        "prompt": "Para forzar a que una suma se calcule antes que una multiplicación, usamos ___:",
        "codeWithBlank": "val resultado = ___2 + 3___ * 4",
        "options": [
          "( y )",
          "[ y ]",
          "{ y }",
          "< y >"
        ],
        "correctOption": "( y )",
        "explanation": "Los paréntesis redondos () tienen la máxima prioridad de evaluación.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l05-e03",
        "type": "code_builder",
        "prompt": "Construye la expresión para sumar a y b antes de multiplicar por c:",
        "tokens": [
          "(",
          "a",
          "+",
          "b",
          ")",
          "*",
          "c"
        ],
        "solution": [
          "(",
          "a",
          "+",
          "b",
          ")",
          "*",
          "c"
        ],
        "explanation": "Los paréntesis garantizan que la suma ocurra en primer lugar.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con paréntesis desbalanceados:",
        "codeSnippet": [ "val a = (5 + 3) * 2", "val b = ((10 - 2) * 3", "val c = (4 + 4)" ],
        "bugLineIndex": 1,
        "explanation": "Todo paréntesis abierto debe tener su correspondiente cierre; de lo contrario hay error de sintaxis.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja el operador con su nivel de precedencia (del más alto al más bajo):",
        "pairs": [
          {
            "left": "Paréntesis ()",
            "right": "Nivel 1 (Máxima prioridad)"
          },
          {
            "left": "Multiplicación y División (*, /)",
            "right": "Nivel 2 (Antes de sumas y restas)"
          },
          {
            "left": "Comparaciones (==, <, >)",
            "right": "Nivel 3 (Tras cálculos aritméticos)"
          },
          {
            "left": "Lógicos (&&, ||)",
            "right": "Nivel 4 (Últimos en evaluarse)"
          }
        ],
        "explanation": "Jerarquía oficial de operadores en programación.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l05-e06",
        "type": "code_cloze",
        "prompt": "Entre los operadores lógicos, ___ tiene mayor prioridad que ||:",
        "codeWithBlank": "En a || b && c, primero se evalúa b ___ c.",
        "options": [
          "&&",
          "||",
          "==",
          "!"
        ],
        "correctOption": "&&",
        "explanation": "&& (conjunción) tiene mayor precedencia que || (disyunción).",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l05-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es el valor de: (10 + 20) / (2 * 3) ?",
        "code": "",
        "options": [
          "5",
          "30",
          "15",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "(10 + 20) = 30; (2 * 3) = 6; luego 30 / 6 = 5.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la fórmula del área del triángulo con paréntesis:",
        "tokens": [
          "val",
          "area",
          "=",
          "(",
          "b",
          "*",
          "h",
          ")",
          "/",
          "2"
        ],
        "solution": [
          "val",
          "area",
          "=",
          "(",
          "b",
          "*",
          "h",
          ")",
          "/",
          "2"
        ],
        "explanation": "Asegura la multiplicación previa antes de dividir entre 2.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error en la fórmula del promedio:",
        "codeSnippet": [ "val n1 = 8", "val n2 = 10", "val prom = n1 + n2 / 2" ],
        "bugLineIndex": 2,
        "explanation": "Faltan paréntesis: debe ser (n1 + n2) / 2 para sumar antes de dividir.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l05-e10",
        "type": "predict_output",
        "prompt": "¿Qué valor devuelve: 20 - 4 - 2 ?",
        "code": "",
        "options": [
          "14",
          "18",
          "22",
          "12"
        ],
        "correctOptionIndex": 0,
        "explanation": "Operadores con misma precedencia (+ y -) se asocian de izquierda a derecha: (20 - 4) = 16; 16 - 2 = 14.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u03-l06",
    "path": "kotlin",
    "unit": 3,
    "level": 6,
    "title": "6. Asignaciones abreviadas: +=, -=, *=, /=",
    "description": "Los operadores compuestos combinan una operación aritmética con la asignación en una sintaxis compacta y limpia (ej. x += 5 equivale a x = x + 5).",
    "exercises": [
      {
        "id": "kt-u03-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el valor final de puntos tras ejecutar: var puntos = 10; puntos += 15; ?",
        "code": "",
        "options": [
          "25",
          "10",
          "15",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "puntos += 15 suma 15 al valor previo (10) resultando en 25.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l06-e02",
        "type": "code_cloze",
        "prompt": "La forma abreviada de escribir contador = contador + 1 es ___:",
        "codeWithBlank": "contador ___ 1",
        "options": [
          "+=",
          "++",
          "==",
          "=+"
        ],
        "correctOption": "+=",
        "explanation": "+= suma el valor de la derecha y lo reasigna a la variable.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l06-e03",
        "type": "code_builder",
        "prompt": "Construye la asignación abreviada para duplicar el valor de vidas (*= 2):",
        "tokens": [
          "vidas",
          "*=",
          "2"
        ],
        "solution": [
          "vidas",
          "*=",
          "2"
        ],
        "explanation": "vidas *= 2 equivale a vidas = vidas * 2.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con error al intentar usar una asignación compuesta:",
        "codeSnippet": [ "val oro = 100", "oro += 50", "println(oro)" ],
        "bugLineIndex": 1,
        "explanation": "+= realiza una reasignación; por ende, requiere que la variable sea mutable (var).",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la asignación abreviada con su forma expandida equivalente:",
        "pairs": [
          {
            "left": "a += b",
            "right": "a = a + b"
          },
          {
            "left": "a -= b",
            "right": "a = a - b"
          },
          {
            "left": "a *= b",
            "right": "a = a * b"
          },
          {
            "left": "a /= b",
            "right": "a = a / b"
          }
        ],
        "explanation": "Equivalencias directas de los operadores compuestos de asignación.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l06-e06",
        "type": "code_cloze",
        "prompt": "Para restar 10 a la variable saldo de forma compacta usamos el operador ___:",
        "codeWithBlank": "saldo ___ 10",
        "options": [
          "-=",
          "=-",
          "--",
          "-"
        ],
        "correctOption": "-=",
        "explanation": "-= resta el operando derecho del valor actual.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué imprimirá: var n = 8; n /= 2; println(n); ?",
        "code": "",
        "options": [
          "4",
          "8",
          "2",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "8 / 2 = 4; el valor se actualiza en n.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción para acumular venta en el total:",
        "tokens": [
          "total",
          "+=",
          "venta"
        ],
        "solution": [
          "total",
          "+=",
          "venta"
        ],
        "explanation": "Patrón estándar de acumulación: total += venta.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error tipográfico en el orden del operador compuesto:",
        "codeSnippet": [
          "var x = 10",
          "x =+ 5 // Cuidado: esto asigna positivo 5 (+5), no suma 5 a x",
          "println(x)"
        ],
        "bugLineIndex": 1,
        "explanation": "El operador correcto es +=; escribir =+ asigna el número positivo 5 sobrescribiendo x.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l06-e10",
        "type": "predict_output",
        "prompt": "Si tenemos: var x = 5; x += 3; x *= 2; ¿cuánto vale x?",
        "code": "",
        "options": [
          "16",
          "11",
          "13",
          "10"
        ],
        "correctOptionIndex": 0,
        "explanation": "5 += 3 da 8; luego 8 *= 2 da 16.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u03-l07",
    "path": "kotlin",
    "unit": 3,
    "level": 7,
    "title": "7. Conversiones numéricas básicas",
    "description": "En Kotlin no existen conversiones implícitas automáticas entre tipos numéricos. Debes usar métodos explícitos como toInt(), toDouble(), toLong() o toString() para convertir datos con seguridad.",
    "exercises": [
      {
        "id": "kt-u03-l07-e01",
        "type": "predict_output",
        "prompt": "¿Qué valor resulta de convertir el Double 9.99 a Int con toInt()?",
        "code": "val d = 9.99\nval i = d.toInt()\nprintln(i)",
        "options": [
          "9",
          "10",
          "9.99",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "toInt() trunca la parte decimal por completo; no redondea hacia arriba.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l07-e02",
        "type": "code_cloze",
        "prompt": "El método para convertir un número entero en un número con punto decimal es ___():",
        "codeWithBlank": "val d = entero.___()",
        "options": [
          "toDouble",
          "toDoubleValue",
          "castDouble",
          "asDouble"
        ],
        "correctOption": "toDouble",
        "explanation": ".toDouble() convierte el número a su representación de 64 bits en coma flotante.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l07-e03",
        "type": "code_builder",
        "prompt": "Construye la conversión explícita de la variable edad a texto:",
        "tokens": [
          "val",
          "texto",
          "=",
          "edad.toString()"
        ],
        "solution": [
          "val",
          "texto",
          "=",
          "edad.toString()"
        ],
        "explanation": "edad.toString() convierte el número a una cadena String.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con error por intentar conversión implícita prohibida en Kotlin:",
        "codeSnippet": [ "val a: Int = 10", "val b: Double = a", "val c: Double = a.toDouble()" ],
        "bugLineIndex": 1,
        "explanation": "En Kotlin, asignar un Int directamente a una variable Double sin .toDouble() es ilegal.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja el método de conversión con su tipo de destino:",
        "pairs": [
          {
            "left": "42.toDouble()",
            "right": "42.0 (Double)"
          },
          {
            "left": "7.85.toInt()",
            "right": "7 (Int truncado)"
          },
          {
            "left": "100.toString()",
            "right": "\"100\" (String)"
          },
          {
            "left": "'A'.code",
            "right": "65 (Código ASCII/Unicode Int)"
          }
        ],
        "explanation": "Métodos explícitos de conversión numérica en la biblioteca estándar de Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l07-e06",
        "type": "code_cloze",
        "prompt": "Para convertir una cadena \"123\" a entero usamos el método ___():",
        "codeWithBlank": "val num = \"123\".___()",
        "options": [
          "toInt",
          "parseInt",
          "toNumber",
          "makeInt"
        ],
        "correctOption": "toInt",
        "explanation": ".toInt() analiza el texto y lo convierte en su valor numérico Int.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l07-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: println(5.toDouble()); ?",
        "code": "",
        "options": [
          "5.0",
          "5",
          "Double",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "5.toDouble() produce el literal decimal 5.0.",
        "xpReward": 10
      },
      {
        "id": "kt-u03-l07-e08",
        "type": "code_builder",
        "prompt": "Convierte el decimal precio a entero para truncar centavos:",
        "tokens": [
          "val",
          "precioEntero",
          "=",
          "precio.toInt()"
        ],
        "solution": [
          "val",
          "precioEntero",
          "=",
          "precio.toInt()"
        ],
        "explanation": "precio.toInt() descarta los centavos decimales.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que provocará un error NumberFormatException al convertir:",
        "codeSnippet": [ "val a = \"50\".toInt()", "val b = \"cien\".toInt()", "val c = \"25\".toInt()" ],
        "bugLineIndex": 1,
        "explanation": "\"cien\" no contiene dígitos numéricos; toInt() fallará con NumberFormatException.",
        "xpReward": 15
      },
      {
        "id": "kt-u03-l07-e10",
        "type": "predict_output",
        "prompt": "¿Qué imprime: val s = 10.toString() + 20.toString(); println(s); ?",
        "code": "",
        "options": [
          "1020",
          "30",
          "10 20",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Ambos son ahora Strings; el operador + concatena los textos formando \"1020\".",
        "xpReward": 10
      }
    ]
  }
];
