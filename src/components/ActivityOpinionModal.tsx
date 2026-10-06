import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { ActivityOpinion } from '../types/academic';
import { academicService } from '../services/academicService';
import { soundService } from '../services/soundService';

interface ActivityOpinionModalProps {
  isOpen: boolean;
  studentId: string;
  studentCode: string;
  activityId: string;
  onClose: () => void;
}

export const ActivityOpinionModal: React.FC<ActivityOpinionModalProps> = ({
  isOpen,
  studentId,
  studentCode,
  activityId,
  onClose
}) => {
  const [instructionClarity, setInstructionClarity] = useState(5);
  const [perceivedUtility, setPerceivedUtility] = useState(5);
  const [usageDifficulties, setUsageDifficulties] = useState('');
  const [optionalComment, setOptionalComment] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundService.playToken();

    const opinion: ActivityOpinion = {
      opinionId: `op_${studentId}_${activityId}_${Date.now()}`,
      studentId,
      studentCode,
      activityId,
      instrumentVersion: '1.0.0',
      instructionClarity,
      perceivedUtility,
      usageDifficulties: usageDifficulties.trim() || 'Ninguna',
      optionalComment: optionalComment.trim() || undefined,
      createdAt: Date.now()
    };

    await academicService.saveActivityOpinion(opinion);
    soundService.playWin();
    setIsSent(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card" style={{ maxWidth: 440 }}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar opinión">
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: '#06B6D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px auto',
              boxShadow: '0 4px 0 #0891B2'
            }}
          >
            <MessageSquare size={24} color="#FFFFFF" />
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF' }}>
            Opinión Pedagógica Breve
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.82rem', marginTop: 2 }}>
            Tus comentarios ayudan a evaluar la claridad de las actividades.
          </p>
        </div>

        {isSent ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#22C55E', fontWeight: 800 }}>
            ¡Gracias por tus comentarios!
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Claridad de instrucciones */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 6 }}>
                Claridad de las instrucciones (1 al 5):
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setInstructionClarity(val)}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      borderRadius: 10,
                      background: instructionClarity >= val ? '#06B6D4' : 'rgba(255, 255, 255, 0.05)',
                      border: '1.5px solid rgba(255, 255, 255, 0.1)',
                      color: instructionClarity >= val ? '#FFFFFF' : '#94A3B8',
                      fontWeight: 900,
                      cursor: 'pointer'
                    }}
                  >
                    {val} ★
                  </button>
                ))}
              </div>
            </div>

            {/* Utilidad percibida */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 6 }}>
                Utilidad percibida para tu aprendizaje (1 al 5):
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPerceivedUtility(val)}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      borderRadius: 10,
                      background: perceivedUtility >= val ? '#10B981' : 'rgba(255, 255, 255, 0.05)',
                      border: '1.5px solid rgba(255, 255, 255, 0.1)',
                      color: perceivedUtility >= val ? '#FFFFFF' : '#94A3B8',
                      fontWeight: 900,
                      cursor: 'pointer'
                    }}
                  >
                    {val} ★
                  </button>
                ))}
              </div>
            </div>

            {/* Dificultades de uso */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                ¿Tuviste alguna dificultad con la interfaz o el contenido?
              </label>
              <input
                type="text"
                placeholder="ej: Ninguna, o la redacción del ejercicio 3 fue confusa"
                value={usageDifficulties}
                onChange={(e) => setUsageDifficulties(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0B131E',
                  border: '1.5px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 10,
                  padding: '9px 12px',
                  color: '#FFFFFF',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            {/* Comentario opcional */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                Comentario adicional (opcional):
              </label>
              <textarea
                rows={2}
                placeholder="Sugerencias o comentarios..."
                value={optionalComment}
                onChange={(e) => setOptionalComment(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0B131E',
                  border: '1.5px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 10,
                  padding: '8px 12px',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  resize: 'none'
                }}
              />
            </div>

            <button type="submit" className="btn-3d btn-green" style={{ marginTop: 6 }}>
              <Send size={16} /> Enviar Opinión
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
