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
import { enrichQuestionReportWithCatalog } from '../utils/exerciseCatalogResolver';

const STORAGE_KEY = 'question_reports';

/**
 * Limpia recursivamente valores undefined para evitar errores de serialización en Firestore.
 */
function stripUndefinedDeep<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj
      .filter(v => v !== undefined)
      .map(v => stripUndefinedDeep(v)) as unknown as T;
  }
  if (typeof obj === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj as Record<string, any>)) {
      if (v !== undefined) {
        cleaned[k] = stripUndefinedDeep(v);
      }
    }
    return cleaned as T;
  }
  return obj;
}

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
   * Consolida, agrupa y enriquece retroactivamente una lista de reportes por (ruta + exerciseId).
   * Tanto los reportes antiguos como los nuevos quedan completados con el enunciado, código,
   * opciones exactas (4 opciones, relación, completar, etc.) y solución del catálogo.
   */
  consolidateReportsList(reports: QuestionReport[]): QuestionReport[] {
    const map = new Map<string, QuestionReport>();

    for (const rawRep of reports) {
      if (!rawRep || !rawRep.exerciseId) continue;
      const rep = enrichQuestionReportWithCatalog(rawRep);
      const key = `${rep.pathId || 'kotlin'}_${rep.exerciseId}`;

      // Extraer reporteros del documento actual
      const currentReporters: QuestionReporter[] =
        Array.isArray(rep.reporters) && rep.reporters.length > 0
          ? rep.reporters.map(r => ({
              ...r,
              availableOptions: r.availableOptions || rep.availableOptions,
              screenshotDataUrl: r.screenshotDataUrl || rep.screenshotDataUrl
            }))
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
                availableOptions: rep.availableOptions,
                codeSnippet: rep.codeSnippet,
                feedbackState: rep.feedbackState,
                feedbackExplanation: rep.feedbackExplanation,
                screenshotDataUrl: rep.screenshotDataUrl,
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
            if ((nr.timestamp || 0) >= (existingReporters[matchIdx].timestamp || 0)) {
              existingReporters[matchIdx] = {
                ...existingReporters[matchIdx],
                ...nr,
                screenshotDataUrl: nr.screenshotDataUrl || existingReporters[matchIdx].screenshotDataUrl,
                availableOptions: nr.availableOptions || existingReporters[matchIdx].availableOptions
              };
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

        // Conservar captura de pantalla y datos más completos
        if (rep.screenshotDataUrl && !existing.screenshotDataUrl) {
          existing.screenshotDataUrl = rep.screenshotDataUrl;
        }
        if (rep.availableOptions && rep.availableOptions.length > 0 && (!existing.availableOptions || existing.availableOptions.length === 0)) {
          existing.availableOptions = rep.availableOptions;
        }
        if (rep.matchingPairsData && !existing.matchingPairsData) {
          existing.matchingPairsData = rep.matchingPairsData;
        }
        if (rep.codeBuilderData && !existing.codeBuilderData) {
          existing.codeBuilderData = rep.codeBuilderData;
        }
        if (rep.spotTheBugData && !existing.spotTheBugData) {
          existing.spotTheBugData = rep.spotTheBugData;
        }
        if (rep.parsonsData && !existing.parsonsData) {
          existing.parsonsData = rep.parsonsData;
        }
        if (rep.flowchartData && !existing.flowchartData) {
          existing.flowchartData = rep.flowchartData;
        }
        if (rep.traceStepData && !existing.traceStepData) {
          existing.traceStepData = rep.traceStepData;
        }

        // Si alguno está pendiente, marcar toda la ficha como pendiente para revisión docente
        if (rep.status === 'pending' || existing.status === 'pending') {
          existing.status = 'pending';
        }
      }
    }

    return Array.from(map.values())
      .map(enrichQuestionReportWithCatalog)
      .sort((a, b) => {
        const timeA = a.lastReportedAt || a.timestamp || 0;
        const timeB = b.lastReportedAt || b.timestamp || 0;
        return timeB - timeA;
      });
  },

  /**
   * Guarda un reporte de pregunta agrupándolo automáticamente con reportes previos
   * de la misma pregunta, tanto en LocalStorage como en Firestore.
   */
  async saveReport(rawReport: QuestionReport): Promise<void> {
    const report = enrichQuestionReportWithCatalog(rawReport);
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
      availableOptions: report.availableOptions,
      codeSnippet: report.codeSnippet,
      feedbackState: report.feedbackState,
      feedbackExplanation: report.feedbackExplanation,
      screenshotDataUrl: report.screenshotDataUrl,
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
            availableOptions: existingDoc.availableOptions,
            codeSnippet: existingDoc.codeSnippet,
            feedbackState: existingDoc.feedbackState,
            feedbackExplanation: existingDoc.feedbackExplanation,
            screenshotDataUrl: existingDoc.screenshotDataUrl,
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

    // Limitar capturas históricas por documento si hubiera más de 5 alumnos reportando la misma pregunta
    if (reporters.length > 5) {
      reporters = reporters.map((r, i) =>
        i < reporters.length - 5 ? { ...r, screenshotDataUrl: undefined } : r
      );
    }

    const consolidatedReport = enrichQuestionReportWithCatalog({
      ...(existingDoc || report),
      reportId: targetReportId,
      exerciseId: report.exerciseId,
      pathId: report.pathId,
      lessonId: report.lessonId,
      lessonTitle: report.lessonTitle,
      unitId: report.unitId,
      exerciseType: report.exerciseType,
      sourceFileHint: report.sourceFileHint || existingDoc?.sourceFileHint,
      prompt: report.prompt || existingDoc?.prompt || '',
      instructionText: report.instructionText || existingDoc?.instructionText,
      codeSnippet: report.codeSnippet || existingDoc?.codeSnippet,
      availableOptions: report.availableOptions || existingDoc?.availableOptions,
      originalOptions: report.originalOptions || existingDoc?.originalOptions,
      originalExplanation: report.originalExplanation || existingDoc?.originalExplanation,
      expectedSolution: report.expectedSolution || existingDoc?.expectedSolution || '',
      matchingPairsData: report.matchingPairsData || existingDoc?.matchingPairsData,
      codeBuilderData: report.codeBuilderData || existingDoc?.codeBuilderData,
      spotTheBugData: report.spotTheBugData || existingDoc?.spotTheBugData,
      parsonsData: report.parsonsData || existingDoc?.parsonsData,
      flowchartData: report.flowchartData || existingDoc?.flowchartData,
      traceStepData: report.traceStepData || existingDoc?.traceStepData,
      screenshotDataUrl: report.screenshotDataUrl || existingDoc?.screenshotDataUrl,
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
    });

    const cleanConsolidated = stripUndefinedDeep(consolidatedReport);

    // 3. Persistencia local inmediata (offline-first)
    const filteredLocal = local.filter(
      r => r.reportId !== targetReportId && !(r.pathId === report.pathId && r.exerciseId === report.exerciseId)
    );
    filteredLocal.unshift(cleanConsolidated);
    storageService.setItem(STORAGE_KEY, filteredLocal);

    // Guardar en la caché individual del alumno
    const userLocal = storageService.getItem<QuestionReport[]>(`${STORAGE_KEY}_${report.studentId}`, []);
    const filteredUserLocal = userLocal.filter(r => r.exerciseId !== report.exerciseId);
    filteredUserLocal.unshift(cleanConsolidated);
    storageService.setItem(`${STORAGE_KEY}_${report.studentId}`, filteredUserLocal);

    // 4. Persistencia en la nube (Firestore)
    if (!isLocalMockMode && db) {
      try {
        const reportRef = doc(db, 'questionReports', targetReportId);
        await setDoc(reportRef, cleanConsolidated, { merge: true });
        console.log('[questionReportService] Reporte agrupado guardado exitosamente en Firestore:', targetReportId);

        // Subcolección de auditoría del estudiante
        try {
          const userReportRef = doc(db, 'users', report.studentId, 'questionReports', targetReportId);
          await setDoc(userReportRef, cleanConsolidated, { merge: true });
        } catch {
          // No crítico
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
