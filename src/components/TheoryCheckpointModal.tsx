import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { Lesson } from '../types/lesson';
import { TheoryLesson } from '../types/theory';
import { soundService } from '../services/soundService';
import { VSCodeSnippet } from './VSCodeSnippet';
import { ConsoleDevAvatar } from './ConsoleAvatar';

interface TheoryCheckpointModalProps {
  lesson: Lesson;
  theory?: TheoryLesson;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (lesson: Lesson) => void;
  onOpenFullTheory?: (theory: TheoryLesson) => void;
}

interface QuizItem {
  id: string;
  prompt: string;
  codeSnippet?: string;
  codeLanguage?: 'kotlin' | 'sql';
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const TheoryCheckpointModal: React.FC<TheoryCheckpointModalProps> = ({
  lesson,
  theory,
  isOpen,
  onClose,
  onComplete,
  onOpenFullTheory
}) => {
  if (!isOpen) return null;

  const isKotlin = lesson.path === 'kotlin';
  const pathThemeColor = isKotlin ? '#0284C7' : '#4F46E5';
  const pathDarkColor = isKotlin ? '#0369A1' : '#3730A3';
  const pathLightBg = isKotlin ? '#E0F2FE' : '#EEF2FF';

  // Paso del modal: 'read' (leer resumen) | 'quiz' (resolver 2 preguntas) | 'unlocked' (celebración final)
  const [step, setStep] = useState<'read' | 'quiz' | 'unlocked'>('read');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Extraer las 2 mejores preguntas conceptuales del banco del nivel
  const quizQuestions: QuizItem[] = useMemo(() => {
    const questions: QuizItem[] = [];
    const exercises = lesson.exercises || [];

    // Priorizar predict_output y code_cloze
    const conceptual = exercises.filter(
      (e) => e.type === 'predict_output' || e.type === 'code_cloze' || e.type === 'spot_the_bug'
    );

    const pool = conceptual.length >= 2 ? conceptual : exercises;

    for (let i = 0; i < pool.length && questions.length < 2; i++) {
      const ex = pool[i];
      if (ex.type === 'predict_output') {
        questions.push({
          id: ex.id,
          prompt: ex.prompt,
          codeSnippet: ex.code,
          codeLanguage: isKotlin ? 'kotlin' : 'sql',
          options: ex.options,
          correctIndex: ex.correctOptionIndex,
          explanation: ex.explanation
        });
      } else if (ex.type === 'code_cloze') {
        const correctIdx = ex.options.indexOf(ex.correctOption);
        questions.push({
          id: ex.id,
          prompt: ex.prompt,
          codeSnippet: ex.codeWithBlank,
          codeLanguage: isKotlin ? 'kotlin' : 'sql',
          options: ex.options,
          correctIndex: correctIdx >= 0 ? correctIdx : 0,
          explanation: ex.explanation
        });
      } else if (ex.type === 'spot_the_bug') {
        questions.push({
          id: ex.id,
          prompt: ex.prompt,
          codeSnippet: ex.codeSnippet.join('\n'),
          codeLanguage: isKotlin ? 'kotlin' : 'sql',
          options: ex.codeSnippet.map((line, idx) => `Línea ${idx + 1}: ${line}`),
          correctIndex: ex.bugLineIndex,
          explanation: ex.explanation
        });
      }
    }

    // Fallback de seguridad si no hubiera suficientes preguntas en el banco
    if (questions.length < 2 && theory) {
      const sec = theory.sections[0];
      const keyPoints = sec?.keyPoints || ['Comprender la sintaxis básica', 'Ejecutar paso a paso'];
      while (questions.length < 2) {
        questions.push({
          id: `fallback-${questions.length}`,
          prompt: `¿Cuál de las siguientes es una regla o concepto fundamental en ${lesson.title}?`,
          options: [
            keyPoints[0] || 'Seguir la secuencia lógica del programa',
            'Ignorar los tipos de datos en tiempo de compilación',
            'Ejecutar las instrucciones en orden aleatorio',
            'No definir salida de resultados en consola'
          ],
          correctIndex: 0,
          explanation: sec?.byteTip || 'Todo programa requiere consistencia lógica y orden de ejecución.'
        });
      }
    }

    return questions.slice(0, 2);
  }, [lesson, theory, isKotlin]);

  const currentQuestion = quizQuestions[currentQuizIndex];

  // Manejo de selección de opción en el micro-quiz
  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked && isCorrect) return; // Ya acertó, esperar a que avance
    setSelectedOption(idx);
    soundService.playToken();

    const correct = idx === currentQuestion.correctIndex;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      soundService.playCorrect();
    } else {
      soundService.playError();
    }
  };

  // Avanzar a la siguiente pregunta o completar el quiz
  const handleNextQuestion = () => {
    soundService.playToken();
    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      // Micro-quiz terminado con éxito
      soundService.playWin();
      confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      setStep('unlocked');
    }
  };

  const primarySection = theory?.sections[0];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.72)',
        backdropFilter: 'blur(7px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="checkpoint-modal-content"
        style={{
          background: '#FFFFFF',
          borderRadius: '26px',
          border: `3px solid ${pathThemeColor}`,
          boxShadow: `0 8px 0 ${pathDarkColor}, 0 20px 40px rgba(0, 0, 0, 0.25)`,
          width: '100%',
          maxWidth: '580px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* ═══ CABECERA SUPERIOR GAMIFICADA ═══ */}
        <div
          style={{
            background: isKotlin
              ? 'linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%)'
              : 'linear-gradient(135deg, #4338CA 0%, #6366F1 100%)',
            padding: '16px 20px',
            borderBottom: '3px solid rgba(0, 0, 0, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#FFFFFF',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.22)',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 0 rgba(0,0,0,0.15)'
              }}
            >
              {step === 'read' ? (
                <BookOpen size={20} color="#FFFFFF" strokeWidth={2.4} />
              ) : step === 'quiz' ? (
                <Sparkles size={20} color="#FEF08A" strokeWidth={2.4} />
              ) : (
                <CheckCircle2 size={22} color="#86EFAC" strokeWidth={2.6} />
              )}
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  color: '#FEF08A'
                }}
              >
                {step === 'read'
                  ? 'Fase 1: Preparación Conceptual'
                  : step === 'quiz'
                  ? `Fase 2: Comprobación (${currentQuizIndex + 1}/2)`
                  : '¡Nivel Desbloqueado!'}
              </div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.25 }}>
                {lesson.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playToken();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              border: '2px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '12px',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.12s ease'
            }}
            title="Volver a la ruta"
          >
            <X size={18} strokeWidth={2.6} />
          </button>
        </div>

        {/* ═══ BARRA DE PROGRESO DE FASE ═══ */}
        <div style={{ height: '6px', background: '#E2E8F0', width: '100%', flexShrink: 0 }}>
          <div
            style={{
              height: '100%',
              background: step === 'unlocked' ? '#22C55E' : pathThemeColor,
              width:
                step === 'read'
                  ? '33%'
                  : step === 'quiz'
                  ? `${33 + (currentQuizIndex + 1) * 33}%`
                  : '100%',
              transition: 'width 0.3s ease'
            }}
          />
        </div>

        {/* ═══ CONTENIDO DEL MODAL CON SCROLL SUAVE ═══ */}
        <div
          style={{
            padding: '20px 22px',
            overflowY: 'auto',
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {/* ══════════════════════════════════════════════════════════
              PASO 1: LECTURA DE RESUMEN CLAVE (1 MINUTO)
             ══════════════════════════════════════════════════════════ */}
          {step === 'read' && (
            <>
              {/* Burbuja Guía del Avatar Byte */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  background: pathLightBg,
                  border: `2px solid ${pathThemeColor}`,
                  borderRadius: '18px',
                  padding: '12px 14px',
                  boxShadow: `0 3px 0 ${pathDarkColor}`
                }}
              >
                <div style={{ flexShrink: 0, marginTop: '2px' }}>
                  <ConsoleDevAvatar size={36} mood="happy" />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 900, color: pathDarkColor, textTransform: 'uppercase' }}>
                    Byte te aconseja:
                  </div>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.9rem', color: '#0F172A', fontWeight: 700, lineHeight: 1.4 }}>
                    ¡Lee este resumen relámpago (1 min) antes de los retos prácticos! Así dominarás la sintaxis y no perderás vidas.
                  </p>
                </div>
              </div>

              {/* Analogía Intuitiva del Mundo Real */}
              {theory?.analogy && (
                <div
                  style={{
                    background: '#FEF9C3',
                    border: '2px solid #FACC15',
                    boxShadow: '0 3px 0 #EAB308',
                    borderRadius: '18px',
                    padding: '14px 16px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#A16207',
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      marginBottom: '6px'
                    }}
                  >
                    <Lightbulb size={16} strokeWidth={2.8} />
                    <span>Analogía para Entender a la Primera</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#713F12', fontWeight: 600, lineHeight: 1.45 }}>
                    {theory.analogy}
                  </p>
                </div>
              )}

              {/* Concepto Central & Explicación */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E2E8F0',
                  borderRadius: '18px',
                  padding: '16px',
                  boxShadow: '0 3px 0 #CBD5E1'
                }}
              >
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 900, color: '#0F172A' }}>
                  {primarySection?.title || 'Concepto Fundamental'}
                </h4>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155', fontWeight: 600, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                  {primarySection?.explanation?.split('\n\n')[0] || lesson.description}
                </p>

                {/* Código de Ejemplo Sintético */}
                {primarySection?.codeSnippet && (
                  <div style={{ marginTop: '12px', flexShrink: 0 }}>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 900,
                        color: '#64748B',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <span>Código Conceptual:</span>
                    </div>
                    <VSCodeSnippet
                      code={primarySection.codeSnippet}
                      language={isKotlin ? 'kotlin' : 'sql'}
                      showLineNumbers={false}
                      maxHeight="220px"
                    />
                  </div>
                )}
              </div>

              {/* Puntos Clave para la Práctica */}
              {primarySection?.keyPoints && primarySection.keyPoints.length > 0 && (
                <div
                  style={{
                    background: '#F0FDF4',
                    border: '2px solid #86EFAC',
                    boxShadow: '0 3px 0 #4ADE80',
                    borderRadius: '16px',
                    padding: '12px 16px'
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 900,
                      color: '#15803D',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <CheckCircle2 size={15} color="#16A34A" strokeWidth={2.8} />
                    <span>Reglas de Oro que Verás en los Retos</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {primarySection.keyPoints.slice(0, 3).map((pt, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#16A34A', fontWeight: 900 }}>•</span>
                        <span style={{ fontSize: '0.88rem', color: '#14532D', fontWeight: 700, lineHeight: 1.35 }}>
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tip o Trampa a Evitar */}
              {(primarySection?.byteTip || primarySection?.pitfallTip) && (
                <div
                  style={{
                    background: primarySection?.pitfallTip ? '#FEF2F2' : '#F0F9FF',
                    border: `1.5px solid ${primarySection?.pitfallTip ? '#FECACA' : '#BAE6FD'}`,
                    borderLeft: `4px solid ${primarySection?.pitfallTip ? '#EF4444' : '#0284C7'}`,
                    borderRadius: '12px',
                    padding: '10px 14px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: primarySection?.pitfallTip ? '#DC2626' : '#0284C7',
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      textTransform: 'uppercase'
                    }}
                  >
                    {primarySection?.pitfallTip ? <AlertTriangle size={14} /> : <Info size={14} />}
                    <span>{primarySection?.pitfallTip ? 'Trampa común a evitar' : 'Tip de Compilación'}</span>
                  </div>
                  <p
                    style={{
                      margin: '3px 0 0 0',
                      fontSize: '0.86rem',
                      color: primarySection?.pitfallTip ? '#991B1B' : '#0369A1',
                      fontWeight: 600,
                      lineHeight: 1.4
                    }}
                  >
                    {primarySection?.pitfallTip || primarySection?.byteTip}
                  </p>
                </div>
              )}

              {/* Enlace opcional a la teoría completa en Cursos */}
              {theory && onOpenFullTheory && (
                <button
                  onClick={() => {
                    soundService.playToken();
                    onOpenFullTheory(theory);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: pathThemeColor,
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    padding: '4px 0'
                  }}
                >
                  <span>¿Deseas leer el artículo completo con video? Ir a Cursos</span>
                  <ExternalLink size={14} />
                </button>
              )}
            </>
          )}

          {/* ══════════════════════════════════════════════════════════
              PASO 2: MICRO-QUIZ DE 2 PREGUNTAS (COMPROBACIÓN RÁPIDA)
             ══════════════════════════════════════════════════════════ */}
          {step === 'quiz' && currentQuestion && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    background: pathLightBg,
                    border: `1.5px solid ${pathThemeColor}`,
                    color: pathDarkColor,
                    padding: '3px 10px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 900
                  }}
                >
                  Pregunta {currentQuizIndex + 1} de {quizQuestions.length}
                </span>

                <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 800 }}>
                  Responde para desbloquear el nivel
                </span>
              </div>

              {/* Enunciado de la pregunta */}
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: '#0F172A',
                  lineHeight: 1.4
                }}
              >
                {currentQuestion.prompt}
              </div>

              {/* Snippet si la pregunta incluye código */}
              {currentQuestion.codeSnippet && (
                <div style={{ flexShrink: 0, width: '100%' }}>
                  <VSCodeSnippet
                    code={currentQuestion.codeSnippet}
                    language={currentQuestion.codeLanguage || (isKotlin ? 'kotlin' : 'sql')}
                    showLineNumbers={false}
                    maxHeight="260px"
                  />
                </div>
              )}

              {/* Lista de Opciones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isThisCorrect = idx === currentQuestion.correctIndex;

                  let optBg = '#FFFFFF';
                  let optBorder = '#CBD5E1';
                  let optShadow = '#94A3B8';
                  let optColor = '#0F172A';

                  if (isAnswerChecked) {
                    if (isThisCorrect) {
                      optBg = '#DCFCE7';
                      optBorder = '#22C55E';
                      optShadow = '#16A34A';
                      optColor = '#14532D';
                    } else if (isSelected && !isThisCorrect) {
                      optBg = '#FEE2E2';
                      optBorder = '#EF4444';
                      optShadow = '#DC2626';
                      optColor = '#991B1B';
                    }
                  } else if (isSelected) {
                    optBg = pathLightBg;
                    optBorder = pathThemeColor;
                    optShadow = pathDarkColor;
                    optColor = pathDarkColor;
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      style={{
                        padding: '13px 16px',
                        borderRadius: '16px',
                        background: optBg,
                        border: `2px solid ${optBorder}`,
                        boxShadow: `0 3px 0 ${optShadow}`,
                        color: optColor,
                        fontSize: '0.94rem',
                        fontWeight: 800,
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        transition: 'all 0.12s ease'
                      }}
                    >
                      <span className={currentQuestion.codeSnippet ? "font-mono" : ""}>{opt}</span>
                      {isAnswerChecked && isThisCorrect && (
                        <CheckCircle2 size={20} color="#16A34A" strokeWidth={2.8} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hoja de Feedback tras responder */}
              {isAnswerChecked && (
                <div
                  style={{
                    background: isCorrect ? '#F0FDF4' : '#FEF2F2',
                    border: `2px solid ${isCorrect ? '#86EFAC' : '#FECACA'}`,
                    boxShadow: `0 3px 0 ${isCorrect ? '#4ADE80' : '#F87171'}`,
                    borderRadius: '16px',
                    padding: '12px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    marginTop: '4px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: isCorrect ? '#15803D' : '#DC2626',
                      fontWeight: 900,
                      fontSize: '0.88rem'
                    }}
                  >
                    {isCorrect ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                    <span>{isCorrect ? '¡Excelente deducción!' : '¡Casi! Inténtalo de nuevo'}</span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.88rem',
                      color: isCorrect ? '#14532D' : '#991B1B',
                      fontWeight: 600,
                      lineHeight: 1.4
                    }}
                  >
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </>
          )}

          {/* ══════════════════════════════════════════════════════════
              PASO 3: CELEBRACIÓN DE DESBLOQUEO EXITOSO
             ══════════════════════════════════════════════════════════ */}
          {step === 'unlocked' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '20px 10px',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '24px',
                  background: '#22C55E',
                  border: '3px solid #16A34A',
                  boxShadow: '0 6px 0 #15803D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <CheckCircle2 size={46} strokeWidth={2.8} />
              </div>

              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
                  ¡Materia Dominada con Éxito!
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#475569', fontWeight: 600, margin: 0, maxWidth: '400px' }}>
                  Has verificado tu comprensión teórica de <strong>{lesson.title}</strong>. El nivel ya está desbloqueado para poner a prueba tu código.
                </p>
              </div>

              {/* Tarjeta de Recompensas de Estudio */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  background: '#F8FAFC',
                  border: '2px solid #CBD5E1',
                  borderRadius: '16px',
                  padding: '10px 20px',
                  boxShadow: '0 3px 0 #94A3B8'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '1.2rem' }}>⚡</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.94rem', fontWeight: 900, color: '#0284C7' }}>+10 XP</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800 }}>Bonus de Estudio</div>
                  </div>
                </div>

                <div style={{ width: '1px', background: '#CBD5E1' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '1.2rem' }}>💎</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.94rem', fontWeight: 900, color: '#16A34A' }}>Desbloqueado</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800 }}>Nivel de Juego</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ═══ BARRA INFERIOR DE ACCIÓN TÁCTIL 3D ═══ */}
        <div
          style={{
            padding: '16px 22px',
            borderTop: '2px solid #E2E8F0',
            background: '#F8FAFC',
            display: 'flex',
            gap: '12px',
            flexShrink: 0
          }}
        >
          {step === 'read' && (
            <button
              onClick={() => {
                soundService.playToken();
                setStep('quiz');
              }}
              className="btn-3d btn-blue"
              style={{
                flex: 1,
                padding: '14px 20px',
                fontSize: '1rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>Comprobar lo aprendido (2 Preguntas)</span>
              <ArrowRight size={18} strokeWidth={2.8} />
            </button>
          )}

          {step === 'quiz' && (
            <button
              disabled={!isAnswerChecked || !isCorrect}
              onClick={handleNextQuestion}
              className={`btn-3d ${isAnswerChecked && isCorrect ? 'btn-green' : 'btn-disabled'}`}
              style={{
                flex: 1,
                padding: '14px 20px',
                fontSize: '1rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>
                {currentQuizIndex + 1 < quizQuestions.length ? 'Siguiente Pregunta' : '¡Validar y Desbloquear Nivel!'}
              </span>
              <ArrowRight size={18} strokeWidth={2.8} />
            </button>
          )}

          {step === 'unlocked' && (
            <button
              onClick={() => {
                soundService.playToken();
                onComplete(lesson);
              }}
              className="btn-3d btn-green"
              style={{
                flex: 1,
                padding: '14px 20px',
                fontSize: '1.05rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <Play size={20} fill="#FFFFFF" />
              <span>🚀 ¡COMENZAR RETO DE CÓDIGO!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
