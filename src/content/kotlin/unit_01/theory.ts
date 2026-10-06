import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_01_THEORY: Record<string, TheoryLesson> = {
  'kotlin-u01-l01': {
    id: 'kt-th-u01-l01',
    lessonId: 'kotlin-u01-l01',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 1,
    title: '1. ¿Qué es un Algoritmo y el Modelo IPO?',
    subtitle: 'El modelo universal de Entrada (Input), Proceso y Salida (Output).',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'El Trinomio Fundamental de la Computación',
        explanation: 'Un algoritmo es una secuencia finita, ordenada y no ambigua de pasos lógicos diseñada para resolver un problema específico o producir un resultado.\n\nTodo sistema informático opera bajo el modelo IPO:\n1. Entrada (Input): Los datos que ingresan al sistema (teclado, sensor, base de datos).\n2. Proceso: La serie de transformaciones matemáticas y lógicas que ejecuta el procesador.\n3. Salida (Output): El resultado entregado al usuario (pantalla, archivo, señal de red).',
        codeSnippet: '// Ejemplo de flujo Entrada -> Proceso -> Salida\nval entrada = 10\nval resultado = entrada * 2 // Proceso de duplicación\nprintln(resultado)          // Salida en terminal: 20',
        codeLanguage: 'kotlin',
        byteTip: 'Si un algoritmo no produce una Salida, para el usuario es indistinguible de un programa congelado. ¡Todo proceso debe comunicar su resultado!',
        keyPoints: [
          'Un algoritmo debe ser finito (tener inicio y final claros).',
          'El orden de los pasos altera de forma crítica el resultado final.',
          'El modelo IPO rige desde un reloj digital hasta un satélite espacial.'
        ]
      }
    ]
  },
  'kotlin-u01-l02': {
    id: 'kt-th-u01-l02',
    lessonId: 'kotlin-u01-l02',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 2,
    title: '2. La Primera Instrucción: println()',
    subtitle: 'Cómo comunicarte con el mundo exterior a través de la consola estándar.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Imprimiendo en la Terminal',
        explanation: 'En Kotlin, la función `println()` es la vía primordial para enviar datos a la salida estándar (consola).\n\nCada vez que invocas `println()`, la máquina virtual imprime el contenido proporcionado dentro de los paréntesis y añade automáticamente un salto de línea al final, desplazando el cursor al renglón siguiente.',
        codeSnippet: 'println("¡Hola, Desarrollador!")\nprintln(42)\nprintln(3.14159)',
        codeLanguage: 'kotlin',
        byteTip: 'Los textos siempre deben ir envueltos en comillas dobles (" "). Los números y valores booleanos se escriben de forma directa.',
        keyPoints: [
          'println() salta de línea al terminar de imprimir.',
          'Las comillas dobles delimitan cadenas de texto literales.',
          'Es la herramienta número 1 para depurar y verificar qué está pasando en tu código.'
        ]
      }
    ]
  },
  'kotlin-u01-l03': {
    id: 'kt-th-u01-l03',
    lessonId: 'kotlin-u01-l03',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 3,
    title: '3. print() vs println() y Caracteres de Escape',
    subtitle: 'Control preciso del cursor de texto y saltos de línea explícitos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Mantenimiento del Cursor en la Misma Línea',
        explanation: 'A diferencia de `println()`, la función `print()` muestra el texto pero NO añade un salto de línea. El cursor permanece en la misma posición, permitiendo que la siguiente impresión continúe inmediatamente a la derecha.\n\nPara forzar saltos de línea manuales dentro de una cadena, se utiliza la secuencia de escape `\\n`.',
        codeSnippet: 'print("Cargando: ")\nprint("50%")\nprintln(" [OK]") // Queda: Cargando: 50% [OK]\n\nprintln("Fila 1\\nFila 2") // Salto manual con \\n',
        codeLanguage: 'kotlin',
        byteTip: 'Usa print() para construir interfaces de texto como barras de progreso o formularios en terminal.',
        keyPoints: [
          'print() deja el cursor al final de lo impreso sin saltar.',
          '\\n inserta un retorno de carro manual en cualquier parte de un string.',
          '\\t inserta una tabulación horizontal limpia.'
        ]
      }
    ]
  },
  'kotlin-u01-l04': {
    id: 'kt-th-u01-l04',
    lessonId: 'kotlin-u01-l04',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 4,
    title: '4. La Estructura de la Función main()',
    subtitle: 'El punto de entrada oficial para la Máquina Virtual de Java (JVM).',
    estimatedMinutes: 4,
    sections: [
      {
        title: '¿Por dónde empieza a leer la computadora?',
        explanation: 'Un programa en Kotlin puede tener cientos de archivos y miles de líneas, pero la máquina siempre necesita saber cuál es la primera instrucción a ejecutar.\n\nEse punto de inicio universal es la función `main()`. Se declara con la palabra reservada `fun`, seguida del identificador `main`, paréntesis vacíos `()` y un par de llaves `{}` que encierran el bloque de código.',
        codeSnippet: 'fun main() {\n    // El programa despierta aquí\n    println("Iniciando sistema...")\n    println("Listo.")\n}',
        codeLanguage: 'kotlin',
        byteTip: 'En Kotlin moderno no es obligatorio declarar parámetros (args: Array<String>) si no los vas a usar. ¡fun main() simple es 100% válido!',
        keyPoints: [
          'fun es la palabra reservada para declarar funciones.',
          'El código ejecutable debe residir dentro de un bloque funcional.',
          'Las llaves { } delimitan el ámbito y ciclo de vida de las instrucciones.'
        ]
      }
    ]
  },
  'kotlin-u01-l05': {
    id: 'kt-th-u01-l05',
    lessonId: 'kotlin-u01-l05',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 5,
    title: '5. Diagramas de Flujo y Toma de Decisiones',
    subtitle: 'Mapeo visual de la lógica antes de escribir código.',
    estimatedMinutes: 4,
    sections: [
      {
        title: 'Simbología Estándar de Diagramas',
        explanation: 'Antes de programar soluciones complejas, los ingenieros diagraman el flujo de datos usando figuras geométricas con significado formal:\n- Óvalo: Inicio y Fin del algoritmo.\n- Rectángulo: Proceso o cálculo matemático (ej. total = precio * 1.16).\n- Rombo: Decisión o condición lógica con dos salidas (Verdadero / Falso).\n- Paralelogramo: Entrada o Salida de datos.',
        codeSnippet: '// Representación en código del rombo de decisión:\nval saldo = 100\nval precio = 70\nif (saldo >= precio) {\n    println("Compra aprobada")\n} else {\n    println("Saldo insuficiente")\n}',
        codeLanguage: 'kotlin',
        byteTip: 'Un rombo en un diagrama siempre se traduce en un condicional if/else en el código fuente.',
        keyPoints: [
          'Los diagramas de flujo evitan diseñar lógica circular o infinita.',
          'Toda decisión lógica (rombo) debe tener caminos bien definidos para True y False.',
          'Facilitan la comunicación técnica entre programadores y diseñadores.'
        ]
      }
    ]
  },
  'kotlin-u01-l06': {
    id: 'kt-th-u01-l06',
    lessonId: 'kotlin-u01-l06',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 6,
    title: '6. Introducción a Variables: Espacios con Nombre',
    subtitle: 'Cómo guardar información en la memoria RAM para reutilizarla.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Cajas Etiquetadas en Memoria',
        explanation: 'Una variable es una celda con nombre en la memoria del computador donde guardamos un valor temporalmente. En lugar de recordar direcciones binarias hexadecimales como 0x7FFF, le asignamos un identificador semántico como `nivel`, `usuario` o `puntos`.',
        codeSnippet: 'val nombre = "Ada Lovelace"\nval edad = 36\nprintln(nombre)\nprintln(edad)',
        codeLanguage: 'kotlin',
        byteTip: 'Usa nombres en formato camelCase (ej: puntosDeExperiencia) para variables en Kotlin.',
        keyPoints: [
          'Las variables permiten que los algoritmos sean dinámicos y procesen datos distintos.',
          'Una variable debe declararse antes de poder ser leída.',
          'El operador = significa asignación de derecha a izquierda, no igualdad matemática.'
        ]
      }
    ]
  },
  'kotlin-u01-l07': {
    id: 'kt-th-u01-l07',
    lessonId: 'kotlin-u01-l07',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 7,
    title: '7. Inmutabilidad: La Filosofía val',
    subtitle: 'Por qué el código que no cambia es el código más seguro.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Variables de Solo Lectura',
        explanation: 'En Kotlin existen dos palabras para crear variables: `val` y `var`. La palabra `val` proviene de "value" (valor) y define una variable inmutable: una vez asignada, su contenido jamás puede modificarse ni reasignarse.',
        codeSnippet: 'val pi = 3.14159\n// pi = 3.14 // Error de compilación: Val cannot be reassigned',
        codeLanguage: 'kotlin',
        byteTip: 'Regla de oro de Kotlin: declara TODO con val. Solo cambia a var si tienes una razón indiscutible para reasignar.',
        keyPoints: [
          'val previene efectos secundarios accidentales en programas grandes.',
          'Ayuda al compilador a optimizar el rendimiento en memoria.',
          'Hace que el código sea predecible y fácil de razonar.'
        ]
      }
    ]
  },
  'kotlin-u01-l08': {
    id: 'kt-th-u01-l08',
    lessonId: 'kotlin-u01-l08',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 8,
    title: '8. Mutabilidad: Cuándo Usar var',
    subtitle: 'Contadores, estados de juego y variables que evolucionan en el tiempo.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Variables Reasignables',
        explanation: 'Cuando una variable debe cambiar de valor a medida que el algoritmo avanza (por ejemplo, el contador de vidas de un jugador, el saldo de una cuenta o el acumulador de un bucle), usamos `var` (de variable).',
        codeSnippet: 'var vidas = 3\nprintln(vidas) // 3\nvidas = vidas - 1\nprintln(vidas) // 2',
        codeLanguage: 'kotlin',
        byteTip: 'Aunque var permite cambiar el valor, NO permite cambiar el tipo de dato. Si nació como entero, no puedes meterle un texto después.',
        keyPoints: [
          'var permite reasignar nuevos valores con el operador =.',
          'El tipo de dato original queda sellado de forma estricta.',
          'Limita el uso de var al mínimo necesario para evitar errores de estado mutable.'
        ]
      }
    ]
  },
  'kotlin-u01-l09': {
    id: 'kt-th-u01-l09',
    lessonId: 'kotlin-u01-l09',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 9,
    title: '9. Reglas de Nombrado de Identificadores',
    subtitle: 'Buenas prácticas y restricciones léxicas para nombrar tus datos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '¿Qué nombres son válidos en Kotlin?',
        explanation: 'Un identificador en Kotlin debe seguir reglas estrictas impuestas por el analizador léxico:\n1. Debe comenzar con una letra (a-z, A-Z) o un guión bajo (_). Jamás con un número.\n2. No puede contener espacios ni caracteres especiales (?, !, #, -, @).\n3. Es sensible a mayúsculas y minúsculas (`saldo` es diferente de `Saldo`).\n4. No puede ser una palabra reservada del lenguaje (`fun`, `val`, `var`, `class`, `if`).',
        codeSnippet: 'val puntajeMaximo = 500 // Válido y legible (camelCase)\nval _token = "abc"      // Válido\n// val 1lugar = "Oro"   // Ilegal: inicia con número\n// val puntos-totales = 10 // Ilegal: guión medio es resta',
        codeLanguage: 'kotlin',
        byteTip: 'Escribe siempre nombres descriptivos. Un nombre como tiempoTranscurridoSegundos es 100 veces mejor que x o t.',
        keyPoints: [
          'Usa camelCase para variables y funciones.',
          'Los identificadores nunca deben empezar con números.',
          'Evita abreviaturas crípticas de una sola letra salvo en índices i de bucles.'
        ]
      }
    ]
  },
  'kotlin-u01-l10': {
    id: 'kt-th-u01-l10',
    lessonId: 'kotlin-u01-l10',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 10,
    title: '10. El Tipo Entero: Int',
    subtitle: 'Representación en complemento a dos y rangos numéricos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Números sin Decimales',
        explanation: 'El tipo `Int` almacena números enteros con signo de 32 bits. Su rango comprende desde -2,147,483,648 hasta 2,147,483,647. Es el tipo por defecto cuando escribes un número entero en Kotlin.',
        codeSnippet: 'val estudiantes: Int = 28\nval temperatura: Int = -5\nval suma = estudiantes + 2 // 30',
        codeLanguage: 'kotlin',
        byteTip: 'Puedes usar guiones bajos en números grandes para facilitar la lectura visual: val unMillon = 1_000_000.',
        keyPoints: [
          'Int abarca números positivos, negativos y el cero.',
          'Soporta aritmética exacta sin pérdida de precisión de redondeo.',
          'Si requieres números mayores a 2 mil millones, debes usar Long.'
        ]
      }
    ]
  },
  'kotlin-u01-l11': {
    id: 'kt-th-u01-l11',
    lessonId: 'kotlin-u01-l11',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 11,
    title: '11. Números Decimales: Double y Float',
    subtitle: 'Punto flotante bajo el estándar IEEE 754.',
    estimatedMinutes: 4,
    sections: [
      {
        title: 'Precisión Simple vs Doble',
        explanation: 'Para valores continuos y mediciones con parte decimal, Kotlin dispone de dos tipos:\n- `Double` (64 bits): Precisión estándar por defecto (aprox. 15-17 dígitos decimales).\n- `Float` (32 bits): Menor precisión y uso de memoria (aprox. 6-7 dígitos). Requiere el sufijo `f` o `F` obligatorio.',
        codeSnippet: 'val precio = 19.99      // Inferido como Double\nval aceleracion = 9.8f // Sufijo f obligatorio para Float',
        codeLanguage: 'kotlin',
        byteTip: 'En Kotlin, dividir dos enteros (ej. 7 / 2) da 3. Para obtener 3.5, al menos uno debe ser Double: 7.0 / 2.',
        keyPoints: [
          'Double es el tipo decimal preferido por defecto.',
          'Float exige terminar el literal numérico con f.',
          'Cuidado con la igualdad exacta == en decimales debido a imprecisiones de coma flotante.'
        ]
      }
    ]
  },
  'kotlin-u01-l12': {
    id: 'kt-th-u01-l12',
    lessonId: 'kotlin-u01-l12',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 12,
    title: '12. Cadenas de Caracteres: String',
    subtitle: 'Manejo de texto, inmutabilidad y longitud.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Texto entre Comillas Dobles',
        explanation: 'El tipo `String` representa una secuencia inmutable de caracteres Unicode. Puedes consultar su longitud con la propiedad `.length` y transformar su contenido con funciones integradas como `.uppercase()` o `.lowercase()`.',
        codeSnippet: 'val saludo = "Hola, Kotlin"\nprintln(saludo.length)    // 12 caracteres\nprintln(saludo.uppercase()) // "HOLA, KOTLIN"',
        codeLanguage: 'kotlin',
        byteTip: 'Los strings en Kotlin son inmutables. Modificarlos crea una nueva cadena en memoria, dejando la original intacta.',
        keyPoints: [
          'Los literales String se encierran siempre en comillas dobles " ".',
          '.length devuelve el conteo total de caracteres.',
          'Ofrece decenas de métodos auxiliares para validar y transformar texto.'
        ]
      }
    ]
  },
  'kotlin-u01-l13': {
    id: 'kt-th-u01-l13',
    lessonId: 'kotlin-u01-l13',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 13,
    title: '13. Plantillas de Texto: String Templates',
    subtitle: 'Interpolación de variables limpia y elegante sin usar el operador +.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'El Símbolo $ en Cadenas',
        explanation: 'En lugar de concatenar cadenas de forma engorrosa con el operador `+` (`"Hola " + nombre + " tienes " + edad`), Kotlin permite interpolar variables directamente dentro del texto anteponiendo el signo `$`.',
        codeSnippet: 'val nombre = "Carlos"\nval racha = 5\nprintln("¡Bienvenido $nombre! Tu racha es de $racha días.")',
        codeLanguage: 'kotlin',
        byteTip: 'Si necesitas imprimir el símbolo de dólar literal sin interpolar, usa el carácter de escape: \\$99.',
        keyPoints: [
          'La interpolación con $ es más limpia, legible y rápida que concatenar con +.',
          'Convierte automáticamente cualquier tipo de dato a su representación textual.',
          'Es el estándar idiomático de Kotlin recomendado por JetBrains.'
        ]
      }
    ]
  },
  'kotlin-u01-l14': {
    id: 'kt-th-u01-l14',
    lessonId: 'kotlin-u01-l14',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 14,
    title: '14. Expresiones Complejas en Plantillas: ${...}',
    subtitle: 'Evaluar cálculos y llamadas a métodos directamente dentro de un String.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Interpolando Bloques de Código',
        explanation: 'Cuando quieres insertar no solo una variable simple sino el resultado de una operación o llamar a un método de un objeto dentro de la cadena, debes envolver la expresión entre llaves: `${expresion}`.',
        codeSnippet: 'val base = 10\nval impuesto = 2\nprintln("Total a pagar: ${base + impuesto} dólares")\n\nval usuario = "dev_junior"\nprintln("Longitud del usuario: ${usuario.length}")',
        codeLanguage: 'kotlin',
        byteTip: 'Si omites las llaves en $base + impuesto, solo interpolará base y el resto se imprimirá como texto plano.',
        keyPoints: [
          '${ } permite evaluar cualquier expresión válida de Kotlin dentro del String.',
          'Evita tener que crear variables temporales intermedias solo para imprimir.',
          'Mantiene el formato del mensaje limpio y condensado.'
        ]
      }
    ]
  },
  'kotlin-u01-l15': {
    id: 'kt-th-u01-l15',
    lessonId: 'kotlin-u01-l15',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 15,
    title: '15. Aritmética Básica y Precedencia PEMDAS',
    subtitle: 'Suma, resta, multiplicación y el orden de evaluación matemática.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'El Orden de las Operaciones',
        explanation: 'Kotlin respeta estrictamente la jerarquía matemática universal PEMDAS (Paréntesis, Exponentes, Multiplicación/División, Adición/Sustracción). La multiplicación y división siempre se evalúan antes que la suma y la resta a menos que uses paréntesis `( )`.',
        codeSnippet: 'val resultado1 = 2 + 3 * 4   // 2 + 12 = 14\nval resultado2 = (2 + 3) * 4 // 5 * 4 = 20\nprintln(resultado1)\nprintln(resultado2)',
        codeLanguage: 'kotlin',
        byteTip: 'Ante cualquier duda de precedencia, usa paréntesis explícitos. No tienen costo de rendimiento y hacen tu intención 100% clara.',
        keyPoints: [
          'Multiplicación (*) y división (/) tienen mayor jerarquía que suma (+) y resta (-).',
          'Los paréntesis fuerzan el orden de evaluación inmediato.',
          'Las operaciones de igual jerarquía se resuelven de izquierda a derecha.'
        ]
      }
    ]
  },
  'kotlin-u01-l16': {
    id: 'kt-th-u01-l16',
    lessonId: 'kotlin-u01-l16',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 16,
    title: '16. El Peligro del Truncamiento en División Entera',
    subtitle: 'Por qué 7 / 2 es 3 y cómo resolverlo con .toDouble().',
    estimatedMinutes: 4,
    sections: [
      {
        title: 'División entre Tipos Int',
        explanation: 'En Kotlin y muchos lenguajes fuertemente tipados, cuando divides dos enteros (`Int / Int`), el resultado es obligatoriamente otro `Int`. Los decimales se truncan y descartan por completo, NO se redondean.\n\nPara obtener el resultado real con coma decimal, debes convertir al menos uno de los operandos a `Double`.',
        codeSnippet: 'val trunco = 7 / 2                 // 3 (se perdió el 0.5)\nval exacto = 7.toDouble() / 2      // 3.5\nval decimalDirecto = 7.0 / 2       // 3.5',
        codeLanguage: 'kotlin',
        byteTip: 'Este es uno de los bugs más comunes en programación de videojuegos y cálculo de promedios de notas.',
        keyPoints: [
          'Int / Int siempre trunca hacia cero el residuo.',
          '.toDouble() convierte un entero a punto flotante de 64 bits.',
          'Basta con que uno de los dos términos sea Double para que la operación ascienda a Double.'
        ]
      }
    ]
  },
  'kotlin-u01-l17': {
    id: 'kt-th-u01-l17',
    lessonId: 'kotlin-u01-l17',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 17,
    title: '17. El Operador Módulo (%): Residuos y Paridad',
    subtitle: 'La herramienta secreta para saber si un número es par, múltiplo o ciclar listas.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '¿Qué sobra tras la división?',
        explanation: 'El operador `%` no calcula porcentajes. Devuelve el residuo (resto) exacto de la división entera entre dos números.\n\nPor ejemplo, `10 % 3` es `1`, porque 3 cabe 3 veces en 10 (9) y sobra 1.',
        codeSnippet: 'val num = 14\nval esPar = (num % 2 == 0) // Si el residuo entre 2 es 0, es par\nprintln(esPar) // true\n\nval residuo = 17 % 5 // 5*3=15, sobran 2\nprintln(residuo)     // 2',
        codeLanguage: 'kotlin',
        byteTip: 'Usa % para alternar colores de filas en tablas (fila % 2 == 0) o para ciclar índices sin salirte de un límite.',
        keyPoints: [
          'numero % 2 == 0 identifica números pares.',
          'numero % n == 0 verifica si un número es múltiplo de n.',
          'El residuo siempre es estrictamente menor que el divisor.'
        ]
      }
    ]
  },
  'kotlin-u01-l18': {
    id: 'kt-th-u01-l18',
    lessonId: 'kotlin-u01-l18',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 18,
    title: '18. Comparadores de Igualdad: == y !=',
    subtitle: 'Comprobando si dos valores son idénticos o distintos en Kotlin.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Comparación Estructural',
        explanation: 'Para verificar si dos valores son iguales, usamos el operador `==`. Si queremos verificar si son diferentes, usamos `!=`.\n\nA diferencia de Java (donde == compara referencias de memoria en strings), en Kotlin `==` compara el contenido real estructural de manera segura.',
        codeSnippet: 'val claveGuardada = "secreto"\nval intento = "secreto"\n\nval coincide = (claveGuardada == intento) // true\nval diferente = (10 != 20)                 // true',
        codeLanguage: 'kotlin',
        byteTip: 'No confundas nunca = (asignar valor a una variable) con == (comparar dos valores).',
        keyPoints: [
          '== evalúa a true si los dos operandos tienen el mismo valor.',
          '!= evalúa a true si los operandos son diferentes.',
          'El resultado de cualquier comparación es siempre un booleano (Boolean).'
        ]
      }
    ]
  },
  'kotlin-u01-l19': {
    id: 'kt-th-u01-l19',
    lessonId: 'kotlin-u01-l19',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 19,
    title: '19. Comentarios en el Código: // y /* */',
    subtitle: 'Documentar tu lógica para tu yo del futuro y tus compañeros de equipo.',
    estimatedMinutes: 3,
    sections: [
      {
        title: 'Código que el Compilador Ignora',
        explanation: 'Los comentarios son anotaciones en lenguaje humano que el compilador pasa por alto por completo durante la generación del bytecode.\n\n- Comentario de una línea: Inicia con `//` y abarca hasta el final del renglón.\n- Comentario multilínea: Inicia con `/*` y concluye con `*/`.',
        codeSnippet: '// Este es un comentario de una sola línea\nval velocidad = 120\n\n/* \n   Bloque de documentación extenso\n   Autor: Ada Lovelace\n   Versión: 1.0\n*/\nprintln(velocidad)',
        codeLanguage: 'kotlin',
        byteTip: 'No comentes lo obvio (ej. // suma 1 a x). Comenta el PORQUÉ de las decisiones no evidentes del negocio.',
        keyPoints: [
          '// se usa para aclaraciones breves y desactivar líneas temporalmente.',
          '/* */ permite envolver párrafos enteros de explicación.',
          'El código limpio y auto-explicativo reduce la necesidad de comentarios excesivos.'
        ]
      }
    ]
  },
  'kotlin-u01-l20': {
    id: 'kt-th-u01-l20',
    lessonId: 'kotlin-u01-l20',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 20,
    title: '20. Proyecto Integrador: El Simulador de Cajero ATM',
    subtitle: 'Uniendo Entrada, Proceso, Salida, variables y operadores en un caso real.',
    estimatedMinutes: 5,
    sections: [
      {
        title: 'Arquitectura del Algoritmo del Cajero',
        explanation: 'En este nivel final de la Unidad 1 consolidamos todo lo aprendido:\n1. Estado inicial en memoria con variables (`var saldo`, `val pinCorrecto`).\n2. Entrada de datos simulada (`val montoRetiro`).\n3. Proceso de validación matemática y lógica (`saldo >= montoRetiro`).\n4. Salida en consola con plantillas de texto `${ }`.',
        codeSnippet: 'fun main() {\n    var saldo = 500\n    val retiro = 150\n    \n    println("Saldo anterior: \\$$saldo")\n    saldo -= retiro\n    \n    println("Retiro exitoso de \\$$retiro")\n    println("Nuevo saldo disponible: \\$$saldo")\n}',
        codeLanguage: 'kotlin',
        byteTip: '¡Felicidades por completar la teoría de la Unidad 1! Ahora pon a prueba tu destreza en los retos prácticos y enfréntate al Jefe de Unidad.',
        keyPoints: [
          'Un programa real es la orquestación ordenada de variables, operadores y salidas.',
          'La inmutabilidad protege las reglas y la mutabilidad modela el cambio.',
          'Estás listo para dominar la Unidad 2: Variables y Tipos de Datos a fondo.'
        ]
      }
    ]
  }
};
