import React, { useState } from 'react';
import {
  X,
  Target,
  CheckCircle2,
  Gift,
  Sparkles,
  GraduationCap,
  EyeOff,
  ShieldCheck,
  Code2,
  Trophy,
  Zap,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../services/soundService';

type PowerUpKey = 'teacherHint' | 'eliminateOptions' | 'secondChance' | 'codePeek';

interface Quest {
  id: string;
  title: string;
  desc: string;
  current: number;
  target: number;
  rewardXp: number;
  rewardBytes: number;
  powerupKey?: PowerUpKey;
  powerupName?: string;
  claimed: boolean;
}

interface DailyQuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardClaimed: (xp: number, bytes: number, powerupKey?: PowerUpKey) => void;
}

export const DailyQuestsModal: React.FC<DailyQuestsModalProps> = ({
  isOpen,
  onClose,
  onRewardClaimed
}) => {
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 'q1',
      title: 'Dev en Racha',
      desc: 'Completa 2 lecciones en cualquier camino de aprendizaje',
      current: 2,
      target: 2,
      rewardXp: 50,
      rewardBytes: 25,
      powerupKey: 'teacherHint',
      powerupName: '1× Profesor',
      claimed: false
    },
    {
      id: 'q2',
      title: 'Compilador Impecable',
      desc: 'Acierta 5 preguntas seguidas sin cometer errores',
      current: 5,
      target: 5,
      rewardXp: 60,
      rewardBytes: 30,
      powerupKey: 'secondChance',
      powerupName: '1× Escudo',
      claimed: false
    },
    {
      id: 'q3',
      title: 'Repaso en Gimnasio',
      desc: 'Entrena y recarga tus baterías en el Gimnasio de Práctica',
      current: 1,
      target: 1,
      rewardXp: 40,
      rewardBytes: 20,
      powerupKey: 'eliminateOptions',
      powerupName: '1× 50/50',
      claimed: false
    },
    {
      id: 'q4',
      title: 'Mente Analítica',
      desc: 'Resuelve 6 ejercicios de sintaxis o código interactivo',
      current: 4,
      target: 6,
      rewardXp: 80,
      rewardBytes: 40,
      powerupKey: 'codePeek',
      powerupName: '1× Pista Código',
      claimed: false
    }
  ]);

  const [bonusClaimed, setBonusClaimed] = useState(false);

  if (!isOpen) return null;

  const completedCount = quests.filter((q) => q.claimed || q.current >= q.target).length;
  const isMasterChestReady = completedCount >= 3;

  const handleClaim = (questId: string) => {
    soundService.playChest();
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });

    const q = quests.find((item) => item.id === questId);
    if (!q || q.claimed || q.current < q.target) return;

    setQuests((prev) =>
      prev.map((item) => (item.id === questId ? { ...item, claimed: true } : item))
    );
    onRewardClaimed(q.rewardXp, q.rewardBytes, q.powerupKey);
  };

  const handleClaimMasterChest = () => {
    if (bonusClaimed || !isMasterChestReady) return;
    soundService.playChest();
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    setBonusClaimed(true);
    onRewardClaimed(100, 50, 'secondChance');
  };

  const getPowerupIcon = (key?: PowerUpKey) => {
    switch (key) {
      case 'teacherHint':
        return <GraduationCap size={14} color="#38BDF8" strokeWidth={2.4} />;
      case 'eliminateOptions':
        return <EyeOff size={14} color="#F59E0B" strokeWidth={2.4} />;
      case 'secondChance':
        return <ShieldCheck size={14} color="#22C55E" strokeWidth={2.4} />;
      case 'codePeek':
        return <Code2 size={14} color="#A855F7" strokeWidth={2.4} />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '480px',
          background: 'var(--bg-card)',
          border: '2px solid var(--border-color)',
          boxShadow: '0 8px 0 var(--border-shadow)',
          borderRadius: 22,
          padding: '24px 20px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <button
          className="modal-close"
          onClick={() => {
            soundService.playToken();
            onClose();
          }}
          aria-label="Cerrar modal"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Encabezado Duolingo 3D */}
        <div style={{ textAlign: 'center', marginBottom: 18, flexShrink: 0 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              background: 'var(--orange-main)',
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 0 var(--orange-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px auto'
            }}
          >
            <Target size={30} color="#FFFFFF" strokeWidth={2.4} />
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 4px 0' }}>
            Misiones Diarias
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.86rem', fontWeight: 700, margin: 0 }}>
            Supera desafíos de programación para ganar XP, Bytes y Comodines
          </p>
        </div>

        {/* Meta Diaria: Gran Cofre Maestro */}
        <div
          style={{
            background: '#14202E',
            border: '2px solid var(--border-color)',
            boxShadow: '0 4px 0 var(--border-shadow)',
            borderRadius: 18,
            padding: '14px 16px',
            marginBottom: 16,
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Trophy size={18} color="#F59E0B" strokeWidth={2.5} />
              <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#FFFFFF' }}>
                Cofre Maestro del Día
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#F59E0B' }}>
              {Math.min(3, completedCount)} / 3 Misiones
            </span>
          </div>

          {/* Barra de progreso de la meta diaria */}
          <div style={{ height: 12, background: '#0B131C', borderRadius: 999, overflow: 'hidden', marginBottom: 8 }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, (completedCount / 3) * 100)}%`,
                background: isMasterChestReady ? 'var(--green-main)' : 'var(--orange-main)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>

          {isMasterChestReady ? (
            <button
              disabled={bonusClaimed}
              className={`btn-3d ${bonusClaimed ? 'btn-disabled' : 'btn-green'}`}
              style={{ padding: '9px 14px', fontSize: '0.85rem', width: '100%' }}
              onClick={handleClaimMasterChest}
            >
              {bonusClaimed ? (
                <>
                  <CheckCircle2 size={16} strokeWidth={2.5} /> ¡Cofre Maestro Reclamado!
                </>
              ) : (
                <>
                  <Sparkles size={16} strokeWidth={2.5} /> ¡Abrir Cofre Maestro (+100 XP)!
                </>
              )}
            </button>
          ) : (
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textAlign: 'center' }}>
              Completa {Math.max(0, 3 - completedCount)} misión más para desbloquear el cofre
            </div>
          )}
        </div>

        {/* Lista de Misiones con Scroll Suave */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingRight: 4
          }}
        >
          {quests.map((quest) => {
            const isReady = quest.current >= quest.target;
            const percentage = Math.min(100, Math.round((quest.current / quest.target) * 100));

            return (
              <div
                key={quest.id}
                style={{
                  background: isReady && !quest.claimed ? 'rgba(34, 197, 94, 0.08)' : '#14202E',
                  border: `2px solid ${isReady && !quest.claimed ? 'var(--green-main)' : 'var(--border-color)'}`,
                  boxShadow:
                    isReady && !quest.claimed ? '0 4px 0 var(--green-dark)' : '0 4px 0 var(--border-shadow)',
                  borderRadius: 16,
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  transition: 'transform 0.1s ease'
                }}
              >
                {/* Título y Recompensas */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ fontWeight: 900, fontSize: '0.94rem', color: '#FFFFFF' }}>{quest.title}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
                    <span
                      style={{
                        background: 'rgba(250, 204, 21, 0.15)',
                        border: '1.5px solid rgba(250, 204, 21, 0.35)',
                        borderRadius: 8,
                        padding: '2px 7px',
                        color: 'var(--yellow-main)',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3
                      }}
                    >
                      <Star size={11} fill="#FACC15" color="#FACC15" /> +{quest.rewardXp}
                    </span>
                    <span
                      style={{
                        background: 'rgba(6, 182, 212, 0.15)',
                        border: '1.5px solid rgba(6, 182, 212, 0.35)',
                        borderRadius: 8,
                        padding: '2px 7px',
                        color: 'var(--cyan-main)',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3
                      }}
                    >
                      <Zap size={11} fill="#06B6D4" color="#06B6D4" /> +{quest.rewardBytes}
                    </span>
                    {quest.powerupName && (
                      <span
                        style={{
                          background: 'rgba(56, 189, 248, 0.15)',
                          border: '1.5px solid rgba(56, 189, 248, 0.35)',
                          borderRadius: 8,
                          padding: '2px 7px',
                          color: '#38BDF8',
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                      >
                        {getPowerupIcon(quest.powerupKey)}
                        {quest.powerupName}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 700, lineHeight: 1.35 }}>
                  {quest.desc}
                </div>

                {/* Barra de progreso */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2 }}>
                  <div style={{ flex: 1, height: 10, background: '#0B131C', borderRadius: 999, overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: isReady ? 'var(--green-main)' : 'var(--orange-main)',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#E2E8F0', minWidth: 32, textAlign: 'right' }}>
                    {quest.current}/{quest.target}
                  </span>
                </div>

                {/* Botón Reclamar */}
                {isReady && (
                  <button
                    disabled={quest.claimed}
                    className={`btn-3d ${quest.claimed ? 'btn-disabled' : 'btn-green'}`}
                    style={{ padding: '9px 14px', fontSize: '0.85rem', marginTop: 4 }}
                    onClick={() => handleClaim(quest.id)}
                  >
                    {quest.claimed ? (
                      <>
                        <CheckCircle2 size={16} strokeWidth={2.5} /> Recompensa Reclamada
                      </>
                    ) : (
                      <>
                        <Gift size={16} strokeWidth={2.5} /> Reclamar Botín y Comodín
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
