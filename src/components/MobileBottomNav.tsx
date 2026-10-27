import React from 'react';
import {
  Gamepad2,
  GraduationCap,
  Trophy,
  Flame,
  ShoppingBag,
  User,
  ShieldCheck
} from 'lucide-react';
import { soundService } from '../services/soundService';

export interface MobileBottomNavProps {
  currentView: string;
  currentMainTab: 'play' | 'courses' | 'league';
  unreadNotificationsCount?: number;
  hasUnclaimedRewards?: boolean;
  isAdmin?: boolean;
  onNavigate: (view: 'path' | 'profile' | 'store' | 'notifications' | 'academic' | 'season' | 'sqlite-lab', tab?: 'play' | 'courses' | 'league') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  currentMainTab,
  hasUnclaimedRewards = false,
  isAdmin = false,
  onNavigate
}) => {
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
      activeBg: '#BAE6FD',
      iconColor: '#0284C7'
    },
    {
      id: 'courses',
      label: 'PRÁCTICA',
      icon: GraduationCap,
      isActive: currentView === 'path' && currentMainTab === 'courses',
      onClick: () => {
        soundService.playToken();
        onNavigate('path', 'courses');
      },
      activeBg: '#DCFCE7',
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
      activeBg: '#FEF08A',
      iconColor: '#CA8A04'
    },
    {
      id: 'season',
      label: 'TEMPORADA',
      icon: Flame,
      isActive: currentView === 'season',
      badge: hasUnclaimedRewards,
      onClick: () => {
        soundService.playToken();
        onNavigate('season');
      },
      activeBg: '#FED7AA',
      iconColor: '#EA580C'
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
      activeBg: '#E0E7FF',
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
      activeBg: '#FCE7F3',
      iconColor: '#DB2777'
    }
  ];

  if (isAdmin) {
    navItems.push({
      id: 'academic',
      label: 'DOCENTE',
      icon: ShieldCheck,
      isActive: currentView === 'academic',
      badge: false,
      onClick: () => {
        soundService.playToken();
        onNavigate('academic');
      },
      activeBg: '#FEF08A',
      iconColor: '#D97706'
    });
  }

  return (
    <nav className="mobile-bottom-nav-root" aria-label="Navegación Móvil Principal">
      <div className="mobile-bottom-nav-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`mobile-bottom-nav-btn ${item.isActive ? 'active' : ''}`}
              style={{
                backgroundColor: item.isActive ? item.activeBg : 'transparent'
              }}
              onClick={item.onClick}
              type="button"
              aria-label={item.label}
            >
              <div className="mobile-bottom-nav-icon-wrap">
                <Icon
                  size={20}
                  strokeWidth={2.6}
                  color={item.isActive ? '#000000' : item.iconColor}
                />
                {item.badge && (
                  <span className="mobile-bottom-nav-dot" />
                )}
              </div>
              <span className="mobile-bottom-nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
