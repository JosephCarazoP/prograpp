import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

interface LoadingScreenProps {
  isReady: boolean;
  minDurationMs?: number;
  onFinish?: () => void;
  title?: string;
}

type DevAnimStep =
  | 'look-left'    // 1. Dev aparece mirando hacia la izquierda
  | 'blink-1'      // 2. Parpadea
  | 'look-right'   // 3. Mira hacia la derecha
  | 'blink-2'      // 4. Parpadea
  | 'look-front'   // 5. Mira nuevamente hacia el frente
  | 'smile';       // 6. Finalmente sonríe

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isReady,
  minDurationMs = 2400,
  onFinish,
  title = 'Inicializando PrograApp...'
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [animStep, setAnimStep] = useState<DevAnimStep>('look-left');
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  // Secuencia de animación de Dev estilo Duolingo 3D:
  // 1. Mira izquierda -> 2. Parpadea -> 3. Mira derecha -> 4. Parpadea -> 5. Mira al frente -> 6. Sonríe
  useEffect(() => {
    const t1 = setTimeout(() => setAnimStep('blink-1'), 450);
    const t2 = setTimeout(() => setAnimStep('look-right'), 750);
    const t3 = setTimeout(() => setAnimStep('blink-2'), 1250);
    const t4 = setTimeout(() => setAnimStep('look-front'), 1550);
    const t5 = setTimeout(() => setAnimStep('smile'), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

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
        {/* Robot Mascota Dev 3D estilo Duolingo con animación amigable y expresiva */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: animStep === 'smile' ? 'devHappyBounce 0.6s ease-in-out' : 'devGentleBob 3s ease-in-out infinite alternate'
          }}
        >
          <svg
            width="128"
            height="128"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              overflow: 'visible',
              filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.14))'
            }}
          >
            <defs>
              {/* Esfera 3D de la Antena */}
              <radialGradient id="loadAntenna3d" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </radialGradient>

              {/* Chasis 3D del Robot Dev */}
              <linearGradient id="loadChassis3d" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="25%" stopColor="#0EA5E9" />
                <stop offset="70%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>

              {/* Orejeras Cilíndricas 3D */}
              <linearGradient id="loadEar3d" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0369A1" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#082F49" />
              </linearGradient>

              {/* Pantalla Visor CRT */}
              <linearGradient id="loadVisorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#020617" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>
            </defs>

            {/* Sombra de contacto en el suelo */}
            <ellipse cx="60" cy="114" rx="34" ry="5" fill="#000000" fillOpacity="0.16" />

            {/* Base / Soporte 3D metálico */}
            <rect x="52" y="90" width="16" height="10" rx="3" fill="#0369A1" />
            <rect x="42" y="98" width="36" height="8" rx="4" fill="#082F49" stroke="#0284C7" strokeWidth="1.5" />

            {/* Mástil de la antena */}
            <rect x="57" y="14" width="6" height="16" rx="2" fill="#64748B" stroke="#334155" strokeWidth="1" />

            {/* Esfera 3D de la antena */}
            <circle
              cx="60"
              cy="12"
              r="8"
              fill="url(#loadAntenna3d)"
              stroke="#FEF08A"
              strokeWidth="1.5"
            />

            {/* Orejeras laterales con indicador LED verde */}
            <rect x="10" y="44" width="10" height="28" rx="5" fill="url(#loadEar3d)" stroke="#0369A1" strokeWidth="1.5" />
            <circle cx="15" cy="58" r="2.5" fill="#22C55E" />

            <rect x="100" y="44" width="10" height="28" rx="5" fill="url(#loadEar3d)" stroke="#0369A1" strokeWidth="1.5" />
            <circle cx="105" cy="58" r="2.5" fill="#22C55E" />

            {/* Bisel inferior de sombra 3D */}
            <rect x="18" y="32" width="84" height="62" rx="20" fill="#0369A1" />

            {/* Chasis principal 3D */}
            <rect
              x="18"
              y="26"
              width="84"
              height="62"
              rx="20"
              fill="url(#loadChassis3d)"
              stroke="#7DD3FC"
              strokeWidth="2.5"
            />

            {/* Brillo especular superior del chasis */}
            <path
              d="M32 28 C42 27, 78 27, 88 28"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeOpacity="0.75"
            />

            {/* Pantalla Visor CRT */}
            <rect
              x="26"
              y="34"
              width="68"
              height="46"
              rx="12"
              fill="url(#loadVisorGrad)"
              stroke="#0369A1"
              strokeWidth="2"
            />

            {/* Reflejo diagonal de cristal */}
            <path
              d="M28 36 L68 36 L44 78 L28 78 Z"
              fill="#FFFFFF"
              fillOpacity="0.08"
            />

            {/* ═══ OJOS DIGITALES SEGÚN EL PASO DE ANIMACIÓN ═══ */}

            {/* 1. MIRA HACIA LA IZQUIERDA */}
            {animStep === 'look-left' && (
              <g style={{ transition: 'all 0.2s ease' }}>
                {/* Ojo Izquierdo mirando a la izquierda */}
                <circle cx="41" cy="54" r="7" fill="#38BDF8" />
                <circle cx="41" cy="54" r="5.2" fill="#0284C7" />
                <circle cx="39" cy="52" r="2.2" fill="#FFFFFF" />

                {/* Ojo Derecho mirando a la izquierda */}
                <circle cx="71" cy="54" r="7" fill="#38BDF8" />
                <circle cx="71" cy="54" r="5.2" fill="#0284C7" />
                <circle cx="69" cy="52" r="2.2" fill="#FFFFFF" />

                {/* Boca neutral curiosa */}
                <path d="M54 68 Q60 69 66 68" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* 2. PARPADEO 1 */}
            {animStep === 'blink-1' && (
              <g>
                <line x1="37" y1="54" x2="49" y2="54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                <line x1="67" y1="54" x2="79" y2="54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                <path d="M54 68 Q60 69 66 68" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* 3. MIRA HACIA LA DERECHA */}
            {animStep === 'look-right' && (
              <g style={{ transition: 'all 0.2s ease' }}>
                {/* Ojo Izquierdo mirando a la derecha */}
                <circle cx="49" cy="54" r="7" fill="#38BDF8" />
                <circle cx="49" cy="54" r="5.2" fill="#0284C7" />
                <circle cx="51" cy="52" r="2.2" fill="#FFFFFF" />

                {/* Ojo Derecho mirando a la derecha */}
                <circle cx="79" cy="54" r="7" fill="#38BDF8" />
                <circle cx="79" cy="54" r="5.2" fill="#0284C7" />
                <circle cx="81" cy="52" r="2.2" fill="#FFFFFF" />

                {/* Boca neutral curiosa */}
                <path d="M54 68 Q60 69 66 68" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* 4. PARPADEO 2 */}
            {animStep === 'blink-2' && (
              <g>
                <line x1="37" y1="54" x2="49" y2="54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                <line x1="67" y1="54" x2="79" y2="54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                <path d="M54 68 Q60 69 66 68" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* 5. MIRA NUEVAMENTE HACIA EL FRENTE */}
            {animStep === 'look-front' && (
              <g style={{ transition: 'all 0.2s ease' }}>
                {/* Ojos al centro */}
                <circle cx="45" cy="54" r="7.5" fill="#38BDF8" />
                <circle cx="45" cy="54" r="5.5" fill="#0284C7" />
                <circle cx="47" cy="52" r="2.4" fill="#FFFFFF" />

                <circle cx="75" cy="54" r="7.5" fill="#38BDF8" />
                <circle cx="75" cy="54" r="5.5" fill="#0284C7" />
                <circle cx="77" cy="52" r="2.4" fill="#FFFFFF" />

                {/* Sonrisa comenzando */}
                <path d="M52 68 Q60 72 68 68" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* 6. FINALMENTE SONRÍE (Expresión alegre y radiante estilo Duolingo) */}
            {animStep === 'smile' && (
              <g style={{ transition: 'all 0.2s ease' }}>
                {/* Ojos alegres de arco invertido ^ ^ con destello superior */}
                <path
                  d="M38 56 Q45 46 52 56"
                  stroke="#38BDF8"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="45" cy="48" r="1.8" fill="#FFFFFF" />

                <path
                  d="M68 56 Q75 46 82 56"
                  stroke="#38BDF8"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="75" cy="48" r="1.8" fill="#FFFFFF" />

                {/* Gran sonrisa feliz y amigable */}
                <path
                  d="M48 66 Q60 77 72 66"
                  stroke="#38BDF8"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Relleno sutil de la sonrisa */}
                <path
                  d="M50 67 Q60 75 70 67 Z"
                  fill="#38BDF8"
                  opacity="0.3"
                />
              </g>
            )}
          </svg>
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
