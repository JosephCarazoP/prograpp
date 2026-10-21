import React from 'react';
import {
  GraduationCap,
  EyeOff,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { UserPowerUps } from '../types/user';
import { soundService } from '../services/soundService';

interface PowerUpsBarProps {
  powerups: UserPowerUps;
  onUsePowerUp: (key: keyof UserPowerUps) => void;
  isSecondChanceActive?: boolean;
  disabled?: boolean;
  compact?: boolean;
  showSecondChance?: boolean;
}

export const PowerUpsBar: React.FC<PowerUpsBarProps> = ({
  powerups,
  onUsePowerUp,
  isSecondChanceActive = false,
  disabled = false,
  compact = false,
  showSecondChance = false
}) => {
  const safePowerups = powerups || {
    teacherHint: 0,
    eliminateOptions: 0,
    secondChance: 0,
    codePeek: 0
  };

  const items: {
    key: keyof UserPowerUps;
    name: string;
    icon: React.ReactNode;
    count: number;
    tokenBg: string;
    tokenBorder: string;
    tokenShadow: string;
    description: string;
    active?: boolean;
  }[] = [
    {
      key: 'teacherHint',
      name: 'Profesor',
      icon: <GraduationCap size={16} color="#FFFFFF" strokeWidth={2.4} />,
      count: safePowerups.teacherHint,
      tokenBg: '#0284C7',
      tokenBorder: '#38BDF8',
      tokenShadow: '#0369A1',
      description: 'Pista pedagógica del profesor'
    },
    {
      key: 'eliminateOptions',
      name: '50 / 50',
      icon: <EyeOff size={16} color="#FFFFFF" strokeWidth={2.4} />,
      count: safePowerups.eliminateOptions,
      tokenBg: '#D97706',
      tokenBorder: '#FCD34D',
      tokenShadow: '#B45309',
      description: 'Descarta 2 opciones erróneas'
    },
    ...(showSecondChance
      ? [
          {
            key: 'secondChance' as const,
            name: 'Escudo',
            icon: <ShieldCheck size={16} color="#FFFFFF" strokeWidth={2.4} />,
            count: safePowerups.secondChance,
            tokenBg: '#15803D',
            tokenBorder: '#4ADE80',
            tokenShadow: '#166534',
            description: 'Protege contra el daño de un ataque de Jefe',
            active: isSecondChanceActive
          }
        ]
      : []),
    {
      key: 'codePeek',
      name: 'Pista Código',
      icon: <Code2 size={16} color="#FFFFFF" strokeWidth={2.4} />,
      count: safePowerups.codePeek,
      tokenBg: '#7E22CE',
      tokenBorder: '#C084FC',
      tokenShadow: '#6B21A8',
      description: 'Resalta la sintaxis clave'
    }
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: compact ? '6px' : '8px',
        padding: compact ? '6px 8px' : '8px 12px',
        background: '#FFFFFF',
        border: '2.5px solid #000000',
        boxShadow: '3.5px 3.5px 0px #000000',
        borderRadius: '16px',
        margin: '6px 0 14px 0',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          fontSize: '0.72rem',
          fontWeight: 900,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          marginRight: '2px',
          display: compact ? 'none' : 'block'
        }}
      >
        Comodines:
      </div>

      {items.map((item) => {
        const hasStock = item.count > 0;
        const isActive = item.active;

        return (
          <button
            key={item.key}
            type="button"
            disabled={disabled || (!hasStock && !isActive)}
            onClick={() => {
              if (hasStock || isActive) {
                soundService.playToken();
                onUsePowerUp(item.key);
              }
            }}
            title={`${item.name} (${item.count} disponibles) - ${item.description}`}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: compact ? '6px 6px' : '8px 10px',
              borderRadius: '12px',
              background: isActive
                ? '#DCFCE7'
                : hasStock
                ? '#FFFFFF'
                : '#F8FAFC',
              border: '2px solid #000000',
              boxShadow: isActive
                ? '2px 2px 0px #000000'
                : hasStock
                ? '2px 2px 0px #000000'
                : 'none',
              color: hasStock || isActive ? '#000000' : '#94A3B8',
              cursor: disabled || (!hasStock && !isActive) ? 'not-allowed' : 'pointer',
              transition: 'all 0.1s ease',
              opacity: disabled ? 0.6 : hasStock || isActive ? 1 : 0.55
            }}
          >
            {/* Token de Icono Mini Neo-Brutal */}
            <div
              style={{
                width: '26px',
                height: '24px',
                borderRadius: '8px',
                background: isActive ? '#15803D' : hasStock ? item.tokenBg : '#CBD5E1',
                border: '1.5px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {item.icon}
            </div>

            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 900,
                whiteSpace: 'nowrap',
                display: compact ? 'none' : 'block'
              }}
            >
              {item.name}
            </span>

            {/* Contador de Stock estilo Pill Neo-Brutal */}
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 900,
                background: isActive
                  ? '#15803D'
                  : hasStock
                  ? '#F1F5F9'
                  : '#E2E8F0',
                color: isActive
                  ? '#FFFFFF'
                  : hasStock
                  ? '#000000'
                  : '#94A3B8',
                padding: '2px 6px',
                borderRadius: '999px',
                border: '1.5px solid #000000',
                flexShrink: 0
              }}
            >
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
