import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_10_THEORY: Record<string, TheoryLesson> = {
  "kotlin-u10-l01": {
    "id": "kt-th-u10-l01",
    "lessonId": "kotlin-u10-l01",
    "pathId": "kotlin",
    "unitId": 10,
    "levelId": 1,
    "title": "1. Diferencia entre clase y objeto",
    "subtitle": "Comprende el paradigma de la Programación Orientada a Objetos: de planos arquitectónicos a objetos reales.",
    "estimatedMinutes": 8,
    "analogy": "El plano arquitectónico de una casa frente a la casa real construida en tu vecindario. Con un solo plano (la Clase), los albañiles pueden construir diez casas reales (los Objetos), cada una con sus propios habitantes y colores de pared.",
    "video": {
      "title": "Programación Orientada a Objetos: Clases y Data Class",
      "channel": "MoureDev by Brais Moure",
      "duration": "55:00",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Constructores, propiedades, métodos, encapsulamiento y el poder de las data classes."
    },
    "sections": [
      {
        "title": "Diferencia entre Clase y Objeto",
        "explanation": "Hasta ahora trabajábamos con tipos simples como `Int`, `String` o `Double`. Pero en el mundo real, los elementos son más complejos: un \"Usuario\" no es solo un nombre, tiene correo, edad, contraseña y rol.\n\nLa **Programación Orientada a Objetos (POO)** te permite crear tus propios tipos de datos personalizados:\n• **Clase (`class`):** Es el **plano, molde o plantilla**. Define qué datos tendrá y qué acciones sabrá hacer ese tipo de elemento. No ocupa memoria real hasta que creas una instancia.\n• **Objeto (Instancia):** Es el **elemento real creado en la memoria** a partir del plano de la clase. Puedes crear cientos de objetos diferentes a partir de una misma clase.",
        "codeSnippet": "// 1. Definimos el molde (Clase)\nclass Auto {\n    var color = \"Blanco\"\n    var velocidad = 0\n}\n\nfun main() {\n    // 2. Creamos dos objetos reales e independientes a partir del molde\n    val auto1 = Auto()\n    val auto2 = Auto()\n\n    auto1.color = \"Rojo\"\n    auto2.color = \"Azul\"\n\n    println(\"Auto 1: ${auto1.color}\")\n    println(\"Auto 2: ${auto2.color}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Auto 1: Rojo\nAuto 2: Azul",
        "byteTip": "En Kotlin, por convención oficial, los nombres de Clases siempre empiezan con Mayúscula (UpperCamelCase), como Usuario, Producto, Pedido.",
        "pitfallTip": "No confundas la clase con el objeto: la clase es la definición abstracta; el objeto es la entidad viva en la memoria.",
        "keyPoints": [
          "La clase es el molde conceptual; el objeto es la instancia viva en memoria.",
          "Cada objeto conserva su propio estado independiente.",
          "La POO permite modelar el software a imagen y semejanza del mundo real."
        ]
      },
      {
        "title": "Modelado en aplicaciones móviles Android",
        "explanation": "En Android, todo se modela con clases: cada pantalla (`MainActivity`), cada botón (`Button`), cada canción (`Track`) y cada usuario (`User`) son clases instanciadas en objetos interactivos:",
        "codeSnippet": "class PerfilUsuario {\n    var nombre = \"\"\n    var seguidores = 0\n}\n\nfun main() {\n    val usuario = PerfilUsuario()\n    usuario.nombre = \"Elena\"\n    usuario.seguidores = 150\n    \n    println(\"Perfil creado: ${usuario.nombre} con ${usuario.seguidores} seguidores.\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Perfil creado: Elena con 150 seguidores.",
        "byteTip": "En Kotlin no necesitas la palabra clave \"new\" para crear un objeto. Solo escribes el nombre de la clase con paréntesis: PerfilUsuario().",
        "pitfallTip": "Crear clases sin constructor inicializador suele requerir asignar valores temporales vacíos. En la lección 3 aprenderás la mejor forma.",
        "keyPoints": [
          "En Kotlin se prescinde de la palabra clave new.",
          "Los objetos representan entidades lógicas del negocio.",
          "La POO estructura aplicaciones de gran escala de manera ordenada."
        ]
      }
    ]
  },
  "kotlin-u10-l02": {
    "id": "kt-th-u10-l02",
    "lessonId": "kotlin-u10-l02",
    "pathId": "kotlin",
    "unitId": 10,
    "levelId": 2,
    "title": "2. Propiedades y estado",
    "subtitle": "Aprende cómo las propiedades guardan las características y el estado interno de cada objeto.",
    "estimatedMinutes": 8,
    "analogy": "La ficha técnica de un smartphone: enumera sus propiedades como marca (Samsung), memoria (128 GB), pantalla (6.5 pulgadas) y porcentaje de batería actual (estado mutable).",
    "video": {
      "title": "Programación Orientada a Objetos: Clases y Data Class",
      "channel": "MoureDev by Brais Moure",
      "duration": "55:00",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Constructores, propiedades, métodos, encapsulamiento y el poder de las data classes."
    },
    "sections": [
      {
        "title": "Propiedades y estado de un objeto",
        "explanation": "Las variables declaradas dentro de una clase se denominan **propiedades** (o atributos). Representan las características y el **estado** del objeto:\n\n• **Propiedades inmutables (`val`):** Características fijas que no cambian tras la creación (ejemplo: el ID único de un producto o la fecha de registro).\n• **Propiedades mutables (`var`):** Estados que evolucionan a lo largo de la vida de la app (ejemplo: el saldo de una cuenta o la posición del jugador).\n\nPara leer o modificar una propiedad usamos la **notación de punto (`.`)**: `objeto.propiedad`.",
        "codeSnippet": "class Telefono {\n    val marca: String = \"Google Pixel\"\n    val modelo: String = \"8 Pro\"\n    var bateria: Int = 100 // Estado mutable\n}\n\nfun main() {\n    val miTelefono = Telefono()\n    println(\"Dispositivo: ${miTelefono.marca} ${miTelefono.modelo}\")\n    println(\"Batería inicial: ${miTelefono.bateria}%\")\n\n    // Usamos el teléfono y el estado cambia\n    miTelefono.bateria -= 25\n    println(\"Batería tras uso: ${miTelefono.bateria}%\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Dispositivo: Google Pixel 8 Pro\nBatería inicial: 100%\nBatería tras uso: 75%",
        "byteTip": "Kotlin genera automáticamente los métodos getter y setter de tus propiedades tras bambalinas, ahorrándote decenas de líneas de código aburrido.",
        "pitfallTip": "Si declaras una propiedad con val, Kotlin impedirá que la reasignes con miTelefono.marca = \"Otra\", garantizando la inmutabilidad.",
        "keyPoints": [
          "Las propiedades definen los atributos y el estado de un objeto.",
          "val protege propiedades fijas; var permite cambios de estado controlados.",
          "La notación de punto objeto.propiedad permite acceder a sus valores."
        ]
      },
      {
        "title": "Inmutabilidad de propiedades recomendada",
        "explanation": "Al igual que con variables locales, la guía oficial de Android recomienda que la gran mayoría de propiedades de tus clases sean `val`. Esto hace que los datos viajen de forma segura entre pantallas:",
        "codeSnippet": "class TarjetaBancaria {\n    val ultimosCuatroDigitos: String = \"4589\"\n    val titular: String = \"Carlos Mendoza\"\n    val mesExpiracion: Int = 11\n    val anioExpiracion: Int = 2028\n}\n\nfun main() {\n    val tarjeta = TarjetaBancaria()\n    println(\"Tarjeta de ${tarjeta.titular}: **** ${tarjeta.ultimosCuatroDigitos} (Expira: ${tarjeta.mesExpiracion}/${tarjeta.anioExpiracion})\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Tarjeta de Carlos Mendoza: **** 4589 (Expira: 11/2028)",
        "byteTip": "Una clase compuesta solo de propiedades val es inmutable y extremadamente segura contra bugs concurrentes.",
        "pitfallTip": "No uses var para datos que nunca deberían cambiar una vez emitidos.",
        "keyPoints": [
          "Las clases inmutables son el estándar preferido en Android moderno.",
          "Eliminan el riesgo de que otra parte del código altere datos de lectura.",
          "Facilitan enormemente la depuración y auditoría de la app."
        ]
      }
    ]
  },
  "kotlin-u10-l03": {
    "id": "kt-th-u10-l03",
    "lessonId": "kotlin-u10-l03",
    "pathId": "kotlin",
    "unitId": 10,
    "levelId": 3,
    "title": "3. Constructores e inicialización",
    "subtitle": "Inicializa objetos al momento de su nacimiento usando el elegante constructor primario de Kotlin.",
    "estimatedMinutes": 8,
    "analogy": "El acta de nacimiento de una persona: en el momento exacto en que nace, se le asigna su nombre, fecha y lugar de origen. No nace como una persona \"en blanco\" para rellenarle los datos horas después.",
    "video": {
      "title": "Programación Orientada a Objetos: Clases y Data Class",
      "channel": "MoureDev by Brais Moure",
      "duration": "55:00",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Constructores, propiedades, métodos, encapsulamiento y el poder de las data classes."
    },
    "sections": [
      {
        "title": "Constructores primarios en Kotlin",
        "explanation": "En lenguajes antiguos como Java, para inicializar un objeto tenías que escribir un método constructor largo y repetir los nombres de los campos tres o cuatro veces.\n\nKotlin simplifica esto de forma magistral con el **constructor primario**:\nDeclaras las propiedades directamente dentro de los paréntesis al lado del nombre de la clase:\n`class Usuario(val nombre: String, val email: String, var edad: Int)`\n\nCon esa sola línea, Kotlin:\n1. Crea las propiedades `nombre`, `email` y `edad`.\n2. Obliga a que al crear el objeto se envíen esos datos obligatorios.\n3. Asigna los valores automáticamente a cada propiedad.",
        "codeSnippet": "// Clase compacta con constructor primario de una sola línea\nclass Estudiante(val nombre: String, val carrera: String, var promedio: Double)\n\nfun main() {\n    // Creamos objetos enviando sus valores iniciales directamente\n    val est1 = Estudiante(\"Valeria\", \"Ingeniería de Software\", 9.4)\n    val est2 = Estudiante(\"Mateo\", \"Sistemas\", 8.9)\n\n    println(\"Estudiante 1: ${est1.nombre} | Carrera: ${est1.carrera} | Promedio: ${est1.promedio}\")\n    println(\"Estudiante 2: ${est2.nombre} | Carrera: ${est2.carrera} | Promedio: ${est2.promedio}\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Estudiante 1: Valeria | Carrera: Ingeniería de Software | Promedio: 9.4\nEstudiante 2: Mateo | Carrera: Sistemas | Promedio: 8.9",
        "byteTip": "No olvides colocar val o var antes del nombre de cada parámetro en el constructor primario para que se convierta en una propiedad accesible de la clase.",
        "pitfallTip": "Si omites val o var en el constructor: class Persona(nombre: String), nombre será solo un parámetro temporal de inicialización y no podrás consultarlo con persona.nombre.",
        "keyPoints": [
          "El constructor primario se declara junto al nombre de la clase class Nombre(...)",
          "Anteponer val o var convierte los parámetros en propiedades accesibles.",
          "Garantiza que ningún objeto nazca con datos incompletos o inválidos."
        ]
      },
      {
        "title": "Parámetros por defecto en constructores",
        "explanation": "Al igual que en las funciones, los constructores primarios admiten valores predeterminados:",
        "codeSnippet": "class Producto(\n    val nombre: String,\n    val precio: Double,\n    val enStock: Boolean = true // Valor predeterminado\n)\n\nfun main() {\n    val p1 = Producto(\"Teclado Mecánico\", 89.99)\n    val p2 = Producto(\"Monitor Agotado\", 299.0, enStock = false)\n\n    println(\"Producto 1: ${p1.nombre} (¿En stock?: ${p1.enStock})\")\n    println(\"Producto 2: ${p2.nombre} (¿En stock?: ${p2.enStock})\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Producto 1: Teclado Mecánico (¿En stock?: true)\nProducto 2: Monitor Agotado (¿En stock?: false)",
        "byteTip": "Los constructores con valores por defecto eliminan la necesidad de escribir constructores secundarios sobrecargados.",
        "pitfallTip": "Coloca siempre los parámetros con valores por defecto al final de la lista del constructor.",
        "keyPoints": [
          "Los valores por defecto hacen opcionales ciertos atributos al instanciar.",
          "Permiten que una sola clase cubra casos de uso simples y avanzados.",
          "Es la técnica oficial usada para configurar modelos de datos en Android."
        ]
      }
    ]
  },
  "kotlin-u10-l04": {
    "id": "kt-th-u10-l04",
    "lessonId": "kotlin-u10-l04",
    "pathId": "kotlin",
    "unitId": 10,
    "levelId": 4,
    "title": "4. Métodos",
    "subtitle": "Agrega comportamiento a tus clases mediante funciones internas llamadas métodos.",
    "estimatedMinutes": 8,
    "analogy": "Un perro no solo tiene propiedades físicas (raza, color, peso), también tiene comportamientos: ladra, corre y come. Los métodos son las acciones que un objeto sabe realizar.",
    "video": {
      "title": "Programación Orientada a Objetos: Clases y Data Class",
      "channel": "MoureDev by Brais Moure",
      "duration": "55:00",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Constructores, propiedades, métodos, encapsulamiento y el poder de las data classes."
    },
    "sections": [
      {
        "title": "Métodos: el comportamiento de un objeto",
        "explanation": "Las funciones declaradas dentro de una clase se denominan **métodos**. Definen las acciones que los objetos de esa clase son capaces de realizar.\n\nLa magia de los métodos es que tienen acceso directo a todas las propiedades internas del objeto sin necesidad de pasárselas como parámetros.\n\nPara invocar un método, usamos la notación de punto: `objeto.metodo()`.",
        "codeSnippet": "class CuentaBancaria(val titular: String, var saldo: Double) {\n    \n    // Método que deposita dinero\n    fun depositar(monto: Double) {\n        saldo += monto\n        println(\"+$monto depositado con éxito en cuenta de $titular.\")\n    }\n\n    // Método que consulta el estado\n    fun mostrarEstado() {\n        println(\"Cuenta de $titular | Saldo actual: $$saldo\")\n    }\n}\n\nfun main() {\n    val cuenta = CuentaBancaria(\"Camila Gómez\", 500.0)\n    cuenta.mostrarEstado()\n\n    cuenta.depositar(250.0)\n    cuenta.mostrarEstado()\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Cuenta de Camila Gómez | Saldo actual: $500.0\n+250.0 depositado con éxito en cuenta de Camila Gómez.\nCuenta de Camila Gómez | Saldo actual: $750.0",
        "byteTip": "Los métodos modifican el estado interno de forma segura aplicando las reglas del negocio antes de cambiar las variables.",
        "pitfallTip": "No uses variables globales dentro de los métodos; opera siempre con las propiedades propias de la clase.",
        "keyPoints": [
          "Un método es una función que pertenece a una clase.",
          "Tiene acceso automático a las propiedades de la instancia.",
          "Encapsula la lógica de negocio y las operaciones sobre los datos."
        ]
      },
      {
        "title": "Validación de reglas de negocio en métodos",
        "explanation": "Mira cómo un método de retiro protege la cuenta para evitar que el saldo quede en números negativos:",
        "codeSnippet": "class Billetera(var fondos: Double) {\n    fun retirar(monto: Double): Boolean {\n        return if (monto <= fondos) {\n            fondos -= monto\n            println(\"Retiro de $$monto aprobado. Fondos restantes: $$fondos\")\n            true\n        } else {\n            println(\"Operación denegada: Fondos insuficientes para retirar $$monto\")\n            false\n        }\n    }\n}\n\nfun main() {\n    val billetera = Billetera(100.0)\n    billetera.retirar(40.0)  // Exitoso\n    billetera.retirar(80.0)  // Denegado\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Retiro de $40.0 aprobado. Fondos restantes: $60.0\nOperación denegada: Fondos insuficientes para retirar $80.0",
        "byteTip": "Hacer que un método devuelva Boolean permite al código exterior saber si la operación tuvo éxito.",
        "pitfallTip": "Evita modificar propiedades directamente desde afuera de la clase si existe un método que valida la operación.",
        "keyPoints": [
          "Los métodos protegen la integridad de los datos internos.",
          "Centralizan las reglas de validación en un solo lugar.",
          "Mejoran la seguridad y previsibilidad del software."
        ]
      }
    ]
  },
  "kotlin-u10-l05": {
    "id": "kt-th-u10-l05",
    "lessonId": "kotlin-u10-l05",
    "pathId": "kotlin",
    "unitId": 10,
    "levelId": 5,
    "title": "5. Crear y usar varias instancias",
    "subtitle": "Crea múltiples instancias independientes a partir de una misma clase y gestiona su ciclo de vida.",
    "estimatedMinutes": 8,
    "analogy": "Una fábrica de galletas: el mismo molde de estrella produce cientos de galletas idénticas de masa; pero una galleta se decora con glaseado azul y otra con chispas de chocolate. Cada galleta es una instancia independiente.",
    "video": {
      "title": "Programación Orientada a Objetos: Clases y Data Class",
      "channel": "MoureDev by Brais Moure",
      "duration": "55:00",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Constructores, propiedades, métodos, encapsulamiento y el poder de las data classes."
    },
    "sections": [
      {
        "title": "Creación y uso de varias instancias",
        "explanation": "Una de las mayores virtudes de la POO es que escribes el plano de la clase una sola vez, y luego puedes instanciar tantos objetos como requiera tu aplicación:\n• Cada objeto tiene su propia copia de las propiedades en la memoria RAM.\n• Si modificas las propiedades del objeto A, las del objeto B no se ven afectadas en lo más mínimo.\n• Ambos comparten los mismos métodos y comportamientos.",
        "codeSnippet": "class Jugador(val apodo: String, var nivel: Int = 1) {\n    fun subirNivel() {\n        nivel++\n        println(\"¡$apodo ha subido al nivel $nivel!\")\n    }\n}\n\nfun main() {\n    val jugador1 = Jugador(\"ShadowNinja\")\n    val jugador2 = Jugador(\"Valkyrie\", nivel = 5)\n\n    println(\"Estado inicial: ${jugador1.apodo} (Nivel ${jugador1.nivel}) frente a ${jugador2.apodo} (Nivel ${jugador2.nivel})\")\n\n    // Subimos de nivel solo al jugador 1\n    jugador1.subirNivel()\n\n    println(\"Nivel final de ${jugador1.apodo}: ${jugador1.nivel}\")\n    println(\"Nivel final de ${jugador2.apodo}: ${jugador2.nivel} (intacto)\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Estado inicial: ShadowNinja (Nivel 1) frente a Valkyrie (Nivel 5)\n¡ShadowNinja ha subido al nivel 2!\nNivel final de ShadowNinja: 2\nNivel final de Valkyrie: 5 (intacto)",
        "byteTip": "Cada objeto tiene su propia identidad en memoria. Puedes comparar si dos referencias apuntan al mismo objeto físico con === (triple igual).",
        "pitfallTip": "No confundas dos objetos con los mismos datos con ser el mismo objeto en memoria.",
        "keyPoints": [
          "Una clase puede dar vida a infinitas instancias independientes.",
          "Cada instancia preserva su propio estado en la memoria.",
          "Modificar un objeto jamás altera el estado de los demás."
        ]
      },
      {
        "title": "Interacción entre múltiples objetos",
        "explanation": "Los objetos pueden colaborar entre sí para resolver tareas complejas:",
        "codeSnippet": "class Mensaje(val remitente: String, val contenido: String)\n\nclass ChatRoom(val nombreSala: String) {\n    fun publicar(mensaje: Mensaje) {\n        println(\"[$nombreSala] ${mensaje.remitente}: ${mensaje.contenido}\")\n    }\n}\n\nfun main() {\n    val sala = ChatRoom(\"Android Developers\")\n    val msg1 = Mensaje(\"Sofía\", \"¡Hola a todos!\")\n    val msg2 = Mensaje(\"Diego\", \"¡Hola Sofía! ¿Cómo va Kotlin?\")\n\n    sala.publicar(msg1)\n    sala.publicar(msg2)\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "[Android Developers] Sofía: ¡Hola a todos!\n[Android Developers] Diego: ¡Hola Sofía! ¿Cómo va Kotlin?",
        "byteTip": "Pasar objetos como parámetros de métodos es la base de la colaboración orientada a objetos.",
        "pitfallTip": "Evita dependencias circulares donde el objeto A no puede vivir sin B y B no puede vivir sin A.",
        "keyPoints": [
          "Los objetos colaboran pasándose referencias como parámetros.",
          "Este desacoplamiento modular es la clave de la escalabilidad.",
          "Permite construir sistemas complejos mediante piezas simples y bien ensambladas."
        ]
      }
    ]
  },
  "kotlin-u10-l06": {
    "id": "kt-th-u10-l06",
    "lessonId": "kotlin-u10-l06",
    "pathId": "kotlin",
    "unitId": 10,
    "levelId": 6,
    "title": "6. Encapsulación básica con private",
    "subtitle": "Protege tus datos internos y oculta detalles delicados usando el modificador de visibilidad private.",
    "estimatedMinutes": 8,
    "analogy": "El motor de un automóvil: está cubierto por el capó cerrado (private). Tú como conductor interactúas con el pedal del acelerador y el volante (public), sin necesidad de tocar los pistones ni el cableado interno directamente con las manos.",
    "video": {
      "title": "Programación Orientada a Objetos: Clases y Data Class",
      "channel": "MoureDev by Brais Moure",
      "duration": "55:00",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Constructores, propiedades, métodos, encapsulamiento y el poder de las data classes."
    },
    "sections": [
      {
        "title": "Encapsulación con private",
        "explanation": "La **encapsulación** es uno de los cuatro pilares fundamentales de la POO. Consiste en ocultar los detalles internos y delicados de un objeto para que nadie desde afuera pueda corromperlos por accidente.\n\nKotlin ofrece modificadores de visibilidad:\n• **`public` (Predeterminado):** La propiedad o método puede ser leída y llamada desde cualquier parte del programa.\n• **`private` (Privado):** La propiedad o método **solo puede verse y usarse dentro de la propia clase**. Nadie desde afuera puede tocarla directamente.",
        "codeSnippet": "class CajeroAutomatico(private var dineroDisponible: Double) {\n    \n    // Método público que controla el acceso de forma segura\n    fun retirarDinero(monto: Double): Boolean {\n        return if (monto <= dineroDisponible) {\n            dineroDisponible -= monto\n            println(\"Dispensando $$monto en billetes...\")\n            true\n        } else {\n            println(\"Error: El cajero no dispone de efectivo suficiente.\")\n            false\n        }\n    }\n\n    // Método público de consulta\n    fun consultarEstado() {\n        println(\"Cajero operativo.\")\n    }\n}\n\nfun main() {\n    val cajero = CajeroAutomatico(1000.0)\n    cajero.retirarDinero(300.0)\n    \n    // cajero.dineroDisponible = 0.0 -> ¡ERROR de compilación! Es private y está protegido\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Dispensando $300.0 en billetes...",
        "byteTip": "Declara todo como private por defecto, y abre a public solo lo que el exterior realmente necesite invocar.",
        "pitfallTip": "Dejar propiedades mutables como public permite que cualquier parte del código las altere sin pasar por tus validaciones.",
        "keyPoints": [
          "private restringe el acceso exclusivamente al interior de la clase.",
          "Protege la integridad de los datos contra modificaciones arbitrarias.",
          "Expone una interfaz pública limpia y segura para el exterior."
        ]
      },
      {
        "title": "Métodos privados auxiliares",
        "explanation": "También puedes crear métodos `private` para realizar cálculos internos intermedios sin exponerlos al exterior:",
        "codeSnippet": "class ValidadorSeguridad {\n    fun autorizarAcceso(token: String): Boolean {\n        return validarFormato(token) && verificarFirma(token)\n    }\n\n    private fun validarFormato(t: String) = t.startsWith(\"SEC_\")\n    private fun verificarFirma(t: String) = t.length >= 10\n}\n\nfun main() {\n    val validador = ValidadorSeguridad()\n    val autorizado = validador.autorizarAcceso(\"SEC_TOKEN99\")\n    println(\"¿Token autorizado?: $autorizado\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "¿Token autorizado?: true",
        "byteTip": "Los métodos privados ayudan a descomponer funciones grandes en pasos pequeños sin contaminar el autocompletado del IDE.",
        "pitfallTip": "No expongas métodos internos que solo tienen sentido dentro de la secuencia de la clase.",
        "keyPoints": [
          "Los métodos privados dividen tareas complejas internamente.",
          "Mantienen la API pública del objeto limpia y enfocada.",
          "Aseguran que las reglas críticas no sean esquivadas desde afuera."
        ]
      }
    ]
  },
  "kotlin-u10-l07": {
    "id": "kt-th-u10-l07",
    "lessonId": "kotlin-u10-l07",
    "pathId": "kotlin",
    "unitId": 10,
    "levelId": 7,
    "title": "7. data class",
    "subtitle": "Descubre las data class, la joya de la corona de Kotlin para modelar datos inmutables con .copy(), equals y toString automáticos.",
    "estimatedMinutes": 8,
    "analogy": "Un documento de identidad oficial laminado: su único propósito es contener datos de forma confiable, es fácil de imprimir completo (toString), fácil de comparar con otro (equals) y si necesitas una versión actualizada, le sacas una copia cambiando solo lo que cambió (.copy()).",
    "video": {
      "title": "Programación Orientada a Objetos: Clases y Data Class",
      "channel": "MoureDev by Brais Moure",
      "duration": "55:00",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Constructores, propiedades, métodos, encapsulamiento y el poder de las data classes."
    },
    "sections": [
      {
        "title": "El superpoder de las data class",
        "explanation": "En cualquier aplicación pasas la mayor parte del tiempo transportando datos: respuestas de internet, registros de base de datos, perfiles de usuario.\n\nEn Java, una clase para guardar datos requería más de 50 líneas de código tedioso (getters, setters, equals, hashCode, toString y constructores).\nEn Kotlin, simplemente antepones la palabra clave **`data`**:\n`data class Usuario(val id: Int, val nombre: String, val email: String)`\n\nCon solo esa palabra, Kotlin genera automáticamente:\n• **`toString()` legible:** `Usuario(id=1, nombre=Ana, email=...)` en vez de direcciones raras de memoria.\n• **`equals()` y `==` automático:** Compara por el contenido real de los datos.\n• **Función `.copy()`:** Para crear copias modificando solo las propiedades que elijas.",
        "codeSnippet": "// Una data class profesional en una sola línea\ndata class Producto(val id: Int, val nombre: String, val precio: Double)\n\nfun main() {\n    val prod1 = Producto(101, \"Mouse Gamer\", 39.99)\n    val prod2 = Producto(101, \"Mouse Gamer\", 39.99)\n\n    // 1. toString automático hermoso\n    println(\"Impresión directa: $prod1\")\n\n    // 2. equals automático por contenido\n    println(\"¿prod1 es idéntico en contenido a prod2?: ${prod1 == prod2}\")\n\n    // 3. El método .copy() para crear una variante inmutable\n    val prodConDescuento = prod1.copy(precio = 29.99)\n    println(\"Producto con descuento vía .copy(): $prodConDescuento\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Impresión directa: Producto(id=101, nombre=Mouse Gamer, precio=39.99)\n¿prod1 es idéntico en contenido a prod2?: true\nProducto con descuento vía .copy(): Producto(id=101, nombre=Mouse Gamer, precio=29.99)",
        "byteTip": "En el desarrollo moderno para Android con Jetpack Compose y Clean Architecture, casi todos tus modelos de datos serán data classes inmutables.",
        "pitfallTip": "Una data class debe tener al menos un parámetro en su constructor primario y todos deben marcarse obligatoriamente con val o var.",
        "keyPoints": [
          "data class genera toString(), equals(), hashCode() y copy() automáticamente.",
          "Elimina cientos de líneas de código repetitivo de golpe.",
          "Es el estándar oficial de Android para representar modelos de datos."
        ]
      },
      {
        "title": "Inmutabilidad elegante con .copy()",
        "explanation": "El método `.copy()` es la clave para mantener tus datos inmutables (`val`) sin volverte loco cuando un dato cambia en la interfaz.\n\nEn lugar de modificar un objeto mutable, sacas una copia con el dato actualizado:",
        "codeSnippet": "data class EstadoPantalla(\n    val cargando: Boolean = false,\n    val mensaje: String = \"\",\n    val contadorNotificaciones: Int = 0\n)\n\nfun main() {\n    val estadoInicial = EstadoPantalla(cargando = true, mensaje = \"Conectando...\")\n    println(\"Estado 1: $estadoInicial\")\n\n    // Llegan los datos: creamos el nuevo estado con .copy()\n    val estadoListo = estadoInicial.copy(\n        cargando = false,\n        mensaje = \"Datos sincronizados con éxito\",\n        contadorNotificaciones = 5\n    )\n    println(\"Estado 2: $estadoListo\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "Estado 1: EstadoPantalla(cargando=true, mensaje=Conectando..., contadorNotificaciones=0)\nEstado 2: EstadoPantalla(cargando=false, mensaje=Datos sincronizados con éxito, contadorNotificaciones=5)",
        "byteTip": "Este patrón es exactamente la base de cómo funciona el patrón MVI / StateFlow en las aplicaciones profesionales para Android.",
        "pitfallTip": "No uses data class para clases que tengan lógica compleja de herencia; están diseñadas para transportar datos puros.",
        "keyPoints": [
          ".copy() permite clonar objetos alterando solo las propiedades deseadas.",
          "Fomenta el flujo unidireccional de datos en la arquitectura de apps.",
          "Hace que los estados de la interfaz sean predecibles y fáciles de probar."
        ]
      }
    ]
  },
  "kotlin-u10-l08": {
    "id": "kt-th-u10-l08",
    "lessonId": "kotlin-u10-l08",
    "pathId": "kotlin",
    "unitId": 10,
    "levelId": 8,
    "title": "8. Colecciones de objetos",
    "subtitle": "Modela sistemas completos combinando data classes con colecciones de objetos.",
    "estimatedMinutes": 8,
    "analogy": "La libreta de calificaciones de una universidad: cada renglón es un objeto Alumno completo (nombre, cédula, carrera, notas) y la libreta entera es una lista de alumnos que puedes ordenar y filtrar.",
    "video": {
      "title": "Programación Orientada a Objetos: Clases y Data Class",
      "channel": "MoureDev by Brais Moure",
      "duration": "55:00",
      "url": "https://www.youtube.com/watch?v=k9A3m1s_u6A",
      "summary": "Constructores, propiedades, métodos, encapsulamiento y el poder de las data classes."
    },
    "sections": [
      {
        "title": "Colecciones de objetos en el mundo real",
        "explanation": "La verdadera potencia de la programación moderna surge cuando juntas las **colecciones** (`List`, `Map`) con tus **clases personalizadas** (`data class`).\n\nEn cualquier app de comercio electrónico, el feed no es una lista de números, sino una `List<Producto>`. Cada elemento de la lista es un objeto con título, precio, calificación y foto.",
        "codeSnippet": "data class Contacto(val nombre: String, val telefono: String, val esFavorito: Boolean)\n\nfun main() {\n    val agenda = listOf(\n        Contacto(\"Sofía Morales\", \"+506 8888-1111\", esFavorito = true),\n        Contacto(\"Mateo Díaz\", \"+506 8888-2222\", esFavorito = false),\n        Contacto(\"Camila Gómez\", \"+506 8888-3333\", esFavorito = true)\n    )\n\n    println(\"=== CONTACTOS FAVORITOS ===\")\n    for (contacto in agenda) {\n        if (contacto.esFavorito) {\n            println(\"⭐ ${contacto.nombre} (${contacto.telefono})\")\n        }\n    }\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "=== CONTACTOS FAVORITOS ===\n⭐ Sofía Morales (+506 8888-1111)\n⭐ Camila Gómez (+506 8888-3333)",
        "byteTip": "En el siguiente módulo aprenderás a filtrar estas listas en una sola línea usando lambdas y .filter().",
        "pitfallTip": "Evita tener listas separadas de nombres y de teléfonos; agrúpalos siempre en una clase para no perder la coherencia de datos.",
        "keyPoints": [
          "List<MiClase> modela catálogos, feeds de redes sociales y registros de bases de datos.",
          "Cada objeto conserva su propia identidad y propiedades dentro de la lista.",
          "Es la estructura de datos sobre la que operan las pantallas de Android."
        ]
      },
      {
        "title": "Cálculos de totales sobre listas de objetos",
        "explanation": "Mira cómo calcular el costo total de un carrito de compras que contiene varios productos:",
        "codeSnippet": "data class ItemCarrito(val titulo: String, val cantidad: Int, val precioUnitario: Double)\n\nfun main() {\n    val carrito = listOf(\n        ItemCarrito(\"Café Tostado\", 2, 7.50),\n        ItemCarrito(\"Taza Cerámica\", 1, 12.00),\n        ItemCarrito(\"Galletas Avena\", 3, 2.50)\n    )\n\n    var granTotal = 0.0\n    for (item in carrito) {\n        val subtotalItem = item.cantidad * item.precioUnitario\n        granTotal += subtotalItem\n        println(\"• ${item.cantidad}x ${item.titulo} = $$subtotalItem\")\n    }\n\n    println(\"----------------------------\")\n    println(\"Total final a pagar: $$granTotal\")\n}",
        "codeLanguage": "kotlin",
        "outputSnippet": "• 2x Café Tostado = $15.0\n• 1x Taza Cerámica = $12.0\n• 3x Galletas Avena = $7.5\n----------------------------\nTotal final a pagar: $34.5",
        "byteTip": "Modelar cada línea de compra con su propia clase hace que el cálculo sea transparente y fácil de auditar.",
        "pitfallTip": "Verifica que la lista de items no esté vacía antes de procesar pagos en sistemas reales.",
        "keyPoints": [
          "Agrupar datos en clases facilita cálculos acumulados sobre colecciones.",
          "Representa con exactitud los carritos de compra del comercio electrónico.",
          "Prepara el terreno para el paradigma de programación funcional en Kotlin."
        ]
      }
    ]
  }
};
