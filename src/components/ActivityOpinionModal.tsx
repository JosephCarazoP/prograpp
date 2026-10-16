import React, { useState } from 'react';
import { Send, X, Star, BookOpen, Sparkles, MessageCircle, HeartHandshake, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
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

/**
 * Byte Mascota 3D sosteniendo libreta y lápiz (0% IA / 100% Vector SVG Duolingo 3D)
 */
const ByteOpinionMascotSVG: React.FC = () => (
  <svg
    viewBox="0 0 140 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 110, height: 95, filter: 'drop-shadow(0 6px 12px rgba(14, 165, 233, 0.22))' }}
  >
    <defs>
      <linearGradient id="op-chassis" x1="40" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="op-gold" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#FDE047" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="op-clipboard" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    {/* Sombra base en el suelo */}
    <ellipse cx="70" cy="115" rx="44" ry="5" fill="#E2E8F0" />

    {/* Destellos de estrellas 3D en el fondo */}
    <path
      d="M118 20 L121 26 L128 27 L123 32 L124 39 L118 35 L112 39 L113 32 L108 27 L115 26 Z"
      fill="url(#op-gold)"
      stroke="#D97706"
      strokeWidth="1.2"
    />
    <path
      d="M20 32 L22 36 L26 37 L22 39 L21 43 L19 39 L15 38 L19 36 Z"
      fill="#38BDF8"
    />

    {/* Antena 3D de Byte con orbe dorado resplandeciente */}
    <rect x="67" y="8" width="6" height="15" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
    <circle cx="70" cy="7" r="8" fill="url(#op-gold)" stroke="#B45309" strokeWidth="1.5" />
    <circle cx="68" cy="5" r="2.5" fill="#FFFFFF" fillOpacity="0.85" />

    {/* Almohadillas laterales 3D (auriculares) */}
    <rect x="29" y="38" width="8" height="22" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="1.2" />
    <circle cx="33" cy="49" r="2" fill="#22C55E" />
    <rect x="103" y="38" width="8" height="22" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="1.2" />
    <circle cx="107" cy="49" r="2" fill="#22C55E" />

    {/* Cabeza / Casco redondeado Duolingo 3D */}
    <rect x="36" y="20" width="68" height="58" rx="24" fill="url(#op-chassis)" stroke="#0284C7" strokeWidth="2.6" />
    {/* Reflejo especular superior en el casco */}
    <path d="M44 26 C56 22 84 22 96 26" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />

    {/* Visor digital oscuro */}
    <rect x="44" y="32" width="52" height="34" rx="14" fill="#0F172A" stroke="#0369A1" strokeWidth="1.8" />
    {/* Reflejo de cristal inclinado */}
    <path d="M48 35 L64 35 L54 62 L48 62 Z" fill="#FFFFFF" fillOpacity="0.08" />

    {/* Ojos expresivos y tiernos de Byte */}
    <ellipse cx="58" cy="47" rx="5" ry="6.5" fill="#38BDF8" />
    <ellipse cx="58" cy="47" rx="3.8" ry="4.8" fill="#0284C7" />
    <circle cx="59.5" cy="45" r="1.8" fill="#FFFFFF" />

    <ellipse cx="82" cy="47" rx="5" ry="6.5" fill="#38BDF8" />
    <ellipse cx="82" cy="47" rx="3.8" ry="4.8" fill="#0284C7" />
    <circle cx="83.5" cy="45" r="1.8" fill="#FFFFFF" />

    {/* Mejillas sonrosadas */}
    <circle cx="50" cy="55" r="3" fill="#F472B6" fillOpacity="0.75" />
    <circle cx="90" cy="55" r="3" fill="#F472B6" fillOpacity="0.75" />

    {/* Sonrisa amigable */}
    <path d="M64 55 Q70 61 76 55" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" fill="none" />

    {/* Torso y cuello */}
    <path d="M50 78 L90 78 L96 112 L44 112 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
    <circle cx="70" cy="95" r="4.5" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
    <circle cx="71" cy="94" r="1.2" fill="#FFFFFF" />

    {/* Libreta / Clipboard sostenida por el brazo izquierdo */}
    <g className="mascot-clipboard">
      <rect x="33" y="78" width="32" height="36" rx="6" fill="url(#op-clipboard)" stroke="#B45309" strokeWidth="1.8" />
      <rect x="42" y="75" width="14" height="6" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
      <rect x="37" y="82" width="24" height="28" rx="3" fill="#FFFFFF" />

      {/* Renglones en la libreta */}
      <line x1="41" y1="87" x2="57" y2="87" stroke="#E2E8F0" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="41" y1="92" x2="57" y2="92" stroke="#E2E8F0" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="41" y1="97" x2="52" y2="97" stroke="#E2E8F0" strokeWidth="1.8" strokeLinecap="round" />
      {/* Checkmark verde de aprobación */}
      <path d="M47 103 L50 106 L56 99" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Guante izquierdo abrazando el clipboard */}
      <circle cx="34" cy="95" r="5.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.6" />
    </g>

    {/* Brazo derecho y lápiz señalando la libreta */}
    <g className="mascot-pencil-arm">
      <path d="M88 84 C98 88 102 96 98 103" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Guante derecho */}
      <circle cx="94" cy="100" r="5.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.6" />

      {/* Lápiz amarillo inclinado */}
      <g transform="rotate(-30 92 98)">
        <rect x="88" y="93" width="16" height="5" rx="1.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
        <path d="M88 93 L83 95.5 L88 98 Z" fill="#1E293B" />
        <rect x="104" y="93" width="4" height="5" rx="1" fill="#F472B6" />
      </g>
    </g>
  </svg>
);

/**
 * Byte Celebración de Éxito 3D (0% IA / 100% Vector SVG Duolingo 3D)
 */
const ByteOpinionCelebrationSVG: React.FC = () => (
  <svg
    viewBox="0 0 140 125"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 115, height: 100, filter: 'drop-shadow(0 8px 16px rgba(34, 197, 94, 0.25))' }}
  >
    <defs>
      <linearGradient id="win-chassis" x1="40" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="win-gold" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#FDE047" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    {/* Sombra base */}
    <ellipse cx="70" cy="120" rx="42" ry="5" fill="#E2E8F0" />

    {/* Confeti festivo vector */}
    <rect x="22" y="22" width="6" height="6" rx="1.5" fill="#22C55E" transform="rotate(25 22 22)" />
    <rect x="114" y="24" width="7" height="7" rx="1.5" fill="#0EA5E9" transform="rotate(-35 114 24)" />
    <circle cx="28" cy="46" r="3" fill="#EC4899" />
    <circle cx="118" cy="50" r="3.5" fill="#F59E0B" />

    {/* Brazos alzados en señal de victoria y festejo */}
    <path d="M44 76 C30 68 22 52 28 38" stroke="#0284C7" strokeWidth="6.5" strokeLinecap="round" fill="none" />
    <circle cx="28" cy="38" r="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.8" />

    <path d="M96 76 C110 68 118 52 112 38" stroke="#0284C7" strokeWidth="6.5" strokeLinecap="round" fill="none" />
    <circle cx="112" cy="38" r="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.8" />

    {/* Antena radiante */}
    <rect x="67" y="10" width="6" height="15" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
    <circle cx="70" cy="9" r="8" fill="url(#win-gold)" stroke="#B45309" strokeWidth="1.5" />
    <circle cx="68" cy="7" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />

    {/* Cabeza / Casco Duolingo 3D */}
    <rect x="36" y="22" width="68" height="58" rx="24" fill="url(#win-chassis)" stroke="#0284C7" strokeWidth="2.6" />
    <path d="M44 28 C56 24 84 24 96 28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />

    {/* Visor digital */}
    <rect x="44" y="34" width="52" height="34" rx="14" fill="#0F172A" stroke="#0369A1" strokeWidth="1.8" />

    {/* Ojitos cerrados de alegría extrema (^ ^) */}
    <path d="M52 50 Q58 42 64 50" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    <path d="M76 50 Q82 42 88 50" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" fill="none" />

    {/* Sonrisa abierta grande y festiva */}
    <path d="M63 54 Q70 65 77 54 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.2" />

    {/* Mejillas sonrosadas */}
    <circle cx="49" cy="56" r="3.2" fill="#F472B6" fillOpacity="0.8" />
    <circle cx="91" cy="56" r="3.2" fill="#F472B6" fillOpacity="0.8" />

    {/* Torso */}
    <path d="M50 80 L90 80 L96 114 L44 114 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
    <circle cx="70" cy="97" r="4.5" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
  </svg>
);

const CLARITY_DESCRIPTIONS: Record<number, string> = {
  1: '1 ★ Muy confusa (no entendí qué hacer)',
  2: '2 ★ Poco clara o ambigua',
  3: '3 ★ Aceptable / comprensible',
  4: '4 ★ Bastante clara y directa',
  5: '5 ★ ¡Cristalina y súper fácil de entender! ✨'
};

const UTILITY_DESCRIPTIONS: Record<number, string> = {
  1: '1 ★ Poco provechosa para mi nivel',
  2: '2 ★ Me sirvió de poco',
  3: '3 ★ Buen ejercicio de refuerzo',
  4: '4 ★ Muy instructiva y útil',
  5: '5 ★ ¡Excelente! Sentí que aprendí muchísimo 🚀'
};

const QUICK_DIFFICULTY_CHIPS = [
  '✅ Ninguna, todo fluido',
  '🧩 Enunciado confuso',
  '⏳ Faltó tiempo',
  '🖥️ Detalle de interfaz',
  '💡 Faltaron pistas'
];

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
  const [selectedQuickChip, setSelectedQuickChip] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClaritySelect = (val: number) => {
    soundService.playToken();
    setInstructionClarity(val);
  };

  const handleUtilitySelect = (val: number) => {
    soundService.playToken();
    setPerceivedUtility(val);
  };

  const handleQuickChipClick = (chip: string) => {
    soundService.playToken();
    if (selectedQuickChip === chip) {
      setSelectedQuickChip(null);
      setUsageDifficulties('');
    } else {
      setSelectedQuickChip(chip);
      setUsageDifficulties(chip);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundService.playWin();

    // Disparar confeti Duolingo
    try {
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#22C55E', '#0EA5E9', '#F59E0B', '#EC4899']
      });
    } catch {
      // Ignore if confetti is unavailable
    }

    const finalDifficulty = usageDifficulties.trim() || selectedQuickChip || 'Ninguna, todo fluido';

    const opinion: ActivityOpinion = {
      opinionId: `op_${studentId}_${activityId}_${Date.now()}`,
      studentId,
      studentCode,
      activityId,
      instrumentVersion: '1.0.0',
      instructionClarity,
      perceivedUtility,
      usageDifficulties: finalDifficulty,
      optionalComment: optionalComment.trim() || undefined,
      createdAt: Date.now()
    };

    await academicService.saveActivityOpinion(opinion);
    setIsSent(true);

    setTimeout(() => {
      onClose();
    }, 2400);
  };

  return (
    <div className="opinion-modal-backdrop" onClick={onClose}>
      <div className="opinion-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar 3D Duolingo */}
        <button
          className="opinion-close-btn"
          onClick={onClose}
          aria-label="Cerrar ventana de opinión"
          title="Cerrar"
        >
          <X size={18} />
        </button>

        {isSent ? (
          /* Vista de Celebración Duolingo 3D */
          <div className="opinion-success-card">
            <ByteOpinionCelebrationSVG />
            <h3 className="opinion-success-title">¡Muchísimas Gracias! 🎉</h3>
            <div className="opinion-success-reward-pill">
              <Sparkles size={16} /> Tu opinión nos ayuda a mejorar
            </div>
            <p className="opinion-success-desc">
              Tus comentarios se guardaron con éxito. Cada opinión hace que Prograpp sea más claro y divertido para todos.
            </p>
            <button
              type="button"
              className="opinion-submit-btn"
              onClick={onClose}
              style={{ maxWidth: 280 }}
            >
              <CheckCircle2 size={20} /> ¡Entendido!
            </button>
          </div>
        ) : (
          /* Formulario de Opinión Pedagógica */
          <>
            <div className="opinion-header">
              <ByteOpinionMascotSVG />
              <div className="opinion-badge">
                <HeartHandshake size={14} /> Opinión de la Actividad
              </div>
              <h2 className="opinion-title">¿Cómo estuvo este reto?</h2>
              <p className="opinion-subtitle">
                Cuéntale a Byte cómo sentiste el ejercicio para que las próximas lecciones sean todavía mejores.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* 1. Claridad de las instrucciones */}
              <div className="opinion-section">
                <div className="opinion-label-row">
                  <div className="opinion-icon-chip cyan">
                    <BookOpen size={14} />
                  </div>
                  <label className="opinion-label">
                    Claridad de las instrucciones (1 al 5):
                  </label>
                </div>

                <div className="opinion-stars-row">
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isSelected = instructionClarity >= val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleClaritySelect(val)}
                        className={`opinion-star-btn ${isSelected ? 'active-clarity' : ''}`}
                        title={`Calificar con ${val} estrellas`}
                      >
                        <Star
                          size={16}
                          fill={isSelected ? '#FFFFFF' : 'none'}
                          stroke={isSelected ? '#FFFFFF' : 'currentColor'}
                        />
                        <span>{val}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="opinion-mood-pill cyan">
                  <span>{CLARITY_DESCRIPTIONS[instructionClarity]}</span>
                </div>
              </div>

              {/* 2. Utilidad percibida para tu aprendizaje */}
              <div className="opinion-section">
                <div className="opinion-label-row">
                  <div className="opinion-icon-chip green">
                    <Sparkles size={14} />
                  </div>
                  <label className="opinion-label">
                    Utilidad para tu aprendizaje (1 al 5):
                  </label>
                </div>

                <div className="opinion-stars-row">
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isSelected = perceivedUtility >= val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleUtilitySelect(val)}
                        className={`opinion-star-btn ${isSelected ? 'active-utility' : ''}`}
                        title={`Calificar con ${val} estrellas`}
                      >
                        <Star
                          size={16}
                          fill={isSelected ? '#FFFFFF' : 'none'}
                          stroke={isSelected ? '#FFFFFF' : 'currentColor'}
                        />
                        <span>{val}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="opinion-mood-pill green">
                  <span>{UTILITY_DESCRIPTIONS[perceivedUtility]}</span>
                </div>
              </div>

              {/* 3. Dificultades de uso con chips rápidos */}
              <div className="opinion-section">
                <div className="opinion-label-row">
                  <div className="opinion-icon-chip amber">
                    <MessageCircle size={14} />
                  </div>
                  <label className="opinion-label">
                    ¿Tuviste alguna dificultad?
                  </label>
                </div>

                {/* Chips rápidos de 1 solo toque */}
                <div className="opinion-quick-chips">
                  {QUICK_DIFFICULTY_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className={`opinion-chip ${selectedQuickChip === chip ? 'selected' : ''}`}
                      onClick={() => handleQuickChipClick(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="ej: Ninguna, o el ejercicio 3 tenía código confuso..."
                  value={usageDifficulties}
                  onChange={(e) => {
                    setUsageDifficulties(e.target.value);
                    if (selectedQuickChip && e.target.value !== selectedQuickChip) {
                      setSelectedQuickChip(null);
                    }
                  }}
                  className="opinion-input"
                />
              </div>

              {/* 4. Comentario adicional (opcional) */}
              <div className="opinion-section">
                <div className="opinion-label-row">
                  <div className="opinion-icon-chip purple">
                    <Send size={13} />
                  </div>
                  <label className="opinion-label">
                    Comentario adicional (opcional):
                  </label>
                </div>
                <textarea
                  rows={2}
                  placeholder="¿Alguna sugerencia o idea para mejorar esta lección?"
                  value={optionalComment}
                  onChange={(e) => setOptionalComment(e.target.value)}
                  className="opinion-textarea"
                />
              </div>

              {/* Botón 3D Duolingo de Envío */}
              <button type="submit" className="opinion-submit-btn">
                <Send size={18} /> Enviar Opinión
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
