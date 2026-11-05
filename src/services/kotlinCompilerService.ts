import {
  KotlinFile,
  KotlinRunResult,
  KotlinCompilerError,
  KotlinExercise,
  KotlinAutoCheckResult,
  KotlinAutoCheckItem
} from '../types/kotlinLab';
import { tryRunKotlinLocally } from './kotlinLocalRunner';

export const SUPPORTED_KOTLIN_VERSIONS = [
  { id: '2.1.0', label: 'Kotlin 2.1.0 (Reciente)' },
  { id: '2.0.21', label: 'Kotlin 2.0.21 (Estable)' },
  { id: '1.9.24', label: 'Kotlin 1.9.24 (LTS)' }
];

export const DEFAULT_KOTLIN_VERSION = '2.0.21';

// Caché en memoria de compilaciones recientes para respuesta instantánea
const compilationResultCache = new Map<string, KotlinRunResult>();

/**
 * Limpia los tags XML de streaming (<outStream>, <errStream>) del motor de JetBrains
 */
export function cleanKotlinStreamOutput(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/<outStream>/g, '')
    .replace(/<\/outStream>/g, '')
    .replace(/<errStream>/g, '')
    .replace(/<\/errStream>/g, '')
    .trimEnd();
}

/**
 * Ejecuta código Kotlin combinando ejecución instantánea en el navegador (< 10ms)
 * para código estándar de Kotlin y compilación remota paralela en la API de JetBrains para casos avanzados.
 */
export async function runKotlinCode(
  files: KotlinFile[],
  args: string = '',
  version: string = DEFAULT_KOTLIN_VERSION
): Promise<KotlinRunResult> {
  const startTime = performance.now();

  // 1. Revisar caché de compilación para ejecuciones repetidas (instantáneo)
  const cacheKey = JSON.stringify({
    v: version,
    a: args.trim(),
    f: files.map(f => [f.name, f.content])
  });

  const cached = compilationResultCache.get(cacheKey);
  if (cached) {
    return {
      ...cached,
      executionTimeMs: Math.max(1, Math.round(performance.now() - startTime))
    };
  }

  // 2. Vía rápida local (< 10ms) para programas estándar de Kotlin
  const localResult = tryRunKotlinLocally(files, args, version);
  if (localResult !== null) {
    compilationResultCache.set(cacheKey, localResult);
    return localResult;
  }

  // 3. Fallback a la API oficial de Kotlin Playground en paralelo (sin esperas secuenciales)
  const payload = {
    args: args.trim(),
    files: files.map(f => ({
      name: f.name.endsWith('.kt') ? f.name : `${f.name}.kt`,
      text: f.content
    }))
  };

  const primaryEndpoints = [
    `https://api.kotlinlang.org/api/${version}/compiler/run`,
    `https://api.kotlinlang.org/api/2.0.21/compiler/run`,
    `/api/kotlin-compiler/${version}/compiler/run`
  ];

  // Evitar duplicados si version === '2.0.21'
  const uniqueEndpoints = Array.from(new Set(primaryEndpoints));

  let lastError: Error | null = null;
  let responseData: any = null;

  const fetchEndpoint = async (endpoint: string): Promise<any> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  };

  try {
    responseData = await Promise.any(uniqueEndpoints.map(ep => fetchEndpoint(ep)));
  } catch (aggErr: any) {
    lastError = aggErr?.errors?.[0] || aggErr;
  }

  const executionTimeMs = Math.round(performance.now() - startTime);

  if (!responseData) {
    return {
      output: '',
      rawText: '',
      errors: [
        {
          fileName: files[0]?.name || 'File.kt',
          line: 1,
          column: 1,
          message:
            lastError?.message ||
            'No se pudo conectar con el servidor de compilación de Kotlin. Verifica tu conexión a internet.',
          severity: 'ERROR'
        }
      ],
      exception: null,
      executionTimeMs,
      success: false,
      compilerVersion: version
    };
  }

  // Extraer errores de compilación
  const compilerErrors: KotlinCompilerError[] = [];
  if (responseData.errors && typeof responseData.errors === 'object') {
    Object.entries(responseData.errors).forEach(([fileName, fileErrors]) => {
      if (Array.isArray(fileErrors)) {
        fileErrors.forEach((err: any) => {
          compilerErrors.push({
            fileName,
            line: (err.interval?.start?.line ?? 0) + 1, // 0-indexed a 1-indexed
            column: (err.interval?.start?.ch ?? 0) + 1,
            message: err.message || 'Error de compilación desconocido',
            severity: err.severity === 'WARNING' ? 'WARNING' : 'ERROR'
          });
        });
      }
    });
  }

  const cleanedOutput = cleanKotlinStreamOutput(responseData.text || '');
  const hasErrors = compilerErrors.some(e => e.severity === 'ERROR');
  const hasException = Boolean(responseData.exception);

  const finalResult: KotlinRunResult = {
    output: cleanedOutput,
    rawText: responseData.text || '',
    errors: compilerErrors,
    exception: responseData.exception || null,
    executionTimeMs,
    success: !hasErrors && !hasException,
    compilerVersion: version
  };

  compilationResultCache.set(cacheKey, finalResult);
  return finalResult;
}

/**
 * Evalúa automáticamente un ejercicio de Kotlin comparando el código y la salida
 */
export function evaluateKotlinExercise(
  code: string,
  exercise: KotlinExercise,
  result: KotlinRunResult
): KotlinAutoCheckResult {
  const checks: KotlinAutoCheckItem[] = [];

  // Verificación 1: Compilación exitosa
  const hasErrors = result.errors.some(e => e.severity === 'ERROR');
  checks.push({
    description: 'El código compila sin errores de sintaxis ni de tipos',
    passed: !hasErrors,
    details: hasErrors
      ? result.errors
          .filter(e => e.severity === 'ERROR')
          .map(e => `Línea ${e.line}: ${e.message}`)
          .join('\n')
      : 'Compilación 100% limpia en Kotlin JVM'
  });

  // Verificación 2: Ejecución sin excepciones en tiempo de ejecución
  const hasException = Boolean(result.exception);
  checks.push({
    description: 'El programa finaliza sin lanzar excepciones no controladas',
    passed: !hasException,
    details: hasException
      ? `${result.exception?.fullName}: ${result.exception?.message}`
      : 'Ejecución completada con éxito'
  });

  // Verificaciones específicas de los casos de prueba del ejercicio
  exercise.testCases.forEach(testCase => {
    let passed = true;
    let details = 'Condición satisfecha con éxito';

    // 1. Verificación de salida requerida
    if (testCase.expectedOutputSubstring) {
      const normalizedOutput = result.output.toLowerCase().trim();
      const normalizedExpected = testCase.expectedOutputSubstring.toLowerCase().trim();
      const contains = normalizedOutput.includes(normalizedExpected);
      if (!contains) {
        passed = false;
        details = `Se esperaba ver en la consola: "${testCase.expectedOutputSubstring}". Salida actual: "${result.output.trim()}"`;
      }
    }

    // 2. Verificación de salida prohibida
    if (passed && testCase.forbiddenOutputSubstring) {
      const containsForbidden = result.output
        .toLowerCase()
        .includes(testCase.forbiddenOutputSubstring.toLowerCase());
      if (containsForbidden) {
        passed = false;
        details = `La salida no debe contener: "${testCase.forbiddenOutputSubstring}"`;
      }
    }

    // 3. Verificación de expresión regular en salida
    if (passed && testCase.regexMatch) {
      const reg = new RegExp(testCase.regexMatch, 'i');
      if (!reg.test(result.output)) {
        passed = false;
        details = `El formato de salida no coincide con el patrón esperado.`;
      }
    }

    // 4. Verificación de construcción o patrón en el código fuente
    if (passed && testCase.codePattern) {
      const reg = new RegExp(testCase.codePattern, 'm');
      if (!reg.test(code)) {
        passed = false;
        details = testCase.codeRequiredPatternDescription ||
          `El código debe utilizar la estructura o palabra clave requerida.`;
      }
    }

    checks.push({
      description: testCase.description,
      passed,
      details
    });
  });

  const passedCount = checks.filter(c => c.passed).length;
  const totalCount = checks.length;
  const allPassed = passedCount === totalCount;
  const score = Math.round((passedCount / totalCount) * 100);

  return {
    passed: allPassed,
    score,
    maxScore: 100,
    checks
  };
}
