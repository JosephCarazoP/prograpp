import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  LogOut,
  Flame,
  Swords,
  PackageOpen,
  GraduationCap,
  EyeOff,
  ShieldCheck,
  Code2,
  Database,
  Trophy,
  CheckCircle2,
  Lock,
  Zap,
  Star,
  User,
  Settings,
  Check,
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  Award,
  Shirt
} from 'lucide-react';
import { UserProfile, LearningPath as PathType } from '../types/user';
import { LessonProgress } from '../types/progress';
import { UNITS_KOTLIN, UNITS_SQL } from '../content';
import { userService } from '../services/userService';
import { authService } from '../services/authService';
import { soundService } from '../services/soundService';
import { storageService } from '../services/storageService';
import { DevAvatar } from './Avatars';
import { AVATARS } from '../constants/avatars';

interface ProfilePageProps {
  user: UserProfile;
  progress?: Record<string, LessonProgress>;
  hasPendingDiagnostic?: boolean;
  onBack: () => void;
  onUpdate: (updated: UserProfile) => void;
  onOpenAuth: () => void;
  onOpenAcademic?: () => void;
  onOpenDiagnostic?: () => void;
  onOpenFinalTest?: () => void;
  onOpenLocker?: () => void;
  onSignOut?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  progress = {},
  hasPendingDiagnostic = false,
  onBack,
  onUpdate,
  onOpenAuth,
  onOpenAcademic,
  onOpenDiagnostic,
  onOpenFinalTest,
  onOpenLocker,
  onSignOut
}) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarId || 'robot_byte');
  const selectedTheme = 'theme_default';
  const [selectedPath, setSelectedPath] = useState<PathType>(user.currentPath || 'kotlin');
  const [soundEnabled, setSoundEnabled] = useState(!soundService.getMuted());
  const [activeTab, setActiveTab] = useState<'stats' | 'powerups' | 'settings'>('stats');
  const [copied, setCopied] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [evaluationAlert, setEvaluationAlert] = useState<string | null>(null);

  const totalXp = user.totalXp || 0;
  const currentLevel = Math.floor(totalXp / 100) + 1;
  const xpInCurrentLevel = totalXp - (currentLevel - 1) * 100;
  const chestsCount = user.openedChests?.length || 0;
  const bossesCount = user.defeatedBosses?.length || 0;
  const streakCount = user.streak?.count || 0;

  // Cálculo de completado de todo el curso (100% de lecciones requeridas para la Prueba Final)
  const currentUnits = selectedPath === 'sql' ? UNITS_SQL : UNITS_KOTLIN;
  const totalLessons = currentUnits.reduce((acc, u) => acc + u.lessons.length, 0);
  const completedLessons = currentUnits.reduce((acc, u) => {
    return acc + u.lessons.filter(l => (progress[l.id]?.starsEarned || 0) > 0).length;
  }, 0);
  const isCourseCompleted = totalLessons > 0 && completedLessons >= totalLessons;

  const getRankTitle = (lvl: number) => {
    if (lvl >= 15) return 'Arquitecto Cósmico';
    if (lvl >= 10) return 'Ingeniero Senior';
    if (lvl >= 6) return 'Dev Full-Stack';
    if (lvl >= 3) return 'Junior Dev';
    return 'Aprendiz';
  };

  const achievements = [
    {
      id: 'first_level',
      title: 'Primer Compilado',
      desc: 'Completar tu primer nivel con éxito',
      unlocked: totalXp >= 30,
      icon: CheckCircle2,
      color: '#22C55E'
    },
    {
      id: 'first_chest',
      title: 'Cazador de Botín',
      desc: 'Abrir tu primer cofre de recompensas',
      unlocked: chestsCount >= 1,
      icon: PackageOpen,
      color: '#F59E0B'
    },
    {
      id: 'boss_slayer',
      title: 'Depurador Supremo',
      desc: 'Derrotar a un Jefe de unidad en combate',
      unlocked: bossesCount >= 1,
      icon: Swords,
      color: '#EF4444'
    },
    {
      id: 'streak_3',
      title: 'Disciplina Binaria',
      desc: 'Mantener una racha de 3 o más días',
      unlocked: streakCount >= 3,
      icon: Flame,
      color: '#F97316'
    },
    {
      id: 'scholar',
      title: 'Mente Analítica',
      desc: 'Alcanzar el nivel 5 de programador',
      unlocked: currentLevel >= 5,
      icon: Trophy,
      color: '#8B5CF6'
    }
  ];

  // Alternar sonido de forma real
  const handleToggleSound = () => {
    const isMuted = soundService.toggleMute();
    setSoundEnabled(!isMuted);
    if (!isMuted) soundService.playToken();
  };

  // Probar efecto de sonido en tiempo real
  const handleTestSound = () => {
    soundService.playToken();
  };

  // Guardar configuración
  const handleSave = async () => {
    soundService.playToken();
    const updated: UserProfile = {
      ...user,
      displayName: displayName.trim() || user.displayName,
      avatarId: selectedAvatar,
      currentThemeId: selectedTheme,
      currentPath: selectedPath
    };
    await userService.updateProfile(updated);
    document.documentElement.setAttribute('data-theme', selectedTheme);
    onUpdate(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onBack();
    }, 800);
  };

  // Reiniciar Progreso de Aventura
  const handleResetProgress = async () => {
    soundService.playToken();
    storageService.setItem('user_progress', {});
    const resetUser: UserProfile = {
      ...user,
      totalXp: 0,
      weeklyXp: 0,
      batteries: 5,
      openedChests: [],
      defeatedBosses: []
    };
    await userService.updateProfile(resetUser);
    onUpdate(resetUser);
    setShowResetConfirm(false);
    onBack();
  };

  const handleShare = () => {
    soundService.playToken();
    const text = `🎮 PrograApp | ${user.displayName}\nNivel ${currentLevel} • ${getRankTitle(currentLevel)}\nXP: ${totalXp} | Cofres: ${chestsCount} | Jefes: ${bossesCount}\n¡Aprende programación jugando estilo Duolingo!`;
    if (navigator.share) {
      navigator.share({ title: 'Mi Perfil de Dev', text });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSignOut = async () => {
    soundService.playToken();
    await authService.signOutUser();
    if (onSignOut) {
      onSignOut();
    } else {
      onBack();
      onOpenAuth();
    }
  };


  // Cartas de comodines con la paleta y estilo visual 3D coherente con la app
  const powerupCards = [
    {
      id: 'hint',
      title: 'Profesor',
      badge: `×${user.powerups?.teacherHint || 0}`,
      tokenBg: '#0284C7',
      tokenBorder: '#38BDF8',
      tokenShadow: '#0369A1',
      icon: <GraduationCap size={28} color="#FFFFFF" strokeWidth={2.4} />,
      count: user.powerups?.teacherHint || 0
    },
    {
      id: '5050',
      title: '50 / 50',
      badge: `×${user.powerups?.eliminateOptions || 0}`,
      tokenBg: '#D97706',
      tokenBorder: '#FCD34D',
      tokenShadow: '#B45309',
      icon: <EyeOff size={28} color="#FFFFFF" strokeWidth={2.4} />,
      count: user.powerups?.eliminateOptions || 0
    },
    {
      id: 'shield',
      title: 'Escudo',
      badge: `×${user.powerups?.secondChance || 0}`,
      tokenBg: '#15803D',
      tokenBorder: '#4ADE80',
      tokenShadow: '#166534',
      icon: <ShieldCheck size={28} color="#FFFFFF" strokeWidth={2.4} />,
      count: user.powerups?.secondChance || 0
    },
    {
      id: 'code',
      title: 'Pista Código',
      badge: `×${user.powerups?.codePeek || 0}`,
      tokenBg: '#7E22CE',
      tokenBorder: '#C084FC',
      tokenShadow: '#6B21A8',
      icon: <Code2 size={28} color="#FFFFFF" strokeWidth={2.4} />,
      count: user.powerups?.codePeek || 0
    }
  ];

  return (
    <div className="profile-page-root" role="dialog" aria-modal="true" aria-label="Perfil de usuario">
      <div className="profile-page-container duo-profile-screen">
        {/* ═══ BANNER VERDE DUOLINGO CON AVATAR ARRIBA (FOTO 2) ═══ */}
        <section className="duo-profile-green-banner">
          {/* Top Bar: Volver, Nombre del Usuario, Compartir y Ajustes */}
          <div className="duo-profile-top-bar">
            <button
              onClick={() => {
                soundService.playToken();
                onBack();
              }}
              className="duo-profile-header-icon-btn"
              title="Volver al Camino"
              aria-label="Volver al Camino"
              type="button"
            >
              <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2.8} />
            </button>

            <span className="duo-profile-header-username">{displayName}</span>

            <div className="duo-profile-header-actions">
              <button
                onClick={handleShare}
                className="duo-profile-header-icon-btn"
                title="Compartir Perfil"
                aria-label="Compartir Perfil"
                type="button"
              >
                <Share2 size={20} color="#FFFFFF" strokeWidth={2.6} />
              </button>
              <button
                onClick={() => {
                  soundService.playToken();
                  setActiveTab('settings');
                }}
                className="duo-profile-header-icon-btn"
                title="Ajustes de Cuenta"
                aria-label="Ajustes de Cuenta"
                type="button"
              >
                <Settings size={20} color="#FFFFFF" strokeWidth={2.6} />
              </button>
            </div>
          </div>

          {/* AVATAR ARRIBA (CENTRO DE LA SECCIÓN VERDE DUOLINGO) */}
          <div className="duo-profile-avatar-hero-slot">
            <DevAvatar
              avatarId={selectedAvatar}
              skinId={user.equippedSkin}
              size={120}
            />
          </div>
        </section>

        {/* ═══ HOJA BLANCA CURVADA DEBAJO (FOTO 2) ═══ */}
        <main className="duo-profile-white-sheet">
          {/* Meta Handle y Miembro Desde */}
          <div className="duo-profile-handle-tag">
            <span>@{user.studentCode ? user.studentCode.toUpperCase() : 'DEV'}</span>
            <span>•</span>
            <span>UNIDO EN 2024</span>
            {user.group && (
              <>
                <span>•</span>
                <span>{user.group.toUpperCase()}</span>
              </>
            )}
          </div>

          {/* Fila de Insignias y Datos */}
          <div className="duo-profile-tags-row">
            <div className="duo-profile-tag-pill path">
              {selectedPath === 'kotlin' ? (
                <>
                  <Code2 size={14} color="#7C3AED" strokeWidth={2.6} />
                  <span>Kotlin</span>
                </>
              ) : (
                <>
                  <Database size={14} color="#0284C7" strokeWidth={2.6} />
                  <span>SQL</span>
                </>
              )}
            </div>

            <div className="duo-profile-tag-pill rank">
              <Star size={14} fill="#EAB308" color="#EAB308" />
              <span>Nivel {currentLevel} · {getRankTitle(currentLevel)}</span>
            </div>

            {user.idNumber && (
              <div className="duo-profile-tag-pill id">
                <span>Cédula: {user.idNumber}</span>
              </div>
            )}
          </div>

          {/* BOTÓN DUOLINGO BLANCO: + COMPARTIR PERFIL (Estilo "+ ADD FRIENDS" de Foto 2) */}
          <div className="duo-profile-cta-group">
            <button
              type="button"
              className="duo-profile-white-btn"
              onClick={handleShare}
            >
              <Share2 size={16} strokeWidth={2.6} />
              <span>{copied ? '¡ENLACE COPIADO!' : '+ COMPARTIR PERFIL'}</span>
            </button>

            {onOpenLocker && (
              <button
                type="button"
                className="duo-profile-white-btn locker"
                onClick={() => {
                  soundService.playToken();
                  onOpenLocker();
                }}
              >
                <Shirt size={16} strokeWidth={2.6} />
                <span>VESTIDOR 3D (SKINS)</span>
              </button>
            )}
          </div>

          {/* ─── SECCIÓN: OVERVIEW (FOTO 2) ─── */}
          <div className="duo-profile-section-title">OVERVIEW</div>
          <div className="duo-profile-overview-box">
            {/* Racha */}
            <div className="duo-overview-item">
              <Flame size={24} color="#FF9500" fill="#FF9500" />
              <div className="duo-overview-item-text">
                <span className="duo-overview-item-val">{streakCount} días</span>
                <span className="duo-overview-item-lbl">Racha</span>
              </div>
            </div>

            {/* Total XP */}
            <div className="duo-overview-item">
              <Zap size={24} color="#0284C7" fill="#0284C7" />
              <div className="duo-overview-item-text">
                <span className="duo-overview-item-val">{totalXp.toLocaleString()} XP</span>
                <span className="duo-overview-item-lbl">Total Exp</span>
              </div>
            </div>

            {/* Rango */}
            <div className="duo-overview-item">
              <Award size={24} color="#EAB308" />
              <div className="duo-overview-item-text">
                <span className="duo-overview-item-val">{getRankTitle(currentLevel)}</span>
                <span className="duo-overview-item-lbl">Rango</span>
              </div>
            </div>

            {/* Retos y Jefes */}
            <div className="duo-overview-item">
              <Trophy size={24} color="#8B5CF6" />
              <div className="duo-overview-item-text">
                <span className="duo-overview-item-val">{bossesCount + chestsCount}</span>
                <span className="duo-overview-item-lbl">Jefes & Cofres</span>
              </div>
            </div>
          </div>

          {/* Barra de Progreso XP de Nivel */}
          <div className="duo-profile-xp-meter">
            <div className="duo-profile-xp-meter-labels">
              <span>Nivel {currentLevel}</span>
              <span>{xpInCurrentLevel} / 100 XP</span>
            </div>
            <div className="duo-profile-xp-meter-track">
              <div
                className="duo-profile-xp-meter-fill"
                style={{ width: `${Math.min(100, Math.max(6, (xpInCurrentLevel / 100) * 100))}%` }}
              />
            </div>
          </div>

          {/* ─── SELECTOR DE PESTAÑAS SECUNDARIAS ─── */}
          <nav className="profile-tabs-dock" aria-label="Secciones del perfil">
            {[
              { key: 'stats' as const, icon: <Trophy size={16} strokeWidth={2.4} />, label: 'Logros' },
              { key: 'powerups' as const, icon: <Zap size={16} strokeWidth={2.4} />, label: 'Comodines' },
              { key: 'settings' as const, icon: <Settings size={16} strokeWidth={2.4} />, label: 'Ajustes' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  soundService.playToken();
                  setActiveTab(tab.key);
                }}
                className={`profile-tab-pill ${activeTab === tab.key ? 'active' : ''}`}
                type="button"
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* ═══ PESTAÑA 1: LOGROS ═══ */}
          {activeTab === 'stats' && (
            <section aria-label="Logros y medallas">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {achievements.map((ach) => {
                  const Icon = ach.icon;
                  return (
                    <div
                      key={ach.id}
                      style={{
                        background: ach.unlocked ? '#FFFFFF' : '#F8FAFC',
                        border: '2px solid #E2E8F0',
                        borderBottom: `4px solid ${ach.unlocked ? '#CBD5E1' : '#E2E8F0'}`,
                        borderRadius: 16,
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        opacity: ach.unlocked ? 1 : 0.65
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 14,
                          background: ach.unlocked ? `${ach.color}20` : '#F1F5F9',
                          border: `2px solid ${ach.unlocked ? ach.color : '#CBD5E1'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Icon size={22} color={ach.unlocked ? ach.color : '#94A3B8'} strokeWidth={2.4} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.94rem',
                            fontWeight: 800,
                            color: ach.unlocked ? '#0F172A' : '#64748B',
                            marginBottom: 2
                          }}
                        >
                          {ach.title}
                        </div>
                        <div
                          style={{
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            color: '#64748B',
                            lineHeight: 1.3
                          }}
                        >
                          {ach.desc}
                        </div>
                      </div>

                      {ach.unlocked ? (
                        <div
                          style={{
                            background: '#DCFCE7',
                            color: '#15803D',
                            border: '1.5px solid #86EFAC',
                            padding: '4px 10px',
                            borderRadius: 10,
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Check size={14} strokeWidth={3} />
                          <span>LISTO</span>
                        </div>
                      ) : (
                        <div
                          style={{
                            background: '#F1F5F9',
                            color: '#94A3B8',
                            border: '1.5px solid #CBD5E1',
                            padding: '4px 10px',
                            borderRadius: 10,
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Lock size={12} strokeWidth={2.5} />
                          <span>BLOQUEADO</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ═══ PESTAÑA 2: COMODINES (Tarjetas 3D Coherentes con la App) ═══ */}
          {activeTab === 'powerups' && (
            <section aria-label="Inventario de comodines">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {powerupCards.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: '#FFFFFF',
                      border: '2px solid #E2E8F0',
                      boxShadow: '0 4px 0 #CBD5E1',
                      borderRadius: 20,
                      padding: '18px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative',
                      opacity: item.count === 0 ? 0.6 : 1
                    }}
                  >
                    {/* Token de Icono 3D */}
                    <div
                      style={{
                        width: 58,
                        height: 54,
                        borderRadius: 16,
                        background: item.tokenBg,
                        border: `2px solid ${item.tokenBorder}`,
                        boxShadow: `0 4px 0 ${item.tokenShadow}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10
                      }}
                    >
                      {item.icon}
                    </div>

                    <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1E293B', marginBottom: 6 }}>
                      {item.title}
                    </div>

                    <div
                      style={{
                        background: '#F1F5F9',
                        border: '1.5px solid #CBD5E1',
                        boxShadow: '0 2px 0 #94A3B8',
                        color: '#475569',
                        borderRadius: 999,
                        padding: '3px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.badge} DISPONIBLES
                    </div>
                  </div>
                ))}
              </div>

              {/* Guía Explicativa de Comodines en Tarjeta Duolingo 3D */}
              <div className="profile-card-duo">
                <span className="profile-card-label">Guía de uso de tus comodines</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    {
                      icon: <GraduationCap size={18} color="#38BDF8" strokeWidth={2.4} />,
                      name: 'Profesor',
                      desc: 'Muestra una pista conceptual explicada sin penalización'
                    },
                    {
                      icon: <EyeOff size={18} color="#F59E0B" strokeWidth={2.4} />,
                      name: '50 / 50',
                      desc: 'Descarta 2 opciones erróneas de la pantalla al instante'
                    },
                    {
                      icon: <ShieldCheck size={18} color="#22C55E" strokeWidth={2.4} />,
                      name: 'Escudo',
                      desc: 'Absorbe automáticamente tu próximo error en lección'
                    },
                    {
                      icon: <Code2 size={18} color="#A855F7" strokeWidth={2.4} />,
                      name: 'Código',
                      desc: 'Resalta la sintaxis de la solución en el editor de código'
                    }
                  ].map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          background: '#F8FAFC',
                          border: '1.5px solid #CBD5E1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {p.icon}
                      </div>
                      <div style={{ fontSize: '0.82rem', lineHeight: 1.35 }}>
                        <strong style={{ color: '#1E293B' }}>{p.name}: </strong>
                        <span style={{ color: '#64748B' }}>{p.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══ PESTAÑA 3: AJUSTES (100% FUNCIONALES Y REALES) ═══ */}
          {activeTab === 'settings' && (
            <section aria-label="Ajustes de perfil" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Nombre de Dev */}
              <div className="profile-card-duo">
                <label htmlFor="dev-name-input" className="profile-card-label">
                  Nombre de Dev
                </label>
                <div className="profile-input-box">
                  <User size={18} color="var(--text-dim)" strokeWidth={2.4} />
                  <input
                    id="dev-name-input"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    maxLength={24}
                    className="profile-name-field"
                    placeholder="Tu alias de programador"
                  />
                </div>
              </div>

              {/* Selector de Avatar */}
              <div className="profile-card-duo">
                <span className="profile-card-label">Elige tu Avatar</span>
                <div className="profile-avatar-grid-duo">
                  {AVATARS.map((av) => (
                    <button
                      key={av.id}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedAvatar(av.id);
                      }}
                      className={`profile-avatar-btn ${selectedAvatar === av.id ? 'selected' : ''}`}
                      type="button"
                    >
                      <DevAvatar
                        avatarId={av.id}
                        skinId={user.equippedSkin}
                        size={42}
                      />
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          color: selectedAvatar === av.id ? '#FF9500' : '#64748B'
                        }}
                      >
                        {av.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tema Visual Oficial */}
              <div className="profile-card-duo">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span className="profile-card-label" style={{ margin: 0 }}>Tema Visual Oficial</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16A34A' }}>
                    Predeterminado
                  </span>
                </div>
                <div className="profile-theme-grid-duo">
                  <div
                    className="profile-theme-btn selected"
                    style={{ background: '#121D28', cursor: 'default' }}
                  >
                    Paint Studio
                  </div>
                </div>
              </div>

              {/* Ajustes de Audio y Sonido */}
              <div className="profile-card-duo">
                <span className="profile-card-label">Audio y Efectos de Juego</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className={`btn-3d ${soundEnabled ? 'btn-green' : 'btn-outline'}`}
                    style={{ flex: 1, padding: 12, fontSize: '0.86rem' }}
                    onClick={handleToggleSound}
                    type="button"
                  >
                    {soundEnabled ? (
                      <>
                        <Volume2 size={18} strokeWidth={2.4} /> Sonido: Activado
                      </>
                    ) : (
                      <>
                        <VolumeX size={18} strokeWidth={2.4} /> Sonido: Silenciado
                      </>
                    )}
                  </button>
                  <button
                    className="btn-3d btn-outline"
                    style={{ padding: '12px 14px', fontSize: '0.86rem', minWidth: 'auto' }}
                    onClick={handleTestSound}
                    title="Probar Sonido"
                    type="button"
                  >
                    🔊 Probar
                  </button>
                </div>
              </div>

              {/* Ruta Predeterminada de Estudio */}
              <div className="profile-card-duo">
                <span className="profile-card-label">Ruta Activa de Aprendizaje</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className={`btn-3d ${selectedPath === 'kotlin' ? 'btn-orange' : 'btn-outline'}`}
                    style={{ flex: 1, padding: 12, fontSize: '0.86rem' }}
                    onClick={() => {
                      soundService.playToken();
                      setSelectedPath('kotlin');
                    }}
                    type="button"
                  >
                    <BookOpen size={17} strokeWidth={2.4} /> Kotlin
                  </button>
                  <button
                    className={`btn-3d ${selectedPath === 'sql' ? 'btn-blue' : 'btn-outline'}`}
                    style={{ flex: 1, padding: 12, fontSize: '0.86rem' }}
                    onClick={() => {
                      soundService.playToken();
                      setSelectedPath('sql');
                    }}
                    type="button"
                  >
                    <Zap size={17} strokeWidth={2.4} /> SQL
                  </button>
                </div>
              </div>

              {/* Botón 3D Guardar */}
              <button
                className="btn-3d btn-green"
                onClick={handleSave}
                style={{ padding: '16px 20px', fontSize: '1rem', marginTop: 4 }}
              >
                <CheckCircle2 size={20} strokeWidth={2.5} />
                {saveSuccess ? '¡Cambios Guardados!' : 'Guardar Cambios'}
              </button>

              {/* Zona de Reinicio de Progreso */}
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 18,
                  padding: 16,
                  marginTop: 6
                }}
              >
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#F87171', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                  Zona de Reinicio
                </span>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 12, lineHeight: 1.35 }}>
                  ¿Deseas empezar tu aventura desde el nivel 1? Esto borrará tus niveles completados y reiniciará tu EXP.
                </p>
                {showResetConfirm ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn-3d btn-red"
                      style={{ flex: 1, padding: 11, fontSize: '0.84rem' }}
                      onClick={handleResetProgress}
                    >
                      Sí, Reiniciar Aventura
                    </button>
                    <button
                      className="btn-3d btn-outline"
                      style={{ flex: 1, padding: 11, fontSize: '0.84rem' }}
                      onClick={() => setShowResetConfirm(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-3d btn-outline"
                    style={{ width: '100%', padding: 11, fontSize: '0.84rem', color: '#F87171' }}
                    onClick={() => setShowResetConfirm(true)}
                  >
                    <RotateCcw size={15} strokeWidth={2.4} /> Reiniciar Progreso de Aventura
                  </button>
                )}
              </div>
            </section>
          )}

          {/* ─── ZONA ACADÉMICA / INVESTIGACIÓN ─── */}
          {authService.isCurrentUserAdmin() && onOpenAcademic && (
            <div style={{ marginTop: 16 }}>
              <button
                className="btn-3d btn-orange"
                style={{ width: '100%', padding: '14px 18px', fontSize: '0.94rem' }}
                onClick={() => {
                  soundService.playToken();
                  onOpenAcademic();
                }}
              >
                <ShieldCheck size={18} />
                Panel de Seguimiento Académico (Docente)
              </button>
            </div>
          )}

          {/* Evaluaciones Estandarizadas para Estudiantes */}
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            {onOpenDiagnostic && (
              <button
                className={`btn-3d ${hasPendingDiagnostic ? 'btn-blue' : 'btn-outline'}`}
                style={{
                  flex: 1,
                  padding: 12,
                  fontSize: '0.84rem',
                  opacity: hasPendingDiagnostic ? 1 : 0.65,
                  cursor: hasPendingDiagnostic ? 'pointer' : 'not-allowed'
                }}
                onClick={() => {
                  if (!hasPendingDiagnostic) {
                    soundService.playError();
                    setEvaluationAlert('🔒 La Evaluación Diagnóstica solo está disponible cuando el docente Joseph Carazo la habilita para tu cuenta desde el Panel de Seguimiento.');
                    return;
                  }
                  soundService.playToken();
                  onOpenDiagnostic();
                }}
                type="button"
              >
                {hasPendingDiagnostic ? <Award size={16} /> : <Lock size={16} />}
                <span>{hasPendingDiagnostic ? 'Evaluación Diagnóstica' : 'Diagnóstico (No asignado)'}</span>
              </button>
            )}
            {onOpenFinalTest && (
              <button
                className={`btn-3d ${isCourseCompleted ? 'btn-purple' : 'btn-outline'}`}
                style={{
                  flex: 1,
                  padding: 12,
                  fontSize: '0.84rem',
                  opacity: isCourseCompleted ? 1 : 0.65,
                  cursor: isCourseCompleted ? 'pointer' : 'not-allowed'
                }}
                onClick={() => {
                  if (!isCourseCompleted) {
                    soundService.playError();
                    setEvaluationAlert(`🔒 La Prueba Final requiere completar el 100% del curso (${completedLessons}/${totalLessons} lecciones completadas). ¡Sigue avanzando en tu camino!`);
                    return;
                  }
                  soundService.playToken();
                  onOpenFinalTest();
                }}
                type="button"
              >
                {isCourseCompleted ? <Trophy size={16} /> : <Lock size={16} />}
                <span>{isCourseCompleted ? 'Prueba Final' : `Prueba Final (${completedLessons}/${totalLessons})`}</span>
              </button>
            )}
          </div>

          {/* Alerta explicativa de estado de evaluaciones */}
          {evaluationAlert && (
            <div
              style={{
                marginTop: 10,
                background: '#FEF2F2',
                border: '2px solid #FCA5A5',
                borderRadius: 14,
                padding: '10px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#991B1B',
                lineHeight: 1.35,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8
              }}
            >
              <span>{evaluationAlert}</span>
              <button
                onClick={() => setEvaluationAlert(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#991B1B', fontWeight: 800 }}
                type="button"
              >
                ✕
              </button>
            </div>
          )}

          {/* ─── ACCIONES DE CUENTA DUOLINGO 3D ─── */}
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button
              className="btn-3d btn-outline"
              style={{ flex: 1, padding: 13, fontSize: '0.85rem' }}
              onClick={() => {
                soundService.playToken();
                setActiveTab('settings');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              type="button"
            >
              <Settings size={16} strokeWidth={2.4} />
              Ajustes de Cuenta
            </button>

            <button
              className="btn-3d btn-outline"
              style={{
                flex: 1,
                padding: 13,
                fontSize: '0.85rem',
                color: '#F87171'
              }}
              onClick={handleSignOut}
            >
              <LogOut size={16} strokeWidth={2.4} />
              Cerrar Sesión
            </button>
          </div>

          {/* Toast de Perfil Copiado */}
          {copied && (
            <div className="profile-toast-box">
              ¡Enlace de perfil copiado al portapapeles!
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
