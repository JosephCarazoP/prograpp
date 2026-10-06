import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  FileSpreadsheet,
  FileText,
  Users,
  UserCheck,
  Search,
  BarChart3,
  Award,
  Edit3,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';
import { UserProfile, LearningPath } from '../types/user';
import {
  EducationalIndicators,
  ExerciseAttempt,
  AcademicEvaluation,
  TeacherObservation,
  ActivityOpinion
} from '../types/academic';
import { adminSecurityService } from '../services/adminSecurityService';
import { academicService } from '../services/academicService';
import { userService } from '../services/userService';
import { progressService } from '../services/progressService';
import { excelExportService } from '../services/excelExportService';
import { pdfExportService } from '../services/pdfExportService';
import { soundService } from '../services/soundService';

interface AcademicDashboardProps {
  currentUser: UserProfile;
  onBack: () => void;
}

export const AcademicDashboard: React.FC<AcademicDashboardProps> = ({ currentUser, onBack }) => {
  // Estado de desbloqueo criptográfico
  const [isUnlocked, setIsUnlocked] = useState(adminSecurityService.isSessionUnlocked());
  const [isPasswordConfigured, setIsPasswordConfigured] = useState(false);

  // Formulario de desbloqueo o creación de contraseña
  const [inputPassword, setInputPassword] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [reauthAccountPass, setReauthAccountPass] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Pestañas del Panel
  const [activeTab, setActiveTab] = useState<'group' | 'student' | 'evaluations' | 'attempts' | 'observations'>('group');

  // Datos del Panel
  const [loadingData, setLoadingData] = useState(false);
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [evaluations, setEvaluations] = useState<AcademicEvaluation[]>([]);
  const [observations, setObservations] = useState<TeacherObservation[]>([]);
  const [opinions, setOpinions] = useState<ActivityOpinion[]>([]);
  const [progressMapByUser, setProgressMapByUser] = useState<Record<string, Record<string, any>>>({});

  // Filtros
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedPath, setSelectedPath] = useState<LearningPath | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentUid, setSelectedStudentUid] = useState<string | null>(null);

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

  // 1. Comprobar estado de seguridad al cargar
  useEffect(() => {
    async function checkSec() {
      try {
        const configured = await adminSecurityService.isPasswordConfigured();
        setIsPasswordConfigured(configured);
        setIsUnlocked(adminSecurityService.isSessionUnlocked());
      } catch (err) {
        console.warn('Error al verificar configuración de seguridad:', err);
      }
    }
    checkSec();
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

  // Desbloquear sesión con contraseña secundaria
  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    soundService.playToken();

    try {
      await adminSecurityService.unlockWithPassword(inputPassword);
      setIsUnlocked(true);
      soundService.playWin();
      setInputPassword('');
    } catch (err: unknown) {
      soundService.playError();
      setAuthError(err instanceof Error ? err.message : 'Error al verificar contraseña.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Crear contraseña por primera vez
  const handleInitialSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (newAdminPassword !== confirmAdminPassword) {
      setAuthError('Las contraseñas no coinciden.');
      return;
    }
    if (newAdminPassword.length < 8) {
      setAuthError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setAuthLoading(true);
    soundService.playToken();

    try {
      await adminSecurityService.setupInitialPassword(newAdminPassword, reauthAccountPass);
      setIsUnlocked(true);
      setIsPasswordConfigured(true);
      soundService.playWin();
    } catch (err: unknown) {
      soundService.playError();
      setAuthError(err instanceof Error ? err.message : 'Error al configurar contraseña.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLockSession = () => {
    soundService.playToken();
    adminSecurityService.lockSession();
    setIsUnlocked(false);
  };

  // Filtrado de estudiantes
  const filteredStudents = students.filter(st => {
    if (selectedGroup !== 'all' && (st.group || 'Grupo A') !== selectedGroup) return false;
    if (selectedPath !== 'all' && st.currentPath !== selectedPath) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const codeMatch = (st.studentCode || '').toLowerCase().includes(term);
      const nameMatch = st.displayName.toLowerCase().includes(term);
      const emailMatch = (st.email || '').toLowerCase().includes(term);
      if (!codeMatch && !nameMatch && !emailMatch) return false;
    }
    return true;
  });

  const selectedStudent = students.find(s => s.uid === selectedStudentUid) || students[0];

  // Cálculo de indicadores para cada estudiante
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

  // ─── PANTALLA DE BLOQUEO / CONTRASEÑA SECUNDARIA ───
  if (!isUnlocked) {
    return (
      <div className="profile-page-root" role="dialog" aria-modal="true">
        <div className="profile-page-container" style={{ maxWidth: 500 }}>
          <header className="profile-page-header">
            <button onClick={onBack} className="profile-icon-btn-3d" title="Volver">
              <X size={20} />
            </button>
            <div className="profile-header-title">
              <h1 style={{ fontSize: '1.1rem', fontWeight: 900 }}>Seguimiento Académico</h1>
              <span>Zona Administrativa Protegida</span>
            </div>
          </header>

          <main className="profile-page-content" style={{ marginTop: 20 }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  background: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  boxShadow: '0 4px 0 #B45309'
                }}
              >
                <Lock size={32} color="#FFFFFF" strokeWidth={2.4} />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF' }}>
                {isPasswordConfigured ? 'Desbloquear Sección' : 'Configurar Contraseña Administrativa'}
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '0.86rem', marginTop: 4, maxWidth: 380, margin: '4px auto 0 auto' }}>
                {isPasswordConfigured
                  ? 'Esta sección contiene los registros de los estudiantes para tu investigación. Ingresa tu contraseña secundaria con hash criptográfico.'
                  : 'Es tu primera vez accediendo. Define tu contraseña de desbloqueo secundaria que se almacenará con salt y hash seguro PBKDF2.'}
              </p>
            </div>

            {authError && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1.5px solid #EF4444',
                  color: '#F87171',
                  padding: '12px 14px',
                  borderRadius: 12,
                  fontSize: '0.86rem',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <AlertTriangle size={18} />
                <span>{authError}</span>
              </div>
            )}

            {isPasswordConfigured ? (
              // Formulario de Desbloqueo
              <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 6 }}>
                    Contraseña Administrativa
                  </label>
                  <div className="input-group">
                    <KeyRound size={18} color="#64748B" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-3d btn-orange"
                  disabled={authLoading}
                  style={{ marginTop: 6 }}
                >
                  <Unlock size={18} />
                  {authLoading ? 'Verificando Hash...' : 'Desbloquear Datos'}
                </button>
              </form>
            ) : (
              // Formulario de Configuración Inicial (Primera vez)
              <form onSubmit={handleInitialSetup} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 6 }}>
                    Nueva Contraseña Administrativa (Mínimo 8 caracteres)
                  </label>
                  <div className="input-group">
                    <KeyRound size={18} color="#64748B" />
                    <input
                      type="password"
                      placeholder="Crea una contraseña segura"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 6 }}>
                    Confirmar Nueva Contraseña
                  </label>
                  <div className="input-group">
                    <KeyRound size={18} color="#64748B" />
                    <input
                      type="password"
                      placeholder="Repite la contraseña"
                      value={confirmAdminPassword}
                      onChange={(e) => setConfirmAdminPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 6 }}>
                    Contraseña actual de tu correo ({currentUser.email})
                  </label>
                  <div className="input-group">
                    <Lock size={18} color="#64748B" />
                    <input
                      type="password"
                      placeholder="Contraseña de tu cuenta Firebase"
                      value={reauthAccountPass}
                      onChange={(e) => setReauthAccountPass(e.target.value)}
                      required
                    />
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: 4, display: 'block' }}>
                    Requerido para reautenticación de seguridad antes de autorizar el primer hash.
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn-3d btn-green"
                  disabled={authLoading}
                  style={{ marginTop: 6 }}
                >
                  <CheckCircle2 size={18} />
                  {authLoading ? 'Derivando Hash PBKDF2...' : 'Establecer y Desbloquear'}
                </button>
              </form>
            )}
          </main>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD DESBLOQUEADO ───
  return (
    <div className="profile-page-root" role="dialog" aria-modal="true" style={{ padding: 12 }}>
      <div className="profile-page-container" style={{ maxWidth: 1100 }}>
        {/* Encabezado Superior */}
        <header className="profile-page-header" style={{ paddingBottom: 12 }}>
          <button onClick={onBack} className="profile-icon-btn-3d" title="Volver al Camino">
            <X size={20} />
          </button>
          <div className="profile-header-title">
            <h1 style={{ fontSize: '1.25rem', fontWeight: 900 }}>Seguimiento Académico</h1>
            <span style={{ color: '#06B6D4', fontWeight: 700 }}>
              Panel de Investigación Docente • {currentUser.email}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleExportExcel}
              className="btn-3d btn-green"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
              title="Descargar libro Excel con las 7 hojas completas"
            >
              <FileSpreadsheet size={16} /> Excel (.xlsx)
            </button>
            <button
              onClick={handleLockSession}
              className="btn-3d btn-outline"
              style={{ padding: '8px 12px', fontSize: '0.82rem', color: '#F87171' }}
              title="Bloquear sección administrativa"
            >
              <Lock size={15} /> Bloquear
            </button>
          </div>
        </header>

        {/* Barra de Filtros */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1.5px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            padding: '12px 16px',
            marginBottom: 16,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Buscar estudiante */}
            <div style={{ position: 'relative', width: 220 }}>
              <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: 10, top: 10 }} />
              <input
                type="text"
                placeholder="Buscar código o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0B131E',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 10,
                  padding: '7px 10px 7px 32px',
                  color: '#FFFFFF',
                  fontSize: '0.82rem'
                }}
              />
            </div>

            {/* Filtro de Grupo */}
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              style={{
                background: '#0B131E',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 10,
                padding: '6px 10px',
                color: '#CBD5E1',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
            >
              <option value="all">Todos los Grupos</option>
              {Array.from(new Set(students.map(s => s.group || 'Grupo A'))).map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            {/* Filtro de Ruta */}
            <div style={{ display: 'flex', gap: 4, background: '#0B131E', padding: 3, borderRadius: 10 }}>
              {(['all', 'kotlin', 'sql'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setSelectedPath(p)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 8,
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    background: selectedPath === p ? '#06B6D4' : 'transparent',
                    color: selectedPath === p ? '#FFFFFF' : '#94A3B8'
                  }}
                >
                  {p === 'all' ? 'Todas las Rutas' : p.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {loadingData && (
              <span style={{ fontSize: '0.78rem', color: '#06B6D4', fontWeight: 700 }}>
                Sincronizando datos...
              </span>
            )}
            <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
              Estudiantes: <strong>{filteredStudents.length}</strong>
            </span>
            <button
              onClick={() => setShowObsModal(true)}
              className="btn-3d btn-outline"
              style={{ padding: '7px 12px', fontSize: '0.8rem' }}
            >
              <PlusCircle size={15} /> Observación Docente
            </button>
            <button
              onClick={() => setShowExternalEvalModal(true)}
              className="btn-3d btn-outline"
              style={{ padding: '7px 12px', fontSize: '0.8rem' }}
            >
              <PlusCircle size={15} /> Diagnóstico Externo
            </button>
          </div>
        </div>

        {/* Pestañas Principales */}
        <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid rgba(255, 255, 255, 0.08)', marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { id: 'group', label: 'Resumen del Grupo', icon: Users },
            { id: 'student', label: 'Ficha por Estudiante', icon: UserCheck },
            { id: 'evaluations', label: 'Evaluaciones y Calificación', icon: Award },
            { id: 'attempts', label: 'Historial de Intentos', icon: BarChart3 },
            { id: 'observations', label: 'Observaciones y Opiniones', icon: Edit3 }
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  soundService.playToken();
                  setActiveTab(t.id as any);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 16px',
                  borderRadius: '12px 12px 0 0',
                  border: 'none',
                  background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  color: isActive ? '#38BDF8' : '#94A3B8',
                  borderBottom: isActive ? '3px solid #06B6D4' : '3px solid transparent',
                  fontWeight: 800,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* ═══ PESTAÑA 1: RESUMEN DEL GRUPO ═══ */}
        {activeTab === 'group' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 12, marginBottom: 18 }}>
              <div className="profile-card-duo" style={{ margin: 0 }}>
                <span className="profile-card-label">Total Participantes</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#38BDF8' }}>
                  {filteredStudents.length}
                </div>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Estudiantes registrados</span>
              </div>
              <div className="profile-card-duo" style={{ margin: 0 }}>
                <span className="profile-card-label">Total Intentos Realizados</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#22C55E' }}>
                  {attempts.length}
                </div>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Respuestas interactivas</span>
              </div>
              <div className="profile-card-duo" style={{ margin: 0 }}>
                <span className="profile-card-label">Evaluaciones Registradas</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#A855F7' }}>
                  {evaluations.length}
                </div>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Diagnósticos y Finales</span>
              </div>
              <div className="profile-card-duo" style={{ margin: 0 }}>
                <span className="profile-card-label">Observaciones Docentes</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#F59E0B' }}>
                  {observations.length}
                </div>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Bitácora de apoyo</span>
              </div>
            </div>

            {/* Tabla del Grupo */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: 16, border: '1.5px solid rgba(255, 255, 255, 0.08)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#CBD5E1' }}>
                    <th style={{ padding: '12px 14px' }}>Código</th>
                    <th style={{ padding: '12px 14px' }}>Estudiante</th>
                    <th style={{ padding: '12px 14px' }}>Ruta</th>
                    <th style={{ padding: '12px 14px' }}>Días Activos</th>
                    <th style={{ padding: '12px 14px' }}>Tiempo Activo</th>
                    <th style={{ padding: '12px 14px' }}>1er Intento (%)</th>
                    <th style={{ padding: '12px 14px' }}>Diagnóstico</th>
                    <th style={{ padding: '12px 14px' }}>Prueba Final</th>
                    <th style={{ padding: '12px 14px' }}>Ganancia</th>
                    <th style={{ padding: '12px 14px' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((st) => {
                    const ind = indicatorsMap[st.uid];
                    return (
                      <tr key={st.uid} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 800, color: '#38BDF8' }}>
                          {st.studentCode || 'E01'}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#FFFFFF', fontWeight: 700 }}>
                          {st.displayName}
                        </td>
                        <td style={{ padding: '12px 14px', textTransform: 'uppercase', color: '#94A3B8' }}>
                          {st.currentPath}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {ind?.activeDaysCount ?? 0} días
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {ind?.estimatedActiveTimeMinutes ?? 0} min
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {ind?.firstAttemptAccuracyPercent !== null ? `${ind?.firstAttemptAccuracyPercent}%` : <span style={{ color: '#64748B' }}>Sin datos</span>}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {ind?.diagnosticPercentage !== null ? `${ind?.diagnosticPercentage}%` : <span style={{ color: '#64748B' }}>Sin datos</span>}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {ind?.finalTestPercentage !== null ? `${ind?.finalTestPercentage}%` : <span style={{ color: '#64748B' }}>Sin datos</span>}
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: 800, color: (ind?.percentagePointGain ?? 0) > 0 ? '#22C55E' : '#94A3B8' }}>
                          {ind?.percentagePointGain !== null ? `${ind?.percentagePointGain > 0 ? '+' : ''}${ind?.percentagePointGain} pts` : <span style={{ color: '#64748B' }}>Sin datos</span>}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <button
                            onClick={() => {
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
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ PESTAÑA 2: FICHA POR ESTUDIANTE ═══ */}
        {activeTab === 'student' && selectedStudent && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <select
                  value={selectedStudent.uid}
                  onChange={(e) => setSelectedStudentUid(e.target.value)}
                  style={{
                    background: '#0B131E',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 10,
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    fontWeight: 700
                  }}
                >
                  {filteredStudents.map(s => (
                    <option key={s.uid} value={s.uid}>
                      [{s.studentCode || 'E01'}] {s.displayName} ({s.group || 'Grupo A'})
                    </option>
                  ))}
                </select>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#94A3B8' }}>
                  <input
                    type="checkbox"
                    id="anonPdf"
                    checked={anonymizePdf}
                    onChange={(e) => setAnonymizePdf(e.target.checked)}
                  />
                  <label htmlFor="anonPdf">Anonimizar en reporte PDF (solo código {selectedStudent.studentCode})</label>
                </div>
              </div>

              <button
                onClick={handleExportPdf}
                className="btn-3d btn-blue"
                style={{ padding: '9px 16px', fontSize: '0.84rem' }}
              >
                <FileText size={16} /> Exportar Reporte PDF
              </button>
            </div>

            {/* Métricas del Estudiante */}
            {indicatorsMap[selectedStudent.uid] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, marginBottom: 18 }}>
                <div className="profile-card-duo" style={{ margin: 0 }}>
                  <span className="profile-card-label">Tiempo Activo Estimado</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38BDF8' }}>
                    {indicatorsMap[selectedStudent.uid].estimatedActiveTimeMinutes} min
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Interacción constante</span>
                </div>
                <div className="profile-card-duo" style={{ margin: 0 }}>
                  <span className="profile-card-label">Aciertos 1er Intento</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#22C55E' }}>
                    {indicatorsMap[selectedStudent.uid].firstAttemptAccuracyPercent !== null
                      ? `${indicatorsMap[selectedStudent.uid].firstAttemptAccuracyPercent}%`
                      : 'Sin datos'}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Precisión inicial</span>
                </div>
                <div className="profile-card-duo" style={{ margin: 0 }}>
                  <span className="profile-card-label">Diagnóstico Inicial</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#A855F7' }}>
                    {indicatorsMap[selectedStudent.uid].diagnosticPercentage !== null
                      ? `${indicatorsMap[selectedStudent.uid].diagnosticPercentage}%`
                      : 'Sin datos'}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Línea base</span>
                </div>
                <div className="profile-card-duo" style={{ margin: 0 }}>
                  <span className="profile-card-label">Prueba Final</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F59E0B' }}>
                    {indicatorsMap[selectedStudent.uid].finalTestPercentage !== null
                      ? `${indicatorsMap[selectedStudent.uid].finalTestPercentage}%`
                      : 'Sin datos'}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Desempeño post-test</span>
                </div>
                <div className="profile-card-duo" style={{ margin: 0 }}>
                  <span className="profile-card-label">Ganancia Neta</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10B981' }}>
                    {indicatorsMap[selectedStudent.uid].percentagePointGain !== null
                      ? `${indicatorsMap[selectedStudent.uid].percentagePointGain! > 0 ? '+' : ''}${indicatorsMap[selectedStudent.uid].percentagePointGain} pts`
                      : 'Sin datos'}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Diferencia de aprendizaje</span>
                </div>
              </div>
            )}

            {/* Desglose Temático */}
            <div className="profile-card-duo" style={{ marginBottom: 18 }}>
              <span className="profile-card-label">Desglose por Concepto / Tema</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                {Object.keys(indicatorsMap[selectedStudent.uid]?.topicBreakdown || {}).map(topic => {
                  const item = indicatorsMap[selectedStudent.uid].topicBreakdown[topic];
                  return (
                    <div
                      key={topic}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 12,
                        padding: 10
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#F1F5F9', marginBottom: 4 }}>
                        {topic}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94A3B8' }}>
                        <span>{item.correct} de {item.attempts} correctos</span>
                        <strong style={{ color: '#38BDF8' }}>
                          {item.scorePercent !== null ? `${item.scorePercent}%` : 'Sin datos'}
                        </strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ PESTAÑA 3: EVALUACIONES Y CALIFICACIÓN ═══ */}
        {activeTab === 'evaluations' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF' }}>
                Instrumentos Aplicados ({evaluations.length})
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {evaluations.map(ev => {
                const st = students.find(s => s.uid === ev.studentId);
                const isPending = ev.status === 'pending_review';
                return (
                  <div
                    key={ev.evalId}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1.5px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 14,
                      padding: '14px 18px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 12
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span
                          style={{
                            background: ev.type === 'diagnostic' ? '#0284C7' : '#7E22CE',
                            color: '#FFFFFF',
                            fontSize: '0.72rem',
                            fontWeight: 900,
                            padding: '2px 8px',
                            borderRadius: 6,
                            textTransform: 'uppercase'
                          }}
                        >
                          {ev.type === 'diagnostic' ? 'Diagnóstico' : 'Prueba Final'}
                        </span>
                        <strong style={{ color: '#FFFFFF', fontSize: '0.94rem' }}>
                          {st ? `[${st.studentCode || 'E01'}] ${st.displayName}` : ev.studentId}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                          Ruta: {ev.pathId.toUpperCase()} • {new Date(ev.startedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
                        Puntaje: <strong>{ev.totalScore} / {ev.maxScore}</strong> • Calificación:{' '}
                        <strong>{ev.percentage !== null ? `${ev.percentage}%` : 'Pendiente de revisión'}</strong>
                        {ev.isExternal && <span style={{ color: '#F59E0B', marginLeft: 8 }}>(Aplicado fuera de la app)</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {isPending ? (
                        <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B', padding: '4px 10px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800 }}>
                          Pendiente de Calificación
                        </span>
                      ) : (
                        <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22C55E', padding: '4px 10px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800 }}>
                          Calificada
                        </span>
                      )}

                      {!ev.isExternal && (
                        <button
                          onClick={() => handleOpenGrading(ev)}
                          className="btn-3d btn-blue"
                          style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                        >
                          Revisar y Calificar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ PESTAÑA 4: HISTORIAL DE INTENTOS ═══ */}
        {activeTab === 'attempts' && (
          <div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: 16, border: '1.5px solid rgba(255, 255, 255, 0.08)', overflowX: 'auto', maxHeight: 600 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead style={{ position: 'sticky', top: 0, background: '#111C2A', zIndex: 2 }}>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#CBD5E1' }}>
                    <th style={{ padding: '10px 12px' }}>Estudiante</th>
                    <th style={{ padding: '10px 12px' }}>Ruta</th>
                    <th style={{ padding: '10px 12px' }}>Tema</th>
                    <th style={{ padding: '10px 12px' }}>N° Intento</th>
                    <th style={{ padding: '10px 12px' }}>Respuesta</th>
                    <th style={{ padding: '10px 12px' }}>Estado</th>
                    <th style={{ padding: '10px 12px' }}>Puntaje</th>
                    <th style={{ padding: '10px 12px' }}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.slice(0, 150).map(att => (
                    <tr key={att.attemptId} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 700, color: '#38BDF8' }}>
                        {att.studentCode}
                      </td>
                      <td style={{ padding: '10px 12px', textTransform: 'uppercase' }}>
                        {att.pathId}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {att.theme}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        {att.attemptNumber}
                      </td>
                      <td style={{ padding: '10px 12px', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                        {att.userAnswer}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: 6,
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            background: att.status === 'correct' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: att.status === 'correct' ? '#4ADE80' : '#F87171'
                          }}
                        >
                          {att.status}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {att.score} / {att.maxScore}
                      </td>
                      <td style={{ padding: '10px 12px', color: '#94A3B8', fontSize: '0.76rem' }}>
                        {new Date(att.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ PESTAÑA 5: OBSERVACIONES Y OPINIONES ═══ */}
        {activeTab === 'observations' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
              {/* Observaciones Docentes */}
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 12 }}>
                  Observaciones Docentes ({observations.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {observations.map(o => (
                    <div
                      key={o.obsId}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 12,
                        padding: 12
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <strong style={{ color: '#38BDF8' }}>Estudiante: {o.studentCode}</strong>
                        <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>{o.date}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#F1F5F9', marginBottom: 4 }}>
                        <strong>Dificultad:</strong> {o.observedDifficulty}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#F1F5F9', marginBottom: 4 }}>
                        <strong>Apoyo Brindado:</strong> {o.supportGiven}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#CBD5E1', fontStyle: 'italic' }}>
                        "{o.teacherComment}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opiniones de Estudiantes */}
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 12 }}>
                  Opiniones Pedagógicas de Estudiantes ({opinions.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {opinions.map(op => (
                    <div
                      key={op.opinionId}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 12,
                        padding: 12
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <strong style={{ color: '#A855F7' }}>Estudiante: {op.studentCode}</strong>
                        <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                          Claridad: {op.instructionClarity}/5 ★ | Utilidad: {op.perceivedUtility}/5 ★
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginBottom: 4 }}>
                        <strong>Dificultades:</strong> {op.usageDifficulties}
                      </div>
                      {op.optionalComment && (
                        <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontStyle: 'italic' }}>
                          "{op.optionalComment}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ MODAL DE NUEVA OBSERVACIÓN DOCENTE ═══ */}
        {showObsModal && (
          <div className="modal-backdrop">
            <div className="modal-card" style={{ maxWidth: 460 }}>
              <button className="modal-close" onClick={() => setShowObsModal(false)}>
                <X size={20} />
              </button>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 14 }}>
                Registrar Observación y Apoyo Docente
              </h2>

              <form onSubmit={handleSaveObservation} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                    Estudiante
                  </label>
                  <select
                    value={obsStudentUid}
                    onChange={(e) => setObsStudentUid(e.target.value)}
                    required
                    style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, padding: 8, color: '#FFFFFF' }}
                  >
                    <option value="">Selecciona un estudiante</option>
                    {students.map(s => (
                      <option key={s.uid} value={s.uid}>[{s.studentCode || 'E01'}] {s.displayName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                    Dificultad Observada
                  </label>
                  <input
                    type="text"
                    placeholder="ej: Confusión en bucles anidados"
                    value={obsDifficulty}
                    onChange={(e) => setObsDifficulty(e.target.value)}
                    required
                    style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, padding: 8, color: '#FFFFFF' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                    Apoyo Pedagógico Brindado
                  </label>
                  <input
                    type="text"
                    placeholder="ej: Explicación con diagrama de flujo"
                    value={obsSupport}
                    onChange={(e) => setObsSupport(e.target.value)}
                    required
                    style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, padding: 8, color: '#FFFFFF' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                    Comentario Docente
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Notas cualitativas..."
                    value={obsComment}
                    onChange={(e) => setObsComment(e.target.value)}
                    required
                    style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, padding: 8, color: '#FFFFFF', resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn-3d btn-green" style={{ marginTop: 6 }}>
                  Guardar Observación
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ═══ MODAL DE DIAGNÓSTICO EXTERNO ═══ */}
        {showExternalEvalModal && (
          <div className="modal-backdrop">
            <div className="modal-card" style={{ maxWidth: 460 }}>
              <button className="modal-close" onClick={() => setShowExternalEvalModal(false)}>
                <X size={20} />
              </button>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 14 }}>
                Registrar Diagnóstico Externo (Fuera de la App)
              </h2>

              <form onSubmit={handleSaveExternalEval} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                    Estudiante
                  </label>
                  <select
                    value={extEvalStudentUid}
                    onChange={(e) => setExtEvalStudentUid(e.target.value)}
                    required
                    style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, padding: 8, color: '#FFFFFF' }}
                  >
                    <option value="">Selecciona un estudiante</option>
                    {students.map(s => (
                      <option key={s.uid} value={s.uid}>[{s.studentCode || 'E01'}] {s.displayName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                    Ruta Evaluada
                  </label>
                  <select
                    value={extEvalPath}
                    onChange={(e) => setExtEvalPath(e.target.value as any)}
                    style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, padding: 8, color: '#FFFFFF' }}
                  >
                    <option value="kotlin">Kotlin y Lógica</option>
                    <option value="sql">Bases de Datos y SQL</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                      Puntaje Obtenido
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={extEvalMaxScore}
                      value={extEvalScore}
                      onChange={(e) => setExtEvalScore(Number(e.target.value))}
                      required
                      style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, padding: 8, color: '#FFFFFF' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                      Puntaje Máximo
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={extEvalMaxScore}
                      onChange={(e) => setExtEvalMaxScore(Number(e.target.value))}
                      required
                      style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, padding: 8, color: '#FFFFFF' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
                    Fecha Real de Aplicación Externa
                  </label>
                  <input
                    type="date"
                    value={extEvalDate}
                    onChange={(e) => setExtEvalDate(e.target.value)}
                    required
                    style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, padding: 8, color: '#FFFFFF' }}
                  />
                </div>

                <button type="submit" className="btn-3d btn-green" style={{ marginTop: 6 }}>
                  Registrar Diagnóstico Externo
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ═══ MODAL DE CALIFICACIÓN DE PREGUNTAS ABIERTAS ═══ */}
        {editingEval && (
          <div className="modal-backdrop">
            <div className="modal-card" style={{ maxWidth: 650, maxHeight: '90vh', overflowY: 'auto' }}>
              <button className="modal-close" onClick={() => setEditingEval(null)}>
                <X size={20} />
              </button>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', marginBottom: 14 }}>
                Calificación Docente: {editingEval.type === 'diagnostic' ? 'Diagnóstico' : 'Prueba Final'}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {editingEval.questions.map((q, idx) => {
                  const studentAnswer = editingEval.answers[q.questionId] || '(Sin respuesta)';
                  const currentScore = manualScores[q.questionId] !== undefined ? manualScores[q.questionId] : (editingEval.scores[q.questionId] || 0);
                  const currentComment = manualComments[q.questionId] || '';

                  return (
                    <div
                      key={q.questionId}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 12,
                        padding: 14
                      }}
                    >
                      <div style={{ fontWeight: 800, color: '#38BDF8', fontSize: '0.86rem', marginBottom: 4 }}>
                        Pregunta {idx + 1}: {q.topic} (Máx: {q.maxScore} pts)
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#CBD5E1', marginBottom: 8, whiteSpace: 'pre-line' }}>
                        {q.prompt}
                      </div>

                      <div style={{ background: '#0B131E', padding: 10, borderRadius: 8, marginBottom: 8, fontSize: '0.82rem', fontFamily: 'monospace', color: '#F8FAFC' }}>
                        <strong>Respuesta del Estudiante:</strong><br />
                        {studentAnswer}
                      </div>

                      {q.rubricCriteria && (
                        <div style={{ fontSize: '0.74rem', color: '#F59E0B', marginBottom: 8 }}>
                          <strong>Criterio de Rúbrica:</strong> {q.rubricCriteria}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ width: 120 }}>
                          <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: 2 }}>
                            Puntaje (0 a {q.maxScore}):
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={q.maxScore}
                            value={currentScore}
                            onChange={(e) => setManualScores({ ...manualScores, [q.questionId]: Number(e.target.value) })}
                            style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 8, padding: 6, color: '#FFFFFF' }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: 2 }}>
                            Comentario pedagógico al estudiante:
                          </label>
                          <input
                            type="text"
                            placeholder="Feedback cualitativo..."
                            value={currentComment}
                            onChange={(e) => setManualComments({ ...manualComments, [q.questionId]: e.target.value })}
                            style={{ width: '100%', background: '#0B131E', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 8, padding: 6, color: '#FFFFFF' }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={handleSaveGrading}
                  className="btn-3d btn-green"
                  style={{ marginTop: 8 }}
                >
                  <CheckCircle2 size={16} /> Guardar Calificaciones y Emitir Nota
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
