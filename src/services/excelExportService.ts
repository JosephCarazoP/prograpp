import * as XLSX from 'xlsx';
import {
  EducationalIndicators,
  ExerciseAttempt,
  AcademicEvaluation,
  TeacherObservation,
  ActivityOpinion
} from '../types/academic';
import { UserProfile, LearningPath } from '../types/user';
import { LessonProgress } from '../types/progress';

// Sanitizar respuestas de usuario para evitar inyecciones de fórmulas ejecutables en hojas de cálculo
function sanitizeCellText(val: any): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (/^[=+@\-]/.test(str)) {
    return "'" + str;
  }
  return str;
}

export interface ExcelExportPayload {
  students: UserProfile[];
  indicatorsList: EducationalIndicators[];
  attempts: ExerciseAttempt[];
  evaluations: AcademicEvaluation[];
  progressMapByUser: Record<string, Record<string, LessonProgress>>;
  observations: TeacherObservation[];
  opinions: ActivityOpinion[];
  selectedPath?: LearningPath;
  targetFilename?: string;
}

export const excelExportService = {
  exportToExcel(payload: ExcelExportPayload): void {
    const wb = XLSX.utils.book_new();

    // ─── HOJA 1: RESUMEN ───
    const summaryRows = payload.indicatorsList.map(ind => ({
      'Código Estudiante': ind.studentCode,
      'Nombre': ind.displayName,
      'Grupo': ind.group,
      'Ruta': ind.pathId.toUpperCase(),
      'Participante Investigación': ind.isResearchParticipant ? 'SÍ' : 'NO',
      'Nivel Actual': ind.currentLevel,
      'Días Activos': ind.activeDaysCount,
      'Sesiones Práctica': ind.practiceSessionsCount,
      'Tiempo Activo Estimado (min)': ind.estimatedActiveTimeMinutes,
      'Lecciones Completadas': ind.lessonsCompleted,
      'Módulos Completados': ind.modulesCompleted,
      'Progreso Ruta (%)': ind.pathProgressPercent,
      'Total Intentos': ind.totalAttempts,
      'Aciertos 1er Intento (%)': ind.firstAttemptAccuracyPercent !== null ? ind.firstAttemptAccuracyPercent : 'Sin datos',
      'Efectividad Calificada (%)': ind.qualifiedAccuracyPercent !== null ? ind.qualifiedAccuracyPercent : 'Sin datos',
      'Promedio Intentos/Actividad': ind.attemptsPerActivityAverage !== null ? ind.attemptsPerActivityAverage : 'Sin datos',
      'Diagnóstico (%)': ind.diagnosticPercentage !== null ? ind.diagnosticPercentage : 'Sin datos',
      'Prueba Final (%)': ind.finalTestPercentage !== null ? ind.finalTestPercentage : 'Sin datos',
      'Ganancia Neta (pts %)': ind.percentagePointGain !== null ? ind.percentagePointGain : 'Sin datos'
    }));
    const wsSummary = XLSX.utils.json_to_sheet(summaryRows);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumen');

    // ─── HOJA 2: EVALUACIONES ───
    const evalRows = payload.evaluations.map(ev => ({
      'ID Evaluación': ev.evalId,
      'Código Estudiante': ev.studentCode,
      'Ruta': ev.pathId.toUpperCase(),
      'Tipo': ev.type === 'diagnostic' ? 'Diagnóstico' : 'Prueba Final',
      'Instrumento': ev.instrumentId,
      'Versión': ev.instrumentVersion,
      'Oficial': ev.isOfficial ? 'SÍ' : 'NO',
      'Estado': ev.status === 'graded' ? 'Calificada' : 'Pendiente de Revisión',
      'Puntaje Obtenido': ev.totalScore,
      'Puntaje Máximo': ev.maxScore,
      'Porcentaje (%)': ev.percentage !== null ? ev.percentage : 'Sin datos',
      'Fecha Inicio': new Date(ev.startedAt).toLocaleString(),
      'Fecha Entrega': ev.submittedAt ? new Date(ev.submittedAt).toLocaleString() : 'En curso',
      'Calificado Por': ev.gradedBy || 'Automático',
      'Es Externa': ev.isExternal ? 'SÍ' : 'NO',
      'Fecha Externa': ev.externalDate || ''
    }));
    const wsEvals = XLSX.utils.json_to_sheet(evalRows);
    XLSX.utils.book_append_sheet(wb, wsEvals, 'Evaluaciones');

    // ─── HOJA 3: INTENTOS (Una fila por intento con respuestas sanitizadas) ───
    const attemptRows = payload.attempts.map(att => ({
      'ID Intento': att.attemptId,
      'Código Estudiante': att.studentCode,
      'Ruta': att.pathId.toUpperCase(),
      'Unidad': att.unitId,
      'Lección': att.lessonId,
      'Actividad': att.activityId,
      'Versión Contenido': att.contentVersion,
      'Tema': att.theme,
      'Dificultad': att.difficulty,
      'N° Intento': att.attemptNumber,
      'Respuesta Enviada': sanitizeCellText(att.userAnswer),
      'Estado': att.status,
      'Puntaje Obtenido': att.score,
      'Puntaje Máximo': att.maxScore,
      'Comodín/Pista Usada': att.hintUsed ? 'SÍ' : 'NO',
      'Fecha y Hora': new Date(att.timestamp).toLocaleString(),
      'Sincronizado Offline': att.isOfflineSync ? 'SÍ' : 'NO'
    }));
    const wsAttempts = XLSX.utils.json_to_sheet(attemptRows);
    XLSX.utils.book_append_sheet(wb, wsAttempts, 'Intentos');

    // ─── HOJA 4: PROGRESO ───
    const progressRows: any[] = [];
    payload.students.forEach(st => {
      const userProg = payload.progressMapByUser[st.uid] || {};
      Object.values(userProg).forEach(prog => {
        progressRows.push({
          'Código Estudiante': st.studentCode || 'E01',
          'Nombre': st.displayName,
          'Ruta': prog.pathId.toUpperCase(),
          'Unidad': prog.unitId,
          'Lección': prog.lessonId,
          'Nivel': prog.levelId,
          'Estrellas': prog.starsEarned,
          'Intentos Realizados': prog.attempts,
          'Errores Cometidos': prog.mistakesCount,
          'Porcentaje Efectividad (%)': prog.scorePercentage,
          'Fecha Completada': prog.completedAt ? new Date(prog.completedAt).toLocaleString() : 'Pendiente'
        });
      });
    });
    const wsProgress = XLSX.utils.json_to_sheet(progressRows);
    XLSX.utils.book_append_sheet(wb, wsProgress, 'Progreso');

    // ─── HOJA 5: PARTICIPACIÓN ───
    const partRows = payload.students.map(st => ({
      'Código Estudiante': st.studentCode || 'E01',
      'Nombre': st.displayName,
      'Grupo': st.group || 'Grupo A',
      'Total XP': st.totalXp,
      'Monedas / Bytes': st.bytes,
      'Racha Actual (Días)': st.streak?.count || 1,
      'Liga': st.currentLeague,
      'Cofres Abiertos': st.openedChests?.length || 0,
      'Jefes Derrotados': st.defeatedBosses?.length || 0,
      'Fecha Creación Cuenta': new Date(st.createdAt).toLocaleDateString(),
      'Tiempo Activo Estimado (min)': Math.round((st.totalActiveTimeSeconds || 0) / 60)
    }));
    const wsPart = XLSX.utils.json_to_sheet(partRows);
    XLSX.utils.book_append_sheet(wb, wsPart, 'Participación');

    // ─── HOJA 6: OBSERVACIONES Y OPINIONES ───
    const obsRows = payload.observations.map(o => ({
      'Tipo Registro': 'Observación Docente',
      'Código Estudiante': o.studentCode,
      'Fecha': o.date,
      'Dificultad Observada': o.observedDifficulty,
      'Apoyo Brindado': o.supportGiven,
      'Comentario': sanitizeCellText(o.teacherComment),
      'Fecha Registro': new Date(o.createdAt).toLocaleString()
    }));
    const opRows = payload.opinions.map(op => ({
      'Tipo Registro': 'Opinión de Estudiante',
      'Código Estudiante': op.studentCode,
      'Fecha': new Date(op.createdAt).toLocaleDateString(),
      'Dificultad Observada': `Claridad: ${op.instructionClarity}/5, Utilidad: ${op.perceivedUtility}/5`,
      'Apoyo Brindado': op.usageDifficulties,
      'Comentario': sanitizeCellText(op.optionalComment || ''),
      'Fecha Registro': new Date(op.createdAt).toLocaleString()
    }));
    const wsObs = XLSX.utils.json_to_sheet([...obsRows, ...opRows]);
    XLSX.utils.book_append_sheet(wb, wsObs, 'Observaciones y opiniones');

    // ─── HOJA 7: DEFINICIONES DE INDICADORES ───
    const dictRows = [
      {
        'Indicador': 'Días Activos',
        'Denominador / Criterio': 'Conteo de días calendario distintos en los que el estudiante envió al menos una respuesta interactiva a una actividad.'
      },
      {
        'Indicador': 'Sesiones de Práctica',
        'Denominador / Criterio': 'Conteo de identificadores de sesión distintos donde hubo interacciones de práctica o evaluación.'
      },
      {
        'Indicador': 'Tiempo Activo Estimado (min)',
        'Denominador / Criterio': 'Suma en segundos de interacción activa (teclado, ratón o toque en lección) pausado si la pestaña pasa a segundo plano o tras 60s de inactividad.'
      },
      {
        'Indicador': 'Lecciones Completadas',
        'Denominador / Criterio': 'Conteo de lecciones donde el estudiante entregó la totalidad de la práctica obligatoria requerida por el módulo.'
      },
      {
        'Indicador': 'Aciertos 1er Intento (%)',
        'Denominador': 'Total de primeros intentos respondidos (attemptNumber == 1)',
        'Criterio': '(Primeros intentos correctos / Total de primeros intentos) * 100.'
      },
      {
        'Indicador': 'Efectividad Calificada (%)',
        'Denominador': 'Total de respuestas con estado "correct" o "incorrect" (excluye respuestas pendientes de calificación)',
        'Criterio': '(Respuestas correctas / Respuestas calificadas) * 100.'
      },
      {
        'Indicador': 'Ganancia Neta (pts %)',
        'Denominador / Criterio': 'Diferencia en puntos porcentuales entre la Prueba Final oficial y la Evaluación Diagnóstica oficial (Final % - Diagnóstico %). Requiere ambos instrumentos calificados.'
      },
      {
        'Indicador': 'Sin datos',
        'Denominador / Criterio': 'Indica que el estudiante no ha presentado la evaluación correspondiente. No se imputa con valor 0 para no sesgar las medias de investigación.'
      }
    ];
    const wsDict = XLSX.utils.json_to_sheet(dictRows);
    XLSX.utils.book_append_sheet(wb, wsDict, 'Definiciones de indicadores');

    // Generar archivo y disparar descarga
    const filename = payload.targetFilename || `seguimiento_academico_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
  }
};
