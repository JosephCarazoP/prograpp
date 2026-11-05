import { KotlinFile, KotlinRunResult, KotlinCompilerError } from '../types/kotlinLab';

/**
 * Representación interna de valores tipados en Kotlin para preservar
 * semántica exacta de JVM (Int vs Double, Data Classes, Listas, Nulls).
 */
export type KtValue =
  | { kind: 'int'; value: number }
  | { kind: 'double'; value: number }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'string'; value: string }
  | { kind: 'null' }
  | { kind: 'unit' }
  | { kind: 'list'; elements: KtValue[]; mutable: boolean }
  | { kind: 'set'; elements: KtValue[]; mutable: boolean }
  | { kind: 'map'; entries: { key: KtValue; value: KtValue }[]; mutable: boolean }
  | { kind: 'range'; start: number; end: number; step: number; inclusive: boolean }
  | { kind: 'pair'; first: KtValue; second: KtValue }
  | {
      kind: 'object';
      className: string;
      isData: boolean;
      props: Map<string, { value: KtValue; mutable: boolean }>;
      propOrder: string[];
    }
  | {
      kind: 'lambda';
      paramNames: string[];
      bodySource: string;
      closure: Env;
    };

class KtRuntimeException extends Error {
  public fullName: string;
  public line: number;
  constructor(fullName: string, message: string, line: number = 1) {
    super(message);
    this.fullName = fullName;
    this.line = line;
  }
}

class KtCompileError extends Error {
  public line: number;
  public column: number;
  constructor(message: string, line: number = 1, column: number = 1) {
    super(message);
    this.line = line;
    this.column = column;
  }
}

class KtReturnSignal {
  public value: KtValue;
  constructor(value: KtValue) {
    this.value = value;
  }
}

class KtBreakSignal {}
class KtContinueSignal {}

class UnsupportedKotlinFeatureError extends Error {
  constructor(reason: string) {
    super(reason);
  }
}

interface VarBinding {
  value: KtValue;
  mutable: boolean;
}

class Env {
  private vars = new Map<string, VarBinding>();
  public parent: Env | null;

  constructor(parent: Env | null = null) {
    this.parent = parent;
  }

  define(name: string, value: KtValue, mutable: boolean): void {
    this.vars.set(name, { value, mutable });
  }

  get(name: string, line = 1): KtValue {
    if (this.vars.has(name)) {
      return this.vars.get(name)!.value;
    }
    if (this.parent) {
      return this.parent.get(name, line);
    }
    throw new KtCompileError(`Unresolved reference: ${name}`, line, 1);
  }

  has(name: string): boolean {
    if (this.vars.has(name)) return true;
    return this.parent ? this.parent.has(name) : false;
  }

  assign(name: string, value: KtValue, line = 1): void {
    if (this.vars.has(name)) {
      const binding = this.vars.get(name)!;
      if (!binding.mutable) {
        throw new KtCompileError(`Val cannot be reassigned`, line, 1);
      }
      binding.value = value;
      return;
    }
    if (this.parent) {
      this.parent.assign(name, value, line);
      return;
    }
    throw new KtCompileError(`Unresolved reference: ${name}`, line, 1);
  }
}

interface KtParamDecl {
  name: string;
  type?: string;
  defaultExpr?: string;
  isProperty?: boolean;
  mutable?: boolean;
}

interface KtFunctionDecl {
  name: string;
  params: KtParamDecl[];
  body: string;
  isSingleExpr: boolean;
}

interface KtClassDecl {
  name: string;
  isData: boolean;
  constructorParams: KtParamDecl[];
  methods: Map<string, KtFunctionDecl>;
  bodyProperties: { name: string; mutable: boolean; initExpr: string }[];
}

export function ktToString(v: KtValue): string {
  switch (v.kind) {
    case 'int':
      return String(Math.trunc(v.value));
    case 'double': {
      if (Number.isNaN(v.value)) return 'NaN';
      if (!Number.isFinite(v.value)) return v.value > 0 ? 'Infinity' : '-Infinity';
      return Number.isInteger(v.value) ? v.value.toFixed(1) : String(v.value);
    }
    case 'boolean':
      return v.value ? 'true' : 'false';
    case 'string':
      return v.value;
    case 'null':
      return 'null';
    case 'unit':
      return 'kotlin.Unit';
    case 'list':
    case 'set':
      return `[${v.elements.map(ktToString).join(', ')}]`;
    case 'map':
      return `{${v.entries.map(e => `${ktToString(e.key)}=${ktToString(e.value)}`).join(', ')}}`;
    case 'pair':
      return `(${ktToString(v.first)}, ${ktToString(v.second)})`;
    case 'range':
      return `${v.start}..${v.end}`;
    case 'object': {
      if (v.isData) {
        const parts = v.propOrder.map(k => {
          const prop = v.props.get(k);
          return `${k}=${prop ? ktToString(prop.value) : 'null'}`;
        });
        return `${v.className}(${parts.join(', ')})`;
      }
      return `${v.className}@${Math.abs(hashString(v.className)).toString(16)}`;
    }
    case 'lambda':
      return 'Function';
  }
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
}

export function ktEquals(a: KtValue, b: KtValue): boolean {
  if (a.kind === 'null' && b.kind === 'null') return true;
  if (a.kind === 'null' || b.kind === 'null') return false;
  if ((a.kind === 'int' || a.kind === 'double') && (b.kind === 'int' || b.kind === 'double')) {
    return a.value === b.value;
  }
  if (a.kind !== b.kind) return false;
  if (a.kind === 'string' && b.kind === 'string') return a.value === b.value;
  if (a.kind === 'boolean' && b.kind === 'boolean') return a.value === b.value;
  if (a.kind === 'list' && b.kind === 'list') {
    if (a.elements.length !== b.elements.length) return false;
    return a.elements.every((el, idx) => ktEquals(el, b.elements[idx]));
  }
  if (a.kind === 'object' && b.kind === 'object') {
    if (a.className !== b.className) return false;
    return ktToString(a) === ktToString(b);
  }
  return false;
}

/**
 * Elimina comentarios de línea (//) y bloque (/* ... * /) respetando cadenas literales
 */
function stripCommentsPreservingLines(code: string): string {
  let result = '';
  let i = 0;
  let inString = false;
  let inTripleString = false;

  while (i < code.length) {
    if (!inString && code.startsWith('"""', i)) {
      inTripleString = !inTripleString;
      result += '"""';
      i += 3;
      continue;
    }
    if (!inTripleString && code[i] === '"') {
      let backslashes = 0;
      let j = i - 1;
      while (j >= 0 && code[j] === '\\') {
        backslashes++;
        j--;
      }
      if (backslashes % 2 === 0) {
        inString = !inString;
      }
      result += code[i];
      i++;
      continue;
    }

    if (!inString && !inTripleString) {
      if (code[i] === '/' && code[i + 1] === '/') {
        while (i < code.length && code[i] !== '\n') {
          i++;
        }
        continue;
      }
      if (code[i] === '/' && code[i + 1] === '*') {
        i += 2;
        while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) {
          if (code[i] === '\n') result += '\n';
          i++;
        }
        i += 2;
        continue;
      }
    }

    result += code[i];
    i++;
  }

  return result;
}

/**
 * Encuentra el índice de cierre de un bloque delimitado por '{', '(' o '['
 */
function findMatchingDelimiter(
  text: string,
  openIndex: number,
  openChar: string,
  closeChar: string
): number {
  let depth = 0;
  let inStr = false;
  for (let i = openIndex; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      let bs = 0;
      let j = i - 1;
      while (j >= 0 && text[j] === '\\') {
        bs++;
        j--;
      }
      if (bs % 2 === 0) {
        // Si estamos dentro de ${...} en una cadena, manejar profundidad
        inStr = !inStr;
      }
    }
    if (!inStr) {
      if (c === openChar) depth++;
      else if (c === closeChar) {
        depth--;
        if (depth === 0) return i;
      }
    } else if (c === '$' && text[i + 1] === '{') {
      // Saltar bloque ${...} interno para no confundir comillas internas
      const closeInterp = findMatchingBraceInTemplate(text, i + 1);
      if (closeInterp !== -1) {
        i = closeInterp;
      }
    }
  }
  return -1;
}

function findMatchingBraceInTemplate(text: string, openBraceIdx: number): number {
  let depth = 0;
  let inInnerStr = false;
  for (let i = openBraceIdx; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      let bs = 0;
      let j = i - 1;
      while (j >= 0 && text[j] === '\\') {
        bs++;
        j--;
      }
      if (bs % 2 === 0) inInnerStr = !inInnerStr;
    } else if (!inInnerStr) {
      if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) return i;
      }
    }
  }
  return -1;
}

/**
 * Divide una lista de argumentos o sentencias por un separador de nivel superior
 */
function splitTopLevel(text: string, separator: string): string[] {
  const parts: string[] = [];
  let current = '';
  let parenDepth = 0;
  let braceDepth = 0;
  let bracketDepth = 0;
  let inStr = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];

    if (c === '"') {
      let bs = 0;
      let j = i - 1;
      while (j >= 0 && text[j] === '\\') {
        bs++;
        j--;
      }
      if (bs % 2 === 0) inStr = !inStr;
      current += c;
      continue;
    }

    if (inStr) {
      if (c === '$' && text[i + 1] === '{') {
        const endIdx = findMatchingBraceInTemplate(text, i + 1);
        if (endIdx !== -1) {
          current += text.slice(i, endIdx + 1);
          i = endIdx;
          continue;
        }
      }
      current += c;
      continue;
    }

    if (c === '(') parenDepth++;
    else if (c === ')') parenDepth = Math.max(0, parenDepth - 1);
    else if (c === '{') braceDepth++;
    else if (c === '}') braceDepth = Math.max(0, braceDepth - 1);
    else if (c === '[') bracketDepth++;
    else if (c === ']') bracketDepth = Math.max(0, bracketDepth - 1);

    if (
      parenDepth === 0 &&
      braceDepth === 0 &&
      bracketDepth === 0 &&
      text.startsWith(separator, i)
    ) {
      parts.push(current);
      current = '';
      i += separator.length - 1;
      continue;
    }

    current += c;
  }

  if (current.length > 0 || parts.length > 0) {
    parts.push(current);
  }
  return parts;
}

/**
 * Divide un bloque de código Kotlin en sentencias individuales respetando
 * bloques { ... }, paréntesis ( ... ) y continuaciones de línea (.filter, .map, +, etc.)
 */
function splitKotlinStatements(blockCode: string): string[] {
  const statements: string[] = [];
  let current = '';
  let parenDepth = 0;
  let braceDepth = 0;
  let bracketDepth = 0;
  let inStr = false;

  const lines = blockCode.split(/\r?\n/);

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const rawLine = lines[lineIdx];
    const trimmedNext = (lines[lineIdx + 1] || '').trim();

    for (let i = 0; i < rawLine.length; i++) {
      const c = rawLine[i];

      if (c === '"') {
        let bs = 0;
        let j = i - 1;
        while (j >= 0 && rawLine[j] === '\\') {
          bs++;
          j--;
        }
        if (bs % 2 === 0) inStr = !inStr;
        current += c;
        continue;
      }

      if (inStr) {
        if (c === '$' && rawLine[i + 1] === '{') {
          const endIdx = findMatchingBraceInTemplate(rawLine, i + 1);
          if (endIdx !== -1) {
            current += rawLine.slice(i, endIdx + 1);
            i = endIdx;
            continue;
          }
        }
        current += c;
        continue;
      }

      if (c === '(') parenDepth++;
      else if (c === ')') parenDepth = Math.max(0, parenDepth - 1);
      else if (c === '{') braceDepth++;
      else if (c === '}') braceDepth = Math.max(0, braceDepth - 1);
      else if (c === '[') bracketDepth++;
      else if (c === ']') bracketDepth = Math.max(0, bracketDepth - 1);

      if (c === ';' && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
        if (current.trim()) statements.push(current.trim());
        current = '';
        continue;
      }

      current += c;
    }

    const curTrimmed = current.trim();
    const continuesOnNextLine =
      parenDepth > 0 ||
      braceDepth > 0 ||
      bracketDepth > 0 ||
      inStr ||
      trimmedNext.startsWith('{') ||
      trimmedNext.startsWith('.') ||
      trimmedNext.startsWith('?:') ||
      trimmedNext.startsWith('else') ||
      trimmedNext.startsWith('catch') ||
      trimmedNext.startsWith('finally') ||
      /[+\-*/%=&|,?:]$/.test(curTrimmed);

    if (continuesOnNextLine) {
      current += '\n';
    } else if (curTrimmed) {
      statements.push(curTrimmed);
      current = '';
    }
  }

  if (current.trim()) {
    statements.push(current.trim());
  }

  return statements;
}

function parseParamList(paramsRaw: string): KtParamDecl[] {
  if (!paramsRaw.trim()) return [];
  const items = splitTopLevel(paramsRaw, ',');
  return items
    .map(raw => {
      const s = raw.trim();
      if (!s) return null;
      let isProperty = false;
      let mutable = false;
      let rest = s;
      if (rest.startsWith('val ')) {
        isProperty = true;
        mutable = false;
        rest = rest.slice(4).trim();
      } else if (rest.startsWith('var ')) {
        isProperty = true;
        mutable = true;
        rest = rest.slice(4).trim();
      }

      const eqParts = splitTopLevel(rest, '=');
      const left = eqParts[0].trim();
      const defaultExpr = eqParts.length > 1 ? eqParts.slice(1).join('=').trim() : undefined;

      const colonIdx = left.indexOf(':');
      const name = (colonIdx >= 0 ? left.slice(0, colonIdx) : left).trim();
      const type = colonIdx >= 0 ? left.slice(colonIdx + 1).trim() : undefined;

      return { name, type, defaultExpr, isProperty, mutable } as KtParamDecl;
    })
    .filter((p): p is KtParamDecl => p !== null);
}

/**
 * Intérprete rápido de Kotlin en memoria para ejecución instantánea en el navegador
 */
class LocalKotlinInterpreter {
  private functions = new Map<string, KtFunctionDecl>();
  private classes = new Map<string, KtClassDecl>();
  private globalEnv = new Env();
  private outputBuffer: string[] = [];
  private stepCount = 0;
  private readonly MAX_STEPS = 50000;

  private tick() {
    this.stepCount++;
    if (this.stepCount > this.MAX_STEPS) {
      throw new KtRuntimeException(
        'java.lang.StackOverflowError',
        'Tiempo o número máximo de iteraciones excedido (posible bucle infinito).'
      );
    }
  }

  public run(files: KotlinFile[], args: string): string {
    const combinedCode = files.map(f => f.content).join('\n\n');
    const cleanCode = stripCommentsPreservingLines(combinedCode);

    // Verificar balance básico de llaves y paréntesis
    this.validateBalancedDelimiters(cleanCode);

    // Extraer declaraciones de nivel superior (funciones, clases, interfaces, val/var globales)
    this.parseTopLevel(cleanCode);

    const mainFn = this.functions.get('main');
    if (!mainFn) {
      throw new KtCompileError('No se encontró la función principal "fun main()" en el programa.', 1, 1);
    }

    const argTokens = args.trim() ? args.trim().split(/\s+/) : [];
    const argsListVal: KtValue = {
      kind: 'list',
      elements: argTokens.map(a => ({ kind: 'string', value: a })),
      mutable: false
    };

    this.invokeFunction(mainFn, [argsListVal], new Map(), this.globalEnv);
    return this.outputBuffer.join('');
  }

  private validateBalancedDelimiters(code: string) {
    let braces = 0;
    let parens = 0;
    let inStr = false;
    let line = 1;

    for (let i = 0; i < code.length; i++) {
      const c = code[i];
      if (c === '\n') line++;
      if (c === '"') {
        let bs = 0;
        let j = i - 1;
        while (j >= 0 && code[j] === '\\') {
          bs++;
          j--;
        }
        if (bs % 2 === 0) inStr = !inStr;
      } else if (!inStr) {
        if (c === '{') braces++;
        else if (c === '}') {
          braces--;
          if (braces < 0) throw new KtCompileError('Llave de cierre "}" inesperada', line, 1);
        } else if (c === '(') parens++;
        else if (c === ')') {
          parens--;
          if (parens < 0) throw new KtCompileError('Paréntesis de cierre ")" inesperado', line, 1);
        }
      }
    }

    if (inStr) {
      throw new KtCompileError('Cadena de texto sin cerrar (\")', line, 1);
    }
    if (braces !== 0) {
      throw new KtCompileError('Falta cerrar una llave "}" en el código', line, 1);
    }
    if (parens !== 0) {
      throw new KtCompileError('Falta cerrar un paréntesis ")" en el código', line, 1);
    }
  }

  private parseTopLevel(code: string) {
    const stmts = splitKotlinStatements(code);

    for (const stmt of stmts) {
      const s = stmt.trim();
      if (!s || s.startsWith('package ') || s.startsWith('import ')) continue;

      // Ignorar interfaces (sus métodos se implementan en las clases)
      if (/^interface\s+[A-Za-z_]\w*/.test(s)) {
        continue;
      }

      // data class o class
      const classMatch = s.match(/^(data\s+)?class\s+([A-Za-z_]\w*)/);
      if (classMatch) {
        this.parseClassDecl(s, Boolean(classMatch[1]), classMatch[2]);
        continue;
      }

      // fun nombre(...)
      const funMatch = s.match(/^(?:override\s+|private\s+|public\s+|internal\s+)?fun\s+([A-Za-z_]\w*)\s*\(/);
      if (funMatch) {
        const fnDecl = this.parseFunctionDecl(s);
        this.functions.set(fnDecl.name, fnDecl);
        continue;
      }

      // Propiedad global (const val / val / var)
      if (/^(?:const\s+)?(val|var)\s+/.test(s)) {
        this.executeStatement(s.replace(/^const\s+/, ''), this.globalEnv);
        continue;
      }

      throw new UnsupportedKotlinFeatureError(`Declaración de nivel superior avanzada: ${s.slice(0, 40)}`);
    }
  }

  private parseFunctionDecl(src: string): KtFunctionDecl {
    const funMatch = src.match(/^(?:override\s+|private\s+|public\s+|internal\s+)?fun\s+([A-Za-z_]\w*)\s*\(/);
    if (!funMatch) {
      throw new UnsupportedKotlinFeatureError(`Función no reconocida: ${src}`);
    }
    const name = funMatch[1];
    const openParenIdx = src.indexOf('(', funMatch[0].length - 1);
    const closeParenIdx = findMatchingDelimiter(src, openParenIdx, '(', ')');
    if (closeParenIdx === -1) {
      throw new KtCompileError(`Paréntesis sin cerrar en función ${name}`);
    }

    const paramsRaw = src.slice(openParenIdx + 1, closeParenIdx);
    const params = parseParamList(paramsRaw);

    const afterParams = src.slice(closeParenIdx + 1).trim();

    // Buscar cuerpo { ... } o expresión = ...
    const openBraceIdx = this.findTopLevelChar(afterParams, '{');
    const eqIdx = this.findTopLevelChar(afterParams, '=');

    if (openBraceIdx !== -1 && (eqIdx === -1 || openBraceIdx < eqIdx)) {
      const closeBraceIdx = findMatchingDelimiter(afterParams, openBraceIdx, '{', '}');
      const body = afterParams.slice(openBraceIdx + 1, closeBraceIdx);
      return { name, params, body, isSingleExpr: false };
    } else if (eqIdx !== -1) {
      const body = afterParams.slice(eqIdx + 1).trim();
      return { name, params, body, isSingleExpr: true };
    }

    return { name, params, body: '', isSingleExpr: false };
  }

  private parseClassDecl(src: string, isData: boolean, className: string) {
    let rest = src.replace(/^(data\s+)?class\s+[A-Za-z_]\w*\s*/, '');
    let constructorParams: KtParamDecl[] = [];

    if (rest.startsWith('(')) {
      const closeParen = findMatchingDelimiter(rest, 0, '(', ')');
      if (closeParen !== -1) {
        constructorParams = parseParamList(rest.slice(1, closeParen));
        rest = rest.slice(closeParen + 1).trim();
      }
    }

    const methods = new Map<string, KtFunctionDecl>();
    const bodyProperties: { name: string; mutable: boolean; initExpr: string }[] = [];

    const openBrace = this.findTopLevelChar(rest, '{');
    if (openBrace !== -1) {
      const closeBrace = findMatchingDelimiter(rest, openBrace, '{', '}');
      if (closeBrace !== -1) {
        const classBody = rest.slice(openBrace + 1, closeBrace);
        const memberStmts = splitKotlinStatements(classBody);
        for (const mStmt of memberStmts) {
          const ms = mStmt.trim();
          if (!ms) continue;
          if (/^(?:override\s+|private\s+|public\s+)?fun\s+/.test(ms)) {
            const fn = this.parseFunctionDecl(ms);
            methods.set(fn.name, fn);
          } else if (/^(val|var)\s+/.test(ms)) {
            const isVar = ms.startsWith('var ');
            const afterKw = ms.slice(4).trim();
            const eqParts = splitTopLevel(afterKw, '=');
            const left = eqParts[0].trim();
            const colonIdx = left.indexOf(':');
            const propName = (colonIdx >= 0 ? left.slice(0, colonIdx) : left).trim();
            const initExpr = eqParts.length > 1 ? eqParts.slice(1).join('=').trim() : 'null';
            bodyProperties.push({ name: propName, mutable: isVar, initExpr });
          }
        }
      }
    }

    this.classes.set(className, {
      name: className,
      isData,
      constructorParams,
      methods,
      bodyProperties
    });
  }

  private findTopLevelChar(text: string, target: string): number {
    let p = 0;
    let b = 0;
    let k = 0;
    let inS = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        let bs = 0;
        let j = i - 1;
        while (j >= 0 && text[j] === '\\') {
          bs++;
          j--;
        }
        if (bs % 2 === 0) inS = !inS;
      } else if (!inS) {
        if (p === 0 && b === 0 && k === 0 && text.startsWith(target, i)) {
          return i;
        }
        if (c === '(') p++;
        else if (c === ')') p = Math.max(0, p - 1);
        else if (c === '{') b++;
        else if (c === '}') b = Math.max(0, b - 1);
        else if (c === '[') k++;
        else if (c === ']') k = Math.max(0, k - 1);
      }
    }
    return -1;
  }

  private invokeFunction(
    fn: KtFunctionDecl,
    positionalArgs: KtValue[],
    namedArgs: Map<string, KtValue>,
    callerEnv: Env
  ): KtValue {
    this.tick();
    const fnEnv = new Env(callerEnv);

    fn.params.forEach((param, idx) => {
      let val: KtValue | undefined;
      if (namedArgs.has(param.name)) {
        val = namedArgs.get(param.name);
      } else if (idx < positionalArgs.length) {
        val = positionalArgs[idx];
      } else if (param.defaultExpr !== undefined) {
        val = this.evalExpr(param.defaultExpr, fnEnv);
      } else if (fn.name === 'main') {
        val = { kind: 'list', elements: [], mutable: false };
      } else {
        throw new KtCompileError(`Falta el argumento para el parámetro "${param.name}" en ${fn.name}()`);
      }
      fnEnv.define(param.name, val!, false);
    });

    if (fn.isSingleExpr) {
      return this.evalExpr(fn.body, fnEnv);
    }

    try {
      this.executeBlock(fn.body, fnEnv);
    } catch (sig) {
      if (sig instanceof KtReturnSignal) {
        return sig.value;
      }
      throw sig;
    }

    return { kind: 'unit' };
  }

  private instantiateClass(
    cls: KtClassDecl,
    positionalArgs: KtValue[],
    namedArgs: Map<string, KtValue>,
    env: Env
  ): KtValue {
    const props = new Map<string, { value: KtValue; mutable: boolean }>();
    const propOrder: string[] = [];
    const instanceEnv = new Env(this.globalEnv);

    cls.constructorParams.forEach((param, idx) => {
      let val: KtValue | undefined;
      if (namedArgs.has(param.name)) {
        val = namedArgs.get(param.name);
      } else if (idx < positionalArgs.length) {
        val = positionalArgs[idx];
      } else if (param.defaultExpr !== undefined) {
        val = this.evalExpr(param.defaultExpr, env);
      } else {
        throw new KtCompileError(`Falta argumento para "${param.name}" al construir ${cls.name}`);
      }

      if (param.type === 'Double' && val!.kind === 'int') {
        val = { kind: 'double', value: val!.value };
      }

      props.set(param.name, { value: val!, mutable: Boolean(param.mutable) });
      propOrder.push(param.name);
      instanceEnv.define(param.name, val!, Boolean(param.mutable));
    });

    for (const bp of cls.bodyProperties) {
      const val = this.evalExpr(bp.initExpr, instanceEnv);
      props.set(bp.name, { value: val, mutable: bp.mutable });
      propOrder.push(bp.name);
    }

    return {
      kind: 'object',
      className: cls.name,
      isData: cls.isData,
      props,
      propOrder
    };
  }

  private executeBlock(blockCode: string, env: Env): KtValue {
    const stmts = splitKotlinStatements(blockCode);
    let lastVal: KtValue = { kind: 'unit' };
    for (const stmt of stmts) {
      lastVal = this.executeStatement(stmt, env);
    }
    return lastVal;
  }

  private executeStatement(rawStmt: string, env: Env): KtValue {
    this.tick();
    const stmt = rawStmt.trim();
    if (!stmt) return { kind: 'unit' };

    // return
    if (stmt === 'return' || stmt.startsWith('return ')) {
      const expr = stmt.slice(6).trim();
      const val = expr ? this.evalExpr(expr, env) : ({ kind: 'unit' } as KtValue);
      throw new KtReturnSignal(val);
    }

    // break / continue
    if (stmt === 'break') throw new KtBreakSignal();
    if (stmt === 'continue') throw new KtContinueSignal();

    // val / var declaration
    const varMatch = stmt.match(/^(val|var)\s+([A-Za-z_]\w*)\s*(?::\s*([^=]+?))?\s*=\s*([\s\S]+)$/);
    if (varMatch) {
      const mutable = varMatch[1] === 'var';
      const varName = varMatch[2];
      const declaredType = varMatch[3]?.trim();
      const rhs = varMatch[4].trim();
      let val = this.evalExpr(rhs, env);

      if (declaredType) {
        const cleanType = declaredType.replace(/\?$/, '');
        if (cleanType === 'Double' && val.kind === 'int') {
          val = { kind: 'double', value: val.value };
        }
      }

      env.define(varName, val, mutable);
      return { kind: 'unit' };
    }

    // Bucle for: for (i in ...) { ... }
    if (/^for\s*\(/.test(stmt)) {
      return this.executeForLoop(stmt, env);
    }

    // Bucle while: while (...) { ... }
    if (/^while\s*\(/.test(stmt)) {
      return this.executeWhileLoop(stmt, env);
    }

    // Estructura if / else
    if (/^if\s*\(/.test(stmt)) {
      return this.evalIfExpr(stmt, env);
    }

    // Estructura when
    if (/^when\b/.test(stmt)) {
      return this.evalWhenExpr(stmt, env);
    }

    // Estructura try / catch
    if (/^try\s*\{/.test(stmt)) {
      return this.evalTryExpr(stmt, env);
    }

    // Incremento / Decremento sufijo o prefijo: x++, ++x, x--, --x
    const incMatch = stmt.match(/^(?:(\+\+|--)([A-Za-z_]\w*)|([A-Za-z_]\w*)(\+\+|--))$/);
    if (incMatch) {
      const varName = incMatch[2] || incMatch[3];
      const op = incMatch[1] || incMatch[4];
      const cur = env.get(varName);
      if (cur.kind !== 'int' && cur.kind !== 'double') {
        throw new KtCompileError(`Operador ${op} no aplicable a ${cur.kind}`);
      }
      const delta = op === '++' ? 1 : -1;
      env.assign(varName, { kind: cur.kind, value: cur.value + delta });
      return { kind: 'unit' };
    }

    // Asignaciones compuestas: +=, -=, *=, /=, %=
    const compoundMatch = stmt.match(/^([A-Za-z_]\w*)\s*(\+=|-=|\*=|\/=|%=)\s*([\s\S]+)$/);
    if (compoundMatch) {
      const varName = compoundMatch[1];
      const op = compoundMatch[2][0];
      const rhs = this.evalExpr(compoundMatch[3], env);
      const cur = env.get(varName);
      if (cur.kind === 'list' && cur.mutable && op === '+') {
        cur.elements.push(rhs);
        return { kind: 'unit' };
      }
      const updated = this.applyBinaryOp(op, cur, rhs);
      env.assign(varName, updated);
      return { kind: 'unit' };
    }

    // Asignación indexada: arr[i] = val
    const indexAssignMatch = stmt.match(/^([A-Za-z_]\w*)\[([^\]]+)\]\s*=\s*([\s\S]+)$/);
    if (indexAssignMatch) {
      const target = env.get(indexAssignMatch[1]);
      const idxOrKey = this.evalExpr(indexAssignMatch[2], env);
      const newVal = this.evalExpr(indexAssignMatch[3], env);
      if (target.kind === 'list') {
        if (!target.mutable) throw new KtCompileError('No se puede modificar una lista inmutable (usa mutableListOf)');
        if (idxOrKey.kind === 'int') {
          target.elements[idxOrKey.value] = newVal;
        }
        return { kind: 'unit' };
      }
      if (target.kind === 'map') {
        if (!target.mutable) throw new KtCompileError('No se puede modificar un mapa inmutable (usa mutableMapOf)');
        const existing = target.entries.find(e => ktEquals(e.key, idxOrKey));
        if (existing) existing.value = newVal;
        else target.entries.push({ key: idxOrKey, value: newVal });
        return { kind: 'unit' };
      }
    }

    // Asignación simple: x = expr o obj.prop = expr
    const eqIdx = this.findSingleEquals(stmt);
    if (eqIdx !== -1) {
      const lhs = stmt.slice(0, eqIdx).trim();
      const rhs = stmt.slice(eqIdx + 1).trim();
      const val = this.evalExpr(rhs, env);

      if (/^[A-Za-z_]\w*$/.test(lhs)) {
        env.assign(lhs, val);
        return { kind: 'unit' };
      }
      const dotIdx = lhs.lastIndexOf('.');
      if (dotIdx > 0) {
        const objExpr = lhs.slice(0, dotIdx).trim();
        const propName = lhs.slice(dotIdx + 1).trim();
        const obj = this.evalExpr(objExpr, env);
        if (obj.kind === 'object') {
          const p = obj.props.get(propName);
          if (!p) throw new KtCompileError(`Unresolved reference: ${propName}`);
          if (!p.mutable) throw new KtCompileError(`Val cannot be reassigned`);
          p.value = val;
          return { kind: 'unit' };
        }
      }
    }

    return this.evalExpr(stmt, env);
  }

  private findSingleEquals(text: string): number {
    let p = 0;
    let b = 0;
    let k = 0;
    let inS = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        let bs = 0;
        let j = i - 1;
        while (j >= 0 && text[j] === '\\') {
          bs++;
          j--;
        }
        if (bs % 2 === 0) inS = !inS;
      } else if (!inS) {
        if (c === '(') p++;
        else if (c === ')') p = Math.max(0, p - 1);
        else if (c === '{') b++;
        else if (c === '}') b = Math.max(0, b - 1);
        else if (c === '[') k++;
        else if (c === ']') k = Math.max(0, k - 1);
        else if (
          c === '=' &&
          p === 0 &&
          b === 0 &&
          k === 0 &&
          text[i - 1] !== '=' &&
          text[i - 1] !== '!' &&
          text[i - 1] !== '<' &&
          text[i - 1] !== '>' &&
          text[i - 1] !== '+' &&
          text[i - 1] !== '-' &&
          text[i - 1] !== '*' &&
          text[i - 1] !== '/' &&
          text[i - 1] !== '%' &&
          text[i + 1] !== '=' &&
          text[i + 1] !== '>'
        ) {
          return i;
        }
      }
    }
    return -1;
  }

  private executeForLoop(stmt: string, env: Env): KtValue {
    const openParen = stmt.indexOf('(');
    const closeParen = findMatchingDelimiter(stmt, openParen, '(', ')');
    const header = stmt.slice(openParen + 1, closeParen).trim();
    const bodyPart = stmt.slice(closeParen + 1).trim();

    const inMatch = header.match(/^(\([A-Za-z_]\w*\s*,\s*[A-Za-z_]\w*\)|[A-Za-z_]\w*)\s+in\s+([\s\S]+)$/);
    if (!inMatch) {
      throw new UnsupportedKotlinFeatureError(`Sintaxis de for no soportada: ${header}`);
    }

    const varSpec = inMatch[1].trim();
    const iterableExpr = inMatch[2].trim();
    const iterableVal = this.evalExpr(iterableExpr, env);

    const items: KtValue[] = this.expandIterable(iterableVal);

    const isBlock = bodyPart.startsWith('{') && bodyPart.endsWith('}');
    const loopBody = isBlock ? bodyPart.slice(1, -1) : bodyPart;

    for (let idx = 0; idx < items.length; idx++) {
      this.tick();
      const loopEnv = new Env(env);
      if (varSpec.startsWith('(') && varSpec.endsWith(')')) {
        const names = varSpec
          .slice(1, -1)
          .split(',')
          .map(n => n.trim());
        const item = items[idx];
        if (item.kind === 'pair') {
          loopEnv.define(names[0], item.first, false);
          loopEnv.define(names[1], item.second, false);
        } else {
          loopEnv.define(names[0], { kind: 'int', value: idx }, false);
          loopEnv.define(names[1], item, false);
        }
      } else {
        loopEnv.define(varSpec, items[idx], false);
      }

      try {
        this.executeBlock(loopBody, loopEnv);
      } catch (sig) {
        if (sig instanceof KtBreakSignal) break;
        if (sig instanceof KtContinueSignal) continue;
        throw sig;
      }
    }

    return { kind: 'unit' };
  }

  private expandIterable(val: KtValue): KtValue[] {
    if (val.kind === 'list' || val.kind === 'set') {
      return [...val.elements];
    }
    if (val.kind === 'string') {
      return val.value.split('').map(ch => ({ kind: 'string', value: ch }));
    }
    if (val.kind === 'range') {
      const res: KtValue[] = [];
      const step = val.step;
      if (step > 0) {
        const limit = val.inclusive ? val.end : val.end - 1;
        for (let v = val.start; v <= limit; v += step) {
          res.push({ kind: 'int', value: v });
        }
      } else if (step < 0) {
        const limit = val.inclusive ? val.end : val.end + 1;
        for (let v = val.start; v >= limit; v += step) {
          res.push({ kind: 'int', value: v });
        }
      }
      return res;
    }
    throw new UnsupportedKotlinFeatureError(`Tipo no iterable en bucle for: ${val.kind}`);
  }

  private executeWhileLoop(stmt: string, env: Env): KtValue {
    const openParen = stmt.indexOf('(');
    const closeParen = findMatchingDelimiter(stmt, openParen, '(', ')');
    const condExpr = stmt.slice(openParen + 1, closeParen).trim();
    const bodyPart = stmt.slice(closeParen + 1).trim();
    const isBlock = bodyPart.startsWith('{') && bodyPart.endsWith('}');
    const loopBody = isBlock ? bodyPart.slice(1, -1) : bodyPart;

    while (true) {
      this.tick();
      const condVal = this.evalExpr(condExpr, env);
      if (condVal.kind !== 'boolean' || !condVal.value) break;
      const loopEnv = new Env(env);
      try {
        this.executeBlock(loopBody, loopEnv);
      } catch (sig) {
        if (sig instanceof KtBreakSignal) break;
        if (sig instanceof KtContinueSignal) continue;
        throw sig;
      }
    }
    return { kind: 'unit' };
  }

  private evalIfExpr(expr: string, env: Env): KtValue {
    const openParen = expr.indexOf('(');
    const closeParen = findMatchingDelimiter(expr, openParen, '(', ')');
    const condStr = expr.slice(openParen + 1, closeParen).trim();
    const afterCond = expr.slice(closeParen + 1).trim();

    let thenPart = '';
    let elsePart: string | null = null;

    if (afterCond.startsWith('{')) {
      const closeThen = findMatchingDelimiter(afterCond, 0, '{', '}');
      thenPart = afterCond.slice(1, closeThen);
      const rem = afterCond.slice(closeThen + 1).trim();
      if (rem.startsWith('else')) {
        elsePart = rem.replace(/^else\b\s*/, '').trim();
      }
    } else {
      const elseIdx = this.findTopLevelKeyword(afterCond, 'else');
      if (elseIdx !== -1) {
        thenPart = afterCond.slice(0, elseIdx).trim();
        elsePart = afterCond.slice(elseIdx + 4).trim();
      } else {
        thenPart = afterCond;
      }
    }

    const condVal = this.evalExpr(condStr, env);
    if (condVal.kind === 'boolean' && condVal.value) {
      const branchEnv = new Env(env);
      return this.executeBlock(thenPart, branchEnv);
    } else if (elsePart !== null) {
      const branchEnv = new Env(env);
      if (elsePart.startsWith('{') && elsePart.endsWith('}')) {
        return this.executeBlock(elsePart.slice(1, -1), branchEnv);
      }
      return this.executeBlock(elsePart, branchEnv);
    }

    return { kind: 'unit' };
  }

  private evalWhenExpr(expr: string, env: Env): KtValue {
    let rest = expr.replace(/^when\b\s*/, '').trim();
    let subjectVal: KtValue | null = null;

    if (rest.startsWith('(')) {
      const closeParen = findMatchingDelimiter(rest, 0, '(', ')');
      const subjExpr = rest.slice(1, closeParen).trim();
      subjectVal = this.evalExpr(subjExpr, env);
      rest = rest.slice(closeParen + 1).trim();
    }

    if (!rest.startsWith('{')) {
      throw new KtCompileError('Se esperaba "{" en la expresión when');
    }
    const closeBrace = findMatchingDelimiter(rest, 0, '{', '}');
    const body = rest.slice(1, closeBrace);
    const branches = splitKotlinStatements(body);

    for (const branch of branches) {
      const arrowIdx = this.findTopLevelChar(branch, '->');
      if (arrowIdx === -1) continue;
      const condPart = branch.slice(0, arrowIdx).trim();
      const resultPart = branch.slice(arrowIdx + 2).trim();

      const executeBranchResult = (): KtValue => {
        const bEnv = new Env(env);
        if (resultPart.startsWith('{') && resultPart.endsWith('}')) {
          return this.executeBlock(resultPart.slice(1, -1), bEnv);
        }
        return this.executeStatement(resultPart, bEnv);
      };

      if (condPart === 'else') {
        return executeBranchResult();
      }

      const subConditions = splitTopLevel(condPart, ',');
      for (const scRaw of subConditions) {
        const sc = scRaw.trim();
        if (subjectVal !== null) {
          if (sc.startsWith('in ')) {
            const rangeVal = this.evalExpr(sc.slice(3).trim(), env);
            if (this.checkInOperator(subjectVal, rangeVal)) {
              return executeBranchResult();
            }
          } else if (sc.startsWith('!in ')) {
            const rangeVal = this.evalExpr(sc.slice(4).trim(), env);
            if (!this.checkInOperator(subjectVal, rangeVal)) {
              return executeBranchResult();
            }
          } else {
            const targetVal = this.evalExpr(sc, env);
            if (ktEquals(subjectVal, targetVal)) {
              return executeBranchResult();
            }
          }
        } else {
          const bVal = this.evalExpr(sc, env);
          if (bVal.kind === 'boolean' && bVal.value) {
            return executeBranchResult();
          }
        }
      }
    }

    return { kind: 'unit' };
  }

  private evalTryExpr(expr: string, env: Env): KtValue {
    const openTry = expr.indexOf('{');
    const closeTry = findMatchingDelimiter(expr, openTry, '{', '}');
    const tryBody = expr.slice(openTry + 1, closeTry);
    const afterTry = expr.slice(closeTry + 1).trim();

    let catchParam = 'e';
    let catchBody: string | null = null;
    let finallyBody: string | null = null;

    if (afterTry.startsWith('catch')) {
      let rem = afterTry.replace(/^catch\b\s*/, '').trim();
      if (rem.startsWith('(')) {
        const closeP = findMatchingDelimiter(rem, 0, '(', ')');
        const pContent = rem.slice(1, closeP).trim();
        const colonIdx = pContent.indexOf(':');
        catchParam = (colonIdx >= 0 ? pContent.slice(0, colonIdx) : pContent).trim();
        rem = rem.slice(closeP + 1).trim();
      }
      if (rem.startsWith('{')) {
        const closeC = findMatchingDelimiter(rem, 0, '{', '}');
        catchBody = rem.slice(1, closeC);
        rem = rem.slice(closeC + 1).trim();
      }
      if (rem.startsWith('finally')) {
        rem = rem.replace(/^finally\b\s*/, '').trim();
        if (rem.startsWith('{')) {
          const closeF = findMatchingDelimiter(rem, 0, '{', '}');
          finallyBody = rem.slice(1, closeF);
        }
      }
    }

    try {
      const tryEnv = new Env(env);
      const res = this.executeBlock(tryBody, tryEnv);
      if (finallyBody !== null) {
        this.executeBlock(finallyBody, new Env(env));
      }
      return res;
    } catch (err) {
      if (err instanceof KtReturnSignal || err instanceof KtBreakSignal || err instanceof KtContinueSignal) {
        throw err;
      }
      if (catchBody !== null) {
        const catchEnv = new Env(env);
        const msg = err instanceof Error ? err.message : String(err);
        catchEnv.define(catchParam, { kind: 'string', value: msg }, false);
        const res = this.executeBlock(catchBody, catchEnv);
        if (finallyBody !== null) {
          this.executeBlock(finallyBody, new Env(env));
        }
        return res;
      }
      throw err;
    }
  }

  private findTopLevelKeyword(text: string, kw: string): number {
    let p = 0;
    let b = 0;
    let k = 0;
    let inS = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        let bs = 0;
        let j = i - 1;
        while (j >= 0 && text[j] === '\\') {
          bs++;
          j--;
        }
        if (bs % 2 === 0) inS = !inS;
      } else if (!inS) {
        if (c === '(') p++;
        else if (c === ')') p = Math.max(0, p - 1);
        else if (c === '{') b++;
        else if (c === '}') b = Math.max(0, b - 1);
        else if (c === '[') k++;
        else if (c === ']') k = Math.max(0, k - 1);

        if (p === 0 && b === 0 && k === 0 && text.startsWith(kw, i)) {
          const prev = text[i - 1] || ' ';
          const next = text[i + kw.length] || ' ';
          if (!/\w/.test(prev) && !/\w/.test(next)) {
            return i;
          }
        }
      }
    }
    return -1;
  }

  private evalExpr(rawExpr: string, env: Env): KtValue {
    this.tick();
    const expr = rawExpr.trim();
    if (!expr) return { kind: 'unit' };

    // Paréntesis envolventes completos
    if (expr.startsWith('(') && findMatchingDelimiter(expr, 0, '(', ')') === expr.length - 1) {
      return this.evalExpr(expr.slice(1, -1), env);
    }

    // Expresiones de control (if, when, try) usadas como valor
    if (/^if\s*\(/.test(expr)) return this.evalIfExpr(expr, env);
    if (/^when\b/.test(expr)) return this.evalWhenExpr(expr, env);
    if (/^try\s*\{/.test(expr)) return this.evalTryExpr(expr, env);

    // Operador Elvis ?:
    const elvisIdx = this.findTopLevelOperatorRightToLeft(expr, ['?:']);
    if (elvisIdx !== null) {
      const leftVal = this.evalExpr(expr.slice(0, elvisIdx.index), env);
      if (leftVal.kind !== 'null') return leftVal;
      return this.evalExpr(expr.slice(elvisIdx.index + 2), env);
    }

    // Operador lógico ||
    const orIdx = this.findTopLevelOperatorRightToLeft(expr, ['||']);
    if (orIdx !== null) {
      const l = this.evalExpr(expr.slice(0, orIdx.index), env);
      if (l.kind === 'boolean' && l.value) return { kind: 'boolean', value: true };
      const r = this.evalExpr(expr.slice(orIdx.index + 2), env);
      return { kind: 'boolean', value: r.kind === 'boolean' && r.value };
    }

    // Operador lógico &&
    const andIdx = this.findTopLevelOperatorRightToLeft(expr, ['&&']);
    if (andIdx !== null) {
      const l = this.evalExpr(expr.slice(0, andIdx.index), env);
      if (l.kind !== 'boolean' || !l.value) return { kind: 'boolean', value: false };
      const r = this.evalExpr(expr.slice(andIdx.index + 2), env);
      return { kind: 'boolean', value: r.kind === 'boolean' && r.value };
    }

    // Igualdad: ==, !=
    const eqOp = this.findTopLevelOperatorRightToLeft(expr, ['==', '!=']);
    if (eqOp !== null) {
      const l = this.evalExpr(expr.slice(0, eqOp.index), env);
      const r = this.evalExpr(expr.slice(eqOp.index + eqOp.op.length), env);
      const eq = ktEquals(l, r);
      return { kind: 'boolean', value: eqOp.op === '==' ? eq : !eq };
    }

    // Comparación y pertenencia: <=, >=, <, >, in, !in
    const cmpOp = this.findTopLevelOperatorRightToLeft(expr, ['<=', '>=', '<', '>']);
    if (cmpOp !== null) {
      const l = this.evalExpr(expr.slice(0, cmpOp.index), env);
      const r = this.evalExpr(expr.slice(cmpOp.index + cmpOp.op.length), env);
      return this.applyComparisonOp(cmpOp.op, l, r);
    }

    const inIdx = this.findTopLevelKeyword(expr, 'in');
    if (inIdx > 0) {
      const isNeg = expr.slice(0, inIdx).trimEnd().endsWith('!');
      const leftStr = isNeg
        ? expr.slice(0, inIdx).trimEnd().slice(0, -1)
        : expr.slice(0, inIdx);
      const rightStr = expr.slice(inIdx + 2);
      const lVal = this.evalExpr(leftStr, env);
      const rVal = this.evalExpr(rightStr, env);
      const inside = this.checkInOperator(lVal, rVal);
      return { kind: 'boolean', value: isNeg ? !inside : inside };
    }

    // Operadores de rango e infijos: step, downTo, until, .., to
    const stepIdx = this.findTopLevelKeyword(expr, 'step');
    if (stepIdx > 0) {
      const rangeVal = this.evalExpr(expr.slice(0, stepIdx), env);
      const stepVal = this.evalExpr(expr.slice(stepIdx + 4), env);
      if (rangeVal.kind === 'range' && stepVal.kind === 'int') {
        const absStep = Math.abs(stepVal.value);
        return {
          ...rangeVal,
          step: rangeVal.step < 0 ? -absStep : absStep
        };
      }
    }

    const downToIdx = this.findTopLevelKeyword(expr, 'downTo');
    if (downToIdx > 0) {
      const startVal = this.evalExpr(expr.slice(0, downToIdx), env);
      const endVal = this.evalExpr(expr.slice(downToIdx + 6), env);
      if (startVal.kind === 'int' && endVal.kind === 'int') {
        return {
          kind: 'range',
          start: startVal.value,
          end: endVal.value,
          step: -1,
          inclusive: true
        };
      }
    }

    const untilIdx = this.findTopLevelKeyword(expr, 'until');
    if (untilIdx > 0) {
      const startVal = this.evalExpr(expr.slice(0, untilIdx), env);
      const endVal = this.evalExpr(expr.slice(untilIdx + 5), env);
      if (startVal.kind === 'int' && endVal.kind === 'int') {
        return {
          kind: 'range',
          start: startVal.value,
          end: endVal.value,
          step: 1,
          inclusive: false
        };
      }
    }

    const rangeDotsIdx = this.findTopLevelOperatorRightToLeft(expr, ['..']);
    if (rangeDotsIdx !== null) {
      const startVal = this.evalExpr(expr.slice(0, rangeDotsIdx.index), env);
      const endVal = this.evalExpr(expr.slice(rangeDotsIdx.index + 2), env);
      if (startVal.kind === 'int' && endVal.kind === 'int') {
        return {
          kind: 'range',
          start: startVal.value,
          end: endVal.value,
          step: 1,
          inclusive: true
        };
      }
    }

    const toIdx = this.findTopLevelKeyword(expr, 'to');
    if (toIdx > 0) {
      const first = this.evalExpr(expr.slice(0, toIdx), env);
      const second = this.evalExpr(expr.slice(toIdx + 2), env);
      return { kind: 'pair', first, second };
    }

    // Suma y Resta: +, -
    const addOp = this.findTopLevelAdditive(expr);
    if (addOp !== null) {
      const l = this.evalExpr(expr.slice(0, addOp.index), env);
      const r = this.evalExpr(expr.slice(addOp.index + 1), env);
      return this.applyBinaryOp(addOp.op, l, r);
    }

    // Multiplicación, División, Módulo: *, /, %
    const mulOp = this.findTopLevelOperatorRightToLeft(expr, ['*', '/', '%']);
    if (mulOp !== null) {
      const l = this.evalExpr(expr.slice(0, mulOp.index), env);
      const r = this.evalExpr(expr.slice(mulOp.index + 1), env);
      return this.applyBinaryOp(mulOp.op, l, r);
    }

    // Operadores unarios: !, -, +
    if (expr.startsWith('!')) {
      const v = this.evalExpr(expr.slice(1), env);
      return { kind: 'boolean', value: v.kind === 'boolean' ? !v.value : false };
    }
    if (expr.startsWith('-') && !/^-\d/.test(expr)) {
      const v = this.evalExpr(expr.slice(1), env);
      if (v.kind === 'int') return { kind: 'int', value: -v.value };
      if (v.kind === 'double') return { kind: 'double', value: -v.value };
    }

    // Literales primitivos
    if (expr === 'null') return { kind: 'null' };
    if (expr === 'true') return { kind: 'boolean', value: true };
    if (expr === 'false') return { kind: 'boolean', value: false };

    if (/^-?\d+$/.test(expr)) {
      return { kind: 'int', value: parseInt(expr, 10) };
    }
    if (/^-?\d+\.\d+[fF]?$/.test(expr)) {
      return { kind: 'double', value: parseFloat(expr) };
    }

    // Cadena con soporte de interpolación "$x" y "${expr}"
    if (expr.startsWith('"') && expr.endsWith('"') && this.isSingleStringLiteral(expr)) {
      return { kind: 'string', value: this.evalStringTemplate(expr.slice(1, -1), env) };
    }

    // Cadena de llamadas encadenadas / acceso a propiedades / indexación (a.b().c[0])
    const chainResult = this.tryEvalPostfixChain(expr, env);
    if (chainResult !== null) {
      return chainResult;
    }

    // Llamada a función global o constructor de clase: fn(a, b) o fn(a) { lambda }
    const callMatch = expr.match(/^([A-Za-z_]\w*)\s*\(/);
    if (callMatch) {
      const fnName = callMatch[1];
      const openParen = expr.indexOf('(');
      const closeParen = findMatchingDelimiter(expr, openParen, '(', ')');
      if (closeParen === expr.length - 1) {
        const argsRaw = expr.slice(openParen + 1, closeParen);
        const { positional, named } = this.evalArgList(argsRaw, env);
        return this.evalGlobalCall(fnName, positional, named, env);
      }
    }

    // Identificador de variable
    if (/^[A-Za-z_]\w*$/.test(expr)) {
      return env.get(expr);
    }

    throw new UnsupportedKotlinFeatureError(`Expresión compleja no soportada localmente: ${expr}`);
  }

  private isSingleStringLiteral(expr: string): boolean {
    let i = 1;
    while (i < expr.length - 1) {
      if (expr[i] === '\\') {
        i += 2;
        continue;
      }
      if (expr[i] === '$' && expr[i + 1] === '{') {
        const closeIdx = findMatchingBraceInTemplate(expr, i + 1);
        if (closeIdx === -1) return false;
        i = closeIdx + 1;
        continue;
      }
      if (expr[i] === '"') {
        return false;
      }
      i++;
    }
    return true;
  }

  private evalStringTemplate(raw: string, env: Env): string {
    let out = '';
    let i = 0;

    while (i < raw.length) {
      if (raw[i] === '\\') {
        const next = raw[i + 1];
        if (next === 'n') out += '\n';
        else if (next === 't') out += '\t';
        else if (next === 'r') out += '\r';
        else if (next === '"') out += '"';
        else if (next === '$') out += '$';
        else if (next === '\\') out += '\\';
        else out += next || '';
        i += 2;
        continue;
      }

      if (raw[i] === '$') {
        if (raw[i + 1] === '{') {
          const closeIdx = findMatchingBraceInTemplate(raw, i + 1);
          if (closeIdx !== -1) {
            const innerExpr = raw.slice(i + 2, closeIdx);
            const val = this.evalExpr(innerExpr, env);
            out += ktToString(val);
            i = closeIdx + 1;
            continue;
          }
        } else {
          const idMatch = raw.slice(i + 1).match(/^([A-Za-z_]\w*)/);
          if (idMatch) {
            const varName = idMatch[1];
            const val = env.get(varName);
            out += ktToString(val);
            i += 1 + varName.length;
            continue;
          }
        }
      }

      out += raw[i];
      i++;
    }

    return out;
  }

  private tryEvalPostfixChain(expr: string, env: Env): KtValue | null {
    // Encontrar el último '.', '?.' o '[' de nivel superior
    let p = 0;
    let b = 0;
    let k = 0;
    let inS = false;
    let lastSplitIdx = -1;
    let splitType: 'dot' | 'safedot' | 'index' | null = null;

    for (let i = 0; i < expr.length; i++) {
      const c = expr[i];
      if (c === '"') {
        let bs = 0;
        let j = i - 1;
        while (j >= 0 && expr[j] === '\\') {
          bs++;
          j--;
        }
        if (bs % 2 === 0) inS = !inS;
      } else if (inS && c === '$' && expr[i + 1] === '{') {
        const endIdx = findMatchingBraceInTemplate(expr, i + 1);
        if (endIdx !== -1) i = endIdx;
      } else if (!inS) {
        if (c === '(') p++;
        else if (c === ')') p = Math.max(0, p - 1);
        else if (c === '{') b++;
        else if (c === '}') b = Math.max(0, b - 1);
        else if (c === '[') {
          if (p === 0 && b === 0 && k === 0 && i > 0) {
            lastSplitIdx = i;
            splitType = 'index';
          }
          k++;
        } else if (c === ']') {
          k = Math.max(0, k - 1);
        } else if (p === 0 && b === 0 && k === 0) {
          if (c === '?' && expr[i + 1] === '.') {
            lastSplitIdx = i;
            splitType = 'safedot';
            i++;
          } else if (
            c === '.' &&
            expr[i - 1] !== '.' &&
            expr[i + 1] !== '.' &&
            !/^\d+$/.test(expr.slice(0, i).trim())
          ) {
            lastSplitIdx = i;
            splitType = 'dot';
          }
        }
      }
    }

    if (lastSplitIdx === -1 || !splitType) return null;

    if (splitType === 'index' && expr.endsWith(']')) {
      const targetExpr = expr.slice(0, lastSplitIdx).trim();
      const idxExpr = expr.slice(lastSplitIdx + 1, -1).trim();
      const targetVal = this.evalExpr(targetExpr, env);
      const idxVal = this.evalExpr(idxExpr, env);

      if (targetVal.kind === 'list') {
        if (idxVal.kind !== 'int') throw new KtCompileError('El índice debe ser Int');
        const el = targetVal.elements[idxVal.value];
        if (!el) throw new KtRuntimeException('java.lang.IndexOutOfBoundsException', `Index ${idxVal.value} out of bounds`);
        return el;
      }
      if (targetVal.kind === 'string') {
        if (idxVal.kind !== 'int') throw new KtCompileError('El índice debe ser Int');
        const ch = targetVal.value[idxVal.value];
        if (ch === undefined) throw new KtRuntimeException('java.lang.StringIndexOutOfBoundsException', `Index ${idxVal.value} out of bounds`);
        return { kind: 'string', value: ch };
      }
      if (targetVal.kind === 'map') {
        const found = targetVal.entries.find(e => ktEquals(e.key, idxVal));
        return found ? found.value : { kind: 'null' };
      }
    }

    const receiverExpr = expr.slice(0, lastSplitIdx).trim();
    const memberPart = expr.slice(lastSplitIdx + (splitType === 'safedot' ? 2 : 1)).trim();
    const receiverVal = this.evalExpr(receiverExpr, env);

    if (receiverVal.kind === 'null') {
      if (splitType === 'safedot') return { kind: 'null' };
      throw new KtRuntimeException('java.lang.NullPointerException', 'Se intentó acceder a un miembro sobre una referencia null');
    }

    return this.evalMemberOnReceiver(receiverVal, memberPart, env);
  }

  private evalMemberOnReceiver(receiver: KtValue, memberExpr: string, env: Env): KtValue {
    // 1. Llamada con lambda trailing: .filter { ... }, .map { ... }, .forEachIndexed { i, t -> ... }
    const lambdaMatch = memberExpr.match(/^([A-Za-z_]\w*)\s*(?:\(([^)]*)\))?\s*\{([\s\S]*)\}$/);
    if (lambdaMatch) {
      const methodName = lambdaMatch[1];
      const lambdaContent = lambdaMatch[3].trim();
      return this.evalHigherOrderMethod(receiver, methodName, lambdaContent, env);
    }

    // 2. Llamada a método con paréntesis: .split(","), .uppercase(), .copy(precio = 850.0)
    const callMatch = memberExpr.match(/^([A-Za-z_]\w*)\s*\(/);
    if (callMatch) {
      const methodName = callMatch[1];
      const openP = memberExpr.indexOf('(');
      const closeP = findMatchingDelimiter(memberExpr, openP, '(', ')');
      if (closeP === memberExpr.length - 1) {
        const argsRaw = memberExpr.slice(openP + 1, closeP);
        const { positional, named } = this.evalArgList(argsRaw, env);
        return this.evalMethodCall(receiver, methodName, positional, named, env);
      }
    }

    // 3. Acceso a propiedad: .size, .length, .nombre
    if (/^[A-Za-z_]\w*$/.test(memberExpr)) {
      return this.evalPropertyAccess(receiver, memberExpr);
    }

    throw new UnsupportedKotlinFeatureError(`Miembro no soportado: .${memberExpr}`);
  }

  private evalPropertyAccess(receiver: KtValue, prop: string): KtValue {
    if (receiver.kind === 'string') {
      if (prop === 'length' || prop === 'size') return { kind: 'int', value: receiver.value.length };
      if (prop === 'indices') {
        return { kind: 'range', start: 0, end: receiver.value.length - 1, step: 1, inclusive: true };
      }
    }
    if (receiver.kind === 'list' || receiver.kind === 'set') {
      if (prop === 'size') return { kind: 'int', value: receiver.elements.length };
      if (prop === 'indices') {
        return { kind: 'range', start: 0, end: receiver.elements.length - 1, step: 1, inclusive: true };
      }
      if (prop === 'lastIndex') return { kind: 'int', value: receiver.elements.length - 1 };
    }
    if (receiver.kind === 'map') {
      if (prop === 'size') return { kind: 'int', value: receiver.entries.length };
      if (prop === 'keys') {
        return { kind: 'list', elements: receiver.entries.map(e => e.key), mutable: false };
      }
      if (prop === 'values') {
        return { kind: 'list', elements: receiver.entries.map(e => e.value), mutable: false };
      }
    }
    if (receiver.kind === 'pair') {
      if (prop === 'first') return receiver.first;
      if (prop === 'second') return receiver.second;
    }
    if (receiver.kind === 'object') {
      const p = receiver.props.get(prop);
      if (p) return p.value;
    }
    throw new KtCompileError(`Unresolved reference: ${prop}`);
  }

  private evalMethodCall(
    receiver: KtValue,
    method: string,
    args: KtValue[],
    named: Map<string, KtValue>,
    env: Env
  ): KtValue {
    if (method === 'toString') {
      return { kind: 'string', value: ktToString(receiver) };
    }

    // Conversiones numéricas
    if (receiver.kind === 'int' || receiver.kind === 'double' || receiver.kind === 'string') {
      if (method === 'toInt') {
        const n = receiver.kind === 'string' ? parseInt(receiver.value, 10) : Math.trunc(receiver.value);
        if (Number.isNaN(n)) throw new KtRuntimeException('java.lang.NumberFormatException', `For input string: "${ktToString(receiver)}"`);
        return { kind: 'int', value: n };
      }
      if (method === 'toIntOrNull') {
        const n = receiver.kind === 'string' ? parseInt(receiver.value, 10) : Math.trunc(receiver.value);
        return Number.isNaN(n) ? { kind: 'null' } : { kind: 'int', value: n };
      }
      if (method === 'toDouble') {
        const n = receiver.kind === 'string' ? parseFloat(receiver.value) : Number(receiver.value);
        if (Number.isNaN(n)) throw new KtRuntimeException('java.lang.NumberFormatException', `For input string: "${ktToString(receiver)}"`);
        return { kind: 'double', value: n };
      }
      if (method === 'toDoubleOrNull') {
        const n = receiver.kind === 'string' ? parseFloat(receiver.value) : Number(receiver.value);
        return Number.isNaN(n) ? { kind: 'null' } : { kind: 'double', value: n };
      }
    }

    // Métodos de String
    if (receiver.kind === 'string') {
      const s = receiver.value;
      switch (method) {
        case 'uppercase':
        case 'toUpperCase':
          return { kind: 'string', value: s.toUpperCase() };
        case 'lowercase':
        case 'toLowerCase':
          return { kind: 'string', value: s.toLowerCase() };
        case 'trim':
          return { kind: 'string', value: s.trim() };
        case 'trimStart':
          return { kind: 'string', value: s.trimStart() };
        case 'trimEnd':
          return { kind: 'string', value: s.trimEnd() };
        case 'isEmpty':
          return { kind: 'boolean', value: s.length === 0 };
        case 'isNotEmpty':
          return { kind: 'boolean', value: s.length > 0 };
        case 'isBlank':
          return { kind: 'boolean', value: s.trim().length === 0 };
        case 'isNotBlank':
          return { kind: 'string' === receiver.kind ? 'boolean' : 'boolean', value: s.trim().length > 0 };
        case 'reversed':
          return { kind: 'string', value: s.split('').reverse().join('') };
        case 'contains':
          return { kind: 'boolean', value: s.includes(ktToString(args[0] || { kind: 'string', value: '' })) };
        case 'startsWith':
          return { kind: 'boolean', value: s.startsWith(ktToString(args[0] || { kind: 'string', value: '' })) };
        case 'endsWith':
          return { kind: 'boolean', value: s.endsWith(ktToString(args[0] || { kind: 'string', value: '' })) };
        case 'replace':
          return {
            kind: 'string',
            value: s.split(ktToString(args[0])).join(ktToString(args[1]))
          };
        case 'substring': {
          const start = args[0]?.kind === 'int' ? args[0].value : 0;
          const end = args[1]?.kind === 'int' ? args[1].value : undefined;
          return { kind: 'string', value: s.substring(start, end) };
        }
        case 'split': {
          const delim = args[0] ? ktToString(args[0]) : ',';
          return {
            kind: 'list',
            elements: s.split(delim).map(part => ({ kind: 'string', value: part })),
            mutable: false
          };
        }
        case 'first':
          return { kind: 'string', value: s[0] || '' };
        case 'last':
          return { kind: 'string', value: s[s.length - 1] || '' };
        case 'repeat': {
          const count = args[0]?.kind === 'int' ? Math.max(0, args[0].value) : 1;
          return { kind: 'string', value: s.repeat(count) };
        }
      }
    }

    // Métodos de List y Set
    if (receiver.kind === 'list' || receiver.kind === 'set') {
      const els = receiver.elements;
      switch (method) {
        case 'isEmpty':
          return { kind: 'boolean', value: els.length === 0 };
        case 'isNotEmpty':
          return { kind: 'boolean', value: els.length > 0 };
        case 'count':
        case 'size':
          return { kind: 'int', value: els.length };
        case 'first':
          if (els.length === 0) throw new KtRuntimeException('java.util.NoSuchElementException', 'List is empty.');
          return els[0];
        case 'firstOrNull':
          return els[0] || { kind: 'null' };
        case 'last':
          if (els.length === 0) throw new KtRuntimeException('java.util.NoSuchElementException', 'List is empty.');
          return els[els.length - 1];
        case 'lastOrNull':
          return els[els.length - 1] || { kind: 'null' };
        case 'get': {
          const idx = args[0]?.kind === 'int' ? args[0].value : 0;
          return els[idx] || { kind: 'null' };
        }
        case 'contains':
          return { kind: 'boolean', value: els.some(e => ktEquals(e, args[0])) };
        case 'indexOf':
          return { kind: 'int', value: els.findIndex(e => ktEquals(e, args[0])) };
        case 'add': {
          if (!receiver.mutable) throw new KtCompileError('Unresolved reference: add (la lista es inmutable, usa mutableListOf)');
          if (args.length === 2 && args[0].kind === 'int') {
            els.splice(args[0].value, 0, args[1]);
          } else if (args[0]) {
            els.push(args[0]);
          }
          return { kind: 'boolean', value: true };
        }
        case 'remove': {
          if (!receiver.mutable) throw new KtCompileError('Unresolved reference: remove (la lista es inmutable)');
          const idx = els.findIndex(e => ktEquals(e, args[0]));
          if (idx >= 0) {
            els.splice(idx, 1);
            return { kind: 'boolean', value: true };
          }
          return { kind: 'boolean', value: false };
        }
        case 'removeAt': {
          if (!receiver.mutable) throw new KtCompileError('Unresolved reference: removeAt');
          const idx = args[0]?.kind === 'int' ? args[0].value : 0;
          const [removed] = els.splice(idx, 1);
          return removed || { kind: 'null' };
        }
        case 'clear': {
          if (!receiver.mutable) throw new KtCompileError('Unresolved reference: clear');
          els.length = 0;
          return { kind: 'unit' };
        }
        case 'sum': {
          let total = 0;
          let hasDouble = false;
          for (const e of els) {
            if (e.kind === 'double') {
              hasDouble = true;
              total += e.value;
            } else if (e.kind === 'int') {
              total += e.value;
            }
          }
          return hasDouble ? { kind: 'double', value: total } : { kind: 'int', value: total };
        }
        case 'average': {
          if (els.length === 0) return { kind: 'double', value: NaN };
          let total = 0;
          for (const e of els) {
            if (e.kind === 'int' || e.kind === 'double') total += e.value;
          }
          return { kind: 'double', value: total / els.length };
        }
        case 'maxOrNull': {
          if (els.length === 0) return { kind: 'null' };
          return els.reduce((a, b) =>
            (a.kind === 'int' || a.kind === 'double') &&
            (b.kind === 'int' || b.kind === 'double') &&
            b.value > a.value
              ? b
              : a
          );
        }
        case 'minOrNull': {
          if (els.length === 0) return { kind: 'null' };
          return els.reduce((a, b) =>
            (a.kind === 'int' || a.kind === 'double') &&
            (b.kind === 'int' || b.kind === 'double') &&
            b.value < a.value
              ? b
              : a
          );
        }
        case 'sorted': {
          const copy = [...els].sort((a, b) => {
            if ((a.kind === 'int' || a.kind === 'double') && (b.kind === 'int' || b.kind === 'double')) {
              return a.value - b.value;
            }
            return ktToString(a).localeCompare(ktToString(b));
          });
          return { kind: 'list', elements: copy, mutable: false };
        }
        case 'sortedDescending': {
          const copy = [...els].sort((a, b) => {
            if ((a.kind === 'int' || a.kind === 'double') && (b.kind === 'int' || b.kind === 'double')) {
              return b.value - a.value;
            }
            return ktToString(b).localeCompare(ktToString(a));
          });
          return { kind: 'list', elements: copy, mutable: false };
        }
        case 'reversed':
          return { kind: 'list', elements: [...els].reverse(), mutable: false };
        case 'distinct': {
          const unique: KtValue[] = [];
          for (const e of els) {
            if (!unique.some(u => ktEquals(u, e))) unique.push(e);
          }
          return { kind: 'list', elements: unique, mutable: false };
        }
        case 'take': {
          const n = args[0]?.kind === 'int' ? args[0].value : 0;
          return { kind: 'list', elements: els.slice(0, n), mutable: false };
        }
        case 'drop': {
          const n = args[0]?.kind === 'int' ? args[0].value : 0;
          return { kind: 'list', elements: els.slice(n), mutable: false };
        }
        case 'joinToString': {
          const sepVal = named.get('separator') || args[0];
          const sep = sepVal ? ktToString(sepVal) : ', ';
          const prefixVal = named.get('prefix') || args[1];
          const prefix = prefixVal ? ktToString(prefixVal) : '';
          const postfixVal = named.get('postfix') || args[2];
          const postfix = postfixVal ? ktToString(postfixVal) : '';
          return {
            kind: 'string',
            value: `${prefix}${els.map(ktToString).join(sep)}${postfix}`
          };
        }
        case 'toList':
          return { kind: 'list', elements: [...els], mutable: false };
        case 'toMutableList':
          return { kind: 'list', elements: [...els], mutable: true };
      }
    }

    // Métodos de Objetos / Data Classes
    if (receiver.kind === 'object') {
      const cls = this.classes.get(receiver.className);
      if (method === 'copy' && receiver.isData && cls) {
        const newProps = new Map<string, { value: KtValue; mutable: boolean }>();
        receiver.propOrder.forEach((propName, idx) => {
          const orig = receiver.props.get(propName)!;
          let nextVal = orig.value;
          if (named.has(propName)) {
            nextVal = named.get(propName)!;
          } else if (idx < args.length) {
            nextVal = args[idx];
          }
          const paramDecl = cls.constructorParams.find(p => p.name === propName);
          if (paramDecl?.type === 'Double' && nextVal.kind === 'int') {
            nextVal = { kind: 'double', value: nextVal.value };
          }
          newProps.set(propName, { value: nextVal, mutable: orig.mutable });
        });
        return {
          kind: 'object',
          className: receiver.className,
          isData: true,
          props: newProps,
          propOrder: [...receiver.propOrder]
        };
      }

      if (cls && cls.methods.has(method)) {
        const mDecl = cls.methods.get(method)!;
        const methodEnv = new Env(env);
        receiver.props.forEach((p, k) => {
          methodEnv.define(k, p.value, p.mutable);
        });
        methodEnv.define('this', receiver, false);
        const res = this.invokeFunction(mDecl, args, named, methodEnv);
        // Sincronizar propiedades mutadas de vuelta en la instancia
        receiver.props.forEach((p, k) => {
          if (p.mutable && methodEnv.has(k)) {
            p.value = methodEnv.get(k);
          }
        });
        return res;
      }
    }

    throw new UnsupportedKotlinFeatureError(`Método .${method}() no soportado localmente sobre ${receiver.kind}`);
  }

  private evalHigherOrderMethod(
    receiver: KtValue,
    method: string,
    lambdaContent: string,
    env: Env
  ): KtValue {
    if (receiver.kind !== 'list' && receiver.kind !== 'set' && receiver.kind !== 'range') {
      throw new UnsupportedKotlinFeatureError(`Lambda .${method} no soportado sobre ${receiver.kind}`);
    }

    const elements = this.expandIterable(receiver);
    let paramNames = ['it'];
    let bodyStr = lambdaContent;

    const arrowIdx = this.findTopLevelChar(lambdaContent, '->');
    if (arrowIdx !== -1) {
      const paramsRaw = lambdaContent.slice(0, arrowIdx).trim();
      paramNames = paramsRaw
        .replace(/^\(|\)$/g, '')
        .split(',')
        .map(p => p.trim().split(':')[0].trim())
        .filter(Boolean);
      bodyStr = lambdaContent.slice(arrowIdx + 2).trim();
    }

    const runLambda = (item: KtValue, index?: number): KtValue => {
      const lEnv = new Env(env);
      if (index !== undefined && paramNames.length >= 2) {
        lEnv.define(paramNames[0], { kind: 'int', value: index }, false);
        lEnv.define(paramNames[1], item, false);
      } else {
        lEnv.define(paramNames[0] || 'it', item, false);
      }
      return this.executeBlock(bodyStr, lEnv);
    };

    switch (method) {
      case 'filter': {
        const kept = elements.filter(el => {
          const r = runLambda(el);
          return r.kind === 'boolean' && r.value;
        });
        return { kind: 'list', elements: kept, mutable: false };
      }
      case 'filterNot': {
        const kept = elements.filter(el => {
          const r = runLambda(el);
          return !(r.kind === 'boolean' && r.value);
        });
        return { kind: 'list', elements: kept, mutable: false };
      }
      case 'map': {
        const mapped = elements.map(el => runLambda(el));
        return { kind: 'list', elements: mapped, mutable: false };
      }
      case 'mapIndexed': {
        const mapped = elements.map((el, idx) => runLambda(el, idx));
        return { kind: 'list', elements: mapped, mutable: false };
      }
      case 'forEach': {
        elements.forEach(el => runLambda(el));
        return { kind: 'unit' };
      }
      case 'forEachIndexed': {
        elements.forEach((el, idx) => runLambda(el, idx));
        return { kind: 'unit' };
      }
      case 'any': {
        const res = elements.some(el => {
          const r = runLambda(el);
          return r.kind === 'boolean' && r.value;
        });
        return { kind: 'boolean', value: res };
      }
      case 'all': {
        const res = elements.every(el => {
          const r = runLambda(el);
          return r.kind === 'boolean' && r.value;
        });
        return { kind: 'boolean', value: res };
      }
      case 'count': {
        const count = elements.filter(el => {
          const r = runLambda(el);
          return r.kind === 'boolean' && r.value;
        }).length;
        return { kind: 'int', value: count };
      }
      case 'find':
      case 'firstOrNull': {
        const found = elements.find(el => {
          const r = runLambda(el);
          return r.kind === 'boolean' && r.value;
        });
        return found || { kind: 'null' };
      }
      case 'sumOf': {
        let sum = 0;
        let isDouble = false;
        for (const el of elements) {
          const r = runLambda(el);
          if (r.kind === 'double') {
            isDouble = true;
            sum += r.value;
          } else if (r.kind === 'int') {
            sum += r.value;
          }
        }
        return isDouble ? { kind: 'double', value: sum } : { kind: 'int', value: sum };
      }
      case 'sortedBy': {
        const copy = [...elements].sort((a, b) => {
          const ka = runLambda(a);
          const kb = runLambda(b);
          if ((ka.kind === 'int' || ka.kind === 'double') && (kb.kind === 'int' || kb.kind === 'double')) {
            return ka.value - kb.value;
          }
          return ktToString(ka).localeCompare(ktToString(kb));
        });
        return { kind: 'list', elements: copy, mutable: false };
      }
    }

    throw new UnsupportedKotlinFeatureError(`Lambda .${method} no soportado localmente`);
  }

  private evalArgList(argsRaw: string, env: Env): { positional: KtValue[]; named: Map<string, KtValue> } {
    const positional: KtValue[] = [];
    const named = new Map<string, KtValue>();
    if (!argsRaw.trim()) return { positional, named };

    const items = splitTopLevel(argsRaw, ',');
    for (const item of items) {
      const trimmed = item.trim();
      if (!trimmed) continue;
      const eqIdx = this.findSingleEquals(trimmed);
      if (eqIdx > 0 && /^[A-Za-z_]\w*$/.test(trimmed.slice(0, eqIdx).trim())) {
        const name = trimmed.slice(0, eqIdx).trim();
        const val = this.evalExpr(trimmed.slice(eqIdx + 1).trim(), env);
        named.set(name, val);
      } else {
        positional.push(this.evalExpr(trimmed, env));
      }
    }

    return { positional, named };
  }

  private evalGlobalCall(
    name: string,
    args: KtValue[],
    named: Map<string, KtValue>,
    env: Env
  ): KtValue {
    if (name === 'println') {
      const text = args.length > 0 ? ktToString(args[0]) : '';
      this.outputBuffer.push(text + '\n');
      return { kind: 'unit' };
    }
    if (name === 'print') {
      const text = args.length > 0 ? ktToString(args[0]) : '';
      this.outputBuffer.push(text);
      return { kind: 'unit' };
    }
    if (name === 'listOf' || name === 'arrayOf' || name === 'intArrayOf' || name === 'doubleArrayOf') {
      return { kind: 'list', elements: [...args], mutable: false };
    }
    if (name === 'emptyList') {
      return { kind: 'list', elements: [], mutable: false };
    }
    if (name === 'mutableListOf' || name === 'arrayListOf') {
      return { kind: 'list', elements: [...args], mutable: true };
    }
    if (name === 'setOf') {
      return { kind: 'set', elements: [...args], mutable: false };
    }
    if (name === 'mutableSetOf') {
      return { kind: 'set', elements: [...args], mutable: true };
    }
    if (name === 'mapOf' || name === 'mutableMapOf') {
      const entries = args
        .filter((a): a is { kind: 'pair'; first: KtValue; second: KtValue } => a.kind === 'pair')
        .map(p => ({ key: p.first, value: p.second }));
      return { kind: 'map', entries, mutable: name === 'mutableMapOf' };
    }
    if (name === 'Pair') {
      return {
        kind: 'pair',
        first: args[0] || { kind: 'null' },
        second: args[1] || { kind: 'null' }
      };
    }
    if (name === 'maxOf' && args.length >= 2) {
      const a = args[0];
      const b = args[1];
      if ((a.kind === 'int' || a.kind === 'double') && (b.kind === 'int' || b.kind === 'double')) {
        return a.value >= b.value ? a : b;
      }
    }
    if (name === 'minOf' && args.length >= 2) {
      const a = args[0];
      const b = args[1];
      if ((a.kind === 'int' || a.kind === 'double') && (b.kind === 'int' || b.kind === 'double')) {
        return a.value <= b.value ? a : b;
      }
    }
    if (name === 'abs' && args[0] && (args[0].kind === 'int' || args[0].kind === 'double')) {
      return { kind: args[0].kind, value: Math.abs(args[0].value) };
    }

    if (this.functions.has(name)) {
      return this.invokeFunction(this.functions.get(name)!, args, named, env);
    }

    if (this.classes.has(name)) {
      return this.instantiateClass(this.classes.get(name)!, args, named, env);
    }

    throw new KtCompileError(`Unresolved reference: ${name}`);
  }

  private findTopLevelOperatorRightToLeft(
    expr: string,
    ops: string[]
  ): { index: number; op: string } | null {
    let p = 0;
    let b = 0;
    let k = 0;
    let inS = false;
    let found: { index: number; op: string } | null = null;

    for (let i = 0; i < expr.length; i++) {
      const c = expr[i];
      if (c === '"') {
        let bs = 0;
        let j = i - 1;
        while (j >= 0 && expr[j] === '\\') {
          bs++;
          j--;
        }
        if (bs % 2 === 0) inS = !inS;
      } else if (inS && c === '$' && expr[i + 1] === '{') {
        const endIdx = findMatchingBraceInTemplate(expr, i + 1);
        if (endIdx !== -1) i = endIdx;
      } else if (!inS) {
        if (c === '(') p++;
        else if (c === ')') p = Math.max(0, p - 1);
        else if (c === '{') b++;
        else if (c === '}') b = Math.max(0, b - 1);
        else if (c === '[') k++;
        else if (c === ']') k = Math.max(0, k - 1);
        else if (p === 0 && b === 0 && k === 0) {
          for (const op of ops) {
            if (expr.startsWith(op, i)) {
              // Evitar confundir '<' o '>' con '->' o '<=' / '>='
              if ((op === '<' || op === '>') && expr[i + 1] === '=') continue;
              if (op === '>' && expr[i - 1] === '-') continue;
              found = { index: i, op };
              i += op.length - 1;
              break;
            }
          }
        }
      }
    }

    return found;
  }

  private findTopLevelAdditive(expr: string): { index: number; op: string } | null {
    let p = 0;
    let b = 0;
    let k = 0;
    let inS = false;
    let found: { index: number; op: string } | null = null;

    for (let i = 0; i < expr.length; i++) {
      const c = expr[i];
      if (c === '"') {
        let bs = 0;
        let j = i - 1;
        while (j >= 0 && expr[j] === '\\') {
          bs++;
          j--;
        }
        if (bs % 2 === 0) inS = !inS;
      } else if (inS && c === '$' && expr[i + 1] === '{') {
        const endIdx = findMatchingBraceInTemplate(expr, i + 1);
        if (endIdx !== -1) i = endIdx;
      } else if (!inS) {
        if (c === '(') p++;
        else if (c === ')') p = Math.max(0, p - 1);
        else if (c === '{') b++;
        else if (c === '}') b = Math.max(0, b - 1);
        else if (c === '[') k++;
        else if (c === ']') k = Math.max(0, k - 1);
        else if (p === 0 && b === 0 && k === 0 && (c === '+' || c === '-')) {
          if (c === '-' && expr[i + 1] === '>') {
            i++;
            continue;
          }
          const prevNonSpace = expr.slice(0, i).trimEnd();
          if (!prevNonSpace) continue; // Es operador unario al inicio
          const lastChar = prevNonSpace[prevNonSpace.length - 1];
          if ('([,=+*-/%<>!&|:?'.includes(lastChar)) continue; // Es unario después de otro operador
          found = { index: i, op: c };
        }
      }
    }

    return found;
  }

  private applyBinaryOp(op: string, l: KtValue, r: KtValue): KtValue {
    if (op === '+' && (l.kind === 'string' || r.kind === 'string')) {
      return { kind: 'string', value: ktToString(l) + ktToString(r) };
    }
    if (op === '+' && l.kind === 'list') {
      if (r.kind === 'list') {
        return { kind: 'list', elements: [...l.elements, ...r.elements], mutable: false };
      }
      return { kind: 'list', elements: [...l.elements, r], mutable: false };
    }

    if ((l.kind === 'int' || l.kind === 'double') && (r.kind === 'int' || r.kind === 'double')) {
      const isDouble = l.kind === 'double' || r.kind === 'double';
      switch (op) {
        case '+':
          return { kind: isDouble ? 'double' : 'int', value: l.value + r.value };
        case '-':
          return { kind: isDouble ? 'double' : 'int', value: l.value - r.value };
        case '*':
          return { kind: isDouble ? 'double' : 'int', value: l.value * r.value };
        case '/': {
          if (!isDouble) {
            if (r.value === 0) {
              throw new KtRuntimeException('java.lang.ArithmeticException', '/ by zero');
            }
            return { kind: 'int', value: Math.trunc(l.value / r.value) };
          }
          return { kind: 'double', value: l.value / r.value };
        }
        case '%': {
          if (!isDouble && r.value === 0) {
            throw new KtRuntimeException('java.lang.ArithmeticException', '/ by zero');
          }
          return { kind: isDouble ? 'double' : 'int', value: l.value % r.value };
        }
      }
    }

    throw new KtCompileError(`Operador "${op}" no aplicable entre ${l.kind} y ${r.kind}`);
  }

  private applyComparisonOp(op: string, l: KtValue, r: KtValue): KtValue {
    if ((l.kind === 'int' || l.kind === 'double') && (r.kind === 'int' || r.kind === 'double')) {
      switch (op) {
        case '<':
          return { kind: 'boolean', value: l.value < r.value };
        case '>':
          return { kind: 'boolean', value: l.value > r.value };
        case '<=':
          return { kind: 'boolean', value: l.value <= r.value };
        case '>=':
          return { kind: 'boolean', value: l.value >= r.value };
      }
    }
    if (l.kind === 'string' && r.kind === 'string') {
      const cmp = l.value.localeCompare(r.value);
      switch (op) {
        case '<':
          return { kind: 'boolean', value: cmp < 0 };
        case '>':
          return { kind: 'boolean', value: cmp > 0 };
        case '<=':
          return { kind: 'boolean', value: cmp <= 0 };
        case '>=':
          return { kind: 'boolean', value: cmp >= 0 };
      }
    }
    throw new KtCompileError(`Comparación "${op}" no válida entre ${l.kind} y ${r.kind}`);
  }

  private checkInOperator(item: KtValue, container: KtValue): boolean {
    if (container.kind === 'range' && (item.kind === 'int' || item.kind === 'double')) {
      const v = item.value;
      if (container.step > 0) {
        const end = container.inclusive ? container.end : container.end - 1;
        if (v < container.start || v > end) return false;
        return (v - container.start) % container.step === 0;
      } else {
        const end = container.inclusive ? container.end : container.end + 1;
        if (v > container.start || v < end) return false;
        return (container.start - v) % Math.abs(container.step) === 0;
      }
    }
    if (container.kind === 'list' || container.kind === 'set') {
      return container.elements.some(e => ktEquals(e, item));
    }
    if (container.kind === 'string' && item.kind === 'string') {
      return container.value.includes(item.value);
    }
    return false;
  }
}

/**
 * Intenta ejecutar el código Kotlin localmente en < 10ms.
 * Retorna KotlinRunResult si tuvo éxito o detectó un error claro;
 * retorna null si requiere delegar al compilador remoto de JetBrains.
 */
export function tryRunKotlinLocally(
  files: KotlinFile[],
  args: string,
  version: string
): KotlinRunResult | null {
  const startTime = performance.now();
  const interpreter = new LocalKotlinInterpreter();

  try {
    const output = interpreter.run(files, args);
    const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
    return {
      output: output.trimEnd(),
      rawText: output,
      errors: [],
      exception: null,
      executionTimeMs,
      success: true,
      compilerVersion: version
    };
  } catch (err) {
    if (err instanceof UnsupportedKotlinFeatureError) {
      // Contiene sintaxis avanzada; delegar al servidor remoto de JetBrains
      return null;
    }

    const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));

    if (err instanceof KtRuntimeException) {
      return {
        output: '',
        rawText: '',
        errors: [],
        exception: {
          fullName: err.fullName,
          message: err.message,
          stackTrace: [
            {
              className: 'MainKt',
              methodName: 'main',
              fileName: files[0]?.name || 'Main.kt',
              lineNumber: err.line
            }
          ]
        },
        executionTimeMs,
        success: false,
        compilerVersion: version
      };
    }

    if (err instanceof KtCompileError) {
      // Si es un error de delimitador o "Val cannot be reassigned" o falta main(), reportar al instante
      const isDefiniteSyntaxError =
        err.message.includes('Val cannot be reassigned') ||
        err.message.includes('sin cerrar') ||
        err.message.includes('inesperad') ||
        err.message.includes('fun main()');

      if (isDefiniteSyntaxError) {
        const compilerErrors: KotlinCompilerError[] = [
          {
            fileName: files[0]?.name || 'Main.kt',
            line: err.line,
            column: err.column,
            message: err.message,
            severity: 'ERROR'
          }
        ];
        return {
          output: '',
          rawText: '',
          errors: compilerErrors,
          exception: null,
          executionTimeMs,
          success: false,
          compilerVersion: version
        };
      }
    }

    // Para cualquier otro caso ambiguo, delegar al servidor remoto de JetBrains
    return null;
  }
}

