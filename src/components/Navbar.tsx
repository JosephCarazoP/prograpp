import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Dumbbell,
  Code2,
  Database,
  Target,
  Volume2,
  VolumeX,
  ChevronDown,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { DevAvatar } from './Avatars';

interface NavbarProps {
  user: UserProfile;
  isAdmin?: boolean;
  onPathToggle: () => void;
  onOpenQuests: () => void;
  onOpenPractice: () => void;
  onOpenProfile: () => void;
  onOpenAcademic?: () => void;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  isAdmin = false,
  onPathToggle,
  onOpenQuests,
  onOpenPractice,
  onOpenProfile,
  onOpenAcademic,
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
          className="stat-pill streak"
          onClick={() => soundService.playToken()}
          title={`Racha activa de ${user?.streak?.count ?? 1} días`}
          type="button"
        >
          <Flame size={18} color="#FF9500" fill="#FF9500" />
          <span className="stat-number">{user?.streak?.count ?? 1}</span>
        </button>

        {/* Moneda / Bytes */}
        <button
          className="stat-pill bytes"
          onClick={() => soundService.playToken()}
          title={`${user?.bytes ?? 0} Bytes acumulados`}
          type="button"
        >
          <Zap size={17} color="#06B6D4" fill="#06B6D4" />
          <span className="stat-number">{user?.bytes ?? 0}</span>
        </button>

        {/* Baterías / Gimnasio de Práctica (Acceso directo al gimnasio) */}
        <button
          className="stat-pill energy-pill"
          onClick={() => {
            soundService.playToken();
            onOpenPractice();
          }}
          title={`Gimnasio de Práctica: ${user?.batteries ?? 5}/5 Baterías. Toca para recargar`}
          type="button"
        >
          <Dumbbell size={16} strokeWidth={2.5} color="#22C55E" />
          <span className="stat-number">{user?.batteries ?? 5}</span>
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
            className="btn-3d btn-orange"
            onClick={() => {
              soundService.playToken();
              onOpenAcademic();
            }}
            title="Seguimiento Académico (Exclusivo Docente)"
            type="button"
            style={{
              padding: '6px 12px',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginLeft: 4
            }}
          >
            <ShieldCheck size={16} color="#FFFFFF" strokeWidth={2.5} />
            <span>Seguimiento</span>
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
