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
import {
  RoadConnector,
  NodeSteppingPlatform,
  BiomeHeaderIllustration,
  BiomeSideProp,
  BiomeThemeType
} from './BiomeScenery';

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


export interface UnitBiome {
  slug: string;
  name: string;
  subtitle: string;
  badgeTag: string;
  emoji: string;
  theme: BiomeThemeType;
  bgGradient: string;
  borderColor: string;
  shadowColor: string;
  accentColor: string;
  accentDark: string;
  bannerGradient: string;
  bannerBorder: string;
  bannerShadow: string;
}

export const getUnitBiome = (unitId: number, pathId: 'kotlin' | 'sql'): UnitBiome => {
  if (pathId === 'sql') {
    if (unitId === 1) {
      return {
        slug: 'sql-quarry',
        name: 'Cantera de Esquemas & Tablas DDL',
        subtitle: 'Cimientos relacionales, estructuras de entidades y tipos de datos SQL',
        badgeTag: 'BIOMA 1 • CANTERA DE TABLAS',
        emoji: '🏛️',
        theme: 'quarry',
        bgGradient: 'linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 30%, #F0FDF4 70%, #E8F5E9 100%)',
        borderColor: '#86EFAC',
        shadowColor: '#4ADE80',
        accentColor: '#16A34A',
        accentDark: '#15803D',
        bannerGradient: 'linear-gradient(135deg, #16A34A 0%, #15803D 60%, #14532D 100%)',
        bannerBorder: '#86EFAC',
        bannerShadow: '#14532D'
      };
    } else if (unitId === 2) {
      return {
        slug: 'sql-river',
        name: 'Río de Consultas SELECT & Filtros',
        subtitle: 'Corrientes de datos, proyección de columnas y condiciones WHERE',
        badgeTag: 'BIOMA 2 • CORRIENTE SELECT',
        emoji: '🌊',
        theme: 'river',
        bgGradient: 'linear-gradient(180deg, #EFF6FF 0%, #DBEAFE 30%, #EFF6FF 70%, #E0F2FE 100%)',
        borderColor: '#93C5FD',
        shadowColor: '#60A5FA',
        accentColor: '#2563EB',
        accentDark: '#1D4ED8',
        bannerGradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 60%, #1E40AF 100%)',
        bannerBorder: '#93C5FD',
        bannerShadow: '#1E3A8A'
      };
    } else {
      return {
        slug: 'sql-vault',
        name: 'Bóveda de Joins & Agregaciones',
        subtitle: 'Cripta de relaciones multidimensionales, GROUP BY y funciones SUM/AVG',
        badgeTag: 'BIOMA 3 • BÓVEDA RELACIONAL',
        emoji: '💎',
        theme: 'vault',
        bgGradient: 'linear-gradient(180deg, #FAF5FF 0%, #F3E8FF 30%, #FAF5FF 70%, #EDE9FE 100%)',
        borderColor: '#D8B4FE',
        shadowColor: '#C084FC',
        accentColor: '#9333EA',
        accentDark: '#7E22CE',
        bannerGradient: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 60%, #581C87 100%)',
        bannerBorder: '#D8B4FE',
        bannerShadow: '#3B0764'
      };
    }
  }

  // Kotlin Path Biomes
  if (unitId === 1) {
    return {
      slug: 'kotlin-terminal-valley',
      name: 'Valle de las Variables & Terminal',
      subtitle: 'Tierra fértil donde brotan los primeros tipos de datos, val/var y operadores',
      badgeTag: 'BIOMA 1 • VALLE TERMINAL',
      emoji: '🌿',
      theme: 'valley',
      bgGradient: 'linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 30%, #F0FDF4 70%, #E8F5E9 100%)',
      borderColor: '#86EFAC',
      shadowColor: '#4ADE80',
      accentColor: '#16A34A',
      accentDark: '#15803D',
      bannerGradient: 'linear-gradient(135deg, #16A34A 0%, #15803D 60%, #14532D 100%)',
      bannerBorder: '#86EFAC',
      bannerShadow: '#14532D'
    };
  } else if (unitId === 2) {
    return {
      slug: 'kotlin-logic-caverns',
      name: 'Cavernas de Flujo & Circuitos',
      subtitle: 'Laberinto de bifurcaciones if/when, bucles for/while y operadores lógicos',
      badgeTag: 'BIOMA 2 • CIRCUITO LÓGICO',
      emoji: '⚡',
      theme: 'cavern',
      bgGradient: 'linear-gradient(180deg, #EFF6FF 0%, #DBEAFE 30%, #EFF6FF 70%, #E0F2FE 100%)',
      borderColor: '#93C5FD',
      shadowColor: '#60A5FA',
      accentColor: '#2563EB',
      accentDark: '#1D4ED8',
      bannerGradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 60%, #1E40AF 100%)',
      bannerBorder: '#93C5FD',
      bannerShadow: '#1E3A8A'
    };
  } else {
    return {
      slug: 'kotlin-cloud-metropolis',
      name: 'Metrópolis Cloud & Funciones',
      subtitle: 'Alturas cibernéticas de programación modular, colecciones y lambdas',
      badgeTag: 'BIOMA 3 • METRÓPOLIS CLOUD',
      emoji: '☁️',
      theme: 'cloud',
      bgGradient: 'linear-gradient(180deg, #FAF5FF 0%, #F3E8FF 30%, #FAF5FF 70%, #EDE9FE 100%)',
      borderColor: '#D8B4FE',
      shadowColor: '#C084FC',
      accentColor: '#9333EA',
      accentDark: '#7E22CE',
      bannerGradient: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 60%, #581C87 100%)',
      bannerBorder: '#D8B4FE',
      bannerShadow: '#3B0764'
    };
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
        maxWidth: '520px',
        margin: '0 auto',
        padding: '16px 8px 120px 8px',
        boxSizing: 'border-box'
      }}
    >
      {(units || []).map((unit) => {
        const isUnitUnlocked = progressionEngine.isUnitUnlocked(unit.id, user.currentPath, user);
        const track: TrackNode[] = progressionEngine.getUnitTrack(unit, user.currentPath);
        const biome = getUnitBiome(unit.id, user.currentPath);

        // Métricas de progreso dentro de la unidad para el banner 3D
        const completedLessonsCount = (unit.lessons || []).filter(
          (l) => (safeProgress[l.id]?.starsEarned || 0) > 0
        ).length;
        const totalLessonsCount = unit.lessons?.length || 0;
        const percentProgress = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

        // Encontrar el nivel activo actual del usuario en este track
        const currentActiveNode = track.find(
          (n) =>
            !progressionEngine.isNodeCompleted(n, user, safeProgress) &&
            progressionEngine.isNodeUnlocked(n, track, user, safeProgress)
        );

        // Calcular offsets serpentantes de cada nodo para el camino continuo
        const snakeOffsets = [0, -32, 0, 32];
        let lessonCounter = 0;
        const nodeOffsets: number[] = track.map((node) => {
          if (node.type === 'chest' || node.type === 'boss') {
            return 0;
          }
          const offset = snakeOffsets[lessonCounter % snakeOffsets.length];
          lessonCounter += 1;
          return offset;
        });

        return (
          <div
            key={unit.id}
            className={`biome-container biome-${biome.slug}`}
            style={{
              width: '100%',
              marginBottom: '48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxSizing: 'border-box',
              background: isUnitUnlocked ? biome.bgGradient : '#F8FAFC',
              border: `3px solid ${isUnitUnlocked ? biome.borderColor : '#E2E8F0'}`,
              boxShadow: isUnitUnlocked
                ? `0 10px 0 ${biome.shadowColor}, 0 16px 30px rgba(0, 0, 0, 0.07)`
                : '0 8px 0 #CBD5E1',
              borderRadius: '32px',
              padding: '18px 14px 40px 14px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >

            {/* Tag 3D del Bioma */}
            <div
              style={{
                alignSelf: 'flex-start',
                marginBottom: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FFFFFF',
                border: `2px solid ${isUnitUnlocked ? biome.borderColor : '#CBD5E1'}`,
                boxShadow: `0 3px 0 ${isUnitUnlocked ? biome.shadowColor : '#94A3B8'}`,
                borderRadius: '999px',
                padding: '4px 14px',
                fontSize: '0.74rem',
                fontWeight: 900,
                color: isUnitUnlocked ? biome.accentColor : '#64748B',
                letterSpacing: '0.5px',
                zIndex: 2
              }}
            >
              <span>{biome.emoji}</span>
              <span>{biome.badgeTag}</span>
            </div>

            {/* Encabezado Banner de Sección / Bioma estilo Duolingo 3D */}
            <div
              className="unit-card-banner"
              style={{
                width: '100%',
                maxWidth: '480px',
                boxSizing: 'border-box',
                background: isUnitUnlocked ? biome.bannerGradient : '#64748B',
                padding: '20px 22px',
                borderRadius: '24px',
                color: '#FFFFFF',
                marginBottom: '32px',
                boxShadow: isUnitUnlocked ? `0 8px 0 ${biome.bannerShadow}` : '0 6px 0 #475569',
                border: '2.5px solid',
                borderColor: isUnitUnlocked ? biome.bannerBorder : '#94A3B8',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {/* Ilustración Vectorial Isométrica 3D del Bioma en el Banner */}
              {isUnitUnlocked && (
                <div
                  style={{
                    position: 'absolute',
                    right: '-4px',
                    bottom: '-4px',
                    opacity: 0.95,
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                >
                  <BiomeHeaderIllustration theme={biome.theme} unitId={unit.id} />
                </div>
              )}

              <div style={{ position: 'relative', zIndex: 1, maxWidth: isUnitUnlocked ? '72%' : '100%' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.7px',
                    background: 'rgba(0, 0, 0, 0.22)',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    marginBottom: '8px'
                  }}
                >
                  <span>Unidad {unit.id}</span>
                </div>
                <h2
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    margin: '0 0 6px 0',
                    lineHeight: 1.25,
                    color: '#FFFFFF',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  {unit.title}
                </h2>
                <p
                  style={{
                    fontSize: '0.82rem',
                    margin: '0 0 12px 0',
                    opacity: 0.95,
                    lineHeight: 1.35,
                    color: 'rgba(255, 255, 255, 0.95)'
                  }}
                >
                  {unit.description}
                </p>

                {/* Barra de Progreso 3D de la Unidad */}
                {isUnitUnlocked && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        flex: 1,
                        maxWidth: '160px',
                        height: '10px',
                        background: 'rgba(0, 0, 0, 0.28)',
                        borderRadius: '999px',
                        overflow: 'hidden',
                        padding: '1.5px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div
                        style={{
                          width: `${percentProgress}%`,
                          height: '100%',
                          background: '#FFFFFF',
                          borderRadius: '999px',
                          boxShadow: '0 1px 3px rgba(255,255,255,0.6)',
                          transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 900,
                        color: 'rgba(255, 255, 255, 0.95)',
                        letterSpacing: '0.3px'
                      }}
                    >
                      {completedLessonsCount} / {totalLessonsCount}
                    </span>
                  </div>
                )}
              </div>

              {/* Medallón 3D de estado */}
              <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
                {!isUnitUnlocked ? (
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '16px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
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
                      width: '44px',
                      height: '44px',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.22)',
                      border: '2px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: '0 3px 0 rgba(0, 0, 0, 0.15)',
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

            {/* Nodos del Camino Lineal con Progresión Estricta y Carretera Continua */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box',
                position: 'relative'
              }}
            >
              {track.map((node, nodeIdx) => {
                const isCompleted = progressionEngine.isNodeCompleted(node, user, safeProgress);
                const isUnlocked = progressionEngine.isNodeUnlocked(node, track, user, safeProgress);

                const offsetX = nodeOffsets[nodeIdx] || 0;
                const nextOffsetX = nodeOffsets[nodeIdx + 1] ?? 0;

                // REQUISITO: Exactamente UN avatar al inicio de cada unidad (nodo índice 0)
                const isUnitStartNode = node.indexInTrack === 0;
                const isCurrentActiveLevel = node.id === currentActiveNode?.id;

                let companion: { action: DevRoadmapAction; side: 'left' | 'right'; isCurrent?: boolean } | null = null;
                if (isUnitStartNode && node.type === 'lesson') {
                  const unitBuddyActions: DevRoadmapAction[] = ['reading', 'thinking', 'coding'];
                  const buddyAction = unitBuddyActions[(unit.id - 1) % unitBuddyActions.length] || 'reading';
                  companion = {
                    action: isCurrentActiveLevel ? ('activeGuide' as DevRoadmapAction) : buddyAction,
                    side: 'right',
                    isCurrent: isCurrentActiveLevel
                  };
                }

                return (
                  <React.Fragment key={node.id}>
                    {/* 1. NODO DE LECCIÓN (NIVEL) */}
                    {node.type === 'lesson' && node.lesson && (
                      <div
                        className="path-node-wrapper"
                        style={{
                          transform: `translateX(${offsetX}px)`,
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          zIndex: 3,
                          margin: '6px 0'
                        }}
                      >
                        {/* Plataforma 3D que ancla físicamente el botón al suelo del bioma */}
                        <NodeSteppingPlatform
                          theme={biome.theme}
                          isCurrent={isCurrentActiveLevel}
                          isCompleted={isCompleted}
                        />

                        {/* Props ambientales 3D espaciados a los costados de la carretera (sin tocar botones ni avatar) */}
                        {!isUnitStartNode && node.indexInTrack % 3 === 2 && (
                          <BiomeSideProp
                            theme={biome.theme}
                            side={offsetX <= 0 ? 'right' : 'left'}
                            propIndex={node.indexInTrack}
                          />
                        )}

                        {/* Personaje Dev: único al inicio de la unidad */}
                        {companion && (
                          <DevRoadmapCharacter
                            action={companion.action}
                            side={companion.side}
                            isCurrentLevelGuide={companion.isCurrent}
                            userAvatarId={user.avatarId}
                          />
                        )}

                        {/* Estrellas de Maestría */}
                        {isCompleted && (
                          <div className="node-stars">
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                size={15}
                                fill={s <= (safeProgress[node.lesson!.id]?.starsEarned || 0) ? '#F59E0B' : '#CBD5E1'}
                                color={s <= (safeProgress[node.lesson!.id]?.starsEarned || 0) ? '#F59E0B' : '#CBD5E1'}
                              />
                            ))}
                          </div>
                        )}

                        {/* Botón Circular 3D del Nodo */}
                        <button
                          className={`path-node ${
                            isCompleted
                              ? safeProgress[node.lesson.id]?.isCracked
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
                              onSelectLesson(node.lesson!);
                            } else {
                              soundService.playError();
                              if (onLockedNotice) {
                                onLockedNotice('Nivel Bloqueado', access.reason || 'Completa el nivel anterior.');
                              }
                            }
                          }}
                          title={isUnlocked ? node.lesson.title : 'Nivel Bloqueado (Completa el anterior)'}
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
                          {node.lesson.title}
                        </span>

                        {/* Botón de Estudio de Teoría antes de jugar */}
                        {isUnlocked && onOpenTheory && (
                          <button
                            onClick={() => {
                              soundService.playToken();
                              onOpenTheory(node.lesson!);
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
                    )}

                    {/* 2. NODO DE COFRE GAMIFICADO (3D Duolingo) */}
                    {node.type === 'chest' && (
                      <div
                        className={`chest-trigger-node ${
                          isUnlocked && !(user.openedChests || []).includes(node.id)
                            ? 'chest-node-available'
                            : (user.openedChests || []).includes(node.id)
                            ? 'chest-node-opened'
                            : 'chest-node-locked'
                        }`}
                        style={{
                          background: isUnlocked && !(user.openedChests || []).includes(node.id)
                            ? '#FFFBEB'
                            : (user.openedChests || []).includes(node.id)
                            ? '#F0FDF4'
                            : '#FFFFFF',
                          border: '2.5px solid',
                          borderColor: isUnlocked && !(user.openedChests || []).includes(node.id)
                            ? '#F59E0B'
                            : (user.openedChests || []).includes(node.id)
                            ? '#86EFAC'
                            : '#E2E8F0',
                          boxShadow: isUnlocked && !(user.openedChests || []).includes(node.id)
                            ? '0 6px 0 #D97706, 0 10px 20px rgba(217, 119, 6, 0.14)'
                            : (user.openedChests || []).includes(node.id)
                            ? '0 4px 0 #BBF7D0'
                            : '0 4px 0 #CBD5E1',
                          borderRadius: '22px',
                          padding: '14px 18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          cursor: isUnlocked && !(user.openedChests || []).includes(node.id)
                            ? 'pointer'
                            : (user.openedChests || []).includes(node.id)
                            ? 'default'
                            : 'not-allowed',
                          width: '100%',
                          maxWidth: '430px',
                          boxSizing: 'border-box',
                          margin: '6px 0',
                          position: 'relative',
                          zIndex: 3,
                          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onClick={() => {
                          const isOpened = (user.openedChests || []).includes(node.id);
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
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                          {/* Token 3D del Cofre */}
                          <div
                            style={{
                              width: '46px',
                              height: '46px',
                              borderRadius: '14px',
                              background: isUnlocked && !(user.openedChests || []).includes(node.id)
                                ? '#D97706'
                                : (user.openedChests || []).includes(node.id)
                                ? '#15803D'
                                : '#E2E8F0',
                              border: `2px solid ${
                                isUnlocked && !(user.openedChests || []).includes(node.id)
                                  ? '#FCD34D'
                                  : (user.openedChests || []).includes(node.id)
                                  ? '#4ADE80'
                                  : '#CBD5E1'
                              }`,
                              boxShadow: `0 3px 0 ${
                                isUnlocked && !(user.openedChests || []).includes(node.id)
                                  ? '#B45309'
                                  : (user.openedChests || []).includes(node.id)
                                  ? '#166534'
                                  : '#94A3B8'
                              }`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <Gift
                              size={24}
                              color={
                                isUnlocked && !(user.openedChests || []).includes(node.id) ||
                                (user.openedChests || []).includes(node.id)
                                  ? '#FFFFFF'
                                  : '#64748B'
                              }
                              strokeWidth={2.4}
                            />
                          </div>

                          <div style={{ textAlign: 'left', minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: '0.74rem',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                color:
                                  isUnlocked && !(user.openedChests || []).includes(node.id)
                                    ? '#D97706'
                                    : (user.openedChests || []).includes(node.id)
                                    ? '#15803D'
                                    : '#64748B',
                                letterSpacing: '0.5px'
                              }}
                            >
                              {(user.openedChests || []).includes(node.id)
                                ? 'Cofre Reclamado'
                                : isUnlocked
                                ? '¡Toca para Abrir!'
                                : 'Cofre en Camino'}
                            </div>
                            <div
                              style={{
                                fontSize: '0.94rem',
                                fontWeight: 800,
                                color:
                                  isUnlocked && !(user.openedChests || []).includes(node.id)
                                    ? '#1E293B'
                                    : (user.openedChests || []).includes(node.id)
                                    ? '#334155'
                                    : '#64748B',
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
                          {(user.openedChests || []).includes(node.id) ? (
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
                          ) : isUnlocked ? (
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
                    )}

                    {/* 3. NODO DE JEFE DE UNIDAD (3D Duolingo) */}
                    {node.type === 'boss' && (
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          maxWidth: '450px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          margin: '8px 0',
                          zIndex: 3
                        }}
                      >
                        {/* Dev celebrando ante el jefe superado o animando */}
                        <div
                          style={{
                            position: 'absolute',
                            right: '12px',
                            top: '-14px',
                            zIndex: 6,
                            pointerEvents: 'none'
                          }}
                        >
                          <DevRoadmapCharacter
                            action={(user.defeatedBosses || []).includes(node.id) ? 'celebrating' : 'looking'}
                            side="right"
                          />
                        </div>

                        <div
                          className="boss-trigger-node"
                          style={{
                            width: '100%',
                            background: (user.defeatedBosses || []).includes(node.id)
                              ? '#F0FDF4'
                              : isUnlocked
                              ? 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)'
                              : '#F8FAFC',
                            border: '2.5px solid',
                            borderColor: (user.defeatedBosses || []).includes(node.id)
                              ? '#86EFAC'
                              : isUnlocked
                              ? '#C084FC'
                              : '#CBD5E1',
                            borderRadius: '24px',
                            padding: '16px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: isUnlocked || (user.defeatedBosses || []).includes(node.id) ? 'pointer' : 'not-allowed',
                            boxShadow: (user.defeatedBosses || []).includes(node.id)
                              ? '0 6px 0 #BBF7D0'
                              : isUnlocked
                              ? '0 7px 0 #581C87, 0 12px 28px rgba(124, 58, 237, 0.35)'
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
                                borderRadius: '15px',
                                background: (user.defeatedBosses || []).includes(node.id)
                                  ? '#15803D'
                                  : isUnlocked
                                  ? '#581C87'
                                  : '#E2E8F0',
                                border: `2px solid ${
                                  (user.defeatedBosses || []).includes(node.id)
                                    ? '#4ADE80'
                                    : isUnlocked
                                    ? '#C084FC'
                                    : '#CBD5E1'
                                }`,
                                boxShadow: `0 3px 0 ${
                                  (user.defeatedBosses || []).includes(node.id)
                                    ? '#166534'
                                    : isUnlocked
                                    ? '#3B0764'
                                    : '#94A3B8'
                                }`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}
                            >
                              {(user.defeatedBosses || []).includes(node.id) ? (
                                <Trophy size={26} color="#FFFFFF" />
                              ) : isUnlocked ? (
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
                                  color: (user.defeatedBosses || []).includes(node.id)
                                    ? '#15803D'
                                    : isUnlocked
                                    ? '#E9D5FF'
                                    : '#64748B',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.6px'
                                }}
                              >
                                {(user.defeatedBosses || []).includes(node.id)
                                  ? '¡JEFE DERROTADO!'
                                  : isUnlocked
                                  ? '¡BATALLA DESBLOQUEADA!'
                                  : 'JEFE FINAL'}
                              </div>
                              <div
                                style={{
                                  fontSize: '1.05rem',
                                  fontWeight: 900,
                                  color: (user.defeatedBosses || []).includes(node.id)
                                    ? '#1E293B'
                                    : isUnlocked
                                    ? '#FFFFFF'
                                    : '#64748B'
                                }}
                              >
                                {node.title}
                              </div>
                            </div>
                          </div>

                          <div style={{ flexShrink: 0 }}>
                            {(user.defeatedBosses || []).includes(node.id) ? (
                              <div style={{ background: '#DCFCE7', borderRadius: '999px', padding: '5px' }}>
                                <CheckCircle2 size={22} color="#16A34A" />
                              </div>
                            ) : isUnlocked ? (
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
                    )}

                    {/* CONECTOR DE CARRETERA 3D (Entre este nodo y el siguiente) */}
                    {nodeIdx < track.length - 1 && (
                      <RoadConnector
                        fromOffset={offsetX}
                        toOffset={nextOffsetX}
                        theme={biome.theme}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
