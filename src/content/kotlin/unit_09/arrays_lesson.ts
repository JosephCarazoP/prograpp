import { Lesson } from '../../../types/lesson';

export const LESSON_ARRAYS: Lesson = {
  id: 'kotlin-u09-l08',
  path: 'kotlin',
  unit: 9,
  level: 8,
  title: '8. Arreglos (Arrays): vectores, tamaño fijo y matrices',
  description: 'Comprende los arreglos (Array e IntArray): estructuras de datos de tamaño fijo contiguas en memoria, acceso instantáneo por índice y matrices bidimensionales.',
  exercises: [
    {
      id: 'kt-u09-l08-e01',
      type: 'predict_output',
      prompt: 'Analiza el acceso al elemento en el arreglo. ¿Qué valor imprime la consola?',
      code: 'val notas = arrayOf(85, 90, 78)\nprintln(notas[1])',
      options: ['90', '85', '78', 'Error de compilación'],
      correctOptionIndex: 0,
      explanation: 'Los arreglos utilizan indexación basada en cero. notas[0] es 85, notas[1] es 90 y notas[2] es 78.',
      xpReward: 10
    },
    {
      id: 'kt-u09-l08-e02',
      type: 'code_cloze',
      prompt: 'Para crear un arreglo genérico de elementos en Kotlin utilizamos la función estándar ___:',
      codeWithBlank: 'val nombres = ___("Ana", "Carlos", "Beatriz")',
      options: ['arrayOf', 'listOf', 'setOf', 'mapOf'],
      correctOption: 'arrayOf',
      explanation: 'arrayOf() instancia un Array<T> con los elementos provistos entre paréntesis.',
      xpReward: 10
    },
    {
      id: 'kt-u09-l08-e03',
      type: 'code_builder',
      prompt: 'Construye la declaración de un arreglo con los tres primeros números pares positivos:',
      tokens: [
        'val',
        'pares',
        '=',
        'arrayOf',
        '(',
        '2',
        ',',
        '4',
        ',',
        '6',
        ')'
      ],
      solution: [
        'val',
        'pares',
        '=',
        'arrayOf',
        '(',
        '2',
        ',',
        '4',
        ',',
        '6',
        ')'
      ],
      explanation: 'val pares = arrayOf(2, 4, 6) crea un arreglo de tres enteros en memoria contigua.',
      xpReward: 15
    },
    {
      id: 'kt-u09-l08-e04',
      type: 'spot_the_bug',
      prompt: 'Identifica la línea con la operación INVÁLIDA sobre un Array de Kotlin:',
      codeSnippet: [
        'val numeros = arrayOf(10, 20, 30)',
        'numeros[0] = 99 // Modificar celda existente',
        'numeros.add(40) // Intentar agregar un nuevo elemento'
      ],
      bugLineIndex: 2,
      explanation: 'Un Array tiene un tamaño fijo inmutable en memoria; no tiene el método .add(). Para colecciones de tamaño dinámico se usa MutableList.',
      xpReward: 15
    },
    {
      id: 'kt-u09-l08-e05',
      type: 'predict_output',
      prompt: 'Si un arreglo fue declarado con 5 elementos, ¿cuál es el rango de índices válidos para acceder a ellos?',
      code: '',
      options: [
        'Del índice 0 al 4 inclusive',
        'Del índice 1 al 5 inclusive',
        'Del índice 0 al 5 inclusive',
        'Del índice 1 al 4 inclusive'
      ],
      correctOptionIndex: 0,
      explanation: 'En ciencias de la computación, los arreglos siempre van de 0 hasta length - 1 (es decir, de 0 a 4 para 5 elementos).',
      xpReward: 10
    },
    {
      id: 'kt-u09-l08-e06',
      type: 'matching_pairs',
      prompt: 'Empareja cada concepto fundamental de arreglos con su definición técnica:',
      pairs: [
        {
          left: 'Array (Arreglo)',
          right: 'Estructura lineal contigua en memoria con tamaño predeterminado'
        },
        {
          left: 'Índice (Index)',
          right: 'Posición numérica entera (desde 0) que ubica una celda'
        },
        {
          left: 'Propiedad .size',
          right: 'Devuelve la cantidad total fija de elementos en el arreglo'
        },
        {
          left: 'Matriz (Array 2D)',
          right: 'Arreglo bidimensional estructurado en filas y columnas'
        }
      ],
      explanation: 'Los arreglos representan la forma más directa y eficiente de almacenar datos ordenados en la memoria del hardware.',
      xpReward: 15
    },
    {
      id: 'kt-u09-l08-e07',
      type: 'predict_output',
      prompt: '¿Qué resultado se imprime tras modificar una celda del arreglo?',
      code: 'val valores = intArrayOf(10, 20, 30)\nvalores[1] = 99\nprintln(valores[1])',
      options: ['99', '20', '10', '30'],
      correctOptionIndex: 0,
      explanation: 'Aunque el tamaño del arreglo no puede cambiar, los valores almacenados en sus celdas sí pueden actualizarse por índice.',
      xpReward: 10
    },
    {
      id: 'kt-u09-l08-e08',
      type: 'code_cloze',
      prompt: 'Intentar acceder a un índice negativo o mayor o igual al tamaño del arreglo lanza la excepción ___:',
      codeWithBlank: 'Acceder a arreglo[100] cuando solo tiene 3 elementos dispara un ___.',
      options: [
        'ArrayIndexOutOfBoundsException',
        'NullPointerException',
        'NumberFormatException',
        'ArithmeticException'
      ],
      correctOption: 'ArrayIndexOutOfBoundsException',
      explanation: 'Kotlin protege la memoria lanzando ArrayIndexOutOfBoundsException si intentas consultar un índice fuera de rango.',
      xpReward: 10
    },
    {
      id: 'kt-u09-l08-e09',
      type: 'predict_output',
      prompt: 'Analiza la siguiente matriz bidimensional (Array de Arrays). ¿Qué valor imprime matriz[1][0]?',
      code: 'val matriz = arrayOf(\n    arrayOf(1, 2),\n    arrayOf(3, 4)\n)\nprintln(matriz[1][0])',
      options: ['3', '1', '2', '4'],
      correctOptionIndex: 0,
      explanation: 'matriz[1] selecciona la segunda fila [3, 4], y el segundo corchete [0] selecciona su primer elemento, que es 3.',
      xpReward: 15
    },
    {
      id: 'kt-u09-l08-e10',
      type: 'predict_output',
      prompt: '¿Cuál es la diferencia fundamental entre un `Array` y una `MutableList` en Kotlin?',
      code: '',
      options: [
        'El Array tiene un tamaño fijo inmutable en memoria; MutableList puede crecer y achicarse con add y remove',
        'El Array solo puede almacenar números enteros y MutableList solo cadenas de texto',
        'El Array no permite acceder a elementos mediante corchetes',
        'No hay ninguna diferencia técnica, son exactamente idénticos'
      ],
      correctOptionIndex: 0,
      explanation: 'Los Arrays optimizan memoria y velocidad reservando un bloque contiguo fijo; las listas mutables ofrecen flexibilidad dinámica para agregar y eliminar.',
      xpReward: 10
    }
  ]
};
