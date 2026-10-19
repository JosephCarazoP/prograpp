import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  arrayUnion,
  updateDoc
} from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { AppNotification, NotificationTemplate, NotificationType } from '../types/notification';
import { UserProfile } from '../types/user';
import { storageService } from './storageService';

export const PRELOADED_NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
  {
    id: 'tpl_update_general',
    title: 'Nueva actualización en la plataforma',
    message: 'Hemos actualizado la plataforma con nuevos retos, mejoras visuales y mayor rendimiento. ¡Entra a seguir aprendiendo!',
    type: 'update',
    description: 'Avisar a todos los alumnos sobre novedades o mejoras de la app'
  },
  {
    id: 'tpl_observation_review',
    title: 'Nueva observación de tu profesor',
    message: 'Tu profesor te ha enviado una nueva observación pedagógica sobre tus avances y desempeño en clase. ¡Revisa los detalles!',
    type: 'observation',
    description: 'Notificar al alumno que tiene una observación docente'
  },
  {
    id: 'tpl_streak_reminder',
    title: '¡No pierdas tu racha diaria!',
    message: 'Recuerda que la constancia es la clave para programar. Completa al menos un reto hoy para mantener tu racha encendida.',
    type: 'reminder',
    description: 'Recordatorio para que los alumnos no pierdan su racha'
  },
  {
    id: 'tpl_diagnostic_pending',
    title: 'Prueba diagnóstica pendiente',
    message: 'Tienes un diagnóstico obligatorio asignado por tu profesor. Por favor ingrésalo y complétalo para registrar tu avance.',
    type: 'assignment',
    description: 'Aviso urgente de diagnóstico o evaluación asignada'
  },
  {
    id: 'tpl_cheer_progress',
    title: '¡Felicitaciones por tu gran esfuerzo!',
    message: '¡Excelente progreso! Tu dedicación y precisión resolviendo ejercicios están dando grandes resultados. ¡Sigue así!',
    type: 'cheer',
    description: 'Mensaje de felicitación y motivación para el estudiante'
  },
  {
    id: 'tpl_review_unit',
    title: 'Repaso recomendado antes de avanzar',
    message: 'Te recomendamos repasar la teoría y ejercicios de la última unidad antes de comenzar los nuevos retos prácticos.',
    type: 'reminder',
    description: 'Recomendación pedagógica para afianzar conocimientos'
  }
];

export const notificationService = {
  // Obtener plantillas precargadas
  getPreloadedTemplates(): NotificationTemplate[] {
    return PRELOADED_NOTIFICATION_TEMPLATES;
  },

  // Enviar una nueva notificación (Docente / Sistema)
  async sendNotification(
    data: {
      title: string;
      message: string;
      type: NotificationType;
      targetType: 'all' | 'specific' | 'group';
      targetUid?: string;
      targetGroup?: string;
      sender?: string;
    }
  ): Promise<AppNotification> {
    const notifId = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newNotif: AppNotification = {
      id: notifId,
      title: data.title.trim(),
      message: data.message.trim(),
      type: data.type,
      targetType: data.targetType,
      targetUid: data.targetUid || '',
      targetGroup: data.targetGroup || '',
      sender: data.sender || 'Profesor',
      createdAt: Date.now(),
      readBy: []
    };

    // Guardar en caché local
    const local = storageService.getItem<AppNotification[]>('app_notifications_all', []);
    local.unshift(newNotif);
    storageService.setItem('app_notifications_all', local);

    // Guardar en Firestore
    if (!isLocalMockMode && db) {
      try {
        const notifRef = doc(db, 'notifications', notifId);
        await setDoc(notifRef, newNotif);
      } catch (err) {
        console.warn('[notificationService] Guardado en cola local:', err);
      }
    }

    return newNotif;
  },

  // Obtener todas las notificaciones recibidas para un estudiante
  async getNotificationsForUser(user: UserProfile): Promise<AppNotification[]> {
    let allNotifications: AppNotification[] = [];

    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'notifications');
        const q = query(col, orderBy('createdAt', 'desc'));
        const snap = await Promise.race([
          getDocs(q),
          new Promise<null>((_, reject) => setTimeout(() => reject(new Error('timeout')), 2500))
        ]);

        if (snap) {
          const remote: AppNotification[] = [];
          snap.forEach(d => {
            const item = d.data() as AppNotification;
            remote.push({ ...item, id: d.id });
          });
          if (remote.length > 0) {
            storageService.setItem('app_notifications_all', remote);
            allNotifications = remote;
          }
        }
      } catch (err) {
        console.warn('[notificationService] Usando notificaciones locales por red:', err);
      }
    }

    if (allNotifications.length === 0) {
      allNotifications = storageService.getItem<AppNotification[]>('app_notifications_all', []);
    }

    // Filtrar para el usuario:
    // targetType === 'all' O targetUid === user.uid O (targetType === 'group' && targetGroup === user.group)
    const userNotifs = allNotifications.filter(n => {
      if (n.targetType === 'all') return true;
      if (n.targetType === 'specific' && n.targetUid === user.uid) return true;
      if (n.targetType === 'group' && n.targetGroup && n.targetGroup === (user.group || 'Grupo A')) return true;
      return false;
    });

    return userNotifs.sort((a, b) => b.createdAt - a.createdAt);
  },

  // Obtener todas las notificaciones del sistema (Solo Administrador)
  async getAllNotifications(): Promise<AppNotification[]> {
    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'notifications');
        const q = query(col, orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const remote: AppNotification[] = [];
        snap.forEach(d => {
          remote.push({ ...(d.data() as AppNotification), id: d.id });
        });
        if (remote.length > 0) {
          storageService.setItem('app_notifications_all', remote);
          return remote;
        }
      } catch (err) {
        console.warn('[notificationService] Error al obtener todas las notificaciones:', err);
      }
    }
    return storageService.getItem<AppNotification[]>('app_notifications_all', []);
  },

  // Marcar una notificación como leída por un usuario
  async markAsRead(notificationId: string, uid: string): Promise<void> {
    const local = storageService.getItem<AppNotification[]>('app_notifications_all', []);
    const idx = local.findIndex(n => n.id === notificationId);
    if (idx >= 0 && !local[idx].readBy.includes(uid)) {
      local[idx].readBy.push(uid);
      storageService.setItem('app_notifications_all', local);
    }

    if (!isLocalMockMode && db) {
      try {
        const notifRef = doc(db, 'notifications', notificationId);
        await updateDoc(notifRef, {
          readBy: arrayUnion(uid)
        });
      } catch (err) {
        console.warn('[notificationService] Error al actualizar estado de lectura:', err);
      }
    }
  },

  // Marcar todas como leídas
  async markAllAsRead(arg1: AppNotification[] | string, arg2?: string): Promise<void> {
    let notifs: AppNotification[] = [];
    let uid = '';

    if (Array.isArray(arg1)) {
      notifs = arg1;
      uid = arg2 || '';
    } else {
      uid = arg1;
      notifs = storageService.getItem<AppNotification[]>('app_notifications_all', []);
    }

    if (!uid) return;

    await Promise.all(
      notifs
        .filter(n => !n.readBy.includes(uid))
        .map(n => this.markAsRead(n.id, uid))
    );
  },

  // Eliminar una notificación
  async deleteNotification(notificationId: string): Promise<void> {
    const local = storageService.getItem<AppNotification[]>('app_notifications_all', []);
    const updated = local.filter(n => n.id !== notificationId);
    storageService.setItem('app_notifications_all', updated);

    if (!isLocalMockMode && db) {
      try {
        const notifRef = doc(db, 'notifications', notificationId);
        await deleteDoc(notifRef);
      } catch (err) {
        console.warn('[notificationService] Error al eliminar notificación:', err);
      }
    }
  }
};
