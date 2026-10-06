import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  Play,
  CheckCircle2,
  Code2,
  Database,
  GraduationCap
} from 'lucide-react';
import { Unit } from '../types/lesson';
import { TheoryLesson } from '../types/theory';
import { LessonProgress } from '../types/progress';
import { soundService } from '../services/soundService';

interface CoursesViewProps {
  units: Unit[];
  theories: Record<string, TheoryLesson>;
  progress: Record<string, LessonProgress>;
  currentPath: 'kotlin' | 'sql';
  onSelectTheory: (theory: TheoryLesson) => void;
  onSelectPractice: (lessonId: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  units,
  theories,
  progress,
  currentPath,
  onSelectTheory,
  onSelectPractice
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const activeUnit = units.find(u => u.id === selectedUnitId) || units[0];

  // Filtrar lecciones por búsqueda
  const filteredLessons = (activeUnit?.lessons || []).filter(lesson => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const th = theories[lesson.id];
    return (
      lesson.title.toLowerCase().includes(q) ||
      (th && (th.title.toLowerCase().includes(q) || th.subtitle.toLowerCase().includes(q)))
    );
  });

  return (
    <div style={{ padding: '16px 12px 100px 12px', maxWidth: '580px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* ═══ BANNER DUOLINGO 3D: APRENDE LOS FUNDAMENTOS (Vibrante, Saturado y con Volumen) ═══ */}
      <div
        style={{
          background: 'linear-gradient(145deg, #0284C7 0%, #0EA5E9 55%, #38BDF8 100%)',
          border: '2px solid rgba(255, 255, 255, 0.35)',
          borderRadius: '22px',
          padding: '20px 22px',
          marginBottom: '20px',
          boxShadow: '0 6px 0 #0369A1, 0 10px 20px rgba(2, 132, 199, 0.25)',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Brillo decorativo superior */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FEF08A',
              background: 'rgba(0, 0, 0, 0.18)',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              marginBottom: '8px'
            }}
          >
            <GraduationCap size={16} />
            <span>Biblioteca de Materia • {currentPath.toUpperCase()}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div>
              <h1
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: '0 0 6px 0',
                  lineHeight: 1.25,
                  textShadow: '0 2px 4px rgba(0,0,0,0.15)'
                }}
              >
                Aprende los Fundamentos
              </h1>
              <p
                style={{
                  color: '#F0F9FF',
                  fontSize: '0.9rem',
                  lineHeight: 1.45,
                  margin: 0,
                  opacity: 0.96
                }}
              >
                Domina la teoría curricular paso a paso con código conceptual antes de ponerla a prueba en el Camino.
              </p>
            </div>

            {/* Token de Icono 3D de estudio */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: '#FFFFFF',
                boxShadow: '0 4px 0 #BAE6FD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284C7',
                flexShrink: 0
              }}
            >
              <BookOpen size={24} strokeWidth={2.4} />
            </div>
          </div>
        </div>
      </div>

      {/* Buscador de Conceptos Estilo Duolingo */}
      <div
        style={{
          position: 'relative',
          marginBottom: '18px'
        }}
      >
        <Search
          size={18}
          color="#64748B"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="Buscar tema, concepto o función..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px 12px 42px',
            background: '#FFFFFF',
            border: '2px solid var(--border-color)',
            boxShadow: '0 3px 0 var(--border-shadow)',
            borderRadius: '16px',
            color: '#1E293B',
            fontSize: '0.92rem',
            fontWeight: 700,
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            transition: 'border-color 0.15s ease'
          }}
        />
      </div>

      {/* Pestañas de Unidades Tactiles */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
        {units.map((unit) => {
          const isSelected = unit.id === selectedUnitId;
          return (
            <button
              key={unit.id}
              onClick={() => {
                soundService.playToken();
                setSelectedUnitId(unit.id);
              }}
              style={{
                padding: '10px 16px',
                borderRadius: '14px',
                background: isSelected ? 'var(--orange-main)' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#1E293B',
                border: '2px solid',
                borderColor: isSelected ? 'var(--orange-dark)' : 'var(--border-color)',
                fontSize: '0.88rem',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isSelected ? '0 4px 0 var(--orange-dark)' : '0 4px 0 var(--border-shadow)',
                transition: 'all 0.15s ease'
              }}
            >
              {currentPath === 'kotlin' ? <Code2 size={16} /> : <Database size={16} />}
              <span>Unidad {unit.id}</span>
            </button>
          );
        })}
      </div>

      {/* Título de la Unidad Activa */}
      <div
        style={{
          background: '#FFFFFF',
          border: '2px solid #CBD5E1',
          boxShadow: '0 4px 0 #94A3B8',
          borderRadius: '18px',
          padding: '16px 18px',
          marginBottom: '16px'
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
          {activeUnit?.title}
        </h2>
        <p style={{ color: '#1E293B', fontSize: '0.92rem', margin: 0, lineHeight: 1.5, fontWeight: 600 }}>
          {activeUnit?.description}
        </p>
      </div>

      {/* Lista de Lecciones Teóricas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredLessons.map((lesson, idx) => {
          const prog = progress[lesson.id];
          const isCompleted = !!prog && (prog.starsEarned || 0) > 0;
          const th = theories[lesson.id];

          return (
            <div
              key={lesson.id}
              style={{
                background: '#FFFFFF',
                border: '2px solid #CBD5E1',
                borderRadius: '20px',
                padding: '18px',
                boxShadow: '0 4px 0 #94A3B8',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      background: isCompleted ? '#22C55E' : '#EFF6FF',
                      border: `2px solid ${isCompleted ? '#16A34A' : '#93C5FD'}`,
                      boxShadow: `0 2px 0 ${isCompleted ? '#15803D' : '#60A5FA'}`,
                      color: isCompleted ? '#FFFFFF' : '#0284C7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '0.92rem',
                      flexShrink: 0
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={20} color="#FFFFFF" /> : idx + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                      {lesson.title}
                    </h3>
                    <p style={{ color: '#1E293B', fontSize: '0.88rem', margin: 0, lineHeight: 1.45, fontWeight: 600 }}>
                      {th?.subtitle || 'Fundamentos explicados paso a paso con código de ejemplo.'}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#0F172A',
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    flexShrink: 0
                  }}
                >
                  <Clock size={13} color="#0284C7" />
                  <span>{th?.estimatedMinutes || 3} min</span>
                </div>
              </div>

              {/* Botones de Acción Táctiles 3D */}
              <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
                <button
                  onClick={() => {
                    soundService.playToken();
                    if (th) {
                      onSelectTheory(th);
                    } else {
                      onSelectTheory({
                        id: `th-${lesson.id}`,
                        lessonId: lesson.id,
                        pathId: currentPath,
                        unitId: activeUnit.id,
                        levelId: idx + 1,
                        title: lesson.title,
                        subtitle: 'Estudio de fundamentos y código conceptual.',
                        estimatedMinutes: 3,
                        sections: [
                          {
                            title: 'Concepto Clave',
                            explanation: 'En esta lección aprenderás los principios fundamentales de este tema.',
                            keyPoints: ['Secuencia ordenada', 'Buenas prácticas', 'Compilación limpia']
                          }
                        ]
                      });
                    }
                  }}
                  className="btn-3d btn-blue"
                  style={{ flex: 1, padding: '10px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <BookOpen size={16} />
                  <span>Leer Materia</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playToken();
                    onSelectPractice(lesson.id);
                  }}
                  className="btn-3d btn-orange"
                  style={{ flex: 1, padding: '10px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Play size={16} />
                  <span>Practicar Nivel</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
