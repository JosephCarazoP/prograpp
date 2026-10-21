export const KOTLIN_UNITS_U04_U06 = [
  // ══════════════════════════════════════════════════════════
  // UNIDAD 4: Estructuras de decisión (6 lecciones)
  // ══════════════════════════════════════════════════════════
  {
    id: 4,
    title: 'Estructuras de decisión',
    description: 'Aprende a controlar el flujo de tu programa mediante decisiones simples con if, alternativas binarias con else, encadenamiento múltiple con else if, selección exhaustiva con when, intervalos in y el uso de if y when como expresiones que devuelven valor.',
    icon: 'GitFork',
    color: '#F59E0B',
    stage: 'ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA',
    lessons: [
      {
        level: 1,
        title: '1. Decisiones simples con if',
        desc: 'La estructura if evalúa una condición booleana; si esta es verdadera (true), ejecuta el bloque de código entre llaves; si es falsa (false), simplemente lo ignora.',
        analogy: 'Un paraguas en tu mochila: si está lloviendo (true), abres el paraguas. Si no está lloviendo (false), sigues caminando normalmente sin hacer nada especial.',
        code: `fun main() {\n    val edad = 20\n    if (edad >= 18) {\n        println("Acceso concedido")\n    }\n    println("Fin de verificación")\n}`,
        output: `Acceso concedido\nFin de verificación`,
        tip: 'La condición dentro del if siempre debe ir entre paréntesis (condicion) y debe evaluar obligatoriamente a un tipo Boolean.',
        pitfall: 'Poner punto y coma ; justo después del if: "if (x > 0);" terminará la condición antes del bloque.',
        keyPoints: [
          'if (condicion) { ... } ejecuta el bloque únicamente si la condición es true.',
          'La condición debe resultar estrictamente en un booleano (true o false).',
          'Si la condición es false, el flujo salta directamente a la siguiente instrucción fuera del bloque.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué mostrará este código si la puntuación es 85?',
            code: 'val puntos = 85\nif (puntos >= 70) {\n    println("Aprobado")\n}\nprintln("Finalizado")',
            options: ['Aprobado\nFinalizado', 'Aprobado', 'Finalizado', 'Error'],
            correctIndex: 0,
            explanation: '85 >= 70 es true, por lo que imprime "Aprobado" y luego continúa con "Finalizado".'
          },
          {
            type: 'code_cloze',
            prompt: 'La palabra clave para iniciar una estructura condicional en Kotlin es ___:',
            blank: '___ (temperatura > 30) { println("Calor") }',
            options: ['if', 'when', 'case', 'check'],
            correctOption: 'if',
            explanation: 'if es la palabra clave fundamental para evaluar condiciones lógicas.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la estructura if para verificar si saldo es mayor a 0:',
            tokens: ['if', '(', 'saldo', '>', '0', ')', '{', 'println("OK")', '}'],
            solution: ['if', '(', 'saldo', '>', '0', ')', '{', 'println("OK")', '}'],
            explanation: 'Sintaxis completa del bloque condicional if.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con el error común de punto y coma tras el if:',
            lines: [
              'val x = 10',
              'if (x > 5); { // Error: el punto y coma termina prematuramente la condición',
              '    println("Mayor")'
            ],
            bugIndex: 1,
            explanation: 'El punto y coma ; tras los paréntesis del if desvincula el bloque de código subsiguiente.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el valor de la condición con el comportamiento del if:',
            pairs: [
              { left: 'Condición true', right: 'Se ejecuta el código dentro de las llaves' },
              { left: 'Condición false', right: 'Se omite el bloque y continúa la ejecución' },
              { left: 'Paréntesis ()', right: 'Encierran obligatoriamente la expresión booleana' },
              { left: 'Llaves { }', right: 'Delimitan el bloque de instrucciones condicionadas' }
            ],
            explanation: 'Mecánica de evaluación de bifurcaciones condicionales simples.'
          },
          {
            type: 'code_cloze',
            prompt: 'En Kotlin, la expresión dentro de if (...) debe ser obligatoriamente de tipo ___:',
            blank: 'La condición del if debe ser estrictamente un ___.',
            options: ['Boolean', 'Int', 'String', 'Double'],
            correctOption: 'Boolean',
            explanation: 'A diferencia de otros lenguajes como C, en Kotlin no se permiten números (como 1 o 0) en condiciones.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué se imprimirá si la variable activo es false?',
            code: 'val activo = false\nif (activo) {\n    println("Conectado")\n}\nprintln("Adiós")',
            options: ['Adiós', 'Conectado\nAdiós', 'Conectado', 'Nada'],
            correctIndex: 0,
            explanation: 'Como activo es false, el bloque interno no se ejecuta y salta directo a "Adiós".'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la condición: si vidas es igual a 0 mostrar Game Over:',
            tokens: ['if', '(', 'vidas', '==', '0', ')', '{', 'println("Game Over")', '}'],
            solution: ['if', '(', 'vidas', '==', '0', ')', '{', 'println("Game Over")', '}'],
            explanation: 'Compara igualdad con == dentro del if.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error de asignación dentro de la condición:',
            lines: [
              'val pass = "123"',
              'if (pass = "123") { // Error: debe ser == para comparar',
              '    println("Login exitoso")'
            ],
            bugIndex: 1,
            explanation: '= es operador de asignación; para comparar cadenas se requiere ==.'
          },
          {
            type: 'predict_output',
            prompt: 'Si x = 5, ¿cuántos mensajes se imprimirán con: if (x > 2) println("A"); if (x > 10) println("B"); ?',
            options: ['1 mensaje ("A")', '2 mensajes ("A" y "B")', '0 mensajes', 'Error'],
            correctIndex: 0,
            explanation: '5 > 2 es true (imprime "A"); 5 > 10 es false (no imprime "B").'
          }
        ]
      },
      {
        level: 2,
        title: '2. Alternativas con if y else',
        desc: 'La cláusula else proporciona una alternativa garantizada: si la condición del if es verdadera, se ejecuta el primer bloque; si es falsa, se ejecuta obligatoriamente el bloque else.',
        analogy: 'Un semáforo peatonal: si está en verde (true), cruzas la calle; en cualquier otro caso (else), te detienes en la acera.',
        code: `fun main() {\n    val saldo = 50.0\n    val precio = 70.0\n    if (saldo >= precio) {\n        println("Compra exitosa")\n    } else {\n        println("Saldo insuficiente")\n    }\n}`,
        output: `Saldo insuficiente`,
        tip: 'Con if/else garantizas que siempre se ejecutará exactamente una de las dos ramas, nunca ambas y nunca ninguna.',
        pitfall: 'Escribir una condición en el else: "else (x < 0)" es un error de sintaxis; else no lleva paréntesis ni condición propia.',
        keyPoints: [
          'if / else crea una bifurcación binaria mutuamente excluyente.',
          'Si la condición es true, se ejecuta el bloque if y se ignora el else.',
          'Si la condición es false, se ignora el bloque if y se ejecuta el else.',
          'else no lleva condición propia; captura todos los casos donde el if no se cumplió.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de este código para numero = 7?',
            code: 'val numero = 7\nif (numero % 2 == 0) {\n    println("Par")\n} else {\n    println("Impar")\n}',
            options: ['Impar', 'Par', 'Par\nImpar', '0'],
            correctIndex: 0,
            explanation: '7 % 2 es 1, no 0 (false), por lo que salta al bloque else e imprime "Impar".'
          },
          {
            type: 'code_cloze',
            prompt: 'La palabra clave para definir la alternativa cuando la condición es falsa es ___:',
            blank: 'if (aprobado) { println("Pasa") } ___ { println("Repite") }',
            options: ['else', 'otherwise', 'then', 'default'],
            correctOption: 'else',
            explanation: 'else captura la alternativa negativa cuando la condición evaluada resulta false.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la estructura completa de if y else:',
            tokens: ['if', '(activo)', '{', 'println("ON")', '}', 'else', '{', 'println("OFF")', '}'],
            solution: ['if', '(activo)', '{', 'println("ON")', '}', 'else', '{', 'println("OFF")', '}'],
            explanation: 'Estructura binaria clásica de decisión en Kotlin.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con el error de sintaxis en el else:',
            lines: [
              'if (edad >= 18) {',
              '    println("Mayor")',
              '} else (edad < 18) { // Error: else no lleva condición entre paréntesis'
            ],
            bugIndex: 2,
            explanation: 'else nunca lleva condición; si necesitas una condición alternativa debes usar else if.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la rama con la condición correspondiente:',
            pairs: [
              { left: 'Rama if', right: 'Se ejecuta cuando la condición es true' },
              { left: 'Rama else', right: 'Se ejecuta cuando la condición es false' },
              { left: 'Exclusión mutua', right: 'Solo una de las dos ramas puede ejecutarse' },
              { left: 'Cobertura total', right: 'Siempre se ejecuta una de las dos alternativas' }
            ],
            explanation: 'Principios de la bifurcación binaria if-else.'
          },
          {
            type: 'code_cloze',
            prompt: 'En una estructura if-else, las dos ramas son mutuamente ___:',
            blank: 'Solo una de las ramas se ejecutará porque son ___.',
            options: ['excluyentes', 'iguales', 'infinitas', 'inversas'],
            correctOption: 'excluyentes',
            explanation: 'Excluyentes significa que si se cumple una, es imposible que se ejecute la otra.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá: val x = 10; if (x > 20) println("Alto") else println("Bajo") ?',
            options: ['Bajo', 'Alto', 'Alto Bajo', 'Error'],
            correctIndex: 0,
            explanation: '10 > 20 es false, por lo que se ejecuta la alternativa else imprimiendo "Bajo".'
          },
          {
            type: 'code_builder',
            prompt: 'Construye el bloque else para mostrar Acceso Denegado:',
            tokens: ['else', '{', 'println("Acceso Denegado")', '}'],
            solution: ['else', '{', 'println("Acceso Denegado")', '}'],
            explanation: 'Sintaxis de la cláusula alternativa else.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error en la secuencia de palabras clave:',
            lines: [
              'else { // Error: else no puede existir sin un if previo',
              '    println("Error de flujo")',
              '}'
            ],
            bugIndex: 0,
            explanation: 'Una cláusula else es un complemento; no puede declararse sin un bloque if anterior.'
          },
          {
            type: 'predict_output',
            prompt: 'Si tenemos: val stock = 0; if (stock > 0) println("Hay $stock") else println("Agotado"); ¿qué sale?',
            options: ['Agotado', 'Hay 0', 'Hay stock', 'Error'],
            correctIndex: 0,
            explanation: '0 > 0 es false, por lo que el bloque else muestra "Agotado".'
          }
        ]
      },
      {
        level: 3,
        title: '3. Varias posibilidades con else if',
        desc: 'Permite evaluar múltiples condiciones en cadena de forma ordenada: el programa comprueba cada else if secuencialmente y ejecuta la primera que resulte verdadera.',
        analogy: 'Un podio de premiación: si quedaste en 1er puesto -> Medalla de Oro. Si no, pero quedaste en 2do puesto -> Plata. Si no, pero quedaste en 3ro -> Bronce. En cualquier otro caso -> Diploma de participación.',
        code: `fun main() {\n    val nota = 8.5\n    if (nota >= 9.0) {\n        println("Excelente")\n    } else if (nota >= 7.0) {\n        println("Aprobado")\n    } else {\n        println("Reprobado")\n    }\n}`,
        output: `Aprobado`,
        tip: 'Ordena tus condiciones else if de la más específica a la más general para evitar que una condición amplia tape a las demás.',
        pitfall: 'Escribir if independientes en lugar de else if: los if separados se evaluarán todos individualmente.',
        keyPoints: [
          'else if encadena comprobaciones alternativas mutuamente excluyentes.',
          'Se evalúan en estricto orden de arriba hacia abajo.',
          'En cuanto una condición resulta true, su bloque se ejecuta y el resto de la cadena se descarta.',
          'El bloque else final es opcional y actúa como caso por defecto.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué mensaje se mostrará para una temperatura de 22 grados?',
            code: 'val temp = 22\nif (temp > 30) {\n    println("Calor")\n} else if (temp > 15) {\n    println("Agradable")\n} else {\n    println("Frío")\n}',
            options: ['Agradable', 'Calor', 'Frío', 'Agradable\nFrío'],
            correctIndex: 0,
            explanation: '22 > 30 es false; salta al primer else if: 22 > 15 es true, imprime "Agradable" y termina la cadena.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para evaluar una segunda condición alternativa en la misma estructura usamos ___:',
            blank: 'if (x == 1) { ... } ___ (x == 2) { ... }',
            options: ['else if', 'elseif', 'elif', 'then if'],
            correctOption: 'else if',
            explanation: 'En Kotlin se escribe separado: else if.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la cláusula else if para comprobar si nota es mayor o igual a 7:',
            tokens: ['else', 'if', '(', 'nota', '>=', '7.0', ')', '{', '}'],
            solution: ['else', 'if', '(', 'nota', '>=', '7.0', ')', '{', '}'],
            explanation: 'Sintaxis canónica de la bifurcación encadenada else if.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error de sintaxis de lenguaje extranjero:',
            lines: [
              'if (nivel == 1) { println("Principiante") }',
              'elif (nivel == 2) { // Error: en Kotlin no existe elif (es de Python)',
              '    println("Intermedio")'
            ],
            bugIndex: 1,
            explanation: 'Kotlin no usa elif; la sintaxis oficial es else if.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la puntuación con el resultado según la escala de calificaciones:',
            pairs: [
              { left: 'nota = 95 (>= 90)', right: 'Calificación A' },
              { left: 'nota = 82 (>= 80)', right: 'Calificación B' },
              { left: 'nota = 71 (>= 70)', right: 'Calificación C' },
              { left: 'nota = 55 (< 70)', right: 'Calificación F' }
            ],
            explanation: 'El encadenamiento else if es ideal para rangos escalonados.'
          },
          {
            type: 'code_cloze',
            prompt: 'En una cadena if - else if - else, en cuanto una condición es verdadera, el resto de condiciones se ___:',
            blank: 'Al cumplirse una rama, las siguientes se ___.',
            options: ['omiten', 'ejecutan', 'borran', 'reinician'],
            correctOption: 'omiten',
            explanation: 'El flujo abandona de inmediato la estructura condicional tras ejecutar la primera rama coincidente.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá si edad = 10 en: if (edad < 5) println("Bebé") else if (edad < 12) println("Niño") else println("Adulto") ?',
            options: ['Niño', 'Bebé', 'Adulto', 'Bebé Niño'],
            correctIndex: 0,
            explanation: '10 < 5 es false; 10 < 12 es true, por lo que imprime "Niño".'
          },
          {
            type: 'code_builder',
            prompt: 'Construye el cierre final por defecto con else:',
            tokens: ['else', '{', 'println("Sin clasificar")', '}'],
            solution: ['else', '{', 'println("Sin clasificar")', '}'],
            explanation: 'El else final atrapa cualquier caso no contemplado en los else if previos.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error de orden lógico donde una condición bloquea a la otra:',
            lines: [
              'val edad = 70',
              'if (edad >= 18) { println("Mayor de edad") } // Atrapa a todos los mayores de 18',
              'else if (edad >= 65) { println("Jubilado") } // Código inalcanzable (dead code)'
            ],
            bugIndex: 2,
            explanation: 'Cualquier persona de 65 o más ya entró en >= 18, por lo que la rama de jubilado nunca se ejecutará.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuántos bloques de código pueden ejecutarse a lo sumo en una misma estructura if / else if / else?',
            options: [
              'Exactamente uno como máximo',
              'Tantos como condiciones sean verdaderas',
              'Todos los bloques',
              'Ninguno si el computador está ocupado'
            ],
            correctIndex: 0,
            explanation: 'La estructura garantiza la ejecución de como máximo un solo bloque.'
          }
        ]
      },
      {
        level: 4,
        title: '4. Selección de casos con when',
        desc: 'La estructura when es la alternativa moderna y elegante de Kotlin para comparar una variable contra múltiples valores posibles, reemplazando con ventajas al clásico switch.',
        analogy: 'El teclado de un ascensor: presionas un botón (piso 1, 2, 3 o 4) y la cabina se desplaza directamente al nivel que seleccionaste sin revisar los demás.',
        code: `fun main() {\n    val diaSemana = 2\n    when (diaSemana) {\n        1 -> println("Lunes")\n        2 -> println("Martes")\n        3 -> println("Miércoles")\n        else -> println("Otro día")\n    }\n}`,
        output: `Martes`,
        tip: 'when no necesita sentencias break (como en Java o C++); Kotlin salta automáticamente al finalizar la rama coincidente.',
        pitfall: 'Olvidar la flecha -> entre el valor a comparar y la instrucción a ejecutar.',
        keyPoints: [
          'when (variable) { valor -> accion } evalúa coincidencias limpiamente.',
          'Soporta múltiples valores por rama separados por comas: 1, 2, 3 -> ...',
          'else actúa como la opción por defecto cuando ninguna rama coincide.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá esta estructura when para codigo = 404?',
            code: 'val codigo = 404\nwhen (codigo) {\n    200 -> println("OK")\n    404 -> println("No Encontrado")\n    500 -> println("Error Servidor")\n    else -> println("Desconocido")\n}',
            options: ['No Encontrado', 'OK', 'Error Servidor', 'Desconocido'],
            correctIndex: 0,
            explanation: 'when evalúa directamente la coincidencia con 404 y ejecuta su rama asociada.'
          },
          {
            type: 'code_cloze',
            prompt: 'El símbolo que conecta el caso a evaluar con la instrucción en una rama de when es ___:',
            blank: '1 ___ println("Uno")',
            options: ['->', '=>', ':', '::'],
            correctOption: '->',
            explanation: 'La flecha -> (guion y mayor que) vincula el patrón con su acción.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la rama de when para el caso 1 que imprime "Inicio":',
            tokens: ['1', '->', 'println("Inicio")'],
            solution: ['1', '->', 'println("Inicio")'],
            explanation: 'Sintaxis básica de una rama en when.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error de sintaxis en el when:',
            lines: [
              'when (opcion) {',
              '    1: println("Uno") // Error: se debe usar -> en vez de dos puntos :',
              '    else -> println("Otro")'
            ],
            bugIndex: 1,
            explanation: 'En Kotlin se utiliza la flecha ->, no los dos puntos : del switch de otros lenguajes.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el caso del when con su descripción:',
            pairs: [
              { left: 'when (x)', right: 'Expresión que evalúa la variable x' },
              { left: '1, 2, 3 ->', right: 'Múltiples valores que comparten una misma acción' },
              { left: 'else ->', right: 'Rama por defecto si ningún caso coincidió' },
              { left: '-> { ... }', right: 'Bloque con múltiples instrucciones para una rama' }
            ],
            explanation: 'Características expresivas de la estructura when en Kotlin.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para agrupar varios valores en una misma rama de when los separamos con ___:',
            blank: 'when (dia) {\n    6___ 7 -> println("Fin de semana")\n}',
            options: [',', '|', 'o', ';'],
            correctOption: ',',
            explanation: 'La coma , permite asociar múltiples valores a una misma rama de ejecución.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá: val semaforo = "Rojo"; when (semaforo) { "Verde" -> println("Avance"); "Rojo" -> println("Alto") } ?',
            options: ['Alto', 'Avance', 'Rojo', 'Error'],
            correctIndex: 0,
            explanation: 'when compara cadenas de texto directamente y ejecuta la rama "Rojo".'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la rama por defecto else en when:',
            tokens: ['else', '->', 'println("Opción no válida")'],
            solution: ['else', '->', 'println("Opción no válida")'],
            explanation: 'else -> maneja cualquier valor no especificado previamente.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error de concepto respecto al break en Kotlin:',
            lines: [
              'when (x) {',
              '    1 -> { println("Uno"); break } // Error: break no es necesario ni válido aquí',
              '    else -> println("Otro")'
            ],
            bugIndex: 1,
            explanation: 'A diferencia del switch de C/Java, when en Kotlin no sufre de fall-through; el break es innecesario.'
          },
          {
            type: 'predict_output',
            prompt: 'Si x = 2, ¿qué imprimirá: when (x) { 1, 2, 3 -> println("Pequeño"); else -> println("Grande") } ?',
            options: ['Pequeño', 'Grande', '2', 'Error'],
            correctIndex: 0,
            explanation: '2 está incluido en la lista 1, 2, 3, por lo que imprime "Pequeño".'
          }
        ]
      },
      {
        level: 5,
        title: '5. Condiciones combinadas e intervalos',
        desc: 'Uso del operador in para comprobar si un valor pertenece a un rango (ej. in 1..10) o no pertenece (!in 1..10), combinando condiciones complejas con && y ||.',
        analogy: 'Un boleto de cine con rango de edad: la categoría infantil aplica para edades en el rango de 3 a 12 años (edad in 3..12). No necesitas escribir diez comparaciones separadas.',
        code: `fun main() {\n    val calificacion = 8\n    val esValida = calificacion in 1..10\n    when (calificacion) {\n        in 9..10 -> println("Sobresaliente")\n        in 7..8  -> println("Notable")\n        in 1..6  -> println("Insuficiente")\n        else     -> println("Nota fuera de rango")\n    }\n}`,
        output: `Notable`,
        tip: 'El operador in .. genera rangos inclusivos (1..10 incluye el 1 y el 10); para excluir el final usa until.',
        pitfall: 'Escribir el rango al revés como 10..1 con dos puntos; para rangos descendentes se usa downTo.',
        keyPoints: [
          'in a..b comprueba si el valor está dentro del intervalo cerrado [a, b].',
          '!in a..b comprueba si el valor está fuera del rango.',
          'Se pueden usar rangos directamente en las ramas de un when.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es el resultado de la comprobación: 5 in 1..10 ?',
            options: ['true', 'false', '5', 'Error'],
            correctIndex: 0,
            explanation: '5 se encuentra dentro del rango inclusivo del 1 al 10, por lo que devuelve true.'
          },
          {
            type: 'code_cloze',
            prompt: 'El operador para verificar si un valor pertenece a un rango es ___:',
            blank: 'if (edad ___ 18..65) { println("Edad laboral") }',
            options: ['in', 'between', 'within', 'inside'],
            correctOption: 'in',
            explanation: 'in es el operador nativo de pertenencia en rangos de Kotlin.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la condición para comprobar si x está en el rango de 1 a 100:',
            tokens: ['x', 'in', '1..100'],
            solution: ['x', 'in', '1..100'],
            explanation: '1..100 define el rango cerrado inclusivo de 1 a 100.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con el error al intentar crear un rango:',
            lines: [
              'val a = 5 in 1..10',
              'val b = 5 in 1...10 // Error: los rangos se definen con dos puntos .., no tres',
              'val c = 15 !in 1..10'
            ],
            bugIndex: 1,
            explanation: 'En Kotlin los rangos se escriben con dos puntos .. (ej. 1..10).'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la expresión de rango con su significado:',
            pairs: [
              { left: 'x in 1..5', right: 'Verifica si x está entre 1 y 5 (inclusive)' },
              { left: 'x !in 1..5', right: 'Verifica si x NO está entre 1 y 5' },
              { left: 'in 90..100 ->', right: 'Rama de when para notas de 90 a 100' },
              { left: 'c in \'a\'..\'z\'', right: 'Verifica si c es una letra minúscula' }
            ],
            explanation: 'Los rangos en Kotlin funcionan con números, caracteres y cualquier tipo comparable.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para verificar que un valor NO esté dentro de un rango usamos el operador ___:',
            blank: 'if (mes ___ 1..12) { println("Mes inválido") }',
            options: ['!in', 'not in', 'out', '!='],
            correctOption: '!in',
            explanation: '!in niega la pertenencia en el rango.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué valor produce: println(10 in 1..10); ?',
            options: ['true', 'false', '10', 'null'],
            correctIndex: 0,
            explanation: 'Los rangos con .. son inclusivos en ambos extremos; el 10 está incluido.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye una rama de when que verifique si el puntaje está en 0..59:',
            tokens: ['in', '0..59', '->', 'println("Reprobado")'],
            solution: ['in', '0..59', '->', 'println("Reprobado")'],
            explanation: 'Uso directo de intervalos con in dentro de when.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con el rango descendente mal construido:',
            lines: [
              'val valido = 5 in 1..10',
              'val inverso = 5 in 10..1 // Cuidado: 10..1 genera un rango vacío',
              'println(valido)'
            ],
            bugIndex: 1,
            explanation: 'El operador .. solo crea rangos ascendentes; 10..1 está vacío. Para descender se usa 10 downTo 1.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá: val c = \'m\'; println(c in \'a\'..\'z\'); ?',
            options: ['true', 'false', 'm', 'Error'],
            correctIndex: 0,
            explanation: '\'m\' se encuentra en el rango alfabético entre \'a\' y \'z\', devolviendo true.'
          }
        ]
      },
      {
        level: 6,
        title: '6. if y when como expresiones',
        desc: 'En Kotlin, tanto if como when son expresiones que devuelven un valor como resultado. Esto permite asignarlas directamente a variables, sustituyendo con elegancia al operador ternario.',
        analogy: 'Una máquina expendedora: introduces una moneda y una selección (condición), y la ranura te entrega directamente una lata de refresco (el valor devuelto que guardas en tu mano).',
        code: `fun main() {\n    val a = 15\n    val b = 20\n    // if como expresión que devuelve el mayor\n    val mayor = if (a > b) a else b\n    \n    // when como expresión\n    val estado = when (mayor) {\n        in 1..10 -> "Bajo"\n        else     -> "Alto"\n    }\n    println("Mayor: $mayor ($estado)")\n}`,
        output: `Mayor: 20 (Alto)`,
        tip: 'Cuando usas if o when como expresión, la cláusula else es obligatoria para garantizar que siempre haya un valor de retorno.',
        pitfall: 'Olvidar el else al asignar if a una variable: "val x = if (c) 1" causará error de compilación.',
        keyPoints: [
          'En Kotlin no existe el operador ternario (?:) para condiciones; se usa "if (c) a else b".',
          'La última línea de cada rama se convierte en el valor de retorno de la expresión.',
          'La exhaustividad es obligatoria: todas las posibilidades deben estar cubiertas (requiere else).'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué valor se asignará a la variable resultado?',
            code: 'val puntos = 75\nval resultado = if (puntos >= 70) "Aprobado" else "Reprobado"\nprintln(resultado)',
            options: ['Aprobado', 'Reprobado', 'true', '75'],
            correctIndex: 0,
            explanation: 'Como 75 >= 70 es true, la expresión if devuelve directamente "Aprobado".'
          },
          {
            type: 'code_cloze',
            prompt: 'Al usar if como expresión que devuelve un valor para guardarlo en una variable, la cláusula ___ es obligatoria:',
            blank: 'val res = if (activo) "ON" ___ "OFF"',
            options: ['else', 'then', 'default', 'finally'],
            correctOption: 'else',
            explanation: 'else es imprescindible para que la variable siempre reciba un valor independientemente de la condición.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la asignación condicional que calcula el máximo entre x e y:',
            tokens: ['val', 'max', '=', 'if', '(x > y)', 'x', 'else', 'y'],
            solution: ['val', 'max', '=', 'if', '(x > y)', 'x', 'else', 'y'],
            explanation: 'Sintaxis concisa que reemplaza al operador ternario en Kotlin.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error por omitir el else obligatorio en una expresión:',
            lines: [
              'val activo = true',
              'val texto = if (activo) "Activo" // Error: if como expresión requiere rama else',
              'println(texto)'
            ],
            bugIndex: 1,
            explanation: 'Si activo fuera false, la variable texto se quedaría sin valor; el compilador exige else.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el concepto de expresión con su regla:',
            pairs: [
              { left: 'if como expresión', right: 'Devuelve un valor y se puede asignar a una variable' },
              { left: 'when como expresión', right: 'Exige exhaustividad (cubrir todos los casos con else)' },
              { left: 'Última línea de rama', right: 'Es el valor concreto que devuelve la rama' },
              { left: 'Operador ternario', right: 'No existe en Kotlin; se usa if-else en su lugar' }
            ],
            explanation: 'Comprender que en Kotlin casi todo es una expresión es un salto de calidad profesional.'
          },
          {
            type: 'code_cloze',
            prompt: 'En un bloque multilínea dentro de una rama de if o when, el valor devuelto es la ___ línea:',
            blank: 'El valor retornado por la rama es su ___ línea evaluada.',
            options: ['última', 'primera', 'del medio', 'declarada'],
            correctOption: 'última',
            explanation: 'La última expresión calculada dentro de las llaves de la rama es el valor que se devuelve.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de este when como expresión?',
            code: 'val nivel = 1\nval titulo = when (nivel) {\n    1 -> "Novato"\n    2 -> "Experto"\n    else -> "Maestro"\n}\nprintln(titulo)',
            options: ['Novato', 'Experto', 'Maestro', '1'],
            correctIndex: 0,
            explanation: 'when evalúa nivel = 1 y devuelve "Novato", que se asigna a la variable titulo.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la asignación de paridad usando if como expresión:',
            tokens: ['val', 'tipo', '=', 'if', '(n % 2 == 0)', '"Par"', 'else', '"Impar"'],
            solution: ['val', 'tipo', '=', 'if', '(n % 2 == 0)', '"Par"', 'else', '"Impar"'],
            explanation: 'Asigna directamente "Par" o "Impar" según el residuo.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la rama de tipos incompatibles en la expresión:',
            lines: [
              'val condicion = true',
              'val resultado: Int = if (condicion) 100 else "Cien" // Error: "Cien" es String, no Int',
              'println(resultado)'
            ],
            bugIndex: 1,
            explanation: 'Ambas ramas deben devolver un tipo compatible con el tipo esperado (Int).'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué valor se imprime: val a = 5; val b = 8; println(if (a < b) b - a else a - b); ?',
            options: ['3', '-3', '5', '8'],
            correctIndex: 0,
            explanation: '5 < 8 es true, por lo que evalúa b - a = 8 - 5 = 3.'
          }
        ]
      }
    ]
  }
];
