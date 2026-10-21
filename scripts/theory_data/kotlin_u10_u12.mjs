// Módulo de teoría enriquecida para Kotlin: Unidades 10, 11 y 12
// Redactado en español latinoamericano (es-419) con tono claro, amigable y pedagógico
// Siguiendo los estándares oficiales de Android Developers (https://developer.android.com/kotlin/learn)

export const KOTLIN_THEORY_U10_U12 = {
  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 10: CLASES Y OBJETOS (POO)
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u10-l01': {
    subtitle: 'Comprende el paradigma de la Programación Orientada a Objetos: de planos arquitectónicos a objetos reales.',
    analogy: 'El plano arquitectónico de una casa frente a la casa real construida en tu vecindario. Con un solo plano (la Clase), los albañiles pueden construir diez casas reales (los Objetos), cada una con sus propios habitantes y colores de pared.',
    sections: [
      {
        title: 'Diferencia entre Clase y Objeto',
        explanation: `Hasta ahora trabajábamos con tipos simples como \`Int\`, \`String\` o \`Double\`. Pero en el mundo real, los elementos son más complejos: un "Usuario" no es solo un nombre, tiene correo, edad, contraseña y rol.

La **Programación Orientada a Objetos (POO)** te permite crear tus propios tipos de datos personalizados:
• **Clase (\`class\`):** Es el **plano, molde o plantilla**. Define qué datos tendrá y qué acciones sabrá hacer ese tipo de elemento. No ocupa memoria real hasta que creas una instancia.
• **Objeto (Instancia):** Es el **elemento real creado en la memoria** a partir del plano de la clase. Puedes crear cientos de objetos diferentes a partir de una misma clase.`,
        codeSnippet: `// 1. Definimos el molde (Clase)\nclass Auto {\n    var color = "Blanco"\n    var velocidad = 0\n}\n\nfun main() {\n    // 2. Creamos dos objetos reales e independientes a partir del molde\n    val auto1 = Auto()\n    val auto2 = Auto()\n\n    auto1.color = "Rojo"\n    auto2.color = "Azul"\n\n    println("Auto 1: \${auto1.color}")\n    println("Auto 2: \${auto2.color}")\n}`,
        outputSnippet: `Auto 1: Rojo\nAuto 2: Azul`,
        byteTip: 'En Kotlin, por convención oficial, los nombres de Clases siempre empiezan con Mayúscula (UpperCamelCase), como Usuario, Producto, Pedido.',
        pitfallTip: 'No confundas la clase con el objeto: la clase es la definición abstracta; el objeto es la entidad viva en la memoria.',
        keyPoints: [
          'La clase es el molde conceptual; el objeto es la instancia viva en memoria.',
          'Cada objeto conserva su propio estado independiente.',
          'La POO permite modelar el software a imagen y semejanza del mundo real.'
        ]
      },
      {
        title: 'Modelado en aplicaciones móviles Android',
        explanation: `En Android, todo se modela con clases: cada pantalla (\`MainActivity\`), cada botón (\`Button\`), cada canción (\`Track\`) y cada usuario (\`User\`) son clases instanciadas en objetos interactivos:`,
        codeSnippet: `class PerfilUsuario {\n    var nombre = ""\n    var seguidores = 0\n}\n\nfun main() {\n    val usuario = PerfilUsuario()\n    usuario.nombre = "Elena"\n    usuario.seguidores = 150\n    \n    println("Perfil creado: \${usuario.nombre} con \${usuario.seguidores} seguidores.")\n}`,
        outputSnippet: `Perfil creado: Elena con 150 seguidores.`,
        byteTip: 'En Kotlin no necesitas la palabra clave "new" para crear un objeto. Solo escribes el nombre de la clase con paréntesis: PerfilUsuario().',
        pitfallTip: 'Crear clases sin constructor inicializador suele requerir asignar valores temporales vacíos. En la lección 3 aprenderás la mejor forma.',
        keyPoints: [
          'En Kotlin se prescinde de la palabra clave new.',
          'Los objetos representan entidades lógicas del negocio.',
          'La POO estructura aplicaciones de gran escala de manera ordenada.'
        ]
      }
    ]
  },

  'kotlin-u10-l02': {
    subtitle: 'Aprende cómo las propiedades guardan las características y el estado interno de cada objeto.',
    analogy: 'La ficha técnica de un smartphone: enumera sus propiedades como marca (Samsung), memoria (128 GB), pantalla (6.5 pulgadas) y porcentaje de batería actual (estado mutable).',
    sections: [
      {
        title: 'Propiedades y estado de un objeto',
        explanation: `Las variables declaradas dentro de una clase se denominan **propiedades** (o atributos). Representan las características y el **estado** del objeto:

• **Propiedades inmutables (\`val\`):** Características fijas que no cambian tras la creación (ejemplo: el ID único de un producto o la fecha de registro).
• **Propiedades mutables (\`var\`):** Estados que evolucionan a lo largo de la vida de la app (ejemplo: el saldo de una cuenta o la posición del jugador).

Para leer o modificar una propiedad usamos la **notación de punto (\`.\`)**: \`objeto.propiedad\`.`,
        codeSnippet: `class Telefono {\n    val marca: String = "Google Pixel"\n    val modelo: String = "8 Pro"\n    var bateria: Int = 100 // Estado mutable\n}\n\nfun main() {\n    val miTelefono = Telefono()\n    println("Dispositivo: \${miTelefono.marca} \${miTelefono.modelo}")\n    println("Batería inicial: \${miTelefono.bateria}%")\n\n    // Usamos el teléfono y el estado cambia\n    miTelefono.bateria -= 25\n    println("Batería tras uso: \${miTelefono.bateria}%")\n}`,
        outputSnippet: `Dispositivo: Google Pixel 8 Pro\nBatería inicial: 100%\nBatería tras uso: 75%`,
        byteTip: 'Kotlin genera automáticamente los métodos getter y setter de tus propiedades tras bambalinas, ahorrándote decenas de líneas de código aburrido.',
        pitfallTip: 'Si declaras una propiedad con val, Kotlin impedirá que la reasignes con miTelefono.marca = "Otra", garantizando la inmutabilidad.',
        keyPoints: [
          'Las propiedades definen los atributos y el estado de un objeto.',
          'val protege propiedades fijas; var permite cambios de estado controlados.',
          'La notación de punto objeto.propiedad permite acceder a sus valores.'
        ]
      },
      {
        title: 'Inmutabilidad de propiedades recomendada',
        explanation: `Al igual que con variables locales, la guía oficial de Android recomienda que la gran mayoría de propiedades de tus clases sean \`val\`. Esto hace que los datos viajen de forma segura entre pantallas:`,
        codeSnippet: `class TarjetaBancaria {\n    val ultimosCuatroDigitos: String = "4589"\n    val titular: String = "Carlos Mendoza"\n    val mesExpiracion: Int = 11\n    val anioExpiracion: Int = 2028\n}\n\nfun main() {\n    val tarjeta = TarjetaBancaria()\n    println("Tarjeta de \${tarjeta.titular}: **** \${tarjeta.ultimosCuatroDigitos} (Expira: \${tarjeta.mesExpiracion}/\${tarjeta.anioExpiracion})")\n}`,
        outputSnippet: `Tarjeta de Carlos Mendoza: **** 4589 (Expira: 11/2028)`,
        byteTip: 'Una clase compuesta solo de propiedades val es inmutable y extremadamente segura contra bugs concurrentes.',
        pitfallTip: 'No uses var para datos que nunca deberían cambiar una vez emitidos.',
        keyPoints: [
          'Las clases inmutables son el estándar preferido en Android moderno.',
          'Eliminan el riesgo de que otra parte del código altere datos de lectura.',
          'Facilitan enormemente la depuración y auditoría de la app.'
        ]
      }
    ]
  },

  'kotlin-u10-l03': {
    subtitle: 'Inicializa objetos al momento de su nacimiento usando el elegante constructor primario de Kotlin.',
    analogy: 'El acta de nacimiento de una persona: en el momento exacto en que nace, se le asigna su nombre, fecha y lugar de origen. No nace como una persona "en blanco" para rellenarle los datos horas después.',
    sections: [
      {
        title: 'Constructores primarios en Kotlin',
        explanation: `En lenguajes antiguos como Java, para inicializar un objeto tenías que escribir un método constructor largo y repetir los nombres de los campos tres o cuatro veces.

Kotlin simplifica esto de forma magistral con el **constructor primario**:
Declaras las propiedades directamente dentro de los paréntesis al lado del nombre de la clase:
\`class Usuario(val nombre: String, val email: String, var edad: Int)\`

Con esa sola línea, Kotlin:
1. Crea las propiedades \`nombre\`, \`email\` y \`edad\`.
2. Obliga a que al crear el objeto se envíen esos datos obligatorios.
3. Asigna los valores automáticamente a cada propiedad.`,
        codeSnippet: `// Clase compacta con constructor primario de una sola línea\nclass Estudiante(val nombre: String, val carrera: String, var promedio: Double)\n\nfun main() {\n    // Creamos objetos enviando sus valores iniciales directamente\n    val est1 = Estudiante("Valeria", "Ingeniería de Software", 9.4)\n    val est2 = Estudiante("Mateo", "Sistemas", 8.9)\n\n    println("Estudiante 1: \${est1.nombre} | Carrera: \${est1.carrera} | Promedio: \${est1.promedio}")\n    println("Estudiante 2: \${est2.nombre} | Carrera: \${est2.carrera} | Promedio: \${est2.promedio}")\n}`,
        outputSnippet: `Estudiante 1: Valeria | Carrera: Ingeniería de Software | Promedio: 9.4\nEstudiante 2: Mateo | Carrera: Sistemas | Promedio: 8.9`,
        byteTip: 'No olvides colocar val o var antes del nombre de cada parámetro en el constructor primario para que se convierta en una propiedad accesible de la clase.',
        pitfallTip: 'Si omites val o var en el constructor: class Persona(nombre: String), nombre será solo un parámetro temporal de inicialización y no podrás consultarlo con persona.nombre.',
        keyPoints: [
          'El constructor primario se declara junto al nombre de la clase class Nombre(...)',
          'Anteponer val o var convierte los parámetros en propiedades accesibles.',
          'Garantiza que ningún objeto nazca con datos incompletos o inválidos.'
        ]
      },
      {
        title: 'Parámetros por defecto en constructores',
        explanation: `Al igual que en las funciones, los constructores primarios admiten valores predeterminados:`,
        codeSnippet: `class Producto(\n    val nombre: String,\n    val precio: Double,\n    val enStock: Boolean = true // Valor predeterminado\n)\n\nfun main() {\n    val p1 = Producto("Teclado Mecánico", 89.99)\n    val p2 = Producto("Monitor Agotado", 299.0, enStock = false)\n\n    println("Producto 1: \${p1.nombre} (¿En stock?: \${p1.enStock})")\n    println("Producto 2: \${p2.nombre} (¿En stock?: \${p2.enStock})")\n}`,
        outputSnippet: `Producto 1: Teclado Mecánico (¿En stock?: true)\nProducto 2: Monitor Agotado (¿En stock?: false)`,
        byteTip: 'Los constructores con valores por defecto eliminan la necesidad de escribir constructores secundarios sobrecargados.',
        pitfallTip: 'Coloca siempre los parámetros con valores por defecto al final de la lista del constructor.',
        keyPoints: [
          'Los valores por defecto hacen opcionales ciertos atributos al instanciar.',
          'Permiten que una sola clase cubra casos de uso simples y avanzados.',
          'Es la técnica oficial usada para configurar modelos de datos en Android.'
        ]
      }
    ]
  },

  'kotlin-u10-l04': {
    subtitle: 'Agrega comportamiento a tus clases mediante funciones internas llamadas métodos.',
    analogy: 'Un perro no solo tiene propiedades físicas (raza, color, peso), también tiene comportamientos: ladra, corre y come. Los métodos son las acciones que un objeto sabe realizar.',
    sections: [
      {
        title: 'Métodos: el comportamiento de un objeto',
        explanation: `Las funciones declaradas dentro de una clase se denominan **métodos**. Definen las acciones que los objetos de esa clase son capaces de realizar.

La magia de los métodos es que tienen acceso directo a todas las propiedades internas del objeto sin necesidad de pasárselas como parámetros.

Para invocar un método, usamos la notación de punto: \`objeto.metodo()\`.`,
        codeSnippet: `class CuentaBancaria(val titular: String, var saldo: Double) {\n    \n    // Método que deposita dinero\n    fun depositar(monto: Double) {\n        saldo += monto\n        println("+$monto depositado con éxito en cuenta de $titular.")\n    }\n\n    // Método que consulta el estado\n    fun mostrarEstado() {\n        println("Cuenta de $titular | Saldo actual: $$saldo")\n    }\n}\n\nfun main() {\n    val cuenta = CuentaBancaria("Camila Gómez", 500.0)\n    cuenta.mostrarEstado()\n\n    cuenta.depositar(250.0)\n    cuenta.mostrarEstado()\n}`,
        outputSnippet: `Cuenta de Camila Gómez | Saldo actual: $500.0\n+250.0 depositado con éxito en cuenta de Camila Gómez.\nCuenta de Camila Gómez | Saldo actual: $750.0`,
        byteTip: 'Los métodos modifican el estado interno de forma segura aplicando las reglas del negocio antes de cambiar las variables.',
        pitfallTip: 'No uses variables globales dentro de los métodos; opera siempre con las propiedades propias de la clase.',
        keyPoints: [
          'Un método es una función que pertenece a una clase.',
          'Tiene acceso automático a las propiedades de la instancia.',
          'Encapsula la lógica de negocio y las operaciones sobre los datos.'
        ]
      },
      {
        title: 'Validación de reglas de negocio en métodos',
        explanation: `Mira cómo un método de retiro protege la cuenta para evitar que el saldo quede en números negativos:`,
        codeSnippet: `class Billetera(var fondos: Double) {\n    fun retirar(monto: Double): Boolean {\n        return if (monto <= fondos) {\n            fondos -= monto\n            println("Retiro de $$monto aprobado. Fondos restantes: $$fondos")\n            true\n        } else {\n            println("Operación denegada: Fondos insuficientes para retirar $$monto")\n            false\n        }\n    }\n}\n\nfun main() {\n    val billetera = Billetera(100.0)\n    billetera.retirar(40.0)  // Exitoso\n    billetera.retirar(80.0)  // Denegado\n}`,
        outputSnippet: `Retiro de $40.0 aprobado. Fondos restantes: $60.0\nOperación denegada: Fondos insuficientes para retirar $80.0`,
        byteTip: 'Hacer que un método devuelva Boolean permite al código exterior saber si la operación tuvo éxito.',
        pitfallTip: 'Evita modificar propiedades directamente desde afuera de la clase si existe un método que valida la operación.',
        keyPoints: [
          'Los métodos protegen la integridad de los datos internos.',
          'Centralizan las reglas de validación en un solo lugar.',
          'Mejoran la seguridad y previsibilidad del software.'
        ]
      }
    ]
  },

  'kotlin-u10-l05': {
    subtitle: 'Crea múltiples instancias independientes a partir de una misma clase y gestiona su ciclo de vida.',
    analogy: 'Una fábrica de galletas: el mismo molde de estrella produce cientos de galletas idénticas de masa; pero una galleta se decora con glaseado azul y otra con chispas de chocolate. Cada galleta es una instancia independiente.',
    sections: [
      {
        title: 'Creación y uso de varias instancias',
        explanation: `Una de las mayores virtudes de la POO es que escribes el plano de la clase una sola vez, y luego puedes instanciar tantos objetos como requiera tu aplicación:
• Cada objeto tiene su propia copia de las propiedades en la memoria RAM.
• Si modificas las propiedades del objeto A, las del objeto B no se ven afectadas en lo más mínimo.
• Ambos comparten los mismos métodos y comportamientos.`,
        codeSnippet: `class Jugador(val apodo: String, var nivel: Int = 1) {\n    fun subirNivel() {\n        nivel++\n        println("¡$apodo ha subido al nivel $nivel!")\n    }\n}\n\nfun main() {\n    val jugador1 = Jugador("ShadowNinja")\n    val jugador2 = Jugador("Valkyrie", nivel = 5)\n\n    println("Estado inicial: \${jugador1.apodo} (Nivel \${jugador1.nivel}) frente a \${jugador2.apodo} (Nivel \${jugador2.nivel})")\n\n    // Subimos de nivel solo al jugador 1\n    jugador1.subirNivel()\n\n    println("Nivel final de \${jugador1.apodo}: \${jugador1.nivel}")\n    println("Nivel final de \${jugador2.apodo}: \${jugador2.nivel} (intacto)")\n}`,
        outputSnippet: `Estado inicial: ShadowNinja (Nivel 1) frente a Valkyrie (Nivel 5)\n¡ShadowNinja ha subido al nivel 2!\nNivel final de ShadowNinja: 2\nNivel final de Valkyrie: 5 (intacto)`,
        byteTip: 'Cada objeto tiene su propia identidad en memoria. Puedes comparar si dos referencias apuntan al mismo objeto físico con === (triple igual).',
        pitfallTip: 'No confundas dos objetos con los mismos datos con ser el mismo objeto en memoria.',
        keyPoints: [
          'Una clase puede dar vida a infinitas instancias independientes.',
          'Cada instancia preserva su propio estado en la memoria.',
          'Modificar un objeto jamás altera el estado de los demás.'
        ]
      },
      {
        title: 'Interacción entre múltiples objetos',
        explanation: `Los objetos pueden colaborar entre sí para resolver tareas complejas:`,
        codeSnippet: `class Mensaje(val remitente: String, val contenido: String)\n\nclass ChatRoom(val nombreSala: String) {\n    fun publicar(mensaje: Mensaje) {\n        println("[$nombreSala] \${mensaje.remitente}: \${mensaje.contenido}")\n    }\n}\n\nfun main() {\n    val sala = ChatRoom("Android Developers")\n    val msg1 = Mensaje("Sofía", "¡Hola a todos!")\n    val msg2 = Mensaje("Diego", "¡Hola Sofía! ¿Cómo va Kotlin?")\n\n    sala.publicar(msg1)\n    sala.publicar(msg2)\n}`,
        outputSnippet: `[Android Developers] Sofía: ¡Hola a todos!\n[Android Developers] Diego: ¡Hola Sofía! ¿Cómo va Kotlin?`,
        byteTip: 'Pasar objetos como parámetros de métodos es la base de la colaboración orientada a objetos.',
        pitfallTip: 'Evita dependencias circulares donde el objeto A no puede vivir sin B y B no puede vivir sin A.',
        keyPoints: [
          'Los objetos colaboran pasándose referencias como parámetros.',
          'Este desacoplamiento modular es la clave de la escalabilidad.',
          'Permite construir sistemas complejos mediante piezas simples y bien ensambladas.'
        ]
      }
    ]
  },

  'kotlin-u10-l06': {
    subtitle: 'Protege tus datos internos y oculta detalles delicados usando el modificador de visibilidad private.',
    analogy: 'El motor de un automóvil: está cubierto por el capó cerrado (private). Tú como conductor interactúas con el pedal del acelerador y el volante (public), sin necesidad de tocar los pistones ni el cableado interno directamente con las manos.',
    sections: [
      {
        title: 'Encapsulación con private',
        explanation: `La **encapsulación** es uno de los cuatro pilares fundamentales de la POO. Consiste en ocultar los detalles internos y delicados de un objeto para que nadie desde afuera pueda corromperlos por accidente.

Kotlin ofrece modificadores de visibilidad:
• **\`public\` (Predeterminado):** La propiedad o método puede ser leída y llamada desde cualquier parte del programa.
• **\`private\` (Privado):** La propiedad o método **solo puede verse y usarse dentro de la propia clase**. Nadie desde afuera puede tocarla directamente.`,
        codeSnippet: `class CajeroAutomatico(private var dineroDisponible: Double) {\n    \n    // Método público que controla el acceso de forma segura\n    fun retirarDinero(monto: Double): Boolean {\n        return if (monto <= dineroDisponible) {\n            dineroDisponible -= monto\n            println("Dispensando $$monto en billetes...")\n            true\n        } else {\n            println("Error: El cajero no dispone de efectivo suficiente.")\n            false\n        }\n    }\n\n    // Método público de consulta\n    fun consultarEstado() {\n        println("Cajero operativo.")\n    }\n}\n\nfun main() {\n    val cajero = CajeroAutomatico(1000.0)\n    cajero.retirarDinero(300.0)\n    \n    // cajero.dineroDisponible = 0.0 -> ¡ERROR de compilación! Es private y está protegido\n}`,
        outputSnippet: `Dispensando $300.0 en billetes...`,
        byteTip: 'Declara todo como private por defecto, y abre a public solo lo que el exterior realmente necesite invocar.',
        pitfallTip: 'Dejar propiedades mutables como public permite que cualquier parte del código las altere sin pasar por tus validaciones.',
        keyPoints: [
          'private restringe el acceso exclusivamente al interior de la clase.',
          'Protege la integridad de los datos contra modificaciones arbitrarias.',
          'Expone una interfaz pública limpia y segura para el exterior.'
        ]
      },
      {
        title: 'Métodos privados auxiliares',
        explanation: `También puedes crear métodos \`private\` para realizar cálculos internos intermedios sin exponerlos al exterior:`,
        codeSnippet: `class ValidadorSeguridad {\n    fun autorizarAcceso(token: String): Boolean {\n        return validarFormato(token) && verificarFirma(token)\n    }\n\n    private fun validarFormato(t: String) = t.startsWith("SEC_")\n    private fun verificarFirma(t: String) = t.length >= 10\n}\n\nfun main() {\n    val validador = ValidadorSeguridad()\n    val autorizado = validador.autorizarAcceso("SEC_TOKEN99")\n    println("¿Token autorizado?: $autorizado")\n}`,
        outputSnippet: `¿Token autorizado?: true`,
        byteTip: 'Los métodos privados ayudan a descomponer funciones grandes en pasos pequeños sin contaminar el autocompletado del IDE.',
        pitfallTip: 'No expongas métodos internos que solo tienen sentido dentro de la secuencia de la clase.',
        keyPoints: [
          'Los métodos privados dividen tareas complejas internamente.',
          'Mantienen la API pública del objeto limpia y enfocada.',
          'Aseguran que las reglas críticas no sean esquivadas desde afuera.'
        ]
      }
    ]
  },

  'kotlin-u10-l07': {
    subtitle: 'Descubre las data class, la joya de la corona de Kotlin para modelar datos inmutables con .copy(), equals y toString automáticos.',
    analogy: 'Un documento de identidad oficial laminado: su único propósito es contener datos de forma confiable, es fácil de imprimir completo (toString), fácil de comparar con otro (equals) y si necesitas una versión actualizada, le sacas una copia cambiando solo lo que cambió (.copy()).',
    sections: [
      {
        title: 'El superpoder de las data class',
        explanation: `En cualquier aplicación pasas la mayor parte del tiempo transportando datos: respuestas de internet, registros de base de datos, perfiles de usuario.

En Java, una clase para guardar datos requería más de 50 líneas de código tedioso (getters, setters, equals, hashCode, toString y constructores).
En Kotlin, simplemente antepones la palabra clave **\`data\`**:
\`data class Usuario(val id: Int, val nombre: String, val email: String)\`

Con solo esa palabra, Kotlin genera automáticamente:
• **\`toString()\` legible:** \`Usuario(id=1, nombre=Ana, email=...)\` en vez de direcciones raras de memoria.
• **\`equals()\` y \`==\` automático:** Compara por el contenido real de los datos.
• **Función \`.copy()\`:** Para crear copias modificando solo las propiedades que elijas.`,
        codeSnippet: `// Una data class profesional en una sola línea\ndata class Producto(val id: Int, val nombre: String, val precio: Double)\n\nfun main() {\n    val prod1 = Producto(101, "Mouse Gamer", 39.99)\n    val prod2 = Producto(101, "Mouse Gamer", 39.99)\n\n    // 1. toString automático hermoso\n    println("Impresión directa: $prod1")\n\n    // 2. equals automático por contenido\n    println("¿prod1 es idéntico en contenido a prod2?: \${prod1 == prod2}")\n\n    // 3. El método .copy() para crear una variante inmutable\n    val prodConDescuento = prod1.copy(precio = 29.99)\n    println("Producto con descuento vía .copy(): $prodConDescuento")\n}`,
        outputSnippet: `Impresión directa: Producto(id=101, nombre=Mouse Gamer, precio=39.99)\n¿prod1 es idéntico en contenido a prod2?: true\nProducto con descuento vía .copy(): Producto(id=101, nombre=Mouse Gamer, precio=29.99)`,
        byteTip: 'En el desarrollo moderno para Android con Jetpack Compose y Clean Architecture, casi todos tus modelos de datos serán data classes inmutables.',
        pitfallTip: 'Una data class debe tener al menos un parámetro en su constructor primario y todos deben marcarse obligatoriamente con val o var.',
        keyPoints: [
          'data class genera toString(), equals(), hashCode() y copy() automáticamente.',
          'Elimina cientos de líneas de código repetitivo de golpe.',
          'Es el estándar oficial de Android para representar modelos de datos.'
        ]
      },
      {
        title: 'Inmutabilidad elegante con .copy()',
        explanation: `El método \`.copy()\` es la clave para mantener tus datos inmutables (\`val\`) sin volverte loco cuando un dato cambia en la interfaz.

En lugar de modificar un objeto mutable, sacas una copia con el dato actualizado:`,
        codeSnippet: `data class EstadoPantalla(\n    val cargando: Boolean = false,\n    val mensaje: String = "",\n    val contadorNotificaciones: Int = 0\n)\n\nfun main() {\n    val estadoInicial = EstadoPantalla(cargando = true, mensaje = "Conectando...")\n    println("Estado 1: $estadoInicial")\n\n    // Llegan los datos: creamos el nuevo estado con .copy()\n    val estadoListo = estadoInicial.copy(\n        cargando = false,\n        mensaje = "Datos sincronizados con éxito",\n        contadorNotificaciones = 5\n    )\n    println("Estado 2: $estadoListo")\n}`,
        outputSnippet: `Estado 1: EstadoPantalla(cargando=true, mensaje=Conectando..., contadorNotificaciones=0)\nEstado 2: EstadoPantalla(cargando=false, mensaje=Datos sincronizados con éxito, contadorNotificaciones=5)`,
        byteTip: 'Este patrón es exactamente la base de cómo funciona el patrón MVI / StateFlow en las aplicaciones profesionales para Android.',
        pitfallTip: 'No uses data class para clases que tengan lógica compleja de herencia; están diseñadas para transportar datos puros.',
        keyPoints: [
          '.copy() permite clonar objetos alterando solo las propiedades deseadas.',
          'Fomenta el flujo unidireccional de datos en la arquitectura de apps.',
          'Hace que los estados de la interfaz sean predecibles y fáciles de probar.'
        ]
      }
    ]
  },

  'kotlin-u10-l08': {
    subtitle: 'Modela sistemas completos combinando data classes con colecciones de objetos.',
    analogy: 'La libreta de calificaciones de una universidad: cada renglón es un objeto Alumno completo (nombre, cédula, carrera, notas) y la libreta entera es una lista de alumnos que puedes ordenar y filtrar.',
    sections: [
      {
        title: 'Colecciones de objetos en el mundo real',
        explanation: `La verdadera potencia de la programación moderna surge cuando juntas las **colecciones** (\`List\`, \`Map\`) con tus **clases personalizadas** (\`data class\`).

En cualquier app de comercio electrónico, el feed no es una lista de números, sino una \`List<Producto>\`. Cada elemento de la lista es un objeto con título, precio, calificación y foto.`,
        codeSnippet: `data class Contacto(val nombre: String, val telefono: String, val esFavorito: Boolean)\n\nfun main() {\n    val agenda = listOf(\n        Contacto("Sofía Morales", "+506 8888-1111", esFavorito = true),\n        Contacto("Mateo Díaz", "+506 8888-2222", esFavorito = false),\n        Contacto("Camila Gómez", "+506 8888-3333", esFavorito = true)\n    )\n\n    println("=== CONTACTOS FAVORITOS ===")\n    for (contacto in agenda) {\n        if (contacto.esFavorito) {\n            println("⭐ \${contacto.nombre} (\${contacto.telefono})")\n        }\n    }\n}`,
        outputSnippet: `=== CONTACTOS FAVORITOS ===\n⭐ Sofía Morales (+506 8888-1111)\n⭐ Camila Gómez (+506 8888-3333)`,
        byteTip: 'En el siguiente módulo aprenderás a filtrar estas listas en una sola línea usando lambdas y .filter().',
        pitfallTip: 'Evita tener listas separadas de nombres y de teléfonos; agrúpalos siempre en una clase para no perder la coherencia de datos.',
        keyPoints: [
          'List<MiClase> modela catálogos, feeds de redes sociales y registros de bases de datos.',
          'Cada objeto conserva su propia identidad y propiedades dentro de la lista.',
          'Es la estructura de datos sobre la que operan las pantallas de Android.'
        ]
      },
      {
        title: 'Cálculos de totales sobre listas de objetos',
        explanation: `Mira cómo calcular el costo total de un carrito de compras que contiene varios productos:`,
        codeSnippet: `data class ItemCarrito(val titulo: String, val cantidad: Int, val precioUnitario: Double)\n\nfun main() {\n    val carrito = listOf(\n        ItemCarrito("Café Tostado", 2, 7.50),\n        ItemCarrito("Taza Cerámica", 1, 12.00),\n        ItemCarrito("Galletas Avena", 3, 2.50)\n    )\n\n    var granTotal = 0.0\n    for (item in carrito) {\n        val subtotalItem = item.cantidad * item.precioUnitario\n        granTotal += subtotalItem\n        println("• \${item.cantidad}x \${item.titulo} = $$subtotalItem")\n    }\n\n    println("----------------------------")\n    println("Total final a pagar: $$granTotal")\n}`,
        outputSnippet: `• 2x Café Tostado = $15.0\n• 1x Taza Cerámica = $12.0\n• 3x Galletas Avena = $7.5\n----------------------------\nTotal final a pagar: $34.5`,
        byteTip: 'Modelar cada línea de compra con su propia clase hace que el cálculo sea transparente y fácil de auditar.',
        pitfallTip: 'Verifica que la lista de items no esté vacía antes de procesar pagos en sistemas reales.',
        keyPoints: [
          'Agrupar datos en clases facilita cálculos acumulados sobre colecciones.',
          'Representa con exactitud los carritos de compra del comercio electrónico.',
          'Prepara el terreno para el paradigma de programación funcional en Kotlin.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 11: OPERACIONES SOBRE COLECCIONES Y LAMBDAS
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u11-l01': {
    subtitle: 'Aprende qué es una expresión lambda y cómo pasar código como parámetro usando llaves { } y la variable it.',
    analogy: 'Un cupón con instrucciones que le entregas a un asistente: "cuando llegues a la tienda, compra lo que esté marcado con el 50% de descuento". No vas tú mismo a la tienda; le pasas la instrucción empaquetada para que él la ejecute allá.',
    sections: [
      {
        title: '¿Qué es una expresión lambda?',
        explanation: `En Kotlin, las funciones son ciudadanos de primera clase: eso significa que puedes tratar a un bloque de código como si fuera un dato más (guardarlo en variables o pasarlo como argumento a otra función).

Una **expresión lambda** es una función anónima (sin nombre) escrita de forma ultracorta entre llaves:
\`{ parametro -> codigoAEjecutar }\`

Si la lambda recibe un solo parámetro, Kotlin te ahorra escribirlo y te ofrece la variable mágica implícita **\`it\`** (que en inglés significa "eso" o "este elemento").`,
        codeSnippet: `fun main() {\n    val numeros = listOf(1, 2, 3, 4)\n\n    // Usamos forEach con una lambda para imprimir cada elemento\n    print("Recorrido funcional: ")\n    numeros.forEach { numero ->\n        print("$numero ")\n    }\n    println()\n\n    // Usando el parámetro implícito 'it' (más corto y limpio):\n    print("Recorrido con it     : ")\n    numeros.forEach { print("$it ") }\n    println()\n}`,
        outputSnippet: `Recorrido funcional: 1 2 3 4 \nRecorrido con it     : 1 2 3 4 `,
        byteTip: 'Si el último parámetro de una función es una lambda, Kotlin te permite colocar las llaves { } FUERA de los paréntesis de la función. Es la sintaxis más famosa de Kotlin.',
        pitfallTip: 'Si anidas varias lambdas una dentro de otra, no uses it en todas; nombra los parámetros explícitamente para no confundirte sobre qué representa cada it.',
        keyPoints: [
          'Una lambda es una función anónima delimitada por llaves { }.',
          'it representa el parámetro único implícito en lambdas cortas.',
          'Es el cimiento de la programación reactiva y de Jetpack Compose en Android.'
        ]
      },
      {
        title: 'Lambdas en eventos de interfaz Android',
        explanation: `En el desarrollo para Android, cada vez que configuras qué ocurre al hacer clic en un botón, estás usando una lambda:
\`boton.setOnClickListener { mostrarMensaje() }\``,
        codeSnippet: `fun ejecutarAccion(nombreTarea: String, accion: () -> Unit) {\n    println("Iniciando tarea: $nombreTarea...")\n    accion() // Ejecutamos la lambda recibida\n    println("Tarea finalizada con éxito.\\n")\n}\n\nfun main() {\n    ejecutarAccion("Sincronización") {\n        println(" -> Subiendo datos a la nube...")\n    }\n}`,
        outputSnippet: `Iniciando tarea: Sincronización...\n -> Subiendo datos a la nube...\nTarea finalizada con éxito.\n`,
        byteTip: '() -> Unit indica que la función espera una lambda que no recibe argumentos y no retorna nada.',
        pitfallTip: 'No pongas lógica gigante dentro de una lambda anónima si puedes delegarla a una función con nombre.',
        keyPoints: [
          'Las lambdas permiten programar respuestas a eventos y toques en pantalla.',
          'Hacen que el código asíncrono sea directo y fácil de leer.',
          'Transforman la manipulación de colecciones en código declarativo.'
        ]
      }
    ]
  },

  'kotlin-u11-l02': {
    subtitle: 'Filtra elementos de una colección en una sola línea declarativa con .filter().',
    analogy: 'Un colador de cocina: viertes toda la mezcla (la lista original) y el colador solo deja pasar los trozos que cumplen la condición que quieres conservar.',
    sections: [
      {
        title: 'Filtrar colecciones con .filter()',
        explanation: `En lugar de escribir un bucle \`for\`, un \`if\` adentro y una nueva lista mutable con \`.add()\`, Kotlin te permite filtrar cualquier colección en una sola línea con **\`.filter()\`**:

• Le pasas una lambda con una condición booleana.
• \`.filter()\` revisa cada elemento y conserva solo los que dan **\`true\`**.
• Devuelve una **nueva lista** con los elementos seleccionados, dejando la lista original intacta.`,
        codeSnippet: `fun main() {\n    val numeros = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)\n\n    // Filtramos solo los números pares\n    val pares = numeros.filter { it % 2 == 0 }\n    println("Números pares: $pares")\n\n    // Filtramos números mayores a 5\n    val mayoresACinco = numeros.filter { it > 5 }\n    println("Mayores a cinco: $mayoresACinco")\n}`,
        outputSnippet: `Números pares: [2, 4, 6, 8, 10]\nMayores a cinco: [6, 7, 8, 9, 10]`,
        byteTip: 'filter no modifica la lista original; crea una nueva lista inmutable y segura.',
        pitfallTip: 'Si ningún elemento cumple la condición, filter devuelve una lista vacía [], jamás devuelve null.',
        keyPoints: [
          '.filter { condicion } conserva los elementos que evalúan a true.',
          'Elimina la necesidad de escribir bucles for manuales para filtrar.',
          'Es una operación pura sin efectos secundarios.'
        ]
      },
      {
        title: 'Filtrar listas de objetos complejos',
        explanation: `Mira cómo filtrar un catálogo de productos para mostrar únicamente los que están disponibles en stock:`,
        codeSnippet: `data class Articulo(val nombre: String, val precio: Double, val disponible: Boolean)\n\nfun main() {\n    val catalogo = listOf(\n        Articulo("Laptop Pro", 1200.0, disponible = true),\n        Articulo("Monitor 4K", 450.0, disponible = false),\n        Articulo("Teclado Mecánico", 85.0, disponible = true)\n    )\n\n    val disponibles = catalogo.filter { it.disponible }\n    println("Artículos listos para despacho:")\n    disponibles.forEach { println(" • \${it.nombre} ($$\${it.precio})") }\n}`,
        outputSnippet: `Artículos listos para despacho:\n • Laptop Pro ($1200.0)\n • Teclado Mecánico ($85.0)`,
        byteTip: 'También existe filterNot { condicion } para conservar los elementos que den false.',
        pitfallTip: 'No uses filter si solo estás buscando un único elemento; para eso existe find o firstOrNull.',
        keyPoints: [
          'filter sobre listas de objetos permite consultar propiedades con it.propiedad.',
          'Se integra fluidamente con la lógica de presentación en Android.',
          'Es el estándar de oro de la programación funcional en Kotlin.'
        ]
      }
    ]
  },

  'kotlin-u11-l03': {
    subtitle: 'Transforma y proyecta los elementos de una colección en un nuevo formato con .map().',
    analogy: 'Una fábrica que procesa naranjas y las convierte en botellas de jugo: entra una lista de naranjas y sale una lista de botellas de jugo del mismo tamaño exacto.',
    sections: [
      {
        title: 'Transformar datos con .map()',
        explanation: `La operación **\`.map()\`** toma cada elemento de una lista, le aplica una transformación y devuelve una **nueva lista** con los resultados:
• Si la lista original tenía 5 elementos, la lista resultante tendrá exactamente 5 elementos transformados.
• Puede cambiar el valor (multiplicar números) o incluso el tipo de dato (convertir una lista de objetos \`Usuario\` en una simple lista de \`String\` con solo sus nombres).`,
        codeSnippet: `fun main() {\n    val numeros = listOf(1, 2, 3, 4)\n    \n    // Multiplicamos cada número por 10\n    val multiplicados = numeros.map { it * 10 }\n    println("Originales    : $numeros")\n    println("Multiplicados : $multiplicados")\n\n    // Convertimos números a textos formateados\n    val textos = numeros.map { "Número #$it" }\n    println("Textos creados: $textos")\n}`,
        outputSnippet: `Originales    : [1, 2, 3, 4]\nMultiplicados : [10, 20, 30, 40]\nTextos creados: [Número #1, Número #2, Número #3, Número #4]`,
        byteTip: 'Puedes encadenar filter y map juntos: lista.filter { ... }.map { ... } para filtrar y transformar en un solo pipeline.',
        pitfallTip: 'No confundas la función .map() de colecciones con la estructura de datos Map (clave-valor). Hacen cosas distintas.',
        keyPoints: [
          '.map { transformacion } genera una nueva lista con los resultados transformados.',
          'La lista resultante siempre tiene el mismo tamaño que la original.',
          'Permite extraer columnas específicas de listas de objetos.'
        ]
      },
      {
        title: 'Extracción de propiedades en modelos de datos',
        explanation: `En Android es muy común recibir una lista completa de usuarios y querer extraer únicamente sus correos electrónicos para enviar un aviso masivo:`,
        codeSnippet: `data class Cliente(val id: Int, val nombre: String, val email: String)\n\nfun main() {\n    val clientes = listOf(\n        Cliente(1, "Valeria", "valeria@correo.com"),\n        Cliente(2, "Mateo", "mateo@correo.com")\n    )\n\n    // Extraemos solo los correos\n    val correos = clientes.map { it.email }\n    println("Lista de correos para campaña: $correos")\n}`,
        outputSnippet: `Lista de correos para campaña: [valeria@correo.com, mateo@correo.com]`,
        byteTip: 'clientes.map { it.email } transforma una List<Cliente> en una List<String> limpia.',
        pitfallTip: 'Si tu transformación puede devolver null, considera usar mapNotNull { } para descartar los nulos automáticamente.',
        keyPoints: [
          'map proyecta objetos complejos hacia tipos primitivos simples.',
          'Desacopla la lógica de transporte de datos de la interfaz visual.',
          'Es una de las operaciones más utilizadas en programación moderna.'
        ]
      }
    ]
  },

  'kotlin-u11-l04': {
    subtitle: 'Encuentra el primer elemento que cumpla una condición con .find() y firstOrNull().',
    analogy: 'Buscar las llaves de tu casa en tu mochila: metes la mano y en cuanto tus dedos tocan la primera llave, la sacas de inmediato y dejas de buscar en el resto de los bolsillos.',
    sections: [
      {
        title: 'Búsqueda de elementos con .find()',
        explanation: `Si solo necesitas **un único elemento** que cumpla una regla (por ejemplo, buscar un usuario por su ID único), usar \`.filter()\` sería ineficiente porque recorrería toda la lista para traerte una lista de un solo elemento.

Para esto existe **\`.find()\`** (o su sinónimo idéntico **\`.firstOrNull()\`**):
• Recorre la lista de izquierda a derecha.
• En cuanto encuentra el primer elemento que cumple la condición, **se detiene de inmediato** y lo devuelve.
• Si ningún elemento cumple la condición, devuelve **\`null\`** pacíficamente sin romperse.`,
        codeSnippet: `data class Usuario(val id: Int, val nombre: String)\n\nfun main() {\n    val usuarios = listOf(\n        Usuario(101, "Carlos"),\n        Usuario(102, "Elena"),\n        Usuario(103, "Andrés")\n    )\n\n    // Buscamos el usuario con ID 102\n    val encontrado = usuarios.find { it.id == 102 }\n    println("Usuario encontrado: \${encontrado?.nombre ?: "No existe"}")\n\n    // Buscamos un ID inexistente\n    val noExiste = usuarios.find { it.id == 999 }\n    println("Búsqueda fallida: \${noExiste?.nombre ?: "Usuario no registrado"}")\n}`,
        outputSnippet: `Usuario encontrado: Elena\nBúsqueda fallida: Usuario no registrado`,
        byteTip: 'find devuelve un tipo anulable (T?), por lo que combina de maravilla con el operador Elvis ?: para manejar el caso en que no se encuentre.',
        pitfallTip: 'Si esperas encontrar múltiples coincidencias, usa filter. find solo te entregará la primera que halle.',
        keyPoints: [
          '.find { condicion } devuelve el primer elemento coincidente.',
          'Devuelve null si ningún elemento coincide.',
          'Se detiene inmediatamente tras encontrar el objetivo, ahorrando tiempo de CPU.'
        ]
      },
      {
        title: 'Búsqueda inversa con findLast()',
        explanation: `Si quieres buscar el **último** elemento que cumplió la condición (de derecha a izquierda), Kotlin te ofrece \`.findLast()\`:`,
        codeSnippet: `fun main() {\n    val temperaturas = listOf(22, 28, 31, 29, 24)\n    \n    val ultimaAlta = temperaturas.findLast { it > 25 }\n    println("Última temperatura calurosa registrada: $ultimaAlta°C")\n}`,
        outputSnippet: `Última temperatura calurosa registrada: 29°C`,
        byteTip: 'findLast recorre en reversa, ideal para buscar el evento o mensaje más reciente en un historial.',
        pitfallTip: 'Asegúrate de que la lista no sea nula antes de llamar a find o usa lista?.find { }.',
        keyPoints: [
          'findLast() busca de derecha a izquierda.',
          'Ideal para consultar el último estado o transacción reciente.',
          'Ambos métodos son seguros frente a resultados vacíos.'
        ]
      }
    ]
  },

  'kotlin-u11-l05': {
    subtitle: 'Comprueba condiciones globales sobre colecciones con .any(), .all() y .none().',
    analogy: 'Un control de seguridad en un laboratorio: ¿Hay al menos una persona con fiebre? (any). ¿Están todas las personas usando mascarilla? (all). ¿Ninguna persona lleva objetos prohibidos? (none).',
    sections: [
      {
        title: 'Comprobaciones booleanas con any, all y none',
        explanation: `A veces no necesitas obtener los elementos, sino saber si la colección en su conjunto cumple cierta condición de negocio:

• **\`.any { condición }\`**: Devuelve \`true\` si **al menos un elemento** cumple la regla.
• **\`.all { condición }\`**: Devuelve \`true\` si **absolutamente todos los elementos** cumplen la regla.
• **\`.none { condición }\`**: Devuelve \`true\` si **ningún elemento** cumple la regla.

Devuelven un simple y limpio \`Boolean\` (\`true\` o \`false\`).`,
        codeSnippet: `fun main() {\n    val calificaciones = listOf(85, 92, 78, 65, 88)\n\n    // ¿Alguien obtuvo calificación perfecta (100)?\n    val hayPerfectos = calificaciones.any { it == 100 }\n    println("¿Hay alguna nota perfecta de 100?: $hayPerfectos")\n\n    // ¿Todos los alumnos aprobaron (nota >= 70)?\n    val todosAprobados = calificaciones.all { it >= 70 }\n    println("¿Aprobaron absolutamente todos?: $todosAprobados")\n\n    // ¿Nadie reprobó con menos de 50?\n    val ningunoGrave = calificaciones.none { it < 50 }\n    println("¿Ninguno sacó nota inferior a 50?: $ningunoGrave")\n}`,
        outputSnippet: `¿Hay alguna nota perfecta de 100?: false\n¿Aprobaron absolutamente todos?: false\n¿Ninguno sacó nota inferior a 50?: true`,
        byteTip: 'any() sin parámetros comprueba si la lista tiene al menos un elemento: if (carrito.any()) equivale a if (carrito.isNotEmpty()).',
        pitfallTip: 'Ten en cuenta que all { } sobre una lista vacía siempre devuelve true en lógica matemática (verdad vacua).',
        keyPoints: [
          '.any() verifica si al menos uno cumple la condición.',
          '.all() exige que todos sin excepción la cumplan.',
          '.none() confirma que ninguno la cumpla.',
          'Aplican cortocircuito: se detienen en cuanto se define el resultado.'
        ]
      },
      {
        title: 'Validación de carritos de compra',
        explanation: `Mira cómo verificar que todos los productos de una orden tengan precio válido antes de autorizar el cobro:`,
        codeSnippet: `data class LineaPedido(val producto: String, val precio: Double)\n\nfun main() {\n    val pedido = listOf(\n        LineaPedido("Libro", 25.0),\n        LineaPedido("Cuaderno", 5.0)\n    )\n\n    val preciosValidos = pedido.all { it.precio > 0.0 }\n    println("¿Todos los artículos tienen precio positivo válido?: $preciosValidos")\n}`,
        outputSnippet: `¿Todos los artículos tienen precio positivo válido?: true`,
        byteTip: 'Usar any, all y none hace que las reglas de negocio en tu código se lean con total claridad.',
        pitfallTip: 'No uses filter { ... }.isNotEmpty() cuando un simple any { ... } hace lo mismo sin crear listas temporales en memoria.',
        keyPoints: [
          'any/all/none son más eficientes en memoria que filtrar.',
          'Hacen que las validaciones de negocio sean intuitivas.',
          'Son herramientas indispensables en la lógica de dominio en Android.'
        ]
      }
    ]
  },

  'kotlin-u11-l06': {
    subtitle: 'Ordena colecciones por cualquier criterio con .sorted() y .sortedBy().',
    analogy: 'Ordenar una fila de personas: por orden alfabético de sus apellidos, por orden de estatura de menor a mayor, o por orden de fecha de llegada.',
    sections: [
      {
        title: 'Ordenamiento con sorted y sortedBy',
        explanation: `Presentar datos ordenados en pantalla mejora drásticamente la experiencia del usuario (ver productos del más barato al más caro, o contactos de la A a la Z).

Kotlin incluye funciones de ordenamiento ultra-rápidas:
• **\`.sorted()\`**: Para colecciones de tipos básicos (números o texto); los ordena en orden natural ascendente (de menor a mayor, o alfabéticamente).
• **\`.sortedDescending()\`**: Ordena en sentido inverso (de mayor a menor).
• **\`.sortedBy { it.propiedad }\`**: Para listas de objetos complejos; le indicas por cuál propiedad deseas ordenar.
• **\`.sortedByDescending { it.propiedad }\`**: Ordena objetos de mayor a menor según esa propiedad.`,
        codeSnippet: `data class Corredor(val nombre: String, val tiempoSegundos: Int)\n\nfun main() {\n    val numeros = listOf(42, 10, 88, 3, 25)\n    println("Números ordenados ascendente: \${numeros.sorted()}")\n    println("Números ordenados descendente: \${numeros.sortedDescending()}")\n\n    val corredores = listOf(\n        Corredor("Ana", 145),\n        Corredor("Carlos", 130),\n        Corredor("Beatriz", 138)\n    )\n\n    // Ordenamos por menor tiempo (el más rápido primero)\n    val podio = corredores.sortedBy { it.tiempoSegundos }\n    println("\\nClasificación oficial de la carrera:")\n    podio.forEachIndexed { pos, c ->\n        println("\${pos + 1}° Puesto: \${c.nombre} (\${c.tiempoSegundos}s)")\n    }\n}`,
        outputSnippet: `Números ordenados ascendente: [3, 10, 25, 42, 88]\nNúmeros ordenados descendente: [88, 42, 25, 10, 3]\n\nClasificación oficial de la carrera:\n1° Puesto: Carlos (130s)\n2° Puesto: Beatriz (138s)\n3° Puesto: Ana (145s)`,
        byteTip: 'sortedBy crea una nueva lista ordenada y deja la original intacta (inmutabilidad).',
        pitfallTip: 'Si trabajas con listas mutables y quieres ordenar la lista en su mismo lugar sin crear una nueva, usa .sortBy { } en lugar de .sortedBy { }.',
        keyPoints: [
          '.sorted() ordena listas primitivas en orden ascendente.',
          '.sortedBy { it.campo } permite ordenar objetos por cualquier atributo.',
          '.sortedByDescending ordena de mayor a menor.'
        ]
      },
      {
        title: 'Ordenamiento alfabético insensible a mayúsculas',
        explanation: `Al ordenar nombres, conviene normalizar la comparación para que las mayúsculas no alteren el orden del diccionario:`,
        codeSnippet: `fun main() {\n    val nombres = listOf("sofía", "Andrés", "beatriz", "Carlos")\n    \n    val ordenAlfabetico = nombres.sortedBy { it.lowercase() }\n    println("Directorio telefónico ordenado: $ordenAlfabetico")\n}`,
        outputSnippet: `Directorio telefónico ordenado: [Andrés, beatriz, Carlos, sofía]`,
        byteTip: 'sortedBy { it.lowercase() } garantiza que "A" y "a" queden juntas alfabéticamente.',
        pitfallTip: 'Ordenar una lista con millones de elementos repetidas veces en el hilo principal de Android puede congelar la pantalla. En esos casos, hazlo en segundo plano.',
        keyPoints: [
          'sortedBy con transformación asegura orden alfabético humano.',
          'Las operaciones de ordenamiento en Kotlin están altamente optimizadas con TimSort.',
          'Esenciales para tablas, filtros y listas en la interfaz de usuario.'
        ]
      }
    ]
  },

  'kotlin-u11-l07': {
    subtitle: 'Calcula sumas, conteos y estadísticas sobre colecciones con .sumOf() y .count().',
    analogy: 'Un escáner contable en una caja de supermercado: va pasando artículo por artículo y suma de inmediato los precios acumulados para darte el total a pagar al final de la cinta.',
    sections: [
      {
        title: 'Totales y estadísticas con sumOf y count',
        explanation: `Calcular totales numéricos a partir de colecciones de objetos es una tarea diaria:
• El total en dinero de un carrito de compras.
• El recuento de mensajes no leídos.
• La cantidad de empleados con sueldo superior a cierto monto.

Kotlin ofrece funciones de agregación optimizadas que eliminan por completo la necesidad de bucles y acumuladores manuales:
• **\`.count { condición }\`**: Cuenta cuántos elementos cumplen la condición.
• **\`.sumOf { it.propiedadNumerica }\`**: Suma la propiedad numérica indicada de cada elemento.`,
        codeSnippet: `data class Venta(val producto: String, val unidades: Int, val total: Double)\n\nfun main() {\n    val ventasDelDia = listOf(\n        Venta("Café", 3, 15.0),\n        Venta("Sándwich", 2, 14.0),\n        Venta("Jugo Natural", 1, 4.5)\n    )\n\n    // 1. Contamos cuántas ventas superaron los $10\n    val ventasGrandes = ventasDelDia.count { it.total >= 10.0 }\n    println("Ventas mayores a $10: $ventasGrandes")\n\n    // 2. Sumamos el dinero total recaudado con sumOf\n    val dineroTotal = ventasDelDia.sumOf { it.total }\n    println("Recaudación total: $$dineroTotal")\n\n    // 3. Sumamos unidades físicas vendidas\n    val unidadesTotales = ventasDelDia.sumOf { it.unidades }\n    println("Unidades totales vendidas: $unidadesTotales")\n}`,
        outputSnippet: `Ventas mayores a $10: 3\nRecaudación total: $33.5\nUnidades totales vendidas: 6`,
        byteTip: 'sumOf maneja tanto números enteros como Double de forma automática y precisa.',
        pitfallTip: 'No uses filter { ... }.size para contar; .count { ... } es más rápido y no gasta memoria creando listas temporales.',
        keyPoints: [
          '.count { condicion } cuenta elementos de forma eficiente sin listas intermedias.',
          '.sumOf { it.campo } totaliza valores numéricos en una sola línea.',
          'Reemplaza por completo el patrón manual de bucles y acumuladores.'
        ]
      },
      {
        title: 'Métricas promedio combinando operaciones',
        explanation: `Mira qué sencillo es calcular el ticket promedio de compra combinando \`sumOf\` y \`size\`:`,
        codeSnippet: `fun main() {\n    val cobros = listOf(150.0, 80.0, 220.0, 50.0)\n    \n    val totalRecaudado = cobros.sumOf { it }\n    val ticketPromedio = totalRecaudado / cobros.size\n    \n    println("Total: $$totalRecaudado | Promedio por cliente: $$ticketPromedio")\n}`,
        outputSnippet: `Total: $500.0 | Promedio por cliente: $125.0`,
        byteTip: 'Kotlin también incluye las funciones .maxOrNull() y .minOrNull() para obtener los valores extremos de una lista.',
        pitfallTip: 'Comprueba que la lista no esté vacía antes de dividir entre .size para prevenir divisiones entre cero.',
        keyPoints: [
          'Las funciones de agregación se combinan limpiamente para generar estadísticas.',
          'El código resulta conciso, legible y matemáticamente exacto.',
          'Son las herramientas estándar en dashboards y reportes de Android.'
        ]
      }
    ]
  },

  // ═════════════════════════════════════════════════════════════════════════
  // UNIDAD 12: ERRORES Y DEPURACIÓN
  // ═════════════════════════════════════════════════════════════════════════
  'kotlin-u12-l01': {
    subtitle: 'Distingue los tres grandes tipos de fallas en programación: sintaxis, ejecución y lógica.',
    analogy: 'Un error de sintaxis es escribir una palabra con mala ortografía en una carta. Un error de ejecución es enviar la carta a una dirección que no existe (el cartero se estrella). Un error de lógica es enviar la carta de felicitación a tu enemigo en lugar de a tu amigo: la carta llegó perfecto, pero el resultado fue un desastre.',
    sections: [
      {
        title: 'Los tres tipos de errores en software',
        explanation: `Todos los programadores del mundo, desde principiantes hasta creadores de sistemas operativos, cometen errores a diario. La clave es saber clasificarlos para resolverlos rápido:

1. **Errores de Sintaxis (Tiempo de compilación):**
Rompen las reglas gramaticales de Kotlin (olvidar una comilla, escribir \`fnu\` en vez de \`fun\`). El compilador los subraya en rojo de inmediato y **no te permite ejecutar el programa** hasta corregirlos.

2. **Errores de Ejecución (Runtime / Crashes):**
El código compila bien, pero al ejecutarse ocurre algo imposible: dividir entre cero, consultar un archivo que fue borrado o recibir un \`NullPointerException\`. Provocan que la app se cierre de golpe.

3. **Errores de Lógica (Bugs semánticos):**
El programa compila y corre sin cerrarse, pero **produce un resultado equivocado** porque la fórmula o la condición están mal pensadas (por ejemplo: sumar el descuento en lugar de restarlo). Son los más peligrosos porque la máquina no te avisa.`,
        codeSnippet: `fun main() {\n    // Error de lógica silencioso: pusimos + en lugar de -\n    val precioOriginal = 100.0\n    val descuento = 20.0\n    \n    // El cálculo corre sin fallar, pero el cliente paga $120 en vez de $80\n    val totalErroneo = precioOriginal + descuento\n    println("Total con error lógico: $$totalErroneo (¡Cobro de más!)")\n\n    val totalCorrecto = precioOriginal - descuento\n    println("Total corregido      : $$totalCorrecto (¡Correcto!)")\n}`,
        outputSnippet: `Total con error lógico: $120.0 (¡Cobro de más!)\nTotal corregido      : $80.0 (¡Correcto!)`,
        byteTip: 'Los errores de sintaxis son tus amigos: te avisan antes de que el usuario vea la app. Los errores de lógica se descubren con buenas pruebas unitarias.',
        pitfallTip: 'No asumas que porque tu código compila ya está bien. Revisa siempre los resultados con datos de prueba reales.',
        keyPoints: [
          'Sintaxis: violación de reglas gramaticales detectada por el compilador.',
          'Ejecución: fallas en tiempo de ejecución que detienen la app si no se capturan.',
          'Lógica: cálculos o condiciones mal formuladas que dan resultados incorrectos.'
        ]
      },
      {
        title: 'El ciclo de depuración (Debugging)',
        explanation: `Depurar (*debug*) no es dar golpes a ciegas modificando código al azar. Es un proceso científico:
1. **Reproducir el error:** Asegúrate de saber exactamente qué pasos provocan la falla.
2. **Aislar la causa:** Revisa las variables intermedias con \`println\` o el depurador.
3. **Aplicar la corrección mínima:** Cambia solo lo necesario.
4. **Verificar:** Comprueba que la corrección no rompió otra parte del sistema.`,
        codeSnippet: `fun main() {\n    val paso1 = 10\n    val paso2 = paso1 * 2\n    println("Diagnóstico en vivo -> paso1: $paso1, paso2: $paso2")\n    \n    val resultado = paso2 + 5\n    println("Resultado final verificado: $resultado")\n}`,
        outputSnippet: `Diagnóstico en vivo -> paso1: 10, paso2: 20\nResultado final verificado: 25`,
        byteTip: 'Aprender a leer los errores con calma te ahorra horas de frustración.',
        pitfallTip: 'Nunca cambies 5 cosas a la vez mientras buscas un bug; si se arregla no sabrás qué lo resolvió, y si empeora será más confuso.',
        keyPoints: [
          'La depuración es una habilidad metódica y analítica.',
          'Inspeccionar estados intermedios revela el punto exacto de la falla.',
          'Las pruebas constantes garantizan que las soluciones sean definitivas.'
        ]
      }
    ]
  },

  'kotlin-u12-l02': {
    subtitle: 'Aprende a leer y descifrar los mensajes de error del compilador de Kotlin sin asustarte.',
    analogy: 'La luz de "Check Engine" del tablero de un automóvil: si conectas el escáner del mecánico, te dice con precisión exacta "falla en sensor de oxígeno, cilindro 2". Los errores del compilador hacen exactamente lo mismo: te dan el archivo, la línea y la causa.',
    sections: [
      {
        title: 'Cómo leer un mensaje de error del compilador',
        explanation: `Cuando el compilador de Kotlin encuentra un error, no lo hace para castigarte: te está entregando un reporte técnico diseñado para que lo soluciones en segundos.

La estructura estándar de un error de Kotlin es:
\`Archivo.kt:Línea:Columna: error: Mensaje explicativo\`

Ejemplos comunes que verás:
• **\`Unresolved reference: nombre\`**: Intentaste usar una variable o función que no existe o cuyo nombre escribiste con una falta de ortografía.
• **\`Type mismatch: inferred type is String but Int was expected\`**: Intentaste meter un texto donde se esperaba un número.
• **\`Val cannot be reassigned\`**: Intentaste modificar una variable inmutable declarada con \`val\`.`,
        codeSnippet: `fun main() {\n    // Demostración de código correcto que soluciona los errores clásicos:\n    val edad: Int = 25 // Tipos coincidentes (Int con Int)\n    var puntaje = 100  // Usamos var porque necesitamos reasignarlo\n    puntaje = 150      // Reasignación permitida\n\n    println("Edad: $edad | Puntaje actualizado: $puntaje")\n}`,
        outputSnippet: `Edad: 25 | Puntaje actualizado: 150`,
        byteTip: 'Lee siempre el primer error que aparezca en la lista superior. Muchas veces los errores de abajo son solo consecuencias del primero.',
        pitfallTip: 'No ignores el número de línea. Si el compilador dice Línea 14, ve directamente a la línea 14 de ese archivo.',
        keyPoints: [
          'Los mensajes del compilador indican archivo, número de línea y causa exacta.',
          'Type mismatch señala incompatibilidad de tipos de datos.',
          'Unresolved reference suele ser un error tipográfico en el nombre del elemento.'
        ]
      },
      {
        title: 'El error de referencia no resuelta (Unresolved reference)',
        explanation: `Es con diferencia el error más frecuente. Ocurre por:
• Una letra mayúscula equivocada (\`nombreusuario\` vs \`nombreUsuario\`).
• Olvidar importar un paquete (\`import ...\`).
• Usar una variable fuera del bloque \`{ }\` donde fue declarada.`,
        codeSnippet: `fun main() {\n    val claveApi = "API_PROD_9988"\n    // Si escribes claveapi con minúscula, Kotlin dirá Unresolved reference\n    println("Conectando con credencial: $claveApi")\n}`,
        outputSnippet: `Conectando con credencial: API_PROD_9988`,
        byteTip: 'Usa el autocompletado del IDE (Tab o Enter) para escribir nombres de variables sin riesgo de errores tipográficos.',
        pitfallTip: 'Kotlin es estrictamente sensible a mayúsculas y minúsculas (case-sensitive).',
        keyPoints: [
          'La sensibilidad a mayúsculas exige precisión en los nombres.',
          'El autocompletado previene fallas de referencia no resuelta.',
          'Revisar el alcance de llaves resuelve la mayoría de estos incidentes.'
        ]
      }
    ]
  },

  'kotlin-u12-l03': {
    subtitle: 'Rastrea el valor de tus variables en vivo paso a paso para cazar errores lógicos complejos.',
    analogy: 'Ver la repetición en cámara lenta del VAR en un partido de fútbol: congelas la jugada cuadro por cuadro para ver con tus propios ojos si el balón cruzó o no la línea.',
    sections: [
      {
        title: 'Seguimiento de variables e inspección en vivo',
        explanation: `Cuando tu programa da un resultado incorrecto y no entiendes por qué, la peor estrategia es quedarte mirando el código esperando que se ilumine solo.

La mejor estrategia es **hacer visible lo invisible**:
1. Imprime los valores antes y después de cada cálculo clave.
2. Comprueba que las condiciones de los \`if\` reciban los valores que tú crees que reciben.
3. En Android Studio, coloca un **punto de interrupción (Breakpoint)** y ejecuta en modo Debug para detener el tiempo y examinar la memoria viva.`,
        codeSnippet: `fun main() {\n    val precioUnitario = 12.50\n    val unidades = 4\n    println("[DEBUG 1] precioUnitario: $precioUnitario, unidades: $unidades")\n\n    val subtotal = precioUnitario * unidades\n    println("[DEBUG 2] subtotal calculado: $subtotal")\n\n    val impuesto = subtotal * 0.10\n    println("[DEBUG 3] impuesto calculado: $impuesto")\n\n    val total = subtotal + impuesto\n    println("TOTAL FINAL: $$total")\n}`,
        outputSnippet: `[DEBUG 1] precioUnitario: 12.5, unidades: 4\n[DEBUG 2] subtotal calculado: 50.0\n[DEBUG 3] impuesto calculado: 5.0\nTOTAL FINAL: $55.0`,
        byteTip: 'Usar prefijos como [DEBUG] en tus impresiones temporales te permite encontrarlas y borrarlas fácilmente antes de entregar tu código.',
        pitfallTip: 'Recuerda limpiar tus impresiones temporales antes de publicar tu aplicación en la tienda de apps de Google Play.',
        keyPoints: [
          'Rastrear estados intermedios localiza el error lógico exacto.',
          'Hacer visible la información elimina las conjeturas en el desarrollo.',
          'Los puntos de interrupción en Android Studio son la herramienta profesional definitiva.'
        ]
      },
      {
        title: 'Depuración de condiciones lógicas',
        explanation: `Mira cómo imprimir una condición booleana para entender por qué un bloque \`if\` no se está ejecutando:`,
        codeSnippet: `fun main() {\n    val edad = 17\n    val tienePermiso = false\n\n    val cumpleRequisitos = edad >= 18 || tienePermiso\n    println("Diagnóstico: ¿Cumple requisitos?: $cumpleRequisitos")\n\n    if (cumpleRequisitos) {\n        println("Acceso concedido.")\n    } else {\n        println("Acceso denegado: debe tener 18 años o permiso firmado.")\n    }\n}`,
        outputSnippet: `Diagnóstico: ¿Cumple requisitos?: false\nAcceso denegado: debe tener 18 años o permiso firmado.`,
        byteTip: 'Extraer condiciones complejas a variables booleanas intermedias permite imprimirlas y entenderlas fácilmente.',
        pitfallTip: 'No confíes en tu memoria al evaluar tablas de verdad complejas; imprímelas y sal de dudas.',
        keyPoints: [
          'La inspección de expresiones booleanas aclara el flujo de bifurcación.',
          'Facilita la explicación de reglas de negocio a clientes y diseñadores.',
          'Previene fallos de seguridad en accesos y permisos.'
        ]
      }
    ]
  },

  'kotlin-u12-l04': {
    subtitle: 'Captura fallas de ejecución imprevistas y mantén tu aplicación viva con bloques try y catch.',
    analogy: 'Un trapecista de circo que realiza acrobacias en el aire: si todo sale bien, vuela con gracia; pero si resbala, hay una red de seguridad debajo (catch) que lo atrapa sin que se lastime.',
    sections: [
      {
        title: 'Manejo de excepciones con try y catch',
        explanation: `Una **excepción** es un evento extraordinario que ocurre durante la ejecución del programa y que amenaza con detenerlo de golpe (por ejemplo, intentar leer un archivo que el usuario acaba de borrar o perder la conexión a internet a medio envío).

Para evitar que tu app se cierre bruscamente, usamos el bloque **\`try - catch\`**:
• **\`try\` (Intentar):** Envuelve el código peligroso que podría fallar.
• **\`catch\` (Capturar):** Si ocurre una excepción dentro del \`try\`, Kotlin salta de inmediato al bloque \`catch\` para manejar el error amablemente y continuar con la app viva.`,
        codeSnippet: `fun main() {\n    val textoUsuario = "diez" // No es un número\n\n    try {\n        // Código peligroso: puede lanzar NumberFormatException\n        val numero = textoUsuario.toInt()\n        println("Número procesado: $numero")\n    } catch (e: Exception) {\n        // Red de seguridad: atrapamos el error\n        println("Aviso controlado: No pudimos convertir '$textoUsuario'. Mensaje técnico: \${e.message}")\n    }\n\n    println("El programa continúa funcionando con normalidad sin caerse.")\n}`,
        outputSnippet: `Aviso controlado: No pudimos convertir 'diez'. Mensaje técnico: For input string: "diez"\nEl programa continúa funcionando con normalidad sin caerse.`,
        byteTip: 'En la variable e tienes acceso al mensaje de error técnico (e.message) para registrarlo en tus bitácoras de diagnóstico.',
        pitfallTip: 'No dejes bloques catch vacíos ({ }). Ocultar un error sin registrarlo hace que los bugs sean invisibles e imposibles de resolver.',
        keyPoints: [
          'try envuelve operaciones propensas a fallos.',
          'catch captura la excepción y ejecuta un plan de contingencia.',
          'Evita que la aplicación se cierre abruptamente en las manos del usuario.'
        ]
      },
      {
        title: 'El bloque finally para limpieza de recursos',
        explanation: `Opcionalmente puedes agregar un bloque **\`finally\`** al final. El código dentro de \`finally\` **se ejecuta siempre**, tanto si la operación tuvo éxito como si ocurrió un error (ideal para cerrar archivos o conexiones):`,
        codeSnippet: `fun main() {\n    try {\n        println("Abriendo conexión con la base de datos...")\n    } catch (e: Exception) {\n        println("Error en la conexión.")\n    } finally {\n        println("Limpieza: Conexión cerrada de forma garantizada.")\n    }\n}`,
        outputSnippet: `Abriendo conexión con la base de datos...\nLimpieza: Conexión cerrada de forma garantizada.`,
        byteTip: 'finally se ejecuta incluso si dentro del try colocas un return.',
        pitfallTip: 'No uses try-catch para control de flujo cotidiano; úsalo solo para situaciones excepcionales de I/O, red o hardware.',
        keyPoints: [
          'finally garantiza la liberación de recursos críticos.',
          'Se ejecuta siempre, sin importar si hubo excepción o éxito.',
          'Es vital para evitar fugas de memoria y bloqueos de archivos.'
        ]
      }
    ]
  },

  'kotlin-u12-l05': {
    subtitle: 'Aprende cuándo validar preventivamente con if frente a cuándo capturar con try-catch.',
    analogy: 'Mirar el pronóstico del clima antes de salir y llevar paraguas (validación preventiva con if) frente a salir a la intemperie sin mirar y tener que comprar un abrigo de emergencia si empieza a granizar (captura de excepción con catch).',
    sections: [
      {
        title: 'Validación preventiva vs Manejo de excepciones',
        explanation: `Uno de los dilemas clásicos en ingeniería de software es: ¿debo usar \`if\` para validar o debo usar \`try-catch\`?

La regla de oro de la industria:
1. **Usa \`if\` para condiciones normales y previsibles:**
Si puedes verificar de antemano si un dato es válido (por ejemplo, comprobar si un texto está vacío o si un divisor es cero), hazlo siempre con un simple \`if\`. Es mucho más rápido, no consume recursos extra y hace el código limpio.
2. **Usa \`try-catch\` para fallas fuera de tu control directo:**
Archivos del sistema que pueden estar bloqueados, fallas de antena de red móvil, respuestas corruptas del servidor o problemas de hardware.`,
        codeSnippet: `fun dividirSeguroConIf(dividendo: Int, divisor: Int): Int? {\n    // Validación preventiva limpia: prevenimos el error antes de que ocurra\n    if (divisor == 0) {\n        println("Aviso preventivo: El divisor no puede ser cero.")\n        return null\n    }\n    return dividendo / divisor\n}\n\nfun main() {\n    val res1 = dividirSeguroConIf(20, 4)\n    println("Resultado 1: $res1")\n\n    val res2 = dividirSeguroConIf(20, 0)\n    println("Resultado 2: $res2")\n}`,
        outputSnippet: `Resultado 1: 5\nAviso preventivo: El divisor no puede ser cero.\nResultado 2: null`,
        byteTip: 'Lanzar y capturar excepciones consume cientos de ciclos de procesador. La validación con if es prácticamente instantánea.',
        pitfallTip: 'No uses try-catch como un sustituto perezoso para no validar tus entradas con if.',
        keyPoints: [
          'Prevenir con if es más rápido y eficiente que capturar excepciones.',
          'Reserva try-catch para eventos externos impredecibles (red, disco, sensores).',
          'La combinación adecuada produce software robusto y veloz.'
        ]
      },
      {
        title: 'try como expresión con valor de retorno',
        explanation: `Al igual que \`if\` y \`when\`, en Kotlin **\`try\` es una expresión** y puede devolver un valor para asignarlo directamente a una variable:`,
        codeSnippet: `fun main() {\n    val entrada = "85"\n    \n    // try devuelve el resultado de la última línea del bloque correspondiente\n    val valorParseado: Int = try {\n        entrada.toInt()\n    } catch (e: NumberFormatException) {\n        0 // Valor por defecto si falla\n    }\n\n    println("Valor final seguro: $valorParseado")\n}`,
        outputSnippet: `Valor final seguro: 85`,
        byteTip: 'try como expresión te permite inicializar constantes val de forma protegida en una sola sentencia.',
        pitfallTip: 'Asegúrate de que tanto el bloque try como el catch devuelvan el mismo tipo de dato.',
        keyPoints: [
          'try como expresión devuelve un valor asignable.',
          'El bloque catch define el valor de contingencia por defecto.',
          'Elimina la necesidad de declarar variables mutables antes del bloque.'
        ]
      }
    ]
  },

  'kotlin-u12-l06': {
    subtitle: 'Pon a prueba tus algoritmos con los tres tipos de escenarios: normales, límite e incorrectos.',
    analogy: 'Probar un ascensor antes de abrir el edificio al público: lo pruebas con 2 personas (caso normal), lo pruebas con exactamente 10 personas que es el límite de peso (caso límite) y pruebas qué pasa si alguien intenta meter un camión (caso incorrecto).',
    sections: [
      {
        title: 'Casos normales, límite e incorrectos (Edge Cases)',
        explanation: `Un programador novato prueba su código solo con el caso ideal (el *"camino feliz"*): si le piden calcular el total de 3 productos a $10, prueba 3 x 10 = 30 y cree que su programa es perfecto.

Un desarrollador profesional prueba sistemáticamente tres tipos de escenarios:
1. **Casos normales:** Entradas típicas del uso diario (ejemplo: comprar 2 boletos a $15).
2. **Casos límite (*Edge Cases*):** Valores en las fronteras de los rangos (ejemplo: comprar 0 boletos, comprar exactamente el stock máximo de 100, o ingresar saldo exactamente igual al precio).
3. **Casos incorrectos o maliciosos:** Entradas absurdas o no válidas (ejemplo: comprar -5 boletos, enviar texto en blanco o números gigantescos).`,
        codeSnippet: `fun calcularCostoEnvio(pesoKg: Double): Double {\n    // Validamos caso incorrecto\n    if (pesoKg <= 0.0) {\n        println("Error: El peso debe ser mayor a cero.")\n        return 0.0\n    }\n    // Caso normal y límite\n    return if (pesoKg <= 5.0) 10.0 else 20.0\n}\n\nfun main() {\n    println("Caso normal (3.5 kg)  : $$\${calcularCostoEnvio(3.5)}")\n    println("Caso límite (5.0 kg)   : $$\${calcularCostoEnvio(5.0)}")\n    println("Caso incorrecto (-2 kg): $$\${calcularCostoEnvio(-2.0)}")\n}`,
        outputSnippet: `Caso normal (3.5 kg)  : $10.0\nCaso límite (5.0 kg)   : $10.0\nError: El peso debe ser mayor a cero.\nCaso incorrecto (-2 kg): $0.0`,
        byteTip: 'La mayoría de los bugs en producción ocurren justamente en los casos límite (valores 0, 1, nulos o listas vacías).',
        pitfallTip: 'No des por sentado que el usuario siempre ingresará datos sensatos. Los usuarios presionan botones al azar.',
        keyPoints: [
          'Probar solo el camino feliz deja vulnerabilidades ocultas.',
          'Los casos límite (fronteras de rangos) son donde más fallan los operadores relacionales.',
          'Manejar entradas incorrectas evita estados corruptos en la aplicación.'
        ]
      },
      {
        title: 'Pruebas de listas vacías y datos nulos',
        explanation: `Uno de los casos límite más famosos en Android es qué pasa cuando la lista de la base de datos viene con 0 elementos:`,
        codeSnippet: `fun obtenerResumenNotificaciones(mensajes: List<String>): String {\n    return when {\n        mensajes.isEmpty() -> "No tienes notificaciones nuevas."\n        mensajes.size == 1 -> "Tienes 1 notificación: \${mensajes[0]}"\n        else -> "Tienes \${mensajes.size} notificaciones pendientes."\n    }\n}\n\nfun main() {\n    println(obtenerResumenNotificaciones(emptyList()))\n    println(obtenerResumenNotificaciones(listOf("Bienvenido a Kotlin")))\n    println(obtenerResumenNotificaciones(listOf("Aviso 1", "Aviso 2")))\n}`,
        outputSnippet: `No tienes notificaciones nuevas.\nTienes 1 notificación: Bienvenido a Kotlin\nTienes 2 notificaciones pendientes.`,
        byteTip: 'emptyList() crea una lista vacía inmutable eficiente.',
        pitfallTip: 'Intentar acceder a lista[0] sin comprobar antes si lista.isNotEmpty() es el error de principiante por excelencia.',
        keyPoints: [
          'Siempre diseña un estado amigable para cuando una lista esté vacía.',
          'Verificar el tamaño de las colecciones antes de operar es una norma de calidad.',
          'La interfaz de usuario en Android debe mostrar vistas vacías (Empty States) elegantes.'
        ]
      }
    ]
  },

  'kotlin-u12-l07': {
    subtitle: 'Compara el resultado esperado frente al obtenido para diseñar pruebas automáticas y confiables.',
    analogy: 'Un control de calidad en una fábrica de balones: el balón esperado debe medir entre 68 y 70 cm de circunferencia. El inspector mide el balón real producido; si coincide, pasa al empaque; si difiere, se rechaza de inmediato.',
    sections: [
      {
        title: 'Resultado esperado vs Resultado obtenido',
        explanation: `El corazón de todas las pruebas en ingeniería de software es muy simple y se basa en contrastar dos magnitudes:

1. **Resultado esperado (*Expected*):** Lo que tú sabes matemáticamente y lógicamente que el programa DEBE dar para una entrada específica.
2. **Resultado obtenido (*Actual*):** Lo que el código real de tu función devolvió en ejecución.

Si **\`Resultado Esperado == Resultado Obtenido\`**, la prueba es exitosa (verde).
Si difieren en lo más mínimo, has cazado un bug y debes investigar la discrepancia.`,
        codeSnippet: `fun calcularDescuentoFidelidad(monto: Double, esVip: Boolean): Double {\n    return if (esVip) monto * 0.20 else 0.0\n}\n\nfun main() {\n    // Escenario de prueba:\n    val entradaMonto = 100.0\n    val entradaEsVip = true\n    val resultadoEsperado = 20.0 // Esperamos $20 de descuento\n\n    val resultadoObtenido = calcularDescuentoFidelidad(entradaMonto, entradaEsVip)\n    \n    println("Esperado: $$resultadoEsperado | Obtenido: $$resultadoObtenido")\n    val pruebaExitosa = (resultadoEsperado == resultadoObtenido)\n    println("¿Prueba de validación aprobada?: $pruebaExitosa")\n}`,
        outputSnippet: `Esperado: $20.0 | Obtenido: $20.0\n¿Prueba de validación aprobada?: true`,
        byteTip: 'En Android profesional se utilizan bibliotecas de pruebas automáticas como JUnit y Truth para automatizar miles de estas comparaciones en segundos.',
        pitfallTip: 'No calcules el resultado esperado usando la misma fórmula de la función; calcúlalo a mano para tener un punto de referencia independiente y objetivo.',
        keyPoints: [
          'La prueba compara el valor esperado contra el valor obtenido.',
          'Una coincidencia exacta confirma el correcto funcionamiento del algoritmo.',
          'Es el fundamento del desarrollo guiado por pruebas (Test-Driven Development / TDD).'
        ]
      },
      {
        title: 'La función assert y require en Kotlin',
        explanation: `Kotlin incluye funciones estándar para validar precondiciones y alertar si un supuesto falla:`,
        codeSnippet: `fun registrarTemperatura(celsius: Double) {\n    // require valida que el argumento cumpla una condición básica\n    require(celsius >= -273.15) { "La temperatura no puede estar por debajo del cero absoluto." }\n    println("Temperatura registrada correctamente: $celsius°C")\n}\n\nfun main() {\n    registrarTemperatura(24.5)\n    // Si llamaras con -300.0, require lanzaría un IllegalArgumentException con el mensaje claro\n}`,
        outputSnippet: `Temperatura registrada correctamente: 24.5°C`,
        byteTip: 'require() es la forma oficial y más expresiva de Kotlin para validar argumentos de entrada al inicio de una función.',
        pitfallTip: 'No dejes que tu código continúe con datos imposibles; detenlo de inmediato con require() antes de que corrompa la memoria.',
        keyPoints: [
          'require() valida precondiciones con mensajes descriptivos automáticos.',
          'Protege las funciones contra llamadas con datos absurdos.',
          'Cierra el ciclo de aprendizaje de Kotlin con prácticas de nivel profesional.'
        ]
      }
    ]
  }
};
