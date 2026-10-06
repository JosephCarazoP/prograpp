import React from 'react';

/**
 * AnimatedDoodleBackground
 * Genera un fondo blanco con círculos grisáceos de estilo pintado/dibujado a mano y animación orgánica flotante,
 * emulando el estilo visual doodle y lúdico de Duolingo sin sobrecargar la pantalla (exactamente 7 elementos espaciados).
 */
export const AnimatedDoodleBackground: React.FC = () => {
  return (
    <div className="animated-doodle-bg" aria-hidden="true">
      {/* 1. Círculo Suave Pintado (Superior Izquierda - Extremo) */}
      <svg
        className="doodle-item doodle-1"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="70"
          cy="70"
          r="54"
          fill="#F8FAFC"
          stroke="#E2E8F0"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="8 5"
        />
        <path
          d="M28 64 C30 38, 52 24, 78 26 C104 28, 118 50, 114 74 C110 98, 92 116, 66 114 C38 112, 26 92, 28 64 Z"
          stroke="#CBD5E1"
          strokeWidth="1.8"
          fill="none"
          strokeOpacity="0.4"
        />
      </svg>

      {/* 2. Círculo Suave estilo Boceto (Superior Derecha - Extremo) */}
      <svg
        className="doodle-item doodle-2"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="36" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
        <path
          d="M22 50 A28 28 0 0 1 76 36 A28 28 0 0 1 70 70 A28 28 0 0 1 26 62"
          stroke="#CBD5E1"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.45"
        />
      </svg>

      {/* 3. Círculo Pintado Lateral Izquierdo */}
      <svg
        className="doodle-item doodle-4"
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="45" cy="45" r="32" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
        <path
          d="M24 45 C24 32, 36 22, 50 24 C64 26, 68 38, 64 52 C60 64, 46 68, 34 64"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
          fill="none"
        />
      </svg>

      {/* 4. Círculo Pintado Inferior Lateral Derecho */}
      <svg
        className="doodle-item doodle-5"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="70" cy="70" r="56" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2.5" />
        <path
          d="M30 66 C32 40, 54 26, 80 28 C106 30, 120 54, 116 80 C112 106, 92 122, 64 120 C38 118, 28 98, 30 66 Z"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 5"
          strokeOpacity="0.4"
          fill="none"
        />
      </svg>
    </div>
  );
};
