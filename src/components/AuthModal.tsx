import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Sparkles } from 'lucide-react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
        uid = await authService.signUpWithEmail(email, password, name);
      } else {
        uid = await authService.signInWithEmail(email, password);
      }

      // Obtener o crear perfil con el nuevo UID
      const profile = await userService.getProfile(uid);
      if (name.trim()) {
        profile.displayName = name;
        await userService.updateProfile(profile);
      }

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
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#06B6D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}
          >
            <Sparkles size={28} color="#FFFFFF" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>
            {isRegister ? 'Crea tu Cuenta PrograApp' : 'Conecta con tu Código'}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginTop: '4px' }}>
            Guarda tu racha, estrellas y progreso en la nube.
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
                Nombre Visible
              </label>
              <div className="input-group">
                <UserIcon size={18} color="#64748B" />
                <input
                  type="text"
                  placeholder="ej. AlexDev"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>
              Correo Electrónico
            </label>
            <div className="input-group">
              <Mail size={18} color="#64748B" />
              <input
                type="email"
                placeholder="dev@ejemplo.com"
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

          <button
            type="submit"
            className="btn-3d btn-green"
            disabled={loading}
            style={{ marginTop: '8px' }}
          >
            {loading ? 'Procesando...' : isRegister ? 'Registrarse Gratis' : 'Iniciar Sesión'}
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
      </div>
    </div>
  );
};
