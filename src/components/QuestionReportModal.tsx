import React, { useState, useMemo, useRef } from 'react';
import {
  X,
  Flag,
  Send,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Bug,
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types/user';
import { Lesson, Exercise } from '../types/lesson';
import { QuestionReport, QuestionReportReason } from '../types/questionReport';
import { questionReportService } from '../services/questionReportService';
import { soundService } from '../services/soundService';
import { FormattedText } from './FormattedText';

interface QuestionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  lesson?: Lesson | { id: string; title: string; unit?: number; path?: 'kotlin' | 'sql' };
  exercise: Exercise | {
    id: string;
    type?: string;
    prompt: string;
    code?: string;
    codeSnippet?: string | string[];
    codeWithBlank?: string;
    options?: string[];
    tokens?: string[];
    solution?: string[];
    acceptableAlternatives?: string[][];
    explanation?: string;
    correctOptionIndex?: number;
    correctOption?: string;
    bugLineIndex?: number;
    pairs?: { left: string; right: string }[];
    lines?: string[];
    correctOrder?: number[];
    blocks?: { id: string; text: string; shape?: string }[];
    iterations?: { iteration: number; expectedVariables: Record<string, string> }[];
    [key: string]: any;
  };
  userAnswer?: string;
  selectedOptionIndex?: number | null;
  selectedBugLineIndex?: number | null;
  selectedTokenIndices?: number[];
  feedbackState?: 'idle' | 'success' | 'error';
  feedbackExplanation?: string;
  onReportSubmitted?: (report: QuestionReport) => void;
}

const REPORT_REASONS: {
  key: QuestionReportReason;
  label: string;
  description: string;
  icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }>;
}[] = [
  {
    key: 'wrong_answer',
    label: 'Respuesta esperada incorrecta',
    description: 'La opción que el sistema marca como correcta es errónea o no calza con el enunciado.',
    icon: AlertTriangle
  },
  {
    key: 'confusing_prompt',
    label: 'Enunciado ambiguo o confuso',
    description: 'La pregunta no es clara, falta información o induce a error.',
    icon: HelpCircle
  },
  {
    key: 'code_bug',
    label: 'Código de muestra con error sintáctico',
    description: 'El snippet tiene un fallo tipográfico o sintaxis que no compila.',
    icon: Bug
  },
  {
    key: 'my_answer_valid',
    label: 'Mi respuesta debería ser válida',
    description: 'Respondí una alternativa correcta que el sistema no aceptó.',
    icon: CheckCircle2
  },
  {
    key: 'typo_or_spelling',
    label: 'Error ortográfico o de redacción',
    description: 'Erratas ortográficas, nombres de variables mal escritos o formato roto.',
    icon: FileText
  },
  {
    key: 'other',
    label: 'Otro problema o discrepancia',
    description: 'Cualquier otra anomalía detectada en este ejercicio.',
    icon: Layers
  }
];

export const QuestionReportModal: React.FC<QuestionReportModalProps> = ({
  isOpen,
  onClose,
  user,
  lesson,
  exercise,
  userAnswer: userAnswerProp,
  selectedOptionIndex,
  selectedBugLineIndex,
  selectedTokenIndices,
  feedbackState = 'idle',
  feedbackExplanation,
  onReportSubmitted
}) => {
  const [selectedReason, setSelectedReason] = useState<QuestionReportReason>('wrong_answer');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const submittedReportRef = useRef<QuestionReport | null>(null);
  const timerRef = useRef<any>(null);

  const handleFinishAndClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const reportToEmit = submittedReportRef.current;
    setIsSent(false);
    setIsSubmitting(false);
    setComment('');
    onClose();
    if (reportToEmit && onReportSubmitted) {
      onReportSubmitted(reportToEmit);
    }
  };

  // Extracción exhaustiva y determinística de la pregunta, opciones y respuestas
  const details = useMemo(() => {
    const ex = exercise as any;
    const prompt = ex?.prompt || 'Sin enunciado';
    const type = ex?.type || 'multiple_choice';

    // Código de muestra
    let codeSnippet = '';
    if (ex.code) {
      codeSnippet = typeof ex.code === 'string' ? ex.code : JSON.stringify(ex.code);
    } else if (ex.codeSnippet) {
      codeSnippet = Array.isArray(ex.codeSnippet) ? ex.codeSnippet.join('\n') : String(ex.codeSnippet);
    } else if (ex.codeWithBlank) {
      codeSnippet = String(ex.codeWithBlank);
    }

    // Opciones presentadas
    const rawOptions: string[] = Array.isArray(ex.options)
      ? ex.options
      : Array.isArray(ex.tokens)
      ? ex.tokens
      : [];

    let expectedSolutionText = '';
    let expectedIndex: number | null = null;
    let expectedOptionText: string | null = null;

    if (type === 'predict_output') {
      const idx = typeof ex.correctOptionIndex === 'number' ? ex.correctOptionIndex : 0;
      expectedIndex = idx;
      if (rawOptions[idx]) {
        expectedOptionText = rawOptions[idx];
        expectedSolutionText = `Opción ${String.fromCharCode(65 + idx)}: ${expectedOptionText}`;
      } else {
        expectedSolutionText = `Índice ${idx}`;
      }
    } else if (type === 'code_cloze') {
      expectedOptionText = ex.correctOption || '';
      expectedIndex = rawOptions.findIndex(o => o.trim() === expectedOptionText?.trim());
      expectedSolutionText = expectedOptionText || 'Opción configurada';
    } else if (type === 'spot_the_bug') {
      const lineIdx = typeof ex.bugLineIndex === 'number' ? ex.bugLineIndex : 0;
      const lines = Array.isArray(ex.codeSnippet) ? ex.codeSnippet : [];
      expectedSolutionText = `Línea ${lineIdx + 1}${lines[lineIdx] ? `: "${lines[lineIdx].trim()}"` : ''}`;
    } else if (type === 'code_builder') {
      expectedSolutionText = Array.isArray(ex.solution) ? ex.solution.join(' ') : 'Secuencia de tokens esperada';
      if (Array.isArray(ex.acceptableAlternatives) && ex.acceptableAlternatives.length > 0) {
        expectedSolutionText += ` (Alternativas válidas: ${ex.acceptableAlternatives.map((a: string[]) => a.join(' ')).join(' | ')})`;
      }
    } else if (type === 'matching_pairs') {
      expectedSolutionText = Array.isArray(ex.pairs)
        ? ex.pairs.map((p: any) => `${p.left} -> ${p.right}`).join(' | ')
        : 'Parejas correspondientes';
    } else if (type === 'parsons_puzzle') {
      const lines = Array.isArray(ex.lines) ? ex.lines : [];
      const order = Array.isArray(ex.correctOrder) ? ex.correctOrder : [];
      expectedSolutionText = order.map((i: number) => lines[i] || '').join(' \n');
    } else if (type === 'flowchart_builder') {
      const blocks = Array.isArray(ex.blocks) ? ex.blocks : [];
      const order = Array.isArray(ex.correctOrder) ? ex.correctOrder : [];
      expectedSolutionText = order.map((i: number) => blocks[i]?.text || '').join(' -> ');
    } else if (ex.explanation) {
      expectedSolutionText = ex.explanation;
    } else {
      expectedSolutionText = 'Solución predeterminada';
    }

    // Respuesta del usuario resuelta
    let userResolvedAnswer = userAnswerProp;
    if (!userResolvedAnswer) {
      if (typeof selectedOptionIndex === 'number' && rawOptions[selectedOptionIndex]) {
        userResolvedAnswer = `Opción ${String.fromCharCode(65 + selectedOptionIndex)}: ${rawOptions[selectedOptionIndex]}`;
      } else if (typeof selectedBugLineIndex === 'number') {
        const lines = Array.isArray(ex.codeSnippet) ? ex.codeSnippet : [];
        userResolvedAnswer = `Línea ${selectedBugLineIndex + 1}${lines[selectedBugLineIndex] ? `: "${lines[selectedBugLineIndex].trim()}"` : ''}`;
      } else if (Array.isArray(selectedTokenIndices) && selectedTokenIndices.length > 0 && Array.isArray(ex.tokens)) {
        userResolvedAnswer = selectedTokenIndices.map(i => ex.tokens[i]).join(' ');
      }
    }

    return {
      prompt,
      type,
      codeSnippet: codeSnippet.trim() || undefined,
      rawOptions,
      expectedIndex,
      expectedOptionText,
      expectedSolutionText,
      userResolvedAnswer,
      lines: Array.isArray(ex.codeSnippet) ? ex.codeSnippet : undefined
    };
  }, [exercise, userAnswerProp, selectedOptionIndex, selectedBugLineIndex, selectedTokenIndices]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    soundService.playToken();

    const currentReasonObj = REPORT_REASONS.find(r => r.key === selectedReason) || REPORT_REASONS[0];
    const pathId: 'kotlin' | 'sql' = (lesson?.path === 'sql' || user.currentPath === 'sql') ? 'sql' : 'kotlin';
    const reportId = `rep_${exercise.id}_${user.uid}_${Date.now()}`;

    const report: QuestionReport = {
      reportId,
      studentId: user.uid,
      studentName: user.displayName || 'Estudiante',
      studentEmail: user.email,
      studentCode: user.studentCode,

      pathId,
      unitId: lesson?.unit,
      lessonId: lesson?.id || 'unknown_lesson',
      lessonTitle: lesson?.title || 'Lección en curso',
      exerciseId: exercise.id,
      exerciseType: details.type,

      prompt: details.prompt,
      codeSnippet: details.codeSnippet,
      availableOptions: details.rawOptions.length > 0 ? details.rawOptions : undefined,
      expectedSolution: details.expectedSolutionText,
      userAnswer: details.userResolvedAnswer?.trim() || undefined,

      feedbackState,
      feedbackExplanation: feedbackExplanation?.trim() || undefined,

      reason: selectedReason,
      reasonLabel: currentReasonObj.label,
      comment: comment.trim() || undefined,

      timestamp: Date.now(),
      deviceInfo: typeof navigator !== 'undefined' ? `${navigator.userAgent} (${window.innerWidth}x${window.innerHeight})` : undefined,
      status: 'pending'
    };

    try {
      await questionReportService.saveReport(report);
      soundService.playWin();

      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.6 },
          colors: ['#EF4444', '#000000', '#22C55E']
        });
      } catch {
        // Ignorar si confetti falla
      }

      submittedReportRef.current = report;
      setIsSent(true);

      timerRef.current = setTimeout(() => {
        handleFinishAndClose();
      }, 1900);
    } catch (err) {
      console.error('[QuestionReportModal] Error al enviar reporte:', err);
      setIsSubmitting(false);
      alert('Hubo un problema de red. Tu reporte quedó guardado localmente.');
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        backdropFilter: 'blur(4px)',
        padding: '16px'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting && !isSent) {
          onClose();
        }
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          boxShadow: '6px 6px 0px #000000',
          borderRadius: '16px',
          maxWidth: '580px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Cabecera Neo-Brutal limpia */}
        <div
          style={{
            padding: '14px 18px',
            background: '#FFFFFF',
            borderBottom: '2.5px solid #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: '#FEE2E2',
                border: '2px solid #000000',
                boxShadow: '2px 2px 0px #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DC2626',
                flexShrink: 0
              }}
            >
              <Flag size={18} strokeWidth={2.8} fill="#DC2626" />
            </div>
            <div>
              <h2
                id="report-modal-title"
                style={{
                  margin: 0,
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: '#000000',
                  letterSpacing: '0.3px',
                  textTransform: 'uppercase'
                }}
              >
                Reportar Pregunta
              </h2>
              <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 700 }}>
                {lesson?.title ? `${lesson.title} - ` : ''}ID: {exercise.id}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (!isSubmitting) {
                soundService.playToken();
                onClose();
              }
            }}
            disabled={isSubmitting}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#FFFFFF',
              border: '2px solid #000000',
              boxShadow: '2px 2px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              color: '#000000',
              flexShrink: 0
            }}
            className="active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            aria-label="Cerrar modal"
          >
            <X size={18} strokeWidth={2.8} />
          </button>
        </div>

        {/* Cuerpo del modal con scroll */}
        <div style={{ padding: '16px 18px', overflowY: 'auto', flex: 1 }}>
          {isSent ? (
            <div
              style={{
                textAlign: 'center',
                padding: '32px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  border: '2.5px solid #000000',
                  boxShadow: '3px 3px 0px #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#15803D'
                }}
              >
                <CheckCircle2 size={32} strokeWidth={2.8} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#0F172A' }}>
                ¡Reporte Registrado con Éxito!
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#334155', maxWidth: '420px', lineHeight: 1.45, fontWeight: 700 }}>
                Se enviaron todos los detalles al profesor para su corrección. Esta pregunta ha sido omitida para que continúes aprendiendo sin bloqueos ni penalizaciones.
              </p>
              <button
                type="button"
                onClick={handleFinishAndClose}
                style={{
                  marginTop: '6px',
                  background: '#22C55E',
                  color: '#FFFFFF',
                  border: '2.5px solid #000000',
                  boxShadow: '3px 3px 0px #000000',
                  borderRadius: '12px',
                  padding: '10px 24px',
                  fontSize: '0.92rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                className="active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-green-600"
              >
                <span>Continuar Reto</span>
                <ArrowRight size={17} strokeWidth={2.8} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* ═══ SECCIÓN 1: PREGUNTA Y OPCIONES (VISIBLES SIEMPRE) ═══ */}
              <div
                style={{
                  background: '#F8FAFC',
                  border: '2px solid #000000',
                  boxShadow: '3px 3px 0px #000000',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid #E2E8F0', paddingBottom: '6px' }}>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 900, color: '#000000' }}>
                    1. Enunciado de la Pregunta
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      background: '#FFFFFF',
                      border: '1.5px solid #000000',
                      padding: '1px 6px',
                      borderRadius: '6px',
                      color: '#0F172A'
                    }}
                  >
                    Tipo: {details.type}
                  </span>
                </div>

                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.35 }}>
                  <FormattedText text={details.prompt} inline />
                </div>

                {/* Código de la pregunta si existe */}
                {details.codeSnippet && details.type !== 'spot_the_bug' && (
                  <pre
                    style={{
                      background: '#0F172A',
                      color: '#F8FAFC',
                      border: '2px solid #000000',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      fontSize: '0.78rem',
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                      overflowX: 'auto',
                      margin: 0,
                      maxHeight: '120px'
                    }}
                  >
                    {details.codeSnippet}
                  </pre>
                )}

                {/* Si es spot_the_bug, se muestran las líneas de código de forma neutra SIN señalar cuál es el error */}
                {details.type === 'spot_the_bug' && details.lines && (
                  <div
                    style={{
                      background: '#0F172A',
                      border: '2px solid #000000',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      fontSize: '0.78rem',
                      fontFamily: 'monospace'
                    }}
                  >
                    {details.lines.map((line: string, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '1px 4px',
                          color: '#F8FAFC'
                        }}
                      >
                        <span style={{ color: '#64748B', width: '20px', flexShrink: 0, textAlign: 'right' }}>
                          {idx + 1}.
                        </span>
                        <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{line}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ═══ SECCIÓN 2: MOTIVO DEL REPORTE (SIN EMOJIS) ═══ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 900, color: '#000000' }}>
                  2. ¿Cuál es el problema identificado?
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                  {REPORT_REASONS.map(reason => {
                    const isSelected = selectedReason === reason.key;
                    const IconComponent = reason.icon;
                    return (
                      <button
                        key={reason.key}
                        type="button"
                        onClick={() => {
                          soundService.playToken();
                          setSelectedReason(reason.key);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          padding: '8px 10px',
                          borderRadius: '10px',
                          background: isSelected ? '#FEF2F2' : '#FFFFFF',
                          border: isSelected ? '2px solid #EF4444' : '1.5px solid #CBD5E1',
                          boxShadow: isSelected ? '2.5px 2.5px 0px #EF4444' : 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.1s ease'
                        }}
                        className="active:translate-x-[1px] active:translate-y-[1px]"
                      >
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            background: isSelected ? '#EF4444' : '#F1F5F9',
                            color: isSelected ? '#FFFFFF' : '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            border: '1px solid #000000'
                          }}
                        >
                          <IconComponent size={14} strokeWidth={2.6} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 900, color: isSelected ? '#B91C1C' : '#0F172A', lineHeight: 1.2 }}>
                            {reason.label}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px', lineHeight: 1.25 }}>
                            {reason.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ═══ SECCIÓN 3: DETALLE / COMENTARIO (OPCIONAL) ═══ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="report-comment-input"
                  style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 900, color: '#000000' }}
                >
                  3. Detalle adicional (Opcional):
                </label>
                <textarea
                  id="report-comment-input"
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Explica qué error detectaste o por qué no calza la respuesta esperada..."
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '2px solid #000000',
                    boxShadow: '2px 2px 0px #000000',
                    fontSize: '0.82rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* ═══ ACCIONES ═══ */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => {
                    soundService.playToken();
                    onClose();
                  }}
                  disabled={isSubmitting}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    border: '2px solid #000000',
                    boxShadow: '2.5px 2.5px 0px #000000',
                    color: '#000000',
                    fontWeight: 900,
                    fontSize: '0.86rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                  className="active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: 2,
                    padding: '10px 16px',
                    borderRadius: '10px',
                    background: isSubmitting ? '#94A3B8' : '#DC2626',
                    border: '2px solid #000000',
                    boxShadow: isSubmitting ? 'none' : '2.5px 2.5px 0px #000000',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '0.88rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  className="active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  <Send size={15} strokeWidth={2.6} />
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar Reporte'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
