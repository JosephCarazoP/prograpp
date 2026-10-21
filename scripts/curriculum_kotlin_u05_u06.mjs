export const KOTLIN_UNITS_U05_U06 = [
  // ══════════════════════════════════════════════════════════
  // UNIDAD 5: Estructuras de repetición (7 lecciones)
  // ══════════════════════════════════════════════════════════
  {
    id: 5,
    title: 'Estructuras de repetición',
    description: 'Aprende a automatizar tareas repetitivas mediante ciclos for, rangos con step y downTo, bucles while y do-while, manejo de contadores y acumuladores, control con break y continue, y prevención de bucles infinitos.',
    icon: 'Repeat',
    color: '#10B981',
    stage: 'ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA',
    lessons: [
      {
        level: 1,
        title: '1. Ciclo for',
        desc: 'El ciclo for permite iterar y repetir un bloque de instrucciones para cada elemento de un rango o colección en Kotlin.',
        analogy: 'Un repartidor de correspondencia que tiene 5 cartas numeradas del 1 al 5 en su bolso: para cada carta, visita la casa correspondiente y la entrega.',
        code: `fun main() {\n    // Repite del 1 al 4 inclusive\n    for (i in 1..4) {\n        println("Iteración número: $i")\n    }\n}`,
        output: `Iteración número: 1\nIteración número: 2\nIteración número: 3\nIteración número: 4`,
        tip: 'La variable del ciclo (ej. i) es inmutable de solo lectura (val implícito) dentro del cuerpo del for.',
        pitfall: 'Intentar modificar la variable del bucle dentro del bloque: "i = i + 1" provocará error de compilación.',
        keyPoints: [
          'for (elemento in rango) { ... } recorre ordenadamente cada valor.',
          'La variable del ciclo se crea automáticamente y toma el valor de cada vuelta.',
          'Evita la repetición manual de código idéntico (principio DRY).'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuántas veces se imprimirá la palabra "Hola" en este bucle?',
            code: 'for (i in 1..3) {\n    println("Hola")\n}',
            options: ['3 veces', '4 veces', '2 veces', '1 vez'],
            correctIndex: 0,
            explanation: 'El rango 1..3 incluye 1, 2 y 3, por lo que el cuerpo se ejecuta exactamente 3 veces.'
          },
          {
            type: 'code_cloze',
            prompt: 'La palabra clave para declarar un bucle de iteración sobre un rango en Kotlin es ___:',
            blank: '___ (num in 1..5) { println(num) }',
            options: ['for', 'loop', 'foreach', 'repeat'],
            correctOption: 'for',
            explanation: 'for es la estructura principal de iteración sobre rangos y colecciones.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye un bucle for que recorra del 1 al 5 con la variable k:',
            tokens: ['for', '(', 'k', 'in', '1..5', ')', '{', '}'],
            solution: ['for', '(', 'k', 'in', '1..5', ')', '{', '}'],
            explanation: 'Sintaxis estándar de for con rango en Kotlin.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error al intentar alterar la variable del bucle:',
            lines: [
              'for (i in 1..5) {',
              '    println(i)',
              '    i = i + 1 // Error: la variable del for es inmutable (val implícito)'
            ],
            bugIndex: 2,
            explanation: 'La variable de iteración del for en Kotlin es inmutable y no se puede reasignar manualmente.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja los componentes del ciclo for con su función:',
            pairs: [
              { left: 'for (item in coleccion)', right: 'Encabezado que define la variable y el origen' },
              { left: 'Variable de control', right: 'Toma el valor actual en cada iteración' },
              { left: 'Rango 1..5', right: 'Secuencia de valores que se recorrerán' },
              { left: 'Cuerpo del bucle', right: 'Instrucciones que se ejecutan en cada vuelta' }
            ],
            explanation: 'Anatomía fundamental de un bucle for en Kotlin.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para indicar la pertenencia de la variable al rango en el encabezado del for se usa ___:',
            blank: 'for (x ___ 1..10)',
            options: ['in', 'from', 'to', 'into'],
            correctOption: 'in',
            explanation: 'in vincula la variable de control con la secuencia a iterar.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: for (n in 1..3) print(n * 2) ?',
            options: ['246', '2 4 6', '123', 'Error'],
            correctIndex: 0,
            explanation: 'En las 3 vueltas imprime 1*2=2, 2*2=4, 3*2=6 con print continuo, resultando en "246".'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la impresión del valor de la variable de ciclo i:',
            tokens: ['for', '(i in 1..2)', '{', 'println(i)', '}'],
            solution: ['for', '(i in 1..2)', '{', 'println(i)', '}'],
            explanation: 'Muestra los números 1 y 2 en líneas consecutivas.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error en la sintaxis de los paréntesis del for:',
            lines: [
              'for i in 1..5 { // Error: faltan los paréntesis obligatorios ( )',
              '    println(i)',
              '}'
            ],
            bugIndex: 0,
            explanation: 'En Kotlin, la cabecera del for debe ir obligatoriamente entre paréntesis: for (i in 1..5).'
          },
          {
            type: 'predict_output',
            prompt: 'Si el rango es 5..5, ¿cuántas veces se ejecuta el ciclo?',
            options: ['1 vez', '0 veces', '5 veces', 'Infinitas veces'],
            correctIndex: 0,
            explanation: 'El rango 5..5 contiene exactamente un solo número (el 5), por lo que itera una sola vez.'
          }
        ]
      },
      {
        level: 2,
        title: '2. Rangos, pasos y recorridos descendentes',
        desc: 'Control avanzado de secuencias en Kotlin: intervalos semiabiertos con until, saltos de incremento con step y recorridos hacia atrás con downTo.',
        analogy: 'Subir o bajar una escalera: puedes subir de peldaño en peldaño (1..10), de 2 en 2 saltando escalones (step 2), o descender desde el décimo piso hasta la planta baja (10 downTo 1).',
        code: `fun main() {\n    // Saltos con step\n    for (i in 1..7 step 2) print("$i ") // 1 3 5 7\n    println()\n    // Descendente con downTo\n    for (i in 5 downTo 1) print("$i ")   // 5 4 3 2 1\n    println()\n    // Excluyendo el final con until\n    for (i in 1 until 4) print("$i ")    // 1 2 3\n}`,
        output: `1 3 5 7 \n5 4 3 2 1 \n1 2 3 `,
        tip: 'until es perfecto para recorrer índices de listas (0 until lista.size) sin provocar errores de desborde.',
        pitfall: 'Escribir step con número negativo (ej. step -1): step solo acepta valores estrictamente positivos.',
        keyPoints: [
          'step n: avanza de n en n en lugar de 1 en 1.',
          'downTo: realiza iteraciones en sentido decreciente.',
          'until: incluye el inicio pero excluye el límite superior [inicio, fin).'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué números imprimirá: for (i in 1..9 step 3) print("$i ") ?',
            options: ['1 4 7 ', '1 3 6 9 ', '3 6 9 ', '1 2 3 '],
            correctIndex: 0,
            explanation: 'Inicia en 1 y salta de 3 en 3: 1, 1+3=4, 4+3=7. 7+3=10 ya supera 9.'
          },
          {
            type: 'code_cloze',
            prompt: 'La función infija para crear un rango que recorra de mayor a menor es ___:',
            blank: 'for (i in 10 ___ 1) { println(i) }',
            options: ['downTo', 'toDown', 'backward', 'reverse'],
            correctOption: 'downTo',
            explanation: 'downTo crea progresiones decrecientes de forma natural.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye un recorrido de 10 a 1 usando downTo:',
            tokens: ['for', '(', 'i', 'in', '10', 'downTo', '1', ')'],
            solution: ['for', '(', 'i', 'in', '10', 'downTo', '1', ')'],
            explanation: '10 downTo 1 itera 10, 9, 8, ... hasta 1.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea que no ejecutará ninguna vuelta por rango ascendente inválido:',
            lines: [
              'for (i in 1..5) { println(i) }',
              'for (i in 5..1) { println(i) } // Error: 5..1 genera un rango vacío',
              'for (i in 5 downTo 1) { println(i) }'
            ],
            bugIndex: 1,
            explanation: 'El operador .. solo avanza hacia arriba; para contar hacia atrás debe usarse downTo.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la sintaxis de rango con los números generados:',
            pairs: [
              { left: '1..4', right: '1, 2, 3, 4 (inclusivo)' },
              { left: '1 until 4', right: '1, 2, 3 (excluye el 4)' },
              { left: '4 downTo 1', right: '4, 3, 2, 1 (decreciente)' },
              { left: '1..5 step 2', right: '1, 3, 5 (saltos de dos)' }
            ],
            explanation: 'Herramientas completas de rangos y progresiones en Kotlin.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para excluir el último número de una secuencia usamos la función infija ___:',
            blank: 'for (i in 0 ___ 5) // recorre del 0 al 4',
            options: ['until', 'to', 'before', 'less'],
            correctOption: 'until',
            explanation: 'until crea un rango semiabierto que no incluye el límite superior.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuántos números se imprimen con: for (i in 0 until 5) print(i) ?',
            options: ['5 números (01234)', '6 números (012345)', '4 números (1234)', '0'],
            correctIndex: 0,
            explanation: '0 until 5 genera 0, 1, 2, 3 y 4 (exactamente 5 números).'
          },
          {
            type: 'code_builder',
            prompt: 'Construye un for con saltos de 2 en 2 usando step:',
            tokens: ['for', '(', 'i', 'in', '2..8', 'step', '2', ')'],
            solution: ['for', '(', 'i', 'in', '2..8', 'step', '2', ')'],
            explanation: '2..8 step 2 produce 2, 4, 6 y 8.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error en el valor del salto de step:',
            lines: [
              'for (i in 1..10 step 2) { }',
              'for (i in 10 downTo 1 step -1) { } // Error: step debe ser positivo (ej. step 1)',
              'for (i in 10 downTo 1 step 2) { }'
            ],
            bugIndex: 1,
            explanation: 'El argumento de step debe ser siempre estrictamente positivo; la dirección la da downTo.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: for (i in 3 downTo 1) print("$i ") ?',
            options: ['3 2 1 ', '1 2 3 ', '3 1 ', 'Error'],
            correctIndex: 0,
            explanation: 'downTo cuenta hacia atrás paso a paso desde 3 hasta 1.'
          }
        ]
      },
      {
        level: 3,
        title: '3. Ciclos while y do while',
        desc: 'Estructuras de repetición basadas en una condición booleana. while comprueba la condición antes de entrar; do-while ejecuta el bloque al menos una vez antes de verificar.',
        analogy: 'while es como comprar un boleto antes de entrar al cine (si no tienes boleto, no entras ni una vez). do-while es como probar un buffet libre donde primero te sirves un plato y al final pagas la cuenta.',
        code: `fun main() {\n    var i = 1\n    while (i <= 3) {\n        println("while: $i")\n        i++ // Incremento indispensable\n    }\n    \n    var j = 10\n    do {\n        println("do-while se ejecuta al menos una vez: $j")\n        j++\n    } while (j < 5) // Condición falsa, pero ya se ejecutó 1 vez\n}`,
        output: `while: 1\nwhile: 2\nwhile: 3\ndo-while se ejecuta al menos una vez: 10`,
        tip: 'Asegúrate de que dentro del cuerpo del while exista una instrucción que acerque la condición a false para evitar ciclos infinitos.',
        pitfall: 'Olvidar el punto y coma ; al final de la línea del while en la estructura do { ... } while (condicion); en algunos contextos.',
        keyPoints: [
          'while: 0 o más repeticiones (pre-prueba).',
          'do-while: 1 o más repeticiones garantizadas (post-prueba).',
          'Se utilizan cuando no sabes de antemano cuántas veces se repetirá el ciclo.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuántas veces se ejecutará el cuerpo de este while si n = 10?',
            code: 'var n = 10\nwhile (n < 5) {\n    println("Hola")\n    n++\n}',
            options: ['0 veces', '1 vez', '5 veces', '10 veces'],
            correctIndex: 0,
            explanation: '10 < 5 es false desde el inicio; el ciclo while no llega a ejecutarse ni una sola vez.'
          },
          {
            type: 'code_cloze',
            prompt: 'El ciclo que garantiza la ejecución de su bloque al menos una vez sin importar la condición es ___:',
            blank: 'El bucle ___ ejecuta el cuerpo antes de comprobar la condición.',
            options: ['do-while', 'while', 'for', 'repeat'],
            correctOption: 'do-while',
            explanation: 'do-while es de post-condición: primero ejecuta y luego evalúa.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye un bucle while que incremente contador mientras sea menor a 3:',
            tokens: ['while', '(', 'contador', '<', '3', ')', '{', 'contador++', '}'],
            solution: ['while', '(', 'contador', '<', '3', ')', '{', 'contador++', '}'],
            explanation: 'Estructura estándar de control condicional con while.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la omisión que provocará un ciclo infinito destructivo:',
            lines: [
              'var x = 1',
              'while (x <= 5) {',
              '    println(x) // Falta x++ o actualizar la variable de control'
            ],
            bugIndex: 2,
            explanation: 'Si x nunca se incrementa, x <= 5 será siempre true y el programa se colgará en un bucle infinito.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el tipo de bucle con su momento de evaluación:',
            pairs: [
              { left: 'while', right: 'Evalúa la condición ANTES de ejecutar el bloque' },
              { left: 'do-while', right: 'Evalúa la condición DESPUÉS de ejecutar el bloque' },
              { left: 'i++', right: 'Incrementa la variable de control para avanzar' },
              { left: 'Bucle infinito', right: 'Ciclo donde la condición nunca llega a ser falsa' }
            ],
            explanation: 'Diferencia central entre bucles de pre-comprobación y post-comprobación.'
          },
          {
            type: 'code_cloze',
            prompt: 'El operador abreviado para incrementar en 1 una variable en un bucle es ___:',
            blank: 'var c = 0\nc___',
            options: ['++', '+=', '+1', 'up'],
            correctOption: '++',
            explanation: 'c++ incrementa en una unidad el valor de la variable c.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá este ciclo do-while?',
            code: 'var x = 1\ndo {\n    print("$x ")\n    x++\n} while (x <= 2)',
            options: ['1 2 ', '1 ', '1 2 3 ', '0 1 2 '],
            correctIndex: 0,
            explanation: 'Imprime 1 (x pasa a 2, 2 <= 2 true); imprime 2 (x pasa a 3, 3 <= 2 false y termina).'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la cabecera del ciclo do:',
            tokens: ['do', '{', 'println("Intento")', '}', 'while', '(reintentar)'],
            solution: ['do', '{', 'println("Intento")', '}', 'while', '(reintentar)'],
            explanation: 'Sintaxis del ciclo do-while.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error en la condición del while:',
            lines: [
              'var seguir = true',
              'while seguir { // Error: la condición debe ir obligatoriamente entre paréntesis ( )',
              '    seguir = false'
            ],
            bugIndex: 1,
            explanation: 'En Kotlin, la condición de while debe encerrarse entre paréntesis: while (seguir).'
          },
          {
            type: 'predict_output',
            prompt: 'Si tenemos: var a = 5; while (a > 3) a--; println(a); ¿cuánto vale a al final?',
            options: ['3', '2', '4', '5'],
            correctIndex: 0,
            explanation: '5 > 3 resta a 4; 4 > 3 resta a 3; 3 > 3 es false y sale del ciclo con a = 3.'
          }
        ]
      },
      {
        level: 4,
        title: '4. Contadores y acumuladores',
        desc: 'Patrones algorítmicos fundamentales: un contador incrementa en un valor constante (ej. de 1 en 1) para contar sucesos; un acumulador suma valores variables (ej. precios o notas).',
        analogy: 'Un torniquete de metro y una alcancía: el torniquete es un contador (suma 1 persona cada vez que gira); la alcancía es un acumulador (guarda monedas de 100, 500 y 50 acumulando el monto total).',
        code: `fun main() {\n    var contadorPares = 0\n    var sumaTotal = 0\n    for (n in 1..6) {\n        if (n % 2 == 0) {\n            contadorPares++    // Contador: suma 1\n            sumaTotal += n     // Acumulador: suma el valor de n\n        }\n    }\n    println("Cantidad de pares: $contadorPares")\n    println("Suma de los pares: $sumaTotal")\n}`,
        output: `Cantidad de pares: 3\nSuma de los pares: 12`,
        tip: 'Inicializa siempre tus contadores y acumuladores en 0 antes de que comience el bucle.',
        pitfall: 'Declarar el contador o acumulador dentro del bucle; se reiniciará a 0 en cada vuelta perdiendo el progreso.',
        keyPoints: [
          'Contador: variable que incrementa en cantidad fija (c = c + 1 o c++).',
          'Acumulador: variable que suma cantidades variables (suma += valor).',
          'Deben declararse con var fuera del ciclo para mantener su estado acumulado.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es el valor final de la suma acumulada?',
            code: 'var suma = 0\nfor (i in 1..4) {\n    suma += i\n}\nprintln(suma)',
            options: ['10', '4', '15', '0'],
            correctIndex: 0,
            explanation: '1 + 2 + 3 + 4 = 10. La variable suma actúa como acumulador.'
          },
          {
            type: 'code_cloze',
            prompt: 'Una variable que registra cuántas veces ocurrió un evento sumando de 1 en 1 se llama ___:',
            blank: 'Para contar repeticiones usamos un ___.',
            options: ['contador', 'acumulador', 'búfer', 'índice'],
            correctOption: 'contador',
            explanation: 'El contador lleva la cuenta de repeticiones o frecuencias.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la instrucción de incremento de un contador de aprobados:',
            tokens: ['aprobados', '=', 'aprobados', '+', '1'],
            solution: ['aprobados', '=', 'aprobados', '+', '1'],
            explanation: 'Incrementa el contador en una unidad.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error fatal de alcance (scope) donde el acumulador se reinicia:',
            lines: [
              'for (i in 1..5) {',
              '    var total = 0 // Error: debe declararse afuera antes del for, aquí se reinicia en cada vuelta',
              '    total += i'
            ],
            bugIndex: 1,
            explanation: 'Declarar el acumulador dentro del bucle provoca que se reinicie a cero en cada iteración.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la operación con el patrón que representa:',
            pairs: [
              { left: 'contador++', right: 'Contador (avanza de 1 en 1)' },
              { left: 'total += precio', right: 'Acumulador (agrega montos variables)' },
              { left: 'var suma = 0', right: 'Inicialización de acumulador' },
              { left: 'var cantidad = 0', right: 'Inicialización de contador' }
            ],
            explanation: 'Patrones fundamentales para procesar colecciones y reportes.'
          },
          {
            type: 'code_cloze',
            prompt: 'Una variable que suma cantidades variables en cada vuelta se llama ___:',
            blank: 'Para sumar montos de ventas usamos un ___.',
            options: ['acumulador', 'contador', 'temporizador', 'semáforo'],
            correctOption: 'acumulador',
            explanation: 'El acumulador añade importes variables a un total acumulado.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué valor mostrará el contador al final?',
            code: 'var c = 0\nfor (i in 1..10) {\n    if (i % 3 == 0) c++\n}\nprintln(c)',
            options: ['3', '10', '4', '1'],
            correctIndex: 0,
            explanation: 'Los múltiplos de 3 en 1..10 son 3, 6 y 9 (exactamente 3 números); c termina en 3.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la acumulación del salario al subtotal:',
            tokens: ['totalSalarios', '+=', 'salario'],
            solution: ['totalSalarios', '+=', 'salario'],
            explanation: 'Suma el salario actual al acumulador totalSalarios.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la variable que debió ser var para poder contar:',
            lines: [
              'val conteo = 0 // Error: val es inmutable y no se puede incrementar',
              'for (i in 1..3) {',
              '    conteo++'
            ],
            bugIndex: 0,
            explanation: 'Los contadores deben declararse con var para poder mutar su valor.'
          },
          {
            type: 'predict_output',
            prompt: 'Si calculamos el promedio: var suma = 12; var cantidad = 3; println(suma / cantidad); ¿qué da?',
            options: ['4', '15', '36', '0'],
            correctIndex: 0,
            explanation: '12 / 3 = 4. La media aritmética divide el acumulador entre el contador.'
          }
        ]
      },
      {
        level: 5,
        title: '5. Condiciones de inicio y fin',
        desc: 'El diseño riguroso de las fronteras de un ciclo: inicializar correctamente la variable de control, formular la condición de permanencia y garantizar el avance hacia la condición de salida.',
        analogy: 'Una carrera de atletismo de 400 metros: hay una línea de largada fija (inicio = 0), una meta exacta (fin = 400m) y cada zancada del atleta reduce la distancia que falta para llegar.',
        code: `fun main() {\n    // Inicio: i = 1\n    // Condición de permanencia: i <= 5\n    // Paso de avance: i++\n    var i = 1\n    while (i <= 5) {\n        println("Paso $i de 5")\n        i++\n    }\n}`,
        output: `Paso 1 de 5\nPaso 2 de 5\nPaso 3 de 5\nPaso 4 de 5\nPaso 5 de 5`,
        tip: 'Verifica siempre mentalmente qué ocurre en la primera iteración (caso inicial) y en la última (caso de parada).',
        pitfall: 'El error "off-by-one": usar < en vez de <= provocando que el bucle se ejecute una vez de menos.',
        keyPoints: [
          'Inicio: valor con el que arranca la variable de control.',
          'Condición de parada: expresión que determina cuándo debe detenerse la iteración.',
          'Paso de avance: cambio sistemático que conduce hacia la meta de salida.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuántas iteraciones realizará este ciclo con inicio en 0 y cota menor estricta a 5?',
            code: 'var i = 0\nwhile (i < 5) {\n    i++\n}\nprintln(i)',
            options: ['5', '4', '6', '0'],
            correctIndex: 0,
            explanation: 'Itera para i = 0, 1, 2, 3, 4 (5 veces). Al terminar la 5ta vuelta, i vale 5 y sale.'
          },
          {
            type: 'code_cloze',
            prompt: 'El error común de ejecutar un ciclo una vez de más o una vez de menos se conoce como ___:',
            blank: 'El error de frontera en bucles se llama ___.',
            options: ['off-by-one', 'null-pointer', 'overflow', 'deadlock'],
            correctOption: 'off-by-one',
            explanation: 'Off-by-one ocurre al confundir menor (<) con menor o igual (<=).'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la condición para que el bucle se detenga exactamente al alcanzar el límite 10:',
            tokens: ['while', '(', 'contador', '<=', '10', ')'],
            solution: ['while', '(', 'contador', '<=', '10', ')'],
            explanation: 'contador <= 10 asegura que el número 10 sea procesado antes de salir.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con la condición de inicio errónea que impide que el bucle comience:',
            lines: [
              'var i = 100 // Inicio muy grande',
              'while (i < 10) { // La condición es false de entrada; nunca se ejecuta',
              '    println(i)'
            ],
            bugIndex: 1,
            explanation: '100 < 10 es false desde el inicio, por lo que el cuerpo del ciclo jamás arrancará.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el elemento del ciclo con su rol en la frontera:',
            pairs: [
              { left: 'var i = 1', right: 'Condición de inicio (estado base)' },
              { left: 'i <= N', right: 'Condición de permanencia' },
              { left: 'i++', right: 'Paso de avance hacia el fin' },
              { left: 'i > N', right: 'Condición de salida o parada' }
            ],
            explanation: 'Los 3 pilares indispensables para gobernar cualquier ciclo iterativo.'
          },
          {
            type: 'code_cloze',
            prompt: 'Si un bucle nunca modifica su variable de control, la condición de fin nunca se ___:',
            blank: 'Sin paso de avance, la meta de salida nunca se ___.',
            options: ['alcanzará', 'cancelará', 'duplicará', 'ocultará'],
            correctOption: 'alcanzará',
            explanation: 'El paso de avance es lo único que garantiza que el bucle eventualmente termine.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es el último valor impreso por: for (i in 1 until 5) println(i) ?',
            options: ['4', '5', '1', '0'],
            correctIndex: 0,
            explanation: 'until excluye el 5, por lo que el último valor impreso es el 4.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la inicialización de una cuenta regresiva que arranca en 10:',
            tokens: ['var', 'cuentaRegresiva', '=', '10'],
            solution: ['var', 'cuentaRegresiva', '=', '10'],
            explanation: 'Estado inicial del ciclo regresivo.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error en el paso de avance que aleja de la meta en lugar de acercar:',
            lines: [
              'var i = 1',
              'while (i <= 10) {',
              '    i-- // Error: resta en lugar de sumar; se aleja del 10 indefinidamente'
            ],
            bugIndex: 2,
            explanation: 'Restar aleja a i del límite superior 10, causando un bucle infinito negativo.'
          },
          {
            type: 'predict_output',
            prompt: 'Si el bucle es: var x = 5; while (x > 0) x -= 2; println(x); ¿cuál es el valor final?',
            options: ['-1', '0', '1', 'Error'],
            correctIndex: 0,
            explanation: '5 - 2 = 3; 3 - 2 = 1; 1 - 2 = -1. Al ser -1 > 0 false, sale con x = -1.'
          }
        ]
      },
      {
        level: 6,
        title: '6. break y continue',
        desc: 'Sentencias de control de saltos: break termina inmediatamente el ciclo completo y sale de él; continue salta el resto de la iteración actual y pasa de inmediato a la siguiente.',
        analogy: 'Revisar una caja de manzanas: si encuentras una manzana podrida y decides botar toda la caja, aplicas break (se acabó el trabajo). Si solo descartas esa manzana y sigues revisando la siguiente, aplicas continue.',
        code: `fun main() {\n    // Ejemplo de continue (salta el número 3)\n    for (i in 1..4) {\n        if (i == 3) continue\n        print("$i ")\n    }\n    println()\n    // Ejemplo de break (se detiene al encontrar el 3)\n    for (i in 1..4) {\n        if (i == 3) break\n        print("$i ")\n    }\n}`,
        output: `1 2 4 \n1 2 `,
        tip: 'Usa continue para omitir casos inválidos temprano en el bucle y reducir anidamientos de if.',
        pitfall: 'Abusar de break y continue puede hacer el flujo del bucle difícil de seguir; úsalos con moderación.',
        keyPoints: [
          'break: aborta y finaliza el bucle por completo.',
          'continue: aborta la vuelta actual y avanza a la siguiente iteración.',
          'En bucles anidados, afectan por defecto al bucle más interno donde se encuentran.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá este código con break al llegar a 3?',
            code: 'for (i in 1..5) {\n    if (i == 3) break\n    print("$i ")\n}',
            options: ['1 2 ', '1 2 3 ', '1 2 4 5 ', '3 4 5 '],
            correctIndex: 0,
            explanation: 'Cuando i es 3, el break termina el bucle de inmediato; solo se imprimieron 1 y 2.'
          },
          {
            type: 'code_cloze',
            prompt: 'La instrucción que salta el resto de la iteración actual y avanza a la siguiente vuelta es ___:',
            blank: 'if (omitir) ___',
            options: ['continue', 'break', 'exit', 'pass'],
            correctOption: 'continue',
            explanation: 'continue salta únicamente la vuelta actual sin cancelar el resto del bucle.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la instrucción para salir del bucle si encontrado es true:',
            tokens: ['if', '(encontrado)', 'break'],
            solution: ['if', '(encontrado)', 'break'],
            explanation: 'Termina la búsqueda anticipadamente cuando se halla el elemento.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con código inalcanzable tras un break incondicional:',
            lines: [
              'for (i in 1..5) {',
              '    break // Error: el bucle siempre se detendrá en la primera línea',
              '    println(i) // Código inalcanzable (unreachable code)'
            ],
            bugIndex: 1,
            explanation: 'Un break sin condición previa condena a que el resto del bucle jamás se ejecute.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la sentencia de salto con su efecto:',
            pairs: [
              { left: 'break', right: 'Interrumpe y sale del bucle definitivamente' },
              { left: 'continue', right: 'Salta a la siguiente vuelta del ciclo' },
              { left: 'Búsqueda exitosa', right: 'Caso típico donde break ahorra iteraciones' },
              { left: 'Filtrar elementos', right: 'Caso típico donde continue omite casos no deseados' }
            ],
            explanation: 'Diferencia esencial entre abortar el ciclo completo o solo una iteración.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para cancelar un ciclo de forma prematura al detectar un error usamos ___:',
            blank: 'if (hayFallo) ___',
            options: ['break', 'continue', 'return', 'stop'],
            correctOption: 'break',
            explanation: 'break interrumpe la ejecución del ciclo inmediatamente.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá: for (i in 1..4) { if (i == 2) continue; print("$i ") } ?',
            options: ['1 3 4 ', '1 2 3 4 ', '1 ', '2 '],
            correctIndex: 0,
            explanation: 'El 2 se omite con continue; por ende imprime 1, 3 y 4.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la condición: si el número es negativo saltar a la siguiente vuelta:',
            tokens: ['if', '(', 'num', '<', '0', ')', 'continue'],
            solution: ['if', '(', 'num', '<', '0', ')', 'continue'],
            explanation: 'continue salta los números negativos.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error al colocar break fuera de un ciclo:',
            lines: [
              'val x = 10',
              'if (x > 5) break // Error: break solo es válido dentro de bucles for, while o do-while',
              'println(x)'
            ],
            bugIndex: 1,
            explanation: 'break no puede utilizarse dentro de un if simple aislado; debe estar dentro de un bucle.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuántas veces imprime "A" el código: for (i in 1..5) { println("A"); break; } ?',
            options: ['1 vez', '5 veces', '0 veces', 'Error'],
            correctIndex: 0,
            explanation: 'Imprime "A" en la primera vuelta y el break finaliza el bucle de inmediato.'
          }
        ]
      },
      {
        level: 7,
        title: '7. Errores frecuentes: ciclos infinitos y repeticiones de más o de menos',
        desc: 'Depuración y prevención de los dos grandes peligros en bucles: ciclos infinitos que congelan la aplicación y errores de límite (off-by-one) que producen cálculos inexactos.',
        analogy: 'Un perro persiguiéndose la cola en círculo sin poder alcanzarla jamás (ciclo infinito), o cortar una tabla 1 centímetro más corta de lo que requería el mueble (error off-by-one).',
        code: `fun main() {\n    // Bucle seguro con condición de salida infalible\n    var intentos = 0\n    while (intentos < 3) {\n        println("Intento: \${intentos + 1}")\n        intentos++ // Evita el bucle infinito\n    }\n}`,
        output: `Intento: 1\nIntento: 2\nIntento: 3`,
        tip: 'Para depurar un bucle sospechoso, coloca un println temporal al inicio del cuerpo para ver el valor de la variable en cada vuelta.',
        pitfall: 'Escribir una condición while con variables que nunca cambian dentro del bloque.',
        keyPoints: [
          'Ciclo infinito: ocurre cuando la condición de parada nunca llega a cumplirse.',
          'Causa común 1: olvidar el incremento/decremento de la variable de control.',
          'Causa común 2: avanzar en la dirección equivocada (sumar cuando debía restar).',
          'Off-by-one: iterar N-1 o N+1 veces por confusión entre < y <=.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Por qué este código causa un bucle infinito que bloquea el programa?',
            code: 'var x = 1\nwhile (x > 0) {\n    x++\n}',
            options: [
              'Porque x comienza en 1 y al sumar siempre seguirá siendo mayor que 0',
              'Porque x es inmutable',
              'Porque while no acepta números positivos',
              'Porque falta la palabra clave fun'
            ],
            correctIndex: 0,
            explanation: 'Como x incrementa continuamente, x > 0 será siempre true y nunca alcanzará una salida.'
          },
          {
            type: 'code_cloze',
            prompt: 'Un ciclo que se ejecuta eternamente sin terminar se denomina bucle ___:',
            blank: 'Un ciclo sin condición de salida es un bucle ___.',
            options: ['infinito', 'abierto', 'estático', 'ciego'],
            correctOption: 'infinito',
            explanation: 'El bucle infinito satura la CPU y suele congelar la aplicación.'
          },
          {
            type: 'code_builder',
            prompt: 'Corrige el avance para que el bucle decremente hacia 0 y no sea infinito:',
            tokens: ['contador', '=', 'contador', '-', '1'],
            solution: ['contador', '=', 'contador', '-', '1'],
            explanation: 'Resta 1 para aproximar la variable a la condición de parada <= 0.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea que provoca que el bucle se ejecute 11 veces en vez de 10:',
            lines: [
              '// Se requerían exactamente 10 repeticiones (de 0 a 9)',
              'for (i in 0..10) { // Error: 0..10 genera 11 vueltas (debe ser 0 until 10 o 0..9)',
              '    println(i)'
            ],
            bugIndex: 1,
            explanation: '0..10 contiene 11 elementos (del 0 al 10 inclusive), clásico error off-by-one.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el síntoma con su causa habitual en bucles:',
            pairs: [
              { left: 'Programa congelado', right: 'Bucle infinito por condición siempre true' },
              { left: 'Resultado falta 1 elemento', right: 'Uso de < en lugar de <= en el límite' },
              { left: 'Resultado sobra 1 elemento', right: 'Uso de <= en lugar de < o rango inclusivo no deseado' },
              { left: 'No itera ninguna vez', right: 'Condición inicial ya era false antes de entrar' }
            ],
            explanation: 'Diagnóstico de los fallos más frecuentes en estructuras de repetición.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para iterar exactamente 10 veces empezando desde 0, la condición del while debe ser i < ___:',
            blank: 'var i = 0\nwhile (i < ___) { i++ }',
            options: ['10', '9', '11', '0'],
            correctOption: '10',
            explanation: 'De 0 a 9 hay exactamente 10 repeticiones (0,1,2,3,4,5,6,7,8,9).'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuántas veces se ejecuta: for (i in 1..10 step 5) ?',
            options: ['2 veces (para 1 y 6)', '3 veces', '1 vez', '10 veces'],
            correctIndex: 0,
            explanation: 'Itera para i = 1 y para i = 6. El siguiente salto es 11, que supera 10.'
          },
          {
            type: 'code_builder',
            prompt: 'Añade el incremento de control al cuerpo del while para evitar ciclo infinito:',
            tokens: ['pasos', '++'],
            solution: ['pasos', '++'],
            explanation: 'pasos++ hace avanzar el contador hacia la meta.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error donde la variable de avance no coincide con la condición:',
            lines: [
              'var i = 1',
              'var j = 1',
              'while (i <= 5) { j++ } // Error: se incrementa j, pero la condición evalúa i (bucle infinito)'
            ],
            bugIndex: 2,
            explanation: 'Como i nunca cambia, la condición i <= 5 se mantiene true eternamente.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué ocurre al ejecutar while(false) { println("X") } ?',
            options: [
              'No imprime nada y continúa normalmente',
              'Produce un bucle infinito',
              'Causa un error fatal de compilación',
              'Imprime X una sola vez'
            ],
            correctIndex: 0,
            explanation: 'Al ser la condición false desde el inicio, el cuerpo simplemente se ignora.'
          }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  // UNIDAD 6: Funciones (7 lecciones)
  // ══════════════════════════════════════════════════════════
  {
    id: 6,
    title: 'Funciones',
    description: 'Aprende a estructurar código modular mediante la declaración e invocación de funciones (fun), paso de parámetros y argumentos, valores de retorno con return, funciones Unit, parámetros predeterminados, argumentos con nombre, alcance de variables locales y división de problemas complejos.',
    icon: 'Terminal',
    color: '#0284C7',
    stage: 'ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA',
    lessons: [
      {
        level: 1,
        title: '1. Declaración e invocación de funciones',
        desc: 'Una función es un bloque de código reutilizable con un nombre asignado que ejecuta una tarea específica cuando es invocada o llamada desde otra parte del programa.',
        analogy: 'Un botón de una máquina de café: cuando lo presionas (invocación), la máquina ejecuta toda la secuencia interna de moler, calentar y servir sin que tengas que reconstruir el mecanismo cada vez.',
        code: `// 1. Declaración de la función\nfun saludar() {\n    println("¡Hola desde una función modular!")\n}\n\nfun main() {\n    // 2. Invocación (llamada)\n    saludar()\n    saludar() // Reutilización inmediata\n}`,
        output: `¡Hola desde una función modular!\n¡Hola desde una función modular!`,
        tip: 'El nombre de una función debe ser un verbo en infinitivo o imperativo (ej. calcularTotal, imprimirReporte) que describa la acción que realiza.',
        pitfall: 'Declarar la función pero olvidar invocarla con sus paréntesis (): "saludar" sin paréntesis no ejecutará el código.',
        keyPoints: [
          'fun nombre() { ... } declara la función.',
          'nombre() invoca o ejecuta el bloque de código.',
          'Reutilización: escribe la lógica una vez y llámala tantas veces como sea necesario.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuántas veces se imprimirá el mensaje?',
            code: 'fun aviso() { println("Alerta") }\nfun main() {\n    aviso()\n    aviso()\n}',
            options: ['2 veces', '1 vez', '0 veces', 'Error'],
            correctIndex: 0,
            explanation: 'La función aviso() se invoca dos veces desde main(), imprimiendo "Alerta" en dos ocasiones.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para ejecutar o invocar una función declarada debemos escribir su nombre seguido de ___:',
            blank: 'saludar___',
            options: ['()', '{}', '[]', '<>'],
            correctOption: '()',
            explanation: 'Los paréntesis () son el operador de invocación de funciones en Kotlin.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la declaración de una función simple llamada iniciar:',
            tokens: ['fun', 'iniciar()', '{', 'println("Listo")', '}'],
            solution: ['fun', 'iniciar()', '{', 'println("Listo")', '}'],
            explanation: 'Estructura canónica de declaración de función en Kotlin.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea donde la función no se ejecuta por olvidar los paréntesis:',
            lines: [
              'fun conectar() { println("Conectado") }',
              'conectar // Error: falta () para invocar la función',
              'println("Fin")'
            ],
            bugIndex: 1,
            explanation: 'Escribir solo conectar no ejecuta la función; se requiere conectar().'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja los términos de funciones con su significado:',
            pairs: [
              { left: 'Declaración', right: 'Definir el nombre y las instrucciones de la función con fun' },
              { left: 'Invocación / Llamada', right: 'Ejecutar la función escribiendo su nombre con ()' },
              { left: 'Reutilización', right: 'Llamar a la misma función desde diferentes lugares' },
              { left: 'Modularidad', right: 'Dividir un programa grande en piezas pequeñas independientes' }
            ],
            explanation: 'Conceptos estructurales de la programación modular con funciones.'
          },
          {
            type: 'code_cloze',
            prompt: 'La palabra clave de Kotlin para declarar cualquier función es ___:',
            blank: '___ procesarDatos() { }',
            options: ['fun', 'function', 'def', 'method'],
            correctOption: 'fun',
            explanation: 'fun es la palabra reservada oficial en Kotlin.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué ocurre si declaramos una función pero nunca la invocamos en main()?',
            code: 'fun secreto() { println("Secreto") }\nfun main() { println("Público") }',
            options: ['Solo imprime "Público"', 'Imprime "Secreto"', 'Imprime ambos', 'Error'],
            correctIndex: 0,
            explanation: 'Las funciones solo se ejecutan cuando son invocadas explícitamente.'
          },
          {
            type: 'code_builder',
            prompt: 'Invoca la función guardarCambios:',
            tokens: ['guardarCambios', '(', ')'],
            solution: ['guardarCambios', '(', ')'],
            explanation: 'Llamada directa sin argumentos.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error en la cabecera de la función:',
            lines: [
              'fun mostrarMenu { // Error: faltan los paréntesis () en la declaración',
              '    println("1. Jugar")',
              '}'
            ],
            bugIndex: 0,
            explanation: 'Toda declaración de función requiere paréntesis para su lista de parámetros: fun mostrarMenu().'
          },
          {
            type: 'predict_output',
            prompt: '¿Pueden las funciones invocarse unas a otras dentro de un programa?',
            options: [
              'Sí, una función puede llamar a otra función para coordinar tareas',
              'No, solo la función main tiene permiso de invocar funciones',
              'Solo si están en archivos diferentes',
              'No, porque causaría un cortocircuito'
            ],
            correctIndex: 0,
            explanation: 'La composición e invocación encadenada entre funciones es la base del diseño modular.'
          }
        ]
      },
      {
        level: 2,
        title: '2. Parámetros y argumentos',
        desc: 'Los parámetros son variables declaradas en la cabecera de la función para recibir datos de entrada; los argumentos son los valores reales que le pasas al momento de invocarla.',
        analogy: 'Una ranura de monedas en una máquina expendedora: la ranura está diseñada para recibir monedas de cierto tamaño (parámetro). La moneda de 100 pesos concreta que tú insertas es el argumento.',
        code: `// nombre y edad son parámetros (con su tipo obligatorio)\nfun felicitar(nombre: String, edad: Int) {\n    println("¡Feliz cumpleaños $nombre! Cumples $edad años.")\n}\n\nfun main() {\n    // "Valeria" y 21 son los argumentos reales\n    felicitar("Valeria", 21)\n}`,
        output: `¡Feliz cumpleaños Valeria! Cumples 21 años.`,
        tip: 'En Kotlin, los parámetros de una función son siempre inmutables (val implícito); no puedes modificarlos dentro del cuerpo.',
        pitfall: 'Omitir el tipo de dato de un parámetro: en Kotlin el tipo de cada parámetro es estrictamente obligatorio (nombre: String).',
        keyPoints: [
          'Parámetros: variables en la definición de la función (fun f(x: Int)).',
          'Argumentos: valores concretos pasados en la llamada (f(10)).',
          'Los parámetros son inmutables de solo lectura dentro de la función.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá la función al recibir los argumentos?',
            code: 'fun duplicar(n: Int) {\n    println(n * 2)\n}\nfun main() {\n    duplicar(7)\n}',
            options: ['14', '7', 'n * 2', 'Error'],
            correctIndex: 0,
            explanation: 'El argumento 7 se asigna al parámetro n, y la función ejecuta 7 * 2 = 14.'
          },
          {
            type: 'code_cloze',
            prompt: 'En la definición fun sumar(a: Int, b: Int), las variables a y b se llaman ___:',
            blank: 'Las variables en la cabecera de la función son ___.',
            options: ['parámetros', 'argumentos', 'retornos', 'constantes'],
            correctOption: 'parámetros',
            explanation: 'Parámetros son las variables formales especificadas en la cabecera de la función.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la cabecera de una función con un parámetro de texto nombre:',
            tokens: ['fun', 'saludar', '(', 'nombre:', 'String', ')', '{', '}'],
            solution: ['fun', 'saludar', '(', 'nombre:', 'String', ')', '{', '}'],
            explanation: 'Declaración con especificación de tipo obligatoria: nombre: String.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea donde se intenta modificar un parámetro inmutable:',
            lines: [
              'fun incrementar(x: Int) {',
              '    x = x + 1 // Error: los parámetros son val inmutables en Kotlin',
              '    println(x)'
            ],
            bugIndex: 1,
            explanation: 'En Kotlin los parámetros son inmutables de solo lectura; no pueden ser reasignados.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja los términos con su rol en la llamada:',
            pairs: [
              { left: 'Parámetro', right: 'Variable declarada en la definición: (x: Int)' },
              { left: 'Argumento', right: 'Valor concreto enviado en la invocación: (10)' },
              { left: 'Tipo de parámetro', right: 'Obligatorio en la definición (: String, : Int)' },
              { left: 'Inmutabilidad', right: 'Los parámetros no se pueden reasignar dentro de la función' }
            ],
            explanation: 'Distinción técnica precisa entre parámetros y argumentos.'
          },
          {
            type: 'code_cloze',
            prompt: 'Los valores concretos que se envían al invocar sumar(4, 5) se denominan ___:',
            blank: 'Los valores reales pasados en la llamada son ___.',
            options: ['argumentos', 'parámetros', 'cabeceras', 'módulos'],
            correctOption: 'argumentos',
            explanation: 'Los argumentos son los datos reales que alimentan a los parámetros.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: fun info(item: String, precio: Double) { println("$item $$precio") }; info("Café", 2.50) ?',
            options: ['Café $2.5', 'Café 2.5', 'item precio', 'Error'],
            correctIndex: 0,
            explanation: 'Los argumentos se emparejan por posición: item="Café" y precio=2.5.'
          },
          {
            type: 'code_builder',
            prompt: 'Invoca la función mostrarEdad pasando el argumento 25:',
            tokens: ['mostrarEdad', '(', '25', ')'],
            solution: ['mostrarEdad', '(', '25', ')'],
            explanation: 'Invocación pasando el valor numérico 25.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error por omisión del tipo de dato en el parámetro:',
            lines: [
              'fun calcular(base) { // Error: falta especificar el tipo (ej. base: Int)',
              '    println(base * 2)',
              '}'
            ],
            bugIndex: 0,
            explanation: 'En Kotlin no hay inferencia en los parámetros de funciones; el tipo debe ser explícito.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué ocurre si una función espera 2 argumentos y la invocas pasando solo 1 (sin valores por defecto)?',
            options: [
              'Error de compilación por falta de argumentos requeridos',
              'El segundo argumento se vuelve 0 automáticamente',
              'Se ejecuta a medias',
              'La computadora inventa el segundo argumento'
            ],
            correctIndex: 0,
            explanation: 'El compilador exige que la cantidad y tipo de argumentos coincida con los parámetros declarados.'
          }
        ]
      },
      {
        level: 3,
        title: '3. Valores de retorno con return',
        desc: 'Una función puede procesar datos y devolver un resultado al código que la invocó utilizando la palabra clave return y especificando el tipo de retorno en su cabecera.',
        analogy: 'Pedirle a un cajero automático que retire dinero: tú le ingresas tu PIN y monto (argumentos), la máquina procesa la transacción y te entrega billetes en efectivo (valor de retorno que tú recibes y guardas en tu cartera).',
        code: `// : Int especifica que la función devuelve un número entero\nfun sumar(a: Int, b: Int): Int {\n    return a + b\n}\n\nfun main() {\n    val total = sumar(15, 30) // Recibe el valor 45\n    println("Total obtenido: $total")\n}`,
        output: `Total obtenido: 45`,
        tip: 'Si una función consta de una sola expresión, puedes usar la sintaxis de cuerpo de expresión compacta: fun sumar(a: Int, b: Int) = a + b.',
        pitfall: 'Olvidar la instrucción return en una función declarada con un tipo de retorno que no sea Unit.',
        keyPoints: [
          'fun nombre(): TipoRetorno especifica el tipo de dato devuelto.',
          'return valor; devuelve el resultado y finaliza inmediatamente la función.',
          'Cualquier código colocado después de un return dentro del mismo bloque es inalcanzable.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué valor se guardará en la variable r?',
            code: 'fun triple(n: Int): Int {\n    return n * 3\n}\nfun main() {\n    val r = triple(4)\n    println(r)\n}',
            options: ['12', '4', 'n * 3', 'Error'],
            correctIndex: 0,
            explanation: 'triple(4) calcula 4 * 3 = 12 y lo devuelve con return, guardándose en r.'
          },
          {
            type: 'code_cloze',
            prompt: 'La palabra clave para devolver un valor desde una función es ___:',
            blank: 'fun cuadrado(x: Int): Int {\n    ___ x * x\n}',
            options: ['return', 'send', 'output', 'give'],
            correctOption: 'return',
            explanation: 'return envía el resultado de regreso al punto donde se llamó a la función.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la cabecera de una función que devuelve un valor de tipo Double:',
            tokens: ['fun', 'calcularArea', '(', ')', ':', 'Double', '{', '}'],
            solution: ['fun', 'calcularArea', '(', ')', ':', 'Double', '{', '}'],
            explanation: 'Los dos puntos y el tipo : Double definen el tipo de retorno de la función.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error por omitir el return requerido:',
            lines: [
              'fun multiplicar(a: Int, b: Int): Int {',
              '    a * b // Error: falta la palabra clave return',
              '}'
            ],
            bugIndex: 1,
            explanation: 'En funciones con bloque de llaves { }, el valor devuelto debe ir precedido de return.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja los elementos del retorno de funciones:',
            pairs: [
              { left: ': String', right: 'Especifica que la función devolverá texto' },
              { left: 'return res', right: 'Devuelve la variable res y termina la función' },
              { left: 'val x = f()', right: 'Almacena el valor retornado en la variable x' },
              { left: 'println(f())', right: 'Imprime directamente el valor retornado por la función' }
            ],
            explanation: 'Manejo y captura de valores retornados por funciones.'
          },
          {
            type: 'code_cloze',
            prompt: 'Cuando una función ejecuta la sentencia return, su ejecución finaliza de forma ___:',
            blank: 'La instrucción return provoca la salida ___ de la función.',
            options: ['inmediata', 'retrasada', 'aleatoria', 'pausada'],
            correctOption: 'inmediata',
            explanation: 'return cede el control al llamador de forma instantánea.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de este código con cuerpo de expresión?',
            code: 'fun doble(x: Int) = x * 2\nfun main() {\n    println(doble(5))\n}',
            options: ['10', '5', 'x * 2', 'Error'],
            correctIndex: 0,
            explanation: 'La sintaxis compacta con = infiere el retorno y calcula 5 * 2 = 10.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye el retorno del valor booleano true:',
            tokens: ['return', 'true'],
            solution: ['return', 'true'],
            explanation: 'Retorna directamente un valor literal.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el código inalcanzable tras el return:',
            lines: [
              'fun test(): Int {',
              '    return 10',
              '    println("Fin") // Error: código inalcanzable tras return'
            ],
            bugIndex: 2,
            explanation: 'Al ejecutarse return 10, la función sale y la línea println jamás se alcanzará.'
          },
          {
            type: 'predict_output',
            prompt: 'Si tenemos: fun f(n: Int): Int { if (n > 0) return 1 else return -1 }; ¿qué devuelve f(-5)?',
            options: ['-1', '1', '0', '-5'],
            correctIndex: 0,
            explanation: '-5 > 0 es false, por lo que entra al else y devuelve -1.'
          }
        ]
      },
      {
        level: 4,
        title: '4. Funciones con retorno y funciones Unit',
        desc: 'Las funciones que realizan acciones pero no devuelven ningún dato útil tienen como tipo de retorno Unit (el equivalente de void en Java o C), el cual puede omitirse de la cabecera.',
        analogy: 'Un empleado que te entrega un reporte impreso (función con retorno de dato) frente a un empleado que apaga las luces de la sala (función Unit: realiza una acción útil en el entorno, pero no te pone ningún objeto en las manos).',
        code: `// Función con retorno Unit explícito (se puede omitir)\nfun imprimirAviso(msg: String): Unit {\n    println("AVISO: $msg")\n}\n\n// Función con retorno de valor concreto Int\nfun calcularLongitud(texto: String): Int {\n    return texto.length\n}`,
        output: `AVISO: Sistema listo`,
        tip: 'En el 99% de los casos donde una función no devuelve nada, simplemente omite ": Unit" para un código más limpio.',
        pitfall: 'Intentar guardar el resultado de una función Unit en una variable y usarla como si fuera un número.',
        keyPoints: [
          'Unit representa la ausencia de un valor de retorno significativo.',
          'Si omites el tipo de retorno, Kotlin asume automáticamente Unit por defecto.',
          'A diferencia de void en Java, Unit en Kotlin es un objeto real de tipo singleton (Unit).'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: 'Si una función en Kotlin no especifica tipo de retorno, ¿cuál es su tipo implícito?',
            options: ['Unit', 'void', 'Nothing', 'Any'],
            correctIndex: 0,
            explanation: 'Kotlin asigna Unit automáticamente por defecto a toda función que no declara retorno.'
          },
          {
            type: 'code_cloze',
            prompt: 'El tipo que representa que una función no devuelve ningún valor útil en Kotlin es ___:',
            blank: 'fun log(msg: String): ___ { println(msg) }',
            options: ['Unit', 'void', 'Null', 'Empty'],
            correctOption: 'Unit',
            explanation: 'Unit es el tipo oficial de Kotlin para funciones sin retorno de datos.'
          },
          {
            type: 'code_builder',
            prompt: 'Declara una función con retorno explícito Unit:',
            tokens: ['fun', 'apagar()', ':', 'Unit', '{', '}'],
            solution: ['fun', 'apagar()', ':', 'Unit', '{', '}'],
            explanation: 'Declaración formal con Unit explícito.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error por usar void (de Java) en vez de Unit en Kotlin:',
            lines: [
              'fun limpiar(): void { // Error: en Kotlin no existe void, es Unit o se omite',
              '    println("Limpio")',
              '}'
            ],
            bugIndex: 0,
            explanation: 'void pertenece a lenguajes como Java o C; en Kotlin se utiliza Unit.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la cabecera de la función con su clasificación:',
            pairs: [
              { left: 'fun calcular(): Double', right: 'Función con retorno de valor (Double)' },
              { left: 'fun mostrar(): Unit', right: 'Función Unit (realiza acción sin devolver dato)' },
              { left: 'fun iniciar()', right: 'Función Unit con tipo omitido por convención' },
              { left: 'return Unit', right: 'Retorno opcional al final de una función Unit' }
            ],
            explanation: 'Diferencia entre funciones productoras de datos y funciones de efecto colateral.'
          },
          {
            type: 'code_cloze',
            prompt: 'En el código idiomático de Kotlin, escribir : Unit en la cabecera se suele ___:',
            blank: 'El tipo Unit por buena práctica se suele ___.',
            options: ['omitir', 'duplicar', 'prohibir', 'encriptar'],
            correctOption: 'omitir',
            explanation: 'Omitir : Unit produce código más limpio y conciso sin perder seguridad de tipos.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá: val res = println("Hola"); println(res); ?',
            options: ['Hola\nkotlin.Unit', 'Hola', 'null', 'Error'],
            correctIndex: 0,
            explanation: 'println devuelve Unit, por lo que imprimir su resultado muestra "kotlin.Unit".'
          },
          {
            type: 'code_builder',
            prompt: 'Construye una función con retorno de valor booleano:',
            tokens: ['fun', 'esMayor(edad: Int)', ':', 'Boolean', '{', 'return edad >= 18', '}'],
            solution: ['fun', 'esMayor(edad: Int)', ':', 'Boolean', '{', 'return edad >= 18', '}'],
            explanation: 'Función con retorno de tipo Boolean.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la incoherencia de tipo en el retorno:',
            lines: [
              'fun saludar(): Unit {',
              '    return "Hola" // Error: la función está declarada como Unit pero devuelve un String',
              '}'
            ],
            bugIndex: 1,
            explanation: 'Si una función es Unit, no puede retornar una cadena con return "Hola".'
          },
          {
            type: 'predict_output',
            prompt: '¿Por qué Kotlin usa el objeto Unit en lugar de la palabra clave void de Java?',
            options: [
              'Porque al ser un tipo y objeto real, se integra uniformemente con el sistema genérico de tipos',
              'Porque Unit gasta menos batería',
              'Porque void es una palabra muy larga',
              'Porque la JVM no entiende void'
            ],
            correctIndex: 0,
            explanation: 'Unit permite que las funciones sin retorno puedan ser tratadas como tipos genéricos uniformes.'
          }
        ]
      },
      {
        level: 5,
        title: '5. Parámetros predeterminados y argumentos con nombre',
        desc: 'Kotlin permite asignar valores por defecto a los parámetros en la definición y pasar argumentos especificando su nombre al invocarlos, evitando sobrecargar funciones innecesariamente.',
        analogy: 'Ordenar una hamburguesa: viene por defecto con lechuga, tomate y salsa (valores predeterminados). Si tú quieres, pides expresamente "con salsa = barbacoa" (argumento con nombre) sin tener que especificar todo lo demás.',
        code: `fun crearUsuario(nombre: String, rol: String = "Estudiante", activo: Boolean = true) {\n    println("Usuario: $nombre | Rol: $rol | Activo: $activo")\n}\n\nfun main() {\n    crearUsuario("Ana") // Usa los valores por defecto\n    crearUsuario("Carlos", rol = "Profesor") // Argumento con nombre\n    crearUsuario(activo = false, nombre = "Luis") // Orden alterado seguro\n}`,
        output: `Usuario: Ana | Rol: Estudiante | Activo: true\nUsuario: Carlos | Rol: Profesor | Activo: true\nUsuario: Luis | Rol: Estudiante | Activo: false`,
        tip: 'Los argumentos con nombre aumentan radicalmente la legibilidad del código cuando una función recibe varios parámetros del mismo tipo (ej. Booleanos).',
        pitfall: 'Colocar un argumento posicional después de un argumento con nombre en la invocación.',
        keyPoints: [
          'Parámetro predeterminado: param: Tipo = valorPorDefecto.',
          'Argumento con nombre: funcion(param = valor).',
          'Permiten alterar el orden de los argumentos en la llamada con total claridad.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá si llamamos a saludar() sin pasar argumentos?',
            code: 'fun saludar(msg: String = "Hola") {\n    println(msg)\n}\nfun main() {\n    saludar()\n}',
            options: ['Hola', 'msg', 'null', 'Error'],
            correctIndex: 0,
            explanation: 'Al omitir el argumento, la función utiliza su valor por defecto ("Hola").'
          },
          {
            type: 'code_cloze',
            prompt: 'Para asignar un valor por defecto a un parámetro en la definición usamos el símbolo ___:',
            blank: 'fun conectar(puerto: Int ___ 8080)',
            options: ['=', ':', '->', '=='],
            correctOption: '=',
            explanation: 'El signo igual = en la cabecera asigna el valor predeterminado del parámetro.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la invocación especificando el argumento con nombre:',
            tokens: ['configurar', '(', 'timeout', '=', '5000', ')'],
            solution: ['configurar', '(', 'timeout', '=', '5000', ')'],
            explanation: 'Sintaxis de invocación con argumento con nombre.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error en la invocación mezclada:',
            lines: [
              'fun ventana(ancho: Int, alto: Int, titulo: String) { }',
              'ventana(ancho = 800, 600, "App") // Error: argumento posicional tras argumento con nombre'
            ],
            bugIndex: 1,
            explanation: 'Una vez que usas un argumento con nombre, todos los argumentos subsiguientes deben ser nombrados.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la técnica con su beneficio de diseño:',
            pairs: [
              { left: 'Parámetros por defecto', right: 'Evita la sobrecarga repetitiva de múltiples métodos' },
              { left: 'Argumentos con nombre', right: 'Evita confundir parámetros del mismo tipo en la llamada' },
              { left: 'Orden flexible', right: 'Permite pasar argumentos en cualquier orden nombrando los parámetros' },
              { left: 'Llamada concisa', right: 'Permite omitir parámetros secundarios opcionales' }
            ],
            explanation: 'Ventajas de los argumentos con nombre y parámetros por defecto en Kotlin.'
          },
          {
            type: 'code_cloze',
            prompt: 'Los argumentos con nombre permiten enviar los datos en cualquier ___ en la llamada:',
            blank: 'Con argumentos con nombre, no importa el ___ de los parámetros.',
            options: ['orden', 'tipo', 'archivo', 'bloque'],
            correctOption: 'orden',
            explanation: 'Al asociar explícitamente nombre = valor, el orden posicional deja de ser estricto.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: fun suma(a: Int = 1, b: Int = 2) = a + b; println(suma(b = 5)); ?',
            options: ['6', '5', '3', '7'],
            correctIndex: 0,
            explanation: 'a toma su valor por defecto (1) y b recibe 5 nombrado; 1 + 5 = 6.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la definición de un parámetro con valor por defecto true:',
            tokens: ['activo:', 'Boolean', '=', 'true'],
            solution: ['activo:', 'Boolean', '=', 'true'],
            explanation: 'Define el tipo y su valor por defecto.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el nombre de parámetro inexistente en la invocación:',
            lines: [
              'fun registrar(usuario: String, clave: String) { }',
              'registrar(usuario = "admin", password = "123") // Error: el parámetro se llama "clave", no "password"'
            ],
            bugIndex: 1,
            explanation: 'El nombre del argumento en la llamada debe coincidir exactamente con el nombre en la función.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprime: fun f(a: Int = 10, b: Int = 20) = println("$a-$b"); f(b = 99); ?',
            options: ['10-99', '99-20', '10-20', 'Error'],
            correctIndex: 0,
            explanation: 'a usa su valor por defecto 10 y b recibe 99, imprimiendo "10-99".'
          }
        ]
      },
      {
        level: 6,
        title: '6. Variables locales y alcance',
        desc: 'El alcance léxico (scope) determina la visibilidad y vida de una variable. Las variables declaradas dentro de una función o bloque { } son locales y dejan de existir fuera de él.',
        analogy: 'Un pase de visitante en un edificio de oficinas: te permite entrar y moverte dentro de una sala específica (bloque local), pero no tiene ninguna validez en la calle ni en otros edificios (fuera del scope).',
        code: `fun miFuncion() {\n    val secreta = 42 // Variable local de miFuncion\n    println(secreta)\n}\n\nfun main() {\n    miFuncion()\n    // println(secreta) // Error: 'secreta' no existe en main\n}`,
        output: `42`,
        tip: 'Mantén siempre el alcance de tus variables lo más estrecho posible para evitar colisiones y consumo innecesario de memoria.',
        pitfall: 'Intentar acceder a una variable declarada dentro de un if o un bucle for desde afuera de ese bloque.',
        keyPoints: [
          'Variable local: declarada dentro de una función o bloque de llaves { }.',
          'Tiempo de vida: se crea al entrar al bloque y se destruye al salir de él.',
          'Shadowing: una variable local interna puede ocultar temporalmente a una externa con el mismo nombre.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué ocurrirá al intentar compilar este código?',
            code: 'fun demo() {\n    val local = "Dato"\n}\nfun main() {\n    println(local)\n}',
            options: [
              'Error de compilación: Unresolved reference: local',
              'Imprime "Dato"',
              'Imprime null',
              'Imprime demo'
            ],
            correctIndex: 0,
            explanation: 'La variable local pertenece al ámbito de demo() y no existe dentro de main().'
          },
          {
            type: 'code_cloze',
            prompt: 'La región del programa donde una variable es visible y accesible se llama su ___:',
            blank: 'El ámbito o visibilidad de una variable se denomina ___.',
            options: ['alcance o scope', 'paquete', 'módulo', 'puntero'],
            correctOption: 'alcance o scope',
            explanation: 'Scope define la frontera dentro de la cual la variable puede utilizarse.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye una variable local temporal dentro de un bloque if:',
            tokens: ['if', '(true)', '{', 'val', 'temp', '=', '10', '}'],
            solution: ['if', '(true)', '{', 'val', 'temp', '=', '10', '}'],
            explanation: 'temp solo existirá dentro de las llaves del if.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea donde se intenta usar una variable fuera de su bloque de vida:',
            lines: [
              'if (true) {',
              '    val resultado = 100',
              '}',
              'println(resultado) // Error: resultado solo existe dentro del if anterior'
            ],
            bugIndex: 3,
            explanation: 'Al cerrarse la llave } del if, la variable resultado es destruida de la memoria.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el tipo de variable con su visibilidad:',
            pairs: [
              { left: 'Variable local', right: 'Visible únicamente dentro de su función o bloque' },
              { left: 'Parámetro de función', right: 'Visible en todo el cuerpo de esa función' },
              { left: 'Variable global / archivo', right: 'Accesible desde cualquier función del archivo' },
              { left: 'Fin del bloque }', right: 'Destrucción de las variables locales creadas adentro' }
            ],
            explanation: 'Reglas fundamentales del alcance léxico de variables.'
          },
          {
            type: 'code_cloze',
            prompt: 'Una variable declarada dentro de un ciclo for solo existe ___ del ciclo:',
            blank: 'Las variables de control del bucle viven ___ del for.',
            options: ['dentro', 'fuera', 'al final', 'en la nube'],
            correctOption: 'dentro',
            explanation: 'Su tiempo de vida termina en cuanto el bucle finaliza su última vuelta.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de este programa con variables locales independientes?',
            code: 'val x = 10\nfun main() {\n    val x = 20\n    println(x)\n}',
            options: ['20', '10', '30', 'Error'],
            correctIndex: 0,
            explanation: 'La variable local x de main() (20) oculta (shadowing) a la variable externa, imprimiendo 20.'
          },
          {
            type: 'code_builder',
            prompt: 'Declara una variable local x dentro de la función:',
            tokens: ['fun', 'probar()', '{', 'val', 'x', '=', '5', '}'],
            solution: ['fun', 'probar()', '{', 'val', 'x', '=', '5', '}'],
            explanation: 'x es una variable local confinada a probar().'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error de redeclaración en el mismo alcance:',
            lines: [
              'val id = 1',
              'val id = 2 // Error: no se puede redeclarar la misma variable en el mismo ámbito',
              'println(id)'
            ],
            bugIndex: 1,
            explanation: 'Dentro del mismo scope no pueden coexistir dos variables con el mismo identificador.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué ventaja tiene que las variables locales se destruyan al salir de su función?',
            options: [
              'Libera memoria RAM y evita que otras partes del código alteren datos por accidente',
              'Hace que la computadora se caliente menos',
              'Obliga al programador a escribir más lento',
              'Hace que las variables cambien de color'
            ],
            correctIndex: 0,
            explanation: 'La gestión automática de memoria y el encapsulamiento previenen errores de estado.'
          }
        ]
      },
      {
        level: 7,
        title: '7. Dividir un problema en funciones',
        desc: 'El principio de "divide y vencerás" (descomposición algorítmica): transformar un problema complejo en múltiples funciones pequeñas, especializadas, legibles y fácilmente testeables.',
        analogy: 'La construcción de un automóvil en una línea de montaje: un equipo instala el motor, otro instala las puertas y otro aplica la pintura. Nadie intenta construir todo el auto en un solo paso caótico.',
        code: `// Descomposición modular limpia\nfun leerDatos(): Int = 100\nfun calcularImpuesto(monto: Int): Double = monto * 0.15\nfun mostrarFactura(monto: Int, imp: Double) {\n    println("Subtotal: $$monto | Impuesto: $$imp | Total: $\${monto + imp}")\n}\n\nfun main() {\n    val monto = leerDatos()\n    val impuesto = calcularImpuesto(monto)\n    mostrarFactura(monto, impuesto)\n}`,
        output: `Subtotal: $100 | Impuesto: $15.0 | Total: $115.0`,
        tip: 'Aplica el principio de responsabilidad única (SRP): cada función debe hacer una sola cosa y hacerla extraordinariamente bien.',
        pitfall: 'Crear funciones "monolíticas" de 200 líneas que hacen de todo: leer, procesar, calcular e imprimir al mismo tiempo.',
        keyPoints: [
          'Modularización: mejora radical de la legibilidad, mantenimiento y pruebas.',
          'Principio de Responsabilidad Única: una función = un único propósito claro.',
          'La función main() debe actuar como un coordinador de alto nivel de funciones especializadas.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es el beneficio primordial de dividir un programa en funciones pequeñas?',
            options: [
              'Facilita la lectura, el mantenimiento y la reutilización de código limpio',
              'Hace que el archivo ejecutable ocupe el doble de espacio',
              'Permite que el computador funcione sin electricidad',
              'Obliga a reiniciar la máquina tras cada llamada'
            ],
            correctIndex: 0,
            explanation: 'La descomposición modular es la base de la ingeniería de software profesional.'
          },
          {
            type: 'code_cloze',
            prompt: 'El principio que dice que una función debe encargarse de una única tarea se llama principio de ___ única:',
            blank: 'Cada función debe tener una sola ___.',
            options: ['responsabilidad', 'variable', 'interfaz', 'salida'],
            correctOption: 'responsabilidad',
            explanation: 'El Principio de Responsabilidad Única (SRP) previene funciones monstruosas y difíciles de depurar.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la coordinación modular en main invocando las dos etapas:',
            tokens: ['val', 'datos', '=', 'cargar()', ';', 'procesar(datos)'],
            solution: ['val', 'datos', '=', 'cargar()', ';', 'procesar(datos)'],
            explanation: 'main actúa como director de orquesta coordinando las funciones.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la mala práctica en la función monolítica:',
            lines: [
              'fun procesarTodo() {',
              '    // Lee archivos, calcula nóminas, envía correos, imprime y formatea la pantalla',
              '    // Mala práctica: hace demasiadas tareas no relacionadas en una sola función',
              '}'
            ],
            bugIndex: 1,
            explanation: 'Una función que mezcla lectura, cálculos y notificaciones viola el principio de responsabilidad única.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la función especializada con su tarea única:',
            pairs: [
              { left: 'obtenerEntrada()', right: 'Responsable exclusivamente de leer los datos iniciales' },
              { left: 'calcularDescuento()', right: 'Responsable exclusivamente de la matemática del descuento' },
              { left: 'imprimirRecibo()', right: 'Responsable exclusivamente de formatear y emitir el reporte' },
              { left: 'validarEdad()', right: 'Responsable exclusivamente de verificar si cumple el requisito' }
            ],
            explanation: 'Descomposición clara de responsabilidades en funciones pequeñas.'
          },
          {
            type: 'code_cloze',
            prompt: 'La técnica de dividir un problema grande en partes más pequeñas se conoce como divide y ___:',
            blank: 'El enfoque algorítmico se denomina divide y ___.',
            options: ['vencerás', 'multiplicarás', 'borrarás', 'ocultarás'],
            correctOption: 'vencerás',
            explanation: 'Divide y vencerás es la estrategia dorada para simplificar problemas complejos.'
          },
          {
            type: 'predict_output',
            prompt: 'Si tenemos: fun f1() = 2; fun f2(x: Int) = x * 3; println(f2(f1())); ¿qué se imprime?',
            options: ['6', '2', '3', 'Error'],
            correctIndex: 0,
            explanation: 'f1() devuelve 2, y f2(2) calcula 2 * 3 = 6 (composición de funciones).'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la llamada compuesta de validación y guardado:',
            tokens: ['if', '(validar(usuario))', 'guardar(usuario)'],
            solution: ['if', '(validar(usuario))', 'guardar(usuario)'],
            explanation: 'Composición clara de funciones modulares.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error de acoplamiento innecesario:',
            lines: [
              'fun sumar(a: Int, b: Int): Int {',
              '    println("Calculando") // Mala práctica: mezclar lógica pura con impresión en consola',
              '    return a + b',
              '}'
            ],
            bugIndex: 1,
            explanation: 'Las funciones de cálculo puro no deben acoplarse con salidas a consola para ser testeables.'
          },
          {
            type: 'predict_output',
            prompt: '¿Por qué las funciones pequeñas son más fáciles de testear?',
            options: [
              'Porque tienen entradas y salidas predecibles y enfocadas en una sola labor',
              'Porque ocupan menos letras en el teclado',
              'Porque el compilador las optimiza los fines de semana',
              'Porque no necesitan tipos de datos'
            ],
            correctIndex: 0,
            explanation: 'El aislamiento de responsabilidades permite probar cada función por separado con total confianza.'
          }
        ]
      }
    ]
  }
];
