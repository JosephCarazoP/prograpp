import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../../types/user';
import {
  KotlinFile,
  KotlinRunResult,
  KotlinAutoCheckResult,
  UserKotlinProject
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
import { kotlinCloudSyncService } from '../../services/kotlinCloudSyncService';
import { soundService } from '../../services/soundService';

import { KotlinEditor } from './KotlinEditor';
import { KotlinConsole } from './KotlinConsole';
import { KotlinExercisePanel } from './KotlinExercisePanel';
import { KotlinAutoCheckModal } from './KotlinAutoCheckModal';
import { NewProjectModal } from './NewProjectModal';

import {
  Play,
  ArrowLeft,
  Code2,
  Terminal,
  BookOpen,
  Cpu,
  ChevronDown,
  Check,
  Plus,
  Trash2,
  Undo2,
  Cloud,
  Upload,
  Download,
  Loader2,
  FileCode2,
  FolderCode
} from 'lucide-react';

interface KotlinLabProps {
  user: UserProfile;
  initialExerciseId?: string | null;
  onBack: () => void;
}

const PROJECT_TEMPLATES: Record<'empty' | 'oop' | 'collections', string> = {
  empty: DEFAULT_KOTLIN_SANDBOX_CODE,
  oop: `// Programación Orientada a Objetos en Kotlin

data class Usuario(
    val id: Int,
    val nombre: String,
    val activo: Boolean = true
)

interface Servicio {
    fun ejecutar()
}

class MiServicio(val usuario: Usuario) : Servicio {
    override fun ejecutar() {
        println("Servicio iniciado para: \${usuario.nombre}")
    }
}

fun main() {
    val user = Usuario(1, "Estudiante")
    val service = MiServicio(user)
    service.ejecutar()
}`,
  collections: `// Colecciones y Programación Funcional en Kotlin

fun main() {
    val numeros = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    
    val paresMultiplicados = numeros
        .filter { it % 2 == 0 }
        .map { it * 10 }
        
    println("Pares multiplicados por 10: $paresMultiplicados")
    println("Suma total: \${paresMultiplicados.sum()}")
}`
};

export const KotlinLab: React.FC<KotlinLabProps> = ({
  user: _user,
  initialExerciseId = null,
  onBack
}) => {
  // Proyectos del usuario
  const [userProjects, setUserProjects] = useState<UserKotlinProject[]>(() => {
    try {
      const raw = localStorage.getItem('prograpp_kotlin_user_projects');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Error cargando proyectos locales de Kotlin:', e);
    }
    return [
      {
        id: 'default',
        name: 'Proyecto Principal',
        files: [
          {
            id: 'main',
            name: 'Main.kt',
            content: DEFAULT_KOTLIN_SANDBOX_CODE
          }
        ],
        createdAt: Date.now()
      }
    ];
  });

  const [activeProjectId, setActiveProjectId] = useState<string>('default');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

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

  // Pila de deshacer por archivo
  const [undoStack, setUndoStack] = useState<Record<string, string[]>>({});

  // Sincronización en la Nube
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'dirty'>('synced');
  const [cloudNotice, setCloudNotice] = useState<string | null>(null);

  // Clave de almacenamiento actual
  const currentStorageKey = selectedExerciseId === 'sandbox'
    ? `proj_${activeProjectId}`
    : `ex_${selectedExerciseId}`;

  const currentProjectName = selectedExerciseId === 'sandbox'
    ? userProjects.find(p => p.id === activeProjectId)?.name || 'Proyecto Principal'
    : currentExercise?.title || 'Ejercicio Kotlin';

  // Estado de ejecución y resultados
  const [isRunning, setIsRunning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [runResult, setRunResult] = useState<KotlinRunResult | null>(null);
  const [checkResult, setCheckResult] = useState<KotlinAutoCheckResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Tab activo en vista móvil ('editor' | 'console' | 'exercise')
  const [mobileTab, setMobileTab] = useState<'editor' | 'console' | 'exercise'>('editor');

  // Estados de dropdowns Neo-Brutalistas
  const [isExerciseDropdownOpen, setIsExerciseDropdownOpen] = useState(false);
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  const exerciseDropdownRef = useRef<HTMLDivElement>(null);
  const versionDropdownRef = useRef<HTMLDivElement>(null);
  const exportDropdownRef = useRef<HTMLDivElement>(null);
  const universalFileInputRef = useRef<HTMLInputElement>(null);

  // Cerrar dropdowns al hacer clic fuera o presionar Escape
  useEffect(() => {
    if (!isExerciseDropdownOpen && !isVersionDropdownOpen && !isExportDropdownOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (exerciseDropdownRef.current && !exerciseDropdownRef.current.contains(target)) {
        setIsExerciseDropdownOpen(false);
      }
      if (versionDropdownRef.current && !versionDropdownRef.current.contains(target)) {
        setIsVersionDropdownOpen(false);
      }
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(target)) {
        setIsExportDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsExerciseDropdownOpen(false);
        setIsVersionDropdownOpen(false);
        setIsExportDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExerciseDropdownOpen, isVersionDropdownOpen, isExportDropdownOpen]);

  // Guardar en localStorage cuando cambian los archivos
  useEffect(() => {
    if (selectedExerciseId === 'sandbox') {
      kotlinStorageService.saveTabs('sandbox', files);
      // Actualizar también en el proyecto activo
      setUserProjects(prev => {
        const updated = prev.map(p =>
          p.id === activeProjectId ? { ...p, files, updatedAt: Date.now() } : p
        );
        try {
          localStorage.setItem('prograpp_kotlin_user_projects', JSON.stringify(updated));
        } catch (e) {
          console.warn('Error guardando proyectos en localStorage:', e);
        }
        return updated;
      });
    } else {
      const mainFile = files.find(f => f.id === 'main') || files[0];
      if (mainFile) {
        kotlinStorageService.saveCode(selectedExerciseId, mainFile.content);
      }
    }
  }, [files, selectedExerciseId, activeProjectId]);

  // Cargar proyectos de la nube si el usuario está conectado
  useEffect(() => {
    if (!_user?.uid || _user.uid === 'guest') return;

    async function loadCloudProjects() {
      try {
        const cloudProjects = await kotlinCloudSyncService.loadUserProjectsList(_user.uid);
        if (cloudProjects && cloudProjects.length > 0) {
          setUserProjects(prev => {
            const map = new Map<string, UserKotlinProject>();
            prev.forEach(p => map.set(p.id, p));
            cloudProjects.forEach(cp => map.set(cp.id, cp));
            const merged = Array.from(map.values());
            localStorage.setItem('prograpp_kotlin_user_projects', JSON.stringify(merged));
            return merged;
          });
        }
      } catch (e) {
        console.warn('Error cargando proyectos de la nube:', e);
      }
    }

    loadCloudProjects();
  }, [_user?.uid]);

  // Al cambiar de ejercicio o proyecto en el selector
  const handleSelectExercise = (exerciseId: string) => {
    soundService.playToken();
    setSelectedExerciseId(exerciseId);
    setRunResult(null);
    setCheckResult(null);

    if (exerciseId === 'sandbox') {
      const curProj = userProjects.find(p => p.id === activeProjectId) || userProjects[0];
      if (curProj && curProj.files && curProj.files.length > 0) {
        setFiles(curProj.files);
        setActiveFileId(curProj.files[0].id);
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
    setSyncStatus(kotlinCloudSyncService.isDirty(exerciseId === 'sandbox' ? `proj_${activeProjectId}` : `ex_${exerciseId}`) ? 'dirty' : 'synced');
  };

  // Manejo de tabs de archivos en el editor
  const handleAddFile = () => {
    soundService.playToken();
    const newIdx = files.length + 1;
    const newFile: KotlinFile = {
      id: `file_${Date.now()}`,
      name: `Archivo${newIdx}.kt`,
      content: `// Archivo adicional para paquetes y funciones auxiliares\n`
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newFile.id);
    setSyncStatus('dirty');
    kotlinCloudSyncService.markDirty(currentStorageKey);
  };

  const handleCloseFile = (idToClose: string) => {
    if (files.length <= 1) return;
    soundService.playToken();
    const nextFiles = files.filter(f => f.id !== idToClose);
    setFiles(nextFiles);
    if (activeFileId === idToClose) {
      setActiveFileId(nextFiles[0].id);
    }
    setSyncStatus('dirty');
    kotlinCloudSyncService.markDirty(currentStorageKey);
  };

  const handleContentChange = (content: string) => {
    const curFile = files.find(f => f.id === activeFileId);
    if (curFile && curFile.content !== content) {
      // Registrar en historial de deshacer
      setUndoStack(prev => {
        const curStack = prev[activeFileId] || [];
        return {
          ...prev,
          [activeFileId]: [...curStack.slice(-25), curFile.content]
        };
      });
      setSyncStatus('dirty');
      kotlinCloudSyncService.markDirty(currentStorageKey);
    }

    setFiles(prev =>
      prev.map(f => (f.id === activeFileId ? { ...f, content } : f))
    );
  };

  // Deshacer último cambio de código
  const handleUndo = () => {
    const stack = undoStack[activeFileId];
    if (!stack || stack.length === 0) return;
    soundService.playToken();
    const previousCode = stack[stack.length - 1];
    setUndoStack(prev => ({
      ...prev,
      [activeFileId]: stack.slice(0, -1)
    }));
    setFiles(prev =>
      prev.map(f => (f.id === activeFileId ? { ...f, content: previousCode } : f))
    );
    setSyncStatus('dirty');
    kotlinCloudSyncService.markDirty(currentStorageKey);
  };

  // Sincronizar en la Nube
  const doSyncToCloud = async (isManual: boolean = false) => {
    if (!_user?.uid || _user.uid === 'guest' || syncStatus === 'syncing') {
      if (isManual) {
        soundService.playToken();
        setCloudNotice('Inicia sesión en PrograApp para sincronizar tus proyectos en la nube.');
        setTimeout(() => setCloudNotice(null), 4000);
      }
      return;
    }

    setSyncStatus('syncing');
    try {
      const res = await kotlinCloudSyncService.syncToCloud(_user.uid, currentStorageKey, {
        projectName: currentProjectName,
        files,
        version: kotlinVersion
      });

      if (res.success) {
        setSyncStatus('synced');
        if (isManual) {
          soundService.playToken();
          setCloudNotice('Código y proyecto guardados en tu cuenta en la nube');
          setTimeout(() => setCloudNotice(null), 3500);
        }
      } else {
        setSyncStatus('dirty');
        if (isManual) {
          setCloudNotice(`No se pudo sincronizar: ${res.error || 'Error de red'}`);
          setTimeout(() => setCloudNotice(null), 4000);
        }
      }
    } catch (e) {
      console.warn('Error sincronizando proyecto Kotlin:', e);
      setSyncStatus('dirty');
    }
  };

  // Crear nuevo proyecto
  const handleCreateNewProject = (projectName: string, templateType: 'empty' | 'oop' | 'collections') => {
    const newId = `proj_${Date.now()}`;
    const initialCode = PROJECT_TEMPLATES[templateType] || PROJECT_TEMPLATES.empty;
    const newProject: UserKotlinProject = {
      id: newId,
      name: projectName,
      files: [
        {
          id: 'main',
          name: 'Main.kt',
          content: initialCode
        }
      ],
      createdAt: Date.now()
    };

    const updated = [...userProjects, newProject];
    setUserProjects(updated);
    try {
      localStorage.setItem('prograpp_kotlin_user_projects', JSON.stringify(updated));
    } catch (e) {
      console.warn('Error guardando proyectos en localStorage:', e);
    }

    setSelectedExerciseId('sandbox');
    setActiveProjectId(newId);
    setFiles(newProject.files);
    setActiveFileId('main');
    setRunResult(null);
    setCheckResult(null);
    setSyncStatus('dirty');
    kotlinCloudSyncService.markDirty(`proj_${newId}`);

    if (_user?.uid && _user.uid !== 'guest') {
      kotlinCloudSyncService.syncUserProjectsList(_user.uid, updated);
      kotlinCloudSyncService.syncToCloud(_user.uid, `proj_${newId}`, {
        projectName,
        files: newProject.files,
        version: kotlinVersion
      });
    }
  };

  // Eliminar proyecto personalizado
  const handleDeleteProject = (projectId: string) => {
    if (projectId === 'default') return;
    if (!window.confirm('¿Seguro que deseas eliminar este proyecto de Kotlin?')) return;
    soundService.playToken();

    const updated = userProjects.filter(p => p.id !== projectId);
    setUserProjects(updated);
    try {
      localStorage.setItem('prograpp_kotlin_user_projects', JSON.stringify(updated));
    } catch (e) {
      console.warn('Error guardando proyectos en localStorage:', e);
    }

    const defaultProj = updated.find(p => p.id === 'default') || updated[0];
    setActiveProjectId(defaultProj.id);
    setFiles(defaultProj.files);
    setActiveFileId(defaultProj.files[0]?.id || 'main');

    if (_user?.uid && _user.uid !== 'guest') {
      kotlinCloudSyncService.deleteFromCloud(_user.uid, `proj_${projectId}`);
      kotlinCloudSyncService.syncUserProjectsList(_user.uid, updated);
    }
  };

  // Importar archivo
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (typeof content === 'string') {
        soundService.playToken();
        const cleanName = file.name.endsWith('.kt') ? file.name : `${file.name.split('.')[0]}.kt`;

        const isDefaultEmpty = files.length === 1 && files[0].content === DEFAULT_KOTLIN_SANDBOX_CODE;
        if (isDefaultEmpty) {
          setFiles([{ id: 'main', name: cleanName, content }]);
          setActiveFileId('main');
        } else {
          const newId = `file_${Date.now()}`;
          setFiles(prev => [...prev, { id: newId, name: cleanName, content }]);
          setActiveFileId(newId);
        }
        setSyncStatus('dirty');
        kotlinCloudSyncService.markDirty(currentStorageKey);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Exportar archivo activo
  const handleExportCurrentFile = () => {
    soundService.playToken();
    const curFile = files.find(f => f.id === activeFileId) || files[0];
    if (!curFile) return;

    const blob = new Blob([curFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = curFile.name || 'Main.kt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Exportar proyecto completo combinado
  const handleExportAllFiles = () => {
    soundService.playToken();
    const combined = files
      .map(
        f =>
          `// ==========================================\n// Archivo: ${f.name}\n// ==========================================\n${f.content}\n`
      )
      .join('\n\n');

    const blob = new Blob([combined], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProjectName.replace(/[^a-zA-Z0-9_-]/g, '_')}_kotlin.kt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Confirmar restablecimiento
  const handleResetConfirm = () => {
    soundService.playToken();
    setIsResetConfirmOpen(false);

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
    setSyncStatus('dirty');
    kotlinCloudSyncService.markDirty(currentStorageKey);
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
    setSyncStatus('dirty');
    kotlinCloudSyncService.markDirty(currentStorageKey);
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
      const execResult = await handleRun();
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
      {/* ═══ BARRA SUPERIOR (HEADER EXACTO AL DE LAB SQLITE) ═══ */}
      <header className="kt-topbar">
        {/* Izquierda: Volver + Brand + Selector de Proyecto + Nuevo Proyecto + Versión */}
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
              <Code2 size={17} />
            </div>
            <h1 className="kt-brand-title">Kotlin Lab</h1>
          </div>

          {/* Selector de Proyecto y Retos Neo-Brutalism */}
          <div className="kt-neo-dropdown-wrapper" ref={exerciseDropdownRef}>
            <button
              type="button"
              className="kt-neo-dropdown-btn"
              onClick={() => {
                soundService.playToken();
                setIsExerciseDropdownOpen(prev => !prev);
                setIsVersionDropdownOpen(false);
                setIsExportDropdownOpen(false);
              }}
              style={{
                backgroundColor: isExerciseDropdownOpen ? '#FEF9C3' : undefined
              }}
              title="Seleccionar Proyecto o Reto Guiado"
              aria-expanded={isExerciseDropdownOpen}
              aria-haspopup="true"
            >
              <div className="kt-neo-dropdown-btn-left">
                {selectedExerciseId === 'sandbox' ? (
                  <Code2 size={14} className="text-purple-600 flex-shrink-0" />
                ) : (
                  <BookOpen size={14} className="text-amber-600 flex-shrink-0" />
                )}
                <span className="kt-neo-dropdown-title">
                  {selectedExerciseId === 'sandbox'
                    ? userProjects.find(p => p.id === activeProjectId)?.name || 'Proyecto Principal'
                    : currentExercise?.title}
                </span>
              </div>
              <ChevronDown
                size={13}
                className="kt-neo-dropdown-chevron"
                style={{
                  transform: isExerciseDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.15s ease'
                }}
              />
            </button>

            {isExerciseDropdownOpen && (
              <div className="kt-neo-dropdown-menu">
                {/* Sección Proyectos */}
                <div className="kt-neo-dropdown-header">
                  <div className="flex items-center gap-1.5">
                    <Code2 size={12} className="text-slate-600" />
                    <span>PROYECTOS</span>
                  </div>
                  <span className="kt-neo-dropdown-count">
                    {userProjects.length}
                  </span>
                </div>

                {userProjects.map(proj => {
                  const isSelected = selectedExerciseId === 'sandbox' && activeProjectId === proj.id;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      className="kt-neo-dropdown-item"
                      onClick={() => {
                        soundService.playToken();
                        setSelectedExerciseId('sandbox');
                        setActiveProjectId(proj.id);
                        setFiles(proj.files);
                        setActiveFileId(proj.files[0]?.id || 'main');
                        setIsExerciseDropdownOpen(false);
                      }}
                      style={{
                        backgroundColor: isSelected ? '#FEF9C3' : undefined,
                        fontWeight: isSelected ? 900 : 700
                      }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Code2
                          size={13}
                          className={isSelected ? 'text-purple-600 flex-shrink-0' : 'text-slate-400 flex-shrink-0'}
                        />
                        <span className="truncate">{proj.name}</span>
                      </div>
                      {isSelected && (
                        <Check size={13} className="text-purple-600" strokeWidth={2.6} />
                      )}
                    </button>
                  );
                })}

                {/* Sección Retos Guiados */}
                <div className="kt-neo-dropdown-header section-divider">
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={12} className="text-slate-600" />
                    <span>RETOS GUIADOS</span>
                  </div>
                  <span className="kt-neo-dropdown-count">
                    {KOTLIN_LAB_EXERCISES.length}
                  </span>
                </div>

                {KOTLIN_LAB_EXERCISES.map(ex => {
                  const isSelected = selectedExerciseId === ex.id;
                  return (
                    <button
                      key={ex.id}
                      type="button"
                      className="kt-neo-dropdown-item"
                      onClick={() => {
                        handleSelectExercise(ex.id);
                        setIsExerciseDropdownOpen(false);
                      }}
                      style={{
                        backgroundColor: isSelected ? '#FEF9C3' : undefined,
                        fontWeight: isSelected ? 900 : 700
                      }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <BookOpen
                          size={13}
                          className={isSelected ? 'text-purple-600 flex-shrink-0' : 'text-slate-400 flex-shrink-0'}
                        />
                        <span className="truncate">{ex.title}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`kt-diff-pill ${ex.difficulty}`}>
                          {ex.difficulty === 'easy' ? 'Facil' : ex.difficulty === 'medium' ? 'Medio' : 'Desafio'}
                        </span>
                        {isSelected && (
                          <Check size={13} className="text-purple-600" strokeWidth={2.6} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Botón Nuevo Proyecto (Igual a Nueva BD en SQLite) */}
          <button
            type="button"
            className="kt-btn-util kt-new-project-btn"
            onClick={() => setIsNewProjectModalOpen(true)}
            title="Crear un nuevo proyecto de Kotlin"
          >
            <Plus size={14} />
            <span className="sqlite-btn-label-desktop">Nuevo Proyecto</span>
            <span className="sqlite-btn-label-mobile">Nuevo</span>
          </button>

          {/* Botón para eliminar proyecto personalizado si no es default */}
          {selectedExerciseId === 'sandbox' && activeProjectId !== 'default' && (
            <button
              type="button"
              className="sqlite-sidebar-icon-btn"
              onClick={() => handleDeleteProject(activeProjectId)}
              title="Eliminar este proyecto"
              style={{
                color: '#EF4444',
                padding: '6px 8px',
                borderRadius: 8,
                border: '1.5px solid #000000',
                background: '#FEE2E2',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Trash2 size={13} />
            </button>
          )}

          {/* Selector de versión de compilador */}
          <div className="kt-neo-dropdown-wrapper" ref={versionDropdownRef} title="Versión del compilador de Kotlin">
            <button
              type="button"
              className="kt-neo-dropdown-btn"
              onClick={() => {
                soundService.playToken();
                setIsVersionDropdownOpen(prev => !prev);
                setIsExerciseDropdownOpen(false);
                setIsExportDropdownOpen(false);
              }}
              style={{
                backgroundColor: isVersionDropdownOpen ? '#FEF9C3' : undefined
              }}
              aria-expanded={isVersionDropdownOpen}
              aria-haspopup="true"
            >
              <div className="kt-neo-dropdown-btn-left">
                <Cpu size={14} className="text-slate-600 flex-shrink-0" />
                <span className="kt-neo-dropdown-title">
                  {SUPPORTED_KOTLIN_VERSIONS.find(v => v.id === kotlinVersion)?.label || `Kotlin ${kotlinVersion}`}
                </span>
              </div>
              <ChevronDown
                size={13}
                className="kt-neo-dropdown-chevron"
                style={{
                  transform: isVersionDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.15s ease'
                }}
              />
            </button>

            {isVersionDropdownOpen && (
              <div className="kt-neo-dropdown-menu version-menu">
                <div className="kt-neo-dropdown-header">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-slate-600" />
                    <span>COMPILADOR KOTLIN</span>
                  </div>
                </div>

                {SUPPORTED_KOTLIN_VERSIONS.map(ver => {
                  const isSelected = kotlinVersion === ver.id;
                  return (
                    <button
                      key={ver.id}
                      type="button"
                      className="kt-neo-dropdown-item"
                      onClick={() => {
                        soundService.playToken();
                        setKotlinVersion(ver.id);
                        setIsVersionDropdownOpen(false);
                      }}
                      style={{
                        backgroundColor: isSelected ? '#FEF9C3' : undefined,
                        fontWeight: isSelected ? 900 : 700
                      }}
                    >
                      <span>{ver.label}</span>
                      {isSelected && (
                        <Check size={14} className="text-purple-600 flex-shrink-0" strokeWidth={2.6} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Derecha: Ejecutar, Deshacer, Nube, Importar, Exportar, Reset */}
        <div className="kt-topbar-actions">
          {/* Botón Ejecutar (Igual a SQLite pero en tono morado) */}
          <button
            type="button"
            onClick={() => handleRun()}
            disabled={isRunning}
            className="kt-btn-run"
            title="Compilar y ejecutar código (Ctrl + Enter)"
          >
            <Play size={14} fill="currentColor" />
            <span>{isRunning ? 'Compilando...' : 'Ejecutar'}</span>
            <span className="kt-key-badge">Ctrl ↵</span>
          </button>

          {/* Botón Deshacer */}
          <button
            type="button"
            className="kt-btn-util"
            onClick={handleUndo}
            disabled={!undoStack[activeFileId] || undoStack[activeFileId].length === 0}
            title="Deshacer último cambio de código"
          >
            <Undo2 size={14} />
            <span>Deshacer</span>
          </button>

          {/* Botón Nube */}
          <button
            type="button"
            className={`kt-btn-util ${
              syncStatus === 'dirty'
                ? 'kt-btn-cloud-dirty'
                : syncStatus === 'synced'
                ? 'kt-btn-cloud-synced'
                : ''
            }`}
            onClick={() => doSyncToCloud(true)}
            disabled={syncStatus === 'syncing' || !_user?.uid || _user.uid === 'guest'}
            title={
              syncStatus === 'syncing'
                ? 'Sincronizando con tu cuenta en la nube...'
                : syncStatus === 'dirty'
                ? 'Tienes cambios pendientes de sincronizar en tu cuenta. Haz clic para guardar ahora.'
                : 'Código y proyectos sincronizados en la nube'
            }
          >
            {syncStatus === 'syncing' ? (
              <Loader2 size={14} className="animate-spin text-purple-600" />
            ) : (
              <Cloud
                size={14}
                className={syncStatus === 'dirty' ? 'text-amber-600' : 'text-emerald-600'}
              />
            )}
            <span>
              {syncStatus === 'syncing'
                ? 'Guardando...'
                : syncStatus === 'dirty'
                ? 'Guardar'
                : 'Al día'}
            </span>
          </button>

          {/* Input de archivo universal oculto */}
          <input
            ref={universalFileInputRef}
            type="file"
            accept=".kt,.kts,.txt,.java"
            style={{ display: 'none' }}
            onChange={handleImportFile}
          />

          {/* Botón Importar */}
          <button
            type="button"
            className="kt-btn-util"
            onClick={() => universalFileInputRef.current?.click()}
            title="Importar archivo .kt de código fuente"
          >
            <Upload size={14} />
            <span>Importar</span>
          </button>

          {/* Botón Unificado Exportar con Dropdown */}
          <div
            className="kt-neo-dropdown-wrapper"
            ref={exportDropdownRef}
            style={{ position: 'relative', display: 'inline-flex' }}
          >
            <button
              type="button"
              className="kt-btn-util"
              onClick={() => {
                soundService.playToken();
                setIsExportDropdownOpen(prev => !prev);
                setIsExerciseDropdownOpen(false);
                setIsVersionDropdownOpen(false);
              }}
              title="Opciones de exportación de código Kotlin"
              style={{
                backgroundColor: isExportDropdownOpen ? '#FEF9C3' : undefined
              }}
              aria-expanded={isExportDropdownOpen}
              aria-haspopup="true"
            >
              <Download size={14} />
              <span>Exportar</span>
              <ChevronDown
                size={13}
                style={{
                  transform: isExportDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.15s ease'
                }}
              />
            </button>

            {isExportDropdownOpen && (
              <div
                className="kt-neo-dropdown-menu"
                style={{
                  minWidth: 230,
                  marginTop: 6,
                  right: 0,
                  left: 'auto',
                  borderRadius: 10,
                  boxShadow: '4px 4px 0px #000000',
                  border: '2px solid #000000',
                  padding: 0,
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  zIndex: 9999
                }}
              >
                <div className="kt-neo-dropdown-header">
                  <div className="flex items-center gap-1.5">
                    <Download size={12} className="text-slate-600" />
                    <span>FORMATOS DE EXPORTACIÓN</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="kt-neo-dropdown-item"
                  onClick={() => {
                    handleExportCurrentFile();
                    setIsExportDropdownOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                    padding: '10px 12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontWeight: 900, color: '#0F172A', fontSize: '0.8rem' }}>
                    <FileCode2 size={14} className="text-purple-600" />
                    <span>Exportar {files.find(f => f.id === activeFileId)?.name || 'Main.kt'}</span>
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600, paddingLeft: 21 }}>
                    Descargar archivo de código activo
                  </span>
                </button>

                <button
                  type="button"
                  className="kt-neo-dropdown-item"
                  onClick={() => {
                    handleExportAllFiles();
                    setIsExportDropdownOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                    padding: '10px 12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontWeight: 900, color: '#0F172A', fontSize: '0.8rem' }}>
                    <FolderCode size={14} className="text-emerald-600" />
                    <span>Exportar Todo el Proyecto</span>
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600, paddingLeft: 21 }}>
                    Todos los archivos del proyecto combinados
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Botón Reset */}
          <button
            type="button"
            className="kt-btn-reset"
            onClick={() => setIsResetConfirmOpen(true)}
            title="Restablecer código al estado inicial"
          >
            <Trash2 size={14} />
            <span>Reset</span>
          </button>

          {/* Botón Verificar (Solo en modo ejercicio) */}
          {currentExercise && (
            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying || isRunning}
              className="kt-btn-verify-header"
              title="Evaluar requisitos de este reto"
            >
              <span>{isVerifying ? 'Verificando...' : 'Verificar'}</span>
            </button>
          )}
        </div>
      </header>

      {/* ═══ BANNER DE NOTIFICACIÓN DE NUBE ═══ */}
      {cloudNotice && (
        <div
          style={{
            background: '#EFF6FF',
            border: '2px solid #000000',
            boxShadow: '3px 3px 0px #000000',
            borderRadius: 10,
            padding: '10px 14px',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#1E3A8A',
            fontWeight: 800
          }}
        >
          <Cloud size={18} className="text-blue-600 flex-shrink-0" />
          <span>{cloudNotice}</span>
        </div>
      )}

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
              onReset={() => setIsResetConfirmOpen(true)}
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

      {/* ═══ MODAL CREAR NUEVO PROYECTO ═══ */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreate={handleCreateNewProject}
      />

      {/* ═══ MODAL DE CONFIRMACIÓN DE RESTABLECIMIENTO ═══ */}
      {isResetConfirmOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setIsResetConfirmOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              border: '2px solid #000000',
              boxShadow: '5px 5px 0px #000000',
              borderRadius: 14,
              width: '100%',
              maxWidth: 420,
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: '14px 18px', borderBottom: '2px solid #000000', background: '#F8FAFC' }}>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#0F172A' }}>
                ¿Restablecer Código?
              </h3>
            </div>
            <div style={{ padding: '16px 18px' }}>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#334155', fontWeight: 600, lineHeight: 1.5 }}>
                Esta acción restablecerá el código de los archivos al estado inicial de la práctica o proyecto. Cualquier cambio no guardado se perderá.
              </p>
            </div>
            <div
              style={{
                padding: '12px 18px',
                background: '#F8FAFC',
                borderTop: '2px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 10
              }}
            >
              <button
                type="button"
                className="kt-btn-util"
                onClick={() => setIsResetConfirmOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="kt-btn-reset"
                onClick={handleResetConfirm}
              >
                Confirmar y Restablecer
              </button>
            </div>
          </div>
        </div>
      )}

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
