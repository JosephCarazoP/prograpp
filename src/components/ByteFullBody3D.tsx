import React from 'react';

export type BytePose = 'idle' | 'salute' | 'cheer' | 'hero';

interface ByteFullBody3DProps {
  skinId: string;
  pose?: BytePose;
  rotation?: number; // en grados (0 a 360)
  size?: number; // ancho base
  className?: string;
  showPedestal?: boolean;
  isDragging?: boolean;
}

/**
 * Avatar Byte de Cuerpo Entero 3D Real (0% IA / 100% Vector SVG Duolingo 3D)
 * Soporta rotación de 360° con vistas geométricas completas:
 * - Vista Frontal (0°)
 * - Vista de Perfil Derecho (90°)
 * - Vista Posterior / Espalda Completa (180°) con mochila, columna de energía y talones de botas
 * - Vista de Perfil Izquierdo (270°)
 */
export const ByteFullBody3D: React.FC<ByteFullBody3DProps> = ({
  skinId = 'byte_classic',
  pose = 'idle',
  rotation = 0,
  size = 220,
  className = '',
  showPedestal = true,
  isDragging = false
}) => {
  // Normalizar ángulo a 0..360
  const normalizedRotation = ((Math.round(rotation) % 360) + 360) % 360;

  // Determinar perspectiva geométrica principal
  let viewAngle: 'front' | 'side_right' | 'back' | 'side_left' = 'front';
  let angleOffset = 0;

  if (normalizedRotation >= 315 || normalizedRotation < 45) {
    viewAngle = 'front';
    angleOffset = normalizedRotation >= 315 ? normalizedRotation - 360 : normalizedRotation;
  } else if (normalizedRotation >= 45 && normalizedRotation < 135) {
    viewAngle = 'side_right';
    angleOffset = normalizedRotation - 90;
  } else if (normalizedRotation >= 135 && normalizedRotation < 225) {
    viewAngle = 'back';
    angleOffset = normalizedRotation - 180;
  } else {
    viewAngle = 'side_left';
    angleOffset = normalizedRotation - 270;
  }

  // Paleta de colores según la Skin
  const getSkinPalette = () => {
    switch (skinId) {
      case 'byte_student':
        return {
          chassis: ['#38BDF8', '#0EA5E9', '#0284C7'],
          stroke: '#0369A1',
          visor: ['#0F172A', '#1E293B'],
          eye: '#38BDF8',
          pupil: '#0284C7',
          boot: ['#0284C7', '#0369A1'],
          bootStroke: '#075985',
          accent: '#F59E0B',
          hatColor: '#2563EB',
          hatStroke: '#1D4ED8',
          backpack: '#1D4ED8'
        };
      case 'byte_pixel':
        return {
          chassis: ['#10B981', '#059669', '#047857'],
          stroke: '#064E3B',
          visor: ['#022C22', '#064E3B'],
          eye: '#34D399',
          pupil: '#6EE7B7',
          boot: ['#047857', '#064E3B'],
          bootStroke: '#022C22',
          accent: '#FACC15',
          hatColor: '#059669',
          hatStroke: '#064E3B',
          backpack: '#047857'
        };
      case 'byte_athlete':
        return {
          chassis: ['#EF4444', '#DC2626', '#B91C1C'],
          stroke: '#991B1B',
          visor: ['#0F172A', '#1E293B'],
          eye: '#38BDF8',
          pupil: '#0284C7',
          boot: ['#F59E0B', '#D97706'],
          bootStroke: '#B45309',
          accent: '#FBBF24',
          hatColor: '#DC2626',
          hatStroke: '#991B1B',
          backpack: '#DC2626'
        };
      case 'byte_cyberpunk':
        return {
          chassis: ['#7C3AED', '#6D28D9', '#4C1D95'],
          stroke: '#4C1D95',
          visor: ['#064E3B', '#022C22'],
          eye: '#10B981',
          pupil: '#34D399',
          boot: ['#1E1B4B', '#0F172A'],
          bootStroke: '#4C1D95',
          accent: '#10B981',
          hatColor: '#581C87',
          hatStroke: '#3B0764',
          backpack: '#581C87'
        };
      case 'byte_steampunk':
        return {
          chassis: ['#D97706', '#B45309', '#78350F'],
          stroke: '#451A03',
          visor: ['#451A03', '#291104'],
          eye: '#FBBF24',
          pupil: '#F59E0B',
          boot: ['#78350F', '#451A03'],
          bootStroke: '#291104',
          accent: '#FDE047',
          hatColor: '#78350F',
          hatStroke: '#451A03',
          backpack: '#B45309'
        };
      case 'byte_ninja':
        return {
          chassis: ['#334155', '#1E293B', '#0F172A'],
          stroke: '#0F172A',
          visor: ['#090D16', '#020617'],
          eye: '#38BDF8',
          pupil: '#7DD3FC',
          boot: ['#1E293B', '#0F172A'],
          bootStroke: '#020617',
          accent: '#38BDF8',
          hatColor: '#0F172A',
          hatStroke: '#020617',
          backpack: '#0F172A'
        };
      case 'byte_senior':
        return {
          chassis: ['#EA580C', '#C2410C', '#9A3412'],
          stroke: '#7C2D12',
          visor: ['#0F172A', '#1E293B'],
          eye: '#38BDF8',
          pupil: '#0284C7',
          boot: ['#78350F', '#451A03'],
          bootStroke: '#291104',
          accent: '#FACC15',
          hatColor: '#EA580C',
          hatStroke: '#9A3412',
          backpack: '#EA580C'
        };
      case 'byte_wizard':
        return {
          chassis: ['#2563EB', '#1D4ED8', '#1E40AF'],
          stroke: '#1E3A8A',
          visor: ['#0F172A', '#172554'],
          eye: '#FBBF24',
          pupil: '#F59E0B',
          boot: ['#1E3A8A', '#0F172A'],
          bootStroke: '#172554',
          accent: '#FBBF24',
          hatColor: '#1E40AF',
          hatStroke: '#172554',
          backpack: '#1E3A8A'
        };
      case 'byte_samurai':
        return {
          chassis: ['#DC2626', '#B91C1C', '#991B1B'],
          stroke: '#7F1D1D',
          visor: ['#18181B', '#09090B'],
          eye: '#F59E0B',
          pupil: '#FBBF24',
          boot: ['#18181B', '#09090B'],
          bootStroke: '#7F1D1D',
          accent: '#FACC15',
          hatColor: '#DC2626',
          hatStroke: '#7F1D1D',
          backpack: '#18181B'
        };
      case 'byte_dragon':
        return {
          chassis: ['#991B1B', '#7F1D1D', '#450A0A'],
          stroke: '#450A0A',
          visor: ['#270707', '#120202'],
          eye: '#F97316',
          pupil: '#FDE047',
          boot: ['#7F1D1D', '#450A0A'],
          bootStroke: '#270707',
          accent: '#F59E0B',
          hatColor: '#450A0A',
          hatStroke: '#270707',
          backpack: '#7F1D1D'
        };
      case 'byte_astronaut':
        return {
          chassis: ['#F8FAFC', '#E2E8F0', '#CBD5E1'],
          stroke: '#94A3B8',
          visor: ['#D97706', '#78350F'],
          eye: '#FEF08A',
          pupil: '#FBBF24',
          boot: ['#E2E8F0', '#94A3B8'],
          bootStroke: '#64748B',
          accent: '#38BDF8',
          hatColor: '#FFFFFF',
          hatStroke: '#94A3B8',
          backpack: '#E2E8F0'
        };
      case 'byte_mecha_valkyrie':
        return {
          chassis: ['#F43F5E', '#E11D48', '#9F1239'],
          stroke: '#881337',
          visor: ['#2E1065', '#172554'],
          eye: '#FB7185',
          pupil: '#FFFFFF',
          boot: ['#E11D48', '#881337'],
          bootStroke: '#4C0519',
          accent: '#F472B6',
          hatColor: '#E11D48',
          hatStroke: '#881337',
          backpack: '#9F1239'
        };
      case 'byte_titan_gold':
        return {
          chassis: ['#FDE047', '#F59E0B', '#D97706'],
          stroke: '#B45309',
          visor: ['#0284C7', '#0369A1'],
          eye: '#67E8F9',
          pupil: '#FFFFFF',
          boot: ['#F59E0B', '#B45309'],
          bootStroke: '#78350F',
          accent: '#FEF08A',
          hatColor: '#F59E0B',
          hatStroke: '#B45309',
          backpack: '#F59E0B'
        };
      case 'byte_classic':
      default:
        return {
          chassis: ['#38BDF8', '#0EA5E9', '#0284C7'],
          stroke: '#0369A1',
          visor: ['#0F172A', '#1E293B'],
          eye: '#38BDF8',
          pupil: '#0284C7',
          boot: ['#0284C7', '#0369A1'],
          bootStroke: '#075985',
          accent: '#22C55E',
          hatColor: '#0EA5E9',
          hatStroke: '#0284C7',
          backpack: '#0284C7'
        };
    }
  };

  const p = getSkinPalette();

  const getPoseAnim = () => {
    switch (pose) {
      case 'salute': return 'byte-pose-salute';
      case 'cheer': return 'byte-pose-cheer';
      case 'hero': return 'byte-pose-hero';
      case 'idle':
      default:
        return 'byte-pose-idle';
    }
  };

  return (
    <div
      className={`byte-3d-wrapper ${getPoseAnim()} ${className}`}
      style={{
        width: size,
        height: size * 1.32,
        maxHeight: '100%',
        maxWidth: '100%',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        transform: `perspective(650px) rotateX(4deg) rotateY(${angleOffset}deg)`,
        transition: isDragging ? 'none' : 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <svg
        viewBox="0 0 200 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`chassis-grad-${skinId}`} x1="40" y1="20" x2="160" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor={p.chassis[0]} />
            <stop offset="50%" stopColor={p.chassis[1]} />
            <stop offset="100%" stopColor={p.chassis[2]} />
          </linearGradient>

          <linearGradient id={`boot-grad-${skinId}`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={p.boot[0]} />
            <stop offset="100%" stopColor={p.boot[1]} />
          </linearGradient>

          <linearGradient id={`visor-grad-${skinId}`} x1="50" y1="36" x2="150" y2="86" gradientUnits="userSpaceOnUse">
            <stop stopColor={p.visor[0]} />
            <stop offset="100%" stopColor={p.visor[1]} />
          </linearGradient>

          <radialGradient id="pedestal-spotlight" cx="50%" cy="50%" r="50%">
            <stop stopColor="#38BDF8" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. PEDESTAL CIRCULAR 3D PERMANENTE ESTILO FORTNITE */}
        {showPedestal && (
          <g className="byte-pedestal-platform" transform="translate(0, 10)">
            <ellipse cx="100" cy="246" rx="78" ry="16" fill="url(#pedestal-spotlight)" />
            <ellipse cx="100" cy="250" rx="66" ry="13" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
            <path d="M34 250 C34 258 166 258 166 250 L166 255 C166 263 34 263 34 255 Z" fill="#64748B" />
            <ellipse cx="100" cy="245" rx="62" ry="11" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
            <ellipse cx="100" cy="245" rx="54" ry="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <ellipse cx="70" cy="244" rx="18" ry="4.5" fill="#475569" fillOpacity="0.28" />
            <ellipse cx="130" cy="244" rx="18" ry="4.5" fill="#475569" fillOpacity="0.28" />
          </g>
        )}

        {/* ============================================================== */}
        {/* VISTA 1: ESPALDA COMPLETA (ROTACIÓN 180° - 3D REAL)           */}
        {/* ============================================================== */}
        {viewAngle === 'back' && (
          <g className="byte-view-back">
            {/* Piernas y Talones de Botas 3D */}
            <rect x="62" y="156" width="18" height="48" rx="5" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
            <rect x="60" y="180" width="22" height="8" rx="4" fill={p.accent} />
            {/* Talón Bota Izquierda con Suela Pesada */}
            <path d="M52 198 L88 198 L88 238 L50 238 Z" fill={`url(#boot-grad-${skinId})`} stroke={p.bootStroke} strokeWidth="2.5" />
            <rect x="46" y="234" width="44" height="10" rx="4" fill="#1E293B" stroke={p.bootStroke} strokeWidth="1.8" />
            {/* Ranuras de tracción en la suela */}
            <line x1="52" y1="239" x2="84" y2="239" stroke="#0F172A" strokeWidth="2" />
            <rect x="60" y="222" width="16" height="5" rx="2" fill="#F59E0B" />

            {/* Pierna Derecha */}
            <rect x="120" y="156" width="18" height="48" rx="5" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
            <rect x="118" y="180" width="22" height="8" rx="4" fill={p.accent} />
            <path d="M112 198 L148 198 L150 238 L112 238 Z" fill={`url(#boot-grad-${skinId})`} stroke={p.bootStroke} strokeWidth="2.5" />
            <rect x="110" y="234" width="44" height="10" rx="4" fill="#1E293B" stroke={p.bootStroke} strokeWidth="1.8" />
            <line x1="116" y1="239" x2="148" y2="239" stroke="#0F172A" strokeWidth="2" />
            <rect x="124" y="222" width="16" height="5" rx="2" fill="#F59E0B" />

            {/* Espalda del Torso con Columna de Energía 3D */}
            <path
              d="M52 102 C52 102 46 150 54 158 C62 164 138 164 146 158 C154 150 148 102 148 102 Z"
              fill={`url(#chassis-grad-${skinId})`}
              stroke={p.stroke}
              strokeWidth="3"
            />
            {/* Placa de Columna Vertebral Robótica */}
            <rect x="88" y="108" width="24" height="46" rx="6" fill="#0F172A" stroke={p.stroke} strokeWidth="2" />
            {/* Baterías / Celdas LED verdes de energía activa */}
            <rect x="94" y="114" width="12" height="6" rx="2" fill="#22C55E" />
            <rect x="94" y="124" width="12" height="6" rx="2" fill="#22C55E" />
            <rect x="94" y="134" width="12" height="6" rx="2" fill="#22C55E" />
            <rect x="94" y="144" width="12" height="6" rx="2" fill="#38BDF8" />

            {/* GEAR / MOCHILA DORSAL SEGÚN LA SKIN EN LA ESPALDA */}
            {skinId === 'byte_student' && (
              /* Mochila escolar azul de libros con cremallera */
              <g>
                <rect x="66" y="108" width="68" height="42" rx="10" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="2.5" />
                <rect x="74" y="126" width="52" height="20" rx="6" fill="#2563EB" stroke="#1E40AF" strokeWidth="1.5" />
                <line x1="84" y1="118" x2="116" y2="118" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {skinId === 'byte_pixel' && (
              /* Ranura y Cartucho Retro Arcade de 8-Bits */
              <g>
                <rect x="72" y="98" width="56" height="50" rx="4" fill="#047857" stroke="#064E3B" strokeWidth="2.5" />
                <rect x="78" y="104" width="44" height="22" rx="2" fill="#FACC15" />
                <text x="83" y="119" fontSize="10" fontWeight="900" fill="#064E3B" fontFamily="monospace">PROG</text>
                <line x1="80" y1="134" x2="120" y2="134" stroke="#064E3B" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="80" y1="140" x2="120" y2="140" stroke="#064E3B" strokeWidth="2" strokeDasharray="3 2" />
              </g>
            )}

            {skinId === 'byte_athlete' && (
              /* Bolsa deportiva cruzada y dorsal de carrera */
              <g>
                <rect x="76" y="110" width="48" height="38" rx="8" fill="#B91C1C" stroke="#991B1B" strokeWidth="2" />
                <circle cx="100" cy="128" r="13" fill="#FFFFFF" />
                <text x="92" y="133" fontSize="14" fontWeight="900" fill="#DC2626">01</text>
                <rect x="68" y="118" width="10" height="20" rx="3" fill="#F59E0B" />
              </g>
            )}

            {skinId === 'byte_cyberpunk' && (
              /* Matriz de microchip cibernético con pistas de datos fluorescentes */
              <g>
                <rect x="70" y="106" width="60" height="44" rx="8" fill="#3B0764" stroke="#7C3AED" strokeWidth="2" />
                <circle cx="100" cy="128" r="8" fill="#10B981" />
                <line x1="80" y1="116" x2="94" y2="116" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="106" y1="116" x2="120" y2="116" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="80" y1="140" x2="94" y2="140" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="106" y1="140" x2="120" y2="140" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" />
              </g>
            )}

            {skinId === 'byte_steampunk' && (
              /* Caldera dorsal de bronce con tubos de escape de vapor */
              <g>
                <rect x="70" y="106" width="60" height="44" rx="12" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
                <circle cx="100" cy="128" r="12" fill="#78350F" stroke="#FBBF24" strokeWidth="2" />
                <line x1="100" y1="128" x2="108" y2="124" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
                <rect x="74" y="90" width="10" height="18" fill="#78350F" />
                <rect x="116" y="90" width="10" height="18" fill="#78350F" />
              </g>
            )}

            {skinId === 'byte_ninja' && (
              /* Espada Ninjato cruzada y shurikens a la espalda */
              <g>
                <line x1="42" y1="84" x2="158" y2="166" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
                <line x1="42" y1="84" x2="62" y2="98" stroke="#94A3B8" strokeWidth="7" strokeLinecap="round" />
                <polygon points="100,116 103,124 111,124 105,129 107,137 100,132 93,137 95,129 89,124 97,124" fill="#38BDF8" />
              </g>
            )}

            {skinId === 'byte_senior' && (
              /* Cinturón y cartuchera de herramientas de obra */
              <g>
                <rect x="68" y="110" width="64" height="40" rx="8" fill="#7C2D12" stroke="#451A03" strokeWidth="2" />
                <line x1="72" y1="122" x2="128" y2="122" stroke="#FACC15" strokeWidth="3" />
                <rect x="76" y="124" width="8" height="22" rx="2" fill="#CBD5E1" />
                <rect x="94" y="124" width="12" height="22" rx="2" fill="#FACC15" />
                <rect x="116" y="124" width="8" height="22" rx="2" fill="#CBD5E1" />
              </g>
            )}

            {skinId === 'byte_samurai' && (
              /* Dos katanas de depuración cruzadas a la espalda */
              <g>
                <line x1="40" y1="80" x2="160" y2="170" stroke="#18181B" strokeWidth="6" strokeLinecap="round" />
                <line x1="40" y1="80" x2="60" y2="95" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
                <line x1="160" y1="80" x2="40" y2="170" stroke="#18181B" strokeWidth="6" strokeLinecap="round" />
                <line x1="160" y1="80" x2="140" y2="95" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
                <circle cx="100" cy="125" r="10" fill="#DC2626" stroke="#F59E0B" strokeWidth="2" />
              </g>
            )}

            {skinId === 'byte_dragon' && (
              /* Alas de dragón plegadas y escamas dorsales */
              <g>
                <path d="M54 110 L14 78 L38 142 Z" fill="#991B1B" stroke="#450A0A" strokeWidth="2.5" />
                <path d="M146 110 L186 78 L162 142 Z" fill="#991B1B" stroke="#450A0A" strokeWidth="2.5" />
                <polygon points="100,112 105,120 95,120" fill="#F59E0B" />
                <polygon points="100,124 105,132 95,132" fill="#F59E0B" />
                <polygon points="100,136 105,144 95,144" fill="#F59E0B" />
              </g>
            )}

            {skinId === 'byte_wizard' && (
              /* Capa ondeando en la espalda con estrellas */
              <g>
                <path d="M52 104 L34 220 L166 220 L148 104 Z" fill="#1E3A8A" stroke="#172554" strokeWidth="2.5" />
                <polygon points="100,140 103,148 111,149 105,154 107,162 100,157 93,162 95,154 89,149 97,148" fill="#FBBF24" />
                <polygon points="70,180 72,185 78,186 74,189 75,195 70,192 65,195 66,189 62,186 68,185" fill="#FBBF24" />
                <polygon points="130,180 132,185 138,186 134,189 135,195 130,192 125,195 126,189 122,186 128,185" fill="#FBBF24" />
              </g>
            )}

            {skinId === 'byte_astronaut' && (
              /* Jetpack dorsal con doble tobera de propulsión activa */
              <g>
                <rect x="58" y="106" width="84" height="44" rx="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
                <circle cx="80" cy="126" r="10" fill="#0EA5E9" />
                <circle cx="120" cy="126" r="10" fill="#0EA5E9" />
                <polygon points="68,150 82,150 86,164 64,164" fill="#64748B" />
                <polygon points="118,150 132,150 136,164 114,164" fill="#64748B" />
                <path d="M68 164 Q75 180 82 164 Z" fill="#38BDF8" />
                <path d="M118 164 Q125 180 132 164 Z" fill="#38BDF8" />
              </g>
            )}

            {skinId === 'byte_mecha_valkyrie' && (
              /* Alas de turbina meca-valkiria rosa y magenta */
              <g>
                <path d="M50 114 L6 86 L32 146 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="2.2" />
                <path d="M150 114 L194 86 L168 146 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="2.2" />
                <circle cx="100" cy="128" r="14" fill="#881337" stroke="#F43F5E" strokeWidth="2.5" />
                <circle cx="100" cy="128" r="7" fill="#F472B6" />
              </g>
            )}

            {skinId === 'byte_titan_gold' && (
              /* Alas de energía cuántica doradas y halo celestial */
              <g>
                <ellipse cx="100" cy="22" rx="36" ry="7" fill="none" stroke="#FEF08A" strokeWidth="3" />
                <path d="M50 120 L2 68 L32 146 Z" fill="#FDE047" stroke="#D97706" strokeWidth="2.5" />
                <path d="M150 120 L198 68 L168 146 Z" fill="#FDE047" stroke="#D97706" strokeWidth="2.5" />
                <circle cx="100" cy="128" r="14" fill="#D97706" stroke="#FEF08A" strokeWidth="2" />
              </g>
            )}

            {/* Brazos posteriores con coderas */}
            <path d="M52 116 C36 126 34 150 40 168" stroke={p.stroke} strokeWidth="8.5" strokeLinecap="round" fill="none" />
            <circle cx="44" cy="140" r="6" fill="#1E293B" />
            <circle cx="42" cy="168" r="9.5" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2" />

            <path d="M148 116 C164 126 166 150 160 168" stroke={p.stroke} strokeWidth="8.5" strokeLinecap="round" fill="none" />
            <circle cx="156" cy="140" r="6" fill="#1E293B" />
            <circle cx="158" cy="168" r="9.5" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2" />

            {/* Espalda de la Cabeza / Casco 3D */}
            <rect x="44" y="24" width="112" height="76" rx="32" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="3.2" />
            {/* Ranuras de ventilación trasera */}
            <rect x="74" y="50" width="52" height="5" rx="2.5" fill="#0F172A" />
            <rect x="78" y="60" width="44" height="5" rx="2.5" fill="#0F172A" />
            <rect x="82" y="70" width="36" height="5" rx="2.5" fill="#0F172A" />

            {/* Soporte trasero de la antena */}
            <rect x="94" y="20" width="12" height="12" rx="3" fill="#64748B" />
            <rect x="97" y="10" width="6" height="14" rx="3" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
            <circle cx="100" cy="8" r="9" fill={p.accent} stroke="#D97706" strokeWidth="1.8" />
          </g>
        )}

        {/* ============================================================== */}
        {/* VISTA 2: PERFIL DERECHO / IZQUIERDO (ROTACIÓN 90° O 270°)     */}
        {/* ============================================================== */}
        {(viewAngle === 'side_right' || viewAngle === 'side_left') && (
          <g
            className="byte-view-side"
            transform={viewAngle === 'side_left' ? 'translate(200, 0) scale(-1, 1)' : undefined}
          >
            {/* Mochila / Accesorio trasero visible en el perfil */}
            <rect x="50" y="106" width="24" height="46" rx="8" fill={p.backpack} stroke={p.stroke} strokeWidth="2.5" />
            {skinId === 'byte_astronaut' && (
              <polygon points="54,152 68,152 72,166 50,166" fill="#64748B" />
            )}
            {skinId === 'byte_steampunk' && (
              <rect x="54" y="90" width="8" height="16" fill="#78350F" />
            )}
            {skinId === 'byte_samurai' && (
              <line x1="60" y1="80" x2="48" y2="130" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
            )}
            {skinId === 'byte_ninja' && (
              <line x1="60" y1="84" x2="48" y2="130" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
            )}
            {skinId === 'byte_dragon' && (
              <polygon points="56,104 36,80 48,130" fill="#991B1B" />
            )}
            {skinId === 'byte_mecha_valkyrie' && (
              <polygon points="56,108 30,86 46,140" fill="#FB7185" />
            )}
            {skinId === 'byte_titan_gold' && (
              <polygon points="56,108 24,70 44,140" fill="#FDE047" />
            )}

            {/* Piernas en perfil: una pierna delantera y una trasera */}
            <rect x="80" y="156" width="22" height="48" rx="6" fill="#0284C7" stroke={p.stroke} strokeWidth="2" opacity="0.6" />
            <rect x="94" y="156" width="24" height="48" rx="6" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />

            {/* Botas en perfil lateral con curva de empeine */}
            <path d="M90 198 L126 198 L142 238 L86 238 Z" fill={`url(#boot-grad-${skinId})`} stroke={p.bootStroke} strokeWidth="2.5" />
            <rect x="84" y="234" width="62" height="10" rx="5" fill="#1E293B" stroke={p.bootStroke} strokeWidth="1.8" />
            <circle cx="130" cy="235" r="3" fill="#FFFFFF" fillOpacity="0.4" />

            {/* Torso en perfil */}
            <path
              d="M72 102 C72 102 68 152 74 158 C80 164 126 164 134 158 C140 152 136 102 136 102 Z"
              fill={`url(#chassis-grad-${skinId})`}
              stroke={p.stroke}
              strokeWidth="3"
            />
            {/* Botón de energía lateral */}
            <circle cx="124" cy="128" r="6" fill={p.accent} />

            {/* Brazo lateral en perfil */}
            <path d="M102 112 C116 122 118 144 114 168" stroke={p.stroke} strokeWidth="9" strokeLinecap="round" fill="none" />
            <circle cx="114" cy="168" r="10" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2" />

            {/* Cabeza en perfil con visor lateral */}
            <rect x="62" y="24" width="84" height="76" rx="28" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="3" />
            {/* Visor curvado frontal hacia la derecha */}
            <path d="M116 38 C134 38 142 50 142 61 C142 72 134 84 116 84 Z" fill={`url(#visor-grad-${skinId})`} stroke={p.stroke} strokeWidth="2" />
            {/* Ojo único visible mirando al frente */}
            <ellipse cx="128" cy="61" rx="5" ry="8" fill={p.eye} />
            <circle cx="130" cy="58" r="2.2" fill="#FFFFFF" />

            {/* Auricular central en la sien */}
            <rect x="88" y="44" width="16" height="32" rx="7" fill={p.stroke} />
            <circle cx="96" cy="60" r="4" fill={p.accent} />

            {/* Antena inclinada en perfil */}
            <rect x="94" y="10" width="6" height="16" rx="3" fill="#94A3B8" stroke="#64748B" strokeWidth="1" transform="rotate(-10 94 10)" />
            <circle cx="96" cy="6" r="9" fill={p.accent} stroke="#B45309" strokeWidth="1.5" />
          </g>
        )}

        {/* ============================================================== */}
        {/* VISTA 3: FRONTAL COMPLETA (ROTACIÓN 0° - ORIGINAL DUOLINGO 3D)*/}
        {/* ============================================================== */}
        {viewAngle === 'front' && (
          <g className="byte-view-front">
            {/* Piernas y Botas Frontales */}
            <rect x="62" y="156" width="18" height="48" rx="5" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
            <rect x="60" y="180" width="22" height="8" rx="4" fill={p.accent} />
            <path d="M50 198 C50 190 86 190 88 198 L90 238 L48 238 Z" fill={`url(#boot-grad-${skinId})`} stroke={p.bootStroke} strokeWidth="2.5" />
            <rect x="42" y="236" width="50" height="10" rx="5" fill="#1E293B" stroke={p.bootStroke} strokeWidth="1.8" />
            <ellipse cx="64" cy="235" rx="14" ry="4" fill="#FFFFFF" fillOpacity="0.25" />

            <rect x="120" y="156" width="18" height="48" rx="5" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
            <rect x="118" y="180" width="22" height="8" rx="4" fill={p.accent} />
            <path d="M112 198 C112 190 148 190 150 198 L152 238 L110 238 Z" fill={`url(#boot-grad-${skinId})`} stroke={p.bootStroke} strokeWidth="2.5" />
            <rect x="108" y="236" width="50" height="10" rx="5" fill="#1E293B" stroke={p.bootStroke} strokeWidth="1.8" />
            <ellipse cx="134" cy="235" rx="14" ry="4" fill="#FFFFFF" fillOpacity="0.25" />

            {/* Torso Frontal */}
            <path
              d="M52 102 C52 102 46 150 54 158 C62 164 138 164 146 158 C154 150 148 102 148 102 Z"
              fill={`url(#chassis-grad-${skinId})`}
              stroke={p.stroke}
              strokeWidth="3"
            />
            <rect x="68" y="112" width="64" height="32" rx="10" fill="#0F172A" stroke={p.stroke} strokeWidth="2" />
            <circle cx="100" cy="128" r="8" fill={p.accent} />
            <circle cx="102" cy="126" r="2.5" fill="#FFFFFF" />

            {/* Detalles frontales de Skins */}
            {skinId === 'byte_senior' && (
              <g>
                <path d="M54 104 L74 156 L86 156 L64 104 Z" fill="#FACC15" />
                <path d="M146 104 L126 156 L114 156 L136 104 Z" fill="#FACC15" />
                <rect x="70" y="146" width="60" height="6" fill="#F8FAFC" />
              </g>
            )}

            {skinId === 'byte_cyberpunk' && (
              <g>
                <path d="M58 102 L76 142 L100 114 L124 142 L142 102 Z" fill="#581C87" stroke="#3B0764" strokeWidth="2" />
                <line x1="88" y1="116" x2="88" y2="136" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <line x1="112" y1="116" x2="112" y2="136" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {skinId === 'byte_athlete' && (
              <g>
                <rect x="74" y="114" width="52" height="28" rx="6" fill="#DC2626" />
                <path d="M96 122 L100 128 L108 120" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>
            )}

            {skinId === 'byte_ninja' && (
              /* Máscara shinobi sobre el torso */
              <path d="M68 96 L132 96 L124 116 L76 116 Z" fill="#0F172A" />
            )}

            {skinId === 'byte_dragon' && (
              /* Emblema de fuego de dragón */
              <circle cx="100" cy="128" r="10" fill="#EA580C" stroke="#FBBF24" strokeWidth="1.5" />
            )}

            {/* Brazos según Pose */}
            {pose === 'cheer' ? (
              <>
                <path d="M52 114 C32 100 24 74 34 50" stroke={p.stroke} strokeWidth="9" strokeLinecap="round" fill="none" />
                <circle cx="34" cy="50" r="10" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2.5" />
                <path d="M148 114 C168 100 176 74 166 50" stroke={p.stroke} strokeWidth="9" strokeLinecap="round" fill="none" />
                <circle cx="166" cy="50" r="10" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2.5" />
              </>
            ) : pose === 'salute' ? (
              <>
                <path d="M52 116 C34 122 30 144 38 158" stroke={p.stroke} strokeWidth="8" strokeLinecap="round" fill="none" />
                <circle cx="38" cy="158" r="9" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2" />
                <path d="M148 116 C170 114 176 80 156 62" stroke={p.stroke} strokeWidth="8" strokeLinecap="round" fill="none" />
                <circle cx="152" cy="62" r="9" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2" />
              </>
            ) : (
              <>
                <path d="M52 116 C36 126 34 150 40 168" stroke={p.stroke} strokeWidth="8.5" strokeLinecap="round" fill="none" />
                <circle cx="42" cy="168" r="9.5" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2" />
                <path d="M148 116 C164 126 166 150 160 168" stroke={p.stroke} strokeWidth="8.5" strokeLinecap="round" fill="none" />
                <circle cx="158" cy="168" r="9.5" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2" />
              </>
            )}

            {/* Cabeza, Casco y Visor Frontal */}
            <rect x="97" y="14" width="6" height="20" rx="3" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
            <circle cx="100" cy="12" r="9" fill={p.accent} stroke="#D97706" strokeWidth="1.8" />
            <circle cx="98" cy="9" r="3" fill="#FFFFFF" fillOpacity="0.85" />

            <rect x="34" y="44" width="10" height="28" rx="5" fill={p.stroke} />
            <circle cx="39" cy="58" r="3" fill={p.accent} />
            <rect x="156" y="44" width="10" height="28" rx="5" fill={p.stroke} />
            <circle cx="161" cy="58" r="3" fill={p.accent} />

            <rect x="44" y="24" width="112" height="76" rx="32" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="3.2" />
            <path d="M58 32 C74 26 126 26 142 32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.75" />

            <rect x="56" y="38" width="88" height="46" rx="20" fill={`url(#visor-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.2" />

            {/* Ojos expresivos */}
            <ellipse cx="78" cy="58" rx="7" ry="9" fill={p.eye} />
            <ellipse cx="78" cy="58" rx="5" ry="6.5" fill={p.pupil} />
            <circle cx="80" cy="55" r="2.5" fill="#FFFFFF" />

            <ellipse cx="122" cy="58" rx="7" ry="9" fill={p.eye} />
            <ellipse cx="122" cy="58" rx="5" ry="6.5" fill={p.pupil} />
            <circle cx="124" cy="55" r="2.5" fill="#FFFFFF" />

            <circle cx="68" cy="70" r="4.5" fill="#F472B6" fillOpacity="0.75" />
            <circle cx="132" cy="70" r="4.5" fill="#F472B6" fillOpacity="0.75" />

            <path d="M92 70 Q100 78 108 70" stroke={p.eye} strokeWidth="3.2" strokeLinecap="round" fill="none" />

            {/* Sombreros / Gorras / Cascos frontales */}
            {skinId === 'byte_student' && (
              <g>
                <path d="M48 30 C48 14 152 14 152 30 L160 36 L40 36 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
                <rect x="38" y="32" width="124" height="6" rx="3" fill="#1D4ED8" />
              </g>
            )}

            {skinId === 'byte_senior' && (
              <g>
                <path d="M42 34 C42 8 158 8 158 34 L164 38 L36 38 Z" fill="#EA580C" stroke="#9A3412" strokeWidth="2.5" />
                <rect x="34" y="34" width="132" height="7" rx="3.5" fill="#C2410C" />
                <rect x="94" y="16" width="12" height="18" rx="3" fill="#FACC15" />
              </g>
            )}

            {skinId === 'byte_wizard' && (
              <g>
                <ellipse cx="100" cy="30" rx="66" ry="12" fill="#1E3A8A" stroke="#172554" strokeWidth="2.5" />
                <path d="M56 28 L100 -18 L144 28 Z" fill="#1E40AF" stroke="#172554" strokeWidth="2.5" />
                <circle cx="100" cy="-18" r="5" fill="#FBBF24" />
              </g>
            )}

            {skinId === 'byte_athlete' && (
              <g>
                <rect x="44" y="32" width="112" height="14" rx="4" fill="#DC2626" stroke="#991B1B" strokeWidth="1.8" />
                <rect x="44" y="37" width="112" height="4" fill="#FFFFFF" />
              </g>
            )}

            {skinId === 'byte_titan_gold' && (
              <g>
                <polygon points="76,24 82,12 90,20 100,6 110,20 118,12 124,24" fill="#FEF08A" stroke="#D97706" strokeWidth="1.5" />
              </g>
            )}

            {skinId === 'byte_dragon' && (
              <g>
                <polygon points="56,26 44,4 66,18" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
                <polygon points="144,26 156,4 134,18" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              </g>
            )}

            {skinId === 'byte_ninja' && (
              <g>
                <rect x="52" y="66" width="96" height="18" rx="6" fill="#0F172A" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
