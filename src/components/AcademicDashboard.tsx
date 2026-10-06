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
  AlertTriangle,
  X,
  ArrowLeft,
  Eye,
  EyeOff,
  Shield,
  MessageSquare
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
  const [showInputPass, setShowInputPass] = useState(false);
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
      const idMatch = (st.idNumber || '').toLowerCase().includes(term);
      const emailMatch = (st.email || '').toLowerCase().includes(term);
      if (!codeMatch && !nameMatch && !idMatch && !emailMatch) return false;
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

  // Asignar o retirar participante de investigación
  const handleToggleResearchParticipant = async (student: UserProfile) => {
    soundService.playToken();
    const updatedStatus = !student.isResearchParticipant;
    await userService.updateStudentAcademicInfo(student.uid, { isResearchParticipant: updatedStatus });
    setStudents(prev => prev.map(s => s.uid === student.uid ? { ...s, isResearchParticipant: updatedStatus } : s));
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

  // ─── PANTALLA DE BLOQUEO / CONTRASEÑA SECUNDARIA (DISEÑO BLANCO Y SEGURO) ───
  if (!isUnlocked) {
    return (
      <div className="auth-backdrop" role="dialog" aria-modal="true">
        <div className="auth-card" style={{ maxWidth: 460 }}>
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

          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px auto',
                boxShadow: '0 8px 20px -4px rgba(217, 119, 6, 0.4)',
                color: '#FFFFFF'
              }}
            >
              <Lock size={28} strokeWidth={2.4} />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
              {isPasswordConfigured ? 'Seguimiento Académico' : 'Configurar Acceso Docente'}
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0, lineHeight: 1.45 }}>
              {isPasswordConfigured
                ? 'Área protegida de investigación para Joseph Carazo. Ingresa tu contraseña secundaria.'
                : 'Define tu contraseña secundaria con hash criptográfico para proteger los datos de los estudiantes.'}
            </p>
          </div>

          {authError && (
            <div className="auth-error-box" role="alert">
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <span>{authError}</span>
            </div>
          )}

          {isPasswordConfigured ? (
            /* Desbloquear con contraseña existente */
            <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="admin-unlock-pass">
                  <span>Contraseña Secundaria</span>
                </label>
                <div className="auth-input-wrapper">
                  <KeyRound size={18} color="#64748B" />
                  <input
                    id="admin-unlock-pass"
                    type={showInputPass ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowInputPass(!showInputPass)}
                    title={showInputPass ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showInputPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-btn-primary"
                disabled={authLoading}
                style={{ background: '#F59E0B', boxShadow: '0 4px 0 #D97706' }}
              >
                <Unlock size={18} />
                <span>{authLoading ? 'Verificando...' : 'Desbloquear Panel'}</span>
              </button>
            </form>
          ) : (
            /* Configurar por primera vez */
            <form onSubmit={handleInitialSetup} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="admin-new-pass">
                  <span>Nueva Contraseña Secundaria</span>
                  <span className="auth-label-badge">Mínimo 8 caracteres</span>
                </label>
                <div className="auth-input-wrapper">
                  <KeyRound size={18} color="#64748B" />
                  <input
                    id="admin-new-pass"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="admin-confirm-pass">
                  <span>Confirmar Contraseña Secundaria</span>
                </label>
                <div className="auth-input-wrapper">
                  <KeyRound size={18} color="#64748B" />
                  <input
                    id="admin-confirm-pass"
                    type="password"
                    placeholder="Repite la contraseña"
                    value={confirmAdminPassword}
                    onChange={(e) => setConfirmAdminPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="admin-reauth-pass">
                  <span>Contraseña Actual de tu Cuenta de Correo</span>
                  <span className="auth-label-badge">Verificación de identidad</span>
                </label>
                <div className="auth-input-wrapper">
                  <Lock size={18} color="#64748B" />
                  <input
                    id="admin-reauth-pass"
                    type="password"
                    placeholder="Contraseña de josephcarazo56@gmail.com"
                    value={reauthAccountPass}
                    onChange={(e) => setReauthAccountPass(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-btn-primary"
                disabled={authLoading}
                style={{ background: '#10B981', boxShadow: '0 4px 0 #059669' }}
              >
                <span>{authLoading ? 'Configurando...' : 'Crear Contraseña y Acceder'}</span>
              </button>
            </form>
          )}

          <div className="auth-ethics-box" style={{ marginTop: 18 }}>
            <Shield size={16} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
            <span>
              <strong>Seguridad Criptográfica:</strong> La contraseña se almacena con hash PBKDF2-SHA256 (100.000 iteraciones) en Firestore y la sesión en memoria expira tras 30 minutos.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD PRINCIPAL DESBLOQUEADO (DISEÑO BLANCO Y RESPONSIVE DUOLINGO) ───
  return (
    <div className="academic-page-container">
      {/* ─── 1. BARRA SUPERIOR (HEADER) ─── */}
      <header className="academic-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => {
              soundService.playToken();
              onBack();
            }}
            className="btn-3d btn-outline"
            style={{ padding: '8px 14px', fontSize: '0.86rem' }}
            title="Volver a la App"
          >
            <ArrowLeft size={16} /> Volver a la App
          </button>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Seguimiento Académico</span>
              <span style={{ fontSize: '0.74rem', background: '#E0F2FE', color: '#0284C7', padding: '2px 8px', borderRadius: 8, fontWeight: 800 }}>
                Investigación Educativa
              </span>
            </h1>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
              Docente: <strong>{currentUser.displayName || currentUser.email}</strong> • {students.length} estudiantes registrados
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div
            style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              padding: '6px 12px',
              borderRadius: 12,
              fontSize: '0.76rem',
              color: '#166534',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Unlock size={14} color="#16A34A" />
            <span>Sesión Activa (30 min)</span>
          </div>

          <button
            onClick={handleLockSession}
            className="btn-3d btn-outline"
            style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#DC2626', borderColor: '#FCA5A5' }}
            title="Bloquear sesión ahora"
          >
            <Lock size={14} /> Bloquear
          </button>
        </div>
      </header>

      {/* ─── 2. DOCK DE NAVEGACIÓN ENTRE SECCIONES (TABS) ─── */}
      <nav className="academic-nav-dock" aria-label="Secciones del panel">
        {[
          { key: 'group' as const, label: 'Resumen Grupal', icon: <Users size={16} /> },
          { key: 'student' as const, label: 'Ficha por Estudiante', icon: <UserCheck size={16} /> },
          { key: 'evaluations' as const, label: 'Evaluaciones Diagnósticas y Finales', icon: <Award size={16} /> },
          { key: 'attempts' as const, label: 'Historial de Intentos', icon: <BarChart3 size={16} /> },
          { key: 'observations' as const, label: 'Observaciones y Opiniones', icon: <MessageSquare size={16} /> }
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
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* ─── 3. BARRA DE FILTROS Y ACCIONES DE EXPORTACIÓN ─── */}
      <section className="academic-card" style={{ padding: '14px 18px', marginBottom: 18 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', flex: 1, minWidth: 260 }}>
            {/* Buscar estudiante */}
            <div style={{ position: 'relative', width: 230, minWidth: 200 }}>
              <Search size={16} color="#64748B" style={{ position: 'absolute', left: 12, top: 11 }} />
              <input
                type="text"
                placeholder="Buscar código, cédula o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: 12,
                  padding: '8px 12px 8px 34px',
                  color: '#0F172A',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Filtro de Grupo */}
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              style={{
                background: '#F8FAFC',
                border: '1.5px solid #CBD5E1',
                borderRadius: 12,
                padding: '8px 12px',
                color: '#0F172A',
                fontSize: '0.82rem',
                fontWeight: 700,
                outline: 'none'
              }}
            >
              <option value="all">Todos los Grupos</option>
              {Array.from(new Set(students.map(s => s.group || 'Grupo A'))).map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            {/* Filtro de Ruta */}
            <div style={{ display: 'flex', gap: 4, background: '#F1F5F9', padding: 4, borderRadius: 12, border: '1px solid #E2E8F0' }}>
              {(['all', 'kotlin', 'sql'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => {
                    soundService.playToken();
                    setSelectedPath(p);
                  }}
                  style={{
                    background: selectedPath === p ? '#FFFFFF' : 'transparent',
                    color: selectedPath === p ? '#0F172A' : '#64748B',
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: '0.78rem',
                    fontWeight: selectedPath === p ? 900 : 700,
                    cursor: 'pointer',
                    boxShadow: selectedPath === p ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    textTransform: 'uppercase'
                  }}
                >
                  {p === 'all' ? 'Todas' : p}
                </button>
              ))}
            </div>
          </div>

          {/* Botones de Exportación */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => {
                soundService.playToken();
                if (students.length > 0) setExtEvalStudentUid(students[0].uid);
                setShowExternalEvalModal(true);
              }}
              className="btn-3d btn-outline"
              style={{ padding: '9px 14px', fontSize: '0.82rem' }}
              title="Registrar diagnóstico aplicado en papel/aula"
            >
              <PlusCircle size={15} /> Diagnóstico Externo
            </button>

            <button
              onClick={handleExportExcel}
              className="btn-3d btn-green"
              style={{ padding: '9px 16px', fontSize: '0.84rem' }}
              title="Descargar libro Excel con 7 hojas de datos de investigación"
            >
              <FileSpreadsheet size={16} /> Exportar Excel (.xlsx)
            </button>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
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

              {/* Tabla Grupal de Estudiantes */}
              <div className="academic-table-container">
                <div style={{ padding: '12px 16px', background: '#F8FAFC', borderBottom: '1.5px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#475569' }}>
                    Mostrando {filteredStudents.length} de {students.length} estudiantes
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
                    ← Desliza horizontalmente para ver todos los indicadores →
                  </span>
                </div>

                <table className="academic-table">
                  <thead>
                    <tr>
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
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={12} style={{ textAlign: 'center', padding: '30px', color: '#64748B', fontWeight: 700 }}>
                          No se encontraron estudiantes con los filtros seleccionados.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map(st => {
                        const ind = indicatorsMap[st.uid];
                        return (
                          <tr key={st.uid}>
                            <td style={{ fontWeight: 900, color: '#0284C7' }}>
                              {st.studentCode || 'E01'}
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
                            <td style={{ fontWeight: 700 }}>
                              {ind?.estimatedActiveTimeMinutes ?? 0} min
                            </td>
                            <td style={{ fontWeight: 700 }}>
                              {ind?.firstAttemptAccuracyPercent !== null ? `${ind?.firstAttemptAccuracyPercent}%` : <span style={{ color: '#94A3B8' }}>Sin datos</span>}
                            </td>
                            <td style={{ fontWeight: 700, color: '#7C3AED' }}>
                              {ind?.diagnosticPercentage !== null ? `${ind?.diagnosticPercentage}%` : <span style={{ color: '#94A3B8' }}>Sin datos</span>}
                            </td>
                            <td style={{ fontWeight: 700, color: '#D97706' }}>
                              {ind?.finalTestPercentage !== null ? `${ind?.finalTestPercentage}%` : <span style={{ color: '#94A3B8' }}>Sin datos</span>}
                            </td>
                            <td style={{ fontWeight: 900, color: (ind?.percentagePointGain ?? 0) > 0 ? '#16A34A' : '#64748B' }}>
                              {ind?.percentagePointGain !== null ? `${ind?.percentagePointGain > 0 ? '+' : ''}${ind?.percentagePointGain} pts` : <span style={{ color: '#94A3B8' }}>Sin datos</span>}
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
            </div>
          )}

          {/* ════════════ PESTAÑA 2: FICHA POR ESTUDIANTE ════════════ */}
          {activeTab === 'student' && selectedStudent && (
            <div>
              {/* Barra superior de selección y PDF */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                  flexWrap: 'wrap',
                  gap: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
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
                      padding: '8px 14px',
                      color: '#0F172A',
                      fontSize: '0.88rem',
                      fontWeight: 800
                    }}
                  >
                    {filteredStudents.map(s => (
                      <option key={s.uid} value={s.uid}>
                        [{s.studentCode || 'E01'}] {s.displayName} {s.idNumber ? `(${s.idNumber})` : ''} - {s.group || 'Grupo A'}
                      </option>
                    ))}
                  </select>

                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={anonymizePdf}
                      onChange={(e) => setAnonymizePdf(e.target.checked)}
                      style={{ width: 16, height: 16 }}
                    />
                    <span>Anonimizar en reporte PDF (solo código {selectedStudent.studentCode})</span>
                  </label>
                </div>

                <button
                  onClick={handleExportPdf}
                  className="btn-3d btn-blue"
                  style={{ padding: '9px 16px', fontSize: '0.84rem' }}
                >
                  <FileText size={16} /> Exportar Reporte PDF
                </button>
              </div>

              {/* Ficha de Identificación del Estudiante */}
              <div
                className="academic-card"
                style={{
                  padding: '18px 20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 16,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#FFFFFF'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A' }}>
                    {selectedStudent.displayName}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#64748B', marginTop: 4, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    {selectedStudent.idNumber && (
                      <span><strong>Cédula:</strong> <span style={{ color: '#0F172A' }}>{selectedStudent.idNumber}</span></span>
                    )}
                    {selectedStudent.email && (
                      <span><strong>Correo:</strong> <span style={{ color: '#0F172A' }}>{selectedStudent.email}</span></span>
                    )}
                    <span><strong>Código Oficial:</strong> <span style={{ color: '#0284C7', fontWeight: 800 }}>{selectedStudent.studentCode || 'E01'}</span></span>
                    <span><strong>Grupo:</strong> {selectedStudent.group || 'Grupo A'}</span>
                    <span><strong>Ruta:</strong> {selectedStudent.currentPath.toUpperCase()}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => handleToggleResearchParticipant(selectedStudent)}
                    className="btn-3d"
                    style={{
                      background: selectedStudent.isResearchParticipant ? '#10B981' : '#E2E8F0',
                      color: selectedStudent.isResearchParticipant ? '#FFFFFF' : '#475569',
                      boxShadow: selectedStudent.isResearchParticipant ? '0 3px 0 #059669' : '0 3px 0 #CBD5E1',
                      padding: '7px 14px',
                      fontSize: '0.78rem'
                    }}
                  >
                    {selectedStudent.isResearchParticipant ? '✓ Participante de Investigación' : 'Asignar como Participante'}
                  </button>
                </div>
              </div>

              {/* Métricas Principales del Estudiante en Cuadrícula */}
              {indicatorsMap[selectedStudent.uid] && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 18 }}>
                  <div className="academic-metric-card" style={{ borderLeft: '4px solid #0284C7' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800 }}>TIEMPO ACTIVO ESTIMADO</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0284C7' }}>
                      {indicatorsMap[selectedStudent.uid].estimatedActiveTimeMinutes} min
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      {indicatorsMap[selectedStudent.uid].activeDaysCount} días activos
                    </span>
                  </div>

                  <div className="academic-metric-card" style={{ borderLeft: '4px solid #16A34A' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800 }}>PRECISIÓN 1ER INTENTO</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#16A34A' }}>
                      {indicatorsMap[selectedStudent.uid].firstAttemptAccuracyPercent !== null
                        ? `${indicatorsMap[selectedStudent.uid].firstAttemptAccuracyPercent}%`
                        : 'Sin datos'}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      {indicatorsMap[selectedStudent.uid].totalAttempts} intentos registrados
                    </span>
                  </div>

                  <div className="academic-metric-card" style={{ borderLeft: '4px solid #7C3AED' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800 }}>DIAGNÓSTICO INICIAL</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#7C3AED' }}>
                      {indicatorsMap[selectedStudent.uid].diagnosticPercentage !== null
                        ? `${indicatorsMap[selectedStudent.uid].diagnosticPercentage}%`
                        : 'Sin datos'}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Línea de base</span>
                  </div>

                  <div className="academic-metric-card" style={{ borderLeft: '4px solid #D97706' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800 }}>PRUEBA FINAL</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#D97706' }}>
                      {indicatorsMap[selectedStudent.uid].finalTestPercentage !== null
                        ? `${indicatorsMap[selectedStudent.uid].finalTestPercentage}%`
                        : 'Sin datos'}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Desempeño post-intervención</span>
                  </div>

                  <div className="academic-metric-card" style={{ borderLeft: '4px solid #10B981' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800 }}>GANANCIA NETA</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: (indicatorsMap[selectedStudent.uid].percentagePointGain ?? 0) > 0 ? '#10B981' : '#64748B' }}>
                      {indicatorsMap[selectedStudent.uid].percentagePointGain !== null
                        ? `${indicatorsMap[selectedStudent.uid].percentagePointGain! > 0 ? '+' : ''}${indicatorsMap[selectedStudent.uid].percentagePointGain} pts`
                        : 'Sin datos'}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Diferencia porcentual</span>
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
