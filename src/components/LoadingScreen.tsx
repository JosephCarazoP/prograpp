import React, { useEffect, useMemo, useRef, useState } from 'react';
import byteAppIconImg from '../assets/byte-app-icon.png';

interface LoadingScreenProps {
  /** Indica que los datos de arranque (sesión, perfil, progreso) ya están listos */
  isReady: boolean;
  /** Duración mínima visible de la animación de entrada (ms) */
  minDurationMs?: number;
  /** Se invoca cuando termina la animación de salida */
  onFinish?: () => void;
  /** Texto opcional (se usa como primer mensaje de estado) */
  title?: string;
}

const STATUS_MESSAGES = [
  'Encendiendo a Byte...',
  'Compilando lecciones...',
  'Sincronizando tu progreso...',
  'Preparando tu racha...',
  '¡Casi listo!'
];

const CODE_GLYPHS = ['</>', '{ }', '=>', ';', '( )', 'if', 'fun', '[ ]', '&&', 'SQL'];
const WORD_PROGRA = 'progra'.split('');
const WORD_APP = 'app'.split('');
const EXIT_DURATION_MS = 700;

// Pseudo-aleatorio determinista para que las partículas no "salten" entre renders
const seeded = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isReady,
  minDurationMs = 2600,
  onFinish,
  title
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;
  const isReadyRef = useRef(isReady);
  isReadyRef.current = isReady;

  const messages = useMemo(
    () => (title ? [title, ...STATUS_MESSAGES.slice(1)] : STATUS_MESSAGES),
    [title]
  );

  // Partículas de píxeles (como las del ícono) y glifos de código flotantes
  const pixels = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: seeded(i + 1) * 100,
        size: 6 + Math.round(seeded(i + 31) * 10),
        delay: seeded(i + 61) * 6,
        duration: 6 + seeded(i + 91) * 6,
        opacity: 0.25 + seeded(i + 121) * 0.55
      })),
    []
  );

  const glyphs = useMemo(
    () =>
      CODE_GLYPHS.map((text, i) => ({
        text,
        left: 6 + seeded(i + 200) * 88,
        delay: seeded(i + 230) * 7,
        duration: 9 + seeded(i + 260) * 6,
        size: 0.8 + seeded(i + 290) * 0.7
      })),
    []
  );

  // Bloquear scroll del fondo mientras la pantalla de carga está visible
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Rotación de mensajes de estado
  useEffect(() => {
    const id = setInterval(() => {
      setStatusIndex((i) => (i + 1 < messages.length ? i + 1 : i));
    }, Math.max(520, minDurationMs / messages.length));
    return () => clearInterval(id);
  }, [messages.length, minDurationMs]);

  // Motor de progreso: avanza suave hasta 90% y solo completa cuando los datos están listos
  useEffect(() => {
    const start = performance.now();
    let current = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    const id = setInterval(() => {
      const elapsed = performance.now() - start;
      const timeFrac = Math.min(1, elapsed / minDurationMs);
      const ready = isReadyRef.current;
      const target = ready
        ? timeFrac >= 1 ? 100 : Math.max(timeFrac * 100, 60)
        : Math.min(90, timeFrac * 100);

      current = Math.min(target, current + Math.max(0.35, (target - current) * 0.1));
      setProgress(current);

      if (ready && elapsed >= minDurationMs && current >= 99.5) {
        clearInterval(id);
        setProgress(100);
        setStatusIndex(messages.length - 1);
        setIsExiting(true);
        exitTimer = setTimeout(() => onFinishRef.current?.(), EXIT_DURATION_MS);
      }
    }, 30);

    return () => {
      clearInterval(id);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, [minDurationMs, messages.length]);

  const shown = Math.round(progress);

  return (
    <div
      className={`splash-root ${isExiting ? 'splash-exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Cargando PrograApp ${shown}%`}
    >
      {/* Fondo: cuadrícula de píxeles en movimiento */}
      <div className="splash-grid" aria-hidden="true" />
      <div className="splash-vignette" aria-hidden="true" />

      {/* Partículas pixeladas ascendentes */}
      <div className="splash-particles" aria-hidden="true">
        {pixels.map((p, i) => (
          <span
            key={`px-${i}`}
            className="splash-pixel"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity
            }}
          />
        ))}
        {glyphs.map((g, i) => (
          <span
            key={`gl-${i}`}
            className="splash-glyph"
            style={{
              left: `${g.left}%`,
              animationDelay: `${g.delay}s`,
              animationDuration: `${g.duration}s`,
              fontSize: `${g.size}rem`
            }}
          >
            {g.text}
          </span>
        ))}
      </div>

      <div className="splash-content">
        {/* ═══ ÍCONO DE BYTE CON ANILLOS, ÓRBITA Y PARPADEO ═══ */}
        <div className="splash-stage">
          <span className="splash-ring splash-ring-1" aria-hidden="true" />
          <span className="splash-ring splash-ring-2" aria-hidden="true" />
          <span className="splash-ring splash-ring-3" aria-hidden="true" />

          <div className="splash-orbit" aria-hidden="true">
            <span className="splash-orbit-dot dot-a" />
            <span className="splash-orbit-dot dot-b" />
            <span className="splash-orbit-dot dot-c" />
          </div>

          <div className="splash-icon-float">
            <div className="splash-icon">
              <img src={byteAppIconImg} alt="" draggable={false} />
              {/* Párpados para el parpadeo */}
              <span className="splash-lid lid-left" aria-hidden="true" />
              <span className="splash-lid lid-right" aria-hidden="true" />
              {/* Destello de brillo */}
              <span className="splash-shine" aria-hidden="true" />
            </div>
          </div>

          <span className="splash-shadow" aria-hidden="true" />
        </div>

        {/* ═══ WORDMARK ANIMADO ═══ */}
        <h1 className="splash-wordmark" aria-label="PrograApp">
          {WORD_PROGRA.map((ch, i) => (
            <span key={`p-${i}`} className="splash-letter" style={{ animationDelay: `${0.55 + i * 0.05}s` }}>
              {ch}
            </span>
          ))}
          {WORD_APP.map((ch, i) => (
            <span
              key={`a-${i}`}
              className="splash-letter accent"
              style={{ animationDelay: `${0.55 + (WORD_PROGRA.length + i) * 0.05}s` }}
            >
              {ch}
            </span>
          ))}
        </h1>
        <div className="splash-tag">DEV ACADEMY</div>

        {/* ═══ BARRA DE PROGRESO NEO-BRUTALIST ═══ */}
        <div className="splash-progress-wrap">
          <div className="splash-progress-track">
            <div className="splash-progress-fill" style={{ width: `${Math.max(4, progress)}%` }}>
              <span className="splash-progress-stripes" />
            </div>
          </div>
          <div className="splash-progress-meta">
            <span key={statusIndex} className="splash-status">
              {messages[statusIndex]}
            </span>
            <span className="splash-percent">{shown}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
