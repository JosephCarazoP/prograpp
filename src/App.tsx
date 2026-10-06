import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Gamepad2,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';

import { UserProfile, LearningPath as PathType, UserPowerUps } from './types/user';
import { Lesson, Exercise } from './types/lesson';
import { LessonProgress } from './types/progress';
import { userService, DEFAULT_PROFILE, sanitizeUserProfile } from './services/userService';
import { progressService } from './services/progressService';
import { authService, ADMIN_AUTHORIZED_EMAIL } from './services/authService';
import { soundService } from './services/soundService';
import { storageService } from './services/storageService';
import { progressionEngine } from './services/progressionEngine';
import { getUnitsByPath, getLessonById } from './content';
import { TheoryLesson } from './types/theory';
import { getTheoryByLessonId, getTheoriesByPath } from './content/theoryIndex';

// Componentes modulares
import { Navbar } from './components/Navbar';
import { LearningPath } from './components/LearningPath';
import { CoursesView } from './components/CoursesView';
import { TheoryViewer } from './components/TheoryViewer';
import { AuthModal } from './components/AuthModal';
import { ProfilePage } from './components/ProfilePage';
import { DailyQuestsModal } from './components/DailyQuestsModal';
import { ChestModal, ChestRewardPayload } from './components/ChestModal';
import { BossFightArena } from './components/BossFight';
import { PowerUpsBar } from './components/PowerUpsBar';
import { VSCodeSnippet } from './components/VSCodeSnippet';
import { TraceStepComponent } from './components/exercises/TraceStepExercise';
import { ParsonsPuzzleComponent } from './components/exercises/ParsonsPuzzleExercise';
import { LoadingScreen } from './components/LoadingScreen';
import { ConsoleMascot } from './components/ConsoleAvatar';
import { GameAlertModal, GameAlertState } from './components/GameAlertModal';
import { AnimatedDoodleBackground } from './components/AnimatedDoodleBackground';
import { AcademicDashboard } from './components/AcademicDashboard';
import { EvaluationModal } from './components/EvaluationModal';
import { ActivityOpinionModal } from './components/ActivityOpinionModal';
import { academicService } from './services/academicService';
import { timeTrackingService } from './services/timeTrackingService';
import {
  getInstrument,
  EvaluationInstrument,
  INITIAL_COMPREHENSIVE_DIAGNOSTIC_INSTRUMENT
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

export default function App() {
  // Inicialización instantánea offline-first para eliminar pantallas congeladas
  const [user, setUser] = useState<UserProfile>(() => {
    const raw = storageService.getItem<any>('user_profile', DEFAULT_PROFILE);
    return sanitizeUserProfile(raw);
  });
  const [progress, setProgress] = useState<Record<string, LessonProgress>>(() => {
    const raw = storageService.getItem<Record<string, LessonProgress>>('user_progress', {});
    // Si solo existía el progreso mock inicial de prueba, lo limpiamos para arrancar solo con nivel 1
    if (raw && Object.keys(raw).length === 1 && raw['kotlin-u01-l01']?.completedAt && (Date.now() - raw['kotlin-u01-l01'].completedAt > 3600000)) {
      storageService.setItem('user_progress', {});
      return {};
    }
    return raw && typeof raw === 'object' ? raw : {};
  });

  // Vistas principales: path, lesson, practice, boss, profile, academic
  const [view, setView] = useState<'path' | 'lesson' | 'practice' | 'boss' | 'profile' | 'academic'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'boss') return 'boss';
      if (params.get('view') === 'academic') return 'academic';
    }
    return 'path';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(storageService.getItem<string | null>('last_authenticated_uid', null));
  });
  const [activeSessionId, setActiveSessionId] = useState<string>(() => 'ses_' + Date.now());
  const [exerciseAttemptsMap, setExerciseAttemptsMap] = useState<Record<string, number>>({});
  const [activeEvaluationInstrument, setActiveEvaluationInstrument] = useState<EvaluationInstrument | null>(null);
  const [opinionActivityId, setOpinionActivityId] = useState<string | null>(null);

  const [mainTab, setMainTab] = useState<'play' | 'courses'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'courses') return 'courses';
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

  // Modales
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isChestOpen, setIsChestOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('modal') === 'chest') return true;
    }
    return false;
  });
  const [activeChestData, setActiveChestData] = useState<{
    chestId: string;
    rewards?: ChestRewardPayload;
  } | null>(null);

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
  const [masteredExerciseIds, setMasteredExerciseIds] = useState<Set<string>>(new Set());
  const [lessonMistakes, setLessonMistakes] = useState(0);

  // Estados de comodines en lección
  const [teacherHintText, setTeacherHintText] = useState<string | null>(null);
  const [eliminatedOptionIndices, setEliminatedOptionIndices] = useState<number[]>([]);
  const [isSecondChanceActive, setIsSecondChanceActive] = useState(false);
  const [isCodePeekActive, setIsCodePeekActive] = useState(false);

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

  // Hoja inferior de feedback
  const [feedbackState, setFeedbackState] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackExplanation, setFeedbackExplanation] = useState('');

  // Estado de pantalla de carga con animación blur y tips
  const [showLoading, setShowLoading] = useState(true);
  const [loadingTitle, setLoadingTitle] = useState('Inicializando PrograApp...');

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
          setUser(sanitizedUser);
          if (p) setProgress(p);

          // Si es la primera vez que ingresa (o no ha completado el diagnóstico inicial de Kotlin y SQL), lanzarlo obligatoriamente
          if (!sanitizedUser.hasCompletedInitialDiagnostic && sanitizedUser.email !== ADMIN_AUTHORIZED_EMAIL) {
            setActiveEvaluationInstrument(INITIAL_COMPREHENSIVE_DIAGNOSTIC_INSTRUMENT);
          }
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
        setShowLoading(false);
      }
    }
    loadData();
  }, []);

  const currentPath: PathType = user?.currentPath === 'sql' ? 'sql' : 'kotlin';
  const units = getUnitsByPath(currentPath);

  // Iniciar lección o prueba: Control del Sistema + Banco de preguntas + Seguimiento de Tiempo
  const handleStartLesson = (lesson: Lesson) => {
    // 0. Comprobación obligatoria de autenticación (No permitir invitados)
    if (!isAuthenticated || !user.uid || user.uid === 'guest_user_1') {
      soundService.playError();
      setIsAuthOpen(true);
      return;
    }

    // 1. Control de Progresión Secuencial Estricta a Nivel de Sistema (Requisitos 1 y 4)
    const unitObj = units.find(u => u.id === lesson.unit);
    if (unitObj) {
      const check = progressionEngine.canAccessNode(lesson.id, unitObj, user, progress);
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
      const shuffledPool = shuffleArray(fullBank);
      const selectedTen = shuffledPool.slice(0, 10);

      setLessonQueue(selectedTen);
      setCurrentQueueIndex(0);
      setInitialExercisesCount(selectedTen.length);
      setMasteredExerciseIds(new Set());
      setLessonMistakes(0);
      resetExerciseState();
      setFeedbackState('idle');

      setTeacherHintText(null);
      setEliminatedOptionIndices([]);
      setIsSecondChanceActive(false);
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
  };

  const currentExercise: Exercise | undefined = lessonQueue[currentQueueIndex];
  const isReviewPhase = currentQueueIndex >= initialExercisesCount;

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
      setMasteredExerciseIds(prev => new Set(prev).add(currentExercise.id));
    } else {
      // Si el comodín de Segunda Oportunidad está activo, absorbe el error
      if (isSecondChanceActive) {
        soundService.playWin();
        setIsSecondChanceActive(false);
        setGameAlert({
          isOpen: true,
          type: 'shield',
          title: '¡Escudo de Segunda Oportunidad!',
          message: 'Tu escudo protector absorbió el fallo. Analiza bien el código y vuelve a intentarlo sin penalización.',
          primaryButtonText: 'Reintentar Reto',
          onPrimaryClick: () => setGameAlert(null)
        });
        return;
      }

      soundService.playError();
      setFeedbackState('error');
      setFeedbackExplanation(currentExercise.explanation);
      setLessonMistakes(prev => prev + 1);

      // Re-encolar el reto fallado al final de la cola para responderlo bien obligatoriamente
      setLessonQueue(prev => [...prev, currentExercise]);

      // Descontar batería Overdrive solo en fase inicial (nunca bloquea el aprendizaje)
      if (!isReviewPhase && user.batteries > 0) {
        const updatedUser = await userService.consumeBattery(user);
        setUser(updatedUser);
      }
    }
  };

  // Manejo de comodines durante la lección
  const handleUsePowerUpInLesson = async (key: keyof UserPowerUps) => {
    if (!user.powerups || (user.powerups[key] || 0) <= 0) {
      soundService.playError();
      setGameAlert({
        isOpen: true,
        type: 'lock',
        title: 'Comodín Agotado',
        message: 'No tienes unidades disponibles de este comodín. Abre más cofres de aventura para conseguir nuevos recursos tácticos.',
        primaryButtonText: 'Entendido',
        onPrimaryClick: () => setGameAlert(null)
      });
      return;
    }

    const updatedUser = await userService.consumePowerUp(user, key);
    setUser(updatedUser);

    if (key === 'teacherHint') {
      soundService.playCorrect();
      const hint = currentExercise?.hint || currentExercise?.explanation || 'Analiza detalladamente la sintaxis y tipos de datos requeridos.';
      setTeacherHintText(hint);
    } else if (key === 'eliminateOptions') {
      soundService.playCorrect();
      if (currentExercise?.type === 'predict_output') {
        const wrongIndices = currentExercise.options
          .map((_, i) => i)
          .filter(i => i !== currentExercise.correctOptionIndex);
        setEliminatedOptionIndices(wrongIndices.slice(0, 2));
      } else if (currentExercise?.type === 'code_cloze') {
        const wrongIndices = currentExercise.options
          .map((_, i) => i)
          .filter(i => currentExercise.options[i] !== currentExercise.correctOption);
        setEliminatedOptionIndices(wrongIndices.slice(0, 2));
      } else {
        setGameAlert({
          isOpen: true,
          type: 'success',
          title: '50 / 50 Activado',
          message: 'En este ejercicio práctico, enfócate en la estructura principal del código.',
          primaryButtonText: 'Entendido',
          onPrimaryClick: () => setGameAlert(null)
        });
      }
    } else if (key === 'secondChance') {
      soundService.playCorrect();
      setIsSecondChanceActive(true);
    } else if (key === 'codePeek') {
      soundService.playCorrect();
      setIsCodePeekActive(true);
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
      // Limpiar estados temporales de comodines por pregunta
      setTeacherHintText(null);
      setEliminatedOptionIndices([]);
      setIsCodePeekActive(false);
    } else {
      // Detener conteo de tiempo activo
      timeTrackingService.stopLessonTracking();
      const finishedLessonId = activeLesson.id;

      soundService.playWin();
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });

      // Bonificación Overdrive: si tiene baterías disponibles, recibe +50% XP
      const hasOverdrive = (user.batteries || 0) > 0;
      const baseXp = 30;
      const finalXp = hasOverdrive ? Math.round(baseXp * 1.5) : baseXp;

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

      await progressService.saveLessonProgress(user.uid, lessonProgress);
      const updatedUser = await userService.rewardUser(user, finalXp, 15);
      const updatedProgress = await progressService.getAllProgress(user.uid);

      setUser(updatedUser);
      setProgress(updatedProgress);
      setView('path');
      setActiveLesson(null);
      setLessonQueue([]);

      // Abrir breve encuesta de opinión pedagógica tras entregar la práctica
      setOpinionActivityId(finishedLessonId);
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

  // Práctica en gimnasio
  const handlePracticeSession = async () => {
    soundService.playWin();
    const updated = await userService.addPracticeBattery(user);
    setUser(updated);
    setGameAlert({
      isOpen: true,
      type: 'success',
      title: '¡Entrenamiento Exitoso!',
      message: `Has reforzado tus conceptos de programación y recuperado +1 Batería Overdrive. Baterías actuales: ${updated.batteries}/${updated.maxBatteries || 5}.`,
      primaryButtonText: 'Volver a la Ruta',
      onPrimaryClick: () => {
        setGameAlert(null);
        setView('path');
      }
    });
  };

  // Apertura de Cofre con validación de un solo uso
  const handleOpenChest = (chestId: string, rewards?: ChestRewardPayload) => {
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
        batteries: 2,
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

  return (
    <>
      <AnimatedDoodleBackground />
      {showLoading && (
        <LoadingScreen
          isReady={!!user}
          minDurationMs={1500}
          title={loadingTitle}
          onFinish={() => setShowLoading(false)}
        />
      )}

      {/* Barra de Estado Superior (solo visible en path y practice cuando no se está leyendo teoría) */}
      {view !== 'boss' && view !== 'lesson' && view !== 'academic' && !activeTheory && (
        <Navbar
          user={user}
          isAdmin={authService.isCurrentUserAdmin()}
          onPathToggle={() => {
            soundService.playToken();
            const nextPath: PathType = user.currentPath === 'kotlin' ? 'sql' : 'kotlin';
            setLoadingTitle(
              nextPath === 'sql'
                ? 'Cargando Módulos Relacionales SQL...'
                : 'Cargando Entorno Algorítmico Kotlin...'
            );
            setShowLoading(true);
            const updated = { ...user, currentPath: nextPath };
            userService.updateProfile(updated);
            setUser(updated);
          }}
          onOpenQuests={() => {
            soundService.playToken();
            setIsQuestsOpen(true);
          }}
          onOpenPractice={() => {
            soundService.playToken();
            setView('practice');
          }}
          onOpenProfile={() => {
            soundService.playToken();
            setView('profile');
          }}
          onOpenAcademic={() => {
            soundService.playToken();
            setView('academic');
          }}
          onSignOut={async () => {
            soundService.playToken();
            timeTrackingService.stopLessonTracking();
            await authService.signOutUser();
            setIsAuthenticated(false);
            setUser(DEFAULT_PROFILE);
            setProgress({});
            setView('path');
            setIsAuthOpen(true);
          }}
        />
      )}

      {/* VISTA 1: EL CAMINO (LEARNING PATH) / SECCIÓN DE CURSOS / TEORÍA */}
      {view === 'path' && (
        <main
          style={{
            padding: activeTheory ? '16px 10px 80px 10px' : '10px 12px 120px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: activeTheory ? '680px' : '520px',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
        >
          {activeTheory ? (
            <TheoryViewer
              theory={activeTheory}
              onBack={() => setActiveTheory(null)}
              onStartPractice={(lessonId) => {
                const l = getLessonById(lessonId);
                if (l) handleStartLesson(l);
              }}
            />
          ) : (
            <>
              {/* Barra de Cambio de Modo Dual: Jugar vs Cursos */}
              <div
                style={{
                  display: 'flex',
                  background: '#F1F5F9',
                  padding: '4px',
                  borderRadius: '16px',
                  border: '2px solid #E2E8F0',
                  marginBottom: '16px',
                  gap: '6px',
                  maxWidth: '460px',
                  width: '100%',
                  boxSizing: 'border-box',
                  boxShadow: '0 3px 0 #CBD5E1'
                }}
              >
                <button
                  onClick={() => {
                    soundService.playToken();
                    setMainTab('play');
                  }}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: mainTab === 'play' ? 'var(--orange-main)' : 'transparent',
                    color: mainTab === 'play' ? '#FFFFFF' : '#64748B',
                    border: 'none',
                    boxShadow: mainTab === 'play' ? '0 3px 0 #C27100' : 'none'
                  }}
                >
                  <Gamepad2 size={17} />
                  <span>Jugar</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playToken();
                    setMainTab('courses');
                  }}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: mainTab === 'courses' ? '#2563EB' : 'transparent',
                    color: mainTab === 'courses' ? '#FFFFFF' : '#64748B',
                    border: 'none',
                    boxShadow: mainTab === 'courses' ? '0 3px 0 #1D4ED8' : 'none'
                  }}
                >
                  <GraduationCap size={18} />
                  <span>Cursos</span>
                </button>
              </div>

              {mainTab === 'courses' ? (
                <CoursesView
                  units={units}
                  theories={getTheoriesByPath(currentPath)}
                  progress={progress}
                  currentPath={currentPath}
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

      {/* VISTA 2: SESIÓN DE LECCIÓN INTERACTIVA (CON COMODINES Y VS CODE SNIPPET) */}
      {view === 'lesson' && activeLesson && currentExercise && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px 16px 120px 16px', maxWidth: '640px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          {/* Barra de Progreso Superior Duolingo 3D */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <button
              onClick={() => {
                soundService.playToken();
                setView('path');
              }}
              style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
            >
              <ArrowLeft size={24} />
            </button>
            <div
              style={{
                flex: 1,
                height: '16px',
                background: '#E2E8F0',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, Math.round((masteredExerciseIds.size / Math.max(1, initialExercisesCount)) * 100))}%`,
                  background: isReviewPhase ? '#F59E0B' : '#22C55E',
                  borderRadius: '10px',
                  boxShadow: isReviewPhase ? '0 2px 0 #D97706' : '0 2px 0 #15803D',
                  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
                  position: 'relative'
                }}
              >
                {/* Brillo 3D superior estilo Duolingo */}
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '6px',
                    right: '6px',
                    height: '3px',
                    background: 'rgba(255, 255, 255, 0.45)',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 900, color: isReviewPhase ? '#D97706' : '#64748B', minWidth: '42px', textAlign: 'right' }}>
              {masteredExerciseIds.size}/{initialExercisesCount}
            </span>
          </div>

          {/* Barra Táctica de Comodines Integrada (Requisito 2) */}
          <PowerUpsBar
            powerups={user.powerups}
            onUsePowerUp={handleUsePowerUpInLesson}
            isSecondChanceActive={isSecondChanceActive}
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
                border: '2px solid #38BDF8',
                boxShadow: '0 3px 0 #0284C7',
                borderRadius: '16px',
                padding: '12px 16px',
                marginBottom: '12px'
              }}
            >
              <GraduationCap size={22} color="#0284C7" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.88rem', color: '#0369A1', lineHeight: 1.45, fontWeight: 700 }}>
                <strong style={{ color: '#0284C7' }}>Pista del Profesor:</strong> {teacherHintText}
              </span>
            </div>
          )}

          {/* Banner de Escudo Activo */}
          {isSecondChanceActive && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#F0FDF4',
                border: '2px solid #4ADE80',
                boxShadow: '0 3px 0 #16A34A',
                borderRadius: '14px',
                padding: '6px 14px',
                marginBottom: '10px',
                width: 'fit-content'
              }}
            >
              <ShieldCheck size={18} color="#15803D" />
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#166534' }}>
                Escudo de Segunda Oportunidad Activo (absorberá el próximo fallo)
              </span>
            </div>
          )}

          {/* Banner Duolingo de Fase de Repaso de Errores */}
          {isReviewPhase && (
            <div className="review-banner">
              <RotateCcw size={16} />
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800, width: 'fit-content', marginBottom: '8px' }}>
              <RotateCcw size={14} /> Reto de Corrección
            </div>
          )}

          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: '8px 0 16px 0', color: '#0F172A', lineHeight: 1.35 }}>
            {currentExercise.prompt}
          </h3>

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
                  return (
                    <button
                      key={idx}
                      disabled={isSelected}
                      className={`token-chip ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedTokenIndices(prev => [...prev, idx]);
                      }}
                    >
                      {tok}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* EJERCICIO 2: CAZA DE ERRORES (SPOT THE BUG) */}
          {currentExercise.type === 'spot_the_bug' && (
            <div style={{ margin: '8px 0 16px 0' }}>
              <div
                style={{
                  background: '#0F172A',
                  borderRadius: '16px',
                  border: '2px solid #E2E8F0',
                  overflow: 'hidden',
                  boxShadow: '0 5px 0 #CBD5E1'
                }}
              >
                <div
                  style={{
                    background: '#1E293B',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '2px solid #0F172A'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                    <span style={{ fontSize: '0.78rem', color: '#F8FAFC', fontFamily: 'JetBrains Mono', fontWeight: 800, marginLeft: '6px' }}>
                      debug_target.kt
                    </span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#F87171', fontWeight: 800, background: 'rgba(239, 68, 68, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                    Toca la línea con el error
                  </span>
                </div>

                <div style={{ padding: '8px 0' }}>
                  {currentExercise.codeSnippet.map((line, idx) => (
                    <div
                      key={idx}
                      className={`bug-line ${selectedBugLine === idx ? 'selected' : ''}`}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedBugLine(idx);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '9px 14px',
                        cursor: 'pointer',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.92rem',
                        background: selectedBugLine === idx ? 'rgba(239, 68, 68, 0.25)' : 'transparent',
                        borderLeft: selectedBugLine === idx ? '4px solid #EF4444' : '4px solid transparent',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ width: '28px', color: '#64748B', userSelect: 'none', fontSize: '0.82rem', fontWeight: 700 }}>
                        {idx + 1}
                      </span>
                      <code style={{ color: selectedBugLine === idx ? '#FCA5A5' : '#F8FAFC', flex: 1, whiteSpace: 'pre-wrap' }}>
                        {line}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EJERCICIO 3: PREDICCIÓN DE CONSOLA (VS Code Snippet - Requisito 11) */}
          {currentExercise.type === 'predict_output' && (
            <div>
              <VSCodeSnippet
                code={currentExercise.code}
                filename="main.kt"
                highlightLine={isCodePeekActive ? 2 : undefined}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                {currentExercise.options.map((opt, idx) => {
                  const isEliminated = eliminatedOptionIndices.includes(idx);
                  const isSelected = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      disabled={isEliminated}
                      className={`btn-3d ${isSelected ? 'btn-orange' : 'btn-outline'}`}
                      style={{
                        opacity: isEliminated ? 0.3 : 1,
                        textDecoration: isEliminated ? 'line-through' : 'none',
                        textTransform: 'none',
                        fontFamily: 'var(--font-code), var(--font-ui)',
                        fontSize: '1rem',
                        fontWeight: 800,
                        padding: '16px 14px',
                        borderRadius: '16px'
                      }}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedOption(idx);
                      }}
                    >
                      {opt}
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
                {currentExercise.pairs.map((p, idx) => (
                  <button
                    key={`l-${idx}`}
                    className={`pair-card ${matchedPairs.includes(p.left) ? 'matched' : ''} ${
                      activeLeftPair === p.left ? 'active-select' : ''
                    }`}
                    onClick={() => handlePairClick('left', p.left)}
                  >
                    {p.left}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(shuffledRightIndices.length === currentExercise.pairs.length
                  ? shuffledRightIndices
                  : currentExercise.pairs.map((_, i) => i)
                ).map((origIdx) => {
                  const p = currentExercise.pairs[origIdx];
                  if (!p) return null;
                  return (
                    <button
                      key={`r-${origIdx}`}
                      className={`pair-card ${matchedPairs.includes(p.right) ? 'matched' : ''} ${
                        activeRightPair === p.right ? 'active-select' : ''
                      }`}
                      onClick={() => handlePairClick('right', p.right)}
                    >
                      {p.right}
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
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
                {currentExercise.options.map((opt, idx) => {
                  const isEliminated = eliminatedOptionIndices.includes(idx);
                  const isSelected = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      disabled={isEliminated}
                      className={`btn-3d ${isSelected ? 'btn-orange' : 'btn-outline'}`}
                      style={{
                        flex: '1 1 45%',
                        opacity: isEliminated ? 0.3 : 1,
                        textDecoration: isEliminated ? 'line-through' : 'none',
                        textTransform: 'none',
                        fontFamily: 'var(--font-code), var(--font-ui)',
                        fontSize: '1.02rem',
                        fontWeight: 800,
                        padding: '16px 14px',
                        borderRadius: '16px'
                      }}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedOption(idx);
                      }}
                    >
                      {opt}
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

          {/* Botón Comprobar */}
          {feedbackState === 'idle' && (
            <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
              <button
                className="btn-3d btn-green"
                disabled={!isAnswerReady()}
                onClick={handleCheckAnswer}
              >
                Comprobar
              </button>
            </div>
          )}

          {/* Hoja Inferior de Retroalimentación */}
          {feedbackState !== 'idle' && (
            <div className={`bottom-sheet ${feedbackState}`}>
              <div className="feedback-header">
                {feedbackState === 'success' ? (
                  <>
                    <CheckCircle2 size={32} color="#16A34A" />
                    <span className="feedback-title success">¡Compilación Exitosa!</span>
                  </>
                ) : (
                  <>
                    <XCircle size={32} color="#DC2626" />
                    <span className="feedback-title error">Bug Detectado</span>
                  </>
                )}
              </div>
              <p className="feedback-explanation">{feedbackExplanation}</p>
              <button
                className={`btn-3d ${feedbackState === 'success' ? 'btn-green' : 'btn-red'}`}
                onClick={handleContinue}
              >
                {currentQueueIndex < lessonQueue.length - 1 ? 'Continuar' : 'Finalizar Lección'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* VISTA 3: GIMNASIO DE PRÁCTICA */}
      {view === 'practice' && (
        <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                soundService.playToken();
                setView('path');
              }}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <ArrowLeft size={24} />
            </button>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>Gimnasio de Práctica</h2>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '18px', border: '2px solid var(--border-color)', boxShadow: '0 6px 0 var(--border-shadow)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--orange-main)', marginBottom: '8px' }}>
              Entrena sin riesgo y activa tu Bonificación Overdrive (+50% XP)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '16px' }}>
              En PrograApp nunca te quedas bloqueado para aprender. Tener baterías disponibles te otorga una bonificación de +50% de experiencia en cada nivel. Completa sesiones de entrenamiento para recargar tus baterías al máximo.
            </p>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', color: '#F87171' }}>
              Baterías actuales: {user.batteries}/5
            </div>
            <button
              className="btn-3d btn-green"
              disabled={user.batteries >= 5}
              onClick={handlePracticeSession}
            >
              {user.batteries >= 5 ? 'Overdrive al Máximo (5/5)' : 'Entrenar (+1 Batería)'}
            </button>
          </div>
        </div>
      )}

      {/* VISTA 4: COMBATE CONTRA JEFE A PANTALLA COMPLETA (Requisito 5 - No es un modal) */}
      {view === 'boss' && activeBossData && (
        <BossFightArena
          user={user}
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
          setUser(authProfile);
          setIsAuthenticated(true);
          setIsAuthOpen(false);
          const p = await progressService.getAllProgress(authProfile.uid);
          if (p) setProgress(p);

          // Si es la primera vez que ingresa y no tiene diagnóstico previo, lanzarlo
          if (!authProfile.hasCompletedInitialDiagnostic && authProfile.email !== ADMIN_AUTHORIZED_EMAIL) {
            setActiveEvaluationInstrument(INITIAL_COMPREHENSIVE_DIAGNOSTIC_INSTRUMENT);
          }
        }}
      />

      {view === 'profile' && (
        <ProfilePage
          user={user}
          onBack={() => setView('path')}
          onUpdate={(updated) => setUser(updated)}
          onOpenAuth={() => { setView('path'); setIsAuthOpen(true); }}
          onOpenAcademic={() => setView('academic')}
          onOpenDiagnostic={() => setActiveEvaluationInstrument(getInstrument(currentPath, 'diagnostic'))}
          onOpenFinalTest={() => setActiveEvaluationInstrument(getInstrument(currentPath, 'final'))}
          onSignOut={async () => {
            soundService.playToken();
            timeTrackingService.stopLessonTracking();
            await authService.signOutUser();
            setIsAuthenticated(false);
            setUser(DEFAULT_PROFILE);
            setProgress({});
            setView('path');
            setIsAuthOpen(true);
          }}
        />
      )}

      {/* SECCIÓN PRIVADA DE SEGUIMIENTO ACADÉMICO (SOLO ADMIN CON CONTRASEÑA HASH) */}
      {view === 'academic' && (
        <AcademicDashboard
          currentUser={user}
          onBack={() => setView('path')}
        />
      )}

      {/* MODAL DE EVALUACIÓN ESTANDARIZADA (DIAGNÓSTICO Y PRUEBA FINAL) */}
      {activeEvaluationInstrument && (
        <EvaluationModal
          isOpen={true}
          instrument={activeEvaluationInstrument}
          user={user}
          isMandatory={
            !user.hasCompletedInitialDiagnostic &&
            activeEvaluationInstrument.instrumentId === INITIAL_COMPREHENSIVE_DIAGNOSTIC_INSTRUMENT.instrumentId
          }
          onClose={() => setActiveEvaluationInstrument(null)}
          onComplete={async () => {
            setActiveEvaluationInstrument(null);
            const isInitial =
              activeEvaluationInstrument.instrumentId === INITIAL_COMPREHENSIVE_DIAGNOSTIC_INSTRUMENT.instrumentId;
            if (isInitial || !user.hasCompletedInitialDiagnostic) {
              const updatedUser: UserProfile = { ...user, hasCompletedInitialDiagnostic: true };
              setUser(updatedUser);
              await userService.updateProfile(updatedUser);
            }
            soundService.playWin();
            setGameAlert({
              isOpen: true,
              type: 'success',
              title: isInitial ? '¡Diagnóstico Inicial Completado!' : 'Evaluación Registrada',
              message: isInitial
                ? 'Tus conocimientos previos en Kotlin y SQL han sido registrados exitosamente. ¡Ya puedes comenzar a aprender en la aplicación!'
                : `Tu entrega para "${activeEvaluationInstrument.title}" ha sido registrada para el seguimiento académico.`,
              primaryButtonText: isInitial ? '¡A Aprender!' : 'Continuar',
              onPrimaryClick: () => setGameAlert(null)
            });
          }}
        />
      )}

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

      <DailyQuestsModal
        isOpen={isQuestsOpen}
        onClose={() => setIsQuestsOpen(false)}
        onRewardClaimed={async (xp, bytes, powerupKey) => {
          let updated = await userService.rewardUser(user, xp, bytes);
          if (powerupKey) {
            updated = await userService.grantPowerUps(updated, { [powerupKey]: 1 });
          }
          setUser(updated);
        }}
      />

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

      {/* Alertas Nativas del Juego (Reemplazo total de window.alert) */}
      <GameAlertModal alert={gameAlert} onClose={() => setGameAlert(null)} />

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
    </>
  );
}
