/**
 * Helper para construir de forma estricta los 10 retos pedagógicos de cada lección
 */

export function buildLessonExercises(pathId, unitId, levelId, title, challenges) {
  const uPad = String(unitId).padStart(2, '0');
  const lPad = String(levelId).padStart(2, '0');
  const prefix = pathId === 'kotlin' ? 'kt' : 'sql';

  return challenges.map((ch, idx) => {
    const exNum = String(idx + 1).padStart(2, '0');
    const id = `${prefix}-u${uPad}-l${lPad}-e${exNum}`;

    if (ch.type === 'predict_output') {
      return {
        id,
        type: 'predict_output',
        prompt: ch.prompt || `¿Cuál es el resultado de evaluar la siguiente expresión de ${pathId === 'kotlin' ? 'Kotlin' : 'SQL'}?`,
        code: ch.code || '',
        options: ch.options,
        correctOptionIndex: ch.correctIndex ?? 0,
        explanation: ch.explanation || 'Evaluación lógica y secuencial según las reglas del lenguaje.',
        xpReward: 10
      };
    }

    if (ch.type === 'code_cloze') {
      return {
        id,
        type: 'code_cloze',
        prompt: ch.prompt,
        codeWithBlank: ch.blank || ch.prompt,
        options: ch.options,
        correctOption: ch.correctOption,
        explanation: ch.explanation || 'Sintaxis y palabras clave del lenguaje.',
        xpReward: 10
      };
    }

    if (ch.type === 'code_builder') {
      return {
        id,
        type: 'code_builder',
        prompt: ch.prompt || `Ordena los bloques para formar la instrucción correcta:`,
        tokens: ch.tokens,
        solution: ch.solution,
        explanation: ch.explanation || 'Construcción gramatical correcta respetando el orden lógico.',
        xpReward: 15
      };
    }

    if (ch.type === 'spot_the_bug') {
      return {
        id,
        type: 'spot_the_bug',
        prompt: ch.prompt || `Identifica la línea que contiene el error en este código:`,
        codeSnippet: ch.lines,
        bugLineIndex: ch.bugIndex ?? 0,
        explanation: ch.explanation || 'Detectar y corregir el error previene fallos de ejecución o compilación.',
        xpReward: 15
      };
    }

    if (ch.type === 'matching_pairs') {
      return {
        id,
        type: 'matching_pairs',
        prompt: ch.prompt || `Empareja cada concepto con su definición correcta:`,
        pairs: ch.pairs,
        explanation: ch.explanation || 'Relación conceptual clave para dominar este tema.',
        xpReward: 15
      };
    }

    throw new Error(`Tipo de ejercicio no soportado: ${ch.type}`);
  });
}
