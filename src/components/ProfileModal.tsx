import React, { useState } from 'react';
import {
  X,
  Share2,
  LogOut,
  Award,
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
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Zap,
  Check,
  User
} from 'lucide-react';
import { UserProfile, LearningPath as PathType } from '../types/user';
import { userService } from '../services/userService';
import { authService } from '../services/authService';
import { soundService } from '../services/soundService';
import { DevAvatar } from './Avatars';
import { AVATARS } from '../constants/avatars';

interface ProfileModalProps {
  isOpen: boolean;
  user: UserProfile;
  onClose: () => void;
  onUpdate: (updated: UserProfile) => void;
  onOpenAuth: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  user,
  onClose,
  onUpdate,
  onOpenAuth
}) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarId || 'robot_byte');
  const selectedTheme = 'theme_default';
  const [selectedPath, setSelectedPath] = useState<PathType>(user.currentPath || 'kotlin');
  const [soundEnabled, setSoundEnabled] = useState(!soundService.getMuted());
  const [activeTab, setActiveTab] = useState<'sheet' | 'inventory' | 'custom'>('sheet');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  // Cálculos de Progresión RPG Duolingo
  const totalXp = user.totalXp || 0;
  const currentLevel = Math.floor(totalXp / 100) + 1;
  const currentLevelBaseXp = (currentLevel - 1) * 100;
  const xpInCurrentLevel = totalXp - currentLevelBaseXp;
  const progressToNextLevel = Math.min(100, Math.max(0, (xpInCurrentLevel / 100) * 100));

  const chestsCount = user.openedChests?.length || 0;
  const bossesCount = user.defeatedBosses?.length || 0;
  const streakCount = user.streak?.count || 1;

  // Rango RPG amigable
  const getRankTitle = (lvl: number) => {
    if (lvl >= 15) return 'Arquitecto Cósmico';
    if (lvl >= 10) return 'Ingeniero Senior';
    if (lvl >= 6) return 'Desarrollador Full-Stack';
    if (lvl >= 3) return 'Programador Junior';
    return 'Aprendiz de Código';
  };

  // Logros basados 100% en datos reales del usuario
  const achievements = [
    {
      id: 'first_level',
      title: 'Primer Compilado',
      desc: 'Completar tu primer nivel en la plataforma',
      unlocked: totalXp >= 30,
      icon: CheckCircle2,
      color: '#22C55E'
    },
    {
      id: 'first_chest',
      title: 'Cazador de Botín',
      desc: 'Abrir un cofre de progresión en la ruta',
      unlocked: chestsCount >= 1,
      icon: PackageOpen,
      color: '#F59E0B'
    },
    {
      id: 'boss_slayer',
      title: 'Depurador Supremo',
      desc: 'Superar un combate de Jefe de Unidad',
      unlocked: bossesCount >= 1,
      icon: Swords,
      color: '#EF4444'
    },
    {
      id: 'streak_master',
      title: 'Disciplina Binaria',
      desc: 'Mantener una racha activa de 3 o más días',
      unlocked: streakCount >= 3,
      icon: Flame,
      color: '#F97316'
    },
    {
      id: 'scholar',
      title: 'Mente Analítica',
      desc: 'Alcanzar el nivel 5 de experiencia en desarrollo',
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

  const handleTestSound = () => {
    soundService.playToken();
  };

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
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const handleShare = () => {
    soundService.playToken();
    const currentPathStr = (selectedPath || 'kotlin').toUpperCase();
    const text = `🎮 PrograApp (${currentPathStr})\nPerfil: ${user.displayName}\nNivel ${currentLevel} • ${getRankTitle(currentLevel)}\nXP Total: ${totalXp} | Cofres: ${chestsCount} | Jefes derrotados: ${bossesCount}\nRacha activa: ${streakCount} días.\n¡Aprende programación jugando al estilo Duolingo!`;
    if (navigator.share) {
      navigator.share({ title: 'Mi Perfil en PrograApp', text });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSignOut = async () => {
    soundService.playToken();
    await authService.signOutUser();
    const guestUser = await userService.getProfile('guest_user_1');
    onUpdate(guestUser);
    onClose();
  };

  return (
    <div className="profile-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del Modal con Botón Cerrar 3D */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: '#E0F2FE',
                border: '2px solid #BAE6FD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284C7'
              }}
            >
              <Award size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                Mi Perfil de Dev
              </h2>
              <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 800 }}>
                Ruta activa: <span style={{ color: selectedPath === 'kotlin' ? '#7C3AED' : '#0284C7' }}>{selectedPath.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playToken();
              onClose();
            }}
            className="btn-3d btn-outline"
            style={{ width: 36, height: 36, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Cerrar ventana"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tarjeta de Personaje Hero (Estilo Unidad Duolingo 3D) */}
        <div
          style={{
            background: 'var(--orange-main, #FF9500)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 5px 0 var(--orange-dark, #C27100)',
            borderRadius: 22,
            padding: '16px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 16,
            position: 'relative'
          }}
        >
          {/* Círculo 3D del Avatar */}
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '3px solid #FFFFFF',
              boxShadow: '0 4px 0 rgba(0,0,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0
            }}
          >
            <DevAvatar
              avatarId={selectedAvatar}
              skinId={user.equippedSkin}
              size={64}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -3,
                right: -3,
                background: '#FDE047',
                color: '#000000',
                fontSize: '0.68rem',
                fontWeight: 900,
                borderRadius: 8,
                padding: '2px 6px',
                border: '1.5px solid #000000',
                boxShadow: '0 1px 0 rgba(0,0,0,0.2)'
              }}
            >
              Nv.{currentLevel}
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, flexWrap: 'wrap' }}>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {displayName}
              </h3>

              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: 'rgba(0, 0, 0, 0.22)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.25)'
                }}
              >
                {getRankTitle(currentLevel)}
              </span>
            </div>

            {user.idNumber && (
              <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.9)', fontWeight: 700, marginTop: 2 }}>
                Cédula: <strong>{user.idNumber}</strong> {user.studentCode ? `• [${user.studentCode}]` : ''}
              </div>
            )}

            {/* Barra de Progreso XP para el Siguiente Nivel */}
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.92)', fontWeight: 800, marginBottom: 3 }}>
                <span>XP Nivel {currentLevel}</span>
                <span>{xpInCurrentLevel} / 100 XP</span>
              </div>
              <div style={{ height: 10, background: 'rgba(0, 0, 0, 0.25)', borderRadius: 999, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, Math.max(6, progressToNextLevel))}%`,
                    background: '#FFFFFF',
                    borderRadius: 999,
                    transition: 'width 0.35s ease'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas de Navegación 3D Segmentadas */}
        <div
          style={{
            display: 'flex',
            background: '#F1F5F9',
            padding: 4,
            borderRadius: 14,
            border: '2px solid #E2E8F0',
            marginBottom: 16,
            gap: 4,
            boxShadow: '0 2px 0 #CBD5E1'
          }}
        >
          {[
            { key: 'sheet' as const, label: 'Estadísticas', icon: <Award size={15} /> },
            { key: 'inventory' as const, label: 'Comodines', icon: <PackageOpen size={15} /> },
            { key: 'custom' as const, label: 'Ajustes & Avatares', icon: <Sparkles size={15} /> }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                soundService.playToken();
                setActiveTab(tab.key);
              }}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 10,
                fontSize: '0.8rem',
                fontWeight: 800,
                border: activeTab === tab.key ? '1.5px solid #CBD5E1' : 'none',
                cursor: 'pointer',
                background: activeTab === tab.key ? '#FFFFFF' : 'transparent',
                color: activeTab === tab.key ? '#0F172A' : '#64748B',
                boxShadow: activeTab === tab.key ? '0 2px 0 #CBD5E1' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                transition: 'all 0.15s ease'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contenido de la Pestaña Seleccionada */}
        <div style={{ marginBottom: 18, minHeight: 220 }}>
          {/* ═════════ TAB 1: ESTADÍSTICAS Y LOGROS ═════════ */}
          {activeTab === 'sheet' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Cuadrícula 2x2 de Estadísticas Clave Duolingo 3D */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {[
                  {
                    label: 'XP TOTAL',
                    val: `${totalXp} XP`,
                    icon: <Zap size={22} color="#0284C7" fill="#0284C7" />,
                    color: '#0284C7',
                    bg: '#E0F2FE',
                    border: '#BAE6FD'
                  },
                  {
                    label: 'RACHA',
                    val: `${streakCount} ${streakCount === 1 ? 'Día' : 'Días'}`,
                    icon: <Flame size={22} color="#F97316" fill="#F97316" />,
                    color: '#F97316',
                    bg: '#FFEDD5',
                    border: '#FED7AA'
                  },
                  {
                    label: 'COFRES ABIERTOS',
                    val: `${chestsCount} Cofres`,
                    icon: <PackageOpen size={22} color="#D97706" />,
                    color: '#D97706',
                    bg: '#FEF3C7',
                    border: '#FDE68A'
                  },
                  {
                    label: 'JEFES VENCIDOS',
                    val: `${bossesCount} Derrotados`,
                    icon: <Swords size={22} color="#DC2626" />,
                    color: '#DC2626',
                    bg: '#FEE2E2',
                    border: '#FECACA'
                  }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#FFFFFF',
                      border: '2px solid #E2E8F0',
                      boxShadow: '0 3px 0 #CBD5E1',
                      borderRadius: 16,
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: stat.bg,
                        border: `1.5px solid ${stat.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block', fontWeight: 800, textTransform: 'uppercase' }}>
                        {stat.label}
                      </span>
                      <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A' }}>
                        {stat.val}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lista de Logros de la Aventura */}
              <div>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    color: '#64748B',
                    display: 'block',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  Logros Desbloqueables
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {achievements.map((ach) => {
                    const Icon = ach.icon;
                    return (
                      <div
                        key={ach.id}
                        style={{
                          background: ach.unlocked ? '#FFFFFF' : '#F8FAFC',
                          border: `2px solid ${ach.unlocked ? '#E2E8F0' : '#E2E8F0'}`,
                          borderBottom: `3.5px solid ${ach.unlocked ? '#CBD5E1' : '#E2E8F0'}`,
                          borderRadius: 14,
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          opacity: ach.unlocked ? 1 : 0.65
                        }}
                      >
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 12,
                            background: ach.unlocked ? `${ach.color}20` : '#F1F5F9',
                            border: `1.5px solid ${ach.unlocked ? ach.color : '#CBD5E1'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Icon size={20} color={ach.unlocked ? ach.color : '#94A3B8'} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span
                            style={{
                              fontSize: '0.86rem',
                              fontWeight: 900,
                              color: ach.unlocked ? '#0F172A' : '#64748B',
                              display: 'block'
                            }}
                          >
                            {ach.title}
                          </span>
                          <span style={{ fontSize: '0.74rem', color: '#64748B', display: 'block', fontWeight: 600 }}>
                            {ach.desc}
                          </span>
                        </div>

                        {ach.unlocked ? (
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 900,
                              color: '#15803D',
                              background: '#DCFCE7',
                              border: '1.5px solid #86EFAC',
                              padding: '3px 8px',
                              borderRadius: 8,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4
                            }}
                          >
                            <Check size={12} strokeWidth={3} /> LISTO
                          </span>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94A3B8', fontSize: '0.72rem', fontWeight: 800 }}>
                            <Lock size={14} /> BLOQUEADO
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ═════════ TAB 2: COMODINES (INVENTARIO DUOLINGO 3D) ═════════ */}
          {activeTab === 'inventory' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 4px 0', lineHeight: 1.4, fontWeight: 600 }}>
                Los comodines son recursos que ganas abriendo cofres de ruta para resolver dudas o superar batallas contra Jefes.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {[
                  {
                    id: 'hint',
                    title: 'Profesor',
                    desc: 'Pista explicada sin penalizar vida',
                    badge: `×${user.powerups?.teacherHint || 0}`,
                    color: '#0284C7',
                    bg: '#E0F2FE',
                    border: '#BAE6FD',
                    shadow: '#0284C7',
                    icon: <GraduationCap size={24} color="#0284C7" />
                  },
                  {
                    id: '5050',
                    title: '50 / 50',
                    desc: 'Descarta 2 opciones erróneas',
                    badge: `×${user.powerups?.eliminateOptions || 0}`,
                    color: '#D97706',
                    bg: '#FEF3C7',
                    border: '#FDE68A',
                    shadow: '#D97706',
                    icon: <EyeOff size={24} color="#D97706" />
                  },
                  {
                    id: 'shield',
                    title: 'Escudo',
                    desc: 'Absorbe un fallo sin perder vida',
                    badge: `×${user.powerups?.secondChance || 0}`,
                    color: '#15803D',
                    bg: '#DCFCE7',
                    border: '#86EFAC',
                    shadow: '#15803D',
                    icon: <ShieldCheck size={24} color="#15803D" />
                  },
                  {
                    id: 'code',
                    title: 'Pista Código',
                    desc: 'Resalta la sintaxis de solución',
                    badge: `×${user.powerups?.codePeek || 0}`,
                    color: '#7C3AED',
                    bg: '#EDE9FE',
                    border: '#DDD6FE',
                    shadow: '#7C3AED',
                    icon: <Code2 size={24} color="#7C3AED" />
                  }
                ].map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: '#FFFFFF',
                      border: '2px solid #E2E8F0',
                      boxShadow: '0 3px 0 #CBD5E1',
                      borderRadius: 16,
                      padding: '14px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 6
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: item.bg,
                        border: `2px solid ${item.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {item.icon}
                    </div>

                    <div style={{ fontWeight: 900, fontSize: '0.92rem', color: '#0F172A' }}>
                      {item.title}
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.3 }}>
                      {item.desc}
                    </div>

                    <div
                      style={{
                        background: '#F1F5F9',
                        border: '1.5px solid #CBD5E1',
                        color: '#334155',
                        borderRadius: 999,
                        padding: '3px 10px',
                        fontSize: '0.74rem',
                        fontWeight: 900,
                        marginTop: 4
                      }}
                    >
                      {item.badge} DISPONIBLES
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═════════ TAB 3: AVATARES, OPCIONES & AJUSTES ═════════ */}
          {activeTab === 'custom' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Nombre de Desarrollador */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E2E8F0',
                  boxShadow: '0 3px 0 #CBD5E1',
                  borderRadius: 18,
                  padding: '14px 16px'
                }}
              >
                <label style={{ fontSize: '0.76rem', fontWeight: 900, color: '#64748B', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                  Nombre de Desarrollador
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: 12, padding: '8px 12px' }}>
                  <User size={18} color="#64748B" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    maxLength={28}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      width: '100%',
                      outline: 'none',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      color: '#0F172A'
                    }}
                    placeholder="Tu alias o nombre de estudiante"
                  />
                </div>
              </div>

              {/* Selector de los 5 Avatares 3D del Juego */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E2E8F0',
                  boxShadow: '0 3px 0 #CBD5E1',
                  borderRadius: 18,
                  padding: '14px 16px'
                }}
              >
                <span style={{ fontSize: '0.76rem', fontWeight: 900, color: '#64748B', display: 'block', marginBottom: 10, textTransform: 'uppercase' }}>
                  Elige tu Avatar 3D
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                  {AVATARS.map((av) => {
                    const isSelected = selectedAvatar === av.id;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => {
                          soundService.playToken();
                          setSelectedAvatar(av.id);
                        }}
                        style={{
                          background: isSelected ? '#FEF3C7' : '#FFFFFF',
                          border: isSelected ? '2.5px solid #F59E0B' : '2px solid #E2E8F0',
                          boxShadow: isSelected ? '0 4px 0 #D97706' : '0 3px 0 #CBD5E1',
                          borderRadius: 14,
                          padding: '8px 4px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 4,
                          transform: isSelected ? 'translateY(-2px)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <DevAvatar
                          avatarId={av.id}
                          skinId={user.equippedSkin}
                          size={42}
                        />
                        <span style={{ fontSize: '0.66rem', fontWeight: 900, color: isSelected ? '#B45309' : '#475569' }}>
                          {av.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ruta Activa de Aprendizaje */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E2E8F0',
                  boxShadow: '0 3px 0 #CBD5E1',
                  borderRadius: 18,
                  padding: '14px 16px'
                }}
              >
                <span style={{ fontSize: '0.76rem', fontWeight: 900, color: '#64748B', display: 'block', marginBottom: 10, textTransform: 'uppercase' }}>
                  Ruta Activa de Aprendizaje
                </span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playToken();
                      setSelectedPath('kotlin');
                    }}
                    className={`btn-3d ${selectedPath === 'kotlin' ? 'btn-orange' : 'btn-outline'}`}
                    style={{ flex: 1, padding: 12, fontSize: '0.86rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  >
                    <BookOpen size={16} /> Kotlin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playToken();
                      setSelectedPath('sql');
                    }}
                    className={`btn-3d ${selectedPath === 'sql' ? 'btn-blue' : 'btn-outline'}`}
                    style={{ flex: 1, padding: 12, fontSize: '0.86rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  >
                    <Zap size={16} /> SQL
                  </button>
                </div>
              </div>

              {/* Ajustes de Sonido y Audio */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E2E8F0',
                  boxShadow: '0 3px 0 #CBD5E1',
                  borderRadius: 18,
                  padding: '14px 16px'
                }}
              >
                <span style={{ fontSize: '0.76rem', fontWeight: 900, color: '#64748B', display: 'block', marginBottom: 10, textTransform: 'uppercase' }}>
                  Efectos Sonoros
                </span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={handleToggleSound}
                    className={`btn-3d ${soundEnabled ? 'btn-green' : 'btn-outline'}`}
                    style={{ flex: 1, padding: 11, fontSize: '0.84rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  >
                    {soundEnabled ? (
                      <>
                        <Volume2 size={18} /> Sonido: Activado
                      </>
                    ) : (
                      <>
                        <VolumeX size={18} /> Sonido: Silenciado
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleTestSound}
                    className="btn-3d btn-outline"
                    style={{ padding: '11px 16px', fontSize: '0.84rem' }}
                    title="Probar sonido en tiempo real"
                  >
                    🔊 Probar
                  </button>
                </div>
              </div>


            </div>
          )}
        </div>

        {/* Botones de Acción en Footer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto', borderTop: '2px solid #E2E8F0', paddingTop: 16 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn-3d btn-green"
              onClick={handleSave}
              style={{ flex: 1, padding: '13px', fontSize: '0.94rem' }}
            >
              {savedSuccess ? '✓ ¡Cambios Guardados!' : 'Guardar Cambios'}
            </button>

            <button
              className="btn-3d btn-cyan"
              onClick={handleShare}
              style={{ padding: '13px 18px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <Share2 size={16} />
              <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn-3d btn-outline"
              style={{ flex: 1, padding: '10px', fontSize: '0.82rem' }}
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
            >
              Gestionar Cuenta
            </button>

            <button
              className="btn-3d btn-outline"
              style={{ flex: 1, padding: '10px', fontSize: '0.82rem', color: '#DC2626', borderColor: '#FCA5A5' }}
              onClick={handleSignOut}
            >
              <LogOut size={15} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
