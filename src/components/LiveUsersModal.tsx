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
}

export const LiveUsersModal: React.FC<LiveUsersModalProps> = ({
  isOpen,
  onClose,
  onSelectStudent
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
        border: '#E2E8F0'
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
          border: '#BFDBFE'
        };
      case 'theory':
        return {
          label: 'Leyendo Materia',
          icon: <BookOpen size={13} color="#0D9488" />,
          color: '#0F766E',
          bg: '#F0FDFA',
          border: '#99F6E4'
        };
      case 'playing':
        return {
          label: 'Jugando Ruta',
          icon: <Gamepad2 size={13} color="#7C3AED" />,
          color: '#6D28D9',
          bg: '#F5F3FF',
          border: '#DDD6FE'
        };
      case 'boss':
        return {
          label: 'Reto de Jefe',
          icon: <Sparkles size={13} color="#D97706" />,
          color: '#B45309',
          bg: '#FFFBEB',
          border: '#FDE68A'
        };
      case 'practice':
        return {
          label: 'En Práctica',
          icon: <Zap size={13} color="#F59E0B" fill="#F59E0B" />,
          color: '#B45309',
          bg: '#FFFBEB',
          border: '#FDE68A'
        };
      case 'evaluation':
        return {
          label: 'En Evaluación',
          icon: <FileCheck2 size={13} color="#DC2626" />,
          color: '#B91C1C',
          bg: '#FEF2F2',
          border: '#FECACA'
        };
      default:
        return {
          label: 'En la Aplicación',
          icon: <span className="live-pulsing-dot-small" />,
          color: '#15803D',
          bg: '#F0FDF4',
          border: '#BBF7D0'
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
                <GraduationCap size={13} />
                <span>Docente • josephcarazo56@gmail.com</span>
              </span>
              <span className="live-users-online-count-pill">
                <span className="live-pulsing-dot" />
                <span>{onlineStudents.length} en línea</span>
              </span>
            </div>
            <h2 className="live-users-modal-title">Control de Usuarios en Tiempo Real</h2>
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
              >
                ✕
              </button>
            )}
          </div>

          {/* Chips de filtro */}
          <div className="live-users-chips-row">
            {[
              { key: 'online' as const, label: `🟢 En Línea (${onlineStudents.length})` },
              { key: 'all' as const, label: `Todos (${students.length})` },
              { key: 'lesson' as const, label: `📖 Lección (${lessonCount})` },
              { key: 'theory' as const, label: `📚 Materia (${theoryCount})` },
              { key: 'playing' as const, label: `🎮 Jugando (${playingCount})` },
              { key: 'offline' as const, label: `⚪ Desconectados (${students.length - onlineStudents.length})` }
            ].map((chip) => (
              <button
                key={chip.key}
                type="button"
                className={`live-users-filter-chip ${filterType === chip.key ? 'active' : ''}`}
                onClick={() => {
                  soundService.playToken();
                  setFilterType(chip.key);
                }}
              >
                {chip.label}
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
              <div className="live-empty-icon">👥</div>
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
                  className="btn-3d btn-blue"
                  style={{ marginTop: 12, padding: '7px 16px', fontSize: '0.82rem' }}
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
                              background: st.currentPath === 'kotlin' ? '#EDE9FE' : '#E0F2FE',
                              color: st.currentPath === 'kotlin' ? '#6D28D9' : '#0284C7'
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
