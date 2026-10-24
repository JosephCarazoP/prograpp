import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Check,
  GraduationCap,
  EyeOff,
  ShieldCheck,
  Code2,
  Award,
  X,
  Hand
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../services/soundService';
import { ProgressionChestRewards } from '../services/progressionEngine';

export type ChestRewardPayload = ProgressionChestRewards;

interface ChestModalProps {
  isOpen: boolean;
  chestId: string;
  rewards?: ProgressionChestRewards;
  onClose: () => void;
  onClaim: (chestId: string, rewards: ProgressionChestRewards) => void;
}

// Texto tipo cómic que aparece con cada toque (Neo-brutalism)
const IMPACT_WORDS: Record<number, { text: string; bg: string; rot: number }> = {
  2: { text: '¡TOC!', bg: '#38BDF8', rot: -8 },
  1: { text: '¡CRACK!', bg: '#FF6B6B', rot: 7 },
  0: { text: '¡BOOM!', bg: '#FFE600', rot: -5 }
};

export const ChestModal: React.FC<ChestModalProps> = ({
  isOpen,
  chestId,
  rewards = {
    bytes: 40,
    xp: 30,
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
      soundService.playChestTap1();
      setAnimState('wobble');
      setTapsRemaining(2);
      animTimerRef.current = setTimeout(() => setAnimState('idle'), 420);
    } else if (tapsRemaining === 2) {
      soundService.playChestTap2();
      setAnimState('shake');
      setTapsRemaining(1);
      animTimerRef.current = setTimeout(() => setAnimState('idle'), 500);
    } else if (tapsRemaining === 1) {
      soundService.playChestBurst();
      setAnimState('open');
      setTapsRemaining(0);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#FFE600', '#FF6B6B', '#38BDF8', '#4ADE80', '#C084FC', '#000000']
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

  // Recompensas como "stickers" Neo-brutalistas
  const powerupRewardItems: {
    id: string;
    title: string;
    badge: string;
    tokenBg: string;
    icon: React.ReactNode;
  }[] = [];

  if (rewards.powerups?.teacherHint && rewards.powerups.teacherHint > 0) {
    powerupRewardItems.push({
      id: 'hint',
      title: 'Profesor',
      badge: `+${rewards.powerups.teacherHint} PISTA`,
      tokenBg: '#38BDF8',
      icon: <GraduationCap size={24} color="#000000" strokeWidth={2.4} />
    });
  }

  if (rewards.powerups?.eliminateOptions && rewards.powerups.eliminateOptions > 0) {
    powerupRewardItems.push({
      id: '5050',
      title: '50 / 50',
      badge: `+${rewards.powerups.eliminateOptions} DESCARTE`,
      tokenBg: '#FB923C',
      icon: <EyeOff size={24} color="#000000" strokeWidth={2.4} />
    });
  }

  if (rewards.powerups?.secondChance && rewards.powerups.secondChance > 0) {
    powerupRewardItems.push({
      id: 'shield',
      title: 'Escudo',
      badge: `+${rewards.powerups.secondChance} CHANCE`,
      tokenBg: '#4ADE80',
      icon: <ShieldCheck size={24} color="#000000" strokeWidth={2.4} />
    });
  }

  if (rewards.powerups?.codePeek && rewards.powerups.codePeek > 0) {
    powerupRewardItems.push({
      id: 'code',
      title: 'Pista Código',
      badge: `+${rewards.powerups.codePeek} SINTAXIS`,
      tokenBg: '#C084FC',
      icon: <Code2 size={24} color="#000000" strokeWidth={2.4} />
    });
  }

  if (rewards.bytes && rewards.bytes > 0) {
    powerupRewardItems.push({
      id: 'bytes',
      title: 'Bytes',
      badge: `+${rewards.bytes} BYTES`,
      tokenBg: '#22D3EE',
      icon: <Sparkles size={24} color="#000000" strokeWidth={2.4} />
    });
  }

  if (rewards.xp && rewards.xp > 0) {
    powerupRewardItems.push({
      id: 'xp',
      title: 'Experiencia',
      badge: `+${rewards.xp} XP`,
      tokenBg: '#FFE600',
      icon: <Award size={24} color="#000000" strokeWidth={2.4} />
    });
  }

  const isOpened = tapsRemaining === 0;
  const impact = tapsRemaining < 3 ? IMPACT_WORDS[tapsRemaining] : null;

  return (
    <div className="nb-chest-backdrop" onClick={isOpened ? handleClaim : undefined}>
      <div
        className="nb-chest-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Abrir cofre del camino"
      >
        {/* Botón cerrar si aún no se ha abierto */}
        {!isOpened && (
          <button
            type="button"
            id="chest-close-btn"
            className="nb-chest-close-btn"
            onClick={onClose}
            title="Cerrar"
          >
            <X size={18} strokeWidth={3} />
          </button>
        )}

        {/* Encabezado */}
        <div className="nb-chest-header">
          <span className={`nb-chest-sticker ${isOpened ? 'is-opened' : ''}`}>
            {isOpened ? '¡Cofre Abierto!' : 'Cofre del Camino'}
          </span>
          <h2 className="nb-chest-title">
            {isOpened ? '¡Botín Obtenido!' : '¡Toca para Abrir!'}
          </h2>
          <p className="nb-chest-subtitle">
            {isOpened
              ? 'Los comodines se han añadido a tu inventario'
              : 'Toca el cofre para romper la cerradura'}
          </p>
        </div>

        {/* Escenario interactivo del cofre */}
        <div
          id="chest-tap-zone"
          className={`nb-chest-stage ${isOpened ? 'is-opened' : ''}`}
          onClick={handleChestTap}
        >
          {/* Rayos de explosión al abrir */}
          {isOpened && <div className="nb-chest-burst" aria-hidden="true" />}

          {/* Onomatopeya tipo cómic por cada toque */}
          {impact && (
            <span
              key={`impact-${tapsRemaining}`}
              className="nb-chest-impact"
              style={{ background: impact.bg, ['--nb-rot' as string]: `${impact.rot}deg` } as React.CSSProperties}
              aria-hidden="true"
            >
              {impact.text}
            </span>
          )}

          {/* Indicación de toque */}
          {tapsRemaining === 3 && (
            <span className="nb-chest-tap-hint" aria-hidden="true">
              <Hand size={18} color="#000000" strokeWidth={2.6} />
            </span>
          )}

          <div className={`nb-chest-box ${animState}`}>
            <svg width="132" height="132" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Interior del cofre abierto con botín saliendo */}
              {isOpened && (
                <g>
                  <path d="M20 46 L80 46 L76 40 L24 40 Z" fill="#7C2D12" stroke="#000000" strokeWidth="2.6" strokeLinejoin="round" />
                  <g className="nb-chest-loot nb-loot-1">
                    <circle cx="38" cy="38" r="6" fill="#FFE600" stroke="#000000" strokeWidth="2.2" />
                    <path d="M36 36 L36 40" stroke="#000000" strokeWidth="1.6" strokeLinecap="round" />
                  </g>
                  <g className="nb-chest-loot nb-loot-2">
                    <polygon points="50,24 57,33 50,42 43,33" fill="#38BDF8" stroke="#000000" strokeWidth="2.2" strokeLinejoin="round" />
                    <path d="M50 24 L50 42" stroke="#000000" strokeWidth="1.2" />
                  </g>
                  <g className="nb-chest-loot nb-loot-3">
                    <circle cx="63" cy="37" r="6.5" fill="#FFE600" stroke="#000000" strokeWidth="2.2" />
                    <path d="M61 35 L61 39" stroke="#000000" strokeWidth="1.6" strokeLinecap="round" />
                  </g>
                  <g className="nb-chest-loot nb-loot-4">
                    <polygon points="28,40 32,35 36,40 32,44" fill="#4ADE80" stroke="#000000" strokeWidth="1.8" strokeLinejoin="round" />
                  </g>
                </g>
              )}

              {/* Tapa del cofre */}
              <g className={`nb-chest-lid ${isOpened ? 'is-open' : ''}`}>
                <path d="M16 46 C16 26, 84 26, 84 46 Z" fill="#FB923C" stroke="#000000" strokeWidth="3" strokeLinejoin="round" />
                <path d="M24 37 C32 31, 68 31, 76 37" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                <rect x="34" y="29" width="10" height="17" fill="#FFE600" stroke="#000000" strokeWidth="2.4" />
                <rect x="56" y="29" width="10" height="17" fill="#FFE600" stroke="#000000" strokeWidth="2.4" />
              </g>

              {/* Base del cofre */}
              <rect x="18" y="46" width="64" height="38" rx="6" fill="#F97316" stroke="#000000" strokeWidth="3" />
              <path d="M18 60 L82 60" stroke="#000000" strokeWidth="2" />
              <rect x="34" y="46" width="10" height="38" fill="#FFE600" stroke="#000000" strokeWidth="2.4" />
              <rect x="56" y="46" width="10" height="38" fill="#FFE600" stroke="#000000" strokeWidth="2.4" />

              {/* Remaches */}
              <circle cx="39" cy="53" r="1.8" fill="#000000" />
              <circle cx="39" cy="76" r="1.8" fill="#000000" />
              <circle cx="61" cy="53" r="1.8" fill="#000000" />
              <circle cx="61" cy="76" r="1.8" fill="#000000" />

              {/* Candado frontal */}
              {!isOpened && (
                <g className={tapsRemaining <= 1 ? 'nb-chest-lock-loose' : ''}>
                  <rect x="41" y="39" width="18" height="19" rx="4" fill="#FFE600" stroke="#000000" strokeWidth="2.8" />
                  <circle cx="50" cy="46.5" r="3" fill="#000000" />
                  <polygon points="48.5,47 51.5,47 50.8,53 49.2,53" fill="#000000" />
                  {/* Grietas por toque */}
                  {tapsRemaining <= 2 && (
                    <path d="M43.5 41.5 L47.5 46 L45 51" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                  {tapsRemaining <= 1 && (
                    <path d="M56.5 41.5 L52.5 46 L55 52.5" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Indicador de toques restantes */}
        {!isOpened ? (
          <div>
            <div className="nb-chest-hint-pill">
              <Sparkles size={16} color="#000000" strokeWidth={2.6} />
              <span>
                {tapsRemaining === 3 && 'Toca 3 veces para abrir la cerradura'}
                {tapsRemaining === 2 && '¡Crack! Faltan 2 toques'}
                {tapsRemaining === 1 && '¡Cerradura rota! 1 toque final'}
              </span>
            </div>

            {/* Bloques de progreso de toques */}
            <div className="nb-chest-progress" aria-label={`Toques restantes: ${tapsRemaining}`}>
              {[2, 1, 0].map((threshold) => (
                <span
                  key={threshold}
                  className={`nb-chest-progress-block ${tapsRemaining <= threshold ? 'is-filled' : ''} ${threshold === 0 ? 'is-final' : ''}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="nb-chest-rewards-grid">
              {powerupRewardItems.map((item, index) => (
                <div
                  key={item.id}
                  className="nb-chest-reward-card"
                  style={{ animationDelay: `${180 + index * 80}ms` }}
                >
                  <div className="nb-chest-reward-token" style={{ background: item.tokenBg }}>
                    {item.icon}
                  </div>
                  <div className="nb-chest-reward-title">{item.title}</div>
                  <div className="nb-chest-reward-badge">{item.badge}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              id="chest-claim-btn"
              className="nb-chest-claim-btn"
              onClick={handleClaim}
              style={{ animationDelay: `${220 + powerupRewardItems.length * 80}ms` }}
            >
              <Check size={20} strokeWidth={3} />
              <span>Equipar Botín y Continuar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
