import React, { useState, useRef } from 'react';
import {
  Zap,
  Sparkles,
  Check,
  GraduationCap,
  EyeOff,
  ShieldCheck,
  Code2,
  Award,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../services/soundService';
import { UserPowerUps } from '../types/user';

export interface ChestRewardPayload {
  bytes: number;
  xp: number;
  batteries: number;
  powerups: Partial<UserPowerUps>;
}

interface ChestModalProps {
  isOpen: boolean;
  chestId: string;
  rewards?: ChestRewardPayload;
  onClose: () => void;
  onClaim: (chestId: string, rewards: ChestRewardPayload) => void;
}

export const ChestModal: React.FC<ChestModalProps> = ({
  isOpen,
  chestId,
  rewards = {
    bytes: 40,
    xp: 30,
    batteries: 2,
    powerups: {
      teacherHint: 1,
      eliminateOptions: 1,
      secondChance: 1,
      codePeek: 1
    }
  },
  onClose,
  onClaim
}) => {
  const [tapsRemaining, setTapsRemaining] = useState(3);
  const [animState, setAnimState] = useState<'idle' | 'wobble' | 'shake' | 'open'>('idle');
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!isOpen) return null;

  const handleChestTap = () => {
    if (tapsRemaining <= 0) return;
    if (animTimerRef.current) clearTimeout(animTimerRef.current);

    if (tapsRemaining === 3) {
      soundService.playToken();
      setAnimState('wobble');
      setTapsRemaining(2);
      animTimerRef.current = setTimeout(() => setAnimState('idle'), 350);
    } else if (tapsRemaining === 2) {
      soundService.playToken();
      setAnimState('shake');
      setTapsRemaining(1);
      animTimerRef.current = setTimeout(() => setAnimState('idle'), 400);
    } else if (tapsRemaining === 1) {
      soundService.playChest();
      setAnimState('open');
      setTapsRemaining(0);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#FF9500', '#38BDF8', '#22C55E', '#8B5CF6', '#FACC15']
        });
      } catch {
        // Ignorar si canvas-confetti falla
      }
    }
  };

  const handleClaim = () => {
    soundService.playWin();
    onClaim(chestId, rewards);
    setTapsRemaining(3);
    setAnimState('idle');
    onClose();
  };

  // Recompensas con el EXACTO estilo visual de Ajustes -> Comodines (Tokens 3D y Tarjetas Duolingo)
  const powerupRewardItems: {
    id: string;
    title: string;
    badge: string;
    tokenBg: string;
    tokenBorder: string;
    tokenShadow: string;
    icon: React.ReactNode;
  }[] = [];

  if (rewards.powerups?.teacherHint && rewards.powerups.teacherHint > 0) {
    powerupRewardItems.push({
      id: 'hint',
      title: 'Profesor',
      badge: `+${rewards.powerups.teacherHint} PISTA`,
      tokenBg: '#0284C7',
      tokenBorder: '#38BDF8',
      tokenShadow: '#0369A1',
      icon: <GraduationCap size={24} color="#FFFFFF" strokeWidth={2.4} />
    });
  }

  if (rewards.powerups?.eliminateOptions && rewards.powerups.eliminateOptions > 0) {
    powerupRewardItems.push({
      id: '5050',
      title: '50 / 50',
      badge: `+${rewards.powerups.eliminateOptions} DESCARTE`,
      tokenBg: '#D97706',
      tokenBorder: '#FCD34D',
      tokenShadow: '#B45309',
      icon: <EyeOff size={24} color="#FFFFFF" strokeWidth={2.4} />
    });
  }

  if (rewards.powerups?.secondChance && rewards.powerups.secondChance > 0) {
    powerupRewardItems.push({
      id: 'shield',
      title: 'Escudo',
      badge: `+${rewards.powerups.secondChance} CHANCE`,
      tokenBg: '#15803D',
      tokenBorder: '#4ADE80',
      tokenShadow: '#166534',
      icon: <ShieldCheck size={24} color="#FFFFFF" strokeWidth={2.4} />
    });
  }

  if (rewards.powerups?.codePeek && rewards.powerups.codePeek > 0) {
    powerupRewardItems.push({
      id: 'code',
      title: 'Pista Código',
      badge: `+${rewards.powerups.codePeek} SINTAXIS`,
      tokenBg: '#7E22CE',
      tokenBorder: '#C084FC',
      tokenShadow: '#6B21A8',
      icon: <Code2 size={24} color="#FFFFFF" strokeWidth={2.4} />
    });
  }

  if (rewards.bytes && rewards.bytes > 0) {
    powerupRewardItems.push({
      id: 'bytes',
      title: 'Bytes',
      badge: `+${rewards.bytes} BYTES`,
      tokenBg: '#0284C7',
      tokenBorder: '#38BDF8',
      tokenShadow: '#0369A1',
      icon: <Sparkles size={24} color="#FFFFFF" strokeWidth={2.4} />
    });
  }

  if (rewards.xp && rewards.xp > 0) {
    powerupRewardItems.push({
      id: 'xp',
      title: 'Experiencia',
      badge: `+${rewards.xp} XP`,
      tokenBg: '#D97706',
      tokenBorder: '#FCD34D',
      tokenShadow: '#B45309',
      icon: <Award size={24} color="#FFFFFF" strokeWidth={2.4} />
    });
  }

  if (rewards.batteries && rewards.batteries > 0) {
    powerupRewardItems.push({
      id: 'batt',
      title: 'Energía',
      badge: `+${rewards.batteries} OVERDRIVE`,
      tokenBg: '#E11D48',
      tokenBorder: '#FDA4AF',
      tokenShadow: '#9F1239',
      icon: <Zap size={24} color="#FFFFFF" strokeWidth={2.4} />
    });
  }

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={tapsRemaining === 0 ? handleClaim : undefined}
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          textAlign: 'center',
          maxWidth: '430px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#FFFFFF',
          border: '3px solid #F59E0B',
          boxShadow: '0 8px 0 #D97706, 0 16px 36px rgba(0, 0, 0, 0.16)',
          borderRadius: '24px',
          padding: '24px 20px',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {/* Botón cerrar si aún no se ha abierto */}
        {tapsRemaining > 0 && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: '#F1F5F9',
              border: '1.5px solid #CBD5E1',
              borderRadius: '999px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        )}

        {/* Encabezado */}
        <div style={{ marginBottom: '14px' }}>
          <span
            style={{
              fontSize: '0.76rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.7px',
              color: tapsRemaining > 0 ? '#B45309' : '#15803D',
              background: tapsRemaining > 0 ? '#FEF3C7' : '#DCFCE7',
              padding: '4px 12px',
              borderRadius: '999px',
              border: `1.5px solid ${tapsRemaining > 0 ? '#FCD34D' : '#86EFAC'}`
            }}
          >
            {tapsRemaining > 0 ? 'Cofre del Camino' : '¡Cofre Abierto!'}
          </span>
          <h2
            style={{
              fontSize: '1.45rem',
              fontWeight: 900,
              marginTop: '8px',
              marginBottom: '2px',
              color: '#1E293B'
            }}
          >
            {tapsRemaining > 0 ? '¡Toca para Abrir!' : '¡Botín Obtenido!'}
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.86rem', margin: 0 }}>
            {tapsRemaining > 0
              ? 'Toca el cofre para romper la cerradura'
              : 'Los comodines se han añadido a tu inventario'}
          </p>
        </div>

        {/* Zona Interactiva del Cofre 3D Caricaturesco */}
        <div
          id="chest-tap-zone"
          onClick={handleChestTap}
          style={{
            position: 'relative',
            cursor: tapsRemaining > 0 ? 'pointer' : 'default',
            margin: tapsRemaining === 0 ? '4px auto 10px auto' : '10px auto',
            width: '130px',
            height: tapsRemaining === 0 ? '110px' : '130px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none'
          }}
        >
          {/* Ilustración SVG del Cofre Dinámico 3D Estilo Duolingo */}
          <div
            className={`chest-interactive-box ${animState}`}
            style={{
              width: '120px',
              height: '120px',
              position: 'relative',
              transition: 'transform 0.15s ease'
            }}
          >
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Madera cálida Duolingo */}
                <linearGradient id="chestWood3d" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="35%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>

                {/* Bandas doradas */}
                <linearGradient id="chestGold3d" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>

                {/* Resplandor interior al abrir */}
                <radialGradient id="chestTreasureGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FEF08A" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </radialGradient>
              </defs>

              {/* Sombra de apoyo */}
              <ellipse cx="50" cy="85" rx="36" ry="6" fill="#000000" fillOpacity="0.14" />

              {/* Tapa del cofre */}
              {tapsRemaining === 0 ? (
                // Tapa Abierta hacia atrás
                <g style={{ transform: 'rotate(-36deg) translate(-14px, -18px)', transformOrigin: '22px 42px' }}>
                  <path d="M16 42 C16 25, 84 25, 84 42 Z" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
                  <rect x="35" y="27" width="9" height="15" fill="url(#chestGold3d)" stroke="#451A03" strokeWidth="1.2" />
                  <rect x="56" y="27" width="9" height="15" fill="url(#chestGold3d)" stroke="#451A03" strokeWidth="1.2" />
                </g>
              ) : (
                // Tapa Cerrada
                <g>
                  <path d="M16 44 C16 26, 84 26, 84 44 Z" fill="url(#chestWood3d)" stroke="#451A03" strokeWidth="2.6" />
                  <path d="M22 36 C30 30, 70 30, 78 36" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
                  <rect x="35" y="28" width="9" height="16" fill="url(#chestGold3d)" stroke="#451A03" strokeWidth="1.5" />
                  <rect x="56" y="28" width="9" height="16" fill="url(#chestGold3d)" stroke="#451A03" strokeWidth="1.5" />
                  <circle cx="39.5" cy="34" r="1.5" fill="#FEF08A" />
                  <circle cx="60.5" cy="34" r="1.5" fill="#FEF08A" />
                </g>
              )}

              {/* Interior del cofre abierto con gemas y monedas */}
              {tapsRemaining === 0 && (
                <g>
                  <ellipse cx="50" cy="45" rx="30" ry="11" fill="#78350F" stroke="#451A03" strokeWidth="2" />
                  <ellipse cx="50" cy="44" rx="27" ry="9" fill="url(#chestTreasureGlow)" />
                  {/* Monedas de oro */}
                  <circle cx="42" cy="43" r="5" fill="#FDE047" stroke="#B45309" strokeWidth="1" />
                  <circle cx="58" cy="42" r="5.5" fill="#FDE047" stroke="#B45309" strokeWidth="1" />
                  {/* Diamante Cyan */}
                  <polygon points="50,37 54,43 50,48 46,43" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
                  <polygon points="50,37 52,43 50,48" fill="#E0F2FE" />
                  {/* Esmeralda Verde */}
                  <polygon points="34,44 37,41 40,44 37,47" fill="#22C55E" stroke="#15803D" strokeWidth="0.8" />
                </g>
              )}

              {/* Base del cofre */}
              <rect x="18" y="44" width="64" height="38" rx="8" fill="url(#chestWood3d)" stroke="#451A03" strokeWidth="2.6" />
              <rect x="35" y="44" width="9" height="38" fill="url(#chestGold3d)" stroke="#451A03" strokeWidth="1.5" />
              <rect x="56" y="44" width="9" height="38" fill="url(#chestGold3d)" stroke="#451A03" strokeWidth="1.5" />

              {/* Remaches de la base */}
              <circle cx="39.5" cy="51" r="1.5" fill="#FEF08A" />
              <circle cx="39.5" cy="73" r="1.5" fill="#FEF08A" />
              <circle cx="60.5" cy="51" r="1.5" fill="#FEF08A" />
              <circle cx="60.5" cy="73" r="1.5" fill="#FEF08A" />

              {/* Bisagras laterales */}
              <rect x="15" y="42" width="4" height="8" rx="1.5" fill="url(#chestGold3d)" stroke="#451A03" strokeWidth="1" />
              <rect x="81" y="42" width="4" height="8" rx="1.5" fill="url(#chestGold3d)" stroke="#451A03" strokeWidth="1" />

              {/* Candado frontal */}
              {tapsRemaining > 0 && (
                <g>
                  <rect x="42" y="38" width="16" height="18" rx="4" fill="url(#chestGold3d)" stroke="#451A03" strokeWidth="2" />
                  <circle cx="50" cy="45" r="3" fill="#451A03" />
                  <polygon points="48.5,45 51.5,45 50.8,51 49.2,51" fill="#451A03" />
                  {/* Grietas de toques */}
                  {tapsRemaining <= 2 && (
                    <path d="M44 42 L48 46 L46 51" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                  )}
                  {tapsRemaining <= 1 && (
                    <path d="M56 42 L52 46 L54 52" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                  )}
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Indicador de Toques Restantes */}
        {tapsRemaining > 0 ? (
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FEF3C7',
                border: '1.5px solid #FCD34D',
                padding: '6px 14px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 900,
                color: '#B45309',
                marginBottom: '14px'
              }}
            >
              <Sparkles size={16} color="#D97706" />
              {tapsRemaining === 3 && 'Toca 3 veces para abrir la cerradura'}
              {tapsRemaining === 2 && '¡Crack! Faltan 2 toques'}
              {tapsRemaining === 1 && '¡Cerradura rota! 1 toque final'}
            </div>

            {/* Puntos de progreso de toques */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: tapsRemaining <= 2 ? '#F59E0B' : '#E2E8F0',
                  boxShadow: tapsRemaining <= 2 ? '0 0 6px #F59E0B' : 'none'
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: tapsRemaining <= 1 ? '#F59E0B' : '#E2E8F0',
                  boxShadow: tapsRemaining <= 1 ? '0 0 6px #F59E0B' : 'none'
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: tapsRemaining === 0 ? '#10B981' : '#E2E8F0',
                  boxShadow: tapsRemaining === 0 ? '0 0 6px #10B981' : 'none'
                }}
              />
            </div>
          </div>
        ) : (
          /* ═══ RECOMPENSAS: IDÉNTICAS A AJUSTES -> COMODINES (REQUERIMIENTO 10) ═══ */
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                marginBottom: '18px',
                marginTop: '6px'
              }}
            >
              {powerupRewardItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    border: '2px solid #E2E8F0',
                    boxShadow: '0 4px 0 #CBD5E1',
                    borderRadius: '18px',
                    padding: '14px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Token de Icono 3D (Exacto a Ajustes -> Comodines) */}
                  <div
                    style={{
                      width: '52px',
                      height: '48px',
                      borderRadius: '14px',
                      background: item.tokenBg,
                      border: `2px solid ${item.tokenBorder}`,
                      boxShadow: `0 4px 0 ${item.tokenShadow}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px'
                    }}
                  >
                    {item.icon}
                  </div>

                  <div
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 900,
                      color: '#1E293B',
                      marginBottom: '4px'
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      background: '#F1F5F9',
                      border: '1.5px solid #CBD5E1',
                      boxShadow: '0 2px 0 #94A3B8',
                      color: '#475569',
                      borderRadius: '999px',
                      padding: '2px 8px',
                      fontSize: '0.7rem',
                      fontWeight: 900,
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.badge}
                  </div>
                </div>
              ))}
            </div>

            {/* Botón Táctil 3D Duolingo para equipar y continuar */}
            <button
              className="btn-3d btn-green"
              onClick={handleClaim}
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Check size={20} strokeWidth={2.8} />
              <span>Equipar Botín y Continuar</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .chest-interactive-box.wobble {
          animation: chestWobble 0.35s ease-in-out;
        }
        .chest-interactive-box.shake {
          animation: chestShake 0.4s ease-in-out;
        }
        .chest-interactive-box.open {
          animation: chestPop 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes chestWobble {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-5deg) scale(1.05); }
          75% { transform: rotate(5deg) scale(1.05); }
        }
        @keyframes chestShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px) rotate(-3deg); }
          40% { transform: translateX(6px) rotate(3deg); }
          60% { transform: translateX(-4px) rotate(-2deg); }
          80% { transform: translateX(4px) rotate(2deg); }
        }
        @keyframes chestPop {
          0% { transform: scale(0.95); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
