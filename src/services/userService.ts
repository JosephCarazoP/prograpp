import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
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
  displayName: 'Estudiante',
  avatarId: 'robot_byte',
  currentPath: 'kotlin',
  currentThemeId: 'theme_default',
  totalXp: 120,
  bytes: 50, // Monedas iniciales
  batteries: 5,
  maxBatteries: 5,
  lastBatteryRechargeAt: Date.now(),
  streak: {
    count: 0,
    lastActivityDate: '',
    freezeEquipped: false
  },
  currentLeague: 'bronze' as LeagueTier,
  weeklyXp: 120,
  shareEnabled: false,
  powerups: { ...DEFAULT_POWERUPS },
  openedChests: [],
  defeatedBosses: [],
  unlockedSkins: ['byte_classic'],
  equippedSkin: 'byte_classic',
  createdAt: Date.now()
};

export function sanitizeUserProfile(raw: any, fallbackUid = 'guest_user_1'): UserProfile {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_PROFILE, uid: fallbackUid };
  }

  let streakObj = {
    count: 0,
    lastActivityDate: '',
    freezeEquipped: false
  };

  if (typeof raw.streak === 'number') {
    streakObj.count = raw.streak;
  } else if (raw.streak && typeof raw.streak === 'object') {
    streakObj = {
      count: typeof raw.streak.count === 'number' ? raw.streak.count : 0,
      lastActivityDate: typeof raw.streak.lastActivityDate === 'string' ? raw.streak.lastActivityDate : '',
      freezeEquipped: Boolean(raw.streak.freezeEquipped)
    };
  }

  // Comprobar si se rompió la racha (si pasaron más de 1 día de inactividad)
  if (streakObj.lastActivityDate && streakObj.count > 0) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (streakObj.lastActivityDate !== today && streakObj.lastActivityDate !== yesterday) {
      if (streakObj.freezeEquipped) {
        const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
        if (streakObj.lastActivityDate === twoDaysAgo) {
          // Salva 1 día de congelación
          streakObj.freezeEquipped = false;
        } else {
          streakObj.count = 0;
        }
      } else {
        // Racha reiniciada a 0 por faltar un día
        streakObj.count = 0;
      }
    }
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

  // Generar código de estudiante amigable (ej: E01, E02...) basado en UID si no existe
  let fallbackStudentCode = 'E01';
  if (fallbackUid && fallbackUid.length >= 3) {
    const numericPart = Math.abs(fallbackUid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 99 + 1;
    fallbackStudentCode = `E${numericPart < 10 ? '0' : ''}${numericPart}`;
  }

  // Resolver nombre de usuario real garantizando que no se reemplace con Dev Aprendiz
  const cleanFirstName = typeof raw.firstName === 'string' ? raw.firstName.trim() : '';
  const cleanFirstLast = typeof raw.firstLastName === 'string' ? raw.firstLastName.trim() : '';
  const cleanSecondLast = typeof raw.secondLastName === 'string' ? raw.secondLastName.trim() : '';
  const fullName = [cleanFirstName, cleanFirstLast, cleanSecondLast].filter(Boolean).join(' ').trim();

  let resolvedDisplayName = raw.displayName;
  if (fullName) {
    resolvedDisplayName = fullName;
  } else if (!resolvedDisplayName || resolvedDisplayName === 'Dev Aprendiz') {
    if (raw.email) {
      const emailPrefix = raw.email.split('@')[0];
      resolvedDisplayName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
    } else {
      resolvedDisplayName = 'Estudiante';
    }
  }

  return {
    uid: raw.uid || fallbackUid,
    displayName: resolvedDisplayName,
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
    unlockedSkins: Array.isArray(raw.unlockedSkins) && raw.unlockedSkins.length > 0
      ? Array.from(new Set(['byte_classic', ...raw.unlockedSkins]))
      : ['byte_classic'],
    equippedSkin: typeof raw.equippedSkin === 'string' ? raw.equippedSkin : 'byte_classic',
    createdAt: typeof raw.createdAt === 'number' ? raw.createdAt : Date.now(),
    email: raw.email || '',
    firstName: cleanFirstName,
    firstLastName: cleanFirstLast,
    secondLastName: cleanSecondLast,
    idNumber: typeof raw.idNumber === 'string' ? raw.idNumber : '',
    studentCode: raw.studentCode || fallbackStudentCode,
    group: raw.group || 'Grupo A',
    isResearchParticipant: typeof raw.isResearchParticipant === 'boolean' ? raw.isResearchParticipant : false,
    hasCompletedInitialDiagnostic: typeof raw.hasCompletedInitialDiagnostic === 'boolean' ? raw.hasCompletedInitialDiagnostic : false,
    totalActiveTimeSeconds: typeof raw.totalActiveTimeSeconds === 'number' ? raw.totalActiveTimeSeconds : 0,
    lastActiveAt: typeof raw.lastActiveAt === 'number' ? raw.lastActiveAt : (typeof raw.createdAt === 'number' ? raw.createdAt : 0),
    isOnline: typeof raw.isOnline === 'boolean' ? raw.isOnline : undefined,
    currentActivity: raw.currentActivity && typeof raw.currentActivity === 'object' ? raw.currentActivity : undefined
  };
}


export const userService = {
  // Obtener perfil (Primero local para velocidad instantánea, luego Firestore)
  async getProfile(uid: string = 'guest_user_1'): Promise<UserProfile> {
    const rawLocal = storageService.getItem<any>('user_profile', null);
    // Solo reutilizar el perfil en caché local si coincide con el UID solicitado
    const isValidLocal = rawLocal && rawLocal.uid === uid;
    const local = isValidLocal
      ? sanitizeUserProfile(rawLocal, uid)
      : sanitizeUserProfile({ uid }, uid);

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
          await setDoc(userDocRef, local);
        }
      } catch (err) {
        console.warn('[userService] Usando perfil en caché por falta de conexión:', err);
      }
    }

    storageService.setItem('user_profile', local);
    return local;
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

  // Operaciones de batería eliminadas (aprendizaje libre e ilimitado)
  async consumeBattery(profile: UserProfile): Promise<UserProfile> {
    return profile;
  },

  async addPracticeBattery(profile: UserProfile): Promise<UserProfile> {
    return profile;
  },

  // Sumar XP y Bytes por aciertos
  async rewardUser(profile: UserProfile, xp: number, bytes: number = 0): Promise<UserProfile> {
    const today = new Date().toISOString().split('T')[0];
    const streak = { ...profile.streak };

    // Lógica de racha estricta: Se contabiliza si hoy no se ha activado o si la racha actual está en 0
    if (streak.lastActivityDate !== today || !streak.count || streak.count <= 0) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];

      if (streak.lastActivityDate === yesterday) {
        streak.count = (streak.count || 0) + 1;
      } else if (streak.freezeEquipped && streak.lastActivityDate === twoDaysAgo) {
        // Consumir protector por el día perdido de ayer
        streak.freezeEquipped = false;
        streak.count = (streak.count || 0) + 1;
      } else {
        // Primer día completado o reinicio de racha
        streak.count = Math.max(1, (streak.count || 0) + 1);
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
  },

  // Obtener lista completa de estudiantes (Solo Administrador)
  async getAllStudents(): Promise<UserProfile[]> {
    if (!isLocalMockMode && db) {
      try {
        const usersCol = collection(db, 'users');
        const snapshot = await getDocs(usersCol);
        const list: UserProfile[] = [];
        snapshot.forEach(docSnap => {
          list.push(sanitizeUserProfile(docSnap.data(), docSnap.id));
        });
        return list;
      } catch (err) {
        console.warn('[userService] Error al obtener lista de alumnos remota:', err);
      }
    }
    // Fallback local
    const local = storageService.getItem<any>('user_profile', DEFAULT_PROFILE);
    return [sanitizeUserProfile(local)];
  },

  // Actualizar datos académicos de investigación del estudiante (Solo Administrador)
  async updateStudentAcademicInfo(
    uid: string,
    data: {
      studentCode?: string;
      group?: string;
      isResearchParticipant?: boolean;
    }
  ): Promise<void> {
    const profile = await this.getProfile(uid);
    const updated: UserProfile = {
      ...profile,
      studentCode: data.studentCode !== undefined ? data.studentCode : profile.studentCode,
      group: data.group !== undefined ? data.group : profile.group,
      isResearchParticipant: data.isResearchParticipant !== undefined ? data.isResearchParticipant : profile.isResearchParticipant
    };
    await this.updateProfile(updated);
  },

  // Registrar tiempo activo acumulado de aprendizaje
  async addActiveTime(uid: string, seconds: number): Promise<void> {
    const profile = await this.getProfile(uid);
    const updated: UserProfile = {
      ...profile,
      totalActiveTimeSeconds: (profile.totalActiveTimeSeconds || 0) + seconds,
      lastActiveAt: Date.now(),
      isOnline: true
    };
    await this.updateProfile(updated);
  },

  // Eliminar estudiante de Firestore y limpiar cachés locales (Solo Administrador)
  async deleteStudent(uid: string): Promise<void> {
    if (!isLocalMockMode && db) {
      try {
        const userDocRef = doc(db, 'users', uid);
        await deleteDoc(userDocRef);
        // Eliminar presencia si existe
        try {
          const presenceRef = doc(db, 'presence', uid);
          await deleteDoc(presenceRef);
        } catch {}
      } catch (err) {
        console.warn('[userService] Error al eliminar usuario de Firestore:', err);
      }
    }
    // Limpiar claves locales asociadas
    try {
      storageService.removeItem('academic_attempts_' + uid);
      storageService.removeItem('academic_evaluations_' + uid);
      storageService.removeItem('user_presence_' + uid);
    } catch {}
  }
};

