import { Lesson } from '../../../types/lesson';

export const KOTLIN_UNIT_02_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u02-l01",
    "path": "kotlin",
    "unit": 2,
    "level": 1,
    "title": "1. Declaración y asignación de variables",
    "description": "Una variable es un contenedor con nombre en la memoria RAM que almacena un dato para usarlo o modificarlo durante la ejecución del programa.",
    "exercises": [
      {
        "id": "kt-u02-l01-e01",
        "type": "predict_output",
        "prompt": "¿Qué valor se imprimirá en consola al ejecutar este código?",
        "code": "val puntos = 50\nprintln(puntos)",
        "options": [
          "50",
          "puntos",
          "val puntos",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "println imprime el valor almacenado en la variable puntos, que es 50.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l01-e02",
        "type": "code_cloze",
        "prompt": "El símbolo que se utiliza para asignar un valor a una variable en Kotlin es ___:",
        "codeWithBlank": "val nivel ___ 1",
        "options": [
          "=",
          "==",
          "->",
          ":"
        ],
        "correctOption": "=",
        "explanation": "El signo igual simple = es el operador de asignación en Kotlin.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l01-e03",
        "type": "code_builder",
        "prompt": "Construye la declaración de una variable llamada vidas con valor inicial 3:",
        "tokens": [
          "val",
          "vidas",
          "=",
          "3"
        ],
        "solution": [
          "val",
          "vidas",
          "=",
          "3"
        ],
        "explanation": "val vidas = 3 declara la variable inmutable vidas con el número 3.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea donde se intenta usar una variable no declarada:",
        "codeSnippet": [ "val base = 10", "println(altura)", "val altura = 5" ],
        "bugLineIndex": 1,
        "explanation": "En Kotlin no puedes acceder a una variable antes de su declaración.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja los términos de variables con su significado:",
        "pairs": [
          {
            "left": "Identificador",
            "right": "El nombre que le damos a la variable"
          },
          {
            "left": "Valor",
            "right": "El dato concreto guardado en la memoria"
          },
          {
            "left": "Operador =",
            "right": "Asigna el valor de la derecha a la variable de la izquierda"
          },
          {
            "left": "Memoria RAM",
            "right": "Lugar físico donde se almacenan las variables en ejecución"
          }
        ],
        "explanation": "Conceptos fundamentales sobre el ciclo de vida de una variable.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l01-e06",
        "type": "code_cloze",
        "prompt": "Al declarar val total = 100, la palabra total corresponde al ___ de la variable:",
        "codeWithBlank": "El nombre que identifica a la variable se llama ___.",
        "options": [
          "nombre o identificador",
          "tipo",
          "operador",
          "salto"
        ],
        "correctOption": "nombre o identificador",
        "explanation": "El identificador permite referenciar el dato posteriormente en el código.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l01-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: val precio = 80; println(precio); ?",
        "code": "",
        "options": [
          "80",
          "precio",
          "val",
          "0"
        ],
        "correctOptionIndex": 0,
        "explanation": "Se almacena 80 en precio y se emite en consola.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l01-e08",
        "type": "code_builder",
        "prompt": "Ordena los tokens para declarar el saldo inicial de una cuenta:",
        "tokens": [
          "val",
          "saldo",
          "=",
          "1500"
        ],
        "solution": [
          "val",
          "saldo",
          "=",
          "1500"
        ],
        "explanation": "Sintaxis básica de declaración y asignación.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error en la sintaxis de asignación:",
        "codeSnippet": [ "val edad = 25", "50 = val puntos", "val activo = true" ],
        "bugLineIndex": 1,
        "explanation": "La variable de destino siempre debe ir a la izquierda del operador =.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l01-e10",
        "type": "predict_output",
        "prompt": "Si declaramos val x = 7; val y = x; println(y); ¿qué se muestra?",
        "code": "",
        "options": [
          "7",
          "x",
          "y",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "La variable y toma una copia del valor de x en ese momento, es decir, 7.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u02-l02",
    "path": "kotlin",
    "unit": 2,
    "level": 2,
    "title": "2. Diferencia entre val y var",
    "description": "En Kotlin, val define variables inmutables (de solo lectura, no reasignables), mientras que var define variables mutables (su valor puede cambiar).",
    "exercises": [
      {
        "id": "kt-u02-l02-e01",
        "type": "predict_output",
        "prompt": "¿Qué ocurre al compilar este código en Kotlin?",
        "code": "val maximo = 100\nmaximo = 200\nprintln(maximo)",
        "options": [
          "Error de compilación: Val cannot be reassigned",
          "Imprime 200",
          "Imprime 100",
          "Imprime null"
        ],
        "correctOptionIndex": 0,
        "explanation": "Las variables val son inmutables de solo lectura y no permiten ser reasignadas.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l02-e02",
        "type": "code_cloze",
        "prompt": "Para una variable cuyo valor deba cambiar a lo largo del tiempo usamos la palabra clave ___:",
        "codeWithBlank": "___ contador = 0\ncontador = contador + 1",
        "options": [
          "var",
          "val",
          "const",
          "let"
        ],
        "correctOption": "var",
        "explanation": "var permite la reasignación de nuevos valores a la variable.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l02-e03",
        "type": "code_builder",
        "prompt": "Construye la declaración inmutable del nombre de una ciudad:",
        "tokens": [
          "val",
          "ciudad",
          "=",
          "\"Cartago\""
        ],
        "solution": [
          "val",
          "ciudad",
          "=",
          "\"Cartago\""
        ],
        "explanation": "Al no cambiar el nombre, val es la mejor opción de diseño.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que provocará un error de reasignación prohibida:",
        "codeSnippet": [ "val dni = \"12345678\"", "dni = \"87654321\"", "println(dni)" ],
        "bugLineIndex": 1,
        "explanation": "dni se declaró con val, por lo que reasignarle un nuevo valor es ilegal en Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada palabra clave con su regla de mutabilidad:",
        "pairs": [
          {
            "left": "val",
            "right": "Inmutable (solo lectura, no se puede cambiar)"
          },
          {
            "left": "var",
            "right": "Mutable (se puede reasignar un nuevo valor)"
          },
          {
            "left": "Regla de oro",
            "right": "Usar val por defecto siempre que sea posible"
          },
          {
            "left": "Reasignación",
            "right": "Guardar un nuevo dato en una variable var existente"
          }
        ],
        "explanation": "Diferenciar val y var es uno de los conceptos más distintivos de Kotlin.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l02-e06",
        "type": "code_cloze",
        "prompt": "Si declaras val clave = \"1234\", el valor \"1234\" es ___:",
        "codeWithBlank": "El valor de una variable val es ___.",
        "options": [
          "inmutable",
          "mutable",
          "aleatorio",
          "opcional"
        ],
        "correctOption": "inmutable",
        "explanation": "Inmutable significa que no puede ser alterado tras su inicialización.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l02-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado de este código?",
        "code": "var puntaje = 10\npuntaje = 20\nprintln(puntaje)",
        "options": [
          "20",
          "10",
          "30",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Como puntaje es var, su valor se actualiza a 20 con éxito.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l02-e08",
        "type": "code_builder",
        "prompt": "Declara una variable mutable llamada temperatura con valor inicial 22:",
        "tokens": [
          "var",
          "temperatura",
          "=",
          "22"
        ],
        "solution": [
          "var",
          "temperatura",
          "=",
          "22"
        ],
        "explanation": "Usa var porque la temperatura cambia continuamente.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la variable que debería ser val por buena práctica:",
        "codeSnippet": [
          "var PI = 3.14159 // Mala práctica: una constante matemática nunca debe cambiar",
          "var pasos = 0",
          "pasos = pasos + 10"
        ],
        "bugLineIndex": 0,
        "explanation": "El valor de PI es fijo e inmutable, por lo que debe declararse con val.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l02-e10",
        "type": "predict_output",
        "prompt": "¿Por qué la comunidad de Kotlin recomienda preferir val sobre var?",
        "code": "",
        "options": [
          "Porque reduce errores inesperados al garantizar que los datos no cambiarán por sorpresa",
          "Porque las variables var no funcionan en computadoras portátiles",
          "Porque val hace que el código sea de color verde en la pantalla",
          "Porque var solo permite almacenar números pares"
        ],
        "correctOptionIndex": 0,
        "explanation": "La inmutabilidad elimina efectos secundarios y hace el código predecible.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u02-l03",
    "path": "kotlin",
    "unit": 2,
    "level": 3,
    "title": "3. Tipos: Int, Double, Boolean, Char y String",
    "description": "Los tipos de datos indican al compilador qué clase de información contiene una variable: números enteros (Int), decimales (Double), valores de verdad (Boolean), caracteres individuales (Char) o texto (String).",
    "exercises": [
      {
        "id": "kt-u02-l03-e01",
        "type": "predict_output",
        "prompt": "¿Qué tipo de dato corresponde al valor 19.95 en Kotlin?",
        "code": "",
        "options": [
          "Double",
          "Int",
          "String",
          "Boolean"
        ],
        "correctOptionIndex": 0,
        "explanation": "Los números con parte decimal se representan por defecto como Double en Kotlin.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l03-e02",
        "type": "code_cloze",
        "prompt": "El tipo de dato que solo puede tener valores true o false se llama ___:",
        "codeWithBlank": "val activo: ___ = true",
        "options": [
          "Boolean",
          "Int",
          "Char",
          "String"
        ],
        "correctOption": "Boolean",
        "explanation": "Boolean representa valores lógicos booleanos de verdad o falsedad.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l03-e03",
        "type": "code_builder",
        "prompt": "Construye la declaración de un carácter con comillas simples:",
        "tokens": [
          "val",
          "letra:",
          "Char",
          "=",
          "'Z'"
        ],
        "solution": [
          "val",
          "letra:",
          "Char",
          "=",
          "'Z'"
        ],
        "explanation": "Char se declara con comillas simples y almacena un solo carácter.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con error en el delimitador de caracteres:",
        "codeSnippet": [ "val edad: Int = 20", "val inicial: Char = \"M\"", "val activo: Boolean = false" ],
        "bugLineIndex": 1,
        "explanation": "En Kotlin, las comillas dobles \"\" son exclusivas de String; Char requiere comillas simples ''.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada valor con su tipo correspondiente en Kotlin:",
        "pairs": [
          {
            "left": "42",
            "right": "Int"
          },
          {
            "left": "3.14",
            "right": "Double"
          },
          {
            "left": "'X'",
            "right": "Char"
          },
          {
            "left": "\"Hola\"",
            "right": "String"
          }
        ],
        "explanation": "Reconocer los tipos primitivos básicos es esencial para estructurar datos.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l03-e06",
        "type": "code_cloze",
        "prompt": "Una secuencia de caracteres entre comillas dobles pertenece al tipo ___:",
        "codeWithBlank": "val saludo: ___ = \"Bienvenidos\"",
        "options": [
          "String",
          "Char",
          "Int",
          "Double"
        ],
        "correctOption": "String",
        "explanation": "String almacena secuencias de texto de cualquier longitud.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l03-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: val activo = false; println(!activo); ?",
        "code": "",
        "options": [
          "true",
          "false",
          "!activo",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "El operador ! niega el valor booleano: !false se convierte en true.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l03-e08",
        "type": "code_builder",
        "prompt": "Declara explícitamente un entero llamado nivel con valor 5:",
        "tokens": [
          "val",
          "nivel:",
          "Int",
          "=",
          "5"
        ],
        "solution": [
          "val",
          "nivel:",
          "Int",
          "=",
          "5"
        ],
        "explanation": "Sintaxis con anotación explícita de tipo Int.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error de asignación de tipo incompatible:",
        "codeSnippet": [ "val altura: Double = 1.75", "val cantidad: Int = 10.5", "val mensaje: String = \"OK\"" ],
        "bugLineIndex": 1,
        "explanation": "No se puede asignar un decimal 10.5 directamente a una variable de tipo entero Int.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l03-e10",
        "type": "predict_output",
        "prompt": "¿Qué valor imprimirá: val res = 10 > 5; println(res); ?",
        "code": "",
        "options": [
          "true",
          "false",
          "10",
          "5"
        ],
        "correctOptionIndex": 0,
        "explanation": "La comparación 10 > 5 es verdadera, por lo que res almacena el booleano true.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u02-l04",
    "path": "kotlin",
    "unit": 2,
    "level": 4,
    "title": "4. Inferencia de tipos y declaración explícita",
    "description": "Kotlin infiere automáticamente el tipo de una variable según el valor inicial asignado, pero también permite declararlo explícitamente con dos puntos (: Tipo).",
    "exercises": [
      {
        "id": "kt-u02-l04-e01",
        "type": "predict_output",
        "prompt": "En la instrucción val costo = 450, ¿qué tipo deduce Kotlin para costo?",
        "code": "",
        "options": [
          "Int",
          "Double",
          "String",
          "Any"
        ],
        "correctOptionIndex": 0,
        "explanation": "Al ser un número entero literal sin decimales, Kotlin infiere estáticamente el tipo Int.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l04-e02",
        "type": "code_cloze",
        "prompt": "Para declarar explícitamente el tipo de una variable se utiliza el símbolo ___:",
        "codeWithBlank": "val nombre___ String = \"Camila\"",
        "options": [
          ":",
          "=",
          "->",
          ";"
        ],
        "correctOption": ":",
        "explanation": "Los dos puntos : preceden a la especificación formal del tipo de dato.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l04-e03",
        "type": "code_builder",
        "prompt": "Construye una variable con declaración explícita de tipo Double:",
        "tokens": [
          "val",
          "peso:",
          "Double",
          "=",
          "68.5"
        ],
        "solution": [
          "val",
          "peso:",
          "Double",
          "=",
          "68.5"
        ],
        "explanation": "Declaración explícita completa con tipo Double.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que provoca error de compilación por falta de tipo o valor:",
        "codeSnippet": [ "val a = 10 // Válido: infiere Int", "val b", "val c: String = \"Hola\" // Válido" ],
        "bugLineIndex": 1,
        "explanation": "Si no hay valor inicial, el compilador no puede inferir el tipo y exige : Tipo explícito.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada declaración con su técnica de tipado:",
        "pairs": [
          {
            "left": "val x = 10",
            "right": "Inferencia de tipo Int"
          },
          {
            "left": "val x: Double = 10.0",
            "right": "Declaración explícita de tipo Double"
          },
          {
            "left": "val x = \"Texto\"",
            "right": "Inferencia de tipo String"
          },
          {
            "left": "val x: Boolean",
            "right": "Declaración de tipo sin inicializar"
          }
        ],
        "explanation": "Comprender inferencia y tipado explícito agiliza la escritura de código.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l04-e06",
        "type": "code_cloze",
        "prompt": "Aunque Kotlin permite inferencia, es un lenguaje de tipado ___ y estático:",
        "codeWithBlank": "Kotlin tiene un sistema de tipos ___.",
        "options": [
          "fuerte",
          "débil",
          "dinámico",
          "impreciso"
        ],
        "correctOption": "fuerte",
        "explanation": "Tipado fuerte significa que el tipo se verifica en compilación y no cambia arbitrariamente.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l04-e07",
        "type": "predict_output",
        "prompt": "Si escribes: val tasa = 0.15; ¿qué tipo infiere el compilador?",
        "code": "",
        "options": [
          "Double",
          "Int",
          "Float",
          "String"
        ],
        "correctOptionIndex": 0,
        "explanation": "Los literales con punto decimal como 0.15 son inferidos automáticamente como Double.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l04-e08",
        "type": "code_builder",
        "prompt": "Construye una variable con tipo explícito Boolean:",
        "tokens": [
          "val",
          "activo:",
          "Boolean",
          "=",
          "true"
        ],
        "solution": [
          "val",
          "activo:",
          "Boolean",
          "=",
          "true"
        ],
        "explanation": "Sintaxis explícita con valor booleano true.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error de incompatibilidad de tipos:",
        "codeSnippet": [ "val id: Int = 100", "val total: Int = \"200\"", "val ok: Boolean = true" ],
        "bugLineIndex": 1,
        "explanation": "\"200\" es un String; no se puede asignar a una variable declarada explícitamente como Int.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l04-e10",
        "type": "predict_output",
        "prompt": "¿Permite Kotlin cambiar el tipo de una variable var después de inferirlo?",
        "code": "",
        "options": [
          "No, una vez inferido el tipo, la variable solo puede almacenar valores de ese mismo tipo",
          "Sí, var puede cambiar de String a Int libremente",
          "Solo si reinicias la computadora",
          "Sí, pero únicamente los días impares"
        ],
        "correctOptionIndex": 0,
        "explanation": "Kotlin es de tipado estático: el tipo fijado al inicio se mantiene durante toda la vida de la variable.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u02-l05",
    "path": "kotlin",
    "unit": 2,
    "level": 5,
    "title": "5. Actualización de valores",
    "description": "Las variables declaradas con var permiten actualizar su contenido asignándoles un nuevo valor del mismo tipo, sobrescribiendo el dato anterior.",
    "exercises": [
      {
        "id": "kt-u02-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el valor final de cuenta tras estas actualizaciones?",
        "code": "var cuenta = 10\ncuenta = cuenta + 5\ncuenta = cuenta * 2\nprintln(cuenta)",
        "options": [
          "30",
          "25",
          "20",
          "15"
        ],
        "correctOptionIndex": 0,
        "explanation": "10 + 5 = 15; luego 15 * 2 = 30.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l05-e02",
        "type": "code_cloze",
        "prompt": "Para poder actualizar el valor de una variable, esta debe haber sido declarada con ___:",
        "codeWithBlank": "___ vidas = 3\nvidas = 2",
        "options": [
          "var",
          "val",
          "const",
          "fix"
        ],
        "correctOption": "var",
        "explanation": "var habilita la mutabilidad para que el dato pueda actualizarse.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l05-e03",
        "type": "code_builder",
        "prompt": "Construye la instrucción para actualizar el saldo restándole 50:",
        "tokens": [
          "saldo",
          "=",
          "saldo",
          "-",
          "50"
        ],
        "solution": [
          "saldo",
          "=",
          "saldo",
          "-",
          "50"
        ],
        "explanation": "Evalúa saldo - 50 y guarda el resultado nuevamente en saldo.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea donde se comete un error de tipo al actualizar:",
        "codeSnippet": [ "var edad = 20", "edad = 21 // Válido", "edad = \"veintidós\"" ],
        "bugLineIndex": 2,
        "explanation": "En Kotlin, una variable no puede cambiar de tipo de dato tras haber sido declarada.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la operación de actualización con su efecto:",
        "pairs": [
          {
            "left": "x = x + 1",
            "right": "Incrementa el valor de x en una unidad"
          },
          {
            "left": "x = x - 1",
            "right": "Decrementa el valor de x en una unidad"
          },
          {
            "left": "x = x * 2",
            "right": "Duplica el valor almacenado en x"
          },
          {
            "left": "x = 0",
            "right": "Sobrescribe x asignándole cero"
          }
        ],
        "explanation": "Patrones típicos de actualización de variables en algoritmos.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l05-e06",
        "type": "code_cloze",
        "prompt": "Cuando asignamos un nuevo valor a una variable var, el valor anterior se ___:",
        "codeWithBlank": "Al asignar un nuevo dato, el valor anterior se ___.",
        "options": [
          "sobrescribe",
          "conserva",
          "duplica",
          "encripta"
        ],
        "correctOption": "sobrescribe",
        "explanation": "El nuevo valor ocupa la posición en memoria eliminando el dato previo.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué imprimirá este programa?",
        "code": "var mensaje = \"Cargando\"\nmensaje = \"Listo\"\nprintln(mensaje)",
        "options": [
          "Listo",
          "Cargando",
          "Cargando Listo",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "El valor de mensaje fue actualizado a \"Listo\" antes de la impresión.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la actualización para duplicar el valor de la variable bonus:",
        "tokens": [
          "bonus",
          "=",
          "bonus",
          "*",
          "2"
        ],
        "solution": [
          "bonus",
          "=",
          "bonus",
          "*",
          "2"
        ],
        "explanation": "bonus = bonus * 2 multiplica por 2 el valor previo.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el error al intentar actualizar una constante:",
        "codeSnippet": [ "val limite = 100", "limite = 150", "println(limite)" ],
        "bugLineIndex": 1,
        "explanation": "val impide la actualización; si necesitas cambiar su valor, declárala con var.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l05-e10",
        "type": "predict_output",
        "prompt": "Si tenemos: var a = 5; var b = 3; a = b; b = 10; println(a); ¿cuánto vale a?",
        "code": "",
        "options": [
          "3",
          "10",
          "5",
          "8"
        ],
        "correctOptionIndex": 0,
        "explanation": "a recibió una copia del valor de b (3). Modificar b después a 10 no afecta a a.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u02-l06",
    "path": "kotlin",
    "unit": 2,
    "level": 6,
    "title": "6. Nombres descriptivos",
    "description": "El uso de identificadores significativos que revelen la intención del dato, siguiendo la convención estándar camelCase de Kotlin.",
    "exercises": [
      {
        "id": "kt-u02-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál de los siguientes identificadores cumple con la convención estándar camelCase de Kotlin?",
        "code": "",
        "options": [
          "fechaDeNacimiento",
          "fecha_de_nacimiento",
          "FechaDeNacimiento",
          "FECHADENACIMIENTO"
        ],
        "correctOptionIndex": 0,
        "explanation": "camelCase inicia en minúscula y pone mayúscula al inicio de cada palabra intermedia.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l06-e02",
        "type": "code_cloze",
        "prompt": "La convención de nomenclatura recomendada en Kotlin para variables es ___:",
        "codeWithBlank": "En Kotlin las variables se nombran en formato ___.",
        "options": [
          "camelCase",
          "snake_case",
          "kebab-case",
          "SCREAMING_SNAKE"
        ],
        "correctOption": "camelCase",
        "explanation": "camelCase es la convención oficial de la guía de estilo de Kotlin.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l06-e03",
        "type": "code_builder",
        "prompt": "Construye la declaración con un nombre descriptivo en camelCase:",
        "tokens": [
          "val",
          "totalAPagar",
          "=",
          "95.5"
        ],
        "solution": [
          "val",
          "totalAPagar",
          "=",
          "95.5"
        ],
        "explanation": "totalAPagar es autoexplicativo y sigue camelCase perfectamente.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la variable con un nombre prohibido por usar espacios:",
        "codeSnippet": [ "val edadUsuario = 25", "val sueldo mensual = 1200.0", "val activo = true" ],
        "bugLineIndex": 1,
        "explanation": "Los identificadores no pueden contener espacios en blanco; debe ser sueldoMensual.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja el nombre pobre con su alternativa descriptiva recomendada:",
        "pairs": [
          {
            "left": "val d",
            "right": "val distanciaEnKilometros"
          },
          {
            "left": "val p",
            "right": "val precioConImpuesto"
          },
          {
            "left": "val usr",
            "right": "val nombreDelUsuario"
          },
          {
            "left": "val temp",
            "right": "val temperaturaAmbiente"
          }
        ],
        "explanation": "Los nombres descriptivos reducen la necesidad de comentarios obvios.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l06-e06",
        "type": "code_cloze",
        "prompt": "Los nombres de variables en Kotlin son sensibles a las mayúsculas, propiedad llamada ___:",
        "codeWithBlank": "Kotlin distingue entre mayúsculas y minúsculas porque es ___.",
        "options": [
          "case-sensitive",
          "case-insensitive",
          "multilínea",
          "dinámico"
        ],
        "correctOption": "case-sensitive",
        "explanation": "edad y Edad representan dos variables totalmente distintas en Kotlin.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l06-e07",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: val precioTotal = 15; println(precioTotal); ?",
        "code": "",
        "options": [
          "15",
          "precioTotal",
          "Total",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Se accede e imprime limpiamente el valor de la variable descriptiva.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l06-e08",
        "type": "code_builder",
        "prompt": "Declara la tasa de descuento con un nombre camelCase adecuado:",
        "tokens": [
          "val",
          "porcentajeDescuento",
          "=",
          "0.10"
        ],
        "solution": [
          "val",
          "porcentajeDescuento",
          "=",
          "0.10"
        ],
        "explanation": "porcentajeDescuento comunica claramente qué dato almacena.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica el nombre de variable que comienza con un número prohibido:",
        "codeSnippet": [ "val primerPuesto = \"Oro\"", "val 2doPuesto = \"Plata\"", "val tercerPuesto = \"Bronce\"" ],
        "bugLineIndex": 1,
        "explanation": "En Kotlin y la mayoría de lenguajes, un identificador nunca puede comenzar con un dígito numérico.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l06-e10",
        "type": "predict_output",
        "prompt": "¿Por qué es preferible escribir \"val edadEstudiante\" en vez de \"val e\"?",
        "code": "",
        "options": [
          "Porque cualquier programador que lea el código entenderá de inmediato qué dato almacena",
          "Porque la computadora procesa más rápido los nombres largos",
          "Porque el compilador rechaza las variables de una sola letra",
          "Porque ahorra espacio en el disco duro"
        ],
        "correctOptionIndex": 0,
        "explanation": "La claridad y legibilidad del código para seres humanos es el estándar moderno de ingeniería de software.",
        "xpReward": 10
      }
    ]
  },
  {
    "id": "kotlin-u02-l07",
    "path": "kotlin",
    "unit": 2,
    "level": 7,
    "title": "7. Interpolación de variables en mensajes",
    "description": "Los String Templates permiten incrustar variables directamente dentro de cadenas de texto usando el símbolo $, y expresiones complejas usando llaves ${expresión}.",
    "exercises": [
      {
        "id": "kt-u02-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida producida por esta interpolación de String Templates?",
        "code": "val producto = \"Teclado\"\nval precio = 25\nprintln(\"El $producto cuesta $precio dólares\")",
        "options": [
          "El Teclado cuesta 25 dólares",
          "El $producto cuesta $precio dólares",
          "El Teclado cuesta dólares",
          "Error de compilación"
        ],
        "correctOptionIndex": 0,
        "explanation": "$producto se reemplaza por \"Teclado\" y $precio por 25 directamente dentro de la cadena.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l07-e02",
        "type": "code_cloze",
        "prompt": "El símbolo que inicia una interpolación de variable en un String Template de Kotlin es ___:",
        "codeWithBlank": "println(\"Hola, ___nombre\")",
        "options": [
          "$",
          "#",
          "&",
          "@"
        ],
        "correctOption": "$",
        "explanation": "El símbolo $ indica a Kotlin que debe evaluar la variable dentro del texto.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l07-e03",
        "type": "code_builder",
        "prompt": "Construye la instrucción para imprimir un mensaje interpolado:",
        "tokens": [
          "println",
          "(",
          "\"Puntaje: $puntos\"",
          ")"
        ],
        "solution": [
          "println",
          "(",
          "\"Puntaje: $puntos\"",
          ")"
        ],
        "explanation": "Sintaxis limpia de interpolación de variables con comillas dobles.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea donde falta ${} para evaluar la suma dentro del texto:",
        "codeSnippet": [ "val a = 5", "val b = 3", "println(\"Total: $a + b\")" ],
        "bugLineIndex": 2,
        "explanation": "Para evaluar una expresión matemática se requieren llaves: \"${a + b}\".",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja la sintaxis de plantilla con su resultado:",
        "pairs": [
          {
            "left": "\"Hola $nombre\"",
            "right": "Inserta el valor directo de la variable nombre"
          },
          {
            "left": "\"Suma: ${x + y}\"",
            "right": "Evalúa la suma y coloca el resultado numérico"
          },
          {
            "left": "\"Precio: $$precio\"",
            "right": "Muestra el símbolo $ seguido del valor de precio"
          },
          {
            "left": "nombre + \" \" + apellido",
            "right": "Concatenación tradicional con operador +"
          }
        ],
        "explanation": "Las plantillas de texto son mucho más legibles y eficientes que la concatenación con +.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l07-e06",
        "type": "code_cloze",
        "prompt": "Para evaluar una expresión compleja dentro de una cadena en Kotlin usamos ${ y cerramos con ___:",
        "codeWithBlank": "println(\"Doble: ${n * 2___\")",
        "options": [
          "}",
          ")",
          "]",
          "$"
        ],
        "correctOption": "}",
        "explanation": "Las expresiones dentro de String Templates se encierran entre llaves ${...}.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué imprimirá: val n = 4; println(\"Resultado: ${n * 3}\"); ?",
        "code": "",
        "options": [
          "Resultado: 12",
          "Resultado: ${n * 3}",
          "Resultado: 4 * 3",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "${n * 3} calcula 4 * 3 = 12 e inserta el resultado en el texto.",
        "xpReward": 10
      },
      {
        "id": "kt-u02-l07-e08",
        "type": "code_builder",
        "prompt": "Construye el template para mostrar el siguiente número con una expresión:",
        "tokens": [
          "println",
          "(",
          "\"Siguiente: ${num + 1}\"",
          ")"
        ],
        "solution": [
          "println",
          "(",
          "\"Siguiente: ${num + 1}\"",
          ")"
        ],
        "explanation": "Usa ${num + 1} para realizar la operación dentro de la cadena.",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con error tipográfico en la sintaxis de template:",
        "codeSnippet": [ "val user = \"Ana\"", "println(\"Bienvenido #{user}\")", "println(\"Conectado\")" ],
        "bugLineIndex": 1,
        "explanation": "Kotlin utiliza el prefijo $, no el símbolo # (utilizado en lenguajes como Ruby).",
        "xpReward": 15
      },
      {
        "id": "kt-u02-l07-e10",
        "type": "predict_output",
        "prompt": "¿Cuál es la salida de: val c = 'K'; println(\"Letra: $c\"); ?",
        "code": "",
        "options": [
          "Letra: K",
          "Letra: 'K'",
          "Letra: $c",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "La variable de tipo Char se interpola sin problemas produciendo \"Letra: K\".",
        "xpReward": 10
      }
    ]
  }
];
