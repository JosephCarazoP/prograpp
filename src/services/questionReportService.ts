import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { QuestionReport } from '../types/questionReport';
import { storageService } from './storageService';
import { notificationService } from './notificationService';

const STORAGE_KEY = 'question_reports';

export const questionReportService = {
  /**
   * Guarda un nuevo reporte de pregunta tanto en LocalStorage (offline-first)
   * como en Firestore (en la nube) para que el docente pueda corregirla de inmediato.
   */
  async saveReport(report: QuestionReport): Promise<void> {
    // 1. Persistencia local inmediata (offline-first)
    const local = storageService.getItem<QuestionReport[]>(STORAGE_KEY, []);
    const existingIdx = local.findIndex(r => r.reportId === report.reportId);
    if (existingIdx >= 0) {
      local[existingIdx] = report;
    } else {
      local.unshift(report);
    }
    storageService.setItem(STORAGE_KEY, local);

    // Guardar también en la caché del alumno
    const userLocal = storageService.getItem<QuestionReport[]>(`${STORAGE_KEY}_${report.studentId}`, []);
    userLocal.unshift(report);
    storageService.setItem(`${STORAGE_KEY}_${report.studentId}`, userLocal);

    // 2. Persistencia en la nube (Firestore)
    if (!isLocalMockMode && db) {
      try {
        const reportRef = doc(db, 'questionReports', report.reportId);
        await setDoc(reportRef, report, { merge: true });

        // También registrar en la subcolección del alumno para auditoría
        try {
          const userReportRef = doc(db, 'users', report.studentId, 'questionReports', report.reportId);
          await setDoc(userReportRef, report, { merge: true });
        } catch {
          // No crítico si falla la subcolección
        }

        // 3. Notificación al docente en tiempo real
        try {
          await notificationService.sendNotification({
            title: `🚩 Reporte en ${report.pathId === 'sql' ? 'SQL' : 'Kotlin'}: ${report.lessonTitle}`,
            message: `${report.studentName} (${report.studentCode || 'Estudiante'}) reportó: "${report.reasonLabel}". Pregunta: ${report.prompt.slice(0, 75)}...`,
            type: 'urgent_alert',
            targetType: 'all',
            sender: 'Detector de Errores'
          });
        } catch (notifErr) {
          console.warn('[questionReportService] No se pudo enviar notificación push:', notifErr);
        }
      } catch (err) {
        console.warn('[questionReportService] Error al sincronizar con Firestore, guardado en cola local:', err);
      }
    }
  },

  /**
   * Obtiene todos los reportes registrados para el panel de administración docente.
   */
  async getAllReports(): Promise<QuestionReport[]> {
    const local = storageService.getItem<QuestionReport[]>(STORAGE_KEY, []);

    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'questionReports');
        const q = query(col, orderBy('timestamp', 'desc'));
        const snap = await getDocs(q);
        const remote: QuestionReport[] = [];
        snap.forEach(d => {
          remote.push(d.data() as QuestionReport);
        });

        if (remote.length > 0) {
          // Fusionar con registros locales que no estén en la nube
          const remoteIds = new Set(remote.map(r => r.reportId));
          const unsynced = local.filter(l => !remoteIds.has(l.reportId));
          const merged = [...unsynced, ...remote].sort((a, b) => b.timestamp - a.timestamp);
          storageService.setItem(STORAGE_KEY, merged);
          return merged;
        }
      } catch (err) {
        console.warn('[questionReportService] Error al consultar Firestore, usando local:', err);
      }
    }

    return local.sort((a, b) => b.timestamp - a.timestamp);
  },

  /**
   * Suscribe en tiempo real a los reportes de preguntas (estilo notificaciones)
   * para que el docente reciba las incidencias al instante.
   */
  subscribeToAllReports(callback: (reports: QuestionReport[]) => void): () => void {
    const local = storageService.getItem<QuestionReport[]>(STORAGE_KEY, []);
    callback(local.sort((a, b) => b.timestamp - a.timestamp));

    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'questionReports');
        const q = query(col, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snap) => {
          const remote: QuestionReport[] = [];
          snap.forEach(d => {
            remote.push(d.data() as QuestionReport);
          });
          const localNow = storageService.getItem<QuestionReport[]>(STORAGE_KEY, []);
          const remoteIds = new Set(remote.map(r => r.reportId));
          const unsynced = localNow.filter(l => !remoteIds.has(l.reportId));
          const merged = [...unsynced, ...remote].sort((a, b) => b.timestamp - a.timestamp);
          storageService.setItem(STORAGE_KEY, merged);
          callback(merged);
        }, (err) => {
          console.warn('[questionReportService] Error en snapshot de reportes:', err);
        });
        return unsubscribe;
      } catch (err) {
        console.warn('[questionReportService] Fallback a suscripción local:', err);
      }
    }

    return () => {};
  },

  /**
   * Obtiene los reportes formulados por un estudiante en particular.
   */
  async getReportsByStudent(studentId: string): Promise<QuestionReport[]> {
    const all = await this.getAllReports();
    return all.filter(r => r.studentId === studentId);
  },

  /**
   * Actualiza el estado de revisión de un reporte (ej: 'reviewed', 'resolved').
   */
  async updateReportStatus(
    reportId: string,
    status: 'pending' | 'reviewed' | 'resolved',
    adminNotes?: string
  ): Promise<void> {
    const local = storageService.getItem<QuestionReport[]>(STORAGE_KEY, []);
    const idx = local.findIndex(r => r.reportId === reportId);
    if (idx >= 0) {
      local[idx].status = status;
      if (adminNotes !== undefined) local[idx].adminNotes = adminNotes;
      if (status === 'resolved') local[idx].resolvedAt = Date.now();
      storageService.setItem(STORAGE_KEY, local);
    }

    if (!isLocalMockMode && db) {
      try {
        const ref = doc(db, 'questionReports', reportId);
        const payload: Record<string, any> = { status };
        if (adminNotes !== undefined) payload.adminNotes = adminNotes;
        if (status === 'resolved') payload.resolvedAt = Date.now();
        await updateDoc(ref, payload);
      } catch (err) {
        console.warn('[questionReportService] Error al actualizar estado en Firestore:', err);
      }
    }
  },

  /**
   * Elimina un reporte del sistema.
   */
  async deleteReport(reportId: string): Promise<void> {
    const local = storageService.getItem<QuestionReport[]>(STORAGE_KEY, []);
    const filtered = local.filter(r => r.reportId !== reportId);
    storageService.setItem(STORAGE_KEY, filtered);

    if (!isLocalMockMode && db) {
      try {
        const ref = doc(db, 'questionReports', reportId);
        await deleteDoc(ref);
      } catch (err) {
        console.warn('[questionReportService] Error al eliminar reporte en Firestore:', err);
      }
    }
  }
};
