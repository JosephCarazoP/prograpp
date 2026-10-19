import React from 'react';
import { ConsoleDevAvatar } from './ConsoleAvatar';

export { ConsoleDevAvatar };

export interface AvatarProps {
  size?: number;
  className?: string;
  skinId?: string;
}

/**
 * Normalizador de identificador de skin para garantizar compatibilidad
 */
export const normalizeSkinTheme = (skinId?: string): string => {
  if (!skinId) return 'byte_classic';
  if (skinId.startsWith('byte_')) return skinId;
  return `byte_${skinId}`;
};

/**
 * 1. Byte el Robot: Compañero androide 3D estilo juguete tangible Duolingo (0% Neón / 0% IA).
 */
export const ByteBotAvatar: React.FC<AvatarProps> = ({ size = 48, className = '', skinId = 'byte_classic' }) => {
  const norm = normalizeSkinTheme(skinId);

  const getSkinColors = () => {
    switch (norm) {
      case 'byte_student':
        return { c1: '#38BDF8', c2: '#0284C7', c3: '#0369A1', orb: '#F59E0B', border: '#7DD3FC', bg1: '#F0F9FF', bg2: '#BAE6FD', glow: '#22C55E' };
      case 'byte_pixel':
        return { c1: '#34D399', c2: '#059669', c3: '#047857', orb: '#FACC15', border: '#6EE7B7', bg1: '#ECFDF5', bg2: '#A7F3D0', glow: '#FACC15' };
      case 'byte_cyberpunk':
        return { c1: '#7C3AED', c2: '#6D28D9', c3: '#4C1D95', orb: '#10B981', border: '#C084FC', bg1: '#FAF5FF', bg2: '#E9D5FF', glow: '#10B981' };
      case 'byte_athlete':
        return { c1: '#EF4444', c2: '#DC2626', c3: '#B91C1C', orb: '#F59E0B', border: '#FCA5A5', bg1: '#FEF2F2', bg2: '#FECACA', glow: '#F59E0B' };
      case 'byte_steampunk':
        return { c1: '#D97706', c2: '#B45309', c3: '#78350F', orb: '#FBBF24', border: '#FDE68A', bg1: '#FFFBEB', bg2: '#FDE68A', glow: '#F59E0B' };
      case 'byte_ninja':
        return { c1: '#475569', c2: '#1E293B', c3: '#0F172A', orb: '#38BDF8', border: '#64748B', bg1: '#F1F5F9', bg2: '#CBD5E1', glow: '#38BDF8' };
      case 'byte_senior':
        return { c1: '#EA580C', c2: '#C2410C', c3: '#9A3412', orb: '#FACC15', border: '#FDBA74', bg1: '#FFF7ED', bg2: '#FED7AA', glow: '#FACC15' };
      case 'byte_wizard':
        return { c1: '#2563EB', c2: '#1D4ED8', c3: '#1E40AF', orb: '#FBBF24', border: '#93C5FD', bg1: '#EFF6FF', bg2: '#BFDBFE', glow: '#FBBF24' };
      case 'byte_samurai':
        return { c1: '#DC2626', c2: '#B91C1C', c3: '#991B1B', orb: '#F59E0B', border: '#F87171', bg1: '#FEF2F2', bg2: '#FECACA', glow: '#F59E0B' };
      case 'byte_dragon':
        return { c1: '#B91C1C', c2: '#991B1B', c3: '#450A0A', orb: '#F97316', border: '#F87171', bg1: '#450A0A', bg2: '#7F1D1D', glow: '#F97316' };
      case 'byte_astronaut':
        return { c1: '#F8FAFC', c2: '#E2E8F0', c3: '#94A3B8', orb: '#38BDF8', border: '#CBD5E1', bg1: '#F8FAFC', bg2: '#E2E8F0', glow: '#38BDF8' };
      case 'byte_mecha_valkyrie':
        return { c1: '#FB7185', c2: '#E11D48', c3: '#881337', orb: '#F472B6', border: '#FDA4AF', bg1: '#FFF1F2', bg2: '#FECDD3', glow: '#F472B6' };
      case 'byte_titan_gold':
        return { c1: '#FDE047', c2: '#F59E0B', c3: '#B45309', orb: '#FEF08A', border: '#FDE047', bg1: '#FEF9C3', bg2: '#FEF08A', glow: '#FEF08A' };
      case 'byte_classic':
      default:
        return { c1: '#38BDF8', c2: '#0EA5E9', c3: '#0284C7', orb: '#FBBF24', border: '#7DD3FC', bg1: '#F0F9FF', bg2: '#BAE6FD', glow: '#22C55E' };
    }
  };

  const sc = getSkinColors();

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={`byte-bg-${norm}`} x1="50" y1="2" x2="50" y2="98" gradientUnits="userSpaceOnUse">
          <stop stopColor={sc.bg1} />
          <stop offset="100%" stopColor={sc.bg2} />
        </linearGradient>
        <linearGradient id={`byte-chassis-${norm}`} x1="24" y1="20" x2="76" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor={sc.c1} />
          <stop offset="50%" stopColor={sc.c2} />
          <stop offset="100%" stopColor={sc.c3} />
        </linearGradient>
        <linearGradient id={`byte-visor-${norm}`} x1="30" y1="32" x2="70" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <radialGradient id={`byte-gold-${norm}`} cx="40%" cy="35%" r="65%">
          <stop stopColor="#FFFBEB" />
          <stop offset="40%" stopColor={sc.orb} />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>

      {/* Fondo base circular 3D */}
      <circle cx="50" cy="50" r="47" fill={`url(#byte-bg-${norm})`} stroke={sc.border} strokeWidth="2.5" />
      <ellipse cx="50" cy="91" rx="28" ry="4" fill={sc.c3} fillOpacity="0.22" />

      {/* Antena 3D */}
      <rect x="47" y="10" width="6" height="12" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
      <circle cx="50" cy="8" r="6" fill={`url(#byte-gold-${norm})`} stroke="#B45309" strokeWidth="1.2" />
      <circle cx="48" cy="6" r="2" fill="#FFFFFF" fillOpacity="0.8" />

      {/* Auriculares 3D */}
      <rect x="15" y="34" width="8" height="22" rx="4" fill={sc.c3} stroke={sc.c2} strokeWidth="1.2" />
      <circle cx="19" cy="45" r="2" fill={sc.glow} />
      <rect x="77" y="34" width="8" height="22" rx="4" fill={sc.c3} stroke={sc.c2} strokeWidth="1.2" />
      <circle cx="81" cy="45" r="2" fill={sc.glow} />

      {/* Casco 3D */}
      <rect x="22" y="18" width="56" height="52" rx="22" fill={`url(#byte-chassis-${norm})`} stroke={sc.c3} strokeWidth="2.5" />
      <path d="M28 24 C40 20 60 20 72 24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.75" />

      {/* Visor 3D oscuro */}
      <rect x="28" y="32" width="44" height="28" rx="12" fill={`url(#byte-visor-${norm})`} stroke={sc.c3} strokeWidth="1.8" />

      {/* Ojos brillantes */}
      <ellipse cx="38" cy="45" rx="5" ry="6.5" fill={sc.c1} />
      <ellipse cx="38" cy="45" rx="3" ry="4" fill="#FFFFFF" />
      <ellipse cx="62" cy="45" rx="5" ry="6.5" fill={sc.c1} />
      <ellipse cx="62" cy="45" rx="3" ry="4" fill="#FFFFFF" />

      {/* Sonrisa amigable */}
      <path d="M44 49 Q50 54 56 49" stroke={sc.c1} strokeWidth="2.4" strokeLinecap="round" fill="none" />

      {/* Cuello y armadura de pecho */}
      <path d="M34 70 L66 70 L74 96 L26 96 Z" fill={sc.c2} stroke={sc.c3} strokeWidth="2" />
      <rect x="42" y="76" width="16" height="12" rx="6" fill={sc.c3} />
      <circle cx="50" cy="82" r="4" fill={sc.glow} />
    </svg>
  );
};

/**
 * 2. Ada la Hacker: Programadora audaz con sudadera 3D, gafas y headset (adaptable a skins).
 */
export const AdaHackerAvatar: React.FC<AvatarProps> = ({ size = 48, className = '', skinId = 'byte_classic' }) => {
  const norm = normalizeSkinTheme(skinId);

  const getAdaColors = () => {
    switch (norm) {
      case 'byte_ninja':
        return { hood1: '#1E293B', hood2: '#0F172A', hoodStroke: '#020617', glasses: '#0F172A', glassesStroke: '#38BDF8', eyes: '#38BDF8', bg1: '#F1F5F9', bg2: '#CBD5E1', border: '#64748B' };
      case 'byte_cyberpunk':
        return { hood1: '#7C3AED', hood2: '#4C1D95', hoodStroke: '#2E1065', glasses: '#581C87', glassesStroke: '#10B981', eyes: '#10B981', bg1: '#FAF5FF', bg2: '#E9D5FF', border: '#C084FC' };
      case 'byte_student':
        return { hood1: '#2563EB', hood2: '#1D4ED8', hoodStroke: '#1E40AF', glasses: '#1E3A8A', glassesStroke: '#F59E0B', eyes: '#F59E0B', bg1: '#EFF6FF', bg2: '#BFDBFE', border: '#93C5FD' };
      case 'byte_samurai':
        return { hood1: '#DC2626', hood2: '#991B1B', hoodStroke: '#7F1D1D', glasses: '#18181B', glassesStroke: '#F59E0B', eyes: '#F59E0B', bg1: '#FEF2F2', bg2: '#FECACA', border: '#F87171' };
      case 'byte_wizard':
        return { hood1: '#3B82F6', hood2: '#1E40AF', hoodStroke: '#172554', glasses: '#1E3A8A', glassesStroke: '#FBBF24', eyes: '#FBBF24', bg1: '#EFF6FF', bg2: '#DBEAFE', border: '#60A5FA' };
      case 'byte_athlete':
        return { hood1: '#EF4444', hood2: '#DC2626', hoodStroke: '#B91C1C', glasses: '#0F172A', glassesStroke: '#FACC15', eyes: '#FACC15', bg1: '#FEF2F2', bg2: '#FECACA', border: '#FCA5A5' };
      case 'byte_steampunk':
        return { hood1: '#D97706', hood2: '#78350F', hoodStroke: '#451A03', glasses: '#78350F', glassesStroke: '#FBBF24', eyes: '#FBBF24', bg1: '#FFFBEB', bg2: '#FDE68A', border: '#F59E0B' };
      case 'byte_dragon':
        return { hood1: '#991B1B', hood2: '#450A0A', hoodStroke: '#270707', glasses: '#120202', glassesStroke: '#F97316', eyes: '#F97316', bg1: '#450A0A', bg2: '#7F1D1D', border: '#F87171' };
      case 'byte_astronaut':
        return { hood1: '#F8FAFC', hood2: '#CBD5E1', hoodStroke: '#94A3B8', glasses: '#0F172A', glassesStroke: '#38BDF8', eyes: '#38BDF8', bg1: '#F8FAFC', bg2: '#E2E8F0', border: '#CBD5E1' };
      case 'byte_titan_gold':
        return { hood1: '#FDE047', hood2: '#D97706', hoodStroke: '#92400E', glasses: '#78350F', glassesStroke: '#FEF08A', eyes: '#FEF08A', bg1: '#FEF9C3', bg2: '#FEF08A', border: '#FDE047' };
      case 'byte_pixel':
        return { hood1: '#10B981', hood2: '#047857', hoodStroke: '#064E3B', glasses: '#022C22', glassesStroke: '#FACC15', eyes: '#34D399', bg1: '#ECFDF5', bg2: '#A7F3D0', border: '#6EE7B7' };
      case 'byte_senior':
        return { hood1: '#EA580C', hood2: '#9A3412', hoodStroke: '#7C2D12', glasses: '#1E293B', glassesStroke: '#FACC15', eyes: '#FACC15', bg1: '#FFF7ED', bg2: '#FED7AA', border: '#FDBA74' };
      case 'byte_classic':
      default:
        return { hood1: '#FB7185', hood2: '#E11D48', hoodStroke: '#9F1239', glasses: '#0F172A', glassesStroke: '#E11D48', eyes: '#38BDF8', bg1: '#FFF1F2', bg2: '#FECDD3', border: '#FDA4AF' };
    }
  };

  const ac = getAdaColors();

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={`ada-bg-${norm}`} x1="50" y1="2" x2="50" y2="98" gradientUnits="userSpaceOnUse">
          <stop stopColor={ac.bg1} />
          <stop offset="100%" stopColor={ac.bg2} />
        </linearGradient>
        <linearGradient id={`ada-hoodie-${norm}`} x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor={ac.hood1} />
          <stop offset="100%" stopColor={ac.hood2} />
        </linearGradient>
      </defs>

      {/* Fondo circular 3D */}
      <circle cx="50" cy="50" r="47" fill={`url(#ada-bg-${norm})`} stroke={ac.border} strokeWidth="2.5" />
      <ellipse cx="50" cy="91" rx="28" ry="4" fill={ac.hood2} fillOpacity="0.22" />

      {/* Capucha 3D envolvente */}
      <path d="M20 48 C20 16 80 16 80 48 C80 76 76 88 76 88 L24 88 C24 88 20 76 20 48 Z" fill={`url(#ada-hoodie-${norm})`} stroke={ac.hoodStroke} strokeWidth="2.2" />
      <path d="M24 46 C24 22 76 22 76 46" stroke={ac.border} strokeWidth="2" fill="none" />

      {/* Rostro 3D */}
      <rect x="30" y="34" width="40" height="38" rx="16" fill="#FED7AA" />

      {/* Cabello estilizado */}
      <path d="M26 38 C34 26 66 28 74 38 C62 40 54 35 44 40 Z" fill={ac.hood2} />

      {/* Gafas de código 3D */}
      <rect x="31" y="40" width="17" height="14" rx="4.5" fill={ac.glasses} stroke={ac.glassesStroke} strokeWidth="2.2" />
      <rect x="52" y="40" width="17" height="14" rx="4.5" fill={ac.glasses} stroke={ac.glassesStroke} strokeWidth="2.2" />
      <line x1="48" y1="46" x2="52" y2="46" stroke={ac.glassesStroke} strokeWidth="2.5" />

      {/* Ojos expresivos */}
      <circle cx="39.5" cy="46" r="3" fill={ac.eyes} />
      <circle cx="40.5" cy="45" r="1.2" fill="#FFFFFF" />
      <circle cx="60.5" cy="46" r="3" fill={ac.eyes} />
      <circle cx="61.5" cy="45" r="1.2" fill="#FFFFFF" />

      {/* Mejillas */}
      <circle cx="34" cy="58" r="3" fill="#FB7185" fillOpacity="0.7" />
      <circle cx="66" cy="58" r="3" fill="#FB7185" fillOpacity="0.7" />

      {/* Sonrisa */}
      <path d="M44 60 Q50 65 56 60" stroke="#9F1239" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* Headset 3D */}
      <path d="M21 42 C21 21 79 21 79 42" stroke={ac.glassesStroke} strokeWidth="3" fill="none" />
      <rect x="18" y="38" width="6" height="16" rx="3" fill={ac.hood2} stroke={ac.glassesStroke} strokeWidth="1" />
      <rect x="76" y="38" width="6" height="16" rx="3" fill={ac.hood2} stroke={ac.glassesStroke} strokeWidth="1" />
      <path d="M78 50 Q82 64 70 65" stroke={ac.glassesStroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="65" r="2.2" fill="#22C55E" />

      {/* Pecho de sudadera con cordones */}
      <path d="M24 78 L76 78 L86 98 L14 98 Z" fill={ac.hood2} stroke={ac.hoodStroke} strokeWidth="1.5" />
      <circle cx="46" cy="84" r="1.5" fill="#FFFFFF" />
      <line x1="46" y1="86" x2="46" y2="94" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="54" cy="84" r="1.5" fill="#FFFFFF" />
      <line x1="54" y1="86" x2="54" y2="94" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 3. Linus el Coder: Pingüino desarrollador 3D con corbata y gafas (adaptable a skins).
 */
export const LinusDevAvatar: React.FC<AvatarProps> = ({ size = 48, className = '', skinId = 'byte_classic' }) => {
  const norm = normalizeSkinTheme(skinId);

  const getLinusColors = () => {
    switch (norm) {
      case 'byte_ninja':
        return { body: '#0F172A', belly: '#1E293B', tie: '#38BDF8', glasses: '#38BDF8', bg1: '#F1F5F9', bg2: '#CBD5E1', border: '#64748B' };
      case 'byte_cyberpunk':
        return { body: '#4C1D95', belly: '#2E1065', tie: '#10B981', glasses: '#10B981', bg1: '#FAF5FF', bg2: '#E9D5FF', border: '#C084FC' };
      case 'byte_student':
        return { body: '#1E3A8A', belly: '#FFFFFF', tie: '#F59E0B', glasses: '#0284C7', bg1: '#EFF6FF', bg2: '#BFDBFE', border: '#93C5FD' };
      case 'byte_samurai':
        return { body: '#7F1D1D', belly: '#18181B', tie: '#F59E0B', glasses: '#F59E0B', bg1: '#FEF2F2', bg2: '#FECACA', border: '#F87171' };
      case 'byte_wizard':
        return { body: '#1E40AF', belly: '#F1F5F9', tie: '#FBBF24', glasses: '#FBBF24', bg1: '#EFF6FF', bg2: '#DBEAFE', border: '#60A5FA' };
      case 'byte_athlete':
        return { body: '#DC2626', belly: '#FFFFFF', tie: '#FACC15', glasses: '#FACC15', bg1: '#FEF2F2', bg2: '#FECACA', border: '#FCA5A5' };
      case 'byte_steampunk':
        return { body: '#78350F', belly: '#FEF3C7', tie: '#D97706', glasses: '#FBBF24', bg1: '#FFFBEB', bg2: '#FDE68A', border: '#F59E0B' };
      case 'byte_dragon':
        return { body: '#450A0A', belly: '#7F1D1D', tie: '#F97316', glasses: '#F97316', bg1: '#450A0A', bg2: '#7F1D1D', border: '#F87171' };
      case 'byte_astronaut':
        return { body: '#CBD5E1', belly: '#FFFFFF', tie: '#38BDF8', glasses: '#38BDF8', bg1: '#F8FAFC', bg2: '#E2E8F0', border: '#CBD5E1' };
      case 'byte_titan_gold':
        return { body: '#D97706', belly: '#FEF08A', tie: '#FDE047', glasses: '#FEF08A', bg1: '#FEF9C3', bg2: '#FEF08A', border: '#FDE047' };
      case 'byte_pixel':
        return { body: '#047857', belly: '#A7F3D0', tie: '#34D399', glasses: '#FACC15', bg1: '#ECFDF5', bg2: '#A7F3D0', border: '#6EE7B7' };
      case 'byte_senior':
        return { body: '#9A3412', belly: '#FED7AA', tie: '#EA580C', glasses: '#FACC15', bg1: '#FFF7ED', bg2: '#FED7AA', border: '#FDBA74' };
      case 'byte_classic':
      default:
        return { body: '#1E293B', belly: '#FFFFFF', tie: '#16A34A', glasses: '#10B981', bg1: '#F0FDF4', bg2: '#DCFCE7', border: '#86EFAC' };
    }
  };

  const lc = getLinusColors();

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="47" fill={lc.bg2} stroke={lc.border} strokeWidth="2.5" />
      <ellipse cx="50" cy="91" rx="28" ry="4" fill={lc.body} fillOpacity="0.22" />

      {/* Cuerpo pingüino 3D */}
      <ellipse cx="50" cy="56" rx="29" ry="34" fill={lc.body} stroke="#0F172A" strokeWidth="2" />
      <ellipse cx="50" cy="64" rx="20" ry="24" fill={lc.belly} />

      {/* Aletas */}
      <path d="M22 52 C16 60 16 72 24 76 C26 77 28 68 28 60 Z" fill={lc.body} />
      <path d="M78 52 C84 60 84 72 76 76 C74 77 72 68 72 60 Z" fill={lc.body} />

      {/* Gafas */}
      <circle cx="39" cy="43" r="8.5" fill="#0F172A" stroke={lc.glasses} strokeWidth="2.4" />
      <circle cx="61" cy="43" r="8.5" fill="#0F172A" stroke={lc.glasses} strokeWidth="2.4" />
      <line x1="47.5" y1="43" x2="52.5" y2="43" stroke={lc.glasses} strokeWidth="2.5" />

      {/* Ojos */}
      <circle cx="39" cy="43" r="4" fill={lc.glasses} />
      <circle cx="40.5" cy="41.5" r="1.5" fill="#FFFFFF" />
      <circle cx="61" cy="43" r="4" fill={lc.glasses} />
      <circle cx="62.5" cy="41.5" r="1.5" fill="#FFFFFF" />

      {/* Pico naranja 3D */}
      <path d="M44 51 Q50 49 56 51 Q50 62 44 51 Z" fill="#FF9600" stroke="#D97706" strokeWidth="1.8" />

      {/* Corbata 3D */}
      <polygon points="46,63 54,63 52,67 48,67" fill={lc.tie} />
      <path d="M47 67 L53 67 L56 86 L50 91 L44 86 Z" fill={lc.tie} stroke="#0F172A" strokeWidth="1.2" />
      <circle cx="50" cy="74" r="1.8" fill="#FACC15" />
    </svg>
  );
};

/**
 * 4. Turing el Sabio: Arquitecto de algoritmos 3D con túnica y broche (adaptable a skins).
 */
export const TuringSageAvatar: React.FC<AvatarProps> = ({ size = 48, className = '', skinId = 'byte_classic' }) => {
  const norm = normalizeSkinTheme(skinId);

  const getTuringColors = () => {
    switch (norm) {
      case 'byte_ninja':
        return { robe: '#0F172A', brooch: '#38BDF8', hair: '#94A3B8', eyes: '#38BDF8', bg1: '#F1F5F9', bg2: '#CBD5E1', border: '#64748B' };
      case 'byte_cyberpunk':
        return { robe: '#4C1D95', brooch: '#10B981', hair: '#C084FC', eyes: '#10B981', bg1: '#FAF5FF', bg2: '#E9D5FF', border: '#C084FC' };
      case 'byte_student':
        return { robe: '#1E3A8A', brooch: '#F59E0B', hair: '#F1F5F9', eyes: '#38BDF8', bg1: '#EFF6FF', bg2: '#BFDBFE', border: '#93C5FD' };
      case 'byte_samurai':
        return { robe: '#7F1D1D', brooch: '#F59E0B', hair: '#18181B', eyes: '#F59E0B', bg1: '#FEF2F2', bg2: '#FECACA', border: '#F87171' };
      case 'byte_wizard':
        return { robe: '#1E40AF', brooch: '#FBBF24', hair: '#FFFFFF', eyes: '#FBBF24', bg1: '#EFF6FF', bg2: '#DBEAFE', border: '#60A5FA' };
      case 'byte_athlete':
        return { robe: '#DC2626', brooch: '#FACC15', hair: '#FFFFFF', eyes: '#FACC15', bg1: '#FEF2F2', bg2: '#FECACA', border: '#FCA5A5' };
      case 'byte_steampunk':
        return { robe: '#78350F', brooch: '#FBBF24', hair: '#E2E8F0', eyes: '#FBBF24', bg1: '#FFFBEB', bg2: '#FDE68A', border: '#F59E0B' };
      case 'byte_dragon':
        return { robe: '#450A0A', brooch: '#F97316', hair: '#270707', eyes: '#F97316', bg1: '#450A0A', bg2: '#7F1D1D', border: '#F87171' };
      case 'byte_astronaut':
        return { robe: '#CBD5E1', brooch: '#38BDF8', hair: '#FFFFFF', eyes: '#38BDF8', bg1: '#F8FAFC', bg2: '#E2E8F0', border: '#CBD5E1' };
      case 'byte_titan_gold':
        return { robe: '#D97706', brooch: '#FDE047', hair: '#FEF08A', eyes: '#FEF08A', bg1: '#FEF9C3', bg2: '#FEF08A', border: '#FDE047' };
      case 'byte_pixel':
        return { robe: '#047857', brooch: '#34D399', hair: '#A7F3D0', eyes: '#34D399', bg1: '#ECFDF5', bg2: '#A7F3D0', border: '#6EE7B7' };
      case 'byte_senior':
        return { robe: '#9A3412', brooch: '#FACC15', hair: '#FFFFFF', eyes: '#FACC15', bg1: '#FFF7ED', bg2: '#FED7AA', border: '#FDBA74' };
      case 'byte_classic':
      default:
        return { robe: '#581C87', brooch: '#FBBF24', hair: '#FFFFFF', eyes: '#A855F7', bg1: '#FAF5FF', bg2: '#F3E8FF', border: '#D8B4FE' };
    }
  };

  const tc = getTuringColors();

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="47" fill={tc.bg2} stroke={tc.border} strokeWidth="2.5" />
      <ellipse cx="50" cy="91" rx="28" ry="4" fill={tc.robe} fillOpacity="0.22" />

      {/* Cabello sabio plateado 3D */}
      <circle cx="34" cy="38" r="14" fill={tc.hair} />
      <circle cx="66" cy="38" r="14" fill={tc.hair} />
      <ellipse cx="50" cy="36" rx="24" ry="18" fill={tc.hair} />

      {/* Rostro sabio */}
      <ellipse cx="50" cy="46" rx="19" ry="18" fill="#FED7AA" />

      {/* Barba nube */}
      <path d="M34 50 C30 62 38 72 50 72 C62 72 70 62 66 50 Z" fill={tc.hair} stroke="#CBD5E1" strokeWidth="1" />

      {/* Gafas */}
      <circle cx="41" cy="44" r="7" fill="#1E1B4B" stroke={tc.brooch} strokeWidth="2.2" />
      <circle cx="59" cy="44" r="7" fill="#1E1B4B" stroke={tc.brooch} strokeWidth="2.2" />
      <line x1="48" y1="44" x2="52" y2="44" stroke={tc.brooch} strokeWidth="2.2" />

      {/* Ojos */}
      <circle cx="41" cy="44" r="3" fill={tc.eyes} />
      <circle cx="42" cy="43" r="1.2" fill="#FFFFFF" />
      <circle cx="59" cy="44" r="3" fill={tc.eyes} />
      <circle cx="60" cy="43" r="1.2" fill="#FFFFFF" />

      {/* Sonrisa */}
      <path d="M46 56 Q50 60 54 56" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Túnica cuántica */}
      <path d="M26 74 L74 74 L84 98 L16 98 Z" fill={tc.robe} stroke="#3B0764" strokeWidth="1.5" />
      <circle cx="50" cy="80" r="5" fill={tc.brooch} stroke="#D97706" strokeWidth="1.2" />
    </svg>
  );
};

/**
 * 5. Consola Dev: Terminal interactiva 3D con visor CRT y sonrisa digital (adaptable a skins).
 */
export const ConsoleMascotAvatar: React.FC<AvatarProps> = ({ size = 48, className = '', skinId = 'byte_classic' }) => {
  const norm = normalizeSkinTheme(skinId);

  const getConsoleColors = () => {
    switch (norm) {
      case 'byte_ninja':
        return { body: '#0F172A', screen: '#020617', glow: '#38BDF8', border: '#64748B', bg1: '#F1F5F9', bg2: '#CBD5E1' };
      case 'byte_cyberpunk':
        return { body: '#4C1D95', screen: '#1E1B4B', glow: '#10B981', border: '#C084FC', bg1: '#FAF5FF', bg2: '#E9D5FF' };
      case 'byte_student':
        return { body: '#1D4ED8', screen: '#0F172A', glow: '#38BDF8', border: '#93C5FD', bg1: '#EFF6FF', bg2: '#BFDBFE' };
      case 'byte_samurai':
        return { body: '#991B1B', screen: '#18181B', glow: '#F59E0B', border: '#F87171', bg1: '#FEF2F2', bg2: '#FECACA' };
      case 'byte_wizard':
        return { body: '#1E40AF', screen: '#172554', glow: '#FBBF24', border: '#60A5FA', bg1: '#EFF6FF', bg2: '#DBEAFE' };
      case 'byte_athlete':
        return { body: '#DC2626', screen: '#0F172A', glow: '#FACC15', border: '#FCA5A5', bg1: '#FEF2F2', bg2: '#FECACA' };
      case 'byte_steampunk':
        return { body: '#78350F', screen: '#291104', glow: '#FBBF24', border: '#F59E0B', bg1: '#FFFBEB', bg2: '#FDE68A' };
      case 'byte_dragon':
        return { body: '#450A0A', screen: '#120202', glow: '#F97316', border: '#F87171', bg1: '#450A0A', bg2: '#7F1D1D' };
      case 'byte_astronaut':
        return { body: '#CBD5E1', screen: '#0F172A', glow: '#38BDF8', border: '#CBD5E1', bg1: '#F8FAFC', bg2: '#E2E8F0' };
      case 'byte_titan_gold':
        return { body: '#D97706', screen: '#78350F', glow: '#FEF08A', border: '#FDE047', bg1: '#FEF9C3', bg2: '#FEF08A' };
      case 'byte_pixel':
        return { body: '#047857', screen: '#022C22', glow: '#34D399', border: '#6EE7B7', bg1: '#ECFDF5', bg2: '#A7F3D0' };
      case 'byte_senior':
        return { body: '#9A3412', screen: '#0F172A', glow: '#FACC15', border: '#FDBA74', bg1: '#FFF7ED', bg2: '#FED7AA' };
      case 'byte_classic':
      default:
        return { body: '#059669', screen: '#022C22', glow: '#34D399', border: '#6EE7B7', bg1: '#F0FDF4', bg2: '#D1FAE5' };
    }
  };

  const cc = getConsoleColors();

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="47" fill={cc.bg2} stroke={cc.border} strokeWidth="2.5" />
      <ellipse cx="50" cy="91" rx="28" ry="4" fill={cc.body} fillOpacity="0.22" />

      {/* Antena mini */}
      <rect x="47" y="10" width="6" height="10" rx="3" fill="#94A3B8" />
      <circle cx="50" cy="8" r="5" fill={cc.glow} stroke="#CA8A04" strokeWidth="1" />

      {/* Chasis monitor retro-moderno 3D */}
      <rect x="20" y="18" width="60" height="50" rx="16" fill={cc.body} stroke="#0F172A" strokeWidth="2.2" />
      <path d="M26 22 L74 22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />

      {/* Pantalla CRT 3D */}
      <rect x="27" y="26" width="46" height="34" rx="10" fill={cc.screen} stroke="#0F172A" strokeWidth="1.5" />

      {/* Ojos de terminal felices */}
      <path d="M36 39 C36 36, 44 36, 44 39" stroke={cc.glow} strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M56 39 C56 36, 64 36, 64 39" stroke={cc.glow} strokeWidth="2.8" strokeLinecap="round" fill="none" />

      {/* Sonrisa digital */}
      <path d="M46 48 Q50 52 54 48" stroke={cc.glow} strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* Base */}
      <rect x="42" y="68" width="16" height="10" fill="#0F172A" />
      <rect x="32" y="76" width="36" height="8" rx="4" fill={cc.body} stroke="#0F172A" strokeWidth="1.2" />
      <rect x="34" y="84" width="32" height="10" rx="4" fill={cc.glow} />
    </svg>
  );
};

// Selector Centralizado de Avatar con Soporte de Skin Universal
export const DevAvatar: React.FC<{
  avatarId: string;
  skinId?: string;
  size?: number;
  className?: string;
}> = ({
  avatarId,
  skinId,
  size = 48,
  className = ''
}) => {
  let baseId = avatarId || 'robot_byte';
  let activeSkin = skinId || 'byte_classic';

  // Si avatarId viene como 'byte_ninja' de versiones previas
  if (baseId.startsWith('byte_')) {
    activeSkin = baseId;
    baseId = 'robot_byte';
  } else if (baseId.includes('__')) {
    const parts = baseId.split('__');
    baseId = parts[0];
    activeSkin = parts[1];
  }

  switch (baseId) {
    case 'ada_hacker':
      return <AdaHackerAvatar size={size} className={className} skinId={activeSkin} />;
    case 'linus_coder':
      return <LinusDevAvatar size={size} className={className} skinId={activeSkin} />;
    case 'turing_wizard':
      return <TuringSageAvatar size={size} className={className} skinId={activeSkin} />;
    case 'console_dev':
      return <ConsoleMascotAvatar size={size} className={className} skinId={activeSkin} />;
    case 'robot_byte':
    default:
      return <ByteBotAvatar size={size} className={className} skinId={activeSkin} />;
  }
};
