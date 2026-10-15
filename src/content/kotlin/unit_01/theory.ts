import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_01_THEORY: Record<string, TheoryLesson> = {
  'kotlin-u01-l01': {
    id: 'kt-th-u01-l01',
    lessonId: 'kotlin-u01-l01',
    pathId: 'kotlin',
    unitId: 1,
    levelId: 1,
    title: '1. ¿Qué es un Algoritmo y el Modelo IPO?',
    subtitle: 'El modelo universal de Entrada (Input), Proceso y Salida (Output) que gobierna toda la computación moderna.',
    estimatedMinutes: 5,
    analogy: 'Imagina una receta de cocina en un restaurante: los ingredientes frescos son la Entrada (Input), las técnicas de corte, cocción y mezclado del chef son el Proceso, y el platillo servido y listo en la mesa del comensal es la Salida (Output). Si falta un paso o el orden se altera, el platillo se arruina.',
    video: {
      title: '¿Qué es un Algoritmo y cómo piensa una computadora?',
      channel: 'EDteam / Computer Science Basics',
      duration: '8:45',
      url: 'https://www.youtube.com/watch?v=U3CGMyJZ9R8',
      summary: 'Descubre qué es un algoritmo en la vida real, cómo se descomponen problemas complejos y por qué el modelo Input-Process-Output rige desde un microondas hasta la inteligencia artificial.'
    },
    sections: [
      {
        title: 'El Trinomio Fundamental de la Computación',
        explanation: 'Un algoritmo es una secuencia finita, ordenada, precisa y no ambigua de pasos lógicos diseñada para resolver un problema específico o producir un resultado predecible.\n\nTodo sistema informático del planeta, desde una calculadora de bolsillo hasta los servidores de Google, opera bajo la arquitectura IPO:\n\n1. Entrada (Input): Son los datos iniciales que ingresan al sistema. Pueden provenir de un usuario tecleando, de sensores de un teléfono móvil, de una base de datos o de una petición de red.\n2. Proceso: Es el conjunto de operaciones matemáticas, comparaciones lógicas y transformaciones que el procesador ejecuta sobre los datos de entrada.\n3. Salida (Output): Es el resultado final entregado al exterior, como texto en la terminal, gráficos en una pantalla, una notificación sonora o la persistencia de un archivo.',
        codeSnippet: `// 1. ENTRADA (Input): Datos iniciales
val precioProducto = 120.0
val porcentajeDescuento = 15.0

// 2. PROCESO: Transformación matemática lógica
val ahorro = precioProducto * (porcentajeDescuento / 100.0)
val precioFinal = precioProducto - ahorro

// 3. SALIDA (Output): Resultado comunicado al usuario
println("Precio original: $" + precioProducto)
println("Descuento aplicado: $" + ahorro)
println("Total a pagar: $" + precioFinal)`,
        codeLanguage: 'kotlin',
        outputSnippet: `Precio original: $120.0
Descuento aplicado: $18.0
Total a pagar: $102.0`,
        byteTip: 'Si un programa procesa datos pero nunca emite una Salida (a consola, pantalla o archivo), para el usuario es indistinguible de un programa congelado. ¡Todo software útil debe comunicar su resultado!',
        pitfallTip: 'No asumas que la computadora "sabe" qué hacer. Si omites un paso intermedio (por ejemplo, calcular el descuento antes de restarlo), la máquina no adivinará tu intención y arrojará un error o un resultado absurdo.',
        keyPoints: [
          'Un algoritmo debe ser estrictamente finito (debe tener un inicio y un final claros).',
          'El orden de los pasos es crítico: alterar la secuencia cambia por completo el resultado.',
          'El modelo IPO (Entrada -> Proceso -> Salida) es el cimiento de cualquier programa informático.'
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
    subtitle: 'Cómo comunicarte con el mundo exterior y enviar mensajes legibles a la consola estándar.',
    estimatedMinutes: 5,
    analogy: '`println()` es como enviar un mensaje de texto y presionar la tecla "Enter". El mensaje aparece en la pantalla y el cursor salta automáticamente al renglón de abajo, listo para el siguiente texto sin amontonarse.',
    video: {
      title: 'Tu primer programa en Kotlin: println() y la terminal',
      channel: 'Kotlin by JetBrains Official',
      duration: '6:15',
      url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
      summary: 'Aprende a ejecutar tu primera línea de código en Kotlin, comprendiendo cómo la función println() interactúa con la salida estándar del sistema operativo.'
    },
    sections: [
      {
        title: 'Imprimiendo en la Terminal Estándar',
        explanation: 'En Kotlin, la función `println()` (abreviatura de *print line*) es la herramienta primordial para escribir información en la consola de salida estándar (stdout).\n\nCada vez que ejecutas `println(...)`, ocurren dos cosas:\n1. Se evalúa el contenido dentro de los paréntesis y se convierte a texto visible.\n2. Al terminar de imprimir el último carácter, se añade de forma automática un salto de línea invisible (`\\n`), desplazando el cursor al siguiente renglón para que las futuras impresiones no se sobreescriban ni queden pegadas.',
        codeSnippet: `// Imprimiendo texto literal (siempre entre comillas dobles)
println("¡Hola, Mundo desde Kotlin!")

// Imprimiendo números y cálculos directos (sin comillas)
println(2026)
println(10 + 25)

// Imprimiendo valores booleanos
println(true)`,
        codeLanguage: 'kotlin',
        outputSnippet: `¡Hola, Mundo desde Kotlin!
2026
35
true`,
        byteTip: 'Usa comillas dobles (" ") para textos. Si pones comillas en un número como "10 + 25", Kotlin lo tomará como texto literal e imprimirá exactamente los caracteres "10 + 25" en vez de resolver la suma 35.',
        pitfallTip: 'En Kotlin los textos literales NUNCA deben llevar comillas simples (\' \'). Las comillas simples están reservadas exclusivamente para un único carácter (tipo Char). Para palabras o frases completas, usa siempre comillas dobles (" ").',
        keyPoints: [
          'println() imprime el argumento proporcionado y salta de línea de inmediato.',
          'Es la técnica de depuración (debugging) más rápida y directa para inspeccionar qué está pasando en tu código.',
          'Los textos van entre comillas dobles ("texto"); los números y expresiones matemáticas van sin comillas.'
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
    subtitle: 'Control milimétrico del cursor en pantalla y caracteres especiales como saltos y tabulaciones.',
    estimatedMinutes: 5,
    analogy: '`print()` es como una máquina de escribir clásica que escribe una letra tras otra sin mover la palanca de retorno. `println()` escribe y de inmediato jala la palanca hacia abajo para empezar en una línea limpia.',
    video: {
      title: 'Diferencias entre print y println en Kotlin con caracteres de escape',
      channel: 'Programación Fácil / Kotlin Essentials',
      duration: '7:20',
      url: 'https://www.youtube.com/watch?v=fXvU7u7d3-c',
      summary: 'Ejemplos detallados de cuándo usar print() para construir salidas continuas en la misma línea y cómo usar \\n y \\t para formatear tablas en consola.'
    },
    sections: [
      {
        title: 'Mantenimiento del Cursor y Caracteres Especiales',
        explanation: 'La diferencia técnica entre ambas funciones es muy clara:\n- `print()`: Muestra el contenido pero deja el cursor exactamente donde terminó de escribir. La siguiente instrucción continuará imprimiendo en esa misma línea horizontal.\n- `println()`: Muestra el contenido y envía un salto de línea.\n\nAdemás, existen los Caracteres de Escape, que inician con barra invertida (`\\`) y representan acciones invisibles dentro de una cadena:\n- `\\n`: Salto de línea manual (New line).\n- `\\t`: Tabulación horizontal (Tab, equivalente a 4 espacios para alinear columnas).\n- `\\\\`: Imprime una barra invertida literal.\n- `\\"`: Permite poner comillas dobles dentro de un texto sin romperlo.',
        codeSnippet: `// Construyendo una barra de progreso en la misma línea con print()
print("Cargando módulos: ")
print("[■■■■■")
print("□□□□□] ")
println("50%")

// Salto de línea manual con \\n y tabulación con \\t
println("ID\\tPRODUCTO\\tPRECIO")
println("01\\tTeclado\\t$45")
println("02\\tMouse\\t$25")

// Comillas escapadas dentro de un texto
println("Ella dijo: \\"Kotlin es increíble\\"")`,
        codeLanguage: 'kotlin',
        outputSnippet: `Cargando módulos: [■■■■■□□□□□] 50%
ID\tPRODUCTO\tPRECIO
01\tTeclado\t$45
02\tMouse\t$25
Ella dijo: "Kotlin es increíble"`,
        byteTip: 'Usa \\t para formatear reportes tabulares y listas en terminal sin necesidad de calcular espacios manualmente.',
        pitfallTip: 'Cuidado con confundir la barra diagonal normal (/) con la barra invertida (\\). Si escribes /n, la consola imprimirá la letra /n tal cual; solo \\n activa el salto de línea.',
        keyPoints: [
          'print() no salta de línea: perfecto para prefijos, prompts y barras de progreso.',
          'println() siempre salta de línea al final.',
          '\\n inserta saltos de línea explícitos dentro de cualquier String.',
          '\\t genera espaciado tabular para alinear texto en columnas.'
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
    subtitle: 'El punto de entrada oficial donde el sistema operativo y la JVM inician la ejecución de tu aplicación.',
    estimatedMinutes: 5,
    analogy: 'La función `main()` es como la puerta principal de un edificio corporativo. No importa qué tan grande sea el rascacielos o cuántas habitaciones tenga, todos los visitantes deben entrar obligatoriamente por la puerta principal.',
    video: {
      title: 'Estructura de un proyecto Kotlin y la función main',
      channel: 'JetBrains Academy',
      duration: '9:10',
      url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
      summary: 'Descubre cómo la JVM ubica el punto de entrada main(), qué significa la palabra reservada fun y cómo se ejecutan las instrucciones de arriba hacia abajo.'
    },
    sections: [
      {
        title: 'Anatomía del Punto de Entrada del Programa',
        explanation: 'Un proyecto en Kotlin puede contener cientos de archivos `.kt` y miles de clases. Sin embargo, la computadora necesita saber exactamente en qué instrucción comenzar a trabajar.\n\nEse punto de inicio universal es la función `main()`. Al ejecutar el programa, la Máquina Virtual de Java (JVM) busca esta función y comienza a procesar sus instrucciones de arriba a abajo, en riguroso orden secuencial.\n\nEstructura sintáctica:\n- `fun`: Palabra reservada que indica la declaración de una función.\n- `main`: Nombre especial reservado reconocido por el compilador como punto de entrada.\n- `()`: Lista de parámetros (en Kotlin moderno puede dejarse vacía).\n- `{ ... }`: Bloque de código donde residen las instrucciones ejecutables.',
        codeSnippet: `// Declaración estándar y moderna de la función main en Kotlin
fun main() {
    println("--- SISTEMA INICIADO ---")
    println("Paso 1: Verificando memoria...")
    println("Paso 2: Conectando servicios...")
    println("Paso 3: ¡Listo para operar!")
    println("--- SISTEMA FINALIZADO ---")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `--- SISTEMA INICIADO ---
Paso 1: Verificando memoria...
Paso 2: Conectando servicios...
Paso 3: ¡Listo para operar!
--- SISTEMA FINALIZADO ---`,
        byteTip: 'En versiones antiguas de Kotlin y Java era obligatorio escribir fun main(args: Array<String>). En Kotlin moderno basta con fun main(), haciéndolo mucho más limpio y legible.',
        pitfallTip: 'Las instrucciones sueltas escritas fuera del cuerpo de una función (fuera de las llaves { }) provocarán un error de compilación. Todo código ejecutable debe residir dentro de un bloque funcional.',
        keyPoints: [
          'fun main() es el punto de arranque de cualquier programa ejecutable en Kotlin.',
          'Las instrucciones dentro de las llaves { } se ejecutan secuencialmente de arriba hacia abajo.',
          'Al llegar a la última llave de cierre de main(), el programa termina y devuelve el control al sistema operativo.'
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
    subtitle: 'Mapeo visual de la lógica algorítmica y bifurcaciones condicionales antes de escribir código.',
    estimatedMinutes: 5,
    analogy: 'Un diagrama de flujo es como el mapa de un GPS en una bifurcación de autopista: si el peaje está abierto (Verdadero), sigues por el carril rápido; si está cerrado (Falso), tomas la salida alterna. Nunca puedes tomar ambos caminos simultáneamente.',
    video: {
      title: 'Diagramas de Flujo desde cero: Simbología y Ejemplos Prácticos',
      channel: 'Píldoras Informáticas / Lógica de Programación',
      duration: '11:30',
      url: 'https://www.youtube.com/watch?v=Kucgg5f_tTU',
      summary: 'Aprende los símbolos universales de diagramación (óvalos, rectángulos, rombos de decisión y paralelogramos) y cómo traducirlos a código real.'
    },
    sections: [
      {
        title: 'Simbología Estándar de la Lógica de Control',
        explanation: 'Antes de programar soluciones complejas, los ingenieros de software diagraman el flujo de control para validar que no existan bucles infinitos ni caminos ciegos.\n\nSimbología universal:\n- Óvalo (Terminador): Representa el Inicio y el Fin del algoritmo.\n- Rectángulo (Proceso): Representa una operación aritmética, asignación de variable o transformación interna.\n- Rombo (Decisión): Representa una condición booleana. Siempre tiene dos salidas exclusivas: una para `Verdadero` (Sí) y otra para `Falso` (No).\n- Paralelogramo (E/S): Representa lectura de datos de entrada o escritura de resultados.',
        codeSnippet: `// Traducción directa de un rombo de decisión a código Kotlin
fun main() {
    val edadUsuario = 19
    val precioBoleto = 10.0

    println("Edad registrada: $edadUsuario")

    // Rombo de decisión: ¿Es mayor de edad?
    if (edadUsuario >= 18) {
        println("Acceso concedido al club nocturno.")
        println("Boleto estándar: $" + precioBoleto)
    } else {
        println("Acceso denegado: debes ser mayor de 18 años.")
    }
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Edad registrada: 19
Acceso concedido al club nocturno.
Boleto estándar: $10.0`,
        byteTip: 'Cada rombo de decisión en tu diagrama siempre se convierte en una estructura condicional if / else en tu código fuente.',
        pitfallTip: 'Un rombo de decisión NUNCA puede tener una sola salida. Si la condición resulta falsa, debes definir explícitamente qué camino tomará el programa o de lo contrario crearás comportamiento inesperado.',
        keyPoints: [
          'Los diagramas de flujo permiten validar la lógica algorítmica antes de cometer errores de sintaxis.',
          'El rombo evalúa una pregunta lógica que solo puede responderse con Sí o No.',
          'Permiten diseñar algoritmos legibles y comunicables entre miembros del equipo técnico.'
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
    subtitle: 'Cómo reservar celdas en la memoria RAM con nombres semánticos para almacenar y recuperar información.',
    estimatedMinutes: 5,
    analogy: 'Una variable es como una caja organizadora en una bodega con una etiqueta visible pegada al frente. En lugar de buscar por coordenadas oscuras de la bodega, buscas la caja llamada "nombreCliente" y tomas lo que tiene guardado adentro.',
    video: {
      title: 'Variables y Memoria en Kotlin para Principiantes',
      channel: 'Google Developers / Android Basics in Kotlin',
      duration: '8:05',
      url: 'https://www.youtube.com/watch?v=5flXfy_O_8E',
      summary: 'Descubre qué ocurre físicamente en la memoria RAM cuando declaras una variable, cómo el compilador asocia nombres a datos y cómo reutilizarlos.'
    },
    sections: [
      {
        title: 'Cajas Etiquetadas en la Memoria del Computador',
        explanation: 'En el hardware de tu computadora, la memoria RAM es una cuadrícula gigantesca de bytes identificados por direcciones numéricas hexadecimales complejas como `0x7FFEE4A1`.\n\nPara no volvernos locos recordando números de memoria, los lenguajes de programación crearon el concepto de Variable: un identificador con significado humano que apunta a un espacio en memoria donde se almacena un dato.\n\nEn Kotlin, para crear una variable usamos la estructura:\n`palabraClave nombreVariable = valorInicial`',
        codeSnippet: `fun main() {
    // Reservando espacios en memoria con nombres descriptivos
    val nombreHeroe = "Ada Lovelace"
    val nivel = 42
    val salud = 100.0

    // Leyendo y reutilizando los valores almacenados
    println("Jugador: " + nombreHeroe)
    println("Nivel actual: " + nivel)
    println("Puntos de salud: " + salud)
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Jugador: Ada Lovelace
Nivel actual: 42
Puntos de salud: 100.0`,
        byteTip: 'Elige siempre nombres descriptivos que expliquen qué contiene la variable. Es infinitamente mejor escribir "segundosRestantes" que "s" o "x".',
        pitfallTip: 'El signo igual `=` en programación NO significa igualdad matemática; significa ASIGNACIÓN. Toma el valor que está a la derecha y lo copia dentro de la caja que está a la izquierda.',
        keyPoints: [
          'Una variable reserva un espacio en memoria para guardar un dato temporal durante la ejecución.',
          'Debes declarar la variable antes de poder leerla o usarla.',
          'El operador = asigna de derecha a izquierda.'
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
    subtitle: 'Por qué el código que no muta es el código más seguro, predecible y optimizado del software moderno.',
    estimatedMinutes: 5,
    analogy: 'Una variable declarada con `val` es como grabar tu nombre con cincel en una losa de mármol o un certificado de nacimiento plastificado: una vez escrito, queda sellado para siempre y nadie puede alterarlo por error.',
    video: {
      title: 'val vs var en Kotlin: ¿Por qué preferir la inmutabilidad?',
      channel: 'Philipp Lackner / Android & Kotlin Master',
      duration: '10:15',
      url: 'https://www.youtube.com/watch?v=r0X6Xp8jH5E',
      summary: 'Análisis profundo de la inmutabilidad en Kotlin: por qué JetBrains diseñó el lenguaje para favorecer val por defecto y cómo evita bugs en aplicaciones concurrentes.'
    },
    sections: [
      {
        title: 'La Garantía de Solo Lectura',
        explanation: 'En Kotlin existen dos palabras clave para declarar variables: `val` y `var`.\n\n`val` proviene del inglés *value* (valor) y define una variable inmutable o de solo lectura. Una vez que le asignas un valor inicial, queda sellada de forma permanente: el compilador PROHÍBE taxativamente que vuelvas a asignarle otro valor más adelante.\n\n¿Por qué es esto una ventaja colosal?\n1. Previene bugs accidentales donde una función modifica sin querer un dato crucial.\n2. Permite que múltiples hilos de ejecución (multithreading) lean el dato a la vez sin peligro de corrupción.\n3. El compilador y la JVM pueden optimizar la memoria al saber que el valor jamás cambiará.',
        codeSnippet: `fun main() {
    val gravedadTierra = 9.807
    val nombrePlaneta = "Tierra"

    println("Planeta: " + nombrePlaneta)
    println("Aceleración de gravedad: " + gravedadTierra + " m/s²")

    // Si intentas reasignar una variable val, Kotlin no compilará:
    // gravedadTierra = 10.0 // Error de compilación: Val cannot be reassigned
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Planeta: Tierra
Aceleración de gravedad: 9.807 m/s²`,
        byteTip: 'Regla de Oro en Kotlin: Declara SIEMPRE todas tus variables con val. Solo cámbialas a var si descubres que es estrictamente indispensable reasignar su valor.',
        pitfallTip: 'No confundas inmutable con lento. Las variables val no consumen más recursos; al contrario, ayudan al compilador a generar bytecode más rápido y seguro.',
        keyPoints: [
          'val crea referencias de solo lectura que no pueden reasignarse tras su inicialización.',
          'Intenta reasignar un val y el compilador detendrá la ejecución antes de generar el programa.',
          'La inmutabilidad es el estándar de oro en el desarrollo profesional con Kotlin.'
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
    subtitle: 'Variables reasignables para contadores, acumuladores y estados dinámicos que cambian con el tiempo.',
    estimatedMinutes: 5,
    analogy: 'Una variable declarada con `var` es como una pizarra blanca con marcador borrable: puedes escribir un número, luego borrarlo con una esponja y anotar uno nuevo tantas veces como necesites.',
    video: {
      title: 'Uso correcto de var en Kotlin: Estados y Contadores',
      channel: 'Kotlin by JetBrains Official',
      duration: '7:40',
      url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
      summary: 'Ejemplos prácticos de mutabilidad: cómo actualizar contadores en bucles, gestionar vidas en videojuegos y cuándo el uso de var está justificado.'
    },
    sections: [
      {
        title: 'Variables de Contenido Reasignable',
        explanation: 'En los algoritmos reales existen datos cuyo valor necesita evolucionar en el tiempo: el marcador de un partido de fútbol, el saldo de una cuenta bancaria tras un retiro, o el contador de vueltas de un ciclo.\n\nPara estos casos usamos `var` (de *variable*). Permite que la misma celda de memoria sea actualizada con un nuevo valor mediante el operador de asignación `=`.',
        codeSnippet: `fun main() {
    // Declaración con var (mutable)
    var vidas = 3
    println("Vidas al iniciar la partida: " + vidas)

    // El jugador comete un error: actualizamos la variable
    vidas = vidas - 1
    println("¡Recibiste daño! Vidas restantes: " + vidas)

    // Recupera un corazón extra
    vidas = vidas + 1
    println("¡Obtuviste una poción! Vidas actuales: " + vidas)
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Vidas al iniciar la partida: 3
¡Recibiste daño! Vidas restantes: 2
¡Obtuviste una poción! Vidas actuales: 3`,
        byteTip: 'Aunque var permite cambiar el valor, NO permite cambiar el tipo de dato. Si declaraste var edad = 20 (entero), no puedes asignarle después "veinte" (texto).',
        pitfallTip: 'Usar var en exceso es la causa #1 del llamado "código espagueti": funciones donde el estado muta de forma impredecible y hace casi imposible rastrear bugs.',
        keyPoints: [
          'var define variables cuyo contenido puede ser reasignado en cualquier momento.',
          'El tipo de dato de la variable queda fijado estrictamente en su declaración y no puede alterarse.',
          'Mantén el uso de var restringido a contadores y estados locales pequeños.'
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
    subtitle: 'Normas léxicas obligatorias del compilador y convenciones profesionales de estilo camelCase.',
    estimatedMinutes: 5,
    analogy: 'Las reglas de nombrado son como las placas de un automóvil: la ley prohíbe usar ciertos símbolos extraños o empezar con números para que cualquier oficial o radar pueda leerlas sin confusión.',
    video: {
      title: 'Convenciones de código y nombrado en Kotlin (Official Coding Style)',
      channel: 'JetBrains Developers',
      duration: '8:55',
      url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
      summary: 'Guía oficial de estilo de JetBrains: aprende por qué usamos camelCase en variables, PascalCase en clases y UPPER_CASE en constantes globales.'
    },
    sections: [
      {
        title: 'Reglas Sintácticas y Convención camelCase',
        explanation: 'En Kotlin, los nombres de variables, funciones y clases se conocen como identificadores. El analizador léxico del compilador impone reglas estrictas:\n\n1. Reglas Obligatorias del Compilador:\n- Debe comenzar con una letra (a-z, A-Z) o un guión bajo (`_`). Jamás con un dígito numérico.\n- No puede contener espacios en blanco ni operadores matemáticos (+, -, *, /).\n- No puede usar caracteres especiales como `@`, `#`, `$`, `%` ni puntuación (`?`, `!`).\n- Es sensible a mayúsculas y minúsculas: `saldo`, `Saldo` y `SALDO` son tres variables completamente distintas.\n- No puede llamarse igual que una palabra reservada del lenguaje (`val`, `var`, `fun`, `class`, `if`, etc.).\n\n2. Convención Profesional de la Industria:\n- Variables y funciones se escriben en `camelCase` (primera letra minúscula, y mayúscula al inicio de cada palabra subsecuente: `puntosDeVida`, `precioConImpuesto`).',
        codeSnippet: `fun main() {
    // Identificadores válidos y con excelente estilo camelCase:
    val puntuacionMaxima = 9990
    val nombreCompletoUsuario = "Ada Byron"
    val _tokenSesion = "xk8-99"

    println(nombreCompletoUsuario)
    println(puntuacionMaxima)

    // Ejemplos ILEGALES que causan error de compilación:
    // val 1erLugar = "Oro"       // Error: Inicia con número
    // val precio-total = 50      // Error: El guión medio se interpreta como resta
    // val nombre usuario = "Ana" // Error: No se permiten espacios
    // val fun = "Diversion"      // Error: fun es palabra reservada
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Ada Byron
9990`,
        byteTip: 'Nunca uses variables de una sola letra como a, b, x, salvo que sean contadores genéricos i, j en bucles de tres líneas.',
        pitfallTip: 'Cuidado con la sensibilidad a mayúsculas (case sensitivity). Si declaras "val edad = 20" y luego intentas imprimir "Edad" con E mayúscula, recibirás el error: Unresolved reference: Edad.',
        keyPoints: [
          'Los identificadores nunca deben comenzar con un número ni contener espacios.',
          'La convención oficial de Kotlin es camelCase para variables y funciones.',
          'El lenguaje es case-sensitive: distingue con exactitud mayúsculas de minúsculas.'
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
    subtitle: 'Representación en memoria de 32 bits, rangos exactos y operaciones aritméticas sin decimales.',
    estimatedMinutes: 5,
    analogy: 'Un `Int` es como un contenedor metálico con capacidad para contar hasta 2 mil millones de objetos exactos. No admite fracciones ni pedazos sueltos: solo unidades completas.',
    video: {
      title: 'Tipos Numéricos en Kotlin: De Byte a Int y Long',
      channel: 'freeCodeCamp.org',
      duration: '12:20',
      url: 'https://www.youtube.com/watch?v=EExSSotojVI',
      summary: 'Comprende el almacenamiento de enteros en binario de 32 bits, los límites de desbordamiento (overflow) y cómo usar separadores de dígitos para mayor legibilidad.'
    },
    sections: [
      {
        title: 'Números Enteros de 32 Bits',
        explanation: 'El tipo `Int` es el rey indiscutible de los números en Kotlin. Almacena valores numéricos enteros (positivos, negativos y el cero) representados en 32 bits en memoria bajo el formato binario de complemento a dos.\n\nRango técnico exacto:\n- Mínimo: `-2,147,483,648` (aproximadamente -2.14 mil millones).\n- Máximo: `2,147,483,647` (aproximadamente +2.14 mil millones).\n\nCualquier número entero sin punto decimal que escribas en tu código (como `42`, `-10`, `1000`) es inferido automáticamente por Kotlin como un `Int`.',
        codeSnippet: `fun main() {
    // Declaración explícita e inferida
    val cantidadAlumnos: Int = 30
    val temperaturaCongelacion = 0
    val saldoDeuda = -1500

    // Uso de guiones bajos como separadores de miles (mejora visual)
    val habitantesCiudad = 1_850_000

    println("Alumnos inscritos: " + cantidadAlumnos)
    println("Temperatura: " + temperaturaCongelacion + "°C")
    println("Población: " + habitantesCiudad + " personas")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Alumnos inscritos: 30
Temperatura: 0°C
Población: 1850000 personas`,
        byteTip: 'En Kotlin puedes usar guiones bajos _ dentro de números grandes como 1_000_000. El compilador los ignora por completo y hace que cifras largas sean fáciles de leer sin marearse.',
        pitfallTip: 'Si intentas almacenar un valor mayor a 2,147,483,647 en un Int, ocurrirá un desbordamiento numérico (overflow). Para poblaciones mundiales o dinero a escala planetaria, debes usar el tipo Long (64 bits).',
        keyPoints: [
          'Int ocupa 32 bits en memoria y almacena números enteros sin decimales.',
          'Es el tipo numérico por defecto para cualquier literal entero.',
          'Permite operaciones aritméticas exactas y sumamente rápidas en el procesador.'
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
    subtitle: 'Coma flotante bajo el estándar internacional IEEE 754: precisión simple vs precisión doble.',
    estimatedMinutes: 5,
    analogy: 'Un `Float` es como una regla escolar con marcas milimétricas que cabe en cualquier bolsillo. Un `Double` es como un microscopio de laboratorio con calibración micrométrica: ofrece el doble de precisión para mediciones científicas.',
    video: {
      title: 'Punto Flotante en Kotlin: Double vs Float explicados',
      channel: 'Kotlin by JetBrains Official',
      duration: '9:40',
      url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
      summary: 'Descubre cómo las computadoras almacenan decimales en binario, por qué Double es el tipo preferido en Kotlin y cuándo es obligatorio usar el sufijo f.'
    },
    sections: [
      {
        title: 'Precisión y Almacenamiento Decimal',
        explanation: 'Cuando necesitas medir magnitudes continuas con fracciones decimales (precios, pesos, distancias, porcentajes), Kotlin ofrece dos tipos fundamentales:\n\n1. `Double` (64 bits - Precisión Doble):\n- Es el tipo decimal POR DEFECTO en Kotlin.\n- Proporciona entre 15 y 17 dígitos decimales de precisión.\n- Cualquier número con punto escrito directamente (`3.1416`, `99.99`) es inferido como Double.\n\n2. `Float` (32 bits - Precisión Simple):\n- Ocupa la mitad de espacio en memoria.\n- Proporciona entre 6 y 7 dígitos de precisión.\n- REQUIERE OBLIGATORIAMENTE el sufijo `f` o `F` al final (`3.1416f`). Se usa principalmente en motores gráficos 3D y videojuegos para ahorrar memoria en millones de vértices.',
        codeSnippet: `fun main() {
    // Inferencia directa a Double (64 bits)
    val precioLaptop = 1299.99
    val piPreciso = 3.141592653589793

    // Declaración de Float con sufijo f obligatorio (32 bits)
    val gravedadPlaneta: Float = 9.807f
    val porcentajeDescuento = 0.15f

    println("Precio: $" + precioLaptop)
    println("Constante PI (Double): " + piPreciso)
    println("Gravedad (Float): " + gravedadPlaneta)
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Precio: $1299.99
Constante PI (Double): 3.141592653589793
Gravedad (Float): 9.807`,
        byteTip: 'En Kotlin, la coma flotante siempre se escribe con punto (.), jamás con coma (,). Escribir 9,99 provocará un error de sintaxis.',
        pitfallTip: 'Si escribes "val x: Float = 3.14" sin la "f" al final, Kotlin arrojará un error de compilación: Type mismatch: inferred type is Double but Float was expected.',
        keyPoints: [
          'Double es el tipo decimal estándar por defecto en Kotlin (64 bits).',
          'Float (32 bits) exige obligatoriamente el sufijo f o F.',
          'Para operaciones comerciales estándar y cálculos cotidianos, usa siempre Double.'
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
    subtitle: 'Colecciones inmutables de texto Unicode, medición de longitud y métodos integrados.',
    estimatedMinutes: 5,
    analogy: 'Un `String` es como un collar de cuentas con letras grabadas: cada cuenta es un carácter y están ensartadas en un orden inalterable. Puedes contar cuántas cuentas tiene o hacer una copia con letras doradas, pero no puedes arrancar una cuenta del collar original.',
    video: {
      title: 'Manejo de Strings y Texto en Kotlin',
      channel: 'Amigoscode / Kotlin Essentials',
      duration: '11:15',
      url: 'https://www.youtube.com/watch?v=fXvU7u7d3-c',
      summary: 'Aprende a inspeccionar la longitud de cadenas (.length), transformar a mayúsculas y minúsculas, y entender por qué los strings son inmutables en memoria.'
    },
    sections: [
      {
        title: 'Texto Seguro con Soporte Universal Unicode',
        explanation: 'El tipo `String` representa una secuencia inmutable de caracteres de texto. Los Strings en Kotlin son de primera clase y soportan de forma nativa la codificación Unicode UTF-16, permitiendo caracteres acentuados, alfabetos internacionales e incluso emojis.\n\nPropiedades y funciones clave incorporadas:\n- `.length`: Devuelve el número exacto de caracteres en la cadena.\n- `.uppercase()`: Retorna una nueva cadena con todas las letras en mayúsculas.\n- `.lowercase()`: Retorna una nueva cadena en minúsculas.\n- `.trim()`: Elimina espacios en blanco residuales al inicio y al final.',
        codeSnippet: `fun main() {
    val mensaje = "  ¡Aprender Kotlin es genial! 🚀  "

    // Inspección de tamaño
    println("Longitud original con espacios: " + mensaje.length)

    // Transformaciones que devuelven nuevas cadenas limpias
    val mensajeLimpio = mensaje.trim()
    println("Sin espacios en bordes: " + mensajeLimpio)
    println("En mayúsculas: " + mensajeLimpio.uppercase())
    println("En minúsculas: " + mensajeLimpio.lowercase())
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Longitud original con espacios: 34
Sin espacios en bordes: ¡Aprender Kotlin es genial! 🚀
En mayúsculas: ¡APRENDER KOTLIN ES GENIAL! 🚀
En minúsculas: ¡aprender kotlin es genial! 🚀`,
        byteTip: 'Los Strings en Kotlin son inmutables. Llamar a mensaje.uppercase() no modifica la variable mensaje original; genera y retorna una nueva cadena en memoria.',
        pitfallTip: 'Recuerda que .length es una propiedad, no una función; no lleva paréntesis al final. Escribir texto.length() causará un error de compilación.',
        keyPoints: [
          'String representa secuencias de caracteres inmutables delimitadas por comillas dobles.',
          'Soporta caracteres internacionales y emojis de forma transparente.',
          '.length entrega la cantidad total de caracteres contenidos.'
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
    subtitle: 'La magia de la interpolación directa con el símbolo $ sin la incomodidad del operador +.',
    estimatedMinutes: 5,
    analogy: 'Las plantillas de texto son como una carta personalizada con espacios en blanco para llenar: "Estimado [Nombre], su saldo es [Monto]". En lugar de recortar pedazos de papel y pegarlos con goma (+), colocas la variable directamente donde pertenece ($).',
    video: {
      title: 'String Templates en Kotlin: Olvídate de concatenar con +',
      channel: 'Kotlin by JetBrains Official',
      duration: '6:50',
      url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
      summary: 'Compara la concatenación clásica con el poder de los String Templates en Kotlin y aprende las ventajas de legibilidad y rendimiento.'
    },
    sections: [
      {
        title: 'Interpolación Elegante con el Símbolo $',
        explanation: 'En lenguajes más antiguos, ensamblar un mensaje que combina texto y variables requería el operador `+` de forma agotadora:\n`"Hola " + usuario + ", tienes " + nivel + " puntos y " + vidas + " vidas."`\n\nKotlin eliminó este dolor introduciendo las Plantillas de Texto (String Templates): puedes insertar el valor de cualquier variable directamente dentro de las comillas dobles anteponiendo el signo dólar `$`. El compilador se encarga de convertir el dato a texto e insertarlo de forma óptima.',
        codeSnippet: `fun main() {
    val piloto = "Carlos Sainz"
    val escuderia = "Ferrari"
    val posicion = 1
    val puntos = 25

    // Estilo moderno, limpio y recomendado con String Templates
    val reporte = "El piloto $piloto de $escuderia finalizó en posición #$posicion y sumó $puntos pts."
    println(reporte)

    // Si requieres imprimir un signo de dólar literal sin interpolar, escápalo con \\$
    val precio = 85
    println("El costo de la entrada es de \\$$precio dólares.")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `El piloto Carlos Sainz de Ferrari finalizó en posición #1 y sumó 25 pts.
El costo de la entrada es de $85 dólares.`,
        byteTip: 'Usa String Templates siempre en lugar de +. No solo se ve mucho más limpio; el compilador de Kotlin genera internamente un StringBuilder altamente eficiente.',
        pitfallTip: 'Si quieres escribir el carácter $ como símbolo de moneda frente a un número sin variable, debes anteponer una barra invertida: \\$100. De lo contrario Kotlin intentará buscar una variable con ese nombre.',
        keyPoints: [
          '$nombreVariable interpola el valor directamente dentro de un String.',
          'Elimina la necesidad de concatenaciones fragmentadas con el operador +.',
          'Para imprimir el símbolo $ literal en pantalla se debe escapar como \\$.'
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
    subtitle: 'Cómo ejecutar operaciones aritméticas y llamadas a métodos directamente dentro de una cadena.',
    estimatedMinutes: 5,
    analogy: 'El `${}` dentro de un String es como una mini-calculadora integrada en una hoja de texto: le das una fórmula adentro de las llaves y en la hoja queda impreso únicamente el resultado final calculado al instante.',
    video: {
      title: 'Expresiones complejas con llaves ${} en Kotlin',
      channel: 'Android Developers',
      duration: '7:15',
      url: 'https://www.youtube.com/watch?v=5flXfy_O_8E',
      summary: 'Descubre cómo evaluar expresiones lógicas, sumas y propiedades de objetos dentro de ${} para mantener tu código conciso y libre de variables temporales innecesarias.'
    },
    sections: [
      {
        title: 'Evaluación Dinámica de Bloques de Código',
        explanation: 'El símbolo `$variable` funciona a la perfección para variables simples. Pero, ¿qué sucede si quieres sumar dos variables, acceder a una propiedad como `.length`, o llamar a una función dentro del texto?\n\nPara expresiones compuestas, Kotlin exige envolver la expresión entre llaves precedidas por el dólar: `${expresión}`.\n\nCualquier fragmento de código Kotlin válido que devuelva un valor puede ejecutarse dentro de `${}`.',
        codeSnippet: `fun main() {
    val subtotal = 100.0
    val tasaIva = 0.16
    val usuario = "dev_master"

    // Cálculo matemático directo dentro del String
    println("Subtotal: $\${subtotal}")
    println("IVA (16%): $\${subtotal * tasaIva}")
    println("Total neto: $\${subtotal + (subtotal * tasaIva)}")

    // Acceso a propiedades y métodos dentro del String
    println("El usuario '$usuario' tiene \${usuario.length} caracteres.")
    println("En mayúsculas automáticas: \${usuario.uppercase()}")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Subtotal: $100.0
IVA (16%): $16.0
Total neto: $116.0
El usuario 'dev_master' tiene 10 caracteres.
En mayúsculas automáticas: DEV_MASTER`,
        byteTip: 'Si solo usas una variable simple como $usuario, las llaves son opcionales. Pero en cuanto hay un punto (.) o un operador (+, *), las llaves ${} son 100% obligatorias.',
        pitfallTip: 'Un error clásico de principiante es escribir "$usuario.length" sin llaves. Kotlin interpolará únicamente "$usuario" e imprimirá literalmente ".length" al lado.',
        keyPoints: [
          '${expresion} evalúa cualquier cálculo, condición o método dentro de la cadena.',
          'Evita la creación de variables intermedias temporales cuando solo se quieren mostrar datos.',
          'Garantiza que la llamada a métodos (.length, .uppercase()) ocurra sobre el objeto correcto.'
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
    subtitle: 'Suma, resta, multiplicación y el orden de evaluación matemático que debes dominar.',
    estimatedMinutes: 5,
    analogy: 'La precedencia de operadores es como la prioridad de paso en una rotonda vial: la multiplicación y la división tienen sirena de ambulancia y siempre pasan primero; la suma y la resta deben esperar a que ellas terminen.',
    video: {
      title: 'Operadores Aritméticos y Precedencia en Kotlin',
      channel: 'freeCodeCamp.org',
      duration: '10:05',
      url: 'https://www.youtube.com/watch?v=EExSSotojVI',
      summary: 'Repaso exhaustivo de la jerarquía PEMDAS en Kotlin, por qué 2 + 3 * 4 no es 20 y cómo los paréntesis aseguran la intención del desarrollador.'
    },
    sections: [
      {
        title: 'Jerarquía Universal de las Operaciones',
        explanation: 'En Kotlin, los operadores aritméticos siguen el estándar matemático PEMDAS:\n1. Paréntesis `( )`: Máxima prioridad absoluta.\n2. Multiplicación `*` y División `/`: Prioridad alta.\n3. Suma `+` y Resta `-`: Prioridad estándar.\n\nCuando dos operadores tienen la misma jerarquía (por ejemplo, una suma seguida de una resta), se evalúan estrictamente de izquierda a derecha.',
        codeSnippet: `fun main() {
    // Caso 1: La multiplicación gana prioridad
    val sinParentesis = 10 + 5 * 2
    // Paso a paso: 5 * 2 = 10 -> luego 10 + 10 = 20
    println("Resultado sin paréntesis: $sinParentesis")

    // Caso 2: Forzando la suma con paréntesis
    val conParentesis = (10 + 5) * 2
    // Paso a paso: (10 + 5) = 15 -> luego 15 * 2 = 30
    println("Resultado con paréntesis: $conParentesis")

    // Caso 3: Evaluación de izquierda a derecha a igual jerarquía
    val encadenado = 100 / 10 * 2 // (100 / 10) = 10 -> 10 * 2 = 20
    println("De izquierda a derecha: $encadenado")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Resultado sin paréntesis: 20
Resultado con paréntesis: 30
De izquierda a derecha: 20`,
        byteTip: 'Consejo de desarrollador senior: Ante la menor duda sobre qué se calculará primero, usa paréntesis explícitos. No afectan en absoluto la velocidad de tu programa y salvan a tu equipo de horas de frustración.',
        pitfallTip: 'Nunca asumas que la computadora lee las operaciones aritméticas de izquierda a derecha si hay multiplicaciones o divisiones en medio.',
        keyPoints: [
          'La multiplicación (*) y división (/) siempre se evalúan antes que la suma (+) y resta (-).',
          'Los paréntesis ( ) fuerzan la prioridad inmediata de cualquier cálculo.',
          'El uso de paréntesis hace el código autodocumentado y libre de ambigüedades.'
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
    subtitle: 'Por qué 7 / 2 es 3 en programación y la técnica correcta para obtener decimales exactos.',
    estimatedMinutes: 5,
    analogy: 'Imagina que tienes 7 pizzas completas para repartir entre 2 salones escolares, pero la regla dice que solo puedes entregar cajas enteras cerradas. Le das 3 cajas a cada salón y sobra 1. Nadie recibe 3.5 porque las pizzas no se pueden cortar a la mitad.',
    video: {
      title: 'El error más común de novatos: División entera en Kotlin',
      channel: 'Programación Kotlin con Chema',
      duration: '8:15',
      url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
      summary: 'Aprende por qué la división entre dos enteros descarta por completo la parte decimal y cómo resolverlo con .toDouble() o literales decimales.'
    },
    sections: [
      {
        title: 'Truncamiento Silencioso y Promoción a Double',
        explanation: 'En Kotlin y en todos los lenguajes fuertemente tipados existe una regla matemática de oro:\n`Int / Int = Int`\n\nSi divides dos números enteros, el resultado está obligado por el sistema de tipos a ser otro entero. La computadora descarta la parte fraccional por completo (la trunca hacia cero), sin redondear jamás hacia arriba.\n\nPor ejemplo: `7 / 2` da como resultado `3`, y el decimal `.5` se pierde para siempre.\n\nPara obtener el resultado con coma decimal (`3.5`), al menos uno de los dos operandos debe ser de tipo decimal (`Double`). Puedes lograrlo de dos formas:\n1. Escribiendo el literal con punto: `7.0 / 2`\n2. Convirtiendo una variable con la función `.toDouble()`: `variable.toDouble() / 2`',
        codeSnippet: `fun main() {
    val totalPreguntas = 10
    val respuestasCorrectas = 7

    // Error clásico de novato: División entera
    val porcentajeErroneo = respuestasCorrectas / totalPreguntas * 100
    // Paso a paso: 7 / 10 = 0 (truncado) -> 0 * 100 = 0
    println("Porcentaje erróneo (Int): $porcentajeErroneo%")

    // Solución correcta 1: convirtiendo a Double
    val porcentajeExacto = (respuestasCorrectas.toDouble() / totalPreguntas) * 100
    println("Porcentaje correcto (Double): $porcentajeExacto%")

    // Solución correcta 2: usando literal decimal directo
    val promedio = 7.0 / 2
    println("Promedio con decimal: $promedio")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Porcentaje erróneo (Int): 0%
Porcentaje correcto (Double): 70.0%
Promedio con decimal: 3.5`,
        byteTip: 'Este bug de división entera es el responsable de que muchos sistemas de calificación arrojen 0% de promedio a estudiantes con buenas notas.',
        pitfallTip: 'Escribir "(7 / 2).toDouble()" no sirve de nada, porque primero se ejecuta la división entera dando 3, y luego se convierte 3 a 3.0. Debes aplicar .toDouble() a uno de los números ANTES de dividir: 7.toDouble() / 2.',
        keyPoints: [
          'La división entre dos Int siempre trunca los decimales y devuelve otro Int.',
          'Para conservar los decimales, al menos uno de los números debe ser Double.',
          '.toDouble() promueve un entero a punto flotante de 64 bits para cálculos precisos.'
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
    subtitle: 'La herramienta secreta para saber si un número es par, múltiplo o ciclar listas y turnos.',
    estimatedMinutes: 5,
    analogy: 'El operador `%` es como las agujas de un reloj de 12 horas: si avanzas 14 horas desde las 12, no marcas las "14", sino las 2, porque 14 dividido entre 12 deja un residuo de 2. Módulo te dice exactamente qué sobró en la división.',
    video: {
      title: 'El operador Módulo % explicado de forma simple',
      channel: 'EDteam / Algoritmos Fundamentales',
      duration: '7:40',
      url: 'https://www.youtube.com/watch?v=U3CGMyJZ9R8',
      summary: 'Descubre los 3 usos maestros del operador módulo: detección de números pares/impares, verificación de múltiplos y control de turnos rotativos en juegos.'
    },
    sections: [
      {
        title: 'El Residuo de la División Entera',
        explanation: 'En programación, el símbolo `%` NO calcula porcentajes. El operador `%` se denomina operador Módulo y calcula el residuo (resto) de la división entera entre dos números.\n\nPor ejemplo:\n`14 % 3 = 2`\n¿Por qué? Porque 3 cabe 4 veces en 14 (12), y sobran 2 unidades.\n\nUsos fundamentales en el desarrollo de software:\n1. Paridad: Un número es PAR si `numero % 2 == 0` (el residuo entre 2 es cero). Si es impar, el residuo es 1.\n2. Múltiplos: Un número es múltiplo de 5 si `numero % 5 == 0`.\n3. Ciclos y turnos: Para alternar turnos entre 3 jugadores: `turno % 3`.',
        codeSnippet: `fun main() {
    val numeroPrueba = 14

    // 1. Verificando si es par o impar
    val esPar = (numeroPrueba % 2 == 0)
    println("¿El número $numeroPrueba es par? $esPar")

    // 2. Verificando múltiplos de 5
    val dineroCajero = 125
    val esMultiploDe5 = (dineroCajero % 5 == 0)
    println("¿$$dineroCajero se puede entregar en billetes de 5? $esMultiploDe5")

    // 3. Distribución de turnos entre 3 jugadores (0, 1, 2)
    val ronda = 7
    val jugadorActivo = ronda % 3
    println("En la ronda #$ronda le toca al jugador índice: $jugadorActivo")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿El número 14 es par? true
¿$125 se puede entregar en billetes de 5? true
En la ronda #7 le toca al jugador índice: 1`,
        byteTip: 'Usa modulo para pintar filas alternadas en tablas web o móviles (cebreado zebra): si (filaIndex % 2 == 0) pinta gris claro, si no, blanco.',
        pitfallTip: 'Recuerda que nunca puedes dividir entre cero. Intentar hacer "10 % 0" arrojará una excepción crítica de ejecución: ArithmeticException: / by zero.',
        keyPoints: [
          'El operador % retorna el residuo exacto que sobra de la división entera.',
          'numero % 2 == 0 es la prueba universal para determinar si un valor es par.',
          'El resultado de a % b siempre estará en el rango entre 0 y b - 1.'
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
    subtitle: 'Comprobación de igualdad y desigualdad estructural segura sin las trampas de otros lenguajes.',
    estimatedMinutes: 5,
    analogy: 'El operador `==` es como el portero de un evento con la lista de invitados: mira el nombre en tu documento de identidad y lo compara letra por letra con la lista. Si coinciden exactamente, te deja pasar (true); si hay una sola diferencia, te detiene (false).',
    video: {
      title: 'Operadores de Comparación en Kotlin: == vs != vs ===',
      channel: 'Kotlin by JetBrains Official',
      duration: '8:30',
      url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
      summary: 'Aprende la diferencia entre igualdad estructural (==) e igualdad referencial (===) y cómo Kotlin protege la comparación de cadenas de texto.'
    },
    sections: [
      {
        title: 'Comparación Estructural de Valores',
        explanation: 'En programación, con frecuencia necesitas comprobar si dos datos son equivalentes o si son diferentes:\n- `==` (Igualdad): Compara el contenido de ambos lados. Retorna `true` si son iguales y `false` si son distintos.\n- `!=` (Desigualdad): Retorna `true` si los valores son diferentes y `false` si son idénticos.\n\nA diferencia de Java (donde `==` en cadenas de texto era peligroso porque comparaba posiciones de memoria en lugar del texto), en Kotlin `==` compara el contenido estructural de forma 100% segura y natural.',
        codeSnippet: `fun main() {
    val passwordCorrecto = "K0tl1n*2026"
    val passwordIngresado = "K0tl1n*2026"
    val intentoInvalido = "admin123"

    // Comparando textos con ==
    val accesoPermitido = (passwordIngresado == passwordCorrecto)
    println("¿Contraseña correcta? $accesoPermitido")

    val esDiferente = (intentoInvalido != passwordCorrecto)
    println("¿Intento inválido es distinto al correcto? $esDiferente")

    // Comparando números
    val vidas = 0
    val jugadorMuerto = (vidas == 0)
    println("¿El jugador se quedó sin vidas? $jugadorMuerto")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `¿Contraseña correcta? true
¿Intento inválido es distinto al correcto? true
¿El jugador se quedó sin vidas? true`,
        byteTip: 'No confundas nunca un solo igual = con el doble igual ==. Un solo igual ASIGNA un valor; el doble igual COMPARA dos valores.',
        pitfallTip: 'La comparación de cadenas de texto con == es sensible a mayúsculas y espacios. "Hola" == "hola" devolverá false, y "clave" == "clave " también devolverá false por el espacio al final.',
        keyPoints: [
          '== compara si los valores contenidos en dos variables son estructuralmente idénticos.',
          '!= compara si dos valores son diferentes.',
          'El resultado de cualquier comparación con == o != siempre es un tipo Boolean (true o false).'
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
    subtitle: 'Documentar tu lógica para tu yo del futuro y tus compañeros de equipo sin afectar la ejecución.',
    estimatedMinutes: 5,
    analogy: 'Los comentarios son como las notas adhesivas que un arquitecto pega en los planos de una obra: explican a los obreros por qué se eligió cierta viga o material, pero no forman parte del concreto ni añaden peso a la estructura.',
    video: {
      title: 'Buenas prácticas para comentar código en Kotlin',
      channel: 'JetBrains Developers',
      duration: '7:50',
      url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
      summary: 'Aprende la diferencia entre comentar lo que hace el código (mala práctica) y documentar el PORQUÉ de las decisiones de negocio (buena práctica).'
    },
    sections: [
      {
        title: 'Anotaciones Transparentes para el Compilador',
        explanation: 'Los comentarios son notas escritas en lenguaje humano dentro del archivo fuente. Cuando compilas tu programa, el compilador ignora por completo todos los comentarios; no generan código binario, no consumen memoria y no ralentizan la aplicación.\n\nTipos de comentarios en Kotlin:\n1. Comentario de una línea (`//`): Comienza con dos barras y se extiende hasta el final del renglón.\n2. Comentario multilínea (`/* ... */`): Envuelve párrafos completos entre `/*` de apertura y `*/` de cierre.\n3. KDoc (`/** ... */`): Documentación técnica oficial para generar manuales HTML.',
        codeSnippet: `fun main() {
    // 1. Comentario de una sola línea: explica una regla de negocio
    val descuentoMaximo = 0.30 // No permitir más del 30% según política fiscal

    /* 
       2. Comentario en bloque multilínea:
       Módulo de Facturación Electrónica v2.4
       Autor: Ada Lovelace
       Revisado: Octubre 2026
    */
    val precioBase = 200.0
    val precioFinal = precioBase * (1 - descuentoMaximo)

    println("Precio con descuento: $\${precioFinal}")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `Precio con descuento: $140.0`,
        byteTip: 'No comentes lo obvio (ejemplo: "x = x + 1 // incrementa x en 1"). Comenta la razón detrás de la lógica (ejemplo: "// Se suma 1 porque el índice de la API empieza en 1 en lugar de 0").',
        pitfallTip: 'No olvides cerrar los comentarios multilínea con */. Si olvidas cerrarlo, todo el código que esté debajo quedará comentado y no se compilará.',
        keyPoints: [
          '// se utiliza para aclaraciones breves de una sola línea.',
          '/* */ permite escribir explicaciones extensas en múltiples líneas.',
          'Los comentarios son 100% ignorados por el compilador y no afectan el rendimiento.'
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
    subtitle: 'Consolidación total de Entrada, Proceso, Salida, variables inmutables/mutables y operadores en un caso de la vida real.',
    estimatedMinutes: 6,
    analogy: 'Este proyecto es como el examen práctico de conducir: ya aprendiste qué hace el volante, el acelerador, los frenos y los espejos; ahora subirás al auto y conducirás en una avenida real coordinando todos los pedales a la vez.',
    video: {
      title: 'Creación de un Simulador de Cajero Automático en Kotlin',
      channel: 'freeCodeCamp.org / Kotlin Masterclass',
      duration: '14:20',
      url: 'https://www.youtube.com/watch?v=EExSSotojVI',
      summary: 'Proyecto paso a paso que une variables val/var, operadores aritméticos, validaciones lógicas con if/else y salida profesional con String Templates.'
    },
    sections: [
      {
        title: 'Arquitectura del Algoritmo del Cajero',
        explanation: 'En este nivel final de la Unidad 1 orquestamos todos los conocimientos adquiridos en un caso de ingeniería real:\n\n1. Estado Inicial en Memoria:\n- `val titular`: Nombre inmutable del usuario.\n- `val pinSeguridad`: Clave inmutable de 4 dígitos.\n- `var saldoCuenta`: Saldo mutable que se actualizará con cada transacción.\n\n2. Entrada (Input):\n- `val pinIngresado`: Simulación de la clave tecleada por el usuario.\n- `val montoRetiro`: Cantidad de dinero solicitada.\n\n3. Proceso:\n- Validación de seguridad (`pinIngresado == pinSeguridad`).\n- Validación de fondos suficientes (`montoRetiro <= saldoCuenta`).\n- Resta matemática y actualización del saldo (`saldoCuenta = saldoCuenta - montoRetiro`).\n\n4. Salida (Output):\n- Reporte visual formateado con String Templates `${}`.',
        codeSnippet: `fun main() {
    println("=========================================")
    println("         BANCO KOTLIN DIGITAL            ")
    println("=========================================")

    val titular = "Ada Lovelace"
    val pinCorrecto = 1234
    var saldoDisponible = 500.0

    // Simulación de interacción de usuario
    val pinIngresado = 1234
    val montoRetiro = 150.0

    // 1. Verificación de Seguridad
    if (pinIngresado == pinCorrecto) {
        println("Identidad verificada: Bienvenido $titular")
        println("Saldo anterior: \\$$saldoDisponible")

        // 2. Verificación de Fondos
        if (montoRetiro <= saldoDisponible) {
            saldoDisponible = saldoDisponible - montoRetiro
            println("Retiro exitoso de: \\$$montoRetiro")
            println("Nuevo saldo disponible: \\$$saldoDisponible")
        } else {
            println("Error: Fondos insuficientes para retirar \\$$montoRetiro.")
        }
    } else {
        println("ALERTA: PIN incorrecto. Tarjeta bloqueada por seguridad.")
    }

    println("=========================================")
    println("      ¡Gracias por usar nuestro ATM!     ")
    println("=========================================")
}`,
        codeLanguage: 'kotlin',
        outputSnippet: `=========================================
         BANCO KOTLIN DIGITAL            
=========================================
Identidad verificada: Bienvenido Ada Lovelace
Saldo anterior: $500.0
Retiro exitoso de: $150.0
Nuevo saldo disponible: $350.0
=========================================
      ¡Gracias por usar nuestro ATM!     
=========================================`,
        byteTip: '¡Felicidades por culminar la Unidad 1! Ya dominas los cimientos del pensamiento computacional, el modelo IPO, la memoria, variables inmutables y operadores aritméticos.',
        pitfallTip: 'En sistemas financieros reales, jamás se usan tipos Float o Double para dinero debido a imprecisiones microscópicas de coma flotante. En producción bancaria se utiliza BigDecimal o cantidades enteras en centavos (Int).',
        keyPoints: [
          'Un software completo es la coreografía lógica de Entradas, Procesos y Salidas.',
          'La inmutabilidad (val) resguarda las reglas y la mutabilidad (var) gestiona el estado dinámico.',
          'Estás 100% preparado para afrontar el examen práctico y continuar a la Unidad 2.'
        ]
      }
    ]
  }
};
