import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export const NetworkStatusBadge: React.FC = () => {
  const { isOnline, wasOffline } = useNetworkStatus();
  const [showRestored, setShowRestored] = useState<boolean>(false);

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (isOnline && !showRestored) {
    return null;
  }

  return (
    <aside
      role="status"
      aria-live="polite"
      className="network-status-badge"
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        maxWidth: '92vw',
        padding: '10px 18px',
        borderRadius: '9999px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: isOnline
          ? '0 10px 25px -5px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.3)'
          : '0 10px 25px -5px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(239, 68, 68, 0.3)',
        backgroundColor: isOnline
          ? 'rgba(6, 78, 59, 0.92)'
          : 'rgba(127, 29, 29, 0.92)',
        color: '#FFFFFF',
        fontFamily: "'Nunito', sans-serif",
        fontSize: '0.88rem',
        fontWeight: 700,
        letterSpacing: '0.01em',
        animation: 'slideDownFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none'
      }}
    >
      {isOnline ? (
        <>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Wifi size={16} color="#FFFFFF" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>¡Conexión restablecida!</span>
              <RefreshCw size={13} className="animate-spin" style={{ opacity: 0.8 }} />
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 500 }}>
              Sincronizando datos con la nube automáticamente...
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <WifiOff size={16} color="#FFFFFF" strokeWidth={2.5} />
          </div>
          <div>
            <div>Modo Sin Conexión activo</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 500 }}>
              Puedes seguir aprendiendo. Tus datos se guardan en el celular.
            </div>
          </div>
        </>
      )}
    </aside>
  );
};
