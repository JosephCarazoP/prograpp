// Módulo de teoría enriquecida para Kotlin: Unidades 4, 5 y 6
// Redactado en español latinoamericano (es-419) con tono claro, amigable y pedagógico
// Siguiendo los estándares oficiales de Android Developers (https://developer.android.com/kotlin/learn)

export const KOTLIN_THEORY_U04_U06 = {
  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 4: ESTRUCTURAS DE DECISIÓN
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u04-l01': {
    subtitle: 'Aprende a ejecutar código condicionalmente solo cuando una regla se cumple.',
    analogy: 'Es como el sensor automático de una puerta de tienda: "Si una persona se acerca (condición verdadera), abre la puerta; de lo contrario, no hagas nada y quédate cerrada".',
    sections: [
      {
        title: 'La sentencia condicional if',
        explanation: `Hasta ahora, nuestros programas ejecutaban todas las líneas de arriba hacia abajo sin detenerse. Pero las aplicaciones reales necesitan tomar caminos distintos según lo que ocurra:
• Si la batería está por debajo del 15%, activar modo de ahorro.
• Si el carrito supera los $50, aplicar envío gratis.
• Si el usuario presionó "Guardar", escribir los datos en memoria.

En Kotlin, la herramienta básica para esto es la sentencia **\`if\`** (que en inglés significa "si condicional"). Su estructura es:
\`if (condición) {\`
\`    // Código que solo se ejecuta si la condición es true\`
\`}\``,
        codeSnippet: `fun main() {\n    val totalCompra = 75.0\n    println("Total de tu compra: $$totalCompra")\n\n    // La condición se evalúa como true o false\n    if (totalCompra >= 50.0) {\n        println("¡Felicidades! Calificas para envío gratis a domicilio.")\n    }\n\n    println("Gracias por tu visita.")\n}`,
        outputSnippet: `Total de tu compra: $75.0\n¡Felicidades! Calificas para envío gratis a domicilio.\nGracias por tu visita.`,
        byteTip: 'La condición dentro de los paréntesis ( ) debe evaluarse obligatoriamente a un tipo Boolean (true o false).',
        pitfallTip: 'No pongas punto y coma ; después del paréntesis del if. Escribir if (x > 5); anula el bloque condicional por completo.',
        keyPoints: [
          'if permite bifurcar el flujo de ejecución del programa.',
          'El bloque entre llaves { } solo corre cuando la condición es true.',
          'Si la condición es false, el programa simplemente salta ese bloque y continúa.'
        ]
      },
      {
        title: 'Buenas prácticas y legibilidad en condicionales',
        explanation: `Aunque en Kotlin puedes omitir las llaves \`{ }\` si el bloque tiene una sola línea, la guía oficial de estilo de Google recomienda **usar siempre llaves**:
• Evita confusiones al agregar nuevas líneas más adelante.
• Hace que el código sea uniforme y visualmente predecible.`,
        codeSnippet: `fun main() {\n    val bateria = 12\n    \n    if (bateria < 15) {\n        println("Advertencia: Batería baja ($bateria%).")\n        println("Conecta tu cargador pronto.")\n    }\n}`,
        outputSnippet: `Advertencia: Batería baja (12%).\nConecta tu cargador pronto.`,
        byteTip: 'Mantén las condiciones cortas y con nombres de variables claros para que se lean como lenguaje natural.',
        pitfallTip: 'No escribas if (esActivo == true). Simplemente escribe if (esActivo). Es más limpio y profesional.',
        keyPoints: [
          'Usa siempre llaves { } para delimitar los bloques condicionales.',
          'Las variables booleanas no necesitan compararse explícitamente con == true.',
          'La claridad del código previene bugs al momento de dar mantenimiento.'
        ]
      }
    ]
  },

  'kotlin-u04-l02': {
    subtitle: 'Maneja alternativas completas: qué hacer cuando una condición se cumple y qué hacer cuando no.',
    analogy: 'Es como un semáforo peatonal: Si la luz está verde, cruzas la calle con seguridad; si no (luz roja), te detienes en la acera a esperar.',
    sections: [
      {
        title: 'Bifurcación completa con if y else',
        explanation: `Muchas veces no solo quieres hacer algo cuando una condición se cumple, sino que necesitas una **acción alternativa** cuando no se cumple.

Para eso usamos la combinación **\`if - else\`**:
• Si la condición es \`true\`, se ejecuta el bloque del \`if\`.
• Si la condición es \`false\`, se ejecuta automáticamente el bloque del **\`else\`** (que significa "de lo contrario").
• **Jamás se ejecutarán ambos bloques al mismo tiempo**; el programa elige exactamente uno de los dos caminos.`,
        codeSnippet: `fun main() {\n    val edad = 16\n    println("Verificando acceso para edad: $edad años...")\n\n    if (edad >= 18) {\n        println("Acceso concedido: Eres mayor de edad.")\n    } else {\n        println("Acceso restringido: Debes tener al menos 18 años.")\n    }\n}`,
        outputSnippet: `Verificando acceso para edad: 16 años...\nAcceso restringido: Debes tener al menos 18 años.`,
        byteTip: 'else no lleva condición entre paréntesis porque cubre automáticamente todos los casos que no cumplieron el if.',
        pitfallTip: 'Cuidado con olvidar el else cuando una acción alternativa es requerida; de lo contrario el usuario quedará sin respuesta.',
        keyPoints: [
          'if-else garantiza que exactamente uno de los dos bloques se ejecutará.',
          'else maneja el camino por descarte cuando la condición resulta false.',
          'Es el pilar fundamental para validaciones de seguridad y accesos.'
        ]
      },
      {
        title: 'Validación de credenciales y estados',
        explanation: `Un caso clásico de \`if - else\` en Android es validar si el usuario completó un formulario antes de enviarlo:`,
        codeSnippet: `fun main() {\n    val correoIngresado = "usuario@correo.com"\n    val campoVacio = correoIngresado.isEmpty()\n\n    if (campoVacio) {\n        println("Error: Por favor escribe tu correo electrónico.")\n    } else {\n        println("Correo recibido correctamente. Enviando código a $correoIngresado...")\n    }\n}`,
        outputSnippet: `Correo recibido correctamente. Enviando código a usuario@correo.com...`,
        byteTip: '.isEmpty() es un método nativo de String que devuelve true si el texto no contiene ningún carácter.',
        pitfallTip: 'No uses if anidados cuando un simple if-else resuelve el problema con mucha más limpieza visual.',
        keyPoints: [
          'Las validaciones de interfaz usan if-else para dar retroalimentación inmediata.',
          'Siempre informa al usuario qué salió mal en la rama else.',
          'Un buen diseño siempre contempla tanto el caso de éxito como el de fallo.'
        ]
      }
    ]
  },

  'kotlin-u04-l03': {
    subtitle: 'Evalúa múltiples escenarios en cascada con la cláusula else if.',
    analogy: 'Es como la clasificación por tallas de ropa: Si mides menos de 1.60 m eres Talla S; si no, pero mides menos de 1.75 m eres Talla M; si no, pero mides menos de 1.90 m eres Talla L; de lo contrario eres Talla XL.',
    sections: [
      {
        title: 'Condiciones múltiples en cascada con else if',
        explanation: `Cuando tienes más de dos posibilidades mutuamente excluyentes, dos caminos (\`if\` y \`else\`) no bastan. Para evaluar varias alternativas en orden, encadenamos condiciones con **\`else if\`**.

¿Cómo funciona la cascada?
1. Kotlin evalúa la primera condición del \`if\`. Si es \`true\`, ejecuta ese bloque y **salta todo el resto**.
2. Si es \`false\`, pasa a evaluar el primer \`else if\`.
3. Puede haber tantos \`else if\` como necesites.
4. Si ninguna condición previa se cumplió, se ejecuta el \`else\` final como respaldo.`,
        codeSnippet: `fun main() {\n    val calificacion = 84\n\n    if (calificacion >= 90) {\n        println("Rendimiento: Sobresaliente (A)")\n    } else if (calificacion >= 80) {\n        println("Rendimiento: Muy Bueno (B)")\n    } else if (calificacion >= 70) {\n        println("Rendimiento: Bueno (C)")\n    } else {\n        println("Rendimiento: Necesita Mejorar (D)")\n    }\n}`,
        outputSnippet: `Rendimiento: Muy Bueno (B)`,
        byteTip: 'Ordena tus condiciones de la más restrictiva a la más general para que la cascada se active en el momento exacto.',
        pitfallTip: 'Si colocas una condición muy amplia al inicio (por ejemplo calificacion >= 0), absorberá todos los casos y los else if de abajo nunca correrán.',
        keyPoints: [
          'else if evalúa condiciones adicionales de forma secuencial.',
          'En el momento en que una condición es true, las demás se ignoran.',
          'El bloque else final actúa como red de seguridad obligatoria o recomendada.'
        ]
      },
      {
        title: 'Estados de conexión en apps móviles',
        explanation: `En Android, saber el tipo de conexión a internet para decidir la calidad de un video es un escenario perfecto para \`else if\`:`,
        codeSnippet: `fun main() {\n    val tipoRed = "WIFI"\n\n    if (tipoRed == "WIFI") {\n        println("Reproduciendo video en calidad 4K Ultra HD.")\n    } else if (tipoRed == "4G" || tipoRed == "5G") {\n        println("Reproduciendo video en calidad Full HD (ahorro de datos móviles).")\n    } else {\n        println("Conexión limitada: modo solo audio.")\n    }\n}`,
        outputSnippet: `Reproduciendo video en calidad 4K Ultra HD.`,
        byteTip: 'Observa cómo puedes usar operadores lógicos como || dentro de un else if para cubrir varias opciones equivalentes.',
        pitfallTip: 'Si tienes más de 4 o 5 ramas else if, tu código puede volverse difícil de leer. En ese caso, la estructura when de Kotlin es la solución superior.',
        keyPoints: [
          'else if adapta el comportamiento a escenarios variables del entorno.',
          'Combinar operadores lógicos dentro de las condiciones ahorra ramas repetitivas.',
          'Cuando hay muchas opciones, considera migrar a when.'
        ]
      }
    ]
  },

  'kotlin-u04-l04': {
    subtitle: 'Descubre when, la versión moderna, limpia y superpoderosa del switch en Kotlin.',
    analogy: 'Es como el menú de selección de un restaurante: pides la opción 1 (hamburguesa), la opción 2 (pizza) o la opción 3 (ensalada). El mesero va directamente a tu elección sin tener que revisar una por una las que no pediste.',
    sections: [
      {
        title: 'La estructura de control when',
        explanation: `En Kotlin existe una alternativa moderna y mucho más elegante que el tradicional \`switch\` de otros lenguajes: la palabra clave **\`when\`**.

Con \`when\` comparas una variable contra múltiples valores posibles usando una flecha (**\`->\`**):
• Cada rama define el valor a comparar y la acción a ejecutar.
• No necesitas la molesta instrucción \`break\` de Java o C; Kotlin se detiene automáticamente al encontrar la primera coincidencia.
• La rama **\`else\`** cubre cualquier caso no contemplado explícitamente.`,
        codeSnippet: `fun main() {\n    val codigoRespuestaHttp = 200\n\n    when (codigoRespuestaHttp) {\n        200 -> println("Éxito: Los datos se cargaron correctamente.")\n        404 -> println("Error: Página o recurso no encontrado.")\n        500 -> println("Error: Falla interna en el servidor.")\n        else -> println("Código de estado no reconocido: $codigoRespuestaHttp")\n    }\n}`,
        outputSnippet: `Éxito: Los datos se cargaron correctamente.`,
        byteTip: 'when es una de las características más queridas de Kotlin porque elimina por completo el código repetitivo.',
        pitfallTip: 'Olvidar la rama else cuando when se usa como expresión provocará un error de "when expression must be exhaustive".',
        keyPoints: [
          'when reemplaza con creces al switch tradicional con una sintaxis limpia con flechas (->).',
          'No requiere break: ejecuta solo la rama coincidente y sale.',
          'La rama else asegura que ningún caso quede en el limbo.'
        ]
      },
      {
        title: 'Múltiples opciones y tipos variados en when',
        explanation: `Una ventaja increíble de \`when\` es que puedes agrupar varias opciones en una misma rama separándolas con comas:`,
        codeSnippet: `fun main() {\n    val diaSemana = "SÁBADO"\n\n    when (diaSemana) {\n        "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES" -> {\n            println("Día laboral: Alarma programada a las 07:00 AM.")\n        }\n        "SÁBADO", "DOMINGO" -> {\n            println("Fin de semana: Alarma desactivada. ¡A descansar!")\n        }\n        else -> println("Día inválido.")\n    }\n}`,
        outputSnippet: `Fin de semana: Alarma desactivada. ¡A descansar!`,
        byteTip: 'Si una rama necesita varias líneas de código, enciérralas entre llaves { } a la derecha de la flecha ->.',
        pitfallTip: 'Asegúrate de escribir los textos con la misma capitalización o normalízalos antes con .uppercase().',
        keyPoints: [
          'Agrupar casos con comas hace las ramas compactas y legibles.',
          'Las ramas pueden contener una sola instrucción o un bloque entero con { }.',
          'Es el estándar de la industria en Android para manejar estados de la interfaz.'
        ]
      }
    ]
  },

  'kotlin-u04-l05': {
    subtitle: 'Aprende a verificar rangos numéricos y condiciones flexibles dentro de when.',
    analogy: 'Es como la clasificación de edades en una clínica: de 0 a 12 años vas a Pediatría, de 13 a 17 vas a Medicina Juvenil y de 18 en adelante vas a Medicina General.',
    sections: [
      {
        title: 'Uso de in con rangos dentro de when',
        explanation: `En Kotlin puedes usar la palabra clave **\`in\`** dentro de un \`when\` para comprobar si un número se encuentra dentro de un intervalo numérico (\`1..10\`):

• \`in 0..12\` -> Si el valor está entre 0 y 12 inclusive.
• \`!in 1..100\` -> Si el valor **NO** está dentro de ese rango.
• \`is String\` -> Si el dato pertenece a un tipo de objeto específico.

Esta flexibilidad hace que evaluar rangos sea increíblemente conciso y natural.`,
        codeSnippet: `fun main() {\n    val edad = 15\n\n    when (edad) {\n        in 0..12 -> println("Categoría: Infantil")\n        in 13..17 -> println("Categoría: Adolescente")\n        in 18..64 -> println("Categoría: Adulto")\n        in 65..120 -> println("Categoría: Adulto Mayor")\n        else -> println("Edad fuera de rango biológico")\n    }\n}`,
        outputSnippet: `Categoría: Adolescente`,
        byteTip: 'La sintaxis 0..12 crea un rango cerrado que incluye tanto al 0 como al 12.',
        pitfallTip: 'Cuidado con solapar rangos (como 0..12 y 12..18). Kotlin elegirá la primera rama que coincida, por lo que el 12 caería en la primera.',
        keyPoints: [
          'in rango..rango permite evaluar intervalos continuos sin escribir comparaciones dobles.',
          '!in verifica que un número quede fuera del rango.',
          'when evalúa las ramas en orden de arriba hacia abajo.'
        ]
      },
      {
        title: 'when sin argumento como reemplazo de if-else complejos',
        explanation: `En Kotlin también puedes usar \`when\` **sin pasarle ninguna variable entre paréntesis**. En este modo, cada rama evalúa una condición booleana completa:`,
        codeSnippet: `fun main() {\n    val balance = 150.0\n    val tieneTarjetaCredito = false\n\n    when {\n        balance > 500.0 -> println("Nivel Financiero: Oro")\n        balance > 100.0 && tieneTarjetaCredito -> println("Nivel Financiero: Plata con Crédito")\n        balance > 100.0 -> println("Nivel Financiero: Plata Estándar")\n        else -> println("Nivel Financiero: Básico")\n    }\n}`,
        outputSnippet: `Nivel Financiero: Plata Estándar`,
        byteTip: 'when sin argumento es la forma más limpia de Kotlin para sustituir cadenas largas de if - else if con múltiples variables distintas.',
        pitfallTip: 'No abuses del when sin argumento si todas las ramas evalúan la misma variable; en ese caso pasa la variable directamente.',
        keyPoints: [
          'when sin argumento actúa como un superbloque if-else limpio.',
          'Cada rama debe resolverse a una expresión booleana.',
          'Mantiene el código organizado cuando interactúan varias variables independientes.'
        ]
      }
    ]
  },

  'kotlin-u04-l06': {
    subtitle: 'Aprende cómo if y when pueden devolver un valor directamente para asignarlo a una variable.',
    analogy: 'Imagina una máquina expendedora: introduces una moneda (condición) y la máquina te expulsa directamente una botella de agua que guardas en tu mochila (asignación a variable).',
    sections: [
      {
        title: 'if y when como expresiones con retorno',
        explanation: `En muchos lenguajes tradicionales, \`if\` es solo una sentencia de control: no devuelve nada y estás obligado a declarar variables mutables vacías antes para luego rellenarlas adentro.

En Kotlin, tanto **\`if\`** como **\`when\`** son **expresiones**: ¡pueden producir y devolver un valor directamente!

Esto te permite inicializar variables inmutables (\`val\`) de un solo golpe según una condición:
\`val mensaje = if (edad >= 18) "Mayor" else "Menor"\``,
        codeSnippet: `fun main() {\n    val temperatura = 28\n\n    // Asignamos directamente el resultado del if a una variable inmutable val\n    val sugerenciaVestimenta = if (temperatura > 25) {\n        "Usa ropa ligera y mantente hidratado."\n    } else {\n        "Lleva un abrigo ligero."\n    }\n\n    println("Pronóstico: $temperatura°C -> $sugerenciaVestimenta")\n}`,
        outputSnippet: `Pronóstico: 28°C -> Usa ropa ligera y mantente hidratado.`,
        byteTip: 'La última línea de cada bloque dentro del if o when se convierte automáticamente en el valor retornado.',
        pitfallTip: 'Cuando usas if como expresión, la rama else es obligatoria. El compilador necesita garantizar que la variable siempre reciba un valor.',
        keyPoints: [
          'En Kotlin, if y when son expresiones que pueden devolver un valor.',
          'Permiten mantener variables inmutables con val sin recurrir a var.',
          'La última línea de cada rama determina el valor de retorno.'
        ]
      },
      {
        title: 'when como expresión exhaustiva',
        explanation: `Al igual que \`if\`, \`when\` puede devolver un resultado para inicializar una constante. Es la forma predilecta en Android para traducir códigos de estado a textos legibles:`,
        codeSnippet: `fun main() {\n    val estadoPedido = "EN_CAMINO"\n\n    val mensajeUsuario = when (estadoPedido) {\n        "RECIBIDO" -> "Estamos preparando tu paquete en bodega."\n        "EN_CAMINO" -> "El repartidor está cerca de tu domicilio."\n        "ENTREGADO" -> "¡Paquete entregado con éxito!"\n        else -> "Estado desconocido. Contacta a soporte."\n    }\n\n    println("Actualización de tu compra: $mensajeUsuario")\n}`,
        outputSnippet: `Actualización de tu compra: El repartidor está cerca de tu domicilio.`,
        byteTip: 'Usar when como expresión garantiza que no olvides ningún estado posible del sistema.',
        pitfallTip: 'Asegúrate de que todas las ramas retornen el mismo tipo de dato (por ejemplo, todas String). De lo contrario, Kotlin inferirá el tipo más amplio Any.',
        keyPoints: [
          'when como expresión es un estándar de oro en arquitectura Android.',
          'Obliga a que la evaluación sea exhaustiva (cubra todos los casos con else).',
          'Elimina la necesidad de declarar variables vacías antes de evaluar condiciones.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 5: ESTRUCTURAS DE REPETICIÓN
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u05-l01': {
    subtitle: 'Automatiza tareas repetitivas con el bucle for sobre secuencias y colecciones.',
    analogy: 'Es como pasar lista en un aula escolar: el profesor toma la lista y nombra en orden al estudiante 1, luego al 2, al 3, hasta llegar al último de la lista.',
    sections: [
      {
        title: 'El bucle for en Kotlin',
        explanation: `Imagina que necesitas imprimir los números del 1 al 100 o enviar un correo a 500 clientes. Escribir 500 líneas idénticas a mano sería absurdo e imposible de mantener.

Los **bucles** (*loops*) le indican a la computadora que repita un bloque de código tantas veces como sea necesario.

El bucle **\`for\`** en Kotlin se lee de forma muy intuitiva:
\`for (elemento in secuencia) {\`
\`    // Se ejecuta una vez por cada elemento\`
\`}\`

La forma más sencilla de crear una secuencia es con un **rango numérico**: \`1..5\` significa "los números del 1 al 5 inclusive".`,
        codeSnippet: `fun main() {\n    println("Iniciando cuenta regresiva de lanzamiento:")\n\n    // Itera desde el 1 hasta el 5 inclusive\n    for (segundo in 1..5) {\n        println("Segundo $segundo...")\n    }\n\n    println("¡Despegue exitoso!")\n}`,
        outputSnippet: `Iniciando cuenta regresiva de lanzamiento:\nSegundo 1...\nSegundo 2...\nSegundo 3...\nSegundo 4...\nSegundo 5...\n¡Despegue exitoso!`,
        byteTip: 'La variable declarada en el for (en este caso segundo) es de solo lectura (val) automáticamente dentro del bucle.',
        pitfallTip: 'El rango 1..5 incluye el número 5 final. Si quisieras excluir el último número, usarías 1 until 5.',
        keyPoints: [
          'for repite un bloque de instrucciones sobre un rango o colección.',
          '1..5 genera una secuencia cerrada que incluye ambos extremos.',
          'La variable de iteración cambia de valor automáticamente en cada vuelta.'
        ]
      },
      {
        title: 'Cálculos acumulados dentro de un for',
        explanation: `Uno de los usos más habituales del \`for\` es acumular totales o procesar series numéricas:`,
        codeSnippet: `fun main() {\n    var sumaTotal = 0\n\n    // Sumamos los primeros 5 números: 1 + 2 + 3 + 4 + 5\n    for (i in 1..5) {\n        sumaTotal += i\n    }\n\n    println("La suma de los números del 1 al 5 es: $sumaTotal")\n}`,
        outputSnippet: `La suma de los números del 1 al 5 es: 15`,
        byteTip: 'La variable de iteración suele llamarse i (por índice o iterador) en conteos genéricos.',
        pitfallTip: 'No reinicies tu acumulador dentro del for, porque se borraría en cada vuelta. Inicialízalo siempre antes de entrar al bucle.',
        keyPoints: [
          'Los acumuladores viven fuera del bucle y recogen el resultado de cada vuelta.',
          'for se ejecuta un número predeterminado y predecible de veces.',
          'Es el bucle más seguro porque garantiza terminar al agotarse el rango.'
        ]
      }
    ]
  },

  'kotlin-u05-l02': {
    subtitle: 'Domina los rangos avanzados: saltos personalizados con step y recorridos hacia atrás con downTo.',
    analogy: 'Subir una escalera de dos en dos escalones (step 2) o bajarla desde el décimo piso hasta la planta baja (downTo).',
    sections: [
      {
        title: 'Rangos con step, downTo y until',
        explanation: `Kotlin cuenta con funciones de lenguaje sumamente ricas y expresivas para controlar rangos:

• **\`until\` (Hasta pero sin incluir):** \`1 until 5\` recorre del 1 al 4 (ideal para índices de listas donde el tamaño máximo no se incluye).
• **\`downTo\` (Hacia atrás):** \`5 downTo 1\` cuenta en reversa: 5, 4, 3, 2, 1.
• **\`step\` (Paso / Salto):** \`1..10 step 2\` salta de 2 en 2: 1, 3, 5, 7, 9.`,
        codeSnippet: `fun main() {\n    // Conteo en reversa con downTo\n    print("Conteo regresivo: ")\n    for (i in 3 downTo 1) {\n        print("$i ")\n    }\n    println("¡Cero!")\n\n    // Saltos de 2 en 2 con step\n    print("Pares del 2 al 8 : ")\n    for (n in 2..8 step 2) {\n        print("$n ")\n    }\n    println()\n}`,
        outputSnippet: `Conteo regresivo: 3 2 1 ¡Cero!\nPares del 2 al 8 : 2 4 6 8`,
        byteTip: 'Puedes combinar downTo y step juntos: for (i in 10 downTo 0 step 2) cuenta pares hacia atrás.',
        pitfallTip: 'Escribir for (i in 5..1) NO funciona ni hace conteo regresivo; ese rango se evalúa vacío. Debes usar obligatoriamente downTo.',
        keyPoints: [
          'until excluye el límite superior.',
          'downTo permite hacer iteraciones descendentes.',
          'step define el incremento o decremento en cada paso.'
        ]
      },
      {
        title: 'Aplicación en tablas de multiplicar y horarios',
        explanation: `Mira qué sencillo y limpio es generar la tabla de multiplicar de un número usando rangos en Kotlin:`,
        codeSnippet: `fun main() {\n    val tabla = 7\n    println("=== TABLA DEL $tabla ===")\n    \n    for (multiplicador in 1..5) {\n        val resultado = tabla * multiplicador\n        println("$tabla x $multiplicador = $resultado")\n    }\n}`,
        outputSnippet: `=== TABLA DEL 7 ===\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35`,
        byteTip: 'Observa cómo la variable multiplicador toma valores ordenados del 1 al 5 en cada renglón.',
        pitfallTip: 'step debe ser siempre un número entero positivo mayor a cero (step 0 provocará una excepción).',
        keyPoints: [
          'Los rangos flexibles sustituyen la compleja sintaxis for (int i=0; i<n; i+=k) de otros lenguajes.',
          'El código se lee prácticamente como lenguaje natural en inglés.',
          'Optimiza la iteración sin desperdiciar recursos de memoria.'
        ]
      }
    ]
  },

  'kotlin-u05-l03': {
    subtitle: 'Aprende a usar bucles while y do-while cuando no sabes de antemano cuántas repeticiones necesitarás.',
    analogy: 'Es como inflar una llanta de bicicleta: sigues bombeando aire MIENTRAS (while) la presión sea insuficiente. No sabes exactamente cuántos bombazos tomará, te detienes cuando se cumple la condición.',
    sections: [
      {
        title: 'El bucle while: repetición basada en condiciones',
        explanation: `A diferencia del \`for\`, que sabe de antemano cuántos elementos hay en el rango, el bucle **\`while\`** se utiliza cuando **no sabemos exactamente cuántas veces se repetirá la acción**, solo sabemos la condición bajo la cual debe continuar.

Sintaxis de \`while\`:
\`while (condición) {\`
\`    // Se ejecuta mientras la condición sea true\`
\`}\`

La condición se evalúa **antes de entrar** a cada vuelta. Si la primera vez es \`false\`, el bucle no se ejecutará ni una sola vez.`,
        codeSnippet: `fun main() {\n    var energia = 3\n\n    // Continúa mientras la energía sea mayor a cero\n    while (energia > 0) {\n        println("Jugando nivel... Energía restante: $energia")\n        energia-- // Reducimos la energía para acercarnos al final\n    }\n\n    println("¡Te has quedado sin energía! Espera para recargar.")\n}`,
        outputSnippet: `Jugando nivel... Energía restante: 3\nJugando nivel... Energía restante: 2\nJugando nivel... Energía restante: 1\n¡Te has quedado sin energía! Espera para recargar.`,
        byteTip: 'Dentro del cuerpo del while debes modificar alguna variable que afecte la condición, para garantizar que en algún momento llegue a false.',
        pitfallTip: 'Si olvidas decrementar energia dentro del bucle, la condición siempre será true y crearás un bucle infinito que congelará la app.',
        keyPoints: [
          'while repite código mientras su condición se mantenga verdadera.',
          'La condición se evalúa antes de cada ciclo.',
          'Es indispensable modificar el estado de control adentro para evitar bucles infinitos.'
        ]
      },
      {
        title: 'El bucle do-while: ejecución garantizada al menos una vez',
        explanation: `A veces necesitas que el bloque de código se ejecute **al menos una vez obligatoriamente**, y que la condición se evalúe recién al final. Para eso existe **\`do-while\`**:`,
        codeSnippet: `fun main() {\n    var intentos = 0\n\n    do {\n        intentos++\n        println("Intento número $intentos: Conectando al servidor...")\n    } while (intentos < 2)\n\n    println("Proceso finalizado tras $intentos intentos.")\n}`,
        outputSnippet: `Intento número 1: Conectando al servidor...\nIntento número 2: Conectando al servidor...\nProceso finalizado tras 2 intentos.`,
        byteTip: 'Usa do-while cuando pidas una entrada al usuario y debas solicitarla al menos una primera vez antes de validarla.',
        pitfallTip: 'do-while siempre lleva punto y coma después del paréntesis del while: } while (condición).',
        keyPoints: [
          'do-while ejecuta el bloque primero y evalúa la condición después.',
          'Garantiza como mínimo una ejecución sin importar la condición inicial.',
          'Ideal para menús de opciones e intentos de conexión a redes.'
        ]
      }
    ]
  },

  'kotlin-u05-l04': {
    subtitle: 'Aprende los dos patrones más comunes en bucles: contar eventos y acumular totales.',
    analogy: 'El contador es el torniquete del metro que cuenta cuántas personas pasaron (1 en 1). El acumulador es la caja registradora que suma el dinero que pagó cada pasajero (cantidades variables).',
    sections: [
      {
        title: 'Contadores y acumuladores',
        explanation: `Casi cualquier problema práctico con bucles involucra uno de estos dos patrones de programación:

1. **Contador:** Una variable entera que se incrementa en un valor fijo (generalmente \`+1\`) cada vez que ocurre un evento de interés.
2. **Acumulador:** Una variable que va sumando cantidades variables en cada vuelta (por ejemplo, el precio de cada artículo escaneado).

Ambos deben inicializarse **antes** de que empiece el bucle.`,
        codeSnippet: `fun main() {\n    var contadorPares = 0\n    var sumaPares = 0\n\n    for (num in 1..10) {\n        if (num % 2 == 0) {\n            contadorPares++      // Cuenta cuántos pares hay\n            sumaPares += num     // Acumula la suma de esos pares\n        }\n    }\n\n    println("Entre 1 y 10 hay $contadorPares números pares.")\n    println("La suma de todos ellos es: $sumaPares")\n}`,
        outputSnippet: `Entre 1 y 10 hay 5 números pares.\nLa suma de todos ellos es: 30`,
        byteTip: 'Los pares del 1 al 10 son 2, 4, 6, 8, 10. Su suma es 2+4+6+8+10 = 30.',
        pitfallTip: 'No confundas el contador (que suma de 1 en 1) con el acumulador (que suma el valor de la variable num).',
        keyPoints: [
          'Un contador registra frecuencias (cuántas veces ocurrió algo).',
          'Un acumulador suma magnitudes (totales de precios, distancias, notas).',
          'Ambos se declaran con var fuera del bucle y se actualizan adentro.'
        ]
      },
      {
        title: 'Cálculo de promedios con contador y acumulador',
        explanation: `Al combinar ambos patrones puedes calcular promedios dinámicos sin importar cuántos datos proceses:`,
        codeSnippet: `fun main() {\n    var totalVentas = 0.0\n    var cantidadTransacciones = 0\n\n    // Simulamos 3 transacciones\n    val ventas = listOf(120.0, 80.0, 250.0)\n    for (venta in ventas) {\n        totalVentas += venta\n        cantidadTransacciones++\n    }\n\n    val promedioVenta = totalVentas / cantidadTransacciones\n    println("Total recaudado: $$totalVentas en $cantidadTransacciones ventas.")\n    println("Promedio por venta: $$promedioVenta")\n}`,
        outputSnippet: `Total recaudado: $450.0 en 3 ventas.\nPromedio por venta: $150.0`,
        byteTip: 'En Kotlin moderno también existe la función .average() para listas, pero entender el contador y acumulador te da la base de cómo funciona internamente.',
        pitfallTip: 'Verifica siempre que cantidadTransacciones sea mayor a cero antes de dividir para no provocar una división por cero.',
        keyPoints: [
          'El promedio es simplemente: acumulador / contador.',
          'Procesar datos en listas con for es la base de la manipulación de datos en Kotlin.',
          'Protegerse de listas vacías evita errores matemáticos.'
        ]
      }
    ]
  },

  'kotlin-u05-l05': {
    subtitle: 'Comprende el estado inicial y las condiciones de terminación para asegurar la estabilidad de tus bucles.',
    analogy: 'Un maratón tiene una línea de salida clara y una cinta de meta bien marcada. Si los corredores no tienen línea de meta, correrían hasta desmayarse.',
    sections: [
      {
        title: 'Condiciones de inicio y fin en bucles',
        explanation: `Todo bucle confiable debe tener tres elementos perfectamente definidos:
1. **Estado inicial:** El punto de partida de las variables de control antes de entrar al bucle.
2. **Paso o avance:** La modificación en cada ciclo que acerca las variables hacia el objetivo.
3. **Condición de parada:** El momento exacto en que la condición pasa a ser \`false\` y el bucle termina con elegancia.`,
        codeSnippet: `fun main() {\n    // 1. Estado inicial\n    var nivelAgua = 0\n    val capacidadTanque = 5\n\n    println("Llenando tanque...")\n    // 3. Condición de parada (mientras sea menor a la capacidad)\n    while (nivelAgua < capacidadTanque) {\n        // 2. Avance hacia el objetivo\n        nivelAgua++\n        println("Nivel actual: $nivelAgua / $capacidadTanque litros")\n    }\n\n    println("¡Tanque lleno al 100%!")\n}`,
        outputSnippet: `Llenando tanque...\nNivel actual: 1 / 5 litros\nNivel actual: 2 / 5 litros\nNivel actual: 3 / 5 litros\nNivel actual: 4 / 5 litros\nNivel actual: 5 / 5 litros\n¡Tanque lleno al 100%!`,
        byteTip: 'Diseña siempre pensando: "¿Cómo y cuándo va a terminar este bucle?". Te evitará congelar tu aplicación.',
        pitfallTip: 'Si la variable de avance va en la dirección contraria (por ejemplo nivelAgua-- en lugar de ++), el bucle jamás alcanzará la meta.',
        keyPoints: [
          'Un bucle requiere inicio, avance y condición de terminación claros.',
          'El avance debe mover el estado hacia la condición de salida.',
          'La verificación de límites garantiza la estabilidad del sistema.'
        ]
      },
      {
        title: 'Simulación de descargas con porcentajes',
        explanation: `El avance gradual en un bucle modela de forma ideal la simulación de descargas o transferencias en aplicaciones móviles:`,
        codeSnippet: `fun main() {\n    var bytesDescargados = 0\n    val totalBytes = 100\n    val tamanoPaquete = 25\n\n    while (bytesDescargados < totalBytes) {\n        bytesDescargados += tamanoPaquete\n        println("Progreso de descarga: $bytesDescargados%")\n    }\n\n    println("Instalación completada.")\n}`,
        outputSnippet: `Progreso de descarga: 25%\nProgreso de descarga: 50%\nProgreso de descarga: 75%\nProgreso de descarga: 100%\nInstalación completada.`,
        byteTip: 'En Android real, los procesos de descarga se ejecutan en segundo plano con corrutinas para no trabar la interfaz visual.',
        pitfallTip: 'Asegúrate de que el tamaño del paquete no sobrepase el total si necesitas mostrar un tope exacto de 100%.',
        keyPoints: [
          'Los bucles permiten simular y controlar tareas progresivas.',
          'El paso de avance puede ser de cualquier tamaño proporcional.',
          'La retroalimentación en cada ciclo mantiene informado al usuario.'
        ]
      }
    ]
  },

  'kotlin-u05-l06': {
    subtitle: 'Interrumpe o salta vueltas de un bucle de forma quirúrgica con break y continue.',
    analogy: 'break es como activar la palanca de emergencia de un tren: se detiene de inmediato y el viaje termina. continue es como saltarte una canción de tu lista que no te gusta para pasar a la siguiente.',
    sections: [
      {
        title: 'Control de flujo: break y continue',
        explanation: `A veces, dentro de un bucle, necesitas cambiar el curso natural de las repeticiones:

• **\`break\` (Interrumpir):** Detiene el bucle por completo en ese instante exacto y transfiere el control a la primera línea fuera de él. Es ideal para búsquedas: en cuanto encuentras lo que querías, no tiene sentido seguir buscando.
• **\`continue\` (Continuar / Saltar):** Salta el resto del código de la vuelta actual y pasa de inmediato a la siguiente iteración.`,
        codeSnippet: `fun main() {\n    println("--- Demostración de break (detener al encontrar) ---")\n    for (num in 1..5) {\n        if (num == 3) {\n            println("¡Encontramos el $num! Terminando búsqueda con break.")\n            break\n        }\n        println("Revisando número: $num")\n    }\n\n    println("\\n--- Demostración de continue (saltar el 3) ---")\n    for (num in 1..5) {\n        if (num == 3) {\n            println("Saltando el número 3...")\n            continue\n        }\n        println("Procesando número: $num")\n    }\n}`,
        outputSnippet: `--- Demostración de break (detener al encontrar) ---\nRevisando número: 1\nRevisando número: 2\n¡Encontramos el 3! Terminando búsqueda con break.\n\n--- Demostración de continue (saltar el 3) ---\nProcesando número: 1\nProcesando número: 2\nSaltando el número 3...\nProcesando número: 4\nProcesando número: 5`,
        byteTip: 'break ahorra miles de ciclos de procesador al no recorrer elementos innecesarios una vez hallado el resultado.',
        pitfallTip: 'No abuses de break y continue por doquier; un código con demasiados saltos arbitrarios se vuelve difícil de seguir (código espagueti).',
        keyPoints: [
          'break corta el bucle definitivamente.',
          'continue cancela la vuelta actual y pasa a la siguiente.',
          'Ambos se usan comúnmente dentro de una condición if.'
        ]
      },
      {
        title: 'Filtro de datos no deseados con continue',
        explanation: `Imagina procesar un listado de números telefónicos o montos donde quieres ignorar transacciones de cero pesos:`,
        codeSnippet: `fun main() {\n    val montos = listOf(100, 0, 250, 0, 50)\n    var totalValido = 0\n\n    for (monto in montos) {\n        if (monto == 0) {\n            continue // Ignoramos los registros en cero\n        }\n        totalValido += monto\n    }\n\n    println("Suma total de montos activos: $$totalValido")\n}`,
        outputSnippet: `Suma total de montos activos: $400`,
        byteTip: 'continue mantiene el nivel de indentación limpio sin tener que envolver todo el código restante en un bloque if gigante.',
        pitfallTip: 'En bucles while, ten cuidado de actualizar el contador antes de un continue; si lo colocas después, el contador nunca avanzará y crearás un bucle infinito.',
        keyPoints: [
          'continue simplifica el filtrado de excepciones o datos inválidos.',
          'Mejora la legibilidad al evitar anidaciones profundas.',
          'Es una técnica común en algoritmos de limpieza de datos.'
        ]
      }
    ]
  },

  'kotlin-u05-l07': {
    subtitle: 'Aprende a identificar y corregir bucles infinitos y los famosos errores off-by-one.',
    analogy: 'Si construyes una cerca de 10 metros y pones un poste cada metro, necesitas 11 postes, no 10. Olvidar el primer poste es el clásico error de "desfase por uno" que cometen los programadores.',
    sections: [
      {
        title: 'Bugs comunes: bucles infinitos y errores off-by-one',
        explanation: `Dos de las fallas más habituales en la programación con ciclos son:

1. **Bucle infinito:** Ocurre cuando la condición de parada del bucle nunca llega a ser \`false\`. La aplicación consumirá el 100% del procesador hasta que el sistema operativo la fuerce a cerrarse (el famoso ANR "Application Not Responding" en Android).
2. **Error Off-by-one (Desfase por uno):** Ocurre cuando el bucle repite exactamente **una vez de más** o **una vez de menos**. Suele deberse a confundir \`<\` con \`<=\`, o usar \`..\` en lugar de \`until\`.`,
        codeSnippet: `fun main() {\n    // Error off-by-one común: queríamos imprimir 5 elementos pero pusimos < 5\n    var contador = 0\n    println("Conteo correcto con <= 5:")\n    while (contador <= 5) {\n        print("$contador ")\n        contador++\n    }\n    println()\n}`,
        outputSnippet: `Conteo correcto con <= 5:\n0 1 2 3 4 5`,
        byteTip: 'Cuando trabajes con listas e índices, recuerda que en informática los índices empiezan en 0 y terminan en tamaño - 1.',
        pitfallTip: 'Si tu programa se queda "colgado" sin emitir salida en la consola, casi con seguridad has caído en un bucle infinito.',
        keyPoints: [
          'Un bucle infinito congela la aplicación y agota la batería del teléfono.',
          'Los errores off-by-one ejecutan una iteración de más o de menos.',
          'Revisar minuciosamente los operadores relacionales (< vs <=) previene este fallo.'
        ]
      },
      {
        title: 'Técnicas de prevención y pruebas límite',
        explanation: `Para asegurarte de que un bucle está bien blindado:
• Prueba mentalmente qué pasa con los valores límite (con el valor 0, con el valor 1 y con el tamaño máximo).
• Pregúntate: "¿Se ejecutará si la lista está vacía?".
• Si usas \`while\`, comprueba con lupa la línea donde la variable se incrementa.`,
        codeSnippet: `fun main() {\n    val itemsDisponibles = 3\n    \n    // Recorremos de 0 hasta itemsDisponibles - 1 con until de forma segura\n    for (i in 0 until itemsDisponibles) {\n        println("Cargando elemento en índice $i")\n    }\n}`,
        outputSnippet: `Cargando elemento en índice 0\nCargando elemento en índice 1\nCargando elemento en índice 2`,
        byteTip: 'until es el mejor aliado en Kotlin para evitar errores off-by-one al trabajar con índices de listas.',
        pitfallTip: 'Usar 0..itemsDisponibles intentaría acceder al índice 3, el cual no existe si la lista mide 3 elementos (lanzaría un IndexOutOfBoundsException).',
        keyPoints: [
          'until genera rangos seguros para índices basados en cero.',
          'Las pruebas con valores límite descubren el 90% de los errores de bucle.',
          'Escribir bucles claros y acotados es sello de un código profesional.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 6: FUNCIONES
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u06-l01': {
    subtitle: 'Modulariza tu código agrupando instrucciones en bloques reutilizables con nombre propio.',
    analogy: 'Una función es como el botón "Hacer Capuchino" de una cafetera moderna: por dentro muele los granos, calienta el agua, espuma la leche y sirve la taza; pero para ti es simplemente presionar un solo botón con nombre claro.',
    sections: [
      {
        title: '¿Qué es una función y cómo se declara?',
        explanation: `A medida que tus programas crecen, escribir todas las instrucciones dentro de \`main()\` se vuelve inmanejable. Si necesitas calcular el IVA en 10 partes distintas de tu aplicación, copiar y pegar la misma fórmula 10 veces es peligroso: si la tasa cambia, tendrías que modificar 10 archivos.

Una **función** es un bloque de código con nombre que realiza una tarea específica y que puedes **reutilizar** tantas veces como quieras llamándola por su nombre.

Sintaxis básica en Kotlin:
\`fun nombreDeLaFuncion() {\`
\`    // Instrucciones a ejecutar\`
\`}\`

Para ejecutarla, simplemente escribes su nombre seguido de paréntesis: \`nombreDeLaFuncion()\`.`,
        codeSnippet: `// 1. Declaramos la función reutilizable\nfun saludarUsuario() {\n    println("¡Hola! Bienvenido a la aplicación oficial de Kotlin.")\n    println("Esperamos que disfrutes tu sesión de hoy.")\n}\n\nfun main() {\n    // 2. La invocamos tantas veces como la necesitemos\n    saludarUsuario()\n    println("--- Realizando tareas intermedias ---")\n    saludarUsuario()\n}`,
        outputSnippet: `¡Hola! Bienvenido a la aplicación oficial de Kotlin.\nEsperamos que disfrutes tu sesión de hoy.\n--- Realizando tareas intermedias ---\n¡Hola! Bienvenido a la aplicación oficial de Kotlin.\nEsperamos que disfrutes tu sesión de hoy.`,
        byteTip: 'Los nombres de funciones en Kotlin siguen lowerCamelCase y deben empezar con un verbo que describa su acción: calcularTotal, enviarCorreo, validarUsuario.',
        pitfallTip: 'Declarar una función no la ejecuta automáticamente; debes llamarla explícitamente desde main() o desde otra función.',
        keyPoints: [
          'fun es la palabra clave para definir funciones en Kotlin.',
          'Las funciones evitan la duplicación de código y facilitan el mantenimiento.',
          'Se ejecutan llamándolas por su nombre seguido de paréntesis ().'
        ]
      },
      {
        title: 'El principio DRY: Don\'t Repeat Yourself',
        explanation: `Uno de los principios sagrados del desarrollo de software es **DRY (No te repitas)**. Cada vez que sientas la tentación de copiar y pegar un bloque de código, detente y conviértelo en una función.

Si mañana debes corregir un error o mejorar el diseño, solo lo cambiarás en un único lugar:`,
        codeSnippet: `fun imprimirSeparador() {\n    println("========================================")\n}\n\nfun main() {\n    imprimirSeparador()\n    println("   REPORTE DE VENTAS DEL DÍA")\n    imprimirSeparador()\n}`,
        outputSnippet: `========================================\n   REPORTE DE VENTAS DEL DÍA\n========================================`,
        byteTip: 'Las funciones pequeñas y con un único propósito son las más fáciles de probar y mantener.',
        pitfallTip: 'Evita crear "funciones monstruo" de 300 líneas que hagan 10 cosas distintas a la vez.',
        keyPoints: [
          'El principio DRY reduce la deuda técnica y los errores por copiar y pegar.',
          'Una función debe tener una sola responsabilidad bien definida.',
          'La modularización hace que los proyectos grandes sean comprensibles.'
        ]
      }
    ]
  },

  'kotlin-u06-l02': {
    subtitle: 'Haz tus funciones dinámicas enviándoles datos de entrada mediante parámetros y argumentos.',
    analogy: 'Una licuadora no siempre hace el mismo jugo: si le pasas naranjas (argumento), hace jugo de naranja; si le pasas fresas, hace jugo de fresa. La ranura es el parámetro y la fruta que introduces es el argumento.',
    sections: [
      {
        title: 'Parámetros y argumentos en funciones',
        explanation: `Una función que siempre hace exactamente lo mismo es útil, pero una función que adapta su comportamiento a los datos que le envíes es infinitamente más poderosa.

Para recibir datos, declaramos **parámetros** dentro de los paréntesis de la función:
\`fun saludar(nombre: String, edad: Int) {\`
\`    println("Hola $nombre, tienes $edad años.")\n\`
\`}\`

Distinción técnica importante:
• **Parámetro:** La variable receptora que declaras en la firma de la función (ej: \`nombre: String\`).
• **Argumento:** El valor real que le pasas al llamarla desde tu código (ej: \`"Lucas"\`).`,
        codeSnippet: `// Función que recibe dos parámetros tipados\nfun mostrarBienvenida(usuario: String, puntos: Int) {\n    println("¡Hola, $usuario!")\n    println("Tienes $puntos puntos acumulados en tu perfil.\\n")\n}\n\nfun main() {\n    // Pasamos argumentos diferentes en cada llamada\n    mostrarBienvenida("Camila", 350)\n    mostrarBienvenida("Javier", 1200)\n}`,
        outputSnippet: `¡Hola, Camila!\nTienes 350 puntos acumulados en tu perfil.\n\n¡Hola, Javier!\nTienes 1200 puntos acumulados en tu perfil.\n`,
        byteTip: 'En Kotlin, los parámetros de una función son siempre inmutables (val) por diseño para evitar efectos secundarios imprevistos.',
        pitfallTip: 'Debes respetar el orden y los tipos de datos exactos de los parámetros al invocar la función.',
        keyPoints: [
          'Los parámetros permiten pasarle datos externos a una función.',
          'Cada parámetro debe llevar su tipo explícito obligatorio (: Tipo).',
          'Los parámetros son de solo lectura dentro del cuerpo de la función.'
        ]
      },
      {
        title: 'Cálculos matemáticos con parámetros',
        explanation: `Mira cómo una función genérica puede calcular el área de cualquier rectángulo según los valores que reciba:`,
        codeSnippet: `fun calcularAreaRectangulo(base: Double, altura: Double) {\n    val area = base * altura\n    println("Un rectángulo de $base x $altura tiene un área de $area m².")\n}\n\nfun main() {\n    calcularAreaRectangulo(10.0, 5.0)\n    calcularAreaRectangulo(3.5, 2.0)\n}`,
        outputSnippet: `Un rectángulo de 10.0 x 5.0 tiene un área de 50.0 m².\nUn rectángulo de 3.5 x 2.0 tiene un área de 7.0 m².`,
        byteTip: 'Al nombrar parámetros, sé claro: base y altura describen exactamente qué magnitud espera la función.',
        pitfallTip: 'Intentar modificar el valor de un parámetro directamente (por ejemplo base = 20) dará error de compilación.',
        keyPoints: [
          'Los parámetros hacen que el código sea adaptable y multiuso.',
          'Puedes definir tantos parámetros como requiera la función, separados por comas.',
          'Son la base de la comunicación entre diferentes componentes de software.'
        ]
      }
    ]
  },

  'kotlin-u06-l03': {
    subtitle: 'Devuelve resultados desde tus funciones hacia el código que las llamó usando la palabra clave return.',
    analogy: 'Envías a un mensajero con dinero a comprar pan: el mensajero va a la panadería, compra el pan y regresa a tu casa entregándote la bolsa de pan en las manos (el valor de retorno).',
    sections: [
      {
        title: 'Valores de retorno con return',
        explanation: `Hasta ahora nuestras funciones solo imprimían texto en la consola. Sin embargo, en el mundo real, la mayoría de las funciones realizan un cálculo y **devuelven el resultado** para que el programa principal lo guarde en una variable o lo use en otras operaciones.

Para que una función devuelva un valor, debemos:
1. Indicar el **tipo de dato de retorno** después de los paréntesis con dos puntos: \`fun sumar(a: Int, b: Int): Int\`.
2. Usar la palabra clave **\`return\`** seguida del valor o expresión a devolver.`,
        codeSnippet: `// Indicamos con : Double que esta función devolverá un número decimal\nfun calcularTotalConIva(precioNeto: Double, tasaIva: Double): Double {\n    val total = precioNeto * (1 + tasaIva)\n    return total // Entregamos el resultado al código que nos llamó\n}\n\nfun main() {\n    // Guardamos el valor devuelto en una variable\n    val factura1 = calcularTotalConIva(100.0, 0.16)\n    val factura2 = calcularTotalConIva(250.0, 0.16)\n\n    println("Factura 1 con IVA: $$factura1")\n    println("Factura 2 con IVA: $$factura2")\n    println("Gran Total: $\${factura1 + factura2}")\n}`,
        outputSnippet: `Factura 1 con IVA: $116.0\nFactura 2 con IVA: $290.0\nGran Total: $406.0`,
        byteTip: 'Al ejecutarse la sentencia return, la función termina de inmediato. Cualquier código escrito debajo de return en esa misma rama será ignorado.',
        pitfallTip: 'Si declaras que una función devuelve : String y olvidas el return, Kotlin te dará un error de compilación de inmediato.',
        keyPoints: [
          'El tipo de retorno se especifica tras los paréntesis con : Tipo.',
          'return devuelve el dato resultante y finaliza la ejecución de la función.',
          'El valor retornado puede guardarse en variables o usarse en otras expresiones.'
        ]
      },
      {
        title: 'Funciones de validación booleana',
        explanation: `Un patrón elegantísimo en Kotlin es crear funciones que devuelven \`Boolean\` para validar estados:`,
        codeSnippet: `fun esMayorDeEdad(edad: Int): Boolean {\n    return edad >= 18\n}\n\nfun main() {\n    val edadCliente = 20\n    \n    if (esMayorDeEdad(edadCliente)) {\n        println("Venta autorizada para cliente de $edadCliente años.")\n    } else {\n        println("Venta rechazada por minoría de edad.")\n    }\n}`,
        outputSnippet: `Venta autorizada para cliente de 20 años.`,
        byteTip: 'Puedes poner la condición directamente en el return: return edad >= 18 es limpio y súper profesional.',
        pitfallTip: 'No escribas if (edad >= 18) return true else return false. Es redundante; return edad >= 18 hace exactamente lo mismo en una línea.',
        keyPoints: [
          'Las funciones que retornan Boolean hacen que las condiciones if se lean con total naturalidad.',
          'Centralizar validaciones en funciones previene inconsistencias en la app.',
          'Permiten realizar pruebas unitarias (unit tests) de manera sencilla.'
        ]
      }
    ]
  },

  'kotlin-u06-l04': {
    subtitle: 'Comprende el tipo Unit, el equivalente moderno y seguro al void de otros lenguajes.',
    analogy: 'Un chef que te entrega un plato de comida devuelve algo (un valor). Un árbitro que pita el final del partido realiza una acción pero no te entrega ningún objeto físico (devuelve Unit).',
    sections: [
      {
        title: 'Funciones que retornan valor vs funciones Unit',
        explanation: `¿Qué pasa con las funciones que solo realizan una acción (como imprimir en consola o reproducir un sonido) y no tienen nada que devolver?

En Kotlin, esas funciones devuelven un tipo especial llamado **\`Unit\`**:
• Es el equivalente al tipo \`void\` de Java, C o C++, pero con la ventaja de que en Kotlin es un objeto real.
• No necesitas escribir \`: Unit\` explícitamente en la declaración; Kotlin lo asume de forma predeterminada si no indicas otro tipo.
• Tampoco necesitas poner \`return Unit\` al final.`,
        codeSnippet: `// Estas dos funciones son exactamente equivalentes:\nfun registrarEventoExplicito(evento: String): Unit {\n    println("Evento registrado en bitácora: $evento")\n}\n\nfun registrarEventoImplicito(evento: String) {\n    println("Evento registrado en bitácora: $evento")\n}\n\nfun main() {\n    registrarEventoExplicito("Inicio de sesión")\n    registrarEventoImplicito("Cierre de sesión")\n}`,
        outputSnippet: `Evento registrado en bitácora: Inicio de sesión\nEvento registrado en bitácora: Cierre de sesión`,
        byteTip: 'En el código cotidiano de Kotlin casi nadie escribe : Unit explícitamente; se omite por convención.',
        pitfallTip: 'No intentes guardar el resultado de una función Unit en una variable esperando un valor útil; solo obtendrás el objeto Unit.',
        keyPoints: [
          'Unit indica que la función no produce un resultado de datos útil.',
          'Se omite por convención en la firma de las funciones.',
          'Diferencia las funciones de acción (procedimientos) de las funciones de cálculo.'
        ]
      },
      {
        title: 'Funciones de una sola expresión (Single-expression functions)',
        explanation: `Si una función solo calcula y devuelve el resultado de una sola línea, Kotlin te permite eliminar las llaves \`{ }\` y el \`return\`, usando el signo igual (\`=\`):`,
        codeSnippet: `// Forma tradicional con llaves:\nfun multiplicarClasico(x: Int, y: Int): Int {\n    return x * y\n}\n\n// Forma moderna de una sola expresión (Kotlin infiere el tipo de retorno Int):\nfun multiplicar(x: Int, y: Int) = x * y\n\nfun main() {\n    println("Resultado clásico: \${multiplicarClasico(6, 7)}")\n    println("Resultado compacto: \${multiplicar(6, 7)}")\n}`,
        outputSnippet: `Resultado clásico: 42\nResultado compacto: 42`,
        byteTip: 'Las funciones de una sola expresión con = son una de las firmas estilísticas más elegantes de Kotlin.',
        pitfallTip: 'Solo usa la sintaxis = cuando la función consista genuinamente en una única expresión limpia.',
        keyPoints: [
          'fun f() = expresion simplifica funciones cortas a una sola línea.',
          'Kotlin infiere automáticamente el tipo de retorno a partir de la expresión.',
          'Aumenta la productividad y hace el código muy conciso.'
        ]
      }
    ]
  },

  'kotlin-u06-l05': {
    subtitle: 'Define parámetros opcionales con valores predeterminados y usa argumentos con nombre para evitar confusiones.',
    analogy: 'Al pedir una hamburguesa, por defecto viene con queso y lechuga (valores predeterminados). Pero si quieres, puedes pedirla especificando: "cebolla: no" usando argumentos con nombre.',
    sections: [
      {
        title: 'Parámetros con valores predeterminados',
        explanation: `En lenguajes como Java o C#, para tener funciones flexibles tenías que crear múltiples versiones de la misma función con distinta cantidad de parámetros (sobrecarga de métodos).

Kotlin resuelve esto de forma brillante: te permite asignar **valores predeterminados** directamente en los parámetros:
\`fun saludar(nombre: String, saludo: String = "Hola")\`

Si el usuario no envía el segundo dato, Kotlin usa automáticamente el valor por defecto:`,
        codeSnippet: `fun enviarNotificacion(mensaje: String, urgente: Boolean = false, remitente: String = "Sistema") {\n    val prioridad = if (urgente) "[URGENTE]" else "[NORMAL]"\n    println("$prioridad De: $remitente -> $mensaje")\n}\n\nfun main() {\n    // Usamos los valores predeterminados de urgente y remitente\n    enviarNotificacion("Tu pedido está listo")\n\n    // Personalizamos solo lo que necesitamos\n    enviarNotificacion("Alerta de seguridad", urgente = true, remitente = "Seguridad Bancaria")\n}`,
        outputSnippet: `[NORMAL] De: Sistema -> Tu pedido está listo\n[URGENTE] De: Seguridad Bancaria -> Alerta de seguridad`,
        byteTip: 'Coloca los parámetros con valores predeterminados al final de la lista para que sea más fácil invocar la función.',
        pitfallTip: 'No abuses de valores por defecto confusos. Usa valores neutros que tengan sentido lógico en el 90% de los casos.',
        keyPoints: [
          'parametro: Tipo = valorPorDefecto hace que el argumento sea opcional.',
          'Elimina la necesidad de sobrecargar funciones repetitivas.',
          'Brinda máxima flexibilidad sin romper el código existente.'
        ]
      },
      {
        title: 'Argumentos con nombre (Named Arguments)',
        explanation: `Cuando una función tiene muchos parámetros del mismo tipo (por ejemplo, tres textos o cuatro números), es muy fácil equivocarse de orden:
\`crearUsuario("Ana", "García", "ana@correo.com", "Madrid")\`

Kotlin te permite escribir el **nombre del parámetro** al invocar la función, haciendo que el código sea autodocumentado y permitiéndote enviar los argumentos en el orden que prefieras:`,
        codeSnippet: `fun configurarPerfil(nombre: String, temaOscuro: Boolean = false, notificacionesSonido: Boolean = true) {\n    println("Perfil de $nombre:")\n    println("  - Modo oscuro: $temaOscuro")\n    println("  - Sonido: $notificacionesSonido")\n}\n\nfun main() {\n    // Argumentos con nombre: sabemos con total certeza qué significa cada valor\n    configurarPerfil(\n        nombre = "David",\n        notificacionesSonido = false,\n        temaOscuro = true\n    )\n}`,
        outputSnippet: `Perfil de David:\n  - Modo oscuro: true\n  - Sonido: false`,
        byteTip: 'En Jetpack Compose (el framework oficial de UI de Android), casi todos los componentes se configuran con argumentos con nombre.',
        pitfallTip: 'Si mezclas argumentos posicionales y con nombre, los posicionales deben ir siempre primero.',
        keyPoints: [
          'nombre = valor aclara el significado de cada argumento al llamar la función.',
          'Permite saltarse parámetros intermedios que ya tienen valores por defecto.',
          'Aumenta drásticamente la legibilidad en proyectos grandes.'
        ]
      }
    ]
  },

  'kotlin-u06-l06': {
    subtitle: 'Comprende el alcance (scope) de las variables y dónde pueden ser leídas o modificadas.',
    analogy: 'Las variables locales son como las notas que escribes en la pizarra de un aula: solo las personas dentro de esa aula pueden verlas y se borran al terminar la clase. Las variables globales son como un cartel en la entrada de la escuela: todos los alumnos pueden leerlo.',
    sections: [
      {
        title: 'Variables locales y alcance (Scope)',
        explanation: `El **alcance** (*scope*) de una variable determina en qué partes de tu programa esa variable es visible y puede utilizarse.

La regla de oro en Kotlin es el **alcance de bloque por llaves \`{ }\`**:
• Toda variable declarada dentro de una función o bloque solo existe mientras esa función se está ejecutando. Se le llama **variable local**.
• Ninguna otra función puede acceder a las variables locales de otra función.
• Cuando la función termina, sus variables locales se destruyen de la memoria RAM automáticamente.`,
        codeSnippet: `fun calcularDescuento(precio: Double): Double {\n    // tasa es local de esta función: nadie afuera puede verla\n    val tasa = 0.15\n    return precio * tasa\n}\n\nfun main() {\n    val precioLaptop = 1000.0\n    val descuento = calcularDescuento(precioLaptop)\n    println("Descuento obtenido: $$descuento")\n\n    // println(tasa) -> Daría ERROR: 'Unresolved reference: tasa'\n}`,
        outputSnippet: `Descuento obtenido: $150.0`,
        byteTip: 'Limitar el alcance de las variables al bloque más pequeño posible es una de las mejores prácticas de seguridad en programación.',
        pitfallTip: 'Intentar leer una variable declarada dentro de un bucle for o if desde afuera de ese bloque provocará un error de variable no resuelta.',
        keyPoints: [
          'Las variables locales nacen y mueren dentro de las llaves { } donde fueron declaradas.',
          'Diferentes funciones pueden usar el mismo nombre de variable local sin interferir entre sí.',
          'El aislamiento de variables previene colisiones accidentales de datos.'
        ]
      },
      {
        title: 'Variables de nivel superior (Top-level)',
        explanation: `En Kotlin puedes declarar constantes fuera de cualquier función, en la parte superior del archivo. Se les conoce como variables de nivel superior o globales:`,
        codeSnippet: `// Constante de nivel superior accesible por cualquier función en este archivo\nconst val NOMBRE_APP = "MiAppSegura"\n\nfun mostrarCabecera() {\n    println("=== $NOMBRE_APP ===")\n}\n\nfun main() {\n    mostrarCabecera()\n    println("Bienvenido a $NOMBRE_APP")\n}`,
        outputSnippet: `=== MiAppSegura ===\nBienvenido a MiAppSegura`,
        byteTip: 'Usa const val para constantes puras conocidas en tiempo de compilación. Por convención oficial se escriben en MAYÚSCULAS_CON_GUION.',
        pitfallTip: 'Evita variables mutables (var) globales. Hacen que el estado del programa sea impredecible.',
        keyPoints: [
          'const val define constantes globales inmutables.',
          'Las variables de nivel superior deben ser siempre inmutables.',
          'Permiten compartir configuraciones fijas a lo largo de la app.'
        ]
      }
    ]
  },

  'kotlin-u06-l07': {
    subtitle: 'Domina la técnica de descomposición: divide un problema complejo en pequeñas funciones sencillas.',
    analogy: 'Un equipo de mecánicos en una parada de Fórmula 1: uno cambia la rueda delantera izquierda, otro la derecha, otro recarga combustible. Cada uno hace una tarea pequeña a la perfección en lugar de una sola persona corriendo para hacer todo sola.',
    sections: [
      {
        title: 'Descomposición modular de problemas',
        explanation: `Cuando te enfrentas a un requerimiento grande (como procesar una orden de compra completa), nunca intentes programar todo en un solo bloque gigante.

Aplica la técnica de **divide y vencerás**:
1. Identifica las subtareas: validar cliente, calcular subtotal, calcular impuestos, procesar pago y emitir recibo.
2. Crea una función pequeña y especializada para cada subtarea.
3. Coordina todas las funciones desde una función principal ordenada y legible.`,
        codeSnippet: `fun calcularSubtotal(unidades: Int, precio: Double) = unidades * precio\n\nfun calcularImpuesto(subtotal: Double) = subtotal * 0.16\n\nfun emitirFactura(cliente: String, total: Double) {\n    println("Factura para: $cliente | Total a cobrar: $$total")\n}\n\nfun main() {\n    val cliente = "Elena Rostova"\n    val subtotal = calcularSubtotal(unidades = 4, precio = 50.0)\n    val impuesto = calcularImpuesto(subtotal)\n    val totalFinal = subtotal + impuesto\n\n    emitirFactura(cliente, totalFinal)\n}`,
        outputSnippet: `Factura para: Elena Rostova | Total a cobrar: $232.0`,
        byteTip: 'Cada función debe hacer una sola cosa y hacerla bien (Principio de Responsabilidad Única).',
        pitfallTip: 'No crees funciones tan fragmentadas que solo contengan una suma trivial si no aportan reutilización o claridad semántica.',
        keyPoints: [
          'Dividir problemas en funciones hace que el código sea fácil de probar y corregir.',
          'Si una función falla, sabes con precisión quirúrgica en qué archivo y línea ocurrió.',
          'Permite que varios desarrolladores trabajen en distintas partes del sistema simultáneamente.'
        ]
      },
      {
        title: 'Evolución y mantenimiento de código modular',
        explanation: `La magia de este enfoque se nota cuando los requisitos cambian. Si mañana la tasa de impuestos cambia o se agrega una bonificación especial, solo tocas la función \`calcularImpuesto\`; el resto de la aplicación ni se entera y sigue funcionando intacta:`,
        codeSnippet: `fun aplicarDescuentoFrecuente(monto: Double, esClienteFrecuente: Boolean): Double {\n    return if (esClienteFrecuente) monto * 0.90 else monto\n}\n\nfun main() {\n    val totalBase = 200.0\n    val totalConDescuento = aplicarDescuentoFrecuente(totalBase, esClienteFrecuente = true)\n    \n    println("Total tras aplicar política de fidelidad: $$totalConDescuento")\n}`,
        outputSnippet: `Total tras aplicar política de fidelidad: $180.0`,
        byteTip: 'El software bien modularizado se adapta a los cambios del negocio en minutos en lugar de semanas.',
        pitfallTip: 'Evita el acoplamiento fuerte donde una función depende de variables internas secretas de otra.',
        keyPoints: [
          'La modularización minimiza el impacto de los cambios de negocio.',
          'Facilita la escritura de pruebas automatizadas confiables.',
          'Es la base de la arquitectura limpia en apps Android profesionales.'
        ]
      }
    ]
  }
};
