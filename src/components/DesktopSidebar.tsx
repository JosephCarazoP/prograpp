import React, { useState } from 'react';
import {
  Gamepad2,
  GraduationCap,
  Trophy,
  ShoppingBag,
  User,
  Bell,
  ShieldCheck,
  Users,
  Volume2,
  VolumeX,
  LogOut,
  Flame,
  Database
} from 'lucide-react';
import { soundService } from '../services/soundService';

export interface DesktopSidebarProps {
  currentView: string;
  currentMainTab: 'play' | 'courses' | 'league';
  unreadNotificationsCount?: number;
  onlineUsersCount?: number;
  isAdmin?: boolean;
  onNavigate: (view: 'path' | 'profile' | 'store' | 'notifications' | 'academic' | 'season' | 'sqlite-lab', tab?: 'play' | 'courses' | 'league') => void;
  onOpenQuests?: () => void;
  onOpenLiveUsers: () => void;
  onSignOut?: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentView,
  currentMainTab,
  unreadNotificationsCount = 0,
  onlineUsersCount = 0,
  isAdmin = false,
  onNavigate,
  onOpenQuests: _onOpenQuests,
  onOpenLiveUsers,
  onSignOut
}) => {
  const [isMuted, setIsMuted] = useState(soundService.getMuted());

  const handleSoundToggle = () => {
    const nextMuted = soundService.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundService.playToken();
  };

  const navItems = [
    {
      id: 'play',
      label: 'APRENDER',
      icon: Gamepad2,
      isActive: currentView === 'path' && currentMainTab === 'play',
      onClick: () => {
        soundService.playToken();
        onNavigate('path', 'play');
      },
      activeColor: '#BAE6FD',
      iconColor: '#0284C7'
    },
    {
      id: 'courses',
      label: 'CURSOS',
      icon: GraduationCap,
      isActive: currentView === 'path' && currentMainTab === 'courses',
      onClick: () => {
        soundService.playToken();
        onNavigate('path', 'courses');
      },
      activeColor: '#DCFCE7',
      iconColor: '#16A34A'
    },
    {
      id: 'league',
      label: 'LIGAS',
      icon: Trophy,
      isActive: currentView === 'path' && currentMainTab === 'league',
      onClick: () => {
        soundService.playToken();
        onNavigate('path', 'league');
      },
      activeColor: '#FEF08A',
      iconColor: '#CA8A04'
    },
    {
      id: 'season',
      label: 'TEMPORADA',
      icon: Flame,
      isActive: currentView === 'season',
      onClick: () => {
        soundService.playToken();
        onNavigate('season');
      },
      activeColor: '#FEF08A',
      iconColor: '#EA580C'
    },
    {
      id: 'sqlite-lab',
      label: 'LAB SQLITE',
      icon: Database,
      isActive: currentView === 'sqlite-lab',
      onClick: () => {
        soundService.playToken();
        onNavigate('sqlite-lab');
      },
      activeColor: '#BAE6FD',
      iconColor: '#0284C7'
    },
    {
      id: 'store',
      label: 'TIENDA',
      icon: ShoppingBag,
      isActive: currentView === 'store',
      onClick: () => {
        soundService.playToken();
        onNavigate('store');
      },
      activeColor: '#E0E7FF',
      iconColor: '#4F46E5'
    },
    {
      id: 'profile',
      label: 'PERFIL',
      icon: User,
      isActive: currentView === 'profile',
      onClick: () => {
        soundService.playToken();
        onNavigate('profile');
      },
      activeColor: '#FCE7F3',
      iconColor: '#DB2777'
    },
    {
      id: 'notifications',
      label: 'AVISOS',
      icon: Bell,
      isActive: currentView === 'notifications',
      badge: unreadNotificationsCount,
      onClick: () => {
        soundService.playToken();
        onNavigate('notifications');
      },
      activeColor: '#FED7AA',
      iconColor: '#EA580C'
    }
  ];

  if (isAdmin) {
    navItems.push({
      id: 'academic',
      label: 'PROFESOR',
      icon: ShieldCheck,
      isActive: currentView === 'academic',
      onClick: () => {
        soundService.playToken();
        onNavigate('academic');
      },
      activeColor: '#EDE9FE',
      iconColor: '#7C3AED'
    });
  }

  return (
    <aside className="desktop-sidebar-root" aria-label="Navegación Principal Desktop">
      {/* ═══ LOGO DE PROGRAPP (NEO-BRUTALISM) ═══ */}
      <div
        className="desktop-sidebar-brand"
        onClick={() => {
          soundService.playToken();
          onNavigate('path', 'play');
        }}
        role="button"
        tabIndex={0}
      >
        <div className="desktop-brand-icon">
          <img
            src="/byte-app-icon.png"
            alt="PrograApp"
          />
        </div>
        <div className="desktop-brand-text-wrapper">
          <span className="desktop-brand-title">prograpp</span>
          <span className="desktop-brand-sub">DEV ACADEMY</span>
        </div>
      </div>

      {/* ═══ LISTA DE ENLACES DE NAVEGACIÓN ═══ */}
      <nav className="desktop-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`desktop-nav-item ${item.isActive ? 'active' : ''}`}
              style={{
                backgroundColor: item.isActive ? item.activeColor : 'transparent'
              }}
              onClick={item.onClick}
              type="button"
            >
              <div className="desktop-nav-icon-box">
                <Icon
                  size={22}
                  strokeWidth={2.6}
                  color={item.isActive ? '#000000' : item.iconColor}
                />
              </div>
              <span className="desktop-nav-label">{item.label}</span>
              {typeof item.badge === 'number' && item.badge > 0 && (
                <span className="desktop-nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ═══ USUARIOS EN LÍNEA PILL ═══ */}
      <div className="desktop-sidebar-meta">
        <button
          className="desktop-live-users-btn"
          onClick={() => {
            soundService.playToken();
            onOpenLiveUsers();
          }}
          type="button"
          title="Ver estudiantes conectados en tiempo real"
        >
          <div className="desktop-live-indicator" />
          <Users size={16} strokeWidth={2.4} color="#000000" />
          <span>{onlineUsersCount} en línea</span>
        </button>
      </div>

      {/* ═══ CONTROLES INFERIORES: AUDIO Y CERRAR SESIÓN ═══ */}
      <div className="desktop-sidebar-footer">
        <button
          className="desktop-footer-btn"
          onClick={handleSoundToggle}
          title={isMuted ? 'Activar sonido' : 'Silenciar efectos'}
          type="button"
        >
          {isMuted ? (
            <VolumeX size={18} strokeWidth={2.4} color="#EF4444" />
          ) : (
            <Volume2 size={18} strokeWidth={2.4} color="#10B981" />
          )}
          <span>{isMuted ? 'Silenciado' : 'Sonido'}</span>
        </button>

        {onSignOut && (
          <button
            className="desktop-footer-btn sign-out-btn"
            onClick={onSignOut}
            title="Cerrar sesión actual"
            type="button"
          >
            <LogOut size={18} strokeWidth={2.4} color="#64748B" />
            <span>Salir</span>
          </button>
        )}
      </div>
    </aside>
  );
};
