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
  BookOpen
} from 'lucide-react';
import { UserProfile, LearningPath as PathType } from '../types/user';
import { userService } from '../services/userService';
import { authService } from '../services/authService';
import { soundService } from '../services/soundService';
import { storageService } from '../services/storageService';
import { DevAvatar } from './Avatars';
import { AVATARS, THEMES } from '../constants/avatars';

interface ProfilePageProps {
  user: UserProfile;
  onBack: () => void;
  onUpdate: (updated: UserProfile) => void;
  onOpenAuth: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onBack,
  onUpdate,
  onOpenAuth
}) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarId || 'robot_byte');
  const [selectedTheme, setSelectedTheme] = useState(user.currentThemeId || 'theme_default');
  const [selectedPath, setSelectedPath] = useState<PathType>(user.currentPath || 'kotlin');
  const [soundEnabled, setSoundEnabled] = useState(!soundService.getMuted());
  const [activeTab, setActiveTab] = useState<'stats' | 'powerups' | 'settings'>('stats');
  const [copied, setCopied] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const totalXp = user.totalXp || 0;
  const currentLevel = Math.floor(totalXp / 100) + 1;
  const xpInCurrentLevel = totalXp - (currentLevel - 1) * 100;
  const chestsCount = user.openedChests?.length || 0;
  const bossesCount = user.defeatedBosses?.length || 0;
  const streakCount = user.streak?.count || 1;

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

  // Aplicar tema en tiempo real para que los ajustes funcionen inmediatamente
  const handleSelectTheme = (themeId: string) => {
    soundService.playToken();
    setSelectedTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('prograapp_theme', themeId);
  };

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
    const g = await userService.getProfile('guest_user_1');
    onUpdate(g);
    onBack();
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
      <div className="profile-page-container">
        {/* ═══ HEADER SUPERIOR DUOLINGO ═══ */}
        <header className="profile-page-header">
          <button
            onClick={() => {
              soundService.playToken();
              onBack();
            }}
            className="profile-icon-btn-3d"
            title="Volver al Camino"
            aria-label="Volver al Camino"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>

          <span className="profile-page-title">Mi Perfil</span>

          <button
            onClick={handleShare}
            className="profile-icon-btn-3d"
            title="Compartir Perfil"
            aria-label="Compartir Perfil"
          >
            <Share2 size={20} strokeWidth={2.4} />
          </button>
        </header>

        {/* ═══ CONTENIDO CON SCROLL FLUIDO ═══ */}
        <main className="profile-page-scroll">
          {/* ─── BANNER PRINCIPAL DE HERO (Estilo Banner Unidad Duolingo) ─── */}
          <section className="profile-hero-banner">
            {/* Círculo 3D del Avatar */}
            <div className="profile-avatar-circle">
              <DevAvatar avatarId={selectedAvatar} size={84} />
            </div>

            {/* Nombre y Título del Dev */}
            <h1 className="profile-hero-name">{displayName}</h1>

            <div className="profile-hero-rank">
              <Star size={15} fill="#FDE047" color="#FDE047" />
              <span>Nivel {currentLevel} · {getRankTitle(currentLevel)}</span>
            </div>

            {/* Barra de Progreso de Nivel (XP) 3D */}
            <div className="profile-hero-xp-box">
              <div className="profile-xp-labels">
                <span>XP Nivel {currentLevel}</span>
                <span>{xpInCurrentLevel} / 100 XP</span>
              </div>
              <div className="profile-xp-track">
                <div
                  className="profile-xp-fill"
                  style={{ width: `${Math.min(100, Math.max(5, (xpInCurrentLevel / 100) * 100))}%` }}
                />
              </div>
            </div>
          </section>

          {/* ─── CUADRÍCULA DE ESTADÍSTICAS 2X2 ESTILO DUOLINGO ─── */}
          <div className="profile-section-title">Estadísticas</div>
          <section className="profile-stats-grid">
            {[
              {
                icon: <Flame size={32} color="#FF9500" fill="#FF9500" strokeWidth={2} />,
                value: streakCount,
                label: 'Racha de días'
              },
              {
                icon: <Zap size={32} color="#0284C7" fill="#0284C7" strokeWidth={2} />,
                value: totalXp,
                label: 'Total de EXP'
              },
              {
                icon: <PackageOpen size={32} color="#D97706" strokeWidth={2.4} />,
                value: chestsCount,
                label: 'Cofres abiertos'
              },
              {
                icon: <Swords size={32} color="#DC2626" strokeWidth={2.4} />,
                value: bossesCount,
                label: 'Jefes derrotados'
              }
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E2E8F0',
                  boxShadow: '0 4px 0 #CBD5E1',
                  borderRadius: 18,
                  padding: '16px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <div style={{ flexShrink: 0 }}>{stat.icon}</div>
                <div>
                  <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#1E293B', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#64748B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginTop: 4
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* ─── SELECTOR DE PESTAÑAS 3D ─── */}
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
                      className={`profile-ach-card ${ach.unlocked ? '' : 'locked'}`}
                    >
                      <div
                        className="profile-ach-icon"
                        style={{
                          background: ach.unlocked ? ach.color : '#182635',
                          color: ach.unlocked ? '#FFFFFF' : '#64748B'
                        }}
                      >
                        {ach.unlocked ? (
                          <Icon size={24} strokeWidth={2.4} />
                        ) : (
                          <Lock size={20} strokeWidth={2.4} />
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.94rem',
                            fontWeight: 900,
                            color: '#FFFFFF',
                            marginBottom: 2
                          }}
                        >
                          {ach.title}
                        </div>
                        <div
                          style={{
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            color: 'var(--text-dim)',
                            lineHeight: 1.3
                          }}
                        >
                          {ach.desc}
                        </div>
                      </div>

                      {ach.unlocked ? (
                        <div className="profile-ach-badge-unlocked">
                          <Check size={14} strokeWidth={3} />
                          <span>LISTO</span>
                        </div>
                      ) : (
                        <div className="profile-ach-badge-locked">
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

                    <div style={{ fontSize: '0.94rem', fontWeight: 900, color: '#1E293B', marginBottom: 6 }}>
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
                        fontWeight: 900,
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
                          background: '#14202E',
                          border: '1.5px solid var(--border-color)',
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
                      <DevAvatar avatarId={av.id} size={42} />
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

              {/* Selector de Tema Visual REAL Y EN VIVO */}
              <div className="profile-card-duo">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span className="profile-card-label" style={{ margin: 0 }}>Tema Visual (Cambio en Vivo)</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--green-main)' }}>
                    Aplicado al instante
                  </span>
                </div>
                <div className="profile-theme-grid-duo">
                  {THEMES.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => handleSelectTheme(th.id)}
                      className={`profile-theme-btn ${selectedTheme === th.id ? 'selected' : ''}`}
                      style={{ background: th.preview }}
                      type="button"
                    >
                      {th.name}
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
                <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#F87171', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
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

          {/* ─── ACCIONES DE CUENTA DUOLINGO 3D ─── */}
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button
              className="btn-3d btn-outline"
              style={{ flex: 1, padding: 13, fontSize: '0.85rem' }}
              onClick={() => {
                soundService.playToken();
                onBack();
                onOpenAuth();
              }}
            >
              Gestionar Cuenta
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
