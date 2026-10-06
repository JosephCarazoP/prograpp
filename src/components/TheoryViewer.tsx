import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Play,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { TheoryLesson } from '../types/theory';
import { soundService } from '../services/soundService';
import { VSCodeSnippet } from './VSCodeSnippet';

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
    <div style={{ padding: '8px 12px 60px 12px', maxWidth: '640px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Barra superior de navegación */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingTop: '6px'
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
            fontSize: '0.88rem',
            fontWeight: 800,
            cursor: 'pointer',
            padding: '9px 16px',
            borderRadius: '14px',
            background: '#FFFFFF',
            border: '2px solid #CBD5E1',
            boxShadow: '0 3px 0 #94A3B8',
            transition: 'all 0.15s ease'
          }}
          title="Regresar a la lista de lecciones"
        >
          <ArrowLeft size={18} />
          <span>Volver al índice</span>
        </button>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: badgeBg,
            color: accentColor,
            border: `1.5px solid ${isKotlin ? '#BAE6FD' : '#C7D2FE'}`,
            padding: '6px 14px',
            borderRadius: '14px',
            fontSize: '0.82rem',
            fontWeight: 800
          }}
        >
          <Clock size={15} />
          <span>{theory.estimatedMinutes} min de lectura</span>
        </div>
      </div>

      {/* Encabezado Principal de la Lección */}
      <div
        style={{
          background: '#FFFFFF',
          border: '2px solid #E2E8F0',
          borderRadius: '22px',
          padding: '24px 20px',
          marginBottom: '22px',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.05), 0 3px 0 #CBD5E1'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '8px' }}>
          <span
            style={{
              background: isKotlin ? 'rgba(2, 132, 199, 0.1)' : 'rgba(79, 70, 229, 0.1)',
              color: accentColor,
              fontSize: '0.76rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              padding: '4px 10px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <BookOpen size={13} />
            Unidad {theory.unitId} • Lección {theory.levelId} ({theory.pathId.toUpperCase()})
          </span>
        </div>

        <h1 style={{ fontSize: '1.65rem', fontWeight: 900, margin: '6px 0 8px 0', lineHeight: 1.25, color: '#0F172A' }}>
          {theory.title}
        </h1>
        <p style={{ color: '#334155', fontSize: '0.98rem', lineHeight: 1.55, margin: 0, fontWeight: 600 }}>
          {theory.subtitle}
        </p>
      </div>

      {/* Secciones de Contenido de la Lección */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '32px' }}>
        {theory.sections.map((section, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              border: '2px solid #E2E8F0',
              borderRadius: '22px',
              padding: '24px 22px',
              boxShadow: '0 6px 18px rgba(15, 23, 42, 0.05), 0 3px 0 #CBD5E1'
            }}
          >
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                color: accentColor,
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

            {/* Texto de explicación con alto contraste y legibilidad óptima */}
            <p
              style={{
                color: '#0F172A',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '18px',
                whiteSpace: 'pre-line',
                fontWeight: 500
              }}
            >
              {section.explanation}
            </p>

            {/* Bloque de Código de Ejemplo estilo VS Code */}
            {section.codeSnippet && (
              <div style={{ margin: '16px 0' }}>
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

            {/* Puntos Clave para Memorizar */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <div
                style={{
                  background: '#F0FDF4',
                  border: '2px solid #86EFAC',
                  boxShadow: '0 3px 0 #BBF7D0',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  marginTop: '18px'
                }}
              >
                <div
                  style={{
                    fontSize: '0.82rem',
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
                  <CheckCircle2 size={16} color="#16A34A" />
                  <span>Puntos Clave</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {section.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: '#16A34A', fontWeight: 900, fontSize: '1rem', lineHeight: 1.2 }}>•</span>
                      <span style={{ fontSize: '0.92rem', color: '#14532D', fontWeight: 700, lineHeight: 1.5 }}>
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

      {/* Dock Inferior: Botón PONER A PRUEBA */}
      <div
        style={{
          position: 'sticky',
          bottom: '16px',
          zIndex: 40,
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid #E2E8F0',
          borderRadius: '20px',
          padding: '12px 16px',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.15), 0 3px 0 #CBD5E1'
        }}
      >
        <button
          className="btn-3d btn-green"
          onClick={() => {
            soundService.playToken();
            onStartPractice(theory.lessonId);
          }}
          style={{
            width: '100%',
            fontSize: '1.05rem',
            padding: '14px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            borderRadius: '16px'
          }}
        >
          <Play size={20} fill="#FFFFFF" />
          <span>PONER A PRUEBA LA LECCIÓN</span>
          <Sparkles size={18} />
        </button>
      </div>
    </div>
  );
};
