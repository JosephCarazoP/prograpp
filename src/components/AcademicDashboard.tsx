import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  Users,
  UserCheck,
  Search,
  BarChart3,
  Award,
  Edit3,
  PlusCircle,
  X,
  ArrowLeft,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  CheckSquare,
  Square,
  Target,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { UserProfile, LearningPath } from '../types/user';
import {
  EducationalIndicators,
  ExerciseAttempt,
  AcademicEvaluation,
  TeacherObservation,
  ActivityOpinion,
  DiagnosticAssignment
} from '../types/academic';
import {
  KOTLIN_DIAGNOSTICS_LIST,
  SQL_DIAGNOSTICS_LIST,
  ALL_DIAGNOSTIC_INSTRUMENTS
} from '../content/academicEvaluations';
import { adminSecurityService } from '../services/adminSecurityService';
import { academicService } from '../services/academicService';
import { userService } from '../services/userService';
import { progressService } from '../services/progressService';
import { excelExportService } from '../services/excelExportService';
import { pdfExportService } from '../services/pdfExportService';
import { soundService } from '../services/soundService';
import { DevAvatar } from './Avatars';

interface AcademicDashboardProps {
  currentUser: UserProfile;
  onBack: () => void;
}

export const AcademicDashboard: React.FC<AcademicDashboardProps> = ({ currentUser, onBack }) => {
  // Estado de sesión docente en el panel
  const [isUnlocked, setIsUnlocked] = useState(adminSecurityService.isSessionUnlocked());

  // Pestañas del Panel
  const [activeTab, setActiveTab] = useState<'group' | 'student' | 'assignDiagnostic' | 'evaluations' | 'attempts' | 'observations'>('group');

  // Datos del Panel
  const [loadingData, setLoadingData] = useState(false);
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [evaluations, setEvaluations] = useState<AcademicEvaluation[]>([]);
  const [observations, setObservations] = useState<TeacherObservation[]>([]);
  const [opinions, setOpinions] = useState<ActivityOpinion[]>([]);
  const [progressMapByUser, setProgressMapByUser] = useState<Record<string, Record<string, any>>>({});
  const [assignments, setAssignments] = useState<DiagnosticAssignment[]>([]);

  // Estados para Asignación de Diagnósticos por el Docente
  const [selectedDiagPath, setSelectedDiagPath] = useState<'kotlin' | 'sql'>('kotlin');
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string>(KOTLIN_DIAGNOSTICS_LIST[0].instrumentId);
  const [targetMode, setTargetMode] = useState<'all' | 'specific'>('all');
  const [selectedStudentUids, setSelectedStudentUids] = useState<string[]>([]);
  const [assignmentNotice, setAssignmentNotice] = useState<string>('El profesor te ha enviado un diagnóstico obligatorio. Debes completarlo para continuar.');
  const [assignSuccessMsg, setAssignSuccessMsg] = useState<string>('');
  const [assignLoading, setAssignLoading] = useState<boolean>(false);

  // Filtros y Modo de Vista
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedPath, setSelectedPath] = useState<LearningPath | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentUid, setSelectedStudentUid] = useState<string | null>(null);
  const [groupViewMode, setGroupViewMode] = useState<'cards' | 'table'>('cards');
  const [statusFilter, setStatusFilter] = useState<'all' | 'evaluated' | 'pending' | 'participants'>('all');

  // Modal para agregar observación docente
  const [showObsModal, setShowObsModal] = useState(false);
  const [obsStudentUid, setObsStudentUid] = useState('');
  const [obsDifficulty, setObsDifficulty] = useState('');
  const [obsSupport, setObsSupport] = useState('');
  const [obsComment, setObsComment] = useState('');

  // Modal para registrar diagnóstico externo (aplicado fuera de la app)
  const [showExternalEvalModal, setShowExternalEvalModal] = useState(false);
  const [extEvalStudentUid, setExtEvalStudentUid] = useState('');
  const [extEvalPath, setExtEvalPath] = useState<LearningPath>('kotlin');
  const [extEvalScore, setExtEvalScore] = useState(20);
  const [extEvalMaxScore, setExtEvalMaxScore] = useState(25);
  const [extEvalDate, setExtEvalDate] = useState(new Date().toISOString().split('T')[0]);

  // Modal para calificar pregunta abierta
  const [editingEval, setEditingEval] = useState<AcademicEvaluation | null>(null);
  const [manualScores, setManualScores] = useState<Record<string, number>>({});
  const [manualComments, setManualComments] = useState<Record<string, string>>({});

  // Opciones de exportación
  const [anonymizePdf, setAnonymizePdf] = useState(false);

  // 1. Comprobar estado de sesión docente al cargar
  useEffect(() => {
    setIsUnlocked(adminSecurityService.isSessionUnlocked());
  }, []);

  // 2. Cargar todos los datos cuando se desbloquea
  useEffect(() => {
    if (isUnlocked) {
      loadAllAcademicData();
    }
  }, [isUnlocked]);

  const loadAllAcademicData = async () => {
    setLoadingData(true);
    try {
      const studentList = await userService.getAllStudents();
      setStudents(studentList);

      const allAtts = await academicService.getAllAttempts(studentList);
      setAttempts(allAtts);

      const allEvals = await academicService.getAllEvaluations();
      setEvaluations(allEvals);

      const allObs = await academicService.getObservations();
      setObservations(allObs);

      const allOps = await academicService.getAllOpinions();
      setOpinions(allOps);

      const allAss = await academicService.getAllAssignments();
      setAssignments(allAss);

      // Cargar mapa de progresos
      const pMap: Record<string, Record<string, any>> = {};
      for (const st of studentList) {
        pMap[st.uid] = await progressService.getAllProgress(st.uid);
      }
      setProgressMapByUser(pMap);

      if (studentList.length > 0 && !selectedStudentUid) {
        setSelectedStudentUid(studentList[0].uid);
      }
    } catch (err) {
      console.error('Error al cargar datos académicos:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLockSession = () => {
    soundService.playToken();
    adminSecurityService.lockSession();
    setIsUnlocked(false);
  };

  // 1. Cálculo de indicadores para cada estudiante (100% datos reales)
  const indicatorsMap: Record<string, EducationalIndicators> = {};
  students.forEach(st => {
    const studentAttempts = attempts.filter(a => a.studentId === st.uid);
    const studentEvals = evaluations.filter(e => e.studentId === st.uid);
    const studentProg = progressMapByUser[st.uid] || {};
    indicatorsMap[st.uid] = academicService.calculateEducationalIndicators(
      st,
      studentAttempts,
      studentEvals,
      studentProg,
      selectedPath === 'all' ? undefined : selectedPath
    );
  });

  // 2. Filtrado de estudiantes con distinción clara por estado y búsqueda
  const filteredStudents = students.filter(st => {
    if (selectedGroup !== 'all' && (st.group || 'Grupo A') !== selectedGroup) return false;
    if (selectedPath !== 'all' && st.currentPath !== selectedPath) return false;
    if (statusFilter === 'evaluated' && indicatorsMap[st.uid]?.diagnosticPercentage === null) return false;
    if (statusFilter === 'pending' && indicatorsMap[st.uid]?.diagnosticPercentage !== null) return false;
    if (statusFilter === 'participants' && !st.isResearchParticipant) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const codeMatch = (st.studentCode || '').toLowerCase().includes(term);
      const nameMatch = st.displayName.toLowerCase().includes(term);
      const idMatch = (st.idNumber || '').toLowerCase().includes(term);
      const emailMatch = (st.email || '').toLowerCase().includes(term);
      if (!codeMatch && !nameMatch && !idMatch && !emailMatch) return false;
    }
    return true;
  });

  const selectedStudent = students.find(s => s.uid === selectedStudentUid) || filteredStudents[0] || students[0];
  const selectedStudentIndex = filteredStudents.findIndex(s => s.uid === (selectedStudent?.uid || ''));

  const handlePrevStudent = () => {
    if (filteredStudents.length === 0) return;
    soundService.playToken();
    const prevIdx = selectedStudentIndex > 0 ? selectedStudentIndex - 1 : filteredStudents.length - 1;
    setSelectedStudentUid(filteredStudents[prevIdx].uid);
  };

  const handleNextStudent = () => {
    if (filteredStudents.length === 0) return;
    soundService.playToken();
    const nextIdx = selectedStudentIndex < filteredStudents.length - 1 ? selectedStudentIndex + 1 : 0;
    setSelectedStudentUid(filteredStudents[nextIdx].uid);
  };

  // Guardar Observación Docente
  const handleSaveObservation = async (e: React.FormEvent) => {
    e.preventDefault();
    soundService.playToken();
    const targetStudent = students.find(s => s.uid === obsStudentUid);
    if (!targetStudent) return;

    const newObs: TeacherObservation = {
      obsId: `obs_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      studentId: targetStudent.uid,
      studentCode: targetStudent.studentCode || 'E01',
      date: new Date().toISOString().split('T')[0],
      observedDifficulty: obsDifficulty.trim() || 'Dificultad conceptual',
      supportGiven: obsSupport.trim() || 'Orientación guiada',
      teacherComment: obsComment.trim(),
      createdAt: Date.now()
    };

    await academicService.saveObservation(newObs);
    setObservations(prev => [newObs, ...prev]);
    setShowObsModal(false);
    setObsComment('');
    setObsDifficulty('');
    setObsSupport('');
    soundService.playWin();
  };

  // Registrar Diagnóstico Externo
  const handleSaveExternalEval = async (e: React.FormEvent) => {
    e.preventDefault();
    soundService.playToken();
    const targetStudent = students.find(s => s.uid === extEvalStudentUid);
    if (!targetStudent) return;

    const pct = extEvalMaxScore > 0 ? Math.round((extEvalScore / extEvalMaxScore) * 100) : 0;
    const newEval: AcademicEvaluation = {
      evalId: `ext_diag_${targetStudent.uid}_${Date.now()}`,
      studentId: targetStudent.uid,
      studentCode: targetStudent.studentCode || 'E01',
      pathId: extEvalPath,
      type: 'diagnostic',
      instrumentId: `inst_${extEvalPath}_diag_externo`,
      instrumentVersion: '1.0.0',
      isOfficial: true,
      startedAt: new Date(extEvalDate).getTime(),
      submittedAt: new Date(extEvalDate).getTime(),
      status: 'graded',
      questions: [],
      answers: { external_note: 'Aplicado en formato físico/externo fuera de la app' },
      scores: { total: extEvalScore },
      totalScore: extEvalScore,
      maxScore: extEvalMaxScore,
      percentage: pct,
      isExternal: true,
      externalDate: extEvalDate,
      gradedBy: currentUser.displayName || 'Docente Investigador',
      gradedAt: Date.now()
    };

    await academicService.saveEvaluation(newEval);
    setEvaluations(prev => [newEval, ...prev]);
    setShowExternalEvalModal(false);
    soundService.playWin();
  };

  // Abrir modal de calificación manual
  const handleOpenGrading = (ev: AcademicEvaluation) => {
    soundService.playToken();
    setEditingEval(ev);
    const initialScores: Record<string, number> = { ...(ev.scores || {}) };
    const initialComments: Record<string, string> = {};
    if (ev.manualCriteriaFeedback) {
      Object.keys(ev.manualCriteriaFeedback).forEach(k => {
        initialComments[k] = ev.manualCriteriaFeedback![k].comment;
      });
    }
    setManualScores(initialScores);
    setManualComments(initialComments);
  };

  // Guardar calificación manual
  const handleSaveGrading = async () => {
    if (!editingEval) return;
    soundService.playToken();

    let newTotal = 0;
    const criteriaFeedback: Record<string, { score: number; comment: string }> = {};

    editingEval.questions.forEach(q => {
      const sc = manualScores[q.questionId] !== undefined ? Number(manualScores[q.questionId]) : (editingEval.scores[q.questionId] || 0);
      newTotal += sc;
      criteriaFeedback[q.questionId] = {
        score: sc,
        comment: manualComments[q.questionId] || ''
      };
    });

    const newPct = editingEval.maxScore > 0 ? Math.round((newTotal / editingEval.maxScore) * 100) : 0;

    const updated: AcademicEvaluation = {
      ...editingEval,
      scores: manualScores,
      totalScore: newTotal,
      percentage: newPct,
      status: 'graded',
      gradedBy: currentUser.displayName || 'Docente Investigador',
      gradedAt: Date.now(),
      manualCriteriaFeedback: criteriaFeedback
    };

    await academicService.saveEvaluation(updated);
    setEvaluations(prev => prev.map(e => e.evalId === updated.evalId ? updated : e));
    setEditingEval(null);
    soundService.playWin();
  };

  // Asignar o retirar participante de investigación
  const handleToggleResearchParticipant = async (student: UserProfile) => {
    soundService.playToken();
    const updatedStatus = !student.isResearchParticipant;
    await userService.updateStudentAcademicInfo(student.uid, { isResearchParticipant: updatedStatus });
    setStudents(prev => prev.map(s => s.uid === student.uid ? { ...s, isResearchParticipant: updatedStatus } : s));
  };

  // Gestión de Asignación de Diagnósticos por el Docente
  const handleAssignDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInstrumentId) return;
    setAssignLoading(true);
    setAssignSuccessMsg('');
    soundService.playToken();

    try {
      const inst = ALL_DIAGNOSTIC_INSTRUMENTS.find(i => i.instrumentId === selectedInstrumentId);
      const title = inst ? inst.title : 'Diagnóstico Académico';
      const targetUids = targetMode === 'all' 
        ? ['all'] 
        : selectedStudentUids;

      await academicService.assignDiagnostic(
        selectedInstrumentId,
        selectedDiagPath,
        title,
        targetUids
      );

      soundService.playWin();
      setAssignSuccessMsg(`¡Diagnóstico "${title}" asignado con éxito a ${targetUids.length} estudiante(s)!`);
      const refreshed = await academicService.getAllAssignments();
      setAssignments(refreshed);
    } catch (err) {
      console.error('Error al asignar diagnóstico:', err);
      soundService.playError();
      alert('Ocurrió un error al asignar el diagnóstico.');
    } finally {
      setAssignLoading(false);
    }
  };

  const toggleSelectStudent = (uid: string) => {
    soundService.playToken();
    setSelectedStudentUids(prev => 
      prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
    );
  };

  const selectAllStudents = () => {
    soundService.playToken();
    setSelectedStudentUids(filteredStudents.map(s => s.uid));
  };

  const deselectAllStudents = () => {
    soundService.playToken();
    setSelectedStudentUids([]);
  };

  // Exportar Excel
  const handleExportExcel = () => {
    soundService.playToken();
    const indList = filteredStudents.map(st => indicatorsMap[st.uid]).filter(Boolean);
    excelExportService.exportToExcel({
      students: filteredStudents,
      indicatorsList: indList,
      attempts: attempts.filter(a => filteredStudents.some(s => s.uid === a.studentId)),
      evaluations: evaluations.filter(e => filteredStudents.some(s => s.uid === e.studentId)),
      progressMapByUser,
      observations: observations.filter(o => filteredStudents.some(s => s.uid === o.studentId)),
      opinions,
      selectedPath: selectedPath === 'all' ? undefined : selectedPath
    });
  };

  // Exportar PDF
  const handleExportPdf = () => {
    soundService.playToken();
    if (!selectedStudent) return;
    const ind = indicatorsMap[selectedStudent.uid];
    const obs = observations.filter(o => o.studentId === selectedStudent.uid);
    pdfExportService.generateStudentReport({
      student: selectedStudent,
      indicators: ind,
      observations: obs,
      anonymize: anonymizePdf
    });
  };

  // ─── PANTALLA DE ACCESO DOCENTE (DISEÑO DUOLINGO 3D 100% LIMPIO) ───
  if (!isUnlocked) {
    return (
      <div className="auth-backdrop" role="dialog" aria-modal="true">
        <div
          className="auth-card"
          style={{
            maxWidth: 460,
            borderRadius: 28,
            border: '2.5px solid #E2E8F0',
            borderBottom: '6px solid #CBD5E1',
            padding: '28px 24px',
            textAlign: 'center'
          }}
        >
          <button
            onClick={onBack}
            className="modal-close"
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              background: '#F1F5F9',
              borderRadius: '50%',
              width: 32,
              height: 32,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748B'
            }}
            title="Volver a la App"
          >
            <X size={18} />
          </button>

          <div style={{ marginBottom: 22 }}>
            <div style={{ display: 'inline-flex', marginBottom: 12 }}>
              <DevAvatar avatarId="console_dev" size={72} />
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#DCFCE7',
                color: '#15803D',
                border: '1.5px solid #86EFAC',
                padding: '4px 12px',
                borderRadius: 999,
                fontSize: '0.78rem',
                fontWeight: 900,
                marginBottom: 10
              }}
            >
              <ShieldCheck size={15} /> Panel Docente
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A', margin: '0 0 8px 0' }}>
              Seguimiento de Estudiantes
            </h2>
            <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0, lineHeight: 1.5, fontWeight: 600 }}>
              Hola, <strong>{currentUser.displayName || 'Profesor Joseph'}</strong>. Gestiona las actividades, diagnósticos y el progreso en tiempo real de tus alumnos.
            </p>
          </div>

          {/* Botón de Entrada Inmediata para el Docente Autorizado */}
          <button
            type="button"
            className="btn-3d btn-green"
            onClick={() => {
              soundService.playWin();
              setIsUnlocked(true);
            }}
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '1rem',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 16
            }}
          >
            <Unlock size={20} />
            <span>Entrar al Panel de Seguimiento</span>
          </button>

          <p style={{ margin: 0, fontSize: '0.76rem', color: '#94A3B8', fontWeight: 600 }}>
            Acceso exclusivo verificado para tu cuenta institucional.
          </p>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD PRINCIPAL DESBLOQUEADO (DISEÑO DUOLINGO 3D 100% LIMPIO) ───
  return (
    <div className="academic-page-container">
      {/* ─── 1. BARRA SUPERIOR (HEADER DUOLINGO 3D) ─── */}
      <header className="academic-header-bar">
        <div className="academic-header-top-row">
          <button
            onClick={() => {
              soundService.playToken();
              onBack();
            }}
            className="btn-3d btn-outline academic-back-btn"
            title="Volver a la App"
          >
            <ArrowLeft size={16} /> <span>Volver</span>
          </button>

          <div className="academic-header-titles">
            <h1 className="academic-main-title">
              <span>Seguimiento</span>
              <span className="academic-teacher-badge">Docente</span>
            </h1>
            <p className="academic-header-sub">
              Profesor: <strong>{currentUser.displayName || currentUser.email}</strong> • {students.length} estudiantes
            </p>
          </div>

          <button
            onClick={handleLockSession}
            className="btn-3d btn-outline academic-lock-btn academic-lock-btn--top"
            title="Cerrar panel de seguimiento"
          >
            <Lock size={15} />
          </button>
        </div>

        <div className="academic-header-actions">
          <button
            onClick={handleExportExcel}
            className="btn-3d btn-green academic-action-btn"
            title="Descargar libro Excel con los datos de seguimiento"
          >
            <FileSpreadsheet size={15} /> <span>Exportar Excel</span>
          </button>

          <button
            onClick={() => {
              soundService.playToken();
              if (students.length > 0) setExtEvalStudentUid(students[0].uid);
              setShowExternalEvalModal(true);
            }}
            className="btn-3d btn-outline academic-action-btn"
            title="Registrar nota externa en papel o aula"
          >
            <PlusCircle size={15} /> <span>Nota Externa</span>
          </button>

          <button
            onClick={handleLockSession}
            className="btn-3d btn-outline academic-lock-btn academic-lock-btn--desktop"
            title="Cerrar panel de seguimiento"
          >
            <Lock size={15} />
          </button>
        </div>
      </header>

      {/* ─── 2. DOCK DE NAVEGACIÓN ENTRE SECCIONES (TABS ESTILO DUOLINGO 3D) ─── */}
      <nav className="academic-nav-dock" aria-label="Secciones del panel">
        {[
          { key: 'group' as const, labelDesktop: 'Mis Estudiantes', labelMobile: 'Estudiantes', icon: <Users size={16} /> },
          { key: 'assignDiagnostic' as const, labelDesktop: 'Asignar Diagnósticos', labelMobile: 'Asignar', icon: <Send size={16} /> },
          { key: 'evaluations' as const, labelDesktop: 'Evaluaciones', labelMobile: 'Evaluaciones', icon: <Award size={16} /> },
          { key: 'observations' as const, labelDesktop: 'Observaciones', labelMobile: 'Observaciones', icon: <MessageSquare size={16} /> },
          { key: 'attempts' as const, labelDesktop: 'Historial de Intentos', labelMobile: 'Intentos', icon: <BarChart3 size={16} /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => {
              soundService.playToken();
              setActiveTab(tab.key);
            }}
            className={`academic-tab-pill ${activeTab === tab.key ? 'active' : ''}`}
          >
            {tab.icon}
            <span className="tab-text-desktop">{tab.labelDesktop}</span>
            <span className="tab-text-mobile">{tab.labelMobile}</span>
          </button>
        ))}
      </nav>

      {/* ─── 3. BARRA DE FILTROS Y BÚSQUEDA DUOLINGO 3D ─── */}
      <section className="academic-card academic-filter-bar">
        <div className="academic-filter-container">
          {/* Buscador */}
          <div className="academic-search-input-wrap">
            <Search size={15} color="#64748B" className="academic-search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre, código o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="academic-search-input"
            />
          </div>

          <div className="academic-filter-row-secondary">
            {/* Filtro de Grupo */}
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="academic-group-select"
            >
              <option value="all">Todos los Grupos</option>
              {Array.from(new Set(students.map(s => s.group || 'Grupo A'))).map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            {/* Filtro de Ruta Duolingo 3D */}
            <div className="academic-path-toggle">
              {(['all', 'kotlin', 'sql'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => {
                    soundService.playToken();
                    setSelectedPath(p);
                  }}
                  className={`academic-path-btn ${selectedPath === p ? 'active' : ''}`}
                >
                  {p === 'all' ? 'Todas' : p}
                </button>
              ))}
            </div>
          </div>

          <div className="academic-filter-count">
            Mostrando <strong>{filteredStudents.length}</strong> de {students.length} estudiantes
          </div>
        </div>
      </section>

      {/* ─── CONTENIDO DE CADA PESTAÑA ─── */}
      {loadingData ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B', fontWeight: 700 }}>
          <div className="node-current" style={{ margin: '0 auto 16px auto', width: 48, height: 48 }} />
          <span>Cargando datos académicos e indicadores...</span>
        </div>
      ) : (
        <>
          {/* ════════════ PESTAÑA 1: RESUMEN GRUPAL ════════════ */}
          {activeTab === 'group' && (
            <div>
              {/* Tarjetas de Métricas Globales */}
              <div className="academic-metrics-grid">
                <div className="academic-metric-card" style={{ borderLeft: '4px solid #2563EB' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                    Estudiantes Registrados
                  </span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A' }}>
                    {filteredStudents.length}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#0284C7', fontWeight: 700 }}>
                    {filteredStudents.filter(s => s.isResearchParticipant).length} participantes de estudio
                  </span>
                </div>

                <div className="academic-metric-card" style={{ borderLeft: '4px solid #10B981' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                    Tiempo Activo Promedio
                  </span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A' }}>
                    {filteredStudents.length > 0
                      ? Math.round(
                          filteredStudents.reduce((acc, s) => acc + (indicatorsMap[s.uid]?.estimatedActiveTimeMinutes || 0), 0) /
                            filteredStudents.length
                        )
                      : 0}{' '}
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#64748B' }}>min</span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#16A34A', fontWeight: 700 }}>
                    Interacción efectiva
                  </span>
                </div>

                <div className="academic-metric-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                    Precisión 1er Intento
                  </span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A' }}>
                    {(() => {
                      const valid = filteredStudents
                        .map(s => indicatorsMap[s.uid]?.firstAttemptAccuracyPercent)
                        .filter((v): v is number => typeof v === 'number');
                      if (valid.length === 0) return 'Sin datos';
                      return `${Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)}%`;
                    })()}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#7C3AED', fontWeight: 700 }}>
                    Efectividad sin comodines
                  </span>
                </div>

                <div className="academic-metric-card" style={{ borderLeft: '4px solid #F59E0B' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                    Ganancia Media Post-Test
                  </span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A' }}>
                    {(() => {
                      const valid = filteredStudents
                        .map(s => indicatorsMap[s.uid]?.percentagePointGain)
                        .filter((v): v is number => typeof v === 'number');
                      if (valid.length === 0) return 'Sin datos';
                      const avg = (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
                      return `${Number(avg) > 0 ? '+' : ''}${avg} pts`;
                    })()}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#D97706', fontWeight: 700 }}>
                    Final % − Diagnóstico %
                  </span>
                </div>
              </div>

              {/* Barra de Filtro Rápido de Estado y Selector de Vista (Tarjetas 3D vs Tabla) */}
              <div className="academic-status-filter-bar">
                {/* Filtros de Estado */}
                <div className="academic-status-pill-list">
                  <span className="academic-status-label">
                    <Filter size={13} /> Filtro:
                  </span>
                  {[
                    { key: 'all' as const, label: `Todos (${students.length})`, short: `Todos (${students.length})` },
                    { key: 'evaluated' as const, label: `✓ Evaluados (${students.filter(s => indicatorsMap[s.uid]?.diagnosticPercentage !== null).length})`, short: `✓ Eval (${students.filter(s => indicatorsMap[s.uid]?.diagnosticPercentage !== null).length})` },
                    { key: 'pending' as const, label: `⏳ Pendientes (${students.filter(s => indicatorsMap[s.uid]?.diagnosticPercentage === null).length})`, short: `⏳ Pend (${students.filter(s => indicatorsMap[s.uid]?.diagnosticPercentage === null).length})` },
                    { key: 'participants' as const, label: `🧪 Participantes (${students.filter(s => s.isResearchParticipant).length})`, short: `🧪 Part (${students.filter(s => s.isResearchParticipant).length})` }
                  ].map(btn => (
                    <button
                      key={btn.key}
                      onClick={() => {
                        soundService.playToken();
                        setStatusFilter(btn.key);
                      }}
                      className={`academic-status-btn ${statusFilter === btn.key ? 'active' : ''}`}
                    >
                      <span className="tab-text-desktop">{btn.label}</span>
                      <span className="tab-text-mobile">{btn.short}</span>
                    </button>
                  ))}
                </div>

                {/* Selector de Modo de Vista (Tarjetas 3D vs Tabla) */}
                <div className="academic-view-toggle">
                  <button
                    onClick={() => {
                      soundService.playToken();
                      setGroupViewMode('cards');
                    }}
                    className={`academic-view-btn ${groupViewMode === 'cards' ? 'active' : ''}`}
                    title="Vista de Tarjetas 3D (Recomendado para identificar a cada alumno)"
                  >
                    <LayoutGrid size={14} />
                    <span>Tarjetas</span>
                  </button>
                  <button
                    onClick={() => {
                      soundService.playToken();
                      setGroupViewMode('table');
                    }}
                    className={`academic-view-btn ${groupViewMode === 'table' ? 'active' : ''}`}
                    title="Vista en Tabla Completa"
                  >
                    <List size={14} />
                    <span>Tabla</span>
                  </button>
                </div>
              </div>

              {/* VISTA 1: TARJETAS 3D DE ESTUDIANTES (MÁXIMA DISTINCIÓN Y CLARIDAD) */}
              {groupViewMode === 'cards' ? (
                filteredStudents.length === 0 ? (
                  <div className="academic-card" style={{ textAlign: 'center', padding: '40px 20px', color: '#64748B' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>🔍</div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>No se encontraron estudiantes</div>
                    <p style={{ fontSize: '0.84rem', margin: '4px 0 0 0' }}>Prueba cambiando los filtros de grupo, ruta o estado.</p>
                  </div>
                ) : (
                  <div className="academic-student-duo-grid">
                    {filteredStudents.map(st => {
                      const ind = indicatorsMap[st.uid];
                      const isEval = ind?.diagnosticPercentage !== null;
                      return (
                        <div key={st.uid} className="academic-student-duo-card">
                          {/* Cabecera de la Tarjeta con Avatar y Datos */}
                          <div className="academic-student-card-header">
                            <div className="academic-student-avatar-wrap">
                              <DevAvatar avatarId={st.avatarId || 'robot_byte'} size={46} />
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: -5,
                                  right: -5,
                                  background: st.currentPath === 'kotlin' ? '#7C3AED' : '#0284C7',
                                  color: '#FFFFFF',
                                  fontSize: '0.62rem',
                                  fontWeight: 900,
                                  padding: '1px 5px',
                                  borderRadius: 6,
                                  border: '1.5px solid #FFFFFF'
                                }}
                              >
                                {st.currentPath === 'kotlin' ? 'KT' : 'SQL'}
                              </div>
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
                                <span className="academic-student-code-badge">
                                  [{st.studentCode || 'E01'}]
                                </span>
                                <span
                                  style={{
                                    fontSize: '0.68rem',
                                    fontWeight: 800,
                                    padding: '2px 6px',
                                    borderRadius: 6,
                                    background: '#F1F5F9',
                                    color: '#475569'
                                  }}
                                >
                                  {st.group || 'Grupo A'}
                                </span>
                              </div>

                              <div
                                style={{
                                  fontWeight: 900,
                                  fontSize: '1rem',
                                  color: '#0F172A',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                                title={st.displayName}
                              >
                                {st.displayName}
                              </div>

                              <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {st.idNumber ? `Cédula: ${st.idNumber}` : (st.email ? st.email : 'Sin cédula')}
                              </div>
                            </div>

                            {/* Badge de Diagnóstico */}
                            <div>
                              {isEval ? (
                                <span
                                  style={{
                                    background: '#DCFCE7',
                                    color: '#15803D',
                                    border: '1.5px solid #86EFAC',
                                    padding: '4px 8px',
                                    borderRadius: 8,
                                    fontSize: '0.72rem',
                                    fontWeight: 900,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 3
                                  }}
                                >
                                  ✓ {ind.diagnosticPercentage}%
                                </span>
                              ) : (
                                <span
                                  style={{
                                    background: '#FEF3C7',
                                    color: '#B45309',
                                    border: '1.5px solid #FDE68A',
                                    padding: '4px 8px',
                                    borderRadius: 8,
                                    fontSize: '0.72rem',
                                    fontWeight: 800
                                  }}
                                >
                                  ⏳ Pendiente
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Cuadrícula de 4 Métricas Reales Clave */}
                          <div className="academic-student-pill-grid">
                            <div className="academic-student-pill-box">
                              <span className="academic-student-pill-label">Tiempo Activo</span>
                              <div className="academic-student-pill-val" style={{ color: '#0284C7' }}>
                                {ind?.estimatedActiveTimeMinutes ?? 0} <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748B' }}>min</span>
                              </div>
                              <span style={{ fontSize: '0.68rem', color: '#64748B' }}>{ind?.activeDaysCount ?? 0} días activos</span>
                            </div>

                            <div className="academic-student-pill-box">
                              <span className="academic-student-pill-label">1er Intento</span>
                              <div className="academic-student-pill-val" style={{ color: '#16A34A' }}>
                                {ind?.firstAttemptAccuracyPercent !== null ? `${ind.firstAttemptAccuracyPercent}%` : <span style={{ color: '#94A3B8', fontSize: '0.86rem' }}>Sin datos</span>}
                              </div>
                              <span style={{ fontSize: '0.68rem', color: '#64748B' }}>{ind?.totalAttempts ?? 0} intentos</span>
                            </div>

                            <div className="academic-student-pill-box">
                              <span className="academic-student-pill-label">Diagnóstico</span>
                              <div className="academic-student-pill-val" style={{ color: '#7C3AED' }}>
                                {ind?.diagnosticPercentage !== null ? `${ind.diagnosticPercentage}%` : <span style={{ color: '#94A3B8', fontSize: '0.86rem' }}>Pendiente</span>}
                              </div>
                              <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Línea de base</span>
                            </div>

                            <div className="academic-student-pill-box">
                              <span className="academic-student-pill-label">Ganancia Neta</span>
                              <div
                                className="academic-student-pill-val"
                                style={{
                                  color: (ind?.percentagePointGain ?? 0) > 0 ? '#10B981' : (ind?.percentagePointGain ?? 0) < 0 ? '#EF4444' : '#64748B'
                                }}
                              >
                                {ind?.percentagePointGain !== null ? `${ind.percentagePointGain > 0 ? '+' : ''}${ind.percentagePointGain} pts` : <span style={{ color: '#94A3B8', fontSize: '0.86rem' }}>—</span>}
                              </div>
                              <span style={{ fontSize: '0.68rem', color: '#64748B' }}>
                                {ind?.finalTestPercentage !== null ? `Final: ${ind.finalTestPercentage}%` : 'Post-test pend.'}
                              </span>
                            </div>
                          </div>

                          {/* Botones de Acción de la Tarjeta */}
                          <div className="academic-student-card-actions">
                            <button
                              onClick={() => {
                                soundService.playToken();
                                setSelectedStudentUid(st.uid);
                                setActiveTab('student');
                              }}
                              className="btn-3d btn-green academic-card-view-btn"
                            >
                              <UserCheck size={15} /> <span>Ver Ficha</span>
                            </button>

                            <button
                              onClick={() => {
                                soundService.playToken();
                                setObsStudentUid(st.uid);
                                setShowObsModal(true);
                              }}
                              className="btn-3d btn-outline academic-card-obs-btn"
                              title="Añadir Observación Docente a este Estudiante"
                            >
                              <PlusCircle size={15} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleResearchParticipant(st)}
                              className="btn-3d academic-card-study-btn"
                              style={{
                                background: st.isResearchParticipant ? '#DCFCE7' : '#F1F5F9',
                                color: st.isResearchParticipant ? '#15803D' : '#64748B',
                                border: '1.5px solid #CBD5E1'
                              }}
                              title={st.isResearchParticipant ? 'Estudiante marcado como Participante de Estudio' : 'Hacer clic para marcar como Participante'}
                            >
                              {st.isResearchParticipant ? '🧪 Sí' : 'No'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                /* VISTA 2: TABLA ENRIQUECIDA 3D */
                <div className="academic-table-container">
                  <div style={{ padding: '12px 16px', background: '#F8FAFC', borderBottom: '1.5px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#475569' }}>
                      Mostrando {filteredStudents.length} de {students.length} estudiantes
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
                      ← Desliza horizontalmente para ver todos los indicadores reales →
                    </span>
                  </div>

                  <table className="academic-table">
                    <thead>
                      <tr>
                        <th>Avatar</th>
                        <th>Código</th>
                        <th>Estudiante & Cédula</th>
                        <th>Grupo</th>
                        <th>Ruta</th>
                        <th>Días</th>
                        <th>Tiempo Activo</th>
                        <th>1er Intento %</th>
                        <th>Diagnóstico %</th>
                        <th>Prueba Final %</th>
                        <th>Ganancia</th>
                        <th>Estudio</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={13} style={{ textAlign: 'center', padding: '30px', color: '#64748B', fontWeight: 700 }}>
                            No se encontraron estudiantes con los filtros seleccionados.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map(st => {
                          const ind = indicatorsMap[st.uid];
                          return (
                            <tr key={st.uid}>
                              <td style={{ width: 40, padding: '8px 10px' }}>
                                <DevAvatar avatarId={st.avatarId || 'robot_byte'} size={32} />
                              </td>
                              <td>
                                <span className="academic-student-code-badge">
                                  {st.studentCode || 'E01'}
                                </span>
                              </td>
                              <td>
                                <div style={{ fontWeight: 800, color: '#0F172A' }}>{st.displayName}</div>
                                {st.idNumber && (
                                  <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>
                                    Cédula: {st.idNumber}
                                  </div>
                                )}
                              </td>
                              <td style={{ fontWeight: 600, color: '#475569' }}>
                                {st.group || 'Grupo A'}
                              </td>
                              <td>
                                <span
                                  style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    padding: '3px 8px',
                                    borderRadius: 8,
                                    background: st.currentPath === 'kotlin' ? '#E0F2FE' : '#EEF2FF',
                                    color: st.currentPath === 'kotlin' ? '#0284C7' : '#4F46E5'
                                  }}
                                >
                                  {st.currentPath}
                                </span>
                              </td>
                              <td style={{ fontWeight: 700 }}>
                                {ind?.activeDaysCount ?? 0} d
                              </td>
                              <td style={{ fontWeight: 700, color: '#0284C7' }}>
                                {ind?.estimatedActiveTimeMinutes ?? 0} min
                              </td>
                              <td style={{ fontWeight: 700, color: '#16A34A' }}>
                                {ind?.firstAttemptAccuracyPercent !== null ? `${ind.firstAttemptAccuracyPercent}%` : <span style={{ color: '#94A3B8' }}>Sin datos</span>}
                              </td>
                              <td style={{ fontWeight: 700, color: '#7C3AED' }}>
                                {ind?.diagnosticPercentage !== null ? `${ind.diagnosticPercentage}%` : <span style={{ color: '#94A3B8' }}>Pendiente</span>}
                              </td>
                              <td style={{ fontWeight: 700, color: '#D97706' }}>
                                {ind?.finalTestPercentage !== null ? `${ind.finalTestPercentage}%` : <span style={{ color: '#94A3B8' }}>Pendiente</span>}
                              </td>
                              <td style={{ fontWeight: 900, color: (ind?.percentagePointGain ?? 0) > 0 ? '#16A34A' : '#64748B' }}>
                                {ind?.percentagePointGain !== null ? `${ind.percentagePointGain > 0 ? '+' : ''}${ind.percentagePointGain} pts` : <span style={{ color: '#94A3B8' }}>—</span>}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => handleToggleResearchParticipant(st)}
                                  style={{
                                    border: 'none',
                                    background: st.isResearchParticipant ? '#DCFCE7' : '#F1F5F9',
                                    color: st.isResearchParticipant ? '#15803D' : '#64748B',
                                    padding: '4px 8px',
                                    borderRadius: 8,
                                    fontSize: '0.72rem',
                                    fontWeight: 800,
                                    cursor: 'pointer'
                                  }}
                                >
                                  {st.isResearchParticipant ? 'SÍ' : 'NO'}
                                </button>
                              </td>
                              <td>
                                <button
                                  onClick={() => {
                                    soundService.playToken();
                                    setSelectedStudentUid(st.uid);
                                    setActiveTab('student');
                                  }}
                                  className="btn-3d btn-outline"
                                  style={{ padding: '5px 10px', fontSize: '0.74rem' }}
                                >
                                  Ver Ficha
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ════════════ PESTAÑA 2: FICHA POR ESTUDIANTE ════════════ */}
          {activeTab === 'student' && selectedStudent && (
            <div>
              {/* Barra de Navegación Rápida entre Estudiantes (Estilo Duolingo 3D) */}
              <div className="academic-student-nav-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    onClick={handlePrevStudent}
                    className="btn-3d btn-outline"
                    style={{ padding: '8px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 4 }}
                    title="Ver estudiante anterior"
                  >
                    <ChevronLeft size={16} />
                    <span>Anterior</span>
                  </button>

                  <select
                    value={selectedStudent.uid}
                    onChange={(e) => {
                      soundService.playToken();
                      setSelectedStudentUid(e.target.value);
                    }}
                    style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: 12,
                      padding: '8px 12px',
                      color: '#0F172A',
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      maxWidth: '360px'
                    }}
                  >
                    {filteredStudents.map((s, idx) => (
                      <option key={s.uid} value={s.uid}>
                        #{idx + 1} [{s.studentCode || 'E01'}] {s.displayName} {s.idNumber ? `(${s.idNumber})` : ''} - {s.group || 'Grupo A'}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleNextStudent}
                    className="btn-3d btn-outline"
                    style={{ padding: '8px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 4 }}
                    title="Ver estudiante siguiente"
                  >
                    <span>Siguiente</span>
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B' }}>
                    Estudiante {selectedStudentIndex + 1} de {filteredStudents.length}
                  </span>

                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={anonymizePdf}
                      onChange={(e) => setAnonymizePdf(e.target.checked)}
                      style={{ width: 16, height: 16 }}
                    />
                    <span>Anonimizar PDF ({selectedStudent.studentCode})</span>
                  </label>

                  <button
                    onClick={handleExportPdf}
                    className="btn-3d btn-blue"
                    style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <FileText size={15} /> Exportar Reporte PDF
                  </button>
                </div>
              </div>

              {/* Ficha de Identificación Hero con Avatar 3D */}
              <div className="academic-student-hero">
                <div
                  style={{
                    width: 78,
                    height: 78,
                    borderRadius: 22,
                    background: '#F8FAFC',
                    border: '2.5px solid #E2E8F0',
                    boxShadow: '0 4px 0 #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <DevAvatar avatarId={selectedStudent.avatarId || 'robot_byte'} size={68} />
                </div>

                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <span className="academic-student-code-badge" style={{ fontSize: '0.88rem', padding: '3px 10px' }}>
                      Código Oficial: {selectedStudent.studentCode || 'E01'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: 8,
                        background: '#EEF2FF',
                        color: '#4F46E5'
                      }}
                    >
                      {selectedStudent.group || 'Grupo A'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: 8,
                        background: selectedStudent.currentPath === 'kotlin' ? '#E0F2FE' : '#FEF3C7',
                        color: selectedStudent.currentPath === 'kotlin' ? '#0284C7' : '#B45309'
                      }}
                    >
                      Ruta: {selectedStudent.currentPath}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
                    {selectedStudent.displayName}
                  </h2>

                  <div style={{ fontSize: '0.82rem', color: '#64748B', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    {selectedStudent.idNumber && (
                      <span><strong>Cédula:</strong> <span style={{ color: '#0F172A' }}>{selectedStudent.idNumber}</span></span>
                    )}
                    {selectedStudent.email && (
                      <span><strong>Correo:</strong> <span style={{ color: '#0F172A' }}>{selectedStudent.email}</span></span>
                    )}
                    <span>
                      <strong>Registro:</strong> {selectedStudent.createdAt ? new Date(selectedStudent.createdAt).toLocaleDateString() : 'Activo'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => handleToggleResearchParticipant(selectedStudent)}
                    className="btn-3d"
                    style={{
                      background: selectedStudent.isResearchParticipant ? '#10B981' : '#F1F5F9',
                      color: selectedStudent.isResearchParticipant ? '#FFFFFF' : '#475569',
                      boxShadow: selectedStudent.isResearchParticipant ? '0 3px 0 #059669' : '0 3px 0 #CBD5E1',
                      border: '1.5px solid #CBD5E1',
                      padding: '8px 14px',
                      fontSize: '0.8rem'
                    }}
                  >
                    {selectedStudent.isResearchParticipant ? '✓ Participante de Investigación' : '+ Marcar como Participante'}
                  </button>

                  <button
                    onClick={() => {
                      soundService.playToken();
                      setObsStudentUid(selectedStudent.uid);
                      setShowObsModal(true);
                    }}
                    className="btn-3d btn-green"
                    style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                  >
                    <PlusCircle size={15} /> Añadir Observación
                  </button>
                </div>
              </div>

              {/* 5 Métricas Principales del Estudiante en Tarjetas 3D (100% Datos Reales) */}
              {indicatorsMap[selectedStudent.uid] && (
                <div className="academic-student-metrics-grid">
                  <div className="academic-metric-card" style={{ borderLeft: '4px solid #0284C7' }}>
                    <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 800 }}>TIEMPO ACTIVO ESTIMADO</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0284C7' }}>
                      {indicatorsMap[selectedStudent.uid].estimatedActiveTimeMinutes} min
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      {indicatorsMap[selectedStudent.uid].activeDaysCount} días activos reales
                    </span>
                  </div>

                  <div className="academic-metric-card" style={{ borderLeft: '4px solid #16A34A' }}>
                    <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 800 }}>PRECISIÓN 1ER INTENTO</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#16A34A' }}>
                      {indicatorsMap[selectedStudent.uid].firstAttemptAccuracyPercent !== null
                        ? `${indicatorsMap[selectedStudent.uid].firstAttemptAccuracyPercent}%`
                        : <span style={{ color: '#94A3B8' }}>Sin datos</span>}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      {indicatorsMap[selectedStudent.uid].totalAttempts} intentos registrados
                    </span>
                  </div>

                  <div className="academic-metric-card" style={{ borderLeft: '4px solid #7C3AED' }}>
                    <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 800 }}>DIAGNÓSTICO INICIAL</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#7C3AED' }}>
                      {indicatorsMap[selectedStudent.uid].diagnosticPercentage !== null
                        ? `${indicatorsMap[selectedStudent.uid].diagnosticPercentage}%`
                        : <span style={{ color: '#94A3B8' }}>Pendiente</span>}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Línea de base investigativa</span>
                  </div>

                  <div className="academic-metric-card" style={{ borderLeft: '4px solid #D97706' }}>
                    <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 800 }}>PRUEBA FINAL</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#D97706' }}>
                      {indicatorsMap[selectedStudent.uid].finalTestPercentage !== null
                        ? `${indicatorsMap[selectedStudent.uid].finalTestPercentage}%`
                        : <span style={{ color: '#94A3B8' }}>Pendiente</span>}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Desempeño post-intervención</span>
                  </div>

                  <div className="academic-metric-card" style={{ borderLeft: '4px solid #10B981' }}>
                    <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 800 }}>GANANCIA NETA</span>
                    <div
                      style={{
                        fontSize: '1.6rem',
                        fontWeight: 900,
                        color: (indicatorsMap[selectedStudent.uid].percentagePointGain ?? 0) > 0 ? '#10B981' : '#64748B'
                      }}
                    >
                      {indicatorsMap[selectedStudent.uid].percentagePointGain !== null
                        ? `${indicatorsMap[selectedStudent.uid].percentagePointGain! > 0 ? '+' : ''}${indicatorsMap[selectedStudent.uid].percentagePointGain} pts`
                        : <span style={{ color: '#94A3B8' }}>Pendiente</span>}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Diferencia porcentual real</span>
                  </div>
                </div>
              )}

              {/* Desglose Temático de Aciertos */}
              {indicatorsMap[selectedStudent.uid] && (
                <div className="academic-card">
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginBottom: 14 }}>
                    Desglose de Desempeño por Tópico Conceptual
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {Object.entries(indicatorsMap[selectedStudent.uid].topicBreakdown).map(([topic, data]) => {
                      const pct = data.attempts > 0 ? Math.round((data.correct / data.attempts) * 100) : 0;
                      return (
                        <div key={topic}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 4 }}>
                            <span style={{ fontWeight: 800, color: '#1E293B' }}>{topic}</span>
                            <span style={{ fontWeight: 700, color: '#64748B' }}>
                              {data.correct} de {data.attempts} aciertos ({pct}%)
                            </span>
                          </div>
                          <div style={{ height: 8, background: '#F1F5F9', borderRadius: 999, overflow: 'hidden' }}>
                            <div
                              style={{
                                height: '100%',
                                width: `${pct}%`,
                                background: pct >= 80 ? '#10B981' : pct >= 60 ? '#F59E0B' : '#EF4444',
                                borderRadius: 999
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── TABLA DE INDICADORES PEDAGÓGICOS CLAVE (SEGÚN MARCO DE INVESTIGACIÓN) ─── */}
              {indicatorsMap[selectedStudent.uid] && (() => {
                const ind = indicatorsMap[selectedStudent.uid];
                return (
                  <div className="academic-card" style={{ marginBottom: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Target size={20} color="#0284C7" />
                        <span>Matriz de Indicadores de Aprendizaje y Práctica</span>
                      </h3>
                      <span style={{ fontSize: '0.74rem', background: '#E0F2FE', color: '#0284C7', padding: '3px 10px', borderRadius: 8, fontWeight: 800 }}>
                        Datos Reales y Sin Relleno
                      </span>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                      <table className="academic-table" style={{ fontSize: '0.84rem' }}>
                        <thead>
                          <tr>
                            <th style={{ width: '22%' }}>Dimensión / Dato</th>
                            <th style={{ width: '38%' }}>Registro en la App</th>
                            <th style={{ width: '40%' }}>Observación Pedagógica</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ fontWeight: 800, color: '#0F172A' }}>Tiempo de juego o práctica</td>
                            <td>
                              <span style={{ fontWeight: 900, color: '#0284C7' }}>{ind.estimatedActiveTimeMinutes} min totales</span>
                              <span style={{ color: '#64748B', marginLeft: 8 }}>({ind.weeklyActiveMinutes} min últimos 7 días)</span>
                              <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: 2 }}>*Filtra tiempo de inactividad / idle</div>
                            </td>
                            <td style={{ color: '#475569' }}>
                              Cuánto practica activamente el estudiante en sesiones efectivas.
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 800, color: '#0F172A' }}>Frecuencia de uso</td>
                            <td>
                              <span style={{ fontWeight: 900, color: '#16A34A' }}>{ind.weeklySessionsCount} sesiones/semana</span>
                              <span style={{ color: '#64748B', marginLeft: 8 }}>({ind.activeDaysCount} días con actividad total)</span>
                            </td>
                            <td style={{ color: '#475569' }}>
                              {ind.weeklySessionsCount >= 3 ? 'Practica regularmente con constancia semanal.' : 'Uso ocasional; requiere estímulo de constancia.'}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 800, color: '#0F172A' }}>Ejercicios completados</td>
                            <td>
                              <span style={{ fontWeight: 900, color: '#0284C7' }}>{ind.distinctActivitiesCompleted} resueltos</span>
                              <span style={{ color: '#64748B', marginLeft: 8 }}>/ {ind.pendingExercisesCount} pendientes</span>
                            </td>
                            <td style={{ color: '#475569' }}>
                              Avance curricular en la ruta de aprendizaje activa.
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 800, color: '#0F172A' }}>Respuestas correctas</td>
                            <td>
                              <span style={{ fontWeight: 900, color: '#7C3AED' }}>
                                {ind.firstAttemptAccuracyPercent !== null ? `${ind.firstAttemptAccuracyPercent}%` : 'Sin datos'}
                              </span>
                              <span style={{ color: '#64748B', marginLeft: 6 }}>de acierto en 1er intento</span>
                            </td>
                            <td style={{ color: '#475569' }}>
                              {ind.firstAttemptAccuracyPercent && ind.firstAttemptAccuracyPercent >= 70 ? 'Alta precisión conceptual sin requerir reintentos.' : 'Precisión moderada; aprende por ensayo y ajuste.'}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 800, color: '#0F172A' }}>Intentos por ejercicio</td>
                            <td>
                              <span style={{ fontWeight: 900, color: '#D97706' }}>
                                {ind.attemptsPerActivityAverage !== null ? `${ind.attemptsPerActivityAverage} intentos/reto` : 'Sin datos'}
                              </span>
                            </td>
                            <td style={{ color: '#475569' }}>
                              Promedio de intentos requeridos antes de superar un reto con éxito.
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 800, color: '#0F172A' }}>Uso de pistas o ayuda</td>
                            <td>
                              <span style={{ fontWeight: 900, color: '#EC4899' }}>{ind.hintsUsedCount} pistas utilizadas</span>
                            </td>
                            <td style={{ color: '#475569' }}>
                              {ind.hintsUsedCount <= 2 ? 'Alto grado de autonomía al resolver retos.' : 'Apoyado con andamiaje de pistas.'}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 800, color: '#0F172A' }}>Tiempo de resolución</td>
                            <td>
                              <span style={{ fontWeight: 900, color: '#0284C7' }}>
                                {ind.distinctActivitiesCompleted > 0 ? Math.round((ind.estimatedActiveTimeMinutes * 60) / ind.distinctActivitiesCompleted) : 0} seg
                              </span>
                              <span style={{ color: '#64748B', marginLeft: 6 }}>promedio por reto</span>
                            </td>
                            <td style={{ color: '#475569' }}>
                              Velocidad y fluidez de resolución manteniendo la precisión.
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 800, color: '#0F172A' }}>Errores por tema</td>
                            <td>
                              {Object.keys(ind.errorsByTopic || {}).length === 0 ? (
                                <span style={{ color: '#16A34A', fontWeight: 700 }}>Sin fallos registrados</span>
                              ) : (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                  {Object.entries(ind.errorsByTopic || {}).map(([top, count]) => (
                                    <span key={top} style={{ background: '#FEE2E2', color: '#B91C1C', padding: '2px 6px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 800 }}>
                                      {top}: {count}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </td>
                            <td style={{ color: '#475569' }}>
                              Contenidos específicos que requieren refuerzo pedagógico.
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 800, color: '#0F172A' }}>Progreso por tema</td>
                            <td>
                              {Object.keys(ind.progressByTopic || {}).length === 0 ? (
                                <span style={{ color: '#64748B' }}>Iniciando ruta</span>
                              ) : (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                  {Object.entries(ind.progressByTopic || {}).map(([top, data]) => (
                                    <span key={top} style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 6px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 800 }}>
                                      {top}: {data.completed}/{data.total} superados
                                    </span>
                                  ))}
                                </div>
                              )}
                            </td>
                            <td style={{ color: '#475569' }}>
                              Tópicos consolidados en los que demuestra dominio.
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 800, color: '#0F172A' }}>Resultado inicial y final</td>
                            <td>
                              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                <span>Diag: <strong>{ind.diagnosticPercentage !== null ? `${ind.diagnosticPercentage}%` : 'Pendiente'}</strong></span>
                                <span>Final: <strong>{ind.finalTestPercentage !== null ? `${ind.finalTestPercentage}%` : 'Pendiente'}</strong></span>
                                {ind.percentagePointGain !== null && (
                                  <span style={{ color: ind.percentagePointGain > 0 ? '#16A34A' : '#64748B', fontWeight: 900 }}>
                                    ({ind.percentagePointGain > 0 ? '+' : ''}{ind.percentagePointGain} pts)
                                  </span>
                                )}
                              </div>
                            </td>
                            <td style={{ color: '#475569' }}>
                              Cambio de desempeño entre la prueba de entrada y la prueba de cierre.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              {/* Observaciones Docentes del Estudiante */}
              <div className="academic-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    Observaciones Cualitativas Docentes
                  </h3>
                  <button
                    onClick={() => {
                      soundService.playToken();
                      setObsStudentUid(selectedStudent.uid);
                      setShowObsModal(true);
                    }}
                    className="btn-3d btn-green"
                    style={{ padding: '7px 14px', fontSize: '0.8rem' }}
                  >
                    <PlusCircle size={15} /> Añadir Observación
                  </button>
                </div>

                {observations.filter(o => o.studentId === selectedStudent.uid).length === 0 ? (
                  <p style={{ color: '#64748B', fontSize: '0.86rem', fontStyle: 'italic', margin: 0 }}>
                    No hay observaciones cualitativas registradas para este estudiante aún.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {observations
                      .filter(o => o.studentId === selectedStudent.uid)
                      .map(obs => (
                        <div
                          key={obs.obsId}
                          style={{
                            background: '#F8FAFC',
                            border: '1.5px solid #E2E8F0',
                            borderRadius: 14,
                            padding: '12px 14px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748B', marginBottom: 4 }}>
                            <span><strong>Fecha:</strong> {obs.date}</span>
                            <span><strong>Dificultad:</strong> {obs.observedDifficulty}</span>
                            <span><strong>Apoyo:</strong> {obs.supportGiven}</span>
                          </div>
                          <div style={{ color: '#0F172A', fontSize: '0.88rem', lineHeight: 1.45, fontWeight: 500 }}>
                            {obs.teacherComment}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ════════════ PESTAÑA: ASIGNACIÓN DE DIAGNÓSTICOS ════════════ */}
          {activeTab === 'assignDiagnostic' && (
            <div>
              <div className="academic-card" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, #0284C7, #0369A1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF'
                    }}
                  >
                    <Send size={22} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                      Asignar Diagnóstico a Estudiantes
                    </h2>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748B' }}>
                      Envía evaluaciones diagnósticas a todo el grupo o a estudiantes específicos. El estudiante recibirá una alerta al ingresar y deberá responderlo obligatoriamente para continuar.
                    </p>
                  </div>
                </div>

                {assignSuccessMsg && (
                  <div
                    style={{
                      background: '#F0FDF4',
                      border: '1.5px solid #86EFAC',
                      borderRadius: 12,
                      padding: '12px 16px',
                      marginBottom: 16,
                      color: '#166534',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10
                    }}
                  >
                    <CheckCircle2 size={20} color="#16A34A" />
                    <span>{assignSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleAssignDiagnostic} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* PASO 1: SELECCIONAR RUTA (KOTLIN O SQL) */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1E293B', display: 'block', marginBottom: 8 }}>
                      1. Selecciona la Ruta de Aprendizaje
                    </label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button
                        type="button"
                        onClick={() => {
                          soundService.playToken();
                          setSelectedDiagPath('kotlin');
                          setSelectedInstrumentId(KOTLIN_DIAGNOSTICS_LIST[0].instrumentId);
                        }}
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          borderRadius: 12,
                          border: selectedDiagPath === 'kotlin' ? '2.5px solid #0284C7' : '1.5px solid #CBD5E1',
                          background: selectedDiagPath === 'kotlin' ? '#F0F9FF' : '#FFFFFF',
                          color: selectedDiagPath === 'kotlin' ? '#0284C7' : '#475569',
                          fontWeight: 900,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>🟣</span>
                        <span>Kotlin (5 Diagnósticos)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          soundService.playToken();
                          setSelectedDiagPath('sql');
                          setSelectedInstrumentId(SQL_DIAGNOSTICS_LIST[0].instrumentId);
                        }}
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          borderRadius: 12,
                          border: selectedDiagPath === 'sql' ? '2.5px solid #0284C7' : '1.5px solid #CBD5E1',
                          background: selectedDiagPath === 'sql' ? '#F0F9FF' : '#FFFFFF',
                          color: selectedDiagPath === 'sql' ? '#0284C7' : '#475569',
                          fontWeight: 900,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>🔵</span>
                        <span>SQL (5 Diagnósticos)</span>
                      </button>
                    </div>
                  </div>

                  {/* PASO 2: SELECCIONAR INSTRUMENTO DE LOS 5 DISPONIBLES */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1E293B', display: 'block', marginBottom: 8 }}>
                      2. Elige el Instrumento Diagnóstico ({selectedDiagPath === 'kotlin' ? 'Kotlin' : 'SQL'})
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
                      {(selectedDiagPath === 'kotlin' ? KOTLIN_DIAGNOSTICS_LIST : SQL_DIAGNOSTICS_LIST).map((inst, index) => {
                        const isSelected = selectedInstrumentId === inst.instrumentId;
                        return (
                          <div
                            key={inst.instrumentId}
                            onClick={() => {
                              soundService.playToken();
                              setSelectedInstrumentId(inst.instrumentId);
                            }}
                            style={{
                              padding: '14px 16px',
                              borderRadius: 14,
                              border: isSelected ? '2.5px solid #0284C7' : '1.5px solid #E2E8F0',
                              background: isSelected ? '#F0F9FF' : '#FFFFFF',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              transition: 'all 0.15s ease',
                              boxShadow: isSelected ? '0 4px 12px -2px rgba(2, 132, 199, 0.2)' : 'none'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#0284C7', background: '#E0F2FE', padding: '2px 8px', borderRadius: 6 }}>
                                Diagnóstico #{index + 1}
                              </span>
                              {isSelected ? (
                                <CheckCircle2 size={18} color="#0284C7" />
                              ) : (
                                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #CBD5E1' }} />
                              )}
                            </div>
                            <div style={{ fontWeight: 900, color: '#0F172A', fontSize: '0.92rem', marginBottom: 4 }}>
                              {inst.title}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4, marginBottom: 10 }}>
                              {inst.description}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#475569', fontWeight: 700, borderTop: '1px solid #E2E8F0', paddingTop: 8 }}>
                              <span>{inst.questions.length} preguntas obligatorias</span>
                              <span style={{ color: '#16A34A' }}>Autocalificable</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* VISTA PREVIA DEL DIAGNÓSTICO SELECCIONADO */}
                  {(() => {
                    const activeInst = ALL_DIAGNOSTIC_INSTRUMENTS.find(i => i.instrumentId === selectedInstrumentId);
                    if (!activeInst) return null;
                    return (
                      <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: '14px 18px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', marginBottom: 4 }}>
                          Vista Previa de Preguntas del Instrumento
                        </div>
                        <div style={{ fontWeight: 900, color: '#0F172A', fontSize: '0.95rem', marginBottom: 8 }}>
                          {activeInst.title} ({activeInst.questions.length} preguntas)
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {activeInst.questions.map((q, idx) => (
                            <div key={q.questionId} style={{ fontSize: '0.82rem', color: '#334155', display: 'flex', gap: 8 }}>
                              <span style={{ fontWeight: 900, color: '#0284C7' }}>{idx + 1}.</span>
                              <span>{q.prompt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* PASO 3: SELECCIONAR DESTINATARIOS */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1E293B', display: 'block', marginBottom: 8 }}>
                      3. Selecciona los Destinatarios
                    </label>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 800, fontSize: '0.86rem', color: '#0F172A' }}>
                        <input
                          type="radio"
                          name="targetMode"
                          checked={targetMode === 'all'}
                          onChange={() => {
                            soundService.playToken();
                            setTargetMode('all');
                          }}
                          style={{ width: 18, height: 18 }}
                        />
                        <span>Todos los estudiantes registrados ({students.length})</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 800, fontSize: '0.86rem', color: '#0F172A' }}>
                        <input
                          type="radio"
                          name="targetMode"
                          checked={targetMode === 'specific'}
                          onChange={() => {
                            soundService.playToken();
                            setTargetMode('specific');
                          }}
                          style={{ width: 18, height: 18 }}
                        />
                        <span>Seleccionar estudiantes específicos ({selectedStudentUids.length} seleccionados)</span>
                      </label>
                    </div>

                    {/* LISTA DE ESTUDIANTES SI ES MODO ESPECÍFICO */}
                    {targetMode === 'specific' && (
                      <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: 14, padding: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>
                            Haz clic para marcar o desmarcar estudiantes:
                          </span>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              type="button"
                              onClick={selectAllStudents}
                              className="btn-3d btn-outline"
                              style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                            >
                              Seleccionar Todos ({filteredStudents.length})
                            </button>
                            <button
                              type="button"
                              onClick={deselectAllStudents}
                              className="btn-3d btn-outline"
                              style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                            >
                              Deseleccionar Todos
                            </button>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8, maxHeight: 220, overflowY: 'auto' }}>
                          {filteredStudents.map(st => {
                            const isChecked = selectedStudentUids.includes(st.uid);
                            return (
                              <div
                                key={st.uid}
                                onClick={() => toggleSelectStudent(st.uid)}
                                style={{
                                  background: isChecked ? '#E0F2FE' : '#FFFFFF',
                                  border: isChecked ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                                  borderRadius: 10,
                                  padding: '8px 12px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 10,
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                {isChecked ? (
                                  <CheckSquare size={18} color="#0284C7" />
                                ) : (
                                  <Square size={18} color="#94A3B8" />
                                )}
                                <div style={{ fontSize: '0.82rem' }}>
                                  <div style={{ fontWeight: 800, color: '#0F172A' }}>
                                    {st.displayName}
                                  </div>
                                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                                    [{st.studentCode || 'E01'}] • {st.group || 'Grupo A'}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PASO 4: MENSAJE DEL AVISO PARA EL ESTUDIANTE */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1E293B', display: 'block', marginBottom: 6 }}>
                      4. Mensaje de Alerta en Pantalla para el Estudiante
                    </label>
                    <input
                      type="text"
                      value={assignmentNotice}
                      onChange={(e) => setAssignmentNotice(e.target.value)}
                      placeholder="El profesor te ha enviado un diagnóstico obligatorio..."
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 12,
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: '#0F172A',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                    <span style={{ fontSize: '0.74rem', color: '#64748B', marginTop: 4, display: 'block' }}>
                      Este mensaje aparecerá en un pop-up obligatorio apenas el alumno abra o recargue la app.
                    </span>
                  </div>

                  {/* BOTÓN DE ASIGNACIÓN */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                    <button
                      type="submit"
                      disabled={assignLoading}
                      className="btn-3d btn-blue"
                      style={{
                        padding: '12px 28px',
                        fontSize: '0.92rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                      }}
                    >
                      <Send size={18} />
                      <span>{assignLoading ? 'Asignando diagnóstico...' : '🚀 Enviar Diagnóstico Asignado'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* HISTORIAL DE ASIGNACIONES REALIZADAS */}
              <div className="academic-card">
                <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={18} color="#0284C7" />
                  <span>Historial de Diagnósticos Asignados</span>
                </h3>

                {assignments.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#64748B', fontWeight: 600, fontSize: '0.86rem' }}>
                    No has asignado diagnósticos adicionales aún.
                  </div>
                ) : (
                  <div className="academic-table-container">
                    <table className="academic-table">
                      <thead>
                        <tr>
                          <th>Fecha Asignación</th>
                          <th>Instrumento</th>
                          <th>Ruta</th>
                          <th>Destinatarios</th>
                          <th>Progreso de Entregas</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignments.map(asg => {
                          const completedCount = (asg.completedByUids || []).length;
                          const isAll = (asg.assignedToUids || []).includes('all');
                          const totalTargets = isAll ? students.length : (asg.assignedToUids || []).length;
                          const pctDone = totalTargets > 0 ? Math.round((completedCount / totalTargets) * 100) : 0;
                          return (
                            <tr key={asg.assignmentId}>
                              <td style={{ fontSize: '0.78rem', color: '#64748B' }}>
                                {new Date(asg.createdAt).toLocaleString('es-CR', { dateStyle: 'short', timeStyle: 'short' })}
                              </td>
                              <td style={{ fontWeight: 800, color: '#0F172A' }}>
                                {asg.title}
                              </td>
                              <td>
                                <span
                                  style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    padding: '2px 8px',
                                    borderRadius: 6,
                                    background: asg.pathId === 'kotlin' ? '#E0F2FE' : '#EEF2FF',
                                    color: asg.pathId === 'kotlin' ? '#0284C7' : '#4F46E5'
                                  }}
                                >
                                  {asg.pathId}
                                </span>
                              </td>
                              <td style={{ fontWeight: 700, color: '#334155' }}>
                                {isAll ? `Todos (${students.length})` : `${asg.assignedToUids.length} estudiante(s)`}
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <div style={{ flex: 1, height: 8, background: '#F1F5F9', borderRadius: 999, overflow: 'hidden', minWidth: 60 }}>
                                    <div
                                      style={{
                                        height: '100%',
                                        width: `${pctDone}%`,
                                        background: pctDone === 100 ? '#10B981' : '#0284C7',
                                        borderRadius: 999
                                      }}
                                    />
                                  </div>
                                  <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#475569' }}>
                                    {completedCount}/{totalTargets} ({pctDone}%)
                                  </span>
                                </div>
                              </td>
                              <td>
                                <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: 8 }}>
                                  Activo
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ════════════ PESTAÑA 3: EVALUACIONES ════════════ */}
          {activeTab === 'evaluations' && (
            <div>
              <div className="academic-table-container">
                <table className="academic-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Estudiante</th>
                      <th>Tipo</th>
                      <th>Instrumento</th>
                      <th>Puntaje</th>
                      <th>% Calificado</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluations.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: 'center', padding: '30px', color: '#64748B', fontWeight: 700 }}>
                          No hay evaluaciones diagnósticas ni finales entregadas aún.
                        </td>
                      </tr>
                    ) : (
                      evaluations.map(ev => {
                        const st = students.find(s => s.uid === ev.studentId);
                        return (
                          <tr key={ev.evalId}>
                            <td style={{ fontSize: '0.78rem', color: '#64748B' }}>
                              {new Date(ev.submittedAt || ev.startedAt).toLocaleDateString()}
                            </td>
                            <td>
                              <div style={{ fontWeight: 800, color: '#0F172A' }}>{st?.displayName || ev.studentCode}</div>
                              <div style={{ fontSize: '0.72rem', color: '#0284C7' }}>{ev.studentCode}</div>
                            </td>
                            <td>
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  padding: '3px 8px',
                                  borderRadius: 8,
                                  background: ev.type === 'diagnostic' ? '#E0F2FE' : '#FEF3C7',
                                  color: ev.type === 'diagnostic' ? '#0369A1' : '#B45309'
                                }}
                              >
                                {ev.type === 'diagnostic' ? 'Diagnóstico' : 'Prueba Final'}
                              </span>
                            </td>
                            <td style={{ fontSize: '0.8rem', color: '#475569' }}>
                              {ev.instrumentId}
                            </td>
                            <td style={{ fontWeight: 800 }}>
                              {ev.totalScore} / {ev.maxScore}
                            </td>
                            <td style={{ fontWeight: 900, color: '#2563EB' }}>
                              {ev.percentage !== null ? `${ev.percentage}%` : 'Pendiente'}
                            </td>
                            <td>
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  padding: '3px 8px',
                                  borderRadius: 8,
                                  background: ev.status === 'graded' ? '#DCFCE7' : '#FEE2E2',
                                  color: ev.status === 'graded' ? '#15803D' : '#B91C1C'
                                }}
                              >
                                {ev.status === 'graded' ? 'Calificada' : 'Por Calificar'}
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => handleOpenGrading(ev)}
                                className="btn-3d btn-outline"
                                style={{ padding: '5px 10px', fontSize: '0.74rem' }}
                              >
                                <Edit3 size={13} /> {ev.status === 'graded' ? 'Editar Nota' : 'Calificar'}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════════════ PESTAÑA 4: HISTORIAL DE INTENTOS ════════════ */}
          {activeTab === 'attempts' && (
            <div>
              <div className="academic-table-container">
                <table className="academic-table">
                  <thead>
                    <tr>
                      <th>Fecha / Hora</th>
                      <th>Estudiante</th>
                      <th>Actividad</th>
                      <th>Tópico</th>
                      <th>Intento #</th>
                      <th>Respuesta del Alumno</th>
                      <th>Puntaje</th>
                      <th>Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attempts.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: 'center', padding: '30px', color: '#64748B', fontWeight: 700 }}>
                          No hay intentos registrados aún. Cada respuesta de práctica se almacena automáticamente.
                        </td>
                      </tr>
                    ) : (
                      attempts.slice(0, 80).map(att => {
                        const st = students.find(s => s.uid === att.studentId);
                        return (
                          <tr key={att.attemptId}>
                            <td style={{ fontSize: '0.76rem', color: '#64748B' }}>
                              {new Date(att.timestamp).toLocaleString()}
                            </td>
                            <td>
                              <span style={{ fontWeight: 800, color: '#0284C7' }}>{att.studentCode}</span>
                              <div style={{ fontSize: '0.74rem', color: '#475569' }}>{st?.displayName || ''}</div>
                            </td>
                            <td style={{ fontSize: '0.8rem', color: '#1E293B', fontWeight: 700 }}>
                              {att.activityId}
                            </td>
                            <td style={{ fontSize: '0.78rem', color: '#64748B' }}>
                              {att.theme}
                            </td>
                            <td style={{ textAlign: 'center', fontWeight: 800 }}>
                              {att.attemptNumber}
                            </td>
                            <td style={{ fontSize: '0.8rem', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              <code>{att.userAnswer}</code>
                            </td>
                            <td style={{ fontWeight: 800 }}>
                              {att.score}/{att.maxScore}
                            </td>
                            <td>
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  padding: '3px 8px',
                                  borderRadius: 8,
                                  background: att.status === 'correct' ? '#DCFCE7' : att.status === 'incorrect' ? '#FEE2E2' : '#EFF6FF',
                                  color: att.status === 'correct' ? '#15803D' : att.status === 'incorrect' ? '#B91C1C' : '#1D4ED8'
                                }}
                              >
                                {att.status === 'correct' ? 'Correcto' : att.status === 'incorrect' ? 'Incorrecto' : 'Revisión'}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════════════ PESTAÑA 5: OBSERVACIONES Y OPINIONES ════════════ */}
          {activeTab === 'observations' && (
            <div>
              {/* Encuestas de Estudiantes */}
              <div className="academic-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', marginBottom: 14 }}>
                  Opiniones de Estudiantes tras Prácticas (Encuestas de 30 Segundos)
                </h3>
                {opinions.length === 0 ? (
                  <p style={{ color: '#64748B', fontSize: '0.86rem', fontStyle: 'italic' }}>
                    No hay opiniones de estudiantes registradas aún.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {opinions.map(op => (
                      <div
                        key={op.opinionId}
                        style={{
                          background: '#F8FAFC',
                          border: '1.5px solid #E2E8F0',
                          borderRadius: 14,
                          padding: '14px 16px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748B', marginBottom: 6 }}>
                          <span><strong>Estudiante:</strong> {op.studentCode}</span>
                          <span><strong>Actividad:</strong> {op.activityId}</span>
                          <span><strong>Claridad:</strong> {op.instructionClarity}/5 ★</span>
                          <span><strong>Utilidad:</strong> {op.perceivedUtility}/5 ★</span>
                        </div>
                        {op.usageDifficulties && (
                          <div style={{ fontSize: '0.84rem', color: '#B91C1C', marginBottom: 4 }}>
                            <strong>Dificultades:</strong> {op.usageDifficulties}
                          </div>
                        )}
                        {op.optionalComment && (
                          <div style={{ fontSize: '0.86rem', color: '#0F172A' }}>
                            "{op.optionalComment}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ─── MODAL DE CALIFICACIÓN MANUAL DOCENTE (DISEÑO BLANCO) ─── */}
      {editingEval && (
        <div className="auth-backdrop" role="dialog" aria-modal="true">
          <div className="auth-card" style={{ maxWidth: 650 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                  Calificar Evaluación: {editingEval.studentCode}
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  {editingEval.instrumentId} • {editingEval.type.toUpperCase()}
                </span>
              </div>
              <button onClick={() => setEditingEval(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxHeight: '60vh', overflowY: 'auto', paddingRight: 6 }}>
              {editingEval.questions.map((q, idx) => {
                const ans = editingEval.answers[q.questionId] || '(Sin respuesta)';
                return (
                  <div key={q.questionId} style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: '14px 16px' }}>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem', marginBottom: 6 }}>
                      {idx + 1}. {q.prompt}
                    </div>

                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: '10px 12px', fontSize: '0.85rem', color: '#0F172A', marginBottom: 8, whiteSpace: 'pre-wrap' }}>
                      <strong>Respuesta del alumno:</strong>
                      <div style={{ marginTop: 4 }}>{ans}</div>
                    </div>

                    {q.rubricCriteria && (
                      <div style={{ fontSize: '0.78rem', color: '#166534', background: '#F0FDF4', padding: '6px 10px', borderRadius: 8, marginBottom: 8 }}>
                        <strong>Rúbrica de corrección:</strong> {q.rubricCriteria}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>
                        Nota (0 a {q.maxScore} pts):
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={q.maxScore}
                        value={manualScores[q.questionId] ?? 0}
                        onChange={(e) => setManualScores(prev => ({ ...prev, [q.questionId]: Number(e.target.value) }))}
                        style={{ width: 70, padding: '6px 10px', borderRadius: 8, border: '1.5px solid #CBD5E1', fontWeight: 800 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
              <button onClick={() => setEditingEval(null)} className="btn-3d btn-outline" style={{ padding: '8px 16px' }}>
                Cancelar
              </button>
              <button onClick={handleSaveGrading} className="btn-3d btn-green" style={{ padding: '8px 20px' }}>
                Guardar Calificación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL PARA REGISTRAR OBSERVACIÓN DOCENTE ─── */}
      {showObsModal && (
        <div className="auth-backdrop" role="dialog" aria-modal="true">
          <div className="auth-card" style={{ maxWidth: 500 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', marginBottom: 14 }}>
              Registrar Observación Docente
            </h3>

            <form onSubmit={handleSaveObservation} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label className="auth-label">Estudiante</label>
                <select
                  value={obsStudentUid}
                  onChange={(e) => setObsStudentUid(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontWeight: 700 }}
                >
                  {students.map(s => (
                    <option key={s.uid} value={s.uid}>
                      [{s.studentCode}] {s.displayName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="auth-label">Dificultad Observada</label>
                <input
                  type="text"
                  placeholder="ej. Confusión en el retorno de funciones o sintaxis de WHERE"
                  value={obsDifficulty}
                  onChange={(e) => setObsDifficulty(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1' }}
                  required
                />
              </div>

              <div>
                <label className="auth-label">Apoyo o Intervención Brindada</label>
                <input
                  type="text"
                  placeholder="ej. Explicación con diagrama IPO o analogía de tabla Excel"
                  value={obsSupport}
                  onChange={(e) => setObsSupport(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1' }}
                  required
                />
              </div>

              <div>
                <label className="auth-label">Comentarios Adicionales</label>
                <textarea
                  rows={3}
                  placeholder="Anotaciones cualitativas para el marco de investigación..."
                  value={obsComment}
                  onChange={(e) => setObsComment(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setShowObsModal(false)} className="btn-3d btn-outline" style={{ padding: '8px 16px' }}>
                  Cancelar
                </button>
                <button type="submit" className="btn-3d btn-green" style={{ padding: '8px 20px' }}>
                  Guardar Observación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL PARA REGISTRAR DIAGNÓSTICO EXTERNO ─── */}
      {showExternalEvalModal && (
        <div className="auth-backdrop" role="dialog" aria-modal="true">
          <div className="auth-card" style={{ maxWidth: 500 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', marginBottom: 14 }}>
              Registrar Prueba Diagnóstica Externa
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '0 0 14px 0' }}>
              Utiliza esta opción si aplicaste el examen diagnóstico en papel o en otra plataforma y deseas integrarlo a la investigación.
            </p>

            <form onSubmit={handleSaveExternalEval} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label className="auth-label">Estudiante</label>
                <select
                  value={extEvalStudentUid}
                  onChange={(e) => setExtEvalStudentUid(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontWeight: 700 }}
                >
                  {students.map(s => (
                    <option key={s.uid} value={s.uid}>
                      [{s.studentCode}] {s.displayName}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label className="auth-label">Ruta</label>
                  <select
                    value={extEvalPath}
                    onChange={(e) => setExtEvalPath(e.target.value as LearningPath)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontWeight: 700 }}
                  >
                    <option value="kotlin">Kotlin</option>
                    <option value="sql">SQL</option>
                  </select>
                </div>
                <div>
                  <label className="auth-label">Fecha de Aplicación</label>
                  <input
                    type="date"
                    value={extEvalDate}
                    onChange={(e) => setExtEvalDate(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label className="auth-label">Puntaje Obtenido</label>
                  <input
                    type="number"
                    min={0}
                    value={extEvalScore}
                    onChange={(e) => setExtEvalScore(Number(e.target.value))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontWeight: 800 }}
                    required
                  />
                </div>
                <div>
                  <label className="auth-label">Puntaje Máximo</label>
                  <input
                    type="number"
                    min={1}
                    value={extEvalMaxScore}
                    onChange={(e) => setExtEvalMaxScore(Number(e.target.value))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontWeight: 800 }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setShowExternalEvalModal(false)} className="btn-3d btn-outline" style={{ padding: '8px 16px' }}>
                  Cancelar
                </button>
                <button type="submit" className="btn-3d btn-green" style={{ padding: '8px 20px' }}>
                  Registrar Evaluación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
