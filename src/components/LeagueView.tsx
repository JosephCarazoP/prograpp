import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Crown,
  Clock,
  Target,
  BookOpen,
  Zap,
  Flame,
  ArrowUp,
  ArrowDown,
  Minus,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types/user';
import { DevAvatar } from './Avatars';
import { soundService } from '../services/soundService';
import {
  leagueService,
  LeagueLeaderboardData,
  LEAGUE_TIER_META
} from '../services/leagueService';

interface LeagueViewProps {
  user: UserProfile;
  onNavigateToPlay: () => void;
  onNavigateToCourses: () => void;
}

export const LeagueView: React.FC<LeagueViewProps> = ({
  user,
  onNavigateToPlay,
  onNavigateToCourses
}) => {
  const [data, setData] = useState<LeagueLeaderboardData | null>(null);
  const [filterGroup, setFilterGroup] = useState<'all' | 'my_group'>('all');
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  const loadLeagueData = async () => {
    try {
      const res = await leagueService.getLeaderboard(user);
      setData(res);
    } catch (err) {
      console.warn('Error cargando Liga:', err);
    }
  };

  useEffect(() => {
    loadLeagueData();

    // Actualizar cuando ocurra un evento de progreso o liga
    const handleUpdate = () => loadLeagueData();
    window.addEventListener('prograpp_league_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('prograpp_league_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [user.uid]);

  const userGroup = user.group || 'Grupo A';

  const displayedEntries = (data?.entries || []).filter((e) => {
    if (filterGroup === 'my_group') {
      return e.group === userGroup;
    }
    return true;
  });

  const top3 = displayedEntries.slice(0, 3);
  const tierMeta = LEAGUE_TIER_META[user.currentLeague || 'bronze'] || LEAGUE_TIER_META.bronze;

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%', padding: '8px 12px 90px 12px', boxSizing: 'border-box' }}>
      {/* ═══ CABECERA DE LA LIGA DUOLINGO 3D ═══ */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '24px',
          border: '3px solid #334155',
          borderBottom: '7px solid #1E293B',
          padding: '24px 20px',
          color: '#FFFFFF',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                border: '3px solid #FCD34D',
                boxShadow: '0 6px 0 #B45309, 0 10px 20px rgba(245, 158, 11, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Trophy size={34} color="#FFFFFF" strokeWidth={2.4} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <span
                  style={{
                    background: tierMeta.bg,
                    color: tierMeta.color,
                    border: `1.5px solid ${tierMeta.border}`,
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    padding: '2px 10px',
                    borderRadius: '999px',
                    textTransform: 'uppercase'
                  }}
                >
                  {tierMeta.name}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 800 }}>
                  Semana {data?.weekNumber || 1} • {data?.year || 2026}
                </span>
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                Torneo y Liga Semanal
              </h1>
              <p style={{ margin: '4px 0 0 0', color: '#CBD5E1', fontSize: '0.86rem', fontWeight: 600 }}>
                Compite resolviendo retos, leyendo materias y demostrando máxima precisión.
              </p>
            </div>
          </div>

          {/* Reloj de Cuenta Regresiva */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '14px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Clock size={16} color="#FBBF24" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.66rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase' }}>
                Cierre de Torneo
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 900, color: '#F8FAFC' }}>
                {data ? `${data.daysRemaining}d ${data.hoursRemaining}h restantes` : 'Calculando...'}
              </span>
            </div>
          </div>
        </div>

        {/* Barra de Posición Personal Rápida */}
        {data?.currentUserEntry && (
          <div
            style={{
              marginTop: '18px',
              background: 'rgba(255, 255, 255, 0.07)',
              border: '2px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '16px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: data.currentUserEntry.position <= 5 ? '#22C55E' : '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  color: '#FFFFFF'
                }}
              >
                #{data.currentUserEntry.position}
              </div>
              <div>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase' }}>
                  Tu Estado Actual
                </span>
                <div style={{ fontSize: '0.94rem', fontWeight: 900, color: '#FFFFFF' }}>
                  {data.currentUserEntry.totalLeaguePoints.toLocaleString()} Puntos de Liga
                  {data.currentUserEntry.position <= 5 ? (
                    <span style={{ color: '#4ADE80', marginLeft: '8px', fontSize: '0.82rem' }}>
                      (¡En Zona de Ascenso!)
                    </span>
                  ) : (
                    <span style={{ color: '#93C5FD', marginLeft: '8px', fontSize: '0.82rem' }}>
                      (¡Avanza jugando!)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                soundService.playToken();
                setShowRulesModal(true);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '10px',
                padding: '6px 12px',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Info size={14} />
              <span>¿Cómo sumar más puntos?</span>
            </button>
          </div>
        )}
      </div>

      {/* ═══ SELECTOR DE FILTRO DE GRUPO ═══ */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              soundService.playToken();
              setFilterGroup('all');
            }}
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              border: '2px solid #CBD5E1',
              background: filterGroup === 'all' ? '#0284C7' : '#FFFFFF',
              color: filterGroup === 'all' ? '#FFFFFF' : '#475569',
              boxShadow: filterGroup === 'all' ? '0 3px 0 #0369A1' : '0 2px 0 #CBD5E1',
              fontWeight: 900,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Todos ({data?.entries.length || 0})
          </button>

          <button
            onClick={() => {
              soundService.playToken();
              setFilterGroup('my_group');
            }}
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              border: '2px solid #CBD5E1',
              background: filterGroup === 'my_group' ? '#0284C7' : '#FFFFFF',
              color: filterGroup === 'my_group' ? '#FFFFFF' : '#475569',
              boxShadow: filterGroup === 'my_group' ? '0 3px 0 #0369A1' : '0 2px 0 #CBD5E1',
              fontWeight: 900,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Mi Grupo: {userGroup}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>
          <Sparkles size={14} color="#F59E0B" />
          <span>El Top 5 asciende a la siguiente liga</span>
        </div>
      </div>

      {/* ═══ PODIO TOP 3 (1°, 2° y 3° PUESTO) ═══ */}
      {top3.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: top3.length === 1 ? '1fr' : top3.length === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '22px'
          }}
        >
          {top3.map((entry, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;
            const isMe = entry.uid === user.uid;

            const podiumBg = isFirst
              ? 'linear-gradient(180deg, #FEF3C7 0%, #FFFFFF 100%)'
              : isSecond
              ? 'linear-gradient(180deg, #F1F5F9 0%, #FFFFFF 100%)'
              : 'linear-gradient(180deg, #FFEDD5 0%, #FFFFFF 100%)';

            const podiumBorder = isFirst ? '#F59E0B' : isSecond ? '#94A3B8' : '#F97316';
            const podiumShadow = isFirst ? '#D97706' : isSecond ? '#64748B' : '#EA580C';

            return (
              <div
                key={entry.uid}
                style={{
                  background: podiumBg,
                  border: `3px solid ${isMe ? '#2563EB' : podiumBorder}`,
                  borderRadius: '20px',
                  padding: '16px 12px',
                  textAlign: 'center',
                  boxShadow: `0 6px 0 ${isMe ? '#1D4ED8' : podiumShadow}`,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {/* Corona o Medalla */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: isFirst ? '#F59E0B' : isSecond ? '#64748B' : '#EA580C',
                    color: '#FFFFFF',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 3px 0 rgba(0,0,0,0.2)',
                    fontWeight: 900,
                    fontSize: '0.85rem'
                  }}
                >
                  {isFirst ? <Crown size={17} /> : idx + 1}
                </div>

                <div style={{ marginTop: '10px' }}>
                  <DevAvatar
                    avatarId={entry.avatarId}
                    skinId={entry.equippedSkin}
                    size={isFirst ? 58 : 48}
                  />
                </div>

                <div style={{ minWidth: 0, width: '100%' }}>
                  <div
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 900,
                      color: '#0F172A',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={entry.displayName}
                  >
                    {entry.displayName} {isMe && '(TÚ)'}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800 }}>
                    {entry.studentCode} • {entry.group}
                  </span>
                </div>

                {/* Puntaje Destacado */}
                <div
                  style={{
                    background: isFirst ? '#FEF9C3' : '#F1F5F9',
                    border: `1.5px solid ${isFirst ? '#FDE047' : '#E2E8F0'}`,
                    borderRadius: '12px',
                    padding: '6px 10px',
                    width: '90%',
                    fontWeight: 900,
                    fontSize: '1rem',
                    color: '#0F172A'
                  }}
                >
                  {entry.totalLeaguePoints.toLocaleString()} <span style={{ fontSize: '0.7rem', color: '#64748B' }}>PTS</span>
                </div>

                {/* Mérito Destacado */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#15803D', fontWeight: 800 }}>
                  <Target size={12} color="#16A34A" />
                  <span>{entry.accuracyRate}% precisión</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ LISTA COMPLETA DE CLASIFICACIÓN (CARDS EN FORMATO FILA) ═══ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Barra divisora de Zona de Ascenso */}
        <div
          style={{
            background: '#ECFDF5',
            border: '2px dashed #34D399',
            borderRadius: '12px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.76rem',
            fontWeight: 900,
            color: '#047857'
          }}
        >
          <span>▲ ZONA DE ASCENSO A SIGUIENTE LIGA (Puestos 1 al 5)</span>
          <CheckCircle2 size={15} color="#059669" />
        </div>

        {displayedEntries.map((entry, index) => {
          const isMe = entry.uid === user.uid;
          const pos = index + 1;
          const isTop5 = pos <= 5;

          return (
            <div
              key={entry.uid}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '16px',
                background: isMe ? '#EFF6FF' : '#FFFFFF',
                border: isMe ? '2.5px solid #2563EB' : '2px solid #E2E8F0',
                borderBottomWidth: isMe ? '4.5px' : '3.5px',
                borderBottomColor: isMe ? '#1D4ED8' : '#CBD5E1',
                boxShadow: isMe ? '0 4px 12px rgba(37, 99, 235, 0.15)' : 'none',
                gap: '12px',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Posición y Tendencia */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '45px' }}>
                <span
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 900,
                    color: pos <= 3 ? '#D97706' : isTop5 ? '#15803D' : '#64748B',
                    width: '24px',
                    textAlign: 'center'
                  }}
                >
                  {pos}
                </span>

                {/* Flecha de tendencia */}
                {entry.trend === 'up' && (
                  <span title="Ha subido de puesto" style={{ display: 'inline-flex' }}>
                    <ArrowUp size={14} color="#16A34A" strokeWidth={3} />
                  </span>
                )}
                {entry.trend === 'down' && (
                  <span title="Ha bajado de puesto" style={{ display: 'inline-flex' }}>
                    <ArrowDown size={14} color="#DC2626" strokeWidth={3} />
                  </span>
                )}
                {entry.trend === 'same' && (
                  <span title="Mantiene su posición" style={{ display: 'inline-flex' }}>
                    <Minus size={14} color="#94A3B8" strokeWidth={3} />
                  </span>
                )}
              </div>

              {/* Avatar e Indicador Online */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <DevAvatar
                  avatarId={entry.avatarId}
                  skinId={entry.equippedSkin}
                  size={42}
                />
                {entry.isOnline && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#22C55E',
                      border: '2px solid #FFFFFF'
                    }}
                    title="En línea en este instante"
                  />
                )}
              </div>

              {/* Nombre y Méritos */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 900,
                      color: isMe ? '#1D4ED8' : '#0F172A',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {entry.displayName} {isMe && '(TÚ)'}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: '6px',
                      background: '#F1F5F9',
                      color: '#475569'
                    }}
                  >
                    {entry.studentCode}
                  </span>
                </div>

                {/* Fila de Méritos: Precisión, Materias y Racha */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '3px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: entry.accuracyRate >= 90 ? '#15803D' : '#0369A1',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                    title="Porcentaje de precisión en ejercicios (quien falla menos)"
                  >
                    <Target size={11} />
                    <span>{entry.accuracyRate}% precisión</span>
                  </span>

                  {entry.theoriesReadCount > 0 && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: '#6D28D9',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                      title="Materias de Cursos leídas y completadas"
                    >
                      <BookOpen size={11} />
                      <span>{entry.theoriesReadCount} materias</span>
                    </span>
                  )}

                  {entry.quizzesCompletedCount > 0 && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: '#D97706',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                      title="Quizzes exprés aprobados"
                    >
                      <Zap size={11} />
                      <span>{entry.quizzesCompletedCount} quizzes</span>
                    </span>
                  )}

                  {entry.streakDays > 1 && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: '#EF4444',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                      title="Días de racha activa"
                    >
                      <Flame size={11} />
                      <span>{entry.streakDays}d racha</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Puntuación de Liga */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '1.05rem',
                    fontWeight: 900,
                    color: isMe ? '#2563EB' : '#0F172A'
                  }}
                >
                  {entry.totalLeaguePoints.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>
                  Puntos
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ BOTONES INFERIORES DE ACCIÓN RÁPIDA ═══ */}
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}
      >
        <button
          className="btn-3d btn-green"
          onClick={() => {
            soundService.playToken();
            onNavigateToPlay();
          }}
          style={{
            flex: 1,
            padding: '14px 20px',
            fontSize: '1rem',
            fontWeight: 900,
            borderRadius: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Zap size={18} fill="#FFFFFF" />
          <span>¡JUGAR NIVELES Y SUMAR PUNTOS!</span>
        </button>

        <button
          className="btn-3d btn-blue"
          onClick={() => {
            soundService.playToken();
            onNavigateToCourses();
          }}
          style={{
            flex: 1,
            padding: '14px 20px',
            fontSize: '1rem',
            fontWeight: 900,
            borderRadius: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <BookOpen size={18} />
          <span>LEER MATERIAS (+60 PTS)</span>
        </button>
      </div>

      {/* ═══ MODAL INFORMATIVO: CÓMO SUMAR PUNTOS EN LA LIGA ═══ */}
      {showRulesModal && (
        <div
          onClick={() => setShowRulesModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '3px solid #E2E8F0',
              borderBottom: '7px solid #CBD5E1',
              maxWidth: '520px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={24} color="#F59E0B" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>
                  Sistema de Puntos de la Liga
                </h3>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontWeight: 900
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              La Liga premia tanto el avance como la constancia y la calidad de tus respuestas:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '10px 12px', borderRadius: '12px' }}>
                <BookOpen size={20} color="#2563EB" />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block' }}>Leer Materia en Cursos (+60 Pts)</strong>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Leer las lecciones interactivas y probar el código en vivo.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '10px 12px', borderRadius: '12px' }}>
                <Zap size={20} color="#059669" />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block' }}>Quizzes Exprés (+45 Pts)</strong>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Superar los micro-quizzes de validación de cada materia.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '10px 12px', borderRadius: '12px' }}>
                <Target size={20} color="#D97706" />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block' }}>Bono de Precisión (+50 a +200 Pts)</strong>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Quien falla menos gana más: hasta +200 pts por precisión ≥ 95%.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '10px 12px', borderRadius: '12px' }}>
                <Flame size={20} color="#EF4444" />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block' }}>Constancia Diaria (+15 Pts por día)</strong>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Mantener encendida tu racha sumando días consecutivos.</span>
                </div>
              </div>
            </div>

            <button
              className="btn-3d btn-blue"
              onClick={() => setShowRulesModal(false)}
              style={{
                width: '100%',
                marginTop: '20px',
                padding: '12px',
                borderRadius: '14px',
                fontWeight: 900,
                fontSize: '0.94rem'
              }}
            >
              ¡ENTENDIDO, A COMPETIR!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
