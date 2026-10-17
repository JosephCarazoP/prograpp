import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

interface LoadingScreenProps {
  isReady: boolean;
  minDurationMs?: number;
  onFinish?: () => void;
  title?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isReady,
  minDurationMs = 2400,
  onFinish,
  title = 'Inicializando PrograApp...'
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  // Transición controlada de salida
  useEffect(() => {
    if (!isReady) return;

    let exitTimeout: any;
    const enterTimeout = setTimeout(() => {
      setIsExiting(true);
      exitTimeout = setTimeout(() => {
        onFinishRef.current?.();
      }, 400);
    }, minDurationMs);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
    };
  }, [isReady, minDurationMs]);

  const handleSkip = () => {
    if (!isExiting) {
      setIsExiting(true);
      setTimeout(() => {
        onFinishRef.current?.();
      }, 250);
    }
  };

  return (
    <div
      className={`loading-screen-container loading-screen-backdrop ${
        isExiting ? 'loading-screen-exit' : ''
      }`}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: '24px',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="loading-screen-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '400px',
          width: '100%'
        }}
      >
        {/* Spinner animado minimalista estilo Duolingo */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '4px solid #E2E8F0',
              borderTopColor: '#22C55E',
              animation: 'spin 0.8s linear infinite'
            }}
          />
        </div>

        {/* Título de Carga limpio con tipografía Duolingo */}
        <div
          style={{
            marginTop: '22px',
            color: '#1E293B',
            fontSize: '1.25rem',
            fontWeight: 900,
            letterSpacing: '0.2px',
            textAlign: 'center'
          }}
        >
          {title}
        </div>

        {/* Barra de Progreso limpia estilo Duolingo */}
        <div
          style={{
            width: '240px',
            height: '14px',
            background: '#F1F5F9',
            borderRadius: '999px',
            border: '2px solid #E2E8F0',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
            marginTop: '18px',
            overflow: 'hidden',
            padding: '2px'
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #22C55E 0%, #16A34A 100%)',
              boxShadow: '0 2px 0 #15803D',
              animation: 'duoProgressFill 2.4s ease-out forwards'
            }}
          />
        </div>

        {/* Botón táctil 3D Duolingo para saltar */}
        <button
          onClick={handleSkip}
          style={{
            marginTop: '24px',
            color: '#475569',
            fontSize: '0.85rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            padding: '8px 18px',
            borderRadius: '14px',
            background: '#FFFFFF',
            border: '2px solid #E2E8F0',
            boxShadow: '0 3px 0 #CBD5E1',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#CBD5E1';
            e.currentTarget.style.color = '#1E293B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.color = '#475569';
          }}
        >
          <span>Saltar</span>
          <ChevronRight size={15} strokeWidth={2.5} />
        </button>
      </div>

      <style>{`
        @keyframes devGentleBob {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
        @keyframes devHappyBounce {
          0% { transform: scale(1) translateY(0); }
          40% { transform: scale(1.08) translateY(-10px); }
          70% { transform: scale(0.96) translateY(2px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes duoProgressFill {
          0% { width: 8%; }
          30% { width: 35%; }
          60% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
