import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { LessonProgress, PathProgressSummary } from '../types/progress';
import { LearningPath } from '../types/user';
import { storageService } from './storageService';

export const progressService = {
  // Obtener todo el progreso del usuario
  async getAllProgress(uid: string = 'guest_user_1'): Promise<Record<string, LessonProgress>> {
    const local = storageService.getItem<Record<string, LessonProgress>>('user_progress', {}) || {};

    if (!isLocalMockMode && db) {
      try {
        const progressCol = collection(db, 'users', uid, 'progress');
        const snapshot = await Promise.race([
          getDocs(progressCol),
          new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 1800))
        ]);
        if (snapshot && !snapshot.empty) {
          const remote: Record<string, LessonProgress> = {};
          snapshot.forEach(docSnap => {
            remote[docSnap.id] = docSnap.data() as LessonProgress;
          });

          // Fusión bidireccional: preservar el progreso local más reciente y no sobrescribir con snapshot desactualizado
          const merged: Record<string, LessonProgress> = { ...local };
          for (const [id, rProg] of Object.entries(remote)) {
            const lProg = merged[id];
            if (!lProg) {
              merged[id] = rProg;
            } else {
              merged[id] = {
                ...lProg,
                ...rProg,
                starsEarned: Math.max(lProg.starsEarned || 0, rProg.starsEarned || 0) as 1 | 2 | 3,
                completedAt: Math.max(lProg.completedAt || 0, rProg.completedAt || 0),
                theoryCompleted: Boolean(lProg.theoryCompleted || rProg.theoryCompleted),
                theoryCompletedAt: Math.max(lProg.theoryCompletedAt || 0, rProg.theoryCompletedAt || 0)
              };
            }
          }
          storageService.setItem('user_progress', merged);
          return merged;
        }
      } catch (err) {
        console.warn('[progressService] Usando progreso local:', err);
      }
    }

    return local;
  },

  // Guardar lección completada con sus estrellas y retornar progreso actualizado inmediatamente
  async saveLessonProgress(uid: string, progress: LessonProgress): Promise<Record<string, LessonProgress>> {
    const current = storageService.getItem<Record<string, LessonProgress>>('user_progress', {}) || {};
    const existing = current[progress.lessonId];

    // Mantener la mejor cantidad de estrellas logradas
    const starsEarned = existing ? Math.max(existing.starsEarned || 0, progress.starsEarned || 1) as 1 | 2 | 3 : progress.starsEarned;

    const merged: LessonProgress = {
      ...(existing || {}),
      ...progress,
      starsEarned,
      completedAt: progress.completedAt || Date.now(),
      lastReviewedAt: Date.now()
    };

    current[progress.lessonId] = merged;
    storageService.setItem('user_progress', current);

    if (!isLocalMockMode && db) {
      try {
        const lessonRef = doc(db, 'users', uid, 'progress', progress.lessonId);
        await setDoc(lessonRef, merged, { merge: true });
      } catch (err) {
        console.warn('[progressService] Guardado en cola local:', err);
      }
    }

    return current;
  },

  // Registrar materia teórica/micro-quiz completado para habilitar la práctica del nivel
  async saveTheoryCompleted(
    uid: string,
    lessonId: string,
    pathId: LearningPath,
    unitId: number,
    levelId: number
  ): Promise<Record<string, LessonProgress>> {
    const current = storageService.getItem<Record<string, LessonProgress>>('user_progress', {}) || {};
    const existing = current[lessonId];

    const updated: LessonProgress = {
      ...(existing || {}),
      lessonId,
      pathId,
      unitId,
      levelId,
      starsEarned: (existing?.starsEarned || 0) as 1 | 2 | 3,
      completedAt: existing?.completedAt || 0,
      attempts: existing?.attempts || 0,
      mistakesCount: existing?.mistakesCount || 0,
      scorePercentage: existing?.scorePercentage || 0,
      lastReviewedAt: Date.now(),
      theoryCompleted: true,
      theoryCompletedAt: Date.now()
    };

    current[lessonId] = updated;
    storageService.setItem('user_progress', current);

    if (!isLocalMockMode && db) {
      try {
        const lessonRef = doc(db, 'users', uid, 'progress', lessonId);
        await setDoc(lessonRef, { theoryCompleted: true, theoryCompletedAt: Date.now() }, { merge: true });
      } catch (err) {
        console.warn('[progressService] Guardado de teoría local:', err);
      }
    }

    return current;
  },

  // Calcular resumen estadístico de la ruta
  calculatePathSummary(
    path: LearningPath,
    progressMap: Record<string, LessonProgress>,
    totalLessonsInPath: number = 24
  ): PathProgressSummary {
    const completedInPath = Object.values(progressMap).filter(p => p.pathId === path);
    const totalStars = completedInPath.reduce((acc, curr) => acc + curr.starsEarned, 0);
    const count = completedInPath.length;
    const percentage = Math.min(100, Math.round((count / totalLessonsInPath) * 100));

    return {
      pathId: path,
      totalUnits: path === 'kotlin' ? 10 : 8,
      completedLessons: count,
      totalLessons: totalLessonsInPath,
      percentage,
      totalStars
    };
  }
};
