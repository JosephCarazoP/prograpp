import React, { useState, useEffect, useCallback } from 'react';
import { Terminal } from 'lucide-react';
import { soundService } from '../services/soundService';

export type ConsoleMood = 'happy' | 'thinking' | 'cheer' | 'support';

export interface ConsoleAvatarProps {
  mood?: ConsoleMood;
  message?: string | React.ReactNode;
  messages?: string[];
  autoRotateIntervalMs?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  hideMessage?: boolean;
}

// Mensajes dinámicos de motivación y gamificación de la mascota Dev
export const DEFAULT_DEV_TIPS: Record<ConsoleMood, string[]> = {
  happy: [
    '¡Hola Dev! Selecciona una estación en el camino para seguir programando.',
    '¡Práctica constante: 5 minutos de código diario fijan más conceptos que horas esporádicas!',
    '¡Cada lección completada te acerca a desbloquear el siguiente nivel y nuevos cofres!',
    '¡Resuelve ejercicios para ganar Bytes y conseguir poderosos comodines en la tienda!',
    '¿Sabías qué? Kotlin compila tanto a bytecode de la JVM como a JavaScript y binarios nativos.',
    '¡El Gimnasio de Práctica te espera tocando tus baterías para recargar tu energía!',
    '¡Mantén encendida tu racha diaria de código para multiplicar tus recompensas!',
    '¡El compilador celebra cada reto que resuelves con éxito!'
  ],
  thinking: [
    'Analiza la lógica con calma. Fíjate en los detalles de sintaxis.',
    'Descompón el reto en pasos lógicos pequeños antes de formular tu respuesta.',
    'Revisa los tipos de datos: ¿es Int, String o Boolean?',
    'Fíjate bien en el orden de los operadores y los paréntesis.',
    'El compilador es tu guía: cada detalle cuenta para la solución exacta.'
  ],
  cheer: [
    '¡Brillante! ¡Compiló sin errores! Has ganado valiosa experiencia.',
    '¡Excelente deducción lógica! Tu código se ejecuta a la perfección.',
    '¡Algoritmo impecable! Estás subiendo de nivel rápidamente.',
    '¡Genial trabajo! Dominar la sintaxis abre un mundo de posibilidades.',
    '¡Prueba superada con éxito! La consola celebra tu precisión.'
  ],
  support: [
    'No pasa nada. En programación, cada error te enseña cómo funciona la máquina.',
    'Los mejores desarrolladores del mundo pasan la mitad de su tiempo depurando errores.',
    'Un fallo es solo un paso más hacia la solución correcta. ¡Inténtalo de nuevo!',
    'Revisa con atención las pistas. Tienes todo lo necesario para resolverlo.',
    'Respira hondo y lee con calma la sintaxis. ¡Tú tienes el control!'
  ]
};

// Fragmentos de código aleatorio dinámico que corren dentro de la pantalla
const CODE_STREAM_SNIPPETS = [
  { text: 'fun main() {', color: '#38BDF8' },
  { text: '  val code: Int = 42', color: '#34D399' },
  { text: '  SELECT * FROM dev', color: '#FBBF24' },
  { text: '  WHERE active = 1', color: '#94A3B8' },
  { text: '  01001011 011001', color: '#10B981' },
  { text: '  runCatching {', color: '#38BDF8' },
  { text: '    println("Dev")', color: '#F472B6' },
  { text: '  }', color: '#38BDF8' },
  { text: '  val status = OK', color: '#34D399' },
  { text: '  JOIN skills ON id', color: '#FBBF24' },
  { text: '  while (xp < 999) {', color: '#38BDF8' },
  { text: '    xp += 10', color: '#34D399' },
  { text: '  }', color: '#38BDF8' },
  { text: '  val query = "SQL"', color: '#FBBF24' },
  { text: '  class DevConsole', color: '#A78BFA' },
  { text: '  01110000 011100', color: '#10B981' },
  { text: '  fun compile(): Unit', color: '#38BDF8' },
  { text: '  emit(Result.Ok)', color: '#34D399' },
  { text: '  ORDER BY rank ASC', color: '#FBBF24' },
  { text: '  val ready = true', color: '#34D399' },
  { text: '  return success;', color: '#F87171' },
  { text: '}', color: '#38BDF8' }
];

export const ConsoleMascot: React.FC<ConsoleAvatarProps> = ({
  mood = 'happy',
  message,
  messages,
  autoRotateIntervalMs = 6800,
  className = '',
  size = 'md',
  hideMessage = false
}) => {
  // Si no hay mensaje explícito ni mensajes para mostrar, no renderizamos nada (eliminación total de Tips)
  const rotatingList = messages || (message ? [typeof message === 'string' ? message : ''] : []);
  if (!message && (!messages || messages.length === 0)) {
    return null;
  }

  // Estado para parpadeo adicional interactivo
  const [blinkActive, setBlinkActive] = useState(false);
  const isDynamic = !message && rotatingList.length > 1;

  // Estado de rotación de mensajes
  const [activeMsgIndex, setActiveMsgIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Avanzar al siguiente mensaje con micro-animación de transición
  const handleNextMessage = useCallback(() => {
    if (!isDynamic) return;
    try {
      soundService.playToken();
    } catch {
      // Ignorar si audio está bloqueado
    }
    setIsFading(true);
    setTimeout(() => {
      setActiveMsgIndex((prev) => (prev + 1) % rotatingList.length);
      setIsFading(false);
    }, 180);
  }, [isDynamic, rotatingList.length]);

  // Rotador automático periódico de mensajes cada N milisegundos
  useEffect(() => {
    if (!isDynamic) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveMsgIndex((prev) => (prev + 1) % rotatingList.length);
        setIsFading(false);
      }, 180);
    }, autoRotateIntervalMs);

    return () => clearInterval(interval);
  }, [isDynamic, rotatingList.length, autoRotateIntervalMs]);

  // Parpadeo periódico estocástico de los ojos (cada 3.2s - 4.8s)
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;
    const triggerBlink = () => {
      setBlinkActive(true);
      setTimeout(() => setBlinkActive(false), 140);
      const nextDelay = 3000 + Math.random() * 1800;
      blinkTimeout = setTimeout(triggerBlink, nextDelay);
    };

    blinkTimeout = setTimeout(triggerBlink, 3200);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Paleta de color fosforescente según el estado de ánimo (mood)
  const moodColor = {
    happy: '#38BDF8',    // Cyan Neón brillante
    thinking: '#F59E0B', // Ámbar Terminal
    cheer: '#22C55E',    // Verde Matrix
    support: '#F87171'   // Coral Empático
  }[mood];

  // Dimensiones Mobile-First optimizadas (evitan empujar el ancho de pantalla en móviles)
  const consoleWidth = size === 'lg' ? 98 : size === 'sm' ? 68 : 82;
  const consoleHeight = size === 'lg' ? 84 : size === 'sm' ? 60 : 72;
  const screenHeight = size === 'lg' ? 56 : size === 'sm' ? 40 : 48;

  // Mensaje actual a renderizar
  const currentDisplayedText = message ? message : rotatingList[activeMsgIndex % rotatingList.length];

  return (
    <div
      className={`console-mascot-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin: '8px 0 14px 0',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. UNIDAD DE LA CONSOLA (Hardware de monitor CRT 3D con orejeras y levitación) */}
      <div
        className="console-hardware-wrapper"
        onClick={handleNextMessage}
        title={isDynamic ? 'Toca a Dev' : undefined}
        style={{
          flexShrink: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: `${consoleWidth + 14}px`,
          cursor: isDynamic ? 'pointer' : 'default',
          animation: 'devMascotFloat 3.5s ease-in-out infinite alternate',
          filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.22))'
        }}
      >
        {/* Antena 3D con esfera de energía y luz radial */}
        <div
          style={{
            width: '6px',
            height: '8px',
            background: 'linear-gradient(180deg, #64748B 0%, #334155 100%)',
            borderRadius: '2px',
            marginBottom: '-2px',
            position: 'relative',
            zIndex: 3
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              left: '-3px',
              width: '12px',
              height: '10px',
              borderRadius: '999px',
              background: `radial-gradient(circle at 35% 30%, #FFFFFF 0%, ${moodColor} 50%, #0369A1 100%)`,
              boxShadow: `0 0 10px ${moodColor}, 0 2px 4px rgba(0,0,0,0.3)`,
              transition: 'all 0.3s ease'
            }}
          />
        </div>

        {/* Contenedor relativo para chasis + orejeras 3D */}
        <div style={{ position: 'relative', width: `${consoleWidth}px` }}>
          {/* Orejera Izquierda 3D Cilíndrica */}
          <div
            style={{
              position: 'absolute',
              left: '-7px',
              top: '12px',
              width: '8px',
              height: '24px',
              borderRadius: '4px',
              background: 'linear-gradient(90deg, #0369A1 0%, #38BDF8 60%, #082F49 100%)',
              border: '1px solid #0284C7',
              boxShadow: '-2px 2px 4px rgba(0,0,0,0.25)',
              zIndex: 0
            }}
          >
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#22C55E', margin: '10px auto 0 auto' }} />
          </div>

          {/* Orejera Derecha 3D Cilíndrica */}
          <div
            style={{
              position: 'absolute',
              right: '-7px',
              top: '12px',
              width: '8px',
              height: '24px',
              borderRadius: '4px',
              background: 'linear-gradient(270deg, #0369A1 0%, #38BDF8 60%, #082F49 100%)',
              border: '1px solid #0284C7',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.25)',
              zIndex: 0
            }}
          >
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#22C55E', margin: '10px auto 0 auto' }} />
          </div>

          {/* Chasis principal 3D del Robot Dev */}
          <div
            className="console-chassis"
            style={{
              width: `${consoleWidth}px`,
              height: `${consoleHeight}px`,
              background: 'linear-gradient(155deg, #38BDF8 0%, #0EA5E9 30%, #0284C7 70%, #0369A1 100%)',
              borderRadius: '14px',
              border: '2px solid #7DD3FC',
              boxShadow: '0 5px 0 #075985, inset 0 1px 2px rgba(255,255,255,0.6)',
              padding: '5px',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}
          >
            {/* Pantalla Interna Visor 3D */}
            <div
              className="console-screen-inner"
              style={{
                width: '100%',
                height: `${screenHeight}px`,
                background: 'linear-gradient(180deg, #020617 0%, #0B132B 100%)',
                borderRadius: '9px',
                border: '1.5px solid #0369A1',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.9), inset 0 -1px 2px rgba(255,255,255,0.06)'
              }}
            >
            {/* Capa 1: Corriente de código aleatorio en movimiento vertical continuo */}
            <div
              className="console-code-scroll"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                fontFamily: 'var(--font-code)',
                fontSize: '6.5px',
                lineHeight: 1.25,
                opacity: 0.32,
                padding: '2px 4px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            >
              {[...CODE_STREAM_SNIPPETS, ...CODE_STREAM_SNIPPETS].map((snippet, idx) => (
                <div
                  key={idx}
                  style={{
                    color: snippet.color,
                    letterSpacing: '-0.2px',
                    opacity: idx % 2 === 0 ? 0.95 : 0.65
                  }}
                >
                  {snippet.text}
                </div>
              ))}
            </div>

            {/* Capa 2: Efecto CRT Scanlines */}
            <div
              className="console-crt-scanlines"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 2px)',
                pointerEvents: 'none',
                zIndex: 2
              }}
            />

            {/* Capa 3: Reflejo curvo del cristal retro de la pantalla */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '65%',
                height: '45%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 80%)',
                borderTopRightRadius: '8px',
                pointerEvents: 'none',
                zIndex: 3
              }}
            />

            {/* Capa 4: ROSTRO DIGITAL (Ojos y Boca con parpadeo periódico y expresiones) */}
            <div
              className="console-face"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 4,
                color: moodColor,
                filter: `drop-shadow(0 0 5px ${moodColor})`
              }}
            >
              {/* Ojos Digitales con parpadeo periódico */}
              <div
                className={`console-eyes-wrapper ${blinkActive ? 'blink-forced' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '3px'
                }}
              >
                {/* Ojo Izquierdo */}
                {mood === 'happy' && (
                  <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
                    <path d="M2 8 C3 2, 11 2, 12 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                )}
                {mood === 'thinking' && (
                  <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
                    <line x1="2" y1="5" x2="12" y2="5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                )}
                {mood === 'cheer' && (
                  <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
                    <path d="M2 2 L7 5 L2 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {mood === 'support' && (
                  <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
                    <circle cx="7" cy="5" r="3.6" fill="currentColor" />
                    <circle cx="8" cy="4" r="1.3" fill="#FFFFFF" />
                  </svg>
                )}

                {/* Ojo Derecho */}
                {mood === 'happy' && (
                  <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
                    <path d="M2 8 C3 2, 11 2, 12 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                )}
                {mood === 'thinking' && (
                  <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
                    <rect x="3" y="2" width="7" height="6" rx="1.5" fill="currentColor" />
                  </svg>
                )}
                {mood === 'cheer' && (
                  <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
                    <path d="M12 2 L7 5 L12 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {mood === 'support' && (
                  <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
                    <circle cx="7" cy="5" r="3.6" fill="currentColor" />
                    <circle cx="8" cy="4" r="1.3" fill="#FFFFFF" />
                  </svg>
                )}
              </div>

              {/* Boca Digital Expresiva */}
              <div
                className="console-mouth"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1px'
                }}
              >
                {mood === 'happy' && (
                  <svg width="16" height="8" viewBox="0 0 18 8" fill="none">
                    <path d="M3 2 Q9 8 15 2" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                )}
                {mood === 'thinking' && (
                  <svg width="16" height="8" viewBox="0 0 18 8" fill="none">
                    <line x1="4" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                )}
                {mood === 'cheer' && (
                  <svg width="16" height="8" viewBox="0 0 18 8" fill="none">
                    <path d="M3 2 Q9 9 15 2 Z" fill="currentColor" />
                  </svg>
                )}
                {mood === 'support' && (
                  <svg width="16" height="8" viewBox="0 0 18 8" fill="none">
                    <path d="M4 3 Q9 7 14 3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Panel inferior del monitor (LED de encendido y mini botones) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '2px',
              paddingLeft: '2px',
              paddingRight: '2px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div
                className="console-power-led"
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '999px',
                  background: '#22C55E',
                  boxShadow: '0 0 5px #22C55E'
                }}
              />
              <span
                style={{
                  fontSize: '5.5px',
                  fontFamily: 'var(--font-code)',
                  color: '#64748B',
                  fontWeight: 800,
                  letterSpacing: '0.04em'
                }}
              >
                DEV-OS
              </span>
            </div>

            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
              <div style={{ width: '4px', height: '2px', background: '#334155', borderRadius: '1px' }} />
              <div style={{ width: '4px', height: '2px', background: '#334155', borderRadius: '1px' }} />
            </div>
            </div>
          </div>
        </div>

        {/* Soporte / Base metálica 3D del monitor */}
        <div
          className="console-stand"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              width: '14px',
              height: '5px',
              background: 'linear-gradient(180deg, #0369A1 0%, #0284C7 100%)',
              borderLeft: '1.5px solid #082F49',
              borderRight: '1.5px solid #082F49'
            }}
          />
          <div
            style={{
              width: '34px',
              height: '6px',
              background: 'linear-gradient(180deg, #082F49 0%, #0369A1 100%)',
              border: '1.5px solid #38BDF8',
              borderRadius: '3px',
              boxShadow: '0 2px 0 #021a2c, 0 4px 8px rgba(0,0,0,0.3)'
            }}
          />
        </div>
      </div>

      {/* 2. NUBE DE MENSAJE DUOLINGO (Speech Bubble en fondo blanco limpio con rabito apuntando a Dev) */}
      {!hideMessage && (
        <div
          className="console-speech-bubble"
          onClick={handleNextMessage}
          title={isDynamic ? 'Toca para continuar' : undefined}
          style={{
            position: 'relative',
            background: '#FFFFFF',
            padding: '12px 16px',
            borderRadius: '18px',
            border: '2px solid #E2E8F0',
            boxShadow: '0 4px 0 #CBD5E1',
            color: '#1E293B',
            flex: 1,
            lineHeight: 1.45,
            minHeight: `${consoleHeight}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: isDynamic ? 'pointer' : 'default',
            boxSizing: 'border-box',
            minWidth: 0,
            overflow: 'hidden',
            animation: 'consoleSpeechAppear 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Rabito de la nube de mensaje */}
          <div
            className="speech-bubble-tail"
            style={{
              position: 'absolute',
              left: '-11px',
              top: '28px',
              width: 0,
              height: 0,
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              borderRight: '11px solid #E2E8F0',
              pointerEvents: 'none'
            }}
          />
          <div
            className="speech-bubble-tail-inner"
            style={{
              position: 'absolute',
              left: '-8px',
              top: '28px',
              width: 0,
              height: 0,
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderRight: '9px solid #FFFFFF',
              pointerEvents: 'none'
            }}
          />

          {/* Encabezado con estado DEV-OS */}
          <div
            className="console-speech-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px',
              gap: '6px'
            }}
          >
            <div
              className="console-terminal-badge"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-code)',
                fontWeight: 900,
                color: '#0284C7',
                letterSpacing: '0.04em'
              }}
            >
              <Terminal size={13} strokeWidth={2.5} />
              <span>DEV-OS 3D</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '999px',
                  background: '#22C55E',
                  boxShadow: '0 0 6px #22C55E',
                  flexShrink: 0
                }}
              />
            </div>
          </div>

          {/* Texto del Mensaje con alto contraste */}
          <div
            className="console-bubble-text"
            style={{
              fontSize: '0.9rem',
              fontWeight: 800,
              color: '#1E293B',
              lineHeight: 1.45,
              opacity: isFading ? 0 : 1,
              transform: isFading ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'opacity 0.18s ease, transform 0.18s ease'
            }}
          >
            {currentDisplayedText}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente Avatar icono compacto 3D de Dev (para perfiles, navbar y badges)
export const ConsoleDevAvatar: React.FC<{ size?: number; className?: string; mood?: ConsoleMood }> = ({
  size = 48,
  className = '',
  mood = 'happy'
}) => {
  const moodColor = {
    happy: '#38BDF8',
    thinking: '#F59E0B',
    cheer: '#22C55E',
    support: '#F87171'
  }[mood];

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Esfera de halo 3D de fondo */}
        <radialGradient id={`cDevHalo-${mood}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="60%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#082F49" />
        </radialGradient>

        {/* Chasis 3D del robot monitor */}
        <linearGradient id="cDevChassis3d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="30%" stopColor="#0EA5E9" />
          <stop offset="75%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        {/* Esfera 3D de la antena */}
        <radialGradient id={`cDevAntenna-${mood}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor={moodColor} />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>

        {/* Visor 3D curvo */}
        <linearGradient id="cDevVisor3d" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="100%" stopColor="#0B132B" />
        </linearGradient>
      </defs>

      {/* Halo exterior 3D */}
      <circle cx="50" cy="50" r="48" fill={`url(#cDevHalo-${mood})`} stroke="#38BDF8" strokeWidth="2.5" />

      {/* Antena 3D */}
      <rect x="47" y="10" width="6" height="10" rx="2" fill="#64748B" stroke="#334155" strokeWidth="1" />
      <circle cx="50" cy="8" r="6" fill={`url(#cDevAntenna-${mood})`} stroke="#E0F2FE" strokeWidth="1" />

      {/* Orejeras laterales 3D con indicador */}
      <rect x="12" y="32" width="7" height="22" rx="3.5" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
      <circle cx="15.5" cy="43" r="1.5" fill="#22C55E" />
      
      <rect x="81" y="32" width="7" height="22" rx="3.5" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
      <circle cx="84.5" cy="43" r="1.5" fill="#22C55E" />

      {/* Bisel 3D inferior del chasis */}
      <rect x="17" y="24" width="66" height="50" rx="14" fill="#0369A1" />

      {/* Chasis frontal 3D */}
      <rect x="17" y="20" width="66" height="50" rx="14" fill="url(#cDevChassis3d)" stroke="#7DD3FC" strokeWidth="2" />
      
      {/* Brillo especular superior */}
      <line x1="28" y1="22" x2="72" y2="22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />

      {/* Pantalla CRT 3D */}
      <rect x="24" y="27" width="52" height="36" rx="8" fill="url(#cDevVisor3d)" stroke="#0369A1" strokeWidth="1.8" />

      {/* Reflejo de cristal curvado */}
      <path d="M25 28 L56 28 L36 62 L25 62 Z" fill="#FFFFFF" fillOpacity="0.09" />

      {/* Ojos Digitales 3D con destellos */}
      <g className="console-eyes-wrapper">
        <circle cx="41" cy="42" r="5" fill={moodColor} />
        <circle cx="41" cy="42" r="3.5" fill="#0284C7" />
        <circle cx="43" cy="40" r="1.8" fill="#FFFFFF" />

        <circle cx="59" cy="42" r="5" fill={moodColor} />
        <circle cx="59" cy="42" r="3.5" fill="#0284C7" />
        <circle cx="61" cy="40" r="1.8" fill="#FFFFFF" />
      </g>

      {/* Sonrisa digital 3D */}
      <path d="M43 51 Q50 56 57 51" stroke={moodColor} strokeWidth="2.8" strokeLinecap="round" fill="none" />

      {/* Soporte y base 3D */}
      <rect x="44" y="70" width="12" height="6" fill="#0369A1" />
      <rect x="34" y="76" width="32" height="6" rx="3" fill="#082F49" stroke="#38BDF8" strokeWidth="1.2" />
    </svg>
  );
};
