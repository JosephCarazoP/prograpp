import React from 'react';
import {
  Star,
  Gift,
  ShieldAlert,
  CheckCircle2,
  Lock,
  BookOpen,
  Sparkles,
  Swords,
  Trophy
} from 'lucide-react';
import { Unit, Lesson } from '../types/lesson';
import { UserProfile } from '../types/user';
import { LessonProgress } from '../types/progress';
import { soundService } from '../services/soundService';
import { progressionEngine, TrackNode, ProgressionChestRewards } from '../services/progressionEngine';
import { DevRoadmapCharacter, DevRoadmapAction } from './DevRoadmapCharacter';

interface LearningPathProps {
  units: Unit[];
  user: UserProfile;
  progress: Record<string, LessonProgress>;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenChest: (chestId: string, rewards?: ProgressionChestRewards) => void;
  onOpenBoss: (bossId: string, unit: Unit) => void;
  onOpenTheory?: (lesson: Lesson) => void;
  onLockedNotice?: (title: string, message: string) => void;
}

// Dev aparece en niveles específicos del roadmap realizando acciones variadas
const getDevCompanionForNode = (
  nodeIndex: number,
  offsetX: number
): { action: DevRoadmapAction; side: 'left' | 'right' } | null => {
  // Alterna al lado opuesto del serpenteo para equilibrar la composición visual
  const side: 'left' | 'right' = offsetX < 0 ? 'right' : offsetX > 0 ? 'left' : (nodeIndex % 2 === 0 ? 'right' : 'left');

  switch (nodeIndex) {
    case 1:
      return { action: 'reading', side };      // Nivel 2: Leyendo documentación
    case 4:
      return { action: 'thinking', side };     // Nivel 5: Pensando solución
    case 7:
      return { action: 'studying', side };     // Nivel 8: Estudiando conceptos
    case 10:
      return { action: 'looking', side };      // Nivel 11: Inspeccionando con lupa
    case 13:
      return { action: 'progress', side };     // Nivel 14: Revisando checklist
    case 16:
      return { action: 'coding', side };       // Nivel 17: Programando en vivo
    case 18:
      return { action: 'resting', side };      // Nivel 19: Descanso con café
    default:
      return null;
  }
};

export const LearningPath: React.FC<LearningPathProps> = ({
  units,
  user,
  progress,
  onSelectLesson,
  onOpenChest,
  onOpenBoss,
  onOpenTheory,
  onLockedNotice
}) => {
  const safeProgress = progress || {};

  return (
    <div
      className="path-container"
      style={{
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        padding: '16px 12px 120px 12px',
        boxSizing: 'border-box'
      }}
    >
      {(units || []).map((unit) => {
        const isUnitUnlocked = progressionEngine.isUnitUnlocked(unit.id, user.currentPath, user);
        const track: TrackNode[] = progressionEngine.getUnitTrack(unit, user.currentPath);

        return (
          <div
            key={unit.id}
            style={{
              width: '100%',
              marginBottom: '36px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxSizing: 'border-box'
            }}
          >
            {/* Encabezado Banner de Unidad estilo Duolingo 3D (Perfectamente centrado en Mobile & Desktop) */}
            <div
              className="unit-card-banner"
              style={{
                width: '100%',
                maxWidth: '460px',
                boxSizing: 'border-box',
                background: isUnitUnlocked ? unit.color : '#64748B',
                padding: '18px 20px',
                borderRadius: '22px',
                color: '#FFFFFF',
                marginBottom: '28px',
                boxShadow: isUnitUnlocked ? '0 6px 0 rgba(0,0,0,0.22)' : '0 4px 0 #475569',
                border: '2px solid',
                borderColor: isUnitUnlocked ? 'rgba(255,255,255,0.3)' : '#94A3B8',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: isUnitUnlocked ? 1 : 0.85,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ flex: 1, minWidth: 0, paddingRight: '12px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.76rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.7px',
                    background: 'rgba(0, 0, 0, 0.18)',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    marginBottom: '6px'
                  }}
                >
                  <span>Unidad {unit.id}</span>
                </div>
                <h2
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    margin: '0 0 4px 0',
                    lineHeight: 1.25,
                    color: '#FFFFFF'
                  }}
                >
                  {unit.title}
                </h2>
                <p
                  style={{
                    fontSize: '0.84rem',
                    margin: 0,
                    opacity: 0.95,
                    lineHeight: 1.35,
                    color: 'rgba(255, 255, 255, 0.95)'
                  }}
                >
                  {unit.description}
                </p>
              </div>

              <div style={{ flexShrink: 0 }}>
                {!isUnitUnlocked ? (
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '14px',
                      background: 'rgba(0, 0, 0, 0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Lock size={22} color="#FFFFFF" />
                  </div>
                ) : (
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trophy size={22} color="#FFFFFF" />
                  </div>
                )}
              </div>
            </div>

            {/* Nodos del Camino Lineal con Progresión Estricta */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '28px',
                boxSizing: 'border-box'
              }}
            >
              {track.map((node) => {
                const isCompleted = progressionEngine.isNodeCompleted(node, user, safeProgress);
                const isUnlocked = progressionEngine.isNodeUnlocked(node, track, user, safeProgress);

                // Posición serpenteante: 0, -30px, 0, 30px (ajustada para perfecta respuesta en móviles)
                const offsets = [0, -30, 0, 30];
                const offsetX = offsets[node.indexInTrack % offsets.length];

                // Dev aparece acompañando en niveles seleccionados
                const companion = node.type === 'lesson'
                  ? getDevCompanionForNode(node.indexInTrack, offsetX)
                  : null;

                // 1. NODO DE LECCIÓN (NIVEL)
                if (node.type === 'lesson' && node.lesson) {
                  const lesson = node.lesson;
                  const prog = safeProgress[lesson.id];
                  const stars = prog ? prog.starsEarned : 0;
                  const isCracked = prog?.isCracked || false;

                  return (
                    <div
                      key={node.id}
                      className="path-node-wrapper"
                      style={{
                        transform: `translateX(${offsetX}px)`,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      {/* Personaje Dev realizando acción temática */}
                      {companion && (
                        <DevRoadmapCharacter
                          action={companion.action}
                          side={companion.side}
                        />
                      )}

                      {/* Estrellas de Maestría */}
                      {isCompleted && (
                        <div className="node-stars">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              size={15}
                              fill={s <= stars ? '#F59E0B' : '#CBD5E1'}
                              color={s <= stars ? '#F59E0B' : '#CBD5E1'}
                            />
                          ))}
                        </div>
                      )}

                      {/* Botón Circular 3D del Nodo */}
                      <button
                        className={`path-node ${
                          isCompleted
                            ? isCracked
                              ? 'node-cracked'
                              : 'node-completed'
                            : isUnlocked
                            ? 'node-current'
                            : 'node-locked'
                        }`}
                        onClick={() => {
                          const access = progressionEngine.canAccessNode(node.id, unit, user, safeProgress);
                          if (access.allowed) {
                            soundService.playToken();
                            onSelectLesson(lesson);
                          } else {
                            soundService.playError();
                            if (onLockedNotice) {
                              onLockedNotice('Nivel Bloqueado', access.reason || 'Completa el nivel anterior.');
                            }
                          }
                        }}
                        title={isUnlocked ? lesson.title : 'Nivel Bloqueado (Completa el anterior)'}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={34} color="#FFFFFF" />
                        ) : isUnlocked ? (
                          <Star size={34} fill="#FFFFFF" color="#FFFFFF" />
                        ) : (
                          <Lock size={26} color="#94A3B8" />
                        )}
                      </button>

                      {/* Etiqueta del Nodo */}
                      <span
                        style={{
                          fontSize: '0.84rem',
                          fontWeight: 800,
                          marginTop: '8px',
                          color: isCompleted ? '#1E293B' : isUnlocked ? '#0284C7' : '#64748B',
                          maxWidth: '135px',
                          textAlign: 'center',
                          lineHeight: 1.25
                        }}
                      >
                        {lesson.title}
                      </span>

                      {/* Botón de Estudio de Teoría antes de jugar */}
                      {isUnlocked && onOpenTheory && (
                        <button
                          onClick={() => {
                            soundService.playToken();
                            onOpenTheory(lesson);
                          }}
                          style={{
                            marginTop: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#EFF6FF',
                            color: '#2563EB',
                            border: '1.5px solid #BFDBFE',
                            boxShadow: '0 2px 0 #93C5FD',
                            padding: '3px 9px',
                            borderRadius: '12px',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          title="Estudiar la materia antes de poner a prueba"
                        >
                          <BookOpen size={12} />
                          <span>Teoría</span>
                        </button>
                      )}
                    </div>
                  );
                }

                // 2. NODO DE COFRE GAMIFICADO (3D Duolingo - Sin fondos negros)
                if (node.type === 'chest') {
                  const isOpened = (user.openedChests || []).includes(node.id);
                  const isAvailable = isUnlocked && !isOpened;

                  return (
                    <div
                      key={node.id}
                      className={`chest-trigger-node ${
                        isAvailable ? 'chest-node-available' : isOpened ? 'chest-node-opened' : 'chest-node-locked'
                      }`}
                      style={{
                        background: isAvailable
                          ? '#FFFBEB'
                          : isOpened
                          ? '#F0FDF4'
                          : '#FFFFFF',
                        border: '2.5px solid',
                        borderColor: isAvailable
                          ? '#F59E0B'
                          : isOpened
                          ? '#86EFAC'
                          : '#E2E8F0',
                        boxShadow: isAvailable
                          ? '0 5px 0 #D97706'
                          : isOpened
                          ? '0 4px 0 #BBF7D0'
                          : '0 4px 0 #CBD5E1',
                        borderRadius: '20px',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        cursor: isAvailable ? 'pointer' : isOpened ? 'default' : 'not-allowed',
                        width: '100%',
                        maxWidth: '420px',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      onClick={() => {
                        if (isOpened) {
                          soundService.playToken();
                          if (onLockedNotice) {
                            onLockedNotice('Cofre Ya Reclamado', 'Este cofre ya fue abierto y sus recompensas están en tu inventario.');
                          }
                          return;
                        }

                        const access = progressionEngine.canAccessNode(node.id, unit, user, safeProgress);
                        if (access.allowed) {
                          soundService.playToken();
                          onOpenChest(node.id, node.chestRewards);
                        } else {
                          soundService.playError();
                          if (onLockedNotice) {
                            onLockedNotice('Cofre Bloqueado', access.reason || 'Completa el nivel anterior.');
                          }
                        }
                      }}
                      title={
                        isOpened
                          ? 'Cofre Reclamado'
                          : isAvailable
                          ? '¡Cofre Disponible! Toca para abrir'
                          : 'Cofre Bloqueado'
                      }
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                        {/* Token 3D del Cofre */}
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '14px',
                            background: isAvailable
                              ? '#D97706'
                              : isOpened
                              ? '#15803D'
                              : '#E2E8F0',
                            border: `2px solid ${isAvailable ? '#FCD34D' : isOpened ? '#4ADE80' : '#CBD5E1'}`,
                            boxShadow: `0 3px 0 ${isAvailable ? '#B45309' : isOpened ? '#166534' : '#94A3B8'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Gift
                            size={24}
                            color={isAvailable || isOpened ? '#FFFFFF' : '#64748B'}
                            strokeWidth={2.4}
                          />
                        </div>

                        <div style={{ textAlign: 'left', minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '0.74rem',
                              fontWeight: 900,
                              textTransform: 'uppercase',
                              color: isAvailable ? '#D97706' : isOpened ? '#15803D' : '#64748B',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {isOpened ? 'Cofre Reclamado' : isAvailable ? '¡Toca para Abrir!' : 'Cofre en Camino'}
                          </div>
                          <div
                            style={{
                              fontSize: '0.94rem',
                              fontWeight: 800,
                              color: isAvailable ? '#1E293B' : isOpened ? '#334155' : '#64748B',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {node.title}
                          </div>
                        </div>
                      </div>

                      {/* Icono de Estado Duolingo */}
                      <div style={{ flexShrink: 0 }}>
                        {isOpened ? (
                          <div
                            style={{
                              background: '#DCFCE7',
                              borderRadius: '999px',
                              padding: '5px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <CheckCircle2 size={20} color="#16A34A" />
                          </div>
                        ) : isAvailable ? (
                          <div
                            style={{
                              background: '#FEF3C7',
                              border: '1.5px solid #FCD34D',
                              borderRadius: '999px',
                              padding: '4px 10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.76rem',
                              fontWeight: 900,
                              color: '#B45309'
                            }}
                          >
                            <Sparkles size={14} color="#D97706" />
                            <span>ABRIR</span>
                          </div>
                        ) : (
                          <Lock size={18} color="#94A3B8" />
                        )}
                      </div>
                    </div>
                  );
                }

                // 3. NODO DE JEFE DE UNIDAD (3D Duolingo)
                if (node.type === 'boss') {
                  const isDefeated = (user.defeatedBosses || []).includes(node.id);
                  const isAvailable = isUnlocked && !isDefeated;

                  return (
                    <div
                      key={node.id}
                      style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '440px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      {/* Dev celebrando ante el jefe superado o animando */}
                      <div
                        style={{
                          position: 'absolute',
                          right: '-16px',
                          top: '-24px',
                          zIndex: 6,
                          pointerEvents: 'none'
                        }}
                      >
                        <DevRoadmapCharacter action={isDefeated ? 'celebrating' : 'looking'} side="right" />
                      </div>

                      <div
                        className="boss-trigger-node"
                        style={{
                          width: '100%',
                          background: isDefeated
                            ? '#F0FDF4'
                            : isAvailable
                            ? 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)'
                            : '#F8FAFC',
                          border: '2.5px solid',
                          borderColor: isDefeated
                            ? '#86EFAC'
                            : isAvailable
                            ? '#C084FC'
                            : '#CBD5E1',
                          borderRadius: '22px',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: isAvailable || isDefeated ? 'pointer' : 'not-allowed',
                          boxShadow: isDefeated
                            ? '0 5px 0 #BBF7D0'
                            : isAvailable
                            ? '0 6px 0 #581C87, 0 8px 24px rgba(124, 58, 237, 0.35)'
                            : '0 4px 0 #CBD5E1',
                          boxSizing: 'border-box',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => {
                          const access = progressionEngine.canAccessNode(node.id, unit, user, safeProgress);
                          if (access.allowed) {
                            soundService.playToken();
                            onOpenBoss(node.id, unit);
                          } else {
                            soundService.playError();
                            if (onLockedNotice) {
                              onLockedNotice('Jefe Bloqueado', access.reason || 'Completa todos los niveles y cofres previos.');
                            }
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                          <div
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '14px',
                              background: isDefeated ? '#15803D' : isAvailable ? '#581C87' : '#E2E8F0',
                              border: `2px solid ${isDefeated ? '#4ADE80' : isAvailable ? '#C084FC' : '#CBD5E1'}`,
                              boxShadow: `0 3px 0 ${isDefeated ? '#166534' : isAvailable ? '#3B0764' : '#94A3B8'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {isDefeated ? (
                              <Trophy size={26} color="#FFFFFF" />
                            ) : isAvailable ? (
                              <Swords size={26} color="#FFFFFF" />
                            ) : (
                              <ShieldAlert size={26} color="#64748B" />
                            )}
                          </div>

                          <div style={{ minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: '0.74rem',
                                fontWeight: 900,
                                color: isDefeated ? '#15803D' : isAvailable ? '#E9D5FF' : '#64748B',
                                textTransform: 'uppercase',
                                letterSpacing: '0.6px'
                              }}
                            >
                              {isDefeated ? '¡JEFE DERROTADO!' : isAvailable ? '¡BATALLA DESBLOQUEADA!' : 'JEFE FINAL'}
                            </div>
                            <div
                              style={{
                                fontSize: '1.05rem',
                                fontWeight: 900,
                                color: isDefeated ? '#1E293B' : isAvailable ? '#FFFFFF' : '#64748B'
                              }}
                            >
                              {node.title}
                            </div>
                          </div>
                        </div>

                        <div style={{ flexShrink: 0 }}>
                          {isDefeated ? (
                            <div style={{ background: '#DCFCE7', borderRadius: '999px', padding: '5px' }}>
                              <CheckCircle2 size={22} color="#16A34A" />
                            </div>
                          ) : isAvailable ? (
                            <div
                              style={{
                                background: '#F59E0B',
                                border: '1.5px solid #FCD34D',
                                boxShadow: '0 2px 0 #B45309',
                                color: '#FFFFFF',
                                borderRadius: '12px',
                                padding: '6px 12px',
                                fontSize: '0.78rem',
                                fontWeight: 900,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <span>LUCHAR</span>
                              <Swords size={14} />
                            </div>
                          ) : (
                            <Lock size={20} color="#94A3B8" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
