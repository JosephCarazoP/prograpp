import { Lesson } from '../../../types/lesson';

export const KOTLIN_UNIT_10_LESSONS: Lesson[] = [
  {
    "id": "kotlin-u10-l01",
    "path": "kotlin",
    "unit": 10,
    "level": 1,
    "title": "1. Diferencia entre clase y objeto",
    "description": "Comprende el paradigma de la Programación Orientada a Objetos: la clase como molde conceptual y el objeto como la entidad concreta en memoria.",
    "exercises": [
      {
        "id": "kt-u10-l01-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Diferencia entre clase y objeto\"?",
        "code": "class Robot\nfun main() {\n    val r = Robot()\n    println(r != null)\n}",
        "options": [
          "true",
          "false",
          "Robot",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Clase: modelo abstracto que define propiedades y comportamientos.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l01-e02",
        "type": "code_cloze",
        "prompt": "La plantilla o molde que define cómo será un objeto se denomina ___:",
        "codeWithBlank": "La plantilla o molde que define cómo será un objeto se denomina ___:",
        "options": [
          "clase",
          "función",
          "interfaz",
          "paquete"
        ],
        "correctOption": "clase",
        "explanation": "Objeto (o instancia): representación viva y concreta en memoria RAM.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l01-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Diferencia entre clase y objeto\":",
        "tokens": [
          "class",
          "Usuario",
          "{",
          "val",
          "activo",
          "=",
          "true",
          "}"
        ],
        "solution": [
          "class",
          "Usuario",
          "{",
          "val",
          "activo",
          "=",
          "true",
          "}"
        ],
        "explanation": "En Kotlin no se utiliza la palabra \"new\" para crear instancias; basta con invocar el nombre de la clase con paréntesis: Auto().",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l01-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Diferencia entre clase y objeto\":",
        "codeSnippet": [
          "val c = new Auto() // Error: la palabra new no existe en Kotlin"
        ],
        "bugLineIndex": 0,
        "explanation": "Confundir la clase con el objeto: no puedes llamar Auto.acelerar() si no has creado una instancia de Auto.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l01-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Diferencia entre clase y objeto\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Clase",
            "right": "modelo abstracto que define propiedades y comportamientos."
          },
          {
            "left": "Objeto (o instancia)",
            "right": "representación viva y concreta en memoria RAM."
          },
          {
            "left": "Principio 3",
            "right": "A partir de una sola clase puedes instanciar infinitos objetos independientes."
          },
          {
            "left": "Buena práctica",
            "right": "En Kotlin no se utiliza la palabra \"new\" para crear ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l01-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Diferencia entre clase y objeto\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Diferencia entre clase y objeto\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "En Kotlin no se utiliza la palabra \"new\" para crear instancias; basta con invocar el nombre de la clase con paréntesis: Auto().",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l01-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Diferencia entre clase y objeto\"?",
        "code": "class Auto {\n    val ruedas = 4\n}\n\nfun main() {",
        "options": [
          "auto1 tiene 4 ruedas.",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: auto1 tiene 4 ruedas.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l01-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Diferencia entre clase y objeto\":",
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
        "id": "kt-u10-l01-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Diferencia entre clase y objeto\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Confundir la clase con el objeto: no puedes llamar Auto.acelerar() si no has creado una instancia de Auto.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l01-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Diferencia entre clase y objeto\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Comprende el paradigma de la Programación Orientada ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Confundir la clase con el objeto: no puedes llamar A..."
          },
          {
            "left": "Recomendación",
            "right": "En Kotlin no se utiliza la palabra \"new\" para crear ..."
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
    "id": "kotlin-u10-l02",
    "path": "kotlin",
    "unit": 10,
    "level": 2,
    "title": "2. Propiedades y estado",
    "description": "Modela el estado interno de tus objetos mediante propiedades declaradas con val (constantes) y var (mutables).",
    "exercises": [
      {
        "id": "kt-u10-l02-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Propiedades y estado\"?",
        "code": "class Jugador {\n    var vidas = 3\n}\nfun main() {\n    val j = Jugador()\n    j.vidas--\n    println(j.vidas)\n}",
        "options": [
          "2",
          "3",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Las propiedades representan los atributos o características del objeto.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l02-e02",
        "type": "code_cloze",
        "prompt": "El conjunto de valores que tienen las variables internas de un objeto en un momento dado es su ___:",
        "codeWithBlank": "El conjunto de valores que tienen las variables internas de un objeto en un momento dado es su ___:",
        "options": [
          "estado",
          "molde",
          "alcance",
          "retorno"
        ],
        "correctOption": "estado",
        "explanation": "Se accede a las propiedades usando la notación de punto: objeto.propiedad.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l02-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Propiedades y estado\":",
        "tokens": [
          "class",
          "Item",
          "{",
          "var",
          "precio",
          "=",
          "0.0",
          "}"
        ],
        "solution": [
          "class",
          "Item",
          "{",
          "var",
          "precio",
          "=",
          "0.0",
          "}"
        ],
        "explanation": "El estado de un objeto es el conjunto de valores que tienen sus propiedades en un instante de tiempo.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l02-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Propiedades y estado\":",
        "codeSnippet": [
          "class Demo { val id = 1 }",
          "fun main() {",
          "    val d = Demo()",
          "    d.id = 2 // Error: id es inmutable con val",
          "}"
        ],
        "bugLineIndex": 3,
        "explanation": "Declarar todas las propiedades como var expone el objeto a modificaciones arbitrarias descontroladas.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l02-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Propiedades y estado\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Propiedades y estado",
            "right": "Las propiedades representan los atributos o características del objeto."
          },
          {
            "left": "Se accede a las propiedades usando la notación de punto",
            "right": "objeto.propiedad."
          },
          {
            "left": "Principio 3",
            "right": "Las propiedades val generan automáticamente getters; las var generan getters y setters."
          },
          {
            "left": "Buena práctica",
            "right": "El estado de un objeto es el conjunto de valores que..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l02-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Propiedades y estado\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Propiedades y estado\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "El estado de un objeto es el conjunto de valores que tienen sus propiedades en un instante de tiempo.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l02-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Propiedades y estado\"?",
        "code": "class CuentaBancaria {\n    val titular = \"Carlos Mendoza\"\n    var saldo = 1000.0\n}\n",
        "options": [
          "Titular: Carlos Mendoza | Sald",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Titular: Carlos Mendoza | Sald",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l02-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Propiedades y estado\":",
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
        "id": "kt-u10-l02-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Propiedades y estado\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Declarar todas las propiedades como var expone el objeto a modificaciones arbitrarias descontroladas.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l02-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Propiedades y estado\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Modela el estado interno de tus objetos mediante pro..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Declarar todas las propiedades como var expone el ob..."
          },
          {
            "left": "Recomendación",
            "right": "El estado de un objeto es el conjunto de valores que..."
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
    "id": "kotlin-u10-l03",
    "path": "kotlin",
    "unit": 10,
    "level": 3,
    "title": "3. Constructores e inicialización",
    "description": "Aprende a recibir datos al momento de instanciar tus clases mediante el constructor primario en la cabecera.",
    "exercises": [
      {
        "id": "kt-u10-l03-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Constructores e inicialización\"?",
        "code": "class Libro(val titulo: String)\nfun main() {\n    val l = Libro(\"Kotlin in Action\")\n    println(l.titulo)\n}",
        "options": [
          "Kotlin in Action",
          "Libro",
          "titulo",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "El constructor primario va en la cabecera de la clase: class Persona(val nombre: String).",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l03-e02",
        "type": "code_cloze",
        "prompt": "El bloque de código que se ejecuta automáticamente al instanciar un objeto se declara con la palabra ___:",
        "codeWithBlank": "El bloque de código que se ejecuta automáticamente al instanciar un objeto se declara con la palabra ___:",
        "options": [
          "init",
          "constructor",
          "start",
          "setup"
        ],
        "correctOption": "init",
        "explanation": "El bloque init se ejecuta automáticamente tras la creación de cada instancia.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l03-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Constructores e inicialización\":",
        "tokens": [
          "class",
          "Producto",
          "(",
          "val",
          "nombre:",
          "String",
          ")"
        ],
        "solution": [
          "class",
          "Producto",
          "(",
          "val",
          "nombre:",
          "String",
          ")"
        ],
        "explanation": "Declarar `val` o `var` dentro del constructor primario convierte los parámetros en propiedades accesibles de la clase.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l03-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Constructores e inicialización\":",
        "codeSnippet": [
          "class User(nombre: String) // Sin val/var",
          "fun main() {",
          "    val u = User(\"Ana\")",
          "    println(u.nombre) // Error: nombre no es propiedad accesible",
          "}"
        ],
        "bugLineIndex": 3,
        "explanation": "Si omites `val` o `var` en el constructor, los valores solo existirán durante el bloque `init` pero no como propiedades del objeto.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l03-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Constructores e inicialización\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "El constructor primario va en la cabecera de la clase",
            "right": "class Persona(val nombre: String)."
          },
          {
            "left": "Principio 2",
            "right": "El bloque init se ejecuta automáticamente tras la creación de cada instancia."
          },
          {
            "left": "Principio 3",
            "right": "Permite validar parámetros antes de que el objeto esté listo para usarse."
          },
          {
            "left": "Buena práctica",
            "right": "Declarar `val` o `var` dentro del constructor primar..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l03-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Constructores e inicialización\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Constructores e inicialización\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Declarar `val` o `var` dentro del constructor primario convierte los parámetros en propiedades accesibles de la clase.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l03-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Constructores e inicialización\"?",
        "code": "class Estudiante(val nombre: String, var promedio: Double) {\n    init {\n        println(\"Inicializando estudiante: $nombre...\")\n    }\n}",
        "options": [
          "Inicializando estudiante: Vale",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Inicializando estudiante: Vale",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l03-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Constructores e inicialización\":",
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
        "id": "kt-u10-l03-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Constructores e inicialización\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Si omites `val` o `var` en el constructor, los valores solo existirán durante el bloque `init` pero no como propiedades del objeto.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l03-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Constructores e inicialización\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a recibir datos al momento de instanciar tus..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Si omites `val` o `var` en el constructor, los valor..."
          },
          {
            "left": "Recomendación",
            "right": "Declarar `val` o `var` dentro del constructor primar..."
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
    "id": "kotlin-u10-l04",
    "path": "kotlin",
    "unit": 10,
    "level": 4,
    "title": "4. Métodos",
    "description": "Define el comportamiento dinámico de tus objetos declarando funciones miembro dentro de la clase.",
    "exercises": [
      {
        "id": "kt-u10-l04-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Métodos\"?",
        "code": "class Contador(var valor: Int = 0) {\n    fun inc() { valor++ }\n}\nfun main() {\n    val c = Contador()\n    c.inc()\n    c.inc()\n    println(c.valor)\n}",
        "options": [
          "2",
          "0",
          "1",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Un método es una función que vive dentro del cuerpo de una clase.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l04-e02",
        "type": "code_cloze",
        "prompt": "Una función declarada dentro del cuerpo de una clase se denomina ___:",
        "codeWithBlank": "Una función declarada dentro del cuerpo de una clase se denomina ___:",
        "options": [
          "método",
          "parámetro",
          "constructor",
          "interfaz"
        ],
        "correctOption": "método",
        "explanation": "Modela las acciones, operaciones y comportamientos del objeto.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l04-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Métodos\":",
        "tokens": [
          "class",
          "Luz",
          "{",
          "fun",
          "encender",
          "(",
          ")",
          "{",
          "}",
          "}"
        ],
        "solution": [
          "class",
          "Luz",
          "{",
          "fun",
          "encender",
          "(",
          ")",
          "{",
          "}",
          "}"
        ],
        "explanation": "Los métodos tienen acceso directo a todas las propiedades de la clase sin necesidad de pasarlas como argumentos.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l04-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Métodos\":",
        "codeSnippet": [
          "class Demo {",
          "    function test() {} // En Kotlin se usa fun, no function",
          "}"
        ],
        "bugLineIndex": 1,
        "explanation": "Olvidar invocar el método con paréntesis: `term.calentar` en vez de `term.calentar(3.0)`.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l04-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Métodos\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Métodos",
            "right": "Un método es una función que vive dentro del cuerpo de una clase."
          },
          {
            "left": "Principio 2",
            "right": "Modela las acciones, operaciones y comportamientos del objeto."
          },
          {
            "left": "Principio 3",
            "right": "Permite alterar el estado interno del objeto de forma controlada."
          },
          {
            "left": "Buena práctica",
            "right": "Los métodos tienen acceso directo a todas las propie..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l04-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Métodos\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Métodos\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Los métodos tienen acceso directo a todas las propiedades de la clase sin necesidad de pasarlas como argumentos.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l04-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Métodos\"?",
        "code": "class Termostato(var temperaturaActual: Double) {\n    fun calentar(grados: Double) {\n        temperaturaActual += grados\n        println(\"Calentando a $temperaturaActual °C\")\n    }",
        "options": [
          "Calentando a 23.5 °C",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Calentando a 23.5 °C",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l04-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Métodos\":",
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
        "id": "kt-u10-l04-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Métodos\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Olvidar invocar el método con paréntesis: `term.calentar` en vez de `term.calentar(3.0)`.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l04-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Métodos\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Define el comportamiento dinámico de tus objetos dec..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Olvidar invocar el método con paréntesis: `term.cale..."
          },
          {
            "left": "Recomendación",
            "right": "Los métodos tienen acceso directo a todas las propie..."
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
    "id": "kotlin-u10-l05",
    "path": "kotlin",
    "unit": 10,
    "level": 5,
    "title": "5. Crear y usar varias instancias",
    "description": "Aprende cómo cada objeto instanciado mantiene su propio estado de memoria independiente sin interferir con los demás.",
    "exercises": [
      {
        "id": "kt-u10-l05-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Crear y usar varias instancias\"?",
        "code": "class Punto(var x: Int)\nfun main() {\n    val p1 = Punto(5)\n    val p2 = Punto(10)\n    p1.x = 20\n    println(p2.x)\n}",
        "options": [
          "10",
          "20",
          "5",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Cada objeto tiene su propio espacio de memoria en el Heap.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l05-e02",
        "type": "code_cloze",
        "prompt": "Cada objeto creado a partir de una clase posee un estado de memoria ___:",
        "codeWithBlank": "Cada objeto creado a partir de una clase posee un estado de memoria ___:",
        "options": [
          "independiente",
          "compartido",
          "estático",
          "global"
        ],
        "correctOption": "independiente",
        "explanation": "Las clases son moldes reutilizables para crear miles de entidades.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l05-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Crear y usar varias instancias\":",
        "tokens": [
          "val",
          "u1",
          "=",
          "Usuario(\"A\")",
          ";",
          "val",
          "u2",
          "=",
          "Usuario(\"B\")"
        ],
        "solution": [
          "val",
          "u1",
          "=",
          "Usuario(\"A\")",
          ";",
          "val",
          "u2",
          "=",
          "Usuario(\"B\")"
        ],
        "explanation": "Modificar una propiedad en la instancia A jamás afectará la misma propiedad en la instancia B.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l05-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Crear y usar varias instancias\":",
        "codeSnippet": [
          "val p1 = Personaje(\"A\", 10)",
          "p1 = Personaje(\"B\", 20) // Error: p1 fue declarado con val"
        ],
        "bugLineIndex": 1,
        "explanation": "Asignar una referencia `val b = a` no clona el objeto; ambas variables apuntarán al mismo objeto en memoria.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l05-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Crear y usar varias instancias\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Crear y usar varias instancias",
            "right": "Cada objeto tiene su propio espacio de memoria en el Heap."
          },
          {
            "left": "Principio 2",
            "right": "Las clases son moldes reutilizables para crear miles de entidades."
          },
          {
            "left": "Principio 3",
            "right": "La independencia de estado permite modelar sistemas complejos con facilidad."
          },
          {
            "left": "Buena práctica",
            "right": "Modificar una propiedad en la instancia A jamás afec..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l05-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Crear y usar varias instancias\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Crear y usar varias instancias\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "Modificar una propiedad en la instancia A jamás afectará la misma propiedad en la instancia B.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l05-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Crear y usar varias instancias\"?",
        "code": "class Personaje(val nombre: String, var hp: Int) {\n    fun recibirDanio(puntos: Int) {\n        hp -= puntos\n    }\n}",
        "options": [
          "HP Guerrero: 70 | HP Mago: 70",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: HP Guerrero: 70 | HP Mago: 70",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l05-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Crear y usar varias instancias\":",
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
        "id": "kt-u10-l05-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Crear y usar varias instancias\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Asignar una referencia `val b = a` no clona el objeto; ambas variables apuntarán al mismo objeto en memoria.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l05-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Crear y usar varias instancias\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende cómo cada objeto instanciado mantiene su pro..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Asignar una referencia `val b = a` no clona el objet..."
          },
          {
            "left": "Recomendación",
            "right": "Modificar una propiedad en la instancia A jamás afec..."
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
    "id": "kotlin-u10-l06",
    "path": "kotlin",
    "unit": 10,
    "level": 6,
    "title": "6. Encapsulación básica con private",
    "description": "Protege la integridad de tus datos restringiendo el acceso directo con el modificador private y exponiendo métodos de validación.",
    "exercises": [
      {
        "id": "kt-u10-l06-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Encapsulación básica con private\"?",
        "code": "class Test {\n    private val secreto = 42\n    fun getS() = secreto\n}\nfun main() {\n    println(Test().getS())\n}",
        "options": [
          "42",
          "secreto",
          "null",
          "Error de compilación"
        ],
        "correctOptionIndex": 0,
        "explanation": "private restringe la visibilidad de la propiedad únicamente dentro de su clase.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l06-e02",
        "type": "code_cloze",
        "prompt": "El modificador de visibilidad que oculta una propiedad al exterior de la clase es ___:",
        "codeWithBlank": "El modificador de visibilidad que oculta una propiedad al exterior de la clase es ___:",
        "options": [
          "private",
          "public",
          "protected",
          "internal"
        ],
        "correctOption": "private",
        "explanation": "public (predeterminado en Kotlin) permite el acceso desde cualquier parte.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l06-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Encapsulación básica con private\":",
        "tokens": [
          "private",
          "var",
          "saldo",
          "=",
          "0.0"
        ],
        "solution": [
          "private",
          "var",
          "saldo",
          "=",
          "0.0"
        ],
        "explanation": "La encapsulación previene que otros desarrolladores modifiquen variables internas poniendo el objeto en un estado corrupto.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l06-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Encapsulación básica con private\":",
        "codeSnippet": [
          "class Caja { private val pin = \"123\" }",
          "fun main() {",
          "    println(Caja().pin) // Error: pin es privado",
          "}"
        ],
        "bugLineIndex": 2,
        "explanation": "Hacer todo public por pereza destruye la modularidad y expone la lógica a fallos difíciles de rastrear.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l06-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Encapsulación básica con private\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Encapsulación básica con private",
            "right": "private restringe la visibilidad de la propiedad únicamente dentro de su clase."
          },
          {
            "left": "Principio 2",
            "right": "public (predeterminado en Kotlin) permite el acceso desde cualquier parte."
          },
          {
            "left": "Principio 3",
            "right": "La encapsulación asegura que el objeto valide cualquier cambio sobre su estado."
          },
          {
            "left": "Buena práctica",
            "right": "La encapsulación previene que otros desarrolladores ..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l06-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Encapsulación básica con private\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Encapsulación básica con private\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "La encapsulación previene que otros desarrolladores modifiquen variables internas poniendo el objeto en un estado corrupto.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l06-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Encapsulación básica con private\"?",
        "code": "class BovedaSegura {\n    private var fondosSecretos = 5000.0 // Oculto al exterior\n    fun retirar(cantidad: Double, pin: String): Boolean {\n        if (pin == \"1234\" && cantidad <= fondosSecretos) {\n            fondosSecretos -= cantidad",
        "options": [
          "Retiro exitoso de $1000.0",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Retiro exitoso de $1000.0",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l06-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Encapsulación básica con private\":",
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
        "id": "kt-u10-l06-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Encapsulación básica con private\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "Hacer todo public por pereza destruye la modularidad y expone la lógica a fallos difíciles de rastrear.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l06-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Encapsulación básica con private\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Protege la integridad de tus datos restringiendo el ..."
          },
          {
            "left": "Riesgo crítico",
            "right": "Hacer todo public por pereza destruye la modularidad..."
          },
          {
            "left": "Recomendación",
            "right": "La encapsulación previene que otros desarrolladores ..."
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
    "id": "kotlin-u10-l07",
    "path": "kotlin",
    "unit": 10,
    "level": 7,
    "title": "7. data class",
    "description": "Aprende a usar data class: la poderosa herramienta de Kotlin para modelar contenedores de datos con toString(), equals() y copy() automáticos.",
    "exercises": [
      {
        "id": "kt-u10-l07-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"data class\"?",
        "code": "data class Nota(val valor: Int)\nfun main() {\n    val a = Nota(10)\n    val b = Nota(10)\n    println(a == b)\n}",
        "options": [
          "true",
          "false",
          "Nota(10)",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "data class está optimizada para almacenar datos sin código repetitivo.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l07-e02",
        "type": "code_cloze",
        "prompt": "Para que Kotlin genere automáticamente métodos de comparación y copiado anteponemos la palabra ___ a class:",
        "codeWithBlank": "Para que Kotlin genere automáticamente métodos de comparación y copiado anteponemos la palabra ___ a class:",
        "options": [
          "data",
          "model",
          "value",
          "struct"
        ],
        "correctOption": "data",
        "explanation": "La función copy() es fundamental para programar con inmutabilidad.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l07-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"data class\":",
        "tokens": [
          "data",
          "class",
          "Usuario",
          "(",
          "val",
          "id:",
          "Int",
          ")"
        ],
        "solution": [
          "data",
          "class",
          "Usuario",
          "(",
          "val",
          "id:",
          "Int",
          ")"
        ],
        "explanation": "En una data class, el compilador genera gratis los métodos equals(), hashCode(), toString(), componentN() y copy().",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l07-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"data class\":",
        "codeSnippet": [
          "data class Vacia() // Error: data class requiere al menos un parámetro con val/var"
        ],
        "bugLineIndex": 0,
        "explanation": "El constructor primario de una data class debe tener al menos un parámetro marcado con val o var.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l07-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"data class\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "data class",
            "right": "data class está optimizada para almacenar datos sin código repetitivo."
          },
          {
            "left": "Principio 2",
            "right": "La función copy() es fundamental para programar con inmutabilidad."
          },
          {
            "left": "Principio 3",
            "right": "La representación de impresión toString() muestra de inmediato los campos con sus valores."
          },
          {
            "left": "Buena práctica",
            "right": "En una data class, el compilador genera gratis los m..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l07-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"data class\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"data class\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "En una data class, el compilador genera gratis los métodos equals(), hashCode(), toString(), componentN() y copy().",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l07-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"data class\"?",
        "code": "data class Producto(val id: Int, val nombre: String, val precio: Double)\n\nfun main() {\n    val p1 = Producto(1, \"Teclado\", 45.0)\n    val p2 = Producto(1, \"Teclado\", 45.0)",
        "options": [
          "toString() automático: Product",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: toString() automático: Product",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l07-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"data class\":",
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
        "id": "kt-u10-l07-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"data class\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "El constructor primario de una data class debe tener al menos un parámetro marcado con val o var.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l07-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"data class\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Aprende a usar data class: la poderosa herramienta d..."
          },
          {
            "left": "Riesgo crítico",
            "right": "El constructor primario de una data class debe tener..."
          },
          {
            "left": "Recomendación",
            "right": "En una data class, el compilador genera gratis los m..."
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
    "id": "kotlin-u10-l08",
    "path": "kotlin",
    "unit": 10,
    "level": 8,
    "title": "8. Colecciones de objetos",
    "description": "Combina colecciones y clases: gestiona listas de objetos personalizados y aprende a filtrarlos y manipularlos.",
    "exercises": [
      {
        "id": "kt-u10-l08-e01",
        "type": "predict_output",
        "prompt": "¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción sobre \"Colecciones de objetos\"?",
        "code": "data class Item(val precio: Int)\nval tienda = listOf(Item(10), Item(20))\nprintln(tienda[0].precio + tienda[1].precio)",
        "options": [
          "30",
          "1020",
          "Item(30)",
          "Error"
        ],
        "correctOptionIndex": 0,
        "explanation": "Las listas pueden almacenar instancias de cualquier clase personalizada.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l08-e02",
        "type": "code_cloze",
        "prompt": "Una lista que almacena múltiples instancias de una clase Estudiante se tipifica como List<___>:",
        "codeWithBlank": "Una lista que almacena múltiples instancias de una clase Estudiante se tipifica como List<___>:",
        "options": [
          "Estudiante",
          "Class",
          "Object",
          "Item"
        ],
        "correctOption": "Estudiante",
        "explanation": "Puedes recorrerlas y aplicar lógica de negocio sobre sus propiedades.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l08-e03",
        "type": "code_builder",
        "prompt": "Ordena los bloques para construir la sentencia correcta de: \"Colecciones de objetos\":",
        "tokens": [
          "val",
          "lista:",
          "List<Usuario>",
          "=",
          "listOf()"
        ],
        "solution": [
          "val",
          "lista:",
          "List<Usuario>",
          "=",
          "listOf()"
        ],
        "explanation": "List<MiClase> es la estructura más común en el desarrollo de software moderno: listas de productos, usuarios, mensajes, etc.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l08-e04",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea que contiene el error en este código de \"Colecciones de objetos\":",
        "codeSnippet": [
          "val alumnos = listOf(\"Juan\", \"Ana\")",
          "println(alumnos[0].nota) // Error: la lista contiene Strings, no Alumnos con propiedad nota"
        ],
        "bugLineIndex": 1,
        "explanation": "No intentes acceder a propiedades de un elemento sin verificar antes si tu lista no está vacía.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l08-e05",
        "type": "matching_pairs",
        "prompt": "Empareja cada concepto clave de \"Colecciones de objetos\" con su definición correspondiente:",
        "pairs": [
          {
            "left": "Colecciones de objetos",
            "right": "Las listas pueden almacenar instancias de cualquier clase personalizada."
          },
          {
            "left": "Principio 2",
            "right": "Puedes recorrerlas y aplicar lógica de negocio sobre sus propiedades."
          },
          {
            "left": "Principio 3",
            "right": "Es la base fundamental antes de aprender lambdas y programación funcional."
          },
          {
            "left": "Buena práctica",
            "right": "List<MiClase> es la estructura más común en el desar..."
          }
        ],
        "explanation": "Dominio de los conceptos esenciales y fundamentos teóricos de la lección.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l08-e06",
        "type": "code_cloze",
        "prompt": "En Kotlin, respecto a \"Colecciones de objetos\", para evitar fallos o errores de compilación se debe ___:",
        "codeWithBlank": "Al trabajar con \"Colecciones de objetos\", la directiva oficial es ___.",
        "options": [
          "respetar la seguridad de tipos y nulabilidad",
          "ignorar las advertencias del IDE",
          "usar variables sin inicializar",
          "forzar conversiones inseguras"
        ],
        "correctOption": "respetar la seguridad de tipos y nulabilidad",
        "explanation": "List<MiClase> es la estructura más común en el desarrollo de software moderno: listas de productos, usuarios, mensajes, etc.",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l08-e07",
        "type": "predict_output",
        "prompt": "¿Qué resultado se obtendrá al evaluar la siguiente instrucción sobre \"Colecciones de objetos\"?",
        "code": "data class Alumno(val nombre: String, val nota: Double)\n\nfun main() {\n    val aula = listOf(\n        Alumno(\"Valeria\", 9.4),",
        "options": [
          "Alumnos con nota de honor (> 9",
          "Error de sintaxis",
          "null / Sin registros",
          "Excepción de tipo"
        ],
        "correctOptionIndex": 0,
        "explanation": "La salida corresponde con el comportamiento documentado: Alumnos con nota de honor (> 9",
        "xpReward": 10
      },
      {
        "id": "kt-u10-l08-e08",
        "type": "code_builder",
        "prompt": "Construye la instrucción sintáctica complementaria para \"Colecciones de objetos\":",
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
        "id": "kt-u10-l08-e09",
        "type": "spot_the_bug",
        "prompt": "Identifica la línea con el error de diseño o sintaxis en \"Colecciones de objetos\":",
        "codeSnippet": [
          "// Bloque de verificación",
          "val datoValido = true",
          "datoValido = false // Error: val es inmutable y no se puede reasignar"
        ],
        "bugLineIndex": 2,
        "explanation": "No intentes acceder a propiedades de un elemento sin verificar antes si tu lista no está vacía.",
        "xpReward": 15
      },
      {
        "id": "kt-u10-l08-e10",
        "type": "matching_pairs",
        "prompt": "Empareja cada aspecto de \"Colecciones de objetos\" con su rol o impacto en el sistema:",
        "pairs": [
          {
            "left": "Propósito técnico",
            "right": "Combina colecciones y clases: gestiona listas de obj..."
          },
          {
            "left": "Riesgo crítico",
            "right": "No intentes acceder a propiedades de un elemento sin..."
          },
          {
            "left": "Recomendación",
            "right": "List<MiClase> es la estructura más común en el desar..."
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
