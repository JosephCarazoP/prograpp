import React, { useEffect, useState } from 'react';
import { Flame, ShieldCheck, X, Share2, Check, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { storageService } from '../services/storageService';

interface StreakCelebrationModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  isJustCompleted?: boolean;
}

const TODAY_STREAK_SEEN_KEY = 'prograpp_streak_seen_';

/**
 * 1. Fueguito Duolingo 3D Oficial (100% Duolingo 3D / 0% IA).
 * Personaje de llama volumétrica con brillo plástico/vinilo, capas 3D,
 * ojos grandes expresivos con animación de parpadeo y mejillas sonrientes.
 */
const DuolingoFlame3D: React.FC<{ isIgniting?: boolean }> = ({ isIgniting = false }) => (
  <div className={`duo-flame-container ${isIgniting ? 'igniting-pop' : ''}`}>
    <svg
      viewBox="0 0 160 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="duo-flame-3d-character"
    >
      <defs>
        {/* Capa Exterior 3D: Naranja fuego vibrante Duolingo con bevel inferior */}
        <linearGradient id="duoFlameOuter" x1="80" y1="12" x2="80" y2="175" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9600" />
          <stop offset="35%" stopColor="#FF7A00" />
          <stop offset="70%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        {/* Capa Media 3D: Ámbar dorado brillante */}
        <linearGradient id="duoFlameMid" x1="80" y1="45" x2="80" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDE59" />
          <stop offset="45%" stopColor="#FFB703" />
          <stop offset="100%" stopColor="#FB8500" />
        </linearGradient>

        {/* Núcleo de Energía 3D: Amarillo canario cálido a blanco perlado */}
        <linearGradient id="duoFlameCore" x1="80" y1="85" x2="80" y2="152" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#FFF275" />
          <stop offset="100%" stopColor="#FFD124" />
        </linearGradient>

        {/* Reflejo Glossy Curvo 3D (Efecto vinilo / muñeco 3D Duolingo) */}
        <linearGradient id="duoFlameGloss" x1="38" y1="35" x2="75" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Sombra 3D en la base del personaje */}
        <radialGradient id="duoFlameGroundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B1317" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#0B1317" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0B1317" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Sombra de contacto en el piso 3D (se aplasta y estira al compás de la respiración) */}
      <ellipse cx="80" cy="180" rx="55" ry="9" fill="url(#duoFlameGroundShadow)" className="flame-ground-shadow" />

      {/* 2. Bisel 3D inferior (Base gruesa sólida con relieve Duolingo) */}
      <path
        d="M80 14 C83 40 102 56 116 72 C132 90 140 110 140 132 C140 162 113 176 80 176 C47 176 20 162 20 132 C20 110 28 90 44 72 C58 56 77 40 80 14 Z"
        fill="#9A3412"
      />

      {/* 3. Cuerpo de la llama principal (Forma curva de gota 3D oficial) */}
      <path
        d="M80 14 C83 40 102 56 116 72 C132 90 140 110 140 130 C140 158 113 172 80 172 C47 172 20 158 20 130 C20 110 28 90 44 72 C58 56 77 40 80 14 Z"
        fill="url(#duoFlameOuter)"
        stroke="#C2410C"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 4. Reflejo plástico glossy en la curva superior izquierda (Efecto vinilo 3D) */}
      <path
        d="M74 24 C70 42 55 58 45 74 C34 91 30 108 32 124 C28 112 30 96 39 80 C48 64 64 48 74 24 Z"
        fill="url(#duoFlameGloss)"
      />

      {/* 5. Destello de brillo adicional en la punta superior */}
      <ellipse cx="78" cy="30" rx="3.5" ry="8" transform="rotate(-15 78 30)" fill="#FFFFFF" fillOpacity="0.65" />

      {/* 6. Capa media dorada (Volumen 3D interior) */}
      <path
        d="M80 48 C84 66 98 78 108 90 C118 103 122 118 120 135 C116 153 100 162 80 162 C60 162 44 153 40 135 C38 118 42 103 52 90 C62 78 76 66 80 48 Z"
        fill="url(#duoFlameMid)"
        stroke="#EA580C"
        strokeWidth="2.5"
      />

      {/* 7. Núcleo amarillo cálido de alta energía */}
      <path
        d="M80 88 C83 98 92 106 97 114 C102 122 103 131 99 141 C94 150 87 153 80 153 C73 153 66 150 61 141 C57 131 58 122 63 114 C68 106 77 98 80 88 Z"
        fill="url(#duoFlameCore)"
      />

      {/* 8. CARITA DUOLINGO 3D TIERNA Y EXPRESIVA */}
      {/* Ojo Izquierdo 3D */}
      <g className="duo-eye duo-eye-left">
        <ellipse cx="66" cy="118" rx="6.5" ry="9" fill="#431407" />
        {/* Brillo ocular especular superior (Pupila) */}
        <circle cx="68.5" cy="115" r="2.8" fill="#FFFFFF" />
        {/* Micro-brillo inferior */}
        <circle cx="64" cy="122" r="1.3" fill="#FFFFFF" fillOpacity="0.8" />
      </g>

      {/* Ojo Derecho 3D */}
      <g className="duo-eye duo-eye-right">
        <ellipse cx="94" cy="118" rx="6.5" ry="9" fill="#431407" />
        {/* Brillo ocular especular superior (Pupila) */}
        <circle cx="96.5" cy="115" r="2.8" fill="#FFFFFF" />
        {/* Micro-brillo inferior */}
        <circle cx="92" cy="122" r="1.3" fill="#FFFFFF" fillOpacity="0.8" />
      </g>

      {/* Mejillas Sonrosadas 3D (Rosy Cheeks) */}
      <ellipse cx="54" cy="126" rx="5.5" ry="3.5" fill="#FB7185" fillOpacity="0.85" />
      <ellipse cx="106" cy="126" rx="5.5" ry="3.5" fill="#FB7185" fillOpacity="0.85" />

      {/* Sonrisa alegre abierta estilo Duolingo */}
      <path
        d="M72 128 Q80 138 88 128"
        stroke="#431407"
        strokeWidth="3.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Detalle interno de lengüita sonriente */}
      <path
        d="M75 130 C76 134 84 134 85 130 Z"
        fill="#F43F5E"
      />
    </svg>
  </div>
);

/**
 * 2. Fueguito Dormilón 3D para Racha 0 (100% Duolingo 3D / 0% IA).
 * Descansa sobre leños de fogata con relieve 3D, ojos curvados soñando,
 * burbujas flotantes de zZz y mejillas tiernas, listo para encenderse hoy.
 */
const DormantSleepingFlame3D: React.FC = () => (
  <div className="dormant-flame-wrapper">
    {/* Burbujas zZz animadas flotando al cielo */}
    <div className="zzz-bubble zzz-1">z</div>
    <div className="zzz-bubble zzz-2">Z</div>
    <div className="zzz-bubble zzz-3">Z</div>

    <svg
      viewBox="0 0 160 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dormant-flame-3d-svg"
    >
      <defs>
        {/* Degradado gris azulado frío de la llama dormida */}
        <linearGradient id="sleepyFlameOuter3D" x1="80" y1="20" x2="80" y2="155" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64748B" />
          <stop offset="60%" stopColor="#475569" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        <linearGradient id="sleepyFlameInner3D" x1="80" y1="55" x2="80" y2="145" gradientUnits="userSpaceOnUse">
          <stop stopColor="#94A3B8" />
          <stop offset="60%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Leños de madera en relieve 3D */}
        <linearGradient id="logWood3D" x1="20" y1="150" x2="140" y2="175" gradientUnits="userSpaceOnUse">
          <stop stopColor="#78350F" />
          <stop offset="50%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
      </defs>

      {/* Sombra base en el suelo */}
      <ellipse cx="80" cy="180" rx="55" ry="8" fill="#0B1317" fillOpacity="0.6" />

      {/* Leños de fogata 3D con corte transversal */}
      <g className="campfire-logs-3d">
        <rect x="24" y="152" width="112" height="18" rx="9" fill="url(#logWood3D)" stroke="#270F03" strokeWidth="2.5" />
        {/* Anillo de madera izquierdo */}
        <ellipse cx="32" cy="161" rx="6" ry="7" fill="#B45309" stroke="#451A03" strokeWidth="1.5" />
        <circle cx="32" cy="161" r="2.5" fill="#78350F" />
        {/* Anillo de madera derecho */}
        <ellipse cx="128" cy="161" rx="6" ry="7" fill="#B45309" stroke="#451A03" strokeWidth="1.5" />
      </g>

      {/* Bisel 3D inferior de la llama */}
      <path
        d="M80 25 C83 48 100 62 112 76 C126 94 132 112 132 132 C132 154 110 164 80 164 C50 164 28 154 28 132 C28 112 34 94 48 76 C60 62 77 48 80 25 Z"
        fill="#1E293B"
      />

      {/* Cuerpo principal dormido */}
      <path
        d="M80 25 C83 48 100 62 112 76 C126 94 132 112 132 130 C132 150 110 160 80 160 C50 160 28 150 28 130 C28 112 34 94 48 76 C60 62 77 48 80 25 Z"
        fill="url(#sleepyFlameOuter3D)"
        stroke="#1E293B"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* Capa interior tenue */}
      <path
        d="M80 60 C83 74 95 84 103 94 C110 104 112 115 110 128 C106 142 94 148 80 148 C66 148 54 142 50 128 C48 115 50 104 57 94 C65 84 77 74 80 60 Z"
        fill="url(#sleepyFlameInner3D)"
        stroke="#334155"
        strokeWidth="2"
      />

      {/* Ojos cerrados durmiendo plácidamente (- . -) */}
      <path d="M58 118 Q66 125 74 118" stroke="#CBD5E1" strokeWidth="3.8" strokeLinecap="round" fill="none" />
      <path d="M86 118 Q94 125 102 118" stroke="#CBD5E1" strokeWidth="3.8" strokeLinecap="round" fill="none" />

      {/* Mejillas sonrosadas tiernas */}
      <circle cx="52" cy="124" r="5" fill="#F472B6" fillOpacity="0.6" />
      <circle cx="108" cy="124" r="5" fill="#F472B6" fillOpacity="0.6" />

      {/* Boquita tranquila roncando suave */}
      <ellipse cx="80" cy="132" rx="4" ry="5.5" fill="#0F172A" />
    </svg>
  </div>
);

export const StreakCelebrationModal: React.FC<StreakCelebrationModalProps> = ({
  user,
  isOpen,
  onClose,
  isJustCompleted = false
}) => {
  const streakCount = user.streak?.count ?? 0;
  const isZeroStreak = streakCount === 0;
  const todayStr = new Date().toISOString().split('T')[0];
  const userKey = user?.uid || 'user';
  const seenKey = `${TODAY_STREAK_SEEN_KEY}${userKey}`;
  const lastSeenDate = storageService.getItem<string>(seenKey, '');
  const hasAlreadySeenToday = lastSeenDate === todayStr;

  // Si ya tiene racha > 0, ya la vio hoy y NO viene de terminar una lección en este instante:
  const isAlreadyClaimedMode = !isZeroStreak && hasAlreadySeenToday && !isJustCompleted;

  // Secuencia de animación en vivo
  const [animationPhase, setAnimationPhase] = useState<'jump' | 'ignite' | 'ready'>(
    isAlreadyClaimedMode ? 'ignite' : isZeroStreak ? 'ready' : 'jump'
  );

  const initialDisplay = isJustCompleted
    ? Math.max(0, streakCount - 1)
    : isZeroStreak
    ? 0
    : streakCount;
  const [displayCount, setDisplayCount] = useState<number>(initialDisplay);
  const [copied, setCopied] = useState<boolean>(false);

  // Días de la semana para el track semanal Duolingo
  const daysOfWeek = [
    { label: 'L', name: 'Lun', dayIndex: 1 },
    { label: 'M', name: 'Mar', dayIndex: 2 },
    { label: 'M', name: 'Mié', dayIndex: 3 },
    { label: 'J', name: 'Jue', dayIndex: 4 },
    { label: 'V', name: 'Vie', dayIndex: 5 },
    { label: 'S', name: 'Sáb', dayIndex: 6 },
    { label: 'D', name: 'Dom', dayIndex: 0 }
  ];

  const todayJsDay = new Date().getDay();
  const currentDayIndex = todayJsDay === 0 ? 6 : todayJsDay - 1;

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      return;
    }

    if (isZeroStreak) {
      setDisplayCount(0);
      setAnimationPhase('ready');
      soundService.playDormant();
      return;
    }

    if (isAlreadyClaimedMode) {
      setDisplayCount(streakCount);
      setAnimationPhase('ignite');
      soundService.playToken();
      return;
    }

    // Modo Celebración Activa (primera vez hoy o fin de lección)
    const targetStreak = streakCount;
    const startCount = isJustCompleted ? Math.max(0, targetStreak - 1) : targetStreak;

    setAnimationPhase('jump');
    setDisplayCount(startCount);

    // Grito alegre y júbilo "¡Yujuuu!"
    const timerYujuu = setTimeout(() => {
      soundService.playYujuu();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.35 },
        colors: ['#FF9600', '#FDE047', '#58CC02', '#38BDF8']
      });
    }, 350);

    // Ignición del fuego y conteo de la racha
    const timerIgnite = setTimeout(() => {
      setAnimationPhase('ignite');
      soundService.playStreak();

      confetti({
        particleCount: 100,
        spread: 95,
        origin: { y: 0.42 },
        colors: ['#FF7A00', '#FF9600', '#FDE047', '#FFA800', '#FFFFFF']
      });

      setDisplayCount(targetStreak);
      storageService.setItem(seenKey, todayStr);
    }, 1100);

    const timerReady = setTimeout(() => {
      setAnimationPhase('ready');
    }, 1700);

    return () => {
      clearTimeout(timerYujuu);
      clearTimeout(timerIgnite);
      clearTimeout(timerReady);
    };
  }, [isOpen, streakCount, isZeroStreak, isAlreadyClaimedMode, isJustCompleted, todayStr, seenKey]);

  if (!isOpen) return null;

  const handleShare = () => {
    soundService.playToken();
    const shareText = `🔥 ¡Llevo una racha de ${streakCount} ${streakCount === 1 ? 'día' : 'días'} programando en Prograpp!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div
      className="streak-fullscreen-screen"
      role="dialog"
      aria-modal="true"
      aria-label="Celebración de Racha en Pantalla Completa"
    >
      <style>{`
        .streak-fullscreen-screen,
        .streak-fullscreen-screen * {
          font-family: 'Nunito', sans-serif !important;
          box-sizing: border-box;
        }

        .streak-fullscreen-screen {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          max-height: 100dvh;
          z-index: 999999;
          background: #131F24;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: clamp(12px, 2vh, 22px) 16px clamp(14px, 2.4vh, 24px);
          color: #FFFFFF;
          overflow-y: auto;
          overflow-x: hidden;
          animation: streakScreenFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes streakScreenFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Botón de cierre superior 3D */
        .streak-top-close-btn {
          position: absolute;
          top: clamp(12px, 2vh, 18px);
          right: clamp(14px, 2.5vw, 20px);
          background: #202F36;
          border: 2px solid #37464F;
          border-bottom: 3.5px solid #182329;
          border-radius: 14px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #AFAFAF;
          cursor: pointer;
          z-index: 100;
          transition: transform 0.1s ease, color 0.1s ease;
        }
        .streak-top-close-btn:hover {
          color: #FFFFFF;
          transform: translateY(-1px);
        }
        .streak-top-close-btn:active {
          transform: translateY(2px);
          border-bottom-width: 2px;
        }

        /* Resplandor ambiental de fuego cálido */
        .streak-fire-ambient-glow {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: min(380px, 90vw);
          height: min(380px, 90vw);
          background: radial-gradient(circle, rgba(255, 122, 0, 0.28) 0%, rgba(234, 88, 12, 0.12) 45%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        /* Chispas flotantes que suben suavemente */
        .streak-ambient-spark {
          position: absolute;
          width: 7px;
          height: 7px;
          background: #FFD23F;
          border-radius: 50%;
          box-shadow: 0 0 10px #FF7A00;
          pointer-events: none;
          animation: sparkFloatUp 2.8s ease-in infinite;
        }
        @keyframes sparkFloatUp {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-140px) scale(1.3); opacity: 0; }
        }

        /* Contenedor central del escenario */
        .streak-stage-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 420px;
          flex: 1;
          min-height: 0;
          margin: 0 auto;
          z-index: 10;
        }

        /* ─── ESCENARIO HERO DEL FUEGUITO DUOLINGO 3D ─── */
        .streak-flame-hero-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: clamp(140px, 24vh, 185px);
          margin-bottom: 6px;
        }

        .duo-flame-container {
          position: relative;
          width: clamp(130px, 32vw, 160px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .duo-flame-3d-character {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 12px 24px rgba(255, 122, 0, 0.45));
          animation: flameIdleBounce 2s ease-in-out infinite alternate;
          transform-origin: 50% 90%;
        }

        @keyframes flameIdleBounce {
          0% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.04, 0.97) translateY(-6px); }
          100% { transform: scale(0.98, 1.02) translateY(0); }
        }

        /* Animación de Parpadeo de Ojos Duolingo */
        .duo-eye {
          animation: duoBlink 3.8s infinite;
          transform-origin: 50% 118px;
        }
        @keyframes duoBlink {
          0%, 46%, 50%, 100% { transform: scaleY(1); }
          48% { transform: scaleY(0.08); }
        }

        /* Explosión de Ignición */
        .igniting-pop {
          animation: flameIgnitePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes flameIgnitePop {
          0% { transform: scale(0.4); opacity: 0; }
          70% { transform: scale(1.18); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Sombra de suelo que responde al rebote */
        .flame-ground-shadow {
          animation: shadowPulse 2s ease-in-out infinite alternate;
          transform-origin: 80px 180px;
        }
        @keyframes shadowPulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(0.85); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0.8; }
        }

        /* ─── DORMANT FLAME (DÍA 0) ─── */
        .dormant-flame-wrapper {
          position: relative;
          width: clamp(125px, 30vw, 150px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dormant-flame-3d-svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: dormantGentleBreathe 3s ease-in-out infinite alternate;
          transform-origin: 50% 85%;
        }
        @keyframes dormantGentleBreathe {
          0% { transform: scale(1); }
          100% { transform: scale(1.03, 0.97); }
        }

        .zzz-bubble {
          position: absolute;
          color: #94A3B8;
          font-weight: 900;
          pointer-events: none;
          animation: zFloatUp 2.5s ease-in-out infinite;
        }
        .zzz-1 { top: 22px; right: 18px; font-size: 0.95rem; animation-delay: 0s; }
        .zzz-2 { top: 6px; right: 8px; font-size: 1.15rem; animation-delay: 0.8s; }
        .zzz-3 { top: -10px; right: -2px; font-size: 1.4rem; animation-delay: 1.6s; }

        @keyframes zFloatUp {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          40% { opacity: 0.85; }
          100% { transform: translate(16px, -22px) scale(1.15); opacity: 0; }
        }

        /* ─── CONTEO GIGANTE Y TÍTULOS 100% DUOLINGO ─── */
        .streak-giant-count-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .streak-giant-number {
          font-size: clamp(3.2rem, 9.5vw, 4.2rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: #FF9600;
          text-shadow: 0 4.5px 0 #C2410C;
          margin: 0;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .streak-giant-number.zero {
          color: #94A3B8;
          text-shadow: 0 4.5px 0 #475569;
        }

        .streak-giant-title {
          font-size: clamp(1.2rem, 3.8vw, 1.45rem);
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #FFFFFF;
          margin: 4px 0 2px;
          text-align: center;
        }

        .streak-subtitle-desc {
          font-size: clamp(0.78rem, 2.4vw, 0.88rem);
          color: #AFAFAF;
          font-weight: 700;
          text-align: center;
          max-width: 330px;
          line-height: 1.35;
          margin: 0 0 10px;
        }

        /* ─── TARJETA DUOLINGO 3D: RASTREADOR SEMANAL (7 DÍAS) ─── */
        .duo-weekly-card-3d {
          width: 100%;
          max-width: 380px;
          background: #182830;
          border: 2px solid #2B3D47;
          border-bottom: 4.5px solid #142027;
          border-radius: 20px;
          padding: 12px 10px 10px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
        }

        .duo-day-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex: 1;
        }

        .duo-day-label {
          font-size: clamp(0.68rem, 2vw, 0.76rem);
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #AFAFAF;
        }
        .duo-day-label.today {
          color: #FF9600;
        }

        .duo-day-coin-3d {
          width: clamp(32px, 8.8vw, 38px);
          height: clamp(32px, 8.8vw, 38px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.82rem;
          font-weight: 900;
          transition: transform 0.2s ease;
        }

        /* Moneda de Racha Activa Hoy (Celebración dorada pulsante) */
        .coin-ignited-today {
          background: linear-gradient(180deg, #FFC800 0%, #FF8200 100%);
          border: 2px solid #FFF7ED;
          box-shadow: 0 3.5px 0 #C2410C, 0 0 16px rgba(255, 150, 0, 0.7);
          color: #FFFFFF;
          transform: scale(1.1);
        }

        /* Moneda de Racha Pasada Activa */
        .coin-active-past {
          background: linear-gradient(180deg, #FF9600 0%, #EA580C 100%);
          border: 2px solid #FED7AA;
          box-shadow: 0 3px 0 #9A3412;
          color: #FFFFFF;
        }

        /* Moneda Hoy Pendiente (Día 0 o lección aún no completada) */
        .coin-today-pending {
          background: #202F36;
          border: 2px dashed #FF9600;
          box-shadow: 0 3px 0 #182329;
          color: #FF9600;
          animation: coinPulse 1.8s ease-in-out infinite;
        }
        @keyframes coinPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); box-shadow: 0 0 12px rgba(255, 150, 0, 0.5); }
        }

        /* Moneda Inactiva / Días Futuros */
        .coin-inactive {
          background: #202F36;
          border: 2px solid #2F3E46;
          box-shadow: 0 2.5px 0 #182329;
          color: #64748B;
        }

        /* ─── TARJETA PROTECTOR DE RACHA / STREAK FREEZE DUOLINGO 3D ─── */
        .duo-freeze-pill-3d {
          width: 100%;
          max-width: 380px;
          background: #182830;
          border: 2px solid #2B3D47;
          border-bottom: 4px solid #142027;
          border-radius: 16px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .duo-freeze-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: #1CB0F6;
          border: 1.5px solid #70CFF8;
          box-shadow: 0 2.5px 0 #1899D6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .duo-freeze-info {
          display: flex;
          flex-direction: column;
          text-align: left;
          line-height: 1.25;
        }

        .duo-freeze-title {
          font-size: 0.8rem;
          font-weight: 900;
          color: #E2E8F0;
        }

        .duo-freeze-sub {
          font-size: 0.68rem;
          font-weight: 700;
          color: #8E8E93;
        }

        /* ─── BOTONES DUOLINGO 3D AUTÉNTICOS ─── */
        .streak-bottom-actions {
          width: 100%;
          max-width: 380px;
          display: flex;
          gap: 10px;
          z-index: 10;
          margin-top: 4px;
        }

        .btn-duo-share-3d {
          width: 52px;
          height: 52px;
          background: #202F36;
          border: 2px solid #37464F;
          border-bottom: 4.5px solid #182329;
          border-radius: 16px;
          color: #FF9600;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.08s ease, border-bottom-width 0.08s ease;
        }
        .btn-duo-share-3d:active {
          transform: translateY(2.5px);
          border-bottom-width: 2px;
        }

        .btn-duo-green-3d {
          flex: 1;
          height: 52px;
          background: #58CC02;
          border: 2px solid #58CC02;
          border-bottom: 5px solid #46A302;
          border-radius: 16px;
          color: #FFFFFF;
          font-size: clamp(0.95rem, 3.2vw, 1.05rem);
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.08s ease, border-bottom-width 0.08s ease;
        }
        .btn-duo-green-3d:hover {
          filter: brightness(1.04);
        }
        .btn-duo-green-3d:active {
          transform: translateY(3px);
          border-bottom-width: 2px;
        }
      `}</style>

      {/* Botón X superior derecho para cerrar */}
      <button
        onClick={() => {
          soundService.playToken();
          onClose();
        }}
        className="streak-top-close-btn"
        title="Cerrar"
        type="button"
        aria-label="Cerrar pantalla de racha"
      >
        <X size={20} strokeWidth={2.8} />
      </button>

      {/* Resplandor ambiental cálido de fueguito encendido */}
      {!isZeroStreak && (
        <>
          <div
            className="streak-fire-ambient-glow"
            style={{
              opacity: animationPhase !== 'jump' ? 1 : 0.45,
              transform: `translateX(-50%) scale(${animationPhase !== 'jump' ? '1.08' : '0.88'})`
            }}
          />
          <div className="streak-ambient-spark" style={{ left: '22%', bottom: '38%', animationDelay: '0s' }} />
          <div className="streak-ambient-spark" style={{ left: '76%', bottom: '42%', animationDelay: '0.9s' }} />
          <div className="streak-ambient-spark" style={{ left: '50%', bottom: '32%', animationDelay: '1.7s' }} />
        </>
      )}

      {/* ════ ESCENARIO CENTRAL DUOLINGO 3D ════ */}
      <div className="streak-stage-center">
        {/* ESCENARIO HERO DEL FUEGUITO 3D */}
        <div className="streak-flame-hero-stage">
          {isZeroStreak ? (
            <DormantSleepingFlame3D />
          ) : (
            <DuolingoFlame3D isIgniting={animationPhase === 'ignite'} />
          )}
        </div>

        {/* ═══ CONTEO GIGANTE Y TÍTULOS ═══ */}
        <div className="streak-giant-count-box">
          <div className={`streak-giant-number ${isZeroStreak ? 'zero' : ''}`}>
            <span>{displayCount}</span>
            <span style={{ fontSize: '0.45em', opacity: 0.9 }}>🔥</span>
          </div>

          <h1 className="streak-giant-title">
            {isZeroStreak
              ? 'Día 0 de Racha'
              : displayCount === 1
              ? '1 Día de Racha'
              : `${displayCount} Días de Racha`}
          </h1>

          <p className="streak-subtitle-desc">
            {isZeroStreak
              ? 'Tu chispa aún duerme. Completa 1 lección hoy para encenderla y vuelve mañana para activar tu racha.'
              : isAlreadyClaimedMode
              ? `¡Ya practicaste hoy! Vuelve mañana para sumar tu día ${streakCount + 1}.`
              : displayCount === 1
              ? '¡Excelente inicio! La constancia es el secreto para convertirte en gran programador.'
              : '¡La llama sigue viva! Cada día que programas refuerzas tu lógica y confianza.'}
          </p>
        </div>

        {/* ═══ TARJETA 3D: RASTREADOR SEMANAL (L a D) ═══ */}
        <div className="duo-weekly-card-3d">
          {daysOfWeek.map((day, idx) => {
            const isToday = idx === currentDayIndex;
            const isPast = idx < currentDayIndex;
            const hasPracticedToday = user.streak?.lastActivityDate === todayStr && (user.streak?.count || 0) > 0;
            const isTodayIgnited = isToday && (isAlreadyClaimedMode || (isJustCompleted ? animationPhase !== 'jump' : hasPracticedToday));
            const isPastActive = isPast && streakCount > (currentDayIndex - idx);
            const isActive = isPastActive || isTodayIgnited;

            let coinClass = 'coin-inactive';
            if (isZeroStreak && isToday) {
              coinClass = 'coin-today-pending';
            } else if (isTodayIgnited) {
              coinClass = 'coin-ignited-today';
            } else if (isToday && !isTodayIgnited) {
              coinClass = 'coin-today-pending';
            } else if (isActive) {
              coinClass = 'coin-active-past';
            }

            return (
              <div key={day.name} className="duo-day-col">
                <span className={`duo-day-label ${isToday ? 'today' : ''}`}>
                  {isToday ? 'Hoy' : day.label}
                </span>
                <div className={`duo-day-coin-3d ${coinClass}`}>
                  {isActive ? (
                    <Flame size={18} fill="#FFFFFF" color="#FFFFFF" />
                  ) : isZeroStreak && isToday ? (
                    <Sparkles size={16} color="#FF9600" />
                  ) : (
                    <span>{day.label}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══ TARJETA 3D: PROTECTOR DE RACHA (STREAK FREEZE) ═══ */}
        <div className="duo-freeze-pill-3d">
          <div className="duo-freeze-icon-box">
            <ShieldCheck size={18} color="#FFFFFF" strokeWidth={2.8} />
          </div>
          <div className="duo-freeze-info">
            <span className="duo-freeze-title">
              {user.streak?.freezeEquipped ? 'Protector de Racha Activo' : 'Sin Protector Equipado'}
            </span>
            <span className="duo-freeze-sub">
              {user.streak?.freezeEquipped
                ? 'Te salvará 1 día si olvidas practicar sin perder tu racha.'
                : 'Disponible en la Tienda con tus Bytes acumulados.'}
            </span>
          </div>
        </div>
      </div>

      {/* ═══ BOTONES INFERIORES 100% DUOLINGO 3D ═══ */}
      <div className="streak-bottom-actions">
        {!isZeroStreak && (
          <button
            className="btn-duo-share-3d"
            onClick={handleShare}
            title="Compartir Racha"
            type="button"
            aria-label="Compartir Racha"
          >
            {copied ? <Check size={20} color="#22C55E" strokeWidth={3} /> : <Share2 size={20} strokeWidth={2.6} />}
          </button>
        )}

        <button
          className="btn-duo-green-3d"
          onClick={() => {
            soundService.playToken();
            onClose();
          }}
          type="button"
        >
          {isZeroStreak ? (
            <>
              <span>¡A JUGAR AHORA!</span>
              <ArrowRight size={20} strokeWidth={3} />
            </>
          ) : isAlreadyClaimedMode ? (
            '¡ENTENDIDO!'
          ) : (
            '¡CONTINUAR!'
          )}
        </button>
      </div>
    </div>
  );
};
