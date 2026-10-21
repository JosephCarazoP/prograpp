export const KOTLIN_UNITS_U02_U03 = [
  // ══════════════════════════════════════════════════════════
  // UNIDAD 2: Variables y tipos de datos (7 lecciones)
  // ══════════════════════════════════════════════════════════
  {
    id: 2,
    title: 'Variables y tipos de datos',
    description: 'Aprende a declarar variables con val y var, inmutabilidad, tipos primitivos (Int, Double, Boolean, Char, String), inferencia de tipos, nombres descriptivos en camelCase e interpolación de variables.',
    icon: 'Layers',
    color: '#3B82F6',
    stage: 'ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA',
    lessons: [
      {
        level: 1,
        title: '1. Declaración y asignación de variables',
        desc: 'Una variable es un contenedor con nombre en la memoria RAM que almacena un dato para usarlo o modificarlo durante la ejecución del programa.',
        analogy: 'Una caja etiquetada en una mudanza: la etiqueta exterior es el nombre de la variable (ej. "libros") y lo que colocas adentro es el valor.',
        code: `fun main() {\n    val edad = 20\n    println(edad)\n}`,
        output: `20`,
        tip: 'El operador = en programación significa "asignar" o "guardar en", no una igualdad matemática.',
        pitfall: 'Intentar usar una variable antes de haberla declarado.',
        keyPoints: [
          'Declarar: reservar un espacio en memoria con un identificador.',
          'Asignar: almacenar un valor dentro de la variable mediante el operador =.',
          'La inicialización combina la declaración y la primera asignación.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué valor se imprimirá en consola al ejecutar este código?',
            code: 'val puntos = 50\nprintln(puntos)',
            options: ['50', 'puntos', 'val puntos', 'Error'],
            correctIndex: 0,
            explanation: 'println imprime el valor almacenado en la variable puntos, que es 50.'
          },
          {
            type: 'code_cloze',
            prompt: 'El símbolo que se utiliza para asignar un valor a una variable en Kotlin es ___:',
            blank: 'val nivel ___ 1',
            options: ['=', '==', '->', ':'],
            correctOption: '=',
            explanation: 'El signo igual simple = es el operador de asignación en Kotlin.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la declaración de una variable llamada vidas con valor inicial 3:',
            tokens: ['val', 'vidas', '=', '3'],
            solution: ['val', 'vidas', '=', '3'],
            explanation: 'val vidas = 3 declara la variable inmutable vidas con el número 3.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea donde se intenta usar una variable no declarada:',
            lines: [
              '1. val base = 10',
              '2. println(altura) // Error: altura no ha sido declarada',
              '3. val altura = 5'
            ],
            bugIndex: 1,
            explanation: 'En Kotlin no puedes acceder a una variable antes de su declaración.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja los términos de variables con su significado:',
            pairs: [
              { left: 'Identificador', right: 'El nombre que le damos a la variable' },
              { left: 'Valor', right: 'El dato concreto guardado en la memoria' },
              { left: 'Operador =', right: 'Asigna el valor de la derecha a la variable de la izquierda' },
              { left: 'Memoria RAM', right: 'Lugar físico donde se almacenan las variables en ejecución' }
            ],
            explanation: 'Conceptos fundamentales sobre el ciclo de vida de una variable.'
          },
          {
            type: 'code_cloze',
            prompt: 'Al declarar val total = 100, la palabra total corresponde al ___ de la variable:',
            blank: 'El nombre que identifica a la variable se llama ___.',
            options: ['nombre o identificador', 'tipo', 'operador', 'salto'],
            correctOption: 'nombre o identificador',
            explanation: 'El identificador permite referenciar el dato posteriormente en el código.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: val precio = 80; println(precio); ?',
            options: ['80', 'precio', 'val', '0'],
            correctIndex: 0,
            explanation: 'Se almacena 80 en precio y se emite en consola.'
          },
          {
            type: 'code_builder',
            prompt: 'Ordena los tokens para declarar el saldo inicial de una cuenta:',
            tokens: ['val', 'saldo', '=', '1500'],
            solution: ['val', 'saldo', '=', '1500'],
            explanation: 'Sintaxis básica de declaración y asignación.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error en la sintaxis de asignación:',
            lines: [
              'val edad = 25',
              '50 = val puntos // Error: el valor no puede ir a la izquierda',
              'val activo = true'
            ],
            bugIndex: 1,
            explanation: 'La variable de destino siempre debe ir a la izquierda del operador =.'
          },
          {
            type: 'predict_output',
            prompt: 'Si declaramos val x = 7; val y = x; println(y); ¿qué se muestra?',
            options: ['7', 'x', 'y', 'Error'],
            correctIndex: 0,
            explanation: 'La variable y toma una copia del valor de x en ese momento, es decir, 7.'
          }
        ]
      },
      {
        level: 2,
        title: '2. Diferencia entre val y var',
        desc: 'En Kotlin, val define variables inmutables (de solo lectura, no reasignables), mientras que var define variables mutables (su valor puede cambiar).',
        analogy: 'val es como escribir con tinta permanente en un diploma: una vez escrito, no se puede cambiar. var es como escribir con lápiz: puedes borrar y escribir un nuevo valor.',
        code: `fun main() {\n    val pi = 3.1416 // Inmutable\n    var contador = 1 // Mutable\n    contador = 2    // Válido\n    // pi = 3.15   // Error de compilación\n    println(contador)\n}`,
        output: `2`,
        tip: 'Regla de oro de Kotlin: usa val por defecto en todo tu código; usa var únicamente cuando tengas una necesidad explícita de cambiar el valor.',
        pitfall: 'Intentar reasignar una variable declarada con val producirá el error "Val cannot be reassigned".',
        keyPoints: [
          'val: inmutable (read-only). Hace el código más seguro, predecible y libre de efectos secundarios.',
          'var: mutable. Permite cambiar el valor guardado cuantas veces sea necesario.',
          'La inmutabilidad previene errores en programas concurrentes y lógicas complejas.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué ocurre al compilar este código en Kotlin?',
            code: 'val maximo = 100\nmaximo = 200\nprintln(maximo)',
            options: [
              'Error de compilación: Val cannot be reassigned',
              'Imprime 200',
              'Imprime 100',
              'Imprime null'
            ],
            correctIndex: 0,
            explanation: 'Las variables val son inmutables de solo lectura y no permiten ser reasignadas.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para una variable cuyo valor deba cambiar a lo largo del tiempo usamos la palabra clave ___:',
            blank: '___ contador = 0\ncontador = contador + 1',
            options: ['var', 'val', 'const', 'let'],
            correctOption: 'var',
            explanation: 'var permite la reasignación de nuevos valores a la variable.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la declaración inmutable del nombre de una ciudad:',
            tokens: ['val', 'ciudad', '=', '"Cartago"'],
            solution: ['val', 'ciudad', '=', '"Cartago"'],
            explanation: 'Al no cambiar el nombre, val es la mejor opción de diseño.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea que provocará un error de reasignación prohibida:',
            lines: [
              '1. val dni = "12345678"',
              '2. dni = "87654321" // Error: val no puede ser reasignado',
              '3. println(dni)'
            ],
            bugIndex: 1,
            explanation: 'dni se declaró con val, por lo que reasignarle un nuevo valor es ilegal en Kotlin.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja cada palabra clave con su regla de mutabilidad:',
            pairs: [
              { left: 'val', right: 'Inmutable (solo lectura, no se puede cambiar)' },
              { left: 'var', right: 'Mutable (se puede reasignar un nuevo valor)' },
              { left: 'Regla de oro', right: 'Usar val por defecto siempre que sea posible' },
              { left: 'Reasignación', right: 'Guardar un nuevo dato en una variable var existente' }
            ],
            explanation: 'Diferenciar val y var es uno de los conceptos más distintivos de Kotlin.'
          },
          {
            type: 'code_cloze',
            prompt: 'Si declaras val clave = "1234", el valor "1234" es ___:',
            blank: 'El valor de una variable val es ___.',
            options: ['inmutable', 'mutable', 'aleatorio', 'opcional'],
            correctOption: 'inmutable',
            explanation: 'Inmutable significa que no puede ser alterado tras su inicialización.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es el resultado de este código?',
            code: 'var puntaje = 10\npuntaje = 20\nprintln(puntaje)',
            options: ['20', '10', '30', 'Error'],
            correctIndex: 0,
            explanation: 'Como puntaje es var, su valor se actualiza a 20 con éxito.'
          },
          {
            type: 'code_builder',
            prompt: 'Declara una variable mutable llamada temperatura con valor inicial 22:',
            tokens: ['var', 'temperatura', '=', '22'],
            solution: ['var', 'temperatura', '=', '22'],
            explanation: 'Usa var porque la temperatura cambia continuamente.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la variable que debería ser val por buena práctica:',
            lines: [
              'var PI = 3.14159 // Mala práctica: una constante matemática nunca debe cambiar',
              'var pasos = 0',
              'pasos = pasos + 10'
            ],
            bugIndex: 0,
            explanation: 'El valor de PI es fijo e inmutable, por lo que debe declararse con val.'
          },
          {
            type: 'predict_output',
            prompt: '¿Por qué la comunidad de Kotlin recomienda preferir val sobre var?',
            options: [
              'Porque reduce errores inesperados al garantizar que los datos no cambiarán por sorpresa',
              'Porque las variables var no funcionan en computadoras portátiles',
              'Porque val hace que el código sea de color verde en la pantalla',
              'Porque var solo permite almacenar números pares'
            ],
            correctIndex: 0,
            explanation: 'La inmutabilidad elimina efectos secundarios y hace el código predecible.'
          }
        ]
      },
      {
        level: 3,
        title: '3. Tipos: Int, Double, Boolean, Char y String',
        desc: 'Los tipos de datos indican al compilador qué clase de información contiene una variable: números enteros (Int), decimales (Double), valores de verdad (Boolean), caracteres individuales (Char) o texto (String).',
        analogy: 'Los compartimentos de una caja organizadora: un espacio para monedas (Int), una taza medidora para líquidos con mililitros (Double), un interruptor on/off (Boolean) y una carpeta para hojas con texto (String).',
        code: `fun main() {\n    val edad: Int = 21\n    val promedio: Double = 9.4\n    val aprobado: Boolean = true\n    val seccion: Char = 'A'\n    val nombre: String = "Valeria"\n    println("$nombre ($seccion) - Promedio: $promedio")\n}`,
        output: `Valeria (A) - Promedio: 9.4`,
        tip: 'Char usa comillas simples (\'A\') para un solo carácter; String usa comillas dobles ("Hola") para secuencias de texto.',
        pitfall: 'Escribir un número decimal como 9,5 con coma en vez de punto (9.5) o usar comillas dobles para un Char.',
        keyPoints: [
          'Int: números enteros positivos o negativos sin decimales (ej. 42).',
          'Double: números con punto decimal de doble precisión (ej. 3.1416).',
          'Boolean: solo dos estados posibles: true o false.',
          'Char: un único símbolo o letra entre comillas simples (\'K\').',
          'String: cadenas de texto entre comillas dobles ("Kotlin").'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué tipo de dato corresponde al valor 19.95 en Kotlin?',
            options: ['Double', 'Int', 'String', 'Boolean'],
            correctIndex: 0,
            explanation: 'Los números con parte decimal se representan por defecto como Double en Kotlin.'
          },
          {
            type: 'code_cloze',
            prompt: 'El tipo de dato que solo puede tener valores true o false se llama ___:',
            blank: 'val activo: ___ = true',
            options: ['Boolean', 'Int', 'Char', 'String'],
            correctOption: 'Boolean',
            explanation: 'Boolean representa valores lógicos booleanos de verdad o falsedad.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la declaración de un carácter con comillas simples:',
            tokens: ['val', 'letra:', 'Char', '=', "'Z'"],
            solution: ['val', 'letra:', 'Char', '=', "'Z'"],
            explanation: 'Char se declara con comillas simples y almacena un solo carácter.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error en el delimitador de caracteres:',
            lines: [
              'val edad: Int = 20',
              'val inicial: Char = "M" // Error: Char usa comillas simples \'M\'',
              'val activo: Boolean = false'
            ],
            bugIndex: 1,
            explanation: 'En Kotlin, las comillas dobles "" son exclusivas de String; Char requiere comillas simples \'\'.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja cada valor con su tipo correspondiente en Kotlin:',
            pairs: [
              { left: '42', right: 'Int' },
              { left: '3.14', right: 'Double' },
              { left: "'X'", right: 'Char' },
              { left: '"Hola"', right: 'String' }
            ],
            explanation: 'Reconocer los tipos primitivos básicos es esencial para estructurar datos.'
          },
          {
            type: 'code_cloze',
            prompt: 'Una secuencia de caracteres entre comillas dobles pertenece al tipo ___:',
            blank: 'val saludo: ___ = "Bienvenidos"',
            options: ['String', 'Char', 'Int', 'Double'],
            correctOption: 'String',
            explanation: 'String almacena secuencias de texto de cualquier longitud.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: val activo = false; println(!activo); ?',
            options: ['true', 'false', '!activo', 'Error'],
            correctIndex: 0,
            explanation: 'El operador ! niega el valor booleano: !false se convierte en true.'
          },
          {
            type: 'code_builder',
            prompt: 'Declara explícitamente un entero llamado nivel con valor 5:',
            tokens: ['val', 'nivel:', 'Int', '=', '5'],
            solution: ['val', 'nivel:', 'Int', '=', '5'],
            explanation: 'Sintaxis con anotación explícita de tipo Int.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error de asignación de tipo incompatible:',
            lines: [
              'val altura: Double = 1.75',
              'val cantidad: Int = 10.5 // Error: 10.5 es Double, no Int',
              'val mensaje: String = "OK"'
            ],
            bugIndex: 1,
            explanation: 'No se puede asignar un decimal 10.5 directamente a una variable de tipo entero Int.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué valor imprimirá: val res = 10 > 5; println(res); ?',
            options: ['true', 'false', '10', '5'],
            correctIndex: 0,
            explanation: 'La comparación 10 > 5 es verdadera, por lo que res almacena el booleano true.'
          }
        ]
      },
      {
        level: 4,
        title: '4. Inferencia de tipos y declaración explícita',
        desc: 'Kotlin infiere automáticamente el tipo de una variable según el valor inicial asignado, pero también permite declararlo explícitamente con dos puntos (: Tipo).',
        analogy: 'Un barista experto: si pides "un espresso", sabe automáticamente que es café (inferencia). Si llevas un termo con la etiqueta "Para Café", estás indicando explícitamente el tipo de contenido que esperas.',
        code: `fun main() {\n    val edad = 25          // Inferencia: Kotlin deduce Int\n    val sueldo: Double = 1500.0 // Declaración explícita\n    println(edad)\n    println(sueldo)\n}`,
        output: `25\n1500.0`,
        tip: 'Usa inferencia para código más limpio y legible; usa tipo explícito cuando la inicialización sea compleja o quieras documentar claramente el tipo en interfaces públicas.',
        pitfall: 'Declarar una variable sin tipo explícito y sin valor inicial: "val x" provocará un error de compilación.',
        keyPoints: [
          'Inferencia: el compilador determina el tipo estáticamente en tiempo de compilación.',
          'Declaración explícita: se especifica con ": Tipo" después del nombre de la variable.',
          'Una vez asignado un tipo (inferido o explícito), no puede cambiarse durante la ejecución.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: 'En la instrucción val costo = 450, ¿qué tipo deduce Kotlin para costo?',
            options: ['Int', 'Double', 'String', 'Any'],
            correctIndex: 0,
            explanation: 'Al ser un número entero literal sin decimales, Kotlin infiere estáticamente el tipo Int.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para declarar explícitamente el tipo de una variable se utiliza el símbolo ___:',
            blank: 'val nombre___ String = "Camila"',
            options: [':', '=', '->', ';'],
            correctOption: ':',
            explanation: 'Los dos puntos : preceden a la especificación formal del tipo de dato.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye una variable con declaración explícita de tipo Double:',
            tokens: ['val', 'peso:', 'Double', '=', '68.5'],
            solution: ['val', 'peso:', 'Double', '=', '68.5'],
            explanation: 'Declaración explícita completa con tipo Double.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea que provoca error de compilación por falta de tipo o valor:',
            lines: [
              '1. val a = 10 // Válido: infiere Int',
              '2. val b // Error: falta valor inicial o tipo explícito',
              '3. val c: String = "Hola" // Válido'
            ],
            bugIndex: 1,
            explanation: 'Si no hay valor inicial, el compilador no puede inferir el tipo y exige : Tipo explícito.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja cada declaración con su técnica de tipado:',
            pairs: [
              { left: 'val x = 10', right: 'Inferencia de tipo Int' },
              { left: 'val x: Double = 10.0', right: 'Declaración explícita de tipo Double' },
              { left: 'val x = "Texto"', right: 'Inferencia de tipo String' },
              { left: 'val x: Boolean', right: 'Declaración de tipo sin inicializar' }
            ],
            explanation: 'Comprender inferencia y tipado explícito agiliza la escritura de código.'
          },
          {
            type: 'code_cloze',
            prompt: 'Aunque Kotlin permite inferencia, es un lenguaje de tipado ___ y estático:',
            blank: 'Kotlin tiene un sistema de tipos ___.',
            options: ['fuerte', 'débil', 'dinámico', 'impreciso'],
            correctOption: 'fuerte',
            explanation: 'Tipado fuerte significa que el tipo se verifica en compilación y no cambia arbitrariamente.'
          },
          {
            type: 'predict_output',
            prompt: 'Si escribes: val tasa = 0.15; ¿qué tipo infiere el compilador?',
            options: ['Double', 'Int', 'Float', 'String'],
            correctIndex: 0,
            explanation: 'Los literales con punto decimal como 0.15 son inferidos automáticamente como Double.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye una variable con tipo explícito Boolean:',
            tokens: ['val', 'activo:', 'Boolean', '=', 'true'],
            solution: ['val', 'activo:', 'Boolean', '=', 'true'],
            explanation: 'Sintaxis explícita con valor booleano true.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error de incompatibilidad de tipos:',
            lines: [
              'val id: Int = 100',
              'val total: Int = "200" // Error: texto asignado a entero',
              'val ok: Boolean = true'
            ],
            bugIndex: 1,
            explanation: '"200" es un String; no se puede asignar a una variable declarada explícitamente como Int.'
          },
          {
            type: 'predict_output',
            prompt: '¿Permite Kotlin cambiar el tipo de una variable var después de inferirlo?',
            options: [
              'No, una vez inferido el tipo, la variable solo puede almacenar valores de ese mismo tipo',
              'Sí, var puede cambiar de String a Int libremente',
              'Solo si reinicias la computadora',
              'Sí, pero únicamente los días impares'
            ],
            correctIndex: 0,
            explanation: 'Kotlin es de tipado estático: el tipo fijado al inicio se mantiene durante toda la vida de la variable.'
          }
        ]
      },
      {
        level: 5,
        title: '5. Actualización de valores',
        desc: 'Las variables declaradas con var permiten actualizar su contenido asignándoles un nuevo valor del mismo tipo, sobrescribiendo el dato anterior.',
        analogy: 'La pizarra del marcador de un partido de fútbol: cuando un equipo anota, se borra el número anterior y se dibuja el nuevo puntaje actualizado.',
        code: `fun main() {\n    var stock = 50\n    stock = stock - 5 // Vendemos 5 unidades\n    stock = stock + 20 // Llega nuevo lote\n    println(stock)\n}`,
        output: `65`,
        tip: 'Recuerda que la expresión a la derecha del = se evalúa primero usando el valor actual antes de guardarse.',
        pitfall: 'Intentar actualizar una variable asignándole un dato de tipo diferente (ej. asignar un String a una variable Int).',
        keyPoints: [
          'Solo las variables declaradas con var pueden actualizar su valor.',
          'El nuevo valor asignado debe ser del mismo tipo que el tipo original.',
          'Al actualizar una variable, su valor anterior se destruye en la memoria.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es el valor final de cuenta tras estas actualizaciones?',
            code: 'var cuenta = 10\ncuenta = cuenta + 5\ncuenta = cuenta * 2\nprintln(cuenta)',
            options: ['30', '25', '20', '15'],
            correctIndex: 0,
            explanation: '10 + 5 = 15; luego 15 * 2 = 30.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para poder actualizar el valor de una variable, esta debe haber sido declarada con ___:',
            blank: '___ vidas = 3\nvidas = 2',
            options: ['var', 'val', 'const', 'fix'],
            correctOption: 'var',
            explanation: 'var habilita la mutabilidad para que el dato pueda actualizarse.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la instrucción para actualizar el saldo restándole 50:',
            tokens: ['saldo', '=', 'saldo', '-', '50'],
            solution: ['saldo', '=', 'saldo', '-', '50'],
            explanation: 'Evalúa saldo - 50 y guarda el resultado nuevamente en saldo.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea donde se comete un error de tipo al actualizar:',
            lines: [
              'var edad = 20',
              'edad = 21 // Válido',
              'edad = "veintidós" // Error: no se puede cambiar de Int a String'
            ],
            bugIndex: 2,
            explanation: 'En Kotlin, una variable no puede cambiar de tipo de dato tras haber sido declarada.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la operación de actualización con su efecto:',
            pairs: [
              { left: 'x = x + 1', right: 'Incrementa el valor de x en una unidad' },
              { left: 'x = x - 1', right: 'Decrementa el valor de x en una unidad' },
              { left: 'x = x * 2', right: 'Duplica el valor almacenado en x' },
              { left: 'x = 0', right: 'Sobrescribe x asignándole cero' }
            ],
            explanation: 'Patrones típicos de actualización de variables en algoritmos.'
          },
          {
            type: 'code_cloze',
            prompt: 'Cuando asignamos un nuevo valor a una variable var, el valor anterior se ___:',
            blank: 'Al asignar un nuevo dato, el valor anterior se ___.',
            options: ['sobrescribe', 'conserva', 'duplica', 'encripta'],
            correctOption: 'sobrescribe',
            explanation: 'El nuevo valor ocupa la posición en memoria eliminando el dato previo.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá este programa?',
            code: 'var mensaje = "Cargando"\nmensaje = "Listo"\nprintln(mensaje)',
            options: ['Listo', 'Cargando', 'Cargando Listo', 'Error'],
            correctIndex: 0,
            explanation: 'El valor de mensaje fue actualizado a "Listo" antes de la impresión.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la actualización para duplicar el valor de la variable bonus:',
            tokens: ['bonus', '=', 'bonus', '*', '2'],
            solution: ['bonus', '=', 'bonus', '*', '2'],
            explanation: 'bonus = bonus * 2 multiplica por 2 el valor previo.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error al intentar actualizar una constante:',
            lines: [
              'val limite = 100',
              'limite = 150 // Error: limite es val y no se puede actualizar',
              'println(limite)'
            ],
            bugIndex: 1,
            explanation: 'val impide la actualización; si necesitas cambiar su valor, declárala con var.'
          },
          {
            type: 'predict_output',
            prompt: 'Si tenemos: var a = 5; var b = 3; a = b; b = 10; println(a); ¿cuánto vale a?',
            options: ['3', '10', '5', '8'],
            correctIndex: 0,
            explanation: 'a recibió una copia del valor de b (3). Modificar b después a 10 no afecta a a.'
          }
        ]
      },
      {
        level: 6,
        title: '6. Nombres descriptivos',
        desc: 'El uso de identificadores significativos que revelen la intención del dato, siguiendo la convención estándar camelCase de Kotlin.',
        analogy: 'Ponerle etiquetas claras a frascos en un laboratorio químico: si etiquetas un frasco con "x" nadie sabe qué contiene; si lo etiquetas como "alcoholIsopropilico" cualquier profesional puede trabajar seguro.',
        code: `fun main() {\n    // Mal: val a = 120.0; val b = 3\n    // Bien: nombres descriptivos en camelCase\n    val precioUnitario = 120.0\n    val cantidadArticulos = 3\n    val costoTotal = precioUnitario * cantidadArticulos\n    println(costoTotal)\n}`,
        output: `360.0`,
        tip: 'El código se lee diez veces más de lo que se escribe; invierte tiempo en elegir nombres claros que no necesiten explicación.',
        pitfall: 'Usar nombres de una sola letra como x, y, z o nombres crípticos con abreviaturas incomprensibles.',
        keyPoints: [
          'camelCase: primera letra minúscula, mayúscula al inicio de palabras siguientes (ej. precioFinal).',
          'Los nombres deben revelar intención: qué dato guardan y para qué sirven.',
          'Evita palabras clave reservadas de Kotlin y no uses caracteres especiales ni espacios.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál de los siguientes identificadores cumple con la convención estándar camelCase de Kotlin?',
            options: [
              'fechaDeNacimiento',
              'fecha_de_nacimiento',
              'FechaDeNacimiento',
              'FECHADENACIMIENTO'
            ],
            correctIndex: 0,
            explanation: 'camelCase inicia en minúscula y pone mayúscula al inicio de cada palabra intermedia.'
          },
          {
            type: 'code_cloze',
            prompt: 'La convención de nomenclatura recomendada en Kotlin para variables es ___:',
            blank: 'En Kotlin las variables se nombran en formato ___.',
            options: ['camelCase', 'snake_case', 'kebab-case', 'SCREAMING_SNAKE'],
            correctOption: 'camelCase',
            explanation: 'camelCase es la convención oficial de la guía de estilo de Kotlin.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la declaración con un nombre descriptivo en camelCase:',
            tokens: ['val', 'totalAPagar', '=', '95.5'],
            solution: ['val', 'totalAPagar', '=', '95.5'],
            explanation: 'totalAPagar es autoexplicativo y sigue camelCase perfectamente.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la variable con un nombre prohibido por usar espacios:',
            lines: [
              'val edadUsuario = 25',
              'val sueldo mensual = 1200.0 // Error: no se permiten espacios en los identificadores',
              'val activo = true'
            ],
            bugIndex: 1,
            explanation: 'Los identificadores no pueden contener espacios en blanco; debe ser sueldoMensual.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el nombre pobre con su alternativa descriptiva recomendada:',
            pairs: [
              { left: 'val d', right: 'val distanciaEnKilometros' },
              { left: 'val p', right: 'val precioConImpuesto' },
              { left: 'val usr', right: 'val nombreDelUsuario' },
              { left: 'val temp', right: 'val temperaturaAmbiente' }
            ],
            explanation: 'Los nombres descriptivos reducen la necesidad de comentarios obvios.'
          },
          {
            type: 'code_cloze',
            prompt: 'Los nombres de variables en Kotlin son sensibles a las mayúsculas, propiedad llamada ___:',
            blank: 'Kotlin distingue entre mayúsculas y minúsculas porque es ___.',
            options: ['case-sensitive', 'case-insensitive', 'multilínea', 'dinámico'],
            correctOption: 'case-sensitive',
            explanation: 'edad y Edad representan dos variables totalmente distintas en Kotlin.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: val precioTotal = 15; println(precioTotal); ?',
            options: ['15', 'precioTotal', 'Total', 'Error'],
            correctIndex: 0,
            explanation: 'Se accede e imprime limpiamente el valor de la variable descriptiva.'
          },
          {
            type: 'code_builder',
            prompt: 'Declara la tasa de descuento con un nombre camelCase adecuado:',
            tokens: ['val', 'porcentajeDescuento', '=', '0.10'],
            solution: ['val', 'porcentajeDescuento', '=', '0.10'],
            explanation: 'porcentajeDescuento comunica claramente qué dato almacena.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el nombre de variable que comienza con un número prohibido:',
            lines: [
              'val primerPuesto = "Oro"',
              'val 2doPuesto = "Plata" // Error: los nombres no pueden iniciar con números',
              'val tercerPuesto = "Bronce"'
            ],
            bugIndex: 1,
            explanation: 'En Kotlin y la mayoría de lenguajes, un identificador nunca puede comenzar con un dígito numérico.'
          },
          {
            type: 'predict_output',
            prompt: '¿Por qué es preferible escribir "val edadEstudiante" en vez de "val e"?',
            options: [
              'Porque cualquier programador que lea el código entenderá de inmediato qué dato almacena',
              'Porque la computadora procesa más rápido los nombres largos',
              'Porque el compilador rechaza las variables de una sola letra',
              'Porque ahorra espacio en el disco duro'
            ],
            correctIndex: 0,
            explanation: 'La claridad y legibilidad del código para seres humanos es el estándar moderno de ingeniería de software.'
          }
        ]
      },
      {
        level: 7,
        title: '7. Interpolación de variables en mensajes',
        desc: 'Los String Templates permiten incrustar variables directamente dentro de cadenas de texto usando el símbolo $, y expresiones complejas usando llaves ${expresión}.',
        analogy: 'Un formato de diploma prediseñado con espacios en blanco: "Certificamos que [nombre] aprobó con nota [nota]". Solo rellenas los huecos sin tener que cortar y pegar tiras de papel con tijeras.',
        code: `fun main() {\n    val usuario = "Diego"\n    val nivel = 4\n    val siguiente = nivel + 1\n    println("Jugador: $usuario")\n    println("Nivel actual: $nivel (Siguiente: \${nivel + 1})")\n}`,
        output: `Jugador: Diego\nNivel actual: 4 (Siguiente: 5)`,
        tip: 'Usa $variable para variables directas y ${objeto.propiedad} o ${a + b} cuando haya operaciones o métodos.',
        pitfall: 'Escribir "$variable.metodo()" sin llaves: Kotlin solo evaluará la variable y dejará ".metodo()" como texto plano.',
        keyPoints: [
          '$nombre incrusta el valor de la variable en el texto.',
          '${expresion} evalúa cualquier cálculo o llamada a función dentro de la cadena.',
          'Reemplaza limpiamente la concatenación tosca con el operador +.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida producida por esta interpolación de String Templates?',
            code: 'val producto = "Teclado"\nval precio = 25\nprintln("El $producto cuesta $precio dólares")',
            options: [
              'El Teclado cuesta 25 dólares',
              'El $producto cuesta $precio dólares',
              'El Teclado cuesta dólares',
              'Error de compilación'
            ],
            correctIndex: 0,
            explanation: '$producto se reemplaza por "Teclado" y $precio por 25 directamente dentro de la cadena.'
          },
          {
            type: 'code_cloze',
            prompt: 'El símbolo que inicia una interpolación de variable en un String Template de Kotlin es ___:',
            blank: 'println("Hola, ___nombre")',
            options: ['$', '#', '&', '@'],
            correctOption: '$',
            explanation: 'El símbolo $ indica a Kotlin que debe evaluar la variable dentro del texto.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la instrucción para imprimir un mensaje interpolado:',
            tokens: ['println', '(', '"Puntaje: $puntos"', ')'],
            solution: ['println', '(', '"Puntaje: $puntos"', ')'],
            explanation: 'Sintaxis limpia de interpolación de variables con comillas dobles.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea donde falta ${} para evaluar la suma dentro del texto:',
            lines: [
              'val a = 5',
              'val b = 3',
              'println("Total: $a + b") // Error: imprime "5 + b" en lugar de 8'
            ],
            bugIndex: 2,
            explanation: 'Para evaluar una expresión matemática se requieren llaves: "${a + b}".'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la sintaxis de plantilla con su resultado:',
            pairs: [
              { left: '"Hola $nombre"', right: 'Inserta el valor directo de la variable nombre' },
              { left: '"Suma: ${x + y}"', right: 'Evalúa la suma y coloca el resultado numérico' },
              { left: '"Precio: $$precio"', right: 'Muestra el símbolo $ seguido del valor de precio' },
              { left: 'nombre + " " + apellido', right: 'Concatenación tradicional con operador +' }
            ],
            explanation: 'Las plantillas de texto son mucho más legibles y eficientes que la concatenación con +.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para evaluar una expresión compleja dentro de una cadena en Kotlin usamos ${ y cerramos con ___:',
            blank: 'println("Doble: ${n * 2___")',
            options: ['}', ')', ']', '$'],
            correctOption: '}',
            explanation: 'Las expresiones dentro de String Templates se encierran entre llaves ${...}.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá: val n = 4; println("Resultado: ${n * 3}"); ?',
            options: ['Resultado: 12', 'Resultado: ${n * 3}', 'Resultado: 4 * 3', 'Error'],
            correctIndex: 0,
            explanation: '${n * 3} calcula 4 * 3 = 12 e inserta el resultado en el texto.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye el template para mostrar el siguiente número con una expresión:',
            tokens: ['println', '(', '"Siguiente: ${num + 1}"', ')'],
            solution: ['println', '(', '"Siguiente: ${num + 1}"', ')'],
            explanation: 'Usa ${num + 1} para realizar la operación dentro de la cadena.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error tipográfico en la sintaxis de template:',
            lines: [
              'val user = "Ana"',
              'println("Bienvenido #{user}") // Error: en Kotlin se usa $, no #',
              'println("Conectado")'
            ],
            bugIndex: 1,
            explanation: 'Kotlin utiliza el prefijo $, no el símbolo # (utilizado en lenguajes como Ruby).'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: val c = \'K\'; println("Letra: $c"); ?',
            options: ['Letra: K', 'Letra: \'K\'', 'Letra: $c', 'Error'],
            correctIndex: 0,
            explanation: 'La variable de tipo Char se interpola sin problemas produciendo "Letra: K".'
          }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  // UNIDAD 3: Operadores y expresiones (7 lecciones)
  // ══════════════════════════════════════════════════════════
  {
    id: 3,
    title: 'Operadores y expresiones',
    description: 'Domina los operadores aritméticos (+, -, *, /, %), división entera frente a decimal, comparaciones relacionales (==, !=, <, >, <=, >=), operadores lógicos (&&, ||, !), precedencia con paréntesis, asignaciones compuestas (+=, -=) y conversiones numéricas explícitas.',
    icon: 'Cpu',
    color: '#8B5CF6',
    stage: 'ETAPA I. COMPRENDER CÓMO FUNCIONA UN PROGRAMA',
    lessons: [
      {
        level: 1,
        title: '1. Operadores aritméticos: +, -, *, / y %',
        desc: 'Los operadores matemáticos fundamentales en programación para realizar sumas, restas, multiplicaciones, divisiones y cálculo del residuo (módulo %).',
        analogy: 'Una calculadora de bolsillo: presionas las teclas +, -, *, / para obtener cálculos numéricos instantáneos.',
        code: `fun main() {\n    val a = 15\n    val b = 4\n    println("Suma: " + (a + b))\n    println("Resta: " + (a - b))\n    println("Multiplicación: " + (a * b))\n    println("Módulo (residuo): " + (a % b))\n}`,
        output: `Suma: 19\nResta: 11\nMultiplicación: 60\nMódulo (residuo): 3`,
        tip: 'El operador módulo % devuelve el resto que sobra tras una división entera; es clave para saber si un número es par (n % 2 == 0).',
        pitfall: 'Intentar dividir entre cero (10 / 0), lo que provocará una ArithmeticException en tiempo de ejecución.',
        keyPoints: [
          '+ (suma), - (resta), * (multiplicación), / (división).',
          '% (módulo o resto): devuelve el sobrante de una división entera.',
          'Las operaciones aritméticas respetan las leyes matemáticas estándar.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es el resultado de la operación módulo 17 % 5 en Kotlin?',
            code: 'val residuo = 17 % 5\nprintln(residuo)',
            options: ['2', '3', '3.4', '1'],
            correctIndex: 0,
            explanation: '17 dividido entre 5 es 3 con un residuo de 2 (5 * 3 + 2 = 17).'
          },
          {
            type: 'code_cloze',
            prompt: 'El operador para obtener el residuo o resto de una división es ___:',
            blank: 'val resto = 10 ___ 3',
            options: ['%', '/', '//', 'mod'],
            correctOption: '%',
            explanation: '% es el operador de módulo en Kotlin y la mayoría de lenguajes.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la expresión para multiplicar base por altura:',
            tokens: ['val', 'area', '=', 'base', '*', 'altura'],
            solution: ['val', 'area', '=', 'base', '*', 'altura'],
            explanation: 'Multiplica ambas dimensiones y almacena en area.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la operación que provocará un error crítico de ejecución (crash):',
            lines: [
              'val x = 10',
              'val y = 0',
              'val z = x / y // Error: división entre cero'
            ],
            bugIndex: 2,
            explanation: 'Dividir un entero entre cero causa una ArithmeticException: / by zero.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el operador aritmético con su función:',
            pairs: [
              { left: '+', right: 'Suma de dos valores' },
              { left: '-', right: 'Resta de dos valores' },
              { left: '*', right: 'Multiplicación de factores' },
              { left: '%', right: 'Residuo de una división entera' }
            ],
            explanation: 'Operadores aritméticos binarios básicos.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para comprobar si un número n es par, verificamos si n % 2 es igual a ___:',
            blank: 'val esPar = (n % 2 == ___)',
            options: ['0', '1', '2', 'null'],
            correctOption: '0',
            explanation: 'Un número es par si al dividirlo entre 2 el residuo es exactamente 0.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: println(10 - 3 * 2); ?',
            options: ['4', '14', '7', 'Error'],
            correctIndex: 0,
            explanation: 'La multiplicación tiene prioridad: 3 * 2 = 6; luego 10 - 6 = 4.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye el cálculo de la mitad de una cantidad:',
            tokens: ['val', 'mitad', '=', 'cantidad', '/', '2'],
            solution: ['val', 'mitad', '=', 'cantidad', '/', '2'],
            explanation: 'Divide la cantidad entre 2.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el operador matemático no soportado en Kotlin para potencias:',
            lines: [
              'val suma = 2 + 2',
              'val potencia = 2 ^ 3 // Error: ^ es XOR a nivel de bits, no exponente',
              'val mult = 2 * 3'
            ],
            bugIndex: 1,
            explanation: 'En Kotlin ^ es una operación binaria XOR; para potencias se usa Math.pow() o multiplicación.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es el resultado de evaluar: println(20 % 4); ?',
            options: ['0', '5', '4', '1'],
            correctIndex: 0,
            explanation: '20 es divisible exactamente entre 4, por lo que el residuo es 0.'
          }
        ]
      },
      {
        level: 2,
        title: '2. División entera frente a división decimal',
        desc: 'En Kotlin, dividir dos números enteros (Int / Int) produce un resultado estrictamente entero, truncando los decimales. Para obtener decimales, al menos uno de los operandos debe ser Double.',
        analogy: 'Repartir 7 monedas entre 2 personas sin poder romper las monedas: cada una recibe 3 monedas enteras y sobra una (división entera). Si fuera dinero en tarjeta digital, cada uno recibiría 3.50 (división decimal).',
        code: `fun main() {\n    val entera = 7 / 2      // Ambos son Int -> da 3\n    val decimal = 7.0 / 2   // Uno es Double -> da 3.5\n    println("Entera: $entera")\n    println("Decimal: $decimal")\n}`,
        output: `Entera: 3\nDecimal: 3.5`,
        tip: 'Si quieres conservar decimales, añade .0 a cualquiera de los números literales: 5 / 2.0 dará 2.5.',
        pitfall: 'Calcular el promedio de notas enteras como (nota1 + nota2) / 2 y perder los decimales por truncamiento.',
        keyPoints: [
          'Int / Int = Int: los decimales se descartan (se truncan hacia cero, no se redondean).',
          'Double / Int o Int / Double = Double: división con precisión decimal completa.',
          'Para forzar división decimal en variables Int, usa variable.toDouble() / 2.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es el resultado exacto de la operación 9 / 2 en Kotlin?',
            code: 'val r = 9 / 2\nprintln(r)',
            options: ['4', '4.5', '5', '4.0'],
            correctIndex: 0,
            explanation: 'Al ser ambos operandos Int, Kotlin trunca los decimales y devuelve el entero 4.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para que la división de 9 entre 2 dé 4.5, debemos escribir al menos un operando con punto ___:',
            blank: 'val r = 9.___ / 2',
            options: ['0', 'f', 'd', 'int'],
            correctOption: '0',
            explanation: 'Escribir 9.0 convierte el literal en Double, habilitando la división decimal.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la división decimal de 5 entre 2 usando un literal Double:',
            tokens: ['val', 'res', '=', '5.0', '/', '2'],
            solution: ['val', 'res', '=', '5.0', '/', '2'],
            explanation: '5.0 / 2 produce 2.5 de tipo Double.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea donde se pierden accidentalmente los decimales en el cálculo del promedio:',
            lines: [
              'val n1 = 4',
              'val n2 = 5',
              'val promedio = (n1 + n2) / 2 // Da 4 en lugar de 4.5'
            ],
            bugIndex: 2,
            explanation: '(4 + 5) / 2 es 9 / 2 = 4 (división entera). Debe ser / 2.0 para dar 4.5.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la expresión con su resultado exacto en Kotlin:',
            pairs: [
              { left: '7 / 2', right: '3 (Int truncado)' },
              { left: '7.0 / 2', right: '3.5 (Double)' },
              { left: '1 / 2', right: '0 (Int truncado)' },
              { left: '1.0 / 2', right: '0.5 (Double)' }
            ],
            explanation: 'Diferencia crítica entre división entera y división en punto flotante.'
          },
          {
            type: 'code_cloze',
            prompt: 'En la división entera, los decimales no se redondean, sino que se ___ hacia cero:',
            blank: 'La parte fraccionaria se ___.',
            options: ['trunca', 'redondea', 'duplica', 'invierte'],
            correctOption: 'trunca',
            explanation: 'Truncar significa descartar directamente los decimales sin importar si es .9.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: println(10 / 4.0); ?',
            options: ['2.5', '2', '2.0', 'Error'],
            correctIndex: 0,
            explanation: 'Como 4.0 es Double, la operación se eleva a Double y da 2.5.'
          },
          {
            type: 'code_builder',
            prompt: 'Convierte la variable entera x a Double antes de dividir entre 2:',
            tokens: ['val', 'res', '=', 'x.toDouble()', '/', '2'],
            solution: ['val', 'res', '=', 'x.toDouble()', '/', '2'],
            explanation: 'x.toDouble() transforma el entero en Double asegurando decimales.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el resultado engañoso por división entera:',
            lines: [
              'val porcentaje = 1 / 4 * 100 // 1/4 da 0, por lo que 0 * 100 da 0%',
              'val correcto = 1.0 / 4 * 100 // 0.25 * 100 = 25%',
              'println(correcto)'
            ],
            bugIndex: 0,
            explanation: '1 / 4 da 0 en división entera, arruinando el cálculo del porcentaje.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué valor da 3 / 2 + 3.0 / 2 en Kotlin?',
            options: ['4.5', '4', '5.0', '3.5'],
            correctIndex: 0,
            explanation: '3 / 2 da 1; 3.0 / 2 da 1.5; luego 1 + 1.5 = 4.5.'
          }
        ]
      },
      {
        level: 3,
        title: '3. Comparaciones: ==, !=, <, >, <=, >=',
        desc: 'Los operadores relacionales comparan dos valores y siempre devuelven un resultado booleano (true o false).',
        analogy: 'Un control de estatura para subir a una montaña rusa: el empleado compara tu estatura con la barra (estatura >= 140). Si cumples, pasas (true); si no, esperas afuera (false).',
        code: `fun main() {\n    val edad = 18\n    val tieneCedula = true\n    println(edad >= 18)   // true\n    println(edad == 20)   // false\n    println(edad != 15)   // true\n}`,
        output: `true\nfalse\ntrue`,
        tip: 'Usa == para comparar igualdad; el signo simple = es solo para asignar variables.',
        pitfall: 'Confundir el operador de asignación (=) con el operador de comparación de igualdad (==).',
        keyPoints: [
          '== comprueba igualdad; != comprueba desigualdad (diferente de).',
          '< (menor), > (mayor), <= (menor o igual), >= (mayor o igual).',
          'Toda comparación relacional devuelve estrictamente true o false.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué devolverá la comparación: println(15 != 20); ?',
            options: ['true', 'false', '15', '20'],
            correctIndex: 0,
            explanation: '15 es diferente de 20, por lo que la condición != es verdadera (true).'
          },
          {
            type: 'code_cloze',
            prompt: 'El operador para comprobar si dos valores son exactamente iguales en Kotlin es ___:',
            blank: 'val esIgual = (a ___ b)',
            options: ['==', '=', '===', 'eq'],
            correctOption: '==',
            explanation: '== compara el contenido o valor de ambos operandos.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la condición para verificar si edad es mayor o igual a 18:',
            tokens: ['val', 'mayorDeEdad', '=', 'edad', '>=', '18'],
            solution: ['val', 'mayorDeEdad', '=', 'edad', '>=', '18'],
            explanation: 'edad >= 18 devuelve true si edad es 18 o mayor.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea donde se confunde asignación con comparación:',
            lines: [
              'val clave = 1234',
              'if (clave = 1234) { // Error: = es asignación, debe ser ==',
              '    println("Acceso correcto")'
            ],
            bugIndex: 1,
            explanation: 'En las condiciones se debe usar == para comparar igualdad, nunca el operador =.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el operador relacional con su significado:',
            pairs: [
              { left: '==', right: 'Igual a' },
              { left: '!=', right: 'Diferente de (no igual)' },
              { left: '<=', right: 'Menor o igual que' },
              { left: '>=', right: 'Mayor o igual que' }
            ],
            explanation: 'Operadores de comparación estándar en Kotlin.'
          },
          {
            type: 'code_cloze',
            prompt: 'El resultado de evaluar cualquier comparación relacional es de tipo ___:',
            blank: 'Toda comparación relacional produce un valor ___.',
            options: ['Boolean', 'Int', 'String', 'Double'],
            correctOption: 'Boolean',
            explanation: 'Las comparaciones siempre producen un booleano (true o false).'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: println(10 <= 10); ?',
            options: ['true', 'false', '10', 'Error'],
            correctIndex: 0,
            explanation: '10 es menor o igual a 10 (se cumple la igualdad), devolviendo true.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la verificación de si stock es menor estricto que 5:',
            tokens: ['val', 'bajoStock', '=', 'stock', '<', '5'],
            solution: ['val', 'bajoStock', '=', 'stock', '<', '5'],
            explanation: 'Compara si stock es menor que 5.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la comparación relacional mal escrita:',
            lines: [
              'val a = 5',
              'val b = 10',
              'println(a => b) // Error: el operador es >=, no =>'
            ],
            bugIndex: 2,
            explanation: 'El operador mayor o igual se escribe >=; => no existe en Kotlin.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprime: val a = "Hola"; val b = "Hola"; println(a == b); ?',
            options: ['true', 'false', 'Hola', 'Error'],
            correctIndex: 0,
            explanation: 'En Kotlin, == compara el contenido estructural de las cadenas String.'
          }
        ]
      },
      {
        level: 4,
        title: '4. Operadores lógicos: &&, || y !',
        desc: 'Permiten combinar múltiples condiciones booleanas: && (Y lógico: todas deben cumplirse), || (O lógico: al menos una debe cumplirse) y ! (NO lógico: invierte el valor).',
        analogy: 'Reglas de acceso a un examen: necesitas Carné Y (&&) Matrícula activa (ambos obligatorios). Para pagar el boleto del bus: Monedas O (||) Tarjeta electrónica (con cualquiera de los dos pasas).',
        code: `fun main() {\n    val tieneEntrada = true\n    val esMayorEdad = false\n    // && requiere ambos verdaderos\n    println(tieneEntrada && esMayorEdad) // false\n    // || requiere al menos uno verdadero\n    println(tieneEntrada || esMayorEdad) // true\n    // ! invierte\n    println(!esMayorEdad)                // true\n}`,
        output: `false\ntrue\ntrue`,
        tip: 'Cortocircuito (short-circuit): en &&, si la primera condición es false, Kotlin no evalúa la segunda; en ||, si la primera es true, tampoco evalúa la segunda.',
        pitfall: 'Olvidar que && tiene mayor precedencia que ||, lo que puede alterar el resultado si no usas paréntesis.',
        keyPoints: [
          '&& (AND): devuelve true solo si AMBAS expresiones son true.',
          '|| (OR): devuelve true si AL MENOS UNA de las expresiones es true.',
          '! (NOT): invierte el valor (de true pasa a false y viceversa).'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es el resultado de evaluar: true && false || true ?',
            options: ['true', 'false', 'Error', 'null'],
            correctIndex: 0,
            explanation: 'true && false da false; luego false || true da true.'
          },
          {
            type: 'code_cloze',
            prompt: 'El operador lógico que exige que ambas condiciones sean verdaderas es ___:',
            blank: 'val acceso = (tieneUsuario ___ tieneClave)',
            options: ['&&', '||', '!', '=='],
            correctOption: '&&',
            explanation: '&& (AND lógico) requiere que ambos lados sean verdaderos.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la condición lógica para verificar si edad está entre 18 y 65:',
            tokens: ['edad', '>=', '18', '&&', 'edad', '<=', '65'],
            solution: ['edad', '>=', '18', '&&', 'edad', '<=', '65'],
            explanation: 'Combina ambas cotas con el operador &&.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error en el operador lógico:',
            lines: [
              'val a = true',
              'val b = false',
              'val c = a AND b // Error: en Kotlin se escribe &&, no la palabra AND'
            ],
            bugIndex: 2,
            explanation: 'El operador lógico Y se escribe && en Kotlin.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la tabla de verdad lógica básica:',
            pairs: [
              { left: 'true && true', right: 'true' },
              { left: 'true && false', right: 'false' },
              { left: 'false || true', right: 'true' },
              { left: '!true', right: 'false' }
            ],
            explanation: 'Tablas de verdad fundamentales para la toma de decisiones lógicas.'
          },
          {
            type: 'code_cloze',
            prompt: 'El operador que invierte el valor de una variable booleana se escribe con el símbolo ___:',
            blank: 'val bloqueado = ___activo',
            options: ['!', '~', '-', 'not'],
            correctOption: '!',
            explanation: '! es el operador de negación lógica unaria.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué valor produce: !(5 > 2) ?',
            options: ['false', 'true', '5', '2'],
            correctIndex: 0,
            explanation: '5 > 2 es true; al negarlo con ! se convierte en false.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la condición: si tiene saldo O tiene crédito:',
            tokens: ['tieneSaldo', '||', 'tieneCredito'],
            solution: ['tieneSaldo', '||', 'tieneCredito'],
            explanation: '|| valida que al menos una de las alternativas sea verdadera.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con la condición lógica imposible de cumplirse:',
            lines: [
              'val x = 10',
              'val imposible = (x > 20 && x < 5) // Error lógico: ningún número puede ser mayor que 20 y menor que 5 a la vez',
              'println(imposible)'
            ],
            bugIndex: 1,
            explanation: 'Es una contradicción lógica; x no puede ser simultáneamente mayor que 20 y menor que 5.'
          },
          {
            type: 'predict_output',
            prompt: 'En la expresión (false && f()), ¿se ejecutará la función f()?',
            options: [
              'No, por cortocircuito: al ser el primer operando false en &&, Kotlin ya sabe que el resultado es false',
              'Sí, Kotlin siempre ejecuta ambos lados obligatoriamente',
              'Solo si f() devuelve un entero',
              'Provoca un error de compilación'
            ],
            correctIndex: 0,
            explanation: 'La evaluación de cortocircuito ahorra procesamiento y evita evaluar condiciones innecesarias.'
          }
        ]
      },
      {
        level: 5,
        title: '5. Prioridad de operaciones y paréntesis',
        desc: 'El orden matemático y lógico en que el compilador evalúa las expresiones: primero paréntesis (), luego *, /, %, luego +, -, luego comparaciones y finalmente && y ||.',
        analogy: 'Las reglas de tránsito en una rotonda: los vehículos que ya están adentro tienen prioridad sobre los que van a ingresar, a menos que un oficial de tránsito (paréntesis) indique lo contrario.',
        code: `fun main() {\n    val sinParentesis = 2 + 3 * 4   // 2 + 12 = 14\n    val conParentesis = (2 + 3) * 4 // 5 * 4 = 20\n    println(sinParentesis)\n    println(conParentesis)\n}`,
        output: `14\n20`,
        tip: 'Ante la menor duda sobre la precedencia, usa paréntesis: hacen tu intención explícita y mejoran la legibilidad para otros humanos.',
        pitfall: 'Asumir que las operaciones se evalúan estrictamente de izquierda a derecha sin importar el operador.',
        keyPoints: [
          'Paréntesis (): máxima prioridad de evaluación.',
          'Multiplicación (*), división (/) y módulo (%) se evalúan antes que suma (+) y resta (-).',
          'Los operadores relacionales (<, >, ==) se evalúan antes que los operadores lógicos (&&, ||).'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es el valor evaluado de la expresión: 10 + 2 * 5 ?',
            options: ['20', '60', '17', '100'],
            correctIndex: 0,
            explanation: 'Multiplicación primero: 2 * 5 = 10; luego suma: 10 + 10 = 20.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para forzar a que una suma se calcule antes que una multiplicación, usamos ___:',
            blank: 'val resultado = ___2 + 3___ * 4',
            options: ['( y )', '[ y ]', '{ y }', '< y >'],
            correctOption: '( y )',
            explanation: 'Los paréntesis redondos () tienen la máxima prioridad de evaluación.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la expresión para sumar a y b antes de multiplicar por c:',
            tokens: ['(', 'a', '+', 'b', ')', '*', 'c'],
            solution: ['(', 'a', '+', 'b', ')', '*', 'c'],
            explanation: 'Los paréntesis garantizan que la suma ocurra en primer lugar.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con paréntesis desbalanceados:',
            lines: [
              'val a = (5 + 3) * 2',
              'val b = ((10 - 2) * 3 // Error: falta cerrar un paréntesis )',
              'val c = (4 + 4)'
            ],
            bugIndex: 1,
            explanation: 'Todo paréntesis abierto debe tener su correspondiente cierre; de lo contrario hay error de sintaxis.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el operador con su nivel de precedencia (del más alto al más bajo):',
            pairs: [
              { left: 'Paréntesis ()', right: 'Nivel 1 (Máxima prioridad)' },
              { left: 'Multiplicación y División (*, /)', right: 'Nivel 2 (Antes de sumas y restas)' },
              { left: 'Comparaciones (==, <, >)', right: 'Nivel 3 (Tras cálculos aritméticos)' },
              { left: 'Lógicos (&&, ||)', right: 'Nivel 4 (Últimos en evaluarse)' }
            ],
            explanation: 'Jerarquía oficial de operadores en programación.'
          },
          {
            type: 'code_cloze',
            prompt: 'Entre los operadores lógicos, ___ tiene mayor prioridad que ||:',
            blank: 'En a || b && c, primero se evalúa b ___ c.',
            options: ['&&', '||', '==', '!'],
            correctOption: '&&',
            explanation: '&& (conjunción) tiene mayor precedencia que || (disyunción).'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es el valor de: (10 + 20) / (2 * 3) ?',
            options: ['5', '30', '15', '0'],
            correctIndex: 0,
            explanation: '(10 + 20) = 30; (2 * 3) = 6; luego 30 / 6 = 5.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la fórmula del área del triángulo con paréntesis:',
            tokens: ['val', 'area', '=', '(', 'b', '*', 'h', ')', '/', '2'],
            solution: ['val', 'area', '=', '(', 'b', '*', 'h', ')', '/', '2'],
            explanation: 'Asegura la multiplicación previa antes de dividir entre 2.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error en la fórmula del promedio:',
            lines: [
              'val n1 = 8',
              'val n2 = 10',
              'val prom = n1 + n2 / 2 // Error: divide solo n2 entre 2 dando 8 + 5 = 13'
            ],
            bugIndex: 2,
            explanation: 'Faltan paréntesis: debe ser (n1 + n2) / 2 para sumar antes de dividir.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué valor devuelve: 20 - 4 - 2 ?',
            options: ['14', '18', '22', '12'],
            correctIndex: 0,
            explanation: 'Operadores con misma precedencia (+ y -) se asocian de izquierda a derecha: (20 - 4) = 16; 16 - 2 = 14.'
          }
        ]
      },
      {
        level: 6,
        title: '6. Asignaciones abreviadas: +=, -=, *=, /=',
        desc: 'Los operadores compuestos combinan una operación aritmética con la asignación en una sintaxis compacta y limpia (ej. x += 5 equivale a x = x + 5).',
        analogy: 'Un botón de volumen en el control remoto: presionar Vol+ agrega una unidad al volumen actual sin tener que escribir todo el circuito de audio.',
        code: `fun main() {\n    var score = 100\n    score += 50  // Equivale a: score = score + 50\n    score -= 20  // Equivale a: score = score - 20\n    score *= 2   // Equivale a: score = score * 2\n    println(score)\n}`,
        output: `260`,
        tip: 'Usa operadores abreviados para contadores (c += 1) y acumuladores (suma += valor); reducen redundancia y errores de tipeo.',
        pitfall: 'Intentar usar += en una variable val inmutable, lo que causará error de compilación.',
        keyPoints: [
          'x += y es idéntico a x = x + y.',
          'x -= y es idéntico a x = x - y.',
          'x *= y y x /= y multiplican o dividen actualizando la variable.',
          'Solo son válidos sobre variables declaradas con var.'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Cuál es el valor final de puntos tras ejecutar: var puntos = 10; puntos += 15; ?',
            options: ['25', '10', '15', 'Error'],
            correctIndex: 0,
            explanation: 'puntos += 15 suma 15 al valor previo (10) resultando en 25.'
          },
          {
            type: 'code_cloze',
            prompt: 'La forma abreviada de escribir contador = contador + 1 es ___:',
            blank: 'contador ___ 1',
            options: ['+=', '++', '==', '=+'],
            correctOption: '+=',
            explanation: '+= suma el valor de la derecha y lo reasigna a la variable.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la asignación abreviada para duplicar el valor de vidas (*= 2):',
            tokens: ['vidas', '*=', '2'],
            solution: ['vidas', '*=', '2'],
            explanation: 'vidas *= 2 equivale a vidas = vidas * 2.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error al intentar usar una asignación compuesta:',
            lines: [
              'val oro = 100',
              'oro += 50 // Error: oro es val y no se puede reasignar',
              'println(oro)'
            ],
            bugIndex: 1,
            explanation: '+= realiza una reasignación; por ende, requiere que la variable sea mutable (var).'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja la asignación abreviada con su forma expandida equivalente:',
            pairs: [
              { left: 'a += b', right: 'a = a + b' },
              { left: 'a -= b', right: 'a = a - b' },
              { left: 'a *= b', right: 'a = a * b' },
              { left: 'a /= b', right: 'a = a / b' }
            ],
            explanation: 'Equivalencias directas de los operadores compuestos de asignación.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para restar 10 a la variable saldo de forma compacta usamos el operador ___:',
            blank: 'saldo ___ 10',
            options: ['-=', '=-', '--', '-'],
            correctOption: '-=',
            explanation: '-= resta el operando derecho del valor actual.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprimirá: var n = 8; n /= 2; println(n); ?',
            options: ['4', '8', '2', '0'],
            correctIndex: 0,
            explanation: '8 / 2 = 4; el valor se actualiza en n.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la instrucción para acumular venta en el total:',
            tokens: ['total', '+=', 'venta'],
            solution: ['total', '+=', 'venta'],
            explanation: 'Patrón estándar de acumulación: total += venta.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica el error tipográfico en el orden del operador compuesto:',
            lines: [
              'var x = 10',
              'x =+ 5 // Cuidado: esto asigna positivo 5 (+5), no suma 5 a x',
              'println(x)'
            ],
            bugIndex: 1,
            explanation: 'El operador correcto es +=; escribir =+ asigna el número positivo 5 sobrescribiendo x.'
          },
          {
            type: 'predict_output',
            prompt: 'Si tenemos: var x = 5; x += 3; x *= 2; ¿cuánto vale x?',
            options: ['16', '11', '13', '10'],
            correctIndex: 0,
            explanation: '5 += 3 da 8; luego 8 *= 2 da 16.'
          }
        ]
      },
      {
        level: 7,
        title: '7. Conversiones numéricas básicas',
        desc: 'En Kotlin no existen conversiones implícitas automáticas entre tipos numéricos. Debes usar métodos explícitos como toInt(), toDouble(), toLong() o toString() para convertir datos con seguridad.',
        analogy: 'Un convertidor de enchufes para viajes internacionales: una clavija europea no entra mágicamente en un tomacorriente americano sin un adaptador físico explícito.',
        code: `fun main() {\n    val entero: Int = 42\n    val decimal: Double = entero.toDouble() // Conversión explícita\n    val texto: String = entero.toString()\n    println("Double: $decimal")\n    println("String: $texto")\n}`,
        output: `Double: 42.0\nString: 42`,
        tip: 'Kotlin exige conversiones explícitas para evitar la pérdida silenciosa de precisión que ocurría en lenguajes antiguos.',
        pitfall: 'Intentar asignar directamente un Int a un Double: "val d: Double = 5" generará un error de tipo en compilación.',
        keyPoints: [
          'Sin conversiones implícitas: cada conversión de tipo debe ser expresa y consciente.',
          '.toInt(), .toDouble(), .toFloat(), .toLong(), .toString().',
          'Convertir de Double a Int trunca la parte decimal (3.99.toInt() da 3).'
        ],
        challenges: [
          {
            type: 'predict_output',
            prompt: '¿Qué valor resulta de convertir el Double 9.99 a Int con toInt()?',
            code: 'val d = 9.99\nval i = d.toInt()\nprintln(i)',
            options: ['9', '10', '9.99', 'Error'],
            correctIndex: 0,
            explanation: 'toInt() trunca la parte decimal por completo; no redondea hacia arriba.'
          },
          {
            type: 'code_cloze',
            prompt: 'El método para convertir un número entero en un número con punto decimal es ___():',
            blank: 'val d = entero.___()',
            options: ['toDouble', 'toDoubleValue', 'castDouble', 'asDouble'],
            correctOption: 'toDouble',
            explanation: '.toDouble() convierte el número a su representación de 64 bits en coma flotante.'
          },
          {
            type: 'code_builder',
            prompt: 'Construye la conversión explícita de la variable edad a texto:',
            tokens: ['val', 'texto', '=', 'edad.toString()'],
            solution: ['val', 'texto', '=', 'edad.toString()'],
            explanation: 'edad.toString() convierte el número a una cadena String.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea con error por intentar conversión implícita prohibida en Kotlin:',
            lines: [
              'val a: Int = 10',
              'val b: Double = a // Error: Kotlin no convierte Int a Double implícitamente',
              'val c: Double = a.toDouble()'
            ],
            bugIndex: 1,
            explanation: 'En Kotlin, asignar un Int directamente a una variable Double sin .toDouble() es ilegal.'
          },
          {
            type: 'matching_pairs',
            prompt: 'Empareja el método de conversión con su tipo de destino:',
            pairs: [
              { left: '42.toDouble()', right: '42.0 (Double)' },
              { left: '7.85.toInt()', right: '7 (Int truncado)' },
              { left: '100.toString()', right: '"100" (String)' },
              { left: "'A'.code", right: '65 (Código ASCII/Unicode Int)' }
            ],
            explanation: 'Métodos explícitos de conversión numérica en la biblioteca estándar de Kotlin.'
          },
          {
            type: 'code_cloze',
            prompt: 'Para convertir una cadena "123" a entero usamos el método ___():',
            blank: 'val num = "123".___()',
            options: ['toInt', 'parseInt', 'toNumber', 'makeInt'],
            correctOption: 'toInt',
            explanation: '.toInt() analiza el texto y lo convierte en su valor numérico Int.'
          },
          {
            type: 'predict_output',
            prompt: '¿Cuál es la salida de: println(5.toDouble()); ?',
            options: ['5.0', '5', 'Double', 'Error'],
            correctIndex: 0,
            explanation: '5.toDouble() produce el literal decimal 5.0.'
          },
          {
            type: 'code_builder',
            prompt: 'Convierte el decimal precio a entero para truncar centavos:',
            tokens: ['val', 'precioEntero', '=', 'precio.toInt()'],
            solution: ['val', 'precioEntero', '=', 'precio.toInt()'],
            explanation: 'precio.toInt() descarta los centavos decimales.'
          },
          {
            type: 'spot_the_bug',
            prompt: 'Identifica la línea que provocará un error NumberFormatException al convertir:',
            lines: [
              'val a = "50".toInt()',
              'val b = "cien".toInt() // Error: "cien" no es un número válido en dígitos',
              'val c = "25".toInt()'
            ],
            bugIndex: 1,
            explanation: '"cien" no contiene dígitos numéricos; toInt() fallará con NumberFormatException.'
          },
          {
            type: 'predict_output',
            prompt: '¿Qué imprime: val s = 10.toString() + 20.toString(); println(s); ?',
            options: ['1020', '30', '10 20', 'Error'],
            correctIndex: 0,
            explanation: 'Ambos son ahora Strings; el operador + concatena los textos formando "1020".'
          }
        ]
      }
    ]
  }
];
