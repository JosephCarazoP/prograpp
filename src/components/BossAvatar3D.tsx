import React from 'react';

export type BossAvatarType =
  | 'glitch_bug'
  | 'iron_titan'
  | 'cyber_specter'
  | 'hydra_beast'
  | 'vortex_core'
  | 'sentinel_shield'
  | 'emperor_mech'
  | string;

export type BossPose = 'idle' | 'attack' | 'hurt' | 'defeated';

export interface BossAvatar3DProps {
  avatarType: BossAvatarType;
  primaryColor?: string;
  accentColor?: string;
  pose?: BossPose;
  size?: number;
  showPedestal?: boolean;
  className?: string;
}

/**
 * Avatar Oficial 3D de Jefes (Duolingo 3D fusionado con Neo-Brutalism).
 * - Volumen 3D, degradados especulares, biseles y sombras (Duolingo 3D)
 * - Trazos negros gruesos (3px a 4px), sombras sólidas proyectadas, badges y remaches (Neo-Brutalism)
 * - Soporta los 7 arquetipos de jefes de Kotlin y SQL con 4 estados de combate (idle, attack, hurt, defeated).
 */
export const BossAvatar3D: React.FC<BossAvatar3DProps> = ({
  avatarType,
  primaryColor = '#FF2A6D',
  accentColor = '#FFE600',
  pose = 'idle',
  size = 120,
  showPedestal = true,
  className = ''
}) => {
  const isDefeated = pose === 'defeated';
  const isHurt = pose === 'hurt';
  const isAttacking = pose === 'attack';

  const poseClass = isDefeated
    ? 'boss-pose-defeated'
    : isAttacking
    ? 'boss-pose-attacking'
    : isHurt
    ? 'boss-pose-hurt'
    : 'boss-pose-idle';

  // ID único para gradientes SVG y filtros para evitar colisiones entre instancias
  const uid = React.useId().replace(/:/g, '_');

  return (
    <div
      className={`boss-avatar-3d-wrapper ${poseClass} ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        userSelect: 'none',
        filter: isDefeated ? 'grayscale(0.85) contrast(0.9)' : undefined,
        opacity: isDefeated ? 0.65 : 1,
        transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: 'visible',
          filter: isHurt
            ? 'drop-shadow(0 0 12px #FF2A6D)'
            : isAttacking
            ? 'drop-shadow(4px 4px 0px #000000)'
            : 'drop-shadow(3px 3px 0px #000000)'
        }}
      >
        <defs>
          {/* Sombras duras neo-brutalistas y gradientes 3D Duolingo */}
          <radialGradient id={`bossLight_${uid}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="45%" stopColor={primaryColor} />
            <stop offset="100%" stopColor="#0B0F19" />
          </radialGradient>

          <linearGradient id={`bossGradPrimary_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="20%" stopColor={primaryColor} />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>

          <linearGradient id={`bossGradAccent_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="40%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id={`bossChassisDark_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="60%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id={`pedestalGrad_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>
        </defs>

        {/* 0. PEDESTAL CIRCULAR 3D NEO-BRUTALISTA */}
        {showPedestal && (
          <g className="boss-pedestal-group">
            {/* Sombra base negra dura neo-brutalista */}
            <ellipse cx="80" cy="144" rx="52" ry="12" fill="#000000" />
            {/* Borde exterior del pedestal */}
            <ellipse cx="80" cy="139" rx="50" ry="11" fill="#0F172A" stroke="#000000" strokeWidth="3" />
            {/* Superficie superior del pedestal con luz */}
            <ellipse cx="80" cy="136" rx="44" ry="8" fill={primaryColor} stroke="#000000" strokeWidth="2.5" />
            <ellipse cx="80" cy="135" rx="36" ry="5.5" fill="#FFFFFF" fillOpacity="0.25" />
            {/* Anillos de energía cibernética */}
            <ellipse
              cx="80"
              cy="136"
              rx="24"
              ry="3.5"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          </g>
        )}

        {/* ─────────────────────────────────────────────────────────────
            1. BUGZILLA EL DESBORDADOR (GLITCH BUG)
            Robótico escarabajo 3D con exoesqueleto, pinzas, coraza y glitch
           ───────────────────────────────────────────────────────────── */}
        {avatarType === 'glitch_bug' && (
          <g className="boss-character-body">
            {/* Patas cibernéticas con articulaciones y remaches */}
            {/* Pata izquierda superior */}
            <path
              d="M48 68 L24 54 L12 66"
              stroke="#000000"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M48 68 L24 54 L12 66"
              stroke={primaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pata izquierda inferior */}
            <path
              d="M48 94 L20 102 L14 122"
              stroke="#000000"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M48 94 L20 102 L14 122"
              stroke={primaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pata derecha superior */}
            <path
              d="M112 68 L136 54 L148 66"
              stroke="#000000"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M112 68 L136 54 L148 66"
              stroke={primaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pata derecha inferior */}
            <path
              d="M112 94 L140 102 L146 122"
              stroke="#000000"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M112 94 L140 102 L146 122"
              stroke={primaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Antenas dobles con esferas de energía */}
            <path d="M68 44 Q56 22 42 24" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M68 44 Q56 22 42 24" stroke="#FFE600" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="42" cy="24" r="7" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />
            <circle cx="40" cy="22" r="2" fill="#FFFFFF" />

            <path d="M92 44 Q104 22 118 24" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M92 44 Q104 22 118 24" stroke="#FFE600" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="118" cy="24" r="7" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />
            <circle cx="116" cy="22" r="2" fill="#FFFFFF" />

            {/* Abdomen / Cuerpo base 3D */}
            <rect
              x="42"
              y="60"
              width="76"
              height="66"
              rx="28"
              fill={`url(#bossChassisDark_${uid})`}
              stroke="#000000"
              strokeWidth="3.5"
            />

            {/* Alas / Élitros blindados con franjas de advertencia */}
            <path
              d="M44 68 C44 68 56 120 78 122 C78 90 78 70 78 66 Z"
              fill={`url(#bossGradPrimary_${uid})`}
              stroke="#000000"
              strokeWidth="3"
            />
            <path
              d="M116 68 C116 68 104 120 82 122 C82 90 82 70 82 66 Z"
              fill={`url(#bossGradPrimary_${uid})`}
              stroke="#000000"
              strokeWidth="3"
            />
            {/* Brillos especulares en las alas */}
            <path d="M50 74 C50 74 58 100 70 108" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" fill="none" />
            <path d="M110 74 C110 74 102 100 90 108" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" fill="none" />

            {/* Núcleo de reactor de Glitch en el pecho */}
            <rect x="73" y="74" width="14" height="38" rx="6" fill="#000000" stroke="#FFE600" strokeWidth="1.5" />
            <circle cx="80" cy="85" r="4.5" fill={accentColor} />
            <circle cx="80" cy="100" r="4.5" fill="#00E5FF" />

            {/* Cabeza robótica 3D */}
            <rect
              x="50"
              y="38"
              width="60"
              height="34"
              rx="12"
              fill={`url(#bossGradPrimary_${uid})`}
              stroke="#000000"
              strokeWidth="3.5"
            />
            {/* Bisel superior de luz en la cabeza */}
            <line x1="58" y1="41" x2="102" y2="41" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.75" />

            {/* Visor digital cibernético (Ojos con expresiones) */}
            <rect x="56" y="47" width="48" height="18" rx="6" fill="#050B14" stroke="#000000" strokeWidth="2.5" />

            {isDefeated ? (
              // Ojos en X de derrota
              <g stroke="#FF2A6D" strokeWidth="3" strokeLinecap="round">
                <line x1="64" y1="52" x2="72" y2="60" />
                <line x1="72" y1="52" x2="64" y2="60" />
                <line x1="88" y1="52" x2="96" y2="60" />
                <line x1="96" y1="52" x2="88" y2="60" />
              </g>
            ) : isHurt ? (
              // Ojos de dolor / impacto
              <g fill="#FFE600">
                <circle cx="68" cy="56" r="3" />
                <circle cx="92" cy="56" r="3" />
              </g>
            ) : (
              // Ojos feroces y agresivos de combate (Estilo Duolingo Angry)
              <g>
                {/* Ojo izquierdo */}
                <polygon points="62,53 74,56 72,61 62,58" fill="#FFE600" />
                <circle cx="68" cy="57" r="2.5" fill="#FF2A6D" />
                {/* Ojo derecho */}
                <polygon points="98,53 86,56 88,61 98,58" fill="#FFE600" />
                <circle cx="92" cy="57" r="2.5" fill="#FF2A6D" />
              </g>
            )}

            {/* Mandíbula de corte y colmillos de depuración */}
            <polygon points="68,72 73,78 77,72" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            <polygon points="83,72 87,78 92,72" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
          </g>
        )}

        {/* ─────────────────────────────────────────────────────────────
            2. INMUTABLE TITÁN (IRON TITAN)
            Mole blindada colosal 3D, hombreras pesadas, reactor y coraza
           ───────────────────────────────────────────────────────────── */}
        {avatarType === 'iron_titan' && (
          <g className="boss-character-body">
            {/* Hombrera izquierda masiva */}
            <g>
              <rect x="18" y="58" width="32" height="34" rx="8" fill="#0F172A" stroke="#000000" strokeWidth="3.5" />
              <rect x="22" y="62" width="24" height="26" rx="5" fill={primaryColor} />
              <line x1="24" y1="65" x2="44" y2="65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
              {/* Remaches de acero */}
              <circle cx="24" cy="82" r="2" fill="#000000" />
              <circle cx="44" cy="82" r="2" fill="#000000" />
            </g>

            {/* Hombrera derecha masiva */}
            <g>
              <rect x="110" y="58" width="32" height="34" rx="8" fill="#0F172A" stroke="#000000" strokeWidth="3.5" />
              <rect x="114" y="62" width="24" height="26" rx="5" fill={primaryColor} />
              <line x1="116" y1="65" x2="136" y2="65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
              <circle cx="116" cy="82" r="2" fill="#000000" />
              <circle cx="136" cy="82" r="2" fill="#000000" />
            </g>

            {/* Torso blindado con placas anguladas */}
            <path
              d="M44 64 L116 64 L108 126 L52 126 Z"
              fill={`url(#bossChassisDark_${uid})`}
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Placa pectoral superior */}
            <polygon points="50,68 110,68 104,92 56,92" fill="#1E293B" stroke="#000000" strokeWidth="2.5" />

            {/* Reactor nuclear de fusión en el centro */}
            <circle cx="80" cy="98" r="16" fill="#020617" stroke="#000000" strokeWidth="3" />
            <circle cx="80" cy="98" r="11" fill={primaryColor} />
            <circle cx="80" cy="98" r="6" fill="#FFFFFF" />
            {/* Rejilla de reactor */}
            <line x1="80" y1="84" x2="80" y2="112" stroke="#000000" strokeWidth="2" />
            <line x1="66" y1="98" x2="94" y2="98" stroke="#000000" strokeWidth="2" />

            {/* Cabeza y yelmo de acero */}
            <rect
              x="54"
              y="28"
              width="52"
              height="38"
              rx="10"
              fill="#1E293B"
              stroke="#000000"
              strokeWidth="3.5"
            />
            <line x1="60" y1="32" x2="100" y2="32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />

            {/* Visor de haz concentrado */}
            <rect x="60" y="42" width="40" height="12" rx="4" fill="#050B14" stroke="#000000" strokeWidth="2" />

            {isDefeated ? (
              <g stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round">
                <line x1="66" y1="45" x2="74" y2="51" />
                <line x1="74" y1="45" x2="66" y2="51" />
                <line x1="86" y1="45" x2="94" y2="51" />
                <line x1="94" y1="45" x2="86" y2="51" />
              </g>
            ) : isHurt ? (
              <rect x="64" y="45" width="32" height="6" rx="3" fill="#FF2A6D" />
            ) : (
              <g>
                <rect x="64" y="45" width="32" height="6" rx="3" fill={primaryColor} />
                <rect x="74" y="46" width="12" height="4" rx="2" fill="#FFFFFF" />
              </g>
            )}

            {/* Barbilla / mandíbula blindada */}
            <rect x="68" y="58" width="24" height="8" rx="2" fill="#0F172A" stroke="#000000" strokeWidth="2" />
          </g>
        )}

        {/* ─────────────────────────────────────────────────────────────
            3. ESPECTRO ARITMÉTICO (CYBER SPECTER)
            Fantasma cibernético 3D con capucha, garras flotantes y runas
           ───────────────────────────────────────────────────────────── */}
        {avatarType === 'cyber_specter' && (
          <g className="boss-character-body">
            {/* Runas de lógica flotantes orbitando */}
            <g className="boss-orbiting-runes">
              <rect x="20" y="38" width="20" height="20" rx="6" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />
              <text x="30" y="52" fill="#000000" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                &&
              </text>

              <rect x="120" y="42" width="20" height="20" rx="6" fill="#00E5FF" stroke="#000000" strokeWidth="2.5" />
              <text x="130" y="56" fill="#000000" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                !=
              </text>

              <rect x="18" y="90" width="18" height="18" rx="5" fill="#FF2A6D" stroke="#000000" strokeWidth="2" />
              <text x="27" y="103" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                ||
              </text>
            </g>

            {/* Manto y cola espectral ondeante */}
            <path
              d="M48 56 Q80 34 112 56 Q128 88 120 120 Q106 112 96 126 Q80 110 68 126 Q54 112 40 120 Q32 88 48 56 Z"
              fill={`url(#bossGradPrimary_${uid})`}
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Pliegues interiores del espectro */}
            <path d="M60 70 Q78 98 64 118" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />
            <path d="M100 70 Q82 98 96 118" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />

            {/* Garras cibernéticas flotantes (Izquierda) */}
            <g>
              <ellipse cx="32" cy="78" rx="8" ry="12" fill="#1E293B" stroke="#000000" strokeWidth="2.5" />
              <polygon points="26,88 28,98 32,88" fill={primaryColor} stroke="#000000" strokeWidth="1.5" />
              <polygon points="32,88 35,100 38,88" fill={primaryColor} stroke="#000000" strokeWidth="1.5" />
            </g>

            {/* Garras cibernéticas flotantes (Derecha) */}
            <g>
              <ellipse cx="128" cy="78" rx="8" ry="12" fill="#1E293B" stroke="#000000" strokeWidth="2.5" />
              <polygon points="122,88 125,100 128,88" fill={primaryColor} stroke="#000000" strokeWidth="1.5" />
              <polygon points="128,88 132,98 134,88" fill={primaryColor} stroke="#000000" strokeWidth="1.5" />
            </g>

            {/* Capucha profunda con vacío negro interior */}
            <path
              d="M50 54 Q80 16 110 54 Q116 78 106 86 Q80 92 54 86 Q44 78 50 54 Z"
              fill={`url(#bossChassisDark_${uid})`}
              stroke="#000000"
              strokeWidth="3.5"
            />
            <path d="M58 56 Q80 32 102 56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" fill="none" />

            {/* Interior de la capucha (Vacío) */}
            <ellipse cx="80" cy="62" rx="22" ry="16" fill="#020617" stroke="#000000" strokeWidth="2.5" />

            {/* Ojos hipnóticos flotando en la oscuridad */}
            {isDefeated ? (
              <g stroke="#64748B" strokeWidth="2.5" strokeLinecap="round">
                <line x1="68" y1="58" x2="74" y2="64" />
                <line x1="74" y1="58" x2="68" y2="64" />
                <line x1="86" y1="58" x2="92" y2="64" />
                <line x1="92" y1="58" x2="86" y2="64" />
              </g>
            ) : isHurt ? (
              <g fill="#FF2A6D">
                <circle cx="71" cy="61" r="3" />
                <circle cx="89" cy="61" r="3" />
              </g>
            ) : (
              <g>
                <ellipse cx="71" cy="61" rx="5" ry="3.5" fill="#FFE600" />
                <ellipse cx="89" cy="61" rx="5" ry="3.5" fill="#FFE600" />
                <circle cx="72" cy="61" r="1.5" fill="#000000" />
                <circle cx="90" cy="61" r="1.5" fill="#000000" />
              </g>
            )}

            {/* Gema de cálculo en la frente de la capucha */}
            <polygon points="80,32 86,40 80,48 74,40" fill={accentColor} stroke="#000000" strokeWidth="2" />
            <polygon points="80,34 84,40 80,46 76,40" fill="#FFFFFF" fillOpacity="0.4" />
          </g>
        )}

        {/* ─────────────────────────────────────────────────────────────
            4. LA HIDRA DE BIFURCACIONES (HYDRA BEAST)
            Dragón multi-cabeza 3D (IF, WHEN, ELSE), cuernos, escamas
           ───────────────────────────────────────────────────────────── */}
        {avatarType === 'hydra_beast' && (
          <g className="boss-character-body">
            {/* Cabeza izquierda (Rama IF) */}
            <g>
              <path d="M46 76 Q30 52 38 34 Q52 26 58 42 Q50 62 52 78 Z" fill={primaryColor} stroke="#000000" strokeWidth="3" />
              <polygon points="34,30 26,18 38,24" fill="#FFE600" stroke="#000000" strokeWidth="2" />
              <circle cx="44" cy="36" r="3" fill="#FFE600" stroke="#000000" strokeWidth="1.5" />
              <circle cx="44" cy="36" r="1.2" fill="#000000" />
            </g>

            {/* Cabeza derecha (Rama ELSE) */}
            <g>
              <path d="M114 76 Q130 52 122 34 Q108 26 102 42 Q110 62 108 78 Z" fill={primaryColor} stroke="#000000" strokeWidth="3" />
              <polygon points="126,30 134,18 122,24" fill="#FFE600" stroke="#000000" strokeWidth="2" />
              <circle cx="116" cy="36" r="3" fill="#FFE600" stroke="#000000" strokeWidth="1.5" />
              <circle cx="116" cy="36" r="1.2" fill="#000000" />
            </g>

            {/* Alas / Espinas de dragón en la espalda */}
            <polygon points="26,72 10,88 32,96" fill="#B91C1C" stroke="#000000" strokeWidth="2.5" />
            <polygon points="134,72 150,88 128,96" fill="#B91C1C" stroke="#000000" strokeWidth="2.5" />

            {/* Cuerpo central del dragón */}
            <path
              d="M48 76 Q80 62 112 76 L118 126 Q80 132 42 126 Z"
              fill={`url(#bossChassisDark_${uid})`}
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Placas de escamas pectorales 3D */}
            <path
              d="M60 84 Q80 76 100 84 L96 118 Q80 124 64 118 Z"
              fill={primaryColor}
              stroke="#000000"
              strokeWidth="2.5"
            />
            {/* Segmentos de escamas con sombras */}
            <line x1="63" y1="94" x2="97" y2="94" stroke="#000000" strokeWidth="2" />
            <line x1="66" y1="104" x2="94" y2="104" stroke="#000000" strokeWidth="2" />
            <line x1="70" y1="112" x2="90" y2="112" stroke="#000000" strokeWidth="2" />

            {/* Cuello central y cabeza principal (Rama WHEN) */}
            <rect x="68" y="46" width="24" height="34" rx="6" fill={primaryColor} stroke="#000000" strokeWidth="3" />
            {/* Cabeza central */}
            <path
              d="M56 36 L104 36 L100 66 Q80 72 60 66 Z"
              fill={`url(#bossGradPrimary_${uid})`}
              stroke="#000000"
              strokeWidth="3.5"
            />
            {/* Cuernos dorados centrales */}
            <polygon points="62,36 50,16 68,26" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />
            <polygon points="98,36 110,16 92,26" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />

            {/* Ojos y ceño fruncido del dragón */}
            {isDefeated ? (
              <g stroke="#94A3B8" strokeWidth="3" strokeLinecap="round">
                <line x1="66" y1="46" x2="74" y2="54" />
                <line x1="74" y1="46" x2="66" y2="54" />
                <line x1="86" y1="46" x2="94" y2="54" />
                <line x1="94" y1="46" x2="86" y2="54" />
              </g>
            ) : (
              <g>
                <polygon points="64,46 76,49 74,54 64,52" fill="#FFE600" stroke="#000000" strokeWidth="1.5" />
                <polygon points="96,46 84,49 86,54 96,52" fill="#FFE600" stroke="#000000" strokeWidth="1.5" />
                <circle cx="70" cy="50" r="2" fill="#FF2A6D" />
                <circle cx="90" cy="50" r="2" fill="#FF2A6D" />
              </g>
            )}

            {/* Colmillos blancos feroces */}
            <polygon points="68,64 72,70 76,64" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            <polygon points="84,64 88,70 92,64" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
          </g>
        )}

        {/* ─────────────────────────────────────────────────────────────
            5. BUCLE INFINITO DEL CAOS (VORTEX CORE)
            Giroscopio cuántico 3D, anillos giratorios y símbolo infinito
           ───────────────────────────────────────────────────────────── */}
        {avatarType === 'vortex_core' && (
          <g className="boss-character-body">
            {/* Rayos eléctricos / chispas energéticas */}
            <g className="boss-lightning-arcs">
              <polygon points="26,44 38,50 32,56 46,62 34,68" fill="#FFE600" stroke="#000000" strokeWidth="1.5" />
              <polygon points="134,44 122,50 128,56 114,62 126,68" fill="#FFE600" stroke="#000000" strokeWidth="1.5" />
            </g>

            {/* Anillo exterior de aceleración 3D */}
            <circle
              cx="80"
              cy="78"
              r="48"
              fill="none"
              stroke="#0F172A"
              strokeWidth="9"
            />
            <circle
              cx="80"
              cy="78"
              r="48"
              fill="none"
              stroke="#000000"
              strokeWidth="4"
            />
            <circle
              cx="80"
              cy="78"
              r="48"
              fill="none"
              stroke={primaryColor}
              strokeWidth="4"
              strokeDasharray="24 16"
            />

            {/* Anillo interior contrarrotatorio */}
            <circle
              cx="80"
              cy="78"
              r="34"
              fill="none"
              stroke="#000000"
              strokeWidth="7"
            />
            <circle
              cx="80"
              cy="78"
              r="34"
              fill="none"
              stroke="#FFE600"
              strokeWidth="3.5"
              strokeDasharray="16 12"
            />

            {/* Núcleo central / Ojo de la singularidad */}
            <circle cx="80" cy="78" r="22" fill="#020617" stroke="#000000" strokeWidth="3.5" />
            <circle cx="80" cy="78" r="16" fill={primaryColor} />
            <circle cx="80" cy="78" r="9" fill="#00E5FF" />

            {/* Símbolo de infinito estilizado (∞) en el ojo */}
            {isDefeated ? (
              <text x="80" y="83" fill="#64748B" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                X_X
              </text>
            ) : (
              <text x="80" y="85" fill="#FFFFFF" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                ∞
              </text>
            )}

            {/* Cuatro satélites orbitando los anillos */}
            <circle cx="80" cy="28" r="7" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />
            <circle cx="80" cy="128" r="7" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />
            <circle cx="30" cy="78" r="7" fill="#00E5FF" stroke="#000000" strokeWidth="2.5" />
            <circle cx="130" cy="78" r="7" fill="#00E5FF" stroke="#000000" strokeWidth="2.5" />
          </g>
        )}

        {/* ─────────────────────────────────────────────────────────────
            6. GUARDIÁN DEL ALCANCE MODULAR (SENTINEL SHIELD)
            Paladín cibernético con escudo torreón, yelmo alado y visor T
           ───────────────────────────────────────────────────────────── */}
        {avatarType === 'sentinel_shield' && (
          <g className="boss-character-body">
            {/* Alas / Aletas del yelmo */}
            <polygon points="56,36 34,16 48,46" fill="#38BDF8" stroke="#000000" strokeWidth="2.5" />
            <polygon points="104,36 126,16 112,46" fill="#38BDF8" stroke="#000000" strokeWidth="2.5" />

            {/* Cabeza / Yelmo cibernético */}
            <rect x="54" y="24" width="52" height="42" rx="14" fill="#0F172A" stroke="#000000" strokeWidth="3.5" />
            <line x1="62" y1="28" x2="98" y2="28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />

            {/* Visor T-Shape Mandaloriano */}
            <path
              d="M62 38 L98 38 L98 44 L84 44 L84 56 L76 56 L76 44 L62 44 Z"
              fill={isDefeated ? '#64748B' : isHurt ? '#FF2A6D' : '#00E5FF'}
              stroke="#000000"
              strokeWidth="2"
            />

            {/* Gran Escudo Torreón Neo-Brutalista en primer plano */}
            <path
              d="M42 56 L118 56 L110 114 L80 132 L50 114 Z"
              fill={`url(#bossGradPrimary_${uid})`}
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Borde interior del escudo */}
            <path
              d="M48 62 L112 62 L104 108 L80 124 L56 108 Z"
              fill="#0F172A"
              stroke="#000000"
              strokeWidth="2.5"
            />

            {/* Emblema de candado / mira de seguridad en el escudo */}
            <circle cx="80" cy="88" r="14" fill="#FFE600" stroke="#000000" strokeWidth="3" />
            <rect x="74" y="84" width="12" height="10" rx="2" fill="#000000" />
            <path d="M76 84 V80 Q80 76 84 80 V84" stroke="#000000" strokeWidth="2.5" fill="none" />
          </g>
        )}

        {/* ─────────────────────────────────────────────────────────────
            7. EMPERADOR DEL CÓDIGO (EMPEROR MECH / DEFAULT HIGH BOSS)
            Mecha supremo con corona real, hombros con cañones y capa de plasma
           ───────────────────────────────────────────────────────────── */}
        {(avatarType === 'emperor_mech' ||
          (!['glitch_bug', 'iron_titan', 'cyber_specter', 'hydra_beast', 'vortex_core', 'sentinel_shield'].includes(
            avatarType
          ))) && (
          <g className="boss-character-body">
            {/* Capa de plasma posterior */}
            <path
              d="M44 64 L20 126 L80 118 L140 126 L116 64 Z"
              fill="#4C1D95"
              stroke="#000000"
              strokeWidth="3.5"
            />
            <path d="M26 122 L80 114 L134 122" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Cañones de hombro duales */}
            <rect x="22" y="44" width="16" height="28" rx="4" fill="#1E293B" stroke="#000000" strokeWidth="3" />
            <polygon points="26,44 30,34 34,44" fill={accentColor} stroke="#000000" strokeWidth="2" />

            <rect x="122" y="44" width="16" height="28" rx="4" fill="#1E293B" stroke="#000000" strokeWidth="3" />
            <polygon points="126,44 130,34 134,44" fill={accentColor} stroke="#000000" strokeWidth="2" />

            {/* Chasis mecha imperial */}
            <path
              d="M40 62 L120 62 L112 120 L48 120 Z"
              fill={`url(#bossChassisDark_${uid})`}
              stroke="#000000"
              strokeWidth="4"
            />

            {/* Núcleo imperial central */}
            <polygon points="80,72 94,84 80,106 66,84" fill={primaryColor} stroke="#000000" strokeWidth="3" />
            <circle cx="80" cy="86" r="5" fill="#FFE600" />

            {/* Cabeza robótica coronada */}
            <rect x="56" y="32" width="48" height="34" rx="8" fill="#1E293B" stroke="#000000" strokeWidth="3.5" />
            {/* Corona dorada del emperador */}
            <polygon points="54,32 58,16 68,26 80,12 92,26 102,16 106,32" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />

            {/* Visor de emperador */}
            <rect x="62" y="42" width="36" height="12" rx="4" fill="#020617" stroke="#000000" strokeWidth="2" />
            {isDefeated ? (
              <g stroke="#FF2A6D" strokeWidth="2" strokeLinecap="round">
                <line x1="68" y1="46" x2="74" y2="50" />
                <line x1="74" y1="46" x2="68" y2="50" />
                <line x1="86" y1="46" x2="92" y2="50" />
                <line x1="92" y1="46" x2="86" y2="50" />
              </g>
            ) : (
              <g>
                <circle cx="70" cy="48" r="3" fill="#FF2A6D" />
                <circle cx="90" cy="48" r="3" fill="#FF2A6D" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
