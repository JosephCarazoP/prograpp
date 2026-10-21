import { Lesson } from '../../../types/lesson';

export const KOTLIN_UNIT_09_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u09-l01",
    "path": "kotlin",
    "unit": 9,
    "level": 1,
    "title": "1. Listas y acceso por índice",
    "description": "Crea colecciones ordenadas con listOf() y accede a sus elementos mediante su posición numérica de base cero.",
    "exercises": [
      {
        "id": "kt-u09-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Listas y acceso por índice\"?",
        "code": "val colores = listOf(\"Rojo\", \"Verde\", \"Azul\")\nprintln(colores[1])",
        "options": [
          "Verde",
          "Rojo",
          "Azul",
          "1"
        ],
        "correctOptionIndex": 0,
        "explanation": "listOf(\"A\", \"B\") crea una lista ordenada de lectura.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l01-e02",
        "type": "code_cloze",
        "prompt": "Para crear una lista de solo lectura en Kotlin usamos la función constructora ___():",
        "codeWithBlank": "Para crear una lista de solo lectura en Kotlin usamos la función constructora ___():",
        "options": [
          "listOf",
          "arrayListOf",
          "mutableListOf",
          "setOf"
        ],
        "correctOption": "listOf",
        "explanation": "size devuelve el número total de elementos.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Listas y acceso por índice\":",
        "tokens": [
          "val",
          "lista",
          "=",
          "listOf",
          "(",
          "\"A\"",
          ",",
          "\"B\"",
          ")"
        ],
        "solution": [
          "val",
          "lista",
          "=",
          "listOf",
          "(",
          "\"A\"",
          ",",
          "\"B\"",
          ")"
        ],
        "explanation": "listOf() crea una lista inmutable de solo lectura: no permite agregar ni cambiar elementos tras su creación.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Listas y acceso por índice\":",
        "codeSnippet": [
          "val n = listOf(1, 2)",
          "n.add(3) // Error: listOf() no admite modificaciones"
        ],
        "bugLineIndex": 1,
        "explanation": "Intentar acceder a un índice mayor o igual a size causará un IndexOutOfBoundsException.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Listas y acceso por índice\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Listas y acceso por índice",
            "right": "listOf(\"A\", \"B\") crea una lista ordenada de lectura."
          },
          {
            "left": "Principio 2",
            "right": "size devuelve el número total de elementos."
          },
          {
            "left": "Principio 3",
            "right": "Los índices van desde 0 hasta size - 1."
          },
          {
            "left": "Buena práctica",
            "right": "listOf() crea una lista inmutable de solo lectura: n..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l01-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Listas y acceso por índice\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Listas y acceso por índice\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "listOf() crea una lista inmutable de solo lectura: no permite agregar ni cambiar elementos tras su creación.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Listas y acceso por índice\"?",
        "code": "fun main() {\n    val frutas = listOf(\"Manzana\", \"Plátano\", \"Naranja\")\n    println(\"Lista de frutas: $frutas\")\n    println(\"Primera fruta [0]: ${frutas[0]}\")\n    println(\"Total de elementos: ${frutas.size}\")",
        "options": [
          "Lista de frutas: [Manzana, Plá",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Lista de frutas: [Manzana, Plá",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Listas y acceso por índice\":",
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
        "id": "kt-u09-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Listas y acceso por índice\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Intentar acceder a un índice mayor o igual a size causará un IndexOutOfBoundsException.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Listas y acceso por índice\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Crea colecciones ordenadas con listOf() y accede a s..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Intentar acceder a un índice mayor o igual a size ca..."
          },
          {
            "left": "Recomendación",
            "right": "listOf() crea una lista inmutable de solo lectura: n..."
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
    "id": "kotlin-u09-l02",
    "path": "kotlin",
    "unit": 9,
    "level": 2,
    "title": "2. List y MutableList",
    "description": "Distingue entre listas de solo lectura (List) y listas dinámicas editables (MutableList) que admiten modificaciones.",
    "exercises": [
      {
        "id": "kt-u09-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"List y MutableList\"?",
        "code": "val m = mutableListOf(1, 2)\nm.add(3)\nprintln(m.size)",
        "options": [
          "3",
          "2",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "List es una vista de solo lectura.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l02-e02",
        "type": "code_cloze",
        "prompt": "Para crear una lista en la que podamos agregar y quitar elementos usamos ___():",
        "codeWithBlank": "Para crear una lista en la que podamos agregar y quitar elementos usamos ___():",
        "options": [
          "mutableListOf",
          "listOf",
          "staticListOf",
          "fixedList"
        ],
        "correctOption": "mutableListOf",
        "explanation": "MutableList implementa operaciones add(), remove(), set() y clear().",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"List y MutableList\":",
        "tokens": [
          "val",
          "items",
          "=",
          "mutableListOf",
          "<String>",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "items",
          "=",
          "mutableListOf",
          "<String>",
          "(",
          ")"
        ],
        "explanation": "Usa List por defecto para proteger tus datos de mutaciones accidentales; usa MutableList solo cuando agregues o borres.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"List y MutableList\":",
        "codeSnippet": [
          "val f: List<Int> = listOf(1, 2)",
          "f.removeAt(0) // Error: List no tiene método removeAt"
        ],
        "bugLineIndex": 1,
        "explanation": "Confundir val con inmutabilidad: `val lista = mutableListOf(...)` permite modificar el contenido interno de la lista.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"List y MutableList\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "List y MutableList",
            "right": "List es una vista de solo lectura."
          },
          {
            "left": "Principio 2",
            "right": "MutableList implementa operaciones add(), remove(), set() y clear()."
          },
          {
            "left": "Principio 3",
            "right": "mutableListOf() es la función constructora para listas mutables."
          },
          {
            "left": "Buena práctica",
            "right": "Usa List por defecto para proteger tus datos de muta..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l02-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"List y MutableList\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"List y MutableList\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Usa List por defecto para proteger tus datos de mutaciones accidentales; usa MutableList solo cuando agregues o borres.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"List y MutableList\"?",
        "code": "fun main() {\n    val inmutable: List<String> = listOf(\"A\", \"B\")\n    val mutable: MutableList<String> = mutableListOf(\"A\", \"B\")\n    mutable.add(\"C\") // Totalmente permitido en MutableList\n    println(\"Inmutable: $inmutable | Mutable: $mutable\")",
        "options": [
          "Inmutable: [A, B] | Mutable: [",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Inmutable: [A, B] | Mutable: [",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"List y MutableList\":",
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
        "id": "kt-u09-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"List y MutableList\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Confundir val con inmutabilidad: `val lista = mutableListOf(...)` permite modificar el contenido interno de la lista.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"List y MutableList\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Distingue entre listas de solo lectura (List) y list..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Confundir val con inmutabilidad: `val lista = mutabl..."
          },
          {
            "left": "Recomendación",
            "right": "Usa List por defecto para proteger tus datos de muta..."
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
    "id": "kotlin-u09-l03",
    "path": "kotlin",
    "unit": 9,
    "level": 3,
    "title": "3. Agregar, modificar y eliminar elementos",
    "description": "Manipula listas mutables con precisión: add(), remove(), removeAt() y reasignación por corchetes.",
    "exercises": [
      {
        "id": "kt-u09-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Agregar, modificar y eliminar elementos\"?",
        "code": "val nums = mutableListOf(10, 20, 30)\nnums.removeAt(0)\nprintln(nums[0])",
        "options": [
          "20",
          "10",
          "30",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "add(elem) añade al final; add(indice, elem) inserta en una posición específica.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l03-e02",
        "type": "code_cloze",
        "prompt": "El método para eliminar un elemento según su posición numérica en una MutableList es ___:",
        "codeWithBlank": "El método para eliminar un elemento según su posición numérica en una MutableList es ___:",
        "options": [
          "removeAt",
          "remove",
          "delete",
          "pop"
        ],
        "correctOption": "removeAt",
        "explanation": "remove(elem) elimina la primera coincidencia del valor.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Agregar, modificar y eliminar elementos\":",
        "tokens": [
          "tareas",
          ".",
          "add",
          "(",
          "\"Nuevo pendiente\"",
          ")"
        ],
        "solution": [
          "tareas",
          ".",
          "add",
          "(",
          "\"Nuevo pendiente\"",
          ")"
        ],
        "explanation": "remove(elemento) devuelve true si encontró y eliminó el objeto, o false si no estaba en la lista.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Agregar, modificar y eliminar elementos\":",
        "codeSnippet": [
          "val l = mutableListOf(\"A\")",
          "l.removeAt(5) // Error: índice 5 fuera de límites"
        ],
        "bugLineIndex": 1,
        "explanation": "Usar removeAt con un índice inexistente provocará IndexOutOfBoundsException.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Agregar, modificar y eliminar elementos\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Agregar, modificar y eliminar elementos",
            "right": "add(elem) añade al final; add(indice, elem) inserta en una posición específica."
          },
          {
            "left": "Principio 2",
            "right": "remove(elem) elimina la primera coincidencia del valor."
          },
          {
            "left": "Principio 3",
            "right": "removeAt(indice) elimina el elemento en esa posición y desplaza los demás."
          },
          {
            "left": "Buena práctica",
            "right": "remove(elemento) devuelve true si encontró y eliminó..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l03-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Agregar, modificar y eliminar elementos\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Agregar, modificar y eliminar elementos\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "remove(elemento) devuelve true si encontró y eliminó el objeto, o false si no estaba en la lista.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Agregar, modificar y eliminar elementos\"?",
        "code": "fun main() {\n    val tareas = mutableListOf(\"Comprar pan\", \"Lavar auto\", \"Estudiar\")\n    tareas.add(\"Hacer ejercicio\") // Agrega al final\n    tareas[1] = \"Lavar bicicleta\"  // Modifica el índice 1\n    tareas.removeAt(0)            // Elimina por índice",
        "options": [
          "Tareas finales: [Lavar bicicle",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Tareas finales: [Lavar bicicle",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Agregar, modificar y eliminar elementos\":",
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
        "id": "kt-u09-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Agregar, modificar y eliminar elementos\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Usar removeAt con un índice inexistente provocará IndexOutOfBoundsException.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Agregar, modificar y eliminar elementos\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Manipula listas mutables con precisión: add(), remov..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar removeAt con un índice inexistente provocará In..."
          },
          {
            "left": "Recomendación",
            "right": "remove(elemento) devuelve true si encontró y eliminó..."
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
    "id": "kotlin-u09-l04",
    "path": "kotlin",
    "unit": 9,
    "level": 4,
    "title": "4. Recorrer colecciones y comprobar pertenencia",
    "description": "Itera sobre listas con for-in y comprueba la existencia de elementos de forma ultra-limpia con el operador in.",
    "exercises": [
      {
        "id": "kt-u09-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Recorrer colecciones y comprobar pertenencia\"?",
        "code": "val nums = listOf(5, 10, 15)\nprintln(10 in nums)",
        "options": [
          "true",
          "false",
          "10",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "for (item in coleccion) recorre secuencialmente todos los elementos.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l04-e02",
        "type": "code_cloze",
        "prompt": "Para comprobar si un elemento pertenece a una colección en Kotlin usamos el operador ___:",
        "codeWithBlank": "Para comprobar si un elemento pertenece a una colección en Kotlin usamos el operador ___:",
        "options": [
          "in",
          "has",
          "contains",
          "inside"
        ],
        "correctOption": "in",
        "explanation": "El operador in verifica pertenencia produciendo un Boolean.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Recorrer colecciones y comprobar pertenencia\":",
        "tokens": [
          "if",
          "(",
          "\"Admin\"",
          "in",
          "roles",
          ")",
          "{",
          "}"
        ],
        "solution": [
          "if",
          "(",
          "\"Admin\"",
          "in",
          "roles",
          ")",
          "{",
          "}"
        ],
        "explanation": "El operador in es equivalente a llamar al método .contains(elemento), pero mucho más legible.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Recorrer colecciones y comprobar pertenencia\":",
        "codeSnippet": [
          "val lista = listOf(1, 2)",
          "for (i = 0; i < lista.size; i++) { // Estilo C obsoleto en Kotlin",
          "    println(lista[i])",
          "}"
        ],
        "bugLineIndex": 1,
        "explanation": "Modificar una MutableList mientras la estás recorriendo con un for tradicional puede provocar ConcurrentModificationException.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Recorrer colecciones y comprobar pertenencia\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Recorrer colecciones y comprobar pertenencia",
            "right": "for (item in coleccion) recorre secuencialmente todos los elementos."
          },
          {
            "left": "Principio 2",
            "right": "El operador in verifica pertenencia produciendo un Boolean."
          },
          {
            "left": "Principio 3",
            "right": "!in verifica que un elemento no forme parte de la colección."
          },
          {
            "left": "Buena práctica",
            "right": "El operador in es equivalente a llamar al método .co..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l04-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Recorrer colecciones y comprobar pertenencia\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Recorrer colecciones y comprobar pertenencia\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "El operador in es equivalente a llamar al método .contains(elemento), pero mucho más legible.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Recorrer colecciones y comprobar pertenencia\"?",
        "code": "fun main() {\n    val invitados = listOf(\"Carlos\", \"Valeria\", \"Sofía\")\n    println(\"Lista de asistentes:\")\n    for (persona in invitados) {\n        println(\"• $persona\")",
        "options": [
          "Lista de asistentes:",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Lista de asistentes:",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Recorrer colecciones y comprobar pertenencia\":",
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
        "id": "kt-u09-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Recorrer colecciones y comprobar pertenencia\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Modificar una MutableList mientras la estás recorriendo con un for tradicional puede provocar ConcurrentModificationException.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Recorrer colecciones y comprobar pertenencia\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Itera sobre listas con for-in y comprueba la existen..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Modificar una MutableList mientras la estás recorrie..."
          },
          {
            "left": "Recomendación",
            "right": "El operador in es equivalente a llamar al método .co..."
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
    "id": "kotlin-u09-l05",
    "path": "kotlin",
    "unit": 9,
    "level": 5,
    "title": "5. Set: elementos sin duplicados",
    "description": "Garantiza unicidad matemática con la colección Set: una estructura donde los elementos duplicados son descartados automáticamente.",
    "exercises": [
      {
        "id": "kt-u09-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Set: elementos sin duplicados\"?",
        "code": "val s = setOf(\"A\", \"B\", \"A\", \"C\")\nprintln(s.size)",
        "options": [
          "3",
          "4",
          "2",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "setOf() crea un conjunto inmutable sin duplicados.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l05-e02",
        "type": "code_cloze",
        "prompt": "La colección que garantiza que no existan elementos duplicados se llama ___:",
        "codeWithBlank": "La colección que garantiza que no existan elementos duplicados se llama ___:",
        "options": [
          "Set",
          "List",
          "Map",
          "Array"
        ],
        "correctOption": "Set",
        "explanation": "mutableSetOf() permite agregar elementos nuevos descartando repetidos.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Set: elementos sin duplicados\":",
        "tokens": [
          "val",
          "unicos",
          "=",
          "items",
          ".",
          "toSet",
          "(",
          ")"
        ],
        "solution": [
          "val",
          "unicos",
          "=",
          "items",
          ".",
          "toSet",
          "(",
          ")"
        ],
        "explanation": "Puedes convertir cualquier lista con duplicados a elementos únicos al instante con `.toSet()`.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Set: elementos sin duplicados\":",
        "codeSnippet": [
          "val s = setOf(1, 2, 3)",
          "println(s[0]) // Set no implementa acceso indexado por corchetes directo"
        ],
        "bugLineIndex": 1,
        "explanation": "Un Set estándar no garantiza acceso rápido por índice posicional como [0]; está optimizado para verificar pertenencia.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Set: elementos sin duplicados\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Set: elementos sin duplicados",
            "right": "setOf() crea un conjunto inmutable sin duplicados."
          },
          {
            "left": "Principio 2",
            "right": "mutableSetOf() permite agregar elementos nuevos descartando repetidos."
          },
          {
            "left": "Principio 3",
            "right": "Las búsquedas con in en un Set son órdenes de magnitud más veloces que en una List."
          },
          {
            "left": "Buena práctica",
            "right": "Puedes convertir cualquier lista con duplicados a el..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l05-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Set: elementos sin duplicados\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Set: elementos sin duplicados\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Puedes convertir cualquier lista con duplicados a elementos únicos al instante con `.toSet()`.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Set: elementos sin duplicados\"?",
        "code": "fun main() {\n    val numerosDuplicados = listOf(1, 2, 2, 3, 3, 3, 4)\n    val conjuntoUnico: Set<Int> = setOf(1, 2, 2, 3, 3, 3, 4)\n    println(\"Lista original:     $numerosDuplicados\")\n    println(\"Set sin duplicados: $conjuntoUnico\")",
        "options": [
          "Lista original:     [1, 2, 2,",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Lista original:     [1, 2, 2,",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Set: elementos sin duplicados\":",
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
        "id": "kt-u09-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Set: elementos sin duplicados\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Un Set estándar no garantiza acceso rápido por índice posicional como [0]; está optimizado para verificar pertenencia.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Set: elementos sin duplicados\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Garantiza unicidad matemática con la colección Set: ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Un Set estándar no garantiza acceso rápido por índic..."
          },
          {
            "left": "Recomendación",
            "right": "Puedes convertir cualquier lista con duplicados a el..."
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
    "id": "kotlin-u09-l06",
    "path": "kotlin",
    "unit": 9,
    "level": 6,
    "title": "6. Map: pares clave-valor",
    "description": "Almacena diccionarios asociativos donde cada valor se recupera al instante mediante una clave única irrepetible.",
    "exercises": [
      {
        "id": "kt-u09-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Map: pares clave-valor\"?",
        "code": "val precios = mapOf(\"Pan\" to 1.5, \"Leche\" to 2.0)\nprintln(precios[\"Pan\"])",
        "options": [
          "1.5",
          "Pan",
          "2.0",
          "null"
        ],
        "correctOptionIndex": 0,
        "explanation": "mapOf(\"clave\" to valor) inicializa un diccionario clave-valor.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l06-e02",
        "type": "code_cloze",
        "prompt": "Para vincular una clave con su valor en la creación de un Map usamos la palabra infija ___:",
        "codeWithBlank": "Para vincular una clave con su valor en la creación de un Map usamos la palabra infija ___:",
        "options": [
          "to",
          "with",
          "pair",
          "->"
        ],
        "correctOption": "to",
        "explanation": "map[clave] recupera el valor asociado en tiempo constante O(1).",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Map: pares clave-valor\":",
        "tokens": [
          "val",
          "edades",
          "=",
          "mapOf",
          "(",
          "\"Ana\"",
          "to",
          "25",
          ")"
        ],
        "solution": [
          "val",
          "edades",
          "=",
          "mapOf",
          "(",
          "\"Ana\"",
          "to",
          "25",
          ")"
        ],
        "explanation": "Si buscas una clave que no existe en el Map, te devuelve null sin arrojar excepciones.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Map: pares clave-valor\":",
        "codeSnippet": [
          "val m = mapOf(\"A\" to 1)",
          "m[\"B\"] = 2 // Error: mapOf() es inmutable, se requiere mutableMapOf()"
        ],
        "bugLineIndex": 1,
        "explanation": "Si defines una clave repetida en un Map, el último valor sobreescribirá al anterior.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Map: pares clave-valor\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Map: pares clave-valor",
            "right": "mapOf(\"clave\" to valor) inicializa un diccionario clave-valor."
          },
          {
            "left": "Principio 2",
            "right": "map[clave] recupera el valor asociado en tiempo constante O(1)."
          },
          {
            "left": "Principio 3",
            "right": "mutableMapOf() permite agregar pares con `map[clave] = valor`."
          },
          {
            "left": "Buena práctica",
            "right": "Si buscas una clave que no existe en el Map, te devu..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l06-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Map: pares clave-valor\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Map: pares clave-valor\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Si buscas una clave que no existe en el Map, te devuelve null sin arrojar excepciones.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Map: pares clave-valor\"?",
        "code": "fun main() {\n    val capitales = mapOf(\n        \"España\" to \"Madrid\",\n        \"Costa Rica\" to \"San José\",\n        \"México\" to \"Ciudad de México\"",
        "options": [
          "Capital de España: Madrid",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Capital de España: Madrid",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Map: pares clave-valor\":",
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
        "id": "kt-u09-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Map: pares clave-valor\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Si defines una clave repetida en un Map, el último valor sobreescribirá al anterior.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Map: pares clave-valor\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Almacena diccionarios asociativos donde cada valor s..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si defines una clave repetida en un Map, el último v..."
          },
          {
            "left": "Recomendación",
            "right": "Si buscas una clave que no existe en el Map, te devu..."
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
    "id": "kotlin-u09-l07",
    "path": "kotlin",
    "unit": 9,
    "level": 7,
    "title": "7. Elegir la colección adecuada",
    "description": "Aprende los criterios de arquitectura de software para elegir entre List, Set o Map según tu caso de uso.",
    "exercises": [
      {
        "id": "kt-u09-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Elegir la colección adecuada\"?",
        "code": "val lista = listOf(1, 1, 2)\nval set = setOf(1, 1, 2)\nprintln(lista.size > set.size)",
        "options": [
          "true",
          "false",
          "3",
          "2"
        ],
        "correctOptionIndex": 0,
        "explanation": "List: ordenada por índice, admite duplicados, ideal para secuencias.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l07-e02",
        "type": "code_cloze",
        "prompt": "Si necesitamos asociar cada DNI de estudiante con su expediente académico la colección ideal es ___:",
        "codeWithBlank": "Si necesitamos asociar cada DNI de estudiante con su expediente académico la colección ideal es ___:",
        "options": [
          "Map",
          "List",
          "Set",
          "Array"
        ],
        "correctOption": "Map",
        "explanation": "Set: sin duplicados, ideal para membresía rápida y conjuntos.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Elegir la colección adecuada\":",
        "tokens": [
          "val",
          "idSet",
          "=",
          "ids.toSet()"
        ],
        "solution": [
          "val",
          "idSet",
          "=",
          "ids.toSet()"
        ],
        "explanation": "Si necesitas buscar elementos por un ID único frecuentemente, usa Map. Si el orden de llegada importa, usa List.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Elegir la colección adecuada\":",
        "codeSnippet": [
          "val s = setOf(\"A\", \"B\")",
          "s.add(\"C\") // Error: setOf es inmutable"
        ],
        "bugLineIndex": 1,
        "explanation": "Usar una List de 100,000 elementos para comprobar con .contains() será lentísimo comparado con un Set.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Elegir la colección adecuada\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "List",
            "right": "ordenada por índice, admite duplicados, ideal para secuencias."
          },
          {
            "left": "Set",
            "right": "sin duplicados, ideal para membresía rápida y conjuntos."
          },
          {
            "left": "Map",
            "right": "asociación clave-valor, búsqueda inmediata por identificador."
          },
          {
            "left": "Buena práctica",
            "right": "Si necesitas buscar elementos por un ID único frecue..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l07-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Elegir la colección adecuada\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Elegir la colección adecuada\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Si necesitas buscar elementos por un ID único frecuentemente, usa Map. Si el orden de llegada importa, usa List.",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Elegir la colección adecuada\"?",
        "code": "fun main() {\n    val historialAcciones = listOf(\"LOGIN\", \"VIEW\", \"CLICK\", \"VIEW\")\n    val usuariosConectados = setOf(\"usr_1\", \"usr_2\", \"usr_3\")\n    val catalogoPrecios = mapOf(\"PROD_01\" to 49.99, \"PROD_02\" to 12.50)\n    println(\"Historial: ${historialAcciones.size} | Conectados: ${usuariosConectados.size} | Catálogo: ${catalogoPrecios.size}\")",
        "options": [
          "Historial: 4 | Conectados: 3 |",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Historial: 4 | Conectados: 3 |",
        "xpReward": 10
      },
      {
        "id": "kt-u09-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Elegir la colección adecuada\":",
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
        "id": "kt-u09-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Elegir la colección adecuada\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Usar una List de 100,000 elementos para comprobar con .contains() será lentísimo comparado con un Set.",
        "xpReward": 15
      },
      {
        "id": "kt-u09-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Elegir la colección adecuada\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende los criterios de arquitectura de software pa..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Usar una List de 100,000 elementos para comprobar co..."
          },
          {
            "left": "Recomendación",
            "right": "Si necesitas buscar elementos por un ID único frecue..."
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
