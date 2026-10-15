import { Unit, Lesson } from '../types/lesson';
import { UserProfile, UserPowerUps } from '../types/user';
import { LessonProgress } from '../types/progress';

export type TrackNodeType = 'lesson' | 'chest' | 'boss';

export interface ProgressionChestRewards {
  bytes: number;
  xp: number;
  batteries?: number;
  powerups: Partial<UserPowerUps>;
}

export interface TrackNode {
  id: string; // ej: 'kotlin-u01-l01', 'kotlin-u01-c01', 'kotlin-u01-boss'
  type: TrackNodeType;
  title: string;
  subtitle: string;
  unitId: number;
  indexInTrack: number; // 0-indexed
  lesson?: Lesson;
  chestRewards?: ProgressionChestRewards;
  bossName?: string;
}

export const progressionEngine = {
  /**
   * Construye el camino secuencial oficial para una unidad determinada.
   * Estructura lineal gamificada:
   * Nivel 1 → Nivel 2 → Cofre 1 → Nivel 3 → Nivel 4 → Nivel 5 → Cofre 2 → ... → Jefe de Unidad
   */
  getUnitTrack(unit: Unit, pathId: 'kotlin' | 'sql'): TrackNode[] {
    const track: TrackNode[] = [];
    const lessons = unit.lessons || [];

    let nodeIndex = 0;

    lessons.forEach((lesson, lIdx) => {
      // 1. Agregar nodo de lección
      track.push({
        id: lesson.id,
        type: 'lesson',
        title: lesson.title,
        subtitle: `Lección ${lIdx + 1}`,
        unitId: unit.id,
        indexInTrack: nodeIndex++,
        lesson
      });

      // 2. Intercalar Cofre tras nivel 2 (índice 1) y cada 4 niveles adicionales
      if (lIdx === 1 || (lIdx > 1 && (lIdx + 1) % 4 === 0 && lIdx < lessons.length - 1)) {
        const chestNumber = lIdx === 1 ? 1 : Math.floor((lIdx + 1) / 4) + 1;
        const chestId = `${pathId}-u0${unit.id}-chest-0${chestNumber}`;
        
        track.push({
          id: chestId,
          type: 'chest',
          title: `Cofre de Aventurero ${chestNumber}`,
          subtitle: 'Recompensas tácticas y comodines',
          unitId: unit.id,
          indexInTrack: nodeIndex++,
          chestRewards: {
            bytes: 40,
            xp: 30,
            powerups: {
              teacherHint: chestNumber === 1 ? 2 : 1,
              eliminateOptions: 1,
              secondChance: chestNumber % 2 === 0 ? 1 : 0,
              codePeek: 1
            }
          }
        });
      }
    });

    // 3. Jefe de Unidad al final del track (solo si la unidad tiene lecciones)
    if (lessons.length > 0) {
      const bossId = `${pathId}-u0${unit.id}-boss`;
      const bossName =
        unit.id === 1
          ? (pathId === 'kotlin' ? 'Bugzilla el Desbordador' : 'Inyector de Sintaxis Corrupta')
          : unit.id === 2
          ? (pathId === 'kotlin' ? 'NullPointer Titán' : 'Bloqueador de Transacciones ACID')
          : (pathId === 'kotlin' ? 'Asincronía Desfasada' : 'Optimizador Caótico');

      track.push({
        id: bossId,
        type: 'boss',
        title: `Jefe: ${bossName}`,
        subtitle: `Prueba Final de la Unidad ${unit.id}`,
        unitId: unit.id,
        indexInTrack: nodeIndex++,
        bossName
      });
    }

    return track;
  },

  /**
   * Comprueba si un nodo específico ha sido completado.
   */
  isNodeCompleted(node: TrackNode, user: UserProfile, progress: Record<string, LessonProgress>): boolean {
    if (node.type === 'lesson') {
      const p = progress[node.id];
      return !!p && (p.starsEarned || 0) > 0;
    }
    if (node.type === 'chest') {
      return (user.openedChests || []).includes(node.id);
    }
    if (node.type === 'boss') {
      return (user.defeatedBosses || []).includes(node.id);
    }
    return false;
  },

  /**
   * Determina si la Unidad completa está desbloqueada.
   * Unidad 1 siempre está desbloqueada.
   * Unidades superiores requieren haber derrotado al Jefe de la unidad inmediatamente anterior.
   */
  isUnitUnlocked(unitId: number, pathId: 'kotlin' | 'sql', user: UserProfile): boolean {
    if (unitId === 1) return true;
    const previousBossId = `${pathId}-u0${unitId - 1}-boss`;
    return (user.defeatedBosses || []).includes(previousBossId);
  },

  /**
   * Regla de Desbloqueo Secuencial Estricto:
   * 1. Las lecciones se desbloquean al completar la lección previa (los cofres no bloquean lecciones).
   * 2. REGLA DE COFRE: Un cofre entre A y B se desbloquea una vez que el usuario alcanza o supera B ("cuando estoy en B").
   * 3. El jefe se desbloquea cuando todas las lecciones de la unidad están completadas.
   */
  isNodeUnlocked(
    node: TrackNode,
    track: TrackNode[],
    user: UserProfile,
    progress: Record<string, LessonProgress>
  ): boolean {
    if (!this.isUnitUnlocked(node.unitId, user.currentPath, user)) {
      return false;
    }

    // Caso 1: Nodos de Lección
    if (node.type === 'lesson') {
      const prevLesson = track
        .slice(0, node.indexInTrack)
        .reverse()
        .find(n => n.type === 'lesson');

      // Si es la primera lección de la unidad
      if (!prevLesson) {
        return this.isUnitUnlocked(node.unitId, user.currentPath, user);
      }

      return this.isNodeCompleted(prevLesson, user, progress);
    }

    // Caso 2: Nodos de Cofre
    // "Los cofres deben abrirse hasta que uno pase por ellos. Es decir si hay un cofre entre A y B, debe poder abrirse cuando estoy en B."
    if (node.type === 'chest') {
      const nextNode = track[node.indexInTrack + 1];
      if (nextNode) {
        // Se puede abrir cuando el estudiante ha alcanzado B (B está desbloqueado) o ya completó B
        return this.isNodeUnlocked(nextNode, track, user, progress) || this.isNodeCompleted(nextNode, user, progress);
      }
      // Fallback si no hubiera nodo posterior: verificar el anterior
      const previousNode = track[node.indexInTrack - 1];
      return previousNode ? this.isNodeCompleted(previousNode, user, progress) : false;
    }

    // Caso 3: Jefe de Unidad
    if (node.type === 'boss') {
      const lessonsInUnit = track.filter(n => n.type === 'lesson');
      return lessonsInUnit.length > 0 && lessonsInUnit.every(l => this.isNodeCompleted(l, user, progress));
    }

    return false;
  },

  /**
   * Control del Sistema de Acceso:
   * Valida en lógica de negocio si el usuario tiene permiso para iniciar una lección, cofre o jefe.
   */
  canAccessNode(
    nodeId: string,
    unit: Unit,
    user: UserProfile,
    progress: Record<string, LessonProgress>
  ): { allowed: boolean; reason?: string; previousNodeTitle?: string } {
    const track = this.getUnitTrack(unit, user.currentPath);
    const node = track.find(n => n.id === nodeId);

    if (!node) {
      return { allowed: false, reason: 'El elemento solicitado no existe en la ruta de aprendizaje.' };
    }

    if (!this.isUnitUnlocked(node.unitId, user.currentPath, user)) {
      return {
        allowed: false,
        reason: `Debes vencer al Jefe de la Unidad ${node.unitId - 1} antes de ingresar a los contenidos de la Unidad ${node.unitId}.`
      };
    }

    if (this.isNodeUnlocked(node, track, user, progress)) {
      return { allowed: true };
    }

    if (node.type === 'chest') {
      const nextNode = track[node.indexInTrack + 1];
      const nextTitle = nextNode ? nextNode.title : 'el siguiente nivel';
      return {
        allowed: false,
        reason: `Cofre en el camino: Debes avanzar y alcanzar "${nextTitle}" para poder abrir este cofre.`
      };
    }

    if (node.type === 'boss') {
      return {
        allowed: false,
        reason: 'Debes superar todas las lecciones de la unidad antes de enfrentar al Jefe.'
      };
    }

    const prevLesson = track
      .slice(0, node.indexInTrack)
      .reverse()
      .find(n => n.type === 'lesson');
    const prevTitle = prevLesson ? prevLesson.title : 'el nivel anterior';

    return {
      allowed: false,
      reason: `Progresión bloqueada: Debes completar primero "${prevTitle}" en orden secuencial para continuar.`,
      previousNodeTitle: prevTitle
    };
  }
};
