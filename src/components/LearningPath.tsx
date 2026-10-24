import React from 'react';
import {
  Star,
  Gift,
  CheckCircle2,
  Lock,
  BookOpen,
  Sparkles,
  Swords,
  Trophy,
  Database,
  Terminal,
  Layers,
  Code2,
  Cpu,
  Cloud
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
  BiomeThemeType
} from './BiomeScenery';
import { BossAvatar3D } from './BossAvatar3D';
import { getBossChallengeForUnit } from '../content/bossChallenges';

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

export type BiomeIconType = 'database' | 'terminal' | 'layers' | 'code' | 'cpu' | 'cloud';

export interface UnitBiome {
  slug: string;
  name: string;
  subtitle: string;
  badgeTag: string;
  iconType: BiomeIconType;
  theme: BiomeThemeType;
  tabColor: string;
  accentBg: string;
}

export const BiomeBadgeIcon: React.FC<{ type: BiomeIconType; size?: number }> = ({ type, size = 14 }) => {
  switch (type) {
    case 'database':
      return <Database size={size} color="#000000" strokeWidth={2.5} />;
    case 'terminal':
      return <Terminal size={size} color="#000000" strokeWidth={2.5} />;
    case 'layers':
      return <Layers size={size} color="#000000" strokeWidth={2.5} />;
    case 'code':
      return <Code2 size={size} color="#000000" strokeWidth={2.5} />;
    case 'cpu':
      return <Cpu size={size} color="#000000" strokeWidth={2.5} />;
    case 'cloud':
    default:
      return <Cloud size={size} color="#000000" strokeWidth={2.5} />;
  }
};

const SQL_BIOMES: Record<number, UnitBiome> = {
  1: {
    slug: 'sql-u01-fundamentos',
    name: 'Fundamentos de bases de datos',
    subtitle: 'Datos e información, bases de datos relacionales, tablas y SQLite',
    badgeTag: 'UNIDAD 1 • FUNDAMENTOS BD',
    iconType: 'database',
    theme: 'quarry',
    tabColor: '#FFE600',
    accentBg: '#FEF9C3'
  },
  2: {
    slug: 'sql-u02-modelado',
    name: 'Modelado de información y relaciones',
    subtitle: 'Entidades Estudiante, Asignatura, Matrícula y relaciones 1:N y N:M',
    badgeTag: 'UNIDAD 2 • MODELADO Y RELACIONES',
    iconType: 'layers',
    theme: 'vault',
    tabColor: '#38BDF8',
    accentBg: '#E0F2FE'
  },
  3: {
    slug: 'sql-u03-createtable',
    name: 'Tipos de datos y CREATE TABLE',
    subtitle: 'Esquemas de tablas, tipos INTEGER, REAL, TEXT, BLOB y fechas',
    badgeTag: 'UNIDAD 3 • CREATE TABLE Y TIPOS',
    iconType: 'code',
    theme: 'cavern',
    tabColor: '#10B981',
    accentBg: '#D1FAE5'
  },
  4: {
    slug: 'sql-u04-restricciones',
    name: 'Llaves y restricciones',
    subtitle: 'PRIMARY KEY, NOT NULL, UNIQUE, CHECK, DEFAULT y nulos',
    badgeTag: 'UNIDAD 4 • RESTRICCIONES',
    iconType: 'database',
    theme: 'vault',
    tabColor: '#F59E0B',
    accentBg: '#FEF3C7'
  },
  5: {
    slug: 'sql-u05-insert',
    name: 'Inserción de registros',
    subtitle: 'Inserción explícita de registros, orden de claves y manejo de restricciones',
    badgeTag: 'UNIDAD 5 • INSERCIÓN INSERT',
    iconType: 'terminal',
    theme: 'river',
    tabColor: '#8B5CF6',
    accentBg: '#EDE9FE'
  },
  6: {
    slug: 'sql-u06-select',
    name: 'Consultas básicas',
    subtitle: 'Proyección de datos, columnas calculadas, alias AS y DISTINCT',
    badgeTag: 'UNIDAD 6 • CONSULTAS SELECT',
    iconType: 'terminal',
    theme: 'river',
    tabColor: '#3B82F6',
    accentBg: '#DBEAFE'
  },
  7: {
    slug: 'sql-u07-filtros',
    name: 'Filtros, búsquedas y ordenamiento',
    subtitle: 'Operadores booleanos, BETWEEN, IN, comodines LIKE, ORDER BY y LIMIT',
    badgeTag: 'UNIDAD 7 • FILTROS WHERE',
    iconType: 'cpu',
    theme: 'cavern',
    tabColor: '#EC4899',
    accentBg: '#FCE7F3'
  },
  8: {
    slug: 'sql-u08-update-delete',
    name: 'Actualización y eliminación',
    subtitle: 'Modificación segura de registros, delimitación WHERE y diferencia con DROP',
    badgeTag: 'UNIDAD 8 • UPDATE Y DELETE',
    iconType: 'database',
    theme: 'quarry',
    tabColor: '#EF4444',
    accentBg: '#FEE2E2'
  },
  9: {
    slug: 'sql-u09-joins',
    name: 'Consultas entre tablas',
    subtitle: 'INNER JOIN, LEFT JOIN, condiciones ON y consultas sobre tres tablas',
    badgeTag: 'UNIDAD 9 • JOIN ENTRE TABLAS',
    iconType: 'layers',
    theme: 'vault',
    tabColor: '#6366F1',
    accentBg: '#EEF2FF'
  },
  10: {
    slug: 'sql-u10-agregaciones',
    name: 'Agregaciones y agrupaciones',
    subtitle: 'Funciones COUNT, SUM, AVG, MIN, MAX y filtrado posagregado con HAVING',
    badgeTag: 'UNIDAD 10 • AGREGACIONES GROUP BY',
    iconType: 'cloud',
    theme: 'cloud',
    tabColor: '#14B8A6',
    accentBg: '#CCFBF1'
  },
  11: {
    slug: 'sql-u11-subconsultas',
    name: 'Funciones y subconsultas',
    subtitle: 'Funciones de texto, CASE condicional, COALESCE y subconsultas anidadas',
    badgeTag: 'UNIDAD 11 • SUBCONSULTAS Y FUNCIONES',
    iconType: 'code',
    theme: 'valley',
    tabColor: '#8B5CF6',
    accentBg: '#F3E8FF'
  },
  12: {
    slug: 'sql-u12-transacciones',
    name: 'Integridad referencial y transacciones',
    subtitle: 'PRAGMA foreign_keys, ON DELETE CASCADE, BEGIN, COMMIT y ROLLBACK',
    badgeTag: 'UNIDAD 12 • TRANSACCIONES ACID',
    iconType: 'database',
    theme: 'vault',
    tabColor: '#F97316',
    accentBg: '#FFEDD5'
  },
  13: {
    slug: 'sql-u13-seguridad',
    name: 'Buen diseño y seguridad básica',
    subtitle: 'Normalización 1FN-3FN, ALTER TABLE, vistas, índices e inyección SQL',
    badgeTag: 'UNIDAD 13 • SEGURIDAD Y DISEÑO',
    iconType: 'cpu',
    theme: 'cloud',
    tabColor: '#10B981',
    accentBg: '#D1FAE5'
  }
};

const KOTLIN_BIOMES: Record<number, UnitBiome> = {
  1: {
    slug: 'kotlin-u01-pensamiento',
    name: 'Pensamiento lógico y primeros programas',
    subtitle: 'Algoritmos, diagramas de flujo, pseudocódigo y secuencias',
    badgeTag: 'UNIDAD 1 • PENSAMIENTO LÓGICO',
    iconType: 'code',
    theme: 'valley',
    tabColor: '#4ADE80',
    accentBg: '#DCFCE7'
  },
  2: {
    slug: 'kotlin-u02-variables',
    name: 'Variables y tipos de datos',
    subtitle: 'Declaraciones val/var, tipos primitivos e interpolación de texto',
    badgeTag: 'UNIDAD 2 • VARIABLES Y TIPOS',
    iconType: 'layers',
    theme: 'cavern',
    tabColor: '#38BDF8',
    accentBg: '#E0F2FE'
  },
  3: {
    slug: 'kotlin-u03-operadores',
    name: 'Operadores y expresiones',
    subtitle: 'Aritmética, comparaciones lógicas y prioridad de operaciones',
    badgeTag: 'UNIDAD 3 • OPERADORES',
    iconType: 'cpu',
    theme: 'vault',
    tabColor: '#FB7185',
    accentBg: '#FFE4E6'
  },
  4: {
    slug: 'kotlin-u04-decision',
    name: 'Estructuras de decisión',
    subtitle: 'Caminos alternativos con if/else, rangos e inspección when',
    badgeTag: 'UNIDAD 4 • ESTRUCTURAS DE DECISIÓN',
    iconType: 'terminal',
    theme: 'river',
    tabColor: '#FBBF24',
    accentBg: '#FEF3C7'
  },
  5: {
    slug: 'kotlin-u05-repeticion',
    name: 'Estructuras de repetición',
    subtitle: 'Iteraciones for, while, do-while, contadores y control de flujo',
    badgeTag: 'UNIDAD 5 • REPETICIÓN Y BUCLES',
    iconType: 'cpu',
    theme: 'quarry',
    tabColor: '#A78BFA',
    accentBg: '#EDE9FE'
  },
  6: {
    slug: 'kotlin-u06-funciones',
    name: 'Funciones',
    subtitle: 'Modularización, parámetros con nombre, retornos y descomposición',
    badgeTag: 'UNIDAD 6 • FUNCIONES',
    iconType: 'cloud',
    theme: 'cloud',
    tabColor: '#34D399',
    accentBg: '#D1FAE5'
  },
  7: {
    slug: 'kotlin-u07-nulos',
    name: 'Conversiones y valores nulos',
    subtitle: 'Conversiones seguras, tipos anulables ?, operador Elvis ?: y verificación',
    badgeTag: 'UNIDAD 7 • CONVERSIONES Y NULOS',
    iconType: 'code',
    theme: 'valley',
    tabColor: '#F472B6',
    accentBg: '#FCE7F3'
  },
  8: {
    slug: 'kotlin-u08-texto',
    name: 'Procesamiento de texto',
    subtitle: 'Longitud, trim, mayúsculas, partición y validación de texto',
    badgeTag: 'UNIDAD 8 • PROCESAMIENTO DE TEXTO',
    iconType: 'terminal',
    theme: 'river',
    tabColor: '#60A5FA',
    accentBg: '#DBEAFE'
  },
  9: {
    slug: 'kotlin-u09-colecciones',
    name: 'Arreglos y Colecciones',
    subtitle: 'Arreglos de tamaño fijo, matrices, listas, conjuntos y mapas',
    badgeTag: 'UNIDAD 9 • ARREGLOS Y COLECCIONES',
    iconType: 'layers',
    theme: 'cavern',
    tabColor: '#F59E0B',
    accentBg: '#FEF3C7'
  },
  10: {
    slug: 'kotlin-u10-poo',
    name: 'Clases y objetos',
    subtitle: 'Programación orientada a objetos, encapsulación y data classes',
    badgeTag: 'UNIDAD 10 • CLASES Y OBJETOS',
    iconType: 'database',
    theme: 'vault',
    tabColor: '#818CF8',
    accentBg: '#E0E7FF'
  },
  11: {
    slug: 'kotlin-u11-lambdas',
    name: 'Operaciones sobre colecciones y lambdas',
    subtitle: 'Transformación con map, filtrado filter, búsqueda y agregación',
    badgeTag: 'UNIDAD 11 • LAMBDAS Y COLECCIONES',
    iconType: 'cloud',
    theme: 'cloud',
    tabColor: '#2DD4BF',
    accentBg: '#CCFBF1'
  },
  12: {
    slug: 'kotlin-u12-depuracion',
    name: 'Errores y depuración',
    subtitle: 'Manejo robusto con try/catch, depuración paso a paso y casos límite',
    badgeTag: 'UNIDAD 12 • ERRORES Y DEPURACIÓN',
    iconType: 'cpu',
    theme: 'quarry',
    tabColor: '#EF4444',
    accentBg: '#FEE2E2'
  }
};

export const getUnitBiome = (unitId: number, pathId: 'kotlin' | 'sql'): UnitBiome => {
  if (pathId === 'sql') {
    return SQL_BIOMES[unitId] || SQL_BIOMES[1];
  }
  return KOTLIN_BIOMES[unitId] || KOTLIN_BIOMES[1];
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
      {(units || []).map((unit, unitIndex) => {
        const isUnitUnlocked = progressionEngine.isUnitUnlocked(unit.id, user.currentPath, user);
        const track: TrackNode[] = progressionEngine.getUnitTrack(unit, user.currentPath);
        const biome = getUnitBiome(unit.id, user.currentPath);
        const isFirstInStage = Boolean(unit.stage && (unitIndex === 0 || units[unitIndex - 1]?.stage !== unit.stage));

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
              position: 'relative'
            }}
          >
            {/* Banner de Etapa si es la primera unidad de dicha etapa */}
            {unit.stage && isFirstInStage && (
              <div
                style={{
                  width: '100%',
                  maxWidth: '560px',
                  marginBottom: '16px',
                  padding: '10px 18px',
                  background: '#0F172A',
                  color: '#F8FAFC',
                  borderRadius: '14px',
                  boxShadow: '4px 4px 0px #000000',
                  border: '2px solid #000000',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.78rem',
                  fontWeight: 900,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  boxSizing: 'border-box'
                }}
              >
                <span>{unit.stage}</span>
              </div>
            )}

            {/* Encabezado Banner de Sección / Bioma estilo Neo-brutalism */}
            <div
              className="unit-card-banner"
              style={{
                width: '100%',
                maxWidth: '560px',
                boxSizing: 'border-box',
                background: isUnitUnlocked ? biome.accentBg : '#F1F5F9',
                padding: '20px 22px',
                borderRadius: '18px',
                color: '#000000',
                marginBottom: '32px',
                boxShadow: isUnitUnlocked ? '4px 4px 0px #000000' : '2px 2px 0px #CBD5E1',
                border: '2.5px solid #000000',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    background: '#000000',
                    color: '#FFFFFF',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    marginBottom: '8px'
                  }}
                >
                  <BiomeBadgeIcon type={biome.iconType} size={12} />
                  <span>{biome.badgeTag}</span>
                </div>
                <h2
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    margin: '0 0 6px 0',
                    lineHeight: 1.25,
                    color: '#000000'
                  }}
                >
                  {unit.title}
                </h2>
                <p
                  style={{
                    fontSize: '0.82rem',
                    margin: '0 0 12px 0',
                    lineHeight: 1.35,
                    color: '#334155',
                    fontWeight: 600
                  }}
                >
                  {unit.description}
                </p>

                {/* Barra de Progreso Neo-brutalista de la Unidad */}
                {isUnitUnlocked && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        flex: 1,
                        maxWidth: '170px',
                        height: '14px',
                        background: '#FFFFFF',
                        border: '2px solid #000000',
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
                          background: '#4ADE80',
                          borderRadius: '999px',
                          borderRight: percentProgress > 0 && percentProgress < 100 ? '1.5px solid #000000' : 'none',
                          transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 900,
                        color: '#000000',
                        background: '#FFFFFF',
                        border: '1.5px solid #000000',
                        borderRadius: '6px',
                        padding: '1px 6px',
                        lineHeight: 1.1
                      }}
                    >
                      {completedLessonsCount} / {totalLessonsCount}
                    </span>
                  </div>
                )}
              </div>

              {/* Medallón Neo-brutalista de estado */}
              <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
                {!isUnitUnlocked ? (
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: '#E2E8F0',
                      border: '2.5px solid #000000',
                      boxShadow: '2px 2px 0px #000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Lock size={22} color="#000000" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: '#FFE600',
                      border: '2.5px solid #000000',
                      boxShadow: '2.5px 2.5px 0px #000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trophy size={22} color="#000000" strokeWidth={2.5} />
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


                        {/* Personaje Dev: único al inicio de la unidad */}
                        {companion && (
                          <DevRoadmapCharacter
                            action={companion.action}
                            side={companion.side}
                            isCurrentLevelGuide={companion.isCurrent}
                            userAvatarId={user.avatarId}
                            userSkinId={user.equippedSkin}
                          />
                        )}

                        {/* Estrellas de Maestría Neo-brutalistas */}
                        {isCompleted && (
                          <div className="node-stars">
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                size={15}
                                fill={s <= (safeProgress[node.lesson!.id]?.starsEarned || 0) ? '#FFE600' : '#E2E8F0'}
                                color="#000000"
                                strokeWidth={2}
                              />
                            ))}
                          </div>
                        )}

                        {/* Botón Circular Neo-brutalista del Nodo */}
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
                            <CheckCircle2 size={34} color="#000000" strokeWidth={2.8} />
                          ) : isUnlocked ? (
                            <Star size={34} fill="#000000" color="#000000" strokeWidth={2} />
                          ) : (
                            <Lock size={26} color="#475569" strokeWidth={2.5} />
                          )}
                        </button>

                        {/* Etiqueta del Nodo */}
                        <span
                          style={{
                            fontSize: '0.86rem',
                            fontWeight: 900,
                            marginTop: '8px',
                            color: '#000000',
                            maxWidth: '140px',
                            textAlign: 'center',
                            lineHeight: 1.25
                          }}
                        >
                          {node.lesson.title}
                        </span>

                        {/* Botón Neo-brutalista de Estudio de Teoría antes de jugar */}
                        {isUnlocked && onOpenTheory && (
                          <button
                            onClick={() => {
                              soundService.playToken();
                              onOpenTheory(node.lesson!);
                            }}
                            style={{
                              marginTop: '5px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              background: (safeProgress[node.lesson.id]?.theoryCompleted || isCompleted)
                                ? '#4ADE80'
                                : '#FFE600',
                              color: '#000000',
                              border: '2px solid #000000',
                              boxShadow: '2px 2px 0px #000000',
                              padding: '3px 10px',
                              borderRadius: '10px',
                              fontSize: '0.72rem',
                              fontWeight: 900,
                              cursor: 'pointer',
                              transition: 'all 0.1s ease'
                            }}
                            className="active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            title={
                              (safeProgress[node.lesson.id]?.theoryCompleted || isCompleted)
                                ? 'Materia y Micro-Quiz completados'
                                : 'Estudiar la materia antes de poner a prueba'
                            }
                          >
                            {(safeProgress[node.lesson.id]?.theoryCompleted || isCompleted) ? (
                              <>
                                <CheckCircle2 size={13} color="#000000" strokeWidth={2.8} />
                                <span>Teoría Lista</span>
                              </>
                            ) : (
                              <>
                                <BookOpen size={13} color="#000000" strokeWidth={2.8} />
                                <span>Teoría Requerida</span>
                              </>
                            )}
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
                          background: '#FFFFFF',
                          border: '2.5px solid #000000',
                          boxShadow: isUnlocked && !(user.openedChests || []).includes(node.id)
                            ? '4px 4px 0px #000000'
                            : (user.openedChests || []).includes(node.id)
                            ? '3px 3px 0px #000000'
                            : '3px 3px 0px #CBD5E1',
                          borderRadius: '18px',
                          padding: '16px 18px',
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
                          margin: '12px 0',
                          position: 'relative',
                          zIndex: 3,
                          transition: 'all 0.15s ease'
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
                        {/* Pestaña tipo folder del cofre */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '-13px',
                            left: '16px',
                            background: (user.openedChests || []).includes(node.id)
                              ? '#4ADE80'
                              : isUnlocked
                              ? '#FFE600'
                              : '#E2E8F0',
                            border: '2px solid #000000',
                            borderBottom: 'none',
                            borderRadius: '7px 7px 0 0',
                            padding: '2px 10px',
                            fontSize: '0.66rem',
                            fontWeight: 900,
                            color: '#000000',
                            letterSpacing: '0.4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Gift size={11} color="#000000" strokeWidth={2.4} />
                          <span>
                            {(user.openedChests || []).includes(node.id)
                              ? 'RECLAMADO'
                              : isUnlocked
                              ? 'COFRE DISPONIBLE'
                              : 'BLOQUEADO'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                          {/* Token Neo-brutalista del cofre */}
                          <div
                            style={{
                              width: '46px',
                              height: '46px',
                              borderRadius: '12px',
                              background: (user.openedChests || []).includes(node.id)
                                ? '#4ADE80'
                                : isUnlocked
                                ? '#FFE600'
                                : '#E2E8F0',
                              border: '2px solid #000000',
                              boxShadow: '2px 2px 0px #000000',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <Gift
                              size={24}
                              color="#000000"
                              strokeWidth={2.4}
                            />
                          </div>

                          <div style={{ textAlign: 'left', minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                color: '#64748B',
                                letterSpacing: '0.4px'
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
                                fontWeight: 900,
                                color: '#000000',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {node.title}
                            </div>
                          </div>
                        </div>

                        {/* Botón de estado del cofre */}
                        <div style={{ flexShrink: 0 }}>
                          {(user.openedChests || []).includes(node.id) ? (
                            <div
                              style={{
                                background: '#4ADE80',
                                border: '2px solid #000000',
                                boxShadow: '2px 2px 0px #000000',
                                borderRadius: '999px',
                                padding: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <CheckCircle2 size={18} color="#000000" strokeWidth={2.8} />
                            </div>
                          ) : isUnlocked ? (
                            <div
                              style={{
                                background: '#FFE600',
                                border: '2px solid #000000',
                                boxShadow: '2px 2px 0px #000000',
                                borderRadius: '10px',
                                padding: '5px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.76rem',
                                fontWeight: 900,
                                color: '#000000'
                              }}
                            >
                              <Sparkles size={14} color="#000000" strokeWidth={2.5} />
                              <span>ABRIR</span>
                            </div>
                          ) : (
                            <div
                              style={{
                                background: '#E2E8F0',
                                border: '1.5px solid #000000',
                                borderRadius: '8px',
                                padding: '4px 8px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Lock size={16} color="#64748B" strokeWidth={2.5} />
                            </div>
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

                        {(() => {
                          const bossChallenge = getBossChallengeForUnit(user.currentPath || 'kotlin', unit.id);
                          const isDefeated = (user.defeatedBosses || []).includes(node.id);

                          return (
                            <div
                              className="boss-trigger-node"
                              style={{
                                width: '100%',
                                background: isDefeated ? '#F0FDF4' : isUnlocked ? '#FFFDF0' : '#F8FAFC',
                                border: '3.5px solid #000000',
                                borderRadius: '24px',
                                padding: '16px 18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: isUnlocked || isDefeated ? 'pointer' : 'not-allowed',
                                boxShadow: isDefeated
                                  ? '6px 6px 0px #000000'
                                  : isUnlocked
                                  ? '6px 6px 0px #000000'
                                  : '3px 3px 0px #000000',
                                boxSizing: 'border-box',
                                position: 'relative',
                                transition: 'all 0.15s ease',
                                opacity: isUnlocked || isDefeated ? 1 : 0.82
                              }}
                              onClick={() => {
                                const access = progressionEngine.canAccessNode(node.id, unit, user, safeProgress);
                                if (access.allowed) {
                                  soundService.playToken();
                                  onOpenBoss(node.id, unit);
                                } else {
                                  soundService.playError();
                                  if (onLockedNotice) {
                                    onLockedNotice(
                                      'Jefe Bloqueado',
                                      access.reason || 'Completa todos los niveles y cofres previos para desafiar al Jefe.'
                                    );
                                  }
                                }
                              }}
                            >
                              {/* Pestaña tipo folder del jefe Neo-Brutal */}
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '-14px',
                                  left: '18px',
                                  background: isDefeated
                                    ? '#4ADE80'
                                    : isUnlocked
                                    ? '#FF4365'
                                    : '#CBD5E1',
                                  border: '2.5px solid #000000',
                                  borderBottom: 'none',
                                  borderRadius: '8px 8px 0 0',
                                  padding: '3px 12px',
                                  fontSize: '0.7rem',
                                  fontWeight: 900,
                                  color: isUnlocked && !isDefeated ? '#FFFFFF' : '#000000',
                                  letterSpacing: '0.5px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}
                              >
                                {isDefeated ? (
                                  <>
                                    <Trophy size={13} color="#000000" strokeWidth={3} />
                                    <span>JEFE SUPERADO · CORONA GANADA</span>
                                  </>
                                ) : isUnlocked ? (
                                  <>
                                    <Swords size={13} color="#FFFFFF" strokeWidth={3} />
                                    <span>BATALLA FINAL DE UNIDAD</span>
                                  </>
                                ) : (
                                  <>
                                    <Lock size={13} color="#000000" strokeWidth={2.8} />
                                    <span>JEFE BLOQUEADO</span>
                                  </>
                                )}
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
                                {/* Frame Neo-Brutalista con el Avatar 3D del Jefe */}
                                <div
                                  style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '16px',
                                    background: isDefeated ? '#DCFCE7' : isUnlocked ? '#FEF3C7' : '#E2E8F0',
                                    border: '3px solid #000000',
                                    boxShadow: '3px 3px 0px #000000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    overflow: 'visible',
                                    position: 'relative'
                                  }}
                                >
                                  <BossAvatar3D
                                    avatarType={bossChallenge.avatarType}
                                    primaryColor={bossChallenge.primaryColor}
                                    accentColor={bossChallenge.accentColor}
                                    pose={isDefeated ? 'defeated' : 'idle'}
                                    size={58}
                                    showPedestal={false}
                                  />
                                </div>

                                <div style={{ minWidth: 0, flex: 1 }}>
                                  <div
                                    style={{
                                      fontSize: '0.72rem',
                                      fontWeight: 900,
                                      color: isDefeated ? '#15803D' : isUnlocked ? '#B45309' : '#64748B',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px'
                                    }}
                                  >
                                    UNIDAD {unit.id} · RETO DE INTEGRACIÓN
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '1.08rem',
                                      fontWeight: 900,
                                      color: '#0F172A',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}
                                  >
                                    {bossChallenge.name}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '0.74rem',
                                      fontWeight: 800,
                                      color: '#475569',
                                      marginTop: '3px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px'
                                    }}
                                  >
                                    <span
                                      style={{
                                        background: '#FFE600',
                                        padding: '1px 6px',
                                        borderRadius: '5px',
                                        border: '1.5px solid #000000',
                                        color: '#000000',
                                        fontWeight: 900,
                                        fontSize: '0.68rem'
                                      }}
                                    >
                                      +120 XP
                                    </span>
                                    <span
                                      style={{
                                        background: '#00E5FF',
                                        padding: '1px 6px',
                                        borderRadius: '5px',
                                        border: '1.5px solid #000000',
                                        color: '#000000',
                                        fontWeight: 900,
                                        fontSize: '0.68rem'
                                      }}
                                    >
                                      +60 Bytes
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div style={{ flexShrink: 0, marginLeft: '12px' }}>
                                {isDefeated ? (
                                  <div
                                    style={{
                                      background: '#4ADE80',
                                      border: '2.5px solid #000000',
                                      boxShadow: '3px 3px 0px #000000',
                                      borderRadius: '12px',
                                      padding: '8px 14px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                      fontSize: '0.78rem',
                                      fontWeight: 900,
                                      color: '#000000'
                                    }}
                                  >
                                    <CheckCircle2 size={16} strokeWidth={3} />
                                    <span>VENCIDO</span>
                                  </div>
                                ) : isUnlocked ? (
                                  <div
                                    style={{
                                      background: '#FFE600',
                                      border: '2.5px solid #000000',
                                      boxShadow: '3px 3px 0px #000000',
                                      color: '#000000',
                                      borderRadius: '14px',
                                      padding: '8px 16px',
                                      fontSize: '0.84rem',
                                      fontWeight: 900,
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px'
                                    }}
                                  >
                                    <span>PELEAR</span>
                                    <Swords size={16} color="#000000" strokeWidth={3} />
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      background: '#E2E8F0',
                                      border: '2px solid #000000',
                                      boxShadow: '2px 2px 0px #000000',
                                      borderRadius: '10px',
                                      padding: '6px 10px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      color: '#64748B'
                                    }}
                                  >
                                    <Lock size={18} color="#000000" strokeWidth={2.5} />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}
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
