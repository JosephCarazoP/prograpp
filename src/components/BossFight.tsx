import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Target,
  RefreshCw,
  Swords,
  HelpCircle,
  Heart,
  ChevronRight,
  Zap,
  Terminal,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../services/soundService';
import { UserProfile, UserPowerUps } from '../types/user';
import { PowerUpsBar } from './PowerUpsBar';
import { FormattedText } from './FormattedText';
import { BossAvatar3D, BossPose } from './BossAvatar3D';
import {
  getBossChallengeForUnit,
  BossData,
  BossStageChallenge,
  BossPatchOption
} from '../content/bossChallenges';

interface BossFightProps {
  user: UserProfile;
  bossId?: string;
  unitId?: number;
  pathId?: 'kotlin' | 'sql';
  onVictory: () => void;
  onExit: () => void;
  onUsePowerUp?: (key: keyof UserPowerUps) => void;
}

/**
 * Avatar 3D de la Terminal / Servidor del Jugador (Duolingo 3D + Neo-Brutalism)
 */
const PlayerServerAvatar3D: React.FC<{
  isHurt: boolean;
  isAttacking: boolean;
  hasShield: boolean;
  size?: number;
}> = ({ isHurt, isAttacking, hasShield, size = 68 }) => {
  return (
    <div
      className={`boss-player-avatar-wrap ${isHurt ? 'is-hurt' : ''} ${isAttacking ? 'is-attacking' : ''}`}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        style={{
          overflow: 'visible',
          filter: isHurt
            ? 'drop-shadow(0 0 10px #FF2A6D)'
            : 'drop-shadow(3px 3px 0px #000000)'
        }}
      >
        {/* Antena 3D */}
        <rect x="37" y="6" width="6" height="12" rx="3" fill="#0284C7" stroke="#000000" strokeWidth="2.5" />
        <circle cx="40" cy="6" r="5.5" fill="#FFE600" stroke="#000000" strokeWidth="2" />
        <circle cx="39" cy="4.5" r="1.5" fill="#FFFFFF" />

        {/* Chasis 3D del Robot / Servidor */}
        <rect x="12" y="16" width="56" height="50" rx="14" fill="#00E5FF" stroke="#000000" strokeWidth="3" />
        <line x1="20" y1="20" x2="60" y2="20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.85" />

        {/* Visor / Pantalla CRT */}
        <rect x="18" y="24" width="44" height="30" rx="8" fill="#0F172A" stroke="#000000" strokeWidth="2.5" />

        {/* Expresión facial del jugador */}
        {isHurt ? (
          <g stroke="#FF2A6D" strokeWidth="2.5" strokeLinecap="round">
            <line x1="26" y1="34" x2="33" y2="41" />
            <line x1="33" y1="34" x2="26" y2="41" />
            <line x1="47" y1="34" x2="54" y2="41" />
            <line x1="54" y1="34" x2="47" y2="41" />
            <path d="M36 47 Q40 43 44 47" stroke="#FF2A6D" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          <g>
            <ellipse cx="29" cy="37" rx="4.5" ry="5.5" fill="#4ADE80" />
            <circle cx="31" cy="35" r="1.8" fill="#FFFFFF" />
            <ellipse cx="51" cy="37" rx="4.5" ry="5.5" fill="#4ADE80" />
            <circle cx="53" cy="35" r="1.8" fill="#FFFFFF" />
            <path d="M35 45 Q40 50 45 45" stroke="#4ADE80" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* Pedestal base del servidor */}
        <rect x="22" y="64" width="36" height="8" rx="3" fill="#0F172A" stroke="#000000" strokeWidth="2.5" />
      </svg>

      {hasShield && (
        <div
          className="boss-quantum-shield-badge"
          title="Escudo Cuántico Activo: Tu próximo fallo será protegido"
        >
          🛡️
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// ARENA DE COMBATE 100% NEO-BRUTALISM CON DUOLINGO 3D
// ─────────────────────────────────────────────────────────────

export const BossFightArena: React.FC<BossFightProps> = ({
  user,
  unitId = 1,
  pathId = 'kotlin',
  onVictory,
  onExit,
  onUsePowerUp
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Datos del Jefe según la ruta y la unidad
  const bossData: BossData = useMemo(() => {
    return getBossChallengeForUnit(pathId, unitId);
  }, [pathId, unitId]);

  // Salud del Jugador y del Jefe (100 HP base)
  const [playerHp, setPlayerHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);

  // Asalto actual (0, 1, 2)
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage: BossStageChallenge = bossData.stages[currentStageIndex] || bossData.stages[0];

  // Opciones barajadas con índices estables
  const [shuffledOptions, setShuffledOptions] = useState<{ originalIndex: number; option: BossPatchOption }[]>([]);
  const [selectedPatchIndex, setSelectedPatchIndex] = useState<number | null>(null);

  // Estados de combate
  const [turnState, setTurnState] = useState<
    'player_turn' | 'player_attacking' | 'boss_attacking' | 'round_end' | 'game_over' | 'victory'
  >('player_turn');

  const [feedbackMessage, setFeedbackMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // Comodines activos
  const [disabledOptions, setDisabledOptions] = useState<number[]>([]);
  const [isSecondChanceActive, setIsSecondChanceActive] = useState(false);
  const [teacherHintActive, setTeacherHintActive] = useState<string | null>(null);

  // Barajar opciones al cambiar de asalto
  useEffect(() => {
    if (!currentStage) return;
    const mapped = currentStage.options.map((opt, idx) => ({ originalIndex: idx, option: opt }));
    for (let i = mapped.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
    }
    setShuffledOptions(mapped);
    setSelectedPatchIndex(null);
    setDisabledOptions([]);
    setTeacherHintActive(null);
    setFeedbackMessage(null);
  }, [currentStageIndex, currentStage]);

  // Onboarding / Introducción cinemática del combate
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [introStep, setIntroStep] = useState<1 | 2>(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      soundService.playBossAlert();
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // Atajos de teclado (1, 2, 3 para elegir opción, Enter para atacar o avanzar en intro)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntroModal) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (introStep === 1) {
            soundService.playToken();
            setIntroStep(2);
          } else {
            soundService.playCorrect();
            setShowIntroModal(false);
          }
        } else if (e.key === 'Escape') {
          soundService.playCorrect();
          setShowIntroModal(false);
        }
        return;
      }

      if (turnState !== 'player_turn') {
        if (turnState === 'round_end' && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleNextRound();
        }
        return;
      }

      if (e.key === '1' && shuffledOptions[0] && !disabledOptions.includes(0)) {
        handleSelectOption(0);
      } else if (e.key === '2' && shuffledOptions[1] && !disabledOptions.includes(1)) {
        handleSelectOption(1);
      } else if (e.key === '3' && shuffledOptions[2] && !disabledOptions.includes(2)) {
        handleSelectOption(2);
      } else if (e.key === 'Enter' && selectedPatchIndex !== null) {
        handleLaunchAttack();
      } else if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntroModal, introStep, turnState, shuffledOptions, disabledOptions, selectedPatchIndex]);

  // Selección de opción de parche
  const handleSelectOption = (idx: number) => {
    if (disabledOptions.includes(idx) || turnState !== 'player_turn') return;
    soundService.playToken();
    setSelectedPatchIndex(idx);
    setFeedbackMessage(null);
  };

  // Ataque del jugador
  const handleLaunchAttack = () => {
    if (selectedPatchIndex === null || turnState !== 'player_turn') return;

    const chosen = shuffledOptions[selectedPatchIndex];

    if (chosen.originalIndex === currentStage.correctOptionIndex) {
      // ✅ ACIERTO: Impacto crítico en el jefe
      soundService.playCorrect();
      setTurnState('player_attacking');
      setFeedbackMessage({
        text: `💥 ¡GOLPE CRÍTICO! Aplicaste la solución adecuada y ${bossData.name} recibe -${currentStage.damageToBoss}% de daño.`,
        isError: false
      });

      setTimeout(() => {
        const nextBossHp = Math.max(0, bossHp - currentStage.damageToBoss);
        setBossHp(nextBossHp);

        if (nextBossHp <= 0) {
          soundService.playWin();
          confetti({
            particleCount: 180,
            spread: 120,
            origin: { y: 0.5 },
            colors: ['#00E5FF', '#4ADE80', '#FFE600', '#FF2A6D', '#A855F7']
          });
          setTurnState('victory');
        } else {
          setTurnState('round_end');
        }
      }, 650);
    } else {
      // ❌ ERROR: Parche equivocado
      if (isSecondChanceActive) {
        soundService.playWin();
        setIsSecondChanceActive(false);
        setDisabledOptions((prev) => [...prev, selectedPatchIndex]);
        setSelectedPatchIndex(null);
        setFeedbackMessage({
          text: '🛡️ ¡Escudo Cuántico activado! Absorbió el contraataque del jefe sin daños a tu servidor. Elige otra alternativa.',
          isError: false
        });
        return;
      }

      soundService.playError();
      setTurnState('boss_attacking');
      setFeedbackMessage({
        text: `⚠️ ¡Esa no es la solución correcta! ${bossData.name} contraatacó y perdiste -${currentStage.counterDamageToPlayer} HP de tu servidor.`,
        isError: true
      });

      setTimeout(() => {
        const nextPlayerHp = Math.max(0, playerHp - currentStage.counterDamageToPlayer);
        setPlayerHp(nextPlayerHp);

        if (nextPlayerHp <= 0) {
          soundService.playError();
          setTurnState('game_over');
        } else {
          setTurnState('player_turn');
          setDisabledOptions((prev) => [...prev, selectedPatchIndex]);
          setSelectedPatchIndex(null);
        }
      }, 650);
    }
  };

  // Pasar al siguiente asalto
  const handleNextRound = () => {
    if (currentStageIndex < bossData.stages.length - 1 && bossHp > 0) {
      soundService.playToken();
      setCurrentStageIndex((prev) => prev + 1);
      setTurnState('player_turn');
      setFeedbackMessage(null);
    } else if (bossHp <= 0) {
      onVictory();
    }
  };

  // Reiniciar combate
  const handleRestartBattle = () => {
    soundService.playToken();
    setPlayerHp(100);
    setBossHp(100);
    setCurrentStageIndex(0);
    setTurnState('player_turn');
    setFeedbackMessage(null);
  };

  // Uso de comodines
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
      setTeacherHintActive(currentStage.teacherHint);
    } else if (key === 'eliminateOptions') {
      soundService.playCorrect();
      const wrongIndices = shuffledOptions
        .map((item, idx) => ({ ...item, currentIdx: idx }))
        .filter((item) => item.originalIndex !== currentStage.correctOptionIndex)
        .map((item) => item.currentIdx);
      const toDisable = wrongIndices.slice(0, 1);
      setDisabledOptions((prev) => Array.from(new Set([...prev, ...toDisable])));
      setFeedbackMessage({
        text: '✂️ 50/50: Se descartó una opción errónea.',
        isError: false
      });
    } else if (key === 'secondChance') {
      soundService.playCorrect();
      setIsSecondChanceActive(true);
      setFeedbackMessage({
        text: '🛡️ Escudo Cuántico activo: Tu próximo fallo será protegido contra daño.',
        isError: false
      });
    }
  };

  // Determinar pose del jefe según el estado del turno
  const currentBossPose: BossPose =
    bossHp <= 0
      ? 'defeated'
      : turnState === 'player_attacking'
      ? 'hurt'
      : turnState === 'boss_attacking'
      ? 'attack'
      : 'idle';

  const codeLines = currentStage ? currentStage.codeSnippet.split('\n') : [];

  return (
    <div className="boss-arena-clean-screen">
      {isLoading ? (
        <div className="boss-arena-loading">
          <div className="boss-arena-loading-icon">
            <Swords size={42} color="#000000" strokeWidth={2.8} />
          </div>
          <span className="boss-arena-loading-text">Cargando Arena de Combate...</span>
        </div>
      ) : (
        <div className="boss-arena-clean-container">
          {/* ════ 1. BARRA SUPERIOR NEO-BRUTALISTA ════ */}
          <header className="boss-arena-clean-topbar">
            <button type="button" onClick={onExit} className="boss-clean-back-btn" title="Volver al mapa">
              <ArrowLeft size={16} strokeWidth={3} />
              <span>Salir</span>
            </button>

            <div className="boss-clean-header-title">
              <span className="boss-clean-unit-tag">
                UNIDAD {unitId} · {pathId === 'sql' ? 'BASE DE DATOS SQL' : 'KOTLIN'}
              </span>
              <h1 className="boss-clean-name">{bossData.name}</h1>
            </div>

            <div className="boss-clean-top-actions">
              <button
                type="button"
                onClick={() => {
                  soundService.playToken();
                  setIntroStep(2);
                  setShowIntroModal(true);
                }}
                className="boss-clean-help-btn"
                title="Ver reglas y mecánicas de combate"
              >
                <HelpCircle size={15} strokeWidth={2.8} />
                <span className="boss-btn-text-desktop">Reglas</span>
              </button>

              <div className="boss-clean-round-badge">
                <Target size={14} strokeWidth={2.8} />
                <span>
                  Asalto {currentStageIndex + 1}/{bossData.stages.length}
                </span>
              </div>
            </div>
          </header>

          {/* ════ 2. DUAL FIGHTER HUD: DUOLINGO 3D + NEO-BRUTALISM ════ */}
          <section className="boss-clean-dual-hud" aria-label="Marcador de combate">
            {/* LADO JEFE */}
            <div className="boss-hud-fighter-side boss">
              <div className="boss-hud-avatar-box">
                <BossAvatar3D
                  avatarType={bossData.avatarType}
                  primaryColor={bossData.primaryColor}
                  accentColor={bossData.accentColor}
                  pose={currentBossPose}
                  size={76}
                  showPedestal={true}
                />
              </div>

              <div className="boss-hud-info">
                <div className="boss-hud-name-row">
                  <span className="boss-hud-fighter-name">{bossData.name}</span>
                  <span className="boss-hud-hp-num boss">{Math.round(bossHp)}% HP</span>
                </div>
                <div className="boss-clean-hp-track">
                  <div
                    className="boss-clean-hp-fill boss"
                    style={{ width: `${Math.max(0, Math.min(100, bossHp))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* BADGE CENTRAL VS */}
            <div className="boss-clean-vs-badge" aria-hidden="true">
              <span>VS</span>
            </div>

            {/* LADO JUGADOR */}
            <div className="boss-hud-fighter-side player">
              <div className="boss-hud-avatar-box player">
                <PlayerServerAvatar3D
                  isHurt={turnState === 'boss_attacking'}
                  isAttacking={turnState === 'player_attacking'}
                  hasShield={isSecondChanceActive}
                  size={64}
                />
              </div>

              <div className="boss-hud-info">
                <div className="boss-hud-name-row">
                  <span className="boss-hud-fighter-name">TU SERVIDOR</span>
                  <span className="boss-hud-hp-num player">{playerHp}/100 HP</span>
                </div>
                <div className="boss-clean-hp-track">
                  <div
                    className="boss-clean-hp-fill player"
                    style={{ width: `${Math.max(0, Math.min(100, playerHp))}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ════ 3. TARJETA MAESTRA DEL DESAFÍO: NEO-BRUTALISM ════ */}
          <main className="boss-clean-challenge-card">
            {/* ENCABEZADO DE SITUACIÓN Y FALLA DETECTADA */}
            <div className="boss-clean-prompt-header">
              <div className="boss-clean-alert-pill">
                <AlertTriangle size={14} color="#000000" strokeWidth={3} />
                <span>FALLA CRÍTICA EN PRODUCCIÓN · ASALTO {currentStageIndex + 1} DE {bossData.stages.length}</span>
              </div>
              <h2 className="boss-clean-prompt-text">{currentStage.prompt}</h2>
            </div>

            {/* PISTA DEL DOCENTE (SI FUE ACTIVADA POR COMODÍN) */}
            {teacherHintActive && (
              <div className="boss-clean-hint-banner">
                <span className="hint-icon">💡</span>
                <div>
                  <strong className="hint-label">Pista del Docente:</strong> {teacherHintActive}
                </div>
              </div>
            )}

            {/* CONSOLA DE CÓDIGO (TERMINAL ESTILO NEO-BRUTAL CON PREVIEW EN VIVO) */}
            <div className="boss-clean-code-wrapper">
              <div className="boss-clean-code-header">
                <div className="boss-clean-code-dots">
                  <span className="boss-clean-code-dot red" />
                  <span className="boss-clean-code-dot yellow" />
                  <span className="boss-clean-code-dot green" />
                </div>
                <span className="boss-clean-code-filename">
                  servidor_{pathId}.{pathId === 'sql' ? 'sql' : 'kt'}
                </span>
                <span className="boss-clean-code-lang">
                  {pathId === 'sql' ? 'SQLite v3.45' : 'Kotlin 2.0'}
                </span>
              </div>

              <div className="boss-clean-code-body">
                {codeLines.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isTarget = lineNum === currentStage.targetLine;
                  const isPreviewing = isTarget && selectedPatchIndex !== null;

                  return (
                    <div
                      key={idx}
                      className={`boss-clean-code-row ${isTarget ? 'is-target-line' : ''} ${
                        isPreviewing ? 'is-previewing' : ''
                      }`}
                    >
                      <span className="boss-clean-code-num">{String(lineNum).padStart(2, '0')}</span>
                      <span className="boss-clean-code-text">
                        {isPreviewing ? shuffledOptions[selectedPatchIndex].option.code : line}
                      </span>
                      {isPreviewing ? (
                        <span className="boss-clean-preview-tag">⚡ PARCHE APLICADO</span>
                      ) : isTarget ? (
                        <span className="boss-clean-bug-tag">⚠️ LÍNEA CON ERROR</span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECCIÓN DE OPCIONES DE PARCHE (A, B, C) */}
            <div className="boss-clean-options-section">
              <div className="boss-clean-options-header">
                <span className="boss-clean-options-instruction">
                  Selecciona la corrección adecuada:
                </span>
                <span className="boss-clean-options-shortcut-hint">
                  [Presiona 1, 2 o 3 en tu teclado]
                </span>
              </div>

              <div className="boss-clean-options-list">
                {shuffledOptions.map((item, idx) => {
                  const letter = String.fromCharCode(65 + idx); // A, B, C
                  const isSelected = selectedPatchIndex === idx;
                  const isDisabled = disabledOptions.includes(idx);

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isDisabled || turnState !== 'player_turn'}
                      onClick={() => handleSelectOption(idx)}
                      className={`boss-clean-option-btn ${isSelected ? 'selected' : ''} ${
                        isDisabled ? 'disabled' : ''
                      }`}
                    >
                      <div className="boss-clean-option-badge">
                        {isSelected ? <Check size={16} strokeWidth={3.5} /> : letter}
                      </div>
                      <div className="boss-clean-option-content">
                        <div className="boss-clean-option-code">
                          <FormattedText text={item.option.code} inline dark={false} />
                        </div>
                        <span className="boss-clean-option-desc">{item.option.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BANNER DE IMPACTO Y FEEDBACK */}
            {feedbackMessage && (
              <div
                className={`boss-clean-feedback-banner ${feedbackMessage.isError ? 'error' : 'success'}`}
                role="alert"
              >
                <div className="feedback-icon-box">
                  {feedbackMessage.isError ? (
                    <AlertTriangle size={20} strokeWidth={3} />
                  ) : (
                    <Sparkles size={20} strokeWidth={3} />
                  )}
                </div>
                <span className="feedback-text">{feedbackMessage.text}</span>
              </div>
            )}

            {/* BOTÓN PRINCIPAL DE ACCIÓN: ATACAR O SIGUIENTE ASALTO */}
            {turnState === 'round_end' ? (
              <button
                type="button"
                onClick={handleNextRound}
                className="boss-clean-attack-btn next-round"
              >
                <span>Siguiente Asalto ({currentStageIndex + 2}/{bossData.stages.length})</span>
                <ChevronRight size={22} strokeWidth={3} />
              </button>
            ) : (
              <button
                type="button"
                disabled={selectedPatchIndex === null || turnState !== 'player_turn'}
                onClick={handleLaunchAttack}
                className="boss-clean-attack-btn"
              >
                <Swords size={22} strokeWidth={3} />
                <span>
                  {selectedPatchIndex === null
                    ? 'Elige una opción arriba para atacar'
                    : '⚔️ Compilar y Atacar al Jefe'}
                </span>
              </button>
            )}
          </main>

          {/* ════ 4. BARRA DE COMODINES INFERIOR ════ */}
          <footer className="boss-clean-powerups-wrap">
            <PowerUpsBar
              powerups={user.powerups}
              onUsePowerUp={handlePowerUp}
              isSecondChanceActive={isSecondChanceActive}
              disabled={turnState !== 'player_turn'}
              compact={true}
              showSecondChance={true}
            />
          </footer>

          {/* ════ 5. MODAL DE VICTORIA TOTAL ════ */}
          {turnState === 'victory' && (
            <div className="boss-clean-modal-overlay">
              <div className="boss-clean-result-card victory">
                <div className="boss-clean-trophy-circle">
                  <Trophy size={48} color="#000000" strokeWidth={3} />
                </div>
                <div className="boss-clean-badge-pill victory">SISTEMA RESTAURADO</div>
                <h3 className="boss-clean-result-title">¡JEFE DERROTADO!</h3>
                <p className="boss-clean-result-p">
                  Has neutralizado con maestría a <strong>{bossData.name}</strong> aplicando la lógica correcta en cada
                  asalto. ¡El servidor de la Unidad {unitId} está completamente a salvo!
                </p>

                <div className="boss-clean-rewards-row">
                  <div className="boss-clean-reward-item xp">
                    <span className="label">EXPERIENCIA</span>
                    <span className="value">+120 XP</span>
                  </div>
                  <div className="boss-clean-reward-item bytes">
                    <span className="label">BYTES</span>
                    <span className="value">+60 Bytes</span>
                  </div>
                  <div className="boss-clean-reward-item crown">
                    <span className="label">CORONA</span>
                    <span className="value">Unidad {unitId}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onVictory}
                  className="boss-clean-action-btn victory"
                >
                  <CheckCircle2 size={22} strokeWidth={3} />
                  <span>Continuar y Reclamar Victoria</span>
                </button>
              </div>
            </div>
          )}

          {/* ════ 6. MODAL DE DERROTA ════ */}
          {turnState === 'game_over' && (
            <div className="boss-clean-modal-overlay">
              <div className="boss-clean-result-card defeat">
                <div className="boss-clean-defeat-circle">
                  <AlertTriangle size={44} color="#000000" strokeWidth={3} />
                </div>
                <div className="boss-clean-badge-pill defeat">CONSOLA DAÑADA</div>
                <h3 className="boss-clean-result-title">¡SERVIDOR COLAPSADO!</h3>
                <p className="boss-clean-result-p">
                  Las excepciones de <strong>{bossData.name}</strong> agotaron los recursos de tu servidor.
                  ¡No te rindas! Analiza detenidamente el código o utiliza tus comodines para protegerte.
                </p>

                <div className="boss-clean-btn-duo">
                  <button
                    type="button"
                    onClick={handleRestartBattle}
                    className="boss-clean-action-btn retry"
                  >
                    <RefreshCw size={18} strokeWidth={3} />
                    <span>Reintentar Combate</span>
                  </button>
                  <button
                    type="button"
                    onClick={onExit}
                    className="boss-clean-action-btn exit"
                  >
                    <span>Volver al Mapa</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════ 7. MODAL DE INTRODUCCIÓN Y REGLAS (ONBOARDING CINEMÁTICO) ════ */}
      {showIntroModal && (
        <div className="boss-intro-backdrop">
          <div className="boss-intro-card">
            {/* Cabecera del aviso */}
            <div className="boss-intro-header">
              <div className={`boss-intro-alert-pill ${introStep === 2 ? 'green' : ''}`}>
                {introStep === 1 ? (
                  <>
                    <AlertTriangle size={15} color="#000000" strokeWidth={3} />
                    <span>¡AMENAZA DETECTADA EN EL SISTEMA!</span>
                  </>
                ) : (
                  <>
                    <Zap size={15} color="#000000" strokeWidth={3} />
                    <span>MANUAL RÁPIDO DE COMBATE</span>
                  </>
                )}
              </div>
              <span className="boss-intro-step-pill">Paso {introStep} de 2</span>
            </div>

            {introStep === 1 ? (
              /* PASO 1: PRESENTACIÓN DEL JEFE */
              <>
                <div className="boss-intro-hero-section">
                  <div
                    className="boss-intro-avatar-frame"
                    style={{ borderColor: bossData.primaryColor }}
                  >
                    <BossAvatar3D
                      avatarType={bossData.avatarType}
                      primaryColor={bossData.primaryColor}
                      accentColor={bossData.accentColor}
                      pose="idle"
                      size={118}
                      showPedestal={true}
                    />
                  </div>

                  <h2 className="boss-intro-title">
                    ¡Se ha manifestado{' '}
                    <span style={{ color: bossData.primaryColor }}>{bossData.name}</span>!
                  </h2>

                  <span className="boss-intro-threat-badge">
                    AMENAZA DE UNIDAD {unitId} · {pathId.toUpperCase()}
                  </span>
                </div>

                <div className="boss-intro-lore-box">
                  <p className="boss-intro-lore-text">"{bossData.description}"</p>
                  <p className="boss-intro-mission-text">
                    👾 Ha corrompido el servidor de{' '}
                    <strong>{pathId === 'sql' ? 'Base de Datos SQL' : 'Aplicación Kotlin'}</strong>. Debes neutralizarlo
                    encontrando los bugs en el código y aplicando los parches adecuados antes de que destruya tu sistema.
                  </p>
                </div>

                <div className="boss-intro-actions">
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playToken();
                      setIntroStep(2);
                    }}
                    className="boss-intro-btn-primary"
                  >
                    <span>¿Cómo jugar y ganar?</span>
                    <ChevronRight size={18} strokeWidth={3} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playCorrect();
                      setShowIntroModal(false);
                    }}
                    className="boss-intro-btn-secondary"
                  >
                    Saltar al combate ⚔️
                  </button>
                </div>
              </>
            ) : (
              /* PASO 2: REGLAS DE COMBATE (VIDA, SERVIDOR Y PARCHES) */
              <>
                <div className="boss-intro-hero-section" style={{ gap: '4px' }}>
                  <h2 className="boss-intro-title" style={{ fontSize: '1.35rem' }}>
                    ¿Cómo Funciona la Batalla?
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#475569', fontWeight: 800 }}>
                    Aprende a gestionar las barras de vida y el sistema de parches:
                  </p>
                </div>

                <div className="boss-intro-rules-list">
                  {/* REGLA 1: VIDA DEL JEFE */}
                  <div className="boss-intro-rule-card">
                    <div className="boss-intro-rule-icon boss">
                      <Target size={20} color="#000000" strokeWidth={3} />
                    </div>
                    <div className="boss-intro-rule-content">
                      <div className="boss-intro-rule-title-row">
                        <span className="boss-intro-rule-title">1. Derrota al Jefe (100% HP)</span>
                        <span className="boss-intro-rule-tag boss">Objetivo</span>
                      </div>
                      <span className="boss-intro-rule-desc">
                        Cada parche correcto daña al jefe (-35% HP). Tienes 3 asaltos para reducir su vida a 0% y salvar el sistema.
                      </span>
                    </div>
                  </div>

                  {/* REGLA 2: TU SERVIDOR / TU VIDA */}
                  <div className="boss-intro-rule-card">
                    <div className="boss-intro-rule-icon player">
                      <Heart size={20} color="#000000" strokeWidth={3} />
                    </div>
                    <div className="boss-intro-rule-content">
                      <div className="boss-intro-rule-title-row">
                        <span className="boss-intro-rule-title">2. Protege tu Servidor (100 HP)</span>
                        <span className="boss-intro-rule-tag player">Tu Vida</span>
                      </div>
                      <span className="boss-intro-rule-desc">
                        ¡Cuidado! Si eliges una opción con errores, el jefe contraatacará (-25 HP). ¡Si tu vida llega a 0 HP, perderás!
                      </span>
                    </div>
                  </div>

                  {/* REGLA 3: MECÁNICA DE PARCHEO */}
                  <div className="boss-intro-rule-card">
                    <div className="boss-intro-rule-icon action">
                      <Terminal size={20} color="#000000" strokeWidth={3} />
                    </div>
                    <div className="boss-intro-rule-content">
                      <div className="boss-intro-rule-title-row">
                        <span className="boss-intro-rule-title">3. Inspecciona, Elige y Ataca</span>
                        <span className="boss-intro-rule-tag action">Mecánica</span>
                      </div>
                      <span className="boss-intro-rule-desc">
                        Toca las opciones (A, B o C) para ver el parche propuesto en vivo en el código. Luego presiona "Compilar y Atacar".
                      </span>
                    </div>
                  </div>
                </div>

                <div className="boss-intro-actions">
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playCorrect();
                      setShowIntroModal(false);
                    }}
                    className="boss-intro-btn-primary"
                  >
                    <Swords size={20} strokeWidth={3} />
                    <span>¡ENTENDIDO, A PELEAR!</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playToken();
                      setIntroStep(1);
                    }}
                    className="boss-intro-btn-secondary"
                  >
                    ← Volver a ver al jefe
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const BossFightModal = BossFightArena;
export default BossFightArena;
