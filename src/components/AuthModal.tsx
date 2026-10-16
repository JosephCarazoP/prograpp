import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  ShieldCheck,
  Monitor,
  Eye,
  EyeOff,
  IdCard,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Check,
  LogIn,
  Sparkles
} from 'lucide-react';
import { authService } from '../services/authService';
import { userService, DEFAULT_PROFILE } from '../services/userService';
import { UserProfile } from '../types/user';
import { soundService } from '../services/soundService';
import { DevAvatar } from './Avatars';
import { AVATARS } from '../constants/avatars';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  isMandatory?: boolean; // Si es obligatorio para acceder a la app
}

// Mensajes interactivos de motivación personalizados por cada avatar del juego
const AVATAR_GREETINGS: Record<string, { login: string; register: string; name: string }> = {
  robot_byte: {
    name: 'Byte el Robot',
    login: '¡Hola, soy Byte! Ingresa para continuar practicando Kotlin y SQL.',
    register: '¡Hola, soy Byte! Elige tu personaje oficial y comencemos a programar.'
  },
  ada_hacker: {
    name: 'Ada la Coder',
    login: '¡Hola, soy Ada! Lista para construir algoritmos limpios y seguros.',
    register: '¡Hola, soy Ada! Completa tus datos para empezar tu aventura dev.'
  },
  linus_coder: {
    name: 'Linus el Coder',
    login: '¡Hola, soy Linus! El compilador está listo para tus ejercicios.',
    register: '¡Hola, soy Linus! Regístrate y desbloquea cada unidad de código.'
  },
  turing_wizard: {
    name: 'Turing el Sabio',
    login: '¡Saludos! Continúa tu entrenamiento en la lógica de programación.',
    register: '¡Saludos! La arquitectura del software te da la bienvenida.'
  },
  console_dev: {
    name: 'Consola Dev',
    login: '¡Terminal lista! Reanuda tu sesión de desarrollo hoy.',
    register: '¡Nueva terminal lista! Registra tu cuenta para guardar tu historial.'
  }
};

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  isMandatory = false
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('robot_byte');

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

  const currentGreeting = AVATAR_GREETINGS[selectedAvatar] || AVATAR_GREETINGS.robot_byte;
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

        // 2. Inicializar perfil de usuario con todos los datos académicos directos
        const newProfile: UserProfile = {
          ...DEFAULT_PROFILE,
          uid,
          displayName: fullStudentName,
          firstName: cleanFirstName,
          firstLastName: cleanFirstLast,
          secondLastName: cleanSecondLast,
          idNumber: cleanId,
          email: cleanEmail,
          avatarId: selectedAvatar,
          studentCode: 'E' + (Math.floor(Math.random() * 89) + 10),
          createdAt: Date.now()
        };

        await userService.updateProfile(newProfile);

        soundService.playWin();
        onAuthSuccess(newProfile);
        onClose();
      } else {
        // Inicio de sesión
        uid = await authService.signInWithEmail(cleanEmail, password, isSharedDevice);
        let profile = await userService.getProfile(uid);

        // Sincronizar nombre si estuviera vacío o con texto genérico
        if (!profile.displayName || profile.displayName === 'Dev Aprendiz' || profile.displayName === 'Estudiante') {
          const authUser = authService.getCurrentUser();
          if (authUser?.displayName) {
            profile.displayName = authUser.displayName;
          } else if (profile.firstName) {
            profile.displayName = `${profile.firstName} ${profile.firstLastName || ''} ${profile.secondLastName || ''}`.trim();
          } else if (cleanEmail) {
            profile.displayName = cleanEmail.split('@')[0];
          }
          await userService.updateProfile(profile);
        }

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
        {/* Botón 3D de Cerrar Modal */}
        {!isMandatory && (
          <button
            className="auth-close-btn"
            onClick={() => {
              soundService.playToken();
              onClose();
            }}
            aria-label="Cerrar ventana"
            type="button"
          >
            <X size={18} strokeWidth={2.8} />
          </button>
        )}

        {/* Pestañas Segmentadas 3D (Duolingo Switcher) */}
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
            <LogIn size={17} strokeWidth={2.8} />
            <span>Iniciar Sesión</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${isRegister ? 'active tab-register' : ''}`}
            onClick={() => {
              if (!isRegister) {
                soundService.playToken();
                setIsRegister(true);
                setError('');
              }
            }}
          >
            <Sparkles size={17} strokeWidth={2.8} />
            <span>Registrarse</span>
          </button>
        </div>

        {/* Hero Duolingo 3D: Avatar Oficial del Juego y Bocadillo de Diálogo */}
        <div className="auth-duo-hero">
          <div
            className="auth-duo-mascot-box"
            onClick={() => {
              // Permitir hacer clic para alternar de forma interactiva entre los avatares
              const allIds = AVATARS.map((a) => a.id);
              const nextIdx = (allIds.indexOf(selectedAvatar) + 1) % allIds.length;
              soundService.playToken();
              setSelectedAvatar(allIds[nextIdx]);
            }}
            title="Toca para cambiar de personaje"
            style={{ cursor: 'pointer' }}
          >
            <DevAvatar avatarId={selectedAvatar} size={84} />
          </div>
          <div className="duo-speech-bubble">
            <h2 id="auth-modal-title" className="duo-speech-title">
              {isRegister ? '¡Crea tu Perfil!' : '¡Hola de nuevo! 👋'}
            </h2>
            <p className="duo-speech-desc">
              {isRegister ? currentGreeting.register : currentGreeting.login}
            </p>
          </div>
        </div>

        {/* Selector 3D de Avatar en Modo Registro */}
        {isRegister && (
          <div className="auth-avatar-picker-section">
            <div className="auth-avatar-picker-header">
              <span className="auth-avatar-picker-title">
                <Sparkles size={14} color="#58CC02" strokeWidth={3} />
                <span>Elige tu Avatar de Inicio</span>
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16A34A' }}>
                {currentGreeting.name}
              </span>
            </div>
            <div className="auth-avatar-row">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  className={`auth-avatar-item ${selectedAvatar === av.id ? 'selected' : ''}`}
                  onClick={() => {
                    soundService.playToken();
                    setSelectedAvatar(av.id);
                  }}
                  title={av.name}
                >
                  <div className="auth-avatar-bubble">
                    <DevAvatar avatarId={av.id} size={42} />
                    {selectedAvatar === av.id && (
                      <div className="auth-avatar-check">
                        <Check size={11} strokeWidth={3.5} />
                      </div>
                    )}
                  </div>
                  <span className="auth-avatar-name">{av.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Alerta de Error estilo Duolingo (Wrong Answer Banner) */}
        {error && (
          <div className="auth-error-box" role="alert">
            <AlertCircle size={20} strokeWidth={2.5} style={{ flexShrink: 0 }} />
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
                  <span className="auth-label-badge badge-orange">Obligatorio</span>
                </label>
                <div className="auth-input-wrapper">
                  <UserIcon size={18} color="#94A3B8" strokeWidth={2.5} />
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
                    <span className="auth-label-badge badge-orange">Obligatorio</span>
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
                    <span className="auth-label-badge badge-orange">Obligatorio</span>
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
                  <span className="auth-label-badge badge-blue">Oficial</span>
                </label>
                <div className="auth-input-wrapper">
                  <IdCard size={18} color="#94A3B8" strokeWidth={2.5} />
                  <input
                    id="reg-id-number"
                    type="text"
                    placeholder="ej. 1-1234-5678 o carnet institucional"
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
                  <span className="auth-label-badge badge-orange">Obligatorio</span>
                </label>
                <div className="auth-input-wrapper">
                  <Mail size={18} color="#94A3B8" strokeWidth={2.5} />
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

              {/* Contraseñas en 2 columnas con mini-botones 3D */}
              <div className="auth-grid-2cols">
                <div className="auth-field">
                  <label className="auth-label" htmlFor="reg-pass">
                    <span>Contraseña</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Lock size={18} color="#94A3B8" strokeWidth={2.5} />
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
                      {showPassword ? <EyeOff size={15} strokeWidth={2.5} /> : <Eye size={15} strokeWidth={2.5} />}
                    </button>
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="reg-pass-confirm">
                    <span>Confirmar Contraseña</span>
                  </label>
                  <div className={`auth-input-wrapper ${passwordsMismatch ? 'error' : ''}`}>
                    <Lock size={18} color={passwordsMismatch ? '#EF4444' : '#94A3B8'} strokeWidth={2.5} />
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
                      {showConfirmPassword ? <EyeOff size={15} strokeWidth={2.5} /> : <Eye size={15} strokeWidth={2.5} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Indicador 3D de coincidencia de contraseña */}
              {passwordsMatch && (
                <div className="auth-match-indicator success">
                  <CheckCircle2 size={16} strokeWidth={2.8} />
                  <span>¡Las contraseñas coinciden a la perfección!</span>
                </div>
              )}
              {passwordsMismatch && (
                <div className="auth-match-indicator mismatch">
                  <AlertCircle size={16} strokeWidth={2.8} />
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
                  <Mail size={18} color="#94A3B8" strokeWidth={2.5} />
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
                  <Lock size={18} color="#94A3B8" strokeWidth={2.5} />
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
                    {showPassword ? <EyeOff size={15} strokeWidth={2.5} /> : <Eye size={15} strokeWidth={2.5} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Tarjeta 3D interactiva para equipos compartidos (Laboratorios / Aulas) */}
          <div
            className={`auth-shared-device-card ${isSharedDevice ? 'checked' : ''}`}
            onClick={() => {
              soundService.playToken();
              setIsSharedDevice(!isSharedDevice);
            }}
          >
            <div className={`duo-custom-checkbox ${isSharedDevice ? 'checked' : 'unchecked'}`}>
              {isSharedDevice && <Check size={16} strokeWidth={3.5} color="#FFFFFF" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Monitor size={15} color="#1CB0F6" strokeWidth={2.5} />
                <span>EQUIPO COMPARTIDO (AULA O LABORATORIO)</span>
              </div>
              <div style={{ color: '#64748B', fontSize: '0.74rem', fontWeight: 600, marginTop: 2, lineHeight: 1.35 }}>
                Cierra la sesión automáticamente al salir para proteger tus datos académicos y notas.
              </div>
            </div>
          </div>

          {/* Botón Principal 3D Duolingo (Mechanical Press Effect) */}
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
                <ArrowRight size={20} strokeWidth={3} />
              </>
            ) : (
              <>
                <span>Iniciar Sesión</span>
                <ArrowRight size={20} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        {/* Alternador 3D de pie de formulario */}
        <div style={{ textAlign: 'center', marginTop: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#64748B', fontSize: '0.84rem', fontWeight: 700 }}>
            {isRegister ? '¿Ya tienes una cuenta registrada?' : '¿Eres un estudiante nuevo?'}
          </span>
          <button
            type="button"
            className="auth-btn-secondary"
            onClick={() => {
              soundService.playToken();
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister ? (
              <>
                <LogIn size={16} strokeWidth={2.8} />
                <span>Inicia sesión aquí</span>
              </>
            ) : (
              <>
                <Sparkles size={16} strokeWidth={2.8} />
                <span>Crea tu cuenta oficial</span>
              </>
            )}
          </button>
        </div>

        {/* Garantía de Confidencialidad y Ética 3D */}
        <div className="auth-ethics-box">
          <ShieldCheck size={20} color="#16A34A" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>
            <strong>Registro Oficial y Protegido:</strong> Tus nombres, apellidos y número de cédula se vinculan de manera confidencial y segura con tus resultados para la investigación educativa.
          </span>
        </div>
      </div>
    </div>
  );
};
