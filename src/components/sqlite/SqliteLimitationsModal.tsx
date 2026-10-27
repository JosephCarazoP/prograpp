import React from 'react';
import {
  X,
  Database,
  CheckCircle2,
  AlertTriangle,
  Cpu
} from 'lucide-react';

interface SqliteLimitationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SqliteLimitationsModal: React.FC<SqliteLimitationsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="sqlite-modal-overlay" onClick={onClose}>
      <div className="sqlite-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="sqlite-modal-header">
          <div className="flex items-center gap-2">
            <Database size={22} className="text-sky-400" />
            <div>
              <h3 className="text-lg font-bold text-slate-100">Documentación del Motor SQLite</h3>
              <p className="text-xs text-slate-400">Especificaciones técnicas, compatibilidad y límites en el navegador</p>
            </div>
          </div>
          <button
            type="button"
            className="sqlite-modal-close-btn"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="sqlite-modal-body">
          {/* Tarjeta de Motor Real */}
          <div className="sqlite-doc-card">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
              <Cpu size={16} />
              <span>Motor SQLite 3 Real en WebAssembly (WASM)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prograpp ejecuta una instancia real de <strong>SQLite 3</strong> dentro del hilo de tu navegador mediante tecnología WebAssembly (sql.js). Las consultas no son simulaciones sintéticas: cada sentencia es procesada por el compilador y planificador de consultas de SQLite nativo.
            </p>
          </div>

          {/* Capacidades Soportadas */}
          <div className="sqlite-doc-section">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
              <CheckCircle2 size={15} className="text-emerald-400" />
              Funciones y Sintaxis Soportadas al 100%
            </h4>
            <ul className="sqlite-doc-list text-xs text-slate-300 space-y-1.5">
              <li>
                <strong>DDL Completo:</strong> <code>CREATE TABLE</code>, <code>ALTER TABLE</code>, <code>DROP TABLE</code>, <code>CREATE VIEW</code>, <code>CREATE INDEX</code> y <code>CREATE TRIGGER</code>.
              </li>
              <li>
                <strong>Restricciones de Integridad:</strong> Llaves Primarias (<code>PRIMARY KEY</code> simples o compuestas), Llaves Foráneas (<code>FOREIGN KEY ... REFERENCES</code> con <code>ON DELETE CASCADE / SET NULL</code>), <code>UNIQUE</code>, <code>NOT NULL</code> y restricciones <code>CHECK(...)</code>.
              </li>
              <li>
                <strong>DML y Modificación:</strong> <code>INSERT INTO</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>INSERT OR REPLACE</code>, <code>INSERT OR IGNORE</code>.
              </li>
              <li>
                <strong>Consultas Avanzadas:</strong> <code>INNER JOIN</code>, <code>LEFT JOIN</code>, <code>CROSS JOIN</code>, agrupaciones con <code>GROUP BY</code> y <code>HAVING</code>, subconsultas correlacionadas, expresiones de tabla comunes (<code>WITH RECURSIVE</code>) y funciones de ventana (<code>OVER</code>).
              </li>
              <li>
                <strong>Transacciones ACID:</strong> Soporte para <code>BEGIN TRANSACTION</code>, <code>COMMIT</code> y <code>ROLLBACK</code>.
              </li>
            </ul>
          </div>

          {/* Limitaciones y Consideraciones */}
          <div className="sqlite-doc-section">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
              <AlertTriangle size={15} />
              Consideraciones y Límites en el Navegador
            </h4>
            <ul className="sqlite-doc-list text-xs text-slate-300 space-y-1.5">
              <li>
                <strong>Persistencia Aislada:</strong> Cada estudiante y cada ejercicio tiene su propia base de datos independiente guardada en el <code>IndexedDB</code> del navegador. No se mezclan con los datos internos de Prograpp ni entre compañeros.
              </li>
              <li>
                <strong>Acceso al Sistema de Archivos:</strong> Por seguridad de los navegadores web modernos (sandbox), la aplicación no puede escribir directamente en el disco duro local sin autorización explícita. Por ello, se proveen los botones <strong>Exportar .db</strong> y <strong>Exportar .sql</strong> para descargar tu trabajo en cualquier momento.
              </li>
              <li>
                <strong>Cuota de Almacenamiento:</strong> El tamaño máximo por base de datos depende de la cuota de IndexedDB asignada por el navegador (habitualmente varios cientos de megabytes), más que suficiente para ejercicios académicos.
              </li>
            </ul>
          </div>
        </div>

        <div className="sqlite-modal-footer">
          <button
            type="button"
            className="sqlite-modal-primary-btn"
            onClick={onClose}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
