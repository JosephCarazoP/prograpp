import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, Check, Share, PlusSquare, Zap, WifiOff, Clock, HelpCircle, Monitor } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { soundService } from '../services/soundService';

const SNOOZE_KEY = 'prograpp_pwa_snooze_until';
// 20 minutos de espera si le da a "Más tarde" o la "X"
const SNOOZE_DURATION_MS = 20 * 60 * 1000;
// 15 días si marca que ya la instaló
const INSTALLED_DISMISS_MS = 15 * 24 * 60 * 60 * 1000;

export const PWAInstallBanner: React.FC = () => {
  const { isInstalled, isIOS, isNativePromptAvailable, promptInstall } = usePWAInstall();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [installSuccess, setInstallSuccess] = useState<boolean>(false);
  const [isWaving, setIsWaving] = useState<boolean>(false);

  useEffect(() => {
    // Si ya está abierta en modo standalone/instalada, no mostrar
    if (isInstalled) {
      setIsOpen(false);
      return;
    }

    const checkAndShow = () => {
      const snoozeUntil = localStorage.getItem(SNOOZE_KEY);
      const now = Date.now();
      // Si no hay snooze o ya pasaron los 20 minutos / 15 días
      if (!snoozeUntil || now >= Number(snoozeUntil)) {
        setIsOpen(true);
        setIsWaving(true);
        try {
          soundService.playToken();
        } catch (_) {
          // Ignorar si el audio aún no tiene interacción
        }
      }
    };

    // Primera aparición a los 2.5 segundos (justo al cargar la app)
    const initialTimer = setTimeout(() => {
      checkAndShow();
    }, 2500);

    // Revisar periódicamente cada 15 segundos si ya vencieron los 20 minutos
    const intervalTimer = setInterval(() => {
      checkAndShow();
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [isInstalled]);

  // Si le da a "Más tarde" o la "X": se oculta y vuelve a salir en 20 minutos
  const handleSnooze = (durationMs = SNOOZE_DURATION_MS) => {
    soundService.playToken();
    setIsOpen(false);
    setShowGuide(false);
    localStorage.setItem(SNOOZE_KEY, String(Date.now() + durationMs));
  };

  // Si le da a "Ya la instalé": se oculta por 15 días
  const handleMarkAsInstalled = () => {
    soundService.playCorrect();
    setIsOpen(false);
    setShowGuide(false);
    localStorage.setItem(SNOOZE_KEY, String(Date.now() + INSTALLED_DISMISS_MS));
  };

  const handleInstallClick = async () => {
    soundService.playToken();
    if (isNativePromptAvailable) {
      const outcome = await promptInstall();
      if (outcome === 'accepted') {
        soundService.playCorrect();
        setInstallSuccess(true);
        setTimeout(() => {
          handleMarkAsInstalled();
        }, 3000);
      }
    } else {
      // Si el navegador no disparó el evento nativo o es iOS/Desktop, mostrar guía interactiva
      setShowGuide((prev) => !prev);
    }
  };

  // Solo se oculta si ya está instalada o si isOpen es false (por haberle dado X / recordar más tarde)
  if (isInstalled || !isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="¿Ya instalaste la app en tu celular?"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.68)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleSnooze();
      }}
    >
      <div
        className="neo-brutal-pwa-card"
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '3.5px solid #000000',
          boxShadow: '7px 7px 0px #000000',
          overflow: 'hidden',
          fontFamily: "'Nunito', sans-serif",
          animation: 'slideUpBounce 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
      >
        {/* CABECERA NEO-BRUTALIST VIBRANTE */}
        <div
          style={{
            backgroundColor: '#FFE600',
            borderBottom: '3.5px solid #000000',
            padding: '16px 20px 14px 20px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          {/* Badge superior */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                backgroundColor: '#000000',
                color: '#FFE600',
                fontSize: '0.72rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '3px 10px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Zap size={12} fill="#FFE600" />
              RECORDATORIO DEV
            </span>
          </div>

          {/* Botón cerrar "X" Neo-Brutalist (activa el snooze de 20 min) */}
          <button
            type="button"
            onClick={() => handleSnooze()}
            aria-label="Recordar en 20 minutos"
            title="Recordarme en 20 minutos"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '2.5px solid #000000',
              boxShadow: '2px 2px 0px #000000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000',
              padding: 0
            }}
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* CUERPO PRINCIPAL CON MASCOTA SALUDANDO */}
        <div style={{ padding: '20px 20px 18px 20px' }}>
          {/* Fila del Saludo con Icono Robot Byte */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                backgroundColor: '#0284C7',
                border: '3px solid #000000',
                boxShadow: '3.5px 3.5px 0px #000000',
                flexShrink: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <img
                src="/byte-app-icon.png"
                alt="Robot Byte Mascot"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isWaving ? 'scale(1.05)' : 'none',
                  transition: 'transform 0.2s ease'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  fontSize: '1.25rem',
                  animation: 'waveHand 1.6s infinite ease-in-out',
                  transformOrigin: '70% 70%',
                  display: 'inline-block'
                }}
              >
                👋
              </span>
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.24rem',
                  fontWeight: 900,
                  color: '#000000',
                  lineHeight: '1.2'
                }}
              >
                ¡Hola, Dev! 👋
              </h3>
              <div
                style={{
                  fontSize: '1.02rem',
                  fontWeight: 900,
                  color: '#0284C7',
                  marginTop: '2px'
                }}
              >
                ¿Ya instalaste la app?
              </div>
            </div>
          </div>

          <p
            style={{
              margin: '0 0 16px 0',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: '#334155',
              lineHeight: '1.4'
            }}
          >
            Instala PrograApp en tu pantalla de inicio para entrar directo con <strong>1 toque</strong> y resolver tus retos de Kotlin y SQL <strong>sin gastar datos</strong>.
          </p>

          {/* TARJETAS DE BENEFICIOS NEO-BRUTALIST */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '16px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '12px',
                backgroundColor: '#ECFDF5',
                border: '2px solid #000000',
                boxShadow: '2.5px 2.5px 0px #000000'
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '8px',
                  backgroundColor: '#22C55E',
                  border: '1.5px solid #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <WifiOff size={14} color="#000000" strokeWidth={2.8} />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#000000' }}>
                100% Offline: Funciona sin internet ni señal
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '12px',
                backgroundColor: '#F0F9FF',
                border: '2px solid #000000',
                boxShadow: '2.5px 2.5px 0px #000000'
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '8px',
                  backgroundColor: '#38BDF8',
                  border: '1.5px solid #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Smartphone size={14} color="#000000" strokeWidth={2.8} />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#000000' }}>
                Pantalla completa sin barra del navegador
              </span>
            </div>
          </div>

          {/* GUÍA PASO A PASO INTERACTIVA (Si no hay prompt automático o es iOS) */}
          {showGuide && (
            <div
              style={{
                backgroundColor: '#FFFBEB',
                border: '2.5px solid #000000',
                borderRadius: '14px',
                boxShadow: '3px 3px 0px #000000',
                padding: '12px 14px',
                marginBottom: '16px',
                fontSize: '0.82rem',
                color: '#000000',
                fontWeight: 800,
                animation: 'slideDownFade 0.2s ease-out'
              }}
            >
              {isIOS ? (
                <>
                  <div style={{ color: '#D97706', marginBottom: '8px', fontSize: '0.85rem' }}>
                    📱 En iPhone / iPad (Safari):
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Share size={16} color="#0284C7" strokeWidth={2.5} />
                    <span>1. Pulsa el botón <strong>Compartir</strong> (abajo al centro).</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusSquare size={16} color="#16A34A" strokeWidth={2.5} />
                    <span>2. Desliza y pulsa <strong>"Añadir a pantalla de inicio"</strong>.</span>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ color: '#D97706', marginBottom: '8px', fontSize: '0.85rem' }}>
                    📱 En Android / Celular:
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Smartphone size={16} color="#0284C7" strokeWidth={2.5} />
                    <span>1. Pulsa los <strong>3 puntos (⋮)</strong> arriba a la derecha.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <PlusSquare size={16} color="#16A34A" strokeWidth={2.5} />
                    <span>2. Selecciona <strong>"Instalar aplicación"</strong> o "Añadir a pantalla".</span>
                  </div>
                  <div style={{ borderTop: '1.5px dashed #000000', paddingTop: '6px', fontSize: '0.78rem', color: '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Monitor size={14} color="#0284C7" />
                      <span>En PC/Laptop: Clic en el icono de instalar en la barra de URL.</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* BOTONES DE ACCIÓN NEO-BRUTALIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {!installSuccess ? (
              <button
                type="button"
                onClick={handleInstallClick}
                className="neo-brutal-btn-primary"
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#22C55E',
                  color: '#000000',
                  border: '3px solid #000000',
                  borderRadius: '14px',
                  boxShadow: '4px 4px 0px #000000',
                  fontWeight: 900,
                  fontSize: '0.96rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.08s ease'
                }}
              >
                {isNativePromptAvailable ? (
                  <>
                    <Download size={18} strokeWidth={2.8} />
                    <span>¡SÍ, INSTALAR EN PANTALLA!</span>
                  </>
                ) : (
                  <>
                    <HelpCircle size={18} strokeWidth={2.8} />
                    <span>{showGuide ? 'OCULTAR INSTRUCCIONES' : '¿CÓMO LA INSTALO?'}</span>
                  </>
                )}
              </button>
            ) : (
              <div
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#DCFCE7',
                  border: '3px solid #000000',
                  borderRadius: '14px',
                  boxShadow: '4px 4px 0px #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: '#15803D',
                  fontWeight: 900,
                  fontSize: '0.9rem'
                }}
              >
                <Check size={20} strokeWidth={3} />
                <span>¡LISTO! ABRE LA APP DESDE TU PANTALLA</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleSnooze()}
                title="Volver a avisar en 20 minutos"
                style={{
                  flex: 1,
                  height: '42px',
                  backgroundColor: '#F8FAFC',
                  color: '#475569',
                  border: '2.5px solid #000000',
                  borderRadius: '12px',
                  boxShadow: '3px 3px 0px #000000',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Clock size={14} strokeWidth={2.5} />
                <span>Más tarde (20m)</span>
              </button>

              <button
                type="button"
                onClick={handleMarkAsInstalled}
                title="No volver a mostrar en 15 días"
                style={{
                  flex: 1,
                  height: '42px',
                  backgroundColor: '#F1F5F9',
                  color: '#0F172A',
                  border: '2.5px solid #000000',
                  borderRadius: '12px',
                  boxShadow: '3px 3px 0px #000000',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Check size={14} strokeWidth={2.8} />
                <span>Ya la instalé</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
