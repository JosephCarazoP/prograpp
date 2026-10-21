import { Lesson } from '../../../types/lesson';

export const KOTLIN_UNIT_11_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u11-l01",
    "path": "kotlin",
    "unit": 11,
    "level": 1,
    "title": "1. Qué es una lambda y cómo leerla",
    "description": "Descubre las funciones anónimas o lambdas: bloques de código entre llaves { } que puedes pasar como argumentos a otras funciones.",
    "exercises": [
      {
        "id": "kt-u11-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Qué es una lambda y cómo leerla\"?",
        "code": "val triple = { x: Int -> x * 3 }\nprintln(triple(4))",
        "options": [
          "12",
          "4",
          "x * 3",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Una lambda es una función literal sin nombre declarada entre llaves { }.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l01-e02",
        "type": "code_cloze",
        "prompt": "En una lambda de Kotlin con un solo parámetro, el identificador implícito predeterminado es ___:",
        "codeWithBlank": "En una lambda de Kotlin con un solo parámetro, el identificador implícito predeterminado es ___:",
        "options": [
          "it",
          "this",
          "self",
          "arg"
        ],
        "correctOption": "it",
        "explanation": "La flecha -> separa los parámetros del cuerpo de la expresión.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Qué es una lambda y cómo leerla\":",
        "tokens": [
          "val",
          "cuadrado",
          "=",
          "{",
          "n:",
          "Int",
          "->",
          "n",
          "*",
          "n",
          "}"
        ],
        "solution": [
          "val",
          "cuadrado",
          "=",
          "{",
          "n:",
          "Int",
          "->",
          "n",
          "*",
          "n",
          "}"
        ],
        "explanation": "Si una función lambda tiene un solo parámetro, Kotlin te permite omitir el nombre y llamarlo simplemente `it`.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Qué es una lambda y cómo leerla\":",
        "codeSnippet": [
          "val suma = (a: Int, b: Int) -> a + b // Error: las lambdas van entre llaves { }"
        ],
        "bugLineIndex": 0,
        "explanation": "No confundir el cuerpo de una lambda { ... } con el bloque de una clase o función tradicional.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Qué es una lambda y cómo leerla\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Qué es una lambda y cómo leerla",
            "right": "Una lambda es una función literal sin nombre declarada entre llaves { }."
          },
          {
            "left": "Principio 2",
            "right": "La flecha -> separa los parámetros del cuerpo de la expresión."
          },
          {
            "left": "Principio 3",
            "right": "it es la convención implícita para lambdas de un único parámetro."
          },
          {
            "left": "Buena práctica",
            "right": "Si una función lambda tiene un solo parámetro, Kotli..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l01-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Qué es una lambda y cómo leerla\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Qué es una lambda y cómo leerla\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Si una función lambda tiene un solo parámetro, Kotlin te permite omitir el nombre y llamarlo simplemente `it`.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Qué es una lambda y cómo leerla\"?",
        "code": "fun main() {\n    val duplicar = { n: Int -> n * 2 }\n    println(\"Invocando lambda: ${duplicar(5)}\")\n    val numeros = listOf(1, 2, 3)\n    numeros.forEach { println(\"Elemento vía it: $it\") }",
        "options": [
          "Invocando lambda: 10",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Invocando lambda: 10",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Qué es una lambda y cómo leerla\":",
        "tokens": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Qué es una lambda y cómo leerla\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "No confundir el cuerpo de una lambda { ... } con el bloque de una clase o función tradicional.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Qué es una lambda y cómo leerla\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Descubre las funciones anónimas o lambdas: bloques d..."
          },
          {
            "left": "Riesgo crítico",
            "right": "No confundir el cuerpo de una lambda { ... } con el ..."
          },
          {
            "left": "Recomendación",
            "right": "Si una función lambda tiene un solo parámetro, Kotli..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Código fuente y compilador Kotlin"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "kotlin-u11-l02",
    "path": "kotlin",
    "unit": 11,
    "level": 2,
    "title": "2. Filtrar con filter",
    "description": "Filtra elementos de una colección extrayendo solo aquellos que cumplan con una condición booleana.",
    "exercises": [
      {
        "id": "kt-u11-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Filtrar con filter\"?",
        "code": "val edades = listOf(15, 22, 17, 30)\nval adultos = edades.filter { it >= 18 }\nprintln(adultos.size)",
        "options": [
          "2",
          "4",
          "1",
          "3"
        ],
        "correctOptionIndex": 0,
        "explanation": "filter recibe un predicado: función que retorna true o false.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l02-e02",
        "type": "code_cloze",
        "prompt": "La función de orden superior para seleccionar elementos que cumplan una condición es ___:",
        "codeWithBlank": "La función de orden superior para seleccionar elementos que cumplan una condición es ___:",
        "options": [
          "filter",
          "map",
          "select",
          "where"
        ],
        "correctOption": "filter",
        "explanation": "Si la lambda devuelve true, el elemento se conserva en el nuevo resultado.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Filtrar con filter\":",
        "tokens": [
          "val",
          "aprobados",
          "=",
          "notas",
          ".",
          "filter",
          "{",
          "it",
          ">=",
          "70",
          "}"
        ],
        "solution": [
          "val",
          "aprobados",
          "=",
          "notas",
          ".",
          "filter",
          "{",
          "it",
          ">=",
          "70",
          "}"
        ],
        "explanation": "filter NO modifica la lista original; crea y devuelve una NUEVA lista con los elementos seleccionados.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Filtrar con filter\":",
        "codeSnippet": [
          "val nums = listOf(1, 2, 3)",
          "val res = nums.filter { it * 2 } // Error: la lambda debe devolver Boolean"
        ],
        "bugLineIndex": 1,
        "explanation": "Escribir una condición que no retorne Boolean dentro de filter causará error de compilación.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Filtrar con filter\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "filter recibe un predicado",
            "right": "función que retorna true o false."
          },
          {
            "left": "Principio 2",
            "right": "Si la lambda devuelve true, el elemento se conserva en el nuevo resultado."
          },
          {
            "left": "Es inmutable y seguro",
            "right": "la lista origen permanece intacta."
          },
          {
            "left": "Buena práctica",
            "right": "filter NO modifica la lista original; crea y devuelv..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l02-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Filtrar con filter\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Filtrar con filter\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "filter NO modifica la lista original; crea y devuelve una NUEVA lista con los elementos seleccionados.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Filtrar con filter\"?",
        "code": "fun main() {\n    val numeros = listOf(1, 2, 3, 4, 5, 6, 7, 8)\n    val pares = numeros.filter { it % 2 == 0 }\n    val mayores = numeros.filter { it > 5 }\n    println(\"Pares:   $pares\")",
        "options": [
          "Pares:   [2, 4, 6, 8]",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Pares:   [2, 4, 6, 8]",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Filtrar con filter\":",
        "tokens": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Filtrar con filter\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Escribir una condición que no retorne Boolean dentro de filter causará error de compilación.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Filtrar con filter\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Filtra elementos de una colección extrayendo solo aq..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Escribir una condición que no retorne Boolean dentro..."
          },
          {
            "left": "Recomendación",
            "right": "filter NO modifica la lista original; crea y devuelv..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Código fuente y compilador Kotlin"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "kotlin-u11-l03",
    "path": "kotlin",
    "unit": 11,
    "level": 3,
    "title": "3. Transformar con map",
    "description": "Transforma cada elemento de una colección en un nuevo valor aplicando una función y obteniendo una lista resultante del mismo tamaño.",
    "exercises": [
      {
        "id": "kt-u11-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Transformar con map\"?",
        "code": "val numeros = listOf(1, 2, 3)\nval dobles = numeros.map { it * 2 }\nprintln(dobles)",
        "options": [
          "[2, 4, 6]",
          "[1, 2, 3]",
          "6",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "map aplica la lambda sobre cada elemento uno a uno.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l03-e02",
        "type": "code_cloze",
        "prompt": "La función de transformación que aplica una lambda a cada elemento conservando el tamaño es ___:",
        "codeWithBlank": "La función de transformación que aplica una lambda a cada elemento conservando el tamaño es ___:",
        "options": [
          "map",
          "filter",
          "reduce",
          "apply"
        ],
        "correctOption": "map",
        "explanation": "La lista resultante tiene exactamente la misma cantidad de elementos.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Transformar con map\":",
        "tokens": [
          "val",
          "nombres",
          "=",
          "usuarios",
          ".",
          "map",
          "{",
          "it.nombre",
          "}"
        ],
        "solution": [
          "val",
          "nombres",
          "=",
          "usuarios",
          ".",
          "map",
          "{",
          "it.nombre",
          "}"
        ],
        "explanation": "Puedes cambiar incluso el tipo de dato: transformar una lista de Alumno a una lista de String con sus nombres.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Transformar con map\":",
        "codeSnippet": [
          "val lista = listOf(\"1\", \"2\")",
          "val enteros: List<Int> = lista.filter { it.toInt() } // Error: filter no transforma tipos, se usa map"
        ],
        "bugLineIndex": 1,
        "explanation": "Confundir filter con map: filter selecciona (puede reducir el tamaño), map transforma (mantiene el tamaño exacto).",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Transformar con map\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Transformar con map",
            "right": "map aplica la lambda sobre cada elemento uno a uno."
          },
          {
            "left": "Principio 2",
            "right": "La lista resultante tiene exactamente la misma cantidad de elementos."
          },
          {
            "left": "Permite mapear tipos",
            "right": "de List<Producto> a List<Double> (precios)."
          },
          {
            "left": "Buena práctica",
            "right": "Puedes cambiar incluso el tipo de dato: transformar ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l03-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Transformar con map\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Transformar con map\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Puedes cambiar incluso el tipo de dato: transformar una lista de Alumno a una lista de String con sus nombres.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Transformar con map\"?",
        "code": "fun main() {\n    val preciosDolares = listOf(10.0, 25.0, 50.0)\n    val tasaCambio = 8.5\n    val preciosLocales = preciosDolares.map { it * tasaCambio }\n    println(\"Dólares: $preciosDolares\")",
        "options": [
          "Dólares: [10.0, 25.0, 50.0]",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Dólares: [10.0, 25.0, 50.0]",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Transformar con map\":",
        "tokens": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Transformar con map\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Confundir filter con map: filter selecciona (puede reducir el tamaño), map transforma (mantiene el tamaño exacto).",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Transformar con map\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Transforma cada elemento de una colección en un nuev..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Confundir filter con map: filter selecciona (puede r..."
          },
          {
            "left": "Recomendación",
            "right": "Puedes cambiar incluso el tipo de dato: transformar ..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Código fuente y compilador Kotlin"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "kotlin-u11-l04",
    "path": "kotlin",
    "unit": 11,
    "level": 4,
    "title": "4. Buscar con find",
    "description": "Encuentra el primer elemento que cumpla un criterio específico o devuelve null si ninguno coincide.",
    "exercises": [
      {
        "id": "kt-u11-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Buscar con find\"?",
        "code": "val nums = listOf(5, 12, 8, 20)\nval r = nums.find { it > 10 }\nprintln(r)",
        "options": [
          "12",
          "20",
          "[12, 20]",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "find devuelve el primer elemento que satisface el predicado.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l04-e02",
        "type": "code_cloze",
        "prompt": "La función que devuelve el primer elemento coincidente o null si no existe es ___:",
        "codeWithBlank": "La función que devuelve el primer elemento coincidente o null si no existe es ___:",
        "options": [
          "find",
          "filter",
          "search",
          "get"
        ],
        "correctOption": "find",
        "explanation": "Si no hay coincidencias, retorna null limpiamente sin excepciones.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Buscar con find\":",
        "tokens": [
          "val",
          "admin",
          "=",
          "usuarios",
          ".",
          "find",
          "{",
          "it.esAdmin",
          "}"
        ],
        "solution": [
          "val",
          "admin",
          "=",
          "usuarios",
          ".",
          "find",
          "{",
          "it.esAdmin",
          "}"
        ],
        "explanation": "find se detiene en la primera coincidencia ahorrando tiempo. Si quieres el último usa findLast.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Buscar con find\":",
        "codeSnippet": [
          "val n = listOf(1, 2, 3)",
          "val r: Int = n.find { it == 5 } // Error: tipo devuelto es Int?, no Int"
        ],
        "bugLineIndex": 1,
        "explanation": "Recuerda que find siempre devuelve un tipo anulable (T?) porque el elemento podría no existir.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Buscar con find\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Buscar con find",
            "right": "find devuelve el primer elemento que satisface el predicado."
          },
          {
            "left": "Principio 2",
            "right": "Si no hay coincidencias, retorna null limpiamente sin excepciones."
          },
          {
            "left": "Principio 3",
            "right": "Es ideal para recuperar entidades por clave o condición única."
          },
          {
            "left": "Buena práctica",
            "right": "find se detiene en la primera coincidencia ahorrando..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l04-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Buscar con find\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Buscar con find\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "find se detiene en la primera coincidencia ahorrando tiempo. Si quieres el último usa findLast.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Buscar con find\"?",
        "code": "fun main() {\n    val codigos = listOf(\"USR-10\", \"ADM-01\", \"USR-25\", \"ADM-02\")\n    val primerAdmin = codigos.find { it.startsWith(\"ADM\") }\n    val primerInvitado = codigos.find { it.startsWith(\"GUEST\") }\n    println(\"Primer admin hallado: $primerAdmin\")",
        "options": [
          "Primer admin hallado: ADM-01",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Primer admin hallado: ADM-01",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Buscar con find\":",
        "tokens": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Buscar con find\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Recuerda que find siempre devuelve un tipo anulable (T?) porque el elemento podría no existir.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Buscar con find\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Encuentra el primer elemento que cumpla un criterio ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Recuerda que find siempre devuelve un tipo anulable ..."
          },
          {
            "left": "Recomendación",
            "right": "find se detiene en la primera coincidencia ahorrando..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Código fuente y compilador Kotlin"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "kotlin-u11-l05",
    "path": "kotlin",
    "unit": 11,
    "level": 5,
    "title": "5. Comprobar con any y all",
    "description": "Verifica rápidamente hipótesis lógicas sobre colecciones enteras con any() (al menos uno) y all() (todos sin excepción).",
    "exercises": [
      {
        "id": "kt-u11-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Comprobar con any y all\"?",
        "code": "val lista = listOf(2, 4, 6, 7)\nprintln(lista.all { it % 2 == 0 })",
        "options": [
          "false",
          "true",
          "7",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "any { condicion } devuelve true si al menos un elemento cumple.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l05-e02",
        "type": "code_cloze",
        "prompt": "La función que comprueba si al menos un elemento de la colección cumple una condición es ___:",
        "codeWithBlank": "La función que comprueba si al menos un elemento de la colección cumple una condición es ___:",
        "options": [
          "any",
          "all",
          "some",
          "one"
        ],
        "correctOption": "any",
        "explanation": "all { condicion } devuelve true solo si todos los elementos cumplen.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Comprobar con any y all\":",
        "tokens": [
          "val",
          "hayInactivos",
          "=",
          "usuarios",
          ".",
          "any",
          "{",
          "!it.activo",
          "}"
        ],
        "solution": [
          "val",
          "hayInactivos",
          "=",
          "usuarios",
          ".",
          "any",
          "{",
          "!it.activo",
          "}"
        ],
        "explanation": "any() sin argumentos comprueba si la colección tiene al menos un elemento (no está vacía).",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Comprobar con any y all\":",
        "codeSnippet": [
          "val l = listOf(10, 20)",
          "if (l.all) { // Faltan llaves de la lambda o condición",
          "    println(\"Ok\")",
          "}"
        ],
        "bugLineIndex": 1,
        "explanation": "all() sobre una lista vacía devuelve true por vacuidad lógica matemática.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Comprobar con any y all\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Comprobar con any y all",
            "right": "any { condicion } devuelve true si al menos un elemento cumple."
          },
          {
            "left": "Principio 2",
            "right": "all { condicion } devuelve true solo si todos los elementos cumplen."
          },
          {
            "left": "Principio 3",
            "right": "none { condicion } devuelve true si ningún elemento cumple."
          },
          {
            "left": "Buena práctica",
            "right": "any() sin argumentos comprueba si la colección tiene..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l05-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Comprobar con any y all\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Comprobar con any y all\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "any() sin argumentos comprueba si la colección tiene al menos un elemento (no está vacía).",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Comprobar con any y all\"?",
        "code": "fun main() {\n    val edades = listOf(19, 24, 18, 30)\n    val todosAdultos = edades.all { it >= 18 }\n    val hayMayoresDe25 = edades.any { it > 25 }\n    val hayMenores = edades.any { it < 18 }",
        "options": [
          "¿Todos adultos? true | ¿Alguie",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: ¿Todos adultos? true | ¿Alguie",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Comprobar con any y all\":",
        "tokens": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Comprobar con any y all\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "all() sobre una lista vacía devuelve true por vacuidad lógica matemática.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Comprobar con any y all\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Verifica rápidamente hipótesis lógicas sobre colecci..."
          },
          {
            "left": "Riesgo crítico",
            "right": "all() sobre una lista vacía devuelve true por vacuid..."
          },
          {
            "left": "Recomendación",
            "right": "any() sin argumentos comprueba si la colección tiene..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Código fuente y compilador Kotlin"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "kotlin-u11-l06",
    "path": "kotlin",
    "unit": 11,
    "level": 6,
    "title": "6. Ordenar con sortedBy",
    "description": "Ordena colecciones de objetos por cualquiera de sus propiedades de forma declarativa e inmutable.",
    "exercises": [
      {
        "id": "kt-u11-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Ordenar con sortedBy\"?",
        "code": "val nums = listOf(5, 2, 8, 1)\nval ord = nums.sorted()\nprintln(ord[0])",
        "options": [
          "1",
          "5",
          "8",
          "2"
        ],
        "correctOptionIndex": 0,
        "explanation": "sortedBy { it.propiedad } ordena ascendentemente según el selector.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l06-e02",
        "type": "code_cloze",
        "prompt": "Para ordenar una colección de objetos de menor a mayor por una propiedad usamos ___ { it.propiedad }:",
        "codeWithBlank": "Para ordenar una colección de objetos de menor a mayor por una propiedad usamos ___ { it.propiedad }:",
        "options": [
          "sortedBy",
          "orderBy",
          "sortBy",
          "sort"
        ],
        "correctOption": "sortedBy",
        "explanation": "sortedByDescending { it.propiedad } ordena de mayor a menor.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Ordenar con sortedBy\":",
        "tokens": [
          "val",
          "ranking",
          "=",
          "jugadores",
          ".",
          "sortedByDescending",
          "{",
          "it.puntos",
          "}"
        ],
        "solution": [
          "val",
          "ranking",
          "=",
          "jugadores",
          ".",
          "sortedByDescending",
          "{",
          "it.puntos",
          "}"
        ],
        "explanation": "Para ordenar números o cadenas simples directamente usa `.sorted()` o `.sortedDescending()`.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Ordenar con sortedBy\":",
        "codeSnippet": [
          "val l = listOf(3, 1, 2)",
          "l.sort() // Error: sort() solo existe en colecciones mutables"
        ],
        "bugLineIndex": 1,
        "explanation": "Recuerda que sortedBy devuelve una NUEVA lista ordenada; no muta la lista original.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Ordenar con sortedBy\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Ordenar con sortedBy",
            "right": "sortedBy { it.propiedad } ordena ascendentemente según el selector."
          },
          {
            "left": "Principio 2",
            "right": "sortedByDescending { it.propiedad } ordena de mayor a menor."
          },
          {
            "left": "Principio 3",
            "right": "Preserva la inmutabilidad de la colección origen."
          },
          {
            "left": "Buena práctica",
            "right": "Para ordenar números o cadenas simples directamente ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l06-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Ordenar con sortedBy\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Ordenar con sortedBy\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Para ordenar números o cadenas simples directamente usa `.sorted()` o `.sortedDescending()`.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Ordenar con sortedBy\"?",
        "code": "data class Estudiante(val nombre: String, val nota: Double)\n\nfun main() {\n    val aula = listOf(\n        Estudiante(\"Carlos\", 7.5),",
        "options": [
          "Ascendente:  [Carlos, Beto, An",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Ascendente:  [Carlos, Beto, An",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Ordenar con sortedBy\":",
        "tokens": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Ordenar con sortedBy\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Recuerda que sortedBy devuelve una NUEVA lista ordenada; no muta la lista original.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Ordenar con sortedBy\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Ordena colecciones de objetos por cualquiera de sus ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Recuerda que sortedBy devuelve una NUEVA lista orden..."
          },
          {
            "left": "Recomendación",
            "right": "Para ordenar números o cadenas simples directamente ..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Código fuente y compilador Kotlin"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  },
  {
    "id": "kotlin-u11-l07",
    "path": "kotlin",
    "unit": 11,
    "level": 7,
    "title": "7. Resumir con count y sumOf",
    "description": "Calcula resúmenes estadísticos en una sola línea: cuenta elementos que cumplen condiciones y suma valores numéricos.",
    "exercises": [
      {
        "id": "kt-u11-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Resumir con count y sumOf\"?",
        "code": "val valores = listOf(10, 20, 30)\nval suma = valores.sumOf { it }\nprintln(suma)",
        "options": [
          "60",
          "30",
          "102030",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "count { condicion } cuenta cuántos elementos satisfacen el predicado.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l07-e02",
        "type": "code_cloze",
        "prompt": "La función para sumar los valores numéricos producidos por una lambda es ___:",
        "codeWithBlank": "La función para sumar los valores numéricos producidos por una lambda es ___:",
        "options": [
          "sumOf",
          "sum",
          "total",
          "aggregate"
        ],
        "correctOption": "sumOf",
        "explanation": "sumOf { it.valorNumerico } calcula la sumatoria total del selector.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Resumir con count y sumOf\":",
        "tokens": [
          "val",
          "total",
          "=",
          "pedidos",
          ".",
          "sumOf",
          "{",
          "it.total",
          "}"
        ],
        "solution": [
          "val",
          "total",
          "=",
          "pedidos",
          ".",
          "sumOf",
          "{",
          "it.total",
          "}"
        ],
        "explanation": "sumOf es seguro y eficiente para Int, Double, Long y BigDecimal.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Resumir con count y sumOf\":",
        "codeSnippet": [
          "val articulos = listOf(10, 20)",
          "val c = articulos.count(10) // Error: count recibe una lambda con condición"
        ],
        "bugLineIndex": 1,
        "explanation": "Usar count() sin llaves devuelve el tamaño total; para filtrar debes pasar la lambda: count { it.rebajado }.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Resumir con count y sumOf\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Resumir con count y sumOf",
            "right": "count { condicion } cuenta cuántos elementos satisfacen el predicado."
          },
          {
            "left": "Principio 2",
            "right": "sumOf { it.valorNumerico } calcula la sumatoria total del selector."
          },
          {
            "left": "Principio 3",
            "right": "Reemplaza bucles manuales con acumuladores en una sintaxis limpia."
          },
          {
            "left": "Buena práctica",
            "right": "sumOf es seguro y eficiente para Int, Double, Long y..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l07-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Resumir con count y sumOf\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Resumir con count y sumOf\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "sumOf es seguro y eficiente para Int, Double, Long y BigDecimal.",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Resumir con count y sumOf\"?",
        "code": "data class Articulo(val nombre: String, val precio: Double, val rebajado: Boolean)\n\nfun main() {\n    val carrito = listOf(\n        Articulo(\"Teclado\", 45.0, true),",
        "options": [
          "Total a pagar: $80.0 | Artícul",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Total a pagar: $80.0 | Artícul",
        "xpReward": 10
      },
      {
        "id": "kt-u11-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Resumir con count y sumOf\":",
        "tokens": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "verificado",
          "=",
          "dato",
          ".",
          "toString",
          "(",
          ")"
        ],
        "explanation": "Orden gramatical correcto respetando las convenciones del lenguaje.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Resumir con count y sumOf\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Usar count() sin llaves devuelve el tamaño total; para filtrar debes pasar la lambda: count { it.rebajado }.",
        "xpReward": 15
      },
      {
        "id": "kt-u11-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Resumir con count y sumOf\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Calcula resúmenes estadísticos en una sola línea: cu..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar count() sin llaves devuelve el tamaño total; pa..."
          },
          {
            "left": "Recomendación",
            "right": "sumOf es seguro y eficiente para Int, Double, Long y..."
          },
          {
            "left": "Ámbito de aplicación",
            "right": "Código fuente y compilador Kotlin"
          }
        ],
        "explanation": "Consolidación de buenas prácticas y prevención de errores críticos en el código.",
        "xpReward": 15
      }
    ]
  }
];
