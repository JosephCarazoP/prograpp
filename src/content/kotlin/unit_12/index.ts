import { Lesson } from '../../../types/lesson';

export const KOTLIN_UNIT_12_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u12-l01",
    "path": "kotlin",
    "unit": 12,
    "level": 1,
    "title": "1. Errores de sintaxis, ejecución y lógica",
    "description": "Aprende la taxonomía de los bugs: sintácticos (el compilador no entiende), en ejecución (el programa explota) y lógicos (da un resultado erróneo silenciosamente).",
    "exercises": [
      {
        "id": "kt-u12-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Errores de sintaxis, ejecución y lógica\"?",
        "code": "val base = 6\nval alt = 4\n// Algoritmo: (b * h) / 2\nval area = (base * alt) / 2\nprintln(area)",
        "options": [
          "12",
          "24",
          "10",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Error de sintaxis: viola las reglas gramaticales de Kotlin (falla la compilación).",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l01-e02",
        "type": "code_cloze",
        "prompt": "Un error donde el programa no crashea pero entrega resultados matemáticos equivocados es un error ___:",
        "codeWithBlank": "Un error donde el programa no crashea pero entrega resultados matemáticos equivocados es un error ___:",
        "options": [
          "lógico",
          "de sintaxis",
          "de compilación",
          "de hardware"
        ],
        "correctOption": "lógico",
        "explanation": "Error de ejecución (runtime): ocurre mientras corre el programa (ej. NullPointerException).",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Errores de sintaxis, ejecución y lógica\":",
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
          "2.0"
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
          "2.0"
        ],
        "explanation": "Los errores lógicos son los más peligrosos porque el compilador no puede advertirte sobre ellos.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Errores de sintaxis, ejecución y lógica\":",
        "codeSnippet": [ "val precio = 100", "val desc = 10", "val total = precio + desc" ],
        "bugLineIndex": 2,
        "explanation": "Confiar ciegamente en que \"si compila, está bien\". Siempre debes verificar con casos de prueba.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Errores de sintaxis, ejecución y lógica\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Error de sintaxis",
            "right": "viola las reglas gramaticales de Kotlin (falla la compilación)."
          },
          {
            "left": "Error de ejecución (runtime)",
            "right": "ocurre mientras corre el programa (ej. NullPointerException)."
          },
          {
            "left": "Error lógico",
            "right": "el programa ejecuta sin errores pero produce resultados incorrectos."
          },
          {
            "left": "Buena práctica",
            "right": "Los errores lógicos son los más peligrosos porque el..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l01-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Errores de sintaxis, ejecución y lógica\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Errores de sintaxis, ejecución y lógica\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Los errores lógicos son los más peligrosos porque el compilador no puede advertirte sobre ellos.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Errores de sintaxis, ejecución y lógica\"?",
        "code": "fun main() {\n    val base = 10\n    val altura = 5\n    val areaErronea = base * altura // Olvidó dividir entre 2\n    println(\"Área con bug lógico: $areaErronea (debió ser 25.0)\")",
        "options": [
          "Área con bug lógico: 50 (debió",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Área con bug lógico: 50 (debió",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Errores de sintaxis, ejecución y lógica\":",
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
        "id": "kt-u12-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Errores de sintaxis, ejecución y lógica\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Confiar ciegamente en que \"si compila, está bien\". Siempre debes verificar con casos de prueba.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Errores de sintaxis, ejecución y lógica\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende la taxonomía de los bugs: sintácticos (el co..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Confiar ciegamente en que \"si compila, está bien\". S..."
          },
          {
            "left": "Recomendación",
            "right": "Los errores lógicos son los más peligrosos porque el..."
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
    "id": "kotlin-u12-l02",
    "path": "kotlin",
    "unit": 12,
    "level": 2,
    "title": "2. Lectura de mensajes de error",
    "description": "Aprende a interpretar el Stack Trace y los mensajes del compilador identificando archivo, línea y columna exactos.",
    "exercises": [
      {
        "id": "kt-u12-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Lectura de mensajes de error\"?",
        "code": "val texto = \"Diagnóstico OK\"\nprintln(texto.length)",
        "options": [
          "14",
          "15",
          "Diagnóstico OK",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "El compilador indica siempre el archivo, línea y columna del error.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l02-e02",
        "type": "code_cloze",
        "prompt": "El registro detallado de las funciones invocadas hasta el punto donde ocurrió un error se llama Stack ___:",
        "codeWithBlank": "El registro detallado de las funciones invocadas hasta el punto donde ocurrió un error se llama Stack ___:",
        "options": [
          "Trace",
          "Log",
          "Dump",
          "Path"
        ],
        "correctOption": "Trace",
        "explanation": "Unresolved reference: escribiste mal un nombre o falta una variable/función.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Lectura de mensajes de error\":",
        "tokens": [
          "//",
          "Leer",
          "primera",
          "línea",
          "del",
          "Stack",
          "Trace"
        ],
        "solution": [
          "//",
          "Leer",
          "primera",
          "línea",
          "del",
          "Stack",
          "Trace"
        ],
        "explanation": "Lee siempre la PRIMERA línea del mensaje de error; los errores posteriores suelen ser consecuencias del primero.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Lectura de mensajes de error\":",
        "codeSnippet": [ "fun main() {", "    val x: Int = \"100\"", "    println(\"Ejecutando...\")", "}" ],
        "bugLineIndex": 1,
        "explanation": "Asustarse con un stack trace de 50 líneas: busca la línea que apunta a TU propio código (.kt).",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Lectura de mensajes de error\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Lectura de mensajes de error",
            "right": "El compilador indica siempre el archivo, línea y columna del error."
          },
          {
            "left": "Unresolved reference",
            "right": "escribiste mal un nombre o falta una variable/función."
          },
          {
            "left": "Type mismatch",
            "right": "pasaste un tipo de dato diferente al esperado."
          },
          {
            "left": "Buena práctica",
            "right": "Lee siempre la PRIMERA línea del mensaje de error; l..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l02-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Lectura de mensajes de error\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Lectura de mensajes de error\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Lee siempre la PRIMERA línea del mensaje de error; los errores posteriores suelen ser consecuencias del primero.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Lectura de mensajes de error\"?",
        "code": "fun main() {\n    println(\"Simulando lectura de error:\")\n    println(\"e: src/Main.kt:14:25: error: Unresolved reference: calcular\")\n    println(\"Significado: En Main.kt, línea 14, columna 25, llamaste a una función 'calcular' que no existe o no fue importada.\")\n}",
        "options": [
          "Simulando lectura de error:",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Simulando lectura de error:",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Lectura de mensajes de error\":",
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
        "id": "kt-u12-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Lectura de mensajes de error\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Asustarse con un stack trace de 50 líneas: busca la línea que apunta a TU propio código (.kt).",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Lectura de mensajes de error\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a interpretar el Stack Trace y los mensajes ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Asustarse con un stack trace de 50 líneas: busca la ..."
          },
          {
            "left": "Recomendación",
            "right": "Lee siempre la PRIMERA línea del mensaje de error; l..."
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
    "id": "kotlin-u12-l03",
    "path": "kotlin",
    "unit": 12,
    "level": 3,
    "title": "3. Seguimiento de variables paso a paso",
    "description": "Domina las técnicas de depuración con puntos de interrupción (breakpoints) e inspección de variables en vivo.",
    "exercises": [
      {
        "id": "kt-u12-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Seguimiento de variables paso a paso\"?",
        "code": "var v = 1\nv = v * 5\nv = v - 2\nprintln(v)",
        "options": [
          "3",
          "5",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Un breakpoint pausa la ejecución justo antes de ejecutar la línea marcada.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l03-e02",
        "type": "code_cloze",
        "prompt": "Un punto marcado en el código para pausar la ejecución en el depurador se llama ___:",
        "codeWithBlank": "Un punto marcado en el código para pausar la ejecución en el depurador se llama ___:",
        "options": [
          "breakpoint",
          "stopline",
          "checkpoint",
          "pause"
        ],
        "correctOption": "breakpoint",
        "explanation": "Permite inspeccionar el valor exacto de todas las variables vivas en memoria.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Seguimiento de variables paso a paso\":",
        "tokens": [
          "println",
          "(",
          "\"DEBUG: var x = $x\"",
          ")"
        ],
        "solution": [
          "println",
          "(",
          "\"DEBUG: var x = $x\"",
          ")"
        ],
        "explanation": "Usar un depurador gráfico (debugger) con Step Over (F8) y Step Into (F7) es diez veces más rápido que poner 20 println().",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Seguimiento de variables paso a paso\":",
        "codeSnippet": [ "var a = 1", "a = 2", "a = a + b" ],
        "bugLineIndex": 2,
        "explanation": "Dejar impresiones de debug temporales (println(\"llego aqui 1\")) en el código de producción final.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Seguimiento de variables paso a paso\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Seguimiento de variables paso a paso",
            "right": "Un breakpoint pausa la ejecución justo antes de ejecutar la línea marcada."
          },
          {
            "left": "Principio 2",
            "right": "Permite inspeccionar el valor exacto de todas las variables vivas en memoria."
          },
          {
            "left": "Principio 3",
            "right": "Step Over avanza a la siguiente línea del código actual."
          },
          {
            "left": "Buena práctica",
            "right": "Usar un depurador gráfico (debugger) con Step Over (..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l03-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Seguimiento de variables paso a paso\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Seguimiento de variables paso a paso\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Usar un depurador gráfico (debugger) con Step Over (F8) y Step Into (F7) es diez veces más rápido que poner 20 println().",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Seguimiento de variables paso a paso\"?",
        "code": "fun main() {\n    var balance = 500\n    println(\"[Paso 1] balance = $balance\")\n    balance -= 120\n    println(\"[Paso 2] balance tras retiro = $balance\")",
        "options": [
          "[Paso 1] balance = 500",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: [Paso 1] balance = 500",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Seguimiento de variables paso a paso\":",
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
        "id": "kt-u12-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Seguimiento de variables paso a paso\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Dejar impresiones de debug temporales (println(\"llego aqui 1\")) en el código de producción final.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Seguimiento de variables paso a paso\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Domina las técnicas de depuración con puntos de inte..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Dejar impresiones de debug temporales (println(\"lleg..."
          },
          {
            "left": "Recomendación",
            "right": "Usar un depurador gráfico (debugger) con Step Over (..."
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
    "id": "kotlin-u12-l04",
    "path": "kotlin",
    "unit": 12,
    "level": 4,
    "title": "4. Excepciones con try y catch",
    "description": "Protege tu aplicación de caídas imprevistas interceptando errores en tiempo de ejecución con bloques try y catch.",
    "exercises": [
      {
        "id": "kt-u12-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Excepciones con try y catch\"?",
        "code": "var valor = 0\ntry {\n    valor = \"50\".toInt()\n} catch (e: Exception) {\n    valor = -1\n}\nprintln(valor)",
        "options": [
          "50",
          "-1",
          "0",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "try envuelve el código susceptible de fallar.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l04-e02",
        "type": "code_cloze",
        "prompt": "El bloque que se ejecuta siempre al finalizar try-catch, ocurra o no error, es ___:",
        "codeWithBlank": "El bloque que se ejecuta siempre al finalizar try-catch, ocurra o no error, es ___:",
        "options": [
          "finally",
          "always",
          "end",
          "after"
        ],
        "correctOption": "finally",
        "explanation": "catch intercepta la excepción y permite ejecutar un plan de contingencia.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Excepciones con try y catch\":",
        "tokens": [
          "try",
          "{",
          "arriesgado()",
          "}",
          "catch",
          "(",
          "e:",
          "Exception",
          ")",
          "{",
          "}"
        ],
        "solution": [
          "try",
          "{",
          "arriesgado()",
          "}",
          "catch",
          "(",
          "e:",
          "Exception",
          ")",
          "{",
          "}"
        ],
        "explanation": "El bloque finally se ejecuta SIEMPRE, haya ocurrido o no una excepción (ideal para cerrar archivos o conexiones).",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Excepciones con try y catch\":",
        "codeSnippet": [ "try {", "    val n = 10 / 0", "}" ],
        "bugLineIndex": 2,
        "explanation": "Atrapar excepciones genéricas (catch (e: Exception)) y dejarlas vacías: oculta bugs graves del sistema.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Excepciones con try y catch\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Excepciones con try y catch",
            "right": "try envuelve el código susceptible de fallar."
          },
          {
            "left": "Principio 2",
            "right": "catch intercepta la excepción y permite ejecutar un plan de contingencia."
          },
          {
            "left": "Principio 3",
            "right": "Evita que la aplicación se cierre abruptamente ante el usuario."
          },
          {
            "left": "Buena práctica",
            "right": "El bloque finally se ejecuta SIEMPRE, haya ocurrido ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l04-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Excepciones con try y catch\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Excepciones con try y catch\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "El bloque finally se ejecuta SIEMPRE, haya ocurrido o no una excepción (ideal para cerrar archivos o conexiones).",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Excepciones con try y catch\"?",
        "code": "fun main() {\n    val textoEntrada = \"no_es_numero\"\n    try {\n        val numero = textoEntrada.toInt()\n        println(\"Número procesado: $numero\")",
        "options": [
          "Aviso controlado: 'no_es_numer",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Aviso controlado: 'no_es_numer",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Excepciones con try y catch\":",
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
        "id": "kt-u12-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Excepciones con try y catch\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Atrapar excepciones genéricas (catch (e: Exception)) y dejarlas vacías: oculta bugs graves del sistema.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Excepciones con try y catch\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Protege tu aplicación de caídas imprevistas intercep..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Atrapar excepciones genéricas (catch (e: Exception))..."
          },
          {
            "left": "Recomendación",
            "right": "El bloque finally se ejecuta SIEMPRE, haya ocurrido ..."
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
    "id": "kotlin-u12-l05",
    "path": "kotlin",
    "unit": 12,
    "level": 5,
    "title": "5. Validar una entrada frente a capturar una excepción",
    "description": "Comprende el principio de programación defensiva: valida los datos preventivamente antes de que provoquen excepciones.",
    "exercises": [
      {
        "id": "kt-u12-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Validar una entrada frente a capturar una excepción\"?",
        "code": "val texto = \"123\"\nval num = if (texto.all { it.isDigit() }) texto.toInt() else 0\nprintln(num)",
        "options": [
          "123",
          "0",
          "true",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Validar preventivamente (if) es más rápido y claro que atrapar excepciones.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l05-e02",
        "type": "code_cloze",
        "prompt": "Comprobar las entradas antes de operar para evitar fallos se conoce como programación ___:",
        "codeWithBlank": "Comprobar las entradas antes de operar para evitar fallos se conoce como programación ___:",
        "options": [
          "defensiva",
          "ofensiva",
          "pasiva",
          "reactiva"
        ],
        "correctOption": "defensiva",
        "explanation": "Las excepciones deben ser excepcionales, no la regla cotidiana.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Validar una entrada frente a capturar una excepción\":",
        "tokens": [
          "if",
          "(",
          "divisor",
          "!=",
          "0",
          ")",
          "a",
          "/",
          "divisor",
          "else",
          "0"
        ],
        "solution": [
          "if",
          "(",
          "divisor",
          "!=",
          "0",
          ")",
          "a",
          "/",
          "divisor",
          "else",
          "0"
        ],
        "explanation": "Lanzar y capturar excepciones consume muchísimos recursos de la CPU; validar con if es instantáneo y limpio.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Validar una entrada frente a capturar una excepción\":",
        "codeSnippet": [ "fun procesar(d: Int) {", "", "}" ],
        "bugLineIndex": 1,
        "explanation": "Usar try-catch para controlar el flujo normal del programa en lugar de reservarlo para fallos excepcionales.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Validar una entrada frente a capturar una excepción\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Validar una entrada frente a capturar una excepción",
            "right": "Validar preventivamente (if) es más rápido y claro que atrapar excepciones."
          },
          {
            "left": "Principio 2",
            "right": "Las excepciones deben ser excepcionales, no la regla cotidiana."
          },
          {
            "left": "Principio 3",
            "right": "Usa funciones seguras como toIntOrNull() para evitar excepciones innecesarias."
          },
          {
            "left": "Buena práctica",
            "right": "Lanzar y capturar excepciones consume muchísimos rec..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l05-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Validar una entrada frente a capturar una excepción\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Validar una entrada frente a capturar una excepción\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Lanzar y capturar excepciones consume muchísimos recursos de la CPU; validar con if es instantáneo y limpio.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Validar una entrada frente a capturar una excepción\"?",
        "code": "fun dividirSeguro(a: Double, b: Double): Double? {\n    if (b == 0.0) {\n        println(\"Validación: El divisor no puede ser cero.\")\n        return null\n    }",
        "options": [
          "Validación: El divisor no pued",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Validación: El divisor no pued",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Validar una entrada frente a capturar una excepción\":",
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
        "id": "kt-u12-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Validar una entrada frente a capturar una excepción\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Usar try-catch para controlar el flujo normal del programa en lugar de reservarlo para fallos excepcionales.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Validar una entrada frente a capturar una excepción\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende el principio de programación defensiva: va..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar try-catch para controlar el flujo normal del pr..."
          },
          {
            "left": "Recomendación",
            "right": "Lanzar y capturar excepciones consume muchísimos rec..."
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
    "id": "kotlin-u12-l06",
    "path": "kotlin",
    "unit": 12,
    "level": 6,
    "title": "6. Casos normales, límite e incorrectos",
    "description": "Diseña suites de prueba exhaustivas: prueba con casos típicos (normales), valores frontera (límite) y datos maliciosos o absurdos.",
    "exercises": [
      {
        "id": "kt-u12-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Casos normales, límite e incorrectos\"?",
        "code": "fun esPositivo(n: Int) = n > 0\nprintln(esPositivo(0))",
        "options": [
          "false",
          "true",
          "0",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "Caso normal: datos estándar esperados en el uso habitual.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l06-e02",
        "type": "code_cloze",
        "prompt": "Las pruebas que verifican los valores exactos en la frontera de una condición se llaman casos ___:",
        "codeWithBlank": "Las pruebas que verifican los valores exactos en la frontera de una condición se llaman casos ___:",
        "options": [
          "límite",
          "normales",
          "aleatorios",
          "cerrados"
        ],
        "correctOption": "límite",
        "explanation": "Caso límite: fronteras exactas del dominio (mínimos, máximos, longitudes extremas).",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Casos normales, límite e incorrectos\":",
        "tokens": [
          "val",
          "valido",
          "=",
          "n",
          "in",
          "0..100"
        ],
        "solution": [
          "val",
          "valido",
          "=",
          "n",
          "in",
          "0..100"
        ],
        "explanation": "El 90% de los errores en producción ocurren en los valores límite (0, -1, null, cadenas vacías, listas vacías).",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Casos normales, límite e incorrectos\":",
        "codeSnippet": [
          "fun validar(p: Int) {",
          "    if (p > 0) return true // Olvidó contemplar qué ocurre si p es negativo",
          "}"
        ],
        "bugLineIndex": 1,
        "explanation": "Probar solo con \"el camino feliz\" (happy path) donde el usuario siempre ingresa los datos correctos.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Casos normales, límite e incorrectos\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Caso normal",
            "right": "datos estándar esperados en el uso habitual."
          },
          {
            "left": "Caso límite",
            "right": "fronteras exactas del dominio (mínimos, máximos, longitudes extremas)."
          },
          {
            "left": "Caso incorrecto",
            "right": "entradas fuera de regla que deben rechazarse amablemente."
          },
          {
            "left": "Buena práctica",
            "right": "El 90% de los errores en producción ocurren en los v..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l06-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Casos normales, límite e incorrectos\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Casos normales, límite e incorrectos\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "El 90% de los errores en producción ocurren en los valores límite (0, -1, null, cadenas vacías, listas vacías).",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Casos normales, límite e incorrectos\"?",
        "code": "fun categorizarEdad(edad: Int): String {\n    if (edad < 0 || edad > 130) return \"Edad inválida\"\n    return if (edad >= 18) \"Adulto\" else \"Menor\"\n}\n",
        "options": [
          "Caso normal:    25 -> Adulto",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Caso normal:    25 -> Adulto",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Casos normales, límite e incorrectos\":",
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
        "id": "kt-u12-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Casos normales, límite e incorrectos\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Probar solo con \"el camino feliz\" (happy path) donde el usuario siempre ingresa los datos correctos.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Casos normales, límite e incorrectos\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Diseña suites de prueba exhaustivas: prueba con caso..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Probar solo con \"el camino feliz\" (happy path) donde..."
          },
          {
            "left": "Recomendación",
            "right": "El 90% de los errores en producción ocurren en los v..."
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
    "id": "kotlin-u12-l07",
    "path": "kotlin",
    "unit": 12,
    "level": 7,
    "title": "7. Resultado esperado frente a resultado obtenido",
    "description": "Aprende la esencia de las pruebas unitarias: confrontar el resultado esperado (teoría) contra el resultado obtenido (realidad).",
    "exercises": [
      {
        "id": "kt-u12-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Resultado esperado frente a resultado obtenido\"?",
        "code": "val esperado = 20\nval obtenido = 4 * 5\nprintln(esperado == obtenido)",
        "options": [
          "true",
          "false",
          "20",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Toda prueba define una entrada, un resultado esperado y una ejecución real.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l07-e02",
        "type": "code_cloze",
        "prompt": "En una prueba unitaria, contrastamos el resultado esperado contra el resultado ___:",
        "codeWithBlank": "En una prueba unitaria, contrastamos el resultado esperado contra el resultado ___:",
        "options": [
          "obtenido",
          "aleatorio",
          "global",
          "inicial"
        ],
        "correctOption": "obtenido",
        "explanation": "La aserción comprueba que esperado == obtenido.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Resultado esperado frente a resultado obtenido\":",
        "tokens": [
          "if",
          "(",
          "esperado",
          "==",
          "obtenido",
          ")",
          "println(\"OK\")",
          "else",
          "println(\"FAIL\")"
        ],
        "solution": [
          "if",
          "(",
          "esperado",
          "==",
          "obtenido",
          ")",
          "println(\"OK\")",
          "else",
          "println(\"FAIL\")"
        ],
        "explanation": "Escribir pruebas automatizadas te permite modificar código viejo con la certeza de que no rompiste nada existente.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Resultado esperado frente a resultado obtenido\":",
        "codeSnippet": [
          "val exp = 10",
          "val obt = 8",
          "assert(exp == obt) // Fallará la aserción al diferir los valores"
        ],
        "bugLineIndex": 2,
        "explanation": "Calcular el valor esperado usando la misma fórmula errónea de la función que estás probando.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Resultado esperado frente a resultado obtenido\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Resultado esperado frente a resultado obtenido",
            "right": "Toda prueba define una entrada, un resultado esperado y una ejecución real."
          },
          {
            "left": "Principio 2",
            "right": "La aserción comprueba que esperado == obtenido."
          },
          {
            "left": "Principio 3",
            "right": "Es el cimiento del Testing Automatizado profesional (JUnit)."
          },
          {
            "left": "Buena práctica",
            "right": "Escribir pruebas automatizadas te permite modificar ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l07-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Resultado esperado frente a resultado obtenido\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Resultado esperado frente a resultado obtenido\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Escribir pruebas automatizadas te permite modificar código viejo con la certeza de que no rompiste nada existente.",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Resultado esperado frente a resultado obtenido\"?",
        "code": "fun sumar(a: Int, b: Int) = a + b\n\nfun testSumar() {\n    val esperado = 15\n    val obtenido = sumar(10, 5)",
        "options": [
          "TEST PASADO: esperado 15 == ob",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: TEST PASADO: esperado 15 == ob",
        "xpReward": 10
      },
      {
        "id": "kt-u12-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Resultado esperado frente a resultado obtenido\":",
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
        "id": "kt-u12-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Resultado esperado frente a resultado obtenido\":",
        "codeSnippet": [ "// Bloque de verificación", "val datoValido = true", "datoValido = false" ],
        "bugLineIndex": 2,
        "explanation": "Calcular el valor esperado usando la misma fórmula errónea de la función que estás probando.",
        "xpReward": 15
      },
      {
        "id": "kt-u12-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Resultado esperado frente a resultado obtenido\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende la esencia de las pruebas unitarias: confron..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Calcular el valor esperado usando la misma fórmula e..."
          },
          {
            "left": "Recomendación",
            "right": "Escribir pruebas automatizadas te permite modificar ..."
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
