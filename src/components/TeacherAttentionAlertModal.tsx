import React, { useEffect } from 'react';
import { Eye, AlertTriangle, Gamepad2, Check, ShieldAlert } from 'lucide-react';
import { AppNotification } from '../types/notification';

interface TeacherAttentionAlertModalProps {
  alert: AppNotification | null;
  onAcknowledge: (alertId: string) => void;
  onGoPlay: (alertId: string) => void;
}

export const TeacherAttentionAlertModal: React.FC<TeacherAttentionAlertModalProps> = ({
  alert,
  onAcknowledge,
  onGoPlay
}) => {
  useEffect(() => {
    if (!alert) return;

    // Tecla Escape o Enter para interacción rápida
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onGoPlay(alert.id);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onAcknowledge(alert.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [alert, onAcknowledge, onGoPlay]);

  if (!alert) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '3.5px solid #000000',
          boxShadow: '6px 6px 0px #000000',
          borderRadius: '24px',
          maxWidth: '520px',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'bounce-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Franja superior de advertencia estilo cinta de precaución */}
        <div
          style={{
            background: '#EF4444',
            color: '#FFFFFF',
            padding: '10px 16px',
            borderBottom: '2.5px solid #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '0.82rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            <span style={{ display: 'inline-flex', animation: 'pulse 1s infinite' }}>
              <ShieldAlert size={18} strokeWidth={2.8} />
            </span>
            <span>LLAMADO DE ATENCIÓN EN VIVO</span>
          </div>

          <span
            style={{
              background: '#000000',
              color: '#FEF08A',
              fontSize: '0.68rem',
              fontWeight: 900,
              padding: '2px 8px',
              borderRadius: '6px',
              border: '1.5px solid #FFFFFF'
            }}
          >
            DOCENTE
          </span>
        </div>

        {/* Contenido principal */}
        <div style={{ padding: '24px 22px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
          
          {/* Avatar / Ícono de atención con ojos vigilantes */}
          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '22px',
              background: '#FEF08A',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <Eye size={40} color="#000000" strokeWidth={2.6} />
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#EF4444',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #000000',
                boxShadow: '1.5px 1.5px 0px #000000'
              }}
            >
              <AlertTriangle size={14} strokeWidth={3} />
            </span>
          </div>

          {/* Título de la alerta */}
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '1.4rem',
                fontWeight: 900,
                color: '#0F172A',
                lineHeight: 1.25,
                letterSpacing: '-0.02em'
              }}
            >
              {alert.title}
            </h2>
            <p
              style={{
                margin: '6px 0 0',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#64748B'
              }}
            >
              {alert.sender || 'Profesor Joseph Carazo'} • Aviso instantáneo en tu pantalla
            </p>
          </div>

          {/* Caja con el mensaje */}
          <div
            style={{
              width: '100%',
              background: '#FEF2F2',
              border: '2.5px solid #000000',
              boxShadow: '3.5px 3.5px 0px #000000',
              borderRadius: '16px',
              padding: '16px 18px',
              boxSizing: 'border-box',
              textAlign: 'left'
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '1.02rem',
                fontWeight: 700,
                color: '#1E293B',
                lineHeight: 1.5,
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
              }}
            >
              {alert.message}
            </p>
          </div>

          {/* Botones de acción */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => onGoPlay(alert.id)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: '#22C55E',
                color: '#FFFFFF',
                border: '2.5px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                borderRadius: '14px',
                fontSize: '1.05rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.08s ease'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = '1.5px 1.5px 0px #000000';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
              }}
            >
              <Gamepad2 size={22} strokeWidth={2.8} />
              <span>¡ENTENDIDO, YA VOY A JUGAR!</span>
            </button>

            <button
              type="button"
              onClick={() => onAcknowledge(alert.id)}
              style={{
                width: '100%',
                padding: '9px 14px',
                background: '#FFFFFF',
                color: '#475569',
                border: '2px solid #CBD5E1',
                borderRadius: '12px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Check size={14} />
              <span>Aceptar y permanecer aquí</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
