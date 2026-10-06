import React, { useState } from 'react';
import {
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  X
} from 'lucide-react';
import { EvaluationInstrument } from '../content/academicEvaluations';
import { AcademicEvaluation, EvaluationQuestion } from '../types/academic';
import { UserProfile } from '../types/user';
import { academicService } from '../services/academicService';
import { soundService } from '../services/soundService';

interface EvaluationModalProps {
  isOpen: boolean;
  instrument: EvaluationInstrument;
  user: UserProfile;
  onClose: () => void;
  onComplete: (evaluation: AcademicEvaluation) => void;
}

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  isOpen,
  instrument,
  user,
  onClose,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startedAt] = useState<number>(Date.now());

  if (!isOpen) return null;

  const currentQ: EvaluationQuestion = instrument.questions[currentQuestionIndex];
  const totalQuestions = instrument.questions.length;
  const currentAnswer = answers[currentQ.questionId] || '';

  const handleSelectOption = (idx: number) => {
    soundService.playToken();
    setAnswers(prev => ({
      ...prev,
      [currentQ.questionId]: String(idx)
    }));
  };

  const handleTextChange = (val: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.questionId]: val
    }));
  };

  const answeredCount = Object.keys(answers).filter(k => answers[k]?.trim() !== '').length;

  const handleSubmitEvaluation = async () => {
    soundService.playToken();
    setIsSubmitting(true);

    try {
      const scores: Record<string, number> = {};
      let autoTotalScore = 0;
      let hasPending = false;

      // Evaluar respuestas automáticas (multiple choice)
      instrument.questions.forEach((q) => {
        const studentAns = answers[q.questionId];
        if (q.type === 'multiple_choice') {
          if (studentAns !== undefined && Number(studentAns) === q.correctOptionIndex) {
            scores[q.questionId] = q.maxScore;
            autoTotalScore += q.maxScore;
          } else {
            scores[q.questionId] = 0;
          }
        } else {
          // Preguntas de desarrollo, código o pseudocódigo quedan pendientes de revisión docente
          hasPending = true;
          scores[q.questionId] = 0;
        }
      });

      const submittedAt = Date.now();
      const evalId = `eval_${user.uid}_${instrument.instrumentId}_${submittedAt}`;

      // Si no hay preguntas abiertas, se califica al 100% de forma inmediata
      const status = hasPending ? 'pending_review' : 'graded';
      const maxScore = instrument.maxTotalScore;
      const percentage = hasPending ? null : Math.round((autoTotalScore / maxScore) * 100);

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
        status,
        questions: instrument.questions,
        answers,
        scores,
        totalScore: autoTotalScore,
        maxScore,
        percentage,
        isExternal: false
      };

      // Guardar evaluación en el servicio académico
      await academicService.saveEvaluation(evaluationRecord);

      // Registrar también cada respuesta como intento individual en el historial inmutable
      for (let i = 0; i < instrument.questions.length; i++) {
        const q = instrument.questions[i];
        const ans = answers[q.questionId] || '(Sin respuesta)';
        const isCorrect = q.type === 'multiple_choice' ? Number(ans) === q.correctOptionIndex : false;

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
          userAnswer: ans,
          status: q.type === 'multiple_choice' ? (isCorrect ? 'correct' : 'incorrect') : 'pending_review',
          score: scores[q.questionId] || 0,
          maxScore: q.maxScore,
          hintUsed: false,
          timestamp: submittedAt,
          isTestOrEvaluation: true
        });
      }

      soundService.playWin();
      setIsSubmitted(true);
      setTimeout(() => {
        onComplete(evaluationRecord);
        onClose();
      }, 1800);
    } catch (err) {
      soundService.playError();
      console.error('Error al entregar evaluación:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: 650, maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar evaluación">
          <X size={20} />
        </button>

        {/* Encabezado */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: instrument.type === 'diagnostic' ? '#06B6D4' : '#8B5CF6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 0 ${instrument.type === 'diagnostic' ? '#0891B2' : '#6D28D9'}`
            }}
          >
            <FileText size={22} color="#FFFFFF" />
          </div>
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: instrument.type === 'diagnostic' ? '#38BDF8' : '#C084FC',
                letterSpacing: '0.06em'
              }}
            >
              {instrument.type === 'diagnostic' ? 'Evaluación Diagnóstica Oficial' : 'Prueba Final Oficial'} • Ruta {instrument.pathId.toUpperCase()}
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF' }}>
              {instrument.title}
            </h2>
          </div>
        </div>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '36px 16px' }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: '#22C55E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 4px 0 #15803D'
              }}
            >
              <CheckCircle size={36} color="#FFFFFF" strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 8 }}>
              ¡Evaluación Entregada con Éxito!
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: 440, margin: '0 auto' }}>
              Tus respuestas han sido registradas para el seguimiento de la investigación educativa.
            </p>
          </div>
        ) : (
          <>
            {/* Barra de Progreso de Preguntas */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8', marginBottom: 6 }}>
                <span>Pregunta {currentQuestionIndex + 1} de {totalQuestions}</span>
                <span>{answeredCount} de {totalQuestions} respondidas</span>
              </div>
              <div style={{ height: 8, background: '#1E293B', borderRadius: 999, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                    background: '#06B6D4',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Tarjeta de la Pregunta Actual */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1.5px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 16,
                padding: '20px 18px',
                marginBottom: 20
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span
                  style={{
                    background: '#0284C7',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    padding: '2px 8px',
                    borderRadius: 6
                  }}
                >
                  {currentQ.topic}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  Valor: {currentQ.maxScore} pts
                </span>
              </div>

              <div
                style={{
                  fontSize: '0.96rem',
                  fontWeight: 600,
                  color: '#F8FAFC',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                  marginBottom: 16
                }}
              >
                {currentQ.prompt}
              </div>

              {/* Modo Opción Múltiple */}
              {currentQ.type === 'multiple_choice' && currentQ.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = currentAnswer === String(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(idx)}
                        style={{
                          textAlign: 'left',
                          padding: '12px 16px',
                          borderRadius: 12,
                          background: isSelected ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? '2px solid #06B6D4' : '1.5px solid rgba(255, 255, 255, 0.1)',
                          color: isSelected ? '#FFFFFF' : '#CBD5E1',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            background: isSelected ? '#06B6D4' : 'rgba(255, 255, 255, 0.1)',
                            color: isSelected ? '#FFFFFF' : '#94A3B8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.78rem',
                            fontWeight: 900
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Modo Pregunta Abierta / Código / Pseudocódigo */}
              {currentQ.type !== 'multiple_choice' && (
                <div>
                  <textarea
                    rows={currentQ.type === 'code' ? 6 : 4}
                    placeholder={
                      currentQ.type === 'code'
                        ? '// Escribe tu código o consulta aquí...'
                        : 'Escribe tu respuesta argumentada aquí...'
                    }
                    value={currentAnswer}
                    onChange={(e) => handleTextChange(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0B131E',
                      border: '1.5px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: 12,
                      padding: 12,
                      color: '#F8FAFC',
                      fontSize: '0.9rem',
                      fontFamily: currentQ.type === 'code' ? 'monospace' : 'inherit',
                      lineHeight: 1.4,
                      resize: 'vertical'
                    }}
                  />
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: 6 }}>
                    Esta pregunta será evaluada por el docente según la rúbrica de corrección.
                  </div>
                </div>
              )}
            </div>

            {/* Controles de Navegación entre Preguntas */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                className="btn-3d btn-outline"
                style={{ padding: '10px 16px', fontSize: '0.86rem' }}
                disabled={currentQuestionIndex === 0}
                onClick={() => {
                  soundService.playToken();
                  setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
                }}
              >
                <ArrowLeft size={16} /> Anterior
              </button>

              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  className="btn-3d btn-blue"
                  style={{ padding: '10px 18px', fontSize: '0.86rem' }}
                  onClick={() => {
                    soundService.playToken();
                    setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1));
                  }}
                >
                  Siguiente <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-3d btn-green"
                  style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                  disabled={isSubmitting}
                  onClick={handleSubmitEvaluation}
                >
                  <Send size={16} /> {isSubmitting ? 'Enviando...' : 'Finalizar y Entregar'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
