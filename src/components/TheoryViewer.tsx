import React from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Play
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

  return (
    <div style={{ padding: '20px 16px 120px 16px', maxWidth: '580px', margin: '0 auto', width: '100%' }}>
      {/* Barra superior de navegación */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <button
          onClick={() => {
            soundService.playToken();
            onBack();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#1E293B',
            fontSize: '0.9rem',
            fontWeight: 800,
            cursor: 'pointer',
            padding: '8px 14px',
            borderRadius: '14px',
            background: '#FFFFFF',
            border: '2px solid var(--border-color)',
            boxShadow: '0 3px 0 var(--border-shadow)',
            transition: 'all 0.15s ease'
          }}
        >
          <ArrowLeft size={18} />
          <span>Volver al índice</span>
        </button>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#EFF6FF',
            color: '#0284C7',
            border: '1.5px solid #BAE6FD',
            padding: '6px 12px',
            borderRadius: '14px',
            fontSize: '0.82rem',
            fontWeight: 800
          }}
        >
          <Clock size={15} />
          <span>{theory.estimatedMinutes} min de lectura</span>
        </div>
      </div>

      {/* Encabezado Principal */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ color: 'var(--orange-main)', fontSize: '0.82rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Unidad {theory.unitId} • Lección {theory.levelId} ({theory.pathId.toUpperCase()})
        </div>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 900, margin: '6px 0 8px 0', lineHeight: 1.25, color: '#0F172A' }}>
          {theory.title}
        </h1>
        <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
          {theory.subtitle}
        </p>
      </div>

      {/* Secciones de Contenido */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {theory.sections.map((section, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              border: '2px solid var(--border-color)',
              borderRadius: '20px',
              padding: '22px',
              boxShadow: '0 5px 0 var(--border-shadow)'
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0284C7', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7' }} />
              <span>{section.title}</span>
            </h2>

            <p style={{ color: '#1E293B', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '16px', whiteSpace: 'pre-line' }}>
              {section.explanation}
            </p>

            {/* Bloque de Código de Ejemplo estilo Visual Studio Code */}
            {section.codeSnippet && (
              <VSCodeSnippet
                code={section.codeSnippet}
                language={(section.codeLanguage || theory.pathId) as 'kotlin' | 'sql'}
                filename={theory.pathId === 'sql' ? `consulta_u0${theory.unitId}_l0${theory.levelId}.sql` : `modulo_u0${theory.unitId}_l0${theory.levelId}.kt`}
              />
            )}

            {/* Puntos Clave para Memorizar */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <div
                style={{
                  background: '#F0FDF4',
                  border: '2px solid #BBF7D0',
                  boxShadow: '0 3px 0 #DCFCE7',
                  borderRadius: '16px',
                  padding: '16px',
                  marginTop: '16px'
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {section.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: '#16A34A', fontWeight: 900, fontSize: '0.9rem', lineHeight: 1.3 }}>•</span>
                      <span style={{ fontSize: '0.9rem', color: '#14532D', fontWeight: 600, lineHeight: 1.45 }}>
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

      {/* Botón Flotante Inferior: PONER A PRUEBA */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '520px',
          zIndex: 50
        }}
      >
        <button
          className="btn-3d btn-green"
          onClick={() => {
            soundService.playToken();
            onStartPractice(theory.lessonId);
          }}
          style={{ width: '100%', fontSize: '1.08rem', padding: '16px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
        >
          <Play size={20} fill="#FFFFFF" />
          <span>PONER A PRUEBA</span>
        </button>
      </div>
    </div>
  );
};
