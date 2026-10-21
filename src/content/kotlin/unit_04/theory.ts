import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_04_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u04-l01": {
    "id": "kt-th-u04-l01",
    "lessonId": "kotlin-u04-l01",
    "pathId": "kotlin",
    "unitId": 4,
    "levelId": 1,
    "title": "1. Decisiones simples con if",
    "subtitle": "Aprende a ejecutar código condicionalmente solo cuando una regla se cumple.",
    "estimatedMinutes": 8,
    "analogy": "Es como el sensor automático de una puerta de tienda: \"Si una persona se acerca (condición verdadera), abre la puerta; de lo contrario, no hagas nada y quédate cerrada\".",
    "video": {
      "title": "Estructuras de Control: If Else y When en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "40:15",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Bifurcaciones, condicionales compuestas y la potencia de when como expresión."
    },
    "sections": [
      {
        "title": "La sentencia condicional if",
        "explanation": "Hasta ahora, nuestros programas ejecutaban todas las líneas de arriba hacia abajo sin detenerse. Pero las aplicaciones reales necesitan tomar caminos distintos según lo que ocurra:\n• Si la batería está por debajo del 15%, activar modo de ahorro.\n• Si el carrito supera los $50, aplicar envío gratis.\n• Si el usuario presionó \"Guardar\", escribir los datos en memoria.\n\nEn Kotlin, la herramienta básica para esto es la sentencia **`if`** (que en inglés significa \"si condicional\"). Su estructura es:\n`if (condición) {`\n`    // Código que solo se ejecuta si la condición es true`\n`}`",
        "codeSnippet": "fun main() {\n    val totalCompra = 75.0\n    println(\"Total de tu compra: $$totalCompra\")\n\n    // La condición se evalúa como true o false\n    if (totalCompra >= 50.0) {\n        println(\"¡Felicidades! Calificas para envío gratis a domicilio.\")\n    }\n\n    println(\"Gracias por tu visita.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Total de tu compra: $75.0\n¡Felicidades! Calificas para envío gratis a domicilio.\nGracias por tu visita.",
        "byteTip": "La condición dentro de los paréntesis ( ) debe evaluarse obligatoriamente a un tipo Boolean (true o false).",
        "pitfallTip": "No pongas punto y coma ; después del paréntesis del if. Escribir if (x > 5); anula el bloque condicional por completo.",
        "keyPoints": [
          "if permite bifurcar el flujo de ejecución del programa.",
          "El bloque entre llaves { } solo corre cuando la condición es true.",
          "Si la condición es false, el programa simplemente salta ese bloque y continúa."
        ]
      },
      {
        "title": "Buenas prácticas y legibilidad en condicionales",
        "explanation": "Aunque en Kotlin puedes omitir las llaves `{ }` si el bloque tiene una sola línea, la guía oficial de estilo de Google recomienda **usar siempre llaves**:\n• Evita confusiones al agregar nuevas líneas más adelante.\n• Hace que el código sea uniforme y visualmente predecible.",
        "codeSnippet": "fun main() {\n    val bateria = 12\n    \n    if (bateria < 15) {\n        println(\"Advertencia: Batería baja ($bateria%).\")\n        println(\"Conecta tu cargador pronto.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Advertencia: Batería baja (12%).\nConecta tu cargador pronto.",
        "byteTip": "Mantén las condiciones cortas y con nombres de variables claros para que se lean como lenguaje natural.",
        "pitfallTip": "No escribas if (esActivo == true). Simplemente escribe if (esActivo). Es más limpio y profesional.",
        "keyPoints": [
          "Usa siempre llaves { } para delimitar los bloques condicionales.",
          "Las variables booleanas no necesitan compararse explícitamente con == true.",
          "La claridad del código previene bugs al momento de dar mantenimiento."
        ]
      }
    ]
  },
  "kotlin-u04-l02": {
    "id": "kt-th-u04-l02",
    "lessonId": "kotlin-u04-l02",
    "pathId": "kotlin",
    "unitId": 4,
    "levelId": 2,
    "title": "2. Alternativas con if y else",
    "subtitle": "Maneja alternativas completas: qué hacer cuando una condición se cumple y qué hacer cuando no.",
    "estimatedMinutes": 8,
    "analogy": "Es como un semáforo peatonal: Si la luz está verde, cruzas la calle con seguridad; si no (luz roja), te detienes en la acera a esperar.",
    "video": {
      "title": "Estructuras de Control: If Else y When en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "40:15",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Bifurcaciones, condicionales compuestas y la potencia de when como expresión."
    },
    "sections": [
      {
        "title": "Bifurcación completa con if y else",
        "explanation": "Muchas veces no solo quieres hacer algo cuando una condición se cumple, sino que necesitas una **acción alternativa** cuando no se cumple.\n\nPara eso usamos la combinación **`if - else`**:\n• Si la condición es `true`, se ejecuta el bloque del `if`.\n• Si la condición es `false`, se ejecuta automáticamente el bloque del **`else`** (que significa \"de lo contrario\").\n• **Jamás se ejecutarán ambos bloques al mismo tiempo**; el programa elige exactamente uno de los dos caminos.",
        "codeSnippet": "fun main() {\n    val edad = 16\n    println(\"Verificando acceso para edad: $edad años...\")\n\n    if (edad >= 18) {\n        println(\"Acceso concedido: Eres mayor de edad.\")\n    } else {\n        println(\"Acceso restringido: Debes tener al menos 18 años.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Verificando acceso para edad: 16 años...\nAcceso restringido: Debes tener al menos 18 años.",
        "byteTip": "else no lleva condición entre paréntesis porque cubre automáticamente todos los casos que no cumplieron el if.",
        "pitfallTip": "Cuidado con olvidar el else cuando una acción alternativa es requerida; de lo contrario el usuario quedará sin respuesta.",
        "keyPoints": [
          "if-else garantiza que exactamente uno de los dos bloques se ejecutará.",
          "else maneja el camino por descarte cuando la condición resulta false.",
          "Es el pilar fundamental para validaciones de seguridad y accesos."
        ]
      },
      {
        "title": "Validación de credenciales y estados",
        "explanation": "Un caso clásico de `if - else` en Android es validar si el usuario completó un formulario antes de enviarlo:",
        "codeSnippet": "fun main() {\n    val correoIngresado = \"usuario@correo.com\"\n    val campoVacio = correoIngresado.isEmpty()\n\n    if (campoVacio) {\n        println(\"Error: Por favor escribe tu correo electrónico.\")\n    } else {\n        println(\"Correo recibido correctamente. Enviando código a $correoIngresado...\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Correo recibido correctamente. Enviando código a usuario@correo.com...",
        "byteTip": ".isEmpty() es un método nativo de String que devuelve true si el texto no contiene ningún carácter.",
        "pitfallTip": "No uses if anidados cuando un simple if-else resuelve el problema con mucha más limpieza visual.",
        "keyPoints": [
          "Las validaciones de interfaz usan if-else para dar retroalimentación inmediata.",
          "Siempre informa al usuario qué salió mal en la rama else.",
          "Un buen diseño siempre contempla tanto el caso de éxito como el de fallo."
        ]
      }
    ]
  },
  "kotlin-u04-l03": {
    "id": "kt-th-u04-l03",
    "lessonId": "kotlin-u04-l03",
    "pathId": "kotlin",
    "unitId": 4,
    "levelId": 3,
    "title": "3. Varias posibilidades con else if",
    "subtitle": "Evalúa múltiples escenarios en cascada con la cláusula else if.",
    "estimatedMinutes": 8,
    "analogy": "Es como la clasificación por tallas de ropa: Si mides menos de 1.60 m eres Talla S; si no, pero mides menos de 1.75 m eres Talla M; si no, pero mides menos de 1.90 m eres Talla L; de lo contrario eres Talla XL.",
    "video": {
      "title": "Estructuras de Control: If Else y When en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "40:15",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Bifurcaciones, condicionales compuestas y la potencia de when como expresión."
    },
    "sections": [
      {
        "title": "Condiciones múltiples en cascada con else if",
        "explanation": "Cuando tienes más de dos posibilidades mutuamente excluyentes, dos caminos (`if` y `else`) no bastan. Para evaluar varias alternativas en orden, encadenamos condiciones con **`else if`**.\n\n¿Cómo funciona la cascada?\n1. Kotlin evalúa la primera condición del `if`. Si es `true`, ejecuta ese bloque y **salta todo el resto**.\n2. Si es `false`, pasa a evaluar el primer `else if`.\n3. Puede haber tantos `else if` como necesites.\n4. Si ninguna condición previa se cumplió, se ejecuta el `else` final como respaldo.",
        "codeSnippet": "fun main() {\n    val calificacion = 84\n\n    if (calificacion >= 90) {\n        println(\"Rendimiento: Sobresaliente (A)\")\n    } else if (calificacion >= 80) {\n        println(\"Rendimiento: Muy Bueno (B)\")\n    } else if (calificacion >= 70) {\n        println(\"Rendimiento: Bueno (C)\")\n    } else {\n        println(\"Rendimiento: Necesita Mejorar (D)\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Rendimiento: Muy Bueno (B)",
        "byteTip": "Ordena tus condiciones de la más restrictiva a la más general para que la cascada se active en el momento exacto.",
        "pitfallTip": "Si colocas una condición muy amplia al inicio (por ejemplo calificacion >= 0), absorberá todos los casos y los else if de abajo nunca correrán.",
        "keyPoints": [
          "else if evalúa condiciones adicionales de forma secuencial.",
          "En el momento en que una condición es true, las demás se ignoran.",
          "El bloque else final actúa como red de seguridad obligatoria o recomendada."
        ]
      },
      {
        "title": "Estados de conexión en apps móviles",
        "explanation": "En Android, saber el tipo de conexión a internet para decidir la calidad de un video es un escenario perfecto para `else if`:",
        "codeSnippet": "fun main() {\n    val tipoRed = \"WIFI\"\n\n    if (tipoRed == \"WIFI\") {\n        println(\"Reproduciendo video en calidad 4K Ultra HD.\")\n    } else if (tipoRed == \"4G\" || tipoRed == \"5G\") {\n        println(\"Reproduciendo video en calidad Full HD (ahorro de datos móviles).\")\n    } else {\n        println(\"Conexión limitada: modo solo audio.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Reproduciendo video en calidad 4K Ultra HD.",
        "byteTip": "Observa cómo puedes usar operadores lógicos como || dentro de un else if para cubrir varias opciones equivalentes.",
        "pitfallTip": "Si tienes más de 4 o 5 ramas else if, tu código puede volverse difícil de leer. En ese caso, la estructura when de Kotlin es la solución superior.",
        "keyPoints": [
          "else if adapta el comportamiento a escenarios variables del entorno.",
          "Combinar operadores lógicos dentro de las condiciones ahorra ramas repetitivas.",
          "Cuando hay muchas opciones, considera migrar a when."
        ]
      }
    ]
  },
  "kotlin-u04-l04": {
    "id": "kt-th-u04-l04",
    "lessonId": "kotlin-u04-l04",
    "pathId": "kotlin",
    "unitId": 4,
    "levelId": 4,
    "title": "4. Selección de casos con when",
    "subtitle": "Descubre when, la versión moderna, limpia y superpoderosa del switch en Kotlin.",
    "estimatedMinutes": 8,
    "analogy": "Es como el menú de selección de un restaurante: pides la opción 1 (hamburguesa), la opción 2 (pizza) o la opción 3 (ensalada). El mesero va directamente a tu elección sin tener que revisar una por una las que no pediste.",
    "video": {
      "title": "Estructuras de Control: If Else y When en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "40:15",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Bifurcaciones, condicionales compuestas y la potencia de when como expresión."
    },
    "sections": [
      {
        "title": "La estructura de control when",
        "explanation": "En Kotlin existe una alternativa moderna y mucho más elegante que el tradicional `switch` de otros lenguajes: la palabra clave **`when`**.\n\nCon `when` comparas una variable contra múltiples valores posibles usando una flecha (**`->`**):\n• Cada rama define el valor a comparar y la acción a ejecutar.\n• No necesitas la molesta instrucción `break` de Java o C; Kotlin se detiene automáticamente al encontrar la primera coincidencia.\n• La rama **`else`** cubre cualquier caso no contemplado explícitamente.",
        "codeSnippet": "fun main() {\n    val codigoRespuestaHttp = 200\n\n    when (codigoRespuestaHttp) {\n        200 -> println(\"Éxito: Los datos se cargaron correctamente.\")\n        404 -> println(\"Error: Página o recurso no encontrado.\")\n        500 -> println(\"Error: Falla interna en el servidor.\")\n        else -> println(\"Código de estado no reconocido: $codigoRespuestaHttp\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Éxito: Los datos se cargaron correctamente.",
        "byteTip": "when es una de las características más queridas de Kotlin porque elimina por completo el código repetitivo.",
        "pitfallTip": "Olvidar la rama else cuando when se usa como expresión provocará un error de \"when expression must be exhaustive\".",
        "keyPoints": [
          "when reemplaza con creces al switch tradicional con una sintaxis limpia con flechas (->).",
          "No requiere break: ejecuta solo la rama coincidente y sale.",
          "La rama else asegura que ningún caso quede en el limbo."
        ]
      },
      {
        "title": "Múltiples opciones y tipos variados en when",
        "explanation": "Una ventaja increíble de `when` es que puedes agrupar varias opciones en una misma rama separándolas con comas:",
        "codeSnippet": "fun main() {\n    val diaSemana = \"SÁBADO\"\n\n    when (diaSemana) {\n        \"LUNES\", \"MARTES\", \"MIÉRCOLES\", \"JUEVES\", \"VIERNES\" -> {\n            println(\"Día laboral: Alarma programada a las 07:00 AM.\")\n        }\n        \"SÁBADO\", \"DOMINGO\" -> {\n            println(\"Fin de semana: Alarma desactivada. ¡A descansar!\")\n        }\n        else -> println(\"Día inválido.\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Fin de semana: Alarma desactivada. ¡A descansar!",
        "byteTip": "Si una rama necesita varias líneas de código, enciérralas entre llaves { } a la derecha de la flecha ->.",
        "pitfallTip": "Asegúrate de escribir los textos con la misma capitalización o normalízalos antes con .uppercase().",
        "keyPoints": [
          "Agrupar casos con comas hace las ramas compactas y legibles.",
          "Las ramas pueden contener una sola instrucción o un bloque entero con { }.",
          "Es el estándar de la industria en Android para manejar estados de la interfaz."
        ]
      }
    ]
  },
  "kotlin-u04-l05": {
    "id": "kt-th-u04-l05",
    "lessonId": "kotlin-u04-l05",
    "pathId": "kotlin",
    "unitId": 4,
    "levelId": 5,
    "title": "5. Condiciones combinadas e intervalos",
    "subtitle": "Aprende a verificar rangos numéricos y condiciones flexibles dentro de when.",
    "estimatedMinutes": 8,
    "analogy": "Es como la clasificación de edades en una clínica: de 0 a 12 años vas a Pediatría, de 13 a 17 vas a Medicina Juvenil y de 18 en adelante vas a Medicina General.",
    "video": {
      "title": "Estructuras de Control: If Else y When en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "40:15",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Bifurcaciones, condicionales compuestas y la potencia de when como expresión."
    },
    "sections": [
      {
        "title": "Uso de in con rangos dentro de when",
        "explanation": "En Kotlin puedes usar la palabra clave **`in`** dentro de un `when` para comprobar si un número se encuentra dentro de un intervalo numérico (`1..10`):\n\n• `in 0..12` -> Si el valor está entre 0 y 12 inclusive.\n• `!in 1..100` -> Si el valor **NO** está dentro de ese rango.\n• `is String` -> Si el dato pertenece a un tipo de objeto específico.\n\nEsta flexibilidad hace que evaluar rangos sea increíblemente conciso y natural.",
        "codeSnippet": "fun main() {\n    val edad = 15\n\n    when (edad) {\n        in 0..12 -> println(\"Categoría: Infantil\")\n        in 13..17 -> println(\"Categoría: Adolescente\")\n        in 18..64 -> println(\"Categoría: Adulto\")\n        in 65..120 -> println(\"Categoría: Adulto Mayor\")\n        else -> println(\"Edad fuera de rango biológico\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Categoría: Adolescente",
        "byteTip": "La sintaxis 0..12 crea un rango cerrado que incluye tanto al 0 como al 12.",
        "pitfallTip": "Cuidado con solapar rangos (como 0..12 y 12..18). Kotlin elegirá la primera rama que coincida, por lo que el 12 caería en la primera.",
        "keyPoints": [
          "in rango..rango permite evaluar intervalos continuos sin escribir comparaciones dobles.",
          "!in verifica que un número quede fuera del rango.",
          "when evalúa las ramas en orden de arriba hacia abajo."
        ]
      },
      {
        "title": "when sin argumento como reemplazo de if-else complejos",
        "explanation": "En Kotlin también puedes usar `when` **sin pasarle ninguna variable entre paréntesis**. En este modo, cada rama evalúa una condición booleana completa:",
        "codeSnippet": "fun main() {\n    val balance = 150.0\n    val tieneTarjetaCredito = false\n\n    when {\n        balance > 500.0 -> println(\"Nivel Financiero: Oro\")\n        balance > 100.0 && tieneTarjetaCredito -> println(\"Nivel Financiero: Plata con Crédito\")\n        balance > 100.0 -> println(\"Nivel Financiero: Plata Estándar\")\n        else -> println(\"Nivel Financiero: Básico\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Nivel Financiero: Plata Estándar",
        "byteTip": "when sin argumento es la forma más limpia de Kotlin para sustituir cadenas largas de if - else if con múltiples variables distintas.",
        "pitfallTip": "No abuses del when sin argumento si todas las ramas evalúan la misma variable; en ese caso pasa la variable directamente.",
        "keyPoints": [
          "when sin argumento actúa como un superbloque if-else limpio.",
          "Cada rama debe resolverse a una expresión booleana.",
          "Mantiene el código organizado cuando interactúan varias variables independientes."
        ]
      }
    ]
  },
  "kotlin-u04-l06": {
    "id": "kt-th-u04-l06",
    "lessonId": "kotlin-u04-l06",
    "pathId": "kotlin",
    "unitId": 4,
    "levelId": 6,
    "title": "6. if y when como expresiones",
    "subtitle": "Aprende cómo if y when pueden devolver un valor directamente para asignarlo a una variable.",
    "estimatedMinutes": 8,
    "analogy": "Imagina una máquina expendedora: introduces una moneda (condición) y la máquina te expulsa directamente una botella de agua que guardas en tu mochila (asignación a variable).",
    "video": {
      "title": "Estructuras de Control: If Else y When en Kotlin",
      "channel": "MoureDev by Brais Moure",
      "duration": "40:15",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Bifurcaciones, condicionales compuestas y la potencia de when como expresión."
    },
    "sections": [
      {
        "title": "if y when como expresiones con retorno",
        "explanation": "En muchos lenguajes tradicionales, `if` es solo una sentencia de control: no devuelve nada y estás obligado a declarar variables mutables vacías antes para luego rellenarlas adentro.\n\nEn Kotlin, tanto **`if`** como **`when`** son **expresiones**: ¡pueden producir y devolver un valor directamente!\n\nEsto te permite inicializar variables inmutables (`val`) de un solo golpe según una condición:\n`val mensaje = if (edad >= 18) \"Mayor\" else \"Menor\"`",
        "codeSnippet": "fun main() {\n    val temperatura = 28\n\n    // Asignamos directamente el resultado del if a una variable inmutable val\n    val sugerenciaVestimenta = if (temperatura > 25) {\n        \"Usa ropa ligera y mantente hidratado.\"\n    } else {\n        \"Lleva un abrigo ligero.\"\n    }\n\n    println(\"Pronóstico: $temperatura°C -> $sugerenciaVestimenta\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Pronóstico: 28°C -> Usa ropa ligera y mantente hidratado.",
        "byteTip": "La última línea de cada bloque dentro del if o when se convierte automáticamente en el valor retornado.",
        "pitfallTip": "Cuando usas if como expresión, la rama else es obligatoria. El compilador necesita garantizar que la variable siempre reciba un valor.",
        "keyPoints": [
          "En Kotlin, if y when son expresiones que pueden devolver un valor.",
          "Permiten mantener variables inmutables con val sin recurrir a var.",
          "La última línea de cada rama determina el valor de retorno."
        ]
      },
      {
        "title": "when como expresión exhaustiva",
        "explanation": "Al igual que `if`, `when` puede devolver un resultado para inicializar una constante. Es la forma predilecta en Android para traducir códigos de estado a textos legibles:",
        "codeSnippet": "fun main() {\n    val estadoPedido = \"EN_CAMINO\"\n\n    val mensajeUsuario = when (estadoPedido) {\n        \"RECIBIDO\" -> \"Estamos preparando tu paquete en bodega.\"\n        \"EN_CAMINO\" -> \"El repartidor está cerca de tu domicilio.\"\n        \"ENTREGADO\" -> \"¡Paquete entregado con éxito!\"\n        else -> \"Estado desconocido. Contacta a soporte.\"\n    }\n\n    println(\"Actualización de tu compra: $mensajeUsuario\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Actualización de tu compra: El repartidor está cerca de tu domicilio.",
        "byteTip": "Usar when como expresión garantiza que no olvides ningún estado posible del sistema.",
        "pitfallTip": "Asegúrate de que todas las ramas retornen el mismo tipo de dato (por ejemplo, todas String). De lo contrario, Kotlin inferirá el tipo más amplio Any.",
        "keyPoints": [
          "when como expresión es un estándar de oro en arquitectura Android.",
          "Obliga a que la evaluación sea exhaustiva (cubra todos los casos con else).",
          "Elimina la necesidad de declarar variables vacías antes de evaluar condiciones."
        ]
      }
    ]
  }
};
