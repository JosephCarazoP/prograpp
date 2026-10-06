import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Swords,
  RefreshCw,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../services/soundService';
import { UserProfile, UserPowerUps } from '../types/user';
import { DevAvatar } from './Avatars';
import { PowerUpsBar } from './PowerUpsBar';
import { VSCodeSnippet } from './VSCodeSnippet';

interface BossStage {
  id: string;
  bossAttackName: string;
  prompt: string;
  codeSnippet: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  playerDamage: number;
  bossDamage: number;
  teacherHint: string;
}

interface BossFightProps {
  user: UserProfile;
  bossId?: string;
  unitId?: number;
  pathId?: 'kotlin' | 'sql';
  onVictory: () => void;
  onExit: () => void;
  onUsePowerUp?: (key: keyof UserPowerUps) => void;
}

// Ilustración SVG de Bugzilla animado con glitch y antenas cibernéticas (Sin Emojis)
const BugzillaBattleSprite: React.FC<{ hp: number; isAttacking: boolean; isHurt: boolean }> = ({
  hp,
  isAttacking,
  isHurt
}) => (
  <div
    style={{
      width: '130px',
      height: '130px',
      position: 'relative',
      filter:
        hp <= 0
          ? 'grayscale(1) opacity(0.35)'
          : isHurt
          ? 'drop-shadow(0 0 20px #EF4444) brightness(1.6)'
          : 'drop-shadow(0 0 16px rgba(239, 68, 68, 0.65))',
      transform: isAttacking
        ? 'translate(-24px, 20px) scale(1.15)'
        : isHurt
        ? 'translate(10px, -6px) scale(0.92)'
        : 'none',
      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease'
    }}
  >
    <svg width="130" height="130" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Halo de Corrupción Glitch */}
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="rgba(239, 68, 68, 0.12)"
        stroke="#EF4444"
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />

      {/* Antenas de Excepción */}
      <line x1="35" y1="22" x2="20" y2="6" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="18" cy="5" r="5" fill="#F87171" />
      <line x1="65" y1="22" x2="80" y2="6" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="82" cy="5" r="5" fill="#F87171" />

      {/* Patas cibernéticas de insecto glitch */}
      <path d="M16 45 L4 38 M14 60 L3 64 M16 75 L5 84" stroke="#991B1B" strokeWidth="4" strokeLinecap="round" />
      <path d="M84 45 L96 38 M86 60 L97 64 M84 75 L95 84" stroke="#991B1B" strokeWidth="4" strokeLinecap="round" />

      {/* Caparazón blindado de Bug */}
      <rect x="20" y="24" width="60" height="64" rx="20" fill="#7F1D1D" stroke="#EF4444" strokeWidth="3.2" />

      {/* Núcleo de Fallo Terminal */}
      <rect x="28" y="44" width="44" height="28" rx="8" fill="#450A0A" stroke="#F87171" strokeWidth="2" />
      <text x="32" y="62" fill="#FCA5A5" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
        0xCRASH
      </text>

      {/* Ojos enfurecidos en ángulo */}
      <polygon points="31,34 44,38 33,42" fill="#F87171" />
      <polygon points="69,34 56,38 67,42" fill="#F87171" />
      <circle cx="37" cy="37" r="2.2" fill="#FFFFFF" />
      <circle cx="63" cy="37" r="2.2" fill="#FFFFFF" />

      {/* Mandíbula de colmillos de error */}
      <path
        d="M38 78 L44 85 L50 78 L56 85 L62 78"
        stroke="#EF4444"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </div>
);

// Banco de Fases de Combate para el Jefe (Variedad entre intentos - Requerimiento 6)
const BOSS_CHALLENGE_POOL: BossStage[] = [
  {
    id: 'b-stage-01',
    bossAttackName: 'Inyección de Loop Infinito',
    prompt: 'Bugzilla desata un bucle while sin condición de escape. ¿Qué instrucción restaura el ciclo?',
    codeSnippet: 'var iterador = 1\nwhile (iterador <= 5) {\n    println("Sobrecarga...")\n    // ¡Instrucción faltante aquí!\n}',
    options: ['iterador++', 'iterador = 0', 'val iterador = 5', 'break while'],
    correctOptionIndex: 0,
    explanation: '¡Golpe Directo! Con iterador++, la condición alcanza el límite y el servidor no colapsa.',
    bossDamage: 35,
    playerDamage: 25,
    teacherHint: 'Un bucle while necesita que la variable de control se incremente en cada vuelta para alcanzar el fin.'
  },
  {
    id: 'b-stage-02',
    bossAttackName: 'Corrupción de Memoria Inmutable',
    prompt: 'Bugzilla intenta reescribir un valor \'val\' protegido. ¿Cómo neutralizar el intento?',
    codeSnippet: 'val LLAVE_SEGURA = "0xA9"\nLLAVE_SEGURA = "0x00" // ¡Violación de inmutabilidad!',
    options: [
      'Conservar \'val\' y eliminar la reasignación indebida',
      'Renombrar la variable a minúsculas',
      'Agregar llaves {} alrededor de la variable',
      'Reemplazar val por function'
    ],
    correctOptionIndex: 0,
    explanation: '¡Impacto Crítico! En Kotlin, \'val\' garantiza la integridad inmutable del sistema.',
    bossDamage: 35,
    playerDamage: 25,
    teacherHint: 'Las variables declaradas con \'val\' son de solo lectura y no pueden modificarse jamás.'
  },
  {
    id: 'b-stage-03',
    bossAttackName: 'Disparo de Excepción NullPointer',
    prompt: 'Bugzilla envía un dato nulo inesperado. ¿Qué operador de Kotlin evita el crash en tiempo de ejecución?',
    codeSnippet: 'val respuesta: String? = null\nval longitud = respuesta?.length ?: 0',
    options: [
      'El operador Elvis ?: que provee un valor por defecto si es nulo',
      'El operador !! que fuerza la ejecución sin importar nada',
      'El punto y coma ; al final de la línea',
      'Un bucle for para recorrer los caracteres'
    ],
    correctOptionIndex: 0,
    explanation: '¡Defensa Impecable! El operador Elvis ?: neutraliza los NullPointerExceptions con elegancia.',
    bossDamage: 35,
    playerDamage: 25,
    teacherHint: 'El operador Elvis ?: toma el valor de la izquierda si no es nulo, o el de la derecha como salvaguarda.'
  },
  {
    id: 'b-stage-04',
    bossAttackName: 'Sobrecarga de Concatenación',
    prompt: 'Bugzilla distorsiona la salida de texto. ¿Cuál es la forma moderna de inyectar variables en texto en Kotlin?',
    codeSnippet: 'val puntuacion = 100\nval texto = "Tu récord es: $puntuacion"',
    options: [
      'String Templates con el símbolo $',
      'Concatenar con operador +',
      'Encerrar en corchetes [puntuacion]',
      'Usar la palabra reservada import'
    ],
    correctOptionIndex: 0,
    explanation: '¡Acierto! Los String Templates con $ incrustan variables limpiamente sin conversiones manuales.',
    bossDamage: 35,
    playerDamage: 25,
    teacherHint: 'En Kotlin se usa el prefijo $ antes del nombre de la variable dentro de las comillas dobles.'
  },
  {
    id: 'b-stage-05',
    bossAttackName: 'Desfase de Precedencia Aritmética',
    prompt: 'Bugzilla altera el orden de cálculo matemático: val res = 2 + 3 * 4. ¿Qué valor resulta?',
    codeSnippet: 'val a = 2\nval b = 3\nval c = 4\nval res = a + b * c\nprintln(res)',
    options: ['14', '20', '24', '10'],
    correctOptionIndex: 0,
    explanation: '¡Golpe Certero! La multiplicación (*) tiene mayor precedencia que la suma: 3 * 4 = 12, y 12 + 2 = 14.',
    bossDamage: 35,
    playerDamage: 25,
    teacherHint: 'Recuerda el orden de operaciones: primero multiplicaciones y divisiones, luego sumas y restas.'
  }
];

export const BossFightArena: React.FC<BossFightProps> = ({
  user,
  unitId = 1,
  pathId = 'kotlin',
  onVictory,
  onExit,
  onUsePowerUp
}) => {
  // Transición inicial
  const [isTeleporting, setIsTeleporting] = useState(true);

  // Salud del Jugador y del Jefe
  const [playerHp, setPlayerHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);

  // Selección de 3 fases aleatorias para que cada intento sea distinto (Requerimiento 6)
  const [stages, setStages] = useState<BossStage[]>(() => {
    const pool = [...BOSS_CHALLENGE_POOL];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 3);
  });

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [disabledOptions, setDisabledOptions] = useState<number[]>([]);
  const [isSecondChanceActive, setIsSecondChanceActive] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [highlightCode, setHighlightCode] = useState(false);

  const [turnState, setTurnState] = useState<
    'player_turn' | 'player_attacking' | 'boss_attacking' | 'round_end' | 'game_over' | 'victory'
  >('player_turn');

  const [combatLog, setCombatLog] = useState(
    '¡Bugzilla el Desbordador bloquea el compilador! Selecciona una acción de contraataque.'
  );
  const [lastDamageDealt, setLastDamageDealt] = useState<number | null>(null);
  const [lastDamageTaken, setLastDamageTaken] = useState<number | null>(null);

  // Efecto de teletransporte
  useEffect(() => {
    soundService.playToken();
    const timer = setTimeout(() => setIsTeleporting(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const currentStage = stages[currentStageIndex];

  // Manejo de Comodines en el Combate
  const handlePowerUp = (key: keyof UserPowerUps) => {
    if (!user.powerups || user.powerups[key] <= 0) {
      soundService.playError();
      return;
    }

    if (onUsePowerUp) {
      onUsePowerUp(key);
    }

    if (key === 'teacherHint') {
      soundService.playCorrect();
      setHintMessage(currentStage.teacherHint);
      setCombatLog(`Pista del Profesor: ${currentStage.teacherHint}`);
    } else if (key === 'eliminateOptions') {
      soundService.playCorrect();
      const wrong = currentStage.options
        .map((_, idx) => idx)
        .filter((idx) => idx !== currentStage.correctOptionIndex);
      const toDisable = wrong.slice(0, 2);
      setDisabledOptions((prev) => Array.from(new Set([...prev, ...toDisable])));
      setCombatLog('¡50/50 activado! Se han neutralizado 2 opciones erróneas.');
    } else if (key === 'secondChance') {
      soundService.playCorrect();
      setIsSecondChanceActive(true);
      setCombatLog('¡Escudo de Segunda Oportunidad activado! Tu próximo fallo será absorbido.');
    } else if (key === 'codePeek') {
      soundService.playCorrect();
      setHighlightCode(true);
      setCombatLog('¡Inspección de código activa! Observa la sintaxis resaltada.');
    }
  };

  // Ejecución de turno de combate estilo Pokémon
  const handleExecuteTurn = () => {
    if (selectedOption === null || turnState !== 'player_turn') return;

    if (selectedOption === currentStage.correctOptionIndex) {
      // 1. Acierto del Jugador: Ataca al Jefe
      soundService.playCorrect();
      setTurnState('player_attacking');
      setLastDamageDealt(currentStage.bossDamage);
      setCombatLog(`¡Golpe certero! Has aplicado el parche correcto. Bugzilla recibe -${currentStage.bossDamage} HP.`);

      setTimeout(() => {
        const nextBossHp = Math.max(0, bossHp - currentStage.bossDamage);
        setBossHp(nextBossHp);
        setLastDamageDealt(null);

        if (nextBossHp <= 0) {
          // Victoria definitiva
          soundService.playWin();
          confetti({
            particleCount: 180,
            spread: 110,
            origin: { y: 0.5 },
            colors: ['#38BDF8', '#10B981', '#F59E0B', '#A855F7']
          });
          setTurnState('victory');
          setCombatLog('¡Bugzilla ha sido neutralizado por completo! Has liberado la unidad.');
        } else {
          setTurnState('round_end');
        }
      }, 700);
    } else {
      // Fallo: Comprobar si el escudo de segunda oportunidad está activo
      if (isSecondChanceActive) {
        soundService.playWin();
        setIsSecondChanceActive(false);
        setDisabledOptions((prev) => [...prev, selectedOption]);
        setSelectedOption(null);
        setCombatLog('¡Tu Escudo absorbió el impacto de Bugzilla! Tienes una segunda oportunidad.');
        return;
      }

      // 2. Turno del Jefe: Contraataca al Jugador
      soundService.playError();
      setTurnState('boss_attacking');
      setLastDamageTaken(currentStage.playerDamage);
      setCombatLog(`¡Ataque fallido! Bugzilla ejecutó '${currentStage.bossAttackName}'. Recibes -${currentStage.playerDamage} HP.`);

      setTimeout(() => {
        const nextPlayerHp = Math.max(0, playerHp - currentStage.playerDamage);
        setPlayerHp(nextPlayerHp);
        setLastDamageTaken(null);

        if (nextPlayerHp <= 0) {
          soundService.playError();
          setTurnState('game_over');
          setCombatLog('¡Tu consola de ejecución ha colapsado! Recarga tu lógica y vuelve a intentarlo.');
        } else {
          setTurnState('round_end');
        }
      }, 700);
    }
  };

  const handleNextRound = () => {
    if (currentStageIndex < stages.length - 1 && bossHp > 0) {
      setCurrentStageIndex((prev) => prev + 1);
      setSelectedOption(null);
      setDisabledOptions([]);
      setHintMessage(null);
      setHighlightCode(false);
      setTurnState('player_turn');
      setCombatLog(`¡Fase ${currentStageIndex + 2}! Bugzilla prepara '${stages[currentStageIndex + 1].bossAttackName}'.`);
    } else if (bossHp <= 0) {
      onVictory();
    }
  };

  const handleRestartBattle = () => {
    soundService.playToken();
    const pool = [...BOSS_CHALLENGE_POOL];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setStages(pool.slice(0, 3));
    setPlayerHp(100);
    setBossHp(100);
    setCurrentStageIndex(0);
    setSelectedOption(null);
    setDisabledOptions([]);
    setHintMessage(null);
    setHighlightCode(false);
    setTurnState('player_turn');
    setCombatLog('¡Combate reiniciado! Analiza la sintaxis con máxima concentración.');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        background: 'linear-gradient(180deg, #090D1A 0%, #030712 100%)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        color: '#FFFFFF'
      }}
    >
      {/* Transición inicial de teletransporte */}
      {isTeleporting ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}
        >
          <Swords size={68} color="#EF4444" style={{ animation: 'spin 1.2s linear infinite' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.05em' }}>
            TELETRANSPORTANDO AL COLISEO...
          </h2>
          <span style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: 700 }}>
            Iniciando protocolo de combate por turnos
          </span>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%',
            padding: '12px 16px 32px 16px',
            boxSizing: 'border-box',
            gap: '12px'
          }}
        >
          {/* Header Superior del Coliseo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '6px'
            }}
          >
            <button
              onClick={onExit}
              style={{
                color: '#94A3B8',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '10px',
                padding: '6px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: 800
              }}
            >
              <ArrowLeft size={16} />
              <span>Retirarse</span>
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(239, 68, 68, 0.15)',
                padding: '5px 12px',
                borderRadius: '12px',
                border: '1.5px solid rgba(239, 68, 68, 0.35)'
              }}
            >
              <ShieldAlert size={16} color="#EF4444" />
              <span style={{ color: '#EF4444', fontWeight: 900, fontSize: '0.82rem' }}>
                COLISEO DE JEFE • FASE {currentStageIndex + 1}/{stages.length}
              </span>
            </div>

            <div style={{ width: '80px' }} />
          </div>

          {/* CAMPO DE BATALLA CON PERSPECTIVA LATERAL POKÉMON (REQUERIMIENTO 5) */}
          <div
            className={turnState === 'boss_attacking' ? 'screen-shake' : ''}
            style={{
              background: 'radial-gradient(ellipse at 50% 65%, #1E1B4B 0%, #060B18 100%)',
              border: '2px solid #2D3748',
              borderRadius: '24px',
              padding: '16px 20px',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* LADO SUPERIOR DERECHO: JEFE BUGZILLA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              {/* Tarjeta HUD de Estadísticas del Jefe */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1.5px solid #EF4444',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  minWidth: '180px',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#FFFFFF' }}>Bugzilla</span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#EF4444' }}>Nv. 10</span>
                </div>

                {/* Barra de Vida HP del Jefe */}
                <div
                  style={{
                    height: '10px',
                    background: '#030712',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid #334155',
                    margin: '6px 0 4px 0'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${bossHp}%`,
                      background: bossHp > 50 ? '#10B981' : bossHp > 25 ? '#F59E0B' : '#EF4444',
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#94A3B8'
                  }}
                >
                  <span>HP</span>
                  <span>{bossHp} / 100</span>
                </div>
              </div>

              {/* Sprite del Jefe con plataforma 3D */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <BugzillaBattleSprite
                  hp={bossHp}
                  isAttacking={turnState === 'boss_attacking'}
                  isHurt={turnState === 'player_attacking'}
                />

                {/* Plataforma 3D del Jefe */}
                <div
                  style={{
                    width: '120px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.25)',
                    border: '1.5px solid #EF4444',
                    marginTop: '-8px'
                  }}
                />

                {lastDamageDealt !== null && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      color: '#EF4444',
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      textShadow: '0 0 12px #000',
                      animation: 'scale-up 0.3s ease-out'
                    }}
                  >
                    -{lastDamageDealt} HP!
                  </div>
                )}
              </div>
            </div>

            {/* LADO INFERIOR IZQUIERDO: JUGADOR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px' }}>
              {/* Sprite y plataforma del Jugador */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    transform:
                      turnState === 'player_attacking'
                        ? 'translate(24px, -20px) scale(1.15)'
                        : turnState === 'boss_attacking'
                        ? 'translate(-10px, 6px) scale(0.92)'
                        : 'none',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    filter:
                      turnState === 'boss_attacking'
                        ? 'drop-shadow(0 0 16px #EF4444)'
                        : 'drop-shadow(0 0 14px rgba(56, 189, 248, 0.6))'
                  }}
                >
                  <DevAvatar avatarId={user.avatarId || 'robot_byte'} size={76} />
                </div>

                {/* Plataforma holográfica de batalla del Jugador */}
                <div
                  style={{
                    width: '90px',
                    height: '14px',
                    borderRadius: '50%',
                    background: 'rgba(56, 189, 248, 0.25)',
                    border: '1.5px solid #38BDF8',
                    marginTop: '-4px'
                  }}
                />

                {lastDamageTaken !== null && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-18px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      color: '#F87171',
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      textShadow: '0 0 10px #000',
                      animation: 'scale-up 0.3s ease-out'
                    }}
                  >
                    -{lastDamageTaken} HP!
                  </div>
                )}
              </div>

              {/* Tarjeta HUD de Estadísticas del Jugador */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1.5px solid #38BDF8',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  minWidth: '180px',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#FFFFFF' }}>
                    {user.displayName || 'Dev'}
                  </span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38BDF8' }}>
                    Nv. {Math.floor((user.totalXp || 0) / 100) + 1}
                  </span>
                </div>

                {/* Barra de Vida HP del Jugador */}
                <div
                  style={{
                    height: '10px',
                    background: '#030712',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid #334155',
                    margin: '6px 0 4px 0'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${playerHp}%`,
                      background: playerHp > 50 ? '#10B981' : playerHp > 25 ? '#F59E0B' : '#EF4444',
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#94A3B8'
                  }}
                >
                  <span>HP</span>
                  <span>{playerHp} / 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* CUADRO DE REGISTRO DE COMBATE / LOG RPG */}
          <div
            style={{
              background: '#0F172A',
              border: '1.5px solid #1E293B',
              borderRadius: '14px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minHeight: '42px'
            }}
          >
            <Sparkles size={18} color="#F59E0B" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.88rem', color: '#E2E8F0', fontWeight: 700, lineHeight: 1.4 }}>
              {combatLog}
            </span>
          </div>

          {/* CONSOLA DE ACCIÓN INTEGRADA */}
          {turnState !== 'victory' && turnState !== 'game_over' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Barra de Comodines en Combate */}
              <PowerUpsBar
                powerups={user.powerups}
                onUsePowerUp={handlePowerUp}
                isSecondChanceActive={isSecondChanceActive}
                disabled={turnState !== 'player_turn'}
                compact={true}
              />

              {/* Mensaje de Pista si se activó */}
              {hintMessage && (
                <div
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid #38BDF8',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    color: '#38BDF8',
                    fontWeight: 700
                  }}
                >
                  Profesor: {hintMessage}
                </div>
              )}

              {/* Pregunta del Jefe */}
              <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#FFFFFF' }}>
                {currentStage.prompt}
              </div>

              {/* Bloque de Código estilo VS Code */}
              <VSCodeSnippet
                code={currentStage.codeSnippet}
                language={pathId}
                filename="bugzilla_exploit.kt"
                highlightLine={highlightCode ? 3 : undefined}
                showLineNumbers={true}
              />

              {/* Opciones de Contraataque (Movimientos Pokémon) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {currentStage.options.map((opt, idx) => {
                  const isDisabled = disabledOptions.includes(idx);
                  const isSelected = selectedOption === idx;

                  return (
                    <button
                      key={idx}
                      disabled={turnState !== 'player_turn' || isDisabled}
                      onClick={() => {
                        soundService.playToken();
                        setSelectedOption(idx);
                      }}
                      style={{
                        background: isSelected
                          ? 'var(--orange-surface)'
                          : isDisabled
                          ? '#0B131B'
                          : '#1E293B',
                        border: `2px solid ${
                          isSelected ? 'var(--orange-main)' : isDisabled ? '#1E293B' : '#334155'
                        }`,
                        borderRadius: '14px',
                        padding: '12px 14px',
                        color: isDisabled ? '#475569' : '#FFFFFF',
                        fontSize: '0.86rem',
                        fontWeight: 800,
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        textAlign: 'left',
                        lineHeight: 1.3,
                        boxShadow: isSelected ? '0 4px 0 #C27100' : '0 2px 0 #0F172A',
                        opacity: isDisabled ? 0.35 : 1,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span
                        style={{
                          color: isSelected ? '#FDE047' : '#94A3B8',
                          fontSize: '0.72rem',
                          display: 'block',
                          marginBottom: '2px'
                        }}
                      >
                        ACCIÓN {idx + 1}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Botón de Ejecutar Contraataque */}
              {turnState === 'player_turn' && (
                <button
                  className="btn-3d btn-orange"
                  disabled={selectedOption === null}
                  onClick={handleExecuteTurn}
                  style={{ padding: '14px 20px', fontSize: '1rem', marginTop: '6px' }}
                >
                  <Swords size={20} /> ¡Ejecutar Contraataque!
                </button>
              )}

              {turnState === 'round_end' && (
                <button
                  className="btn-3d btn-green"
                  onClick={handleNextRound}
                  style={{ padding: '14px 20px', fontSize: '1rem', marginTop: '6px' }}
                >
                  Siguiente Asalto de Combate <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                </button>
              )}
            </div>
          ) : turnState === 'victory' ? (
            /* PANTALLA DE VICTORIA TOTAL */
            <div
              style={{
                textAlign: 'center',
                padding: '24px 16px',
                background: '#0F172A',
                borderRadius: '24px',
                border: '2px solid #10B981',
                boxShadow: '0 0 35px rgba(16, 185, 129, 0.4)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #10B981'
                  }}
                >
                  <Trophy size={40} color="#34D399" />
                </div>
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#34D399', marginBottom: '8px' }}>
                ¡VICTORIA EN EL COLISEO!
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.96rem', marginBottom: '20px', lineHeight: 1.5 }}>
                Has neutralizado a Bugzilla aplicando los parches de código con maestría. La Unidad {unitId + 1} ha
                quedado completamente desbloqueada.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    background: '#1E293B',
                    padding: '10px 20px',
                    borderRadius: '14px',
                    border: '1.5px solid #334155'
                  }}
                >
                  <span style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block' }}>RECOMPENSA</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FBBF24' }}>+100 XP</span>
                </div>
                <div
                  style={{
                    background: '#1E293B',
                    padding: '10px 20px',
                    borderRadius: '14px',
                    border: '1.5px solid #334155'
                  }}
                >
                  <span style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block' }}>BYTES</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#38BDF8' }}>+50 Bytes</span>
                </div>
              </div>

              <button
                className="btn-3d btn-green"
                onClick={onVictory}
                style={{ width: '100%', padding: '16px', fontSize: '1.05rem' }}
              >
                <CheckCircle2 size={20} /> Reclamar Corona y Continuar
              </button>
            </div>
          ) : (
            /* PANTALLA DE DERROTA CON REINTENTO */
            <div
              style={{
                textAlign: 'center',
                padding: '24px 16px',
                background: '#0F172A',
                borderRadius: '24px',
                border: '2px solid #EF4444',
                boxShadow: '0 0 35px rgba(239, 68, 68, 0.4)'
              }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F87171', marginBottom: '8px' }}>
                ¡DESCONEXIÓN POR DAÑO CRÍTICO!
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', marginBottom: '22px', lineHeight: 1.5 }}>
                Tus defensas no resistieron las excepciones de Bugzilla. Usa tus comodines tácticamente o refuerza tus
                conceptos y vuelve al combate.
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  className="btn-3d btn-orange"
                  style={{ flex: 1, padding: '14px', fontSize: '0.95rem' }}
                  onClick={handleRestartBattle}
                >
                  <RefreshCw size={18} /> Reintentar Combate
                </button>
                <button
                  className="btn-3d btn-outline"
                  style={{ flex: 1, padding: '14px', fontSize: '0.95rem' }}
                  onClick={onExit}
                >
                  Retirarse a Estudiar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const BossFightModal = BossFightArena;
export default BossFightArena;
