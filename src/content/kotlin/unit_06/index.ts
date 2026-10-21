import { Lesson } from '../../../types/lesson';

export const KOTLIN_UNIT_06_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u06-l01",
    "path": "kotlin",
    "unit": 6,
    "level": 1,
    "title": "1. Declaración e invocación de funciones",
    "description": "Una función es un bloque de código reutilizable con un nombre asignado que ejecuta una tarea específica cuando es invocada o llamada desde otra parte del programa.",
    "exercises": [
      {
        "id": "kt-u06-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuántas veces se imprimirá el mensaje?",
        "code": "fun aviso() { println(\"Alerta\") }\nfun main() {\n    aviso()\n    aviso()\n}",
        "options": [
          "2 veces",
          "1 vez",
          "0 veces",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "La función aviso() se invoca dos veces desde main(), imprimiendo \"Alerta\" en dos ocasiones.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l01-e02",
        "type": "code_cloze",
        "prompt": "Para ejecutar o invocar una función declarada debemos escribir su nombre seguido de ___:",
        "codeWithBlank": "saludar___",
        "options": [
          "()",
          "{}",
          "[]",
          "<>"
        ],
        "correctOption": "()",
        "explanation": "Los paréntesis () son el operador de invocación de funciones en Kotlin.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l01-e03",
        "type": "code_builder",
        "prompt": "Construye la declaración de una función simple llamada iniciar:",
        "tokens": [
          "fun",
          "iniciar()",
          "{",
          "println(\"Listo\")",
          "}"
        ],
        "solution": [
          "fun",
          "iniciar()",
          "{",
          "println(\"Listo\")",
          "}"
        ],
        "explanation": "Estructura canónica de declaración de función en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea donde la función no se ejecuta por olvidar los paréntesis:",
        "codeSnippet": [
          "fun conectar() { println(\"Conectado\") }",
          "conectar // Error: falta () para invocar la función",
          "println(\"Fin\")"
        ],
        "bugLineIndex": 1,
        "explanation": "Escribir solo conectar no ejecuta la función; se requiere conectar().",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja los términos de funciones con su significado:",
        "pairs": [
          {
            "left": "Declaración",
            "right": "Definir el nombre y las instrucciones de la función con fun"
          },
          {
            "left": "Invocación / Llamada",
            "right": "Ejecutar la función escribiendo su nombre con ()"
          },
          {
            "left": "Reutilización",
            "right": "Llamar a la misma función desde diferentes lugares"
          },
          {
            "left": "Modularidad",
            "right": "Dividir un programa grande en piezas pequeñas independientes"
          }
        ],
        "explanation": "Conceptos estructurales de la programación modular con funciones.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l01-e06",
        "type": "code_cloze",
        "prompt": "La palabra clave de Kotlin para declarar cualquier función es ___:",
        "codeWithBlank": "___ procesarDatos() { }",
        "options": [
          "fun",
          "function",
          "def",
          "method"
        ],
        "correctOption": "fun",
        "explanation": "fun es la palabra reservada oficial en Kotlin.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué ocurre si declaramos una función pero nunca la invocamos en main()?",
        "code": "fun secreto() { println(\"Secreto\") }\nfun main() { println(\"Público\") }",
        "options": [
          "Solo imprime \"Público\"",
          "Imprime \"Secreto\"",
          "Imprime ambos",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Las funciones solo se ejecutan cuando son invocadas explícitamente.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l01-e08",
        "type": "code_builder",
        "prompt": "Invoca la función guardarCambios:",
        "tokens": [
          "guardarCambios",
          "(",
          ")"
        ],
        "solution": [
          "guardarCambios",
          "(",
          ")"
        ],
        "explanation": "Llamada directa sin argumentos.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con error en la cabecera de la función:",
        "codeSnippet": [
          "fun mostrarMenu { // Error: faltan los paréntesis () en la declaración",
          "    println(\"1. Jugar\")",
          "}"
        ],
        "bugLineIndex": 0,
        "explanation": "Toda declaración de función requiere paréntesis para su lista de parámetros: fun mostrarMenu().",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l01-e10",
        "type": "predict_output",
        "prompt": "¿Pueden las funciones invocarse unas a otras dentro de un programa?",
        "code": "",
        "options": [
          "Sí, una función puede llamar a otra función para coordinar tareas",
          "No, solo la función main tiene permiso de invocar funciones",
          "Solo si están en archivos diferentes",
          "No, porque causaría un cortocircuito"
        ],
        "correctOptionIndex": 0,
        "explanation": "La composición e invocación encadenada entre funciones es la base del diseño modular.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u06-l02",
    "path": "kotlin",
    "unit": 6,
    "level": 2,
    "title": "2. Parámetros y argumentos",
    "description": "Los parámetros son variables declaradas en la cabecera de la función para recibir datos de entrada; los argumentos son los valores reales que le pasas al momento de invocarla.",
    "exercises": [
      {
        "id": "kt-u06-l02-e01",
        "type": "predict_output",
        "prompt": "¿Qué imprimirá la función al recibir los argumentos?",
        "code": "fun duplicar(n: Int) {\n    println(n * 2)\n}\nfun main() {\n    duplicar(7)\n}",
        "options": [
          "14",
          "7",
          "n * 2",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "El argumento 7 se asigna al parámetro n, y la función ejecuta 7 * 2 = 14.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l02-e02",
        "type": "code_cloze",
        "prompt": "En la definición fun sumar(a: Int, b: Int), las variables a y b se llaman ___:",
        "codeWithBlank": "Las variables en la cabecera de la función son ___.",
        "options": [
          "parámetros",
          "argumentos",
          "retornos",
          "constantes"
        ],
        "correctOption": "parámetros",
        "explanation": "Parámetros son las variables formales especificadas en la cabecera de la función.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l02-e03",
        "type": "code_builder",
        "prompt": "Construye la cabecera de una función con un parámetro de texto nombre:",
        "tokens": [
          "fun",
          "saludar",
          "(",
          "nombre:",
          "String",
          ")",
          "{",
          "}"
        ],
        "solution": [
          "fun",
          "saludar",
          "(",
          "nombre:",
          "String",
          ")",
          "{",
          "}"
        ],
        "explanation": "Declaración con especificación de tipo obligatoria: nombre: String.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea donde se intenta modificar un parámetro inmutable:",
        "codeSnippet": [
          "fun incrementar(x: Int) {",
          "    x = x + 1 // Error: los parámetros son val inmutables en Kotlin",
          "    println(x)"
        ],
        "bugLineIndex": 1,
        "explanation": "En Kotlin los parámetros son inmutables de solo lectura; no pueden ser reasignados.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja los términos con su rol en la llamada:",
        "pairs": [
          {
            "left": "Parámetro",
            "right": "Variable declarada en la definición: (x: Int)"
          },
          {
            "left": "Argumento",
            "right": "Valor concreto enviado en la invocación: (10)"
          },
          {
            "left": "Tipo de parámetro",
            "right": "Obligatorio en la definición (: String, : Int)"
          },
          {
            "left": "Inmutabilidad",
            "right": "Los parámetros no se pueden reasignar dentro de la función"
          }
        ],
        "explanation": "Distinción técnica precisa entre parámetros y argumentos.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l02-e06",
        "type": "code_cloze",
        "prompt": "Los valores concretos que se envían al invocar sumar(4, 5) se denominan ___:",
        "codeWithBlank": "Los valores reales pasados en la llamada son ___.",
        "options": [
          "argumentos",
          "parámetros",
          "cabeceras",
          "módulos"
        ],
        "correctOption": "argumentos",
        "explanation": "Los argumentos son los datos reales que alimentan a los parámetros.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l02-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: fun info(item: String, precio: Double) { println(\"$item $$precio\") }; info(\"Café\", 2.50) ?",
        "code": "",
        "options": [
          "Café $2.5",
          "Café 2.5",
          "item precio",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Los argumentos se emparejan por posición: item=\"Café\" y precio=2.5.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l02-e08",
        "type": "code_builder",
        "prompt": "Invoca la función mostrarEdad pasando el argumento 25:",
        "tokens": [
          "mostrarEdad",
          "(",
          "25",
          ")"
        ],
        "solution": [
          "mostrarEdad",
          "(",
          "25",
          ")"
        ],
        "explanation": "Invocación pasando el valor numérico 25.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error por omisión del tipo de dato en el parámetro:",
        "codeSnippet": [
          "fun calcular(base) { // Error: falta especificar el tipo (ej. base: Int)",
          "    println(base * 2)",
          "}"
        ],
        "bugLineIndex": 0,
        "explanation": "En Kotlin no hay inferencia en los parámetros de funciones; el tipo debe ser explícito.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l02-e10",
        "type": "predict_output",
        "prompt": "¿Qué ocurre si una función espera 2 argumentos y la invocas pasando solo 1 (sin valores por defecto)?",
        "code": "",
        "options": [
          "Error de compilación por falta de argumentos requeridos",
          "El segundo argumento se vuelve 0 automáticamente",
          "Se ejecuta a medias",
          "La computadora inventa el segundo argumento"
        ],
        "correctOptionIndex": 0,
        "explanation": "El compilador exige que la cantidad y tipo de argumentos coincida con los parámetros declarados.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u06-l03",
    "path": "kotlin",
    "unit": 6,
    "level": 3,
    "title": "3. Valores de retorno con return",
    "description": "Una función puede procesar datos y devolver un resultado al código que la invocó utilizando la palabra clave return y especificando el tipo de retorno en su cabecera.",
    "exercises": [
      {
        "id": "kt-u06-l03-e01",
        "type": "predict_output",
        "prompt": "¿Qué valor se guardará en la variable r?",
        "code": "fun triple(n: Int): Int {\n    return n * 3\n}\nfun main() {\n    val r = triple(4)\n    println(r)\n}",
        "options": [
          "12",
          "4",
          "n * 3",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "triple(4) calcula 4 * 3 = 12 y lo devuelve con return, guardándose en r.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l03-e02",
        "type": "code_cloze",
        "prompt": "La palabra clave para devolver un valor desde una función es ___:",
        "codeWithBlank": "fun cuadrado(x: Int): Int {\n    ___ x * x\n}",
        "options": [
          "return",
          "send",
          "output",
          "give"
        ],
        "correctOption": "return",
        "explanation": "return envía el resultado de regreso al punto donde se llamó a la función.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l03-e03",
        "type": "code_builder",
        "prompt": "Construye la cabecera de una función que devuelve un valor de tipo Double:",
        "tokens": [
          "fun",
          "calcularArea",
          "(",
          ")",
          ":",
          "Double",
          "{",
          "}"
        ],
        "solution": [
          "fun",
          "calcularArea",
          "(",
          ")",
          ":",
          "Double",
          "{",
          "}"
        ],
        "explanation": "Los dos puntos y el tipo : Double definen el tipo de retorno de la función.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con error por omitir el return requerido:",
        "codeSnippet": [
          "fun multiplicar(a: Int, b: Int): Int {",
          "    a * b // Error: falta la palabra clave return",
          "}"
        ],
        "bugLineIndex": 1,
        "explanation": "En funciones con bloque de llaves { }, el valor devuelto debe ir precedido de return.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja los elementos del retorno de funciones:",
        "pairs": [
          {
            "left": ": String",
            "right": "Especifica que la función devolverá texto"
          },
          {
            "left": "return res",
            "right": "Devuelve la variable res y termina la función"
          },
          {
            "left": "val x = f()",
            "right": "Almacena el valor retornado en la variable x"
          },
          {
            "left": "println(f())",
            "right": "Imprime directamente el valor retornado por la función"
          }
        ],
        "explanation": "Manejo y captura de valores retornados por funciones.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l03-e06",
        "type": "code_cloze",
        "prompt": "Cuando una función ejecuta la sentencia return, su ejecución finaliza de forma ___:",
        "codeWithBlank": "La instrucción return provoca la salida ___ de la función.",
        "options": [
          "inmediata",
          "retrasada",
          "aleatoria",
          "pausada"
        ],
        "correctOption": "inmediata",
        "explanation": "return cede el control al llamador de forma instantánea.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l03-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de este código con cuerpo de expresión?",
        "code": "fun doble(x: Int) = x * 2\nfun main() {\n    println(doble(5))\n}",
        "options": [
          "10",
          "5",
          "x * 2",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "La sintaxis compacta con = infiere el retorno y calcula 5 * 2 = 10.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l03-e08",
        "type": "code_builder",
        "prompt": "Construye el retorno del valor booleano true:",
        "tokens": [
          "return",
          "true"
        ],
        "solution": [
          "return",
          "true"
        ],
        "explanation": "Retorna directamente un valor literal.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el código inalcanzable tras el return:",
        "codeSnippet": [
          "fun test(): Int {",
          "    return 10",
          "    println(\"Fin\") // Error: código inalcanzable tras return"
        ],
        "bugLineIndex": 2,
        "explanation": "Al ejecutarse return 10, la función sale y la línea println jamás se alcanzará.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l03-e10",
        "type": "predict_output",
        "prompt": "Si tenemos: fun f(n: Int): Int { if (n > 0) return 1 else return -1 }; ¿qué devuelve f(-5)?",
        "code": "",
        "options": [
          "-1",
          "1",
          "0",
          "-5"
        ],
        "correctOptionIndex": 0,
        "explanation": "-5 > 0 es false, por lo que entra al else y devuelve -1.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u06-l04",
    "path": "kotlin",
    "unit": 6,
    "level": 4,
    "title": "4. Funciones con retorno y funciones Unit",
    "description": "Las funciones que realizan acciones pero no devuelven ningún dato útil tienen como tipo de retorno Unit (el equivalente de void en Java o C), el cual puede omitirse de la cabecera.",
    "exercises": [
      {
        "id": "kt-u06-l04-e01",
        "type": "predict_output",
        "prompt": "Si una función en Kotlin no especifica tipo de retorno, ¿cuál es su tipo implícito?",
        "code": "",
        "options": [
          "Unit",
          "void",
          "Nothing",
          "Any"
        ],
        "correctOptionIndex": 0,
        "explanation": "Kotlin asigna Unit automáticamente por defecto a toda función que no declara retorno.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l04-e02",
        "type": "code_cloze",
        "prompt": "El tipo que representa que una función no devuelve ningún valor útil en Kotlin es ___:",
        "codeWithBlank": "fun log(msg: String): ___ { println(msg) }",
        "options": [
          "Unit",
          "void",
          "Null",
          "Empty"
        ],
        "correctOption": "Unit",
        "explanation": "Unit es el tipo oficial de Kotlin para funciones sin retorno de datos.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l04-e03",
        "type": "code_builder",
        "prompt": "Declara una función con retorno explícito Unit:",
        "tokens": [
          "fun",
          "apagar()",
          ":",
          "Unit",
          "{",
          "}"
        ],
        "solution": [
          "fun",
          "apagar()",
          ":",
          "Unit",
          "{",
          "}"
        ],
        "explanation": "Declaración formal con Unit explícito.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica el error por usar void (de Java) en vez de Unit en Kotlin:",
        "codeSnippet": [
          "fun limpiar(): void { // Error: en Kotlin no existe void, es Unit o se omite",
          "    println(\"Limpio\")",
          "}"
        ],
        "bugLineIndex": 0,
        "explanation": "void pertenece a lenguajes como Java o C; en Kotlin se utiliza Unit.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la cabecera de la función con su clasificación:",
        "pairs": [
          {
            "left": "fun calcular(): Double",
            "right": "Función con retorno de valor (Double)"
          },
          {
            "left": "fun mostrar(): Unit",
            "right": "Función Unit (realiza acción sin devolver dato)"
          },
          {
            "left": "fun iniciar()",
            "right": "Función Unit con tipo omitido por convención"
          },
          {
            "left": "return Unit",
            "right": "Retorno opcional al final de una función Unit"
          }
        ],
        "explanation": "Diferencia entre funciones productoras de datos y funciones de efecto colateral.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l04-e06",
        "type": "code_cloze",
        "prompt": "En el código idiomático de Kotlin, escribir : Unit en la cabecera se suele ___:",
        "codeWithBlank": "El tipo Unit por buena práctica se suele ___.",
        "options": [
          "omitir",
          "duplicar",
          "prohibir",
          "encriptar"
        ],
        "correctOption": "omitir",
        "explanation": "Omitir : Unit produce código más limpio y conciso sin perder seguridad de tipos.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué imprimirá: val res = println(\"Hola\"); println(res); ?",
        "code": "",
        "options": [
          "Hola\nkotlin.Unit",
          "Hola",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "println devuelve Unit, por lo que imprimir su resultado muestra \"kotlin.Unit\".",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l04-e08",
        "type": "code_builder",
        "prompt": "Construye una función con retorno de valor booleano:",
        "tokens": [
          "fun",
          "esMayor(edad: Int)",
          ":",
          "Boolean",
          "{",
          "return edad >= 18",
          "}"
        ],
        "solution": [
          "fun",
          "esMayor(edad: Int)",
          ":",
          "Boolean",
          "{",
          "return edad >= 18",
          "}"
        ],
        "explanation": "Función con retorno de tipo Boolean.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la incoherencia de tipo en el retorno:",
        "codeSnippet": [
          "fun saludar(): Unit {",
          "    return \"Hola\" // Error: la función está declarada como Unit pero devuelve un String",
          "}"
        ],
        "bugLineIndex": 1,
        "explanation": "Si una función es Unit, no puede retornar una cadena con return \"Hola\".",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l04-e10",
        "type": "predict_output",
        "prompt": "¿Por qué Kotlin usa el objeto Unit en lugar de la palabra clave void de Java?",
        "code": "",
        "options": [
          "Porque al ser un tipo y objeto real, se integra uniformemente con el sistema genérico de tipos",
          "Porque Unit gasta menos batería",
          "Porque void es una palabra muy larga",
          "Porque la JVM no entiende void"
        ],
        "correctOptionIndex": 0,
        "explanation": "Unit permite que las funciones sin retorno puedan ser tratadas como tipos genéricos uniformes.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u06-l05",
    "path": "kotlin",
    "unit": 6,
    "level": 5,
    "title": "5. Parámetros predeterminados y argumentos con nombre",
    "description": "Kotlin permite asignar valores por defecto a los parámetros en la definición y pasar argumentos especificando su nombre al invocarlos, evitando sobrecargar funciones innecesariamente.",
    "exercises": [
      {
        "id": "kt-u06-l05-e01",
        "type": "predict_output",
        "prompt": "¿Qué imprimirá si llamamos a saludar() sin pasar argumentos?",
        "code": "fun saludar(msg: String = \"Hola\") {\n    println(msg)\n}\nfun main() {\n    saludar()\n}",
        "options": [
          "Hola",
          "msg",
          "null",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Al omitir el argumento, la función utiliza su valor por defecto (\"Hola\").",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l05-e02",
        "type": "code_cloze",
        "prompt": "Para asignar un valor por defecto a un parámetro en la definición usamos el símbolo ___:",
        "codeWithBlank": "fun conectar(puerto: Int ___ 8080)",
        "options": [
          "=",
          ":",
          "->",
          "=="
        ],
        "correctOption": "=",
        "explanation": "El signo igual = en la cabecera asigna el valor predeterminado del parámetro.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l05-e03",
        "type": "code_builder",
        "prompt": "Construye la invocación especificando el argumento con nombre:",
        "tokens": [
          "configurar",
          "(",
          "timeout",
          "=",
          "5000",
          ")"
        ],
        "solution": [
          "configurar",
          "(",
          "timeout",
          "=",
          "5000",
          ")"
        ],
        "explanation": "Sintaxis de invocación con argumento con nombre.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica el error en la invocación mezclada:",
        "codeSnippet": [
          "fun ventana(ancho: Int, alto: Int, titulo: String) { }",
          "ventana(ancho = 800, 600, \"App\") // Error: argumento posicional tras argumento con nombre"
        ],
        "bugLineIndex": 1,
        "explanation": "Una vez que usas un argumento con nombre, todos los argumentos subsiguientes deben ser nombrados.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la técnica con su beneficio de diseño:",
        "pairs": [
          {
            "left": "Parámetros por defecto",
            "right": "Evita la sobrecarga repetitiva de múltiples métodos"
          },
          {
            "left": "Argumentos con nombre",
            "right": "Evita confundir parámetros del mismo tipo en la llamada"
          },
          {
            "left": "Orden flexible",
            "right": "Permite pasar argumentos en cualquier orden nombrando los parámetros"
          },
          {
            "left": "Llamada concisa",
            "right": "Permite omitir parámetros secundarios opcionales"
          }
        ],
        "explanation": "Ventajas de los argumentos con nombre y parámetros por defecto en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l05-e06",
        "type": "code_cloze",
        "prompt": "Los argumentos con nombre permiten enviar los datos en cualquier ___ en la llamada:",
        "codeWithBlank": "Con argumentos con nombre, no importa el ___ de los parámetros.",
        "options": [
          "orden",
          "tipo",
          "archivo",
          "bloque"
        ],
        "correctOption": "orden",
        "explanation": "Al asociar explícitamente nombre = valor, el orden posicional deja de ser estricto.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l05-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: fun suma(a: Int = 1, b: Int = 2) = a + b; println(suma(b = 5)); ?",
        "code": "",
        "options": [
          "6",
          "5",
          "3",
          "7"
        ],
        "correctOptionIndex": 0,
        "explanation": "a toma su valor por defecto (1) y b recibe 5 nombrado; 1 + 5 = 6.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la definición de un parámetro con valor por defecto true:",
        "tokens": [
          "activo:",
          "Boolean",
          "=",
          "true"
        ],
        "solution": [
          "activo:",
          "Boolean",
          "=",
          "true"
        ],
        "explanation": "Define el tipo y su valor por defecto.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el nombre de parámetro inexistente en la invocación:",
        "codeSnippet": [
          "fun registrar(usuario: String, clave: String) { }",
          "registrar(usuario = \"admin\", password = \"123\") // Error: el parámetro se llama \"clave\", no \"password\""
        ],
        "bugLineIndex": 1,
        "explanation": "El nombre del argumento en la llamada debe coincidir exactamente con el nombre en la función.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l05-e10",
        "type": "predict_output",
        "prompt": "¿Qué imprime: fun f(a: Int = 10, b: Int = 20) = println(\"$a-$b\"); f(b = 99); ?",
        "code": "",
        "options": [
          "10-99",
          "99-20",
          "10-20",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "a usa su valor por defecto 10 y b recibe 99, imprimiendo \"10-99\".",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u06-l06",
    "path": "kotlin",
    "unit": 6,
    "level": 6,
    "title": "6. Variables locales y alcance",
    "description": "El alcance léxico (scope) determina la visibilidad y vida de una variable. Las variables declaradas dentro de una función o bloque { } son locales y dejan de existir fuera de él.",
    "exercises": [
      {
        "id": "kt-u06-l06-e01",
        "type": "predict_output",
        "prompt": "¿Qué ocurrirá al intentar compilar este código?",
        "code": "fun demo() {\n    val local = \"Dato\"\n}\nfun main() {\n    println(local)\n}",
        "options": [
          "Error de compilación: Unresolved reference: local",
          "Imprime \"Dato\"",
          "Imprime null",
          "Imprime demo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La variable local pertenece al ámbito de demo() y no existe dentro de main().",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l06-e02",
        "type": "code_cloze",
        "prompt": "La región del programa donde una variable es visible y accesible se llama su ___:",
        "codeWithBlank": "El ámbito o visibilidad de una variable se denomina ___.",
        "options": [
          "alcance o scope",
          "paquete",
          "módulo",
          "puntero"
        ],
        "correctOption": "alcance o scope",
        "explanation": "Scope define la frontera dentro de la cual la variable puede utilizarse.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l06-e03",
        "type": "code_builder",
        "prompt": "Construye una variable local temporal dentro de un bloque if:",
        "tokens": [
          "if",
          "(true)",
          "{",
          "val",
          "temp",
          "=",
          "10",
          "}"
        ],
        "solution": [
          "if",
          "(true)",
          "{",
          "val",
          "temp",
          "=",
          "10",
          "}"
        ],
        "explanation": "temp solo existirá dentro de las llaves del if.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea donde se intenta usar una variable fuera de su bloque de vida:",
        "codeSnippet": [
          "if (true) {",
          "    val resultado = 100",
          "}",
          "println(resultado) // Error: resultado solo existe dentro del if anterior"
        ],
        "bugLineIndex": 3,
        "explanation": "Al cerrarse la llave } del if, la variable resultado es destruida de la memoria.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja el tipo de variable con su visibilidad:",
        "pairs": [
          {
            "left": "Variable local",
            "right": "Visible únicamente dentro de su función o bloque"
          },
          {
            "left": "Parámetro de función",
            "right": "Visible en todo el cuerpo de esa función"
          },
          {
            "left": "Variable global / archivo",
            "right": "Accesible desde cualquier función del archivo"
          },
          {
            "left": "Fin del bloque }",
            "right": "Destrucción de las variables locales creadas adentro"
          }
        ],
        "explanation": "Reglas fundamentales del alcance léxico de variables.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l06-e06",
        "type": "code_cloze",
        "prompt": "Una variable declarada dentro de un ciclo for solo existe ___ del ciclo:",
        "codeWithBlank": "Las variables de control del bucle viven ___ del for.",
        "options": [
          "dentro",
          "fuera",
          "al final",
          "en la nube"
        ],
        "correctOption": "dentro",
        "explanation": "Su tiempo de vida termina en cuanto el bucle finaliza su última vuelta.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l06-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de este programa con variables locales independientes?",
        "code": "val x = 10\nfun main() {\n    val x = 20\n    println(x)\n}",
        "options": [
          "20",
          "10",
          "30",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "La variable local x de main() (20) oculta (shadowing) a la variable externa, imprimiendo 20.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l06-e08",
        "type": "code_builder",
        "prompt": "Declara una variable local x dentro de la función:",
        "tokens": [
          "fun",
          "probar()",
          "{",
          "val",
          "x",
          "=",
          "5",
          "}"
        ],
        "solution": [
          "fun",
          "probar()",
          "{",
          "val",
          "x",
          "=",
          "5",
          "}"
        ],
        "explanation": "x es una variable local confinada a probar().",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error de redeclaración en el mismo alcance:",
        "codeSnippet": [
          "val id = 1",
          "val id = 2 // Error: no se puede redeclarar la misma variable en el mismo ámbito",
          "println(id)"
        ],
        "bugLineIndex": 1,
        "explanation": "Dentro del mismo scope no pueden coexistir dos variables con el mismo identificador.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l06-e10",
        "type": "predict_output",
        "prompt": "¿Qué ventaja tiene que las variables locales se destruyan al salir de su función?",
        "code": "",
        "options": [
          "Libera memoria RAM y evita que otras partes del código alteren datos por accidente",
          "Hace que la computadora se caliente menos",
          "Obliga al programador a escribir más lento",
          "Hace que las variables cambien de color"
        ],
        "correctOptionIndex": 0,
        "explanation": "La gestión automática de memoria y el encapsulamiento previenen errores de estado.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u06-l07",
    "path": "kotlin",
    "unit": 6,
    "level": 7,
    "title": "7. Dividir un problema en funciones",
    "description": "El principio de \"divide y vencerás\" (descomposición algorítmica): transformar un problema complejo en múltiples funciones pequeñas, especializadas, legibles y fácilmente testeables.",
    "exercises": [
      {
        "id": "kt-u06-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el beneficio primordial de dividir un programa en funciones pequeñas?",
        "code": "",
        "options": [
          "Facilita la lectura, el mantenimiento y la reutilización de código limpio",
          "Hace que el archivo ejecutable ocupe el doble de espacio",
          "Permite que el computador funcione sin electricidad",
          "Obliga a reiniciar la máquina tras cada llamada"
        ],
        "correctOptionIndex": 0,
        "explanation": "La descomposición modular es la base de la ingeniería de software profesional.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l07-e02",
        "type": "code_cloze",
        "prompt": "El principio que dice que una función debe encargarse de una única tarea se llama principio de ___ única:",
        "codeWithBlank": "Cada función debe tener una sola ___.",
        "options": [
          "responsabilidad",
          "variable",
          "interfaz",
          "salida"
        ],
        "correctOption": "responsabilidad",
        "explanation": "El Principio de Responsabilidad Única (SRP) previene funciones monstruosas y difíciles de depurar.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l07-e03",
        "type": "code_builder",
        "prompt": "Construye la coordinación modular en main invocando las dos etapas:",
        "tokens": [
          "val",
          "datos",
          "=",
          "cargar()",
          ";",
          "procesar(datos)"
        ],
        "solution": [
          "val",
          "datos",
          "=",
          "cargar()",
          ";",
          "procesar(datos)"
        ],
        "explanation": "main actúa como director de orquesta coordinando las funciones.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la mala práctica en la función monolítica:",
        "codeSnippet": [
          "fun procesarTodo() {",
          "    // Lee archivos, calcula nóminas, envía correos, imprime y formatea la pantalla",
          "    // Mala práctica: hace demasiadas tareas no relacionadas en una sola función",
          "}"
        ],
        "bugLineIndex": 1,
        "explanation": "Una función que mezcla lectura, cálculos y notificaciones viola el principio de responsabilidad única.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la función especializada con su tarea única:",
        "pairs": [
          {
            "left": "obtenerEntrada()",
            "right": "Responsable exclusivamente de leer los datos iniciales"
          },
          {
            "left": "calcularDescuento()",
            "right": "Responsable exclusivamente de la matemática del descuento"
          },
          {
            "left": "imprimirRecibo()",
            "right": "Responsable exclusivamente de formatear y emitir el reporte"
          },
          {
            "left": "validarEdad()",
            "right": "Responsable exclusivamente de verificar si cumple el requisito"
          }
        ],
        "explanation": "Descomposición clara de responsabilidades en funciones pequeñas.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l07-e06",
        "type": "code_cloze",
        "prompt": "La técnica de dividir un problema grande en partes más pequeñas se conoce como divide y ___:",
        "codeWithBlank": "El enfoque algorítmico se denomina divide y ___.",
        "options": [
          "vencerás",
          "multiplicarás",
          "borrarás",
          "ocultarás"
        ],
        "correctOption": "vencerás",
        "explanation": "Divide y vencerás es la estrategia dorada para simplificar problemas complejos.",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l07-e07",
        "type": "predict_output",
        "prompt": "Si tenemos: fun f1() = 2; fun f2(x: Int) = x * 3; println(f2(f1())); ¿qué se imprime?",
        "code": "",
        "options": [
          "6",
          "2",
          "3",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "f1() devuelve 2, y f2(2) calcula 2 * 3 = 6 (composición de funciones).",
        "xpReward": 10
      },
      {
        "id": "kt-u06-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la llamada compuesta de validación y guardado:",
        "tokens": [
          "if",
          "(validar(usuario))",
          "guardar(usuario)"
        ],
        "solution": [
          "if",
          "(validar(usuario))",
          "guardar(usuario)"
        ],
        "explanation": "Composición clara de funciones modulares.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error de acoplamiento innecesario:",
        "codeSnippet": [
          "fun sumar(a: Int, b: Int): Int {",
          "    println(\"Calculando\") // Mala práctica: mezclar lógica pura con impresión en consola",
          "    return a + b",
          "}"
        ],
        "bugLineIndex": 1,
        "explanation": "Las funciones de cálculo puro no deben acoplarse con salidas a consola para ser testeables.",
        "xpReward": 15
      },
      {
        "id": "kt-u06-l07-e10",
        "type": "predict_output",
        "prompt": "¿Por qué las funciones pequeñas son más fáciles de testear?",
        "code": "",
        "options": [
          "Porque tienen entradas y salidas predecibles y enfocadas en una sola labor",
          "Porque ocupan menos letras en el teclado",
          "Porque el compilador las optimiza los fines de semana",
          "Porque no necesitan tipos de datos"
        ],
        "correctOptionIndex": 0,
        "explanation": "El aislamiento de responsabilidades permite probar cada función por separado con total confianza.",
        "xpReward": 10
      }
    ]
  }
];
