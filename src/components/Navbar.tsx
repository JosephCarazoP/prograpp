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
  Users,
  Bell,
  Menu,
  X,
  Zap,
  ShoppingBag,
  Heart
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

            {/* Tienda y Vestidor de Byte */}
            {onOpenLocker && (
              <button
                className="nav-icon-btn"
                onClick={() => {
                  soundService.playToken();
                  onOpenLocker();
                }}
                title="Tienda de Byte y Vestidor 3D"
                type="button"
                aria-label="Abrir Tienda de Byte"
                style={{ color: '#0284C7' }}
              >
                <ShoppingBag size={18} strokeWidth={2.4} />
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
            {/* ═══ CABECERA DUOLINGO 3D ═══ */}
            <div className="hb-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div className="duo-hb-avatar-ring">
                  <DevAvatar avatarId={user?.avatarId || 'robot_byte'} size={46} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="duo-hb-user-name">
                    {user?.displayName || 'Desarrollador'}
                  </div>
                  <div className="duo-hb-user-sub">
                    <span className="duo-hb-code-tag">[{user?.studentCode || 'E01'}]</span>
                    <span>•</span>
                    <span>{user?.group || 'Grupo A'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="duo-3d-close-btn"
                onClick={() => {
                  soundService.playToken();
                  setIsDrawerOpen(false);
                }}
                aria-label="Cerrar Menú"
              >
                <X size={18} strokeWidth={2.8} />
              </button>
            </div>

            {/* ═══ BARRA DE RECURSOS DUOLINGO 3D ═══ */}
            <div className="hb-drawer-stats">
              <div className="hb-stat-box streak">
                <Flame size={18} color="#FF9600" fill="#FF9600" strokeWidth={2.5} />
                <span className="hb-stat-val">{user?.streak?.count ?? 0}</span>
                <span className="hb-stat-lbl">RACHA</span>
              </div>
              <div className="hb-stat-box bytes">
                <Zap size={18} color="#1CB0F6" fill="#1CB0F6" strokeWidth={2.5} />
                <span className="hb-stat-val">{user?.bytes ?? 0}</span>
                <span className="hb-stat-lbl">BYTES</span>
              </div>
              <div className="hb-stat-box hearts">
                <Heart size={18} color="#FF4B4B" fill="#FF4B4B" strokeWidth={2.5} />
                <span className="hb-stat-val">{user?.batteries ?? 5}/5</span>
                <span className="hb-stat-lbl">VIDAS</span>
              </div>
            </div>

            {/* ═══ LISTA DE ACCIONES DUOLINGO 3D ═══ */}
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
                <div className="hb-menu-icon" style={{ background: user.currentPath === 'kotlin' ? '#CE82FF' : '#1CB0F6', color: '#FFFFFF', boxShadow: user.currentPath === 'kotlin' ? '0 3.5px 0 #A559D9' : '0 3.5px 0 #1899D6' }}>
                  {user.currentPath === 'kotlin' ? <Code2 size={20} strokeWidth={2.6} /> : <Database size={20} strokeWidth={2.6} />}
                </div>
                <div className="hb-menu-text">
                  <div className="hb-menu-title">CAMBIAR A {user.currentPath === 'kotlin' ? 'SQL' : 'KOTLIN'}</div>
                  <div className="hb-menu-desc">Ruta activa: {user.currentPath === 'kotlin' ? 'Kotlin' : 'SQL'}</div>
                </div>
              </button>

              {/* Mi Perfil */}
              <button
                type="button"
                className="hb-menu-item"
                onClick={() => {
                  soundService.playToken();
                  setIsDrawerOpen(false);
                  onOpenProfile();
                }}
              >
                <div className="hb-menu-icon" style={{ background: '#58CC02', color: '#FFFFFF', boxShadow: '0 3.5px 0 #46A302' }}>
                  <DevAvatar avatarId={user?.avatarId || 'robot_byte'} size={24} />
                </div>
                <div className="hb-menu-text">
                  <div className="hb-menu-title">MI PERFIL</div>
                  <div className="hb-menu-desc">Estadísticas, medallas y cuenta</div>
                </div>
              </button>

              {/* Tienda de Byte y Vestidor 3D */}
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
                  <div className="hb-menu-icon" style={{ background: '#1CB0F6', color: '#FFFFFF', boxShadow: '0 3.5px 0 #1899D6' }}>
                    <ShoppingBag size={20} strokeWidth={2.6} />
                  </div>
                  <div className="hb-menu-text">
                    <div className="hb-menu-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>TIENDA DE BYTE</span>
                      <span className="hb-menu-badge" style={{ background: '#FEF9C3', color: '#854D0E', border: '1px solid #FDE047' }}>3D</span>
                    </div>
                    <div className="hb-menu-desc">Skins de Byte, vidas y potenciadores</div>
                  </div>
                </button>
              )}

              {/* Misiones Diarias */}
              <button
                type="button"
                className="hb-menu-item"
                onClick={() => {
                  soundService.playToken();
                  setIsDrawerOpen(false);
                  onOpenQuests();
                }}
              >
                <div className="hb-menu-icon" style={{ background: '#FFC800', color: '#FFFFFF', boxShadow: '0 3.5px 0 #E5A500' }}>
                  <Target size={20} strokeWidth={2.8} />
                </div>
                <div className="hb-menu-text">
                  <div className="hb-menu-title">MISIONES DIARIAS</div>
                  <div className="hb-menu-desc">Retos del día y recompensas XP</div>
                </div>
              </button>

              {/* Notificaciones y Avisos */}
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
                  <div className="hb-menu-icon" style={{ background: '#FF9600', color: '#FFFFFF', boxShadow: '0 3.5px 0 #CC7A00' }}>
                    <Bell size={20} strokeWidth={2.6} />
                  </div>
                  <div className="hb-menu-text">
                    <div className="hb-menu-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>NOTIFICACIONES</span>
                      {(unreadNotificationsCount ?? 0) > 0 && (
                        <span className="hb-menu-badge red">{unreadNotificationsCount} NUEVAS</span>
                      )}
                    </div>
                    <div className="hb-menu-desc">Comunicados del docente y retos</div>
                  </div>
                </button>
              )}

              {/* Efectos de Sonido */}
              <button
                type="button"
                className="hb-menu-item"
                onClick={(e) => {
                  handleSoundToggle(e);
                }}
              >
                <div className="hb-menu-icon" style={{ background: isMuted ? '#E5E5E5' : '#22C55E', color: isMuted ? '#777777' : '#FFFFFF', boxShadow: isMuted ? '0 3.5px 0 #CECECE' : '0 3.5px 0 #16A34A' }}>
                  {isMuted ? <VolumeX size={20} strokeWidth={2.6} /> : <Volume2 size={20} strokeWidth={2.6} />}
                </div>
                <div className="hb-menu-text">
                  <div className="hb-menu-title">EFECTOS DE SONIDO</div>
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
                  <div className="hb-menu-icon" style={{ background: '#FF9600', color: '#FFFFFF', boxShadow: '0 3.5px 0 #CC7A00' }}>
                    <ShieldCheck size={20} strokeWidth={2.6} />
                  </div>
                  <div className="hb-menu-text">
                    <div className="hb-menu-title">SEGUIMIENTO DOCENTE</div>
                    <div className="hb-menu-desc">Panel pedagógico e investigación</div>
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
                  <div className="hb-menu-icon" style={{ background: '#58CC02', color: '#FFFFFF', boxShadow: '0 3.5px 0 #46A302' }}>
                    <Users size={20} strokeWidth={2.6} />
                  </div>
                  <div className="hb-menu-text">
                    <div className="hb-menu-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>USUARIOS EN LÍNEA</span>
                      {onlineUsersCount > 0 && <span className="hb-menu-badge green">{onlineUsersCount} ACTIVOS</span>}
                    </div>
                    <div className="hb-menu-desc">Alumnos conectados en tiempo real</div>
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
                  <div className="hb-menu-icon" style={{ background: '#FF4B4B', color: '#FFFFFF', boxShadow: '0 3.5px 0 #D33131' }}>
                    <LogOut size={20} strokeWidth={2.6} />
                  </div>
                  <div className="hb-menu-text">
                    <div className="hb-menu-title" style={{ color: '#EA2B2B' }}>CERRAR SESIÓN</div>
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
