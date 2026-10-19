import React, { useState } from 'react';
import {
  Flame,
  Code2,
  Database,
  Target,
  Volume2,
  VolumeX,
  ChevronDown,
  ShieldCheck,
  LogOut,
  Shirt,
  Users,
  Bell,
  Menu,
  X,
  Sparkles,
  Zap
} from 'lucide-react';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { DevAvatar } from './Avatars';

interface NavbarProps {
  user: UserProfile;
  isAdmin?: boolean;
  onlineUsersCount?: number;
  unreadNotificationsCount?: number;
  onPathToggle: () => void;
  onOpenQuests: () => void;
  onOpenPractice?: () => void;
  onOpenProfile: () => void;
  onOpenStreak?: () => void;
  onOpenAcademic?: () => void;
  onOpenLiveUsers?: () => void;
  onOpenLocker?: () => void;
  onOpenNotifications?: () => void;
  onSignOut?: () => void;
  onLogoClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  isAdmin = false,
  onlineUsersCount = 0,
  unreadNotificationsCount = 0,
  onPathToggle,
  onOpenQuests,
  onOpenProfile,
  onOpenStreak,
  onOpenAcademic,
  onOpenLiveUsers,
  onOpenLocker,
  onOpenNotifications,
  onSignOut,
  onLogoClick: _onLogoClick
}) => {
  const [isMuted, setIsMuted] = useState(soundService.getMuted());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isTeacherAdmin = Boolean(
    isAdmin || (user?.email && user.email.toLowerCase() === 'josephcarazo56@gmail.com')
  );

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = soundService.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundService.playToken();
  };

  return (
    <>
      <header className="top-nav" role="banner">
        {/* Lado Izquierdo: Selector de Ruta Compacto */}
        <div className="nav-left">
          <button
            className="course-switcher-btn"
            onClick={() => {
              soundService.playToken();
              onPathToggle();
            }}
            title="Cambiar entre la ruta de Kotlin y SQL"
            type="button"
          >
            {user.currentPath === 'kotlin' ? (
              <>
                <Code2 size={17} color="#38BDF8" strokeWidth={2.5} />
                <span className="course-switcher-text">Kotlin</span>
              </>
            ) : (
              <>
                <Database size={17} color="#60A5FA" strokeWidth={2.5} />
                <span className="course-switcher-text">SQL</span>
              </>
            )}
            <ChevronDown size={13} color="#94A3B8" strokeWidth={2.5} />
          </button>
        </div>

        {/* Lado Derecho: Indicadores Esenciales y Acciones */}
        <div className="nav-right">
          {/* Racha Diaria (Visible en móvil y escritorio) */}
          <button
            className={`stat-pill streak ${(user?.streak?.count ?? 0) === 0 ? 'streak-zero' : ''}`}
            onClick={() => {
              soundService.playToken();
              onOpenStreak?.();
            }}
            title={(user?.streak?.count ?? 0) === 0 ? 'Día 0 de racha. ¡Toca para ver cómo activarla!' : `Racha activa de ${user?.streak?.count} días`}
            type="button"
          >
            <Flame
              size={17}
              color={(user?.streak?.count ?? 0) === 0 ? '#94A3B8' : '#FF9500'}
              fill={(user?.streak?.count ?? 0) === 0 ? '#94A3B8' : '#FF9500'}
            />
            <span className="stat-number">{user?.streak?.count ?? 0}</span>
          </button>

          {/* Botón de Notificaciones y Avisos (Visible siempre) */}
          {onOpenNotifications && (
            <button
              className="nav-icon-btn nav-notif-btn"
              onClick={() => {
                soundService.playToken();
                onOpenNotifications();
              }}
              title="Avisos y Notificaciones"
              type="button"
              aria-label="Abrir Notificaciones"
              style={{ position: 'relative', color: (unreadNotificationsCount ?? 0) > 0 ? '#D97706' : '#64748B' }}
            >
              <Bell size={18} strokeWidth={2.4} />
              {(unreadNotificationsCount ?? 0) > 0 && (
                <span className="nav-notif-badge">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          )}

          {/* Botones Solo de Escritorio / Tablet */}
          <div className="nav-desktop-actions">
            {/* Misiones Diarias */}
            <button
              className="nav-icon-btn"
              onClick={() => {
                soundService.playToken();
                onOpenQuests();
              }}
              title="Misiones Diarias y Objetivos"
              type="button"
              aria-label="Abrir Misiones Diarias"
            >
              <Target size={18} color="#F59E0B" strokeWidth={2.5} />
            </button>

            {/* Vestidor de Byte */}
            {onOpenLocker && (
              <button
                className="nav-icon-btn"
                onClick={() => {
                  soundService.playToken();
                  onOpenLocker();
                }}
                title="Vestidor 3D de Byte (Skins y Trajes)"
                type="button"
                aria-label="Abrir Vestidor de Byte"
                style={{ color: '#0EA5E9' }}
              >
                <Shirt size={18} strokeWidth={2.4} />
              </button>
            )}

            {/* Silencio / Audio */}
            <button
              className="nav-icon-btn sound-toggle"
              onClick={handleSoundToggle}
              title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
              type="button"
            >
              {isMuted ? <VolumeX size={17} color="#64748B" /> : <Volume2 size={17} color="#4ADE80" />}
            </button>

            {/* Avatar -> Perfil */}
            <button
              className="nav-avatar-btn"
              onClick={() => {
                soundService.playToken();
                onOpenProfile();
              }}
              title="Mi Perfil de Desarrollador"
              type="button"
              aria-label="Abrir Mi Perfil"
            >
              <DevAvatar avatarId={user?.avatarId || 'robot_byte'} size={32} />
            </button>

            {/* Docente: Seguimiento */}
            {isTeacherAdmin && onOpenAcademic && (
              <button
                className="btn-3d btn-orange nav-admin-btn"
                onClick={() => {
                  soundService.playToken();
                  onOpenAcademic();
                }}
                title="Seguimiento Académico (Exclusivo Docente)"
                aria-label="Seguimiento Académico"
                type="button"
              >
                <ShieldCheck size={15} color="#FFFFFF" strokeWidth={2.5} />
                <span className="nav-admin-label">Seguimiento</span>
              </button>
            )}

            {/* Docente: En Línea */}
            {isTeacherAdmin && onOpenLiveUsers && (
              <button
                className="btn-3d btn-green nav-live-users-btn"
                onClick={() => {
                  soundService.playToken();
                  onOpenLiveUsers();
                }}
                title="Usuarios en Línea en Tiempo Real"
                aria-label="Usuarios en Línea"
                type="button"
              >
                <span className="live-pulsing-dot" />
                <Users size={15} color="#FFFFFF" strokeWidth={2.5} />
                <span className="nav-live-users-label">
                  En Línea{onlineUsersCount > 0 ? ` (${onlineUsersCount})` : ''}
                </span>
              </button>
            )}

            {/* Cerrar Sesión */}
            {onSignOut && (
              <button
                className="nav-icon-btn"
                onClick={onSignOut}
                title="Cerrar Sesión Segura"
                type="button"
                style={{ color: '#F87171' }}
              >
                <LogOut size={16} />
              </button>
            )}
          </div>

          {/* Botón Menú Hamburguesa para Móvil (hb-nav) */}
          <button
            type="button"
            className="nav-mobile-hamburger-btn"
            onClick={() => {
              soundService.playToken();
              setIsDrawerOpen(true);
            }}
            title="Abrir Menú de Navegación"
            aria-label="Menú de Navegación"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* DRAWER MÓVIL HAMBURGUESA (HB-NAV) */}
      {isDrawerOpen && (
        <div
          className="hb-drawer-backdrop"
          onClick={() => setIsDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="hb-drawer-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Drawer */}
            <div className="hb-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <DevAvatar avatarId={user?.avatarId || 'robot_byte'} size={42} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.displayName || 'Desarrollador'}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B', display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#0284C7' }}>[{user?.studentCode || 'E01'}]</span>
                    <span>•</span>
                    <span>{user?.group || 'Grupo A'}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="hb-drawer-close-btn"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Cerrar Menú"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="hb-drawer-stats">
              <div className="hb-stat-box">
                <Flame size={16} color="#FF9500" fill="#FF9500" />
                <span className="hb-stat-val">{user?.streak?.count ?? 0}</span>
                <span className="hb-stat-lbl">Racha</span>
              </div>
              <div className="hb-stat-box">
                <Sparkles size={16} color="#0EA5E9" />
                <span className="hb-stat-val">{user?.bytes ?? 0}</span>
                <span className="hb-stat-lbl">Bytes</span>
              </div>
              <div className="hb-stat-box">
                <Zap size={16} color="#22C55E" />
                <span className="hb-stat-val">{user?.batteries ?? 5}/5</span>
                <span className="hb-stat-lbl">Vidas</span>
              </div>
            </div>

            {/* Lista de Acciones y Enlaces */}
            <div className="hb-drawer-menu">
              {/* Cambiar Ruta */}
              <button
                type="button"
                className="hb-menu-item"
                onClick={() => {
                  soundService.playToken();
                  setIsDrawerOpen(false);
                  onPathToggle();
                }}
              >
                <div className="hb-menu-icon" style={{ background: user.currentPath === 'kotlin' ? '#EDE9FE' : '#E0F2FE', color: user.currentPath === 'kotlin' ? '#7C3AED' : '#0284C7' }}>
                  {user.currentPath === 'kotlin' ? <Code2 size={19} /> : <Database size={19} />}
                </div>
                <div className="hb-menu-text">
                  <div className="hb-menu-title">Cambiar a {user.currentPath === 'kotlin' ? 'SQL' : 'Kotlin'}</div>
                  <div className="hb-menu-desc">Ruta activa actual: {user.currentPath === 'kotlin' ? 'Kotlin' : 'SQL'}</div>
                </div>
              </button>

              {/* Perfil */}
              <button
                type="button"
                className="hb-menu-item"
                onClick={() => {
                  soundService.playToken();
                  setIsDrawerOpen(false);
                  onOpenProfile();
                }}
              >
                <div className="hb-menu-icon" style={{ background: '#F1F5F9', color: '#475569' }}>
                  <DevAvatar avatarId={user?.avatarId || 'robot_byte'} size={22} />
                </div>
                <div className="hb-menu-text">
                  <div className="hb-menu-title">Mi Perfil</div>
                  <div className="hb-menu-desc">Estadísticas, medallas y cuenta</div>
                </div>
              </button>

              {/* Vestidor */}
              {onOpenLocker && (
                <button
                  type="button"
                  className="hb-menu-item"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onOpenLocker();
                  }}
                >
                  <div className="hb-menu-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                    <Shirt size={19} />
                  </div>
                  <div className="hb-menu-text">
                    <div className="hb-menu-title">Vestidor 3D de Byte</div>
                    <div className="hb-menu-desc">Catálogo de skins y personalización</div>
                  </div>
                </button>
              )}

              {/* Misiones */}
              <button
                type="button"
                className="hb-menu-item"
                onClick={() => {
                  soundService.playToken();
                  setIsDrawerOpen(false);
                  onOpenQuests();
                }}
              >
                <div className="hb-menu-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <Target size={19} />
                </div>
                <div className="hb-menu-text">
                  <div className="hb-menu-title">Misiones Diarias</div>
                  <div className="hb-menu-desc">Retos del día y recompensas</div>
                </div>
              </button>

              {/* Notificaciones */}
              {onOpenNotifications && (
                <button
                  type="button"
                  className="hb-menu-item"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onOpenNotifications();
                  }}
                >
                  <div className="hb-menu-icon" style={{ background: '#FEF3C7', color: '#B45309' }}>
                    <Bell size={19} />
                  </div>
                  <div className="hb-menu-text">
                    <div className="hb-menu-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>Avisos y Notificaciones</span>
                      {(unreadNotificationsCount ?? 0) > 0 && (
                        <span className="hb-menu-badge">{unreadNotificationsCount} nuevos</span>
                      )}
                    </div>
                    <div className="hb-menu-desc">Comunicados del profesor y novedades</div>
                  </div>
                </button>
              )}

              {/* Sonido */}
              <button
                type="button"
                className="hb-menu-item"
                onClick={(e) => {
                  handleSoundToggle(e);
                }}
              >
                <div className="hb-menu-icon" style={{ background: isMuted ? '#F1F5F9' : '#DCFCE7', color: isMuted ? '#64748B' : '#16A34A' }}>
                  {isMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}
                </div>
                <div className="hb-menu-text">
                  <div className="hb-menu-title">Efectos de Sonido</div>
                  <div className="hb-menu-desc">{isMuted ? 'Silenciado (Toca para activar)' : 'Activado (Toca para silenciar)'}</div>
                </div>
              </button>

              {/* Docente / Admin: Seguimiento */}
              {isTeacherAdmin && onOpenAcademic && (
                <button
                  type="button"
                  className="hb-menu-item admin"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onOpenAcademic();
                  }}
                >
                  <div className="hb-menu-icon" style={{ background: '#FFEDD5', color: '#EA580C' }}>
                    <ShieldCheck size={19} />
                  </div>
                  <div className="hb-menu-text">
                    <div className="hb-menu-title">Seguimiento Académico</div>
                    <div className="hb-menu-desc">Panel docente y análisis de investigación</div>
                  </div>
                </button>
              )}

              {/* Docente / Admin: Usuarios en Línea */}
              {isTeacherAdmin && onOpenLiveUsers && (
                <button
                  type="button"
                  className="hb-menu-item admin"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onOpenLiveUsers();
                  }}
                >
                  <div className="hb-menu-icon" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                    <Users size={19} />
                  </div>
                  <div className="hb-menu-text">
                    <div className="hb-menu-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>Usuarios en Línea</span>
                      {onlineUsersCount > 0 && <span className="hb-menu-badge green">{onlineUsersCount} activos</span>}
                    </div>
                    <div className="hb-menu-desc">Presencia en tiempo real en la plataforma</div>
                  </div>
                </button>
              )}

              {/* Cerrar Sesión */}
              {onSignOut && (
                <button
                  type="button"
                  className="hb-menu-item logout"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onSignOut();
                  }}
                >
                  <div className="hb-menu-icon" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                    <LogOut size={19} />
                  </div>
                  <div className="hb-menu-text">
                    <div className="hb-menu-title" style={{ color: '#DC2626' }}>Cerrar Sesión</div>
                    <div className="hb-menu-desc">Salir de tu cuenta en este dispositivo</div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
