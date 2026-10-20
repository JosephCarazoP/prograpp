import { UserProfile, LeagueTier } from '../types/user';
import { userService } from './userService';
import { presenceService } from './presenceService';
import { storageService } from './storageService';
import { academicService } from './academicService';

export interface LeagueStudentEntry {
  uid: string;
  studentCode: string;
  displayName: string;
  avatarId: string;
  equippedSkin?: string;
  currentLeague: LeagueTier;
  totalLeaguePoints: number;
  weeklyXp: number;
  accuracyRate: number; // Porcentaje de precisión (0-100)
  totalAttempts: number;
  totalCorrect: number;
  theoriesReadCount: number; // Materias leídas
  quizzesCompletedCount: number; // Quizzes de materias superados
  streakDays: number;
  totalActiveTimeMinutes: number;
  position: number;
  previousPosition?: number;
  trend: 'up' | 'down' | 'same' | 'new';
  isOnline: boolean;
  group: string;
}

export interface LeagueLeaderboardData {
  tier: LeagueTier;
  tierName: string;
  tierColor: string;
  tierBorder: string;
  weekNumber: number;
  year: number;
  daysRemaining: number;
  hoursRemaining: number;
  entries: LeagueStudentEntry[];
  currentUserEntry?: LeagueStudentEntry;
  totalParticipants: number;
}

export const LEAGUE_TIER_META: Record<LeagueTier, { name: string; color: string; border: string; bg: string; minPoints: number }> = {
  bronze: { name: 'Liga Bronce', color: '#B45309', border: '#D97706', bg: '#FEF3C7', minPoints: 0 },
  silver: { name: 'Liga Plata', color: '#475569', border: '#94A3B8', bg: '#F1F5F9', minPoints: 400 },
  gold: { name: 'Liga Oro', color: '#D97706', border: '#F59E0B', bg: '#FFFBEB', minPoints: 850 },
  sapphire: { name: 'Liga Zafiro', color: '#0369A1', border: '#0284C7', bg: '#E0F2FE', minPoints: 1400 },
  diamond: { name: 'Liga Diamante', color: '#0F766E', border: '#14B8A6', bg: '#CCFBF1', minPoints: 2200 },
  master: { name: 'Liga Maestro', color: '#6D28D9', border: '#8B5CF6', bg: '#F5F3FF', minPoints: 3200 }
};

export const leagueService = {
  // Obtiene el número de semana ISO actual
  getCurrentWeekNumber(): number {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return weekNo;
  },

  // Tiempo restante para el corte semanal de la Liga (cada domingo a las 23:59)
  getTimeRemaining(): { days: number; hours: number } {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 es Domingo
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + daysUntilSunday);
    endOfWeek.setHours(23, 59, 59, 999);

    const diffMs = Math.max(0, endOfWeek.getTime() - now.getTime());
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    return { days, hours };
  },

  // Registrar que un usuario leyó/completó una materia en Cursos (+60 Puntos de Liga)
  recordTheoryRead(uid: string, theoryId: string): void {
    const key = `league_theories_read_${uid}`;
    const list = storageService.getItem<string[]>(key, []);
    if (!list.includes(theoryId)) {
      list.push(theoryId);
      storageService.setItem(key, list);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('prograpp_league_update'));
      }
    }
  },

  // Registrar que un usuario completó un quiz exprés de materias (+45 Puntos de Liga)
  recordQuizCompleted(uid: string, lessonId: string): void {
    const key = `league_quizzes_done_${uid}`;
    const list = storageService.getItem<string[]>(key, []);
    if (!list.includes(lessonId)) {
      list.push(lessonId);
      storageService.setItem(key, list);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('prograpp_league_update'));
      }
    }
  },

  // Obtener conteos de Cursos y Materias para un usuario
  getUserCoursesMerits(uid: string): { theoriesCount: number; quizzesCount: number } {
    const theories = storageService.getItem<string[]>(`league_theories_read_${uid}`, []);
    const quizzes = storageService.getItem<string[]>(`league_quizzes_done_${uid}`, []);
    return {
      theoriesCount: theories.length,
      quizzesCount: quizzes.length
    };
  },

  // Calcular la tabla completa de la Liga Semanal
  async getLeaderboard(currentUser: UserProfile): Promise<LeagueLeaderboardData> {
    const weekNumber = this.getCurrentWeekNumber();
    const year = new Date().getFullYear();
    const { days, hours } = this.getTimeRemaining();

    // 1. Obtener lista de todos los estudiantes registrados
    let students = await userService.getAllStudents();
    if (!students || students.length === 0) {
      students = [currentUser];
    } else if (!students.some(s => s.uid === currentUser.uid)) {
      students.unshift(currentUser);
    }

    // 2. Obtener intentos académicos para calcular la precisión (quien falla menos)
    let attempts = await academicService.getAllAttempts(students);
    if (!attempts) attempts = [];

    // Mapear estadísticas por estudiante
    const attemptsByStudent = new Map<string, { total: number; correct: number }>();
    attempts.forEach(att => {
      const cur = attemptsByStudent.get(att.studentId) || { total: 0, correct: 0 };
      cur.total += 1;
      if (att.status === 'correct') {
        cur.correct += 1;
      }
      attemptsByStudent.set(att.studentId, cur);
    });

    // 3. Posiciones históricas guardadas para calcular tendencias (▲ / ▼)
    const prevKey = `league_snapshot_${year}_w${weekNumber}`;
    const previousPositions = storageService.getItem<Record<string, number>>(prevKey, {});

    // 4. Calcular puntajes para cada estudiante
    const entries: LeagueStudentEntry[] = students.map(st => {
      const merits = this.getUserCoursesMerits(st.uid);
      const isCurrent = st.uid === currentUser.uid;

      // Usar datos reales del usuario actual si corresponde
      const weeklyXp = isCurrent ? (currentUser.weeklyXp || 120) : (st.weeklyXp || 60);
      const streakDays = isCurrent ? (currentUser.streak?.count || 1) : (st.streak?.count || 1);
      const activeMinutes = Math.floor((st.totalActiveTimeSeconds || 600) / 60);

      const attData = attemptsByStudent.get(st.uid);
      let accuracyRate = 92; // Tasa base estimulante
      let totalAttempts = 15;
      let totalCorrect = 14;

      if (attData && attData.total > 0) {
        totalAttempts = attData.total;
        totalCorrect = attData.correct;
        accuracyRate = Math.round((totalCorrect / totalAttempts) * 100);
      }

      // ═══ SISTEMA DE PUNTUACIÓN DE LIGA ═══
      // 1. Base semanal por XP
      let points = weeklyXp;

      // 2. Bono de Precisión (Quien falla menos gana más puntos)
      let precisionBonus = 0;
      if (accuracyRate >= 95) {
        precisionBonus = 200; // Francotirador de Código
      } else if (accuracyRate >= 90) {
        precisionBonus = 150;
      } else if (accuracyRate >= 80) {
        precisionBonus = 90;
      } else if (accuracyRate >= 70) {
        precisionBonus = 50;
      }
      points += precisionBonus;

      // 3. Bono por Teoría de Cursos (+60 por cada materia leída y completada)
      const theoryBonus = merits.theoriesCount * 60;
      points += theoryBonus;

      // 4. Bono por Quizzes de Cursos (+45 por cada quiz superado)
      const quizBonus = merits.quizzesCount * 45;
      points += quizBonus;

      // 5. Bono de Racha Diaria (Constancia: 15 pts por día de racha activa)
      const streakBonus = streakDays * 15;
      points += streakBonus;

      // 6. Bono de Tiempo Activo en plataforma (máximo 100 pts)
      const timeBonus = Math.min(100, activeMinutes * 2);
      points += timeBonus;

      const isOnline = presenceService.isUserOnline(st);

      return {
        uid: st.uid,
        studentCode: st.studentCode || 'E01',
        displayName: st.displayName || 'Estudiante',
        avatarId: st.avatarId || 'robot_byte',
        equippedSkin: st.equippedSkin,
        currentLeague: st.currentLeague || 'bronze',
        totalLeaguePoints: points,
        weeklyXp,
        accuracyRate,
        totalAttempts,
        totalCorrect,
        theoriesReadCount: merits.theoriesCount,
        quizzesCompletedCount: merits.quizzesCount,
        streakDays,
        totalActiveTimeMinutes: activeMinutes,
        position: 0,
        trend: 'same',
        isOnline,
        group: st.group || 'Grupo A'
      };
    });

    // 5. Ordenar descendentemente por Puntos de Liga
    entries.sort((a, b) => {
      if (b.totalLeaguePoints !== a.totalLeaguePoints) {
        return b.totalLeaguePoints - a.totalLeaguePoints;
      }
      // Desempate: mayor precisión
      if (b.accuracyRate !== a.accuracyRate) {
        return b.accuracyRate - a.accuracyRate;
      }
      // Desempate: más materias leídas
      return b.theoriesReadCount - a.theoriesReadCount;
    });

    // 6. Asignar posiciones y calcular tendencias
    const newPositionsSnapshot: Record<string, number> = {};
    entries.forEach((entry, idx) => {
      const pos = idx + 1;
      entry.position = pos;
      newPositionsSnapshot[entry.uid] = pos;

      const prevPos = previousPositions[entry.uid];
      if (prevPos !== undefined) {
        entry.previousPosition = prevPos;
        if (pos < prevPos) {
          entry.trend = 'up';
        } else if (pos > prevPos) {
          entry.trend = 'down';
        } else {
          entry.trend = 'same';
        }
      } else {
        entry.trend = 'new';
      }
    });

    // Guardar snapshot de posiciones si aún no se había guardado
    if (Object.keys(previousPositions).length === 0) {
      storageService.setItem(prevKey, newPositionsSnapshot);
    }

    const tier = currentUser.currentLeague || 'bronze';
    const tierMeta = LEAGUE_TIER_META[tier] || LEAGUE_TIER_META.bronze;
    const currentUserEntry = entries.find(e => e.uid === currentUser.uid);

    return {
      tier,
      tierName: tierMeta.name,
      tierColor: tierMeta.color,
      tierBorder: tierMeta.border,
      weekNumber,
      year,
      daysRemaining: days,
      hoursRemaining: hours,
      entries,
      currentUserEntry,
      totalParticipants: entries.length
    };
  }
};
