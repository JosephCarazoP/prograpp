import React from 'react';

export type DevRoadmapAction =
  | 'reading'
  | 'thinking'
  | 'studying'
  | 'looking'
  | 'celebrating'
  | 'resting'
  | 'progress'
  | 'coding';

interface DevRoadmapCharacterProps {
  action: DevRoadmapAction;
  side?: 'left' | 'right';
  className?: string;
}

export const DevRoadmapCharacter: React.FC<DevRoadmapCharacterProps> = ({
  action,
  side = 'right',
  className = ''
}) => {
  // Configuración de accesorios, expresiones y colores por acción
  const actionConfig = {
    reading: {
      label: 'Leyendo docs',
      tagColor: '#38BDF8',
      moodColor: '#38BDF8'
    },
    thinking: {
      label: 'Pensando algoritmo',
      tagColor: '#F59E0B',
      moodColor: '#FBBF24'
    },
    studying: {
      label: 'Estudiando sintaxis',
      tagColor: '#818CF8',
      moodColor: '#A5B4FC'
    },
    looking: {
      label: 'Inspeccionando código',
      tagColor: '#38BDF8',
      moodColor: '#38BDF8'
    },
    celebrating: {
      label: '¡Celebrando logro!',
      tagColor: '#22C55E',
      moodColor: '#4ADE80'
    },
    resting: {
      label: 'Café & descanso',
      tagColor: '#F97316',
      moodColor: '#FDBA74'
    },
    progress: {
      label: 'Revisando progreso',
      tagColor: '#10B981',
      moodColor: '#34D399'
    },
    coding: {
      label: 'Programando en vivo',
      tagColor: '#06B6D4',
      moodColor: '#22D3EE'
    }
  }[action];

  return (
    <div
      className={`dev-roadmap-companion-wrapper ${side} ${className}`}
      style={{
        position: 'absolute',
        [side === 'left' ? 'right' : 'left']: 'calc(100% + 14px)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: side === 'left' ? 'flex-end' : 'flex-start',
        pointerEvents: 'none',
        zIndex: 4,
        userSelect: 'none'
      }}
    >
      {/* Contenedor del personaje con animación flotante suave */}
      <div
        style={{
          position: 'relative',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))',
          animation: 'devFloatSoft 3.4s ease-in-out infinite alternate',
          transformOrigin: 'center bottom'
        }}
      >
        <svg
          width="64"
          height="66"
          viewBox="0 0 80 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Chasis 3D cyan robot Dev */}
            <linearGradient id={`devRdChassis-${action}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="30%" stopColor="#0EA5E9" />
              <stop offset="70%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Orejeras cilíndricas 3D */}
            <linearGradient id="devRdEar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#082F49" />
            </linearGradient>

            {/* Antena esferoide 3D dorada */}
            <radialGradient id="devRdAntenna" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </radialGradient>

            {/* Visor de vidrio oscuro */}
            <linearGradient id="devRdVisor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
          </defs>

          {/* Sombra de apoyo */}
          <ellipse cx="40" cy="79" rx="20" ry="3" fill="#000000" fillOpacity="0.18" />

          {/* Soporte y Base Metálica 3D */}
          <rect x="35" y="66" width="10" height="5" fill="#0369A1" />
          <rect x="26" y="70" width="28" height="6" rx="3" fill="#082F49" stroke="#0284C7" strokeWidth="1.2" />

          {/* Antena 3D */}
          <rect x="38" y="8" width="4" height="9" rx="1.5" fill="#64748B" stroke="#334155" strokeWidth="0.8" />
          <circle cx="40" cy="7" r="5" fill="url(#devRdAntenna)" stroke="#FEF08A" strokeWidth="1" />

          {/* Orejeras laterales con LED verde */}
          <rect x="9" y="27" width="6" height="18" rx="3" fill="url(#devRdEar)" stroke="#0369A1" strokeWidth="1" />
          <circle cx="12" cy="36" r="1.5" fill="#22C55E" />

          <rect x="65" y="27" width="6" height="18" rx="3" fill="url(#devRdEar)" stroke="#0369A1" strokeWidth="1" />
          <circle cx="68" cy="36" r="1.5" fill="#22C55E" />

          {/* Chasis 3D del Robot Dev */}
          <rect x="14" y="16" width="52" height="42" rx="13" fill="#0369A1" />
          <rect x="14" y="14" width="52" height="42" rx="13" fill={`url(#devRdChassis-${action})`} stroke="#7DD3FC" strokeWidth="1.8" />
          {/* Brillo especular superior */}
          <line x1="22" y1="16" x2="58" y2="16" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.75" />

          {/* Pantalla CRT 3D */}
          <rect x="20" y="21" width="40" height="28" rx="8" fill="url(#devRdVisor)" stroke="#0369A1" strokeWidth="1.5" />
          {/* Reflejo cristal diagonal */}
          <path d="M21 22 L45 22 L30 48 L21 48 Z" fill="#FFFFFF" fillOpacity="0.08" />

          {/* ROSTRO DIGITAL Y ACCESORIOS SEGÚN ACCIÓN */}

          {/* 1. LEYENDO (Reading tech docs/book) */}
          {action === 'reading' && (
            <g>
              {/* Ojos mirando hacia abajo al libro */}
              <path d="M28 32 C30 35, 34 35, 36 32" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M44 32 C46 35, 50 35, 52 32" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Boca sonriente satisfecha */}
              <path d="M37 41 Q40 44 43 41" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              {/* Libro abierto sostenido abajo */}
              <path d="M24 54 L39 52 L39 65 L24 67 Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" />
              <path d="M41 52 L56 54 L56 67 L41 65 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
              {/* Líneas de código en el libro */}
              <line x1="27" y1="56" x2="36" y2="55" stroke="#0284C7" strokeWidth="1" strokeLinecap="round" />
              <line x1="27" y1="60" x2="34" y2="59" stroke="#38BDF8" strokeWidth="1" strokeLinecap="round" />
              <line x1="44" y1="55" x2="53" y2="56" stroke="#0284C7" strokeWidth="1" strokeLinecap="round" />
              <line x1="44" y1="59" x2="51" y2="60" stroke="#38BDF8" strokeWidth="1" strokeLinecap="round" />
              {/* Manitas del robot sosteniendo el libro */}
              <circle cx="23" cy="59" r="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
              <circle cx="57" cy="59" r="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
            </g>
          )}

          {/* 2. PENSANDO (Thinking with lightbulb) */}
          {action === 'thinking' && (
            <g>
              {/* Ojo izquierdo dudoso plano */}
              <line x1="28" y1="33" x2="35" y2="33" stroke="#FBBF24" strokeWidth="2.4" strokeLinecap="round" />
              {/* Ojo derecho abierto mirando arriba */}
              <circle cx="48" cy="33" r="3.5" fill="#FBBF24" />
              <circle cx="49" cy="32" r="1.2" fill="#FFFFFF" />
              {/* Boca de duda pequeña */}
              <line x1="37" y1="41" x2="43" y2="41" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
              {/* Manita robótica al mentón */}
              <circle cx="48" cy="48" r="3.2" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
              {/* Bombillita dorada brillante flotando arriba a la derecha */}
              <g style={{ transform: 'translate(48px, 0px)' }}>
                <circle cx="8" cy="7" r="5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
                <rect x="6.5" y="11" width="3" height="2.5" fill="#64748B" />
                {/* Rayitos de idea */}
                <line x1="8" y1="0" x2="8" y2="1.5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="14" y1="4" x2="13" y2="5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="2" y1="4" x2="3" y2="5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
              </g>
            </g>
          )}

          {/* 3. ESTUDIANDO (Studying code tablet) */}
          {action === 'studying' && (
            <g>
              {/* Ojos concentrados */}
              <circle cx="32" cy="33" r="3.6" fill="#818CF8" />
              <circle cx="33" cy="32" r="1.3" fill="#FFFFFF" />
              <circle cx="48" cy="33" r="3.6" fill="#818CF8" />
              <circle cx="49" cy="32" r="1.3" fill="#FFFFFF" />
              {/* Sonrisa concentrada */}
              <path d="M37 40 Q40 43 43 40" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Tableta táctil de estudio sostenida */}
              <rect x="26" y="52" width="28" height="18" rx="3" fill="#0F172A" stroke="#818CF8" strokeWidth="1.4" />
              {/* Código en la tableta < / > */}
              <text x="31" y="64" fill="#38BDF8" fontSize="8" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
              {/* Manitas */}
              <circle cx="24" cy="60" r="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
              <circle cx="56" cy="60" r="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
            </g>
          )}

          {/* 4. MIRANDO ALGO (Looking through magnifying glass) */}
          {action === 'looking' && (
            <g>
              {/* Ojo izquierdo normal guiñado */}
              <path d="M27 34 L31 32 L27 30" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Ojo derecho muy grande con lupa */}
              <circle cx="49" cy="33" r="5.2" fill="#38BDF8" />
              <circle cx="51" cy="31.5" r="1.8" fill="#FFFFFF" />
              {/* Boca sonriente curiosa en 'o' */}
              <circle cx="38" cy="41" r="2.2" stroke="#38BDF8" strokeWidth="1.6" fill="none" />
              {/* Lupa 3D sobre ojo derecho */}
              <circle cx="49" cy="33" r="8" fill="rgba(56, 189, 248, 0.15)" stroke="#F59E0B" strokeWidth="2" />
              <line x1="55" y1="39" x2="63" y2="47" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {/* 5. CELEBRANDO (Celebrating with hands up) */}
          {action === 'celebrating' && (
            <g>
              {/* Ojos alegres de victoria ^ ^ */}
              <path d="M27 35 Q31 29 35 35" stroke="#4ADE80" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M45 35 Q49 29 53 35" stroke="#4ADE80" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              {/* Gran sonrisa abierta de júbilo */}
              <path d="M35 40 Q40 47 45 40 Z" fill="#4ADE80" stroke="#22C55E" strokeWidth="1" />
              {/* Brazos robóticos levantados hacia arriba celebrando */}
              <path d="M14 26 Q8 16 11 8" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              <circle cx="11" cy="8" r="3" fill="#22C55E" />
              <path d="M66 26 Q72 16 69 8" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              <circle cx="69" cy="8" r="3" fill="#22C55E" />
              {/* Estrellitas de confeti */}
              <polygon points="21,5 22.5,8 25,8.5 23,10.5 23.5,13 21,11.5 18.5,13 19,10.5 17,8.5 19.5,8" fill="#FACC15" />
              <polygon points="59,3 60.5,6 63,6.5 61,8.5 61.5,11 59,9.5 56.5,11 57,8.5 55,6.5 57.5,6" fill="#FACC15" />
            </g>
          )}

          {/* 6. DESCANSANDO (Resting with coffee) */}
          {action === 'resting' && (
            <g>
              {/* Ojos relajados durmiendo plácidamente u u */}
              <path d="M28 32 C28 36, 34 36, 34 32" stroke="#FDBA74" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M46 32 C46 36, 52 36, 52 32" stroke="#FDBA74" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Sonrisa tranquila */}
              <path d="M37 41 Q40 44 43 41" stroke="#FDBA74" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              {/* Taza humeante de café */}
              <g style={{ transform: 'translate(44px, 48px)' }}>
                {/* Cuerpo de la taza */}
                <rect x="0" y="4" width="14" height="12" rx="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
                {/* Asa de la taza */}
                <path d="M14 6 C17 6, 17 12, 14 12" stroke="#EA580C" strokeWidth="1.4" fill="none" />
                {/* Café en el borde */}
                <ellipse cx="7" cy="4" rx="6" ry="1.5" fill="#78350F" />
                {/* Vapor de café caliente */}
                <path d="M4 2 Q6 0 5 -2" stroke="#FDBA74" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.8" />
                <path d="M9 2 Q11 0 10 -2" stroke="#FDBA74" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.8" />
              </g>
              {/* Manita sosteniendo la taza */}
              <circle cx="42" cy="55" r="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
            </g>
          )}

          {/* 7. OBSERVANDO EL PROGRESO (Progress checklist) */}
          {action === 'progress' && (
            <g>
              {/* Ojos motivados brillantes */}
              <circle cx="32" cy="33" r="3.5" fill="#34D399" />
              <circle cx="33" cy="31.5" r="1.3" fill="#FFFFFF" />
              <circle cx="48" cy="33" r="3.5" fill="#34D399" />
              <circle cx="49" cy="31.5" r="1.3" fill="#FFFFFF" />
              {/* Sonrisa orgullosa */}
              <path d="M36 40 Q40 44 44 40" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Tabla portapapeles con checklist */}
              <rect x="25" y="50" width="22" height="22" rx="3" fill="#F8FAFC" stroke="#0284C7" strokeWidth="1.4" />
              <rect x="31" y="48" width="10" height="4" rx="1.5" fill="#64748B" />
              {/* Checks verdes */}
              <path d="M29 55 L31 57 L35 53" stroke="#16A34A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="38" y1="55" x2="43" y2="55" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
              <path d="M29 61 L31 63 L35 59" stroke="#16A34A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="38" y1="61" x2="43" y2="61" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
              {/* Manitas */}
              <circle cx="23" cy="59" r="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
              <circle cx="49" cy="59" r="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
            </g>
          )}

          {/* 8. PROGRAMANDO (Coding laptop) */}
          {action === 'coding' && (
            <g>
              {/* Ojos en modo hacker/coder */}
              <circle cx="32" cy="33" r="3.6" fill="#22D3EE" />
              <circle cx="33" cy="31.5" r="1.4" fill="#FFFFFF" />
              <circle cx="48" cy="33" r="3.6" fill="#22D3EE" />
              <circle cx="49" cy="31.5" r="1.4" fill="#FFFFFF" />
              {/* Sonrisa entusiasta */}
              <path d="M37 41 Q40 45 43 41" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Laptop mini 3D */}
              {/* Pantalla laptop */}
              <rect x="25" y="47" width="30" height="16" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
              <text x="28" y="57" fill="#4ADE80" fontSize="7" fontFamily="monospace" fontWeight="bold">&gt;_run</text>
              {/* Base/teclado de laptop */}
              <polygon points="21,63 59,63 56,69 24,69" fill="#1E293B" stroke="#0284C7" strokeWidth="1" />
              {/* Manitas en teclado */}
              <circle cx="29" cy="64" r="2.5" fill="#38BDF8" />
              <circle cx="51" cy="64" r="2.5" fill="#38BDF8" />
            </g>
          )}
        </svg>
      </div>

      {/* Mini etiqueta táctil amigable de Duolingo */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 2px 0 #CBD5E1',
          borderRadius: '999px',
          padding: '2px 8px',
          fontSize: '0.64rem',
          fontWeight: 900,
          color: '#334155',
          marginTop: '3px',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: actionConfig.tagColor
          }}
        />
        <span>{actionConfig.label}</span>
      </div>
    </div>
  );
};
