import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Sparkles, Shield, Monitor } from 'lucide-react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  isMandatory?: boolean; // Si es obligatorio para acceder a la app
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  isMandatory = false
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSharedDevice, setIsSharedDevice] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    soundService.playToken();

    try {
      let uid: string;
      if (isRegister) {
        if (!name.trim()) throw new Error('Por favor ingresa tu nombre de desarrollador');
        uid = await authService.signUpWithEmail(email, password, name, isSharedDevice);
      } else {
        uid = await authService.signInWithEmail(email, password, isSharedDevice);
      }

      // Obtener o inicializar perfil con el nuevo UID
      const profile = await userService.getProfile(uid);
      if (name.trim()) {
        profile.displayName = name;
      }
      profile.email = email;
      await userService.updateProfile(profile);

      soundService.playWin();
      onAuthSuccess(profile);
      onClose();
    } catch (err: unknown) {
      soundService.playError();
      const message = err instanceof Error ? err.message : 'Error al autenticar. Verifica tus datos.';
      setError(message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card" style={{ maxWidth: 440 }}>
        {!isMandatory && (
          <button className="modal-close" onClick={onClose} aria-label="Cerrar ventana">
            <X size={20} />
          </button>
        )}

        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#06B6D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              boxShadow: '0 4px 0 #0891B2'
            }}
          >
            <Sparkles size={28} color="#FFFFFF" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>
            {isRegister ? 'Registro de Estudiante' : 'Inicio de Sesión'}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.86rem', marginTop: '4px' }}>
            {isMandatory
              ? 'Inicia sesión o regístrate para acceder a las lecciones y registrar tu avance.'
              : 'Guarda tu progreso de aprendizaje en la nube.'}
          </p>
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #EF4444',
              color: '#F87171',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              marginBottom: '16px'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>
                Nombre Completo o de Usuario
              </label>
              <div className="input-group">
                <UserIcon size={18} color="#64748B" />
                <input
                  type="text"
                  placeholder="ej. Alex Gómez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>
              Correo Institucional o Personal
            </label>
            <div className="input-group">
              <Mail size={18} color="#64748B" />
              <input
                type="email"
                placeholder="estudiante@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>
              Contraseña
            </label>
            <div className="input-group">
              <Lock size={18} color="#64748B" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Opción para dispositivos compartidos (Laboratorios / Aulas) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 10,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer'
            }}
            onClick={() => setIsSharedDevice(!isSharedDevice)}
          >
            <input
              type="checkbox"
              id="shared-device-check"
              checked={isSharedDevice}
              onChange={(e) => setIsSharedDevice(e.target.checked)}
              style={{ cursor: 'pointer', width: 16, height: 16 }}
            />
            <label
              htmlFor="shared-device-check"
              style={{ fontSize: '0.8rem', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Monitor size={15} color="#38BDF8" />
              <span>Equipo compartido (cerrar sesión al salir del navegador)</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-3d btn-green"
            disabled={loading}
            style={{ marginTop: '8px' }}
          >
            {loading ? 'Procesando...' : isRegister ? 'Registrarse y Comenzar' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem' }}>
          <span style={{ color: '#94A3B8' }}>
            {isRegister ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}
          </span>{' '}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#38BDF8',
              fontWeight: 800,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate aquí'}
          </button>
        </div>

        {/* Aviso de Privacidad e Investigación */}
        <div
          style={{
            marginTop: 18,
            padding: '10px 12px',
            background: 'rgba(6, 182, 212, 0.06)',
            border: '1px dashed rgba(6, 182, 212, 0.3)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            fontSize: '0.74rem',
            color: '#94A3B8',
            lineHeight: 1.35
          }}
        >
          <Shield size={16} color="#06B6D4" style={{ flexShrink: 0, marginTop: 2 }} />
          <span>
            <strong>Finalidad Educativa:</strong> Esta aplicación registra progreso e intentos para seguimiento del aprendizaje e investigación docente. No se solicita cédula ni datos personales innecesarios.
          </span>
        </div>
      </div>
    </div>
  );
};
