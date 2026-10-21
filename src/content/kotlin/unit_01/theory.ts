import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_01_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u01-l01": {
    "id": "kt-th-u01-l01",
    "lessonId": "kotlin-u01-l01",
    "pathId": "kotlin",
    "unitId": 1,
    "levelId": 1,
    "title": "1. Qué es un programa y para qué sirve",
    "subtitle": "Aprende qué es el software y cómo las computadoras ejecutan instrucciones para resolver tareas reales.",
    "estimatedMinutes": 8,
    "analogy": "Un programa es como una receta de cocina: lista los ingredientes necesarios y describe cada paso en orden estricto. Si sigues los pasos al pie de la letra, obtendrás el platillo esperado.",
    "video": {
      "title": "Curso de Kotlin Desde Cero: Primeros Pasos y Algoritmos",
      "channel": "MoureDev by Brais Moure",
      "duration": "58:20",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español."
    },
    "sections": [
      {
        "title": "¿Qué es un programa y cómo funciona?",
        "explanation": "Una computadora es una máquina increíblemente veloz, pero no tiene iniciativa propia: no puede adivinar qué necesitas ni improvisar soluciones. Para que haga algo útil, debemos darle instrucciones precisas escritas en un lenguaje que entienda, como **Kotlin**.\n\nUn **programa informático** es simplemente una secuencia lógica y ordenada de instrucciones que le dicen a la máquina qué tareas ejecutar. \n\nEn la práctica, cada instrucción le pide al sistema realizar una acción concreta:\n• Guardar un dato en la memoria (como el nombre de un usuario o el total de una compra).\n• Realizar un cálculo matemático (sumar impuestos, calcular promedios).\n• Tomar una decisión (si la contraseña es correcta, abrir la app; si no, mostrar un aviso).\n• Mostrar un resultado en pantalla para que la persona interactúe con él.",
        "codeSnippet": "fun main() {\n    // Le decimos a la computadora que muestre un mensaje en pantalla\n    println(\"¡Hola! Tu primer programa en Kotlin está funcionando.\")\n    println(\"La máquina ejecutó esta instrucción paso a paso.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¡Hola! Tu primer programa en Kotlin está funcionando.\nLa máquina ejecutó esta instrucción paso a paso.",
        "byteTip": "Escribe siempre tu código pensando en que otra persona (o tú mismo en unos meses) lo leerá. La claridad es más importante que los trucos rebuscados.",
        "pitfallTip": "No des por sentado ningún paso intermedio. Si olvidas decirle al programa que guarde un dato antes de usarlo, fallará.",
        "keyPoints": [
          "Un programa es una lista ordenada de instrucciones ejecutadas por la computadora.",
          "La computadora ejecuta exactamente lo que escribes, sin adivinar intenciones.",
          "Kotlin te permite escribir instrucciones claras, modernas y seguras."
        ]
      },
      {
        "title": "Aplicación en el mundo real y buenas prácticas",
        "explanation": "Todas las aplicaciones que usas a diario (como WhatsApp, Spotify o la app de tu banco) son programas compuestos por miles de instrucciones coordinadas.\n\nEn el desarrollo para Android con Kotlin, cada pantalla y botón responde a un programa que procesa eventos:\n1. **Automatización:** Ejecutar tareas repetitivas en milisegundos sin cansancio ni errores humanos.\n2. **Confiabilidad:** Si el algoritmo está bien diseñado, producirá siempre el resultado correcto.\n3. **Escalabilidad:** El mismo programa puede atender a un solo usuario o a millones al mismo tiempo.",
        "codeSnippet": "fun main() {\n    val appNombre = \"MiBanco Móvil\"\n    val version = 1.0\n    println(\"Iniciando $appNombre v$version...\")\n    println(\"Verificando conexión segura...\")\n    println(\"Listo para recibir transacciones.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Iniciando MiBanco Móvil v1.0...\nVerificando conexión segura...\nListo para recibir transacciones.",
        "byteTip": "En Kotlin puedes insertar variables directamente dentro de un texto usando el signo dólar ($). Esto se llama plantilla de texto (String template).",
        "pitfallTip": "Evita crear programas desordenados sin comentarios. Un buen programador documenta el propósito general de su solución.",
        "keyPoints": [
          "El software transforma problemas de la vida cotidiana en soluciones automatizadas.",
          "Cada botón y pantalla de una app Android ejecuta un bloque de instrucciones.",
          "Un código bien estructurado facilita agregar nuevas funciones sin romper lo que ya funciona."
        ]
      }
    ]
  },
  "kotlin-u01-l02": {
    "id": "kt-th-u01-l02",
    "lessonId": "kotlin-u01-l02",
    "pathId": "kotlin",
    "unitId": 1,
    "levelId": 2,
    "title": "2. Entrada, procesamiento y salida",
    "subtitle": "Comprende el ciclo fundamental de todo sistema: recibir datos, transformarlos y presentar el resultado.",
    "estimatedMinutes": 8,
    "analogy": "Piensa en una licuadora: colocas frutas y leche (Entrada), el motor gira a gran velocidad mezclando los ingredientes (Proceso), y viertes un delicioso batido en tu vaso (Salida).",
    "video": {
      "title": "Curso de Kotlin Desde Cero: Primeros Pasos y Algoritmos",
      "channel": "MoureDev by Brais Moure",
      "duration": "58:20",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español."
    },
    "sections": [
      {
        "title": "El modelo Entrada - Proceso - Salida (IPO)",
        "explanation": "Sin importar si estás programando una calculadora básica o una inteligencia artificial, prácticamente todo programa sigue el mismo flujo continuo de tres etapas:\n\n1. **Entrada (Input):** Los datos que el programa recibe del exterior. Pueden venir del teclado, de un sensor táctil en tu teléfono, de una cámara o de una base de datos en internet.\n2. **Procesamiento:** La transformación lógica de esos datos. Aquí es donde el programa calcula operaciones matemáticas, filtra información o compara valores.\n3. **Salida (Output):** El resultado que se entrega al usuario, ya sea un mensaje en la consola, una animación en pantalla, un sonido o un registro guardado.",
        "codeSnippet": "fun main() {\n    // 1. Entrada de datos\n    val precioProducto = 250.0\n    val cantidadComprada = 3\n\n    // 2. Procesamiento (cálculo del total)\n    val total = precioProducto * cantidadComprada\n\n    // 3. Salida de resultados\n    println(\"Detalle de compra:\")\n    println(\"Total a pagar: $$total\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Detalle de compra:\nTotal a pagar: $750.0",
        "byteTip": "Separa mentalmente las tres fases al resolver cualquier reto. Primero define qué datos necesitas, luego cómo los transformas y finalmente qué mostrarás.",
        "pitfallTip": "Intentar calcular un resultado antes de haber definido o recibido las entradas provocará un error de variable no inicializada.",
        "keyPoints": [
          "Entrada: recopilación de datos iniciales necesarios para trabajar.",
          "Proceso: aplicación de fórmulas, condiciones y lógica sobre los datos.",
          "Salida: comunicación del resultado final al usuario o a otro sistema."
        ]
      },
      {
        "title": "Por qué la salida es vital en una aplicación",
        "explanation": "Un programa que procesa datos a toda velocidad pero nunca muestra ni guarda una salida es, para el usuario, indistinguible de un programa congelado o inútil.\n\nEn Android, la salida no siempre es texto en una terminal negra:\n• Puede ser actualizar el texto de una etiqueta (TextView).\n• Activar una vibración o sonido de confirmación.\n• Cambiar el color de un indicador a verde cuando una operación es exitosa.\n\nTener claro cuál es la salida esperada te ayuda a diseñar mejor cada paso previo.",
        "codeSnippet": "fun main() {\n    // Entrada: datos de una calificación\n    val calificacionExamen = 85\n    val calificacionProyecto = 90\n\n    // Proceso: promedio ponderado\n    val promedioFinal = (calificacionExamen + calificacionProyecto) / 2.0\n\n    // Salida clara y amigable\n    println(\"Calificación final obtenida: $promedioFinal puntos.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Calificación final obtenida: 87.5 puntos.",
        "byteTip": "Usar 2.0 en lugar de 2 al dividir fuerza a Kotlin a calcular el promedio con decimales exactos en vez de truncar el número.",
        "pitfallTip": "No confundas el cálculo interno con la visualización. El procesamiento debe ser numérico y la salida debe tener un formato fácil de leer para personas.",
        "keyPoints": [
          "La salida comunica el valor del trabajo realizado por la máquina.",
          "En apps móviles, la salida suele presentarse en la interfaz visual del usuario.",
          "Diseñar la salida esperada desde el inicio aclara qué operaciones intermedias necesitas."
        ]
      }
    ]
  },
  "kotlin-u01-l03": {
    "id": "kt-th-u01-l03",
    "lessonId": "kotlin-u01-l03",
    "pathId": "kotlin",
    "unitId": 1,
    "levelId": 3,
    "title": "3. Algoritmos: pasos ordenados, claros y finitos",
    "subtitle": "Aprende a formular algoritmos paso a paso que no dejen lugar a ambigüedades ni dudas.",
    "estimatedMinutes": 8,
    "analogy": "Un algoritmo es como armar un mueble de catálogo: cada pieza tiene un número y las instrucciones te indican el orden exacto. Si colocas los tornillos antes de alinear las tablas, el mueble quedará chueco.",
    "video": {
      "title": "Curso de Kotlin Desde Cero: Primeros Pasos y Algoritmos",
      "channel": "MoureDev by Brais Moure",
      "duration": "58:20",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español."
    },
    "sections": [
      {
        "title": "¿Qué es un algoritmo?",
        "explanation": "Un **algoritmo** es un conjunto de pasos lógicos, ordenados y finitos que resuelven un problema o realizan una tarea específica.\n\nPara que un algoritmo sea verdaderamente efectivo en programación, debe cumplir tres propiedades fundamentales:\n• **Preciso:** Cada paso debe estar libre de ambigüedades. No puedes decirle a la máquina \"agrega un poco de saldo\", debes indicarle exactamente cuánto: \"saldo = saldo + 50\".\n• **Ordenado:** La secuencia importa. No puedes consultar el saldo de una cuenta antes de haberla creado.\n• **Finito:** Debe tener un inicio claro y un final garantizado. Si un algoritmo se queda dando vueltas para siempre, el programa se congelará (bucle infinito).",
        "codeSnippet": "fun main() {\n    println(\"Paso 1: Solicitar número al usuario\")\n    val numero = 14\n\n    println(\"Paso 2: Calcular el residuo al dividir entre 2\")\n    val residuo = numero % 2\n\n    println(\"Paso 3: Determinar si el residuo es cero\")\n    val esPar = (residuo == 0)\n\n    println(\"Paso 4: Emitir resultado final -> ¿Es par?: $esPar\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Paso 1: Solicitar número al usuario\nPaso 2: Calcular el residuo al dividir entre 2\nPaso 3: Determinar si el residuo es cero\nPaso 4: Emitir resultado final -> ¿Es par?: true",
        "byteTip": "Antes de tocar el teclado para escribir código en Kotlin, redacta los pasos en una libreta en tu propio idioma (pseudocódigo). Te ahorrará horas de tropiezos.",
        "pitfallTip": "Cuidado con los pasos que dependen de condiciones que nunca se cumplen. Asegúrate de que tu solución siempre encuentre un camino de salida.",
        "keyPoints": [
          "Un algoritmo define la estrategia paso a paso antes de traducirla a código.",
          "Debe ser finito: siempre debe llegar a una conclusión.",
          "Debe ser determinista: con los mismos datos de entrada produce siempre el mismo resultado."
        ]
      },
      {
        "title": "Algoritmos en situaciones cotidianas",
        "explanation": "Todos los días ejecutas algoritmos sin darte cuenta: al cepillarte los dientes, al preparar café o al calcular el cambio en el supermercado.\n\nEn el desarrollo de software, descomponer problemas grandes en pasos pequeños y simples se conoce como **descomposición algorítmica**.\nPor ejemplo, para validar si un usuario puede iniciar sesión:\n1. Recibir correo y contraseña.\n2. Limpiar posibles espacios en blanco accidentales.\n3. Comparar con los registros almacenados.\n4. Si coincide, autorizar el acceso; si no, advertir del error.",
        "codeSnippet": "fun main() {\n    val contrasenaIngresada = \"secreto123\"\n    val contrasenaCorrecta = \"secreto123\"\n\n    println(\"Verificando credenciales...\")\n    val accesoPermitido = (contrasenaIngresada == contrasenaCorrecta)\n\n    println(\"Estado del inicio de sesión: $accesoPermitido\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Verificando credenciales...\nEstado del inicio de sesión: true",
        "byteTip": "El operador == en Kotlin compara el contenido de dos valores para verificar si son exactamente iguales.",
        "pitfallTip": "Comparar valores con mayúsculas y minúsculas sin normalizarlos puede causar que contraseñas o correos parezcan incorrectos.",
        "keyPoints": [
          "Descomponer un problema complejo en pasos elementales simplifica la programación.",
          "Cada paso debe resolver un único subproblema concreto.",
          "La lógica algorítmica es universal y se aplica en cualquier lenguaje de programación."
        ]
      }
    ]
  },
  "kotlin-u01-l04": {
    "id": "kt-th-u01-l04",
    "lessonId": "kotlin-u01-l04",
    "pathId": "kotlin",
    "unitId": 1,
    "levelId": 4,
    "title": "4. Seguimiento manual de instrucciones",
    "subtitle": "Rastrea el valor de tus variables línea por línea para entender la ejecución antes de compilar.",
    "estimatedMinutes": 8,
    "analogy": "Es como el cuaderno de un detective que anota cronológicamente los movimientos de cada sospechoso: registras qué tenía cada variable en cada instante exacto.",
    "video": {
      "title": "Curso de Kotlin Desde Cero: Primeros Pasos y Algoritmos",
      "channel": "MoureDev by Brais Moure",
      "duration": "58:20",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español."
    },
    "sections": [
      {
        "title": "La prueba de escritorio (Seguimiento manual)",
        "explanation": "La **prueba de escritorio** es la técnica mediante la cual tú, como programador, simulas ser la computadora. Tomas papel y lápiz, lees el código línea por línea y vas anotando cómo cambian los valores en la memoria.\n\n¿Por qué es una habilidad indispensable?\n• Te ayuda a descubrir errores lógicos antes de ejecutar el programa.\n• Te permite entender código escrito por otras personas sin tener que adivinar.\n• Desarrolla tu intuición sobre cómo fluye la ejecución secuencial: de arriba hacia abajo, instrucción por instrucción.",
        "codeSnippet": "fun main() {\n    var balance = 100\n    println(\"Inicio: balance = $balance\")\n\n    balance = balance + 50 // Ahora vale 150\n    println(\"Depósito: balance = $balance\")\n\n    balance = balance - 30 // Ahora vale 120\n    println(\"Retiro: balance = $balance\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Inicio: balance = 100\nDepósito: balance = 150\nRetiro: balance = 120",
        "byteTip": "Cuando tengas una duda sobre por qué tu código no da el valor esperado, imprime las variables intermedias con println() para rastrearlas en vivo.",
        "pitfallTip": "No asumas que una variable conserva su valor original si fue reasignada más abajo. Siempre busca la última asignación ejecutada.",
        "keyPoints": [
          "La ejecución es secuencial: fluye de arriba hacia abajo.",
          "Una variable guarda un solo valor activo en memoria a la vez.",
          "El seguimiento manual te permite detectar fallas de cálculo antes de probar la app."
        ]
      },
      {
        "title": "Depuración y rastreo de estados intermedios",
        "explanation": "A medida que tus programas crezcan, tendrás varias variables interactuando al mismo tiempo. Saber rastrear sus estados te convertirá en un programador seguro y autónomo.\n\nMira este ejemplo con dos variables intercambiando y combinando datos:",
        "codeSnippet": "fun main() {\n    var x = 10\n    var y = 20\n    \n    // Sumamos y reasignamos\n    x = x + y // x pasa a valer 30\n    y = x - y // y pasa a valer 10\n    \n    println(\"Valores finales -> x: $x, y: $y\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Valores finales -> x: 30, y: 10",
        "byteTip": "Este truco matemático permite intercambiar valores entre variables sin usar una tercera variable temporal.",
        "pitfallTip": "Confundir el operador de asignación (=) con una igualdad matemática. En programación, x = x + y significa \"calcula x + y y guarda el resultado en x\".",
        "keyPoints": [
          "El signo = asigna el resultado de la derecha a la variable ubicada a la izquierda.",
          "Rastrear paso a paso elimina las conjeturas en el desarrollo de software.",
          "Las herramientas de depuración (debuggers) de Android Studio hacen este seguimiento de forma interactiva."
        ]
      }
    ]
  },
  "kotlin-u01-l05": {
    "id": "kt-th-u01-l05",
    "lessonId": "kotlin-u01-l05",
    "pathId": "kotlin",
    "unitId": 1,
    "levelId": 5,
    "title": "5. Estructura básica: fun main()",
    "subtitle": "Conoce la función fun main(), la puerta de entrada oficial donde arranca cualquier programa en Kotlin.",
    "estimatedMinutes": 8,
    "analogy": "La función main() es como la llave de encendido de un automóvil: no importa cuántos sistemas modernos tenga el vehículo, nada comienza a andar hasta que giras la llave en el punto de arranque.",
    "video": {
      "title": "Curso de Kotlin Desde Cero: Primeros Pasos y Algoritmos",
      "channel": "MoureDev by Brais Moure",
      "duration": "58:20",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español."
    },
    "sections": [
      {
        "title": "La función principal: fun main()",
        "explanation": "Todo programa escrito en Kotlin necesita saber exactamente por dónde empezar a ejecutarse. Ese punto de inicio universal es la función llamada **`main()`**.\n\nDesglosemos su estructura oficial:\n• **`fun`**: Es la palabra clave que usa Kotlin para declarar una función (un bloque de código reutilizable).\n• **`main`**: Es el nombre reservado que el compilador y la máquina virtual buscan automáticamente al iniciar la aplicación.\n• **`()`**: Los paréntesis indican que es una función. Opcionalmente pueden recibir parámetros del sistema.\n• **`{ ... }`**: Las llaves delimitan el cuerpo de la función. Todo el código que coloques dentro de estas llaves se ejecutará en orden.",
        "codeSnippet": "// Este es el punto de partida de nuestra aplicación en Kotlin\nfun main() {\n    println(\"¡Bienvenido al entorno de ejecución de Kotlin!\")\n    println(\"Cualquier instrucción dentro de estas llaves se ejecutará.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¡Bienvenido al entorno de ejecución de Kotlin!\nCualquier instrucción dentro de estas llaves se ejecutará.",
        "byteTip": "En versiones modernas de Kotlin no es necesario escribir parámetros dentro de main() a menos que vayas a recibir argumentos desde la terminal.",
        "pitfallTip": "Si escribes código suelto fuera de cualquier función o clase, Kotlin no sabrá en qué momento ejecutarlo y generará un error de compilación.",
        "keyPoints": [
          "fun es la palabra clave para definir funciones en Kotlin.",
          "main() es el punto de entrada obligatorio de los programas ejecutables.",
          "Todo el código ejecutable inicial debe residir dentro de las llaves de main()."
        ]
      },
      {
        "title": "Cómo interactúa main() con Android",
        "explanation": "En aplicaciones completas de Android, el sistema operativo se encarga de llamar a métodos equivalentes (como `onCreate()`), pero el concepto es idéntico: siempre existe un punto de entrada donde se inicializa la memoria, se configuran las vistas y se arranca la lógica.\n\nComprender la anatomía de `fun main()` te da la base para entender cualquier otra función en Kotlin:",
        "codeSnippet": "fun main() {\n    val saludo = \"Sistema listo\"\n    val timestamp = 1718000000\n    println(\"$saludo [código de inicio: $timestamp]\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Sistema listo [código de inicio: 1718000000]",
        "byteTip": "Puedes tener tantas funciones secundarias como quieras en tu proyecto, pero solo una puede ser el main() principal de arranque.",
        "pitfallTip": "Olvidar cerrar la llave final } de la función provocará un error de sintaxis de tipo \"Expecting a top level declaration\".",
        "keyPoints": [
          "El flujo de inicio es el pilar de la arquitectura de cualquier app.",
          "Todas las funciones en Kotlin comparten la misma sintaxis básica con fun nombre().",
          "Mantener main() limpio delegando tareas a otras funciones es una buena práctica."
        ]
      }
    ]
  },
  "kotlin-u01-l06": {
    "id": "kt-th-u01-l06",
    "lessonId": "kotlin-u01-l06",
    "pathId": "kotlin",
    "unitId": 1,
    "levelId": 6,
    "title": "6. Mostrar información con print() y println()",
    "subtitle": "Comunica información en pantalla de forma limpia con print() y println().",
    "estimatedMinutes": 8,
    "analogy": "Piensa en una máquina de escribir: print() escribe una letra tras otra en el mismo renglón, mientras que println() escribe el texto y de inmediato presiona la palanca para bajar al renglón siguiente.",
    "video": {
      "title": "Curso de Kotlin Desde Cero: Primeros Pasos y Algoritmos",
      "channel": "MoureDev by Brais Moure",
      "duration": "58:20",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español."
    },
    "sections": [
      {
        "title": "Diferencia entre print() y println()",
        "explanation": "Para comunicarte con el usuario o revisar qué está pasando dentro de tu programa, la herramienta más inmediata es la salida a consola. Kotlin ofrece dos funciones muy similares pero con una diferencia clave:\n\n• **`println()`** (con *ln* al final, de *line*): Imprime el mensaje y **hace un salto de línea** automático. La siguiente instrucción que imprima aparecerá en el renglón de abajo.\n• **`print()`** (sin *ln*): Imprime el mensaje pero **mantiene el cursor en la misma línea**. Lo siguiente que imprimas aparecerá pegado justo a la derecha.",
        "codeSnippet": "fun main() {\n    // Usando print (se mantienen en el mismo renglón)\n    print(\"Cargando: \")\n    print(\"50% \")\n    print(\"100%\\n\") // \\n fuerza un salto manual\n\n    // Usando println (cada uno en su propio renglón)\n    println(\"Paso 1 completado.\")\n    println(\"Paso 2 completado.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Cargando: 50% 100%\nPaso 1 completado.\nPaso 2 completado.",
        "byteTip": "Usa \\n dentro de cualquier texto para insertar un salto de línea sin tener que escribir múltiples llamadas a println().",
        "pitfallTip": "Llamar a print() repetidamente sin espacios intermedios provocará que las palabras queden pegadas sin separación (\"HolaMundo\").",
        "keyPoints": [
          "println() agrega un salto de línea al final del texto.",
          "print() continúa imprimiendo en el mismo renglón actual.",
          "Son las herramientas esenciales para inspeccionar valores durante el aprendizaje."
        ]
      },
      {
        "title": "Formato limpio de salidas en consola",
        "explanation": "Mostrar mensajes claros y bien estructurados facilita enormemente la lectura de los resultados de tus pruebas.\n\nPuedes combinar texto con números, resultados de operaciones y caracteres especiales para dar formato de reporte profesional:",
        "codeSnippet": "fun main() {\n    val usuario = \"Sofía\"\n    val nivel = 5\n    val vidas = 3\n\n    println(\"=== ESTADO DEL JUGADOR ===\")\n    println(\"Usuario : $usuario\")\n    println(\"Nivel   : $nivel\")\n    println(\"Vidas   : $vidas\")\n    println(\"==========================\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "=== ESTADO DEL JUGADOR ===\nUsuario : Sofía\nNivel   : 5\nVidas   : 3\n==========================",
        "byteTip": "Puedes alinear visualmente la salida agregando espacios antes de los dos puntos para que los datos formen una tabla limpia.",
        "pitfallTip": "No uses println() para mostrar contraseñas reales ni datos bancarios sensibles en consolas de producción en Android (Logcat).",
        "keyPoints": [
          "Un formato visual ordenado ayuda a comprender rápidamente los resultados.",
          "Las plantillas $variable simplifican la creación de reportes.",
          "En Android profesional, println() se complementa con la clase Log (Log.d, Log.e)."
        ]
      }
    ]
  },
  "kotlin-u01-l07": {
    "id": "kt-th-u01-l07",
    "lessonId": "kotlin-u01-l07",
    "pathId": "kotlin",
    "unitId": 1,
    "levelId": 7,
    "title": "7. Comentarios en el código",
    "subtitle": "Aprende a documentar tu código con comentarios que explican el porqué de tus decisiones.",
    "estimatedMinutes": 8,
    "analogy": "Los comentarios son como las notas adhesivas que dejas en el refrigerador: le explican a tu familia qué hay en cada recipiente sin cambiar el sabor de la comida.",
    "video": {
      "title": "Curso de Kotlin Desde Cero: Primeros Pasos y Algoritmos",
      "channel": "MoureDev by Brais Moure",
      "duration": "58:20",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español."
    },
    "sections": [
      {
        "title": "Comentarios en Kotlin: de una línea y multilínea",
        "explanation": "A medida que escribas programas más interesantes, te darás cuenta de que el código no solo lo lee la máquina: lo lees tú y lo leen tus compañeros de equipo. Los **comentarios** son notas escritas en lenguaje humano que el compilador de Kotlin ignora por completo.\n\nExisten dos tipos principales en Kotlin:\n• **Comentarios de una sola línea (`//`):** Todo lo que escribas a la derecha de dos barras diagonales en esa misma línea será ignorado.\n• **Comentarios multilínea (`/* ... */`):** Ideales para párrafos explicativos largos o para desactivar temporalmente un bloque entero de código mientras buscas un error.",
        "codeSnippet": "fun main() {\n    // Este es un comentario de una sola línea que explica el propósito:\n    val tasaImpuesto = 0.16 // IVA estándar del 16%\n\n    /* \n       Este es un comentario multilínea.\n       Podemos escribir varias líneas explicativas\n       sin preocuparnos por la sintaxis de Kotlin.\n    */\n    val precioNeto = 100.0\n    val total = precioNeto * (1 + tasaImpuesto)\n    println(\"Total con IVA: $$total\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Total con IVA: $116.0",
        "byteTip": "En la mayoría de los editores modernos (como Android Studio o VS Code), puedes comentar o descomentar una línea rápidamente pulsando Ctrl + / (o Cmd + / en Mac).",
        "pitfallTip": "No comentes lo obvio (por ejemplo, // declara x. var x = 5). Comenta el porqué de una decisión técnica o de negocio.",
        "keyPoints": [
          "Los comentarios son invisibles para la máquina y no afectan el rendimiento.",
          "// se utiliza para notas cortas en una sola línea.",
          "/* ... */ se utiliza para bloques largos o documentación de cabecera."
        ]
      },
      {
        "title": "La regla de oro: código autodocumentado",
        "explanation": "El mejor código es aquel que resulta tan claro y ordenado que casi no necesita comentarios para entenderse. Elige nombres descriptivos para tus variables y funciones, y reserva los comentarios para explicar el **contexto** o decisiones complejas.\n\nMira la diferencia entre un código críptico y uno limpio:",
        "codeSnippet": "fun main() {\n    // Código limpio con nombres expresivos:\n    val limiteIntentosLogin = 3\n    val intentosActuales = 1\n    val intentosRestantes = limiteIntentosLogin - intentosActuales\n    \n    println(\"Te quedan $intentosRestantes intentos antes de bloquear la cuenta.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Te quedan 2 intentos antes de bloquear la cuenta.",
        "byteTip": "Si una función o variable necesita tres líneas de comentario para entenderse, probablemente su nombre debería ser más claro.",
        "pitfallTip": "Evita dejar comentarios obsoletos. Si cambias el funcionamiento del código, actualiza también los comentarios para no confundir a tu equipo.",
        "keyPoints": [
          "El código limpio y bien nombrado reduce la necesidad de comentarios excesivos.",
          "Usa comentarios para explicar motivos de diseño, reglas de negocio o advertencias.",
          "Mantén siempre sincronizados tus comentarios con el código real."
        ]
      }
    ]
  }
};
