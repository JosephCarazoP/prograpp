import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { UserProfile, UserActivityStatus, UserPresenceStatus } from '../types/user';
import { userService, sanitizeUserProfile } from './userService';
import { storageService } from './storageService';

// Umbral de tiempo para considerar a un usuario en línea (5 minutos)
// Permite que estudiantes leyendo, pensando o escribiendo código sigan en línea sin desconectarse prematuramente
export const ONLINE_THRESHOLD_MS = 5 * 60 * 1000;

export const presenceService = {
  // Enviar latido de presencia y actividad actual
  async reportActivity(
    uid: string,
    activity: UserActivityStatus
  ): Promise<void> {
    if (!uid || uid === 'guest_user_1') return;

    const now = Date.now();
    const payload = {
      isOnline: true,
      lastActiveAt: now,
      currentActivity: {
        ...activity,
        updatedAt: now
      }
    };

    // Actualización local para persistencia instantánea y modo offline
    try {
      storageService.setItem('user_presence_latest', payload);
    } catch {}

    if (!isLocalMockMode && db) {
      try {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, payload, { merge: true });
      } catch (err) {
        console.warn('[presenceService] Fallo al guardar latido en Firestore:', err);
      }
    }
  },

  // Marcar desconexión explícita (al cerrar sesión)
  async setOffline(uid: string): Promise<void> {
    if (!uid || uid === 'guest_user_1') return;

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
        await setDoc(userRef, payload, { merge: true });
      } catch (err) {
        // Ignorar error al cerrar
      }
    }
  },

  // Comprobar si un usuario está en línea según su última actividad
  isUserOnline(user: Partial<UserProfile>): boolean {
    if (!user) return false;

    const now = Date.now();
    const lastActive = typeof user.lastActiveAt === 'number' ? user.lastActiveAt : 0;
    const activityUpdated = typeof user.currentActivity?.updatedAt === 'number' ? user.currentActivity.updatedAt : 0;
    const mostRecent = Math.max(lastActive, activityUpdated);

    // Si explícitamente se cerró sesión
    if (user.isOnline === false) {
      // Si su desconexión fue reciente y no hay latidos nuevos posteriores, está desconectado
      const diffMs = now - mostRecent;
      if (diffMs > 60000 || mostRecent <= 0) {
        return false;
      }
    }

    if (mostRecent <= 0) return false;

    // Está activo si su última señal de vida (latido, reto, avance o tiempo activo) fue dentro de 5 minutos
    return (now - mostRecent) <= ONLINE_THRESHOLD_MS;
  },

  // Obtener la actividad formateada de un usuario (con inferencia inteligente si viene de versión previa)
  getUserActivityInfo(user: UserProfile): {
    status: UserPresenceStatus;
    activityText: string;
    badgeColor: string;
    badgeBg: string;
    isOnline: boolean;
  } {
    const isOnline = this.isUserOnline(user);

    if (!isOnline) {
      return {
        status: 'offline',
        activityText: `Desconectado (${this.formatTimeAgo(user.lastActiveAt)})`,
        badgeColor: '#64748B',
        badgeBg: '#F1F5F9',
        isOnline: false
      };
    }

    // Si tiene actividad explícita enviada por el nuevo latido
    if (user.currentActivity?.activityText) {
      const act = user.currentActivity;
      let badgeColor = '#10B981';
      let badgeBg = '#ECFDF5';

      if (act.status === 'lesson') {
        badgeColor = '#059669';
        badgeBg = '#D1FAE5';
      } else if (act.status === 'theory') {
        badgeColor = '#2563EB';
        badgeBg = '#DBEAFE';
      } else if (act.status === 'boss') {
        badgeColor = '#DC2626';
        badgeBg = '#FEE2E2';
      } else if (act.status === 'practice') {
        badgeColor = '#7C3AED';
        badgeBg = '#EDE9FE';
      } else if (act.status === 'evaluation') {
        badgeColor = '#D97706';
        badgeBg = '#FEF3C7';
      }

      return {
        status: act.status,
        activityText: act.activityText,
        badgeColor,
        badgeBg,
        isOnline: true
      };
    }

    // Inferencia para alumnos activos en el laboratorio cuya pestaña aún no ha reportado activityText
    const pathName = user.currentPath === 'sql' ? 'SQL' : 'Kotlin';
    return {
      status: 'playing',
      activityText: `Activo en la Plataforma • Ruta ${pathName}`,
      badgeColor: '#10B981',
      badgeBg: '#ECFDF5',
      isOnline: true
    };
  },

  // Obtener tiempo transcurrido legible desde la última actividad
  formatTimeAgo(timestamp?: number): string {
    if (!timestamp || timestamp <= 0) return 'Sin actividad registrada';
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

  // Suscripción en tiempo real a todos los estudiantes registrados con polling de seguridad
  subscribeToAllStudents(
    onUpdate: (students: UserProfile[]) => void
  ): () => void {
    let isSubscribed = true;

    // Función directa para obtener la lista más fresca
    const fetchDirect = async () => {
      try {
        const list = await userService.getAllStudents();
        if (isSubscribed) {
          onUpdate(list);
        }
      } catch (err) {
        console.warn('[presenceService] Error en polling de usuarios:', err);
      }
    };

    // 1. Carga inmediata inicial
    fetchDirect();

    // 2. Suscripción en tiempo real vía snapshot
    let unsubscribeFirestore: (() => void) | null = null;
    if (!isLocalMockMode && db) {
      try {
        const usersCol = collection(db, 'users');
        unsubscribeFirestore = onSnapshot(
          usersCol,
          (snapshot) => {
            if (!isSubscribed) return;
            const list: UserProfile[] = [];
            snapshot.forEach((docSnap) => {
              list.push(sanitizeUserProfile(docSnap.data(), docSnap.id));
            });
            onUpdate(list);
          },
          (err) => {
            console.warn('[presenceService] Fallo snapshot, respaldado por polling:', err);
            fetchDirect();
          }
        );
      } catch (err) {
        console.warn('[presenceService] Error al inicializar listener:', err);
      }
    }

    // 3. Polling constante cada 10 segundos para garantizar frescura absoluta en el laboratorio
    const interval = setInterval(fetchDirect, 10000);

    return () => {
      isSubscribed = false;
      if (unsubscribeFirestore) unsubscribeFirestore();
      clearInterval(interval);
    };
  }
};
