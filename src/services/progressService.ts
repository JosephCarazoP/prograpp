import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { LessonProgress, PathProgressSummary } from '../types/progress';
import { LearningPath } from '../types/user';
import { storageService } from './storageService';

export const progressService = {
  // Obtener todo el progreso del usuario
  async getAllProgress(uid: string = 'guest_user_1'): Promise<Record<string, LessonProgress>> {
    const local = storageService.getItem<Record<string, LessonProgress>>('user_progress', {});

    if (!isLocalMockMode && db) {
      try {
        const progressCol = collection(db, 'users', uid, 'progress');
        const snapshot = await Promise.race([
          getDocs(progressCol),
          new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 1800))
        ]);
        if (snapshot) {
          const remote: Record<string, LessonProgress> = {};
          snapshot.forEach(docSnap => {
            remote[docSnap.id] = docSnap.data() as LessonProgress;
          });
          if (Object.keys(remote).length > 0) {
            storageService.setItem('user_progress', remote);
            return remote;
          }
        }
      } catch (err) {
        console.warn('[progressService] Usando progreso local:', err);
      }
    }

    return local;
  },

  // Guardar lección completada con sus estrellas
  async saveLessonProgress(uid: string, progress: LessonProgress): Promise<void> {
    const current = await this.getAllProgress(uid);
    const existing = current[progress.lessonId];

    // Mantener la mejor cantidad de estrellas logradas
    const starsEarned = existing ? Math.max(existing.starsEarned, progress.starsEarned) as 1 | 2 | 3 : progress.starsEarned;

    const merged: LessonProgress = {
      ...progress,
      starsEarned,
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
