import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  arrayUnion,
  updateDoc,
  onSnapshot
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
  },
  {
    id: 'tpl_sql_tables_sample',
    title: 'Script SQL: Estructura de Tablas y Datos de Prueba',
    message: 'Estimados estudiantes, aquí les comparto el script SQL con la definición de tablas y registros iniciales para la práctica de hoy. Ábranlo en su base de datos creada en SQLite Lab.',
    type: 'script',
    description: 'Compartir script SQL para abrir en SQLite Lab',
    defaultCodeLanguage: 'sql',
    defaultCodeSnippet: `-- Creación de tablas de ejemplo para práctica
CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE,
  ciudad TEXT DEFAULT 'San José'
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER,
  monto REAL NOT NULL,
  fecha DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Registros de prueba
INSERT INTO clientes (nombre, email, ciudad) VALUES
  ('Ana Mora', 'ana@email.com', 'San José'),
  ('Carlos Ruiz', 'carlos@email.com', 'Heredia'),
  ('Elena Gómez', 'elena@email.com', 'Cartago');

INSERT INTO pedidos (cliente_id, monto) VALUES
  (1, 1450.00),
  (2, 320.50),
  (1, 890.00);

-- Consulta de verificación
SELECT 
  c.nombre AS Cliente,
  COUNT(p.id) AS Total_Pedidos,
  SUM(p.monto) AS Total_Gastado
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id;`
  },
  {
    id: 'tpl_kotlin_snippet',
    title: 'Fragmento de Código Kotlin para Análisis',
    message: 'Les comparto este ejemplo en Kotlin con funciones y estructuras de control para que revisen el flujo lógico y buenas prácticas.',
    type: 'script',
    description: 'Compartir código Kotlin para análisis',
    defaultCodeLanguage: 'kotlin',
    defaultCodeSnippet: `// Función para calcular bonificaciones según rendimiento
fun calcularBonificacion(puntos: Int, rachaDias: Int): Double {
    val factorBase = when {
        puntos >= 1000 -> 1.5
        puntos >= 500  -> 1.2
        else           -> 1.0
    }
    
    val bonoRacha = if (rachaDias >= 7) 50.0 else 10.0
    return (puntos * factorBase) + bonoRacha
}

fun main() {
    val estudiante = "Dev 01"
    val bono = calcularBonificacion(puntos = 650, rachaDias = 8)
    println("Estudiante: $estudiante | Bonificación total: $bono")
}`
  }
];

// Disparador de eventos en tiempo real para sincronización entre componentes
const NOTIF_EVENT_NAME = 'prograpp_notif_changed';
const emitNotifChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(NOTIF_EVENT_NAME));
  }
};

export const notificationService = {
  // Obtener plantillas precargadas
  getPreloadedTemplates(): NotificationTemplate[] {
    return PRELOADED_NOTIFICATION_TEMPLATES;
  },

  // Enviar una nueva notificación (Docente / Sistema)
  // Aparece INMEDIATAMENTE en tiempo real para los alumnos sin recargar
  async sendNotification(
    data: {
      title: string;
      message: string;
      type: NotificationType;
      targetType: 'all' | 'specific' | 'group';
      targetUid?: string;
      targetGroup?: string;
      sender?: string;
      codeSnippet?: string;
      codeLanguage?: 'sql' | 'kotlin' | 'text';
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
      readBy: [],
      dismissedBy: []
    };

    if (data.codeSnippet) {
      newNotif.codeSnippet = data.codeSnippet;
    }
    if (data.codeLanguage || data.type === 'script') {
      newNotif.codeLanguage = data.codeLanguage || 'sql';
    }

    // Guardar en caché local
    const local = storageService.getItem<AppNotification[]>('app_notifications_all', []);
    local.unshift(newNotif);
    storageService.setItem('app_notifications_all', local);

    // Guardar en Firestore para distribución global
    if (!isLocalMockMode && db) {
      try {
        const notifRef = doc(db, 'notifications', notifId);
        await setDoc(notifRef, newNotif);
        console.log('[notificationService] Notificación publicada en la nube exitosamente:', notifId);
      } catch (err) {
        console.error('[notificationService] Error crítico guardando notificación en Firestore:', err);
      }
    }

    emitNotifChange();
    return newNotif;
  },

  // Obtener todas las notificaciones recibidas para un estudiante
  // Excluye las que el usuario haya eliminado de su propia bandeja personal
  async getNotificationsForUser(user: UserProfile): Promise<AppNotification[]> {
    let allNotifications: AppNotification[] = [];

    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'notifications');
        const snap = await Promise.race([
          getDocs(col),
          new Promise<null>((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))
        ]);

        if (snap) {
          const remote: AppNotification[] = [];
          snap.forEach(d => {
            const item = d.data() as AppNotification;
            remote.push({ ...item, id: d.id });
          });
          if (remote.length > 0) {
            remote.sort((a, b) => b.createdAt - a.createdAt);
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

    return this.filterForUser(allNotifications, user);
  },

  // Filtra notificaciones destinadas al usuario que no hayan sido descartadas de su bandeja
  filterForUser(all: AppNotification[], user: UserProfile): AppNotification[] {
    const dismissedLocal = user?.uid ? storageService.getItem<string[]>('dismissed_notifs_' + user.uid, []) : [];

    const userNotifs = all.filter(n => {
      // Si el alumno la eliminó de su bandeja personal, no se le muestra
      if ((user?.uid && n.dismissedBy?.includes(user.uid)) || dismissedLocal.includes(n.id)) {
        return false;
      }
      if (n.targetType === 'all') return true;
      if (n.targetType === 'specific' && user?.uid && n.targetUid === user.uid) return true;
      if (n.targetType === 'group' && n.targetGroup && n.targetGroup === (user?.group || 'Grupo A')) return true;
      return false;
    });

    return userNotifs.sort((a, b) => b.createdAt - a.createdAt);
  },

  // Suscripción en Tiempo Real para el estudiante (Aparecen INMEDIATAMENTE sin recargar)
  subscribeToUserNotifications(
    user: UserProfile,
    onUpdate: (notifs: AppNotification[]) => void
  ): () => void {
    // 1. Enviar estado inicial inmediato desde caché
    const initialLocal = storageService.getItem<AppNotification[]>('app_notifications_all', []);
    onUpdate(this.filterForUser(initialLocal, user));

    // 2. Escuchar evento local entre ventanas/componentes
    const handleLocalEvent = () => {
      const currentLocal = storageService.getItem<AppNotification[]>('app_notifications_all', []);
      onUpdate(this.filterForUser(currentLocal, user));
    };
    if (typeof window !== 'undefined') {
      window.addEventListener(NOTIF_EVENT_NAME, handleLocalEvent);
      window.addEventListener('storage', handleLocalEvent);
    }

    // 3. Suscripción remota en tiempo real con Firestore onSnapshot
    let unsubscribeFirestore: (() => void) | null = null;
    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'notifications');
        // Fetch inicial directo garantizado
        getDocs(col).then((snapshot) => {
          if (!snapshot.empty) {
            const remote: AppNotification[] = [];
            snapshot.forEach((d) => {
              const item = d.data() as AppNotification;
              remote.push({ ...item, id: d.id });
            });
            remote.sort((a, b) => b.createdAt - a.createdAt);
            storageService.setItem('app_notifications_all', remote);
            onUpdate(this.filterForUser(remote, user));
          }
        }).catch((err) => {
          console.warn('[notificationService] Error en fetch inicial de notificaciones:', err);
        });

        // Listener en tiempo real sin requerir índice compuesto
        unsubscribeFirestore = onSnapshot(
          col,
          (snapshot) => {
            const remote: AppNotification[] = [];
            snapshot.forEach((d) => {
              const item = d.data() as AppNotification;
              remote.push({ ...item, id: d.id });
            });
            remote.sort((a, b) => b.createdAt - a.createdAt);
            storageService.setItem('app_notifications_all', remote);
            onUpdate(this.filterForUser(remote, user));
          },
          (err) => {
            console.warn('[notificationService] Error en snapshot de notificaciones:', err);
          }
        );
      } catch (err) {
        console.warn('[notificationService] No se pudo conectar listener en tiempo real:', err);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener(NOTIF_EVENT_NAME, handleLocalEvent);
        window.removeEventListener('storage', handleLocalEvent);
      }
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  },

  // Suscripción en Tiempo Real a TODAS las notificaciones (Para Docente en Seguimiento)
  subscribeToAllNotifications(onUpdate: (notifs: AppNotification[]) => void): () => void {
    const initialLocal = storageService.getItem<AppNotification[]>('app_notifications_all', []);
    onUpdate(initialLocal);

    const handleLocalEvent = () => {
      const currentLocal = storageService.getItem<AppNotification[]>('app_notifications_all', []);
      onUpdate(currentLocal);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener(NOTIF_EVENT_NAME, handleLocalEvent);
      window.addEventListener('storage', handleLocalEvent);
    }

    let unsubscribeFirestore: (() => void) | null = null;
    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'notifications');
        getDocs(col).then((snapshot) => {
          if (!snapshot.empty) {
            const remote: AppNotification[] = [];
            snapshot.forEach((d) => {
              const item = d.data() as AppNotification;
              remote.push({ ...item, id: d.id });
            });
            remote.sort((a, b) => b.createdAt - a.createdAt);
            storageService.setItem('app_notifications_all', remote);
            onUpdate(remote);
          }
        }).catch(() => {});

        unsubscribeFirestore = onSnapshot(
          col,
          (snapshot) => {
            const remote: AppNotification[] = [];
            snapshot.forEach((d) => {
              const item = d.data() as AppNotification;
              remote.push({ ...item, id: d.id });
            });
            remote.sort((a, b) => b.createdAt - a.createdAt);
            storageService.setItem('app_notifications_all', remote);
            onUpdate(remote);
          },
          (err) => {
            console.warn('[notificationService] Error snapshot profesor:', err);
          }
        );
      } catch (err) {
        console.warn('[notificationService] Error configurando snapshot profesor:', err);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener(NOTIF_EVENT_NAME, handleLocalEvent);
        window.removeEventListener('storage', handleLocalEvent);
      }
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  },

  // Obtener todas las notificaciones del sistema (Solo Administrador / Docente)
  async getAllNotifications(): Promise<AppNotification[]> {
    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'notifications');
        const snap = await getDocs(col);
        const remote: AppNotification[] = [];
        snap.forEach(d => {
          remote.push({ ...(d.data() as AppNotification), id: d.id });
        });
        if (remote.length > 0) {
          remote.sort((a, b) => b.createdAt - a.createdAt);
          storageService.setItem('app_notifications_all', remote);
          return remote;
        }
      } catch (err) {
        console.warn('[notificationService] Error al consultar todas las notificaciones en Firestore:', err);
      }
    }
    // Intentar sincronizar avisos locales rezagados a Firestore
    this.syncLocalNotificationsToCloud().catch(() => {});
    return storageService.getItem<AppNotification[]>('app_notifications_all', []);
  },

  // Sincronizar notificaciones locales existentes hacia Firestore si no existen en la nube (para recuperar avisos y scripts previos)
  async syncLocalNotificationsToCloud(): Promise<void> {
    if (isLocalMockMode || !db) return;
    try {
      const local = storageService.getItem<AppNotification[]>('app_notifications_all', []);
      if (!local || local.length === 0) return;

      const col = collection(db, 'notifications');
      const snap = await getDocs(col);
      const existingIds = new Set<string>();
      snap.forEach(d => existingIds.add(d.id));

      for (const notif of local) {
        if (notif.id && !existingIds.has(notif.id)) {
          const cleanNotif: Record<string, any> = {
            id: notif.id,
            title: notif.title || '',
            message: notif.message || '',
            type: notif.type || 'update',
            targetType: notif.targetType || 'all',
            targetUid: notif.targetUid || '',
            targetGroup: notif.targetGroup || '',
            sender: notif.sender || 'Profesor',
            createdAt: notif.createdAt || Date.now(),
            readBy: Array.isArray(notif.readBy) ? notif.readBy : [],
            dismissedBy: Array.isArray(notif.dismissedBy) ? notif.dismissedBy : []
          };
          if (notif.codeSnippet) cleanNotif.codeSnippet = notif.codeSnippet;
          if (notif.codeLanguage) cleanNotif.codeLanguage = notif.codeLanguage;

          const notifRef = doc(db, 'notifications', notif.id);
          await setDoc(notifRef, cleanNotif);
          console.log('[notificationService] Notificación previa recuperada y subida a Firestore:', notif.id);
        }
      }
    } catch (err) {
      console.warn('[notificationService] Error sincronizando notificaciones pendientes:', err);
    }
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
    emitNotifChange();
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

  // ════════════════════════════════════════════════════════════════════════════
  // LIMPIEZA PERSONAL DEL ALUMNO (Descarta de su bandeja sin borrarla de la BD)
  // ════════════════════════════════════════════════════════════════════════════
  async dismissNotificationForUser(notificationId: string, uid: string): Promise<void> {
    // 1. Guardar en lista de descartadas personal
    const dismissed = storageService.getItem<string[]>('dismissed_notifs_' + uid, []);
    if (!dismissed.includes(notificationId)) {
      dismissed.push(notificationId);
      storageService.setItem('dismissed_notifs_' + uid, dismissed);
    }

    // 2. Actualizar caché local
    const local = storageService.getItem<AppNotification[]>('app_notifications_all', []);
    const idx = local.findIndex(n => n.id === notificationId);
    if (idx >= 0) {
      local[idx].dismissedBy = local[idx].dismissedBy || [];
      if (!local[idx].dismissedBy!.includes(uid)) {
        local[idx].dismissedBy!.push(uid);
        storageService.setItem('app_notifications_all', local);
      }
    }

    // 3. Sincronizar en Firestore para persistencia multidivice
    if (!isLocalMockMode && db) {
      try {
        const notifRef = doc(db, 'notifications', notificationId);
        await updateDoc(notifRef, {
          dismissedBy: arrayUnion(uid)
        });
      } catch (err) {
        console.warn('[notificationService] Error al descartar notificación para usuario:', err);
      }
    }

    emitNotifChange();
  },

  // Descartar todas las notificaciones activas para el alumno
  async dismissAllNotificationsForUser(uid: string, notifs: AppNotification[]): Promise<void> {
    await Promise.all(notifs.map(n => this.dismissNotificationForUser(n.id, uid)));
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ELIMINACIÓN PERMANENTE (Exclusiva del Profesor desde Seguimiento)
  // Borra el documento definitivamente de la base de datos
  // ════════════════════════════════════════════════════════════════════════════
  async deleteNotificationPermanently(notificationId: string): Promise<void> {
    const local = storageService.getItem<AppNotification[]>('app_notifications_all', []);
    const updated = local.filter(n => n.id !== notificationId);
    storageService.setItem('app_notifications_all', updated);

    if (!isLocalMockMode && db) {
      try {
        const notifRef = doc(db, 'notifications', notificationId);
        await deleteDoc(notifRef);
      } catch (err) {
        console.warn('[notificationService] Error al eliminar permanentemente:', err);
      }
    }

    emitNotifChange();
  },

  // Alias para retrocompatibilidad
  async deleteNotification(notificationId: string): Promise<void> {
    return this.deleteNotificationPermanently(notificationId);
  }
};
