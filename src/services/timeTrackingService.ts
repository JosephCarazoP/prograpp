import { userService } from './userService';

// Umbral de inactividad: 60 segundos sin clic, tecla o scroll
const INACTIVITY_TIMEOUT_MS = 60 * 1000;

class TimeTrackingService {
  private activeStudentUid: string | null = null;
  private isTrackingLesson: boolean = false;
  private lastUserActivityTime: number = Date.now();
  private accumulatedActiveSeconds: number = 0;
  private tabLockId: string = Math.random().toString(36).substring(2, 9);
  private heartbeatTimer: any = null;

  constructor() {
    this.setupListeners();
  }

  private setupListeners() {
    if (typeof window === 'undefined') return;

    // Detectar interacción humana activa
    const markActivity = () => {
      this.lastUserActivityTime = Date.now();
    };

    window.addEventListener('mousemove', markActivity, { passive: true });
    window.addEventListener('keydown', markActivity, { passive: true });
    window.addEventListener('touchstart', markActivity, { passive: true });
    window.addEventListener('scroll', markActivity, { passive: true });

    // Pausar inmediatamente si la pestaña o ventana pasa a segundo plano
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.flushActiveTime();
      } else {
        this.lastUserActivityTime = Date.now();
      }
    });

    // Sincronizar tiempo antes de cerrar ventana
    window.addEventListener('beforeunload', () => {
      this.flushActiveTime();
    });
  }

  // Iniciar conteo de tiempo activo para una lección o práctica
  startLessonTracking(studentUid: string) {
    if (!studentUid || studentUid === 'guest_user_1') return;

    this.activeStudentUid = studentUid;
    this.isTrackingLesson = true;
    this.lastUserActivityTime = Date.now();

    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);

    // Cerrojo de pestaña primaria en localStorage para evitar que 2 pestañas sumen el doble
    localStorage.setItem('prograapp_active_tab_heartbeat', JSON.stringify({
      tabId: this.tabLockId,
      time: Date.now()
    }));

    this.heartbeatTimer = setInterval(() => {
      this.checkAndTick();
    }, 1000);
  }

  // Detener el conteo al salir de la lección o pasar a navegación administrativa
  stopLessonTracking() {
    this.flushActiveTime();
    this.isTrackingLesson = false;
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private checkAndTick() {
    if (!this.isTrackingLesson || !this.activeStudentUid) return;

    // Si la pestaña está oculta, no sumar tiempo
    if (typeof document !== 'undefined' && document.hidden) return;

    // Si pasaron más de 60 segundos de inactividad, no sumar
    const now = Date.now();
    if (now - this.lastUserActivityTime > INACTIVITY_TIMEOUT_MS) return;

    // Comprobar cerrojo multi-pestaña
    try {
      const lockData = localStorage.getItem('prograapp_active_tab_heartbeat');
      if (lockData) {
        const parsed = JSON.parse(lockData);
        // Si otra pestaña actualizó el cerrojo hace menos de 3s, solo ella computa
        if (parsed.tabId !== this.tabLockId && (now - parsed.time < 3000)) {
          return;
        }
      }
      // Renovar el cerrojo
      localStorage.setItem('prograapp_active_tab_heartbeat', JSON.stringify({
        tabId: this.tabLockId,
        time: now
      }));
    } catch {
      // Ignore localStorage errors
    }

    this.accumulatedActiveSeconds += 1;

    // Cada 15 segundos de interacción activa acumulada, sincronizar con el perfil
    if (this.accumulatedActiveSeconds >= 15) {
      this.flushActiveTime();
    }
  }

  // Guardar tiempo activo acumulado en el servicio del usuario
  async flushActiveTime() {
    if (!this.activeStudentUid || this.accumulatedActiveSeconds <= 0) return;

    const secondsToFlush = this.accumulatedActiveSeconds;
    this.accumulatedActiveSeconds = 0;

    try {
      await userService.addActiveTime(this.activeStudentUid, secondsToFlush);
    } catch (err) {
      console.warn('[timeTracking] Error al sincronizar tiempo activo:', err);
    }
  }
}

export const timeTrackingService = new TimeTrackingService();
