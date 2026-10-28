import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  ArrowRight,
  RotateCcw,
  X
} from 'lucide-react';
import { KotlinAutoCheckResult } from '../../types/kotlinLab';

interface KotlinAutoCheckModalProps {
  isOpen: boolean;
  result: KotlinAutoCheckResult | null;
  exerciseTitle: string;
  onClose: () => void;
  onNextExercise?: () => void;
  onRetry?: () => void;
}

export const KotlinAutoCheckModal: React.FC<KotlinAutoCheckModalProps> = ({
  isOpen,
  result,
  exerciseTitle,
  onClose,
  onNextExercise,
  onRetry
}) => {
  if (!isOpen || !result) return null;

  return (
    <div className="kt-modal-backdrop" onClick={onClose}>
      <div className="kt-modal-card" onClick={e => e.stopPropagation()}>
        {/* Cabecera del modal */}
        <div className={`kt-modal-header ${result.passed ? 'passed' : 'failed'}`}>
          <div className="kt-modal-header-icon">
            {result.passed ? (
              <Trophy size={32} className="text-yellow-300" />
            ) : (
              <XCircle size={32} className="text-rose-200" />
            )}
          </div>
          <div className="kt-modal-header-text">
            <h2 className="kt-modal-title">
              {result.passed ? '¡Excelente Trabajo! Desafío Superado' : 'Aún Faltan Requisitos'}
            </h2>
            <p className="kt-modal-subtitle">{exerciseTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="kt-modal-close-btn"
            title="Cerrar ventana"
          >
            <X size={18} />
          </button>
        </div>

        {/* Resumen de puntuación */}
        <div className="kt-modal-score-bar">
          <div className="kt-modal-score-item">
            <span className="kt-modal-score-label">Puntaje Obtenido</span>
            <span className="kt-modal-score-value">
              {result.score} / {result.maxScore} pts
            </span>
          </div>
          {result.passed && (
            <div className="kt-modal-score-badge">
              <Sparkles size={14} />
              <span>+25 XP y Racha de Práctica</span>
            </div>
          )}
        </div>

        {/* Lista de Criterios Evaluados */}
        <div className="kt-modal-checks-container">
          <h3 className="kt-modal-checks-heading">Criterios de Evaluación:</h3>
          <div className="kt-modal-checks-list">
            {result.checks.map((chk, idx) => (
              <div
                key={idx}
                className={`kt-modal-check-item ${chk.passed ? 'passed' : 'failed'}`}
              >
                <div className="kt-modal-check-icon">
                  {chk.passed ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <XCircle size={18} className="text-rose-500" />
                  )}
                </div>
                <div className="kt-modal-check-details">
                  <span className="kt-modal-check-desc">{chk.description}</span>
                  {chk.details && (
                    <p className="kt-modal-check-extra">{chk.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones del Modal */}
        <div className="kt-modal-actions">
          {result.passed ? (
            <>
              {onNextExercise && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNextExercise();
                  }}
                  className="kt-modal-btn-primary"
                >
                  <span>Siguiente Reto</span>
                  <ArrowRight size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="kt-modal-btn-secondary"
              >
                Permanecer en este ejercicio
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onRetry) onRetry();
                }}
                className="kt-modal-btn-primary"
              >
                <RotateCcw size={16} />
                <span>Corregir y Reintentar</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="kt-modal-btn-secondary"
              >
                Volver al Editor
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
