import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_05_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u05-l01": {
    "id": "kt-th-u05-l01",
    "lessonId": "kotlin-u05-l01",
    "pathId": "kotlin",
    "unitId": 5,
    "levelId": 1,
    "title": "1. Ciclo for",
    "subtitle": "Automatiza tareas repetitivas con el bucle for sobre secuencias y colecciones.",
    "estimatedMinutes": 8,
    "analogy": "Es como pasar lista en un aula escolar: el profesor toma la lista y nombra en orden al estudiante 1, luego al 2, al 3, hasta llegar al último de la lista.",
    "video": {
      "title": "Bucles en Kotlin: For, While y Rangos",
      "channel": "AristiDevs",
      "duration": "32:00",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Iteración sobre rangos, step, downTo, ciclos while y control de flujo con break y continue."
    },
    "sections": [
      {
        "title": "El bucle for en Kotlin",
        "explanation": "Imagina que necesitas imprimir los números del 1 al 100 o enviar un correo a 500 clientes. Escribir 500 líneas idénticas a mano sería absurdo e imposible de mantener.\n\nLos **bucles** (*loops*) le indican a la computadora que repita un bloque de código tantas veces como sea necesario.\n\nEl bucle **`for`** en Kotlin se lee de forma muy intuitiva:\n`for (elemento in secuencia) {`\n`    // Se ejecuta una vez por cada elemento`\n`}`\n\nLa forma más sencilla de crear una secuencia es con un **rango numérico**: `1..5` significa \"los números del 1 al 5 inclusive\".",
        "codeSnippet": "fun main() {\n    println(\"Iniciando cuenta regresiva de lanzamiento:\")\n\n    // Itera desde el 1 hasta el 5 inclusive\n    for (segundo in 1..5) {\n        println(\"Segundo $segundo...\")\n    }\n\n    println(\"¡Despegue exitoso!\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Iniciando cuenta regresiva de lanzamiento:\nSegundo 1...\nSegundo 2...\nSegundo 3...\nSegundo 4...\nSegundo 5...\n¡Despegue exitoso!",
        "byteTip": "La variable declarada en el for (en este caso segundo) es de solo lectura (val) automáticamente dentro del bucle.",
        "pitfallTip": "El rango 1..5 incluye el número 5 final. Si quisieras excluir el último número, usarías 1 until 5.",
        "keyPoints": [
          "for repite un bloque de instrucciones sobre un rango o colección.",
          "1..5 genera una secuencia cerrada que incluye ambos extremos.",
          "La variable de iteración cambia de valor automáticamente en cada vuelta."
        ]
      },
      {
        "title": "Cálculos acumulados dentro de un for",
        "explanation": "Uno de los usos más habituales del `for` es acumular totales o procesar series numéricas:",
        "codeSnippet": "fun main() {\n    var sumaTotal = 0\n\n    // Sumamos los primeros 5 números: 1 + 2 + 3 + 4 + 5\n    for (i in 1..5) {\n        sumaTotal += i\n    }\n\n    println(\"La suma de los números del 1 al 5 es: $sumaTotal\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "La suma de los números del 1 al 5 es: 15",
        "byteTip": "La variable de iteración suele llamarse i (por índice o iterador) en conteos genéricos.",
        "pitfallTip": "No reinicies tu acumulador dentro del for, porque se borraría en cada vuelta. Inicialízalo siempre antes de entrar al bucle.",
        "keyPoints": [
          "Los acumuladores viven fuera del bucle y recogen el resultado de cada vuelta.",
          "for se ejecuta un número predeterminado y predecible de veces.",
          "Es el bucle más seguro porque garantiza terminar al agotarse el rango."
        ]
      }
    ]
  },
  "kotlin-u05-l02": {
    "id": "kt-th-u05-l02",
    "lessonId": "kotlin-u05-l02",
    "pathId": "kotlin",
    "unitId": 5,
    "levelId": 2,
    "title": "2. Rangos, pasos y recorridos descendentes",
    "subtitle": "Domina los rangos avanzados: saltos personalizados con step y recorridos hacia atrás con downTo.",
    "estimatedMinutes": 8,
    "analogy": "Subir una escalera de dos en dos escalones (step 2) o bajarla desde el décimo piso hasta la planta baja (downTo).",
    "video": {
      "title": "Bucles en Kotlin: For, While y Rangos",
      "channel": "AristiDevs",
      "duration": "32:00",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Iteración sobre rangos, step, downTo, ciclos while y control de flujo con break y continue."
    },
    "sections": [
      {
        "title": "Rangos con step, downTo y until",
        "explanation": "Kotlin cuenta con funciones de lenguaje sumamente ricas y expresivas para controlar rangos:\n\n• **`until` (Hasta pero sin incluir):** `1 until 5` recorre del 1 al 4 (ideal para índices de listas donde el tamaño máximo no se incluye).\n• **`downTo` (Hacia atrás):** `5 downTo 1` cuenta en reversa: 5, 4, 3, 2, 1.\n• **`step` (Paso / Salto):** `1..10 step 2` salta de 2 en 2: 1, 3, 5, 7, 9.",
        "codeSnippet": "fun main() {\n    // Conteo en reversa con downTo\n    print(\"Conteo regresivo: \")\n    for (i in 3 downTo 1) {\n        print(\"$i \")\n    }\n    println(\"¡Cero!\")\n\n    // Saltos de 2 en 2 con step\n    print(\"Pares del 2 al 8 : \")\n    for (n in 2..8 step 2) {\n        print(\"$n \")\n    }\n    println()\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Conteo regresivo: 3 2 1 ¡Cero!\nPares del 2 al 8 : 2 4 6 8",
        "byteTip": "Puedes combinar downTo y step juntos: for (i in 10 downTo 0 step 2) cuenta pares hacia atrás.",
        "pitfallTip": "Escribir for (i in 5..1) NO funciona ni hace conteo regresivo; ese rango se evalúa vacío. Debes usar obligatoriamente downTo.",
        "keyPoints": [
          "until excluye el límite superior.",
          "downTo permite hacer iteraciones descendentes.",
          "step define el incremento o decremento en cada paso."
        ]
      },
      {
        "title": "Aplicación en tablas de multiplicar y horarios",
        "explanation": "Mira qué sencillo y limpio es generar la tabla de multiplicar de un número usando rangos en Kotlin:",
        "codeSnippet": "fun main() {\n    val tabla = 7\n    println(\"=== TABLA DEL $tabla ===\")\n    \n    for (multiplicador in 1..5) {\n        val resultado = tabla * multiplicador\n        println(\"$tabla x $multiplicador = $resultado\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "=== TABLA DEL 7 ===\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35",
        "byteTip": "Observa cómo la variable multiplicador toma valores ordenados del 1 al 5 en cada renglón.",
        "pitfallTip": "step debe ser siempre un número entero positivo mayor a cero (step 0 provocará una excepción).",
        "keyPoints": [
          "Los rangos flexibles sustituyen la compleja sintaxis for (int i=0; i<n; i+=k) de otros lenguajes.",
          "El código se lee prácticamente como lenguaje natural en inglés.",
          "Optimiza la iteración sin desperdiciar recursos de memoria."
        ]
      }
    ]
  },
  "kotlin-u05-l03": {
    "id": "kt-th-u05-l03",
    "lessonId": "kotlin-u05-l03",
    "pathId": "kotlin",
    "unitId": 5,
    "levelId": 3,
    "title": "3. Ciclos while y do while",
    "subtitle": "Aprende a usar bucles while y do-while cuando no sabes de antemano cuántas repeticiones necesitarás.",
    "estimatedMinutes": 8,
    "analogy": "Es como inflar una llanta de bicicleta: sigues bombeando aire MIENTRAS (while) la presión sea insuficiente. No sabes exactamente cuántos bombazos tomará, te detienes cuando se cumple la condición.",
    "video": {
      "title": "Bucles en Kotlin: For, While y Rangos",
      "channel": "AristiDevs",
      "duration": "32:00",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Iteración sobre rangos, step, downTo, ciclos while y control de flujo con break y continue."
    },
    "sections": [
      {
        "title": "El bucle while: repetición basada en condiciones",
        "explanation": "A diferencia del `for`, que sabe de antemano cuántos elementos hay en el rango, el bucle **`while`** se utiliza cuando **no sabemos exactamente cuántas veces se repetirá la acción**, solo sabemos la condición bajo la cual debe continuar.\n\nSintaxis de `while`:\n`while (condición) {`\n`    // Se ejecuta mientras la condición sea true`\n`}`\n\nLa condición se evalúa **antes de entrar** a cada vuelta. Si la primera vez es `false`, el bucle no se ejecutará ni una sola vez.",
        "codeSnippet": "fun main() {\n    var energia = 3\n\n    // Continúa mientras la energía sea mayor a cero\n    while (energia > 0) {\n        println(\"Jugando nivel... Energía restante: $energia\")\n        energia-- // Reducimos la energía para acercarnos al final\n    }\n\n    println(\"¡Te has quedado sin energía! Espera para recargar.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Jugando nivel... Energía restante: 3\nJugando nivel... Energía restante: 2\nJugando nivel... Energía restante: 1\n¡Te has quedado sin energía! Espera para recargar.",
        "byteTip": "Dentro del cuerpo del while debes modificar alguna variable que afecte la condición, para garantizar que en algún momento llegue a false.",
        "pitfallTip": "Si olvidas decrementar energia dentro del bucle, la condición siempre será true y crearás un bucle infinito que congelará la app.",
        "keyPoints": [
          "while repite código mientras su condición se mantenga verdadera.",
          "La condición se evalúa antes de cada ciclo.",
          "Es indispensable modificar el estado de control adentro para evitar bucles infinitos."
        ]
      },
      {
        "title": "El bucle do-while: ejecución garantizada al menos una vez",
        "explanation": "A veces necesitas que el bloque de código se ejecute **al menos una vez obligatoriamente**, y que la condición se evalúe recién al final. Para eso existe **`do-while`**:",
        "codeSnippet": "fun main() {\n    var intentos = 0\n\n    do {\n        intentos++\n        println(\"Intento número $intentos: Conectando al servidor...\")\n    } while (intentos < 2)\n\n    println(\"Proceso finalizado tras $intentos intentos.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Intento número 1: Conectando al servidor...\nIntento número 2: Conectando al servidor...\nProceso finalizado tras 2 intentos.",
        "byteTip": "Usa do-while cuando pidas una entrada al usuario y debas solicitarla al menos una primera vez antes de validarla.",
        "pitfallTip": "do-while siempre lleva punto y coma después del paréntesis del while: } while (condición).",
        "keyPoints": [
          "do-while ejecuta el bloque primero y evalúa la condición después.",
          "Garantiza como mínimo una ejecución sin importar la condición inicial.",
          "Ideal para menús de opciones e intentos de conexión a redes."
        ]
      }
    ]
  },
  "kotlin-u05-l04": {
    "id": "kt-th-u05-l04",
    "lessonId": "kotlin-u05-l04",
    "pathId": "kotlin",
    "unitId": 5,
    "levelId": 4,
    "title": "4. Contadores y acumuladores",
    "subtitle": "Aprende los dos patrones más comunes en bucles: contar eventos y acumular totales.",
    "estimatedMinutes": 8,
    "analogy": "El contador es el torniquete del metro que cuenta cuántas personas pasaron (1 en 1). El acumulador es la caja registradora que suma el dinero que pagó cada pasajero (cantidades variables).",
    "video": {
      "title": "Bucles en Kotlin: For, While y Rangos",
      "channel": "AristiDevs",
      "duration": "32:00",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Iteración sobre rangos, step, downTo, ciclos while y control de flujo con break y continue."
    },
    "sections": [
      {
        "title": "Contadores y acumuladores",
        "explanation": "Casi cualquier problema práctico con bucles involucra uno de estos dos patrones de programación:\n\n1. **Contador:** Una variable entera que se incrementa en un valor fijo (generalmente `+1`) cada vez que ocurre un evento de interés.\n2. **Acumulador:** Una variable que va sumando cantidades variables en cada vuelta (por ejemplo, el precio de cada artículo escaneado).\n\nAmbos deben inicializarse **antes** de que empiece el bucle.",
        "codeSnippet": "fun main() {\n    var contadorPares = 0\n    var sumaPares = 0\n\n    for (num in 1..10) {\n        if (num % 2 == 0) {\n            contadorPares++      // Cuenta cuántos pares hay\n            sumaPares += num     // Acumula la suma de esos pares\n        }\n    }\n\n    println(\"Entre 1 y 10 hay $contadorPares números pares.\")\n    println(\"La suma de todos ellos es: $sumaPares\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Entre 1 y 10 hay 5 números pares.\nLa suma de todos ellos es: 30",
        "byteTip": "Los pares del 1 al 10 son 2, 4, 6, 8, 10. Su suma es 2+4+6+8+10 = 30.",
        "pitfallTip": "No confundas el contador (que suma de 1 en 1) con el acumulador (que suma el valor de la variable num).",
        "keyPoints": [
          "Un contador registra frecuencias (cuántas veces ocurrió algo).",
          "Un acumulador suma magnitudes (totales de precios, distancias, notas).",
          "Ambos se declaran con var fuera del bucle y se actualizan adentro."
        ]
      },
      {
        "title": "Cálculo de promedios con contador y acumulador",
        "explanation": "Al combinar ambos patrones puedes calcular promedios dinámicos sin importar cuántos datos proceses:",
        "codeSnippet": "fun main() {\n    var totalVentas = 0.0\n    var cantidadTransacciones = 0\n\n    // Simulamos 3 transacciones\n    val ventas = listOf(120.0, 80.0, 250.0)\n    for (venta in ventas) {\n        totalVentas += venta\n        cantidadTransacciones++\n    }\n\n    val promedioVenta = totalVentas / cantidadTransacciones\n    println(\"Total recaudado: $$totalVentas en $cantidadTransacciones ventas.\")\n    println(\"Promedio por venta: $$promedioVenta\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Total recaudado: $450.0 en 3 ventas.\nPromedio por venta: $150.0",
        "byteTip": "En Kotlin moderno también existe la función .average() para listas, pero entender el contador y acumulador te da la base de cómo funciona internamente.",
        "pitfallTip": "Verifica siempre que cantidadTransacciones sea mayor a cero antes de dividir para no provocar una división por cero.",
        "keyPoints": [
          "El promedio es simplemente: acumulador / contador.",
          "Procesar datos en listas con for es la base de la manipulación de datos en Kotlin.",
          "Protegerse de listas vacías evita errores matemáticos."
        ]
      }
    ]
  },
  "kotlin-u05-l05": {
    "id": "kt-th-u05-l05",
    "lessonId": "kotlin-u05-l05",
    "pathId": "kotlin",
    "unitId": 5,
    "levelId": 5,
    "title": "5. Condiciones de inicio y fin",
    "subtitle": "Comprende el estado inicial y las condiciones de terminación para asegurar la estabilidad de tus bucles.",
    "estimatedMinutes": 8,
    "analogy": "Un maratón tiene una línea de salida clara y una cinta de meta bien marcada. Si los corredores no tienen línea de meta, correrían hasta desmayarse.",
    "video": {
      "title": "Bucles en Kotlin: For, While y Rangos",
      "channel": "AristiDevs",
      "duration": "32:00",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Iteración sobre rangos, step, downTo, ciclos while y control de flujo con break y continue."
    },
    "sections": [
      {
        "title": "Condiciones de inicio y fin en bucles",
        "explanation": "Todo bucle confiable debe tener tres elementos perfectamente definidos:\n1. **Estado inicial:** El punto de partida de las variables de control antes de entrar al bucle.\n2. **Paso o avance:** La modificación en cada ciclo que acerca las variables hacia el objetivo.\n3. **Condición de parada:** El momento exacto en que la condición pasa a ser `false` y el bucle termina con elegancia.",
        "codeSnippet": "fun main() {\n    // 1. Estado inicial\n    var nivelAgua = 0\n    val capacidadTanque = 5\n\n    println(\"Llenando tanque...\")\n    // 3. Condición de parada (mientras sea menor a la capacidad)\n    while (nivelAgua < capacidadTanque) {\n        // 2. Avance hacia el objetivo\n        nivelAgua++\n        println(\"Nivel actual: $nivelAgua / $capacidadTanque litros\")\n    }\n\n    println(\"¡Tanque lleno al 100%!\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Llenando tanque...\nNivel actual: 1 / 5 litros\nNivel actual: 2 / 5 litros\nNivel actual: 3 / 5 litros\nNivel actual: 4 / 5 litros\nNivel actual: 5 / 5 litros\n¡Tanque lleno al 100%!",
        "byteTip": "Diseña siempre pensando: \"¿Cómo y cuándo va a terminar este bucle?\". Te evitará congelar tu aplicación.",
        "pitfallTip": "Si la variable de avance va en la dirección contraria (por ejemplo nivelAgua-- en lugar de ++), el bucle jamás alcanzará la meta.",
        "keyPoints": [
          "Un bucle requiere inicio, avance y condición de terminación claros.",
          "El avance debe mover el estado hacia la condición de salida.",
          "La verificación de límites garantiza la estabilidad del sistema."
        ]
      },
      {
        "title": "Simulación de descargas con porcentajes",
        "explanation": "El avance gradual en un bucle modela de forma ideal la simulación de descargas o transferencias en aplicaciones móviles:",
        "codeSnippet": "fun main() {\n    var bytesDescargados = 0\n    val totalBytes = 100\n    val tamanoPaquete = 25\n\n    while (bytesDescargados < totalBytes) {\n        bytesDescargados += tamanoPaquete\n        println(\"Progreso de descarga: $bytesDescargados%\")\n    }\n\n    println(\"Instalación completada.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Progreso de descarga: 25%\nProgreso de descarga: 50%\nProgreso de descarga: 75%\nProgreso de descarga: 100%\nInstalación completada.",
        "byteTip": "En Android real, los procesos de descarga se ejecutan en segundo plano con corrutinas para no trabar la interfaz visual.",
        "pitfallTip": "Asegúrate de que el tamaño del paquete no sobrepase el total si necesitas mostrar un tope exacto de 100%.",
        "keyPoints": [
          "Los bucles permiten simular y controlar tareas progresivas.",
          "El paso de avance puede ser de cualquier tamaño proporcional.",
          "La retroalimentación en cada ciclo mantiene informado al usuario."
        ]
      }
    ]
  },
  "kotlin-u05-l06": {
    "id": "kt-th-u05-l06",
    "lessonId": "kotlin-u05-l06",
    "pathId": "kotlin",
    "unitId": 5,
    "levelId": 6,
    "title": "6. break y continue",
    "subtitle": "Interrumpe o salta vueltas de un bucle de forma quirúrgica con break y continue.",
    "estimatedMinutes": 8,
    "analogy": "break es como activar la palanca de emergencia de un tren: se detiene de inmediato y el viaje termina. continue es como saltarte una canción de tu lista que no te gusta para pasar a la siguiente.",
    "video": {
      "title": "Bucles en Kotlin: For, While y Rangos",
      "channel": "AristiDevs",
      "duration": "32:00",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Iteración sobre rangos, step, downTo, ciclos while y control de flujo con break y continue."
    },
    "sections": [
      {
        "title": "Control de flujo: break y continue",
        "explanation": "A veces, dentro de un bucle, necesitas cambiar el curso natural de las repeticiones:\n\n• **`break` (Interrumpir):** Detiene el bucle por completo en ese instante exacto y transfiere el control a la primera línea fuera de él. Es ideal para búsquedas: en cuanto encuentras lo que querías, no tiene sentido seguir buscando.\n• **`continue` (Continuar / Saltar):** Salta el resto del código de la vuelta actual y pasa de inmediato a la siguiente iteración.",
        "codeSnippet": "fun main() {\n    println(\"--- Demostración de break (detener al encontrar) ---\")\n    for (num in 1..5) {\n        if (num == 3) {\n            println(\"¡Encontramos el $num! Terminando búsqueda con break.\")\n            break\n        }\n        println(\"Revisando número: $num\")\n    }\n\n    println(\"\\n--- Demostración de continue (saltar el 3) ---\")\n    for (num in 1..5) {\n        if (num == 3) {\n            println(\"Saltando el número 3...\")\n            continue\n        }\n        println(\"Procesando número: $num\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "--- Demostración de break (detener al encontrar) ---\nRevisando número: 1\nRevisando número: 2\n¡Encontramos el 3! Terminando búsqueda con break.\n\n--- Demostración de continue (saltar el 3) ---\nProcesando número: 1\nProcesando número: 2\nSaltando el número 3...\nProcesando número: 4\nProcesando número: 5",
        "byteTip": "break ahorra miles de ciclos de procesador al no recorrer elementos innecesarios una vez hallado el resultado.",
        "pitfallTip": "No abuses de break y continue por doquier; un código con demasiados saltos arbitrarios se vuelve difícil de seguir (código espagueti).",
        "keyPoints": [
          "break corta el bucle definitivamente.",
          "continue cancela la vuelta actual y pasa a la siguiente.",
          "Ambos se usan comúnmente dentro de una condición if."
        ]
      },
      {
        "title": "Filtro de datos no deseados con continue",
        "explanation": "Imagina procesar un listado de números telefónicos o montos donde quieres ignorar transacciones de cero pesos:",
        "codeSnippet": "fun main() {\n    val montos = listOf(100, 0, 250, 0, 50)\n    var totalValido = 0\n\n    for (monto in montos) {\n        if (monto == 0) {\n            continue // Ignoramos los registros en cero\n        }\n        totalValido += monto\n    }\n\n    println(\"Suma total de montos activos: $$totalValido\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Suma total de montos activos: $400",
        "byteTip": "continue mantiene el nivel de indentación limpio sin tener que envolver todo el código restante en un bloque if gigante.",
        "pitfallTip": "En bucles while, ten cuidado de actualizar el contador antes de un continue; si lo colocas después, el contador nunca avanzará y crearás un bucle infinito.",
        "keyPoints": [
          "continue simplifica el filtrado de excepciones o datos inválidos.",
          "Mejora la legibilidad al evitar anidaciones profundas.",
          "Es una técnica común en algoritmos de limpieza de datos."
        ]
      }
    ]
  },
  "kotlin-u05-l07": {
    "id": "kt-th-u05-l07",
    "lessonId": "kotlin-u05-l07",
    "pathId": "kotlin",
    "unitId": 5,
    "levelId": 7,
    "title": "7. Errores frecuentes: ciclos infinitos y repeticiones de más o de menos",
    "subtitle": "Aprende a identificar y corregir bucles infinitos y los famosos errores off-by-one.",
    "estimatedMinutes": 8,
    "analogy": "Si construyes una cerca de 10 metros y pones un poste cada metro, necesitas 11 postes, no 10. Olvidar el primer poste es el clásico error de \"desfase por uno\" que cometen los programadores.",
    "video": {
      "title": "Bucles en Kotlin: For, While y Rangos",
      "channel": "AristiDevs",
      "duration": "32:00",
      "url": "https://www.youtube.com/watch?v=T3ugOYTRF7c",
      "summary": "Iteración sobre rangos, step, downTo, ciclos while y control de flujo con break y continue."
    },
    "sections": [
      {
        "title": "Bugs comunes: bucles infinitos y errores off-by-one",
        "explanation": "Dos de las fallas más habituales en la programación con ciclos son:\n\n1. **Bucle infinito:** Ocurre cuando la condición de parada del bucle nunca llega a ser `false`. La aplicación consumirá el 100% del procesador hasta que el sistema operativo la fuerce a cerrarse (el famoso ANR \"Application Not Responding\" en Android).\n2. **Error Off-by-one (Desfase por uno):** Ocurre cuando el bucle repite exactamente **una vez de más** o **una vez de menos**. Suele deberse a confundir `<` con `<=`, o usar `..` en lugar de `until`.",
        "codeSnippet": "fun main() {\n    // Error off-by-one común: queríamos imprimir 5 elementos pero pusimos < 5\n    var contador = 0\n    println(\"Conteo correcto con <= 5:\")\n    while (contador <= 5) {\n        print(\"$contador \")\n        contador++\n    }\n    println()\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Conteo correcto con <= 5:\n0 1 2 3 4 5",
        "byteTip": "Cuando trabajes con listas e índices, recuerda que en informática los índices empiezan en 0 y terminan en tamaño - 1.",
        "pitfallTip": "Si tu programa se queda \"colgado\" sin emitir salida en la consola, casi con seguridad has caído en un bucle infinito.",
        "keyPoints": [
          "Un bucle infinito congela la aplicación y agota la batería del teléfono.",
          "Los errores off-by-one ejecutan una iteración de más o de menos.",
          "Revisar minuciosamente los operadores relacionales (< vs <=) previene este fallo."
        ]
      },
      {
        "title": "Técnicas de prevención y pruebas límite",
        "explanation": "Para asegurarte de que un bucle está bien blindado:\n• Prueba mentalmente qué pasa con los valores límite (con el valor 0, con el valor 1 y con el tamaño máximo).\n• Pregúntate: \"¿Se ejecutará si la lista está vacía?\".\n• Si usas `while`, comprueba con lupa la línea donde la variable se incrementa.",
        "codeSnippet": "fun main() {\n    val itemsDisponibles = 3\n    \n    // Recorremos de 0 hasta itemsDisponibles - 1 con until de forma segura\n    for (i in 0 until itemsDisponibles) {\n        println(\"Cargando elemento en índice $i\")\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Cargando elemento en índice 0\nCargando elemento en índice 1\nCargando elemento en índice 2",
        "byteTip": "until es el mejor aliado en Kotlin para evitar errores off-by-one al trabajar con índices de listas.",
        "pitfallTip": "Usar 0..itemsDisponibles intentaría acceder al índice 3, el cual no existe si la lista mide 3 elementos (lanzaría un IndexOutOfBoundsException).",
        "keyPoints": [
          "until genera rangos seguros para índices basados en cero.",
          "Las pruebas con valores límite descubren el 90% de los errores de bucle.",
          "Escribir bucles claros y acotados es sello de un código profesional."
        ]
      }
    ]
  }
};
