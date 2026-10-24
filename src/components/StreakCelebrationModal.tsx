import React, { useEffect, useState, useMemo } from 'react';
import { Flame, ShieldCheck, X, Share2, Check, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types/user';
import { Lesson } from '../types/lesson';
import { soundService } from '../services/soundService';
import { storageService } from '../services/storageService';

interface StreakCelebrationModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  isJustCompleted?: boolean;
  nextLesson?: Lesson | null;
  onAdvanceNextLesson?: () => void;
}

const TODAY_STREAK_SEEN_KEY = 'prograpp_streak_seen_';

const SPANISH_DAYS_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const SPANISH_DAYS_LETTER = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

function getLocalDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 16-point comic starburst polygon vertices
const STARBURST_POINTS = Array.from({ length: 32 }, (_, i) => {
  const angle = (i * Math.PI) / 16 - Math.PI / 2;
  const r = i % 2 === 0 ? 98 : 72;
  const x = Math.round((100 + r * Math.cos(angle)) * 10) / 10;
  const y = Math.round((100 + r * Math.sin(angle)) * 10) / 10;
  return `${x},${y}`;
}).join(' ');

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * FUEGUITO NEO-BRUTALISM OFICIAL PROGRAPP (100% Vector Comic Neo-brutalism)
 * ═════════════════════════════════════════════════════════════════════════════
 * Contornos negros sólidos gruesos (stroke 4px), paleta vibrante de alto
 * impacto (Naranja Eléctrico, Amarillo Canario), brazos celebrando en alto,
 * ojos comic expresivos y sombra sólida de contacto.
 */
const NeoBrutalFlame: React.FC<{ isIgniting?: boolean }> = ({ isIgniting = false }) => (
  <div className={`neo-flame-wrapper ${isIgniting ? 'ignite-pop' : ''}`}>
    <svg
      viewBox="0 0 190 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="neo-flame-svg"
      aria-label="Fueguito de Racha Neo-brutalism"
    >
      {/* 1. Sombra de contacto en el piso estilo neo-brutal (sólido negro animado) */}
      <ellipse cx="95" cy="195" rx="55" ry="8" fill="#000000" className="flame-ground-shadow" />

      {/* 2. Brazos Festivos Celebrando en Alto ("\o/") */}
      <g className="neo-flame-arms">
        {/* Brazo Izquierdo */}
        <path
          d="M 44 126 C 28 120 18 106 20 92 C 24 78 38 88 44 104 C 47 112 46 122 44 126 Z"
          fill="#FF8500"
          stroke="#000000"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        {/* Mano izquierda */}
        <circle cx="21" cy="91" r="5.5" fill="#FFE600" stroke="#000000" strokeWidth="3" />

        {/* Brazo Derecho */}
        <path
          d="M 146 126 C 162 120 172 106 170 92 C 166 78 152 88 146 104 C 143 112 144 122 146 126 Z"
          fill="#FF8500"
          stroke="#000000"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        {/* Mano derecha */}
        <circle cx="169" cy="91" r="5.5" fill="#FFE600" stroke="#000000" strokeWidth="3" />
      </g>

      {/* 3. Sombra de profundidad sólida inferior estilo Neo-brutalism */}
      <path
        d="M 95 18 C 101 44 122 60 138 80 C 156 102 165 124 165 152 C 165 184 133 196 95 196 C 57 196 25 184 25 152 C 25 124 34 102 52 80 C 68 60 89 44 95 18 Z"
        fill="#000000"
      />

      {/* 4. Cuerpo Principal de la Llama (Naranja Eléctrico Neo-brutalism con contorno negro) */}
      <path
        d="M 95 18 C 101 44 122 60 138 80 C 156 102 165 124 165 146 C 165 178 133 190 95 190 C 57 190 25 178 25 146 C 25 124 34 102 52 80 C 68 60 89 44 95 18 Z"
        fill="#FF5722"
        stroke="#000000"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 5. Núcleo/Vientre de Fuego Amarillo Canario con Contorno Negro */}
      <path
        d="M 95 72 C 103 92 122 108 126 126 C 130 144 124 168 95 168 C 66 168 60 144 64 126 C 68 108 87 92 95 72 Z"
        fill="#FFE600"
        stroke="#000000"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* 6. Reflejo Comic Blanco en el hombro */}
      <path
        d="M 87 28 C 80 48 64 68 52 86 C 42 102 38 120 40 132 C 35 122 36 106 46 90 C 57 74 76 52 87 28 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* 7. Destello de Chispa Blanca */}
      <ellipse cx="93" cy="34" rx="4" ry="9" transform="rotate(-16 93 34)" fill="#FFFFFF" />

      {/* 8. CARITA NEO-BRUTALISM — EXPRESIVA, VIBRANTE Y PUNCHY */}
      {/* Cejas Marcadas */}
      <path d="M 67 105 Q 77 98 86 105" stroke="#000000" strokeWidth="4.2" strokeLinecap="round" fill="none" />
      <path d="M 104 105 Q 113 98 123 105" stroke="#000000" strokeWidth="4.2" strokeLinecap="round" fill="none" />

      {/* Ojo Izquierdo */}
      <g className="neo-eye neo-eye-left">
        <ellipse cx="77" cy="122" rx="8" ry="12" fill="#000000" />
        <circle cx="80" cy="118.5" r="3.6" fill="#FFFFFF" />
        <circle cx="74.5" cy="126.5" r="1.6" fill="#FFFFFF" />
      </g>

      {/* Ojo Derecho */}
      <g className="neo-eye neo-eye-right">
        <ellipse cx="113" cy="122" rx="8" ry="12" fill="#000000" />
        <circle cx="116" cy="118.5" r="3.6" fill="#FFFFFF" />
        <circle cx="110.5" cy="126.5" r="1.6" fill="#FFFFFF" />
      </g>

      {/* Mejillas Sonrosadas Comic */}
      <ellipse cx="61" cy="132" rx="7.2" ry="5.2" fill="#FF3366" stroke="#000000" strokeWidth="2.2" />
      <ellipse cx="129" cy="132" rx="7.2" ry="5.2" fill="#FF3366" stroke="#000000" strokeWidth="2.2" />

      {/* Sonrisa Alegre Abierta */}
      <path
        d="M 83 131 C 83 148 107 148 107 131 Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      {/* Lengüita Rosa */}
      <path
        d="M 87 138 C 90 144 100 144 103 138 C 101 135 89 135 87 138 Z"
        fill="#FF4572"
        stroke="#000000"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * FUEGUITO DORMILÓN NEO-BRUTALISM PARA RACHA 0
 * ═════════════════════════════════════════════════════════════════════════════
 * Tono slate frío con borde negro sólido de 4px, leños rústicos con bordes
 * negros y badges estilo comic "Zzz" flotantes.
 */
const NeoBrutalDormantFlame: React.FC = () => (
  <div className="dormant-flame-wrapper">
    {/* Badges Flotantes Comic zZz Neo-brutalism */}
    <div className="neo-zzz-badge zzz-1">z</div>
    <div className="neo-zzz-badge zzz-2">Z</div>
    <div className="neo-zzz-badge zzz-3">Z</div>

    <svg
      viewBox="0 0 190 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dormant-flame-svg"
      aria-label="Fueguito Dormilón Racha 0 Neo-brutalism"
    >
      {/* Sombra base sólida */}
      <ellipse cx="95" cy="195" rx="55" ry="8" fill="#000000" />

      {/* Leños de fogata con bordes negros */}
      <g className="campfire-logs-neo">
        <rect x="30" y="162" width="130" height="20" rx="10" fill="#92400E" stroke="#000000" strokeWidth="3.5" />
        {/* Anillo de madera izquierdo */}
        <ellipse cx="40" cy="172" rx="7" ry="8" fill="#D97706" stroke="#000000" strokeWidth="2.2" />
        <circle cx="40" cy="172" r="3" fill="#78350F" />
        {/* Anillo de madera derecho */}
        <ellipse cx="150" cy="172" rx="7" ry="8" fill="#D97706" stroke="#000000" strokeWidth="2.2" />
      </g>

      {/* Sombra sólida de la llama */}
      <path
        d="M 95 30 C 99 52 116 66 128 82 C 142 100 148 120 148 144 C 148 168 124 178 95 178 C 66 178 42 168 42 144 C 42 120 48 100 62 82 C 74 66 91 52 95 30 Z"
        fill="#000000"
      />

      {/* Cuerpo principal dormido en azul grisáceo */}
      <path
        d="M 95 30 C 99 52 116 66 128 82 C 142 100 148 120 148 140 C 148 162 124 172 95 172 C 66 172 42 162 42 140 C 42 120 48 100 62 82 C 74 66 91 52 95 30 Z"
        fill="#64748B"
        stroke="#000000"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Vientre suave tenue */}
      <ellipse cx="95" cy="132" rx="36" ry="28" fill="#94A3B8" stroke="#000000" strokeWidth="3" />

      {/* Ojos cerrados soñando plácidamente */}
      <path d="M 70 120 Q 79 127 88 120" stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 102 120 Q 111 127 120 120" stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Mejillas tiernas */}
      <circle cx="62" cy="126" r="5.5" fill="#F472B6" stroke="#000000" strokeWidth="2" />
      <circle cx="128" cy="126" r="5.5" fill="#F472B6" stroke="#000000" strokeWidth="2" />

      {/* Boquita tranquila roncando suave */}
      <ellipse cx="95" cy="134" rx="4.5" ry="6" fill="#000000" />
    </svg>
  </div>
);

/**
 * Chispa Comic Neo-brutalism ✦
 */
const ComicSpark: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({
  size = 20,
  color = '#FFE600',
  style
}) => (
  <svg
    viewBox="0 0 40 40"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className="streak-neo-spark"
  >
    <path
      d="M 20 2 Q 20 20 2 20 Q 20 20 20 38 Q 20 20 38 20 Q 20 20 20 2 Z"
      fill={color}
      stroke="#000000"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const StreakCelebrationModal: React.FC<StreakCelebrationModalProps> = ({
  user,
  isOpen,
  onClose,
  isJustCompleted = false,
  nextLesson = null,
  onAdvanceNextLesson
}) => {
  const streakCount = user.streak?.count ?? 0;
  const isZeroStreak = streakCount === 0;

  // Manejo de fecha local precisa
  const now = new Date();
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayStr = getLocalDateString(todayDate);

  const userKey = user?.uid || 'user';
  const seenKey = `${TODAY_STREAK_SEEN_KEY}${userKey}`;
  const lastSeenDate = storageService.getItem<string>(seenKey, '');
  const hasAlreadySeenToday = lastSeenDate === todayStr;

  const hasPracticedToday = (user.streak?.lastActivityDate === todayStr && streakCount > 0) || isJustCompleted;
  const isAlreadyClaimedMode = !isZeroStreak && hasAlreadySeenToday && !isJustCompleted;

  // Secuencia de animación de júbilo neo-brutal
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

  // Paginación semanal para rachas largas (> 7 días)
  const [weekOffset, setWeekOffset] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      setWeekOffset(0);
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

    // Modo Celebración Activa (primera vez hoy o entrega de lección)
    const targetStreak = streakCount;
    const startCount = isJustCompleted ? Math.max(0, targetStreak - 1) : targetStreak;

    setAnimationPhase('jump');
    setDisplayCount(startCount);

    // Salto de júbilo con confetti neo-brutal y grito
    const timerYujuu = setTimeout(() => {
      soundService.playYujuu();
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.38 },
        colors: ['#000000', '#FFE600', '#FF5722', '#22C55E', '#38BDF8', '#FF3366']
      });
    }, 320);

    // Ignición de la llama y subida del número
    const timerIgnite = setTimeout(() => {
      setAnimationPhase('ignite');
      soundService.playStreak();

      confetti({
        particleCount: 100,
        spread: 95,
        origin: { y: 0.44 },
        colors: ['#000000', '#FFE600', '#FF6D00', '#FF3B30', '#22C55E', '#FF3366']
      });

      setDisplayCount(targetStreak);
      storageService.setItem(seenKey, todayStr);
    }, 1050);

    const timerReady = setTimeout(() => {
      setAnimationPhase('ready');
    }, 1650);

    return () => {
      clearTimeout(timerYujuu);
      clearTimeout(timerIgnite);
      clearTimeout(timerReady);
    };
  }, [isOpen, streakCount, isZeroStreak, isAlreadyClaimedMode, isJustCompleted, todayStr, seenKey]);

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * CALENDARIO DINÁMICO DE RACHA (7 DÍAS A PARTIR DEL INICIO DE LA RACHA)
   * ═══════════════════════════════════════════════════════════════════════════
   */
  const calendarDays = useMemo(() => {
    let startDayOffset = 0;

    if (isZeroStreak) {
      startDayOffset = 0;
    } else if (hasPracticedToday || isJustCompleted) {
      if (streakCount <= 6) {
        startDayOffset = -(streakCount - 1);
      } else {
        startDayOffset = -6 + weekOffset * 7;
      }
    } else {
      if (streakCount <= 5) {
        startDayOffset = -streakCount;
      } else {
        startDayOffset = -5 + weekOffset * 7;
      }
    }

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(todayDate);
      d.setDate(todayDate.getDate() + startDayOffset + i);
      const dStr = getLocalDateString(d);
      const isToday = dStr === todayStr;
      const isPast = d < todayDate;
      const isFuture = d > todayDate;

      let isActive = false;
      let isPendingToday = false;

      if (isToday) {
        const todayIgnited = isAlreadyClaimedMode || (isJustCompleted ? animationPhase !== 'jump' : hasPracticedToday);
        if (todayIgnited && !isZeroStreak) {
          isActive = true;
        } else {
          isPendingToday = true;
        }
      } else if (isPast) {
        const diffDaysFromToday = Math.round((todayDate.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
        if (hasPracticedToday) {
          isActive = diffDaysFromToday < streakCount;
        } else {
          isActive = diffDaysFromToday <= streakCount;
        }
      }

      const dayJsIdx = d.getDay();
      const dayShortName = SPANISH_DAYS_SHORT[dayJsIdx];
      const dayLetter = SPANISH_DAYS_LETTER[dayJsIdx];
      const dayNum = d.getDate();

      let relativeText = '';
      if (isToday) relativeText = 'Hoy';
      else if (Math.round((todayDate.getTime() - d.getTime()) / 86400000) === 1) relativeText = 'Ayer';
      else if (Math.round((d.getTime() - todayDate.getTime()) / 86400000) === 1) relativeText = 'Mañana';

      days.push({
        date: d,
        dateStr: dStr,
        dayShortName,
        dayLetter,
        dayNum,
        isToday,
        isPast,
        isFuture,
        isActive,
        isPendingToday,
        relativeText
      });
    }

    return days;
  }, [
    todayDate,
    todayStr,
    isZeroStreak,
    hasPracticedToday,
    isJustCompleted,
    streakCount,
    weekOffset,
    isAlreadyClaimedMode,
    animationPhase
  ]);

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
      className="streak-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Celebración de Racha Prograpp"
    >
      <style>{`
        .streak-modal-backdrop,
        .streak-modal-backdrop * {
          font-family: 'Nunito', sans-serif !important;
          box-sizing: border-box;
        }

        .streak-modal-backdrop {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          z-index: 999999;
          background: rgba(15, 23, 42, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(10px, 2.5vh, 24px) clamp(10px, 3vw, 18px);
          animation: streakBackdropFade 0.22s ease-out forwards;
        }

        @keyframes streakBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ─── TARJETA NEO-BRUTALISM: BORDES NEGROS SÓLIDOS Y SOMBRA HARD OFFSET ─── */
        .streak-modal-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          max-height: min(92dvh, 740px);
          background: #FFFFFF;
          border: 3.5px solid #000000;
          border-radius: clamp(20px, 4.5vw, 26px);
          box-shadow: 7px 7px 0px #000000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: #000000;
          animation: streakNeoPop 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes streakNeoPop {
          0% { opacity: 0; transform: scale(0.85) translateY(24px) rotate(-1deg); }
          70% { opacity: 1; transform: scale(1.02) translateY(-4px) rotate(0.5deg); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); }
        }

        /* Botón de cierre X Neo-brutalism */
        .streak-top-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          background: #FFFFFF;
          border: 2.5px solid #000000;
          border-radius: 12px;
          box-shadow: 3px 3px 0px #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000000;
          cursor: pointer;
          z-index: 30;
          transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
        }
        .streak-top-close-btn:hover {
          color: #000000;
          background: #FEE2E2;
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px #000000;
        }
        .streak-top-close-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0px #000000;
        }

        /* Cuerpo con scroll interno limpio */
        .streak-modal-body {
          padding: clamp(16px, 2.6vh, 22px) clamp(14px, 3.5vw, 20px) clamp(16px, 2.8vh, 22px);
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        /* ─── ESCENARIO HERO NEO-BRUTALISM ─── */
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

        /* Comic Action Starburst rotatorio de fondo */
        .streak-neo-starburst {
          position: absolute;
          width: clamp(180px, 48vw, 235px);
          height: clamp(180px, 48vw, 235px);
          pointer-events: none;
          z-index: 0;
          animation: starburstSpin 24s linear infinite;
          filter: drop-shadow(4px 4px 0px #000000);
        }
        @keyframes starburstSpin {
          0% { transform: rotate(0deg) scale(0.96); }
          50% { transform: rotate(180deg) scale(1.04); }
          100% { transform: rotate(360deg) scale(0.96); }
        }

        .streak-neo-starburst.ignite-blast {
          animation: starburstBlast 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, starburstSpin 24s linear infinite 0.65s;
        }
        @keyframes starburstBlast {
          0% { transform: scale(0.3) rotate(0deg); opacity: 0; }
          60% { transform: scale(1.22) rotate(40deg); opacity: 1; }
          100% { transform: scale(1) rotate(60deg); opacity: 1; }
        }

        /* Chispas flotantes Comic Neo-brutalism */
        .streak-neo-spark {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          animation: neoSparkFloat 2.4s ease-in-out infinite;
          filter: drop-shadow(2px 2px 0px #000000);
          z-index: 12;
        }
        @keyframes neoSparkFloat {
          0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
          25% { opacity: 1; transform: translateY(-20px) scale(1.15) rotate(15deg); }
          75% { opacity: 1; transform: translateY(-60px) scale(1) rotate(-10deg); }
          100% { transform: translateY(-95px) scale(0.4) rotate(25deg); opacity: 0; }
        }

        .neo-flame-wrapper {
          position: relative;
          width: clamp(140px, 34vw, 175px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .neo-flame-svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(3px 5px 0px #000000);
          animation: flameNeoIdle 2.6s ease-in-out infinite alternate;
          transform-origin: 50% 90%;
        }

        @keyframes flameNeoIdle {
          0% { transform: translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-8px) rotate(-2deg) scale(1.02, 0.98); }
          75% { transform: translateY(-4px) rotate(2deg) scale(0.98, 1.02); }
          100% { transform: translateY(0) rotate(0deg) scale(1); }
        }

        .neo-flame-arms {
          transform-origin: 50% 120px;
          animation: flameNeoArmsCelebrate 1.8s ease-in-out infinite alternate;
        }
        @keyframes flameNeoArmsCelebrate {
          0% { transform: rotate(-4deg); }
          100% { transform: rotate(4deg); }
        }

        .ignite-pop {
          animation: flameNeoIgnitePop 0.68s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes flameNeoIgnitePop {
          0% { transform: scale(0.35) translateY(40px) rotate(-6deg); opacity: 0; }
          50% { transform: scale(1.22) translateY(-16px) rotate(4deg); opacity: 1; }
          75% { transform: scale(0.95) translateY(2px) rotate(-2deg); }
          100% { transform: scale(1) translateY(0) rotate(0deg); }
        }

        /* Parpadeo Ojos Comic */
        .neo-eye {
          animation: neoEyeBlink 3.8s infinite;
          transform-origin: 50% 122px;
        }
        @keyframes neoEyeBlink {
          0%, 46%, 50%, 100% { transform: scaleY(1); }
          48% { transform: scaleY(0.08); }
        }

        /* Sombra de Suelo Neo-brutalism */
        .flame-ground-shadow {
          animation: shadowNeoBreathe 2.6s ease-in-out infinite alternate;
          transform-origin: 95px 195px;
        }
        @keyframes shadowNeoBreathe {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(0.82); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.9; }
        }

        /* ─── DORMANT FLAME NEO-BRUTALISM (DÍA 0) ─── */
        .dormant-flame-wrapper {
          position: relative;
          width: clamp(135px, 32vw, 165px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .dormant-flame-svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: dormantNeoBreathe 3s ease-in-out infinite alternate;
          transform-origin: 50% 85%;
          filter: drop-shadow(3px 4px 0px #000000);
        }
        @keyframes dormantNeoBreathe {
          0% { transform: scale(1); }
          100% { transform: scale(1.03, 0.97); }
        }

        /* Badges flotantes Comic zZz */
        .neo-zzz-badge {
          position: absolute;
          background: #FFFFFF;
          color: #000000;
          font-weight: 900;
          border: 2.5px solid #000000;
          box-shadow: 2.5px 2.5px 0px #000000;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          animation: neoZFloat 2.6s ease-in-out infinite;
        }
        .zzz-1 {
          top: 22px;
          right: 20px;
          width: 24px;
          height: 24px;
          font-size: 0.85rem;
          animation-delay: 0s;
        }
        .zzz-2 {
          top: 4px;
          right: 8px;
          width: 28px;
          height: 28px;
          font-size: 1.05rem;
          animation-delay: 0.8s;
        }
        .zzz-3 {
          top: -14px;
          right: -2px;
          width: 32px;
          height: 32px;
          font-size: 1.25rem;
          animation-delay: 1.6s;
        }

        @keyframes neoZFloat {
          0% { transform: translate(0, 0) scale(0.6) rotate(0deg); opacity: 0; }
          30% { opacity: 1; transform: translate(6px, -8px) scale(1) rotate(5deg); }
          75% { opacity: 1; transform: translate(14px, -18px) scale(1.08) rotate(-4deg); }
          100% { transform: translate(22px, -28px) scale(1.15) rotate(8deg); opacity: 0; }
        }

        /* ─── NÚMERO GIGANTE Y TÍTULOS NEO-BRUTALISM ─── */
        .streak-giant-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
        }

        .streak-giant-number {
          font-size: clamp(3.2rem, 9.5vw, 4.3rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.02em;
          color: #FF5400;
          text-shadow: 4px 4px 0px #000000;
          -webkit-text-stroke: 1.8px #000000;
          margin: 0;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .streak-giant-number.zero {
          color: #94A3B8;
          text-shadow: 4px 4px 0px #000000;
          -webkit-text-stroke: 1.8px #000000;
        }

        .streak-giant-number.igniting {
          animation: neoNumberSlam 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes neoNumberSlam {
          0% { transform: scale(0.4) translateY(24px); opacity: 0; }
          60% { transform: scale(1.3) translateY(-10px); }
          80% { transform: scale(0.95) translateY(2px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        /* Badge Sticker del Título */
        .streak-giant-title-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFE600;
          color: #000000;
          border: 2.5px solid #000000;
          box-shadow: 3px 3px 0px #000000;
          border-radius: 12px;
          padding: 5px 14px;
          font-size: clamp(0.95rem, 3.2vw, 1.15rem);
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin: 8px 0 6px;
          text-align: center;
        }

        .streak-giant-title-badge.zero {
          background: #E2E8F0;
        }

        .streak-subtitle-desc {
          font-size: clamp(0.8rem, 2.4vw, 0.88rem);
          color: #0F172A;
          font-weight: 800;
          text-align: center;
          max-width: 350px;
          line-height: 1.35;
          margin: 0 0 12px;
        }

        /* ─── TARJETA NEO-BRUTALISM: RASTREADOR SEMANAL (7 DÍAS) ─── */
        .streak-calendar-card {
          width: 100%;
          background: #FFFDF0;
          border: 2.5px solid #000000;
          box-shadow: 4px 4px 0px #000000;
          border-radius: 18px;
          padding: 10px 10px 8px;
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .streak-calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px 4px;
          border-bottom: 2px solid #000000;
        }

        .streak-cal-title {
          font-size: 0.72rem;
          font-weight: 900;
          color: #000000;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .streak-cal-nav {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .streak-nav-btn {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: #FFFFFF;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0px #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000000;
          cursor: pointer;
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.1s ease;
        }
        .streak-nav-btn:hover:not(:disabled) {
          background: #FFE600;
          transform: translate(-1px, -1px);
          box-shadow: 2.5px 2.5px 0px #000000;
        }
        .streak-nav-btn:active:not(:disabled) {
          transform: translate(1.5px, 1.5px);
          box-shadow: 0.5px 0.5px 0px #000000;
        }
        .streak-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          box-shadow: none;
        }

        .streak-days-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
          width: 100%;
        }

        .duo-day-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
        }

        .duo-day-label {
          font-size: clamp(0.66rem, 2vw, 0.74rem);
          font-weight: 900;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #475569;
        }
        .duo-day-label.today {
          color: #000000;
          background: #FFE600;
          border: 1.5px solid #000000;
          border-radius: 6px;
          padding: 1px 4px;
          box-shadow: 1.5px 1.5px 0px #000000;
        }

        .duo-day-coin-3d {
          width: clamp(33px, 8.8vw, 38px);
          height: clamp(33px, 8.8vw, 38px);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.82rem;
          font-weight: 900;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        /* Moneda Activa Hoy (Celebración dorada / naranja con pulso neo-brutal) */
        .coin-ignited-today {
          background: #FF6D00;
          border: 2.5px solid #000000;
          box-shadow: 3.5px 3.5px 0px #000000;
          color: #FFFFFF;
          animation: neoCoinIgnitedPulse 1.6s ease-in-out infinite;
        }
        @keyframes neoCoinIgnitedPulse {
          0%, 100% { transform: scale(1.08) rotate(0deg); }
          50% { transform: scale(1.18) rotate(3deg); }
        }

        /* Moneda de Racha Pasada Activa */
        .coin-active-past {
          background: #FFA000;
          border: 2px solid #000000;
          box-shadow: 2.5px 2.5px 0px #000000;
          color: #FFFFFF;
        }

        /* Moneda Hoy Pendiente (Día 0 o lección aún no completada) */
        .coin-today-pending {
          background: #FFF7ED;
          border: 2px dashed #000000;
          box-shadow: 2px 2px 0px #000000;
          color: #EA580C;
          animation: neoCoinPendingPulse 1.8s ease-in-out infinite;
        }
        @keyframes neoCoinPendingPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); background: #FEF08A; }
        }

        /* Moneda Inactiva / Días Futuros */
        .coin-inactive {
          background: #F1F5F9;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0px #CBD5E1;
          color: #64748B;
        }

        .duo-day-sub {
          font-size: clamp(0.58rem, 1.8vw, 0.66rem);
          font-weight: 900;
          color: #64748B;
        }
        .duo-day-sub.today {
          color: #000000;
          font-weight: 900;
        }

        /* ─── TARJETA PROTECTOR DE RACHA NEO-BRUTALISM ─── */
        .duo-freeze-pill-3d {
          width: 100%;
          background: #E0F2FE;
          border: 2.5px solid #000000;
          box-shadow: 3.5px 3.5px 0px #000000;
          border-radius: 16px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .duo-freeze-icon-box {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #0284C7;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0px #000000;
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
          font-size: 0.82rem;
          font-weight: 900;
          color: #000000;
        }

        .duo-freeze-sub {
          font-size: 0.7rem;
          font-weight: 700;
          color: #0369A1;
        }

        /* ─── BOTONES NEO-BRUTALISM ─── */
        .streak-bottom-actions {
          width: 100%;
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .btn-duo-share-3d {
          width: 50px;
          height: 50px;
          background: #FFFFFF;
          border: 2.5px solid #000000;
          box-shadow: 4px 4px 0px #000000;
          border-radius: 16px;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.1s ease;
        }
        .btn-duo-share-3d:hover {
          background: #FEF08A;
          transform: translate(-1px, -1px);
          box-shadow: 5px 5px 0px #000000;
        }
        .btn-duo-share-3d:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px #000000;
        }

        .btn-duo-green-3d {
          flex: 1;
          height: 50px;
          background: #22C55E;
          border: 3px solid #000000;
          box-shadow: 4px 4px 0px #000000;
          border-radius: 16px;
          color: #000000;
          font-size: clamp(0.95rem, 3.2vw, 1.05rem);
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.08s ease, box-shadow 0.08s ease, filter 0.15s ease;
        }
        .btn-duo-green-3d:hover {
          filter: brightness(1.05);
          transform: translate(-1px, -1px);
          box-shadow: 5px 5px 0px #000000;
        }
        .btn-duo-green-3d:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px #000000;
        }
      `}</style>

      {/* Tarjeta Centrada Neo-brutalism */}
      <div className="streak-modal-card">
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
          <X size={20} strokeWidth={3} />
        </button>

        <div className="streak-modal-body">
          {/* ═══ ESCENARIO HERO NEO-BRUTALISM ═══ */}
          <div className="streak-flame-hero-stage">
            {/* Comic Starburst animado detrás del personaje */}
            {!isZeroStreak && (
              <>
                <svg
                  viewBox="0 0 200 200"
                  className={`streak-neo-starburst ${animationPhase === 'ignite' ? 'ignite-blast' : ''}`}
                  aria-hidden="true"
                >
                  <polygon
                    points={STARBURST_POINTS}
                    fill="#FFE600"
                    stroke="#000000"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Chispas flotantes Comic ✦ */}
                <ComicSpark size={22} color="#FFE600" style={{ left: '16%', bottom: '38%', animationDelay: '0s' }} />
                <ComicSpark size={18} color="#FF5722" style={{ left: '80%', bottom: '44%', animationDelay: '0.8s' }} />
                <ComicSpark size={24} color="#FFFFFF" style={{ left: '50%', bottom: '28%', animationDelay: '1.6s' }} />
              </>
            )}

            {isZeroStreak ? (
              <NeoBrutalDormantFlame />
            ) : (
              <NeoBrutalFlame isIgniting={animationPhase === 'ignite'} />
            )}
          </div>

          {/* ═══ CONTEO GIGANTE Y TÍTULOS NEO-BRUTALISM ═══ */}
          <div className="streak-giant-box">
            <div
              className={`streak-giant-number ${isZeroStreak ? 'zero' : ''} ${
                animationPhase === 'ignite' ? 'igniting' : ''
              }`}
            >
              <span>{displayCount}</span>
              <span style={{ fontSize: '0.5em' }}>🔥</span>
            </div>

            <div className={`streak-giant-title-badge ${isZeroStreak ? 'zero' : ''}`}>
              <Flame size={16} color="#000000" strokeWidth={3} fill={isZeroStreak ? 'none' : '#FF5400'} />
              <span>
                {isZeroStreak
                  ? 'Día 0 de Racha'
                  : displayCount === 1
                  ? '1 Día de Racha'
                  : `${displayCount} Días de Racha`}
              </span>
            </div>

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

          {/* ═══ TARJETA NEO-BRUTAL: RASTREADOR SEMANAL DINÁMICO ═══ */}
          <div className="streak-calendar-card">
            <div className="streak-calendar-header">
              <span className="streak-cal-title">
                <Flame size={14} color="#000000" fill="#FF5400" /> Tu Camino de Racha
              </span>

              {streakCount > 7 && (
                <div className="streak-cal-nav">
                  <button
                    className="streak-nav-btn"
                    disabled={weekOffset <= -Math.floor((streakCount - 1) / 7)}
                    onClick={() => setWeekOffset((prev) => prev - 1)}
                    title="Ver días anteriores"
                    type="button"
                    aria-label="Ver semana anterior"
                  >
                    <ChevronLeft size={16} strokeWidth={3} />
                  </button>
                  <button
                    className="streak-nav-btn"
                    disabled={weekOffset >= 0}
                    onClick={() => setWeekOffset((prev) => prev + 1)}
                    title="Ver días recientes"
                    type="button"
                    aria-label="Ver semana reciente"
                  >
                    <ChevronRight size={16} strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>

            <div className="streak-days-track">
              {calendarDays.map((day) => {
                let coinClass = 'coin-inactive';
                if (day.isPendingToday) {
                  coinClass = 'coin-today-pending';
                } else if (day.isActive && day.isToday) {
                  coinClass = 'coin-ignited-today';
                } else if (day.isActive) {
                  coinClass = 'coin-active-past';
                }

                return (
                  <div key={day.dateStr} className="duo-day-col">
                    <span className={`duo-day-label ${day.isToday ? 'today' : ''}`}>
                      {day.isToday ? 'Hoy' : day.dayShortName}
                    </span>

                    <div className={`duo-day-coin-3d ${coinClass}`}>
                      {day.isActive ? (
                        <Flame size={19} fill="#FFFFFF" color="#000000" strokeWidth={2.4} />
                      ) : day.isPendingToday ? (
                        <Sparkles size={17} color="#EA580C" strokeWidth={2.6} />
                      ) : (
                        <span>{day.dayNum}</span>
                      )}
                    </div>

                    <span className={`duo-day-sub ${day.isToday ? 'today' : ''}`}>
                      {day.relativeText && !day.isToday ? day.relativeText : day.dayNum}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ═══ TARJETA NEO-BRUTAL: PROTECTOR DE RACHA (STREAK FREEZE) ═══ */}
          <div className="duo-freeze-pill-3d">
            <div className="duo-freeze-icon-box">
              <ShieldCheck size={20} color="#FFFFFF" strokeWidth={3} />
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

          {/* ═══ BOTONES INFERIORES NEO-BRUTALISM ═══ */}
          <div className="streak-bottom-actions">
            {!isZeroStreak && (
              <button
                className="btn-duo-share-3d"
                onClick={handleShare}
                title="Compartir Racha"
                type="button"
                aria-label="Compartir Racha"
              >
                {copied ? <Check size={22} color="#16A34A" strokeWidth={3.5} /> : <Share2 size={20} strokeWidth={2.8} />}
              </button>
            )}

            {isJustCompleted && nextLesson && onAdvanceNextLesson ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <button
                  className="btn-duo-green-3d"
                  onClick={() => {
                    soundService.playWin();
                    onAdvanceNextLesson();
                  }}
                  type="button"
                  style={{ width: '100%' }}
                >
                  <span>¡AVANZAR AL SIGUIENTE NIVEL!</span>
                  <ArrowRight size={20} strokeWidth={3} />
                </button>
                <button
                  onClick={() => {
                    soundService.playToken();
                    onClose();
                  }}
                  type="button"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#0F172A',
                    fontSize: '0.86rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    padding: '6px 12px',
                    textDecoration: 'underline'
                  }}
                >
                  Volver al mapa de ruta
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
