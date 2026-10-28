import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  Megaphone,
  MessageSquare,
  Clock,
  Target,
  Award,
  Trash2,
  Check,
  Copy,
  Play,
  Database,
  Code2
} from 'lucide-react';
import { AppNotification, NotificationType } from '../types/notification';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { SelectDatabaseModal } from './sqlite/SelectDatabaseModal';

interface NotificationsPageProps {
  user: UserProfile;
  notifications: AppNotification[];
  onBack: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismissNotification: (id: string) => void;
  onDismissAllRead?: () => void;
  onOpenScriptInSqlite?: (sqlCode: string, targetDbId: string) => void;
}

/**
 * Extrae de forma segura el script o bloque de código preservando 100% el identado original
 */
function extractNotificationCode(notif: AppNotification): {
  code: string;
  language: 'sql' | 'kotlin' | 'text';
  textMessage: string;
} | null {
  if (notif.codeSnippet && notif.codeSnippet.length > 0) {
    return {
      code: notif.codeSnippet,
      language: notif.codeLanguage || (notif.type === 'script' ? 'sql' : 'text'),
      textMessage: notif.message
    };
  }

  // Detectar bloques de código markdown ```sql ... ```
  const codeBlockMatch = notif.message.match(/```(sql|kotlin|text)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    const lang = (codeBlockMatch[1]?.toLowerCase() as 'sql' | 'kotlin') || 'sql';
    const rawCode = codeBlockMatch[2];
    const textWithoutCode = notif.message.replace(/```(sql|kotlin|text)?\s*[\s\S]*?```/g, '').trim();
    return {
      code: rawCode,
      language: lang,
      textMessage: textWithoutCode || notif.message
    };
  }

  return null;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  user,
  notifications,
  onBack,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismissNotification,
  onDismissAllRead,
  onOpenScriptInSqlite
}) => {
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'script' | NotificationType>('all');
  const [isSelectDbModalOpen, setIsSelectDbModalOpen] = useState(false);
  const [pendingScript, setPendingScript] = useState<{ code: string; title: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => !n.readBy.includes(user.uid)).length;
  const scriptsCount = notifications.filter((n) => n.type === 'script' || Boolean(extractNotificationCode(n))).length;

  const filteredNotifications = notifications.filter((n) => {
    const isUnread = !n.readBy.includes(user.uid);
    if (filterType === 'all') return true;
    if (filterType === 'unread') return isUnread;
    if (filterType === 'script') return n.type === 'script' || Boolean(extractNotificationCode(n));
    return n.type === filterType;
  });

  const handleCopyScript = async (e: React.MouseEvent, code: string, id: string) => {
    e.stopPropagation();
    soundService.playToken();
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleOpenSqliteModal = (e: React.MouseEvent, code: string, title: string) => {
    e.stopPropagation();
    soundService.playToken();
    setPendingScript({ code, title });
    setIsSelectDbModalOpen(true);
  };

  const handleDatabaseSelected = (dbId: string) => {
    if (pendingScript && onOpenScriptInSqlite) {
      onOpenScriptInSqlite(pendingScript.code, dbId);
    }
    setIsSelectDbModalOpen(false);
    setPendingScript(null);
  };

  const formatRelativeTime = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;

    return new Date(timestamp).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getTypeMeta = (type: NotificationType) => {
    switch (type) {
      case 'script':
        return {
          label: 'Script de Código',
          icon: <Code2 size={16} color="#0284C7" />,
          bg: '#E0F2FE',
          color: '#0369A1',
          border: '#BAE6FD'
        };
      case 'update':
        return {
          label: 'Actualización',
          icon: <Megaphone size={16} color="#0284C7" />,
          bg: '#E0F2FE',
          color: '#0369A1',
          border: '#BAE6FD'
        };
      case 'observation':
        return {
          label: 'Observación Docente',
          icon: <MessageSquare size={16} color="#D97706" />,
          bg: '#FEF3C7',
          color: '#B45309',
          border: '#FDE68A'
        };
      case 'reminder':
        return {
          label: 'Recordatorio',
          icon: <Clock size={16} color="#64748B" />,
          bg: '#F1F5F9',
          color: '#334155',
          border: '#CBD5E1'
        };
      case 'assignment':
        return {
          label: 'Diagnóstico Asignado',
          icon: <Target size={16} color="#DC2626" />,
          bg: '#FEE2E2',
          color: '#B91C1C',
          border: '#FCA5A5'
        };
      case 'cheer':
        return {
          label: 'Felicitación',
          icon: <Award size={16} color="#16A34A" />,
          bg: '#DCFCE7',
          color: '#15803D',
          border: '#86EFAC'
        };
      default:
        return {
          label: 'Aviso',
          icon: <Bell size={16} color="#0284C7" />,
          bg: '#F0F9FF',
          color: '#0369A1',
          border: '#BAE6FD'
        };
    }
  };

  return (
    <div className="notif-page-root duo-notif-page">
      {/* ═══ CABECERA DUOLINGO 3D ═══ */}
      <div className="notif-page-header duo-notif-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <button
            type="button"
            className="duo-3d-back-btn"
            onClick={() => {
              soundService.playToken();
              onBack();
            }}
            title="Volver a la ruta de aprendizaje"
            aria-label="Volver"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </button>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 className="notif-page-title duo-notif-title">NOTIFICACIONES</h1>
              {unreadCount > 0 && (
                <span className="duo-3d-unread-pill">
                  {unreadCount} {unreadCount === 1 ? 'NUEVA' : 'NUEVAS'}
                </span>
              )}
            </div>
            <p className="notif-page-subtitle duo-notif-sub">
              Avisos pedagógicos, notas del docente y novedades del curso
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {unreadCount > 0 && (
            <button
              type="button"
              className="duo-3d-btn green sm"
              onClick={() => {
                soundService.playToken();
                onMarkAllAsRead();
              }}
              title="Marcar todas las notificaciones como leídas"
            >
              <CheckCheck size={16} strokeWidth={2.8} />
              <span className="notif-mark-all-text">MARCAR LEÍDAS</span>
            </button>
          )}

          {notifications.length > 0 && onDismissAllRead && (
            <button
              type="button"
              className="duo-3d-btn gray sm"
              onClick={() => {
                soundService.playToken();
                onDismissAllRead();
              }}
              title="Limpiar los avisos leídos de mi bandeja"
            >
              <Trash2 size={15} />
              <span className="notif-mark-all-text">LIMPIAR BANDEJA</span>
            </button>
          )}
        </div>
      </div>

      {/* ═══ FILTROS DUOLINGO 3D ═══ */}
      <div className="notif-filter-bar duo-filter-row">
        <button
          type="button"
          className={`duo-3d-filter-chip ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('all');
          }}
        >
          TODAS ({notifications.length})
        </button>

        <button
          type="button"
          className={`duo-3d-filter-chip ${filterType === 'unread' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('unread');
          }}
        >
          NO LEÍDAS ({unreadCount})
        </button>

        <button
          type="button"
          className={`duo-3d-filter-chip ${filterType === 'script' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('script');
          }}
        >
          SCRIPTS ({scriptsCount})
        </button>

        <button
          type="button"
          className={`duo-3d-filter-chip ${filterType === 'observation' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('observation');
          }}
        >
          OBSERVACIONES
        </button>

        <button
          type="button"
          className={`duo-3d-filter-chip ${filterType === 'update' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('update');
          }}
        >
          ACTUALIZACIONES
        </button>

        <button
          type="button"
          className={`duo-3d-filter-chip ${filterType === 'reminder' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('reminder');
          }}
        >
          RECORDATORIOS
        </button>
      </div>

      {/* ═══ LISTA DE NOTIFICACIONES DUOLINGO 3D ═══ */}
      <div className="notif-list-container">
        {filteredNotifications.length === 0 ? (
          <div className="notif-empty-state duo-notif-empty">
            <div className="duo-empty-icon-box">
              <Bell size={38} color="#0284C7" strokeWidth={2.5} />
            </div>
            <h3 className="duo-empty-title">
              {filterType === 'unread' ? '¡ESTÁS AL DÍA!' : filterType === 'script' ? 'NO HAY SCRIPTS COMPARTIDOS' : 'NO HAY NOTIFICACIONES'}
            </h3>
            <p className="duo-empty-desc">
              {filterType === 'unread'
                ? 'Has leído todos tus avisos y comunicados pendientes.'
                : filterType === 'script'
                ? 'Aún no tienes scripts o fragmentos de código compartidos por tu profesor.'
                : 'Tu bandeja personal está limpia. Cuando el docente o el sistema emita un aviso, aparecerá aquí inmediatamente en tiempo real.'}
            </p>
            <button
              type="button"
              className="duo-3d-btn blue sm"
              style={{ marginTop: 12 }}
              onClick={() => {
                soundService.playToken();
                onBack();
              }}
            >
              VOLVER A LA RUTA
            </button>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const isUnread = !notif.readBy.includes(user.uid);
            const extractedCode = extractNotificationCode(notif);
            const meta = getTypeMeta(notif.type);

            return (
              <article
                key={notif.id}
                className={`duo-3d-notif-card ${isUnread ? 'unread' : 'read'}`}
                onClick={() => {
                  if (isUnread) {
                    soundService.playToken();
                    onMarkAsRead(notif.id);
                  }
                }}
              >
                {/* Cabecera del aviso Duolingo 3D */}
                <div className="notif-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span
                      className="duo-3d-tag"
                      style={{
                        background: extractedCode
                          ? (extractedCode.language === 'sql' ? '#E0F2FE' : '#F3E8FF')
                          : meta.bg,
                        color: extractedCode
                          ? (extractedCode.language === 'sql' ? '#0369A1' : '#6B21A8')
                          : meta.color,
                        borderColor: extractedCode
                          ? (extractedCode.language === 'sql' ? '#BAE6FD' : '#DDD6FE')
                          : meta.border
                      }}
                    >
                      {extractedCode ? (
                        extractedCode.language === 'sql' ? (
                          <Database size={14} color="#0284C7" strokeWidth={2.5} />
                        ) : (
                          <Code2 size={14} color="#7C3AED" strokeWidth={2.5} />
                        )
                      ) : (
                        meta.icon
                      )}
                      <span>
                        {extractedCode
                          ? (extractedCode.language === 'sql' ? 'SCRIPT SQL' : extractedCode.language === 'kotlin' ? 'CÓDIGO KOTLIN' : 'SCRIPT')
                          : meta.label.toUpperCase()}
                      </span>
                    </span>

                    <span className="notif-sender-label">
                      De: <strong>{notif.sender || 'Profesor'}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="notif-time-text">
                      {formatRelativeTime(notif.createdAt)}
                    </span>
                    {isUnread && <span className="duo-unread-glow-dot" title="Aviso sin leer" />}

                    {/* BOTÓN INDIVIDUAL PARA ELIMINAR DE MI BANDEJA */}
                    <button
                      type="button"
                      className="duo-notif-dismiss-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundService.playToken();
                        onDismissNotification(notif.id);
                      }}
                      title="Eliminar de mi bandeja personal (Se conserva en el registro de Seguimiento del profesor)"
                      aria-label="Eliminar de mi bandeja"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Título */}
                <h3 className="notif-card-title duo-card-h3">{notif.title}</h3>

                {/* Mensaje descriptivo */}
                {extractedCode?.textMessage ? (
                  <p className="notif-card-message duo-card-p">{extractedCode.textMessage}</p>
                ) : (
                  !extractedCode && <p className="notif-card-message duo-card-p">{notif.message}</p>
                )}

                {/* Bloque de Código de Alta Fidelidad - Preservando exactamente espacios e indentación */}
                {extractedCode && (
                  <div className="notif-code-block-wrapper" onClick={(e) => e.stopPropagation()}>
                    <div className="notif-code-block-header">
                      <div className="notif-code-lang-tag">
                        {extractedCode.language === 'sql' ? (
                          <Database size={14} color="#38BDF8" strokeWidth={2.5} />
                        ) : (
                          <Code2 size={14} color="#A78BFA" strokeWidth={2.5} />
                        )}
                        <span>{extractedCode.language === 'sql' ? 'SQL SCRIPT' : extractedCode.language === 'kotlin' ? 'KOTLIN' : 'SCRIPT'}</span>
                        <span className="notif-code-line-count">
                          ({extractedCode.code.split('\n').length} líneas)
                        </span>
                      </div>

                      <div className="notif-code-actions">
                        {/* BOTÓN COPIAR SCRIPT */}
                        <button
                          type="button"
                          className="notif-code-btn copy-btn"
                          onClick={(e) => handleCopyScript(e, extractedCode.code, notif.id)}
                          title="Copiar script exactamente con todo su formato al portapapeles"
                        >
                          {copiedId === notif.id ? (
                            <>
                              <Check size={14} strokeWidth={3} color="#22C55E" />
                              <span style={{ color: '#22C55E', fontWeight: 900 }}>¡COPIADO!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} strokeWidth={2.5} />
                              <span>COPIAR</span>
                            </>
                          )}
                        </button>

                        {/* BOTÓN ABRIR EN SQLITE LAB (Solo si es SQL) */}
                        {extractedCode.language === 'sql' && onOpenScriptInSqlite && (
                          <button
                            type="button"
                            className="notif-code-btn open-sqlite-btn"
                            onClick={(e) => handleOpenSqliteModal(e, extractedCode.code, notif.title)}
                            title="Seleccionar en cuál Base de Datos abrir y ejecutar este script"
                          >
                            <Play size={13} fill="#0369A1" color="#0369A1" />
                            <span>ABRIR EN SQLITE LAB</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* CUERPO DEL CÓDIGO - PRESERVANDO FORMATO, ESPACIOS E IDENTADO EXACTOS */}
                    <div className="notif-code-pre-scroll">
                      <pre className="notif-code-pre">
                        <code>{extractedCode.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Footer de acción táctil */}
                <div className="notif-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  {isUnread ? (
                    <span className="duo-tap-read-hint">TOCA PARA MARCAR COMO LEÍDO</span>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.74rem', color: '#64748B', fontWeight: 800 }}>
                      <Check size={13} strokeWidth={3} /> Leído
                    </span>
                  )}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      soundService.playToken();
                      onDismissNotification(notif.id);
                    }}
                    style={{
                      fontSize: '0.74rem',
                      color: '#EF4444',
                      fontWeight: 800,
                      cursor: 'pointer',
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}
                    title="Eliminar este aviso de tu bandeja personal"
                  >
                    Eliminar de mi bandeja
                  </span>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Modal para seleccionar en cuál Base de Datos abrir el script */}
      <SelectDatabaseModal
        isOpen={isSelectDbModalOpen}
        onClose={() => {
          setIsSelectDbModalOpen(false);
          setPendingScript(null);
        }}
        onSelectDatabase={handleDatabaseSelected}
        userId={user.uid}
        scriptSnippet={pendingScript?.code}
        scriptTitle={pendingScript?.title}
      />
    </div>
  );
};
