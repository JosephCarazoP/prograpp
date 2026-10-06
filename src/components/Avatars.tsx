import React from 'react';
import { ConsoleDevAvatar } from './ConsoleAvatar';

export { ConsoleDevAvatar };

interface AvatarProps {
  size?: number;
  className?: string;
}

// 1. Byte el Robot: Androide cibernético futurista, visor curvo y auriculares con ecualizador
export const ByteBotAvatar: React.FC<AvatarProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Fondo halo circular con gradiente cian */}
    <circle cx="50" cy="50" r="48" fill="#082F49" stroke="#0284C7" strokeWidth="2.5" />
    
    {/* Antena cibernética con nodo de datos dorado */}
    <rect x="47" y="10" width="6" height="12" rx="3" fill="#38BDF8" />
    <circle cx="50" cy="8" r="5" fill="#FBBF24" />
    <circle cx="50" cy="8" r="2.5" fill="#FFFFFF" />

    {/* Casco redondeado de titanio pulido */}
    <rect x="22" y="20" width="56" height="48" rx="20" fill="url(#byte-helmet-grad)" stroke="#E0F2FE" strokeWidth="2.5" />
    
    {/* Visor panorámico curvo de vidrio negro */}
    <rect x="28" y="30" width="44" height="26" rx="10" fill="#030712" stroke="#0284C7" strokeWidth="1.5" />
    
    {/* Ojos digitales expresivos en neón cian */}
    <circle cx="40" cy="42" r="4.5" fill="#38BDF8" />
    <circle cx="41.5" cy="40.5" r="1.5" fill="#FFFFFF" />
    <circle cx="60" cy="42" r="4.5" fill="#38BDF8" />
    <circle cx="61.5" cy="40.5" r="1.5" fill="#FFFFFF" />
    
    {/* Sonrisa digital LED */}
    <path d="M43 49 Q50 54 57 49" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    
    {/* Auriculares laterales con LEDs de ecualizador */}
    <rect x="15" y="32" width="7" height="22" rx="3.5" fill="#0369A1" stroke="#38BDF8" strokeWidth="1.5" />
    <rect x="17" y="36" width="3" height="3" rx="1" fill="#4ADE80" />
    <rect x="17" y="41" width="3" height="4" rx="1" fill="#FBBF24" />
    <rect x="17" y="47" width="3" height="3" rx="1" fill="#F43F5E" />

    <rect x="78" y="32" width="7" height="22" rx="3.5" fill="#0369A1" stroke="#38BDF8" strokeWidth="1.5" />
    <rect x="80" y="36" width="3" height="3" rx="1" fill="#4ADE80" />
    <rect x="80" y="41" width="3" height="4" rx="1" fill="#FBBF24" />
    <rect x="80" y="47" width="3" height="3" rx="1" fill="#F43F5E" />

    {/* Cuello y armadura de pecho con núcleo de energía */}
    <path d="M36 68 L64 68 L76 96 L24 96 Z" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
    <circle cx="50" cy="80" r="5" fill="#38BDF8" />
    <circle cx="50" cy="80" r="2.5" fill="#FFFFFF" />

    <defs>
      <linearGradient id="byte-helmet-grad" x1="22" y1="20" x2="78" y2="68" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0EA5E9" />
        <stop offset="1" stopColor="#0369A1" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. Ada la Hacker: Especialista en ciberseguridad, sudadera con capucha, gafas HUD terminal
export const AdaHackerAvatar: React.FC<AvatarProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Fondo halo circular magenta/violeta */}
    <circle cx="50" cy="50" r="48" fill="#500724" stroke="#F472B6" strokeWidth="2.5" />

    {/* Capucha / Cabello fondo */}
    <path d="M20 48 C20 18, 80 18, 80 48 C80 75, 78 88, 78 88 L22 88 C22 88, 20 75, 20 48 Z" fill="#831843" />
    
    {/* Rostro estilizado */}
    <rect x="30" y="34" width="40" height="40" rx="16" fill="#FED7AA" />
    
    {/* Flequillo asimétrico cyberpunk */}
    <path d="M24 38 C34 26, 68 28, 76 38 C64 42, 54 36, 42 42 Z" fill="#9D174D" />

    {/* Gafas inteligentes de realidad aumentada HUD */}
    <rect x="31" y="41" width="17" height="13" rx="3.5" fill="#090D16" stroke="#F472B6" strokeWidth="2" />
    <rect x="52" y="41" width="17" height="13" rx="3.5" fill="#090D16" stroke="#F472B6" strokeWidth="2" />
    <line x1="48" y1="47" x2="52" y2="47" stroke="#F472B6" strokeWidth="2" />
    <text x="33.5" y="50.5" fill="#4ADE80" fontSize="7.5" fontFamily="monospace" fontWeight="bold">&gt;_</text>
    <text x="54.5" y="50.5" fill="#38BDF8" fontSize="7.5" fontFamily="monospace" fontWeight="bold">{}</text>

    {/* Sonrisa audaz */}
    <path d="M44 62 Q50 66 56 62" stroke="#9F1239" strokeWidth="2.2" strokeLinecap="round" fill="none" />

    {/* Auriculares con micrófono gamer */}
    <path d="M22 42 C22 22, 78 22, 78 42" stroke="#FB7185" strokeWidth="3" fill="none" />
    <rect x="18" y="40" width="7" height="16" rx="3" fill="#E11D48" />
    <rect x="75" y="40" width="7" height="16" rx="3" fill="#E11D48" />
    <path d="M78 52 Q82 66 70 66" stroke="#FB7185" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="70" cy="66" r="2" fill="#4ADE80" />

    {/* Sudadera tech de hacker */}
    <path d="M24 78 L76 78 L88 98 L12 98 Z" fill="#9D174D" stroke="#F472B6" strokeWidth="1.5" />
    <polygon points="50,78 55,88 45,88" fill="#F43F5E" />
  </svg>
);

// 3. Linus el Coder: Desarrollador de sistemas con gafas de monitor y corbata de código
export const LinusDevAvatar: React.FC<AvatarProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Fondo halo circular verde bosque */}
    <circle cx="50" cy="50" r="48" fill="#064E3B" stroke="#34D399" strokeWidth="2.5" />

    {/* Cuerpo pingüino tech */}
    <ellipse cx="50" cy="56" rx="28" ry="34" fill="#0F172A" stroke="#334155" strokeWidth="2" />
    <ellipse cx="50" cy="63" rx="19" ry="24" fill="#F8FAFC" />

    {/* Gafas de código con reflejo esmeralda */}
    <rect x="31" y="38" width="16" height="13" rx="3.5" fill="#022C22" stroke="#34D399" strokeWidth="2" />
    <rect x="53" y="38" width="16" height="13" rx="3.5" fill="#022C22" stroke="#34D399" strokeWidth="2" />
    <line x1="47" y1="44" x2="53" y2="44" stroke="#34D399" strokeWidth="2" />
    <circle cx="39" cy="44" r="3" fill="#34D399" />
    <circle cx="40" cy="43" r="1" fill="#FFFFFF" />
    <circle cx="61" cy="44" r="3" fill="#34D399" />
    <circle cx="62" cy="43" r="1" fill="#FFFFFF" />

    {/* Pico naranja */}
    <polygon points="45,53 55,53 50,60" fill="#F59E0B" />

    {/* Corbata de circuitos binarios */}
    <path d="M46 66 L54 66 L57 82 L50 87 L43 82 Z" fill="#059669" stroke="#10B981" strokeWidth="1" />
    <circle cx="50" cy="72" r="1.5" fill="#6EE7B7" />
    <circle cx="50" cy="78" r="1.5" fill="#6EE7B7" />
  </svg>
);

// 4. Turing el Sabio: Arquitecto cuántico con halo de datos y runas matemáticas
export const TuringSageAvatar: React.FC<AvatarProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Fondo halo circular violeta místico */}
    <circle cx="50" cy="50" r="48" fill="#3B0764" stroke="#C084FC" strokeWidth="2.5" />

    {/* Halo cuántico de datos en rotación */}
    <circle cx="50" cy="50" r="41" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="5 3" />
    <circle cx="50" cy="11" r="2.5" fill="#FDE047" />
    <circle cx="89" cy="50" r="2" fill="#38BDF8" />
    <circle cx="11" cy="50" r="2" fill="#34D399" />

    {/* Cabello sabio plateado */}
    <ellipse cx="50" cy="45" rx="25" ry="26" fill="#E2E8F0" />
    {/* Rostro */}
    <ellipse cx="50" cy="44" rx="18" ry="18" fill="#FDE68A" />
    {/* Barba geométrica de código */}
    <path d="M36 52 C36 69, 64 69, 64 52 Z" fill="#E2E8F0" />

    {/* Gafas circulares de sabio con reflejo arcano */}
    <circle cx="41" cy="43" r="6" fill="#1E1B4B" stroke="#C084FC" strokeWidth="1.8" />
    <circle cx="59" cy="43" r="6" fill="#1E1B4B" stroke="#C084FC" strokeWidth="1.8" />
    <line x1="47" y1="43" x2="53" y2="43" stroke="#C084FC" strokeWidth="1.8" />
    <circle cx="41" cy="43" r="2.5" fill="#38BDF8" />
    <circle cx="59" cy="43" r="2.5" fill="#38BDF8" />

    {/* Túnica cuántica con broche de oro */}
    <path d="M28 75 L72 75 L84 98 L16 98 Z" fill="#581C87" stroke="#A855F7" strokeWidth="1.5" />
    <polygon points="50,77 55,85 45,85" fill="#F59E0B" />
  </svg>
);

// Selector Centralizado de Avatar por Identificador Único
export const DevAvatar: React.FC<{ avatarId: string; size?: number; className?: string }> = ({
  avatarId,
  size = 48,
  className = ''
}) => {
  switch (avatarId) {
    case 'console_dev':
      return <ConsoleDevAvatar size={size} className={className} />;
    case 'robot_byte':
      return <ByteBotAvatar size={size} className={className} />;
    case 'ada_hacker':
      return <AdaHackerAvatar size={size} className={className} />;
    case 'linus_coder':
      return <LinusDevAvatar size={size} className={className} />;
    case 'turing_wizard':
      return <TuringSageAvatar size={size} className={className} />;
    default:
      return <ByteBotAvatar size={size} className={className} />;
  }
};
