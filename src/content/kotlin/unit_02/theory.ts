import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_02_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u02-l01": {
    "id": "kt-th-u02-l01",
    "lessonId": "kotlin-u02-l01",
    "pathId": "kotlin",
    "unitId": 2,
    "levelId": 1,
    "title": "1. Declaración y asignación de variables",
    "subtitle": "Descubre cómo reservar espacios en la memoria del dispositivo para guardar y consultar información.",
    "estimatedMinutes": 8,
    "analogy": "Una variable es como una caja de zapatos con una etiqueta en el frente: la etiqueta es el nombre de la variable y lo que guardas adentro es su valor.",
    "video": {
      "title": "Kotlin: Variables val, var y Tipos de Datos",
      "channel": "MoureDev by Brais Moure",
      "duration": "35:10",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Diferencia entre val y var, inmutabilidad, tipos primitivos e inferencia de tipos."
    },
    "sections": [
      {
        "title": "¿Qué es una variable y para qué sirve?",
        "explanation": "Cuando usas una app, esta necesita recordar datos en todo momento: tu nombre de usuario, cuántos productos tienes en el carrito, o si tienes activas las notificaciones.\n\nPara guardar esa información mientras la aplicación está abierta, usamos **variables**. Una variable es un espacio reservado en la memoria RAM de la computadora o teléfono que tiene:\n• **Un nombre (identificador):** Con el que nos referimos a ella en el código.\n• **Un valor:** El dato real que almacena en ese momento.\n• **Un tipo:** Qué clase de dato contiene (número, texto, verdadero/falso).",
        "codeSnippet": "fun main() {\n    // Declaramos una variable y le asignamos un valor inicial\n    val nombreJugador = \"Mateo\"\n    val puntuacion = 1500\n\n    println(\"Bienvenido, $nombreJugador!\")\n    println(\"Tu puntuación actual es: $puntuacion puntos\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Bienvenido, Mateo!\nTu puntuación actual es: 1500 puntos",
        "byteTip": "En Kotlin, una variable debe tener siempre un valor inicial antes de poder leerla. No existen variables con basura de memoria.",
        "pitfallTip": "Intentar usar una variable antes de haberla declarado causará un error de compilación inmediato.",
        "keyPoints": [
          "Una variable almacena datos temporales en la memoria RAM.",
          "Se compone de un nombre, un valor y un tipo de dato.",
          "Kotlin exige inicializar las variables antes de permitir su lectura."
        ]
      },
      {
        "title": "Cómo asigna memoria Kotlin",
        "explanation": "Cuando escribes `val nombre = \"Mateo\"`, Kotlin le pide al sistema operativo un pedacito de memoria suficiente para almacenar ese texto y vincula la etiqueta `nombre` con esa dirección.\n\nA partir de ese instante, cada vez que uses `nombre` en tu código, Kotlin irá a esa caja de memoria y extraerá su contenido con máxima velocidad.",
        "codeSnippet": "fun main() {\n    val moneda = \"USD\"\n    val saldoDisponible = 450.75\n    \n    println(\"Tu saldo en cuenta es: $saldoDisponible $moneda\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Tu saldo en cuenta es: 450.75 USD",
        "byteTip": "Los nombres de variables deben ser descriptivos: es mucho mejor usar saldoDisponible que una letra vaga como s o x.",
        "pitfallTip": "Los nombres de variables no pueden contener espacios ni comenzar con números (por ejemplo, 1usuario es inválido).",
        "keyPoints": [
          "El sistema reserva la memoria exacta requerida para cada dato.",
          "Los identificadores claros hacen que el programa sea intuitivo de leer.",
          "El acceso a memoria de variables locales en Kotlin es extremadamente rápido."
        ]
      }
    ]
  },
  "kotlin-u02-l02": {
    "id": "kt-th-u02-l02",
    "lessonId": "kotlin-u02-l02",
    "pathId": "kotlin",
    "unitId": 2,
    "levelId": 2,
    "title": "2. Diferencia entre val y var",
    "subtitle": "Domina las dos palabras clave fundamentales de Kotlin: val para valores fijos y var para valores que cambian.",
    "estimatedMinutes": 8,
    "analogy": "val es como escribir con tinta permanente en un contrato oficial: una vez firmado, no se puede alterar. var es como escribir con lápiz sobre una libreta: puedes borrar y cambiar el número cuantas veces quieras.",
    "video": {
      "title": "Kotlin: Variables val, var y Tipos de Datos",
      "channel": "MoureDev by Brais Moure",
      "duration": "35:10",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Diferencia entre val y var, inmutabilidad, tipos primitivos e inferencia de tipos."
    },
    "sections": [
      {
        "title": "Diferencia esencial entre val y var",
        "explanation": "A diferencia de otros lenguajes más antiguos donde todas las variables pueden modificarse en cualquier momento, Kotlin te pide tomar una decisión de seguridad desde el primer instante:\n\n• **`val` (de *value* / inmutable):** Declara una variable de **solo lectura**. Una vez que le asignas un valor inicial, **nunca más puede cambiarse**. Intentar reasignarla provocará un error de compilación.\n• **`var` (de *variable* / mutable):** Declara una variable cuyo valor **sí puede modificarse** o reasignarse a lo largo del tiempo.",
        "codeSnippet": "fun main() {\n    // val: No cambia nunca\n    val fechaNacimiento = \"15/03/1998\"\n\n    // var: Sí puede cambiar\n    var edad = 25\n    println(\"Edad inicial: $edad\")\n\n    edad = 26 // Modificamos la variable var\n    println(\"Edad cumplida: $edad\")\n    println(\"Fecha de nacimiento (fija): $fechaNacimiento\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Edad inicial: 25\nEdad cumplida: 26\nFecha de nacimiento (fija): 15/03/1998",
        "byteTip": "La regla de oro oficial de Android: Usa val por defecto siempre. Solo cambia a var cuando sea estrictamente obligatorio modificar el valor.",
        "pitfallTip": "Si intentas hacer fechaNacimiento = \"otra\", el compilador detendrá el programa con el error \"Val cannot be reassigned\".",
        "keyPoints": [
          "val crea referencias inmutables (de solo lectura).",
          "var crea referencias mutables que permiten reasignación.",
          "Usar val previene errores accidentales donde un valor cambia sin que te des cuenta."
        ]
      },
      {
        "title": "Por qué la inmutabilidad con val hace mejores apps",
        "explanation": "En aplicaciones modernas para Android, muchos procesos ocurren simultáneamente (descargar datos de internet, responder a toques en pantalla, reproducir audio).\n\nSi muchas partes de tu app pueden modificar la misma variable al mismo tiempo (con `var`), se producen fallos muy difíciles de rastrear (llamados condiciones de carrera).\nAl usar `val`:\n• Tu código se vuelve **predecible**: sabes con certeza que ese valor no ha cambiado.\n• Tu código es más **seguro**: evitas efectos secundarios sorpresa.\n• Es más fácil de probar y verificar.",
        "codeSnippet": "fun main() {\n    val precioBase = 120.0\n    val porcentajeDescuento = 0.10 // 10%\n    \n    // En vez de modificar precioBase, calculamos un nuevo valor con val\n    val precioFinal = precioBase * (1 - porcentajeDescuento)\n    \n    println(\"Precio original: $$precioBase\")\n    println(\"Precio con descuento: $$precioFinal\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Precio original: $120.0\nPrecio con descuento: $108.0",
        "byteTip": "Favorece crear un nuevo val con el resultado calculado en lugar de sobreescribir una variable var existente.",
        "pitfallTip": "No uses var por pereza. El código con demasiadas variables mutables es el caldo de cultivo número uno para bugs.",
        "keyPoints": [
          "La inmutabilidad previene errores en programas con múltiples tareas concurrentes.",
          "Casi el 80% de las variables en una app profesional bien diseñada son val.",
          "Kotlin fue diseñado específicamente para premiar el uso de val."
        ]
      }
    ]
  },
  "kotlin-u02-l03": {
    "id": "kt-th-u02-l03",
    "lessonId": "kotlin-u02-l03",
    "pathId": "kotlin",
    "unitId": 2,
    "levelId": 3,
    "title": "3. Tipos: Int, Double, Boolean, Char y String",
    "subtitle": "Conoce los tipos de datos principales de Kotlin: números, texto, caracteres y valores de verdad.",
    "estimatedMinutes": 8,
    "analogy": "Los tipos de datos son como recipientes de cocina especializados: usas un vaso para líquidos (Double), un frasco de pastillas para unidades contables (Int) y una carpeta para hojas con texto (String).",
    "video": {
      "title": "Kotlin: Variables val, var y Tipos de Datos",
      "channel": "MoureDev by Brais Moure",
      "duration": "35:10",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Diferencia entre val y var, inmutabilidad, tipos primitivos e inferencia de tipos."
    },
    "sections": [
      {
        "title": "Los tipos básicos de Kotlin",
        "explanation": "En Kotlin todo es un objeto y cada dato pertenece a un tipo bien definido. Los más utilizados en el día a día son:\n\n• **`Int` (Entero):** Números sin decimales, positivos o negativos (ejemplo: `10`, `-5`, `2024`).\n• **`Double` (Decimal):** Números con punto decimal de alta precisión (ejemplo: `3.1416`, `99.95`).\n• **`Boolean` (Booleano):** Solo tiene dos valores posibles: `true` (verdadero) o `false` (falso). Ideal para banderas y decisiones.\n• **`String` (Cadena de texto):** Texto encerrado entre comillas dobles (ejemplo: `\"Hola Kotlin\"`).\n• **`Char` (Carácter):** Un único símbolo o letra encerrado entre comillas simples (ejemplo: `'A'`, `'$'`).",
        "codeSnippet": "fun main() {\n    val edad: Int = 22\n    val promedio: Double = 9.85\n    val esEstudianteActivo: Boolean = true\n    val inicial: Char = 'V'\n    val nombre: String = \"Valeria\"\n\n    println(\"Ficha del alumno:\")\n    println(\"Nombre: $nombre (Inicial: $inicial)\")\n    println(\"Edad: $edad años | Promedio: $promedio\")\n    println(\"¿Inscrito actualmente?: $esEstudianteActivo\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Ficha del alumno:\nNombre: Valeria (Inicial: 'V')\nEdad: 22 años | Promedio: 9.85\n¿Inscrito actualmente?: true",
        "byteTip": "Si escribes un número con punto (como 10.5), Kotlin lo clasificará automáticamente como Double.",
        "pitfallTip": "No confundas Char con String. `A` es un Char (comillas simples) y \"A\" es un String (comillas dobles). No son intercambiables.",
        "keyPoints": [
          "Int para conteos enteros, Double para medidas y dinero con decimales.",
          "Boolean para estados binarios (sí/no, activo/inactivo).",
          "String con comillas dobles para texto, Char con comillas simples para una sola letra."
        ]
      },
      {
        "title": "Seguridad estricta de tipos (Type Safety)",
        "explanation": "Kotlin es un lenguaje de **tipado estricto**. Esto significa que una vez que una variable tiene un tipo, no puedes asignarle un dato de un tipo incompatible.\n\nPor ejemplo, no puedes guardar un texto dentro de una variable numérica:\n`var puntaje: Int = 100`\n`puntaje = \"cien\" // ¡ERROR de compilación!`\n\nEsta protección evita millones de caídas en apps de producción porque el compilador detecta el error antes de que la app llegue a manos del usuario.",
        "codeSnippet": "fun main() {\n    val precioUnitario: Double = 19.99\n    val unidades: Int = 4\n    \n    // Para operar Int con Double, Kotlin nos pide ser explícitos o multiplicar directamente\n    val costoTotal = precioUnitario * unidades\n    println(\"Costo total de $unidades artículos: $$costoTotal\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Costo total de 4 artículos: $79.96",
        "byteTip": "Kotlin convierte automáticamente el resultado de Double * Int a Double para no perder los decimales.",
        "pitfallTip": "Intentar asignar 10 a una variable de tipo String causará un error de \"Type mismatch\".",
        "keyPoints": [
          "El tipado estricto evita que mezcles datos incompatibles por descuido.",
          "Los errores de tipo se detectan al escribir código, no cuando la app ya está publicada.",
          "Cada tipo de dato optimiza el uso de memoria y rendimiento en el procesador."
        ]
      }
    ]
  },
  "kotlin-u02-l04": {
    "id": "kt-th-u02-l04",
    "lessonId": "kotlin-u02-l04",
    "pathId": "kotlin",
    "unitId": 2,
    "levelId": 4,
    "title": "4. Inferencia de tipos y declaración explícita",
    "subtitle": "Aprende cómo el compilador de Kotlin deduce los tipos automáticamente sin que tengas que escribirlos.",
    "estimatedMinutes": 8,
    "analogy": "Si ves entrar a un animal con plumas que nada y hace \"cuac\", no necesitas una etiqueta que diga \"es un pato\"; lo infieres de inmediato. Kotlin hace exactamente lo mismo con tus datos.",
    "video": {
      "title": "Kotlin: Variables val, var y Tipos de Datos",
      "channel": "MoureDev by Brais Moure",
      "duration": "35:10",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Diferencia entre val y var, inmutabilidad, tipos primitivos e inferencia de tipos."
    },
    "sections": [
      {
        "title": "Inferencia de tipos vs Declaración explícita",
        "explanation": "En Kotlin tienes dos formas de declarar una variable:\n\n1. **Declaración explícita:** Escribes dos puntos (`:`) y el tipo de dato manualmente.\n`val ciudad: String = \"Montevideo\"`\n`val temperatura: Double = 21.5`\n\n2. **Inferencia de tipos (Implícita):** Omites el tipo y dejas que Kotlin lo deduzca a partir del valor inicial.\n`val ciudad = \"Montevideo\" // Kotlin sabe que es String`\n`val temperatura = 21.5   // Kotlin sabe que es Double`\n\nAmbas formas producen exactamente el mismo código máquina ultra-optimizado. La inferencia simplemente te ahorra escribir texto redundante.",
        "codeSnippet": "fun main() {\n    // Con inferencia de tipos (limpio y conciso)\n    val lenguaje = \"Kotlin\"\n    val version = 2\n    val esModerno = true\n\n    println(\"Lenguaje: $lenguaje (tipo String)\")\n    println(\"Versión: $version (tipo Int)\")\n    println(\"¿Es moderno?: $esModerno (tipo Boolean)\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Lenguaje: Kotlin (tipo String)\nVersión: 2 (tipo Int)\n¿Es moderno?: true (tipo Boolean)",
        "byteTip": "En el código profesional para Android, casi todo el mundo usa inferencia de tipos para mantener el código limpio y legible.",
        "pitfallTip": "Si declaras una variable sin darle un valor inicial inmediato, la inferencia no puede adivinar y estás obligado a indicar el tipo explícito.",
        "keyPoints": [
          "La inferencia de tipos permite escribir código más conciso sin perder seguridad.",
          "Una vez inferido el tipo, este queda grabado y no puede cambiar.",
          "Usa tipo explícito cuando declares variables antes de asignarles valor."
        ]
      },
      {
        "title": "Cuándo conviene ser explícito con el tipo",
        "explanation": "Aunque la inferencia es genial, hay situaciones donde conviene escribir el tipo explícito:\n• Cuando la inicialización no es inmediata.\n• Cuando quieres forzar un tipo más amplio (por ejemplo, querer un `Double` aunque pongas un entero: `val tasa: Double = 5.0`).\n• Al escribir interfaces públicas o funciones en bibliotecas para que el lector no tenga que deducir.",
        "codeSnippet": "fun main() {\n    // Forzamos que sea Double aunque el valor parezca entero\n    val puntajeBase: Double = 100.0\n    val bonificacion = 15.5\n    \n    val puntajeTotal = puntajeBase + bonificacion\n    println(\"Puntaje acumulado: $puntajeTotal\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Puntaje acumulado: 115.5",
        "byteTip": "Si quieres un Long (entero gigante), puedes agregar la letra L al final del número: val idUsuario = 100452399812L.",
        "pitfallTip": "Escribir val x: Int = 10.5 dará error de compilación inmediato porque 10.5 tiene decimales y no cabe en un Int.",
        "keyPoints": [
          "La inferencia hace el código ágil; el tipo explícito brinda precisión milimétrica.",
          "Usa la combinación que haga tu código más claro para quien lo lea.",
          "Ambos enfoques tienen exactamente el mismo rendimiento en ejecución."
        ]
      }
    ]
  },
  "kotlin-u02-l05": {
    "id": "kt-th-u02-l05",
    "lessonId": "kotlin-u02-l05",
    "pathId": "kotlin",
    "unitId": 2,
    "levelId": 5,
    "title": "5. Actualización de valores",
    "subtitle": "Aprende a actualizar variables mutables de forma segura a lo largo del tiempo.",
    "estimatedMinutes": 8,
    "analogy": "Imagina el marcador de un partido de fútbol: empieza en 0 a 0 y, a medida que avanza el juego, el tablero cambia a 1 a 0, 1 a 1, etc. El tablero es una variable var que se actualiza.",
    "video": {
      "title": "Kotlin: Variables val, var y Tipos de Datos",
      "channel": "MoureDev by Brais Moure",
      "duration": "35:10",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Diferencia entre val y var, inmutabilidad, tipos primitivos e inferencia de tipos."
    },
    "sections": [
      {
        "title": "Actualización y reasignación de variables",
        "explanation": "Para que una variable pueda recibir nuevos valores durante la ejecución, debe haberse declarado con **`var`**.\n\nCuando actualizas una variable:\n1. Kotlin evalúa la expresión del lado derecho del signo `=`.\n2. Reemplaza el valor antiguo guardado en la memoria por el nuevo resultado.\n3. El tipo de dato debe seguir siendo el mismo (no puedes ponerle texto a un `var` numérico).",
        "codeSnippet": "fun main() {\n    var golesLocal = 0\n    var golesVisitante = 0\n    println(\"Marcador inicial: $golesLocal - $golesVisitante\")\n\n    // Anotan un gol\n    golesLocal = golesLocal + 1\n    println(\"¡Gol local!: $golesLocal - $golesVisitante\")\n\n    // Anotan otro gol usando el operador compuesto\n    golesLocal += 1\n    println(\"¡Segundo gol local!: $golesLocal - $golesVisitante\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Marcador inicial: 0 - 0\n¡Gol local!: 1 - 0\n¡Segundo gol local!: 2 - 0",
        "byteTip": "golesLocal += 1 es una forma corta y elegante de escribir golesLocal = golesLocal + 1.",
        "pitfallTip": "No vuelvas a escribir var al actualizar una variable existente. Escribir var goles = 1 crea una nueva variable por error.",
        "keyPoints": [
          "Solo las variables var permiten reasignar valores después de su creación.",
          "El nuevo valor asignado debe coincidir estrictamente con el tipo de dato original.",
          "Operadores como +=, -= facilitan la actualización de contadores."
        ]
      },
      {
        "title": "Patrón de acumulador y contador",
        "explanation": "Uno de los usos más habituales de la actualización de variables es acumular totales o contar eventos (como pasos caminados, monedas recogidas o intentos fallidos):",
        "codeSnippet": "fun main() {\n    var totalCarrito = 0.0\n    println(\"Carrito vacío: $$totalCarrito\")\n\n    // Agregamos artículos\n    totalCarrito += 24.50\n    totalCarrito += 15.00\n    totalCarrito += 9.99\n\n    println(\"Total a cobrar por 3 productos: $$totalCarrito\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Carrito vacío: $0.0\nTotal a cobrar por 3 productos: $49.49",
        "byteTip": "Inicializa siempre tus acumuladores en 0.0 para evitar problemas con números indefinidos.",
        "pitfallTip": "Cuidado con sobreescribir un acumulador usando = en lugar de +=. Perderías todos los valores previos sumados.",
        "keyPoints": [
          "Un contador suma típicamente de 1 en 1 (contador++).",
          "Un acumulador suma cantidades variables (total += monto).",
          "Ambos patrones requieren el uso justificado de var."
        ]
      }
    ]
  },
  "kotlin-u02-l06": {
    "id": "kt-th-u02-l06",
    "lessonId": "kotlin-u02-l06",
    "pathId": "kotlin",
    "unitId": 2,
    "levelId": 6,
    "title": "6. Nombres descriptivos",
    "subtitle": "Aprende a nombrar variables con claridad y aplicando la convención oficial camelCase.",
    "estimatedMinutes": 8,
    "analogy": "Un armario donde todas las cajas dicen \"cosas 1\", \"cosas 2\" y \"varios\" es un infierno para encontrar algo. Si las etiquetas dicen \"ropaDeInvierno\" y \"herramientasJardin\", encuentras todo en un segundo.",
    "video": {
      "title": "Kotlin: Variables val, var y Tipos de Datos",
      "channel": "MoureDev by Brais Moure",
      "duration": "35:10",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Diferencia entre val y var, inmutabilidad, tipos primitivos e inferencia de tipos."
    },
    "sections": [
      {
        "title": "La convención oficial: lowerCamelCase",
        "explanation": "En Kotlin y en el ecosistema oficial de Android existe un estándar estricto para nombrar variables: **lowerCamelCase**.\n\n¿Cómo funciona camelCase?\n• Empieza siempre con una letra minúscula.\n• Si el nombre tiene varias palabras juntas, cada nueva palabra inicia con una letra mayúscula.\n• No se usan espacios ni guiones bajos (`_`).\n\nEjemplos correctos:\n✔ `nombreUsuario`\n✔ `saldoCuentaBancaria`\n✔ `intentosRestantes`\n✔ `estaConectadoInternet`\n\nEjemplos incorrectos o desaconsejados:\n✖ `nombre_usuario` (estilo de Python/C, no de Kotlin)\n✖ `NombreUsuario` (con mayúscula inicial, reservado para Clases)\n✖ `n` o `x` (no dicen nada sobre qué dato contienen)",
        "codeSnippet": "fun main() {\n    // Nombres expresivos que explican por sí mismos qué representan\n    val nombreDestinatario = \"Carlos Mendoza\"\n    val direccionEntrega = \"Av. Central 742\"\n    val numeroPaquetes = 2\n    val envioEsUrgente = true\n\n    println(\"Orden de envío para: $nombreDestinatario\")\n    println(\"Destino: $direccionEntrega ($numeroPaquetes paquetes)\")\n    println(\"¿Prioridad urgente?: $envioEsUrgente\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Orden de envío para: Carlos Mendoza\nDestino: Av. Central 742 (2 paquetes)\n¿Prioridad urgente?: true",
        "byteTip": "Nombra las variables booleanas como preguntas afirmativas: esVisible, tieneDescuento, estaHabilitado.",
        "pitfallTip": "Nunca uses nombres en clave como temp, data1, val2. En dos semanas no recordarás qué guardaban.",
        "keyPoints": [
          "Las variables en Kotlin se escriben en lowerCamelCase.",
          "Los nombres deben ser descriptivos y revelar el propósito del dato.",
          "Las mayúsculas iniciales se reservan para nombres de Clases (como String, Int, User)."
        ]
      },
      {
        "title": "Legibilidad: el código se lee más veces de las que se escribe",
        "explanation": "Un estudio famoso en ingeniería de software demostró que los programadores pasan 10 veces más tiempo leyendo y entendiendo código existente que escribiendo código nuevo.\n\nElegir nombres excelentes hace que tu código sea prácticamente autoexplicativo:",
        "codeSnippet": "fun main() {\n    val precioConDescuento = 85.0\n    val costoEnvioEstandar = 10.0\n    val totalPagar = precioConDescuento + costoEnvioEstandar\n    \n    println(\"Total listo para procesar: $$totalPagar\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Total listo para procesar: $95.0",
        "byteTip": "No temas usar nombres largos si aportan claridad. precioConDescuento es infinitamente superior a pd.",
        "pitfallTip": "Evita abreviaturas crípticas que solo tú entiendas en el momento de programar.",
        "keyPoints": [
          "Un buen nombre ahorra comentarios y previene confusiones.",
          "La consistencia en el estilo hace que el proyecto se sienta profesional.",
          "Sigue siempre la guía oficial de estilo de Kotlin (Kotlin Coding Conventions)."
        ]
      }
    ]
  },
  "kotlin-u02-l07": {
    "id": "kt-th-u02-l07",
    "lessonId": "kotlin-u02-l07",
    "pathId": "kotlin",
    "unitId": 2,
    "levelId": 7,
    "title": "7. Interpolación de variables en mensajes",
    "subtitle": "Inserta variables y expresiones directamente dentro de tus textos con el signo dólar ($).",
    "estimatedMinutes": 8,
    "analogy": "Es como una carta preimpresa de felicitaciones donde los espacios en blanco tienen etiquetas como \"[NOMBRE]\" y \"[PREMIO]\". Al enviarla, el sistema rellena automáticamente esos huecos con los datos reales.",
    "video": {
      "title": "Kotlin: Variables val, var y Tipos de Datos",
      "channel": "MoureDev by Brais Moure",
      "duration": "35:10",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Diferencia entre val y var, inmutabilidad, tipos primitivos e inferencia de tipos."
    },
    "sections": [
      {
        "title": "Plantillas de texto (String Templates)",
        "explanation": "En lenguajes antiguos, para unir texto con variables tenías que hacer concatenaciones engorrosas con el signo más:\n`\"Hola \" + nombre + \", tu puntaje es \" + puntos + \" puntos.\"`\n\nKotlin simplifica esto radicalmente con las **plantillas de texto** (*String Templates*). Solo colocas el signo dólar (`$`) antes del nombre de la variable dentro de las comillas:\n`\"Hola $nombre, tu puntaje es $puntos puntos.\"`\n\nSi necesitas evaluar una expresión u operación dentro del texto, usas llaves: **`${operación}`**.",
        "codeSnippet": "fun main() {\n    val cliente = \"Mariana\"\n    val productos = 3\n    val precioUnitario = 15.0\n\n    // Variable simple con $nombre\n    println(\"Cliente: $cliente\")\n    \n    // Expresión calculada con ${operación}\n    println(\"Total por $productos artículos: $${productos * precioUnitario}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Cliente: Mariana\nTotal por 3 artículos: $45.0",
        "byteTip": "Si quieres imprimir el símbolo de dólar literal sin que Kotlin crea que es una variable, usa \\$ o escribe `'$'`.",
        "pitfallTip": "Olvidar las llaves en operaciones complejas: $precio * 2 solo imprimirá el precio seguido literalmente de \" * 2\".",
        "keyPoints": [
          "$nombre inserta el valor directo de una variable en el texto.",
          "${expresion} evalúa operaciones y métodos directamente dentro de las comillas.",
          "Hace el código mucho más limpio y fácil de leer que concatenar con +."
        ]
      },
      {
        "title": "Llamar métodos dentro de plantillas con ${...}",
        "explanation": "La sintaxis de llaves `${...}` es sumamente poderosa: te permite llamar funciones, métodos de texto o consultar propiedades sin tener que crear variables intermedias:",
        "codeSnippet": "fun main() {\n    val app = \"android studio\"\n    val version = 2024.1\n\n    // Llamamos al método .uppercase() directamente en la plantilla\n    println(\"Desarrollando en ${app.uppercase()} versión $version\")\n    println(\"El nombre tiene ${app.length} caracteres.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Desarrollando en ANDROID STUDIO versión 2024.1\nEl nombre tiene 14 caracteres.",
        "byteTip": "Puedes anidar comparaciones o cálculos lógicos dentro de ${}: println(\"¿Aprobó?: ${nota >= 70}\").",
        "pitfallTip": "No sobrecargues una plantilla con lógica kilométrica. Si el cálculo tiene más de una línea, extráelo a una variable previa.",
        "keyPoints": [
          "${objeto.propiedad} permite acceder a miembros de un objeto dentro del String.",
          "Mejora la expresividad de los mensajes en consola y en interfaces Android.",
          "Es evaluado en tiempo de ejecución con un costo de rendimiento casi nulo."
        ]
      }
    ]
  }
};
