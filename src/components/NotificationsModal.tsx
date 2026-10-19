import React from 'react';
import {
  X,
  Bell,
  CheckCheck,
  Megaphone,
  MessageSquare,
  Clock,
  Award,
  Target,
  Sparkles
} from 'lucide-react';
import { AppNotification, NotificationType } from '../types/notification';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  user,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.readBy.includes(user.uid)).length;

  const formatRelativeTime = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 2) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;

    return new Date(timestamp).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'update':
        return {
          icon: <Megaphone size={18} color="#0284C7" />,
          bg: '#E0F2FE',
          border: '#BAE6FD',
          label: 'Actualización'
        };
      case 'observation':
        return {
          icon: <MessageSquare size={18} color="#7C3AED" />,
          bg: '#EDE9FE',
          border: '#DDD6FE',
          label: 'Observación Docente'
        };
      case 'reminder':
        return {
          icon: <Clock size={18} color="#D97706" />,
          bg: '#FEF3C7',
          border: '#FDE68A',
          label: 'Recordatorio'
        };
      case 'cheer':
        return {
          icon: <Award size={18} color="#16A34A" />,
          bg: '#DCFCE7',
          border: '#BBF7D0',
          label: 'Felicitación'
        };
      case 'assignment':
        return {
          icon: <Target size={18} color="#4F46E5" />,
          bg: '#EEF2FF',
          border: '#C7D2FE',
          label: 'Evaluación'
        };
      default:
        return {
          icon: <Bell size={18} color="#64748B" />,
          bg: '#F1F5F9',
          border: '#CBD5E1',
          label: 'Aviso'
        };
    }
  };

  return (
    <div className="locker-modal-backdrop" onClick={onClose} style={{ zIndex: 10000 }}>
      <div
        className="academic-card modal-scale"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '560px',
          maxWidth: '94vw',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '18px 20px',
          borderRadius: 24,
          background: '#FFFFFF',
          border: '3px solid #E2E8F0',
          borderBottom: '6px solid #CBD5E1',
          boxShadow: '0 20px 40px rgba(0,0,0,0.22)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        {/* CABECERA DEL MODAL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 12,
            borderBottom: '2px solid #F1F5F9',
            marginBottom: 12,
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: '#FEF3C7',
                border: '2px solid #FDE68A',
                boxShadow: '0 3px 0 #F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706'
              }}
            >
              <Bell size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>
                  Avisos y Notificaciones
                </h3>
                {unreadCount > 0 && (
                  <span
                    style={{
                      background: '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 900,
                      padding: '2px 7px',
                      borderRadius: 999
                    }}
                  >
                    {unreadCount} nuevas
                  </span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                Novedades de la app y notas de tu profesor
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  soundService.playToken();
                  onMarkAllAsRead();
                }}
                className="btn-3d btn-outline"
                style={{
                  fontSize: '0.72rem',
                  padding: '5px 10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4
                }}
                title="Marcar todas como leídas"
              >
                <CheckCheck size={14} color="#0284C7" />
                <span>Leer todas</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="locker-close-btn"
              title="Cerrar avisos"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* LISTADO DE NOTIFICACIONES CON SCROLL */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }}
        >
          {notifications.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 16px',
                color: '#64748B',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  background: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  marginBottom: 4
                }}
              >
                <Bell size={28} />
              </div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#0F172A' }}>
                Estás al día
              </h4>
              <p style={{ margin: 0, fontSize: '0.84rem', maxWidth: 300 }}>
                No tienes notificaciones pendientes en este momento. ¡Sigue avanzando en tus lecciones!
              </p>
            </div>
          ) : (
            notifications.map((n) => {
              const isRead = n.readBy.includes(user.uid);
              const meta = getNotificationIcon(n.type);

              return (
                <div
                  key={n.id}
                  onClick={() => {
                    if (!isRead) {
                      soundService.playToken();
                      onMarkAsRead(n.id);
                    }
                  }}
                  style={{
                    background: isRead ? '#FFFFFF' : '#F0F9FF',
                    border: isRead ? '1.5px solid #E2E8F0' : '2px solid #BAE6FD',
                    boxShadow: isRead ? '0 2px 0 #E2E8F0' : '0 3px 0 #7DD3FC',
                    borderRadius: 16,
                    padding: '12px 14px',
                    display: 'flex',
                    gap: 12,
                    cursor: isRead ? 'default' : 'pointer',
                    transition: 'all 0.12s ease',
                    position: 'relative'
                  }}
                >
                  {/* Icono del tipo */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: meta.bg,
                      border: `1.5px solid ${meta.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {meta.icon}
                  </div>

                  {/* Contenido */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        marginBottom: 4
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '0.64rem',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            background: meta.bg,
                            color: '#0F172A',
                            border: `1px solid ${meta.border}`,
                            padding: '1.5px 6px',
                            borderRadius: 6
                          }}
                        >
                          {meta.label}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700 }}>
                          {formatRelativeTime(n.createdAt)}
                        </span>
                      </div>

                      {!isRead && (
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#0EA5E9',
                            boxShadow: '0 0 6px rgba(14, 165, 233, 0.6)',
                            flexShrink: 0
                          }}
                          title="No leída"
                        />
                      )}
                    </div>

                    <h4
                      style={{
                        margin: '0 0 4px 0',
                        fontSize: '0.92rem',
                        fontWeight: 900,
                        color: isRead ? '#334155' : '#0F172A',
                        lineHeight: 1.25
                      }}
                    >
                      {n.title}
                    </h4>

                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.82rem',
                        color: '#475569',
                        lineHeight: 1.4,
                        whiteSpace: 'pre-line'
                      }}
                    >
                      {n.message}
                    </p>

                    <div
                      style={{
                        marginTop: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.72rem',
                        color: '#64748B',
                        fontWeight: 700
                      }}
                    >
                      <span>Enviado por: {n.sender}</span>
                      {!isRead && (
                        <span style={{ color: '#0284C7', fontWeight: 800 }}>
                          Toca para marcar como leída
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* PIE DE PÁGINA */}
        <div
          style={{
            marginTop: 12,
            paddingTop: 10,
            borderTop: '1.5px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748B', fontSize: '0.74rem', fontWeight: 700 }}>
            <Sparkles size={13} color="#F59E0B" />
            <span>Notificaciones instantáneas dentro de la app</span>
          </div>

          <button
            type="button"
            className="btn-3d btn-green"
            onClick={onClose}
            style={{ padding: '7px 18px', fontSize: '0.82rem' }}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
