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
  Lock
} from 'lucide-react';
import { UserProfile } from '../types/user';
import { userService } from '../services/userService';
import { authService } from '../services/authService';
import { soundService } from '../services/soundService';
import { DevAvatar } from './Avatars';
import { AVATARS, THEMES } from '../constants/avatars';

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
  const [selectedTheme, setSelectedTheme] = useState(user.currentThemeId || 'theme_default');
  const [activeTab, setActiveTab] = useState<'sheet' | 'inventory' | 'custom'>('sheet');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Cálculos de RPG
  const totalXp = user.totalXp || 0;
  const currentLevel = Math.floor(totalXp / 100) + 1;
  const currentLevelBaseXp = (currentLevel - 1) * 100;
  const xpInCurrentLevel = totalXp - currentLevelBaseXp;
  const progressToNextLevel = Math.min(100, Math.max(0, (xpInCurrentLevel / 100) * 100));

  const chestsCount = user.openedChests?.length || 0;
  const bossesCount = user.defeatedBosses?.length || 0;
  const streakCount = user.streak?.count || 1;

  // Rango RPG de desarrollador
  const getRankTitle = (lvl: number) => {
    if (lvl >= 15) return 'Arquitecto Cósmico';
    if (lvl >= 10) return 'Ingeniero Senior';
    if (lvl >= 6) return 'Desarrollador Full-Stack';
    if (lvl >= 3) return 'Programador Junior';
    return 'Aprendiz de Código';
  };

  // Logros calculados a partir de los datos reales del usuario
  const achievements = [
    {
      id: 'first_level',
      title: 'Primer Compilado',
      desc: 'Completar tu primer nivel en la plataforma',
      unlocked: totalXp >= 30,
      icon: CheckCircle2,
      color: '#10B981'
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
      desc: 'Derrotar a Bugzilla en combate de Jefe',
      unlocked: bossesCount >= 1,
      icon: Swords,
      color: '#EF4444'
    },
    {
      id: 'streak_master',
      title: 'Disciplina Binaria',
      desc: 'Mantener una racha de aprendizaje de 3+ días',
      unlocked: streakCount >= 3,
      icon: Flame,
      color: '#F97316'
    },
    {
      id: 'scholar',
      title: 'Mente Analítica',
      desc: 'Alcanzar el nivel 5 de experiencia',
      unlocked: currentLevel >= 5,
      icon: Trophy,
      color: '#8B5CF6'
    }
  ];

  const handleSave = async () => {
    soundService.playToken();
    const updated: UserProfile = {
      ...user,
      displayName: displayName.trim() || user.displayName,
      avatarId: selectedAvatar,
      currentThemeId: selectedTheme
    };
    await userService.updateProfile(updated);
    onUpdate(updated);
    onClose();
  };

  const handleShare = () => {
    soundService.playToken();
    const currentPathStr = (user?.currentPath || 'kotlin').toUpperCase();
    const text = `Ficha de Desarrollador PrograApp (${currentPathStr}): ${user.displayName}\nNivel ${currentLevel} • ${getRankTitle(currentLevel)}\nXP Total: ${totalXp} | Cofres: ${chestsCount} | Jefes derrotados: ${bossesCount}\nRacha activa: ${streakCount} dias.\n¡Aprende programacion jugando!`;
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
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '500px',
          width: '94%',
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: '20px 18px',
          borderRadius: '24px',
          background: 'linear-gradient(180deg, #0F172A 0%, #030712 100%)',
          border: '2px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 0 40px rgba(15, 23, 42, 0.9), 0 0 25px rgba(56, 189, 248, 0.15)'
        }}
      >
        {/* Cabecera con Botón Cerrar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(56, 189, 248, 0.4)'
              }}
            >
              <Award size={18} color="#38BDF8" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
                Ficha de Desarrollador
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700 }}>
                Ruta activa: {(user.currentPath || 'kotlin').toUpperCase()}
              </span>
            </div>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            style={{ position: 'static', margin: 0 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tarjeta de Personaje Hero */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '2px solid #334155',
            borderRadius: '18px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{ position: 'relative' }}>
            <DevAvatar avatarId={selectedAvatar} size={64} />
            <div
              style={{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                background: '#F59E0B',
                color: '#000000',
                fontSize: '0.68rem',
                fontWeight: 900,
                borderRadius: '6px',
                padding: '2px 5px',
                border: '1.5px solid #0F172A'
              }}
            >
              Nv.{currentLevel}
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
              <h3
                style={{
                  fontSize: '1.1rem',
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
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38BDF8',
                  border: '1px solid rgba(56, 189, 248, 0.3)'
                }}
              >
                {getRankTitle(currentLevel)}
              </span>
            </div>

            {/* Barra de Progreso XP para el Siguiente Nivel */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94A3B8', marginBottom: '3px' }}>
                <span>XP Nivel {currentLevel}</span>
                <span style={{ color: '#FDE047', fontWeight: 800 }}>{xpInCurrentLevel} / 100 XP</span>
              </div>
              <div style={{ height: '7px', background: '#1E293B', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progressToNextLevel}%`,
                    background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas de Navegación del Perfil */}
        <div
          style={{
            display: 'flex',
            background: '#0B1120',
            padding: '3px',
            borderRadius: '12px',
            border: '1.5px solid #1E293B',
            marginBottom: '12px',
            gap: '4px'
          }}
        >
          <button
            onClick={() => {
              soundService.playToken();
              setActiveTab('sheet');
            }}
            style={{
              flex: 1,
              padding: '6px 8px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'sheet' ? '#2563EB' : 'transparent',
              color: activeTab === 'sheet' ? '#FFFFFF' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px'
            }}
          >
            <Award size={14} /> Estadísticas
          </button>

          <button
            onClick={() => {
              soundService.playToken();
              setActiveTab('inventory');
            }}
            style={{
              flex: 1,
              padding: '6px 8px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'inventory' ? '#F59E0B' : 'transparent',
              color: activeTab === 'inventory' ? '#000000' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px'
            }}
          >
            <PackageOpen size={14} /> Comodines
          </button>

          <button
            onClick={() => {
              soundService.playToken();
              setActiveTab('custom');
            }}
            style={{
              flex: 1,
              padding: '6px 8px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'custom' ? '#8B5CF6' : 'transparent',
              color: activeTab === 'custom' ? '#FFFFFF' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px'
            }}
          >
            <DevAvatar avatarId={selectedAvatar} size={14} /> Ajustes
          </button>
        </div>

        {/* Contenido */}
        <div style={{ marginBottom: '16px' }}>
          {/* TAB 1: ESTADÍSTICAS Y LOGROS */}
          {activeTab === 'sheet' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Grid 2x2 de Estadísticas Clave */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <div
                  style={{
                    background: '#0F172A',
                    border: '1.5px solid #1E293B',
                    borderRadius: '12px',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(56, 189, 248, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Award size={18} color="#38BDF8" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.66rem', color: '#64748B', display: 'block', fontWeight: 700 }}>
                      XP TOTAL
                    </span>
                    <span style={{ fontSize: '0.98rem', fontWeight: 900, color: '#38BDF8' }}>
                      {totalXp} XP
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: '#0F172A',
                    border: '1.5px solid #1E293B',
                    borderRadius: '12px',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(249, 115, 22, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Flame size={18} color="#F97316" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.66rem', color: '#64748B', display: 'block', fontWeight: 700 }}>
                      RACHA
                    </span>
                    <span style={{ fontSize: '0.98rem', fontWeight: 900, color: '#F97316' }}>
                      {streakCount} {streakCount === 1 ? 'Día' : 'Días'}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: '#0F172A',
                    border: '1.5px solid #1E293B',
                    borderRadius: '12px',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(245, 158, 11, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <PackageOpen size={18} color="#F59E0B" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.66rem', color: '#64748B', display: 'block', fontWeight: 700 }}>
                      COFRES ABIERTOS
                    </span>
                    <span style={{ fontSize: '0.98rem', fontWeight: 900, color: '#F59E0B' }}>
                      {chestsCount} Cofres
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: '#0F172A',
                    border: '1.5px solid #1E293B',
                    borderRadius: '12px',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Swords size={18} color="#EF4444" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.66rem', color: '#64748B', display: 'block', fontWeight: 700 }}>
                      JEFES VENCIDOS
                    </span>
                    <span style={{ fontSize: '0.98rem', fontWeight: 900, color: '#EF4444' }}>
                      {bossesCount} Derrotados
                    </span>
                  </div>
                </div>
              </div>

              {/* Sección de Logros */}
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#94A3B8',
                    display: 'block',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  Logros de la Aventura
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {achievements.map((ach) => {
                    const Icon = ach.icon;
                    return (
                      <div
                        key={ach.id}
                        style={{
                          background: ach.unlocked ? '#0F172A' : 'rgba(15, 23, 42, 0.5)',
                          border: `1.5px solid ${ach.unlocked ? ach.color : '#1E293B'}`,
                          borderRadius: '10px',
                          padding: '8px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          opacity: ach.unlocked ? 1 : 0.6
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '7px',
                            background: ach.unlocked ? `${ach.color}22` : '#1E293B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Icon size={16} color={ach.unlocked ? ach.color : '#64748B'} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span
                            style={{
                              fontSize: '0.8rem',
                              fontWeight: 800,
                              color: ach.unlocked ? '#FFFFFF' : '#94A3B8',
                              display: 'block'
                            }}
                          >
                            {ach.title}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block' }}>
                            {ach.desc}
                          </span>
                        </div>
                        {ach.unlocked ? (
                          <span
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 900,
                              color: ach.color,
                              background: `${ach.color}15`,
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}
                          >
                            DESBLOQUEADO
                          </span>
                        ) : (
                          <Lock size={14} color="#475569" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MOCHILA DE COMODINES / RECURSOS TÁCTICOS */}
          {activeTab === 'inventory' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                Los comodines son recursos tácticos obtenidos en los cofres que puedes usar en retos y batallas de Jefes.
              </p>

              {/* Tarjeta 1: Ayuda del Profesor */}
              <div
                style={{
                  background: '#0F172A',
                  border: '1.5px solid #2563EB',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(37, 99, 235, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #2563EB'
                  }}
                >
                  <GraduationCap size={22} color="#60A5FA" />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>
                    Ayuda del Profesor
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block' }}>
                    Proporciona una pista conceptual para resolver la pregunta.
                  </span>
                </div>
                <div style={{ textAlign: 'center', minWidth: '45px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#60A5FA', display: 'block' }}>
                    x{user.powerups?.teacherHint || 0}
                  </span>
                  <span style={{ fontSize: '0.62rem', color: '#64748B' }}>DISPONIBLE</span>
                </div>
              </div>

              {/* Tarjeta 2: 50/50 Eliminar Erróneas */}
              <div
                style={{
                  background: '#0F172A',
                  border: '1.5px solid #EF4444',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #EF4444'
                  }}
                >
                  <EyeOff size={22} color="#F87171" />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>
                    50 / 50 Descarte
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block' }}>
                    Elimina 2 opciones incorrectas en preguntas de selección múltiple.
                  </span>
                </div>
                <div style={{ textAlign: 'center', minWidth: '45px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#F87171', display: 'block' }}>
                    x{user.powerups?.eliminateOptions || 0}
                  </span>
                  <span style={{ fontSize: '0.62rem', color: '#64748B' }}>DISPONIBLE</span>
                </div>
              </div>

              {/* Tarjeta 3: Segunda Oportunidad */}
              <div
                style={{
                  background: '#0F172A',
                  border: '1.5px solid #10B981',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #10B981'
                  }}
                >
                  <ShieldCheck size={22} color="#34D399" />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>
                    Segunda Oportunidad
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block' }}>
                    Absorbe un error o fallo sin perder vida ni penalizar el progreso.
                  </span>
                </div>
                <div style={{ textAlign: 'center', minWidth: '45px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#34D399', display: 'block' }}>
                    x{user.powerups?.secondChance || 0}
                  </span>
                  <span style={{ fontSize: '0.62rem', color: '#64748B' }}>DISPONIBLE</span>
                </div>
              </div>

              {/* Tarjeta 4: Pista de Código */}
              <div
                style={{
                  background: '#0F172A',
                  border: '1.5px solid #8B5CF6',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(139, 92, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #8B5CF6'
                  }}
                >
                  <Code2 size={22} color="#A78BFA" />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>
                    Pista de Código
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block' }}>
                    Resalta la línea o estructura clave que contiene la solución.
                  </span>
                </div>
                <div style={{ textAlign: 'center', minWidth: '45px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#A78BFA', display: 'block' }}>
                    x{user.powerups?.codePeek || 0}
                  </span>
                  <span style={{ fontSize: '0.62rem', color: '#64748B' }}>DISPONIBLE</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PERSONALIZACIÓN & AJUSTES */}
          {activeTab === 'custom' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Nombre de Desarrollador */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '5px' }}>
                  NOMBRE DE DESARROLLADOR
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0B1120',
                    border: '1.5px solid #334155',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Selector de Avatar */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>
                  SELECCIONA TU AVATAR
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                  {AVATARS.map((av) => (
                    <button
                      key={av.id}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedAvatar(av.id);
                      }}
                      style={{
                        background: selectedAvatar === av.id ? 'rgba(245, 158, 11, 0.15)' : '#0F172A',
                        border: `2px solid ${selectedAvatar === av.id ? '#F59E0B' : '#1E293B'}`,
                        borderRadius: '10px',
                        padding: '6px 4px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <DevAvatar avatarId={av.id} size={36} />
                      <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#CBD5E1' }}>
                        {av.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Tema */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>
                  TEMA VISUAL DE LA CONSOLA
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {THEMES.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedTheme(th.id);
                      }}
                      style={{
                        background: th.preview,
                        border: `2px solid ${selectedTheme === th.id ? '#38BDF8' : '#1E293B'}`,
                        borderRadius: '8px',
                        padding: '7px 4px',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {th.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botones de Acción en Footer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-3d btn-green"
              onClick={handleSave}
              style={{ flex: 1, padding: '10px', fontSize: '0.88rem' }}
            >
              Guardar Cambios
            </button>
            <button
              className="btn-3d btn-cyan"
              onClick={handleShare}
              style={{ flex: 1, padding: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Share2 size={15} /> {copied ? 'Copiado' : 'Compartir'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-3d btn-outline"
              style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
            >
              Gestionar Cuenta
            </button>
            <button
              className="btn-3d btn-outline"
              style={{ flex: 1, padding: '8px', fontSize: '0.8rem', color: '#F87171' }}
              onClick={handleSignOut}
            >
              <LogOut size={14} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
