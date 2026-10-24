import React from 'react';
import {
  Flame,
  Code2,
  Database,
  ChevronDown,
  Trophy,
  Zap,
  Gift,
  User,
  ArrowRight
} from 'lucide-react';
import { UserProfile, LearningPath as PathType } from '../types/user';
import { soundService } from '../services/soundService';

export interface DesktopRightSidebarProps {
  user: UserProfile;
  currentPath: PathType;
  onPathToggle: () => void;
  onOpenStreak: () => void;
  onOpenStore: () => void;
  onOpenQuests: () => void;
  onOpenProfile: () => void;
  onNavigateToLeague: () => void;
  onOpenSeason?: (tab?: 'path' | 'quests') => void;
}

export const DesktopRightSidebar: React.FC<DesktopRightSidebarProps> = ({
  user,
  currentPath,
  onPathToggle,
  onOpenStreak,
  onOpenStore,
  onOpenQuests,
  onOpenProfile,
  onNavigateToLeague,
  onOpenSeason
}) => {
  const currentLevel = Math.floor((user?.totalXp || 0) / 100) + 1;
  const currentLvlXp = (user?.totalXp || 0) % 100;
  const streakCount = user?.streak?.count || 0;
  const bytesCount = user?.bytes || 0;

  // Meta del día simple y visual estilo Duolingo
  const dailyTargetXp = 20;
  const dailyCurrentXp = Math.min(user?.weeklyXp || 10, dailyTargetXp);
  const dailyProgressPercent = Math.min(100, Math.round((dailyCurrentXp / dailyTargetXp) * 100));

  return (
    <aside className="desktop-right-sidebar-root" aria-label="Estadísticas y Desafíos Laterales">
      {/* ═══ 1. BARRA SUPERIOR DE ESTADÍSTICAS ESTILO DUOLINGO (FLAGS / STREAK / GEMS / HEARTS) ═══ */}
      <div className="desktop-stats-bar">
        {/* Selector de Ruta / Lenguaje */}
        <button
          className="desktop-stat-pill lang-pill"
          onClick={() => {
            soundService.playToken();
            onPathToggle();
          }}
          type="button"
          title={`Cambiar ruta (Activa: ${currentPath.toUpperCase()})`}
        >
          {currentPath === 'kotlin' ? (
            <>
              <div className="stat-pill-icon kotlin-icon">
                <Code2 size={16} strokeWidth={2.8} color="#7C3AED" />
              </div>
              <span className="stat-pill-text">Kotlin</span>
            </>
          ) : (
            <>
              <div className="stat-pill-icon sql-icon">
                <Database size={16} strokeWidth={2.8} color="#0284C7" />
              </div>
              <span className="stat-pill-text">SQL</span>
            </>
          )}
          <ChevronDown size={14} strokeWidth={2.4} color="#64748B" />
        </button>

        {/* Contador de Racha */}
        <button
          className="desktop-stat-pill streak-pill"
          onClick={() => {
            soundService.playToken();
            onOpenStreak();
          }}
          type="button"
          title={`Racha actual: ${streakCount} días`}
        >
          <Flame size={18} strokeWidth={2.4} color="#EA580C" fill="#F97316" />
          <span className="stat-pill-val streak-val">{streakCount}</span>
        </button>

        {/* Monedas / Bytes (Gemas) */}
        <button
          className="desktop-stat-pill bytes-pill"
          onClick={() => {
            soundService.playToken();
            onOpenStore();
          }}
          type="button"
          title={`Tus Bytes de código: ${bytesCount}`}
        >
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>💎</span>
          <span className="stat-pill-val bytes-val">{bytesCount}</span>
        </button>
      </div>

      {/* ═══ 2. WIDGET DE LIGAS (IDÉNTICO A IMAGEN 3) ═══ */}
      <div className="desktop-widget-card league-widget">
        <div className="widget-header">
          <h3 className="widget-title">¡Compite en las Ligas!</h3>
        </div>
        <div className="widget-body">
          <div className="widget-icon-row">
            <div className="league-shield-mini">
              <Trophy size={26} strokeWidth={2.4} color="#000000" />
            </div>
            <p className="widget-text">
              Completa lecciones para ganar EXP y subir al Top 10 semanal de tu división.
            </p>
          </div>
          <button
            className="widget-cta-btn league-btn"
            onClick={() => {
              soundService.playToken();
              onNavigateToLeague();
            }}
            type="button"
          >
            <span>VER CLASIFICACIÓN</span>
            <ArrowRight size={16} strokeWidth={2.6} />
          </button>
        </div>
      </div>

      {/* ═══ WIDGET INTEGRADO: TEMPORADA 1 Y DESAFÍOS ═══ */}
      <div className="desktop-widget-card season-widget" style={{ background: '#FFFBEB' }}>
        <div className="widget-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={16} color="#D97706" fill="#F59E0B" />
            <h3 className="widget-title">Temporada 1 y Desafíos</h3>
          </div>
          <button
            className="widget-link-btn"
            onClick={() => {
              soundService.playToken();
              if (onOpenSeason) onOpenSeason('path');
              else onOpenQuests();
            }}
            type="button"
          >
            VER TODO
          </button>
        </div>
        <div className="widget-body">
          <p style={{ fontSize: '0.74rem', color: '#64748B', margin: '0 0 10px 0', fontWeight: 700 }}>
            Supera misiones diarias para ganar Puntos de Temporada y avanzar en los 100 niveles.
          </p>

          <div className="quest-row" style={{ marginBottom: '12px' }}>
            <div className="quest-icon-bubble">
              <Zap size={20} strokeWidth={2.6} color="#000000" />
            </div>
            <div className="quest-info">
              <span className="quest-name">Gana {dailyTargetXp} EXP hoy</span>
              <div className="quest-progress-track">
                <div
                  className="quest-progress-fill"
                  style={{ width: `${dailyProgressPercent}%` }}
                />
                <span className="quest-progress-label">
                  {dailyCurrentXp} / {dailyTargetXp}
                </span>
              </div>
            </div>
            <div className="quest-chest-icon" title="Cofre de recompensa diaria">
              <Gift size={22} strokeWidth={2.2} color="#000000" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              className="widget-cta-btn season-btn"
              onClick={() => {
                soundService.playToken();
                if (onOpenSeason) onOpenSeason('path');
                else onOpenQuests();
              }}
              type="button"
              style={{ background: '#FEF08A', color: '#000000', border: '2px solid #000000', padding: '7px 8px', fontSize: '0.74rem', justifyContent: 'center' }}
            >
              <span>100 NIVELES</span>
              <ArrowRight size={14} strokeWidth={2.6} />
            </button>
            <button
              className="widget-cta-btn season-btn"
              onClick={() => {
                soundService.playToken();
                if (onOpenSeason) onOpenSeason('quests');
                else onOpenQuests();
              }}
              type="button"
              style={{ background: '#FED7AA', color: '#000000', border: '2px solid #000000', padding: '7px 8px', fontSize: '0.74rem', justifyContent: 'center' }}
            >
              <span>DESAFÍOS</span>
              <ArrowRight size={14} strokeWidth={2.6} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══ 4. WIDGET DE PERFIL Y PROGRESO (IDÉNTICO A IMAGEN 3) ═══ */}
      <div className="desktop-widget-card profile-widget">
        <div className="widget-header">
          <h3 className="widget-title">Tu Progreso de Dev</h3>
        </div>
        <div className="widget-body">
          <div className="profile-widget-user-row">
            <div className="profile-widget-avatar">
              <User size={22} strokeWidth={2.4} color="#000000" />
            </div>
            <div className="profile-widget-user-details">
              <div className="profile-widget-name">
                {user?.displayName || 'Programador'}
              </div>
              <div className="profile-widget-level-badge">
                NIVEL {currentLevel} • {user?.totalXp || 0} XP
              </div>
            </div>
          </div>

          {/* Barra hacia el próximo nivel */}
          <div className="level-progress-container">
            <div className="level-progress-bar">
              <div
                className="level-progress-fill"
                style={{ width: `${currentLvlXp}%` }}
              />
            </div>
            <span className="level-progress-text">{currentLvlXp} / 100 XP para Nivel {currentLevel + 1}</span>
          </div>

          <button
            className="widget-cta-btn profile-btn"
            onClick={() => {
              soundService.playToken();
              onOpenProfile();
            }}
            type="button"
          >
            <span>VER MI PERFIL</span>
            <ArrowRight size={16} strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </aside>
  );
};
