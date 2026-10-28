import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../types/user';
import {
  KotlinFile,
  KotlinRunResult,
  KotlinAutoCheckResult
} from '../../types/kotlinLab';
import {
  runKotlinCode,
  evaluateKotlinExercise,
  SUPPORTED_KOTLIN_VERSIONS,
  DEFAULT_KOTLIN_VERSION
} from '../../services/kotlinCompilerService';
import {
  KOTLIN_LAB_EXERCISES,
  DEFAULT_KOTLIN_SANDBOX_CODE,
  kotlinStorageService
} from '../../services/kotlinExerciseService';
import { soundService } from '../../services/soundService';

import { KotlinEditor } from './KotlinEditor';
import { KotlinConsole } from './KotlinConsole';
import { KotlinExercisePanel } from './KotlinExercisePanel';
import { KotlinAutoCheckModal } from './KotlinAutoCheckModal';

import {
  Play,
  Sparkles,
  ArrowLeft,
  Code2,
  Terminal,
  BookOpen,
  Cpu
} from 'lucide-react';

interface KotlinLabProps {
  user: UserProfile;
  initialExerciseId?: string | null;
  onBack: () => void;
}

export const KotlinLab: React.FC<KotlinLabProps> = ({
  user: _user,
  initialExerciseId = null,
  onBack
}) => {
  // Ejercicio seleccionado: 'sandbox' o id del ejercicio
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(
    initialExerciseId || 'sandbox'
  );

  const currentExercise =
    selectedExerciseId !== 'sandbox'
      ? KOTLIN_LAB_EXERCISES.find(e => e.id === selectedExerciseId) || null
      : null;

  // Versión de Kotlin seleccionada
  const [kotlinVersion, setKotlinVersion] = useState<string>(DEFAULT_KOTLIN_VERSION);

  // Archivos de código abiertos
  const [files, setFiles] = useState<KotlinFile[]>(() => {
    if (selectedExerciseId === 'sandbox') {
      const savedTabs = kotlinStorageService.getSavedTabs('sandbox');
      if (savedTabs && savedTabs.length > 0) return savedTabs;
      return [
        {
          id: 'main',
          name: 'Main.kt',
          content: DEFAULT_KOTLIN_SANDBOX_CODE
        }
      ];
    } else {
      const ex = KOTLIN_LAB_EXERCISES.find(e => e.id === selectedExerciseId);
      const savedCode = kotlinStorageService.getSavedCode(selectedExerciseId);
      return [
        {
          id: 'main',
          name: 'Main.kt',
          content: savedCode || (ex ? ex.initialCode : DEFAULT_KOTLIN_SANDBOX_CODE)
        }
      ];
    }
  });

  const [activeFileId, setActiveFileId] = useState<string>(files[0]?.id || 'main');
  const [cliArgs, setCliArgs] = useState<string>('');

  // Estado de ejecución y resultados
  const [isRunning, setIsRunning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [runResult, setRunResult] = useState<KotlinRunResult | null>(null);
  const [checkResult, setCheckResult] = useState<KotlinAutoCheckResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tab activo en vista móvil ('editor' | 'console' | 'exercise')
  const [mobileTab, setMobileTab] = useState<'editor' | 'console' | 'exercise'>('editor');

  // Guardar en localStorage cuando cambian los archivos
  useEffect(() => {
    if (selectedExerciseId === 'sandbox') {
      kotlinStorageService.saveTabs('sandbox', files);
    } else {
      const mainFile = files.find(f => f.id === 'main') || files[0];
      if (mainFile) {
        kotlinStorageService.saveCode(selectedExerciseId, mainFile.content);
      }
    }
  }, [files, selectedExerciseId]);

  // Al cambiar de ejercicio en el selector
  const handleSelectExercise = (exerciseId: string) => {
    soundService.playToken();
    setSelectedExerciseId(exerciseId);
    setRunResult(null);
    setCheckResult(null);

    if (exerciseId === 'sandbox') {
      const savedTabs = kotlinStorageService.getSavedTabs('sandbox');
      if (savedTabs && savedTabs.length > 0) {
        setFiles(savedTabs);
        setActiveFileId(savedTabs[0].id);
      } else {
        const initial = [
          {
            id: 'main',
            name: 'Main.kt',
            content: DEFAULT_KOTLIN_SANDBOX_CODE
          }
        ];
        setFiles(initial);
        setActiveFileId('main');
      }
      setCliArgs('');
    } else {
      const ex = KOTLIN_LAB_EXERCISES.find(e => e.id === exerciseId);
      if (!ex) return;
      const savedCode = kotlinStorageService.getSavedCode(exerciseId);
      const initial = [
        {
          id: 'main',
          name: 'Main.kt',
          content: savedCode || ex.initialCode
        }
      ];
      setFiles(initial);
      setActiveFileId('main');
      setCliArgs(ex.defaultArgs || '');
    }
  };

  // Manejo de tabs de archivos en el editor
  const handleAddFile = () => {
    const newIdx = files.length + 1;
    const newFile: KotlinFile = {
      id: `file_${Date.now()}`,
      name: `Archivo${newIdx}.kt`,
      content: `// Archivo adicional para paquetes y funciones auxiliares\n`
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newFile.id);
  };

  const handleCloseFile = (idToClose: string) => {
    if (files.length <= 1) return;
    const nextFiles = files.filter(f => f.id !== idToClose);
    setFiles(nextFiles);
    if (activeFileId === idToClose) {
      setActiveFileId(nextFiles[0].id);
    }
  };

  const handleContentChange = (content: string) => {
    setFiles(prev =>
      prev.map(f => (f.id === activeFileId ? { ...f, content } : f))
    );
  };

  // Reiniciar código
  const handleReset = () => {
    soundService.playToken();
    if (currentExercise) {
      setFiles([
        {
          id: 'main',
          name: 'Main.kt',
          content: currentExercise.initialCode
        }
      ]);
      setActiveFileId('main');
    } else {
      setFiles([
        {
          id: 'main',
          name: 'Main.kt',
          content: DEFAULT_KOTLIN_SANDBOX_CODE
        }
      ]);
      setActiveFileId('main');
    }
    setRunResult(null);
    setCheckResult(null);
  };

  // Cargar solución oficial (modo ejercicio)
  const handleShowSolution = () => {
    if (!currentExercise || !currentExercise.solutionCode) return;
    soundService.playToken();
    setFiles([
      {
        id: 'main',
        name: 'Main.kt',
        content: currentExercise.solutionCode
      }
    ]);
    setActiveFileId('main');
  };

  // Ejecución de código con compilador real
  const handleRun = async (): Promise<KotlinRunResult> => {
    if (isRunning) return null as any;
    setIsRunning(true);
    soundService.playToken();

    try {
      const res = await runKotlinCode(files, cliArgs, kotlinVersion);
      setRunResult(res);
      if (res.success) {
        soundService.playCorrect();
      } else {
        soundService.playError();
      }
      return res;
    } catch (err: any) {
      const failResult: KotlinRunResult = {
        output: '',
        rawText: '',
        errors: [
          {
            fileName: 'Main.kt',
            line: 1,
            column: 1,
            message: err.message || 'Error de conexión con el compilador de Kotlin.',
            severity: 'ERROR'
          }
        ],
        exception: null,
        executionTimeMs: 0,
        success: false,
        compilerVersion: kotlinVersion
      };
      setRunResult(failResult);
      soundService.playError();
      return failResult;
    } finally {
      setIsRunning(false);
    }
  };

  // Verificación de ejercicio
  const handleVerify = async () => {
    if (!currentExercise || isVerifying) return;
    setIsVerifying(true);
    soundService.playToken();

    try {
      // 1. Ejecutar código primero para obtener el resultado más reciente
      const execResult = await handleRun();

      // 2. Evaluar reglas del ejercicio
      const mainContent = files.find(f => f.id === 'main')?.content || files[0]?.content || '';
      const evalResult = evaluateKotlinExercise(mainContent, currentExercise, execResult);
      setCheckResult(evalResult);
      setIsModalOpen(true);

      if (evalResult.passed) {
        soundService.playWin();
      } else {
        soundService.playError();
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // Avanzar al siguiente reto
  const handleNextExercise = () => {
    if (!currentExercise) return;
    const currentIndex = KOTLIN_LAB_EXERCISES.findIndex(e => e.id === currentExercise.id);
    if (currentIndex >= 0 && currentIndex < KOTLIN_LAB_EXERCISES.length - 1) {
      const nextEx = KOTLIN_LAB_EXERCISES[currentIndex + 1];
      handleSelectExercise(nextEx.id);
    }
  };

  return (
    <div className="kt-lab-container">
      {/* ═══ BARRA SUPERIOR (HEADER NEO-BRUTALIST KOTLIN PLAYGROUND) ═══ */}
      <header className="kt-topbar">
        <div className="kt-topbar-left">
          {/* Botón Volver */}
          <button
            type="button"
            onClick={onBack}
            className="kt-back-btn"
            title="Volver a la ruta de aprendizaje"
          >
            <ArrowLeft size={16} />
            <span>Volver</span>
          </button>

          {/* Logo y Marca */}
          <div className="kt-brand">
            <div className="kt-brand-icon">
              <Code2 size={20} strokeWidth={2.6} />
            </div>
            <div className="kt-brand-info">
              <div className="flex items-center gap-2">
                <h1 className="kt-brand-title">Kotlin Lab</h1>
                <span className="kt-badge-engine">Playground Real JVM</span>
              </div>
              <span className="kt-brand-subtitle">Compilador Oficial de JetBrains</span>
            </div>
          </div>

          {/* Selector de Ejercicio / Modo Libre */}
          <div className="kt-exercise-selector-wrapper">
            <select
              className="kt-exercise-select"
              value={selectedExerciseId}
              onChange={e => handleSelectExercise(e.target.value)}
            >
              <option value="sandbox">🚀 Modo Libre / Playground (Sandbox)</option>
              <optgroup label="── Retos Guiados por Unidad ──">
                {KOTLIN_LAB_EXERCISES.map(ex => (
                  <option key={ex.id} value={ex.id}>
                    {ex.title}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Acciones del Topbar (Selector de Versión + Botón Ejecutar + Verificar) */}
        <div className="kt-topbar-actions">
          {/* Selector de versión de Kotlin */}
          <div className="kt-version-wrapper" title="Versión del compilador de Kotlin">
            <Cpu size={14} className="text-purple-600" />
            <select
              className="kt-version-select"
              value={kotlinVersion}
              onChange={e => setKotlinVersion(e.target.value)}
            >
              {SUPPORTED_KOTLIN_VERSIONS.map(ver => (
                <option key={ver.id} value={ver.id}>
                  {ver.label}
                </option>
              ))}
            </select>
          </div>

          {/* Botón Verificar (Solo en modo ejercicio) */}
          {currentExercise && (
            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying || isRunning}
              className="kt-btn-verify-header"
              title="Evaluar requisitos de este reto"
            >
              <Sparkles size={16} />
              <span>{isVerifying ? 'Verificando...' : 'Verificar'}</span>
            </button>
          )}

          {/* Botón Principal: Ejecutar (Ctrl + Enter) */}
          <button
            type="button"
            onClick={() => handleRun()}
            disabled={isRunning}
            className="kt-btn-run"
            title="Compilar y ejecutar código (Ctrl + Enter)"
          >
            <Play size={16} fill="currentColor" />
            <span>{isRunning ? 'Compilando...' : 'Ejecutar'}</span>
          </button>
        </div>
      </header>

      {/* ═══ SELECTOR DE PESTAÑAS PARA MÓVIL ═══ */}
      <div className="kt-mobile-tabs">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`kt-mobile-tab-btn ${mobileTab === 'editor' ? 'active' : ''}`}
        >
          <Code2 size={15} />
          <span>Editor</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('console')}
          className={`kt-mobile-tab-btn ${mobileTab === 'console' ? 'active' : ''}`}
        >
          <Terminal size={15} />
          <span>Consola</span>
          {runResult && (
            <span
              className={`kt-mobile-dot ${runResult.success ? 'success' : 'error'}`}
            />
          )}
        </button>
        {currentExercise && (
          <button
            type="button"
            onClick={() => setMobileTab('exercise')}
            className={`kt-mobile-tab-btn ${mobileTab === 'exercise' ? 'active' : ''}`}
          >
            <BookOpen size={15} />
            <span>Reto</span>
          </button>
        )}
      </div>

      {/* ═══ ESPACIO DE TRABAJO PRINCIPAL (SPLIT LAYOUT) ═══ */}
      <main
        className={`kt-workspace ${
          currentExercise ? 'with-exercise-panel' : 'sandbox-layout'
        }`}
      >
        {/* Panel Izquierdo: Ejercicio Guiado (si está activo) */}
        {currentExercise && (
          <div
            className={`kt-workspace-left-col ${
              mobileTab === 'exercise' ? 'mobile-visible' : 'mobile-hidden'
            }`}
          >
            <KotlinExercisePanel
              exercise={currentExercise}
              onVerify={handleVerify}
              isVerifying={isVerifying}
              lastCheckResult={checkResult}
              onShowSolution={handleShowSolution}
            />
          </div>
        )}

        {/* Panel Central/Derecho: Editor y Consola */}
        <div
          className={`kt-workspace-main-col ${
            mobileTab === 'editor' || mobileTab === 'console'
              ? 'mobile-visible'
              : 'mobile-hidden'
          }`}
        >
          {/* Editor de Código */}
          <div
            className={`kt-workspace-editor-row ${
              mobileTab === 'editor' ? 'mobile-row-visible' : 'mobile-row-hidden'
            }`}
          >
            <KotlinEditor
              files={files}
              activeFileId={activeFileId}
              onSelectFile={setActiveFileId}
              onAddFile={handleAddFile}
              onCloseFile={handleCloseFile}
              onContentChange={handleContentChange}
              onRun={() => handleRun()}
              onReset={handleReset}
              isRunning={isRunning}
              errors={runResult?.errors || []}
              allowMultipleFiles={selectedExerciseId === 'sandbox'}
            />
          </div>

          {/* Consola de Salida */}
          <div
            className={`kt-workspace-console-row ${
              mobileTab === 'console' ? 'mobile-row-visible' : 'mobile-row-hidden'
            }`}
          >
            <KotlinConsole
              result={runResult}
              isRunning={isRunning}
              args={cliArgs}
              onArgsChange={setCliArgs}
              onClear={() => setRunResult(null)}
            />
          </div>
        </div>
      </main>

      {/* ═══ MODAL DE EVALUACIÓN AUTO-CHECK ═══ */}
      {currentExercise && (
        <KotlinAutoCheckModal
          isOpen={isModalOpen}
          result={checkResult}
          exerciseTitle={currentExercise.title}
          onClose={() => setIsModalOpen(false)}
          onNextExercise={handleNextExercise}
          onRetry={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
