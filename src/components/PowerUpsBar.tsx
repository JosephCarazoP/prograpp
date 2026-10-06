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
}

export const PowerUpsBar: React.FC<PowerUpsBarProps> = ({
  powerups,
  onUsePowerUp,
  isSecondChanceActive = false,
  disabled = false,
  compact = false
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
    {
      key: 'secondChance',
      name: 'Escudo',
      icon: <ShieldCheck size={16} color="#FFFFFF" strokeWidth={2.4} />,
      count: safePowerups.secondChance,
      tokenBg: '#15803D',
      tokenBorder: '#4ADE80',
      tokenShadow: '#166534',
      description: 'Protege contra 1 fallo',
      active: isSecondChanceActive
    },
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
        border: '2px solid var(--border-color)',
        boxShadow: '0 4px 0 var(--border-shadow)',
        borderRadius: '18px',
        margin: '6px 0 14px 0',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          fontSize: '0.72rem',
          fontWeight: 900,
          color: '#64748B',
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
                ? '#ECFDF5'
                : hasStock
                ? '#FFFFFF'
                : '#F8FAFC',
              border: '2px solid',
              borderColor: isActive
                ? '#10B981'
                : hasStock
                ? item.tokenBorder
                : '#E2E8F0',
              boxShadow: isActive
                ? '0 3px 0 #059669'
                : hasStock
                ? `0 3px 0 ${item.tokenShadow}`
                : '0 2px 0 #CBD5E1',
              color: hasStock || isActive ? '#1E293B' : '#94A3B8',
              cursor: disabled || (!hasStock && !isActive) ? 'not-allowed' : 'pointer',
              transition: 'all 0.12s ease',
              opacity: disabled ? 0.6 : hasStock || isActive ? 1 : 0.55
            }}
          >
            {/* Token de Icono 3D Mini Duolingo */}
            <div
              style={{
                width: '26px',
                height: '24px',
                borderRadius: '8px',
                background: isActive ? '#10B981' : hasStock ? item.tokenBg : '#CBD5E1',
                boxShadow: `0 2px 0 ${isActive ? '#059669' : hasStock ? item.tokenShadow : '#94A3B8'}`,
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
                fontWeight: 800,
                whiteSpace: 'nowrap',
                display: compact ? 'none' : 'block'
              }}
            >
              {item.name}
            </span>

            {/* Contador de Stock estilo Pill Duolingo */}
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 900,
                background: isActive
                  ? '#10B981'
                  : hasStock
                  ? '#F1F5F9'
                  : '#E2E8F0',
                color: isActive
                  ? '#FFFFFF'
                  : hasStock
                  ? '#1E293B'
                  : '#94A3B8',
                padding: '2px 6px',
                borderRadius: '999px',
                border: '1px solid',
                borderColor: isActive ? '#059669' : hasStock ? '#CBD5E1' : '#E2E8F0',
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
