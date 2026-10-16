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
  Shirt
} from 'lucide-react';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { DevAvatar } from './Avatars';

interface NavbarProps {
  user: UserProfile;
  isAdmin?: boolean;
  onPathToggle: () => void;
  onOpenQuests: () => void;
  onOpenPractice?: () => void;
  onOpenProfile: () => void;
  onOpenStreak?: () => void;
  onOpenAcademic?: () => void;
  onOpenLocker?: () => void;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  isAdmin = false,
  onPathToggle,
  onOpenQuests,
  onOpenProfile,
  onOpenStreak,
  onOpenAcademic,
  onOpenLocker,
  onSignOut
}) => {
  const [isMuted, setIsMuted] = useState(soundService.getMuted());

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = soundService.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundService.playToken();
  };

  return (
    <header className="top-nav" role="banner">
      {/* Lado Izquierdo: Selector de Ruta / Curso estilo Duolingo */}
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
              <Code2 size={18} color="#38BDF8" strokeWidth={2.5} />
              <span>Kotlin</span>
            </>
          ) : (
            <>
              <Database size={18} color="#60A5FA" strokeWidth={2.5} />
              <span>SQL</span>
            </>
          )}
          <ChevronDown size={14} color="#94A3B8" strokeWidth={2.5} />
        </button>
      </div>

      {/* Lado Derecho: Grupo de Estadísticas Duolingo 3D y Acciones */}
      <div className="nav-right">
        {/* Racha Diaria */}
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
            size={18}
            color={(user?.streak?.count ?? 0) === 0 ? '#94A3B8' : '#FF9500'}
            fill={(user?.streak?.count ?? 0) === 0 ? '#94A3B8' : '#FF9500'}
          />
          <span className="stat-number">{user?.streak?.count ?? 0}</span>
        </button>

        {/* Botón 3D de Misiones Diarias */}
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

        {/* Botón 3D del Vestidor de Byte (Skins) */}
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

        {/* Botón Silencio / Audio */}
        <button
          className="nav-icon-btn sound-toggle"
          onClick={handleSoundToggle}
          title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
          type="button"
        >
          {isMuted ? <VolumeX size={17} color="#64748B" /> : <Volume2 size={17} color="#4ADE80" />}
        </button>

        {/* Avatar de Usuario Vectorial 3D (Acceso directo al Perfil) */}
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
          <DevAvatar avatarId={user?.avatarId || 'robot_byte'} size={34} />
        </button>

        {/* Botón Exclusivo de Seguimiento Académico para josephcarazo56@gmail.com */}
        {isAdmin && onOpenAcademic && (
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
            <ShieldCheck size={16} color="#FFFFFF" strokeWidth={2.5} />
            <span className="nav-admin-label">Seguimiento</span>
          </button>
        )}

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
    </header>
  );
};
