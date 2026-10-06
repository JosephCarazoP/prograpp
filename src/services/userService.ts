import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { UserProfile, LeagueTier } from '../types/user';
import { storageService } from './storageService';

export const DEFAULT_POWERUPS = {
  teacherHint: 2,
  eliminateOptions: 2,
  secondChance: 1,
  codePeek: 2
};

export const DEFAULT_PROFILE: UserProfile = {
  uid: 'guest_user_1',
  displayName: 'Dev Aprendiz',
  avatarId: 'robot_byte',
  currentPath: 'kotlin',
  currentThemeId: 'theme_default',
  totalXp: 120,
  bytes: 50, // Monedas iniciales
  batteries: 5,
  maxBatteries: 5,
  lastBatteryRechargeAt: Date.now(),
  streak: {
    count: 3,
    lastActivityDate: new Date().toISOString().split('T')[0],
    freezeEquipped: true
  },
  currentLeague: 'bronze' as LeagueTier,
  weeklyXp: 120,
  shareEnabled: false,
  powerups: { ...DEFAULT_POWERUPS },
  openedChests: [],
  defeatedBosses: [],
  createdAt: Date.now()
};

export function sanitizeUserProfile(raw: any, fallbackUid = 'guest_user_1'): UserProfile {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_PROFILE, uid: fallbackUid };
  }

  let streakObj = {
    count: 3,
    lastActivityDate: new Date().toISOString().split('T')[0],
    freezeEquipped: true
  };

  if (typeof raw.streak === 'number') {
    streakObj.count = raw.streak;
  } else if (raw.streak && typeof raw.streak === 'object') {
    streakObj = {
      count: typeof raw.streak.count === 'number' ? raw.streak.count : 3,
      lastActivityDate: typeof raw.streak.lastActivityDate === 'string' ? raw.streak.lastActivityDate : new Date().toISOString().split('T')[0],
      freezeEquipped: Boolean(raw.streak.freezeEquipped)
    };
  }

  const validPath = raw.currentPath === 'sql' ? 'sql' : 'kotlin';

  const powerups = {
    teacherHint: typeof raw.powerups?.teacherHint === 'number' ? raw.powerups.teacherHint : DEFAULT_POWERUPS.teacherHint,
    eliminateOptions: typeof raw.powerups?.eliminateOptions === 'number' ? raw.powerups.eliminateOptions : DEFAULT_POWERUPS.eliminateOptions,
    secondChance: typeof raw.powerups?.secondChance === 'number' ? raw.powerups.secondChance : DEFAULT_POWERUPS.secondChance,
    codePeek: typeof raw.powerups?.codePeek === 'number' ? raw.powerups.codePeek : DEFAULT_POWERUPS.codePeek
  };

  const openedChests = Array.isArray(raw.openedChests) ? raw.openedChests : [];
  const defeatedBosses = Array.isArray(raw.defeatedBosses) ? raw.defeatedBosses : [];

  return {
    uid: raw.uid || fallbackUid,
    displayName: raw.displayName || DEFAULT_PROFILE.displayName,
    avatarId: raw.avatarId || DEFAULT_PROFILE.avatarId,
    currentPath: validPath,
    currentThemeId: raw.currentThemeId || DEFAULT_PROFILE.currentThemeId,
    totalXp: typeof raw.totalXp === 'number' ? raw.totalXp : (typeof raw.xp === 'number' ? raw.xp : DEFAULT_PROFILE.totalXp),
    bytes: typeof raw.bytes === 'number' ? raw.bytes : DEFAULT_PROFILE.bytes,
    batteries: typeof raw.batteries === 'number' ? Math.max(0, Math.min(5, raw.batteries)) : DEFAULT_PROFILE.batteries,
    maxBatteries: typeof raw.maxBatteries === 'number' ? raw.maxBatteries : 5,
    lastBatteryRechargeAt: typeof raw.lastBatteryRechargeAt === 'number' ? raw.lastBatteryRechargeAt : Date.now(),
    streak: streakObj,
    currentLeague: raw.currentLeague || 'bronze',
    weeklyXp: typeof raw.weeklyXp === 'number' ? raw.weeklyXp : DEFAULT_PROFILE.weeklyXp,
    shareEnabled: Boolean(raw.shareEnabled),
    powerups,
    openedChests,
    defeatedBosses,
    createdAt: typeof raw.createdAt === 'number' ? raw.createdAt : Date.now()
  };
}

export const userService = {
  // Obtener perfil (Primero local para velocidad instantánea, luego Firestore)
  async getProfile(uid: string = 'guest_user_1'): Promise<UserProfile> {
    const rawLocal = storageService.getItem<any>('user_profile', { ...DEFAULT_PROFILE, uid });
    const local = sanitizeUserProfile(rawLocal, uid);

    // Actualizar recarga pasiva de baterías si ha pasado tiempo
    const updatedWithBatteries = this.calculatePassiveBatteryRecharge(local);

    if (!isLocalMockMode && db) {
      try {
        const userDocRef = doc(db, 'users', uid);
        // Timeout de 1.8s para no bloquear jamás si Firestore está offline o pendiente de reglas
        const snapshot = await Promise.race([
          getDoc(userDocRef),
          new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 1800))
        ]);
        if (snapshot && snapshot.exists()) {
          const remoteData = sanitizeUserProfile(snapshot.data(), uid);
          storageService.setItem('user_profile', remoteData);
          return remoteData;
        } else if (snapshot) {
          // Crear perfil inicial en Firestore
          await setDoc(userDocRef, updatedWithBatteries);
        }
      } catch (err) {
        console.warn('[userService] Usando perfil en caché por falta de conexión:', err);
      }
    }

    storageService.setItem('user_profile', updatedWithBatteries);
    return updatedWithBatteries;
  },

  // Guardar cambios de perfil
  async updateProfile(profile: UserProfile): Promise<void> {
    storageService.setItem('user_profile', profile);

    if (!isLocalMockMode && db) {
      try {
        const userDocRef = doc(db, 'users', profile.uid);
        await setDoc(userDocRef, profile, { merge: true });
      } catch (err) {
        console.warn('[userService] Guardado en cola local para sincronización posterior:', err);
      }
    }
  },

  // Descontar una batería por error
  async consumeBattery(profile: UserProfile): Promise<UserProfile> {
    const updated: UserProfile = {
      ...profile,
      batteries: Math.max(0, profile.batteries - 1),
      lastBatteryRechargeAt: profile.batteries === profile.maxBatteries ? Date.now() : profile.lastBatteryRechargeAt
    };
    await this.updateProfile(updated);
    return updated;
  },

  // Recarga instantánea en el Gimnasio de Práctica (+1 batería por repaso completado)
  async addPracticeBattery(profile: UserProfile): Promise<UserProfile> {
    const updated: UserProfile = {
      ...profile,
      batteries: Math.min(profile.maxBatteries, profile.batteries + 1)
    };
    await this.updateProfile(updated);
    return updated;
  },

  // Sumar XP y Bytes por aciertos
  async rewardUser(profile: UserProfile, xp: number, bytes: number = 0): Promise<UserProfile> {
    const today = new Date().toISOString().split('T')[0];
    const streak = { ...profile.streak };

    // Lógica de racha
    if (streak.lastActivityDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (streak.lastActivityDate === yesterday) {
        streak.count += 1;
      } else if (streak.freezeEquipped) {
        // Consumir el protector de racha
        streak.freezeEquipped = false;
        streak.count += 1;
      } else {
        streak.count = 1;
      }
      streak.lastActivityDate = today;
    }

    const updated: UserProfile = {
      ...profile,
      totalXp: profile.totalXp + xp,
      weeklyXp: profile.weeklyXp + xp,
      bytes: profile.bytes + bytes,
      streak
    };

    await this.updateProfile(updated);
    return updated;
  },

  // Cálculo pasivo de recarga de batería (1 cada 30 minutos)
  calculatePassiveBatteryRecharge(profile: UserProfile): UserProfile {
    if (profile.batteries >= profile.maxBatteries) return profile;

    const msPerBattery = 30 * 60 * 1000; // 30 min
    const elapsed = Date.now() - profile.lastBatteryRechargeAt;
    const batteriesToAdd = Math.floor(elapsed / msPerBattery);

    if (batteriesToAdd > 0) {
      const newBatteries = Math.min(profile.maxBatteries, profile.batteries + batteriesToAdd);
      return {
        ...profile,
        batteries: newBatteries,
        lastBatteryRechargeAt: Date.now()
      };
    }

    return profile;
  },

  // Consumir un comodín durante una prueba o combate
  async consumePowerUp(profile: UserProfile, powerUpKey: keyof typeof DEFAULT_POWERUPS): Promise<UserProfile> {
    const currentCount = profile.powerups[powerUpKey] || 0;
    if (currentCount <= 0) return profile;

    const updated: UserProfile = {
      ...profile,
      powerups: {
        ...profile.powerups,
        [powerUpKey]: Math.max(0, currentCount - 1)
      }
    };
    await this.updateProfile(updated);
    return updated;
  },

  // Otorgar comodines (por cofres o recompensas)
  async grantPowerUps(profile: UserProfile, additions: Partial<typeof DEFAULT_POWERUPS>): Promise<UserProfile> {
    const updated: UserProfile = {
      ...profile,
      powerups: {
        teacherHint: (profile.powerups.teacherHint || 0) + (additions.teacherHint || 0),
        eliminateOptions: (profile.powerups.eliminateOptions || 0) + (additions.eliminateOptions || 0),
        secondChance: (profile.powerups.secondChance || 0) + (additions.secondChance || 0),
        codePeek: (profile.powerups.codePeek || 0) + (additions.codePeek || 0)
      }
    };
    await this.updateProfile(updated);
    return updated;
  },

  // Registrar cofre abierto de forma permanente y otorgar botín
  async recordOpenedChest(
    profile: UserProfile,
    chestId: string,
    rewards: {
      bytes?: number;
      xp?: number;
      batteries?: number;
      powerups?: Partial<typeof DEFAULT_POWERUPS>;
    }
  ): Promise<UserProfile> {
    if (profile.openedChests.includes(chestId)) {
      return profile; // Ya reclamado
    }

    const newOpened = [...profile.openedChests, chestId];
    const newBytes = (profile.bytes || 0) + (rewards.bytes || 0);
    const newXp = (profile.totalXp || 0) + (rewards.xp || 0);
    const newBatteries = Math.min(profile.maxBatteries || 5, (profile.batteries || 0) + (rewards.batteries || 0));

    const newPowerups = {
      teacherHint: (profile.powerups.teacherHint || 0) + (rewards.powerups?.teacherHint || 0),
      eliminateOptions: (profile.powerups.eliminateOptions || 0) + (rewards.powerups?.eliminateOptions || 0),
      secondChance: (profile.powerups.secondChance || 0) + (rewards.powerups?.secondChance || 0),
      codePeek: (profile.powerups.codePeek || 0) + (rewards.powerups?.codePeek || 0)
    };

    const updated: UserProfile = {
      ...profile,
      openedChests: newOpened,
      bytes: newBytes,
      totalXp: newXp,
      weeklyXp: (profile.weeklyXp || 0) + (rewards.xp || 0),
      batteries: newBatteries,
      powerups: newPowerups
    };

    await this.updateProfile(updated);
    return updated;
  },

  // Registrar victoria sobre un jefe de unidad
  async recordDefeatedBoss(
    profile: UserProfile,
    bossId: string,
    rewards: { bytes: number; xp: number }
  ): Promise<UserProfile> {
    const newDefeated = profile.defeatedBosses.includes(bossId)
      ? profile.defeatedBosses
      : [...profile.defeatedBosses, bossId];

    const updated: UserProfile = {
      ...profile,
      defeatedBosses: newDefeated,
      totalXp: (profile.totalXp || 0) + rewards.xp,
      weeklyXp: (profile.weeklyXp || 0) + rewards.xp,
      bytes: (profile.bytes || 0) + rewards.bytes
    };

    await this.updateProfile(updated);
    return updated;
  }
};
