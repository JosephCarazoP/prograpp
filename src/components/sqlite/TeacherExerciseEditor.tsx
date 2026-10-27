import React, { useState } from 'react';
import { SqliteExercise, SqliteExerciseType, SqliteFieldDefinition, SqliteButtonConfig } from '../../types/sqliteLab';
import { sqliteExerciseService } from '../../services/sqliteExerciseService';
import {
  Plus,
  Trash2,
  Save,
  X,
  MousePointerClick,
  Database
} from 'lucide-react';

interface TeacherExerciseEditorProps {
  exerciseToEdit?: SqliteExercise | null;
  onClose: () => void;
  onSaved: () => void;
}

export const TeacherExerciseEditor: React.FC<TeacherExerciseEditorProps> = ({
  exerciseToEdit,
  onClose,
  onSaved
}) => {
  const [title, setTitle] = useState(exerciseToEdit?.title || '');
  const [description, setDescription] = useState(exerciseToEdit?.description || '');
  const [type, setType] = useState<SqliteExerciseType>(exerciseToEdit?.type || 'free_sql');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(exerciseToEdit?.difficulty || 'medium');
  const [initialSql, setInitialSql] = useState(exerciseToEdit?.initialSql || 'PRAGMA foreign_keys = ON;\n\n-- Escribe las sentencias CREATE TABLE o INSERT semilla aquí:\n');
  
  // Objetivos y Pistas
  const [objectives, setObjectives] = useState<string[]>(exerciseToEdit?.objectives || ['']);
  const [hints, setHints] = useState<string[]>(exerciseToEdit?.hints || ['']);
  
  // Criterios de evaluación
  const [requiredTablesText, setRequiredTablesText] = useState(
    exerciseToEdit?.evaluationCriteria?.requiredTables?.join(', ') || ''
  );
  const [testQuerySql, setTestQuerySql] = useState(
    exerciseToEdit?.evaluationCriteria?.verificationQueries?.[0]?.sql || ''
  );

  // Configuración de Modo Programar Botones
  const [entityName, setEntityName] = useState(
    exerciseToEdit?.buttonConfig?.entityName || 'Producto'
  );
  const [fields, setFields] = useState<SqliteFieldDefinition[]>(
    exerciseToEdit?.buttonConfig?.fields || [
      { name: 'codigo', label: 'Código', type: 'text', placeholder: 'ej. C-01', required: true },
      { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'ej. Laptop', required: true }
    ]
  );
  const [buttons, setButtons] = useState<SqliteButtonConfig[]>(
    exerciseToEdit?.buttonConfig?.buttons || [
      { id: 'btn_insert', label: 'Registrar', actionType: 'insert', description: 'Inserta un registro con los datos del formulario.' },
      { id: 'btn_select', label: 'Consultar', actionType: 'select', description: 'Busca el registro según el campo clave.' }
    ]
  );

  const [isSaving, setIsSaving] = useState(false);

  const handleAddObjective = () => setObjectives([...objectives, '']);
  const handleRemoveObjective = (idx: number) => setObjectives(objectives.filter((_, i) => i !== idx));
  const handleObjectiveChange = (idx: number, val: string) => {
    const next = [...objectives];
    next[idx] = val;
    setObjectives(next);
  };

  const handleAddHint = () => setHints([...hints, '']);
  const handleRemoveHint = (idx: number) => setHints(hints.filter((_, i) => i !== idx));
  const handleHintChange = (idx: number, val: string) => {
    const next = [...hints];
    next[idx] = val;
    setHints(next);
  };

  const handleAddField = () => {
    setFields([...fields, { name: '', label: '', type: 'text', required: false }]);
  };
  const handleRemoveField = (idx: number) => setFields(fields.filter((_, i) => i !== idx));

  const handleAddButton = () => {
    const id = 'btn_' + Date.now();
    setButtons([...buttons, { id, label: 'Nuevo Botón', actionType: 'custom', description: '' }]);
  };
  const handleRemoveButton = (idx: number) => setButtons(buttons.filter((_, i) => i !== idx));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Por favor completa el título y la descripción del ejercicio.');
      return;
    }

    setIsSaving(true);
    try {
      const exerciseId = exerciseToEdit?.id || `sqlite_custom_${Date.now()}`;
      
      const reqTables = requiredTablesText
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const exercise: SqliteExercise = {
        id: exerciseId,
        title: title.trim(),
        description: description.trim(),
        type,
        difficulty,
        pathId: 'sql',
        initialSql: initialSql.trim(),
        objectives: objectives.filter(o => o.trim().length > 0),
        hints: hints.filter(h => h.trim().length > 0),
        evaluationCriteria: {
          requiredTables: reqTables.length > 0 ? reqTables : undefined,
          verificationQueries: testQuerySql.trim()
            ? [{ description: 'Consulta de verificación general', sql: testQuerySql.trim(), expectedMinRows: 1 }]
            : undefined
        },
        buttonConfig: type === 'button_programming' ? {
          entityName: entityName.trim() || 'Entidad',
          fields: fields.filter(f => f.name.trim().length > 0),
          buttons: buttons.filter(b => b.label.trim().length > 0)
        } : undefined,
        assignedToUids: ['all'],
        createdBy: 'josephcarazo56@gmail.com',
        createdAt: exerciseToEdit?.createdAt || Date.now()
      };

      await sqliteExerciseService.saveExercise(exercise);
      onSaved();
    } catch (err: any) {
      alert(`Error al guardar el ejercicio: ${err?.message || err}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="sqlite-modal-overlay" onClick={onClose}>
      <div className="sqlite-modal-dialog max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="sqlite-modal-header">
          <div className="flex items-center gap-2">
            <Database size={20} className="text-sky-400" />
            <div>
              <h3 className="font-bold text-base text-slate-100">
                {exerciseToEdit ? 'Editar Ejercicio SQLite' : 'Crear Nuevo Ejercicio SQLite'}
              </h3>
              <p className="text-xs text-slate-400">
                Diseña prácticas de consultas libres, diseño de esquemas o programación de botones CRUD
              </p>
            </div>
          </div>
          <button type="button" className="sqlite-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="sqlite-modal-body space-y-4">
          {/* Fila 1: Título y Modalidad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="sqlite-form-label">Título del Ejercicio</label>
              <input
                type="text"
                className="sqlite-form-input"
                placeholder="ej. Modelado de Base de Datos para Tienda"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="sqlite-form-label">Modalidad</label>
              <select
                className="sqlite-form-input"
                value={type}
                onChange={(e) => setType(e.target.value as SqliteExerciseType)}
              >
                <option value="free_sql">📝 Laboratorio / Consultas</option>
                <option value="button_programming">🖱️ Programar Botones CRUD</option>
              </select>
            </div>
          </div>

          {/* Fila 2: Descripción y Dificultad */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-3">
              <label className="sqlite-form-label">Enunciado / Descripción</label>
              <textarea
                className="sqlite-form-input h-18 resize-none"
                placeholder="Describe claramente la tarea que el estudiante debe resolver..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="sqlite-form-label">Dificultad</label>
              <select
                className="sqlite-form-input"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
              >
                <option value="easy">Fácil</option>
                <option value="medium">Media</option>
                <option value="hard">Avanzada</option>
              </select>
            </div>
          </div>

          {/* Fila 3: Base Inicial Opcional (Script SQL) */}
          <div>
            <label className="sqlite-form-label flex items-center justify-between">
              <span>Base Inicial (Script SQL DDL/DML Semilla)</span>
              <span className="text-[11px] text-slate-400 font-normal">Opcional: Tablas o datos con los que iniciará el alumno</span>
            </label>
            <textarea
              className="sqlite-form-input font-mono text-xs h-28"
              placeholder="CREATE TABLE ... ; INSERT INTO ... ;"
              value={initialSql}
              onChange={(e) => setInitialSql(e.target.value)}
            />
          </div>

          {/* Sección condicional para MODO PROGRAMAR BOTONES */}
          {type === 'button_programming' && (
            <div className="p-3 bg-slate-900/80 rounded-lg border border-sky-800/50 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <MousePointerClick size={15} />
                <span>Configuración de Formulario y Botones CRUD</span>
              </div>

              <div>
                <label className="sqlite-form-label">Nombre de la Entidad / Tabla</label>
                <input
                  type="text"
                  className="sqlite-form-input max-w-xs"
                  placeholder="ej. Estudiante, Producto, Factura"
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                />
              </div>

              {/* Lista de Campos del Formulario */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-300">Campos del Formulario:</span>
                  <button
                    type="button"
                    className="sqlite-hint-btn text-[11px] py-1"
                    onClick={handleAddField}
                  >
                    <Plus size={12} /> Agregar Campo
                  </button>
                </div>
                <div className="space-y-1.5">
                  {fields.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="sqlite-form-input py-1 text-xs"
                        placeholder="Nombre variable (ej. codigo)"
                        value={f.name}
                        onChange={(e) => {
                          const next = [...fields];
                          next[idx].name = e.target.value;
                          setFields(next);
                        }}
                      />
                      <input
                        type="text"
                        className="sqlite-form-input py-1 text-xs"
                        placeholder="Etiqueta visible (ej. Código)"
                        value={f.label}
                        onChange={(e) => {
                          const next = [...fields];
                          next[idx].label = e.target.value;
                          setFields(next);
                        }}
                      />
                      <select
                        className="sqlite-form-input py-1 text-xs w-28"
                        value={f.type}
                        onChange={(e) => {
                          const next = [...fields];
                          next[idx].type = e.target.value as any;
                          setFields(next);
                        }}
                      >
                        <option value="text">Texto</option>
                        <option value="number">Número</option>
                        <option value="date">Fecha</option>
                      </select>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300 p-1"
                        onClick={() => handleRemoveField(idx)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lista de Botones a Programar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-300">Botones de Acción a Programar:</span>
                  <button
                    type="button"
                    className="sqlite-hint-btn text-[11px] py-1"
                    onClick={handleAddButton}
                  >
                    <Plus size={12} /> Agregar Botón
                  </button>
                </div>
                <div className="space-y-1.5">
                  {buttons.map((b, idx) => (
                    <div key={b.id} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="sqlite-form-input py-1 text-xs font-bold"
                        placeholder="Texto del Botón (ej. Registrar)"
                        value={b.label}
                        onChange={(e) => {
                          const next = [...buttons];
                          next[idx].label = e.target.value;
                          setButtons(next);
                        }}
                      />
                      <select
                        className="sqlite-form-input py-1 text-xs w-32"
                        value={b.actionType}
                        onChange={(e) => {
                          const next = [...buttons];
                          next[idx].actionType = e.target.value as any;
                          setButtons(next);
                        }}
                      >
                        <option value="insert">INSERT</option>
                        <option value="select">SELECT</option>
                        <option value="update">UPDATE</option>
                        <option value="delete">DELETE</option>
                        <option value="custom">OTRO</option>
                      </select>
                      <input
                        type="text"
                        className="sqlite-form-input py-1 text-xs flex-1"
                        placeholder="Descripción para el alumno..."
                        value={b.description}
                        onChange={(e) => {
                          const next = [...buttons];
                          next[idx].description = e.target.value;
                          setButtons(next);
                        }}
                      />
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300 p-1"
                        onClick={() => handleRemoveButton(idx)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Objetivos */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="sqlite-form-label">Objetivos a Cumplir</label>
              <button
                type="button"
                className="sqlite-hint-btn text-[11px] py-0.5"
                onClick={handleAddObjective}
              >
                <Plus size={12} /> Agregar Objetivo
              </button>
            </div>
            <div className="space-y-1.5">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="sqlite-form-input py-1 text-xs flex-1"
                    placeholder={`Objetivo #${i + 1}`}
                    value={obj}
                    onChange={(e) => handleObjectiveChange(i, e.target.value)}
                  />
                  {objectives.length > 1 && (
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-300 p-1"
                      onClick={() => handleRemoveObjective(i)}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pistas */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="sqlite-form-label">Pistas Opcionales para el Alumno</label>
              <button
                type="button"
                className="sqlite-hint-btn text-[11px] py-0.5"
                onClick={handleAddHint}
              >
                <Plus size={12} /> Agregar Pista
              </button>
            </div>
            <div className="space-y-1.5">
              {hints.map((hint, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="sqlite-form-input py-1 text-xs flex-1 font-mono"
                    placeholder={`Pista o sintaxis recomendada #${i + 1}`}
                    value={hint}
                    onChange={(e) => handleHintChange(i, e.target.value)}
                  />
                  {hints.length > 1 && (
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-300 p-1"
                      onClick={() => handleRemoveHint(i)}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Criterios de auto-evaluación opcional */}
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Criterios de Verificación Automática (Opcionales)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="sqlite-form-label">Tablas / Vistas Requeridas (separadas por coma)</label>
                <input
                  type="text"
                  className="sqlite-form-input text-xs"
                  placeholder="ej. clientes, productos, pedidos"
                  value={requiredTablesText}
                  onChange={(e) => setRequiredTablesText(e.target.value)}
                />
              </div>
              <div>
                <label className="sqlite-form-label">Consulta de Prueba Funcional</label>
                <input
                  type="text"
                  className="sqlite-form-input font-mono text-xs"
                  placeholder="ej. SELECT COUNT(*) FROM productos WHERE precio > 0;"
                  value={testQuerySql}
                  onChange={(e) => setTestQuerySql(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="sqlite-modal-footer">
            <button
              type="button"
              className="sqlite-action-btn"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="sqlite-modal-primary-btn"
              disabled={isSaving}
            >
              <Save size={15} />
              <span>{isSaving ? 'Guardando...' : 'Guardar Ejercicio'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
