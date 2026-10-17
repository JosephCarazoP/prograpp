import { doc, updateDoc, collection, onSnapshot } from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { UserProfile, UserActivityStatus } from '../types/user';
import { userService, sanitizeUserProfile } from './userService';
import { storageService } from './storageService';

// Umbral de tiempo para considerar a un usuario en línea (2 minutos y medio)
export const ONLINE_THRESHOLD_MS = 150000;

export const presenceService = {
  // Enviar latido de presencia y actividad actual
  async reportActivity(
    uid: string,
    activity: UserActivityStatus
  ): Promise<void> {
    if (!uid) return;

    const payload = {
      isOnline: true,
      lastActiveAt: Date.now(),
      currentActivity: {
        ...activity,
        updatedAt: Date.now()
      }
    };

    // Actualización local para persistencia instantánea y modo offline
    try {
      storageService.setItem('user_presence_latest', payload);
    } catch {}

    if (!isLocalMockMode && db) {
      try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, payload);
      } catch (err) {
        // Silencioso para no interrumpir la experiencia si la red parpadea
        // console.debug('[presenceService] Latido guardado localmente:', err);
      }
    }
  },

  // Marcar desconexión explícita (al cerrar sesión o salir)
  async setOffline(uid: string): Promise<void> {
    if (!uid) return;

    const payload = {
      isOnline: false,
      lastActiveAt: Date.now()
    };

    try {
      storageService.setItem('user_presence_latest', payload);
    } catch {}

    if (!isLocalMockMode && db) {
      try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, payload);
      } catch (err) {
        // Ignorar error al cerrar
      }
    }
  },

  // Comprobar si un usuario está en línea según su última actividad
  isUserOnline(user: Partial<UserProfile>): boolean {
    if (!user) return false;
    if (user.isOnline === false) return false;
    if (typeof user.lastActiveAt !== 'number') return false;
    return Date.now() - user.lastActiveAt <= ONLINE_THRESHOLD_MS;
  },

  // Obtener tiempo transcurrido legible desde la última actividad
  formatTimeAgo(timestamp?: number): string {
    if (!timestamp) return 'Desconocido';
    const diffMs = Date.now() - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) return 'Hace unos momentos';
    if (diffMin === 1) return 'Hace 1 minuto';
    if (diffMin < 60) return `Hace ${diffMin} minutos`;
    if (diffHours === 1) return 'Hace 1 hora';
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  },

  // Suscripción en tiempo real a todos los estudiantes registrados
  subscribeToAllStudents(
    onUpdate: (students: UserProfile[]) => void
  ): () => void {
    if (!isLocalMockMode && db) {
      try {
        const usersCol = collection(db, 'users');
        const unsubscribe = onSnapshot(
          usersCol,
          (snapshot) => {
            const list: UserProfile[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              // Usar el método oficial para que nombres, códigos y avatar sean consistentes
              list.push(sanitizeUserProfile(data, docSnap.id));
            });
            onUpdate(list);
          },
          (err) => {
            console.warn('[presenceService] Fallo snapshot, usando carga bajo demanda:', err);
            userService.getAllStudents().then(onUpdate);
          }
        );
        return unsubscribe;
      } catch (err) {
        console.warn('[presenceService] Error al suscribirse a Firestore:', err);
      }
    }

    // Fallback local bajo demanda
    userService.getAllStudents().then(onUpdate);
    const interval = setInterval(() => {
      userService.getAllStudents().then(onUpdate);
    }, 15000);

    return () => clearInterval(interval);
  }
};
