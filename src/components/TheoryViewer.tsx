import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Play,
  BookOpen,
  Sparkles,
  ArrowUp
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
  const badgeBg = isKotlin ? '#E0F2FE' : '#EEF2FF';

  return (
    <div style={{ padding: '4px 10px 60px 10px', maxWidth: '680px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
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
            border: '2px solid #CBD5E1',
            boxShadow: '0 3px 0 #94A3B8',
            transition: 'all 0.15s ease'
          }}
          title="Regresar a la lista de temas"
        >
          <ArrowLeft size={18} strokeWidth={2.8} />
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
              border: `1.5px solid ${isKotlin ? '#BAE6FD' : '#C7D2FE'}`,
              padding: '8px 14px',
              borderRadius: '14px',
              fontSize: '0.84rem',
              fontWeight: 900
            }}
          >
            <Clock size={15} strokeWidth={2.5} />
            <span>{theory.estimatedMinutes} min de lectura</span>
          </div>
        </div>
      </div>

      {/* ═══ TARJETA HERO: TÍTULO Y DESCRIPCIÓN ESTILO GUÍA DUOLINGO ═══ */}
      <div
        style={{
          background: '#FFFFFF',
          border: '2px solid #CBD5E1',
          borderRadius: '24px',
          padding: '24px 22px',
          marginBottom: '22px',
          boxShadow: '0 5px 0 #94A3B8',
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
                Guía Curricular • Unidad {theory.unitId} • Lección {theory.levelId}
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
                color: '#1E293B',
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

      {/* ═══ SECCIONES DE CONTENIDO DE LA LECCIÓN ═══ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '28px' }}>
        {theory.sections.map((section, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              border: '2px solid #CBD5E1',
              borderRadius: '22px',
              padding: '24px 22px',
              boxShadow: '0 4px 0 #94A3B8'
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

            {/* Texto de explicación con alto contraste y nitidez absoluta (Nunito 600, #0F172A) */}
            <p
              style={{
                color: '#0F172A',
                fontSize: '1.02rem',
                lineHeight: 1.75,
                marginBottom: '18px',
                whiteSpace: 'pre-line',
                fontWeight: 600
              }}
            >
              {section.explanation}
            </p>

            {/* Bloque de Código de Ejemplo estilo VS Code */}
            {section.codeSnippet && (
              <div style={{ margin: '18px 0' }}>
                <VSCodeSnippet
                  code={section.codeSnippet}
                  language={(section.codeLanguage || theory.pathId) as 'kotlin' | 'sql'}
                  filename={
                    theory.pathId === 'sql'
                      ? `consulta_u0${theory.unitId}_l0${theory.levelId}.sql`
                      : `modulo_u0${theory.unitId}_l0${theory.levelId}.kt`
                  }
                />
              </div>
            )}

            {/* Puntos Clave para Memorizar - Verde Esmeralda Vibrante */}
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
                  <span>Puntos Clave</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {section.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: '#16A34A', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1.2 }}>•</span>
                      <span style={{ fontSize: '0.96rem', color: '#14532D', fontWeight: 700, lineHeight: 1.5 }}>
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

      {/* ═══ ACCIÓN FINAL: BOTÓN PONER A PRUEBA (EN FLUJO NATURAL, SIN BLUR QUE TAPE NADA) ═══ */}
      <div
        style={{
          background: '#FFFFFF',
          border: '2px solid #CBD5E1',
          borderRadius: '22px',
          padding: '20px',
          boxShadow: '0 4px 0 #94A3B8',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A' }}>
          ¿Listo para demostrar lo aprendido?
        </div>
        <div style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>
          Pon a prueba tus conocimientos con ejercicios interactivos y gana experiencia.
        </div>

        <button
          className="btn-3d btn-green"
          onClick={() => {
            soundService.playToken();
            onStartPractice(theory.lessonId);
          }}
          style={{
            width: '100%',
            maxWidth: '440px',
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
          <span>Volver al inicio de la materia</span>
        </button>
      </div>
    </div>
  );
};
