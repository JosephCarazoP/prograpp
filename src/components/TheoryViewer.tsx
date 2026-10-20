import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Play,
  BookOpen,
  Sparkles,
  ArrowUp,
  Lightbulb,
  Terminal,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TheoryLesson } from '../types/theory';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { leagueService } from '../services/leagueService';
import { VSCodeSnippet } from './VSCodeSnippet';
import { ConsoleDevAvatar } from './ConsoleAvatar';
import { getLessonById } from '../content';

interface QuickQuizItem {
  id: string;
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface TheoryViewerProps {
  theory: TheoryLesson;
  user?: UserProfile;
  onBack: () => void;
  onStartPractice: (lessonId: string) => void;
  onCompleteTheory?: (lessonId: string) => Promise<void> | void;
}

export const TheoryViewer: React.FC<TheoryViewerProps> = ({
  theory,
  user,
  onBack,
  onStartPractice,
  onCompleteTheory
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (user?.uid) {
      leagueService.recordTheoryRead(user.uid, theory.lessonId);
    }
  }, [theory.lessonId, user?.uid]);

  const isKotlin = theory.pathId === 'kotlin';
  const accentColor = isKotlin ? '#0284C7' : '#4F46E5';
  const accentDark = isKotlin ? '#0369A1' : '#3730A3';
  const badgeBg = isKotlin ? '#E0F2FE' : '#EEF2FF';

  // Estados interactivos del Simulador de Código en Vivo
  const [runningSection, setRunningSection] = useState<number | null>(null);
  const [executedSections, setExecutedSections] = useState<Record<number, boolean>>({});

  // Tarjetas de revelación "Bajo el capó"
  const [expandedSecrets, setExpandedSecrets] = useState<Record<number, boolean>>({});

  // ═══ ESTADOS DEL MICRO-QUIZ EXPRÉS (3 PREGUNTAS MÁXIMO) ═══
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizAnswerChecked, setIsQuizAnswerChecked] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Extraer exactamente 3 preguntas conceptuales ágiles del banco de la lección
  const quickQuizQuestions: QuickQuizItem[] = useMemo(() => {
    const lesson = getLessonById(theory.lessonId);
    if (!lesson || !lesson.exercises) return [];

    const items: QuickQuizItem[] = [];
    for (const ex of lesson.exercises) {
      if (items.length >= 3) break;
      if (ex.type === 'predict_output') {
        items.push({
          id: ex.id,
          prompt: ex.prompt,
          codeSnippet: ex.code,
          options: ex.options,
          correctIndex: ex.correctOptionIndex,
          explanation: ex.explanation
        });
      } else if (ex.type === 'code_cloze') {
        const correctIdx = ex.options.indexOf(ex.correctOption);
        items.push({
          id: ex.id,
          prompt: ex.prompt,
          codeSnippet: ex.codeWithBlank,
          options: ex.options,
          correctIndex: correctIdx >= 0 ? correctIdx : 0,
          explanation: ex.explanation
        });
      } else if (ex.type === 'spot_the_bug') {
        items.push({
          id: ex.id,
          prompt: ex.prompt,
          codeSnippet: ex.codeSnippet.join('\n'),
          options: ex.codeSnippet.map((line, idx) => `Línea ${idx + 1}: ${line}`),
          correctIndex: ex.bugLineIndex,
          explanation: ex.explanation
        });
      }
    }
    return items;
  }, [theory.lessonId]);

  // Manejador del Simulador en Vivo
  const handleRunCode = (idx: number) => {
    soundService.playToken();
    setRunningSection(idx);

    setTimeout(() => {
      setRunningSection(null);
      setExecutedSections((prev) => ({ ...prev, [idx]: true }));
      soundService.playCorrect();
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 }
      });
    }, 450);
  };

  // Manejo del Micro-Quiz Exprés
  const currentQuizExercise = quickQuizQuestions[quizIndex];

  const handleCheckQuizAnswer = () => {
    if (selectedQuizOption === null || !currentQuizExercise) return;
    setIsQuizAnswerChecked(true);

    const isCorrectAnswer = selectedQuizOption === currentQuizExercise.correctIndex;

    if (isCorrectAnswer) {
      soundService.playCorrect();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
    } else {
      soundService.playError();
    }
  };

  const handleNextQuizQuestion = async () => {
    if (quizIndex < quickQuizQuestions.length - 1) {
      soundService.playToken();
      setQuizIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
      setIsQuizAnswerChecked(false);
    } else {
      // Quiz finalizado con éxito
      soundService.playWin();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.55 } });
      setIsQuizCompleted(true);
      if (user?.uid) {
        leagueService.recordQuizCompleted(user.uid, theory.lessonId);
      }

      if (onCompleteTheory) {
        await onCompleteTheory(theory.lessonId);
      }
    }
  };

  return (
    <div style={{ padding: '4px 12px 70px 12px', maxWidth: '740px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* ═══ BARRA SUPERIOR DE NAVEGACIÓN DEDICADA ═══ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          padding: '6px 0',
          gap: '10px',
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={() => {
            soundService.playToken();
            onBack();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#0F172A',
            fontSize: '0.92rem',
            fontWeight: 800,
            cursor: 'pointer',
            padding: '10px 18px',
            borderRadius: '14px',
            background: '#FFFFFF',
            border: `2px solid ${isKotlin ? '#38BDF8' : '#818CF8'}`,
            boxShadow: `0 3px 0 ${isKotlin ? '#0284C7' : '#4F46E5'}`,
            transition: 'all 0.15s ease'
          }}
          title="Regresar a la biblioteca de cursos"
        >
          <ArrowLeft size={18} strokeWidth={2.8} color={accentColor} />
          <span>Volver a Cursos</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: badgeBg,
              color: accentColor,
              border: `2px solid ${isKotlin ? '#38BDF8' : '#818CF8'}`,
              boxShadow: `0 2px 0 ${isKotlin ? '#0284C7' : '#4F46E5'}`,
              padding: '8px 14px',
              borderRadius: '14px',
              fontSize: '0.84rem',
              fontWeight: 900
            }}
          >
            <Clock size={15} strokeWidth={2.5} />
            <span>{theory.estimatedMinutes} min interactivos</span>
          </div>
        </div>
      </div>

      {/* ═══ PESTAÑAS DE MODO RÁPIDO: LEER MATERIA VS QUIZ EXPRÉS (3 PREGUNTAS) ═══ */}
      <div
        style={{
          display: 'flex',
          background: '#FFFFFF',
          border: '2px solid #CBD5E1',
          borderRadius: '18px',
          padding: '5px',
          gap: '8px',
          marginBottom: '20px',
          boxShadow: '0 4px 0 #94A3B8'
        }}
      >
        <button
          onClick={() => {
            soundService.playToken();
            setIsQuizMode(false);
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '11px 14px',
            borderRadius: '14px',
            background: !isQuizMode ? accentColor : 'transparent',
            color: !isQuizMode ? '#FFFFFF' : '#475569',
            border: 'none',
            fontSize: '0.94rem',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: !isQuizMode ? `0 3px 0 ${accentDark}` : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <BookOpen size={18} />
          <span>Materia Interactiva</span>
        </button>

        <button
          onClick={() => {
            soundService.playToken();
            setIsQuizMode(true);
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '11px 14px',
            borderRadius: '14px',
            background: isQuizMode ? '#10B981' : 'transparent',
            color: isQuizMode ? '#FFFFFF' : '#475569',
            border: 'none',
            fontSize: '0.94rem',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: isQuizMode ? '0 3px 0 #059669' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <Zap size={18} fill={isQuizMode ? '#FFFFFF' : 'none'} />
          <span>Quiz Exprés (3 Preguntas)</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          VISTA 1: QUIZ EXPRÉS DE LA MATERIA (3 PREGUNTAS RÁPIDAS Y CORTAS)
         ══════════════════════════════════════════════════════════════════════════ */}
      {isQuizMode ? (
        <div
          style={{
            background: '#FFFFFF',
            border: '3px solid #10B981',
            borderRadius: '24px',
            padding: '24px 22px',
            boxShadow: '0 8px 0 #059669, 0 12px 28px rgba(16, 185, 129, 0.12)',
            marginBottom: '30px'
          }}
        >
          {!isQuizCompleted ? (
            <div>
              {/* Encabezado del Quiz */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      background: '#ECFDF5',
                      border: '1.5px solid #A7F3D0',
                      color: '#047857',
                      fontSize: '0.78rem',
                      fontWeight: 900,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Quiz de Validación • Pregunta {quizIndex + 1} de {quickQuizQuestions.length}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {quickQuizQuestions.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '28px',
                        height: '7px',
                        borderRadius: '4px',
                        background: i < quizIndex ? '#10B981' : i === quizIndex ? '#F59E0B' : '#E2E8F0',
                        transition: 'background-color 0.2s ease'
                      }}
                    />
                  ))}
                </div>
              </div>

              {currentQuizExercise ? (
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: '0 0 14px 0', lineHeight: 1.35 }}>
                    {currentQuizExercise.prompt}
                  </h3>

                  {/* Snippet si la pregunta tiene código */}
                  {currentQuizExercise.codeSnippet && (
                    <div style={{ margin: '14px 0' }}>
                      <VSCodeSnippet
                        code={currentQuizExercise.codeSnippet}
                        filename={isKotlin ? 'ejemplo.kt' : 'consulta.sql'}
                        language={isKotlin ? 'kotlin' : 'sql'}
                      />
                    </div>
                  )}

                  {/* Opciones interactivas */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                    {currentQuizExercise.options?.map((opt, optIdx) => {
                      const isSelected = selectedQuizOption === optIdx;
                      const letter = String.fromCharCode(65 + optIdx);

                      let border = '#CBD5E1';
                      let bg = '#FFFFFF';
                      let color = '#0F172A';
                      let shadow = '#94A3B8';

                      if (isQuizAnswerChecked) {
                        const isCorrectOpt = optIdx === currentQuizExercise.correctIndex;

                        if (isCorrectOpt) {
                          border = '#22C55E';
                          bg = '#ECFDF5';
                          color = '#15803D';
                          shadow = '#16A34A';
                        } else if (isSelected) {
                          border = '#EF4444';
                          bg = '#FEF2F2';
                          color = '#991B1B';
                          shadow = '#DC2626';
                        }
                      } else if (isSelected) {
                        border = '#0284C7';
                        bg = '#F0F9FF';
                        color = '#0369A1';
                        shadow = '#0284C7';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isQuizAnswerChecked}
                          onClick={() => {
                            soundService.playToken();
                            setSelectedQuizOption(optIdx);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 16px',
                            borderRadius: '16px',
                            border: `2px solid ${border}`,
                            background: bg,
                            color,
                            boxShadow: `0 4px 0 ${shadow}`,
                            cursor: isQuizAnswerChecked ? 'default' : 'pointer',
                            textAlign: 'left',
                            fontSize: '0.96rem',
                            fontWeight: 800,
                            transition: 'all 0.12s ease'
                          }}
                        >
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '10px',
                              background: isSelected ? accentColor : '#F1F5F9',
                              color: isSelected ? '#FFFFFF' : '#475569',
                              border: `1.5px solid ${isSelected ? accentDark : '#CBD5E1'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 900,
                              fontSize: '0.86rem',
                              flexShrink: 0
                            }}
                          >
                            {letter}
                          </div>
                          <span style={{ flex: 1, fontFamily: 'inherit' }}>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explicación pedagógica tras comprobar */}
                  {isQuizAnswerChecked && (
                    <div
                      style={{
                        background: '#F8FAFC',
                        border: '2px solid #CBD5E1',
                        borderRadius: '16px',
                        padding: '14px 16px',
                        marginTop: '16px',
                        boxShadow: '0 2px 0 #94A3B8'
                      }}
                    >
                      <strong style={{ color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                        Explicación:
                      </strong>
                      <span style={{ color: '#334155', fontSize: '0.92rem', lineHeight: 1.5, fontWeight: 600 }}>
                        {currentQuizExercise.explanation}
                      </span>
                    </div>
                  )}

                  {/* Botón de Comprobar / Avanzar */}
                  <div style={{ marginTop: '22px' }}>
                    {!isQuizAnswerChecked ? (
                      <button
                        className="btn-3d btn-green"
                        disabled={selectedQuizOption === null}
                        onClick={handleCheckQuizAnswer}
                        style={{
                          width: '100%',
                          padding: '15px',
                          borderRadius: '16px',
                          fontSize: '1.05rem',
                          fontWeight: 900
                        }}
                      >
                        COMPROBAR RESPUESTA
                      </button>
                    ) : (
                      <button
                        className="btn-3d btn-blue"
                        onClick={handleNextQuizQuestion}
                        style={{
                          width: '100%',
                          padding: '15px',
                          borderRadius: '16px',
                          fontSize: '1.05rem',
                          fontWeight: 900
                        }}
                      >
                        {quizIndex < quickQuizQuestions.length - 1 ? 'SIGUIENTE PREGUNTA' : 'FINALIZAR QUIZ EXPRÉS'}
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            /* ═══ CELEBRACIÓN DE QUIZ COMPLETADO ═══ */
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏆</div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: '0 0 8px 0' }}>
                ¡Materia Dominada con Éxito!
              </h3>
              <p style={{ color: '#475569', fontSize: '1rem', fontWeight: 700, margin: '0 0 20px 0', lineHeight: 1.5 }}>
                Has validado tu comprensión conceptual de <strong>{theory.title}</strong> en solo 3 preguntas ágiles.
                ¡Se ha guardado tu insignia teórica y ganado <strong style={{ color: '#16A34A' }}>+25 XP</strong>!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '420px', margin: '0 auto' }}>
                <button
                  className="btn-3d btn-green"
                  onClick={() => onStartPractice(theory.lessonId)}
                  style={{ width: '100%', padding: '15px', borderRadius: '16px', fontSize: '1rem', fontWeight: 900 }}
                >
                  🎮 IR A LA PRÁCTICA COMPLETA (10 RETOS)
                </button>

                <button
                  className="btn-3d btn-blue"
                  onClick={onBack}
                  style={{ width: '100%', padding: '13px', borderRadius: '16px', fontSize: '0.94rem', fontWeight: 800 }}
                >
                  Volver al Catálogo de Cursos
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════════════════════
            VISTA 2: CONTENIDO ENRIQUECIDO E INTERACTIVO DE LA MATERIA
           ══════════════════════════════════════════════════════════════════════════ */
        <>
          {/* ═══ TARJETA HERO DE LA MATERIA ═══ */}
          <div
            style={{
              background: '#FFFFFF',
              border: `2.5px solid ${accentColor}`,
              borderRadius: '24px',
              padding: '24px 22px',
              marginBottom: '22px',
              boxShadow: `0 6px 0 ${accentDark}, 0 10px 24px rgba(15, 23, 42, 0.08)`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '10px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: isKotlin ? '#E0F2FE' : '#EEF2FF',
                      color: accentColor,
                      border: `1.5px solid ${isKotlin ? '#BAE6FD' : '#C7D2FE'}`,
                      fontSize: '0.78rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                      padding: '4px 12px',
                      borderRadius: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <BookOpen size={14} strokeWidth={2.5} />
                    Materia Interactiva • Unidad {theory.unitId} • Nivel {theory.levelId}
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    margin: '8px 0 10px 0',
                    lineHeight: 1.25,
                    color: '#0F172A',
                    letterSpacing: '-0.3px'
                  }}
                >
                  {theory.title}
                </h1>

                <p
                  style={{
                    color: '#1E293B',
                    fontSize: '1.04rem',
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 600
                  }}
                >
                  {theory.subtitle}
                </p>
              </div>

              <div style={{ flexShrink: 0 }}>
                <ConsoleDevAvatar size={68} mood="happy" />
              </div>
            </div>
          </div>

          {/* ═══ ANALOGÍA INTUITIVA DEL MUNDO REAL ═══ */}
          {theory.analogy && (
            <div
              style={{
                background: '#FFFBEB',
                border: '2.5px solid #F59E0B',
                borderRadius: '20px',
                padding: '20px 22px',
                marginBottom: '26px',
                boxShadow: '0 5px 0 #D97706, 0 8px 20px rgba(245, 158, 11, 0.1)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#B45309',
                  fontWeight: 900,
                  fontSize: '0.86rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px'
                }}
              >
                <Lightbulb size={20} strokeWidth={2.8} />
                <span>Analogía para Aprender a la Primera</span>
              </div>
              <p
                style={{
                  margin: 0,
                  color: '#78350F',
                  fontSize: '1.02rem',
                  lineHeight: 1.65,
                  fontWeight: 700
                }}
              >
                {theory.analogy}
              </p>
            </div>
          )}

          {/* ═══ VIDEO RECOMENDADO EMBEBIDO (SI EXISTE) ═══ */}
          {theory.video && (
            <div
              style={{
                background: '#FFFFFF',
                border: '2.5px solid #EF4444',
                borderTop: '6px solid #DC2626',
                borderRadius: '22px',
                padding: '22px',
                marginBottom: '26px',
                boxShadow: '0 6px 0 #991B1B, 0 10px 22px rgba(220, 38, 38, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      background: '#FEE2E2',
                      border: '1.5px solid #FECACA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#DC2626">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block' }}>
                      Video Explicativo Recomendado
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.08rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.3 }}>
                      {theory.video.title}
                    </h3>
                  </div>
                </div>
              </div>

              {(() => {
                const ytMatch = theory.video.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
                const videoId = ytMatch ? ytMatch[1] : null;

                return videoId ? (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '56.25%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      marginBottom: '14px',
                      border: '2px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      background: '#0F172A'
                    }}
                  >
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                      title={theory.video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none'
                      }}
                    />
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {/* ═══ SECCIONES DE CONTENIDO INTERACTIVO ═══ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', marginBottom: '30px' }}>
            {theory.sections.map((section, idx) => {
              const isSimulating = runningSection === idx;
              const hasExecuted = executedSections[idx];
              const isSecretOpen = expandedSecrets[idx];

              return (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: `2.5px solid ${isKotlin ? '#38BDF8' : '#818CF8'}`,
                    borderTop: `6px solid ${accentColor}`,
                    borderRadius: '22px',
                    padding: '24px 22px',
                    boxShadow: `0 6px 0 ${accentDark}, 0 8px 20px rgba(15, 23, 42, 0.05)`,
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span
                      style={{
                        background: badgeBg,
                        color: accentColor,
                        border: `1.5px solid ${isKotlin ? '#BAE6FD' : '#C7D2FE'}`,
                        fontSize: '0.74rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        padding: '3px 10px',
                        borderRadius: '8px'
                      }}
                    >
                      Módulo {idx + 1}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 900,
                      color: '#0F172A',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      lineHeight: 1.3
                    }}
                  >
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: accentColor,
                        flexShrink: 0
                      }}
                    />
                    <span>{section.title}</span>
                  </h2>

                  {/* Texto de explicación con alto contraste */}
                  <p
                    style={{
                      color: '#0F172A',
                      fontSize: '1.02rem',
                      lineHeight: 1.8,
                      marginBottom: '18px',
                      whiteSpace: 'pre-line',
                      fontWeight: 600
                    }}
                  >
                    {section.explanation}
                  </p>

                  {/* ═══ SIMULADOR INTERACTIVO DE CÓDIGO (EN VIVO) ═══ */}
                  {section.codeSnippet && (
                    <div
                      style={{
                        margin: '18px 0 14px 0',
                        background: '#0F172A',
                        borderRadius: '18px',
                        border: '2px solid #334155',
                        overflow: 'hidden',
                        boxShadow: '0 5px 0 #020617'
                      }}
                    >
                      {/* Barra de herramientas del simulador */}
                      <div
                        style={{
                          background: '#1E293B',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '2px solid #0F172A',
                          flexWrap: 'wrap',
                          gap: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                          <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'JetBrains Mono', fontWeight: 800, marginLeft: '6px' }}>
                            {theory.pathId === 'sql' ? 'playground.sql' : 'playground.kt'}
                          </span>
                        </div>

                        {/* Botón interactivo de Ejecución en Vivo */}
                        <button
                          onClick={() => handleRunCode(idx)}
                          disabled={isSimulating}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#10B981',
                            color: '#FFFFFF',
                            border: '1.5px solid #059669',
                            boxShadow: '0 3px 0 #047857',
                            padding: '6px 14px',
                            borderRadius: '10px',
                            fontSize: '0.8rem',
                            fontWeight: 900,
                            cursor: 'pointer',
                            transition: 'all 0.1s ease'
                          }}
                        >
                          <Play size={13} fill="#FFFFFF" />
                          <span>{isSimulating ? 'Compilando...' : hasExecuted ? 'Re-Ejecutar Código' : '▶ Ejecutar Código'}</span>
                        </button>
                      </div>

                      {/* Código fuente */}
                      <div style={{ padding: '4px' }}>
                        <VSCodeSnippet
                          code={section.codeSnippet}
                          language={(section.codeLanguage || theory.pathId) as 'kotlin' | 'sql'}
                          filename={theory.pathId === 'sql' ? 'consulta.sql' : 'main.kt'}
                        />
                      </div>

                      {/* Terminal de Salida Simulada Reactiva */}
                      <div
                        style={{
                          background: '#020617',
                          borderTop: '2px solid #1E293B',
                          padding: '14px 16px',
                          fontFamily: 'var(--font-code, monospace)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 900 }}>
                            <Terminal size={14} color="#38BDF8" />
                            <span>{theory.pathId === 'sql' ? 'Resultado del Motor RDBMS' : 'Salida en Consola Terminal'}</span>
                          </div>

                          {hasExecuted && (
                            <span style={{ fontSize: '0.72rem', color: '#34D399', fontWeight: 900, background: 'rgba(52, 211, 153, 0.12)', padding: '2px 8px', borderRadius: '6px' }}>
                              ✓ Ejecutado con éxito en 0.04s
                            </span>
                          )}
                        </div>

                        <pre
                          style={{
                            margin: 0,
                            color: hasExecuted ? '#38BDF8' : '#64748B',
                            fontSize: '0.88rem',
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.55,
                            fontWeight: 700,
                            filter: isSimulating ? 'blur(2px)' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {isSimulating
                            ? '⏳ Enviando al compilador en tiempo real...'
                            : section.outputSnippet || 'Sin salida directa a terminal.'}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* ═══ TARJETA INTERACTIVA: "¿QUÉ PASA BAJO EL CAPÓ?" ═══ */}
                  <div
                    style={{
                      background: '#F8FAFC',
                      border: '2px solid #CBD5E1',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      marginTop: '16px'
                    }}
                  >
                    <button
                      onClick={() => {
                        soundService.playToken();
                        setExpandedSecrets((prev) => ({ ...prev, [idx]: !prev[idx] }));
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: 900,
                        fontSize: '0.88rem',
                        color: '#334155'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} color={accentColor} />
                        <span>💡 Secreto de Arquitectura: ¿Cómo funciona internamente?</span>
                      </div>
                      {isSecretOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {isSecretOpen && (
                      <div style={{ padding: '0 16px 14px 16px', color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 600 }}>
                        {theory.pathId === 'sql'
                          ? 'El motor SQL traduce la consulta declarativa en un árbol de operaciones algebraicas (Query Execution Plan). El optimizador de costos elige el algoritmo más veloz según los índices en memoria RAM.'
                          : 'El compilador de Kotlin (`kotlinc`) convierte tus instrucciones de alto nivel a bytecode de Java (`.class`). La Máquina Virtual (JVM) las ejecuta y optimiza mediante el compilador JIT (Just-In-Time) a código máquina de la CPU.'}
                      </div>
                    )}
                  </div>

                  {/* Tip Pro de Byte */}
                  {section.byteTip && (
                    <div
                      style={{
                        background: '#F0F9FF',
                        border: '2px solid #BAE6FD',
                        borderLeft: '5px solid #0284C7',
                        borderRadius: '14px',
                        padding: '14px 16px',
                        marginTop: '16px',
                        boxShadow: '0 2px 0 #7DD3FC'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#0369A1',
                          fontWeight: 900,
                          fontSize: '0.82rem',
                          textTransform: 'uppercase',
                          marginBottom: '4px',
                          letterSpacing: '0.5px'
                        }}
                      >
                        <Info size={16} strokeWidth={2.8} />
                        <span>Tip de Ingeniero</span>
                      </div>
                      <p style={{ margin: 0, color: '#0C4A6E', fontSize: '0.94rem', lineHeight: 1.6, fontWeight: 700 }}>
                        {section.byteTip}
                      </p>
                    </div>
                  )}

                  {/* Trampa Común a Evitar */}
                  {section.pitfallTip && (
                    <div
                      style={{
                        background: '#FEF2F2',
                        border: '2px solid #FECACA',
                        borderLeft: '5px solid #EF4444',
                        borderRadius: '14px',
                        padding: '14px 16px',
                        marginTop: '14px',
                        boxShadow: '0 2px 0 #F87171'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#B91C1C',
                          fontWeight: 900,
                          fontSize: '0.82rem',
                          textTransform: 'uppercase',
                          marginBottom: '4px',
                          letterSpacing: '0.5px'
                        }}
                      >
                        <AlertTriangle size={16} strokeWidth={2.8} />
                        <span>¡Cuidado! Error Común de Principiante</span>
                      </div>
                      <p style={{ margin: 0, color: '#991B1B', fontSize: '0.94rem', lineHeight: 1.6, fontWeight: 700 }}>
                        {section.pitfallTip}
                      </p>
                    </div>
                  )}

                  {/* Puntos Clave para Memorizar */}
                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div
                      style={{
                        background: '#F0FDF4',
                        border: '2px solid #22C55E',
                        boxShadow: '0 3px 0 #16A34A',
                        borderRadius: '16px',
                        padding: '16px 18px',
                        marginTop: '20px'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.84rem',
                          fontWeight: 900,
                          color: '#15803D',
                          textTransform: 'uppercase',
                          marginBottom: '10px',
                          letterSpacing: '0.6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <CheckCircle2 size={18} color="#16A34A" strokeWidth={2.5} />
                        <span>Conceptos Fundamentales Clave</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {section.keyPoints.map((point, pIdx) => (
                          <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <span style={{ color: '#16A34A', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1.2 }}>•</span>
                            <span style={{ fontSize: '0.96rem', color: '#14532D', fontWeight: 700, lineHeight: 1.55 }}>
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ═══ TARJETA FINAL DE VALIDACIÓN Y ACCIÓN ═══ */}
          <div
            style={{
              background: '#FFFFFF',
              border: '2.5px solid #22C55E',
              borderRadius: '24px',
              padding: '26px 22px',
              boxShadow: '0 6px 0 #16A34A, 0 10px 24px rgba(22, 163, 74, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '2.2rem' }}>⚡</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A' }}>
              ¿Listo para validar tu comprensión?
            </div>
            <div style={{ fontSize: '0.96rem', color: '#475569', fontWeight: 600, maxWidth: '520px', lineHeight: 1.5 }}>
              Elige cómo poner a prueba lo aprendido: con un <strong>Quiz Exprés de solo 3 preguntas</strong> para aprobar la teoría rápido, o con los <strong>10 retos prácticos de código</strong>.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '460px', marginTop: '6px' }}>
              <button
                className="btn-3d btn-green"
                onClick={() => {
                  soundService.playToken();
                  setIsQuizMode(true);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                style={{
                  width: '100%',
                  fontSize: '1.05rem',
                  padding: '16px 24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '16px'
                }}
              >
                <Zap size={22} fill="#FFFFFF" />
                <span>HACER QUIZ EXPRÉS (3 PREGUNTAS)</span>
              </button>

              <button
                className="btn-3d btn-blue"
                onClick={() => {
                  soundService.playToken();
                  onStartPractice(theory.lessonId);
                }}
                style={{
                  width: '100%',
                  fontSize: '0.96rem',
                  padding: '14px 20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '16px'
                }}
              >
                <Play size={18} fill="#FFFFFF" />
                <span>Práctica Completa (10 Retos de Código)</span>
              </button>
            </div>

            <button
              onClick={() => {
                soundService.playToken();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                marginTop: '6px'
              }}
            >
              <ArrowUp size={16} />
              <span>Volver al inicio de la lección</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
