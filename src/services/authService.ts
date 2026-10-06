import {
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, isLocalMockMode } from '../config/firebase';

export const authService = {
  // Inicialización de sesión transparente (anónima por defecto si no hay usuario)
  async initAuth(): Promise<string> {
    if (isLocalMockMode || !auth) {
      console.log('[Auth] Operando en modo local (guest_user_1)');
      return 'guest_user_1';
    }

    const firebaseAuth = auth;

    return new Promise((resolve) => {
      // Timeout de seguridad de 1.8s para nunca bloquear el arranque de la app
      const fallbackTimer = setTimeout(() => {
        console.log('[Auth] Timeout de conexión a Firebase, continuando en modo local seguro');
        resolve('guest_user_1');
      }, 1800);

      onAuthStateChanged(firebaseAuth, async (user: User | null) => {
        clearTimeout(fallbackTimer);
        if (user) {
          console.log('[Firebase Auth] Sesión activa con UID:', user.uid);
          resolve(user.uid);
        } else {
          try {
            const userCredential = await signInAnonymously(firebaseAuth);
            console.log('[Firebase Auth] Nueva sesión anónima creada:', userCredential.user.uid);
            resolve(userCredential.user.uid);
          } catch (error) {
            console.warn('[Firebase Auth] Falló autenticación anónima, usando UID local:', error);
            resolve('guest_user_1');
          }
        }
      });
    });
  },

  // Iniciar sesión con correo y contraseña
  async signInWithEmail(email: string, pass: string): Promise<string> {
    if (isLocalMockMode || !auth) {
      return 'guest_user_1';
    }
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    return cred.user.uid;
  },

  // Registrar nueva cuenta con correo y contraseña
  async signUpWithEmail(email: string, pass: string, displayName: string): Promise<string> {
    if (isLocalMockMode || !auth) {
      return 'guest_user_1';
    }
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateFirebaseProfile(cred.user, { displayName });
    return cred.user.uid;
  },

  // Cerrar sesión
  async signOutUser(): Promise<void> {
    if (!isLocalMockMode && auth) {
      await signOut(auth);
    }
  },

  // Obtener usuario actual
  getCurrentUser(): User | null {
    return auth ? auth.currentUser : null;
  }
};
