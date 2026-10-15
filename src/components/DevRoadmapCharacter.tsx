import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Lightbulb, GraduationCap, Search, ListChecks, Laptop, Coffee, Trophy, Flag } from 'lucide-react';
import { soundService } from '../services/soundService';
import { DevAvatar } from './Avatars';

export type DevRoadmapAction =
  | 'reading'
  | 'thinking'
  | 'studying'
  | 'looking'
  | 'celebrating'
  | 'resting'
  | 'progress'
  | 'coding'
  | 'activeGuide';

interface DevRoadmapCharacterProps {
  action: DevRoadmapAction;
  side?: 'left' | 'right';
  className?: string;
  /** Si es true, es el avatar del propio estudiante parado en su nivel actual */
  isCurrentLevelGuide?: boolean;
  /** Avatar elegido por el estudiante (se usa en el nivel actual) */
  userAvatarId?: string;
}

interface BuddyConfig {
  avatarId: string;
  name: string;
  icon: React.ReactNode;
  accent: string;
  accentDark: string;
  tips: string[];
}

// Cada compañero del camino es uno de los avatares del juego con un accesorio temático
const BUDDIES: Record<Exclude<DevRoadmapAction, 'activeGuide'>, BuddyConfig> = {
  reading: {
    avatarId: 'ada_hacker',
    name: 'Ada',
    icon: <BookOpen size={14} strokeWidth={2.8} />,
    accent: '#1CB0F6',
    accentDark: '#1899D6',
    tips: ['Leer la teoría antes ayuda muchísimo.', 'La documentación es tu mejor amiga.']
  },
  thinking: {
    avatarId: 'turing_wizard',
    name: 'Turing',
    icon: <Lightbulb size={14} strokeWidth={2.8} />,
    accent: '#FFC800',
    accentDark: '#E5A500',
    tips: ['Divide el problema en pasos pequeños.', 'Piensa primero, escribe después.']
  },
  studying: {
    avatarId: 'linus_coder',
    name: 'Linus',
    icon: <GraduationCap size={14} strokeWidth={2.8} />,
    accent: '#CE82FF',
    accentDark: '#A568CC',
    tips: ['Repasar fija los conceptos.', 'Cada error es una lección.']
  },
  looking: {
    avatarId: 'console_dev',
    name: 'Console',
    icon: <Search size={14} strokeWidth={2.8} />,
    accent: '#58CC02',
    accentDark: '#46A302',
    tips: ['Revisa cada línea con calma.', 'Los bugs se esconden en los detalles.']
  },
  progress: {
    avatarId: 'robot_byte',
    name: 'Byte',
    icon: <ListChecks size={14} strokeWidth={2.8} />,
    accent: '#1CB0F6',
    accentDark: '#1899D6',
    tips: ['¡Mira todo lo que ya avanzaste!', 'Un nivel a la vez.']
  },
  coding: {
    avatarId: 'ada_hacker',
    name: 'Ada',
    icon: <Laptop size={14} strokeWidth={2.8} />,
    accent: '#FF9600',
    accentDark: '#E08600',
    tips: ['¡Practicar es la mejor forma de aprender!', 'Compila, prueba, mejora.']
  },
  resting: {
    avatarId: 'linus_coder',
    name: 'Linus',
    icon: <Coffee size={14} strokeWidth={2.8} />,
    accent: '#FF9600',
    accentDark: '#E08600',
    tips: ['Un descanso corto y seguimos.', '¡Vas muy bien!']
  },
  celebrating: {
    avatarId: 'robot_byte',
    name: 'Byte',
    icon: <Trophy size={14} strokeWidth={2.8} />,
    accent: '#FFC800',
    accentDark: '#E5A500',
    tips: ['¡Lo lograste!', '¡Increíble trabajo!']
  }
};

const GUIDE_PHRASES = ['¡Empieza aquí!', '¡Tú puedes!', '¡Vamos por 3 estrellas!', '¡Un nivel más!'];

export const DevRoadmapCharacter: React.FC<DevRoadmapCharacterProps> = ({
  action,
  side = 'right',
  className = '',
  isCurrentLevelGuide = false,
  userAvatarId = 'robot_byte'
}) => {
  const isGuide = isCurrentLevelGuide || action === 'activeGuide';
  const buddy = action !== 'activeGuide' ? BUDDIES[action] : BUDDIES.celebrating;

  const [jumping, setJumping] = useState(false);
  const [bubble, setBubble] = useState<string | null>(isGuide ? GUIDE_PHRASES[0] : null);
  const tapCount = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const accent = isGuide ? '#58CC02' : buddy.accent;
  const accentDark = isGuide ? '#46A302' : buddy.accentDark;
  const avatarId = isGuide ? userAvatarId : buddy.avatarId;
  // Proporciones armoniosas Duolingo 3D: avatares compactos y no invasivos
  const tokenSize = isGuide ? 52 : 44;
  const avatarSize = isGuide ? 42 : 34;

  const handleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playToken();
    tapCount.current += 1;

    setJumping(false);
    // Reinicia la animación de salto aunque se toque repetidamente
    requestAnimationFrame(() => setJumping(true));

    if (isGuide) {
      setBubble(GUIDE_PHRASES[tapCount.current % GUIDE_PHRASES.length]);
    } else {
      setBubble(buddy.tips[tapCount.current % buddy.tips.length]);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setBubble(null), 2600);
    }
  };

  return (
    <div
      className={`roadmap-buddy ${isGuide ? 'roadmap-buddy--guide' : ''} ${className}`}
      style={{
        position: 'absolute',
        top: isGuide ? '-4px' : '4px',
        [side === 'left' ? 'right' : 'left']: 'calc(50% + 44px)',
        zIndex: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Bocadillo de diálogo */}
      {bubble && (
        <div
          key={bubble}
          className="roadmap-buddy__bubble"
          style={{ color: accentDark, borderColor: isGuide ? '#B8F28B' : '#E5E5E5' }}
        >
          {bubble}
        </div>
      )}

      <button
        type="button"
        onClick={handleTap}
        onAnimationEnd={() => setJumping(false)}
        className={`roadmap-buddy__token ${jumping ? 'is-jumping' : ''}`}
        aria-label={isGuide ? 'Tu avatar: estás en este nivel' : `${buddy.name}, compañero del camino`}
        title={isGuide ? 'Estás aquí' : buddy.name}
        style={{
          width: tokenSize,
          height: tokenSize,
          borderColor: accent,
          boxShadow: `0 4px 0 ${accentDark}`
        }}
      >
        <span className="roadmap-buddy__avatar">
          <DevAvatar avatarId={avatarId} size={avatarSize} />
        </span>

        {/* Insignia: "TÚ" para el estudiante, accesorio temático para compañeros */}
        {isGuide ? (
          <span className="roadmap-buddy__you" style={{ background: accent, boxShadow: `0 2px 0 ${accentDark}` }}>
            <Flag size={9} strokeWidth={3} /> TÚ
          </span>
        ) : (
          <span className="roadmap-buddy__badge" style={{ background: accent, boxShadow: `0 2px 0 ${accentDark}` }}>
            {React.isValidElement(buddy.icon)
              ? React.cloneElement(buddy.icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, {
                  size: 11,
                  strokeWidth: 2.8
                })
              : buddy.icon}
          </span>
        )}
      </button>

      {/* Sombra en el piso (se encoge cuando el avatar flota) */}
      <span className="roadmap-buddy__shadow" style={{ width: tokenSize * 0.72 }} />
    </div>
  );
};
