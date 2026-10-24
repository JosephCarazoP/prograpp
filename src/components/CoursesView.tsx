import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  Play,
  CheckCircle2,
  Code2,
  Database,
  GraduationCap,
  Lock,
  Zap,
  Layers
} from 'lucide-react';
import { Unit } from '../types/lesson';
import { TheoryLesson } from '../types/theory';
import { LessonProgress } from '../types/progress';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { progressionEngine } from '../services/progressionEngine';

interface CoursesViewProps {
  units: Unit[];
  theories: Record<string, TheoryLesson>;
  progress: Record<string, LessonProgress>;
  currentPath: 'kotlin' | 'sql';
  onSelectTheory: (theory: TheoryLesson) => void;
  onSelectPractice: (lessonId: string) => void;
  user?: UserProfile;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  units,
  theories,
  progress,
  currentPath,
  onSelectTheory,
  onSelectPractice,
  user
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
    <div className="courses-view-container" style={{ padding: '8px 12px 100px 12px', maxWidth: '100%', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* ═══ BANNER HERO NEO-BRUTALISM CON COLORES ORIGINALES ═══ */}
      <div style={{ position: 'relative', marginTop: '16px', marginBottom: '24px' }}>
        {/* Pestaña tipo folder sobresaliente superior */}
        <div
          style={{
            position: 'absolute',
            top: '-16px',
            left: '18px',
            background: '#FEF08A',
            border: '2.5px solid #000000',
            borderBottom: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '4px 14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.74rem',
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '0.6px',
            boxShadow: '2px -2px 0px #000000',
            zIndex: 2
          }}
        >
          <GraduationCap size={15} color="#000000" strokeWidth={2.6} />
          <span>BIBLIOTECA • {currentPath.toUpperCase()}</span>
        </div>

        <div
          style={{
            background: pathGradient,
            border: '3px solid #000000',
            borderRadius: '20px',
            padding: '24px 22px 20px 22px',
            boxShadow: '6px 6px 0px #000000',
            boxSizing: 'border-box',
            color: '#FFFFFF'
          }}
        >
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              color: '#FFFFFF',
              margin: '0 0 6px 0',
              lineHeight: 1.25,
              letterSpacing: '-0.3px',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Guía Curricular & Materia
          </h1>
          <p
            style={{
              color: '#F0F9FF',
              fontSize: '0.92rem',
              lineHeight: 1.45,
              margin: '0 0 16px 0',
              fontWeight: 600,
              opacity: 0.98
            }}
          >
            Domina la teoría curricular paso a paso con código conceptual antes de ponerla a prueba en los retos interactivos.
          </p>

          {/* Mini Barra de Progreso de la Unidad */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div
              style={{
                flex: 1,
                minWidth: '160px',
                height: '14px',
                background: 'rgba(0, 0, 0, 0.28)',
                border: '2px solid #000000',
                borderRadius: '9999px',
                overflow: 'hidden',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              <div
                style={{
                  width: `${unitProgressPercent}%`,
                  height: '100%',
                  background: '#22C55E',
                  borderRight: unitProgressPercent > 0 && unitProgressPercent < 100 ? '2px solid #000000' : 'none',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
            <span
              style={{
                background: 'rgba(0, 0, 0, 0.45)',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 900,
                padding: '3px 10px',
                borderRadius: '8px',
                letterSpacing: '0.2px',
                border: '1.5px solid #000000'
              }}
            >
              {completedUnitLessons}/{totalUnitLessons} Lecciones ({unitProgressPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* ═══ BUSCADOR DE CONCEPTOS NEO-BRUTALISM ═══ */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search
          size={18}
          color={pathThemeColor}
          strokeWidth={2.6}
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
            border: '2.5px solid #000000',
            boxShadow: '4px 4px 0px #000000',
            borderRadius: '14px',
            color: '#0F172A',
            fontSize: '0.94rem',
            fontWeight: 800,
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            transition: 'box-shadow 0.12s ease'
          }}
        />
      </div>

      {/* ═══ PESTAÑAS DE UNIDADES TÁCTILES CON COLORES ORIGINALES ═══ */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
        {units.map((unit) => {
          const isSelected = unit.id === selectedUnitId;
          return (
            <button
              key={unit.id}
              type="button"
              onClick={() => {
                soundService.playToken();
                setSelectedUnitId(unit.id);
              }}
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                background: isSelected ? pathThemeColor : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#0F172A',
                border: '2.5px solid #000000',
                fontSize: '0.92rem',
                fontWeight: 900,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isSelected ? '4px 4px 0px #000000' : '2.5px 2.5px 0px #000000',
                transition: 'all 0.08s ease'
              }}
            >
              {currentPath === 'kotlin' ? (
                <Code2 size={17} strokeWidth={2.6} color={isSelected ? '#FFFFFF' : pathThemeColor} />
              ) : (
                <Database size={17} strokeWidth={2.6} color={isSelected ? '#FFFFFF' : pathThemeColor} />
              )}
              <span>Unidad {unit.id}</span>
            </button>
          );
        })}
      </div>

      {/* ═══ TARJETA DE RESUMEN DE LA UNIDAD ACTIVA ═══ */}
      <div style={{ position: 'relative', marginTop: '14px', marginBottom: '24px' }}>
        {/* Pestaña tipo folder sobresaliente superior */}
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            left: '16px',
            background: pathThemeColor,
            border: '2px solid #000000',
            borderBottom: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '3px 12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.72rem',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '0.5px',
            boxShadow: '2px -2px 0px #000000',
            zIndex: 2
          }}
        >
          <Layers size={13} color="#FFFFFF" strokeWidth={2.5} />
          <span>UNIDAD {activeUnit?.id}</span>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            border: '2.5px solid #000000',
            boxShadow: '4px 4px 0px #000000',
            borderRadius: '18px',
            padding: '20px 22px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
              {activeUnit?.title}
            </h2>
            <span
              style={{
                background: isKotlin ? '#E0F2FE' : '#EEF2FF',
                color: pathThemeColor,
                border: '1.5px solid #000000',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '0.5px'
              }}
            >
              NIVEL {activeUnit?.id}
            </span>
          </div>
          <p style={{ color: '#334155', fontSize: '0.92rem', margin: 0, lineHeight: 1.5, fontWeight: 600 }}>
            {activeUnit?.description}
          </p>
        </div>
      </div>

      {/* ═══ LISTA DE LECCIONES TEÓRICAS Y PRÁCTICAS ═══ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredLessons.map((lesson, idx) => {
          const prog = progress[lesson.id];
          const isCompleted = !!prog && (prog.starsEarned || 0) > 0;
          const th = theories[lesson.id];

          const access = user
            ? progressionEngine.canAccessNode(lesson.id, activeUnit, user, progress)
            : { allowed: idx === 0 && activeUnit.id === 1 };
          const isUnlocked = access.allowed || isCompleted;

          return (
            <div
              key={lesson.id}
              style={{
                position: 'relative',
                marginTop: '12px'
              }}
            >
              {/* Pestaña tipo folder sobresaliente superior */}
              <div
                style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '16px',
                  background: isCompleted ? '#22C55E' : isUnlocked ? pathThemeColor : '#CBD5E1',
                  border: '2px solid #000000',
                  borderBottom: 'none',
                  borderRadius: '8px 8px 0 0',
                  padding: '3px 12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  color: isUnlocked || isCompleted ? '#FFFFFF' : '#475569',
                  letterSpacing: '0.5px',
                  boxShadow: '2px -2px 0px #000000',
                  zIndex: 2
                }}
              >
                <span>
                  LECCIÓN {idx + 1} • {isCompleted ? 'COMPLETADA' : isUnlocked ? 'DISPONIBLE' : 'BLOQUEADA'}
                </span>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  border: '2.5px solid #000000',
                  borderRadius: '18px',
                  padding: '20px',
                  boxShadow: '4px 4px 0px #000000',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxSizing: 'border-box',
                  opacity: isUnlocked || isCompleted ? 1 : 0.88
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: isCompleted ? '#22C55E' : isUnlocked ? (isKotlin ? '#EFF6FF' : '#EEF2FF') : '#F1F5F9',
                        border: '2px solid #000000',
                        boxShadow: '2.5px 2.5px 0px #000000',
                        color: isCompleted ? '#FFFFFF' : isUnlocked ? pathThemeColor : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: '1rem',
                        flexShrink: 0
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={24} color="#FFFFFF" strokeWidth={2.8} />
                      ) : isUnlocked ? (
                        idx + 1
                      ) : (
                        <Lock size={19} color="#64748B" strokeWidth={2.5} />
                      )}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', margin: 0, lineHeight: 1.3 }}>
                          {lesson.title}
                        </h3>

                        {prog?.theoryCompleted && (
                          <span
                            style={{
                              background: '#DCFCE7',
                              border: '1.5px solid #000000',
                              boxShadow: '1.5px 1.5px 0px #000000',
                              color: '#15803D',
                              fontSize: '0.72rem',
                              fontWeight: 900,
                              padding: '2px 8px',
                              borderRadius: '6px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <CheckCircle2 size={12} strokeWidth={2.8} color="#15803D" /> Teoría Aprobada
                          </span>
                        )}

                        {!isUnlocked && (
                          <span
                            style={{
                              background: '#F1F5F9',
                              border: '1.5px solid #000000',
                              boxShadow: '1.5px 1.5px 0px #000000',
                              color: '#64748B',
                              fontSize: '0.72rem',
                              fontWeight: 900,
                              padding: '2px 8px',
                              borderRadius: '6px'
                            }}
                          >
                            Bloqueado
                          </span>
                        )}

                        {th?.video && (
                          <span
                            style={{
                              background: '#FEE2E2',
                              border: '1.5px solid #000000',
                              boxShadow: '1.5px 1.5px 0px #000000',
                              color: '#DC2626',
                              fontSize: '0.72rem',
                              fontWeight: 900,
                              padding: '2px 8px',
                              borderRadius: '6px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Play size={11} fill="#DC2626" color="#DC2626" /> Video
                          </span>
                        )}

                        <span
                          style={{
                            background: '#ECFDF5',
                            border: '1.5px solid #000000',
                            boxShadow: '1.5px 1.5px 0px #000000',
                            color: '#047857',
                            fontSize: '0.72rem',
                            fontWeight: 900,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Zap size={12} color="#047857" strokeWidth={2.5} /> Quiz Exprés (3 min)
                        </span>
                      </div>

                      <p style={{ color: '#334155', fontSize: '0.9rem', margin: 0, lineHeight: 1.45, fontWeight: 600 }}>
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
                      border: '1.5px solid #000000',
                      boxShadow: '2px 2px 0px #000000',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      flexShrink: 0
                    }}
                  >
                    <Clock size={14} color={pathThemeColor} strokeWidth={2.6} />
                    <span>{th?.estimatedMinutes || 3} min</span>
                  </div>
                </div>

                {/* Botones de Acción Táctiles Neo-brutalism con Colores Originales */}
                <div style={{ display: 'flex', gap: '12px', paddingTop: '4px' }}>
                  <button
                    type="button"
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
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      fontSize: '0.92rem',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      borderRadius: '14px',
                      background: '#2563EB',
                      color: '#FFFFFF',
                      border: '2.5px solid #000000',
                      boxShadow: '3.5px 3.5px 0px #000000',
                      cursor: 'pointer',
                      transition: 'transform 0.08s ease, box-shadow 0.08s ease, background-color 0.12s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1D4ED8';
                      e.currentTarget.style.transform = 'translate(-1px, -1px)';
                      e.currentTarget.style.boxShadow = '4.5px 4.5px 0px #000000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2563EB';
                      e.currentTarget.style.transform = 'translate(0px, 0px)';
                      e.currentTarget.style.boxShadow = '3.5px 3.5px 0px #000000';
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'translate(2px, 2px)';
                      e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'translate(-1px, -1px)';
                      e.currentTarget.style.boxShadow = '4.5px 4.5px 0px #000000';
                    }}
                  >
                    <BookOpen size={18} strokeWidth={2.6} color="#FFFFFF" />
                    <span>Leer Materia</span>
                  </button>

                  <button
                    type="button"
                    disabled={!isUnlocked}
                    onClick={() => {
                      if (!isUnlocked) {
                        soundService.playError();
                        return;
                      }
                      soundService.playToken();
                      onSelectPractice(lesson.id);
                    }}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      fontSize: '0.92rem',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      borderRadius: '14px',
                      background: isUnlocked ? '#22C55E' : '#E2E8F0',
                      color: isUnlocked ? '#FFFFFF' : '#94A3B8',
                      border: isUnlocked ? '2.5px solid #000000' : '2px solid #CBD5E1',
                      boxShadow: isUnlocked ? '3.5px 3.5px 0px #000000' : '2px 2px 0px #94A3B8',
                      cursor: isUnlocked ? 'pointer' : 'not-allowed',
                      transition: 'transform 0.08s ease, box-shadow 0.08s ease, background-color 0.12s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isUnlocked) return;
                      e.currentTarget.style.backgroundColor = '#16A34A';
                      e.currentTarget.style.transform = 'translate(-1px, -1px)';
                      e.currentTarget.style.boxShadow = '4.5px 4.5px 0px #000000';
                    }}
                    onMouseLeave={(e) => {
                      if (!isUnlocked) return;
                      e.currentTarget.style.backgroundColor = '#22C55E';
                      e.currentTarget.style.transform = 'translate(0px, 0px)';
                      e.currentTarget.style.boxShadow = '3.5px 3.5px 0px #000000';
                    }}
                    onMouseDown={(e) => {
                      if (!isUnlocked) return;
                      e.currentTarget.style.transform = 'translate(2px, 2px)';
                      e.currentTarget.style.boxShadow = '1px 1px 0px #000000';
                    }}
                    onMouseUp={(e) => {
                      if (!isUnlocked) return;
                      e.currentTarget.style.transform = 'translate(-1px, -1px)';
                      e.currentTarget.style.boxShadow = '4.5px 4.5px 0px #000000';
                    }}
                    title={isUnlocked ? 'Comenzar práctica interactiva' : 'Debes completar el nivel anterior para desbloquear este reto'}
                  >
                    {isUnlocked ? (
                      <Play size={18} fill="#FFFFFF" color="#FFFFFF" />
                    ) : (
                      <Lock size={16} color="#94A3B8" strokeWidth={2.5} />
                    )}
                    <span>{isUnlocked ? 'Practicar Reto' : 'Bloqueado'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredLessons.length === 0 && (
          <div
            style={{
              background: '#FFFFFF',
              border: '2.5px solid #000000',
              borderRadius: '18px',
              padding: '36px 20px',
              boxShadow: '4px 4px 0px #000000',
              textAlign: 'center',
              color: '#0F172A'
            }}
          >
            <p style={{ fontWeight: 900, fontSize: '1.1rem', margin: '0 0 6px 0' }}>
              No se encontraron lecciones para "{searchQuery}"
            </p>
            <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>
              Intenta con otro término de búsqueda o selecciona otra unidad.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
