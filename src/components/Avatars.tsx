import React from 'react';
import { ConsoleDevAvatar } from './ConsoleAvatar';

export { ConsoleDevAvatar };

interface AvatarProps {
  size?: number;
  className?: string;
}

/**
 * 1. Byte el Robot: Compañero androide 3D estilo juguete tangible Duolingo (0% Neón / 0% IA).
 * Casco redondeado celeste, antena 3D con orbe dorado, auriculares y ojos brillantes.
 */
export const ByteBotAvatar: React.FC<AvatarProps & { skinId?: string }> = ({ size = 48, className = '', skinId = 'byte_classic' }) => {
  // Paletas según la Skin equipada
  const getSkinColors = () => {
    switch (skinId) {
      case 'byte_student':
        return { c1: '#38BDF8', c2: '#0284C7', c3: '#0369A1', orb: '#F59E0B', border: '#7DD3FC', bg1: '#F0F9FF', bg2: '#BAE6FD' };
      case 'byte_pixel':
        return { c1: '#34D399', c2: '#059669', c3: '#047857', orb: '#FACC15', border: '#6EE7B7', bg1: '#ECFDF5', bg2: '#A7F3D0' };
      case 'byte_cyberpunk':
        return { c1: '#7C3AED', c2: '#6D28D9', c3: '#4C1D95', orb: '#10B981', border: '#C084FC', bg1: '#FAF5FF', bg2: '#E9D5FF' };
      case 'byte_athlete':
        return { c1: '#EF4444', c2: '#DC2626', c3: '#B91C1C', orb: '#F59E0B', border: '#FCA5A5', bg1: '#FEF2F2', bg2: '#FECACA' };
      case 'byte_steampunk':
        return { c1: '#D97706', c2: '#B45309', c3: '#78350F', orb: '#FBBF24', border: '#FDE68A', bg1: '#FFFBEB', bg2: '#FDE68A' };
      case 'byte_ninja':
        return { c1: '#475569', c2: '#1E293B', c3: '#0F172A', orb: '#38BDF8', border: '#64748B', bg1: '#F1F5F9', bg2: '#CBD5E1' };
      case 'byte_senior':
        return { c1: '#EA580C', c2: '#C2410C', c3: '#9A3412', orb: '#FACC15', border: '#FDBA74', bg1: '#FFF7ED', bg2: '#FED7AA' };
      case 'byte_wizard':
        return { c1: '#2563EB', c2: '#1D4ED8', c3: '#1E40AF', orb: '#FBBF24', border: '#93C5FD', bg1: '#EFF6FF', bg2: '#BFDBFE' };
      case 'byte_samurai':
        return { c1: '#DC2626', c2: '#B91C1C', c3: '#991B1B', orb: '#F59E0B', border: '#F87171', bg1: '#FEF2F2', bg2: '#FECACA' };
      case 'byte_dragon':
        return { c1: '#B91C1C', c2: '#991B1B', c3: '#450A0A', orb: '#F97316', border: '#F87171', bg1: '#450A0A', bg2: '#7F1D1D' };
      case 'byte_astronaut':
        return { c1: '#F8FAFC', c2: '#E2E8F0', c3: '#94A3B8', orb: '#38BDF8', border: '#CBD5E1', bg1: '#F8FAFC', bg2: '#E2E8F0' };
      case 'byte_mecha_valkyrie':
        return { c1: '#FB7185', c2: '#E11D48', c3: '#881337', orb: '#F472B6', border: '#FDA4AF', bg1: '#FFF1F2', bg2: '#FECDD3' };
      case 'byte_titan_gold':
        return { c1: '#FDE047', c2: '#F59E0B', c3: '#B45309', orb: '#FEF08A', border: '#FDE047', bg1: '#FEF9C3', bg2: '#FEF08A' };
      case 'byte_classic':
      default:
        return { c1: '#38BDF8', c2: '#0EA5E9', c3: '#0284C7', orb: '#FBBF24', border: '#7DD3FC', bg1: '#F0F9FF', bg2: '#BAE6FD' };
    }
  };

  const sc = getSkinColors();

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={`byte-bg-${skinId}`} x1="50" y1="2" x2="50" y2="98" gradientUnits="userSpaceOnUse">
          <stop stopColor={sc.bg1} />
          <stop offset="100%" stopColor={sc.bg2} />
        </linearGradient>
        <linearGradient id={`byte-chassis-${skinId}`} x1="24" y1="20" x2="76" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor={sc.c1} />
          <stop offset="50%" stopColor={sc.c2} />
          <stop offset="100%" stopColor={sc.c3} />
        </linearGradient>
        <linearGradient id={`byte-visor-${skinId}`} x1="30" y1="32" x2="70" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <radialGradient id={`byte-gold-${skinId}`} cx="40%" cy="35%" r="65%">
          <stop stopColor="#FFFBEB" />
          <stop offset="40%" stopColor={sc.orb} />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
        <linearGradient id={`byte-ear-${skinId}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={sc.c3} />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>

      {/* Fondo base circular 3D */}
      <circle cx="50" cy="50" r="47" fill={`url(#byte-bg-${skinId})`} stroke={sc.border} strokeWidth="2.5" />
      <ellipse cx="50" cy="91" rx="28" ry="4" fill={sc.c3} fillOpacity="0.22" />

    {/* Antena 3D con esfera de oro */}
    <rect x="47" y="10" width="6" height="12" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
    <circle cx="50" cy="8" r="6" fill="url(#byte-gold)" stroke="#B45309" strokeWidth="1.2" />
    <circle cx="48" cy="6" r="2" fill="#FFFFFF" fillOpacity="0.8" />

    {/* Auriculares 3D con almohadillas redondeadas */}
    <rect x="15" y="34" width="8" height="22" rx="4" fill="url(#byte-ear)" stroke="#0284C7" strokeWidth="1.2" />
    <circle cx="19" cy="45" r="2" fill="#22C55E" />
    <rect x="77" y="34" width="8" height="22" rx="4" fill="url(#byte-ear)" stroke="#0284C7" strokeWidth="1.2" />
    <circle cx="81" cy="45" r="2" fill="#22C55E" />

    {/* Casco / Cabeza esférica 3D */}
    <rect x="22" y="18" width="56" height="52" rx="22" fill="url(#byte-chassis)" stroke="#0284C7" strokeWidth="2.5" />
    {/* Reflejo especular curvo */}
    <path d="M28 24 C40 20 60 20 72 24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.75" />

    {/* Visor 3D oscuro y lustroso */}
    <rect x="28" y="30" width="44" height="28" rx="12" fill="url(#byte-visor)" stroke="#0369A1" strokeWidth="1.5" />
    {/* Reflejo de cristal en el visor */}
    <path d="M32 32 L48 32 L38 56 L32 56 Z" fill="#FFFFFF" fillOpacity="0.08" />

    {/* Ojos expresivos grandes y tiernos estilo Duolingo */}
    <ellipse cx="40" cy="42" rx="4.5" ry="6" fill="#38BDF8" />
    <ellipse cx="40" cy="42" rx="3.5" ry="4.5" fill="#0EA5E9" />
    <circle cx="41.5" cy="40" r="1.8" fill="#FFFFFF" />

    <ellipse cx="60" cy="42" rx="4.5" ry="6" fill="#38BDF8" />
    <ellipse cx="60" cy="42" rx="3.5" ry="4.5" fill="#0EA5E9" />
    <circle cx="61.5" cy="40" r="1.8" fill="#FFFFFF" />

    {/* Mejillas sonrosadas digitales */}
    <circle cx="33" cy="48" r="2.5" fill="#F472B6" fillOpacity="0.6" />
    <circle cx="67" cy="48" r="2.5" fill="#F472B6" fillOpacity="0.6" />

    {/* Sonrisa amigable */}
    <path d="M44 49 Q50 54 56 49" stroke="#38BDF8" strokeWidth="2.4" strokeLinecap="round" fill="none" />

    {/* Cuello y armadura de pecho con botón de energía verde */}
    <path d="M34 70 L66 70 L74 96 L26 96 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
    <rect x="42" y="76" width="16" height="12" rx="6" fill="#0369A1" />
    <circle cx="50" cy="82" r="4" fill="#22C55E" />
    </svg>
  );
};

/**
 * 2. Ada la Coder: Programadora audaz, sudadera 3D coral, gafas de montura gruesa y headset gamer.
 */
export const AdaHackerAvatar: React.FC<AvatarProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ada-bg" x1="50" y1="2" x2="50" y2="98" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF1F2" />
        <stop offset="100%" stopColor="#FECDD3" />
      </linearGradient>
      <linearGradient id="ada-hoodie" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB7185" />
        <stop offset="50%" stopColor="#E11D48" />
        <stop offset="100%" stopColor="#9F1239" />
      </linearGradient>
      <linearGradient id="ada-skin" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FED7AA" />
        <stop offset="100%" stopColor="#FDBA74" />
      </linearGradient>
    </defs>

    {/* Fondo base circular 3D */}
    <circle cx="50" cy="50" r="47" fill="url(#ada-bg)" stroke="#FDA4AF" strokeWidth="2.5" />
    <ellipse cx="50" cy="91" rx="28" ry="4" fill="#BE123C" fillOpacity="0.22" />

    {/* Capucha 3D envolvente */}
    <path d="M20 48 C20 16 80 16 80 48 C80 76 76 88 76 88 L24 88 C24 88 20 76 20 48 Z" fill="url(#ada-hoodie)" stroke="#9F1239" strokeWidth="2.2" />
    {/* Borde exterior de la capucha con brillo */}
    <path d="M24 46 C24 22 76 22 76 46" stroke="#FDA4AF" strokeWidth="2" fill="none" />

    {/* Rostro redondeado suave 3D */}
    <rect x="30" y="34" width="40" height="38" rx="16" fill="url(#ada-skin)" />

    {/* Cabello / Mechones morados estilizados */}
    <path d="M26 38 C34 26 66 28 74 38 C62 40 54 35 44 40 Z" fill="#881337" />

    {/* Gafas de código gruesas 3D estilo hipster coder */}
    <rect x="31" y="40" width="17" height="14" rx="4.5" fill="#0F172A" stroke="#E11D48" strokeWidth="2.2" />
    <rect x="52" y="40" width="17" height="14" rx="4.5" fill="#0F172A" stroke="#E11D48" strokeWidth="2.2" />
    <line x1="48" y1="46" x2="52" y2="46" stroke="#E11D48" strokeWidth="2.5" />

    {/* Ojos expresivos detrás de los lentes */}
    <circle cx="39.5" cy="46" r="3" fill="#38BDF8" />
    <circle cx="40.5" cy="45" r="1.2" fill="#FFFFFF" />
    <circle cx="60.5" cy="46" r="3" fill="#38BDF8" />
    <circle cx="61.5" cy="45" r="1.2" fill="#FFFFFF" />

    {/* Mejillas sonrosadas */}
    <circle cx="34" cy="58" r="3" fill="#FB7185" fillOpacity="0.8" />
    <circle cx="66" cy="58" r="3" fill="#FB7185" fillOpacity="0.8" />

    {/* Sonrisa audaz y simpática */}
    <path d="M44 60 Q50 65 56 60" stroke="#9F1239" strokeWidth="2.2" strokeLinecap="round" fill="none" />

    {/* Headset gamer 3D con micrófono */}
    <path d="M21 42 C21 21 79 21 79 42" stroke="#FB7185" strokeWidth="3" fill="none" />
    <rect x="18" y="38" width="6" height="16" rx="3" fill="#BE123C" stroke="#FB7185" strokeWidth="1" />
    <rect x="76" y="38" width="6" height="16" rx="3" fill="#BE123C" stroke="#FB7185" strokeWidth="1" />
    <path d="M78 50 Q82 64 70 65" stroke="#FB7185" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="70" cy="65" r="2.2" fill="#22C55E" />

    {/* Pecho de sudadera con cordones */}
    <path d="M24 78 L76 78 L86 98 L14 98 Z" fill="#9F1239" stroke="#881337" strokeWidth="1.5" />
    <circle cx="46" cy="84" r="1.5" fill="#FFFFFF" />
    <line x1="46" y1="86" x2="46" y2="94" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="54" cy="84" r="1.5" fill="#FFFFFF" />
    <line x1="54" y1="86" x2="54" y2="94" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * 3. Linus el Coder: Pingüino desarrollador 3D con gafas de montura redonda y corbata verde Duolingo.
 */
export const LinusDevAvatar: React.FC<AvatarProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="linus-bg" x1="50" y1="2" x2="50" y2="98" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F0FDF4" />
        <stop offset="100%" stopColor="#DCFCE7" />
      </linearGradient>
      <linearGradient id="linus-body" x1="30" y1="20" x2="70" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#334155" />
        <stop offset="60%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="linus-belly" x1="50" y1="50" x2="50" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F1F5F9" />
      </linearGradient>
      <linearGradient id="linus-tie" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
    </defs>

    {/* Fondo base circular 3D */}
    <circle cx="50" cy="50" r="47" fill="url(#linus-bg)" stroke="#86EFAC" strokeWidth="2.5" />
    <ellipse cx="50" cy="91" rx="28" ry="4" fill="#15803D" fillOpacity="0.22" />

    {/* Cuerpo pingüino 3D suave */}
    <ellipse cx="50" cy="56" rx="29" ry="34" fill="url(#linus-body)" stroke="#0F172A" strokeWidth="2" />
    {/* Vientre blanco limpio */}
    <ellipse cx="50" cy="64" rx="20" ry="24" fill="url(#linus-belly)" />

    {/* Aletas laterales */}
    <path d="M22 52 C16 60 16 72 24 76 C26 77 28 68 28 60 Z" fill="#1E293B" />
    <path d="M78 52 C84 60 84 72 76 76 C74 77 72 68 72 60 Z" fill="#1E293B" />

    {/* Gafas inteligentes de programador (gruesas y simpáticas) */}
    <circle cx="39" cy="43" r="8.5" fill="#0F172A" stroke="#10B981" strokeWidth="2.4" />
    <circle cx="61" cy="43" r="8.5" fill="#0F172A" stroke="#10B981" strokeWidth="2.4" />
    <line x1="47.5" y1="43" x2="52.5" y2="43" stroke="#10B981" strokeWidth="2.5" />

    {/* Ojos brillantes en las gafas */}
    <circle cx="39" cy="43" r="4" fill="#34D399" />
    <circle cx="40.5" cy="41.5" r="1.5" fill="#FFFFFF" />
    <circle cx="61" cy="43" r="4" fill="#34D399" />
    <circle cx="62.5" cy="41.5" r="1.5" fill="#FFFFFF" />

    {/* Pico naranja 3D de pingüino */}
    <path d="M44 51 Q50 49 56 51 Q50 62 44 51 Z" fill="#FF9600" stroke="#D97706" strokeWidth="1.8" />
    <path d="M47 51 Q50 50 53 51" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />

    {/* Corbata verde Duolingo con nudo 3D */}
    <polygon points="46,63 54,63 52,67 48,67" fill="#16A34A" />
    <path d="M47 67 L53 67 L56 86 L50 91 L44 86 Z" fill="url(#linus-tie)" stroke="#166534" strokeWidth="1.2" />
    {/* Pines en la corbata */}
    <circle cx="50" cy="74" r="1.8" fill="#FACC15" />
    <circle cx="50" cy="81" r="1.8" fill="#38BDF8" />
  </svg>
);

/**
 * 4. Turing el Sabio: Arquitecto de algoritmos 3D con cabello de nube plateada, gafas doradas y túnica.
 */
export const TuringSageAvatar: React.FC<AvatarProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="turing-bg" x1="50" y1="2" x2="50" y2="98" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FAF5FF" />
        <stop offset="100%" stopColor="#F3E8FF" />
      </linearGradient>
      <linearGradient id="turing-robe" x1="20" y1="60" x2="80" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7E22CE" />
        <stop offset="100%" stopColor="#581C87" />
      </linearGradient>
      <linearGradient id="turing-hair" x1="30" y1="20" x2="70" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
    </defs>

    {/* Fondo base circular 3D */}
    <circle cx="50" cy="50" r="47" fill="url(#turing-bg)" stroke="#D8B4FE" strokeWidth="2.5" />
    <ellipse cx="50" cy="91" rx="28" ry="4" fill="#6B21A8" fillOpacity="0.22" />

    {/* Cabello sabio plateado 3D */}
    <circle cx="34" cy="38" r="14" fill="url(#turing-hair)" />
    <circle cx="66" cy="38" r="14" fill="url(#turing-hair)" />
    <ellipse cx="50" cy="36" rx="24" ry="18" fill="url(#turing-hair)" />

    {/* Rostro sabio sonriente */}
    <ellipse cx="50" cy="46" rx="19" ry="18" fill="#FED7AA" />

    {/* Barba nube suave 3D */}
    <path d="M34 50 C30 62 38 72 50 72 C62 72 70 62 66 50 Z" fill="url(#turing-hair)" stroke="#CBD5E1" strokeWidth="1" />

    {/* Gafas doradas redondas de erudito */}
    <circle cx="41" cy="44" r="7" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="2.2" />
    <circle cx="59" cy="44" r="7" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="2.2" />
    <line x1="48" y1="44" x2="52" y2="44" stroke="#F59E0B" strokeWidth="2.2" />

    {/* Ojos sabios con brillo */}
    <circle cx="41" cy="44" r="3" fill="#A855F7" />
    <circle cx="42" cy="43" r="1.2" fill="#FFFFFF" />
    <circle cx="59" cy="44" r="3" fill="#A855F7" />
    <circle cx="60" cy="43" r="1.2" fill="#FFFFFF" />

    {/* Sonrisa amable en la barba */}
    <path d="M46 56 Q50 60 54 56" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Túnica cuántica con broche de oro */}
    <path d="M26 74 L74 74 L84 98 L16 98 Z" fill="url(#turing-robe)" stroke="#3B0764" strokeWidth="1.5" />
    <circle cx="50" cy="80" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
    <circle cx="51" cy="79" r="1.5" fill="#FFFFFF" />
  </svg>
);

/**
 * 5. Consola Dev: Terminal interactiva 3D con visor CRT, auriculares y sonrisa digital.
 */
export const ConsoleMascotAvatar: React.FC<AvatarProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="cmd-bg" x1="50" y1="2" x2="50" y2="98" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F0FDF4" />
        <stop offset="100%" stopColor="#D1FAE5" />
      </linearGradient>
      <linearGradient id="cmd-body" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="60%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="cmd-screen" x1="28" y1="30" x2="72" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#064E3B" />
        <stop offset="100%" stopColor="#022C22" />
      </linearGradient>
    </defs>

    {/* Fondo base circular 3D */}
    <circle cx="50" cy="50" r="47" fill="url(#cmd-bg)" stroke="#6EE7B7" strokeWidth="2.5" />
    <ellipse cx="50" cy="91" rx="28" ry="4" fill="#047857" fillOpacity="0.22" />

    {/* Antena mini */}
    <rect x="47" y="10" width="6" height="10" rx="3" fill="#94A3B8" />
    <circle cx="50" cy="8" r="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />

    {/* Chasis monitor retro-moderno 3D */}
    <rect x="20" y="18" width="60" height="50" rx="16" fill="url(#cmd-body)" stroke="#047857" strokeWidth="2.2" />
    <path d="M26 22 L74 22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />

    {/* Pantalla CRT 3D */}
    <rect x="27" y="26" width="46" height="34" rx="10" fill="url(#cmd-screen)" stroke="#047857" strokeWidth="1.5" />

    {/* Ojos de terminal felices */}
    <path d="M36 39 C36 36, 44 36, 44 39" stroke="#34D399" strokeWidth="2.8" strokeLinecap="round" fill="none" />
    <path d="M56 39 C56 36, 64 36, 64 39" stroke="#34D399" strokeWidth="2.8" strokeLinecap="round" fill="none" />

    {/* Sonrisa digital */}
    <path d="M46 48 Q50 52 54 48" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" fill="none" />

    {/* Base y soporte */}
    <rect x="42" y="68" width="16" height="10" fill="#065F46" />
    <rect x="32" y="76" width="36" height="8" rx="4" fill="#047857" stroke="#065F46" strokeWidth="1.2" />
    <rect x="34" y="84" width="32" height="10" rx="4" fill="#10B981" />
  </svg>
);

// Selector Centralizado de Avatar por Identificador Único
export const DevAvatar: React.FC<{ avatarId: string; size?: number; className?: string }> = ({
  avatarId,
  size = 48,
  className = ''
}) => {
  if (avatarId && avatarId.startsWith('byte_')) {
    return <ByteBotAvatar size={size} className={className} skinId={avatarId} />;
  }

  switch (avatarId) {
    case 'console_dev':
      return <ConsoleMascotAvatar size={size} className={className} />;
    case 'robot_byte':
      return <ByteBotAvatar size={size} className={className} skinId="byte_classic" />;
    case 'ada_hacker':
      return <AdaHackerAvatar size={size} className={className} />;
    case 'linus_coder':
      return <LinusDevAvatar size={size} className={className} />;
    case 'turing_wizard':
      return <TuringSageAvatar size={size} className={className} />;
    default:
      return <ByteBotAvatar size={size} className={className} skinId="byte_classic" />;
  }
};
