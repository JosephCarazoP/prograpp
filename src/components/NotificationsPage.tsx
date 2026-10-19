import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  Megaphone,
  MessageSquare,
  Clock,
  Target,
  Award
} from 'lucide-react';
import { AppNotification, NotificationType } from '../types/notification';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';

interface NotificationsPageProps {
  user: UserProfile;
  notifications: AppNotification[];
  onBack: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  user,
  notifications,
  onBack,
  onMarkAsRead,
  onMarkAllAsRead
}) => {
  const [filterType, setFilterType] = useState<'all' | 'unread' | NotificationType>('all');

  const unreadCount = notifications.filter((n) => !n.readBy.includes(user.uid)).length;

  const filteredNotifications = notifications.filter((n) => {
    const isUnread = !n.readBy.includes(user.uid);
    if (filterType === 'all') return true;
    if (filterType === 'unread') return isUnread;
    return n.type === filterType;
  });

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
    <div className="notif-page-root">
      {/* Barra Superior de la Página */}
      <div className="notif-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            className="notif-back-btn"
            onClick={() => {
              soundService.playToken();
              onBack();
            }}
            title="Volver a la ruta"
            aria-label="Volver"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 className="notif-page-title">Avisos y Notificaciones</h1>
              {unreadCount > 0 && (
                <span className="notif-unread-pill">
                  {unreadCount} {unreadCount === 1 ? 'nuevo' : 'nuevos'}
                </span>
              )}
            </div>
            <p className="notif-page-subtitle">
              Comunicados de tus profesores, actualizaciones de retos y observaciones de clase
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            className="notif-mark-all-btn"
            onClick={() => {
              soundService.playToken();
              onMarkAllAsRead();
            }}
            title="Marcar todas las notificaciones como leídas"
          >
            <CheckCheck size={16} />
            <span className="notif-mark-all-text">Marcar todo leído</span>
          </button>
        )}
      </div>

      {/* Barra de Filtros Compacta */}
      <div className="notif-filter-bar">
        <button
          type="button"
          className={`notif-filter-chip ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('all');
          }}
        >
          Todas ({notifications.length})
        </button>

        <button
          type="button"
          className={`notif-filter-chip ${filterType === 'unread' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('unread');
          }}
        >
          No leídas ({unreadCount})
        </button>

        <button
          type="button"
          className={`notif-filter-chip ${filterType === 'observation' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('observation');
          }}
        >
          Observaciones
        </button>

        <button
          type="button"
          className={`notif-filter-chip ${filterType === 'update' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('update');
          }}
        >
          Actualizaciones
        </button>

        <button
          type="button"
          className={`notif-filter-chip ${filterType === 'reminder' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setFilterType('reminder');
          }}
        >
          Recordatorios
        </button>
      </div>

      {/* Lista de Notificaciones Organizada y Compacta */}
      <div className="notif-list-container">
        {filteredNotifications.length === 0 ? (
          <div className="notif-empty-state">
            <div className="notif-empty-icon">
              <Bell size={36} color="#94A3B8" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', margin: '0 0 4px 0' }}>
              No hay avisos en esta categoría
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0, maxWidth: 320 }}>
              {filterType === 'unread'
                ? '¡Estás al día! Has leído todas tus notificaciones.'
                : 'Cuando tu profesor o el sistema envíen un comunicado, aparecerá aquí.'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const isUnread = !notif.readBy.includes(user.uid);
            const meta = getTypeMeta(notif.type);

            return (
              <article
                key={notif.id}
                className={`notif-card ${isUnread ? 'unread' : 'read'}`}
                onClick={() => {
                  if (isUnread) {
                    soundService.playToken();
                    onMarkAsRead(notif.id);
                  }
                }}
              >
                {/* Cabecera del aviso: Tipo + Remitente + Fecha + Punto no leído */}
                <div className="notif-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                    <span
                      className="notif-type-tag"
                      style={{
                        background: meta.bg,
                        color: meta.color,
                        borderColor: meta.border
                      }}
                    >
                      {meta.icon}
                      <span>{meta.label}</span>
                    </span>

                    <span className="notif-sender-label">
                      De: <strong>{notif.sender || 'Profesor'}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="notif-time-text">
                      {formatRelativeTime(notif.createdAt)}
                    </span>
                    {isUnread && <span className="notif-unread-dot" title="Aviso sin leer" />}
                  </div>
                </div>

                {/* Título y Mensaje */}
                <h3 className="notif-card-title">{notif.title}</h3>
                <p className="notif-card-message">{notif.message}</p>

                {/* Footer de acción compacta */}
                {isUnread && (
                  <div className="notif-card-footer">
                    <span className="notif-tap-hint">Toca para marcar como leído</span>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
