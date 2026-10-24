import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Trophy,
  Zap,
  Sparkles,
  CheckCircle2,
  Lock,
  Gift,
  Flame,
  HelpCircle,
  Scissors,
  Shield,
  Eye,
  Crown,
  CheckCheck,
  Target,
  Code2,
  Star,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types/user';
import { LessonProgress } from '../types/progress';
import { userService } from '../services/userService';
import { soundService } from '../services/soundService';

export type PowerUpKey = 'teacherHint' | 'eliminateOptions' | 'secondChance' | 'codePeek';

export interface SeasonPathPageProps {
  user: UserProfile;
  progress: Record<string, LessonProgress>;
  initialTab?: 'path' | 'quests';
  onBack: () => void;
  onUpdateUser: (updated: UserProfile) => void;
}

export type SeasonReward =
  | { type: 'bytes'; amount: number }
  | { type: 'powerup'; key: PowerUpKey; count: number; name: string }
  | { type: 'xp'; amount: number }
  | { type: 'chest'; chestName: string; bytes: number; xp: number; powerupKey?: PowerUpKey; powerupName?: string }
  | { type: 'skin'; skinId: string; skinName: string; fallbackBytes: number }
  | { type: 'grand_prize'; bytes: number; xp: number; title: string };

export interface SeasonTier {
  tier: number;
  reqPoints: number;
  title: string;
  subtitle: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  isMilestone: boolean;
  reward: SeasonReward;
}

// Curva progresiva y coherente de dificultad para los 100 Niveles del Pase
export function getRequiredPointsForTier(tier: number): number {
  if (tier <= 1) return 0;
  let total = 0;
  for (let t = 2; t <= tier; t++) {
    if (t <= 10) total += 120;       // Niveles 1-10: 120 pts (Inicio accesible)
    else if (t <= 30) total += 180;  // Niveles 11-30: 180 pts (Crecimiento sostenido)
    else if (t <= 60) total += 240;  // Niveles 31-60: 240 pts (Intermedio sólido)
    else if (t <= 85) total += 300;  // Niveles 61-85: 300 pts (Avanzado riguroso)
    else total += 380;               // Niveles 86-100: 380 pts (Maestría y Gran Premio Mítico)
  }
  return total;
}

export function calculateTierLevel(points: number): number {
  for (let t = 100; t >= 1; t--) {
    if (points >= getRequiredPointsForTier(t)) {
      return t;
    }
  }
  return 1;
}

// Generador procedural determinista de los 100 Niveles de Temporada
function generate100SeasonTiers(): SeasonTier[] {
  const tiers: SeasonTier[] = [];

  for (let i = 1; i <= 100; i++) {
    const reqPoints = getRequiredPointsForTier(i);
    const isMilestone = i === 5 || i === 10 || i === 15 || i === 20 || i === 25 ||
      i === 30 || i === 35 || i === 40 || i === 45 || i === 50 ||
      i === 60 || i === 70 || i === 75 || i === 80 || i === 90 || i === 100;

    let rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' = 'common';
    if (i >= 85) rarity = 'mythic';
    else if (i >= 50) rarity = 'legendary';
    else if (i >= 25) rarity = 'epic';
    else if (i >= 10) rarity = 'rare';

    let reward: SeasonReward;
    let title = '';
    let subtitle = '';

    if (i === 1) {
      reward = { type: 'bytes', amount: 50 };
      title = '+50 Bytes de Inicio';
      subtitle = 'Bienvenida a la Temporada 1';
    } else if (i === 100) {
      reward = { type: 'grand_prize', bytes: 2500, xp: 1200, title: 'Corona Dios del Código' };
      title = '👑 Corona Suprema Dios del Código';
      subtitle = 'Gran Cofre Mítico +2,500 Bytes +1,200 XP + Lote Máximo';
      rarity = 'mythic';
    } else if (i === 75) {
      reward = { type: 'skin', skinId: 'byte_cyberpunk', skinName: 'Skin Cyber-Hacker', fallbackBytes: 800 };
      title = '🌟 Traje Exclusivo Cyber-Hacker';
      subtitle = 'Skin Épica 3D o 800 Bytes de bonificación';
      rarity = 'legendary';
    } else if (i === 50) {
      reward = { type: 'skin', skinId: 'byte_pixel', skinName: 'Skin Retro Pixel', fallbackBytes: 650 };
      title = '🌟 Traje Exclusivo Retro Pixel';
      subtitle = 'Skin Arcade 3D o 650 Bytes de compensación';
      rarity = 'legendary';
    } else if (i === 25) {
      reward = { type: 'skin', skinId: 'byte_student', skinName: 'Skin Estudiante', fallbackBytes: 350 };
      title = '🌟 Traje Colegial de Byte';
      subtitle = 'Skin con gorra y mochila o 350 Bytes';
      rarity = 'epic';
    } else if (i === 10) {
      reward = { type: 'chest', chestName: 'Cofre de Plata de Temporada', bytes: 200, xp: 80, powerupKey: 'teacherHint', powerupName: '1× Pista' };
      title = '🏆 Cofre de Plata de Algoritmos';
      subtitle = '+200 Bytes, +80 XP y 1× Pista Pedagógica';
      rarity = 'rare';
    } else if (i === 5) {
      reward = { type: 'chest', chestName: 'Cofre de Bronce de Inicio', bytes: 120, xp: 50 };
      title = '🎁 Cofre de Bronce de Temporada';
      subtitle = '+120 Bytes y +50 XP de progreso directo';
      rarity = 'rare';
    } else if (i === 15 || i === 30 || i === 45 || i === 60 || i === 80 || i === 90) {
      const mult = Math.floor(i / 10);
      reward = {
        type: 'chest',
        chestName: `Cofre de Maestría Nvl ${i}`,
        bytes: 250 + mult * 50,
        xp: 100 + mult * 25,
        powerupKey: i % 2 === 0 ? 'eliminateOptions' : 'secondChance',
        powerupName: i % 2 === 0 ? '1× 50/50' : '1× Escudo'
      };
      title = `🎁 Megacofre de Temporada Nivel ${i}`;
      subtitle = `+${250 + mult * 50} Bytes, +${100 + mult * 25} XP y Comodín táctico`;
    } else {
      // Niveles regulares cíclicos y variados
      const cycle = i % 5;
      if (cycle === 1) {
        const bytesAmt = 40 + Math.floor(i * 3.5);
        reward = { type: 'bytes', amount: bytesAmt };
        title = `+${bytesAmt} Bytes Tácticos`;
        subtitle = 'Moneda oficial para tienda y potenciadores';
      } else if (cycle === 2) {
        reward = { type: 'powerup', key: 'teacherHint', count: 1, name: 'Pista Pedagógica' };
        title = '1× Pista del Docente';
        subtitle = 'Asistencia conceptual en tus ejercicios';
      } else if (cycle === 3) {
        const xpAmt = 30 + Math.floor(i * 2.2);
        reward = { type: 'xp', amount: xpAmt };
        title = `+${xpAmt} XP de Temporada`;
        subtitle = 'Impulso académico a tu perfil y liga';
      } else if (cycle === 4) {
        reward = { type: 'powerup', key: 'eliminateOptions', count: 1, name: 'Comodín 50/50' };
        title = '1× Comodín 50 / 50';
        subtitle = 'Descarta 2 opciones erróneas de un tiro';
      } else {
        reward = { type: 'powerup', key: 'secondChance', count: 1, name: 'Segunda Oportunidad' };
        title = '1× Escudo Segunda Oportunidad';
        subtitle = 'Absorbe un error protegiendo tu racha';
      }
    }

    tiers.push({
      tier: i,
      reqPoints,
      title,
      subtitle,
      rarity,
      isMilestone,
      reward
    });
  }

  return tiers;
}

const ALL_100_TIERS = generate100SeasonTiers();

export interface SeasonQuest {
  id: string;
  category: 'MISIÓN DIARIA' | 'DESAFÍO DE TEMPORADA';
  title: string;
  description: string;
  current: number;
  target: number;
  rewardPoints: number;
  rewardBytes?: number;
  rewardXp?: number;
  powerupKey?: PowerUpKey;
  powerupName?: string;
  icon: 'flame' | 'code' | 'star' | 'shield' | 'trophy' | 'target' | 'zap' | 'crown';
}

export const SeasonPathPage: React.FC<SeasonPathPageProps> = ({
  user,
  progress,
  initialTab = 'path',
  onBack,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState<'path' | 'quests'>(initialTab || 'path');
  const [questsFilter, setQuestsFilter] = useState<'all' | 'unclaimed' | 'completed'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'unclaimed' | 'milestones'>('all');
  const [rangeFilter, setRangeFilter] = useState<'all' | '1-20' | '21-40' | '41-60' | '61-80' | '81-100'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [timeLeftToday, setTimeLeftToday] = useState<string>('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Temporizador diario para reinicio de misiones a medianoche
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = Math.max(0, midnight.getTime() - now.getTime());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeftToday(`${hours}h ${mins}m`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Clave de fecha (YYYY-MM-DD) para refresco automático de misiones cada día
  const todayKey = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  const storageKey = `prograpp_season1_claimed_${user?.uid || 'guest'}`;
  const questBonusStorageKey = `prograpp_season_quest_bonus_${user?.uid || 'guest'}`;
  const dailyClaimedStorageKey = `prograpp_season_claimed_daily_${user?.uid || 'guest'}_${todayKey}`;
  const dailyChestStorageKey = `prograpp_season_daily_chest_${user?.uid || 'guest'}_${todayKey}`;
  const oldStorageKey = `prograpp_bp_${user?.uid || 'guest'}`;

  const [claimedTiers, setClaimedTiers] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [questBonusPoints, setQuestBonusPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(questBonusStorageKey);
      if (saved) return parseInt(saved, 10);
      const oldSaved = localStorage.getItem(`${oldStorageKey}_points`);
      return oldSaved ? parseInt(oldSaved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [claimedQuests, setClaimedQuests] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(dailyClaimedStorageKey);
      if (saved) return JSON.parse(saved);
      return [];
    } catch {
      return [];
    }
  });

  const [isDailyChestClaimed, setIsDailyChestClaimed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(dailyChestStorageKey);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Conteo de lecciones completadas
  const completedLessonsCount = useMemo(() => {
    return Object.values(progress || {}).filter((p) => (p?.starsEarned || 0) > 0 || Boolean(p?.completedAt)).length;
  }, [progress]);

  // Puntos del Pase de Temporada:
  // Se ganan principalmente completando las Misiones Diarias del Pase (questBonusPoints),
  // más un impulso estructurado por lecciones completadas (+15 pts cada una) y bonus de racha diaria activa.
  // De esta forma NO se regalan 30 niveles al instante por XP acumulado previo, garantizando dificultad balanceada y coherente.
  const totalSeasonPoints = useMemo(() => {
    const lessonBonus = completedLessonsCount * 15;
    const streakBonus = Math.min(50, (user?.streak?.count || 0) * 10);
    return questBonusPoints + lessonBonus + streakBonus;
  }, [user?.streak?.count, completedLessonsCount, questBonusPoints]);

  // Lista dinámica de misiones diarias que otorgan puntos para subir de nivel en el pase
  const quests: SeasonQuest[] = useMemo(() => {
    const safeProgress = progress || {};
    const stars3Count = Object.values(safeProgress).filter(
      (p) => (p?.starsEarned || 0) === 3
    ).length;
    const hasDefeatedBoss = Object.keys(safeProgress).some(
      (k) => k.includes('boss') && (safeProgress[k]?.starsEarned || 0) > 0
    );
    const userStreak = user?.streak?.count || 0;
    const userXp = user?.totalXp || 0;

    return [
      // ═══ MISIONES DIARIAS DEL PASE DE TEMPORADA ═══
      {
        id: 'q_daily_streak',
        category: 'MISIÓN DIARIA',
        title: 'Dev en Racha Activa',
        description: 'Mantén encendida tu racha de estudio diaria en PrograApp.',
        current: userStreak > 0 ? 1 : 0,
        target: 1,
        rewardPoints: 75,
        rewardBytes: 25,
        rewardXp: 20,
        icon: 'flame'
      },
      {
        id: 'q_daily_lessons',
        category: 'MISIÓN DIARIA',
        title: 'Código en Marcha (2 Lecciones)',
        description: 'Supera al menos 2 lecciones en tu ruta activa (Kotlin o SQL).',
        current: Math.min(2, completedLessonsCount),
        target: 2,
        rewardPoints: 90,
        rewardBytes: 30,
        rewardXp: 30,
        icon: 'code'
      },
      {
        id: 'q_daily_xp',
        category: 'MISIÓN DIARIA',
        title: 'Cazador de Experiencia (50 XP)',
        description: 'Acumula al menos 50 XP resolviendo lecciones y prácticas.',
        current: Math.min(50, userXp % 150),
        target: 50,
        rewardPoints: 80,
        rewardBytes: 25,
        powerupKey: 'teacherHint',
        powerupName: '1× Pista',
        icon: 'star'
      },
      {
        id: 'q_daily_stars',
        category: 'MISIÓN DIARIA',
        title: 'Precisión Algorítmica (3 Estrellas)',
        description: 'Domina lecciones con calificación de 3 estrellas doradas.',
        current: Math.min(2, stars3Count),
        target: 2,
        rewardPoints: 95,
        rewardBytes: 35,
        powerupKey: 'secondChance',
        powerupName: '1× Escudo',
        icon: 'shield'
      },
      {
        id: 'q_daily_theory',
        category: 'MISIÓN DIARIA',
        title: 'Fundamentos y Conceptos',
        description: 'Consulta guías conceptuales y teoría técnica antes de las evaluaciones.',
        current: 1,
        target: 1,
        rewardPoints: 75,
        rewardBytes: 20,
        powerupKey: 'eliminateOptions',
        powerupName: '1× 50 / 50',
        icon: 'code'
      },
      {
        id: 'q_daily_tactical',
        category: 'MISIÓN DIARIA',
        title: 'Desafío Táctico Diario',
        description: 'Supera un combate de Jefe de Unidad o una práctica de sintaxis.',
        current: hasDefeatedBoss ? 1 : (completedLessonsCount >= 1 ? 1 : 0),
        target: 1,
        rewardPoints: 110,
        rewardBytes: 40,
        rewardXp: 40,
        powerupKey: 'codePeek',
        powerupName: '1× Vista Previa',
        icon: 'trophy'
      }
    ];
  }, [user, progress, completedLessonsCount]);

  const unclaimedQuests = useMemo(() => {
    return quests.filter((q) => q.current >= q.target && !claimedQuests.includes(q.id));
  }, [quests, claimedQuests]);

  const unclaimedQuestsCount = unclaimedQuests.length;

  const completedDailyCount = useMemo(() => {
    return quests.filter((q) => q.current >= q.target).length;
  }, [quests]);

  const visibleQuests = useMemo(() => {
    return quests.filter((q) => {
      if (questsFilter === 'unclaimed') return q.current >= q.target && !claimedQuests.includes(q.id);
      if (questsFilter === 'completed') return claimedQuests.includes(q.id);
      return true;
    });
  }, [quests, questsFilter, claimedQuests]);

  // Nivel actual calculado con la curva graduada (1 a 100)
  const currentTierLevel = useMemo(() => {
    return calculateTierLevel(totalSeasonPoints);
  }, [totalSeasonPoints]);

  const nextTierPoints = useMemo(() => {
    if (currentTierLevel >= 100) return getRequiredPointsForTier(100);
    return getRequiredPointsForTier(currentTierLevel + 1);
  }, [currentTierLevel]);

  const prevTierPoints = useMemo(() => {
    return getRequiredPointsForTier(currentTierLevel);
  }, [currentTierLevel]);

  const progressPercent = useMemo(() => {
    if (currentTierLevel >= 100) return 100;
    const neededForNext = nextTierPoints - prevTierPoints;
    if (neededForNext <= 0) return 100;
    const earnedInCurrentTier = totalSeasonPoints - prevTierPoints;
    return Math.min(100, Math.max(0, Math.round((earnedInCurrentTier / neededForNext) * 100)));
  }, [currentTierLevel, nextTierPoints, prevTierPoints, totalSeasonPoints]);

  // Tiers disponibles para reclamar
  const unclaimedTiers = useMemo(() => {
    return ALL_100_TIERS.filter((t) => totalSeasonPoints >= t.reqPoints && !claimedTiers.includes(t.tier));
  }, [totalSeasonPoints, claimedTiers]);

  // Filtrado de tiers para la vista
  const visibleTiers = useMemo(() => {
    return ALL_100_TIERS.filter((t) => {
      // Rango numérico
      if (rangeFilter === '1-20' && (t.tier < 1 || t.tier > 20)) return false;
      if (rangeFilter === '21-40' && (t.tier < 21 || t.tier > 40)) return false;
      if (rangeFilter === '41-60' && (t.tier < 41 || t.tier > 60)) return false;
      if (rangeFilter === '61-80' && (t.tier < 61 || t.tier > 80)) return false;
      if (rangeFilter === '81-100' && (t.tier < 81 || t.tier > 100)) return false;

      // Filtro de estado
      if (filterMode === 'milestones' && !t.isMilestone) return false;
      if (filterMode === 'unclaimed') {
        const isUnlocked = totalSeasonPoints >= t.reqPoints;
        const isClaimed = claimedTiers.includes(t.tier);
        return isUnlocked && !isClaimed;
      }

      return true;
    });
  }, [rangeFilter, filterMode, totalSeasonPoints, claimedTiers]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Reclamar un nivel específico
  const handleClaimTier = async (tier: SeasonTier) => {
    if (claimedTiers.includes(tier.tier)) return;
    if (totalSeasonPoints < tier.reqPoints) {
      soundService.playError();
      return;
    }

    soundService.playWin();

    // Actualizar usuario con la recompensa
    let updated: UserProfile = { ...user };
    const r = tier.reward;

    if (r.type === 'bytes') {
      updated.bytes = (updated.bytes || 0) + r.amount;
    } else if (r.type === 'xp') {
      updated.totalXp = (updated.totalXp || 0) + r.amount;
    } else if (r.type === 'powerup') {
      const cur = updated.powerups?.[r.key] || 0;
      updated.powerups = {
        ...(updated.powerups || { teacherHint: 0, eliminateOptions: 0, secondChance: 0, codePeek: 0 }),
        [r.key]: cur + r.count
      };
    } else if (r.type === 'chest') {
      updated.bytes = (updated.bytes || 0) + r.bytes;
      updated.totalXp = (updated.totalXp || 0) + r.xp;
      if (r.powerupKey) {
        const cur = updated.powerups?.[r.powerupKey] || 0;
        updated.powerups = {
          ...(updated.powerups || { teacherHint: 0, eliminateOptions: 0, secondChance: 0, codePeek: 0 }),
          [r.powerupKey]: cur + 1
        };
      }
    } else if (r.type === 'skin') {
      const alreadyHas = (updated.unlockedSkins || []).includes(r.skinId);
      if (alreadyHas) {
        updated.bytes = (updated.bytes || 0) + r.fallbackBytes;
      } else {
        updated.unlockedSkins = [...(updated.unlockedSkins || ['byte_classic']), r.skinId];
      }
    } else if (r.type === 'grand_prize') {
      updated.bytes = (updated.bytes || 0) + r.bytes;
      updated.totalXp = (updated.totalXp || 0) + r.xp;
      updated.powerups = {
        teacherHint: (updated.powerups?.teacherHint || 0) + 5,
        eliminateOptions: (updated.powerups?.eliminateOptions || 0) + 5,
        secondChance: (updated.powerups?.secondChance || 0) + 5,
        codePeek: (updated.powerups?.codePeek || 0) + 5
      };
    }

    const nextClaimed = [...claimedTiers, tier.tier];
    setClaimedTiers(nextClaimed);
    try {
      localStorage.setItem(storageKey, JSON.stringify(nextClaimed));
    } catch {}

    onUpdateUser(updated);
    await userService.updateProfile(updated);
    showToast(`¡Reclamaste Nivel ${tier.tier}: ${tier.title}!`);
  };

  // Reclamar todo lo disponible
  const handleClaimAll = async () => {
    if (unclaimedTiers.length === 0) return;
    soundService.playWin();

    let updated: UserProfile = { ...user };
    const newlyClaimed: number[] = [];

    for (const tier of unclaimedTiers) {
      newlyClaimed.push(tier.tier);
      const r = tier.reward;
      if (r.type === 'bytes') {
        updated.bytes = (updated.bytes || 0) + r.amount;
      } else if (r.type === 'xp') {
        updated.totalXp = (updated.totalXp || 0) + r.amount;
      } else if (r.type === 'powerup') {
        const cur = updated.powerups?.[r.key] || 0;
        updated.powerups = {
          ...(updated.powerups || { teacherHint: 0, eliminateOptions: 0, secondChance: 0, codePeek: 0 }),
          [r.key]: cur + r.count
        };
      } else if (r.type === 'chest') {
        updated.bytes = (updated.bytes || 0) + r.bytes;
        updated.totalXp = (updated.totalXp || 0) + r.xp;
        if (r.powerupKey) {
          const cur = updated.powerups?.[r.powerupKey] || 0;
          updated.powerups = {
            ...(updated.powerups || { teacherHint: 0, eliminateOptions: 0, secondChance: 0, codePeek: 0 }),
            [r.powerupKey]: cur + 1
          };
        }
      } else if (r.type === 'skin') {
        const alreadyHas = (updated.unlockedSkins || []).includes(r.skinId);
        if (alreadyHas) {
          updated.bytes = (updated.bytes || 0) + r.fallbackBytes;
        } else {
          updated.unlockedSkins = [...(updated.unlockedSkins || ['byte_classic']), r.skinId];
        }
      } else if (r.type === 'grand_prize') {
        updated.bytes = (updated.bytes || 0) + r.bytes;
        updated.totalXp = (updated.totalXp || 0) + r.xp;
        updated.powerups = {
          teacherHint: (updated.powerups?.teacherHint || 0) + 5,
          eliminateOptions: (updated.powerups?.eliminateOptions || 0) + 5,
          secondChance: (updated.powerups?.secondChance || 0) + 5,
          codePeek: (updated.powerups?.codePeek || 0) + 5
        };
      }
    }

    const nextClaimed = [...claimedTiers, ...newlyClaimed];
    setClaimedTiers(nextClaimed);
    try {
      localStorage.setItem(storageKey, JSON.stringify(nextClaimed));
    } catch {}

    onUpdateUser(updated);
    await userService.updateProfile(updated);
    showToast(`¡Reclamaste ${newlyClaimed.length} recompensas de temporada a la vez!`);
  };

  const scrollToMyLevel = () => {
    soundService.playToken();
    setRangeFilter('all');
    setTimeout(() => {
      const el = document.getElementById(`season-tier-card-${currentTierLevel}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  };

  const handleClaimQuest = async (quest: SeasonQuest) => {
    if (claimedQuests.includes(quest.id)) return;
    if (quest.current < quest.target) return;

    soundService.playWin();
    try {
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    } catch {}

    const newClaimed = [...claimedQuests, quest.id];
    setClaimedQuests(newClaimed);
    const newBonus = questBonusPoints + quest.rewardPoints;
    setQuestBonusPoints(newBonus);

    try {
      localStorage.setItem(dailyClaimedStorageKey, JSON.stringify(newClaimed));
      localStorage.setItem(questBonusStorageKey, newBonus.toString());
    } catch {}

    let updated = await userService.rewardUser(user, quest.rewardXp || 0, quest.rewardBytes || 0);
    if (quest.powerupKey) {
      updated = await userService.grantPowerUps(updated, { [quest.powerupKey]: 1 });
    }
    onUpdateUser(updated);

    showToast(`¡Misión Diaria completada! +${quest.rewardPoints} PTS añadidos para subir de nivel en el Pase`);
  };

  const handleClaimDailyChest = async () => {
    if (isDailyChestClaimed || completedDailyCount < 3) return;

    soundService.playChest();
    try {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.55 } });
    } catch {}

    setIsDailyChestClaimed(true);
    const newBonus = questBonusPoints + 150;
    setQuestBonusPoints(newBonus);

    try {
      localStorage.setItem(dailyChestStorageKey, 'true');
      localStorage.setItem(questBonusStorageKey, newBonus.toString());
    } catch {}

    let updated = await userService.rewardUser(user, 50, 60);
    updated = await userService.grantPowerUps(updated, { secondChance: 1 });
    onUpdateUser(updated);

    showToast('🎁 ¡Cofre Diario del Pase abierto! +150 PTS de Pase, +60 Bytes y 1× Escudo');
  };

  const renderQuestIcon = (iconName: string) => {
    switch (iconName) {
      case 'flame': return <Flame size={20} color="#EA580C" fill="#F59E0B" />;
      case 'code': return <Code2 size={20} color="#0284C7" />;
      case 'star': return <Star size={20} color="#CA8A04" fill="#FEF08A" />;
      case 'shield': return <Shield size={20} color="#7E22CE" />;
      case 'trophy': return <Trophy size={20} color="#B45309" fill="#FCD34D" />;
      case 'target': return <Target size={20} color="#DC2626" />;
      case 'zap': return <Zap size={20} color="#D97706" fill="#FDE68A" />;
      case 'crown': return <Crown size={20} color="#CA8A04" fill="#FDE047" />;
      default: return <Sparkles size={20} color="#2563EB" />;
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'mythic': return { bg: '#FEF9C3', border: '#EAB308', text: '#854D0E', label: 'MÍTICO' };
      case 'legendary': return { bg: '#FEF3C7', border: '#F59E0B', text: '#B45309', label: 'LEGENDARIO' };
      case 'epic': return { bg: '#F3E8FF', border: '#A855F7', text: '#7E22CE', label: 'ÉPICO' };
      case 'rare': return { bg: '#E0F2FE', border: '#0EA5E9', text: '#0369A1', label: 'RARO' };
      default: return { bg: '#F1F5F9', border: '#94A3B8', text: '#475569', label: 'COMÚN' };
    }
  };

  const renderRewardIcon = (r: SeasonReward, isMilestone: boolean) => {
    if (r.type === 'grand_prize') return <Crown size={32} color="#EAB308" strokeWidth={2.5} />;
    if (r.type === 'skin') return <Sparkles size={28} color="#9333EA" strokeWidth={2.5} />;
    if (r.type === 'chest') return <Gift size={28} color={isMilestone ? '#F59E0B' : '#0284C7'} strokeWidth={2.5} />;
    if (r.type === 'bytes') return <Zap size={26} color="#0284C7" fill="#0284C7" />;
    if (r.type === 'xp') return <Trophy size={26} color="#D97706" />;
    if (r.type === 'powerup') {
      if (r.key === 'teacherHint') return <HelpCircle size={26} color="#16A34A" />;
      if (r.key === 'eliminateOptions') return <Scissors size={26} color="#D97706" />;
      if (r.key === 'secondChance') return <Shield size={26} color="#7E22CE" />;
      return <Eye size={26} color="#0284C7" />;
    }
    return <Gift size={26} color="#000000" />;
  };

  return (
    <div className="season-path-screen-root" style={{ width: '100%', maxWidth: '1080px', margin: '0 auto', padding: '16px 14px 100px 14px', boxSizing: 'border-box' }}>
      {/* ═══ CABECERA NEO-BRUTALIST DE PÁGINA ═══ */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          paddingBottom: '16px',
          borderBottom: '3px solid #000000',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            className="duo-3d-back-btn"
            onClick={() => {
              soundService.playToken();
              onBack();
            }}
            title="Volver a la ruta de aprendizaje"
            aria-label="Volver"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '2.5px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </button>
          <div>
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 900,
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                letterSpacing: '0.06em',
                marginBottom: '2px'
              }}
            >
              <Trophy size={13} /> PASE Y DESAFÍOS DE TEMPORADA
            </div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 900, margin: 0, color: '#000000', letterSpacing: '-0.02em' }}>
              Temporada 1 • Camino y Desafíos
            </h1>
          </div>
        </div>

        {/* CLUSTER DE ESTADÍSTICAS DEL JUGADOR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div
            style={{
              background: '#FEF3C7',
              border: '2px solid #000000',
              boxShadow: '2.5px 2.5px 0px #000000',
              borderRadius: '12px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.86rem',
              fontWeight: 900,
              color: '#B45309'
            }}
          >
            <Flame size={18} fill="#F59E0B" color="#B45309" />
            <span>NIVEL {currentTierLevel} / 100</span>
          </div>

          <div
            style={{
              background: '#ECFEFF',
              border: '2px solid #000000',
              boxShadow: '2.5px 2.5px 0px #000000',
              borderRadius: '12px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.86rem',
              fontWeight: 900,
              color: '#0891B2'
            }}
          >
            <Zap size={18} fill="#0891B2" color="#0891B2" />
            <span>{totalSeasonPoints.toLocaleString()} PTS</span>
          </div>
        </div>
      </header>

      {/* ═══ BANNER PRINCIPAL NEO-BRUTALIST DE TEMPORADA ═══ */}
      <section
        style={{
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF08A 100%)',
          border: '3px solid #000000',
          boxShadow: '5px 5px 0px #000000',
          borderRadius: '20px',
          padding: '20px 22px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#000000',
                color: '#FEF08A',
                padding: '3px 9px',
                borderRadius: '8px',
                fontSize: '0.68rem',
                fontWeight: 900,
                letterSpacing: '0.05em',
                marginBottom: '6px'
              }}
            >
              <Crown size={12} /> TEMPORADA 1 OFICIAL
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000000', margin: 0 }}>
              Era de los Algoritmos y Datos
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#475569', margin: '4px 0 0 0', fontWeight: 700 }}>
              Completa lecciones, quizes, prácticas y teoría para acumular Puntos de Temporada y desbloquear las 100 recompensas exclusivas.
            </p>
          </div>

          {unclaimedTiers.length > 0 && (
            <button
              type="button"
              onClick={handleClaimAll}
              style={{
                background: '#22C55E',
                color: '#FFFFFF',
                border: '2.5px solid #000000',
                boxShadow: '3.5px 3.5px 0px #000000',
                borderRadius: '12px',
                padding: '10px 16px',
                fontSize: '0.88rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '0.02em',
                transition: 'transform 0.08s ease'
              }}
            >
              <CheckCheck size={18} strokeWidth={3} />
              RECLAMAR TODO ({unclaimedTiers.length})
            </button>
          )}
        </div>

        {/* BARRA DE PROGRESO GLOBAL HACIA EL SIGUIENTE NIVEL */}
        <div style={{ background: '#FFFFFF', border: '2px solid #000000', borderRadius: '14px', padding: '12px 14px', boxShadow: '3px 3px 0px #000000' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#0F172A' }}>
              Progreso al Nivel {Math.min(100, currentTierLevel + 1)}:
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#0284C7' }}>
              {totalSeasonPoints} / {nextTierPoints} Pts ({progressPercent}%)
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '14px',
              background: '#E2E8F0',
              border: '2px solid #000000',
              borderRadius: '999px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #F59E0B, #22C55E)',
                borderRadius: '999px',
                transition: 'width 0.4s ease'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700 }}>
              Has desbloqueado {claimedTiers.length} de 100 niveles
            </span>
            <button
              type="button"
              onClick={scrollToMyLevel}
              style={{
                background: '#F1F5F9',
                border: '1.5px solid #000000',
                borderRadius: '8px',
                padding: '3px 8px',
                fontSize: '0.72rem',
                fontWeight: 900,
                color: '#000000',
                cursor: 'pointer'
              }}
            >
              📍 Ir a mi nivel actual ({currentTierLevel})
            </button>
          </div>
        </div>
      </section>

      {/* ═══ MASTER TABS SWITCHER: CAMINO (100 NIVELES) VS DESAFÍOS DE TEMPORADA ═══ */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          background: '#FFFFFF',
          padding: '6px',
          borderRadius: '16px',
          border: '2.5px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          width: 'fit-content',
          flexWrap: 'wrap'
        }}
      >
        <button
          type="button"
          onClick={() => {
            soundService.playToken();
            setActiveTab('path');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '12px',
            border: activeTab === 'path' ? '2.5px solid #000000' : '2.5px solid transparent',
            background: activeTab === 'path' ? '#FEF08A' : 'transparent',
            boxShadow: activeTab === 'path' ? '2.5px 2.5px 0px #000000' : 'none',
            fontWeight: 900,
            fontSize: '0.88rem',
            color: '#000000',
            cursor: 'pointer',
            transition: 'all 0.12s ease'
          }}
        >
          <Trophy size={18} strokeWidth={2.5} />
          <span>CAMINO DE 100 NIVELES</span>
          {unclaimedTiers.length > 0 && (
            <span
              style={{
                background: '#22C55E',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                padding: '2px 7px',
                borderRadius: '999px',
                border: '1.5px solid #000000'
              }}
            >
              {unclaimedTiers.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            soundService.playToken();
            setActiveTab('quests');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '12px',
            border: activeTab === 'quests' ? '2.5px solid #000000' : '2.5px solid transparent',
            background: activeTab === 'quests' ? '#FED7AA' : 'transparent',
            boxShadow: activeTab === 'quests' ? '2.5px 2.5px 0px #000000' : 'none',
            fontWeight: 900,
            fontSize: '0.88rem',
            color: '#000000',
            cursor: 'pointer',
            transition: 'all 0.12s ease'
          }}
        >
          <Flame size={18} strokeWidth={2.5} color="#EA580C" />
          <span>MISIONES DIARIAS DEL PASE</span>
          {unclaimedQuestsCount > 0 && (
            <span
              style={{
                background: '#EA580C',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                padding: '2px 7px',
                borderRadius: '999px',
                border: '1.5px solid #000000',
                fontWeight: 900
              }}
            >
              {unclaimedQuestsCount} LISTAS
            </span>
          )}
        </button>
      </div>

      {activeTab === 'path' && (
        <>
          {/* ═══ BARRA DE FILTROS Y CAPÍTULOS DE NAVEGACIÓN RÁPIDA ═══ */}
          <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '20px',
          background: '#FFFFFF',
          border: '2.5px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          borderRadius: '16px',
          padding: '12px 14px'
        }}
      >
        {/* Selector de Rango de Niveles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', marginRight: '4px', flexShrink: 0 }}>
            Capítulos:
          </span>
          {[
            { id: 'all', label: 'Todos (1-100)' },
            { id: '1-20', label: '1 - 20 (Inicio)' },
            { id: '21-40', label: '21 - 40 (Lógica)' },
            { id: '41-60', label: '41 - 60 (Estructuras)' },
            { id: '61-80', label: '61 - 80 (SQL & Datos)' },
            { id: '81-100', label: '81 - 100 (Maestría)' }
          ].map((r) => {
            const isAct = rangeFilter === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  soundService.playToken();
                  setRangeFilter(r.id as any);
                }}
                style={{
                  background: isAct ? '#000000' : '#F1F5F9',
                  color: isAct ? '#FFFFFF' : '#0F172A',
                  border: '1.5px solid #000000',
                  borderRadius: '10px',
                  padding: '6px 11px',
                  fontSize: '0.74rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'transform 0.08s ease'
                }}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Filtro por Estado (Todos, Por reclamar, Hitos) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase' }}>
            Filtro:
          </span>
          <button
            type="button"
            onClick={() => { soundService.playToken(); setFilterMode('all'); }}
            style={{
              background: filterMode === 'all' ? '#E0F2FE' : '#FFFFFF',
              borderColor: '#000000',
              border: '1.5px solid #000000',
              boxShadow: filterMode === 'all' ? '2px 2px 0px #000000' : 'none',
              color: '#0369A1',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.72rem',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            Ver Todos ({ALL_100_TIERS.length})
          </button>

          <button
            type="button"
            onClick={() => { soundService.playToken(); setFilterMode('unclaimed'); }}
            style={{
              background: filterMode === 'unclaimed' ? '#DCFCE7' : '#FFFFFF',
              borderColor: '#000000',
              border: '1.5px solid #000000',
              boxShadow: filterMode === 'unclaimed' ? '2px 2px 0px #000000' : 'none',
              color: '#15803D',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.72rem',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            Listos para Reclamar ({unclaimedTiers.length})
          </button>

          <button
            type="button"
            onClick={() => { soundService.playToken(); setFilterMode('milestones'); }}
            style={{
              background: filterMode === 'milestones' ? '#FEF3C7' : '#FFFFFF',
              borderColor: '#000000',
              border: '1.5px solid #000000',
              boxShadow: filterMode === 'milestones' ? '2px 2px 0px #000000' : 'none',
              color: '#B45309',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.72rem',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            Hitos y Cofres Especiales
          </button>
        </div>
      </section>

      {/* ═══ NOTIFICACIÓN FLOTANTE (TOAST) ═══ */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#22C55E',
            color: '#FFFFFF',
            border: '2.5px solid #000000',
            boxShadow: '4px 4px 0px #000000',
            borderRadius: '14px',
            padding: '12px 18px',
            fontSize: '0.86rem',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 9999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <CheckCircle2 size={20} strokeWidth={3} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ═══ GRID RESPONSIVO CON LAS 100 CASILLAS / NIVELES ═══ */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '14px'
        }}
      >
        {visibleTiers.map((tier) => {
          const isClaimed = claimedTiers.includes(tier.tier);
          const isUnlocked = totalSeasonPoints >= tier.reqPoints;
          const canClaim = isUnlocked && !isClaimed;
          const isCurrent = tier.tier === currentTierLevel;
          const rStyle = getRarityBadge(tier.rarity);

          return (
            <div
              key={tier.tier}
              id={`season-tier-card-${tier.tier}`}
              style={{
                background: isClaimed
                  ? '#F0FDF4'
                  : canClaim
                  ? '#FEF08A'
                  : tier.isMilestone
                  ? '#FFFBEB'
                  : '#FFFFFF',
                border: canClaim
                  ? '3px solid #000000'
                  : isCurrent
                  ? '3px solid #0284C7'
                  : '2.5px solid #000000',
                boxShadow: canClaim
                  ? '5px 5px 0px #000000'
                  : isCurrent
                  ? '4px 4px 0px #0284C7'
                  : '3px 3px 0px #000000',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                position: 'relative',
                boxSizing: 'border-box',
                transition: 'transform 0.08s ease'
              }}
            >
              {/* Badge superior: Nivel + Rareza */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                <div
                  style={{
                    background: isCurrent ? '#0284C7' : '#000000',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '3px 8px',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Trophy size={12} />
                  <span>NIVEL {tier.tier}</span>
                </div>

                <div
                  style={{
                    background: rStyle.bg,
                    borderColor: rStyle.border,
                    color: rStyle.text,
                    border: '1.5px solid #000000',
                    boxShadow: '1px 1px 0px #000000',
                    borderRadius: '6px',
                    padding: '2px 6px',
                    fontSize: '0.62rem',
                    fontWeight: 900,
                    letterSpacing: '0.04em'
                  }}
                >
                  {rStyle.label}
                </div>
              </div>

              {/* Icono central de la recompensa */}
              <div
                style={{
                  height: '76px',
                  borderRadius: '12px',
                  background: canClaim ? '#FFFFFF' : isClaimed ? '#DCFCE7' : '#F8FAFC',
                  border: '2px dashed #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                {renderRewardIcon(tier.reward, tier.isMilestone)}
                {tier.isMilestone && (
                  <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#B45309', background: '#FEF3C7', padding: '1px 6px', borderRadius: '4px', border: '1px solid #000000' }}>
                    HITO ESPECIAL
                  </span>
                )}
              </div>

              {/* Título y descripción */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.94rem', fontWeight: 900, color: '#000000', margin: '0 0 2px 0', lineHeight: 1.25 }}>
                  {tier.title}
                </h3>
                <p style={{ fontSize: '0.74rem', color: '#64748B', margin: 0, fontWeight: 700, lineHeight: 1.35 }}>
                  {tier.subtitle}
                </p>
              </div>

              {/* Requisitos y Botón de Acción */}
              <div style={{ borderTop: '1.5px solid #E2E8F0', paddingTop: '8px' }}>
                {isClaimed ? (
                  <div
                    style={{
                      background: '#DCFCE7',
                      color: '#15803D',
                      border: '1.5px solid #000000',
                      borderRadius: '10px',
                      padding: '8px 10px',
                      fontSize: '0.76rem',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <CheckCircle2 size={15} strokeWidth={3} />
                    <span>RECLAMADO</span>
                  </div>
                ) : canClaim ? (
                  <button
                    type="button"
                    onClick={() => handleClaimTier(tier)}
                    style={{
                      width: '100%',
                      background: '#22C55E',
                      color: '#FFFFFF',
                      border: '2px solid #000000',
                      boxShadow: '2.5px 2.5px 0px #000000',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      fontSize: '0.82rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      letterSpacing: '0.02em',
                      animation: 'pulse 1.6s infinite'
                    }}
                  >
                    <Gift size={16} strokeWidth={2.5} />
                    ¡RECLAMAR AHORA!
                  </button>
                ) : (
                  <div
                    style={{
                      background: '#F1F5F9',
                      color: '#64748B',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '10px',
                      padding: '8px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <Lock size={13} />
                    <span>Requiere {tier.reqPoints} Pts</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </>
  )}

  {activeTab === 'quests' && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* ═══ TARJETA MAESTRA: COFRE DIARIO DE TEMPORADA ═══ */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FEF08A 0%, #FED7AA 100%)',
          border: '3px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          borderRadius: '20px',
          padding: '20px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: '580px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: '#FFFFFF',
              border: '2.5px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Gift size={28} color="#D97706" strokeWidth={2.4} />
          </div>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: '#000000',
                color: '#FEF08A',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.66rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                marginBottom: '4px'
              }}
            >
              <Sparkles size={11} /> BONIFICACIÓN DEL DÍA {timeLeftToday && `• ⏰ NUEVAS EN ${timeLeftToday.toUpperCase()}`}
            </div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#000000' }}>
              Cofre Diario del Pase
            </h3>
            <p style={{ margin: '3px 0 0 0', fontSize: '0.82rem', color: '#475569', fontWeight: 700 }}>
              Supera al menos 3 misiones de hoy para abrir el botín táctico: +150 PTS de Pase, +60 Bytes y 1× Escudo.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#000000' }}>
            Progreso Diario: {completedDailyCount} / 3 misiones
          </div>
          {isDailyChestClaimed ? (
            <div
              style={{
                background: '#FFFFFF',
                color: '#16A34A',
                border: '2px solid #000000',
                boxShadow: '2.5px 2.5px 0px #000000',
                borderRadius: '12px',
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <CheckCircle2 size={16} strokeWidth={3} />
              COFRE RECLAMADO HOY
            </div>
          ) : completedDailyCount >= 3 ? (
            <button
              type="button"
              onClick={handleClaimDailyChest}
              style={{
                background: '#22C55E',
                color: '#FFFFFF',
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                borderRadius: '12px',
                padding: '10px 18px',
                fontSize: '0.86rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                animation: 'pulse 1.5s infinite'
              }}
            >
              <Gift size={18} strokeWidth={2.4} />
              ¡ABRIR COFRE DIARIO!
            </button>
          ) : (
            <div
              style={{
                background: '#FFFFFF',
                color: '#64748B',
                border: '2px solid #000000',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                fontWeight: 800
              }}
            >
              Faltan {Math.max(1, 3 - completedDailyCount)} misión(es) hoy
            </div>
          )}
        </div>
      </div>

      {/* ═══ FILTROS DE MISIONES / DESAFÍOS ═══ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          flexWrap: 'wrap',
          background: '#FFFFFF',
          border: '2.5px solid #000000',
          boxShadow: '3px 3px 0px #000000',
          borderRadius: '16px',
          padding: '10px 14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', marginRight: '4px' }}>
            Filtro:
          </span>
          {[
            { id: 'all', label: `Todas (${quests.length})` },
            { id: 'unclaimed', label: `🎁 Listas (${unclaimedQuestsCount})` },
            { id: 'completed', label: `✅ Completadas (${claimedQuests.length})` }
          ].map((f) => {
            const isAct = questsFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  soundService.playToken();
                  setQuestsFilter(f.id as any);
                }}
                style={{
                  background: isAct ? '#FEF08A' : '#F1F5F9',
                  color: '#000000',
                  border: isAct ? '2px solid #000000' : '1.5px solid transparent',
                  boxShadow: isAct ? '2px 2px 0px #000000' : 'none',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '0.76rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  transition: 'all 0.1s ease'
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#475569' }}>
          Puntos ganados en misiones: <strong style={{ color: '#0284C7' }}>+{questBonusPoints} PTS</strong>
        </div>
      </div>

      {/* ═══ GRID DE TARJETAS DE DESAFÍOS ═══ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px'
        }}
      >
        {visibleQuests.map((quest) => {
          const isClaimed = claimedQuests.includes(quest.id);
          const canClaim = !isClaimed && quest.current >= quest.target;
          const progressPct = Math.min(100, Math.round((quest.current / quest.target) * 100));

          return (
            <div
              key={quest.id}
              style={{
                background: '#FFFFFF',
                border: '2.5px solid #000000',
                boxShadow: canClaim ? '4px 4px 0px #22C55E' : '3.5px 3.5px 0px #000000',
                borderRadius: '18px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                transition: 'transform 0.1s ease'
              }}
            >
              {/* Top Row: Categoría y Estado */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span
                    style={{
                      background: quest.category === 'MISIÓN DIARIA' ? '#EFF6FF' : '#FAF5FF',
                      color: quest.category === 'MISIÓN DIARIA' ? '#1D4ED8' : '#7E22CE',
                      border: '1.5px solid #000000',
                      borderRadius: '8px',
                      padding: '2px 8px',
                      fontSize: '0.64rem',
                      fontWeight: 900,
                      letterSpacing: '0.04em'
                    }}
                  >
                    {quest.category}
                  </span>

                  {isClaimed ? (
                    <span
                      style={{
                        background: '#DCFCE7',
                        color: '#15803D',
                        border: '1.5px solid #000000',
                        borderRadius: '8px',
                        padding: '2px 8px',
                        fontSize: '0.64rem',
                        fontWeight: 900,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Check size={11} strokeWidth={3} /> COMPLETADO
                    </span>
                  ) : canClaim ? (
                    <span
                      style={{
                        background: '#FFEDD5',
                        color: '#C2410C',
                        border: '1.5px solid #000000',
                        borderRadius: '8px',
                        padding: '2px 8px',
                        fontSize: '0.64rem',
                        fontWeight: 900
                      }}
                    >
                      ¡LISTO PARA RECLAMAR!
                    </span>
                  ) : (
                    <span
                      style={{
                        background: '#F1F5F9',
                        color: '#475569',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        padding: '2px 7px',
                        fontSize: '0.64rem',
                        fontWeight: 800
                      }}
                    >
                      {progressPct}%
                    </span>
                  )}
                </div>

                {/* Icono + Título + Descripción */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: '#FEF08A',
                      border: '2px solid #000000',
                      boxShadow: '2px 2px 0px #000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {renderQuestIcon(quest.icon)}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 3px 0', fontSize: '0.96rem', fontWeight: 900, color: '#0F172A' }}>
                      {quest.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4, fontWeight: 700 }}>
                      {quest.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Barra de Progreso */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B' }}>Progreso:</span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#0F172A' }}>
                    {quest.current} / {quest.target}
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    background: '#E2E8F0',
                    border: '1.5px solid #000000',
                    borderRadius: '999px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: `${progressPct}%`,
                      height: '100%',
                      background: canClaim || isClaimed ? '#22C55E' : '#3B82F6',
                      borderRadius: '999px',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>

                {/* Píldoras de Recompensas */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                  <span
                    style={{
                      background: '#FEF3C7',
                      border: '1.5px solid #000000',
                      borderRadius: '6px',
                      padding: '2px 6px',
                      fontSize: '0.7rem',
                      fontWeight: 900,
                      color: '#B45309',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Flame size={12} fill="#F59E0B" color="#B45309" />
                    +{quest.rewardPoints} PTS PASE
                  </span>
                  {quest.rewardBytes && (
                    <span
                      style={{
                        background: '#ECFEFF',
                        border: '1.5px solid #000000',
                        borderRadius: '6px',
                        padding: '2px 6px',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        color: '#0891B2',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Zap size={12} fill="#0891B2" color="#0891B2" />
                      +{quest.rewardBytes} Bytes
                    </span>
                  )}
                  {quest.rewardXp && (
                    <span
                      style={{
                        background: '#F0FDF4',
                        border: '1.5px solid #000000',
                        borderRadius: '6px',
                        padding: '2px 6px',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        color: '#15803D'
                      }}
                    >
                      +{quest.rewardXp} XP
                    </span>
                  )}
                  {quest.powerupName && (
                    <span
                      style={{
                        background: '#FAF5FF',
                        border: '1.5px solid #000000',
                        borderRadius: '6px',
                        padding: '2px 6px',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        color: '#7E22CE'
                      }}
                    >
                      🎁 {quest.powerupName}
                    </span>
                  )}
                </div>

                {/* Botón de Reclamar / Estado */}
                <div style={{ marginTop: '12px' }}>
                  {isClaimed ? (
                    <div
                      style={{
                        width: '100%',
                        background: '#F1F5F9',
                        color: '#64748B',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: '10px',
                        padding: '7px 10px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      <CheckCircle2 size={14} strokeWidth={3} />
                      <span>RECOMPENSA RECLAMADA</span>
                    </div>
                  ) : canClaim ? (
                    <button
                      type="button"
                      onClick={() => handleClaimQuest(quest)}
                      style={{
                        width: '100%',
                        background: '#22C55E',
                        color: '#FFFFFF',
                        border: '2px solid #000000',
                        boxShadow: '2.5px 2.5px 0px #000000',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        fontSize: '0.82rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        letterSpacing: '0.02em',
                        animation: 'pulse 1.6s infinite'
                      }}
                    >
                      <Gift size={16} strokeWidth={2.5} />
                      ¡RECLAMAR RECOMPENSA!
                    </button>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        background: '#F8FAFC',
                        color: '#94A3B8',
                        border: '1.5px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '7px 10px',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        textAlign: 'center'
                      }}
                    >
                      En progreso ({quest.current} / {quest.target})
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}
    </div>
  );
};
