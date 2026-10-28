import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Users,
  Search,
  RefreshCw,
  BookOpen,
  Code2,
  Gamepad2,
  Flame,
  Zap,
  ExternalLink,
  GraduationCap,
  AlertTriangle,
  Eye,
  Send,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { UserProfile, UserActivityStatus } from '../types/user';
import { presenceService } from '../services/presenceService';
import { userService } from '../services/userService';
import { notificationService } from '../services/notificationService';
import { DevAvatar } from './Avatars';
import { soundService } from '../services/soundService';

interface LiveUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStudent?: (uid: string) => void;
  isTeacher?: boolean;
}

export const LIVE_ALERT_TEMPLATES = [
  {
    id: 'watching_you',
    label: '👀 ¡Te estoy viendo!',
    title: '👀 ¡Te estoy viendo!',
    message: 'Se asignó tiempo de práctica en clase y veo que no estás jugando la lección. Por favor, abre tu ruta de aprendizaje y ponte a jugar ahora mismo.',
    badge: 'Inactividad'
  },
  {
    id: 'get_playing',
    label: '⚠️ ¡A jugar la lección!',
    title: '⚠️ ¡A jugar la lección!',
    message: 'Veo que no estás avanzando en el juego como se indicó en clase. ¡Concéntrate en resolver tus ejercicios asignados!',
    badge: 'Llamado de atención'
  },
  {
    id: 'practice_time',
    label: '🎮 ¡Hora de practicar!',
    title: '🎮 ¡Hora de jugar y practicar!',
    message: 'Tu profesor te solicita ingresar a tu ruta de aprendizaje y avanzar en los niveles pendientes para la clase de hoy.',
    badge: 'Práctica'
  },
  {
    id: 'screen_attention',
    label: '🛑 ¡Atención a la pantalla!',
    title: '🛑 ¡Atención a la pantalla!',
    message: 'Por favor pausa lo que estés haciendo en tu dispositivo y presta atención inmediata a las instrucciones del docente.',
    badge: 'Pausa'
  }
];

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

  // Menú contextual al hacer clic derecho en una tarjeta de estudiante
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    student: UserProfile;
  } | null>(null);

  // Modal para configurar y enviar alerta al estudiante
  const [alertTargetStudent, setAlertTargetStudent] = useState<UserProfile | null>(null);
  const [alertTargetScope, setAlertTargetScope] = useState<'single' | 'all_online'>('single');
  const [alertTitle, setAlertTitle] = useState(LIVE_ALERT_TEMPLATES[0].title);
  const [alertMessage, setAlertMessage] = useState(LIVE_ALERT_TEMPLATES[0].message);
  const [selectedTemplateId, setSelectedTemplateId] = useState(LIVE_ALERT_TEMPLATES[0].id);
  const [isSendingAlert, setIsSendingAlert] = useState(false);
  const [sendSuccessMsg, setSendSuccessMsg] = useState<string | null>(null);

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
    let list = students;

    // Filtro por pestaña de estado
    if (filterType === 'online') {
      list = onlineStudents;
    } else if (filterType === 'lesson') {
      list = onlineStudents.filter(
        (s) => presenceService.getUserActivityInfo(s).status === 'lesson'
      );
    } else if (filterType === 'theory') {
      list = onlineStudents.filter(
        (s) => presenceService.getUserActivityInfo(s).status === 'theory'
      );
    } else if (filterType === 'playing') {
      list = onlineStudents.filter((s) => {
        const st = presenceService.getUserActivityInfo(s).status;
        return st === 'playing' || st === 'boss' || st === 'practice';
      });
    } else if (filterType === 'offline') {
      list = students.filter((s) => !presenceService.isUserOnline(s));
    }

    // Filtro por término de búsqueda
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter((s) => {
        const name = (s.displayName || '').toLowerCase();
        const email = (s.email || '').toLowerCase();
        const code = (s.studentCode || '').toLowerCase();
        const grp = (s.group || '').toLowerCase();
        return name.includes(q) || email.includes(q) || code.includes(q) || grp.includes(q);
      });
    }

    return list;
  }, [students, onlineStudents, filterType, searchTerm]);

  // Color y badge dinámico de actividad
  const getActivityBadge = (
    activity: UserActivityStatus | undefined,
    isOnline: boolean
  ) => {
    if (!isOnline) {
      return {
        bg: '#F1F5F9',
        border: '#CBD5E1',
        color: '#64748B',
        label: 'Desconectado',
        icon: <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#94A3B8', display: 'inline-block' }} />
      };
    }

    switch (activity?.status) {
      case 'lesson':
        return {
          bg: '#EFF6FF',
          border: '#60A5FA',
          color: '#1D4ED8',
          label: 'En Lección',
          icon: <Code2 size={13} color="#2563EB" />
        };
      case 'theory':
        return {
          bg: '#F0FDFA',
          border: '#2DD4BF',
          color: '#0F766E',
          label: 'Leyendo Teoría',
          icon: <BookOpen size={13} color="#0D9488" />
        };
      case 'playing':
      case 'practice':
        return {
          bg: '#FAF5FF',
          border: '#C084FC',
          color: '#7E22CE',
          label: 'Jugando Ruta',
          icon: <Gamepad2 size={13} color="#9333EA" />
        };
      case 'boss':
        return {
          bg: '#FEF2F2',
          border: '#F87171',
          color: '#B91C1C',
          label: 'Combate Jefe',
          icon: <Flame size={13} color="#DC2626" />
        };
      case 'idle':
      default:
        return {
          bg: '#F0FDF4',
          border: '#4ADE80',
          color: '#15803D',
          label: 'En Línea Activo',
          icon: <span className="live-pulsing-dot-small" />
        };
    }
  };

  // Abrir menú contextual por clic derecho
  const handleCardContextMenu = (e: React.MouseEvent, st: UserProfile) => {
    if (!isTeacher) return;
    e.preventDefault();
    e.stopPropagation();
    soundService.playToken();
    const x = Math.min(e.clientX, window.innerWidth - 240);
    const y = Math.min(e.clientY, window.innerHeight - 170);
    setContextMenu({ x, y, student: st });
  };

  // Abrir modal de alerta
  const handleOpenAlertModal = (student: UserProfile) => {
    setAlertTargetStudent(student);
    setAlertTargetScope('single');
    setSelectedTemplateId(LIVE_ALERT_TEMPLATES[0].id);
    setAlertTitle(LIVE_ALERT_TEMPLATES[0].title);
    setAlertMessage(LIVE_ALERT_TEMPLATES[0].message);
    setSendSuccessMsg(null);
  };

  // Seleccionar plantilla rápida
  const handleSelectTemplate = (tpl: (typeof LIVE_ALERT_TEMPLATES)[0]) => {
    soundService.playToken();
    setSelectedTemplateId(tpl.id);
    setAlertTitle(tpl.title);
    setAlertMessage(tpl.message);
  };

  // Enviar alerta en tiempo real a través de Firestore
  const handleSendAlert = async () => {
    if (!alertTitle.trim() || !alertMessage.trim()) {
      alert('Por favor completa el título y mensaje de la alerta.');
      return;
    }

    setIsSendingAlert(true);
    try {
      if (alertTargetScope === 'single' && alertTargetStudent) {
        await notificationService.sendNotification({
          title: alertTitle.trim(),
          message: alertMessage.trim(),
          type: 'urgent_alert',
          targetType: 'specific',
          targetUid: alertTargetStudent.uid,
          sender: 'Profesor Joseph Carazo'
        });
      } else {
        await notificationService.sendNotification({
          title: alertTitle.trim(),
          message: alertMessage.trim(),
          type: 'urgent_alert',
          targetType: 'all',
          sender: 'Profesor Joseph Carazo'
        });
      }

      soundService.playToken();
      setSendSuccessMsg(
        alertTargetScope === 'single' && alertTargetStudent
          ? `¡Alerta enviada en vivo a ${alertTargetStudent.displayName}!`
          : `¡Alerta enviada en vivo a todos los estudiantes!`
      );

      setTimeout(() => {
        setAlertTargetStudent(null);
        setSendSuccessMsg(null);
      }, 1600);
    } catch (err) {
      console.error('Error enviando alerta en vivo:', err);
      alert('Error enviando la alerta. Inténtalo de nuevo.');
    } finally {
      setIsSendingAlert(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="live-users-modal-overlay">
      <div className="live-users-modal-card">
        {/* HEADER DEL MODAL */}
        <div className="live-users-modal-header">
          <div className="live-users-header-left">
            <div className="live-users-live-badge">
              <span className="live-live-pill">
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
                    onContextMenu={(e) => handleCardContextMenu(e, st)}
                    title={isTeacher ? 'Clic derecho para opciones: Expediente o ALERT' : undefined}
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

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {/* Botón de ALERT inmediato para el docente */}
                        {isTeacher && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundService.playToken();
                              handleOpenAlertModal(st);
                            }}
                            title="Enviar llamado de atención en pantalla a este estudiante (o clic derecho)"
                            style={{
                              background: '#FEE2E2',
                              color: '#991B1B',
                              border: '1.5px solid #000000',
                              boxShadow: '2px 2px 0px #000000',
                              borderRadius: '8px',
                              padding: '4px 8px',
                              fontSize: '0.68rem',
                              fontWeight: 900,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              cursor: 'pointer',
                              transition: 'all 0.08s ease'
                            }}
                          >
                            <AlertTriangle size={11} strokeWidth={2.8} />
                            <span>ALERT</span>
                          </button>
                        )}

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
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* MENÚ CONTEXTUAL (CLIC DERECHO ENCIMA DEL ESTUDIANTE) */}
      {contextMenu && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 100050 }}
            onClick={() => setContextMenu(null)}
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu(null);
            }}
          />
          <div
            className="live-context-menu"
            style={{
              position: 'fixed',
              top: contextMenu.y,
              left: contextMenu.x,
              zIndex: 100060,
              background: '#FFFFFF',
              border: '2.5px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              borderRadius: '14px',
              padding: '6px',
              minWidth: '220px',
              animation: 'fadeIn 0.1s ease-out'
            }}
          >
            {/* Header del menú con nombre del estudiante */}
            <div
              style={{
                padding: '6px 10px 8px',
                borderBottom: '1.5px solid #E2E8F0',
                marginBottom: '4px'
              }}
            >
              <div style={{ fontSize: '0.66rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase' }}>
                Estudiante
              </div>
              <div style={{ fontSize: '0.84rem', fontWeight: 900, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {contextMenu.student.displayName}
              </div>
            </div>

            {/* Opción 1: Expediente */}
            {onSelectStudent && (
              <button
                type="button"
                className="live-context-item"
                onClick={() => {
                  soundService.playToken();
                  const uid = contextMenu.student.uid;
                  setContextMenu(null);
                  onClose();
                  onSelectStudent(uid);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F1F5F9')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <GraduationCap size={16} color="#0284C7" />
                <span>Ver Expediente Académico</span>
              </button>
            )}

            {/* Opción 2: ALERT */}
            <button
              type="button"
              className="live-context-item"
              onClick={() => {
                soundService.playToken();
                const st = contextMenu.student;
                setContextMenu(null);
                handleOpenAlertModal(st);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#B91C1C',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF2F2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <AlertTriangle size={16} color="#DC2626" />
              <span>Enviar ALERT en Pantalla</span>
            </button>
          </div>
        </>
      )}

      {/* MODAL PARA CONFIGURAR Y ENVIAR ALERTA EN TIEMPO REAL */}
      {alertTargetStudent && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 100070,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isSendingAlert) {
              setAlertTargetStudent(null);
            }
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '6px 6px 0px #000000',
              borderRadius: '22px',
              maxWidth: '520px',
              width: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              animation: 'bounce-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Header del modal de alerta */}
            <div
              style={{
                padding: '14px 18px',
                background: '#FEF08A',
                borderBottom: '2.5px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#EF4444',
                    color: '#FFFFFF',
                    border: '2px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Eye size={18} strokeWidth={2.6} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 900, color: '#0F172A' }}>
                    Enviar Alerta en Pantalla
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>
                    Le aparecerá como un aviso emergente inmediato en su dispositivo
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAlertTargetStudent(null)}
                disabled={isSendingAlert}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #000000',
                  borderRadius: '8px',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Contenido del modal */}
            <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Selector de destinatario */}
              <div
                style={{
                  background: '#F8FAFC',
                  border: '2px solid #000000',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <DevAvatar
                    avatarId={alertTargetStudent.avatarId || 'robot_byte'}
                    skinId={alertTargetStudent.equippedSkin}
                    size={36}
                  />
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#0F172A' }}>
                      {alertTargetStudent.displayName}
                    </div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>
                      {alertTargetStudent.studentCode || 'EST'} • {alertTargetStudent.group || 'Grupo A'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setAlertTargetScope('single')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      border: '1.5px solid #000000',
                      background: alertTargetScope === 'single' ? '#0284C7' : '#FFFFFF',
                      color: alertTargetScope === 'single' ? '#FFFFFF' : '#0F172A',
                      cursor: 'pointer'
                    }}
                  >
                    Solo a este alumno
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertTargetScope('all_online')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      border: '1.5px solid #000000',
                      background: alertTargetScope === 'all_online' ? '#0284C7' : '#FFFFFF',
                      color: alertTargetScope === 'all_online' ? '#FFFFFF' : '#0F172A',
                      cursor: 'pointer'
                    }}
                  >
                    A todos en línea ({onlineStudents.length})
                  </button>
                </div>
              </div>

              {/* Plantillas precargadas */}
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 900, color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>
                  ⚡ Plantillas Rápidas Precargadas (1-clic):
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                  {LIVE_ALERT_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleSelectTemplate(tpl)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '10px',
                        border: '2px solid #000000',
                        boxShadow: selectedTemplateId === tpl.id ? '2.5px 2.5px 0px #000000' : '1px 1px 0px #000000',
                        background: selectedTemplateId === tpl.id ? '#FEF08A' : '#FFFFFF',
                        color: '#0F172A',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.76rem',
                        fontWeight: 900,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        transition: 'all 0.1s ease'
                      }}
                    >
                      <span>{tpl.label}</span>
                      <span style={{ fontSize: '0.64rem', color: '#64748B', fontWeight: 700 }}>
                        {tpl.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Campo: Título */}
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 900, color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Título del Llamado:
                </label>
                <input
                  type="text"
                  value={alertTitle}
                  onChange={(e) => {
                    setAlertTitle(e.target.value);
                    setSelectedTemplateId('');
                  }}
                  placeholder="Ej: 👀 ¡Te estoy viendo!"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '2px solid #000000',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Campo: Mensaje */}
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 900, color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Mensaje en Pantalla:
                </label>
                <textarea
                  rows={3}
                  value={alertMessage}
                  onChange={(e) => {
                    setAlertMessage(e.target.value);
                    setSelectedTemplateId('');
                  }}
                  placeholder="Escribe el mensaje que verá el estudiante..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '2px solid #000000',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    resize: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    lineHeight: 1.4
                  }}
                />
              </div>

              {/* Mensaje de éxito tras enviar */}
              {sendSuccessMsg && (
                <div
                  style={{
                    background: '#DCFCE7',
                    border: '2px solid #166534',
                    color: '#166534',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    fontSize: '0.84rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{sendSuccessMsg}</span>
                </div>
              )}

              {/* Botones de acción */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setAlertTargetStudent(null)}
                  disabled={isSendingAlert}
                  style={{
                    padding: '9px 16px',
                    background: '#FFFFFF',
                    border: '2px solid #CBD5E1',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: '#475569',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleSendAlert}
                  disabled={isSendingAlert}
                  style={{
                    padding: '10px 20px',
                    background: '#EF4444',
                    color: '#FFFFFF',
                    border: '2.5px solid #000000',
                    boxShadow: '3px 3px 0px #000000',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: 900,
                    cursor: isSendingAlert ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.08s ease'
                  }}
                >
                  {isSendingAlert ? (
                    <>
                      <Loader2 size={16} className="live-spin-icon" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} strokeWidth={2.6} />
                      <span>
                        {alertTargetScope === 'single'
                          ? 'ENVIAR ALERTA INMEDIATA'
                          : 'ENVIAR A TODOS EN LÍNEA'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
