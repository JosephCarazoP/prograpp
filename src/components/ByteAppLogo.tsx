import React from 'react';
import byteAppIconImg from '../assets/byte-app-icon.png';

export type LogoVariant = 'icon' | 'horizontal' | 'hero' | 'badge' | 'mascot';
export type ByteLogoAnimStep = 'idle' | 'look-left' | 'blink-1' | 'look-right' | 'blink-2' | 'look-front' | 'smile';

interface ByteAppLogoProps {
  /**
   * Variante visual del logo:
   * - 'icon': Ícono de aplicación 3D oficial con Byte y el fuego de racha
   * - 'horizontal': Ícono 3D + Wordmark "PrograApp" con tipografía Duolingo 3D
   * - 'hero': Logotipo gigante centrado con eslogan y tipografía 3D
   * - 'badge': Emblema circular/trofeo 3D coleccionable
   * - 'mascot': Byte en 3D puro
   */
  variant?: LogoVariant;
  /** Tamaño base en píxeles (ancho o alto según la variante) */
  size?: number;
  /** Si es interactivo / animado en hover */
  animated?: boolean;
  /** Paso de animación expresiva (para pantallas de carga o estados) */
  animStep?: ByteLogoAnimStep;
  /** Usar renderizado SVG vectorial puro en vez del render 3D hiperrealista */
  preferSvg?: boolean;
  /** Mostrar subtítulo / eslogan ('Conecta con el Código' / 'Kotlin & SQL') */
  showTagline?: boolean;
  /** Modo oscuro para textos en caso de fondos oscuros */
  isDarkBackground?: boolean;
  /** Clase CSS adicional */
  className?: string;
  /** Manejador de clic opcional */
  onClick?: () => void;
  /** Título accesible o tooltip */
  title?: string;
}

/**
 * Ícono Oficial 3D de Byte proporcionado para la app PrograApp
 */
export const ByteOfficialAppIcon: React.FC<{
  size?: number;
  className?: string;
  animated?: boolean;
}> = ({ size = 64, className = '', animated = true }) => {
  return (
    <div
      className={`byte-official-icon-container ${animated ? 'byte-logo-animated' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
        userSelect: 'none'
      }}
    >
      <img
        src={byteAppIconImg}
        alt="Byte — Ícono Oficial PrograApp"
        width={size}
        height={size}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '24%',
          filter: 'drop-shadow(0 6px 14px rgba(2, 132, 199, 0.28)) drop-shadow(0 2px 4px rgba(15, 23, 42, 0.12))',
          transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        draggable={false}
      />
    </div>
  );
};

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * LOGO OFICIAL 3D DE PROGRAAPP — 100% VECTOR SVG DUOLINGO 3D / 0% IA
 * ═════════════════════════════════════════════════════════════════════════════
 * Mascota principal: Byte el Robot
 * Estilo: Juguete tangible Duolingo 3D con extrusiones dimensionales,
 * biseles biselados, brillos especulares, paleta vibrante y elementos creativos
 * de código (brackets < / >, orbe de poder dorado y núcleo de energía verde).
 */
export const ByteAppIconSVG: React.FC<{
  size?: number;
  className?: string;
  animated?: boolean;
  animStep?: ByteLogoAnimStep;
}> = ({ size = 64, className = '', animated = true, animStep = 'idle' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`byte-app-icon-svg ${animated ? 'byte-logo-animated' : ''} ${className}`}
      style={{ overflow: 'visible', display: 'inline-block', verticalAlign: 'middle' }}
      aria-label="Ícono oficial 3D de Byte en PrograApp"
    >
      <defs>
        {/* Sombra proyectada del App Icon */}
        <filter id="iconDropShadow" x="-10%" y="-10%" width="130%" height="135%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0284C7" floodOpacity="0.28" />
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#0F172A" floodOpacity="0.16" />
        </filter>

        {/* Brillo suave de la gema de energía */}
        <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradiente del Squircle Exterior (Azul Duolingo Profundo a Cian) */}
        <linearGradient id="squircleBevelGrad" x1="100" y1="20" x2="100" y2="192" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="85%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        <linearGradient id="squircleFaceGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="35%" stopColor="#0EA5E9" />
          <stop offset="70%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        {/* Foco de luz central dentro del App Icon */}
        <radialGradient id="squircleSpotlight" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="65%" stopColor="#0284C7" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
        </radialGradient>

        {/* Chasis de Byte (Celeste Eléctrico a Azul Cian) */}
        <linearGradient id="byteChassisGrad" x1="40" y1="38" x2="160" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="40%" stopColor="#0EA5E9" />
          <stop offset="85%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        {/* Bisel inferior 3D del chasis */}
        <linearGradient id="byteBevelGrad" x1="100" y1="110" x2="100" y2="132" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* Orejeras cilíndricas laterales */}
        <linearGradient id="byteEarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* Visor CRT oscurecido con reflejo */}
        <linearGradient id="byteVisorGrad" x1="60" y1="52" x2="140" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#050811" />
          <stop offset="60%" stopColor="#0B132B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Esfera de oro de la antena (Radial 3D) */}
        <radialGradient id="byteGoldOrb" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FEF08A" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </radialGradient>

        {/* Mástil metálico cromado */}
        <linearGradient id="byteAntennaMast" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="45%" stopColor="#F1F5F9" />
          <stop offset="75%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Bracket verde Duolingo (Código < ) */}
        <linearGradient id="bracketGreenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="35%" stopColor="#22C55E" />
          <stop offset="85%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>

        {/* Bracket naranja Duolingo (Código > ) */}
        <linearGradient id="bracketOrangeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* ═══ 1. BASE SQUIRCLE 3D ESTILO DUOLINGO APP ICON ═══ */}
      <g className="byte-icon-container" filter="url(#iconDropShadow)">
        {/* Bisel inferior 3D / Sombra de extrusión (profundidad de botón) */}
        <rect
          x="14"
          y="24"
          width="172"
          height="164"
          rx="44"
          fill="url(#squircleBevelGrad)"
          stroke="#075985"
          strokeWidth="3"
        />

        {/* Cara frontal del Squircle */}
        <rect
          x="14"
          y="16"
          width="172"
          height="164"
          rx="44"
          fill="url(#squircleFaceGrad)"
          stroke="#38BDF8"
          strokeWidth="2.5"
        />

        {/* Foco de luz interna radial */}
        <rect x="14" y="16" width="172" height="164" rx="44" fill="url(#squircleSpotlight)" />

        {/* Reflejo de brillo curvo en el borde superior del Squircle */}
        <path
          d="M36 22 C64 18, 136 18, 164 22"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />

        {/* Micro-cuadrícula decorativa de programación en el fondo */}
        <g stroke="#38BDF8" strokeOpacity="0.12" strokeWidth="1.2">
          <line x1="14" y1="65" x2="186" y2="65" strokeDasharray="3 3" />
          <line x1="14" y1="135" x2="186" y2="135" strokeDasharray="3 3" />
          <line x1="65" y1="16" x2="65" y2="180" strokeDasharray="3 3" />
          <line x1="135" y1="16" x2="135" y2="180" strokeDasharray="3 3" />
        </g>
      </g>

      {/* ═══ 2. ELEMENTOS CREATIVOS DE CÓDIGO (BRACKETS 3D < > FLOTANTES) ═══ */}
      {/* Bracket Izquierdo Verde Dulce '<' */}
      <g className="bracket-left-3d" transform="translate(18, 92)">
        {/* Sombra 3D */}
        <path
          d="M18 0 L4 14 L18 28 L18 34 L0 16 L0 12 L18 -6 Z"
          fill="#14532D"
          opacity="0.8"
        />
        {/* Cuerpo Frontal */}
        <path
          d="M18 -2 L4 12 L18 26 L12 26 L0 14 L0 10 L12 -2 Z"
          fill="url(#bracketGreenGrad)"
          stroke="#16A34A"
          strokeWidth="1.8"
        />
        {/* Brillo especular */}
        <path d="M12 0 L2 11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
      </g>

      {/* Bracket Derecho Naranja / Ámbar Dulce '>' */}
      <g className="bracket-right-3d" transform="translate(164, 92)">
        {/* Sombra 3D */}
        <path
          d="M0 0 L14 14 L0 28 L0 34 L18 16 L18 12 L0 -6 Z"
          fill="#78350F"
          opacity="0.8"
        />
        {/* Cuerpo Frontal */}
        <path
          d="M0 -2 L14 12 L0 26 L6 26 L18 14 L18 10 L6 -2 Z"
          fill="url(#bracketOrangeGrad)"
          stroke="#D97706"
          strokeWidth="1.8"
        />
        {/* Brillo especular */}
        <path d="M6 0 L16 11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
      </g>

      {/* Estrella 3D de Logro en la esquina superior derecha */}
      <g className="achievement-sparkle-3d" transform="translate(154, 30)">
        <polygon
          points="10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7"
          fill="#FDE047"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <circle cx="10" cy="10" r="3" fill="#FFFFFF" />
      </g>

      {/* ═══ 3. MASCOTA BYTE EL ROBOT (POP-OUT 3D SALIENDO DEL MARCO) ═══ */}
      <g className="byte-mascot-figure">
        {/* Sombra de contacto del torso sobre la base */}
        <ellipse cx="100" cy="172" rx="46" ry="10" fill="#0369A1" fillOpacity="0.6" />

        {/* Pecho y Torso con Nucleo de Energía */}
        <path
          d="M62 122 C62 122 56 160 64 168 C72 174 128 174 136 168 C144 160 138 122 138 122 Z"
          fill="url(#byteChassisGrad)"
          stroke="#0369A1"
          strokeWidth="3"
        />

        {/* Cavidad del Reactor del Pecho */}
        <rect
          x="82"
          y="136"
          width="36"
          height="22"
          rx="10"
          fill="#0B132B"
          stroke="#0369A1"
          strokeWidth="2"
        />

        {/* Orbe / Gema de Energía Activa Verde Esmeralda Duolingo */}
        <circle cx="100" cy="147" r="7.5" fill="#22C55E" filter="url(#coreGlow)" />
        <circle cx="100" cy="147" r="5" fill="#4ADE80" />
        <circle cx="98" cy="144.5" r="2" fill="#FFFFFF" />

        {/* Manos Robóticas 3D Asomándose en los bordes inferiores */}
        {/* Mano Izquierda */}
        <g className="byte-hand-left" transform="translate(42, 142)">
          <ellipse cx="12" cy="12" rx="11" ry="9" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx="8" cy="10" r="2.2" fill="#FFFFFF" />
        </g>
        {/* Mano Derecha (Saludando con el pulgar arriba) */}
        <g className="byte-hand-right" transform="translate(134, 142)">
          <ellipse cx="12" cy="12" rx="11" ry="9" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx="16" cy="10" r="2.2" fill="#FFFFFF" />
        </g>

        {/* Orejeras cilíndricas 3D de Byte */}
        {/* Orejera Izquierda */}
        <rect
          x="30"
          y="62"
          width="15"
          height="38"
          rx="7"
          fill="url(#byteEarGrad)"
          stroke="#0369A1"
          strokeWidth="2.4"
        />
        <circle cx="37.5" cy="81" r="3.2" fill="#22C55E" />
        <circle cx="36.5" cy="79.8" r="1.1" fill="#FFFFFF" />

        {/* Orejera Derecha */}
        <rect
          x="155"
          y="62"
          width="15"
          height="38"
          rx="7"
          fill="url(#byteEarGrad)"
          stroke="#0369A1"
          strokeWidth="2.4"
        />
        <circle cx="162.5" cy="81" r="3.2" fill="#22C55E" />
        <circle cx="161.5" cy="79.8" r="1.1" fill="#FFFFFF" />

        {/* Bisel inferior 3D de la cabeza */}
        <rect
          x="42"
          y="46"
          width="116"
          height="80"
          rx="32"
          fill="url(#byteBevelGrad)"
          stroke="#075985"
          strokeWidth="2.5"
        />

        {/* Cabeza / Casco 3D de Byte */}
        <rect
          x="42"
          y="38"
          width="116"
          height="80"
          rx="32"
          fill="url(#byteChassisGrad)"
          stroke="#0369A1"
          strokeWidth="3.2"
        />

        {/* Reflejo especular superior curvo del casco */}
        <path
          d="M58 46 C76 40, 124 40, 142 46"
          stroke="#FFFFFF"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />

        {/* Pantalla Visor CRT Oscura */}
        <rect
          x="54"
          y="52"
          width="92"
          height="54"
          rx="18"
          fill="url(#byteVisorGrad)"
          stroke="#0369A1"
          strokeWidth="2.4"
        />

        {/* Reflejo de cristal biselado en el visor */}
        <path
          d="M58 54 L96 54 L76 104 L58 104 Z"
          fill="#FFFFFF"
          fillOpacity="0.09"
        />

        {/* ═══ OJOS EXPRESIVOS DUOLINGO 3D SEGÚN ESTADO ═══ */}
        {animStep === 'look-left' ? (
          <g className="byte-eyes-look-left" style={{ transition: 'all 0.2s ease' }}>
            <ellipse cx="71" cy="76" rx="8.5" ry="10" fill="#38BDF8" />
            <ellipse cx="71" cy="76" rx="6" ry="7.5" fill="#0284C7" />
            <circle cx="69" cy="72" r="2.8" fill="#FFFFFF" />

            <ellipse cx="119" cy="76" rx="8.5" ry="10" fill="#38BDF8" />
            <ellipse cx="119" cy="76" rx="6" ry="7.5" fill="#0284C7" />
            <circle cx="117" cy="72" r="2.8" fill="#FFFFFF" />

            {/* Boca curiosa */}
            <path d="M93 89 Q100 93 107 89" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          </g>
        ) : animStep === 'look-right' ? (
          <g className="byte-eyes-look-right" style={{ transition: 'all 0.2s ease' }}>
            <ellipse cx="81" cy="76" rx="8.5" ry="10" fill="#38BDF8" />
            <ellipse cx="81" cy="76" rx="6" ry="7.5" fill="#0284C7" />
            <circle cx="83" cy="72" r="2.8" fill="#FFFFFF" />

            <ellipse cx="129" cy="76" rx="8.5" ry="10" fill="#38BDF8" />
            <ellipse cx="129" cy="76" rx="6" ry="7.5" fill="#0284C7" />
            <circle cx="131" cy="72" r="2.8" fill="#FFFFFF" />

            {/* Boca curiosa */}
            <path d="M93 89 Q100 93 107 89" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          </g>
        ) : animStep === 'blink-1' || animStep === 'blink-2' ? (
          <g className="byte-eyes-blink">
            <line x1="68" y1="76" x2="84" y2="76" stroke="#38BDF8" strokeWidth="3.8" strokeLinecap="round" />
            <line x1="116" y1="76" x2="132" y2="76" stroke="#38BDF8" strokeWidth="3.8" strokeLinecap="round" />
            <path d="M94 89 Q100 92 106 89" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        ) : animStep === 'smile' ? (
          <g className="byte-eyes-happy-smile" style={{ transition: 'all 0.2s ease' }}>
            <path d="M68 79 Q76 67 84 79" stroke="#38BDF8" strokeWidth="4.2" strokeLinecap="round" fill="none" />
            <circle cx="76" cy="69" r="2" fill="#FFFFFF" />

            <path d="M116 79 Q124 67 132 79" stroke="#38BDF8" strokeWidth="4.2" strokeLinecap="round" fill="none" />
            <circle cx="124" cy="69" r="2" fill="#FFFFFF" />

            {/* Gran sonrisa feliz Duolingo */}
            <path d="M89 87 Q100 99 111 87" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M90 88 Q100 97 110 88 Z" fill="#38BDF8" fillOpacity="0.35" />
          </g>
        ) : (
          /* Estado Normal / Idle / Look-front */
          <>
            <g className="byte-eye-left">
              <ellipse cx="76" cy="76" rx="9" ry="11" fill="#38BDF8" />
              <ellipse cx="76" cy="76" rx="6.5" ry="8.5" fill="#0284C7" />
              <circle cx="79.5" cy="71.5" r="3.2" fill="#FFFFFF" />
              <circle cx="73" cy="80.5" r="1.4" fill="#FFFFFF" fillOpacity="0.8" />
            </g>
            <g className="byte-eye-right">
              <ellipse cx="124" cy="76" rx="9" ry="11" fill="#38BDF8" />
              <ellipse cx="124" cy="76" rx="6.5" ry="8.5" fill="#0284C7" />
              <circle cx="127.5" cy="71.5" r="3.2" fill="#FFFFFF" />
              <circle cx="121" cy="80.5" r="1.4" fill="#FFFFFF" fillOpacity="0.8" />
            </g>
            <path d="M91 88 Q100 97 109 88" stroke="#38BDF8" strokeWidth="3.6" strokeLinecap="round" fill="none" />
            <path d="M92 89 Q100 95 108 89 Z" fill="#38BDF8" fillOpacity="0.28" />
          </>
        )}

        {/* Mejillas Sonrosadas Digitales (Encanto Duolingo) */}
        <ellipse cx="64" cy="89" rx="5.5" ry="3.5" fill="#FB7185" fillOpacity="0.75" />
        <ellipse cx="136" cy="89" rx="5.5" ry="3.5" fill="#FB7185" fillOpacity="0.75" />

        {/* ═══ ANTENA 3D CON ESFERA DORADA (SOBRESALIENDO DEL SQUIRCLE) ═══ */}
        {/* Base de la antena en el casco */}
        <rect x="94" y="32" width="12" height="8" rx="2.5" fill="#0369A1" />
        {/* Mástil de metal cromado */}
        <rect
          x="96.5"
          y="18"
          width="7"
          height="16"
          rx="3.5"
          fill="url(#byteAntennaMast)"
          stroke="#334155"
          strokeWidth="1.2"
        />
        {/* Resplandor áureo */}
        <circle cx="100" cy="15" r="18" fill="#FDE047" fillOpacity="0.22" />
        {/* Esfera de Oro 3D */}
        <circle
          cx="100"
          cy="15"
          r="12.5"
          fill="url(#byteGoldOrb)"
          stroke="#B45309"
          strokeWidth="2"
        />
        {/* Destello de estrella blanca en el orbe */}
        <polygon
          points="97,9 99,14 104,14 100,17 102,22 97,18 92,22 94,17 90,14 95,14"
          fill="#FFFFFF"
          fillOpacity="0.85"
        />
        <circle cx="97" cy="12" r="2.2" fill="#FFFFFF" />
      </g>
    </svg>
  );
};

/**
 * Tipografía 3D "PrograApp" Vectorial estilo Duolingo
 */
export const ByteWordmarkSVG: React.FC<{
  size?: number;
  isDarkBackground?: boolean;
  showTagline?: boolean;
}> = ({ isDarkBackground = false, showTagline = false }) => {
  const textColor = isDarkBackground ? '#FFFFFF' : '#0F172A';
  const shadowColor = isDarkBackground ? '#0369A1' : '#CBD5E1';

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        userSelect: 'none',
        lineHeight: 1
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          fontFamily: 'var(--font-ui, "Nunito", sans-serif)',
          fontWeight: 1000,
          fontSize: '1.45rem',
          letterSpacing: '-0.4px',
          textTransform: 'none'
        }}
      >
        {/* "Progra" en Azul Cobalto / Blanco según fondo con sombra 3D */}
        <span
          style={{
            color: textColor,
            textShadow: `0 3px 0 ${shadowColor}`,
            transition: 'color 0.2s ease'
          }}
        >
          Progra
        </span>

        {/* "App" en Verde Esmeralda Duolingo con extrusión 3D */}
        <span
          style={{
            color: '#22C55E',
            textShadow: '0 3px 0 #15803D',
            marginLeft: '1px',
            position: 'relative'
          }}
        >
          App
          {/* Pequeño destello de código / estrella en el punto */}
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-8px',
              width: '6px',
              height: '6px',
              background: '#F59E0B',
              borderRadius: '50%',
              boxShadow: '0 0 6px #FBBF24'
            }}
          />
        </span>
      </div>

      {showTagline && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '3px',
            fontFamily: 'var(--font-ui, "Nunito", sans-serif)',
            fontSize: '0.62rem',
            fontWeight: 900,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            color: isDarkBackground ? '#38BDF8' : '#0284C7',
            background: isDarkBackground ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.08)',
            padding: '2px 6px',
            borderRadius: '6px',
            border: `1px solid ${isDarkBackground ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.15)'}`
          }}
        >
          <span>Aprende Kotlin & SQL</span>
        </div>
      )}
    </div>
  );
};

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * COMPONENTE PRINCIPAL: ByteAppLogo
 * ═════════════════════════════════════════════════════════════════════════════
 */
export const ByteAppLogo: React.FC<ByteAppLogoProps> = ({
  variant = 'horizontal',
  size = 40,
  animated = true,
  animStep = 'idle',
  preferSvg = false,
  showTagline = false,
  isDarkBackground = false,
  className = '',
  onClick,
  title = 'PrograApp — Conecta con el Código'
}) => {
  const isClickable = Boolean(onClick);

  // Helper para renderizar el ícono 3D: por defecto usa el render oficial 3D proporcionado
  const renderIcon = (iconSize: number) => {
    if (preferSvg) {
      return <ByteAppIconSVG size={iconSize} animated={animated} animStep={animStep} />;
    }
    return <ByteOfficialAppIcon size={iconSize} animated={animated} />;
  };

  // 1. Variante solo Ícono Squircle
  if (variant === 'icon') {
    return (
      <div
        className={`byte-app-logo-wrapper logo-variant-icon ${isClickable ? 'is-clickable' : ''} ${className}`}
        onClick={onClick}
        title={title}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isClickable ? 'pointer' : 'default',
          transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {renderIcon(size)}
      </div>
    );
  }

  // 2. Variante Horizontal: Ícono 3D + Wordmark "PrograApp"
  if (variant === 'horizontal') {
    const iconSize = Math.max(30, Math.round(size * 0.88));
    return (
      <div
        className={`byte-app-logo-wrapper logo-variant-horizontal ${isClickable ? 'is-clickable' : ''} ${className}`}
        onClick={onClick}
        title={title}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
          }
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          cursor: isClickable ? 'pointer' : 'default',
          userSelect: 'none',
          textDecoration: 'none',
          transition: 'transform 0.12s ease'
        }}
      >
        <div style={{ flexShrink: 0, position: 'relative' }}>
          {renderIcon(iconSize)}
        </div>
        <ByteWordmarkSVG isDarkBackground={isDarkBackground} showTagline={showTagline} />
      </div>
    );
  }

  // 3. Variante Hero / Escenario: Mascota 3D Gigante con Brackets y Eslogan
  if (variant === 'hero') {
    const heroSize = size || 110;
    return (
      <div
        className={`byte-app-logo-wrapper logo-variant-hero ${isClickable ? 'is-clickable' : ''} ${className}`}
        onClick={onClick}
        title={title}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          cursor: isClickable ? 'pointer' : 'default',
          padding: '12px'
        }}
      >
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          {renderIcon(heroSize)}
        </div>
        <ByteWordmarkSVG isDarkBackground={isDarkBackground} showTagline={showTagline} />
      </div>
    );
  }

  // 4. Variante Badge: Emblema coleccionable 3D con halo
  return (
    <div
      className={`byte-app-logo-wrapper logo-variant-badge ${isClickable ? 'is-clickable' : ''} ${className}`}
      onClick={onClick}
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px',
        borderRadius: '24px',
        background: 'radial-gradient(circle at 50% 30%, #F0F9FF 0%, #E0F2FE 100%)',
        border: '2px solid #BAE6FD',
        boxShadow: '0 4px 0 #7DD3FC, 0 8px 16px rgba(2, 132, 199, 0.14)',
        cursor: isClickable ? 'pointer' : 'default'
      }}
    >
      {renderIcon(size)}
    </div>
  );
};
