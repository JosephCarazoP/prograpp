import React from 'react';

export type BiomeThemeType = 'valley' | 'river' | 'cloud' | 'quarry' | 'cavern' | 'vault';

interface RoadConnectorProps {
  fromOffset: number;
  toOffset: number;
  theme: BiomeThemeType;
}

interface NodeSteppingPlatformProps {
  theme: BiomeThemeType;
  isCurrent?: boolean;
  isCompleted?: boolean;
}

interface BiomeSidePropProps {
  theme: BiomeThemeType;
  side: 'left' | 'right';
  propIndex: number;
}

// Configuración de colores para el camino y plataformas 3D
export const BIOME_ROAD_THEMES: Record<
  BiomeThemeType,
  {
    pathShadow: string;
    pathSurface: string;
    pathHighlight: string;
    pathDashes: string;
    pedestalShadow: string;
    pedestalSide: string;
    pedestalTop: string;
    pedestalHighlight: string;
  }
> = {
  valley: {
    pathShadow: '#A7F3D0',
    pathSurface: '#E2E8F0',
    pathHighlight: '#F8FAFC',
    pathDashes: '#94A3B8',
    pedestalShadow: 'rgba(22, 101, 52, 0.16)',
    pedestalSide: '#CBD5E1',
    pedestalTop: '#F1F5F9',
    pedestalHighlight: '#FFFFFF'
  },
  quarry: {
    pathShadow: '#BBF7D0',
    pathSurface: '#E2E8F0',
    pathHighlight: '#F8FAFC',
    pathDashes: '#94A3B8',
    pedestalShadow: 'rgba(21, 128, 61, 0.18)',
    pedestalSide: '#CBD5E1',
    pedestalTop: '#F8FAFC',
    pedestalHighlight: '#FFFFFF'
  },
  river: {
    pathShadow: '#93C5FD',
    pathSurface: '#BAE6FD',
    pathHighlight: '#E0F2FE',
    pathDashes: '#0284C7',
    pedestalShadow: 'rgba(29, 78, 216, 0.20)',
    pedestalSide: '#7DD3FC',
    pedestalTop: '#E0F2FE',
    pedestalHighlight: '#FFFFFF'
  },
  cavern: {
    pathShadow: '#93C5FD',
    pathSurface: '#BAE6FD',
    pathHighlight: '#E0F2FE',
    pathDashes: '#0284C7',
    pedestalShadow: 'rgba(29, 78, 216, 0.22)',
    pedestalSide: '#60A5FA',
    pedestalTop: '#DBEAFE',
    pedestalHighlight: '#EFF6FF'
  },
  cloud: {
    pathShadow: '#D8B4FE',
    pathSurface: '#FEF08A',
    pathHighlight: '#FFFBEB',
    pathDashes: '#D97706',
    pedestalShadow: 'rgba(126, 34, 206, 0.20)',
    pedestalSide: '#FDE047',
    pedestalTop: '#FEF9C3',
    pedestalHighlight: '#FFFFFF'
  },
  vault: {
    pathShadow: '#D8B4FE',
    pathSurface: '#FEF08A',
    pathHighlight: '#FFFBEB',
    pathDashes: '#D97706',
    pedestalShadow: 'rgba(126, 34, 206, 0.22)',
    pedestalSide: '#FDE047',
    pedestalTop: '#FEF9C3',
    pedestalHighlight: '#FFFFFF'
  }
};

/**
 * Conector de carretera 3D entre dos nodos consecutivos del camino serpenteante.
 * Curva cúbica bezier suave con relieve, sombra en el suelo y líneas divisorias.
 */
export const RoadConnector: React.FC<RoadConnectorProps> = ({ fromOffset, toOffset, theme }) => {
  const colors = BIOME_ROAD_THEMES[theme] || BIOME_ROAD_THEMES.valley;
  const svgWidth = 220;
  const svgHeight = 42;
  const centerX = svgWidth / 2;

  const startX = centerX + fromOffset;
  const endX = centerX + toOffset;
  const startY = 0;
  const endY = svgHeight;

  // Curva Bezier S suave
  const controlY1 = svgHeight * 0.45;
  const controlY2 = svgHeight * 0.55;
  const pathD = `M ${startX} ${startY} C ${startX} ${controlY1}, ${endX} ${controlY2}, ${endX} ${endY}`;

  return (
    <div
      style={{
        width: '100%',
        height: `${svgHeight}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '-6px 0',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'visible'
      }}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Capa 1: Sombra profunda del camino sobre el terreno */}
        <path
          d={pathD}
          stroke={colors.pathShadow}
          strokeWidth="28"
          strokeLinecap="round"
          strokeOpacity="0.85"
          fill="none"
        />

        {/* Capa 2: Superficie de piedra / camino transitable */}
        <path
          d={pathD}
          stroke={colors.pathSurface}
          strokeWidth="22"
          strokeLinecap="round"
          fill="none"
        />

        {/* Capa 3: Borde de brillo superior del pavimento */}
        <path
          d={pathD}
          stroke={colors.pathHighlight}
          strokeWidth="16"
          strokeLinecap="round"
          strokeOpacity="0.65"
          fill="none"
        />

        {/* Capa 4: Marcas centrales del camino (adoquines o guijarros) */}
        <path
          d={pathD}
          stroke={colors.pathDashes}
          strokeWidth="3.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

/**
 * Pedestal 3D / Plataforma de adoquín bajo el botón del nodo.
 * Ancla físicamente el botón al suelo del bioma (estilo Duolingo 3D).
 */
export const NodeSteppingPlatform: React.FC<NodeSteppingPlatformProps> = ({
  theme,
  isCurrent = false,
  isCompleted = false
}) => {
  const colors = BIOME_ROAD_THEMES[theme] || BIOME_ROAD_THEMES.valley;

  return (
    <div
      style={{
        position: 'absolute',
        top: '26px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '96px',
        height: '38px',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <svg width="96" height="38" viewBox="0 0 96 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`pedestal-glow-${theme}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isCurrent ? '#F59E0B' : '#FFFFFF'} stopOpacity={isCurrent ? 0.45 : 0.25} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sombra proyectada en el césped / agua / nube */}
        <ellipse cx="48" cy="27" rx="44" ry="10" fill={colors.pedestalShadow} />

        {/* Bisel inferior 3D del pedestal cilíndrico */}
        <path
          d="M 6 18 C 6 18, 6 23, 6 24 C 6 29 25 33 48 33 C 71 33 90 29 90 24 C 90 23 90 18 90 18 Z"
          fill={colors.pedestalSide}
        />

        {/* Superficie superior elíptica */}
        <ellipse cx="48" cy="18" rx="42" ry="11" fill={isCompleted ? colors.pedestalHighlight : colors.pedestalTop} />

        {/* Borde biselado interior con brillo */}
        <ellipse cx="48" cy="16.5" rx="38" ry="9" fill={colors.pedestalHighlight} fillOpacity={isCompleted ? 0.9 : 0.7} />

        {/* Halo de resplandor para el nivel actual activo */}
        {isCurrent && (
          <ellipse cx="48" cy="18" rx="44" ry="12" fill={`url(#pedestal-glow-${theme})`} />
        )}

        {/* Detalle temático en la base */}
        {theme === 'valley' || theme === 'quarry' ? (
          // Brote de hierba en el borde
          <g transform="translate(10, 16)">
            <path d="M 0 4 Q -2 -2 2 -4 Q 2 2 0 4" fill="#22C55E" />
            <path d="M 2 4 Q 4 -1 7 -2 Q 5 2 2 4" fill="#16A34A" />
          </g>
        ) : theme === 'river' || theme === 'cavern' ? (
          // Onda concéntrica de agua
          <ellipse cx="48" cy="28" rx="47" ry="9" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.5" fill="none" />
        ) : (
          // Pequeña chispa dorada
          <circle cx="82" cy="14" r="2" fill="#FBBF24" />
        )}
      </svg>
    </div>
  );
};

/**
 * Ilustración Vectorial 3D para el Encabezado de la Sección (0% IA).
 * Muestra el bioma en miniatura con arte estilizado, limpio e isométrico.
 */
export const BiomeHeaderIllustration: React.FC<{ theme: BiomeThemeType; unitId?: number }> = ({
  theme
}) => {
  if (theme === 'river' || theme === 'cavern') {
    return (
      <svg width="110" height="74" viewBox="0 0 110 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="river-water" x1="0" y1="0" x2="110" y2="74" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id="crystal-blue" x1="0" y1="0" x2="20" y2="30">
            <stop stopColor="#E0F2FE" />
            <stop offset="40%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Cañón de fondo */}
        <path d="M 0 35 Q 25 22 55 28 Q 85 34 110 24 L 110 74 L 0 74 Z" fill="#1E3A8A" fillOpacity="0.25" />
        
        {/* Río de datos con corriente en curva */}
        <path d="M 0 46 C 30 40 45 60 110 44 L 110 74 L 0 74 Z" fill="url(#river-water)" />
        {/* Ondas de agua luminosa */}
        <path d="M 8 52 Q 24 48 42 54" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
        <path d="M 60 56 Q 78 52 98 55" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.6" />

        {/* Piedras de río 3D */}
        <ellipse cx="28" cy="62" rx="10" ry="4" fill="#64748B" />
        <ellipse cx="28" cy="60" rx="9" ry="3.5" fill="#94A3B8" />

        {/* Gran cristal 3D de consulta SQL / Datos */}
        <g transform="translate(68, 14)">
          {/* Sombra del cristal */}
          <ellipse cx="12" cy="46" rx="14" ry="4" fill="#0F172A" fillOpacity="0.3" />
          {/* Facetas del cristal */}
          <polygon points="12,0 22,24 12,44 2,24" fill="url(#crystal-blue)" stroke="#7DD3FC" strokeWidth="1.2" />
          <polygon points="12,0 12,44 2,24" fill="#0284C7" fillOpacity="0.45" />
          <polygon points="12,0 7,20 12,38" fill="#FFFFFF" fillOpacity="0.65" />
          {/* Destello de luz */}
          <circle cx="8" cy="14" r="2" fill="#FFFFFF" />
        </g>
      </svg>
    );
  }

  if (theme === 'cloud' || theme === 'vault') {
    return (
      <svg width="110" height="74" viewBox="0 0 110 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cloud-grad" x1="0" y1="0" x2="0" y2="40">
            <stop stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E9D5FF" />
          </linearGradient>
          <linearGradient id="gold-star" x1="0" y1="0" x2="16" y2="16">
            <stop stopColor="#FDE047" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Nubes esponjosas de fondo */}
        <circle cx="24" cy="44" r="18" fill="#DDD6FE" fillOpacity="0.5" />
        <circle cx="50" cy="38" r="22" fill="#DDD6FE" fillOpacity="0.5" />
        <circle cx="82" cy="46" r="16" fill="#DDD6FE" fillOpacity="0.5" />

        {/* Nube 3D principal en primer plano */}
        <path
          d="M 16 58 C 12 50 18 38 28 38 C 30 30 40 24 52 24 C 64 24 74 32 76 40 C 86 40 94 48 90 58 C 90 62 82 66 70 66 L 24 66 C 16 66 12 62 16 58 Z"
          fill="url(#cloud-grad)"
          stroke="#C084FC"
          strokeWidth="1.5"
        />

        {/* Sombra inferior de la nube */}
        <path d="M 22 64 Q 52 68 84 64" stroke="#A855F7" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />

        {/* Isla flotante con gema amatista */}
        <g transform="translate(62, 10)">
          {/* Estrella dorada 3D */}
          <polygon points="8,0 10,6 16,8 10,10 8,16 6,10 0,8 6,6" fill="url(#gold-star)" />
          <circle cx="8" cy="8" r="1.5" fill="#FFFFFF" />
        </g>
        <g transform="translate(18, 16)">
          <polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" fill="url(#gold-star)" />
        </g>
      </svg>
    );
  }

  // Por defecto: Valle verde / Cantera
  return (
    <svg width="110" height="74" viewBox="0 0 110 74" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hill-back" x1="0" y1="0" x2="0" y2="74">
          <stop stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="hill-front" x1="0" y1="0" x2="0" y2="74">
          <stop stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <radialGradient id="tree-canopy" cx="35%" cy="30%" r="65%">
          <stop stopColor="#86EFAC" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#166534" />
        </radialGradient>
      </defs>

      {/* Colina trasera */}
      <path d="M 0 38 Q 35 18 70 32 Q 95 40 110 26 L 110 74 L 0 74 Z" fill="url(#hill-back)" fillOpacity="0.4" />

      {/* Colina delantera */}
      <path d="M 0 48 Q 40 32 80 44 Q 98 48 110 42 L 110 74 L 0 74 Z" fill="url(#hill-front)" />

      {/* Árbol 3D estilo Duolingo */}
      <g transform="translate(68, 18)">
        {/* Sombra del árbol */}
        <ellipse cx="14" cy="46" rx="12" ry="4" fill="#14532D" fillOpacity="0.3" />
        {/* Tronco */}
        <rect x="11" y="26" width="6" height="18" rx="2" fill="#78350F" />
        {/* Copa redondeada con brillo */}
        <circle cx="14" cy="18" r="16" fill="url(#tree-canopy)" stroke="#166534" strokeWidth="1.5" />
        {/* Reflejo especular curvo */}
        <path d="M 7 12 C 10 8 18 8 21 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
      </g>

      {/* Monolito de terminal de código miniatura */}
      <g transform="translate(18, 38)">
        <rect x="0" y="0" width="18" height="22" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="1.2" />
        <rect x="2" y="2" width="14" height="18" rx="2.5" fill="#022C22" />
        {/* Prompt verde parpadeante */}
        <text x="4" y="11" fill="#4ADE80" fontSize="7" fontWeight="bold" fontFamily="monospace">
          &gt;_
        </text>
        <rect x="4" y="14" width="6" height="1.5" fill="#22C55E" />
      </g>
    </svg>
  );
};

/**
 * Escenografía lateral 3D (Props de bioma) colocados al costado del camino.
 * Totalmente vectoriales (0% IA), estilo Duolingo 3D, enriquecen el bioma.
 */
export const BiomeSideProp: React.FC<BiomeSidePropProps> = ({ theme, side, propIndex }) => {
  const isLeft = side === 'left';
  const posStyle: React.CSSProperties = {
    position: 'absolute',
    top: '12px',
    [isLeft ? 'right' : 'left']: 'calc(50% + 55px)',
    pointerEvents: 'none',
    zIndex: 1,
    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.06))'
  };

  // Selector de variedad de prop
  const variant = propIndex % 3;

  if (theme === 'river' || theme === 'cavern') {
    if (variant === 0) {
      // 1. Cristal de cuarzo / zafiro relacional 3D
      return (
        <div style={posStyle}>
          <svg width="38" height="46" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="19" cy="42" rx="12" ry="3.5" fill="#1E3A8A" fillOpacity="0.2" />
            <polygon points="19,2 32,22 19,40 6,22" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
            <polygon points="19,2 19,40 6,22" fill="#0284C7" fillOpacity="0.35" />
            <polygon points="19,2 13,18 19,34" fill="#FFFFFF" fillOpacity="0.6" />
            <circle cx="15" cy="14" r="1.5" fill="#FFFFFF" />
          </svg>
        </div>
      );
    }
    if (variant === 1) {
      // 2. Ondas de agua con nenúfar
      return (
        <div style={posStyle}>
          <svg width="42" height="34" viewBox="0 0 42 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="21" cy="22" rx="18" ry="6" stroke="#93C5FD" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
            <ellipse cx="21" cy="18" rx="12" ry="7" fill="#10B981" stroke="#059669" strokeWidth="1.2" />
            <circle cx="21" cy="16" r="3" fill="#F472B6" />
          </svg>
        </div>
      );
    }
    // 3. Mini cascada de datos / pilares
    return (
      <div style={posStyle}>
        <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="10" width="18" height="26" rx="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="12" y1="16" x2="22" y2="16" stroke="#E0F2FE" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="12" y1="22" x2="19" y2="22" stroke="#E0F2FE" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="12" y1="28" x2="22" y2="28" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (theme === 'cloud' || theme === 'vault') {
    if (variant === 0) {
      // 1. Nube esponjosa 3D flotante
      return (
        <div style={posStyle}>
          <svg width="46" height="34" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="23" cy="28" rx="16" ry="4" fill="#7E22CE" fillOpacity="0.12" />
            <path
              d="M 8 24 C 6 18 10 12 16 12 C 18 6 26 4 32 8 C 38 6 44 12 40 20 C 42 22 40 26 34 26 L 12 26 C 8 26 6 24 8 24 Z"
              fill="#FFFFFF"
              stroke="#D8B4FE"
              strokeWidth="1.5"
            />
            <circle cx="20" cy="14" r="1.5" fill="#E9D5FF" />
          </svg>
        </div>
      );
    }
    if (variant === 1) {
      // 2. Gema amatista flotante
      return (
        <div style={posStyle}>
          <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="18" cy="40" rx="10" ry="3" fill="#581C87" fillOpacity="0.25" />
            <polygon points="18,4 30,20 18,36 6,20" fill="#A855F7" stroke="#C084FC" strokeWidth="1.5" />
            <polygon points="18,4 18,36 6,20" fill="#7E22CE" />
            <polygon points="18,4 12,18 18,30" fill="#F3E8FF" fillOpacity="0.65" />
          </svg>
        </div>
      );
    }
    // 3. Estrella dorada con resplandor
    return (
      <div style={posStyle}>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="17" cy="30" rx="9" ry="3" fill="#D97706" fillOpacity="0.2" />
          <polygon points="17,2 20,12 30,17 20,22 17,32 14,22 4,17 14,12" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="17" cy="17" r="3" fill="#FFFBEB" />
        </svg>
      </div>
    );
  }

  // Por defecto: Valle verde / Cantera
  if (variant === 0) {
    // 1. Árbol redondeado 3D estilo Duolingo
    return (
      <div style={posStyle}>
        <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="45" rx="13" ry="3" fill="#15803D" fillOpacity="0.25" />
          <rect x="17" y="26" width="6" height="18" rx="2" fill="#92400E" />
          <circle cx="20" cy="18" r="16" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
          <ellipse cx="18" cy="12" rx="9" ry="5" fill="#4ADE80" fillOpacity="0.8" />
        </svg>
      </div>
    );
  }
  if (variant === 1) {
    // 2. Piedra tallada con sintaxis de código
    return (
      <div style={posStyle}>
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="19" cy="34" rx="14" ry="3.5" fill="#0F172A" fillOpacity="0.18" />
          <rect x="6" y="8" width="26" height="24" rx="6" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.8" />
          <rect x="8" y="10" width="22" height="19" rx="4" fill="#F1F5F9" />
          {/* Símbolo de código grabado */}
          <text x="12" y="23" fill="#16A34A" fontSize="10" fontWeight="900" fontFamily="monospace">
            {'{;}'}
          </text>
        </svg>
      </div>
    );
  }
  // 3. Ramillete de margaritas / tréboles
  return (
    <div style={posStyle}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="18" cy="32" rx="10" ry="3" fill="#15803D" fillOpacity="0.2" />
        <path d="M 18 30 Q 16 22 14 16" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="14" r="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="18" cy="11" r="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="14" cy="19" r="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="14" cy="15" r="2.5" fill="#FBBF24" />
      </svg>
    </div>
  );
};
