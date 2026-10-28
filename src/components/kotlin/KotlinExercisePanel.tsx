import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import { KotlinExercise, KotlinAutoCheckResult } from '../../types/kotlinLab';

interface KotlinExercisePanelProps {
  exercise: KotlinExercise;
  onVerify: () => void;
  isVerifying?: boolean;
  lastCheckResult?: KotlinAutoCheckResult | null;
  onShowSolution?: () => void;
}

export const KotlinExercisePanel: React.FC<KotlinExercisePanelProps> = ({
  exercise,
  onVerify,
  isVerifying = false,
  lastCheckResult,
  onShowSolution
}) => {
  const [showHints, setShowHints] = useState(false);
  const [showSolutionConfirm, setShowSolutionConfirm] = useState(false);

  const getDifficultyBadge = (diff: 'easy' | 'medium' | 'hard') => {
    switch (diff) {
      case 'easy':
        return <span className="kt-diff-badge easy">Fácil</span>;
      case 'medium':
        return <span className="kt-diff-badge medium">Intermedio</span>;
      case 'hard':
        return <span className="kt-diff-badge hard">Desafío</span>;
    }
  };

  return (
    <div className="kt-exercise-panel-card">
      {/* ═══ CABECERA DEL RETO ═══ */}
      <div className="kt-exercise-panel-header">
        <div className="kt-exercise-panel-meta">
          <span className="kt-exercise-unit-tag">{exercise.unitTitle}</span>
          {getDifficultyBadge(exercise.difficulty)}
        </div>
        <h2 className="kt-exercise-title">{exercise.title}</h2>
      </div>

      {/* ═══ DESCRIPCIÓN Y OBJETIVOS ═══ */}
      <div className="kt-exercise-body">
        <div className="kt-exercise-desc-box">
          <p className="kt-exercise-desc">{exercise.description}</p>
        </div>

        {/* Lista de Objetivos */}
        <div className="kt-exercise-section">
          <h3 className="kt-exercise-section-title">
            <Award size={16} className="text-purple-600" />
            <span>Objetivos del Desafío</span>
          </h3>
          <ul className="kt-exercise-objectives-list">
            {exercise.objectives.map((obj, i) => (
              <li key={i} className="kt-exercise-objective-item">
                <Check size={14} className="text-purple-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="kt-objective-text">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ═══ ACORDEÓN DE PISTAS ═══ */}
        {exercise.hints.length > 0 && (
          <div className="kt-exercise-hints-wrapper">
            <button
              type="button"
              onClick={() => setShowHints(prev => !prev)}
              className="kt-exercise-hints-btn"
            >
              <div className="flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-500" />
                <span className="font-extrabold text-sm">
                  {showHints ? 'Ocultar Pistas' : 'Ver Pistas de Ayuda'} ({exercise.hints.length})
                </span>
              </div>
              {showHints ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showHints && (
              <div className="kt-exercise-hints-content">
                {exercise.hints.map((hint, i) => (
                  <div key={i} className="kt-exercise-hint-bubble">
                    <span className="kt-hint-index">Pista {i + 1}:</span>
                    <p className="kt-hint-text">{hint}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Solución de referencia (opcional para el estudiante) */}
        {exercise.solutionCode && onShowSolution && (
          <div className="kt-exercise-solution-box">
            {!showSolutionConfirm ? (
              <button
                type="button"
                onClick={() => setShowSolutionConfirm(true)}
                className="kt-solution-reveal-btn"
              >
                <HelpCircle size={14} />
                <span>¿Atascado? Revelar Solución Oficial</span>
              </button>
            ) : (
              <div className="kt-solution-confirm-bubble">
                <p className="text-xs font-bold text-slate-700 mb-2">
                  Ver la solución reemplazará tu código actual en el editor. ¿Continuar?
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onShowSolution();
                      setShowSolutionConfirm(false);
                    }}
                    className="btn-3d btn-yellow px-3 py-1 text-xs font-bold"
                  >
                    Sí, cargar solución
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSolutionConfirm(false)}
                    className="btn-3d btn-slate px-3 py-1 text-xs font-bold"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ FOOTER CON BOTÓN DE VERIFICACIÓN ═══ */}
      <div className="kt-exercise-panel-footer">
        <button
          type="button"
          onClick={onVerify}
          disabled={isVerifying}
          className="kt-btn-verify"
        >
          <span>{isVerifying ? 'Verificando con JVM...' : 'Verificar Solución'}</span>
        </button>

        {lastCheckResult && (
          <div
            className={`kt-exercise-feedback-badge ${
              lastCheckResult.passed ? 'passed' : 'failed'
            }`}
          >
            {lastCheckResult.passed ? (
              <>
                <CheckCircle2 size={16} />
                <span>¡Reto Completado! 100/100 Pts</span>
              </>
            ) : (
              <>
                <span>Puntaje: {lastCheckResult.score}/100 — Revisa los requisitos</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
