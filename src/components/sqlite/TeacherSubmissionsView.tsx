import React, { useState, useEffect } from 'react';
import { SqliteSubmission, SqliteExercise } from '../../types/sqliteLab';
import { sqliteExerciseService } from '../../services/sqliteExerciseService';
import {
  FileCode,
  Download,
  CheckCircle2,
  AlertTriangle,
  User,
  Search,
  Award,
  RefreshCw,
  Eye,
  X
} from 'lucide-react';

interface TeacherSubmissionsViewProps {
  exercises: SqliteExercise[];
}

export const TeacherSubmissionsView: React.FC<TeacherSubmissionsViewProps> = ({ exercises }) => {
  const [submissions, setSubmissions] = useState<SqliteSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSub, setSelectedSub] = useState<SqliteSubmission | null>(null);

  // Estados de calificación
  const [gradeScore, setGradeScore] = useState<number>(100);
  const [gradeFeedback, setGradeFeedback] = useState<string>('');
  const [isGrading, setIsGrading] = useState(false);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const list = await sqliteExerciseService.getAllSubmissions();
      setSubmissions(list);
    } catch (e) {
      console.warn('Error cargando entregas SQLite:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleSelectSubmission = (sub: SqliteSubmission) => {
    setSelectedSub(sub);
    setGradeScore(sub.score !== undefined ? sub.score : 100);
    setGradeFeedback(sub.feedback || '');
  };

  const handleSaveGrade = async () => {
    if (!selectedSub) return;
    setIsGrading(true);
    try {
      await sqliteExerciseService.gradeSubmission(selectedSub.id, gradeScore, gradeFeedback);
      setSelectedSub(prev => prev ? { ...prev, score: gradeScore, feedback: gradeFeedback, status: 'graded' } : null);
      await loadSubmissions();
      alert('Calificación y retroalimentación guardadas.');
    } catch (e: any) {
      alert(`Error al calificar: ${e?.message || e}`);
    } finally {
      setIsGrading(false);
    }
  };

  const handleDownloadStudentDb = (sub: SqliteSubmission) => {
    if (!sub.dbBase64) {
      alert('Esta entrega no incluye snapshot binario de la base de datos.');
      return;
    }
    try {
      const binStr = atob(sub.dbBase64);
      const bytes = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) {
        bytes[i] = binStr.charCodeAt(i);
      }
      const blob = new Blob([bytes.buffer], { type: 'application/x-sqlite3' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `entrega_${sub.studentName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${sub.exerciseId}.db`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Error decodificando la base de datos entregada.');
    }
  };

  const filtered = submissions.filter(s => {
    const q = searchQuery.toLowerCase();
    const ex = exercises.find(e => e.id === s.exerciseId);
    return (
      s.studentName.toLowerCase().includes(q) ||
      (s.studentEmail && s.studentEmail.toLowerCase().includes(q)) ||
      (ex && ex.title.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-slate-200 w-full"
            placeholder="Buscar por estudiante, correo o ejercicio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="sqlite-action-btn"
          onClick={loadSubmissions}
          disabled={loading}
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          <span>Actualizar Entregas</span>
        </button>
      </div>

      {/* Lista de Entregas */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400">
          No hay entregas registradas para los ejercicios de SQLite aún.
        </div>
      ) : (
        <div className="sqlite-table-wrapper max-h-[500px]">
          <table className="sqlite-data-table">
            <thead>
              <tr>
                <th className="sqlite-th-index">#</th>
                <th className="sqlite-th-col">Estudiante</th>
                <th className="sqlite-th-col">Grupo</th>
                <th className="sqlite-th-col">Ejercicio</th>
                <th className="sqlite-th-col">Fecha</th>
                <th className="sqlite-th-col">Auto-Check</th>
                <th className="sqlite-th-col">Nota / Estado</th>
                <th className="sqlite-th-col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub, idx) => {
                const ex = exercises.find(e => e.id === sub.exerciseId);
                const hasAuto = sub.autoCheckResults !== undefined;
                const autoPassed = sub.autoCheckResults?.passed;

                return (
                  <tr key={sub.id} className="sqlite-tr-row hover:bg-slate-800/40">
                    <td className="sqlite-td-index">{idx + 1}</td>
                    <td className="sqlite-td-val font-semibold text-slate-100">
                      <div className="flex items-center gap-1.5">
                        <User size={13} className="text-sky-400" />
                        <span>{sub.studentName}</span>
                      </div>
                      {sub.studentEmail && (
                        <span className="text-[10px] text-slate-400 block">{sub.studentEmail}</span>
                      )}
                    </td>
                    <td className="sqlite-td-val text-xs text-slate-300">
                      {sub.studentGroup || '—'}
                    </td>
                    <td className="sqlite-td-val text-xs text-slate-300 font-medium">
                      {ex?.title || sub.exerciseId}
                    </td>
                    <td className="sqlite-td-val text-[11px] text-slate-400">
                      {new Date(sub.submittedAt).toLocaleDateString()} {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="sqlite-td-val text-xs">
                      {hasAuto ? (
                        autoPassed ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 size={13} /> Pasó Tests
                          </span>
                        ) : (
                          <span className="text-amber-400 font-semibold flex items-center gap-1">
                            <AlertTriangle size={13} /> Revisar Criterios
                          </span>
                        )
                      ) : (
                        <span className="text-slate-500">Manual</span>
                      )}
                    </td>
                    <td className="sqlite-td-val text-xs">
                      {sub.status === 'graded' ? (
                        <span className="sqlite-badge-pk">
                          {sub.score} / {sub.maxScore}
                        </span>
                      ) : (
                        <span className="sqlite-badge-notnull">
                          Pendiente
                        </span>
                      )}
                    </td>
                    <td className="sqlite-td-val">
                      <button
                        type="button"
                        className="sqlite-action-btn text-xs py-1"
                        onClick={() => handleSelectSubmission(sub)}
                      >
                        <Eye size={12} />
                        <span>Revisar</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Detalle y Calificación de la Entrega */}
      {selectedSub && (
        <div className="sqlite-modal-overlay" onClick={() => setSelectedSub(null)}>
          <div className="sqlite-modal-dialog max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sqlite-modal-header">
              <div>
                <h3 className="font-bold text-base text-slate-100">
                  Entrega de {selectedSub.studentName}
                </h3>
                <p className="text-xs text-slate-400">
                  Ejercicio: {exercises.find(e => e.id === selectedSub.exerciseId)?.title || selectedSub.exerciseId}
                </p>
              </div>
              <button
                type="button"
                className="sqlite-modal-close-btn"
                onClick={() => setSelectedSub(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="sqlite-modal-body space-y-4">
              {/* Código SQL entregado */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <FileCode size={14} className="text-sky-400" />
                    Código SQL de la Solución:
                  </span>
                  {selectedSub.dbBase64 && (
                    <button
                      type="button"
                      className="sqlite-action-btn text-xs py-0.5"
                      onClick={() => handleDownloadStudentDb(selectedSub)}
                    >
                      <Download size={12} />
                      <span>Descargar .db del Alumno</span>
                    </button>
                  )}
                </div>

                {selectedSub.buttonSqlMap ? (
                  <div className="space-y-2">
                    {Object.entries(selectedSub.buttonSqlMap).map(([btnId, sql]) => (
                      <div key={btnId} className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-[11px] font-bold text-sky-400 block mb-1">
                          Botón ID: {btnId}
                        </span>
                        <pre className="text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">{sql || '(Sin código)'}</pre>
                      </div>
                    ))}
                  </div>
                ) : (
                  <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 max-h-56 overflow-y-auto whitespace-pre-wrap">
                    {selectedSub.sqlCode || '(Sin código SQL)'}
                  </pre>
                )}
              </div>

              {/* Resultados de comprobación automática */}
              {selectedSub.autoCheckResults && (
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                    Resultados de Auto-Comprobación Estructural:
                  </span>
                  {selectedSub.autoCheckResults.checks.map((chk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      {chk.passed ? (
                        <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                      ) : (
                        <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
                      )}
                      <span className={chk.passed ? 'text-emerald-200' : 'text-red-300'}>
                        {chk.description}: <strong>{chk.details}</strong>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Formulario de Calificación Docente */}
              <div className="p-3 bg-sky-950/20 border border-sky-800/40 rounded-lg space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block">
                  Calificación Docente
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="sqlite-form-label">Nota (0 a 100)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="sqlite-form-input text-xs font-bold"
                      value={gradeScore}
                      onChange={(e) => setGradeScore(Number(e.target.value))}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="sqlite-form-label">Retroalimentación para el Alumno</label>
                    <input
                      type="text"
                      className="sqlite-form-input text-xs"
                      placeholder="Observaciones pedagógicas sobre su diseño relacional o sintaxis..."
                      value={gradeFeedback}
                      onChange={(e) => setGradeFeedback(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sqlite-modal-footer">
              <button
                type="button"
                className="sqlite-action-btn"
                onClick={() => setSelectedSub(null)}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="sqlite-modal-primary-btn"
                onClick={handleSaveGrade}
                disabled={isGrading}
              >
                <Award size={15} />
                <span>{isGrading ? 'Guardando...' : 'Guardar Calificación'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
