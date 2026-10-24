import { Lesson } from '../../../types/lesson';

export const KOTLIN_UNIT_07_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u07-l01",
    "path": "kotlin",
    "unit": 7,
    "level": 1,
    "title": "1. Diferencia entre texto y valor numérico",
    "description": "Comprende la diferencia en memoria entre el texto \"100\" (cadena de caracteres) y el número 100 (valor binario operable matemáticamente).",
    "exercises": [
      {
        "id": "kt-u07-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Diferencia entre texto y valor numérico\"?",
        "code": "val a = \"10\"\nval b = 5\nprintln(a + b)",
        "options": [
          "105",
          "15",
          "Error",
          "510"
        ],
        "correctOptionIndex": 0,
        "explanation": "Un String es una secuencia de símbolos alfanuméricos.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l01-e02",
        "type": "code_cloze",
        "prompt": "Cuando aplicamos el operador + entre dos variables de tipo String ocurre una ___:",
        "codeWithBlank": "Cuando aplicamos el operador + entre dos variables de tipo String ocurre una ___:",
        "options": [
          "concatenación",
          "suma aritmética",
          "conversión",
          "división"
        ],
        "correctOption": "concatenación",
        "explanation": "Los tipos numéricos (Int, Double) permiten operaciones aritméticas directas.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Diferencia entre texto y valor numérico\":",
        "tokens": [
          "val",
          "total",
          "=",
          "precioTexto",
          ".",
          "toInt",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "total",
          "=",
          "precioTexto",
          ".",
          "toInt",
          "(",
          ")"
        ],
        "explanation": "Si intentas sumar dos textos con +, Kotlin los concatena pegándolos uno al lado del otro.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Diferencia entre texto y valor numérico\":",
        "codeSnippet": [ "val texto = \"100\"", "val suma = texto * 2", "println(\"Resultado listo\")" ],
        "bugLineIndex": 1,
        "explanation": "Asumir que lo que escribe el usuario en un formulario ya es un número: ¡siempre entra como String!",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Diferencia entre texto y valor numérico\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Diferencia entre texto y valor numérico",
            "right": "Un String es una secuencia de símbolos alfanuméricos."
          },
          {
            "left": "Principio 2",
            "right": "Los tipos numéricos (Int, Double) permiten operaciones aritméticas directas."
          },
          {
            "left": "Principio 3",
            "right": "Toda entrada del exterior debe convertirse antes de operar matemáticamente con ella."
          },
          {
            "left": "Buena práctica",
            "right": "Si intentas sumar dos textos con +, Kotlin los conca..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l01-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Diferencia entre texto y valor numérico\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Diferencia entre texto y valor numérico\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Si intentas sumar dos textos con +, Kotlin los concatena pegándolos uno al lado del otro.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Diferencia entre texto y valor numérico\"?",
        "code": "fun main() {\n    val textoA = \"50\"\n    val textoB = \"20\"\n    val concatenacion = textoA + textoB // \"5020\"\n    val numA = 50",
        "options": [
          "Texto + Texto: 5020 | Número +",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Texto + Texto: 5020 | Número +",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Diferencia entre texto y valor numérico\":",
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
        "id": "kt-u07-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Diferencia entre texto y valor numérico\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Asumir que lo que escribe el usuario en un formulario ya es un número: ¡siempre entra como String!",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Diferencia entre texto y valor numérico\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende la diferencia en memoria entre el texto \"1..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Asumir que lo que escribe el usuario en un formulari..."
          },
          {
            "left": "Recomendación",
            "right": "Si intentas sumar dos textos con +, Kotlin los conca..."
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
    "id": "kotlin-u07-l02",
    "path": "kotlin",
    "unit": 7,
    "level": 2,
    "title": "2. Conversiones con toIntOrNull() y toDoubleOrNull()",
    "description": "Convierte texto a números de forma segura sin provocar excepciones si el usuario escribe letras o símbolos inválidos.",
    "exercises": [
      {
        "id": "kt-u07-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Conversiones con toIntOrNull() y toDoubleOrNull()\"?",
        "code": "val texto = \"15x\"\nval num = texto.toIntOrNull()\nprintln(num)",
        "options": [
          "null",
          "15",
          "0",
          "Error de compilación"
        ],
        "correctOptionIndex": 0,
        "explanation": "toIntOrNull() devuelve el entero o null si la cadena no representa un número válido.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l02-e02",
        "type": "code_cloze",
        "prompt": "La función segura para convertir a entero que devuelve null ante errores es ___:",
        "codeWithBlank": "La función segura para convertir a entero que devuelve null ante errores es ___:",
        "options": [
          "toIntOrNull()",
          "toInt()",
          "parseInt()",
          "tryToInt()"
        ],
        "correctOption": "toIntOrNull()",
        "explanation": "Evita que tu aplicación sufra una caída por NumberFormatException.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Conversiones con toIntOrNull() y toDoubleOrNull()\":",
        "tokens": [
          "val",
          "edad",
          "=",
          "input",
          ".",
          "toIntOrNull",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "edad",
          "=",
          "input",
          ".",
          "toIntOrNull",
          "(",
          ")"
        ],
        "explanation": "Prefiere toIntOrNull() sobre toInt() cuando proceses datos ingresados por seres humanos.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Conversiones con toIntOrNull() y toDoubleOrNull()\":",
        "codeSnippet": [ "val entrada = \"cien\"", "val valor: Int = entrada.toIntOrNull()", "println(\"Resultado listo\")" ],
        "bugLineIndex": 1,
        "explanation": "Usar toInt() directamente provocará un cierre forzoso (crash) si el texto contiene espacios o letras.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Conversiones con toIntOrNull() y toDoubleOrNull()\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Conversiones con toIntOrNull() y toDoubleOrNull()",
            "right": "toIntOrNull() devuelve el entero o null si la cadena no representa un número válido."
          },
          {
            "left": "Principio 2",
            "right": "Evita que tu aplicación sufra una caída por NumberFormatException."
          },
          {
            "left": "Retorna un tipo anulable",
            "right": "Int? en lugar de Int."
          },
          {
            "left": "Buena práctica",
            "right": "Prefiere toIntOrNull() sobre toInt() cuando proceses..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l02-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Conversiones con toIntOrNull() y toDoubleOrNull()\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Conversiones con toIntOrNull() y toDoubleOrNull()\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Prefiere toIntOrNull() sobre toInt() cuando proceses datos ingresados por seres humanos.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Conversiones con toIntOrNull() y toDoubleOrNull()\"?",
        "code": "fun main() {\n    val entradaValida = \"42\"\n    val entradaInvalida = \"abc\"\n    val num1 = entradaValida.toIntOrNull()\n    val num2 = entradaInvalida.toIntOrNull()",
        "options": [
          "Conversión 1: 42 | Conversión",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Conversión 1: 42 | Conversión",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Conversiones con toIntOrNull() y toDoubleOrNull()\":",
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
        "id": "kt-u07-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Conversiones con toIntOrNull() y toDoubleOrNull()\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Usar toInt() directamente provocará un cierre forzoso (crash) si el texto contiene espacios o letras.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Conversiones con toIntOrNull() y toDoubleOrNull()\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Convierte texto a números de forma segura sin provoc..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar toInt() directamente provocará un cierre forzos..."
          },
          {
            "left": "Recomendación",
            "right": "Prefiere toIntOrNull() sobre toInt() cuando proceses..."
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
    "id": "kotlin-u07-l03",
    "path": "kotlin",
    "unit": 7,
    "level": 3,
    "title": "3. Significado de null",
    "description": "Comprende el concepto de nulidad: la ausencia total de un valor o referencia en una variable.",
    "exercises": [
      {
        "id": "kt-u07-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Significado de null\"?",
        "code": "var apodo: String? = null\nprintln(apodo == null)",
        "options": [
          "true",
          "false",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "null representa la ausencia deliberada de valor.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l03-e02",
        "type": "code_cloze",
        "prompt": "La palabra reservada que denota la ausencia de valor en Kotlin es ___:",
        "codeWithBlank": "La palabra reservada que denota la ausencia de valor en Kotlin es ___:",
        "options": [
          "null",
          "nil",
          "undefined",
          "void"
        ],
        "correctOption": "null",
        "explanation": "Tony Hoare denominó al puntero nulo su \"error de mil millones de dólares\".",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Significado de null\":",
        "tokens": [
          "var",
          "fotoPerfil:",
          "String?",
          "=",
          "null"
        ],
        "solution": [
          "var",
          "fotoPerfil:",
          "String?",
          "=",
          "null"
        ],
        "explanation": "null no es cero ni es una cadena vacía: es la indicación explícita de \"no hay dato\".",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Significado de null\":",
        "codeSnippet": [ "fun main() {", "    var nombre: String = null", "    println(\"Ejecutando...\")", "}" ],
        "bugLineIndex": 1,
        "explanation": "En lenguajes antiguos, intentar acceder a métodos de null causa el famoso NullPointerException (NPE).",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Significado de null\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Significado de null",
            "right": "null representa la ausencia deliberada de valor."
          },
          {
            "left": "Principio 2",
            "right": "Tony Hoare denominó al puntero nulo su \"error de mil millones de dólares\"."
          },
          {
            "left": "Principio 3",
            "right": "El sistema de tipos de Kotlin fue diseñado específicamente para erradicar el NullPointerException."
          },
          {
            "left": "Buena práctica",
            "right": "null no es cero ni es una cadena vacía: es la indica..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l03-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Significado de null\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Significado de null\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "null no es cero ni es una cadena vacía: es la indicación explícita de \"no hay dato\".",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Significado de null\"?",
        "code": "fun main() {\n    var telefonoOpcional: String? = null\n    println(\"Estado inicial: $telefonoOpcional\")\n    telefonoOpcional = \"+34 600 123 456\"\n    println(\"Actualizado: $telefonoOpcional\")",
        "options": [
          "Estado inicial: null",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Estado inicial: null",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Significado de null\":",
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
        "id": "kt-u07-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Significado de null\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "En lenguajes antiguos, intentar acceder a métodos de null causa el famoso NullPointerException (NPE).",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Significado de null\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende el concepto de nulidad: la ausencia total ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "En lenguajes antiguos, intentar acceder a métodos de..."
          },
          {
            "left": "Recomendación",
            "right": "null no es cero ni es una cadena vacía: es la indica..."
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
    "id": "kotlin-u07-l04",
    "path": "kotlin",
    "unit": 7,
    "level": 4,
    "title": "4. Tipos anulables: String?, Int?",
    "description": "Aprende la diferencia del sistema de tipos de Kotlin: tipos no anulables por defecto y tipos anulables con el sufijo ?.",
    "exercises": [
      {
        "id": "kt-u07-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Tipos anulables: String?, Int?\"?",
        "code": "val n: Int? = 10\nval x: Int = 5\nprintln((n ?: 0) + x)",
        "options": [
          "15",
          "10",
          "5",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "String garantiza al 100% que contiene texto real y nunca null.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l04-e02",
        "type": "code_cloze",
        "prompt": "Para declarar que una variable de tipo Double puede contener null agregamos el símbolo ___:",
        "codeWithBlank": "Para declarar que una variable de tipo Double puede contener null agregamos el símbolo ___:",
        "options": [
          "?",
          "!",
          "*",
          "#"
        ],
        "correctOption": "?",
        "explanation": "String? indica al compilador que la variable puede contener texto O ser null.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Tipos anulables: String?, Int?\":",
        "tokens": [
          "val",
          "correo:",
          "String?",
          "=",
          "null"
        ],
        "solution": [
          "val",
          "correo:",
          "String?",
          "=",
          "null"
        ],
        "explanation": "Por defecto NINGÚN tipo en Kotlin admite null. Debes añadir ? explícitamente si puede ser nulo.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Tipos anulables: String?, Int?\":",
        "codeSnippet": [ "fun main() {", "    val codigo: Int = null", "    println(\"Ejecutando...\")", "}" ],
        "bugLineIndex": 1,
        "explanation": "Asignar null a un tipo sin ? provocará un error de compilación inmediato.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Tipos anulables: String?, Int?\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Tipos anulables: String?, Int?",
            "right": "String garantiza al 100% que contiene texto real y nunca null."
          },
          {
            "left": "Principio 2",
            "right": "String? indica al compilador que la variable puede contener texto O ser null."
          },
          {
            "left": "Principio 3",
            "right": "Esta distinción previene fallos silenciosos en producción."
          },
          {
            "left": "Buena práctica",
            "right": "Por defecto NINGÚN tipo en Kotlin admite null. Debes..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l04-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Tipos anulables: String?, Int?\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Tipos anulables: String?, Int?\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Por defecto NINGÚN tipo en Kotlin admite null. Debes añadir ? explícitamente si puede ser nulo.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Tipos anulables: String?, Int?\"?",
        "code": "fun main() {\n    val noNulo: String = \"Siempre existe\"\n    val puedeSerNulo: String? = null // Perfectamente válido con ?\n    println(\"No nulo: $noNulo | Anulable: $puedeSerNulo\")\n}",
        "options": [
          "No nulo: Siempre existe | Anul",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: No nulo: Siempre existe | Anul",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Tipos anulables: String?, Int?\":",
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
        "id": "kt-u07-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Tipos anulables: String?, Int?\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Asignar null a un tipo sin ? provocará un error de compilación inmediato.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Tipos anulables: String?, Int?\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende la diferencia del sistema de tipos de Kotlin..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Asignar null a un tipo sin ? provocará un error de c..."
          },
          {
            "left": "Recomendación",
            "right": "Por defecto NINGÚN tipo en Kotlin admite null. Debes..."
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
    "id": "kotlin-u07-l05",
    "path": "kotlin",
    "unit": 7,
    "level": 5,
    "title": "5. Comprobación de nulos",
    "description": "Verifica la presencia de valores con if (x != null) y aprovecha el Smart Cast automático de Kotlin.",
    "exercises": [
      {
        "id": "kt-u07-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Comprobación de nulos\"?",
        "code": "val s: String? = \"Hola\"\nif (s != null) println(s.length) else println(0)",
        "options": [
          "4",
          "0",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "La comprobación tradicional con if (variable != null) es 100% segura.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l05-e02",
        "type": "code_cloze",
        "prompt": "El mecanismo por el cual Kotlin convierte automáticamente un tipo anulable a no-anulable tras comprobarlo se llama Smart ___:",
        "codeWithBlank": "El mecanismo por el cual Kotlin convierte automáticamente un tipo anulable a no-anulable tras comprobarlo se llama Smart ___:",
        "options": [
          "Cast",
          "Type",
          "Check",
          "Safe"
        ],
        "correctOption": "Cast",
        "explanation": "Smart Cast elimina la necesidad de conversiones forzadas manuales.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Comprobación de nulos\":",
        "tokens": [
          "if",
          "(",
          "token",
          "!=",
          "null",
          ")",
          "{",
          "println(token)",
          "}"
        ],
        "solution": [
          "if",
          "(",
          "token",
          "!=",
          "null",
          ")",
          "{",
          "println(token)",
          "}"
        ],
        "explanation": "Tras un if (x != null), Kotlin convierte automáticamente el tipo de x de String? a String.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Comprobación de nulos\":",
        "codeSnippet": [ "val nombre: String? = null", "println(nombre.length)", "println(\"Resultado listo\")" ],
        "bugLineIndex": 1,
        "explanation": "El Smart Cast solo funciona si la variable no puede haber sido modificada por otro hilo en el intermedio (funciona con val).",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Comprobación de nulos\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Comprobación de nulos",
            "right": "La comprobación tradicional con if (variable != null) es 100% segura."
          },
          {
            "left": "Principio 2",
            "right": "Smart Cast elimina la necesidad de conversiones forzadas manuales."
          },
          {
            "left": "Principio 3",
            "right": "Si la variable es null, el bloque else gestiona la contingencia limpiamente."
          },
          {
            "left": "Buena práctica",
            "right": "Tras un if (x != null), Kotlin convierte automáticam..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l05-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Comprobación de nulos\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Comprobación de nulos\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Tras un if (x != null), Kotlin convierte automáticamente el tipo de x de String? a String.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Comprobación de nulos\"?",
        "code": "fun main() {\n    val texto: String? = \"Kotlin\"\n    if (texto != null) {\n        println(\"Longitud: ${texto.length}\")\n    } else {",
        "options": [
          "Longitud: 6",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Longitud: 6",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Comprobación de nulos\":",
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
        "id": "kt-u07-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Comprobación de nulos\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "El Smart Cast solo funciona si la variable no puede haber sido modificada por otro hilo en el intermedio (funciona con val).",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Comprobación de nulos\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Verifica la presencia de valores con if (x != null) ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "El Smart Cast solo funciona si la variable no puede ..."
          },
          {
            "left": "Recomendación",
            "right": "Tras un if (x != null), Kotlin convierte automáticam..."
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
    "id": "kotlin-u07-l06",
    "path": "kotlin",
    "unit": 7,
    "level": 6,
    "title": "6. Acceso seguro ?. y operador Elvis ?:",
    "description": "Domina los dos operadores estrella de Kotlin: el operador de llamada segura ?. y el operador Elvis ?: para valores por defecto.",
    "exercises": [
      {
        "id": "kt-u07-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Acceso seguro ?. y operador Elvis ?:\"?",
        "code": "val texto: String? = null\nval res = texto?.uppercase() ?: \"VACIO\"\nprintln(res)",
        "options": [
          "VACIO",
          "null",
          "VACÍO",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "objeto?.propiedad ejecuta la llamada solo si objeto != null.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l06-e02",
        "type": "code_cloze",
        "prompt": "El operador que proporciona un valor alternativo en caso de null (?:) se llama operador ___:",
        "codeWithBlank": "El operador que proporciona un valor alternativo en caso de null (?:) se llama operador ___:",
        "options": [
          "Elvis",
          "Seguro",
          "Ternario",
          "Coalescente"
        ],
        "correctOption": "Elvis",
        "explanation": "expresion ?: valorPorDefecto devuelve valorPorDefecto si expresion es null.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Acceso seguro ?. y operador Elvis ?:\":",
        "tokens": [
          "val",
          "len",
          "=",
          "texto?.length",
          "?:",
          "0"
        ],
        "solution": [
          "val",
          "len",
          "=",
          "texto?.length",
          "?:",
          "0"
        ],
        "explanation": "Se llama operador Elvis ?: porque de lado parece el peinado tupé y los ojos de Elvis Presley.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Acceso seguro ?. y operador Elvis ?:\":",
        "codeSnippet": [ "val s: String? = null", "val len: Int = s?.length", "println(\"Resultado listo\")" ],
        "bugLineIndex": 1,
        "explanation": "Olvidar que ?. devuelve un tipo anulable si el objeto era null.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Acceso seguro ?. y operador Elvis ?:\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Acceso seguro ?. y operador Elvis ?:",
            "right": "objeto?.propiedad ejecuta la llamada solo si objeto != null."
          },
          {
            "left": "expresion ?",
            "right": "valorPorDefecto devuelve valorPorDefecto si expresion es null."
          },
          {
            "left": "Principio 3",
            "right": "Combinados permiten escribir código conciso, legible y libre de caídas."
          },
          {
            "left": "Buena práctica",
            "right": "Se llama operador Elvis ?: porque de lado parece el ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l06-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Acceso seguro ?. y operador Elvis ?:\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Acceso seguro ?. y operador Elvis ?:\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Se llama operador Elvis ?: porque de lado parece el peinado tupé y los ojos de Elvis Presley.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Acceso seguro ?. y operador Elvis ?:\"?",
        "code": "fun main() {\n    val ciudad: String? = null\n    val longitud = ciudad?.length\n    val nombreSeguro = ciudad ?: \"Ciudad Desconocida\"\n    println(\"Longitud: $longitud | Nombre: $nombreSeguro\")",
        "options": [
          "Longitud: null | Nombre: Ciuda",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Longitud: null | Nombre: Ciuda",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Acceso seguro ?. y operador Elvis ?:\":",
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
        "id": "kt-u07-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Acceso seguro ?. y operador Elvis ?:\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Olvidar que ?. devuelve un tipo anulable si el objeto era null.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Acceso seguro ?. y operador Elvis ?:\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Domina los dos operadores estrella de Kotlin: el ope..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Olvidar que ?. devuelve un tipo anulable si el objet..."
          },
          {
            "left": "Recomendación",
            "right": "Se llama operador Elvis ?: porque de lado parece el ..."
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
    "id": "kotlin-u07-l07",
    "path": "kotlin",
    "unit": 7,
    "level": 7,
    "title": "7. Riesgos de usar !!",
    "description": "Comprende el operador de aserción no nula (!!) y por qué se considera una mala práctica que debes evitar casi siempre.",
    "exercises": [
      {
        "id": "kt-u07-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Riesgos de usar !!\"?",
        "code": "val x: Int? = 5\nprintln(x!! * 2)",
        "options": [
          "10",
          "null",
          "5",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "!! convierte forzadamente un tipo anulable (T?) a no anulable (T).",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l07-e02",
        "type": "code_cloze",
        "prompt": "El operador de aserción no nula que puede causar un NullPointerException es ___:",
        "codeWithBlank": "El operador de aserción no nula que puede causar un NullPointerException es ___:",
        "options": [
          "!!",
          "?.",
          "?:",
          "??"
        ],
        "correctOption": "!!",
        "explanation": "Si el valor es null en tiempo de ejecución, lanzará inmediatamente NullPointerException.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Riesgos de usar !!\":",
        "tokens": [
          "val",
          "seguro",
          "=",
          "posibleNulo",
          "?:",
          "\"\""
        ],
        "solution": [
          "val",
          "seguro",
          "=",
          "posibleNulo",
          "?:",
          "\"\""
        ],
        "explanation": "Si sientes la tentación de usar !!, pregúntate si puedes usar ?: o un if (x != null) en su lugar.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Riesgos de usar !!\":",
        "codeSnippet": [ "val nulo: String? = null", "println(nulo!!.length)", "println(\"Resultado listo\")" ],
        "bugLineIndex": 1,
        "explanation": "Usar !! desactiva la protección de Kotlin y reintroduce los temidos crashes de NullPointerException.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Riesgos de usar !!\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Riesgos de usar !!",
            "right": "!! convierte forzadamente un tipo anulable (T?) a no anulable (T)."
          },
          {
            "left": "Principio 2",
            "right": "Si el valor es null en tiempo de ejecución, lanzará inmediatamente NullPointerException."
          },
          {
            "left": "Principio 3",
            "right": "Solo se justifica en casos extremos donde el entorno externo garantiza la no nulidad."
          },
          {
            "left": "Buena práctica",
            "right": "Si sientes la tentación de usar !!, pregúntate si pu..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l07-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Riesgos de usar !!\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Riesgos de usar !!\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Si sientes la tentación de usar !!, pregúntate si puedes usar ?: o un if (x != null) en su lugar.",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Riesgos de usar !!\"?",
        "code": "fun main() {\n    val textoSeguro: String? = \"Dato garantizado\"\n    println(\"Texto en mayúsculas: ${textoSeguro!!.uppercase()}\")\n    val datoPeligroso: String? = null\n    try {",
        "options": [
          "Texto en mayúsculas: DATO GARA",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Texto en mayúsculas: DATO GARA",
        "xpReward": 10
      },
      {
        "id": "kt-u07-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Riesgos de usar !!\":",
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
        "id": "kt-u07-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Riesgos de usar !!\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Usar !! desactiva la protección de Kotlin y reintroduce los temidos crashes de NullPointerException.",
        "xpReward": 15
      },
      {
        "id": "kt-u07-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Riesgos de usar !!\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende el operador de aserción no nula (!!) y por..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar !! desactiva la protección de Kotlin y reintrod..."
          },
          {
            "left": "Recomendación",
            "right": "Si sientes la tentación de usar !!, pregúntate si pu..."
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
