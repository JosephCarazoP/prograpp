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
 * 1. Chispa / Fueguito Dormido 3D para Racha 0 (0% IA / 100% Vector Duolingo 3D).
 * Descansa plácidamente roncando con burbujas zZz sobre leños de fogata 3D, esperando la primera lección para encenderse.
 */
const DormantSleepingFlameSVG: React.FC = () => (
  <div className="dormant-flame-wrapper">
    {/* Burbujas zZz animadas flotando al cielo */}
    <div className="zzz-bubble zzz-1">z</div>
    <div className="zzz-bubble zzz-2">Z</div>
    <div className="zzz-bubble zzz-3">Z</div>

    <svg
      viewBox="0 0 130 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dormant-flame-svg"
    >
      <defs>
        <linearGradient id="sleepyFlameOuter" x1="65" y1="20" x2="65" y2="135" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64748B" />
          <stop offset="60%" stopColor="#475569" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="sleepyFlameInner" x1="65" y1="50" x2="65" y2="125" gradientUnits="userSpaceOnUse">
          <stop stopColor="#94A3B8" />
          <stop offset="60%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="logWoodGradient" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#451A03" />
          <stop offset="50%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#291104" />
        </linearGradient>
      </defs>

      {/* Sombra base en el suelo */}
      <ellipse cx="65" cy="140" rx="44" ry="8" fill="#090D16" fillOpacity="0.6" />

      {/* Leños de fogata 3D en la base */}
      <g className="campfire-logs">
        <rect x="22" y="130" width="86" height="12" rx="6" fill="url(#logWoodGradient)" stroke="#1C0A00" strokeWidth="2" />
        <ellipse cx="26" cy="136" rx="4" ry="5" fill="#92400E" />
        <ellipse cx="104" cy="136" rx="4" ry="5" fill="#78350F" />
      </g>

      {/* Cuerpo de llama dormida gris/azulada suave */}
      <path
        d="M65 20 C67 36 79 48 87 58 C97 72 103 86 103 102 C103 122 85 134 65 134 C45 134 27 122 27 102 C27 82 35 68 49 52 C55 46 61 34 65 20 Z"
        fill="url(#sleepyFlameOuter)"
        stroke="#1E293B"
        strokeWidth="3.2"
      />

      {/* Capa interior tenue */}
      <path
        d="M65 50 C68 62 77 70 83 78 C89 86 91 96 89 108 C85 120 75 126 65 126 C55 126 45 120 41 108 C39 96 41 86 47 78 C53 70 62 62 65 50 Z"
        fill="url(#sleepyFlameInner)"
        stroke="#334155"
        strokeWidth="1.8"
      />

      {/* Ojos cerrados durmiendo plácidamente (- . -) */}
      <path d="M49 97 Q55 102 61 97" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M69 97 Q75 102 81 97" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Mejillas sonrosadas tenues */}
      <circle cx="44" cy="100" r="3.2" fill="#F472B6" fillOpacity="0.5" />
      <circle cx="86" cy="100" r="3.2" fill="#F472B6" fillOpacity="0.5" />

      {/* Boquita tranquila roncando */}
      <ellipse cx="65" cy="108" rx="3.5" ry="4.5" fill="#1E293B" />
    </svg>
  </div>
);

/**
 * 2. Avatar Byte Completo Calentando para Racha 0 ("con pies y todo").
 * Haciendo ejercicios de estiramiento y calentamiento listo para su primera lección.
 */
const FullBodyWarmingByte: React.FC = () => (
  <div className="fullbody-byte-container warming-anim">
    <svg
      viewBox="0 0 180 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fullbody-byte-svg"
    >
      <defs>
        <linearGradient id="warm-chassis" x1="40" y1="20" x2="140" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="warm-chassis-dark" x1="40" y1="50" x2="140" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="warm-boot" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>

      {/* Brazos en jarras / estirando */}
      <g className="warm-arms">
        <path d="M48 108 C30 112 24 130 30 144 C36 150 48 136 52 124 Z" fill="url(#warm-chassis-dark)" stroke="#0369A1" strokeWidth="2.5" />
        <circle cx="28" cy="142" r="9" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.2" />

        <path d="M132 108 C150 112 156 130 150 144 C144 150 132 136 128 124 Z" fill="url(#warm-chassis-dark)" stroke="#0369A1" strokeWidth="2.5" />
        <circle cx="152" cy="142" r="9" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.2" />
      </g>

      {/* Piernas y Botas 3D con pies firmes en el piso */}
      <g className="warm-legs">
        <rect x="58" y="148" width="16" height="32" rx="4" fill="url(#warm-chassis-dark)" stroke="#0369A1" strokeWidth="2.5" />
        <rect x="56" y="168" width="20" height="7" rx="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
        <path d="M46 182 C46 175 78 175 78 182 L80 198 L44 198 Z" fill="url(#warm-boot)" stroke="#0369A1" strokeWidth="2.5" />
        <rect x="40" y="198" width="44" height="8" rx="4" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />

        <rect x="106" y="148" width="16" height="32" rx="4" fill="url(#warm-chassis-dark)" stroke="#0369A1" strokeWidth="2.5" />
        <rect x="104" y="168" width="20" height="7" rx="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
        <path d="M102 182 C102 175 134 175 134 182 L136 198 L100 198 Z" fill="url(#warm-boot)" stroke="#0369A1" strokeWidth="2.5" />
        <rect x="96" y="198" width="44" height="8" rx="4" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />
      </g>

      {/* Torso */}
      <path d="M48 94 C48 94 42 136 50 142 C58 146 122 146 130 142 C138 136 132 94 132 94 Z" fill="url(#warm-chassis)" stroke="#0284C7" strokeWidth="2.8" />
      <rect x="62" y="104" width="56" height="26" rx="8" fill="#0284C7" stroke="#0369A1" strokeWidth="1.8" />
      <circle cx="90" cy="117" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="92" cy="115" r="2.5" fill="#FFFFFF" />

      {/* Cabeza con ojos curiosos y decididos */}
      <rect x="87" y="12" width="6" height="16" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
      <circle cx="90" cy="10" r="8" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
      <rect x="42" y="24" width="96" height="66" rx="28" fill="url(#warm-chassis)" stroke="#0284C7" strokeWidth="3" />

      {/* Cinta deportiva de entrenamiento 3D */}
      <rect x="42" y="34" width="96" height="13" rx="4" fill="#0284C7" />
      <rect x="42" y="39" width="96" height="4" fill="#FFFFFF" />

      <rect x="52" y="44" width="76" height="34" rx="14" fill="#0F172A" stroke="#0369A1" strokeWidth="2" />
      
      {/* Ojos bien abiertos con determinación */}
      <circle cx="73" cy="58" r="6" fill="#38BDF8" />
      <circle cx="75" cy="56" r="2.2" fill="#FFFFFF" />
      <circle cx="107" cy="58" r="6" fill="#38BDF8" />
      <circle cx="109" cy="56" r="2.2" fill="#FFFFFF" />

      <circle cx="62" cy="68" r="3.5" fill="#F472B6" fillOpacity="0.7" />
      <circle cx="118" cy="68" r="3.5" fill="#F472B6" fillOpacity="0.7" />
      <path d="M82 68 Q90 74 98 68" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

/**
 * 3. Avatar Byte Completo Orgulloso para "Ya reclamaste tu racha" ("con pies y todo").
 * De pie sonriendo junto al fuego dando el pulgar arriba (Thumbs up).
 */
const FullBodyProudByte: React.FC = () => (
  <div className="fullbody-byte-container proud-anim">
    <svg
      viewBox="0 0 180 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fullbody-byte-svg"
    >
      <defs>
        <linearGradient id="prd-chassis" x1="40" y1="20" x2="140" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="prd-chassis-dark" x1="40" y1="50" x2="140" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="prd-boot" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>

      {/* Brazo Izquierdo apoyado en la cadera */}
      <path d="M48 108 C30 114 26 130 32 144 C38 150 48 138 52 124 Z" fill="url(#prd-chassis-dark)" stroke="#0369A1" strokeWidth="2.5" />
      <circle cx="30" cy="142" r="9" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.2" />

      {/* Brazo Derecho dando el Pulgar Arriba (Thumbs Up 👍) */}
      <path d="M130 106 C144 110 152 116 156 126 C158 136 148 142 136 134 C132 126 128 120 126 112 Z" fill="url(#prd-chassis)" stroke="#0284C7" strokeWidth="2.5" />
      {/* Guante y pulgar alzado */}
      <circle cx="154" cy="128" r="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.2" />
      <rect x="151" y="114" width="6" height="12" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />

      {/* Piernas y Botas 3D firmes */}
      <g className="prd-legs">
        <rect x="58" y="148" width="16" height="32" rx="4" fill="url(#prd-chassis-dark)" stroke="#0369A1" strokeWidth="2.5" />
        <rect x="56" y="168" width="20" height="7" rx="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
        <path d="M46 182 C46 175 78 175 78 182 L80 198 L44 198 Z" fill="url(#prd-boot)" stroke="#0369A1" strokeWidth="2.5" />
        <rect x="40" y="198" width="44" height="8" rx="4" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />

        <rect x="106" y="148" width="16" height="32" rx="4" fill="url(#prd-chassis-dark)" stroke="#0369A1" strokeWidth="2.5" />
        <rect x="104" y="168" width="20" height="7" rx="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
        <path d="M102 182 C102 175 134 175 134 182 L136 198 L100 198 Z" fill="url(#prd-boot)" stroke="#0369A1" strokeWidth="2.5" />
        <rect x="96" y="198" width="44" height="8" rx="4" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />
      </g>

      {/* Torso con energía al 100% */}
      <path d="M48 94 C48 94 42 136 50 142 C58 146 122 146 130 142 C138 136 132 94 132 94 Z" fill="url(#prd-chassis)" stroke="#0284C7" strokeWidth="2.8" />
      <rect x="62" y="104" width="56" height="26" rx="8" fill="#0284C7" stroke="#0369A1" strokeWidth="1.8" />
      <circle cx="90" cy="117" r="7" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
      <circle cx="92" cy="115" r="2.5" fill="#FFFFFF" />

      {/* Cabeza sonriente con guiño de complicidad */}
      <rect x="87" y="12" width="6" height="16" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
      <circle cx="90" cy="10" r="8" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
      <rect x="42" y="24" width="96" height="66" rx="28" fill="url(#prd-chassis)" stroke="#0284C7" strokeWidth="3" />
      <rect x="52" y="38" width="76" height="38" rx="16" fill="#0F172A" stroke="#0369A1" strokeWidth="2" />
      
      {/* Ojo izquierdo en arco alegre ^, ojo derecho guiñando */}
      <path d="M68 59 C68 51, 78 51, 78 59" stroke="#38BDF8" strokeWidth="4.2" strokeLinecap="round" fill="none" />
      <line x1="102" y1="56" x2="114" y2="56" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />

      <circle cx="62" cy="65" r="3.5" fill="#F472B6" fillOpacity="0.75" />
      <circle cx="118" cy="65" r="3.5" fill="#F472B6" fillOpacity="0.75" />
      <path d="M82 65 Q90 73 98 65" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

/**
 * 4. Avatar Byte Completo Saltando y Girando 360 ("¡Yujuuu!").
 */
const FullBodyJumpingByte: React.FC = () => (
  <div className="fullbody-byte-container jumping-anim">
    <svg
      viewBox="0 0 180 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fullbody-byte-svg"
    >
      <defs>
        <linearGradient id="jmp-chassis" x1="40" y1="20" x2="140" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="jmp-chassis-dark" x1="40" y1="50" x2="140" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="jmp-boot" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>

      {/* Brazo Izquierdo de equilibrio */}
      <path d="M48 108 C32 112 20 125 18 138 C16 148 24 154 32 148 C38 144 46 128 52 118 Z" fill="url(#jmp-chassis-dark)" stroke="#0369A1" strokeWidth="2.5" />
      <circle cx="22" cy="144" r="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />

      {/* Piernas flexionadas en pleno salto enérgico */}
      <path d="M60 148 L56 178 L72 178 L74 148 Z" fill="url(#jmp-chassis-dark)" stroke="#0369A1" strokeWidth="2.5" />
      <rect x="54" y="166" width="20" height="7" rx="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <path d="M44 182 C44 175 76 175 78 182 L80 198 L42 198 Z" fill="url(#jmp-boot)" stroke="#0369A1" strokeWidth="2.5" />
      <rect x="38" y="200" width="44" height="8" rx="4" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />

      <path d="M106 148 L108 178 L124 178 L120 148 Z" fill="url(#jmp-chassis-dark)" stroke="#0369A1" strokeWidth="2.5" />
      <rect x="106" y="166" width="20" height="7" rx="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <path d="M102 182 C104 175 136 175 136 182 L138 196 L100 198 Z" fill="url(#jmp-boot)" stroke="#0369A1" strokeWidth="2.5" />
      <rect x="98" y="200" width="44" height="8" rx="4" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />

      {/* Torso */}
      <path d="M48 94 C48 94 42 136 50 142 C58 146 122 146 130 142 C138 136 132 94 132 94 Z" fill="url(#jmp-chassis)" stroke="#0284C7" strokeWidth="2.8" />
      <rect x="62" y="104" width="56" height="26" rx="8" fill="#0284C7" stroke="#0369A1" strokeWidth="1.8" />
      <circle cx="90" cy="117" r="7" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
      <circle cx="92" cy="115" r="2.5" fill="#FFFFFF" />

      {/* Brazo Derecho levantado en alto hacia las estrellas */}
      <path d="M130 102 C142 92 152 70 156 50 C160 38 150 32 142 40 C136 48 128 78 124 96 Z" fill="url(#jmp-chassis)" stroke="#0284C7" strokeWidth="2.5" />
      <ellipse cx="157" cy="40" rx="12" ry="11" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
      <rect x="150" y="27" width="6" height="11" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
      <rect x="157" y="26" width="6" height="12" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
      <circle cx="154" cy="38" r="3" fill="#FFFFFF" />

      {/* Cabeza riendo a carcajadas de felicidad */}
      <rect x="87" y="12" width="6" height="16" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
      <circle cx="90" cy="10" r="8" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
      <rect x="42" y="24" width="96" height="66" rx="28" fill="url(#jmp-chassis)" stroke="#0284C7" strokeWidth="3" />
      <rect x="52" y="38" width="76" height="38" rx="16" fill="#0F172A" stroke="#0369A1" strokeWidth="2" />
      <path d="M68 59 C68 51, 78 51, 78 59" stroke="#38BDF8" strokeWidth="4.2" strokeLinecap="round" fill="none" />
      <path d="M102 59 C102 51, 112 51, 112 59" stroke="#38BDF8" strokeWidth="4.2" strokeLinecap="round" fill="none" />
      <circle cx="62" cy="64" r="3.5" fill="#F472B6" fillOpacity="0.75" />
      <circle cx="118" cy="64" r="3.5" fill="#F472B6" fillOpacity="0.75" />
      <path d="M82 65 Q90 73 98 65" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

/**
 * Componente Principal de Celebración de Racha en Pantalla Completa.
 * Gestiona los 3 Modos solicitados:
 *  - Modo A (Racha 0): Llama dormida con zZz, avatar calentando, mensaje para comenzar hoy.
 *  - Modo B (Celebración en Vivo): Salto, giro 360, "¡Yujuuu!", ignición de fuego y conteo de día en vivo.
 *  - Modo C (Ya reclamada hoy): Fuego encendido y aviso "Ya reclamaste tu racha de hoy".
 */
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

  // Secuencia de animación: si ya está reclamada va directo a 'ignite', si es día 0 a 'ready'
  const [animationPhase, setAnimationPhase] = useState<'jump' | 'ignite' | 'ready'>(
    isAlreadyClaimedMode ? 'ignite' : isZeroStreak ? 'ready' : 'jump'
  );

  // El contador visual: si es en vivo arranca en streakCount - 1 (por ejemplo 0) y sube
  const initialDisplay = isJustCompleted
    ? Math.max(0, streakCount - 1)
    : isZeroStreak
    ? 0
    : streakCount;
  const [displayCount, setDisplayCount] = useState<number>(initialDisplay);
  const [copied, setCopied] = useState<boolean>(false);

  // Días de la semana para el track semanal
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
      // Modo Racha 0: Suave sonido de sueño / descanso y esperar
      setDisplayCount(0);
      setAnimationPhase('ready');
      soundService.playDormant();
      return;
    }

    if (isAlreadyClaimedMode) {
      // Modo Ya Reclamado Hoy: Fuego directamente encendido
      setDisplayCount(streakCount);
      setAnimationPhase('ignite');
      soundService.playToken();
      return;
    }

    // Modo Celebración Activa (Primera vez que se activa hoy o tras completar lección)
    const targetStreak = streakCount;
    const startCount = isJustCompleted ? Math.max(0, targetStreak - 1) : targetStreak;

    setAnimationPhase('jump');
    setDisplayCount(startCount);

    // Grito alegre y júbilo "¡Yujuuu!"
    const timerYujuu = setTimeout(() => {
      soundService.playYujuu();
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.35 },
        colors: ['#38BDF8', '#FDE047', '#F97316', '#22C55E']
      });
    }, 400);

    // Ignición del fuego y conteo de la racha
    const timerIgnite = setTimeout(() => {
      setAnimationPhase('ignite');
      soundService.playStreak();

      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.45 },
        colors: ['#F97316', '#EA580C', '#FDE047', '#FF7A00', '#FFFFFF']
      });

      // El contador rueda hacia el nuevo valor
      setDisplayCount(targetStreak);
      // Guardar que ya se vio la animación de hoy
      storageService.setItem(seenKey, todayStr);
    }, 1300);

    const timerReady = setTimeout(() => {
      setAnimationPhase('ready');
    }, 1900);

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
        .streak-fullscreen-screen {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          max-height: 100dvh;
          z-index: 999999;
          background: radial-gradient(circle at 50% 30%, #1E293B 0%, #0F172A 60%, #090D16 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: clamp(8px, 1.6vh, 18px) 14px clamp(10px, 2vh, 20px);
          box-sizing: border-box;
          color: #FFFFFF;
          overflow-y: auto;
          overflow-x: hidden;
          animation: streakScreenFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes streakScreenFadeIn {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }

        .streak-top-close-btn {
          position: absolute;
          top: clamp(8px, 1.8vh, 16px);
          right: clamp(10px, 2.5vw, 16px);
          background: rgba(255, 255, 255, 0.1);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #E2E8F0;
          cursor: pointer;
          z-index: 100;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .streak-top-close-btn:hover {
          transform: scale(1.08);
          background: rgba(255, 255, 255, 0.18);
        }

        .streak-fire-ambient-glow {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: min(340px, 85vw);
          height: min(340px, 85vw);
          background: radial-gradient(circle, rgba(249, 115, 22, 0.36) 0%, rgba(234, 88, 12, 0.16) 40%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .streak-ambient-spark {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #FDE047;
          border-radius: 50%;
          box-shadow: 0 0 10px #F97316;
          pointer-events: none;
          animation: sparkFloatUp 2.4s ease-in infinite;
        }

        @keyframes sparkFloatUp {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateY(-130px) scale(1.2); opacity: 0; }
        }

        .streak-stage-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 400px;
          flex: 1;
          min-height: 0;
          margin: 0 auto;
          z-index: 10;
        }

        /* ─── ESCENARIO HERO COMPACTO (AVATAR + FUEGO LADO A LADO) ─── */
        .streak-hero-duo {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: clamp(6px, 2.5vw, 14px);
          width: 100%;
          max-width: 340px;
          height: clamp(118px, 21vh, 155px);
          margin: 0 auto 2px;
        }

        .hero-mascot-box {
          position: relative;
          width: clamp(100px, 28vw, 135px);
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
        }

        .hero-flame-box {
          position: relative;
          width: clamp(90px, 26vw, 125px);
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
        }

        .fullbody-byte-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .fullbody-byte-svg {
          width: auto;
          height: 100%;
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          display: block;
        }

        /* ─── ANIMACIÓN SALTO Y GIRO 360 COMPACTA ─── */
        .jumping-anim {
          animation: avatarJumpAndSpin 1.4s cubic-bezier(0.28, 0, 0.2, 1) forwards;
        }

        @keyframes avatarJumpAndSpin {
          0% { transform: translateY(0) scale(1, 1) rotate(0deg); }
          15% { transform: translateY(8px) scale(1.12, 0.88) rotate(0deg); }
          40% { transform: translateY(-38px) scale(0.94, 1.08) rotate(-3deg); }
          60% { transform: translateY(-38px) scale(0.94, 1.08) rotateY(360deg); }
          80% { transform: translateY(6px) scale(1.08, 0.94); }
          100% { transform: translateY(0) scale(1, 1); }
        }

        /* ─── ANIMACIÓN CALENTAMIENTO (RACHA 0) ─── */
        .warming-anim {
          animation: warmUpBob 2s ease-in-out infinite alternate;
        }

        @keyframes warmUpBob {
          0% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-6px) scale(1.02, 0.98) rotate(1deg); }
          100% { transform: translateY(0) rotate(-1deg); }
        }

        /* ─── ANIMACIÓN ORGULLOSO (YA RECLAMADO) ─── */
        .proud-anim {
          animation: proudBreathe 2.4s ease-in-out infinite alternate;
        }

        @keyframes proudBreathe {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-4px) scale(1.02); }
        }

        .avatar-ground-shadow {
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          width: 75%;
          height: 8px;
          background: rgba(9, 13, 22, 0.65);
          border-radius: 50%;
          filter: blur(3px);
          z-index: 1;
        }

        /* ─── LLAMA DORMIDA ZZZ ─── */
        .dormant-flame-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .dormant-flame-svg {
          width: auto;
          height: clamp(75px, 14vh, 105px);
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          animation: dormantBreathe 3s ease-in-out infinite alternate;
        }

        @keyframes dormantBreathe {
          0% { transform: scale(1); }
          100% { transform: scale(1.03, 0.97); }
        }

        .zzz-bubble {
          position: absolute;
          color: #94A3B8;
          font-weight: 900;
          font-family: monospace;
          pointer-events: none;
          animation: zFloat 2.4s ease-in-out infinite;
        }

        .zzz-1 { top: 12px; right: 12px; font-size: 0.9rem; animation-delay: 0s; }
        .zzz-2 { top: 0px; right: 4px; font-size: 1.1rem; animation-delay: 0.8s; }
        .zzz-3 { top: -12px; right: -4px; font-size: 1.3rem; animation-delay: 1.6s; }

        @keyframes zFloat {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          40% { opacity: 0.8; }
          100% { transform: translate(14px, -18px) scale(1.15); opacity: 0; }
        }

        /* ─── BURBUJA DE DIÁLOGO "¡YUJUUU!" ─── */
        .yujuu-speech-bubble {
          position: absolute;
          top: -10px;
          right: -6px;
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
          color: #0F172A;
          border: 2.5px solid #0EA5E9;
          border-bottom: 4.5px solid #0284C7;
          border-radius: 18px;
          padding: 3px 10px;
          font-size: clamp(0.92rem, 3vw, 1.15rem);
          font-weight: 950;
          letter-spacing: -0.02em;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 30;
          animation: yujuuBubblePop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-origin: bottom left;
          white-space: nowrap;
        }

        @keyframes yujuuBubblePop {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          70% { transform: scale(1.12) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .yujuu-speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 14px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid #0284C7;
        }

        /* ─── BURBUJA GENÉRICA DE AVATAR (RACHA 0 Y YA RECLAMADA) ─── */
        .streak-avatar-static-bubble {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #FFFFFF;
          color: #0F172A;
          border: 2px solid #CBD5E1;
          border-bottom: 3.5px solid #94A3B8;
          border-radius: 14px;
          padding: 3px 8px;
          font-size: clamp(0.66rem, 2vw, 0.74rem);
          font-weight: 900;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
          z-index: 30;
          white-space: nowrap;
        }

        .streak-avatar-static-bubble::after {
          content: '';
          position: absolute;
          bottom: -7px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 7px solid #94A3B8;
        }

        /* ─── LLAMA 3D ENCENDIDA ─── */
        .streak-flame-zone {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          height: 100%;
          width: 100%;
          z-index: 20;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .flame-burst-in {
          animation: flameIgnite 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes flameIgnite {
          0% { transform: scale(0.3) translateY(16px); opacity: 0; }
          70% { transform: scale(1.15) translateY(-4px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        .duo-flame-3d-svg {
          width: auto;
          height: clamp(80px, 15vh, 115px);
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          filter: drop-shadow(0 10px 18px rgba(234, 88, 12, 0.7));
          transform-origin: 50% 90%;
          animation: fluidFlameDance 1.8s ease-in-out infinite alternate;
        }

        @keyframes fluidFlameDance {
          0% { transform: scale(1) rotate(-1.5deg); }
          50% { transform: scale(1.05, 0.96) rotate(1.5deg); }
          100% { transform: scale(0.98, 1.04) rotate(-0.8deg); }
        }

        .streak-counter-pill-3d {
          margin-top: -10px;
          background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
          color: #EA580C;
          border: 2.5px solid #C2410C;
          border-bottom: 4.5px solid #9A3412;
          border-radius: 9999px;
          padding: 2px 14px;
          font-size: clamp(1.15rem, 3.6vw, 1.5rem);
          font-weight: 950;
          line-height: 1.1;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          z-index: 25;
          animation: counterBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .streak-counter-pill-zero {
          color: #64748B;
          border-color: #64748B;
          border-bottom-color: #475569;
        }

        @keyframes counterBounce {
          0% { transform: scale(0.7); }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .streak-hero-title {
          font-size: clamp(1.25rem, 3.8vw, 1.7rem);
          font-weight: 950;
          margin: 3px 0 2px;
          letter-spacing: -0.02em;
          text-align: center;
          line-height: 1.15;
          color: #FFFFFF;
        }

        .streak-hero-title.day0 {
          color: #38BDF8;
        }

        .streak-hero-title.claimed {
          color: #FDE047;
        }

        .streak-hero-desc {
          font-size: clamp(0.72rem, 2.2vw, 0.84rem);
          color: #CBD5E1;
          margin: 0 0 5px;
          text-align: center;
          max-width: 340px;
          line-height: 1.3;
        }

        .streak-weekly-board {
          width: 100%;
          max-width: 360px;
          background: rgba(15, 23, 42, 0.88);
          border: 1.5px solid #334155;
          border-bottom: 3.5px solid #1E293B;
          border-radius: 16px;
          padding: 6px 8px;
          margin: 2px 0 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
          box-sizing: border-box;
        }

        .streak-day-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          flex: 1;
        }

        .streak-day-label {
          font-size: clamp(0.62rem, 1.8vw, 0.7rem);
          font-weight: 800;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .streak-day-badge-circle {
          width: clamp(26px, 7.2vw, 32px);
          height: clamp(26px, 7.2vw, 32px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(0.7rem, 2vw, 0.8rem);
          font-weight: 900;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .day-ignited-today {
          background: linear-gradient(180deg, #FDE047 0%, #F97316 100%);
          border: 2px solid #FFFBEB;
          box-shadow: 0 3px 0 #C2410C, 0 0 16px rgba(253, 224, 71, 0.9);
          color: #7C2D12;
          transform: scale(1.12);
        }

        .day-active-past {
          background: linear-gradient(180deg, #F97316 0%, #EA580C 100%);
          border: 1.5px solid #FDBA74;
          box-shadow: 0 2.5px 0 #C2410C, 0 0 10px rgba(249, 115, 22, 0.5);
          color: #FFFFFF;
        }

        .day-today-pending {
          background: #1E293B;
          border: 2px dashed #F59E0B;
          color: #F59E0B;
          animation: pendingDayPulse 1.8s ease-in-out infinite;
        }

        @keyframes pendingDayPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(245, 158, 11, 0); }
          50% { transform: scale(1.06); box-shadow: 0 0 10px rgba(245, 158, 11, 0.4); }
        }

        .day-inactive {
          background: #1E293B;
          border: 1.5px solid #334155;
          color: #64748B;
        }

        /* ─── ESTILOS DÍA 0: TARJETA 3D HORIZONTAL COMPACTA ─── */
        .day0-steps-card {
          width: 100%;
          max-width: 350px;
          background: rgba(15, 23, 42, 0.88);
          border: 1.5px solid #334155;
          border-bottom: 3.5px solid #1E293B;
          border-radius: 14px;
          padding: 5px 10px;
          margin: 2px 0 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          box-sizing: border-box;
        }

        .day0-step-col {
          display: flex;
          align-items: center;
          gap: 7px;
          flex: 1;
        }

        .day0-step-pill {
          width: 22px;
          height: 22px;
          min-width: 22px;
          border-radius: 50%;
          background: #334155;
          color: #94A3B8;
          font-size: 0.74rem;
          font-weight: 950;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #475569;
        }

        .day0-step-pill.highlight {
          background: #0284C7;
          color: #FFFFFF;
          border-color: #38BDF8;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
        }

        .day0-step-info {
          display: flex;
          flex-direction: column;
          text-align: left;
          line-height: 1.15;
        }

        .day0-step-header {
          font-size: 0.74rem;
          font-weight: 900;
          color: #F8FAFC;
          white-space: nowrap;
        }

        .day0-step-desc {
          font-size: 0.64rem;
          color: #94A3B8;
          font-weight: 600;
          white-space: nowrap;
        }

        .day0-step-arrow {
          color: #64748B;
          font-weight: 900;
          font-size: 0.88rem;
          flex-shrink: 0;
        }

        .day-today-target {
          border: 2px dashed #38BDF8 !important;
          color: #38BDF8 !important;
          animation: targetDayPulse 1.6s ease-in-out infinite alternate !important;
        }

        @keyframes targetDayPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 rgba(56, 189, 248, 0); }
          100% { transform: scale(1.1); box-shadow: 0 0 12px rgba(56, 189, 248, 0.6); }
        }

        .streak-tip-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(30, 41, 59, 0.9);
          border: 1.5px solid #475569;
          border-radius: 9999px;
          padding: 3px 10px;
          font-size: clamp(0.66rem, 1.9vw, 0.73rem);
          color: #E2E8F0;
          font-weight: 700;
          max-width: 360px;
          text-align: center;
          line-height: 1.2;
          box-sizing: border-box;
          margin: 2px 0;
        }

        .streak-bottom-actions {
          width: 100%;
          max-width: 360px;
          display: flex;
          gap: 10px;
          z-index: 10;
          margin-top: 4px;
          box-sizing: border-box;
        }

        .streak-share-btn {
          padding: clamp(9px, 1.6vh, 13px) clamp(14px, 3.5vw, 18px) !important;
          font-size: 0.9rem !important;
          min-width: auto !important;
          color: #F97316 !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .streak-continue-btn {
          flex: 1;
          padding: clamp(9px, 1.6vh, 13px) 18px !important;
          font-size: clamp(0.92rem, 3.2vw, 1.02rem) !important;
          font-weight: 950 !important;
          letter-spacing: 0.03em !important;
          text-transform: uppercase !important;
        }
      `}</style>

      {/* Botón X superior para cerrar */}
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
        <X size={18} strokeWidth={2.8} />
      </button>

      {/* Resplandor ambiental cálido (solo si hay fuego encendido) */}
      {!isZeroStreak && (
        <>
          <div
            className="streak-fire-ambient-glow"
            style={{
              opacity: animationPhase !== 'jump' ? 1 : 0.4,
              transform: `translateX(-50%) scale(${animationPhase !== 'jump' ? '1.08' : '0.85'})`
            }}
          />
          <div className="streak-ambient-spark" style={{ left: '20%', bottom: '35%', animationDelay: '0s' }} />
          <div className="streak-ambient-spark" style={{ left: '78%', bottom: '40%', animationDelay: '0.8s' }} />
          <div className="streak-ambient-spark" style={{ left: '50%', bottom: '30%', animationDelay: '1.5s' }} />
        </>
      )}

      {/* ════ ESCENARIO CENTRAL SEGÚN EL MODO ════ */}
      <div className="streak-stage-center">
        {/* ESCENARIO HERO COMPACTO (AVATAR + FUEGO LADO A LADO) */}
        <div className="streak-hero-duo">
          {/* COLUMNA AVATAR BYTE */}
          <div className="hero-mascot-box">
            {/* MODO A: Racha 0 (El avatar estirando listo para empezar) */}
            {isZeroStreak && (
              <>
                <div className="streak-avatar-static-bubble">
                  <span>¡A calentar! 💤</span>
                </div>
                <div className="avatar-ground-shadow" />
                <FullBodyWarmingByte />
              </>
            )}

            {/* MODO C: Ya reclamada hoy (Avatar orgulloso con pulgar arriba) */}
            {isAlreadyClaimedMode && (
              <>
                <div className="streak-avatar-static-bubble">
                  <span>¡Racha al día! 🔥</span>
                </div>
                <div className="avatar-ground-shadow" />
                <FullBodyProudByte />
              </>
            )}

            {/* MODO B: Celebración en vivo (Salto 360 y "¡Yujuuu!") */}
            {!isZeroStreak && !isAlreadyClaimedMode && (
              <>
                {animationPhase === 'jump' && (
                  <div className="yujuu-speech-bubble">
                    <span>¡Yujuuu!</span>
                    <span>🎉</span>
                  </div>
                )}
                <div className="avatar-ground-shadow" />
                <FullBodyJumpingByte />
              </>
            )}
          </div>

          {/* COLUMNA FUEGO / CHISPA 3D */}
          <div className="hero-flame-box">
            {isZeroStreak ? (
              /* En Racha 0: Llama dormida con zZz */
              <div className="streak-flame-zone">
                <DormantSleepingFlameSVG />
                <div className="streak-counter-pill-3d streak-counter-pill-zero">
                  <Flame size={17} fill="#64748B" color="#64748B" />
                  <span>0</span>
                </div>
              </div>
            ) : (
              /* En Racha > 0: Llama 3D encendida vibrante */
              <div className={`streak-flame-zone ${animationPhase !== 'jump' ? 'flame-burst-in' : ''}`}>
                <svg
                  className="duo-flame-3d-svg"
                  viewBox="0 0 120 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="fullDuoFlameOuter" x1="60" y1="10" x2="60" y2="135" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF7A00" />
                      <stop offset="60%" stopColor="#EA580C" />
                      <stop offset="100%" stopColor="#9A3412" />
                    </linearGradient>
                    <linearGradient id="fullDuoFlameMid" x1="60" y1="35" x2="60" y2="125" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FACC15" />
                      <stop offset="50%" stopColor="#FB923C" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>
                    <linearGradient id="fullDuoFlameInner" x1="60" y1="65" x2="60" y2="120" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#FEF08A" />
                      <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                  </defs>

                  <ellipse cx="60" cy="132" rx="38" ry="7" fill="#090D16" fillOpacity="0.4" />
                  <path
                    d="M60 10 C62 30 76 42 86 54 C98 68 104 84 104 100 C104 122 84 134 60 134 C36 134 16 122 16 100 C16 78 26 62 42 46 C48 40 54 28 60 10 Z"
                    fill="url(#fullDuoFlameOuter)"
                    stroke="#C2410C"
                    strokeWidth="3.2"
                  />
                  <path
                    d="M74 48 C88 64 96 82 88 102 C84 112 76 118 68 122 C84 116 94 98 88 80 C84 70 78 60 74 48 Z"
                    fill="#F97316"
                    fillOpacity="0.8"
                  />
                  <path
                    d="M60 38 C64 52 74 62 82 72 C90 82 92 94 90 108 C86 122 74 128 60 128 C46 128 34 122 30 108 C28 94 30 82 38 72 C46 62 56 52 60 38 Z"
                    fill="url(#fullDuoFlameMid)"
                    stroke="#EA580C"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M60 68 C63 76 70 82 74 88 C78 96 78 104 74 112 C70 120 64 122 60 122 C56 122 50 120 46 112 C42 104 42 96 46 88 C50 82 57 76 60 68 Z"
                    fill="url(#fullDuoFlameInner)"
                  />
                  <ellipse cx="50" cy="95" rx="3.5" ry="5" fill="#7C2D12" />
                  <ellipse cx="70" cy="95" rx="3.5" ry="5" fill="#7C2D12" />
                  <circle cx="51.5" cy="93.5" r="1.5" fill="#FFFFFF" />
                  <circle cx="71.5" cy="93.5" r="1.5" fill="#FFFFFF" />
                  <path d="M54 104 Q60 110 66 104" stroke="#7C2D12" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                </svg>

                <div className="streak-counter-pill-3d">
                  <Flame size={17} fill="#EA580C" color="#EA580C" />
                  <span>{displayCount}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ═══ TÍTULO Y TEXTOS SEGÚN EL MODO ═══ */}
        {isZeroStreak ? (
          <>
            <h1 className="streak-hero-title day0">
              ¡Día 0 de Racha!
            </h1>
            <p className="streak-hero-desc">
              Tu fuego aún duerme. Completa 1 lección hoy para encender la chispa y vuelve mañana para activar tu racha.
            </p>

            {/* Tarjeta 3D Horizontal de 2 Pasos para Activar la Racha */}
            <div className="day0-steps-card">
              <div className="day0-step-col">
                <div className="day0-step-pill">1</div>
                <div className="day0-step-info">
                  <span className="day0-step-header">Completa 1 lección</span>
                  <span className="day0-step-desc">Enciende tu chispa hoy</span>
                </div>
              </div>
              <div className="day0-step-arrow">➔</div>
              <div className="day0-step-col">
                <div className="day0-step-pill highlight">2</div>
                <div className="day0-step-info">
                  <span className="day0-step-header">Vuelve mañana</span>
                  <span className="day0-step-desc">¡Activa tu racha!</span>
                </div>
              </div>
            </div>
          </>
        ) : isAlreadyClaimedMode ? (
          <>
            <h1 className="streak-hero-title claimed">
              ¡Ya reclamaste tu racha!
            </h1>
            <p className="streak-hero-desc">
              ¡Llevas {streakCount} {streakCount === 1 ? 'día consecutivo' : 'días consecutivos'}! Vuelve mañana para sumar tu día {streakCount + 1}.
            </p>
          </>
        ) : (
          <>
            <h1 className="streak-hero-title">
              {displayCount === 1 ? '¡1 Día de Racha!' : `¡${displayCount} Días de Racha!`}
            </h1>
            <p className="streak-hero-desc">
              {displayCount > 1
                ? '¡La llama sigue viva! Tu constancia diaria fortalece tu lógica.'
                : '¡Has encendido tu primera chispa! Vuelve mañana para alcanzar 2 días.'}
            </p>
          </>
        )}

        {/* ═══ TRACK SEMANAL DE DÍAS (L a D) ═══ */}
        <div className="streak-weekly-board">
          {daysOfWeek.map((day, idx) => {
            const isToday = idx === currentDayIndex;
            const isPast = idx < currentDayIndex;
            const hasPracticedToday = user.streak?.lastActivityDate === todayStr && (user.streak?.count || 0) > 0;
            const isTodayIgnited = isToday && (isAlreadyClaimedMode || (isJustCompleted ? animationPhase !== 'jump' : hasPracticedToday));
            const isPastActive = isPast && streakCount > (currentDayIndex - idx);
            const isActive = isPastActive || isTodayIgnited;

            let circleClass = 'day-inactive';
            if (isZeroStreak && isToday) {
              circleClass = 'day-today-target';
            } else if (isTodayIgnited) {
              circleClass = 'day-ignited-today';
            } else if (isToday && !isTodayIgnited) {
              circleClass = 'day-today-pending';
            } else if (isActive) {
              circleClass = 'day-active-past';
            }

            return (
              <div key={day.name} className="streak-day-box">
                <span
                  className="streak-day-label"
                  style={{
                    color: isToday ? (isZeroStreak ? '#38BDF8' : '#F59E0B') : '#94A3B8'
                  }}
                >
                  {isToday ? 'Hoy' : day.label}
                </span>
                <div className={`streak-day-badge-circle ${circleClass}`}>
                  {isActive ? (
                    <Flame size={15} fill="#FFFFFF" color="#FFFFFF" />
                  ) : isZeroStreak && isToday ? (
                    <Sparkles size={15} color="#38BDF8" />
                  ) : (
                    <span>{day.label}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Estado de Protector de Racha */}
        <div className="streak-tip-pill">
          <ShieldCheck size={15} color={user.streak?.freezeEquipped ? '#22C55E' : '#94A3B8'} strokeWidth={2.5} style={{ flexShrink: 0 }} />
          <span>
            {isZeroStreak
              ? 'Consejo: Vuelve mañana tras jugar para no perder tu racha.'
              : user.streak?.freezeEquipped
              ? 'Protector de racha equipado (te salvará 1 día de falta)'
              : 'Consejo: Si faltas 1 día sin protector, tu racha se reiniciará.'}
          </span>
        </div>
      </div>

      {/* ═══ BOTONES INFERIORES DUOLINGO 3D ═══ */}
      <div className="streak-bottom-actions">
        {!isZeroStreak && (
          <button
            className="btn-3d btn-outline streak-share-btn"
            onClick={handleShare}
            title="Compartir Racha"
            type="button"
          >
            {copied ? <Check size={18} color="#22C55E" /> : <Share2 size={18} />}
          </button>
        )}

        <button
          className="btn-3d btn-green streak-continue-btn"
          onClick={() => {
            soundService.playToken();
            onClose();
          }}
          type="button"
        >
          {isZeroStreak ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              ¡A JUGAR AHORA! <ArrowRight size={18} strokeWidth={3} />
            </span>
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
