import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle,
  XCircle,
  Check,
  X,
  FileText,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { EvaluationInstrument } from '../content/academicEvaluations';
import { AcademicEvaluation, EvaluationQuestion } from '../types/academic';
import { UserProfile } from '../types/user';
import { academicService } from '../services/academicService';
import { soundService } from '../services/soundService';
import { VSCodeSnippet } from './VSCodeSnippet';
import { ConsoleDevAvatar } from './ConsoleAvatar';

interface EvaluationPageProps {
  instrument: EvaluationInstrument;
  user: UserProfile;
  onClose: () => void;
  onComplete: (evaluation: AcademicEvaluation) => void;
  isMandatory?: boolean;
}

interface QuestionResultItem {
  question: EvaluationQuestion;
  isCorrect: boolean;
  userAnswerText: string;
  correctAnswerText: string;
}

interface ParsedPromptSegment {
  type: 'text' | 'code';
  content: string;
  language?: 'kotlin' | 'sql';
}

/**
 * Parsea el texto del prompt separando instrucciones y bloques de código estilo consola
 */
function parsePromptSegments(prompt: string, defaultPath: 'kotlin' | 'sql'): ParsedPromptSegment[] {
  const segments: ParsedPromptSegment[] = [];
  const codeBlockRegex = /```(?:(kotlin|sql|text))?\s*([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(prompt)) !== null) {
    if (match.index > lastIndex) {
      const textChunk = prompt.substring(lastIndex, match.index).trim();
      if (textChunk) {
        segments.push({ type: 'text', content: textChunk });
      }
    }

    const langTag = match[1]?.toLowerCase();
    const lang = (langTag === 'sql' || langTag === 'kotlin') ? langTag : defaultPath;
    const code = match[2].trim();
    if (code) {
      segments.push({ type: 'code', content: code, language: lang });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < prompt.length) {
    const trailingText = prompt.substring(lastIndex).trim();
    if (trailingText) {
      segments.push({ type: 'text', content: trailingText });
    }
  }

  if (segments.length > 0) return segments;

  // Si no tenía triples comillas invertidas, buscar líneas de código obvias
  const lines = prompt.split('\n');
  const isCodeLine = (l: string) => {
    const t = l.trim();
    return /^(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|GROUP BY|ORDER BY|CREATE TABLE)\b/i.test(t) ||
           /^(val|var|fun|class|if|when|for|while|return|println)\b/.test(t) ||
           /[{};]$/.test(t);
  };

  const hasCodeLines = lines.some(isCodeLine);
  if (hasCodeLines && lines.length > 1) {
    const textLines: string[] = [];
    const codeLines: string[] = [];
    let parsingCode = false;

    for (const line of lines) {
      if (isCodeLine(line)) {
        parsingCode = true;
        codeLines.push(line);
      } else if (parsingCode && (!line.trim() || isCodeLine(line))) {
        codeLines.push(line);
      } else {
        if (parsingCode) {
          // Si ya terminó el bloque de código
          break;
        }
        textLines.push(line);
      }
    }

    if (codeLines.length > 0) {
      const tBefore = textLines.join('\n').trim();
      const cBlock = codeLines.join('\n').trim();
      const remainingLines = lines.slice(textLines.length + codeLines.length).join('\n').trim();
      const result: ParsedPromptSegment[] = [];
      if (tBefore) result.push({ type: 'text', content: tBefore });
      result.push({ type: 'code', content: cBlock, language: defaultPath });
      if (remainingLines) result.push({ type: 'text', content: remainingLines });
      return result;
    }
  }

  return [{ type: 'text', content: prompt.trim() }];
}

/**
 * Renderiza texto con soporte para `código inline` estilo Duolingo
 */
const FormattedInlineText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('`') && p.endsWith('`')) {
          return (
            <code
              key={i}
              style={{
                backgroundColor: '#F1F5F9',
                border: '1.5px solid #CBD5E1',
                borderRadius: '6px',
                padding: '2px 7px',
                fontFamily: "'JetBrains Mono', Consolas, monospace",
                fontSize: '0.92em',
                fontWeight: 800,
                color: '#0284C7',
                margin: '0 2px'
              }}
            >
              {p.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
};

export const EvaluationPage: React.FC<EvaluationPageProps> = ({
  instrument,
  user,
  onClose,
  onComplete,
  isMandatory = false
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [resultsSummary, setResultsSummary] = useState<{
    correctCount: number;
    totalCount: number;
    percentage: number;
    questionResults: QuestionResultItem[];
    record: AcademicEvaluation;
  } | null>(null);
  const [startedAt] = useState<number>(Date.now());

  const currentQ: EvaluationQuestion = instrument.questions[currentQuestionIndex];
  const totalQuestions = instrument.questions.length;
  const currentAnswer = answers[currentQ.questionId] || '';
  const isQuestionAnswered = currentAnswer.trim() !== '';

  const handleSelectOption = (idx: number) => {
    soundService.playToken();
    setValidationError(null);
    setAnswers(prev => ({
      ...prev,
      [currentQ.questionId]: String(idx)
    }));
  };

  const handleTextChange = (val: string) => {
    setValidationError(null);
    setAnswers(prev => ({
      ...prev,
      [currentQ.questionId]: val
    }));
  };

  const answeredCount = Object.keys(answers).filter(k => answers[k]?.trim() !== '').length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleNextQuestion = () => {
    if (!currentAnswer.trim()) {
      soundService.playError();
      setValidationError('¡Selecciona una opción para continuar!');
      return;
    }
    setValidationError(null);
    soundService.playToken();
    setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitEvaluation = async () => {
    if (!currentAnswer.trim()) {
      soundService.playError();
      setValidationError('Debes responder esta pregunta antes de entregar la evaluación.');
      return;
    }

    if (answeredCount < totalQuestions) {
      soundService.playError();
      setValidationError(`Has respondido ${answeredCount} de ${totalQuestions} preguntas. Responde todas para finalizar.`);
      return;
    }

    soundService.playToken();
    setIsSubmitting(true);
    setValidationError(null);

    try {
      const scores: Record<string, number> = {};
      let autoTotalScore = 0;
      let correctAnswersCount = 0;
      const questionResults: QuestionResultItem[] = [];

      instrument.questions.forEach((q) => {
        const studentAns = answers[q.questionId];
        let isCorrect = false;
        let userAnswerText = '(Sin respuesta)';
        let correctAnswerText = '';

        if (q.type === 'multiple_choice') {
          const optIdx = studentAns !== undefined ? Number(studentAns) : -1;
          userAnswerText = (q.options && optIdx >= 0 && optIdx < q.options.length)
            ? q.options[optIdx]
            : studentAns || '';
          correctAnswerText = (q.options && q.correctOptionIndex !== undefined)
            ? q.options[q.correctOptionIndex]
            : '';

          if (q.correctOptionIndex !== undefined && optIdx === q.correctOptionIndex) {
            isCorrect = true;
            correctAnswersCount++;
            scores[q.questionId] = q.maxScore;
            autoTotalScore += q.maxScore;
          } else {
            scores[q.questionId] = 0;
          }
        } else {
          userAnswerText = studentAns || '';
          correctAnswerText = q.rubricCriteria || 'Criterio formativo docente';
          if (studentAns && studentAns.trim().length > 3) {
            isCorrect = true;
            correctAnswersCount++;
            scores[q.questionId] = q.maxScore;
            autoTotalScore += q.maxScore;
          } else {
            scores[q.questionId] = 0;
          }
        }

        questionResults.push({
          question: q,
          isCorrect,
          userAnswerText,
          correctAnswerText
        });
      });

      const submittedAt = Date.now();
      const evalId = `eval_${user.uid}_${instrument.instrumentId}_${submittedAt}`;
      const maxScore = instrument.maxTotalScore;
      const percentage = Math.round((correctAnswersCount / totalQuestions) * 100);

      const evaluationRecord: AcademicEvaluation = {
        evalId,
        studentId: user.uid,
        studentCode: user.studentCode || 'E01',
        pathId: instrument.pathId,
        type: instrument.type,
        instrumentId: instrument.instrumentId,
        instrumentVersion: instrument.version,
        isOfficial: true,
        startedAt,
        submittedAt,
        status: 'graded',
        questions: instrument.questions,
        answers,
        scores,
        totalScore: autoTotalScore,
        maxScore,
        percentage,
        isExternal: false
      };

      await academicService.saveEvaluation(evaluationRecord);

      for (let i = 0; i < instrument.questions.length; i++) {
        const q = instrument.questions[i];
        const res = questionResults[i];

        await academicService.recordAttempt({
          attemptId: `att_${evalId}_q${i + 1}`,
          studentId: user.uid,
          studentCode: user.studentCode || 'E01',
          sessionId: `eval_session_${evalId}`,
          pathId: instrument.pathId,
          unitId: 0,
          lessonId: instrument.instrumentId,
          activityId: q.questionId,
          contentVersion: instrument.version,
          theme: q.topic,
          difficulty: 'medium',
          attemptNumber: 1,
          userAnswer: res.userAnswerText,
          status: res.isCorrect ? 'correct' : 'incorrect',
          score: scores[q.questionId] || 0,
          maxScore: q.maxScore,
          hintUsed: false,
          timestamp: submittedAt,
          isTestOrEvaluation: true
        });
      }

      soundService.playWin();
      setResultsSummary({
        correctCount: correctAnswersCount,
        totalCount: totalQuestions,
        percentage,
        questionResults,
        record: evaluationRecord
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      soundService.playError();
      console.error('Error al entregar evaluación:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishAndProceed = () => {
    soundService.playToken();
    if (resultsSummary) {
      onComplete(resultsSummary.record);
    }
    onClose();
  };

  const promptSegments = parsePromptSegments(currentQ.prompt, instrument.pathId);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: '#0F172A',
        fontFamily: "'Nunito', sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* ─── BARRA SUPERIOR DUOLINGO CON BARRA DE PROGRESO ─── */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '2.5px solid #E5E5E5',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '14px 20px'
        }}
      >
        <div
          style={{
            maxWidth: 780,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 18
          }}
        >
          {/* Botón Salir (solo si no es obligatorio) */}
          {!isMandatory && !isSubmitted ? (
            <button
              type="button"
              onClick={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '2px solid #E5E5E5',
                background: '#FFFFFF',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: '0 2px 0 #E5E5E5'
              }}
              title="Salir"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: instrument.pathId === 'kotlin' ? '#7C3AED' : '#0284C7',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: `0 3px 0 ${instrument.pathId === 'kotlin' ? '#5B21B6' : '#0369A1'}`
              }}
            >
              <FileText size={18} strokeWidth={2.4} />
            </div>
          )}

          {/* Barra de Progreso Duolingo con Efecto Brillante */}
          {!isSubmitted && (
            <div style={{ flex: 1, position: 'relative' }}>
              <div
                style={{
                  height: 16,
                  backgroundColor: '#E5E5E5',
                  borderRadius: 999,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    backgroundColor: '#58CC02',
                    borderRadius: 999,
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: 'inset 0 2px 0 rgba(255, 255, 255, 0.35)'
                  }}
                />
              </div>
            </div>
          )}

          {/* Contador de Preguntas */}
          <div
            style={{
              fontSize: '0.86rem',
              fontWeight: 900,
              color: '#475569',
              whiteSpace: 'nowrap'
            }}
          >
            {currentQuestionIndex + 1} / {totalQuestions}
          </div>
        </div>
      </header>

      {/* ─── CUERPO PRINCIPAL DEL EJERCICIO ESTILO DUOLINGO ─── */}
      <main
        style={{
          flex: 1,
          maxWidth: 780,
          width: '100%',
          margin: '0 auto',
          padding: '24px 20px 100px 20px',
          boxSizing: 'border-box'
        }}
      >
        {/* ══════════════════════════════════════════════════════════════════
            VISTA 1: PANTALLA FINAL DE CALIFICACIÓN ("CUÁNTAS PEGÓ")
           ══════════════════════════════════════════════════════════════════ */}
        {isSubmitted && resultsSummary ? (
          <div>
            {/* Banner de Resultado Final Duolingo */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: `3px solid ${resultsSummary.percentage >= 70 ? '#58CC02' : '#FFC800'}`,
                boxShadow: `0 6px 0 ${resultsSummary.percentage >= 70 ? '#46A302' : '#E5A500'}`,
                borderRadius: 24,
                padding: '36px 24px',
                textAlign: 'center',
                marginBottom: 32
              }}
            >
              {/* Mascota Celebrando */}
              <div style={{ marginBottom: 12 }}>
                <ConsoleDevAvatar
                  mood={resultsSummary.percentage >= 70 ? 'cheer' : 'support'}
                  size={72}
                />
              </div>

              <div
                style={{
                  display: 'inline-block',
                  background: resultsSummary.percentage >= 70 ? '#DCFCE7' : '#FEF3C7',
                  color: resultsSummary.percentage >= 70 ? '#15803D' : '#B45309',
                  padding: '4px 16px',
                  borderRadius: 20,
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  marginBottom: 10
                }}
              >
                ¡Evaluación Completada!
              </div>

              <h2
                style={{
                  fontSize: '2.3rem',
                  fontWeight: 900,
                  color: '#0F172A',
                  margin: '8px 0',
                  letterSpacing: '-0.5px'
                }}
              >
                Pegaste {resultsSummary.correctCount} de {resultsSummary.totalCount} preguntas
              </h2>

              <div
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: resultsSummary.percentage >= 70 ? '#15803D' : '#D97706',
                  marginBottom: 12
                }}
              >
                Calificación: {resultsSummary.percentage}% de aciertos
              </div>

              <p
                style={{
                  color: '#475569',
                  fontSize: '1rem',
                  fontWeight: 600,
                  maxWidth: 520,
                  margin: '0 auto',
                  lineHeight: 1.5
                }}
              >
                {resultsSummary.percentage >= 80
                  ? '¡Excelente nivel! Tienes una base destacada para superar los niveles con gran rapidez.'
                  : resultsSummary.percentage >= 50
                  ? '¡Buen intento! Cada nivel de la ruta te enseñará a dominar los temas que necesitas reforzar.'
                  : '¡Diagnóstico registrado con éxito! Tu ruta empezará desde el Nivel 1 guiándote paso a paso.'}
              </p>
            </div>

            {/* Revisión Pregunta por Pregunta */}
            <div style={{ marginBottom: 36 }}>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  color: '#0F172A',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <BookOpen size={20} color="#0284C7" />
                <span>Revisión de respuestas</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {resultsSummary.questionResults.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: `2px solid ${item.isCorrect ? '#86EFAC' : '#FCA5A5'}`,
                      borderRadius: 18,
                      padding: '18px 20px',
                      boxShadow: `0 3px 0 ${item.isCorrect ? '#86EFAC' : '#FCA5A5'}`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {item.isCorrect ? (
                          <CheckCircle size={20} color="#16A34A" />
                        ) : (
                          <XCircle size={20} color="#DC2626" />
                        )}
                        <span style={{ fontSize: '0.88rem', fontWeight: 900, color: item.isCorrect ? '#15803D' : '#B91C1C' }}>
                          Pregunta {idx + 1}: {item.question.topic}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 900,
                          padding: '2px 8px',
                          borderRadius: 6,
                          background: item.isCorrect ? '#DCFCE7' : '#FEE2E2',
                          color: item.isCorrect ? '#15803D' : '#B91C1C'
                        }}
                      >
                        {item.isCorrect ? '¡Acertada!' : 'Fallada'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0F172A', marginBottom: 10, lineHeight: 1.45 }}>
                      <FormattedInlineText text={item.question.prompt.split('\n')[0]} />
                    </div>

                    <div
                      style={{
                        background: item.isCorrect ? '#F0FDF4' : '#FEF2F2',
                        border: `1.5px solid ${item.isCorrect ? '#BBF7D0' : '#FECACA'}`,
                        borderRadius: 12,
                        padding: '10px 14px',
                        fontSize: '0.86rem'
                      }}
                    >
                      <div>
                        <strong style={{ color: '#475569' }}>Tu respuesta:</strong>{' '}
                        <span style={{ color: item.isCorrect ? '#15803D' : '#DC2626', fontWeight: 900 }}>
                          {item.userAnswerText}
                        </span>
                      </div>
                      {!item.isCorrect && item.correctAnswerText && (
                        <div style={{ marginTop: 4, color: '#15803D' }}>
                          <strong>Respuesta correcta:</strong>{' '}
                          <span style={{ fontWeight: 800 }}>{item.correctAnswerText}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón Gigante Duolingo de Continuar */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn-3d btn-green"
                onClick={handleFinishAndProceed}
                style={{
                  width: '100%',
                  maxWidth: 420,
                  padding: '16px 24px',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10
                }}
              >
                <span>CONTINUAR A PROGRAAPP</span>
                <ArrowRight size={22} strokeWidth={2.8} />
              </button>
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════════════════════════════════════
              VISTA 2: PREGUNTA ACTIVA (DISEÑO DUOLINGO CON CONSOLA DE CÓDIGO)
             ══════════════════════════════════════════════════════════════════ */
          <div>
            {/* Header del Reto con Mascota y Bocadillo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                marginBottom: 20
              }}
            >
              <div style={{ flexShrink: 0, marginTop: 4 }}>
                <ConsoleDevAvatar mood="thinking" size={48} />
              </div>

              {/* Bocadillo de diálogo estilo Duolingo */}
              <div
                style={{
                  flex: 1,
                  background: '#FFFFFF',
                  border: '2.5px solid #E5E5E5',
                  boxShadow: '0 4px 0 #E5E5E5',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  position: 'relative'
                }}
              >
                {/* Triangulito del bocadillo */}
                <div
                  style={{
                    position: 'absolute',
                    left: -10,
                    top: 18,
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '10px solid #E5E5E5'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: -7,
                    top: 18,
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '10px solid #FFFFFF'
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span
                    style={{
                      background: instrument.pathId === 'kotlin' ? '#EDE9FE' : '#E0F2FE',
                      color: instrument.pathId === 'kotlin' ? '#6D28D9' : '#0369A1',
                      fontSize: '0.74rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: 6
                    }}
                  >
                    {currentQ.topic}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 700 }}>
                    Valor: {currentQ.maxScore} pts
                  </span>
                </div>

                {/* Renderizar cada segmento: texto y consola */}
                {promptSegments.map((seg, sIdx) => {
                  if (seg.type === 'text') {
                    return (
                      <div
                        key={sIdx}
                        style={{
                          fontSize: '1.08rem',
                          fontWeight: 800,
                          color: '#0F172A',
                          lineHeight: 1.5,
                          marginBottom: sIdx < promptSegments.length - 1 ? 12 : 0,
                          whiteSpace: 'pre-line'
                        }}
                      >
                        <FormattedInlineText text={seg.content} />
                      </div>
                    );
                  }

                  if (seg.type === 'code') {
                    return (
                      <div key={sIdx} style={{ margin: '12px 0' }}>
                        <VSCodeSnippet
                          code={seg.content}
                          language={seg.language || instrument.pathId}
                          filename={seg.language === 'sql' ? 'consulta.sql' : 'main.kt'}
                          showLineNumbers={true}
                        />
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>

            {/* ─── OPCIONES DE RESPUESTA ESTILO DUOLINGO ─── */}
            {currentQ.type === 'multiple_choice' && currentQ.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
                {currentQ.options.map((opt, idx) => {
                  const isSelected = currentAnswer === String(idx);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      style={{
                        textAlign: 'left',
                        padding: '16px 20px',
                        borderRadius: 16,
                        backgroundColor: isSelected ? '#DDF4FF' : '#FFFFFF',
                        border: isSelected ? '2.5px solid #1CB0F6' : '2px solid #E5E5E5',
                        boxShadow: isSelected ? '0 4px 0 #1899D6' : '0 4px 0 #E5E5E5',
                        color: isSelected ? '#042C5C' : '#0F172A',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        transition: 'all 0.12s ease',
                        outline: 'none',
                        transform: isSelected ? 'translateY(1px)' : 'none'
                      }}
                    >
                      {/* Atajo / Letra A, B, C, D con estilo Duolingo */}
                      <span
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          backgroundColor: isSelected ? '#1CB0F6' : '#F1F5F9',
                          border: isSelected ? '2px solid #1899D6' : '2px solid #CBD5E1',
                          color: isSelected ? '#FFFFFF' : '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                          fontWeight: 900,
                          flexShrink: 0
                        }}
                      >
                        {isSelected ? <Check size={20} strokeWidth={3.5} /> : String.fromCharCode(65 + idx)}
                      </span>

                      {/* Texto de la opción con soporte de inline code */}
                      <span
                        style={{
                          fontSize: '1rem',
                          fontWeight: isSelected ? 800 : 700,
                          lineHeight: 1.45,
                          flex: 1
                        }}
                      >
                        <FormattedInlineText text={opt} />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ─── PREGUNTA ABIERTA / CÓDIGO (EDITOR ESTILO CONSOLA) ─── */}
            {currentQ.type !== 'multiple_choice' && (
              <div style={{ marginTop: 14 }}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2.5px solid #E5E5E5',
                    boxShadow: '0 4px 0 #E5E5E5',
                    borderRadius: 18,
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      background: '#F8FAFC',
                      borderBottom: '2px solid #E5E5E5',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#475569'
                    }}
                  >
                    <span>Editor de Respuesta ({currentQ.type === 'code' ? 'Código' : 'Texto'})</span>
                  </div>

                  <textarea
                    rows={currentQ.type === 'code' ? 6 : 4}
                    placeholder={
                      currentQ.type === 'code'
                        ? '// Escribe tu solución aquí...'
                        : 'Escribe tu respuesta aquí de forma clara y detallada...'
                    }
                    value={currentAnswer}
                    onChange={(e) => handleTextChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      backgroundColor: '#FFFFFF',
                      border: 'none',
                      color: '#0F172A',
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      fontFamily: currentQ.type === 'code' ? "'JetBrains Mono', Consolas, monospace" : 'inherit',
                      lineHeight: 1.55,
                      boxSizing: 'border-box',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Mensaje de Validación de Respuesta */}
            {validationError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: '#FEF2F2',
                  border: '2px solid #FCA5A5',
                  borderRadius: 14,
                  padding: '12px 16px',
                  color: '#991B1B',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  marginTop: 20
                }}
              >
                <AlertCircle size={20} color="#DC2626" style={{ flexShrink: 0 }} />
                <span>{validationError}</span>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ─── BARRA INFERIOR FIJA DUOLINGO (FOOTER DOCK) ─── */}
      {!isSubmitted && (
        <footer
          style={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: '#FFFFFF',
            borderTop: '2.5px solid #E5E5E5',
            padding: '16px 20px',
            zIndex: 40
          }}
        >
          <div
            style={{
              maxWidth: 780,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16
            }}
          >
            <button
              type="button"
              className="btn-3d btn-outline"
              style={{
                padding: '12px 20px',
                fontSize: '0.92rem',
                fontWeight: 900,
                visibility: currentQuestionIndex === 0 ? 'hidden' : 'visible'
              }}
              disabled={currentQuestionIndex === 0}
              onClick={() => {
                soundService.playToken();
                setValidationError(null);
                setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <ArrowLeft size={18} strokeWidth={2.8} />
              <span>ANTERIOR</span>
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                type="button"
                className="btn-3d"
                disabled={!isQuestionAnswered}
                style={{
                  padding: '14px 36px',
                  fontSize: '1rem',
                  fontWeight: 900,
                  letterSpacing: '0.8px',
                  backgroundColor: isQuestionAnswered ? '#58CC02' : '#E5E5E5',
                  color: isQuestionAnswered ? '#FFFFFF' : '#AFAFAF',
                  boxShadow: isQuestionAnswered ? '0 4px 0 #46A302' : '0 4px 0 #D1D5DB',
                  cursor: isQuestionAnswered ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  borderRadius: 16,
                  transition: 'all 0.15s ease'
                }}
                onClick={handleNextQuestion}
              >
                <span>CONTINUAR</span>
                <ArrowRight size={20} strokeWidth={2.8} />
              </button>
            ) : (
              <button
                type="button"
                className="btn-3d"
                disabled={!isQuestionAnswered || isSubmitting}
                style={{
                  padding: '14px 36px',
                  fontSize: '1rem',
                  fontWeight: 900,
                  letterSpacing: '0.8px',
                  backgroundColor: isQuestionAnswered ? '#58CC02' : '#E5E5E5',
                  color: isQuestionAnswered ? '#FFFFFF' : '#AFAFAF',
                  boxShadow: isQuestionAnswered ? '0 4px 0 #46A302' : '0 4px 0 #D1D5DB',
                  cursor: isQuestionAnswered ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  borderRadius: 16,
                  transition: 'all 0.15s ease'
                }}
                onClick={handleSubmitEvaluation}
              >
                <Send size={18} strokeWidth={2.8} />
                <span>{isSubmitting ? 'ENTREGANDO...' : 'FINALIZAR'}</span>
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
};
