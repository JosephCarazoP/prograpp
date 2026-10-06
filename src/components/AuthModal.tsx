import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  GraduationCap,
  ShieldCheck,
  Monitor,
  Eye,
  EyeOff,
  IdCard,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
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

  // Campos de formulario
  const [firstName, setFirstName] = useState('');
  const [firstLastName, setFirstLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados visuales e interactivos
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSharedDevice, setIsSharedDevice] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones estrictas para el registro
    if (isRegister) {
      if (!firstName.trim()) {
        setError('Por favor ingresa tu nombre.');
        soundService.playError();
        return;
      }
      if (!firstLastName.trim()) {
        setError('Por favor ingresa tu primer apellido.');
        soundService.playError();
        return;
      }
      if (!secondLastName.trim()) {
        setError('Por favor ingresa tu segundo apellido.');
        soundService.playError();
        return;
      }
      if (!idNumber.trim()) {
        setError('Por favor ingresa tu número de cédula o carnet institucional.');
        soundService.playError();
        return;
      }
      if (password.length < 6) {
        setError('La contraseña debe tener un mínimo de 6 caracteres.');
        soundService.playError();
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden. Por favor verifica que sean iguales.');
        soundService.playError();
        return;
      }
    } else {
      if (!email.trim() || !password) {
        setError('Por favor completa tu correo y contraseña.');
        soundService.playError();
        return;
      }
    }

    setLoading(true);
    soundService.playToken();

    try {
      let uid: string;
      const cleanEmail = email.trim().toLowerCase();

      if (isRegister) {
        const cleanFirstName = firstName.trim();
        const cleanFirstLast = firstLastName.trim();
        const cleanSecondLast = secondLastName.trim();
        const cleanId = idNumber.trim();
        const fullStudentName = `${cleanFirstName} ${cleanFirstLast} ${cleanSecondLast}`.trim();

        // 1. Crear usuario en autenticación con persistencia seleccionada
        uid = await authService.signUpWithEmail(cleanEmail, password, fullStudentName, isSharedDevice);

        // 2. Inicializar perfil de usuario con todos los campos académicos
        const profile = await userService.getProfile(uid);
        profile.displayName = fullStudentName;
        profile.firstName = cleanFirstName;
        profile.firstLastName = cleanFirstLast;
        profile.secondLastName = cleanSecondLast;
        profile.idNumber = cleanId;
        profile.email = cleanEmail;

        await userService.updateProfile(profile);

        soundService.playWin();
        onAuthSuccess(profile);
        onClose();
      } else {
        // Inicio de sesión
        uid = await authService.signInWithEmail(cleanEmail, password, isSharedDevice);
        const profile = await userService.getProfile(uid);

        soundService.playWin();
        onAuthSuccess(profile);
        onClose();
      }
    } catch (err: unknown) {
      soundService.playError();
      const message = err instanceof Error ? err.message : 'Error al autenticar. Verifica tus datos.';
      let readableError = message.replace('Firebase: ', '');

      if (readableError.includes('auth/invalid-credential') || readableError.includes('invalid-credential')) {
        readableError = 'Correo o contraseña incorrectos. Verifica tus credenciales.';
      } else if (readableError.includes('auth/email-already-in-use')) {
        readableError = 'Ya existe una cuenta registrada con este correo. Inicia sesión.';
      } else if (readableError.includes('auth/weak-password')) {
        readableError = 'La contraseña debe contener al menos 6 caracteres.';
      } else if (readableError.includes('auth/invalid-email')) {
        readableError = 'El formato del correo electrónico no es válido.';
      }

      setError(readableError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-backdrop" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <div className={`auth-card ${isRegister ? 'register-mode' : ''}`}>
        {!isMandatory && (
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar ventana"
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#F1F5F9',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748B'
            }}
          >
            <X size={18} />
          </button>
        )}

        {/* Pestañas de Alternancia (Segmented Control) */}
        <div className="auth-nav-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${!isRegister ? 'active' : ''}`}
            onClick={() => {
              if (isRegister) {
                soundService.playToken();
                setIsRegister(false);
                setError('');
              }
            }}
          >
            <UserIcon size={16} />
            <span>Iniciar Sesión</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${isRegister ? 'active' : ''}`}
            onClick={() => {
              if (!isRegister) {
                soundService.playToken();
                setIsRegister(true);
                setError('');
              }
            }}
          >
            <GraduationCap size={16} />
            <span>Registrarse</span>
          </button>
        </div>

        {/* Cabecera y Emblema */}
        <div className="auth-header">
          <div className="auth-badge-icon">
            <GraduationCap size={30} />
          </div>
          <h2 id="auth-modal-title" className="auth-title">
            {isRegister ? 'Registro de Estudiante' : '¡Bienvenido de vuelta!'}
          </h2>
          <p className="auth-subtitle">
            {isRegister
              ? 'Completa tus datos oficiales para registrar tu participación y avances en la investigación.'
              : 'Ingresa tus credenciales para continuar con tus lecciones de Kotlin y SQL.'}
          </p>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="auth-error-box" role="alert">
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isRegister ? (
            <>
              {/* Nombre(s) */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="reg-first-name">
                  <span>Nombre(s)</span>
                  <span className="auth-label-badge">Obligatorio</span>
                </label>
                <div className="auth-input-wrapper">
                  <UserIcon size={18} color="#64748B" />
                  <input
                    id="reg-first-name"
                    type="text"
                    placeholder="ej. Joseph Alonso"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    required
                  />
                </div>
              </div>

              {/* Apellidos en 2 columnas */}
              <div className="auth-grid-2cols">
                <div className="auth-field">
                  <label className="auth-label" htmlFor="reg-first-last">
                    <span>Primer Apellido</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <input
                      id="reg-first-last"
                      type="text"
                      placeholder="ej. Carazo"
                      value={firstLastName}
                      onChange={(e) => setFirstLastName(e.target.value)}
                      autoComplete="family-name"
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="reg-second-last">
                    <span>Segundo Apellido</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <input
                      id="reg-second-last"
                      type="text"
                      placeholder="ej. Pérez"
                      value={secondLastName}
                      onChange={(e) => setSecondLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Número de Cédula o Identificación */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="reg-id-number">
                  <span>Número de Cédula o Identificación</span>
                  <span className="auth-label-badge">Para registro oficial</span>
                </label>
                <div className="auth-input-wrapper">
                  <IdCard size={18} color="#64748B" />
                  <input
                    id="reg-id-number"
                    type="text"
                    placeholder="ej. 1-1234-5678 o ID institucional"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="reg-email">
                  <span>Correo Electrónico</span>
                </label>
                <div className="auth-input-wrapper">
                  <Mail size={18} color="#64748B" />
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="estudiante@institucion.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Contraseñas en 2 columnas con toggles */}
              <div className="auth-grid-2cols">
                <div className="auth-field">
                  <label className="auth-label" htmlFor="reg-pass">
                    <span>Contraseña</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Lock size={18} color="#64748B" />
                    <input
                      id="reg-pass"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 6 carácteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="reg-pass-confirm">
                    <span>Confirmar Contraseña</span>
                  </label>
                  <div className={`auth-input-wrapper ${passwordsMismatch ? 'error' : ''}`}>
                    <Lock size={18} color={passwordsMismatch ? '#EF4444' : '#64748B'} />
                    <input
                      id="reg-pass-confirm"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Repite la contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      title={showConfirmPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Indicador de coincidencia de contraseña */}
              {passwordsMatch && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#16A34A', fontWeight: 700 }}>
                  <CheckCircle2 size={15} />
                  <span>Las contraseñas coinciden correctamente</span>
                </div>
              )}
              {passwordsMismatch && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#DC2626', fontWeight: 600 }}>
                  <AlertCircle size={15} />
                  <span>Las contraseñas aún no coinciden</span>
                </div>
              )}
            </>
          ) : (
            /* Modo Iniciar Sesión */
            <>
              <div className="auth-field">
                <label className="auth-label" htmlFor="login-email">
                  <span>Correo Electrónico</span>
                </label>
                <div className="auth-input-wrapper">
                  <Mail size={18} color="#64748B" />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="estudiante@institucion.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="login-pass">
                  <span>Contraseña</span>
                </label>
                <div className="auth-input-wrapper">
                  <Lock size={18} color="#64748B" />
                  <input
                    id="login-pass"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Opción para dispositivos compartidos (Laboratorios / Aulas) */}
          <div
            className="auth-shared-device-card"
            onClick={() => setIsSharedDevice(!isSharedDevice)}
          >
            <input
              type="checkbox"
              id="shared-device-checkbox"
              checked={isSharedDevice}
              onChange={(e) => setIsSharedDevice(e.target.checked)}
              style={{ cursor: 'pointer', width: 17, height: 17, marginTop: 2, accentColor: '#2563EB' }}
            />
            <label
              htmlFor="shared-device-checkbox"
              style={{ fontSize: '0.8rem', color: '#475569', cursor: 'pointer', flex: 1, lineHeight: 1.35 }}
            >
              <span style={{ fontWeight: 800, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                <Monitor size={15} color="#2563EB" />
                Equipo compartido (Laboratorio o Aula)
              </span>
              <span style={{ color: '#64748B', fontSize: '0.75rem' }}>
                Cierra la sesión automáticamente al cerrar el navegador para proteger tus datos de investigación.
              </span>
            </label>
          </div>

          {/* Botón Principal de Acción */}
          <button
            type="submit"
            className="auth-btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span>Procesando...</span>
            ) : isRegister ? (
              <>
                <span>Crear Cuenta y Comenzar</span>
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                <span>Iniciar Sesión</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Alternador de pie de formulario */}
        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem' }}>
          <span style={{ color: '#64748B' }}>
            {isRegister ? '¿Ya tienes una cuenta registrada?' : '¿Eres un estudiante nuevo?'}
          </span>{' '}
          <button
            type="button"
            onClick={() => {
              soundService.playToken();
              setIsRegister(!isRegister);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563EB',
              fontWeight: 800,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '2px 4px'
            }}
          >
            {isRegister ? 'Inicia sesión aquí' : 'Crea tu cuenta aquí'}
          </button>
        </div>

        {/* Garantía de Confidencialidad y Ética */}
        <div className="auth-ethics-box">
          <ShieldCheck size={18} color="#16A34A" style={{ flexShrink: 0, marginTop: 1 }} />
          <span>
            <strong>Registro Oficial:</strong> Tus nombres, apellidos y número de cédula se vinculan de manera segura y confidencial con tu historial de intentos para la investigación educativa.
          </span>
        </div>
      </div>
    </div>
  );
};
