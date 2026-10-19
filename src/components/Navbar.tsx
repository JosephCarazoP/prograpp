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
  ShoppingBag,
  ChevronRight
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
              <DevAvatar
                avatarId={user?.avatarId || 'robot_byte'}
                skinId={user?.equippedSkin}
                size={32}
              />
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

      {/* DRAWER MÓVIL ESTILO DUOLINGO AJUSTES / MENÚ (FOTO 1) */}
      {isDrawerOpen && (
        <div
          className="hb-drawer-backdrop"
          onClick={() => setIsDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="hb-drawer-content duo-settings-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar: Settings / Ajustes + DONE / LISTO */}
            <div className="duo-settings-header">
              <span className="duo-settings-title">Ajustes</span>
              <button
                type="button"
                className="duo-settings-done-btn"
                onClick={() => {
                  soundService.playToken();
                  setIsDrawerOpen(false);
                }}
              >
                LISTO
              </button>
            </div>

            <div className="duo-settings-scroll">
              {/* SECCIÓN 1: CUENTA (Orden fiel a Foto 1: Preferences, Profile, Notifications, Courses) */}
              <div className="duo-settings-group-label">Cuenta</div>
              <div className="duo-settings-table">
                {/* Preferencias / Efectos de Sonido */}
                <button
                  type="button"
                  className="duo-settings-row"
                  onClick={(e) => handleSoundToggle(e)}
                >
                  <span className="duo-settings-row-label">Preferencias</span>
                  <div className="duo-settings-row-right">
                    <span className={`duo-settings-pill-tag ${isMuted ? 'gray' : 'green'}`}>
                      {isMuted ? 'Silenciado' : 'Sonido Activado'}
                    </span>
                    <ChevronRight size={18} color="#AFAFAF" strokeWidth={2.5} />
                  </div>
                </button>

                {/* Perfil */}
                <button
                  type="button"
                  className="duo-settings-row"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onOpenProfile();
                  }}
                >
                  <span className="duo-settings-row-label">Perfil</span>
                  <div className="duo-settings-row-right">
                    <span className="duo-settings-row-sub">{user?.displayName || 'Dev'}</span>
                    <ChevronRight size={18} color="#AFAFAF" strokeWidth={2.5} />
                  </div>
                </button>

                {/* Notificaciones */}
                {onOpenNotifications && (
                  <button
                    type="button"
                    className="duo-settings-row"
                    onClick={() => {
                      soundService.playToken();
                      setIsDrawerOpen(false);
                      onOpenNotifications();
                    }}
                  >
                    <span className="duo-settings-row-label">Notificaciones</span>
                    <div className="duo-settings-row-right">
                      {(unreadNotificationsCount ?? 0) > 0 && (
                        <span className="duo-settings-pill-tag red">
                          {unreadNotificationsCount} NUEVAS
                        </span>
                      )}
                      <ChevronRight size={18} color="#AFAFAF" strokeWidth={2.5} />
                    </div>
                  </button>
                )}

                {/* Cursos */}
                <button
                  type="button"
                  className="duo-settings-row"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onPathToggle();
                  }}
                >
                  <span className="duo-settings-row-label">Cursos</span>
                  <div className="duo-settings-row-right">
                    <span className="duo-settings-pill-tag blue">
                      {user.currentPath === 'kotlin' ? 'Kotlin' : 'SQL'}
                    </span>
                    <ChevronRight size={18} color="#AFAFAF" strokeWidth={2.5} />
                  </div>
                </button>

                {/* Tienda y Vestidor 3D */}
                {onOpenLocker && (
                  <button
                    type="button"
                    className="duo-settings-row"
                    onClick={() => {
                      soundService.playToken();
                      setIsDrawerOpen(false);
                      onOpenLocker();
                    }}
                  >
                    <span className="duo-settings-row-label">Tienda y Vestidor</span>
                    <div className="duo-settings-row-right">
                      <span className="duo-settings-pill-tag green">3D</span>
                      <ChevronRight size={18} color="#AFAFAF" strokeWidth={2.5} />
                    </div>
                  </button>
                )}

                {/* Misiones Diarias */}
                <button
                  type="button"
                  className="duo-settings-row"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onOpenQuests();
                  }}
                >
                  <span className="duo-settings-row-label">Misiones Diarias</span>
                  <div className="duo-settings-row-right">
                    <ChevronRight size={18} color="#AFAFAF" strokeWidth={2.5} />
                  </div>
                </button>
              </div>

              {/* SECCIÓN 2: DOCENTE (Si es docente/admin) */}
              {isTeacherAdmin && (
                <>
                  <div className="duo-settings-group-label">Docente</div>
                  <div className="duo-settings-table">
                    {onOpenAcademic && (
                      <button
                        type="button"
                        className="duo-settings-row"
                        onClick={() => {
                          soundService.playToken();
                          setIsDrawerOpen(false);
                          onOpenAcademic();
                        }}
                      >
                        <span className="duo-settings-row-label">Seguimiento Académico</span>
                        <div className="duo-settings-row-right">
                          <ChevronRight size={18} color="#AFAFAF" strokeWidth={2.5} />
                        </div>
                      </button>
                    )}
                    {onOpenLiveUsers && (
                      <button
                        type="button"
                        className="duo-settings-row"
                        onClick={() => {
                          soundService.playToken();
                          setIsDrawerOpen(false);
                          onOpenLiveUsers();
                        }}
                      >
                        <span className="duo-settings-row-label">Usuarios en Línea</span>
                        <div className="duo-settings-row-right">
                          {onlineUsersCount > 0 && (
                            <span className="duo-settings-pill-tag green">
                              {onlineUsersCount} ACTIVOS
                            </span>
                          )}
                          <ChevronRight size={18} color="#AFAFAF" strokeWidth={2.5} />
                        </div>
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* SECCIÓN 3: SOPORTE Y SESIÓN (Fiel a Foto 1) */}
              <div className="duo-settings-group-label">Soporte</div>
              <div className="duo-settings-table">
                <div className="duo-settings-row static">
                  <span className="duo-settings-row-label">Código de Estudiante</span>
                  <div className="duo-settings-row-right">
                    <span className="duo-settings-row-sub">{user?.studentCode || 'E01'}</span>
                  </div>
                </div>

                {onSignOut && (
                  <button
                    type="button"
                    className="duo-settings-row logout"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onSignOut();
                    }}
                  >
                    <span className="duo-settings-row-label red">Cerrar Sesión</span>
                    <div className="duo-settings-row-right">
                      <ChevronRight size={18} color="#FF4B4B" strokeWidth={2.5} />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
