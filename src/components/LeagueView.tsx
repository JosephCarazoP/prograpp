import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle2,
  Info,
  Zap,
  BookOpen,
  X
} from 'lucide-react';
import { UserProfile, LeagueTier } from '../types/user';
import { DevAvatar, ConsoleDevAvatar } from './Avatars';
import { soundService } from '../services/soundService';
import {
  leagueService,
  LeagueLeaderboardData,
  LEAGUE_TIER_META
} from '../services/leagueService';

interface LeagueViewProps {
  user: UserProfile;
  onNavigateToPlay: () => void;
  onNavigateToCourses: () => void;
}

const ORDERED_TIERS: LeagueTier[] = ['bronze', 'silver', 'gold', 'sapphire', 'diamond', 'master'];

/* ═══ ESCUDO VECTORIAL 100% ESTILO DUOLINGO 3D (0% IA, FIEL A LA APP OFICIAL) ═══ */
const ShieldBadge: React.FC<{
  tierKey: LeagueTier;
  isActive: boolean;
  isUnlocked: boolean;
}> = ({ tierKey, isActive, isUnlocked }) => {
  const meta = LEAGUE_TIER_META[tierKey] || LEAGUE_TIER_META.bronze;
  // Proporción idéntica a Duolingo: Activo es grande y protagónico, inactivos son más pequeños
  const width = isActive ? 66 : 46;
  const height = isActive ? 76 : 52;
  const clipId = `duo-shield-clip-${tierKey}`;

  // Paletas de color por Liga (3D base inferior, cara superior, placa interior, detalles)
  const TIER_THEMES: Record<LeagueTier, {
    base3D: string;
    face: string;
    inner: string;
    glow: string;
    accent: string;
  }> = {
    bronze: {
      base3D: '#8A4518',
      face: '#D47E45',
      inner: '#BA6832',
      glow: 'rgba(212, 126, 69, 0.4)',
      accent: '#FFD4B8'
    },
    silver: {
      base3D: '#8E9DAE',
      face: '#D6E2EB',
      inner: '#BED0DD',
      glow: 'rgba(214, 226, 235, 0.4)',
      accent: '#FFFFFF'
    },
    gold: {
      base3D: '#D97706',
      face: '#FFC800',
      inner: '#FFB100',
      glow: 'rgba(255, 200, 0, 0.45)',
      accent: '#FFF066'
    },
    sapphire: {
      base3D: '#0369A1',
      face: '#1CB0F6',
      inner: '#0284C7',
      glow: 'rgba(28, 176, 246, 0.4)',
      accent: '#BAE6FD'
    },
    diamond: {
      base3D: '#6D28D9',
      face: '#A855F7',
      inner: '#7E22CE',
      glow: 'rgba(168, 85, 247, 0.4)',
      accent: '#F3E8FF'
    },
    master: {
      base3D: '#9F1239',
      face: '#FF4B4B',
      inner: '#E11D48',
      glow: 'rgba(255, 75, 75, 0.4)',
      accent: '#FFE4E6'
    }
  };

  const theme = TIER_THEMES[tierKey] || TIER_THEMES.bronze;

  // 1. Escudo Bloqueado (Estilo Duolingo con silueta de cerradura / keyhole sobre gris suave)
  if (!isUnlocked) {
    return (
      <div
        title={`${meta.name} (Bloqueada)`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          opacity: 0.8,
          transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          flexShrink: 0
        }}
      >
        <svg width={width} height={height} viewBox="0 0 64 74" fill="none">
          {/* Base 3D sólida inferior (sombra Duolingo) */}
          <path
            d="M 18 12 L 46 12 C 51.5 12 56 17.5 56 24 L 56 42 C 56 55 44 66 32 66 C 20 66 8 55 8 42 L 8 24 C 8 17.5 12.5 12 18 12 Z"
            fill="#94A3B8"
          />
          {/* Cara superior redondeada Duolingo */}
          <path
            d="M 18 6 L 46 6 C 51.5 6 56 11.5 56 18 L 56 36 C 56 49 44 60 32 60 C 20 60 8 49 8 36 L 8 18 C 8 11.5 12.5 6 18 6 Z"
            fill="#E2E8F0"
          />
          {/* Placa interior rehundida */}
          <path
            d="M 21 9 L 43 9 C 47.4 9 51 12.6 51 17 L 51 33 C 51 43.5 41.5 53 32 53 C 22.5 53 13 43.5 13 33 L 13 17 C 13 12.6 16.6 9 21 9 Z"
            fill="#CBD5E1"
          />
          {/* Silueta de ojo de cerradura (Keyhole) centrado Duolingo */}
          <circle cx="32" cy="27" r="4.5" fill="#64748B" />
          <path
            d="M 29.5 29 L 34.5 29 L 36.5 39 C 36.5 40 35.5 41 34 41 L 30 41 C 28.5 41 27.5 40 27.5 39 Z"
            fill="#64748B"
          />
        </svg>
      </div>
    );
  }

  // 2. Escudo Activo (El gran protagonista: volumen 3D Duolingo, marco grueso, brillo superior y pluma / emblema icónico)
  if (isActive) {
    return (
      <div
        title={`${meta.name} (Tu Liga Actual)`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          filter: `drop-shadow(0 8px 18px ${theme.glow})`,
          transform: 'translateY(-2px)',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          flexShrink: 0,
          cursor: 'pointer'
        }}
      >
        <svg width={width} height={height} viewBox="0 0 64 74" fill="none">
          <defs>
            <linearGradient id={`duoGrad-${tierKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.accent} />
              <stop offset="25%" stopColor={theme.face} />
              <stop offset="100%" stopColor={theme.inner} />
            </linearGradient>
            <linearGradient id="duoFeatherUpper" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFA726" />
              <stop offset="100%" stopColor="#FB8C00" />
            </linearGradient>
            <linearGradient id="duoFeatherLower" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F57C00" />
              <stop offset="100%" stopColor="#E65100" />
            </linearGradient>
          </defs>

          {/* Base 3D inferior gruesa */}
          <path
            d="M 18 12 L 46 12 C 51.5 12 56 17.5 56 24 L 56 42 C 56 55 44 66 32 66 C 20 66 8 55 8 42 L 8 24 C 8 17.5 12.5 12 18 12 Z"
            fill={theme.base3D}
          />

          {/* Cara frontal con borde redondeado Duolingo */}
          <path
            d="M 18 6 L 46 6 C 51.5 6 56 11.5 56 18 L 56 36 C 56 49 44 60 32 60 C 20 60 8 49 8 36 L 8 18 C 8 11.5 12.5 6 18 6 Z"
            fill={`url(#duoGrad-${tierKey})`}
          />

          {/* Placa interior rehundida */}
          <path
            d="M 21 9 L 43 9 C 47.4 9 51 12.6 51 17 L 51 33 C 51 43.5 41.5 53 32 53 C 22.5 53 13 43.5 13 33 L 13 17 C 13 12.6 16.6 9 21 9 Z"
            fill={theme.inner}
          />

          {/* Reflejo / brillo especular superior característico */}
          <path
            d="M 21 10 L 43 10 C 46 10 48 12 47 14 C 39 12.5 25 12.5 17 14 C 16 12 18 10 21 10 Z"
            fill="#FFFFFF"
            fillOpacity="0.45"
          />

          {/* Insignia oficial: Pluma Duolingo estilizada en relieve 3D de dos tonos */}
          {tierKey === 'gold' ? (
            <g>
              {/* Tallo del plumín */}
              <line x1="22" y1="44" x2="19" y2="47" stroke="#BF360C" strokeWidth="2.5" strokeLinecap="round" />
              {/* Lóbulo superior (tono brillante) */}
              <path
                d="M 22 44 C 20 33, 29 21, 42 20 L 22 44 Z"
                fill="url(#duoFeatherUpper)"
              />
              {/* Lóbulo inferior (tono profundo en sombra) */}
              <path
                d="M 22 44 L 42 20 C 43 32, 34 44, 22 44 Z"
                fill="url(#duoFeatherLower)"
              />
              {/* Nervadura central divisoria */}
              <line x1="22" y1="44" x2="42" y2="20" stroke="#FFE082" strokeWidth="1" strokeLinecap="round" />
            </g>
          ) : (
            /* Emblema estilizado en sintonía con Duolingo para las demás ligas activas */
            <g>
              <line x1="22" y1="44" x2="19" y2="47" stroke={theme.base3D} strokeWidth="2.5" strokeLinecap="round" />
              <path
                d="M 22 44 C 20 33, 29 21, 42 20 L 22 44 Z"
                fill="#FFFFFF"
                fillOpacity="0.4"
              />
              <path
                d="M 22 44 L 42 20 C 43 32, 34 44, 22 44 Z"
                fill="#FFFFFF"
                fillOpacity="0.2"
              />
              <line x1="22" y1="44" x2="42" y2="20" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // 3. Escudo Superado / Desbloqueado (Bronce, Plata, etc. - limpio, biselado 3D con reflejo diagonal oficial Duolingo)
  return (
    <div
      title={`${meta.name} (Completada)`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        opacity: 0.92,
        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        flexShrink: 0,
        cursor: 'pointer'
      }}
    >
      <svg width={width} height={height} viewBox="0 0 64 74" fill="none">
        <defs>
          <clipPath id={clipId}>
            <path d="M 18 6 L 46 6 C 51.5 6 56 11.5 56 18 L 56 36 C 56 49 44 60 32 60 C 20 60 8 49 8 36 L 8 18 C 8 11.5 12.5 6 18 6 Z" />
          </clipPath>
        </defs>

        {/* Base 3D sólida inferior */}
        <path
          d="M 18 12 L 46 12 C 51.5 12 56 17.5 56 24 L 56 42 C 56 55 44 66 32 66 C 20 66 8 55 8 42 L 8 24 C 8 17.5 12.5 12 18 12 Z"
          fill={theme.base3D}
        />

        {/* Cara frontal */}
        <path
          d="M 18 6 L 46 6 C 51.5 6 56 11.5 56 18 L 56 36 C 56 49 44 60 32 60 C 20 60 8 49 8 36 L 8 18 C 8 11.5 12.5 6 18 6 Z"
          fill={theme.face}
        />

        {/* Reflejo diagonal auténtico Duolingo (corte diagonal que le da el brillo y volumen 3D) */}
        <path
          d="M 0 0 L 64 0 L 0 64 Z"
          fill="#FFFFFF"
          fillOpacity="0.22"
          clipPath={`url(#${clipId})`}
        />

        {/* Brillo especular superior tenue */}
        <path
          d="M 21 9 L 43 9 C 46 9 48 11 47 13 C 39 11.5 25 11.5 17 13 C 16 11 18 9 21 9 Z"
          fill="#FFFFFF"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
};

/* ═══ MEDALLA / INSIGNIA DE PUESTO ESTILO DUOLINGO ═══ */
const RankBadge: React.FC<{ rank: number }> = ({ rank }) => {
  if (rank === 1) {
    return (
      <div style={{ position: 'relative', width: '28px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
          {/* Lazos de cinta dorada */}
          <path d="M 6 22 L 6 32 L 11 28 L 16 32 L 16 22 Z" fill="#D97706" />
          <path d="M 12 22 L 12 32 L 17 28 L 22 32 L 22 22 Z" fill="#B45309" opacity="0.75" />
          {/* Círculo dorado */}
          <circle cx="14" cy="14" r="12" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="14" cy="14" r="9.5" fill="#F59E0B" />
        </svg>
        <span style={{ position: 'absolute', top: '3.5px', left: 0, right: 0, textAlign: 'center', color: '#FFFFFF', fontWeight: 900, fontSize: '0.85rem' }}>
          1
        </span>
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div style={{ position: 'relative', width: '28px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
          <path d="M 6 22 L 6 32 L 11 28 L 16 32 L 16 22 Z" fill="#94A3B8" />
          <path d="M 12 22 L 12 32 L 17 28 L 22 32 L 22 22 Z" fill="#64748B" opacity="0.7" />
          <circle cx="14" cy="14" r="12" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="14" cy="14" r="9.5" fill="#94A3B8" />
        </svg>
        <span style={{ position: 'absolute', top: '3.5px', left: 0, right: 0, textAlign: 'center', color: '#FFFFFF', fontWeight: 900, fontSize: '0.85rem' }}>
          2
        </span>
      </div>
    );
  }

  if (rank === 3) {
    return (
      <div style={{ position: 'relative', width: '28px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
          <path d="M 6 22 L 6 32 L 11 28 L 16 32 L 16 22 Z" fill="#C2410C" />
          <path d="M 12 22 L 12 32 L 17 28 L 22 32 L 22 22 Z" fill="#9A3412" opacity="0.7" />
          <circle cx="14" cy="14" r="12" fill="#FDBA74" stroke="#FB923C" strokeWidth="2" />
          <circle cx="14" cy="14" r="9.5" fill="#EA580C" />
        </svg>
        <span style={{ position: 'absolute', top: '3.5px', left: 0, right: 0, textAlign: 'center', color: '#FFFFFF', fontWeight: 900, fontSize: '0.85rem' }}>
          3
        </span>
      </div>
    );
  }

  return (
    <span
      style={{
        display: 'inline-block',
        width: '28px',
        textAlign: 'center',
        fontWeight: 900,
        fontSize: '1.05rem',
        color: rank <= 5 ? '#22C55E' : '#94A3B8'
      }}
    >
      {rank}
    </span>
  );
};

export const LeagueView: React.FC<LeagueViewProps> = ({
  user,
  onNavigateToPlay,
  onNavigateToCourses
}) => {
  const [data, setData] = useState<LeagueLeaderboardData | null>(() => leagueService.getCachedLeaderboard(user));
  const [filterGroup, setFilterGroup] = useState<'all' | 'my_group'>('all');
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  const loadLeagueData = async () => {
    try {
      const res = await leagueService.getLeaderboard(user);
      setData(res);
    } catch (err) {
      console.warn('Error cargando Liga:', err);
    }
  };

  useEffect(() => {
    loadLeagueData();

    const handleUpdate = () => loadLeagueData();
    window.addEventListener('prograpp_league_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('prograpp_league_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [user.uid]);

  const userGroup = user.group || 'Grupo A';

  const displayedEntries = (data?.entries || []).filter((e) => {
    if (filterGroup === 'my_group') {
      return e.group === userGroup;
    }
    return true;
  });

  const currentTier = user.currentLeague || 'bronze';
  const tierMeta = LEAGUE_TIER_META[currentTier] || LEAGUE_TIER_META.bronze;
  const currentTierIndex = ORDERED_TIERS.indexOf(currentTier);

  const currentUserEntry = data?.currentUserEntry;
  const userPos = currentUserEntry?.position || 1;

  // Cálculo de tendencia
  let trendIcon = <Minus size={16} color="#94A3B8" strokeWidth={3} />;
  let trendLabel = '0 puestos';
  let trendColor = '#64748B';

  if (currentUserEntry?.trend === 'up') {
    trendIcon = <ArrowUp size={16} color="#22C55E" strokeWidth={3} />;
    trendLabel = '+1 puesto';
    trendColor = '#15803D';
  } else if (currentUserEntry?.trend === 'down') {
    trendIcon = <ArrowDown size={16} color="#EF4444" strokeWidth={3} />;
    trendLabel = '-1 puesto';
    trendColor = '#DC2626';
  }

  return (
    <div style={{ maxWidth: '580px', margin: '0 auto', width: '100%', padding: '12px 14px 100px 14px', boxSizing: 'border-box' }}>
      {/* ═══ CABECERA DE ESCUDOS HORIZONTAL (ESTILO DUOLINGO) ═══ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          paddingTop: '6px',
          marginBottom: '16px'
        }}
      >
        {ORDERED_TIERS.map((tierKey, idx) => {
          const isActive = tierKey === currentTier;
          const isUnlocked = idx <= currentTierIndex;
          return (
            <ShieldBadge
              key={tierKey}
              tierKey={tierKey}
              isActive={isActive}
              isUnlocked={isUnlocked}
            />
          );
        })}
      </div>

      {/* ═══ TÍTULO DE LA LIGA ═══ */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div
          style={{
            display: 'inline-block',
            background: '#FFE600',
            border: '2.5px solid #000000',
            borderRadius: '8px',
            boxShadow: '2.5px 2.5px 0px #000000',
            padding: '3px 12px',
            fontSize: '0.74rem',
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}
        >
          LIGA SEMANAL
        </div>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 900,
            color: '#000000',
            margin: '0 0 2px 0',
            letterSpacing: '-0.02em'
          }}
        >
          {tierMeta.name}
        </h1>
        <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', fontWeight: 800 }}>
          Semana {data?.weekNumber || 1} • {data?.year || 2026}
        </p>
      </div>

      {/* ═══ ESTADO DE CARGA ANIMADO CON AVATAR NEO-BRUTALIST (SI NO HAY DATOS) ═══ */}
      {!data ? (
        <div
          style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            borderRadius: '20px',
            boxShadow: '6px 6px 0px #000000',
            padding: '38px 20px',
            margin: '18px 0 24px 0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Avatar Animado con micro-bobbing y badge de estado */}
          <div
            style={{
              position: 'relative',
              marginBottom: '22px',
              animation: 'devBobAlive 2.2s ease-in-out infinite'
            }}
          >
            <ConsoleDevAvatar size={86} mood="thinking" />
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-14px',
                background: '#FFE600',
                border: '2px solid #000000',
                borderRadius: '8px',
                padding: '2px 8px',
                fontSize: '0.68rem',
                fontWeight: 900,
                color: '#000000',
                boxShadow: '2px 2px 0px #000000',
                letterSpacing: '0.5px'
              }}
            >
              SYNC LIGA
            </div>
          </div>

          {/* Globo de Diálogo Neo-Brutalist */}
          <div
            style={{
              background: '#FFE600',
              border: '2.5px solid #000000',
              borderRadius: '14px',
              boxShadow: '3.5px 3.5px 0px #000000',
              padding: '12px 20px',
              maxWidth: '380px',
              marginBottom: '20px',
              position: 'relative'
            }}
          >
            <div
              style={{
                fontSize: '0.96rem',
                fontWeight: 900,
                color: '#000000',
                lineHeight: 1.3
              }}
            >
              ¡Organizando el podio semanal!
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#1E293B',
                marginTop: '4px',
                lineHeight: 1.35
              }}
            >
              El robot Byte está sincronizando el XP acumulado, precisión académica y posiciones de todos los compañeros.
            </div>
          </div>

          {/* Barra de progreso de carga estilizada */}
          <div
            style={{
              width: '100%',
              maxWidth: '260px',
              height: '14px',
              background: '#F1F5F9',
              border: '2px solid #000000',
              borderRadius: '999px',
              overflow: 'hidden',
              padding: '2px',
              boxSizing: 'border-box',
              marginBottom: '12px'
            }}
          >
            <div
              style={{
                width: '55%',
                height: '100%',
                background: '#22C55E',
                borderRadius: '999px',
                animation: 'pulse 1.2s ease-in-out infinite alternate'
              }}
            />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#64748B'
            }}
          >
            <Clock size={13} color="#64748B" strokeWidth={2.5} />
            <span>Calculando estadísticas en vivo...</span>
          </div>
        </div>
      ) : (
        <>
          {/* ═══ CAJA DE DOS COLUMNAS: TIEMPO RESTANTE Y HOY (NEO-BRUTALISM) ═══ */}
          <div
        style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '16px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '18px',
          boxShadow: '4px 4px 0px #000000'
        }}
      >
        {/* Columna Izquierda: TIEMPO RESTANTE */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 900,
              color: '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              marginBottom: '4px'
            }}
          >
            TIEMPO RESTANTE
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.98rem',
              fontWeight: 900,
              color: '#D97706'
            }}
          >
            <Clock size={16} color="#D97706" strokeWidth={2.8} />
            <span>{data ? `${data.daysRemaining} días` : 'Calculando...'}</span>
          </div>
        </div>

        {/* Separador vertical negro grueso */}
        <div style={{ width: '2px', height: '36px', background: '#000000' }} />

        {/* Columna Derecha: HOY */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 900,
              color: '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              marginBottom: '4px'
            }}
          >
            HOY
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.98rem',
              fontWeight: 900,
              color: trendColor
            }}
          >
            {trendIcon}
            <span>{currentUserEntry ? `${trendLabel} (#${userPos})` : trendLabel}</span>
          </div>
        </div>
      </div>

      {/* ═══ FILTRO DE GRUPO NEO-BRUTAL ═══ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          padding: '0 2px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              soundService.playToken();
              setFilterGroup('all');
            }}
            style={{
              padding: '7px 14px',
              borderRadius: '10px',
              border: '2.5px solid #000000',
              background: filterGroup === 'all' ? '#E0F2FE' : '#FFFFFF',
              color: filterGroup === 'all' ? '#0369A1' : '#000000',
              boxShadow: filterGroup === 'all' ? '2.5px 2.5px 0px #000000' : '1.5px 1.5px 0px #000000',
              fontSize: '0.8rem',
              fontWeight: 900,
              cursor: 'pointer',
              transition: 'all 0.1s ease'
            }}
          >
            Todos ({data?.entries.length || 0})
          </button>

          <button
            onClick={() => {
              soundService.playToken();
              setFilterGroup('my_group');
            }}
            style={{
              padding: '7px 14px',
              borderRadius: '10px',
              border: '2.5px solid #000000',
              background: filterGroup === 'my_group' ? '#E0F2FE' : '#FFFFFF',
              color: filterGroup === 'my_group' ? '#0369A1' : '#000000',
              boxShadow: filterGroup === 'my_group' ? '2.5px 2.5px 0px #000000' : '1.5px 1.5px 0px #000000',
              fontSize: '0.8rem',
              fontWeight: 900,
              cursor: 'pointer',
              transition: 'all 0.1s ease'
            }}
          >
            Mi Grupo ({userGroup})
          </button>
        </div>

        <button
          onClick={() => {
            soundService.playToken();
            setShowRulesModal(true);
          }}
          style={{
            background: '#FFFFFF',
            border: '2px solid #000000',
            borderRadius: '8px',
            boxShadow: '2px 2px 0px #000000',
            padding: '5px 10px',
            color: '#000000',
            fontSize: '0.76rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.1s ease'
          }}
        >
          <Info size={14} color="#0284C7" strokeWidth={2.6} />
          <span>Reglas de Liga</span>
        </button>
      </div>

      {/* ═══ LISTA DE PARTICIPANTES NEO-BRUTAL ═══ */}
      <div
        style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '5px 5px 0px #000000'
        }}
      >
        {displayedEntries.map((entry, index) => {
          const isMe = entry.uid === user.uid;
          const pos = index + 1;
          const isPromotionDivider = pos === 5;
          const isLast = index === displayedEntries.length - 1;

          return (
            <React.Fragment key={entry.uid}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: isMe ? '#E0F2FE' : 'transparent',
                  borderBottom: isPromotionDivider ? 'none' : isLast ? 'none' : '2px solid #000000',
                  transition: 'background-color 0.15s ease'
                }}
              >
                {/* 1. Medalla o Posición numérica */}
                <div style={{ width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <RankBadge rank={pos} />
                </div>

                {/* 2. Avatar propio de la app */}
                <div style={{ position: 'relative', margin: '0 14px 0 10px', flexShrink: 0 }}>
                  <DevAvatar avatarId={entry.avatarId} skinId={entry.equippedSkin} size={42} />
                  {entry.isOnline && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '0px',
                        right: '0px',
                        width: '11px',
                        height: '11px',
                        borderRadius: '50%',
                        background: '#22C55E',
                        border: '1.5px solid #000000'
                      }}
                      title="En línea"
                    />
                  )}
                </div>

                {/* 3. Nombre del Estudiante */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 900,
                        color: isMe ? '#0369A1' : '#000000',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {entry.displayName} {isMe && '(Tú)'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#475569', fontWeight: 800 }}>
                    {entry.studentCode} • {entry.group}
                  </span>
                </div>

                {/* 4. Puntaje XP a la derecha */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 900,
                      color: isMe ? '#0284C7' : '#000000'
                    }}
                  >
                    {entry.totalLeaguePoints.toLocaleString()} XP
                  </span>
                </div>
              </div>

              {/* Divisor de Zona de Ascenso (después del puesto 5) */}
              {isPromotionDivider && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 16px',
                    background: '#DCFCE7',
                    borderTop: '2.5px dashed #000000',
                    borderBottom: isLast ? 'none' : '2.5px dashed #000000'
                  }}
                >
                  <div style={{ flex: 1, height: '2px', background: '#000000', opacity: 0.15 }} />
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      background: '#15803D',
                      border: '1.5px solid #000000',
                      boxShadow: '1.5px 1.5px 0px #000000',
                      borderRadius: '6px',
                      padding: '2px 8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>ZONA DE ASCENSO</span>
                  </span>
                  <div style={{ flex: 1, height: '2px', background: '#000000', opacity: 0.15 }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      </>
    )}

      {/* ═══ BOTONES INFERIORES DE ACCIÓN RÁPIDA NEO-BRUTAL ═══ */}
      <div
        style={{
          marginTop: '22px',
          display: 'flex',
          gap: '12px'
        }}
      >
        <button
          onClick={() => {
            soundService.playToken();
            onNavigateToPlay();
          }}
          style={{
            flex: 1,
            padding: '13px 16px',
            fontSize: '0.94rem',
            fontWeight: 900,
            borderRadius: '14px',
            background: '#22C55E',
            color: '#FFFFFF',
            border: '2.5px solid #000000',
            boxShadow: '4px 4px 0px #000000',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.1s ease'
          }}
        >
          <Zap size={16} fill="#FFFFFF" strokeWidth={2.4} />
          <span>¡JUGAR NIVELES!</span>
        </button>

        <button
          onClick={() => {
            soundService.playToken();
            onNavigateToCourses();
          }}
          style={{
            flex: 1,
            padding: '13px 16px',
            fontSize: '0.94rem',
            fontWeight: 900,
            borderRadius: '14px',
            background: '#2563EB',
            color: '#FFFFFF',
            border: '2.5px solid #000000',
            boxShadow: '4px 4px 0px #000000',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.1s ease'
          }}
        >
          <BookOpen size={16} strokeWidth={2.4} />
          <span>LEER MATERIAS (+60 XP)</span>
        </button>
      </div>

      {/* ═══ MODAL INFORMATIVO: CÓMO SUMAR PUNTOS EN LA LIGA ═══ */}
      {showRulesModal && (
        <div
          onClick={() => setShowRulesModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '3px solid #000000',
              maxWidth: '480px',
              width: '100%',
              padding: '24px',
              boxShadow: '8px 8px 0px #000000'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={22} color="#D97706" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#000000' }}>
                  Puntajes de la Liga
                </h3>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #000000',
                  borderRadius: '10px',
                  boxShadow: '2px 2px 0px #000000',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} color="#000000" strokeWidth={2.6} />
              </button>
            </div>

            <p style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.5, margin: '0 0 16px 0' }}>
              La Liga premia la constancia, la precisión y el estudio diario:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '12px 14px', borderRadius: '12px', border: '2px solid #000000', boxShadow: '2.5px 2.5px 0px #000000' }}>
                <BookOpen size={18} color="#0284C7" strokeWidth={2.4} />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.86rem', color: '#000000', display: 'block', fontWeight: 900 }}>Leer Materia en Cursos (+60 XP)</strong>
                  <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700 }}>Leer las lecciones interactivas y probar código en vivo.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '12px 14px', borderRadius: '12px', border: '2px solid #000000', boxShadow: '2.5px 2.5px 0px #000000' }}>
                <Zap size={18} color="#16A34A" strokeWidth={2.4} />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.86rem', color: '#000000', display: 'block', fontWeight: 900 }}>Quizzes Exprés (+45 XP)</strong>
                  <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700 }}>Superar los micro-quizzes de validación teórica.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '12px 14px', borderRadius: '12px', border: '2px solid #000000', boxShadow: '2.5px 2.5px 0px #000000' }}>
                <CheckCircle2 size={18} color="#D97706" strokeWidth={2.4} />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.86rem', color: '#000000', display: 'block', fontWeight: 900 }}>Bono de Precisión (+50 a +200 XP)</strong>
                  <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700 }}>Quien comete menos errores en los retos suma puntos extra.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowRulesModal(false)}
              style={{
                width: '100%',
                marginTop: '20px',
                padding: '13px',
                borderRadius: '14px',
                fontWeight: 900,
                fontSize: '0.94rem',
                background: '#2563EB',
                color: '#FFFFFF',
                border: '2.5px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                cursor: 'pointer'
              }}
            >
              ¡ENTENDIDO, A COMPETIR!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
