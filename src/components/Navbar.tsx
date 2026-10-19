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
  Award,
  Sparkles,
  Star
} from 'lucide-react';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { DevAvatar } from './Avatars';
import { getRankByUser } from '../types/skins';

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

  const currentRank = getRankByUser(user?.totalXp || 0, 0);

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

      {/* DRAWER MÓVIL HAMBURGUESA (HB-NAV 100% DUOLINGO 3D) */}
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
            {/* ═══ CABECERA SUPERIOR DUOLINGO 3D ═══ */}
            <div className="duo-hb-top-bar">
              <div className="duo-hb-top-badge">
                <Sparkles size={14} color="#FF9600" />
                <span>CENTRO DE CONTROL</span>
              </div>
              <button
                type="button"
                className="duo-hb-close-btn"
                onClick={() => {
                  soundService.playToken();
                  setIsDrawerOpen(false);
                }}
                aria-label="Cerrar Menú"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            {/* ═══ TARJETA HERO DEL ESTUDIANTE DUOLINGO 3D ═══ */}
            <div className="duo-hb-player-card">
              <div
                className="duo-hb-player-rank-chip"
                style={{
                  color: currentRank.color,
                  borderColor: currentRank.color
                }}
              >
                <Award size={13} strokeWidth={2.8} />
                <span>RANGO {currentRank.name.toUpperCase()}</span>
              </div>

              <div className="duo-hb-player-body">
                <div className="duo-hb-avatar-podium">
                  <DevAvatar
                    avatarId={user?.avatarId || 'robot_byte'}
                    skinId={user?.equippedSkin}
                    size={52}
                  />
                  <div className="duo-hb-avatar-pedestal" />
                </div>

                <div className="duo-hb-player-info">
                  <div className="duo-hb-speech-bubble">
                    ¡A programar hoy! 🚀
                  </div>
                  <div className="duo-hb-player-name">{user?.displayName || 'Desarrollador'}</div>
                  <div className="duo-hb-player-meta">
                    <span className="duo-hb-code-tag">[{user?.studentCode || 'E01'}]</span>
                    <span>•</span>
                    <span className="duo-hb-group-tag">{user?.group || 'Grupo A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══ TIRA DE RECURSOS TÁCTIL 3D (ZERO VIDAS) ═══ */}
            <div className="duo-hb-stats-strip">
              <div className="duo-hb-stat-box streak">
                <div className="duo-hb-stat-icon-wrap" style={{ background: '#FF9600' }}>
                  <Flame size={16} color="#FFFFFF" fill="#FFFFFF" />
                </div>
                <div className="duo-hb-stat-data">
                  <span className="duo-hb-stat-val">{user?.streak?.count ?? 0}</span>
                  <span className="duo-hb-stat-lbl">RACHA</span>
                </div>
              </div>

              <div className="duo-hb-stat-box bytes">
                <div className="duo-hb-stat-icon-wrap" style={{ background: '#1CB0F6' }}>
                  <Zap size={16} color="#FFFFFF" fill="#FFFFFF" />
                </div>
                <div className="duo-hb-stat-data">
                  <span className="duo-hb-stat-val">{(user?.bytes ?? 0).toLocaleString()}</span>
                  <span className="duo-hb-stat-lbl">BYTES</span>
                </div>
              </div>

              <div className="duo-hb-stat-box xp">
                <div className="duo-hb-stat-icon-wrap" style={{ background: '#FFC800' }}>
                  <Star size={16} color="#FFFFFF" fill="#FFFFFF" />
                </div>
                <div className="duo-hb-stat-data">
                  <span className="duo-hb-stat-val">{(user?.totalXp ?? 0).toLocaleString()}</span>
                  <span className="duo-hb-stat-lbl">XP TOTAL</span>
                </div>
              </div>
            </div>

            {/* ═══ LISTA DE ACCIONES AGRUPADAS DUOLINGO 3D ═══ */}
            <div className="duo-hb-scroll-area">
              {/* GRUPO 1: RUTA Y APRENDIZAJE */}
              <div className="duo-hb-group-section">
                <div className="duo-hb-section-title">⚡ APRENDIZAJE ACTIVO</div>
                <button
                  type="button"
                  className="duo-hb-card-btn course"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onPathToggle();
                  }}
                >
                  <div
                    className="duo-hb-card-icon"
                    style={{
                      background: user.currentPath === 'kotlin' ? '#CE82FF' : '#1CB0F6',
                      borderColor: user.currentPath === 'kotlin' ? '#A559D9' : '#1899D6'
                    }}
                  >
                    {user.currentPath === 'kotlin' ? <Code2 size={22} color="#FFF" strokeWidth={2.8} /> : <Database size={22} color="#FFF" strokeWidth={2.8} />}
                  </div>
                  <div className="duo-hb-card-text">
                    <div className="duo-hb-card-heading">
                      RUTA {user.currentPath === 'kotlin' ? 'KOTLIN' : 'SQL'}
                    </div>
                    <div className="duo-hb-card-caption">
                      Toca para cambiar a {user.currentPath === 'kotlin' ? 'SQL' : 'Kotlin'}
                    </div>
                  </div>
                  <span className="duo-hb-pill-btn">CAMBIAR</span>
                </button>
              </div>

              {/* GRUPO 2: AVENTURA & TIENDA */}
              <div className="duo-hb-group-section">
                <div className="duo-hb-section-title">🎒 AVENTURA & OBJETIVOS</div>

                {onOpenLocker && (
                  <button
                    type="button"
                    className="duo-hb-card-btn store"
                    onClick={() => {
                      soundService.playToken();
                      setIsDrawerOpen(false);
                      onOpenLocker();
                    }}
                  >
                    <div className="duo-hb-card-icon" style={{ background: '#1CB0F6', borderColor: '#1899D6' }}>
                      <ShoppingBag size={22} color="#FFF" strokeWidth={2.6} />
                    </div>
                    <div className="duo-hb-card-text">
                      <div className="duo-hb-card-heading">TIENDA Y VESTIDOR</div>
                      <div className="duo-hb-card-caption">Skins para todos los avatares y poderes</div>
                    </div>
                    <span className="duo-hb-pill-badge blue">3D</span>
                  </button>
                )}

                <button
                  type="button"
                  className="duo-hb-card-btn quest"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onOpenQuests();
                  }}
                >
                  <div className="duo-hb-card-icon" style={{ background: '#FFC800', borderColor: '#E5A500' }}>
                    <Target size={22} color="#FFF" strokeWidth={2.8} />
                  </div>
                  <div className="duo-hb-card-text">
                    <div className="duo-hb-card-heading">MISIONES DIARIAS</div>
                    <div className="duo-hb-card-caption">Retos del día y recompensas XP</div>
                  </div>
                  <span className="duo-hb-pill-badge yellow">HOY</span>
                </button>

                {onOpenNotifications && (
                  <button
                    type="button"
                    className="duo-hb-card-btn notif"
                    onClick={() => {
                      soundService.playToken();
                      setIsDrawerOpen(false);
                      onOpenNotifications();
                    }}
                  >
                    <div className="duo-hb-card-icon" style={{ background: '#FF9600', borderColor: '#CC7A00' }}>
                      <Bell size={22} color="#FFF" strokeWidth={2.6} />
                    </div>
                    <div className="duo-hb-card-text">
                      <div className="duo-hb-card-heading">NOTIFICACIONES</div>
                      <div className="duo-hb-card-caption">Avisos del profesor y plataforma</div>
                    </div>
                    {(unreadNotificationsCount ?? 0) > 0 ? (
                      <span className="duo-hb-pill-badge red">{unreadNotificationsCount} NUEVAS</span>
                    ) : (
                      <span className="duo-hb-pill-badge gray">AL DÍA</span>
                    )}
                  </button>
                )}
              </div>

              {/* GRUPO 3: PREFERENCIAS & CUENTA */}
              <div className="duo-hb-group-section">
                <div className="duo-hb-section-title">⚙️ CUENTA & AJUSTES</div>

                <button
                  type="button"
                  className="duo-hb-card-btn profile"
                  onClick={() => {
                    soundService.playToken();
                    setIsDrawerOpen(false);
                    onOpenProfile();
                  }}
                >
                  <div className="duo-hb-card-icon" style={{ background: '#58CC02', borderColor: '#46A302' }}>
                    <DevAvatar
                      avatarId={user?.avatarId || 'robot_byte'}
                      skinId={user?.equippedSkin}
                      size={26}
                    />
                  </div>
                  <div className="duo-hb-card-text">
                    <div className="duo-hb-card-heading">MI PERFIL</div>
                    <div className="duo-hb-card-caption">Estadísticas, medallas y avatar</div>
                  </div>
                  <span className="duo-hb-pill-badge green">VER</span>
                </button>

                <button
                  type="button"
                  className="duo-hb-card-btn sound"
                  onClick={(e) => handleSoundToggle(e)}
                >
                  <div
                    className="duo-hb-card-icon"
                    style={{
                      background: isMuted ? '#E2E8F0' : '#22C55E',
                      borderColor: isMuted ? '#CBD5E1' : '#16A34A'
                    }}
                  >
                    {isMuted ? <VolumeX size={22} color="#64748B" strokeWidth={2.6} /> : <Volume2 size={22} color="#FFF" strokeWidth={2.6} />}
                  </div>
                  <div className="duo-hb-card-text">
                    <div className="duo-hb-card-heading">SONIDO Y EFECTOS</div>
                    <div className="duo-hb-card-caption">
                      {isMuted ? 'Silenciado (Toca para activar)' : 'Efectos de audio activos'}
                    </div>
                  </div>
                  <span className={`duo-hb-pill-badge ${isMuted ? 'gray' : 'green'}`}>
                    {isMuted ? 'MUTE' : 'ON'}
                  </span>
                </button>
              </div>

              {/* GRUPO 4: DOCENTE / ADMINISTRADOR */}
              {isTeacherAdmin && (
                <div className="duo-hb-group-section">
                  <div className="duo-hb-section-title">🛡️ PANEL DOCENTE</div>

                  {onOpenAcademic && (
                    <button
                      type="button"
                      className="duo-hb-card-btn admin"
                      onClick={() => {
                        soundService.playToken();
                        setIsDrawerOpen(false);
                        onOpenAcademic();
                      }}
                    >
                      <div className="duo-hb-card-icon" style={{ background: '#FF9600', borderColor: '#CC7A00' }}>
                        <ShieldCheck size={22} color="#FFF" strokeWidth={2.6} />
                      </div>
                      <div className="duo-hb-card-text">
                        <div className="duo-hb-card-heading">SEGUIMIENTO DOCENTE</div>
                        <div className="duo-hb-card-caption">Analíticas de progreso y estudiantes</div>
                      </div>
                      <span className="duo-hb-pill-badge orange">ADMIN</span>
                    </button>
                  )}

                  {onOpenLiveUsers && (
                    <button
                      type="button"
                      className="duo-hb-card-btn admin"
                      onClick={() => {
                        soundService.playToken();
                        setIsDrawerOpen(false);
                        onOpenLiveUsers();
                      }}
                    >
                      <div className="duo-hb-card-icon" style={{ background: '#58CC02', borderColor: '#46A302' }}>
                        <Users size={22} color="#FFF" strokeWidth={2.6} />
                      </div>
                      <div className="duo-hb-card-text">
                        <div className="duo-hb-card-heading">ALUMNOS EN LÍNEA</div>
                        <div className="duo-hb-card-caption">
                          {onlineUsersCount > 0 ? `${onlineUsersCount} estudiantes conectados` : 'Sin alumnos activos ahora'}
                        </div>
                      </div>
                      {onlineUsersCount > 0 ? (
                        <span className="duo-hb-pill-badge green">{onlineUsersCount} ACTIVOS</span>
                      ) : (
                        <span className="duo-hb-pill-badge gray">0 EN LÍNEA</span>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* CERRAR SESIÓN */}
              {onSignOut && (
                <div className="duo-hb-logout-section">
                  <button
                    type="button"
                    className="duo-hb-logout-btn"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onSignOut();
                    }}
                  >
                    <LogOut size={18} strokeWidth={2.8} />
                    <span>CERRAR SESIÓN SEGURA</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
