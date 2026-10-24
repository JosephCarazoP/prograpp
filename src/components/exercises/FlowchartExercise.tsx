import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Play,
  RotateCcw,
  MoveVertical,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FlowchartExercise, FlowchartShape } from '../../types/lesson';
import { soundService } from '../../services/soundService';

interface FlowchartProps {
  exercise: FlowchartExercise;
  onOrderChange: (order: number[]) => void;
}

/**
 * Componente gráfico que dibuja la figura geométrica estandarizada exacta
 * a la izquierda de cada tarjeta del diagrama de flujo.
 */
export const FlowchartShapeGraphic: React.FC<{
  shape: FlowchartShape;
  text?: string;
  width?: number;
  height?: number;
}> = ({ shape, text = '', width = 58, height = 36 }) => {
  const isEnd = text.toLowerCase().includes('fin');

  if (shape === 'terminal') {
    // 1. Óvalo: Inicio / Fin (Neo-Brutalism: stroke 3px sólido, colores saturados, badge negro)
    const fillColor = isEnd ? '#F87171' : '#4ADE80';
    const label = isEnd ? 'FIN' : 'INICIO';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }} title={`Figura: Óvalo (${label})`}>
        <svg width={width} height={height} viewBox="0 0 58 36" style={{ overflow: 'visible', filter: 'drop-shadow(2.5px 2.5px 0px #000000)' }}>
          <ellipse cx="29" cy="18" rx="27" ry="15" fill={fillColor} stroke="#000000" strokeWidth="3" />
          <text
            x="29"
            y="22"
            textAnchor="middle"
            fontSize="10"
            fontWeight="900"
            fontFamily="JetBrains Mono, monospace"
            fill="#000000"
            letterSpacing="0.8px"
          >
            {label}
          </text>
        </svg>
        <span
          style={{
            fontSize: '0.58rem',
            fontWeight: 900,
            background: '#000000',
            color: '#FFFFFF',
            padding: '1px 5px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
            marginTop: '3px'
          }}
        >
          ÓVALO
        </span>
      </div>
    );
  }

  if (shape === 'io') {
    // 2. Paralelogramo: Leer / Imprimir (E/S) (Neo-Brutalism: azul cian eléctrico, stroke 3px)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }} title="Figura: Paralelogramo (Entrada/Salida)">
        <svg width={width} height={height} viewBox="0 0 58 36" style={{ overflow: 'visible', filter: 'drop-shadow(2.5px 2.5px 0px #000000)' }}>
          <polygon points="13,3 56,3 44,33 1,33" fill="#38BDF8" stroke="#000000" strokeWidth="3" />
          <text
            x="28"
            y="22"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="900"
            fontFamily="JetBrains Mono, monospace"
            fill="#000000"
            letterSpacing="0.6px"
          >
            E / S
          </text>
        </svg>
        <span
          style={{
            fontSize: '0.54rem',
            fontWeight: 900,
            background: '#000000',
            color: '#FFFFFF',
            padding: '1px 4px',
            borderRadius: '4px',
            letterSpacing: '0.4px',
            marginTop: '3px'
          }}
        >
          PARALELOGRAMO
        </span>
      </div>
    );
  }

  if (shape === 'process') {
    // 3. Rectángulo: Proceso / Operación (Neo-Brutalism: morado eléctrico / lila saturado)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }} title="Figura: Rectángulo (Proceso/Cálculo)">
        <svg width={width} height={height} viewBox="0 0 58 36" style={{ overflow: 'visible', filter: 'drop-shadow(2.5px 2.5px 0px #000000)' }}>
          <rect x="2" y="3" width="54" height="30" rx="3" fill="#C084FC" stroke="#000000" strokeWidth="3" />
          <text
            x="29"
            y="22"
            textAnchor="middle"
            fontSize="9"
            fontWeight="900"
            fontFamily="JetBrains Mono, monospace"
            fill="#000000"
            letterSpacing="0.5px"
          >
            PROCESO
          </text>
        </svg>
        <span
          style={{
            fontSize: '0.56rem',
            fontWeight: 900,
            background: '#000000',
            color: '#FFFFFF',
            padding: '1px 5px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
            marginTop: '3px'
          }}
        >
          RECTÁNGULO
        </span>
      </div>
    );
  }

  // 4. Rombo: Decisión Sí / No (Neo-Brutalism: amarillo de alta visibilidad)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }} title="Figura: Rombo (Decisión Sí/No)">
      <svg width={width} height={height} viewBox="0 0 58 36" style={{ overflow: 'visible', filter: 'drop-shadow(2.5px 2.5px 0px #000000)' }}>
        <polygon points="29,2 56,18 29,34 2,18" fill="#FFE600" stroke="#000000" strokeWidth="3" />
        <text
          x="29"
          y="22"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fontFamily="JetBrains Mono, monospace"
          fill="#000000"
          letterSpacing="0.4px"
        >
          DECISIÓN
        </text>
      </svg>
      <span
        style={{
          fontSize: '0.58rem',
          fontWeight: 900,
          background: '#000000',
          color: '#FFFFFF',
          padding: '1px 5px',
          borderRadius: '4px',
          letterSpacing: '0.5px',
          marginTop: '3px'
        }}
      >
        ROMBO
      </span>
    </div>
  );
};

export const FlowchartExerciseComponent: React.FC<FlowchartProps> = ({
  exercise,
  onOrderChange
}) => {
  // Genera un orden mezclado garantizado
  const getScrambledOrder = (len: number) => {
    if (len <= 1) return [0];
    const order: number[] = [];
    const mid = Math.floor(len / 2);
    order.push(mid);
    for (let i = 0; i < len; i++) {
      if (i !== mid) order.push(i);
    }
    return order;
  };

  const [currentOrder, setCurrentOrder] = useState<number[]>(() =>
    getScrambledOrder(exercise.blocks.length)
  );

  const [selectedForSwap, setSelectedForSwap] = useState<number | null>(null);
  const [draggedPos, setDraggedPos] = useState<number | null>(null);
  const [dragOverPos, setDragOverPos] = useState<number | null>(null);

  // Estados de simulación paso a paso con detección inteligente de errores
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeSimIndex, setActiveSimIndex] = useState<number | null>(null);
  const [simStepStatus, setSimStepStatus] = useState<Record<number, 'correct' | 'error'>>({});
  const [simErrorFeedback, setSimErrorFeedback] = useState<{
    stepIndex: number;
    message: string;
    hint?: string;
  } | null>(null);
  const [simSuccessMessage, setSimSuccessMessage] = useState<string | null>(null);

  const simulationTimerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    };
  }, []);

  // Al montar o cambiar de ejercicio, mezclamos e informamos inmediatamente el orden activo
  useEffect(() => {
    const scrambled = getScrambledOrder(exercise.blocks.length);
    setCurrentOrder(scrambled);
    setSelectedForSwap(null);
    clearSimulationState();
    onOrderChange(scrambled);
  }, [exercise.id, exercise.blocks.length]);

  const clearSimulationState = () => {
    if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    setIsSimulating(false);
    setActiveSimIndex(null);
    setSimStepStatus({});
    setSimErrorFeedback(null);
    setSimSuccessMessage(null);
  };

  const updateOrder = (newOrder: number[]) => {
    clearSimulationState();
    setCurrentOrder(newOrder);
    onOrderChange(newOrder);
  };

  // Mover bloque con botones de flecha
  const moveBlock = (pos: number, direction: 'up' | 'down') => {
    soundService.playToken();
    const targetPos = direction === 'up' ? pos - 1 : pos + 1;
    if (targetPos < 0 || targetPos >= currentOrder.length) return;

    const newOrder = [...currentOrder];
    const temp = newOrder[pos];
    newOrder[pos] = newOrder[targetPos];
    newOrder[targetPos] = temp;

    setSelectedForSwap(null);
    updateOrder(newOrder);
  };

  // Tocar para intercambiar dos bloques
  const handleBlockClick = (pos: number) => {
    soundService.playToken();
    if (selectedForSwap === null) {
      setSelectedForSwap(pos);
    } else if (selectedForSwap === pos) {
      setSelectedForSwap(null);
    } else {
      const newOrder = [...currentOrder];
      const temp = newOrder[selectedForSwap];
      newOrder[selectedForSwap] = newOrder[pos];
      newOrder[pos] = temp;

      setSelectedForSwap(null);
      updateOrder(newOrder);
    }
  };

  // Drag and Drop HTML5
  const handleDragStart = (e: React.DragEvent, pos: number) => {
    soundService.playToken();
    setDraggedPos(pos);
    e.dataTransfer.setData('text/plain', String(pos));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, pos: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverPos !== pos) {
      setDragOverPos(pos);
    }
  };

  const handleDragLeave = () => {
    setDragOverPos(null);
  };

  const handleDrop = (e: React.DragEvent, targetPos: number) => {
    e.preventDefault();
    setDragOverPos(null);
    if (draggedPos === null || draggedPos === targetPos) {
      setDraggedPos(null);
      return;
    }

    const newOrder = [...currentOrder];
    const itemToMove = newOrder.splice(draggedPos, 1)[0];
    newOrder.splice(targetPos, 0, itemToMove);

    soundService.playToken();
    setDraggedPos(null);
    setSelectedForSwap(null);
    updateOrder(newOrder);
  };

  const handleDragEnd = () => {
    setDraggedPos(null);
    setDragOverPos(null);
  };

  const handleReset = () => {
    soundService.playToken();
    const scrambled = getScrambledOrder(exercise.blocks.length);
    setSelectedForSwap(null);
    updateOrder(scrambled);
  };

  /**
   * Simulación del Flujo con detección y detención inmediata en errores.
   * Recorre paso a paso:
   * - Si el paso es correcto: se ilumina de verde y continúa.
   * - Si el paso contiene un error: se detiene EN ESE PASO, lo resalta en rojo y muestra la explicación del fallo.
   */
  const handleSimulate = () => {
    if (isSimulating) return;

    clearSimulationState();
    setIsSimulating(true);

    let currentStep = 0;

    const runStep = () => {
      if (currentStep >= currentOrder.length) {
        // Llegó al final sin ningún error
        setIsSimulating(false);
        setActiveSimIndex(null);
        setSimSuccessMessage('¡Excelente! El flujo es 100% lógico y todos los bloques están en el orden correcto.');
        soundService.playWin();
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.65 } });
        return;
      }

      const pos = currentStep;
      setActiveSimIndex(pos);

      // Comprobar si el bloque en este paso es el que corresponde según la solución oficial
      const isStepCorrect = currentOrder[pos] === exercise.correctOrder[pos];

      if (isStepCorrect) {
        soundService.playToken();
        setSimStepStatus(prev => ({ ...prev, [pos]: 'correct' }));
        currentStep++;
        simulationTimerRef.current = setTimeout(runStep, 450);
      } else {
        // DETENERSE EN EL ERROR
        soundService.playError();
        setSimStepStatus(prev => ({ ...prev, [pos]: 'error' }));
        setIsSimulating(false);

        const actualBlock = exercise.blocks[currentOrder[pos]];
        const expectedBlock = exercise.blocks[exercise.correctOrder[pos]];

        let hint = `En este paso se esperaba: "${expectedBlock.text}".`;
        if (pos === 0) {
          hint = 'Todo algoritmo debe arrancar obligatoriamente con el bloque de Inicio.';
        } else if (actualBlock.text.toLowerCase().includes('fin')) {
          hint = 'No puedes colocar el Fin antes de procesar o mostrar los resultados.';
        } else if (actualBlock.shape === 'process' && expectedBlock.shape === 'io') {
          hint = 'Primero debes leer o ingresar los datos antes de poder calcular con ellos.';
        }

        setSimErrorFeedback({
          stepIndex: pos,
          message: `¡Error en el Paso ${pos + 1}! El bloque "${actualBlock.text}" no debe ir en esta posición.`,
          hint
        });
      }
    };

    runStep();
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box', margin: '4px 0 20px 0' }}>
      {/* ── Barra Superior de Herramientas Neo-Brutalist ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '14px',
          padding: '12px 16px',
          boxShadow: '4px 4px 0px #000000',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#FFE600',
              border: '2.5px solid #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '2px 2px 0px #000000'
            }}
          >
            <MoveVertical size={18} color="#000000" strokeWidth={3} />
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#000000', letterSpacing: '0.4px' }}>
              DIAGRAMA DE FLUJO INTERACTIVO
            </div>
            <div style={{ fontSize: '0.74rem', color: '#334155', fontWeight: 700 }}>
              Reordena los bloques con las figuras geométricas a la izquierda
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={handleReset}
            style={{
              background: '#FFFFFF',
              border: '2.5px solid #000000',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '0.78rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '2.5px 2.5px 0px #000000',
              color: '#000000'
            }}
            title="Reiniciar orden desordenado"
          >
            <RotateCcw size={14} strokeWidth={3} /> Reiniciar
          </button>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            style={{
              background: isSimulating ? '#FEF08A' : '#FFE600',
              color: '#000000',
              border: '2.5px solid #000000',
              borderRadius: '8px',
              padding: '7px 16px',
              fontSize: '0.78rem',
              fontWeight: 900,
              cursor: isSimulating ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '3px 3px 0px #000000',
              letterSpacing: '0.4px'
            }}
            title="Ejecutar el flujo paso a paso para comprobar si hay errores"
          >
            <Play size={14} fill="#000000" strokeWidth={3} /> {isSimulating ? 'Comprobando paso...' : 'Probar Flujo'}
          </button>
        </div>
      </div>

      {exercise.flowTitle && (
        <div
          style={{
            background: '#E0F2FE',
            border: '2.5px solid #000000',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '16px',
            fontSize: '0.86rem',
            fontWeight: 900,
            color: '#000000',
            boxShadow: '3px 3px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>→ Meta del Algoritmo: {exercise.flowTitle}</span>
        </div>
      )}

      {/* ── BANNER DE ERROR CUANDO LA SIMULACIÓN CHOCA CON UN PASO INCORRECTO ── */}
      {simErrorFeedback && (
        <div
          style={{
            background: '#FEE2E2',
            border: '3px solid #000000',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '16px',
            boxShadow: '4px 4px 0px #000000',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            animation: 'shake 0.3s ease-in-out'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontWeight: 900, fontSize: '0.88rem' }}>
            <XCircle size={18} strokeWidth={2.8} />
            <span>{simErrorFeedback.message}</span>
          </div>
          {simErrorFeedback.hint && (
            <div style={{ fontSize: '0.78rem', color: '#991B1B', fontWeight: 700, paddingLeft: '26px' }}>
              {simErrorFeedback.hint}
            </div>
          )}
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, paddingLeft: '26px', marginTop: '2px' }}>
            Usa las flechas o arrastra el bloque correspondiente a esa posición y vuelve a presionar "Probar Flujo".
          </div>
        </div>
      )}

      {/* ── BANNER DE ÉXITO CUANDO TODO EL FLUJO ESTÁ BIEN ── */}
      {simSuccessMessage && (
        <div
          style={{
            background: '#F0FDF4',
            border: '2.5px solid #16A34A',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '16px',
            boxShadow: '3px 3px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#15803D',
            fontWeight: 900,
            fontSize: '0.86rem'
          }}
        >
          <CheckCircle2 size={18} strokeWidth={2.8} />
          <span>{simSuccessMessage}</span>
        </div>
      )}

      {selectedForSwap !== null && (
        <div
          style={{
            background: '#FEF08A',
            border: '2px solid #000000',
            borderRadius: '8px',
            padding: '7px 12px',
            marginBottom: '12px',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '2px 2px 0px #000000'
          }}
        >
          <span>Paso {selectedForSwap + 1} seleccionado. Toca otro paso para intercambiarlos.</span>
          <button
            onClick={() => setSelectedForSwap(null)}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: 900,
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '0.74rem'
            }}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* ── LIENZO DEL DIAGRAMA DE FLUJO VERTICAL (NEO-BRUTALISM DESKTOP-EXPANDED) ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0px',
          padding: '24px 18px',
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '18px',
          boxShadow: '6px 6px 0px #000000',
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {currentOrder.map((blockIdx, position) => {
          const block = exercise.blocks[blockIdx];
          if (!block) return null;

          const stepStatus = simStepStatus[position];
          const isSelected = selectedForSwap === position;
          const isDragging = draggedPos === position;
          const isDropTarget = dragOverPos === position;
          const isSimulatingActive = activeSimIndex === position;
          const hasErrorHere = stepStatus === 'error';
          const isVerifiedCorrect = stepStatus === 'correct';

          // Estilo dinámico Neo-Brutalist de la tarjeta según su estado de simulación
          let cardBg = '#FFFFFF';
          let cardBorder = '3px solid #000000';
          let cardShadow = '4px 4px 0px #000000';

          if (hasErrorHere) {
            cardBg = '#FEE2E2';
            cardBorder = '3.5px solid #DC2626';
            cardShadow = '0 0 0 3px #000000, 5px 5px 0px #DC2626';
          } else if (isVerifiedCorrect) {
            cardBg = '#DCFCE7';
            cardBorder = '3px solid #16A34A';
            cardShadow = '0 0 0 3px #000000, 5px 5px 0px #16A34A';
          } else if (isSimulatingActive) {
            cardBg = '#FEF08A';
            cardBorder = '3px solid #000000';
            cardShadow = '0 0 0 3px #000000, 5px 5px 0px #0284C7';
          } else if (isSelected) {
            cardBg = '#E0F2FE';
            cardBorder = '3px solid #000000';
            cardShadow = '0 0 0 3px #000000, 5px 5px 0px #0284C7';
          }

          return (
            <React.Fragment key={block.id}>
              {/* Bloque del diagrama */}
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, position)}
                onDragOver={(e) => handleDragOver(e, position)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, position)}
                onDragEnd={handleDragEnd}
                onClick={() => handleBlockClick(position)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  position: 'relative',
                  opacity: isDragging ? 0.35 : 1,
                  transform: hasErrorHere
                    ? 'scale(1.015)'
                    : isSimulatingActive
                    ? 'scale(1.015)'
                    : isDropTarget
                    ? 'scale(1.015)'
                    : 'scale(1)',
                  transition: 'all 0.12s ease',
                  cursor: 'grab'
                }}
              >
                {/* Indicador de destino de Drop */}
                {isDropTarget && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      left: '0',
                      right: '0',
                      height: '4px',
                      background: '#000000',
                      borderRadius: '2px',
                      zIndex: 10
                    }}
                  />
                )}

                <div
                  style={{
                    background: cardBg,
                    border: cardBorder,
                    borderRadius: '14px',
                    borderBottom: '4px solid #000000',
                    padding: '16px 20px',
                    boxShadow: cardShadow,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    minHeight: '74px',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Lado izquierdo: Número de paso, FIGURA GEOMÉTRICA EXACTA y texto */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                    {/* Badge Neo-Brutalist de número de paso */}
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '9px',
                        background: hasErrorHere ? '#F87171' : isVerifiedCorrect ? '#4ADE80' : '#FFE600',
                        border: '2.5px solid #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.88rem',
                        fontWeight: 900,
                        color: '#000000',
                        boxShadow: '2px 2px 0px #000000',
                        flexShrink: 0
                      }}
                    >
                      {position + 1}
                    </div>

                    {/* ═══ FIGURA GEOMÉTRICA NEO-BRUTALIST (Óvalo, Paralelogramo, Rectángulo, Rombo) ═══ */}
                    <FlowchartShapeGraphic shape={block.shape} text={block.text} />

                    {/* Texto principal del paso y detalle conceptual */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: block.shape === 'process' ? 'JetBrains Mono, monospace' : 'inherit',
                          fontSize: '1.04rem',
                          fontWeight: 900,
                          color: '#000000',
                          lineHeight: 1.4,
                          wordBreak: 'break-word'
                        }}
                      >
                        {block.text}
                      </div>
                      {block.detail && (
                        <div style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 700, marginTop: '3px' }}>
                          {block.detail}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Estado en vivo de simulación */}
                  {hasErrorHere && (
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 900,
                        background: '#EF4444',
                        color: '#FFFFFF',
                        border: '2px solid #000000',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        boxShadow: '2px 2px 0px #000000',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        flexShrink: 0
                      }}
                    >
                      <AlertTriangle size={14} strokeWidth={3} /> ¡Error aquí!
                    </span>
                  )}

                  {isVerifiedCorrect && (
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 900,
                        background: '#22C55E',
                        color: '#FFFFFF',
                        border: '2px solid #000000',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        boxShadow: '2px 2px 0px #000000',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        flexShrink: 0
                      }}
                    >
                      <CheckCircle2 size={14} strokeWidth={3} /> Correcto
                    </span>
                  )}

                  {/* Lado derecho: Botones Neo-Brutalist de mover arriba / abajo */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      flexShrink: 0
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      disabled={position === 0}
                      onClick={() => moveBlock(position, 'up')}
                      style={{
                        background: position === 0 ? '#E2E8F0' : '#FFFFFF',
                        border: '2.5px solid',
                        borderColor: position === 0 ? '#94A3B8' : '#000000',
                        color: position === 0 ? '#94A3B8' : '#000000',
                        borderRadius: '9px',
                        padding: '8px 10px',
                        cursor: position === 0 ? 'default' : 'pointer',
                        boxShadow: position === 0 ? 'none' : '2.5px 2.5px 0px #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.1s ease'
                      }}
                      title="Subir paso"
                    >
                      <ArrowUp size={18} strokeWidth={3} />
                    </button>
                    <button
                      disabled={position === currentOrder.length - 1}
                      onClick={() => moveBlock(position, 'down')}
                      style={{
                        background: position === currentOrder.length - 1 ? '#E2E8F0' : '#FFFFFF',
                        border: '2.5px solid',
                        borderColor: position === currentOrder.length - 1 ? '#94A3B8' : '#000000',
                        color: position === currentOrder.length - 1 ? '#94A3B8' : '#000000',
                        borderRadius: '9px',
                        padding: '8px 10px',
                        cursor: position === currentOrder.length - 1 ? 'default' : 'pointer',
                        boxShadow: position === currentOrder.length - 1 ? 'none' : '2.5px 2.5px 0px #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.1s ease'
                      }}
                      title="Bajar paso"
                    >
                      <ArrowDown size={18} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>

              {/* ── FLECHA CONECTORA VERTICAL NEO-BRUTALIST (SÓLIDA Y LIMPIA) ── */}
              {position < currentOrder.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '38px',
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    margin: '1px 0'
                  }}
                >
                  {/* Línea vertical gruesa y flecha sólida */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '4px',
                        height: '24px',
                        background: isVerifiedCorrect ? '#16A34A' : hasErrorHere ? '#EF4444' : '#000000',
                        transition: 'background 0.2s'
                      }}
                    />
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderTop: `10px solid ${isVerifiedCorrect ? '#16A34A' : hasErrorHere ? '#EF4444' : '#000000'}`,
                        marginTop: '-1px'
                      }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── LEYENDA PEDAGÓGICA NEO-BRUTALIST CON FIGURAS OFICIALES ── */}
      <div
        style={{
          marginTop: '18px',
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '16px',
          padding: '14px 20px',
          boxShadow: '5px 5px 0px #000000',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#000000', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ background: '#FFE600', border: '2px solid #000000', borderRadius: '6px', padding: '3px 8px', boxShadow: '1.5px 1.5px 0px #000000', fontSize: '0.74rem', fontWeight: 900 }}>
            SIMBOLOGÍA
          </span>
          <span>GUÍA UNIVERSAL DE DIAGRAMAS DE FLUJO:</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            fontSize: '0.82rem',
            fontWeight: 800,
            color: '#000000'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFFDF7', border: '2px solid #000000', borderRadius: '8px', padding: '10px 12px', boxShadow: '2px 2px 0px #000000' }}>
            <svg width="34" height="22" viewBox="0 0 58 36" style={{ filter: 'drop-shadow(1.5px 1.5px 0px #000000)' }}>
              <ellipse cx="29" cy="18" rx="27" ry="15" fill="#4ADE80" stroke="#000" strokeWidth="3" />
            </svg>
            <span><strong>Óvalo:</strong> Inicio / Fin</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFFDF7', border: '2px solid #000000', borderRadius: '8px', padding: '10px 12px', boxShadow: '2px 2px 0px #000000' }}>
            <svg width="34" height="22" viewBox="0 0 58 36" style={{ filter: 'drop-shadow(1.5px 1.5px 0px #000000)' }}>
              <polygon points="13,3 56,3 44,33 1,33" fill="#38BDF8" stroke="#000" strokeWidth="3" />
            </svg>
            <span><strong>Paralelogramo:</strong> E/S</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFFDF7', border: '2px solid #000000', borderRadius: '8px', padding: '10px 12px', boxShadow: '2px 2px 0px #000000' }}>
            <svg width="34" height="22" viewBox="0 0 58 36" style={{ filter: 'drop-shadow(1.5px 1.5px 0px #000000)' }}>
              <rect x="2" y="3" width="54" height="30" rx="3" fill="#C084FC" stroke="#000" strokeWidth="3" />
            </svg>
            <span><strong>Rectángulo:</strong> Proceso</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFFDF7', border: '2px solid #000000', borderRadius: '8px', padding: '10px 12px', boxShadow: '2px 2px 0px #000000' }}>
            <svg width="34" height="22" viewBox="0 0 58 36" style={{ filter: 'drop-shadow(1.5px 1.5px 0px #000000)' }}>
              <polygon points="29,2 56,18 29,34 2,18" fill="#FFE600" stroke="#000" strokeWidth="3" />
            </svg>
            <span><strong>Rombo:</strong> Decisión</span>
          </div>
        </div>
      </div>
    </div>
  );
};
