import React, { useState } from 'react';
import {
  Flame,
  Code2,
  Database,
  Volume2,
  VolumeX,
  ChevronDown,
  ShieldCheck,
  LogOut,
  Users,
  Bell,
  Menu,
  ShoppingBag,
  ChevronRight,
  Trophy,
  Hash,
  Smartphone
} from 'lucide-react';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { DevAvatar } from './Avatars';
import { usePWAInstall } from '../hooks/usePWAInstall';

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
  onOpenLeague?: () => void;
  onOpenSqliteLab?: () => void;
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
  onOpenLeague,
  onOpenSqliteLab,
  onSignOut,
  onLogoClick: _onLogoClick
}) => {
  const [isMuted, setIsMuted] = useState(soundService.getMuted());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isInstalled, isIOS, isNativePromptAvailable, promptInstall } = usePWAInstall();

  const isTeacherAdmin = Boolean(
    isAdmin || (user?.email && user.email.toLowerCase() === 'josephcarazo56@gmail.com')
  );

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = soundService.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundService.playToken();
  };

  // Prevenir que el scroll del fondo interfiera con el scroll del drawer y cerrar con Escape
  React.useEffect(() => {
    if (isDrawerOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsDrawerOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isDrawerOpen]);

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
              <Bell size={18} strokeWidth={2.4} color={(unreadNotificationsCount ?? 0) > 0 ? '#D97706' : '#64748B'} />
              {(unreadNotificationsCount ?? 0) > 0 && (
                <span className="nav-notif-badge">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          )}

          {/* Botón Menú Hamburguesa Neo-brutalism (hb-nav para Desktop y Móvil) */}
          <button
            type="button"
            className="nav-hamburger-btn nav-mobile-hamburger-btn"
            onClick={() => {
              soundService.playToken();
              setIsDrawerOpen(true);
            }}
            title="Abrir Menú de Navegación y Ajustes"
            aria-label="Menú de Navegación"
          >
            <Menu size={22} color="#000000" strokeWidth={2.8} />
          </button>
        </div>
      </header>

      {/* DRAWER MÓVIL ESTILO NEO-BRUTALISM */}
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
            {/* Top Bar: Settings / Ajustes + LISTO */}
            <div className="duo-settings-header">
              <span className="duo-settings-title">Menú y Ajustes</span>
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
              {/* Tarjeta de Usuario Neo-Brutalist (Clickable para abrir Perfil) */}
              <button
                type="button"
                className="duo-settings-user-card"
                onClick={() => {
                  soundService.playToken();
                  setIsDrawerOpen(false);
                  onOpenProfile();
                }}
                title="Ver mi perfil completo"
              >
                <div className="duo-settings-user-avatar-wrap">
                  <DevAvatar
                    avatarId={user?.avatarId || 'robot_byte'}
                    skinId={user?.equippedSkin}
                    size={46}
                  />
                </div>
                <div className="duo-settings-user-info">
                  <div className="duo-settings-user-name">{user?.displayName || 'Desarrollador'}</div>
                  <div className="duo-settings-user-meta">
                    <span className="duo-settings-user-pill streak">
                      <Flame size={13} color="#EA580C" fill="#EA580C" />
                      {user?.streak?.count ?? 0} días
                    </span>
                    <span className="duo-settings-user-pill code">
                      {user?.studentCode || 'E01'}
                    </span>
                  </div>
                </div>
                <div className="duo-settings-user-arrow">
                  <ChevronRight size={18} color="#000000" strokeWidth={3} />
                </div>
              </button>

              {/* SECCIÓN 1: NAVEGACIÓN PRINCIPAL */}
              <div className="duo-settings-group-label">Navegación</div>
              <div className="duo-settings-table">
                {/* Selector de Ruta Cursos */}
                <button
                  type="button"
                  className="duo-settings-row"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onPathToggle();
                  }}
                >
                  <div className="duo-settings-row-left">
                    <div className="duo-settings-row-icon-box cyan">
                      {user.currentPath === 'kotlin' ? (
                        <Code2 size={18} color="#0284C7" strokeWidth={2.6} />
                      ) : (
                        <Database size={18} color="#2563EB" strokeWidth={2.6} />
                      )}
                    </div>
                    <span className="duo-settings-row-label">Ruta Actual</span>
                  </div>
                  <div className="duo-settings-row-right">
                    <span className="duo-settings-pill-tag blue">
                      {user.currentPath === 'kotlin' ? 'Kotlin' : 'SQL'}
                    </span>
                    <ChevronRight size={18} color="#000000" strokeWidth={3} />
                  </div>
                </button>

                {/* Liga Semanal (Sin etiqueta innecesaria) */}
                {onOpenLeague && (
                  <button
                    type="button"
                    className="duo-settings-row"
                    onClick={() => {
                      soundService.playToken();
                      setIsDrawerOpen(false);
                      onOpenLeague();
                    }}
                  >
                    <div className="duo-settings-row-left">
                      <div className="duo-settings-row-icon-box gold">
                        <Trophy size={18} color="#D97706" strokeWidth={2.6} />
                      </div>
                      <span className="duo-settings-row-label">Liga Semanal</span>
                    </div>
                    <div className="duo-settings-row-right">
                      <ChevronRight size={18} color="#000000" strokeWidth={3} />
                    </div>
                  </button>
                )}

                {/* Tienda y Vestidor (Sin etiqueta innecesaria) */}
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
                    <div className="duo-settings-row-left">
                      <div className="duo-settings-row-icon-box blue">
                        <ShoppingBag size={18} color="#0284C7" strokeWidth={2.6} />
                      </div>
                      <span className="duo-settings-row-label">Tienda y Vestidor</span>
                    </div>
                    <div className="duo-settings-row-right">
                      <ChevronRight size={18} color="#000000" strokeWidth={3} />
                    </div>
                  </button>
                )}

                {/* Temporada y Desafíos */}
                <button
                  type="button"
                  className="duo-settings-row"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onOpenQuests();
                  }}
                >
                  <div className="duo-settings-row-left">
                    <div className="duo-settings-row-icon-box orange">
                      <Flame size={18} color="#D97706" strokeWidth={2.6} />
                    </div>
                    <span className="duo-settings-row-label">Temporada y Desafíos</span>
                  </div>
                  <div className="duo-settings-row-right">
                    <ChevronRight size={18} color="#000000" strokeWidth={3} />
                  </div>
                </button>

                {/* Lab SQLite */}
                {onOpenSqliteLab && (
                  <button
                    type="button"
                    className="duo-settings-row"
                    onClick={() => {
                      soundService.playToken();
                      setIsDrawerOpen(false);
                      onOpenSqliteLab();
                    }}
                  >
                    <div className="duo-settings-row-left">
                      <div className="duo-settings-row-icon-box cyan">
                        <Database size={18} color="#0284C7" strokeWidth={2.6} />
                      </div>
                      <span className="duo-settings-row-label">Lab SQLite</span>
                    </div>
                    <div className="duo-settings-row-right">
                      <ChevronRight size={18} color="#000000" strokeWidth={3} />
                    </div>
                  </button>
                )}

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
                    <div className="duo-settings-row-left">
                      <div className="duo-settings-row-icon-box yellow">
                        <Bell size={18} color="#B45309" strokeWidth={2.6} />
                      </div>
                      <span className="duo-settings-row-label">Notificaciones</span>
                    </div>
                    <div className="duo-settings-row-right">
                      {(unreadNotificationsCount ?? 0) > 0 && (
                        <span className="duo-settings-pill-tag red">
                          {unreadNotificationsCount} NUEVAS
                        </span>
                      )}
                      <ChevronRight size={18} color="#000000" strokeWidth={3} />
                    </div>
                  </button>
                )}
              </div>

              {/* SECCIÓN 2: PREFERENCIAS */}
              <div className="duo-settings-group-label">Preferencias</div>
              <div className="duo-settings-table">
                {/* Sonido / Audio */}
                <button
                  type="button"
                  className="duo-settings-row"
                  onClick={(e) => handleSoundToggle(e)}
                >
                  <div className="duo-settings-row-left">
                    <div className={`duo-settings-row-icon-box ${isMuted ? 'gray' : 'green'}`}>
                      {isMuted ? (
                        <VolumeX size={18} color="#64748B" strokeWidth={2.6} />
                      ) : (
                        <Volume2 size={18} color="#15803D" strokeWidth={2.6} />
                      )}
                    </div>
                    <span className="duo-settings-row-label">Efectos de Sonido</span>
                  </div>
                  <div className="duo-settings-row-right">
                    <span className={`duo-settings-pill-tag ${isMuted ? 'gray' : 'green'}`}>
                      {isMuted ? 'Silenciado' : 'Activado'}
                    </span>
                    <ChevronRight size={18} color="#000000" strokeWidth={3} />
                  </div>
                </button>

                {/* Instalar App en el Celular (PWA) */}
                <button
                  type="button"
                  className="duo-settings-row"
                  onClick={async () => {
                    soundService.playToken();
                    if (!isInstalled) {
                      if (isNativePromptAvailable) {
                        await promptInstall();
                      } else {
                        alert(
                          isIOS
                            ? 'Para instalar en iPhone/iPad:\n1. Toca el botón Compartir de Safari (icono cuadrado con flecha).\n2. Elige "Añadir a la pantalla de inicio".'
                            : 'Para instalar en tu celular, pulsa en los 3 puntos del navegador y elige "Instalar aplicación" o "Añadir a pantalla de inicio".'
                        );
                      }
                    }
                  }}
                >
                  <div className="duo-settings-row-left">
                    <div className={`duo-settings-row-icon-box ${isInstalled ? 'green' : 'blue'}`}>
                      <Smartphone size={18} color={isInstalled ? '#15803D' : '#0284C7'} strokeWidth={2.6} />
                    </div>
                    <span className="duo-settings-row-label">
                      {isInstalled ? 'App en tu Pantalla' : 'Instalar en Celular'}
                    </span>
                  </div>
                  <div className="duo-settings-row-right">
                    <span className={`duo-settings-pill-tag ${isInstalled ? 'green' : 'blue'}`}>
                      {isInstalled ? 'Instalada' : 'Instalar'}
                    </span>
                    <ChevronRight size={18} color="#000000" strokeWidth={3} />
                  </div>
                </button>
              </div>

              {/* SECCIÓN 3: DOCENTE (Si es docente/admin) */}
              {isTeacherAdmin && (
                <>
                  <div className="duo-settings-group-label">Panel Docente</div>
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
                        <div className="duo-settings-row-left">
                          <div className="duo-settings-row-icon-box purple">
                            <ShieldCheck size={18} color="#7C3AED" strokeWidth={2.6} />
                          </div>
                          <span className="duo-settings-row-label">Seguimiento Académico</span>
                        </div>
                        <div className="duo-settings-row-right">
                          <ChevronRight size={18} color="#000000" strokeWidth={3} />
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
                        <div className="duo-settings-row-left">
                          <div className="duo-settings-row-icon-box green">
                            <Users size={18} color="#15803D" strokeWidth={2.6} />
                          </div>
                          <span className="duo-settings-row-label">Usuarios en Línea</span>
                        </div>
                        <div className="duo-settings-row-right">
                          {onlineUsersCount > 0 && (
                            <span className="duo-settings-pill-tag green">
                              {onlineUsersCount} ACTIVOS
                            </span>
                          )}
                          <ChevronRight size={18} color="#000000" strokeWidth={3} />
                        </div>
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* SECCIÓN 4: CUENTA Y SESIÓN */}
              <div className="duo-settings-group-label">Cuenta</div>
              <div className="duo-settings-table">
                <div className="duo-settings-row static">
                  <div className="duo-settings-row-left">
                    <div className="duo-settings-row-icon-box gray">
                      <Hash size={18} color="#475569" strokeWidth={2.6} />
                    </div>
                    <span className="duo-settings-row-label">Código de Estudiante</span>
                  </div>
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
                    <div className="duo-settings-row-left">
                      <div className="duo-settings-row-icon-box red">
                        <LogOut size={18} color="#DC2626" strokeWidth={2.6} />
                      </div>
                      <span className="duo-settings-row-label red">Cerrar Sesión</span>
                    </div>
                    <div className="duo-settings-row-right">
                      <ChevronRight size={18} color="#DC2626" strokeWidth={3} />
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
