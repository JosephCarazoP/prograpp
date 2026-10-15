import React from 'react';
import { EvaluationPage } from './EvaluationPage';
import { EvaluationInstrument } from '../content/academicEvaluations';
import { AcademicEvaluation } from '../types/academic';
import { UserProfile } from '../types/user';

interface EvaluationModalProps {
  isOpen: boolean;
  instrument: EvaluationInstrument;
  user: UserProfile;
  onClose: () => void;
  onComplete: (evaluation: AcademicEvaluation) => void;
  isMandatory?: boolean;
}

/**
 * Wrapper de compatibilidad hacia atrás: Ahora renderiza la página completa de alto contraste EvaluationPage
 */
export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  isOpen,
  instrument,
  user,
  onClose,
  onComplete,
  isMandatory = false
}) => {
  if (!isOpen) return null;
  return (
    <EvaluationPage
      instrument={instrument}
      user={user}
      onClose={onClose}
      onComplete={onComplete}
      isMandatory={isMandatory}
    />
  );
};
