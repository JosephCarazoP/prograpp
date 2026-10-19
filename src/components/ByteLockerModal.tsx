import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  Check,
  RotateCcw,
  RotateCw,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  MoveHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types/user';
import { BYTE_SKINS, ByteSkin, getRankByUser } from '../types/skins';
import { ByteFullBody3D, BytePose } from './ByteFullBody3D';
import { soundService } from '../services/soundService';
import { userService } from '../services/userService';

interface ByteLockerModalProps {
  isOpen: boolean;
  user: UserProfile;
  totalStars?: number;
  onClose: () => void;
  onUpdateUser: (updated: UserProfile) => void;
}

export const ByteLockerModal: React.FC<ByteLockerModalProps> = ({
  isOpen,
  user,
  totalStars = 0,
  onClose,
  onUpdateUser
}) => {
  const unlockedList = Array.isArray(user.unlockedSkins) && user.unlockedSkins.length > 0
    ? user.unlockedSkins
    : ['byte_classic'];

  const currentEquipped = user.equippedSkin || 'byte_classic';

  const [previewSkinId, setPreviewSkinId] = useState<string>(currentEquipped);
  const [currentPose, setCurrentPose] = useState<BytePose>('idle');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [unlockMessage, setUnlockMessage] = useState<string | null>(null);
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

  if (!isOpen) return null;

  const currentRank = getRankByUser(user.totalXp || 0, totalStars);
  const selectedSkin = BYTE_SKINS.find((s) => s.id === previewSkinId) || BYTE_SKINS[0];
  const isSelectedUnlocked = unlockedList.includes(selectedSkin.id);
  const isSelectedEquipped = currentEquipped === selectedSkin.id;

  // Comprobar requisitos de desbloqueo
  const canAfford = (user.bytes || 0) >= selectedSkin.costBytes;
  const meetsStars = !selectedSkin.requiredStars || totalStars >= selectedSkin.requiredStars;
  const meetsStreak = !selectedSkin.requiredStreak || (user.streak?.count || 0) >= selectedSkin.requiredStreak;
  const meetsBosses = !selectedSkin.requiredBosses || (user.defeatedBosses?.length || 0) >= selectedSkin.requiredBosses;
  const canUnlock = canAfford && meetsStars && meetsStreak && meetsBosses;

  // Rotación por botones rápidos
  const handleRotateStep = (dir: 'left' | 'right') => {
    soundService.playToken();
    setRotationAngle((prev) => (dir === 'left' ? (prev - 45 + 360) % 360 : (prev + 45) % 360));
  };

  const handleSetAngle = (angle: number) => {
    soundService.playToken();
    setRotationAngle(angle);
  };

  // Arrastre 3D interactivo con Mouse / Touch
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
    // Arrastrar hacia la derecha gira en sentido horario (muestra perfil izquierdo -> espalda)
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

  // Equipar skin
  const handleEquipSkin = async (skin: ByteSkin) => {
    soundService.playToken();
    const updated: UserProfile = {
      ...user,
      equippedSkin: skin.id,
      avatarId: skin.id
    };
    onUpdateUser(updated);
    await userService.updateProfile(updated);
  };

  // Comprar skin
  const handleUnlockSkin = async (skin: ByteSkin) => {
    if (!canUnlock) {
      soundService.playError();
      return;
    }

    soundService.playChest();
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#22C55E', '#0EA5E9', '#F59E0B', '#EC4899']
      });
    } catch {}

    const nextBytes = Math.max(0, (user.bytes || 0) - skin.costBytes);
    const nextUnlocked = Array.from(new Set([...unlockedList, skin.id]));

    const updated: UserProfile = {
      ...user,
      bytes: nextBytes,
      unlockedSkins: nextUnlocked,
      equippedSkin: skin.id,
      avatarId: skin.id
    };

    onUpdateUser(updated);
    setUnlockMessage(`¡Desbloqueaste ${skin.name}!`);
    setTimeout(() => setUnlockMessage(null), 2500);

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

  // Etiqueta de la vista angular actual
  const getViewAngleLabel = () => {
    const norm = ((Math.round(rotationAngle) % 360) + 360) % 360;
    if (norm >= 315 || norm < 45) return 'Frente (0°)';
    if (norm >= 45 && norm < 135) return 'Perfil Der. (90°)';
    if (norm >= 135 && norm < 225) return 'Espalda (180°)';
    return 'Perfil Izq. (270°)';
  };

  return (
    <div className="locker-modal-backdrop" onClick={onClose}>
      <div className="locker-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* BARRA SUPERIOR COMPACTA Y FIJA */}
        <div className="locker-top-bar">
          <div className="locker-title-area">
            <div className="locker-pill-badge">
              <Sparkles size={13} color="#0284C7" />
              <span>VESTIDOR 3D</span>
            </div>
            <h2 className="locker-headline">Armario de Byte</h2>
          </div>

          <div className="locker-stats-cluster">
            {/* Rango */}
            <div
              className="locker-rank-pill"
              style={{
                border: `2px solid ${currentRank.color}`,
                boxShadow: `0 3px 0 ${currentRank.borderDark}`
              }}
              title={currentRank.description}
            >
              <Award size={14} color={currentRank.color} strokeWidth={2.5} />
              <span className="locker-rank-text">{currentRank.name}</span>
            </div>

            {/* Bytes */}
            <div className="locker-bytes-pill">
              <Zap size={15} color="#F59E0B" fill="#F59E0B" />
              <span className="locker-bytes-count">{user.bytes || 0}</span>
              <span className="locker-bytes-label">Bytes</span>
            </div>

            {/* Cerrar */}
            <button
              type="button"
              className="locker-close-btn"
              onClick={onClose}
              title="Cerrar Vestidor"
              aria-label="Cerrar Vestidor"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CONTENEDOR PRINCIPAL: PODIO 3D + CATÁLOGO */}
        <div className="locker-main-grid">
          {/* LADO IZQUIERDO (STAGE 3D INTERACTIVO CON GIRO 360°) */}
          <div className="locker-stage-panel">
            <div className="locker-stage-glow"></div>

            {/* Indicador de giro 360° en la esquina superior (completamente libre de la cabeza del avatar) */}
            <div className="locker-turntable-badge">
              <MoveHorizontal size={12} />
              <span>{isDragging ? 'Girando...' : getViewAngleLabel()}</span>
            </div>

            <div className="locker-360-hint">
              <span>360° Giro</span>
            </div>

            {/* Viewport Interactivo con Drag & Touch */}
            <div
              className={`locker-avatar-viewport ${isDragging ? 'dragging' : ''}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              title="Arrastra para girar el avatar 360°"
            >
              <ByteFullBody3D
                skinId={previewSkinId}
                pose={currentPose}
                rotation={rotationAngle}
                size={isMobile ? 95 : 145}
                showPedestal={true}
                isDragging={isDragging}
              />
            </div>

            {/* Controles de Rotación 360 y Poses */}
            <div className="locker-stage-controls">
              {/* Botonera de Giros */}
              <div className="locker-control-group">
                <button
                  type="button"
                  className="locker-icon-control-btn"
                  onClick={() => handleRotateStep('left')}
                  title="Girar 45° a la izquierda"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  className={`locker-angle-btn ${Math.abs(rotationAngle % 360) < 20 ? 'active' : ''}`}
                  onClick={() => handleSetAngle(0)}
                  title="Vista frontal"
                >
                  Frente
                </button>
                <button
                  type="button"
                  className={`locker-angle-btn ${Math.abs((rotationAngle % 360) - 180) < 20 ? 'active' : ''}`}
                  onClick={() => handleSetAngle(180)}
                  title="Vista de espalda"
                >
                  Espalda
                </button>
                <button
                  type="button"
                  className="locker-icon-control-btn"
                  onClick={() => handleRotateStep('right')}
                  title="Girar 45° a la derecha"
                >
                  <RotateCw size={15} />
                </button>
              </div>

              {/* Selector de Poses */}
              <div className="locker-poses-row">
                {(['idle', 'salute', 'cheer', 'hero'] as BytePose[]).map((pName) => (
                  <button
                    key={pName}
                    type="button"
                    className={`locker-pose-chip ${currentPose === pName ? 'active' : ''}`}
                    onClick={() => handlePoseChange(pName)}
                  >
                    {pName === 'idle' ? 'Reposo' : pName === 'salute' ? 'Saludo' : pName === 'cheer' ? 'Festejo' : 'Héroe'}
                  </button>
                ))}
              </div>
            </div>

            {/* CAJA DE ACCIÓN / INFORMACIÓN DE LA SKIN (TAMAÑO RÍGIDO INVARIANTE) */}
            <div className="locker-selection-action-box">
              <div className="locker-skin-info-header">
                <div className="locker-skin-text-col">
                  <h3 className="locker-selected-name">{selectedSkin.name}</h3>
                  <p className="locker-selected-sub">{selectedSkin.subtitle}</p>
                </div>
                <div
                  className="locker-rarity-badge"
                  style={{
                    background: getRarityBadgeColor(selectedSkin.rarity).bg,
                    borderColor: getRarityBadgeColor(selectedSkin.rarity).border,
                    color: getRarityBadgeColor(selectedSkin.rarity).text
                  }}
                >
                  {selectedSkin.badgeText}
                </div>
              </div>

              <p className="locker-skin-desc">{selectedSkin.description}</p>

              {/* Contenedor de Botón con Altura Fija */}
              <div className="locker-action-btn-slot">
                {isSelectedUnlocked ? (
                  isSelectedEquipped ? (
                    <div className="locker-equipped-banner">
                      <CheckCircle2 size={16} color="#16A34A" />
                      <span>EQUIPADO</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn-3d btn-green locker-btn-action"
                      onClick={() => handleEquipSkin(selectedSkin)}
                    >
                      <Check size={16} /> EQUIPAR ESTA SKIN
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    disabled={!canUnlock}
                    className={`btn-3d ${canUnlock ? 'btn-orange' : 'btn-disabled'} locker-btn-action`}
                    onClick={() => handleUnlockSkin(selectedSkin)}
                    title={selectedSkin.requirementText}
                  >
                    {canUnlock ? (
                      <>
                        <Zap size={16} fill="#FFFFFF" />
                        DESBLOQUEAR ({selectedSkin.costBytes.toLocaleString()} B)
                      </>
                    ) : (
                      <>
                        <Lock size={15} />
                        BLOQUEADO ({selectedSkin.costBytes.toLocaleString()} B)
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Mensaje de Toast Flotante */}
              {unlockMessage && (
                <div className="locker-toast-msg">
                  <CheckCircle2 size={14} /> {unlockMessage}
                </div>
              )}
            </div>
          </div>

          {/* LADO DERECHO: CATÁLOGO DE 14 SKINS (GRILLES SCROLLABLES SIN RESIZES) */}
          <div className="locker-catalog-panel">
            <div className="locker-catalog-header">
              <h3 className="locker-catalog-title">Colección ({BYTE_SKINS.length})</h3>
              <span className="locker-catalog-counter">
                {unlockedList.length} / {BYTE_SKINS.length} Disponibles
              </span>
            </div>

            <div className="locker-skins-grid">
              {BYTE_SKINS.map((skin) => {
                const isUnlocked = unlockedList.includes(skin.id);
                const isEquipped = currentEquipped === skin.id;
                const isSelected = previewSkinId === skin.id;
                const rStyle = getRarityBadgeColor(skin.rarity);

                return (
                  <button
                    key={skin.id}
                    type="button"
                    className={`locker-skin-card ${isSelected ? 'selected' : ''} ${isEquipped ? 'equipped' : ''}`}
                    onClick={() => {
                      soundService.playToken();
                      setPreviewSkinId(skin.id);
                    }}
                  >
                    {/* Badge de Rareza y Estado */}
                    <div className="locker-card-top-row">
                      <span
                        className="locker-card-rarity"
                        style={{ color: rStyle.text, borderColor: rStyle.border, background: rStyle.bg }}
                      >
                        {skin.badgeText}
                      </span>

                      {!isUnlocked ? (
                        <div className="locker-card-lock-badge" title={skin.requirementText}>
                          <Lock size={10} color="#D97706" />
                          <span>{skin.costBytes >= 1000 ? `${(skin.costBytes / 1000).toFixed(skin.costBytes % 1000 === 0 ? 0 : 1)}k` : skin.costBytes}</span>
                        </div>
                      ) : isEquipped ? (
                        <div className="locker-card-equipped-tag">
                          <Check size={11} color="#FFFFFF" strokeWidth={3} />
                        </div>
                      ) : null}
                    </div>

                    {/* Miniatura Vectorial 3D de la Skin */}
                    <div className="locker-card-avatar-preview">
                      <ByteFullBody3D
                        skinId={skin.id}
                        pose="idle"
                        size={isMobile ? 44 : 54}
                        showPedestal={false}
                      />
                    </div>

                    {/* Información compacta del traje */}
                    <div className="locker-card-footer">
                      <span className="locker-card-name">{skin.name}</span>
                      <span className="locker-card-status">
                        {isEquipped ? 'Equipado' : isUnlocked ? 'Disponible' : `${skin.costBytes.toLocaleString()} B`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
