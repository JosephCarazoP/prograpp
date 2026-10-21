import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { KOTLIN_UNITS } from './curriculum_kotlin.mjs';
import { SQL_UNITS } from './curriculum_sql.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const KOTLIN_VIDEOS = {
  1: {
    title: 'Curso de Kotlin Desde Cero: Primeros Pasos y Algoritmos',
    channel: 'MoureDev by Brais Moure',
    duration: '58:20',
    url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
    summary: 'Aprende los fundamentos del lenguaje Kotlin paso a paso: estructura general, main(), compilación y buenas prácticas desde cero en español.'
  },
  2: {
    title: 'Kotlin: Variables val, var y Tipos de Datos',
    channel: 'MoureDev by Brais Moure',
    duration: '35:10',
    url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
    summary: 'Diferencia entre val y var, inmutabilidad, tipos primitivos e inferencia de tipos.'
  },
  3: {
    title: 'Operadores Matemáticos y Lógicos en Kotlin',
    channel: 'AristiDevs',
    duration: '28:45',
    url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
    summary: 'Aritmética, comparaciones y tablas de verdad con operadores lógicos and y or.'
  },
  4: {
    title: 'Estructuras de Control: If Else y When en Kotlin',
    channel: 'MoureDev by Brais Moure',
    duration: '40:15',
    url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
    summary: 'Bifurcaciones, condicionales compuestas y la potencia de when como expresión.'
  },
  5: {
    title: 'Bucles en Kotlin: For, While y Rangos',
    channel: 'AristiDevs',
    duration: '32:00',
    url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
    summary: 'Iteración sobre rangos, step, downTo, ciclos while y control de flujo con break y continue.'
  },
  6: {
    title: 'Funciones en Kotlin: Parámetros, Retorno y Modularización',
    channel: 'MoureDev by Brais Moure',
    duration: '45:30',
    url: 'https://www.youtube.com/watch?v=T3ugOYTRF7c',
    summary: 'Modularización con funciones, valores por defecto, argumentos con nombre y Unit.'
  },
  7: {
    title: 'Null Safety y Conversiones Seguras en Kotlin',
    channel: 'AristiDevs',
    duration: '38:20',
    url: 'https://www.youtube.com/watch?v=k9A3m1s_u6A',
    summary: 'Tipos anulables (?), operador Elvis (?:), llamada segura (?.) y evitar NullPointerException.'
  },
  8: {
    title: 'Manipulación de Strings y Texto en Kotlin',
    channel: 'MoureDev by Brais Moure',
    duration: '30:15',
    url: 'https://www.youtube.com/watch?v=k9A3m1s_u6A',
    summary: 'Métodos de cadenas, subcadenas, validaciones, trim, split y comparaciones.'
  },
  9: {
    title: 'Colecciones en Kotlin: List, Set y Map',
    channel: 'AristiDevs',
    duration: '52:10',
    url: 'https://www.youtube.com/watch?v=k9A3m1s_u6A',
    summary: 'Listas mutables e inmutables, conjuntos únicos con Set y diccionarios clave-valor con Map.'
  },
  10: {
    title: 'Programación Orientada a Objetos: Clases y Data Class',
    channel: 'MoureDev by Brais Moure',
    duration: '55:00',
    url: 'https://www.youtube.com/watch?v=k9A3m1s_u6A',
    summary: 'Constructores, propiedades, métodos, encapsulamiento y el poder de las data classes.'
  },
  11: {
    title: 'Lambdas y Operaciones Funcionales sobre Colecciones',
    channel: 'AristiDevs',
    duration: '48:30',
    url: 'https://www.youtube.com/watch?v=k9A3m1s_u6A',
    summary: 'Uso de filter, map, find, any, all, sortedBy y sumOf en Kotlin.'
  },
  12: {
    title: 'Manejo de Errores, Excepciones y Debugging en Kotlin',
    channel: 'MoureDev by Brais Moure',
    duration: '36:40',
    url: 'https://www.youtube.com/watch?v=k9A3m1s_u6A',
    summary: 'Bloques try-catch, depuración con puntos de interrupción y validación de datos límite.'
  }
};

const SQL_VIDEOS = {
  1: {
    title: 'Fundamentos de Bases de Datos Relacionales',
    channel: 'Fazt Code',
    duration: '1:12:00',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Qué es una base de datos, arquitectura relacional, tablas, columnas, registros y SQLite.'
  },
  2: {
    title: 'Modelado Entidad-Relación: PK, FK y Relaciones',
    channel: 'Develoteca',
    duration: '45:20',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Diseño de esquemas, 1 a 1, 1 a N, N a N con tablas intermedias con Estudiantes y Asignaturas.'
  },
  3: {
    title: 'CREATE TABLE y Tipos de Datos en SQLite',
    channel: 'Fazt Code',
    duration: '38:15',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Creación de esquemas DDL, afinidades INTEGER, REAL, TEXT, BLOB y flexibilidad de tipos.'
  },
  4: {
    title: 'Restricciones de Integridad: PRIMARY KEY, NOT NULL, CHECK',
    channel: 'Midudev',
    duration: '34:50',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Garantizar calidad de datos con UNIQUE, CHECK, DEFAULT y manejo de nulos.'
  },
  5: {
    title: 'INSERT INTO: Inserción de Registros y Valores Predeterminados',
    channel: 'Fazt Code',
    duration: '29:40',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Inserción explícita, inserciones múltiples y orden correcto respetando relaciones.'
  },
  6: {
    title: 'Consultas Esenciales: SELECT, Columnas, Alias y DISTINCT',
    channel: 'Midudev',
    duration: '42:10',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Proyección de datos, expresiones calculadas con AS y eliminación de duplicados.'
  },
  7: {
    title: 'Filtros con WHERE, Operadores Lógicos, LIKE y ORDER BY',
    channel: 'Fazt Code',
    duration: '50:30',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Filtrado exacto con BETWEEN, IN, LIKE con comodines, ordenamiento y límites.'
  },
  8: {
    title: 'Modificación y Eliminación: UPDATE y DELETE en SQL',
    channel: 'Develoteca',
    duration: '33:15',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Actualización segura, importancia vital del WHERE y diferencia con DROP TABLE.'
  },
  9: {
    title: 'JOINs en SQL: INNER JOIN, LEFT JOIN y Múltiples Tablas',
    channel: 'Fazt Code',
    duration: '58:00',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Unión de tablas relacionadas, condiciones ON, alias de tablas y lectura de matrículas.'
  },
  10: {
    title: 'Agregaciones y Agrupamiento: COUNT, SUM, AVG y GROUP BY',
    channel: 'Midudev',
    duration: '44:20',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Cálculo de estadísticas, agrupamiento con GROUP BY y filtros posagregación con HAVING.'
  },
  11: {
    title: 'Funciones Nativas y Subconsultas en SQLite',
    channel: 'Fazt Code',
    duration: '47:10',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Manipulación con UPPER, LENGTH, COALESCE, CASE condicional y subconsultas con IN.'
  },
  12: {
    title: 'Integridad Referencial, ON DELETE CASCADE y Transacciones ACID',
    channel: 'Midudev',
    duration: '41:30',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Activación de PRAGMA foreign_keys, acciones en cascada y control con BEGIN, COMMIT, ROLLBACK.'
  },
  13: {
    title: 'Buen Diseño, Normalización (1FN, 2FN, 3FN) y Seguridad SQL',
    channel: 'Fazt Code',
    duration: '53:40',
    url: 'https://www.youtube.com/watch?v=DFg1V-rO6Pg',
    summary: 'Evitar redundancias, formas normales, ALTER/DROP, vistas, índices y prevención de SQL Injection.'
  }
};

function generateLessonsFile(unit, pathId) {
  const uPad = String(unit.id).padStart(2, '0');
  const pathPrefix = pathId === 'kotlin' ? 'kt' : 'sql';
  const varName = pathId === 'kotlin' ? `KOTLIN_UNIT_${uPad}_LESSONS` : `SQL_UNIT_${uPad}_LESSONS`;

  const lessons = unit.lessons.map(l => {
    const lPad = String(l.level).padStart(2, '0');
    const lessonId = `${pathId}-u${uPad}-l${lPad}`;

    const exercises = [
      {
        id: `${pathPrefix}-u${uPad}-l${lPad}-e01`,
        type: 'predict_output',
        prompt: `¿Cuál es el resultado exacto en consola tras evaluar la siguiente instrucción de ${pathId === 'kotlin' ? 'Kotlin' : 'SQL'}?`,
        code: l.predictCode,
        options: l.predictOptions,
        correctOptionIndex: l.predictCorrect,
        explanation: l.keyPoints[0] || 'La salida corresponde con la evaluación lógica y secuencial de la instrucción.',
        xpReward: 10
      },
      {
        id: `${pathPrefix}-u${uPad}-l${lPad}-e02`,
        type: 'code_cloze',
        prompt: l.clozeCode,
        codeWithBlank: l.clozeCode,
        options: l.clozeOptions,
        correctOption: l.clozeCorrect,
        explanation: l.keyPoints[1] || 'Sintaxis estricta del lenguaje según la especificación oficial.',
        xpReward: 10
      },
      {
        id: `${pathPrefix}-u${uPad}-l${lPad}-e03`,
        type: 'code_builder',
        prompt: `Ordena los bloques para construir la sentencia correcta de: "${l.title}":`,
        tokens: l.builderTokens,
        solution: l.builderSolution,
        explanation: l.tip || 'Construcción sintáctica válida respetando el orden gramatical.',
        xpReward: 15
      },
      {
        id: `${pathPrefix}-u${uPad}-l${lPad}-e04`,
        type: 'spot_the_bug',
        prompt: `Identifica la línea que contiene el error en este código de ${pathId === 'kotlin' ? 'Kotlin' : 'SQL'}:`,
        codeSnippet: l.bugLines,
        bugLineIndex: l.bugIndex,
        explanation: l.pitfall || 'Detectar y corregir el error garantiza la ejecución sin fallas.',
        xpReward: 15
      }
    ];

    return {
      id: lessonId,
      path: pathId,
      unit: unit.id,
      level: l.level,
      title: l.title,
      description: l.desc,
      exercises
    };
  });

  return `import { Lesson } from '../../../types/lesson';

export const ${varName}: Lesson[] = ${JSON.stringify(lessons, null, 2)};
`;
}

function generateTheoryFile(unit, pathId) {
  const uPad = String(unit.id).padStart(2, '0');
  const pathPrefix = pathId === 'kotlin' ? 'kt' : 'sql';
  const varName = pathId === 'kotlin' ? `KOTLIN_UNIT_${uPad}_THEORY` : `SQL_UNIT_${uPad}_THEORY`;
  const video = pathId === 'kotlin' ? KOTLIN_VIDEOS[unit.id] : SQL_VIDEOS[unit.id];

  const theoryMap = {};

  unit.lessons.forEach(l => {
    const lPad = String(l.level).padStart(2, '0');
    const lessonId = `${pathId}-u${uPad}-l${lPad}`;
    const theoryId = `${pathPrefix}-th-u${uPad}-l${lPad}`;

    theoryMap[lessonId] = {
      id: theoryId,
      lessonId,
      pathId,
      unitId: unit.id,
      levelId: l.level,
      title: l.title,
      subtitle: l.desc,
      estimatedMinutes: 5,
      analogy: l.analogy,
      video,
      sections: [
        {
          title: `Concepto Clave: ${l.title}`,
          explanation: `${l.desc}\n\n${l.keyPoints.map((kp, idx) => `${idx + 1}. ${kp}`).join('\n')}`,
          codeSnippet: l.code,
          codeLanguage: pathId,
          outputSnippet: l.output,
          byteTip: l.tip,
          pitfallTip: l.pitfall,
          keyPoints: l.keyPoints
        }
      ]
    };
  });

  return `import { TheoryLesson } from '../../../types/theory';

export const ${varName}: Record<string, TheoryLesson> = ${JSON.stringify(theoryMap, null, 2)};
`;
}

function run() {
  console.log('Writing Kotlin units...');
  KOTLIN_UNITS.forEach(unit => {
    const uPad = String(unit.id).padStart(2, '0');
    const unitDir = path.join(rootDir, 'src', 'content', 'kotlin', `unit_${uPad}`);
    if (!fs.existsSync(unitDir)) {
      fs.mkdirSync(unitDir, { recursive: true });
    }

    const indexContent = generateLessonsFile(unit, 'kotlin');
    fs.writeFileSync(path.join(unitDir, 'index.ts'), indexContent, 'utf8');

    const theoryContent = generateTheoryFile(unit, 'kotlin');
    fs.writeFileSync(path.join(unitDir, 'theory.ts'), theoryContent, 'utf8');
    console.log(`  Written Kotlin unit_${uPad} (${unit.lessons.length} lessons)`);
  });

  console.log('Writing SQL units...');
  SQL_UNITS.forEach(unit => {
    const uPad = String(unit.id).padStart(2, '0');
    const unitDir = path.join(rootDir, 'src', 'content', 'sql', `unit_${uPad}`);
    if (!fs.existsSync(unitDir)) {
      fs.mkdirSync(unitDir, { recursive: true });
    }

    const indexContent = generateLessonsFile(unit, 'sql');
    fs.writeFileSync(path.join(unitDir, 'index.ts'), indexContent, 'utf8');

    const theoryContent = generateTheoryFile(unit, 'sql');
    fs.writeFileSync(path.join(unitDir, 'theory.ts'), theoryContent, 'utf8');
    console.log(`  Written SQL unit_${uPad} (${unit.lessons.length} lessons)`);
  });

  // Write src/content/index.ts
  console.log('Writing src/content/index.ts...');
  const kotlinImports = KOTLIN_UNITS.map(u => {
    const pad = String(u.id).padStart(2, '0');
    return `import { KOTLIN_UNIT_${pad}_LESSONS } from './kotlin/unit_${pad}';`;
  }).join('\n');

  const sqlImports = SQL_UNITS.map(u => {
    const pad = String(u.id).padStart(2, '0');
    return `import { SQL_UNIT_${pad}_LESSONS } from './sql/unit_${pad}';`;
  }).join('\n');

  const kotlinRegisters = KOTLIN_UNITS.map(u => {
    const pad = String(u.id).padStart(2, '0');
    return `KOTLIN_UNIT_${pad}_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });`;
  }).join('\n');

  const sqlRegisters = SQL_UNITS.map(u => {
    const pad = String(u.id).padStart(2, '0');
    return `SQL_UNIT_${pad}_LESSONS.forEach(l => { ALL_LESSONS[l.id] = l; });`;
  }).join('\n');

  const unitsKotlinDef = KOTLIN_UNITS.map(u => {
    const pad = String(u.id).padStart(2, '0');
    return `  {
    id: ${u.id},
    title: ${JSON.stringify(u.title)},
    description: ${JSON.stringify(u.description)},
    icon: ${JSON.stringify(u.icon)},
    color: ${JSON.stringify(u.color)},
    stage: ${JSON.stringify(u.stage)},
    lessons: KOTLIN_UNIT_${pad}_LESSONS
  }`;
  }).join(',\n');

  const unitsSqlDef = SQL_UNITS.map(u => {
    const pad = String(u.id).padStart(2, '0');
    return `  {
    id: ${u.id},
    title: ${JSON.stringify(u.title)},
    description: ${JSON.stringify(u.description)},
    icon: ${JSON.stringify(u.icon)},
    color: ${JSON.stringify(u.color)},
    stage: ${JSON.stringify(u.stage)},
    lessons: SQL_UNIT_${pad}_LESSONS
  }`;
  }).join(',\n');

  const contentIndexTs = `import { Unit, Lesson } from '../types/lesson';
import { LearningPath } from '../types/user';

${kotlinImports}

${sqlImports}

// Mapeo global de todas las lecciones por ID
export const ALL_LESSONS: Record<string, Lesson> = {};

${kotlinRegisters}

${sqlRegisters}

export const UNITS_KOTLIN: Unit[] = [
${unitsKotlinDef}
];

export const UNITS_SQL: Unit[] = [
${unitsSqlDef}
];

export const getUnitsByPath = (path: LearningPath): Unit[] => {
  return path === 'kotlin' ? UNITS_KOTLIN : UNITS_SQL;
};

export const getLessonById = (id: string): Lesson | undefined => {
  return ALL_LESSONS[id];
};
`;
  fs.writeFileSync(path.join(rootDir, 'src', 'content', 'index.ts'), contentIndexTs, 'utf8');

  // Write src/content/theoryIndex.ts
  console.log('Writing src/content/theoryIndex.ts...');
  const kotlinTheoryImports = KOTLIN_UNITS.map(u => {
    const pad = String(u.id).padStart(2, '0');
    return `import { KOTLIN_UNIT_${pad}_THEORY } from './kotlin/unit_${pad}/theory';`;
  }).join('\n');

  const sqlTheoryImports = SQL_UNITS.map(u => {
    const pad = String(u.id).padStart(2, '0');
    return `import { SQL_UNIT_${pad}_THEORY } from './sql/unit_${pad}/theory';`;
  }).join('\n');

  const kotlinTheorySpreads = KOTLIN_UNITS.map(u => {
    const pad = String(u.id).padStart(2, '0');
    return `  ...KOTLIN_UNIT_${pad}_THEORY,`;
  }).join('\n');

  const sqlTheorySpreads = SQL_UNITS.map(u => {
    const pad = String(u.id).padStart(2, '0');
    return `  ...SQL_UNIT_${pad}_THEORY,`;
  }).join('\n');

  const theoryIndexTs = `import { TheoryLesson } from '../types/theory';

${kotlinTheoryImports}

${sqlTheoryImports}

export const ALL_THEORY: Record<string, TheoryLesson> = {
${kotlinTheorySpreads}
${sqlTheorySpreads}
};

export const getTheoryByLessonId = (lessonId: string): TheoryLesson | undefined => {
  return ALL_THEORY[lessonId];
};

export const getTheoriesByPath = (path: 'kotlin' | 'sql'): Record<string, TheoryLesson> => {
  const result: Record<string, TheoryLesson> = {};
  Object.values(ALL_THEORY).forEach(th => {
    if (th.pathId === path) {
      result[th.lessonId] = th;
    }
  });
  return result;
};
`;
  fs.writeFileSync(path.join(rootDir, 'src', 'content', 'theoryIndex.ts'), theoryIndexTs, 'utf8');

  console.log('All units and indices written successfully!');
}

run();
