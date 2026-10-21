import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_06_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u06-l01": {
    "id": "kt-th-u06-l01",
    "lessonId": "kotlin-u06-l01",
    "pathId": "kotlin",
    "unitId": 6,
    "levelId": 1,
    "title": "1. Declaración e invocación de funciones",
    "subtitle": "Modulariza tu código agrupando instrucciones en bloques reutilizables con nombre propio.",
    "estimatedMinutes": 8,
    "analogy": "Una función es como el botón \"Hacer Capuchino\" de una cafetera moderna: por dentro muele los granos, calienta el agua, espuma la leche y sirve la taza; pero para ti es simplemente presionar un solo botón con nombre claro.",
    "video": {
      "title": "Funciones en Kotlin: Parámetros, Retorno y Modularización",
      "channel": "MoureDev by Brais Moure",
      "duration": "45:30",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Modularización con funciones, valores por defecto, argumentos con nombre y Unit."
    },
    "sections": [
      {
        "title": "¿Qué es una función y cómo se declara?",
        "explanation": "A medida que tus programas crecen, escribir todas las instrucciones dentro de `main()` se vuelve inmanejable. Si necesitas calcular el IVA en 10 partes distintas de tu aplicación, copiar y pegar la misma fórmula 10 veces es peligroso: si la tasa cambia, tendrías que modificar 10 archivos.\n\nUna **función** es un bloque de código con nombre que realiza una tarea específica y que puedes **reutilizar** tantas veces como quieras llamándola por su nombre.\n\nSintaxis básica en Kotlin:\n`fun nombreDeLaFuncion() {`\n`    // Instrucciones a ejecutar`\n`}`\n\nPara ejecutarla, simplemente escribes su nombre seguido de paréntesis: `nombreDeLaFuncion()`.",
        "codeSnippet": "// 1. Declaramos la función reutilizable\nfun saludarUsuario() {\n    println(\"¡Hola! Bienvenido a la aplicación oficial de Kotlin.\")\n    println(\"Esperamos que disfrutes tu sesión de hoy.\")\n}\n\nfun main() {\n    // 2. La invocamos tantas veces como la necesitemos\n    saludarUsuario()\n    println(\"--- Realizando tareas intermedias ---\")\n    saludarUsuario()\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¡Hola! Bienvenido a la aplicación oficial de Kotlin.\nEsperamos que disfrutes tu sesión de hoy.\n--- Realizando tareas intermedias ---\n¡Hola! Bienvenido a la aplicación oficial de Kotlin.\nEsperamos que disfrutes tu sesión de hoy.",
        "byteTip": "Los nombres de funciones en Kotlin siguen lowerCamelCase y deben empezar con un verbo que describa su acción: calcularTotal, enviarCorreo, validarUsuario.",
        "pitfallTip": "Declarar una función no la ejecuta automáticamente; debes llamarla explícitamente desde main() o desde otra función.",
        "keyPoints": [
          "fun es la palabra clave para definir funciones en Kotlin.",
          "Las funciones evitan la duplicación de código y facilitan el mantenimiento.",
          "Se ejecutan llamándolas por su nombre seguido de paréntesis ()."
        ]
      },
      {
        "title": "El principio DRY: Don't Repeat Yourself",
        "explanation": "Uno de los principios sagrados del desarrollo de software es **DRY (No te repitas)**. Cada vez que sientas la tentación de copiar y pegar un bloque de código, detente y conviértelo en una función.\n\nSi mañana debes corregir un error o mejorar el diseño, solo lo cambiarás en un único lugar:",
        "codeSnippet": "fun imprimirSeparador() {\n    println(\"========================================\")\n}\n\nfun main() {\n    imprimirSeparador()\n    println(\"   REPORTE DE VENTAS DEL DÍA\")\n    imprimirSeparador()\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "========================================\n   REPORTE DE VENTAS DEL DÍA\n========================================",
        "byteTip": "Las funciones pequeñas y con un único propósito son las más fáciles de probar y mantener.",
        "pitfallTip": "Evita crear \"funciones monstruo\" de 300 líneas que hagan 10 cosas distintas a la vez.",
        "keyPoints": [
          "El principio DRY reduce la deuda técnica y los errores por copiar y pegar.",
          "Una función debe tener una sola responsabilidad bien definida.",
          "La modularización hace que los proyectos grandes sean comprensibles."
        ]
      }
    ]
  },
  "kotlin-u06-l02": {
    "id": "kt-th-u06-l02",
    "lessonId": "kotlin-u06-l02",
    "pathId": "kotlin",
    "unitId": 6,
    "levelId": 2,
    "title": "2. Parámetros y argumentos",
    "subtitle": "Haz tus funciones dinámicas enviándoles datos de entrada mediante parámetros y argumentos.",
    "estimatedMinutes": 8,
    "analogy": "Una licuadora no siempre hace el mismo jugo: si le pasas naranjas (argumento), hace jugo de naranja; si le pasas fresas, hace jugo de fresa. La ranura es el parámetro y la fruta que introduces es el argumento.",
    "video": {
      "title": "Funciones en Kotlin: Parámetros, Retorno y Modularización",
      "channel": "MoureDev by Brais Moure",
      "duration": "45:30",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Modularización con funciones, valores por defecto, argumentos con nombre y Unit."
    },
    "sections": [
      {
        "title": "Parámetros y argumentos en funciones",
        "explanation": "Una función que siempre hace exactamente lo mismo es útil, pero una función que adapta su comportamiento a los datos que le envíes es infinitamente más poderosa.\n\nPara recibir datos, declaramos **parámetros** dentro de los paréntesis de la función:\n`fun saludar(nombre: String, edad: Int) {`\n`    println(\"Hola $nombre, tienes $edad años.\")\n`\n`}`\n\nDistinción técnica importante:\n• **Parámetro:** La variable receptora que declaras en la firma de la función (ej: `nombre: String`).\n• **Argumento:** El valor real que le pasas al llamarla desde tu código (ej: `\"Lucas\"`).",
        "codeSnippet": "// Función que recibe dos parámetros tipados\nfun mostrarBienvenida(usuario: String, puntos: Int) {\n    println(\"¡Hola, $usuario!\")\n    println(\"Tienes $puntos puntos acumulados en tu perfil.\\n\")\n}\n\nfun main() {\n    // Pasamos argumentos diferentes en cada llamada\n    mostrarBienvenida(\"Camila\", 350)\n    mostrarBienvenida(\"Javier\", 1200)\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¡Hola, Camila!\nTienes 350 puntos acumulados en tu perfil.\n\n¡Hola, Javier!\nTienes 1200 puntos acumulados en tu perfil.\n",
        "byteTip": "En Kotlin, los parámetros de una función son siempre inmutables (val) por diseño para evitar efectos secundarios imprevistos.",
        "pitfallTip": "Debes respetar el orden y los tipos de datos exactos de los parámetros al invocar la función.",
        "keyPoints": [
          "Los parámetros permiten pasarle datos externos a una función.",
          "Cada parámetro debe llevar su tipo explícito obligatorio (: Tipo).",
          "Los parámetros son de solo lectura dentro del cuerpo de la función."
        ]
      },
      {
        "title": "Cálculos matemáticos con parámetros",
        "explanation": "Mira cómo una función genérica puede calcular el área de cualquier rectángulo según los valores que reciba:",
        "codeSnippet": "fun calcularAreaRectangulo(base: Double, altura: Double) {\n    val area = base * altura\n    println(\"Un rectángulo de $base x $altura tiene un área de $area m².\")\n}\n\nfun main() {\n    calcularAreaRectangulo(10.0, 5.0)\n    calcularAreaRectangulo(3.5, 2.0)\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Un rectángulo de 10.0 x 5.0 tiene un área de 50.0 m².\nUn rectángulo de 3.5 x 2.0 tiene un área de 7.0 m².",
        "byteTip": "Al nombrar parámetros, sé claro: base y altura describen exactamente qué magnitud espera la función.",
        "pitfallTip": "Intentar modificar el valor de un parámetro directamente (por ejemplo base = 20) dará error de compilación.",
        "keyPoints": [
          "Los parámetros hacen que el código sea adaptable y multiuso.",
          "Puedes definir tantos parámetros como requiera la función, separados por comas.",
          "Son la base de la comunicación entre diferentes componentes de software."
        ]
      }
    ]
  },
  "kotlin-u06-l03": {
    "id": "kt-th-u06-l03",
    "lessonId": "kotlin-u06-l03",
    "pathId": "kotlin",
    "unitId": 6,
    "levelId": 3,
    "title": "3. Valores de retorno con return",
    "subtitle": "Devuelve resultados desde tus funciones hacia el código que las llamó usando la palabra clave return.",
    "estimatedMinutes": 8,
    "analogy": "Envías a un mensajero con dinero a comprar pan: el mensajero va a la panadería, compra el pan y regresa a tu casa entregándote la bolsa de pan en las manos (el valor de retorno).",
    "video": {
      "title": "Funciones en Kotlin: Parámetros, Retorno y Modularización",
      "channel": "MoureDev by Brais Moure",
      "duration": "45:30",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Modularización con funciones, valores por defecto, argumentos con nombre y Unit."
    },
    "sections": [
      {
        "title": "Valores de retorno con return",
        "explanation": "Hasta ahora nuestras funciones solo imprimían texto en la consola. Sin embargo, en el mundo real, la mayoría de las funciones realizan un cálculo y **devuelven el resultado** para que el programa principal lo guarde en una variable o lo use en otras operaciones.\n\nPara que una función devuelva un valor, debemos:\n1. Indicar el **tipo de dato de retorno** después de los paréntesis con dos puntos: `fun sumar(a: Int, b: Int): Int`.\n2. Usar la palabra clave **`return`** seguida del valor o expresión a devolver.",
        "codeSnippet": "// Indicamos con : Double que esta función devolverá un número decimal\nfun calcularTotalConIva(precioNeto: Double, tasaIva: Double): Double {\n    val total = precioNeto * (1 + tasaIva)\n    return total // Entregamos el resultado al código que nos llamó\n}\n\nfun main() {\n    // Guardamos el valor devuelto en una variable\n    val factura1 = calcularTotalConIva(100.0, 0.16)\n    val factura2 = calcularTotalConIva(250.0, 0.16)\n\n    println(\"Factura 1 con IVA: $$factura1\")\n    println(\"Factura 2 con IVA: $$factura2\")\n    println(\"Gran Total: $${factura1 + factura2}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Factura 1 con IVA: $116.0\nFactura 2 con IVA: $290.0\nGran Total: $406.0",
        "byteTip": "Al ejecutarse la sentencia return, la función termina de inmediato. Cualquier código escrito debajo de return en esa misma rama será ignorado.",
        "pitfallTip": "Si declaras que una función devuelve : String y olvidas el return, Kotlin te dará un error de compilación de inmediato.",
        "keyPoints": [
          "El tipo de retorno se especifica tras los paréntesis con : Tipo.",
          "return devuelve el dato resultante y finaliza la ejecución de la función.",
          "El valor retornado puede guardarse en variables o usarse en otras expresiones."
        ]
      },
      {
        "title": "Funciones de validación booleana",
        "explanation": "Un patrón elegantísimo en Kotlin es crear funciones que devuelven `Boolean` para validar estados:",
        "codeSnippet": "fun esMayorDeEdad(edad: Int): Boolean {\n    return edad >= 18\n}\n\nfun main() {\n    val edadCliente = 20\n    \n    if (esMayorDeEdad(edadCliente)) {\n        println(\"Venta autorizada para cliente de $edadCliente años.\")\n    } else {\n        println(\"Venta rechazada por minoría de edad.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Venta autorizada para cliente de 20 años.",
        "byteTip": "Puedes poner la condición directamente en el return: return edad >= 18 es limpio y súper profesional.",
        "pitfallTip": "No escribas if (edad >= 18) return true else return false. Es redundante; return edad >= 18 hace exactamente lo mismo en una línea.",
        "keyPoints": [
          "Las funciones que retornan Boolean hacen que las condiciones if se lean con total naturalidad.",
          "Centralizar validaciones en funciones previene inconsistencias en la app.",
          "Permiten realizar pruebas unitarias (unit tests) de manera sencilla."
        ]
      }
    ]
  },
  "kotlin-u06-l04": {
    "id": "kt-th-u06-l04",
    "lessonId": "kotlin-u06-l04",
    "pathId": "kotlin",
    "unitId": 6,
    "levelId": 4,
    "title": "4. Funciones con retorno y funciones Unit",
    "subtitle": "Comprende el tipo Unit, el equivalente moderno y seguro al void de otros lenguajes.",
    "estimatedMinutes": 8,
    "analogy": "Un chef que te entrega un plato de comida devuelve algo (un valor). Un árbitro que pita el final del partido realiza una acción pero no te entrega ningún objeto físico (devuelve Unit).",
    "video": {
      "title": "Funciones en Kotlin: Parámetros, Retorno y Modularización",
      "channel": "MoureDev by Brais Moure",
      "duration": "45:30",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Modularización con funciones, valores por defecto, argumentos con nombre y Unit."
    },
    "sections": [
      {
        "title": "Funciones que retornan valor vs funciones Unit",
        "explanation": "¿Qué pasa con las funciones que solo realizan una acción (como imprimir en consola o reproducir un sonido) y no tienen nada que devolver?\n\nEn Kotlin, esas funciones devuelven un tipo especial llamado **`Unit`**:\n• Es el equivalente al tipo `void` de Java, C o C++, pero con la ventaja de que en Kotlin es un objeto real.\n• No necesitas escribir `: Unit` explícitamente en la declaración; Kotlin lo asume de forma predeterminada si no indicas otro tipo.\n• Tampoco necesitas poner `return Unit` al final.",
        "codeSnippet": "// Estas dos funciones son exactamente equivalentes:\nfun registrarEventoExplicito(evento: String): Unit {\n    println(\"Evento registrado en bitácora: $evento\")\n}\n\nfun registrarEventoImplicito(evento: String) {\n    println(\"Evento registrado en bitácora: $evento\")\n}\n\nfun main() {\n    registrarEventoExplicito(\"Inicio de sesión\")\n    registrarEventoImplicito(\"Cierre de sesión\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Evento registrado en bitácora: Inicio de sesión\nEvento registrado en bitácora: Cierre de sesión",
        "byteTip": "En el código cotidiano de Kotlin casi nadie escribe : Unit explícitamente; se omite por convención.",
        "pitfallTip": "No intentes guardar el resultado de una función Unit en una variable esperando un valor útil; solo obtendrás el objeto Unit.",
        "keyPoints": [
          "Unit indica que la función no produce un resultado de datos útil.",
          "Se omite por convención en la firma de las funciones.",
          "Diferencia las funciones de acción (procedimientos) de las funciones de cálculo."
        ]
      },
      {
        "title": "Funciones de una sola expresión (Single-expression functions)",
        "explanation": "Si una función solo calcula y devuelve el resultado de una sola línea, Kotlin te permite eliminar las llaves `{ }` y el `return`, usando el signo igual (`=`):",
        "codeSnippet": "// Forma tradicional con llaves:\nfun multiplicarClasico(x: Int, y: Int): Int {\n    return x * y\n}\n\n// Forma moderna de una sola expresión (Kotlin infiere el tipo de retorno Int):\nfun multiplicar(x: Int, y: Int) = x * y\n\nfun main() {\n    println(\"Resultado clásico: ${multiplicarClasico(6, 7)}\")\n    println(\"Resultado compacto: ${multiplicar(6, 7)}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Resultado clásico: 42\nResultado compacto: 42",
        "byteTip": "Las funciones de una sola expresión con = son una de las firmas estilísticas más elegantes de Kotlin.",
        "pitfallTip": "Solo usa la sintaxis = cuando la función consista genuinamente en una única expresión limpia.",
        "keyPoints": [
          "fun f() = expresion simplifica funciones cortas a una sola línea.",
          "Kotlin infiere automáticamente el tipo de retorno a partir de la expresión.",
          "Aumenta la productividad y hace el código muy conciso."
        ]
      }
    ]
  },
  "kotlin-u06-l05": {
    "id": "kt-th-u06-l05",
    "lessonId": "kotlin-u06-l05",
    "pathId": "kotlin",
    "unitId": 6,
    "levelId": 5,
    "title": "5. Parámetros predeterminados y argumentos con nombre",
    "subtitle": "Define parámetros opcionales con valores predeterminados y usa argumentos con nombre para evitar confusiones.",
    "estimatedMinutes": 8,
    "analogy": "Al pedir una hamburguesa, por defecto viene con queso y lechuga (valores predeterminados). Pero si quieres, puedes pedirla especificando: \"cebolla: no\" usando argumentos con nombre.",
    "video": {
      "title": "Funciones en Kotlin: Parámetros, Retorno y Modularización",
      "channel": "MoureDev by Brais Moure",
      "duration": "45:30",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Modularización con funciones, valores por defecto, argumentos con nombre y Unit."
    },
    "sections": [
      {
        "title": "Parámetros con valores predeterminados",
        "explanation": "En lenguajes como Java o C#, para tener funciones flexibles tenías que crear múltiples versiones de la misma función con distinta cantidad de parámetros (sobrecarga de métodos).\n\nKotlin resuelve esto de forma brillante: te permite asignar **valores predeterminados** directamente en los parámetros:\n`fun saludar(nombre: String, saludo: String = \"Hola\")`\n\nSi el usuario no envía el segundo dato, Kotlin usa automáticamente el valor por defecto:",
        "codeSnippet": "fun enviarNotificacion(mensaje: String, urgente: Boolean = false, remitente: String = \"Sistema\") {\n    val prioridad = if (urgente) \"[URGENTE]\" else \"[NORMAL]\"\n    println(\"$prioridad De: $remitente -> $mensaje\")\n}\n\nfun main() {\n    // Usamos los valores predeterminados de urgente y remitente\n    enviarNotificacion(\"Tu pedido está listo\")\n\n    // Personalizamos solo lo que necesitamos\n    enviarNotificacion(\"Alerta de seguridad\", urgente = true, remitente = \"Seguridad Bancaria\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "[NORMAL] De: Sistema -> Tu pedido está listo\n[URGENTE] De: Seguridad Bancaria -> Alerta de seguridad",
        "byteTip": "Coloca los parámetros con valores predeterminados al final de la lista para que sea más fácil invocar la función.",
        "pitfallTip": "No abuses de valores por defecto confusos. Usa valores neutros que tengan sentido lógico en el 90% de los casos.",
        "keyPoints": [
          "parametro: Tipo = valorPorDefecto hace que el argumento sea opcional.",
          "Elimina la necesidad de sobrecargar funciones repetitivas.",
          "Brinda máxima flexibilidad sin romper el código existente."
        ]
      },
      {
        "title": "Argumentos con nombre (Named Arguments)",
        "explanation": "Cuando una función tiene muchos parámetros del mismo tipo (por ejemplo, tres textos o cuatro números), es muy fácil equivocarse de orden:\n`crearUsuario(\"Ana\", \"García\", \"ana@correo.com\", \"Madrid\")`\n\nKotlin te permite escribir el **nombre del parámetro** al invocar la función, haciendo que el código sea autodocumentado y permitiéndote enviar los argumentos en el orden que prefieras:",
        "codeSnippet": "fun configurarPerfil(nombre: String, temaOscuro: Boolean = false, notificacionesSonido: Boolean = true) {\n    println(\"Perfil de $nombre:\")\n    println(\"  - Modo oscuro: $temaOscuro\")\n    println(\"  - Sonido: $notificacionesSonido\")\n}\n\nfun main() {\n    // Argumentos con nombre: sabemos con total certeza qué significa cada valor\n    configurarPerfil(\n        nombre = \"David\",\n        notificacionesSonido = false,\n        temaOscuro = true\n    )\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Perfil de David:\n  - Modo oscuro: true\n  - Sonido: false",
        "byteTip": "En Jetpack Compose (el framework oficial de UI de Android), casi todos los componentes se configuran con argumentos con nombre.",
        "pitfallTip": "Si mezclas argumentos posicionales y con nombre, los posicionales deben ir siempre primero.",
        "keyPoints": [
          "nombre = valor aclara el significado de cada argumento al llamar la función.",
          "Permite saltarse parámetros intermedios que ya tienen valores por defecto.",
          "Aumenta drásticamente la legibilidad en proyectos grandes."
        ]
      }
    ]
  },
  "kotlin-u06-l06": {
    "id": "kt-th-u06-l06",
    "lessonId": "kotlin-u06-l06",
    "pathId": "kotlin",
    "unitId": 6,
    "levelId": 6,
    "title": "6. Variables locales y alcance",
    "subtitle": "Comprende el alcance (scope) de las variables y dónde pueden ser leídas o modificadas.",
    "estimatedMinutes": 8,
    "analogy": "Las variables locales son como las notas que escribes en la pizarra de un aula: solo las personas dentro de esa aula pueden verlas y se borran al terminar la clase. Las variables globales son como un cartel en la entrada de la escuela: todos los alumnos pueden leerlo.",
    "video": {
      "title": "Funciones en Kotlin: Parámetros, Retorno y Modularización",
      "channel": "MoureDev by Brais Moure",
      "duration": "45:30",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Modularización con funciones, valores por defecto, argumentos con nombre y Unit."
    },
    "sections": [
      {
        "title": "Variables locales y alcance (Scope)",
        "explanation": "El **alcance** (*scope*) de una variable determina en qué partes de tu programa esa variable es visible y puede utilizarse.\n\nLa regla de oro en Kotlin es el **alcance de bloque por llaves `{ }`**:\n• Toda variable declarada dentro de una función o bloque solo existe mientras esa función se está ejecutando. Se le llama **variable local**.\n• Ninguna otra función puede acceder a las variables locales de otra función.\n• Cuando la función termina, sus variables locales se destruyen de la memoria RAM automáticamente.",
        "codeSnippet": "fun calcularDescuento(precio: Double): Double {\n    // tasa es local de esta función: nadie afuera puede verla\n    val tasa = 0.15\n    return precio * tasa\n}\n\nfun main() {\n    val precioLaptop = 1000.0\n    val descuento = calcularDescuento(precioLaptop)\n    println(\"Descuento obtenido: $$descuento\")\n\n    // println(tasa) -> Daría ERROR: 'Unresolved reference: tasa'\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Descuento obtenido: $150.0",
        "byteTip": "Limitar el alcance de las variables al bloque más pequeño posible es una de las mejores prácticas de seguridad en programación.",
        "pitfallTip": "Intentar leer una variable declarada dentro de un bucle for o if desde afuera de ese bloque provocará un error de variable no resuelta.",
        "keyPoints": [
          "Las variables locales nacen y mueren dentro de las llaves { } donde fueron declaradas.",
          "Diferentes funciones pueden usar el mismo nombre de variable local sin interferir entre sí.",
          "El aislamiento de variables previene colisiones accidentales de datos."
        ]
      },
      {
        "title": "Variables de nivel superior (Top-level)",
        "explanation": "En Kotlin puedes declarar constantes fuera de cualquier función, en la parte superior del archivo. Se les conoce como variables de nivel superior o globales:",
        "codeSnippet": "// Constante de nivel superior accesible por cualquier función en este archivo\nconst val NOMBRE_APP = \"MiAppSegura\"\n\nfun mostrarCabecera() {\n    println(\"=== $NOMBRE_APP ===\")\n}\n\nfun main() {\n    mostrarCabecera()\n    println(\"Bienvenido a $NOMBRE_APP\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "=== MiAppSegura ===\nBienvenido a MiAppSegura",
        "byteTip": "Usa const val para constantes puras conocidas en tiempo de compilación. Por convención oficial se escriben en MAYÚSCULAS_CON_GUION.",
        "pitfallTip": "Evita variables mutables (var) globales. Hacen que el estado del programa sea impredecible.",
        "keyPoints": [
          "const val define constantes globales inmutables.",
          "Las variables de nivel superior deben ser siempre inmutables.",
          "Permiten compartir configuraciones fijas a lo largo de la app."
        ]
      }
    ]
  },
  "kotlin-u06-l07": {
    "id": "kt-th-u06-l07",
    "lessonId": "kotlin-u06-l07",
    "pathId": "kotlin",
    "unitId": 6,
    "levelId": 7,
    "title": "7. Dividir un problema en funciones",
    "subtitle": "Domina la técnica de descomposición: divide un problema complejo en pequeñas funciones sencillas.",
    "estimatedMinutes": 8,
    "analogy": "Un equipo de mecánicos en una parada de Fórmula 1: uno cambia la rueda delantera izquierda, otro la derecha, otro recarga combustible. Cada uno hace una tarea pequeña a la perfección en lugar de una sola persona corriendo para hacer todo sola.",
    "video": {
      "title": "Funciones en Kotlin: Parámetros, Retorno y Modularización",
      "channel": "MoureDev by Brais Moure",
      "duration": "45:30",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Modularización con funciones, valores por defecto, argumentos con nombre y Unit."
    },
    "sections": [
      {
        "title": "Descomposición modular de problemas",
        "explanation": "Cuando te enfrentas a un requerimiento grande (como procesar una orden de compra completa), nunca intentes programar todo en un solo bloque gigante.\n\nAplica la técnica de **divide y vencerás**:\n1. Identifica las subtareas: validar cliente, calcular subtotal, calcular impuestos, procesar pago y emitir recibo.\n2. Crea una función pequeña y especializada para cada subtarea.\n3. Coordina todas las funciones desde una función principal ordenada y legible.",
        "codeSnippet": "fun calcularSubtotal(unidades: Int, precio: Double) = unidades * precio\n\nfun calcularImpuesto(subtotal: Double) = subtotal * 0.16\n\nfun emitirFactura(cliente: String, total: Double) {\n    println(\"Factura para: $cliente | Total a cobrar: $$total\")\n}\n\nfun main() {\n    val cliente = \"Elena Rostova\"\n    val subtotal = calcularSubtotal(unidades = 4, precio = 50.0)\n    val impuesto = calcularImpuesto(subtotal)\n    val totalFinal = subtotal + impuesto\n\n    emitirFactura(cliente, totalFinal)\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Factura para: Elena Rostova | Total a cobrar: $232.0",
        "byteTip": "Cada función debe hacer una sola cosa y hacerla bien (Principio de Responsabilidad Única).",
        "pitfallTip": "No crees funciones tan fragmentadas que solo contengan una suma trivial si no aportan reutilización o claridad semántica.",
        "keyPoints": [
          "Dividir problemas en funciones hace que el código sea fácil de probar y corregir.",
          "Si una función falla, sabes con precisión quirúrgica en qué archivo y línea ocurrió.",
          "Permite que varios desarrolladores trabajen en distintas partes del sistema simultáneamente."
        ]
      },
      {
        "title": "Evolución y mantenimiento de código modular",
        "explanation": "La magia de este enfoque se nota cuando los requisitos cambian. Si mañana la tasa de impuestos cambia o se agrega una bonificación especial, solo tocas la función `calcularImpuesto`; el resto de la aplicación ni se entera y sigue funcionando intacta:",
        "codeSnippet": "fun aplicarDescuentoFrecuente(monto: Double, esClienteFrecuente: Boolean): Double {\n    return if (esClienteFrecuente) monto * 0.90 else monto\n}\n\nfun main() {\n    val totalBase = 200.0\n    val totalConDescuento = aplicarDescuentoFrecuente(totalBase, esClienteFrecuente = true)\n    \n    println(\"Total tras aplicar política de fidelidad: $$totalConDescuento\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Total tras aplicar política de fidelidad: $180.0",
        "byteTip": "El software bien modularizado se adapta a los cambios del negocio en minutos en lugar de semanas.",
        "pitfallTip": "Evita el acoplamiento fuerte donde una función depende de variables internas secretas de otra.",
        "keyPoints": [
          "La modularización minimiza el impacto de los cambios de negocio.",
          "Facilita la escritura de pruebas automatizadas confiables.",
          "Es la base de la arquitectura limpia en apps Android profesionales."
        ]
      }
    ]
  }
};
