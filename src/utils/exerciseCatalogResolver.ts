import { ALL_LESSONS } from '../content';
import { getTheoryByLessonId } from '../content/theoryIndex';
import { KOTLIN_BOSSES_DATA, SQL_BOSSES_DATA } from '../content/bossChallenges';
import {
  ALL_DIAGNOSTIC_INSTRUMENTS,
  KOTLIN_FINAL_INSTRUMENT,
  SQL_FINAL_INSTRUMENT
} from '../content/academicEvaluations';
import { Exercise, Lesson } from '../types/lesson';
import {
  QuestionReport,
  MatchingPairsReportData,
  CodeBuilderReportData,
  SpotTheBugReportData,
  ParsonsReportData,
  FlowchartReportData,
  TraceStepReportData
} from '../types/questionReport';

export interface CatalogExerciseMatch {
  exercise: Exercise | any;
  lesson?: Lesson;
  pathId: 'kotlin' | 'sql';
  unitId?: number;
  lessonId: string;
  lessonTitle: string;
  sourceFileHint: string;
}

// Índice en memoria para búsqueda instantánea O(1) por exerciseId
let cachedCatalogMap: Map<string, CatalogExerciseMatch> | null = null;

function buildCatalogMap(): Map<string, CatalogExerciseMatch> {
  if (cachedCatalogMap) return cachedCatalogMap;
  const map = new Map<string, CatalogExerciseMatch>();

  // 1. Indexar todas las lecciones de Kotlin y SQL (ALL_LESSONS)
  for (const lesson of Object.values(ALL_LESSONS)) {
    if (!lesson || !Array.isArray(lesson.exercises)) continue;
    const unitPad = String(lesson.unit || 1).padStart(2, '0');
    const levelPad = String(lesson.level || 1).padStart(2, '0');
    const pathId: 'kotlin' | 'sql' = lesson.path === 'sql' ? 'sql' : 'kotlin';
    const sourceFileHint = `src/content/${pathId}/unit_${unitPad}/ (Lección ${levelPad}: ${lesson.id})`;

    for (const ex of lesson.exercises) {
      if (!ex || !ex.id) continue;
      const match: CatalogExerciseMatch = {
        exercise: ex,
        lesson,
        pathId,
        unitId: lesson.unit,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        sourceFileHint
      };
      map.set(ex.id, match);
      map.set(ex.id.toLowerCase(), match);
    }
  }

  // 2. Indexar desafíos de Jefes (Bosses)
  const indexBossRecord = (record: Record<number, any>, pathId: 'kotlin' | 'sql') => {
    for (const boss of Object.values(record)) {
      if (!boss || !Array.isArray(boss.stages)) continue;
      for (const stage of boss.stages) {
        if (!stage || !stage.id) continue;
        const adaptedExercise = {
          id: stage.id,
          type: 'predict_output',
          prompt: stage.prompt,
          code: stage.codeSnippet,
          options: Array.isArray(stage.options)
            ? stage.options.map((o: any) => (typeof o === 'string' ? o : `${o.code} (${o.description})`))
            : [],
          correctOptionIndex: stage.correctOptionIndex ?? 0,
          explanation: stage.explanation || stage.teacherHint || ''
        };
        const match: CatalogExerciseMatch = {
          exercise: adaptedExercise,
          pathId,
          unitId: boss.unitId,
          lessonId: boss.id,
          lessonTitle: `Jefe Unidad ${boss.unitId}: ${boss.name}`,
          sourceFileHint: `src/content/bossChallenges.ts (${boss.id} -> ${stage.id})`
        };
        map.set(stage.id, match);
        map.set(stage.id.toLowerCase(), match);
      }
    }
  };
  indexBossRecord(KOTLIN_BOSSES_DATA, 'kotlin');
  indexBossRecord(SQL_BOSSES_DATA, 'sql');

  // 3. Indexar instrumentos de Evaluación Diagnóstica y Final
  const allInstruments = [
    ...ALL_DIAGNOSTIC_INSTRUMENTS,
    KOTLIN_FINAL_INSTRUMENT,
    SQL_FINAL_INSTRUMENT
  ];
  for (const inst of allInstruments) {
    if (!inst || !Array.isArray(inst.questions)) continue;
    for (const q of inst.questions) {
      if (!q || !q.questionId) continue;
      const adaptedExercise = {
        id: q.questionId,
        type: 'predict_output',
        prompt: q.prompt,
        code: (q as any).codeSnippet || (q as any).code,
        options: q.options || [],
        correctOptionIndex: q.correctOptionIndex ?? 0,
        explanation: q.rubricCriteria || ''
      };
      const match: CatalogExerciseMatch = {
        exercise: adaptedExercise,
        pathId: inst.pathId === 'sql' ? 'sql' : 'kotlin',
        lessonId: inst.instrumentId,
        lessonTitle: inst.title,
        sourceFileHint: `src/content/academicEvaluations.ts (${inst.instrumentId} -> ${q.questionId})`
      };
      map.set(q.questionId, match);
      map.set(q.questionId.toLowerCase(), match);
    }
  }

  cachedCatalogMap = map;
  return map;
}

/**
 * Busca una pregunta en todo el catálogo del proyecto por su ID o contexto de lección.
 */
export function resolveExerciseFromCatalog(
  exerciseId?: string,
  pathId?: 'kotlin' | 'sql',
  lessonId?: string
): CatalogExerciseMatch | null {
  if (!exerciseId) return null;
  const map = buildCatalogMap();

  const direct = map.get(exerciseId) || map.get(exerciseId.trim().toLowerCase());
  if (direct) return direct;

  // Si es una pregunta fallback de TheoryCheckpointModal (ej. fallback-0) y tenemos lessonId
  if (exerciseId.startsWith('fallback-') && lessonId && ALL_LESSONS[lessonId]) {
    const lesson = ALL_LESSONS[lessonId];
    const th = getTheoryByLessonId(lessonId);
    const sec = th?.sections?.[0];
    const keyPoints = sec?.keyPoints || ['Comprender la sintaxis básica', 'Ejecutar paso a paso'];
    const pId: 'kotlin' | 'sql' = lesson.path === 'sql' ? 'sql' : 'kotlin';
    return {
      exercise: {
        id: exerciseId,
        type: 'predict_output',
        prompt: `¿Cuál de las siguientes es una regla o concepto fundamental en ${lesson.title}?`,
        options: [
          keyPoints[0] || 'Seguir la secuencia lógica del programa',
          'Ignorar los tipos de datos en tiempo de compilación',
          'Ejecutar las instrucciones en orden aleatorio',
          'No definir salida de resultados en consola'
        ],
        correctOptionIndex: 0,
        explanation: sec?.byteTip || 'Todo programa requiere consistencia lógica y orden de ejecución.'
      },
      lesson,
      pathId: pId,
      unitId: lesson.unit,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      sourceFileHint: `src/components/TheoryCheckpointModal.tsx (Fallback de ${lesson.id})`
    };
  }

  // Búsqueda parcial si el ID fue sanitizado (ej: guiones bajos por guiones medios)
  const normalizedTarget = exerciseId.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  for (const [key, val] of map.entries()) {
    const normKey = key.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    if (normKey === normalizedTarget) {
      if (!pathId || val.pathId === pathId) {
        return val;
      }
    }
  }

  return null;
}

/**
 * Devuelve la instrucción pedagógica secundaria que el avatar muestra en pantalla para ese ejercicio.
 */
export function getExerciseScreenInstruction(exercise: any): string {
  if (!exercise) return '';
  switch (exercise.type) {
    case 'trace_step':
      return 'Observa cada operación del código y anota en la tabla el valor que toma la variable en cada paso.';
    case 'spot_the_bug':
      return 'Lee el código detenidamente y pulsa sobre la línea que tiene el error de sintaxis o lógica.';
    case 'predict_output': {
      const p = String(exercise.prompt || '').toLowerCase();
      if (
        p.includes('qué significa') ||
        p.includes('por qué') ||
        p.includes('cuál de') ||
        p.includes('qué ocurre') ||
        p.includes('qué pasa') ||
        p.includes('qué ventaja') ||
        p.includes('ejemplifica')
      ) {
        return exercise.code
          ? 'Examina la consulta o código y selecciona la opción conceptual correcta.'
          : 'Lee atentamente la pregunta y selecciona la opción correcta.';
      }
      return 'Analiza la lógica del código y selecciona el resultado exacto que se mostrará en pantalla.';
    }
    case 'code_builder':
      return 'Toca las fichas del banco en el orden correcto para construir la instrucción solicitada.';
    case 'matching_pairs':
      return 'Relaciona cada concepto de la columna izquierda con su par correspondiente a la derecha.';
    case 'code_cloze':
      return 'Identifica la pieza faltante en el espacio en blanco (___) y elige la opción que completa el código.';
    case 'parsons_puzzle':
      return 'Usa las flechas para ordenar los bloques de arriba hacia abajo hasta formar una secuencia lógica válida.';
    case 'flowchart_builder':
      return 'Ordena los bloques geométricos del diagrama de flujo y presiona "Simular Flujo" para verificar tu algoritmo.';
    default:
      return 'Resuelve el ejercicio aplicando los conceptos de la lección.';
  }
}

/**
 * Extrae de forma determinística TODA la información de opciones, enunciado, código y solución
 * tanto de la instancia viva en pantalla del alumno como del ejercicio canónico del catálogo.
 */
export function extractComprehensiveExerciseDetails(params: {
  exercise: any;
  catalogExercise?: any;
  userAnswer?: string;
  selectedOptionIndex?: number | null;
  eliminatedOptionIndices?: number[];
  selectedBugLineIndex?: number | null;
  eliminatedBugLines?: number[];
  selectedTokenIndices?: number[];
  eliminatedTokenIndices?: number[];
  shuffledRightIndices?: number[];
  matchedPairs?: string[];
  activeLeftPair?: string | null;
  activeRightPair?: string | null;
  lastAttemptedPairs?: string[];
  parsonsOrder?: number[];
  flowchartOrder?: number[];
  traceUserValues?: Record<number, Record<string, string>>;
}) {
  const ex = params.exercise || params.catalogExercise || {};
  const catEx = params.catalogExercise || ex;

  const type: string = ex.type || catEx.type || 'predict_output';
  const prompt: string = ex.prompt || catEx.prompt || 'Sin enunciado registrado';
  const instructionText = getExerciseScreenInstruction(ex);

  // 1. Código / Snippet mostrado al alumno
  let codeSnippet = '';
  if (typeof ex.code === 'string' && ex.code.trim()) {
    codeSnippet = ex.code;
  } else if (Array.isArray(ex.codeSnippet)) {
    codeSnippet = ex.codeSnippet.join('\n');
  } else if (typeof ex.codeSnippet === 'string' && ex.codeSnippet.trim()) {
    codeSnippet = ex.codeSnippet;
  } else if (typeof ex.codeWithBlank === 'string' && ex.codeWithBlank.trim()) {
    codeSnippet = ex.codeWithBlank;
  } else if (Array.isArray(ex.lines)) {
    codeSnippet = ex.lines.join('\n');
  } else if (typeof catEx.code === 'string' && catEx.code.trim()) {
    codeSnippet = catEx.code;
  } else if (Array.isArray(catEx.codeSnippet)) {
    codeSnippet = catEx.codeSnippet.join('\n');
  } else if (typeof catEx.codeWithBlank === 'string' && catEx.codeWithBlank.trim()) {
    codeSnippet = catEx.codeWithBlank;
  }

  let availableOptions: string[] = [];
  let originalOptions: string[] | undefined = undefined;
  let expectedSolutionText = '';
  let userResolvedAnswer = params.userAnswer;

  let matchingPairsData: MatchingPairsReportData | undefined;
  let codeBuilderData: CodeBuilderReportData | undefined;
  let spotTheBugData: SpotTheBugReportData | undefined;
  let parsonsData: ParsonsReportData | undefined;
  let flowchartData: FlowchartReportData | undefined;
  let traceStepData: TraceStepReportData | undefined;

  if (type === 'predict_output') {
    const opts: string[] = Array.isArray(ex.options)
      ? ex.options
      : Array.isArray(catEx.options)
      ? catEx.options
      : [];
    availableOptions = opts.map((opt, idx) => {
      const isElim = params.eliminatedOptionIndices?.includes(idx);
      return isElim ? `${opt} [Descartada por comodín 50/50]` : String(opt);
    });
    if (Array.isArray(catEx.options)) {
      originalOptions = [...catEx.options];
    }

    const correctIdx =
      typeof ex.correctOptionIndex === 'number'
        ? ex.correctOptionIndex
        : typeof catEx.correctOptionIndex === 'number'
        ? catEx.correctOptionIndex
        : 0;
    const letter = String.fromCharCode(65 + correctIdx);
    const correctText = opts[correctIdx] ?? catEx.options?.[correctIdx] ?? '';
    expectedSolutionText = `Opción ${letter}: ${correctText}`;

    if (typeof params.selectedOptionIndex === 'number' && opts[params.selectedOptionIndex] !== undefined) {
      const selLetter = String.fromCharCode(65 + params.selectedOptionIndex);
      userResolvedAnswer = `Opción ${selLetter}: ${opts[params.selectedOptionIndex]}`;
    } else if (userResolvedAnswer && !userResolvedAnswer.startsWith('Opción ')) {
      const foundIdx = opts.findIndex(o => o.trim() === userResolvedAnswer?.trim());
      if (foundIdx >= 0) {
        userResolvedAnswer = `Opción ${String.fromCharCode(65 + foundIdx)}: ${opts[foundIdx]}`;
      }
    }
  } else if (type === 'code_cloze') {
    const opts: string[] = Array.isArray(ex.options)
      ? ex.options
      : Array.isArray(catEx.options)
      ? catEx.options
      : [];
    availableOptions = opts.map((opt, idx) => {
      const isElim = params.eliminatedOptionIndices?.includes(idx);
      return isElim ? `${opt} [Descartada por comodín 50/50]` : String(opt);
    });
    if (Array.isArray(catEx.options)) {
      originalOptions = [...catEx.options];
    }

    const correctOpt: string = ex.correctOption ?? catEx.correctOption ?? '';
    const matchIdx = opts.findIndex(o => o.trim() === String(correctOpt).trim());
    if (matchIdx >= 0) {
      expectedSolutionText = `Opción ${String.fromCharCode(65 + matchIdx)}: ${correctOpt}`;
    } else {
      expectedSolutionText = `${correctOpt} (⚠️ ATENCIÓN: No coincide exactamente con ninguna de las opciones listadas)`;
    }

    if (typeof params.selectedOptionIndex === 'number' && opts[params.selectedOptionIndex] !== undefined) {
      const selLetter = String.fromCharCode(65 + params.selectedOptionIndex);
      userResolvedAnswer = `Opción ${selLetter}: ${opts[params.selectedOptionIndex]}`;
    } else if (userResolvedAnswer && !userResolvedAnswer.startsWith('Opción ')) {
      const foundIdx = opts.findIndex(o => o.trim() === userResolvedAnswer?.trim());
      if (foundIdx >= 0) {
        userResolvedAnswer = `Opción ${String.fromCharCode(65 + foundIdx)}: ${opts[foundIdx]}`;
      }
    }
  } else if (type === 'matching_pairs') {
    const pairs: { left: string; right: string }[] = Array.isArray(ex.pairs)
      ? ex.pairs
      : Array.isArray(catEx.pairs)
      ? catEx.pairs
      : [];

    const leftColumn = pairs.map(p => p.left);
    // El orden real en pantalla de la columna derecha usa shuffledRightIndices o el reverso determinístico (len - 1 - i)
    const rightIndices =
      Array.isArray(params.shuffledRightIndices) && params.shuffledRightIndices.length === pairs.length
        ? params.shuffledRightIndices
        : Array.from({ length: pairs.length }, (_, i) => pairs.length - 1 - i);
    const rightColumn = rightIndices.map(idx => pairs[idx]?.right || '');

    availableOptions = pairs.map((p, idx) => {
      const rightShown = rightColumn[idx] ?? p.right;
      const letter = String.fromCharCode(65 + idx);
      return `Izq [${idx + 1}]: "${p.left}"   |   Der [${letter}]: "${rightShown}"   (Par correcto de "${p.left}" -> "${p.right}")`;
    });

    if (Array.isArray(catEx.pairs)) {
      originalOptions = catEx.pairs.map((p: any, i: number) => `Par ${i + 1}: "${p.left}" ===> "${p.right}"`);
    }

    expectedSolutionText = pairs.map(p => `"${p.left}" -> "${p.right}"`).join(' | ');

    // Construir detalle de qué emparejó o intentó emparejar el alumno
    const matchedList: string[] = [];
    if (Array.isArray(params.matchedPairs) && params.matchedPairs.length > 0) {
      for (let i = 0; i < params.matchedPairs.length; i += 2) {
        const l = params.matchedPairs[i];
        const r = params.matchedPairs[i + 1];
        if (l && r) matchedList.push(`"${l}" <-> "${r}"`);
      }
    }

    const parts: string[] = [];
    if (params.lastAttemptedPairs && params.lastAttemptedPairs.length > 0) {
      parts.push(`Intentos marcados: ${params.lastAttemptedPairs.join(' ; ')}`);
    }
    if (params.activeLeftPair || params.activeRightPair) {
      parts.push(
        `Selección activa al reportar: Izq=${params.activeLeftPair ? `"${params.activeLeftPair}"` : '(ninguna)'}, Der=${
          params.activeRightPair ? `"${params.activeRightPair}"` : '(ninguna)'
        }`
      );
    }
    if (matchedList.length > 0) {
      parts.push(`Parejas ya unidas: ${matchedList.join(', ')}`);
    }
    if (parts.length > 0) {
      userResolvedAnswer = parts.join(' | ');
    }

    matchingPairsData = {
      leftColumn,
      rightColumn,
      expectedPairs: pairs.map(p => ({ left: p.left, right: p.right })),
      userMatched: matchedList.length > 0 ? matchedList : undefined,
      lastAttempts: params.lastAttemptedPairs && params.lastAttemptedPairs.length > 0 ? params.lastAttemptedPairs : undefined,
      activeLeft: params.activeLeftPair || null,
      activeRight: params.activeRightPair || null
    };
  } else if (type === 'code_builder') {
    const displayedTokens: string[] = Array.isArray(ex.tokens)
      ? ex.tokens
      : Array.isArray(catEx.tokens)
      ? catEx.tokens
      : [];
    const solution: string[] = Array.isArray(ex.solution)
      ? ex.solution
      : Array.isArray(catEx.solution)
      ? catEx.solution
      : [];
    const acceptableAlternatives: string[][] | undefined =
      ex.acceptableAlternatives || catEx.acceptableAlternatives;

    availableOptions = displayedTokens.map((tok, idx) => {
      const isElim = params.eliminatedTokenIndices?.includes(idx);
      const isSel = params.selectedTokenIndices?.includes(idx);
      return `Ficha [${idx + 1}]: "${tok}"${isSel ? ' [Usada por alumno]' : ''}${isElim ? ' [Descartada 50/50]' : ''}`;
    });

    if (Array.isArray(catEx.tokens)) {
      originalOptions = [...catEx.tokens];
    }

    expectedSolutionText = solution.join(' ');
    if (Array.isArray(acceptableAlternatives) && acceptableAlternatives.length > 0) {
      expectedSolutionText += ` (Alternativas válidas: ${acceptableAlternatives.map(a => a.join(' ')).join(' | ')})`;
    }

    const selectedTokens =
      Array.isArray(params.selectedTokenIndices) && params.selectedTokenIndices.length > 0
        ? params.selectedTokenIndices.map(i => displayedTokens[i] ?? '')
        : userResolvedAnswer
        ? userResolvedAnswer.split(' ')
        : [];

    if (selectedTokens.length > 0) {
      userResolvedAnswer = selectedTokens.join(' ');
    }

    codeBuilderData = {
      displayedTokens,
      selectedTokens,
      expectedSolution: solution,
      acceptableAlternatives,
      eliminatedTokens: params.eliminatedTokenIndices?.map(i => displayedTokens[i] ?? '')
    };
  } else if (type === 'spot_the_bug') {
    const lines: string[] = Array.isArray(ex.codeSnippet)
      ? ex.codeSnippet
      : Array.isArray(catEx.codeSnippet)
      ? catEx.codeSnippet
      : codeSnippet
      ? codeSnippet.split('\n')
      : [];

    const bugIdx =
      typeof ex.bugLineIndex === 'number'
        ? ex.bugLineIndex
        : typeof catEx.bugLineIndex === 'number'
        ? catEx.bugLineIndex
        : 0;

    availableOptions = lines.map((line, idx) => {
      const isBug = idx === bugIdx;
      const isUser = params.selectedBugLineIndex === idx;
      return `Línea ${idx + 1}: ${line}${isBug ? '  <-- [Bug configurado en sistema]' : ''}${
        isUser ? '  <-- [Tocada por el alumno]' : ''
      }`;
    });

    if (Array.isArray(catEx.codeSnippet)) {
      originalOptions = catEx.codeSnippet.map((l: string, idx: number) => `Línea ${idx + 1}: ${l}`);
    }

    expectedSolutionText = `Línea ${bugIdx + 1}: "${(lines[bugIdx] || '').trim()}"`;

    if (typeof params.selectedBugLineIndex === 'number') {
      userResolvedAnswer = `Línea ${params.selectedBugLineIndex + 1}: "${(lines[params.selectedBugLineIndex] || '').trim()}"`;
    } else if (userResolvedAnswer && /^Línea\s+(\d+)$/i.test(userResolvedAnswer.trim())) {
      const m = userResolvedAnswer.trim().match(/^Línea\s+(\d+)$/i);
      if (m) {
        const idx = parseInt(m[1], 10) - 1;
        if (lines[idx]) {
          userResolvedAnswer = `Línea ${idx + 1}: "${lines[idx].trim()}"`;
        }
      }
    }

    spotTheBugData = {
      displayedLines: lines,
      bugLineIndex: bugIdx,
      selectedLineIndex: params.selectedBugLineIndex ?? null,
      eliminatedLines: params.eliminatedBugLines
    };
  } else if (type === 'parsons_puzzle') {
    const rawLines: string[] = Array.isArray(ex.lines)
      ? ex.lines
      : Array.isArray(catEx.lines)
      ? catEx.lines
      : [];
    const correctOrder: number[] = Array.isArray(ex.correctOrder)
      ? ex.correctOrder
      : Array.isArray(catEx.correctOrder)
      ? catEx.correctOrder
      : rawLines.map((_, i) => i);

    // En ParsonsPuzzleComponent el orden inicial mostrado al alumno es el reverso: len - 1 - i
    const initialScrambledOrder = Array.from({ length: rawLines.length }, (_, i) => rawLines.length - 1 - i);
    const activeOrder =
      Array.isArray(params.parsonsOrder) && params.parsonsOrder.length > 0
        ? params.parsonsOrder
        : initialScrambledOrder;

    const displayedLines = initialScrambledOrder.map((lineIdx, pos) => `Posición inicial ${pos + 1}: ${rawLines[lineIdx] || ''}`);
    const userOrderLines = activeOrder.map((lineIdx, pos) => `${pos + 1}. ${rawLines[lineIdx] || ''}`);
    const expectedOrderLines = correctOrder.map((lineIdx, pos) => `${pos + 1}. ${rawLines[lineIdx] || ''}`);

    availableOptions = rawLines.map(
      (line, idx) => `Bloque [Índice ${idx}]: ${line}`
    );
    originalOptions = [...availableOptions];

    expectedSolutionText = expectedOrderLines.join('  -->  ');
    if (Array.isArray(params.parsonsOrder) && params.parsonsOrder.length > 0) {
      userResolvedAnswer = userOrderLines.join('  -->  ');
    }

    parsonsData = {
      displayedLines,
      userOrderLines,
      expectedOrderLines
    };
  } else if (type === 'flowchart_builder') {
    const blocks: any[] = Array.isArray(ex.blocks)
      ? ex.blocks
      : Array.isArray(catEx.blocks)
      ? catEx.blocks
      : [];
    const correctOrder: number[] = Array.isArray(ex.correctOrder)
      ? ex.correctOrder
      : Array.isArray(catEx.correctOrder)
      ? catEx.correctOrder
      : blocks.map((_, i) => i);

    const shapeLabel = (s?: string) =>
      s === 'terminal' ? 'ÓVALO' : s === 'io' ? 'PARALELOGRAMO (E/S)' : s === 'process' ? 'RECTÁNGULO (PROCESO)' : 'ROMBO (DECISIÓN)';

    const getScrambledFlowOrder = (len: number) => {
      if (len <= 1) return [0];
      const ord: number[] = [];
      const mid = Math.floor(len / 2);
      ord.push(mid);
      for (let i = 0; i < len; i++) {
        if (i !== mid) ord.push(i);
      }
      return ord;
    };

    const initialOrder = getScrambledFlowOrder(blocks.length);
    const activeOrder =
      Array.isArray(params.flowchartOrder) && params.flowchartOrder.length > 0
        ? params.flowchartOrder
        : initialOrder;

    const displayedBlocks = initialOrder.map((bIdx, pos) => {
      const b = blocks[bIdx];
      return b ? `Posición inicial ${pos + 1}: [${shapeLabel(b.shape)}] "${b.text}"${b.detail ? ` (${b.detail})` : ''}` : '';
    });

    const userOrderBlocks = activeOrder.map((bIdx, pos) => {
      const b = blocks[bIdx];
      return b ? `${pos + 1}. [${shapeLabel(b.shape)}] "${b.text}"` : '';
    });

    const expectedOrderBlocks = correctOrder.map((bIdx, pos) => {
      const b = blocks[bIdx];
      return b ? `${pos + 1}. [${shapeLabel(b.shape)}] "${b.text}"` : '';
    });

    availableOptions = blocks.map(
      (b, idx) => `Bloque [Índice ${idx}] (${shapeLabel(b.shape)}): "${b.text}"${b.detail ? ` - ${b.detail}` : ''}`
    );
    originalOptions = [...availableOptions];

    expectedSolutionText = expectedOrderBlocks.join('  -->  ');
    if (Array.isArray(params.flowchartOrder) && params.flowchartOrder.length > 0) {
      userResolvedAnswer = userOrderBlocks.join('  -->  ');
    }

    flowchartData = {
      displayedBlocks,
      userOrderBlocks,
      expectedOrderBlocks,
      targetProblem: ex.targetProblem || catEx.targetProblem,
      flowTitle: ex.flowTitle || catEx.flowTitle
    };
  } else if (type === 'trace_step') {
    const iterations: { iteration: number; expectedVariables: Record<string, string> }[] =
      Array.isArray(ex.iterations)
        ? ex.iterations
        : Array.isArray(catEx.iterations)
        ? catEx.iterations
        : [];

    const expectedSummary = iterations.map(it => {
      const vars = Object.entries(it.expectedVariables || {})
        .map(([k, v]) => `${k} = ${v}`)
        .join(', ');
      return `Paso ${it.iteration}: ${vars}`;
    });

    availableOptions = [...expectedSummary];
    originalOptions = [...expectedSummary];
    expectedSolutionText = expectedSummary.join(' | ');

    let userSummary: string[] | undefined;
    if (params.traceUserValues && Object.keys(params.traceUserValues).length > 0) {
      userSummary = iterations.map(it => {
        const uVars = params.traceUserValues?.[it.iteration] || {};
        const vars = Object.keys(it.expectedVariables || {})
          .map(k => `${k} = ${uVars[k] ?? '(vacío)'}`)
          .join(', ');
        return `Paso ${it.iteration}: ${vars}`;
      });
      userResolvedAnswer = userSummary.join(' | ');
    }

    traceStepData = {
      expectedSummary,
      userSummary
    };
  }

  return {
    type,
    prompt,
    instructionText,
    codeSnippet: codeSnippet.trim() || undefined,
    availableOptions,
    originalOptions,
    originalExplanation: ex.explanation || catEx.explanation || undefined,
    expectedSolutionText: expectedSolutionText || ex.explanation || catEx.explanation || 'Solución predeterminada',
    userResolvedAnswer: userResolvedAnswer?.trim() || undefined,
    matchingPairsData,
    codeBuilderData,
    spotTheBugData,
    parsonsData,
    flowchartData,
    traceStepData
  };
}

/**
 * Enriquecedor retroactivo: toma cualquier QuestionReport (incluso los reportados en el pasado
 * que tenían datos incompletos en Firestore) y les inyecta toda la información del catálogo:
 * enunciado, código, opciones exactas (4 opciones, relación, completar, etc.), solución y archivo fuente.
 */
export function enrichQuestionReportWithCatalog(report: QuestionReport): QuestionReport {
  if (!report) return report;

  const match = resolveExerciseFromCatalog(report.exerciseId, report.pathId, report.lessonId);
  const catalogEx = match?.exercise;

  const extracted = extractComprehensiveExerciseDetails({
    exercise: catalogEx || {
      id: report.exerciseId,
      type: report.exerciseType,
      prompt: report.prompt,
      code: report.codeSnippet,
      options: report.availableOptions,
      explanation: report.feedbackExplanation
    },
    catalogExercise: catalogEx,
    userAnswer: report.userAnswer
  });

  // Si el reporte ya traía las opciones exactas barajadas que vio el alumno, las conservamos;
  // si estaba vacío (ej: reportes antiguos de matching_pairs, spot_the_bug, parsons, etc.), usamos las extraídas del catálogo.
  const finalAvailableOptions =
    Array.isArray(report.availableOptions) && report.availableOptions.length > 0
      ? report.availableOptions
      : extracted.availableOptions;

  return {
    ...report,
    pathId: report.pathId || match?.pathId || 'kotlin',
    unitId: report.unitId ?? match?.unitId,
    lessonId: report.lessonId && report.lessonId !== 'unknown_lesson' ? report.lessonId : (match?.lessonId || 'unknown_lesson'),
    lessonTitle:
      report.lessonTitle && report.lessonTitle !== 'Lección en curso'
        ? report.lessonTitle
        : (match?.lessonTitle || 'Lección en curso'),
    exerciseType: report.exerciseType || extracted.type,
    sourceFileHint: report.sourceFileHint || match?.sourceFileHint,
    prompt:
      report.prompt && report.prompt !== 'Sin enunciado'
        ? report.prompt
        : extracted.prompt,
    instructionText: report.instructionText || extracted.instructionText,
    codeSnippet: report.codeSnippet || extracted.codeSnippet,
    availableOptions: finalAvailableOptions,
    originalOptions: report.originalOptions || extracted.originalOptions,
    originalExplanation: report.originalExplanation || extracted.originalExplanation,
    expectedSolution:
      report.expectedSolution && report.expectedSolution !== 'Solución predeterminada'
        ? report.expectedSolution
        : extracted.expectedSolutionText,
    matchingPairsData: report.matchingPairsData || extracted.matchingPairsData,
    codeBuilderData: report.codeBuilderData || extracted.codeBuilderData,
    spotTheBugData: report.spotTheBugData || extracted.spotTheBugData,
    parsonsData: report.parsonsData || extracted.parsonsData,
    flowchartData: report.flowchartData || extracted.flowchartData,
    traceStepData: report.traceStepData || extracted.traceStepData
  };
}

/**
 * Genera el contenido de archivo .TXT estructurado y exhaustivo para pegar directamente
 * en el asistente y resolver de golpe todas las preguntas reportadas seleccionadas.
 */
export function formatReportsAsTxt(reports: QuestionReport[]): string {
  const enrichedList = reports.map(enrichQuestionReportWithCatalog);
  const nowStr = new Date().toLocaleString();

  const lines: string[] = [];
  lines.push('================================================================================');
  lines.push('REPORTE TÉCNICO DE PREGUNTAS PARA CORRECCIÓN AUTOMÁTICA EN CÓDIGO');
  lines.push(`Fecha de exportación: ${nowStr}`);
  lines.push(`Total de preguntas seleccionadas para corregir: ${enrichedList.length}`);
  lines.push('================================================================================');
  lines.push('');

  enrichedList.forEach((rep, idx) => {
    const reporters =
      Array.isArray(rep.reporters) && rep.reporters.length > 0
        ? rep.reporters
        : [
            {
              studentId: rep.studentId,
              studentName: rep.studentName || 'Estudiante',
              studentCode: rep.studentCode,
              studentEmail: rep.studentEmail,
              reason: rep.reason,
              reasonLabel: rep.reasonLabel,
              comment: rep.comment,
              userAnswer: rep.userAnswer,
              availableOptions: rep.availableOptions,
              timestamp: rep.timestamp
            }
          ];

    lines.push(`################################################################################`);
    lines.push(`PREGUNTA #${idx + 1} DE ${enrichedList.length}  |  ID: ${rep.exerciseId}`);
    lines.push(`################################################################################`);
    lines.push(`• ID de la Pregunta (exerciseId): ${rep.exerciseId}`);
    lines.push(`• Ruta / Lenguaje: ${(rep.pathId || 'kotlin').toUpperCase()}${rep.unitId ? ` - Unidad ${rep.unitId}` : ''}`);
    lines.push(`• Lección: ${rep.lessonId} ("${rep.lessonTitle}")`);
    if (rep.sourceFileHint) {
      lines.push(`• Ubicación en código fuente: ${rep.sourceFileHint}`);
    }
    lines.push(`• Tipo de ejercicio (exerciseType): ${rep.exerciseType}`);
    lines.push(`• Estado actual del reporte: ${rep.status.toUpperCase()} (${reporters.length} ${reporters.length === 1 ? 'reporte' : 'reportes'})`);
    lines.push('');

    lines.push('[1. PREGUNTA / ENUNCIADO QUE LE SALE AL ESTUDIANTE]');
    lines.push(`Enunciado (prompt): ${rep.prompt}`);
    if (rep.instructionText) {
      lines.push(`Instrucción en pantalla: ${rep.instructionText}`);
    }
    if (rep.flowchartData?.targetProblem) {
      lines.push(`Problema objetivo del diagrama: ${rep.flowchartData.targetProblem}`);
    }
    lines.push('');

    if (rep.codeSnippet) {
      lines.push('[2. CÓDIGO / SNIPPET MOSTRADO EN PANTALLA]');
      rep.codeSnippet.split('\n').forEach((cLine, cIdx) => {
        lines.push(`  ${String(cIdx + 1).padStart(2, ' ')}. ${cLine}`);
      });
      lines.push('');
    }

    lines.push('[3. OPCIONES DE RESPUESTA TAL CUAL LE SALEN AL ESTUDIANTE]');
    if (rep.matchingPairsData) {
      lines.push('  Formato: Relación de Columnas (matching_pairs)');
      lines.push('  Columna Izquierda (tal cual sale de arriba a abajo):');
      rep.matchingPairsData.leftColumn.forEach((item, i) => {
        lines.push(`    ${i + 1}. ${item}`);
      });
      lines.push('  Columna Derecha (tal cual sale en pantalla):');
      rep.matchingPairsData.rightColumn.forEach((item, i) => {
        lines.push(`    ${String.fromCharCode(65 + i)}. ${item}`);
      });
      lines.push('  Parejas correctas configuradas en el sistema:');
      rep.matchingPairsData.expectedPairs.forEach((p, i) => {
        lines.push(`    Par ${i + 1}: "${p.left}"  ===>  "${p.right}"`);
      });
    } else if (rep.codeBuilderData) {
      lines.push('  Formato: Construcción con Fichas / Completar (code_builder)');
      lines.push(`  Fichas/Tokens que le salen en el banco al alumno (${rep.codeBuilderData.displayedTokens.length} fichas):`);
      lines.push(`    ${rep.codeBuilderData.displayedTokens.map((t, i) => `[${i + 1}] "${t}"`).join('  |  ')}`);
      lines.push(`  Secuencia correcta esperada (solution): ${rep.codeBuilderData.expectedSolution.join(' ')}`);
      if (rep.codeBuilderData.acceptableAlternatives && rep.codeBuilderData.acceptableAlternatives.length > 0) {
        lines.push(
          `  Alternativas aceptadas: ${rep.codeBuilderData.acceptableAlternatives.map(a => a.join(' ')).join('  ||  ')}`
        );
      }
    } else if (rep.spotTheBugData) {
      lines.push('  Formato: Caza de Errores tocando la línea (spot_the_bug)');
      lines.push('  Líneas de código que le salen al estudiante:');
      rep.spotTheBugData.displayedLines.forEach((l, i) => {
        const isSysBug = i === rep.spotTheBugData?.bugLineIndex;
        const isUsrLine = i === rep.spotTheBugData?.selectedLineIndex;
        lines.push(
          `    Línea ${i + 1}: ${l}${isSysBug ? '  <-- [BUG CONFIGURADO EN SISTEMA (bugLineIndex=' + i + ')]' : ''}${
            isUsrLine ? '  <-- [LÍNEA MARCADA POR EL ALUMNO]' : ''
          }`
        );
      });
    } else if (rep.parsonsData) {
      lines.push('  Formato: Ordenar bloques de código (parsons_puzzle)');
      lines.push('  Bloques que le salen al estudiante:');
      rep.parsonsData.displayedLines.forEach(l => lines.push(`    • ${l}`));
      lines.push('  Orden en que los dejó el estudiante:');
      rep.parsonsData.userOrderLines.forEach(l => lines.push(`    ${l}`));
      lines.push('  Orden correcto configurado en el sistema:');
      rep.parsonsData.expectedOrderLines.forEach(l => lines.push(`    ${l}`));
    } else if (rep.flowchartData) {
      lines.push('  Formato: Diagrama de Flujo (flowchart_builder)');
      lines.push('  Bloques que le salen al estudiante:');
      rep.flowchartData.displayedBlocks.forEach(b => lines.push(`    • ${b}`));
      lines.push('  Orden en que los dejó el estudiante:');
      rep.flowchartData.userOrderBlocks.forEach(b => lines.push(`    ${b}`));
      lines.push('  Orden correcto configurado en el sistema:');
      rep.flowchartData.expectedOrderBlocks.forEach(b => lines.push(`    ${b}`));
    } else if (rep.traceStepData) {
      lines.push('  Formato: Seguimiento de Variables paso a paso (trace_step)');
      lines.push('  Valores esperados por paso en el sistema:');
      rep.traceStepData.expectedSummary.forEach(s => lines.push(`    • ${s}`));
      if (rep.traceStepData.userSummary && rep.traceStepData.userSummary.length > 0) {
        lines.push('  Valores ingresados por el estudiante:');
        rep.traceStepData.userSummary.forEach(s => lines.push(`    • ${s}`));
      }
    } else if (rep.availableOptions && rep.availableOptions.length > 0) {
      lines.push(`  Formato: Opciones de selección (${rep.exerciseType})`);
      rep.availableOptions.forEach((opt, oIdx) => {
        const letter = String.fromCharCode(65 + oIdx);
        const isSys =
          rep.expectedSolution.includes(opt.replace(/\s*\[Descartada.*$/, '').trim()) ||
          rep.expectedSolution.includes(`Opción ${letter}`);
        const isUsr =
          rep.userAnswer &&
          (rep.userAnswer.includes(opt.replace(/\s*\[Descartada.*$/, '').trim()) ||
            rep.userAnswer.includes(`Opción ${letter}`));
        lines.push(
          `    Opción ${letter}: ${opt}${isSys ? '  <-- [CORRECTA SEGÚN EL SISTEMA]' : ''}${
            isUsr ? '  <-- [MARCADA POR EL ALUMNO]' : ''
          }`
        );
      });
    } else {
      lines.push('  (Sin opciones adicionales registradas)');
    }
    lines.push('');

    if (rep.originalOptions && rep.originalOptions.length > 0 && (rep.exerciseType === 'predict_output' || rep.exerciseType === 'code_cloze')) {
      lines.push('[4. OPCIONES ORIGINALES EN EL ARCHIVO FUENTE (SIN BARAJAR)]');
      rep.originalOptions.forEach((opt, oIdx) => {
        lines.push(`    Índice [${oIdx}] (Opción ${String.fromCharCode(65 + oIdx)} original): ${opt}`);
      });
      lines.push('');
    }

    lines.push('[5. SOLUCIÓN Y EXPLICACIÓN CONFIGURADAS EN EL SISTEMA]');
    lines.push(`• Solución esperada en sistema: ${rep.expectedSolution}`);
    lines.push(`• Respuesta que marcó el alumno: ${rep.userAnswer || '(No había marcado opción al abrir el reporte)'}`);
    if (rep.feedbackExplanation || rep.originalExplanation) {
      lines.push(`• Explicación del sistema (explanation): ${rep.feedbackExplanation || rep.originalExplanation}`);
    }
    lines.push('');

    lines.push('[6. REPORTES Y COMENTARIOS DE LOS ESTUDIANTES]');
    reporters.forEach((r, rIdx) => {
      const dateStr = r.timestamp ? new Date(r.timestamp).toLocaleString() : 'Fecha desconocida';
      lines.push(
        `  (${rIdx + 1}) Estudiante: ${r.studentName}${r.studentCode ? ` (${r.studentCode})` : ''} - ${dateStr}`
      );
      lines.push(`      Motivo reportado: ${r.reasonLabel} (${r.reason})`);
      lines.push(`      Qué marcó este alumno: ${r.userAnswer || '(Sin respuesta marcada)'}`);
      if (r.availableOptions && r.availableOptions.length > 0) {
        lines.push(
          `      Opciones exactas en su pantalla en ese momento: ${r.availableOptions
            .map((o, i) => `[${String.fromCharCode(65 + i)}] ${o}`)
            .join(' | ')}`
        );
      }
      if (r.comment) {
        lines.push(`      Comentario del alumno: "${r.comment}"`);
      }
    });

    if (rep.adminNotes) {
      lines.push('');
      lines.push(`[NOTA PREVIA DEL DOCENTE]: ${rep.adminNotes}`);
    }

    lines.push('');
    lines.push('');
  });

  return lines.join('\n');
}

