import { TheoryLesson } from '../../../types/theory';

export const KOTLIN_UNIT_02_THEORY: Record<string, TheoryLesson> = {
  'kotlin-u02-l01': {
    id: 'kt-th-u02-l01',
    lessonId: 'kotlin-u02-l01',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 1,
    title: '1. Inmutabilidad con val',
    subtitle: 'Variables de solo lectura que garantizan la integridad de los datos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '1. Inmutabilidad con val',
        explanation: 'val define variables inmutables que no pueden ser reasignadas.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val x = 10",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l02': {
    id: 'kt-th-u02-l02',
    lessonId: 'kotlin-u02-l02',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 2,
    title: '2. Mutabilidad con var',
    subtitle: 'Variables reasignables para contadores, acumuladores y estados dinámicos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '2. Mutabilidad con var',
        explanation: 'var permite reasignar el valor siempre que conserve el mismo tipo.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "var vidas = 3\nvidas = 2",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l03': {
    id: 'kt-th-u02-l03',
    lessonId: 'kotlin-u02-l03',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 3,
    title: '3. El Tipo Entero: Int',
    subtitle: 'Números enteros de 32 bits, límites numéricos y operaciones exactas.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '3. El Tipo Entero: Int',
        explanation: 'Int abarca desde -2,147,483,648 hasta 2,147,483,647 sin decimales.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val edad: Int = 25",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l04': {
    id: 'kt-th-u02-l04',
    lessonId: 'kotlin-u02-l04',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 4,
    title: '4. Decimales: Double y Float',
    subtitle: 'Precisión de punto flotante de 64 bits y el sufijo f obligatorio en Float.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '4. Decimales: Double y Float',
        explanation: 'Double es la precisión estándar por defecto; Float requiere f.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val precio = 19.99\nval f = 19.99f",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l05': {
    id: 'kt-th-u02-l05',
    lessonId: 'kotlin-u02-l05',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 5,
    title: '5. El Tipo Booleano: Boolean',
    subtitle: 'Banderas lógicas con valores verdaderos (true) o falsos (false).',
    estimatedMinutes: 3,
    sections: [
      {
        title: '5. El Tipo Booleano: Boolean',
        explanation: 'Boolean representa estados binarios para control de flujo.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val activo: Boolean = true",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l06': {
    id: 'kt-th-u02-l06',
    lessonId: 'kotlin-u02-l06',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 6,
    title: '6. Caracteres Únicos: Char',
    subtitle: 'Caracteres Unicode individuales encerrados estrictamente en comillas simples.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '6. Caracteres Únicos: Char',
        explanation: "Char almacena un solo símbolo entre comillas simples (' ').. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.",
        codeSnippet: "val letra: Char = 'A'",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l07': {
    id: 'kt-th-u02-l07',
    lessonId: 'kotlin-u02-l07',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 7,
    title: '7. Cadenas de Texto: String',
    subtitle: 'Secuencias inmutables de texto, comillas dobles y la propiedad .length.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '7. Cadenas de Texto: String',
        explanation: 'String representa secuencias de caracteres con métodos de inspección.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val msg = \"Hola\"\nprintln(msg.length)",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l08': {
    id: 'kt-th-u02-l08',
    lessonId: 'kotlin-u02-l08',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 8,
    title: '8. Inferencia de Tipos',
    subtitle: 'Cómo el compilador de Kotlin deduce el tipo exacto sin necesidad de anotarlo.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '8. Inferencia de Tipos',
        explanation: 'El compilador deduce el tipo analizando el valor asignado a la derecha.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val x = 42 // Deducido como Int",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l09': {
    id: 'kt-th-u02-l09',
    lessonId: 'kotlin-u02-l09',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 9,
    title: '9. Declaración Explícita de Tipos',
    subtitle: 'Sintaxis estricta con dos puntos (: Int, : String) para contratos de código claros.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '9. Declaración Explícita de Tipos',
        explanation: 'Especificar el tipo explícitamente clarifica la API y previene errores.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val saldo: Double = 100.0",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l10': {
    id: 'kt-th-u02-l10',
    lessonId: 'kotlin-u02-l10',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 10,
    title: '10. Conversión Numérica Explícita',
    subtitle: 'Uso de .toInt(), .toDouble() y .toLong() para conversiones seguras sin casts implícitos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '10. Conversión Numérica Explícita',
        explanation: 'Kotlin no realiza conversiones automáticas entre tipos numéricos.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val a = 5\nval b = a.toDouble()",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l11': {
    id: 'kt-th-u02-l11',
    lessonId: 'kotlin-u02-l11',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 11,
    title: '11. String Templates con $variable',
    subtitle: 'Interpolación directa de identificadores en cadenas de texto.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '11. String Templates con $variable',
        explanation: 'El prefijo $ inserta el valor de la variable directamente en el texto.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val n = \"Ana\"\nprintln(\"Hola $n\")",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l12': {
    id: 'kt-th-u02-l12',
    lessonId: 'kotlin-u02-l12',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 12,
    title: '12. Expresiones en Plantillas con ${...}',
    subtitle: 'Evaluación de cálculos, métodos y transformaciones dentro de un String.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '12. Expresiones en Plantillas con ${...}',
        explanation: '${ } evalúa cualquier expresión compleja dentro del string.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "println(\"Total: ${10 + 5}\")",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l13': {
    id: 'kt-th-u02-l13',
    lessonId: 'kotlin-u02-l13',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 13,
    title: '13. Métodos Esenciales de String',
    subtitle: 'Transformaciones de texto con .uppercase(), .lowercase(), .trim() y .replace().',
    estimatedMinutes: 3,
    sections: [
      {
        title: '13. Métodos Esenciales de String',
        explanation: 'Los métodos de String devuelven nuevas cadenas sin alterar la original.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val s = \"dev\".uppercase()",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l14': {
    id: 'kt-th-u02-l14',
    lessonId: 'kotlin-u02-l14',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 14,
    title: '14. Strings Multilínea con """',
    subtitle: 'Bloques de texto con saltos de línea preservados y .trimIndent().',
    estimatedMinutes: 3,
    sections: [
      {
        title: '14. Strings Multilínea con """',
        explanation: 'Triple comilla preserva párrafos y formatos sin caracteres de escape.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val sql = \"\"\"SELECT * FROM tabla\"\"\".trimIndent()",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l15': {
    id: 'kt-th-u02-l15',
    lessonId: 'kotlin-u02-l15',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 15,
    title: '15. Variables no Inicializadas',
    subtitle: 'Protección del compilador contra la lectura de memoria basura.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '15. Variables no Inicializadas',
        explanation: 'Kotlin exige inicializar variables antes de acceder a su valor.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "var x: Int\nx = 10\nprintln(x)",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l16': {
    id: 'kt-th-u02-l16',
    lessonId: 'kotlin-u02-l16',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 16,
    title: '16. Constantes de Compilación (const val)',
    subtitle: 'Valores inmutables evaluados antes del tiempo de ejecución a nivel superior.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '16. Constantes de Compilación (const val)',
        explanation: 'const val se sustituye en tiempo de compilación y solo admite primitivos.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "const val MAX = 100",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l17': {
    id: 'kt-th-u02-l17',
    lessonId: 'kotlin-u02-l17',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 17,
    title: '17. Desbordamiento de Enteros (Overflow)',
    subtitle: 'Qué ocurre al superar Int.MAX_VALUE y cómo detectarlo.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '17. Desbordamiento de Enteros (Overflow)',
        explanation: 'Superar el límite máximo de un entero provoca ciclo al valor negativo.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val max = Int.MAX_VALUE",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l18': {
    id: 'kt-th-u02-l18',
    lessonId: 'kotlin-u02-l18',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 18,
    title: '18. Tipos Numéricos Especiales: Long y Byte',
    subtitle: 'El sufijo L para enteros de 64 bits y ahorro de memoria con Byte (8 bits).',
    estimatedMinutes: 3,
    sections: [
      {
        title: '18. Tipos Numéricos Especiales: Long y Byte',
        explanation: 'Long requiere el sufijo L y Byte almacena valores entre -128 y 127.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val big = 5000000000L",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l19': {
    id: 'kt-th-u02-l19',
    lessonId: 'kotlin-u02-l19',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 19,
    title: '19. Proyecto: Estado de un Personaje',
    subtitle: 'Diseño del modelo de datos para un jugador: vida, nivel, nombre y estado activo.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '19. Proyecto: Estado de un Personaje',
        explanation: 'Combinación armónica de val, var, tipos primitivos y Strings.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val heroe = \"Link\"\nvar hp = 100",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
  'kotlin-u02-l20': {
    id: 'kt-th-u02-l20',
    lessonId: 'kotlin-u02-l20',
    pathId: 'kotlin',
    unitId: 2,
    levelId: 20,
    title: '20. Desafío de Maestría: Variables y Tipos',
    subtitle: 'Evaluación integral sin pistas de todos los conceptos de tipos de datos.',
    estimatedMinutes: 3,
    sections: [
      {
        title: '20. Desafío de Maestría: Variables y Tipos',
        explanation: 'Demostración de dominio completo de variables y tipos en Kotlin.. En Kotlin, el sistema de tipos estático y moderno garantiza código predecible y seguro.',
        codeSnippet: "val resultadoFinal = 42",
        codeLanguage: 'kotlin',
        byteTip: 'Recuerda que en Kotlin los tipos no aceptan null de forma implícita, protegiéndote contra caídas.',
        keyPoints: [
          'Inmutabilidad preferida por defecto.',
          'Tipado estricto verificado en compilación.',
          'Sintaxis concisa y expresiva.'
        ]
      }
    ]
  },
};
