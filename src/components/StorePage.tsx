import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Zap,
  Flame,
  Lock,
  Check,
  RotateCcw,
  RotateCw,
  Sparkles,
  Award,
  CheckCircle2,
  MoveHorizontal,
  Shield,
  HelpCircle,
  Scissors,
  ShoppingBag,
  Sparkle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types/user';
import { BYTE_SKINS, ByteSkin, getRankByUser } from '../types/skins';
import { ByteFullBody3D, BytePose } from './ByteFullBody3D';
import { DevAvatar } from './Avatars';
import { soundService } from '../services/soundService';
import { userService } from '../services/userService';

interface StorePageProps {
  user: UserProfile;
  totalStars?: number;
  onBack: () => void;
  onUpdateUser: (updated: UserProfile) => void;
}

type StoreTab = 'skins' | 'powerups';

const AVATAR_OPTIONS = [
  { id: 'robot_byte', name: 'Byte', label: 'Robot Asistente' },
  { id: 'ada_hacker', name: 'Ada', label: 'Hacker & Lógica' },
  { id: 'linus_coder', name: 'Linus', label: 'Kernel & Coder' },
  { id: 'turing_wizard', name: 'Turing', label: 'Sabio & Algoritmos' },
  { id: 'console_dev', name: 'Consola', label: 'Terminal Dev' }
];

export const StorePage: React.FC<StorePageProps> = ({
  user,
  totalStars = 0,
  onBack,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState<StoreTab>('skins');

  const unlockedList = Array.isArray(user.unlockedSkins) && user.unlockedSkins.length > 0
    ? user.unlockedSkins
    : ['byte_classic'];

  const currentEquipped = user.equippedSkin || 'byte_classic';

  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(() => {
    const raw = user.avatarId || 'robot_byte';
    if (raw.startsWith('byte_')) return 'robot_byte';
    if (raw.includes('__')) return raw.split('__')[0];
    return raw;
  });

  const [previewSkinId, setPreviewSkinId] = useState<string>(currentEquipped);
  const [currentPose, setCurrentPose] = useState<BytePose>('idle');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dragStartRef = useRef<{ startX: number; startAngle: number } | null>(null);

  const currentRank = getRankByUser(user.totalXp || 0, totalStars);
  const selectedSkin = BYTE_SKINS.find((s) => s.id === previewSkinId) || BYTE_SKINS[0];
  const isSelectedUnlocked = unlockedList.includes(selectedSkin.id);
  const isSelectedEquipped =
    currentEquipped === selectedSkin.id &&
    ((user.avatarId || 'robot_byte') === selectedAvatarId ||
      (user.avatarId?.startsWith('byte_') && selectedAvatarId === 'robot_byte'));

  // Requisitos de desbloqueo de skins
  const canAffordSkin = (user.bytes || 0) >= selectedSkin.costBytes;
  const meetsStars = !selectedSkin.requiredStars || totalStars >= selectedSkin.requiredStars;
  const meetsStreak = !selectedSkin.requiredStreak || (user.streak?.count || 0) >= selectedSkin.requiredStreak;
  const meetsBosses = !selectedSkin.requiredBosses || (user.defeatedBosses?.length || 0) >= selectedSkin.requiredBosses;
  const canUnlockSkin = canAffordSkin && meetsStars && meetsStreak && meetsBosses;

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 2600);
  };

  // Rotación 3D interactiva
  const handleRotateStep = (dir: 'left' | 'right') => {
    soundService.playToken();
    setRotationAngle((prev) => (dir === 'left' ? (prev - 45 + 360) % 360 : (prev + 45) % 360));
  };

  const handleSetAngle = (angle: number) => {
    soundService.playToken();
    setRotationAngle(angle);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    dragStartRef.current = { startX: e.clientX, startAngle: rotationAngle };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const nextAngle = ((dragStartRef.current.startAngle - deltaX * 1.05) % 360 + 360) % 360;
    setRotationAngle(Math.round(nextAngle));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    dragStartRef.current = null;
    setIsDragging(false);
  };

  const handlePoseChange = (newPose: BytePose) => {
    soundService.playToken();
    setCurrentPose(newPose);
  };

  // Equipar skin en el avatar seleccionado
  const handleEquipSkin = async (skin: ByteSkin) => {
    soundService.playToken();
    const updated: UserProfile = {
      ...user,
      avatarId: selectedAvatarId,
      equippedSkin: skin.id
    };
    onUpdateUser(updated);
    const avName = AVATAR_OPTIONS.find((a) => a.id === selectedAvatarId)?.name || 'tu avatar';
    showToast(`¡Equipaste ${skin.name} a ${avName}!`, 'success');
    await userService.updateProfile(updated);
  };

  // Comprar y desbloquear skin
  const handleUnlockSkin = async (skin: ByteSkin) => {
    if (!canUnlockSkin) {
      soundService.playError();
      return;
    }

    soundService.playChest();
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#58CC02', '#1CB0F6', '#FF9600', '#CE82FF']
      });
    } catch {}

    const nextBytes = Math.max(0, (user.bytes || 0) - skin.costBytes);
    const nextUnlocked = Array.from(new Set([...unlockedList, skin.id]));

    const updated: UserProfile = {
      ...user,
      bytes: nextBytes,
      unlockedSkins: nextUnlocked,
      avatarId: selectedAvatarId,
      equippedSkin: skin.id
    };

    onUpdateUser(updated);
    showToast(`¡Desbloqueaste ${skin.name}!`, 'success');
    await userService.updateProfile(updated);
  };

  // 2. Protector de Racha (Streak Freeze) por 200 Bytes
  const handleBuyStreakFreeze = async () => {
    const cost = 200;
    if ((user.bytes || 0) < cost) {
      soundService.playError();
      showToast('No tienes suficientes Bytes para el protector de racha', 'info');
      return;
    }
    if (user.streak?.freezeEquipped) {
      soundService.playToken();
      showToast('¡Ya tienes un protector de racha activo!', 'info');
      return;
    }

    soundService.playChest();
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, colors: ['#1CB0F6', '#84D8FF'] });
    } catch {}

    const updated: UserProfile = {
      ...user,
      bytes: Math.max(0, (user.bytes || 0) - cost),
      streak: {
        ...(user.streak || { count: 0, lastActivityDate: '' }),
        freezeEquipped: true
      }
    };
    onUpdateUser(updated);
    showToast('¡Protector de racha equipado! Tu racha no se perderá.', 'success');
    await userService.updateProfile(updated);
  };

  // 3. Comodines individuales (50/50, Segunda Oportunidad, Pista)
  const handleBuyPowerUp = async (
    type: 'eliminateOptions' | 'secondChance' | 'teacherHint',
    cost: number,
    name: string
  ) => {
    if ((user.bytes || 0) < cost) {
      soundService.playError();
      showToast(`No tienes suficientes Bytes para ${name}`, 'info');
      return;
    }

    soundService.playChest();
    const currentCount = user.powerups?.[type] || 0;
    const updated: UserProfile = {
      ...user,
      bytes: Math.max(0, (user.bytes || 0) - cost),
      powerups: {
        ...(user.powerups || { teacherHint: 0, eliminateOptions: 0, secondChance: 0, codePeek: 0 }),
        [type]: currentCount + 1
      }
    };
    onUpdateUser(updated);
    showToast(`¡Compraste 1x ${name}! (${currentCount + 1} disponibles)`, 'success');
    await userService.updateProfile(updated);
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'mythic': return { bg: '#FEF9C3', border: '#EAB308', text: '#854D0E' };
      case 'legendary': return { bg: '#FEF3C7', border: '#F59E0B', text: '#B45309' };
      case 'epic': return { bg: '#F3E8FF', border: '#A855F7', text: '#7E22CE' };
      case 'rare': return { bg: '#E0F2FE', border: '#0EA5E9', text: '#0369A1' };
      case 'common':
      default:
        return { bg: '#F1F5F9', border: '#94A3B8', text: '#475569' };
    }
  };

  const getViewAngleLabel = () => {
    const norm = ((Math.round(rotationAngle) % 360) + 360) % 360;
    if (norm >= 315 || norm < 45) return 'Frente (0°)';
    if (norm >= 45 && norm < 135) return 'Perfil Der. (90°)';
    if (norm >= 135 && norm < 225) return 'Espalda (180°)';
    return 'Perfil Izq. (270°)';
  };

  return (
    <div className="duo-store-page-root">
      {/* ═══ CABECERA DUOLINGO 3D ═══ */}
      <header className="duo-store-topbar">
        <div className="duo-store-nav-left">
          <button
            type="button"
            className="duo-3d-back-btn"
            onClick={() => {
              soundService.playToken();
              onBack();
            }}
            title="Volver a la ruta de aprendizaje"
            aria-label="Volver"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </button>
          <div>
            <div className="duo-store-badge-top">
              <ShoppingBag size={13} /> TIENDA OFICIAL
            </div>
            <h1 className="duo-store-title">Tienda de Byte</h1>
          </div>
        </div>

        {/* CLUSTER DE RECURSOS DUOLINGO 3D */}
        <div className="duo-store-stats-cluster">
          {/* Bytes */}
          <div className="duo-3d-stat-pill bytes" title="Bytes disponibles">
            <Zap size={16} fill="#1CB0F6" color="#1CB0F6" strokeWidth={2.5} />
            <span className="duo-3d-stat-val">{(user.bytes || 0).toLocaleString()}</span>
            <span className="duo-3d-stat-lbl">Bytes</span>
          </div>

          {/* Racha */}
          <div className="duo-3d-stat-pill streak" title="Racha activa">
            <Flame size={16} fill="#FF9600" color="#FF9600" strokeWidth={2.5} />
            <span className="duo-3d-stat-val">{user.streak?.count || 0}</span>
            <span className="duo-3d-stat-lbl">Días</span>
          </div>
        </div>
      </header>

      {/* ═══ SELECTOR DE SECCIONES (TABS DUOLINGO 3D) ═══ */}
      <div className="duo-store-tab-selector">
        <button
          type="button"
          className={`duo-3d-tab-btn ${activeTab === 'skins' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setActiveTab('skins');
          }}
        >
          <Sparkles size={16} />
          <span>VESTIDOR 3D ({BYTE_SKINS.length})</span>
        </button>

        <button
          type="button"
          className={`duo-3d-tab-btn ${activeTab === 'powerups' ? 'active' : ''}`}
          onClick={() => {
            soundService.playToken();
            setActiveTab('powerups');
          }}
        >
          <Zap size={16} />
          <span>POTENCIADORES</span>
        </button>
      </div>

      {/* ═══ NOTIFICACIÓN FLOTANTE (TOAST DUOLINGO 3D) ═══ */}
      {toastMessage && (
        <div className={`duo-store-toast ${toastMessage.type}`}>
          <CheckCircle2 size={16} strokeWidth={3} />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* ═══ TAB 1: VESTIDOR 3D (SKINS) ═══ */}
      {activeTab === 'skins' && (
        <div className="duo-store-skins-container">
          {/* BARRA DE SELECCIÓN DE AVATAR (ADAPTACIÓN MULTI-AVATAR 100%) */}
          <div className="duo-store-avatar-bar">
            <div className="duo-store-avatar-bar-info">
              <span className="duo-store-avatar-bar-tag">VESTIR PERSONAJE</span>
              <span className="duo-store-avatar-bar-title">Elige qué avatar equipar con los trajes:</span>
            </div>
            <div className="duo-store-avatar-tabs">
              {AVATAR_OPTIONS.map((av) => {
                const isAct = selectedAvatarId === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    className={`duo-3d-avatar-tab ${isAct ? 'active' : ''}`}
                    onClick={() => {
                      soundService.playToken();
                      setSelectedAvatarId(av.id);
                    }}
                    title={av.label}
                  >
                    <DevAvatar avatarId={av.id} skinId={previewSkinId} size={28} />
                    <span className="duo-avatar-tab-name">{av.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="duo-store-skins-layout">
            {/* LADO IZQUIERDO: PODIO 3D CON GIRO 360° Y ACCIÓN DUOLINGO */}
            <div className="duo-store-stage-card">
              <div className="duo-stage-header">
                <div
                  className="duo-rank-chip"
                  style={{
                    border: `2px solid ${currentRank.color}`,
                    color: currentRank.color
                  }}
                >
                  <Award size={13} strokeWidth={2.6} />
                  <span>RANGO {currentRank.name.toUpperCase()}</span>
                </div>

                <div className="duo-turntable-indicator">
                  <MoveHorizontal size={13} />
                  <span>{isDragging ? 'GIRANDO...' : getViewAngleLabel().toUpperCase()}</span>
                </div>
              </div>

              {/* Viewport Interactivo con Drag & Touch */}
              <div
                className={`duo-stage-viewport ${isDragging ? 'dragging' : ''}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                title="Arrastra con el dedo o mouse para girar el avatar 360°"
              >
                <ByteFullBody3D
                  avatarId={selectedAvatarId}
                  skinId={previewSkinId}
                  pose={currentPose}
                  rotation={rotationAngle}
                  size={isMobile ? 105 : 155}
                  showPedestal={true}
                  isDragging={isDragging}
                />
              </div>

            {/* Botones de Control de Giro y Poses Duolingo 3D */}
            <div className="duo-stage-controls-wrap">
              <div className="duo-rotation-btn-group">
                <button
                  type="button"
                  className="duo-3d-icon-btn"
                  onClick={() => handleRotateStep('left')}
                  title="Girar 45° a la izquierda"
                >
                  <RotateCcw size={15} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  className={`duo-3d-angle-chip ${Math.abs(rotationAngle % 360) < 20 ? 'active' : ''}`}
                  onClick={() => handleSetAngle(0)}
                >
                  FRENTE
                </button>
                <button
                  type="button"
                  className={`duo-3d-angle-chip ${Math.abs((rotationAngle % 360) - 180) < 20 ? 'active' : ''}`}
                  onClick={() => handleSetAngle(180)}
                >
                  ESPALDA
                </button>
                <button
                  type="button"
                  className="duo-3d-icon-btn"
                  onClick={() => handleRotateStep('right')}
                  title="Girar 45° a la derecha"
                >
                  <RotateCw size={15} strokeWidth={2.5} />
                </button>
              </div>

              {/* Selector de Poses Duolingo 3D */}
              <div className="duo-poses-chip-row">
                {(['idle', 'salute', 'cheer', 'hero'] as BytePose[]).map((pName) => (
                  <button
                    key={pName}
                    type="button"
                    className={`duo-3d-pose-chip ${currentPose === pName ? 'active' : ''}`}
                    onClick={() => handlePoseChange(pName)}
                  >
                    {pName === 'idle' ? 'REPOSO' : pName === 'salute' ? 'SALUDO' : pName === 'cheer' ? 'FESTEJO' : 'HÉROE'}
                  </button>
                ))}
              </div>
            </div>

            {/* Ficha de la Skin Seleccionada y Botón de Acción */}
            <div className="duo-skin-meta-box">
              <div className="duo-skin-meta-header">
                <div>
                  <h2 className="duo-skin-name">{selectedSkin.name}</h2>
                  <p className="duo-skin-sub">{selectedSkin.subtitle}</p>
                </div>
                <div
                  className="duo-3d-rarity-badge"
                  style={{
                    background: getRarityBadgeColor(selectedSkin.rarity).bg,
                    borderColor: getRarityBadgeColor(selectedSkin.rarity).border,
                    color: getRarityBadgeColor(selectedSkin.rarity).text
                  }}
                >
                  {selectedSkin.badgeText.toUpperCase()}
                </div>
              </div>

              <p className="duo-skin-desc">{selectedSkin.description}</p>

              {/* BOTÓN DE ACCIÓN DUOLINGO 3D */}
              <div className="duo-skin-action-area">
                {isSelectedUnlocked ? (
                  isSelectedEquipped ? (
                    <div className="duo-equipped-badge">
                      <CheckCircle2 size={18} strokeWidth={3} />
                      <span>EQUIPADO ACTUALMENTE</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="duo-3d-btn green full-width"
                      onClick={() => handleEquipSkin(selectedSkin)}
                    >
                      <Check size={18} strokeWidth={3} /> EQUIPAR ESTA SKIN
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    disabled={!canUnlockSkin}
                    className={`duo-3d-btn ${canUnlockSkin ? 'orange' : 'gray'} full-width`}
                    onClick={() => handleUnlockSkin(selectedSkin)}
                    title={selectedSkin.requirementText}
                  >
                    {canUnlockSkin ? (
                      <>
                        <Zap size={18} fill="#FFFFFF" strokeWidth={2.5} />
                        DESBLOQUEAR ({selectedSkin.costBytes.toLocaleString()} B)
                      </>
                    ) : (
                      <>
                        <Lock size={16} strokeWidth={2.5} />
                        BLOQUEADO ({selectedSkin.costBytes.toLocaleString()} B)
                      </>
                    )}
                  </button>
                )}

                {!isSelectedUnlocked && !canUnlockSkin && (
                  <div className="duo-skin-requirement-hint">
                    <Lock size={12} /> {selectedSkin.requirementText}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LADO DERECHO: CATÁLOGO DE SKINS DUOLINGO 3D (AUTO-FILL RESPONSIVE) */}
          <div className="duo-store-catalog-card">
            <div className="duo-catalog-header">
              <div>
                <h3 className="duo-catalog-title">Colección de Trajes</h3>
                <p className="duo-catalog-sub">Toca una skin para verla en el podio 3D</p>
              </div>
              <div className="duo-catalog-count-pill">
                {unlockedList.length} / {BYTE_SKINS.length} DESBLOQUEADOS
              </div>
            </div>

            <div className="duo-skins-wrap-grid">
              {BYTE_SKINS.map((skin) => {
                const isUnlocked = unlockedList.includes(skin.id);
                const isEquipped = currentEquipped === skin.id;
                const isSelected = previewSkinId === skin.id;
                const rStyle = getRarityBadgeColor(skin.rarity);

                return (
                  <button
                    key={skin.id}
                    type="button"
                    className={`duo-3d-skin-card ${isSelected ? 'selected' : ''} ${isEquipped ? 'equipped' : ''}`}
                    onClick={() => {
                      soundService.playToken();
                      setPreviewSkinId(skin.id);
                    }}
                  >
                    {/* Badge superior */}
                    <div className="duo-card-badge-row">
                      <span
                        className="duo-card-rarity-tag"
                        style={{ color: rStyle.text, borderColor: rStyle.border, background: rStyle.bg }}
                      >
                        {skin.badgeText}
                      </span>

                      {!isUnlocked ? (
                        <div className="duo-card-lock-tag" title={skin.requirementText}>
                          <Lock size={10} strokeWidth={2.8} />
                          <span>{skin.costBytes >= 1000 ? `${(skin.costBytes / 1000).toFixed(skin.costBytes % 1000 === 0 ? 0 : 1)}k` : skin.costBytes}</span>
                        </div>
                      ) : isEquipped ? (
                        <div className="duo-card-check-tag">
                          <Check size={11} color="#FFFFFF" strokeWidth={3} />
                        </div>
                      ) : null}
                    </div>

                    {/* Miniatura 3D del Avatar con la Skin Seleccionada */}
                    <div className="duo-card-avatar-slot">
                      <DevAvatar
                        avatarId={selectedAvatarId}
                        skinId={skin.id}
                        size={isMobile ? 44 : 52}
                      />
                    </div>

                    {/* Nombre y estado */}
                    <div className="duo-card-meta">
                      <div className="duo-card-skin-title">{skin.name}</div>
                      <div className="duo-card-skin-status">
                        {isEquipped ? 'Equipado' : isUnlocked ? 'Disponible' : `${skin.costBytes.toLocaleString()} B`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* ═══ TAB 2: POTENCIADORES DUOLINGO 3D ═══ */}
      {activeTab === 'powerups' && (
        <div className="duo-store-powerups-grid">
          {/* 1. Protector de Racha */}
          <div className="duo-3d-item-card">
            <div className="duo-item-icon-box" style={{ background: '#E0F2FE', borderColor: '#7DD3FC' }}>
              <Shield size={32} color="#0284C7" strokeWidth={2.5} />
            </div>
            <div className="duo-item-body">
              <div className="duo-item-tag blue">PROTECCIÓN</div>
              <h3 className="duo-item-title">Protector de Racha (Freeze)</h3>
              <p className="duo-item-desc">
                Equipa un escudo que resguarda tu racha de días consecutivos si por algún motivo no puedes practicar hoy.
              </p>
              <div className="duo-item-inventory">
                Estado:{' '}
                <strong>
                  {user.streak?.freezeEquipped ? 'Activado y Protegido' : 'No equipado'}
                </strong>
              </div>
            </div>
            <div className="duo-item-action">
              <button
                type="button"
                disabled={Boolean(user.streak?.freezeEquipped)}
                className={`duo-3d-btn ${user.streak?.freezeEquipped ? 'gray' : 'blue'}`}
                onClick={handleBuyStreakFreeze}
              >
                {user.streak?.freezeEquipped ? (
                  <>
                    <CheckCircle2 size={16} strokeWidth={3} /> PROTEGIDO
                  </>
                ) : (
                  <>
                    <Zap size={16} fill="#FFF" /> EQUIPAR (200 B)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3. Descarte 50/50 */}
          <div className="duo-3d-item-card">
            <div className="duo-item-icon-box" style={{ background: '#FEF3C7', borderColor: '#FDE68A' }}>
              <Scissors size={32} color="#D97706" strokeWidth={2.5} />
            </div>
            <div className="duo-item-body">
              <div className="duo-item-tag orange">COMODÍN</div>
              <h3 className="duo-item-title">Comodín 50/50 (Descarte)</h3>
              <p className="duo-item-desc">
                Elimina de un plumazo 2 opciones erróneas en ejercicios de opción múltiple, predicción de salida o bugs.
              </p>
              <div className="duo-item-inventory">
                Inventario: <strong>{user.powerups?.eliminateOptions || 0} disponibles</strong>
              </div>
            </div>
            <div className="duo-item-action">
              <button
                type="button"
                className="duo-3d-btn orange"
                onClick={() => handleBuyPowerUp('eliminateOptions', 75, 'Comodín 50/50')}
              >
                <Zap size={16} fill="#FFF" /> COMPRAR (+1) • 75 B
              </button>
            </div>
          </div>

          {/* 4. Segunda Oportunidad */}
          <div className="duo-3d-item-card">
            <div className="duo-item-icon-box" style={{ background: '#F3E8FF', borderColor: '#D8B4FE' }}>
              <Sparkle size={32} color="#9333EA" strokeWidth={2.5} />
            </div>
            <div className="duo-item-body">
              <div className="duo-item-tag purple">ESCUDO</div>
              <h3 className="duo-item-title">Segunda Oportunidad</h3>
              <p className="duo-item-desc">
                Si cometes una equivocación al validar código o responder, este comodín absorbe el error permitiéndote reintentar de inmediato.
              </p>
              <div className="duo-item-inventory">
                Inventario: <strong>{user.powerups?.secondChance || 0} disponibles</strong>
              </div>
            </div>
            <div className="duo-item-action">
              <button
                type="button"
                className="duo-3d-btn purple"
                onClick={() => handleBuyPowerUp('secondChance', 100, 'Segunda Oportunidad')}
              >
                <Zap size={16} fill="#FFF" /> COMPRAR (+1) • 100 B
              </button>
            </div>
          </div>

          {/* 5. Pista Pedagógica */}
          <div className="duo-3d-item-card">
            <div className="duo-item-icon-box" style={{ background: '#DCFCE7', borderColor: '#86EFAC' }}>
              <HelpCircle size={32} color="#16A34A" strokeWidth={2.5} />
            </div>
            <div className="duo-item-body">
              <div className="duo-item-tag green">AYUDA</div>
              <h3 className="duo-item-title">Pista Pedagógica del Docente</h3>
              <p className="duo-item-desc">
                El avatar Dev te da una pista conceptual y contextual sobre la sintaxis de Kotlin o SQL que debes emplear.
              </p>
              <div className="duo-item-inventory">
                Inventario: <strong>{user.powerups?.teacherHint || 0} disponibles</strong>
              </div>
            </div>
            <div className="duo-item-action">
              <button
                type="button"
                className="duo-3d-btn green"
                onClick={() => handleBuyPowerUp('teacherHint', 50, 'Pista Pedagógica')}
              >
                <Zap size={16} fill="#FFF" /> COMPRAR (+1) • 50 B
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
