import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EducationalIndicators, TeacherObservation } from '../types/academic';
import { UserProfile } from '../types/user';

export interface PdfExportOptions {
  student: UserProfile;
  indicators: EducationalIndicators;
  observations: TeacherObservation[];
  anonymize: boolean; // Si es true, oculta el nombre y solo muestra studentCode (ej. E01) para tesis/publicación
  periodLabel?: string;
}

export const pdfExportService = {
  generateStudentReport(options: PdfExportOptions): void {
    const { student, indicators, observations, anonymize, periodLabel } = options;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor: [number, number, number] = [30, 41, 59]; // slate-800

    // Encabezado
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 26, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('PROGRAAPP — INFORME DE SEGUIMIENTO ACADÉMICO', 14, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Plataforma Gamificada de Aprendizaje de Programación | Registro de Investigación', 14, 18);

    // Metadatos del Estudiante
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    const displayName = anonymize ? `Estudiante [${indicators.studentCode}]` : student.displayName;
    const dateStr = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    autoTable(doc, {
      startY: 32,
      theme: 'plain',
      body: [
        [
          { content: 'Código Estudiante:', styles: { fontStyle: 'bold', cellWidth: 35 } },
          indicators.studentCode,
          { content: 'Fecha Emisión:', styles: { fontStyle: 'bold', cellWidth: 30 } },
          dateStr
        ],
        [
          { content: 'Identificación:', styles: { fontStyle: 'bold' } },
          displayName,
          { content: 'Período:', styles: { fontStyle: 'bold' } },
          periodLabel || 'Semestre 2026 - Actual'
        ],
        [
          { content: 'Grupo Asignado:', styles: { fontStyle: 'bold' } },
          indicators.group,
          { content: 'Ruta de Aprendizaje:', styles: { fontStyle: 'bold' } },
          indicators.pathId.toUpperCase()
        ]
      ],
      styles: { fontSize: 9, cellPadding: 2 }
    });

    const currentY = (doc as any).lastAutoTable.finalY + 6;

    // Sección 1: Indicadores Globales de Participación y Tiempo Activo
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 182, 212);
    doc.text('1. PARTICIPACIÓN Y TIEMPO ACTIVO ESTIMADO', 14, currentY);

    autoTable(doc, {
      startY: currentY + 3,
      head: [['Métrica', 'Valor Observado', 'Criterio / Denominador']],
      body: [
        ['Tiempo Activo Estimado', `${indicators.estimatedActiveTimeMinutes} minutos`, 'Tiempo con interacción constante en lecciones (pausa a los 60s)'],
        ['Días de Actividad Real', `${indicators.activeDaysCount} días`, 'Días únicos con al menos una respuesta interactiva enviada'],
        ['Sesiones de Práctica', `${indicators.practiceSessionsCount} sesiones`, 'Bloques diferenciados de estudio registrados'],
        ['Lecciones Completadas', `${indicators.lessonsCompleted} lecciones`, 'Lecciones con práctica obligatoria finalizada'],
        ['Progreso de la Ruta', `${indicators.pathProgressPercent}%`, 'Porcentaje de avance en el currículo de la ruta'],
        ['Total de Respuestas Enviadas', `${indicators.totalAttempts} intentos`, 'Conteo acumulado de intentos (correctos e incorrectos)'],
        ['Efectividad al Primer Intento', indicators.firstAttemptAccuracyPercent !== null ? `${indicators.firstAttemptAccuracyPercent}%` : 'Sin datos', 'Porcentaje de aciertos en el intento 1 de cada ejercicio'],
        ['Efectividad Calificada Global', indicators.qualifiedAccuracyPercent !== null ? `${indicators.qualifiedAccuracyPercent}%` : 'Sin datos', 'Aciertos sobre el total de respuestas calificadas']
      ],
      styles: { fontSize: 8, cellPadding: 2.5 },
      headStyles: { fillColor: primaryColor, textColor: 255 }
    });

    const currentY2 = (doc as any).lastAutoTable.finalY + 6;

    // Sección 2: Comparación Diagnóstica y Final
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 182, 212);
    doc.text('2. EVALUACIÓN Y GANANCIA DE APRENDIZAJE (DIAGNÓSTICO VS FINAL)', 14, currentY2);

    const diagText = indicators.diagnosticPercentage !== null ? `${indicators.diagnosticPercentage}%` : 'Sin datos';
    const finText = indicators.finalTestPercentage !== null ? `${indicators.finalTestPercentage}%` : 'Sin datos';
    const gainText = indicators.percentagePointGain !== null
      ? `${indicators.percentagePointGain > 0 ? '+' : ''}${indicators.percentagePointGain} pts %`
      : 'Sin datos (requiere ambas pruebas)';

    autoTable(doc, {
      startY: currentY2 + 3,
      head: [['Instrumento Oficial', 'Calificación (%)', 'Estado de Comparación']],
      body: [
        ['Evaluación Diagnóstica Inicial', diagText, indicators.diagnosticPercentage !== null ? 'Evaluada' : 'Pendiente'],
        ['Prueba Final Oficial', finText, indicators.finalTestPercentage !== null ? 'Evaluada' : 'Pendiente'],
        ['Ganancia Neta Observada', gainText, 'Diferencia en puntos porcentuales entre Final y Diagnóstico']
      ],
      styles: { fontSize: 8.5, cellPadding: 2.5 },
      headStyles: { fillColor: primaryColor, textColor: 255 }
    });

    const currentY3 = (doc as any).lastAutoTable.finalY + 6;

    // Sección 3: Desglose por Tema
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 182, 212);
    doc.text('3. DESEMPEÑO POR TEMA O CONCEPTO', 14, currentY3);

    const topicRows = Object.keys(indicators.topicBreakdown).map(topic => {
      const item = indicators.topicBreakdown[topic];
      return [
        topic,
        `${item.attempts} intentos`,
        `${item.correct} aciertos`,
        item.scorePercent !== null ? `${item.scorePercent}%` : 'Sin datos'
      ];
    });

    autoTable(doc, {
      startY: currentY3 + 3,
      head: [['Tema Evaluado', 'Total Intentos', 'Aciertos', 'Porcentaje de Logro']],
      body: topicRows.length > 0 ? topicRows : [['No se registran datos temáticos en el período', '-', '-', '-']],
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: primaryColor, textColor: 255 }
    });

    const currentY4 = (doc as any).lastAutoTable.finalY + 6;

    // Sección 4: Observaciones Docentes
    if (currentY4 < 250) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(6, 182, 212);
      doc.text('4. OBSERVACIONES Y APOYO DOCENTE BRINDADO', 14, currentY4);

      const obsBody = observations.map(o => [
        o.date,
        o.observedDifficulty,
        o.supportGiven,
        o.teacherComment
      ]);

      autoTable(doc, {
        startY: currentY4 + 3,
        head: [['Fecha', 'Dificultad Observada', 'Apoyo Brindado', 'Comentario Pedagógico']],
        body: obsBody.length > 0 ? obsBody : [['Sin observaciones registradas para este estudiante', '-', '-', '-']],
        styles: { fontSize: 7.5, cellPadding: 2 },
        headStyles: { fillColor: primaryColor, textColor: 255 }
      });
    }

    // Pie de página
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `Página ${i} de ${totalPages} — PrograApp Seguimiento Académico | Reporte Confidencial`,
        14,
        290
      );
    }

    const filename = anonymize
      ? `informe_${indicators.studentCode}_${new Date().toISOString().split('T')[0]}.pdf`
      : `informe_${student.displayName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

    doc.save(filename);
  }
};
