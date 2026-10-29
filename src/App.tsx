import { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Gamepad2,
  GraduationCap,
  Sparkles,
  Trophy,
  Target,
  Star,
  Flag
} from 'lucide-react';

import { UserProfile, LearningPath as PathType, UserPowerUps } from './types/user';
import { Lesson, Exercise } from './types/lesson';
import { LessonProgress } from './types/progress';
import { userService, DEFAULT_PROFILE, sanitizeUserProfile } from './services/userService';
import { progressService } from './services/progressService';
import { authService, ADMIN_AUTHORIZED_EMAIL } from './services/authService';
import { soundService } from './services/soundService';
import { storageService } from './services/storageService';
import { notificationService } from './services/notificationService';
import { progressionEngine, ProgressionChestRewards } from './services/progressionEngine';
import { getUnitsByPath, getLessonById } from './content';
import { TheoryLesson } from './types/theory';
import { getTheoryByLessonId, getTheoriesByPath } from './content/theoryIndex';

// Componentes modulares
import { Navbar } from './components/Navbar';
import { DesktopSidebar } from './components/DesktopSidebar';
import { DesktopRightSidebar } from './components/DesktopRightSidebar';
import { LearningPath } from './components/LearningPath';
import { CoursesView } from './components/CoursesView';
import { LeagueView } from './components/LeagueView';
import { TheoryViewer } from './components/TheoryViewer';
import { TheoryCheckpointModal } from './components/TheoryCheckpointModal';
import { AuthModal } from './components/AuthModal';
import { ProfilePage } from './components/ProfilePage';
import { ChestModal } from './components/ChestModal';
import { BossFightArena } from './components/BossFight';
import { PowerUpsBar } from './components/PowerUpsBar';
import { VSCodeSnippet } from './components/VSCodeSnippet';
import { TraceStepComponent } from './components/exercises/TraceStepExercise';
import { ParsonsPuzzleComponent } from './components/exercises/ParsonsPuzzleExercise';
import { FlowchartExerciseComponent } from './components/exercises/FlowchartExercise';
import { LoadingScreen } from './components/LoadingScreen';
import { FormattedText } from './components/FormattedText';
import { ConsoleMascot, ConsoleDevAvatar } from './components/ConsoleAvatar';
import { GameAlertModal, GameAlertState } from './components/GameAlertModal';
import { AnimatedDoodleBackground } from './components/AnimatedDoodleBackground';
import { AcademicDashboard } from './components/AcademicDashboard';
import { EvaluationPage } from './components/EvaluationPage';
import { ActivityOpinionModal } from './components/ActivityOpinionModal';
import { QuestionReportModal } from './components/QuestionReportModal';
import { StreakCelebrationModal } from './components/StreakCelebrationModal';
import { StorePage } from './components/StorePage';
import { SeasonPathPage } from './components/SeasonPathPage';
import { LiveUsersModal } from './components/LiveUsersModal';
import { TeacherAttentionAlertModal } from './components/TeacherAttentionAlertModal';
import { NotificationsPage } from './components/NotificationsPage';
import { NetworkStatusBadge } from './components/NetworkStatusBadge';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { SqliteLab } from './components/sqlite/SqliteLab';
import { KotlinLab } from './components/kotlin/KotlinLab';
import { academicService } from './services/academicService';
import { timeTrackingService } from './services/timeTrackingService';
import { presenceService } from './services/presenceService';
import { AppNotification } from './types/notification';
import {
  getInstrument,
  EvaluationInstrument,
  INITIAL_COMPREHENSIVE_DIAGNOSTIC_INSTRUMENT,
  getDiagnosticInstrumentById
} from './content/academicEvaluations';

// Función para aleatorizar preguntas (Fisher-Yates shuffle)
function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Función para aleatorizar opciones y componentes internos de un reto (Anti-trampas: nunca respuestas en el mismo orden)
function randomizeExercise(exercise: Exercise): Exercise {
  const cloned = JSON.parse(JSON.stringify(exercise)) as Exercise;

  if (cloned.type === 'predict_output') {
    const originalCorrectText = cloned.options[cloned.correctOptionIndex];
    cloned.options = shuffleArray([...cloned.options]);
    const newIndex = cloned.options.indexOf(originalCorrectText);
    cloned.correctOptionIndex = newIndex >= 0 ? newIndex : 0;
  } else if (cloned.type === 'code_cloze') {
    cloned.options = shuffleArray([...cloned.options]);
  } else if (cloned.type === 'code_builder') {
    cloned.tokens = shuffleArray([...cloned.tokens]);
  } else if (cloned.type === 'matching_pairs') {
    cloned.pairs = shuffleArray([...cloned.pairs]);
  } else if (cloned.type === 'spot_the_bug') {
    if (Array.isArray(cloned.codeSnippet)) {
      // 1. Quitar comentarios spoiler y numeración manual que ensucian el código
      let cleaned = cloned.codeSnippet.map(l => {
        let line = l.replace(/^\s*\d+[\.\)]\s*/, '');
        line = line.replace(/\s*\/\/\s*(error|¡error|falta|peligro|atención|en\s+kotlin|en\s+sql|el\s+valor|la\s+palabra|data\s+class|type\s+mismatch|sqlite\s+es|no\s+existe|string\s+normal|int\s+no\s+anulable|char\s+usa|val\s+es|var\s+es|no\s+se\s+puede).*$/i, '');
        line = line.replace(/\s*--\s*(error|¡error|falta|en\s+sql|la\s+sentencia|en\s+sqlite|sqlite\s+es|no\s+se\s+puede).*$/i, '');
        return line.trimEnd();
      });

      // 2. Garantizar al menos 3 líneas de código para que el ejercicio tenga sentido de depuración
      if (cleaned.length <= 1) {
        const bugLine = cleaned[0] || '';
        const isSql = /select|from|table|insert|where|alter|drop|create/i.test(bugLine);
        if (isSql) {
          cleaned = [
            '-- Consulta de base de datos',
            bugLine,
            'ORDER BY id ASC;'
          ];
          cloned.bugLineIndex = 1;
        } else {
          cleaned = [
            'fun main() {',
            '    ' + bugLine.trim(),
            '    println("Operación completada")',
            '}'
          ];
          cloned.bugLineIndex = 1;
        }
      } else if (cleaned.length === 2) {
        cleaned.push('println("Resultado listo")');
      }

      cloned.codeSnippet = cleaned;
    }
  }

  return cloned;
}

// Instrucción pedagógica 100% Duolingo 3D explicada por el avatar Dev en la burbuja de diálogo
function getExerciseInstruction(exercise: Exercise): string {
  switch (exercise.type) {
    case 'trace_step':
      return 'Observa cada operación del código y anota en la tabla el valor que toma la variable en cada paso.';
    case 'spot_the_bug':
      return 'Lee el código detenidamente y pulsa sobre la línea que tiene el error de sintaxis o lógica.';
    case 'predict_output': {
      const p = exercise.prompt.toLowerCase();
      if (
        p.includes('qué significa') ||
        p.includes('por qué') ||
        p.includes('cuál de') ||
        p.includes('qué ocurre') ||
        p.includes('qué pasa') ||
        p.includes('qué ventaja') ||
        p.includes('ejemplifica')
      ) {
        return exercise.code
          ? 'Examina la consulta o código y selecciona la opción conceptual correcta.'
          : 'Lee atentamente la pregunta y selecciona la opción correcta.';
      }
      return 'Analiza la lógica del código y selecciona el resultado exacto que se mostrará en pantalla.';
    }
    case 'code_builder':
      return 'Toca las fichas inferiores en el orden correcto para ensamblar la instrucción de código.';
    case 'matching_pairs':
      return 'Toca un concepto de la columna izquierda y luego pulsa su pareja correspondiente en la derecha.';
    case 'code_cloze':
      return 'Selecciona la opción correcta para rellenar el espacio vacío en el código.';
    case 'parsons_puzzle':
      return 'Usa las flechas de cada bloque para colocar las líneas en su orden lógico de arriba hacia abajo.';
    default:
      return 'Selecciona la opción correcta para continuar.';
  }
}


export default function App() {
  // Inicialización instantánea offline-first para eliminar pantallas congeladas
  const [user, setUser] = useState<UserProfile>(() => {
    const raw = storageService.getItem<any>('user_profile', DEFAULT_PROFILE);
    return sanitizeUserProfile(raw);
  });
  const [progress, setProgress] = useState<Record<string, LessonProgress>>(() => {
    const raw = storageService.getItem<Record<string, LessonProgress>>('user_progress', {});
    return raw && typeof raw === 'object' ? raw : {};
  });

  // Vistas principales: path, lesson, practice, boss, profile, academic, notifications, store, season, sqlite-lab, kotlin-lab
  const [view, setView] = useState<'path' | 'lesson' | 'practice' | 'boss' | 'profile' | 'academic' | 'notifications' | 'store' | 'season' | 'sqlite-lab' | 'kotlin-lab'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'boss') return 'boss';
      if (params.get('view') === 'academic') return 'academic';
      if (params.get('view') === 'notifications') return 'notifications';
      if (params.get('view') === 'store' || params.get('view') === 'shop') return 'store';
      if (params.get('view') === 'season') return 'season';
      if (params.get('view') === 'sqlite' || params.get('view') === 'sqlite-lab') return 'sqlite-lab';
      if (params.get('view') === 'kotlin' || params.get('view') === 'kotlin-lab') return 'kotlin-lab';
    }
    return 'path';
  });

  const [sqliteInitialExerciseId, setSqliteInitialExerciseId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('exercise');
    }
    return null;
  });
  const [kotlinInitialExerciseId, setKotlinInitialExerciseId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('kt_exercise');
    }
    return null;
  });
  const [sqliteInitialDbId, setSqliteInitialDbId] = useState<string | null>(null);
  const [sqliteInitialSqlCode, setSqliteInitialSqlCode] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(storageService.getItem<string | null>('last_authenticated_uid', null));
  });
  const [activeSessionId, setActiveSessionId] = useState<string>(() => 'ses_' + Date.now());
  const [exerciseAttemptsMap, setExerciseAttemptsMap] = useState<Record<string, number>>({});
  const [activeEvaluationInstrument, setActiveEvaluationInstrument] = useState<EvaluationInstrument | null>(null);
  const [opinionActivityId, setOpinionActivityId] = useState<string | null>(null);

  const [mainTab, setMainTab] = useState<'play' | 'courses' | 'league'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'courses') return 'courses';
      if (params.get('tab') === 'league') return 'league';
    }
    return 'play';
  });
  const [activeTheory, setActiveTheory] = useState<TheoryLesson | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const thId = params.get('theory');
      if (thId) {
        return getTheoryByLessonId(thId) || null;
      }
    }
    return null;
  });

  // Sincronizar tema visual activo en el elemento raíz para que los ajustes funcionen en toda la app
  useEffect(() => {
    const activeTheme = user?.currentThemeId || 'theme_default';
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [user?.currentThemeId]);

  // Modales y Pestaña de Temporada
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [seasonTab, setSeasonTab] = useState<'path' | 'quests'>('path');

  const handleOpenSeason = (tab: 'path' | 'quests' = 'path') => {
    soundService.playToken();
    setSeasonTab(tab);
    setView('season');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isChestOpen, setIsChestOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('modal') === 'chest') return true;
    }
    return false;
  });
  const [activeChestData, setActiveChestData] = useState<{
    chestId: string;
    rewards?: ProgressionChestRewards;
  } | null>(null);

  // Modal 3D de Celebración de Racha (estilo Duolingo con Avatar)
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isJustFinishedStreak, setIsJustFinishedStreak] = useState(false);
  const [nextLessonAvailable, setNextLessonAvailable] = useState<Lesson | null>(null);

  // Modal de Usuarios en Línea en Tiempo Real (Exclusivo Docente josephcarazo56@gmail.com)
  const [isLiveUsersOpen, setIsLiveUsersOpen] = useState(false);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [selectedAcademicStudentUid, setSelectedAcademicStudentUid] = useState<string | null>(null);

  // Notificaciones y Avisos para el Alumno (Página Completa)
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Modal 3D de Checkpoint Teórico Obligatorio (Lectura rápida + 2 preguntas micro-quiz antes de jugar)
  const [checkpointLesson, setCheckpointLesson] = useState<Lesson | null>(null);
  const [checkpointTheory, setCheckpointTheory] = useState<TheoryLesson | null>(null);

  // Combate de Jefe activo a pantalla completa
  const [activeBossData, setActiveBossData] = useState<{
    bossId: string;
    unitId: number;
  } | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'boss') {
        return { bossId: 'kotlin-u01-boss', unitId: 1 };
      }
    }
    return null;
  });

  const [gameAlert, setGameAlert] = useState<GameAlertState | null>(null);

  // Transición cinemática de círculo naranja (Iris Wipe con pausa Dev)
  const [irisTransition, setIrisTransition] = useState<{
    active: boolean;
    phase: 'closing' | 'holding' | 'opening';
  }>({ active: false, phase: 'closing' });

  // Mensaje del avatar Dev durante la fase naranja del iris
  const [irisDevMessage, setIrisDevMessage] = useState<string | null>(null);

  // Sesión de lección activa con cola dinámica de repaso (Duolingo-style)
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lessonQueue, setLessonQueue] = useState<Exercise[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [initialExercisesCount, setInitialExercisesCount] = useState(0);
  const [lessonMistakes, setLessonMistakes] = useState(0);

  // Estados de comodines en lección
  const [teacherHintText, setTeacherHintText] = useState<string | null>(null);
  const [eliminatedOptionIndices, setEliminatedOptionIndices] = useState<number[]>([]);
  const [eliminatedBugLines, setEliminatedBugLines] = useState<number[]>([]);
  const [eliminatedTokenIndices, setEliminatedTokenIndices] = useState<number[]>([]);
  const [isCodePeekActive, setIsCodePeekActive] = useState(false);
  const [codePeekHighlightedPair, setCodePeekHighlightedPair] = useState<{ left: string; right: string } | null>(null);
  const [codePeekTokenIndex, setCodePeekTokenIndex] = useState<number | null>(null);
  const [codePeekBugLineIndex, setCodePeekBugLineIndex] = useState<number | null>(null);
  const [codePeekClueText, setCodePeekClueText] = useState<string | null>(null);
  const [levelSuccessAlert, setLevelSuccessAlert] = useState<{
    isOpen: boolean;
    stars: number;
    xp: number;
    nextLesson?: Lesson | null;
  } | null>(null);

  // Estados interactivos por tipo de ejercicio
  const [selectedTokenIndices, setSelectedTokenIndices] = useState<number[]>([]);
  const [selectedBugLine, setSelectedBugLine] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [activeLeftPair, setActiveLeftPair] = useState<string | null>(null);
  const [activeRightPair, setActiveRightPair] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [shuffledRightIndices, setShuffledRightIndices] = useState<number[]>([]);
  const [traceInputsReady, setTraceInputsReady] = useState(false);
  const [traceUserValues, setTraceUserValues] = useState<Record<number, Record<string, string>>>({});
  const [parsonsOrder, setParsonsOrder] = useState<number[]>([]);
  const [flowchartOrder, setFlowchartOrder] = useState<number[]>([]);

  // Hoja inferior de feedback
  const [feedbackState, setFeedbackState] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackExplanation, setFeedbackExplanation] = useState('');

  // Estado de pantalla de carga con animación blur y tips
  const [showLoading, setShowLoading] = useState(true);
  const [isBootReady, setIsBootReady] = useState(false);
  const loadingTitle = 'Encendiendo a Byte...';

  // Estado de diagnóstico pendiente asignado por el profesor
  const [activePendingAssignment, setActivePendingAssignment] = useState<any | null>(null);

  const checkPendingAssignedDiagnostic = async (studentProfile: UserProfile) => {
    if (studentProfile.email === ADMIN_AUTHORIZED_EMAIL) return;
    try {
      const pending = await academicService.getPendingDiagnosticForStudent(studentProfile.uid);
      if (pending) {
        const inst = getDiagnosticInstrumentById(pending.instrumentId);
        if (inst) {
          setActivePendingAssignment(pending);
          setGameAlert({
            isOpen: true,
            type: 'info',
            title: 'El Profesor te ha enviado un Diagnóstico',
            message: `El profesor Joseph Carazo te ha enviado la evaluación: "${pending.title}". Debes completarla obligatoriamente para registrar tus avances.`,
            primaryButtonText: 'Comenzar Diagnóstico Obligatorio',
            onPrimaryClick: () => {
              setGameAlert(null);
              setActiveEvaluationInstrument(inst);
            }
          });
        }
      }
    } catch (err) {
      console.warn('Error al verificar diagnósticos pendientes:', err);
    }
  };

  // Comprobación y avance de racha por ingreso en día consecutivo (Día 2, 3...)
  const checkAndAdvanceDailyStreak = async (profile: UserProfile): Promise<UserProfile> => {
    if (!profile.uid || profile.uid === 'guest_user_1') return profile;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const streak = { ...profile.streak };

    // Si el usuario tuvo racha activa ayer y hoy es un día nuevo en el que aún no ha registrado actividad:
    if ((streak.count || 0) > 0 && streak.lastActivityDate === yesterday) {
      streak.count = (streak.count || 0) + 1;
      streak.lastActivityDate = today;
      const updated: UserProfile = { ...profile, streak };
      await userService.updateProfile(updated);

      // Abrir la celebración animada en pantalla completa con racha 2 y el nuevo día cumplido
      setIsJustFinishedStreak(true);
      setIsStreakModalOpen(true);
      return updated;
    }
    return profile;
  };

  // Sincronización obligatoria de sesión: No permite aprendizaje como invitado
  useEffect(() => {
    async function loadData() {
      try {
        const uid = await authService.initAuth();
        if (uid) {
          setIsAuthenticated(true);
          const u = await userService.getProfile(uid);
          const p = await progressService.getAllProgress(uid);
          const sanitizedUser = u ? sanitizeUserProfile(u, uid) : DEFAULT_PROFILE;
          const updatedUser = await checkAndAdvanceDailyStreak(sanitizedUser);
          setUser(updatedUser);
          if (p) setProgress(p);

          // La evaluación diagnóstica solo se habilita si el profesor la ha asignado expresamente
          checkPendingAssignedDiagnostic(updatedUser);
        } else {
          // Si no hay usuario autenticado, bloquear acceso y abrir modal de registro/login
          setIsAuthenticated(false);
          setIsAuthOpen(true);
        }
      } catch (err) {
        console.warn('Verificación de sesión:', err);
        setIsAuthenticated(false);
        setIsAuthOpen(true);
      } finally {
        // La pantalla de carga termina su propia animación de salida cuando está lista
        setIsBootReady(true);
      }
    }
    loadData();
  }, []);

  const isTeacherAdmin = Boolean(
    authService.isCurrentUserAdmin() ||
    (user?.email && user.email.toLowerCase() === 'josephcarazo56@gmail.com')
  );

  // Suscripción en tiempo real a la presencia de todos los estudiantes (Docente y Alumnos)
  useEffect(() => {
    const unsubscribe = presenceService.subscribeToAllStudents((studentsList) => {
      const count = studentsList.filter((s) => presenceService.isUserOnline(s)).length;
      setOnlineUsersCount(count);
    });

    return () => {
      unsubscribe();
    };
  }, [user?.uid, isAuthenticated]);

  // Sincronizar automáticamente a la nube notificaciones o scripts que hayan quedado en local
  useEffect(() => {
    if (isTeacherAdmin) {
      notificationService.syncLocalNotificationsToCloud().catch(() => {});
    }
  }, [isTeacherAdmin]);

  // Latido de presencia en tiempo real (reporta estado y actividad cada 30 segundos o al cambiar de contexto)
  useEffect(() => {
    if (!user || !user.uid || !isAuthenticated || user.uid === 'guest_user_1') return;

    let activity: {
      status: 'idle' | 'playing' | 'lesson' | 'theory' | 'practice' | 'boss' | 'evaluation';
      activityText: string;
      targetId?: string;
      targetTitle?: string;
      path?: PathType;
    };

    if (activeEvaluationInstrument) {
      activity = {
        status: 'evaluation',
        activityText: `En Evaluación: ${activeEvaluationInstrument.title}`,
        targetTitle: activeEvaluationInstrument.title
      };
    } else if (activeTheory) {
      activity = {
        status: 'theory',
        activityText: `Leyendo Materia: ${activeTheory.title}`,
        targetTitle: activeTheory.title,
        path: activeTheory.pathId
      };
    } else if (view === 'lesson' && activeLesson) {
      activity = {
        status: 'lesson',
        activityText: `En Lección: ${activeLesson.title}`,
        targetId: activeLesson.id,
        targetTitle: activeLesson.title,
        path: user.currentPath
      };
    } else if (view === 'practice') {
      activity = {
        status: 'practice',
        activityText: 'En Modo Práctica',
        path: user.currentPath
      };
    } else if (view === 'boss') {
      activity = {
        status: 'boss',
        activityText: 'Combatiendo al Jefe de Unidad',
        path: user.currentPath
      };
    } else if (view === 'sqlite-lab') {
      activity = {
        status: 'practice',
        activityText: 'En Laboratorio SQLite (WASM)',
        path: 'sql'
      };
    } else if (view === 'kotlin-lab') {
      activity = {
        status: 'practice',
        activityText: 'En Laboratorio Kotlin (Playground)',
        path: 'kotlin'
      };
    } else if (view === 'academic') {
      activity = {
        status: 'idle',
        activityText: 'Revisando Seguimiento Académico'
      };
    } else if (view === 'profile') {
      activity = {
        status: 'idle',
        activityText: 'Personalizando Perfil'
      };
    } else if (view === 'notifications') {
      activity = {
        status: 'idle',
        activityText: 'Revisando Avisos y Notificaciones'
      };
    } else if (mainTab === 'courses') {
      activity = {
        status: 'theory',
        activityText: 'Explorando Catálogo de Cursos',
        path: user.currentPath
      };
    } else {
      activity = {
        status: 'playing',
        activityText: `Jugando en Ruta de ${user.currentPath === 'kotlin' ? 'Kotlin' : 'SQL'}`,
        path: user.currentPath
      };
    }

    // Reportar de inmediato
    presenceService.reportActivity(user.uid, activity);

    // Latido periódico de 20 segundos (mantiene presencia siempre fresca)
    const heartbeatTimer = setInterval(() => {
      presenceService.reportActivity(user.uid, activity);
    }, 20000);

    return () => clearInterval(heartbeatTimer);
  }, [
    user?.uid,
    isAuthenticated,
    view,
    mainTab,
    activeTheory,
    activeLesson,
    activeEvaluationInstrument,
    user?.currentPath
  ]);

  // Marcar como desconectado al cerrar o salir del navegador / pestaña
  useEffect(() => {
    if (!user || !user.uid || !isAuthenticated || user.uid === 'guest_user_1') return;

    const handleExit = () => {
      if (user.uid) {
        presenceService.setOffline(user.uid);
      }
    };

    window.addEventListener('beforeunload', handleExit);
    window.addEventListener('pagehide', handleExit);
    return () => {
      window.removeEventListener('beforeunload', handleExit);
      window.removeEventListener('pagehide', handleExit);
    };
  }, [user?.uid, isAuthenticated]);

  // Suscripción en tiempo real a notificaciones para el estudiante (Aparecen al instante sin recargar)
  useEffect(() => {
    if (!user) return;
    const unsubscribe = notificationService.subscribeToUserNotifications(user, (notifs) => {
      setNotifications(notifs);
    });
    return () => unsubscribe();
  }, [user?.uid, user?.group]);

  // Notificación urgente del profesor activa para el estudiante (Llamado de atención en pantalla)
  const activeUrgentAlert = useMemo(() => {
    if (!user?.uid || isTeacherAdmin) return null;
    return (
      notifications.find(
        (n) => n.type === 'urgent_alert' && !n.readBy.includes(user.uid)
      ) || null
    );
  }, [notifications, user?.uid, isTeacherAdmin]);

  // Reproducir alerta sonora al recibir un nuevo llamado de atención
  useEffect(() => {
    if (activeUrgentAlert) {
      soundService.playError();
    }
  }, [activeUrgentAlert?.id]);

  const handleAcknowledgeUrgentAlert = async (alertId: string) => {
    if (!user?.uid) return;
    soundService.playToken();
    await notificationService.markAsRead(alertId, user.uid);
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === alertId ? { ...n, readBy: [...n.readBy, user.uid] } : n
      )
    );
  };

  const handleGoPlayUrgentAlert = async (alertId: string) => {
    await handleAcknowledgeUrgentAlert(alertId);
    setView('path');
    setMainTab('play');
    setActiveTheory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkNotificationAsRead = async (id: string) => {
    if (!user?.uid) return;
    await notificationService.markAsRead(id, user.uid);
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id && !n.readBy.includes(user.uid)
          ? { ...n, readBy: [...n.readBy, user.uid] }
          : n
      )
    );
  };

  const handleMarkAllNotificationsAsRead = async () => {
    if (!user?.uid) return;
    await notificationService.markAllAsRead(notifications, user.uid);
    setNotifications((prev) =>
      prev.map((n) =>
        !n.readBy.includes(user.uid)
          ? { ...n, readBy: [...n.readBy, user.uid] }
          : n
      )
    );
  };

  // Limpiar/descartar una notificación de la bandeja personal del alumno
  const handleDismissNotification = async (id: string) => {
    if (!user?.uid) return;
    await notificationService.dismissNotificationForUser(id, user.uid);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Limpiar todas las notificaciones leídas de la bandeja personal
  const handleDismissAllRead = async () => {
    if (!user?.uid) return;
    const readOnes = notifications.filter((n) => n.readBy.includes(user.uid));
    await notificationService.dismissAllNotificationsForUser(user.uid, readOnes);
    setNotifications((prev) => prev.filter((n) => !n.readBy.includes(user.uid)));
  };

  const unreadNotificationsCount = user?.uid
    ? notifications.filter((n) => !n.readBy.includes(user.uid)).length
    : 0;

  // Función unificada de cierre de sesión seguro con reporte offline
  const handleSignOut = async () => {
    soundService.playToken();
    timeTrackingService.stopLessonTracking();
    if (user?.uid && user.uid !== 'guest_user_1') {
      await presenceService.setOffline(user.uid);
    }
    await authService.signOutUser();
    setIsAuthenticated(false);
    setUser(DEFAULT_PROFILE);
    setProgress({});
    setView('path');
    setIsAuthOpen(true);
  };

  const currentPath: PathType = user?.currentPath === 'sql' ? 'sql' : 'kotlin';
  const units = getUnitsByPath(currentPath);

  // Al superar el micro-quiz y resumen de teoría del nivel
  const handleCompleteCheckpoint = async (lesson: Lesson) => {
    setCheckpointLesson(null);
    setCheckpointTheory(null);

    // Guardar teoría completada en almacenamiento y base de datos
    const updatedProgress = await progressService.saveTheoryCompleted(
      user.uid,
      lesson.id,
      lesson.path,
      lesson.unit,
      lesson.level
    );
    // Recompensar con +10 XP y +5 Bytes por completar la preparación teórica
    const updatedUser = await userService.rewardUser(user, 10, 5);
    setUser(updatedUser);
    setProgress(updatedProgress);

    // Iniciar la sesión de lección inmediatamente con bypassCheckpoint = true
    handleStartLesson(lesson, true, updatedProgress, updatedUser);
  };

  // Iniciar lección o prueba: Control del Sistema + Banco de preguntas + Seguimiento de Tiempo
  const handleStartLesson = (
    lesson: Lesson,
    bypassCheckpoint: boolean = false,
    overrideProgress?: Record<string, LessonProgress>,
    overrideUser?: UserProfile
  ) => {
    const activeProg = overrideProgress || progress;
    const activeUser = overrideUser || user;

    // 0. Comprobación obligatoria de autenticación (No permitir invitados)
    if (!isAuthenticated || !activeUser.uid || activeUser.uid === 'guest_user_1') {
      soundService.playError();
      setIsAuthOpen(true);
      return;
    }

    // 1. Control de Progresión Secuencial Estricta a Nivel de Sistema (Requisitos 1 y 4)
    const lessonPath = lesson.path || currentPath;
    const targetUnits = getUnitsByPath(lessonPath);
    const unitObj = targetUnits.find(u => u.id === lesson.unit);
    if (unitObj) {
      const check = progressionEngine.canAccessNode(lesson.id, unitObj, activeUser, activeProg);
      if (!check.allowed) {
        soundService.playError();
        setGameAlert({
          isOpen: true,
          type: 'lock',
          title: 'Nivel Bloqueado',
          message: check.reason || 'Debes completar los niveles anteriores secuencialmente.',
          primaryButtonText: 'Entendido',
          onPrimaryClick: () => setGameAlert(null)
        });
        return;
      }
    }

    // 2. Control de Lectura y Micro-Quiz Teórico Obligatorio (Flujo Integrado)
    // Si el usuario no ha completado el nivel previamente ni ha pasado el checkpoint de teoría:
    const isAlreadyCompleted = (activeProg[lesson.id]?.starsEarned || 0) > 0;
    const isTheoryCompleted = Boolean(activeProg[lesson.id]?.theoryCompleted);

    if (!bypassCheckpoint && !isAlreadyCompleted && !isTheoryCompleted) {
      const th = getTheoryByLessonId(lesson.id);
      setCheckpointLesson(lesson);
      setCheckpointTheory(th || null);
      return;
    }

    if (irisTransition.active) return;

    soundService.playToken();

    // Iniciar conteo de tiempo activo para esta sesión de lección
    timeTrackingService.startLessonTracking(user.uid);
    setActiveSessionId('ses_' + Date.now());
    setExerciseAttemptsMap({});

    // Fase 1: Círculo naranja cerrándose (0.4s)
    setIrisTransition({ active: true, phase: 'closing' });

    // A los 400ms: pantalla totalmente naranja → mostrar Dev "¡A jugar!"
    setTimeout(() => {
      setIrisTransition({ active: true, phase: 'holding' });
      setIrisDevMessage('¡A jugar!');

      // Preparar contenido mientras Dev está en pantalla
      setActiveTheory(null);
      setActiveLesson(lesson);

      const fullBank = lesson.exercises;
      // Aleatorizar el orden de las preguntas y sus opciones internas (Anti-trampas: nunca respuestas en el mismo orden)
      const shuffledPool = shuffleArray(fullBank).map(randomizeExercise);
      const selectedTen = shuffledPool.slice(0, 10);

      setLessonQueue(selectedTen);
      setCurrentQueueIndex(0);
      setInitialExercisesCount(selectedTen.length);
      setLessonMistakes(0);
      resetExerciseState();
      setFeedbackState('idle');

      setTeacherHintText(null);
      setEliminatedOptionIndices([]);
      setIsCodePeekActive(false);

      setView('lesson');
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Tras 1.1s de Dev en pantalla naranja → abrir el círculo suavemente
      setTimeout(() => {
        setIrisDevMessage(null);
        setIrisTransition({ active: true, phase: 'opening' });

        setTimeout(() => {
          setIrisTransition({ active: false, phase: 'closing' });
        }, 400);
      }, 1100);
    }, 400);
  };

  const resetExerciseState = () => {
    setSelectedTokenIndices([]);
    setSelectedBugLine(null);
    setSelectedOption(null);
    setActiveLeftPair(null);
    setActiveRightPair(null);
    setMatchedPairs([]);
    setShuffledRightIndices([]);
    setTraceInputsReady(false);
    setTraceUserValues({});
    setParsonsOrder([]);
    setFlowchartOrder([]);
    // Limpiar comodines por ejercicio
    setTeacherHintText(null);
    setEliminatedOptionIndices([]);
    setEliminatedBugLines([]);
    setEliminatedTokenIndices([]);
    setIsCodePeekActive(false);
    setCodePeekHighlightedPair(null);
    setCodePeekTokenIndex(null);
    setCodePeekBugLineIndex(null);
    setCodePeekClueText(null);
  };

  const [isQuestionReportModalOpen, setIsQuestionReportModalOpen] = useState(false);

  const currentExercise: Exercise | undefined = lessonQueue[currentQueueIndex];
  const isReviewPhase = currentQueueIndex >= initialExercisesCount;

  const currentExerciseUserAnswer = useMemo(() => {
    if (!currentExercise) return undefined;
    if (currentExercise.type === 'code_builder') {
      return selectedTokenIndices.map(idx => currentExercise.tokens[idx]).join(' ');
    }
    if (currentExercise.type === 'spot_the_bug') {
      return selectedBugLine !== null ? `Línea ${selectedBugLine + 1}` : undefined;
    }
    if (currentExercise.type === 'predict_output') {
      return selectedOption !== null ? currentExercise.options[selectedOption] : undefined;
    }
    if (currentExercise.type === 'code_cloze') {
      return selectedOption !== null ? currentExercise.options[selectedOption] : undefined;
    }
    if (currentExercise.type === 'matching_pairs') {
      return matchedPairs.length > 0 ? `${matchedPairs.length / 2} parejas formadas` : undefined;
    }
    if (currentExercise.type === 'trace_step') {
      return JSON.stringify(traceUserValues);
    }
    if (currentExercise.type === 'parsons_puzzle') {
      return parsonsOrder.length > 0 ? parsonsOrder.map(idx => currentExercise.lines[idx]).join('\n') : undefined;
    }
    if (currentExercise.type === 'flowchart_builder') {
      return flowchartOrder.length > 0 ? flowchartOrder.map(idx => currentExercise.blocks[idx]?.text || '').join(' -> ') : undefined;
    }
    return undefined;
  }, [
    currentExercise,
    selectedTokenIndices,
    selectedBugLine,
    selectedOption,
    matchedPairs,
    traceUserValues,
    parsonsOrder,
    flowchartOrder
  ]);

  // Desordenar determinísticamente la columna derecha de parejas para que sea un reto real
  useEffect(() => {
    if (currentExercise?.type === 'matching_pairs') {
      const len = currentExercise.pairs.length;
      const indices = Array.from({ length: len }, (_, i) => len - 1 - i);
      setShuffledRightIndices(indices);
    }
  }, [currentExercise?.id, currentExercise?.type]);

  const isAnswerReady = (): boolean => {
    if (!currentExercise) return false;
    if (currentExercise.type === 'code_builder') return selectedTokenIndices.length > 0;
    if (currentExercise.type === 'spot_the_bug') return selectedBugLine !== null;
    if (currentExercise.type === 'predict_output') return selectedOption !== null;
    if (currentExercise.type === 'code_cloze') return selectedOption !== null;
    if (currentExercise.type === 'matching_pairs') return matchedPairs.length === currentExercise.pairs.length * 2;
    if (currentExercise.type === 'trace_step') return traceInputsReady;
    if (currentExercise.type === 'parsons_puzzle') return parsonsOrder.length > 0;
    if (currentExercise.type === 'flowchart_builder') return flowchartOrder.length > 0;
    return true;
  };

  // Comprobar respuesta
  const handleCheckAnswer = async () => {
    if (!currentExercise || feedbackState !== 'idle' || !isAnswerReady()) return;

    let isCorrect = false;

    if (currentExercise.type === 'code_builder') {
      const userTokens = selectedTokenIndices.map(idx => currentExercise.tokens[idx]);
      const joinedSelected = userTokens.join(' ').trim();
      const joinedSolution = currentExercise.solution.join(' ').trim();
      isCorrect = joinedSelected === joinedSolution;
      if (!isCorrect && currentExercise.acceptableAlternatives) {
        isCorrect = currentExercise.acceptableAlternatives.some(alt => alt.join(' ').trim() === joinedSelected);
      }
    } else if (currentExercise.type === 'spot_the_bug') {
      isCorrect = selectedBugLine === currentExercise.bugLineIndex;
    } else if (currentExercise.type === 'predict_output') {
      isCorrect = selectedOption === currentExercise.correctOptionIndex;
    } else if (currentExercise.type === 'code_cloze') {
      const chosenWord = selectedOption !== null ? currentExercise.options[selectedOption] : '';
      isCorrect = chosenWord === currentExercise.correctOption;
    } else if (currentExercise.type === 'matching_pairs') {
      isCorrect = matchedPairs.length === currentExercise.pairs.length * 2;
    } else if (currentExercise.type === 'trace_step') {
      isCorrect = currentExercise.iterations.every(iter =>
        Object.entries(iter.expectedVariables).every(
          ([varName, expectedVal]) => {
            const userRaw = (traceUserValues[iter.iteration]?.[varName] || '').trim().replace(/^['"]|['"]$/g, '');
            const expectedRaw = expectedVal.trim().replace(/^['"]|['"]$/g, '');
            return userRaw.toLowerCase() === expectedRaw.toLowerCase();
          }
        )
      );
    } else if (currentExercise.type === 'parsons_puzzle') {
      isCorrect =
        parsonsOrder.length === currentExercise.correctOrder.length &&
        parsonsOrder.every((val, index) => val === currentExercise.correctOrder[index]);
    } else if (currentExercise.type === 'flowchart_builder') {
      isCorrect =
        flowchartOrder.length === currentExercise.correctOrder.length &&
        flowchartOrder.every((val, index) => val === currentExercise.correctOrder[index]);
    }

    // Extraer respuesta textual para trazabilidad en la investigación
    let userAnswerStr = '';
    if (currentExercise.type === 'code_builder') {
      userAnswerStr = selectedTokenIndices.map(idx => currentExercise.tokens[idx]).join(' ');
    } else if (currentExercise.type === 'spot_the_bug') {
      userAnswerStr = `Línea ${selectedBugLine !== null ? selectedBugLine + 1 : 'N/A'}`;
    } else if (currentExercise.type === 'predict_output') {
      userAnswerStr = selectedOption !== null ? currentExercise.options[selectedOption] : '';
    } else if (currentExercise.type === 'code_cloze') {
      userAnswerStr = selectedOption !== null ? currentExercise.options[selectedOption] : '';
    } else if (currentExercise.type === 'matching_pairs') {
      userAnswerStr = matchedPairs.join(' | ');
    } else if (currentExercise.type === 'trace_step') {
      userAnswerStr = JSON.stringify(traceUserValues);
    } else if (currentExercise.type === 'parsons_puzzle') {
      userAnswerStr = parsonsOrder.map(idx => currentExercise.lines[idx]).join('\n');
    } else if (currentExercise.type === 'flowchart_builder') {
      userAnswerStr = flowchartOrder.map(idx => currentExercise.blocks[idx]?.text || '').join(' -> ');
    }

    const currentAttemptNum = (exerciseAttemptsMap[currentExercise.id] || 0) + 1;
    setExerciseAttemptsMap(prev => ({ ...prev, [currentExercise.id]: currentAttemptNum }));

    if (activeLesson && user.uid && user.uid !== 'guest_user_1') {
      academicService.recordAttempt({
        attemptId: `att_${user.uid}_${currentExercise.id}_${Date.now()}`,
        studentId: user.uid,
        studentCode: user.studentCode || 'E01',
        sessionId: activeSessionId,
        pathId: activeLesson.path,
        unitId: activeLesson.unit,
        lessonId: activeLesson.id,
        activityId: currentExercise.id,
        contentVersion: '1.0.0',
        theme: activeLesson.title,
        difficulty: 'medium',
        attemptNumber: currentAttemptNum,
        userAnswer: userAnswerStr || '(Vacío)',
        status: isCorrect ? 'correct' : 'incorrect',
        score: isCorrect ? currentExercise.xpReward : 0,
        maxScore: currentExercise.xpReward,
        hintUsed: Boolean(teacherHintText || isCodePeekActive || eliminatedOptionIndices.length > 0),
        timestamp: Date.now()
      }).catch(err => console.warn('Error al registrar intento:', err));
    }

    if (isCorrect) {
      soundService.playCorrect();
      setFeedbackState('success');
      setFeedbackExplanation(currentExercise.explanation);
    } else {
      soundService.playError();
      setFeedbackState('error');
      setFeedbackExplanation(currentExercise.explanation);
      setLessonMistakes(prev => prev + 1);

      // Re-encolar el reto fallado al final de la cola re-aleatorizando sus opciones para que deba responderse bien obligatoriamente
      setLessonQueue(prev => [...prev, randomizeExercise(currentExercise)]);
    }
  };

  // Manejo de comodines durante la lección - EJECUCIÓN INSTANTÁNEA (0ms latencia)
  const handleUsePowerUpInLesson = (key: keyof UserPowerUps) => {
    if (!user.powerups || (user.powerups[key] || 0) <= 0) {
      soundService.playError();
      setGameAlert({
        isOpen: true,
        type: 'lock',
        title: 'Comodín Agotado',
        message: 'No tienes unidades disponibles de este comodín. Abre más cofres de aventura o avanza en el pase para conseguir nuevos recursos tácticos.',
        primaryButtonText: 'Entendido',
        onPrimaryClick: () => setGameAlert(null)
      });
      return;
    }

    // 1. Actualización optimista inmediata en estado local
    const currentCount = user.powerups[key] || 1;
    const newCount = Math.max(0, currentCount - 1);
    const updatedUser: UserProfile = {
      ...user,
      powerups: {
        ...user.powerups,
        [key]: newCount
      }
    };
    setUser(updatedUser);

    // 2. Persistencia en segundo plano sin congelar la interfaz
    userService.consumePowerUp(user, key).catch(err => {
      console.error('Error al sincronizar consumo de comodín:', err);
    });

    // 3. Activación instantánea del efecto sonoro y visual del comodín
    soundService.playCorrect();

    if (key === 'teacherHint') {
      const hint = currentExercise?.hint || currentExercise?.explanation || 'Analiza detalladamente la sintaxis y tipos de datos requeridos.';
      setTeacherHintText(hint);
    } else if (key === 'eliminateOptions') {
      if (currentExercise?.type === 'predict_output') {
        const wrongIndices = currentExercise.options
          .map((_, i) => i)
          .filter(i => i !== currentExercise.correctOptionIndex);
        setEliminatedOptionIndices(wrongIndices.slice(0, 2));
        setCodePeekClueText('¡50 / 50 Activado! Se descartaron 2 opciones incorrectas.');
      } else if (currentExercise?.type === 'code_cloze') {
        const wrongIndices = currentExercise.options
          .map((_, i) => i)
          .filter(i => currentExercise.options[i] !== currentExercise.correctOption);
        setEliminatedOptionIndices(wrongIndices.slice(0, 2));
        setCodePeekClueText('¡50 / 50 Activado! Se descartaron 2 opciones incorrectas.');
      } else if (currentExercise?.type === 'matching_pairs') {
        // Resolver y emparejar automáticamente el 50% de las parejas restantes
        const unmatched = currentExercise.pairs.filter(p => !matchedPairs.includes(p.left));
        if (unmatched.length > 0) {
          const count = Math.max(1, Math.floor(unmatched.length / 2));
          const autoMatched = unmatched.slice(0, count);
          const pairsToAdd: string[] = [];
          autoMatched.forEach(p => pairsToAdd.push(p.left, p.right));
          setMatchedPairs(prev => [...prev, ...pairsToAdd]);
          confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
          setCodePeekClueText(`¡50 / 50 Activado! Se resolvieron ${count} pareja(s) automáticamente.`);
        }
      } else if (currentExercise?.type === 'code_builder') {
        // 1. Descartar fichas distractoras que no pertenezcan a la solución
        const solCopy = [...currentExercise.solution];
        const distractorIndices: number[] = [];
        currentExercise.tokens.forEach((tok, idx) => {
          const solIdx = solCopy.indexOf(tok);
          if (solIdx === -1) {
            distractorIndices.push(idx);
          } else {
            solCopy.splice(solIdx, 1);
          }
        });
        setEliminatedTokenIndices(distractorIndices);

        // 2. Colocar automáticamente el primer 50% de las fichas de la solución
        const half = Math.max(1, Math.floor(currentExercise.solution.length / 2));
        const firstHalfTokens = currentExercise.solution.slice(0, half);
        const autoIndices: number[] = [];
        const used = new Set<number>();
        firstHalfTokens.forEach(st => {
          const found = currentExercise.tokens.findIndex((t, idx) => t === st && !used.has(idx) && !distractorIndices.includes(idx));
          if (found !== -1) {
            used.add(found);
            autoIndices.push(found);
          }
        });
        setSelectedTokenIndices(autoIndices);
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
        setCodePeekClueText('¡50 / 50 Activado! Distractores eliminados y primeras fichas colocadas.');
      } else if (currentExercise?.type === 'spot_the_bug') {
        // Descartar el 50% de las líneas correctas
        const total = currentExercise.codeSnippet.length;
        const nonBug = Array.from({ length: total }, (_, i) => i).filter(i => i !== currentExercise.bugLineIndex);
        const discardCount = Math.max(1, Math.floor(nonBug.length / 2));
        setEliminatedBugLines(nonBug.slice(0, discardCount));
        setCodePeekClueText(`¡50 / 50 Activado! Se descartaron ${discardCount} línea(s) correctas.`);
      } else if (currentExercise?.type === 'parsons_puzzle') {
        const count = Math.max(1, Math.floor(currentExercise.correctOrder.length / 2));
        setParsonsOrder(currentExercise.correctOrder.slice(0, count));
        setCodePeekClueText('¡50 / 50 Activado! Se ordenaron las primeras líneas.');
      }
    } else if (key === 'codePeek') {
      setIsCodePeekActive(true);
      if (currentExercise?.type === 'matching_pairs') {
        const firstUnmatched = currentExercise.pairs.find(p => !matchedPairs.includes(p.left));
        if (firstUnmatched) {
          setCodePeekHighlightedPair(firstUnmatched);
          setCodePeekClueText(`Pista de Pareja: "${firstUnmatched.left}" conecta directamente con "${firstUnmatched.right}"`);
        }
      } else if (currentExercise?.type === 'code_builder') {
        const currentPos = selectedTokenIndices.length;
        const nextSolToken = currentExercise.solution[currentPos] || currentExercise.solution[0];
        const tokenIdx = currentExercise.tokens.findIndex((t, idx) => t === nextSolToken && !selectedTokenIndices.includes(idx));
        if (tokenIdx !== -1) {
          setCodePeekTokenIndex(tokenIdx);
          setCodePeekClueText(`Pista: La siguiente ficha requerida es "${nextSolToken}"`);
        }
      } else if (currentExercise?.type === 'spot_the_bug') {
        setCodePeekBugLineIndex(currentExercise.bugLineIndex);
        setCodePeekClueText(`¡Pista de Código! El error reside en la Línea ${currentExercise.bugLineIndex + 1}`);
      } else if (currentExercise?.type === 'code_cloze') {
        setCodePeekClueText(`Pista de Sintaxis: La palabra clave para el espacio en blanco es "${currentExercise.correctOption}"`);
      } else if (currentExercise?.type === 'predict_output') {
        setCodePeekClueText('Observa atentamente la lógica en el editor para predecir la salida.');
      }
    }
  };

  // Continuar al siguiente ejercicio o finalizar lección
  const handleContinue = async () => {
    if (!activeLesson) return;

    if (currentQueueIndex < lessonQueue.length - 1) {
      soundService.playToken();
      setCurrentQueueIndex(prev => prev + 1);
      resetExerciseState();
      setFeedbackState('idle');
    } else {
      // Detener conteo de tiempo activo
      timeTrackingService.stopLessonTracking();
      const finishedLessonId = activeLesson.id;

      soundService.playWin();
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });

      const finalXp = 35;

      const stars: 1 | 2 | 3 = lessonMistakes === 0 ? 3 : lessonMistakes <= 2 ? 2 : 1;
      const lessonProgress: LessonProgress = {
        lessonId: activeLesson.id,
        pathId: activeLesson.path,
        unitId: activeLesson.unit,
        levelId: activeLesson.level,
        starsEarned: stars,
        completedAt: Date.now(),
        attempts: 1,
        mistakesCount: lessonMistakes,
        scorePercentage: Math.max(60, Math.round(100 - (lessonMistakes / Math.max(1, initialExercisesCount)) * 40)),
        lastReviewedAt: Date.now()
      };

      const updatedProgress = await progressService.saveLessonProgress(user.uid, lessonProgress);
      const updatedUser = await userService.rewardUser(user, finalXp, 15);

      // Encontrar la siguiente lección en la unidad para habilitar avance fluido directo
      const lessonPath = activeLesson.path || currentPath;
      const targetUnits = getUnitsByPath(lessonPath);
      const currentUnit = targetUnits.find(u => u.id === activeLesson.unit);
      let nextLesson: Lesson | null = null;
      if (currentUnit) {
        const track = progressionEngine.getUnitTrack(currentUnit, lessonPath);
        const currentIdx = track.findIndex(n => n.id === activeLesson.id);
        if (currentIdx >= 0) {
          const nextLessonNode = track.slice(currentIdx + 1).find(n => n.type === 'lesson');
          if (nextLessonNode && nextLessonNode.lesson) {
            nextLesson = nextLessonNode.lesson;
          }
        }
      }
      setNextLessonAvailable(nextLesson);

      setUser(updatedUser);
      setProgress(updatedProgress);
      setView('path');
      setActiveLesson(null);
      setLessonQueue([]);

      // ═══ GESTIÓN DE RACHA: SOLAMENTE 1 VEZ AL DÍA (REQUERIMIENTO DEL USUARIO) ═══
      const now = new Date();
      const todayYear = now.getFullYear();
      const todayMonth = String(now.getMonth() + 1).padStart(2, '0');
      const todayDay = String(now.getDate()).padStart(2, '0');
      const todayStr = `${todayYear}-${todayMonth}-${todayDay}`;

      const streakKey = `streak_seen_${user.uid}`;
      const alreadyCelebratedToday = storageService.getItem<string>(streakKey, '') === todayStr;

      if (!alreadyCelebratedToday) {
        // Primera lección completada hoy: mostrar la celebración oficial de racha
        setIsJustFinishedStreak(true);
        setIsStreakModalOpen(true);
        storageService.setItem(streakKey, todayStr);
      } else {
        // Lecciones posteriores el mismo día: NO mostrar el modal de racha molesto.
        // En su lugar, mostrar el resumen de victoria con botón directo de siguiente nivel
        setLevelSuccessAlert({
          isOpen: true,
          stars,
          xp: finalXp,
          nextLesson
        });
      }

      // ═══ FORMULARIO DE OPINIÓN: SÓLO ESPORÁDICO (CADA 5 NIVELES Y MÁXIMO CADA 4 DÍAS) ═══
      const opinionPromptKey = `last_opinion_prompt_${user.uid}`;
      const lastPromptTime = Number(storageService.getItem<string>(opinionPromptKey, '0'));
      const fourDays = 4 * 24 * 60 * 60 * 1000;
      const isMilestone = (activeLesson.level || 1) % 5 === 0;

      if (isMilestone && (Date.now() - lastPromptTime > fourDays)) {
        setOpinionActivityId(finishedLessonId);
        storageService.setItem(opinionPromptKey, String(Date.now()));
      } else {
        setOpinionActivityId(null);
      }
    }
  };

  // Parejas en cascada
  const handlePairClick = (side: 'left' | 'right', val: string) => {
    soundService.playToken();
    if (matchedPairs.includes(val)) return;

    if (side === 'left') {
      setActiveLeftPair(val);
      if (activeRightPair && currentExercise?.type === 'matching_pairs') {
        checkPairMatch(val, activeRightPair);
      }
    } else {
      setActiveRightPair(val);
      if (activeLeftPair && currentExercise?.type === 'matching_pairs') {
        checkPairMatch(activeLeftPair, val);
      }
    }
  };

  const checkPairMatch = (left: string, right: string) => {
    if (currentExercise?.type !== 'matching_pairs') return;
    const pair = currentExercise.pairs.find(p => p.left === left && p.right === right);
    if (pair) {
      soundService.playToken();
      setMatchedPairs(prev => [...prev, left, right]);
    } else {
      soundService.playError();
    }
    setActiveLeftPair(null);
    setActiveRightPair(null);
  };

  // Apertura de Cofre con validación de un solo uso
  const handleOpenChest = (chestId: string, rewards?: ProgressionChestRewards) => {
    if ((user.openedChests || []).includes(chestId)) {
      soundService.playToken();
      setGameAlert({
        isOpen: true,
        type: 'success',
        title: 'Cofre Ya Reclamado',
        message: 'Este cofre ya fue abierto de forma permanente y sus recompensas y comodines ya están en tu inventario.',
        primaryButtonText: 'Entendido',
        onPrimaryClick: () => setGameAlert(null)
      });
      return;
    }

    const unitNumber = parseInt(chestId.split('-')[1]?.replace('u0', '') || '1', 10);
    const unitObj = units.find(u => u.id === unitNumber) || units[0];
    if (unitObj) {
      const check = progressionEngine.canAccessNode(chestId, unitObj, user, progress);
      if (!check.allowed) {
        soundService.playError();
        setGameAlert({
          isOpen: true,
          type: 'lock',
          title: 'Cofre Bloqueado',
          message: check.reason || 'Debes completar los niveles anteriores secuencialmente para alcanzar este cofre.',
          primaryButtonText: 'Entendido',
          onPrimaryClick: () => setGameAlert(null)
        });
        return;
      }
    }

    soundService.playToken();
    setActiveChestData({
      chestId,
      rewards: rewards || {
        bytes: 40,
        xp: 30,
        powerups: { teacherHint: 1, eliminateOptions: 1, secondChance: 1, codePeek: 1 }
      }
    });
    setIsChestOpen(true);
  };

  // Desafío de Jefe de Unidad: Pantalla completa (Requisito 4 y 5)
  const handleOpenBoss = (bossId: string, unit: any) => {
    const check = progressionEngine.canAccessNode(bossId, unit, user, progress);
    if (!check.allowed) {
      soundService.playError();
      setGameAlert({
        isOpen: true,
        type: 'lock',
        title: 'Jefe Bloqueado',
        message: check.reason || 'Debes superar legítimamente todas las lecciones y desafíos previos de la unidad para enfrentar al Jefe.',
        primaryButtonText: 'Entendido',
        onPrimaryClick: () => setGameAlert(null)
      });
      return;
    }

    soundService.playToken();
    setActiveBossData({
      bossId,
      unitId: unit.id
    });
    setView('boss');
  };

  // ─── PÁGINA APARTE: EVALUACIÓN DIAGNÓSTICA O FINAL (FULL-PAGE VIEW) ───
  if (activeEvaluationInstrument && user) {
    return (
      <EvaluationPage
        instrument={activeEvaluationInstrument}
        user={user}
        isMandatory={
          (!user.hasCompletedInitialDiagnostic &&
            activeEvaluationInstrument.instrumentId === INITIAL_COMPREHENSIVE_DIAGNOSTIC_INSTRUMENT.instrumentId) ||
          Boolean(activePendingAssignment)
        }
        onClose={() => {
          setActiveEvaluationInstrument(null);
        }}
        onComplete={async () => {
          setActiveEvaluationInstrument(null);
          const isInitial =
            activeEvaluationInstrument.instrumentId === INITIAL_COMPREHENSIVE_DIAGNOSTIC_INSTRUMENT.instrumentId;

          if (isInitial || !user.hasCompletedInitialDiagnostic) {
            const updatedUser: UserProfile = { ...user, hasCompletedInitialDiagnostic: true };
            setUser(updatedUser);
            await userService.updateProfile(updatedUser);
          }

          // Si correspondía a una asignación enviada por el profesor Joseph Carazo
          if (activePendingAssignment) {
            await academicService.markDiagnosticCompleted(activePendingAssignment.assignmentId, user.uid);
            setActivePendingAssignment(null);
          }

          soundService.playWin();
          setGameAlert({
            isOpen: true,
            type: 'success',
            title: isInitial ? '¡Diagnóstico Inicial Completado!' : 'Evaluación Entregada',
            message: isInitial
              ? 'Tus conocimientos previos en Kotlin y SQL han sido registrados exitosamente. ¡Ya puedes comenzar a aprender en la aplicación!'
              : `Tu entrega para "${activeEvaluationInstrument.title}" ha sido guardada y enviada al profesor Joseph Carazo.`,
            primaryButtonText: isInitial ? '¡A Aprender!' : 'Continuar',
            onPrimaryClick: () => setGameAlert(null)
          });
        }}
      />
    );
  }

  return (
    <>
      <AnimatedDoodleBackground />
      {showLoading && (
        <LoadingScreen
          isReady={isBootReady}
          minDurationMs={2600}
          title={loadingTitle}
          onFinish={() => setShowLoading(false)}
        />
      )}

      {/* Barra de Estado Superior (solo visible en path y practice cuando no se está leyendo teoría o en páginas dedicadas) */}
      {view !== 'boss' && view !== 'lesson' && view !== 'academic' && view !== 'notifications' && view !== 'store' && view !== 'season' && view !== 'sqlite-lab' && view !== 'kotlin-lab' && !activeTheory && (
        <Navbar
          user={user}
          isAdmin={authService.isCurrentUserAdmin()}
          onlineUsersCount={onlineUsersCount}
          unreadNotificationsCount={unreadNotificationsCount}
          onOpenLiveUsers={() => {
            soundService.playToken();
            setIsLiveUsersOpen(true);
          }}
          onOpenNotifications={() => {
            soundService.playToken();
            setView('notifications');
          }}
          onLogoClick={() => {
            setView('path');
            setMainTab('play');
            setActiveTheory(null);
          }}
          onPathToggle={() => {
            soundService.playToken();
            const nextPath: PathType = user.currentPath === 'kotlin' ? 'sql' : 'kotlin';
            const updated = { ...user, currentPath: nextPath };
            userService.updateProfile(updated);
            setUser(updated);
          }}
          onOpenQuests={() => {
            handleOpenSeason('quests');
          }}
          onOpenProfile={() => {
            soundService.playToken();
            setView('profile');
          }}
          onOpenStreak={() => {
            soundService.playToken();
            setIsJustFinishedStreak(false);
            setIsStreakModalOpen(true);
          }}
          onOpenAcademic={() => {
            soundService.playToken();
            setView('academic');
          }}
          onOpenLocker={() => {
            soundService.playToken();
            setView('store');
          }}
          onOpenLeague={() => {
            soundService.playToken();
            setView('path');
            setMainTab('league');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSqliteLab={() => {
            soundService.playToken();
            setView('sqlite-lab');
            setSqliteInitialExerciseId(null);
            setSqliteInitialDbId(null);
            setSqliteInitialSqlCode(null);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          onOpenKotlinLab={() => {
            soundService.playToken();
            setView('kotlin-lab');
            setKotlinInitialExerciseId(null);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          onSignOut={handleSignOut}
        />
      )}

      {/* ═══ CONTENEDOR MAESTRO DUOLINGO DESKTOP (3 COLUMNAS: SIDEBAR IZQ + CONTENIDO + SIDEBAR DER) ═══ */}
      {view !== 'boss' && view !== 'lesson' && view !== 'sqlite-lab' && view !== 'kotlin-lab' && (
        <>
          <div className="duo-desktop-app-layout">
          {/* Columna Izquierda: Barra Lateral de Navegación Permanente (Desktop) */}
          <div className="duo-desktop-left-column">
            <DesktopSidebar
              currentView={view}
              currentMainTab={mainTab}
              unreadNotificationsCount={unreadNotificationsCount}
              onlineUsersCount={onlineUsersCount}
              isAdmin={authService.isCurrentUserAdmin()}
              onNavigate={(targetView, targetTab) => {
                setView(targetView);
                if (targetTab) {
                  setMainTab(targetTab);
                }
                if (targetView === 'path') {
                  setActiveTheory(null);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenQuests={() => {
                handleOpenSeason('quests');
              }}
              onOpenLiveUsers={() => {
                soundService.playToken();
                setIsLiveUsersOpen(true);
              }}
              onSignOut={handleSignOut}
            />
          </div>

          {/* Área Principal Desktop (Centro + Widgets Derecha) */}
          <div className="duo-desktop-main-wrapper">
            {/* Columna Central: Contenido Principal */}
            <div className={`duo-desktop-center-column ${['store', 'academic', 'season', 'notifications', 'profile', 'sqlite-lab', 'kotlin-lab'].includes(view) ? 'wide-view' : ''}`}>
            {/* VISTA 1: EL CAMINO (LEARNING PATH) / SECCIÓN DE CURSOS / TEORÍA */}
            {view === 'path' && (
              <main
                className="duo-main-content-column"
                style={{
                  padding: activeTheory ? '16px 10px 80px 10px' : '10px 12px 120px 12px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
          {activeTheory ? (
            <TheoryViewer
              theory={activeTheory}
              user={user}
              onBack={() => setActiveTheory(null)}
              onCompleteTheory={async (lessonId) => {
                const l = getLessonById(lessonId);
                if (l) {
                  const updatedProgress = await progressService.saveTheoryCompleted(
                    user.uid,
                    l.id,
                    l.path,
                    l.unit,
                    l.level
                  );
                  const updatedUser = await userService.rewardUser(user, 25, 10);
                  setUser(updatedUser);
                  setProgress(updatedProgress);
                }
              }}
              onStartPractice={async (lessonId) => {
                const l = getLessonById(lessonId);
                if (l) {
                  const updatedProgress = await progressService.saveTheoryCompleted(
                    user.uid,
                    l.id,
                    l.path,
                    l.unit,
                    l.level
                  );
                  setProgress(updatedProgress);
                  handleStartLesson(l, true);
                }
              }}
            />
          ) : (
            <>
              {/* Barra de Cambio de Modo Triple: Jugar vs Cursos vs Liga Semanal (Neo-brutalism) */}
              <div className="neo-mode-switch-wrapper" role="tablist" aria-label="Cambiar Modo Principal">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mainTab === 'play'}
                  className={`neo-mode-switch-tab ${mainTab === 'play' ? 'active tab-play' : ''}`}
                  onClick={() => {
                    soundService.playToken();
                    setMainTab('play');
                  }}
                >
                  <Gamepad2 size={18} strokeWidth={2.5} color={mainTab === 'play' ? '#FFFFFF' : '#64748B'} />
                  <span>Jugar</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={mainTab === 'courses'}
                  className={`neo-mode-switch-tab ${mainTab === 'courses' ? 'active tab-courses' : ''}`}
                  onClick={() => {
                    soundService.playToken();
                    setMainTab('courses');
                  }}
                >
                  <GraduationCap size={19} strokeWidth={2.5} color={mainTab === 'courses' ? '#FFFFFF' : '#64748B'} />
                  <span>Cursos</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={mainTab === 'league'}
                  className={`neo-mode-switch-tab ${mainTab === 'league' ? 'active tab-league' : ''}`}
                  onClick={() => {
                    soundService.playToken();
                    setMainTab('league');
                  }}
                >
                  <Trophy size={18} strokeWidth={2.5} color={mainTab === 'league' ? '#FFFFFF' : '#64748B'} />
                  <span>Liga</span>
                </button>
              </div>

              {mainTab === 'courses' ? (
                <CoursesView
                  units={units}
                  theories={getTheoriesByPath(currentPath)}
                  progress={progress}
                  currentPath={currentPath}
                  user={user}
                  onSelectTheory={(th) => {
                    // Transición iris naranja + Dev '¡A jugar!' en 'Leer Materia'
                    if (irisTransition.active) return;
                    soundService.playToken();
                    setIrisTransition({ active: true, phase: 'closing' });
                    setTimeout(() => {
                      setIrisTransition({ active: true, phase: 'holding' });
                      setIrisDevMessage('¡A estudiar!');
                      setActiveTheory(th);
                      window.scrollTo({ top: 0, behavior: 'instant' });
                      setTimeout(() => {
                        setIrisDevMessage(null);
                        setIrisTransition({ active: true, phase: 'opening' });
                        setTimeout(() => setIrisTransition({ active: false, phase: 'closing' }), 400);
                      }, 1100);
                    }, 400);
                  }}
                  onSelectPractice={(lessonId) => {
                    const l = getLessonById(lessonId);
                    if (l) handleStartLesson(l);
                  }}
                  onOpenSqliteLab={() => {
                    soundService.playToken();
                    setView('sqlite-lab');
                    setSqliteInitialExerciseId(null);
                    setSqliteInitialDbId(null);
                    setSqliteInitialSqlCode(null);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                />
              ) : mainTab === 'league' ? (
                <LeagueView
                  user={user}
                  onNavigateToPlay={() => {
                    setMainTab('play');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onNavigateToCourses={() => {
                    setMainTab('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ) : (
                <>
                  <LearningPath
                    units={units}
                    user={user}
                    progress={progress}
                    onSelectLesson={handleStartLesson}
                    onOpenChest={handleOpenChest}
                    onOpenBoss={(bossId, unit) => handleOpenBoss(bossId, unit)}
                    onOpenTheory={(lesson) => {
                      const th = getTheoryByLessonId(lesson.id);
                      if (th) {
                        setActiveTheory(th);
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }
                    }}
                    onLockedNotice={(title, message) => {
                      setGameAlert({
                        isOpen: true,
                        type: 'lock',
                        title,
                        message,
                        primaryButtonText: 'Entendido',
                        onPrimaryClick: () => setGameAlert(null)
                      });
                    }}
                  />
                </>
              )}
            </>
          )}
        </main>
      )}

            {/* VISTA PERFIL */}
            {view === 'profile' && (
              <ProfilePage
                user={user}
                progress={progress}
                hasPendingDiagnostic={Boolean(activePendingAssignment)}
                onBack={() => setView('path')}
                onUpdate={(updated) => setUser(updated)}
                onOpenAuth={() => { setView('path'); setIsAuthOpen(true); }}
                onOpenAcademic={() => setView('academic')}
                onOpenLocker={() => {
                  soundService.playToken();
                  setView('store');
                }}
                onOpenDiagnostic={() => {
                  if (activePendingAssignment) {
                    const inst = getDiagnosticInstrumentById(activePendingAssignment.instrumentId);
                    if (inst) setActiveEvaluationInstrument(inst);
                    else setActiveEvaluationInstrument(getInstrument(currentPath, 'diagnostic'));
                  } else {
                    setActiveEvaluationInstrument(getInstrument(currentPath, 'diagnostic'));
                  }
                }}
                onOpenFinalTest={() => setActiveEvaluationInstrument(getInstrument(currentPath, 'final'))}
                onSignOut={handleSignOut}
              />
            )}

            {/* SECCIÓN PRIVADA DE SEGUIMIENTO ACADÉMICO (SOLO ADMIN CON CONTRASEÑA HASH) */}
            {view === 'academic' && (
              <AcademicDashboard
                currentUser={user}
                onBack={() => setView('path')}
                onOpenLiveUsers={() => {
                  soundService.playToken();
                  setIsLiveUsersOpen(true);
                }}
                initialSelectedStudentUid={selectedAcademicStudentUid}
              />
            )}

            {/* VISTA DE PÁGINA COMPLETA: CENTRO DE NOTIFICACIONES Y AVISOS */}
            {view === 'notifications' && (
              <NotificationsPage
                user={user}
                notifications={notifications}
                onBack={() => setView('path')}
                onMarkAsRead={handleMarkNotificationAsRead}
                onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                onDismissNotification={handleDismissNotification}
                onDismissAllRead={handleDismissAllRead}
                onOpenScriptInSqlite={(sqlCode, targetDbId) => {
                  soundService.playToken();
                  setSqliteInitialDbId(targetDbId);
                  setSqliteInitialSqlCode(sqlCode);
                  setSqliteInitialExerciseId('sandbox');
                  setView('sqlite-lab');
                }}
              />
            )}

            {/* VISTA DEDICADA 100% DUOLINGO 3D: TIENDA Y VESTIDOR DE BYTE (NO MODAL) */}
            {view === 'store' && (
              <StorePage
                user={user}
                totalStars={Object.values(progress).reduce((acc, curr) => acc + (curr?.starsEarned || 0), 0)}
                onBack={() => setView('path')}
                onUpdateUser={(updated) => setUser(updated)}
              />
            )}

            {/* VISTA DEDICADA 100% PANTALLA COMPLETA: CAMINO DE TEMPORADA DE 100 NIVELES Y DESAFÍOS */}
            {view === 'season' && (
              <SeasonPathPage
                user={user}
                progress={progress}
                initialTab={seasonTab}
                onBack={() => setView('path')}
                onUpdateUser={(updated) => setUser(updated)}
              />
            )}
          </div>

          {/* Columna Derecha Desktop: Estadísticas y Widgets Duolingo */}
          {view === 'path' && (
            <div className="duo-desktop-right-column">
              <DesktopRightSidebar
                user={user}
                currentPath={currentPath}
                onPathToggle={() => {
                  soundService.playToken();
                  const nextPath: PathType = user.currentPath === 'kotlin' ? 'sql' : 'kotlin';
                  const updated = { ...user, currentPath: nextPath };
                  userService.updateProfile(updated);
                  setUser(updated);
                }}
                onOpenStreak={() => {
                  soundService.playToken();
                  setIsJustFinishedStreak(false);
                  setIsStreakModalOpen(true);
                }}
                onOpenStore={() => {
                  soundService.playToken();
                  setView('store');
                }}
                onOpenQuests={() => {
                  handleOpenSeason('quests');
                }}
                onOpenProfile={() => {
                  soundService.playToken();
                  setView('profile');
                }}
                onNavigateToLeague={() => {
                  soundService.playToken();
                  setView('path');
                  setMainTab('league');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenSeason={(tab = 'path') => {
                  handleOpenSeason(tab);
                }}
              />
            </div>
          )}
          </div>
        </div>
      </>
    )}

      {/* ═══ VISTA DEDICADA: LABORATORIO SQLITE REAL (ENFOQUE TOTAL SIN NAV BARS) ═══ */}
      {view === 'sqlite-lab' && (
        <div className="sqlite-fullscreen-wrapper">
          <SqliteLab
            user={user}
            initialExerciseId={sqliteInitialExerciseId}
            initialDbId={sqliteInitialDbId}
            initialSqlCode={sqliteInitialSqlCode}
            onBack={() => {
              soundService.playToken();
              setView('path');
              setSqliteInitialExerciseId(null);
              setSqliteInitialDbId(null);
              setSqliteInitialSqlCode(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* ═══ VISTA DEDICADA: LABORATORIO KOTLIN REAL (ENFOQUE TOTAL SIN NAV BARS) ═══ */}
      {view === 'kotlin-lab' && (
        <div className="kotlin-fullscreen-wrapper">
          <KotlinLab
            user={user}
            initialExerciseId={kotlinInitialExerciseId}
            onBack={() => {
              soundService.playToken();
              setView('path');
              setKotlinInitialExerciseId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* VISTA 2: SESIÓN DE LECCIÓN INTERACTIVA (CON COMODINES Y VS CODE SNIPPET) */}
      {view === 'lesson' && activeLesson && currentExercise && (
        <div
          className={`duo-lesson-wrapper ${currentExercise.type === 'flowchart_builder' ? 'duo-lesson-wide' : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            padding: '16px 16px 140px 16px',
            maxWidth: currentExercise.type === 'flowchart_builder' ? '100%' : '680px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Barra de Progreso Superior Neo-Brutal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <button
              onClick={() => {
                soundService.playToken();
                setView('path');
              }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                color: '#000000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.1s ease'
              }}
              title="Salir de la lección"
            >
              <X size={22} strokeWidth={2.8} />
            </button>
            <div
              style={{
                flex: 1,
                height: '18px',
                background: '#FFFFFF',
                border: '2px solid #000000',
                boxShadow: '2.5px 2.5px 0px #000000',
                borderRadius: '9999px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${
                    isReviewPhase
                      ? Math.min(
                          100,
                          Math.max(
                            8,
                            Math.round(
                              ((currentQueueIndex - initialExercisesCount + (feedbackState !== 'idle' ? 1 : 0)) /
                                Math.max(1, lessonQueue.length - initialExercisesCount)) *
                                100
                            )
                          )
                        )
                      : Math.min(
                          100,
                          Math.max(
                            8,
                            Math.round(
                              ((currentQueueIndex + (feedbackState !== 'idle' ? 1 : 0)) /
                                Math.max(1, initialExercisesCount)) *
                                100
                            )
                          )
                        )
                  }%`,
                  background: isReviewPhase ? '#F59E0B' : '#22C55E',
                  borderRadius: '9999px',
                  borderRight: '2px solid #000000',
                  transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
                  position: 'relative'
                }}
              >
                {/* Brillo superior suave */}
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '8px',
                    right: '8px',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.55)',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
            {/* Contador de ejercicios dinámico y fase de reposición */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: isReviewPhase ? '#FEF3C7' : '#FFFFFF',
                border: '2px solid #000000',
                boxShadow: '2px 2px 0px #000000',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '0.82rem',
                fontWeight: 900,
                color: isReviewPhase ? '#B45309' : '#000000',
                minWidth: isReviewPhase ? '90px' : '52px',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {isReviewPhase
                ? `Repaso ${currentQueueIndex - initialExercisesCount + 1}/${lessonQueue.length - initialExercisesCount}`
                : `${Math.min(currentQueueIndex + 1, initialExercisesCount)}/${initialExercisesCount}`}
            </div>

            {/* Banderín Neo-Brutal para reportar problemas en la pregunta */}
            <button
              type="button"
              onClick={() => {
                soundService.playToken();
                setIsQuestionReportModalOpen(true);
              }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '2.5px solid #000000',
                boxShadow: '3px 3px 0px #000000',
                color: '#DC2626',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.1s ease'
              }}
              className="active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-red-50"
              title="Reportar algún problema en esta pregunta (banderín)"
              aria-label="Reportar problema en la pregunta"
            >
              <Flag size={20} strokeWidth={2.6} fill="#FEE2E2" />
            </button>
          </div>

          {/* Barra Táctica de Comodines Integrada */}
          <PowerUpsBar
            powerups={user.powerups}
            onUsePowerUp={handleUsePowerUpInLesson}
            disabled={feedbackState !== 'idle'}
            compact={true}
          />

          {/* Banner de Ayuda del Profesor */}
          {teacherHintText && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#F0F9FF',
                border: '2.5px solid #000000',
                boxShadow: '3.5px 3.5px 0px #000000',
                borderRadius: '14px',
                padding: '12px 16px',
                marginBottom: '12px'
              }}
            >
              <GraduationCap size={22} color="#0284C7" strokeWidth={2.4} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.88rem', color: '#0369A1', lineHeight: 1.45, fontWeight: 700 }}>
                <strong style={{ color: '#0284C7' }}>Pista del Profesor:</strong> {teacherHintText}
              </span>
            </div>
          )}

          {/* Banner de Fase de Repaso de Errores */}
          {isReviewPhase && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#FEF3C7',
                border: '2.5px solid #000000',
                boxShadow: '3.5px 3.5px 0px #000000',
                borderRadius: '14px',
                padding: '10px 14px',
                marginBottom: '12px',
                color: '#B45309',
                fontWeight: 800,
                fontSize: '0.88rem'
              }}
            >
              <RotateCcw size={18} strokeWidth={2.6} />
              <span>¡Repasemos las preguntas que fallaste para dominar el tema!</span>
            </div>
          )}

          {isReviewPhase && feedbackState === 'idle' && (
            <ConsoleMascot
              mood="thinking"
              message="¡Momento de corregir! En programación, resolver el bug te convierte en un verdadero maestro."
            />
          )}

          {isReviewPhase && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FEF3C7', color: '#B45309', border: '2px solid #000000', boxShadow: '2px 2px 0px #000000', padding: '4px 10px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 900, width: 'fit-content', marginBottom: '8px' }}>
              <RotateCcw size={14} strokeWidth={2.6} /> Reto de Corrección
            </div>
          )}

          {/* Banner de Pista de Código / Comodín Activo */}
          {codePeekClueText && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#FAF5FF',
                border: '2.5px solid #000000',
                boxShadow: '3.5px 3.5px 0px #000000',
                borderRadius: '14px',
                padding: '10px 14px',
                marginBottom: '12px'
              }}
            >
              <Sparkles size={18} color="#7E22CE" strokeWidth={2.4} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.86rem', color: '#6B21A8', fontWeight: 800 }}>
                {codePeekClueText}
              </span>
            </div>
          )}

          {/* Diálogo Duolingo 3D con Mascota Dev y Burbuja de Pregunta */}
          <div className="duo-speech-container">
            <div className="duo-mascot-wrapper">
              <ConsoleDevAvatar size={62} mood={isReviewPhase ? 'thinking' : 'happy'} />
            </div>
            <div className="duo-speech-bubble">
              <h2 className="duo-speech-title">
                <FormattedText text={currentExercise.prompt} inline />
              </h2>
              <p className="duo-speech-instruction">
                {getExerciseInstruction(currentExercise)}
              </p>
            </div>
          </div>

          {/* EJERCICIO 1: BANCO DE TOKENS (CODE BUILDER) */}
          {currentExercise.type === 'code_builder' && (
            <div>
              <div className="code-builder-area">
                {selectedTokenIndices.length === 0 ? (
                  <span style={{ color: '#94A3B8', fontStyle: 'italic', fontSize: '0.88rem' }}>
                    Toca las fichas de abajo en orden para construir la solución...
                  </span>
                ) : (
                  selectedTokenIndices.map((tokenIdx, pos) => (
                    <button
                      key={pos}
                      className="token-chip"
                      onClick={() => {
                        soundService.playToken();
                        setSelectedTokenIndices(prev => prev.filter((_, i) => i !== pos));
                      }}
                    >
                      {currentExercise.tokens[tokenIdx]}
                    </button>
                  ))
                )}
              </div>

              <div className="token-bank">
                {currentExercise.tokens.map((tok, idx) => {
                  const isSelected = selectedTokenIndices.includes(idx);
                  const isEliminated = eliminatedTokenIndices.includes(idx);
                  const isPeekToken = codePeekTokenIndex === idx && !isSelected;
                  return (
                    <button
                      key={idx}
                      disabled={isSelected || isEliminated}
                      className={`token-chip ${isSelected ? 'selected' : ''} ${
                        isEliminated ? 'eliminated-token' : ''
                      } ${isPeekToken ? 'peek-token-highlight' : ''}`}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedTokenIndices(prev => [...prev, idx]);
                        if (codePeekTokenIndex === idx) setCodePeekTokenIndex(null);
                      }}
                    >
                      {tok}
                      {isPeekToken && (
                        <span className="token-peek-tag">Siguiente</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* EJERCICIO 2: CAZA DE ERRORES (SPOT THE BUG - REDISEÑO LIMPIO Y ULTRA USABLE) */}
          {currentExercise.type === 'spot_the_bug' && (
            <div style={{ margin: '12px 0 18px 0' }}>
              <div
                style={{
                  background: '#0B0F19',
                  borderRadius: '18px',
                  border: '2.5px solid #000000',
                  overflow: 'hidden',
                  boxShadow: '4px 4px 0px #000000'
                }}
              >
                {/* Cabecera limpia y clara del editor de depuración */}
                <div
                  style={{
                    background: '#151D2F',
                    padding: '11px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                    <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, marginLeft: '6px' }}>
                      {currentPath === 'sql' ? 'consulta.sql' : 'codigo.kt'}
                    </span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#FFE600', fontWeight: 900, background: 'rgba(255, 230, 0, 0.12)', border: '1px solid #FFE600', padding: '4px 10px', borderRadius: '8px' }}>
                    <span>Toca la línea con el error</span>
                  </div>
                </div>

                {/* Lista de líneas con espaciado amplio, números legibles y feedback instantáneo */}
                <div style={{ padding: '8px 0', maxHeight: '420px', overflowY: 'auto' }}>
                  {currentExercise.codeSnippet.map((line, idx) => {
                    const isEliminated = eliminatedBugLines.includes(idx);
                    const isPeekBug = codePeekBugLineIndex === idx;
                    const isSelected = selectedBugLine === idx;

                    return (
                      <div
                        key={idx}
                        className={`bug-line ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (isEliminated) return;
                          soundService.playToken();
                          setSelectedBugLine(idx);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '11px 16px',
                          cursor: isEliminated ? 'not-allowed' : 'pointer',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.94rem',
                          background: isSelected
                            ? 'rgba(0, 229, 255, 0.16)'
                            : isPeekBug
                            ? 'rgba(168, 85, 247, 0.22)'
                            : isEliminated
                            ? 'rgba(100, 116, 139, 0.08)'
                            : 'transparent',
                          borderLeft: isSelected
                            ? '5px solid #00E5FF'
                            : isPeekBug
                            ? '5px solid #A855F7'
                            : isEliminated
                            ? '5px solid #10B981'
                            : '5px solid transparent',
                          opacity: isEliminated ? 0.35 : 1,
                          transition: 'all 0.18s ease',
                          gap: '12px'
                        }}
                      >
                        <span
                          style={{
                            width: '28px',
                            color: isSelected ? '#00E5FF' : '#64748B',
                            userSelect: 'none',
                            fontSize: '0.84rem',
                            fontWeight: 800
                          }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <code
                          style={{
                            color: isSelected
                              ? '#FFFFFF'
                              : isPeekBug
                              ? '#E9D5FF'
                              : isEliminated
                              ? '#64748B'
                              : '#F8FAFC',
                            flex: 1,
                            whiteSpace: 'pre-wrap',
                            textDecoration: isEliminated ? 'line-through' : 'none',
                            fontWeight: isSelected ? 700 : 500
                          }}
                        >
                          {line}
                        </code>
                        {isSelected && (
                          <span
                            style={{
                              fontSize: '0.72rem',
                              color: '#00E5FF',
                              fontWeight: 900,
                              padding: '3px 8px',
                              background: 'rgba(0, 229, 255, 0.18)',
                              border: '1px solid #00E5FF',
                              borderRadius: '6px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              flexShrink: 0
                            }}
                          >
                            <CheckCircle2 size={12} strokeWidth={3} /> SELECCIONADA
                          </span>
                        )}
                        {isEliminated && (
                          <span
                            style={{
                              fontSize: '0.7rem',
                              color: '#10B981',
                              fontWeight: 800,
                              padding: '2px 6px',
                              background: 'rgba(16, 185, 129, 0.12)',
                              border: '1px solid #10B981',
                              borderRadius: '4px',
                              flexShrink: 0
                            }}
                          >
                            Línea Correcta
                          </span>
                        )}
                        {isPeekBug && !isSelected && (
                          <span
                            style={{
                              fontSize: '0.72rem',
                              color: '#D8B4FE',
                              fontWeight: 900,
                              padding: '3px 8px',
                              background: 'rgba(168, 85, 247, 0.25)',
                              border: '1px solid #A855F7',
                              borderRadius: '6px',
                              flexShrink: 0
                            }}
                          >
                            ¡Error aquí!
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Barra inferior de estado con guía al usuario */}
                <div
                  style={{
                    padding: '10px 16px',
                    background: selectedBugLine !== null ? 'rgba(0, 229, 255, 0.08)' : '#101625',
                    borderTop: '1.5px solid rgba(255, 255, 255, 0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    color: selectedBugLine !== null ? '#38BDF8' : '#94A3B8'
                  }}
                >
                  {selectedBugLine !== null ? (
                    <span style={{ fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={15} color="#00E5FF" strokeWidth={2.8} />
                      Has marcado la Línea {selectedBugLine + 1}. Ahora pulsa "COMPROBAR" abajo.
                    </span>
                  ) : (
                    <span style={{ fontStyle: 'italic' }}>
                      Haz clic sobre la línea que consideres que tiene el error.
                    </span>
                  )}
                  {selectedBugLine !== null && (
                    <button
                      type="button"
                      onClick={() => setSelectedBugLine(null)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        textDecoration: 'underline'
                      }}
                    >
                      Desmarcar
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* EJERCICIO 3: PREDICCIÓN DE CONSOLA (VS Code Snippet - Requisito 11) */}
          {currentExercise.type === 'predict_output' && (
            <div>
              {currentExercise.code && currentExercise.code.trim() && (
                <VSCodeSnippet
                  code={currentExercise.code}
                  filename={activeLesson?.path === 'sql' ? 'consulta.sql' : 'main.kt'}
                  language={activeLesson?.path === 'sql' ? 'sql' : 'kotlin'}
                  highlightLine={isCodePeekActive ? 2 : undefined}
                />
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {currentExercise.options.map((opt, idx) => {
                  const isEliminated = eliminatedOptionIndices.includes(idx);
                  const isSelected = selectedOption === idx;
                  const letterBadge = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={idx}
                      disabled={isEliminated}
                      className={`duo-option-card ${isSelected ? 'selected' : ''} ${isEliminated ? 'eliminated' : ''}`}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedOption(idx);
                      }}
                    >
                      <div className="duo-option-badge">{letterBadge}</div>
                      <span className="duo-option-text font-mono">
                        <FormattedText text={opt} inline />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* EJERCICIO 4: PAREJAS EN CASCADA */}
          {currentExercise.type === 'matching_pairs' && (
            <div className="pairs-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentExercise.pairs.map((p, idx) => {
                  const isMatched = matchedPairs.includes(p.left);
                  const isHighlighted = codePeekHighlightedPair?.left === p.left;
                  return (
                    <button
                      key={`l-${idx}`}
                      disabled={isMatched}
                      className={`pair-card ${isMatched ? 'matched' : ''} ${
                        activeLeftPair === p.left ? 'active-select' : ''
                      } ${isHighlighted ? 'pair-peek-highlight' : ''}`}
                      onClick={() => handlePairClick('left', p.left)}
                    >
                      {p.left}
                      {isHighlighted && !isMatched && (
                        <span className="pair-peek-badge">Pista</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(shuffledRightIndices.length === currentExercise.pairs.length
                  ? shuffledRightIndices
                  : currentExercise.pairs.map((_, i) => i)
                ).map((origIdx) => {
                  const p = currentExercise.pairs[origIdx];
                  if (!p) return null;
                  const isMatched = matchedPairs.includes(p.right);
                  const isHighlighted = codePeekHighlightedPair?.right === p.right;
                  return (
                    <button
                      key={`r-${origIdx}`}
                      disabled={isMatched}
                      className={`pair-card ${isMatched ? 'matched' : ''} ${
                        activeRightPair === p.right ? 'active-select' : ''
                      } ${isHighlighted ? 'pair-peek-highlight' : ''}`}
                      onClick={() => handlePairClick('right', p.right)}
                    >
                      {p.right}
                      {isHighlighted && !isMatched && (
                        <span className="pair-peek-badge">Pista</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* EJERCICIO 5: CODE CLOZE (VS Code Snippet - Requisito 11) */}
          {currentExercise.type === 'code_cloze' && (
            <div>
              <VSCodeSnippet
                code={currentExercise.codeWithBlank}
                filename="cloze.kt"
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {currentExercise.options.map((opt, idx) => {
                  const isEliminated = eliminatedOptionIndices.includes(idx);
                  const isSelected = selectedOption === idx;
                  const letterBadge = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={idx}
                      disabled={isEliminated}
                      className={`duo-option-card ${isSelected ? 'selected' : ''} ${isEliminated ? 'eliminated' : ''}`}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedOption(idx);
                      }}
                    >
                      <div className="duo-option-badge">{letterBadge}</div>
                      <span className="duo-option-text font-mono">
                        <FormattedText text={opt} inline />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* EJERCICIO 6: TRAZABILIDAD (TRACE STEP-BY-STEP) */}
          {currentExercise.type === 'trace_step' && (
            <TraceStepComponent
              exercise={currentExercise}
              onAnswerChange={(isReady, vals) => {
                setTraceInputsReady(isReady);
                setTraceUserValues(vals);
              }}
            />
          )}

          {/* EJERCICIO 7: ROMPECABEZAS (PARSON'S PUZZLE) */}
          {currentExercise.type === 'parsons_puzzle' && (
            <ParsonsPuzzleComponent
              exercise={currentExercise}
              onOrderChange={(order) => setParsonsOrder(order)}
            />
          )}

          {/* EJERCICIO 8: DIAGRAMA DE FLUJO INTERACTIVO (FLOWCHART BUILDER) */}
          {currentExercise.type === 'flowchart_builder' && (
            <FlowchartExerciseComponent
              exercise={currentExercise}
              onOrderChange={(order) => setFlowchartOrder(order)}
            />
          )}

          {/* ═══ BARRA INFERIOR DE LECCIÓN NEO-BRUTAL (STICKY FOOTER CHECK/CONTINUE) ═══ */}
          {feedbackState === 'idle' ? (
            <div
              className={`duo-lesson-footer ${currentExercise.type === 'flowchart_builder' ? 'footer-wide' : ''}`}
              style={{
                maxWidth: currentExercise.type === 'flowchart_builder' ? '100%' : undefined,
                left: currentExercise.type === 'flowchart_builder' ? 0 : undefined,
                transform: currentExercise.type === 'flowchart_builder' ? 'none' : undefined
              }}
            >
              <button
                disabled={!isAnswerReady()}
                onClick={handleCheckAnswer}
                style={{
                  width: '100%',
                  fontSize: '1.05rem',
                  padding: '15px 20px',
                  borderRadius: '14px',
                  background: isAnswerReady() ? '#22C55E' : '#E2E8F0',
                  color: isAnswerReady() ? '#FFFFFF' : '#94A3B8',
                  border: '2.5px solid #000000',
                  boxShadow: isAnswerReady() ? '3.5px 3.5px 0px #000000' : 'none',
                  cursor: isAnswerReady() ? 'pointer' : 'not-allowed',
                  fontWeight: 900,
                  letterSpacing: '0.8px',
                  transition: 'all 0.1s ease'
                }}
              >
                COMPROBAR
              </button>
            </div>
          ) : (
            <div
              className={`duo-lesson-footer ${feedbackState} ${currentExercise.type === 'flowchart_builder' ? 'footer-wide' : ''}`}
              style={{
                maxWidth: currentExercise.type === 'flowchart_builder' ? '100%' : undefined,
                left: currentExercise.type === 'flowchart_builder' ? 0 : undefined,
                transform: currentExercise.type === 'flowchart_builder' ? 'none' : undefined
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {feedbackState === 'success' ? (
                    <>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: '#22C55E',
                          border: '2px solid #000000',
                          boxShadow: '2px 2px 0px #000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <CheckCircle2 size={26} color="#FFFFFF" strokeWidth={2.8} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#15803D' }}>
                          ¡Compilación Exitosa!
                        </div>
                        <div style={{ fontSize: '0.92rem', color: '#166534', fontWeight: 800 }}>
                          <FormattedText text={feedbackExplanation} inline />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            soundService.playToken();
                            setIsQuestionReportModalOpen(true);
                          }}
                          style={{
                            marginTop: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: '#FFFFFF',
                            border: '1.5px solid #000000',
                            boxShadow: '1.5px 1.5px 0px #000000',
                            padding: '3px 8px',
                            borderRadius: '8px',
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            color: '#B91C1C',
                            cursor: 'pointer'
                          }}
                          className="active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-red-50"
                        >
                          <Flag size={12} strokeWidth={2.4} fill="#FEE2E2" />
                          <span>Reportar problema en pregunta</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: '#EF4444',
                          border: '2px solid #000000',
                          boxShadow: '2px 2px 0px #000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <XCircle size={26} color="#FFFFFF" strokeWidth={2.8} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#B91C1C' }}>
                          Bug Detectado
                        </div>
                        <div style={{ fontSize: '0.92rem', color: '#991B1B', fontWeight: 800 }}>
                          <FormattedText text={feedbackExplanation} inline />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            soundService.playToken();
                            setIsQuestionReportModalOpen(true);
                          }}
                          style={{
                            marginTop: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: '#FFFFFF',
                            border: '1.5px solid #000000',
                            boxShadow: '1.5px 1.5px 0px #000000',
                            padding: '3px 8px',
                            borderRadius: '8px',
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            color: '#B91C1C',
                            cursor: 'pointer'
                          }}
                          className="active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-red-50"
                        >
                          <Flag size={12} strokeWidth={2.4} fill="#FEE2E2" />
                          <span>Reportar problema en pregunta</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={handleContinue}
                  style={{
                    width: '100%',
                    fontSize: '1.05rem',
                    padding: '15px 20px',
                    borderRadius: '14px',
                    background: feedbackState === 'success' ? '#22C55E' : '#EF4444',
                    color: '#FFFFFF',
                    border: '2.5px solid #000000',
                    boxShadow: '3.5px 3.5px 0px #000000',
                    cursor: 'pointer',
                    fontWeight: 900,
                    letterSpacing: '0.8px',
                    transition: 'all 0.1s ease'
                  }}
                >
                  {currentQueueIndex < lessonQueue.length - 1 ? 'CONTINUAR' : 'FINALIZAR LECCIÓN'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}


      {/* VISTA 4: COMBATE CONTRA JEFE A PANTALLA COMPLETA (Requisito 5 - No es un modal) */}
      {view === 'boss' && activeBossData && (
        <BossFightArena
          user={user}
          bossId={activeBossData.bossId}
          unitId={activeBossData.unitId}
          pathId={currentPath}
          onVictory={async () => {
            confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
            const updatedUser = await userService.recordDefeatedBoss(user, activeBossData.bossId, { xp: 120, bytes: 60 });
            setUser(updatedUser);
            const bossProg: LessonProgress = {
              lessonId: activeBossData.bossId,
              pathId: currentPath,
              unitId: activeBossData.unitId,
              levelId: 99,
              starsEarned: 3,
              completedAt: Date.now(),
              attempts: 1,
              mistakesCount: 0,
              scorePercentage: 100,
              lastReviewedAt: Date.now()
            };
            await progressService.saveLessonProgress(user.uid, bossProg);
            const newProg = await progressService.getAllProgress(user.uid);
            setProgress(newProg);
            setView('path');
            setActiveBossData(null);
          }}
          onExit={() => {
            setView('path');
            setActiveBossData(null);
          }}
          onUsePowerUp={async (key) => {
            const updatedUser = await userService.consumePowerUp(user, key);
            setUser(updatedUser);
          }}
        />
      )}

      {/* MODALES DEL SISTEMA */}
      <AuthModal
        isOpen={isAuthOpen}
        isMandatory={!isAuthenticated}
        onClose={() => {
          if (isAuthenticated) setIsAuthOpen(false);
        }}
        onAuthSuccess={async (authProfile) => {
          setIsAuthenticated(true);
          setIsAuthOpen(false);
          const updatedUser = await checkAndAdvanceDailyStreak(authProfile);
          setUser(updatedUser);
          const p = await progressService.getAllProgress(authProfile.uid);
          if (p) setProgress(p);

          // La evaluación diagnóstica solo se habilita si el profesor la asignó expresamente
          checkPendingAssignedDiagnostic(updatedUser);
        }}
      />



      {/* MODAL DE OPINIÓN PEDAGÓGICA BREVE TRAS ENTREGAR PRÁCTICA */}
      {opinionActivityId && (
        <ActivityOpinionModal
          isOpen={true}
          studentId={user.uid}
          studentCode={user.studentCode || 'E01'}
          activityId={opinionActivityId}
          onClose={() => setOpinionActivityId(null)}
        />
      )}

      {/* MODAL PARA REPORTAR PROBLEMAS EN PREGUNTAS (BANDERÍN) */}
      {isQuestionReportModalOpen && currentExercise && (
        <QuestionReportModal
          isOpen={isQuestionReportModalOpen}
          onClose={() => setIsQuestionReportModalOpen(false)}
          user={user}
          lesson={activeLesson || undefined}
          exercise={currentExercise}
          userAnswer={currentExerciseUserAnswer}
          selectedOptionIndex={selectedOption}
          selectedBugLineIndex={selectedBugLine}
          selectedTokenIndices={selectedTokenIndices}
          feedbackState={feedbackState}
          feedbackExplanation={feedbackExplanation}
        />
      )}

      <ChestModal
        isOpen={isChestOpen}
        chestId={activeChestData?.chestId || 'kotlin-u01-chest-01'}
        rewards={activeChestData?.rewards}
        onClose={() => {
          setIsChestOpen(false);
          setActiveChestData(null);
        }}
        onClaim={async (chestId, rewards) => {
          const updated = await userService.recordOpenedChest(user, chestId, rewards);
          setUser(updated);
          setIsChestOpen(false);
          setActiveChestData(null);
        }}
      />

      {/* MODAL 3D DE RACHA ESTILO DUOLINGO CON AVATAR (SOLO 1 VEZ AL DÍA) */}
      <StreakCelebrationModal
        isOpen={isStreakModalOpen}
        onClose={() => {
          setIsStreakModalOpen(false);
          setIsJustFinishedStreak(false);
        }}
        user={user}
        isJustCompleted={isJustFinishedStreak}
        nextLesson={nextLessonAvailable}
        onAdvanceNextLesson={() => {
          setIsStreakModalOpen(false);
          setIsJustFinishedStreak(false);
          if (nextLessonAvailable) {
            handleStartLesson(nextLessonAvailable, false, progress, user);
          }
        }}
      />

      {/* ALERTA RÁPIDA DE NIVEL COMPLETADO (CUANDO LA RACHA YA SE MOSTRÓ HOY) */}
      {levelSuccessAlert && levelSuccessAlert.isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 12000
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              border: '3px solid #22C55E',
              borderRadius: '24px',
              boxShadow: '0 8px 0 #16A34A, 0 20px 40px rgba(0, 0, 0, 0.25)',
              maxWidth: '440px',
              width: '100%',
              padding: '28px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              animation: 'bounce-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: '#DCFCE7', border: '2.5px solid #000000', boxShadow: '3px 3px 0px #000000' }}>
              <Target size={32} color="#000000" strokeWidth={2.6} />
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
              ¡Nivel Completado con Éxito!
            </h3>
            <p style={{ fontSize: '0.96rem', color: '#475569', margin: 0, fontWeight: 700, lineHeight: 1.5 }}>
              Has ganado <strong style={{ color: '#16A34A' }}>+{levelSuccessAlert.xp} XP</strong> y tus estrellas ya están guardadas. ¡Tu progreso avanza firme!
            </p>

            <div style={{ display: 'flex', gap: '8px', margin: '4px 0' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: i < levelSuccessAlert.stars ? '#FFE600' : '#F1F5F9',
                    border: '2px solid #000000',
                    boxShadow: '2px 2px 0px #000000'
                  }}
                >
                  <Star
                    size={22}
                    color="#000000"
                    fill={i < levelSuccessAlert.stars ? '#000000' : 'none'}
                    strokeWidth={2.4}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '8px' }}>
              {levelSuccessAlert.nextLesson && (
                <button
                  className="btn-3d btn-green"
                  style={{ width: '100%', padding: '15px', borderRadius: '16px', fontSize: '1.05rem', fontWeight: 900 }}
                  onClick={() => {
                    const next = levelSuccessAlert.nextLesson;
                    setLevelSuccessAlert(null);
                    if (next) {
                      handleStartLesson(next, false, progress, user);
                    }
                  }}
                >
                  ¡AVANZAR AL SIGUIENTE NIVEL!
                </button>
              )}
              <button
                className="btn-3d btn-blue"
                style={{ width: '100%', padding: '12px', borderRadius: '16px', fontSize: '0.92rem', fontWeight: 800 }}
                onClick={() => setLevelSuccessAlert(null)}
              >
                Volver al Mapa de Ruta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE USUARIOS EN LÍNEA EN TIEMPO REAL */}
      <LiveUsersModal
        isOpen={isLiveUsersOpen}
        onClose={() => setIsLiveUsersOpen(false)}
        isTeacher={isTeacherAdmin}
        onSelectStudent={isTeacherAdmin ? (uid) => {
          setIsLiveUsersOpen(false);
          setSelectedAcademicStudentUid(uid);
          setView('academic');
        } : undefined}
      />

      {/* Alertas Nativas del Juego (Reemplazo total de window.alert) */}
      <GameAlertModal alert={gameAlert} onClose={() => setGameAlert(null)} />

      {/* Modal 3D de Checkpoint Teórico Obligatorio (Lectura rápida + 2 preguntas micro-quiz antes de jugar) */}
      {checkpointLesson && (
        <TheoryCheckpointModal
          lesson={checkpointLesson}
          theory={checkpointTheory || undefined}
          isOpen={Boolean(checkpointLesson)}
          user={user}
          onClose={() => {
            setCheckpointLesson(null);
            setCheckpointTheory(null);
          }}
          onComplete={handleCompleteCheckpoint}
          onOpenFullTheory={(th) => {
            setCheckpointLesson(null);
            setCheckpointTheory(null);
            setMainTab('courses');
            setActiveTheory(th);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        />
      )}

      {/* Transición de Círculo Naranja (Iris Wipe) con Dev '¡A jugar!' */}
      {irisTransition.active && (
        <div className="circle-iris-container" aria-hidden="true">
          <div className={`circle-iris-curtain ${irisTransition.phase}`} />
          {irisDevMessage && (
            <div className="iris-dev-overlay">
              <div className="iris-dev-avatar-wrap">
                {/* Avatar Dev 3D parpadeando */}
                <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="iris-dev-svg" style={{ filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.3))' }}>
                  <defs>
                    <radialGradient id="irisAntenna3d" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFFBEB" />
                      <stop offset="40%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#B45309" />
                    </radialGradient>
                    <linearGradient id="irisChassis3d" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="35%" stopColor="#0EA5E9" />
                      <stop offset="75%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#0369A1" />
                    </linearGradient>
                  </defs>

                  {/* Antena 3D */}
                  <rect x="47" y="10" width="6" height="12" rx="2" fill="#64748B" />
                  <circle cx="50" cy="8" r="6" fill="url(#irisAntenna3d)" stroke="#FDE68A" strokeWidth="1" />

                  {/* Orejeras 3D */}
                  <rect x="11" y="32" width="7" height="22" rx="3.5" fill="#0369A1" stroke="#38BDF8" strokeWidth="1.2" />
                  <circle cx="14.5" cy="43" r="1.5" fill="#22C55E" />
                  <rect x="82" y="32" width="7" height="22" rx="3.5" fill="#0369A1" stroke="#38BDF8" strokeWidth="1.2" />
                  <circle cx="85.5" cy="43" r="1.5" fill="#22C55E" />

                  {/* Bisel inferior */}
                  <rect x="16" y="24" width="68" height="52" rx="15" fill="#0369A1" />

                  {/* Chasis 3D */}
                  <rect x="16" y="20" width="68" height="52" rx="15" fill="url(#irisChassis3d)" stroke="#7DD3FC" strokeWidth="2.5"/>
                  <line x1="28" y1="22" x2="72" y2="22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
                  
                  {/* Visor 3D CRT */}
                  <rect x="23" y="27" width="54" height="38" rx="9" fill="#020617" stroke="#0369A1" strokeWidth="2"/>
                  <path d="M24 28 L56 28 L36 64 L24 64 Z" fill="#FFFFFF" fillOpacity="0.08" />

                  {/* Ojos parpadeando 3D con centrado exacto */}
                  <g className="iris-dev-eye">
                    <circle cx="39" cy="45" r="5.5" fill="#38BDF8" />
                    <circle cx="39" cy="45" r="4" fill="#0284C7" />
                    <circle cx="41.5" cy="42.5" r="1.8" fill="#FFFFFF" />

                    <circle cx="61" cy="45" r="5.5" fill="#38BDF8" />
                    <circle cx="61" cy="45" r="4" fill="#0284C7" />
                    <circle cx="63.5" cy="42.5" r="1.8" fill="#FFFFFF" />
                  </g>

                  {/* Boca sonriente */}
                  <path d="M42 54 Q50 60 58 54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none"/>
                  
                  {/* Base 3D */}
                  <rect x="44" y="72" width="12" height="6" fill="#0369A1" />
                  <rect x="32" y="78" width="36" height="7" rx="3.5" fill="#082F49" stroke="#38BDF8" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="iris-dev-message">
                <span className="iris-dev-typing">{irisDevMessage}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pantalla de carga animada con el nuevo ícono robot Byte */}
      {showLoading && (
        <LoadingScreen
          isReady={isBootReady}
          minDurationMs={2600}
          title={loadingTitle}
          onFinish={() => setShowLoading(false)}
        />
      )}

      {/* Indicador de estado de red y sincronización en la nube */}
      <NetworkStatusBadge />

      {/* Banner / Modal de instalación en la pantalla de inicio (PWA) */}
      <PWAInstallBanner />

      {/* Alerta de Atención Inmediata enviada por el Profesor en Tiempo Real */}
      <TeacherAttentionAlertModal
        alert={activeUrgentAlert}
        onAcknowledge={handleAcknowledgeUrgentAlert}
        onGoPlay={handleGoPlayUrgentAlert}
      />
    </>
  );
}

