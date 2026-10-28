import { KotlinExercise, KotlinFile } from '../types/kotlinLab';

export const DEFAULT_KOTLIN_SANDBOX_CODE = `// 🚀 Laboratorio Kotlin — Inspirado en Kotlin Playground
// Escribe tu código aquí y presiona "Ejecutar" o presiona Ctrl + Enter

fun main() {
    println("¡Hola desde el Laboratorio de Kotlin!")
    
    val lenguaje = "Kotlin"
    val version = "2.1"
    println("Programando en $lenguaje $version con compilador real JVM.")
}
`;

export const KOTLIN_LAB_EXERCISES: KotlinExercise[] = [
  {
    id: 'kt-u01-intro',
    title: '1. Mi Primer Programa y Salida en Consola',
    unitId: 1,
    unitTitle: 'Unidad 1: Pensamiento lógico y primeros programas',
    difficulty: 'easy',
    description:
      'Crea un programa que imprima en la consola un saludo de bienvenida para un astronauta llamado Byte y muestre el inicio de la misión.',
    objectives: [
      'Utiliza la función fun main()',
      'Imprime "Bienvenido a bordo, Byte!"',
      'Imprime "Mision: Explorar la galaxia del codigo"'
    ],
    hints: [
      'Recuerda usar println("texto") para cada línea de salida.',
      'Asegúrate de que los textos coincidan exactamente con lo solicitado.'
    ],
    initialCode: `fun main() {
    // Escribe tus instrucciones con println aquí
    
}
`,
    solutionCode: `fun main() {
    println("Bienvenido a bordo, Byte!")
    println("Mision: Explorar la galaxia del codigo")
}
`,
    testCases: [
      {
        description: 'Imprime el saludo al astronauta Byte',
        expectedOutputSubstring: 'Bienvenido a bordo, Byte!'
      },
      {
        description: 'Muestra la descripción de la misión',
        expectedOutputSubstring: 'Mision: Explorar la galaxia del codigo'
      }
    ]
  },
  {
    id: 'kt-u02-variables',
    title: '2. Ficha de Personaje (val, var e Interpolación)',
    unitId: 2,
    unitTitle: 'Unidad 2: Variables y tipos de datos',
    difficulty: 'easy',
    description:
      'Declara variables inmutables con "val" para el nombre ("Alex") y nivel (10), y una mutable con "var" para las vidas (3). Luego resta 1 vida e imprime la ficha usando interpolación de cadenas ($nombre, $nivel, $vidas).',
    objectives: [
      'Declara val nombre: String = "Alex"',
      'Declara val nivel: Int = 10',
      'Declara var vidas: Int = 3 y réstale 1 vida (vidas = vidas - 1 o vidas--)',
      'Imprime: "Jugador: Alex | Nivel: 10 | Vidas restantes: 2"'
    ],
    hints: [
      'Recuerda: usa "val" para valores inmutables y "var" para valores mutables.',
      'Para interpolar usa: "Jugador: $nombre | Nivel: $nivel | Vidas restantes: $vidas"'
    ],
    initialCode: `fun main() {
    // 1. Declara las variables
    
    // 2. Reduce las vidas en 1
    
    // 3. Imprime la ficha formateada
    
}
`,
    solutionCode: `fun main() {
    val nombre = "Alex"
    val nivel = 10
    var vidas = 3
    vidas -= 1
    println("Jugador: $nombre | Nivel: $nivel | Vidas restantes: $vidas")
}
`,
    testCases: [
      {
        description: 'Usa val para declarar variables inmutables',
        codePattern: '\\bval\\s+nombre\\b',
        codeRequiredPatternDescription: 'Debes declarar la variable inmutable "val nombre"'
      },
      {
        description: 'Usa var para la variable de vidas que cambia',
        codePattern: '\\bvar\\s+vidas\\b',
        codeRequiredPatternDescription: 'Debes declarar la variable mutable "var vidas"'
      },
      {
        description: 'La salida muestra las vidas actualizadas a 2',
        expectedOutputSubstring: 'Jugador: Alex | Nivel: 10 | Vidas restantes: 2'
      }
    ]
  },
  {
    id: 'kt-u03-operadores',
    title: '3. Calculadora de Descuentos y Promedios',
    unitId: 3,
    unitTitle: 'Unidad 3: Operadores y expresiones',
    difficulty: 'easy',
    description:
      'Calcula el precio final de un artículo con precio original de 80.0 tras aplicar un descuento del 15% (0.15). Imprime el monto de descuento y el total a pagar.',
    objectives: [
      'Declara precio = 80.0 y porcentajeDescuento = 0.15',
      'Calcula el descuento = precio * porcentajeDescuento',
      'Calcula el total = precio - descuento',
      'Imprime "Descuento: 12.0" y "Total a pagar: 68.0"'
    ],
    hints: [
      'Multiplica 80.0 por 0.15 para obtener 12.0.',
      'Resta el descuento del precio original para obtener 68.0.'
    ],
    initialCode: `fun main() {
    val precio = 80.0
    val porcentajeDescuento = 0.15
    
    // Calcula el descuento y el total final
    
}
`,
    solutionCode: `fun main() {
    val precio = 80.0
    val porcentajeDescuento = 0.15
    val descuento = precio * porcentajeDescuento
    val total = precio - descuento
    println("Descuento: $descuento")
    println("Total a pagar: $total")
}
`,
    testCases: [
      {
        description: 'Calcula correctamente el descuento de 12.0',
        expectedOutputSubstring: 'Descuento: 12.0'
      },
      {
        description: 'Calcula el total a pagar de 68.0',
        expectedOutputSubstring: 'Total a pagar: 68.0'
      }
    ]
  },
  {
    id: 'kt-u04-when-if',
    title: '4. Clasificador de Calificaciones con "when"',
    unitId: 4,
    unitTitle: 'Unidad 4: Estructuras de decisión',
    difficulty: 'medium',
    description:
      'Crea un evaluador usando la expresión "when" de Kotlin. Si la nota está en 90..100 imprime "Excelente", en 70..89 imprime "Aprobado", y en cualquier otro caso imprime "Necesita Refuerzo". Prueba con nota = 85.',
    objectives: [
      'Usa la estructura when con rangos (in 90..100, in 70..89, else)',
      'Para nota = 85, la salida debe ser "Resultado: Aprobado"'
    ],
    hints: [
      'En Kotlin puedes evaluar rangos fácilmente: in 90..100 -> "Excelente"',
      'No olvides la rama else -> "Necesita Refuerzo"'
    ],
    initialCode: `fun main() {
    val nota = 85
    
    // Usa when para determinar el resultado
    val estado = when (nota) {
        // Completa los casos
        else -> "Desconocido"
    }
    
    println("Resultado: $estado")
}
`,
    solutionCode: `fun main() {
    val nota = 85
    val estado = when (nota) {
        in 90..100 -> "Excelente"
        in 70..89 -> "Aprobado"
        else -> "Necesita Refuerzo"
    }
    println("Resultado: $estado")
}
`,
    testCases: [
      {
        description: 'Usa la palabra clave when de Kotlin',
        codePattern: '\\bwhen\\s*\\(',
        codeRequiredPatternDescription: 'Debes utilizar la estructura de control when(nota)'
      },
      {
        description: 'Determina el resultado "Aprobado" para la nota 85',
        expectedOutputSubstring: 'Resultado: Aprobado'
      }
    ]
  },
  {
    id: 'kt-u05-bucles',
    title: '5. Cuenta Regresiva y Números Pares con Rangos',
    unitId: 5,
    unitTitle: 'Unidad 5: Estructuras de repetición',
    difficulty: 'medium',
    description:
      'Usa un bucle "for" con "downTo" y "step" para imprimir una cuenta regresiva de números pares desde 10 hasta 2 con step 2. Al final imprime "Despegue!".',
    objectives: [
      'Usa: for (i in 10 downTo 2 step 2)',
      'Imprime cada número en una línea',
      'Al terminar el bucle imprime "Despegue!"'
    ],
    hints: [
      'La sintaxis de rangos descendentes en Kotlin es: 10 downTo 2 step 2',
      'Fuera del bucle coloca println("Despegue!")'
    ],
    initialCode: `fun main() {
    // Escribe el bucle for con downTo y step
    
}
`,
    solutionCode: `fun main() {
    for (i in 10 downTo 2 step 2) {
        println(i)
    }
    println("Despegue!")
}
`,
    testCases: [
      {
        description: 'Usa downTo en el rango',
        codePattern: '\\bdownTo\\b',
        codeRequiredPatternDescription: 'Debes usar la palabra clave downTo'
      },
      {
        description: 'Usa step 2 en el rango',
        codePattern: '\\bstep\\s+2\\b',
        codeRequiredPatternDescription: 'Debes usar step 2'
      },
      {
        description: 'Imprime la secuencia correcta y el despegue',
        expectedOutputSubstring: 'Despegue!'
      }
    ]
  },
  {
    id: 'kt-u06-funciones',
    title: '6. Funciones con Parámetros por Defecto',
    unitId: 6,
    unitTitle: 'Unidad 6: Funciones',
    difficulty: 'medium',
    description:
      'Crea una función llamada "saludar" que reciba un nombre: String y un saludo: String con valor por defecto "Hola". Llama a la función una vez solo con "Byte" y otra vez con "Katy" y saludo personalizado "Buenos dias".',
    objectives: [
      'Declara fun saludar(nombre: String, saludo: String = "Hola"): String',
      'Llama a saludar("Byte") -> "Hola, Byte!"',
      'Llama a saludar("Katy", "Buenos dias") -> "Buenos dias, Katy!"'
    ],
    hints: [
      'Los parámetros por defecto se declaran con nombre: Tipo = valorInicial.',
      'Puedes retornar un String con interpolación: "$saludo, $nombre!"'
    ],
    initialCode: `// Declara la función saludar aquí


fun main() {
    println(saludar("Byte"))
    println(saludar("Katy", "Buenos dias"))
}
`,
    solutionCode: `fun saludar(nombre: String, saludo: String = "Hola"): String {
    return "$saludo, $nombre!"
}

fun main() {
    println(saludar("Byte"))
    println(saludar("Katy", "Buenos dias"))
}
`,
    testCases: [
      {
        description: 'Declara la función con parámetro por defecto',
        codePattern: 'fun\\s+saludar\\s*\\([^)]*=\\s*"Hola"',
        codeRequiredPatternDescription: 'La función debe tener un parámetro con valor por defecto "Hola"'
      },
      {
        description: 'Imprime el saludo por defecto "Hola, Byte!"',
        expectedOutputSubstring: 'Hola, Byte!'
      },
      {
        description: 'Imprime el saludo personalizado "Buenos dias, Katy!"',
        expectedOutputSubstring: 'Buenos dias, Katy!'
      }
    ]
  },
  {
    id: 'kt-u07-null-safety',
    title: '7. Null Safety y Operador Elvis (?:)',
    unitId: 7,
    unitTitle: 'Unidad 7: Conversiones y valores nulos',
    difficulty: 'medium',
    description:
      'Declara una función que reciba un String? anulable (por ejemplo, el alias de un usuario). Usa el operador Elvis ?: para retornar el alias en mayúsculas si no es null, o "INVITADO_ANONIMO" si es null.',
    objectives: [
      'Maneja tipos anulables con el operador Elvis (?:)',
      'Para entrada "byte_coder" imprime "BYTE_CODER"',
      'Para entrada null imprime "INVITADO_ANONIMO"'
    ],
    hints: [
      'Usa el acceso seguro ?.uppercase() y el operador Elvis ?:: alias?.uppercase() ?: "INVITADO_ANONIMO"'
    ],
    initialCode: `fun formatearAlias(alias: String?): String {
    // Retorna el alias en mayúsculas o "INVITADO_ANONIMO" si es null
    return ""
}

fun main() {
    val usuario1: String? = "byte_coder"
    val usuario2: String? = null
    
    println(formatearAlias(usuario1))
    println(formatearAlias(usuario2))
}
`,
    solutionCode: `fun formatearAlias(alias: String?): String {
    return alias?.uppercase() ?: "INVITADO_ANONIMO"
}

fun main() {
    val usuario1: String? = "byte_coder"
    val usuario2: String? = null
    println(formatearAlias(usuario1))
    println(formatearAlias(usuario2))
}
`,
    testCases: [
      {
        description: 'Usa el operador Elvis ?: para manejar nulos',
        codePattern: '\\?:',
        codeRequiredPatternDescription: 'Debes usar el operador Elvis ?:'
      },
      {
        description: 'Formatea correctamente el usuario con alias',
        expectedOutputSubstring: 'BYTE_CODER'
      },
      {
        description: 'Reemplaza el usuario nulo por el valor por defecto',
        expectedOutputSubstring: 'INVITADO_ANONIMO'
      }
    ]
  },
  {
    id: 'kt-u08-strings',
    title: '8. Procesamiento y Limpieza de Texto',
    unitId: 8,
    unitTitle: 'Unidad 8: Procesamiento de texto',
    difficulty: 'medium',
    description:
      'Dado el texto sucio "   kotlin,android,compose   ", limpia los espacios alrededor con trim(), separa las tecnologías por coma con split(",") e imprime cuántas tecnologías hay y la primera en mayúsculas.',
    objectives: [
      'Usa .trim() para limpiar espacios',
      'Usa .split(",") para obtener la lista de palabras',
      'Imprime "Total tecnologias: 3" y "Primera: KOTLIN"'
    ],
    hints: [
      'cadena.trim().split(",") te da una lista de 3 elementos.',
      'Accede al primer elemento con [0] y pásalo a mayúsculas con .uppercase().'
    ],
    initialCode: `fun main() {
    val entrada = "   kotlin,android,compose   "
    
    // Limpia y divide la cadena
    
}
`,
    solutionCode: `fun main() {
    val entrada = "   kotlin,android,compose   "
    val tecnologias = entrada.trim().split(",")
    println("Total tecnologias: \${tecnologias.size}")
    println("Primera: \${tecnologias[0].uppercase()}")
}
`,
    testCases: [
      {
        description: 'Usa trim() para limpiar espacios',
        codePattern: '\\.trim\\s*\\(',
        codeRequiredPatternDescription: 'Debes invocar el método trim()'
      },
      {
        description: 'Usa split(",") para separar los elementos',
        codePattern: '\\.split\\s*\\(',
        codeRequiredPatternDescription: 'Debes invocar el método split()'
      },
      {
        description: 'Muestra el conteo de 3 tecnologías',
        expectedOutputSubstring: 'Total tecnologias: 3'
      },
      {
        description: 'Muestra la primera tecnología en mayúsculas',
        expectedOutputSubstring: 'Primera: KOTLIN'
      }
    ]
  },
  {
    id: 'kt-u09-colecciones',
    title: '9. Gestión de Tareas con MutableList',
    unitId: 9,
    unitTitle: 'Unidad 9: Arreglos y Colecciones',
    difficulty: 'medium',
    description:
      'Crea una lista mutable con mutableListOf("Estudiar Kotlin", "Hacer ejercicio"). Agrega la tarea "Resolver retos", elimina "Hacer ejercicio" e imprime la lista final en orden numérico.',
    objectives: [
      'Crea una mutableListOf<String>',
      'Agrega "Resolver retos" con .add()',
      'Elimina "Hacer ejercicio" con .remove()',
      'Imprime las tareas numeradas: "1. Estudiar Kotlin" y "2. Resolver retos"'
    ],
    hints: [
      'Usa tareas.add("Resolver retos") y tareas.remove("Hacer ejercicio").',
      'Recorre con tareas.forEachIndexed { i, t -> println("${i + 1}. $t") } o un for tradicional.'
    ],
    initialCode: `fun main() {
    val tareas = mutableListOf("Estudiar Kotlin", "Hacer ejercicio")
    
    // Agrega y elimina tareas
    
    // Imprime la lista numerada
}
`,
    solutionCode: `fun main() {
    val tareas = mutableListOf("Estudiar Kotlin", "Hacer ejercicio")
    tareas.add("Resolver retos")
    tareas.remove("Hacer ejercicio")
    tareas.forEachIndexed { i, t ->
        println("\${i + 1}. $t")
    }
}
`,
    testCases: [
      {
        description: 'Usa mutableListOf para la lista de tareas',
        codePattern: 'mutableListOf\\s*\\(',
        codeRequiredPatternDescription: 'Debes inicializar la lista con mutableListOf()'
      },
      {
        description: 'Imprime la primera tarea',
        expectedOutputSubstring: '1. Estudiar Kotlin'
      },
      {
        description: 'Imprime la segunda tarea recién añadida',
        expectedOutputSubstring: '2. Resolver retos'
      },
      {
        description: 'No contiene la tarea eliminada',
        forbiddenOutputSubstring: 'Hacer ejercicio'
      }
    ]
  },
  {
    id: 'kt-u10-data-classes',
    title: '10. Modelado con Data Classes en POO',
    unitId: 10,
    unitTitle: 'Unidad 10: Clases y objetos',
    difficulty: 'hard',
    description:
      'Define una "data class Producto(val id: Int, val nombre: String, val precio: Double)". En el main crea una instancia para "Laptop" con precio 950.0. Luego usa la función copy() para crear una versión con descuento a 850.0 e imprime ambas.',
    objectives: [
      'Define data class Producto(val id: Int, val nombre: String, val precio: Double)',
      'Instancia p1 = Producto(1, "Laptop", 950.0)',
      'Crea p2 = p1.copy(precio = 850.0)',
      'Imprime: p1 y p2'
    ],
    hints: [
      'Las data classes generan automáticamente toString(), equals(), hashCode() y copy().',
      'Usa: val p2 = p1.copy(precio = 850.0)'
    ],
    initialCode: `// 1. Define la data class Producto aquí


fun main() {
    // 2. Crea el producto original
    
    // 3. Crea la copia con descuento
    
    // 4. Imprime ambos productos
}
`,
    solutionCode: `data class Producto(val id: Int, val nombre: String, val precio: Double)

fun main() {
    val p1 = Producto(1, "Laptop", 950.0)
    val p2 = p1.copy(precio = 850.0)
    println(p1)
    println(p2)
}
`,
    testCases: [
      {
        description: 'Define la clase usando la palabra clave data class',
        codePattern: '\\bdata\\s+class\\s+Producto\\b',
        codeRequiredPatternDescription: 'Debes definir "data class Producto"'
      },
      {
        description: 'Usa la función copy() de Kotlin',
        codePattern: '\\.copy\\s*\\(',
        codeRequiredPatternDescription: 'Debes invocar el método copy()'
      },
      {
        description: 'Muestra el producto original con precio 950.0',
        expectedOutputSubstring: 'precio=950.0'
      },
      {
        description: 'Muestra el producto con copia a 850.0',
        expectedOutputSubstring: 'precio=850.0'
      }
    ]
  },
  {
    id: 'kt-u11-lambdas',
    title: '11. Filtrado y Transformación con Lambdas',
    unitId: 11,
    unitTitle: 'Unidad 11: Operaciones sobre colecciones y lambdas',
    difficulty: 'hard',
    description:
      'Dada una lista de números listOf(12, 5, 20, 8, 35, 14), filtra los números mayores o iguales a 10 con .filter { ... }, multiplícalos por 2 con .map { ... } e imprímelos ordenados ascendentemente con .sorted().',
    objectives: [
      'Usa .filter { it >= 10 }',
      'Usa .map { it * 2 }',
      'Usa .sorted()',
      'Imprime la lista resultante: "[24, 28, 40, 70]"'
    ],
    hints: [
      'Puedes encadenar las funciones: numeros.filter { it >= 10 }.map { it * 2 }.sorted()',
      'Imprime el resultado directamente con println(resultado).'
    ],
    initialCode: `fun main() {
    val numeros = listOf(12, 5, 20, 8, 35, 14)
    
    // Filtra, transforma y ordena usando lambdas
    
}
`,
    solutionCode: `fun main() {
    val numeros = listOf(12, 5, 20, 8, 35, 14)
    val resultado = numeros.filter { it >= 10 }.map { it * 2 }.sorted()
    println(resultado)
}
`,
    testCases: [
      {
        description: 'Usa la función filter con lambda',
        codePattern: '\\.filter\\s*\\{',
        codeRequiredPatternDescription: 'Debes usar .filter { ... }'
      },
      {
        description: 'Usa la función map con lambda',
        codePattern: '\\.map\\s*\\{',
        codeRequiredPatternDescription: 'Debes usar .map { ... }'
      },
      {
        description: 'Muestra la lista filtrada, duplicada y ordenada',
        expectedOutputSubstring: '[24, 28, 40, 70]'
      }
    ]
  },
  {
    id: 'kt-u12-excepciones',
    title: '12. Depuración y Control de Excepciones (try/catch)',
    unitId: 12,
    unitTitle: 'Unidad 12: Errores y depuración',
    difficulty: 'hard',
    description:
      'Crea una función "dividirSeguro(a: Int, b: Int)" que intente hacer la división entera a / b dentro de un bloque try. Si ocurre una ArithmeticException (división por cero), atrapa la excepción y retorna -1. Prueba con (10, 2) y con (10, 0).',
    objectives: [
      'Usa bloque try { a / b } catch (e: ArithmeticException) { -1 }',
      'Para dividirSeguro(10, 2) debe imprimir "Resultado: 5"',
      'Para dividirSeguro(10, 0) debe imprimir "Resultado: -1"'
    ],
    hints: [
      'En Kotlin, try/catch es una expresión que puede retornar un valor: val res = try { ... } catch (...) { ... }',
      'Asegúrate de atrapar ArithmeticException o Exception.'
    ],
    initialCode: `fun dividirSeguro(a: Int, b: Int): Int {
    // Implementa try / catch aquí
    return 0
}

fun main() {
    println("Resultado: \${dividirSeguro(10, 2)}")
    println("Resultado: \${dividirSeguro(10, 0)}")
}
`,
    solutionCode: `fun dividirSeguro(a: Int, b: Int): Int {
    return try {
        a / b
    } catch (e: ArithmeticException) {
        -1
    }
}

fun main() {
    println("Resultado: \${dividirSeguro(10, 2)}")
    println("Resultado: \${dividirSeguro(10, 0)}")
}
`,
    testCases: [
      {
        description: 'Usa el bloque try / catch',
        codePattern: '\\btry\\s*\\{',
        codeRequiredPatternDescription: 'Debes utilizar el bloque try'
      },
      {
        description: 'Atrapa la excepción en el catch',
        codePattern: '\\bcatch\\s*\\(',
        codeRequiredPatternDescription: 'Debes utilizar la cláusula catch'
      },
      {
        description: 'Retorna el cociente correcto 5',
        expectedOutputSubstring: 'Resultado: 5'
      },
      {
        description: 'Maneja la división por cero retornando -1 sin crashear',
        expectedOutputSubstring: 'Resultado: -1'
      }
    ]
  }
];

export const kotlinStorageService = {
  getSavedCode(key: string): string | null {
    try {
      return localStorage.getItem(`prograpp_kt_code_${key}`);
    } catch {
      return null;
    }
  },

  saveCode(key: string, code: string): void {
    try {
      localStorage.setItem(`prograpp_kt_code_${key}`, code);
    } catch {
      // Ignorar quota exceeded
    }
  },

  getSavedTabs(key: string): KotlinFile[] | null {
    try {
      const raw = localStorage.getItem(`prograpp_kt_tabs_${key}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  saveTabs(key: string, tabs: KotlinFile[]): void {
    try {
      localStorage.setItem(`prograpp_kt_tabs_${key}`, JSON.stringify(tabs));
    } catch {
      // Ignorar quota
    }
  }
};
