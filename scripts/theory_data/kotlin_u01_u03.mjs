// Módulo de teoría enriquecida para Kotlin: Unidades 1, 2 y 3
// Redactado en español latinoamericano (es-419) con tono claro, amigable y pedagógico
// Siguiendo los estándares oficiales de Android Developers (https://developer.android.com/kotlin/learn)

export const KOTLIN_THEORY_U01_U03 = {
  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 1: PENSAMIENTO LÓGICO Y PRIMEROS PROGRAMAS
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u01-l01': {
    subtitle: 'Aprende qué es el software y cómo las computadoras ejecutan instrucciones para resolver tareas reales.',
    analogy: 'Un programa es como una receta de cocina: lista los ingredientes necesarios y describe cada paso en orden estricto. Si sigues los pasos al pie de la letra, obtendrás el platillo esperado.',
    sections: [
      {
        title: '¿Qué es un programa y cómo funciona?',
        explanation: `Una computadora es una máquina increíblemente veloz, pero no tiene iniciativa propia: no puede adivinar qué necesitas ni improvisar soluciones. Para que haga algo útil, debemos darle instrucciones precisas escritas en un lenguaje que entienda, como **Kotlin**.

Un **programa informático** es simplemente una secuencia lógica y ordenada de instrucciones que le dicen a la máquina qué tareas ejecutar. 

En la práctica, cada instrucción le pide al sistema realizar una acción concreta:
• Guardar un dato en la memoria (como el nombre de un usuario o el total de una compra).
• Realizar un cálculo matemático (sumar impuestos, calcular promedios).
• Tomar una decisión (si la contraseña es correcta, abrir la app; si no, mostrar un aviso).
• Mostrar un resultado en pantalla para que la persona interactúe con él.`,
        codeSnippet: `fun main() {\n    // Le decimos a la computadora que muestre un mensaje en pantalla\n    println("¡Hola! Tu primer programa en Kotlin está funcionando.")\n    println("La máquina ejecutó esta instrucción paso a paso.")\n}`,
        outputSnippet: `¡Hola! Tu primer programa en Kotlin está funcionando.\nLa máquina ejecutó esta instrucción paso a paso.`,
        byteTip: 'Escribe siempre tu código pensando en que otra persona (o tú mismo en unos meses) lo leerá. La claridad es más importante que los trucos rebuscados.',
        pitfallTip: 'No des por sentado ningún paso intermedio. Si olvidas decirle al programa que guarde un dato antes de usarlo, fallará.',
        keyPoints: [
          'Un programa es una lista ordenada de instrucciones ejecutadas por la computadora.',
          'La computadora ejecuta exactamente lo que escribes, sin adivinar intenciones.',
          'Kotlin te permite escribir instrucciones claras, modernas y seguras.'
        ]
      },
      {
        title: 'Aplicación en el mundo real y buenas prácticas',
        explanation: `Todas las aplicaciones que usas a diario (como WhatsApp, Spotify o la app de tu banco) son programas compuestos por miles de instrucciones coordinadas.

En el desarrollo para Android con Kotlin, cada pantalla y botón responde a un programa que procesa eventos:
1. **Automatización:** Ejecutar tareas repetitivas en milisegundos sin cansancio ni errores humanos.
2. **Confiabilidad:** Si el algoritmo está bien diseñado, producirá siempre el resultado correcto.
3. **Escalabilidad:** El mismo programa puede atender a un solo usuario o a millones al mismo tiempo.`,
        codeSnippet: `fun main() {\n    val appNombre = "MiBanco Móvil"\n    val version = 1.0\n    println("Iniciando $appNombre v$version...")\n    println("Verificando conexión segura...")\n    println("Listo para recibir transacciones.")\n}`,
        outputSnippet: `Iniciando MiBanco Móvil v1.0...\nVerificando conexión segura...\nListo para recibir transacciones.`,
        byteTip: 'En Kotlin puedes insertar variables directamente dentro de un texto usando el signo dólar ($). Esto se llama plantilla de texto (String template).',
        pitfallTip: 'Evita crear programas desordenados sin comentarios. Un buen programador documenta el propósito general de su solución.',
        keyPoints: [
          'El software transforma problemas de la vida cotidiana en soluciones automatizadas.',
          'Cada botón y pantalla de una app Android ejecuta un bloque de instrucciones.',
          'Un código bien estructurado facilita agregar nuevas funciones sin romper lo que ya funciona.'
        ]
      }
    ]
  },

  'kotlin-u01-l02': {
    subtitle: 'Comprende el ciclo fundamental de todo sistema: recibir datos, transformarlos y presentar el resultado.',
    analogy: 'Piensa en una licuadora: colocas frutas y leche (Entrada), el motor gira a gran velocidad mezclando los ingredientes (Proceso), y viertes un delicioso batido en tu vaso (Salida).',
    sections: [
      {
        title: 'El modelo Entrada - Proceso - Salida (IPO)',
        explanation: `Sin importar si estás programando una calculadora básica o una inteligencia artificial, prácticamente todo programa sigue el mismo flujo continuo de tres etapas:

1. **Entrada (Input):** Los datos que el programa recibe del exterior. Pueden venir del teclado, de un sensor táctil en tu teléfono, de una cámara o de una base de datos en internet.
2. **Procesamiento:** La transformación lógica de esos datos. Aquí es donde el programa calcula operaciones matemáticas, filtra información o compara valores.
3. **Salida (Output):** El resultado que se entrega al usuario, ya sea un mensaje en la consola, una animación en pantalla, un sonido o un registro guardado.`,
        codeSnippet: `fun main() {\n    // 1. Entrada de datos\n    val precioProducto = 250.0\n    val cantidadComprada = 3\n\n    // 2. Procesamiento (cálculo del total)\n    val total = precioProducto * cantidadComprada\n\n    // 3. Salida de resultados\n    println("Detalle de compra:")\n    println("Total a pagar: $$total")\n}`,
        outputSnippet: `Detalle de compra:\nTotal a pagar: $750.0`,
        byteTip: 'Separa mentalmente las tres fases al resolver cualquier reto. Primero define qué datos necesitas, luego cómo los transformas y finalmente qué mostrarás.',
        pitfallTip: 'Intentar calcular un resultado antes de haber definido o recibido las entradas provocará un error de variable no inicializada.',
        keyPoints: [
          'Entrada: recopilación de datos iniciales necesarios para trabajar.',
          'Proceso: aplicación de fórmulas, condiciones y lógica sobre los datos.',
          'Salida: comunicación del resultado final al usuario o a otro sistema.'
        ]
      },
      {
        title: 'Por qué la salida es vital en una aplicación',
        explanation: `Un programa que procesa datos a toda velocidad pero nunca muestra ni guarda una salida es, para el usuario, indistinguible de un programa congelado o inútil.

En Android, la salida no siempre es texto en una terminal negra:
• Puede ser actualizar el texto de una etiqueta (TextView).
• Activar una vibración o sonido de confirmación.
• Cambiar el color de un indicador a verde cuando una operación es exitosa.

Tener claro cuál es la salida esperada te ayuda a diseñar mejor cada paso previo.`,
        codeSnippet: `fun main() {\n    // Entrada: datos de una calificación\n    val calificacionExamen = 85\n    val calificacionProyecto = 90\n\n    // Proceso: promedio ponderado\n    val promedioFinal = (calificacionExamen + calificacionProyecto) / 2.0\n\n    // Salida clara y amigable\n    println("Calificación final obtenida: $promedioFinal puntos.")\n}`,
        outputSnippet: `Calificación final obtenida: 87.5 puntos.`,
        byteTip: 'Usar 2.0 en lugar de 2 al dividir fuerza a Kotlin a calcular el promedio con decimales exactos en vez de truncar el número.',
        pitfallTip: 'No confundas el cálculo interno con la visualización. El procesamiento debe ser numérico y la salida debe tener un formato fácil de leer para personas.',
        keyPoints: [
          'La salida comunica el valor del trabajo realizado por la máquina.',
          'En apps móviles, la salida suele presentarse en la interfaz visual del usuario.',
          'Diseñar la salida esperada desde el inicio aclara qué operaciones intermedias necesitas.'
        ]
      }
    ]
  },

  'kotlin-u01-l03': {
    subtitle: 'Aprende a formular algoritmos paso a paso que no dejen lugar a ambigüedades ni dudas.',
    analogy: 'Un algoritmo es como armar un mueble de catálogo: cada pieza tiene un número y las instrucciones te indican el orden exacto. Si colocas los tornillos antes de alinear las tablas, el mueble quedará chueco.',
    sections: [
      {
        title: '¿Qué es un algoritmo?',
        explanation: `Un **algoritmo** es un conjunto de pasos lógicos, ordenados y finitos que resuelven un problema o realizan una tarea específica.

Para que un algoritmo sea verdaderamente efectivo en programación, debe cumplir tres propiedades fundamentales:
• **Preciso:** Cada paso debe estar libre de ambigüedades. No puedes decirle a la máquina "agrega un poco de saldo", debes indicarle exactamente cuánto: "saldo = saldo + 50".
• **Ordenado:** La secuencia importa. No puedes consultar el saldo de una cuenta antes de haberla creado.
• **Finito:** Debe tener un inicio claro y un final garantizado. Si un algoritmo se queda dando vueltas para siempre, el programa se congelará (bucle infinito).`,
        codeSnippet: `fun main() {\n    println("Paso 1: Solicitar número al usuario")\n    val numero = 14\n\n    println("Paso 2: Calcular el residuo al dividir entre 2")\n    val residuo = numero % 2\n\n    println("Paso 3: Determinar si el residuo es cero")\n    val esPar = (residuo == 0)\n\n    println("Paso 4: Emitir resultado final -> ¿Es par?: $esPar")\n}`,
        outputSnippet: `Paso 1: Solicitar número al usuario\nPaso 2: Calcular el residuo al dividir entre 2\nPaso 3: Determinar si el residuo es cero\nPaso 4: Emitir resultado final -> ¿Es par?: true`,
        byteTip: 'Antes de tocar el teclado para escribir código en Kotlin, redacta los pasos en una libreta en tu propio idioma (pseudocódigo). Te ahorrará horas de tropiezos.',
        pitfallTip: 'Cuidado con los pasos que dependen de condiciones que nunca se cumplen. Asegúrate de que tu solución siempre encuentre un camino de salida.',
        keyPoints: [
          'Un algoritmo define la estrategia paso a paso antes de traducirla a código.',
          'Debe ser finito: siempre debe llegar a una conclusión.',
          'Debe ser determinista: con los mismos datos de entrada produce siempre el mismo resultado.'
        ]
      },
      {
        title: 'Algoritmos en situaciones cotidianas',
        explanation: `Todos los días ejecutas algoritmos sin darte cuenta: al cepillarte los dientes, al preparar café o al calcular el cambio en el supermercado.

En el desarrollo de software, descomponer problemas grandes en pasos pequeños y simples se conoce como **descomposición algorítmica**.
Por ejemplo, para validar si un usuario puede iniciar sesión:
1. Recibir correo y contraseña.
2. Limpiar posibles espacios en blanco accidentales.
3. Comparar con los registros almacenados.
4. Si coincide, autorizar el acceso; si no, advertir del error.`,
        codeSnippet: `fun main() {\n    val contrasenaIngresada = "secreto123"\n    val contrasenaCorrecta = "secreto123"\n\n    println("Verificando credenciales...")\n    val accesoPermitido = (contrasenaIngresada == contrasenaCorrecta)\n\n    println("Estado del inicio de sesión: $accesoPermitido")\n}`,
        outputSnippet: `Verificando credenciales...\nEstado del inicio de sesión: true`,
        byteTip: 'El operador == en Kotlin compara el contenido de dos valores para verificar si son exactamente iguales.',
        pitfallTip: 'Comparar valores con mayúsculas y minúsculas sin normalizarlos puede causar que contraseñas o correos parezcan incorrectos.',
        keyPoints: [
          'Descomponer un problema complejo en pasos elementales simplifica la programación.',
          'Cada paso debe resolver un único subproblema concreto.',
          'La lógica algorítmica es universal y se aplica en cualquier lenguaje de programación.'
        ]
      }
    ]
  },

  'kotlin-u01-l04': {
    subtitle: 'Rastrea el valor de tus variables línea por línea para entender la ejecución antes de compilar.',
    analogy: 'Es como el cuaderno de un detective que anota cronológicamente los movimientos de cada sospechoso: registras qué tenía cada variable en cada instante exacto.',
    sections: [
      {
        title: 'La prueba de escritorio (Seguimiento manual)',
        explanation: `La **prueba de escritorio** es la técnica mediante la cual tú, como programador, simulas ser la computadora. Tomas papel y lápiz, lees el código línea por línea y vas anotando cómo cambian los valores en la memoria.

¿Por qué es una habilidad indispensable?
• Te ayuda a descubrir errores lógicos antes de ejecutar el programa.
• Te permite entender código escrito por otras personas sin tener que adivinar.
• Desarrolla tu intuición sobre cómo fluye la ejecución secuencial: de arriba hacia abajo, instrucción por instrucción.`,
        codeSnippet: `fun main() {\n    var balance = 100\n    println("Inicio: balance = $balance")\n\n    balance = balance + 50 // Ahora vale 150\n    println("Depósito: balance = $balance")\n\n    balance = balance - 30 // Ahora vale 120\n    println("Retiro: balance = $balance")\n}`,
        outputSnippet: `Inicio: balance = 100\nDepósito: balance = 150\nRetiro: balance = 120`,
        byteTip: 'Cuando tengas una duda sobre por qué tu código no da el valor esperado, imprime las variables intermedias con println() para rastrearlas en vivo.',
        pitfallTip: 'No asumas que una variable conserva su valor original si fue reasignada más abajo. Siempre busca la última asignación ejecutada.',
        keyPoints: [
          'La ejecución es secuencial: fluye de arriba hacia abajo.',
          'Una variable guarda un solo valor activo en memoria a la vez.',
          'El seguimiento manual te permite detectar fallas de cálculo antes de probar la app.'
        ]
      },
      {
        title: 'Depuración y rastreo de estados intermedios',
        explanation: `A medida que tus programas crezcan, tendrás varias variables interactuando al mismo tiempo. Saber rastrear sus estados te convertirá en un programador seguro y autónomo.

Mira este ejemplo con dos variables intercambiando y combinando datos:`,
        codeSnippet: `fun main() {\n    var x = 10\n    var y = 20\n    \n    // Sumamos y reasignamos\n    x = x + y // x pasa a valer 30\n    y = x - y // y pasa a valer 10\n    \n    println("Valores finales -> x: $x, y: $y")\n}`,
        outputSnippet: `Valores finales -> x: 30, y: 10`,
        byteTip: 'Este truco matemático permite intercambiar valores entre variables sin usar una tercera variable temporal.',
        pitfallTip: 'Confundir el operador de asignación (=) con una igualdad matemática. En programación, x = x + y significa "calcula x + y y guarda el resultado en x".',
        keyPoints: [
          'El signo = asigna el resultado de la derecha a la variable ubicada a la izquierda.',
          'Rastrear paso a paso elimina las conjeturas en el desarrollo de software.',
          'Las herramientas de depuración (debuggers) de Android Studio hacen este seguimiento de forma interactiva.'
        ]
      }
    ]
  },

  'kotlin-u01-l05': {
    subtitle: 'Conoce la función fun main(), la puerta de entrada oficial donde arranca cualquier programa en Kotlin.',
    analogy: 'La función main() es como la llave de encendido de un automóvil: no importa cuántos sistemas modernos tenga el vehículo, nada comienza a andar hasta que giras la llave en el punto de arranque.',
    sections: [
      {
        title: 'La función principal: fun main()',
        explanation: `Todo programa escrito en Kotlin necesita saber exactamente por dónde empezar a ejecutarse. Ese punto de inicio universal es la función llamada **\`main()\`**.

Desglosemos su estructura oficial:
• **\`fun\`**: Es la palabra clave que usa Kotlin para declarar una función (un bloque de código reutilizable).
• **\`main\`**: Es el nombre reservado que el compilador y la máquina virtual buscan automáticamente al iniciar la aplicación.
• **\`()\`**: Los paréntesis indican que es una función. Opcionalmente pueden recibir parámetros del sistema.
• **\`{ ... }\`**: Las llaves delimitan el cuerpo de la función. Todo el código que coloques dentro de estas llaves se ejecutará en orden.`,
        codeSnippet: `// Este es el punto de partida de nuestra aplicación en Kotlin\nfun main() {\n    println("¡Bienvenido al entorno de ejecución de Kotlin!")\n    println("Cualquier instrucción dentro de estas llaves se ejecutará.")\n}`,
        outputSnippet: `¡Bienvenido al entorno de ejecución de Kotlin!\nCualquier instrucción dentro de estas llaves se ejecutará.`,
        byteTip: 'En versiones modernas de Kotlin no es necesario escribir parámetros dentro de main() a menos que vayas a recibir argumentos desde la terminal.',
        pitfallTip: 'Si escribes código suelto fuera de cualquier función o clase, Kotlin no sabrá en qué momento ejecutarlo y generará un error de compilación.',
        keyPoints: [
          'fun es la palabra clave para definir funciones en Kotlin.',
          'main() es el punto de entrada obligatorio de los programas ejecutables.',
          'Todo el código ejecutable inicial debe residir dentro de las llaves de main().'
        ]
      },
      {
        title: 'Cómo interactúa main() con Android',
        explanation: `En aplicaciones completas de Android, el sistema operativo se encarga de llamar a métodos equivalentes (como \`onCreate()\`), pero el concepto es idéntico: siempre existe un punto de entrada donde se inicializa la memoria, se configuran las vistas y se arranca la lógica.

Comprender la anatomía de \`fun main()\` te da la base para entender cualquier otra función en Kotlin:`,
        codeSnippet: `fun main() {\n    val saludo = "Sistema listo"\n    val timestamp = 1718000000\n    println("$saludo [código de inicio: $timestamp]")\n}`,
        outputSnippet: `Sistema listo [código de inicio: 1718000000]`,
        byteTip: 'Puedes tener tantas funciones secundarias como quieras en tu proyecto, pero solo una puede ser el main() principal de arranque.',
        pitfallTip: 'Olvidar cerrar la llave final } de la función provocará un error de sintaxis de tipo "Expecting a top level declaration".',
        keyPoints: [
          'El flujo de inicio es el pilar de la arquitectura de cualquier app.',
          'Todas las funciones en Kotlin comparten la misma sintaxis básica con fun nombre().',
          'Mantener main() limpio delegando tareas a otras funciones es una buena práctica.'
        ]
      }
    ]
  },

  'kotlin-u01-l06': {
    subtitle: 'Comunica información en pantalla de forma limpia con print() y println().',
    analogy: 'Piensa en una máquina de escribir: print() escribe una letra tras otra en el mismo renglón, mientras que println() escribe el texto y de inmediato presiona la palanca para bajar al renglón siguiente.',
    sections: [
      {
        title: 'Diferencia entre print() y println()',
        explanation: `Para comunicarte con el usuario o revisar qué está pasando dentro de tu programa, la herramienta más inmediata es la salida a consola. Kotlin ofrece dos funciones muy similares pero con una diferencia clave:

• **\`println()\`** (con *ln* al final, de *line*): Imprime el mensaje y **hace un salto de línea** automático. La siguiente instrucción que imprima aparecerá en el renglón de abajo.
• **\`print()\`** (sin *ln*): Imprime el mensaje pero **mantiene el cursor en la misma línea**. Lo siguiente que imprimas aparecerá pegado justo a la derecha.`,
        codeSnippet: `fun main() {\n    // Usando print (se mantienen en el mismo renglón)\n    print("Cargando: ")\n    print("50% ")\n    print("100%\\n") // \\n fuerza un salto manual\n\n    // Usando println (cada uno en su propio renglón)\n    println("Paso 1 completado.")\n    println("Paso 2 completado.")\n}`,
        outputSnippet: `Cargando: 50% 100%\nPaso 1 completado.\nPaso 2 completado.`,
        byteTip: 'Usa \\n dentro de cualquier texto para insertar un salto de línea sin tener que escribir múltiples llamadas a println().',
        pitfallTip: 'Llamar a print() repetidamente sin espacios intermedios provocará que las palabras queden pegadas sin separación ("HolaMundo").',
        keyPoints: [
          'println() agrega un salto de línea al final del texto.',
          'print() continúa imprimiendo en el mismo renglón actual.',
          'Son las herramientas esenciales para inspeccionar valores durante el aprendizaje.'
        ]
      },
      {
        title: 'Formato limpio de salidas en consola',
        explanation: `Mostrar mensajes claros y bien estructurados facilita enormemente la lectura de los resultados de tus pruebas.

Puedes combinar texto con números, resultados de operaciones y caracteres especiales para dar formato de reporte profesional:`,
        codeSnippet: `fun main() {\n    val usuario = "Sofía"\n    val nivel = 5\n    val vidas = 3\n\n    println("=== ESTADO DEL JUGADOR ===")\n    println("Usuario : $usuario")\n    println("Nivel   : $nivel")\n    println("Vidas   : $vidas")\n    println("==========================")\n}`,
        outputSnippet: `=== ESTADO DEL JUGADOR ===\nUsuario : Sofía\nNivel   : 5\nVidas   : 3\n==========================`,
        byteTip: 'Puedes alinear visualmente la salida agregando espacios antes de los dos puntos para que los datos formen una tabla limpia.',
        pitfallTip: 'No uses println() para mostrar contraseñas reales ni datos bancarios sensibles en consolas de producción en Android (Logcat).',
        keyPoints: [
          'Un formato visual ordenado ayuda a comprender rápidamente los resultados.',
          'Las plantillas $variable simplifican la creación de reportes.',
          'En Android profesional, println() se complementa con la clase Log (Log.d, Log.e).'
        ]
      }
    ]
  },

  'kotlin-u01-l07': {
    subtitle: 'Aprende a documentar tu código con comentarios que explican el porqué de tus decisiones.',
    analogy: 'Los comentarios son como las notas adhesivas que dejas en el refrigerador: le explican a tu familia qué hay en cada recipiente sin cambiar el sabor de la comida.',
    sections: [
      {
        title: 'Comentarios en Kotlin: de una línea y multilínea',
        explanation: `A medida que escribas programas más interesantes, te darás cuenta de que el código no solo lo lee la máquina: lo lees tú y lo leen tus compañeros de equipo. Los **comentarios** son notas escritas en lenguaje humano que el compilador de Kotlin ignora por completo.

Existen dos tipos principales en Kotlin:
• **Comentarios de una sola línea (\`//\`):** Todo lo que escribas a la derecha de dos barras diagonales en esa misma línea será ignorado.
• **Comentarios multilínea (\`/* ... */\`):** Ideales para párrafos explicativos largos o para desactivar temporalmente un bloque entero de código mientras buscas un error.`,
        codeSnippet: `fun main() {\n    // Este es un comentario de una sola línea que explica el propósito:\n    val tasaImpuesto = 0.16 // IVA estándar del 16%\n\n    /* \n       Este es un comentario multilínea.\n       Podemos escribir varias líneas explicativas\n       sin preocuparnos por la sintaxis de Kotlin.\n    */\n    val precioNeto = 100.0\n    val total = precioNeto * (1 + tasaImpuesto)\n    println("Total con IVA: $$total")\n}`,
        outputSnippet: `Total con IVA: $116.0`,
        byteTip: 'En la mayoría de los editores modernos (como Android Studio o VS Code), puedes comentar o descomentar una línea rápidamente pulsando Ctrl + / (o Cmd + / en Mac).',
        pitfallTip: 'No comentes lo obvio (por ejemplo, // declara x. var x = 5). Comenta el porqué de una decisión técnica o de negocio.',
        keyPoints: [
          'Los comentarios son invisibles para la máquina y no afectan el rendimiento.',
          '// se utiliza para notas cortas en una sola línea.',
          '/* ... */ se utiliza para bloques largos o documentación de cabecera.'
        ]
      },
      {
        title: 'La regla de oro: código autodocumentado',
        explanation: `El mejor código es aquel que resulta tan claro y ordenado que casi no necesita comentarios para entenderse. Elige nombres descriptivos para tus variables y funciones, y reserva los comentarios para explicar el **contexto** o decisiones complejas.

Mira la diferencia entre un código críptico y uno limpio:`,
        codeSnippet: `fun main() {\n    // Código limpio con nombres expresivos:\n    val limiteIntentosLogin = 3\n    val intentosActuales = 1\n    val intentosRestantes = limiteIntentosLogin - intentosActuales\n    \n    println("Te quedan $intentosRestantes intentos antes de bloquear la cuenta.")\n}`,
        outputSnippet: `Te quedan 2 intentos antes de bloquear la cuenta.`,
        byteTip: 'Si una función o variable necesita tres líneas de comentario para entenderse, probablemente su nombre debería ser más claro.',
        pitfallTip: 'Evita dejar comentarios obsoletos. Si cambias el funcionamiento del código, actualiza también los comentarios para no confundir a tu equipo.',
        keyPoints: [
          'El código limpio y bien nombrado reduce la necesidad de comentarios excesivos.',
          'Usa comentarios para explicar motivos de diseño, reglas de negocio o advertencias.',
          'Mantén siempre sincronizados tus comentarios con el código real.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 2: VARIABLES Y TIPOS DE DATOS
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u02-l01': {
    subtitle: 'Descubre cómo reservar espacios en la memoria del dispositivo para guardar y consultar información.',
    analogy: 'Una variable es como una caja de zapatos con una etiqueta en el frente: la etiqueta es el nombre de la variable y lo que guardas adentro es su valor.',
    sections: [
      {
        title: '¿Qué es una variable y para qué sirve?',
        explanation: `Cuando usas una app, esta necesita recordar datos en todo momento: tu nombre de usuario, cuántos productos tienes en el carrito, o si tienes activas las notificaciones.

Para guardar esa información mientras la aplicación está abierta, usamos **variables**. Una variable es un espacio reservado en la memoria RAM de la computadora o teléfono que tiene:
• **Un nombre (identificador):** Con el que nos referimos a ella en el código.
• **Un valor:** El dato real que almacena en ese momento.
• **Un tipo:** Qué clase de dato contiene (número, texto, verdadero/falso).`,
        codeSnippet: `fun main() {\n    // Declaramos una variable y le asignamos un valor inicial\n    val nombreJugador = "Mateo"\n    val puntuacion = 1500\n\n    println("Bienvenido, $nombreJugador!")\n    println("Tu puntuación actual es: $puntuacion puntos")\n}`,
        outputSnippet: `Bienvenido, Mateo!\nTu puntuación actual es: 1500 puntos`,
        byteTip: 'En Kotlin, una variable debe tener siempre un valor inicial antes de poder leerla. No existen variables con basura de memoria.',
        pitfallTip: 'Intentar usar una variable antes de haberla declarado causará un error de compilación inmediato.',
        keyPoints: [
          'Una variable almacena datos temporales en la memoria RAM.',
          'Se compone de un nombre, un valor y un tipo de dato.',
          'Kotlin exige inicializar las variables antes de permitir su lectura.'
        ]
      },
      {
        title: 'Cómo asigna memoria Kotlin',
        explanation: `Cuando escribes \`val nombre = "Mateo"\`, Kotlin le pide al sistema operativo un pedacito de memoria suficiente para almacenar ese texto y vincula la etiqueta \`nombre\` con esa dirección.

A partir de ese instante, cada vez que uses \`nombre\` en tu código, Kotlin irá a esa caja de memoria y extraerá su contenido con máxima velocidad.`,
        codeSnippet: `fun main() {\n    val moneda = "USD"\n    val saldoDisponible = 450.75\n    \n    println("Tu saldo en cuenta es: $saldoDisponible $moneda")\n}`,
        outputSnippet: `Tu saldo en cuenta es: 450.75 USD`,
        byteTip: 'Los nombres de variables deben ser descriptivos: es mucho mejor usar saldoDisponible que una letra vaga como s o x.',
        pitfallTip: 'Los nombres de variables no pueden contener espacios ni comenzar con números (por ejemplo, 1usuario es inválido).',
        keyPoints: [
          'El sistema reserva la memoria exacta requerida para cada dato.',
          'Los identificadores claros hacen que el programa sea intuitivo de leer.',
          'El acceso a memoria de variables locales en Kotlin es extremadamente rápido.'
        ]
      }
    ]
  },

  'kotlin-u02-l02': {
    subtitle: 'Domina las dos palabras clave fundamentales de Kotlin: val para valores fijos y var para valores que cambian.',
    analogy: 'val es como escribir con tinta permanente en un contrato oficial: una vez firmado, no se puede alterar. var es como escribir con lápiz sobre una libreta: puedes borrar y cambiar el número cuantas veces quieras.',
    sections: [
      {
        title: 'Diferencia esencial entre val y var',
        explanation: `A diferencia de otros lenguajes más antiguos donde todas las variables pueden modificarse en cualquier momento, Kotlin te pide tomar una decisión de seguridad desde el primer instante:

• **\`val\` (de *value* / inmutable):** Declara una variable de **solo lectura**. Una vez que le asignas un valor inicial, **nunca más puede cambiarse**. Intentar reasignarla provocará un error de compilación.
• **\`var\` (de *variable* / mutable):** Declara una variable cuyo valor **sí puede modificarse** o reasignarse a lo largo del tiempo.`,
        codeSnippet: `fun main() {\n    // val: No cambia nunca\n    val fechaNacimiento = "15/03/1998"\n\n    // var: Sí puede cambiar\n    var edad = 25\n    println("Edad inicial: $edad")\n\n    edad = 26 // Modificamos la variable var\n    println("Edad cumplida: $edad")\n    println("Fecha de nacimiento (fija): $fechaNacimiento")\n}`,
        outputSnippet: `Edad inicial: 25\nEdad cumplida: 26\nFecha de nacimiento (fija): 15/03/1998`,
        byteTip: 'La regla de oro oficial de Android: Usa val por defecto siempre. Solo cambia a var cuando sea estrictamente obligatorio modificar el valor.',
        pitfallTip: 'Si intentas hacer fechaNacimiento = "otra", el compilador detendrá el programa con el error "Val cannot be reassigned".',
        keyPoints: [
          'val crea referencias inmutables (de solo lectura).',
          'var crea referencias mutables que permiten reasignación.',
          'Usar val previene errores accidentales donde un valor cambia sin que te des cuenta.'
        ]
      },
      {
        title: 'Por qué la inmutabilidad con val hace mejores apps',
        explanation: `En aplicaciones modernas para Android, muchos procesos ocurren simultáneamente (descargar datos de internet, responder a toques en pantalla, reproducir audio).

Si muchas partes de tu app pueden modificar la misma variable al mismo tiempo (con \`var\`), se producen fallos muy difíciles de rastrear (llamados condiciones de carrera).
Al usar \`val\`:
• Tu código se vuelve **predecible**: sabes con certeza que ese valor no ha cambiado.
• Tu código es más **seguro**: evitas efectos secundarios sorpresa.
• Es más fácil de probar y verificar.`,
        codeSnippet: `fun main() {\n    val precioBase = 120.0\n    val porcentajeDescuento = 0.10 // 10%\n    \n    // En vez de modificar precioBase, calculamos un nuevo valor con val\n    val precioFinal = precioBase * (1 - porcentajeDescuento)\n    \n    println("Precio original: $$precioBase")\n    println("Precio con descuento: $$precioFinal")\n}`,
        outputSnippet: `Precio original: $120.0\nPrecio con descuento: $108.0`,
        byteTip: 'Favorece crear un nuevo val con el resultado calculado en lugar de sobreescribir una variable var existente.',
        pitfallTip: 'No uses var por pereza. El código con demasiadas variables mutables es el caldo de cultivo número uno para bugs.',
        keyPoints: [
          'La inmutabilidad previene errores en programas con múltiples tareas concurrentes.',
          'Casi el 80% de las variables en una app profesional bien diseñada son val.',
          'Kotlin fue diseñado específicamente para premiar el uso de val.'
        ]
      }
    ]
  },

  'kotlin-u02-l03': {
    subtitle: 'Conoce los tipos de datos principales de Kotlin: números, texto, caracteres y valores de verdad.',
    analogy: 'Los tipos de datos son como recipientes de cocina especializados: usas un vaso para líquidos (Double), un frasco de pastillas para unidades contables (Int) y una carpeta para hojas con texto (String).',
    sections: [
      {
        title: 'Los tipos básicos de Kotlin',
        explanation: `En Kotlin todo es un objeto y cada dato pertenece a un tipo bien definido. Los más utilizados en el día a día son:

• **\`Int\` (Entero):** Números sin decimales, positivos o negativos (ejemplo: \`10\`, \`-5\`, \`2024\`).
• **\`Double\` (Decimal):** Números con punto decimal de alta precisión (ejemplo: \`3.1416\`, \`99.95\`).
• **\`Boolean\` (Booleano):** Solo tiene dos valores posibles: \`true\` (verdadero) o \`false\` (falso). Ideal para banderas y decisiones.
• **\`String\` (Cadena de texto):** Texto encerrado entre comillas dobles (ejemplo: \`"Hola Kotlin"\`).
• **\`Char\` (Carácter):** Un único símbolo o letra encerrado entre comillas simples (ejemplo: \`'A'\`, \`'$'\`).`,
        codeSnippet: `fun main() {\n    val edad: Int = 22\n    val promedio: Double = 9.85\n    val esEstudianteActivo: Boolean = true\n    val inicial: Char = 'V'\n    val nombre: String = "Valeria"\n\n    println("Ficha del alumno:")\n    println("Nombre: $nombre (Inicial: $inicial)")\n    println("Edad: $edad años | Promedio: $promedio")\n    println("¿Inscrito actualmente?: $esEstudianteActivo")\n}`,
        outputSnippet: `Ficha del alumno:\nNombre: Valeria (Inicial: 'V')\nEdad: 22 años | Promedio: 9.85\n¿Inscrito actualmente?: true`,
        byteTip: 'Si escribes un número con punto (como 10.5), Kotlin lo clasificará automáticamente como Double.',
        pitfallTip: 'No confundas Char con String. `A` es un Char (comillas simples) y "A" es un String (comillas dobles). No son intercambiables.',
        keyPoints: [
          'Int para conteos enteros, Double para medidas y dinero con decimales.',
          'Boolean para estados binarios (sí/no, activo/inactivo).',
          'String con comillas dobles para texto, Char con comillas simples para una sola letra.'
        ]
      },
      {
        title: 'Seguridad estricta de tipos (Type Safety)',
        explanation: `Kotlin es un lenguaje de **tipado estricto**. Esto significa que una vez que una variable tiene un tipo, no puedes asignarle un dato de un tipo incompatible.

Por ejemplo, no puedes guardar un texto dentro de una variable numérica:
\`var puntaje: Int = 100\`
\`puntaje = "cien" // ¡ERROR de compilación!\`

Esta protección evita millones de caídas en apps de producción porque el compilador detecta el error antes de que la app llegue a manos del usuario.`,
        codeSnippet: `fun main() {\n    val precioUnitario: Double = 19.99\n    val unidades: Int = 4\n    \n    // Para operar Int con Double, Kotlin nos pide ser explícitos o multiplicar directamente\n    val costoTotal = precioUnitario * unidades\n    println("Costo total de $unidades artículos: $$costoTotal")\n}`,
        outputSnippet: `Costo total de 4 artículos: $79.96`,
        byteTip: 'Kotlin convierte automáticamente el resultado de Double * Int a Double para no perder los decimales.',
        pitfallTip: 'Intentar asignar 10 a una variable de tipo String causará un error de "Type mismatch".',
        keyPoints: [
          'El tipado estricto evita que mezcles datos incompatibles por descuido.',
          'Los errores de tipo se detectan al escribir código, no cuando la app ya está publicada.',
          'Cada tipo de dato optimiza el uso de memoria y rendimiento en el procesador.'
        ]
      }
    ]
  },

  'kotlin-u02-l04': {
    subtitle: 'Aprende cómo el compilador de Kotlin deduce los tipos automáticamente sin que tengas que escribirlos.',
    analogy: 'Si ves entrar a un animal con plumas que nada y hace "cuac", no necesitas una etiqueta que diga "es un pato"; lo infieres de inmediato. Kotlin hace exactamente lo mismo con tus datos.',
    sections: [
      {
        title: 'Inferencia de tipos vs Declaración explícita',
        explanation: `En Kotlin tienes dos formas de declarar una variable:

1. **Declaración explícita:** Escribes dos puntos (\`:\`) y el tipo de dato manualmente.
\`val ciudad: String = "Montevideo"\`
\`val temperatura: Double = 21.5\`

2. **Inferencia de tipos (Implícita):** Omites el tipo y dejas que Kotlin lo deduzca a partir del valor inicial.
\`val ciudad = "Montevideo" // Kotlin sabe que es String\`
\`val temperatura = 21.5   // Kotlin sabe que es Double\`

Ambas formas producen exactamente el mismo código máquina ultra-optimizado. La inferencia simplemente te ahorra escribir texto redundante.`,
        codeSnippet: `fun main() {\n    // Con inferencia de tipos (limpio y conciso)\n    val lenguaje = "Kotlin"\n    val version = 2\n    val esModerno = true\n\n    println("Lenguaje: $lenguaje (tipo String)")\n    println("Versión: $version (tipo Int)")\n    println("¿Es moderno?: $esModerno (tipo Boolean)")\n}`,
        outputSnippet: `Lenguaje: Kotlin (tipo String)\nVersión: 2 (tipo Int)\n¿Es moderno?: true (tipo Boolean)`,
        byteTip: 'En el código profesional para Android, casi todo el mundo usa inferencia de tipos para mantener el código limpio y legible.',
        pitfallTip: 'Si declaras una variable sin darle un valor inicial inmediato, la inferencia no puede adivinar y estás obligado a indicar el tipo explícito.',
        keyPoints: [
          'La inferencia de tipos permite escribir código más conciso sin perder seguridad.',
          'Una vez inferido el tipo, este queda grabado y no puede cambiar.',
          'Usa tipo explícito cuando declares variables antes de asignarles valor.'
        ]
      },
      {
        title: 'Cuándo conviene ser explícito con el tipo',
        explanation: `Aunque la inferencia es genial, hay situaciones donde conviene escribir el tipo explícito:
• Cuando la inicialización no es inmediata.
• Cuando quieres forzar un tipo más amplio (por ejemplo, querer un \`Double\` aunque pongas un entero: \`val tasa: Double = 5.0\`).
• Al escribir interfaces públicas o funciones en bibliotecas para que el lector no tenga que deducir.`,
        codeSnippet: `fun main() {\n    // Forzamos que sea Double aunque el valor parezca entero\n    val puntajeBase: Double = 100.0\n    val bonificacion = 15.5\n    \n    val puntajeTotal = puntajeBase + bonificacion\n    println("Puntaje acumulado: $puntajeTotal")\n}`,
        outputSnippet: `Puntaje acumulado: 115.5`,
        byteTip: 'Si quieres un Long (entero gigante), puedes agregar la letra L al final del número: val idUsuario = 100452399812L.',
        pitfallTip: 'Escribir val x: Int = 10.5 dará error de compilación inmediato porque 10.5 tiene decimales y no cabe en un Int.',
        keyPoints: [
          'La inferencia hace el código ágil; el tipo explícito brinda precisión milimétrica.',
          'Usa la combinación que haga tu código más claro para quien lo lea.',
          'Ambos enfoques tienen exactamente el mismo rendimiento en ejecución.'
        ]
      }
    ]
  },

  'kotlin-u02-l05': {
    subtitle: 'Aprende a actualizar variables mutables de forma segura a lo largo del tiempo.',
    analogy: 'Imagina el marcador de un partido de fútbol: empieza en 0 a 0 y, a medida que avanza el juego, el tablero cambia a 1 a 0, 1 a 1, etc. El tablero es una variable var que se actualiza.',
    sections: [
      {
        title: 'Actualización y reasignación de variables',
        explanation: `Para que una variable pueda recibir nuevos valores durante la ejecución, debe haberse declarado con **\`var\`**.

Cuando actualizas una variable:
1. Kotlin evalúa la expresión del lado derecho del signo \`=\`.
2. Reemplaza el valor antiguo guardado en la memoria por el nuevo resultado.
3. El tipo de dato debe seguir siendo el mismo (no puedes ponerle texto a un \`var\` numérico).`,
        codeSnippet: `fun main() {\n    var golesLocal = 0\n    var golesVisitante = 0\n    println("Marcador inicial: $golesLocal - $golesVisitante")\n\n    // Anotan un gol\n    golesLocal = golesLocal + 1\n    println("¡Gol local!: $golesLocal - $golesVisitante")\n\n    // Anotan otro gol usando el operador compuesto\n    golesLocal += 1\n    println("¡Segundo gol local!: $golesLocal - $golesVisitante")\n}`,
        outputSnippet: `Marcador inicial: 0 - 0\n¡Gol local!: 1 - 0\n¡Segundo gol local!: 2 - 0`,
        byteTip: 'golesLocal += 1 es una forma corta y elegante de escribir golesLocal = golesLocal + 1.',
        pitfallTip: 'No vuelvas a escribir var al actualizar una variable existente. Escribir var goles = 1 crea una nueva variable por error.',
        keyPoints: [
          'Solo las variables var permiten reasignar valores después de su creación.',
          'El nuevo valor asignado debe coincidir estrictamente con el tipo de dato original.',
          'Operadores como +=, -= facilitan la actualización de contadores.'
        ]
      },
      {
        title: 'Patrón de acumulador y contador',
        explanation: `Uno de los usos más habituales de la actualización de variables es acumular totales o contar eventos (como pasos caminados, monedas recogidas o intentos fallidos):`,
        codeSnippet: `fun main() {\n    var totalCarrito = 0.0\n    println("Carrito vacío: $$totalCarrito")\n\n    // Agregamos artículos\n    totalCarrito += 24.50\n    totalCarrito += 15.00\n    totalCarrito += 9.99\n\n    println("Total a cobrar por 3 productos: $$totalCarrito")\n}`,
        outputSnippet: `Carrito vacío: $0.0\nTotal a cobrar por 3 productos: $49.49`,
        byteTip: 'Inicializa siempre tus acumuladores en 0.0 para evitar problemas con números indefinidos.',
        pitfallTip: 'Cuidado con sobreescribir un acumulador usando = en lugar de +=. Perderías todos los valores previos sumados.',
        keyPoints: [
          'Un contador suma típicamente de 1 en 1 (contador++).',
          'Un acumulador suma cantidades variables (total += monto).',
          'Ambos patrones requieren el uso justificado de var.'
        ]
      }
    ]
  },

  'kotlin-u02-l06': {
    subtitle: 'Aprende a nombrar variables con claridad y aplicando la convención oficial camelCase.',
    analogy: 'Un armario donde todas las cajas dicen "cosas 1", "cosas 2" y "varios" es un infierno para encontrar algo. Si las etiquetas dicen "ropaDeInvierno" y "herramientasJardin", encuentras todo en un segundo.',
    sections: [
      {
        title: 'La convención oficial: lowerCamelCase',
        explanation: `En Kotlin y en el ecosistema oficial de Android existe un estándar estricto para nombrar variables: **lowerCamelCase**.

¿Cómo funciona camelCase?
• Empieza siempre con una letra minúscula.
• Si el nombre tiene varias palabras juntas, cada nueva palabra inicia con una letra mayúscula.
• No se usan espacios ni guiones bajos (\`_\`).

Ejemplos correctos:
✔ \`nombreUsuario\`
✔ \`saldoCuentaBancaria\`
✔ \`intentosRestantes\`
✔ \`estaConectadoInternet\`

Ejemplos incorrectos o desaconsejados:
✖ \`nombre_usuario\` (estilo de Python/C, no de Kotlin)
✖ \`NombreUsuario\` (con mayúscula inicial, reservado para Clases)
✖ \`n\` o \`x\` (no dicen nada sobre qué dato contienen)`,
        codeSnippet: `fun main() {\n    // Nombres expresivos que explican por sí mismos qué representan\n    val nombreDestinatario = "Carlos Mendoza"\n    val direccionEntrega = "Av. Central 742"\n    val numeroPaquetes = 2\n    val envioEsUrgente = true\n\n    println("Orden de envío para: $nombreDestinatario")\n    println("Destino: $direccionEntrega ($numeroPaquetes paquetes)")\n    println("¿Prioridad urgente?: $envioEsUrgente")\n}`,
        outputSnippet: `Orden de envío para: Carlos Mendoza\nDestino: Av. Central 742 (2 paquetes)\n¿Prioridad urgente?: true`,
        byteTip: 'Nombra las variables booleanas como preguntas afirmativas: esVisible, tieneDescuento, estaHabilitado.',
        pitfallTip: 'Nunca uses nombres en clave como temp, data1, val2. En dos semanas no recordarás qué guardaban.',
        keyPoints: [
          'Las variables en Kotlin se escriben en lowerCamelCase.',
          'Los nombres deben ser descriptivos y revelar el propósito del dato.',
          'Las mayúsculas iniciales se reservan para nombres de Clases (como String, Int, User).'
        ]
      },
      {
        title: 'Legibilidad: el código se lee más veces de las que se escribe',
        explanation: `Un estudio famoso en ingeniería de software demostró que los programadores pasan 10 veces más tiempo leyendo y entendiendo código existente que escribiendo código nuevo.

Elegir nombres excelentes hace que tu código sea prácticamente autoexplicativo:`,
        codeSnippet: `fun main() {\n    val precioConDescuento = 85.0\n    val costoEnvioEstandar = 10.0\n    val totalPagar = precioConDescuento + costoEnvioEstandar\n    \n    println("Total listo para procesar: $$totalPagar")\n}`,
        outputSnippet: `Total listo para procesar: $95.0`,
        byteTip: 'No temas usar nombres largos si aportan claridad. precioConDescuento es infinitamente superior a pd.',
        pitfallTip: 'Evita abreviaturas crípticas que solo tú entiendas en el momento de programar.',
        keyPoints: [
          'Un buen nombre ahorra comentarios y previene confusiones.',
          'La consistencia en el estilo hace que el proyecto se sienta profesional.',
          'Sigue siempre la guía oficial de estilo de Kotlin (Kotlin Coding Conventions).'
        ]
      }
    ]
  },

  'kotlin-u02-l07': {
    subtitle: 'Inserta variables y expresiones directamente dentro de tus textos con el signo dólar ($).',
    analogy: 'Es como una carta preimpresa de felicitaciones donde los espacios en blanco tienen etiquetas como "[NOMBRE]" y "[PREMIO]". Al enviarla, el sistema rellena automáticamente esos huecos con los datos reales.',
    sections: [
      {
        title: 'Plantillas de texto (String Templates)',
        explanation: `En lenguajes antiguos, para unir texto con variables tenías que hacer concatenaciones engorrosas con el signo más:
\`"Hola " + nombre + ", tu puntaje es " + puntos + " puntos."\`

Kotlin simplifica esto radicalmente con las **plantillas de texto** (*String Templates*). Solo colocas el signo dólar (\`$\`) antes del nombre de la variable dentro de las comillas:
\`"Hola $nombre, tu puntaje es $puntos puntos."\`

Si necesitas evaluar una expresión u operación dentro del texto, usas llaves: **\`\${operación}\`**.`,
        codeSnippet: `fun main() {\n    val cliente = "Mariana"\n    val productos = 3\n    val precioUnitario = 15.0\n\n    // Variable simple con $nombre\n    println("Cliente: $cliente")\n    \n    // Expresión calculada con \${operación}\n    println("Total por $productos artículos: $\${productos * precioUnitario}")\n}`,
        outputSnippet: `Cliente: Mariana\nTotal por 3 artículos: $45.0`,
        byteTip: 'Si quieres imprimir el símbolo de dólar literal sin que Kotlin crea que es una variable, usa \\$ o escribe `\'$\'`.',
        pitfallTip: 'Olvidar las llaves en operaciones complejas: $precio * 2 solo imprimirá el precio seguido literalmente de " * 2".',
        keyPoints: [
          '$nombre inserta el valor directo de una variable en el texto.',
          '${expresion} evalúa operaciones y métodos directamente dentro de las comillas.',
          'Hace el código mucho más limpio y fácil de leer que concatenar con +.'
        ]
      },
      {
        title: 'Llamar métodos dentro de plantillas con \${...}',
        explanation: `La sintaxis de llaves \`\${...}\` es sumamente poderosa: te permite llamar funciones, métodos de texto o consultar propiedades sin tener que crear variables intermedias:`,
        codeSnippet: `fun main() {\n    val app = "android studio"\n    val version = 2024.1\n\n    // Llamamos al método .uppercase() directamente en la plantilla\n    println("Desarrollando en \${app.uppercase()} versión $version")\n    println("El nombre tiene \${app.length} caracteres.")\n}`,
        outputSnippet: `Desarrollando en ANDROID STUDIO versión 2024.1\nEl nombre tiene 14 caracteres.`,
        byteTip: 'Puedes anidar comparaciones o cálculos lógicos dentro de ${}: println("¿Aprobó?: ${nota >= 70}").',
        pitfallTip: 'No sobrecargues una plantilla con lógica kilométrica. Si el cálculo tiene más de una línea, extráelo a una variable previa.',
        keyPoints: [
          '${objeto.propiedad} permite acceder a miembros de un objeto dentro del String.',
          'Mejora la expresividad de los mensajes en consola y en interfaces Android.',
          'Es evaluado en tiempo de ejecución con un costo de rendimiento casi nulo.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 3: OPERADORES Y EXPRESIONES
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u03-l01': {
    subtitle: 'Realiza cálculos matemáticos esenciales con suma, resta, multiplicación, división y módulo.',
    analogy: 'Son las operaciones de una calculadora de bolsillo de toda la vida: sumas la cuenta del restaurante, restas el descuento, multiplicas por comensales y calculas el cambio que sobra.',
    sections: [
      {
        title: 'Los operadores aritméticos fundamentales',
        explanation: `Kotlin incluye todos los operadores matemáticos estándar para manipular números:
• **\`+\` (Suma):** Agrega dos valores numéricos.
• **\`-\` (Resta):** Resta el valor derecho del izquierdo.
• **\`*\` (Multiplicación):** Multiplica dos factores.
• **\`/\` (División):** Divide el primer número entre el segundo.
• **\`%\` (Módulo o Residuo):** Devuelve el sobrante exacto de una división entera.

El operador módulo (\`%\`) es súper útil: te permite saber si un número es par (si \`n % 2 == 0\`), limitar valores dentro de un rango o calcular minutos sobrantes.`,
        codeSnippet: `fun main() {\n    val a = 20\n    val b = 6\n\n    println("Suma           : \${a + b}")\n    println("Resta          : \${a - b}")\n    println("Multiplicación : \${a * b}")\n    println("División entera: \${a / b}")\n    println("Residuo (módulo): \${a % b}")\n}`,
        outputSnippet: `Suma           : 26\nResta          : 14\nMultiplicación : 120\nDivisión entera: 3\nResiduo (módulo): 2`,
        byteTip: 'En la división 20 / 6, el resultado es 3 porque ambos son enteros (Int) y el residuo 2 se descarta.',
        pitfallTip: 'Dividir entre cero con números enteros (x / 0) provocará un error de ejecución que detendrá tu app (ArithmeticException).',
        keyPoints: [
          '+, -, *, / realizan la aritmética básica.',
          '% entrega el resto de una división entera.',
          'Si ambos operandos son Int, el resultado de la división siempre será un Int truncado.'
        ]
      },
      {
        title: 'Casos prácticos del operador módulo (%)',
        explanation: `¿Cuándo se usa el residuo en la vida real?
• Para saber si un turno o número de lista es par o impar.
• Para convertir segundos totales a minutos y segundos restantes.
• Para repartir elementos en columnas de forma cíclica.`,
        codeSnippet: `fun main() {\n    val segundosTotales = 135\n    val minutos = segundosTotales / 60\n    val segundosRestantes = segundosTotales % 60\n\n    println("Tiempo transcurrido: $minutos min y $segundosRestantes seg.")\n}`,
        outputSnippet: `Tiempo transcurrido: 2 min y 15 seg.`,
        byteTip: '135 / 60 da 2 minutos enteros, y 135 % 60 da los 15 segundos sobrantes. ¡Elegante y directo!',
        pitfallTip: 'No uses módulo con números negativos sin antes revisar cómo maneja el signo Kotlin.',
        keyPoints: [
          'El módulo resuelve conversiones de tiempo y medidas cíclicas.',
          'numero % 2 == 0 es la fórmula universal para comprobar paridad.',
          'Es una operación nativa del procesador ultra-rápida.'
        ]
      }
    ]
  },

  'kotlin-u03-l02': {
    subtitle: 'Comprende la diferencia crucial entre dividir enteros y dividir números con decimales.',
    analogy: 'Si tienes 7 chocolates y los repartes entre 2 personas sin partirlos, a cada uno le tocan 3 chocolates enteros (división entera). Si partes el chocolate sobrante, a cada uno le tocan 3.5 chocolates (división decimal).',
    sections: [
      {
        title: 'División entera vs División decimal',
        explanation: `Uno de los errores más comunes de quienes inician en Kotlin ocurre al calcular promedios o porcentajes:

Si divides dos números enteros:
\`val resultado = 7 / 2 // Da 3, NO 3.5\`
Kotlin trunca los decimales (los borra) porque tanto el 7 como el 2 son de tipo \`Int\`. El resultado se mantiene como \`Int\`.

Para obtener el resultado con decimales exactos, al menos uno de los dos números debe ser de tipo \`Double\`:
\`val resultado = 7.0 / 2 // Da 3.5\``,
        codeSnippet: `fun main() {\n    val sumaPuntos = 25\n    val totalExamenes = 4\n\n    // División entre enteros (pierde decimales)\n    val promedioEntero = sumaPuntos / totalExamenes\n    println("Promedio con enteros: $promedioEntero")\n\n    // División con Double (conserva decimales)\n    val promedioExacto = sumaPuntos.toDouble() / totalExamenes\n    println("Promedio con decimales: $promedioExacto")\n}`,
        outputSnippet: `Promedio con enteros: 6\nPromedio con decimales: 6.25`,
        byteTip: 'Usa .toDouble() en cualquier variable entera antes de dividir para asegurar precisión decimal.',
        pitfallTip: 'Escribir val x: Double = 7 / 2 guardará 3.0, no 3.5. La división entera se ejecuta antes de guardar el valor.',
        keyPoints: [
          'Int / Int siempre produce un Int descartando la parte decimal.',
          'Double / Int o Int / Double produce un Double con precisión completa.',
          'Convierte al menos un término con .toDouble() cuando calcules porcentajes o promedios.'
        ]
      },
      {
        title: 'Cálculo de porcentajes y descuentos',
        explanation: `Al calcular descuentos en una tienda o el porcentaje de batería restante, la precisión decimal es indispensable:`,
        codeSnippet: `fun main() {\n    val bateriaActual = 43\n    val bateriaCapacidadMaxima = 50\n    \n    // Si hacemos 43 / 50 daría 0\n    val porcentaje = (bateriaActual.toDouble() / bateriaCapacidadMaxima) * 100\n    \n    println("Nivel de batería: $porcentaje%")\n}`,
        outputSnippet: `Nivel de batería: 86.0%`,
        byteTip: 'Al multiplicar por 100 después de la división obtienes el valor en porcentaje legible.',
        pitfallTip: 'Ten cuidado con redondear antes de tiempo: haz las conversiones al inicio de la fórmula.',
        keyPoints: [
          'Los cálculos de porcentajes siempre requieren aritmética de punto flotante (Double).',
          'La conversión explícita evita que tus resultados queden inesperadamente en cero.',
          'En Android, la representación de progreso en barras visuales usa valores entre 0.0 y 1.0.'
        ]
      }
    ]
  },

  'kotlin-u03-l03': {
    subtitle: 'Compara valores para tomar decisiones lógicas con ==, !=, <, >, <= y >=.',
    analogy: 'Es como la regla de altura en la entrada de una montaña rusa: el operador revisa si "tu altura >= 1.40 metros". Si la respuesta es verdadera, subes; si es falsa, esperas.',
    sections: [
      {
        title: 'Operadores de comparación (Relacionales)',
        explanation: `Los operadores de comparación confrontan dos valores y devuelven siempre un resultado de tipo **\`Boolean\`** (\`true\` o \`false\`):

• **\`==\` (Igual a):** \`true\` si ambos valores son exactamente idénticos.
• **\`!=\` (Diferente de):** \`true\` si los valores son distintos.
• **\`<\` (Menor que):** \`true\` si el valor izquierdo es menor.
• **\`>\` (Mayor que):** \`true\` si el valor izquierdo es mayor.
• **\`<=\` (Menor o igual que):** \`true\` si es menor o idéntico.
• **\`>=\` (Mayor o igual que):** \`true\` si es mayor o idéntico.`,
        codeSnippet: `fun main() {\n    val edadUsuario = 18\n    val edadMinimaPermitida = 18\n\n    println("¿Es exactamente igual?: \${edadUsuario == edadMinimaPermitida}")\n    println("¿Es mayor o igual?     : \${edadUsuario >= edadMinimaPermitida}")\n    println("¿Es menor de edad?     : \${edadUsuario < edadMinimaPermitida}")\n    println("¿Es diferente?         : \${edadUsuario != edadMinimaPermitida}")\n}`,
        outputSnippet: `¿Es exactamente igual?: true\n¿Es mayor o igual?     : true\n¿Es menor de edad?     : false\n¿Es diferente?         : false`,
        byteTip: 'En Kotlin, == compara el contenido real de los objetos (incluyendo Strings), a diferencia de Java donde comparaba punteros de memoria.',
        pitfallTip: 'No confundas el operador de comparación == (dos signos iguales) con el de asignación = (un solo signo).',
        keyPoints: [
          'Las comparaciones siempre devuelven un valor booleano: true o false.',
          '== y != verifican igualdad y diferencia.',
          '<, <=, >, >= evalúan orden numérico y jerárquico.'
        ]
      },
      {
        title: 'Comparar cadenas de texto en Kotlin',
        explanation: `En Kotlin puedes comparar textos directamente con \`==\`. El compilador revisa si las dos cadenas contienen exactamente las mismas letras:`,
        codeSnippet: `fun main() {\n    val rolUsuario = "ADMIN"\n    val rolRequerido = "ADMIN"\n    val tienePermiso = (rolUsuario == rolRequerido)\n    \n    println("¿Tiene permisos de administrador?: $tienePermiso")\n}`,
        outputSnippet: `¿Tiene permisos de administrador?: true`,
        byteTip: 'Si quieres comparar textos sin importar mayúsculas o minúsculas, usa texto1.equals(texto2, ignoreCase = true).',
        pitfallTip: '"Admin" == "ADMIN" dará false porque las mayúsculas cuentan como caracteres distintos.',
        keyPoints: [
          'Kotlin maneja la comparación de texto de forma segura con ==.',
          'Las comparaciones de texto son sensibles a mayúsculas por defecto.',
          'Estas comparaciones alimentan las sentencias condicionales if y when.'
        ]
      }
    ]
  },

  'kotlin-u03-l04': {
    subtitle: 'Combina múltiples condiciones con los operadores lógicos AND (&&), OR (||) y NOT (!).',
    analogy: 'Para abordar un avión necesitas pasaporte Y boleto (&&, ambos obligatorios). Para pagar en la cafetería puedes usar efectivo O tarjeta (||, basta con uno de los dos).',
    sections: [
      {
        title: 'Los operadores lógicos: &&, || y !',
        explanation: `Muchas decisiones en una aplicación dependen de más de una condición al mismo tiempo. Los operadores lógicos te permiten combinar expresiones booleanas:

• **\`&&\` (AND lógico):** Devuelve \`true\` **únicamente si ambas condiciones son verdaderas**. Si alguna es falsa, el resultado total es falso.
• **\`||\` (OR lógico):** Devuelve \`true\` si **al menos una de las condiciones es verdadera**. Solo da falso si todas fallan.
• **\`!\` (NOT / Negación):** Invierte el valor booleano. Transforma \`true\` en \`false\` y viceversa.`,
        codeSnippet: `fun main() {\n    val tieneBoleto = true\n    val tienePasaporte = true\n    val equipajeSobrepeso = false\n\n    // AND: Ambos deben cumplirse\n    val puedeAbordar = tieneBoleto && tienePasaporte\n    println("¿Puede abordar el vuelo?: $puedeAbordar")\n\n    // NOT: Invertir estado\n    val equipajeAprobado = !equipajeSobrepeso\n    println("¿Equipaje dentro del límite?: $equipajeAprobado")\n}`,
        outputSnippet: `¿Puede abordar el vuelo?: true\n¿Equipaje dentro del límite?: true`,
        byteTip: 'Kotlin utiliza cortocircuito lógico (short-circuit): en a && b, si a es falso, ni siquiera evalúa b porque ya sabe que el resultado será falso.',
        pitfallTip: 'Confundir && con || es uno de los orígenes más frecuentes de fallas de seguridad en inicios de sesión.',
        keyPoints: [
          '&& exige que todas las condiciones se cumplan.',
          '|| permite que se cumpla cualquiera de las condiciones.',
          '! invierte el valor de una condición.'
        ]
      },
      {
        title: 'Condiciones compuestas en sistemas reales',
        explanation: `Imagina el sistema de acceso a una plataforma de streaming: un usuario puede ver una película si tiene cuenta premium O si está disfrutando de su período de prueba, SIEMPRE Y CUANDO no tenga la cuenta suspendida:`,
        codeSnippet: `fun main() {\n    val esPremium = false\n    val periodoPruebaActivo = true\n    val cuentaSuspendida = false\n\n    val tieneSuscripcionValida = esPremium || periodoPruebaActivo\n    val puedeReproducir = tieneSuscripcionValida && !cuentaSuspendida\n\n    println("¿Permitir reproducción de video?: $puedeReproducir")\n}`,
        outputSnippet: `¿Permitir reproducción de video?: true`,
        byteTip: 'Agrupa condiciones intermedias en variables booleanas con nombres descriptivos como tieneSuscripcionValida. Tu código se leerá como prosa en español.',
        pitfallTip: 'Evita armar una sola línea con 6 operadores lógicos seguidos sin paréntesis; es casi imposible de depurar.',
        keyPoints: [
          'La modularización de condiciones compuestas previene errores lógicos.',
          'El cortocircuito ahorra procesamiento de operaciones costosas.',
          'Las expresiones lógicas modelan fielmente las reglas del negocio.'
        ]
      }
    ]
  },

  'kotlin-u03-l05': {
    subtitle: 'Aprende el orden matemático en que se evalúan las operaciones y cómo usar paréntesis para tener control total.',
    analogy: 'En una receta, primero mezclas la harina con el agua y después horneas. Si horneas la harina sola antes de mezclar, el pastel se arruina. El orden de los pasos cambia todo el resultado.',
    sections: [
      {
        title: 'Jerarquía de operadores y uso de paréntesis',
        explanation: `Al igual que en el álgebra que aprendiste en la escuela, en Kotlin las operaciones no se evalúan simplemente de izquierda a derecha. Tienen una **prioridad** estricta:

1. **Paréntesis \`()\`:** Se resuelven siempre primero, desde el más interno al más externo.
2. **Multiplicación, División y Módulo (\`*\`, \`/\`, \`%\`):** Tienen prioridad sobre la suma y resta.
3. **Suma y Resta (\`+\`, \`-\`):** Se evalúan a continuación.
4. **Comparaciones (\`<\`, \`>\`, \`==\`, etc.):** Se evalúan después de los cálculos matemáticos.
5. **Operadores lógicos (\`&&\`, \`||\`):** Se resuelven al final.`,
        codeSnippet: `fun main() {\n    // Sin paréntesis: 2 * 5 se ejecuta primero (da 10), luego 10 + 10 = 20\n    val sinParentesis = 10 + 2 * 5\n    println("10 + 2 * 5 = $sinParentesis")\n\n    // Con paréntesis: (10 + 2) da 12, luego 12 * 5 = 60\n    val conParentesis = (10 + 2) * 5\n    println("(10 + 2) * 5 = $conParentesis")\n}`,
        outputSnippet: `10 + 2 * 5 = 20\n(10 + 2) * 5 = 60`,
        byteTip: 'Ante la menor duda, agrega paréntesis. No solo garantizan el resultado matemático correcto, sino que le dejan clarísimo tu propósito a cualquiera que lea tu código.',
        pitfallTip: 'No confíes en que tú o tus colegas recuerden la tabla completa de prioridades de operadores lógicos. Los paréntesis son gratis y salvan vidas.',
        keyPoints: [
          'Los paréntesis tienen la máxima prioridad de evaluación.',
          'Multiplicación y división se ejecutan antes que sumas y restas.',
          'Usar paréntesis explícitos mejora la legibilidad y evita cálculos erróneos.'
        ]
      },
      {
        title: 'Fórmulas compuestas claras y seguras',
        explanation: `Mira el cálculo del área de un trapecio: \`((baseMayor + baseMenor) * altura) / 2\`.
Sin paréntesis, el compilador multiplicaría la base menor por la altura y dividiría entre 2, arruinando la fórmula:`,
        codeSnippet: `fun main() {\n    val baseMayor = 12.0\n    val baseMenor = 8.0\n    val altura = 5.0\n\n    val areaTrapecio = ((baseMayor + baseMenor) * altura) / 2.0\n    println("Área exacta del trapecio: $areaTrapecio cm²")\n}`,
        outputSnippet: `Área exacta del trapecio: 50.0 cm²`,
        byteTip: 'Estructurar fórmulas complejas con variables intermedias es aún más limpio que una sola línea kilométrica.',
        pitfallTip: 'Abrir un paréntesis y olvidar cerrarlo es un error clásico que el IDE señalará como un cierre pendiente.',
        keyPoints: [
          'Las fórmulas matemáticas deben proteger sus sumas previas con paréntesis.',
          'La claridad matemática se traduce en código robusto.',
          'El uso adecuado de paréntesis previene bugs matemáticos silenciosos.'
        ]
      }
    ]
  },

  'kotlin-u03-l06': {
    subtitle: 'Escribe código más corto y limpio utilizando asignaciones compuestas como +=, -=, *= y /=.',
    analogy: 'En lugar de decir "toma mi saldo actual, súmale diez monedas y guárdalo de nuevo en mi saldo", simplemente dices: "añade diez monedas a mi saldo" (+= 10).',
    sections: [
      {
        title: 'Operadores de asignación compuesta',
        explanation: `En programación es extraordinariamente común querer modificar el valor actual de una variable aplicando una operación sobre sí misma:

Forma tradicional y repetitiva:
\`puntos = puntos + 10\`
\`salario = salario * 1.05\`

Forma concisa y profesional con asignación compuesta:
\`puntos += 10\`
\`salario *= 1.05\`

Kotlin soporta todas las variantes principales:
• **\`+=\`**: Suma y asigna.
• **\`-=\`**: Resta y asigna.
• **\`*=\`**: Multiplica y asigna.
• **\`/\=\`**: Divide y asigna.
• **\`%=\`**: Calcula residuo y asigna.`,
        codeSnippet: `fun main() {\n    var monedas = 100\n    println("Monedas iniciales: $monedas")\n\n    monedas += 50 // Suma 50\n    println("Tras recompensa (+50): $monedas")\n\n    monedas -= 20 // Resta 20\n    println("Tras compra (-20): $monedas")\n\n    monedas *= 2 // Duplica\n    println("Tras bonus doble (*2): $monedas")\n}`,
        outputSnippet: `Monedas iniciales: 100\nTras recompensa (+50): 150\nTras compra (-20): 130\nTras bonus doble (*2): 260`,
        byteTip: 'También existen los operadores de incremento y decremento unitario: monedas++ suma 1, y monedas-- resta 1.',
        pitfallTip: 'Solo puedes usar estos operadores con variables var. Si intentas usarlos con val, el compilador marcará error.',
        keyPoints: [
          '+=, -=, *=, /= combinan una operación matemática con la reasignación en un solo paso.',
          'Hacen el código más conciso sin sacrificar claridad.',
          'Exigen que la variable de destino haya sido declarada con var.'
        ]
      },
      {
        title: 'Aplicación en carritos y contadores de juegos',
        explanation: `Este patrón es el pan de cada día en aplicaciones interactivas. Mira cómo acumular puntos en una partida:`,
        codeSnippet: `fun main() {\n    var score = 0\n    var combo = 1\n\n    // El jugador derrota enemigos\n    score += 100 * combo\n    combo++ // Aumentamos el multiplicador\n\n    score += 100 * combo\n    println("Score final: $score puntos con combo $combo")\n}`,
        outputSnippet: `Score final: 300 puntos con combo 2`,
        byteTip: 'combo++ aumenta la variable en 1 de forma limpia y directa.',
        pitfallTip: 'Ten cuidado entre ++variable (preincremento) y variable++ (posincremento) cuando lo uses dentro de una expresión.',
        keyPoints: [
          'Los contadores y combos se gestionan fluidamente con += y ++.',
          'Mejoran la velocidad de escritura y lectura del código.',
          'Son ampliamente utilizados en bucles y controladores de eventos en Android.'
        ]
      }
    ]
  },

  'kotlin-u03-l07': {
    subtitle: 'Aprende a transformar valores entre números enteros, decimales y cadenas de forma explícita.',
    analogy: 'Si tienes monedas en una alcancía y quieres anotarlas en un cheque, no puedes meter las monedas en el papel: debes convertir el valor de las monedas a números escritos en tinta.',
    sections: [
      {
        title: 'Conversiones numéricas en Kotlin',
        explanation: `A diferencia de otros lenguajes como C++ o JavaScript que convierten tipos de datos "a escondidas" (lo que a veces provoca bugs insólitos), **Kotlin no realiza conversiones numéricas implícitas**.

Si tienes un \`Int\`, no puedes asignarlo directamente a una variable \`Double\`, ni viceversa:
\`val entero: Int = 42\`
\`val decimal: Double = entero // ¡ERROR de compilación!\`

Para transformar un tipo en otro, Kotlin te ofrece métodos de conversión explícitos y seguros:
• **\`.toDouble()\`**: Convierte a número con decimales.
• **\`.toInt()\`**: Convierte a entero (descarta los decimales, no redondea).
• **\`.toString()\`**: Convierte cualquier valor a texto.`,
        codeSnippet: `fun main() {\n    val pesoEntero = 75\n    // Conversión explícita requerida por Kotlin\n    val pesoDecimal = pesoEntero.toDouble()\n    \n    val temperatura = 36.85\n    val temperaturaTruncada = temperatura.toInt() // Descarta los decimales: queda 36\n\n    println("Entero a Double: $pesoDecimal")\n    println("Double a Int (truncado): $temperaturaTruncada")\n}`,
        outputSnippet: `Entero a Double: 75.0\nDouble a Int (truncado): 36`,
        byteTip: '.toInt() simplemente corta los decimales. Si quieres redondear al más cercano, usa la función roundToInt() de la biblioteca matemática de Kotlin.',
        pitfallTip: 'Convertir un número muy grande a un tipo más pequeño (como Long a Int) puede causar desbordamiento si no cabe en el espacio asignado.',
        keyPoints: [
          'Kotlin exige conversiones de tipo explícitas para evitar pérdidas accidentales de datos.',
          '.toDouble(), .toInt() y .toString() son los métodos de conversión estándar.',
          '.toInt() trunca la parte decimal sin redondear.'
        ]
      },
      {
        title: 'Convertir textos a números de forma segura',
        explanation: `En las apps de Android, todo lo que un usuario escribe en un campo de texto (EditText) llega como \`String\`. Si quieres sumarlo o calcular precios, debes convertir ese texto a número:`,
        codeSnippet: `fun main() {\n    val entradaUsuario = "45"\n    val cantidadComprada = entradaUsuario.toInt()\n    val total = cantidadComprada * 10\n\n    println("Texto '$entradaUsuario' convertido a número. Total calculado: $total")\n}`,
        outputSnippet: `Texto '45' convertido a número. Total calculado: 450`,
        byteTip: 'En unidades posteriores aprenderás toIntOrNull(), que previene que la app se caiga si el usuario escribe letras en vez de números.',
        pitfallTip: 'Si intentas hacer "hola".toInt(), el programa lanzará una excepción NumberFormatException. Siempre valida las entradas del usuario.',
        keyPoints: [
          'Las entradas de interfaz de usuario siempre ingresan como cadenas de texto.',
          'La conversión explícita a Int o Double permite procesar cálculos con lo escrito por el usuario.',
          'Validar que el texto sea numérico antes de convertir previene cierres inesperados de la app.'
        ]
      }
    ]
  }
};
