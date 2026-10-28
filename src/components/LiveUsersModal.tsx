import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Users,
  Search,
  RefreshCw,
  BookOpen,
  Code2,
  Gamepad2,
  FileCheck2,
  Flame,
  Zap,
  Sparkles,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { UserProfile, UserActivityStatus } from '../types/user';
import { presenceService } from '../services/presenceService';
import { userService } from '../services/userService';
import { DevAvatar } from './Avatars';
import { soundService } from '../services/soundService';

interface LiveUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStudent?: (uid: string) => void;
  isTeacher?: boolean;
}

export const LiveUsersModal: React.FC<LiveUsersModalProps> = ({
  isOpen,
  onClose,
  onSelectStudent,
  isTeacher = false
}) => {
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'online' | 'lesson' | 'theory' | 'playing' | 'offline'>('online');
  const [, setTicker] = useState<number>(0);

  // Suscribirse a usuarios en tiempo real
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    const unsubscribe = presenceService.subscribeToAllStudents((list) => {
      setStudents(list);
      setIsLoading(false);
      setIsRefreshing(false);
    });

    const tickerInterval = setInterval(() => {
      setTicker((t) => t + 1);
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(tickerInterval);
    };
  }, [isOpen]);

  const handleManualRefresh = async () => {
    soundService.playToken();
    setIsRefreshing(true);
    try {
      const list = await userService.getAllStudents();
      setStudents(list);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Métricas en tiempo real
  const onlineStudents = useMemo(() => {
    return students.filter((s) => presenceService.isUserOnline(s));
  }, [students]);

  const lessonCount = useMemo(() => {
    return onlineStudents.filter(
      (s) => presenceService.getUserActivityInfo(s).status === 'lesson'
    ).length;
  }, [onlineStudents]);

  const theoryCount = useMemo(() => {
    return onlineStudents.filter(
      (s) => presenceService.getUserActivityInfo(s).status === 'theory'
    ).length;
  }, [onlineStudents]);

  const playingCount = useMemo(() => {
    return onlineStudents.filter((s) => {
      const st = presenceService.getUserActivityInfo(s).status;
      return st === 'playing' || st === 'boss' || st === 'practice';
    }).length;
  }, [onlineStudents]);

  // Lista filtrada
  const filteredList = useMemo(() => {
    let result = [...students];

    // Ordenar: primero los que están en línea, luego los más recientemente activos
    result.sort((a, b) => {
      const aOnline = presenceService.isUserOnline(a);
      const bOnline = presenceService.isUserOnline(b);
      if (aOnline && !bOnline) return -1;
      if (!aOnline && bOnline) return 1;
      return (b.lastActiveAt || 0) - (a.lastActiveAt || 0);
    });

    // Filtro por estado
    if (filterType === 'online') {
      result = result.filter((s) => presenceService.isUserOnline(s));
    } else if (filterType === 'lesson') {
      result = result.filter(
        (s) => presenceService.isUserOnline(s) && presenceService.getUserActivityInfo(s).status === 'lesson'
      );
    } else if (filterType === 'theory') {
      result = result.filter(
        (s) => presenceService.isUserOnline(s) && presenceService.getUserActivityInfo(s).status === 'theory'
      );
    } else if (filterType === 'playing') {
      result = result.filter((s) => {
        if (!presenceService.isUserOnline(s)) return false;
        const st = presenceService.getUserActivityInfo(s).status;
        return st === 'playing' || st === 'boss' || st === 'practice';
      });
    } else if (filterType === 'offline') {
      result = result.filter((s) => !presenceService.isUserOnline(s));
    }

    // Filtro por texto de búsqueda
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.displayName?.toLowerCase().includes(term) ||
          s.email?.toLowerCase().includes(term) ||
          s.studentCode?.toLowerCase().includes(term) ||
          s.group?.toLowerCase().includes(term) ||
          s.currentActivity?.activityText?.toLowerCase().includes(term) ||
          presenceService.getUserActivityInfo(s).activityText.toLowerCase().includes(term)
      );
    }

    return result;
  }, [students, filterType, searchTerm]);

  if (!isOpen) return null;

  const getActivityBadge = (activity?: UserActivityStatus, isOnline?: boolean) => {
    if (!isOnline) {
      return {
        label: 'Desconectado',
        icon: <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#94A3B8' }} />,
        color: '#64748B',
        bg: '#F1F5F9',
        border: '#000000'
      };
    }

    const st = activity?.status || 'idle';
    switch (st) {
      case 'lesson':
        return {
          label: 'En Lección',
          icon: <Code2 size={13} color="#2563EB" />,
          color: '#1D4ED8',
          bg: '#EFF6FF',
          border: '#000000'
        };
      case 'theory':
        return {
          label: 'Leyendo Materia',
          icon: <BookOpen size={13} color="#0D9488" />,
          color: '#0F766E',
          bg: '#F0FDFA',
          border: '#000000'
        };
      case 'playing':
        return {
          label: 'Jugando Ruta',
          icon: <Gamepad2 size={13} color="#7C3AED" />,
          color: '#6D28D9',
          bg: '#F5F3FF',
          border: '#000000'
        };
      case 'boss':
        return {
          label: 'Reto de Jefe',
          icon: <Sparkles size={13} color="#D97706" />,
          color: '#B45309',
          bg: '#FFFBEB',
          border: '#000000'
        };
      case 'practice':
        return {
          label: 'En Práctica',
          icon: <Zap size={13} color="#F59E0B" fill="#F59E0B" />,
          color: '#B45309',
          bg: '#FFFBEB',
          border: '#000000'
        };
      case 'evaluation':
        return {
          label: 'En Evaluación',
          icon: <FileCheck2 size={13} color="#DC2626" />,
          color: '#B91C1C',
          bg: '#FEF2F2',
          border: '#000000'
        };
      default:
        return {
          label: 'En la Aplicación',
          icon: <span className="live-pulsing-dot-small" />,
          color: '#15803D',
          bg: '#F0FDF4',
          border: '#000000'
        };
    }
  };

  return (
    <div className="live-users-modal-backdrop" onClick={onClose}>
      <div
        className="live-users-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Control de Usuarios en Tiempo Real"
      >
        {/* CABECERA PRINCIPAL */}
        <div className="live-users-modal-header">
          <div className="live-users-header-title-col">
            <div className="live-users-badge-row">
              <span className="live-users-exclusive-pill">
                {isTeacher ? (
                  <>
                    <GraduationCap size={13} />
                    <span>Docente • josephcarazo56@gmail.com</span>
                  </>
                ) : (
                  <>
                    <Users size={13} />
                    <span>Comunidad de Estudiantes</span>
                  </>
                )}
              </span>
              <span className="live-users-online-count-pill">
                <span className="live-pulsing-dot" />
                <span>{onlineStudents.length} en línea</span>
              </span>
            </div>
            <h2 className="live-users-modal-title">
              {isTeacher ? 'Control de Usuarios en Tiempo Real' : 'Compañeros en Línea en Vivo'}
            </h2>
          </div>

          <div className="live-users-header-actions">
            <button
              type="button"
              className="live-users-refresh-btn"
              onClick={handleManualRefresh}
              title="Actualizar estado ahora"
              disabled={isRefreshing}
            >
              <RefreshCw
                size={16}
                className={isRefreshing ? 'live-spin-icon' : ''}
              />
              <span className="live-refresh-text">Actualizar</span>
            </button>

            <button
              type="button"
              className="live-users-close-btn"
              onClick={onClose}
              title="Cerrar ventana"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* BARRA DE MÉTRICAS RÁPIDAS EN VIVO */}
        <div className="live-users-metrics-strip">
          <div className="live-metric-chip">
            <div className="live-metric-chip-icon green">
              <span className="live-pulsing-dot-small" />
            </div>
            <div className="live-metric-chip-content">
              <span className="live-metric-val">{onlineStudents.length}</span>
              <span className="live-metric-lbl">En Línea</span>
            </div>
          </div>

          <div className="live-metric-chip">
            <div className="live-metric-chip-icon blue">
              <Code2 size={13} />
            </div>
            <div className="live-metric-chip-content">
              <span className="live-metric-val">{lessonCount}</span>
              <span className="live-metric-lbl">En Lección</span>
            </div>
          </div>

          <div className="live-metric-chip">
            <div className="live-metric-chip-icon teal">
              <BookOpen size={13} />
            </div>
            <div className="live-metric-chip-content">
              <span className="live-metric-val">{theoryCount}</span>
              <span className="live-metric-lbl">Leyendo Materia</span>
            </div>
          </div>

          <div className="live-metric-chip">
            <div className="live-metric-chip-icon purple">
              <Gamepad2 size={13} />
            </div>
            <div className="live-metric-chip-content">
              <span className="live-metric-val">{playingCount}</span>
              <span className="live-metric-lbl">Jugando Ruta</span>
            </div>
          </div>

          <div className="live-metric-chip">
            <div className="live-metric-chip-icon gray">
              <Users size={13} />
            </div>
            <div className="live-metric-chip-content">
              <span className="live-metric-val">{students.length}</span>
              <span className="live-metric-lbl">Total Registrados</span>
            </div>
          </div>
        </div>

        {/* FILTROS Y BÚSQUEDA */}
        <div className="live-users-filter-bar">
          <div className="live-users-search-box">
            <Search size={15} color="#94A3B8" />
            <input
              type="text"
              placeholder="Buscar estudiante, correo, código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="live-users-search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="live-users-search-clear"
                onClick={() => setSearchTerm('')}
                title="Limpiar búsqueda"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Chips de filtro */}
          <div className="live-users-chips-row">
            {[
              {
                key: 'online' as const,
                label: `En Línea (${onlineStudents.length})`,
                icon: <span className="live-pulsing-dot-small" />
              },
              {
                key: 'all' as const,
                label: `Todos (${students.length})`,
                icon: <Users size={12} />
              },
              {
                key: 'lesson' as const,
                label: `Lección (${lessonCount})`,
                icon: <Code2 size={12} />
              },
              {
                key: 'theory' as const,
                label: `Materia (${theoryCount})`,
                icon: <BookOpen size={12} />
              },
              {
                key: 'playing' as const,
                label: `Jugando (${playingCount})`,
                icon: <Gamepad2 size={12} />
              },
              {
                key: 'offline' as const,
                label: `Desconectados (${students.length - onlineStudents.length})`,
                icon: <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#94A3B8', display: 'inline-block' }} />
              }
            ].map((chip) => (
              <button
                key={chip.key}
                type="button"
                className={`live-users-filter-chip ${filterType === chip.key ? 'active' : ''}`}
                onClick={() => {
                  soundService.playToken();
                  setFilterType(chip.key);
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                {chip.icon}
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* LISTADO DE USUARIOS */}
        <div className="live-users-list-container">
          {isLoading ? (
            <div className="live-users-loading-state">
              <RefreshCw size={26} className="live-spin-icon" color="#22C55E" />
              <p>Conectando con el estado en tiempo real de los estudiantes...</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="live-users-empty-state">
              <div className="live-empty-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: '#FEF08A', border: '3px solid #000000', boxShadow: '3px 3px 0px #000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={30} color="#000000" />
                </div>
              </div>
              <h3>
                {filterType === 'online'
                  ? 'No hay otros estudiantes en línea en este momento'
                  : 'No se encontraron usuarios'}
              </h3>
              <p>
                {filterType === 'online'
                  ? 'Cuando un estudiante ingrese a PrograApp, juegue, abra una lección o lea una materia, aparecerá aquí automáticamente.'
                  : 'Prueba cambiando los términos de búsqueda o el filtro seleccionado.'}
              </p>
              {filterType === 'online' && students.length > 0 && (
                <button
                  type="button"
                  style={{ marginTop: 12, padding: '8px 18px', fontSize: '0.82rem', fontWeight: 900, background: '#FFE600', color: '#000000', border: '2.5px solid #000000', boxShadow: '2.5px 2.5px 0px #000000', borderRadius: '12px', cursor: 'pointer' }}
                  onClick={() => setFilterType('all')}
                >
                  Ver todos los {students.length} estudiantes registrados
                </button>
              )}
            </div>
          ) : (
            <div className="live-users-cards-grid">
              {filteredList.map((st) => {
                const isOnline = presenceService.isUserOnline(st);
                const info = presenceService.getUserActivityInfo(st);
                const badge = getActivityBadge(
                  st.currentActivity || { status: info.status, activityText: info.activityText },
                  isOnline
                );
                const activityText = info.activityText;

                return (
                  <div
                    key={st.uid}
                    className={`live-user-card ${isOnline ? 'is-online-card' : 'is-offline-card'}`}
                  >
                    {/* Header de la tarjeta */}
                    <div className="live-card-top">
                      <div className="live-card-avatar-wrap">
                        <DevAvatar
                          avatarId={st.avatarId || 'robot_byte'}
                          skinId={st.equippedSkin}
                          size={42}
                        />
                        <span
                          className={`live-avatar-status-dot ${isOnline ? 'online' : 'offline'}`}
                          title={isOnline ? 'En línea en este instante' : 'Desconectado'}
                        />
                      </div>

                      <div className="live-card-info">
                        <div className="live-card-name-row">
                          <span className="live-card-student-code">
                            {st.studentCode || 'EST'}
                          </span>
                          <h4 className="live-card-name" title={st.displayName}>
                            {st.displayName}
                          </h4>
                        </div>
                        <span className="live-card-email" title={st.email}>
                          {st.email || 'Sin correo registrado'}
                        </span>
                      </div>

                      <div className="live-card-group-pill">
                        <span>{st.group || 'Grupo A'}</span>
                      </div>
                    </div>

                    {/* CAJA DE ACTIVIDAD EN TIEMPO REAL */}
                    <div
                      className="live-card-activity-box"
                      style={{
                        background: badge.bg,
                        borderColor: badge.border
                      }}
                    >
                      <div className="live-activity-tag-row">
                        <span
                          className="live-activity-badge-pill"
                          style={{
                            color: badge.color,
                            borderColor: badge.border
                          }}
                        >
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>

                        {st.currentPath && (
                          <span
                            className="live-card-path-tag"
                            style={{
                              background: st.currentPath === 'kotlin' ? '#FEF08A' : '#BAE6FD',
                              color: '#000000',
                              border: '1.5px solid #000000'
                            }}
                          >
                            {st.currentPath === 'kotlin' ? 'Kotlin' : 'SQL'}
                          </span>
                        )}
                      </div>

                      <div className="live-activity-desc" title={activityText}>
                        {activityText}
                      </div>

                      {st.currentActivity?.details && isOnline && (
                        <div className="live-activity-subdetails">
                          {st.currentActivity.details}
                        </div>
                      )}
                    </div>

                    {/* FOOTER CON ESTADÍSTICAS Y ACCIÓN RÁPIDA */}
                    <div className="live-card-footer">
                      <div className="live-card-stats-row">
                        <span className="live-stat-item" title="XP acumulado">
                          <Zap size={12} color="#F59E0B" fill="#F59E0B" />
                          <span>{st.totalXp || 0} XP</span>
                        </span>
                        <span className="live-stat-item" title="Días de racha activa">
                          <Flame size={12} color="#EF4444" fill="#EF4444" />
                          <span>{st.streak?.count || 0}d</span>
                        </span>
                      </div>

                      {onSelectStudent && (
                        <button
                          type="button"
                          className="live-card-action-btn"
                          onClick={() => {
                            soundService.playToken();
                            onClose();
                            onSelectStudent(st.uid);
                          }}
                          title="Ver expediente en Seguimiento Académico"
                        >
                          <span>Expediente</span>
                          <ExternalLink size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
