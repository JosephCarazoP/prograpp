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

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * FUEGUITO 3D OFICIAL ESTILO DUOLINGO (100% Vector 3D Duolingo / 0% IA)
 * ═════════════════════════════════════════════════════════════════════════════
 * Mascota viva de la racha: silueta suave y orgánica de gota con cresta
 * curvada a la derecha, brazos festivos en alto, iluminación volumétrica
 * esférica en el vientre, reflejos glossy de juguete de vinilo 3D,
 * ojitos expresivos con animación de parpadeo y mejillas sonrosadas.
 */
const DuolingoFlame3D: React.FC<{ isIgniting?: boolean }> = ({ isIgniting = false }) => (
  <div className={`duo-flame-wrapper ${isIgniting ? 'ignite-pop' : ''}`}>
    <svg
      viewBox="0 0 190 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="duo-flame-svg"
      aria-label="Fueguito de Racha Duolingo 3D"
    >
      <defs>
        {/* Degradado Volumétrico del Cuerpo 3D */}
        <linearGradient id="duoFlameBodyGrad" x1="95" y1="16" x2="95" y2="188" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA600" />
          <stop offset="28%" stopColor="#FF7A00" />
          <stop offset="68%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        {/* Núcleo Iluminado / Esfera de Energía en el Vientre */}
        <radialGradient id="duoFlameBellyGlow" cx="50%" cy="58%" r="48%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FFF275" />
          <stop offset="70%" stopColor="#FFB703" />
          <stop offset="100%" stopColor="#FB8500" stopOpacity="0" />
        </radialGradient>

        {/* Degradado para los Brazos 3D */}
        <linearGradient id="duoFlameArmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA600" />
          <stop offset="60%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        {/* Reflejo Glossy Curvo (Efecto Vinilo / Muñeco 3D) */}
        <linearGradient id="duoFlameGlossSheen" x1="42" y1="30" x2="82" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Sombra de Suelo 3D en Fondo Blanco */}
        <radialGradient id="duoFlameGroundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.55" />
          <stop offset="65%" stopColor="#CBD5E1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Sombra de contacto en el piso 3D (se aplasta y estira con el salto) */}
      <ellipse cx="95" cy="194" rx="58" ry="9" fill="url(#duoFlameGroundShadow)" className="flame-ground-shadow" />

      {/* 2. Brazos Festivos 3D Celebrando en Alto ("\o/") */}
      <g className="duo-flame-arms">
        {/* Brazo Izquierdo */}
        <path
          d="M 44 126 C 28 120 18 106 20 92 C 24 78 38 88 44 104 C 47 112 46 122 44 126 Z"
          fill="url(#duoFlameArmGrad)"
          stroke="#C2410C"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Mano izquierda redondeada */}
        <circle cx="21" cy="91" r="5" fill="#FFA600" stroke="#C2410C" strokeWidth="2" />

        {/* Brazo Derecho */}
        <path
          d="M 146 126 C 162 120 172 106 170 92 C 166 78 152 88 146 104 C 143 112 144 122 146 126 Z"
          fill="url(#duoFlameArmGrad)"
          stroke="#C2410C"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Mano derecha redondeada */}
        <circle cx="169" cy="91" r="5" fill="#FFA600" stroke="#C2410C" strokeWidth="2" />
      </g>

      {/* 3. Bisel 3D Inferior (Capa de relieve y profundidad sólida Duolingo) */}
      <path
        d="M 95 18 C 101 44 122 60 138 80 C 156 102 165 124 165 150 C 165 182 133 194 95 194 C 57 194 25 182 25 150 C 25 124 34 102 52 80 C 68 60 89 44 95 18 Z"
        fill="#9A3412"
      />

      {/* 4. Cuerpo Principal de la Llama (Silueta de gota orgánica volumétrica) */}
      <path
        d="M 95 18 C 101 44 122 60 138 80 C 156 102 165 124 165 146 C 165 178 133 190 95 190 C 57 190 25 178 25 146 C 25 124 34 102 52 80 C 68 60 89 44 95 18 Z"
        fill="url(#duoFlameBodyGrad)"
        stroke="#C2410C"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />

      {/* 5. Vientre Volumétrico Cálido Esférico */}
      <ellipse cx="95" cy="144" rx="46" ry="38" fill="url(#duoFlameBellyGlow)" />

      {/* 6. Reflejo Glossy Curvo en el hombro izquierdo (Brillo de vinilo 3D) */}
      <path
        d="M 87 28 C 80 48 62 68 50 86 C 39 104 35 122 37 136 C 33 124 35 106 46 90 C 57 74 76 52 87 28 Z"
        fill="url(#duoFlameGlossSheen)"
      />

      {/* 7. Destello Especular en la Punta de la Llama */}
      <ellipse cx="93" cy="34" rx="4" ry="9" transform="rotate(-16 93 34)" fill="#FFFFFF" fillOpacity="0.75" />

      {/* 8. CARITA DUOLINGO 3D — EXPRESIVA, TIERNA Y RADIANTE */}
      {/* Cejas Expresivas */}
      <path d="M 68 106 Q 77 101 85 107" stroke="#2E1102" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M 105 107 Q 113 101 122 106" stroke="#2E1102" strokeWidth="3.4" strokeLinecap="round" fill="none" />

      {/* Ojo Izquierdo 3D */}
      <g className="duo-eye duo-eye-left">
        <ellipse cx="77" cy="122" rx="7.5" ry="11" fill="#2E1102" />
        {/* Brillo ocular superior grande */}
        <circle cx="80" cy="118.5" r="3.4" fill="#FFFFFF" />
        {/* Micro-brillo inferior */}
        <circle cx="74.5" cy="126.5" r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
      </g>

      {/* Ojo Derecho 3D */}
      <g className="duo-eye duo-eye-right">
        <ellipse cx="113" cy="122" rx="7.5" ry="11" fill="#2E1102" />
        {/* Brillo ocular superior grande */}
        <circle cx="116" cy="118.5" r="3.4" fill="#FFFFFF" />
        {/* Micro-brillo inferior */}
        <circle cx="110.5" cy="126.5" r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
      </g>

      {/* Mejillas Sonrosadas Dulces 3D */}
      <ellipse cx="61" cy="132" rx="6.5" ry="4.5" fill="#FF5C7A" fillOpacity="0.88" />
      <ellipse cx="129" cy="132" rx="6.5" ry="4.5" fill="#FF5C7A" fillOpacity="0.88" />

      {/* Sonrisa Alegre Abierta con Lengüita Rosa */}
      <path
        d="M 83 132 C 83 147 107 147 107 132"
        fill="#4A1504"
        stroke="#2E1102"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      {/* Lengüita sonriente */}
      <path
        d="M 88 139 C 91 144 99 144 102 139 C 100 135 90 135 88 139 Z"
        fill="#FF4572"
      />
    </svg>
  </div>
);

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * FUEGUITO DORMILÓN 3D PARA RACHA 0 (100% Vector 3D Duolingo / 0% IA)
 * ═════════════════════════════════════════════════════════════════════════════
 * Descansa plácidamente sobre leños de fogata con relieve 3D, ojos
 * curvos soñando suavemente, burbujas zZz flotantes y mejillas tiernas.
 */
const DormantSleepingFlame3D: React.FC = () => (
  <div className="dormant-flame-wrapper">
    {/* Burbujas flotantes de sueño zZz */}
    <div className="zzz-bubble zzz-1">z</div>
    <div className="zzz-bubble zzz-2">Z</div>
    <div className="zzz-bubble zzz-3">Z</div>

    <svg
      viewBox="0 0 190 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dormant-flame-svg"
      aria-label="Fueguito Dormilón Racha 0"
    >
      <defs>
        {/* Degradado gris azulado frío de la llama dormida */}
        <linearGradient id="sleepyBodyGrad" x1="95" y1="25" x2="95" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="60%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        <linearGradient id="sleepyInnerGrad" x1="95" y1="65" x2="95" y2="155" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="60%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        {/* Leños de madera con relieve 3D */}
        <linearGradient id="woodLogGrad" x1="30" y1="160" x2="160" y2="185" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="50%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        <radialGradient id="sleepyGroundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#CBD5E1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sombra base */}
      <ellipse cx="95" cy="194" rx="58" ry="9" fill="url(#sleepyGroundShadow)" />

      {/* Leños de fogata 3D con corte de anillos de árbol */}
      <g className="campfire-logs-3d">
        <rect x="30" y="162" width="130" height="20" rx="10" fill="url(#woodLogGrad)" stroke="#451A03" strokeWidth="2.6" />
        {/* Anillo de madera izquierdo */}
        <ellipse cx="40" cy="172" rx="7" ry="8" fill="#D97706" stroke="#78350F" strokeWidth="1.6" />
        <circle cx="40" cy="172" r="3" fill="#92400E" />
        {/* Anillo de madera derecho */}
        <ellipse cx="150" cy="172" rx="7" ry="8" fill="#D97706" stroke="#78350F" strokeWidth="1.6" />
      </g>

      {/* Bisel 3D inferior */}
      <path
        d="M 95 30 C 99 52 116 66 128 82 C 142 100 148 120 148 142 C 148 166 124 176 95 176 C 66 176 42 166 42 142 C 42 120 48 100 62 82 C 74 66 91 52 95 30 Z"
        fill="#334155"
      />

      {/* Cuerpo principal dormido */}
      <path
        d="M 95 30 C 99 52 116 66 128 82 C 142 100 148 120 148 140 C 148 162 124 172 95 172 C 66 172 42 162 42 140 C 42 120 48 100 62 82 C 74 66 91 52 95 30 Z"
        fill="url(#sleepyBodyGrad)"
        stroke="#334155"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />

      {/* Vientre suave tenue */}
      <ellipse cx="95" cy="132" rx="36" ry="28" fill="url(#sleepyInnerGrad)" />

      {/* Ojos cerrados soñando plácidamente ( ˘ ◡ ˘ ) */}
      <path d="M 70 120 Q 79 127 88 120" stroke="#CBD5E1" strokeWidth="3.6" strokeLinecap="round" fill="none" />
      <path d="M 102 120 Q 111 127 120 120" stroke="#CBD5E1" strokeWidth="3.6" strokeLinecap="round" fill="none" />

      {/* Mejillas tiernas */}
      <circle cx="62" cy="126" r="5" fill="#F472B6" fillOpacity="0.75" />
      <circle cx="128" cy="126" r="5" fill="#F472B6" fillOpacity="0.75" />

      {/* Boquita tranquila roncando suave */}
      <ellipse cx="95" cy="134" rx="4" ry="5.5" fill="#1E293B" />
    </svg>
  </div>
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

  // Secuencia de animación de júbilo
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

    // Salto de júbilo con confetti y grito
    const timerYujuu = setTimeout(() => {
      soundService.playYujuu();
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.38 },
        colors: ['#FF9600', '#FFD200', '#58CC02', '#38BDF8']
      });
    }, 320);

    // Ignición de la llama y subida del número
    const timerIgnite = setTimeout(() => {
      setAnimationPhase('ignite');
      soundService.playStreak();

      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.44 },
        colors: ['#FF7A00', '#FF9600', '#FFD200', '#FFA800', '#22C55E']
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
   * Regla Pedagógica solicitada:
   * El calendario debe iniciar desde donde empezó la racha activa y mostrar los
   * días consecutivos para que no parezca que la racha empezó en lunes.
   *
   * Ejemplo: Si hoy es lunes, pero ayer era domingo y tenía racha:
   * Debe mostrar: Dom (ayer 🔥), Lun (hoy 🔥), Mar, Mié, Jue, Vie, Sáb.
   */
  const calendarDays = useMemo(() => {
    let startDayOffset = 0;

    if (isZeroStreak) {
      // Sin racha: inicia hoy
      startDayOffset = 0;
    } else if (hasPracticedToday || isJustCompleted) {
      // Hoy está activo:
      // Si streak = 1 -> empezó hoy (offset 0)
      // Si streak = 2 -> empezó ayer (offset -1)
      // Si streak = 3 -> empezó hace 2 días (offset -2)
      if (streakCount <= 6) {
        startDayOffset = -(streakCount - 1);
      } else {
        // Racha de 7 o más: muestra los 7 días consecutivos que culminan hoy (+ offset paginado)
        startDayOffset = -6 + weekOffset * 7;
      }
    } else {
      // Racha activa en días anteriores, pero hoy aún no ha practicado:
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

      // Calcular si este día específico formaba parte de la racha activa
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
        // Días pasados activos dentro de la longitud de la racha
        const diffDaysFromToday = Math.round((todayDate.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
        if (hasPracticedToday) {
          isActive = diffDaysFromToday < streakCount;
        } else {
          isActive = diffDaysFromToday <= streakCount;
        }
      }

      // Nombre del día en español
      const dayJsIdx = d.getDay(); // 0 = Dom, 1 = Lun...
      const dayShortName = SPANISH_DAYS_SHORT[dayJsIdx];
      const dayLetter = SPANISH_DAYS_LETTER[dayJsIdx];
      const dayNum = d.getDate();

      // Etiqueta de contexto relativo
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
          background: rgba(15, 23, 42, 0.64);
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

        /* ─── TARJETA BLANCA 3D ESTILO DUOLINGO (0% NEGRO, 100% APP THEME) ─── */
        .streak-modal-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          max-height: min(92dvh, 740px);
          background: #FFFFFF;
          border: 2.5px solid #E2E8F0;
          border-bottom: 6px solid #CBD5E1;
          border-radius: clamp(22px, 4.5vw, 30px);
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18), 0 4px 12px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: #0F172A;
          animation: streakCardPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes streakCardPop {
          0% { opacity: 0; transform: scale(0.92) translateY(16px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Botón de cierre X estilo Duolingo 3D */
        .streak-top-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          background: #FFFFFF;
          border: 2px solid #E2E8F0;
          border-bottom: 3.5px solid #CBD5E1;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
          cursor: pointer;
          z-index: 30;
          transition: transform 0.08s ease, color 0.12s ease, border-color 0.12s ease;
        }
        .streak-top-close-btn:hover {
          color: #0F172A;
          border-color: #CBD5E1;
          background: #F8FAFC;
        }
        .streak-top-close-btn:active {
          transform: translateY(2px);
          border-bottom-width: 2px;
        }

        /* Cuerpo con scroll interno limpio si la pantalla es baja */
        .streak-modal-body {
          padding: clamp(16px, 2.6vh, 22px) clamp(14px, 3.5vw, 20px) clamp(16px, 2.8vh, 22px);
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        /* ─── ESCENARIO HERO DEL FUEGUITO 3D ─── */
        .streak-flame-hero-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: clamp(140px, 24vh, 180px);
          margin-bottom: 4px;
        }

        /* Resplandor cálido de fondo sobre blanco */
        .streak-ambient-glow {
          position: absolute;
          width: clamp(190px, 52vw, 260px);
          height: clamp(190px, 52vw, 260px);
          background: radial-gradient(circle, rgba(255, 150, 0, 0.18) 0%, rgba(255, 210, 0, 0.08) 50%, transparent 72%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          transition: transform 0.6s ease, opacity 0.6s ease;
        }

        /* Chispas flotantes que suben suavemente */
        .streak-ambient-spark {
          position: absolute;
          width: 7px;
          height: 7px;
          background: #FFD23F;
          border-radius: 50%;
          box-shadow: 0 0 8px #FF7A00;
          pointer-events: none;
          animation: sparkFloatUp 2.8s ease-in infinite;
        }
        @keyframes sparkFloatUp {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          20% { opacity: 0.9; }
          100% { transform: translateY(-110px) scale(1.3); opacity: 0; }
        }

        .duo-flame-wrapper {
          position: relative;
          width: clamp(140px, 34vw, 175px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .duo-flame-svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 10px 18px rgba(234, 88, 12, 0.32));
          animation: flameIdleFloat 2.6s ease-in-out infinite alternate;
          transform-origin: 50% 90%;
        }

        @keyframes flameIdleFloat {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-7px) scale(1.02, 0.98); }
          100% { transform: translateY(0) scale(0.99, 1.01); }
        }

        .duo-flame-arms {
          transform-origin: 50% 120px;
          animation: flameArmsCelebrate 1.8s ease-in-out infinite alternate;
        }
        @keyframes flameArmsCelebrate {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }

        .ignite-pop {
          animation: flameIgnitePop 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes flameIgnitePop {
          0% { transform: scale(0.3) translateY(35px); opacity: 0; }
          65% { transform: scale(1.15) translateY(-12px); opacity: 1; }
          85% { transform: scale(0.96) translateY(2px); }
          100% { transform: scale(1) translateY(0); }
        }

        /* Parpadeo Ojos Duolingo 3D */
        .duo-eye {
          animation: duoEyeBlink 3.8s infinite;
          transform-origin: 50% 122px;
        }
        @keyframes duoEyeBlink {
          0%, 46%, 50%, 100% { transform: scaleY(1); }
          48% { transform: scaleY(0.08); }
        }

        /* Sombra de Suelo */
        .flame-ground-shadow {
          animation: shadowBreathe 2.6s ease-in-out infinite alternate;
          transform-origin: 95px 194px;
        }
        @keyframes shadowBreathe {
          0% { transform: scale(1); opacity: 0.65; }
          50% { transform: scale(0.85); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.65; }
        }

        /* ─── DORMANT FLAME (DÍA 0) ─── */
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
          animation: dormantGentleBreathe 3s ease-in-out infinite alternate;
          transform-origin: 50% 85%;
          filter: drop-shadow(0 6px 14px rgba(71, 85, 105, 0.22));
        }
        @keyframes dormantGentleBreathe {
          0% { transform: scale(1); }
          100% { transform: scale(1.03, 0.97); }
        }

        .zzz-bubble {
          position: absolute;
          color: #64748B;
          font-weight: 900;
          pointer-events: none;
          animation: zFloatUp 2.5s ease-in-out infinite;
        }
        .zzz-1 { top: 22px; right: 20px; font-size: 0.95rem; animation-delay: 0s; }
        .zzz-2 { top: 6px; right: 10px; font-size: 1.15rem; animation-delay: 0.8s; }
        .zzz-3 { top: -10px; right: 0px; font-size: 1.4rem; animation-delay: 1.6s; }

        @keyframes zFloatUp {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          40% { opacity: 0.85; }
          100% { transform: translate(16px, -22px) scale(1.15); opacity: 0; }
        }

        /* ─── NÚMERO GIGANTE Y TÍTULOS DUOLINGO ─── */
        .streak-giant-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .streak-giant-number {
          font-size: clamp(3rem, 9vw, 4rem);
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
          text-shadow: 0 4.5px 0 #64748B;
        }

        .streak-giant-title {
          font-size: clamp(1.15rem, 3.6vw, 1.4rem);
          font-weight: 900;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #0F172A;
          margin: 4px 0 2px;
          text-align: center;
        }

        .streak-subtitle-desc {
          font-size: clamp(0.78rem, 2.3vw, 0.86rem);
          color: #64748B;
          font-weight: 700;
          text-align: center;
          max-width: 340px;
          line-height: 1.35;
          margin: 0 0 10px;
        }

        /* ─── TARJETA DUOLINGO 3D: RASTREADOR SEMANAL (7 DÍAS DINÁMICOS) ─── */
        .streak-calendar-card {
          width: 100%;
          background: #F8FAFC;
          border: 2px solid #E2E8F0;
          border-bottom: 4px solid #CBD5E1;
          border-radius: 20px;
          padding: 10px 8px 8px;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .streak-calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px 4px;
          border-bottom: 1.5px solid #E2E8F0;
        }

        .streak-cal-title {
          font-size: 0.68rem;
          font-weight: 900;
          color: #64748B;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .streak-cal-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .streak-nav-btn {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-bottom: 2.5px solid #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          cursor: pointer;
          transition: transform 0.08s ease;
        }
        .streak-nav-btn:active {
          transform: translateY(1.5px);
          border-bottom-width: 1.5px;
        }
        .streak-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }

        .streak-days-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3px;
          width: 100%;
        }

        .duo-day-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          flex: 1;
        }

        .duo-day-label {
          font-size: clamp(0.66rem, 2vw, 0.74rem);
          font-weight: 900;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #64748B;
        }
        .duo-day-label.today {
          color: #EA580C;
          font-weight: 900;
        }

        .duo-day-coin-3d {
          width: clamp(33px, 8.8vw, 38px);
          height: clamp(33px, 8.8vw, 38px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 900;
          transition: transform 0.15s ease;
        }

        /* Moneda Activa Hoy (Celebración dorada pulsante) */
        .coin-ignited-today {
          background: linear-gradient(180deg, #FFC800 0%, #FF8200 100%);
          border: 2px solid #FFF7ED;
          box-shadow: 0 3.5px 0 #C2410C, 0 4px 12px rgba(255, 130, 0, 0.4);
          color: #FFFFFF;
          transform: scale(1.08);
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
          background: #FFF7ED;
          border: 2px dashed #FF9600;
          box-shadow: 0 3px 0 #FED7AA;
          color: #EA580C;
          animation: coinPendingPulse 1.8s ease-in-out infinite;
        }
        @keyframes coinPendingPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); box-shadow: 0 0 10px rgba(255, 150, 0, 0.45); }
        }

        /* Moneda Inactiva / Días Futuros (Clean White 3D) */
        .coin-inactive {
          background: #FFFFFF;
          border: 2px solid #E2E8F0;
          box-shadow: 0 2.5px 0 #CBD5E1;
          color: #94A3B8;
        }

        .duo-day-sub {
          font-size: clamp(0.58rem, 1.8vw, 0.66rem);
          font-weight: 800;
          color: #94A3B8;
        }
        .duo-day-sub.today {
          color: #EA580C;
          font-weight: 900;
        }

        /* ─── TARJETA PROTECTOR DE RACHA / STREAK FREEZE DUOLINGO 3D ─── */
        .duo-freeze-pill-3d {
          width: 100%;
          background: #F0F9FF;
          border: 2px solid #BAE6FD;
          border-bottom: 3.5px solid #7DD3FC;
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
          background: #0284C7;
          border: 1.5px solid #70CFF8;
          box-shadow: 0 2.5px 0 #0369A1;
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
          color: #0369A1;
        }

        .duo-freeze-sub {
          font-size: 0.68rem;
          font-weight: 700;
          color: #0284C7;
        }

        /* ─── BOTONES DUOLINGO 3D AUTÉNTICOS ─── */
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
          border: 2px solid #E2E8F0;
          border-bottom: 4px solid #CBD5E1;
          border-radius: 16px;
          color: #EA580C;
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
          height: 50px;
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
          transition: transform 0.08s ease, border-bottom-width 0.08s ease, filter 0.15s ease;
        }
        .btn-duo-green-3d:hover {
          filter: brightness(1.04);
        }
        .btn-duo-green-3d:active {
          transform: translateY(3px);
          border-bottom-width: 2px;
        }
      `}</style>

      {/* Tarjeta Centrada Duolingo 3D */}
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
          <X size={20} strokeWidth={2.8} />
        </button>

        <div className="streak-modal-body">
          {/* ═══ ESCENARIO HERO DEL FUEGUITO 3D ═══ */}
          <div className="streak-flame-hero-stage">
            {/* Resplandor cálido de fondo */}
            {!isZeroStreak && (
              <>
                <div
                  className="streak-ambient-glow"
                  style={{
                    opacity: animationPhase !== 'jump' ? 1 : 0.45,
                    transform: `scale(${animationPhase !== 'jump' ? '1.08' : '0.88'})`
                  }}
                />
                <div className="streak-ambient-spark" style={{ left: '22%', bottom: '38%', animationDelay: '0s' }} />
                <div className="streak-ambient-spark" style={{ left: '76%', bottom: '42%', animationDelay: '0.9s' }} />
                <div className="streak-ambient-spark" style={{ left: '50%', bottom: '32%', animationDelay: '1.7s' }} />
              </>
            )}

            {isZeroStreak ? (
              <DormantSleepingFlame3D />
            ) : (
              <DuolingoFlame3D isIgniting={animationPhase === 'ignite'} />
            )}
          </div>

          {/* ═══ CONTEO GIGANTE Y TÍTULOS ═══ */}
          <div className="streak-giant-box">
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

          {/* ═══ TARJETA 3D: RASTREADOR SEMANAL DINÁMICO ═══ */}
          <div className="streak-calendar-card">
            <div className="streak-calendar-header">
              <span className="streak-cal-title">
                <Flame size={13} color="#EA580C" /> Tu Camino de Racha
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
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    className="streak-nav-btn"
                    disabled={weekOffset >= 0}
                    onClick={() => setWeekOffset((prev) => prev + 1)}
                    title="Ver días recientes"
                    type="button"
                    aria-label="Ver semana reciente"
                  >
                    <ChevronRight size={14} />
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
                        <Flame size={18} fill="#FFFFFF" color="#FFFFFF" />
                      ) : day.isPendingToday ? (
                        <Sparkles size={16} color="#EA580C" />
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
                    color: '#64748B',
                    fontSize: '0.86rem',
                    fontWeight: 800,
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
