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
  Shirt,
  AlertTriangle
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
  const [resetInputText, setResetInputText] = useState('');
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
    setResetInputText('');
    onBack();
  };

  const handleShare = () => {
    soundService.playToken();
    const text = `PrograApp | ${user.displayName}\nNivel ${currentLevel} • ${getRankTitle(currentLevel)}\nXP: ${totalXp} | Cofres: ${chestsCount} | Jefes: ${bossesCount}\n¡Aprende programación jugando!`;
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
    <div className="profile-page-root" role="region" aria-label="Perfil de usuario">
      <div className="profile-page-container duo-profile-screen">
        {/* ═══ CABECERA NEO-BRUTALISM (IGUAL A TODAS LAS PANTALLAS) ═══ */}
        <header className="duo-profile-topbar">
          <div className="duo-profile-nav-left">
            <button
              type="button"
              className="duo-3d-back-btn"
              onClick={() => {
                soundService.playToken();
                onBack();
              }}
              title="Volver a la ruta de aprendizaje"
              aria-label="Volver"
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </button>
            <div>
              <div className="duo-profile-badge-top">
                <User size={13} strokeWidth={2.6} /> PERFIL DE ESTUDIANTE
              </div>
              <h1 className="duo-profile-top-title">{displayName}</h1>
            </div>
          </div>

          <div className="duo-profile-top-actions">
            <button
              type="button"
              className="duo-3d-back-btn"
              onClick={handleShare}
              title="Compartir Perfil"
              aria-label="Compartir Perfil"
            >
              <Share2 size={18} strokeWidth={2.6} />
            </button>
          </div>
        </header>

        {/* ═══ TARJETA HERO DEL ESTUDIANTE NEO-BRUTALISM ═══ */}
        <div className="duo-profile-hero-card">
          <div className="duo-profile-hero-main">
            <div className="neo-profile-avatar-frame">
              <DevAvatar
                avatarId={selectedAvatar}
                skinId={user.equippedSkin}
                size={88}
              />
            </div>

            <div className="duo-profile-hero-info">
              <div className="duo-profile-name-row">
                <h2 className="duo-profile-name-text">{displayName}</h2>
                <span className="duo-profile-code-chip">@{user.studentCode ? user.studentCode.toUpperCase() : 'DEV'}</span>
              </div>

              <div className="duo-profile-chips-wrap">
                {user.group && (
                  <span className="duo-profile-meta-chip group">{user.group.toUpperCase()}</span>
                )}
                <span className={`duo-profile-meta-chip path ${selectedPath}`}>
                  {selectedPath === 'kotlin' ? (
                    <>
                      <Code2 size={13} color="#000000" strokeWidth={2.6} />
                      <span>Kotlin</span>
                    </>
                  ) : (
                    <>
                      <Database size={13} color="#000000" strokeWidth={2.6} />
                      <span>SQL</span>
                    </>
                  )}
                </span>
                <span className="duo-profile-meta-chip rank">
                  <Star size={13} fill="#EAB308" color="#000000" strokeWidth={2} />
                  <span>Nivel {currentLevel} · {getRankTitle(currentLevel)}</span>
                </span>
                {user.idNumber && (
                  <span className="duo-profile-meta-chip id">
                    <span>Cédula: {user.idNumber}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="duo-profile-cta-group">
            <button
              type="button"
              className="duo-profile-white-btn"
              onClick={handleShare}
            >
              <Share2 size={17} strokeWidth={2.6} />
              <span>{copied ? '¡ENLACE COPIADO!' : 'COMPARTIR PERFIL'}</span>
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
                <Shirt size={17} strokeWidth={2.6} />
                <span>VESTIDOR (SKINS)</span>
              </button>
            )}
          </div>
        </div>

        {/* ═══ HOJA DE CONTENIDO NEO-BRUTALISM ═══ */}
        <main className="duo-profile-white-sheet">

          {/* ─── SECCIÓN: OVERVIEW NEO-BRUTALISM ─── */}
          <div className="duo-profile-section-title">
            <Award size={15} color="#000000" strokeWidth={3} />
            <span>OVERVIEW</span>
          </div>
          <div className="duo-profile-overview-box">
            {/* Racha con icono animado neo-brutal */}
            <div className="duo-overview-card streak">
              <div className="duo-overview-icon streak">
                <Flame size={24} color="#000000" fill="#FF5400" strokeWidth={2.4} />
              </div>
              <div className="duo-overview-item-text">
                <span className="duo-overview-item-val">{streakCount} días</span>
                <span className="duo-overview-item-lbl">Racha</span>
              </div>
            </div>

            {/* Total XP */}
            <div className="duo-overview-card xp">
              <div className="duo-overview-icon xp">
                <Zap size={24} color="#000000" fill="#06B6D4" strokeWidth={2.4} />
              </div>
              <div className="duo-overview-item-text">
                <span className="duo-overview-item-val">{totalXp.toLocaleString()} XP</span>
                <span className="duo-overview-item-lbl">Total Exp</span>
              </div>
            </div>

            {/* Rango */}
            <div className="duo-overview-card rank">
              <div className="duo-overview-icon rank">
                <Award size={24} color="#000000" fill="#EAB308" strokeWidth={2.4} />
              </div>
              <div className="duo-overview-item-text">
                <span className="duo-overview-item-val">{getRankTitle(currentLevel)}</span>
                <span className="duo-overview-item-lbl">Rango</span>
              </div>
            </div>

            {/* Retos y Jefes */}
            <div className="duo-overview-card bosses">
              <div className="duo-overview-icon bosses">
                <Trophy size={24} color="#000000" fill="#8B5CF6" strokeWidth={2.4} />
              </div>
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

          {/* ═══ PESTAÑA 1: LOGROS NEO-BRUTALISM ═══ */}
          {activeTab === 'stats' && (
            <section aria-label="Logros y medallas">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {achievements.map((ach) => {
                  const Icon = ach.icon;
                  return (
                    <div
                      key={ach.id}
                      style={{
                        background: ach.unlocked ? '#FFFFFF' : '#F8FAFC',
                        border: '2.5px solid #000000',
                        boxShadow: ach.unlocked ? '3.5px 3.5px 0px #000000' : '2px 2px 0px #CBD5E1',
                        borderRadius: 16,
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        opacity: ach.unlocked ? 1 : 0.7
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: ach.unlocked ? `${ach.color}25` : '#F1F5F9',
                          border: '2px solid #000000',
                          boxShadow: '2px 2px 0px #000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Icon size={22} color={ach.unlocked ? ach.color : '#64748B'} strokeWidth={2.6} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.94rem',
                            fontWeight: 900,
                            color: '#000000',
                            marginBottom: 2
                          }}
                        >
                          {ach.title}
                        </div>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: '#475569',
                            lineHeight: 1.3
                          }}
                        >
                          {ach.desc}
                        </div>
                      </div>

                      {ach.unlocked ? (
                        <div
                          style={{
                            background: '#4ADE80',
                            color: '#000000',
                            border: '2px solid #000000',
                            boxShadow: '1.5px 1.5px 0px #000000',
                            padding: '4px 10px',
                            borderRadius: 10,
                            fontSize: '0.72rem',
                            fontWeight: 900,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Check size={14} strokeWidth={3.2} />
                          <span>LISTO</span>
                        </div>
                      ) : (
                        <div
                          style={{
                            background: '#E2E8F0',
                            color: '#475569',
                            border: '2px solid #000000',
                            boxShadow: '1.5px 1.5px 0px #000000',
                            padding: '4px 10px',
                            borderRadius: 10,
                            fontSize: '0.72rem',
                            fontWeight: 900,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Lock size={12} strokeWidth={2.6} />
                          <span>BLOQUEADO</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ═══ PESTAÑA 2: COMODINES NEO-BRUTALISM ═══ */}
          {activeTab === 'powerups' && (
            <section aria-label="Inventario de comodines">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {powerupCards.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: '#FFFFFF',
                      border: '2.5px solid #000000',
                      boxShadow: '4px 4px 0px #000000',
                      borderRadius: 18,
                      padding: '18px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative',
                      opacity: item.count === 0 ? 0.65 : 1
                    }}
                  >
                    {/* Token de Icono Neo-brutalism */}
                    <div
                      style={{
                        width: 58,
                        height: 54,
                        borderRadius: 14,
                        background: item.tokenBg,
                        border: '2.5px solid #000000',
                        boxShadow: '2.5px 2.5px 0px #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10
                      }}
                    >
                      {item.icon}
                    </div>

                    <div style={{ fontSize: '0.94rem', fontWeight: 900, color: '#000000', marginBottom: 6 }}>
                      {item.title}
                    </div>

                    <div
                      style={{
                        background: '#FFE600',
                        border: '2px solid #000000',
                        boxShadow: '1.5px 1.5px 0px #000000',
                        color: '#000000',
                        borderRadius: 10,
                        padding: '3px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.badge} DISPONIBLES
                    </div>
                  </div>
                ))}
              </div>

              {/* Guía Explicativa de Comodines en Tarjeta Neo-brutalism */}
              <div className="profile-card-duo">
                <span className="profile-card-label">Guía de uso de tus comodines</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    {
                      icon: <GraduationCap size={18} color="#0284C7" strokeWidth={2.6} />,
                      name: 'Profesor',
                      desc: 'Muestra una pista conceptual explicada sin penalización'
                    },
                    {
                      icon: <EyeOff size={18} color="#D97706" strokeWidth={2.6} />,
                      name: '50 / 50',
                      desc: 'Descarta 2 opciones erróneas de la pantalla al instante'
                    },
                    {
                      icon: <ShieldCheck size={18} color="#16A34A" strokeWidth={2.6} />,
                      name: 'Escudo',
                      desc: 'Absorbe automáticamente tu próximo error en lección'
                    },
                    {
                      icon: <Code2 size={18} color="#7C3AED" strokeWidth={2.6} />,
                      name: 'Código',
                      desc: 'Resalta la sintaxis de la solución en el editor de código'
                    }
                  ].map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: '#F8FAFC',
                          border: '2px solid #000000',
                          boxShadow: '1.5px 1.5px 0px #000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {p.icon}
                      </div>
                      <div style={{ fontSize: '0.82rem', lineHeight: 1.35 }}>
                        <strong style={{ color: '#000000', fontWeight: 900 }}>{p.name}: </strong>
                        <span style={{ color: '#475569', fontWeight: 700 }}>{p.desc}</span>
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
                    Probar Sonido
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
                    setEvaluationAlert('La Evaluación Diagnóstica solo está disponible cuando el docente Joseph Carazo la habilita para tu cuenta desde el Panel de Seguimiento.');
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
                    setEvaluationAlert(`La Prueba Final requiere completar el 100% del curso (${completedLessons}/${totalLessons} lecciones completadas). ¡Sigue avanzando en tu camino!`);
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

          {/* Alerta explicativa de estado de evaluaciones Neo-brutalism */}
          {evaluationAlert && (
            <div
              style={{
                marginTop: 12,
                background: '#FEF2F2',
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                borderRadius: 14,
                padding: '12px 14px',
                fontSize: '0.84rem',
                fontWeight: 800,
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
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #000000',
                  boxShadow: '1.5px 1.5px 0px #000000',
                  borderRadius: 8,
                  cursor: 'pointer',
                  color: '#000000',
                  fontWeight: 900,
                  width: 26,
                  height: 26,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
                type="button"
                aria-label="Cerrar alerta"
              >
                ✕
              </button>
            </div>
          )}

          {/* ─── ACCIONES DE CUENTA NEO-BRUTALISM ─── */}
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
              <Settings size={16} strokeWidth={2.6} />
              Ajustes de Cuenta
            </button>

            <button
              className="btn-3d btn-outline"
              style={{
                flex: 1,
                padding: 13,
                fontSize: '0.85rem',
                color: '#EF4444'
              }}
              onClick={handleSignOut}
            >
              <LogOut size={16} strokeWidth={2.6} />
              Cerrar Sesión
            </button>
          </div>

          {/* ─── ZONA DE RIESGO NEO-BRUTALISM (100% ABAJO DEL TODO) ─── */}
          <div
            style={{
              marginTop: 26,
              marginBottom: 16,
              background: '#FFF5F5',
              border: '2.5px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              borderRadius: 18,
              padding: '16px 18px',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: '#EF4444',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0px #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <AlertTriangle size={17} strokeWidth={2.8} />
              </div>
              <span
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 900,
                  color: '#000000',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                Zona de Riesgo
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#7F1D1D', margin: '0 0 12px 0', lineHeight: 1.45, fontWeight: 700 }}>
              Esta acción es destructiva e irreversible. Borrará todo tu progreso de niveles completados, devolverá tu cuenta al Nivel 1 y reiniciará tu experiencia (EXP).
            </p>

            {showResetConfirm ? (
              <div
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #000000',
                  boxShadow: '2.5px 2.5px 0px #000000',
                  borderRadius: 14,
                  padding: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}
              >
                <label style={{ fontSize: '0.8rem', fontWeight: 900, color: '#991B1B' }}>
                  Escribe <strong style={{ color: '#DC2626', textDecoration: 'underline' }}>REINICIAR</strong> para confirmar:
                </label>
                <input
                  type="text"
                  value={resetInputText}
                  onChange={(e) => setResetInputText(e.target.value)}
                  placeholder='Escribe "REINICIAR"'
                  autoFocus
                  style={{
                    padding: '10px 14px',
                    borderRadius: 12,
                    border: '2.5px solid #000000',
                    boxShadow: '2px 2px 0px #000000',
                    fontSize: '0.9rem',
                    fontWeight: 900,
                    fontFamily: 'JetBrains Mono, monospace',
                    letterSpacing: '1px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />

                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <button
                    className="btn-3d btn-red"
                    disabled={resetInputText.trim().toUpperCase() !== 'REINICIAR'}
                    style={{
                      flex: 1,
                      padding: '11px',
                      fontSize: '0.84rem',
                      opacity: resetInputText.trim().toUpperCase() === 'REINICIAR' ? 1 : 0.45,
                      cursor: resetInputText.trim().toUpperCase() === 'REINICIAR' ? 'pointer' : 'not-allowed'
                    }}
                    onClick={handleResetProgress}
                  >
                    Sí, Reiniciar Aventura
                  </button>
                  <button
                    className="btn-3d btn-outline"
                    style={{ flex: 1, padding: '11px', fontSize: '0.84rem' }}
                    onClick={() => {
                      setShowResetConfirm(false);
                      setResetInputText('');
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="btn-3d btn-outline"
                style={{
                  width: '100%',
                  padding: 12,
                  fontSize: '0.86rem',
                  color: '#DC2626'
                }}
                onClick={() => {
                  soundService.playToken();
                  setShowResetConfirm(true);
                  setResetInputText('');
                }}
              >
                <RotateCcw size={15} strokeWidth={2.6} /> Reiniciar Progreso de Aventura
              </button>
            )}
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
