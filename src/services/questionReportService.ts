import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { QuestionReport, QuestionReporter } from '../types/questionReport';
import { storageService } from './storageService';
import { notificationService } from './notificationService';

const STORAGE_KEY = 'question_reports';

export const questionReportService = {
  /**
   * Genera un ID determinístico único por pregunta y ruta para agrupar
   * los reportes de múltiples alumnos en una única ficha de incidencia.
   */
  getDeterministicReportId(pathId: 'kotlin' | 'sql', exerciseId: string): string {
    const safeExerciseId = String(exerciseId).replace(/[^a-zA-Z0-9_-]/g, '_');
    return `rep_${pathId}_${safeExerciseId}`;
  },

  /**
   * Consolida y agrupa una lista de reportes por (ruta + exerciseId).
   * Si varios alumnos reportaron la misma pregunta, se agrupan en una única
   * ficha técnica con la lista completa de reporteros en pequeño.
   */
  consolidateReportsList(reports: QuestionReport[]): QuestionReport[] {
    const map = new Map<string, QuestionReport>();

    for (const rep of reports) {
      if (!rep || !rep.exerciseId) continue;
      const key = `${rep.pathId || 'kotlin'}_${rep.exerciseId}`;

      // Extraer reporteros del documento actual
      const currentReporters: QuestionReporter[] =
        Array.isArray(rep.reporters) && rep.reporters.length > 0
          ? [...rep.reporters]
          : rep.studentId
          ? [
              {
                studentId: rep.studentId,
                studentName: rep.studentName || 'Estudiante',
                studentEmail: rep.studentEmail,
                studentCode: rep.studentCode,
                reason: rep.reason,
                reasonLabel: rep.reasonLabel,
                comment: rep.comment,
                userAnswer: rep.userAnswer,
                timestamp: rep.timestamp || Date.now()
              }
            ]
          : [];

      if (!map.has(key)) {
        map.set(key, {
          ...rep,
          reportId: rep.reportId || this.getDeterministicReportId(rep.pathId || 'kotlin', rep.exerciseId),
          reporters: currentReporters,
          reportCount: currentReporters.length || 1,
          lastReportedAt: rep.lastReportedAt || rep.timestamp || Date.now()
        });
      } else {
        const existing = map.get(key)!;
        const existingReporters = existing.reporters || [];

        for (const nr of currentReporters) {
          const matchIdx = existingReporters.findIndex(r => r.studentId === nr.studentId);
          if (matchIdx >= 0) {
            // Actualizar si este reporte es más reciente
            if ((nr.timestamp || 0) >= (existingReporters[matchIdx].timestamp || 0)) {
              existingReporters[matchIdx] = nr;
            }
          } else {
            existingReporters.push(nr);
          }
        }

        existing.reporters = existingReporters;
        existing.reportCount = existingReporters.length;
        existing.lastReportedAt = Math.max(
          existing.lastReportedAt || 0,
          rep.lastReportedAt || rep.timestamp || 0
        );

        // Si alguno está pendiente, marcar toda la ficha como pendiente para revisión docente
        if (rep.status === 'pending' || existing.status === 'pending') {
          existing.status = 'pending';
        }
      }
    }

    return Array.from(map.values()).sort((a, b) => {
      const timeA = a.lastReportedAt || a.timestamp || 0;
      const timeB = b.lastReportedAt || b.timestamp || 0;
      return timeB - timeA;
    });
  },

  /**
   * Guarda un reporte de pregunta agrupándolo automáticamente con reportes previos
   * de la misma pregunta, tanto en LocalStorage como en Firestore.
   */
  async saveReport(report: QuestionReport): Promise<void> {
    const targetReportId =
      report.reportId || this.getDeterministicReportId(report.pathId, report.exerciseId);

    const currentReporter: QuestionReporter = {
      studentId: report.studentId,
      studentName: report.studentName,
      studentEmail: report.studentEmail,
      studentCode: report.studentCode,
      reason: report.reason,
      reasonLabel: report.reasonLabel,
      comment: report.comment,
      userAnswer: report.userAnswer,
      timestamp: report.timestamp || Date.now()
    };

    // 1. Obtener estado previo existente (local o remoto)
    const local = storageService.getItem<QuestionReport[]>(STORAGE_KEY, []);
    const localIdx = local.findIndex(
      r => r.reportId === targetReportId || (r.pathId === report.pathId && r.exerciseId === report.exerciseId)
    );
    let existingDoc: QuestionReport | null = localIdx >= 0 ? local[localIdx] : null;

    if (!isLocalMockMode && db) {
      try {
        const reportRef = doc(db, 'questionReports', targetReportId);
        const snap = await getDoc(reportRef);
        if (snap.exists()) {
          existingDoc = snap.data() as QuestionReport;
        }
      } catch (err) {
        console.warn('[questionReportService] Fallback al verificar reporte previo en Firestore:', err);
      }
    }

    // 2. Fusionar lista de reporteros para que una misma pregunta no se duplique
    let reporters: QuestionReporter[] = [];
    if (existingDoc) {
      if (Array.isArray(existingDoc.reporters) && existingDoc.reporters.length > 0) {
        reporters = [...existingDoc.reporters];
      } else if (existingDoc.studentId) {
        reporters = [
          {
            studentId: existingDoc.studentId,
            studentName: existingDoc.studentName,
            studentEmail: existingDoc.studentEmail,
            studentCode: existingDoc.studentCode,
            reason: existingDoc.reason,
            reasonLabel: existingDoc.reasonLabel,
            comment: existingDoc.comment,
            userAnswer: existingDoc.userAnswer,
            timestamp: existingDoc.timestamp
          }
        ];
      }
    }

    const studentIdx = reporters.findIndex(r => r.studentId === currentReporter.studentId);
    if (studentIdx >= 0) {
      reporters[studentIdx] = currentReporter;
    } else {
      reporters.push(currentReporter);
    }

    const consolidatedReport: QuestionReport = {
      ...(existingDoc || report),
      reportId: targetReportId,
      exerciseId: report.exerciseId,
      pathId: report.pathId,
      lessonId: report.lessonId,
      lessonTitle: report.lessonTitle,
      unitId: report.unitId,
      exerciseType: report.exerciseType,
      prompt: report.prompt || (existingDoc?.prompt || ''),
      codeSnippet: report.codeSnippet || existingDoc?.codeSnippet,
      availableOptions: report.availableOptions || existingDoc?.availableOptions,
      expectedSolution: report.expectedSolution || (existingDoc?.expectedSolution || ''),
      feedbackState: report.feedbackState || existingDoc?.feedbackState,
      feedbackExplanation: report.feedbackExplanation || existingDoc?.feedbackExplanation,

      // Alumno más reciente en los campos directos
      studentId: currentReporter.studentId,
      studentName: currentReporter.studentName,
      studentEmail: currentReporter.studentEmail,
      studentCode: currentReporter.studentCode,
      reason: currentReporter.reason,
      reasonLabel: currentReporter.reasonLabel,
      comment: currentReporter.comment,
      userAnswer: currentReporter.userAnswer,

      reporters,
      reportCount: reporters.length,
      timestamp: existingDoc?.timestamp || currentReporter.timestamp,
      lastReportedAt: currentReporter.timestamp,
      status: existingDoc?.status === 'resolved' ? 'pending' : (existingDoc?.status || 'pending')
    };

    // 3. Persistencia local inmediata (offline-first)
    const filteredLocal = local.filter(
      r => r.reportId !== targetReportId && !(r.pathId === report.pathId && r.exerciseId === report.exerciseId)
    );
    filteredLocal.unshift(consolidatedReport);
    storageService.setItem(STORAGE_KEY, filteredLocal);

    // Guardar en la caché individual del alumno
    const userLocal = storageService.getItem<QuestionReport[]>(`${STORAGE_KEY}_${report.studentId}`, []);
    const filteredUserLocal = userLocal.filter(r => r.exerciseId !== report.exerciseId);
    filteredUserLocal.unshift(consolidatedReport);
    storageService.setItem(`${STORAGE_KEY}_${report.studentId}`, filteredUserLocal);

    // 4. Persistencia en la nube (Firestore)
    if (!isLocalMockMode && db) {
      try {
        const reportRef = doc(db, 'questionReports', targetReportId);
        await setDoc(reportRef, consolidatedReport, { merge: true });
        console.log('[questionReportService] Reporte agrupado guardado exitosamente en Firestore:', targetReportId);

        // Subcolección de auditoría del estudiante
        try {
          const userReportRef = doc(db, 'users', report.studentId, 'questionReports', targetReportId);
          await setDoc(userReportRef, consolidatedReport, { merge: true });
        } catch {
          // No crítico
        }

        // 5. Notificación docente en tiempo real
        try {
          const isMultiple = consolidatedReport.reportCount! > 1;
          await notificationService.sendNotification({
            title: isMultiple
              ? `🚩 [x${consolidatedReport.reportCount}] Reporte en ${report.pathId === 'sql' ? 'SQL' : 'Kotlin'}: ${report.lessonTitle}`
              : `🚩 Reporte en ${report.pathId === 'sql' ? 'SQL' : 'Kotlin'}: ${report.lessonTitle}`,
            message: isMultiple
              ? `${report.studentName} y otros ${consolidatedReport.reportCount! - 1} alumnos reportaron este ejercicio. Motivo: "${report.reasonLabel}".`
              : `${report.studentName} (${report.studentCode || 'Estudiante'}) reportó: "${report.reasonLabel}". Pregunta: ${report.prompt.slice(0, 75)}...`,
            type: 'urgent_alert',
            targetType: 'all',
            sender: 'Detector de Errores'
          });
        } catch (notifErr) {
          console.warn('[questionReportService] No se pudo enviar notificación push:', notifErr);
        }
      } catch (err) {
        console.error('[questionReportService] Error al sincronizar con Firestore:', err);
      }
    }
  },

  /**
   * Obtiene todos los reportes consolidados y agrupados para el panel docente.
   */
  async getAllReports(): Promise<QuestionReport[]> {
    const local = storageService.getItem<QuestionReport[]>(STORAGE_KEY, []);

    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'questionReports');
        const snap = await getDocs(col);
        const remote: QuestionReport[] = [];
        snap.forEach(d => {
          remote.push({ ...d.data(), reportId: d.id } as QuestionReport);
        });

        if (remote.length > 0) {
          const merged = this.consolidateReportsList([...remote, ...local]);
          storageService.setItem(STORAGE_KEY, merged);
          return merged;
        }
      } catch (err) {
        console.error('[questionReportService] Error al consultar Firestore, usando local:', err);
      }
    }

    return this.consolidateReportsList(local);
  },

  /**
   * Suscribe en tiempo real a los reportes de preguntas en Firestore
   * con actualización inmediata en el dock docente.
   */
  subscribeToAllReports(callback: (reports: QuestionReport[]) => void): () => void {
    const local = storageService.getItem<QuestionReport[]>(STORAGE_KEY, []);
    callback(this.consolidateReportsList(local));

    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'questionReports');
        const unsubscribe = onSnapshot(
          col,
          (snap) => {
            const remote: QuestionReport[] = [];
            snap.forEach(d => {
              remote.push({ ...d.data(), reportId: d.id } as QuestionReport);
            });
            const localNow = storageService.getItem<QuestionReport[]>(STORAGE_KEY, []);
            const merged = this.consolidateReportsList([...remote, ...localNow]);
            storageService.setItem(STORAGE_KEY, merged);
            callback(merged);
          },
          (err) => {
            console.error('[questionReportService] Error en snapshot de reportes en Firestore:', err);
          }
        );
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
    return all.filter(
      r => r.studentId === studentId || r.reporters?.some(rep => rep.studentId === studentId)
    );
  },

  /**
   * Actualiza el estado de revisión de una ficha de reporte (ej: 'reviewed', 'resolved').
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
        console.error('[questionReportService] Error al actualizar estado en Firestore:', err);
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
        console.error('[questionReportService] Error al eliminar reporte en Firestore:', err);
      }
    }
  }
};
