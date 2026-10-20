import React from 'react';

export type BytePose = 'idle' | 'salute' | 'cheer' | 'hero';

export interface ByteFullBody3DProps {
  avatarId?: string; // 'robot_byte' | 'ada_hacker' | 'linus_coder' | 'turing_wizard' | 'console_dev'
  skinId: string;
  pose?: BytePose;
  rotation?: number; // en grados (0 a 360)
  size?: number; // ancho base
  className?: string;
  showPedestal?: boolean;
  isDragging?: boolean;
}

/**
 * Avatar de Cuerpo Entero 3D Oficial para TODOS los avatares (0% IA / 100% Vector Duolingo 3D)
 * Soporta rotación continua de 360° con 4 perspectivas geométricas completas:
 * - Frente (0°)
 * - Perfil Derecho (90°)
 * - Espalda Completa (180°) con mochilas, detalles dorsales y suelas de botas
 * - Perfil Izquierdo (270°)
 * Adaptable a las 4 poses ('idle', 'salute', 'cheer', 'hero') y a las skins oficiales.
 */
export const ByteFullBody3D: React.FC<ByteFullBody3DProps> = ({
  avatarId = 'robot_byte',
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

  // ─── PALETAS DE COLOR DINÁMICAS SEGÚN LA SKIN ───
  const getBytePalette = () => {
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
          accent: '#FBBF24',
          hatColor: '#B45309',
          hatStroke: '#78350F',
          backpack: '#B45309'
        };
      case 'byte_ninja':
        return {
          chassis: ['#475569', '#334155', '#1E293B'],
          stroke: '#0F172A',
          visor: ['#020617', '#0F172A'],
          eye: '#38BDF8',
          pupil: '#0284C7',
          boot: ['#0F172A', '#020617'],
          bootStroke: '#38BDF8',
          accent: '#38BDF8',
          hatColor: '#1E293B',
          hatStroke: '#0F172A',
          backpack: '#0F172A'
        };
      case 'byte_senior':
        return {
          chassis: ['#EA580C', '#C2410C', '#9A3412'],
          stroke: '#7C2D12',
          visor: ['#1E293B', '#0F172A'],
          eye: '#FACC15',
          pupil: '#EA580C',
          boot: ['#7C2D12', '#451A03'],
          bootStroke: '#451A03',
          accent: '#FACC15',
          hatColor: '#EA580C',
          hatStroke: '#9A3412',
          backpack: '#C2410C'
        };
      case 'byte_wizard':
        return {
          chassis: ['#2563EB', '#1D4ED8', '#1E40AF'],
          stroke: '#172554',
          visor: ['#172554', '#0F172A'],
          eye: '#FBBF24',
          pupil: '#F59E0B',
          boot: ['#1E40AF', '#172554'],
          bootStroke: '#FBBF24',
          accent: '#FBBF24',
          hatColor: '#1D4ED8',
          hatStroke: '#172554',
          backpack: '#1E40AF'
        };
      case 'byte_samurai':
        return {
          chassis: ['#DC2626', '#B91C1C', '#991B1B'],
          stroke: '#7F1D1D',
          visor: ['#18181B', '#09090B'],
          eye: '#F59E0B',
          pupil: '#D97706',
          boot: ['#18181B', '#09090B'],
          bootStroke: '#DC2626',
          accent: '#F59E0B',
          hatColor: '#B91C1C',
          hatStroke: '#7F1D1D',
          backpack: '#991B1B'
        };
      case 'byte_dragon':
        return {
          chassis: ['#B91C1C', '#991B1B', '#7F1D1D'],
          stroke: '#450A0A',
          visor: ['#450A0A', '#1C0606'],
          eye: '#F97316',
          pupil: '#EA580C',
          boot: ['#7F1D1D', '#450A0A'],
          bootStroke: '#F97316',
          accent: '#F97316',
          hatColor: '#991B1B',
          hatStroke: '#450A0A',
          backpack: '#7F1D1D'
        };
      case 'byte_astronaut':
        return {
          chassis: ['#F8FAFC', '#E2E8F0', '#CBD5E1'],
          stroke: '#94A3B8',
          visor: ['#0F172A', '#1E293B'],
          eye: '#38BDF8',
          pupil: '#0284C7',
          boot: ['#CBD5E1', '#94A3B8'],
          bootStroke: '#64748B',
          accent: '#38BDF8',
          hatColor: '#E2E8F0',
          hatStroke: '#94A3B8',
          backpack: '#E2E8F0'
        };
      case 'byte_titan_gold':
        return {
          chassis: ['#FDE047', '#F59E0B', '#D97706'],
          stroke: '#92400E',
          visor: ['#78350F', '#451A03'],
          eye: '#FEF08A',
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

  const p = getBytePalette();

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

  // Renderizador específico según el avatarId
  const renderAvatarContent = () => {
    switch (avatarId) {
      // ════════════════════════════════════════════════════════════════════
      // 1. ADA LA HACKER 3D (Cuerpo entero con sudadera, gafas y zapatillas)
      // ════════════════════════════════════════════════════════════════════
      case 'ada_hacker': {
        const isBack = viewAngle === 'back';
        const isRight = viewAngle === 'side_right';
        const isLeft = viewAngle === 'side_left';

        return (
          <g className="avatar-3d-ada">
            {/* PIERNAS Y ZAPATILLAS 3D EN EL PODIO */}
            <g className="ada-legs">
              {/* Pantalón cargo cyberpunk */}
              <rect x="70" y="156" width="22" height="48" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
              <rect x="68" y="174" width="26" height="8" rx="3" fill="#334155" />
              <rect x="108" y="156" width="22" height="48" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
              <rect x="106" y="174" width="26" height="8" rx="3" fill="#334155" />

              {/* Zapatillas 3D High-Top con suela de goma */}
              <path d="M58 200 L96 200 L96 238 L54 238 Z" fill={p.chassis[1]} stroke={p.stroke} strokeWidth="2.5" />
              <rect x="50" y="234" width="50" height="10" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.8" />
              <line x1="56" y1="239" x2="94" y2="239" stroke="#94A3B8" strokeWidth="2" />

              <path d="M104 200 L142 200 L146 238 L104 238 Z" fill={p.chassis[1]} stroke={p.stroke} strokeWidth="2.5" />
              <rect x="100" y="234" width="50" height="10" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.8" />
              <line x1="106" y1="239" x2="144" y2="239" stroke="#94A3B8" strokeWidth="2" />
            </g>

            {/* VISTA TRASERA DE ADA (ESPALDA 180°) */}
            {isBack && (
              <g className="ada-back-view">
                {/* Espalda de la sudadera tech */}
                <path d="M54 94 C54 94 48 148 56 156 C64 162 136 162 144 156 C152 148 146 94 146 94 Z" fill={p.chassis[0]} stroke={p.stroke} strokeWidth="3" />
                {/* Mochila hacker con barra LED luminosa */}
                <rect x="68" y="104" width="64" height="46" rx="10" fill="#0F172A" stroke={p.stroke} strokeWidth="2.5" />
                <rect x="76" y="112" width="48" height="6" rx="3" fill="#10B981" />
                <rect x="76" y="124" width="48" height="16" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1.2" />
                <circle cx="86" cy="132" r="3" fill="#38BDF8" />
                <circle cx="96" cy="132" r="3" fill="#10B981" />
                {/* Capucha vista por detrás */}
                <path d="M50 36 C50 14 150 14 150 36 C150 68 140 88 100 88 C60 88 50 68 50 36 Z" fill={p.chassis[1]} stroke={p.stroke} strokeWidth="3" />
                <path d="M68 62 C74 74 126 74 132 62" stroke={p.stroke} strokeWidth="3" fill="none" />
              </g>
            )}

            {/* VISTAS LATERALES DE ADA (90° y 270°) */}
            {(isRight || isLeft) && (
              <g className="ada-side-view" transform={isLeft ? 'scale(-1, 1) translate(-200, 0)' : undefined}>
                <ellipse cx="100" cy="128" rx="28" ry="32" fill={p.chassis[0]} stroke={p.stroke} strokeWidth="3" />
                <path d="M82 40 C82 18 138 20 138 52 C138 78 126 86 100 86 C78 86 82 60 82 40 Z" fill={p.chassis[1]} stroke={p.stroke} strokeWidth="3" />
                <rect x="110" y="44" width="12" height="24" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.8" />
                <circle cx="116" cy="56" r="3" fill="#22C55E" />
                <rect x="94" y="110" width="16" height="40" rx="7" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2.2" />
              </g>
            )}

            {/* VISTA FRONTAL DE ADA (0°) */}
            {viewAngle === 'front' && (
              <g className="ada-front-view">
                {/* Torso con sudadera y bolsillo canguro */}
                <path d="M54 94 C54 94 48 148 56 156 C64 162 136 162 144 156 C152 148 146 94 146 94 Z" fill={p.chassis[0]} stroke={p.stroke} strokeWidth="3" />
                <path d="M66 128 L134 128 L126 152 L74 152 Z" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2" />
                <circle cx="86" cy="108" r="3" fill="#FFFFFF" />
                <line x1="86" y1="111" x2="86" y2="124" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="114" cy="108" r="3" fill="#FFFFFF" />
                <line x1="114" y1="111" x2="114" y2="124" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

                {/* Brazos según la Pose */}
                {pose === 'salute' ? (
                  <g>
                    <path d="M52 104 C40 110 36 126 40 140 C44 146 54 138 56 126 Z" fill={p.chassis[1]} stroke={p.stroke} strokeWidth="2.5" />
                    <circle cx="38" cy="138" r="8" fill="#FED7AA" />
                    <path d="M144 104 C158 90 164 68 152 54 L138 58" stroke={p.chassis[1]} strokeWidth="14" strokeLinecap="round" />
                    <circle cx="138" cy="54" r="8" fill="#FED7AA" />
                  </g>
                ) : pose === 'cheer' ? (
                  <g>
                    <path d="M54 102 C38 88 28 66 38 48" stroke={p.chassis[1]} strokeWidth="14" strokeLinecap="round" />
                    <circle cx="38" cy="46" r="8" fill="#FED7AA" />
                    <path d="M146 102 C162 88 172 66 162 48" stroke={p.chassis[1]} strokeWidth="14" strokeLinecap="round" />
                    <circle cx="162" cy="46" r="8" fill="#FED7AA" />
                  </g>
                ) : pose === 'hero' ? (
                  <g>
                    <path d="M54 102 C38 114 36 134 52 140" stroke={p.chassis[1]} strokeWidth="14" strokeLinecap="round" />
                    <circle cx="54" cy="138" r="8" fill="#FED7AA" />
                    <path d="M146 102 C162 114 164 134 148 140" stroke={p.chassis[1]} strokeWidth="14" strokeLinecap="round" />
                    <circle cx="146" cy="138" r="8" fill="#FED7AA" />
                  </g>
                ) : (
                  <g>
                    <path d="M52 102 C38 108 34 128 40 144" stroke={p.chassis[1]} strokeWidth="13" strokeLinecap="round" />
                    <circle cx="42" cy="144" r="7.5" fill="#FED7AA" />
                    <path d="M148 102 C162 108 166 128 160 144" stroke={p.chassis[1]} strokeWidth="13" strokeLinecap="round" />
                    <circle cx="158" cy="144" r="7.5" fill="#FED7AA" />
                  </g>
                )}

                {/* Cabeza de Ada con Capucha y Auriculares */}
                <path d="M50 36 C50 14 150 14 150 36 C150 68 142 88 100 88 C58 88 50 68 50 36 Z" fill={p.chassis[1]} stroke={p.stroke} strokeWidth="3" />
                <path d="M56 34 C56 18 144 18 144 34" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
                {/* Rostro */}
                <rect x="68" y="38" width="64" height="46" rx="20" fill="#FED7AA" />
                <path d="M64 42 C76 30 124 30 136 42 C120 44 110 38 100 42 Z" fill="#0F172A" />

                {/* Gafas de hacker 3D */}
                <rect x="70" y="44" width="26" height="18" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
                <rect x="104" y="44" width="26" height="18" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
                <line x1="96" y1="52" x2="104" y2="52" stroke="#38BDF8" strokeWidth="3" />

                {/* Ojos expresivos */}
                <circle cx="83" cy="53" r="4.5" fill="#38BDF8" />
                <circle cx="84.5" cy="51.5" r="1.8" fill="#FFFFFF" />
                <circle cx="117" cy="53" r="4.5" fill="#38BDF8" />
                <circle cx="118.5" cy="51.5" r="1.8" fill="#FFFFFF" />

                {/* Sonrisa y mejillas */}
                <circle cx="76" cy="68" r="4" fill="#FB7185" fillOpacity="0.8" />
                <circle cx="124" cy="68" r="4" fill="#FB7185" fillOpacity="0.8" />
                <path d="M92 70 Q100 77 108 70" stroke="#9F1239" strokeWidth="2.8" strokeLinecap="round" fill="none" />

                {/* Headset 3D */}
                <rect x="48" y="44" width="8" height="22" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                <rect x="144" y="44" width="8" height="22" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                <path d="M148 58 Q152 74 138 76" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <circle cx="136" cy="76" r="3" fill="#22C55E" />
              </g>
            )}
          </g>
        );
      }

      // ════════════════════════════════════════════════════════════════════
      // 2. LINUS EL CODER 3D (Pingüino desarrollador con corbata y gafas)
      // ════════════════════════════════════════════════════════════════════
      case 'linus_coder': {
        const isBack = viewAngle === 'back';
        const isRight = viewAngle === 'side_right';
        const isLeft = viewAngle === 'side_left';

        return (
          <g className="avatar-3d-linus">
            {/* Patas palmeadas de pingüino 3D en el podio */}
            <g className="linus-feet">
              <ellipse cx="76" cy="236" rx="22" ry="8" fill="#FF9600" stroke="#D97706" strokeWidth="2.5" />
              <ellipse cx="124" cy="236" rx="22" ry="8" fill="#FF9600" stroke="#D97706" strokeWidth="2.5" />
            </g>

            {/* VISTA TRASERA DE LINUS (ESPALDA 180°) */}
            {isBack && (
              <g className="linus-back-view">
                {/* Cuerpo trasero volumétrico */}
                <ellipse cx="100" cy="140" rx="52" ry="74" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="3" />
                {/* Colita de pingüino */}
                <polygon points="100,210 90,192 110,192" fill="#0F172A" />
                {/* Nuca y correas de mochila */}
                <path d="M74 88 C74 108 126 108 126 88" stroke="#334155" strokeWidth="4" fill="none" />
              </g>
            )}

            {/* VISTAS LATERALES DE LINUS (90° y 270°) */}
            {(isRight || isLeft) && (
              <g className="linus-side-view" transform={isLeft ? 'scale(-1, 1) translate(-200, 0)' : undefined}>
                <ellipse cx="100" cy="140" rx="46" ry="72" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="3" />
                <path d="M104 90 C128 100 138 140 114 190" fill="#FFFFFF" />
                <path d="M120 72 L146 76 L124 84 Z" fill="#FF9600" stroke="#D97706" strokeWidth="2" />
                <circle cx="114" cy="68" r="9" fill="#0F172A" stroke={p.accent} strokeWidth="2.2" />
              </g>
            )}

            {/* VISTA FRONTAL DE LINUS (0°) */}
            {viewAngle === 'front' && (
              <g className="linus-front-view">
                {/* Cuerpo rechoncho 3D */}
                <ellipse cx="100" cy="140" rx="52" ry="74" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="3" />
                <ellipse cx="100" cy="150" rx="36" ry="54" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

                {/* Aletas según la Pose */}
                {pose === 'salute' ? (
                  <g>
                    <path d="M50 115 C34 128 34 154 48 165 C54 162 58 144 58 128 Z" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="2" />
                    <path d="M150 115 C166 100 162 76 138 66 L124 76" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="2" />
                  </g>
                ) : pose === 'cheer' ? (
                  <g>
                    <path d="M52 120 C32 104 22 76 38 62 L50 84" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="2" />
                    <path d="M148 120 C168 104 178 76 162 62 L150 84" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="2" />
                  </g>
                ) : (
                  <g>
                    <path d="M50 120 C34 135 34 165 48 175 C54 170 58 150 58 132 Z" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="2" />
                    <path d="M150 120 C166 135 166 165 152 175 C146 170 142 150 142 132 Z" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="2" />
                  </g>
                )}

                {/* Gafas de Coder 3D */}
                <circle cx="82" cy="74" r="14" fill="#0F172A" stroke={p.accent} strokeWidth="3" />
                <circle cx="118" cy="74" r="14" fill="#0F172A" stroke={p.accent} strokeWidth="3" />
                <line x1="96" y1="74" x2="104" y2="74" stroke={p.accent} strokeWidth="3.5" />

                {/* Ojos curiosos */}
                <circle cx="82" cy="74" r="5" fill={p.accent} />
                <circle cx="84" cy="72" r="2" fill="#FFFFFF" />
                <circle cx="118" cy="74" r="5" fill={p.accent} />
                <circle cx="120" cy="72" r="2" fill="#FFFFFF" />

                {/* Pico naranja 3D */}
                <path d="M88 84 Q100 80 112 84 Q100 102 88 84 Z" fill="#FF9600" stroke="#D97706" strokeWidth="2.5" />

                {/* Corbata de programador 3D */}
                <polygon points="94,106 106,106 104,112 96,112" fill={p.chassis[0]} />
                <path d="M96 112 L104 112 L109 146 L100 155 L91 146 Z" fill={p.chassis[0]} stroke="#0F172A" strokeWidth="1.8" />
                <circle cx="100" cy="122" r="2.5" fill="#FACC15" />
              </g>
            )}
          </g>
        );
      }

      // ════════════════════════════════════════════════════════════════════
      // 3. TURING EL SABIO 3D (Arquitecto de algoritmos con túnica cuántica)
      // ════════════════════════════════════════════════════════════════════
      case 'turing_wizard': {
        const isBack = viewAngle === 'back';
        const isRight = viewAngle === 'side_right';
        const isLeft = viewAngle === 'side_left';

        return (
          <g className="avatar-3d-turing">
            {/* Botas sabias 3D que asoman de la túnica */}
            <g className="turing-boots">
              <ellipse cx="78" cy="236" rx="16" ry="8" fill="#1E1B4B" stroke="#FBBF24" strokeWidth="2" />
              <ellipse cx="122" cy="236" rx="16" ry="8" fill="#1E1B4B" stroke="#FBBF24" strokeWidth="2" />
            </g>

            {/* VISTA TRASERA DE TURING (ESPALDA 180°) */}
            {isBack && (
              <g className="turing-back-view">
                {/* Túnica cuántica dorsal */}
                <path d="M60 88 L140 88 L160 234 L40 234 Z" fill={p.chassis[2]} stroke="#1E1B4B" strokeWidth="3" />
                <path d="M50 234 L150 234" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
                {/* Cabello largo plateado sabio por la espalda */}
                <ellipse cx="100" cy="56" rx="42" ry="34" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
                <path d="M72 68 C80 110 120 110 128 68" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
                {/* Símbolo rúnico de algoritmo */}
                <circle cx="100" cy="150" r="16" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
                <polygon points="100,138 112,156 88,156" fill="none" stroke="#FBBF24" strokeWidth="2" />
              </g>
            )}

            {/* VISTAS LATERALES DE TURING (90° y 270°) */}
            {(isRight || isLeft) && (
              <g className="turing-side-view" transform={isLeft ? 'scale(-1, 1) translate(-200, 0)' : undefined}>
                <path d="M74 88 L130 88 L144 234 L66 234 Z" fill={p.chassis[2]} stroke="#1E1B4B" strokeWidth="3" />
                <circle cx="100" cy="54" r="28" fill="#FED7AA" />
                <ellipse cx="118" cy="68" rx="14" ry="22" fill="#FFFFFF" />
              </g>
            )}

            {/* VISTA FRONTAL DE TURING (0°) */}
            {viewAngle === 'front' && (
              <g className="turing-front-view">
                {/* Túnica cuántica con ribete dorado */}
                <path d="M60 88 L140 88 L160 234 L40 234 Z" fill={p.chassis[2]} stroke="#1E1B4B" strokeWidth="3" />
                <path d="M42 234 L158 234" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
                <line x1="100" y1="94" x2="100" y2="230" stroke="#FBBF24" strokeWidth="3" />

                {/* Brazos según Pose */}
                {pose === 'cheer' ? (
                  <g>
                    <path d="M58 98 C36 78 28 50 42 36" stroke={p.chassis[2]} strokeWidth="16" strokeLinecap="round" />
                    <circle cx="42" cy="34" r="10" fill="#FED7AA" />
                    <circle cx="42" cy="24" r="8" fill="#FBBF24" fillOpacity="0.85" />
                    <path d="M142 98 C164 78 172 50 158 36" stroke={p.chassis[2]} strokeWidth="16" strokeLinecap="round" />
                    <circle cx="158" cy="34" r="10" fill="#FED7AA" />
                    <circle cx="158" cy="24" r="8" fill="#FBBF24" fillOpacity="0.85" />
                  </g>
                ) : (
                  <g>
                    <path d="M58 98 C42 114 44 140 54 154" stroke={p.chassis[2]} strokeWidth="15" strokeLinecap="round" />
                    <circle cx="56" cy="154" r="9" fill="#FED7AA" />
                    <path d="M142 98 C158 114 156 140 146 154" stroke={p.chassis[2]} strokeWidth="15" strokeLinecap="round" />
                    <circle cx="144" cy="154" r="9" fill="#FED7AA" />
                  </g>
                )}

                {/* Cabello sabio plateado 3D */}
                <circle cx="70" cy="44" r="22" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
                <circle cx="130" cy="44" r="22" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
                <ellipse cx="100" cy="42" rx="38" ry="28" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />

                {/* Rostro */}
                <ellipse cx="100" cy="54" rx="28" ry="26" fill="#FED7AA" />

                {/* Barba nubecita 3D */}
                <path d="M72 62 C64 88 80 114 100 114 C120 114 136 88 128 62 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />

                {/* Gafas de alambre sabio 3D */}
                <circle cx="86" cy="50" r="11" fill="#1E1B4B" stroke="#FBBF24" strokeWidth="2.5" />
                <circle cx="114" cy="50" r="11" fill="#1E1B4B" stroke="#FBBF24" strokeWidth="2.5" />
                <line x1="97" y1="50" x2="103" y2="50" stroke="#FBBF24" strokeWidth="2.5" />

                {/* Ojos */}
                <circle cx="86" cy="50" r="4.5" fill="#38BDF8" />
                <circle cx="88" cy="48" r="1.8" fill="#FFFFFF" />
                <circle cx="114" cy="50" r="4.5" fill="#38BDF8" />
                <circle cx="116" cy="48" r="1.8" fill="#FFFFFF" />

                {/* Broche talismán cuántico en el cuello */}
                <circle cx="100" cy="94" r="8" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
                <circle cx="100" cy="94" r="4" fill="#38BDF8" />
              </g>
            )}
          </g>
        );
      }

      // ════════════════════════════════════════════════════════════════════
      // 4. CONSOLA DEV 3D (Monitor retro-moderno con brazos y orugas/patas)
      // ════════════════════════════════════════════════════════════════════
      case 'console_dev': {
        const isBack = viewAngle === 'back';
        const isRight = viewAngle === 'side_right';
        const isLeft = viewAngle === 'side_left';

        return (
          <g className="avatar-3d-console">
            {/* Base hidráulica y botas magnéticas pesadas en el podio */}
            <g className="console-base">
              <rect x="74" y="160" width="18" height="46" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
              <rect x="108" y="160" width="18" height="46" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
              {/* Botas magnéticas 3D */}
              <rect x="58" y="206" width="38" height="30" rx="6" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="2.5" />
              <rect x="54" y="232" width="46" height="10" rx="4" fill="#1E293B" stroke="#0F172A" strokeWidth="1.8" />
              <rect x="64" y="214" width="12" height="6" rx="2" fill={p.accent} />

              <rect x="104" y="206" width="38" height="30" rx="6" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="2.5" />
              <rect x="100" y="232" width="46" height="10" rx="4" fill="#1E293B" stroke="#0F172A" strokeWidth="1.8" />
              <rect x="124" y="214" width="12" height="6" rx="2" fill={p.accent} />
            </g>

            {/* VISTA TRASERA DE CONSOLA (ESPALDA 180°) */}
            {isBack && (
              <g className="console-back-view">
                {/* Tubo de rayos catódicos que sobresale hacia atrás */}
                <rect x="42" y="44" width="116" height="114" rx="24" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="3" />
                <rect x="60" y="60" width="80" height="82" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
                {/* Rejilla de ventilación con ventilador interno */}
                <circle cx="100" cy="98" r="24" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                <line x1="80" y1="98" x2="120" y2="98" stroke="#0F172A" strokeWidth="3" />
                <line x1="100" y1="78" x2="100" y2="118" stroke="#0F172A" strokeWidth="3" />
                {/* Puertos de conexión y switch de encendido */}
                <rect x="72" y="126" width="14" height="8" rx="2" fill="#38BDF8" />
                <rect x="92" y="126" width="14" height="8" rx="2" fill="#F59E0B" />
                <circle cx="124" cy="130" r="4" fill="#22C55E" />
                {/* Antena vista de espaldas */}
                <rect x="97" y="26" width="6" height="20" rx="3" fill="#94A3B8" />
                <circle cx="100" cy="22" r="8" fill={p.accent} />
              </g>
            )}

            {/* VISTAS LATERALES DE CONSOLA (90° y 270°) */}
            {(isRight || isLeft) && (
              <g className="console-side-view" transform={isLeft ? 'scale(-1, 1) translate(-200, 0)' : undefined}>
                <rect x="66" y="44" width="68" height="114" rx="18" fill={p.chassis[2]} stroke="#0F172A" strokeWidth="3" />
                <rect x="122" y="58" width="12" height="86" rx="4" fill="#0F172A" />
                <line x1="78" y1="74" x2="110" y2="74" stroke="#0F172A" strokeWidth="2.5" />
                <line x1="78" y1="84" x2="110" y2="84" stroke="#0F172A" strokeWidth="2.5" />
                <line x1="78" y1="94" x2="110" y2="94" stroke="#0F172A" strokeWidth="2.5" />
              </g>
            )}

            {/* VISTA FRONTAL DE CONSOLA (0°) */}
            {viewAngle === 'front' && (
              <g className="console-front-view">
                {/* Antena elástica superior con orbe brillante */}
                <rect x="97" y="24" width="6" height="22" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
                <circle cx="100" cy="20" r="9" fill={p.accent} stroke="#D97706" strokeWidth="1.5" />
                <circle cx="98" cy="18" r="3" fill="#FFFFFF" />

                {/* Chasis de monitor retro 3D */}
                <rect x="42" y="44" width="116" height="114" rx="24" fill={p.chassis[0]} stroke="#0F172A" strokeWidth="3.2" />
                <path d="M54 50 L146 50" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeOpacity="0.6" />

                {/* Pantalla CRT curvada con cristal oscuro */}
                <rect x="54" y="58" width="92" height="74" rx="16" fill="#022C22" stroke="#0F172A" strokeWidth="2.5" />

                {/* Ojos digitales felices phosphor */}
                <path d="M72 84 C72 76 88 76 88 84" stroke={p.accent} strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M112 84 C112 76 128 76 128 84" stroke={p.accent} strokeWidth="4.5" strokeLinecap="round" fill="none" />

                {/* Sonrisa digital de terminal */}
                <path d="M92 104 Q100 114 108 104" stroke={p.accent} strokeWidth="3.8" strokeLinecap="round" fill="none" />

                {/* Luces LED y botones de control del monitor */}
                <circle cx="70" cy="144" r="3.5" fill="#22C55E" />
                <circle cx="82" cy="144" r="3.5" fill="#EF4444" />
                <rect x="114" y="141" width="18" height="6" rx="3" fill="#1E293B" />

                {/* Brazos robóticos articulados según Pose */}
                {pose === 'cheer' ? (
                  <g>
                    <path d="M42 98 C24 82 14 56 28 40" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
                    <circle cx="28" cy="38" r="8" fill={p.accent} />
                    <path d="M158 98 C176 82 186 56 172 40" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
                    <circle cx="172" cy="38" r="8" fill={p.accent} />
                  </g>
                ) : pose === 'salute' ? (
                  <g>
                    <path d="M42 98 C28 112 28 136 36 150" stroke="#475569" strokeWidth="9" strokeLinecap="round" />
                    <circle cx="36" cy="150" r="7" fill={p.accent} />
                    <path d="M158 98 C178 86 182 64 164 50" stroke="#475569" strokeWidth="9" strokeLinecap="round" />
                    <circle cx="162" cy="48" r="7" fill={p.accent} />
                  </g>
                ) : (
                  <g>
                    <path d="M42 98 C26 112 26 136 34 152" stroke="#475569" strokeWidth="9" strokeLinecap="round" />
                    <circle cx="34" cy="152" r="7" fill={p.accent} />
                    <path d="M158 98 C174 112 174 136 166 152" stroke="#475569" strokeWidth="9" strokeLinecap="round" />
                    <circle cx="166" cy="152" r="7" fill={p.accent} />
                  </g>
                )}
              </g>
            )}
          </g>
        );
      }

      // ════════════════════════════════════════════════════════════════════
      // 5. ROBOT BYTE 3D (El robot androide clásico con todos sus accesorios)
      // ════════════════════════════════════════════════════════════════════
      case 'robot_byte':
      default: {
        return (
          <g className="avatar-3d-byte">
            {/* VISTA 1: ESPALDA COMPLETA (ROTACIÓN 180° - 3D REAL) */}
            {viewAngle === 'back' && (
              <g className="byte-view-back">
                {/* Piernas y Talones de Botas 3D */}
                <rect x="62" y="156" width="18" height="48" rx="5" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
                <rect x="60" y="180" width="22" height="8" rx="4" fill={p.accent} />
                <path d="M52 198 L88 198 L88 238 L50 238 Z" fill={`url(#boot-grad-${skinId})`} stroke={p.bootStroke} strokeWidth="2.5" />
                <rect x="46" y="234" width="44" height="10" rx="4" fill="#1E293B" stroke={p.bootStroke} strokeWidth="1.8" />
                <line x1="52" y1="239" x2="84" y2="239" stroke="#0F172A" strokeWidth="2" />
                <rect x="60" y="222" width="16" height="5" rx="2" fill="#F59E0B" />

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
                <rect x="88" y="108" width="24" height="46" rx="6" fill="#0F172A" stroke={p.stroke} strokeWidth="2" />
                <rect x="94" y="114" width="12" height="6" rx="2" fill="#22C55E" />
                <rect x="94" y="124" width="12" height="6" rx="2" fill="#22C55E" />
                <rect x="94" y="134" width="12" height="6" rx="2" fill="#22C55E" />
                <rect x="94" y="144" width="12" height="6" rx="2" fill="#38BDF8" />

                {/* Mochila / Accesorio dorsal según la skin */}
                {skinId === 'byte_student' && (
                  <g>
                    <rect x="66" y="108" width="68" height="42" rx="10" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="2.5" />
                    <rect x="74" y="126" width="52" height="20" rx="6" fill="#2563EB" stroke="#1E40AF" strokeWidth="1.5" />
                    <line x1="84" y1="118" x2="116" y2="118" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
                  </g>
                )}

                {/* Brazos vistos desde atrás */}
                <path d="M52 108 C36 114 28 132 34 148 C40 154 50 142 54 126 Z" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2.5" />
                <path d="M148 108 C164 114 172 132 166 148 C160 154 150 142 146 126 Z" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2.5" />

                {/* Cabeza trasera con Casco y Antena */}
                <rect x="97" y="12" width="6" height="18" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
                <circle cx="100" cy="10" r="9" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
                <rect x="46" y="26" width="108" height="74" rx="32" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="3" />
                <rect x="36" y="48" width="12" height="30" rx="6" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2" />
                <rect x="152" y="48" width="12" height="30" rx="6" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2" />
                <rect x="78" y="46" width="44" height="28" rx="8" fill="#0F172A" stroke={p.stroke} strokeWidth="2" />
                <line x1="86" y1="56" x2="114" y2="56" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="86" y1="64" x2="114" y2="64" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}

            {/* VISTA 2: PERFIL DERECHO (ROTACIÓN 90°) */}
            {viewAngle === 'side_right' && (
              <g className="byte-view-side-right">
                <rect x="90" y="156" width="20" height="48" rx="5" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
                <rect x="88" y="180" width="24" height="8" rx="4" fill={p.accent} />
                <path d="M80 200 L124 200 L136 238 L76 238 Z" fill={`url(#boot-grad-${skinId})`} stroke={p.bootStroke} strokeWidth="2.5" />
                <rect x="72" y="234" width="68" height="10" rx="4" fill="#1E293B" stroke={p.bootStroke} strokeWidth="1.8" />
                <path d="M72 102 C72 102 66 150 74 158 C82 164 128 164 136 158 C144 150 138 102 138 102 Z" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="3" />
                <rect x="58" y="112" width="18" height="38" rx="6" fill={p.backpack} stroke={p.stroke} strokeWidth="2" />
                <rect x="90" y="106" width="20" height="52" rx="10" fill={p.chassis[1]} stroke={p.stroke} strokeWidth="2.5" />
                <circle cx="100" cy="158" r="10" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2" />
                <rect x="97" y="12" width="6" height="18" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
                <circle cx="100" cy="10" r="9" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
                <ellipse cx="100" cy="63" rx="46" ry="37" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="3" />
                <path d="M128 42 C146 52 146 74 128 84 Z" fill={`url(#visor-grad-${skinId})`} stroke={p.stroke} strokeWidth="2" />
                <ellipse cx="132" cy="63" rx="4" ry="7" fill={p.eye} />
                <rect x="88" y="48" width="14" height="30" rx="6" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2" />
                <circle cx="95" cy="63" r="3.5" fill={p.accent} />
              </g>
            )}

            {/* VISTA 3: PERFIL IZQUIERDO (ROTACIÓN 270°) */}
            {viewAngle === 'side_left' && (
              <g className="byte-view-side-left" transform="scale(-1, 1) translate(-200, 0)">
                <rect x="90" y="156" width="20" height="48" rx="5" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
                <rect x="88" y="180" width="24" height="8" rx="4" fill={p.accent} />
                <path d="M80 200 L124 200 L136 238 L76 238 Z" fill={`url(#boot-grad-${skinId})`} stroke={p.bootStroke} strokeWidth="2.5" />
                <rect x="72" y="234" width="68" height="10" rx="4" fill="#1E293B" stroke={p.bootStroke} strokeWidth="1.8" />
                <path d="M72 102 C72 102 66 150 74 158 C82 164 128 164 136 158 C144 150 138 102 138 102 Z" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="3" />
                <rect x="58" y="112" width="18" height="38" rx="6" fill={p.backpack} stroke={p.stroke} strokeWidth="2" />
                <rect x="90" y="106" width="20" height="52" rx="10" fill={p.chassis[1]} stroke={p.stroke} strokeWidth="2.5" />
                <circle cx="100" cy="158" r="10" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2" />
                <rect x="97" y="12" width="6" height="18" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
                <circle cx="100" cy="10" r="9" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
                <ellipse cx="100" cy="63" rx="46" ry="37" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="3" />
                <path d="M128 42 C146 52 146 74 128 84 Z" fill={`url(#visor-grad-${skinId})`} stroke={p.stroke} strokeWidth="2" />
                <ellipse cx="132" cy="63" rx="4" ry="7" fill={p.eye} />
                <rect x="88" y="48" width="14" height="30" rx="6" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2" />
                <circle cx="95" cy="63" r="3.5" fill={p.accent} />
              </g>
            )}

            {/* VISTA 4: FRENTE OFICIAL (ROTACIÓN 0°) */}
            {viewAngle === 'front' && (
              <g className="byte-view-front">
                <rect x="62" y="156" width="18" height="48" rx="5" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
                <rect x="60" y="180" width="22" height="8" rx="4" fill={p.accent} />
                <path d="M50 198 C50 190 88 190 88 198 L90 238 L48 238 Z" fill={`url(#boot-grad-${skinId})`} stroke={p.bootStroke} strokeWidth="2.5" />
                <rect x="44" y="234" width="48" height="10" rx="4" fill="#1E293B" stroke={p.bootStroke} strokeWidth="1.8" />
                <rect x="120" y="156" width="18" height="48" rx="5" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
                <rect x="118" y="180" width="22" height="8" rx="4" fill={p.accent} />
                <path d="M112 198 C112 190 150 190 150 198 L152 238 L110 238 Z" fill={`url(#boot-grad-${skinId})`} stroke={p.bootStroke} strokeWidth="2.5" />
                <rect x="108" y="234" width="48" height="10" rx="4" fill="#1E293B" stroke={p.bootStroke} strokeWidth="1.8" />

                <path d="M52 102 C52 102 46 150 54 158 C62 164 138 164 146 158 C154 150 148 102 148 102 Z" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="3" />
                <rect x="68" y="112" width="64" height="32" rx="10" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2" />
                <circle cx="100" cy="128" r="8" fill={p.accent} stroke="#D97706" strokeWidth="2" />
                <circle cx="102" cy="126" r="3" fill="#FFFFFF" />

                {/* Brazos según Pose */}
                {pose === 'salute' ? (
                  <g className="byte-arm-saluting">
                    <path d="M52 108 C36 114 28 132 34 148 C40 154 50 142 54 126 Z" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2.5" />
                    <circle cx="34" cy="148" r="9" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2.2" />
                    <path d="M148 106 C164 110 174 118 178 128 C180 138 170 144 158 136 C152 128 148 122 144 114 Z" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
                    <circle cx="176" cy="130" r="10" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2.2" />
                    <rect x="173" y="116" width="6" height="12" rx="3" fill="#BAE6FD" stroke={p.stroke} strokeWidth="1.5" />
                  </g>
                ) : pose === 'cheer' ? (
                  <g className="byte-arm-cheering">
                    <path d="M52 102 C38 90 26 66 32 46 C36 34 46 38 48 52 C50 64 54 84 56 94 Z" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
                    <ellipse cx="32" cy="42" rx="11" ry="10" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2.2" />
                    <path d="M148 102 C162 90 174 66 168 46 C164 34 154 38 152 52 C150 64 146 84 144 94 Z" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.5" />
                    <ellipse cx="168" cy="42" rx="11" ry="10" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2.2" />
                  </g>
                ) : (
                  <g className="byte-arm-idle">
                    <path d="M52 108 C36 114 28 132 34 148 C40 154 50 142 54 126 Z" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2.5" />
                    <circle cx="34" cy="148" r="9" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2.2" />
                    <path d="M148 108 C164 114 172 132 166 148 C160 154 150 142 146 126 Z" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2.5" />
                    <circle cx="166" cy="148" r="9" fill="#E0F2FE" stroke={p.stroke} strokeWidth="2.2" />
                  </g>
                )}

                {/* Cabeza Frontal */}
                <rect x="97" y="12" width="6" height="18" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
                <circle cx="100" cy="10" r="9" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
                <circle cx="98" cy="8" r="3" fill="#FFFFFF" />
                <rect x="46" y="26" width="108" height="74" rx="32" fill={`url(#chassis-grad-${skinId})`} stroke={p.stroke} strokeWidth="3" />
                <path d="M54 34 C72 26 128 26 146 34" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.7" strokeLinecap="round" fill="none" />
                <rect x="36" y="48" width="12" height="30" rx="6" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2" />
                <rect x="152" y="48" width="12" height="30" rx="6" fill={p.chassis[2]} stroke={p.stroke} strokeWidth="2" />

                {/* Visor oscuro frontal */}
                <rect x="56" y="38" width="88" height="46" rx="20" fill={`url(#visor-grad-${skinId})`} stroke={p.stroke} strokeWidth="2.2" />
                <ellipse cx="78" cy="58" rx="7" ry="9" fill={p.eye} />
                <ellipse cx="78" cy="58" rx="5" ry="6.5" fill={p.pupil} />
                <circle cx="80" cy="55" r="2.5" fill="#FFFFFF" />
                <ellipse cx="122" cy="58" rx="7" ry="9" fill={p.eye} />
                <ellipse cx="122" cy="58" rx="5" ry="6.5" fill={p.pupil} />
                <circle cx="124" cy="55" r="2.5" fill="#FFFFFF" />
                <circle cx="68" cy="70" r="4.5" fill="#F472B6" fillOpacity="0.75" />
                <circle cx="132" cy="70" r="4.5" fill="#F472B6" fillOpacity="0.75" />
                <path d="M92 70 Q100 78 108 70" stroke={p.eye} strokeWidth="3.2" strokeLinecap="round" fill="none" />
              </g>
            )}
          </g>
        );
      }
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

        {/* 1. PEDESTAL CIRCULAR 3D PERMANENTE ESTILO FORTNITE / DUOLINGO */}
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

        {/* 2. PERSONAJE 3D COMPLETO SEGÚN AVATAR_ID */}
        {renderAvatarContent()}
      </svg>
    </div>
  );
};
