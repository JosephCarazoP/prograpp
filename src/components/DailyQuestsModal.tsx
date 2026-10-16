import React, { useState } from 'react';
import {
  X,
  Target,
  CheckCircle2,
  Gift,
  Sparkles,
  GraduationCap,
  EyeOff,
  ShieldCheck,
  Code2,
  Trophy,
  Zap,
  Star,
  Lock,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../services/soundService';
import { UserProfile, UserPowerUps } from '../types/user';
import { LessonProgress } from '../types/progress';

type PowerUpKey = keyof UserPowerUps;

type Rarity = 'POCO COMÚN' | 'RARO' | 'ÉPICO' | 'LEGENDARIO';

interface BattlePassTier {
  tierNumber: number;
  reqPoints: number;
  title: string;
  rarity: Rarity;
  rarityColor: string;
  description: string;
  rewardType: 'bytes' | 'xp' | 'powerup' | 'chest';
  rewardBytes?: number;
  rewardXp?: number;
  powerupKey?: PowerUpKey;
  powerupName?: string;
  isChest?: boolean;
}

interface QuestItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  current: number;
  target: number;
  rewardPoints: number;
  rewardBytes?: number;
  rewardXp?: number;
  powerupKey?: PowerUpKey;
  powerupName?: string;
  iconType: 'flame' | 'star' | 'target' | 'shield' | 'code';
}

interface DailyQuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  progress: Record<string, LessonProgress>;
  onRewardClaimed: (xp: number, bytes: number, powerupKey?: PowerUpKey) => void;
}

const BATTLE_PASS_TIERS: BattlePassTier[] = [
  {
    tierNumber: 1,
    reqPoints: 0,
    title: '+40 Bytes de Inicio',
    rarity: 'POCO COMÚN',
    rarityColor: '#16A34A',
    description: 'Moneda táctica para canjear recursos y comodines en la tienda de PrograApp.',
    rewardType: 'bytes',
    rewardBytes: 40
  },
  {
    tierNumber: 2,
    reqPoints: 60,
    title: '1× Comodín Profesor',
    rarity: 'RARO',
    rarityColor: '#0284C7',
    description: 'Recibe una pista conceptual detallada del compilador cuando te trabes en un ejercicio.',
    rewardType: 'powerup',
    powerupKey: 'teacherHint',
    powerupName: '1× Profesor'
  },
  {
    tierNumber: 3,
    reqPoints: 130,
    title: '+50 XP de Nivel',
    rarity: 'RARO',
    rarityColor: '#0284C7',
    description: 'Impulso directo de experiencia para subir en la liga académica y tu perfil.',
    rewardType: 'xp',
    rewardXp: 50
  },
  {
    tierNumber: 4,
    reqPoints: 210,
    title: '1× Comodín 50 / 50',
    rarity: 'RARO',
    rarityColor: '#0284C7',
    description: 'Descarta al instante dos opciones incorrectas en preguntas de selección múltiple.',
    rewardType: 'powerup',
    powerupKey: 'eliminateOptions',
    powerupName: '1× 50 / 50'
  },
  {
    tierNumber: 5,
    reqPoints: 300,
    title: '+80 Bytes de Fortuna',
    rarity: 'ÉPICO',
    rarityColor: '#9333EA',
    description: 'Bolsa abundante de Bytes para equipar comodines de alto impacto táctico.',
    rewardType: 'bytes',
    rewardBytes: 80
  },
  {
    tierNumber: 6,
    reqPoints: 400,
    title: '1× Escudo Segunda Oportunidad',
    rarity: 'ÉPICO',
    rarityColor: '#9333EA',
    description: 'Te protege ante un error en tu lección, permitiéndote responder sin perder la racha.',
    rewardType: 'powerup',
    powerupKey: 'secondChance',
    powerupName: '1× Escudo'
  },
  {
    tierNumber: 7,
    reqPoints: 510,
    title: '1× Pista Sintaxis de Código',
    rarity: 'ÉPICO',
    rarityColor: '#9333EA',
    description: 'Ilumina la estructura y tipos de datos exactos requeridos por el ejercicio.',
    rewardType: 'powerup',
    powerupKey: 'codePeek',
    powerupName: '1× Pista Código'
  },
  {
    tierNumber: 8,
    reqPoints: 630,
    title: '+100 XP de Maestría',
    rarity: 'ÉPICO',
    rarityColor: '#9333EA',
    description: 'Gran bono de experiencia académica para consolidar tu avance en la temporada.',
    rewardType: 'xp',
    rewardXp: 100
  },
  {
    tierNumber: 9,
    reqPoints: 760,
    title: '+120 Bytes Legendarios',
    rarity: 'LEGENDARIO',
    rarityColor: '#EA580C',
    description: 'Botín supremo de Bytes para desbloquear cualquier recurso en la plataforma.',
    rewardType: 'bytes',
    rewardBytes: 120
  },
  {
    tierNumber: 10,
    reqPoints: 900,
    title: 'Mega Cofre Maestro',
    rarity: 'LEGENDARIO',
    rarityColor: '#EA580C',
    description: '¡El tesoro máximo del Pase! Otorga +150 XP, +100 Bytes y un escudo táctico.',
    rewardType: 'chest',
    rewardXp: 150,
    rewardBytes: 100,
    powerupKey: 'secondChance',
    isChest: true
  }
];

export const DailyQuestsModal: React.FC<DailyQuestsModalProps> = ({
  isOpen,
  onClose,
  user,
  progress,
  onRewardClaimed
}) => {
  // Pestaña activa estilo Fortnite: 'pass' (Pase de Batalla) o 'quests' (Misiones)
  const [activeTab, setActiveTab] = useState<'pass' | 'quests'>('pass');
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);

  const safeProgress = progress || {};
  const completedLessonsCount = Object.keys(safeProgress).filter(
    (k) => (safeProgress[k]?.starsEarned || 0) > 0
  ).length;

  const storageKey = `prograpp_bp_${user?.uid || 'guest'}`;

  // Estado del Pase: Puntos extras acumulados por misiones completadas
  const [bonusPoints, setBonusPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_points`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [claimedTiers, setClaimedTiers] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_tiers`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [claimedQuests, setClaimedQuests] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_quests`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Los puntos totales del Pase provienen del XP real del jugador (40%) + bonos de misiones completadas
  const xpBasePoints = Math.floor((user?.totalXp || 0) * 0.4);
  const totalPassPoints = xpBasePoints + bonusPoints;

  // Nivel actual en base a puntos acumulados
  const currentTierObj =
    [...BATTLE_PASS_TIERS].reverse().find((t) => totalPassPoints >= t.reqPoints) || BATTLE_PASS_TIERS[0];
  const currentTierLevel = currentTierObj.tierNumber;

  const nextTierObj = BATTLE_PASS_TIERS.find((t) => t.reqPoints > totalPassPoints);
  const nextTierPoints = nextTierObj ? nextTierObj.reqPoints : 900;
  const prevTierPoints = currentTierObj.reqPoints;
  const tierProgressPercent = nextTierObj
    ? Math.min(
        100,
        Math.max(
          0,
          Math.round(((totalPassPoints - prevTierPoints) / Math.max(1, nextTierPoints - prevTierPoints)) * 100)
        )
      )
    : 100;

  // Lista dinámica de objetivos con progreso real basado en el estado del estudiante
  const quests: QuestItem[] = [
    {
      id: 'q_streak',
      title: 'Dev en Racha Activa',
      category: 'MISIÓN DIARIA',
      desc: 'Mantén encendida tu racha de estudio diaria en PrograApp.',
      current: Math.min(3, Math.max(1, user?.streak?.count || 1)),
      target: 3,
      rewardPoints: 50,
      rewardBytes: 25,
      iconType: 'flame'
    },
    {
      id: 'q_lessons',
      title: 'Camino del Código',
      category: 'RUTA PRINCIPAL',
      desc: 'Supera lecciones en tu ruta activa (Kotlin Dev o Bases SQL).',
      current: Math.min(3, completedLessonsCount),
      target: 3,
      rewardPoints: 60,
      rewardXp: 30,
      iconType: 'target'
    },
    {
      id: 'q_xp',
      title: 'Cazador de Experiencia',
      category: 'HITO ACADÉMICO',
      desc: 'Acumula experiencia resolviendo retos y niveles interactivos.',
      current: Math.min(75, (user?.totalXp || 0) % 150),
      target: 75,
      rewardPoints: 55,
      powerupKey: 'teacherHint',
      powerupName: '1× Profesor',
      iconType: 'star'
    },
    {
      id: 'q_mastery',
      title: 'Precisión Algorítmica',
      category: 'MAESTRÍA',
      desc: 'Domina lecciones con calificación de 2 o 3 estrellas doradas.',
      current: Math.min(
        4,
        Object.values(safeProgress).filter((p) => (p?.starsEarned || 0) >= 2).length
      ),
      target: 4,
      rewardPoints: 50,
      powerupKey: 'secondChance',
      powerupName: '1× Escudo',
      iconType: 'shield'
    },
    {
      id: 'q_theory',
      title: 'Exploración de Conceptos',
      category: 'TEORÍA & DOCS',
      desc: 'Consulta guías conceptuales y teoría antes de las evaluaciones.',
      current: 2,
      target: 2,
      rewardPoints: 45,
      powerupKey: 'eliminateOptions',
      powerupName: '1× 50 / 50',
      iconType: 'code'
    }
  ];

  // Recompensas listas para reclamar
  const unclaimedTiersCount = BATTLE_PASS_TIERS.filter(
    (t) => totalPassPoints >= t.reqPoints && !claimedTiers.includes(t.tierNumber)
  ).length;

  const unclaimedQuestsCount = quests.filter(
    (q) => q.current >= q.target && !claimedQuests.includes(q.id)
  ).length;

  const handleClaimQuest = (quest: QuestItem) => {
    if (claimedQuests.includes(quest.id)) return;
    if (quest.current < quest.target) return;

    soundService.playCorrect();
    try {
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    } catch {}

    const newClaimed = [...claimedQuests, quest.id];
    setClaimedQuests(newClaimed);
    const newBonus = bonusPoints + quest.rewardPoints;
    setBonusPoints(newBonus);

    try {
      localStorage.setItem(`${storageKey}_quests`, JSON.stringify(newClaimed));
      localStorage.setItem(`${storageKey}_points`, newBonus.toString());
    } catch {}

    if (quest.rewardXp || quest.rewardBytes || quest.powerupKey) {
      onRewardClaimed(quest.rewardXp || 0, quest.rewardBytes || 0, quest.powerupKey);
    }
  };

  const handleClaimTier = (tier: BattlePassTier) => {
    if (claimedTiers.includes(tier.tierNumber)) return;
    if (totalPassPoints < tier.reqPoints) return;

    soundService.playChest();
    try {
      confetti({
        particleCount: 140,
        spread: 95,
        origin: { y: 0.5 },
        colors: ['#FF9500', '#22C55E', '#06B6D4', '#FACC15', '#A855F7']
      });
    } catch {}

    const nextClaimed = [...claimedTiers, tier.tierNumber];
    setClaimedTiers(nextClaimed);

    try {
      localStorage.setItem(`${storageKey}_tiers`, JSON.stringify(nextClaimed));
    } catch {}

    onRewardClaimed(tier.rewardXp || 0, tier.rewardBytes || 0, tier.powerupKey);
  };

  if (!isOpen) return null;

  const featuredTier = BATTLE_PASS_TIERS[selectedTierIndex] || BATTLE_PASS_TIERS[0];
  const isFeaturedTierClaimed = claimedTiers.includes(featuredTier.tierNumber);
  const isFeaturedTierUnlocked = totalPassPoints >= featuredTier.reqPoints;
  const canClaimFeatured = isFeaturedTierUnlocked && !isFeaturedTierClaimed;

  return (
    <div
      className="modal-backdrop quests-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.68)',
        backdropFilter: 'blur(7px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        className="modal-card quests-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '780px',
          width: '100%',
          background: '#FFFFFF',
          border: '2.5px solid #CBD5E1',
          borderBottom: '6px solid #94A3B8',
          borderRadius: 24,
          padding: '14px 14px 18px 14px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 24px 50px rgba(0, 0, 0, 0.25)',
          boxSizing: 'border-box'
        }}
      >
        {/* Botón Cerrar 3D */}
        <button
          className="quests-modal-close"
          onClick={() => {
            soundService.playToken();
            onClose();
          }}
          aria-label="Cerrar modal de objetivos"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#FFFFFF',
            border: '2px solid #E2E8F0',
            boxShadow: '0 3px 0 #CBD5E1',
            borderRadius: '12px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748B',
            transition: 'all 0.12s ease',
            zIndex: 20
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(2px)';
            e.currentTarget.style.boxShadow = '0 1px 0 #CBD5E1';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 3px 0 #CBD5E1';
          }}
        >
          <X size={17} strokeWidth={2.6} />
        </button>

        {/* ENCABEZADO SUPERIOR: NIVEL DE PASE & PUNTOS (Estilo Fortnite Battle Pass) */}
        <div className="quests-header-section" style={{ marginBottom: '10px', flexShrink: 0, paddingRight: '38px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  background: '#FEF3C7',
                  border: '1.5px solid #FDE68A',
                  color: '#B45309',
                  borderRadius: '999px',
                  padding: '2px 8px',
                  fontSize: '0.66rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Trophy size={12} color="#D97706" /> TEMPORADA 1 • FUNDAMENTOS
              </span>
            </div>

            {/* Puntos de Pase acumulados */}
            <div
              style={{
                background: '#ECFEFF',
                border: '1.5px solid #A5F3FC',
                borderRadius: '10px',
                padding: '3px 8px',
                fontSize: '0.72rem',
                fontWeight: 900,
                color: '#0891B2',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Zap size={12} color="#0891B2" fill="#0891B2" />
              <span>{totalPassPoints} PTS PASE</span>
            </div>
          </div>

          {/* Barra de Nivel de Pase estilo Fortnite */}
          <div
            className="quests-tier-progress-box"
            style={{
              marginTop: '6px',
              background: '#F8FAFC',
              border: '2px solid #E2E8F0',
              borderRadius: '14px',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 2px 0 #CBD5E1'
            }}
          >
            {/* Medalla de Nivel */}
            <div
              style={{
                background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                border: '2px solid #FDE68A',
                boxShadow: '0 3px 0 #92400E',
                color: '#FFFFFF',
                borderRadius: '11px',
                padding: '3px 9px',
                fontSize: '0.78rem',
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0
              }}
            >
              <Star size={13} fill="#FFFFFF" color="#FFFFFF" />
              <span>NIVEL {currentTierLevel}</span>
            </div>

            {/* Barra de progreso */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#334155' }}>
                  Progreso al Nivel {Math.min(10, currentTierLevel + 1)}
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#0284C7' }}>
                  {totalPassPoints} / {nextTierPoints} Pts
                </span>
              </div>
              <div
                style={{
                  height: '9px',
                  background: '#E2E8F0',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${tierProgressPercent}%`,
                    background: 'linear-gradient(90deg, #22C55E 0%, #16A34A 100%)',
                    borderRadius: '999px',
                    transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '1px',
                      left: '4px',
                      right: '4px',
                      height: '2px',
                      background: 'rgba(255, 255, 255, 0.5)',
                      borderRadius: '2px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PESTAÑAS PRINCIPALES ESTILO FORTNITE BATTLE PASS (100% DUOLINGO 3D) */}
        <div
          className="quests-tabs-wrapper"
          style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '10px',
            flexShrink: 0,
            background: '#F1F5F9',
            padding: '4px',
            borderRadius: '15px'
          }}
        >
          {/* Pestaña 1: Camino de Recompensas */}
          <button
            className="quests-tab-btn"
            onClick={() => {
              soundService.playToken();
              setActiveTab('pass');
            }}
            style={{
              flex: 1,
              padding: '7px 8px',
              borderRadius: '11px',
              border: activeTab === 'pass' ? '2px solid #CBD5E1' : '2px solid transparent',
              background: activeTab === 'pass' ? '#FFFFFF' : 'transparent',
              boxShadow: activeTab === 'pass' ? '0 3px 0 #94A3B8' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              fontSize: '0.8rem',
              fontWeight: 900,
              color: activeTab === 'pass' ? '#0F172A' : '#64748B',
              transition: 'all 0.15s ease'
            }}
          >
            <Trophy size={15} color={activeTab === 'pass' ? '#F59E0B' : '#94A3B8'} strokeWidth={2.4} />
            <span className="tab-text-desktop">Camino de Recompensas</span>
            <span className="tab-text-mobile">Recompensas</span>
            {unclaimedTiersCount > 0 && (
              <span
                style={{
                  background: '#22C55E',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  padding: '1px 6px',
                  fontSize: '0.64rem',
                  fontWeight: 900
                }}
              >
                {unclaimedTiersCount}
              </span>
            )}
          </button>

          {/* Pestaña 2: Misiones y Objetivos */}
          <button
            className="quests-tab-btn"
            onClick={() => {
              soundService.playToken();
              setActiveTab('quests');
            }}
            style={{
              flex: 1,
              padding: '7px 8px',
              borderRadius: '11px',
              border: activeTab === 'quests' ? '2px solid #CBD5E1' : '2px solid transparent',
              background: activeTab === 'quests' ? '#FFFFFF' : 'transparent',
              boxShadow: activeTab === 'quests' ? '0 3px 0 #94A3B8' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              fontSize: '0.8rem',
              fontWeight: 900,
              color: activeTab === 'quests' ? '#0F172A' : '#64748B',
              transition: 'all 0.15s ease'
            }}
          >
            <Target size={15} color={activeTab === 'quests' ? '#2563EB' : '#94A3B8'} strokeWidth={2.4} />
            <span className="tab-text-desktop">Misiones & Objetivos</span>
            <span className="tab-text-mobile">Misiones</span>
            {unclaimedQuestsCount > 0 && (
              <span
                style={{
                  background: '#F59E0B',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  padding: '1px 6px',
                  fontSize: '0.64rem',
                  fontWeight: 900
                }}
              >
                {unclaimedQuestsCount}
              </span>
            )}
          </button>
        </div>

        {/* CONTENIDO DE LA PESTAÑA SELECCIONADA */}
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, paddingRight: '2px' }}>
          {/* VISTA 1: PASE DE BATALLA (SHOWCASE + CAMINO HORIZONTAL) */}
          {activeTab === 'pass' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* ESCAPARATE PRINCIPAL (HERO SHOWCASE DE FORTNITE) */}
              <div
                className="pass-hero-card"
                style={{
                  background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
                  border: '2.5px solid #CBD5E1',
                  boxShadow: '0 4px 0 #94A3B8',
                  borderRadius: '18px',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxSizing: 'border-box'
                }}
              >
                {/* Fila superior: Icono 3D + Rango, Nivel y Título */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                  {/* Icono 3D de Recompensa */}
                  <div
                    className="pass-hero-icon"
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      background: isFeaturedTierUnlocked ? featuredTier.rarityColor : '#64748B',
                      border: '2.5px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: '0 4px 0 rgba(0, 0, 0, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      flexShrink: 0
                    }}
                  >
                    {featuredTier.rewardType === 'bytes' ? (
                      <Zap size={26} fill="#FFFFFF" />
                    ) : featuredTier.rewardType === 'xp' ? (
                      <Star size={26} fill="#FFFFFF" />
                    ) : featuredTier.rewardType === 'chest' ? (
                      <Gift size={26} strokeWidth={2.2} />
                    ) : featuredTier.powerupKey === 'teacherHint' ? (
                      <GraduationCap size={26} strokeWidth={2.2} />
                    ) : featuredTier.powerupKey === 'eliminateOptions' ? (
                      <EyeOff size={26} strokeWidth={2.2} />
                    ) : featuredTier.powerupKey === 'secondChance' ? (
                      <ShieldCheck size={26} strokeWidth={2.2} />
                    ) : (
                      <Code2 size={26} strokeWidth={2.2} />
                    )}
                  </div>

                  {/* Rango, Nivel y Título de la Recompensa Seleccionada */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: featuredTier.rarityColor,
                          color: '#FFFFFF',
                          fontSize: '0.62rem',
                          fontWeight: 900,
                          padding: '1px 6px',
                          borderRadius: '5px',
                          letterSpacing: '0.5px'
                        }}
                      >
                        ★ {featuredTier.rarity} ★
                      </span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B' }}>
                        Nivel {featuredTier.tierNumber} • {featuredTier.reqPoints === 0 ? 'Desbloqueo Inicial' : `${featuredTier.reqPoints} Pts`}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 900,
                        color: '#0F172A',
                        margin: 0,
                        lineHeight: 1.25,
                        wordBreak: 'break-word'
                      }}
                    >
                      {featuredTier.title}
                    </h3>
                  </div>
                </div>

                {/* Descripción Detallada */}
                <p
                  style={{
                    fontSize: '0.74rem',
                    color: '#64748B',
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.3
                  }}
                >
                  {featuredTier.description}
                </p>

                {/* Botón de Acción Principal en Escaparate (Ancho Completo y Táctil) */}
                <div className="pass-hero-action" style={{ width: '100%', display: 'flex' }}>
                  {isFeaturedTierClaimed ? (
                    <div
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        background: '#DCFCE7',
                        border: '2px solid #86EFAC',
                        color: '#15803D',
                        borderRadius: '11px',
                        padding: '8px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 900,
                        textAlign: 'center'
                      }}
                    >
                      <CheckCircle2 size={15} /> Recompensa Reclamada
                    </div>
                  ) : canClaimFeatured ? (
                    <button
                      onClick={() => handleClaimTier(featuredTier)}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        background: '#22C55E',
                        border: '2.5px solid #86EFAC',
                        boxShadow: '0 3px 0 #15803D',
                        color: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        transition: 'all 0.12s ease',
                        textAlign: 'center'
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'translateY(2px)';
                        e.currentTarget.style.boxShadow = '0 1px 0 #15803D';
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 3px 0 #15803D';
                      }}
                    >
                      <Sparkles size={15} /> ¡RECLAMAR RECOMPENSA!
                    </button>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        background: '#F1F5F9',
                        border: '2px solid #CBD5E1',
                        color: '#94A3B8',
                        borderRadius: '11px',
                        padding: '8px 12px',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        textAlign: 'center'
                      }}
                    >
                      <Lock size={13} /> Bloqueado • Requiere Nivel {featuredTier.tierNumber} ({featuredTier.reqPoints} Pts)
                    </div>
                  )}
                </div>
              </div>

              {/* CAMINO HORIZONTAL DE CASILLAS (TIERS RIBBON) */}
              <div style={{ width: '100%', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', padding: '0 2px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#334155' }}>
                    Camino de Temporada:
                  </span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0284C7' }}>
                    Desliza horizontalmente ➔
                  </span>
                </div>

                <div
                  className="battlepass-track"
                  style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    padding: '4px 2px 10px 2px',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  {BATTLE_PASS_TIERS.map((tier, idx) => {
                    const isClaimed = claimedTiers.includes(tier.tierNumber);
                    const isUnlocked = totalPassPoints >= tier.reqPoints;
                    const canClaim = isUnlocked && !isClaimed;
                    const isSelected = selectedTierIndex === idx;

                    return (
                      <button
                        key={tier.tierNumber}
                        onClick={() => {
                          soundService.playToken();
                          setSelectedTierIndex(idx);
                        }}
                        style={{
                          minWidth: '92px',
                          maxWidth: '98px',
                          flexShrink: 0,
                          background: isSelected
                            ? '#FEF3C7'
                            : canClaim
                            ? '#FFFBEB'
                            : isClaimed
                            ? '#F0FDF4'
                            : isUnlocked
                            ? '#FFFFFF'
                            : '#F8FAFC',
                          border: '2px solid',
                          borderColor: isSelected
                            ? '#F59E0B'
                            : canClaim
                            ? '#FBBF24'
                            : isClaimed
                            ? '#86EFAC'
                            : isUnlocked
                            ? '#CBD5E1'
                            : '#E2E8F0',
                          boxShadow: isSelected
                            ? '0 3px 0 #D97706'
                            : canClaim
                            ? '0 3px 0 #D97706'
                            : isClaimed
                            ? '0 2px 0 #86EFAC'
                            : '0 2px 0 #CBD5E1',
                          borderRadius: '13px',
                          padding: '7px 5px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          outline: 'none'
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.62rem',
                            fontWeight: 900,
                            background: isUnlocked ? '#0284C7' : '#94A3B8',
                            color: '#FFFFFF',
                            padding: '1px 5px',
                            borderRadius: '999px',
                            marginBottom: '4px'
                          }}
                        >
                          Nivel {tier.tierNumber}
                        </div>

                        {/* Icono Mini */}
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '9px',
                            background: isUnlocked ? tier.rarityColor : '#CBD5E1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            marginBottom: '4px'
                          }}
                        >
                          {tier.rewardType === 'bytes' ? (
                            <Zap size={16} fill="#FFFFFF" />
                          ) : tier.rewardType === 'xp' ? (
                            <Star size={16} fill="#FFFFFF" />
                          ) : tier.rewardType === 'chest' ? (
                            <Gift size={16} />
                          ) : tier.powerupKey === 'teacherHint' ? (
                            <GraduationCap size={16} />
                          ) : tier.powerupKey === 'eliminateOptions' ? (
                            <EyeOff size={16} />
                          ) : tier.powerupKey === 'secondChance' ? (
                            <ShieldCheck size={16} />
                          ) : (
                            <Code2 size={16} />
                          )}
                        </div>

                        <div
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 900,
                            color: isUnlocked ? '#0F172A' : '#64748B',
                            lineHeight: 1.15,
                            marginBottom: '4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '86px'
                          }}
                        >
                          {tier.title}
                        </div>

                        {/* Estado */}
                        {isClaimed ? (
                          <span style={{ fontSize: '0.64rem', fontWeight: 900, color: '#16A34A' }}>✓ Reclamado</span>
                        ) : canClaim ? (
                          <span style={{ fontSize: '0.64rem', fontWeight: 900, color: '#D97706' }}>✨ ¡Listo!</span>
                        ) : (
                          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#94A3B8' }}>{tier.reqPoints} Pts</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: CUADRO DE MISIONES Y OBJETIVOS CON PROGRESSBARS */}
          {activeTab === 'quests' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  background: '#EFF6FF',
                  border: '1.5px solid #BFDBFE',
                  borderRadius: '13px',
                  padding: '7px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Target size={16} color="#2563EB" flex-shrink="0" />
                <span style={{ fontSize: '0.74rem', color: '#1E40AF', fontWeight: 800, lineHeight: 1.3 }}>
                  Completa cada objetivo de programación para sumar Puntos de Pase y desbloquear recompensas.
                </span>
              </div>

              {/* LISTA DE OBJETIVOS CON SUS RESPECTIVOS PROGRESSBARS */}
              {quests.map((quest) => {
                const isClaimed = claimedQuests.includes(quest.id);
                const isReady = quest.current >= quest.target;
                const canClaim = isReady && !isClaimed;
                const percent = Math.min(100, Math.round((quest.current / quest.target) * 100));

                return (
                  <div
                    key={quest.id}
                    className="quest-card-item"
                    style={{
                      background: canClaim ? '#FFFBEB' : isClaimed ? '#F0FDF4' : '#FFFFFF',
                      border: '2px solid',
                      borderColor: canClaim
                        ? '#F59E0B'
                        : isClaimed
                        ? '#86EFAC'
                        : '#E2E8F0',
                      boxShadow: canClaim
                        ? '0 3px 0 #D97706'
                        : isClaimed
                        ? '0 2px 0 #BBF7D0'
                        : '0 2px 0 #CBD5E1',
                      borderRadius: '14px',
                      padding: '10px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      boxSizing: 'border-box',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Encabezado del Objetivo */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                        {/* Icono del objetivo */}
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '9px',
                            background:
                              quest.iconType === 'flame'
                                ? '#FFF7ED'
                                : quest.iconType === 'star'
                                ? '#FEF3C7'
                                : quest.iconType === 'target'
                                ? '#EFF6FF'
                                : quest.iconType === 'shield'
                                ? '#F0FDF4'
                                : '#FAF5FF',
                            border: `1.5px solid ${
                              quest.iconType === 'flame'
                                ? '#FDBA74'
                                : quest.iconType === 'star'
                                ? '#FDE68A'
                                : quest.iconType === 'target'
                                ? '#93C5FD'
                                : quest.iconType === 'shield'
                                ? '#86EFAC'
                                : '#D8B4FE'
                            }`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {quest.iconType === 'flame' && <Flame size={16} color="#EA580C" fill="#EA580C" />}
                          {quest.iconType === 'star' && <Star size={16} color="#D97706" fill="#D97706" />}
                          {quest.iconType === 'target' && <Target size={16} color="#2563EB" strokeWidth={2.4} />}
                          {quest.iconType === 'shield' && <ShieldCheck size={16} color="#16A34A" strokeWidth={2.4} />}
                          {quest.iconType === 'code' && <Code2 size={16} color="#9333EA" strokeWidth={2.4} />}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1px' }}>
                            <span
                              style={{
                                fontSize: '0.58rem',
                                fontWeight: 900,
                                background: '#E2E8F0',
                                color: '#475569',
                                padding: '1px 5px',
                                borderRadius: '4px'
                              }}
                            >
                              {quest.category}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.2 }}>
                            {quest.title}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, lineHeight: 1.25 }}>
                            {quest.desc}
                          </div>
                        </div>
                      </div>

                      {/* Recompensa en Puntos del Pase */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'flex-end', flexShrink: 0, marginLeft: 'auto' }}>
                        <span
                          style={{
                            background: '#ECFEFF',
                            border: '1.5px solid #A5F3FC',
                            borderRadius: '7px',
                            padding: '2px 6px',
                            fontSize: '0.68rem',
                            fontWeight: 900,
                            color: '#0891B2',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          <Zap size={11} color="#0891B2" fill="#0891B2" /> +{quest.rewardPoints} Pts Pase
                        </span>

                        {quest.rewardBytes && (
                          <span
                            style={{
                              background: '#EFF6FF',
                              border: '1.5px solid #BFDBFE',
                              borderRadius: '7px',
                              padding: '2px 6px',
                              fontSize: '0.68rem',
                              fontWeight: 900,
                              color: '#2563EB'
                            }}
                          >
                            +{quest.rewardBytes} Bytes
                          </span>
                        )}

                        {quest.powerupName && (
                          <span
                            style={{
                              background: '#FAF5FF',
                              border: '1.5px solid #E9D5FF',
                              borderRadius: '7px',
                              padding: '2px 6px',
                              fontSize: '0.68rem',
                              fontWeight: 900,
                              color: '#9333EA'
                            }}
                          >
                            {quest.powerupName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* BARRA DE PROGRESO DE ESTE OBJETIVO + BOTÓN DE RECLAMACIÓN */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', flexWrap: 'wrap' }}>
                      {/* Chunky Duolingo 3D Progress Bar */}
                      <div style={{ flex: 1, minWidth: '70px' }}>
                        <div
                          style={{
                            height: '10px',
                            background: '#E2E8F0',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '999px',
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${percent}%`,
                              background: isReady ? '#22C55E' : '#FF9500',
                              borderRadius: '999px',
                              transition: 'width 0.35s ease',
                              position: 'relative'
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                top: '1px',
                                left: '4px',
                                right: '4px',
                                height: '2px',
                                background: 'rgba(255, 255, 255, 0.5)',
                                borderRadius: '2px'
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contador numérico */}
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          color: '#1E293B',
                          minWidth: '45px',
                          textAlign: 'right'
                        }}
                      >
                        {quest.current} / {quest.target} ({percent}%)
                      </span>

                      {/* Botón de Reclamar Puntos si está listo */}
                      {isClaimed ? (
                        <div
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 900,
                            color: '#16A34A',
                            background: '#DCFCE7',
                            border: '1.5px solid #86EFAC',
                            borderRadius: '8px',
                            padding: '4px 8px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            flexShrink: 0
                          }}
                        >
                          <CheckCircle2 size={12} /> Reclamado
                        </div>
                      ) : canClaim ? (
                        <button
                          onClick={() => handleClaimQuest(quest)}
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 900,
                            color: '#FFFFFF',
                            background: '#22C55E',
                            border: '2px solid #86EFAC',
                            boxShadow: '0 2px 0 #15803D',
                            borderRadius: '9px',
                            padding: '4px 10px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            flexShrink: 0,
                            transition: 'all 0.1s ease'
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'translateY(2px)';
                            e.currentTarget.style.boxShadow = '0 1px 0 #15803D';
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 0 #15803D';
                          }}
                        >
                          <Sparkles size={12} /> ¡Reclamar!
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
