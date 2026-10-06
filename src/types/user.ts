export type LearningPath = 'kotlin' | 'sql';

export type LeagueTier = 'bronze' | 'silver' | 'gold' | 'sapphire' | 'diamond' | 'master';

export interface UserStreak {
  count: number;
  lastActivityDate: string; // Formato YYYY-MM-DD
  freezeEquipped: boolean; // Protector de racha
}

export interface UserPowerUps {
  teacherHint: number;      // Ayuda del profesor: pista pedagógica
  eliminateOptions: number; // 50/50: descarta 2 opciones erróneas
  secondChance: number;     // Segunda oportunidad: escudo ante fallos
  codePeek: number;         // Pista de código: resalta sintaxis clave
}

export interface UserProfile {
  uid: string;
  displayName: string;
  avatarId: string;
  currentPath: LearningPath;
  currentThemeId: string; // ej. 'theme_default', 'theme_dracula', 'theme_monokai'
  totalXp: number;
  bytes: number; // Moneda virtual del juego (gemas de código)
  batteries: number; // Energía / Vidas (0 a 5)
  maxBatteries: number; // 5
  lastBatteryRechargeAt: number; // Timestamp en ms
  streak: UserStreak;
  currentLeague: LeagueTier;
  weeklyXp: number;
  shareEnabled: boolean;
  powerups: UserPowerUps; // Comodines para retos y combates
  openedChests: string[]; // IDs de cofres abiertos permanentemente
  defeatedBosses: string[]; // IDs de jefes vencidos permanentemente
  createdAt: number;
  email?: string;
  firstName?: string; // Nombre(s) del estudiante
  firstLastName?: string; // Primer apellido
  secondLastName?: string; // Segundo apellido
  idNumber?: string; // Número de cédula o identificación
  studentCode?: string; // Código de estudiante único para investigación (ej. E01)
  group?: string; // Grupo al que pertenece
  isResearchParticipant?: boolean; // Solo asignado por el administrador
  hasCompletedInitialDiagnostic?: boolean; // Si ya completó la prueba diagnóstica inicial obligatoria
  totalActiveTimeSeconds?: number; // Tiempo activo total de aprendizaje
  lastActiveAt?: number;
}

