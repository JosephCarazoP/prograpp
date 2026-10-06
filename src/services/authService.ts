import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User
} from 'firebase/auth';
import { auth, isLocalMockMode } from '../config/firebase';
import { storageService } from './storageService';

export const ADMIN_AUTHORIZED_EMAIL = 'josephcarazo56@gmail.com';

export const authService = {
  // Inicialización de sesión segura: Solo permite continuar si hay una sesión previamente autenticada
  async initAuth(): Promise<string | null> {
    if (isLocalMockMode || !auth) {
      // En modo mock local, verificar si hay un usuario previamente logueado
      const cachedUid = storageService.getItem<string | null>('last_authenticated_uid', null);
      return cachedUid;
    }

    const firebaseAuth = auth;

    return new Promise((resolve) => {
      const fallbackTimer = setTimeout(() => {
        // En caso de corte de red, verificar si existía sesión offline previa del usuario
        const offlineUid = storageService.getItem<string | null>('last_authenticated_uid', null);
        resolve(offlineUid);
      }, 2500);

      const unsubscribe = onAuthStateChanged(firebaseAuth, (user: User | null) => {
        clearTimeout(fallbackTimer);
        unsubscribe();
        if (user) {
          storageService.setItem('last_authenticated_uid', user.uid);
          resolve(user.uid);
        } else {
          // NO crear cuenta anónima ni permitir invitado
          storageService.removeItem('last_authenticated_uid');
          resolve(null);
        }
      }, () => {
        clearTimeout(fallbackTimer);
        const offlineUid = storageService.getItem<string | null>('last_authenticated_uid', null);
        resolve(offlineUid);
      });
    });
  },

  // Iniciar sesión con correo y contraseña, con opción para dispositivos compartidos
  async signInWithEmail(email: string, pass: string, isSharedDevice: boolean = false): Promise<string> {
    if (isLocalMockMode || !auth) {
      // Modo local/mock: registrar sesión si coincide
      const mockUid = 'mock_uid_' + btoa(email).substring(0, 10);
      storageService.setItem('last_authenticated_uid', mockUid);
      return mockUid;
    }

    // Configurar persistencia según sea dispositivo compartido o personal
    const persistenceType = isSharedDevice ? browserSessionPersistence : browserLocalPersistence;
    await setPersistence(auth, persistenceType);

    const cred = await signInWithEmailAndPassword(auth, email, pass);
    storageService.setItem('last_authenticated_uid', cred.user.uid);
    return cred.user.uid;
  },

  // Registrar nueva cuenta de estudiante con persistencia
  async signUpWithEmail(
    email: string,
    pass: string,
    displayName: string,
    isSharedDevice: boolean = false
  ): Promise<string> {
    if (isLocalMockMode || !auth) {
      const mockUid = 'mock_uid_' + btoa(email).substring(0, 10);
      storageService.setItem('last_authenticated_uid', mockUid);
      return mockUid;
    }

    const persistenceType = isSharedDevice ? browserSessionPersistence : browserLocalPersistence;
    await setPersistence(auth, persistenceType);

    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateFirebaseProfile(cred.user, { displayName });
    storageService.setItem('last_authenticated_uid', cred.user.uid);
    return cred.user.uid;
  },

  // Reautenticación de seguridad reciente (para operaciones administrativas críticas)
  async reauthenticateCurrentUser(password: string): Promise<boolean> {
    if (isLocalMockMode || !auth) return true;
    const user = auth.currentUser;
    if (!user || !user.email) return false;

    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    return true;
  },

  // Cerrar sesión y purgar datos en caché local para dispositivos compartidos
  async signOutUser(): Promise<void> {
    try {
      if (!isLocalMockMode && auth) {
        await signOut(auth);
      }
    } finally {
      // Limpiar datos sensibles de la sesión en almacenamiento local
      storageService.removeItem('last_authenticated_uid');
      storageService.removeItem('user_profile');
      storageService.removeItem('user_progress');
      storageService.removeItem('admin_session_auth');
    }
  },

  // Obtener usuario actual
  getCurrentUser(): User | null {
    return auth ? auth.currentUser : null;
  },

  // Comprobar si el usuario actual es el administrador autorizado
  isCurrentUserAdmin(): boolean {
    const user = this.getCurrentUser();
    if (!user || !user.email) return false;
    return user.email.toLowerCase() === ADMIN_AUTHORIZED_EMAIL.toLowerCase();
  }
};
