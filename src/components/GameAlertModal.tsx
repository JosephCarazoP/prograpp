import React from 'react';
import { Zap, Lock, CheckCircle2, AlertTriangle, X, ShieldCheck } from 'lucide-react';
import { soundService } from '../services/soundService';

export type GameAlertType = 'energy' | 'warning' | 'lock' | 'success' | 'info' | 'shield';

export interface GameAlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type?: GameAlertType;
  primaryButtonText?: string;
  onPrimaryClick?: () => void;
  secondaryButtonText?: string;
  onSecondaryClick?: () => void;
}

interface GameAlertModalProps {
  alert: GameAlertState | null;
  onClose: () => void;
}

export const GameAlertModal: React.FC<GameAlertModalProps> = ({ alert, onClose }) => {
  if (!alert || !alert.isOpen) return null;

  const type = alert.type || 'info';

  const handleClose = () => {
    soundService.playToken();
    onClose();
  };

  const handlePrimary = () => {
    soundService.playToken();
    if (alert.onPrimaryClick) {
      alert.onPrimaryClick();
    } else {
      onClose();
    }
  };

  const handleSecondary = () => {
    soundService.playToken();
    if (alert.onSecondaryClick) {
      alert.onSecondaryClick();
    } else {
      onClose();
    }
  };

  // Configuración de estilo 3D Duolingo según el tipo de alerta
  const alertTheme = {
    energy: {
      cardBorder: '#F59E0B',
      cardShadow: '#D97706',
      tokenBg: '#D97706',
      tokenBorder: '#FCD34D',
      tokenShadow: '#B45309',
      icon: <Zap size={28} color="#FFFFFF" strokeWidth={2.4} fill="#FFFFFF" />,
      btnClass: 'btn-orange'
    },
    warning: {
      cardBorder: '#F59E0B',
      cardShadow: '#D97706',
      tokenBg: '#D97706',
      tokenBorder: '#FCD34D',
      tokenShadow: '#B45309',
      icon: <AlertTriangle size={28} color="#FFFFFF" strokeWidth={2.4} />,
      btnClass: 'btn-orange'
    },
    lock: {
      cardBorder: '#0284C7',
      cardShadow: '#0369A1',
      tokenBg: '#0284C7',
      tokenBorder: '#38BDF8',
      tokenShadow: '#0369A1',
      icon: <Lock size={28} color="#FFFFFF" strokeWidth={2.4} />,
      btnClass: 'btn-blue'
    },
    success: {
      cardBorder: '#22C55E',
      cardShadow: '#15803D',
      tokenBg: '#15803D',
      tokenBorder: '#4ADE80',
      tokenShadow: '#166534',
      icon: <CheckCircle2 size={28} color="#FFFFFF" strokeWidth={2.4} />,
      btnClass: 'btn-green'
    },
    shield: {
      cardBorder: '#22C55E',
      cardShadow: '#15803D',
      tokenBg: '#15803D',
      tokenBorder: '#4ADE80',
      tokenShadow: '#166534',
      icon: <ShieldCheck size={28} color="#FFFFFF" strokeWidth={2.4} />,
      btnClass: 'btn-green'
    },
    info: {
      cardBorder: '#0284C7',
      cardShadow: '#0369A1',
      tokenBg: '#0284C7',
      tokenBorder: '#38BDF8',
      tokenShadow: '#0369A1',
      icon: <Zap size={28} color="#FFFFFF" strokeWidth={2.4} />,
      btnClass: 'btn-blue'
    }
  }[type];

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={handleClose}
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '380px',
          width: '100%',
          textAlign: 'center',
          background: '#FFFFFF',
          border: `3px solid ${alertTheme.cardBorder}`,
          boxShadow: `0 8px 0 ${alertTheme.cardShadow}, 0 16px 36px rgba(0, 0, 0, 0.16)`,
          borderRadius: '24px',
          padding: '24px 20px',
          boxSizing: 'border-box',
          position: 'relative',
          animation: 'scale-up 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Botón cerrar sutil */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: '#F1F5F9',
            border: '1.5px solid #CBD5E1',
            borderRadius: '999px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            cursor: 'pointer'
          }}
          title="Cerrar ventana"
        >
          <X size={18} />
        </button>

        {/* Token de Icono 3D (Estilo Duolingo idéntico a comodines) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px', marginTop: '4px' }}>
          <div
            style={{
              width: '60px',
              height: '56px',
              borderRadius: '16px',
              background: alertTheme.tokenBg,
              border: `2px solid ${alertTheme.tokenBorder}`,
              boxShadow: `0 4px 0 ${alertTheme.tokenShadow}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {alertTheme.icon}
          </div>
        </div>

        {/* Título de Alto Contraste */}
        <h3
          style={{
            fontSize: '1.3rem',
            fontWeight: 900,
            color: '#1E293B',
            marginBottom: '8px',
            lineHeight: 1.3
          }}
        >
          {alert.title}
        </h3>

        {/* Mensaje descriptivo con excelente legibilidad */}
        <p
          style={{
            fontSize: '0.94rem',
            color: '#475569',
            lineHeight: 1.5,
            marginBottom: '22px'
          }}
        >
          {alert.message}
        </p>

        {/* Botones de Acción Táctiles 3D */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            className={`btn-3d ${alertTheme.btnClass}`}
            onClick={handlePrimary}
            style={{ width: '100%', padding: '13px 18px', fontSize: '0.96rem' }}
          >
            {alert.primaryButtonText || 'Entendido'}
          </button>

          {alert.secondaryButtonText && (
            <button
              className="btn-3d btn-outline"
              onClick={handleSecondary}
              style={{ width: '100%', padding: '12px 18px', fontSize: '0.94rem' }}
            >
              {alert.secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
