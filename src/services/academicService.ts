import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import {
  ExerciseAttempt,
  AcademicEvaluation,
  TeacherObservation,
  ActivityOpinion,
  EducationalIndicators
} from '../types/academic';
import { UserProfile, LearningPath } from '../types/user';
import { LessonProgress } from '../types/progress';
import { storageService } from './storageService';

export const academicService = {
  // ─── 1. HISTORIAL INMUTABLE DE INTENTOS ───

  // Registrar cada respuesta enviada como registro independiente
  async recordAttempt(attempt: ExerciseAttempt): Promise<void> {
    // Almacenar en caché local para persistencia inmediata offline
    const localAttempts = storageService.getItem<ExerciseAttempt[]>('academic_attempts_' + attempt.studentId, []);
    // Prevenir duplicados por attemptId
    if (!localAttempts.some(a => a.attemptId === attempt.attemptId)) {
      localAttempts.push(attempt);
      storageService.setItem('academic_attempts_' + attempt.studentId, localAttempts);
    }

    if (!isLocalMockMode && db) {
      try {
        // Guardar en la subcolección del estudiante: /users/{studentId}/attempts/{attemptId}
        const attemptRef = doc(db, 'users', attempt.studentId, 'attempts', attempt.attemptId);
        await setDoc(attemptRef, attempt);
      } catch (err) {
        console.warn('[academicService] Guardado de intento en cola local por red:', err);
      }
    }
  },

  // Obtener historial de intentos de un estudiante
  async getAttemptsByStudent(studentId: string): Promise<ExerciseAttempt[]> {
    const localAttempts = storageService.getItem<ExerciseAttempt[]>('academic_attempts_' + studentId, []);

    if (!isLocalMockMode && db) {
      try {
        const attemptsCol = collection(db, 'users', studentId, 'attempts');
        const q = query(attemptsCol, orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const remoteAttempts: ExerciseAttempt[] = [];
        snapshot.forEach(docSnap => {
          remoteAttempts.push(docSnap.data() as ExerciseAttempt);
        });

        if (remoteAttempts.length > 0) {
          storageService.setItem('academic_attempts_' + studentId, remoteAttempts);
          return remoteAttempts;
        }
      } catch (err) {
        console.warn('[academicService] Error al obtener intentos de Firestore, usando caché local:', err);
      }
    }

    return localAttempts;
  },

  // Obtener todos los intentos para el panel administrativo (EN PARALELO para máxima velocidad)
  async getAllAttempts(students: UserProfile[]): Promise<ExerciseAttempt[]> {
    if (!students || students.length === 0) return [];
    const results = await Promise.all(
      students.map(student => this.getAttemptsByStudent(student.uid))
    );
    const all = results.flat();
    return all.sort((a, b) => b.timestamp - a.timestamp);
  },

  // ─── 2. EVALUACIONES (DIAGNÓSTICO Y PRUEBA FINAL) ───

  // Guardar o enviar evaluación (Diagnóstico o Final)
  async saveEvaluation(evaluation: AcademicEvaluation): Promise<void> {
    const localEvals = storageService.getItem<AcademicEvaluation[]>('academic_evaluations_' + evaluation.studentId, []);
    const idx = localEvals.findIndex(e => e.evalId === evaluation.evalId);
    if (idx >= 0) {
      localEvals[idx] = evaluation;
    } else {
      localEvals.push(evaluation);
    }
    storageService.setItem('academic_evaluations_' + evaluation.studentId, localEvals);

    if (!isLocalMockMode && db) {
      try {
        const evalRef = doc(db, 'evaluations', evaluation.evalId);
        await setDoc(evalRef, evaluation, { merge: true });
      } catch (err) {
        console.warn('[academicService] Guardado de evaluación en cola local:', err);
      }
    }
  },

  // Obtener evaluaciones de un estudiante
  async getEvaluationsByStudent(studentId: string): Promise<AcademicEvaluation[]> {
    const local = storageService.getItem<AcademicEvaluation[]>('academic_evaluations_' + studentId, []);

    if (!isLocalMockMode && db) {
      try {
        const evalsCol = collection(db, 'evaluations');
        const q = query(evalsCol, where('studentId', '==', studentId));
        const snapshot = await getDocs(q);
        const remote: AcademicEvaluation[] = [];
        snapshot.forEach(docSnap => {
          remote.push(docSnap.data() as AcademicEvaluation);
        });

        if (remote.length > 0) {
          storageService.setItem('academic_evaluations_' + studentId, remote);
          return remote;
        }
      } catch (err) {
        console.warn('[academicService] Error al obtener evaluaciones:', err);
      }
    }

    return local;
  },

  // Obtener todas las evaluaciones (Solo Administrador)
  async getAllEvaluations(): Promise<AcademicEvaluation[]> {
    if (!isLocalMockMode && db) {
      try {
        const evalsCol = collection(db, 'evaluations');
        const snapshot = await getDocs(evalsCol);
        const list: AcademicEvaluation[] = [];
        snapshot.forEach(docSnap => {
          list.push(docSnap.data() as AcademicEvaluation);
        });
        return list;
      } catch (err) {
        console.warn('[academicService] Error al obtener lista completa de evaluaciones:', err);
      }
    }
    // Fallback local
    return storageService.getItem<AcademicEvaluation[]>('academic_evaluations_all', []);
  },

  // ─── 3. OBSERVACIONES DOCENTES ───

  async saveObservation(obs: TeacherObservation): Promise<void> {
    const list = storageService.getItem<TeacherObservation[]>('teacher_observations', []);
    const idx = list.findIndex(o => o.obsId === obs.obsId);
    if (idx >= 0) {
      list[idx] = obs;
    } else {
      list.push(obs);
    }
    storageService.setItem('teacher_observations', list);

    if (!isLocalMockMode && db) {
      try {
        const obsRef = doc(db, 'observations', obs.obsId);
        await setDoc(obsRef, obs, { merge: true });
      } catch (err) {
        console.warn('[academicService] Error al guardar observación en Firestore:', err);
      }
    }
  },

  async getObservations(studentId?: string): Promise<TeacherObservation[]> {
    if (!isLocalMockMode && db) {
      try {
        const obsCol = collection(db, 'observations');
        const snapshot = await getDocs(obsCol);
        const list: TeacherObservation[] = [];
        snapshot.forEach(docSnap => {
          const item = docSnap.data() as TeacherObservation;
          if (!studentId || item.studentId === studentId) {
            list.push(item);
          }
        });
        storageService.setItem('teacher_observations', list);
        return list;
      } catch (err) {
        console.warn('[academicService] Error al obtener observaciones:', err);
      }
    }

    const local = storageService.getItem<TeacherObservation[]>('teacher_observations', []);
    return studentId ? local.filter(o => o.studentId === studentId) : local;
  },

  // ─── 4. OPINIONES DE ACTIVIDAD ───

  async saveActivityOpinion(opinion: ActivityOpinion): Promise<void> {
    const list = storageService.getItem<ActivityOpinion[]>('activity_opinions', []);
    list.push(opinion);
    storageService.setItem('activity_opinions', list);

    if (!isLocalMockMode && db) {
      try {
        const ref = doc(db, 'studentFeedback', opinion.opinionId);
        await setDoc(ref, opinion);
      } catch (err) {
        console.warn('[academicService] Error al guardar opinión:', err);
      }
    }
  },

  async getAllOpinions(): Promise<ActivityOpinion[]> {
    if (!isLocalMockMode && db) {
      try {
        const ref = collection(db, 'studentFeedback');
        const snapshot = await getDocs(ref);
        const list: ActivityOpinion[] = [];
        snapshot.forEach(docSnap => {
          list.push(docSnap.data() as ActivityOpinion);
        });
        return list;
      } catch (err) {
        console.warn('[academicService] Error al consultar opiniones:', err);
      }
    }
    return storageService.getItem<ActivityOpinion[]>('activity_opinions', []);
  },

  // ─── 5. MOTOR DE CÁLCULO DE INDICADORES EDUCATIVOS ───

  calculateEducationalIndicators(
    student: UserProfile,
    attempts: ExerciseAttempt[],
    evaluations: AcademicEvaluation[],
    progressMap: Record<string, LessonProgress>,
    pathFilter?: LearningPath
  ): EducationalIndicators {
    // Filtrar intentos por ruta si se especifica
    const filteredAttempts = pathFilter
      ? attempts.filter(a => a.pathId === pathFilter)
      : attempts;

    // 1. Días activos (Días únicos con al menos una actividad respondida)
    const uniqueDays = new Set(
      filteredAttempts.map(a => new Date(a.timestamp).toISOString().split('T')[0])
    );
    const activeDaysCount = uniqueDays.size;

    // 2. Sesiones de práctica únicas
    const uniqueSessions = new Set(filteredAttempts.map(a => a.sessionId).filter(Boolean));
    const practiceSessionsCount = Math.max(uniqueSessions.size, activeDaysCount > 0 ? 1 : 0);

    // 3. Tiempo activo estimado en minutos
    const estimatedActiveTimeMinutes = Math.round((student.totalActiveTimeSeconds || 0) / 60);

    // 4. Actividades distintas trabajadas
    const distinctActivitiesWorkedSet = new Set(filteredAttempts.map(a => a.activityId));
    const distinctActivitiesAttempted = distinctActivitiesWorkedSet.size;

    // 5. Actividades distintas completadas (con al menos un intento correcto)
    const distinctCompletedSet = new Set(
      filteredAttempts.filter(a => a.status === 'correct').map(a => a.activityId)
    );
    const distinctActivitiesCompleted = distinctCompletedSet.size;

    // 6. Lecciones completadas en la ruta
    const pathLessons = Object.values(progressMap).filter(p => !pathFilter || p.pathId === pathFilter);
    const lessonsCompleted = pathLessons.length;
    // Un módulo se considera completado si se completaron sus lecciones (estimado cada 2 lecciones por unidad)
    const modulesCompleted = Math.floor(lessonsCompleted / 2);

    // 7. Conteo de respuestas
    const totalAttempts = filteredAttempts.length;
    const correctAnswersCount = filteredAttempts.filter(a => a.status === 'correct').length;
    const incorrectAnswersCount = filteredAttempts.filter(a => a.status === 'incorrect').length;
    const pendingReviewCount = filteredAttempts.filter(a => a.status === 'pending_review').length;

    // 8. Porcentaje de aciertos al primer intento (attemptNumber === 1)
    const firstAttempts = filteredAttempts.filter(a => a.attemptNumber === 1);
    const firstAttemptCorrect = firstAttempts.filter(a => a.status === 'correct').length;
    const firstAttemptAccuracyPercent = firstAttempts.length > 0
      ? Math.round((firstAttemptCorrect / firstAttempts.length) * 100)
      : null;

    // 9. Porcentaje de aciertos sobre respuestas calificadas (excluyendo pendientes)
    const qualifiedCount = correctAnswersCount + incorrectAnswersCount;
    const qualifiedAccuracyPercent = qualifiedCount > 0
      ? Math.round((correctAnswersCount / qualifiedCount) * 100)
      : null;

    // 10. Intentos por actividad promedio
    const attemptsPerActivityAverage = distinctActivitiesAttempted > 0
      ? Number((totalAttempts / distinctActivitiesAttempted).toFixed(2))
      : null;

    // 11. Progreso de la ruta en porcentaje
    const totalPathLessons = pathFilter === 'sql' ? 24 : 30;
    const pathProgressPercent = Math.min(100, Math.round((lessonsCompleted / totalPathLessons) * 100));

    // 12. Diagnóstico y Prueba Final
    const pathEvals = evaluations.filter(e => !pathFilter || e.pathId === pathFilter);
    const diagnosticEval = pathEvals.find(e => e.type === 'diagnostic' && e.isOfficial)
      || pathEvals.find(e => e.type === 'diagnostic');
    const finalEval = pathEvals.find(e => e.type === 'final' && e.isOfficial)
      || pathEvals.find(e => e.type === 'final');

    const diagnosticPercentage = (diagnosticEval && diagnosticEval.status === 'graded')
      ? diagnosticEval.percentage
      : null;

    const finalTestPercentage = (finalEval && finalEval.status === 'graded')
      ? finalEval.percentage
      : null;

    // Ganancia en puntos porcentuales (Final - Diagnóstico)
    const percentagePointGain = (diagnosticPercentage !== null && finalTestPercentage !== null)
      ? Number((finalTestPercentage - diagnosticPercentage).toFixed(2))
      : null;

    // 13. Conteo de pistas y comodines utilizados (Autonomía de resolución)
    const hintsUsedCount = filteredAttempts.filter(a => a.hintUsed).length;

    // 14. Métricas semanales (últimos 7 días)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weeklyAttempts = filteredAttempts.filter(a => a.timestamp >= sevenDaysAgo);
    const weeklySessionsSet = new Set(weeklyAttempts.map(a => a.sessionId).filter(Boolean));
    const weeklySessionsCount = weeklySessionsSet.size;
    // Estimación proporcional de minutos en la semana o mínimo de sesiones * 8 min
    const weeklyActiveMinutes = weeklyAttempts.length > 0
      ? Math.max(Math.round(weeklyAttempts.length * 1.5), weeklySessionsCount * 6)
      : 0;

    // 15. Ejercicios pendientes
    const pendingExercisesCount = Math.max(0, totalPathLessons - lessonsCompleted);

    // 16. Desglose y Errores por tema (Qué contenidos necesita reforzar)
    const topicBreakdown: Record<string, { attempts: number; correct: number; scorePercent: number | null }> = {};
    const errorsByTopic: Record<string, number> = {};
    const progressByTopic: Record<string, { completed: number; total: number }> = {};

    filteredAttempts.forEach(a => {
      const topicName = a.theme || 'Fundamentos';
      if (!topicBreakdown[topicName]) {
        topicBreakdown[topicName] = { attempts: 0, correct: 0, scorePercent: null };
      }
      topicBreakdown[topicName].attempts += 1;
      if (a.status === 'correct') {
        topicBreakdown[topicName].correct += 1;
      } else if (a.status === 'incorrect') {
        errorsByTopic[topicName] = (errorsByTopic[topicName] || 0) + 1;
      }
    });

    Object.keys(topicBreakdown).forEach(topic => {
      const item = topicBreakdown[topic];
      item.scorePercent = item.attempts > 0
        ? Math.round((item.correct / item.attempts) * 100)
        : null;
      progressByTopic[topic] = {
        completed: item.correct,
        total: item.attempts
      };
    });

    const level = Math.floor((student.totalXp || 0) / 100) + 1;

    return {
      studentCode: student.studentCode || 'E01',
      displayName: student.displayName,
      group: student.group || 'Grupo A',
      pathId: pathFilter || student.currentPath,
      isResearchParticipant: Boolean(student.isResearchParticipant),
      activeDaysCount,
      practiceSessionsCount,
      estimatedActiveTimeMinutes,
      weeklyActiveMinutes,
      weeklySessionsCount,
      distinctActivitiesAttempted,
      distinctActivitiesCompleted,
      pendingExercisesCount,
      lessonsCompleted,
      modulesCompleted,
      totalAttempts,
      correctAnswersCount,
      incorrectAnswersCount,
      pendingReviewCount,
      firstAttemptAccuracyPercent,
      qualifiedAccuracyPercent,
      attemptsPerActivityAverage,
      hintsUsedCount,
      currentLevel: level,
      pathProgressPercent,
      diagnosticPercentage,
      finalTestPercentage,
      percentagePointGain,
      topicBreakdown,
      errorsByTopic,
      progressByTopic
    };
  },

  // ─── 6. ASIGNACIÓN DE DIAGNÓSTICOS POR EL PROFESOR (josephcarazo56@gmail.com) ───

  // Asignar un diagnóstico a todos o a estudiantes específicos
  async assignDiagnostic(
    instrumentId: string,
    pathId: LearningPath,
    title: string,
    assignedToUids: string[] = ['all']
  ): Promise<any> {
    const assignmentId = `assign_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newAssignment = {
      assignmentId,
      instrumentId,
      pathId,
      title,
      assignedBy: 'josephcarazo56@gmail.com',
      assignedToUids,
      createdAt: Date.now(),
      completedByUids: []
    };

    const localAssignments = storageService.getItem<any[]>('academic_diagnostic_assignments', []);
    localAssignments.unshift(newAssignment);
    storageService.setItem('academic_diagnostic_assignments', localAssignments);

    if (!isLocalMockMode && db) {
      try {
        const assignRef = doc(db, 'diagnostic_assignments', assignmentId);
        await setDoc(assignRef, newAssignment);
      } catch (err) {
        console.warn('[academicService] Guardado de asignación en caché local:', err);
      }
    }

    return newAssignment;
  },

  // Obtener todas las asignaciones realizadas por el profesor
  async getAllAssignments(): Promise<any[]> {
    if (!isLocalMockMode && db) {
      try {
        const col = collection(db, 'diagnostic_assignments');
        const snapshot = await getDocs(col);
        const list: any[] = [];
        snapshot.forEach(d => list.push(d.data()));
        if (list.length > 0) {
          list.sort((a, b) => b.createdAt - a.createdAt);
          storageService.setItem('academic_diagnostic_assignments', list);
          return list;
        }
      } catch (err) {
        console.warn('[academicService] Error al obtener asignaciones de Firestore:', err);
      }
    }
    return storageService.getItem<any[]>('academic_diagnostic_assignments', []);
  },

  // Comprobar si un estudiante tiene un diagnóstico pendiente asignado por el profesor
  async getPendingDiagnosticForStudent(studentUid: string): Promise<any | null> {
    if (!studentUid || studentUid === 'guest_user_1') return null;

    const allAssignments = await this.getAllAssignments();
    // Buscar la asignación más reciente que aplique a este estudiante y que aún no haya completado
    for (const assign of allAssignments) {
      const isTarget = assign.assignedToUids.includes('all') || assign.assignedToUids.includes(studentUid);
      const isCompleted = (assign.completedByUids || []).includes(studentUid);

      if (isTarget && !isCompleted) {
        return assign;
      }
    }

    return null;
  },

  // Marcar asignación diagnóstica como completada por el estudiante
  async markDiagnosticCompleted(assignmentId: string, studentUid: string): Promise<void> {
    const assignments = await this.getAllAssignments();
    const target = assignments.find(a => a.assignmentId === assignmentId);
    if (!target) return;

    if (!target.completedByUids) target.completedByUids = [];
    if (!target.completedByUids.includes(studentUid)) {
      target.completedByUids.push(studentUid);
    }

    storageService.setItem('academic_diagnostic_assignments', assignments);

    if (!isLocalMockMode && db) {
      try {
        const ref = doc(db, 'diagnostic_assignments', assignmentId);
        await setDoc(ref, target, { merge: true });
      } catch (err) {
        console.warn('[academicService] Error actualizando entrega de asignación:', err);
      }
    }
  }
};
