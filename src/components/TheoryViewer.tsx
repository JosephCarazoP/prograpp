import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Play,
  BookOpen,
  Sparkles,
  ArrowUp,
  Lightbulb,
  Terminal,
  AlertTriangle,
  ExternalLink,
  Info
} from 'lucide-react';
import { TheoryLesson } from '../types/theory';
import { soundService } from '../services/soundService';
import { VSCodeSnippet } from './VSCodeSnippet';
import { ConsoleDevAvatar } from './ConsoleAvatar';

interface TheoryViewerProps {
  theory: TheoryLesson;
  onBack: () => void;
  onStartPractice: (lessonId: string) => void;
}

export const TheoryViewer: React.FC<TheoryViewerProps> = ({
  theory,
  onBack,
  onStartPractice
}) => {
  // Asegurar que al abrir la lección el scroll comience siempre en el inicio superior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [theory.lessonId]);

  const isKotlin = theory.pathId === 'kotlin';
  const accentColor = isKotlin ? '#0284C7' : '#4F46E5';
  const accentDark = isKotlin ? '#0369A1' : '#3730A3';
  const badgeBg = isKotlin ? '#E0F2FE' : '#EEF2FF';

  return (
    <div style={{ padding: '4px 12px 70px 12px', maxWidth: '720px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* ═══ BARRA SUPERIOR DE NAVEGACIÓN DEDICADA ═══ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          padding: '6px 0',
          gap: '10px',
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={() => {
            soundService.playToken();
            onBack();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#0F172A',
            fontSize: '0.92rem',
            fontWeight: 800,
            cursor: 'pointer',
            padding: '10px 18px',
            borderRadius: '14px',
            background: '#FFFFFF',
            border: `2px solid ${isKotlin ? '#38BDF8' : '#818CF8'}`,
            boxShadow: `0 3px 0 ${isKotlin ? '#0284C7' : '#4F46E5'}`,
            transition: 'all 0.15s ease'
          }}
          title="Regresar a la biblioteca de lecciones"
        >
          <ArrowLeft size={18} strokeWidth={2.8} color={accentColor} />
          <span>Volver a Cursos</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: badgeBg,
              color: accentColor,
              border: `2px solid ${isKotlin ? '#38BDF8' : '#818CF8'}`,
              boxShadow: `0 2px 0 ${isKotlin ? '#0284C7' : '#4F46E5'}`,
              padding: '8px 14px',
              borderRadius: '14px',
              fontSize: '0.84rem',
              fontWeight: 900
            }}
          >
            <Clock size={15} strokeWidth={2.5} />
            <span>{theory.estimatedMinutes} min de lectura guiada</span>
          </div>
        </div>
      </div>

      {/* ═══ TARJETA HERO: TÍTULO Y DESCRIPCIÓN ═══ */}
      <div
        style={{
          background: '#FFFFFF',
          border: `2.5px solid ${accentColor}`,
          borderRadius: '24px',
          padding: '24px 22px',
          marginBottom: '22px',
          boxShadow: `0 6px 0 ${accentDark}, 0 10px 24px rgba(15, 23, 42, 0.08)`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '10px' }}>
              <span
                style={{
                  background: isKotlin ? '#E0F2FE' : '#EEF2FF',
                  color: accentColor,
                  border: `1.5px solid ${isKotlin ? '#BAE6FD' : '#C7D2FE'}`,
                  fontSize: '0.78rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  padding: '4px 12px',
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <BookOpen size={14} strokeWidth={2.5} />
                Curso Oficial • Unidad {theory.unitId} • Lección {theory.levelId}
              </span>
            </div>

            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                margin: '8px 0 10px 0',
                lineHeight: 1.25,
                color: '#0F172A',
                letterSpacing: '-0.3px'
              }}
            >
              {theory.title}
            </h1>

            <p
              style={{
                color: '#334155',
                fontSize: '1.05rem',
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 700
              }}
            >
              {theory.subtitle}
            </p>
          </div>

          <div style={{ flexShrink: 0, marginTop: '4px' }}>
            <ConsoleDevAvatar size={62} mood="happy" />
          </div>
        </div>
      </div>

      {/* ═══ ANALOGÍA INTUITIVA DEL MUNDO REAL (Para entender a la primera) ═══ */}
      {theory.analogy && (
        <div
          style={{
            background: 'linear-gradient(145deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '2px solid #FCD34D',
            borderLeft: '7px solid #F59E0B',
            borderRadius: '20px',
            padding: '20px 22px',
            marginBottom: '24px',
            boxShadow: '0 4px 0 #D97706, 0 8px 18px rgba(217, 119, 6, 0.09)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#B45309',
              fontWeight: 900,
              fontSize: '0.84rem',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              marginBottom: '8px'
            }}
          >
            <Lightbulb size={19} strokeWidth={2.8} />
            <span>Analogía del Mundo Real</span>
          </div>
          <p
            style={{
              margin: 0,
              color: '#78350F',
              fontSize: '1.02rem',
              lineHeight: 1.65,
              fontWeight: 700
            }}
          >
            {theory.analogy}
          </p>
        </div>
      )}

      {/* ═══ VIDEO EXPLICATIVO RECOMENDADO (Si existe en la lección) ═══ */}
      {theory.video && (
        <div
          style={{
            background: '#FFFFFF',
            border: '2.5px solid #EF4444',
            borderTop: '6px solid #DC2626',
            borderRadius: '22px',
            padding: '22px',
            marginBottom: '26px',
            boxShadow: '0 6px 0 #991B1B, 0 10px 22px rgba(220, 38, 38, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#FEE2E2',
                  border: '1.5px solid #FECACA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#DC2626">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block' }}>
                  Video Explicativo Recomendado
                </span>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.3 }}>
                  {theory.video.title}
                </h3>
              </div>
            </div>
            {theory.video.duration && (
              <span
                style={{
                  background: '#F1F5F9',
                  border: '1.5px solid #CBD5E1',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.76rem',
                  fontWeight: 900,
                  color: '#475569',
                  flexShrink: 0
                }}
              >
                {theory.video.duration}
              </span>
            )}
          </div>

          <p style={{ color: '#334155', fontSize: '0.96rem', lineHeight: 1.6, margin: '0 0 16px 0', fontWeight: 600 }}>
            {theory.video.summary}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#64748B' }}>
              Canal: <strong style={{ color: '#0F172A' }}>{theory.video.channel}</strong>
            </span>
            <a
              href={theory.video.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#DC2626',
                color: '#FFFFFF',
                border: '2px solid #B91C1C',
                boxShadow: '0 3px 0 #7F1D1D',
                padding: '9px 18px',
                borderRadius: '14px',
                fontSize: '0.88rem',
                fontWeight: 900,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Abrir video en nueva pestaña"
            >
              <Play size={16} fill="#FFFFFF" />
              <span>Ver Video en YouTube</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}

      {/* ═══ SECCIONES DE CONTENIDO DE LA LECCIÓN ═══ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', marginBottom: '30px' }}>
        {theory.sections.map((section, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              border: `2.5px solid ${isKotlin ? '#38BDF8' : '#818CF8'}`,
              borderTop: `6px solid ${accentColor}`,
              borderRadius: '22px',
              padding: '24px 22px',
              boxShadow: `0 6px 0 ${accentDark}, 0 8px 20px rgba(15, 23, 42, 0.05)`,
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  background: badgeBg,
                  color: accentColor,
                  border: `1.5px solid ${isKotlin ? '#BAE6FD' : '#C7D2FE'}`,
                  fontSize: '0.74rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  padding: '3px 10px',
                  borderRadius: '8px'
                }}
              >
                Parte {idx + 1}
              </span>
            </div>

            <h2
              style={{
                fontSize: '1.3rem',
                fontWeight: 900,
                color: '#0F172A',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                lineHeight: 1.3
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: accentColor,
                  flexShrink: 0
                }}
              />
              <span>{section.title}</span>
            </h2>

            {/* Texto de explicación con alto contraste y nitidez absoluta */}
            <p
              style={{
                color: '#0F172A',
                fontSize: '1.02rem',
                lineHeight: 1.8,
                marginBottom: '18px',
                whiteSpace: 'pre-line',
                fontWeight: 600
              }}
            >
              {section.explanation}
            </p>

            {/* Bloque de Código de Ejemplo estilo VS Code */}
            {section.codeSnippet && (
              <div style={{ margin: '18px 0 12px 0' }}>
                <VSCodeSnippet
                  code={section.codeSnippet}
                  language={(section.codeLanguage || theory.pathId) as 'kotlin' | 'sql'}
                  filename={
                    theory.pathId === 'sql'
                      ? `ejemplo_u0${theory.unitId}_l0${theory.levelId}_p${idx + 1}.sql`
                      : `ejemplo_u0${theory.unitId}_l0${theory.levelId}_p${idx + 1}.kt`
                  }
                />
              </div>
            )}

            {/* Salida en Consola / Resultado del Query */}
            {section.outputSnippet && (
              <div
                style={{
                  background: '#0F172A',
                  border: '2px solid #334155',
                  borderRadius: '14px',
                  padding: '14px 18px',
                  marginBottom: '18px',
                  fontFamily: 'var(--font-code, monospace)',
                  boxShadow: '0 3px 0 #020617'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#94A3B8',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}
                >
                  <Terminal size={14} color="#38BDF8" />
                  <span>{theory.pathId === 'sql' ? 'Resultado en Tabla (Output)' : 'Salida en Consola (Terminal)'}</span>
                </div>
                <pre
                  style={{
                    margin: 0,
                    color: '#38BDF8',
                    fontSize: '0.88rem',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.55,
                    fontWeight: 700
                  }}
                >
                  {section.outputSnippet}
                </pre>
              </div>
            )}

            {/* Tip Pro de Byte */}
            {section.byteTip && (
              <div
                style={{
                  background: '#F0F9FF',
                  border: '2px solid #BAE6FD',
                  borderLeft: '5px solid #0284C7',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  marginTop: '16px',
                  boxShadow: '0 2px 0 #7DD3FC'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#0369A1',
                    fontWeight: 900,
                    fontSize: '0.82rem',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                    letterSpacing: '0.5px'
                  }}
                >
                  <Info size={16} strokeWidth={2.8} />
                  <span>Tip de Ingeniero</span>
                </div>
                <p style={{ margin: 0, color: '#0C4A6E', fontSize: '0.94rem', lineHeight: 1.6, fontWeight: 700 }}>
                  {section.byteTip}
                </p>
              </div>
            )}

            {/* Trampa Común a Evitar */}
            {section.pitfallTip && (
              <div
                style={{
                  background: '#FEF2F2',
                  border: '2px solid #FECACA',
                  borderLeft: '5px solid #EF4444',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  marginTop: '14px',
                  boxShadow: '0 2px 0 #F87171'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#B91C1C',
                    fontWeight: 900,
                    fontSize: '0.82rem',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                    letterSpacing: '0.5px'
                  }}
                >
                  <AlertTriangle size={16} strokeWidth={2.8} />
                  <span>¡Cuidado! Error Común de Principiante</span>
                </div>
                <p style={{ margin: 0, color: '#991B1B', fontSize: '0.94rem', lineHeight: 1.6, fontWeight: 700 }}>
                  {section.pitfallTip}
                </p>
              </div>
            )}

            {/* Puntos Clave para Memorizar */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <div
                style={{
                  background: '#F0FDF4',
                  border: '2px solid #22C55E',
                  boxShadow: '0 3px 0 #16A34A',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  marginTop: '20px'
                }}
              >
                <div
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 900,
                    color: '#15803D',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                    letterSpacing: '0.6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <CheckCircle2 size={18} color="#16A34A" strokeWidth={2.5} />
                  <span>Conceptos Fundamentales para el Examen</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {section.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: '#16A34A', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1.2 }}>•</span>
                      <span style={{ fontSize: '0.96rem', color: '#14532D', fontWeight: 700, lineHeight: 1.55 }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ═══ ACCIÓN FINAL: BOTÓN PONER A PRUEBA ═══ */}
      <div
        style={{
          background: '#FFFFFF',
          border: '2.5px solid #22C55E',
          borderRadius: '22px',
          padding: '24px 20px',
          boxShadow: '0 6px 0 #16A34A, 0 10px 24px rgba(22, 163, 74, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A' }}>
          ¿Comprendiste la materia a la perfección?
        </div>
        <div style={{ fontSize: '0.94rem', color: '#334155', fontWeight: 600 }}>
          Demuestra tu dominio resolviendo los ejercicios prácticos interactivos de esta lección.
        </div>

        <button
          className="btn-3d btn-green"
          onClick={() => {
            soundService.playToken();
            onStartPractice(theory.lessonId);
          }}
          style={{
            width: '100%',
            maxWidth: '460px',
            fontSize: '1.1rem',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            borderRadius: '16px'
          }}
        >
          <Play size={22} fill="#FFFFFF" />
          <span>PONER A PRUEBA LA LECCIÓN</span>
          <Sparkles size={20} />
        </button>

        <button
          onClick={() => {
            soundService.playToken();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontSize: '0.85rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            marginTop: '4px'
          }}
        >
          <ArrowUp size={16} />
          <span>Volver al inicio de la lección</span>
        </button>
      </div>
    </div>
  );
};
