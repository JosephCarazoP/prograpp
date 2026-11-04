import {
  MatchingPairsReportData,
  CodeBuilderReportData,
  SpotTheBugReportData,
  ParsonsReportData,
  FlowchartReportData,
  TraceStepReportData
} from '../types/questionReport';

export interface PlayerScreenSnapshotParams {
  exerciseId: string;
  exerciseType: string;
  pathId: 'kotlin' | 'sql';
  lessonTitle?: string;
  prompt: string;
  instructionText?: string;
  codeSnippet?: string;
  availableOptions?: string[];
  expectedSolution?: string;
  userAnswer?: string;
  selectedOptionIndex?: number | null;
  eliminatedOptionIndices?: number[];
  feedbackState?: 'idle' | 'success' | 'error';
  feedbackExplanation?: string;
  matchingPairsData?: MatchingPairsReportData;
  codeBuilderData?: CodeBuilderReportData;
  spotTheBugData?: SpotTheBugReportData;
  parsonsData?: ParsonsReportData;
  flowchartData?: FlowchartReportData;
  traceStepData?: TraceStepReportData;
}

/**
 * Envuelve texto largo en líneas que caben en maxWidth píxeles dentro de un contexto 2D de Canvas.
 */
function wrapTextLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return [];
  const paragraphs = String(text).split('\n');
  const result: string[] = [];

  for (const para of paragraphs) {
    if (!para.trim()) {
      result.push('');
      continue;
    }
    const words = para.split(/\s+/);
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        result.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      result.push(currentLine);
    }
  }

  return result;
}

/**
 * Dibuja un rectángulo redondeado con estilo Neo-Brutalista opcional.
 */
function drawRoundedCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string,
  stroke = '#000000',
  strokeWidth = 2,
  shadowOffset = 0
) {
  if (shadowOffset > 0) {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(x + shadowOffset, y + shadowOffset, w, h, r);
    ctx.fill();
  }
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();

  if (strokeWidth > 0) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
}

/**
 * Genera de forma 100% silenciosa e instantánea (sin avisos ni permisos del navegador)
 * una captura visual optimizada (JPEG ~20-35 KB) de la pantalla exacta del jugador al reportar.
 */
export function capturePlayerScreenOptimized(params: PlayerScreenSnapshotParams): string | undefined {
  if (typeof document === 'undefined') return undefined;

  try {
    const W = 680;
    const PAD = 20;
    const INNER_W = W - PAD * 2;

    // 1. Canvas temporal para medir alturas exactas antes de renderizar
    const measureCanvas = document.createElement('canvas');
    const mCtx = measureCanvas.getContext('2d');
    if (!mCtx) return undefined;

    mCtx.font = 'bold 15px system-ui, -apple-system, sans-serif';
    const promptLines = wrapTextLines(mCtx, params.prompt, INNER_W - 28);

    mCtx.font = '600 12px system-ui, -apple-system, sans-serif';
    const instrLines = params.instructionText
      ? wrapTextLines(mCtx, params.instructionText, INNER_W - 28)
      : [];

    mCtx.font = '13px monospace';
    const rawCodeLines = params.codeSnippet
      ? params.codeSnippet.split('\n').slice(0, 16)
      : [];

    // Calcular altura dinámica según el contenido que ve el estudiante
    let totalH = 74; // Barra superior de la pantalla del jugador
    totalH += Math.max(54, promptLines.length * 21 + (instrLines.length > 0 ? instrLines.length * 17 + 12 : 0) + 28) + 14;

    if (rawCodeLines.length > 0 && params.exerciseType !== 'spot_the_bug') {
      totalH += rawCodeLines.length * 20 + 34 + 14;
    }

    // Sección de opciones / interacción según tipo
    if (params.matchingPairsData) {
      const rows = Math.max(
        params.matchingPairsData.leftColumn.length,
        params.matchingPairsData.rightColumn.length
      );
      totalH += 34 + rows * 44 + 20;
    } else if (params.codeBuilderData) {
      totalH += 80 + Math.ceil((params.codeBuilderData.displayedTokens.length || 1) / 3) * 38 + 26;
    } else if (params.spotTheBugData) {
      totalH += 34 + params.spotTheBugData.displayedLines.length * 28 + 20;
    } else if (params.parsonsData) {
      totalH += 34 + params.parsonsData.userOrderLines.length * 36 + 20;
    } else if (params.flowchartData) {
      totalH += 34 + params.flowchartData.userOrderBlocks.length * 36 + 20;
    } else if (params.availableOptions && params.availableOptions.length > 0) {
      totalH += 30 + params.availableOptions.length * 46 + 16;
    } else {
      totalH += 60;
    }

    // Pie de respuesta marcada y estado del feedback en pantalla
    totalH += 92;

    const H = Math.min(1200, Math.max(380, totalH));
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    // Fondo general de la pantalla de juego
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, W, H);

    // ─── 1. CABECERA DEL JUGADOR ───
    const isSql = params.pathId === 'sql';
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, W, 54);

    // Badge de ruta
    drawRoundedCard(
      ctx,
      PAD,
      12,
      isSql ? 56 : 74,
      28,
      6,
      isSql ? '#4F46E5' : '#0284C7',
      '#FFFFFF',
      1.5
    );
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 12px system-ui, sans-serif';
    ctx.fillText(params.pathId.toUpperCase(), PAD + 11, 30);

    // Título de lección e ID
    ctx.fillStyle = '#F8FAFC';
    ctx.font = '800 13px system-ui, sans-serif';
    const headerTitle = `${params.lessonTitle || 'Lección'}  ·  ID: ${params.exerciseId}`;
    ctx.fillText(headerTitle.slice(0, 56), PAD + (isSql ? 68 : 86), 26);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 11px monospace';
    ctx.fillText(`Tipo: ${params.exerciseType}  |  Vista exacta del estudiante`, PAD + (isSql ? 68 : 86), 43);

    let curY = 68;

    // ─── 2. BURBUJA DE ENUNCIADO E INSTRUCCIÓN ───
    const promptBoxH =
      promptLines.length * 21 + (instrLines.length > 0 ? instrLines.length * 17 + 12 : 0) + 26;
    drawRoundedCard(ctx, PAD, curY, INNER_W, promptBoxH, 12, '#FFFFFF', '#000000', 2.5, 3);

    let textY = curY + 22;
    if (instrLines.length > 0) {
      ctx.fillStyle = '#0284C7';
      ctx.font = '800 11.5px system-ui, sans-serif';
      for (const il of instrLines) {
        ctx.fillText(il, PAD + 14, textY);
        textY += 16;
      }
      textY += 6;
    }

    ctx.fillStyle = '#0F172A';
    ctx.font = '800 14.5px system-ui, sans-serif';
    for (const pl of promptLines) {
      ctx.fillText(pl, PAD + 14, textY);
      textY += 21;
    }

    curY += promptBoxH + 14;

    // ─── 3. EDITOR DE CÓDIGO (SI EXISTE Y NO ES SPOT_THE_BUG) ───
    if (rawCodeLines.length > 0 && params.exerciseType !== 'spot_the_bug') {
      const codeBoxH = rawCodeLines.length * 20 + 28;
      drawRoundedCard(ctx, PAD, curY, INNER_W, codeBoxH, 10, '#0F172A', '#000000', 2, 3);

      let codeY = curY + 22;
      ctx.font = '12.5px monospace';
      rawCodeLines.forEach((line, idx) => {
        ctx.fillStyle = '#64748B';
        ctx.fillText(`${String(idx + 1).padStart(2, ' ')}.`, PAD + 12, codeY);
        ctx.fillStyle = '#F8FAFC';
        ctx.fillText(line.slice(0, 74), PAD + 44, codeY);
        codeY += 20;
      });

      curY += codeBoxH + 14;
    }

    // ─── 4. OPCIONES / COMPONENTES EN PANTALLA TAL CUAL LE SALEN AL ESTUDIANTE ───
    if (params.matchingPairsData) {
      ctx.fillStyle = '#334155';
      ctx.font = '900 11.5px system-ui, sans-serif';
      ctx.fillText('COLUMNA IZQUIERDA (EN PANTALLA)', PAD + 4, curY + 14);
      ctx.fillText('COLUMNA DERECHA (ORDEN EN PANTALLA)', PAD + INNER_W / 2 + 8, curY + 14);
      curY += 22;

      const colW = INNER_W / 2 - 8;
      const rows = Math.max(
        params.matchingPairsData.leftColumn.length,
        params.matchingPairsData.rightColumn.length
      );

      for (let i = 0; i < rows; i++) {
        const leftTxt = params.matchingPairsData.leftColumn[i] || '';
        const rightTxt = params.matchingPairsData.rightColumn[i] || '';

        const isLeftMatched = params.matchingPairsData.userMatched?.some(m => m.includes(`"${leftTxt}"`));
        const isRightMatched = params.matchingPairsData.userMatched?.some(m => m.includes(`"${rightTxt}"`));

        drawRoundedCard(
          ctx,
          PAD,
          curY,
          colW,
          36,
          8,
          isLeftMatched ? '#DCFCE7' : '#FFFFFF',
          isLeftMatched ? '#16A34A' : '#000000',
          2,
          2
        );
        ctx.fillStyle = '#0F172A';
        ctx.font = '800 12.5px monospace';
        ctx.fillText(`${i + 1}. ${leftTxt}`.slice(0, 36), PAD + 10, curY + 23);

        const rightX = PAD + INNER_W / 2 + 8;
        drawRoundedCard(
          ctx,
          rightX,
          curY,
          colW,
          36,
          8,
          isRightMatched ? '#DCFCE7' : '#FFFFFF',
          isRightMatched ? '#16A34A' : '#000000',
          2,
          2
        );
        ctx.fillStyle = '#0F172A';
        ctx.font = '800 12.5px monospace';
        ctx.fillText(`${String.fromCharCode(65 + i)}. ${rightTxt}`.slice(0, 36), rightX + 10, curY + 23);

        curY += 43;
      }
    } else if (params.codeBuilderData) {
      // Área de construcción del alumno
      ctx.fillStyle = '#334155';
      ctx.font = '900 11.5px system-ui, sans-serif';
      ctx.fillText('RESPUESTA CONSTRUIDA EN PANTALLA POR EL ALUMNO:', PAD + 4, curY + 14);
      curY += 20;

      drawRoundedCard(ctx, PAD, curY, INNER_W, 42, 10, '#EFF6FF', '#0284C7', 2);
      ctx.fillStyle = '#0F172A';
      ctx.font = '800 13px monospace';
      const builtText =
        params.codeBuilderData.selectedTokens.length > 0
          ? params.codeBuilderData.selectedTokens.join(' ')
          : '(Vacío - Ninguna ficha colocada aún)';
      ctx.fillText(builtText.slice(0, 74), PAD + 12, curY + 26);
      curY += 54;

      ctx.fillStyle = '#334155';
      ctx.font = '900 11.5px system-ui, sans-serif';
      ctx.fillText('BANCO DE FICHAS QUE LE SALEN AL ALUMNO:', PAD + 4, curY + 12);
      curY += 20;

      const tokens = params.codeBuilderData.displayedTokens;
      const cols = 3;
      const chipW = Math.floor((INNER_W - (cols - 1) * 8) / cols);
      tokens.forEach((tok, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const cx = PAD + col * (chipW + 8);
        const cy = curY + row * 36;
        drawRoundedCard(ctx, cx, cy, chipW, 30, 8, '#FFFFFF', '#000000', 1.8, 1.5);
        ctx.fillStyle = '#0F172A';
        ctx.font = '800 12px monospace';
        ctx.fillText(`[${idx + 1}] ${tok}`.slice(0, 24), cx + 8, cy + 20);
      });
      curY += Math.ceil((tokens.length || 1) / cols) * 36 + 10;
    } else if (params.spotTheBugData) {
      ctx.fillStyle = '#334155';
      ctx.font = '900 11.5px system-ui, sans-serif';
      ctx.fillText('LÍNEAS DE CÓDIGO EN PANTALLA (CAZA DE ERRORES):', PAD + 4, curY + 14);
      curY += 20;

      params.spotTheBugData.displayedLines.forEach((line, idx) => {
        const isUserSel = params.spotTheBugData?.selectedLineIndex === idx;
        const isSysBug = params.spotTheBugData?.bugLineIndex === idx;
        const bg = isUserSel ? '#FEE2E2' : isSysBug ? '#DCFCE7' : '#0F172A';
        const fg = isUserSel ? '#991B1B' : isSysBug ? '#166534' : '#F8FAFC';

        drawRoundedCard(ctx, PAD, curY, INNER_W, 25, 6, bg, '#000000', 1.5);
        ctx.fillStyle = fg;
        ctx.font = '800 12px monospace';
        const suffix = isUserSel ? '  [TOCADA POR ALUMNO]' : isSysBug ? '  [BUG SISTEMA]' : '';
        ctx.fillText(`${idx + 1}. ${line}${suffix}`.slice(0, 76), PAD + 10, curY + 17);
        curY += 28;
      });
      curY += 6;
    } else if (params.parsonsData || params.flowchartData) {
      const items = params.parsonsData
        ? params.parsonsData.userOrderLines
        : params.flowchartData?.userOrderBlocks || [];
      ctx.fillStyle = '#334155';
      ctx.font = '900 11.5px system-ui, sans-serif';
      ctx.fillText('BLOQUES EN EL ORDEN ACTUAL DE LA PANTALLA DEL ALUMNO:', PAD + 4, curY + 14);
      curY += 20;

      items.forEach(item => {
        drawRoundedCard(ctx, PAD, curY, INNER_W, 30, 8, '#FFFFFF', '#000000', 1.8, 2);
        ctx.fillStyle = '#0F172A';
        ctx.font = '800 12px monospace';
        ctx.fillText(item.slice(0, 76), PAD + 10, curY + 20);
        curY += 35;
      });
      curY += 6;
    } else if (params.availableOptions && params.availableOptions.length > 0) {
      ctx.fillStyle = '#334155';
      ctx.font = '900 11.5px system-ui, sans-serif';
      ctx.fillText('OPCIONES TAL CUAL LE SALEN EN PANTALLA AL ESTUDIANTE:', PAD + 4, curY + 14);
      curY += 20;

      params.availableOptions.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const cleanOpt = opt.replace(/\s*\[Descartada.*$/, '').trim();
        const isSelected =
          params.selectedOptionIndex === idx ||
          Boolean(
            params.userAnswer &&
              (params.userAnswer.includes(cleanOpt) || params.userAnswer.includes(`Opción ${letter}`))
          );
        const isExpected = Boolean(
          params.expectedSolution &&
            (params.expectedSolution.includes(cleanOpt) || params.expectedSolution.includes(`Opción ${letter}`))
        );

        const bg = isSelected ? '#DBEAFE' : isExpected ? '#F0FDF4' : '#FFFFFF';
        const border = isSelected ? '#2563EB' : isExpected ? '#16A34A' : '#000000';

        drawRoundedCard(ctx, PAD, curY, INNER_W, 38, 10, bg, border, 2, 2);

        // Badge de letra A, B, C, D
        drawRoundedCard(
          ctx,
          PAD + 8,
          curY + 6,
          26,
          26,
          6,
          isSelected ? '#2563EB' : isExpected ? '#16A34A' : '#F1F5F9',
          '#000000',
          1.5
        );
        ctx.fillStyle = isSelected || isExpected ? '#FFFFFF' : '#0F172A';
        ctx.font = '900 12.5px system-ui, sans-serif';
        ctx.fillText(letter, PAD + 16, curY + 24);

        ctx.fillStyle = '#0F172A';
        ctx.font = '700 12.5px monospace';
        const tag = isSelected ? '  [MARCADA POR ALUMNO]' : isExpected ? '  [CORRECTA SISTEMA]' : '';
        ctx.fillText(`${opt}${tag}`.slice(0, 68), PAD + 42, curY + 24);

        curY += 45;
      });
    }

    // ─── 5. BARRA INFERIOR DE RESPUESTA DEL ALUMNO Y SOLUCIÓN ESPERADA ───
    const footerY = Math.min(curY + 4, H - 76);
    const isErr = params.feedbackState === 'error';
    const isOk = params.feedbackState === 'success';
    drawRoundedCard(
      ctx,
      PAD,
      footerY,
      INNER_W,
      66,
      10,
      isErr ? '#FEF2F2' : isOk ? '#F0FDF4' : '#F1F5F9',
      isErr ? '#DC2626' : isOk ? '#16A34A' : '#000000',
      2
    );

    ctx.fillStyle = '#0F172A';
    ctx.font = '800 12px system-ui, sans-serif';
    ctx.fillText(
      `Lo que marcó el alumno: ${(params.userAnswer || '(Sin opción marcada al abrir reporte)').slice(0, 64)}`,
      PAD + 12,
      footerY + 24
    );

    ctx.fillStyle = '#15803D';
    ctx.font = '800 12px system-ui, sans-serif';
    ctx.fillText(
      `Solución del sistema: ${(params.expectedSolution || 'No especificada').slice(0, 66)}`,
      PAD + 12,
      footerY + 46
    );

    // Exportar optimizado en JPEG para no ocupar espacio excesivo (~25 KB)
    let dataUrl = canvas.toDataURL('image/jpeg', 0.62);
    if (dataUrl.length > 48000) {
      dataUrl = canvas.toDataURL('image/jpeg', 0.45);
    }
    return dataUrl;
  } catch (err) {
    console.warn('[screenshotCapture] No se pudo generar captura optimizada:', err);
    return undefined;
  }
}

