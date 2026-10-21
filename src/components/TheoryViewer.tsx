import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Play,
  BookOpen,
  ArrowUp,
  Lightbulb,
  Terminal,
  Zap,
  Trophy,
  Database,
  Edit3,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  executeKotlin,
  executeSql,
  KotlinExecutionResult,
  SqlExecutionResult,
  CodeErrorDetail
} from '../utils/codeRunner';
import { TheoryLesson } from '../types/theory';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { leagueService } from '../services/leagueService';
import { VSCodeSnippet } from './VSCodeSnippet';
import { ConsoleDevAvatar } from './ConsoleAvatar';
import { getLessonById } from '../content';
import { FormattedText } from './FormattedText';

/* ═══ LOGOS VECTORIALES OFICIALES ═══ */
const KotlinLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ktOfficialGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7F52FF" />
        <stop offset="50%" stopColor="#C711E1" />
        <stop offset="100%" stopColor="#E4485D" />
      </linearGradient>
    </defs>
    <path d="M 2 2 L 22 2 L 12 12 L 22 22 L 2 22 Z" fill="url(#ktOfficialGrad)" />
  </svg>
);

const SqlDatabaseLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="6" rx="9" ry="3" fill="#60A5FA" stroke="#2563EB" strokeWidth="1.5" />
    <path d="M 3 6 V 12 C 3 13.66 7.03 15 12 15 C 16.97 15 21 13.66 21 12 V 6" stroke="#2563EB" strokeWidth="1.5" fill="#3B82F6" fillOpacity="0.2" />
    <path d="M 3 12 V 18 C 3 19.66 7.03 21 12 21 C 16.97 21 21 19.66 21 18 V 12" stroke="#2563EB" strokeWidth="1.5" fill="#2563EB" fillOpacity="0.3" />
  </svg>
);



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

  // Estados interactivos del Simulador de Código en Vivo Real
  const [runningSection, setRunningSection] = useState<number | null>(null);
  const [executedSections, setExecutedSections] = useState<Record<number, boolean>>({});
  const [customCode, setCustomCode] = useState<Record<number, string>>({});
  const [isEditingSection, setIsEditingSection] = useState<Record<number, boolean>>({});
  const [kotlinResults, setKotlinResults] = useState<Record<number, KotlinExecutionResult>>({});
  const [sqlResults, setSqlResults] = useState<Record<number, SqlExecutionResult>>({});

  // Toggle entre vista de tabla visual y consola pura para SQL
  const [viewModeTable, setViewModeTable] = useState<Record<number, boolean>>({ 0: true });

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

  // Manejador del Simulador en Vivo Real
  const handleRunCode = (idx: number, fallbackCode: string) => {
    soundService.playToken();
    setRunningSection(idx);

    const codeToRun = customCode[idx] ?? fallbackCode;

    setTimeout(() => {
      setRunningSection(null);
      setExecutedSections((prev) => ({ ...prev, [idx]: true }));

      if (theory.pathId === 'sql') {
        const res = executeSql(codeToRun);
        setSqlResults((prev) => ({ ...prev, [idx]: res }));
        if (res.success) {
          soundService.playCorrect();
          confetti({
            particleCount: 25,
            spread: 45,
            origin: { y: 0.6 }
          });
        } else {
          soundService.playError();
        }
      } else {
        const res = executeKotlin(codeToRun);
        setKotlinResults((prev) => ({ ...prev, [idx]: res }));
        if (res.success) {
          soundService.playCorrect();
          confetti({
            particleCount: 25,
            spread: 45,
            origin: { y: 0.6 }
          });
        } else {
          soundService.playError();
        }
      }
    }, 180);
  };

  const handleResetCode = (idx: number, defaultCode: string) => {
    soundService.playToken();
    setCustomCode((prev) => ({ ...prev, [idx]: defaultCode }));
    setIsEditingSection((prev) => ({ ...prev, [idx]: false }));
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
    <div style={{ padding: '4px 10px 70px 10px', maxWidth: '760px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* ═══ BARRA SUPERIOR DE NAVEGACIÓN Y ACCIÓN RÁPIDA ═══ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
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
            gap: '6px',
            color: '#000000',
            fontSize: '0.86rem',
            fontWeight: 900,
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: '12px',
            background: '#FFFFFF',
            border: '2.5px solid #000000',
            boxShadow: '3px 3px 0px #000000',
            transition: 'all 0.1s ease'
          }}
          title="Regresar al catálogo de cursos"
        >
          <ArrowLeft size={16} color="#000000" strokeWidth={2.8} />
          <span>Volver a Cursos</span>
        </button>

        {/* Pestañas de modo estilo Neo-Brutalism */}
        <div
          style={{
            display: 'inline-flex',
            background: '#FFFFFF',
            border: '2.5px solid #000000',
            borderRadius: '14px',
            padding: '3px',
            gap: '4px',
            boxShadow: '3px 3px 0px #000000'
          }}
        >
          <button
            onClick={() => {
              soundService.playToken();
              setIsQuizMode(false);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '10px',
              background: !isQuizMode ? '#FFE600' : 'transparent',
              color: '#000000',
              border: !isQuizMode ? '1.5px solid #000000' : 'none',
              boxShadow: !isQuizMode ? '1.5px 1.5px 0px #000000' : 'none',
              fontSize: '0.82rem',
              fontWeight: 900,
              cursor: 'pointer',
              transition: 'all 0.1s ease'
            }}
          >
            <BookOpen size={14} color="#000000" strokeWidth={2.5} />
            <span>Materia Interactiva</span>
          </button>

          <button
            onClick={() => {
              soundService.playToken();
              setIsQuizMode(true);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '10px',
              background: isQuizMode ? '#4ADE80' : 'transparent',
              color: '#000000',
              border: isQuizMode ? '1.5px solid #000000' : 'none',
              boxShadow: isQuizMode ? '1.5px 1.5px 0px #000000' : 'none',
              fontSize: '0.82rem',
              fontWeight: 900,
              cursor: 'pointer',
              transition: 'all 0.1s ease'
            }}
          >
            <Zap size={14} fill="#000000" color="#000000" />
            <span>Quiz Exprés (3 Preguntas)</span>
          </button>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: '#FFFFFF',
            color: '#000000',
            border: '2.5px solid #000000',
            boxShadow: '3px 3px 0px #000000',
            padding: '6px 12px',
            borderRadius: '12px',
            fontSize: '0.78rem',
            fontWeight: 900
          }}
        >
          <Clock size={13} color="#000000" strokeWidth={2.5} />
          <span>{theory.estimatedMinutes} min</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          VISTA 1: QUIZ EXPRÉS DE LA MATERIA (ESTILO NEO-BRUTALISM)
         ══════════════════════════════════════════════════════════════════════════ */}
      {isQuizMode ? (
        <div
          style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px #000000',
            borderRadius: '20px',
            padding: '24px 22px',
            marginBottom: '30px'
          }}
        >
          {!isQuizCompleted ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span
                  style={{
                    background: '#4ADE80',
                    border: '2px solid #000000',
                    boxShadow: '2px 2px 0px #000000',
                    color: '#000000',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    padding: '3px 10px',
                    borderRadius: '8px',
                    textTransform: 'uppercase'
                  }}
                >
                  Quiz de Validación • Pregunta {quizIndex + 1} de {quickQuizQuestions.length}
                </span>

                <div style={{ display: 'flex', gap: '5px' }}>
                  {quickQuizQuestions.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '26px',
                        height: '8px',
                        borderRadius: '4px',
                        border: '1.5px solid #000000',
                        background: i < quizIndex ? '#4ADE80' : i === quizIndex ? '#FFE600' : '#FFFFFF',
                        transition: 'background-color 0.2s ease'
                      }}
                    />
                  ))}
                </div>
              </div>

              {currentQuizExercise ? (
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#000000', margin: '0 0 14px 0', lineHeight: 1.35 }}>
                    <FormattedText text={currentQuizExercise.prompt} inline />
                  </h3>

                  {currentQuizExercise.codeSnippet && (
                    <div style={{ margin: '14px 0' }}>
                      <VSCodeSnippet
                        code={currentQuizExercise.codeSnippet}
                        filename={isKotlin ? 'ejemplo.kt' : 'consulta.sql'}
                        language={isKotlin ? 'kotlin' : 'sql'}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                    {currentQuizExercise.options?.map((opt, optIdx) => {
                      const isSelected = selectedQuizOption === optIdx;
                      const letter = String.fromCharCode(65 + optIdx);

                      let bg = '#FFFFFF';
                      let shadow = '3px 3px 0px #000000';

                      if (isQuizAnswerChecked) {
                        const isCorrectOpt = optIdx === currentQuizExercise.correctIndex;
                        if (isCorrectOpt) {
                          bg = '#8DE342';
                        } else if (isSelected) {
                          bg = '#FF6584';
                        }
                      } else if (isSelected) {
                        bg = '#FFE600';
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
                            padding: '12px 16px',
                            borderRadius: '12px',
                            background: bg,
                            border: '2.5px solid #000000',
                            boxShadow: shadow,
                            color: '#000000',
                            cursor: isQuizAnswerChecked ? 'default' : 'pointer',
                            textAlign: 'left',
                            fontSize: '0.9rem',
                            fontWeight: 800,
                            transition: 'all 0.1s ease'
                          }}
                        >
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '8px',
                              background: '#FFFFFF',
                              border: '1.5px solid #000000',
                              color: '#000000',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 900,
                              fontSize: '0.82rem',
                              flexShrink: 0
                            }}
                          >
                            {letter}
                          </div>
                          <span style={{ flex: 1 }}><FormattedText text={opt} inline /></span>
                        </button>
                      );
                    })}
                  </div>

                  {isQuizAnswerChecked && (
                    <div
                      style={{
                        marginTop: '16px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: selectedQuizOption === currentQuizExercise.correctIndex ? '#DCFCE7' : '#FEE2E2',
                        border: '2px solid #000000',
                        boxShadow: '3px 3px 0px #000000',
                        color: '#000000',
                        fontSize: '0.86rem',
                        lineHeight: 1.55,
                        fontWeight: 600
                      }}
                    >
                      <strong>Explicación: </strong>
                      <FormattedText text={currentQuizExercise.explanation} inline />
                    </div>
                  )}

                  <div style={{ marginTop: '20px' }}>
                    {!isQuizAnswerChecked ? (
                      <button
                        disabled={selectedQuizOption === null}
                        onClick={handleCheckQuizAnswer}
                        style={{
                          width: '100%',
                          padding: '13px',
                          borderRadius: '12px',
                          fontSize: '0.94rem',
                          fontWeight: 900,
                          background: selectedQuizOption !== null ? '#4ADE80' : '#E2E8F0',
                          color: '#000000',
                          border: '2.5px solid #000000',
                          boxShadow: selectedQuizOption !== null ? '4px 4px 0px #000000' : 'none',
                          cursor: selectedQuizOption !== null ? 'pointer' : 'default',
                          transition: 'all 0.1s ease'
                        }}
                      >
                        COMPROBAR RESPUESTA
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuizQuestion}
                        style={{
                          width: '100%',
                          padding: '13px',
                          borderRadius: '12px',
                          fontSize: '0.94rem',
                          fontWeight: 900,
                          background: '#FFE600',
                          color: '#000000',
                          border: '2.5px solid #000000',
                          boxShadow: '4px 4px 0px #000000',
                          cursor: 'pointer',
                          transition: 'all 0.1s ease'
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
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <Trophy size={48} color="#000000" strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#000000', margin: '0 0 6px 0' }}>
                ¡Materia Dominada con Éxito!
              </h3>
              <p style={{ color: '#334155', fontSize: '0.92rem', fontWeight: 600, margin: '0 0 18px 0', lineHeight: 1.5 }}>
                Has validado tu comprensión conceptual de <strong>{theory.title}</strong> en solo 3 preguntas ágiles.
                ¡Ganaste <strong style={{ color: '#16A34A' }}>+25 XP</strong> y puntos de Liga!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '380px', margin: '0 auto' }}>
                <button
                  onClick={() => onStartPractice(theory.lessonId)}
                  style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    fontWeight: 900,
                    background: '#4ADE80',
                    color: '#000000',
                    border: '2.5px solid #000000',
                    boxShadow: '4px 4px 0px #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <Play size={16} fill="#000000" color="#000000" />
                  <span>IR A LA PRÁCTICA COMPLETA</span>
                </button>

                <button
                  onClick={onBack}
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '12px',
                    fontSize: '0.88rem',
                    fontWeight: 900,
                    background: '#FFE600',
                    color: '#000000',
                    border: '2.5px solid #000000',
                    boxShadow: '4px 4px 0px #000000',
                    cursor: 'pointer'
                  }}
                >
                  Volver al Catálogo de Cursos
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════════════════════
            VISTA 2: MATERIA EN FORMATO NEO-BRUTALISM PURO (A COMO SE ADJUNTÓ EN FOTO)
           ══════════════════════════════════════════════════════════════════════════ */
        <article
          style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px #000000',
            borderRadius: '20px',
            padding: '26px 24px',
            boxSizing: 'border-box'
          }}
        >
          {/* ═══ ENCABEZADO DE LA LECCIÓN (ESTILO NEO-BRUTALISM) ═══ */}
          <div style={{ paddingBottom: '18px', borderBottom: '2.5px solid #000000', marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ flex: 1 }}>
                {/* Pestaña / Badge de Categoría Neo-Brutalism */}
                <div style={{ marginBottom: '10px' }}>
                  <span
                    style={{
                      background: isKotlin ? '#38BDF8' : '#A78BFA',
                      color: '#000000',
                      border: '2px solid #000000',
                      boxShadow: '2.5px 2.5px 0px #000000',
                      fontSize: '0.76rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {isKotlin ? <KotlinLogo size={14} /> : <SqlDatabaseLogo size={14} />}
                    <span>{isKotlin ? 'Kotlin' : 'SQL Relacional'} • Unidad {theory.unitId} • Nivel {theory.levelId}</span>
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 900,
                    margin: '0 0 8px 0',
                    lineHeight: 1.25,
                    color: '#000000',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {theory.title}
                </h1>

                <p
                  style={{
                    color: '#334155',
                    fontSize: '0.94rem',
                    lineHeight: 1.55,
                    margin: 0,
                    fontWeight: 600
                  }}
                >
                  <FormattedText text={theory.subtitle} inline />
                </p>
              </div>

              {/* Avatar Dev en marco Neo-Brutalist */}
              <div
                style={{
                  border: '2.5px solid #000000',
                  boxShadow: '3.5px 3.5px 0px #000000',
                  borderRadius: '16px',
                  background: '#FFFDF0',
                  padding: '4px',
                  flexShrink: 0
                }}
              >
                <ConsoleDevAvatar size={54} mood="happy" />
              </div>
            </div>
          </div>

          {/* ═══ ANALOGÍA: TARJETA CARPETA ESTILO NEO-BRUTALISM (COMO EN LA CAPTURA) ═══ */}
          {theory.analogy && (
            <div style={{ margin: '0 0 24px 0' }}>
              {/* Pestaña de carpeta saliente */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFD233',
                  border: '2px solid #000000',
                  borderBottom: 'none',
                  borderRadius: '8px 8px 0 0',
                  padding: '4px 12px',
                  fontWeight: 900,
                  fontSize: '0.74rem',
                  color: '#000000',
                  textTransform: 'uppercase'
                }}
              >
                <Lightbulb size={13} color="#000000" strokeWidth={2.8} />
                <span>Analogía Intuitiva</span>
              </div>

              {/* Cuerpo de la tarjeta con sombra dura */}
              <div
                style={{
                  background: '#FFFDF0',
                  border: '2px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  borderRadius: '0 14px 14px 14px',
                  padding: '14px 18px',
                  color: '#000000',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  fontWeight: 600
                }}
              >
                <FormattedText text={theory.analogy} />
              </div>
            </div>
          )}

          {/* ═══ VIDEO (SI APLICA) EN MARCO NEO-BRUTALIST ═══ */}
          {theory.video && (() => {
            const ytMatch = theory.video.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
            const videoId = ytMatch ? ytMatch[1] : null;

            return videoId ? (
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#FF5B89',
                    border: '2px solid #000000',
                    borderBottom: 'none',
                    borderRadius: '8px 8px 0 0',
                    padding: '4px 12px',
                    color: '#000000',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    textTransform: 'uppercase'
                  }}
                >
                  <Play size={11} fill="#000000" color="#000000" />
                  <span>Video: {theory.video.title}</span>
                </div>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%',
                    borderRadius: '0 14px 14px 14px',
                    overflow: 'hidden',
                    background: '#0F172A',
                    border: '2.5px solid #000000',
                    boxShadow: '4px 4px 0px #000000'
                  }}
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                    title={theory.video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
              </div>
            ) : null;
          })()}

          {/* ═══ SECCIONES DE CONTENIDO NEO-BRUTALISM ═══ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            {theory.sections.map((section, idx) => {
              // Colores de carpetas estilo captura: verde lima, fucsia, morado, azul, amarillo
              const SECTION_TAB_COLORS = ['#8DE342', '#FF6584', '#A78BFA', '#38BDF8', '#FFD233'];
              const tabColor = SECTION_TAB_COLORS[idx % SECTION_TAB_COLORS.length];

              return (
                <div key={idx}>
                  {/* Pestaña de Módulo Neo-Brutalism */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: tabColor,
                      border: '2px solid #000000',
                      boxShadow: '2px 2px 0px #000000',
                      borderRadius: '8px',
                      padding: '3px 10px',
                      fontWeight: 900,
                      color: '#000000',
                      fontSize: '0.78rem',
                      marginBottom: '8px'
                    }}
                  >
                    <span>Módulo {idx + 1}</span>
                  </div>

                  {/* Título de la sección */}
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      color: '#000000',
                      margin: '0 0 10px 0',
                      lineHeight: 1.3
                    }}
                  >
                    <FormattedText text={section.title} inline />
                  </h2>

                  {/* Texto de explicación con lenguaje accesible y formato enriquecido */}
                  <div
                    style={{
                      color: '#0F172A',
                      fontSize: '0.92rem',
                      lineHeight: 1.7,
                      marginBottom: '16px',
                      fontWeight: 500
                    }}
                  >
                    <FormattedText text={section.explanation} />
                  </div>

                  {/* ═══ CONSOLA / SIMULADOR NEO-BRUTALIST (EJECUCIÓN REAL EN VIVO) ═══ */}
                  {section.codeSnippet && (() => {
                    const activeCode = customCode[idx] ?? section.codeSnippet ?? '';
                    const isEditing = Boolean(isEditingSection[idx]);
                    const hasExecuted = Boolean(executedSections[idx]);
                    const isSimulating = runningSection === idx;
                    const isTableMode = viewModeTable[idx] !== false;
                    const sqlRes = sqlResults[idx];
                    const ktRes = kotlinResults[idx];
                    const isCustomized = customCode[idx] !== undefined && customCode[idx] !== section.codeSnippet;
                    const currentErrDetail: CodeErrorDetail | undefined =
                      theory.pathId === 'sql' ? sqlRes?.errorDetail : ktRes?.errorDetail;
                    const hasError = hasExecuted && !isSimulating && (theory.pathId === 'sql' ? !sqlRes?.success : !ktRes?.success);

                    return (
                      <div
                        style={{
                          margin: '14px 0 20px 0',
                          background: '#0F172A',
                          border: hasError ? '2.5px solid #EF4444' : '2.5px solid #000000',
                          boxShadow: hasError ? '4.5px 4.5px 0px #DC2626' : '4.5px 4.5px 0px #000000',
                          borderRadius: '14px',
                          overflow: 'hidden',
                          transition: 'border 0.2s ease, box-shadow 0.2s ease'
                        }}
                      >
                        {/* ÚNICA BARRA DE VENTANA ESTILO MAC NEO-BRUTALIST */}
                        <div
                          style={{
                            background: hasError ? '#FEE2E2' : '#FFE600',
                            padding: '8px 14px',
                            borderBottom: '2.5px solid #000000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '8px',
                            transition: 'background-color 0.2s ease'
                          }}
                        >
                          {/* 3 puntos estilo Mac con borde negro + etiqueta de archivo + indicador de error */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#EF4444', border: '1px solid #000000' }} />
                              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F59E0B', border: '1px solid #000000' }} />
                              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981', border: '1px solid #000000' }} />
                            </div>
                            <span
                              style={{
                                background: '#FFFFFF',
                                border: '1.5px solid #000000',
                                boxShadow: '1.5px 1.5px 0px #000000',
                                borderRadius: '6px',
                                padding: '2px 8px',
                                fontSize: '0.74rem',
                                fontFamily: 'JetBrains Mono, monospace',
                                fontWeight: 900,
                                color: '#000000'
                              }}
                            >
                              {theory.pathId === 'sql' ? 'consulta.sql' : 'main.kt'}
                            </span>
                            {isCustomized && (
                              <span
                                style={{
                                  background: '#FEF08A',
                                  border: '1px solid #000000',
                                  borderRadius: '4px',
                                  padding: '1px 6px',
                                  fontSize: '0.68rem',
                                  fontWeight: 800,
                                  color: '#854D0E'
                                }}
                              >
                                Modificado
                              </span>
                            )}
                            {hasError && currentErrDetail && (
                              <span
                                style={{
                                  background: '#EF4444',
                                  border: '1.5px solid #000000',
                                  boxShadow: '1.5px 1.5px 0px #000000',
                                  borderRadius: '6px',
                                  padding: '1px 7px',
                                  fontSize: '0.68rem',
                                  fontWeight: 900,
                                  color: '#FFFFFF',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <AlertTriangle size={11} color="#FFFFFF" strokeWidth={3} />
                                Error en L.{currentErrDetail.line}
                              </span>
                            )}
                          </div>

                          {/* Botones de Acción: Editar, Resetear y Ejecutar */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {isCustomized && (
                              <button
                                onClick={() => handleResetCode(idx, section.codeSnippet || '')}
                                title="Restaurar código original de la lección"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  background: '#FFFFFF',
                                  color: '#000000',
                                  border: '1.5px solid #000000',
                                  borderRadius: '6px',
                                  padding: '3px 8px',
                                  fontSize: '0.7rem',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                <RotateCcw size={11} strokeWidth={2.5} />
                                <span>Restaurar</span>
                              </button>
                            )}

                            <button
                              onClick={() => {
                                soundService.playToken();
                                setIsEditingSection((prev) => ({ ...prev, [idx]: !prev[idx] }));
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: isEditing ? '#BAE6FD' : '#FFFFFF',
                                color: '#000000',
                                border: '1.5px solid #000000',
                                boxShadow: isEditing ? '1.5px 1.5px 0px #000000' : 'none',
                                borderRadius: '6px',
                                padding: '3px 8px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                cursor: 'pointer'
                              }}
                            >
                              <Edit3 size={11} strokeWidth={2.5} />
                              <span>{isEditing ? 'Ver Resaltado' : 'Modificar'}</span>
                            </button>

                            <button
                              onClick={() => handleRunCode(idx, section.codeSnippet || '')}
                              disabled={isSimulating}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                background: isSimulating ? '#FCD34D' : '#4ADE80',
                                color: '#000000',
                                border: '2px solid #000000',
                                boxShadow: '2px 2px 0px #000000',
                                borderRadius: '8px',
                                padding: '4px 12px',
                                fontSize: '0.76rem',
                                fontWeight: 900,
                                cursor: isSimulating ? 'wait' : 'pointer',
                                transition: 'all 0.1s ease'
                              }}
                            >
                              <Play size={11} fill="#000000" color="#000000" strokeWidth={0} />
                              <span>{isSimulating ? 'Ejecutando...' : hasExecuted ? 'Re-Ejecutar' : 'Ejecutar'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Editor Interactivo o Visualizador Resaltado */}
                        {isEditing ? (
                          <div style={{ background: '#020617', padding: '12px 14px' }}>
                            {/* Alerta de error clara y contextual al editar código */}
                            {hasError && currentErrDetail && (
                              <div
                                style={{
                                  marginBottom: '10px',
                                  padding: '10px 14px',
                                  background: '#450A0A',
                                  border: '2px solid #EF4444',
                                  boxShadow: '3px 3px 0px #000000',
                                  borderRadius: '8px',
                                  color: '#FEE2E2',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '6px'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                      <AlertTriangle size={13} color="#FFFFFF" strokeWidth={2.8} />
                                    </div>
                                    <span style={{ fontWeight: 900, color: '#FCA5A5', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>
                                      ERROR EN LÍNEA {currentErrDetail.line}, COLUMNA {currentErrDetail.column}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => {
                                      soundService.playToken();
                                      setIsEditingSection((prev) => ({ ...prev, [idx]: false }));
                                    }}
                                    style={{
                                      background: '#EF4444',
                                      color: '#FFFFFF',
                                      border: '1.5px solid #000000',
                                      borderRadius: '6px',
                                      padding: '2px 8px',
                                      fontSize: '0.68rem',
                                      fontWeight: 900,
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Ver línea marcada
                                  </button>
                                </div>

                                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.4 }}>
                                  {currentErrDetail.message}
                                </div>

                                {currentErrDetail.lineContent && (
                                  <div
                                    style={{
                                      background: '#1F0505',
                                      border: '1px solid #7F1D1D',
                                      borderRadius: '5px',
                                      padding: '4px 8px',
                                      fontFamily: 'JetBrains Mono, monospace',
                                      fontSize: '0.76rem',
                                      color: '#F87171'
                                    }}
                                  >
                                    <span style={{ color: '#9CA3AF' }}>L.{currentErrDetail.line} | </span>
                                    <span>{currentErrDetail.lineContent}</span>
                                  </div>
                                )}

                                {currentErrDetail.suggestion && (
                                  <div
                                    style={{
                                      background: 'rgba(239, 68, 68, 0.2)',
                                      padding: '6px 10px',
                                      borderRadius: '6px',
                                      borderLeft: '3px solid #FDE047',
                                      color: '#FEF08A',
                                      fontSize: '0.74rem',
                                      fontWeight: 700
                                    }}
                                  >
                                    <span style={{ color: '#FDE047', fontWeight: 900 }}>Sugerencia: </span>
                                    {currentErrDetail.suggestion}
                                  </div>
                                )}
                              </div>
                            )}

                            <div style={{ color: '#94A3B8', fontSize: '0.68rem', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span>Editor editable en vivo: cambia valores y pulsa "Ejecutar"</span>
                              <span>{activeCode.split('\n').length} líneas</span>
                            </div>
                            <textarea
                              value={activeCode}
                              onChange={(e) => {
                                const val = e.target.value;
                                setCustomCode((prev) => ({ ...prev, [idx]: val }));
                              }}
                              spellCheck={false}
                              rows={Math.max(4, Math.min(14, activeCode.split('\n').length + 1))}
                              style={{
                                width: '100%',
                                background: '#0B132B',
                                color: '#38BDF8',
                                border: hasError ? '2px solid #EF4444' : '1.5px solid #334155',
                                borderRadius: '8px',
                                padding: '10px 12px',
                                fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
                                fontSize: '0.84rem',
                                lineHeight: 1.5,
                                outline: 'none',
                                resize: 'vertical',
                                boxSizing: 'border-box'
                              }}
                            />
                          </div>
                        ) : (
                          <div>
                            {hasError && currentErrDetail && (
                              <div
                                style={{
                                  background: '#450A0A',
                                  borderBottom: '2px solid #EF4444',
                                  padding: '7px 14px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  color: '#FEE2E2',
                                  fontSize: '0.76rem',
                                  fontWeight: 800
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                  <AlertTriangle size={13} color="#EF4444" strokeWidth={2.8} />
                                  <span>Línea {currentErrDetail.line} marcada en rojo con error.</span>
                                </div>
                                <button
                                  onClick={() => {
                                    soundService.playToken();
                                    setIsEditingSection((prev) => ({ ...prev, [idx]: true }));
                                  }}
                                  style={{
                                    background: '#FFE600',
                                    color: '#000000',
                                    border: '1.5px solid #000000',
                                    borderRadius: '6px',
                                    padding: '2px 8px',
                                    fontSize: '0.68rem',
                                    fontWeight: 900,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Corregir en editor
                                </button>
                              </div>
                            )}
                            <VSCodeSnippet
                              code={activeCode}
                              language={(section.codeLanguage || theory.pathId) as 'kotlin' | 'sql'}
                              filename={theory.pathId === 'sql' ? 'consulta.sql' : 'main.kt'}
                              errorLine={hasError && currentErrDetail?.line ? currentErrDetail.line - 1 : undefined}
                              hideHeader={true}
                              style={{ border: 'none', boxShadow: 'none', margin: 0, borderRadius: 0 }}
                            />
                          </div>
                        )}

                        {/* ═══ ESTADO DE CARGA / COMPILACIÓN ═══ */}
                        {isSimulating && (
                          <div
                            style={{
                              background: '#0B132B',
                              borderTop: '2.5px solid #000000',
                              padding: '12px 16px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#FDE047'
                            }}
                          >
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FDE047', border: '1.5px solid #000000' }} />
                            <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 800 }}>
                              {theory.pathId === 'sql' ? 'Ejecutando consulta en motor relacional...' : 'Compilando y ejecutando bytecode Kotlin...'}
                            </span>
                          </div>
                        )}

                        {/* ═══ ESTADO INICIAL ANTES DE EJECUTAR ═══ */}
                        {!hasExecuted && !isSimulating && (
                          <div
                            style={{
                              background: '#090D1A',
                              borderTop: '2.5px solid #000000',
                              padding: '12px 16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '10px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8' }}>
                              <Terminal size={14} color="#64748B" />
                              <span style={{ fontSize: '0.76rem', fontWeight: 700 }}>
                                Pulsa el botón verde <strong style={{ color: '#4ADE80' }}>Ejecutar</strong> para compilar el código y ver el resultado real en pantalla.
                              </span>
                            </div>
                            <button
                              onClick={() => handleRunCode(idx, section.codeSnippet || '')}
                              style={{
                                background: '#4ADE80',
                                border: '1.5px solid #000000',
                                borderRadius: '6px',
                                padding: '3px 10px',
                                fontSize: '0.72rem',
                                fontWeight: 900,
                                color: '#000000',
                                cursor: 'pointer',
                                flexShrink: 0
                              }}
                            >
                              Ejecutar
                            </button>
                          </div>
                        )}

                        {/* ═══ RESULTADO REAL DE SQL ═══ */}
                        {hasExecuted && !isSimulating && theory.pathId === 'sql' && (
                          <div style={{ background: '#FFFFFF', borderTop: '2.5px solid #000000' }}>
                            {/* Cabecera del resultado SQL */}
                            <div
                              style={{
                                background: sqlRes?.success ? '#F8FAFC' : '#FEF2F2',
                                padding: '7px 14px',
                                borderBottom: '2px solid #000000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '8px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#000000', fontSize: '0.76rem', fontWeight: 900 }}>
                                <Database size={13} color="#000000" strokeWidth={2.5} />
                                <span>{sqlRes?.success ? 'Resultado en Base de Datos' : 'Fallo en la consulta SQL'}</span>
                                {sqlRes && (
                                  <span
                                    style={{
                                      fontSize: '0.68rem',
                                      background: sqlRes.success ? '#DCFCE7' : '#FEE2E2',
                                      color: sqlRes.success ? '#15803D' : '#DC2626',
                                      border: '1px solid #000000',
                                      borderRadius: '4px',
                                      padding: '1px 6px',
                                      fontWeight: 800
                                    }}
                                  >
                                    {sqlRes.success
                                      ? `${sqlRes.executionTimeMs} ms • ${sqlRes.rowCount} ${sqlRes.rowCount === 1 ? 'fila' : 'filas'}`
                                      : `Error L.${sqlRes.errorDetail?.line || 1} • ${sqlRes.executionTimeMs} ms`}
                                  </span>
                                )}
                              </div>

                              {sqlRes?.success && (
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  <button
                                    onClick={() => setViewModeTable((prev) => ({ ...prev, [idx]: true }))}
                                    style={{
                                      background: isTableMode ? '#FFE600' : '#FFFFFF',
                                      color: '#000000',
                                      border: '1.5px solid #000000',
                                      boxShadow: isTableMode ? '1.5px 1.5px 0px #000000' : 'none',
                                      borderRadius: '6px',
                                      padding: '2px 8px',
                                      fontSize: '0.7rem',
                                      fontWeight: 900,
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Tabla
                                  </button>
                                  <button
                                    onClick={() => setViewModeTable((prev) => ({ ...prev, [idx]: false }))}
                                    style={{
                                      background: !isTableMode ? '#FFE600' : '#FFFFFF',
                                      color: '#000000',
                                      border: '1.5px solid #000000',
                                      boxShadow: !isTableMode ? '1.5px 1.5px 0px #000000' : 'none',
                                      borderRadius: '6px',
                                      padding: '2px 8px',
                                      fontSize: '0.7rem',
                                      fontWeight: 900,
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Consola Raw
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Contenido SQL: Tabla o Consola o Error */}
                            {!sqlRes?.success ? (
                              <div style={{ background: '#090D1A', color: '#FCA5A5', padding: '12px 14px', fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace', fontSize: '0.8rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#EF4444', fontWeight: 900 }}>
                                  <AlertTriangle size={15} color="#EF4444" strokeWidth={2.6} />
                                  <span>Diagnóstico de consola SQL (MySQL / PostgreSQL):</span>
                                </div>
                                <pre
                                  style={{
                                    margin: 0,
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: 1.5,
                                    background: '#020617',
                                    padding: '10px 12px',
                                    borderRadius: '6px',
                                    border: '1.5px solid #7F1D1D',
                                    color: '#F87171',
                                    fontSize: '0.82rem'
                                  }}
                                >
                                  {sqlRes?.errorDetail?.formattedOutput || sqlRes?.rawOutput || sqlRes?.error || 'Error al ejecutar SQL'}
                                </pre>
                                {sqlRes?.errorDetail?.suggestion && (
                                  <div
                                    style={{
                                      marginTop: '10px',
                                      background: 'rgba(245, 158, 11, 0.15)',
                                      border: '1.5px solid #F59E0B',
                                      borderRadius: '6px',
                                      padding: '8px 12px',
                                      color: '#FEF08A',
                                      fontSize: '0.76rem',
                                      fontWeight: 700
                                    }}
                                  >
                                    <span style={{ color: '#FDE047', fontWeight: 900 }}>Sugerencia del motor: </span>
                                    {sqlRes.errorDetail.suggestion}
                                  </div>
                                )}
                              </div>
                            ) : isTableMode ? (
                              <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                                  <thead>
                                    <tr style={{ background: '#FEF08A', color: '#000000' }}>
                                      {sqlRes.headers.map((h, hIdx) => (
                                        <th
                                          key={hIdx}
                                          style={{
                                            padding: '8px 14px',
                                            fontWeight: 900,
                                            fontSize: '0.74rem',
                                            letterSpacing: '0.5px',
                                            borderBottom: '2px solid #000000',
                                            borderRight: hIdx < sqlRes.headers.length - 1 ? '1.5px solid #000000' : 'none'
                                          }}
                                        >
                                          {h}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sqlRes.rows.map((row, rIdx) => (
                                      <tr
                                        key={rIdx}
                                        style={{
                                          background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                                          borderBottom: '1px solid #CBD5E1'
                                        }}
                                      >
                                        {row.map((cell, cIdx) => (
                                          <td
                                            key={cIdx}
                                            style={{
                                              padding: '8px 14px',
                                              color: '#000000',
                                              fontWeight: 600,
                                              borderRight: cIdx < row.length - 1 ? '1px solid #E2E8F0' : 'none'
                                            }}
                                          >
                                            {sqlRes.headers[cIdx]?.toLowerCase() === 'id' ? (
                                              <span style={{ background: '#A7F3D0', border: '1.5px solid #000000', color: '#000000', padding: '1px 6px', borderRadius: '4px', fontWeight: 900, fontSize: '0.72rem' }}>
                                                #{cell}
                                              </span>
                                            ) : cell?.toLowerCase() === 'true' || cell?.toLowerCase() === 'false' ? (
                                              <span style={{ background: cell.toLowerCase() === 'true' ? '#8DE342' : '#F1F5F9', border: '1.5px solid #000000', color: '#000000', padding: '1px 6px', borderRadius: '4px', fontWeight: 900, fontSize: '0.72rem' }}>
                                                {cell}
                                              </span>
                                            ) : (
                                              cell
                                            )}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                                <div style={{ padding: '6px 14px', background: '#F1F5F9', borderTop: '2px solid #000000', color: '#000000', fontSize: '0.74rem', fontWeight: 800 }}>
                                  {sqlRes.rowCount} {sqlRes.rowCount === 1 ? 'fila devuelta' : 'filas devueltas'}
                                </div>
                              </div>
                            ) : (
                              <div style={{ background: '#020617', padding: '12px 14px', fontFamily: 'monospace' }}>
                                <pre style={{ margin: 0, color: '#38BDF8', fontSize: '0.8rem', whiteSpace: 'pre-wrap', lineHeight: 1.45 }}>
                                  {sqlRes.rawOutput}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}

                        {/* ═══ RESULTADO REAL DE KOTLIN ═══ */}
                        {hasExecuted && !isSimulating && theory.pathId === 'kotlin' && (
                          <div
                            style={{
                              background: '#020617',
                              borderTop: '2.5px solid #000000',
                              padding: '10px 14px',
                              fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.72rem', fontWeight: 800 }}>
                                <Terminal size={12} color="#38BDF8" />
                                <span>{ktRes?.success ? 'Salida Terminal (stdout)' : 'Diagnóstico del Compilador (kotlinc)'}</span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {ktRes && (
                                  <span
                                    style={{
                                      fontSize: '0.68rem',
                                      background: ktRes.success ? '#064E3B' : '#7F1D1D',
                                      color: ktRes.success ? '#6EE7B7' : '#FCA5A5',
                                      border: `1px solid ${ktRes.success ? '#059669' : '#EF4444'}`,
                                      borderRadius: '4px',
                                      padding: '1px 6px',
                                      fontWeight: 800
                                    }}
                                  >
                                    {ktRes.success ? '✓ 0 errores' : `Error en L.${ktRes.errorDetail?.line || 1}`} • {ktRes.executionTimeMs} ms
                                  </span>
                                )}
                                <span style={{ fontSize: '0.7rem', color: ktRes?.success ? '#4ADE80' : '#EF4444', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  {ktRes?.success ? <CheckCircle2 size={11} color="#4ADE80" /> : <AlertTriangle size={11} color="#EF4444" />}
                                  <span>{ktRes?.success ? 'Ejecutado' : 'Fallo de compilación'}</span>
                                </span>
                              </div>
                            </div>

                            <pre
                              style={{
                                margin: 0,
                                color: ktRes?.success ? '#38BDF8' : '#F87171',
                                fontSize: '0.82rem',
                                whiteSpace: 'pre-wrap',
                                lineHeight: 1.45,
                                fontWeight: 600,
                                background: '#090D1A',
                                padding: '10px 12px',
                                borderRadius: '6px',
                                border: ktRes?.success ? '1px solid #1E293B' : '1.5px solid #7F1D1D'
                              }}
                            >
                              {ktRes?.success
                                ? (ktRes?.stdout || '(Sin salida a consola)')
                                : (ktRes?.errorDetail?.formattedOutput || ktRes?.error || 'Error al ejecutar código')}
                            </pre>

                            {!ktRes?.success && ktRes?.errorDetail?.suggestion && (
                              <div
                                style={{
                                  marginTop: '8px',
                                  background: 'rgba(245, 158, 11, 0.15)',
                                  border: '1.5px solid #F59E0B',
                                  borderRadius: '6px',
                                  padding: '8px 12px',
                                  color: '#FEF08A',
                                  fontSize: '0.76rem',
                                  fontWeight: 700
                                }}
                              >
                                <span style={{ color: '#FDE047', fontWeight: 900 }}>Sugerencia del compilador: </span>
                                {ktRes.errorDetail.suggestion}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* ═══ TIPS Y ADVERTENCIAS (TARJETA NEO-BRUTALIST LIMPIA) ═══ */}
                  {(section.byteTip || section.pitfallTip) && (
                    <div
                      style={{
                        margin: '14px 0',
                        padding: '12px 16px',
                        background: '#FFFFFF',
                        border: '2px solid #000000',
                        boxShadow: '3.5px 3.5px 0px #000000',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      {section.byteTip && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#0F172A', lineHeight: 1.5 }}>
                          <span
                            style={{
                              background: '#38BDF8',
                              border: '1.5px solid #000000',
                              boxShadow: '1.5px 1.5px 0px #000000',
                              borderRadius: '6px',
                              padding: '1px 7px',
                              fontSize: '0.72rem',
                              fontWeight: 900,
                              color: '#000000',
                              flexShrink: 0
                            }}
                          >
                            TIP PRO
                          </span>
                          <span style={{ fontWeight: 600 }}><FormattedText text={section.byteTip} inline /></span>
                        </div>
                      )}
                      {section.pitfallTip && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#0F172A', lineHeight: 1.5 }}>
                          <span
                            style={{
                              background: '#FF5B89',
                              border: '1.5px solid #000000',
                              boxShadow: '1.5px 1.5px 0px #000000',
                              borderRadius: '6px',
                              padding: '1px 7px',
                              fontSize: '0.72rem',
                              fontWeight: 900,
                              color: '#000000',
                              flexShrink: 0
                            }}
                          >
                            CUIDADO
                          </span>
                          <span style={{ fontWeight: 600 }}><FormattedText text={section.pitfallTip} inline /></span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ═══ PUNTOS CLAVE (ESTILO NEO-BRUTALIST) ═══ */}
                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div style={{ margin: '14px 0 18px 0' }}>
                      <div
                        style={{
                          fontSize: '0.76rem',
                          fontWeight: 900,
                          color: '#000000',
                          textTransform: 'uppercase',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <CheckCircle2 size={14} color="#000000" strokeWidth={2.5} />
                        <span>Puntos clave para recordar</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {section.keyPoints.map((point, pIdx) => (
                          <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#0F172A', lineHeight: 1.5 }}>
                            <div
                              style={{
                                width: '16px',
                                height: '16px',
                                background: '#8DE342',
                                border: '1.5px solid #000000',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: '2px'
                              }}
                            >
                              <CheckCircle2 size={11} color="#000000" strokeWidth={3} />
                            </div>
                            <span style={{ fontWeight: 600 }}><FormattedText text={point} inline /></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Separador entre módulos */}
                  {idx < theory.sections.length - 1 && (
                    <hr style={{ border: 'none', borderTop: '2px solid #000000', margin: '26px 0' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ═══ PIE DEL ARTÍCULO: ACCIONES DIRECTAS NEO-BRUTALIST ═══ */}
          <div
            style={{
              marginTop: '32px',
              paddingTop: '22px',
              borderTop: '2.5px solid #000000',
              textAlign: 'center'
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#000000', margin: '0 0 6px 0' }}>
              ¿Listo para validar tu comprensión?
            </h3>
            <p style={{ color: '#475569', fontSize: '0.86rem', margin: '0 0 18px 0', fontWeight: 600 }}>
              Aprueba la teoría con un Quiz Exprés de 3 preguntas o pasa directo a los retos prácticos de código.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  soundService.playToken();
                  setIsQuizMode(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background: '#4ADE80',
                  color: '#000000',
                  border: '2.5px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontSize: '0.88rem',
                  fontWeight: 900,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease'
                }}
              >
                <Zap size={15} fill="#000000" color="#000000" />
                <span>QUIZ EXPRÉS (3 PREGUNTAS)</span>
              </button>

              <button
                onClick={() => {
                  soundService.playToken();
                  onStartPractice(theory.lessonId);
                }}
                style={{
                  background: '#FFE600',
                  color: '#000000',
                  border: '2.5px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontSize: '0.88rem',
                  fontWeight: 900,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease'
                }}
              >
                <Play size={15} fill="#000000" color="#000000" />
                <span>PRÁCTICA (10 RETOS)</span>
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
                fontSize: '0.8rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '16px'
              }}
            >
              <ArrowUp size={13} color="#000000" strokeWidth={2.5} />
              <span>Volver arriba</span>
            </button>
          </div>
        </article>
      )}
    </div>
  );
};
