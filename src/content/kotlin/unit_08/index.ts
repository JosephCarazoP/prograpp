import { Lesson } from '../../../types/lesson';

export const KOTLIN_UNIT_08_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u08-l01",
    "path": "kotlin",
    "unit": 8,
    "level": 1,
    "title": "1. Longitud y acceso a caracteres",
    "description": "Accede a caracteres individuales mediante corchetes [indice] y obtén la cantidad total de caracteres con .length.",
    "exercises": [
      {
        "id": "kt-u08-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Longitud y acceso a caracteres\"?",
        "code": "val palabra = \"Android\"\nprintln(palabra[0])",
        "options": [
          "A",
          "n",
          "Android",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "length devuelve la cantidad total de caracteres en la cadena.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l01-e02",
        "type": "code_cloze",
        "prompt": "Para obtener la cantidad de caracteres de un String en Kotlin usamos la propiedad ___:",
        "codeWithBlank": "Para obtener la cantidad de caracteres de un String en Kotlin usamos la propiedad ___:",
        "options": [
          "length",
          "size",
          "count()",
          "len"
        ],
        "correctOption": "length",
        "explanation": "texto[i] devuelve el Char en la posición i (base 0).",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Longitud y acceso a caracteres\":",
        "tokens": [
          "val",
          "primero",
          "=",
          "nombre",
          "[",
          "0",
          "]"
        ],
        "solution": [
          "val",
          "primero",
          "=",
          "nombre",
          "[",
          "0",
          "]"
        ],
        "explanation": "También puedes usar las funciones idiomáticas de Kotlin: .first() y .last().",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Longitud y acceso a caracteres\":",
        "codeSnippet": [
          "val s = \"Dev\"",
          "val c = s[3] // Error: índice 3 fuera de rango (0 a 2)"
        ],
        "bugLineIndex": 1,
        "explanation": "Los índices inician en 0: acceder al índice `length` lanzará StringIndexOutOfBoundsException.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Longitud y acceso a caracteres\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Longitud y acceso a caracteres",
            "right": "length devuelve la cantidad total de caracteres en la cadena."
          },
          {
            "left": "Principio 2",
            "right": "texto[i] devuelve el Char en la posición i (base 0)."
          },
          {
            "left": "Las cadenas en Kotlin son inmutables",
            "right": "no puedes hacer texto[0] = 'k'."
          },
          {
            "left": "Buena práctica",
            "right": "También puedes usar las funciones idiomáticas de Kot..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l01-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Longitud y acceso a caracteres\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Longitud y acceso a caracteres\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "También puedes usar las funciones idiomáticas de Kotlin: .first() y .last().",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Longitud y acceso a caracteres\"?",
        "code": "fun main() {\n    val lenguaje = \"Kotlin\"\n    println(\"Palabra: $lenguaje\")\n    println(\"Total caracteres: ${lenguaje.length}\")\n    println(\"Primer carácter [0]: ${lenguaje[0]}\")",
        "options": [
          "Palabra: Kotlin",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Palabra: Kotlin",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Longitud y acceso a caracteres\":",
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
        "id": "kt-u08-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Longitud y acceso a caracteres\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Los índices inician en 0: acceder al índice `length` lanzará StringIndexOutOfBoundsException.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Longitud y acceso a caracteres\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Accede a caracteres individuales mediante corchetes ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Los índices inician en 0: acceder al índice `length`..."
          },
          {
            "left": "Recomendación",
            "right": "También puedes usar las funciones idiomáticas de Kot..."
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
    "id": "kotlin-u08-l02",
    "path": "kotlin",
    "unit": 8,
    "level": 2,
    "title": "2. Texto vacío frente a texto con espacios",
    "description": "Distingue entre una cadena vacía de longitud cero con isEmpty() frente a una cadena que solo contiene espacios en blanco con isBlank().",
    "exercises": [
      {
        "id": "kt-u08-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Texto vacío frente a texto con espacios\"?",
        "code": "val txt = \"  \"\nprintln(txt.isBlank())",
        "options": [
          "true",
          "false",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "isEmpty() devuelve true únicamente si length == 0.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l02-e02",
        "type": "code_cloze",
        "prompt": "Para comprobar si un texto está vacío o solo contiene espacios en blanco usamos ___():",
        "codeWithBlank": "Para comprobar si un texto está vacío o solo contiene espacios en blanco usamos ___():",
        "options": [
          "isBlank()",
          "isEmpty()",
          "isSpace()",
          "isClear()"
        ],
        "correctOption": "isBlank()",
        "explanation": "isBlank() devuelve true si está vacío O solo contiene espacios, tabuladores o saltos de línea.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Texto vacío frente a texto con espacios\":",
        "tokens": [
          "if",
          "(",
          "nombre.isNotBlank()",
          ")",
          "{",
          "guardar()",
          "}"
        ],
        "solution": [
          "if",
          "(",
          "nombre.isNotBlank()",
          ")",
          "{",
          "guardar()",
          "}"
        ],
        "explanation": "Para validar formularios de registro donde el usuario podría pulsar solo la barra espaciadora, usa isBlank().",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Texto vacío frente a texto con espacios\":",
        "codeSnippet": [
          "val t = \" \"",
          "if (t.isEmpty()) { // No detecta los espacios en blanco",
          "    println(\"Vacio\")",
          "}"
        ],
        "bugLineIndex": 1,
        "explanation": "Validar solo con isEmpty() permitirá que un usuario guarde nombres como \"   \" de 3 espacios.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Texto vacío frente a texto con espacios\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Texto vacío frente a texto con espacios",
            "right": "isEmpty() devuelve true únicamente si length == 0."
          },
          {
            "left": "Principio 2",
            "right": "isBlank() devuelve true si está vacío O solo contiene espacios, tabuladores o saltos de línea."
          },
          {
            "left": "Principio 3",
            "right": "isNotBlank() e isNotEmpty() son sus contrapartes positivas directas."
          },
          {
            "left": "Buena práctica",
            "right": "Para validar formularios de registro donde el usuari..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l02-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Texto vacío frente a texto con espacios\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Texto vacío frente a texto con espacios\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Para validar formularios de registro donde el usuario podría pulsar solo la barra espaciadora, usa isBlank().",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Texto vacío frente a texto con espacios\"?",
        "code": "fun main() {\n    val textoVacio = \"\"\n    val textoEspacios = \"   \"\n    println(\"textoVacio.isEmpty(): ${textoVacio.isEmpty()}\")\n    println(\"textoEspacios.isEmpty(): ${textoEspacios.isEmpty()}\")",
        "options": [
          "textoVacio.isEmpty(): true",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: textoVacio.isEmpty(): true",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Texto vacío frente a texto con espacios\":",
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
        "id": "kt-u08-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Texto vacío frente a texto con espacios\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Validar solo con isEmpty() permitirá que un usuario guarde nombres como \"   \" de 3 espacios.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Texto vacío frente a texto con espacios\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Distingue entre una cadena vacía de longitud cero co..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Validar solo con isEmpty() permitirá que un usuario ..."
          },
          {
            "left": "Recomendación",
            "right": "Para validar formularios de registro donde el usuari..."
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
    "id": "kotlin-u08-l03",
    "path": "kotlin",
    "unit": 8,
    "level": 3,
    "title": "3. Eliminar espacios con trim()",
    "description": "Limpia entradas de usuario eliminando espacios en blanco innecesarios al inicio y al final de la cadena.",
    "exercises": [
      {
        "id": "kt-u08-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Eliminar espacios con trim()\"?",
        "code": "val email = \" dev@kt.org \"\nprintln(email.trim().length)",
        "options": [
          "9",
          "11",
          "10",
          "12"
        ],
        "correctOptionIndex": 0,
        "explanation": "trim() retira espacios, tabs y retornos de carro iniciales y finales.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l03-e02",
        "type": "code_cloze",
        "prompt": "La función para retirar espacios en blanco al inicio y al final de una cadena es ___():",
        "codeWithBlank": "La función para retirar espacios en blanco al inicio y al final de una cadena es ___():",
        "options": [
          "trim()",
          "clean()",
          "strip()",
          "cut()"
        ],
        "correctOption": "trim()",
        "explanation": "trimStart() limpia solo el inicio y trimEnd() solo el final.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Eliminar espacios con trim()\":",
        "tokens": [
          "val",
          "emailLimpio",
          "=",
          "rawEmail",
          ".",
          "trim",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "emailLimpio",
          "=",
          "rawEmail",
          ".",
          "trim",
          "(",
          ")"
        ],
        "explanation": "trim() no elimina los espacios internos entre palabras (ej. \"Juan  Pérez\" conserva sus espacios).",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Eliminar espacios con trim()\":",
        "codeSnippet": [
          "var txt = \"  hola  \"",
          "txt.trim() // Error: no se guarda el resultado, txt sigue con espacios",
          "println(txt)"
        ],
        "bugLineIndex": 1,
        "explanation": "Recuerda que trim() no modifica la cadena original (es inmutable); devuelve una NUEVA cadena limpia.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Eliminar espacios con trim()\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Eliminar espacios con trim()",
            "right": "trim() retira espacios, tabs y retornos de carro iniciales y finales."
          },
          {
            "left": "Principio 2",
            "right": "trimStart() limpia solo el inicio y trimEnd() solo el final."
          },
          {
            "left": "Principio 3",
            "right": "Paso obligatorio antes de validar emails, nombres o contraseñas."
          },
          {
            "left": "Buena práctica",
            "right": "trim() no elimina los espacios internos entre palabr..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l03-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Eliminar espacios con trim()\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Eliminar espacios con trim()\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "trim() no elimina los espacios internos entre palabras (ej. \"Juan  Pérez\" conserva sus espacios).",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Eliminar espacios con trim()\"?",
        "code": "fun main() {\n    val inputUsuario = \"   sofia@empresa.com   \"\n    val limpio = inputUsuario.trim()\n    println(\"Original: '$inputUsuario'\")\n    println(\"Limpio:   '$limpio'\")",
        "options": [
          "Original: '   sofia@empresa.co",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Original: '   sofia@empresa.co",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Eliminar espacios con trim()\":",
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
        "id": "kt-u08-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Eliminar espacios con trim()\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Recuerda que trim() no modifica la cadena original (es inmutable); devuelve una NUEVA cadena limpia.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Eliminar espacios con trim()\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Limpia entradas de usuario eliminando espacios en bl..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Recuerda que trim() no modifica la cadena original (..."
          },
          {
            "left": "Recomendación",
            "right": "trim() no elimina los espacios internos entre palabr..."
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
    "id": "kotlin-u08-l04",
    "path": "kotlin",
    "unit": 8,
    "level": 4,
    "title": "4. Mayúsculas y minúsculas",
    "description": "Normaliza cadenas de texto para comparaciones y búsquedas mediante uppercase() y lowercase().",
    "exercises": [
      {
        "id": "kt-u08-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Mayúsculas y minúsculas\"?",
        "code": "val tag = \"Beta\"\nprintln(tag.uppercase())",
        "options": [
          "BETA",
          "beta",
          "Beta",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "uppercase() transforma todos los caracteres a su versión en mayúscula.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l04-e02",
        "type": "code_cloze",
        "prompt": "Para convertir una cadena completa a minúsculas en Kotlin moderno usamos ___():",
        "codeWithBlank": "Para convertir una cadena completa a minúsculas en Kotlin moderno usamos ___():",
        "options": [
          "lowercase()",
          "toLowerCase()",
          "toLower()",
          "down()"
        ],
        "correctOption": "lowercase()",
        "explanation": "lowercase() transforma todos los caracteres a minúscula.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Mayúsculas y minúsculas\":",
        "tokens": [
          "val",
          "normalizado",
          "=",
          "texto",
          ".",
          "lowercase",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "normalizado",
          "=",
          "texto",
          ".",
          "lowercase",
          "(",
          ")"
        ],
        "explanation": "En Kotlin moderno toUpperCase() y toLowerCase() están obsoletas; usa uppercase() y lowercase().",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Mayúsculas y minúsculas\":",
        "codeSnippet": [
          "val s = \"HOLA\"",
          "val r = s.toLowerCase() // Advertencia: función obsoleta, usar lowercase()"
        ],
        "bugLineIndex": 1,
        "explanation": "Comparar \"Admin\" == \"admin\" devolverá false porque las mayúsculas tienen códigos numéricos distintos.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Mayúsculas y minúsculas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Mayúsculas y minúsculas",
            "right": "uppercase() transforma todos los caracteres a su versión en mayúscula."
          },
          {
            "left": "Principio 2",
            "right": "lowercase() transforma todos los caracteres a minúscula."
          },
          {
            "left": "Principio 3",
            "right": "Esencial para búsquedas que no distingan entre mayúsculas y minúsculas."
          },
          {
            "left": "Buena práctica",
            "right": "En Kotlin moderno toUpperCase() y toLowerCase() está..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l04-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Mayúsculas y minúsculas\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Mayúsculas y minúsculas\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "En Kotlin moderno toUpperCase() y toLowerCase() están obsoletas; usa uppercase() y lowercase().",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Mayúsculas y minúsculas\"?",
        "code": "fun main() {\n    val rol = \"Administrador\"\n    println(\"Mayúsculas: ${rol.uppercase()}\")\n    println(\"Minúsculas: ${rol.lowercase()}\")\n    val comando = \"SALIR\"",
        "options": [
          "Mayúsculas: ADMINISTRADOR",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Mayúsculas: ADMINISTRADOR",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Mayúsculas y minúsculas\":",
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
        "id": "kt-u08-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Mayúsculas y minúsculas\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Comparar \"Admin\" == \"admin\" devolverá false porque las mayúsculas tienen códigos numéricos distintos.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Mayúsculas y minúsculas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Normaliza cadenas de texto para comparaciones y búsq..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Comparar \"Admin\" == \"admin\" devolverá false porque l..."
          },
          {
            "left": "Recomendación",
            "right": "En Kotlin moderno toUpperCase() y toLowerCase() está..."
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
    "id": "kotlin-u08-l05",
    "path": "kotlin",
    "unit": 8,
    "level": 5,
    "title": "5. contains(), startsWith() y endsWith()",
    "description": "Inspecciona el contenido de cadenas buscando subtextos, prefijos de protocolo o extensiones de archivos.",
    "exercises": [
      {
        "id": "kt-u08-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"contains(), startsWith() y endsWith()\"?",
        "code": "val archivo = \"reporte_final.pdf\"\nprintln(archivo.endsWith(\".pdf\"))",
        "options": [
          "true",
          "false",
          "pdf",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "startsWith(\"prefijo\") verifica el inicio de la cadena.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l05-e02",
        "type": "code_cloze",
        "prompt": "Para verificar si una cadena contiene una palabra ignorando mayúsculas usamos contains(\"palabra\", ___ = true):",
        "codeWithBlank": "Para verificar si una cadena contiene una palabra ignorando mayúsculas usamos contains(\"palabra\", ___ = true):",
        "options": [
          "ignoreCase",
          "caseSensitive",
          "allCase",
          "ignore"
        ],
        "correctOption": "ignoreCase",
        "explanation": "endsWith(\"sufijo\") verifica la terminación.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"contains(), startsWith() y endsWith()\":",
        "tokens": [
          "if",
          "(",
          "url.startsWith(\"https\")",
          ")",
          "{",
          "}"
        ],
        "solution": [
          "if",
          "(",
          "url.startsWith(\"https\")",
          ")",
          "{",
          "}"
        ],
        "explanation": "Puedes pasar el parámetro `ignoreCase = true` para ignorar diferencias entre mayúsculas y minúsculas.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"contains(), startsWith() y endsWith()\":",
        "codeSnippet": [
          "val f = \"doc.txt\"",
          "if (f.endsWith) { // Faltan paréntesis y argumento",
          "    println(\"Ok\")",
          "}"
        ],
        "bugLineIndex": 1,
        "explanation": "contains(\"Kotlin\") devolverá false si la palabra es \"kotlin\" a menos que uses `ignoreCase = true`.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"contains(), startsWith() y endsWith()\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "contains(), startsWith() y endsWith()",
            "right": "startsWith(\"prefijo\") verifica el inicio de la cadena."
          },
          {
            "left": "Principio 2",
            "right": "endsWith(\"sufijo\") verifica la terminación."
          },
          {
            "left": "Principio 3",
            "right": "contains(\"subtexto\") busca coincidencias en cualquier posición de la cadena."
          },
          {
            "left": "Buena práctica",
            "right": "Puedes pasar el parámetro `ignoreCase = true` para i..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l05-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"contains(), startsWith() y endsWith()\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"contains(), startsWith() y endsWith()\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Puedes pasar el parámetro `ignoreCase = true` para ignorar diferencias entre mayúsculas y minúsculas.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"contains(), startsWith() y endsWith()\"?",
        "code": "fun main() {\n    val url = \"https://kotlinlang.org/docs/home.html\"\n    val esSegura = url.startsWith(\"https://\")\n    val esHtml = url.endsWith(\".html\")\n    val tieneDocs = url.contains(\"docs\")",
        "options": [
          "¿Segura? true | ¿HTML? true |",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: ¿Segura? true | ¿HTML? true |",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"contains(), startsWith() y endsWith()\":",
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
        "id": "kt-u08-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"contains(), startsWith() y endsWith()\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "contains(\"Kotlin\") devolverá false si la palabra es \"kotlin\" a menos que uses `ignoreCase = true`.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"contains(), startsWith() y endsWith()\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Inspecciona el contenido de cadenas buscando subtext..."
          },
          {
            "left": "Riesgo crítico",
            "right": "contains(\"Kotlin\") devolverá false si la palabra es ..."
          },
          {
            "left": "Recomendación",
            "right": "Puedes pasar el parámetro `ignoreCase = true` para i..."
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
    "id": "kotlin-u08-l06",
    "path": "kotlin",
    "unit": 8,
    "level": 6,
    "title": "6. Dividir y unir texto",
    "description": "Divide cadenas delimitadas con split() y vuelve a ensamblarlas con formatos limpios usando joinToString().",
    "exercises": [
      {
        "id": "kt-u08-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Dividir y unir texto\"?",
        "code": "val datos = \"1;2;3\"\nval partes = datos.split(\";\")\nprintln(partes.size)",
        "options": [
          "3",
          "1",
          "5",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "split(delimitador) trocea la cadena en elementos de una lista.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l06-e02",
        "type": "code_cloze",
        "prompt": "La función que trocea una cadena en partes según un delimitador es ___():",
        "codeWithBlank": "La función que trocea una cadena en partes según un delimitador es ___():",
        "options": [
          "split()",
          "divide()",
          "slice()",
          "part()"
        ],
        "correctOption": "split()",
        "explanation": "joinToString() une colecciones en una cadena con separador configurable.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Dividir y unir texto\":",
        "tokens": [
          "val",
          "palabras",
          "=",
          "oracion",
          ".",
          "split",
          "(",
          "\" \"",
          ")"
        ],
        "solution": [
          "val",
          "palabras",
          "=",
          "oracion",
          ".",
          "split",
          "(",
          "\" \"",
          ")"
        ],
        "explanation": "split() es fundamental para leer archivos CSV o líneas de comandos con múltiples argumentos.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Dividir y unir texto\":",
        "codeSnippet": [
          "val s = \"a,b,c\"",
          "val lista: String = s.split(\",\") // Error: split devuelve List<String>"
        ],
        "bugLineIndex": 1,
        "explanation": "Olvidar que split() devuelve una lista de cadenas (List<String>), no un único String.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Dividir y unir texto\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Dividir y unir texto",
            "right": "split(delimitador) trocea la cadena en elementos de una lista."
          },
          {
            "left": "Principio 2",
            "right": "joinToString() une colecciones en una cadena con separador configurable."
          },
          {
            "left": "Principio 3",
            "right": "Permite añadir prefijos y sufijos decorativos en una sola instrucción."
          },
          {
            "left": "Buena práctica",
            "right": "split() es fundamental para leer archivos CSV o líne..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l06-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Dividir y unir texto\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Dividir y unir texto\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "split() es fundamental para leer archivos CSV o líneas de comandos con múltiples argumentos.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Dividir y unir texto\"?",
        "code": "fun main() {\n    val csv = \"Kotlin,Java,Rust,Python\"\n    val lenguajes: List<String> = csv.split(\",\")\n    println(\"Lista obtenida: $lenguajes\")\n    val reconstruido = lenguajes.joinToString(separator = \" • \", prefix = \"[ \", postfix = \" ]\")",
        "options": [
          "Lista obtenida: [Kotlin, Java,",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Lista obtenida: [Kotlin, Java,",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Dividir y unir texto\":",
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
        "id": "kt-u08-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Dividir y unir texto\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Olvidar que split() devuelve una lista de cadenas (List<String>), no un único String.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Dividir y unir texto\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Divide cadenas delimitadas con split() y vuelve a en..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Olvidar que split() devuelve una lista de cadenas (L..."
          },
          {
            "left": "Recomendación",
            "right": "split() es fundamental para leer archivos CSV o líne..."
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
    "id": "kotlin-u08-l07",
    "path": "kotlin",
    "unit": 8,
    "level": 7,
    "title": "7. Comparación y validación de cadenas",
    "description": "Aprende a validar cadenas con seguridad usando equals(..., ignoreCase = true) y comprobaciones de formato.",
    "exercises": [
      {
        "id": "kt-u08-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Comparación y validación de cadenas\"?",
        "code": "val a = \"Kotlin\"\nval b = \"kotlin\"\nprintln(a.equals(b, ignoreCase = true))",
        "options": [
          "true",
          "false",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "== compara el contenido textual de dos cadenas de forma segura.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l07-e02",
        "type": "code_cloze",
        "prompt": "Para comparar dos cadenas ignorando diferencias entre mayúsculas y minúsculas pasamos ___ = true a equals:",
        "codeWithBlank": "Para comparar dos cadenas ignorando diferencias entre mayúsculas y minúsculas pasamos ___ = true a equals:",
        "options": [
          "ignoreCase",
          "noCase",
          "allCase",
          "insensitive"
        ],
        "correctOption": "ignoreCase",
        "explanation": "equals(otro, ignoreCase = true) compara sin importar mayúsculas.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Comparación y validación de cadenas\":",
        "tokens": [
          "if",
          "(",
          "s1.equals(s2, ignoreCase = true)",
          ")",
          "{",
          "}"
        ],
        "solution": [
          "if",
          "(",
          "s1.equals(s2, ignoreCase = true)",
          ")",
          "{",
          "}"
        ],
        "explanation": "Para comparar cadenas en Kotlin usa siempre == o .equals(); en Kotlin == ya compara contenido estructural.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Comparación y validación de cadenas\":",
        "codeSnippet": [
          "val a = \"hola\"",
          "val b = \"HOLA\"",
          "if (a == b) { // Será false por ser case-sensitive",
          "    println(\"Iguales\")",
          "}"
        ],
        "bugLineIndex": 2,
        "explanation": "Usar === compara si ambas cadenas apuntan exactamente a la misma posición física de memoria, lo cual suele ser indeseado.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Comparación y validación de cadenas\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Comparación y validación de cadenas",
            "right": "== compara el contenido textual de dos cadenas de forma segura."
          },
          {
            "left": "Principio 2",
            "right": "equals(otro, ignoreCase = true) compara sin importar mayúsculas."
          },
          {
            "left": "Principio 3",
            "right": "Valida que el texto cumpla con longitud mínima antes de procesar."
          },
          {
            "left": "Buena práctica",
            "right": "Para comparar cadenas en Kotlin usa siempre == o .eq..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l07-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Comparación y validación de cadenas\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Comparación y validación de cadenas\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Para comparar cadenas en Kotlin usa siempre == o .equals(); en Kotlin == ya compara contenido estructural.",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Comparación y validación de cadenas\"?",
        "code": "fun main() {\n    val userRole = \"ADMIN\"\n    val requiredRole = \"admin\"\n    val tieneAcceso = userRole.equals(requiredRole, ignoreCase = true)\n    println(\"¿Acceso concedido? $tieneAcceso\")",
        "options": [
          "¿Acceso concedido? true",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: ¿Acceso concedido? true",
        "xpReward": 10
      },
      {
        "id": "kt-u08-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Comparación y validación de cadenas\":",
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
        "id": "kt-u08-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Comparación y validación de cadenas\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Usar === compara si ambas cadenas apuntan exactamente a la misma posición física de memoria, lo cual suele ser indeseado.",
        "xpReward": 15
      },
      {
        "id": "kt-u08-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Comparación y validación de cadenas\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a validar cadenas con seguridad usando equal..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar === compara si ambas cadenas apuntan exactament..."
          },
          {
            "left": "Recomendación",
            "right": "Para comparar cadenas en Kotlin usa siempre == o .eq..."
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
