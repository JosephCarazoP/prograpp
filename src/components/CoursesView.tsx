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

  const isKotlin = currentPath === 'kotlin';
  const pathThemeColor = isKotlin ? '#0284C7' : '#4F46E5';
  const pathDarkColor = isKotlin ? '#0369A1' : '#3730A3';
  const pathGradient = isKotlin
    ? 'linear-gradient(145deg, #0284C7 0%, #0EA5E9 55%, #38BDF8 100%)'
    : 'linear-gradient(145deg, #4338CA 0%, #6366F1 55%, #818CF8 100%)';

  // Calcular progreso de la unidad activa
  const totalUnitLessons = activeUnit?.lessons?.length || 0;
  const completedUnitLessons = (activeUnit?.lessons || []).filter(l => {
    const prog = progress[l.id];
    return !!prog && (prog.starsEarned || 0) > 0;
  }).length;
  const unitProgressPercent = totalUnitLessons > 0 ? Math.round((completedUnitLessons / totalUnitLessons) * 100) : 0;

  return (
    <div style={{ padding: '8px 12px 100px 12px', maxWidth: '640px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* ═══ BANNER HERO DUOLINGO 3D ═══ */}
      <div
        style={{
          background: pathGradient,
          border: '2px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '24px',
          padding: '22px 24px',
          marginBottom: '20px',
          boxShadow: `0 6px 0 ${pathDarkColor}, 0 12px 24px rgba(15, 23, 42, 0.12)`,
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Brillo decorativo superior 3D */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '35%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)',
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
              background: 'rgba(0, 0, 0, 0.22)',
              padding: '5px 14px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              marginBottom: '10px'
            }}
          >
            <GraduationCap size={16} />
            <span>Biblioteca de Aprendizaje • {currentPath.toUpperCase()}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: '1.55rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: '0 0 6px 0',
                  lineHeight: 1.25,
                  textShadow: '0 2px 4px rgba(0,0,0,0.18)'
                }}
              >
                Guía Curricular & Materia
              </h1>
              <p
                style={{
                  color: '#F0F9FF',
                  fontSize: '0.94rem',
                  lineHeight: 1.45,
                  margin: 0,
                  fontWeight: 600,
                  opacity: 0.96
                }}
              >
                Domina la teoría curricular paso a paso con código conceptual antes de ponerla a prueba en los retos.
              </p>
            </div>

            {/* Icono 3D de estudio */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: '#FFFFFF',
                boxShadow: '0 4px 0 rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: pathThemeColor,
                flexShrink: 0
              }}
            >
              <BookOpen size={26} strokeWidth={2.4} />
            </div>
          </div>

          {/* Mini Barra de Progreso de la Unidad */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                flex: 1,
                height: '10px',
                background: 'rgba(0, 0, 0, 0.25)',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${unitProgressPercent}%`,
                  height: '100%',
                  background: '#22C55E',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 0 #15803D',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
            <span style={{ color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 900 }}>
              {completedUnitLessons}/{totalUnitLessons} Lecciones
            </span>
          </div>
        </div>
      </div>

      {/* ═══ BUSCADOR DE CONCEPTOS ESTILO DUOLINGO ═══ */}
      <div style={{ position: 'relative', marginBottom: '18px' }}>
        <Search
          size={18}
          color="#0F172A"
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="Buscar tema, concepto, bucle o función..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '13px 16px 13px 44px',
            background: '#FFFFFF',
            border: '2px solid #CBD5E1',
            boxShadow: '0 3px 0 #94A3B8',
            borderRadius: '18px',
            color: '#0F172A',
            fontSize: '0.94rem',
            fontWeight: 700,
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            transition: 'border-color 0.15s ease'
          }}
        />
      </div>

      {/* ═══ PESTAÑAS DE UNIDADES TÁCTILES DUOLINGO ═══ */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '16px' }}>
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
                padding: '10px 18px',
                borderRadius: '16px',
                background: isSelected ? pathThemeColor : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#0F172A',
                border: '2px solid',
                borderColor: isSelected ? pathDarkColor : '#CBD5E1',
                fontSize: '0.92rem',
                fontWeight: 900,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isSelected ? `0 4px 0 ${pathDarkColor}` : '0 4px 0 #94A3B8',
                transition: 'all 0.12s ease'
              }}
            >
              {currentPath === 'kotlin' ? <Code2 size={17} strokeWidth={2.4} /> : <Database size={17} strokeWidth={2.4} />}
              <span>Unidad {unit.id}</span>
            </button>
          );
        })}
      </div>

      {/* ═══ TARJETA DE RESUMEN DE LA UNIDAD ACTIVA ═══ */}
      <div
        style={{
          background: '#FFFFFF',
          border: '2px solid #CBD5E1',
          boxShadow: '0 4px 0 #94A3B8',
          borderRadius: '20px',
          padding: '18px 20px',
          marginBottom: '18px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
            {activeUnit?.title}
          </h2>
          <span
            style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#0F172A',
              padding: '3px 10px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 900
            }}
          >
            Nivel {activeUnit?.id}
          </span>
        </div>
        <p style={{ color: '#1E293B', fontSize: '0.94rem', margin: 0, lineHeight: 1.5, fontWeight: 600 }}>
          {activeUnit?.description}
        </p>
      </div>

      {/* ═══ LISTA DE LECCIONES TEÓRICAS Y PRÁCTICAS DUOLINGO 3D ═══ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                borderRadius: '22px',
                padding: '18px 20px',
                boxShadow: '0 4px 0 #94A3B8',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '14px',
                      background: isCompleted ? '#22C55E' : '#EFF6FF',
                      border: `2px solid ${isCompleted ? '#16A34A' : '#93C5FD'}`,
                      boxShadow: `0 3px 0 ${isCompleted ? '#15803D' : '#60A5FA'}`,
                      color: isCompleted ? '#FFFFFF' : '#0284C7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '1rem',
                      flexShrink: 0
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={24} color="#FFFFFF" strokeWidth={2.5} /> : idx + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                      {lesson.title}
                    </h3>
                    <p style={{ color: '#1E293B', fontSize: '0.9rem', margin: 0, lineHeight: 1.45, fontWeight: 600 }}>
                      {th?.subtitle || 'Fundamentos explicados paso a paso con código de ejemplo.'}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#0F172A',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    background: '#F1F5F9',
                    border: '1.5px solid #CBD5E1',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    flexShrink: 0
                  }}
                >
                  <Clock size={14} color="#0284C7" strokeWidth={2.5} />
                  <span>{th?.estimatedMinutes || 3} min</span>
                </div>
              </div>

              {/* Botones de Acción Táctiles 3D Estilo Duolingo */}
              <div style={{ display: 'flex', gap: '12px', paddingTop: '4px' }}>
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
                            keyPoints: ['Secuencia lógica', 'Buenas prácticas', 'Compilación limpia']
                          }
                        ]
                      });
                    }
                  }}
                  className="btn-3d btn-blue"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    borderRadius: '16px'
                  }}
                >
                  <BookOpen size={18} strokeWidth={2.5} />
                  <span>Leer Materia</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playToken();
                    onSelectPractice(lesson.id);
                  }}
                  className="btn-3d btn-green"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    borderRadius: '16px'
                  }}
                >
                  <Play size={18} fill="#FFFFFF" />
                  <span>Practicar Reto</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
